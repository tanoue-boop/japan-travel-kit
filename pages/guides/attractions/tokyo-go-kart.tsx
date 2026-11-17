import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  akihabaraGoKartTour,
  asakusaGoKartTour,
  asakusaSensojiWalkingTour,
  klookEsim,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoBayGoKartTour,
  tokyoGoKartingListUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026).
const GOKART_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304902&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F116875-shibuya-go-karting-experience-by-akiba-kart-shibuya%2F";

// Every yen figure, course and rule below is read from the operator's own pages on the date in
// CHECKED: streetkart.com, streetkart.tokyo and akiba-kart.com, all signed "Street Kart Tour".
// Licence rules are cross-checked with the National Police Agency and JAF. Klook prices are never
// quoted: Klook answers automated reads of its product pages with HTTP 403. The age and height
// lines come from Klook's search-indexed listing text, because the operator's pages state neither.
// Prices, courses and the licence page re-read on the operator's pages on 15 November 2026
// (the November tab was unchanged from 7 November). The NPA one-year rule was read on 7 November.
const CHECKED = "15 November 2026";
const CHECKED_ISO = "2026-11-15";

// "From" prices per person in the November 2026 tab of each shop's price table. The first row
// is the pick for a reader who has not decided. `book` is the Klook listing for that start point.
const priceRows = [
  { shop: "Pick if unsure: Shibuya Annex (H2-S)", route: "Dogenzaka, Shibuya Crossing, Omotesando, Harajuku", time: "About 1 hour", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: shibuyaAnnexGoKartTour.url, bookLabel: "Shibuya Annex on Klook" },
  { shop: "Shibuya (H-S)", route: "Shibuya Crossing, Harajuku, Omotesando", time: "About 1 hour", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: GOKART_URL, bookLabel: "Shibuya on Klook" },
  { shop: "Akihabara #1 (A1-S)", route: "Akihabara's main streets", time: "About 1 hour", day: "¥9,000", evening: "¥12,000", regular: "¥15,000", book: akihabaraGoKartTour.url, bookLabel: "Akihabara on Klook" },
  { shop: "Akihabara #2 (A2-S)", route: "Akihabara, Tokyo Station, Ginza", time: "About 1 hour", day: "¥9,000", evening: "Not listed", regular: "¥15,000", book: akihabaraGoKartTour.url, bookLabel: "Akihabara on Klook" },
  { shop: "Akihabara #2 (A2-M)", route: "Imperial Palace area, Harajuku, Shibuya Crossing", time: "1.5 to 2 hours", day: "¥12,000", evening: "¥17,500", regular: "¥20,000", book: akihabaraGoKartTour.url, bookLabel: "Akihabara on Klook" },
  { shop: "Tokyo Bay (K-M)", route: "Rainbow Bridge and Tokyo Tower", time: "1.5 to 2 hours", day: "¥14,000", evening: "¥22,000", regular: "¥25,000", book: tokyoBayGoKartTour.url, bookLabel: "Tokyo Bay on Klook" },
  { shop: "Shinagawa (S-S)", route: "Shinagawa to Tokyo Tower", time: "About 1 hour", day: "¥14,000", evening: "¥16,000", regular: "¥20,000", book: tokyoGoKartingListUrl, bookLabel: "Tokyo go-karts on Klook" },
  { shop: "Asakusa (Samurai-S)", route: "Around Asakusa", time: "45 min to 1 hour", day: "¥5,000", evening: "¥6,000", regular: "¥12,000", book: asakusaGoKartTour.url, bookLabel: "Asakusa on Klook" },
];

