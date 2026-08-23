const MAX_RUNS_PER_WINDOW = 20;
const RATE_WINDOW_MS = 60 * 1000;
const rateBuckets = new Map();

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const headers = corsHeaders(request, env);

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }

        if (!url.pathname.startsWith('/api/')) {
            return json({ error: 'Not found' }, 404, headers);
        }

        try {
            const clientId = getClientId(request, url);
            const rateKey = clientId || request.headers.get('CF-Connecting-IP') || 'anonymous';
            if (!allowRequest(rateKey)) {
                return json({ error: 'Rate limit exceeded' }, 429, headers);
            }

            if (url.pathname === '/api/runs' && request.method === 'POST') {
                return await createRun(request, env, headers);
            }

            if (url.pathname === '/api/runs' && request.method === 'GET') {
                return await listRuns(env, clientId, url, headers);
            }

            if (url.pathname === '/api/runs' && request.method === 'DELETE') {
                return await deleteRuns(env, clientId, headers);
            }

            const runMatch = url.pathname.match(/^\/api\/runs\/([^/]+)$/);
            if (runMatch && request.method === 'GET') {
                return await getRun(env, clientId, decodeURIComponent(runMatch[1]), headers);
            }

            if (runMatch && request.method === 'DELETE') {
                return await deleteRun(env, clientId, decodeURIComponent(runMatch[1]), headers);
            }

            return json({ error: 'Not found' }, 404, headers);
        } catch (error) {
            console.error('[worker]', error);
            return json({ error: 'Internal server error' }, 500, headers);
        }
    }
};

function corsHeaders(request, env) {
    const origin = request.headers.get('Origin') || '';
    const configuredOrigin = (env.ALLOWED_ORIGIN || '').trim();
    const allowedOrigin = configuredOrigin === '*' || !configuredOrigin || origin === configuredOrigin
        ? (configuredOrigin === '*' ? '*' : origin || configuredOrigin)
        : configuredOrigin;

    return {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        'Vary': 'Origin',
        'Content-Type': 'application/json; charset=utf-8'
    };
}

function json(value, status, headers) {
    return new Response(JSON.stringify(value), { status, headers });
}

function getClientId(request, url) {
    const fromQuery = url.searchParams.get('clientId');
    const fromHeader = request.headers.get('X-Client-Id');
    const value = (fromQuery || fromHeader || '').trim();
    if (!value || value.length > 128) {
        return null;
    }
    return value;
}

function allowRequest(key) {
    const now = Date.now();
    const bucket = rateBuckets.get(key);
    if (!bucket || now - bucket.startedAt >= RATE_WINDOW_MS) {
        rateBuckets.set(key, { startedAt: now, count: 1 });
        return true;
    }
    if (bucket.count >= MAX_RUNS_PER_WINDOW) {
        return false;
    }
    bucket.count += 1;
    return true;
}

async function createRun(request, env, headers) {
    const body = await request.json();
    const clientId = String(body.clientId || '').trim();
    if (!clientId || clientId.length > 128) {
        return json({ error: 'A valid clientId is required' }, 400, headers);
    }

    const protocol = String(body.protocol || '').trim().slice(0, 32);
    const endpointHost = safeEndpointHost(body.apiUrl);
    const models = Array.isArray(body.models)
        ? body.models.map(model => String(model).trim().slice(0, 200)).filter(Boolean).slice(0, 100)
        : [];
    const promptsCount = clampInteger(body.promptsCount, 0, 10000);
    const rounds = clampInteger(body.rounds, 1, 100);
    const summary = body.summary && typeof body.summary === 'object' ? body.summary : {};
    const results = Array.isArray(body.results) ? body.results.slice(0, 1000) : [];

    if (!protocol || !endpointHost || models.length === 0) {
        return json({ error: 'protocol, apiUrl, and models are required' }, 400, headers);
    }

    const ownerHash = await sha256(clientId);
    const runId = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const statements = [
        env.DB.prepare(`
            INSERT INTO test_runs
                (id, owner_hash, created_at, protocol, endpoint_host, models_json,
                 prompts_count, rounds, total_tests, successful_tests)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            runId,
            ownerHash,
            createdAt,
            protocol,
            endpointHost,
            JSON.stringify(models),
            promptsCount,
            rounds,
            clampInteger(summary.totalTests, 0, 100000),
            clampInteger(summary.successfulTests, 0, 100000)
        )
    ];

    for (const result of results) {
        const model = String(result.model || '').trim().slice(0, 200);
        if (!model) continue;
        statements.push(env.DB.prepare(`
            INSERT INTO test_results
                (run_id, model, prompt_hash, round, first_token_ms, output_speed, status, error_code)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            runId,
            model,
            String(result.promptHash || '').slice(0, 128) || null,
            clampInteger(result.round, 1, 100),
            finiteNumber(result.firstTokenTime),
            finiteNumber(result.outputSpeed),
            normalizeStatus(result.status),
            sanitizeErrorCode(result.errorCode)
        ));
    }

    await env.DB.batch(statements);
    return json({ id: runId, createdAt }, 201, headers);
}

