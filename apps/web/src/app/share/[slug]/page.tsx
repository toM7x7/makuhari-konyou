import { PageScaffold } from "@/components/page-scaffold";

type SharePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SharePage({ params }: SharePageProps) {
  const { slug } = await params;

  return (
    <PageScaffold
      eyebrow="Share"
      title={`公開共有ページ: ${slug}`}
      description="共有用だけ public に派生させる方針を守るページ。AI 生成ラベル、通報、公開期限の扱いをここに集約する。"
      checklist={[
        "private 原本との差分を明示する。",
        "report 導線を邪魔せず置く。",
        "URL 期限切れ時の挙動を先に決める。",
      ]}
      links={[
        { href: "/result/demo-job", label: "Back to result" },
        { href: "/admin/reports", label: "Reports" },
      ]}
    />
  );
}
