import { PageScaffold } from "@/components/page-scaffold";

export default function ArHubPage() {
  return (
    <PageScaffold
      eyebrow="AR Hub"
      title="AR モード選択"
      description="World / Image Target / Face の3本を同じ入口から束ねる。現地導線と遠隔導線の分岐、カメラ許可、8th Wall 側への遷移設計をここで詰める。"
      checklist={[
        "ARモード選択 UI と各モードの説明文。",
        "8th Wall self-host 側へ渡す session / returnTo / targetSlug の取り決め。",
        "カメラ権限拒否時の代替導線。",
      ]}
      links={[
        { href: "/ar/world", label: "World" },
        { href: "/ar/target/demo-target", label: "Target" },
        { href: "/ar/face", label: "Face" },
      ]}
    />
  );
}
