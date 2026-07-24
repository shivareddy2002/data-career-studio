import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Data Career Studio" },
      { name: "description", content: "Help center, contact and support for Data Career Studio learners." },
      { property: "og:title", content: "Support — Data Career Studio" },
      { property: "og:description", content: "We're here to help." },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Support"
        title="We're here to help."
        description="Search the help center, browse guides, or reach out to our team."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Support" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 text-sm text-muted-foreground">
        Help center coming in Part 20 (Final Production Requirements).
      </section>
    </PageShell>
  );
}