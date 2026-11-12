import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  sanrioPurolandTicket,
  sanrioPurolandTripPrep,
  tokyoSightseeingBusTour,
  warnerBrosStudioTourTokyo,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Rebuilt 12 Nov 2026 (task jtk-20261112-R03) around the searches that land here:
 * "sanrio puroland", "sanrio puroland tickets", "puroland ticket price", "puropass".
 *
 * Sources, each checked on 12 Nov 2026:
 *  - puroland.jp/news/passport_information_2026/: Day Passport ¥3,900–¥6,900 adult
 *    (18–64), ¥2,800–¥5,800 child (3–17) and senior (65+); Afternoon Passport (from
 *    14:00) ¥2,800–¥4,600 and ¥2,500–¥4,300; effective 1 Aug 2026; under-3s free;
 *  - puroland.jp/passport/list/: passport names, annual passport prices, price by visit
 *    date, e-passport cheaper than the same-day window, window open from 30 minutes
 *    before opening to 90 minutes before closing, age bands;
 *  - puroland.jp/ticket/guidance/: arrival reservation required on top of a passport,
 *    same-day reservations only while slots remain, no refund on a passport if entry is
 *    refused for lack of a reservation;
 *  - puroland.jp/puropass/: PUROPASS is a priority pass, not admission; ¥1,500 priority
 *    entry, ¥2,500 pair, parade seats ¥1,000–¥3,000; limited numbers; no refunds;
 *  - puroland.jp/access/ and puroland.jp/language/: about 30 minutes from Shinjuku on the
 *    Keio Line limited express to Keio Tama Center, about 23 minutes from Tachikawa on
 *    the Tama Monorail, 5 minutes' walk from Tama Center;
 *  - puroland.jp home page: 9:30–17:00 shown for 12 Nov 2026. Hours vary by date and are
 *    printed for that date only.
 * No Klook price appears on this page.
 */
const P = PRICES.sanrioPuroland;
const CHECKED = checkedLabel(P.checked);
const CHECKED_ISO = "2026-11-12";
const OPEN_TODAY = "9:30 to 17:00";

const officialLink = { color: "var(--text)", fontWeight: 600 } as const;

