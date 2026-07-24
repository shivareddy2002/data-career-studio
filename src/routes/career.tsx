import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Career Hub — Data Career Studio" },
      { name: "description", content: "Jobs, referrals, resume builder, ATS checker, LinkedIn optimizer, mock interviews, salary insights and interview experiences." },
      { property: "og:title", content: "Career Hub — Data Career Studio" },
      { property: "og:description", content: "Everything you need to land your next data role." },
    ],
  }),
  component: CareerPage,
});

const CATS = [
  "Jobs", "Internships", "Walk-ins", "Referrals",
  "Resume Builder", "ATS Checker", "Cover Letter", "LinkedIn Optimizer",
  "Portfolio Builder", "Salary Insights", "Career Advice", "Interview Experiences",
  "Company Guides", "Hiring Trends", "Career Roadmaps",
];

function CareerPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Career Hub"
        title="From portfolio to offer letter."
        description="Résumé, cover letter, LinkedIn, referrals, interview prep and live jobs — a full career operating system, in one place."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Career Hub" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATS.map((c) => (
            <div key={c} className="rounded-xl border border-border bg-gradient-card p-5">
              <div className="text-sm font-medium">{c}</div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}