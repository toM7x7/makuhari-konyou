import Link from "next/link";
import { createBootstrapPayload } from "@makuhari/preset-engine";
import { getWebIntegrationStatus } from "@/lib/env";
import { architectureNodes, publicRoutes } from "@/lib/site-map";

export default function HomePage() {
  const bootstrap = createBootstrapPayload();
  const integrationStatus = getWebIntegrationStatus();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <section className="grid gap-6 rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-xl lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">Environment Ready</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            MVP仕様に沿った WebAR / 画像生成モノレポを先に起動できる形まで整備。
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            実装前に迷子になりやすい箇所を潰すため、導線、型、プリセット、Supabase DDL、Cloud Run
            ワーカーの入口、外部設定チェックリストを同じリポジトリ内で揃えています。
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-white/8 p-6">
          <p className="text-sm font-medium text-amber-200">公開導線</p>
          <div className="mt-4 grid gap-3">
            {publicRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 transition hover:border-white/30 hover:bg-white/12"
              >
                <p className="text-sm font-semibold text-white">{route.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{route.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-slate-200 bg-white px-8 py-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Bootstrap payload</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Active hero asset</p>
              <p className="mt-1">{bootstrap.activeHeroAssetVersion}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Spot presets</p>
              <ul className="mt-2 space-y-2">
                {bootstrap.spotPresets.map((preset) => (
                  <li key={preset.id}>
                    <span className="font-medium text-slate-900">{preset.name}</span>
                    <span className="text-slate-500"> / {preset.defaultArMode}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Style presets</p>
              <ul className="mt-2 space-y-2">
                {bootstrap.stylePresets.map((preset) => (
                  <li key={preset.id}>
                    <span className="font-medium text-slate-900">{preset.name}</span>
                    <span className="text-slate-500"> / {preset.slug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-white px-8 py-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Integration status</h2>
          <div className="mt-6 space-y-4">
            {integrationStatus.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.ready ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.ready ? "ready" : "pending"}
                  </span>
                </div>
                {!item.ready ? (
                  <p className="mt-2 text-slate-500">missing: {item.missing.join(", ")}</p>
                ) : null}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white px-8 py-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-950">Architecture slices</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {architectureNodes.map((node) => (
            <article key={node.name} className="rounded-2xl bg-slate-50 px-5 py-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{node.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{node.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
