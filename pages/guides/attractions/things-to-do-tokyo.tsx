import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import CityGuideIndex from "../../../components/CityGuideIndex";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import KlookLink from "../../../components/KlookLink";
import {
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  skytreeTicket,
  fujiHakoneDayTour,
  klookEsim,
  klookPassGreaterTokyo,
  hanedaLimousineBus,
  naritaLimousineBus,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoDisneyOneDayPassport,
  tokyoJoypolisPassport,
  tokyoStayAreas,
} from "../../../lib/klook-links";
import GygCompare from "../../../components/GygCompare";
import { gygTokyo, gygTokyoEntryTickets } from "../../../lib/gyg-links";
import { PRICES, TOKYO_GUIDE_PRICES, checkedLabel } from "../../../lib/attraction-prices";

// Every yen figure on this page comes from lib/attraction-prices.ts, so it cannot drift from
// the guide that verified it. (It did once: until 1 Nov 2026 this page still printed Shibuya
// Sky's pre-April-2025 flat ¥2,500 / ¥3,000.) Row dates are the records' own `checked` dates.
//
// Same-day and change terms were read on the operators' pages. Shibuya Sky: release of
// 27 Feb 2025. teamLab Planets: official store Help, 6 Nov 2026. Borderless: teamlab.art,
// 9 Oct 2026. Disney: official FAQ, 28 Oct 2026. Warner Bros.: wbstudiotour.jp/en/tickets,
// Skytree: en.tokyo-skytree.jp/ticket and /ticket/cancel, Sanrio: puroland.jp/ticket, all
// 7 Nov 2026. Go-kart: Street Kart's own pages, 7 Nov 2026. Tokyo Tower's fee page and
// Joypolis publish no terms we could read, so those cells say so rather than guess.
const TITLE = "Things to Do in Tokyo 2026: Top Picks and Ticket Prices";
const DESC =
  "Things to do in Tokyo with 2026 ticket prices: Shibuya Sky from ¥2,700, teamLab Planets from ¥3,800, Disney from ¥8,900, and what to book or get free.";

const CHECKED_FREE = "7 November 2026";
const TOCHO_CHECKED = checkedLabel(PRICES.tochoDeck.checked);
const SKY = PRICES.shibuyaSky;
// "¥2,700 / ¥3,400" -> entry 10:00–14:59, entry 15:00–21:20 (see the record's own comment).
const [SKY_ONLINE_DAY, SKY_ONLINE_LATE] = SKY.adult.split(" / ");
const [SKY_DOOR_DAY, SKY_DOOR_LATE] = (SKY.atDoor ?? "").split(" / ");
const SKY_CHECKED = checkedLabel(SKY.checked);
const SUBWAY_CHECKED = checkedLabel(PRICES.tokyoSubwayTicket.checked);
const WB_FROM = `from ${PRICES.wbStudioTour.adult.replace("~", "")}`;

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

