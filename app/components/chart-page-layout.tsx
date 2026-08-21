import Link from "next/link";
import type { ReactNode } from "react";

type ChartPageLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ChartPageLayout({
  title,
  description,
  children,
}: ChartPageLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 sm:px-10">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            ← All charts
          </Link>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
            {title}
          </h1>

          {description ? (
            <p className="mt-2 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>

        {children}
      </section>
    </main>
  );
}