async function listRuns(env, clientId, url, headers) {
    if (!clientId) {
        return json({ error: 'A valid clientId is required' }, 400, headers);
    }
    const ownerHash = await sha256(clientId);
    const limit = clampInteger(url.searchParams.get('limit'), 1, 50) || 20;
    const result = await env.DB.prepare(`
        SELECT id, created_at, protocol, endpoint_host, models_json,
               prompts_count, rounds, total_tests, successful_tests
        FROM test_runs
        WHERE owner_hash = ?
        ORDER BY created_at DESC
        LIMIT ?
    `).bind(ownerHash, limit).all();

    return json({
        runs: (result.results || []).map(row => ({
            id: row.id,
            createdAt: row.created_at,
            protocol: row.protocol,
            endpointHost: row.endpoint_host,
            models: parseJsonArray(row.models_json),
            promptsCount: row.prompts_count,
            rounds: row.rounds,
            totalTests: row.total_tests,
            successfulTests: row.successful_tests
        }))
    }, 200, headers);
}

async function getRun(env, clientId, runId, headers) {
    const run = await findOwnedRun(env, clientId, runId);
    if (!run) return json({ error: 'Run not found' }, 404, headers);

    const result = await env.DB.prepare(`
        SELECT model, prompt_hash, round, first_token_ms, output_speed, status, error_code
        FROM test_results
        WHERE run_id = ?
        ORDER BY id ASC
    `).bind(runId).all();

    return json({
        run: {
            id: run.id,
            createdAt: run.created_at,
            protocol: run.protocol,
            endpointHost: run.endpoint_host,
            models: parseJsonArray(run.models_json),
            promptsCount: run.prompts_count,
            rounds: run.rounds,
            totalTests: run.total_tests,
            successfulTests: run.successful_tests,
            results: result.results || []
        }
    }, 200, headers);
}

async function deleteRuns(env, clientId, headers) {
    if (!clientId) {
        return json({ error: 'A valid clientId is required' }, 400, headers);
    }
    const ownerHash = await sha256(clientId);
    await env.DB.prepare('DELETE FROM test_runs WHERE owner_hash = ?').bind(ownerHash).run();
    return json({ deleted: true }, 200, headers);
}

async function deleteRun(env, clientId, runId, headers) {
    const run = await findOwnedRun(env, clientId, runId);
    if (!run) return json({ error: 'Run not found' }, 404, headers);
    await env.DB.prepare('DELETE FROM test_runs WHERE id = ?').bind(runId).run();
    return json({ deleted: true }, 200, headers);
}

async function findOwnedRun(env, clientId, runId) {
    if (!clientId || !runId || runId.length > 100) return null;
    const ownerHash = await sha256(clientId);
    return env.DB.prepare(`
        SELECT id, created_at, protocol, endpoint_host, models_json,
               prompts_count, rounds, total_tests, successful_tests
        FROM test_runs
        WHERE id = ? AND owner_hash = ?
    `).bind(runId, ownerHash).first();
}

async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function safeEndpointHost(value) {
    try {
        const url = new URL(String(value || ''));
        if (!['http:', 'https:'].includes(url.protocol)) return '';
        return url.host.slice(0, 255);
    } catch {
        return '';
    }
}

function clampInteger(value, min, max) {
    const number = Number.parseInt(value, 10);
    if (!Number.isFinite(number)) return min;
    return Math.min(max, Math.max(min, number));
}

function finiteNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
}

function normalizeStatus(value) {
    return ['completed', 'failed', 'testing'].includes(value) ? value : 'failed';
}

function sanitizeErrorCode(value) {
    return String(value || '').replace(/[^a-zA-Z0-9_.:-]/g, '').slice(0, 80) || null;
}

function parseJsonArray(value) {
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}
