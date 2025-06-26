# LLM API 测试工具

**Read this in other languages**: [English](README.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

一个用于测试和比较不同大语言模型API性能的工具。

## 功能特性

- 🚀 **多API支持**: 支持OpenAI、Google Gemini等主流LLM API
- ⚡ **性能测试**: 测量首字响应时间、输出速度和成功率
- 📊 **数据可视化**: 实时显示测试结果和统计数据
- 🌍 **多语言支持**: 支持中文、英文、法文、日文、德文、西班牙文、阿拉伯文
- 📱 **响应式设计**: 适配桌面和移动设备
- 💾 **历史记录**: 自动保存测试历史，支持数据导出
- ☁️ **Cloudflare Workers**: 支持部署到边缘计算平台

## 快速开始

### 本地运行

1. 克隆项目
```bash
git clone https://github.com/your-username/llm-api-test.git
cd llm-api-test
```

2. 启动本地服务器
```bash
python -m http.server 8000
```

3. 打开浏览器访问 `http://localhost:8000`

### 配置API

1. 在配置区域选择要测试的API提供商
2. 输入相应的API密钥和端点
3. 设置测试参数（轮数、并发数等）
4. 点击"开始测试"按钮

## 支持的API

- **OpenAI**: GPT-3.5, GPT-4系列模型
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **自定义API**: 支持兼容OpenAI格式的其他API

## 部署

### Cloudflare Workers部署

1. 安装Wrangler CLI
```bash
npm install -g wrangler
```

2. 登录Cloudflare
```bash
wrangler login
```

3. 构建并部署
```bash
node build-worker.js
wrangler deploy
```

详细部署说明请参考 [DEPLOYMENT.md](DEPLOYMENT.md)

## 项目结构

```
llm-api-test/
├── index.html          # 主页面
├── app.js             # 主应用逻辑
├── api-handlers.js    # API处理器
├── styles.css         # 样式文件
├── i18n.js           # 国际化配置
├── worker.js         # Cloudflare Workers脚本
├── build-worker.js   # Workers构建脚本
└── wrangler.toml     # Cloudflare配置
```

## 技术栈

- **前端**: 原生HTML/CSS/JavaScript
- **部署**: Cloudflare Workers
- **API**: 支持多种LLM API
- **国际化**: 多语言支持

## 贡献

欢迎提交Issue和Pull Request！

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件