import { PageScaffold } from "@/components/page-scaffold";

export default function AdminStylesPage() {
  return (
    <PageScaffold
      eyebrow="Admin / Styles"
      title="画風プリセット管理"
      description="ユーザーの自由入力を薄くする代わりに、ここでブランドに沿う見た目の幅を設計する。"
      checklist={[
        "名称、説明、テンプレート、表示順の管理。",
        "危険なスタイルや禁止表現の除外。",
        "サンプル画像運用の有無を決める。",
      ]}
      links={[
        { href: "/create", label: "Create flow" },
        { href: "/admin/spots", label: "Spot presets" },
      ]}
    />
  );
}
