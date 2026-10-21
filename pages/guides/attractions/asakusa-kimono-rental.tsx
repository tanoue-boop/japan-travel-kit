import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  asakusaKimonoAiwafukuNo1,
  asakusaKimonoAiwafukuNo2,
  asakusaKimonoKaminarimon,
  asakusaKimonoYae,
} from "../../../lib/klook-links";

/**
 * Asakusa-only kimono rental. /guides/attractions/kimono-rental-japan is the
 * nationwide page that weighs Kyoto against Asakusa and explains what a rental is;
 * this one assumes you have already chosen Asakusa and answers the questions that
 * only matter once you have — the return deadline, how long the appointment takes,
 * which station exit, what to do in rain, and where the photographs are.
 *
 * Shop hours, the dressing-and-hair estimate and the two return deadlines come from
 * Kimono Rental Aiwafuku's own Asakusa page (aiwafuku.com), read on 21 Oct 2026.
 * Senso-ji's opening hours are from senso-ji.jp and the Asakusa Culture Tourist
 * Information Center's terrace hours from Taito City's own site (city.taito.lg.jp),
 * both on the same date. Shop-specific details attributed to a listing — kimono
 * counts, size ranges, the 17:00 and 17:30 deadlines — are as that Klook listing
 * states them.
 *
 * No price appears anywhere on this page. Rental pricing moves by plan and season,
 * and Klook answers automated reads of its product pages with HTTP 403, so there is
 * no figure we could have verified.
 */

const CHECKED_ISO = "2026-10-21";
const CHECKED = checkedLabel(CHECKED_ISO);

/** The four Asakusa listings, on the details that decide which one you book. */
const shopRows = [
  {
    shop: "Kimono Yae, by Kaminarimon",
    choice: "Over 500 kimono and yukata",
    hair: "As stated on the listing",
    deadline: "Return by 17:30 the same day",
    languages: "English, Chinese and Korean-speaking staff",
  },
  {
    shop: "Aiwafuku Asakusa No. 1 store",
    choice: "Sold as a six-hour experience",
    hair: "Hair styling included",
    deadline: "16:30 if you arrive by 12:00, 17:30 if you arrive later",
    languages: "English and Chinese-speaking staff every day",
  },
  {
    shop: "Aiwafuku Asakusa No. 2 store",
    choice: "Over 600 kimono; 3L and 4L sizes at the same price",
    hair: "Free hair set; free storage for large cases",
    deadline: "16:30 if you arrive by 12:00, 17:30 if you arrive later",
    languages: "English and Chinese-speaking staff every day",
  },
  {
    shop: "Kaminarimon shop, 20 seconds from Asakusa Station exit 4",
    choice: "Over 1,000 kimono; adult sizes for 150–185 cm",
    hair: "Free basic hairstyle on women's kimono reservations",
    deadline: "Return before 17:00 the same day; shop open 09:00–17:00",
    languages: "Chinese, Korean, English, Hokkien and Japanese",
  },
];

/** The free, verifiable fixed points of an Asakusa kimono day. */
const spotRows = [
  {
    spot: "Kaminarimon (the great lantern gate)",
    why: "The single most recognisable frame in Asakusa, and the shops cluster within a few minutes of it",
    hours: "Outdoor street gate — no gate hours",
    cost: "Free",
  },
  {
    spot: "Nakamise-dori, the approach to the temple",
    why: "A straight lane of stalls between Kaminarimon and Hozomon — crowded by late morning, quiet first thing",
    hours: "Individual stalls set their own hours",
    cost: "Free to walk",
  },
  {
    spot: "Senso-ji main hall and the five-storey pagoda",
    why: "The temple itself, and the pagoda that sits beside it — the backdrop everyone comes for",
    hours: "Main hall 6:00 – 17:00; 6:30 – 17:00 from October to March",
    cost: "Free",
  },
  {
    spot: "Asakusa Culture Tourist Information Center, 8F terrace",
    why: "Directly opposite Kaminarimon, looking straight down Nakamise with Tokyo Skytree behind it",
    hours: "8F terrace 9:00 – 22:00; 1F counter 9:00 – 20:00",
    cost: "Free",
  },
];

