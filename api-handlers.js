class APIHandler {
    constructor(config) {
        this.config = config;
    }

    async sendRequest() {
        switch (this.config.apiProvider) {
            case 'openai':
                return await this.sendOpenAIRequest();
            case 'gemini':
                return await this.sendGeminiRequest();
            case 'custom':
                return await this.sendCustomRequest();
            default:
                throw new Error('Unsupported API provider');
        }
    }

    async sendOpenAIRequest() {
        const requestBody = {
            model: this.config.model,
            messages: [
                {
                    role: 'user',
                    content: this.config.testPrompt
                }
            ],
            max_tokens: this.config.maxTokens,
            temperature: this.config.temperature,
            stream: true
        };

        const response = await fetch(this.config.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return await this.processStreamResponse(response);
    }

    async sendGeminiRequest() {
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: this.config.testPrompt
                        }
                    ]
                }
            ],
            generationConfig: {
                maxOutputTokens: this.config.maxTokens,
                temperature: this.config.temperature
            }
        };

        const url = `${this.config.apiEndpoint}?key=${this.config.apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No response from Gemini API');
        }

        const content = data.candidates[0].content.parts[0].text;
        const tokens = this.estimateTokens(content);
        
        return {
            response: content,
            tokens: tokens,
            firstTokenTime: 100, // Estimated for non-streaming
            speed: tokens / 1 // Estimated speed
        };
    }

    async sendCustomRequest() {
        // Assume OpenAI-compatible format for custom APIs
        const requestBody = {
            model: this.config.model,
            messages: [
                {
                    role: 'user',
                    content: this.config.testPrompt
                }
            ],
            max_tokens: this.config.maxTokens,
            temperature: this.config.temperature,
            stream: true
        };

        const response = await fetch(this.config.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return await this.processStreamResponse(response);
    }

    async processStreamResponse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        let firstTokenTime = null;
        let fullResponse = '';
        let tokenCount = 0;
        const startTime = Date.now();
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        
                        if (data === '[DONE]') {
                            break;
                        }
                        
                        try {
                            const parsed = JSON.parse(data);
                            
                            if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta) {
                                const content = parsed.choices[0].delta.content;
                                
                                if (content) {
                                    if (firstTokenTime === null) {
                                        firstTokenTime = Date.now() - startTime;
                                    }
                                    
                                    fullResponse += content;
                                    tokenCount += this.estimateTokens(content);
                                }
                            }
                        } catch (e) {
                            // Skip invalid JSON
                        }
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }
        
        const totalTime = Date.now() - startTime;
        const speed = tokenCount / (totalTime / 1000);
        
        return {
            response: fullResponse,
            tokens: tokenCount,
            firstTokenTime: firstTokenTime || totalTime,
            speed: speed
        };
    }

    estimateTokens(text) {
        // Simple token estimation (roughly 4 characters per token for English)
        return Math.ceil(text.length / 4);
    }
}