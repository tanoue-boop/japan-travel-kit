import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  shibuyaBicycleTour,
  tokyoBikeTourTripPrep,
  tokyoCentralBikeTour,
  tokyoEbikeHiddenGemsTour,
  tokyoImperialPalaceShibuyaBikeTour,
  tokyoNightBikeTour,
  tokyoPrivateEbikeTour,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Tokyo bike tour, added 19 Nov 2026 (task-jtk-20261119-02).
 *
 * How it differs from its neighbours:
 *  - things-to-do-tokyo lists the sights; tokyo-sightseeing-bus-tour sees them from
 *    a coach or an open-top bus; this page sees the same central sights by bicycle,
 *    with a guide, and answers the bike-rules questions a visitor has.
 *
 * Sources and dates:
 *  - Tour facts (length, route, start times, bike type, ages): the Klook listings in
 *    lib/klook-links.ts, read through the www.klook.com search index on 19 Nov 2026.
 *    No Klook price appears on this page.
 *  - Bike rules and fines: National Police Agency (警察庁), bicycle portal "new system"
 *    page (blue tickets from 1 April 2026, riders 16+) and the 自転車ルールブック
 *    (September 2025 edition, PDF), both read 19 Nov 2026.
 */

const CHECKED = checkedLabel("2026-11-19");
const NPA_PORTAL = "https://www.npa.go.jp/bureau/traffic/bicycle/portal/system.html";
const NPA_RULEBOOK = "https://www.npa.go.jp/bureau/traffic/bicycle/pdf/rulebook.pdf";
const NPA_FIVE_RULES = "https://www.npa.go.jp/bureau/traffic/bicycle/info.html";

const ROUTE = "/guides/attractions/tokyo-bike-tour";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const rel = "sponsored nofollow noopener";

type TourType = { type: string; length: string; bike: string; route: string; who: string; book: ReactNode };

const tourTypes: TourType[] = [
  {
    type: "Daytime city tour, bike or e-bike — the pick for a first ride",
    length: "3 hours; 10:00 or 14:00",
    bike: "Cross bike, or an e-bike option",
    route: "Shiba Park → Zojo-ji → Imperial Palace → Tokyo Station → Akasaka Palace → National Stadium → Harajuku → Jinnan (Shibuya)",
    who: "Ages 14+; intermediate fitness, or the e-bike if long distances are a concern",
    book: <KlookLink href={tokyoCentralBikeTour.url} target="_blank" rel={rel}>3-hour central Tokyo tour</KlookLink>,
  },
  {
    type: "E-bike tour",
    length: "3 hours",
    bike: "E-bike (no licence needed)",
    route: "Tokyo Station, the Imperial Palace and lesser-known streets",
    who: "Anyone who wants the hills and distance taken out",
    book: <KlookLink href={tokyoEbikeHiddenGemsTour.url} target="_blank" rel={rel}>3-hour e-bike tour</KlookLink>,
  },
  {
    type: "Night ride",
    length: "2 hours",
    bike: "Bikes fitted with neon lights",
    route: "Meets in Shibuya; illuminated spots after dark",
    who: "A second evening activity; bring gloves in winter",
    book: <KlookLink href={tokyoNightBikeTour.url} target="_blank" rel={rel}>2-hour night bike tour</KlookLink>,
  },
  {
    type: "Short ride",
    length: "1 hr 10 – 1 hr 30",
    bike: "Ordinary bicycle",
    route: "Shibuya Crossing, Meiji Jingu, Harajuku, Shinjuku",
    who: "A taster on a full day",
    book: <KlookLink href={shibuyaBicycleTour.url} target="_blank" rel={rel}>Shibuya bicycle tour</KlookLink>,
  },
  {
    type: "Private e-bike tour",
    length: "2 hours (per the listing title)",
    bike: "E-bike",
    route: "Shinjuku, Shibuya and Akihabara",
    who: "Ages 10+; bookable for one person, with your own English-speaking guide",
    book: <KlookLink href={tokyoPrivateEbikeTour.url} target="_blank" rel={rel}>Private e-bike tour</KlookLink>,
  },
];