const whoFor = [
  {
    title: "Book a morning slot if…",
    desc: `You want a full day in the kimono — but read the deadline first, because it works the other way round. At Aiwafuku, arriving by 12:00 means returning by 16:30; arriving after 12:00 means returning by 17:30. A morning start gives you the temple before the crowds and better light, at the cost of an earlier hand-back. Deadlines read off aiwafuku.com on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Book an early-afternoon slot if…",
    desc: `You want the longest possible wear and you do not mind the crowds. Arriving just after 12:00 buys you until 17:30 at the same shop, which is the longest same-day window on offer there, and it lines up with the late-afternoon light on Nakamise. Build in 45 to 60 minutes at the shop at the start — that is the operator's own estimate for choosing a kimono plus dressing and hair. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "Pick a different shop if…",
    desc: `The deadline or the sizing is a problem. The four Asakusa listings do not agree with each other: one asks for the outfit back before 17:00 and closes at 17:00, two work on the 16:30/17:30 split, and one states 17:30 flat. Sizing differs too — one lists adult kimono for heights from 150 to 185 cm, another lists 3L and 4L at the same price as everything else. These are the two things worth checking on a listing before the photographs of the kimono. As stated on the listings, ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3l4 4 4-4" />
        <path d="M6 21V8l2-5M18 21V8l-2-5" />
        <path d="M6 14h12" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Work backwards from the return deadline",
    desc: `Everything else follows from this. Aiwafuku's Asakusa page sets the last return at 16:30 for anyone arriving by 12:00 and 17:30 for anyone arriving after; one of the other Asakusa shops asks for the outfit back before 17:00 and shuts at 17:00. So a rental is a half-day with a hard edge, not a costume for the evening. Decide what you want to photograph, then pick the slot that still leaves you the walk back. Read off aiwafuku.com and the shop listings on ${CHECKED}.`,
  },
  {
    title: "Allow 45 to 60 minutes in the shop before you go anywhere",
    desc: `That is the operator's own estimate, and it covers choosing the kimono, the dressing itself and a hair set, varying with how busy the shop is. It is also why the "six-hour" rental on two of the listings is not six hours of sightseeing. Arrive at the start of your slot rather than at the end of it.`,
  },
  {
    title: "Check the station exit, not just the address",
    desc: "Asakusa Station is four separate railways and a confusing set of exits, and the shops are a couple of minutes from the right one and fifteen from the wrong one. Aiwafuku's main store is at 1-11-1 Hanakawado, two minutes from exit 5 of the Ginza Line and immediately outside the Tobu Skytree Line's north gate; its Premium Kaminarimon store is at 2-17-9 Kaminarimon, three minutes from Ginza Line exit 1 or two from Toei Asakusa Line exit A4. One of the Klook listings puts its shop twenty seconds from exit 4 and 220 metres from the temple.",
  },
  {
    title: "Ask about luggage before you turn up with it",
    desc: "You cannot carry a suitcase around Senso-ji in a kimono, and your own clothes have to go somewhere for the day. Storage is standard but not universal: one of the listings specifically advertises free storage for large carry-on cases, which is the one to pick if you are doing this on a travel day between hotels.",
  },
  {
    title: "Book the season, not the week",
    desc: "Cherry-blossom season and the autumn colours are when Asakusa rental shops fill, and the good designs go before the slots do. Outside those, a few days ahead is usually enough on a weekday and a week is comfortable on a weekend. Summer is a different product: most shops switch to yukata, which is lighter and easier to walk in through August humidity.",
  },
  {
    title: "Read the cancellation and weather terms on your listing",
    desc: "This is the part no summary can answer for your booking, because it varies by shop and by reseller. A dressing appointment is a fixed slot, so a late cancellation is usually chargeable, and rain is not generally treated as a reason to cancel — the shops stay open and the temple stays open. Check the wording before you pay rather than on a wet morning.",
  },
];

