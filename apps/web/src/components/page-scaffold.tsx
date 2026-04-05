import Link from "next/link";

type PageScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
  checklist: string[];
  links?: Array<{
    href: string;
    label: string;
  }>;
};

export function PageScaffold({
  eyebrow,
  title,
  description,
  checklist,
  links = [],
}: PageScaffoldProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <section className="space-y-4 rounded-[2rem] border border-slate-200 bg-white px-8 py-10 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">{eyebrow}</p>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600">{description}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-8 text-slate-100">
          <h2 className="text-lg font-semibold">この画面で先に固めること</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 px-8 py-8">
          <h2 className="text-lg font-semibold text-slate-900">ショートカット</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
            >
              Home
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
