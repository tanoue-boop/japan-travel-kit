import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import SimbyeOffer from "../../../components/SimbyeOffer";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import { cheapestAtLeastGb, getProvider, plansFor, pricesCheckedLabel, siteCheapestFrom } from "../../../lib/esim-prices";
import { formatUsd } from "../../../lib/esim-prices";
import { jrHarukaUrl, keiseiSkylinerUrl, klookEsim, nankaiRapitUrl, naritaExpressRoundTripUrl } from "../../../lib/klook-links";
import { pocketWifi } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import { EsimCtaTop } from "../../../components/EsimCta";

/**
 * Restored 6 Nov 2026 (jtk-20261106-A20); rebuilt 13 Nov 2026 (jtk-20261113-R05) for
 * "esim japan airport" / "sim card japan airport" (411 impressions, position 21 in the 28 days
 * to 12 Nov). This page answers "buy or collect at the airport"; best-esim-japan is the
 * all-provider comparison and is linked, not repeated.
 *
 * Every counter, vending machine, floor and hour below is from the airport's own listing:
 *   narita-airport.jp/en/service/internet/rental/                carries no update date
 *   tokyo-haneda.com/en/service/facilities/cellular_phone_rental.html
 *   kansai-airport.or.jp/en/service/internet/rental-wifi-sim
 * Sakura Mobile's prices are off sakuramobile.jp/travel/, its pickup counters and hours off
 * sakuramobile.jp/travel/pickup-return/. Free WiFi: tokyo-haneda.com wireless_lan.html and
 * kansai-airport.or.jp/en/service/internet/free-wifi (Narita's English site has no WiFi page
 * at a stable URL, so Narita is not named for it). All checked 13 Nov 2026.
 *
 * Changes from the 6 Nov reading: Haneda now lists AnyFone JAPAN SIM vending machines in
 * Terminals 1 and 2 (05:00–24:00); its Terminal 3 Mobile Center 2F opens 06:30, not 06:00.
 * Vending-machine prices are published on none of the airport pages, so none is printed.
 *
 * Re-read 20 Nov 2026 (jtk-20261120-R05) for "sim card at Narita / Haneda airport" and
 * "eSIM at Japan airports". Narita T1 now also lists JAL ABC on North Wing 1F (06:30 to 1 hour
 * after the last international arrival); Kansai T1 lists a fifth GLOBAL WiFi SIM machine at its
 * pickup lockers and a North counter opening 06:30. Added New Chitose and Fukuoka from:
 *   hokkaido-airports.com/en/new-chitose/service/internet-fax-copy/sim-card/  (no prices; no floors)
 *   fukuoka-airport.jp/en/service/{globalwifi-sim-intl,globalsim-for-japan-intl,journey-sim,
 *     og-wifi-intl,telecomsquare-intl}.html
 * The Global WiFi machine page at Fukuoka says "24/7" in its text but lists 05:00～22:40 as its
 * hours; the listed hours are used. Sakura Mobile prices (SIM ¥3,850, eSIM ¥1,375 tax incl.) and
 * pickup counters unchanged on 20 Nov.
 */
const CHECKED = "20 Nov 2026";
const CHECKED_ISO = "2026-11-20";
const ROUTE = "/guides/esim/japan-airport-sim-cards";
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";

const pricesCheckedAt = pricesCheckedLabel();
const ESIM_FROM = siteCheapestFrom();
const SIMBYE_URL = getProvider("simbye").affiliateUrl;
const SIMBYE_10 = cheapestAtLeastGb("simbye", 10);
const SIMBYE_FIXED = plansFor("simbye").filter((p) => !p.unlimited);
const WIFI = pocketWifi("ninja-wifi");

const linkStyle = { color: "var(--accent)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const SOURCES = [
  { label: "Narita", href: "https://www.narita-airport.jp/en/service/internet/rental/" },
  { label: "Haneda", href: "https://tokyo-haneda.com/en/service/facilities/cellular_phone_rental.html" },
  { label: "Kansai", href: "https://www.kansai-airport.or.jp/en/service/internet/rental-wifi-sim" },
];

