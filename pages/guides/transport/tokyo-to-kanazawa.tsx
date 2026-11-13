import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import fares from "../../../data/jr-fares.json";
import {
  hokurikuArchPass,
  jrPassWholeJapan,
  kanazawaGeishaKenrokuenCastleDayTour,
  kanazawaHotels,
  kanazawaKenrokuenHigashiChayaDayTour,
  klookEsim,
  shinkansenTokyoKanazawa,
  shirakawagoKanazawaDayTour,
  shirakawagoTakayamaKanazawaDayTour,
  kanazawaArrivalShinkansenPrep,
} from "../../../lib/klook-links";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Tokyo to Kanazawa on the Hokuriku Shinkansen. Added 27 Oct 2026; rewritten
 * 11 Nov 2026 (task-jtk-20261111-R04) around the search "tokyo to kanazawa
 * shinkansen", with the fare moved from our own reference value to JR West's.
 *
 * Read on 11 November 2026:
 *  - the Tokyo–Kanazawa prices — ¥14,400 reserved Ordinary, ¥14,070
 *    non-reserved, ¥20,860 Green, ¥31,860 Gran Class, regular season, "2026年3月
 *    14日購入分から" — from JR West's own 「新幹線eチケット」 (e5489) product page on
 *    tickets.jr-odekake.net (shnId=125000391). That is the online eTicket price;
 *    JR West does not print the paper-ticket total for the pair as a static table;
 *  - the season rule (peak +¥200, peak-peak +¥400, off-peak −¥200 on the
 *    reserved charge) and the season calendar that applies to the Hokuriku
 *    Shinkansen (the JR East table, not the JR West 2026-year table, which
 *    excludes this line) from JR West's 「きっぷのルール」 e-book, December 2026
 *    issue, p.52; the "1 month before, 10:00" reserved-seat sale from the same
 *    e-book (October 2026 issue);
 *  - the Kagayaki 513 (Tokyo 17:24 → Kanazawa 19:55, stops Ueno, Omiya, Nagano,
 *    Toyama; 全車指定席) and Hakutaka 559 (Tokyo 10:33 → Kanazawa 13:36, twelve
 *    intermediate stops listed; 普通車一部指定席) from JR West's own train
 *    timetable pages on timetable.jr-odekake.net;
 *  - the Hokuriku Arch Pass (¥35,000 / ¥17,500, 7 consecutive days, Tokyo–Tsuruga
 *    reserved seats, Tokaido and Sanyo Shinkansen excluded, GranClass extra) from
 *    JR West's own pass page, which states its information is current as of
 *    28 January 2026.
 *
 * Carried over from the 27 Oct 2026 read: JR West's 2h28m fastest
 * Kanazawa–Tokyo figure, the Hakutaka non-reserved car numbers, the HOKURIKU
 * One-way Ticket prices, and the Klook route page's "0 transfer(s)".
 * The JAPAN RAIL PASS prices are the JR Group's, read for our JR Pass guide on
 * 30 Oct 2026; the JR EAST PASS limit at Joetsumyoko is from our JR East Pass
 * guide (3 Nov 2026); the Kanazawa–Shirakawa-go bus is from our Takayama and
 * Shirakawa-go guide (6 Nov 2026). No Klook price appears anywhere.
 */

