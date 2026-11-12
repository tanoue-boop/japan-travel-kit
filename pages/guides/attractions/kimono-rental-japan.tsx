import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  asakusaKimonoAiwafukuNo2,
  asakusaKimonoTeaCeremony,
  asakusaKimonoYae,
  kyotoGionKimonoTeaCeremony,
  kyotoHighlightBusTour,
  kyotoKimonoAiwafukuGion,
  kyotoKimonoOokiniArashiyama,
  tokyoSightseeingBusTour,
} from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygKyotoKimono, gygTokyoKimono } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA links — Klook affiliate redirects (tracking links, both listings confirmed live
// 19 Oct 2026).
const KIMONO_ASAKUSA_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304896&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F100721-kimono-rental-experience-asakusa-kimono-mitsuki-tokyo%2F";
const KIMONO_KYOTO_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304900&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F1079-one-day-kimono-rental-kyoto%2F";

/**
 * 12 Nov 2026 (task-jtk-20261112-R06). This page is the Japan-wide comparison hub for
 * "kimono rental japan"; asakusa-kimono-rental and kyoto-kimono-rental keep the city terms.
 * Read on the shops' own websites on 12 November 2026:
 *   ewha-yifu.com (Rikawafuku, Asakusa)   Basic Plan ¥4,500 tax incl.; no hair service; 45–70
 *                                         minutes reception to departure; final return 17:30;
 *                                         last dressing reception 16:00; online booking up to 10
 *                                         minutes before; free online cancellation to the day
 *                                         before, 100% fee on the day; Kyoto peak seasons
 *                                         (cherry blossom, autumn foliage, New Year): reserve
 *   aiwafuku.com/en                       women's one-day plan ¥4,300 Asakusa / ¥5,500 Kyoto
 *                                         with easy hair set; next-day return before 15:00 for
 *                                         ¥2,200 Asakusa / ¥1,100 Kyoto; peak-season prices vary
 *   waraku-kimono.jp (Kyoto)              All-Inclusive Plan with Hair Styling ¥3,980 + tax from
 *                                         1 Oct; dressing about 15 minutes, 45–60 minutes in
 *                                         the shop; return by 17:30, last appointment 16:00;
 *                                         bookings open 20 days to 1 month ahead; no fee if
 *                                         cancelled by the day before; Gion, Kiyomizu,
 *                                         Arashiyama, Kyoto Station stores
 *   kyokomachi-kimono.com (Kyoto)         Kyokomachi Plan ¥5,500 (¥4,400 online), Set Plan ¥3,300,
 *                                         Silk Homongi ¥17,600 (¥16,500 online), Luxurious Silk
 *                                         Furisode ¥55,000 (¥33,000 online); hair set +¥1,100
 * Aiwafuku's Asakusa 16:30 / 17:30 return split was read on aiwafuku.com on 21 Oct 2026 for
 * the Asakusa guide. No Klook price is quoted anywhere on this page.
 */
const TODAY_ISO = "2026-11-12";
const CHECKED = checkedLabel(TODAY_ISO);

const TITLE = "Kimono Rental in Japan 2026: Prices, Where & How to Book";
const H1 = "Kimono Rental in Japan 2026: Prices, Where to Rent & How to Book";
const DESC =
  "Kimono rental in Japan costs ¥3,300–¥5,500 at official Tokyo and Kyoto shops. Allow 45–70 minutes to dress and return by 17:30. Compare areas and book.";

const SRC = {
  rikawafuku: { label: "Rikawafuku Asakusa basic plan", href: "https://ewha-yifu.com/en/shops/asakusa/kimono-planlist/basic-plan" },
  rikawafukuFaq: { label: "Rikawafuku FAQ", href: "https://ewha-yifu.com/en/faq" },
  aiwafuku: { label: "Aiwafuku plans", href: "https://www.aiwafuku.com/en/" },
  waraku: { label: "Waraku Kyoto all-inclusive plan", href: "https://waraku-kimono.jp/en/?p=5899" },
  warakuFaq: { label: "Waraku FAQ", href: "https://waraku-kimono.jp/en/faq/" },
  kyokomachi: { label: "Kyokomachi plans", href: "https://www.kyokomachi-kimono.com/e/plan/" },
};

function LastChecked({ sources }: { sources: { label: string; href: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {TODAY_ISO}. Official source{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? "; " : ""}
          <a href={s.href} target="_blank" rel="noopener" style={{ color: "var(--text)", fontWeight: 600 }}>
            {s.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const priceRows = [
  { shop: "Rikawafuku, Asakusa (Tokyo)", plan: "Basic Plan (kimono, obi, sandals, bag, dressing, bag storage; no hair)", price: "¥4,500" },
  { shop: "Aiwafuku, Asakusa (Tokyo)", plan: "Women's one-day plan with easy hair set", price: "¥4,300" },
  { shop: "Aiwafuku, Kyoto", plan: "Women's one-day plan with easy hair set", price: "¥5,500" },
  { shop: "Waraku, Kyoto (Gion, Kiyomizu, Arashiyama, Kyoto Station)", plan: "All-Inclusive Plan with Hair Styling", price: "¥3,980 + tax" },
  { shop: "Kyokomachi, Kyoto", plan: "Set Plan / Kyokomachi Plan (booked online; hair set +¥1,100)", price: "¥3,300 / ¥4,400" },
  { shop: "Kyokomachi, Kyoto", plan: "Silk Homongi / Luxurious Silk Furisode (booked online)", price: "¥16,500 / ¥33,000" },
];

const cityRows = [
  {
    city: "Tokyo — Asakusa",
    backdrops: "Kaminarimon, Nakamise-dori, Senso-ji, Skytree views",
    prices: "¥4,300–¥4,500 standard plan",
    returnBy: "17:30 (Aiwafuku: 16:30 if you arrive by 12:00)",
    best: "An easy half-day inside a Tokyo trip",
    guide: { href: "/guides/attractions/asakusa-kimono-rental", label: "Asakusa kimono rental guide" },
  },
  {
    city: "Kyoto — Gion & Kiyomizu",
    backdrops: "Hanamikoji, Yasaka Pagoda, Ninenzaka, Kiyomizu-dera",
    prices: "¥3,300–¥5,500 standard plan",
    returnBy: "17:30; next-day return for a fee at Aiwafuku",
    best: "The classic old-town photographs",
    guide: { href: "/guides/attractions/kyoto-kimono-rental", label: "Kyoto kimono rental guide" },
  },
  {
    city: "Kyoto — Arashiyama",
    backdrops: "Bamboo grove, Togetsukyo bridge",
    prices: "Waraku Arashiyama: same Kyoto price list",
    returnBy: "17:30",
    best: "A self-contained day on the west side of Kyoto",
    guide: { href: "/guides/attractions/kyoto-kimono-rental", label: "Kyoto areas compared" },
  },
];

const bookingRows = [
  { when: "Any off-peak weekday", advice: "A few days ahead is enough; same-day online booking is possible at Rikawafuku up to 10 minutes before the slot" },
  { when: "Weekends and Japanese holidays", advice: "Book once your day is fixed, especially if you want a morning start and the longest time in the kimono" },
  { when: "Cherry blossom, autumn leaves, New Year (Kyoto)", advice: "Reserve as soon as you can; Rikawafuku recommends reserving for these seasons, and Waraku opens bookings 20 days to 1 month ahead" },
  { when: "Children's plans", advice: "Book early — Kyokomachi marks its kids' plan as limited availability" },
];

const steps = [
  {
    title: "Book online and pick your area",
    desc: "Reserve a shop in Asakusa or one of Kyoto's areas, and choose a morning slot if you want the full day. Online booking locks in your time and, at several shops, a lower price than at the counter.",
  },
  {
    title: "Arrive and choose your kimono",
    desc: "At the shop you browse hundreds of patterns and colours, then pick an obi (sash) and accessories to match. Many shops have multilingual staff to help you coordinate a look.",
  },
  {
    title: "Get dressed — and add a hair-set",
    desc: `A professional dresser (kitsuke) puts the kimono on for you. Waraku puts the dressing itself at about 15 minutes, but the whole visit from check-in to walking out is 45 to 60 minutes there and 45 to 70 minutes at Rikawafuku in Asakusa, as listed on ${CHECKED}.`,
  },
  {
    title: "Explore — then get back before the cut-off",
    desc: `Same-day return is standard and the deadline is earlier than people assume: 17:30 at Rikawafuku and Waraku, and 16:30 at Aiwafuku in Asakusa if you arrived by 12:00. Next-day return is an add-on at some shops — Aiwafuku charges ¥2,200 in Asakusa and ¥1,100 in Kyoto for a return before 15:00 the next day (${CHECKED}).`,
  },
];

const faqItems = [
  {
    q: "How much does kimono rental cost in Japan?",
    a: `A standard one-day plan costs ¥3,300 to ¥5,500 at the official shops checked in Tokyo and Kyoto on ${CHECKED}: Rikawafuku's Asakusa basic plan is ¥4,500, Aiwafuku's women's plan with an easy hair set is ¥4,300 in Asakusa and ¥5,500 in Kyoto, Waraku's Kyoto all-inclusive plan with hair styling is ¥3,980 plus tax, and Kyokomachi's Kyoto plans start at ¥3,300. Silk visiting kimono and furisode plans cost more — ¥16,500 and ¥33,000 online at Kyokomachi. Aiwafuku notes that peak-season prices may vary.`,
  },
  {
    q: "How far ahead should I book a kimono rental?",
    a: "A few days ahead is enough on most dates, and Rikawafuku in Asakusa takes online bookings up to 10 minutes before the slot. For Kyoto's cherry-blossom, autumn-foliage and New Year seasons, book as soon as your dates are fixed: Rikawafuku recommends reserving for those seasons, and Waraku opens bookings 20 days to 1 month ahead. Both shops let you cancel free of charge up to the day before.",
  },
  {
    q: "Is Kyoto or Tokyo better for kimono rental?",
    a: "Kyoto if the photographs are the point of the trip, Tokyo's Asakusa if the rental is a half-day inside a Tokyo itinerary. Kyoto's Gion, Kiyomizu and Arashiyama streets are the classic setting and more shops offer next-day return there; Asakusa puts the shops minutes from Kaminarimon and Senso-ji. Standard plan prices overlap — ¥4,300 to ¥4,500 in Asakusa and ¥3,300 to ¥5,500 in Kyoto at the shops checked.",
  },
  {
    q: "What is included in a kimono rental plan?",
    a: `The kimono, undergarments, obi, sandals, tabi socks, a small bag and professional dressing are standard. Rikawafuku's Asakusa basic plan also stores your bags but has no hair service; Aiwafuku and Waraku include a simple hair set; Kyokomachi charges ¥1,100 for one. Photo shoots, premium silk kimono and rickshaw rides are the usual paid extras. As listed on ${CHECKED}.`,
  },
  {
    q: "What happens if I cancel or it rains?",
    a: `Cancel by the day before and there is no fee at Rikawafuku or Waraku; Rikawafuku charges 100% for a same-day cancellation. Rain does not cancel the rental: Rikawafuku says getting wet from rain is not treated as damage, and Waraku offers protection cover for stains or damage. As stated on the shops' FAQ pages on ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/kimono-rental-japan") } });

export default function KimonoRentalJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" />
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
              route: "/guides/attractions/kimono-rental-japan",
              headline: H1,
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
                { "@type": "ListItem", position: 4, name: "Kimono Rental in Japan", item: "https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" },
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
          <span className={styles.breadCurrent}>Kimono Rental in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            Prices from the shops&apos; own websites, Tokyo against Kyoto, and the return deadline that decides
            how much of the day you actually get.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Tokyo & Kyoto compared", "Official shop prices"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              Kimono rental in Japan costs ¥3,300 to ¥5,500 for a standard one-day plan at the official shops
              checked in Tokyo and Kyoto on {CHECKED}, with silk visiting-kimono and furisode plans from
              ¥16,500.
            </strong>{" "}
            Allow 45 to 70 minutes in the shop from check-in to walking out, and plan to have the outfit back by
            17:30 the same day. A few days&apos; notice is enough on most dates, but book as soon as your dates
            are fixed for Kyoto&apos;s cherry-blossom, autumn-leaf and New Year seasons.
          </p>
        </section>

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
                <p className={styles.verdictStatLabel}>Standard plan</p>
                <p className={styles.verdictStatValue}>¥3,300–¥5,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time in the shop</p>
                <p className={styles.verdictStatValue}>45–70 minutes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Return by</p>
                <p className={styles.verdictStatValue}>17:30 same day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free cancellation</p>
                <p className={styles.verdictStatValue}>Up to the day before</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> choose <strong>Kyoto</strong> for the old-town photographs or{" "}
              <strong>Asakusa</strong> for an easy half-day inside a Tokyo trip, take a morning slot, and build
              the walk back to the shop into your route. Details from the shops&apos; websites, {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={KIMONO_ASAKUSA_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kimono Rental — Asakusa →
              </KlookLink>
              <KlookLink href={KIMONO_KYOTO_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kimono Rental — Kyoto →
              </KlookLink>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <GygCompareButton slug="kimono-rental-japan" listing={gygTokyoKimono} label="Tokyo on GetYourGuide →" />
              <GygCompareButton slug="kimono-rental-japan" listing={gygKyotoKimono} label="Kyoto on GetYourGuide →" />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How much does kimono rental cost in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>¥3,300 to ¥5,500 for a standard one-day plan, tax included unless marked.</strong> Silk
            visiting kimono (homongi) and furisode are a different price tier, from ¥16,500 at the Kyoto shop
            that lists them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shop", "Plan", "Price (official site)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td colSpan={2} style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Standard plan ¥3,300–¥5,500 in Tokyo and Kyoto; silk plans from ¥16,500
                    </td>
                  </tr>
                  {priceRows.map((r) => (
                    <tr key={`${r.shop}-${r.plan}`}>
                      <td className={styles.tdProvider}>{r.shop}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.plan}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)", whiteSpace: "nowrap" }}>{r.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[SRC.rikawafuku, SRC.aiwafuku, SRC.waraku, SRC.kyokomachi]} />
          <p className={styles.bodyText}>
            Booking online is often the cheaper route: Kyokomachi&apos;s online prices are ¥1,100 below its
            counter prices on most plans, and Aiwafuku notes that prices may vary in peak seasons. Prices on the
            booking sites below change by date, so open a listing to see the figure for your day.
          </p>
        </section>

        {/* City comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to rent</span>
          <h2 className={styles.sectionTitle}>Kyoto or Tokyo for kimono rental?</h2>
          <p className={styles.bodyText}>
            Kyoto if the photographs are the trip, Tokyo&apos;s Asakusa if the rental is a half-day inside a
            Tokyo itinerary. Prices overlap, so the backdrop and your base decide it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Backdrops", "Standard plan (shops checked)", "Return by", "Best for", "Area guide"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td colSpan={5} style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Kyoto (Gion and Kiyomizu) for the classic setting; Asakusa for convenience on a Tokyo trip
                    </td>
                  </tr>
                  {cityRows.map((r) => (
                    <tr key={r.city}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{r.city}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.backdrops}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.prices}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.returnBy}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.best}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        <Link href={r.guide.href} style={linkStyle}>{r.guide.label}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[SRC.rikawafuku, SRC.aiwafuku, SRC.waraku, SRC.kyokomachi]} />
          <p className={styles.bodyText}>
            For shop-by-shop detail, the{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental" style={linkStyle}>Asakusa kimono rental</Link>{" "}
            guide covers the four Asakusa listings, their return times and the photo spots around Senso-ji, and
            the{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>Kyoto kimono rental</Link>{" "}
            guide splits Kyoto by area — Gion and Kiyomizu, Arashiyama, and Kyoto Station. To plan the rest of
            the day, see{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>things to do in Kyoto</Link>{" "}
            and{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>getting around Kyoto</Link>.
          </p>
        </section>

        <KlookTourPicks
          heading="Kimono Rental Shops by City"
          intro="One shop per area, so the choice is the backdrop rather than the brand. Open a listing for the current price and return time on your date."
          tours={[asakusaKimonoYae, asakusaKimonoAiwafukuNo2, kyotoKimonoAiwafukuGion, kyotoKimonoOokiniArashiyama]}
        />

        {/* Booking timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How far ahead should I book a kimono rental?</h2>
          <p className={styles.bodyText}>
            A few days ahead on most dates; as soon as your dates are fixed for Kyoto&apos;s peak seasons.
            Cancellation is free up to the day before at the shops checked, so booking early costs nothing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When you go", "How far ahead to book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Days ahead normally; weeks ahead for cherry blossom, autumn leaves and New Year — free
                      cancellation to the day before
                    </td>
                  </tr>
                  {bookingRows.map((r) => (
                    <tr key={r.when}>
                      <td className={styles.tdProvider}>{r.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.advice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[SRC.rikawafukuFaq, SRC.warakuFaq, SRC.kyokomachi]} />
          <p className={styles.bodyText}>
            Check the cancellation rule before you pay: at Rikawafuku a same-day cancellation
            costs 100% of the plan, while cancelling online by the day before is free; Waraku also charges only
            for same-day cancellations. Rain does not cancel the booking at either shop. Book the Asakusa or Kyoto
            shop below with that in mind.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <KlookLink href={KIMONO_ASAKUSA_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
              Check Asakusa availability →
            </KlookLink>
            <KlookLink href={KIMONO_KYOTO_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
              Check Kyoto availability →
            </KlookLink>
          </div>
        </section>

        <EsimCtaTop />

        {/* What's included */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you get</span>
          <h2 className={styles.sectionTitle}>What is included in a kimono rental plan?</h2>
          <p className={styles.bodyText}>
            The kimono, undergarments, obi, sandals, tabi socks, a small bag and professional dressing are
            standard; whether a hair set is included depends on the shop. Rikawafuku&apos;s Asakusa basic plan
            stores your bags but has no hair service, Aiwafuku and Waraku include a simple hair set, and
            Kyokomachi adds one for ¥1,100 ({CHECKED}).
          </p>
          <p className={styles.bodyText}>
            Paid extras are usually a professional photo shoot, a rickshaw (<em>jinrikisha</em>) ride and premium
            silk kimono. In summer most shops switch to the lighter <strong>yukata</strong>. If the rental is
            part of a Tokyo day, our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>Tokyo transport guide</Link>{" "}
            covers getting to Asakusa, and the{" "}
            <Link href="/guides/attractions" style={linkStyle}>things to do in Japan</Link> hub has the other
            half-day experiences.
          </p>
          <LastChecked sources={[SRC.rikawafuku, SRC.aiwafuku, SRC.waraku, SRC.kyokomachi]} />
        </section>

        {/* How it works */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How does kimono rental work on the day?</h2>
          <p className={styles.bodyText}>
            You book a slot, spend 45 to 70 minutes being dressed, and have the outfit back by 17:30 — four steps.
          </p>
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
        </section>

        <KlookTourPicks
          heading="Kimono and Tea Ceremony in One Booking"
          intro="If you only want the kimono for an hour, a tea ceremony that includes dressing avoids the 17:30 return altogether. One in Kyoto's Gion, one in Asakusa."
          tours={[kyotoGionKimonoTeaCeremony, asakusaKimonoTeaCeremony]}
        />
        <p className={styles.bodyText}>
          More options are compared in our{" "}
          <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>tea ceremony in Japan</Link> guide.
        </p>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Kimono Rental in Japan: FAQ</h2>
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
          heading="Filling the Rest of the Day"
          intro="A rental is a half-day, so here is what tends to go either side of it in each city. Open a listing for the current price on your date."
          tours={[kyotoHighlightBusTour, tokyoSightseeingBusTour]}
        />

        {/* Both cities, second platform. The two Klook shops above are unchanged. */}
        <GygCompare
          slug="kimono-rental-japan"
          heading="Kimono Rentals on GetYourGuide"
          intro="A rental shop has a finite number of outfits and dressers, which is why spring and autumn book out — and why a second list of shops is worth having. GetYourGuide covers both cities, Kyoto more deeply than Tokyo. Check the return deadline wherever you book: it decides how much of the day you actually get."
          listings={[gygKyotoKimono, gygTokyoKimono]}
        />

        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4 4 4-3 3v11H7V10L4 7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Which Area, What&apos;s Included, When to Return</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 14h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <line x1="6" y1="8" x2="18" y2="8" />
                  <line x1="6" y1="14" x2="18" y2="14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                  <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
                  <path d="M7 3v2M11 3v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tea Ceremony in Japan (2026): What Actually Happens, and Where to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing &amp; What to Book</p>
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
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Subway &amp; IC Cards</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Dress up for the day</h2>
            <p className={styles.ctaBannerDesc}>
              Book a kimono rental in Asakusa or Kyoto — full outfit and professional dressing, with a hair set at
              many shops. Reserve ahead in spring and autumn, and remember the 17:30 return.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={KIMONO_ASAKUSA_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Asakusa Kimono Rental →
              </KlookLink>
              <KlookLink href={KIMONO_KYOTO_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Kyoto Kimono Rental →
              </KlookLink>
              <GygCompareButton slug="kimono-rental-japan" listing={gygKyotoKimono} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
