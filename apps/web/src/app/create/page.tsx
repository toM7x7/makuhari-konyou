import { PageScaffold } from "@/components/page-scaffold";

export default function CreatePage() {
  return (
    <PageScaffold
      eyebrow="Create"
      title="画像生成入力"
      description="入力 UI は『どこで？』『どんな雰囲気？』を主役にして、自由文は最後に短文だけに留める。2.5系の画像枠制限を UI で吸収するページ。"
      checklist={[
        "Scene / Style ref / Spot preset / Style preset / Free text の入力順。",
        "青木昆陽アセットは毎回サーバ側で注入する前提にする。",
        "aspect ratio を 1:1 / 4:5 / 9:16 に限定する。",
      ]}
      links={[
        { href: "/result/demo-job", label: "Result" },
        { href: "/admin/styles", label: "Style Presets" },
      ]}
    />
  );
}
