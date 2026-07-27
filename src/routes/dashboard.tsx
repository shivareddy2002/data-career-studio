import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { EmptyState } from "@/components/shared/states";
import { DASHBOARD_NAV } from "@/components/site/nav-config";

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
    <AppLayout
      nav={DASHBOARD_NAV}
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Dashboard" }]}
      title="Your personal learning cockpit"
      description="Continue learning, track streaks, review projects, browse certificates and get AI-powered recommendations."
    >
      <EmptyState
        icon={<LayoutDashboard className="h-8 w-8" />}
        title="Nothing to show yet"
        description="Your progress, streaks and recommendations appear here once accounts and learning data come online."
      />
    </AppLayout>
  );
}