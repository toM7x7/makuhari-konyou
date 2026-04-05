# Tasks

MVP ロードマップを、実際に着手できるタスク単位へ落としたバックログです。

## 使い方

- `Now`: 今すぐ着手するタスク
- `Next`: `Now` の完了後に着手するタスク
- `Later`: 先に依存を解消してから着手するタスク
- `Blocked`: 外部契約や設定待ち

## Milestone A: 外部基盤を接続する

### Now

- [ ] T-001 GitHub の保護設定を入れる
  - Scope: `main` branch protection、required checks、直 push 制限
  - Depends on: なし
  - Done when: `main` に対して CI 成功必須の保護が有効
  - Suggested issue title: `GitHub: protect main branch and require CI`

- [ ] T-002 GitHub Secrets を登録する
  - Scope: Supabase / GCP / observability 系の Secrets 一式
  - Depends on: T-003, T-006, T-009, T-010
  - Done when: ロードマップ記載の Secrets がすべて設定済み
  - Suggested issue title: `GitHub: register runtime secrets`

- [ ] T-003 Supabase project を作成する
  - Scope: project 作成、接続情報確保、ローカル `.env.local` 反映
  - Depends on: なし
  - Done when: `NEXT_PUBLIC_SUPABASE_URL` と key 群が揃う
  - Suggested issue title: `Supabase: create MVP project`

- [ ] T-004 Supabase migration / seed を適用する
  - Scope: `infra/supabase/migrations/0001_init.sql` と `seed.sql`
  - Depends on: T-003
  - Done when: hero assets / spot presets / style presets が DB に入っている
  - Suggested issue title: `Supabase: apply schema and seed data`

- [ ] T-005 Supabase RLS / Storage policy 第1版を作る
  - Scope: private buckets 保護、共有画像だけ public にする方針
  - Depends on: T-004
  - Done when: raw / capture / generated は直接 public 参照不可、`public-share` のみ共有可能
  - Suggested issue title: `Supabase: add initial RLS and storage policies`

- [ ] T-006 GCP project と API を有効化する
  - Scope: billing、Vertex AI API、Cloud Run、Cloud Build、Artifact Registry
  - Depends on: なし
  - Done when: worker をデプロイ可能な GCP project が用意されている
  - Suggested issue title: `GCP: enable project services for worker`

- [ ] T-007 worker 用 service account を作る
  - Scope: Vertex AI / Cloud Run / Artifact Registry 用権限セット
  - Depends on: T-006
  - Done when: service account email と必要 IAM が確定
  - Suggested issue title: `GCP: create worker service account`

- [ ] T-008 Cloud Run deploy 方針を決める
  - Scope: region、service name、runtime auth、Artifact Registry 名称
  - Depends on: T-006, T-007
  - Done when: `apps/worker` のデプロイ先定義が固定される
  - Suggested issue title: `Cloud Run: define deployment topology`

- [ ] T-009 Sentry project を作成する
  - Scope: `web` と `worker` の2系統
  - Depends on: なし
  - Done when: DSN を GitHub Secrets / `.env.local` に入れられる
  - Suggested issue title: `Observability: create Sentry projects`

- [ ] T-010 PostHog or Plausible を決めて初期 project を作る
  - Scope: プロダクト判断と key 発行
  - Depends on: なし
  - Done when: 計測プロバイダが決まり key が発行済み
  - Suggested issue title: `Analytics: choose provider and create project`

### Blocked

- [ ] T-011 8th Wall self-host 利用前提を確定する
  - Scope: 契約、権限、project 作成
  - Depends on: 外部契約 / アカウント
  - Done when: self-host export 前提で `apps/xr` を進めてよい状態
  - Suggested issue title: `8th Wall: confirm self-host plan and access`

- [ ] T-012 8th Wall PoC project を3系統用意する
  - Scope: World / Image Target / Face
  - Depends on: T-011
  - Done when: 各モードに 1 つずつ検証シーンがある
  - Suggested issue title: `8th Wall: prepare world, target, and face PoCs`

## Milestone B: API と縦スライスを通す

### Now

