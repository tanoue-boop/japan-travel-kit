import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  hiroshimaMiyajimaJoinDayTour,
  hiroshimaPeaceHalfDayTour,
  hiroshimaPeaceMiyajimaBusTour,
  hiroshimaPeaceMuseumTicket,
  hiroshimaPeaceSameDayPrep,
  hiroshimaPeaceToursListUrl,
  hiroshimaPrivateWalkingTour,
  hiroshimaStayAreas,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Hiroshima Peace Memorial Tour, written for the exact phrase. Added 5 Nov 2026 (task
 * jtk-20261105-02). hiroshima-miyajima-day-trip covers the two-site day; this page covers
 * the guided visit to the park and museum in the city. Kept factual and quiet in tone.
 *
 * Official reads, hpmmuseum.jp, 5 Nov 2026:
 *   page_id=47   fees, opening hours by month, reserved extended slots, closed days, bag,
 *                photo and phone rules.
 *   page_id=52   ¥500 audio guide, about 70 minutes, 15 languages, 1F East Building;
 *                volunteer guides are free.
 *   page_id=50   strollers allowed, 4 lent free, nursing rooms, nappy-changing, elevators.
 *   page_id=154  bus, loop bus and tram stops with times from Hiroshima Station.
 *   page_id=443  live-view cameras (no crowd times).
 *   page_id=610  priority entry, including people with preschool children.
 *   page_id=601  reserved online tickets up to 90 days ahead (the 2024 notice).
 *   home page    closed 15–20 February 2027 for an exhibition change.
 * Read through the search index for hpmmuseum.jp, because the PDFs cannot be parsed here:
 *   web ticket flyer    busiest about 11:00–15:00, long queues to buy tickets; regular hours
 *                       8:30–17:30 in March–July and September–November.
 *   museum notices      last entry 30 minutes before closing; entry may be restricted; a web
 *                       ticket does not guarantee the exact time; web tickets can sell out.
 *   volunteer pages     park tours 10:45–12:15 and 14:00–15:30, up to 10 people, no advance
 *                       booking, not July–September, museum-interior tours suspended.
 * dive-hiroshima.com (official tourism site): Obon 8–16 August 2026 online-ticket-only entry,
 * 1,000 visitors an hour.
 *
 * The brief's "about 2–3 hours" is widened to what Klook shows: 2 to 5 hours. Listing facts
 * come from the www.klook.com search index, 5 Nov 2026 (HTTP 403 on /activity/):
 *   93034   5 hours, group, English and Japanese, graphic-imagery warning for young children.
 *   118442  4 hours, private. 160219  full refund up to 24 hours. 106604  instant confirmation.
 *   2-hour historical tour and 190558 (3 hours, private): list link only, see klook-links.ts.
 *
 * The museum publishes no age limit that we could find, so the page says that and quotes
 * only what is published. Nothing here is first-hand and no Klook price appears.
 */
const ROUTE = "/guides/attractions/hiroshima-peace-memorial-tours";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;
const CHECKED = checkedLabel("2026-11-05");
const LINK = { color: "var(--red)", fontWeight: 600 };

const feeRows = [
  { who: "Adult (college student and over)", fee: "¥200", group: "¥160 each, 30 or more" },
  { who: "High school student", fee: "¥100", group: "Free, 20 or more" },
  { who: "Junior high school student and younger", fee: "Free", group: "Free" },
  { who: "Aged 65 and over (show your passport)", fee: "¥100", group: "–" },
];

const hoursRows = [
  { season: "March–July, September–November", open: "7:30–19:00", reserved: "7:30–8:30 and 17:30–18:30" },
  { season: "August", open: "7:30–20:00 (to 21:00 on 5 and 6 August)", reserved: "7:30–8:30 and 18:30–19:30 (to 20:30 on 5 and 6 August)" },
  { season: "December–February", open: "7:30–18:00", reserved: "7:30–8:30 and 16:30–17:30" },
];

const compareRows = [
  { what: "Cost", self: "¥200 museum; audio guide ¥500", tour: "Tour price on Klook; check whether admission is included" },
  { what: "Commentary", self: "Audio guide, about 70 minutes, in 15 languages", tour: "A guide you can ask questions" },
  { what: "Time needed", self: "Your own pace", tour: "2 to 5 hours, by listing" },
  { what: "Park monuments", self: "Self-guided, or free volunteer tour on set dates", tour: "Part of the walk" },
  { what: "Entry queue", self: "Buy a web ticket to skip the ticket line", tour: "Check how your listing handles tickets" },
  { what: "Best for", self: "A quiet, personal visit", tour: "Wanting history explained and questions answered" },
];

