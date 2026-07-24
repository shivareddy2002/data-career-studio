import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Hammer,
  Award,
  Briefcase,
  Bot,
  Users,
  Library,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PageShell } from "@/components/site/page-shell";

export const Route = createFileRoute("/")({
  component: Index,
});

const PILLARS = [
  { icon: BookOpen, label: "Learn", to: "/learn", copy: "Structured paths from beginner to advanced across SQL, Python, Cloud, ML & AI." },
  { icon: Code2, label: "Practice", to: "/practice", copy: "SQL, Python, Spark, Databricks labs. Daily challenges. Mock tests. Playground." },
  { icon: Hammer, label: "Build", to: "/build", copy: "Portfolio-quality projects with architecture, docs, GitHub & deployment." },
  { icon: Award, label: "Certifications", to: "/certifications", copy: "SnowPro, Databricks, DP-203, DP-600, Azure AI, AWS, GCP & more." },
  { icon: Briefcase, label: "Career Hub", to: "/career", copy: "Resume, ATS checker, LinkedIn optimizer, mock interviews, referrals." },
  { icon: Bot, label: "AI Studio", to: "/ai-studio", copy: "AI tutor, resume reviewer, mock interviewer, career coach & planners." },
  { icon: Users, label: "Community", to: "/community", copy: "Forums, study groups, hackathons, mentors, and success stories." },
  { icon: Library, label: "Resources", to: "/resources", copy: "Notes, cheat sheets, datasets, scripts, notebooks, and templates." },
];

const STATS = [
  { k: "9", v: "Career tracks" },
  { k: "300+", v: "Hours of learning" },
  { k: "120+", v: "Hands-on labs" },
  { k: "50+", v: "Portfolio projects" },
];

const PROMISES = [
  "Practical curriculum built by working data & AI engineers",
  "AI tutor that adapts to your pace and goals",
  "Portfolio-ready projects with real datasets",
  "Mock interviews modeled on real hiring loops",
  "Certification prep aligned to official exam blueprints",
  "Career coaching from first job to senior roles",
];

function Index() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1.15fr_1fr] lg:pt-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              The AI-powered career studio for data & AI professionals
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
              Learn. Practice. Build.<br />
              <span className="text-gradient">Get hired in data & AI.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Data Career Studio is a complete ecosystem — courses, hands-on labs, portfolio projects,
              certifications, mock interviews, and an AI mentor — designed to make you job-ready and
              accompany you throughout your career.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
              >
                Explore learning paths <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ai-studio"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Try the AI Studio
              </Link>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-4 gap-6">
              {STATS.map((s) => (
                <div key={s.v}>
                  <dt className="text-2xl font-semibold text-foreground">{s.k}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
            <div className="relative rounded-3xl border border-border bg-gradient-card p-8 shadow-elegant">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> Your learning cockpit
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Data Engineer Path", pct: 68 },
                  { label: "Snowflake SnowPro Core", pct: 42 },
                  { label: "End-to-end dbt + Airflow project", pct: 25 },
                ].map((row) => (
                  <div key={row.label} className="rounded-xl border border-border bg-background/40 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>{row.label}</span>
                      <span className="text-muted-foreground">{row.pct}%</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-gradient-primary" style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-border bg-background/40 p-4">
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Bot className="h-3.5 w-3.5" /> AI Tutor
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  "Ready when you are — want to review window functions or jump into today's SQL challenge?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-primary">The ecosystem</div>
              <h2 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight">
                One platform for every stage of your data career.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Eight tightly connected pillars — from your first SELECT statement to your senior offer.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <Link
                key={p.label}
                to={p.to}
                className="group rounded-2xl border border-border bg-gradient-card p-6 transition-all hover:border-primary/50 hover:shadow-elegant"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{p.label}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="border-t border-border/60 bg-card/20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary">Why Data Career Studio</div>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight">
              Built like a product, taught like a mentor.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Every course, lab, and project is designed with one goal: turn curiosity into a
              career. No fluff, no filler — only the skills that hiring managers actually test.
            </p>
          </div>
          <ul className="grid gap-3">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Your data career, <span className="text-gradient">designed end-to-end</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join the next generation of data & AI professionals learning, building, and getting hired
            together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-elegant"
            >
              Start learning free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/career"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Explore Career Hub
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
