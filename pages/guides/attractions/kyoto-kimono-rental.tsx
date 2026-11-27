import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kyotoHighlightBusTour,
  kyotoKimonoAiwafukuGion,
  kyotoKimonoAiwafukuKiyomizu,
  kyotoKimonoAiwafukuStation,
  kyotoKimonoMimosaStation,
  kyotoKimonoMisakiGion,
  kyotoKimonoOokiniArashiyama,
  kyotoKimonoYumeyakata,
  kyotoGionHigashiyamaWalkingTour,
  kyotoTeaCeremonyMatchaMaking,
  klookEsim,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kyoto kimono rental — the city-specific guide, sitting under the nationwide
 * kimono-rental-japan overview and beside asakusa-kimono-rental for Tokyo.
 *
 * Search intent, deliberately split three ways so the three pages do not compete:
 *
 * - kimono-rental-japan answers "should I do this at all, and where" — Kyoto vs
 *   Asakusa, what a plan includes, the return deadline as a concept.
 * - asakusa-kimono-rental answers the Tokyo version of the same day.
 * - this page answers "which Kyoto area and which shop", which is the question a
 *   reader who has already chosen Kyoto actually has: Gion and Kiyomizu against
 *   Arashiyama against Kyoto Station, and the walking route the outfit is for.
 *
 * Sources, all read on 23 Oct 2026, and nothing here is first-hand:
 *
 * - The www.klook.com search index for the seven shop listings linked below —
 *   locations, walking times, what each plan includes, the hair-set arrangements,
 *   and Yumeyakata's three published return routes (same day by 17:30, next day
 *   09:00–17:00 for a fee, by post for a fee). Klook answers automated reads of
 *   /activity/ pages with HTTP 403, so the index is the route the queue doc
 *   prescribes — and it is also why no rental price appears anywhere on this page.
 * - kiyomizudera.or.jp, the temple's own site, for the 6:00–18:00 gate (18:30 in
 *   July and August) and the 21:00 reception close during the spring, summer and
 *   autumn night viewings.
 * - kodaiji.com, the temple's own site, for 9:00–17:30 with reception closing at
 *   17:00, and ¥800 / ¥400 admission with a ¥1,200 Kodai-ji and Entoku-in ticket.
 * - ja.kyoto.travel (Kyoto City's official tourism site) for Yasaka Shrine being
 *   open at all hours and free, and shugakuryoko.kyoto.travel (also Kyoto City)
 *   for Hokan-ji — the Yasaka Pagoda — at 10:00–16:00 with no closed days.
 *
 * 23 Nov 2026 (Rank R07): retitled for "kimono rental kyoto" and turned into a shop
 * price comparison. The shop table is read from each shop's own English site on
 * 23 Nov 2026 — okamoto-kimono-en.com (Set Plan, return methods, shop list),
 * kyotokimonorental.com (wargo Kyoto Station and Gion stores), ewha-yifu.com
 * (Rikawafuku Kyoto basic plan and Kyoto Ekimae store) and en-kyoto.yumeyakata.com
 * (Standard Plan, options, return). Okamoto publishes prices before tax, so they are
 * shown that way rather than converted. Yumeyakata's ¥4,180 campaign price is
 * labelled "until August 31, 2026" on its own page, so the ¥5,280 list price leads.
 *
 * One judgement call: Kiyomizu-dera's regular admission is published at ¥400 in
 * some Kyoto City pages and ¥500 in others, so no Kiyomizu-dera fee is stated
 * here at all — only the gate times, which the temple's own site publishes
 * unambiguously. The route section needs the hours, not the fee.
 */

/** Every figure on this page was read on this date. */
const CHECKED_ISO = "2026-10-23";
const CHECKED = checkedLabel(CHECKED_ISO);

/** The shop price table was read from each shop's official English site on this date. */
const SHOPS_CHECKED_ISO = "2026-11-23";

const shopRows = [
  {
    shop: "Verdict by area",
    basic: "Cheapest base plan: Okamoto ¥2,980 before tax",
    hair: "Included in the base price only at wargo",
    ret: "17:30 at three of the four; Okamoto 17:50",
    nearest: "Kiyomizu & Gion: Okamoto. Kyoto Station: wargo in Kyoto Tower. Arashiyama: Rikawafuku",
    url: "",
    verdict: true,
  },
  {
    shop: "Okamoto",
    basic: "Set Plan ¥2,980 (tax excluded) — kimono, obi, bag, tabi and sandals as a matched set",
    hair: "From ¥500 (tax excluded)",
    ret: "Same day by 17:50, free. Next day by 17:00 for ¥1,000, with a ¥10,000 cash deposit",
    nearest: "Main Shop and Kiyomizu Shop 1 min on foot from Kiyomizu-dera; Gion Shop 1 min from Kodai-ji; also Yasaka Jinja, Fushimi Inari and Arashiyama",
    url: "https://www.okamoto-kimono-en.com/kimono/setPlan.html",
  },
  {
    shop: "wargo",
    basic: "Standard Kimono Plan ¥3,300 paid online (¥4,400 regular), tax included",
    hair: "Included — the plan list says from ¥3,300 including hair styling",
    ret: "17:30 (last dressing 15:30). Next day by 15:00 +¥1,100; convenience-store shipping +¥2,750",
    nearest: "Kyoto Station Store: Kyoto Tower 3F, 2 min from Kyoto Station. Gion Store: 1 min from Keihan Gion-Shijo",
    url: "https://kyotokimonorental.com/en/shop/5",
  },
  {
    shop: "Rikawafuku (Ewha-yifu)",
    basic: "Kyoto Kimono Basic Plan ¥4,500, tax included",
    hair: "Not in the Basic Plan; the Hair Set Plan is ¥6,500",
    ret: "Final return 17:30 whatever the booking time; an extension fee after that",
    nearest: "Kyoto Ekimae store 7 min from JR Kyoto Station (Central Exit); also Gion, Kiyomizu-dera and Arashiyama (3 min from Randen Arashiyama)",
    url: "https://ewha-yifu.com/en/shops/kyoto-area/planlist-kyoto/kyoto-basic-plan/",
  },
  {
    shop: "Yumeyakata (Gojo Shop)",
    basic: "Standard Plan ¥5,280; the page also shows ¥4,180 for 9:00–16:00 bookings, labelled until 31 Aug 2026",
    hair: "From ¥1,650; ornaments not included (from ¥770)",
    ret: "Same day by 17:30, free. Next day by 17:00 for ¥1,100 (¥550 or ¥0 depending on booking time)",
    nearest: "3 min from Gojo Station (Karasuma subway line); about 10 min by taxi from JR Kyoto Station",
    url: "https://www.en-kyoto.yumeyakata.com/kimono-rental-plan/kimono/",
  },
];

const shopSources = [
  { label: "Okamoto return methods", url: "https://www.okamoto-kimono-en.com/returnplan/" },
  { label: "Okamoto shop list", url: "https://www.okamoto-kimono-en.com/storeinfo/" },
  { label: "wargo Gion Store", url: "https://kyotokimonorental.com/en/shop/6" },
  { label: "Rikawafuku Kyoto Ekimae", url: "https://ewha-yifu.com/en/shops/kyoto-area/ekimae/" },
  { label: "Yumeyakata return", url: "https://www.en-kyoto.yumeyakata.com/return/" },
];

const planRows = [
  {
    plan: "Standard women's kimono",
    included: "Kimono, obi, undergarment, tabi socks, zori sandals and a Japanese handbag — the listings describe this as coming empty-handed",
    note: "The base plan at every shop here. The grade of the kimono is what moves the price between plans, not what is in the bag",
  },
  {
    plan: "Yukata (roughly June to September)",
    included: "The same set with an unlined cotton yukata in place of the kimono",
    note: "The sane choice in a Kyoto August. Several shops let a komon booking be swapped for an equivalent yukata on arrival in summer",
  },
  {
    plan: "Men's kimono",
    included: "Kimono with haori jacket, obi, tabi and sandals",
    note: "Stocked as standard, not an afterthought — one Kyoto operator's listing quotes men's sizes from S to 4XL and 200-plus sets with haori",
  },
  {
    plan: "Couple plan",
    included: "One women's and one men's set on a single booking",
    note: "Usually cheaper than two singles and, more usefully, puts both dressing appointments in the same slot",
  },
  {
    plan: "Hair set",
    included: "Styling plus hair ornaments",
    note: "Included free on several Kyoto listings rather than sold as an add-on — the Aiwafuku shops state a hair set by a licensed stylist with unlimited ornaments",
  },
  {
    plan: "Photo shoot / makeup",
    included: "A studio or outdoor shoot with a photographer, and Japanese-style makeup",
    note: "The usual paid extra. The Kyoto Station Aiwafuku listing describes a 30-minute shoot with 15 minutes of makeup",
  },
];

const areaRows = [
  {
    area: "Gion & Kiyomizu (Higashiyama)",
    walkTo: "Hanamikoji, Shirakawa, Yasaka Shrine, Ninenzaka, the Yasaka Pagoda, Kiyomizu-dera",
    why: "The postcard. Preserved wooden streets, stone-paved slopes and five of Kyoto's best-known backdrops within a 25-minute walk of each other",
    watch: "The busiest square kilometre in Kyoto. The slopes are steep and cobbled, which zori sandals do not love",
  },
  {
    area: "Arashiyama",
    walkTo: "Bamboo grove, Togetsukyo bridge, Tenryu-ji, the Sagano railway",
    why: "Green rather than wooden. A shop three minutes from the bamboo grove means the outfit is for one compact area rather than a cross-city day",
    watch: "Twenty to thirty minutes out from the centre on the JR Sagano line or the Randen, so the return trip eats into the rental window",
  },
  {
    area: "Kyoto Station",
    walkTo: "Nothing photogenic on foot — this is a base, not a backdrop",
    why: "You arrive by shinkansen, change, and start the day dressed. Listings here lean on luggage storage and the five-minute walk from the concourse",
    watch: "You still have to get to Higashiyama and back in the outfit, which is a bus or a taxi each way",
  },
];

const routeRows = [
  {
    stop: "1. Kiyomizu-dera",
    hours: "Gate 6:00 – 18:00 (18:30 in July and August)",
    note: "Start here and you beat the slopes. The 6:00 opening is the earliest of any major Kyoto temple, and a 9:00 dressing slot still lands you here before the coaches",
  },
  {
    stop: "2. Sannenzaka and Ninenzaka",
    hours: "Open streets, no gate",
    note: "The stone-paved slopes down from Kiyomizu-dera. Ten minutes of walking, and the reason most people rent a kimono in the first place",
  },
  {
    stop: "3. Yasaka Pagoda (Hokan-ji)",
    hours: "10:00 – 16:00, no closed days",
    note: "The five-storey pagoda at the bottom of Yasaka-dori. The famous shot is from the street and costs nothing; going inside is the part with the hours on it",
  },
  {
    stop: "4. Kodai-ji",
    hours: "9:00 – 17:30, reception closes 17:00",
    note: "Admission ¥800 adult, ¥400 junior and senior high school, or ¥1,200 for the combined Kodai-ji and Entoku-in ticket. Spring, summer and autumn night viewings run later",
  },
  {
    stop: "5. Yasaka Shrine",
    hours: "Open at all hours, free",
    note: "The hinge of the walk: no gate, no fee, no closing time, and five minutes from Keihan Gion-Shijo if you are returning the outfit on the Gion side",
  },
  {
    stop: "6. Hanamikoji and Shirakawa",
    hours: "Open streets, no gate",
    note: "Gion's two best lanes, and a two-minute walk from the Gion Shijo rental shops — which is what makes this route end where it started",
  },
];

const whoFor = [
  {
    title: "Book in Gion or Kiyomizu if…",
    desc: "You want the walk to be the point. Six of Kyoto's best-known backdrops sit within about 25 minutes on foot of each other, and shops in this area put you inside the route rather than commuting to it. One listing here is a minute from the Yasaka Pagoda; another is two minutes from Hanamikoji and Shirakawa and lets you return the outfit at any of its six Kyoto branches.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V10l8-6 8 6v11" />
        <path d="M4 21h16" />
        <path d="M12 4v17" />
      </svg>
    ),
  },
  {
    title: "Book in Arashiyama if…",
    desc: "Your Kyoto day is already an Arashiyama day. The bamboo grove, Togetsukyo and Tenryu-ji are a compact cluster, and a shop three minutes from the grove means you are not spending an hour of a timed rental on the Sagano line. It is the wrong choice if you also want Gion in the same outfit — that is a cross-city round trip with the clock running.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 21V8M9 21V6M13 21V9M17 21V5" />
        <path d="M3 21h18" />
      </svg>
    ),
  },
  {
    title: "Book at Kyoto Station if…",
    desc: "You are arriving and leaving the same day. The station shops exist for the shinkansen itinerary: change on arrival, do Higashiyama, change back, catch the train. The listings here are built around that — five minutes from the concourse at one, a minute from the Hachijo exit with luggage storage at another.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick the area before you pick the shop",
    desc: "This is the decision that shapes the day, and it is not really about the kimono. Gion and Kiyomizu put you inside the walking route; Arashiyama is a self-contained day on the other side of the city; Kyoto Station is a changing room with good transport. Shops within each area differ far less than the areas differ from each other.",
  },
  {
    title: "Book ahead — weeks ahead in the two peak seasons",
    desc: "Kyoto's cherry fortnight (late March into mid-April) and the autumn colour weeks (roughly mid-November into early December) are when the slots, and the best designs, go first. Outside those, a week is usually comfortable and a weekday can be same-day. A dressing appointment is a fixed slot with a stylist, so there is no walking in and waiting.",
  },
  {
    title: "Take the earliest dressing slot you can stand",
    desc: "The return deadline does not move for a late start, so a 09:00 appointment and a 13:00 one buy very different days. Early also means Kiyomizu-dera before the coaches — the gate opens at 6:00, which is hours before anything else in Kyoto.",
  },
  {
    title: "Check the return rule on your own listing, not on a guide",
    desc: "Same-day return is the default and the deadlines are earlier than people expect. The Yumeyakata listing publishes all three routes in full: back to the shop by 17:30 the same day, between 09:00 and 17:00 the next day for an additional fee, or by post for a fee. Other shops differ — the Aiwafuku branches let you return at any of their six Kyoto stores, which is worth more than it sounds if you are dressed in Gion and sleeping near the station.",
  },
  {
    title: "Build the walk back into the route",
    desc: "A rental is a half-day with a hard edge, and the last stop has to be near the shop. That is why the Higashiyama loop below runs Kiyomizu-dera first and Gion last: it ends two minutes from the Gion Shijo shops rather than at the top of a hill, in sandals, at 17:20.",
  },
];

