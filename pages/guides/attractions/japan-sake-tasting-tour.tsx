import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  fushimiEighteenSakeTour,
  fushimiInariSakeTour,
  fushimiSakeCanalBoatTour,
  klookEsim,
  kobeNadaSakeHalfDayTour,
  kobeSakeBreweryTastingTour,
  kyotoSakeTastingBreweryTour,
  sakeTastingTripPrep,
  tokyoOzawaBreweryTour,
  tokyoSakePrivateCarTour,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Sake tasting in Japan — where, what the breweries charge, how long, and the 20+ rule,
 * with the Klook tours for Kyoto (Fushimi), Kobe (Nada) and Tokyo (Ome).
 * Added 14 Nov 2026 (task-jtk-20261114-02).
 *
 * Official reads on 14 Nov 2026:
 *   gekkeikan.co.jp/enjoy/museum/access/  Gekkeikan Okura Sake Museum: 20+ ¥600 with three
 *                                       tastings, 13–19 ¥100, 12 and under free; 9:30–16:30,
 *                                       reception to 16:00; 40–60 min; no guide; Keihan Chushojima
 *                                       5 min, Fushimi-Momoyama 10 min; online reservation asked
 *                                       for (from two weeks before), same-day slots on the hour and
 *                                       half hour, may be full; closed 13–16 Aug and 28 Dec – 4 Jan;
 *                                       closed 16–19 Nov 2026, 9:30–14:00 on 20 Nov 2026; no tasting
 *                                       for drivers, under-20s, pregnant or breastfeeding visitors.
 *                                       Brewery guided tour ¥3,000, about 80 min, booking from the
 *                                       1st of the month before to 16:00 two days before; late by
 *                                       20 min = cancelled.
 *   hakutsuru.co.jp/community/shiryo/   Hakutsuru Sake Brewery Museum (Kobe, Nada): free,
 *                                       self-guided; 9:30–16:30, entry to 16:00; no booking needed
 *                                       (10+ book); Hanshin Sumiyoshi about 5 min, JR Sumiyoshi
 *                                       about 15 min; closed 5–18 Aug 2026 and 28 Dec 2026 – 4 Jan 2027.
 *   sawanoi-sake.com/service/kengaku/   Ozawa Shuzo (Sawanoi), Ome, Tokyo: brewery tour by
 *                                       reservation, ¥700 per person (under 20 free), about 40 min,
 *                                       tasting and an original sake cup; weekdays 11:00 and 13:00,
 *                                       weekends and holidays 11:00, 12:30 and 14:00; closed Mondays
 *                                       (Tuesday after a holiday); same-day only if seats remain
 *                                       (Sawanoi-en shop). /company/: JR Ome Line Sawai Station,
 *                                       about 5 min on foot.
 *
 * Klook tour lengths and meeting points are from the www.klook.com search index, read the
 * same day. Not printed: a Kizakura or Kobe tasting fee (not read), a train time from central
 * Tokyo to Sawai, and any Klook price.
 */

const ROUTE = "/guides/attractions/japan-sake-tasting-tour";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-14");

const GEKKEIKAN = "¥600";
const SAWANOI = "¥700";

/** Table 1: where — first row is the answer. */
const breweryRows = [
  {
    place: "Kyoto · Fushimi — Gekkeikan Okura Sake Museum",
    station: "Keihan Chushojima, 5 min (Fushimi-Momoyama, 10 min)",
    visit: `Yes — ${GEKKEIKAN} for 20+ with three tastings; 40–60 min; 9:30–16:30`,
    booking: "Online booking asked for; same-day slots too, can be full",
  },
  {
    place: "Kyoto · Fushimi — Gekkeikan brewery guided tour",
    station: "Same building, next to the Uchigura brewery",
    visit: "Yes — ¥3,000, about 80 min, three premium tastings and a 300 mL bottle you fill",
    booking: "Required; from the 1st of the month before",
  },
  {
    place: "Kobe · Nada — Hakutsuru Sake Brewery Museum",
    station: "Hanshin Sumiyoshi, about 5 min (JR Sumiyoshi, about 15 min)",
    visit: "Yes — free, self-guided; 9:30–16:30, entry to 16:00",
    booking: "Not needed (groups of 10+ book)",
  },
  {
    place: "Tokyo · Ome — Ozawa Shuzo (Sawanoi)",
    station: "JR Ome Line Sawai, about 5 min",
    visit: `Yes — ${SAWANOI} per person with tasting, about 40 min; closed Mondays`,
    booking: "Required; same day only if seats are left",
  },
];

