import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  hakoneFreepass,
  hakoneLoopBusTour,
  hakoneCruiseCableCarTour,
  fujiHakoneDayTour,
  hakoneHotels,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// This page is the day itself: the timed loop, the day's cost and the trains in and
// out. The Freepass's own price table, coverage and break-even live on
// /guides/attractions/hakone-free-pass, so this page carries one line on the pass and
// links there (task-jtk-20261109-R02).
//
// Every figure below was read on 9 Nov 2026:
//   - Freepass 2-day from Shinjuku ¥7,100 / child ¥1,600, Odawara 2-day ¥6,000, no
//     1-day version, Romancecar ¥1,200 / ¥600 and about 80 minutes, EMot ¥50 cheaper:
//     odakyu-global.com/passes/hakone-freepass/ (price owned by lib/attraction-prices.ts)
//   - Romancecar first trains and last trains back: odakyu-global.com/passes/romancecar/
//   - Tozan Train Hakone-Yumoto → Chokoku-no-Mori approx. 40 min, Tozan Bus
//     Moto-Hakone → Hakone-Yumoto approx. 40 min: hakonetrip.odakyu-global.com
//     (Hakone 2-day itinerary); cable car Gora → Sounzan 10 min and bus approx. 35 min:
//     odakyu-global.com/blog/2096/
//   - Ropeway full ride around 30 min, ¥2,000 one way; cruise ¥1,700 one way:
//     hakonetrip.odakyu-global.com spot pages
//   - Ropeway boarding hours and suspension causes: hakonenavi.jp ropeway page
//   - Cruise 25–35 min one way, winter timetable 1 Dec – 19 Mar: hakonenavi.jp cruise page
//   - Hakone Open-Air Museum ¥2,000 same day / ¥1,800 online, 9:00–17:00, 2 min from
//     Chokoku-no-Mori: hakone-oam.or.jp/en/info/ and /en/aboutus/access
const P = PRICES.hakoneFreepass;
const CHECKED = checkedLabel(P.checked);
const READ = checkedLabel("2026-11-09");
const STATUS_URL = "https://www.hakonenavi.jp/international/en/status_information";

const loopRows = [
  {
    leg: "Shinjuku → Hakone-Yumoto, Romancecar",
    ride: "approx. 80 min",
    clock: "07:00 → 08:26 (Hakone No.1, weekends and holidays)",
  },
  {
    leg: "Hakone-Yumoto → Chokoku-no-Mori, Hakone Tozan Train",
    ride: "approx. 40 min",
    clock: "08:40 → about 09:20",
  },
  {
    leg: "Hakone Open-Air Museum (2 min walk, opens 9:00)",
    ride: "allow about 1½ hours",
    clock: "09:25 → 11:00",
  },
  {
    leg: "Chokoku-no-Mori → Gora (next stop), then the Cable Car Gora → Sounzan",
    ride: "cable car about 10 min",
    clock: "11:00 → about 11:30",
  },
  {
    leg: "Hakone Ropeway Sounzan → Owakudani → Togendai, with a stop at Owakudani",
    ride: "full ride around 30 min",
    clock: "11:30 → 13:30, lunch at Owakudani",
  },
  {
    leg: "Lake Ashi cruise, Togendai → Hakone-machi or Moto-Hakone",
    ride: "approx. 25–35 min",
    clock: "13:45 → about 14:20",
  },
  {
    leg: "Hakone Tozan Bus, Moto-Hakone → Hakone-Yumoto",
    ride: "approx. 35–40 min",
    clock: "14:45 → about 15:30",
  },
  {
    leg: "Hakone-Yumoto → Shinjuku, Romancecar",
    ride: "approx. 80 min",
    clock: "any train up to the last one (19:50 weekdays, 19:52 weekends)",
  },
];

const trainRows = [
  { when: "First Romancecar, Shinjuku → Hakone-Yumoto, weekends and holidays", time: "07:00 → 08:26" },
  { when: "First Romancecar, Shinjuku → Hakone-Yumoto, weekdays", time: "07:37 → 09:22" },
  { when: "Last Romancecar, Hakone-Yumoto → Shinjuku, weekdays", time: "19:50 → 21:26" },
  { when: "Last Romancecar, Hakone-Yumoto → Shinjuku, weekends and holidays", time: "19:52 → 21:25" },
  { when: "Hakone Ropeway boarding, February–November", time: "9:00–17:00" },
  { when: "Hakone Ropeway boarding, December–January", time: "9:00–16:15" },
  { when: "Hakone Open-Air Museum", time: "9:00–17:00, last entry 16:30" },
];

