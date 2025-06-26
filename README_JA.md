# LLM API テストツール

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/stargazers)
[![GitHub license](https://img.shields.io/github/license/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/issues)

**🚀 大規模言語モデルAPIのパフォーマンステストと比較のための包括的ツール**

## 🌐 [🚀 ライブデモ - 今すぐ試す！](https://llmapitest.com)

**言語:** [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

</div>

## 📖 概要

LLM API テストは、様々な大規模言語モデルAPIのパフォーマンスをベンチマークし比較するために設計された強力なWebベースのツールです。異なるプロバイダーの評価、AIアプリケーションの最適化、研究の実施など、このツールは包括的なメトリクスと洞察を提供します。

## ✨ 主な機能

### 🔌 APIサポート
- **OpenAI**: GPT-3.5、GPT-4、最新モデル
- **Google Gemini**: Gemini Pro、Gemini Pro Vision
- **カスタムAPI**: OpenAI互換のAPIエンドポイント

### 📊 パフォーマンスメトリクス
- **応答時間**: 最初のトークンレイテンシ測定
- **出力速度**: 1秒あたりのトークン数計算
- **成功率**: API信頼性追跡
- **品質評価**: 応答比較ツール

### 🌐 ユーザーエクスペリエンス
- **多言語インターフェース**: 7言語サポート
- **レスポンシブデザイン**: デスクトップとモバイルで動作
- **リアルタイム結果**: ライブパフォーマンス監視
- **履歴追跡**: 永続的なテスト記録

### ☁️ デプロイメントオプション
- **ローカル開発**: シンプルなHTTPサーバーセットアップ
- **静的ホスティング**: 任意の静的ホストと互換

## 🚀 クイックスタート

### 前提条件
- モダンなWebブラウザ（Chrome、Firefox、Safari、Edge）
- Node.jsとnpmがインストール済み
- テストしたいサービスのAPIキー

### ローカル開発

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/qjr87/llm-api-test.git
   cd llm-api-test
   ```

2. **依存関係をインストールしてサーバーを起動**
   ```bash
   npm install
   npm start
   ```

   **代替方法：**
   ```bash
   # Python 3を使用
   python -m http.server 8000
   
   # PHPを使用
   php -S localhost:8000
   ```

3. **ブラウザで開く**
   `http://localhost:8000` にアクセス

### 🔧 設定ガイド

#### API設定
1. **プロトコル選択**: APIプロバイダーを選択（OpenAI、Gemini、またはカスタム）
2. **エンドポイント入力**: API URL（標準プロバイダーは自動入力）
3. **APIキー追加**: 認証キー
4. **モデル設定**: テストするモデルを指定

#### テストパラメータ
- **テストラウンド**: モデルごとの反復回数
- **プロンプト**: カスタムテストプロンプトまたはデフォルトを使用
- **並行性**: 並列リクエスト処理

#### 設定例
```javascript
// OpenAI設定
プロトコル: "openai"
API URL: "https://api.openai.com/v1/chat/completions"
APIキー: "sk-..."
モデル: "gpt-3.5-turbo,gpt-4"

// Gemini設定
プロトコル: "gemini"
API URL: "https://generativelanguage.googleapis.com/v1beta/models"
モデル: "gemini-pro"
```

## 🚀 デプロイメント

### 静的ホスティング

任意の静的ホスティングサービスにデプロイ：

- **Vercel**: `vercel --prod`
- **Netlify**: プロジェクトフォルダをドラッグ&ドロップ
- **GitHub Pages**: リポジトリ設定で有効化
- **Firebase Hosting**: `firebase deploy`

### Dockerデプロイメント

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

## 📁 プロジェクト構造

```
llm-api-test/
├── 📄 index.html          # メインアプリケーションインターフェース
├── 🧠 app.js             # コアアプリケーションロジックとテストオーケストレーション
├── 🔌 api-handlers.js    # APIプロトコル実装
├── 🎨 styles.css         # レスポンシブUIスタイリング
├── 🌍 i18n.js           # 国際化と言語サポート
└── 📜 LICENSE           # MITライセンス
```

### コアコンポーネント

- **APITesterクラス**: メインテストオーケストレーションとUI管理
- **APIHandlerクラス**: プロトコル固有のAPI実装
- **I18nシステム**: 動的ローディングによる多言語サポート
- **結果エンジン**: リアルタイムパフォーマンスメトリクス計算

## 🛠️ 技術スタック

### フロントエンド
- **HTML5**: セマンティックマークアップとアクセシビリティ
- **CSS3**: FlexboxとGridを使用したモダンスタイリング
- **バニラJavaScript**: フレームワーク依存なし
- **Web API**: Fetch、LocalStorage、国際化

### アーキテクチャ
- **モジュラーデザイン**: 関心の分離
- **イベント駆動**: リアクティブUI更新
- **プログレッシブエンハンスメント**: JavaScriptなしでも動作
- **モバイルファースト**: レスポンシブデザイン原則

### デプロイメント
- **静的ホスティング**: ユニバーサル互換性
- **CDN対応**: グローバルコンテンツ配信

## 📊 パフォーマンスメトリクス説明

| メトリクス | 説明 | 良好な範囲 |
|-----------|------|----------|
| **最初のトークン時間** | 最初の応答トークンを受信する時間 | < 2秒 |
| **出力速度** | 1秒あたりに生成されるトークン数 | > 10トークン/秒 |
| **成功率** | 成功したリクエストの割合 | > 95% |
| **総時間** | 完全な応答生成時間 | 長さによって変動 |

## 🤝 貢献

貢献を歓迎します！以下の方法でお手伝いいただけます：

### 開発セットアップ
1. リポジトリを**フォーク**
2. フォークをローカルに**クローン**
3. 機能ブランチを**作成**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. 変更を**実施**
5. **徹底的にテスト**
6. 明確なメッセージで**コミット**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. フォークに**プッシュ**
8. プルリクエストを**提出**

### 貢献ガイドライン
- 既存のコードスタイルに従う
- 新機能にテストを追加
- ドキュメントを更新
- クロスブラウザ互換性を確保

### 貢献分野
- 🌐 追加の言語翻訳
- 🔌 新しいAPIプロバイダーサポート
- 📊 強化されたメトリクスと可視化
- 🎨 UI/UX改善
- 🐛 バグ修正と最適化

## ❓ よくある質問

<details>
<summary><strong>APIキーはどのように取得しますか？</strong></summary>

- **OpenAI**: [platform.openai.com](https://platform.openai.com/api-keys) を訪問
- **Google Gemini**: [ai.google.dev](https://ai.google.dev/) で開始
- **カスタムAPI**: プロバイダーのドキュメントを確認

</details>

<details>
<summary><strong>なぜテストが失敗するのですか？</strong></summary>

- APIキーが正しく、十分なクレジットがあることを確認
- APIエンドポイントURLが正確かチェック
- IPがプロバイダーによってブロックされていないことを確認
- 並行性やテストラウンドを減らしてみる

</details>

<details>
<summary><strong>カスタムモデルをテストできますか？</strong></summary>

はい！「カスタム」プロトコルオプションを使用して以下を提供：
- APIエンドポイントURL
- 認証方法
- モデル名

</details>

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🙏 謝辞

- このツールの改善に貢献してくださったすべての貢献者に感謝
- 透明なAIパフォーマンステストの必要性にインスパイアされました
- AI開発コミュニティのために❤️で構築

---

<div align="center">

**[⭐ このリポジトリにスター](https://github.com/qjr87/llm-api-test) をつけて、役に立ったと思ったら！**

[qjr87](https://github.com/qjr87) によって❤️で作成

</div>