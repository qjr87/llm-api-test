// Main application logic
class APITester {
    constructor() {
        this.isRunning = false;
        this.currentTests = [];
        this.testResults = [];
        this.currentTestId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupProtocolDefaults();
        this.loadSavedConfig();
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
        const configInputs = ['protocol', 'apiUrl', 'apiKey', 'models', 'prompts', 'rounds'];
        configInputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.saveConfig());
                element.addEventListener('change', () => this.saveConfig());
            }
        });

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
        
        // 默认显示历史记录
        this.renderHistoryRecords();

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
        if (!apiUrlInput.value || Object.values(APIHandler.getDefaultApiUrl('')).includes(apiUrlInput.value)) {
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
                        element.value = config[key];
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
                rounds: document.getElementById('rounds').value
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
            rounds: parseInt(document.getElementById('rounds').value) || 1
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
            this.generateStatistics();
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
        console.log('Notification:', message);
        
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

    generateStatistics() {
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
                    successfulTests: 0
                };
            }
            
            modelStats[model].totalTests++;
            
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

        // 保存历史记录
        this.saveHistoryRecord(modelStats);

        // 计算平均值并显示统计表格
        this.displayStatistics(modelStats);
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
                <td>${avgFirstToken}${avgFirstToken !== '-' ? 'ms' : ''}</td>
                <td>${avgOutputSpeed}${avgOutputSpeed !== '-' ? ' tokens/s' : ''}</td>
                <td class="stats-success-rate" data-rate="${successRate}">${successRate}%</td>
            `;
            
            statisticsBody.appendChild(row);
        });

        // 显示统计表格
        statisticsSection.classList.remove('hidden');
        
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
                modelStats: {},
                summary: {
                    totalModels: Object.keys(modelStats).length,
                    totalTests: this.testResults.length,
                    successfulTests: this.testResults.filter(r => r.status === 'completed' && !r.error).length
                }
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
                    successfulTests: stats.successfulTests
                };
            });

            // 获取现有历史记录
            const existingHistory = this.getHistoryRecords();
            
            // 添加新记录到开头
            existingHistory.unshift(historyRecord);
            
            // 只保留最近5条记录
            const limitedHistory = existingHistory.slice(0, 5);
            
            // 保存到本地存储
            localStorage.setItem('apiTesterHistory', JSON.stringify(limitedHistory));
            
            console.log('历史记录已保存:', historyRecord);
        } catch (e) {
            console.warn('保存历史记录失败:', e);
        }
    }

    // 获取历史记录
    getHistoryRecords() {
        try {
            const saved = localStorage.getItem('apiTesterHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.warn('读取历史记录失败:', e);
            return [];
        }
    }

    // 清除历史记录
    clearHistoryRecords() {
        try {
            localStorage.removeItem('apiTesterHistory');
            console.log('历史记录已清除');
        } catch (e) {
            console.warn('清除历史记录失败:', e);
        }
    }

    // 显示历史记录（可用于调试或未来的UI功能）
    displayHistoryRecords() {
        const history = this.getHistoryRecords();
        console.log('历史记录:', history);
        return history;
    }

    // 渲染历史记录
    renderHistoryRecords() {
        const historyContent = document.getElementById('historyContent');
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