// Licence quick check. Street Kart's licence page and JAF read on 15 November 2026.
const licenceRows = [
  { doc: "Answer for most visitors: paper IDP under the 1949 Geneva Convention + home licence + passport", drive: "Yes", note: "Booklet only, issued in your home country before you fly. Card-type, digital and single-sheet IDPs and photocopies are not valid" },
  { doc: "IDP under the 1968 Vienna Convention only", drive: "No", note: "JAF: only 1949 Geneva IDPs are valid in Japan. Street Kart asks you to contact it first if your cover says 1968" },
  { doc: "Japanese driver's licence", drive: "Yes", note: "Listed first on Street Kart's licence page. Moped and motorbike licences do not count" },
  { doc: "Licence from Switzerland, Germany, France, Taiwan, Belgium or Monaco + authorised Japanese translation", drive: "Yes", note: "The translation replaces the IDP. JAF takes applications online from inside Japan only" },
  { doc: "SOFA licence (US Forces Japan)", drive: "Yes", note: "Listed on Street Kart's licence page" },
  { doc: "No licence, or a licence from a country outside the 1949 Geneva list", drive: "No", note: "There is no passenger seat, and the shop cannot issue any document on the day" },
];

const includedRows = [
  { item: "Lead guide and kart", status: "Included", note: "A safety briefing comes first, and one guide takes up to 6 drivers" },
  { item: "Fuel", status: "Included", note: "Tour customers do not refill the tank" },
  { item: "Standard insurance", status: "Included", note: "Limits: ¥80,000,000 bodily injury to others, ¥20,000,000 property, ¥5,000,000 driver injury" },
  { item: "Kart damage deductible", status: "Not included", note: "¥50,000 per vehicle, billed right after the tour if the kart is damaged" },
  { item: "Full coverage insurance", status: "Optional extra", note: "Removes the limits on other people, property and the kart, and raises driver injury to ¥30,000,000" },
  { item: "Costume", status: "Check your booking", note: "You choose one at check-in, and costumes are also listed under rental and sale" },
  { item: "Action camera", status: "Optional extra", note: "Rented at the shop, or bring your own" },
  { item: "IDP or translation", status: "Not included", note: "You arrange it yourself, and the shop cannot issue either" },
];

const fitRows = [
  { rule: "Minimum age", value: "18", source: "Klook's Akihabara listing and Klook's go-kart guide" },
  { rule: "Height", value: "150–185 cm on Klook's Akihabara listing, 150–190 cm on its Akiba Kart Shibuya listing", source: "Klook listings" },
  { rule: "Weight", value: "Under 100 kg", source: "Klook's Akihabara listing" },
  { rule: "Driving skill", value: "Automatic karts, and you must have enough skill to drive on public roads", source: "Street Kart FAQ and terms" },
  { rule: "Clothing", value: "No heels, sandals or long skirts", source: "Street Kart shop pages" },
];

const startRows = [
  { shop: "Akihabara #1", address: "4-12-9 Sotokanda, Chiyoda", access: "Suehirocho Station Exit 1, 3 min; JR Akihabara, 7 min" },
  { shop: "Akihabara #2", address: "4-16-7 Kanda Sakumacho, Chiyoda", access: "JR Akihabara (Showa-Dori Entrance), 8 min" },
  { shop: "Shibuya", address: "15-3 Maruyamacho, Shibuya", access: "Keio Inokashira Line Shinsen Station, 3 min; JR Shibuya, 15 min" },
  { shop: "Shibuya Annex", address: "The City Shibuya 2F, 10-11 Maruyamacho", access: "Keio Inokashira Line Shinsen Station, 5 min; JR Shibuya, 15 min" },
  { shop: "Shinagawa", address: "1-23-15 Kitashinagawa, Shinagawa", access: "Keikyu Kita-Shinagawa Station, 5 min; JR Shinagawa, 15 min" },
  { shop: "Asakusa", address: "3-25-31 Nishiasakusa, Taito", access: "Tokyo Metro Asakusa Station, 8 min" },
  { shop: "Tokyo Bay", address: "2-10-8 Shinkiba, Koto", access: "Shinkiba Station, 10 to 13 min" },
];

