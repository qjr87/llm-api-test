class APITester {
    constructor() {
        this.currentTest = null;
        this.testResults = [];
        this.testHistory = JSON.parse(localStorage.getItem('testHistory') || '[]');
        this.currentLanguage = localStorage.getItem('language') || 'en';
        
        this.initializeUI();
        this.bindEvents();
        this.loadHistory();
        this.setLanguage(this.currentLanguage);
    }

    initializeUI() {
        // Set default values
        document.getElementById('apiProvider').value = 'openai';
        document.getElementById('apiEndpoint').value = 'https://api.openai.com/v1/chat/completions';
        document.getElementById('model').value = 'gpt-3.5-turbo';
        
        // Update endpoint when provider changes
        document.getElementById('apiProvider').addEventListener('change', (e) => {
            const provider = e.target.value;
            const endpointInput = document.getElementById('apiEndpoint');
            const modelInput = document.getElementById('model');
            
            switch(provider) {
                case 'openai':
                    endpointInput.value = 'https://api.openai.com/v1/chat/completions';
                    modelInput.value = 'gpt-3.5-turbo';
                    break;
                case 'gemini':
                    endpointInput.value = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
                    modelInput.value = 'gemini-pro';
                    break;
                case 'custom':
                    endpointInput.value = '';
                    modelInput.value = '';
                    break;
            }
        });
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchTab(e.target.id.replace('Tab', ''));
            });
        });

        // Test controls
        document.getElementById('startTest').addEventListener('click', () => this.startTest());
        document.getElementById('stopTest').addEventListener('click', () => this.stopTest());

        // Export controls
        document.getElementById('exportJson').addEventListener('click', () => this.exportResults('json'));
        document.getElementById('exportCsv').addEventListener('click', () => this.exportResults('csv'));

        // History controls
        document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());
        document.getElementById('exportHistory').addEventListener('click', () => this.exportHistory());

        // Language selector
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.setLanguage(e.target.value);
        });
    }

    switchTab(tabName) {
        // Remove active class from all tabs and sections
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));

        // Add active class to selected tab and section
        document.getElementById(tabName + 'Tab').classList.add('active');
        document.getElementById(tabName + 'Section').classList.add('active');
    }

    async startTest() {
        if (this.currentTest) {
            alert('Test is already running!');
            return;
        }

        const config = this.getTestConfig();
        if (!this.validateConfig(config)) {
            return;
        }

        this.currentTest = {
            config,
            results: [],
            startTime: Date.now(),
            completed: 0,
            total: config.testRounds * config.concurrency
        };

        this.testResults = [];
        this.updateUI('testing');
        this.clearLog();
        this.clearResults();

        try {
            await this.runTestRounds();
            this.completeTest();
        } catch (error) {
            this.handleTestError(error);
        }
    }

    stopTest() {
        if (this.currentTest) {
            this.currentTest.stopped = true;
            this.updateUI('stopped');
            this.log('Test stopped by user', 'warning');
        }
    }

    getTestConfig() {
        return {
            apiProvider: document.getElementById('apiProvider').value,
            apiKey: document.getElementById('apiKey').value,
            apiEndpoint: document.getElementById('apiEndpoint').value,
            model: document.getElementById('model').value,
            testRounds: parseInt(document.getElementById('testRounds').value),
            concurrency: parseInt(document.getElementById('concurrency').value),
            testPrompt: document.getElementById('testPrompt').value,
            maxTokens: parseInt(document.getElementById('maxTokens').value),
            temperature: parseFloat(document.getElementById('temperature').value)
        };
    }

    validateConfig(config) {
        if (!config.apiKey) {
            alert('Please enter an API key');
            return false;
        }
        if (!config.apiEndpoint) {
            alert('Please enter an API endpoint');
            return false;
        }
        if (!config.model) {
            alert('Please enter a model name');
            return false;
        }
        if (!config.testPrompt) {
            alert('Please enter a test prompt');
            return false;
        }
        return true;
    }

    async runTestRounds() {
        const { testRounds, concurrency } = this.currentTest.config;
        
        for (let round = 0; round < testRounds && !this.currentTest.stopped; round++) {
            this.log(`Starting round ${round + 1}/${testRounds}`);
            
            const promises = [];
            for (let i = 0; i < concurrency; i++) {
                promises.push(this.runSingleTest(round * concurrency + i + 1));
            }
            
            await Promise.all(promises);
            this.updateProgress();
            this.updateLiveStats();
        }
    }

    async runSingleTest(testNumber) {
        const startTime = Date.now();
        const handler = new APIHandler(this.currentTest.config);
        
        try {
            const result = await handler.sendRequest();
            const endTime = Date.now();
            
            const testResult = {
                testNumber,
                startTime,
                endTime,
                totalTime: endTime - startTime,
                firstTokenTime: result.firstTokenTime,
                tokens: result.tokens,
                speed: result.speed,
                success: true,
                response: result.response,
                error: null
            };
            
            this.testResults.push(testResult);
            this.currentTest.completed++;
            
            this.log(`Test ${testNumber} completed: ${testResult.totalTime}ms, ${testResult.tokens} tokens`, 'success');
            
        } catch (error) {
            const endTime = Date.now();
            const testResult = {
                testNumber,
                startTime,
                endTime,
                totalTime: endTime - startTime,
                firstTokenTime: null,
                tokens: 0,
                speed: 0,
                success: false,
                response: null,
                error: error.message
            };
            
            this.testResults.push(testResult);
            this.currentTest.completed++;
            
            this.log(`Test ${testNumber} failed: ${error.message}`, 'error');
        }
    }

    updateProgress() {
        const progress = (this.currentTest.completed / this.currentTest.total) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `${this.currentTest.completed}/${this.currentTest.total} (${Math.round(progress)}%)`;
    }

    updateLiveStats() {
        const successfulTests = this.testResults.filter(r => r.success);
        
        if (successfulTests.length > 0) {
            const avgFirstToken = successfulTests.reduce((sum, r) => sum + (r.firstTokenTime || 0), 0) / successfulTests.length;
            const avgSpeed = successfulTests.reduce((sum, r) => sum + r.speed, 0) / successfulTests.length;
            const successRate = (successfulTests.length / this.testResults.length) * 100;
            
            document.getElementById('avgFirstToken').textContent = `${Math.round(avgFirstToken)}ms`;
            document.getElementById('avgSpeed').textContent = `${avgSpeed.toFixed(2)} t/s`;
            document.getElementById('successRate').textContent = `${successRate.toFixed(1)}%`;
        }
    }

    completeTest() {
        this.currentTest.endTime = Date.now();
        this.updateUI('completed');
        this.displayResults();
        this.saveToHistory();
        this.log('Test completed!', 'success');
        this.currentTest = null;
    }

    handleTestError(error) {
        this.updateUI('error');
        this.log(`Test failed: ${error.message}`, 'error');
        this.currentTest = null;
    }

    updateUI(state) {
        const startButton = document.getElementById('startTest');
        const stopButton = document.getElementById('stopTest');
        
        switch(state) {
            case 'testing':
                startButton.disabled = true;
                stopButton.disabled = false;
                break;
            case 'completed':
            case 'stopped':
            case 'error':
                startButton.disabled = false;
                stopButton.disabled = true;
                break;
        }
    }

    displayResults() {
        this.switchTab('results');
        
        // Update summary
        const successfulTests = this.testResults.filter(r => r.success);
        const summary = {
            totalTests: this.testResults.length,
            successfulTests: successfulTests.length,
            failedTests: this.testResults.length - successfulTests.length,
            successRate: (successfulTests.length / this.testResults.length) * 100,
            avgFirstToken: successfulTests.reduce((sum, r) => sum + (r.firstTokenTime || 0), 0) / successfulTests.length,
            avgTotalTime: successfulTests.reduce((sum, r) => sum + r.totalTime, 0) / successfulTests.length,
            avgSpeed: successfulTests.reduce((sum, r) => sum + r.speed, 0) / successfulTests.length,
            totalTokens: successfulTests.reduce((sum, r) => sum + r.tokens, 0)
        };
        
        document.getElementById('summaryContent').innerHTML = `
            <p><strong>Total Tests:</strong> ${summary.totalTests}</p>
            <p><strong>Successful:</strong> ${summary.successfulTests}</p>
            <p><strong>Failed:</strong> ${summary.failedTests}</p>
            <p><strong>Success Rate:</strong> ${summary.successRate.toFixed(1)}%</p>
            <p><strong>Avg First Token:</strong> ${Math.round(summary.avgFirstToken)}ms</p>
            <p><strong>Avg Total Time:</strong> ${Math.round(summary.avgTotalTime)}ms</p>
            <p><strong>Avg Speed:</strong> ${summary.avgSpeed.toFixed(2)} tokens/sec</p>
            <p><strong>Total Tokens:</strong> ${summary.totalTokens}</p>
        `;
        
        // Update results table
        const tbody = document.getElementById('resultsTableBody');
        tbody.innerHTML = '';
        
        this.testResults.forEach(result => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${result.testNumber}</td>
                <td>${result.firstTokenTime ? Math.round(result.firstTokenTime) : '-'}</td>
                <td>${Math.round(result.totalTime)}</td>
                <td>${result.tokens}</td>
                <td>${result.speed.toFixed(2)}</td>
                <td class="${result.success ? 'success' : 'error'}">${result.success ? 'Success' : 'Failed'}</td>
            `;
        });
    }

    exportResults(format) {
        if (this.testResults.length === 0) {
            alert('No results to export');
            return;
        }
        
        let content, filename, mimeType;
        
        if (format === 'json') {
            content = JSON.stringify({
                config: this.currentTest?.config || {},
                results: this.testResults,
                timestamp: new Date().toISOString()
            }, null, 2);
            filename = `llm-test-results-${Date.now()}.json`;
            mimeType = 'application/json';
        } else if (format === 'csv') {
            const headers = ['Test Number', 'First Token (ms)', 'Total Time (ms)', 'Tokens', 'Speed (t/s)', 'Status', 'Error'];
            const rows = this.testResults.map(r => [
                r.testNumber,
                r.firstTokenTime || '',
                r.totalTime,
                r.tokens,
                r.speed.toFixed(2),
                r.success ? 'Success' : 'Failed',
                r.error || ''
            ]);
            
            content = [headers, ...rows].map(row => row.join(',')).join('\n');
            filename = `llm-test-results-${Date.now()}.csv`;
            mimeType = 'text/csv';
        }
        
        this.downloadFile(content, filename, mimeType);
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    saveToHistory() {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            config: this.currentTest.config,
            results: this.testResults,
            summary: {
                totalTests: this.testResults.length,
                successfulTests: this.testResults.filter(r => r.success).length,
                avgFirstToken: this.testResults.filter(r => r.success).reduce((sum, r) => sum + (r.firstTokenTime || 0), 0) / this.testResults.filter(r => r.success).length,
                avgSpeed: this.testResults.filter(r => r.success).reduce((sum, r) => sum + r.speed, 0) / this.testResults.filter(r => r.success).length
            }
        };
        
        this.testHistory.unshift(historyItem);
        
        // Keep only last 50 items
        if (this.testHistory.length > 50) {
            this.testHistory = this.testHistory.slice(0, 50);
        }
        
        localStorage.setItem('testHistory', JSON.stringify(this.testHistory));
        this.loadHistory();
    }

    loadHistory() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        if (this.testHistory.length === 0) {
            historyList.innerHTML = '<p>No test history available</p>';
            return;
        }
        
        this.testHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-header">
                    <h4>${new Date(item.timestamp).toLocaleString()}</h4>
                    <div class="history-actions">
                        <button onclick="apiTester.loadHistoryItem(${item.id})" class="secondary-button">Load</button>
                        <button onclick="apiTester.deleteHistoryItem(${item.id})" class="secondary-button">Delete</button>
                    </div>
                </div>
                <div class="history-summary">
                    <p><strong>Provider:</strong> ${item.config.apiProvider}</p>
                    <p><strong>Model:</strong> ${item.config.model}</p>
                    <p><strong>Tests:</strong> ${item.summary.totalTests} (${item.summary.successfulTests} successful)</p>
                    <p><strong>Avg First Token:</strong> ${Math.round(item.summary.avgFirstToken)}ms</p>
                    <p><strong>Avg Speed:</strong> ${item.summary.avgSpeed.toFixed(2)} t/s</p>
                </div>
            `;
            historyList.appendChild(historyItem);
        });
    }

    loadHistoryItem(id) {
        const item = this.testHistory.find(h => h.id === id);
        if (!item) return;
        
        this.testResults = item.results;
        this.displayResults();
    }

    deleteHistoryItem(id) {
        this.testHistory = this.testHistory.filter(h => h.id !== id);
        localStorage.setItem('testHistory', JSON.stringify(this.testHistory));
        this.loadHistory();
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all test history?')) {
            this.testHistory = [];
            localStorage.setItem('testHistory', JSON.stringify(this.testHistory));
            this.loadHistory();
        }
    }

    exportHistory() {
        if (this.testHistory.length === 0) {
            alert('No history to export');
            return;
        }
        
        const content = JSON.stringify(this.testHistory, null, 2);
        this.downloadFile(content, `llm-test-history-${Date.now()}.json`, 'application/json');
    }

    log(message, type = 'info') {
        const logContainer = document.getElementById('logContainer');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.innerHTML = `
            <span class="log-time">${new Date().toLocaleTimeString()}</span>
            <span class="log-message">${message}</span>
        `;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    clearLog() {
        document.getElementById('logContainer').innerHTML = '';
    }

    clearResults() {
        document.getElementById('summaryContent').innerHTML = '';
        document.getElementById('resultsTableBody').innerHTML = '';
        document.getElementById('avgFirstToken').textContent = '-';
        document.getElementById('avgSpeed').textContent = '-';
        document.getElementById('successRate').textContent = '-';
        document.getElementById('totalCost').textContent = '-';
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.getElementById('languageSelect').value = lang;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                if (element.tagName === 'INPUT' && element.type !== 'button') {
                    element.placeholder = i18n[lang][key];
                } else {
                    element.textContent = i18n[lang][key];
                }
            }
        });
        
        // Update document language
        document.documentElement.lang = lang;
    }
}

// Initialize the application
const apiTester = new APITester();