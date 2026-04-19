import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FadeInOnScroll } from "@/components/FadeInOnScroll";
import { sideProjects } from "@/content/side-projects";
import { focusRing, cn } from "@/lib/utils";

export function SideProjects() {
  return (
    <section
      id="side"
      aria-labelledby="side-projects-heading"
      className="scroll-mt-16 py-16 md:py-24"
    >
      <div className="mx-auto max-w-wide px-6 md:px-8">
        <FadeInOnScroll>
          <h2
            id="side-projects-heading"
            className="text-h2 font-semibold tracking-tight"
          >
            Side / Experiments
          </h2>
          <p className="mt-2 text-muted">
            Smaller builds and things in progress.
          </p>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
            {sideProjects.map((project) => (
              <li key={project.title} className="min-w-0">
                <Card className="h-full p-6 md:p-7 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-strong">
                      {project.status}
                    </span>
                    {project.badge && (
                      <span className="inline-flex shrink-0 items-center rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
                    {project.description}
                  </p>

                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "mt-6 inline-flex items-center gap-1.5 self-start text-sm text-muted hover:text-accent transition-colors",
                        focusRing
                      )}
                    >
                      {project.link.label}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </a>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
