# LLM API Test

異なる大規模言語モデルAPIのパフォーマンスをテストし比較するためのツール。

## 機能

- **マルチAPI対応**: OpenAI APIとGoogle Gemini APIに対応
- **パフォーマンス指標**: 最初のトークン時間と出力速度を測定
- **バッチテスト**: 複数のモデルとプロンプトを同時にテスト
- **多言語対応**: 英語、中国語、フランス語、日本語、ドイツ語、スペイン語、アラビア語に対応
- **リアルタイム結果**: テストの進行状況と結果をライブ表示
- **レスポンシブデザイン**: デスクトップとモバイルデバイスで動作
- **ローカルストレージ**: 設定を自動保存

## クイックスタート

### ローカル開発

1. リポジトリをクローン:
```bash
git clone https://github.com/qjr87/llm-api-test.git
cd llm-api-test
```

2. 依存関係をインストール:
```bash
npm install
```

3. ローカル開発サーバーを起動:
```bash
npm run dev
```

4. ブラウザで `http://localhost:8000` にアクセス

### API設定

1. **OpenAI互換API**:
   - API URL: `https://api.openai.com/v1/chat/completions`
   - API キー: OpenAI APIキー（`sk-`で始まる）
   - モデル: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`など

2. **Google Gemini API**:
   - API URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
   - API キー: Google AI APIキー
   - モデル: `gemini-pro`, `gemini-pro-vision`など

## 対応API

- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **互換API**: OpenAI互換のAPIエンドポイント

## デプロイ

### Cloudflare Workers

1. ワーカーをビルド:
```bash
npm run build
```

2. Cloudflare Workersにデプロイ:
```bash
npm run deploy
```

3. カスタムドメインを設定（オプション）

## プロジェクト構造

```
llm-api-test/
├── index.html          # メインHTMLファイル
├── app.js             # アプリケーションロジック
├── api-handlers.js    # API処理クラス
├── styles.css         # スタイリング
├── i18n.js           # 国際化
├── worker.js         # Cloudflare Workerスクリプト
├── worker-complete.js # インライン化されたアセットを含む完全なワーカー
├── build-worker.js   # ビルドスクリプト
├── package.json      # 依存関係とスクリプト
├── wrangler.toml     # Cloudflare Workers設定
└── README.md         # ドキュメント
```

## 技術スタック

- **フロントエンド**: Vanilla JavaScript, HTML5, CSS3
- **デプロイ**: Cloudflare Workers
- **ビルドツール**: Node.js, Wrangler CLI
- **API**: OpenAI API, Google Gemini API

## 貢献

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 連絡先

- GitHub: [@qjr87](https://github.com/qjr87)
- プロジェクトリンク: [https://github.com/qjr87/llm-api-test](https://github.com/qjr87/llm-api-test)

---

**注意**: このツールはテストと比較を目的としています。テストするAPIの利用規約に従ってください。