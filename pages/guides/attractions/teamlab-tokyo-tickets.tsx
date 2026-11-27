import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  fujiDayTour,
  teamlabBorderlessTicketUrl,
  teamlabPlanetsTicketUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { PRICES } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import HotelStayBlock from "../../../components/HotelStayBlock";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import { teamlabSameDayCards } from "../../../lib/teamlab-same-day-cards";

// Same-day cards under the main CTA (task-jtk-20261115-P01).
const SAME_DAY = teamlabSameDayCards("tokyo", "en");

// Since 6 Nov 2026 (task jtk-20261106-A24) this URL answers one question: which of Tokyo's
// two teamLab museums to book. Planets tickets, hours and access have their own page at
// /guides/attractions/teamlab-planets-tickets, so this page does not repeat them. It targets
// "teamlab tokyo tickets", "teamlab tickets" and "planets vs borderless".
//
// 11 Nov 2026 (R05) and 15 Nov 2026 (21): answer-first rewrites, because GSC showed
// "teamlab planets tickets" landing here at ~23rd place instead of on the Planets page.
//
// 20 Nov 2026 (task jtk-20261120-R01): still the site's most-shown URL (3,457 impressions,
// 14.2 average position, 773 AI-feature impressions in 28 days), with Planets-only queries
// (~900 impressions) stuck in the 20s here while the Planets page sits at 6.5. The page is
// now strictly the chooser: title "Planets vs Borderless & Prices", a numbers-first opening,
// one comparison table with the verdict in row one, and the single-museum material cut to
// two short sections that each end in a prominent link to the museum's own guide. Every
// official figure was re-read on 20 Nov 2026 from the __NEXT_DATA__ of teamlab.art/e/planets,
// teamlab.art/e/borderless-azabudai and teamlab.art/faq/Tokyo (the Borderless FAQ).
const ROUTE = "/guides/attractions/teamlab-tokyo-tickets";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;
//
// 23 Nov 2026 (task jtk-20261123-21): title and description restored to the comparison
// wording of 16 Nov (W21), because R01's price-led "Planets from ¥3,800" pulled Planets-only
// queries back here. The table, FAQ and CTAs from R01 stay as they are.
const TITLE = "teamLab Tokyo Tickets 2026: Planets or Borderless, Which to Book?";
const DESC =
  "Planets or Borderless? Tokyo's two teamLab museums sell separate tickets. Compare water vs shoes-on art, kids, hours, sell-outs and cost, then book one.";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
/** The day every official figure on this page was re-read on teamlab.art. */
const CHECKED_ISO = "2026-11-20";
const CHECKED = "20 November 2026";

// Row one is the verdict; the rest are the facts that decide it.
const compareRows = [
  { factor: "Book it if", planets: "You have children, or want to wade barefoot through water", borderless: "It is your first teamLab without kids, or you want art at your own pace with shoes on" },
  { factor: "Adult (18+)", planets: `${P.adult}; the price rises on busier dates and times`, borderless: `${B.adult}; the price rises on busier dates and times` },
  { factor: "Ages 13–17", planets: "¥2,800", borderless: "¥2,800" },
  { factor: "Child (4–12)", planets: `${P.child}; 3 and under free`, borderless: `${B.child}; 3 and under free` },
  { factor: "Water", planets: "Yes — barefoot, water up to adult knee height", borderless: "No — you keep your shoes on" },
  { factor: "Time to allow", planets: "teamLab publishes none; plan 1.5–2 hours", borderless: "About 1.5–2 hours (official FAQ), no time limit inside" },
  { factor: "Do tickets sell out?", planets: "Timed slots; nothing is sold on site, so book online first", borderless: "Official site says tickets may sell out; on sale around the 1st, two months ahead" },
  { factor: "At the door", planets: "Not sold on site", borderless: "Sold on site while slots remain, at ¥200 more" },
  { factor: "Nearest station", planets: "Shin-Toyosu (Yurikamome), 3 min from Exit 1A", borderless: "Kamiyacho (Hibiya Line), 2 min from Exit 5" },
  { factor: "Opening hours", planets: "08:00–22:00 (08:00–20:00 on 31 Dec–2 Jan)", borderless: "08:30–21:00, some dates differ" },
  { factor: "Run", planets: "Until the end of 2027", borderless: "Permanent" },
];

// Ticket-by-ticket cost of one museum or both. The "Both" column is plain addition of the
// official floors, so it is a floor too: the adult and disability tiers move with the date.
const costRows = [
  { who: "Cheapest option", planets: "One museum only", borderless: "Lower adult floor of the two", both: "Only with two free half-days" },
  { who: "Adult (18+)", planets: P.adult, borderless: B.adult, both: "from ¥7,200" },
  { who: "Ages 13–17", planets: "¥2,800", borderless: "¥2,800", both: "¥5,600" },
  { who: "Child (ages 4–12)", planets: P.child ?? "—", borderless: B.child ?? "—", both: "¥3,000" },
  { who: "3 and under", planets: "Free", borderless: "Free", both: "Free" },
  { who: "Visitor with a disability", planets: "from ¥1,900", borderless: "from ¥1,700", both: "from ¥3,600" },
  { who: "Buying at the door", planets: "Not sold on site", borderless: "+¥200 adult", both: "—" },
];

