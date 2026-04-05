import { PageScaffold } from "@/components/page-scaffold";

export default function AdminReportsPage() {
  return (
    <PageScaffold
      eyebrow="Admin / Reports"
      title="通報確認"
      description="公開共有された画像だけを対象に、運用者が確認・対応する面。個人写真の privacy 方針と衝突しない設計が必要。"
      checklist={[
        "public-share bucket 内の画像だけを対象にする。",
        "report status を最小限で回す。",
        "AI 生成ラベルの表示漏れ監査。",
      ]}
      links={[
        { href: "/share/demo-output", label: "Share page" },
        { href: "/admin/jobs", label: "Jobs" },
      ]}
    />
  );
}
