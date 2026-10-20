import { hreflangAlternates } from "../lib/i18n";

/**
 * The <link rel="alternate" hreflang> set for one route, for use inside next/head.
 *
 * Returns an array rather than a component because next/head only understands
 * plain elements as children — a wrapper component's output would not be hoisted
 * into <head>. Arrays are flattened by the head manager, so:
 *
 *   <Head>
 *     …
 *     {hreflangLinks("/guides/attractions/shibuya-sky-tickets")}
 *   </Head>
 *
 * Both languages of a pair emit the identical four links (en, zh-Hant-TW,
 * zh-Hant-HK and x-default). English-only pages get nothing, which is correct —
 * a one-sided or self-only hreflang set is worse than none.
 */
export function hreflangLinks(route: string) {
  return hreflangAlternates(route).map(({ hreflang, href }) => (
    <link key={`${hreflang}-${href}`} rel="alternate" hrefLang={hreflang} href={href} />
  ));
}