- [ ] T-013 `POST /api/uploads/sign` を実装する
  - Scope: Supabase Storage への署名 URL 発行
  - Depends on: T-003, T-005
  - Done when: scene/style/capture 用アップロード URL を返せる
  - Suggested issue title: `API: implement signed upload endpoint`

- [ ] T-014 `POST /api/ar/captures` を実装する
  - Scope: capture メタデータ保存
  - Depends on: T-004, T-013
  - Done when: `mode`, `capture_upload_id`, `pose_json` を保存できる
  - Suggested issue title: `API: persist AR captures`

- [ ] T-015 `POST /api/generation/jobs` を実装する
  - Scope: job 作成、status `queued`、worker 呼び出し起点
  - Depends on: T-004, T-013
  - Done when: DB に job が作られ worker へ処理移譲できる
  - Suggested issue title: `API: create generation jobs`

- [ ] T-016 `GET /api/generation/jobs/:id` を実装する
  - Scope: polling 用 status / outputs 取得
  - Depends on: T-015
  - Done when: `queued` から `completed` / `failed` / `blocked` を返せる
  - Suggested issue title: `API: expose generation job status`

- [ ] T-017 worker の `process-job` を本実装する
  - Scope: job load、prompt build、model resolve、status 更新
  - Depends on: T-004, T-007, T-008
  - Done when: mock ではなく DB / config と結合して動作
  - Suggested issue title: `Worker: implement process-job flow`

- [ ] T-018 Vertex AI image provider を実装する
  - Scope: Gemini 2.5 Flash Image 既定、preview 切替、error handling
  - Depends on: T-006, T-007, T-017
  - Done when: worker から実際に画像生成 API を叩ける
  - Suggested issue title: `Worker: integrate Vertex AI image generation`

- [ ] T-019 generated output 保存処理を実装する
  - Scope: output 保存、`generation_outputs` 反映、C2PA フラグ記録
  - Depends on: T-017, T-018
  - Done when: completed job に output レコードが紐づく
  - Suggested issue title: `Worker: store generated outputs`

- [ ] T-020 `POST /api/share` を実装する
  - Scope: `public-share` への派生、share slug 発行
  - Depends on: T-019
  - Done when: 共有 URL を生成して `/share/[slug]` で見られる
  - Suggested issue title: `API: create public share pages`

### Next

- [ ] T-021 `/create` の入力フォームを実装する
  - Scope: scene image、style ref、spot/style preset、free text、aspect ratio
  - Depends on: T-013, T-015
  - Done when: 実際に job 作成 API を叩ける
  - Suggested issue title: `Web: build create flow form`

- [ ] T-022 `/result/[jobId]` の polling UI を実装する
  - Scope: status 表示、completed / failed / blocked 分岐
  - Depends on: T-016
  - Done when: job 完了までユーザーが遷移せず見届けられる
  - Suggested issue title: `Web: implement job result polling screen`

- [ ] T-023 `/share/[slug]` の公開共有画面を実装する
  - Scope: AI ラベル、通報導線、期限切れ表示
  - Depends on: T-020
  - Done when: public share を安全に表示できる
  - Suggested issue title: `Web: implement public share page`

## Milestone C: AR 導線を接続する

### Blocked

- [ ] T-024 `apps/xr` に World AR を接続する
  - Scope: floor detect、tap place、scale、rotation、capture
  - Depends on: T-011, T-012
  - Done when: スマホ実機で World 配置 AR が動く
  - Suggested issue title: `XR: implement world placement flow`

- [ ] T-025 `apps/xr` に Image Target AR を接続する
  - Scope: target scan、success 演出、capture、generate CTA
  - Depends on: T-011, T-012
  - Done when: 1種の target で認識から capture まで通る
  - Suggested issue title: `XR: implement image target flow`

- [ ] T-026 `apps/xr` に Face / Frame AR を接続する
  - Scope: selfie camera、frame 選択、芋モチーフ演出
  - Depends on: T-011, T-012
  - Done when: 1種の selfie フレームが実機動作
  - Suggested issue title: `XR: implement selfie frame flow`