const faqItems = [
  {
    q: "What time do you have to return an Asakusa kimono rental?",
    a: `Earlier than almost everyone plans for, and the shops do not agree on the time. Kimono Rental Aiwafuku's Asakusa page sets the last return at 16:30 if you arrive by 12:00 and 17:30 if you arrive after 12:00, with next-day return offered if you need longer. One of the other Asakusa shops on Klook asks for the outfit back before 17:00 and closes its doors at 17:00, and another states 17:30. Treat the deadline as the fixed point of the day and plan the route back to the shop into it. Read off aiwafuku.com and the shop listings on ${CHECKED}.`,
  },
  {
    q: "How long does getting dressed in a kimono take?",
    a: `Allow three quarters of an hour to an hour at the shop before you step outside. Aiwafuku's own estimate for its Asakusa store is about 45 to 60 minutes covering the choice of kimono, the dressing and the hair set, varying with how busy the shop is. That is at the start of your slot, which is why the six-hour rental two of the Klook listings advertise is not six hours of sightseeing. Checked ${CHECKED}.`,
  },
  {
    q: "Is a hair set included with Asakusa kimono rental?",
    a: `Often, which is a difference from some Kyoto shops where it is a paid extra. Of the four Asakusa listings we checked, one includes hair styling in the plan, one advertises a free hair set, and one gives a free basic hairstyle on women's kimono reservations. Elaborate styling, makeup, a professional photo shoot and a rickshaw ride are the usual paid add-ons. Inclusions as the listings state them on ${CHECKED}.`,
  },
  {
    q: "Where are the best photo spots around Senso-ji?",
    a: `Four, and they are all free. Kaminarimon, the great red lantern gate, is the first and the most recognisable — and the shops are minutes from it, so you reach it while the kimono is still freshly tied. Nakamise-dori, the stall-lined approach behind it, is near-empty first thing and shoulder-to-shoulder by late morning. The main hall and the five-storey pagoda are the classic backdrop, and the main hall is open 6:00 to 17:00, or 6:30 to 17:00 from October to March, with no admission fee. The one most people miss is the 8th-floor terrace of the Asakusa Culture Tourist Information Center directly opposite Kaminarimon: free, open 9:00 to 22:00, and it looks straight down Nakamise with Tokyo Skytree behind. Temple hours from senso-ji.jp and terrace hours from Taito City's own site, read on ${CHECKED}.`,
  },
  {
    q: "Should you rent a kimono in Asakusa or Kyoto?",
    a: "Asakusa if it is an add-on to a Tokyo trip, Kyoto if the photographs are the trip. Asakusa puts a dense cluster of shops within a few minutes of Kaminarimon and Senso-ji, so the whole thing — dressing, temple, lunch, return — fits into a half day without leaving the city or moving your base. Kyoto's preserved streets around Gion and Kiyomizu-dera are more atmospheric and the rental shops there more often offer next-day or postal return, which buys you a longer day. Our nationwide kimono rental guide compares the two in full.",
  },
  {
    q: "Do you need to book Asakusa kimono rental in advance?",
    a: "Yes in spring and autumn, and it is sensible the rest of the year. A dressing appointment is a fixed slot with a dresser assigned to it, so shops run on reservations rather than walk-ins, and in cherry-blossom and autumn-colour season the morning slots and the better designs go first. Outside peak, a few days ahead usually covers a weekday. Booking through a reseller also gets you an English checkout and a confirmed slot time, which matters more than it sounds when your day has a 16:30 deadline in it.",
  },
  {
    q: "What happens if it rains?",
    a: "The day still works, but it gets slower, and slower is expensive when you have a return deadline. Senso-ji's main hall is open and covered, the temple grounds and Nakamise are walkable in rain, and the information centre terrace opposite Kaminarimon is reached indoors. What rain really costs you is pace: zori sandals and tabi socks are not built for puddles, so the walk back to the shop takes longer than the walk out. If the forecast is bad and your slot is flexible, moving the booking is worth more than any rain gear.",
  },
  {
    q: "What should you wear underneath, and will they have your size?",
    a: `Wear something thin and simple that comes off easily — you change into the shop's undergarment, so bulky layers and anything hard to get out of in a changing cubicle only cost you time. On sizing, the Asakusa listings are more explicit than most: one states adult kimono for heights from 150 to 185 cm, with children's sizes from 90 to 150 cm for girls and 100 to 150 cm for boys, and another advertises 3L and 4L sizes at the same price as its standard range. If a listing does not publish a size range, ask before booking rather than on the day, because the slot is fixed and there is no time to switch shops. As stated on the listings, ${CHECKED}.`,
  },
  {
    q: "Can men and children rent a kimono in Asakusa too?",
    a: "Yes, and the Asakusa shops are set up for groups doing it together. Men's kimono and children's sizes sit alongside the women's range at the shops we checked — one publishes children's sizes from 90 to 150 cm for girls and 100 to 150 cm for boys — and couple and family plans are a standard product rather than a special request. Note that the free hair-set offers are not always universal: one of the listings specifies that its free basic hairstyle applies to women's kimono reservations.",
  },
  {
    q: "What else can you do in Asakusa while wearing it?",
    a: "Plenty, as long as it fits inside the return deadline. Senso-ji, Nakamise and the lanes behind the temple are the obvious hour or two. A tea ceremony is the natural pairing — it is indoors, it is short, and kimono is the one outfit the room was designed for. A rickshaw ride around the old streets is the standard paid add-on at most of the shops. What does not work is anything that takes you far from the shop, because every minute spent crossing Tokyo is a minute off the clock.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/asakusa-kimono-rental") },
});