/** Klook durations from the search index, 5 Nov 2026. */
const tourRows = [
  { title: "2-hour historical tour", url: hiroshimaPeaceToursListUrl, hours: "2 hours", type: "English-guided; a new listing with few reviews" },
  { title: "Atomic Bomb Dome & Peace Memorial Museum tour", url: hiroshimaPeaceToursListUrl, hours: "3 hours", type: "Private group, English or Japanese" },
  { title: hiroshimaPrivateWalkingTour.title, url: hiroshimaPrivateWalkingTour.url, hours: "4 hours", type: "Private, adds Hiroshima Castle and Shukkeien" },
  { title: hiroshimaPeaceHalfDayTour.title, url: hiroshimaPeaceHalfDayTour.url, hours: "5 hours", type: "Group, English and Japanese" },
];

/** Official re-read for the 18 Nov 2026 pass: hpmmuseum.jp page_id=47 and hiroshimacastle.jp. */
const TODAY = checkedLabel("2026-11-18");

/** The advance-booking table. First row is the answer. */
const bookingRows = [
  {
    site: "Answer: only the Peace Memorial Museum's extended hours",
    booking: "Online reservation required for 7:30–8:30 and the evening slot",
    fee: "Museum ¥200 adult",
    hours: "Evening slot 17:30–18:30 (Sep–Nov), 16:30–17:30 (Dec–Feb)",
  },
  {
    site: "Peace Memorial Museum, regular hours",
    booking: "Not required; buy at the museum or online",
    fee: "¥200 adult, ¥100 high school, free junior high and younger",
    hours: "7:30–19:00 (Sep–Nov), 7:30–18:00 (Dec–Feb); closed 30–31 Dec and mid-February",
  },
  {
    site: "Hiroshima Castle main keep",
    booking: "Nothing to book: closed since March 2026",
    fee: "–",
    hours: "Exterior viewing only",
  },
  {
    site: "Hiroshima Castle Ninomaru (restored buildings)",
    booking: "Not required",
    fee: "Free",
    hours: "9:00–16:30 (Oct–Mar), 9:00–17:30 (Apr–Sep); last entry 30 min before; closed 8 Dec and 29–31 Dec",
  },
];

const faqItems = [
  {
    q: "Which Hiroshima memorial sites require advance booking?",
    a: `Only the Hiroshima Peace Memorial Museum, and only for its extended hours: entry from 7:30 to 8:30 and in the evening slot (17:30–18:30 from September to November, 16:30–17:30 from December to February) needs an online reservation. In regular hours you can buy the ¥200 ticket at the museum. Read on hpmmuseum.jp on ${TODAY}.`,
  },
  {
    q: "How far ahead should I book Hiroshima Castle tours?",
    a: `There is no castle ticket to book. Hiroshima Castle's main keep closed in March 2026 for safety reasons and can only be viewed from outside, while the restored Ninomaru buildings are free and open 9:00 to 16:30 from October to March. A guided walking tour that includes the castle grounds only needs booking once your Hiroshima date is fixed. Read on hiroshimacastle.jp on ${TODAY}.`,
  },
  {
    q: "How long is a Hiroshima Peace Memorial tour?",
    a: `Klook's guided tours of the Peace Memorial Park, Atomic Bomb Dome and museum run from 2 to 5 hours. Read ${CHECKED}. Check the listing for what is included.`,
  },
  {
    q: "How much does the Hiroshima Peace Memorial Museum cost?",
    a: `¥200 for an adult, ¥100 for a high school student, and free for junior high students and younger. Visitors aged 65 and over pay ¥100 with their passport. Read on the museum's site on ${TODAY}.`,
  },
  {
    q: "What time does the Peace Memorial Museum open and close?",
    a: `It opens at 7:30 all year. It closes at 19:00 from March to July and September to November, at 18:00 from December to February, and at 20:00 in August, or 21:00 on 5 and 6 August. Last entry is 30 minutes before closing. It is closed on 30 and 31 December and in mid-February. Read ${TODAY}.`,
  },
  {
    q: "Do I need a guide for the Hiroshima Peace Memorial Park?",
    a: "No. The park is open to walk, and the museum has labels and a ¥500 audio guide. A guide helps if you want history explained and questions answered. Free volunteer park tours run on set dates, but are not offered from July to September.",
  },
];

