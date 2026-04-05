# 外部設定と API キーのチェックリスト

## 1. GitHub

- 空リポジトリを private で作成
- default branch を `main`
- Actions を有効化
- branch protection を `main` に設定
- Secrets を登録
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `INTERNAL_WORKER_TOKEN`
  - `GCP_PROJECT_ID`
  - `VERTEX_LOCATION`
  - `VERTEX_SERVICE_ACCOUNT_EMAIL`
  - `SENTRY_DSN`
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST`

## 2. Supabase

- 新規プロジェクトを 1 つ作成
- DB パスワードを控える
- `infra/supabase/migrations/0001_init.sql` を適用
- `infra/supabase/seed.sql` を適用
- Storage bucket を確認
  - `raw-private`
  - `capture-private`
  - `generated-private`
  - `public-share`
  - `admin-assets`
- Auth 方針を決める
  - MVP は匿名セッション主体で始めるか
  - 管理画面だけメールログインにするか
- RLS policy を追加する
  - 一般ユーザーは private bucket 直アクセス不可
  - 管理画面だけ admin テーブルを更新可能

## 3. Google Cloud / Vertex AI / Cloud Run

- GCP プロジェクト作成
- Billing 有効化
- API 有効化
  - Vertex AI API
  - Cloud Run Admin API
  - Artifact Registry API
  - Cloud Build API
- Service Account 作成
  - Vertex AI User
  - Cloud Run Admin
  - Service Account User
  - Artifact Registry Writer
- `apps/worker` 用の Cloud Run サービス名を決める
- `asia-northeast1` を基本リージョンにするか確定

## 4. 8th Wall

- 8th Wall プロジェクト作成
- self-host 利用権限確認
- `World` / `Image Target` / `Face` 各 PoC を作成
- `apps/xr` に export する運用を決める
- 同一ドメイン配下での公開方針を決める
  - `web` 直下の subpath に載せる
  - CDN / static host を reverse proxy する

## 5. 監視 / 分析

- Sentry プロジェクト作成
  - `web`
  - `worker`
- PostHog か Plausible を決定
- MVP イベントを最小で計測
  - `app_opened`
  - `ar_opened`
  - `generate_started`
  - `generate_completed`
  - `generate_failed`
  - `share_created`

## 6. 運用設計

- `public-share` の保持期間を決める
- report 対応フローを決める
- blocked / failed / retry の運用ルールを決める
- 青木昆陽アセット差し替え責任者を決める

## GitHub 空リポジトリ作成について

この環境には `gh` CLI がまだ入っていないため、自動作成まではしていません。

やるなら次のどちらかです。

1. GitHub Web で手動作成
2. `gh` を入れて `gh repo create` で作成
