import { CaseStudyCard } from "@/components/CaseStudyCard";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { caseStudies } from "@/content/case-studies";

export function CaseStudies() {
  return (
    <section
      id="work"
      aria-labelledby="case-studies-heading"
      className="scroll-mt-16 py-16 md:py-24"
    >
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <FadeInOnScroll>
          <h2
            id="case-studies-heading"
            className="text-h2 font-semibold tracking-tight"
          >
            Selected work
          </h2>
          <p className="mt-2 text-muted">
            Real problems I&apos;ve owned end-to-end.
          </p>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
            {caseStudies.map((cs) => (
              <li key={cs.slug} className="min-w-0">
                <CaseStudyCard caseStudy={cs} />
              </li>
            ))}
          </ul>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
