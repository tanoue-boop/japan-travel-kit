import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  hatoBusAfternoonTour,
  hatoBusMorningTour,
  klookEsim,
  skyhopBusDayTicket,
  skyhopHopOnHopOffBus,
  tokyoBusTourTripPrep,
  tokyoOpenTopBusSightseeing,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * ---------------------------------------------------------------------------
 * /guides/attractions/tokyo-sightseeing-bus-tour — written 15 Nov 2026
 * (task-jtk-20261115-02)
 *
 * Next to its neighbours:
 *  - things-to-do-tokyo answers "what to see"; tokyo-2-day-itinerary answers "in what order";
 *  - tokyo-subway-ticket answers "how to get around on your own";
 *  - this page answers "which bus to see Tokyo from, and is it worth it over the subway".
 *
 * Sourcing, read on 15 November 2026:
 *
 *   - skyhopbus.com (home and /faq), read directly: 1 Day Ticket adults ¥4,800, children
 *     ¥2,400; 2 Day Ticket ¥7,000 / ¥3,500. Blue (Tokyo Tower, Odaiba, Tsukiji, Ginza), Red
 *     (Ryogoku, Skytree, Asakusa, Ueno, Akihabara) and Green (Shinjuku, Shibuya, Tokyo
 *     Tower) routes, 19 stops, Marunouchi Mitsubishi Building as the shared stop. Same-day
 *     ticket valid on the day only (not 24 hours); 2-day ticket two consecutive days.
 *     Under-6s free on a lap. Runs in rain with ponchos, may pause for lightning or heavy
 *     rain. No reserved seats, no luggage, no toilets; audio guide in 7 languages. Online
 *     tickets usable within 3 months of purchase. Notice of 15 Nov course changes.
 *   - hatobus.com/v01/en/course — Hato Bus's English course list. The site closes
 *     automated connections, so its current entries were read through the search index
 *     on 15 Nov 2026: AE301 TOKYO MORNING ¥6,300, 08:20–09:00 to around 13:00, from
 *     Shinjuku Station East Exit or Tokyo Station Marunouchi South Exit; AE302 TOKYO
 *     AFTERNOON ¥6,300, 14:00 to around 18:00, from Tokyo Station Marunouchi South Exit.
 *     Both: Imperial Palace Plaza, Tokyo Tower, Asakusa Kannon Temple and Nakamise, in
 *     English, no meal, editions running until December 2026. No child price was
 *     readable for these editions, so none is printed.
 *   - tokyometro.jp, read 8 Nov 2026 for our subway guide: Tokyo Subway Ticket ¥1,000 /
 *     ¥1,500 / ¥2,000 for 24 / 48 / 72 hours.
 *
 * Klook facts (full-day coach 5672, open-top loop 89277, Hato Bus 102622 / 101129) come
 * from the www.klook.com search index on 15 Nov 2026. No Klook price appears, and
 * nothing here is first-hand.
 *
 * Rank pass, 27 Nov 2026 (task-jtk-20261127-R08): retitled around "Tokyo bus tours" and
 * "hop-on hop-off", which is what the page's search queries ask for. skyhopbus.com (home
 * and /faq) re-read by node fetch on 27 Nov 2026 — same prices, three routes, 19 stops,
 * Marunouchi Mitsubishi Building (2-5 Marunouchi) as stop B1 of every route, under-6s
 * free on a lap. Hato Bus's English course list re-read through the search index on the
 * same day: AE301 / AE302 still ¥6,300. Klook 617 (Skyhop 1day / 2days ticket) and 5672
 * confirmed live in the www.klook.com index on 27 Nov 2026.
 * ---------------------------------------------------------------------------
 */

const CHECKED_ISO = "2026-11-27";
const CHECKED = checkedLabel(CHECKED_ISO);
const HATO_URL = "https://www.hatobus.com/v01/en/course";
const SKYHOP_URL = "https://skyhopbus.com/";
const SKYHOP_FAQ_URL = "https://skyhopbus.com/faq/";
const METRO_URL = "https://www.tokyometro.jp/en/ticket/travel/index.html";