type Area = { area: string; see: string; tour: ReactNode; time: string };

const areas: Area[] = [
  {
    area: "Imperial Palace & Marunouchi",
    see: "The palace moats and outer gardens, Tokyo Station's red-brick front",
    tour: (
      <>
        <KlookLink href={tokyoCentralBikeTour.url} target="_blank" rel={rel}>Central tour</KlookLink>,{" "}
        <KlookLink href={tokyoEbikeHiddenGemsTour.url} target="_blank" rel={rel}>e-bike tour</KlookLink>,{" "}
        <KlookLink href={tokyoImperialPalaceShibuyaBikeTour.url} target="_blank" rel={rel}>Imperial Palace & Shibuya tour</KlookLink>
      </>
    ),
    time: "Part of a 3-hour tour",
  },
  {
    area: "Shiba & Akasaka",
    see: "Zojo-ji temple below Tokyo Tower, the Akasaka Palace front",
    tour: <KlookLink href={tokyoCentralBikeTour.url} target="_blank" rel={rel}>Central tour</KlookLink>,
    time: "Part of a 3-hour tour",
  },
  {
    area: "Harajuku & Shibuya",
    see: "Meiji Jingu, the National Stadium, Shibuya Crossing",
    tour: (
      <>
        <KlookLink href={shibuyaBicycleTour.url} target="_blank" rel={rel}>Shibuya bicycle tour</KlookLink>; end of the central tour
      </>
    ),
    time: "1 hr 10 – 1 hr 30 on the short tour",
  },
  {
    area: "Shinjuku & Akihabara",
    see: "The west side's towers and the electronics district",
    tour: <KlookLink href={tokyoPrivateEbikeTour.url} target="_blank" rel={rel}>Private e-bike tour</KlookLink>,
    time: "2 hours (listing title)",
  },
  {
    area: "Asakusa, Ueno & Yanaka",
    see: "Senso-ji, Ueno Park, the old-town lanes of Yanaka",
    tour: "No English-language (en-US) Klook bike tour found for this side on the check date — walk it, or see the Asakusa guides below",
    time: "—",
  },
];

const fines = [
  { rule: "Using a phone held in the hand while riding (calling or looking at the screen)", fine: "¥12,000" },
  { rule: "Ignoring a traffic signal", fine: "¥6,000" },
  { rule: "Riding on the right side of the road (against traffic), or on the pavement where it is not allowed", fine: "¥6,000 (riding on the road is the rule)" },
  { rule: "Riding while holding an umbrella, or with earphones that block surrounding sound", fine: "¥5,000" },
  { rule: "No light at night", fine: "¥5,000" },
  { rule: "Riding side by side", fine: "¥3,000" },
  { rule: "Two people on one bicycle", fine: "¥3,000" },
  { rule: "Riding after drinking", fine: "Not a fixed fine — a criminal case" },
];

