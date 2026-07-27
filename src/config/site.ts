/**
 * Single source of truth for site-wide configuration.
 * Never hardcode brand strings or URLs in components.
 */
export const siteConfig = {
  name: "Data Career Studio",
  shortName: "DCS",
  url: "https://data-career-studio.lovable.app",
  tagline:
    "Your Learning Hub for Data Engineering, Data Science, Analytics, AI & Cloud.",
  locale: "en-US",
} as const;

export type SiteConfig = typeof siteConfig;