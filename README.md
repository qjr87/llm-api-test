# LLM API Test

一个用于测试和比较不同大语言模型API性能的工具。

## 功能特性

- 🚀 **多协议支持**: 支持OpenAI兼容API和Google Gemini API
- 📊 **性能测试**: 测量首字符响应时间和输出速度
- 🌍 **多语言界面**: 支持中文、英文、法语、日语、德语、西班牙语、阿拉伯语
- 📱 **响应式设计**: 适配桌面和移动设备
- ⚡ **实时流式响应**: 支持流式API调用
- 🔄 **批量测试**: 支持多模型、多提示词、多轮次测试
- 💾 **配置保存**: 自动保存测试配置
- 🎨 **现代UI**: 美观的渐变设计和动画效果

## 快速开始

### 本地运行

1. 克隆仓库:
```bash
git clone https://github.com/qjr87/llm-api-test.git
cd llm-api-test
```

2. 启动本地服务器:
```bash
# 使用Python
python -m http.server 8000
# 或使用Python 3
python3 -m http.server 8000
```

3. 在浏览器中打开 `http://localhost:8000`

### API配置

#### OpenAI兼容API
- **API URL**: `https://api.openai.com/v1/chat/completions`
- **API Key**: 你的OpenAI API密钥
- **模型**: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`等

#### Google Gemini API
- **API URL**: `https://generativelanguage.googleapis.com`
- **API Key**: 你的Google AI Studio API密钥
- **模型**: `gemini-pro`, `gemini-pro-vision`等

## 支持的API

- ✅ OpenAI GPT系列
- ✅ Google Gemini系列
- ✅ 其他OpenAI兼容的API（如Azure OpenAI、Anthropic Claude等）

## 部署

### Cloudflare Workers

1. 安装依赖:
```bash
npm install
```

2. 构建项目:
```bash
npm run build
```

3. 部署到Cloudflare Workers:
```bash
npm run deploy
```

## 项目结构

```
llm-api-test/
├── index.html          # 主页面
├── app.js             # 主应用逻辑
├── api-handlers.js    # API处理器
├── styles.css         # 样式文件
├── i18n.js           # 国际化配置
├── worker.js         # Cloudflare Workers脚本
├── worker-complete.js # 完整的Workers脚本
├── build-worker.js   # 构建脚本
├── wrangler.toml     # Cloudflare配置
├── package.json      # 项目配置
└── README.md         # 项目说明
```

## 技术栈

- **前端**: 原生HTML/CSS/JavaScript
- **部署**: Cloudflare Workers
- **API**: 支持OpenAI和Gemini协议
- **国际化**: 自定义i18n实现

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

如有问题或建议，请通过GitHub Issues联系我们。