const TITLE = "Tokyo Bus Tours 2026: Hop-On Hop-Off vs Hato Bus (Prices)";
const DESCRIPTION =
  "Tokyo bus tours compared: the Sky Hop Bus hop-on hop-off is ¥4,800 for 1 day or ¥7,000 for 2 days on 3 routes; Hato Bus English half-day tours are ¥6,300.";

/** Table 1 — every bus option, one row per course. First row is the verdict. */
const busRows = [
  {
    name: "Verdict: first visit with half a day → Hato Bus English half-day; your own pace → Sky Hop Bus 1-day ticket",
    price: "¥6,300 / ¥4,800",
    time: "About 4–4.5 hours / the whole boarding day",
    board: "Tokyo Station Marunouchi South Exit / Marunouchi Mitsubishi Building",
    english: "Live English guide / audio guide",
    verdict: true,
  },
  {
    name: "Hato Bus AE301 Tokyo Morning",
    price: "¥6,300",
    time: "08:20–09:00 start, back about 13:00",
    board: "Shinjuku Station East Exit or Tokyo Station Marunouchi South Exit",
    english: "English-speaking guide",
  },
  {
    name: "Hato Bus AE302 Tokyo Afternoon",
    price: "¥6,300",
    time: "14:00 start, back about 18:00",
    board: "Tokyo Station Marunouchi South Exit",
    english: "English-speaking guide",
  },
  {
    name: "Sky Hop Bus Red route (Asakusa, Tokyo Skytree, Ryogoku, Ueno, Akihabara)",
    price: "1 day ¥4,800 (child ¥2,400); 2 days ¥7,000 (¥3,500) — all routes on one ticket",
    time: "Hop on and off until the last bus; 1-day ticket valid on the boarding day only",
    board: "Marunouchi Mitsubishi Building, or any Red stop",
    english: "Audio guide in 7 languages",
  },
  {
    name: "Sky Hop Bus Blue route (Tokyo Tower, Odaiba, Tsukiji, Ginza)",
    price: "Same ticket",
    time: "Same ticket validity",
    board: "Marunouchi Mitsubishi Building, or any Blue stop",
    english: "Audio guide in 7 languages",
  },
  {
    name: "Sky Hop Bus Green route (Shinjuku, Shibuya, Tokyo Tower)",
    price: "Same ticket",
    time: "Same ticket validity",
    board: "Marunouchi Mitsubishi Building, or any Green stop",
    english: "Audio guide in 7 languages",
  },
  {
    name: "Tokyo 1-day bus tour (Klook): Imperial Palace garden, Asakusa, Skytree, Tokyo Bay cruise (sometimes replaced)",
    price: "See the listing",
    time: "A full day",
    board: "Set in the listing",
    english: "English-speaking guide",
  },
  {
    name: "Open-top 70-minute loop (Klook)",
    price: "See the listing",
    time: "70 minutes, no stops",
    board: "Check-in at the Tokyo VIP Lounge, per the listing",
    english: "Recorded multilingual guidance",
  },
];

/** Table 2 — bus vs subway vs guide. */
const compareRows = [
  {
    way: "Bus tour (Hato Bus half-day)",
    cost: "¥6,300 for half a day",
    freedom: "Low: fixed route and times",
    best: "A first day, jet lag, older travellers, or anyone who wants an English explanation",
  },
  {
    way: "Hop-on hop-off (Sky Hop Bus)",
    cost: "¥4,800 for the day",
    freedom: "Medium: three loops, get off where you like",
    best: "Sightseeing from above without planning transfers; good on a dry day",
  },
  {
    way: "Tokyo Subway Ticket",
    cost: "¥1,000 / ¥1,500 / ¥2,000 for 24 / 48 / 72 hours",
    freedom: "High: every Tokyo Metro and Toei line (not JR), your own pace",
    best: "Second and later days, or anyone happy reading a metro map",
  },
  {
    way: "Private guide",
    cost: "Set by each guide, per group",
    freedom: "Highest: your route, your pace",
    best: "Families or groups who can split the cost and want a custom day",
  },
];

