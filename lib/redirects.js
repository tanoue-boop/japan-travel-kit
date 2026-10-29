// 301 redirects for the September 2026 restructure (96 articles → 37, now 64 after the
// October partial reverts below). Shared by next.config.js (redirects) and
// scripts/generate-sitemap.js (exclusions).
//
// 2026-10-09: eleven of those merges were reverted. GSC for 2026-09-09–10-06 showed the
// absorbed URLs were still ranking on search intents the merge target does not serve
// (device-specific setup, single-city transport passes, trip-length and audience queries),
// and the targets lost position after inheriting them. Those pages are live again, so their
// entries are gone from this map — do not re-add them without checking Search Console first.
//
// 2026-10-19: sixteen attractions guides restored for the same reason, one step worse. The
// September merge dropped them on "zero impressions in Google", but Bing is where this site's
// search traffic actually comes from and no Bing data was consulted before the deletion. Day
// trips, city round-ups and hands-on experiences are also the Klook 6.5% band, so each one was
// an earning entry point pointed at the hub. They are live again with Klook CTAs; the entries
// below are gone. Check both Search Console *and* Bing Webmaster Tools before re-adding any.
//
// 2026-10-28: japan-esim-android and japan-esim-business restored, on the same evidence as
// tokyo-airport-limousine-bus below. GSC for the 28 days to 2026-10-23 still showed 181
// impressions at an average position of 9.6 for the Android URL and 79 at 7.1 for the
// business one — ranking pages being 301'd away, not duplicates. Neither target served the
// intent: how-to-set-up-esim-japan is a device-agnostic walkthrough with no picks, and
// best-esim-japan prices a tourist week with nothing on hotspot allowances. Both are live
// again with their own answer, comparison table and FAQ. japan-esim-android-tablet now
// points at the Android page, which carries the tablet compatibility table, rather than at
// the generic setup guide.
//
// 2026-10-29: how-much-yen-to-bring-japan restored, same evidence again. GSC for the 28 days
// 2026-09-29 to 10-26 still showed 116 impressions and one click at an average position of
// 9.22 for the old URL — "how much yen to bring to japan" itself at 11, plus "do i need cash
// in japan", "is japan more cash or card" and "japan cash". currency-exchange-japan serves
// none of them: it ranks for where to change money and at what rate, and says nothing about
// how much to carry per day or which counters take nothing else. The restored page answers
// the amount — per-day floats, 3/7/14-day totals and a cash-only-situations table — and the
// exchange guide keeps the rates.
const removedGuides = {
  // eSIM (21)
  "/guides/esim/japan-esim-3-days": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/japan-esim-5-days": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/japan-esim-7-days": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/japan-esim-10-days": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/japan-sim-short-vs-long-stay": "/guides/esim/japan-esim-data-plans",
  "/guides/esim/airalo-vs-esim-go-japan": "/guides/esim/airalo-vs-holafly-japan",
  "/guides/esim/holafly-vs-esim-go-japan": "/guides/esim/airalo-vs-holafly-japan",
  "/guides/esim/sakura-mobile-vs-airalo-japan": "/guides/esim/airalo-vs-holafly-japan",
  "/guides/esim/sakura-mobile-vs-holafly-japan": "/guides/esim/airalo-vs-holafly-japan",
  "/guides/esim/best-unlimited-esim-japan": "/guides/esim/japan-esim-unlimited",
  "/guides/esim/does-airalo-work-in-japan": "/guides/esim/airalo-japan-review",
  "/guides/esim/does-holafly-work-in-japan": "/guides/esim/holafly-japan-review",
  "/guides/esim/japan-esim-ipad": "/guides/esim/how-to-set-up-esim-japan",
  "/guides/esim/japan-esim-android-tablet": "/guides/esim/japan-esim-android",
  "/guides/esim/japan-esim-not-working": "/guides/esim/how-to-set-up-esim-japan",
  "/guides/esim/japan-esim-with-phone-number": "/guides/esim/sakura-mobile-review",
  "/guides/esim/japan-esim-faq": "/guides/esim/best-esim-japan",
  "/guides/esim/japan-esim-vs-roaming": "/guides/esim/best-esim-japan",
  "/guides/esim/japan-esim-seniors": "/guides/esim/best-esim-japan",
  "/guides/esim/japan-airport-sim-cards": "/guides/esim/best-esim-japan",
  "/guides/esim/free-wifi-japan": "/guides/esim/cheapest-esim-japan",
  // Money (3)
  "/guides/money/japan-travel-insurance": "/guides/money/best-travel-insurance-japan",
  "/guides/money/tipping-in-japan": "/guides/money/cash-vs-card-japan",
  // Transport (5)
  // jr-pass-worth-it and jr-pass-guide both answered "is the JR Pass worth it" and competed
  // for it; merged into the guide 2026-10-09, which now carries the calculator and the
  // break-even math. This one is a genuine duplicate, not a September over-merge.
  "/guides/transport/jr-pass-worth-it": "/guides/transport/jr-pass-guide",
  // tokyo-airport-limousine-bus was removed in the September merge and restored on
  // 2026-10-22: Search Console still showed 39 impressions at an average position of 10.3
  // for the old URL over the previous 28 days, which is a ranking page being 301'd away
  // rather than a duplicate. The restored guide covers the bus only; tokyo-airport-transfer
  // keeps the all-options comparison.
  "/guides/transport/skyliner-vs-nex": "/guides/transport/tokyo-airport-transfer",
  "/guides/transport/tokyo-subway-ticket": "/guides/transport/tokyo-transportation",
  "/guides/transport/hiroshima-transportation": "/guides/transport",
  "/guides/transport/fukuoka-transportation": "/guides/transport",
  // Attractions (1)
  // The other sixteen September merges here were reverted on 2026-10-19 — see the note at the
  // top of this file. This one stays: the page it named was replaced, not merged away, by
  // warner-bros-studio-tour-tokyo-tickets, which owns the topic on a cleaner slug.
  "/guides/attractions/warner-bros-studio-tour-tokyo": "/guides/attractions",
};

// The original top-level landing pages, retired 2026-10-09. They predated /guides and had
// drifted into near-duplicates of a guide that covered the same ground better, so each now
// 301s to the guide that owns the topic. Revenue elements were moved first: /wifi-pocket's
// two Klook rental cards now live in pocket-wifi-vs-esim-japan (via lib/pocket-wifi.ts), and
// /sim-cards' voice and physical-SIM columns in best-esim-japan. Everything /money and
// /transportation sold was already present in the destination guides.
//
// 2026-10-19: /wifi-pocket repointed. It still drew ~300 impressions in 28 days at position
// 41 on "pocket wifi japan" and "best pocket wifi japan" variants, while its target
// pocket-wifi-vs-esim-japan managed 6 — a page answering "which of the two" cannot serve
// "which router do I rent". best-pocket-wifi-japan was written for that intent and now
// receives the redirect; the vs guide keeps its own comparison intent.
const removedPages = {
  "/sim-cards": "/guides/esim/best-esim-japan",
  "/wifi-pocket": "/guides/esim/best-pocket-wifi-japan",
  "/money": "/guides/money",
  "/transportation": "/guides/transport",
};

/** Every 301 on the site, old URL -> new URL. */
const allRedirects = { ...removedGuides, ...removedPages };

module.exports = { removedGuides, removedPages, allRedirects };
