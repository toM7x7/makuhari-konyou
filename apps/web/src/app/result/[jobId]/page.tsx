import { PageScaffold } from "@/components/page-scaffold";

type ResultPageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function ResultPage({ params }: ResultPageProps) {
  const { jobId } = await params;

  return (
    <PageScaffold
      eyebrow="Result"
      title={`生成結果: ${jobId}`}
      description="ジョブ状態遷移、AI 生成ラベル、保存 / 共有 / 通報を一つの面で扱う。MVP では completed / failed / blocked の3状態がまず重要。"
      checklist={[
        "queued から completed までの polling UX。",
        "blocked / failed の説明文と再試行導線。",
        "share 作成時に public-share bucket へ派生する設計。",
      ]}
      links={[
        { href: "/share/demo-output", label: "Open share page" },
        { href: "/admin/jobs", label: "Monitor jobs" },
      ]}
    />
  );
}
