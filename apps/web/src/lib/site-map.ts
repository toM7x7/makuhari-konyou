export const publicRoutes = [
  {
    href: "/ar",
    label: "AR Hub",
    description: "World / Target / Face の各導線を整理する入口。",
  },
  {
    href: "/create",
    label: "Create",
    description: "画像生成導線。写真 or ARキャプチャから生成を始める。",
  },
  {
    href: "/share/demo-output",
    label: "Share",
    description: "公開共有ページの見え方と通報導線の置き場所を固める。",
  },
  {
    href: "/admin",
    label: "Admin",
    description: "アセット・プリセット・ターゲット・ジョブ監視の管理面。",
  },
];

export const adminRoutes = [
  "/admin/assets",
  "/admin/styles",
  "/admin/spots",
  "/admin/targets",
  "/admin/jobs",
  "/admin/reports",
];

export const architectureNodes = [
  {
    name: "apps/web",
    detail: "Next.js App Router。一般導線・共有ページ・管理画面・公開APIの入口。",
  },
  {
    name: "apps/xr",
    detail: "8th Wall self-host 用の別責務。Web と URL / セッションを共有する想定。",
  },
  {
    name: "apps/worker",
    detail: "Cloud Run 配置の生成ワーカー。Vertex AI / Prompt Builder / 状態遷移を担当。",
  },
  {
    name: "infra/supabase",
    detail: "DDL・seed・Storage bucket 定義・将来の Edge Functions 配置先。",
  },
];
