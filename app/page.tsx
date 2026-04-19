export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-content text-center space-y-4">
        <p className="font-mono text-sm text-accent uppercase tracking-widest">
          Scaffolding ready
        </p>
        <h1 className="text-h1 font-semibold text-balance">
          briansalazar.dev
        </h1>
        <p className="text-muted leading-relaxed text-pretty">
          Next.js 14 + Tailwind + Geist + design tokens are wired.
          Sections will be built next per{" "}
          <span className="font-mono text-foreground">PORTFOLIO_SPEC.md</span>{" "}
          §13.
        </p>
      </div>
    </main>
  );
}