const whoFor = [
  {
    title: "Choose Planets if…",
    desc: "You are travelling with children, want something physical, and do not mind wet feet. You walk barefoot through water that reaches adult knee height.",
  },
  {
    title: "Choose Borderless if…",
    desc: "You would rather look at art than wade through it. There is no fixed route, works move between rooms, and you wander at your own pace.",
  },
  {
    title: "Do both if…",
    desc: "You have two free half-days and love teamLab. They are in different parts of the city and need separate timed tickets, so space them out.",
  },
];

const faqItems = [
  {
    q: "Which is better, teamLab Planets or Borderless?",
    a: "Neither is better overall. Planets suits children and anyone who wants a physical visit: you walk barefoot through water up to adult knee height. Borderless suits adults who want to explore art slowly with shoes on, with no map and no fixed route. With children, book Planets; on a first visit without children, book Borderless.",
  },
  {
    q: "How much are teamLab tickets in Tokyo in 2026?",
    a: `An adult ticket costs ${P.adult} at teamLab Planets and ${B.adult} at teamLab Borderless on teamlab.art (read on ${CHECKED}); both adult prices rise on busier dates and times. Ages 13–17 pay ¥2,800, children aged 4–12 pay ${P.child} at either museum, and children 3 and under are free. Seeing both costs from ¥7,200 for an adult.`,
  },
  {
    q: "Do teamLab tickets sell out?",
    a: "They can. teamLab's Borderless page states that tickets are date- and time-specific and may sell out, and recommends buying as soon as your dates are set; Borderless tickets go on sale around the 1st of the month, two months before the visit. Planets sells no tickets on site at all, so a Planets visit has to be booked online before you go.",
  },
  {
    q: "Can you visit Planets and Borderless on the same day?",
    a: "Yes, because each ticket is for its own date and time, but the museums are in different parts of the city — Toyosu and Azabudai Hills — and teamLab puts a Borderless visit at about 1.5–2 hours. Leave a gap of at least that plus the journey between the two slots, or use two separate half-days.",
  },
  {
    q: "Where is the cheapest place to buy teamLab tickets?",
    a: "The official ticket sites set the base price, and teamLab lists Klook as an official sales channel for Borderless. The bigger saving is the date: adult prices at both museums rise on busier dates and times, so compare a few dates before you pay. At Borderless, buying at the door costs ¥200 more than online.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const BTN_LINK = { color: "var(--text)", fontWeight: 600 } as const;

export default function TeamLabTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
                { "@type": "ListItem", position: 4, name: "teamLab Tokyo Tickets", item: URL },
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
          <span className={styles.breadCurrent}>teamLab Tokyo Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            teamLab Tokyo Tickets 2026: <br />Planets or Borderless, Which to Book?
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo has two teamLab museums, and each sells its own ticket. This page sets them side by side and
            tells you which one to book.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Side by side"].map((t) => (
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

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>teamLab Tokyo tickets</strong> are sold separately for two museums, so pick one: with
              children, <strong>book Planets</strong> in Toyosu, where you walk barefoot through knee-deep water;
              on a first visit without children, <strong>book Borderless</strong> in Azabudai Hills, the shoes-on
              art maze that also sells tickets at the door. Prices, hours and booking for{" "}
              <Link href="/guides/attractions/teamlab-planets-tickets" style={BTN_LINK}>teamLab Planets tickets</Link>{" "}
              have their own guide. An adult pays <strong>{P.adult}</strong> at Planets and{" "}
              <strong>{B.adult}</strong> at Borderless, and a child aged 4–12 pays {P.child} at either (official
              prices, read on {CHECKED}). teamLab puts a Borderless visit at about 1.5–2 hours and publishes no
              visit length for Planets, so plan on 1.5–2 hours at either.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Planets dates &amp; prices on Klook →
              </KlookLink>
              <KlookLink href={teamlabBorderlessTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Borderless dates &amp; prices on Klook →
              </KlookLink>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.5rem", marginBottom: 0, fontSize: "0.85rem" }}>
              Both museums price adult tickets by date and publish only the lowest price, so pick your date and
              time on the listing to see the real price and the open slots.
            </p>
          </div>
        </div>

        {/* 22 Nov 2026 (task-jtk-20261122-04): moved up from below the comparison table to
            directly under the first Klook buttons. */}
        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        {/* eSIM box straight after the answer (jtk-20261122-P01): it sat below three H2 sections. */}
        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo" areas={["ginza", "odaiba", "roppongi", "tokyoStation"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs Borderless: which should you book?</h2>
          <p className={styles.bodyText}>
            Book Planets with children and Borderless on an adults-only first visit; the table shows why, row by
            row.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab Borderless"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO}. Sources:{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>,{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>{" "}
            and the Borderless FAQ at{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>.
            Both museums use dynamic pricing for adult tickets and publish only the lowest price, so confirm the
            figure for your own date. The Planets visit length is our planning figure; teamLab publishes none.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Planets tickets for your date →
            </KlookLink>
            <KlookLink href={teamlabBorderlessTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Borderless tickets for your date →
            </KlookLink>
          </div>
        </section>

        <KlookTourPicks
          heading="Getting between Toyosu and Azabudai Hills"
          intro="Kamiyacho, for Borderless, is on the Tokyo Metro Hibiya Line, and the Subway Ticket covers every Tokyo Metro and Toei line for 24, 48 or 72 hours. Planets' station, Shin-Toyosu, is on the Yurikamome, which the pass does not cover; Toyosu Station on the Yurakucho Line is the covered alternative."
          tours={[tokyoSubwayTicket]}
        />

        <BookingEsimCard />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Planets only</span>
          <h2 className={styles.sectionTitle}>Already set on teamLab Planets?</h2>
          <p className={styles.bodyText}>
            teamLab Planets in Toyosu sells timed tickets from {P.adult} for an adult and nothing at the door, so
            the booking is a date and an admission time chosen online. Prices by date, the Premium Pass, what to
            wear for the water and the route from Shin-Toyosu or Toyosu Station are all in the Planets guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/guides/attractions/teamlab-planets-tickets" className={styles.verdictBtn}>
              Full Planets ticket guide →
            </Link>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Borderless only</span>
          <h2 className={styles.sectionTitle}>Already set on teamLab Borderless?</h2>
          <p className={styles.bodyText}>
            teamLab Borderless at Azabudai Hills sells timed tickets from {B.adult} for an adult, plus a Flexible
            Pass with no set entry time, and its tickets go on sale around the 1st of the month two months ahead.
            Release dates, timed-entry booking steps, the Flexible Pass and buying on the day are in our{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless tickets</Link> guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/guides/attractions/teamlab-borderless-tickets" className={styles.verdictBtn}>
              Full Borderless ticket guide →
            </Link>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How much do teamLab Tokyo tickets cost for one museum or both?</h2>
          <p className={styles.bodyText}>
            Seeing both teamLab museums in Tokyo costs from ¥7,200 for an adult and ¥3,000 for a child aged 4–12,
            because each museum needs its own ticket. Most visitors book one.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "teamLab Planets", "teamLab Borderless", "Both museums"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.both}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} on{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>{" "}
            and{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>.
            Adult and disability prices are floors that rise on some dates; the &quot;Both museums&quot; column adds
            the two floors together.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which is for you</span>
          <h2 className={styles.sectionTitle}>Which teamLab in Tokyo should you pick?</h2>
          <p className={styles.bodyText}>
            Pick teamLab Planets for children, teamLab Borderless for art at your own pace, and only book both if
            you have two free half-days.
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
            Can you buy teamLab tickets at the door?
          </h3>
          <p className={styles.bodyText}>
            Only at Borderless. teamLab Borderless sells tickets on site while slots remain, at ¥200 more for an
            adult; teamLab Planets sells no tickets on site, so a Planets visit has to be booked online first.
          </p>
          <p className={styles.bodyText}>
            Pairing teamLab with a park day? Tokyo Disney tickets are dated too and have no gate sales — see our{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets" style={BTN_LINK}>Tokyo Disneyland tickets guide</Link>,
            or plan the rest of the city with{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={BTN_LINK}>things to do in Tokyo</Link> and the{" "}
            <Link href="/guides/attractions/tokyo-2-day-itinerary" style={BTN_LINK}>Tokyo 2-day itinerary</Link>.
          </p>
        </section>

        <EsimCtaBottom />

        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>teamLab Tokyo tickets: common questions</h2>
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
          heading="Book It For the Same Trip"
          intro="Either museum fills part of a Tokyo day. These cover a guided city day and a day trip out. Klook prices change by date, so open a listing for the price on your own date."
          tours={[tokyoSightseeingBusTour, fujiDayTour]}
        />

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets Tickets (2026): Price, Hours and How to Book" },
              { href: "/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless Tickets (2026): Price, How to Book and Time Slots" },
              { href: "/guides/attractions", title: "Japan Attraction Tickets 2026: What to Book in Advance, When" },
              { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto Tickets: Prices, Hours & Booking" },
              { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking" },
              { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