type AirportRow = { airport: string; terminal: string; vending: string; counters: string; hours: string };

const airportRows: AirportRow[] = [
  {
    airport: "Narita (NRT)",
    terminal: "Terminal 1",
    vending: "GPA SIM vending machines: 1F Central Building, 1F South Wing (no hours listed)",
    counters: "AnyFone JAPAN, SoftBank Global Rental, J WiFi & Mobile, XCom Global, Telecomsquare (1F Central); Rakuten Mobile (4F Central); JAL ABC (1F North Wing and 1F South Wing)",
    hours: "Most 07:00–21:00; Rakuten Mobile 08:00–20:00; JAL ABC 1F 06:30 to 1 hour after the last international arrival",
  },
  {
    airport: "Narita (NRT)",
    terminal: "Terminal 2",
    vending: "GPA SIM vending machines: 2 on 1F Main Building, 4 on 2F before customs",
    counters: "AnyFone JAPAN, SoftBank Global Rental, J WiFi & Mobile, JAL ABC (1F); XCom Global, Telecomsquare (B1F)",
    hours: "Most 07:00–21:00; JAL ABC 1F 06:30 to 1 hour after the last international arrival",
  },
  {
    airport: "Narita (NRT)",
    terminal: "Terminal 3",
    vending: "GPA SIM vending machine, 1F",
    counters: "J WiFi & Mobile, 1F",
    hours: "07:00–21:00",
  },
  {
    airport: "Haneda (HND)",
    terminal: "Terminal 3 (international)",
    vending: "None listed",
    counters: "AnyFone JAPAN (2F arrivals, prepaid SIM); Mobile Center (2F arrivals, 3F departures); XCom Global (3F)",
    hours: "AnyFone prepaid SIM 06:00–23:00; Mobile Center 06:30–23:00; XCom 06:30–22:30",
  },
  {
    airport: "Haneda (HND)",
    terminal: "Terminal 2",
    vending: "AnyFone JAPAN SIM vending machine, B1F",
    counters: "J WiFi & Mobile / GLOBAL WiFi (2F international arrivals); Mobile Center (3F international departures)",
    hours: "Vending 05:00–24:00; GLOBAL WiFi 05:45–23:00; Mobile Center 07:00–22:00",
  },
  {
    airport: "Haneda (HND)",
    terminal: "Terminal 1",
    vending: "AnyFone JAPAN SIM vending machine, B1F Marketplace (North)",
    counters: "None selling SIMs listed (WiFiBOX router rental, 2F)",
    hours: "Vending 05:00–24:00",
  },
  {
    airport: "Kansai (KIX)",
    terminal: "Terminal 1",
    vending: "GLOBAL WiFi North and JTB SIM vending machines (24 hours); GLOBAL WiFi Central, South and pickup-locker machines, all 1F",
    counters: "Sakura Mobile, Telecom Square, GLOBAL WiFi Central and North (1F)",
    hours: "Vending 24 hours (North, JTB); Sakura Mobile, Telecom Square, GLOBAL WiFi Central 06:00–23:00; GLOBAL WiFi North 06:30–23:00",
  },
  {
    airport: "Kansai (KIX)",
    terminal: "Terminal 2",
    vending: "GLOBAL WiFi SIM vending machine, 1F (no hours listed)",
    counters: "GLOBAL WiFi departure gate counter, 1F",
    hours: "07:00–21:30",
  },
];

type CompareRow = { label: string; airport: string; pickup: string; esim: string };

