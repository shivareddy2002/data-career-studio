import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/app-layout";
import { COMMUNITY_NAV, COMMUNITY_SECTIONS, type CommunitySection } from "@/data/community";

export const Route = createFileRoute("/community_/$sectionSlug")({
  loader: ({ params }) => {
    const section = COMMUNITY_SECTIONS.find((s) => s.slug === params.sectionSlug);
    if (!section) throw notFound();
    return section;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — Community` : "Community";
    const description = loaderData?.description ?? "Data Career Studio community.";
    return {
      meta: [
        { title: `${title} | Data Career Studio` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CommunitySectionPage,
});

function CommunitySectionPage() {
  const section = Route.useLoaderData() as CommunitySection;

  return (
    <AppLayout
      nav={COMMUNITY_NAV}
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Community", to: "/community" }, { label: section.title }]}
      title={section.title}
      description={section.description}
    >
      <div className="flex flex-wrap gap-2">
        {section.highlights.map((h) => (
          <span
            key={h}
            className="rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground"
          >
            {h}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                {section.columns.map((c) => (
                  <th key={c} className="px-4 py-3 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-border/60">
                  {row.map((cell, i) => (
                    <td
                      key={`${row[0]}-${i}`}
                      className={i === 0 ? "px-4 py-3 font-medium" : "px-4 py-3 text-muted-foreground"}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="space-y-6">
          {section.aside.map((block) => (
            <div key={block.title} className="rounded-2xl border border-border bg-gradient-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">{block.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </AppLayout>
  );
}