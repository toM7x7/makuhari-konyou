# Cloud Run / Vertex AI 初期化メモ

## worker の責務

- ジョブ取得
- 画像前処理
- Prompt Builder 呼び出し
- Vertex AI 画像生成
- Supabase Storage 保存
- ジョブ状態更新

## 最初に決めること

- GCP プロジェクト ID
- デプロイリージョン
  - 推奨: `asia-northeast1`
- Cloud Run サービス名
  - 例: `makuhari-konyou-worker`
- Artifact Registry リポジトリ名

## 必要な環境変数

- `GCP_PROJECT_ID`
- `VERTEX_LOCATION`
- `VERTEX_SERVICE_ACCOUNT_EMAIL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `INTERNAL_WORKER_TOKEN`
- `SENTRY_DSN`

## 最低限のデプロイ観点

- Cloud Run は認証付きか、内部トークン必須にする
- Web 側から worker を叩く経路はサーバ経由に限定する
- Vertex AI 失敗時は指数バックオフ、Safety blocked は再試行しない

## 今はまだ未実装

- 本物の Vertex AI 呼び出し
- 画像正規化パイプライン
- Supabase job queue 連携
- 再実行 / reconcile job