const TITLE = "Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph";
const DESC =
  "Asakusa kimono rental in 2026: the return deadline is 16:30 or 17:30 depending on your arrival time, dressing and hair take about 45–60 minutes, and the shops sit minutes from Kaminarimon. Sizes, rainy days and the four free photo spots around Senso-ji.";

export default function AsakusaKimonoRentalPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/asakusa-kimono-rental" />
        {hreflangLinks("/guides/attractions/asakusa-kimono-rental")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/asakusa-kimono-rental" />
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
              route: "/guides/attractions/asakusa-kimono-rental",
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
                  name: "Asakusa Kimono Rental",
                  item: "https://www.japan-travel-kit.com/guides/attractions/asakusa-kimono-rental",
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
          <span className={styles.breadCurrent}>Asakusa Kimono Rental</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Asakusa Kimono Rental (2026):<br />Return Times, Hair Sets and Where to Photograph
          </h1>
          <p className={styles.heroSubtitle}>
            The deadline is the thing nobody checks until it is too late. Here is when the
            outfit has to be back, how long the appointment takes, and what fits in between.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Shop hours, dated", "Four free photo spots"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Return deadline</p>
                <p className={styles.verdictStatValue}>16:30 or 17:30, by arrival time</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time in the shop</p>
                <p className={styles.verdictStatValue}>About 45–60 minutes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hair set</p>
                <p className={styles.verdictStatValue}>Included on three of four listings</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Senso-ji main hall</p>
                <p className={styles.verdictStatValue}>6:00–17:00, free (6:30 Oct–Mar)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Asakusa kimono rental is a half day with a hard edge. The
              shops sit within a few minutes of Kaminarimon, choosing a kimono plus dressing and a
              hair set takes roughly 45 to 60 minutes at the start, and the outfit has to be back the
              same day — 16:30 if you arrived by 12:00 and 17:30 if you arrived later at the shop we
              checked, and before 17:00 at one of the others. Senso-ji itself is free and open from
              6:00 (6:30 from October to March) to 17:00. Deadlines and hours read off aiwafuku.com,
              senso-ji.jp and the shop listings on {CHECKED}.
            </p>
            <a
              href={asakusaKimonoAiwafukuNo2.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check Asakusa kimono rental on Klook →
            </a>
          </div>
        </div>

        {/* Intro / scope */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Asakusa Is the Easy Place to Do This</h2>
          <p className={styles.bodyText}>
            Asakusa works for kimono rental because of geography. The shops are packed into the few
            blocks around Kaminarimon, the backdrop everybody wants is a five-minute walk from the
            changing room, and the whole thing — dressing, temple, lunch, photographs, return — fits
            inside a half day without leaving the east side of the city. Nothing about it needs a
            full-day plan.
          </p>
          <p className={styles.bodyText}>
            This page assumes you have already settled on Asakusa. If you are still weighing it
            against Kyoto, or you want the general explanation of what a rental includes and how the
            pricing works, that is our{" "}
            <Link href="/guides/attractions/kimono-rental-japan">kimono rental in Japan guide</Link>.
            What follows here is the Asakusa detail: the return deadlines, which differ shop to shop
            and are earlier than people expect, how long the appointment really takes, which station
            exit to use, and the four places worth photographing once you are dressed.
          </p>
        </section>

        {/* Shops table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Asakusa Shop Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            They look interchangeable in search results and they are not. The deadline, the hair set
            and the size range are where they differ, and all three decide the day more than the
            colour of the kimono does.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shop", "Choice and sizing", "Hair and extras", "Return deadline", "Languages"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shopRows.map((row) => (
                    <tr key={row.shop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.shop}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.choice}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hair}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.deadline}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.languages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Details as the four Klook listings state them, all confirmed live and on sale on {CHECKED},
            with the Aiwafuku return deadlines cross-checked against that operator&apos;s own Asakusa page.
            No price appears here: rental pricing moves by plan and season, and Klook answers automated
            reads of its product pages with HTTP 403, so there is no figure we could have verified.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={asakusaKimonoKaminarimon.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Compare Asakusa kimono shops on Klook →
            </a>
          </div>
        </section>

        {/* Timing */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>What Time Slot Should You Book?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo spots */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to go</span>
          <h2 className={styles.sectionTitle}>Where Are the Best Photo Spots Around Senso-ji?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Four fixed points, all free, all within a few minutes of the shops. Hours and admission
            below are the operators&apos; own.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Spot", "Why it works", "Hours", "Cost"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spotRows.map((row) => (
                    <tr key={row.spot}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.spot}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Senso-ji&apos;s main hall hours read off senso-ji.jp, and the Asakusa Culture Tourist
            Information Center&apos;s terrace and counter hours off Taito City&apos;s own site, on {CHECKED}.
            Both are free. Note the mismatch that matters: the temple closes at 17:00 and your kimono is
            due back at 16:30 or 17:30, so the temple is never the constraint — the shop is.
          </p>
        </section>

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>Planning the Half Day</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Because the deadline takes your afternoon but not your evening, this slots neatly into a
            wider Tokyo day. A{" "}
            <Link href="/guides/attractions/tea-ceremony-japan">tea ceremony</Link> is the natural
            indoor pairing and runs under an hour;{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets">Tokyo Skytree</Link> is across the
            river and stays open long after the kimono is back; and our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> puts
            the Asakusa half day where it belongs in a short trip.
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
          heading="Asakusa Kimono Shops You Can Book From Abroad"
          intro="The four Asakusa listings compared in the table above, all confirmed live on 21 October 2026. Klook blocks automated price reads, so open a listing for the current price, its return deadline and the cancellation terms on your date."
          tours={[
            asakusaKimonoAiwafukuNo2,
            asakusaKimonoKaminarimon,
            asakusaKimonoYae,
            asakusaKimonoAiwafukuNo1,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 14h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan (2026): Kyoto vs Asakusa and How Booking Works</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h12v5a6 6 0 0 1-12 0z" />
                  <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
                  <path d="M3 21h14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto and What to Expect</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l8-8" />
                  <path d="M13 11l7-7" />
                  <path d="M17 3h4v4" />
                  <path d="M3 17v4h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Samurai and Ninja Experience in Tokyo (2026): Sword Lessons, Where to Go and Tickets</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tsukiji-market-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-4 7-5 10-5s6 2 8 5c-2 3-5 5-8 5s-7-1-10-5z" />
                  <circle cx="16" cy="12" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tsukiji Market Food Tour (2026): Hours, What to Eat and Which Tour to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the slot, then plan around the deadline</h2>
            <p className={styles.ctaBannerDesc}>
              A dressing appointment is a fixed slot with a dresser assigned to it, and the morning
              ones go first in blossom and autumn season. Klook checks out in English, takes foreign
              cards, and shows each shop&apos;s own return deadline and cancellation terms before you pay.
            </p>
            <a href={asakusaKimonoAiwafukuNo2.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Asakusa kimono rental on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
