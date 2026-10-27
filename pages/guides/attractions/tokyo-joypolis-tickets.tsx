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
  tokyoBaySunsetBoatCruise,
  tokyoBayYakatabuneDinnerShow,
  tokyoJoypolisPassport,
  tokyoJoypolisTicket,
  tokyoSightseeingBusTour,
} from "../../../lib/klook-links";

/**
 * Tokyo Joypolis — Sega's indoor park on floors 3 to 5 of DECKS Tokyo Beach in Odaiba.
 *
 * Every price, hour, access detail and height limit below was read off the operator's own
 * site, tokyo-joypolis.com, on 22 Oct 2026: the Japanese ticket page (/ticket/), the English
 * edition (/language/english/), the access page (/access/) and the attraction list
 * (/attraction/). Nothing here is first-hand.
 *
 * Two things that would be easy to get wrong and are deliberately spelled out:
 *
 * - The park sells an admission ticket and a passport separately, and it also sells the
 *   passport at a lower "館内料金" to someone already inside on an admission ticket. The two
 *   add up to the same figure, which is why neither route is a saving — and why the page says so
 *   rather than implying the in-park price is a discount.
 * - Under-110 cm pre-schoolers get in free, but the great majority of the rides are 110 cm or
 *   taller. A free ticket is not the same as a usable visit, and the height table is the answer.
 *
 * No Klook price appears: Klook answers automated reads of its product pages with HTTP 403,
 * so there is no figure here we could have verified.
 */

/** Everything on this page was read off tokyo-joypolis.com on this date. */
const CHECKED_ISO = "2026-10-22";
const CHECKED = checkedLabel(CHECKED_ISO);

const priceRows = [
  {
    ticket: "Admission only (入場券)",
    adult: "¥1,700",
    child: "¥1,400",
    what: "Gets you through the door. Every ride is then paid for individually",
  },
  {
    ticket: "Passport (パスポート)",
    adult: "¥6,000",
    child: "¥5,000",
    what: "Admission plus unlimited rides for the day — the ticket almost everyone wants",
  },
  {
    ticket: "Passport bought inside the park (館内料金)",
    adult: "¥4,300",
    child: "¥3,600",
    what: "The upgrade price once you are already in on an admission ticket. ¥1,700 + ¥4,300 = ¥6,000, so it is not a discount",
  },
  {
    ticket: "Evening Passport (イブニングパスポート)",
    adult: "¥5,000",
    child: "¥4,000",
    what: "Sold from 15:00, or 16:00 on days the park closes at 22:00. Unlimited rides for the rest of the day",
  },
  {
    ticket: "Evening Passport bought inside the park",
    adult: "¥3,300",
    child: "¥2,600",
    what: "Same arithmetic as above — ¥1,700 + ¥3,300 = ¥5,000",
  },
  {
    ticket: "CHOI-NORI-NIGHT 2-ride ticket (ちょいのりナイト2回券)",
    adult: "¥3,100",
    child: "¥3,100",
    what: "Admission plus any two rides, one price from elementary-school age up. Sold from 17:00, or 18:00 on 22:00-closing days",
  },
  {
    ticket: "Annual Passport (年間パスポート)",
    adult: "¥29,000",
    child: "¥24,000",
    what: "A year of unlimited rides — relevant only if you live in Tokyo",
  },
];

