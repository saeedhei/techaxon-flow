import { HierarchyFlow } from "./components/hierarchy-flow";
import { techaxonConnections, techaxonHierarchy } from "./data/techaxon-hierarchy";

export default function Home() {
  return (
    <main className="flex flex-1 bg-zinc-50 px-6 py-12 font-sans dark:bg-black sm:px-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Organization overview</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Techaxon products and services
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            A simple view of the offerings available across Techaxon.
          </p>
        </div>
        <HierarchyFlow data={techaxonHierarchy} connections={techaxonConnections} />
      </section>
    </main>
  );
}
