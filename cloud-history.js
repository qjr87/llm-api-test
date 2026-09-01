class CloudHistoryClient {
    constructor(baseUrl) {
        this.baseUrl = String(baseUrl || '').trim().replace(/\/$/, '');
        this.clientId = this.getOrCreateClientId();
    }

    isConfigured() {
        return /^https?:\/\//i.test(this.baseUrl);
    }

    async saveRun(record) {
        if (!this.isConfigured()) return null;
        const payload = {
            clientId: this.clientId,
            protocol: record.protocol,
            apiUrl: record.apiUrl,
            models: record.testConfig.models,
            promptsCount: record.testConfig.prompts.length,
            rounds: record.testConfig.rounds,
            summary: record.summary,
            results: await Promise.all(record.results.map(async result => ({
                model: result.model,
                promptHash: await this.hashText(result.prompt || ''),
                round: result.round,
                firstTokenTime: result.firstTokenTime,
                outputSpeed: result.outputSpeed,
                status: result.status,
                errorCode: this.toErrorCode(result.error)
            })))
        };
        return this.request('/api/runs', { method: 'POST', body: payload });
    }

    async listRuns(limit = 20) {
        if (!this.isConfigured()) return [];
        const data = await this.request(`/api/runs?clientId=${encodeURIComponent(this.clientId)}&limit=${limit}`);
        return data.runs || [];
    }

    async getRun(id) {
        if (!this.isConfigured()) return null;
        const data = await this.request(`/api/runs/${encodeURIComponent(id)}?clientId=${encodeURIComponent(this.clientId)}`);
        return data.run || null;
    }

    async deleteRun(id) {
        return this.request(`/api/runs/${encodeURIComponent(id)}?clientId=${encodeURIComponent(this.clientId)}`, {
            method: 'DELETE'
        });
    }

    async clearRuns() {
        return this.request(`/api/runs?clientId=${encodeURIComponent(this.clientId)}`, {
            method: 'DELETE'
        });
    }

    async createShareReport(record) {
        if (!this.isConfigured()) return null;
        const modelStats = record.modelStats || {};
        const report = {
            models: record.testConfig.models,
            promptsCount: record.testConfig.prompts.length,
            rounds: record.testConfig.rounds,
            totalTests: record.summary.totalTests,
            successfulTests: record.summary.successfulTests,
            recommendation: record.recommendation || '',
            cost: record.cost || null,
            modelStats
        };
        return this.request('/api/reports', {
            method: 'POST',
            body: { protocol: record.protocol, apiUrl: record.apiUrl, report }
        });
    }

    async getShareReport(id) {
        if (!this.isConfigured()) return null;
        const data = await this.request(`/api/reports/${encodeURIComponent(id)}`);
        return data.report || null;
    }

    async request(path, options = {}) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: options.method || 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: options.body ? JSON.stringify(options.body) : undefined
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.error || `Cloud API returned HTTP ${response.status}`);
        }
        return data;
    }

    getOrCreateClientId() {
        const key = 'apiTesterCloudClientId';
        let clientId = localStorage.getItem(key);
        if (!clientId) {
            clientId = typeof crypto.randomUUID === 'function'
                ? crypto.randomUUID()
                : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem(key, clientId);
        }
        return clientId;
    }

    async hashText(text) {
        const bytes = new TextEncoder().encode(text);
        const digest = await crypto.subtle.digest('SHA-256', bytes);
        return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    toErrorCode(error) {
        if (!error) return null;
        const status = String(error).match(/HTTP\s+(\d{3})/i);
        return status ? `HTTP_${status[1]}` : 'REQUEST_FAILED';
    }
}
