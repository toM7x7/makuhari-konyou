# 幕張 × 青木昆陽 MVP

幕張地域向けの WebAR / 画像生成 MVP を、仕様書ベースでそのまま着手できるようにしたモノレポです。

現時点では以下まで整えています。

- `apps/web`: Next.js App Router の開発シェル
- `apps/worker`: Cloud Run 想定の画像生成ワーカー入口
- `apps/xr`: 8th Wall self-host 用の責務分離ポイント
- `packages/*`: 型、プリセット、プロンプト生成、分析イベントの共通層
- `infra/supabase`: 初期 DDL / seed / bucket 定義
- `docs/*`: ローカルセットアップと外部設定チェックリスト

## ローカル起動

1. `pnpm install`
2. `apps/web/.env.example` を `apps/web/.env.local` にコピー
3. `apps/worker/.env.example` を `apps/worker/.env.local` にコピー
4. `pnpm dev`

起動先:

- Web: [http://localhost:3000](http://localhost:3000)
- Worker: [http://localhost:8080/healthz](http://localhost:8080/healthz)

## 主要コマンド

- `pnpm dev`: `web` と `worker` を並列起動
- `pnpm build`: `web` と `worker` をビルド
- `pnpm lint`: `web` を lint
- `pnpm typecheck`: apps / packages 全体を型チェック

## 先に読むドキュメント

- [Roadmap](./ROADMAP.md)
- [ローカル環境セットアップ](./docs/environment-bootstrap.md)
- [外部設定と API キーのチェックリスト](./docs/external-services-checklist.md)
- [Supabase 初期化メモ](./infra/supabase/README.md)
- [Cloud Run / Vertex AI 初期化メモ](./infra/gcp/README.md)

## いま未接続のもの

- Supabase 本番 / 開発プロジェクト
- Vertex AI / Cloud Run
- 8th Wall self-host プロジェクト
- Sentry / PostHog
- GitHub リモートリポジトリ

ここは intentionally 空欄です。接続情報はローカル `.env.local` と GitHub Secrets に入れる前提で、コード側は先に受け皿だけ揃えています。
