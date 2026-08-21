import { charts } from "./charts-registry";
import { ChartsGrid } from "./components/charts-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 sm:px-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Charts
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Visual documentation
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Explore the architecture, products, services, and
            other visual documentation.
          </p>
        </div>

        <ChartsGrid charts={charts} />
      </section>
    </main>
  );
}