import Link from "next/link";
import { PageScaffold } from "@/components/page-scaffold";
import { adminRoutes } from "@/lib/site-map";

export default function AdminPage() {
  return (
    <>
      <PageScaffold
        eyebrow="Admin"
        title="管理画面"
        description="Hero Asset、Spot / Style Preset、AR Target、Job 監視をここで分離する。MVP では運用者が迷わないことを最優先にする。"
        checklist={[
          "公開導線と管理導線の責務を分離する。",
          "一覧 -> 編集 -> 有効化 の流れを単純化する。",
          "本番で必要な監査ログ粒度を早めに決める。",
        ]}
        links={adminRoutes.map((href) => ({
          href,
          label: href.replace("/admin/", ""),
        }))}
      />
      <div className="mx-auto mb-12 flex w-full max-w-5xl flex-wrap gap-3 px-6">
        {adminRoutes.map((href) => (
          <Link
            key={href}
            href={href}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
          >
            {href}
          </Link>
        ))}
      </div>
    </>
  );
}