const OWN_ISO = "2026-11-11";
const OWN = checkedLabel(OWN_ISO);
/** The first read of this route, for the figures not re-read on 11 Nov. */
const FIRST = checkedLabel("2026-10-27");
/** The date our JR Pass guide read the pass prices it prints. */
const PASS_CHECKED = checkedLabel("2026-10-30");
const EAST_CHECKED = checkedLabel("2026-11-03");
const BUS_CHECKED = checkedLabel("2026-11-06");

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const kanazawaKyoto = fares.segments.find((s) => s.id === "kanazawa-kyoto")!;
/** "2026-09" -> "September 2026", for the one non-operator figure on the page. */
const FARE_AS_OF = new Date(`${fares.asOf}-01T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** JR West's e5489 Shinkansen eTicket, Kanazawa ⇄ Tokyo, regular season. */
const FARE_RESERVED = 14400;
const FARE_FREE = 14070;
const FARE_GREEN = 20860;
const FARE_GRAN = 31860;

const ARCH_PASS = "¥35,000";
const JR_PASS_7 = "¥53,000";
const JR_PASS_7_ONLINE = "¥50,000";

/** Table (a): the two services that run Tokyo to Kanazawa. */
const serviceRows = [
  {
    item: "Fastest journey",
    kagayaki: "About 2h30 — JR West gives 2h28m as the fastest; Kagayaki 513 is 2h31m (17:24 → 19:55)",
    hakutaka: "About 3 hours — Hakutaka 559 is 3h03m (10:33 → 13:36)",
  },
  {
    item: "Stops between Tokyo and Kanazawa",
    kagayaki: "Few: Kagayaki 513 calls only at Ueno, Omiya, Nagano and Toyama",
    hakutaka: "Many: Hakutaka 559 calls at Ueno, Omiya, Takasaki, Karuizawa, Ueda, Nagano, Iiyama, Joetsumyoko, Itoigawa, Kurobe-Unazukionsen, Toyama and Shin-Takaoka",
  },
  {
    item: "Non-reserved seats",
    kagayaki: "None — 全車指定席, every car reserved",
    hakutaka: "Yes — cars 1–4 on most trains, 1–5 on the 551, 571, 573, 575 and 577 (car 5 reserved on some days)",
  },
  {
    item: "Seat classes",
    kagayaki: "Reserved Ordinary, Green, Gran Class",
    hakutaka: "Non-reserved and reserved Ordinary, Green, Gran Class (no at-seat service on Hakutaka 559)",
  },
  {
    item: "How often",
    kagayaki: "Through the day; Kagayaki and Hakutaka alternate on JR West's Tokyo departures timetable, which runs from 06:16 to 22:08 for the whole line",
    hakutaka: "Through the day, including the first departure to Kanazawa (Hakutaka 551, 06:28) and late evening trains",
  },
  {
    item: "Covered by JR Pass / Hokuriku Arch Pass",
    kagayaki: "Yes, with a free seat reservation (Gran Class is extra on the Arch Pass)",
    hakutaka: "Yes, reserved or non-reserved",
  },
];

/** Table (b): what the trip costs, and what each pass does with it. */
const fareRows = [
  {
    item: "Single ticket, reserved Ordinary",
    price: yen(FARE_RESERVED),
    covers: `One way, regular season. Non-reserved ${yen(FARE_FREE)}, Green ${yen(FARE_GREEN)}, Gran Class ${yen(FARE_GRAN)}`,
    verdict: "The default for a one-way trip or a there-and-back",
    source: `JR West e5489 Shinkansen eTicket, Kanazawa–Tokyo, for tickets bought from 14 March 2026; read ${OWN}`,
  },
  {
    item: "Return trip, reserved Ordinary",
    price: yen(FARE_RESERVED * 2),
    covers: "Two of the above, Tokyo → Kanazawa → Tokyo",
    verdict: "Still well below every pass on this table",
    source: `Calculated from JR West's price, ${OWN}`,
  },
  {
    item: "Peak and off-peak dates",
    price: "+¥200 / +¥400 / −¥200",
    covers: "Added to or taken off the reserved-seat charge on peak, peak-peak and off-peak days. Non-reserved is the same all year",
    verdict: "Small enough not to change any decision below",
    source: `JR West「きっぷのルール」December 2026 issue, read ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS, 7-day Ordinary",
    price: JR_PASS_7,
    covers: `Since 1 October 2026 through an overseas agency (${JR_PASS_7_ONLINE} on the official site). Every JR line, Kagayaki included`,
    verdict: `Not for this trip alone: the return is ${yen(FARE_RESERVED * 2)}, ${yen(53000 - FARE_RESERVED * 2)} short of the pass`,
    source: `JR Group price table, read for our JR Pass guide ${PASS_CHECKED}`,
  },
  {
    item: "JR Hokuriku Arch Pass, 7 days",
    price: `${ARCH_PASS} (child ¥17,500)`,
    covers: "Reserved seats on the Hokuriku Shinkansen Tokyo–Tsuruga, the Thunderbird to Kyoto and Osaka, Kansai airport trains. Not the Tokaido or Sanyo Shinkansen",
    verdict: `Only for a loop: Tokyo → Kanazawa (${yen(FARE_RESERVED)}) plus Kanazawa → Kyoto on the ¥6,500 one-way ticket is ${yen(FARE_RESERVED + 6500)}, so the pass needs about ${yen(35000 - FARE_RESERVED - 6500)} more travel in the week`,
    source: `JR West's own pass page, read ${OWN}`,
  },
  {
    item: "JR EAST PASS",
    price: "¥35,000 (5 days)",
    covers: "The Hokuriku Shinkansen only as far as Joetsumyoko — Karuizawa and Nagano, not Toyama or Kanazawa",
    verdict: "Does not reach Kanazawa. Useful only if the trip is Tohoku and Nagano",
    source: `Our JR East Pass guide, ${EAST_CHECKED}`,
  },
];