const faqItems = [
  {
    q: "What is the best Tokyo bus tour for first-timers?",
    a: "A Hato Bus English half-day tour. For ¥6,300 it covers the Imperial Palace Plaza, Tokyo Tower and Senso-ji in Asakusa with an English-speaking guide in about four to four and a half hours, from Tokyo Station (or Shinjuku in the morning). If you would rather choose your own stops, the Sky Hop Bus at ¥4,800 for the day is the alternative.",
  },
  {
    q: "Is the Sky Hop Bus 1-day ticket valid for 24 hours?",
    a: "No. Sky Hop Bus states the 1-day ticket is valid only on the day of boarding, not for 24 hours, and the 2-day ticket for two consecutive days from the first boarding, not 48 hours. Start in the morning to get the most from it.",
  },
  {
    q: "Do Tokyo bus tours run in the rain?",
    a: "The Sky Hop Bus runs in the rain and hands out ponchos; it may stop running in thunderstorms or very heavy rain. A Hato Bus coach tour is enclosed, so rain affects only the walking stops.",
  },
  {
    q: "Can children ride the Sky Hop Bus?",
    a: "Yes. Under-6s ride free on a guardian's lap, and a child who needs a seat pays the ¥2,400 child fare for one day. There are no toilets on board and no space for luggage.",
  },
  {
    q: "Bus tour or Tokyo Subway Ticket?",
    a: "Use a bus tour for your first half-day, when an English guide and a door-to-door route save the most effort, then the subway for the rest of the trip. The Tokyo Subway Ticket is ¥1,000 for 24 hours on all Metro and Toei lines, so it is far cheaper per day — but there is no guide and you plan the route yourself.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-sightseeing-bus-tour") } });

