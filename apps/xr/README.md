# `apps/xr`

8th Wall self-host 用の責務をここに分離します。

現時点では SDK や self-host build をまだ入れていないため、ここは「受け皿」と運用ルールだけを先に置いています。

## 想定ルール

- `apps/web` から `session`、`returnTo`、`targetSlug` を受け取る
- self-host export 後のビルド成果物は `apps/xr/exports/` 配下に置く
- ターゲット画像の原本は `apps/xr/targets/` と `admin-assets` 側で対応を持たせる
- 8th Wall 側の本実装が入るまでは、`apps/web` だけで導線設計を先に進める

## 外部で必要なもの

- 8th Wall プロジェクト
- self-host 利用権限
- World / Image Target / Face 各モードの PoC シーン
- 同一ドメイン配下で公開するためのホスティング方針
