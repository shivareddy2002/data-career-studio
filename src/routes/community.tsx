import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PillarHero } from "@/components/site/page-shell";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Data Career Studio" },
      { name: "description", content: "Forums, study groups, hackathons, mentors, events and success stories from the Data Career Studio community." },
      { property: "og:title", content: "Community — Data Career Studio" },
      { property: "og:description", content: "Learn and grow with a global community." },
    ],
  }),
  component: CommunityPage,
});

const CATS = ["Forums", "Study Groups", "Leaderboard", "Discussions", "Events", "Hackathons", "Coding Challenges", "Mentors", "Success Stories", "Announcements", "Discord", "Telegram", "LinkedIn"];

function CommunityPage() {
  return (
    <PageShell>
      <PillarHero
        eyebrow="Community"
        title="Learn together. Grow faster."
        description="Forums, study groups, mentors, hackathons and success stories from thousands of data & AI learners around the world."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Community" }]}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CATS.map((c) => (
            <div key={c} className="rounded-xl border border-border bg-gradient-card p-5 text-sm">{c}</div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}