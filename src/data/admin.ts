export type AdminSection = {
  slug: string;
  title: string;
  group: string;
  description: string;
  kpis: { label: string; value: string; delta?: string }[];
  columns: string[];
  rows: string[][];
  capabilities: string[];
};

export const EXECUTIVE_KPIS = [
  { label: "Daily active users", value: "38,420", delta: "+4.1% vs yesterday" },
  { label: "Monthly active users", value: "412,700", delta: "+7.8% MoM" },
  { label: "New registrations", value: "3,190", delta: "+312 this week" },
  { label: "Course enrolments", value: "21,845", delta: "+9.2% MoM" },
  { label: "Completion rate", value: "63.4%", delta: "+2.1 pts" },
  { label: "MRR", value: "$486,200", delta: "+5.6% MoM" },
  { label: "Certificates issued", value: "9,412", delta: "+1,120 MoM" },
  { label: "AI requests / day", value: "1.24M", delta: "p95 780ms" },
];

export const PLATFORM_HEALTH = [
  { label: "API", status: "Operational", detail: "p95 142ms" },
  { label: "Database", status: "Operational", detail: "12% CPU" },
  { label: "Cache", status: "Operational", detail: "98.7% hit rate" },
  { label: "Queue", status: "Degraded", detail: "backlog 1,204 jobs" },
  { label: "Search", status: "Operational", detail: "index fresh" },
  { label: "AI services", status: "Operational", detail: "0.4% error rate" },
];

export const ADMIN_ALERTS = [
  { severity: "High", title: "Payment webhook retries spiking", detail: "42 failed renewals in the last hour" },
  { severity: "Medium", title: "Queue backlog above threshold", detail: "Certificate issuance jobs delayed ~7 min" },
  { severity: "Medium", title: "Anomalous login attempts", detail: "318 failed logins from one ASN — rate limited" },
  { severity: "Low", title: "Prompt v12 regression", detail: "Tutor satisfaction down 3% on the A variant" },
];

