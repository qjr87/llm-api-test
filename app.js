const DEFAULT_CLOUD_API_URL = 'https://llm-api-test-history.qjr.workers.dev';

// Main application logic
class APITester {
    constructor() {
        this.isRunning = false;
        this.isDetecting = false;
        this.currentTests = [];
        this.testResults = [];
        this.currentTestId = null;
        this.cloudHistoryClient = null;
        this.currentHistoryRecord = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupProtocolDefaults();
        this.loadSavedConfig();
        this.syncDetectionModelOptions();
        this.loadSharedReportFromUrl();
    }

    setupEventListeners() {
        // Start test button
        const startButton = document.getElementById('startTest');
        startButton.addEventListener('click', () => this.startTests());

        // Protocol change handler
        const protocolSelect = document.getElementById('protocol');
        protocolSelect.addEventListener('change', (e) => {
            this.updateApiUrlPlaceholder(e.target.value);
        });

        // Save config on input changes
        const configInputs = ['protocol', 'apiUrl', 'apiKey', 'models', 'prompts', 'rounds', 'inputPrice', 'outputPrice', 'cloudApiUrl'];
        configInputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.saveConfig());
                element.addEventListener('change', () => this.saveConfig());
            }
        });

        const modelsInput = document.getElementById('models');
        if (modelsInput) {
            modelsInput.addEventListener('input', () => this.syncDetectionModelOptions());
        }

        const syncCloudHistory = document.getElementById('syncCloudHistory');
        if (syncCloudHistory) {
            syncCloudHistory.addEventListener('change', () => {
                this.saveConfig();
                if (syncCloudHistory.checked) this.loadCloudHistory();
            });
        }

        // Result cell click handlers for expanding text
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('result-cell')) {
                this.toggleResultExpansion(e.target);
            }
        });

        // Add click event listener for view result buttons using event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-result-btn')) {
                const testRow = e.target.closest('tr');
                if (testRow && testRow.id) {
                    this.handleViewResultClick(e, testRow.id);
                }
            }
        });

        // History controls
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => this.confirmClearHistory());
        }

        const loadCloudHistoryBtn = document.getElementById('loadCloudHistoryBtn');
        if (loadCloudHistoryBtn) {
            loadCloudHistoryBtn.addEventListener('click', () => this.loadCloudHistory(true));
        }

        const clearCloudHistoryBtn = document.getElementById('clearCloudHistoryBtn');
        if (clearCloudHistoryBtn) {
            clearCloudHistoryBtn.addEventListener('click', () => this.confirmClearCloudHistory());
        }

        const detectModelBtn = document.getElementById('detectModelBtn');
        if (detectModelBtn) {
            detectModelBtn.addEventListener('click', () => this.detectModelAuthenticity());
        }

        const shareReportBtn = document.getElementById('shareReportBtn');
        if (shareReportBtn) {
            shareReportBtn.addEventListener('click', () => this.createShareReport());
        }

        window.addEventListener('app-language-change', () => {
            this.renderHistoryRecords();
            if (this.currentHistoryRecord?.modelStats) {
                this.renderRecommendation(this.currentHistoryRecord.modelStats);
            }
        });
        
        // 默认显示历史记录
        this.renderHistoryRecords();
        this.renderCloudHistoryRecords([]);

        // Real-time viewer controls
        const toggleViewerBtn = document.getElementById('toggleViewer');
        const closeViewerBtn = document.getElementById('closeViewer');
        const closeDetailViewerBtn = document.getElementById('closeDetailViewer');
        
        toggleViewerBtn.addEventListener('click', () => this.toggleRealtimeViewer());
        closeViewerBtn.addEventListener('click', () => this.hideRealtimeViewer());
        closeDetailViewerBtn.addEventListener('click', () => this.hideResultDetailViewer());
        
        // Initialize viewer state
        this.isViewerVisible = false;
        this.isDetailViewerVisible = false;
        this.currentTestId = null;
    }

    setupProtocolDefaults() {
        const protocolSelect = document.getElementById('protocol');
        this.updateApiUrlPlaceholder(protocolSelect.value);
    }

    updateApiUrlPlaceholder(protocol) {
        const apiUrlInput = document.getElementById('apiUrl');
        const defaultUrl = APIHandler.getDefaultApiUrl(protocol);
        apiUrlInput.placeholder = defaultUrl;
        
        // If current value is empty or is a default URL, update it
        const defaultUrls = ['openai', 'gemini']
            .map(name => APIHandler.getDefaultApiUrl(name))
            .filter(Boolean);
        if (!apiUrlInput.value || defaultUrls.includes(apiUrlInput.value)) {
            apiUrlInput.value = defaultUrl;
        }
    }

    loadSavedConfig() {
        try {
            const saved = localStorage.getItem('apiTesterConfig');
            if (saved) {
                const config = JSON.parse(saved);
                
                    Object.keys(config).forEach(key => {
                        const element = document.getElementById(key);
                        if (element && config[key] !== undefined) {
                            if (element.type === 'checkbox') {
                                element.checked = Boolean(config[key]);
                            } else {
                                element.value = config[key];
                            }
                        }
                    });
            }
            
            // Set default prompts if prompts field is empty
            const promptsElement = document.getElementById('prompts');
            if (promptsElement && (!promptsElement.value || promptsElement.value.trim() === '')) {
                const defaultPrompts = [
                    'Explain the concept of "quantum entanglement" to a high school student, including its potential applications.',
                    'Discuss the primary ethical challenges posed by the rapid development of autonomous vehicles.',
                    'Write a short story about a sentient AI that discovers a hidden message within the internet\'s oldest data archives.'
                ];
                promptsElement.value = defaultPrompts.join('\n');
            }
            this.syncDetectionModelOptions();
            if (this.getCloudApiUrl()) this.loadCloudHistory();
        } catch (e) {
            console.warn('Failed to load saved config:', e);
        }
    }

    saveConfig() {
        try {
            const config = {
                protocol: document.getElementById('protocol').value,
                apiUrl: document.getElementById('apiUrl').value,
                apiKey: document.getElementById('apiKey').value,
                models: document.getElementById('models').value,
                prompts: document.getElementById('prompts').value,
                rounds: document.getElementById('rounds').value,
                inputPrice: document.getElementById('inputPrice')?.value || '0',
                outputPrice: document.getElementById('outputPrice')?.value || '0',
                cloudApiUrl: document.getElementById('cloudApiUrl')?.value || '',
                syncCloudHistory: document.getElementById('syncCloudHistory')?.checked || false
            };
            
            localStorage.setItem('apiTesterConfig', JSON.stringify(config));
        } catch (e) {
            console.warn('Failed to save config:', e);
        }
    }

    getConfig() {
        return {
            protocol: document.getElementById('protocol').value,
            apiUrl: document.getElementById('apiUrl').value.trim(),
            apiKey: document.getElementById('apiKey').value.trim(),
            models: document.getElementById('models').value.trim().split('\n').filter(m => m.trim()),
            prompts: document.getElementById('prompts').value.trim().split('\n').filter(p => p.trim()),
            rounds: parseInt(document.getElementById('rounds').value) || 1,
            inputPrice: this.getPrice('inputPrice'),
            outputPrice: this.getPrice('outputPrice'),
            cloudApiUrl: this.getCloudApiUrl(),
            syncCloudHistory: document.getElementById('syncCloudHistory')?.checked || false
        };
    }

    validateConfig(config) {
        return APIHandler.validateConfig(
            config.protocol,
            config.apiUrl,
            config.apiKey,
            config.models,
            config.prompts
        );
    }

    async startTests() {
        if (this.isRunning) return;

        const config = this.getConfig();
        const errors = this.validateConfig(config);

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        this.isRunning = true;
        this.updateStartButton(true);
        this.disableAllResultButtons();
        this.clearResults();

        try {
            await this.runTests(config);
            this.showNotification(i18n.t('testCompleted'));
        } catch (error) {
            console.error('Test execution failed:', error);
            this.showNotification('Test failed: ' + error.message);
        } finally {
            this.isRunning = false;
            this.updateStartButton(false);
            this.enableCompletedResultButtons();
            await this.generateStatistics();
        }
    }

    syncDetectionModelOptions() {
        const select = document.getElementById('detectionModel');
        const modelsInput = document.getElementById('models');
        if (!select || !modelsInput) return;

        const previousValue = select.value;
        const models = modelsInput.value.split('\n').map(value => value.trim()).filter(Boolean);
        select.innerHTML = '';
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            select.appendChild(option);
        });
        if (models.includes(previousValue)) select.value = previousValue;
    }

    async detectModelAuthenticity() {
        if (this.isDetecting || this.isRunning) return;
        const config = this.getConfig();
        const errors = this.validateConfig(config).filter(error => !error.includes('prompt'));
        const model = document.getElementById('detectionModel')?.value || config.models[0];
        if (errors.length || !model) {
            alert(errors.concat(model ? [] : [i18n.t('noModels')]).join('\n'));
            return;
        }

        const section = document.getElementById('modelDetectionSection');
        const status = document.getElementById('modelDetectionStatus');
        const resultContainer = document.getElementById('modelDetectionResult');
        const button = document.getElementById('detectModelBtn');
        section.classList.remove('hidden');
        resultContainer.innerHTML = '';
        this.isDetecting = true;
        button.disabled = true;

        try {
            const detector = new ModelDetector(config.protocol, config.apiUrl, config.apiKey);
            const result = await detector.detect(model, (index, total) => {
                status.className = 'detection-status';
                status.textContent = `${i18n.t('detectingModel')} ${index + 1}/${total}`;
            });
            this.renderDetectionResult(result);
            status.className = 'detection-status success';
            status.textContent = i18n.t('detectionCompleted');
            this.saveDetectionResult(result);
        } catch (error) {
            status.className = 'detection-status error';
            status.textContent = `${i18n.t('detectionFailed')}: ${error.message}`;
        } finally {
            this.isDetecting = false;
            button.disabled = false;
        }
    }

    renderDetectionResult(result) {
        const container = document.getElementById('modelDetectionResult');
        container.innerHTML = '';
        const title = document.createElement('h3');
        title.textContent = `${i18n.t(`verdict_${result.verdict}`)} (${result.score}/100)`;
        const summary = document.createElement('p');
        summary.textContent = `${i18n.t('claimedModel')}: ${result.claimedModel} | ${i18n.t('reportedModel')}: ${result.reportedModel || '-'}`;
        const list = document.createElement('ul');
        result.evidence.forEach(item => {
            const entry = document.createElement('li');
            entry.textContent = `${item.passed ? 'PASS' : 'CHECK'}: ${item.detail}`;
            list.appendChild(entry);
        });
        const disclaimer = document.createElement('p');
        disclaimer.className = 'field-help';
        disclaimer.textContent = i18n.t('detectionDisclaimer');
        container.append(title, summary, list, disclaimer);
    }

    saveDetectionResult(result) {
        try {
            const saved = JSON.parse(localStorage.getItem('apiTesterDetectionHistory') || '[]');
            const history = Array.isArray(saved) ? saved : [];
            history.unshift({ ...result, timestamp: new Date().toISOString() });
            localStorage.setItem('apiTesterDetectionHistory', JSON.stringify(history.slice(0, 10)));
        } catch (error) {
            console.warn('Failed to save model detection result:', error);
        }
    }

    async runTests(config) {
        const apiHandler = new APIHandler(config.protocol, config.apiUrl, config.apiKey);
        const totalTests = config.models.length * config.prompts.length * config.rounds;
        let completedTests = 0;

        for (let round = 1; round <= config.rounds; round++) {
            for (const model of config.models) {
                for (const prompt of config.prompts) {
                    if (!this.isRunning) return; // Allow cancellation

                    const testId = this.addTestRow(model, prompt, round);
                    
                    // Set current test ID for real-time viewer
                    this.currentTestId = testId;
                    
                    try {
                        const result = await apiHandler.testModel(model, prompt, (progress) => {
                            this.updateTestRow(testId, progress);
                        });
                        
                        // Check if the result contains an error
                        if (result && result.status === 'failed') {
                            this.updateTestRow(testId, result);
                        } else if (result) {
                            this.updateTestRow(testId, result);
                        }
                    } catch (error) {
                        this.updateTestRow(testId, {
                            firstTokenTime: null,
                            outputSpeed: '0.00',
                            result: '',
                            error: error.message,
                            status: 'failed'
                        });
                    }

                    completedTests++;
                    
                    // Small delay between tests to prevent overwhelming the API
                    await this.sleep(100);
                }
            }
        }
    }

    addTestRow(model, prompt, round) {
        const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const tbody = document.getElementById('resultsBody');
        
        const row = document.createElement('tr');
        row.id = testId;
        row.dataset.model = model;
        row.dataset.prompt = prompt;
        row.dataset.round = round;
        row.dataset.testId = testId;
        row.innerHTML = `
            <td>${this.escapeHtml(model)}</td>
            <td class="result-cell" title="${this.escapeHtml(prompt)}">${this.truncateText(prompt, 50)}</td>
            <td>${round}</td>
            <td class="first-token">-</td>
            <td class="output-speed">-</td>
            <td class="result-cell"><button class="view-result-btn" data-test-id="${testId}" disabled>-</button></td>
            <td class="error-cell">-</td>
            <td class="status-cell"><span class="loading"></span> ${i18n.t('testing')}</td>
        `;
        
        tbody.appendChild(row);
        
        // Store test metadata for real-time viewer
        row.dataset.model = model;
        row.dataset.prompt = prompt;
        row.dataset.round = round;
        
        // Initialize real-time viewer for this test
        this.updateRealtimeViewer(testId, model, prompt, round, {
            status: 'testing',
            result: '',
            firstTokenTime: null,
            outputSpeed: null
        });
        
        return testId;
    }

    updateTestRow(testId, data) {
        const row = document.getElementById(testId);
        if (!row) return;

        // Store test result for statistics only when test is completed or failed
        if (data.status === 'completed' || data.status === 'failed' || data.error) {
            const model = row.dataset.model || row.cells[0].textContent;
            const prompt = row.dataset.prompt || row.cells[1].title || row.cells[1].textContent;
            const round = parseInt(row.dataset.round || row.cells[2].textContent);
            
            // Add or update result in testResults array
            const existingIndex = this.testResults.findIndex(r => r.testId === testId);
            const resultData = {
                testId: testId,
                model: model,
                prompt: prompt,
                round: round,
                firstTokenTime: data.firstTokenTime,
                outputSpeed: parseFloat(data.outputSpeed) || 0,
                result: data.result || '',
                error: data.error || null,
                status: data.status || (data.error ? 'failed' : 'completed')
            };
            
            if (existingIndex >= 0) {
                this.testResults[existingIndex] = resultData;
            } else {
                this.testResults.push(resultData);
            }
        }

        const firstTokenCell = row.querySelector('.first-token');
        const outputSpeedCell = row.querySelector('.output-speed');
        const resultCell = row.querySelector('.result-cell:nth-child(6)');
        const errorCell = row.querySelector('.error-cell');
        const statusCell = row.querySelector('.status-cell');

        if (data.firstTokenTime !== null) {
            firstTokenCell.textContent = data.firstTokenTime + 'ms';
        }

        if (data.outputSpeed) {
            outputSpeedCell.textContent = data.outputSpeed;
        }

        const resultButton = resultCell.querySelector('.view-result-btn');
        if (resultButton) {
            if (data.result) {
                resultButton.textContent = i18n.t('viewResult');
                // 只有在所有测试完成后才启用按钮
                resultButton.disabled = this.isRunning;
                resultButton.dataset.fullText = data.result;
                resultButton.title = this.isRunning ? i18n.t('testing') : i18n.t('clickToViewInViewer');
                
                if (this.isRunning) {
                    resultButton.classList.add('testing-state');
                } else {
                    resultButton.classList.remove('testing-state');
                }
                
                // Event listener is handled by document delegation, no need to add individual listeners
            } else if (data.status === 'testing') {
                 resultButton.textContent = i18n.t('testing');
                 resultButton.disabled = true;
                 resultButton.classList.add('testing-state');
                 resultButton.title = i18n.t('testing');
                 // Store current progress in fullText for testing state
                 resultButton.dataset.fullText = data.result || '';
                 
                 // Remove existing event listener to avoid duplicates
                 if (resultButton._boundHandler) {
                     resultButton.removeEventListener('click', resultButton._boundHandler);
                     resultButton._boundHandler = null;
                 }
             }
        }

        if (data.error) {
            errorCell.textContent = data.error;
            errorCell.title = data.error;
            
            // Also update result button to show error state
            const resultButton = resultCell.querySelector('.view-result-btn');
            if (resultButton && !data.result) {
                resultButton.textContent = i18n.t('error');
                resultButton.disabled = true;
                resultButton.classList.add('error-state');
            }
        }

        // Update status
        let statusClass = '';
        let statusText = '';
        
        switch (data.status) {
            case 'testing':
                statusClass = 'status-testing';
                statusText = `<span class="loading"></span> ${i18n.t('testing')}`;
                break;
            case 'completed':
                statusClass = 'status-completed';
                statusText = i18n.t('completed');
                break;
            case 'failed':
                statusClass = 'status-failed';
                statusText = i18n.t('failed');
                break;
        }
        
        statusCell.className = `status-cell ${statusClass}`;
        statusCell.innerHTML = statusText;
        
        // Update real-time viewer if this is the current test
        if (this.currentTestId === testId || data.status === 'testing') {
            const model = row.dataset.model;
            const prompt = row.dataset.prompt;
            const round = row.dataset.round;
            
            this.updateRealtimeViewer(testId, model, prompt, round, data);
        }
    }

    toggleResultExpansion(cell) {
        const fullText = cell.dataset.fullText;
        if (!fullText) return;

        const isExpanded = cell.dataset.expanded === 'true';
        
        if (isExpanded) {
            cell.textContent = this.truncateText(fullText, 100);
            cell.dataset.expanded = 'false';
        } else {
            cell.textContent = fullText;
            cell.dataset.expanded = 'true';
        }
    }

    clearResults() {
        const tbody = document.getElementById('resultsBody');
        tbody.innerHTML = '';
        this.testResults = [];
        
        // 清空统计表格
        const statisticsSection = document.getElementById('statisticsSection');
        if (statisticsSection) {
            statisticsSection.classList.add('hidden');
        }
        const statisticsBody = document.getElementById('statisticsBody');
        if (statisticsBody) {
            statisticsBody.innerHTML = '';
        }
    }

    updateStartButton(isRunning) {
        const button = document.getElementById('startTest');
        button.disabled = isRunning;
        button.textContent = isRunning ? i18n.t('testing') : i18n.t('startTest');
    }

    disableAllResultButtons() {
        const resultButtons = document.querySelectorAll('.view-result-btn');
        resultButtons.forEach(button => {
            button.disabled = true;
            button.classList.add('testing-state');
            // Store original state for restoration
            button.dataset.wasEnabled = !button.disabled;
            // Remove event listeners during testing
            if (button._boundHandler) {
                button.removeEventListener('click', button._boundHandler);
            }
        });
    }

    enableCompletedResultButtons() {
        const resultButtons = document.querySelectorAll('.view-result-btn');
        resultButtons.forEach(button => {
            // Only enable buttons that have results and were previously enabled
            if (button.dataset.fullText && button.dataset.fullText.trim() !== '') {
                button.disabled = false;
                button.classList.remove('testing-state');
                button.textContent = i18n.t('viewResult');
                button.title = i18n.t('clickToViewInViewer');
                
                // Event listener is handled by document delegation, no need to add individual listeners
            }
            // Clean up temporary data
            delete button.dataset.wasEnabled;
        });
    }

    showNotification(message) {
        // Simple notification - could be enhanced with a proper notification system
        // console.log('Notification:', message);
        
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Export results to CSV
    exportResults() {
        if (this.testResults.length === 0) {
            this.showNotification('No results to export');
            return;
        }

        const headers = ['Model', 'Prompt', 'Round', 'First Token (ms)', 'Output Speed (t/s)', 'Result', 'Error', 'Status'];
        const csvContent = [headers.join(',')];
        
        this.testResults.forEach(result => {
            const row = [
                this.escapeCsv(result.model),
                this.escapeCsv(result.prompt),
                result.round,
                result.firstTokenTime || '',
                result.outputSpeed || '',
                this.escapeCsv(result.result),
                this.escapeCsv(result.error),
                result.status
            ];
            csvContent.push(row.join(','));
        });

        const blob = new Blob([csvContent.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `api_test_results_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    escapeCsv(text) {
        if (typeof text !== 'string') return text;
        if (text.includes(',') || text.includes('"') || text.includes('\n')) {
            return '"' + text.replace(/"/g, '""') + '"';
        }
        return text;
    }

    // Real-time viewer methods
    toggleRealtimeViewer() {
        if (this.isViewerVisible) {
            this.hideRealtimeViewer();
        } else {
            this.showRealtimeViewer();
        }
    }

    showRealtimeViewer() {
        const viewer = document.getElementById('realtimeViewer');
        const toggleBtn = document.getElementById('toggleViewer');
        
        viewer.classList.remove('hidden');
        viewer.classList.add('visible');
        
        toggleBtn.textContent = i18n.t('hideRealTimeViewer');
        this.isViewerVisible = true;
    }

    hideRealtimeViewer() {
        const viewer = document.getElementById('realtimeViewer');
        const toggleBtn = document.getElementById('toggleViewer');
        
        viewer.classList.remove('visible');
        viewer.classList.add('hidden');
        
        toggleBtn.textContent = i18n.t('showRealTimeViewer');
        this.isViewerVisible = false;
    }

    // Result detail viewer methods
    showResultDetailViewer() {
        const viewer = document.getElementById('resultDetailViewer');
        viewer.classList.remove('hidden');
        viewer.classList.add('visible');
        this.isDetailViewerVisible = true;
    }

    hideResultDetailViewer() {
        const viewer = document.getElementById('resultDetailViewer');
        viewer.classList.remove('visible');
        viewer.classList.add('hidden');
        this.isDetailViewerVisible = false;
    }

    updateResultDetailViewer(testId, model, prompt, round, progress) {
        if (!this.isDetailViewerVisible) return;
        
        // Update test info
        document.getElementById('detailModel').textContent = model;
        document.getElementById('detailPrompt').textContent = prompt;
        document.getElementById('detailRound').textContent = `Round ${round}`;
        
        // Update status
        const statusElement = document.getElementById('detailStatus');
        statusElement.textContent = i18n.t(progress.status || 'testing');
        statusElement.className = `test-status ${progress.status || 'testing'}`;
        
        // Update result text
        const resultElement = document.getElementById('detailResult');
        resultElement.textContent = progress.result || '';
        
        // Auto-scroll to bottom
        const resultDisplay = resultElement.closest('.result-display');
        resultDisplay.scrollTop = resultDisplay.scrollHeight;
        
        // Update stats
        document.getElementById('detailFirstToken').textContent = 
            progress.firstTokenTime ? `${progress.firstTokenTime}ms` : '-';
        document.getElementById('detailSpeed').textContent = 
            progress.outputSpeed ? `${progress.outputSpeed} t/s` : '-';
        document.getElementById('detailTokens').textContent = 
            progress.result ? this.estimateTokens(progress.result) : '-';
    }

    handleViewResultClick(event, testId) {
        event.preventDefault();
        const button = event.target;
        const row = document.getElementById(testId);
        
        if (!row) return;
        
        // Prevent action if button is disabled or in testing state
        if (button.disabled || button.classList.contains('testing-state')) {
            return;
        }
        
        const model = row.dataset.model;
        const prompt = row.dataset.prompt;
        const round = row.dataset.round;
        const fullText = button.dataset.fullText;
        
        // Show the result detail viewer
        this.showResultDetailViewer();
        
        // For completed result only
        if (fullText) {
            this.updateResultDetailViewer(testId, model, prompt, round, {
                status: 'completed',
                result: fullText,
                firstTokenTime: row.querySelector('.first-token').textContent.replace('ms', '') || null,
                outputSpeed: row.querySelector('.output-speed').textContent || null
            });
        }
    }

    updateRealtimeViewer(testId, model, prompt, round, progress) {
        if (!this.isViewerVisible) return;
        
        this.currentTestId = testId;
        
        // Update test info
        document.getElementById('currentModel').textContent = model;
        document.getElementById('currentPrompt').textContent = prompt;
        document.getElementById('currentRound').textContent = `Round ${round}`;
        
        // Update status
        const statusElement = document.getElementById('currentStatus');
        statusElement.textContent = i18n.t(progress.status || 'testing');
        statusElement.className = `test-status ${progress.status || 'testing'}`;
        
        // Update result text with typing effect
        const resultElement = document.getElementById('realtimeResult');
        resultElement.textContent = progress.result || '';
        
        // Auto-scroll to bottom
        const resultDisplay = document.querySelector('.result-display');
        resultDisplay.scrollTop = resultDisplay.scrollHeight;
        
        // Update stats
        document.getElementById('viewerFirstToken').textContent = 
            progress.firstTokenTime ? `${progress.firstTokenTime}ms` : '-';
        document.getElementById('viewerSpeed').textContent = 
            progress.outputSpeed ? `${progress.outputSpeed} t/s` : '-';
        document.getElementById('viewerTokens').textContent = 
            progress.result ? this.estimateTokens(progress.result) : '-';
    }

    estimateTokens(text) {
        if (!text) return 0;
        // Simple token estimation: roughly 4 characters per token
        return Math.ceil(text.length / 4);
    }

    async generateStatistics() {
        if (this.testResults.length === 0) {
            return;
        }

        // 按模型分组统计
        const modelStats = {};
        
        this.testResults.forEach(result => {
            const model = result.model;
            if (!modelStats[model]) {
                modelStats[model] = {
                    firstTokenTimes: [],
                    outputSpeeds: [],
                    totalTests: 0,
                    successfulTests: 0,
                    inputTokens: 0,
                    outputTokens: 0
                };
            }
            
            modelStats[model].totalTests++;
            modelStats[model].inputTokens += this.estimateTokens(result.prompt || '');
            modelStats[model].outputTokens += this.estimateTokens(result.result || '');
            
            if (result.status === 'completed' && !result.error) {
                modelStats[model].successfulTests++;
                
                if (result.firstTokenTime && result.firstTokenTime > 0) {
                    modelStats[model].firstTokenTimes.push(result.firstTokenTime);
                }
                
                if (result.outputSpeed && result.outputSpeed > 0) {
                    modelStats[model].outputSpeeds.push(result.outputSpeed);
                }
            }
        });

        this.decorateModelStats(modelStats);

        // 保存历史记录
        const historyRecord = this.saveHistoryRecord(modelStats);
        this.currentHistoryRecord = historyRecord;

        // 计算平均值并显示统计表格
        this.displayStatistics(modelStats);

        const config = this.getConfig();
        if (historyRecord && config.syncCloudHistory && config.cloudApiUrl) {
            await this.syncHistoryRecordToCloud(historyRecord);
        }
    }

    displayStatistics(modelStats) {
        const statisticsSection = document.getElementById('statisticsSection');
        const statisticsBody = document.getElementById('statisticsBody');
        
        if (!statisticsSection || !statisticsBody) {
            console.error('Statistics elements not found');
            return;
        }

        // 清空现有内容
        statisticsBody.innerHTML = '';

        // 为每个模型创建统计行
        Object.keys(modelStats).forEach(model => {
            const stats = modelStats[model];
            
            // 计算平均首字响应时间
            const avgFirstToken = stats.firstTokenTimes.length > 0 
                ? (stats.firstTokenTimes.reduce((a, b) => a + b, 0) / stats.firstTokenTimes.length).toFixed(2)
                : '-';
            
            // 计算平均输出速度
            const avgOutputSpeed = stats.outputSpeeds.length > 0
                ? (stats.outputSpeeds.reduce((a, b) => a + b, 0) / stats.outputSpeeds.length).toFixed(2)
                : '-';
            
            // 计算成功率
            const successRate = stats.totalTests > 0
                ? ((stats.successfulTests / stats.totalTests) * 100).toFixed(1)
                : '0.0';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${model}</td>
                <td><span class="rank-badge">${stats.rank || '-'}</span> ${Number(stats.score || 0).toFixed(1)}</td>
                <td>${this.formatCost(stats.estimatedCost)}</td>
                <td>${avgFirstToken}${avgFirstToken !== '-' ? 'ms' : ''}</td>
                <td>${avgOutputSpeed}${avgOutputSpeed !== '-' ? ' tokens/s' : ''}</td>
                <td class="stats-success-rate" data-rate="${successRate}">${successRate}%</td>
            `;
            
            statisticsBody.appendChild(row);
        });

        // 显示统计表格
        statisticsSection.classList.remove('hidden');
        const shareButton = document.getElementById('shareReportBtn');
        if (shareButton) shareButton.disabled = !this.currentHistoryRecord;
        this.renderRecommendation(modelStats);
        
        // 刷新历史记录显示
        this.renderHistoryRecords();
    }

    // 保存历史记录到本地存储
    saveHistoryRecord(modelStats) {
        try {
            const config = this.getConfig();
            const timestamp = new Date().toISOString();
            
            // 创建历史记录条目
            const historyRecord = {
                timestamp: timestamp,
                apiUrl: config.apiUrl,
                protocol: config.protocol,
                testDate: new Date().toLocaleString('zh-CN'),
                // Keep the request configuration and individual results so a test
                // run can be inspected after a page refresh. The API key is
                // intentionally excluded from historical snapshots.
                testConfig: {
                    models: [...config.models],
                    prompts: [...config.prompts],
                    rounds: config.rounds
                },
                results: this.testResults.map(result => ({
                    testId: result.testId,
                    model: result.model,
                    prompt: result.prompt,
                    round: result.round,
                    firstTokenTime: result.firstTokenTime,
                    outputSpeed: result.outputSpeed,
                    result: result.result,
                    error: result.error,
                    status: result.status
                })),
                modelStats: {},
                summary: {
                    totalModels: Object.keys(modelStats).length,
                    totalTests: this.testResults.length,
                    successfulTests: this.testResults.filter(r => r.status === 'completed' && !r.error).length
                },
                recommendation: ''
            };

            // 计算每个模型的统计数据
            Object.keys(modelStats).forEach(model => {
                const stats = modelStats[model];
                
                const avgFirstToken = stats.firstTokenTimes.length > 0 
                    ? (stats.firstTokenTimes.reduce((a, b) => a + b, 0) / stats.firstTokenTimes.length)
                    : null;
                
                const avgOutputSpeed = stats.outputSpeeds.length > 0
                    ? (stats.outputSpeeds.reduce((a, b) => a + b, 0) / stats.outputSpeeds.length)
                    : null;
                
                const successRate = stats.totalTests > 0
                    ? (stats.successfulTests / stats.totalTests) * 100
                    : 0;
                
                historyRecord.modelStats[model] = {
                    avgFirstTokenTime: avgFirstToken,
                    avgOutputSpeed: avgOutputSpeed,
                    successRate: successRate,
                    totalTests: stats.totalTests,
                    successfulTests: stats.successfulTests,
                    inputTokens: stats.inputTokens,
                    outputTokens: stats.outputTokens,
                    estimatedCost: stats.estimatedCost,
                    score: stats.score,
                    rank: stats.rank
                };
            });

            const ranked = Object.entries(modelStats).sort((a, b) => (b[1].score || 0) - (a[1].score || 0));
            historyRecord.recommendation = ranked[0]?.[0] || '';
            historyRecord.cost = {
                inputPrice: config.inputPrice,
                outputPrice: config.outputPrice,
                estimatedTotalCost: Object.values(modelStats).reduce((total, stats) => total + (stats.estimatedCost || 0), 0),
                configured: config.inputPrice > 0 || config.outputPrice > 0
            };

            // 获取现有历史记录
            const existingHistory = this.getHistoryRecords();
            
            // 添加新记录到开头
            existingHistory.unshift(historyRecord);
            
            // 只保留最近5条记录
            const limitedHistory = existingHistory.slice(0, 5);
            
            // 保存到本地存储
            localStorage.setItem('apiTesterHistory', JSON.stringify(limitedHistory));
            return historyRecord;
        } catch (e) {
            console.warn('保存历史记录失败:', e);
            return null;
        }
    }

    decorateModelStats(modelStats) {
        const inputPrice = this.getPrice('inputPrice');
        const outputPrice = this.getPrice('outputPrice');
        const entries = Object.values(modelStats);
        const latencies = entries.map(stats => stats.firstTokenTimes.length ? stats.firstTokenTimes.reduce((a, b) => a + b, 0) / stats.firstTokenTimes.length : null).filter(value => value > 0);
        const speeds = entries.map(stats => stats.outputSpeeds.length ? stats.outputSpeeds.reduce((a, b) => a + b, 0) / stats.outputSpeeds.length : null).filter(value => value > 0);
        const minLatency = Math.min(...latencies);
        const maxSpeed = Math.max(...speeds);
        Object.entries(modelStats).forEach(([model, stats]) => {
            const latency = stats.firstTokenTimes.length ? stats.firstTokenTimes.reduce((a, b) => a + b, 0) / stats.firstTokenTimes.length : null;
            const speed = stats.outputSpeeds.length ? stats.outputSpeeds.reduce((a, b) => a + b, 0) / stats.outputSpeeds.length : null;
            const reliability = stats.totalTests ? (stats.successfulTests / stats.totalTests) * 100 : 0;
            const latencyScore = latency && Number.isFinite(minLatency) ? Math.min(100, (minLatency / latency) * 100) : 0;
            const speedScore = speed && Number.isFinite(maxSpeed) ? Math.min(100, (speed / maxSpeed) * 100) : 0;
            stats.score = reliability * 0.5 + latencyScore * 0.3 + speedScore * 0.2;
            stats.estimatedCost = inputPrice > 0 || outputPrice > 0
                ? (stats.inputTokens / 1000000) * inputPrice + (stats.outputTokens / 1000000) * outputPrice
                : null;
        });
        Object.entries(modelStats).sort((a, b) => b[1].score - a[1].score).forEach(([model], index) => {
            modelStats[model].rank = index + 1;
        });
    }

    getPrice(id) {
        const value = Number.parseFloat(document.getElementById(id)?.value);
        return Number.isFinite(value) && value >= 0 ? value : 0;
    }

    formatCost(value) {
        return value == null || !Number.isFinite(Number(value)) ? '-' : `$${Number(value).toFixed(4)}`;
    }

    renderRecommendation(modelStats) {
        const panel = document.getElementById('recommendationPanel');
        if (!panel) return;
        const ranked = Object.entries(modelStats).sort((a, b) => (b[1].score || 0) - (a[1].score || 0));
        if (!ranked.length) { panel.classList.add('hidden'); return; }
        const fastest = Object.entries(modelStats).filter(([, stats]) => stats.firstTokenTimes.length).sort((a, b) => (a[1].firstTokenTimes.reduce((x, y) => x + y, 0) / a[1].firstTokenTimes.length) - (b[1].firstTokenTimes.reduce((x, y) => x + y, 0) / b[1].firstTokenTimes.length))[0]?.[0];
        const stable = Object.entries(modelStats).sort((a, b) => (b[1].successRate || (b[1].successfulTests / b[1].totalTests * 100)) - (a[1].successRate || (a[1].successfulTests / a[1].totalTests * 100)))[0]?.[0];
        panel.classList.remove('hidden');
        panel.innerHTML = `<strong>${i18n.t('recommendedModel')}:</strong> ${this.escapeHtml(ranked[0][0])} (${ranked[0][1].score.toFixed(1)}) · <strong>${i18n.t('fastestModel')}:</strong> ${this.escapeHtml(fastest || '-')} · <strong>${i18n.t('stableModel')}:</strong> ${this.escapeHtml(stable || '-')}`;
    }

    async createShareReport() {
        if (!this.currentHistoryRecord) return;
        const button = document.getElementById('shareReportBtn');
        try {
            button.disabled = true;
            button.textContent = i18n.t('reportCreating');
            const result = await this.getCloudHistoryClient().createShareReport(this.currentHistoryRecord);
            const url = new URL(window.location.href);
            url.searchParams.set('report', result.id);
            url.hash = '';
            const shareUrl = url.toString();
            await navigator.clipboard?.writeText(shareUrl);
            const linkContainer = document.getElementById('shareReportLink');
            if (linkContainer) {
                linkContainer.innerHTML = `<a href="${this.escapeHtml(shareUrl)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(shareUrl)}</a>`;
            }
            button.textContent = i18n.t('shareReport');
            button.disabled = false;
            button.title = i18n.t('reportCreated');
        } catch (error) {
            button.textContent = `${i18n.t('reportCreateFailed')}: ${error.message}`;
            button.disabled = false;
        }
    }

    async loadSharedReportFromUrl() {
        const id = new URLSearchParams(window.location.search).get('report');
        if (!id) return;
        try {
            const report = await this.getCloudHistoryClient().getShareReport(id);
            if (!report) throw new Error(i18n.t('reportNotFound'));
            this.renderSharedReport(report);
            this.enterSharedReportMode();
        } catch (error) {
            const section = document.getElementById('sharedReportSection');
            const content = document.getElementById('sharedReportContent');
            if (section && content) {
                section.classList.remove('hidden');
                content.textContent = error.message;
                this.enterSharedReportMode();
            }
        }
    }

    renderSharedReport(report) {
        const section = document.getElementById('sharedReportSection');
        const content = document.getElementById('sharedReportContent');
        if (!section || !content) return;
        const rows = Object.entries(report.modelStats || {}).sort((a, b) => (a[1].rank || 99) - (b[1].rank || 99)).map(([model, stats]) => `<tr><td><span class="rank-badge">${stats.rank || '-'}</span> ${this.escapeHtml(model)}</td><td>${Number(stats.score || 0).toFixed(1)}</td><td>${this.formatCost(stats.estimatedCost)}</td><td>${stats.avgFirstTokenTime ? Number(stats.avgFirstTokenTime).toFixed(0) + ' ms' : '-'}</td><td>${stats.avgOutputSpeed ? Number(stats.avgOutputSpeed).toFixed(1) + ' tokens/s' : '-'}</td><td>${Number(stats.successRate || 0).toFixed(1)}%</td></tr>`).join('');
        const costSummary = report.cost?.configured ? ` · ${i18n.t('totalEstimatedCost')}: <strong>${this.formatCost(report.cost.estimatedTotalCost)}</strong>` : '';
        content.innerHTML = `<p class="shared-report-meta">${this.escapeHtml(report.protocol)} · ${this.escapeHtml(report.endpointHost)} · ${new Date(report.createdAt).toLocaleString()}</p><p>${i18n.t('recommendedModel')}: <strong>${this.escapeHtml(report.recommendation || '-')}</strong> · ${i18n.t('totalTests')}: ${report.totalTests} · ${i18n.t('successfulTests')}: ${report.successfulTests}${costSummary}</p><div class="table-container"><table class="shared-report-table"><thead><tr><th>${i18n.t('model')}</th><th>${i18n.t('recommendationScore')}</th><th>${i18n.t('estimatedCost')}</th><th>${i18n.t('averageFirstToken')}</th><th>${i18n.t('averageOutputSpeed')}</th><th>${i18n.t('successRate')}</th></tr></thead><tbody>${rows}</tbody></table></div><p><a class="back-to-tester" href="${this.escapeHtml(window.location.pathname)}">← ${i18n.t('backToTester')}</a></p>`;
        section.classList.remove('hidden');
    }

    enterSharedReportMode() {
        const reportSection = document.getElementById('sharedReportSection');
        document.querySelectorAll('main > section').forEach(section => {
            if (section !== reportSection) section.classList.add('hidden');
        });
        reportSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    escapeHtml(value) {
        return String(value ?? '').replace(/[&<>\"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' }[character]));
    }

    getCloudApiUrl() {
        const input = document.getElementById('cloudApiUrl');
        const value = input?.value || DEFAULT_CLOUD_API_URL;
        if (input && !input.value) input.value = DEFAULT_CLOUD_API_URL;
        return value.trim().replace(/\/$/, '');
    }

    getCloudHistoryClient() {
        const apiUrl = this.getCloudApiUrl();
        if (!this.cloudHistoryClient || this.cloudHistoryClient.baseUrl !== apiUrl) {
            this.cloudHistoryClient = new CloudHistoryClient(apiUrl);
        }
        return this.cloudHistoryClient;
    }

    async syncHistoryRecordToCloud(record) {
        const status = document.getElementById('cloudHistoryStatus');
        try {
            status.className = 'cloud-status';
            status.textContent = i18n.t('cloudSaving');
            await this.getCloudHistoryClient().saveRun(record);
            status.className = 'cloud-status success';
            status.textContent = i18n.t('cloudSaved');
            await this.loadCloudHistory();
        } catch (error) {
            status.className = 'cloud-status error';
            status.textContent = `${i18n.t('cloudSaveFailed')}: ${error.message}`;
        }
    }

    async loadCloudHistory(showErrors = false) {
        const status = document.getElementById('cloudHistoryStatus');
        const client = this.getCloudHistoryClient();
        if (!client.isConfigured()) {
            if (showErrors) {
                status.className = 'cloud-status error';
                status.textContent = i18n.t('cloudNotConfigured');
            }
            return;
        }

        try {
            status.className = 'cloud-status';
            status.textContent = i18n.t('cloudLoading');
            const runs = await client.listRuns();
            this.renderCloudHistoryRecords(runs);
            status.className = 'cloud-status success';
            status.textContent = i18n.t('cloudLoaded');
        } catch (error) {
            status.className = 'cloud-status error';
            status.textContent = `${i18n.t('cloudLoadFailed')}: ${error.message}`;
        }
    }

    renderCloudHistoryRecords(runs) {
        const container = document.getElementById('cloudHistoryContent');
        if (!container) return;
        container.innerHTML = '';
        if (!runs.length) return;

        const heading = document.createElement('h3');
        heading.textContent = i18n.t('cloudHistory');
        container.appendChild(heading);
        runs.forEach(run => {
            const record = document.createElement('div');
            record.className = 'cloud-history-record';
            const title = document.createElement('button');
            title.className = 'cloud-record-toggle';
            title.type = 'button';
            title.title = i18n.t('viewRunDetails');
            title.textContent = `${new Date(run.createdAt).toLocaleString()} - ${run.models.join(', ')}`;
            const meta = document.createElement('p');
            meta.textContent = `${run.protocol} | ${run.endpointHost}`;
            const summary = document.createElement('div');
            summary.className = 'summary-stats';
            const successRate = run.totalTests > 0 ? ((run.successfulTests / run.totalTests) * 100).toFixed(1) : '0.0';
            summary.textContent = `${i18n.t('totalTests')}: ${run.totalTests} | ${i18n.t('successRate')}: ${successRate}%`;
            const details = document.createElement('div');
            details.className = 'cloud-run-details hidden';
            title.addEventListener('click', () => this.toggleCloudRunDetails(run.id, details, title));
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.textContent = i18n.t('deleteCloudRecord');
            deleteButton.addEventListener('click', async () => {
                await this.getCloudHistoryClient().deleteRun(run.id);
                await this.loadCloudHistory(true);
            });
            record.append(title, meta, summary, details, deleteButton);
            container.appendChild(record);
        });
    }

    async toggleCloudRunDetails(runId, container, toggle) {
        if (!container.classList.contains('hidden')) {
            container.classList.add('hidden');
            return;
        }
        container.classList.remove('hidden');
        if (container.dataset.loaded === 'true') return;
        container.textContent = i18n.t('loadingDetails');
        try {
            const run = await this.getCloudHistoryClient().getRun(runId);
            const results = run?.results || [];
            if (!results.length) {
                container.textContent = i18n.t('noRunResults');
                container.dataset.loaded = 'true';
                return;
            }
            const rows = results.map(result => `<tr><td>${this.escapeHtml(result.model)}</td><td>${result.round || '-'}</td><td>${result.first_token_ms != null ? Number(result.first_token_ms).toFixed(0) + ' ms' : '-'}</td><td>${result.output_speed != null ? Number(result.output_speed).toFixed(1) + ' tokens/s' : '-'}</td><td>${this.escapeHtml(result.status || '-')}</td><td>${this.escapeHtml(result.error_code || '-')}</td></tr>`).join('');
            container.innerHTML = `<table><thead><tr><th>${i18n.t('model')}</th><th>${i18n.t('round')}</th><th>${i18n.t('firstTokenTime')}</th><th>${i18n.t('outputSpeed')}</th><th>${i18n.t('status')}</th><th>${i18n.t('error')}</th></tr></thead><tbody>${rows}</tbody></table>`;
            container.dataset.loaded = 'true';
        } catch (error) {
            container.textContent = error.message;
        }
    }

    async confirmClearCloudHistory() {
        if (!confirm(i18n.t('confirmClearCloudHistory'))) return;
        const status = document.getElementById('cloudHistoryStatus');
        try {
            await this.getCloudHistoryClient().clearRuns();
            this.renderCloudHistoryRecords([]);
            status.className = 'cloud-status success';
            status.textContent = i18n.t('cloudHistoryCleared');
        } catch (error) {
            status.className = 'cloud-status error';
            status.textContent = `${i18n.t('cloudLoadFailed')}: ${error.message}`;
        }
    }

    // 获取历史记录
    getHistoryRecords() {
        try {
            const saved = localStorage.getItem('apiTesterHistory');
            const records = saved ? JSON.parse(saved) : [];
            return Array.isArray(records) ? records : [];
        } catch (e) {
            console.warn('读取历史记录失败:', e);
            return [];
        }
    }

    // 清除历史记录
    clearHistoryRecords() {
        try {
            localStorage.removeItem('apiTesterHistory');
            // console.log('历史记录已清除');
        } catch (e) {
            console.warn('清除历史记录失败:', e);
        }
    }

    // 显示历史记录（可用于调试或未来的UI功能）
    displayHistoryRecords() {
        const history = this.getHistoryRecords();
        // console.log('历史记录:', history);
        return history;
    }

    // 渲染历史记录
    renderHistoryRecords() {
        const historyContent = document.getElementById('historyContent');
        if (!historyContent) return;
        const history = this.getHistoryRecords();
        
        if (history.length === 0) {
            historyContent.innerHTML = `
                <div class="history-empty">
                    <p data-i18n="historyEmpty">No history records found</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        history.forEach((record, index) => {
            html += `
                <div class="history-record">
                    <div class="history-header">
                        <h3><span data-i18n="record">Record</span> #${index + 1}</h3>
                        <div class="history-meta">
                            <span class="test-date">
                                <strong data-i18n="testDate">Test Date:</strong> ${record.testDate}
                            </span>
                            <span class="api-endpoint">
                                <strong data-i18n="apiEndpoint">API Endpoint:</strong> ${record.apiUrl}
                            </span>
                            <span class="protocol">
                                <strong data-i18n="protocol">Protocol:</strong> ${record.protocol}
                            </span>
                        </div>
                    </div>
                    <div class="history-summary">
                        <div class="summary-stats">
                            <span><strong data-i18n="totalModels">Total Models:</strong> ${record.summary.totalModels}</span>
                            <span><strong data-i18n="totalTests">Total Tests:</strong> ${record.summary.totalTests}</span>
                            <span><strong data-i18n="successfulTests">Successful Tests:</strong> ${record.summary.successfulTests}</span>
                            <span><strong data-i18n="successRate">Success Rate:</strong> ${((record.summary.successfulTests / record.summary.totalTests) * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                    <div class="history-details">
                        <table class="history-table">
                            <thead>
                                <tr>
                                    <th data-i18n="model">Model</th>
                                    <th data-i18n="averageFirstToken">Avg First Token (ms)</th>
                                    <th data-i18n="averageOutputSpeed">Avg Output Speed (t/s)</th>
                                    <th data-i18n="successRate">Success Rate</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            Object.keys(record.modelStats).forEach(model => {
                const stats = record.modelStats[model];
                html += `
                    <tr>
                        <td>${model}</td>
                        <td>${stats.avgFirstTokenTime ? stats.avgFirstTokenTime.toFixed(2) + 'ms' : '-'}</td>
                        <td>${stats.avgOutputSpeed ? stats.avgOutputSpeed.toFixed(2) + ' ' + (i18n ? i18n.t('tokensPerSecond') : 'tokens/s') : '-'}</td>
                        <td>${stats.successRate.toFixed(1)}%</td>
                    </tr>
                `;
            });
            
            html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        });
        
        historyContent.innerHTML = html;
        
        // 重新应用国际化翻译
        if (window.i18n) {
            window.i18n.updateTexts();
        }
    }

    // 确认清除历史记录
    confirmClearHistory() {
        if (confirm(i18n ? i18n.t('confirmClearHistory') : 'Are you sure you want to clear all history records? This action cannot be undone.')) {
            this.clearHistoryRecords();
            this.renderHistoryRecords();
            alert(i18n ? i18n.t('historyCleared') : 'History records have been cleared.');
        }
    }
}

// Initialize the application when DOM is loaded
let apiTester;
document.addEventListener('DOMContentLoaded', () => {
    apiTester = new APITester();
});
