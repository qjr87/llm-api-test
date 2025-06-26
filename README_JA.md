# LLM API テストツール

**Read this in other languages**: [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md)

異なる大規模言語モデルAPIのパフォーマンスをテストし比較するためのツールです。

## 機能

- 🚀 **マルチAPI対応**: OpenAI、Google Gemini、その他の主要なLLM APIと互換性があります
- ⚡ **パフォーマンステスト**: 最初のトークンの応答時間、出力速度、成功率を測定します
- 📊 **データ可視化**: テスト結果と統計のリアルタイム表示
- 🌍 **多言語サポート**: 英語、中国語、フランス語、日本語、ドイツ語、スペイン語、アラビア語で利用可能
- 📱 **レスポンシブデザイン**: デスクトップとモバイルデバイスに対応
- 💾 **履歴記録**: テスト履歴の自動保存とデータエクスポートオプション
- ☁️ **Cloudflare Workers**: エッジコンピューティングプラットフォームへのデプロイをサポート

## クイックスタート

### ローカルセットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/your-username/llm-api-test.git
cd llm-api-test
```

2. ローカルサーバーを起動
```bash
python -m http.server 8000
```

3. ブラウザを開いて `http://localhost:8000` にアクセス

### API設定

1. 設定エリアでテストしたいAPIプロバイダーを選択
2. 対応するAPIキーとエンドポイントを入力
3. テストパラメータを設定（ラウンド数、並行性など）
4. 「テスト開始」ボタンをクリック

## サポートされているAPI

- **OpenAI**: GPT-3.5、GPT-4シリーズモデル
- **Google Gemini**: Gemini Pro、Gemini Pro Vision
- **カスタムAPI**: OpenAI形式と互換性のある他のAPIをサポート

## デプロイメント

### Cloudflare Workersデプロイメント

1. Wrangler CLIをインストール
```bash
npm install -g wrangler
```

2. Cloudflareにログイン
```bash
wrangler login
```

3. ビルドとデプロイ
```bash
node build-worker.js
wrangler deploy
```

詳細なデプロイメント手順については、[DEPLOYMENT.md](DEPLOYMENT.md)を参照してください

## プロジェクト構造

```
llm-api-test/
├── index.html          # メインページ
├── app.js             # メインアプリケーションロジック
├── api-handlers.js    # APIハンドラー
├── styles.css         # スタイルシート
├── i18n.js           # 国際化設定
├── worker.js         # Cloudflare Workersスクリプト
├── build-worker.js   # Workersビルドスクリプト
└── wrangler.toml     # Cloudflare設定
```

## 技術スタック

- **フロントエンド**: ネイティブHTML/CSS/JavaScript
- **デプロイメント**: Cloudflare Workers
- **API**: 複数のLLM APIをサポート
- **国際化**: 多言語サポート

## 貢献

貢献を歓迎します！IssueやPull Requestをお気軽に提出してください。

1. プロジェクトをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. Pull Requestを開く

## ライセンス

MITライセンス - 詳細は[LICENSE](LICENSE)ファイルを参照してください