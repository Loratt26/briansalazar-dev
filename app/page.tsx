import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Placeholder anchor sections. Real sections (Hero, What I Do, Case Studies,
// Side Projects, Contact) are built in subsequent PORTFOLIO_SPEC.md §13 steps.
function PlaceholderSection({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  return (
    <section
      id={id}
      className="min-h-[60vh] flex items-center justify-center border-b border-border"
    >
      <div className="max-w-content text-center space-y-2">
        <p className="font-mono text-xs text-muted-strong uppercase tracking-widest">
          §{id}
        </p>
        <h2 className="text-h2 font-semibold tracking-tight text-muted">
          {label}
        </h2>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="top" className="pt-16">
        <section className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="max-w-content text-center space-y-4">
            <p className="font-mono text-sm text-accent uppercase tracking-widest">
              Step 2 ready
            </p>
            <h1 className="text-h1 font-semibold text-balance">
              Navigation + Footer
            </h1>
            <p className="text-muted leading-relaxed text-pretty">
              Sticky nav with scroll state and mobile overlay are live.
              Hero arrives in step 3.
            </p>
          </div>
        </section>
        <PlaceholderSection id="work" label="Selected work — coming in step 5" />
        <PlaceholderSection id="side" label="Side / Experiments — coming in step 8" />
        <PlaceholderSection id="contact" label="Contact — coming in step 9" />
      </main>
      <Footer />
    </>
  );
}
