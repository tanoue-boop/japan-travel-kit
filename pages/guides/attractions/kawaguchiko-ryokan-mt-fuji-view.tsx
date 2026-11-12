import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  fujikawaguchikoHotels,
  fujikawaguchikoResortHotel,
  kawaguchikoAsafuji,
  kawaguchikoFufu,
  kawaguchikoHotel,
  kawaguchikoLaVista,
  kawaguchikoMifujien,
  kawaguchikoRoyalHotel,
  kawaguchikoRyokanTripPrep,
  kawaguchikoYamanakakoBusTour,
  tokyoMtFujiHighwayBus,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * A night at Lake Kawaguchi for the Mt Fuji view. Added 12 Nov 2026
 * (task-jtk-20261112-02), the same shape as hakone-ryokan-private-onsen.
 * kawaguchiko-day-trip-from-tokyo covers the day out; this page covers the room.
 *
 * Read on 12 November 2026:
 *
 *   en.asafuji.jp           every room faces Mt Fuji and the lake; hot spring hours;
 *                           shuttle on request; 15:00 / 10:00; cancellation fees
 *   mifujien.co.jp          every room type lists a Fuji and lake view; 7F hot spring;
 *                           shuttle by phone 15:00–19:00; 15:00 / 10:00; cancellation
 *   go-kpgluxuryhotels.reservation.jp (Fufu's operator)  all suites with a Fuji view and
 *                           an open-air hot spring bath; 15:00–20:00 / 11:00; cancellation
 *   dormy-hotels.com (La Vista)  views from all but one room type; 4 free private baths;
 *                           shuttle by reservation
 *   fuji-royalhotel.jp      some rooms have no Fuji view; hot spring; shuttle by phone
 *   kawaguchikohotel.com    lakeside, observation bath facing Fuji; shuttle by phone
 *   bus.fujikyu.co.jp, fujikyu-railway.jp   bus and Fuji Excursion times and fares
 *   fujisan.ne.jp (Fujikawaguchiko Town Tourism Federation), fujiyama-navi.jp (Fujikyu)
 *                           winter clarity, cold nights
 *
 * Gaps left open on purpose: no inn's site names which shore it is on, and none states a
 * tattoo rule, so the page claims neither. Fujikawaguchiko Resort Hotel's own site could
 * not be reached, so it is described only from its Klook listing. No Klook price appears.
 * Nothing here is first-hand.
 */

const OWN = checkedLabel("2026-11-12");

const inns = [
  {
    hotel: kawaguchikoFufu,
    view: "All rooms are suites with a Mt Fuji view",
    onsen: "Open-air natural hot spring bath in the guest rooms",
    station: "About 15 minutes by taxi. Shuttle not stated",
    times: "15:00–20:00 / 11:00",
    source: "Operator's booking page",
  },
  {
    hotel: kawaguchikoAsafuji,
    view: "Every room: Mt Fuji and Lake Kawaguchi",
    onsen: "Natural hot spring for guests, 15:00–23:30 and 6:00–9:00. No bath in the rooms",
    station: "About 6 minutes by car. Free shuttle, ask ahead",
    times: "15:00 / 10:00",
    source: "en.asafuji.jp",
  },
  {
    hotel: kawaguchikoMifujien,
    view: "Every room type: Mt Fuji and the lake (one type's view includes a roof in front)",
    onsen: "Natural hot spring, 7th-floor indoor and open-air baths, 5:00–9:00 and 15:00–24:00",
    station: "Free shuttle: phone from the station, 15:00–19:00",
    times: "15:00 / 10:00",
    source: "mifujien.co.jp",
  },
  {
    hotel: kawaguchikoLaVista,
    view: "All room types but one",
    onsen: "Natural hot spring large bath, and 4 private baths, free when open, 24 hours",
    station: "About 11 minutes by taxi or shuttle. Shuttle must be booked",
    times: "Not on its site",
    source: "dormy-hotels.com",
  },
  {
    hotel: kawaguchikoRoyalHotel,
    view: "Some rooms have no Mt Fuji view",
    onsen: "Natural hot spring, indoor and outdoor rock baths",
    station: "About 20 minutes on foot. Free shuttle, book by phone",
    times: "15:00 / 10:00",
    source: "fuji-royalhotel.jp",
  },
  {
    hotel: kawaguchikoHotel,
    view: "The large observation bath looks out on Mt Fuji. Rooms not stated",
    onsen: "Observation bath with sauna, 15:00–24:00 and 5:00–10:00",
    station: "Free shuttle: phone from the station, 15:00–20:00",
    times: "15:00 / 10:00",
    source: "kawaguchikohotel.com",
  },
];

const accessRows = [
  {
    route: "Highway bus, Busta Shinjuku → Kawaguchiko Station",
    time: "About 1 hour 45 minutes",
    fare: "From ¥2,200 adult; ¥2,000 if booked and paid online",
    note: "All seats reserved. Booking opens one month ahead",
    source: "bus.fujikyu.co.jp",
  },
  {
    route: "Limited express Fuji Excursion, Shinjuku → Kawaguchiko",
    time: "Fastest 1 hour 53 minutes",
    fare: "¥4,200 (fare ¥2,580 + limited express ¥1,620)",
    note: "No unreserved seats. 4 round trips a day, 1 more on some dates",
    source: "fujikyu-railway.jp",
  },
];

const seasonRows = [
  {
    when: "Winter",
    says: "The air is clear and Mt Fuji's outline is clearly visible",
    who: "Fujikawaguchiko Town Tourism Federation (fujisan.ne.jp/feature/810/)",
  },
  {
    when: "Winter, once it turns properly cold",
    says: "The air turns crisp and clear",
    who: "FUJIYAMA NAVI, Fujikyu (fujiyama-navi.jp/entries/kQL7y)",
  },
  {
    when: "Summer",
    says: "Clouds sit on the summit",
    who: "FUJIYAMA NAVI, Fujikyu (fujiyama-navi.jp/entries/kQL7y)",
  },
  {
    when: "Early morning in winter",
    says: "Steam fog (kearashi) can rise from the lake as the water is warmer than the air",
    who: "Fujikawaguchiko Town Tourism Federation (fujisan.ne.jp/feature/810/)",
  },
  {
    when: "Winter nights",
    says: "Below −10°C is not unusual, and lakeside paths freeze",
    who: "Fujikawaguchiko Town Tourism Federation (fujisan.ne.jp/feature/44/)",
  },
];

const faqItems = [
  {
    q: "Which Kawaguchiko ryokan has the best Mt Fuji view?",
    a: `On the inns' own sites, Hotel Asafuji says every room looks out on Mt Fuji and Lake Kawaguchi, Hotel Mifujien lists a Fuji and lake view for every room type, and Fufu Kawaguchiko's rooms are all suites with a Fuji view. At La Vista all but one room type has the view, and at Royal Hotel Kawaguchiko some rooms do not. Read ${OWN}.`,
  },
  {
    q: "Is there a Kawaguchiko ryokan with a private onsen in the room?",
    a: `Yes, Fufu Kawaguchiko: its operator's booking page lists an open-air natural hot spring bath in the guest rooms. La Vista Fujikawaguchiko has four private baths you can use free when one is open, at any hour. Asafuji, Mifujien and Royal Hotel Kawaguchiko have shared hot spring baths. Read ${OWN}.`,
  },
  {
    q: "How do I get to Kawaguchiko from Tokyo?",
    a: `By highway bus from Busta Shinjuku, about 1 hour 45 minutes, from ¥2,200 (¥2,000 online). Or by the Fuji Excursion limited express from Shinjuku, fastest 1 hour 53 minutes, ¥4,200 including the limited express ticket. Both need a reserved seat. Read on bus.fujikyu.co.jp and fujikyu-railway.jp, ${OWN}.`,
  },
  {
    q: "When is Mt Fuji most visible from Lake Kawaguchi?",
    a: "In winter. The Fujikawaguchiko Town Tourism Federation describes winter as the season when the air is clear and Mt Fuji's outline is clearly visible, and Fujikyu's FUJIYAMA NAVI notes that clouds sit on the summit in summer. No source guarantees a view on a given day, so a two-night stay doubles your chances.",
  },
  {
    q: "Do Kawaguchiko ryokan have a shuttle from the station?",
    a: `Most do, free, but you usually call or book ahead. Mifujien picks up 15:00–19:00 when you phone from the station, Kawaguchiko Hotel 15:00–20:00, and Royal Hotel Kawaguchiko asks you to book by phone. La Vista's shuttle must be reserved, and Asafuji asks you to contact it in advance. Read ${OWN}.`,
  },
  {
    q: "What is the cancellation policy at Kawaguchiko ryokan?",
    a: `It depends on the inn and on where you book. On their own sites, Asafuji charges 30% from 5 days before and 100% on the day; Mifujien 20% from 3 days before, up to 100% on the day; and Fufu 20% from 7 days before, 80% from the day before. A Klook booking follows the terms shown on Klook for your room. Read ${OWN}.`,
  },
  {
    q: "Can I use the onsen with tattoos at Kawaguchiko?",
    a: "None of the six inns here states a tattoo rule on its own site, so ask before you book. A room with its own bath, as at Fufu Kawaguchiko, or a private bath, as at La Vista, avoids the question.",
  },
];

const TITLE = "Kawaguchiko Ryokan with Mt Fuji View (2026): 6 Inns";
const H1_LINE = "Kawaguchiko Ryokan with Mt Fuji View (2026):";
const DESCRIPTION =
  "Kawaguchiko Ryokan with Mt Fuji View: 6 inns compared on rooms, baths and shuttles. Mt Fuji view hotel Kawaguchiko picks and Lake Kawaguchi onsen ryokan.";

const ROUTE = "/guides/attractions/kawaguchiko-ryokan-mt-fuji-view";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day" },
  { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself" },
  { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "Hakone Ryokan with Private Onsen (2026): 4 Inns Compared" },
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KawaguchikoRyokanMtFujiViewPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kawaguchiko Ryokan with Mt Fuji View", item: URL },
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
          <span className={styles.breadCurrent}>Kawaguchiko Ryokan with Mt Fuji View</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE}<br />Which Rooms Face the Mountain
          </h1>
          <p className={styles.heroSubtitle}>
            Six inns at Lake Kawaguchi, compared on what their own sites say about the view, the hot spring and
            the shuttle.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Views checked on official sites", "Bus and train fares", "Best season for the view"].map((t) => (
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

        {/* Lead paragraph: the whole answer, in the body rather than the hero. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For a <strong>Kawaguchiko Ryokan with Mt Fuji View</strong> from your own room, book an inn whose
            own site says every room faces the mountain: <strong>Hotel Asafuji, Hotel Mifujien or Fufu
            Kawaguchiko</strong>. Only Fufu also has an open-air hot spring bath in the room. Kawaguchiko
            Station is about 1 hour 45 minutes from Shinjuku by highway bus, and most inns run a free shuttle
            from there if you call or book ahead. Winter is the season the town&apos;s tourism federation names
            for a clear view, so book those rooms early. Read {OWN}.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Fuji view from every room</p>
                <p className={styles.verdictStatValue}>Asafuji, Mifujien, Fufu</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hot spring bath in the room</p>
                <p className={styles.verdictStatValue}>Fufu Kawaguchiko</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Shinjuku by bus</p>
                <p className={styles.verdictStatValue}>About 1 h 45 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Clearest season</p>
                <p className={styles.verdictStatValue}>Winter</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Fufu for a private hot spring with the view, Asafuji or Mifujien for a
              Fuji-facing room with a shared hot spring, and La Vista for free private baths.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kawaguchikoAsafuji.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Asafuji on Klook →
              </KlookLink>
              <KlookLink href={kawaguchikoFufu.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Fufu on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Inns */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Mt Fuji view hotels, Kawaguchiko</span>
          <h2 className={styles.sectionTitle}>Which Kawaguchiko Ryokan Has the Best Mt Fuji View?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Fufu, Asafuji and Mifujien, whose own sites give the view for every room. The first row is the only
            one with a hot spring bath in the room. Prices move by date, so none are listed here: open Klook
            for yours.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Inn", "Mt Fuji view", "Hot spring and baths", "From Kawaguchiko Station", "In / out", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inns.map((row) => (
                    <tr key={row.hotel.title}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.hotel.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.hotel.title}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.view}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.onsen}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.station}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.times}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {OWN}</strong> · Sources: https://en.asafuji.jp/, https://mifujien.co.jp/,
            https://go-kpgluxuryhotels.reservation.jp/en/hotels/fufukawaguchiko, https://dormy-hotels.com/resort/hotels/la_kawaguchiko/,
            https://fuji-royalhotel.jp/, https://kawaguchikohotel.com/. Fufu&apos;s own site did not load, so its
            row comes from its operator&apos;s booking page. La Vista&apos;s in-room view baths use heated water rather
            than hot spring water. Mifujien has no rooms with an open-air bath.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kawaguchikoMifujien.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hotel Mifujien →
            </KlookLink>
            <KlookLink href={kawaguchikoLaVista.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              La Vista →
            </KlookLink>
            <KlookLink href={kawaguchikoRoyalHotel.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Royal Hotel Kawaguchiko →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>One more on Klook.</strong>{" "}
            <KlookLink href={fujikawaguchikoResortHotel.url} target="_blank" rel="sponsored noopener">
              Fujikawaguchiko Resort Hotel
            </KlookLink>{" "}
            is about 11 minutes on foot from the station on its Klook listing. Its own site did not load, so its
            view is not described here. Read the room type on Klook before you book.
          </p>
        </section>

        {/* Private onsen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Lake Kawaguchi onsen ryokan</span>
          <h2 className={styles.sectionTitle}>Is a Private Onsen Room Worth It at Lake Kawaguchi?</h2>
          <p className={styles.bodyText}>
            Yes, if you want to bathe as a couple or a family, or if you have tattoos. Among the six inns, only
            Fufu Kawaguchiko lists an open-air natural hot spring bath in the guest rooms, and it is all
            suites. For less, La Vista Fujikawaguchiko has four private baths you can use free, at any hour,
            whenever one is open. Asafuji, Mifujien and Royal Hotel Kawaguchiko have shared hot spring baths
            only. None of the six inns states a tattoo rule on its site, so ask first.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kawaguchikoFufu.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Fufu rooms →
            </KlookLink>
            <KlookLink href={kawaguchikoLaVista.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check La Vista rooms →
            </KlookLink>
          </div>
        </section>

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Kawaguchiko From Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The highway bus from Busta Shinjuku is the cheaper and quicker option on paper. The Fuji Excursion
            train costs more but avoids road traffic. Both need a reserved seat.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Adult fare (one way)", "Seats", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {OWN}</strong> · Sources: https://bus.fujikyu.co.jp/highway/detail/id/1,
            https://www.fujikyu-railway.jp/fujikaiyuu/. Fujikyu shows no effective date for the train fare.
            From the station, use the inn&apos;s shuttle: most pick up only if you call or book.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Book the Fuji highway bus →
            </KlookLink>
          </div>
        </section>

        {/* Season */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Season</span>
          <h2 className={styles.sectionTitle}>When Is Mt Fuji Most Visible?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            In winter. The town&apos;s tourism federation says the air is clear and Mt Fuji&apos;s outline is
            clearly visible then, while clouds sit on the summit in summer. No source promises a view on a
            given day, so two nights give you two mornings.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When", "What the source says", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.when + row.says}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.says}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {OWN}</strong> · Sources: https://fujisan.ne.jp/feature/810/,
            https://fujisan.ne.jp/feature/44/, https://fujiyama-navi.jp/entries/kQL7y. No official count of
            days with a visible Mt Fuji is given here for the lake, so treat the season as a likelihood.
          </p>
        </section>

        {/* What to wear */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter stay</span>
          <h2 className={styles.sectionTitle}>What Should I Wear at Lake Kawaguchi in Winter?</h2>
          <p className={styles.bodyText}>
            A thick down jacket, gloves and shoes with grip. The town&apos;s tourism federation says winter nights
            often drop below −10°C and lakeside paths and viewpoints freeze, and that public transport is limited
            at night, so it suggests booking your inn&apos;s shuttle. Read {OWN}.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How Far Ahead Should I Book a Kawaguchiko Ryokan?</h2>
          <p className={styles.bodyText}>
            As soon as your dates are fixed, and first for the Fuji-facing and private-bath rooms, which are the
            reason to stay. Fufu is all suites, and Asafuji lists 13 rooms on Klook, so neither has many to sell.
            No inn publishes a sell-out date, so treat this as planning advice rather than a rule.
          </p>
          <p className={styles.bodyText}>
            Read the cancellation terms before you pay, because they change with where you book. On their own
            sites, Asafuji charges 30% from 5 days before, 50% from 3 days, 80% the day before and 100% on the
            day; Mifujien 20% from 3 days and 30% from 2 days, up to 100% on the day; and Fufu 20% from 7 days,
            50% from 5 days and 80% from the day before. On Klook, the terms shown for your room apply. Klook&apos;s
            listings for Asafuji, Fufu and Kawaguchiko Hotel show a hot spring tax of ¥150 per person per night.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kawaguchikoFufu.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your dates at Fufu →
            </KlookLink>
            <KlookLink href={kawaguchikoAsafuji.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your dates at Asafuji →
            </KlookLink>
          </div>
        </section>

        {/* Night vs day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Night or day trip</span>
          <h2 className={styles.sectionTitle}>Should I Stay the Night or Visit Kawaguchiko for the Day?</h2>
          <p className={styles.bodyText}>
            Stay if the view is the point. A night gives you the evening and the next morning at the lake, while
            a day trip gives you one try at the mountain between the bus times. For the day-out version, see our{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko day trip guide</Link> and
            our <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt Fuji day tour guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kawaguchikoYamanakakoBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kawaguchiko day bus tour →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Same trip"
          heading="What Should You Book Around a Night at Lake Kawaguchi?"
          intro="Once the room is settled, these cover the rest of the trip. Open a listing for the price on your dates."
          items={kawaguchikoRyokanTripPrep}
        />

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
          heading="Kawaguchiko Ryokan on Klook"
          intro="The six inns in the table. Open one for the current price and the room types on your dates."
          tours={[kawaguchikoFufu, kawaguchikoAsafuji, kawaguchikoMifujien, kawaguchikoLaVista, kawaguchikoRoyalHotel, kawaguchikoHotel]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{guide.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the room that faces the mountain</h2>
            <p className={styles.ctaBannerDesc}>
              Fuji-facing and private-bath rooms are limited at every inn. Check your dates first.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kawaguchikoFufu.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Fufu Kawaguchiko →
              </KlookLink>
              <KlookLink href={fujikawaguchikoHotels.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                All Fujikawaguchiko Hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
