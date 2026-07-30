import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/app-layout";
import { ADMIN_NAV, ADMIN_SECTIONS, type AdminSection } from "@/data/admin";

export const Route = createFileRoute("/admin_/$sectionSlug")({
  loader: ({ params }) => {
    const section = ADMIN_SECTIONS.find((s) => s.slug === params.sectionSlug);
    if (!section) throw notFound();
    return section;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — Admin` : "Admin";
    const description = loaderData?.description ?? "Data Career Studio admin console.";
    return {
      meta: [
        { title: `${title} | Data Career Studio` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: AdminSectionPage,
});

function AdminSectionPage() {
  const section = Route.useLoaderData() as AdminSection;

  return (
    <AppLayout
      nav={ADMIN_NAV}
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Admin", to: "/admin" }, { label: section.title }]}
      title={section.title}
      description={section.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {section.kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-gradient-card p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{k.label}</div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">{k.value}</div>
          </div>
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

        <aside className="rounded-2xl border border-border bg-gradient-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Capabilities</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {section.capabilities.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </AppLayout>
  );
}