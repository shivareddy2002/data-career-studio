export type NavItem = { label: string; to: string; description?: string };

export const PRIMARY_NAV: NavItem[] = [
  { label: "Learn", to: "/learn", description: "Paths, courses, tutorials, roadmaps" },
  { label: "Practice", to: "/practice", description: "SQL, Python, labs, challenges" },
  { label: "Build", to: "/build", description: "Portfolio-ready projects & case studies" },
  // { label: "Certifications", to: "/certifications", description: "SnowPro, Databricks, DP-203 & more" },
  // { label: "Career Hub", to: "/career", description: "Jobs, resume, mock interviews" },
  // { label: "AI Studio", to: "/ai-studio", description: "Tutor, reviewer, planner, coach" },
  // { label: "Community", to: "/community", description: "Forums, mentors, hackathons" },
  // { label: "Resources", to: "/resources", description: "Notes, cheat sheets, datasets" },
];

export const FOOTER_SECTIONS: { title: string; links: NavItem[] }[] = [
  {
    title: "Learn",
    links: [
      { label: "Learning paths", to: "/learn" },
      { label: "Courses", to: "/learn" },
      { label: "Roadmaps", to: "/learn" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Practice & Build",
    links: [
      { label: "Practice", to: "/practice" },
      { label: "Projects", to: "/build" },
      { label: "Certifications", to: "/certifications" },
      { label: "Resources", to: "/resources" },
    ],
  },
  {
    title: "Career",
    links: [
      { label: "Career Hub", to: "/career" },
      { label: "AI Studio", to: "/ai-studio" },
      { label: "Community", to: "/community" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Contact", to: "/company" },
      { label: "Support", to: "/support" },
      { label: "Privacy", to: "/company" },
    ],
  },
];

export type NavSection = { title: string; links: NavItem[] };

/** Sidebar navigation for the workspace/dashboard area. */
export const DASHBOARD_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Learn", to: "/learn" },
      { label: "Practice", to: "/practice" },
      { label: "Build", to: "/build" },
    ],
  },
  {
    title: "Growth",
    items: [
      { label: "Certifications", to: "/certifications" },
      { label: "Career Hub", to: "/career" },
      { label: "AI Studio", to: "/ai-studio" },
      { label: "Community", to: "/community" },
    ],
  },
  {
    title: "Library",
    items: [
      { label: "Resources", to: "/resources" },
      { label: "Blog", to: "/blog" },
      { label: "Support", to: "/support" },
    ],
  },
];

/** Groups surfaced in the ⌘K command palette. */
export const COMMAND_GROUPS: NavSection[] = [
  {
    title: "Pillars",
    links: [
      { label: "Learn", to: "/learn", description: "Paths & courses" },
      { label: "Practice", to: "/practice", description: "Labs & challenges" },
      { label: "Build", to: "/build", description: "Projects" },
      { label: "Certifications", to: "/certifications", description: "Exam prep" },
      { label: "Career Hub", to: "/career", description: "Jobs & interviews" },
    ],
  },
  {
    title: "Workspace",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "AI Studio", to: "/ai-studio" },
      { label: "Resources", to: "/resources" },
      { label: "Community", to: "/community" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Support", to: "/support" },
    ],
  },
];