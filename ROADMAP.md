# Roadmap

このリポジトリの MVP 実装を、仕様書から実働サービスまで落とすための実行順ロードマップです。

## 現在地

### Done

- モノレポ初期化
  - `apps/web`
  - `apps/worker`
  - `apps/xr`
  - `packages/*`
- Next.js / worker の起動雛形
- Supabase 初期 DDL / seed
- 外部設定チェックリスト
- GitHub Actions の最小 CI
- GitHub リポジトリ接続と初回 push

### In Progress

- 外部サービスの実体をまだ未接続
  - Supabase
  - GCP / Vertex AI / Cloud Run
  - 8th Wall
  - Sentry / PostHog

## フェーズ別ロードマップ

## Phase 1: 外部基盤を固める

目的:
MVP 実装が途中で詰まらないように、認証、DB、画像生成、AR 実行環境の器を先に作る。

やること:

- GitHub
  - `main` の branch protection を設定
  - GitHub Secrets を登録
  - CI を main / PR 運用に載せる
- Supabase
  - project 作成
  - `infra/supabase/migrations/0001_init.sql` を適用
  - `infra/supabase/seed.sql` を適用
  - Storage bucket 作成確認
  - Auth 方針を決定
  - RLS / Storage policy の第1版を作る
- GCP
  - project / billing / APIs を有効化
  - service account 作成
  - Cloud Run の deploy 方針を確定
  - Vertex AI の呼び出し資格情報を準備
- 8th Wall
  - self-host 利用権限確認
  - `World` / `Image Target` / `Face` の PoC project を用意
  - `apps/xr` への export 運用を決定
- 監視
  - Sentry project 作成
  - PostHog or Plausible を決定

完了条件:

- `.env.local` に必要値が揃う
- GitHub Secrets が揃う
- worker が `missing config` ではなく実環境接続前提の状態になる

依存:

- GitHub 管理権限
- Supabase / GCP / 8th Wall の契約・アカウント

## Phase 2: 縦スライスを通す

目的:
「AR で撮る -> 生成する -> 保存 / 共有する」の一本を最小実装で通す。

やること:

- `apps/web`
  - `/ar` 導線の具体 UI
  - `/create` 入力フォーム
  - `/result/[jobId]` polling
  - `/share/[slug]` 共有ページ
- `apps/xr`
  - World 配置 AR PoC
  - 1種類の Image Target AR
  - 1種類の Face / Frame AR
- `apps/worker`
  - `POST /internal/process-job` の本実装
  - Prompt Builder と model 選択ロジック
  - Vertex AI 呼び出し
  - Supabase Storage 保存
  - job status 更新
- API
  - `GET /api/bootstrap`
  - `POST /api/uploads/sign`
  - `POST /api/ar/captures`
  - `POST /api/generation/jobs`
  - `GET /api/generation/jobs/:id`
  - `POST /api/share`

完了条件:

- AR 撮影画像から生成できる
- 写真アップロードから生成できる
- 青木昆陽が毎回入る
- 結果保存 / 共有ができる

依存:

- Phase 1 完了

## Phase 3: 管理画面と運用導線

目的:
MVP を公開しても運用者が詰まらない状態にする。

やること:

- `/admin/assets`
  - hero asset 切り替え
- `/admin/styles`
  - style preset 管理
- `/admin/spots`
  - spot preset 管理
- `/admin/targets`
  - target 画像と slug 管理
- `/admin/jobs`
  - ジョブ失敗確認と retry
- `/admin/reports`
  - 通報確認フロー

完了条件:

- アセット差し替えが UI からできる
- preset / target が UI から更新できる
- failed / blocked job を追跡できる

依存:

- Phase 2 の API / DB が安定していること

## Phase 4: 公開前の硬化

目的:
MVP を外に出しても壊れにくい状態にする。

やること:

- RLS / Storage policy の見直し
- 共有画像と原本の分離を最終確認
- rate limit / abuse 対策
- blocked / retry / report の運用ルール文書化
- Sentry / analytics イベント接続
- モバイル実機テスト
  - iPhone Safari
  - Android Chrome
- 受け入れ条件チェック

完了条件:

- 仕様書の MVP 完了条件を満たす
- 実機で主要導線が崩れない
- 通報 / 共有 / 失敗時フローが説明可能

## 今すぐやる順番

1. Supabase project を作って migration / seed を入れる
2. GCP project と service account を作る
3. 8th Wall の self-host 前提 PoC を作る
4. `POST /api/uploads/sign` と `POST /api/generation/jobs` を先に実装する
5. World AR -> capture -> generate の縦スライスを通す

## GitHub に入れておくべき管理項目

- Secrets
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
- Protect rules
  - `main` 直 push 制限
  - CI 成功必須
- Repository hygiene
  - Issues / Projects を使うなら Phase 1-4 で列を切る

## 参照

- [README](./README.md)
- [ローカル環境セットアップ](./docs/environment-bootstrap.md)
- [外部設定と API キーのチェックリスト](./docs/external-services-checklist.md)
- [Supabase 初期化メモ](./infra/supabase/README.md)
- [Cloud Run / Vertex AI 初期化メモ](./infra/gcp/README.md)