/** Adult official prices, Tokyo only. The nationwide list is japan-attraction-ticket-prices. */
const priceRows = [
  {
    name: "Shibuya Sky",
    adult: `${SKY_ONLINE_DAY} before 15:00, ${SKY_ONLINE_LATE} from 15:00 (online)`,
    book: "Advised: sunset slots sell out",
    sameDay: `Yes, 14th-floor counter: ${SKY_DOOR_DAY} / ${SKY_DOOR_LATE}`,
    change: "Official web tickets: free cancellation up to the admission day",
    checked: SKY.checked,
    href: SKY.href,
    klook: SKY.klook.url,
  },
  {
    name: "Tokyo Disney (1-Day Passport)",
    adult: `${TOKYO_GUIDE_PRICES.tokyoDisney.adult}, by date`,
    book: "Required",
    sameDay: "No gate sales. Official site or app only, while tickets remain",
    change: "No refunds. Date can be changed online at the new date's price",
    checked: TOKYO_GUIDE_PRICES.tokyoDisney.checked,
    href: "/guides/attractions/tokyo-disney-tickets",
    klook: tokyoDisneyOneDayPassport.url,
  },
  {
    name: "teamLab Planets",
    adult: `${PRICES.teamlabPlanets.adult}, by date`,
    book: "Required",
    sameDay: "No on-site sales",
    change: "No refunds. Up to 3 changes, until 2 hours before entry",
    checked: PRICES.teamlabPlanets.checked,
    href: PRICES.teamlabPlanets.href,
    klook: PRICES.teamlabPlanets.klook.url,
  },
  {
    name: "teamLab Borderless",
    adult: `${PRICES.teamlabBorderless.adult}, by date`,
    book: "Required",
    sameDay: "On site while slots remain, ¥200 more",
    change: "Official tickets: date can be changed up to 3 times",
    checked: PRICES.teamlabBorderless.checked,
    href: PRICES.teamlabBorderless.href,
    klook: PRICES.teamlabBorderless.klook.url,
  },
  {
    name: "Warner Bros. Studio Tour Tokyo",
    adult: PRICES.wbStudioTour.adult,
    book: "Required",
    sameDay: "On-site ticket office, but dates and times can sell out",
    change: "Non-refundable. ¥1,500 per date or time change",
    checked: PRICES.wbStudioTour.checked,
    href: PRICES.wbStudioTour.href,
    klook: PRICES.wbStudioTour.klook.url,
  },
  {
    name: "Sanrio Puroland (1-day passport)",
    adult: PRICES.sanrioPuroland.adult,
    book: "Required: a visit reservation as well as the ticket",
    sameDay: "Ticket window, but you still need the visit reservation",
    change: "No refund if refused entry without a reservation",
    checked: PRICES.sanrioPuroland.checked,
    href: PRICES.sanrioPuroland.href,
    klook: PRICES.sanrioPuroland.klook.url,
  },
  {
    name: "Tokyo Skytree (Floor 350)",
    adult: PRICES.tokyoSkytree.adult,
    book: "Advised: cheaper than the counter",
    sameDay: "Yes, ¥500 fee per ticket at the counter",
    change: "Official web tickets: free 31+ days out, then 20%. No date changes",
    checked: PRICES.tokyoSkytree.checked,
    href: PRICES.tokyoSkytree.href,
    klook: PRICES.tokyoSkytree.klook.url,
  },
  {
    name: "Tokyo Tower (Main Deck)",
    adult: PRICES.tokyoTower.adult,
    book: "Not needed",
    sameDay: "Yes, same price",
    change: "Not stated on the fee page",
    checked: PRICES.tokyoTower.checked,
    href: PRICES.tokyoTower.href,
    klook: PRICES.tokyoTower.klook.url,
  },
  {
    name: "Tokyo Joypolis (Passport)",
    adult: TOKYO_GUIDE_PRICES.tokyoJoypolis.adult,
    book: "Not needed",
    sameDay: "Yes, sold at the door",
    change: "Check your seller's terms",
    checked: TOKYO_GUIDE_PRICES.tokyoJoypolis.checked,
    href: "/guides/attractions/tokyo-joypolis-tickets",
    klook: tokyoJoypolisPassport.url,
  },
  {
    name: "Tokyo street go kart",
    adult: `${TOKYO_GUIDE_PRICES.tokyoGoKart.adult}, by course`,
    book: "Advised, and you need an IDP before you fly",
    sameDay: "Not stated by the operator",
    change: "Free up to 7 days before. No refund if your documents are missing",
    checked: TOKYO_GUIDE_PRICES.tokyoGoKart.checked,
    href: "/guides/attractions/tokyo-go-kart",
    klook: shibuyaAnnexGoKartTour.url,
  },
  {
    name: "Tokyo Metropolitan Government Building deck",
    adult: "Free",
    book: "Not needed",
    sameDay: "No ticket exists",
    change: "—",
    checked: PRICES.tochoDeck.checked,
    href: PRICES.tochoDeck.href,
    klook: null,
  },
];