const compareRows: CompareRow[] = [
  {
    label: "Bottom line",
    airport: "Fine if you land in counter hours and your phone cannot take an eSIM",
    pickup: "Best for a physical SIM: the order is waiting for you",
    esim: "Least effort: connected when you switch off flight mode",
  },
  {
    label: "Published price",
    airport: "None of the five airport listings prints a counter or vending-machine price",
    pickup: "Sakura Mobile Travel SIM from ¥3,850; Travel eSIM from ¥1,375 (tax incl.)",
    esim: `From ${ESIM_FROM} in this site's eSIM price check (checked ${pricesCheckedAt})`,
  },
  {
    label: "When you can get it",
    airport: "Counters 06:00–23:00 at best (most of Narita 07:00–21:00); some vending machines 24 hours (KIX T1) or 05:00–24:00 (Haneda T1, T2)",
    pickup: "Sakura Mobile counters: KIX T1 06:00–23:00; Haneda T2 07:00–22:00; Haneda T3 closed 01:00–04:00; Narita T1/T2 06:30 to 1 hour after the last international arrival; Fukuoka international 07:00–21:00",
    esim: "Any time, from home; install over home WiFi",
  },
  {
    label: "What you do on arrival",
    airport: "Find the counter or machine, choose a plan, swap the SIM",
    pickup: "Show your passport, collect the SIM (or an eSIM QR code), swap or scan",
    esim: "Turn the eSIM line on after landing",
  },
  {
    label: "Japanese phone number",
    airport: "Assume data only unless the pack says otherwise",
    pickup: "Travel SIM is data only, no number (Sakura Mobile's own page)",
    esim: "Data-only plans have no number; check the plan",
  },
  {
    label: "Phone needed",
    airport: "Unlocked, with a SIM slot",
    pickup: "Unlocked, with a SIM slot (or eSIM for the QR code)",
    esim: "Unlocked and eSIM-compatible",
  },
];

/** Table 3: the five airports a traveller is most likely to land at, on one row each. */
type FiveRow = { airport: string; vending: string; esim: string; sakura: string };

const fiveAirportRows: FiveRow[] = [
  {
    airport: "Narita (NRT)",
    vending: "Yes: GPA machines in T1 (Central, South Wing 1F), T2 (1F, and 4 on 2F before customs), T3 1F; no hours listed",
    esim: "Not on the airport's listing",
    sakura: "JAL ABC counter, T1 South Wing 1F and T2 1F, 06:30 to 1 hour after the last international arrival (T3: collect at T2)",
  },
  {
    airport: "Haneda (HND)",
    vending: "Yes: AnyFone JAPAN, T1 B1F and T2 B1F, 05:00–24:00; none listed in T3",
    esim: "Not on the airport's listing",
    sakura: "T2 Mobile Center 3F, 07:00–22:00; T3 JAL ABC counter 2F, closed 01:00–04:00",
  },
  {
    airport: "Kansai (KIX)",
    vending: "Yes: GLOBAL WiFi and JTB machines in T1 1F (North and JTB 24 hours); GLOBAL WiFi machine in T2 1F",
    esim: "Not on the airport's listing",
    sakura: "Sakura Mobile counter, T1 1F, 06:00–23:00 (T2: collect at T1)",
  },
  {
    airport: "New Chitose (CTS)",
    vending: "Yes: prepaid SIM vending machines in the Domestic and International terminal buildings",
    esim: "Yes: the machines list eSIM plans (JOURNEY SIM, AnyFone JAPAN and a Japan/world data eSIM)",
    sakura: "Post office pickup only: New Chitose Airport Post Office, Domestic Terminal Center Plaza 2F, 09:00–17:00",
  },
  {
    airport: "Fukuoka (FUK)",
    vending: "Yes: Global WiFi and GLOBAL SIM For JAPAN machines, International Terminal 1F, 05:00–22:40",
    esim: "Yes: JOURNEY SIM / eSIM (physical SIM and eSIM), International Terminal 1F, 05:00–22:40",
    sakura: "Sakura Mobile counter, International Terminal arrival lobby 1F, 07:00–21:00",
  },
];

const FIVE_SOURCES = [
  "https://www.narita-airport.jp/en/service/internet/rental/",
  "https://tokyo-haneda.com/en/service/facilities/cellular_phone_rental.html",
  "https://www.kansai-airport.or.jp/en/service/internet/rental-wifi-sim",
  "https://www.hokkaido-airports.com/en/new-chitose/service/internet-fax-copy/sim-card/",
  "https://www.fukuoka-airport.jp/en/service/journey-sim.html",
  "https://www.fukuoka-airport.jp/en/service/globalwifi-sim-intl.html",
  "https://www.fukuoka-airport.jp/en/service/globalsim-for-japan-intl.html",
  "https://www.sakuramobile.jp/travel/pickup-return/",
];

