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
//
// 11 Nov 2026 (task jtk-20261111-R05): answer-first rewrite. GSC showed this URL taking
// "teamlab planets tickets" and "teamlab borderless tickets" impressions at ~23rd place, so
// the title and opening now say plainly that this page is the two-museum comparison and send
// single-museum searchers to the Planets and Borderless guides. The Planets price tiers were
// re-read on the official store (teamlabplanets.dmm.com/en) on 11 Nov 2026; the Planets
// hours stay at their 6 Nov reading and the Borderless figures at their 9 Oct reading.
const ROUTE = "/guides/attractions/teamlab-tokyo-tickets";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;
const TITLE = "teamLab Tokyo Tickets 2026: Planets vs Borderless Prices";
const DESC =
  "teamLab Tokyo tickets: Planets is from ¥3,800 and Borderless from ¥3,400 per adult, sold separately. Compare hours, kids and door sales, then book one.";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const BORDERLESS_CHECKED = checkedLabel(B.checked);
/** The day the Planets price tiers below were re-read on the official ticket store. */
const PLANETS_PRICES_ISO = "2026-11-11";

const compareRows = [
  { factor: "Our pick for", planets: "Children and a first teamLab visit", borderless: "Art lovers, adults and a rainy day" },
  { factor: "Adult ticket", planets: `${P.adult}, by date and time`, borderless: `${B.adult}, by date and time` },
  { factor: "Child ticket", planets: `${P.child} (${P.childAges})`, borderless: `${B.child} (${B.childAges})` },
  { factor: "What it is", planets: "Barefoot, through water up to adult knee height", borderless: "50+ artworks in a maze with no map, shoes on" },
  { factor: "Location", planets: "Toyosu (Koto City), 3 min from Shin-Toyosu Station", borderless: "Azabudai Hills (Minato City), 2 min from Kamiyacho Station" },
  { factor: "Opening hours", planets: "08:00–22:00 (08:00–20:00 on 31 Dec–2 Jan)", borderless: "Listed 08:30–21:00, varies by date" },
  { factor: "Last entry", planets: "One hour before closing", borderless: "One hour before closing" },
  { factor: "Entry", planets: "Set date and admission time", borderless: "Timed slot, or a Flexible Pass with no set time" },
  { factor: "Tickets at the door", planets: "None sold on site", borderless: "Sold while slots remain, ¥200 more for an adult" },
  { factor: "Time to allow (our estimate)", planets: "1.5–2 hours", borderless: "About 2 hours" },
  { factor: "Run", planets: "To the end of 2027", borderless: "Permanent" },
];

// Ticket-by-ticket cost of one museum or both. The "Both" column is plain addition of the
// official floors, so it is a floor too: the adult and disability tiers move with the date.
const costRows = [
  { who: "Our pick", planets: "Pick it if you have children", borderless: "Lower adult floor; also sold at the door", both: "Only with two free half-days" },
  { who: "Adult (18+)", planets: P.adult, borderless: B.adult, both: "from ¥7,200" },
  { who: "Junior & senior high school / ages 13–17", planets: "¥2,800", borderless: "¥2,800", both: "¥5,600" },
  { who: "Child (ages 4–12)", planets: P.child ?? "—", borderless: B.child ?? "—", both: "¥3,000" },
  { who: "Under 4", planets: "Free", borderless: "Free", both: "Free" },
  { who: "Visitor with a disability", planets: "from ¥1,900", borderless: "from ¥1,700", both: "from ¥3,600" },
  { who: "Buying at the door", planets: "Not sold on site", borderless: "+¥200 adult, +¥100 child or disability", both: "—" },
];

