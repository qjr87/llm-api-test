# LLM API Test Tool

**Read this in other languages**: [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

A tool for testing and comparing the performance of different Large Language Model APIs.

## Features

- 🚀 **Multi-API Support**: Compatible with OpenAI, Google Gemini, and other major LLM APIs
- ⚡ **Performance Testing**: Measures first token response time, output speed, and success rate
- 📊 **Data Visualization**: Real-time display of test results and statistics
- 🌍 **Multi-language Support**: Available in English, Chinese, French, Japanese, German, Spanish, and Arabic
- 📱 **Responsive Design**: Adapts to desktop and mobile devices
- 💾 **History Records**: Automatic saving of test history with data export options
- ☁️ **Cloudflare Workers**: Supports deployment to edge computing platforms

## Quick Start

### Local Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/llm-api-test.git
cd llm-api-test
```

2. Start a local server
```bash
python -m http.server 8000
```

3. Open your browser and navigate to `http://localhost:8000`

### API Configuration

1. Select the API provider you want to test in the configuration area
2. Enter the corresponding API key and endpoint
3. Set test parameters (rounds, concurrency, etc.)
4. Click the "Start Test" button

## Supported APIs

- **OpenAI**: GPT-3.5, GPT-4 series models
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **Custom APIs**: Support for other APIs compatible with OpenAI format

## Deployment

### Cloudflare Workers Deployment

1. Install Wrangler CLI
```bash
npm install -g wrangler
```

2. Login to Cloudflare
```bash
wrangler login
```

3. Build and deploy
```bash
node build-worker.js
wrangler deploy
```

For detailed deployment instructions, please refer to [DEPLOYMENT.md](DEPLOYMENT.md)

## Project Structure

```
llm-api-test/
├── index.html          # Main page
├── app.js             # Main application logic
├── api-handlers.js    # API handlers
├── styles.css         # Stylesheet
├── i18n.js           # Internationalization config
├── worker.js         # Cloudflare Workers script
├── build-worker.js   # Workers build script
└── wrangler.toml     # Cloudflare configuration
```

## Tech Stack

- **Frontend**: Native HTML/CSS/JavaScript
- **Deployment**: Cloudflare Workers
- **APIs**: Support for multiple LLM APIs
- **Internationalization**: Multi-language support

## Contributing

Contributions are welcome! Feel free to submit Issues and Pull Requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details