const heightRows = [
  {
    limit: "No height limit",
    rides:
      "Pirate's Plunder, NARUTO Music Dancer, MISSION SPARK, Gyakuten Saiban in Joypolis, Fortune Forest, Laura & Carla, Attack on Titan THE ATTRACTION, MURDER LODGE",
    note: "Eight of the twenty-one — enough to fill a visit with a small child, but none of them is a thrill ride",
  },
  {
    limit: "90 cm and over",
    rides: "Spicy Taxi, House of the Dead ~Scarlet Dawn~ THE ATTRACTION",
    note: "The lowest limit in the park",
  },
  {
    limit: "110 cm and over",
    rides:
      "LASER SHOOTING ISSEN, Sonic Athletics, Ayakashi Yashiki, Wild Wing, Wild Jungle Brothers, Wild River The Treasure Hunt",
    note: "The band that decides most family visits — and the same 110 cm the free-entry rule uses",
  },
  {
    limit: "130 cm and over",
    rides: "Gekion Live Coaster, Halfpipe Tokyo, Transformers Human Alliance Special",
    note: "The indoor coaster and the halfpipe — the two rides Joypolis is known for",
  },
  {
    limit: "140 cm and over, with an upper limit",
    rides: "Sadako ~Kurui Uranai no Yakata~ (140–185 cm), Storm-G (140–200 cm)",
    note: "The only two with a maximum as well as a minimum",
  },
];

