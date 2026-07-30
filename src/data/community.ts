export type ForumCategory = { name: string; topics: number; posts: number; unanswered: number };

export type CommunitySection = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
  columns: string[];
  rows: string[][];
  aside: { title: string; items: string[] }[];
};

export const COMMUNITY_STATS = [
  { label: "Active members", value: "48,210", delta: "+6.2% this month" },
  { label: "Questions answered", value: "112,904", delta: "92% answer rate" },
  { label: "Mentor sessions", value: "3,845", delta: "4.9 avg rating" },
  { label: "Projects reviewed", value: "17,320", delta: "+1,204 this month" },
];

export const TRENDING_DISCUSSIONS = [
  { title: "Incremental models in dbt vs Snowflake streams — what do you use in production?", tag: "Snowflake", replies: 84, votes: 212, author: "Priya N." },
  { title: "How do you version prompts for an LLM feature in a regulated bank?", tag: "Generative AI", replies: 57, votes: 188, author: "Marcus L." },
  { title: "Spark shuffle spilling to disk — tuning checklist that actually worked", tag: "Spark", replies: 41, votes: 164, author: "Ade O." },
  { title: "Resume review: 3 YOE analyst moving into analytics engineering", tag: "Resume Reviews", replies: 33, votes: 96, author: "Sofia K." },
  { title: "Kafka exactly-once semantics: is it worth the throughput hit?", tag: "Kafka", replies: 29, votes: 143, author: "Daniel R." },
];

export const FORUM_CATEGORIES: ForumCategory[] = [
  { name: "Python", topics: 4820, posts: 31200, unanswered: 62 },
  { name: "SQL", topics: 5310, posts: 40120, unanswered: 48 },
  { name: "Snowflake", topics: 2140, posts: 15980, unanswered: 31 },
  { name: "Databricks", topics: 1870, posts: 12440, unanswered: 27 },
  { name: "Spark", topics: 1620, posts: 11030, unanswered: 22 },
  { name: "Kafka", topics: 940, posts: 6120, unanswered: 19 },
  { name: "Power BI", topics: 1380, posts: 8720, unanswered: 25 },
  { name: "Machine Learning", topics: 3010, posts: 19870, unanswered: 44 },
  { name: "Deep Learning", topics: 1220, posts: 7640, unanswered: 30 },
  { name: "Generative AI", topics: 2680, posts: 16410, unanswered: 51 },
  { name: "LLMs", topics: 2110, posts: 13890, unanswered: 46 },
  { name: "Cloud", topics: 1740, posts: 10230, unanswered: 21 },
  { name: "Azure", topics: 1490, posts: 9140, unanswered: 18 },
  { name: "AWS", topics: 1660, posts: 10880, unanswered: 24 },
  { name: "Career", topics: 2930, posts: 21470, unanswered: 15 },
  { name: "Interview Preparation", topics: 2480, posts: 18220, unanswered: 12 },
  { name: "Resume Reviews", topics: 1310, posts: 7420, unanswered: 9 },
  { name: "Projects", topics: 1980, posts: 12610, unanswered: 26 },
  { name: "Open Source", topics: 870, posts: 4930, unanswered: 17 },
  { name: "General Discussion", topics: 3640, posts: 28710, unanswered: 11 },
];

export const TOP_CONTRIBUTORS = [
  { name: "Priya Nair", role: "Analytics Engineer @ Fintech", reputation: 41280, badge: "Top Mentor" },
  { name: "Marcus Leung", role: "ML Platform Lead", reputation: 36940, badge: "AI Expert" },
  { name: "Ade Okafor", role: "Senior Data Engineer", reputation: 32110, badge: "Spark Expert" },
  { name: "Sofia Kraus", role: "Career Coach", reputation: 28760, badge: "Interview Master" },
  { name: "Rahul Desai", role: "Snowflake Architect", reputation: 26340, badge: "Snowflake Expert" },
];

export const UPCOMING_EVENTS = [
  { title: "AMA: Breaking into analytics engineering", type: "AMA", when: "Thu 6 Aug · 17:00 UTC", seats: "412 registered" },
  { title: "Workshop: Streaming pipelines with Kafka + Flink", type: "Workshop", when: "Sat 8 Aug · 13:00 UTC", seats: "268 registered" },
  { title: "Hackathon: Retail demand forecasting", type: "Hackathon", when: "14–16 Aug", seats: "96 teams" },
  { title: "Career fair: EU data roles", type: "Career Fair", when: "Wed 26 Aug · 09:00 UTC", seats: "31 employers" },
];