const costRows = [
  { item: `Hakone Freepass, 2-day from Shinjuku (covers the Odakyu Line both ways and the whole loop)`, adult: P.adult, child: P.child },
  { item: "Romancecar surcharge, Shinjuku → Hakone-Yumoto", adult: "¥1,200", child: "¥600" },
  { item: "Romancecar surcharge, Hakone-Yumoto → Shinjuku", adult: "¥1,200", child: "¥600" },
  { item: "Hakone Open-Air Museum, same-day ticket (online ¥1,800 / ¥600)", adult: "¥2,000", child: "¥800" },
  { item: "Total for the day, before food", adult: "¥11,500", child: "¥3,600" },
];

const steps = [
  {
    title: "Check the loop is running on the morning",
    desc: "The ropeway stops in winds of 30 m/s or more, in extreme weather and for its annual maintenance, and the cruise can be changed or suspended in heavy fog or strong wind. Hakone Navi's Transportation Info page shows the live status of the Odakyu-group lines in Hakone.",
  },
  {
    title: "Reserve the Romancecar both ways",
    desc: `All seats are reserved, and the surcharge is ¥1,200 for an adult each way, on top of the pass. Buying it through Odakyu's EMot Online Tickets is ¥50 cheaper than at the station. Checked ${READ}.`,
  },
  {
    title: "Buy the Freepass, or book a tour instead",
    desc: `The 2-day Freepass from Shinjuku is ${P.adult} and has no 1-day version. If you would rather not change transport five times, a coach day tour replaces the pass and the Romancecar with one booking.`,
  },
  {
    title: "Ride the loop in one direction",
    desc: "Up on the Tozan Train and cable car, across on the ropeway, down the lake by boat, back on the bus. It works in reverse too, but the order above puts the museum and Owakudani before the ropeway's last boarding.",
  },
  {
    title: "Be back at Hakone-Yumoto for your train",
    desc: "The last Romancecar to Shinjuku leaves Hakone-Yumoto at 19:50 on weekdays and 19:52 at weekends, so the cruise and bus in mid-afternoon leave plenty of margin.",
  },
];

const sameTripItems: KlookTripPrepItem[] = [
  {
    label: hakoneHotels.title,
    ctaLabel: "Check Hakone hotels →",
    url: hakoneHotels.url,
    why: "If one day feels rushed, a night in Hakone uses the second day of the Freepass you already bought. Check the room type for its bath.",
  },
];