const freeRows = [
  {
    thing: "Tokyo Metropolitan Government Building, Shinjuku",
    what: "45th-floor observation rooms at 202 m. Hours and which room is open vary, so check the day before",
    checked: TOCHO_CHECKED,
    source: "metro.tokyo.lg.jp",
  },
  {
    thing: "Meiji Jingu, Harajuku",
    what: "Open every day, sunrise to sunset. Some facilities inside close earlier",
    checked: CHECKED_FREE,
    source: "meijijingu.or.jp",
  },
  {
    thing: "Imperial Palace East Gardens",
    what: "Usually closed Mondays and Fridays, and 28 December to 3 January",
    checked: CHECKED_FREE,
    source: "kunaicho.go.jp",
  },
  {
    thing: "Shibuya Scramble Crossing",
    what: "A public street, so there is no ticket and no opening time",
    checked: "—",
    source: "—",
  },
];

/** The Tokyo bookings block. The first four cards are the page's original four. */
const bookingPicks = [
  tokyoSubwayTicket,
  skytreeTicket,
  tokyoSightseeingBusTour,
  fujiHakoneDayTour,
  shinjukuNightFoodWalkingTour,
  ...tokyoStayAreas.slice(0, 2).map((stay) => ({ title: `Hotels in ${stay.area}`, desc: stay.why, url: stay.url })),
  naritaLimousineBus,
  hanedaLimousineBus,
  klookPassGreaterTokyo,
  {
    title: klookEsim.name,
    desc: "Data from the moment you land, in the same checkout as your tickets",
    url: klookEsim.url,
  },
];

const bookingRows = [
  {
    thing: "Tokyo Disneyland / DisneySea",
    when: "Weeks ahead",
    why: "Date-specified tickets, no gate sales at all",
  },
  {
    thing: "teamLab Planets / Borderless",
    when: "Days to weeks ahead",
    why: "30-minute timed entry slots that sell out",
  },
  {
    thing: "Shibuya Sky",
    when: "Days ahead for sunset",
    why: "The sunset slots go first; other slots are easier",
  },
  {
    thing: "Warner Bros. Studio Tour",
    when: "Weeks ahead",
    why: "Timed entry, no re-entry, and a four-hour visit",
  },
  {
    thing: "Sumo tournament",
    when: "The day tickets go on sale",
    why: "Only January, May and September in Tokyo",
  },
  {
    thing: "Go-karting",
    when: "Before you leave home",
    why: "Not the booking — the International Driving Permit",
  },
  {
    thing: "Tokyo Skytree, Tokyo Tower",
    when: "Same day is fine",
    why: "Advance online saves a little; capacity is rarely the issue",
  },
  {
    thing: "Tocho free deck, shrines, neighbourhoods",
    when: "Just turn up",
    why: "No ticket exists to book",
  },
];

