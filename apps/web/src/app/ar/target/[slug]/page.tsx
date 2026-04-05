import { PageScaffold } from "@/components/page-scaffold";

type TargetPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArTargetPage({ params }: TargetPageProps) {
  const { slug } = await params;

  return (
    <PageScaffold
      eyebrow="AR / Image Target"
      title={`Target AR: ${slug}`}
      description="現地ポスターや看板から QR で流入し、対象ターゲットを読み込んで演出を始める。slug と preset の対応が管理画面とズレないことが肝。"
      checklist={[
        "target slug と spot preset の紐付け確認。",
        "認識成功後 CTA を generate 導線へ寄せる。",
        "Target 差し替え時に URL が壊れない運用ルール。",
      ]}
      links={[
        { href: "/create", label: "Generate" },
        { href: "/admin/targets", label: "Admin Targets" },
      ]}
    />
  );
}
