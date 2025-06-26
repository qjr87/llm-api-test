// Main application logic
class APITester {
    constructor() {
        this.isRunning = false;
        this.currentTests = [];
        this.results = [];
        this.initializeEventListeners();
        this.loadSavedConfig();
    }

    initializeEventListeners() {
        const startButton = document.getElementById('startTest');
        const protocolSelect = document.getElementById('protocol');
        const apiUrlInput = document.getElementById('apiUrl');
        
        startButton.addEventListener('click', () => this.startTest());
        protocolSelect.addEventListener('change', () => this.updateDefaultUrl());
        
        // Auto-save configuration
        ['apiUrl', 'apiKey', 'models', 'prompts', 'rounds'].forEach(id => {
            const element = document.getElementById(id);
            element.addEventListener('input', () => this.saveConfig());
        });
        
        // Update URL when protocol changes
        this.updateDefaultUrl();
    }

    updateDefaultUrl() {
        const protocol = document.getElementById('protocol').value;
        const apiUrlInput = document.getElementById('apiUrl');
        
        if (!apiUrlInput.value) {
            if (protocol === 'openai') {
                apiUrlInput.value = 'https://api.openai.com/v1/chat/completions';
            } else if (protocol === 'gemini') {
                apiUrlInput.value = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
            }
        }
    }

    saveConfig() {
        const config = {
            protocol: document.getElementById('protocol').value,
            apiUrl: document.getElementById('apiUrl').value,
            apiKey: document.getElementById('apiKey').value,
            models: document.getElementById('models').value,
            prompts: document.getElementById('prompts').value,
            rounds: document.getElementById('rounds').value
        };
        localStorage.setItem('apiTesterConfig', JSON.stringify(config));
    }

