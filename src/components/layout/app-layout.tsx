import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PanelLeft } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/navigation/breadcrumbs";
import { SiteHeader } from "@/components/site/site-header";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/components/site/nav-config";

/**
 * Shared shell for authenticated / workspace areas (dashboard, learn, admin).
 * Provides header, collapsible sidebar, breadcrumbs and a single <main>.
 */
export function AppLayout({
  nav,
  breadcrumbs,
  title,
  description,
  actions,
  children,
}: {
  nav: { title: string; items: NavItem[] }[];
  breadcrumbs: Crumb[];
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-6 py-10">
        <aside
          className={cn(
            "hidden shrink-0 transition-all lg:block",
            sidebarOpen ? "w-60" : "w-0 overflow-hidden",
          )}
          aria-label="Section navigation"
        >
          <nav className="space-y-6">
            {nav.map((group) => (
              <div key={group.title}>
                <div className="px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {group.title}
                </div>
                <ul className="mt-2 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.label + item.to}>
                      <Link
                        to={item.to}
                        className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        activeProps={{ className: "bg-secondary text-foreground" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              className="hidden h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground lg:grid"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
              {description ? (
                <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
          </div>

          <div className="mt-10">{children}</div>
        </main>
      </div>
    </div>
  );
}