const whoFor = [
  {
    title: "Buy the Passport if…",
    desc: `Anyone in your group wants more than two rides. At ¥6,000 for an adult and ¥5,000 for a school-age child it is the only ticket that stops you doing arithmetic at every queue, and it is what the park is designed around. Prices read off tokyo-joypolis.com on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <circle cx="8" cy="14.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Buy admission only if…",
    desc: `You are going for the arcade floors, or you are the adult holding the bags. Entry is ¥1,700 for an adult and ¥1,400 for a school-age child, and you can upgrade to the full passport inside for ¥4,300 — which totals the same ¥6,000, so nothing is lost by deciding on the spot. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
        <path d="M12 6v12" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    title: "Buy an evening ticket if…",
    desc: `Joypolis is the back half of an Odaiba day. The Evening Passport goes on sale at 15:00 — 16:00 when the park closes at 22:00 — at ¥5,000 adult and ¥4,000 child, and the CHOI-NORI-NIGHT 2-ride ticket is ¥3,100 from 17:00 for anyone of elementary-school age and up. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check the date on the official calendar first",
    desc: `This is the one step you cannot skip. Joypolis does not publish a single set of opening hours — the official site runs a calendar and states that hours are published per period and may change without notice. Which evening ticket exists on your date, and when it goes on sale, depends on whether the park closes at 22:00. Read on ${CHECKED}.`,
  },
  {
    title: "Decide the ticket before you decide the seller",
    desc: "Admission, Passport, Evening Passport and the two-ride night ticket are four different products, and the gap between the cheapest and the dearest is more than ¥4,000. Pick from the table above, then open a seller — not the other way round.",
  },
  {
    title: "Book ahead if you want an English checkout or a foreign card",
    desc: "Joypolis sells at the door, so a sell-out is not the risk here — the awkward part is paying. Klook's listing checks out in English, takes foreign cards, and gives you a mobile QR code to scan at the entrance instead of a ticket queue. Its listing also advertises same-day booking with instant confirmation and free cancellation; confirm the cancellation window shown for your own date before you pay.",
  },
  {
    title: "Arrive at least 90 minutes before closing, and earlier than that",
    desc: `Last entry is 45 minutes before the park closes, which is the hard edge of the day. Beyond that, Klook's own listing suggests allowing 2 to 4 hours, and the rides are spread over three floors — turning up an hour before closing buys you a walk around. Last-entry rule read off tokyo-joypolis.com on ${CHECKED}.`,
  },
  {
    title: "Keep your Joypolis card for re-entry",
    desc: `The official English page states that re-entry on the day of issue is unlimited for Joypolis card holders, and the Japanese site adds that re-entry is possible until 45 minutes before closing. That is what makes Joypolis combine with the rest of Odaiba rather than consume the whole day. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much are Tokyo Joypolis tickets?",
    a: `Admission on its own is ¥1,700 for an adult aged 18 and over and ¥1,400 for an elementary, middle or high-school student. The Passport, which adds unlimited rides for the day, is ¥6,000 for an adult and ¥5,000 for a student. The Evening Passport, on sale from 15:00 (16:00 on days the park closes at 22:00), is ¥5,000 and ¥4,000, and the CHOI-NORI-NIGHT ticket — admission plus any two rides, sold from 17:00 — is ¥3,100 for everyone from elementary-school age up. An annual passport is ¥29,000 adult and ¥24,000 student. All read off tokyo-joypolis.com on ${CHECKED}.`,
  },
  {
    q: "What is the difference between admission and the Joypolis Passport?",
    a: `Admission gets you inside the building; the Passport gets you onto the rides. With a ¥1,700 adult admission ticket you pay for each attraction individually, and you can upgrade to the full passport once you are inside for ¥4,300 — which comes to exactly the ¥6,000 the passport costs at the door, so buying in two steps neither saves nor costs you anything. If more than a couple of rides appeal, the Passport is the ticket. Checked ${CHECKED}.`,
  },
  {
    q: "Is there a cheaper Joypolis ticket for the evening?",
    a: `Yes, two of them. The Evening Passport is ¥5,000 for an adult and ¥4,000 for a student, ¥1,000 less than the day passport, and goes on sale at 15:00 on a normal day or 16:00 when the park closes at 22:00. Below that sits the CHOI-NORI-NIGHT 2-ride ticket at ¥3,100 for anyone of elementary-school age or older, on sale from 17:00 (18:00 on 22:00-closing days), which covers entry plus two attractions of your choice. Both read off the official ticket page on ${CHECKED}.`,
  },
  {
    q: "What are Tokyo Joypolis opening hours?",
    a: `There is no single answer, and that is the official position rather than an evasion: tokyo-joypolis.com publishes opening hours on a calendar per period and states they are subject to change without notice. Two rules do hold on every date — last entry is 45 minutes before the park closes, and re-entry is possible until 45 minutes before closing too. Because the evening tickets are tied to the closing time (15:00 or 16:00 for the Evening Passport, 17:00 or 18:00 for the night ticket), checking your date on the calendar also tells you which evening ticket exists. Read on ${CHECKED}.`,
  },
  {
    q: "How long do you need at Tokyo Joypolis?",
    a: "Klook's own listing suggests 2 to 4 hours, which matches the shape of the place: twenty-one attractions across three floors of a shopping complex, most of them five to ten minutes long, with queues in between. Half a day is generous; a full day is not what this park is for. Treat it as one block of an Odaiba day rather than the whole day, and use the re-entry rule to go out for lunch.",
  },
  {
    q: "How do you get to Tokyo Joypolis?",
    a: `It is on floors 3 to 5 of DECKS Tokyo Beach, at 1-6-1 Daiba, Minato-ku. The official access page gives two routes: the Yurikamome Line to Odaiba-Kaihinkoen Station, about a 2-minute walk, or the Rinkai Line to Tokyo Teleport Station, about a 5-minute walk. The same page lists Shimbashi to Odaiba-Kaihinkoen at roughly 13 minutes and Toyosu at roughly 18, and puts Shibuya at about 18 minutes, Shinjuku about 23 and Ikebukuro about 29 via the Rinkai Line. The operator asks visitors to come by public transport. Read on ${CHECKED}.`,
  },
  {
    q: "Are there height restrictions at Tokyo Joypolis?",
    a: `Yes, on thirteen of the twenty-one attractions, and they matter more here than at most parks. Two are 90 cm and over, six are 110 cm and over, three are 130 cm and over — including the Gekion Live Coaster and Halfpipe Tokyo, the two rides the park is known for — and two have an upper limit as well: Sadako takes 140 to 185 cm and Storm-G 140 to 200 cm. The other eight have no limit at all. Read off the official attraction pages on ${CHECKED}.`,
  },
  {
    q: "Can you take a toddler to Tokyo Joypolis?",
    a: `You can get them in free, but read the height table before you commit the afternoon. The official site admits pre-school children under 110 cm at no charge — and 110 cm is also the minimum for six of the attractions, with three more at 130 cm. In practice a child under 110 cm has the eight no-limit attractions and the arcade floors, which is a real but short visit. The two lowest-limit rides, Spicy Taxi and the House of the Dead attraction, start at 90 cm. Checked ${CHECKED}.`,
  },
  {
    q: "Who else gets in free?",
    a: `The official ticket page lists four groups: pre-school children under 110 cm; visitors aged 60 and over, on production of proof of age; pregnant visitors who show a maternal health handbook; and holders of a disability certificate together with up to two companions. If anyone in your group is in one of those categories, buy their ticket at the park rather than online. Read on ${CHECKED}.`,
  },
  {
    q: "Do you need to book Tokyo Joypolis tickets in advance?",
    a: "No — unlike Tokyo Disney or teamLab, Joypolis is a walk-in park with no date-specified ticket and no timed entry, so there is nothing to sell out and no reason to plan weeks ahead. Booking online is about the checkout rather than availability: a reseller gives you an English-language purchase, a card that will actually be accepted, and a QR code to scan at the door. If you are already in Odaiba with a Japanese card in your pocket, buying at the counter is perfectly fine.",
  },
  {
    q: "Is Tokyo Joypolis a good rainy-day option?",
    a: "It is one of the better ones in Tokyo. The whole park is indoors inside a shopping complex, the complex itself is joined to the rest of the Odaiba waterfront under cover in places, and the Yurikamome station is two minutes away. If a bay cruise or an outdoor observation deck is rained off, this is the swap that needs no new booking — and the re-entry rule means you can duck out to DECKS for food and come back.",
  },
  {
    q: "What else can you do in Odaiba on the same day?",
    a: "A bay cruise is the natural pairing: the boats run off Odaiba and Hinode Pier a short hop away, and an evening sailing lines up neatly with an Evening Passport. One thing to correct, because it still catches people out: teamLab Borderless is no longer in Odaiba. It closed there and reopened at Azabudai Hills, so a Joypolis-and-teamLab day is now two separate parts of Tokyo rather than one waterfront. Note too that Madame Tussauds Tokyo, which shared the DECKS building and was often sold in a combo ticket with Joypolis, states on its own site that it ceased operations on 30 September 2026.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/tokyo-joypolis-tickets") },
});

const TITLE = "Tokyo Joypolis Tickets (2026): Passport Prices, Hours and Height Limits";
const DESC =
  "Tokyo Joypolis tickets in 2026: admission is ¥1,700 and the all-ride Passport ¥6,000 for an adult, with a cheaper Evening Passport from 15:00 — plus the height limits on thirteen rides, the Odaiba access and how long to allow.";

export default function TokyoJoypolisTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-joypolis-tickets" />
        {hreflangLinks("/guides/attractions/tokyo-joypolis-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-joypolis-tickets" />
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
              route: "/guides/attractions/tokyo-joypolis-tickets",
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
                  name: "Tokyo Joypolis Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-joypolis-tickets",
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
          <span className={styles.breadCurrent}>Tokyo Joypolis Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Joypolis Tickets (2026):<br />Passport Prices, Hours and Height Limits
          </h1>
          <p className={styles.heroSubtitle}>
            Sega&apos;s indoor park sits three floors up in Odaiba, two minutes from the Yurikamome.
            Here is what each ticket costs, which rides your group is tall enough for, and how long to
            allow.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "Every height limit listed"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Admission only</p>
                <p className={styles.verdictStatValue}>¥1,700 adult / ¥1,400 student</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Passport (all rides)</p>
                <p className={styles.verdictStatValue}>¥6,000 adult / ¥5,000 student</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>How long to allow</p>
                <p className={styles.verdictStatValue}>2–4 hours, last entry −45 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting there</p>
                <p className={styles.verdictStatValue}>2 min from Odaiba-Kaihinkoen</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Tokyo Joypolis tickets come in four versions. Admission alone
              is ¥1,700 for an adult and ¥1,400 for a school-age student; the Passport, which adds
              unlimited rides, is ¥6,000 and ¥5,000; an Evening Passport sold from 15:00 is ¥5,000 and
              ¥4,000; and a two-ride night ticket from 17:00 is ¥3,100 for everyone. Nothing is
              date-specified and nothing sells out, so buy the right ticket rather than the earliest
              one — and check the height table below first, because thirteen of the twenty-one
              attractions have a minimum height and the two headline rides need 130 cm. Prices read off
              tokyo-joypolis.com on {CHECKED}.
            </p>
            <KlookLink
              href={tokyoJoypolisPassport.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check the Joypolis Passport on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Tokyo Joypolis?</h2>
          <p className={styles.bodyText}>
            Tokyo Joypolis is Sega&apos;s indoor amusement park, spread over floors 3 to 5 of the DECKS
            Tokyo Beach complex at 1-6-1 Daiba in Odaiba. It is not a theme park in the Disney sense
            and it does not pretend to be: twenty-one attractions — an indoor roller coaster, a
            halfpipe simulator, several walk-through horror and mystery rooms, a handful of licensed
            experiences — sitting above floors of arcade machines, all under one roof.
          </p>
          <p className={styles.bodyText}>
            That makes it a specific kind of useful. It is entirely indoors, it is a two-minute walk
            from a station, it needs no advance booking, and a visit fits in two to four hours rather
            than a day. For a wet afternoon, a teenage group, or the second half of an Odaiba day, it
            is one of the easiest things in Tokyo to add. The decisions worth getting right are which
            of the four tickets to buy, and whether everyone in your group clears the height limits.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Are Tokyo Joypolis Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Seven products, read off the operator&apos;s own ticket page. &quot;Student&quot; is the
            park&apos;s own tier — elementary, middle and high-school pupils — and &quot;adult&quot;
            means 18 and over.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Adult (18+)", "Student", "What it is"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            All seven read off the official ticket page at tokyo-joypolis.com on {CHECKED}, and subject
            to change — confirm when you buy. Four groups are admitted free: pre-school children under
            110 cm, visitors aged 60 and over with proof of age, pregnant visitors showing a maternal
            health handbook, and disability certificate holders with up to two companions. For the
            admissions we track across the rest of Japan, each with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Which Joypolis Ticket Should You Buy?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={tokyoJoypolisPassport.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Joypolis Passport on Klook →
            </KlookLink>
            <KlookLink href={tokyoJoypolisTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              The entry-only listing →
            </KlookLink>
          </div>
        </section>

        {/* Height limits */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Height limits</span>
          <h2 className={styles.sectionTitle}>Which Rides Have a Height Restriction?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Thirteen of the twenty-one attractions have a minimum height, and two have a maximum as
            well. This is the table to read before you buy a ¥5,000 student passport for a child who
            measures 105 cm — and the reason the free-entry threshold of 110 cm is worth a second
            look, because it is also the commonest minimum in the park.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Height", "Attractions", "What it means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heightRows.map((row) => (
                    <tr key={row.limit}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.limit}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.rides}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every limit above was read off the individual attraction pages at tokyo-joypolis.com on{" "}
            {CHECKED}. The line-up changes — collaborations come and go — so check the attraction list
            for your date if one specific ride is the reason you are going.
          </p>
        </section>

        {/* Hours and access */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hours &amp; access</span>
          <h2 className={styles.sectionTitle}>When Is It Open, and How Do You Get There?</h2>
          <p className={styles.bodyText}>
            Joypolis publishes no fixed opening hours. The official site runs a calendar, releases
            hours a period at a time, and states plainly that they can change without notice — so the
            honest instruction is to check your own date rather than trust a number on any third-party
            page, including this one. Two rules do apply on every date: <strong>last entry is 45
            minutes before closing</strong>, and re-entry is possible until 45 minutes before closing
            as well, with the English edition of the site stating that re-entry on the day of issue is
            unlimited for Joypolis card holders.
          </p>
          <p className={styles.bodyText}>
            The closing time also decides your evening ticket. On a normal day the Evening Passport
            goes on sale at 15:00 and the two-ride night ticket at 17:00; on a day the park closes at
            22:00 those move to 16:00 and 18:00. If an evening ticket is your plan, the calendar is the
            first thing to look at.
          </p>
          <p className={styles.bodyText}>
            Getting there is the easy part. The operator&apos;s access page gives the Yurikamome Line
            to Odaiba-Kaihinkoen Station, about two minutes on foot, or the Rinkai Line to Tokyo
            Teleport Station, about five. It puts Shimbashi at roughly 13 minutes to
            Odaiba-Kaihinkoen and Toyosu at roughly 18, and Shibuya, Shinjuku and Ikebukuro at about
            18, 23 and 29 minutes via the Rinkai Line. It asks visitors to use public transport. All
            read on {CHECKED}; our{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo guide</Link>{" "}
            covers how the Yurikamome and Rinkai lines fit with IC cards and passes, and the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket</Link> notably
            does not cover either of them.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Tokyo Joypolis Tickets</h2>
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
            <KlookLink href={tokyoJoypolisPassport.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Passport on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Pairing it with Odaiba */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of the day</span>
          <h2 className={styles.sectionTitle}>What Else Can You Do in Odaiba That Day?</h2>
          <p className={styles.bodyText}>
            Two to four hours inside leaves most of a day, and the re-entry rule means you can treat
            Joypolis as a block rather than a commitment. The natural pairing is the water: Tokyo Bay
            cruises run off the Odaiba waterfront and from Hinode Pier a short hop away, and an
            evening sailing lines up neatly with an Evening Passport bought at 15:00. Our{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise">Tokyo Bay cruise guide</Link> separates
            the two very different boats sold under that one search term, with official sailing times
            and prices.
          </p>
          <p className={styles.bodyText}>
            One correction worth making, because it still sends people to the wrong side of the city:{" "}
            <strong>teamLab Borderless is no longer in Odaiba.</strong> It closed its Odaiba home and
            reopened at Azabudai Hills, so a Joypolis-and-teamLab day now means two separate districts
            and two separate train journeys — our{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless ticket guide</Link>{" "}
            has the current location, timed slots and prices. In the same vein, Madame Tussauds Tokyo
            shared the DECKS building with Joypolis and was commonly sold in a combo ticket with it;
            its own site states that it ceased operations on 30 September 2026, so that combination no
            longer exists.
          </p>
          <p className={styles.bodyText}>
            If you are fitting Joypolis into a short trip, our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> shows
            where a waterfront afternoon sits without displacing the two stops that genuinely need a
            timed ticket, and{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link> sorts the
            city&apos;s attractions into what needs booking weeks out and what you can simply walk
            into. Joypolis is firmly in the second group.
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
          heading="The Rest of an Odaiba Day"
          intro="Two bay-cruise listings that sail from the Odaiba and Hinode side of the water, plus the city bus tour, for the hours either side of a Joypolis visit. Klook blocks automated price reads, so open a listing for the figure and the boarding point on your date."
          tours={[tokyoBaySunsetBoatCruise, tokyoBayYakatabuneDinnerShow, tokyoSightseeingBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/legoland-japan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="16" height="11" rx="2" />
                  <path d="M8 9V6h8v3M9 13h.01M15 13h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/ghibli-park-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ghibli Park Tickets (2026): Prices, When They Go On Sale and How to Buy From Overseas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Prices, How to Book &amp; Planets vs Borderless</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-bay-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 15h18l-2 5H5z" />
                  <path d="M12 3v9M12 3l6 3-6 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-borderless-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="1.5" />
                  <circle cx="17.5" cy="10.5" r="1.5" />
                  <circle cx="8.5" cy="7.5" r="1.5" />
                  <circle cx="6.5" cy="12.5" r="1.5" />
                  <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Borderless Tickets (2026): Price, How to Book and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />
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
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
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
            <h2 className={styles.ctaBannerTitle}>Buy the right ticket, not the first one</h2>
            <p className={styles.ctaBannerDesc}>
              Nothing here is date-specified and nothing sells out, so the only question is which of
              the four products you want. Klook&apos;s listing checks out in English, takes foreign
              cards and gives you a QR code for the entrance — check the cancellation window shown for
              your date before you pay.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={tokyoJoypolisPassport.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Joypolis Passport on Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