// Short question-and-answer blocks, written so each answer stands on its own.
const quickQuestions = [
  {
    q: "Can you buy teamLab tickets at the door?",
    a: "Only at Borderless. teamLab Borderless sells tickets at the museum while slots remain, at ¥200 more for an adult; teamLab Planets sells no tickets on site at all, so a Planets visit has to be booked online in advance.",
  },
  {
    q: "How long do you need at each teamLab museum?",
    a: "teamLab publishes no visit length for either museum. Our planning figure is 1.5–2 hours at Planets, including lockers and drying off, and about 2 hours at Borderless; the Planets store also warns of a 30–60 minute wait to be admitted.",
  },
  {
    q: "How far in advance should you book teamLab tickets?",
    a: "teamLab does not publish how far ahead dates sell out, so book as soon as your dates are fixed. Both museums sell timed tickets for a set date, and adult prices change by date and time, so compare a few dates before you pay.",
  },
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
    q: "How much are teamLab tickets in Tokyo?",
    a: `An adult ticket to teamLab Planets costs ${P.adult} on the official store (read on 11 Nov 2026), and an adult ticket to teamLab Borderless costs ${B.adult} on teamlab.art (read on ${BORDERLESS_CHECKED}). Children aged 4–12 pay ${P.child} at either museum and under-4s are free. Adult prices change by date and time, so check the figure for your own date.`,
  },
  {
    q: "Can you buy teamLab tickets at the door?",
    a: "Only at Borderless, while slots remain, and an adult pays ¥200 more on site. The official teamLab Planets store states that Planets sells no tickets on site, so Planets must be booked online before you go.",
  },
  {
    q: "Which teamLab museum is better for kids?",
    a: "Planets. Under-4s are free at both, but Planets is short, physical and easy for children to follow. Bring a change of clothes, because the water areas get everyone wet, and note that strollers cannot go inside.",
  },
  {
    q: "Can you visit Planets and Borderless on the same day?",
    a: "You can, because each ticket is for its own date and time, but the two are in different parts of the city and each needs about two hours. Two separate half-days are easier.",
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
            teamLab Tokyo Tickets (2026):<br />Planets vs Borderless, Which to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo has two teamLab museums, and each sells its own ticket. teamLab Planets costs {P.adult} and
            teamLab Borderless costs {B.adult} for an adult, so this page compares the two and tells you which one
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
              <strong>teamLab Tokyo tickets</strong> are sold separately for two museums: teamLab Planets in
              Toyosu costs {P.adult} per adult, and teamLab Borderless in Azabudai Hills costs {B.adult} per
              adult. <strong>Book Planets</strong> if you have children or want to walk barefoot through water;{" "}
              <strong>book Borderless</strong> if you want to explore art at your own pace with your shoes on.
              Children aged 4–12 pay {P.child} at either museum, under-4s are free, and only Borderless sells
              tickets at the door (¥200 more for an adult).
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
          This page compares the two museums. Already decided? The{" "}
          <Link href="/guides/attractions/teamlab-planets-tickets">teamLab Planets tickets guide</Link> covers every
          Planets ticket tier, time slots, what to wear and how to get there, and the{" "}
          <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless tickets guide</Link> covers
          Borderless time slots, the Flexible Pass and buying at the door.
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
            Last checked: {PLANETS_PRICES_ISO} (Planets prices, official store{" "}
            <a href="https://teamlabplanets.dmm.com/en" target="_blank" rel="noopener noreferrer">teamlabplanets.dmm.com/en</a>),{" "}
            {P.checked} (Planets hours, access and run,{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>) and{" "}
            {B.checked} (Borderless,{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>).
            Both museums price adult tickets by date and time, so confirm for your own date. The time to allow is
            our planning figure; teamLab publishes none.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
            How much do teamLab Tokyo tickets cost for one museum or both?
          </h3>
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
            Last checked: {PLANETS_PRICES_ISO} for Planets on{" "}
            <a href="https://teamlabplanets.dmm.com/en" target="_blank" rel="noopener noreferrer">teamlabplanets.dmm.com/en</a>{" "}
            and {B.checked} for Borderless on{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>.
            Adult and disability prices are floors that rise on some dates; the &quot;Both museums&quot; column adds
            the two floors together.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check Planets tickets for your date →
            </KlookLink>
            <KlookLink href={teamlabBorderlessTicketUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check Borderless tickets for your date →
            </KlookLink>
          </div>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which is for you</span>
          <h2 className={styles.sectionTitle}>Which teamLab in Tokyo should you pick?</h2>
          <p className={styles.bodyText}>
            Pick teamLab Planets for children or a first visit, and teamLab Borderless for art at your own pace;
            only book both if you have two free half-days.
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          {quickQuestions.map((item) => (
            <div key={item.q}>
              <h3 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginTop: "2rem" }}>{item.q}</h3>
              <p className={styles.bodyText}>{item.a}</p>
            </div>
          ))}
          <p className={styles.bodyText}>
            For the full Planets rules on lockers, rental shorts and changing a booking, see the{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets">teamLab Planets ticket guide</Link>; for
            Borderless closed days and the Flexible Pass, see the{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless ticket guide</Link>.
            Pairing teamLab with a park day? Tokyo Disney tickets are dated too, can sell out by date and have
            no gate sales — see our{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets">Tokyo Disneyland tickets guide</Link>.
          </p>
        </section>

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
