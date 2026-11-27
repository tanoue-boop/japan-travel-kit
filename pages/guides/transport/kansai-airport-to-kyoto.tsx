import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  jrHarukaUrl,
  jrKansaiAreaPass3276,
  kansaiAirportKyotoTripPrep,
  kansaiAirportLimousineBus,
  kyotoPrivateKixTransfer,
  kyotoStayAreas,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kansai Airport to Kyoto, added 23 Nov 2026 (task-jtk-20261123-02).
 *
 * How it differs from its neighbours: haruka-vs-nankai-rapit compares the two airport
 * trains, osaka-airport-transfer is KIX/Itami into Osaka; this page is every way from
 * Kansai Airport to Kyoto, and what to do after the last train.
 *
 * Read on 23 Nov 2026:
 *   westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/  HARUKA One-way
 *     Ticket Kansai-airport → Kyoto ¥2,700 adult, ¥1,350 child (price notice for tickets
 *     sold on or after 1 Nov 2026; the Kyoto figure is the one shown).
 *   westjr.co.jp/global/en/timetable/pdf/haruka_timetable.pdf  last HARUKA 22:16 from
 *     Kansai-airport, Kyoto 23:32.
 *   kansai-airport.or.jp/en/explorekansai/osaka/21536  first HARUKA 6:31 weekdays, 6:40
 *     weekends and holidays; last 22:16, Kyoto 23:32; every 30–40 min 9:00–20:00,
 *     hourly outside; 1 hr 15 min to Kyoto.
 *   kansai-airport.or.jp/en/access/from-airport/train  HARUKA about 75 min to Kyoto.
 *   kate.co.jp/en/timetable/detail/KY  limousine bus Kansai Airport T1 → Kyoto Sta.
 *     Hachijo Exit: 1 hr 25–30 min; ¥2,800 / child ¥1,400; return ¥5,100 (14 days);
 *     first 6:45, last 23:20 from T1 (arr. 0:45); T2 stops first, about 15 min earlier;
 *     reservations only towards the airport.
 *   kansai-airport.or.jp/en/access/from-airport/taxi  Yasaka shared shuttle ¥4,300 per
 *     person, book by 12:00 two days before; MK flat-rate taxi from ¥23,800 per car to
 *     Kyoto Station Hachijo Exit plus tolls, reservation required; metered taxi to JR
 *     Kyoto Sta. about 100 min, ¥43,150 with tolls; +20% 22:00–5:00.
 *   westjr.co.jp/global/en/pdf/press_20230726.pdf  ICOCA & HARUKA sales ended
 *     30 Sep 2023.
 * Kansai Area Pass 1-day ¥2,700 is the figure on kansai-area-pass (westjr.co.jp,
 * 20 Nov 2026). No Klook price appears on the page.
 */

const CHECKED = checkedLabel("2026-11-23");
const PASS_CHECKED = checkedLabel("2026-11-20");

const ROUTE = "/guides/transport/kansai-airport-to-kyoto";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const HARUKA_URL = "https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/";
const HARUKA_TT_URL = "https://www.westjr.co.jp/global/en/timetable/pdf/haruka_timetable.pdf";
const KIX_HARUKA_URL = "https://www.kansai-airport.or.jp/en/explorekansai/osaka/21536";
const KIX_TRAIN_URL = "https://www.kansai-airport.or.jp/en/access/from-airport/train";
const BUS_URL = "https://www.kate.co.jp/en/timetable/detail/KY";
const KIX_TAXI_URL = "https://www.kansai-airport.or.jp/en/access/from-airport/taxi";
const ICOCA_PRESS_URL = "https://www.westjr.co.jp/global/en/pdf/press_20230726.pdf";
const PASS_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type ModeRow = { mode: string; time: string; fare: string; service: string; bags: string };

