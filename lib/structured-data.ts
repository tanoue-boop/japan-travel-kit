/**
 * The site's JSON-LD, in one place.
 *
 * Added 2026-10-20. Every page used to build its own structured data inline, which
 * meant 74 copies of the same publisher block, no Organization or WebSite node at all,
 * and no datePublished anywhere. AI answer engines and Google's AI surfaces lean on
 * exactly those fields to decide who they are quoting and how fresh it is, so they are
 * now generated from here:
 *
 *   - Organization + WebSite — emitted once for every page, from pages/_document.tsx.
 *     _document is server-only, so this costs nothing in any client bundle.
 *   - Article — per article page, via `articleJsonLd`, with both dates resolved from
 *     lib/page-dates.js (git history, snapshotted in data/page-dates.json).
 *   - ItemList — on /guides and the four category hubs, via `itemListJsonLd`.
 *
 * Existing FAQPage and BreadcrumbList blocks on the pages are untouched: consumers
 * merge every ld+json block on a page into one graph, so the `@id` references below
 * resolve across blocks. author/publisher are still written out in full rather than as
 * a bare `{"@id": ...}` reference, so each Article block also stands on its own for
 * validators that check one block at a time.
 */
import { groupedArticles, type GuideCategory } from "./guide-hub";
import type { PageUpdated } from "./page-dates";

export const SITE_URL = "https://www.japan-travel-kit.com";

/** Stable node ids, so repeated references merge instead of creating duplicates. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SITE_NAME = "Japan Travel Kit";

/** The operating company. Named as the publisher's parent rather than as the brand. */
export const OPERATOR_NAME = "mjo Inc.";

const SITE_DESCRIPTION =
  "Practical, independent planning guides for foreign visitors to Japan: eSIMs and mobile data, " +
  "trains and rail passes, money and payment cards, and attraction tickets.";

const publisher = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
} as const;

/**
 * Organization and WebSite, as one graph. Emitted on every page.
 *
 * `sameAs` is deliberately an empty array: the site has no verified profile anywhere
 * else yet, and listing an unverified one is worse than listing none.
 */
export function siteJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        alternateName: "japan-travel-kit.com",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/og-image.png`,
        description: SITE_DESCRIPTION,
        email: "info@japan-travel-kit.com",
        sameAs: [],
        parentOrganization: {
          "@type": "Organization",
          name: OPERATOR_NAME,
          description:
            "Japan-based company working in inbound tourism and e-commerce consulting; operator of Japan Travel Kit.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tokyo",
            addressCountry: "JP",
          },
        },
        knowsAbout: [
          "Travel in Japan",
          "eSIM and mobile data in Japan",
          "Japanese rail travel and rail passes",
          "Payment cards and cash in Japan",
          "Attraction tickets in Japan",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher,
      },
    ],
  });
}

export type ArticleJsonLdInput = {
  /** Route of the page, e.g. "/guides/attractions/shibuya-sky-tickets". */
  route: string;
  /** The article's own headline — normally its H1. */
  headline: string;
  /** Optional one-line summary, where the page already supplied one. */
  description?: string;
  /** Both dates, from `pageUpdated(route)`. */
  updated: PageUpdated;
};

/** Article node for one guide page. */
export function articleJsonLd({ route, headline, description, updated }: ArticleJsonLdInput): string {
  const url = `${SITE_URL}${route}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline,
    ...(description ? { description } : {}),
    datePublished: updated.published,
    dateModified: updated.iso,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: publisher,
    publisher,
  });
}

export type ItemListEntry = { href: string; title: string };

/** ItemList node for /guides and the category hubs. */
export function itemListJsonLd({
  route,
  name,
  description,
  items,
}: {
  route: string;
  name: string;
  description: string;
  items: ItemListEntry[];
}): string {
  const url = `${SITE_URL}${route}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    name,
    description,
    inLanguage: "en",
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      url: `${SITE_URL}${item.href}`,
    })),
  });
}

/**
 * ItemList for a category hub, in the order the hub itself renders the articles —
 * `groupedArticles`, so the list and the page agree.
 */
export function hubItemListJsonLd(category: GuideCategory, description: string): string {
  return itemListJsonLd({
    route: category.href,
    name: `${category.name} — Japan Travel Kit guides`,
    description,
    items: groupedArticles(category).flatMap(({ articles }) => articles),
  });
}
