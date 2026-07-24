export type NavItem = { label: string; to: string; description?: string };

export const PRIMARY_NAV: NavItem[] = [
  { label: "Learn", to: "/learn", description: "Paths, courses, tutorials, roadmaps" },
  { label: "Practice", to: "/practice", description: "SQL, Python, labs, challenges" },
  { label: "Build", to: "/build", description: "Portfolio-ready projects & case studies" },
  { label: "Certifications", to: "/certifications", description: "SnowPro, Databricks, DP-203 & more" },
  { label: "Career Hub", to: "/career", description: "Jobs, resume, mock interviews" },
  { label: "AI Studio", to: "/ai-studio", description: "Tutor, reviewer, planner, coach" },
  { label: "Community", to: "/community", description: "Forums, mentors, hackathons" },
  { label: "Resources", to: "/resources", description: "Notes, cheat sheets, datasets" },
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