const faqItems = [
  {
    q: "How much is kimono rental in Kyoto?",
    a: "A basic women's kimono plan at the four main Kyoto shops costs between ¥2,980 before tax and ¥5,280, read from each shop's own English site on 23 Nov 2026. Okamoto's Set Plan is ¥2,980 plus tax, wargo's Standard Kimono Plan is ¥3,300 paid online (¥4,400 regular) with hair styling included, Rikawafuku's Kyoto Basic Plan is ¥4,500 without hair, and Yumeyakata's Standard Plan is ¥5,280. A hair set adds ¥500 (before tax) at Okamoto, from ¥1,650 at Yumeyakata, and moves you to the ¥6,500 Hair Set Plan at Rikawafuku.",
  },
  {
    q: "Which kimono rental is near Kyoto Station?",
    a: "wargo's Kyoto Station Store is the closest: it is on the 3rd floor of Kyoto Tower, 2 minutes on foot from the station, open 10:00 to 17:30 with last dressing at 15:30, from ¥3,300 online with hair styling included. Rikawafuku's Kyoto Ekimae store is 7 minutes on foot from the Central Exit, and Yumeyakata's Gojo Shop is 3 minutes from Gojo Station on the Karasuma subway line, about 10 minutes by taxi from the station. Okamoto has no station shop; its nearest to JR is the Fushimi Inari Shop near JR Inari Station.",
  },
  {
    q: "What is included in a Kyoto kimono rental (hair, obi, bag)?",
    a: "The kimono, the obi, a bag, tabi socks and sandals are in every base plan; hair is the part that differs. Okamoto's Set Plan is kimono, obi, bag, tabi and sandals with the undergarments and a towel, plus a scarf in winter; hair styling is from ¥500 before tax. wargo includes hair styling in the ¥3,300 price. Rikawafuku's Basic Plan excludes hair styling, and Yumeyakata charges from ¥1,650 for hair with ornaments sold separately from ¥770. Prices read on 23 Nov 2026.",
  },
  {
    q: "Can I keep the kimono overnight in Kyoto?",
    a: "Yes, at three of the four shops, for a fee. Okamoto charges ¥1,000 for return by 17:00 the next day, with a ¥10,000 cash deposit and ID, or hotel return from ¥1,500 before tax, with the kimono left at your hotel front desk by 9:00. wargo charges ¥1,100 for return by 15:00 the next day, or ¥2,750 to send it back from a convenience store. Yumeyakata charges ¥1,100 for return by 17:00 the next day, cut to ¥550 or free depending on your booking time. Rikawafuku sets a final return of 17:30.",
  },
  {
    q: "Should I rent a kimono or a yukata in Kyoto in winter?",
    a: "A kimono. Yukata are summer wear: Rikawafuku offers yukata and summer kimono in the summer season, and Yumeyakata and wargo list yukata as separate summer plans. In winter, Okamoto's Set Plan adds a scarf, and Yumeyakata's Full Option Plan offers boot rental for +¥3,300 if you would rather not walk in zori. Daylight is the other winter limit: with returns at 17:30, a morning dressing slot leaves the most time outside.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/kyoto-kimono-rental") },
});