/** Table (c): when to book, and the dates that fill. */
const bookingRows = [
  {
    when: "When seats go on sale",
    what: "10:00, one month before the day of travel",
    detail: "The same rule at ticket offices and online. A pass holder reserves on the same timetable, free of charge",
  },
  {
    when: "Year-end and New Year (peak-peak)",
    what: "28–31 December and 1–6 January",
    detail: "The Hokuriku line's busiest window. Book the day sales open if your dates are fixed",
  },
  {
    when: "Golden Week (peak-peak)",
    what: "27 April – 6 May",
    detail: "The other window that sells out the Kagayaki early; Obon, 10–19 August, is the third",
  },
  {
    when: "Autumn leaves (November)",
    what: "Off-peak Mon–Thu; peak on three-day weekends",
    detail: "November is an off-peak month on weekdays. A public holiday that makes a three-day weekend is peak, with the day before — in 2026, 20–23 November",
  },
  {
    when: "Spring break",
    what: "Peak, 21 March – 5 April",
    detail: "Also the cherry blossom fortnight in Kanazawa and Kyoto, so the return leg fills as well",
  },
  {
    when: "Gran Class",
    what: "As early as possible, any season",
    detail: "One small car per train, and the one seat class that sells out outside the holidays",
  },
];

const faqItems = [
  {
    q: "How long is the Shinkansen from Tokyo to Kanazawa?",
    a: `About 2 hours 30 minutes on a Kagayaki, and about 3 hours on a Hakutaka, with no change of train. JR West gives 2 hours 28 minutes as the fastest Kanazawa–Tokyo time; on its own timetable, Kagayaki 513 leaves Tokyo at 17:24 and reaches Kanazawa at 19:55 (2h31m) with stops only at Ueno, Omiya, Nagano and Toyama, while Hakutaka 559 leaves at 10:33 and arrives at 13:36 (3h03m) after twelve stops. Read on ${OWN}.`,
  },
  {
    q: "How much is the train from Tokyo to Kanazawa?",
    a: `${yen(FARE_RESERVED)} one way for a reserved Ordinary seat in regular season, on JR West's e5489 Shinkansen eTicket for tickets bought from 14 March 2026 (read ${OWN}). Non-reserved is ${yen(FARE_FREE)}, Green ${yen(FARE_GREEN)} and Gran Class ${yen(FARE_GRAN)}. A return is ${yen(FARE_RESERVED * 2)}. On peak days the reserved seat costs ¥200 more, on peak-peak days ¥400 more, and on off-peak days ¥200 less.`,
  },
  {
    q: "Do I need to reserve the Kagayaki?",
    a: `Yes. Every car on a Kagayaki is reserved (JR West: 「全車指定席」), so you cannot board on a non-reserved ticket or on a rail pass without a seat reservation. Pass holders reserve for free. If you want to walk on without a reservation, take a Hakutaka: cars 1–4 are non-reserved on most services, 1–5 on the 551, 571, 573, 575 and 577.`,
  },
  {
    q: "Is the JR Pass worth it for Tokyo to Kanazawa?",
    a: `Not for this trip alone. A 7-day JAPAN RAIL PASS is ${JR_PASS_7} through an overseas agency since 1 October 2026 (${JR_PASS_7_ONLINE} on the official site, ${PASS_CHECKED}), against ${yen(FARE_RESERVED * 2)} for a Tokyo–Kanazawa return. The Hokuriku Arch Pass, ${ARCH_PASS} for 7 days on JR West's own page, suits a Tokyo → Kanazawa → Kyoto or Osaka loop, but it still needs more travel than those two legs to pay. The JR EAST PASS stops at Joetsumyoko and does not reach Kanazawa.`,
  },
  {
    q: "Can I go to Shirakawa-go from Kanazawa on the same day?",
    a: `Yes, as a day trip from Kanazawa. The bus from Kanazawa Station West Exit takes 1 hour 15 minutes and is reserved-seat only; Nohi Bus lists ¥2,900 one way from 1 December 2026 (¥2,800 until 30 November), read for our Takayama and Shirakawa-go guide on ${BUS_CHECKED}. On the day you arrive from Tokyo it only works with an early train, so most itineraries spend the first night in Kanazawa and do Shirakawa-go the next morning, by bus or on a guided day tour.`,
  },
  {
    q: "Can you get from Kanazawa to Kyoto or Osaka without changing?",
    a: `No. Since the line was extended to Tsuruga, you change there from the Hokuriku Shinkansen to the Limited Express Thunderbird. JR West's HOKURIKU One-way Ticket covers both, at ¥6,500 adult from Kyoto city and ¥8,000 from Osaka city (read ${FIRST}). Bought as ordinary tickets, Kanazawa to Kyoto is about ${yen(kanazawaKyoto.fareYen)} on our own reference figure as of ${FARE_AS_OF}.`,
  },
  {
    q: "Should you stop at Karuizawa or Nagano on the way?",
    a: `Only on a Hakutaka. The Kagayaki passes Karuizawa and most other stations; the Hakutaka calls at Karuizawa, Ueda and Nagano. A stop of a few hours is normally still one ticket, but an overnight break is two, and on a Kagayaki each leg needs its own seat reservation.`,
  },
];

