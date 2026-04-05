import { PageScaffold } from "@/components/page-scaffold";

export default function ArWorldPage() {
  return (
    <PageScaffold
      eyebrow="AR / World"
      title="World 配置 AR"
      description="床検出、タップ配置、スケール、回転、シャッターの最短導線。MVP ではここが最重要なので、別アプリの xr 側と疎結合に保つ。"
      checklist={[
        "床検出待ちのガイド文言と再試行導線。",
        "pose_json / scale / rotation の保存フォーマット。",
        "撮影後に create へ戻す URL 契約。",
      ]}
      links={[
        { href: "/create", label: "Create" },
        { href: "/admin/targets", label: "Targets" },
      ]}
    />
  );
}
