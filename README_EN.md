# LLM API Test

A tool for testing and comparing the performance of different Large Language Model APIs.

## Features

- **Multi-API Support**: Compatible with OpenAI API and Google Gemini API
- **Performance Metrics**: Measure first token time and output speed
- **Batch Testing**: Test multiple models and prompts simultaneously
- **Multi-language Support**: Available in English, Chinese, French, Japanese, German, Spanish, and Arabic
- **Real-time Results**: Live display of test progress and results
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Automatically saves your configuration

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/qjr87/llm-api-test.git
cd llm-api-test
```

2. Install dependencies:
```bash
npm install
```

3. Start local development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8000`

### API Configuration

1. **OpenAI Compatible APIs**:
   - API URL: `https://api.openai.com/v1/chat/completions`
   - API Key: Your OpenAI API key (starts with `sk-`)
   - Models: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, etc.

2. **Google Gemini API**:
   - API URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
   - API Key: Your Google AI API key
   - Models: `gemini-pro`, `gemini-pro-vision`, etc.

## Supported APIs

- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **Compatible APIs**: Any OpenAI-compatible API endpoint

## Deployment

### Cloudflare Workers

1. Build the worker:
```bash
npm run build
```

2. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

3. Configure your custom domain (optional)

## Project Structure

```
llm-api-test/
├── index.html          # Main HTML file
├── app.js             # Application logic
├── api-handlers.js    # API handling classes
├── styles.css         # Styling
├── i18n.js           # Internationalization
├── worker.js         # Cloudflare Worker script
├── worker-complete.js # Complete worker with inlined assets
├── build-worker.js   # Build script
├── package.json      # Dependencies and scripts
├── wrangler.toml     # Cloudflare Workers configuration
└── README.md         # Documentation
```

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Deployment**: Cloudflare Workers
- **Build Tools**: Node.js, Wrangler CLI
- **APIs**: OpenAI API, Google Gemini API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [@qjr87](https://github.com/qjr87)
- Project Link: [https://github.com/qjr87/llm-api-test](https://github.com/qjr87/llm-api-test)

---

**Note**: This tool is for testing and comparison purposes. Please ensure you comply with the terms of service of the APIs you're testing.