import { PageScaffold } from "@/components/page-scaffold";

export default function ArFacePage() {
  return (
    <PageScaffold
      eyebrow="AR / Face"
      title="Selfie / フォトフレーム AR"
      description="遠隔でも遊べる軽量導線。フレーム、吹き出し、芋モチーフ演出を少数に絞って SNS 共有に寄せる。"
      checklist={[
        "フロントカメラ前提の UI と permission fallback。",
        "フレーム種類の初期数を 1-2 に絞る。",
        "共有時に AI 生成導線へ自然に接続する。",
      ]}
      links={[
        { href: "/share/demo-output", label: "Share" },
        { href: "/create", label: "Create" },
      ]}
    />
  );
}
