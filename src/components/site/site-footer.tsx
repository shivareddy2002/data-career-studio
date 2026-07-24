import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { FOOTER_SECTIONS } from "./nav-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              Data Career <span className="text-gradient">Studio</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
Your Learning Hub for Data Engineering, Data Science, Analytics, AI & Cloud.            </p>
          </div>
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {section.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {section.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Data Career Studio. Built for Data Professionals.</div>
          <div className="flex gap-4">
            <Link to="/company">Privacy</Link>
            <Link to="/company">Terms</Link>
            <Link to="/company">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}