const faqItems = [
  {
    q: "What actually needs booking ahead in Tokyo?",
    a: "Five things, really: Tokyo Disney (date-specified, no gate sales), the teamLab museums (30-minute timed slots), Shibuya Sky's sunset window, the Warner Bros. Studio Tour, and Sanrio Puroland, which wants a visit reservation on top of its ticket. A sumo tournament counts too, but only if your dates fall in January, May or September. Almost everything else in Tokyo — the Skytree, Tokyo Tower, shrines, neighbourhoods, the free Tocho deck — you can decide on the morning of.",
  },
  {
    q: "Are there free things to do in Tokyo?",
    a: `Yes, and one of them is a genuine rival to the paid decks. The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has an observation room on the 45th floor at 202 metres, free to enter, with the Skytree and Tokyo Tower both in view. Shrines, parks and whole neighbourhoods cost nothing to wander, so the paid list below can stay short. Height and admission read off metro.tokyo.lg.jp on ${TOCHO_CHECKED}.`,
  },
  {
    q: "Why do Tokyo's official ticket sites reject my card?",
    a: "Several Japanese attraction sites run payment pages that do not handle foreign-issued cards cleanly, and Tokyo Disney is the best-known example. This is why a reseller checkout is often the smoother route from abroad even when the official site is theoretically open to you — it is an English checkout that takes a foreign card, rather than a cheaper ticket. Each of our attraction guides says which route works for that specific venue.",
  },
  {
    q: "How many days do I need for Tokyo's attractions?",
    a: "Three to four days is enough to pair two big ticketed attractions — say a theme park and a studio tour — with a deck, one hands-on experience and a day trip out of the city. The order matters more than the number: fix the timed-entry dates first, because they are the only things that cannot move, then fill the gaps with the walk-in sightseeing.",
  },
  {
    q: "What is worth doing as a day trip from Tokyo?",
    a: "Four stand out, and they are genuinely different days. Kamakura is the easiest — under an hour on one JR line, with the open-air Great Buddha and seaside temples. Nikko is a UNESCO shrine plus mountain scenery, two hours north. Hakone is hot springs and a volcanic valley, with one pass covering the whole loop. Lake Kawaguchi is where you go to look at Mt. Fuji. Each has its own guide below.",
  },
  {
    q: "Should I pick Shibuya Sky or Tokyo Skytree?",
    a: `Pick Shibuya Sky for an open-air rooftop above the crossing, and Tokyo Skytree for height. Shibuya Sky is ${SKY_ONLINE_DAY} online before 15:00 and ${SKY_ONLINE_LATE} from 15:00, and the sunset slots are the ones that sell out. Skytree's Floor 350 is ${PRICES.tokyoSkytree.adult}, with a ¥500 fee per ticket at the counter. Official prices, checked ${SKY_CHECKED} and ${checkedLabel(PRICES.tokyoSkytree.checked)}.`,
  },
  {
    q: "Can you visit both Tokyo Disney parks in one day?",
    a: `Not on one ticket at the moment. Each park ticket is for one park on one date, and the resort's FAQ says the 1-Day Park Hopper is not currently sold, so two parks means two days. Read on ${checkedLabel(TOKYO_GUIDE_PRICES.tokyoDisney.checked)}.`,
  },
  {
    q: "Can I get a refund on Tokyo attraction tickets?",
    a: "It depends on the venue. Tokyo Disney, teamLab Planets and the Warner Bros. Studio Tour do not refund a change of plan, though each lets you move the date under its own rules. Official Shibuya Sky web tickets can be cancelled free up to the admission day, and official Skytree tickets are free to cancel 31 or more days out and cost 20% after that. A reseller sets its own terms, so read them at checkout.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/things-to-do-tokyo") } });

