/**
 * Shared shape for the four guide categories in lib/guides-*.ts.
 *
 * Added 2026-10-09. The category hubs used to be a flat list of every article title, which
 * read as a sitemap rather than a pillar page: nothing told a visitor where to start, and
 * articles serving different search intents (a provider review, a setup walkthrough, a
 * trip-length pick) sat side by side. Each article now declares a `group`, and the hub and
 * the /guides index both render the same grouping from this one source.
 */
/**
 * Which city an article belongs to. `other` means nationwide (a rail pass, an eSIM, a
 * payment card) — anything that is not tied to one base. Articles that span cities take
 * their main departure point: a Kyoto-and-Nara day tour sold out of Osaka is `osaka`.
 *
 * Added 2026-10-19 so the three city hubs (things-to-do-tokyo / -kyoto / -osaka) can list
 * every article for their city automatically, across all four categories.
 */
export type GuideCity = "tokyo" | "kyoto" | "osaka" | "other";

/** Hub display order for cities. */
export const CITY_ORDER: GuideCity[] = ["tokyo", "kyoto", "osaka", "other"];

export const CITY_LABELS: Record<GuideCity, string> = {
  tokyo: "Tokyo",
  kyoto: "Kyoto",
  osaka: "Osaka",
  other: "Japan-wide",
};

/**
 * Every article needs both `group` and `city`. Both are required by the type *and* checked
 * at module load by assertArticleMeta, so a new entry added by the daily article queue that
 * omits either one — or misspells a group key — fails the build rather than quietly
 * disappearing from the hubs and the city indexes.
 */
export type GuideArticle = {
  href: string;
  badge: string;
  title: string;
  desc: string;
  /** Key of one of the category's `groups` — the search intent this article serves. */
  group: string;
  /** City the article is about, or "other" for nationwide. Required. */
  city: GuideCity;
};

export type GuideGroup = {
  key: string;
  /** Section heading on the hub. */
  label: string;
  /** One line under the heading, explaining what the group answers. */
  desc: string;
};

export type GuideCategory = {
  /** Hub route, e.g. "/guides/esim". */
  href: string;
  name: string;
  /** Two to three sentences of pillar introduction, above the article groups. */
  intro: string[];
  /** The one article a visitor with no particular question should read first. */
  startHere: string;
  /** Why that article is the starting point. */
  startHereWhy: string;
  groups: GuideGroup[];
  articles: GuideArticle[];
  /**
   * Order each group by city (Tokyo → Kyoto → Osaka → nationwide) rather than by the order
   * the articles were written in. On for Things to Do, where groups keep growing and a
   * reader scanning "Day trips & tours" wants their own base first; off elsewhere, where the
   * hand-written order puts the most useful article at the top of its group.
   */
  sortByCity?: boolean;
};

/**
 * A category's articles bucketed by group, in `groups` order. Empty groups are dropped.
 * With `sortByCity`, each bucket is ordered by CITY_ORDER (stable within a city).
 */
export function groupedArticles(category: GuideCategory) {
  return category.groups
    .map((group) => {
      const articles = category.articles.filter((a) => a.group === group.key);
      if (category.sortByCity) {
        articles.sort((a, b) => CITY_ORDER.indexOf(a.city) - CITY_ORDER.indexOf(b.city));
      }
      return { group, articles };
    })
    .filter((entry) => entry.articles.length > 0);
}

/** The `startHere` article. Throws at build time if the href drifts out of the list. */
export function startHereArticle(category: GuideCategory): GuideArticle {
  const article = category.articles.find((a) => a.href === category.startHere);
  if (!article) {
    throw new Error(`guide-hub: startHere ${category.startHere} is not in ${category.href}`);
  }
  return article;
}

/** Every article in a category is in a declared group — guards against typos in `group`. */
export function assertGroupsCover(category: GuideCategory): void {
  const keys = new Set(category.groups.map((g) => g.key));
  const stray = category.articles.filter((a) => !keys.has(a.group));
  if (stray.length) {
    throw new Error(`guide-hub: ${category.href} has articles in unknown groups: ${stray.map((a) => a.href).join(", ")}`);
  }
}

/** Every article declares one of the four cities — guards against a missing or typo'd `city`. */
export function assertCitiesSet(category: GuideCategory): void {
  const stray = category.articles.filter((a) => !CITY_ORDER.includes(a.city));
  if (stray.length) {
    throw new Error(
      `guide-hub: ${category.href} has articles with a missing or unknown city (expected ${CITY_ORDER.join(" | ")}): ` +
        stray.map((a) => `${a.href} (${String(a.city)})`).join(", "),
    );
  }
}

/**
 * Both per-article checks in one call. Every lib/guides-*.ts runs this at module load, so a
 * new article with no `group` or no `city` breaks `npm run build` instead of shipping.
 */
export function assertArticleMeta(category: GuideCategory): void {
  assertGroupsCover(category);
  assertCitiesSet(category);
}

/** Articles for one city, across whichever category lists are passed in. */
export function articlesForCity(city: GuideCity, ...lists: GuideArticle[][]): GuideArticle[] {
  return lists.flat().filter((a) => a.city === city);
}