/** Table 2: tour or on your own. */
const compareRows = [
  {
    way: "Klook tour (Fushimi, Nada or Tokyo)",
    time: "About 2–3.5 hours on the listings",
    get: "Several breweries or tastings, an English-speaking guide, a set meeting point",
    pick: "First time, or when you want the labels and styles explained",
  },
  {
    way: "Brewery museum on your own",
    time: "40–60 min (Gekkeikan)",
    get: "One brewery's exhibits and a short tasting; no guide",
    pick: "Short on time, or adding sake to a Fushimi Inari day",
  },
  {
    way: "Brewery's own guided tour",
    time: "About 40 min (Sawanoi) to 80 min (Gekkeikan)",
    get: "Inside a working brewery, led by brewery staff",
    pick: "If you want the brewery itself — check the guiding language before booking",
  },
  {
    way: "Private car tour from Tokyo",
    time: "About 6 hours on the listing",
    get: "Hotel pick-up, a brewery tour, tasting and lunch",
    pick: "Groups, or anyone who would rather not ride the Ome Line back after tasting",
  },
];

const faqItems = [
  {
    q: "Where can you do sake tasting in Japan?",
    a: `The three easiest places for a visitor are Fushimi in Kyoto (Gekkeikan Okura Sake Museum, ${GEKKEIKAN} with three tastings), the Nada district of Kobe (Hakutsuru Sake Brewery Museum, free) and Ome in western Tokyo (Ozawa Shuzo, ${SAWANOI} brewery tour with tasting). Read on the breweries' own sites ${OWN}.`,
  },
  {
    q: "How much does sake tasting cost in Japan?",
    a: `At the breweries: ${GEKKEIKAN} at Gekkeikan's museum in Kyoto for anyone 20 or over, with three tastings; ${SAWANOI} for the Sawanoi brewery tour in Tokyo; Gekkeikan's guided brewery tour is ¥3,000. Hakutsuru's museum in Kobe is free. Guided tours cost more and their prices change by date — check the listing.`,
  },
  {
    q: "How old do you have to be to drink sake in Japan?",
    a: "20. Breweries will not serve anyone under 20, and Gekkeikan also refuses tastings to anyone driving a car, motorbike or bicycle, and to pregnant or breastfeeding visitors. Under-20s can still join: Gekkeikan charges ¥100 for ages 13–19 and nothing for 12 and under, and Sawanoi does not charge under-20s.",
  },
  {
    q: "Can you visit a sake brewery without a tour?",
    a: "Yes. Gekkeikan Okura Sake Museum in Fushimi and Hakutsuru Sake Brewery Museum in Kobe are self-guided museums at working breweries. Gekkeikan asks for an online booking but keeps same-day slots; Hakutsuru needs no booking. Sawanoi in Tokyo is by reservation, with same-day places only if seats remain.",
  },
  {
    q: "How long does a sake tasting tour take?",
    a: "Most Klook tours in Fushimi and Nada are listed at about 3 hours; the Tokyo group tour at about 2 hours and the private car tour at about 6. On your own, Gekkeikan's museum takes 40–60 minutes and Sawanoi's brewery tour about 40.",
  },
  {
    q: "Is Fushimi or Nada better for sake tasting?",
    a: "Fushimi if you are based in Kyoto: it pairs with Fushimi Inari on the same day, and Gekkeikan's museum is 5 minutes from Keihan Chushojima. Nada if you are in Osaka or Kobe: Hakutsuru's museum is free and about 5 minutes from Hanshin Sumiyoshi.",
  },
  {
    q: "Can I do sake tasting in Tokyo?",
    a: `Yes, at a brewery in Ome on the JR Ome Line: Ozawa Shuzo (Sawanoi) runs a ${SAWANOI} tour with tasting, about 40 minutes, two or three times a day and not on Mondays. Klook also sells a 2-hour group tour from Sawai Station and a private car day with hotel pick-up.`,
  },
];

