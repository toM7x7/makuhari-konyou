# ローカル環境セットアップ

## 前提

- Node.js `22.x`
- `pnpm 10.x`
- Python `3.13+`

## 最短セットアップ

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
cp apps/worker/.env.example apps/worker/.env.local
pnpm dev
```

Windows PowerShell の場合:

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
Copy-Item apps/worker/.env.example apps/worker/.env.local
pnpm dev
```

## ローカルで確認するポイント

1. `http://localhost:3000` が開く
2. `GET /api/health` が 200 を返す
3. `GET /api/bootstrap` が preset / feature flag を返す
4. `http://localhost:8080/healthz` が 200 を返す
5. `POST /internal/process-job` が未設定キー一覧つきで 503 を返す

## まず埋める `.env.local`

### `apps/web/.env.local`

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `INTERNAL_WORKER_URL`
- `INTERNAL_WORKER_TOKEN`

### `apps/worker/.env.local`

- `INTERNAL_WORKER_TOKEN`
- `GCP_PROJECT_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## よくある詰まりどころ

- `apps/xr` はまだ 8th Wall self-host export 未投入なので動かない
- `worker` は Vertex AI と Supabase 未設定だと intentionally `503` を返す
- Supabase RLS / Storage policy はまだ最小 DDL だけ。公開前に policy を詰める