const modeRows: ModeRow[] = [
  {
    mode: "JR HARUKA limited express",
    time: "About 75 min, to Kyoto Station",
    fare: "¥2,700 HARUKA One-way Ticket (child ¥1,350)",
    service: "First 6:31 weekdays, 6:40 weekends; last 22:16 (Kyoto 23:32). Every 30–40 min 9:00–20:00, hourly outside",
    bags: "Racks in the car; you carry them to and from the platform",
  },
  {
    mode: "Airport limousine bus",
    time: "About 1 hr 25–30 min, to Kyoto Station Hachijo Exit",
    fare: "¥2,800 (child ¥1,400); ¥5,100 return within 14 days",
    service: "First 6:45, last 23:20 from Terminal 1 (Kyoto 0:45); about every 20–30 min",
    bags: "In the hold; every passenger seated; no reservation from the airport",
  },
  {
    mode: "Yasaka shared shuttle",
    time: "Door to door; depends on the other drop-offs",
    fare: "¥4,300 per person",
    service: "Book by 12:00 two days before",
    bags: "To your hotel's door",
  },
  {
    mode: "MK flat-rate taxi (reserved)",
    time: "Door to door",
    fare: "From ¥23,800 per car to Kyoto Station Hachijo Exit, plus tolls",
    service: "Advance reservation; vans for groups",
    bags: "To your door; pick the car size for the cases",
  },
  {
    mode: "Metered taxi",
    time: "About 100 min",
    fare: "About ¥43,150 with tolls to JR Kyoto Station; +20% 22:00–5:00",
    service: "Taxi rank, any hour",
    bags: "To your door",
  },
];

type PickRow = { you: string; pick: string; why: string };

const pickRows: PickRow[] = [
  { you: "Hotel near Kyoto Station, landing before 22:00", pick: "HARUKA", why: "The fastest, about 75 minutes, ¥100 under the bus" },
  { you: "Two big cases each, or a wheelchair or pushchair", pick: "Limousine bus", why: "Cases go in the hold and you stay seated to Kyoto Station" },
  { you: "Landing 22:00–23:00", pick: "Limousine bus", why: "Last bus 23:20 from Terminal 1; the last HARUKA leaves at 22:16" },
  { you: "Hotel in Gion or Arashiyama, travelling alone or as two", pick: "Yasaka shared shuttle", why: "¥4,300 each to the hotel door, without a second leg from the station" },
  { you: "Three or four people with luggage", pick: "MK flat-rate or a private car", why: "Priced per car — from ¥23,800 plus tolls — and door to door" },
  { you: "Landing after the last bus", pick: "Taxi, or a night near the airport", why: "About ¥43,150 to Kyoto before the 20% night surcharge" },
];

const faqItems = [
  {
    q: "What is the fastest way from Kansai Airport to Kyoto?",
    a: `The JR HARUKA: about 75 minutes to Kyoto Station with no change, ¥2,700 on JR West's HARUKA One-way Ticket. It runs every 30 to 40 minutes between 9:00 and 20:00 and hourly outside those hours, from 6:31 on weekdays (6:40 at weekends) to the last train at 22:16, which reaches Kyoto at 23:32. Checked ${CHECKED}.`,
  },
  {
    q: "Is the HARUKA or the limousine bus better to Kyoto?",
    a: "The HARUKA if you can lift your bags: about 75 minutes for ¥2,700. The limousine bus if you cannot, or if you land after 22:00: about 1 hour 25 to 30 minutes for ¥2,800 to Kyoto Station's Hachijo Exit, with cases in the hold and buses until 23:20 from Terminal 1.",
  },
  {
    q: "Is the ICOCA & HARUKA still sold?",
    a: `No. JR West stopped selling ICOCA & HARUKA on 30 September 2023. Its replacement for visitors is the HARUKA One-way Ticket, ¥2,700 to Kyoto, sold to Temporary Visitor passport holders and not inside Japan. Buy an ICOCA card separately at Kansai-airport Station if you want one for Kyoto's buses and subway.`,
  },
  {
    q: "What if I land at Kansai Airport late at night?",
    a: `The last HARUKA leaves at 22:16 and the last limousine bus to Kyoto at 23:20 from Terminal 1 (it reaches Kyoto Station at 0:45). After that it is a taxi — about ¥43,150 with tolls to JR Kyoto Station, plus 20% between 22:00 and 5:00 — a pre-booked car, or a night near the airport and the first HARUKA at 6:31. Checked ${CHECKED}.`,
  },
  {
    q: "Is a shared shuttle or a private transfer better to a Kyoto hotel?",
    a: "Shared for one or two people: Yasaka's shuttle is ¥4,300 each to your door, booked by noon two days before. Private for three or more: MK's flat-rate taxi is from ¥23,800 per car to Kyoto Station plus tolls, and a private car on Klook is priced per vehicle — so the per-person cost falls with every extra passenger.",
  },
  {
    q: "Is the Kansai Area Pass worth it from Kansai Airport to Kyoto?",
    a: `For the airport leg alone it is level: the 1-day pass is ¥2,700, the same as the HARUKA One-way Ticket, and it covers the HARUKA's non-reserved seats. It pays if the same day — or the next days of a longer pass — also includes JR to Fushimi Inari, Arashiyama or Nara. Pass prices from westjr.co.jp, ${PASS_CHECKED}.`,
  },
  {
    q: "Do I need to book the bus from Kansai Airport to Kyoto?",
    a: "No. Kansai Airport Transportation takes reservations only on the lines towards the airport; from the airport you buy a ticket and board. The bus stops at Terminal 2 first, about 15 minutes before Terminal 1, so a Terminal 2 arrival boards earlier than the Terminal 1 times.",
  },
];