const faqItems = [
  {
    q: "How much is the Hakone Freepass?",
    a: `From Odakyu's own site: the 2-day pass from Shinjuku is ¥7,100 for an adult and ¥1,600 for a child, and the 3-day is ¥7,500 / ¥1,850. The Hakone-area-only version from Odawara is ¥6,000 / ¥1,500 for 2 days and ¥6,400 / ¥1,750 for 3. The Romancecar limited express is not included and costs ¥1,200 (adult) or ¥600 (child) extra from Shinjuku to Hakone-Yumoto. Prices checked on ${CHECKED}.`,
  },
  {
    q: "Is there a 1-day Hakone Freepass?",
    a: `No. The pass is sold as a 2-day or 3-day ticket only, which is the single most important thing to know before planning Hakone as a day trip. From Shinjuku the 2-day pass is ¥7,100 for an adult, so a one-day visit means paying for a day of validity you will not use. Either stay the night — Hakone is an onsen town and the second day is already paid for — or take a guided coach day tour instead, where the transport is priced for one day. Checked ${CHECKED}.`,
  },
  {
    q: "What does the Hakone Freepass cover?",
    a: "Unlimited rides on eight modes of transport: the Odakyu Line from Shinjuku to Hakone-Yumoto, the Hakone Tozan Train, the Hakone Tozan Cable Car, the Hakone Ropeway, the Hakone Sightseeing Cruise on Lake Ashi, the Hakone Tozan Bus in designated areas, the Odakyu Highway Bus and the Tokai Bus in designated areas. That set is exactly the classic Hakone loop, which is why the pass is the default way to do it. The Klook listing adds that the pass carries discounts at over 70 local facilities.",
  },
  {
    q: "Is the Romancecar included in the Hakone Freepass?",
    a: `No. The Freepass covers travel on the Odakyu Line, but the Romancecar is a limited express with a separate reserved-seat charge: ¥1,200 for an adult and ¥600 for a child from Shinjuku to Hakone-Yumoto. On a tight day trip it is usually money well spent, because it is the fastest and most comfortable way out of Tokyo and it guarantees you a seat. Checked ${CHECKED}.`,
  },
  {
    q: "Should I do Hakone independently or on a tour?",
    a: "Hakone is one of the easier Japanese day trips to do alone, because the Freepass turns a five-change itinerary into one ticket and the signage on the loop is good. Take a tour if you want Hakone paired with Mt. Fuji in the same day, if you would rather have a guide, or if you are only going for one day — in which case the tour price covers one day of transport rather than the Freepass's minimum of two.",
  },
  {
    q: "What is the Hakone loop?",
    a: "The standard circuit, and what the Freepass is built around: Odakyu Line to Hakone-Yumoto, the Hakone Tozan Train up the mountainside, the cable car, then the ropeway over the Owakudani volcanic valley, down to Lake Ashi for the sightseeing cruise, and a bus back. It can be done in either direction, and most of a day disappears into it comfortably.",
  },
  {
    q: "Can I get to Hakone by shinkansen?",
    a: "Yes — the shinkansen stops at Odawara, which is the gateway station for Hakone and the start point of the cheaper Hakone-area-only Freepass. If you are travelling on a JR Pass, or coming from Kyoto or Osaka rather than Tokyo, Odawara is the natural entry point and the ¥6,000 2-day pass is the one to buy. Our shinkansen guide covers how reservations work.",
  },
  {
    q: "Hakone or Mt. Fuji for a day trip from Tokyo?",
    a: "Hakone gives you more to do and a more reliable day: an onsen town, a volcanic valley, a lake cruise and a transport loop that is a sight in itself. Mt. Fuji gives you the mountain, if the weather cooperates — and the Subaru Line Fifth Station is harder to reach independently. Several tours do both in one day, which is the right answer if you only have one spare day and want to see Fuji at all.",
  },
  {
    q: "What time is the last Romancecar back to Tokyo from Hakone?",
    a: `On Odakyu's Romancecar timetable, the last train from Hakone-Yumoto to Shinjuku leaves at 19:50 on weekdays (arriving 21:26) and 19:52 at weekends and on holidays (arriving 21:25). Read on ${READ}; check the timetable for your date, as it changes with Odakyu's timetable revisions.`,
  },
  {
    q: "Is the Hakone Ropeway open every day?",
    a: `It runs year-round, with boarding from 9:00 to 17:00 between February and November and 9:00 to 16:15 in December and January. It is suspended in winds of 30 m/s or more, in extreme weather, for mechanical trouble and for its annual inspection, so check Hakone Navi's Transportation Info page on the morning. Read on ${READ}.`,
  },
  {
    q: "Is the Hakone Open-Air Museum worth adding to a day trip?",
    a: `It fits the loop with almost no detour: it is a 2-minute walk from Chokoku-no-Mori, one stop before Gora on the Tozan Train. Admission is ¥2,000 for an adult on the day or ¥1,800 online, and it opens 9:00–17:00 with last entry 30 minutes before closing. Checked on the museum's site on ${READ}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/hakone-day-trip-from-tokyo") } });

const TITLE = "Hakone Day Trip From Tokyo 2026: Itinerary, Cost, Tours";
const DESC =
  "Hakone day trip from Tokyo: a timed loop from Shinjuku, the full day's cost (about ¥11,500), first and last trains, and when a day tour is easier.";

export default function HakoneDayTripFromTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/hakone-day-trip-from-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/hakone-day-trip-from-tokyo" />
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
              route: "/guides/attractions/hakone-day-trip-from-tokyo",
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Hakone Day Trip From Tokyo",
                  item: "https://www.japan-travel-kit.com/guides/attractions/hakone-day-trip-from-tokyo",
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
          <span className={styles.breadCurrent}>Hakone Day Trip From Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Hakone Day Trip From Tokyo (2026):<br />Timed Itinerary, Cost and Tours
          </h1>
          <p className={styles.heroSubtitle}>
            The whole loop from Shinjuku in one day — train, cable car, ropeway, lake cruise and bus — with ride
            times, the day&apos;s total cost and the last train back, all from the operators&apos; own sites.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Timed loop from Shinjuku", `Official fares, read ${READ}`].map((t) => (
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
            <p className={styles.verdictText}>
              <strong>Yes, you can do Hakone as a day trip from Tokyo.</strong> The Romancecar from Shinjuku to
              Hakone-Yumoto takes about 80 minutes (Odakyu), and the Hakone loop — Tozan Train, cable car, ropeway
              over Owakudani, Lake Ashi cruise and the bus back — is about 2½ hours of riding, or 5–7 hours with
              stops. For transport, the Hakone Freepass is {P.adult} for 2 days from Shinjuku; there is no 1-day
              version (Odakyu, checked {CHECKED}). If you would rather not change five times, take a Hakone day
              tour from Tokyo instead.
            </p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "1rem" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinjuku → Hakone-Yumoto</p>
                <p className={styles.verdictStatValue}>approx. 80 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>The loop, riding only</p>
                <p className={styles.verdictStatValue}>about 2½ hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day&apos;s cost, adult</p>
                <p className={styles.verdictStatValue}>about ¥11,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Last train back</p>
                <p className={styles.verdictStatValue}>19:50 / 19:52</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={hakoneLoopBusTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 220px" }}>
                Check the Hakone day tour on Klook →
              </KlookLink>
              <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 220px" }}>
                Check the Hakone Freepass on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Day trip or overnight */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trip or overnight</span>
          <h2 className={styles.sectionTitle}>Can You Do Hakone as a Day Trip From Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes. Leave Shinjuku on an early Romancecar and the whole loop fits between the morning train and a
            late-afternoon one back, with time for Owakudani, a museum and the lake. Hakone is an onsen town in a
            caldera, and the transport <em>is</em> the sightseeing: a mountain railway, a cable car, a ropeway
            over a steaming volcanic valley and a boat across Lake Ashi.
          </p>
          <p className={styles.bodyText}>
            The one thing that argues for staying is the pass. The Hakone Freepass has no 1-day version, so a day
            trip uses half of a {P.adult} 2-day ticket. Its prices, coverage and whether it pays for itself are
            all on our <Link href="/guides/attractions/hakone-free-pass">Hakone Freepass guide</Link>. If you
            can spare the night, the second day is already paid for — and if you are going to stay, the{" "}
            <Link href="/guides/attractions/hakone-ryokan-private-onsen">Hakone ryokan with private onsen guide</Link>{" "}
            compares inns with a bath in the room.
          </p>
        </section>

        {/* Timed loop */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itinerary</span>
          <h2 className={styles.sectionTitle}>How Long Does the Hakone Loop Take?</h2>
          <p className={styles.bodyText}>
            About 2½ hours of riding once you are in Hakone, and 5–7 hours with stops. The ride times below are
            the operators&apos; own; the clock column is a sample day built on the first weekend Romancecar, not a
            timetable — cruise and bus departures vary by season.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "Ride time (official)", "Sample day"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loopRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider}>{row.leg}</td>
                      <td className={styles.tdPrice}>{row.ride}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.clock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ride times read on {READ}: Romancecar from odakyu-global.com; Tozan Train, ropeway and bus from
            Odakyu&apos;s Hakone Trip site and Odakyu&apos;s Hakone round-course page; cruise from Hakone Navi; museum
            hours and the 2-minute walk from hakone-oam.or.jp.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Fitting Hakone into a longer week? The{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">Tokyo 5-day itinerary</Link> shows where a
            Hakone day swaps in, and the{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko day trip</Link> is the
            alternative if seeing Mt. Fuji up close matters more than the loop.
          </p>
        </section>

        {/* Leave times */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>What Time Should You Leave Tokyo for Hakone?</h2>
          <p className={styles.bodyText}>
            On the first Romancecar if you can: 07:00 from Shinjuku at weekends (in Hakone-Yumoto at 08:26), or
            07:37 on weekdays. That puts you on the ropeway well before its last boarding, and leaves the last
            train back — 19:50 on weekdays, 19:52 at weekends — as a margin rather than a deadline.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Train or opening", "Time"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainRows.map((row) => (
                    <tr key={row.when}>
                      <td className={styles.tdProvider}>{row.when}</td>
                      <td className={styles.tdPrice}>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Romancecar times from Odakyu&apos;s Romancecar timetable page, ropeway hours from Hakone Navi, museum
            hours from hakone-oam.or.jp, all read on {READ}. Check the timetable for your date.
          </p>
        </section>

        {/* Cost */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How Much Does a Hakone Day Trip Cost?</h2>
          <p className={styles.bodyText}>
            About ¥11,500 for an adult doing it independently: the Freepass, the Romancecar both ways and one
            museum, before food. The Freepass already covers the ropeway (¥2,000 one way on its own) and the Lake
            Ashi cruise (¥1,700 one way on its own).
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Adult", "Child"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Freepass and Romancecar from odakyu-global.com (checked {CHECKED}); museum from hakone-oam.or.jp;
            ropeway and cruise single fares from Odakyu&apos;s Hakone Trip site; all read on {READ}. Child fares
            are for ages 6–11 on Odakyu, elementary and middle school at the museum.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            A day tour replaces the Freepass and the Romancecar with one booking from Tokyo. Its price depends on
            the date, so check the listing for your date and read what it includes before comparing it with the
            ¥11,500 above.
          </p>
        </section>

        {/* Tour vs own */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tour or independent</span>
          <h2 className={styles.sectionTitle}>Is a Hakone Tour Better Than Going on Your Own?</h2>
          <p className={styles.bodyText}>
            Going on your own is better if you want your own pace: one pass, good signage, and you stop where
            you like. A tour is better if you would rather not make five changes in a day, if you only have one
            day and do not want to pay for a 2-day pass, or if you want Mt. Fuji in the same day — the{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt. Fuji day tour guide</Link> compares
            the Fuji-plus-Hakone tours side by side.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <KlookLink href={hakoneLoopBusTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 220px" }}>
              Check the Hakone day tour from Tokyo →
            </KlookLink>
            <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 220px" }}>
              Or the Hakone Freepass for your own loop →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The tour listing describes a guided coach loop out of Tokyo with the ropeway and the Lake Ashi cruise
            included. Check the listing for your date.
          </p>
        </section>

        <KlookTripPrep
          label="Same trip"
          heading="What to Book for the Same Hakone Trip"
          intro="If one day is not enough, the Freepass's second day covers a night in Hakone."
          items={sameTripItems}
        />

        <BookingEsimCard lead="Bus times and the ropeway status are easiest to check on your phone in Hakone." />

        {/* Seasons */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Seasons</span>
          <h2 className={styles.sectionTitle}>Is Hakone Worth It in Winter?</h2>
          <p className={styles.bodyText}>
            Yes, with shorter days. From December to January the ropeway boards from 9:00 to 16:15 instead of
            17:00, and the Lake Ashi cruise runs a winter timetable from 1 December to 19 March on which some
            sailings take longer, so start early and do the ropeway first. Mt. Fuji shows from the loop only on
            clear days; the official sources checked do not give a seasonal visibility figure.
          </p>
          <p className={styles.bodyText}>
            November is autumn-leaf season. The Hakone Ropeway&apos;s own FAQ puts the colour along its line from
            late October to about mid-November, Hakone Navi lists Gora Park and Sengokuhara for early to
            mid-November, and the lower Hakone-Yumoto area runs on into late November.
          </p>
          <p className={styles.bodyText}>
            In any season the ropeway can stop for wind, weather or its annual maintenance, with replacement buses
            announced by the operator. Check{" "}
            <a href={STATUS_URL} target="_blank" rel="noopener noreferrer">Hakone Navi&apos;s Transportation Info page</a>{" "}
            on the morning you go. Read on {READ}.
          </p>
        </section>

        {/* JR Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rail pass</span>
          <h2 className={styles.sectionTitle}>Can You Use the JR Pass for Hakone?</h2>
          <p className={styles.bodyText}>
            Only as far as Odawara. The Tokaido Shinkansen stops there (Kodama and some Hikari services), but the
            lines inside Hakone — the Tozan Train, cable car, ropeway, cruise and buses — are not JR. Pair the JR
            Pass with the Odawara version of the Freepass, ¥6,000 for 2 days, which covers Hakone only and not
            the Odakyu Line to Shinjuku (Odakyu, read {READ}). The{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works out whether a pass is worth it
            for the rest of your trip.
          </p>
        </section>

        {/* How to plan */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Plan a Hakone Day Trip?</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Coming from further afield? The{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers the Odawara approach.
            For the Tokyo end of the journey, see{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link>, and for other days out
            the <Link href="/guides/attractions">things to do in Japan hub</Link>.
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
          heading="The Tours and the Pass"
          intro="A guided coach day if you would rather not navigate the loop, or the Freepass for doing it yourself. Open a listing for the price on your date."
          tours={[hakoneLoopBusTour, hakoneCruiseCableCarTour, fujiHakoneDayTour, hakoneFreepass]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 12 Nov 2026: the week-long version, four city days and three day trips. */}
            <Link href="/guides/attractions/tokyo-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 7 Day Itinerary (2026): Day Trips, Passes &amp; Bookings</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 7 Nov 2026: the overnight version of this day. */}
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Ryokan with Private Onsen (2026): 4 Inns Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-free-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Free Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kamakura-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera &amp; the Fares</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <path d="M6 20l2-4M18 20l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
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
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M7 20h10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
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
            <h2 className={styles.ctaBannerTitle}>Hakone in one day, without the five changes</h2>
            <p className={styles.ctaBannerDesc}>
              A guided coach day from Tokyo, or the Odakyu Hakone Freepass as a QR voucher if you would rather
              ride the loop yourself. Check the listing for your date.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hakoneLoopBusTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Hakone day tour →
              </KlookLink>
              <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Hakone Freepass on Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
