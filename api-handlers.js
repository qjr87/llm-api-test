// API handlers for different LLM providers

class BaseAPIHandler {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async testAPI(model, prompt) {
        const startTime = Date.now();
        let firstTokenTime = null;
        let tokenCount = 0;
        let content = '';

        try {
            const response = await this.makeRequest(model, prompt);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep incomplete line in buffer

                for (const line of lines) {
                    if (line.trim() === '') continue;
                    
                    try {
                        const chunk = this.parseChunk(line);
                        if (chunk) {
                            if (firstTokenTime === null) {
                                firstTokenTime = Date.now() - startTime;
                            }
                            
                            content += chunk;
                            tokenCount++;
                        }
                    } catch (e) {
                        // Skip invalid chunks
                        console.warn('Failed to parse chunk:', line, e);
                    }
                }
            }

            const totalTime = Date.now() - startTime;
            const outputSpeed = tokenCount > 0 ? (tokenCount / (totalTime / 1000)) : 0;

            return {
                content: content.trim(),
                firstTokenTime,
                outputSpeed,
                tokenCount,
                totalTime
            };

        } catch (error) {
            throw new Error(`API request failed: ${error.message}`);
        }
    }

    // Abstract methods to be implemented by subclasses
    async makeRequest(model, prompt) {
        throw new Error('makeRequest must be implemented by subclass');
    }

    parseChunk(line) {
        throw new Error('parseChunk must be implemented by subclass');
    }
}

class OpenAIHandler extends BaseAPIHandler {
    async makeRequest(model, prompt) {
        const requestBody = {
            model: model,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            stream: true,
            max_tokens: 1000,
            temperature: 0.7
        };

        return fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(requestBody)
        });
    }

    parseChunk(line) {
        if (!line.startsWith('data: ')) return null;
        
        const data = line.slice(6).trim();
        if (data === '[DONE]') return null;
        
        try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            return delta?.content || null;
        } catch (e) {
            return null;
        }
    }
}

class GeminiHandler extends BaseAPIHandler {
    async makeRequest(model, prompt) {
        // Extract model name from full model string if needed
        const modelName = model.includes('/') ? model.split('/').pop() : model;
        
        // Construct the full URL for Gemini API
        let url = this.apiUrl;
        if (!url.includes('generateContent')) {
            url = `${url.replace(/\/$/, '')}/v1beta/models/${modelName}:generateContent`;
        } else if (!url.includes(modelName)) {
            url = url.replace(/models\/[^:]+/, `models/${modelName}`);
        }
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000
            },
            stream: true
        };

        return fetch(`${url}?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
    }

    parseChunk(line) {
        if (!line.startsWith('data: ')) return null;
        
        const data = line.slice(6).trim();
        if (!data || data === '[DONE]') return null;
        
        try {
            const parsed = JSON.parse(data);
            const candidates = parsed.candidates;
            if (candidates && candidates.length > 0) {
                const content = candidates[0].content;
                if (content && content.parts && content.parts.length > 0) {
                    return content.parts[0].text || null;
                }
            }
            return null;
        } catch (e) {
            return null;
        }
    }
}