const faqItems = [
  {
    q: "How long is a Tokyo bike tour?",
    a: "Most guided Tokyo bike tours run 2 to 3 hours. The central-Tokyo bike or e-bike tour is 3 hours, from Shiba Park past the Imperial Palace to Shibuya, with 10:00 and 14:00 starts; the night ride is 2 hours; a Shibuya-only ride is 1 hour 10 to 1 hour 30.",
  },
  {
    q: "Is a bike tour a good way to see Tokyo?",
    a: "Yes, for the central sights that are too far apart to walk and awkward by subway — the Imperial Palace, Tokyo Station, Akasaka, Harajuku and Shibuya fit one 3-hour ride. It is less suited to Asakusa and Yanaka, where no English-language Klook bike tour turned up on the check date.",
  },
  {
    q: "Do you need cycling experience for a Tokyo bike tour?",
    a: "You need to ride comfortably, but not to be fit. The 3-hour central tour asks for riders aged 14+ who can ride a bike comfortably and rates fitness as intermediate, and offers an e-bike for anyone who finds long distances hard. The 3-hour e-bike tour's listing says no licence is needed.",
  },
  {
    q: "Is there an e-bike tour in Tokyo?",
    a: "Yes. A 3-hour e-bike tour passes Tokyo Station and the Imperial Palace; the 3-hour central tour lets you choose an e-bike instead of a cross bike; and a private 2-hour e-bike tour covers Shinjuku, Shibuya and Akihabara.",
  },
  {
    q: "What happens to a Tokyo bike tour in the rain?",
    a: "Read the listing's terms: the central tour shows free cancellation with 24 hours' notice and notes that stops may be skipped for weather or capacity. You cannot ride holding an umbrella in Japan — it is a ¥5,000 fine under the 2026 blue-ticket system — so wear a rain jacket.",
  },
  {
    q: "What are Japan's bike rules for tourists?",
    a: "Ride on the road and keep left; the pavement only where a sign allows it or the road is unsafe. Stop at red lights, use a light at night, and do not ride holding a phone or an umbrella, side by side, two to a bike, or after drinking. From 1 April 2026 riders 16 and over can be given a fixed fine (a 'blue ticket') — ¥12,000 for a phone in the hand, ¥6,000 for a red light.",
  },
  {
    q: "Do you have to wear a helmet on a bike in Japan?",
    a: "Japan's law says every cyclist should make an effort to wear a helmet — it is an obligation to try, with no fine. Check the listing's 'What's included' to see whether the tour provides one.",
  },
  {
    q: "Can children join a Tokyo bike tour?",
    a: "It depends on the listing's minimum age: 14+ on the 3-hour central tour and 10+ on the private e-bike tour. Children under 13 may ride on the pavement in Japan; adults on a tour ride on the road with the guide.",
  },
];