export default function TokyoSightseeingBusTourPage({ updated }: { updated: PageUpdated }) {
  const muted = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
  const sourceLink = { color: "var(--text)", fontWeight: 600 } as const;
  const bodyLink = { color: "var(--red)", fontWeight: 600 } as const;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-sightseeing-bus-tour" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-sightseeing-bus-tour" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
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
                  name: "Tokyo Bus Tours",
                  item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-sightseeing-bus-tour",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/tokyo-sightseeing-bus-tour",
              headline: TITLE,
              description: DESCRIPTION,
              updated,
            }),
          }}
        />
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
          <span className={styles.breadCurrent}>Tokyo Bus Tours</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Bus Tours 2026: <br />Hop-On Hop-Off vs Hato Bus (Prices)
          </h1>
          <p className={styles.heroSubtitle}>
            The Sky Hop Bus hop-on hop-off, Hato Bus&apos;s English half-day and Klook&apos;s 1-day bus tour,
            compared on price, time, boarding point and English — and against simply taking the subway.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Operators' own figures", "Bus vs subway vs guide"].map((t) => (
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

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Sky Hop Bus 1 day / 2 days</p>
                <p className={styles.verdictStatValue}>¥4,800 / ¥7,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Sky Hop Bus routes</p>
                <p className={styles.verdictStatValue}>3 routes, 19 stops</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hato Bus English half-day</p>
                <p className={styles.verdictStatValue}>¥6,300</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Boarding</p>
                <p className={styles.verdictStatValue}>Marunouchi, Tokyo Station</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              Tokyo&apos;s <strong>hop-on hop-off bus</strong>, the open-top <strong>Sky Hop Bus</strong>, costs{" "}
              <strong>¥4,800 for a 1-day ticket and ¥7,000 for a 2-day ticket</strong> (adults) on 3 routes with 19
              stops, all starting at the Marunouchi Mitsubishi Building by Tokyo Station. Hato Bus&apos;s{" "}
              <strong>English-guided half-day tours</strong> (Tokyo Morning and Tokyo Afternoon) cost{" "}
              <strong>¥6,300</strong> for about 4 to 4.5 hours from Tokyo Station. On a first visit with half a day,
              take the Hato Bus tour; to choose your own stops, take the Sky Hop Bus. Prices from Sky Hop Bus and
              Hato Bus, checked {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={skyhopBusDayTicket.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Sky Hop Bus 1-day / 2-day ticket →
              </KlookLink>
              <KlookLink
                href={tokyoSightseeingBusTour.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Tokyo 1-day bus tour →
              </KlookLink>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
              For the rest of the trip:{" "}
              <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" style={bodyLink}>
                Tokyo Subway Ticket (24 / 48 / 72 hours) →
              </KlookLink>{" "}
              ·{" "}
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={bodyLink}>
                Japan eSIM for maps and the audio guide →
              </KlookLink>
            </p>
          </div>
        </div>

        <EsimCtaTop />

        {/* Compare */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Bus Tour Should You Take?</h2>
          <p className={styles.bodyText}>
            On a first visit with half a day, the Hato Bus English half-day; with a full day and your own plan, the
            Sky Hop Bus. The table puts every course side by side: price, time, where you board and the kind of
            English commentary.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Price (adult)", "Duration", "Where to board", "English"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busRows.map((row) => (
                    <tr key={row.name} style={row.verdict ? { fontWeight: 600 } : undefined}>
                      <td className={styles.tdProvider}>{row.name}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.board}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.english}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked: {CHECKED}. Sources:{" "}
            <a href={SKYHOP_URL} target="_blank" rel="noopener" style={sourceLink}>
              skyhopbus.com
            </a>{" "}
            (tickets, routes, stops) and its{" "}
            <a href={SKYHOP_FAQ_URL} target="_blank" rel="noopener" style={sourceLink}>
              FAQ
            </a>{" "}
            (ticket validity, children);{" "}
            <a href={HATO_URL} target="_blank" rel="noopener" style={sourceLink}>
              Hato Bus English course list
            </a>{" "}
            (editions running until December 2026). The Klook 1-day tour and the 70-minute loop are described as
            their Klook listings describe them; open a listing for the price on your date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={skyhopBusDayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Sky Hop Bus ticket →
            </KlookLink>
            <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Tokyo 1-day bus tour →
            </KlookLink>
            <KlookLink href={hatoBusMorningTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hato Bus morning tour →
            </KlookLink>
          </div>
        </section>

        {/* Is there a hop-on hop-off bus */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hop-on hop-off</span>
          <h2 className={styles.sectionTitle}>Is There a Hop-On Hop-Off Bus in Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes: the <strong>Sky Hop Bus</strong>, an open-top double-decker on 3 routes with 19 stops, where one
            ticket lets you get on and off at any stop and change between routes. Its Red route covers Asakusa,
            Tokyo Skytree, Ryogoku, Ueno and Akihabara; the Blue route Tokyo Tower, Odaiba (Fuji Television and
            Tokyo Teleport Station), Tsukiji and Ginza; and the Green route Shinjuku, Shibuya and Tokyo Tower.
          </p>
          <p className={styles.bodyText}>
            Commentary is an audio guide in seven languages, not a live guide, and seats are not reserved — if a
            bus is full, you wait for the next one.
          </p>
        </section>

        {/* Hato Bus */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hato Bus</span>
          <h2 className={styles.sectionTitle}>Does Hato Bus Have English Tours?</h2>
          <p className={styles.bodyText}>
            Yes: two English-guided half-day courses, each <strong>¥6,300</strong> for an adult. <strong>Tokyo Morning
            (AE301)</strong> starts between 08:20 and 09:00 from Shinjuku Station East Exit or Tokyo Station
            Marunouchi South Exit and finishes around 13:00. <strong>Tokyo Afternoon (AE302)</strong> leaves Tokyo
            Station Marunouchi South Exit at 14:00 and finishes around 18:00. Both stop at the Imperial Palace Plaza,
            Tokyo Tower, and Asakusa&apos;s Senso-ji (Asakusa Kannon) with Nakamise Street, with an English-speaking
            guide and no meal.
          </p>
          <p className={styles.bodyText}>
            Those are the editions running until December 2026; Hato Bus lists a new edition from January 2027, so
            check the price for your date. Morning or afternoon? The route is the same; the afternoon start suits a
            morning arrival or a slow start after jet lag, and the morning one leaves the evening free.
          </p>
          <p className={styles.bodyText}>
            <strong>Before you book:</strong> Klook&apos;s Hato Bus listing states late arrivals and no-shows are
            not refunded, so allow time to find the Marunouchi South Exit — Tokyo Station is large. On the morning
            course, check which of the two starts your booking is for.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hatoBusAfternoonTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hato Bus afternoon tour →
            </KlookLink>
            <KlookLink href={hatoBusMorningTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hato Bus morning tour →
            </KlookLink>
          </div>
        </section>

        {/* Sky Hop Bus */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Sky Hop Bus price</span>
          <h2 className={styles.sectionTitle}>How Much Is the Tokyo Hop-On Hop-Off Bus?</h2>
          <p className={styles.bodyText}>
            The Sky Hop Bus <strong>1 Day Ticket is ¥4,800</strong> (children ¥2,400) and the{" "}
            <strong>2 Day Ticket ¥7,000</strong> (¥3,500); both cover all three routes — <strong>Red</strong> for Asakusa, Tokyo Skytree, Ryogoku, Ueno and Akihabara,{" "}
            <strong>Blue</strong> for Tokyo Tower, Odaiba, Tsukiji and Ginza, and <strong>Green</strong> for
            Shinjuku, Shibuya and Tokyo Tower — with 19 stops in all.
          </p>
          <p className={styles.bodyText}>
            Three things Sky Hop Bus states that decide whether it suits you: the one-day ticket is valid on the
            calendar day only, <strong>not for 24 hours</strong>, so start in the morning; seats are not reserved,
            and a full bus means waiting for the next one; and there is no luggage space and no toilet on board. The
            commentary is an audio guide in seven languages rather than a live guide. It is worth it on a dry day
            when you want several districts without planning trains; for one district, the subway is cheaper.
          </p>
          <p className={styles.bodyText} style={muted}>
            Last checked: {CHECKED}. Source:{" "}
            <a href={SKYHOP_URL} target="_blank" rel="noopener" style={sourceLink}>
              skyhopbus.com
            </a>{" "}
            and its{" "}
            <a href={SKYHOP_FAQ_URL} target="_blank" rel="noopener" style={sourceLink}>
              FAQ
            </a>
            .
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={skyhopBusDayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Sky Hop Bus 1-day / 2-day ticket →
            </KlookLink>
            <KlookLink href={skyhopHopOnHopOffBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Other Sky Hop Bus listing →
            </KlookLink>
            <KlookLink href={tokyoOpenTopBusSightseeing.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              70-minute open-top loop →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book With a Tokyo Bus Tour"
          intro="A bed near the departure point, the pass for the other days, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoBusTourTripPrep}
        />

        {/* Departure */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to go</span>
          <h2 className={styles.sectionTitle}>Where Do I Board the Sky Hop Bus?</h2>
          <p className={styles.bodyText}>
            At the <strong>Marunouchi Mitsubishi Building</strong> (2-5 Marunouchi, Chiyoda-ku), stop B1 and the
            starting point of all three routes, on the Marunouchi side of Tokyo Station; the Skybus ticket counter
            there sells tickets, and you can also board at any of the other 18 stops and pay on the bus. If you are
            staying in Shinjuku or Shibuya, start on the Green route there.
          </p>
          <p className={styles.bodyText}>
            Hato Bus&apos;s English tours leave from the Tokyo Station Marunouchi South Exit (the morning course
            also from Shinjuku Station East Exit), so both operators start within walking distance of each other.
          </p>
        </section>

        {/* Bus vs subway */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Bus or subway</span>
          <h2 className={styles.sectionTitle}>Is a Bus Tour Better Than the Subway or a Private Guide?</h2>
          <p className={styles.bodyText}>
            For one half-day, often yes; for a whole trip, no. A bus tour buys you an English explanation and no route
            planning. The subway is far cheaper per day and goes everywhere, and a private guide gives you both freedom
            and explanation at a higher price per group.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Way to see Tokyo", "Cost (adult)", "Freedom", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.way}>
                      <td className={styles.tdProvider}>{row.way}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.freedom}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked {CHECKED} for the buses; Tokyo Subway Ticket prices read on{" "}
            <a href={METRO_URL} target="_blank" rel="noopener" style={sourceLink}>
              tokyometro.jp
            </a>{" "}
            on 8 November 2026. Private guides set their own rates, so no figure is given here.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            A common split: the bus tour on day one, then the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={bodyLink}>
              Tokyo Subway Ticket
            </Link>{" "}
            for the rest. For what to do with those days, see{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={bodyLink}>
              things to do in Tokyo
            </Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/tokyo-2-day-itinerary" style={bodyLink}>
              Tokyo 2-day itinerary
            </Link>
            . To see the Imperial Palace, Akasaka and Shibuya at street level instead of from a seat, a{" "}
            <Link href="/guides/attractions/tokyo-bike-tour" style={bodyLink}>
              Tokyo bike tour
            </Link>{" "}
            covers them in 3 hours.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Tokyo Subway Ticket →
            </KlookLink>
          </div>
        </section>

        {/* Weather and kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather and kids</span>
          <h2 className={styles.sectionTitle}>What Happens to a Bus Tour in the Rain, and Can Kids Come?</h2>
          <p className={styles.bodyText}>
            The Sky Hop Bus runs in the rain and hands out ponchos; it may pause for lightning or a sudden downpour,
            and Sky Hop Bus warns of many rainy days from early June to late July and possible snow from January to
            March. On a wet day, the enclosed Hato Bus coach is the safer choice. Children under 6 ride the Sky Hop
            Bus free on a guardian&apos;s lap; elementary-school children pay the child fare. With small children,
            also see our{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={bodyLink}>
              Tokyo itinerary with kids
            </Link>
            .
          </p>
        </section>

        <EsimCtaBottom />

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
          heading="Tokyo Bus Tours on Klook"
          intro="The guided half-days, the hop-on hop-off ticket and the full-day coach. Open a listing for the current price on your dates."
          tours={[skyhopBusDayTicket, tokyoSightseeingBusTour, hatoBusAfternoonTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo 2026: Top Picks and Ticket Prices" },
              { href: "/guides/attractions/tokyo-bike-tour", title: "Tokyo Bike Tour (2026): E-Bike, Night Rides & Bike Rules" },
              { href: "/guides/attractions/tokyo-2-day-itinerary", title: "Tokyo 2 Day Itinerary" },
              { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket" },
              { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary With Kids" },
              { href: "/guides/attractions/tokyo-illumination-tours", title: "Tokyo Illumination Tours" },
              { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "Mt. Fuji Day Tour From Tokyo" },
              { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo" },
              { href: "/guides/attractions", title: "More Things to Do →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                    <path d="M12 7v10" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Half a day, three sights, one English guide</h2>
            <p className={styles.ctaBannerDesc}>
              Hato Bus&apos;s English half-day is ¥6,300 from Tokyo Station. Rather go at your own pace? The Sky Hop
              Bus is ¥4,800 for the day.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hatoBusAfternoonTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Hato Bus tour →
              </KlookLink>
              <KlookLink href={skyhopBusDayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Sky Hop Bus →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