- [ ] T-027 web と xr の session / return URL 契約を実装する
  - Scope: `apps/web` から `apps/xr` への引数、capture 後の復帰
  - Depends on: T-024 or T-025 or T-026
  - Done when: AR 撮影後に `create` へ戻せる
  - Suggested issue title: `XR/Web: wire session and return flow`

## Milestone D: 管理画面を実働化する

### Later

- [ ] T-028 `/admin/assets` を本実装する
  - Scope: hero asset 一覧、有効化切替、サムネイル確認
  - Depends on: T-004, T-019
  - Done when: active hero asset を管理 UI から切り替えられる
  - Suggested issue title: `Admin: manage hero assets`

- [ ] T-029 `/admin/styles` を本実装する
  - Scope: style preset CRUD、表示順変更
  - Depends on: T-004
  - Done when: preset を UI で更新できる
  - Suggested issue title: `Admin: manage style presets`

- [ ] T-030 `/admin/spots` を本実装する
  - Scope: spot preset CRUD、default AR mode 設定
  - Depends on: T-004
  - Done when: spot context を UI で更新できる
  - Suggested issue title: `Admin: manage spot presets`

- [ ] T-031 `/admin/targets` を本実装する
  - Scope: target image 登録、slug、spot 紐付け、有効化
  - Depends on: T-004, T-025
  - Done when: target 運用を UI で回せる
  - Suggested issue title: `Admin: manage image targets`

- [ ] T-032 `/admin/jobs` を本実装する
  - Scope: status 一覧、error reason、retry、成功率表示
  - Depends on: T-017, T-019
  - Done when: failed / blocked job を UI で追跡できる
  - Suggested issue title: `Admin: monitor generation jobs`

- [ ] T-033 `/admin/reports` を本実装する
  - Scope: 通報一覧、status 更新、共有物との対応確認
  - Depends on: T-020, T-023
  - Done when: report 対応フローが管理 UI で閉じる
  - Suggested issue title: `Admin: review share reports`

## Milestone E: 硬化と公開準備

### Later

- [ ] T-034 主要 analytics event を接続する
  - Scope: `app_opened`, `ar_opened`, `generate_started`, `generate_completed`, `generate_failed`, `share_created`
  - Depends on: T-010, T-021, T-022, T-023
  - Done when: MVP 主要導線のイベントが取れる
  - Suggested issue title: `Analytics: instrument MVP events`

- [ ] T-035 Sentry を web / worker に接続する
  - Scope: runtime error capture、release 単位で追跡
  - Depends on: T-009, T-017
  - Done when: 例外が Sentry に集約される
  - Suggested issue title: `Observability: wire Sentry into web and worker`

- [ ] T-036 abuse / rate limit 対策を入れる
  - Scope: generation job 濫用対策、share abuse 対策
  - Depends on: T-015, T-020
  - Done when: 最低限の制限と blocked 導線がある
  - Suggested issue title: `Security: add rate limits and abuse controls`

- [ ] T-037 実機テストを行う
  - Scope: iPhone Safari、Android Chrome、共有導線
  - Depends on: T-024, T-025, T-026, T-023
  - Done when: 主要導線の動作確認メモが残る
  - Suggested issue title: `QA: run mobile device verification`

- [ ] T-038 MVP 受け入れ条件を最終確認する
  - Scope: 仕様書 21章の項目チェック
  - Depends on: T-020, T-024, T-025, T-026, T-032
  - Done when: MVP 完了条件の充足可否が判断できる
  - Suggested issue title: `Release: verify MVP acceptance criteria`

## 今の最短クリティカルパス

1. T-003 Supabase project 作成
2. T-004 migration / seed 適用
3. T-006 GCP project / APIs 有効化
4. T-007 worker service account 作成
5. T-013 uploads/sign 実装
6. T-015 generation/jobs 実装
7. T-017 worker process-job 実装
8. T-018 Vertex AI provider 実装
9. T-019 output 保存
10. T-020 share 作成
11. T-021 create UI
12. T-022 result polling

## 関連ドキュメント

- [Roadmap](./ROADMAP.md)
- [README](./README.md)
- [ローカル環境セットアップ](./docs/environment-bootstrap.md)
- [外部設定と API キーのチェックリスト](./docs/external-services-checklist.md)