function LastChecked({ sources }: { sources: { label: string; href: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {CHECKED_ISO}. Official source{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? ", " : ""}
          <a href={s.href} target="_blank" rel="noopener" style={officialLink}>
            {s.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

/** Table 1: the answer row first. */
const priceRows = [
  { ticket: "Day Passport — adult (18–64)", price: P.adult, note: "Open to close. The price is set by your visit date" },
  { ticket: "Day Passport — child (3–17) / senior (65+)", price: P.child, note: "Child includes high-school students" },
  { ticket: "Afternoon Passport — adult", price: "¥2,800 – ¥4,600", note: "Entry from 14:00" },
  { ticket: "Afternoon Passport — child / senior", price: "¥2,500 – ¥4,300", note: "Entry from 14:00" },
  { ticket: "Under 3", price: "Free", note: "Ages 3 and up need a passport" },
  { ticket: "Annual Passport — adult 18+ (digital / card)", price: "¥23,000 / ¥25,000", note: "Some dates excluded" },
  { ticket: "Annual Passport — child (digital / card)", price: "¥12,000 / ¥14,000", note: "Some dates excluded" },
  { ticket: "PUROPASS (priority entry, add-on)", price: "¥1,500", note: "Not admission: you still need a passport" },
];

/** Table 2: the answer row first. */
const bookingRows = [
  {
    route: "Official e-Passport + arrival reservation — the default",
    when: "Before your date. The park calls it cheaper than the same-day window",
    rule: "Without an arrival reservation you are refused entry, and the passport is not refunded",
  },
  {
    route: "Klook voucher + arrival reservation",
    when: "Before you fly, with an English checkout and an overseas card",
    rule: "Klook's own cancellation terms, shown before you pay. Check the voucher for how to register the reservation",
  },
  {
    route: "Same-day window",
    when: "From 30 minutes before opening to 90 minutes before closing",
    rule: "Still needs an arrival reservation, which on the day exists only while slots remain",
  },
  {
    route: "PUROPASS priority passes",
    when: "Priority entry sold in advance; show and ride passes mostly in the park on the day",
    rule: "Limited numbers and no refunds after purchase",
  },
];

/** Table 3: the answer row first. */
const busyRows = [
  {
    signal: "A date near the top of the price band",
    meaning: "Puroland prices by expected demand, and widened the bands on 1 August 2026 to spread visitors out",
    action: "Book the passport and the arrival reservation before you fly",
  },
  {
    signal: "A date near ¥3,900 (adult Day Passport)",
    meaning: "The park expects fewer visitors that day",
    action: "The cheapest day to go, and the best pick if your dates are flexible",
  },
  {
    signal: "Busy times at the window",
    meaning: "The official overseas page warns you may have to wait",
    action: "Arrive with an e-ticket rather than queueing to buy one",
  },
  {
    signal: "Closed days",
    meaning: "The park has days with no operation, shown on its schedule",
    action: "Check puroland.jp/schedule/ before you fix the date",
  },
];

/** Table 4: the answer row first. */
const accessRows = [
  {
    from: "Shinjuku",
    route: "Keio Line limited express (bound for Hashimoto) to Keio Tama Center",
    time: "About 30 minutes, then a 5-minute walk",
  },
  {
    from: "Odakyu Line",
    route: "To Odakyu Tama Center, then the west ticket gate and turn left",
    time: "5-minute walk from the station",
  },
  {
    from: "Tachikawa",
    route: "Tama Monorail to Tama Center",
    time: "About 23 minutes, then a 5-minute walk",
  },
];

const whoFor = [
  {
    title: "Day Passport if…",
    desc: "You want the parades and the shows, which are the point of Puroland rather than the rides. A full day starts at ¥3,900 for an adult on the cheapest dates and runs to ¥6,900 on the busiest — a gap of ¥3,000 that depends entirely on which day you pick.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
      </svg>
    ),
  },
  {
    title: "Afternoon Passport if…",
    desc: "You are fitting Puroland around something else, or travelling with small children who will not last a full day. It admits you from 14:00 and starts at ¥2,800 for an adult — roughly a thousand yen below the cheapest full day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
  {
    title: "Shift your date if…",
    desc: "Your schedule has any slack in it. Puroland prices by expected demand and added more price tiers on 1 August 2026 specifically to spread visitors out, so moving a visit to a cheaper date is the single biggest saving available on this ticket.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 10h18M8 2v4M16 2v4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check the price for your date",
    desc: `Puroland publishes a calendar with a price per date rather than one list price: an adult Day Passport ranges from ¥3,900 to ¥6,900, and some lower prices are not offered at all in busy periods. Open the calendar before the ticket page. Checked ${CHECKED}.`,
  },
  {
    title: "Buy the passport: official e-Passport or Klook",
    desc: "The park recommends its own e-Passport as cheaper than the window. Klook sells the same admission with an English checkout and an e-ticket, which helps if a Japanese site refuses an overseas card.",
  },
  {
    title: "Register the arrival reservation for the same date",
    desc: `This is the step that catches people out. The official ticket guidance says visitors without an arrival reservation are refused entry and the passport is not refunded, and that a reservation on its own does not admit you either. Checked ${CHECKED}.`,
  },
  {
    title: "Add a PUROPASS only if a show or parade seat matters",
    desc: "Priority entry is ¥1,500 and parade seats run from ¥1,000 to ¥3,000. They sell in limited numbers and cannot be refunded, so buy them after the date is fixed.",
  },
];

const faqItems = [
  {
    q: "How much are Sanrio Puroland tickets?",
    a: `A Day Passport is ¥3,900 to ¥6,900 for an adult aged 18–64 and ¥2,800 to ¥5,800 for a child aged 3–17 or a senior aged 65 and over, depending on the date. The Afternoon Passport, entry from 14:00, is ¥2,800 to ¥4,600 for an adult and ¥2,500 to ¥4,300 for a child or senior. Children under 3 are free. Checked on puroland.jp, ${CHECKED}.`,
  },
  {
    q: "Do you need to book Sanrio Puroland in advance?",
    a: `You need an arrival reservation for your date as well as a passport, and without one you are refused entry. The window still sells passports on the day, from 30 minutes before opening to 90 minutes before closing, but same-day reservations exist only while slots remain, so booking both before you travel is the safe order. Checked ${CHECKED}.`,
  },
  {
    q: "How do I get to Sanrio Puroland from Shinjuku?",
    a: `Take the Keio Line limited express bound for Hashimoto to Keio Tama Center, about 30 minutes, then walk about 5 minutes to the park. The Odakyu Line to Odakyu Tama Center also works. Neither line is Tokyo Metro or Toei, so a Tokyo Subway Ticket does not cover the trip. Checked on puroland.jp, ${CHECKED}.`,
  },
  {
    q: "Is Sanrio Puroland worth it for adults?",
    a: "Yes, if you like the Sanrio characters: the day is theatre shows, parades and character greetings rather than thrill rides, all indoors. An adult pays the same ¥3,900 to ¥6,900 Day Passport as any visitor aged 18–64, so a cheaper date or the Afternoon Passport from ¥2,800 is the way to keep the cost down.",
  },
  {
    q: "What is PUROPASS at Sanrio Puroland?",
    a: `PUROPASS is Puroland's priority pass, not an admission ticket: priority entry is ¥1,500 (¥2,500 for a pair) and parade seats are ¥1,000 to ¥3,000, on top of a passport. Numbers are limited and PUROPASS cannot be refunded once bought. Checked on puroland.jp, ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/sanrio-puroland-tickets") } });

const TITLE = "Sanrio Puroland Tickets 2026: Prices by Date & How to Book";
const DESCRIPTION =
  "Sanrio Puroland tickets: Day Passport ¥3,900–¥6,900 adult, ¥2,800–¥5,800 child, priced by date. 30 min from Shinjuku. Arrival reservation and how to book.";

export default function SanrioPurolandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" />
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
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/sanrio-puroland-tickets",
              headline: TITLE,
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
                { "@type": "ListItem", position: 4, name: "Sanrio Puroland Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/sanrio-puroland-tickets" },
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
          <span className={styles.breadCurrent}>Sanrio Puroland Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sanrio Puroland Tickets 2026:<br />Prices by Date, Hours &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Day Passport, Afternoon Passport and PUROPASS prices from the official site, the arrival
            reservation you also need, and the train from Shinjuku.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Indoor park"].map((t) => (
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
            Sanrio Puroland tickets are priced by date: an adult Day Passport costs ¥3,900 to ¥6,900 and a
            child (3–17) or senior (65+) Day Passport ¥2,800 to ¥5,800, with the Afternoon Passport (entry
            from 14:00) from ¥2,800 for an adult. The park was open {OPEN_TODAY} on 12 November 2026, with
            hours that change by date. It is about 30 minutes from Shinjuku on the Keio Line limited express
            to Keio Tama Center, then a 5-minute walk, and every visitor also needs an arrival reservation
            for the same date. Official figures, checked {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Day Passport (adult)</p>
                <p className={styles.verdictStatValue}>¥3,900 – ¥6,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Afternoon Passport (adult)</p>
                <p className={styles.verdictStatValue}>¥2,800 – ¥4,600</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Also required</p>
                <p className={styles.verdictStatValue}>Arrival reservation</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Shinjuku</p>
                <p className={styles.verdictStatValue}>About 30 min (Keio Line)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the price is set by the date, not by the seller, so open Puroland&apos;s
              calendar and shift the visit to a cheaper day if you can — that is worth up to ¥3,000 per adult.
              Buy the passport before you go and register the arrival reservation for the same date, because
              the park refuses entry without one. Checked on puroland.jp, {CHECKED}.
            </p>
            <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Sanrio Puroland tickets on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are Sanrio Puroland tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult Day Passport is ¥3,900 to ¥6,900 and a child or senior Day Passport ¥2,800 to ¥5,800,
            set by the date you visit. The bands below took effect on 1 August 2026, and on some dates the
            lowest prices are not offered.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp passport prices (revised 1 Aug 2026)", href: "https://www.puroland.jp/news/passport_information_2026/" },
              { label: "puroland.jp passport list", href: "https://www.puroland.jp/passport/list/" },
              { label: "puroland.jp PUROPASS", href: "https://www.puroland.jp/puropass/" },
            ]}
          />
        </section>

        <EsimCtaTop />

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do you need to book Sanrio Puroland in advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes for the arrival reservation: without one for your date you are refused entry, even with a
            passport. The window does sell passports on the day, but same-day reservations exist only while
            slots remain, so the safe order is passport first, reservation straight after.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Way to book", "When", "Cancellation and entry rules"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td>{row.when}</td>
                      <td>{row.rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp ticket guidance", href: "https://www.puroland.jp/ticket/guidance/" },
              { label: "puroland.jp passport list", href: "https://www.puroland.jp/passport/list/" },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Which to choose:</strong> the official e-Passport if the Japanese checkout accepts your
            card; a Klook voucher if it does not, or if you want the cancellation terms in English before you
            pay. Either way, the arrival reservation is the step that decides whether you get in.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Sanrio Puroland dates on Klook →
            </KlookLink>
          </div>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do you book Sanrio Puroland tickets?</h2>
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

        {/* Busy days */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Crowds</span>
          <h2 className={styles.sectionTitle}>When is Sanrio Puroland busiest?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The price calendar is the best guide: Puroland sets each date&apos;s price by expected demand, so
            the dates at the top of the band are the ones it expects to be fullest.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Signal", "What it means", "What to do"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busyRows.map((row) => (
                    <tr key={row.signal}>
                      <td className={styles.tdProvider}>{row.signal}</td>
                      <td>{row.meaning}</td>
                      <td>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp price revision notice", href: "https://www.puroland.jp/news/passport_information_2026/" },
              { label: "puroland.jp overseas visitors page", href: "https://www.puroland.jp/language/" },
              { label: "puroland.jp schedule", href: "https://www.puroland.jp/schedule/" },
            ]}
          />
        </section>

        {/* Which passport */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which passport</span>
          <h2 className={styles.sectionTitle}>Day, Afternoon, or a Different Date?</h2>
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

        <BookingEsimCard lead="Puroland booked? Get mobile data before you land." />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How do I get to Sanrio Puroland from Shinjuku?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the Keio Line limited express bound for Hashimoto from Shinjuku to Keio Tama Center, about
            30 minutes, and walk about 5 minutes to the park. The Odakyu Line and the Tama Monorail also stop
            at Tama Center.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "Route", "Time"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.from}>
                      <td className={styles.tdProvider}>{row.from}</td>
                      <td>{row.route}</td>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "puroland.jp access", href: "https://www.puroland.jp/access/" },
              { label: "puroland.jp overseas visitors page", href: "https://www.puroland.jp/language/" },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            None of those lines is Tokyo Metro or Toei, which means a{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={officialLink}>
              Tokyo Subway Ticket
            </Link>{" "}
            does not cover the trip out here. Pay the Keio or Odakyu fare with an IC card; our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={officialLink}>
              guide to getting around Tokyo
            </Link>{" "}
            covers which card to use.
          </p>
        </section>

        <KlookTripPrep
          label="Book for the same day"
          heading="What Else Is Worth Booking for a Puroland Day?"
          intro="Puroland is a half day indoors at Tama Center, so the base you sleep in and the other half of the day are the bookings left to make."
          items={sanrioPurolandTripPrep}
        />

        {/* Adults */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>For adults</span>
          <h2 className={styles.sectionTitle}>Is Sanrio Puroland worth it for adults?</h2>
          <p className={styles.bodyText}>
            Yes, if you like the Sanrio characters: the day is theatre shows, parades and character greetings
            rather than thrill rides, and it is all indoors. Adults aged 18–64 pay the full ¥3,900 to ¥6,900
            Day Passport, so a cheaper date or the Afternoon Passport is the way to keep the cost down.
          </p>
          <p className={styles.bodyText}>
            Being indoors also makes it the obvious day to move a rained-out plan to. If the trip is built
            around one Tokyo park day, our{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={officialLink}>
              things to do in Tokyo
            </Link>{" "}
            guide compares it with Disney and the other bookable sights, and the{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={officialLink}>
              Tokyo itinerary with kids
            </Link>{" "}
            gives it a full day of its own.
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

        {/* Klook picks for the other half of the day. The Puroland CTAs above are unchanged;
            the guided tour is the higher-commission slot and leads. */}
        <KlookTourPicks
          heading="The Other Half of a Puroland Day"
          intro="Puroland runs 3 to 5 hours by its own listing's estimate, which leaves most of a day free — and both of these are booked on the same Klook account as the passport. If the trip is built around character parks rather than temples, the Harry Potter studio tour in Nerima is the closest thing Tokyo has to a second one."
          tours={[tokyoSightseeingBusTour, warnerBrosStudioTourTokyo]}
        />

        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 3 Nov 2026: the family version of the Tokyo route — Disney, LEGOLAND Discovery, Sanrio, child fares. */}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Itinerary with Kids: 5 Days, Day by Day (2026)</p>
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
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.5-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 5v14M16 5v14M4 10h16M4 14h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Warner Bros. Studio Tour Tokyo Tickets (2026): Prices &amp; How to Book</p>
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
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l4 2" />
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
            <h2 className={styles.ctaBannerTitle}>Hold the passport before you travel</h2>
            <p className={styles.ctaBannerDesc}>
              Klook sells Sanrio Puroland admission with an English checkout and an e-ticket — useful if a
              Japanese attraction site has already refused your card. Remember to register the arrival
              reservation for the same date.
            </p>
            <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Sanrio Puroland tickets →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
