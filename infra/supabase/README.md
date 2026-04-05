# Supabase 初期化メモ

このリポジトリでは Supabase 関連の初期ファイルを `infra/supabase/` に置いています。

## 適用順

1. `0001_init.sql`
2. `seed.sql`

## CLI を使う場合の例

```bash
supabase --workdir infra/supabase db push
supabase --workdir infra/supabase db seed
```

## 含まれているもの

- セッション、アップロード、プリセット、ジョブ、共有、通報、分析イベントのテーブル
- Storage bucket の初期作成
- 最低限の seed データ

## まだ含めていないもの

- 本番用 RLS policy
- 管理者権限モデル
- Storage policy
- Edge Functions の実装
