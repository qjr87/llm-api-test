# LLM API Test

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/stargazers)
[![GitHub license](https://img.shields.io/github/license/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/issues)

**🚀 A comprehensive tool for testing and comparing Large Language Model API performance**

## 🌐 [🚀 Live Demo - Try it Now!](https://llmtested.com)

**Languages:** [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

</div>

## 📖 Overview

LLM API Test is a powerful, web-based tool designed to benchmark and compare the performance of various Large Language Model APIs. Whether you're evaluating different providers, optimizing your AI applications, or conducting research, this tool provides comprehensive metrics and insights.

## ✨ Key Features

### 🔌 API Support
- **OpenAI**: GPT-3.5, GPT-4, and latest models
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **Custom APIs**: Any OpenAI-compatible API endpoint

### 📊 Performance Metrics
- **Response Time**: First token latency measurement
- **Output Speed**: Tokens per second calculation
- **Success Rate**: API reliability tracking
- **Quality Assessment**: Response comparison tools

### 🌐 User Experience
- **Multilingual Interface**: 7 languages supported
- **Responsive Design**: Works on desktop and mobile
- **Real-time Results**: Live performance monitoring
- **History Tracking**: Persistent test records

### ☁️ Deployment Options
- **Local Development**: Simple HTTP server setup
- **Static Hosting**: Compatible with any static host

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- API keys for the services you want to test

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/qjr87/llm-api-test.git
   cd llm-api-test
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

### 🔧 Configuration Guide

#### API Setup
1. **Select Protocol**: Choose your API provider (OpenAI, Gemini, or Custom)
2. **Enter Endpoint**: API URL (auto-filled for standard providers)
3. **Add API Key**: Your authentication key
4. **Configure Models**: Specify which models to test

#### Test Parameters
- **Test Rounds**: Number of iterations per model
- **Prompts**: Custom test prompts or use defaults
- **Concurrency**: Parallel request handling

#### Example Configuration
```javascript
// OpenAI Configuration
Protocol: "openai"
API URL: "https://api.openai.com/v1/chat/completions"
API Key: "sk-..."
Models: "gpt-3.5-turbo,gpt-4"

// Gemini Configuration
Protocol: "gemini"
API URL: "https://generativelanguage.googleapis.com/v1beta/models"
API Key: "AIza..."
Models: "gemini-pro"
```

## 🚀 Deployment

### Static Hosting

Deploy to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the project folder
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: `firebase deploy`

### Docker Deployment

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t llm-api-test .
docker run -p 8080:80 llm-api-test
```

## 📁 Project Structure

```
llm-api-test/
├── 📄 index.html          # Main application interface
├── 🧠 app.js             # Core application logic & test orchestration
├── 🔌 api-handlers.js    # API protocol implementations
├── 🎨 styles.css         # Responsive UI styling
├── 🌍 i18n.js           # Internationalization & language support
└── 📜 LICENSE           # MIT License
```

### Core Components

- **APITester Class**: Main test orchestration and UI management
- **APIHandler Class**: Protocol-specific API implementations
- **I18n System**: Multi-language support with dynamic loading
- **Results Engine**: Real-time performance metrics calculation

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox/Grid
- **Vanilla JavaScript**: No framework dependencies
- **Web APIs**: Fetch, LocalStorage, Internationalization

### Architecture
- **Modular Design**: Separation of concerns
- **Event-Driven**: Reactive UI updates
- **Progressive Enhancement**: Works without JavaScript
- **Mobile-First**: Responsive design principles

### Deployment
- **Static Hosting**: Universal compatibility
- **CDN Ready**: Global content distribution

## 📊 Performance Metrics Explained

| Metric | Description | Good Range |
|--------|-------------|------------|
| **First Token Time** | Time to receive first response token | < 2 seconds |
| **Output Speed** | Tokens generated per second | > 10 tokens/sec |
| **Success Rate** | Percentage of successful requests | > 95% |
| **Total Time** | Complete response generation time | Varies by length |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** with clear messages
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push** to your fork
8. **Submit** a Pull Request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure cross-browser compatibility

### Areas for Contribution
- 🌐 Additional language translations
- 🔌 New API provider support
- 📊 Enhanced metrics and visualizations
- 🎨 UI/UX improvements
- 🐛 Bug fixes and optimizations

## ❓ FAQ

<details>
<summary><strong>How do I get API keys?</strong></summary>

- **OpenAI**: Visit [platform.openai.com](https://platform.openai.com/api-keys)
- **Google Gemini**: Get started at [ai.google.dev](https://ai.google.dev/)
- **Custom APIs**: Check your provider's documentation

</details>

<details>
<summary><strong>Why are my tests failing?</strong></summary>

- Verify API key is correct and has sufficient credits
- Check if the API endpoint URL is accurate
- Ensure your IP isn't blocked by the provider
- Try reducing concurrency or test rounds

</details>

<details>
<summary><strong>Can I test custom models?</strong></summary>

Yes! Use the "Custom" protocol option and provide:
- Your API endpoint URL
- Authentication method
- Model names

</details>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this tool
- Inspired by the need for transparent AI performance testing
- Built with ❤️ for the AI development community

---

<div align="center">

**[⭐ Star this repo](https://github.com/qjr87/llm-api-test) if you find it helpful!**

Made with ❤️ by [qjr87](https://github.com/qjr87)

</div>