const FAQ_Q_NARITA = "Can you buy a SIM card at Narita Airport?";
const FAQ_Q_HANEDA = "Is there a SIM card vending machine at Haneda?";
const FAQ_Q_CHEAPER = "Is it cheaper to buy an eSIM before landing in Japan?";
const FAQ_Q_WHICH = "Which Japan airports sell eSIMs?";
const FAQ_Q_SAKURA = "Can I pick up a Sakura Mobile SIM at the airport?";
const FAQ_Q_LATE = "What if I land after the SIM counters close?";

const faqItems = [
  {
    q: FAQ_Q_NARITA,
    a: `Yes. Narita lists GPA SIM vending machines in all three terminals (Terminal 1 Central Building and South Wing 1F; Terminal 2 1F, plus four on 2F before customs; Terminal 3 1F) and counters such as AnyFone JAPAN, SoftBank Global Rental, J WiFi & Mobile and Telecomsquare, most open 07:00–21:00, all before departure passport control. The listing gives no vending-machine hours or prices. Checked ${CHECKED}.`,
  },
  {
    q: FAQ_Q_HANEDA,
    a: `Yes, in Terminals 1 and 2: Haneda lists AnyFone JAPAN SIM vending machines on B1F of Terminal 1 (Marketplace North) and Terminal 2 (Terminal Lobby North), open 05:00–24:00. International Terminal 3 lists no machine; there, AnyFone JAPAN's counter in the 2F arrival lobby sells prepaid SIMs 06:00–23:00. Checked ${CHECKED}.`,
  },
  {
    q: FAQ_Q_CHEAPER,
    a: `Usually, and it is faster. None of the airport listings publishes a counter or vending-machine price. Sakura Mobile, which sells both, lists its Travel eSIM from ¥1,375 against ¥3,850 for its Travel SIM card, tax included (checked ${CHECKED}), and the cheapest eSIM in this site's price check is ${ESIM_FROM} (checked ${pricesCheckedAt}). An eSIM installed at home connects when you switch off flight mode, with no counter hours or queue.`,
  },
  {
    q: FAQ_Q_WHICH,
    a: `Of Narita, Haneda, Kansai, New Chitose and Fukuoka, only New Chitose and Fukuoka name eSIM plans on their own listings, sold from machines: New Chitose's prepaid SIM vending machines (JOURNEY SIM, AnyFone JAPAN and a Japan/world data eSIM) and Fukuoka's JOURNEY SIM / eSIM point in International Terminal 1F, 05:00–22:40. The Narita, Haneda and Kansai listings cover physical SIM cards and rentals. Sakura Mobile hands over an eSIM QR code at its airport counters if you order ahead. Checked ${CHECKED}.`,
  },
  {
    q: FAQ_Q_SAKURA,
    a: `Yes, if you order ahead (orders can be changed up to 3 days before pickup). Sakura Mobile's pickup points are the JAL ABC counters at Narita Terminal 1 (South Wing 1F) and Terminal 2 (1F), 06:30 to 1 hour after the last international arrival; Mobile Center at Haneda Terminal 2 (3F, 07:00–22:00) and the JAL ABC counter at Terminal 3 (2F, closed 01:00–04:00); its own counters at Kansai Terminal 1 (1F, 06:00–23:00) and Fukuoka International Terminal (1F, 07:00–21:00); and post offices at New Chitose and Chubu Centrair. There is no counter at Narita Terminal 3 or Kansai Terminal 2. Checked ${CHECKED}.`,
  },
];

