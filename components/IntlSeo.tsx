import { hreflangLinks } from "./Hreflang";
import { LOCALES, OG_LOCALE, absoluteUrl, localeOf } from "../lib/i18n";
import { SITE_NAME } from "../lib/structured-data";

/**
 * The head tags every translated page needs, as an array for next/head.
 *
 * Same set the English pages write out by hand — title, description, canonical,
 * robots, Open Graph, Twitter — plus `og:locale` and the hreflang cluster, which
 * only the translated pages have. An array rather than a component because
 * next/head only hoists plain elements; see components/Hreflang.tsx.
 *
 *   <Head>
 *     {seoTags({ route: "/ko/…", title: "…", desc: "…" })}
 *     … page-specific JSON-LD …
 *   </Head>
 *
 * The locale is read off the route rather than passed in, so a page cannot declare
 * one language in its URL and another in its Open Graph tags. Named zhSeoTags until
 * 2026-10-21, when 한국어 and ไทย joined the two Chinese editions.
 *
 * `og:locale:alternate` lists every other locale the site publishes, not only the
 * ones this page exists in: unlike hreflang, it is a statement about the site, and
 * no consumer treats it as a URL mapping.
 */
export function seoTags({ route, title, desc }: { route: string; title: string; desc: string }) {
  const url = absoluteUrl(route);
  const locale = localeOf(route);
  return [
    <title key="title">{`${title} | ${SITE_NAME}`}</title>,
    <meta key="desc" name="description" content={desc} />,
    <link key="canonical" rel="canonical" href={url} />,
    <meta key="robots" name="robots" content="index, follow" />,
    <meta key="og:title" property="og:title" content={title} />,
    <meta key="og:url" property="og:url" content={url} />,
    <meta key="og:description" property="og:description" content={desc} />,
    <meta key="og:type" property="og:type" content="article" />,
    <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />,
    <meta key="og:locale" property="og:locale" content={OG_LOCALE[locale]} />,
    ...LOCALES.filter((other) => other !== locale).map((other) => (
      <meta
        key={`og:locale:alternate:${other}`}
        property="og:locale:alternate"
        content={OG_LOCALE[other]}
      />
    )),
    <meta key="tw:card" name="twitter:card" content="summary_large_image" />,
    <meta key="tw:title" name="twitter:title" content={title} />,
    <meta key="tw:description" name="twitter:description" content={desc} />,
    ...hreflangLinks(route),
  ];
}
