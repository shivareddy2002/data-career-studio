import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Data Career Studio" },
      { name: "description", content: "Prep for SnowPro, Databricks, DP-203, DP-600, Azure AI, AWS, GCP, Terraform, Kubernetes, dbt, Airflow, Kafka and Fabric." },
      { property: "og:title", content: "Certifications — Data Career Studio" },
      { property: "og:description", content: "Cert prep aligned with official blueprints." },
    ],
  }),
  component: CertPage,
});

const CERTS = ["SnowPro", "Databricks", "DP-203", "DP-600", "Azure AI", "AWS", "Google Cloud", "Terraform", "Kubernetes", "dbt", "Airflow", "Kafka", "Fabric"];

function CertPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Certifications"
        title="Prep smarter. Pass the first time."
        description="Study plans, curated notes, videos, practice questions and full-length mock exams — aligned with the latest official exam blueprints."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Certifications" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((c) => (
            <div key={c} className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="text-xs uppercase tracking-wider text-primary">Certification</div>
              <div className="mt-2 text-lg font-semibold">{c}</div>
              <p className="mt-2 text-xs text-muted-foreground">Roadmap · Notes · Practice · Mock exams</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}