const TITLE = "Kansai Airport to Kyoto 2026: HARUKA vs Bus, Fares & Times";
const DESCRIPTION =
  "Kansai Airport to Kyoto: HARUKA about 75 min for ¥2,700, limousine bus 1 hr 25 min for ¥2,800 until 23:20, ¥4,300 shuttle — first and last departures.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/transport/haruka-vs-nankai-rapit", title: "Haruka vs Rapi:t 2026: Which Kansai Airport Train?" },
  { href: "/guides/transport/osaka-airport-transfer", title: "Osaka Airport Transfer Guide: KIX & ITM to the City" },
  { href: "/guides/transport/kyoto-transportation", title: "Getting Around Kyoto: Buses, Trains & Taxis" },
  { href: "/guides/attractions/where-to-stay-in-kyoto", title: "Where to Stay in Kyoto" },
  { href: "/guides/transport/japan-luggage-delivery", title: "Japan Luggage Delivery" },
  { href: "/guides/attractions/kansai-area-pass", title: "JR Kansai Area Pass" },
  { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3 Day Itinerary" },
  { href: "/guides/transport", title: "More Transport Guides →" },
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

export default function KansaiAirportToKyotoPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Kansai Airport to Kyoto", item: URL },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Kansai Airport to Kyoto</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kansai Airport to Kyoto 2026: <br />HARUKA vs Bus, Fares &amp; Times
          </h1>
          <p className={styles.heroSubtitle}>
            Every way from Kansai Airport to Kyoto — the HARUKA, the limousine bus, the shared shuttle and a car —
            with the fares, the first and last departures, and what to do after a late landing.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fares from JR West, the bus operator and Kansai Airport", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Fastest</p>
                <p className={styles.verdictStatValue}>HARUKA, ~75 min, ¥2,700</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Heavy luggage</p>
                <p className={styles.verdictStatValue}>Bus, ~1 hr 25 min, ¥2,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Last departure</p>
                <p className={styles.verdictStatValue}>Bus 23:20 (train 22:16)</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              From <strong>Kansai Airport to Kyoto</strong>, take the <strong>JR HARUKA</strong>: about{" "}
              <strong>75 minutes</strong> to Kyoto Station for <strong>¥2,700</strong> on the HARUKA One-way Ticket.
              The old ICOCA &amp; HARUKA set has not been sold since September 2023, so that ¥2,700 ticket is the
              visitor discount now. With heavy luggage, the <strong>limousine bus</strong> takes about{" "}
              <strong>1 hour 25–30 minutes</strong> for <strong>¥2,800</strong> with your cases in the hold. If you land
              late, the last HARUKA leaves at <strong>22:16</strong> but the last bus not until{" "}
              <strong>23:20</strong> from Terminal 1. To a hotel door, Yasaka&apos;s shared shuttle is ¥4,300 per person.
              JR West, Kansai Airport and Kansai Airport Transportation, checked {CHECKED}.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Going to Osaka instead? See the{" "}
              <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer</Link> guide; the two
              airport trains head to head are in{" "}
              <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Rapi:t</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                HARUKA ticket →
              </KlookLink>
              <KlookLink href={kansaiAirportLimousineBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Limousine bus →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Every option</span>
          <h2 className={styles.sectionTitle}>What Is the Fastest Way from Kansai Airport to Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The HARUKA, at about 75 minutes with no change. The bus is 10 to 15 minutes slower and ¥100 dearer but
            runs an hour later; the shuttle and the cars go to your door. One row per way of getting there, adult
            one-way fares.
          </p>
          <SimpleTable
            head={["Option", "Time", "Adult fare", "Service", "Luggage"]}
            rows={modeRows.map((r) => [r.mode, r.time, r.fare, r.service, r.bags])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(HARUKA_URL, "HARUKA One-way Ticket (westjr.co.jp)")};{" "}
            {ext(HARUKA_TT_URL, "HARUKA timetable (JR West)")}; {ext(KIX_HARUKA_URL, "Kansai Airport's HARUKA page")} and{" "}
            {ext(KIX_TRAIN_URL, "train times")}; {ext(BUS_URL, "Kansai Airport Transportation, Kyoto route")};{" "}
            {ext(KIX_TAXI_URL, "Kansai Airport taxi, shuttle and flat-rate fares")}. Times are planning figures; the bus
            runs longer in traffic, and Terminal 2 buses leave about 15 minutes before the Terminal 1 times.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Train or bus</span>
          <h2 className={styles.sectionTitle}>HARUKA vs Limousine Bus to Kyoto: Which Should You Take?</h2>
          <p className={styles.bodyText}>
            The HARUKA if you can lift your bags onto a rack: it is about 75 minutes against the bus&apos;s 1 hour 25 to
            30, it costs ¥100 less, and it does not sit in traffic. The bus if you have more than you can carry through
            Kyoto Station: the driver loads the cases into the hold, every passenger has a seat, and it stops at the
            Hachijo Exit, the shinkansen side of the station. The bus also wins after 22:16, when the last HARUKA has
            gone. Neither needs a reservation from the airport — the bus is first come, first served, and the
            HARUKA&apos;s non-reserved cars take the One-way Ticket.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              HARUKA ticket →
            </KlookLink>
            <KlookLink href={kansaiAirportLimousineBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Limousine bus ticket →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book before you land"
          heading="What Should You Book Before Flying into Kansai for Kyoto?"
          intro="A room by Kyoto Station, data, and the HARUKA ticket — which cannot be bought inside Japan. Klook prices change by date, so open a listing for the figure on yours."
          items={kansaiAirportKyotoTripPrep}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tickets</span>
          <h2 className={styles.sectionTitle}>Is the ICOCA &amp; HARUKA Worth It?</h2>
          <p className={styles.bodyText}>
            It no longer exists: JR West stopped selling ICOCA &amp; HARUKA on 30 September 2023, saying most visitors
            already held an ICOCA ({ext(ICOCA_PRESS_URL, "JR West news release, 26 July 2023")}). The visitor discount
            now is the <strong>HARUKA One-way Ticket</strong> — ¥2,700 to Kyoto, ¥1,350 for a child — sold to foreign
            passport holders entering as Temporary Visitors, and not inside Japan, so it is bought before you fly. Buy
            an ICOCA separately at Kansai-airport Station for Kyoto&apos;s buses and subway. The other ticket worth
            pricing is the <Link href="/guides/attractions/kansai-area-pass">JR Kansai Area Pass</Link>: the 1-day pass
            is also ¥2,700 and covers the HARUKA&apos;s non-reserved seats, so it is level on the airport leg and ahead
            the moment you ride JR again that day — to Fushimi Inari, Arashiyama or Nara. Pass price{" "}
            {ext(PASS_URL, "westjr.co.jp")}, {PASS_CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              HARUKA One-way Ticket →
            </KlookLink>
            <KlookLink href={jrKansaiAreaPass3276.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kansai Area Pass →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Late arrivals</span>
          <h2 className={styles.sectionTitle}>What If I Land at Kansai Airport Late at Night?</h2>
          <p className={styles.bodyText}>
            Work back from two times: the last HARUKA leaves Kansai-airport at <strong>22:16</strong> and reaches Kyoto
            at 23:32; the last limousine bus to Kyoto leaves Terminal 1 at <strong>23:20</strong> and reaches Kyoto
            Station at 0:45. Immigration, baggage and customs commonly take an hour after landing, so a flight due after
            about 22:00 should plan on the bus, and one due after about 22:30 on a car or a night by the airport. A
            metered taxi to JR Kyoto Station is about ¥43,150 with tolls, and Kansai Airport adds 20% to the fare
            between 22:00 and 5:00. A car booked ahead is priced per vehicle instead: MK&apos;s flat-rate taxi is from
            ¥23,800 to Kyoto Station plus tolls, and a{" "}
            <K href={kyotoPrivateKixTransfer.url}>private Kyoto transfer on Klook</K> asks for the booking a day ahead.
            The first HARUKA the next morning is at 6:31 on weekdays and 6:40 at weekends.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>Which one fits your arrival?</h3>
          <SimpleTable head={["If you…", "Take", "Why"]} rows={pickRows.map((r) => [r.you, r.pick, r.why])} />
          <p className={styles.bodyText} style={note}>
            Times and fares as in the table above, checked {CHECKED}. The one-hour allowance for arrival formalities is
            planning advice, not an airport figure.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoPrivateKixTransfer.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Private transfer to Kyoto →
            </KlookLink>
            <KlookLink href={kansaiAirportLimousineBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Limousine bus →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Door to door</span>
          <h2 className={styles.sectionTitle}>Shared Shuttle vs Private Transfer to a Kyoto Hotel?</h2>
          <p className={styles.bodyText}>
            Shared for one or two people, private for three or more. Yasaka&apos;s shared shuttle charges ¥4,300 per
            person to a hotel or home in Kyoto City, and Kansai Airport&apos;s page asks for the booking by 12:00 two days
            before; the ride takes as long as the other passengers&apos; drop-offs. A private car is priced per vehicle —
            MK&apos;s flat-rate taxi from ¥23,800 to Kyoto Station plus tolls, with vans for groups and English-speaking
            drivers on request. Split four ways that is about ¥6,000 a head before tolls against ¥4,300 on the shuttle,
            for a car that waits for nobody else. Both beat the train when your hotel is in Gion, Higashiyama or Arashiyama rather than
            by Kyoto Station, because there is no second leg with the cases. If you do take the train, the hotel areas
            and the bus routes on from the station are in{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto">where to stay in Kyoto</Link> and{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto</Link>; sending the cases ahead
            instead is covered in <Link href="/guides/transport/japan-luggage-delivery">Japan luggage delivery</Link>.
            Landing in the afternoon with a Gion hotel? A{" "}
            <Link href="/guides/attractions/gion-night-walking-tour">Gion night walking tour</Link> is a first
            evening that needs no planning.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoPrivateKixTransfer.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Private Kyoto transfer →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="Where Should You Stay in Kyoto After Flying into Kansai?"
          intro="The HARUKA and the airport bus both end at Kyoto Station, which makes it the easy first night. Availability and price change by date, so each area links to Klook's hotel search."
          areas={kyotoStayAreas}
        />

        <BookingEsimCard lead="Platform numbers, the bus stand and your hotel map — get mobile data before you land at Kansai." />

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

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Kansai Airport to Kyoto in one ride</h2>
            <p className={styles.ctaBannerDesc}>
              Buy the HARUKA ticket before you fly, or take the bus with heavy bags — and book the first night by Kyoto Station.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                HARUKA ticket →
              </KlookLink>
              <KlookLink href={kyotoStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kyoto Station hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
