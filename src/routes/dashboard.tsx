import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Data Career Studio" },
      { name: "description", content: "Your personal learning cockpit: progress, projects, certificates, streaks, analytics and AI recommendations." },
      { property: "og:title", content: "Dashboard — Data Career Studio" },
      { property: "og:description", content: "Your learning cockpit." },
    ],
  }),
  component: DashPage,
});

function DashPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Dashboard"
        title="Your personal learning cockpit."
        description="Continue learning, track streaks, review projects, browse certificates and get AI-powered recommendations."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Dashboard" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 text-sm text-muted-foreground">
        Full dashboard comes online with Part 5 (Authentication) & Part 6 (User Dashboard).
      </section>
    </PageShell>
  );
}