const TITLE = "Japan Airport SIM Card & eSIM: Narita, Haneda, KIX Counters";
const DESCRIPTION =
  "SIM card at Narita or Haneda airport and eSIM at Japan airports: counters, vending machines, hours by terminal, and why an eSIM before landing is cheaper.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SourceNote() {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      Last checked: {CHECKED_ISO}. Sources:{" "}
      {SOURCES.map((s, i) => (
        <span key={s.href}>
          {i > 0 && ", "}
          <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>{s.href}</a>
        </span>
      ))}
      .
    </p>
  );
}

export default function JapanAirportSimCardsPage({ updated }: { updated: PageUpdated }) {
  const url = `https://www.japan-travel-kit.com${ROUTE}`;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={url} />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "Simbye Japan eSIM",
              description: "Data-only Japan eSIM to install before you fly, instead of buying a SIM at the airport.",
              brand: "Simbye",
              currency: "USD",
              lowPrice: Math.min(...SIMBYE_FIXED.map((p) => p.priceUsd)),
              highPrice: Math.max(...SIMBYE_FIXED.map((p) => p.priceUsd)),
              offerCount: SIMBYE_FIXED.length,
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
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Airport SIM Cards", item: url },
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Airport SIM Cards</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Airport SIM Card &amp; eSIM 2026: <br />Narita, Haneda and KIX Counters
          </h1>
          <p className={styles.heroSubtitle}>
            Where to buy a SIM card at Narita or Haneda airport, every counter and vending machine by terminal, and
            which Japan airports sell an eSIM, with hours from each airport&apos;s own listing.
          </p>
          <div className={styles.heroBadges}>
            {[`Checked ${CHECKED}`, "From airport listings", "Narita, Haneda, KIX, New Chitose, Fukuoka"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            You can buy a <strong>SIM card at Narita, Haneda and Kansai (KIX) airports</strong> before passport
            control: Narita lists GPA SIM vending machines in all 3 terminals and counters mostly open 07:00–21:00,
            Haneda lists AnyFone JAPAN vending machines in Terminals 1 and 2 (05:00–24:00) and a prepaid SIM counter in
            international Terminal 3 (06:00–23:00), and KIX Terminal 1 lists Sakura Mobile and Telecom Square counters
            (06:00–23:00) and 2 SIM vending machines open 24 hours. An <strong>eSIM installed before you land</strong>{" "}
            is cheaper and quicker: Sakura Mobile, which sells both, lists its Travel eSIM from ¥1,375 against ¥3,850
            for its Travel SIM card (tax included), the cheapest eSIM in this site&apos;s price check is{" "}
            <strong>{ESIM_FROM}</strong> (checked {pricesCheckedAt}), and it connects when you switch off flight mode,
            with no counter hours to beat. Of the five airports below, only New Chitose and Fukuoka list machines that
            sell an <strong>eSIM at the airport</strong>; listings and Sakura Mobile prices checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Buying before you fly takes 4 steps — check the phone, buy, install from the QR code, switch it on after
            landing — set out in{" "}
            <Link href="/guides/esim" style={linkStyle}>how to get an eSIM for Japan</Link>.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Phone takes an eSIM</p>
                <p className={styles.verdictStatValue}>Buy before you fly, from {ESIM_FROM}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Phone cannot</p>
                <p className={styles.verdictStatValue}>Pre-order a SIM for pickup, or use the counter</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Late landing</p>
                <p className={styles.verdictStatValue}>Vending machine, or an eSIM</p>
              </div>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={SIMBYE_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Get Simbye eSIM before you fly →
              </a>
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCtaInternal}>
                {klookEsim.ctaLabel}
              </KlookLink>
            </div>
          </div>
        </div>

        <BookingEsimCard lead="Landing in Japan? Skip the airport SIM queue." />

        <SimbyeOffer />

        {/* Physical SIM for airport pickup, then the train into the city. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Phone cannot take an eSIM? Pre-order a Sakura Mobile Travel SIM and collect it at Narita, Haneda, Kansai
            or Fukuoka (pickup counters and hours are in the five-airport table below) instead of hoping a counter is
            still open when you land.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <a href={SAKURA_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.pickCta}>
              Pre-order Sakura Mobile for airport pickup →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Once you are connected, the airport train is the next queue. Tickets for the main airport trains can be
            booked ahead:
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Narita: Keisei Skyliner →
            </KlookLink>
            <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Narita: N&apos;EX round trip →
            </KlookLink>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kansai: JR Haruka →
            </KlookLink>
            <KlookLink href={nankaiRapitUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kansai: Nankai to Namba →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Routes, journey times and which train suits your hotel:{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={linkStyle}>Tokyo airport transfer</Link> and{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>Osaka airport transfer</Link>.
          </p>
        </section>

        {/* Can you buy an eSIM at the airport? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>eSIM</span>
          <h2 className={styles.sectionTitle}>Can You Buy an eSIM at the Airport in Japan?</h2>
          <p className={styles.bodyText}>
            Not over the counter, in most cases: the Narita, Haneda and Kansai listings cover physical SIM cards and
            router rentals, not eSIM sales. New Chitose and Fukuoka are the exceptions, with eSIM plans sold from
            machines (see the five-airport table below). Elsewhere there are two ways round it. Sakura Mobile hands over an eSIM QR code at
            its airport pickup counters if you order ahead (orders can be changed up to 3 days before pickup), and any
            travel eSIM can be bought online in the arrivals hall over the free WiFi that Haneda and Kansai list. Both
            take longer than installing it at home, where a QR code and your own WiFi are all it needs; which one to
            install is in the{" "}
            <Link href="/guides/esim/best-esim-japan" style={linkStyle}>best eSIM for Japan</Link> comparison of six
            providers. Our{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={linkStyle}>eSIM setup guide</Link> walks through
            it, and{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={linkStyle}>does eSIM work in Japan?</Link> covers
            which phones take one.
          </p>
        </section>

        <EsimCtaTop />

        {/* By airport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By airport</span>
          <h2 className={styles.sectionTitle}>Where Can I Buy a SIM Card at Narita, Haneda or Kansai Airport?</h2>
          <p className={styles.bodyText}>
            In the public areas before passport control, at every terminal below; at Narita, all three terminals
            have a GPA SIM vending machine. Narita states that its SIM and
            rental counters are only before departure passport control, and Kansai that rental services are not
            available beyond the security checkpoint.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Airport", "Terminal", "SIM vending machines", "Counters (SIM, WiFi or phone rental)", "Hours"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>All three</td>
                    <td style={{ fontSize: "0.85rem" }}>Arrivals side</td>
                    <td style={{ fontSize: "0.85rem" }}>Only KIX T1 lists 24-hour machines</td>
                    <td style={{ fontSize: "0.85rem" }}>Before passport control and security</td>
                    <td style={{ fontSize: "0.85rem" }}><strong>Counters close 21:00–23:00; an eSIM works any time</strong></td>
                  </tr>
                  {airportRows.map((row) => (
                    <tr key={`${row.airport}-${row.terminal}`}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.airport}</td>
                      <td style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>{row.terminal}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "190px" }}>{row.vending}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "220px" }}>{row.counters}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "150px" }}>{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourceNote />
          <p className={styles.bodyText} style={noteStyle}>
            Narita&apos;s page carries no update date and lists no hours for its vending machines. Not every counter
            sells a SIM as well as renting routers and phones, so check before you queue. For the train or bus into the
            city once you are connected, see our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={linkStyle}>Tokyo airport transfer guide</Link>.
          </p>
        </section>

        {/* Airport vs before you fly */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Airport or online</span>
          <h2 className={styles.sectionTitle}>Should You Buy at the Airport or Get an eSIM Before You Fly?</h2>
          <p className={styles.bodyText}>
            Before you fly, if your phone takes an eSIM: there is no counter to find, no opening hours to beat, and
            the line is live when you switch off flight mode. A pre-ordered SIM for airport pickup is the next best
            thing for a phone that cannot.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Buy at the airport", "Pre-order, collect at the airport", "eSIM bought before you fly"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.label}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "180px" }}>{i === 0 ? <strong>{row.airport}</strong> : row.airport}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "180px" }}>{i === 0 ? <strong>{row.pickup}</strong> : row.pickup}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "180px" }}>{i === 0 ? <strong>{row.esim}</strong> : row.esim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO}. Airport hours from the listings above; Sakura Mobile counters and hours from{" "}
            <a href="https://www.sakuramobile.jp/travel/pickup-return/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>
              https://www.sakuramobile.jp/travel/pickup-return/
            </a>
            . Sakura Mobile has no counter at Narita Terminal 3 or KIX Terminal 2 and sends those orders to Terminal 2
            and Terminal 1 respectively.
          </p>

          <BookingEsimCard lead="Decided on an eSIM? Install it before you fly." />

          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SIMBYE_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>Get Simbye eSIM →</a>
            <a href={SAKURA_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.pickCta}>
              Pre-order Sakura Mobile for airport pickup →
            </a>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Comparing eSIM providers on data, network and price rather than where to collect? That is our{" "}
            <Link href="/guides/esim/best-esim-japan" style={linkStyle}>best eSIM for Japan guide</Link>.
          </p>
        </section>

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>Is It Cheaper to Buy an eSIM Before Landing in Japan?</h2>
          <p className={styles.bodyText}>
            Yes, as a rule. The airports do not publish counter or vending-machine prices, so this uses the sellers
            that do; Sakura Mobile sells both a physical SIM and an eSIM, which makes the gap easy to see.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Published price", "Get it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Simbye eSIM</td>
                    <td className={styles.tdPrice}>From {ESIM_FROM}{SIMBYE_10 ? `; 10 GB ${formatUsd(SIMBYE_10.priceUsd)}` : ""}</td>
                    <td style={{ fontSize: "0.85rem" }}>Online, before you fly</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Sakura Mobile Travel eSIM</td>
                    <td className={styles.tdPrice}>From ¥1,375</td>
                    <td style={{ fontSize: "0.85rem" }}>By email, or QR code at an airport pickup counter</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Sakura Mobile Travel SIM</td>
                    <td className={styles.tdPrice}>From ¥3,850</td>
                    <td style={{ fontSize: "0.85rem" }}>Airport pickup, or delivered to a hotel or post office</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>{WIFI.name} pocket WiFi</td>
                    <td className={styles.tdPrice}>From ${WIFI.fromUsdPerDay.toFixed(2)} a day</td>
                    <td style={{ fontSize: "0.85rem" }}>Airport counter, on Klook</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Sakura Mobile&apos;s prices include tax, checked on sakuramobile.jp on {CHECKED}. eSIM prices checked{" "}
            {pricesCheckedAt}. To see every eSIM by price, use our{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={linkStyle}>cheapest eSIM ranking</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SIMBYE_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>Get Simbye eSIM →</a>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
        </section>

        {/* Vending, late landing and the phone that cannot take an eSIM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Vending machines</span>
          <h2 className={styles.sectionTitle}>Are There SIM Card Vending Machines at Japanese Airports?</h2>
          <p className={styles.bodyText}>
            Yes, at all five airports in the table below. Narita lists GPA SIM vending machines in Terminals 1, 2 and
            3, including four on Terminal 2&apos;s 2F before customs, so you can buy one while you wait for your bags.
            Kansai lists five in Terminal 1, the GLOBAL WiFi North and JTB machines open 24 hours, and one in Terminal
            2. None of the airports publishes the machine prices; New Chitose&apos;s page says to check the price at
            the machine. Checked {CHECKED}.
          </p>

          <h2 className={styles.sectionTitle}>Is There a SIM Card Vending Machine at Haneda?</h2>
          <p className={styles.bodyText}>
            Yes, in Terminals 1 and 2: AnyFone JAPAN machines on B1F (Terminal 1 Marketplace North, Terminal 2
            Terminal Lobby North), open 05:00–24:00. International Terminal 3 lists no machine, so arrivals there use
            AnyFone JAPAN&apos;s prepaid SIM counter in the 2F arrival lobby (06:00–23:00). Checked {CHECKED}.
          </p>
        </section>

        {/* Five airports: vending, eSIM, Sakura Mobile pickup */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Five airports</span>
          <h2 className={styles.sectionTitle}>{FAQ_Q_WHICH}</h2>
          <p className={styles.bodyText}>
            Only New Chitose and Fukuoka, of the five below: both list machines that sell eSIM plans. Every one of the
            five lists SIM vending machines, and Sakura Mobile has a pickup point at each, a post office in New
            Chitose&apos;s case.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Airport", "SIM vending machines", "eSIM sold at the airport", "Sakura Mobile pickup"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>All five</td>
                    <td style={{ fontSize: "0.85rem" }}><strong>Yes, at every one</strong></td>
                    <td style={{ fontSize: "0.85rem" }}><strong>Only New Chitose and Fukuoka list it</strong></td>
                    <td style={{ fontSize: "0.85rem" }}><strong>At all five; order ahead</strong></td>
                  </tr>
                  {fiveAirportRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.airport}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "200px" }}>{row.vending}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "170px" }}>{row.esim}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "200px" }}>{row.sakura}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO}. Sources:{" "}
            {FIVE_SOURCES.map((href, i) => (
              <span key={href}>
                {i > 0 && ", "}
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>{href}</a>
              </span>
            ))}
            . New Chitose&apos;s page names no floors for its machines. Sakura Mobile&apos;s New Chitose and Chubu
            Centrair pickups are post-office counters (weekdays only at Centrair).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SIMBYE_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>Get Simbye eSIM before you land →</a>
            <a href={SAKURA_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.pickCta}>
              Sakura Mobile airport pickup →
            </a>
          </div>
        </section>

        <section className={styles.bodySection}>

          <h2 className={styles.sectionTitle}>{FAQ_Q_LATE}</h2>
          <p className={styles.bodyText}>
            Your options narrow to a machine. Kansai Terminal 1&apos;s two 24-hour machines are the only round-the-clock
            SIM sales on these listings; Haneda&apos;s Terminal 1 and 2 machines run until 24:00 and its Terminal 3
            counters close at 23:00, with a 24-hour unmanned WiFi rental in front of Mobile Center on 2F. Narita&apos;s
            counters mostly close at 21:00, and its listing gives no hours for the vending machines. An eSIM installed
            before you fly avoids the question.
          </p>

          <h2 className={styles.sectionTitle}>What If Your Phone Cannot Take an eSIM?</h2>
          <p className={styles.bodyText}>
            Then a physical SIM or a router is the right purchase, and pre-ordering beats hoping a counter is open.{" "}
            <a href={SAKURA_URL} target="_blank" rel="noopener noreferrer nofollow" style={linkStyle}>
              Sakura Mobile
            </a>{" "}
            offers airport pickup at Narita, Haneda, Kansai and Fukuoka counters and at post offices at New Chitose
            and Chubu Centrair. If several people need data, a pocket WiFi rental may cost less overall
            — airport pickup counters and per-day prices are in{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={linkStyle}>pocket WiFi Japan</Link>{" "}
            — and our{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={linkStyle}>SIM card vs eSIM guide</Link>{" "}
            goes through the choice.
          </p>
          <p className={styles.bodyText}>
            None of the data-only cards gives you a number: the{" "}
            <Link href="/guides/esim/japan-phone-number-for-foreigners" style={linkStyle}>
              Japan phone number for foreigners
            </Link>{" "}
            guide covers the voice eSIM sold at airport counters. Arriving to study? The{" "}
            <Link href="/guides/esim/japan-sim-card-for-students" style={linkStyle}>
              Japan SIM card for international students
            </Link>{" "}
            guide lists what you need for a monthly plan once your residence card has an address.
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

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Skip the airport counter</h2>
            <p className={styles.ctaBannerDesc}>
              Install a Japan eSIM at home and it is working when you land, from {ESIM_FROM}.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={SIMBYE_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Get Simbye eSIM →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