const whoFor = [
  {
    title: "Confident, fully licensed drivers",
    desc: "You hold a valid full driver's licence at home, you're comfortable on real roads, and you've sorted an International Driving Permit before flying. This is built for licensed adults — not a theme-park ride.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h2l1-3h12l1 3h2" />
        <path d="M5 12v5h14v-5" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Sightseers who want a different angle",
    desc: "You want to see landmarks like Tokyo Tower, Odaiba and the Rainbow Bridge area from street level, open-air, with the wind in your face. Popular routes are scenic and guide-led, so you simply follow the lead driver.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Not for you if you can't drive in Japan",
    desc: "If you're under 18, don't hold a licence, or come from a country whose licence Japan won't recognise for this permit basis, you cannot legally drive these karts. There's no on-the-spot fix at the shop, so sort your documents before you book.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Get your International Driving Permit at home — before you fly",
    desc: "An IDP under the 1949 Geneva Convention can only be issued in your home country, and never in Japan. It must be the paper booklet: card-type, digital and single-sheet IDPs are not valid, and sellers of fake IDPs operate online. If you're from Switzerland, Germany, France, Taiwan, Belgium or Monaco, you need an authorised Japanese translation instead. JAF accepts those applications only online from inside Japan and averages 2 to 3 business days, so allow for that at the start of your trip, or ask your embassy or consulate in Japan.",
  },
  {
    title: "Pack the three originals: IDP, home licence and passport",
    desc: "You must carry all originals on the day — your physical home-country driver's licence, your IDP (or JAF/embassy translation), and your passport. Photocopies, phone photos and digital licences are not accepted, and arriving without the originals means no tour and no refund.",
  },
  {
    title: "Confirm you meet the eligibility rules",
    desc: `Klook's listings set a minimum age of 18, and your licence must be recognised in Japan for driving (a 1949 Geneva IDP, or the translation route for the listed countries). Moped and motorbike licences do not count. Street Kart also invites you to send photos of your documents after booking so it can check them in advance. Its karts are single-seat, so there is no passenger option. Street Kart rules checked ${CHECKED}; the Klook age limit read 7 November 2026.`,
  },
  {
    title: "Book ahead, then arrive early for the briefing",
    desc: `Reserve your slot online and choose a route. Street Kart asks you to reach the shop 30 minutes before your slot for the document check and briefing, and late arrivals cannot join. Remember Japan drives on the LEFT. Tours are guide-led, so you follow a lead driver the whole way. Details as listed on ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "Do you need a license for go-karting in Tokyo?",
    a: "Yes. Street karting in Tokyo is on public roads, so you need a Japanese licence, or your home licence plus a paper International Driving Permit issued under the 1949 Geneva Convention and your passport, all as originals. Licences from Switzerland, Germany, France, Taiwan, Belgium and Monaco take an authorised Japanese translation instead of the IDP. The IDP can only be issued in your home country before you travel.",
  },
  {
    q: "How much is street go-karting in Tokyo?",
    a: `Street Kart's official November 2026 tables start at ¥5,000 per person for a 45-minute to 1-hour Asakusa course, ¥9,000 in Akihabara and ¥16,000 in Shibuya, and at ¥12,000 to ¥14,000 for the 1.5 to 2-hour Akihabara and Tokyo Bay courses. Regular prices run up to ¥25,000. Checked ${CHECKED}.`,
  },
  {
    q: "Does a 1968 Vienna Convention IDP work in Japan?",
    a: "No. JAF states that only IDPs issued under the 1949 Geneva Convention are valid in Japan, and that IDPs under other treaties, such as the 1968 Vienna Convention, are not. Street Kart adds that most valid IDPs show 1949 on the cover, and asks you to contact it first if yours shows 1968.",
  },
  {
    q: "Can you go-kart in Tokyo in the rain or winter?",
    a: "Yes, as a rule. Street Kart says it usually runs its tours despite the weather and asks you to contact the shop if you are unsure, and every Tokyo shop's price table lists slots in all 12 months, including December to February. Its terms still let it suspend, cancel or change a tour.",
  },
  {
    q: "Is street karting in Tokyo safe and legal?",
    a: "It is legal when you hold a licence valid in Japan: Street Kart's karts are built for Japanese public roads, and the operator turns away drivers without the right documents. It is real traffic on the left-hand side, guide-led with up to 6 drivers per guide, with standard insurance included and no expressways on the courses.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-go-kart") } });