export const ADMIN_SECTIONS: AdminSection[] = [
  {
    slug: "users",
    title: "User Management",
    group: "People",
    description: "Students, mentors, creators, recruiters, moderators and admins with full activity, billing and security history.",
    kpis: [
      { label: "Total users", value: "1,284,300" },
      { label: "Mentors", value: "2,140" },
      { label: "Creators", value: "812" },
      { label: "Suspended", value: "319" },
    ],
    columns: ["User", "Role", "Status", "Last active"],
    rows: [
      ["priya.nair@example.com", "Mentor", "Verified", "2 min ago"],
      ["marcus.leung@example.com", "Creator", "Active", "18 min ago"],
      ["team@northwind.example", "Organization admin", "Enterprise", "1 hr ago"],
      ["sofia.kraus@example.com", "Moderator", "Active", "3 hr ago"],
      ["r.desai@example.com", "Student", "Trial", "Yesterday"],
      ["spam.account.4471@example.com", "Student", "Suspended", "6 days ago"],
    ],
    capabilities: [
      "Granular RBAC: view, create, edit, delete, approve, publish, export",
      "Impersonation with audit trail",
      "Device and login history",
      "Organizations, departments, teams and bulk enrolment",
      "SSO and custom branding for enterprise tenants",
    ],
  },
  {
    slug: "content",
    title: "Content & Course Management",
    group: "Content",
    description: "Courses, lessons, blogs, landing pages and media governed by a draft → review → publish workflow with versioning.",
    kpis: [
      { label: "Published courses", value: "148" },
      { label: "In review", value: "23" },
      { label: "Drafts", value: "61" },
      { label: "Media assets", value: "34,120" },
    ],
    columns: ["Item", "Type", "Stage", "Owner"],
    rows: [
      ["SQL for Data Work v3", "Course", "Published", "Curriculum team"],
      ["Python for Data Analysis v2", "Course", "In review", "Marcus Leung"],
      ["Streaming with Kafka", "Course", "Draft", "Ade Okafor"],
      ["Snowflake cost playbook", "Article", "Approval pending", "Priya Nair"],
      ["Autumn campaign landing page", "Landing page", "Scheduled", "Marketing"],
      ["Certificate template — SnowPro", "Template", "Published", "Certification team"],
    ],
    capabilities: [
      "Version history with one-click rollback",
      "Localization, SEO metadata and accessibility review gates",
      "Drag-and-drop page builder for campaign and course pages",
      "Media library with tags, folders, compression and CDN delivery",
      "Certificate templates, verification portal, QR codes and bulk issuance",
    ],
  },
  {
    slug: "ai",
    title: "AI Platform",
    group: "Intelligence",
    description: "Model usage, cost, latency, prompt versions, agent quality and safety across every AI surface.",
    kpis: [
      { label: "Requests / day", value: "1.24M" },
      { label: "Cost / day", value: "$1,940" },
      { label: "p95 latency", value: "780ms" },
      { label: "Error rate", value: "0.4%" },
    ],
    columns: ["Agent", "Prompt version", "Requests (24h)", "Satisfaction"],
    rows: [
      ["AI Tutor", "v12 (A/B vs v11)", "612,400", "4.6 / 5"],
      ["Code Reviewer", "v7", "218,900", "4.4 / 5"],
      ["Career Coach", "v5", "96,120", "4.7 / 5"],
      ["Mock Interviewer", "v4", "48,310", "4.5 / 5"],
      ["Community Assistant", "v3", "184,700", "4.3 / 5"],
      ["Study Planner", "v6", "79,540", "4.6 / 5"],
    ],
    capabilities: [
      "Central prompt registry with versioning, preview, testing and rollback",
      "Fallback models and provider-agnostic routing",
      "Hallucination reports and safety alerts",
      "RAG source and vector index management",
      "A/B testing with statistically gated rollouts",
    ],
  },
  {
    slug: "community",
    title: "Community Operations",
    group: "People",
    description: "Moderation queue, abuse reports, mentor and creator approvals, groups, events and appeals.",
    kpis: [
      { label: "Queue items", value: "84" },
      { label: "Open reports", value: "27" },
      { label: "Auto-moderated (24h)", value: "412" },
      { label: "Appeals", value: "6" },
    ],
    columns: ["Item", "Type", "Signal", "Action"],
    rows: [
      ["Post #91204", "Spam", "AI confidence 0.97", "Auto-removed"],
      ["Comment #55810", "Harassment report", "3 reports", "Needs review"],
      ["Mentor application — L. Fischer", "Verification", "Docs submitted", "Pending approval"],
      ["Group: Crypto signals", "Off-topic", "Policy flag", "Warned"],
      ["User @dataspam", "Repeat offender", "4 strikes", "Suspend 30 days"],
      ["Appeal #221", "Ban appeal", "First appeal", "Under review"],
    ],
    capabilities: [
      "Warning, suspension and ban ladder with appeals",
      "AI moderation plus manual review with audit logs",
      "Mentor, creator and recruiter verification",
      "Event, hackathon and group administration",
      "Community health and retention dashboards",
    ],
  },
  {
    slug: "growth",
    title: "Marketing, CRM & Support",
    group: "Business",
    description: "Campaigns, lifecycle automation, leads, enterprise pipeline and the support desk in one operating view.",
    kpis: [
      { label: "Open tickets", value: "312" },
      { label: "CSAT", value: "94%" },
      { label: "Email open rate", value: "41.2%" },
      { label: "Pipeline", value: "$2.1M" },
    ],
    columns: ["Workflow", "Channel", "Audience", "Performance"],
    rows: [
      ["Welcome series", "Email", "New registrations", "58% open · 14% CTR"],
      ["Lesson reminder", "Push", "Inactive 3 days", "22% reactivation"],
      ["Certificate issued", "Email", "Completers", "71% open"],
      ["Job match digest", "Email", "Career Hub users", "36% open · 9% apply"],
      ["Renewal recovery", "Email + in-app", "Failed payments", "31% recovered"],
      ["Enterprise nurture", "CRM sequence", "Org decision makers", "18 SQLs"],
    ],
    capabilities: [
      "Visual automation builder for lifecycle journeys",
      "Lead, company and mentor CRM with attribution",
      "Ticketing with SLA, escalations and AI-suggested responses",
      "Referral and affiliate programs",
      "A/B testing across pages, pricing, emails and onboarding",
    ],
  },
  {
    slug: "finance",
    title: "Finance & Subscriptions",
    group: "Business",
    description: "Plans, pricing, invoices, taxes, refunds, churn and revenue forecasting.",
    kpis: [
      { label: "MRR", value: "$486,200" },
      { label: "ARR", value: "$5.83M" },
      { label: "Churn", value: "2.4%" },
      { label: "LTV / CAC", value: "3.8x" },
    ],
    columns: ["Plan", "Subscribers", "MRR", "Churn"],
    rows: [
      ["Free", "914,200", "$0", "—"],
      ["Pro monthly", "24,180", "$241,800", "3.1%"],
      ["Pro annual", "9,640", "$152,600", "1.2%"],
      ["Teams", "612 orgs", "$68,400", "1.8%"],
      ["Enterprise", "38 contracts", "$23,400", "0.6%"],
      ["Coupons active", "14 codes", "-$4,100", "—"],
    ],
    capabilities: [
      "Plans, coupons, trials and enterprise contracts",
      "Invoices, taxes, refunds and dunning for failed payments",
      "Revenue forecasting and cohort LTV",
      "Scheduled finance reports in PDF, Excel and CSV",
      "Full audit trail on every billing change",
    ],
  },
  {
    slug: "platform",
    title: "Security, Health & Settings",
    group: "Operations",
    description: "Security events, system health, integrations, feature flags, localization, audit logs and compliance.",
    kpis: [
      { label: "Uptime (30d)", value: "99.98%" },
      { label: "Security incidents", value: "0 open" },
      { label: "Feature flags", value: "42 active" },
      { label: "GDPR requests", value: "7 pending" },
    ],
    columns: ["Area", "Item", "State", "Detail"],
    rows: [
      ["Feature flags", "new-community-home", "25% rollout", "Instant rollback armed"],
      ["Integrations", "Payment gateway", "Healthy", "Last sync 2 min ago"],
      ["Integrations", "Email provider", "Healthy", "99.4% delivery"],
      ["Security", "Rate limiting", "Active", "318 blocked requests (24h)"],
      ["Localization", "Languages", "9 live", "RTL supported"],
      ["Compliance", "Data exports", "7 queued", "SLA 30 days"],
    ],
    capabilities: [
      "Audit logs for every privileged action",
      "Feature flags by environment, segment and percentage",
      "Integration credentials managed as secrets with health and usage",
      "Branding, themes, SEO defaults, legal pages and maintenance mode",
      "GDPR exports, deletion, consent and retention policies",
    ],
  },
];

export const ADMIN_NAV = [
  {
    title: "Command centre",
    items: [
      { label: "Executive Dashboard", to: "/admin" },
      { label: "User Management", to: "/admin/users" },
      { label: "Content & Courses", to: "/admin/content" },
      { label: "AI Platform", to: "/admin/ai" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Community Ops", to: "/admin/community" },
      { label: "Marketing & CRM", to: "/admin/growth" },
      { label: "Finance", to: "/admin/finance" },
      { label: "Security & Settings", to: "/admin/platform" },
    ],
  },
];