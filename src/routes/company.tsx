import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company — Data Career Studio" },
      { name: "description", content: "About Data Career Studio: mission, vision, team, partners, careers and press." },
      { property: "og:title", content: "Company — Data Career Studio" },
      { property: "og:description", content: "Our mission, team, and story." },
    ],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Company"
        title="Building the world's leading AI-powered data career platform."
        description="Our mission is to make world-class data & AI education accessible, practical, and career-changing for millions."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Company" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 text-sm text-muted-foreground">
        About · Mission · Vision · Team · Careers · Partners · Press · Contact · Privacy · Terms · Cookies
      </section>
    </PageShell>
  );
}