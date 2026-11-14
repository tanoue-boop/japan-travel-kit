import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  hotelKeihanUniversalTowerKlook,
  hotelKintetsuUniversalCityKlook,
  hotelUniversalPortKlook,
  hotelUniversalPortVitaKlook,
  kansaiAirportLimousineBus,
  parkFrontHotelUsjKlook,
  usjExpressPassUrl,
  usjHotelsTripPrep,
  usjStayAreas,
  usjStudioPassUrl,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * USJ hotels: the Official Hotels at Universal City against a Namba or Umeda base.
 * Added 13 Nov 2026 (task-jtk-20261113-02).
 *
 * Next to its neighbours: usj-tickets-express-pass answers "which ticket";
 * where-to-stay-in-osaka answers "which Osaka area"; this page answers "which hotel
 * by the gates, and is it worth it over Namba or Umeda".
 *
 * Official reads on 13 Nov 2026:
 *   usj.co.jp/web/ja/jp/tour-hotel/partner-hotel   (content JSON, JA rev. 2026-08-28)
 *       Official Hotels: Universal Port Vita, Oriental Hotel Universal City, Universal
 *       Port, Kintetsu Universal City, Keihan Universal Tower, The Singulari, The Park
 *       Front ("located right outside the main gate ... closest to the park");
 *       8 Alliance and 8 Associate hotels
 *   usj.co.jp .../partner-hotel/benefit             (rev. 2026-02-04) Official Hotels:
 *       wait-time info, 1-Day Studio Pass and Express Pass sales, Studio Pass upgrade;
 *       no early or guaranteed entry for any tier
 *   parkfront-hotel.com/faq/   Early Park Inn is a travel-agency plan perk; Studio Passes
 *       sold at full price; phone bookings 1 year ahead, online 6 months ahead
 *   parkfront-hotel.com/access/                     station 1 min on foot
 *   universalport.orixhotelsandresorts.com          Port: park ~4 min, station ~3 min;
 *       Vita: park ~4 min, station ~2 min; bookings up to 1 year ahead
 *   miyakohotels.ne.jp/hotel-kintetsu/access/       park 1 min, JR station ~2 min
 *   hotelkeihan.co.jp/tower/access/                 USJ 2 min on foot
 *   candeohotels.com/ja/singulari/access/           connected to JR Universal City Station
 *   universalcity.oriental-hotels.com/access/       station ~1 min, USJ ~1 min
 *   usj.co.jp/web/en/us/access/train                Osaka/Umeda ~11 min; Osaka-Namba ~13
 *       min (Hanshin to Nishikujo + JR Yumesaki); JR-Namba ~15 min; Kansai Airport ~65 min
 *   kate.co.jp/timetable/detail/NU (page 2026-11-09) KIX T1 ⇄ USJ 50–70 min, ¥1,800 adult,
 *       ¥900 child, return ¥3,300 (14 days); no reservations, first come first served
 *
 * Not printed: JR, Hanshin and Metro fares (not read on the operators' sites today),
 * booking windows for the hotels that do not publish one, any Klook price.
 */

const ROUTE = "/guides/attractions/usj-hotels";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;
const OWN = checkedLabel("2026-11-13");

type HotelRow = { hotel: string; park: string; station: string; extras: string; href?: string };

/** Table 1: the seven Official Hotels, closest first. First row is the answer. */
const hotelRows: HotelRow[] = [
  {
    hotel: "The Park Front Hotel at Universal Studios Japan",
    park: "Right outside the main gate — USJ calls it the closest to the park",
    station: "1 min",
    extras: "Studio Pass and Express Pass sold at the hotel",
    href: parkFrontHotelUsjKlook.url,
  },
  {
    hotel: "Hotel Kintetsu Universal City",
    park: "1 min",
    station: "About 2 min",
    extras: "USJ collaboration rooms; Universal Studios Store in the hotel",
    href: hotelKintetsuUniversalCityKlook.url,
  },
  {
    hotel: "Oriental Hotel Universal City",
    park: "About 1 min",
    station: "About 1 min",
    extras: "Official Hotel ticket sales",
  },
  {
    hotel: "Hotel Keihan Universal Tower",
    park: "2 min",
    station: "“A short walk” (no minutes given)",
    extras: "Official Hotel ticket sales",
    href: hotelKeihanUniversalTowerKlook.url,
  },
  {
    hotel: "The Singulari Hotel & Skyspa at USJ",
    park: "No walking time published",
    station: "Connected to the station",
    extras: "Official Hotel ticket sales",
  },
  {
    hotel: "Hotel Universal Port",
    park: "About 4 min",
    station: "About 3 min",
    extras: "Collaboration rooms and design; Universal Studios Store in the hotel",
    href: hotelUniversalPortKlook.url,
  },
  {
    hotel: "Hotel Universal Port Vita",
    park: "About 4 min",
    station: "About 2 min",
    extras: "Collaboration design",
    href: hotelUniversalPortVitaKlook.url,
  },
];

/** Table 2: Universal City vs Umeda vs Namba. */
const areaRows = [
  {
    area: "Universal City (Official Hotels)",
    route: "On foot",
    time: "1–4 min to the gates",
    best: "Being at the gates for opening; kids; a two-day park visit",
  },
  {
    area: "Umeda / Osaka Station",
    route: "JR to Universal City, direct or changing at Nishikujo",
    time: "About 11 min",
    best: "JR day trips to Kyoto, Kobe or Himeji; the shinkansen at Shin-Osaka",
  },
  {
    area: "Namba (Osaka-Namba)",
    route: "Hanshin Namba Line to Nishikujo (about 8 min), then JR Yumesaki Line (about 5 min)",
    time: "About 13 min",
    best: "Food and nightlife; the Nankai train to Kansai Airport",
  },
  {
    area: "JR Namba",
    route: "JR via Imamiya and Nishikujo",
    time: "About 15 min",
    best: "A JR-side Namba hotel",
  },
  {
    area: "Kansai Airport",
    route: "Limousine bus to USJ / JR via Nishikujo",
    time: "About 50–70 min by bus; about 65 min by train",
    best: "Arrival or departure day at the park",
  },
];

/** Table 3: when to book. */
const bookingRows = [
  {
    what: "Hotel Universal Port / Vita",
    opens: "Up to one year ahead, at all times",
    source: "universalport.orixhotelsandresorts.com",
  },
  {
    what: "The Park Front Hotel",
    opens: "Phone: one year ahead. Online: six months ahead",
    source: "parkfront-hotel.com/faq/",
  },
  {
    what: "Other Official Hotels",
    opens: "Not published on their sites; check each hotel or Klook for your date",
    source: "—",
  },
  {
    what: "Studio Pass and Express Pass",
    opens: "Priced by date; Express Pass is limited per day",
    source: "usj.co.jp (see our tickets guide)",
  },
];

const faqItems = [
  {
    q: "Which USJ hotel is closest to the park?",
    a: `The Park Front Hotel at Universal Studios Japan — USJ's own hotel page says it is right outside the main gate and the closest to the park. Hotel Kintetsu Universal City and Oriental Hotel Universal City each give about 1 minute on foot to the park on their own sites. Read ${OWN}.`,
  },
  {
    q: "What are the Universal Studios Japan official hotels?",
    a: "Seven, on USJ's partner-hotel page: The Park Front Hotel, Hotel Kintetsu Universal City, Oriental Hotel Universal City, Hotel Keihan Universal Tower, The Singulari Hotel & Skyspa, Hotel Universal Port and Hotel Universal Port Vita. All are around JR Universal City Station.",
  },
  {
    q: "Do USJ official hotels get early entry?",
    a: "Not as a hotel perk. USJ's benefits table lists ticket sales, Express Pass sales and wait-time information for Official Hotels, but no early or guaranteed entry. The Park Front Hotel's FAQ says Early Park Inn comes only with travel-agency plans that include it.",
  },
  {
    q: "Is it better to stay at USJ or in Namba?",
    a: "At USJ for the park days, in Namba for the rest of Osaka. From Osaka-Namba, USJ is about 13 minutes via Nishikujo; from Universal City hotels the gates are 1 to 4 minutes on foot. With one park day, Namba or Umeda is usually enough; with two, or with small children, Universal City saves the most.",
  },
  {
    q: "When should I book USJ hotels?",
    a: "As early as your date is fixed. Hotel Universal Port and Vita take bookings up to one year ahead; The Park Front Hotel takes phone bookings one year ahead and online bookings six months ahead. Book the Studio Pass for the same date at the same time.",
  },
  {
    q: "Can I buy USJ tickets at the official hotels?",
    a: "Yes. USJ lists 1-Day Studio Pass and Express Pass sales at the Official Hotels. The Park Front Hotel says it sells Studio Passes at the regular price, with no discount.",
  },
  {
    q: "How do I get from Kansai Airport to the USJ hotels?",
    a: "By the airport limousine bus, about 50 to 70 minutes from Terminal 1, ¥1,800 adult one way; it takes no reservations and is first come, first served. By train it is about 65 minutes, changing at Nishikujo.",
  },
];

const TITLE = "USJ Hotels: Official Hotels Near Universal Studios Japan";
const DESCRIPTION =
  "USJ hotels compared: the 7 Universal Studios Japan official hotels are 1–4 min from the gates. Hotels near Universal Studios Japan vs Namba and Umeda.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function UsjHotelsPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "USJ Hotels", item: URL },
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
          <span className={styles.breadCurrent}>USJ Hotels</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            USJ Hotels (2026):<br />Universal Studios Japan Official Hotels, Closest First
          </h1>
          <p className={styles.heroSubtitle}>
            Seven official hotels sit around Universal City Station. Here they are by distance to the gates, against
            a Namba or Umeda base, with what each one actually gives you.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Walking times from each hotel's site", "USJ's own perk list", "When rooms open"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Closest</p>
                <p className={styles.verdictStatValue}>The Park Front Hotel</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Official hotels to the gates</p>
                <p className={styles.verdictStatValue}>1–4 min on foot</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Umeda / Namba</p>
                <p className={styles.verdictStatValue}>About 11 / 13 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Early entry</p>
                <p className={styles.verdictStatValue}>Not a hotel perk</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>USJ hotels</strong> closest to the park are the seven Official Hotels at JR Universal City
              Station: <strong>The Park Front Hotel</strong> is right outside the main gate, and Hotel Kintetsu
              Universal City and Oriental Hotel Universal City are about <strong>1 minute</strong> on foot; the
              farthest, Hotel Universal Port and Vita, are about <strong>4 minutes</strong>. To spend less, stay in{" "}
              <strong>Umeda</strong> (about <strong>11 minutes</strong> by JR to Universal City) or{" "}
              <strong>Namba</strong> (about <strong>13 minutes</strong>, Hanshin to Nishikujo, then the JR Yumesaki
              Line). Times from USJ&apos;s and each hotel&apos;s official sites, read {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={parkFrontHotelUsjKlook.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                The Park Front Hotel →
              </KlookLink>
              <KlookLink href={usjStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                All Hotels Near USJ →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book With a USJ Hotel"
          intro="The room, the park ticket for the same date, the airport bus and data. Klook prices change by date, so open a listing for the figure on yours."
          items={usjHotelsTripPrep}
        />

        <EsimCtaTop />

        {/* Hotels */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Official hotels</span>
          <h2 className={styles.sectionTitle}>Which USJ Hotels Are Closest to the Park?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Park Front Hotel, then Hotel Kintetsu Universal City and Oriental Hotel Universal City at about a
            minute. All seven Universal Studios Japan official hotels are within about 4 minutes of the gates, so the
            choice is mostly room type and price, not distance.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Hotel", "To the park (on foot)", "To Universal City Station", "Extras USJ lists", "Book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hotelRows.map((row) => (
                    <tr key={row.hotel}>
                      <td className={styles.tdProvider} style={thStyle}>{row.hotel}</td>
                      <td style={thStyle}>{row.park}</td>
                      <td style={thStyle}>{row.station}</td>
                      <td style={thStyle}>{row.extras}</td>
                      <td style={thStyle}>
                        <KlookLink href={row.href ?? usjStayAreas[0].url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.href ? "Klook →" : "Hotel search →"}
                        </KlookLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}: the hotel list and perks on{" "}
            <a href="https://www.usj.co.jp/web/ja/jp/tour-hotel/partner-hotel" target="_blank" rel="noopener">usj.co.jp</a>;
            walking times on each hotel&apos;s own access page (parkfront-hotel.com, miyakohotels.ne.jp,
            universalcity.oriental-hotels.com, hotelkeihan.co.jp, candeohotels.com, universalport.orixhotelsandresorts.com).
            Every Official Hotel sells the 1-Day Studio Pass and the Express Pass — which{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">Universal Studios Japan Express Pass</Link>{" "}
            type to pick (4 or 7) is a separate question. No Klook price appears on this page.
          </p>
        </section>

        {/* Early entry */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Perks</span>
          <h2 className={styles.sectionTitle}>Do USJ Official Hotels Get Early Entry?</h2>
          <p className={styles.bodyText}>
            No — not as a hotel perk. USJ&apos;s benefits table for Official Hotels lists attraction wait-time
            information in the hotel, 1-Day Studio Pass and Express Pass sales, and a Studio Pass upgrade, but no
            early or guaranteed entry. The Park Front Hotel&apos;s FAQ says Early Park Inn is a travel-agency benefit,
            available only on agency plans that include it, and that it sells Studio Passes at the regular price.
            What the hotel does buy you is the walk: 1 to 4 minutes to the gates for opening, and back to the room
            at midday. Read on{" "}
            <a href="https://www.usj.co.jp/web/ja/jp/tour-hotel/partner-hotel/benefit" target="_blank" rel="noopener">usj.co.jp</a>{" "}
            and{" "}
            <a href="https://parkfront-hotel.com/faq/" target="_blank" rel="noopener">parkfront-hotel.com</a>, {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={usjStudioPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Studio Pass on Klook →
            </KlookLink>
            <KlookLink href={usjExpressPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Express Pass on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Which pass and which Express Pass you need is in our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">Universal Studios Japan Express Pass guide</Link>.
          </p>
        </section>

        {/* USJ vs Namba */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hotels near Universal Studios Japan</span>
          <h2 className={styles.sectionTitle}>Is It Better to Stay at USJ or in Namba?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            At USJ if the park is one of your main days or you have small children; Namba or Umeda if it is one day
            of a wider Osaka trip. The ride is short either way — about 11 minutes from Osaka Station and 13 from
            Osaka-Namba.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Base", "Route to USJ", "Time", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={thStyle}>{row.area}</td>
                      <td style={thStyle}>{row.route}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td style={thStyle}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.usj.co.jp/web/en/us/access/train" target="_blank" rel="noopener">usj.co.jp/web/en/us/access/train</a>{" "}
            and the airport bus route page on{" "}
            <a href="https://www.kate.co.jp/timetable/detail/NU" target="_blank" rel="noopener">kate.co.jp</a>. Fares
            are not printed for the trains. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka guide</Link> compares
            Namba, Umeda and Tennoji in full.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotels Near Universal Studios Japan, Area by Area"
          intro="Rooms and prices change by date, so each area links to Klook's hotel search for it."
          areas={usjStayAreas}
        />

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>When Should I Book USJ Hotels?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            As soon as your park date is fixed. Hotel Universal Port and Vita take bookings up to a year ahead, and
            The Park Front Hotel opens online bookings six months ahead. Fix the hotel and the date-priced Studio
            Pass together, so neither leaves you with a room and no ticket or the other way round.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "When bookings open", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={thStyle}>{row.what}</td>
                      <td style={thStyle}>{row.opens}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://universalport.orixhotelsandresorts.com/news/news-19412/" target="_blank" rel="noopener">universalport.orixhotelsandresorts.com</a>,{" "}
            <a href="https://parkfront-hotel.com/faq/" target="_blank" rel="noopener">parkfront-hotel.com/faq/</a>.
            Check the cancellation terms on the listing before paying — park dates move with weather and plans.
          </p>
        </section>

        {/* Airport */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get From Kansai Airport to the USJ Hotels?</h2>
          <p className={styles.bodyText}>
            By the airport limousine bus: about <strong>50 to 70 minutes</strong> from Terminal 1 to Universal
            Studios Japan, <strong>¥1,800</strong> adult and ¥900 child one way, or ¥3,300 return within 14 days. It
            takes no reservations — first come, first served. By train it is about 65 minutes with a change at
            Nishikujo. Read on kate.co.jp and usj.co.jp, {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kansaiAirportLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kansai Airport limousine bus →
            </KlookLink>
          </div>
        </section>

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Which USJ Hotel Is Best With Kids?</h2>
          <p className={styles.bodyText}>
            One a few minutes from the gates, so a midday nap in the room is realistic. Hotel Kintetsu Universal City
            and Hotel Universal Port have USJ collaboration rooms and a Universal Studios Store inside, on USJ&apos;s
            own perk list; The Park Front Hotel is the shortest walk.
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
          heading="USJ Official Hotels on Klook"
          intro="Five of the seven Official Hotels have their own Klook page. Open one for the price and rooms on your dates."
          tours={[
            parkFrontHotelUsjKlook,
            hotelKintetsuUniversalCityKlook,
            hotelKeihanUniversalTowerKlook,
            hotelUniversalPortKlook,
            hotelUniversalPortVitaKlook,
          ]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/usj-tickets-express-pass", title: "Universal Studios Japan Express Pass 2026: Types, Prices & Is It Worth It" },
              { href: "/guides/attractions/where-to-stay-in-osaka", title: "Where to Stay in Osaka 2026: Namba vs Umeda vs USJ" },
              { href: "/guides/attractions/osaka-3-day-itinerary", title: "Osaka 3 Day Itinerary (2026): Day by Day, and What to Book" },
              { href: "/guides/attractions/tokyo-disney-hotels", title: "Tokyo Disney Hotels (2026): Closest, Official & Budget" },
              { href: "/guides/transport/osaka-airport-transfer", title: "Osaka Airport Transfer: Kansai Airport to the City" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                    <path d="M9 21v-6h6v6" />
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
            <h2 className={styles.ctaBannerTitle}>A few minutes from the gates</h2>
            <p className={styles.ctaBannerDesc}>
              Book the room and the Studio Pass for the same date, as soon as the date is fixed.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={usjStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Hotels Near USJ →
              </KlookLink>
              <KlookLink href={parkFrontHotelUsjKlook.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                The Park Front Hotel →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
