import { PageScaffold } from "@/components/page-scaffold";

export default function AdminSpotsPage() {
  return (
    <PageScaffold
      eyebrow="Admin / Spots"
      title="スポットプリセット管理"
      description="幕張らしさを一番強く出す面。現地導線と遠隔導線で違和感なく使える文脈を持たせる。"
      checklist={[
        "spot slug と対象ターゲットの整合性。",
        "default AR mode の決め方。",
        "イベント限定 preset を増やす時の運用ルール。",
      ]}
      links={[
        { href: "/ar/target/demo-target", label: "Target page" },
        { href: "/admin/targets", label: "Targets" },
      ]}
    />
  );
}