const TITLE = "Sake Tasting Tour Japan 2026: Kyoto, Kobe & Tokyo Breweries";
const DESCRIPTION =
  "Sake tasting tour Japan: sake tasting Kyoto in Fushimi (¥600, 3 sakes), Kobe's free Nada museum, sake tasting Tokyo in Ome — sake brewery tour fees, 20+.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function JapanSakeTastingTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
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
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                { "@type": "ListItem", position: 4, name: "Sake Tasting Tour Japan", item: URL },
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
          <span className={styles.breadCurrent}>Sake Tasting Tour Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sake Tasting Tour Japan (2026):<br />Where to Taste, What It Costs, and the 20+ Rule
          </h1>
          <p className={styles.heroSubtitle}>
            Three brewing towns a visitor can reach by train — Fushimi, Nada and Ome — with the breweries&apos;
            own fees and hours, and when a guided tour is worth it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Brewery fees from their own sites", "Kyoto, Kobe & Tokyo", "Tour vs on your own"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Fushimi (Kyoto), Nada (Kobe), Ome (Tokyo)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Brewery fees</p>
                <p className={styles.verdictStatValue}>Free to {SAWANOI}; Gekkeikan {GEKKEIKAN} with 3 tastings</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time</p>
                <p className={styles.verdictStatValue}>40–60 min alone; about 3 h on a tour</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Minimum age</p>
                <p className={styles.verdictStatValue}>20 to drink</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>sake tasting tour in Japan</strong> is easiest in three brewing towns: Fushimi in Kyoto,
              Nada in Kobe and Ome in western Tokyo. Gekkeikan&apos;s museum in Fushimi charges{" "}
              <strong>{GEKKEIKAN}</strong> with three tastings, Hakutsuru&apos;s museum in Nada is{" "}
              <strong>free</strong>, and the Sawanoi brewery tour in Ome is <strong>{SAWANOI}</strong>. On your own a
              brewery visit takes <strong>40–60 minutes</strong>; a guided tasting tour takes about{" "}
              <strong>3 hours</strong>. You must be <strong>20 or older</strong> to drink in Japan, and breweries
              check. Fees read on the breweries&apos; own sites {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoSakeTastingBreweryTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Fushimi Sake Tasting Tour →
              </KlookLink>
              <KlookLink href={tokyoOzawaBreweryTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Tokyo Brewery Tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Where */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where</span>
          <h2 className={styles.sectionTitle}>Where Can You Do Sake Tasting in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Fushimi for Kyoto, Nada for Osaka and Kobe, Ome for Tokyo. All three have a brewery that takes walk-in
            or booked visitors and is a few minutes from a station.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Sake brewery tour", "Nearest station", "Visit & fee", "Booking"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breweryRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={thStyle}>{row.place}</td>
                      <td style={thStyle}>{row.station}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.visit}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.gekkeikan.co.jp/enjoy/museum/access/" target="_blank" rel="noopener">gekkeikan.co.jp</a>,{" "}
            <a href="https://www.hakutsuru.co.jp/community/shiryo/" target="_blank" rel="noopener">hakutsuru.co.jp</a>,{" "}
            <a href="https://www.sawanoi-sake.com/service/kengaku/" target="_blank" rel="noopener">sawanoi-sake.com</a>.
            Gekkeikan&apos;s museum is closed 16–19 November 2026 and closes at 14:00 on 20 November. No Klook price
            appears on this page.
          </p>
        </section>

        {/* Kyoto */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kyoto</span>
          <h2 className={styles.sectionTitle}>Where Is the Best Sake Tasting in Kyoto?</h2>
          <p className={styles.bodyText}>
            Fushimi, south of the centre. The Gekkeikan Okura Sake Museum is 5 minutes from Keihan Chushojima
            Station and open 9:30–16:30 (reception until 16:00). Entry is {GEKKEIKAN} for anyone 20 or over and
            includes three sakes chosen from about ten seasonal ones; there is no guide, and the visit takes 40–60
            minutes. For the inside of the brewery, Gekkeikan&apos;s own guided tour is ¥3,000 for about 80
            minutes, with three premium tastings and a 300 mL bottle you fill yourself. Fushimi Inari is on the
            same side of the city, so the two make one day — see our{" "}
            <Link href="/guides/attractions/fushimi-inari-tour">Fushimi Inari tour guide</Link> and the{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2-day itinerary</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoSakeTastingBreweryTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Fushimi sake tasting (3 h) →
            </KlookLink>
            <KlookLink href={fushimiEighteenSakeTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Fushimi 18-sake walk →
            </KlookLink>
            <KlookLink href={fushimiInariSakeTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Fushimi Inari + sake tasting →
            </KlookLink>
          </div>
        </section>

        {/* Kobe */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kobe</span>
          <h2 className={styles.sectionTitle}>Can You Do Sake Tasting in Kobe?</h2>
          <p className={styles.bodyText}>
            Yes, in Nada, east of central Kobe. The Hakutsuru Sake Brewery Museum is free and self-guided, about 5
            minutes from Hanshin Sumiyoshi Station, open 9:30–16:30 with last entry at 16:00, and needs no booking
            unless you are ten or more. It closes over New Year (28 December 2026 – 4 January 2027). Klook&apos;s
            Nada tours walk between several breweries in about three hours, which our{" "}
            <Link href="/guides/attractions/kobe-day-trip-from-osaka">Kobe day trip from Osaka</Link> can fit
            around.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kobeNadaSakeHalfDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nada half-day with food →
            </KlookLink>
            <KlookLink href={kobeSakeBreweryTastingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kobe brewery tour with tasting →
            </KlookLink>
          </div>
        </section>

        {/* Tokyo */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tokyo</span>
          <h2 className={styles.sectionTitle}>Can You Do Sake Tasting in Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes, at a working brewery in Ome, on the JR Ome Line in the hills of western Tokyo. Ozawa Shuzo, maker
            of Sawanoi, runs a {SAWANOI} tour of about 40 minutes with a tasting and an original sake cup — at
            11:00 and 13:00 on weekdays, and 11:00, 12:30 and 14:00 at weekends and on holidays. It is closed on
            Mondays (Tuesday when Monday is a holiday) and is by reservation; same-day places go only if seats are
            left. Sawai Station is about 5 minutes on foot. For sake in the city itself, our{" "}
            <Link href="/guides/attractions/tokyo-night-food-tour">Tokyo night food tour guide</Link> covers the
            bar streets of Shinjuku.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoOzawaBreweryTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo brewery tour (2 h) →
            </KlookLink>
            <KlookLink href={tokyoSakePrivateCarTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private car day from Tokyo →
            </KlookLink>
          </div>
        </section>

        {/* Age */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Age &amp; rules</span>
          <h2 className={styles.sectionTitle}>How Old Do You Have to Be to Drink Sake in Japan?</h2>
          <p className={styles.bodyText}>
            20. The drinking age in Japan is 20, whatever it is at home, and every brewery here states it.
            Gekkeikan also will not pour for anyone who drove there — car, motorbike or bicycle — or for pregnant
            or breastfeeding visitors. Under-20s can still come along: Gekkeikan charges ¥100 for ages 13–19 and
            nothing for 12 and under, and Sawanoi does not charge under-20s (they get a yuzu cider instead of the
            cup). Klook&apos;s Fushimi tasting listing asks for a valid ID, so carry your passport.
          </p>
        </section>

        {/* Tour vs DIY */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or on your own</span>
          <h2 className={styles.sectionTitle}>Can You Visit a Sake Brewery Without a Tour?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — Gekkeikan&apos;s and Hakutsuru&apos;s museums are made for it. A tour earns its price when you want
            more than one brewery, the styles explained in English, and someone else&apos;s timetable.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Way to do it", "Time", "What you get", "Pick it if"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.way}>
                      <td className={styles.tdProvider} style={thStyle}>{row.way}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td style={thStyle}>{row.get}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Brewery times from gekkeikan.co.jp and sawanoi-sake.com, {OWN}; tour lengths from the Klook listings,
            read the same day. The breweries&apos; own pages do not promise English guiding, so check before
            relying on it.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book a Sake Tasting Tour?</h2>
          <p className={styles.bodyText}>
            For the brewery tours, yes; for the museums, it helps. Gekkeikan&apos;s museum takes online bookings
            from two weeks ahead and keeps same-day slots on the hour and half hour, but warns it can be full;
            its guided brewery tour opens on the 1st of the month before and closes two days ahead, and arriving
            20 minutes late cancels it. Sawanoi&apos;s tour has only two or three departures a day, so book the
            time before you plan the train. Klook tours run on fixed start times with the cancellation deadline on each
            listing; check it before you pay, and check the brewery&apos;s own notices for closures — Gekkeikan
            is closed 16–19 November 2026 and both Kyoto and Kobe close over New Year.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Which Should I Choose?
          </h3>
          <p className={styles.bodyText}>
            In Kyoto with a spare afternoon: the Fushimi tasting tour, which meets at Gekkeikan&apos;s museum. In
            Kyoto with only an hour: the museum on its own after Fushimi Inari. Based in Osaka: Nada, free on your
            own or guided. Only in Tokyo: the Sawai brewery tour, or the private car day if you would rather not
            take the train back after tasting.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoSakeTastingBreweryTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Fushimi tasting tour →
            </KlookLink>
            <KlookLink href={fushimiSakeCanalBoatTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Fushimi sake + canal boat →
            </KlookLink>
            <KlookLink href={tokyoOzawaBreweryTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo brewery tour →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What Should I Book With a Sake Tour?"
          intro="The tasting, a base near the brewery town, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={sakeTastingTripPrep}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Brewery bookings, tour meeting points and the train home after a tasting all run on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
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
          heading="Sake Tasting Tours on Klook"
          intro="Fushimi, Nada and Tokyo. Durations, meeting points, languages and the age rule are on each listing."
          tours={[kyotoSakeTastingBreweryTour, fushimiEighteenSakeTour, kobeNadaSakeHalfDayTour, tokyoOzawaBreweryTour, tokyoSakePrivateCarTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/fushimi-inari-tour", title: "Fushimi Inari Tour 2026: Hike Time, Hours & Best Time" },
              { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and Bookings" },
              { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka (2026): Routes and the Beef" },
              { href: "/guides/attractions/tokyo-night-food-tour", title: "Tokyo Night Food Tour (2026): Omoide Yokocho, Golden Gai" },
              { href: "/guides/attractions/nagoya-castle-tickets", title: "Nagoya Castle Tickets 2026: Price, Hours & Can You Go Inside" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
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
            <h2 className={styles.ctaBannerTitle}>Fushimi, Nada or Ome — then book the slot</h2>
            <p className={styles.ctaBannerDesc}>
              The museums are {GEKKEIKAN} or free; the guided tastings have fixed start times. Pick the town on
              your route and book the time first.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kyotoSakeTastingBreweryTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Fushimi Tasting →
              </KlookLink>
              <KlookLink href={tokyoOzawaBreweryTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Tokyo Brewery Tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
