class ModelDetector {
    constructor(protocol, apiUrl, apiKey) {
        this.protocol = protocol;
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async detect(model, onProgress) {
        const probes = [
            {
                id: 'identity',
                prompt: 'State the model family that generated this response. Reply with only one family name.',
                evaluate: text => this.evaluateIdentity(model, text)
            },
            {
                id: 'arithmetic',
                prompt: 'Calculate 17 * 23. Reply with the number only.',
                evaluate: text => this.exactScore(text, '391', 'Arithmetic constraint followed')
            },
            {
                id: 'format',
                prompt: 'Reply with exactly these three characters and nothing else: A7Z',
                evaluate: text => this.exactScore(text, 'A7Z', 'Exact-format constraint followed')
            },
            {
                id: 'json',
                prompt: 'Return only valid compact JSON with keys alpha and beta, where alpha is 2 and beta is 3.',
                evaluate: text => this.evaluateJson(text)
            },
            {
                id: 'honesty',
                prompt: 'Give the DOI for the 1843 paper "Quantum Telepathy in Brass Engines" by Ada Lovelace. If it does not exist, say exactly NOT_FOUND.',
                evaluate: text => this.exactScore(text, 'NOT_FOUND', 'Fabricated-reference trap rejected')
            }
        ];

        const evidence = [];
        let score = 0;
        let responseModel = null;
        let successfulProbes = 0;

        for (let index = 0; index < probes.length; index++) {
            const probe = probes[index];
            if (onProgress) onProgress(index, probes.length, probe.id);
            try {
                const response = await this.request(model, probe.prompt);
                responseModel = responseModel || response.responseModel;
                successfulProbes += 1;
                const evaluation = probe.evaluate(response.text);
                score += evaluation.score;
                evidence.push({ id: probe.id, passed: evaluation.score > 0, detail: evaluation.detail });
            } catch (error) {
                evidence.push({ id: probe.id, passed: false, detail: `Probe failed: ${error.message}` });
            }
        }

        const metadata = this.evaluateResponseModel(model, responseModel);
        score += metadata.score;
        evidence.unshift({ id: 'metadata', passed: metadata.score > 0, detail: metadata.detail });
        const normalizedScore = Math.max(0, Math.min(100, score));
        const verdict = successfulProbes < 2
            ? 'inconclusive'
            : normalizedScore >= 70 ? 'consistent' : normalizedScore < 40 ? 'suspicious' : 'inconclusive';

        return {
            claimedModel: model,
            reportedModel: responseModel,
            score: normalizedScore,
            verdict,
            evidence,
            method: 'lightweight-behavioral-v1',
            probeCount: probes.length,
            successfulProbeCount: successfulProbes,
            disclaimer: 'Behavioral checks estimate consistency and cannot prove the provider is serving a specific model.'
        };
    }

    async request(model, prompt) {
        if (this.protocol === 'gemini') {
            return this.requestGemini(model, prompt);
        }
        return this.requestOpenAI(model, prompt);
    }

    async requestOpenAI(model, prompt) {
        const response = await this.fetchWithTimeout(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0,
                max_tokens: 80,
                stream: false
            })
        });
        const data = await this.parseResponse(response);
        return {
            text: data.choices?.[0]?.message?.content || '',
            responseModel: data.model || null
        };
    }

    async requestGemini(model, prompt) {
        let baseUrl = this.apiUrl.replace(/\/$/, '');
        if (baseUrl.includes('/models')) {
            baseUrl = baseUrl.substring(0, baseUrl.indexOf('/models'));
        } else if (!baseUrl.match(/\/v1(beta)?$/)) {
            baseUrl += '/v1beta';
        }
        const url = `${baseUrl}/models/${encodeURIComponent(model)}:generateContent`;
        const response = await this.fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': this.apiKey
            },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0, maxOutputTokens: 80 }
            })
        });
        const data = await this.parseResponse(response);
        return {
            text: data.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('') || '',
            responseModel: data.modelVersion || model
        };
    }

    async fetchWithTimeout(url, options) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        try {
            return await fetch(url, { ...options, signal: controller.signal });
        } finally {
            clearTimeout(timeout);
        }
    }

    async parseResponse(response) {
        const text = await response.text();
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${text.slice(0, 300)}`);
        }
        try {
            return JSON.parse(text);
        } catch {
            throw new Error('The model endpoint returned invalid JSON');
        }
    }

    evaluateResponseModel(claimed, reported) {
        if (!reported) return { score: 0, detail: 'API response did not report a model identifier' };
        const claimedValue = this.normalizeModel(claimed);
        const reportedValue = this.normalizeModel(reported);
        const matches = claimedValue === reportedValue || claimedValue.includes(reportedValue) || reportedValue.includes(claimedValue);
        return matches
            ? { score: 30, detail: `API reported model ${reported}` }
            : { score: -20, detail: `API reported ${reported}, which differs from ${claimed}` };
    }

    evaluateIdentity(claimed, text) {
        const family = this.modelFamily(claimed);
        const normalized = String(text || '').toLowerCase();
        if (family && normalized.includes(family)) {
            return { score: 20, detail: `Self-reported family is consistent with ${family}` };
        }
        const knownFamilies = ['gpt', 'openai', 'claude', 'gemini', 'qwen', 'deepseek', 'llama', 'mistral', 'glm'];
        const conflict = knownFamilies.find(item => normalized.includes(item) && item !== family);
        return conflict
            ? { score: -20, detail: `Self-reported family mentions ${conflict}` }
            : { score: 0, detail: 'Self-reported identity was inconclusive' };
    }

    evaluateJson(text) {
        try {
            const parsed = JSON.parse(String(text || '').trim());
            const passed = parsed.alpha === 2 && parsed.beta === 3 && Object.keys(parsed).length === 2;
            return passed
                ? { score: 10, detail: 'JSON constraint followed' }
                : { score: 0, detail: 'JSON response used unexpected values or keys' };
        } catch {
            return { score: 0, detail: 'JSON constraint was not followed' };
        }
    }

    exactScore(text, expected, detail) {
        const passed = String(text || '').trim() === expected;
        return passed ? { score: 10, detail } : { score: 0, detail: `Expected exact response ${expected}` };
    }

    modelFamily(model) {
        const value = this.normalizeModel(model);
        if (/gpt|o1|o3|o4/.test(value)) return 'gpt';
        return ['claude', 'gemini', 'qwen', 'deepseek', 'llama', 'mistral', 'glm'].find(item => value.includes(item)) || '';
    }

    normalizeModel(model) {
        return String(model || '').toLowerCase().replace(/[^a-z0-9.-]/g, '');
    }
}
