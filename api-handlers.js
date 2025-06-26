// API handlers for different AI providers
class APIHandler {
    constructor(protocol, apiUrl, apiKey) {
        this.protocol = protocol;
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async testModel(model, prompt, onProgress) {
        const startTime = Date.now();
        let firstTokenTime = null;
        let totalTokens = 0;
        let result = '';
        let error = null;

        try {
            if (this.protocol === 'openai') {
                return await this.testOpenAI(model, prompt, startTime, onProgress);
            } else if (this.protocol === 'gemini') {
                return await this.testGemini(model, prompt, startTime, onProgress);
            } else {
                throw new Error('Unsupported protocol');
            }
        } catch (err) {
            const errorResult = {
                firstTokenTime: null,
                outputSpeed: 0,
                result: '',
                error: err.message,
                status: 'failed'
            };
            
            // Call onProgress to immediately update the UI with error
            if (onProgress) {
                onProgress(errorResult);
            }
            
            return errorResult;
        }
    }

    async testOpenAI(model, prompt, startTime, onProgress) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                stream: true,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData}`);
        }

        return await this.processStreamResponse(response, startTime, onProgress);
    }

    async testGemini(model, prompt, startTime, onProgress) {
        // Gemini API endpoint construction
        const url = `${this.apiUrl}/v1/models/${model}:streamGenerateContent?key=${this.apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: 1000
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData}`);
        }

        return await this.processGeminiStreamResponse(response, startTime, onProgress);
    }

    async processStreamResponse(response, startTime, onProgress) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let firstTokenTime = null;
        let totalTokens = 0;
        let result = '';
        let buffer = '';
        let finishReason = null;

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content;
                            const currentFinishReason = parsed.choices?.[0]?.finish_reason;
                            
                            // 记录finish_reason
                            if (currentFinishReason) {
                                finishReason = currentFinishReason;
                            }
                            
                            if (content) {
                                if (firstTokenTime === null) {
                                    firstTokenTime = Date.now() - startTime;
                                }
                                
                                result += content;
                                totalTokens += this.estimateTokens(content);
                                
                                const outputSpeed = totalTokens / ((Date.now() - startTime) / 1000);
                                onProgress({
                                    firstTokenTime,
                                    outputSpeed: outputSpeed.toFixed(2),
                                    result,
                                    error: null,
                                    status: 'testing'
                                });
                            }
                        } catch (e) {
                            // Skip invalid JSON lines
                            continue;
                        }
                    }
                }
            }

            const totalTime = (Date.now() - startTime) / 1000;
            const finalOutputSpeed = totalTokens / totalTime;
            
            // 检查finish_reason，如果不是'stop'则判定为失败
            const isSuccess = finishReason === 'stop';
            const status = isSuccess ? 'completed' : 'failed';
            const error = isSuccess ? null : `Invalid finish_reason: ${finishReason || 'missing'}`;

            return {
                firstTokenTime,
                outputSpeed: finalOutputSpeed.toFixed(2),
                result,
                error,
                status
            };
        } finally {
            reader.releaseLock();
        }
    }

    async processGeminiStreamResponse(response, startTime, onProgress) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let firstTokenTime = null;
        let totalTokens = 0;
        let result = '';
        let buffer = '';
        let finishReason = null;

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const parsed = JSON.parse(line);
                            const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                            const currentFinishReason = parsed.candidates?.[0]?.finishReason;
                            
                            // 记录finish_reason
                            if (currentFinishReason) {
                                finishReason = currentFinishReason;
                            }
                            
                            if (content) {
                                if (firstTokenTime === null) {
                                    firstTokenTime = Date.now() - startTime;
                                }
                                
                                result += content;
                                totalTokens += this.estimateTokens(content);
                                
                                const outputSpeed = totalTokens / ((Date.now() - startTime) / 1000);
                                onProgress({
                                    firstTokenTime,
                                    outputSpeed: outputSpeed.toFixed(2),
                                    result,
                                    error: null,
                                    status: 'testing'
                                });
                            }
                        } catch (e) {
                            // Skip invalid JSON lines
                            continue;
                        }
                    }
                }
            }

            const totalTime = (Date.now() - startTime) / 1000;
            const finalOutputSpeed = totalTokens / totalTime;
            
            // 检查finish_reason，Gemini的正常完成状态是'STOP'
            const isSuccess = finishReason === 'STOP';
            const status = isSuccess ? 'completed' : 'failed';
            const error = isSuccess ? null : `Invalid finish_reason: ${finishReason || 'missing'}`;

            return {
                firstTokenTime,
                outputSpeed: finalOutputSpeed.toFixed(2),
                result,
                error,
                status
            };
        } finally {
            reader.releaseLock();
        }
    }

    // Simple token estimation (rough approximation)
    estimateTokens(text) {
        // Rough estimation: 1 token ≈ 4 characters for English
        // This is a simplified approach, real tokenization is more complex
        return Math.ceil(text.length / 4);
    }

    // Validate API configuration
    static validateConfig(protocol, apiUrl, apiKey, models, prompts) {
        const errors = [];

        if (!protocol) {
            errors.push('Protocol is required');
        }

        if (!apiUrl || !this.isValidUrl(apiUrl)) {
            errors.push('Valid API URL is required');
        }

        if (!apiKey || apiKey.trim().length === 0) {
            errors.push('API Key is required');
        }

        if (!models || models.length === 0) {
            errors.push('At least one model is required');
        }

        if (!prompts || prompts.length === 0) {
            errors.push('At least one prompt is required');
        }

        if (prompts && prompts.length > 5) {
            errors.push('Maximum 5 prompts allowed');
        }

        return errors;
    }

    static isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Get default API URLs for different protocols
    static getDefaultApiUrl(protocol) {
        const defaults = {
            'openai': 'https://api.openai.com/v1/chat/completions',
            'gemini': 'https://generativelanguage.googleapis.com'
        };
        return defaults[protocol] || '';
    }
}