export const GROWTH_JOURNEY = [
  "Learner", "Contributor", "Active Member", "Project Builder", "Community Helper",
  "Mentor", "Creator", "Industry Expert", "Thought Leader",
];

export const AI_ASSISTANT_ACTIONS = [
  "Summarise a 90-reply thread into a decision log",
  "Find the three experts most likely to answer this question",
  "Detect duplicates before you post",
  "Recommend a study group matching your path and timezone",
  "Turn a live room transcript into shared notes",
  "Surface unanswered questions you can answer today",
];

export const COMMUNITY_SECTIONS: CommunitySection[] = [
  {
    slug: "forums",
    title: "Discussion Forums",
    eyebrow: "Knowledge",
    description:
      "Structured, tag-driven discussion with markdown, code blocks, polls, accepted answers and AI thread summaries.",
    highlights: ["Markdown & code blocks", "Polls and attachments", "Accepted answers", "AI thread summaries", "Subscriptions & bookmarks"],
    columns: ["Category", "Topics", "Posts", "Unanswered"],
    rows: FORUM_CATEGORIES.map((c) => [c.name, c.topics.toLocaleString(), c.posts.toLocaleString(), String(c.unanswered)]),
    aside: [
      { title: "Q&A system", items: ["Votes and reputation", "Accepted answers", "Edit history", "Duplicate detection", "Expert verification"] },
      { title: "AI assistance", items: ["Suggested answers", "Related questions", "Automatic tagging", "Translation"] },
    ],
  },
  {
    slug: "study-groups",
    title: "Study Groups & Learning Circles",
    eyebrow: "Collaboration",
    description:
      "Join a cohort by technology, certification, company target, region or language — or run a small accountability circle.",
    highlights: ["Shared resources", "Group calendar & tasks", "Weekly goals", "Daily check-ins", "AI moderator"],
    columns: ["Group", "Focus", "Members", "Cadence"],
    rows: [
      ["SnowPro Core — August cohort", "Certification", "184", "3x / week"],
      ["FAANG analytics interviews", "Company prep", "231", "Daily"],
      ["Spark performance deep dive", "Technology", "97", "Weekly"],
      ["dbt + Analytics Engineering", "Technology", "312", "2x / week"],
      ["India · Data Engineering circle", "Regional", "540", "Weekly"],
      ["LLM builders accountability circle", "Learning circle", "26", "Daily check-in"],
      ["Portfolio project team — retail", "Project team", "8", "Sprint-based"],
    ],
    aside: [
      { title: "Learning circles", items: ["Weekly goals", "Progress tracking", "Shared notes", "Peer feedback", "Group analytics"] },
      { title: "Live study rooms", items: ["Text chat & whiteboard", "Code sharing", "Shared timer & task board", "AI note taker and summary"] },
    ],
  },
  {
    slug: "mentors",
    title: "Mentor Hub",
    eyebrow: "Mentorship",
    description:
      "Verified mentors offering career guidance, resume and portfolio reviews, mock interviews, code reviews and long-term mentorship.",
    highlights: ["Verified badge", "Free & paid sessions", "Ratings and reviews", "Office hours", "Session notes"],
    columns: ["Mentor", "Expertise", "Rating", "Availability"],
    rows: [
      ["Priya Nair — Verified", "Analytics engineering, dbt, Snowflake", "4.9 (312)", "Mon/Wed evenings"],
      ["Marcus Leung — Verified", "MLOps, LLM platforms, Databricks", "4.9 (208)", "Office hours Fri"],
      ["Ade Okafor", "Spark, Kafka, streaming architecture", "4.8 (164)", "Weekends"],
      ["Sofia Kraus — Verified", "Interviews, resumes, negotiation", "5.0 (421)", "Daily slots"],
      ["Rahul Desai", "Snowflake architecture, cost tuning", "4.7 (139)", "Tue/Thu"],
      ["Lena Fischer", "Power BI, semantic modelling", "4.8 (96)", "Mon mornings"],
    ],
    aside: [
      { title: "Mentor services", items: ["Career guidance", "Resume & portfolio reviews", "Mock interviews", "Project & code reviews", "Certification coaching"] },
      { title: "Mentor dashboard", items: ["Bookings & calendar", "Students and session notes", "Reviews and ratings", "Analytics", "Notifications"] },
    ],
  },
  {
    slug: "creators",
    title: "Creator Hub",
    eyebrow: "Contribution",
    description:
      "Publish courses, tutorials, articles, datasets, templates and practice sets through a governed publishing workflow.",
    highlights: ["Draft → review → publish", "AI quality check", "Accessibility & SEO review", "Version history", "Content analytics"],
    columns: ["Content", "Type", "Status", "Engagement"],
    rows: [
      ["Snowflake cost optimisation playbook", "Article", "Published", "18.2k reads"],
      ["Zero-to-hero dbt project", "Course", "In review", "—"],
      ["Kafka consumer group cheat sheet", "Cheat sheet", "Published", "9.4k downloads"],
      ["Retail sales dataset (5M rows)", "Dataset", "Published", "3.1k uses"],
      ["LLM evaluation harness template", "Template", "Draft", "—"],
      ["Analytics engineering weekly", "Newsletter", "Published", "12.6k subscribers"],
    ],
    aside: [
      { title: "Creator dashboard", items: ["Published content & drafts", "Followers and subscribers", "Engagement and ratings", "Comments", "Announcements"] },
      { title: "Publishing workflow", items: ["Draft", "Peer review", "AI quality check", "Accessibility & SEO", "Moderator review", "Publish + versioning"] },
    ],
  },
  {
    slug: "events",
    title: "Events, Hackathons & Challenges",
    eyebrow: "Live",
    description:
      "Live classes, AMAs, webinars, workshops, meetups, career fairs, hackathons and recurring coding challenges.",
    highlights: ["Registration & waiting lists", "Calendar and reminders", "Attendance & recordings", "Judging and leaderboards", "Certificates"],
    columns: ["Event", "Type", "When", "Participation"],
    rows: [
      ["Breaking into analytics engineering", "AMA", "Thu 6 Aug", "412 registered"],
      ["Streaming pipelines with Kafka + Flink", "Workshop", "Sat 8 Aug", "268 registered"],
      ["Retail demand forecasting", "Hackathon", "14–16 Aug", "96 teams"],
      ["EU data roles career fair", "Career fair", "Wed 26 Aug", "31 employers"],
      ["Daily SQL challenge", "Coding challenge", "Every day", "5,120 solvers"],
      ["Monthly ML sprint", "Coding challenge", "1–7 Sep", "1,340 entrants"],
    ],
    aside: [
      { title: "Hackathon toolkit", items: ["Teams and mentors", "Problem statements", "Submission portal", "Judging & prizes", "Project showcase"] },
      { title: "Challenge tracks", items: ["Daily / weekly / monthly", "Company-specific", "Role-specific", "Badges and certificates", "AI explanations"] },
    ],
  },
  {
    slug: "knowledge-base",
    title: "Knowledge Base & Open Source",
    eyebrow: "Library",
    description:
      "Community-authored guides, patterns and glossaries, plus an open source hub that matches contributors to beginner-friendly issues.",
    highlights: ["Articles & FAQs", "Architecture patterns", "AI summaries", "Version history", "Contributor credits"],
    columns: ["Entry", "Kind", "Contributors", "Updated"],
    rows: [
      ["Medallion architecture reference", "Pattern", "14", "2 days ago"],
      ["SQL window functions glossary", "Glossary", "9", "5 days ago"],
      ["Airflow production checklist", "Best practice", "22", "1 week ago"],
      ["RAG evaluation guide", "Guide", "11", "3 days ago"],
      ["dbt-utils starter issues", "Open source", "31", "Today"],
      ["Great Expectations docs sprint", "Open source", "18", "4 days ago"],
    ],
    aside: [
      { title: "Open source hub", items: ["GitHub integration", "Repository discovery", "Beginner issues", "Contribution tracking", "Community recognition"] },
      { title: "Trust & safety", items: ["Content policies", "AI moderation", "Reporting & appeals", "Blocking and muting", "Audit logs"] },
    ],
  },
];

export const COMMUNITY_NAV = [
  {
    title: "Community",
    items: [
      { label: "Community Home", to: "/community" },
      { label: "Discussion Forums", to: "/community/forums" },
      { label: "Study Groups", to: "/community/study-groups" },
      { label: "Mentor Hub", to: "/community/mentors" },
      { label: "Creator Hub", to: "/community/creators" },
      { label: "Events & Hackathons", to: "/community/events" },
      { label: "Knowledge Base", to: "/community/knowledge-base" },
    ],
  },
];