const relatedLinks = [
  { href: "/guides/attractions/hiroshima-2-day-itinerary", title: "Hiroshima 2 Day Itinerary" },
  { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "Hiroshima & Miyajima Day Trip" },
  { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "Tokyo to Hiroshima by Shinkansen" },
  { href: "/guides/transport/osaka-to-hiroshima-shinkansen", title: "Osaka to Hiroshima by Shinkansen" },
  { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14 Day Itinerary" },
  { href: "/guides/attractions/kansai-area-pass", title: "Kansai Area Pass" },
];

const TITLE = "Hiroshima Peace Memorial Tours 2026: Advance Booking";
const H1 = "Hiroshima Peace Memorial Tours";
const DESCRIPTION =
  "Hiroshima Peace Memorial tours: the ¥200 museum needs booking only for early and late slots; the castle keep closed March 2026. Tours on Klook.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function HiroshimaPeaceMemorialToursPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
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
                { "@type": "ListItem", position: 4, name: H1, item: URL },
              ],
            }),
          }}
        />
      </Head>

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
          <span className={styles.breadCurrent}>{H1}</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>{H1} (2026): Guides, Booking and Museum Hours</h1>
          <p className={styles.heroSubtitle}>
            How to visit the Peace Memorial Park, the Atomic Bomb Dome and the museum, with or without a guide.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official hours and fees", "Tour vs on your own", "Visiting with children"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Hiroshima Peace Memorial tours</strong> cover the Peace Memorial Park, the Atomic Bomb
            Dome and usually the museum, and guided tours on Klook run from <strong>2 to 5 hours</strong>.
            The museum costs <strong>¥200 for adults</strong>, opens at 7:30, and needs an advance online
            reservation <strong>only for its 7:30–8:30 and evening slots</strong>; Hiroshima Castle&apos;s main
            keep has been closed since March 2026, so there is no castle ticket to book. Read on hpmmuseum.jp
            and hiroshimacastle.jp on {TODAY}.
          </p>
          <h2 className={styles.sectionTitle}>Which Hiroshima Memorial Sites Require Advance Booking?</h2>
          <p className={styles.bodyText}>
            Only the Peace Memorial Museum, and only for its extended hours: entry from 7:30 to 8:30, and the
            evening slot (17:30–18:30 from September to November, 16:30–17:30 from December to February), needs
            an online reservation. In regular hours you can buy the ¥200 ticket at the museum, and the Peace
            Memorial Park and the Atomic Bomb Dome are open-air with no booking. Read on hpmmuseum.jp on {TODAY}.
          </p>
          <h2 className={styles.sectionTitle}>How Far Ahead Should I Book Hiroshima Castle Tours?</h2>
          <p className={styles.bodyText}>
            There is nothing to book at the castle itself. Its official site says the main keep closed in March
            2026 because of concrete deterioration and ageing facilities and can be viewed only from outside,
            while the restored Ninomaru buildings stay open free of charge, 9:00–16:30 from October to March
            (last entry 30 minutes before closing). A guided walking tour that includes the castle grounds
            only needs booking once your Hiroshima date is fixed; check that its route does not promise the
            keep&apos;s interior.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Site", "Advance booking?", "Admission", "Hours"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.site}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.site}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fee}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-18. Official sources:{" "}
            <a href="https://hpmmuseum.jp/modules/info/index.php?action=PageView&page_id=47&lang=eng" target="_blank" rel="noopener noreferrer" style={LINK}>hpmmuseum.jp (Hours and Admission)</a>{" "}
            and{" "}
            <a href="https://hiroshimacastle.jp/" target="_blank" rel="noopener noreferrer" style={LINK}>hiroshimacastle.jp</a>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hiroshimaPrivateWalkingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the walking tour with the castle grounds →
            </KlookLink>
          </div>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Guided tour</p>
                <p className={styles.verdictStatValue}>2–5 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Museum, adult</p>
                <p className={styles.verdictStatValue}>¥200</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Opens</p>
                <p className={styles.verdictStatValue}>7:30, all year</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Busiest</p>
                <p className={styles.verdictStatValue}>About 11:00–15:00</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> you do not need a guide, but one adds context that labels cannot.
              Choose a guide for explanation and questions, or the ¥500 audio guide for a quieter visit.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Staying overnight? Our{" "}
              <Link href="/guides/attractions/hiroshima-2-day-itinerary">2 days in Hiroshima itinerary</Link>{" "}
              puts the park and museum on Day 1 and Miyajima on Day 2.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={hiroshimaPeaceHalfDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check the guided tour →
              </KlookLink>
              <KlookLink href={hiroshimaPeaceToursListUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                See all tours on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Guide</span>
          <h2 className={styles.sectionTitle}>Do I Need a Guide for the Hiroshima Peace Memorial Park?</h2>
          <p className={styles.bodyText}>
            No. The park is open to walk and the museum explains itself well, but a guide helps you connect the
            monuments, the Dome and the exhibits. There are three ways to get commentary.
          </p>
          <ul className={styles.bodyText}>
            <li><strong>A paid guide:</strong> book on Klook, from 2 to 5 hours.</li>
            <li><strong>The museum audio guide:</strong> ¥500, about 70 minutes, in 15 languages, from the counter on the 1st floor of the East Building.</li>
            <li><strong>Free volunteer guides:</strong> park tours at 10:45–12:15 and 14:00–15:30, for up to 10 people, first come, first served. Check in at the desk on the 1st floor of the East Building from 15 minutes before. You cannot book ahead.</li>
          </ul>
          <p className={styles.bodyText}>
            The volunteer tours do not run from July to September, on heat stroke alert days, on 1–3 January,
            on 6 August or on 29 December, and tours inside the museum are suspended. Confirm at the museum,
            as this is the schedule as read on {CHECKED}.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tours</span>
          <h2 className={styles.sectionTitle}>Which Hiroshima Peace Memorial Tour Should You Book?</h2>
          <p className={styles.bodyText}>
            Choose by length. Two or three hours suits a stop between trains, and five hours gives time inside
            the museum. Check whether museum admission is included before you book. Listings read on Klook on{" "}
            {CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Length", "Type"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.title}>
                      <td className={styles.tdProvider}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored nofollow noopener" style={LINK}>
                          {row.title}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The 2- and 3-hour rows link to Klook&apos;s list of tours for the museum. Cancellation terms differ
            by listing, so read them at checkout.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is a Tour Better Than Visiting on Your Own?</h2>
          <p className={styles.bodyText}>
            A tour is better for understanding, and going alone is better for time and quiet. The museum is
            simple to visit by yourself at ¥200.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "On your own", "Guided tour"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.self}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is the Hiroshima Peace Memorial Museum?</h2>
          <p className={styles.bodyText}>
            ¥200 for an adult, and free for junior high students and younger.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Visitor", "Admission", `Group rate (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td className={styles.tdPrice}>{row.fee}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.group}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={hiroshimaPeaceMuseumTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the museum ticket on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book for the same trip"
          heading="What Else Should You Book for Hiroshima?"
          intro="The museum ticket is a small part of the visit. These are what the rest of the trip needs."
          items={hiroshimaPeaceSameDayPrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Are the Peace Memorial Museum Opening Hours?</h2>
          <p className={styles.bodyText}>
            It opens at 7:30 all year and closes between 18:00 and 20:00 by season. The first and last hours
            need an online reservation. Last entry is 30 minutes before closing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Season", "Open", `Online reservation only (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.season}>
                      <td className={styles.tdProvider}>{row.season}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.open}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.reserved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Closed 30 and 31 December, and from 15 to 20 February 2027 for an exhibition change. From
            hpmmuseum.jp, read {CHECKED}.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book the Peace Memorial Museum in Advance?</h2>
          <p className={styles.bodyText}>
            You must book for the reserved early and late slots. For regular hours booking is optional, but
            the museum says you may wait a long time to buy a ticket during its busiest hours, about 11:00 to
            15:00, and it recommends buying online.
          </p>
          <ul className={styles.bodyText}>
            <li><strong>How it works:</strong> choose a time slot online, pay, and show the barcode the museum emails you.</li>
            <li><strong>How far ahead:</strong> up to 90 days, under the museum&apos;s 2024 notice.</li>
            <li><strong>What it does not guarantee:</strong> entry can be restricted when crowded, a web ticket does not fix your exact entry time, and web tickets can sell out before last entry.</li>
            <li><strong>Busiest dates:</strong> during Obon, 8–16 August 2026, entry was online-ticket-only with a limit of 1,000 visitors an hour. Check for similar notices before August and holiday trips.</li>
            <li><strong>On the day:</strong> the museum&apos;s <a href="https://hpmmuseum.jp/modules/info/index.php?action=PageView&page_id=443&lang=eng" target="_blank" rel="noopener noreferrer" style={LINK}>live cameras</a> show the entrance and queue.</li>
          </ul>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Time</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need at the Hiroshima Peace Memorial Museum?</h2>
          <p className={styles.bodyText}>
            Allow about 2 hours for the museum and another hour for the park. The audio guide alone runs about
            70 minutes. These allowances are ours, not the museum&apos;s. Inside, please keep quiet, large bags
            are not allowed (coin lockers are on the 1st floor of the East Building), non-flash personal
            photos are fine, and tripods and selfie sticks are banned.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Children</span>
          <h2 className={styles.sectionTitle}>Can You Visit the Museum with Children?</h2>
          <p className={styles.bodyText}>
            Yes. The official sources checked give no age limit, and the museum provides for young families. It does show the
            effects of the bombing directly, however: survivors&apos; drawings on its site include injured and
            dead people, and one Klook listing warns that some imagery may disturb young children.
          </p>
          <ul className={styles.bodyText}>
            <li>Junior high students and younger enter free.</li>
            <li>Visitors with preschool children can ask staff at the entrance for priority entry.</li>
            <li>Strollers are allowed, and the museum lends 4 free of charge from the Information counter.</li>
            <li>Staff will take you to a nursing room on request, and nappy-changing facilities are available.</li>
            <li>The museum also runs a peace education website for children, built around the story of Sadako.</li>
          </ul>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to the Peace Memorial Park?</h2>
          <p className={styles.bodyText}>
            From Hiroshima Station it is about 17 to 25 minutes, by these routes on the museum&apos;s access page:
          </p>
          <ul className={styles.bodyText}>
            <li><strong>Streetcar, about 25 minutes:</strong> Line 2 or 6 to Genbaku Domu Mae, or Line 1 to Fukuro-machi.</li>
            <li><strong>Hiroshima Bus No. 24, about 20 minutes:</strong> from the south exit to Heiwa kinen koen.</li>
            <li><strong>Meipuru-pu loop bus, about 17 minutes:</strong> from the Shinkansen exit to Heiwa kinen koen.</li>
          </ul>
          <p className={styles.bodyText}>
            To reach Hiroshima, see our guides to the{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" style={LINK}>Tokyo to Hiroshima shinkansen</Link>{" "}
            (with a train-versus-flight table) and{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={LINK}>Osaka to Hiroshima</Link> by
            shinkansen.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>With Miyajima</span>
          <h2 className={styles.sectionTitle}>Can You Do Hiroshima and Miyajima in One Day?</h2>
          <p className={styles.bodyText}>
            Yes, with an early start. Do the park and museum first, then take the ferry of about 10 minutes to
            Miyajima. Our <Link href="/guides/attractions/hiroshima-miyajima-day-trip" style={LINK}>Hiroshima
            and Miyajima day trip guide</Link> has the plan. If you would rather not organise it, both of
            these tours cover the two sites.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={hiroshimaPeaceMiyajimaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the museum and Miyajima bus tour →
            </KlookLink>
            <KlookLink href={hiroshimaMiyajimaJoinDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the join-in day tour →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

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
          heading="Guided Visits in Hiroshima"
          intro="Listings that cover the park and the Dome. Check the meeting point and what is included before you book."
          tours={[hiroshimaPeaceHalfDayTour, hiroshimaPrivateWalkingTour, hiroshimaPeaceMiyajimaBusTour]}
        />

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedLinks.map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="14" rx="3" />
                    <line x1="4" y1="10" x2="20" y2="10" />
                    <path d="M7 21l2-4M17 21l-2-4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Plan a morning at the park</h2>
            <p className={styles.ctaBannerDesc}>
              The museum is busiest from about 11:00 to 15:00, so a morning visit or a night nearby helps.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={hiroshimaPeaceHalfDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Guided Tour →
              </KlookLink>
              <KlookLink href={hiroshimaStayAreas[1].url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                Hotels near the park →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
