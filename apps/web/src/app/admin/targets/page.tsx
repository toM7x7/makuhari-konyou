import { PageScaffold } from "@/components/page-scaffold";

export default function AdminTargetsPage() {
  return (
    <PageScaffold
      eyebrow="Admin / Targets"
      title="Image Target 管理"
      description="ターゲット画像登録、slug、紐付けスポットの3点が中核。現地設置物が増えるほどここが運用の要になる。"
      checklist={[
        "target image の更新時に slug を維持する。",
        "spot preset 紐付けを one-to-one にするか決める。",
        "active / inactive 切り替えの運用ルール。",
      ]}
      links={[
        { href: "/ar/target/demo-target", label: "Open target flow" },
        { href: "/admin/spots", label: "Spot presets" },
      ]}
    />
  );
}
