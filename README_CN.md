# LLM API 测试工具

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/stargazers)
[![GitHub license](https://img.shields.io/github/license/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/issues)

**🚀 用于测试和比较大型语言模型API性能的综合工具**

## 🌐 [🚀 在线演示 - 立即试用！](https://llmapitest.com)

**语言:** [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

</div>

## 📖 概述

LLM API 测试工具是一个强大的基于Web的工具，专为基准测试和比较各种大型语言模型API的性能而设计。无论您是在评估不同的提供商、优化AI应用程序还是进行研究，此工具都能提供全面的指标和洞察。

## ✨ 主要功能

### 🔌 API支持
- **OpenAI**: GPT-3.5、GPT-4和最新模型
- **Google Gemini**: Gemini Pro、Gemini Pro Vision
- **自定义API**: 任何兼容OpenAI的API端点

### 📊 性能指标
- **响应时间**: 首个令牌延迟测量
- **输出速度**: 每秒令牌数计算
- **成功率**: API可靠性跟踪
- **质量评估**: 响应比较工具

### 🌐 用户体验
- **多语言界面**: 支持7种语言
- **响应式设计**: 适用于桌面和移动设备
- **实时结果**: 实时性能监控
- **历史记录**: 持久化测试记录

### ☁️ 部署选项
- **本地开发**: 简单的HTTP服务器设置
- **静态托管**: 兼容任何静态主机

## 🚀 快速开始

### 前置要求
- 现代Web浏览器（Chrome、Firefox、Safari、Edge）
- 已安装Node.js和npm
- 您要测试的服务的API密钥

### 本地开发

1. **克隆仓库**
   ```bash
   git clone https://github.com/qjr87/llm-api-test.git
   cd llm-api-test
   ```

2. **安装依赖并启动服务器**
   ```bash
   npm install
   npm start
   ```

   **其他方法：**
   ```bash
   # 使用Python 3
   python -m http.server 8000
   
   # 使用PHP
   php -S localhost:8000
   ```

3. **在浏览器中打开**
   导航到 `http://localhost:8000`

### 🔧 配置指南

#### API设置
1. **选择协议**: 选择您的API提供商（OpenAI、Gemini或自定义）
2. **输入端点**: API URL（标准提供商自动填充）
3. **添加API密钥**: 您的身份验证密钥
4. **配置模型**: 指定要测试的模型

#### 测试参数
- **测试轮数**: 每个模型的迭代次数
- **提示词**: 自定义测试提示或使用默认值
- **并发性**: 并行请求处理

#### 配置示例
```javascript
// OpenAI配置
协议: "openai"
API URL: "https://api.openai.com/v1/chat/completions"
API密钥: "sk-..."
模型: "gpt-3.5-turbo,gpt-4"

// Gemini配置
协议: "gemini"
API URL: "https://generativelanguage.googleapis.com/v1beta/models"
模型: "gemini-pro"
```

## 🚀 部署

### 静态托管

部署到任何静态托管服务：

- **Vercel**: `vercel --prod`
- **Netlify**: 拖放项目文件夹
- **GitHub Pages**: 在仓库设置中启用
- **Firebase Hosting**: `firebase deploy`

### Docker部署

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

## 📁 项目结构

```
llm-api-test/
├── 📄 index.html          # 主应用程序界面
├── 🧠 app.js             # 核心应用程序逻辑和测试编排
├── 🔌 api-handlers.js    # API协议实现
├── 🎨 styles.css         # 响应式UI样式
├── 🌍 i18n.js           # 国际化和语言支持
└── 📜 LICENSE           # MIT许可证
```

### 核心组件

- **APITester类**: 主要测试编排和UI管理
- **APIHandler类**: 特定协议的API实现
- **I18n系统**: 动态加载的多语言支持
- **结果引擎**: 实时性能指标计算

## 🛠️ 技术栈

### 前端
- **HTML5**: 语义标记和可访问性
- **CSS3**: 使用Flexbox/Grid的现代样式
- **原生JavaScript**: 无框架依赖
- **Web API**: Fetch、LocalStorage、国际化

### 架构
- **模块化设计**: 关注点分离
- **事件驱动**: 响应式UI更新
- **渐进增强**: 无JavaScript也能工作
- **移动优先**: 响应式设计原则

### 部署
- **静态托管**: 通用兼容性
- **CDN就绪**: 全球内容分发

## 📊 性能指标说明

| 指标 | 描述 | 良好范围 |
|------|------|----------|
| **首个令牌时间** | 接收首个响应令牌的时间 | < 2秒 |
| **输出速度** | 每秒生成的令牌数 | > 10令牌/秒 |
| **成功率** | 成功请求的百分比 | > 95% |
| **总时间** | 完整响应生成时间 | 因长度而异 |

## 🤝 贡献

我们欢迎贡献！以下是您可以帮助的方式：

### 开发设置
1. **Fork** 仓库
2. **克隆** 您的fork到本地
3. **创建** 功能分支
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **进行** 更改
5. **彻底测试**
6. **提交** 并附上清晰的消息
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **推送** 到您的fork
8. **提交** Pull Request

### 贡献指南
- 遵循现有代码风格
- 为新功能添加测试
- 更新文档
- 确保跨浏览器兼容性

### 贡献领域
- 🌐 额外的语言翻译
- 🔌 新的API提供商支持
- 📊 增强的指标和可视化
- 🎨 UI/UX改进
- 🐛 错误修复和优化

## ❓ 常见问题

<details>
<summary><strong>如何获取API密钥？</strong></summary>

- **OpenAI**: 访问 [platform.openai.com](https://platform.openai.com/api-keys)
- **Google Gemini**: 在 [ai.google.dev](https://ai.google.dev/) 开始
- **自定义API**: 查看您的提供商文档

</details>

<details>
<summary><strong>为什么我的测试失败了？</strong></summary>

- 验证API密钥是否正确且有足够的额度
- 检查API端点URL是否准确
- 确保您的IP未被提供商阻止
- 尝试减少并发性或测试轮数

</details>

<details>
<summary><strong>我可以测试自定义模型吗？</strong></summary>

可以！使用"自定义"协议选项并提供：
- 您的API端点URL
- 身份验证方法
- 模型名称

</details>

## 📄 许可证

此项目根据MIT许可证授权 - 有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 感谢所有帮助改进此工具的贡献者
- 受到透明AI性能测试需求的启发
- 为AI开发社区用❤️构建

---

<div align="center">

**[⭐ 给这个仓库点星](https://github.com/qjr87/llm-api-test) 如果您觉得它有帮助！**

由 [qjr87](https://github.com/qjr87) 用❤️制作

</div>