const TITLE = "Tokyo Bike Tour (2026): E-Bike, Night Rides & Bike Rules";
const DESCRIPTION =
  "Tokyo bike tour guide: 2–3 hours past the Imperial Palace to Shibuya. Tokyo cycling tour vs e-bike tour Tokyo vs night ride, and Japan's 2026 bike rules.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo 2026: Top Picks and Ticket Prices" },
  { href: "/guides/attractions/tokyo-sightseeing-bus-tour", title: "Tokyo Sightseeing Bus Tour 2026: Hato Bus vs Sky Hop Bus" },
  { href: "/guides/attractions/tokyo-photoshoot", title: "Tokyo Photoshoot (2026): Spots, Kimono Shoots & How to Book" },
  { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket 2026: 24/48/72-Hour Price, Worth It?" },
  { href: "/guides/attractions/asakusa-kimono-rental", title: "Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph" },
  { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo 2026: Best Areas by Trip Type" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
const h3 = { fontSize: "1.1rem", marginTop: "1.5rem" } as const;

export default function TokyoBikeTourPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo Bike Tour", item: URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {crumbSep}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {crumbSep}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Tokyo Bike Tour</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Bike Tour (2026): <br />Cycling Tours, E-Bikes and the Rules
          </h1>
          <p className={styles.heroSubtitle}>
            Which Tokyo cycling tour to book — daytime, e-bike or night — where each one rides, and the bike rules
            that have carried fixed fines since April 2026.
          </p>
          <div className={styles.heroBadges}>
            {[`Listings read ${CHECKED}`, "Rules from the National Police Agency", "No Klook prices — check per date"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>3 hours by day; 2 at night</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Route</p>
                <p className={styles.verdictStatValue}>Shiba Park → Imperial Palace → Shibuya</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>E-bike</p>
                <p className={styles.verdictStatValue}>Yes — on most tours</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A guided <strong>Tokyo bike tour</strong> takes 3 hours by day — Shiba Park and Zojo-ji, the Imperial
              Palace, Tokyo Station, Akasaka, the National Stadium and Harajuku, ending by Shibuya — with 10:00 and
              14:00 starts, a cross bike or an <strong>e-bike</strong>, and a minimum age of 14. A night ride is 2
              hours from Shibuya. Klook listings give the time rather than a distance; the one Asakusa route that
              states it lists 12 km in 3 hours. In rain, read the listing&apos;s terms — the central tour shows free
              cancellation with 24 hours&apos; notice — and wear a jacket: riding with an umbrella is a ¥5,000
              fine in Japan (Klook listings and National Police Agency rules, read {CHECKED}).
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Prefer a seat to a saddle? The{" "}
              <Link href="/guides/attractions/tokyo-sightseeing-bus-tour">Tokyo sightseeing bus tour</Link> covers
              similar sights by coach. Still choosing what to see? Start with{" "}
              <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoCentralBikeTour.url} target="_blank" rel={rel} className={styles.verdictBtn}>
                3-hour Tokyo bike / e-bike tour →
              </KlookLink>
              <KlookLink href={tokyoNightBikeTour.url} target="_blank" rel={rel} className={styles.verdictBtn}>
                Tokyo night bike tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same visit"
          heading="Book These With the Bike Tour"
          intro="A hotel near where the ride ends, a day pass for the rest of the day, and data for the meeting point. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoBikeTourTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour types</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Cycling Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The 3-hour daytime tour for a first visit; the e-bike tour if distance worries you; the night ride as
            an extra evening; the private e-bike tour to set your own pace.
          </p>
          <SimpleTable
            head={["Type", "Length / start", "Bike", "Route", "Who it suits", "Listing"]}
            rows={tourTypes.map((t) => [t.type, t.length, t.bike, t.route, t.who, t.book])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {CHECKED}, from the Klook listings linked in each row (klook.com, en-US). Some stops may be skipped for weather or capacity, as the central tour&apos;s listing notes. Prices
            change by date and are left to the listing.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoCentralBikeTour.url} target="_blank" rel={rel} className={styles.pickCta}>
              Check the 3-hour tour for your date →
            </KlookLink>
            <KlookLink href={tokyoEbikeHiddenGemsTour.url} target="_blank" rel={rel} className={styles.pickCta}>
              E-bike tour Tokyo →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By area</span>
          <h2 className={styles.sectionTitle}>Where Do Tokyo Bike Tours Go?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The centre and the west: the Imperial Palace, Tokyo Station, Shiba and Akasaka, Harajuku and Shibuya.
            The old east side — Asakusa, Ueno, Yanaka — is not covered by the English-language tours found.
          </p>
          <SimpleTable
            head={["Area", "What you see", "Tour", "Time"]}
            rows={areas.map((a) => [a.area, a.see, a.tour, a.time])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {CHECKED}, from the linked Klook listings. Times are the length of the tour that covers the
            area, not a time per stop. For Asakusa on foot, see{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental">Asakusa kimono rental</Link> and{" "}
            <Link href="/guides/attractions/tokyo-photoshoot">Tokyo photoshoot</Link>.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Worth it?</span>
          <h2 className={styles.sectionTitle}>Is a Bike Tour a Good Way to See Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes, for the middle of the city. The Imperial Palace, Tokyo Station, Akasaka, the National Stadium,
            Harajuku and Shibuya are too far apart to walk in a morning and awkward to join up by subway, and a
            3-hour ride links them at street level, with a guide leading the way. It is a weaker
            choice for Asakusa and Yanaka, which are best on foot, and in mid-summer heat or heavy rain. Compared
            with a <Link href="/guides/attractions/tokyo-sightseeing-bus-tour">sightseeing bus</Link>, a bike tour
            covers less ground but stops more often.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoCentralBikeTour.url} target="_blank" rel={rel} className={styles.pickCta}>
              Central Tokyo bike tour →
            </KlookLink>
            <KlookLink href={tokyoImperialPalaceShibuyaBikeTour.url} target="_blank" rel={rel} className={styles.pickCta}>
              Imperial Palace & Shibuya bike tour →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Experience</span>
          <h2 className={styles.sectionTitle}>Do You Need Cycling Experience for a Tokyo Bike Tour?</h2>
          <p className={styles.bodyText}>
            You need to be able to ride comfortably in traffic, not to be fit. The 3-hour central tour is for ages
            14+, rates fitness as intermediate, and offers an e-bike to anyone who finds long distances
            uncomfortable. The e-bike tour needs no licence. If you have not ridden for years, book the e-bike or
            the 1-hour-10 Shibuya ride rather than the full 3 hours.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>E-bike tour Tokyo: is it worth choosing the e-bike?</h3>
          <p className={styles.bodyText}>
            Yes, if you are unsure about 3 hours in the saddle. The motor assists your pedalling on hills and when
            pulling away at lights — the central tour&apos;s listing offers it for riders who find long distances
            uncomfortable or have limited stamina.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What should you wear?</h3>
          <p className={styles.bodyText}>
            Trainers and clothes you can pedal in; a rain jacket rather than an umbrella; gloves and a warm layer
            on winter evenings, as the night tour&apos;s listing advises. Check whether the tour provides a helmet.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Should you book ahead?</h3>
          <p className={styles.bodyText}>
            Yes — tours run at fixed times (10:00 and 14:00 on the central tour) with a set number of bikes. Book the morning slot in summer, and read the cancellation terms so you
            can move the date if rain is forecast.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rules</span>
          <h2 className={styles.sectionTitle}>What Are Japan&apos;s Bike Rules for Tourists?</h2>
          <p className={styles.bodyText}>
            Ride on the road and keep to the left; use the pavement only where a sign allows it, if you are under 13
            or 70 and over, or where the road is unsafe — and then slowly, on the road side, giving way to people
            walking. Stop at red lights and stop signs, use a light at night, and never ride after drinking. Since{" "}
            <strong>1 April 2026</strong>, riders aged 16 and over who break these rules can be given a{" "}
            <strong>blue ticket</strong> — a fixed fine, paid within 7 days at a bank or post office, instead
            of a criminal case. Japan&apos;s police also ask every cyclist to wear a helmet: it is an obligation to
            make the effort, with no fine.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Fixed fines for cyclists (from 1 April 2026)</h3>
          <SimpleTable head={["Rule broken", "Fine (riders 16+)"]} rows={fines.map((f) => [f.rule, f.fine])} />
          <p className={styles.bodyText} style={note}>
            Last checked: {CHECKED}. National Police Agency:{" "}
            <a href={NPA_PORTAL} target="_blank" rel="noopener noreferrer">bicycle portal — the new system</a>{" "}
            (blue tickets from 1 April 2026, riders 16+),{" "}
            <a href={NPA_RULEBOOK} target="_blank" rel="noopener noreferrer">自転車ルールブック (September 2025, PDF)</a>{" "}
            (fine amounts and pavement rules) and{" "}
            <a href={NPA_FIVE_RULES} target="_blank" rel="noopener noreferrer">the five bicycle safety rules</a>.
            Earphones in one ear only, or open-ear types, are not a violation as long as you can hear what you need
            to ride safely.
          </p>
        </section>

        <BookingEsimCard lead="The meeting point is a map pin and any weather change arrives by message — get mobile data before you land." />

        <KlookTourPicks
          heading="Tokyo Bike Tour Listings"
          intro="Daytime, e-bike, night and private rides. Klook prices change by date, so open a listing for the figure on your dates."
          tours={[tokyoCentralBikeTour, tokyoEbikeHiddenGemsTour, tokyoNightBikeTour, shibuyaBicycleTour, tokyoPrivateEbikeTour, tokyoImperialPalaceShibuyaBikeTour]}
        />

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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="17" r="3.5" />
                    <circle cx="18" cy="17" r="3.5" />
                    <path d="M6 17l4-8h5l3 8M10 9l2 8h-6" />
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

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three hours, palace to Shibuya</h2>
            <p className={styles.ctaBannerDesc}>
              Book the 10:00 or 14:00 ride, choose the e-bike if in doubt, and stay near Shibuya, where it ends.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoCentralBikeTour.url} target="_blank" rel={rel} className={styles.ctaBannerBtn}>
                Tokyo bike tour →
              </KlookLink>
              <KlookLink href={tokyoBikeTourTripPrep[0].url} target="_blank" rel={rel} className={styles.ctaBannerBtn}>
                Shibuya hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
