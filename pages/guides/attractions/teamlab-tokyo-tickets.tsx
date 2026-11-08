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
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";

// Since 6 Nov 2026 (task jtk-20261106-A24) this URL answers one question: which of Tokyo's
// two teamLab museums to book. Planets tickets, hours and access have their own page at
// /guides/attractions/teamlab-planets-tickets, so this page does not repeat them. It targets
// "teamlab tokyo tickets", "teamlab tickets" and "planets vs borderless".
const ROUTE = "/guides/attractions/teamlab-tokyo-tickets";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;
const TITLE = "teamLab Tokyo Tickets 2026: Planets or Borderless?";
const DESC =
  "teamLab Tokyo tickets: two museums, two tickets. Compare Planets and Borderless on price, hours, location and who each suits, then book the right one.";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const PLANETS_CHECKED = checkedLabel(P.checked);
const BORDERLESS_CHECKED = checkedLabel(B.checked);

const compareRows = [
  { factor: "Location", planets: "Toyosu (Koto City)", borderless: "Azabudai Hills (Minato City)" },
  { factor: "What it is", planets: "Barefoot, walk through water", borderless: "50+ artworks in a maze with no map" },
  { factor: "Suits", planets: "Families, first-timers, a physical experience", borderless: "Art lovers, slow exploring, photography" },
  { factor: "Adult ticket", planets: P.adult, borderless: B.adult },
  { factor: "Child ticket", planets: `${P.child} (${P.childAges})`, borderless: `${B.child} (${B.childAges})` },
  { factor: "Opening hours", planets: "08:00–22:00 (08:00–20:00 on 31 Dec–2 Jan)", borderless: "Listed 08:30–21:00, varies by date" },
  { factor: "Entry", planets: "Set date and admission time", borderless: "Timed slot, or a Flexible Pass with no set time" },
  { factor: "Tickets at the door", planets: "None sold on site", borderless: "¥200 more if you buy on site" },
  { factor: "Run", planets: "To the end of 2027", borderless: "Permanent" },
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
    q: "Which teamLab is better in Tokyo, Planets or Borderless?",
    a: "Neither is better overall. Planets suits families and first-time visitors who want a physical experience, and you walk barefoot through water. Borderless suits art lovers who want to explore slowly, with no map and no fixed route. If you only have time for one and you have children, pick Planets.",
  },
  {
    q: "Are teamLab Planets and teamLab Borderless the same ticket?",
    a: "No. They are separate museums with separate tickets, in different parts of Tokyo. A Planets ticket does not get you into Borderless, or the other way round.",
  },
  {
    q: "How much are teamLab tickets in Tokyo?",
    a: `An adult ticket to Planets is ${P.adult}, read on ${PLANETS_CHECKED}. An adult ticket to Borderless is ${B.adult}, read on ${BORDERLESS_CHECKED}. Both are priced by date and time, so check the figure for your own date.`,
  },
  {
    q: "Can you visit Planets and Borderless on the same day?",
    a: "You can, because each ticket is for its own date and time, but the two are in different parts of the city and each is a long visit. Two separate half-days are easier.",
  },
  {
    q: "Which teamLab museum is better for kids?",
    a: "Planets. Under-4s are free at both, but Planets is short, physical and easy for children to follow. Bring a change of clothes, because the water areas get everyone wet, and note that strollers cannot go inside.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>teamLab Tokyo Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            teamLab Tokyo Tickets (2026):<br />Planets or Borderless, Which to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo has two teamLab museums, each with its own ticket. Here is how they differ and which one
            to book.
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
              <strong>teamLab Tokyo tickets</strong> means choosing between two museums.{" "}
              <strong>Book Planets</strong> if you have children or want to walk through water.{" "}
              <strong>Book Borderless</strong> if you want to explore art slowly. Each has its own ticket:
              Planets is {P.adult} and Borderless is {B.adult} for an adult.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Planets tickets →
              </KlookLink>
              <KlookLink href={teamlabBorderlessTicketUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Borderless tickets →
              </KlookLink>
            </div>
          </div>
        </div>

        <p className={styles.bodyText}>
          Already decided? See our{" "}
          <Link href="/guides/attractions/teamlab-planets-tickets">teamLab Planets tickets guide</Link> for hours,
          booking and how to get there, or the{" "}
          <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless tickets guide</Link>.
        </p>

        <BookingEsimCard />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs Borderless: which should I book?</h2>
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
            Planets read on teamlab.art and its official ticket store on {PLANETS_CHECKED}; Borderless read on
            teamlab.art on {BORDERLESS_CHECKED}. Both price adult tickets by date and time, so confirm for your
            own date.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which is for you</span>
          <h2 className={styles.sectionTitle}>Which teamLab Should You Pick?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

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
          heading="Book It For the Same Trip"
          intro="Either museum fills part of a Tokyo day. These cover the subway, a guided city day and a day trip out. Klook prices change by date, so open a listing for the price on your own date."
          tours={[tokyoSubwayTicket, tokyoSightseeingBusTour, fujiDayTour]}
        />

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets Tickets (2026): Price, Hours and How to Book" },
              { href: "/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless Tickets (2026): Price, How to Book and Time Slots" },
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
