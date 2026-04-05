import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "幕張 × 青木昆陽 MVP",
  description: "WebAR と画像生成を束ねる MVP 開発ベース。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(240,143,48,0.18),_transparent_32%),linear-gradient(180deg,#fcfaf7_0%,#f1ece4_100%)] text-slate-950">
          <header className="border-b border-white/60 bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
                幕張 × 青木昆陽 MVP
              </Link>
              <nav className="flex items-center gap-4 text-sm text-slate-600">
                <Link href="/ar" className="transition hover:text-slate-950">
                  AR
                </Link>
                <Link href="/create" className="transition hover:text-slate-950">
                  Create
                </Link>
                <Link href="/admin" className="transition hover:text-slate-950">
                  Admin
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