export default function TokyoGoKartPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Tokyo Go Kart 2026: Street Karting in Japan, Price & IDP</title>
        <meta
          name="description"
          content="Street karting in Japan: a Tokyo go kart costs ¥5,000–¥25,000 a person on official tables. You need a 1949 Geneva IDP, licence and passport. Book on Klook."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-go-kart" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Go Kart 2026: Street Karting in Japan, Price & IDP" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-go-kart" />
        <meta property="og:description" content="Street karting in Japan: a Tokyo go kart costs ¥5,000–¥25,000 a person on official tables. You need a 1949 Geneva IDP, licence and passport. Book on Klook." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Go Kart 2026: Street Karting in Japan, Price & IDP" />
        <meta name="twitter:description" content="Street karting in Japan: a Tokyo go kart costs ¥5,000–¥25,000 a person on official tables. You need a 1949 Geneva IDP, licence and passport. Book on Klook." />
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
              route: "/guides/attractions/tokyo-go-kart",
              headline: "Tokyo Go Kart 2026: Street Karting in Japan, Price & IDP",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Go Kart", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-go-kart" },
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
          <span className={styles.breadCurrent}>Tokyo Go Kart</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Go Kart 2026:<br />Street Karting in Japan, Price &amp; IDP
          </h1>
          <p className={styles.heroSubtitle}>
            Drive a street-legal go-kart through central Tokyo past landmarks like Tokyo Tower and the
            Rainbow Bridge area. The catch: you need the right driving documents, and an IDP can only be issued at home, before you fly.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "IDP Required", "Ages 18+"].map((t) => (
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

        {/* The answer */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            To drive a go kart in Tokyo you need a Japanese licence, or your home licence plus a paper
            International Driving Permit (IDP) issued under the 1949 Geneva Convention and your passport; an IDP
            under the 1968 Vienna Convention alone is not accepted. Street Kart&apos;s official November 2026
            tables price a one-hour course from ¥5,000 (Asakusa), ¥9,000 (Akihabara) or ¥16,000 (Shibuya) per
            person, and a 1.5 to 2-hour course from ¥12,000 (Akihabara) or ¥14,000 (Tokyo Bay, over the Rainbow
            Bridge), with regular prices up to ¥25,000. Tours start from shops in Shibuya, Akihabara, Asakusa,
            Shinagawa and Tokyo Bay (Shinkiba), and a driver without the original documents cannot join and gets
            no refund. Checked {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shibuyaAnnexGoKartTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Shibuya go kart on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price per person</p>
                <p className={styles.verdictStatValue}>About ¥5,000 to ¥25,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tour length</p>
                <p className={styles.verdictStatValue}>45 min to 2 hours, guide-led</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>To drive you need</p>
                <p className={styles.verdictStatValue}>IDP + home licence + passport</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Get the IDP</p>
                <p className={styles.verdictStatValue}>At home, before you fly</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the booking is the easy part. The thing that stops most people is a
              document. An IDP can <em>only</em> be issued in your own country before you fly, there is no way
              to get one in Japan, and there is no on-the-spot workaround at the shop. Sort that first;
              everything else is detail.
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Tokyo Street Go-Kart →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is street karting in Japan, and how does a Tokyo go kart tour work?</h2>
          <p className={styles.bodyText}>
            A Tokyo street go-kart tour lets you drive a small, street-legal kart along the city&apos;s public
            roads as part of a guided convoy. Popular routes weave past well-known sights — areas around the
            Rainbow Bridge, Tokyo Tower, Odaiba and Shibuya feature on many itineraries — giving you an
            open-air, ground-level view of the city you simply don&apos;t get from a train or bus. Generic
            costumes are usually available to wear during the tour.
          </p>
          <p className={styles.bodyText}>
            One important point up front: this is a <strong>generic street go-kart experience</strong>. It is{" "}
            <strong>not affiliated with, sponsored by, or endorsed by any video game, character, or
            entertainment brand</strong>, and the costumes offered are generic. The real appeal is the driving
            itself — and that&apos;s exactly why the paperwork matters so much.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How much is street go-karting in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Street go-karting in Tokyo costs about ¥5,000 to ¥25,000 per person on Street Kart&apos;s November
            2026 tables, and the start point, the course and the time of day set the price. If you are unsure,
            book the Shibuya Annex hour: it is the one-hour course that drives through Shibuya Crossing,
            Omotesando and Harajuku. Evening slots cost more than daytime slots at every shop below that lists
            both.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Start point and course", "Main sights on the route", "Course length", "Daytime, from", "Evening, from", "Regular price, from", "Book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.shop}>
                      <td className={styles.tdProvider}>{row.shop}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.day}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.evening}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.regular}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.book} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--red)", fontWeight: 600 }}>
                          {row.bookLabel} →
                        </KlookLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Lowest listed prices per person from the November 2026 tab of each shop&apos;s official price table,
            checked {CHECKED}. Prices change by month and slot, and the operator&apos;s booking calendar has the
            figure for your date. Daytime and evening columns show the Review Price, which online booking
            applies automatically. Under the operator&apos;s terms it does not depend on posting a review; the
            Regular Price is for guests who ask to keep their visit confidential. The Book column opens the
            Klook listing for that start point, which has its own price; Shinagawa has no listing of its own,
            so that link opens Klook&apos;s Tokyo go-karting list.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO}. Official sources:{" "}
            <a href="https://akiba-kart.com/en/shibuya2.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Shibuya Annex</a>,{" "}
            <a href="https://akiba-kart.com/en/shibuya.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Shibuya</a>,{" "}
            <a href="https://streetkart.tokyo/en/akihabara.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Akihabara #1</a>,{" "}
            <a href="https://streetkart.tokyo/en/akihabara2.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Akihabara #2</a>,{" "}
            <a href="https://streetkart.com/en/tokyobay.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Tokyo Bay</a>,{" "}
            <a href="https://streetkart.com/en/shinagawa.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Shinagawa</a>,{" "}
            <a href="https://streetkart.com/en/asakusa.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Asakusa</a>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Booking through Klook has its own price, so open the listing to see the figure for your date. For
            comparison, Street Kart&apos;s Osaka shop lists about an hour from ¥7,000 in the same month, and it
            also has a shop in Okinawa. You can drive in Osaka on the same documents; the{" "}
            <Link href="/guides/attractions/osaka-go-kart" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka go kart guide
            </Link>{" "}
            compares the routes through Dotonbori and Namba.
          </p>
        </section>

        {/* What's included */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What you pay for</span>
          <h2 className={styles.sectionTitle}>What is included in a Tokyo go kart tour?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            The tour fee covers the kart, the guide and standard insurance, but it leaves you liable for a
            ¥50,000 deductible if the kart is damaged. Your IDP or translation is always your own cost.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Status", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {includedRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.status}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From Street Kart&apos;s FAQ, shop pages and terms, checked {CHECKED}. If you book on Klook, the
            listing&apos;s own inclusions apply.
          </p>
        </section>

        {/* Course choice */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Choosing</span>
          <h2 className={styles.sectionTitle}>Which go-kart route in Tokyo is best (Shibuya, Akihabara or Tokyo Bay)?</h2>
          <p className={styles.bodyText}>
            Book Shibuya if driving through Shibuya Crossing is the point, Akihabara if you would rather pay
            less, and Tokyo Bay if you want the Rainbow Bridge and have 1.5 to 2 hours. In the November tables a Shibuya course starts at ¥16,000, against ¥9,000 for a
            one-hour Akihabara course. The Akihabara #2 shop&apos;s one-hour route also takes in Tokyo Station
            and Ginza.
          </p>
          <p className={styles.bodyText}>
            The other courses answer narrower wishes. The Shinagawa route heads for Tokyo Tower, the Tokyo Bay
            route is the one that crosses the Rainbow Bridge, and Akihabara #2&apos;s longer A2-M course reaches
            Shibuya Crossing by way of the Imperial Palace area and Harajuku. If you are staying around the
            electric town anyway, pair the drive with our{" "}
            <Link href="/guides/attractions/akihabara-anime-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Akihabara anime tour guide
            </Link>
            .
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shibuyaAnnexGoKartTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Shibuya Annex tour →
            </KlookLink>
            <KlookLink href={akihabaraGoKartTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Akihabara tour →
            </KlookLink>
            <KlookLink href={tokyoBayGoKartTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Tokyo Bay tour →
            </KlookLink>
          </div>
        </section>

        {/* Requirements table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Eligibility</span>
          <h2 className={styles.sectionTitle}>Do you need a license for go-karting in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Yes: street karting in Japan is on public roads, so you need a licence Japan recognises for driving,
            and there is no passenger seat for anyone without one. The single most important rule: an International Driving Permit under the 1949 Geneva Convention
            must be obtained in your <strong>home country before you travel</strong> — it cannot be issued in
            Japan. Use the table below to find your situation.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What you hold", "Can you drive?", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {licenceRows.map((row) => (
                    <tr key={row.doc}>
                      <td className={styles.tdProvider}>{row.doc}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.drive}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} (Street Kart&apos;s licence page and JAF). An IDP or foreign licence is
            valid in Japan for one year from entry or until it expires, whichever comes first, and an IDP itself
            lasts one year from issue (National Police Agency, read 7 November 2026). Official sources:{" "}
            <a href="https://akiba-kart.com/en/license_shibuya.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Street Kart licence page</a>,{" "}
            <a href="https://english.jaf.or.jp/driving-in-japan/drive-in-japan/switch-to-japanese-license" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>JAF</a>. Rules can change, so confirm your nationality
            with the operator before booking. All documents must be carried as originals on the day.
          </p>
        </section>

        {/* Without an IDP */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>No IDP</span>
          <h2 className={styles.sectionTitle}>Can you go karting in Tokyo without an international driving permit?</h2>
          <p className={styles.bodyText}>
            Only if you hold another document that is valid on Japanese roads: a Japanese licence, a SOFA
            licence, or a licence from one of the six listed places with an authorised Japanese translation.
            Without one of those you cannot drive, the shop cannot fix it on the day, and you get no refund.
          </p>
          <p className={styles.bodyText}>
            The translation route is the one that catches people out, because JAF does not take applications
            from outside Japan. It takes them online from inside Japan, charges ¥6,000 plus ¥20 a page to print,
            and averages 2 to 3 business days for these six licences. If you use JAF, landing the day before
            the tour leaves too little time, so book the kart for later in the trip.
          </p>
          <div className={styles.verdictBox} style={{ marginTop: "1.25rem" }}>
            <div className={styles.verdictBody}>
              <p className={styles.verdictText}>
                <strong>No IDP? Book one of these instead.</strong> The same streets without a licence: a guided
                coach loop of the Imperial Palace gardens, Asakusa and Tokyo Skytree, a three-hour join-in food
                walk through Shinjuku after dark, or a guided half-day walk around Senso-ji.
              </p>
              <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
                <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                  Check the Tokyo bus day tour →
                </KlookLink>
                <KlookLink href={shinjukuNightFoodWalkingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                  Check the Shinjuku night food walk →
                </KlookLink>
                <KlookLink href={asakusaSensojiWalkingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                  Check the Asakusa walking tour →
                </KlookLink>
              </div>
            </div>
          </div>
        </section>

        {/* Fit rules */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Limits</span>
          <h2 className={styles.sectionTitle}>Are there age and height limits for Tokyo go karts?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Yes: Klook&apos;s listings set a minimum age of 18 and a height range that starts at 150 cm.
            Street Kart&apos;s own pages do not print an age or height, so check the listing you book.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Rule", "What it says", "Where it comes from"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fitRows.map((row) => (
                    <tr key={row.rule}>
                      <td className={styles.tdProvider}>{row.rule}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Checked 7 November 2026. Klook wording read from its search-indexed listing text.
          </p>
        </section>

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather</span>
          <h2 className={styles.sectionTitle}>Can you go-kart in Tokyo in the rain or winter?</h2>
          <p className={styles.bodyText}>
            Usually yes. Street Kart says it normally goes ahead despite the weather and asks you to contact
            the shop if you are unsure, though its terms also let it suspend, cancel or change a tour. Winter
            is not an off-season: every Tokyo shop&apos;s price table lists slots in all 12 months, including
            December to February, so dress for an open kart.
          </p>
          <p className={styles.bodyText}>
            On a direct booking you can cancel free up to 7 days before your activity, Japan time. Inside
            those 6 days the operator&apos;s cancellation policy applies, so read it before you pay, and changes
            depend on availability. A Klook booking follows the terms on the Klook listing. Checked {CHECKED}.
          </p>
        </section>

        {/* Safe and legal */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Safety</span>
          <h2 className={styles.sectionTitle}>Is street karting in Tokyo safe and legal?</h2>
          <p className={styles.bodyText}>
            It is legal when every driver holds a licence valid in Japan: Street Kart describes its karts as
            custom made for Japanese public roads, and it turns away anyone without the right original
            documents. It is still real traffic, on the left-hand side of the road, so treat it as driving
            rather than a ride.
          </p>
          <p className={styles.bodyText}>
            The tours are guide-led, with one guide for up to 6 drivers, after a safety briefing at the shop.
            The courses do not use expressways, standard insurance is in the fee, and the karts are single-seat,
            so nobody rides as a passenger. A damaged kart costs a ¥50,000 deductible unless you add the full
            coverage option. Checked {CHECKED}.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Who it&apos;s for</span>
          <h2 className={styles.sectionTitle}>Is a Street Go-Kart Tour Right for You?</h2>
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

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A one-hour course takes about 90 minutes once you count the 30-minute check-in, which is easy to
            slot into our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo 3 day itinerary
            </Link>{" "}
            or a wider list of{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              things to do in Tokyo
            </Link>
            . Children cannot drive and the karts are single-seat, so a family needs a plan for anyone under
            18; our{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo itinerary with kids
            </Link>{" "}
            has days that work for everyone. Would you rather spend an evening on foot? A{" "}
            <Link href="/guides/attractions/tokyo-night-food-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo night food tour
            </Link>{" "}
            needs no licence at all.
          </p>
        </section>

        {/* Document prep steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do I book a Tokyo go kart tour?</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Documents in hand?</strong> That is the moment to book, and not before, because the shop
            gives no refund for missing paperwork.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shibuyaAnnexGoKartTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Shibuya Annex tour on Klook →
            </KlookLink>
            <KlookLink href={akihabaraGoKartTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Akihabara tour on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Getting around */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Plan your day</span>
          <h2 className={styles.sectionTitle}>Where do Tokyo go kart tours start?</h2>
          <p className={styles.bodyText}>
            Street Kart tours start at the shop you book, and each shop runs its own course. Check your booking
            confirmation for the exact meeting point, and leave plenty of time to arrive
            before the briefing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shop", "Address", "Nearest stations, on foot"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {startRows.map((row) => (
                    <tr key={row.shop}>
                      <td className={styles.tdProvider}>{row.shop}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.address}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From Street Kart&apos;s shop pages, checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The shops have no parking, and the operator advises against a car or Uber because traffic can
            make you late, and late arrivals cannot join. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              where to stay in Tokyo guide
            </Link>{" "}
            compares the areas to base yourself in. If you&apos;re still getting your bearings, our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              guide to getting around Tokyo
            </Link>{" "}
            explains the train, subway and IC card basics.
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
          heading="If the Paperwork Rules You Out"
          intro="Two Tokyo tours that need nothing but a booking, plus the eSIM and subway ticket that help on any day. Open a listing for the current price on your date."
          tours={[
            tokyoSightseeingBusTour,
            shinjukuNightFoodWalkingTour,
            {
              title: klookEsim.name,
              desc: "A Japan eSIM delivered as a QR code voucher, for maps and messages throughout the trip",
              url: klookEsim.url,
            },
            tokyoSubwayTicket,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/akihabara-anime-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Akihabara Anime Tour (2026): Guided Tours, Shop Hours &amp; How to Get There</p>
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
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l9-9" />
                  <path d="M14 10l7-7" />
                  <path d="M12 12l5 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Samurai and Ninja Experience in Tokyo (2026): Which Kind to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v8a3 3 0 0 0 6 0V3" />
                  <path d="M9 11v10" />
                  <path d="M17 3c-1.5 2-2 4-2 6h4c0-2-.5-4-2-6z" />
                  <path d="M17 9v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Food Tour (2026): Which Neighbourhood, and What a Tour Adds</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to drive Tokyo?</h2>
            <p className={styles.ctaBannerDesc}>
              Book your street go-kart tour ahead, then bring your International Driving Permit, home licence
              and passport on the day. Remember: the IDP must be sorted in your home country before you fly.
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              View Tokyo Street Go-Kart →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
