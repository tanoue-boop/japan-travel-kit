import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
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
} from "../../../lib/klook-links";

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
 * One judgement call: Kiyomizu-dera's regular admission is published at ¥400 in
 * some Kyoto City pages and ¥500 in others, so no Kiyomizu-dera fee is stated
 * here at all — only the gate times, which the temple's own site publishes
 * unambiguously. The route section needs the hours, not the fee.
 */

/** Every figure on this page was read on this date. */
const CHECKED_ISO = "2026-10-23";
const CHECKED = checkedLabel(CHECKED_ISO);

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
    q: "How much is Kyoto kimono rental?",
    a: "We do not quote a figure, and that is deliberate: rental pricing moves by plan, by grade of kimono and by season, and the booking platforms block automated price reads, so there is no number we could have verified for your date. What we can tell you is what changes it. The grade of the kimono is the main lever; a hair set is included free on several Kyoto listings rather than charged; a photo shoot and Japanese-style makeup are the usual paid extras; summer yukata plans are generally the cheaper end; and couple plans normally beat two separate bookings. Open a shop's listing for the current figure on your date.",
  },
  {
    q: "What is included in a Kyoto kimono rental?",
    a: `More than the garment, which is why a rental is not simply the price of a robe. The standard plan at the shops here is the kimono, the obi, the undergarment, tabi socks, zori sandals and a Japanese handbag — the listings describe it as coming empty-handed — plus professional dressing by trained staff. Several Kyoto shops include the hair set free, with hair ornaments, rather than selling it as an add-on. Men's sets with a haori jacket and children's sizes are stocked as standard. Photo shoots, makeup and premium or antique kimono are the usual extras. Inclusions as the listings state them, read on ${CHECKED}.`,
  },
  {
    q: "What time do you have to return a kimono in Kyoto?",
    a: `Same-day, and earlier than most people plan for — this is the single detail worth checking before you book anything else in the day. The Yumeyakata listing is the one that publishes all three routes in full: back to the shop by 17:30 on the day, between 09:00 and 17:00 the following day for an additional fee, or returned by post for a fee. Deadlines differ by shop, so read your own listing. The practical consequence is the same everywhere: treat a rental as a half-day with a hard edge, take the earliest dressing slot you can, and finish the walk near the shop rather than across the city. Return terms read on ${CHECKED}.`,
  },
  {
    q: "Which area of Kyoto is best for kimono rental — Gion, Arashiyama or Kyoto Station?",
    a: "Gion and Kiyomizu, for most people, because the shops sit inside the walking route rather than at one end of a train ride: Yasaka Shrine, the Yasaka Pagoda, Ninenzaka, Kiyomizu-dera, Hanamikoji and Shirakawa are all within about 25 minutes on foot of each other. Pick Arashiyama if your day is already an Arashiyama day — a shop three minutes from the bamboo grove beats a cross-city trip in sandals. Pick Kyoto Station if you are arriving and leaving the same day and need luggage storage more than you need a backdrop; the station shops are built around exactly that itinerary.",
  },
  {
    q: "Do you need to book Kyoto kimono rental in advance?",
    a: "Yes, and in two periods of the year it is not optional. The cherry fortnight from late March into mid-April and the autumn colour weeks from about mid-November into early December are when slots and the best designs sell out, sometimes well ahead. Outside those, a week is usually comfortable and a quiet weekday can be same-day — but a dressing appointment is a fixed slot with a stylist, so turning up and waiting is not a plan. Booking online also fixes what is included and gives you an English checkout, which is the other reason to do it before you fly.",
  },
  {
    q: "What is a good kimono walking route in Kyoto?",
    a: `The Higashiyama loop, run in this order so it ends near the shop rather than at the top of a hill. Kiyomizu-dera first — the gate opens at 6:00 and closes at 18:00, or 18:30 in July and August, so an early dressing slot gets you there before the crowds. Then down Sannenzaka and Ninenzaka, the stone-paved slopes, which are open streets with no gate. Then the Yasaka Pagoda, which is 10:00 to 16:00 with no closed days if you want to go in, and free from the street if you only want the photograph. Then Kodai-ji at 9:00 to 17:30 with reception closing at 17:00 and admission at ¥800 for an adult. Then Yasaka Shrine, which is open at all hours and free. Then Hanamikoji and Shirakawa in Gion, which puts you two minutes from the Gion Shijo shops at return time. Hours read from each temple's own site and Kyoto City's official tourism pages on ${CHECKED}.`,
  },
  {
    q: "Can men and couples rent kimono in Kyoto?",
    a: "Yes, and the Kyoto shops treat it as standard rather than as a favour. Men's sets come with a haori jacket, obi, tabi and sandals, and one operator's listing quotes men's sizes from S to 4XL across 200-plus sets. Couple plans put both bookings in the same dressing slot, which matters more than the small discount — two separate bookings at a busy shop can land an hour apart. Children's sizes are widely stocked too, so a family can dress together on one reservation.",
  },
  {
    q: "What happens if it rains on your kimono day?",
    a: "The outfit copes better than the route does. Zori sandals and tabi socks on wet stone slopes are the real problem — Sannenzaka and Ninenzaka are steep and cobbled — so the rain plan is to shorten the walk, not to cancel it. Shops routinely offer umbrellas, and several Kyoto listings mention cover for stains and mud splashes as part of the plan, which takes the worry out of a puddle. If the forecast is bad, Gion is the better area to be in than Arashiyama: the backdrops are closer together and a covered arcade or a tea house is never far.",
  },
  {
    q: "Should you rent a kimono in Kyoto or in Asakusa?",
    a: "Kyoto if the photographs are the point; Asakusa if the convenience is. Kyoto gives you preserved wooden streets, stone slopes and temple gates — a backdrop that was not built for this but happens to suit it perfectly — at the cost of needing a Kyoto day. Asakusa gives you Senso-ji, Nakamise and shops within a few minutes of the station, as a half-day you can slot into a Tokyo itinerary without rearranging anything. If you are doing both cities and only one kimono day, do it in Kyoto.",
  },
  {
    q: "What should you wear underneath, and how long does dressing take?",
    a: "Dressing takes roughly 20 to 30 minutes with a professional, plus the browsing time before it, so allow about an hour at the shop before you are out of the door — longer if a hair set is included. Underneath, something thin and close-fitting: the undergarment is provided, and bulky layers change the line of the kimono. Bring socks you do not mind swapping for tabi, and leave the day pack at the shop, since storage for your own clothes and bags is standard at these listings.",
  },
  {
    q: "Can you keep the kimono overnight or return it the next day?",
    a: `At some shops, for a fee, and it is worth asking before you assume a full day. The Yumeyakata listing publishes next-day return between 09:00 and 17:00 as a paid option, alongside return by post, also paid. That turns a half-day into an evening — which is the version worth paying for if you want Gion after dark, when the lanes empty out and the lanterns are lit. Not every shop offers it, so confirm on your own listing rather than on this page. Read on ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/kyoto-kimono-rental") },
});

const TITLE = "Kyoto Kimono Rental (2026): Which Area, What's Included, When to Return";
const DESC =
  "Kyoto kimono rental compared by area — Gion and Kiyomizu, Arashiyama, Kyoto Station — with what each plan includes, the same-day return deadline that shapes the whole day, and a Higashiyama walking route with the temple hours checked against each temple's own site.";

export default function KyotoKimonoRentalPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Kyoto Kimono Rental</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kyoto Kimono Rental (2026):<br />Which Area, What&apos;s Included, When to Return
          </h1>
          <p className={styles.heroSubtitle}>
            Three areas, one hard deadline. Where to book so the walk works, what a plan
            actually comes with, and the Higashiyama loop that ends two minutes from the shop.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Gion vs Arashiyama vs the station", "Temple hours, checked"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best area</p>
                <p className={styles.verdictStatValue}>Gion &amp; Kiyomizu</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Return by</p>
                <p className={styles.verdictStatValue}>17:30 same day, typically</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Dressing takes</p>
                <p className={styles.verdictStatValue}>20–30 min, ~1 hr at the shop</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book ahead</p>
                <p className={styles.verdictStatValue}>Weeks, in sakura &amp; autumn</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> for <strong>Kyoto kimono rental</strong>, book in{" "}
              <strong>Gion or Kiyomizu</strong> unless your day is already an Arashiyama day or
              you are changing at Kyoto Station between trains — the Higashiyama shops put you
              inside a walking route where Yasaka Shrine, the Yasaka Pagoda, Ninenzaka,
              Kiyomizu-dera and Hanamikoji all sit within about{" "}
              <strong>25 minutes on foot</strong> of each other. A standard plan includes the
              kimono, obi, undergarment, tabi, sandals and a bag, with{" "}
              <strong>a hair set free on several Kyoto listings</strong> and photo shoots as the
              paid extra. The detail that shapes the whole day is the deadline:{" "}
              <strong>same-day return, typically by 17:30</strong>, with next-day return
              09:00–17:00 or return by post available for a fee at some shops. Book{" "}
              <strong>weeks ahead for the cherry fortnight and the autumn colour weeks</strong>.
              All read on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Gion kimono rental on Klook →
              </a>
              <a href={kyotoKimonoYumeyakata.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                The listing with next-day return →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Decision Are You Actually Making?</h2>
          <p className={styles.bodyText}>
            Not which shop. Kyoto has hundreds of rental shops and, within any one
            neighbourhood, they offer close to the same thing: a few hundred to a few thousand
            kimono, a dresser, a hair set, and a deadline. What genuinely differs is{" "}
            <strong>which part of Kyoto you are standing in when you are dressed</strong>, and
            that is a decision about your day rather than about your outfit.
          </p>
          <p className={styles.bodyText}>
            The second real decision is the <strong>return time</strong>, because it is the
            thing that turns a rental from a costume into a schedule. Same-day return is the
            norm and the deadline is earlier than people expect, so the last stop of your walk
            has to be near the shop you started at. Get the area and the deadline right and the
            rest is choosing a colour.
          </p>
          <p className={styles.bodyText}>
            This page is the Kyoto-specific version. If you have not yet decided{" "}
            <em>whether</em> to do this or <em>which city</em>, our{" "}
            <Link href="/guides/attractions/kimono-rental-japan">kimono rental in Japan guide</Link>{" "}
            compares Kyoto against Tokyo and explains how a plan works; if you have settled on
            Tokyo, our{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental">Asakusa kimono rental guide</Link>{" "}
            does this job for Senso-ji and Nakamise.
          </p>
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
            {CHECKED}. No rental price is quoted on this page: pricing moves by plan, grade and
            season, and the booking platforms block automated price reads, so there is no figure
            we could verify for your date.
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
            <a href={kyotoKimonoAiwafukuKiyomizu.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kiyomizu / Yasaka Pagoda shop →
            </a>
            <a href={kyotoKimonoOokiniArashiyama.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Arashiyama shop →
            </a>
            <a href={kyotoKimonoAiwafukuStation.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto Station shop →
            </a>
          </div>
        </section>

        {/* Plans */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Plans</span>
          <h2 className={styles.sectionTitle}>What Plans Are There, and What Is Included?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The base plan is more complete than people expect — the listings describe arriving
            empty-handed — and the price moves on the grade of the kimono and the extras rather
            than on what is in the bag:
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
          <h2 className={styles.sectionTitle}>What Time Do You Have to Return the Kimono?</h2>
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
            <a href={kyotoKimonoYumeyakata.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Yumeyakata — next-day and postal return →
            </a>
            <a href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Aiwafuku Gion — return at any branch →
            </a>
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
            <a href={kyotoKimonoMisakiGion.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Gion shop with a photo shoot →
            </a>
            <a href={kyotoKimonoMimosaStation.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Station shop with luggage storage →
            </a>
          </div>
        </section>

        {/* Crowds and seasons */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Seasons &amp; crowds</span>
          <h2 className={styles.sectionTitle}>When Does Kyoto Kimono Rental Sell Out?</h2>
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
          intro="The same decision as the table above, as four bookings. The first two are Higashiyama — inside the walking route; the third is Arashiyama; the fourth is the station, for a day that starts and ends on a shinkansen. Klook blocks automated price reads, so open a listing for the current figure, the return deadline and what the plan includes."
          tours={[kyotoKimonoAiwafukuGion, kyotoKimonoAiwafukuKiyomizu, kyotoKimonoOokiniArashiyama, kyotoKimonoAiwafukuStation]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4 4 4-3 3v11H7V10L4 7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan (2026): Kyoto vs Asakusa and How Booking Works</p>
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
                <p className={styles.relatedTitle}>Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto and What to Expect</p>
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
              <a href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Gion kimono rental on Klook →
              </a>
              <a href={kyotoHighlightBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Kyoto highlights bus tour →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
