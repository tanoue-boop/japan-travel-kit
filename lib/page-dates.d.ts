export type PageUpdated = {
  /** Last-modified date, "YYYY-MM-DD" — JSON-LD dateModified and sitemap lastmod. */
  iso: string;
  /** "October 2026" — the "Updated …" badge. */
  label: string;
  /** First-published date, "YYYY-MM-DD" — JSON-LD datePublished. */
  published: string;
};

export const BUILD_DATE: string;
export const PAGES_DIR: string;
export function hasFullHistory(): boolean;
export function routeToFile(route: string): string;
export function fileToRoute(file: string): string;
export function lastModified(route: string): string;
export function firstPublished(route: string): string;
export function formatMonthYear(iso: string): string;
export function pageUpdated(route: string): PageUpdated;
export function articleDates(routes: string[]): Record<string, string>;
export function writeSnapshot(routes: string[]): Record<string, string>;
export function writePublishedSnapshot(routes: string[]): Record<string, string>;
