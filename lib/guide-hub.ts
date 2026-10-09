/**
 * Shared shape for the four guide categories in lib/guides-*.ts.
 *
 * Added 2026-10-09. The category hubs used to be a flat list of every article title, which
 * read as a sitemap rather than a pillar page: nothing told a visitor where to start, and
 * articles serving different search intents (a provider review, a setup walkthrough, a
 * trip-length pick) sat side by side. Each article now declares a `group`, and the hub and
 * the /guides index both render the same grouping from this one source.
 */
export type GuideArticle = {
  href: string;
  badge: string;
  title: string;
  desc: string;
  /** Key of one of the category's `groups` — the search intent this article serves. */
  group: string;
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
  /** Hub eyebrow icon, reused on the /guides index. */
  emoji: string;
  /** Two to three sentences of pillar introduction, above the article groups. */
  intro: string[];
  /** The one article a visitor with no particular question should read first. */
  startHere: string;
  /** Why that article is the starting point. */
  startHereWhy: string;
  groups: GuideGroup[];
  articles: GuideArticle[];
};

/** A category's articles bucketed by group, in `groups` order. Empty groups are dropped. */
export function groupedArticles(category: GuideCategory) {
  return category.groups
    .map((group) => ({ group, articles: category.articles.filter((a) => a.group === group.key) }))
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