const TITLE = "Kimono Rental Kyoto 2026: Prices by Shop, Near Kyoto Station";
const DESC =
  "Kimono rental Kyoto prices by shop: basic plans ¥2,980 (before tax) to ¥5,280 at 4 shops, hair sets, 17:30 returns and the shops nearest Kyoto Station.";

export default function KyotoKimonoRentalPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kyoto-kimono-rental" />
        {hreflangLinks("/guides/attractions/kyoto-kimono-rental")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kyoto-kimono-rental" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/kyoto-kimono-rental",
              headline: TITLE,
              description: DESC,
              updated,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Kyoto Kimono Rental",
                  item: "https://www.japan-travel-kit.com/guides/attractions/kyoto-kimono-rental",
                },
              ],
            }),
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Kyoto Kimono Rental</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kimono Rental Kyoto 2026: <br />Prices by Shop, Near Kyoto Station
          </h1>
          <p className={styles.heroSubtitle}>
            Four Kyoto shops side by side — base price, hair set, return time and the nearest
            station — plus where to rent near Kyoto Station and the Higashiyama loop that ends
            near the shop.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "4 shops, official prices", "Kyoto Station vs Gion vs Arashiyama"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Basic plan</p>
                <p className={styles.verdictStatValue}>¥2,980 + tax to ¥5,280</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Near Kyoto Station</p>
                <p className={styles.verdictStatValue}>wargo, Kyoto Tower, 2 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kiyomizu &amp; Gion</p>
                <p className={styles.verdictStatValue}>Okamoto, 1 min from the temple</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Return by</p>
                <p className={styles.verdictStatValue}>17:30 same day (Okamoto 17:50)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> <strong>kimono rental in Kyoto</strong> costs{" "}
              <strong>¥2,980 before tax to ¥5,280</strong> for a basic plan at Okamoto, wargo,
              Rikawafuku and Yumeyakata. For Kiyomizu and Gion, Okamoto&apos;s main shop is a
              minute from Kiyomizu-dera; near Kyoto Station, wargo in Kyoto Tower is 2 minutes
              away at <strong>¥3,300 online with hair styling included</strong>. Return is{" "}
              <strong>same day by 17:30</strong> at three of the four, with next-day return
              from ¥1,000. Prices from each shop&apos;s own site, read on 23 Nov 2026.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Gion kimono rental on Klook →
              </KlookLink>
              <KlookLink href={kyotoKimonoYumeyakata.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                The listing with next-day return →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Much Is Kimono Rental in Kyoto?</h2>
          <p className={styles.bodyText}>
            Kimono rental in Kyoto costs <strong>¥2,980 before tax to ¥5,280</strong> for a
            basic women&apos;s plan at the four shops compared below, read from each
            shop&apos;s own English site on 23 Nov 2026. For Kiyomizu and Gion, Okamoto&apos;s
            Set Plan is the cheapest at ¥2,980 plus tax, from a shop 1 minute on foot from
            Kiyomizu-dera; near Kyoto Station, wargo&apos;s store in Kyoto Tower is 2 minutes
            away at ¥3,300 paid online, hair styling included. Paying online in advance is the
            cheaper route at wargo — ¥3,300 against the ¥4,400 regular price.
          </p>
          <p className={styles.bodyText}>
            The rest of the price is the hair set and the return. Hair is included at wargo,
            ¥500 before tax at Okamoto, from ¥1,650 at Yumeyakata and a separate ¥6,500 plan at
            Rikawafuku; returns are same day by 17:30 everywhere except Okamoto, which allows
            until 17:50.
          </p>
        </section>

        {/* Shop price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices by shop</span>
          <h2 className={styles.sectionTitle}>Kyoto Kimono Rental Prices by Shop</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The base women&apos;s kimono plan at each shop, as the shop&apos;s own English site
            lists it. The first row is the answer by area:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shop", "Basic plan", "Hair set", "Return", "Nearest / areas"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shopRows.map((row) => (
                    <tr key={row.shop} style={row.verdict ? { background: "var(--accent-light, rgba(0,0,0,0.03))" } : undefined}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>
                        {row.url ? (
                          <a href={row.url} target="_blank" rel="noopener noreferrer">{row.shop}</a>
                        ) : (
                          <strong>{row.shop}</strong>
                        )}
                      </td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.verdict ? <strong>{row.basic}</strong> : row.basic}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.verdict ? <strong>{row.hair}</strong> : row.hair}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.verdict ? <strong>{row.ret}</strong> : row.ret}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.verdict ? <strong>{row.nearest}</strong> : row.nearest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {SHOPS_CHECKED_ISO}. Official sources:{" "}
            {shopRows
              .filter((r) => r.url)
              .map((r) => ({ label: r.shop, url: r.url }))
              .concat(shopSources)
              .map((s, i, all) => (
                <span key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  {i < all.length - 1 ? ", " : "."}
                </span>
              ))}{" "}
            Okamoto lists prices before tax; the other three include tax. Shops may change
            prices by date, so the figure at checkout is the one that applies.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={kyotoKimonoAiwafukuStation.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Kyoto kimono rental on Klook →
            </KlookLink>
            <KlookLink href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Gion shop on Klook →
            </KlookLink>
            <KlookLink href={kyotoKimonoOokiniArashiyama.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Arashiyama shop on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Booking the same day?</strong> A kimono morning leaves the afternoon for a
            guided walk or a tea ceremony, and you will want data for the maps between them:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={kyotoGionHigashiyamaWalkingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Gion &amp; Higashiyama walking tour →
            </KlookLink>
            <KlookLink href={kyotoTeaCeremonyMatchaMaking.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto tea ceremony →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Japan eSIM on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            This page is the Kyoto shop comparison. For Kyoto against Tokyo, Kamakura, Osaka and
            Kanazawa as a kimono city, and how a rental plan works in general, see{" "}
            <Link href="/guides/attractions/kimono-rental-japan">kimono rental in Japan: prices and best cities</Link>;
            for the Tokyo version with Senso-ji shops and return times, compare the{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental">Asakusa kimono rental guide</Link>.
          </p>
        </section>

        {/* Kyoto Station */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kyoto Station</span>
          <h2 className={styles.sectionTitle}>Which Kimono Rental Is Near Kyoto Station?</h2>
          <p className={styles.bodyText}>
            <strong>wargo&apos;s Kyoto Station Store is the closest</strong>: on the 3rd floor of
            Kyoto Tower, 2 minutes on foot from the station via the Karasuma (north) side, open
            10:00 to 17:30 with last dressing at 15:30, from ¥3,300 online with hair styling
            included. <strong>Rikawafuku Kyoto Ekimae</strong> is 7 minutes on foot from the
            Central Exit at ¥4,500 for the Basic Plan, and <strong>Yumeyakata&apos;s Gojo
            Shop</strong> is 3 minutes from Gojo Station on the Karasuma subway line, about 10
            minutes by taxi from the station.
          </p>
          <p className={styles.bodyText}>
            A station shop suits a day that starts and ends on a train, but Higashiyama is
            still a bus or taxi ride away in the outfit. If the walk is the point, dress in
            Kiyomizu or Gion instead; Okamoto has no station shop, and its nearest to JR is the
            Fushimi Inari Shop by JR Inari Station. Last checked: {SHOPS_CHECKED_ISO}, from{" "}
            <a href="https://kyotokimonorental.com/en/shop/5" target="_blank" rel="noopener noreferrer">kyotokimonorental.com</a>,{" "}
            <a href="https://ewha-yifu.com/en/shops/kyoto-area/ekimae/" target="_blank" rel="noopener noreferrer">ewha-yifu.com</a>{" "}
            and{" "}
            <a href="https://www.en-kyoto.yumeyakata.com/" target="_blank" rel="noopener noreferrer">en-kyoto.yumeyakata.com</a>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={kyotoKimonoAiwafukuStation.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto Station kimono rental on Klook →
            </KlookLink>
            <KlookLink href={kyotoKimonoMimosaStation.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Station shop with luggage storage →
            </KlookLink>
          </div>
        </section>

        {/* Area comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Where Should You Rent a Kimono in Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Three areas, and they are not substitutes. The column that decides it for most
            people is the second one — what you can reach on foot while you are dressed:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "What you can walk to", "Why book here", "What to watch"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.walkTo}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.watch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Shop locations and walking times are as the individual listings state them, read on{" "}
            {CHECKED}. For prices, see the shop table above, read from each shop&apos;s own
            site; Klook listings change prices by date, so open a listing for the figure on
            your date.
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={kyotoKimonoAiwafukuKiyomizu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kiyomizu / Yasaka Pagoda shop →
            </KlookLink>
            <KlookLink href={kyotoKimonoOokiniArashiyama.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Arashiyama shop →
            </KlookLink>
            <KlookLink href={kyotoKimonoAiwafukuStation.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto Station shop →
            </KlookLink>
          </div>
        </section>

        {/* Plans */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Plans</span>
          <h2 className={styles.sectionTitle}>What Is Included (Hair, Obi, Bag)?</h2>
          <p className={styles.bodyText}>
            <strong>The kimono, obi, bag, tabi socks and sandals are in every base plan; hair
            is the part that differs.</strong> Okamoto&apos;s ¥2,980 Set Plan is a
            kimono, obi, bag, tabi and sandals as a matched set, with the undergarments and a
            towel, and a scarf in winter. wargo includes hair styling in its ¥3,300 price;
            Rikawafuku&apos;s Basic Plan does not, and Yumeyakata charges from ¥1,650 for hair
            with ornaments sold from ¥770. Read on the shops&apos; own sites on 23 Nov 2026.
          </p>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Beyond that, the price moves on the grade of the kimono and the extras rather than
            on what is in the bag:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "What it comes with", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.plan}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.included}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Inclusions as each listing describes them, read on {CHECKED}. Plans vary by shop, so
            read the one you are booking — the two things worth confirming are whether the hair
            set is included and what the return options are.
          </p>
        </section>

        {/* Return times */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The deadline</span>
          <h2 className={styles.sectionTitle}>Can I Keep the Kimono Overnight?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, at three of the four shops, for a fee of about ¥1,000.</strong>{" "}
            Okamoto charges ¥1,000 for return by 17:00 the next day (ID and a ¥10,000 cash
            deposit), or hotel return from ¥1,500 before tax with the kimono left at a Kyoto
            City hotel&apos;s front desk by 9:00. wargo charges ¥1,100 for return by 15:00 the
            next day, or ¥2,750 to send it back from a convenience store. Yumeyakata charges
            ¥1,100 for return by 17:00 the next day — ¥550 for a 9:00–11:59 booking and free
            for a 12:00–16:00 booking. Rikawafuku sets a final return of 17:30. Last checked:{" "}
            {SHOPS_CHECKED_ISO}, from{" "}
            <a href="https://www.okamoto-kimono-en.com/returnplan/" target="_blank" rel="noopener noreferrer">okamoto-kimono-en.com</a>,{" "}
            <a href="https://kyotokimonorental.com/en/shop/5" target="_blank" rel="noopener noreferrer">kyotokimonorental.com</a>{" "}
            and{" "}
            <a href="https://www.en-kyoto.yumeyakata.com/return/" target="_blank" rel="noopener noreferrer">en-kyoto.yumeyakata.com</a>.
          </p>
          <p className={styles.bodyText}>
            <strong>Same day, and typically by 17:30.</strong> The Yumeyakata listing is the one
            that spells out all three routes rather than burying them: back to the shop{" "}
            <strong>by 17:30 on the day</strong>, between{" "}
            <strong>09:00 and 17:00 the following day for an additional fee</strong>, or{" "}
            <strong>returned by post for a fee</strong>. Other Kyoto shops set their own
            deadlines, so read your own listing — but the shape is the same everywhere.
          </p>
          <p className={styles.bodyText}>
            Three consequences, in the order they will bite. First,{" "}
            <strong>the deadline does not move for a late start</strong>, so a 09:00 dressing
            slot and a 13:00 one buy very different days — take the earliest you can stand.
            Second, <strong>the last stop has to be near the shop</strong>, which is the entire
            reason the walking route below runs Kiyomizu-dera first and Gion last. Third, if you
            want Gion after dark — and the lanes genuinely are better once the day trippers have
            gone — then the <strong>paid next-day return</strong> is the thing to buy, not a
            later dressing slot.
          </p>
          <p className={styles.bodyText}>
            One shop-level detail worth having: the Aiwafuku branches let you{" "}
            <strong>return at any of their six Kyoto stores</strong>, which converts the walk
            back from a constraint into a choice — dress in Gion, finish near the station, hand
            it in there. Return terms read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={kyotoKimonoYumeyakata.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yumeyakata — next-day and postal return →
            </KlookLink>
            <KlookLink href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Aiwafuku Gion — return at any branch →
            </KlookLink>
          </div>
        </section>

        {/* Walking route */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The route</span>
          <h2 className={styles.sectionTitle}>Where Should You Walk in a Kimono in Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Higashiyama loop, run downhill and ending in Gion — about 25 minutes of walking
            end to end if you do not stop, which of course you will. Hours are from each
            temple&apos;s own site and Kyoto City&apos;s official tourism pages, read on{" "}
            {CHECKED}:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Hours", "Why it is in this order"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.stop}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two notes on the order. <strong>Kiyomizu-dera opens at 6:00</strong>, hours before
            anything else in Kyoto, so an early dressing slot genuinely buys you the slopes
            without the crowds — this is the one Kyoto attraction where being early is not a
            platitude. And <strong>Yasaka Shrine is open at all hours and free</strong>, which
            makes it the flexible stop: if you are running against the return deadline, it is
            the one you can do on the way back rather than on the way through. Our{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">things to do in Kyoto guide</Link>{" "}
            sets out how the rest of a Kyoto day fits around Higashiyama, and{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto</Link>{" "}
            covers the buses, which are how you reach the bottom of these slopes.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Kiyomizu-dera gate times from kiyomizudera.or.jp; Kodai-ji hours and admission from
            kodaiji.com; Yasaka Shrine and Hokan-ji from Kyoto City&apos;s official tourism
            pages. All read on {CHECKED} and subject to change — special night viewings run on
            their own timetables. Kiyomizu-dera&apos;s regular admission is published
            inconsistently across official pages, so no figure for it is quoted here.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Kyoto Kimono Rental</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={kyotoKimonoMisakiGion.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Gion shop with a photo shoot →
            </KlookLink>
            <KlookLink href={kyotoKimonoMimosaStation.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Station shop with luggage storage →
            </KlookLink>
          </div>
        </section>

        {/* Crowds and seasons */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Seasons &amp; crowds</span>
          <h2 className={styles.sectionTitle}>Kimono vs Yukata in Winter?</h2>
          <p className={styles.bodyText}>
            <strong>Rent a kimono in winter; yukata are summer wear.</strong> Rikawafuku offers
            yukata and summer kimono in the summer season, and wargo and Yumeyakata sell yukata
            as separate summer plans. For the cold, Okamoto&apos;s Set Plan adds a scarf in
            autumn and winter, and Yumeyakata&apos;s Full Option Plan offers boot rental for
            +¥3,300 instead of zori. With returns at 17:30, a morning slot leaves the most
            daylight. Last checked: {SHOPS_CHECKED_ISO}, on each shop&apos;s own site.
          </p>
          <h3 className={styles.stepTitle} style={{ marginTop: "1.25rem" }}>When does Kyoto kimono rental sell out?</h3>
          <p className={styles.bodyText}>
            Twice a year, hard. The <strong>cherry fortnight</strong> — late March into mid-April
            — and the <strong>autumn colour weeks</strong>, roughly mid-November into early
            December, are when the slots and the better designs go first, and when the
            Higashiyama slopes are at their most crowded anyway. Those are the periods to book
            weeks out rather than days. Outside them, a week ahead is comfortable, and a quiet
            weekday can be same-day.
          </p>
          <p className={styles.bodyText}>
            Summer is its own case. From about June to September the heat and humidity make a
            full kimono genuinely uncomfortable, and the shops know it: the{" "}
            <strong>yukata</strong> is lighter, unlined and cooler, and several Kyoto listings
            let a summer booking be swapped for an equivalent yukata when you arrive. It is also
            the right look for a festival evening. Winter is the quiet season and the shops
            layer under the kimono for it, but the stone slopes are cold and the daylight is
            short against a 17:30 deadline.
          </p>
          <p className={styles.bodyText}>
            A kimono day also pairs naturally with the other two things Kyoto asks you to book
            rather than turn up to. A{" "}
            <Link href="/guides/attractions/tea-ceremony-japan">tea ceremony</Link> is the
            obvious one — a seated, indoor hour in the middle of a walking day — and a{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">two-week Japan itinerary</Link>{" "}
            shows where a Kyoto day of this shape usually lands in a longer trip.
          </p>
        </section>

        <EsimCtaBottom />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Want to see a maiko after a day in kimono? The{" "}
            <Link href="/guides/attractions/kyoto-maiko-dinner" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Kyoto maiko dinner
            </Link>{" "}
            guide covers the price, how to book and what to expect, including the one-hour Gion Corner show.
          </p>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="Kyoto Shops, by Area"
          intro="The same decision as the table above, as four bookings. The first two are Higashiyama — inside the walking route; the third is Arashiyama; the fourth is the station, for a day that starts and ends on a shinkansen. Klook prices change by date, so open a listing for the current figure, the return deadline and what the plan includes."
          tours={[kyotoKimonoAiwafukuGion, kyotoKimonoAiwafukuKiyomizu, kyotoKimonoOokiniArashiyama, kyotoKimonoAiwafukuStation]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 6 Nov 2026: the grove, the walk and who needs a guide. */}
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Arashiyama Bamboo Forest Tour (2026): Best Time, Tours and Routes From Kyoto</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 5 Nov 2026: the shrine as a guided walk, with the hike time and trains. */}
            <Link href="/guides/attractions/fushimi-inari-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M6 11h12M8 7v14M16 7v14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fushimi Inari Tour 2026: Hike Time, Hours &amp; Best Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 4 Nov 2026: the Gion evening as a booked tour. */}
            <Link href="/guides/attractions/gion-night-walking-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Gion Night Walking Tour 2026: Times, Types &amp; Photo Rules</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-kyoto-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Kyoto Tickets: Prices, Hours &amp; Booking</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sagano-romantic-train-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sagano Romantic Train Tickets 2026: When to Book &amp; Seats</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4 4 4-3 3v11H7V10L4 7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan 2026: Prices, Where to Rent &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V10l8-6 8 6v11" />
                  <path d="M4 21h16" />
                  <path d="M12 4v17" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                  <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
                  <path d="M3 21h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tea Ceremony in Tokyo: Best Experiences, Prices &amp; Kyoto Options</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the area, then the morning</h2>
            <p className={styles.ctaBannerDesc}>
              Gion and Kiyomizu for the walk, Arashiyama for a bamboo day, the station for a
              train day — then take the earliest dressing slot, because the return deadline will
              not move for you. In the cherry fortnight and the autumn weeks, book weeks out.
              Check the return rule and the cancellation window on your own listing before you
              pay; both are set per shop.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Gion kimono rental on Klook →
              </KlookLink>
              <KlookLink href={kyotoHighlightBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                Kyoto highlights bus tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