    loadSavedConfig() {
        const saved = localStorage.getItem('apiTesterConfig');
        if (saved) {
            const config = JSON.parse(saved);
            Object.keys(config).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.value = config[key];
                }
            });
        }
    }

    validateConfig() {
        const apiUrl = document.getElementById('apiUrl').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        const models = document.getElementById('models').value.trim();
        const prompts = document.getElementById('prompts').value.trim();
        
        if (!apiUrl) {
            throw new Error('API URL is required');
        }
        
        if (!apiKey) {
            throw new Error('API Key is required');
        }
        
        if (!models) {
            throw new Error('At least one model is required');
        }
        
        if (!prompts) {
            throw new Error('At least one prompt is required');
        }
        
        try {
            new URL(apiUrl);
        } catch {
            throw new Error('Invalid API URL format');
        }
        
        const modelList = models.split('\n').filter(m => m.trim());
        const promptList = prompts.split('\n').filter(p => p.trim());
        
        if (modelList.length === 0) {
            throw new Error('At least one valid model is required');
        }
        
        if (promptList.length === 0) {
            throw new Error('At least one valid prompt is required');
        }
        
        if (promptList.length > 5) {
            throw new Error('Maximum 5 prompts allowed');
        }
        
        return { modelList, promptList };
    }

    async startTest() {
        if (this.isRunning) {
            this.stopTest();
            return;
        }

        try {
            const { modelList, promptList } = this.validateConfig();
            
            this.isRunning = true;
            this.updateStartButton();
            this.clearResults();
            
            const protocol = document.getElementById('protocol').value;
            const apiUrl = document.getElementById('apiUrl').value.trim();
            const apiKey = document.getElementById('apiKey').value.trim();
            const rounds = parseInt(document.getElementById('rounds').value) || 1;
            
            // Create test matrix
            const tests = [];
            for (let round = 1; round <= rounds; round++) {
                for (const model of modelList) {
                    for (const prompt of promptList) {
                        tests.push({
                            model: model.trim(),
                            prompt: prompt.trim(),
                            round,
                            protocol,
                            apiUrl,
                            apiKey
                        });
                    }
                }
            }
            
            this.currentTests = tests;
            
            // Run tests sequentially to avoid rate limiting
            for (let i = 0; i < tests.length && this.isRunning; i++) {
                const test = tests[i];
                await this.runSingleTest(test, i);
                
                // Add delay between requests to respect rate limits
                if (i < tests.length - 1 && this.isRunning) {
                    await this.delay(1000); // 1 second delay
                }
            }
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.isRunning = false;
            this.updateStartButton();
        }
    }

    async runSingleTest(test, index) {
        const rowId = `test-${index}`;
        this.addResultRow(test, rowId);
        
        try {
            this.updateRowStatus(rowId, 'Running...');
            
            const handler = test.protocol === 'gemini' ? 
                new GeminiHandler(test.apiUrl, test.apiKey) :
                new OpenAIHandler(test.apiUrl, test.apiKey);
            
            const result = await handler.testAPI(test.model, test.prompt);
            
            this.updateRowResult(rowId, result);
            this.results.push({ ...test, ...result });
            
        } catch (error) {
            this.updateRowError(rowId, error.message);
            this.results.push({ ...test, error: error.message });
        }
    }

    addResultRow(test, rowId) {
        const tbody = document.getElementById('resultsBody');
        const row = document.createElement('tr');
        row.id = rowId;
        
        row.innerHTML = `
            <td>${this.escapeHtml(test.model)}</td>
            <td title="${this.escapeHtml(test.prompt)}">${this.truncateText(test.prompt, 50)}</td>
            <td>${test.round}</td>
            <td class="first-token">-</td>
            <td class="output-speed">-</td>
            <td class="result">-</td>
            <td class="error">-</td>
            <td class="status">Pending</td>
        `;
        
        tbody.appendChild(row);
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    updateRowStatus(rowId, status) {
        const row = document.getElementById(rowId);
        if (row) {
            row.querySelector('.status').textContent = status;
        }
    }

    updateRowResult(rowId, result) {
        const row = document.getElementById(rowId);
        if (row) {
            row.querySelector('.first-token').textContent = 
                result.firstTokenTime ? `${result.firstTokenTime}ms` : '-';
            row.querySelector('.output-speed').textContent = 
                result.outputSpeed ? `${result.outputSpeed.toFixed(2)} t/s` : '-';
            row.querySelector('.result').innerHTML = 
                result.content ? `<span title="${this.escapeHtml(result.content)}">${this.truncateText(result.content, 100)}</span>` : '-';
            row.querySelector('.status').textContent = 'Completed';
            row.querySelector('.status').style.color = '#28a745';
        }
    }

    updateRowError(rowId, error) {
        const row = document.getElementById(rowId);
        if (row) {
            row.querySelector('.error').innerHTML = `<span title="${this.escapeHtml(error)}">${this.truncateText(error, 50)}</span>`;
            row.querySelector('.status').textContent = 'Failed';
            row.querySelector('.status').style.color = '#dc3545';
        }
    }

    stopTest() {
        this.isRunning = false;
        this.updateStartButton();
    }

    updateStartButton() {
        const button = document.getElementById('startTest');
        if (this.isRunning) {
            button.textContent = 'Stop Test';
            button.style.background = '#dc3545';
        } else {
            button.setAttribute('data-i18n', 'startTest');
            button.textContent = i18n.t('startTest');
            button.style.background = '';
        }
    }

    clearResults() {
        const tbody = document.getElementById('resultsBody');
        tbody.innerHTML = '';
        this.results = [];
    }

    showError(message) {
        alert(`Error: ${message}`);
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return this.escapeHtml(text);
        return this.escapeHtml(text.substring(0, maxLength)) + '...';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize internationalization
    i18n.init();
    
    // Initialize the API tester
    window.apiTester = new APITester();
    
    // Set up language selector
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', (e) => {
        i18n.setLanguage(e.target.value);
    });
    
    // Set initial language from URL or browser
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    const browserLang = navigator.language.split('-')[0];
    const initialLang = langFromUrl || browserLang || 'en';
    
    if (i18n.translations[initialLang]) {
        languageSelect.value = initialLang;
        i18n.setLanguage(initialLang);
    }
});