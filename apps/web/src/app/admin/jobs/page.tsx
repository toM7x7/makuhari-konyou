import { PageScaffold } from "@/components/page-scaffold";

export default function AdminJobsPage() {
  return (
    <PageScaffold
      eyebrow="Admin / Jobs"
      title="生成ジョブ監視"
      description="キュー、失敗理由、再実行の判断を運用者が素早く行う場所。MVP では status と error visibility を最優先で整える。"
      checklist={[
        "queued / generating / blocked / failed の一覧性。",
        "モデル別成功率の見せ方。",
        "retry 可能ケースと不可ケースの線引き。",
      ]}
      links={[
        { href: "/result/demo-job", label: "Result page" },
        { href: "/admin/reports", label: "Reports" },
      ]}
    />
  );
}
