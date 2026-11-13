import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import {
  jrHarukaUrl,
  nankaiRapitUrl,
  jrKansaiAreaPass,
  klookEsim,
  osakaStayAreas,
  kyotoStayAreas,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Rebuilt 8 Nov 2026 (task jtk-20261108-03) on the figures osaka-airport-transfer
 * was rebuilt on two days earlier, re-read on 8 November 2026:
 *   westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/
 *     HARUKA One-way Ticket: Tennoji ¥1,600, Osaka / Shin-Osaka ¥1,900, Kyoto ¥2,700
 *     (adult; child half). Reserved and non-reserved ordinary seats. Foreign passport
 *     and Temporary Visitor status; not sold within Japan. Prices changed for tickets
 *     sold on or after 1 November 2026. No ICOCA & HARUKA set is listed.
 *   westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai/
 *     Kansai Area Pass: Haruka non-reserved ordinary cars usable; reserved seats up
 *     to 2 times; 1-day ¥2,800 adult.
 *   nankai.co.jp/en_railway/ticket/rapit
 *     Rapi:t Digital Ticket ¥1,410 Regular Seat / ¥1,590 Super Seat (adult).
 *   nankai.co.jp/en_railway/rapit (search index)
 *     All seats reserved; minimum 34 min Kansai Airport to Namba.
 *   kansai-airport.or.jp/en/node/21536 (search index; the site refuses automated reads)
 *     Haruka about 30 min to Tennoji, 45 to Osaka, 50 to Shin-Osaka, 75 to Kyoto.
 *     One train every 30–40 min 9:00–20:00, hourly otherwise (read 6 Nov 2026).
 *   japanrailpass.net/en/  The pass covers Shinkansen and limited express trains.
 *
 * Replaced: ¥1,880 Rapi:t, ¥3,060 and ¥3,640 Haruka, Shin-Osaka 60 min, Rapi:t ~40 min.
 * Not stated because no operator page gives it: the regular (non-discount) Haruka
 * fare, Nankai's ordinary fare and a Rapi:t service interval. Klook prices are never quoted.
 */
const CHECKED = checkedLabel("2026-11-08");
const FREQ_CHECKED = checkedLabel("2026-11-06");

const ROUTE = "/guides/transport/haruka-vs-nankai-rapit";
const PAGE_URL = `https://www.japan-travel-kit.com${ROUTE}`;
const TITLE = "Haruka vs Nankai Rapit 2026: Price, Time, Which to Take";
const DESCRIPTION =
  "Haruka vs Nankai Rapit from Kansai Airport, checked Nov 2026: Rapi:t ¥1,410 to Namba in 34 min; Haruka ¥1,900 to Osaka and ¥2,700 to Kyoto. Which to take.";

const destinationRows = [
  {
    dest: "Kyoto",
    train: "JR Haruka",
    time: "About 75 min",
    fare: "¥2,700",
    freq: "Every 30–40 min (9:00–20:00), hourly otherwise",
    seats: "Reserved and non-reserved cars",
    jrPass: "Yes",
    areaPass: "Yes (non-reserved; reserved up to 2 times)",
  },
  {
    dest: "Shin-Osaka",
    train: "JR Haruka",
    time: "About 50 min",
    fare: "¥1,900",
    freq: "Every 30–40 min (9:00–20:00), hourly otherwise",
    seats: "Reserved and non-reserved cars",
    jrPass: "Yes",
    areaPass: "Yes (non-reserved; reserved up to 2 times)",
  },
  {
    dest: "Osaka Station (Umeda)",
    train: "JR Haruka",
    time: "About 45 min",
    fare: "¥1,900",
    freq: "Every 30–40 min (9:00–20:00), hourly otherwise",
    seats: "Reserved and non-reserved cars",
    jrPass: "Yes",
    areaPass: "Yes (non-reserved; reserved up to 2 times)",
  },
  {
    dest: "Tennoji",
    train: "JR Haruka",
    time: "About 30 min",
    fare: "¥1,600",
    freq: "Every 30–40 min (9:00–20:00), hourly otherwise",
    seats: "Reserved and non-reserved cars",
    jrPass: "Yes",
    areaPass: "Yes (non-reserved; reserved up to 2 times)",
  },
  {
    dest: "Namba (Dotonbori, Shinsaibashi)",
    train: "Nankai Rapi:t",
    time: "From 34 min",
    fare: "¥1,410 (Super Seat ¥1,590)",
    freq: "See Nankai's timetable",
    seats: "All seats reserved",
    jrPass: "No",
    areaPass: "No",
  },
];

const questionSections = [
  {
    id: "faster",
    q: "Is the Haruka or Rapit faster to Osaka?",
    a: "It depends on which Osaka. To Namba, the Rapi:t is the only direct train and takes a minimum of 34 minutes. To Tennoji, Osaka Station (Umeda) and Shin-Osaka, the Haruka is the direct train, at about 30, 45 and 50 minutes.",
    more: "The Haruka does not stop at Namba and the Rapi:t does not reach Umeda or Shin-Osaka, so a change of train erases any time saved. Pick the train whose last stop is nearest your hotel.",
  },
  {
    id: "cheaper",
    q: "Which is cheaper, Haruka or Rapit?",
    a: "On the discounted tickets for visitors, the Rapi:t is: ¥1,410 to Namba on Nankai's Rapi:t Digital Ticket, against ¥1,600 to Tennoji and ¥1,900 to Osaka or Shin-Osaka on JR West's HARUKA One-way Ticket. With a JR Pass or Kansai Area Pass, the Haruka needs no extra ticket.",
    more: "JR West notes that its HARUKA One-way prices changed for tickets sold on or after 1 November 2026, which is why older guides still quote other figures. The two tickets serve different stations, so compare the fare to your own hotel, not the headline number.",
  },
  {
    id: "jr-pass",
    q: "Can I use the JR Pass on the Haruka?",
    a: "Yes. The Haruka is a JR West limited express, and the official JAPAN RAIL PASS site states that the pass covers limited express trains. The Rapi:t runs on the private Nankai railway, so a JR Pass does not cover it.",
    more: "JR West's Kansai Area Pass also covers the Haruka's non-reserved cars and allows reserved seats up to two times. The Kansai-airport Station ticket office is open 5:30am to 11:00pm.",
  },
  {
    id: "rapit-seats",
    q: "Do I need to reserve seats on the Rapit?",
    a: "Yes. Every seat on the Rapi:t is reserved, so each rider needs a limited express ticket for a specific train on top of the fare. Nankai's Rapi:t Digital Ticket bundles both for one chosen date.",
    more: "Nankai lets an unused Digital Ticket be refunded in its system until five minutes before the train departs. Regular Seats are in cars 1 to 4 and Super Seats in cars 5 and 6; both arrive at the same time.",
  },
  {
    id: "kyoto",
    q: "How do I get from Kansai Airport to Kyoto?",
    a: "Take the JR Haruka: it runs direct from Kansai Airport to Kyoto Station in about 75 minutes, at ¥2,700 for an adult on the HARUKA One-way Ticket, or covered by a JR Pass or Kansai Area Pass. The Rapi:t does not go to Kyoto.",
    more: "JR West says the HARUKA One-way Ticket cannot be bought within Japan and is for foreign passport holders entering as Temporary Visitors, so arrange it before you fly. You cannot get off at an intermediate station on it.",
  },
];

const faqItems = [
  ...questionSections.map((s) => ({ q: s.q, a: s.a })),
  {
    q: "Does the Haruka stop at Namba?",
    a: "No. The Haruka runs from Kansai Airport to Tennoji, Osaka Station, Shin-Osaka and Kyoto. For Namba, the Nankai Rapi:t is the direct train, from 34 minutes.",
  },
  {
    q: "Can I buy the HARUKA One-way Ticket at Kansai Airport?",
    a: "No. JR West says the HARUKA One-way Ticket is not sold within Japan. Buy it before you travel, then collect or activate it in Japan with your passport. The Rapi:t Digital Ticket is sold online by Nankai for a chosen date.",
  },
  {
    q: "Is the ICOCA & HARUKA set still sold?",
    a: `JR West's English ticket pages, read on ${CHECKED}, list the HARUKA One-way Ticket as the Haruka discount for visitors and do not list an ICOCA & HARUKA set. An ICOCA card is bought separately from the ticket machines at Kansai-airport Station, and JR West says credit cards cannot be used to buy one.`,
  },
];

const tripPrep: KlookTripPrepItem[] = [
  {
    label: "JR Haruka airport express ticket",
    ctaLabel: "Check the Haruka ticket →",
    url: jrHarukaUrl,
    why: "For Kyoto, Shin-Osaka, Umeda or Tennoji. JR West's discounted Haruka ticket is not sold inside Japan, so it has to be arranged before the flight.",
  },
  {
    label: "Nankai Limited Express Rapi:t ticket",
    ctaLabel: "Check the Rapi:t ticket →",
    url: nankaiRapitUrl,
    why: "For Namba, Dotonbori and Shinsaibashi. Every Rapi:t seat is reserved, so a ticket for a set train saves queuing after landing.",
  },
  {
    label: jrKansaiAreaPass.title,
    ctaLabel: "Check the Kansai Area Pass →",
    url: jrKansaiAreaPass.url,
    why: "Worth pricing if you are also riding JR to Kyoto, Nara or Himeji: JR West's pass covers the Haruka's non-reserved cars from the airport.",
  },
  {
    label: "Hotels in Namba",
    ctaLabel: "Check Namba hotels on Klook →",
    url: osakaStayAreas[1].url,
    why: "The Rapi:t ends at Namba, so a room here means no change of train after a long flight.",
  },
  {
    label: "Hotels around Umeda / Osaka Station",
    ctaLabel: "Check Umeda hotels on Klook →",
    url: osakaStayAreas[0].url,
    why: "The Haruka stops at Osaka Station, about 45 minutes from Kansai Airport with no change.",
  },
  {
    label: "Hotels around Kyoto Station",
    ctaLabel: "Check Kyoto Station hotels on Klook →",
    url: kyotoStayAreas[0].url,
    why: "Kyoto Station is the Haruka's terminus, about 75 minutes from the airport in one seat.",
  },
  {
    label: "Klook Japan eSIM",
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "Platform numbers, ticket QR codes and your hotel map all sit on your phone, so install it at home and it works when you clear customs.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function HarukaVsNankaiRapitPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={PAGE_URL} />
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
                { "@type": "ListItem", position: 1, name: "Home",      item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",    item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Haruka vs Nankai Rapit", item: PAGE_URL },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: ROUTE,
              headline: "Haruka vs Nankai Rapit (2026): Price, Time and Which to Take",
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Haruka vs Nankai Rapit</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Haruka vs Nankai Rapit (2026):<br />Price, Time and Which to Take
          </h1>
          <p className={styles.heroSubtitle}>
            One runs to Namba, the other to Tennoji, Umeda, Shin-Osaka and Kyoto. Your hotel decides the winner.
          </p>
          <div className={styles.heroBadges}>
            {[`Fares checked ${CHECKED}`, "By destination", "JR Pass rules"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* The answer, in the first body paragraph */}
        <p className={styles.bodyText}>
          <strong>From Kansai Airport to Kyoto</strong>, take the JR Haruka: about 75 minutes direct and ¥2,700 on JR
          West&apos;s HARUKA One-way Ticket. <strong>For Namba and Shinsaibashi</strong>, take the Nankai Rapi:t: a
          minimum of 34 minutes to Namba and ¥1,410 on Nankai&apos;s Rapi:t Digital Ticket. <strong>For Shin-Osaka
          and Umeda (Osaka Station)</strong>, take the Haruka again: about 50 and 45 minutes, ¥1,900 to either. A JR
          Pass covers the Haruka but not the Rapi:t. Adult fares from JR West and Nankai, times from Kansai Airport and
          Nankai, checked {CHECKED}.
        </p>

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Namba, Shinsaibashi</p>
                <p className={styles.verdictStatValue}>Rapi:t (from 34 min, ¥1,410)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Umeda, Shin-Osaka</p>
                <p className={styles.verdictStatValue}>Haruka (45–50 min, ¥1,900)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kyoto</p>
                <p className={styles.verdictStatValue}>Haruka (75 min, ¥2,700)</p>
              </div>
            </div>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              For buses, taxis and Itami Airport as well, see the full{" "}
              <Link href="/guides/transport/osaka-airport-transfer" style={{ fontWeight: 600 }}>Osaka airport transfer guide</Link>.
            </p>
          </div>
        </div>

        <EsimCtaTop />

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By destination</span>
          <h2 className={styles.sectionTitle}>Haruka vs Rapit compared by destination</h2>
          <p className={styles.bodyText}>
            Each station on this list is served directly by only one of the two trains, so the row for your hotel
            station is the answer.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", textAlign: "left", fontSize: "0.8rem", paddingTop: "0.5rem" }}>
                  Checked {CHECKED}. Adult one-way fares on the discounted visitor tickets.
                </caption>
                <thead>
                  <tr>
                    {["From Kansai Airport to", "Direct train", "Time", "Adult one-way", "Frequency", "Seats", "JR Pass", "Kansai Area Pass"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{row.train}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.freq}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.seats}</td>
                      <td>{row.jrPass}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.areaPass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Haruka fares: JR West&apos;s HARUKA One-way Ticket, for foreign passport holders entering as Temporary
            Visitors, with prices that changed for tickets sold on or after 1 November 2026. Rapi:t fares: Nankai&apos;s
            Rapi:t Digital Ticket (Regular Seat; Super Seat in brackets). Haruka times and frequency: Kansai Airport
            (frequency read {FREQ_CHECKED}); Rapi:t time: Nankai. Pass coverage: JR West and the JAPAN RAIL PASS site.
            JR West&apos;s ticket pages do not list an ICOCA &amp; HARUKA set; the HARUKA One-way Ticket is its current
            Haruka discount for visitors, and an ICOCA card is bought separately at the station. The regular Haruka fare
            and Nankai&apos;s ordinary fare are left out because neither is published on the pages read.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={jrHarukaUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check the Haruka ticket on Klook →
            </KlookLink>
            <KlookLink href={nankaiRapitUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check the Rapi:t ticket on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Question sections */}
        {questionSections.map((s) => (
          <section key={s.id} className={styles.bodySection}>
            <h2 className={styles.sectionTitle}>{s.q}</h2>
            <p className={styles.bodyText}>{s.a}</p>
            <p className={styles.bodyText}>{s.more}</p>
            {s.id === "jr-pass" && (
              <p className={styles.bodyText}>
                If you will ride JR to Kyoto, Nara or Himeji on the same days, compare the{" "}
                <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass</Link> against single tickets. Inside
                the city, neither airport train is covered by an{" "}
                <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass</Link>, which starts once you are on the
                subway.
              </p>
            )}
            {s.id === "kyoto" && (
              <p className={styles.bodyText}>
                The Haruka ends at Kyoto Station, which is why{" "}
                <Link href="/guides/attractions/where-to-stay-in-kyoto">where to stay in Kyoto</Link> starts with the
                station area for a short stay. Splitting a trip between the two cities? Our{" "}
                <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">3-day Osaka and Kyoto itinerary</Link>{" "}
                lays out the days between them. For a Kyoto arrival, the 1-day{" "}
                <Link href="/guides/attractions/kansai-area-pass">JR Kansai Area Pass</Link> is the same ¥2,700 as the
                HARUKA single to Kyoto and includes the Haruka.
              </p>
            )}
            {s.id === "faster" && (
              <p className={styles.bodyText}>
                Not booked yet? <Link href="/guides/attractions/where-to-stay-in-osaka">Where to stay in Osaka</Link>{" "}
                compares Namba, Umeda and Tennoji, including which airport line reaches each.
              </p>
            )}
          </section>
        ))}

        {/* What to book before arrival */}
        <KlookTripPrep
          label="Before you land"
          heading="What to book before you arrive at Kansai Airport"
          intro="With the train chosen, these are the bookings that make the arrival day simple. The Haruka discount ticket in particular cannot be bought once you are in Japan."
          items={tripPrep}
        />

        <BookingEsimCard lead="Landing at Kansai? Get mobile data before you fly." />

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Haruka or Rapit: which should you take?</h2>
          <p className={styles.verdictText}>
            The two trains barely compete, because they serve different parts of Osaka. For <strong>Namba</strong> and
            southern Osaka, the <strong>Nankai Rapi:t</strong> is the direct train and the cheaper discounted ticket.
          </p>
          <p className={styles.verdictText}>
            For <strong>Tennoji, Umeda, Shin-Osaka or Kyoto</strong>, or with a JR Pass or Kansai Area Pass, the{" "}
            <strong>JR Haruka</strong> runs there in one seat. Match the train to your hotel station.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book your Kansai Airport train</h2>
            <p className={styles.ctaBannerDesc}>
              Reserve the Haruka or the Rapi:t before you fly and head straight to the platform on arrival at KIX.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrHarukaUrl} className={styles.ctaBannerBtn} target="_blank" rel="sponsored noopener">
                Book Haruka →
              </KlookLink>
              <KlookLink href={nankaiRapitUrl} className={styles.ctaBannerBtn} target="_blank" rel="sponsored noopener">
                Book Rapi:t →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
