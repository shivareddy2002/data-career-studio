import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, AlertTriangle, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { ADMIN_ALERTS, ADMIN_NAV, ADMIN_SECTIONS, EXECUTIVE_KPIS, PLATFORM_HEALTH } from "@/data/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard — Admin Command Centre" },
      { name: "description", content: "Real-time operations for Data Career Studio: users, content, AI platform, community, marketing, finance, security and system health." },
      { property: "og:title", content: "Admin Command Centre — Data Career Studio" },
      { property: "og:description", content: "Complete operational visibility, automation and governance in one console." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AppLayout
      nav={ADMIN_NAV}
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Admin" }]}
      title="Executive dashboard"
      description="Real-time view of learning, revenue, AI, community, support and infrastructure."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXECUTIVE_KPIS.map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-gradient-card p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{k.label}</div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">{k.value}</div>
            {k.delta ? <div className="mt-1 text-xs text-primary">{k.delta}</div> : null}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
            <Activity className="h-4 w-4" /> System health
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {PLATFORM_HEALTH.map((h) => (
              <li key={h.label} className="flex items-center justify-between gap-3">
                <span className="font-medium">{h.label}</span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {h.detail}
                  <span
                    className={
                      h.status === "Operational"
                        ? "rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-primary"
                        : "rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 text-destructive"
                    }
                  >
                    {h.status}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
            <AlertTriangle className="h-4 w-4" /> Alerts
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {ADMIN_ALERTS.map((a) => (
              <li key={a.title} className="rounded-xl border border-border/60 bg-secondary/20 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{a.severity}</span>
                  <span className="font-medium">{a.title}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Modules</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ADMIN_SECTIONS.map((s) => (
          <Link
            key={s.slug}
            to="/admin/$sectionSlug"
            params={{ sectionSlug: s.slug }}
            className="group rounded-2xl border border-border bg-card/40 p-6 transition-all hover:border-primary/50 hover:shadow-elegant"
          >
            <div className="text-xs uppercase tracking-wider text-primary">{s.group}</div>
            <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
              Manage <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}