export default function ThingsToDoTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          name="description"
          content={DESC}
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" />
        {hreflangLinks("/guides/attractions/things-to-do-tokyo")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" />
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
              route: "/guides/attractions/things-to-do-tokyo",
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
                { "@type": "ListItem", position: 4, name: "Things to Do in Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" },
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
          <span className={styles.breadCurrent}>Things to Do in Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Things to Do in Tokyo 2026:<br />Top Picks and Ticket Prices
          </h1>
          <p className={styles.heroSubtitle}>
            Official ticket prices for Tokyo&apos;s top attractions, what to book ahead, what is free, and
            everything else you can decide on over breakfast.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Dated official prices", "Ordered by urgency"].map((t) => (
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

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What do you need to book ahead in Tokyo?</h2>
          <p className={styles.bodyText}>
            Only a handful of things to do in Tokyo need booking ahead: Shibuya Sky (adult from {SKY_ONLINE_DAY}),
            teamLab Planets ({PRICES.teamlabPlanets.adult}), Tokyo Disney ({TOKYO_GUIDE_PRICES.tokyoDisney.adult}),
            the Warner Bros. Studio Tour ({WB_FROM}) and Sanrio Puroland&apos;s visit reservation. Everything else
            can wait for the day, and the best free view is the Tokyo Metropolitan Government Building, whose
            observation rooms sit at 202 metres. These are official prices, with the date each was checked in
            the table below.
          </p>
          <p className={styles.bodyText}>
            This page covers Tokyo only. For Kyoto, Osaka and child rates, our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              Japan attraction ticket prices table
            </Link>{" "}
            lists the official figures nationwide. To compare the decks in detail, use our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>Tokyo observation decks comparison</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SKY.klook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shibuya Sky on Klook →
            </KlookLink>
            <KlookLink href={PRICES.teamlabPlanets.klook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets on Klook →
            </KlookLink>
            <KlookLink href={tokyoDisneyOneDayPassport.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Disney on Klook →
            </KlookLink>
            <KlookLink href={PRICES.wbStudioTour.klook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Warner Bros. Studio Tour on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Ticket prices</span>
          <h2 className={styles.sectionTitle}>How much do Tokyo attractions cost?</h2>
          <p className={styles.bodyText}>
            For an adult, an observation deck or teamLab museum starts at ¥1,500 to ¥3,800, and a theme park or
            studio day starts at ¥3,900 to ¥8,900. Several of these change with the date, so a &quot;from&quot;
            price is the published minimum.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Attraction", "Adult price", "Book ahead?", "Same-day tickets", "Cancel or change", "Checked", "Details"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider}>{row.name}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.book}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                      <td style={{ fontSize: "0.88rem" }}>{checkedLabel(row.checked)}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        <Link href={row.href} style={linkStyle}>Guide</Link>
                        {row.klook && (
                          <>
                            {" · "}
                            <KlookLink href={row.klook} target="_blank" rel="sponsored noopener" style={linkStyle}>
                              Klook
                            </KlookLink>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Official adult prices and terms, read on the operator&apos;s site on the date shown. Klook sets its
            own price and cancellation terms, so open the listing for your date. Go kart prices are per person
            across Street Kart&apos;s own price tables.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={PRICES.teamlabBorderless.klook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Borderless on Klook →
            </KlookLink>
            <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo day tour on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTourPicks
          heading="Tokyo bookings worth having in place"
          intro="The transport pass, a day tour, a night food tour, somewhere to stay, the airport run, a multi-attraction pass and data for your phone, plus the deck ticket and the Fuji coach. Open a listing for the current price on your date."
          tours={bookingPicks}
        />

        {/* Top picks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>What are the top things to do in Tokyo?</h2>
          <p className={styles.bodyText}>
            The top things to do in Tokyo are a deck at sunset, a teamLab museum, one park day and an evening of
            small bars and food. Add a shrine, a garden and a day trip, and you have a full first visit.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>A view from above:</strong> <Link href="/guides/attractions/shibuya-sky-tickets" style={linkStyle}>Shibuya Sky</Link> at sunset, or <Link href="/guides/attractions/tokyo-tower-tickets" style={linkStyle}>Tokyo Tower</Link> with no booking.</li>
            <li><strong>Digital art:</strong> <Link href="/guides/attractions/teamlab-planets-tickets" style={linkStyle}>teamLab Planets</Link> or <Link href="/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>teamLab Borderless</Link>.</li>
            <li><strong>A park day:</strong> <Link href="/guides/attractions/tokyo-disney-tickets" style={linkStyle}>Tokyo Disney</Link>, <Link href="/guides/attractions/sanrio-puroland-tickets" style={linkStyle}>Sanrio Puroland</Link> or indoor <Link href="/guides/attractions/tokyo-joypolis-tickets" style={linkStyle}>Tokyo Joypolis</Link>.</li>
            <li><strong>An evening out:</strong> a <Link href="/guides/attractions/tokyo-night-food-tour" style={linkStyle}>night food tour</Link> through Omoide Yokocho and Golden Gai.</li>
            <li><strong>Something hands-on:</strong> a <Link href="/guides/attractions/tokyo-go-kart" style={linkStyle}>Tokyo go kart</Link> tour if you hold the right permit.</li>
          </ul>
        </section>

        {/* Booking urgency */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Book or walk in</span>
          <h2 className={styles.sectionTitle}>How far ahead should you book Tokyo attractions?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Attraction", "Book by", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Free */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Free</span>
          <h2 className={styles.sectionTitle}>What can you do in Tokyo for free?</h2>
          <p className={styles.bodyText}>
            You can see the city from 202 metres, walk the Meiji Jingu forest and the Imperial Palace East
            Gardens, and cross Shibuya Scramble without buying a ticket. All four cost nothing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Place", "What to know", "Checked", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {freeRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.checked}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            In winter, some of the{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" style={linkStyle}>Tokyo illuminations</Link>{" "}
            are free as well.
          </p>
        </section>

        {/* Subway ticket */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>Is the Tokyo Subway Ticket worth it?</h2>
          <p className={styles.bodyText}>
            Usually yes for the 72-hour ticket, and only on a busy day for the 24-hour one. At{" "}
            {PRICES.tokyoSubwayTicket.adult} for 24 hours, ¥1,500 for 48 and ¥2,000 for 72, the longest ticket
            works out to about ¥667 a day, which roughly four short rides cover at ¥178 to ¥324 a ride on an IC
            card. The 24-hour ticket needs five or six.
          </p>
          <p className={styles.bodyText}>
            It covers Tokyo Metro and Toei lines but not JR, so the Yamanote Line is not included. Our{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={linkStyle}>Tokyo Subway Ticket guide</Link>{" "}
            has the full break-even. Prices and fares read off tokyometro.jp on {SUBWAY_CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Subway Ticket on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Planning</span>
          <h2 className={styles.sectionTitle}>How many days do you need in Tokyo?</h2>
          <p className={styles.bodyText}>
            Three days covers the main sights, and five leaves room for two day trips out of the city. Fix the timed entries first, then fill the gaps with walk-in sightseeing.
            Our <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>Tokyo 3-day itinerary</Link>{" "}
            and <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>Tokyo 5-day itinerary</Link>{" "}
            lay out each day.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo day tour on Klook →
            </KlookLink>
            <KlookLink href={shinjukuNightFoodWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Night food tour on Klook →
            </KlookLink>
            <KlookLink href={tokyoStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shinjuku hotels on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Views from above */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Views from above</span>
          <h2 className={styles.sectionTitle}>Which Tokyo observation deck should you pick?</h2>
          <p className={styles.bodyText}>
            <strong>Shibuya Sky</strong> is the open-air rooftop above the Shibuya Scramble Crossing and the
            one deck where the slot matters. An adult booked online pays {SKY_ONLINE_DAY} to enter before 15:00
            and {SKY_ONLINE_LATE} from 15:00; the 14th-floor counter charges {SKY_DOOR_DAY} and {SKY_DOOR_LATE}{" "}
            (official prices, checked {SKY_CHECKED}). Sunset always falls in the later band, and those slots
            are what sell out. See our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={linkStyle}>Shibuya Sky tickets guide</Link>.{" "}
            <strong>Tokyo Skytree</strong> is the altitude option, {PRICES.tokyoSkytree.adult} for Floor 350 —{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets" style={linkStyle}>our guide</Link> explains
            why adding Floor 450 up front is cheaper than adding it on site.
          </p>
          <p className={styles.bodyText}>
            Before paying for any of them, read our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>observation decks comparison</Link>,
            which puts all four side by side — including the Tokyo Metropolitan Government Building in
            Shinjuku, whose 202-metre deck is free.
          </p>
        </section>

        {/* teamLab */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Digital art</span>
          <h2 className={styles.sectionTitle}>Which teamLab museum should you book?</h2>
          <p className={styles.bodyText}>
            Tokyo has two teamLab digital-art museums — Planets in Toyosu and Borderless in Azabudai — both
            immersive, walk-through experiences that use timed entry and sell out fast. Our{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets" style={linkStyle}>teamLab tickets guide</Link>{" "}
            compares the two and explains which suits your trip and how to book before they&apos;re gone.
          </p>
        </section>

        {/* Theme parks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Theme parks</span>
          <h2 className={styles.sectionTitle}>Should you book Tokyo Disney or the Warner Bros. Studio Tour?</h2>
          <p className={styles.bodyText}>
            <strong>Tokyo Disney</strong> (Disneyland and DisneySea) uses date-specified tickets that sell out
            weeks ahead, with no gate sales — and the official site can block foreign cards. Our{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets" style={linkStyle}>Tokyo Disney tickets guide</Link>{" "}
            explains how to buy and how to choose between the two parks. For Harry Potter fans, the{" "}
            <strong>Warner Bros. Studio Tour Tokyo</strong> is the Harry Potter studio tour in Nerima, with
            timed entry, no re-entry and about four hours to allow — details in our{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" style={linkStyle}>studio tour guide</Link>.
          </p>
        </section>

        {/* Experiences */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Experiences</span>
          <h2 className={styles.sectionTitle}>Which hands-on experiences are worth booking in Tokyo?</h2>
          <p className={styles.bodyText}>
            The hands-on things are mostly easy to book late, with one exception.{" "}
            <strong>Street go-karting</strong> lets you drive Tokyo&apos;s public roads in costume, but it
            needs an International Driving Permit, and an IDP has to be issued in your own country before you
            fly — our <Link href="/guides/attractions/tokyo-go-kart" style={linkStyle}>Tokyo go kart guide</Link>{" "}
            covers the price, the IDP rules and which tour to book. To see the national sport, our{" "}
            <Link href="/guides/attractions/sumo-tokyo-tickets" style={linkStyle}>sumo in Tokyo guide</Link>{" "}
            explains tournament tickets, which Tokyo only sells in January, May and September, against the
            year-round morning practice tours.
          </p>
          <p className={styles.bodyText}>
            For the quieter end,{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>kimono rental</Link> in
            Asakusa is a half-day commitment with a fixed return time rather than a costume hire, a{" "}
            <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>tea ceremony</Link> runs under
            an hour and is taught in English at most visitor-facing listings, and a{" "}
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" style={linkStyle}>samurai and ninja experience</Link>{" "}
            covers three fairly different things sold under one name.
          </p>
        </section>

        {/* Food */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Eating</span>
          <h2 className={styles.sectionTitle}>Is a food tour in Tokyo worth booking?</h2>
          <p className={styles.bodyText}>
            Tokyo is a city where the best food is often behind a door you would not push open on your own —
            the six-seat izakaya counters of Omoide Yokocho, the bars of Golden Gai. That is the actual
            argument for a <Link href="/guides/attractions/tokyo-food-tour" style={linkStyle}>guided food tour</Link>:
            not the food, which you could find, but the rooms. If you would rather take something home, a{" "}
            <Link href="/guides/attractions/tokyo-cooking-class" style={linkStyle}>cooking class</Link> runs a
            couple of hours in English and sends you away able to repeat the dish.
          </p>
        </section>

        {/* Day trips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Beyond the city</span>
          <h2 className={styles.sectionTitle}>What are the best day trips from Tokyo?</h2>
          <p className={styles.bodyText}>
            <Link href="/guides/attractions/kamakura-day-trip" style={linkStyle}>Kamakura</Link> is the one to
            take if you only have a spare morning&apos;s worth of planning in you: under an hour on a single
            JR line that a rail pass already covers, with the open-air Great Buddha and Hase-dera a few
            minutes apart.{" "}
            <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko</Link> is two hours north
            for a UNESCO shrine and a mountain waterfall, and the buses between them are the part to plan.
          </p>
          <p className={styles.bodyText}>
            For Mt. Fuji there are two separate questions. If you want the Lake Kawaguchi viewpoints, our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>Mt. Fuji day trip guide</Link>{" "}
            covers the direct train and the Mt. Fuji Pass; if you want the Subaru Line Fifth Station on the
            mountain, that needs a coach, and our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>tour comparison</Link>{" "}
            sorts the itineraries.{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>Hakone</Link> is the
            hot-spring alternative, where one pass covers the entire loop.
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

        {/* A round-up recommends a week, not a product, so this is a second catalogue
            rather than a second checkout. Nothing above is changed. */}
        <GygCompare
          slug="things-to-do-tokyo"
          heading="A Second Catalogue for the Same City"
          intro="Nothing on this page depends on one seller. If you are filling in dates and something above is sold out — a Shibuya Sky slot, a Fuji coach, a teamLab entry — GetYourGuide's Tokyo catalogue is the other place to search by date, and it carries operators Klook does not."
          listings={[gygTokyo, gygTokyoEntryTickets]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 9 Nov 2026: the top picks arranged into two days. */}
            <Link href="/guides/attractions/tokyo-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 1 Nov 2026: the one Tokyo district where the free version of the day is the good one. */}
            <Link href="/guides/attractions/akihabara-anime-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Akihabara Anime Tour (2026): Guided Tours, Shop Hours &amp; How to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 1 Nov 2026: the winter day trip that leaves from Tokyo Station and needs no transfer. */}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Gala Yuzawa Ski Day Trip from Tokyo: 71 Min, ¥8,000 Lifts</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-night-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3h14l-1 9a6 6 0 0 1-12 0z" />
                  <path d="M12 21v-3M8 21h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Night Food Tour (2026): Omoide Yokocho, Golden Gai and the 20+ Rule</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-illumination-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="4" />
                  <path d="M12 2v2M12 18v4M4 10H2M22 10h-2M5.6 3.6 7 5M18.4 3.6 17 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-planets-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Price, Hours and How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-borderless-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Borderless Tickets (2026): Price, How to Book and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-joypolis-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <circle cx="12" cy="10" r="2" />
                  <path d="M8 20h8M12 16v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Joypolis Tickets (2026): Passport Prices, Hours &amp; Height Limits</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <path d="M11 18h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Compared by Price &amp; Network</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-bay-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 18h20l-2 3H4z" />
                  <path d="M4 18V8h16v10" />
                  <path d="M12 8V4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices</p>
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
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sanrio Puroland Tickets (2026): Prices, Variable Pricing &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/fuji-q-highland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fuji-Q Highland Tickets (2026): Free Pass Prices, the Q Pack &amp; How to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v8a3 3 0 0 0 6 0V3" />
                  <path d="M9 11v10" />
                  <path d="M17 3c-1.5 2-2 4-2 6h4c0-2-.5-4-2-6z" />
                  <path d="M17 9v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Food Tour (2026): Which Neighbourhood, and What a Tour Adds</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-cooking-class" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16" />
                  <path d="M5 12a7 7 0 0 1 14 0" />
                  <path d="M6 16h12l-1 4H7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Cooking Class (2026): Sushi, Ramen and What to Expect</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l9-9" />
                  <path d="M14 10l7-7" />
                  <path d="M12 12l5 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Samurai and Ninja Experience in Tokyo (2026): Which Kind to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nikko-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M6 21V9l6-4 6 4v12" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nikko Day Trip From Tokyo (2026): Getting There, Costs &amp; Whether to Take a Tour</p>
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
                <p className={styles.relatedTitle}>All Things to Do in Japan: Tickets &amp; Experiences →</p>
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-4 7 4v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Every guide for this city, generated from the `city` field in lib/guides-*.ts. */}
        <CityGuideIndex city="tokyo" exclude="/guides/attractions/things-to-do-tokyo" />
      </div>
    </>
  );
}
