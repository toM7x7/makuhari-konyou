import { PageScaffold } from "@/components/page-scaffold";

export default function AdminAssetsPage() {
  return (
    <PageScaffold
      eyebrow="Admin / Assets"
      title="青木昆陽アセット管理"
      description="常に差し込まれる hero asset のバージョン切り替え面。ここが壊れると生成体験全体が崩れる。"
      checklist={[
        "有効バージョンは単一に保つ。",
        "thumbnail と storage path の差分確認。",
        "差し替え履歴を最低限追える設計。",
      ]}
      links={[
        { href: "/admin", label: "Admin top" },
        { href: "/create", label: "Create flow" },
      ]}
    />
  );
}
