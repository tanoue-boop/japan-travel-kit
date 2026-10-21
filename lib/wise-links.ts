/**
 * Wise affiliate links, in one place.
 *
 * The Wise programme ("Wise - Commission payout currency JPY") was approved on
 * Partnerize on 21 Oct 2026. Payout is a flat bounty per newly signed-up user
 * who then moves money across currencies or spends on the card — ¥1,400 for a
 * personal account, ¥7,000 for a business one — with a 365-day cookie across
 * 228 eligible countries.
 *
 * Partnerize click URLs take three parts:
 *   /click/camref:<campaign ref>            — who gets paid
 *   /pubref:<our own reference>             — our per-article reporting key
 *   /destination:<url-encoded target>       — optional deep link
 *
 * Every outbound Wise link on the site goes through `wiseLink` so the camref
 * lives in exactly one file. Revolut is deliberately NOT here: that programme
 * is still unapproved, so its links stay plain wise-free `revolut.com` URLs.
 */

/** Partnerize campaign reference for the approved Wise programme. */
export const WISE_CAMREF = "1011l6tNE9";

/**
 * A tracked Wise link.
 *
 * @param slug  Reporting key, normally the article slug. Translated editions
 *              prefix the language, e.g. `zh-tw-wise-card-japan`, so the
 *              Partnerize report separates them.
 * @param destination Optional wise.com URL to land on. Omit it to land on the
 *              Wise home page, which Wise itself localises by country — better
 *              than us guessing a `/gb/` or `/jp/` prefix for a global audience.
 */
export function wiseLink(slug: string, destination?: string): string {
  const base = `https://wise.prf.hn/click/camref:${WISE_CAMREF}/pubref:${slug}`;
  return destination ? `${base}/destination:${encodeURIComponent(destination)}` : base;
}

/**
 * `rel` for every Wise link: `sponsored` because it is paid, `noopener`
 * because it opens in a new tab. No `nofollow` — `sponsored` is the specific
 * signal Google asks for on affiliate links, and no `noreferrer`, which would
 * strip the referrer Partnerize reads.
 */
export const WISE_REL = "sponsored noopener";

/** Deep-link targets that resolve to a localised page from any country. */
export const WISE_PRICING_URL = "https://wise.com/pricing/";
export const WISE_CARD_URL = "https://wise.com/card/";

/**
 * Figures read off Wise's own pages on the date below — nothing here is
 * inferred. The ATM numbers are the UK-registered-account example Wise prints
 * on its card page; allowances differ by account country, which is why the
 * copy that uses them says so.
 *
 * Sources: wise.com/gb/card/ and wise.com/gb/pricing/send-money
 */
export const WISE_VERIFIED = {
  checkedAt: "21 Oct 2026",
  /** wise.com/gb/pricing/send-money, verbatim. */
  rateClaim: "the live mid-market rate, and a small, upfront fee",
  /** wise.com/gb/card/, verbatim: "Free withdrawals up to 250 GBP/month." */
  freeAtmUk: "250 GBP/month",
  /** wise.com/gb/card/, verbatim: the fee above that allowance. */
  overAtmFeeUk: "2.69%",
} as const;
