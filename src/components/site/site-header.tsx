import { Link } from "@tanstack/react-router";
import { Search, Sparkles, Command } from "lucide-react";
import { PRIMARY_NAV } from "./nav-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base">
            Data Career <span className="text-gradient">Studio</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            {/* <kbd className="ml-6 inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
              <Command className="h-2.5 w-2.5" /> K
            </kbd> */}
          </button>
          <Link
            to="/dashboard"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/learn"
            className="rounded-md bg-gradient-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
          >
            Start learning
          </Link>
        </div>
      </div>
    </header>
  );
}