const TITLE = "Tokyo to Kanazawa Shinkansen (2026): Time, Price, Passes";
const DESCRIPTION =
  "Tokyo to Kanazawa shinkansen: about 2h30 on the all-reserved Kagayaki, ¥14,400 reserved (JR West, Nov 2026). JR Pass vs Hokuriku Arch Pass compared.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/transport/tokyo-to-kanazawa") },
});

export default function TokyoToKanazawaPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-to-kanazawa" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-to-kanazawa" />
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
              route: "/guides/transport/tokyo-to-kanazawa",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Transport & Getting Around",
                  item: "https://www.japan-travel-kit.com/guides/transport",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Tokyo to Kanazawa Shinkansen",
                  item: "https://www.japan-travel-kit.com/guides/transport/tokyo-to-kanazawa",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo to Kanazawa Shinkansen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Kanazawa Shinkansen (2026):<br />Time, Price, Passes
          </h1>
          <p className={styles.heroSubtitle}>
            The Hokuriku Shinkansen trip in numbers: Kagayaki against Hakutaka, the fare from JR West, and
            what the JR Pass and the Hokuriku Arch Pass do with it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fares from JR West, dated", "Pass break-even included"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Kagayaki</p>
                <p className={styles.verdictStatValue}>About 2h30, no change</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Reserved seat, one way</p>
                <p className={styles.verdictStatValue}>{yen(FARE_RESERVED)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kagayaki seating</p>
                <p className={styles.verdictStatValue}>All reserved</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Passes that cover it</p>
                <p className={styles.verdictStatValue}>JR Pass, Hokuriku Arch Pass</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Tokyo to Kanazawa shinkansen</strong> takes <strong>about 2 hours 30 minutes</strong> on
              a <strong>Kagayaki</strong> (JR West&apos;s fastest is 2h28m) and about 3 hours on a Hakutaka, with no
              change, and a reserved Ordinary seat is <strong>{yen(FARE_RESERVED)}</strong> one way in regular
              season on JR West&apos;s e5489 eTicket. The Kagayaki is <strong>all reserved</strong>, so you need a
              seat reservation before boarding; the Hakutaka has non-reserved cars. The{" "}
              <strong>JAPAN RAIL PASS</strong> and the <strong>Hokuriku Arch Pass</strong> ({ARCH_PASS} for 7 days)
              cover the whole trip with free reservations, but the <strong>JR EAST PASS</strong> stops at
              Joetsumyoko and does not reach Kanazawa. Fares and pass rules read on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Kanazawa Tickets →
              </KlookLink>
              <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hokuriku Arch Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="Book with the train"
          heading="What to Book in Kanazawa With Your Seat"
          intro="The train ends at Kanazawa Station. Shirakawa-go, the pass for the onward leg and the night itself are the bookings to settle in the same sitting."
          items={kanazawaArrivalShinkansenPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What This Guide Covers, and What It Leaves to the Others</h2>
          <p className={styles.bodyText}>
            This page is the train itself: which service, how long, what it costs and whether a pass pays. The
            pass on its own — every line it covers, the airport trains, how to collect it — is in our{" "}
            <Link href="/guides/transport/hokuriku-arch-pass">Hokuriku Arch Pass guide</Link>, and the day out
            of Kanazawa to the thatched villages is in our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour guide</Link>.
          </p>
          <p className={styles.bodyText}>
            The Hokuriku Shinkansen runs north out of Tokyo through Omiya, over the mountains past Karuizawa and
            Nagano, and down the Sea of Japan coast to Toyama and Kanazawa — then on to Tsuruga since the
            extension opened. JR East runs the line as far as Joetsumyoko and JR West beyond it, which is why
            one pass covers it and another does not.
          </p>
        </section>

        {/* Table (a): Kagayaki vs Hakutaka */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The train</span>
          <h2 className={styles.sectionTitle}>How Long Is the Shinkansen from Tokyo to Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About 2 hours 30 minutes on a Kagayaki and about 3 hours on a Hakutaka, both direct. The difference
            is the number of stops. Train times below are from JR West&apos;s own timetable pages, read on {OWN};
            the non-reserved car numbers are from JR West&apos;s E7/W7 page, read {FIRST}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Kagayaki", "Hakutaka"].map((h) => (
                      <th key={h || "item"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {serviceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.kagayaki}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hakutaka}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Both are the same E7/W7 trains with the same seats, so the choice is time against flexibility. The
            Kagayaki is the one to book; the Hakutaka is the one to take if you want to stop at Karuizawa or
            Nagano, or to board without a reservation. The third name on the line, the Tsurugi, runs only within
            Hokuriku. For how shinkansen tickets work in general, see our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kanazawa tickets →
            </KlookLink>
          </div>
        </section>

        {/* Table (b): fares and passes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is the Train from Tokyo to Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {yen(FARE_RESERVED)} one way for a reserved Ordinary seat, regular season — JR West&apos;s e5489
            Shinkansen eTicket price for tickets bought from 14 March 2026, the date JR East revised its fares.
            The table puts it against the three passes people ask about, with the 7-day JAPAN RAIL PASS at its
            price since 1 October 2026.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket or pass", "Price", "What it covers", "For Tokyo–Kanazawa", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm before buying. The single-ticket prices are JR West&apos;s online eTicket
            prices; a paper ticket from a ticket office is priced separately. The Hokuriku Arch Pass requires a
            passport and is for visitors on temporary-visitor status. No Klook price appears on this page: Klook
            prices change by date, so check the listing for your date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hokuriku Arch Pass (7 days) →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 days) →
            </KlookLink>
          </div>
        </section>

        {/* Reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Do I Need to Reserve the Kagayaki?</h2>
          <p className={styles.bodyText}>
            Yes. JR West&apos;s timetable lists the Kagayaki as <strong>全車指定席</strong> — every car reserved —
            so there is no non-reserved car to stand in. A non-reserved ticket will not get you on board, and
            neither will a rail pass without a seat reservation. With a JR Pass or the Hokuriku Arch Pass the
            reservation is free; with a single ticket, the reservation is the ticket.
          </p>
          <p className={styles.bodyText}>
            The <strong>Hakutaka</strong> is the service with walk-up seats: cars <strong>1 to 4</strong> on most
            trains, and <strong>1 to 5</strong> on the Hakutaka 551, 571, 573, 575 and 577 (car 5 is reserved on
            some days). That is the fallback if your plans are loose, at the cost of about half an hour.
          </p>
        </section>

        {/* Table (c): booking timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book Tokyo to Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Reserved seats go on sale at 10:00 one month before the day of travel. Most of the year a few days
            ahead is enough; the dates below are the exceptions. Season dates are from the table JR West prints
            for the Hokuriku Shinkansen in its December 2026 ticket rules, read on {OWN}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When", "Dates or rule", "What it means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.when}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Once the train is booked, the next two things to settle are the night in Kanazawa — the city is
            usually a two-night stop — and mobile data, because the seat, the Tsuruga connection and the
            Shirakawa-go bus are all managed on a phone.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick a train and seat class →
            </KlookLink>
            <KlookLink href={kanazawaHotels.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hotels in Kanazawa →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Klook eSIM for Japan →
            </KlookLink>
          </div>
        </section>

        {/* JR Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Passes</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Tokyo to Kanazawa?</h2>
          <p className={styles.bodyText}>
            Not on its own. A Tokyo–Kanazawa return is {yen(FARE_RESERVED * 2)}; the 7-day JAPAN RAIL PASS is{" "}
            {JR_PASS_7} through an overseas agency since 1 October 2026, or {JR_PASS_7_ONLINE} on the official
            site. It pays when the week also has Kyoto, Osaka and Hiroshima in it — our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> has the calculator, and our{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14-day itinerary</Link> shows where a
            Kanazawa detour fits a two-week route.
          </p>
          <p className={styles.bodyText}>
            The <strong>Hokuriku Arch Pass</strong> ({ARCH_PASS}, 7 days) is shaped for Tokyo → Kanazawa → Kyoto
            or Osaka, flying in to Tokyo and out of Kansai. It excludes the Tokaido Shinkansen, so it does nothing
            for a there-and-back. The <strong>JR EAST PASS</strong> covers the Hokuriku Shinkansen only to
            Joetsumyoko — see our{" "}
            <Link href="/guides/transport/jr-east-pass">JR East Pass guide</Link> for where it does pay. For a
            10-day first trip with Kanazawa between Tokyo and Kyoto, our{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary">Japan 10-day itinerary</Link> shows the
            order.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hokuriku Arch Pass →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        {/* Onward to Kansai */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Onward</span>
          <h2 className={styles.sectionTitle}>Can You Go On from Kanazawa to Kyoto or Osaka?</h2>
          <p className={styles.bodyText}>
            Yes, with one change. The Hokuriku Shinkansen continues to <strong>Tsuruga</strong>, where you change
            onto the <strong>Limited Express Thunderbird</strong> for Kyoto and Osaka. JR West&apos;s{" "}
            <strong>HOKURIKU One-way Ticket</strong> covers both trains — &ldquo;Limited Express THUNDERBIRD &amp;
            Hokuriku Shinkansen&rdquo;, with the shinkansen part valid &ldquo;Between Tsuruga and Toyama&rdquo; — at{" "}
            <strong>¥6,500</strong> adult from Kyoto city and <strong>¥8,000</strong> from Osaka city (read {FIRST}).
          </p>
          <p className={styles.bodyText}>
            Coming back to Tokyo the same way you came? Buy singles. Leaving Japan from Kansai instead? That loop
            is what the Hokuriku Arch Pass is built for, and our{" "}
            <Link href="/guides/transport/hokuriku-arch-pass">Hokuriku Arch Pass guide</Link> works out how much
            extra travel it needs to beat the tickets.
          </p>
        </section>

        {/* Shirakawa-go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>At the far end</span>
          <h2 className={styles.sectionTitle}>Can I Go to Shirakawa-go from Kanazawa on the Same Day?</h2>
          <p className={styles.bodyText}>
            Yes, as a day trip from Kanazawa. The bus from Kanazawa Station West Exit takes{" "}
            <strong>1 hour 15 minutes</strong>, is reserved-seat only, and Nohi Bus lists <strong>¥2,900</strong>{" "}
            one way from 1 December 2026 (¥2,800 until 30 November), as read for our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour guide</Link>{" "}
            on {BUS_CHECKED}. On the day you arrive from Tokyo it only works with an early train, so most plans
            spend the first night in Kanazawa and go the next morning — by bus, or on a guided day that can end
            in Takayama instead of bringing you back.
          </p>
          <p className={styles.bodyText}>
            In Kanazawa itself, Kenroku-en and the castle grounds, the Higashi Chaya teahouse district and Omicho
            Market are within a short bus ride of the station, and a guided day joins the three.
          </p>
        </section>

        <KlookTourPicks
          heading="Kanazawa and Shirakawa-go Day Tours"
          intro="Two guided days in Kanazawa — the garden, the teahouse district and the castle, one with a temarizushi session — and two that use Kanazawa as the start of the Shirakawa-go run, including the version that drops you in Takayama. Open a listing for availability and the current price on your dates."
          tours={[
            shirakawagoTakayamaKanazawaDayTour,
            shirakawagoKanazawaDayTour,
            kanazawaKenrokuenHigashiChayaDayTour,
            kanazawaGeishaKenrokuenCastleDayTour,
          ]}
        />

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Tokyo to Kanazawa Shinkansen: Common Questions</h2>
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

        {/* Before you go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>One Thing to Sort Before You Board</h2>
          <p className={styles.bodyText}>
            Data. Seat changes happen in an app, the Tsuruga connection is a timed change you will want to check
            against your actual arrival, and the Shirakawa-go bus is a reservation you may need to look up from a
            platform. An eSIM activated before you fly covers all three.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against the
            alternatives, and our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card guide</Link> covers tapping through the local
            gates once you are off the shinkansen. All our rail guides are on the{" "}
            <Link href="/guides/transport">transport hub</Link>.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 13 Nov 2026: what to do once you arrive — two days in Kanazawa with Shirakawa-go. */}
            <Link href="/guides/attractions/kanazawa-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kanazawa 2 Day Itinerary (2026): Kanazawa and Shirakawa-go</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 4 Nov 2026: the rail pass guide for this route. */}
            <Link href="/guides/transport/hokuriku-arch-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hokuriku Arch Pass (2026): Price, Route and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 3 Nov 2026: the snow monkeys, reached from Nagano — a stop on this same line. */}
            <Link href="/guides/attractions/jigokudani-snow-monkey-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Snow Monkey Tour from Tokyo: Jigokudani Park Guide 2026</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 3 Nov 2026: why the JR East pass stops at Joetsumyoko, short of Kanazawa. */}
            <Link href="/guides/transport/jr-east-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR East Pass (2026): Price, Coverage and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Hiroshima Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-winter-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10" />
                  <path d="M12 6l-2.5-2M12 6l2.5-2M12 18l-2.5 2M12 18l2.5 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Winter Itinerary: 12 Days, Day by Day (2027)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/takayama-shirakawago-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 21V12l6-6 6 6v9" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Takayama and Shirakawa-go Tour (2026): Which Departure, and the Bus If You Go Alone</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-3-week-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 3 Week Itinerary (2026): 21 Days, JR Pass &amp; Bookings</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20h18M7 20l5-12 5 12" />
                  <path d="M9 14h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip From Tokyo (2026): Shinkansen Times, the Five Stops and Tour vs DIY</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 15h4" />
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
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Transport &amp; Getting Around Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two and a half hours, one reservation</h2>
            <p className={styles.ctaBannerDesc}>
              Book a Kagayaki seat — it has no other kind — and decide the pass question by the shape of your
              week. A loop out through Kanazawa and back through Kansai is what the Hokuriku Arch Pass is for;
              a there-and-back is cheaper on singles.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo → Kanazawa Tickets →
              </KlookLink>
              <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Hokuriku Arch Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
