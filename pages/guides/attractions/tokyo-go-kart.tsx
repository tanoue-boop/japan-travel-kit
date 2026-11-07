import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  akihabaraGoKartTour,
  klookEsim,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026).
const GOKART_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304902&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F116875-shibuya-go-karting-experience-by-akiba-kart-shibuya%2F";

// Every yen figure, course and rule below is read from the operator's own pages on the date in
// CHECKED: streetkart.com, streetkart.tokyo and akiba-kart.com, all signed "Street Kart Tour".
// Licence rules are cross-checked with the National Police Agency and JAF. Klook prices are never
// quoted: Klook answers automated reads of its product pages with HTTP 403. The age and height
// lines come from Klook's search-indexed listing text, because the operator's pages state neither.
const CHECKED = "7 November 2026";

// "From" prices per person in the November 2026 tab of each shop's price table.
const priceRows = [
  { shop: "Asakusa (Samurai-S)", route: "Around Asakusa", time: "45 min to 1 hour", day: "¥5,000", evening: "¥6,000", regular: "¥12,000" },
  { shop: "Akihabara #1 (A1-S)", route: "Akihabara's main streets", time: "About 1 hour", day: "¥9,000", evening: "¥12,000", regular: "¥15,000" },
  { shop: "Akihabara #2 (A2-S)", route: "Akihabara, Tokyo Station, Ginza", time: "About 1 hour", day: "¥9,000", evening: "Not listed", regular: "¥15,000" },
  { shop: "Akihabara #2 (A2-M)", route: "Imperial Palace area, Harajuku, Shibuya Crossing", time: "1.5 to 2 hours", day: "¥12,000", evening: "¥17,500", regular: "¥20,000" },
  { shop: "Shinagawa (S-S)", route: "Shinagawa to Tokyo Tower", time: "About 1 hour", day: "¥14,000", evening: "¥16,000", regular: "¥20,000" },
  { shop: "Shibuya (H-S)", route: "Shibuya Crossing, Harajuku, Omotesando", time: "About 1 hour", day: "¥16,000", evening: "¥18,000", regular: "¥20,000" },
  { shop: "Shibuya Annex (H2-S)", route: "Dogenzaka, Shibuya Crossing, Omotesando, Harajuku", time: "About 1 hour", day: "¥16,000", evening: "¥18,000", regular: "¥20,000" },
  { shop: "Tokyo Bay (K-M)", route: "Rainbow Bridge and Tokyo Tower", time: "1.5 to 2 hours", day: "¥14,000", evening: "¥22,000", regular: "¥25,000" },
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

const requirementRows = [
  {
    group: "Most countries (1949 Geneva IDP)",
    need: "Your home driver's licence + a paper-booklet International Driving Permit issued under the 1949 Geneva Convention + your passport — all originals",
    drive: "Yes",
  },
  {
    group: "Switzerland, Germany, France, Taiwan, Belgium, Monaco",
    need: "Your home driver's licence + an authorised Japanese translation + your passport. JAF charges ¥6,000 plus ¥20 a page to print, and takes applications only from inside Japan",
    drive: "Yes, for one year from entering Japan",
  },
  {
    group: "Countries outside the 1949 Geneva list (Mexico, Kuwait, Saudi Arabia, China, Indonesia, etc.)",
    need: "These countries are not on the operator's list of 1949 Geneva signatories, so an IDP from them is not valid in Japan",
    drive: "No, unless you hold a Japanese licence",
  },
  {
    group: "US military personnel",
    need: "SOFA (USFJ 4EJ) or military driving licence + US state licence + DoD or military ID",
    drive: "Yes (with valid SOFA documents)",
  },
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
    desc: `Klook's listings set a minimum age of 18, and your licence must be recognised in Japan for driving (a 1949 Geneva IDP, or the translation route for the listed countries). Moped and motorbike licences do not count. Street Kart also invites you to send photos of your documents after booking so it can check them in advance. Its karts are single-seat, so there is no passenger option. Checked ${CHECKED}.`,
  },
  {
    title: "Book ahead, then arrive early for the briefing",
    desc: `Reserve your slot online and choose a route. Street Kart asks you to reach the shop 30 minutes before your slot for the document check and briefing, and late arrivals cannot join. Remember Japan drives on the LEFT. Tours are guide-led, so you follow a lead driver the whole way. Details as listed on ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "Do I need an International Driving Permit to drive a street go-kart in Tokyo?",
    a: "Yes — for most visitors it is mandatory. To drive on Tokyo's public roads you must carry a valid International Driving Permit (IDP) issued under the 1949 Geneva Convention, together with your physical home-country driver's licence and your passport. All three must be originals. Crucially, the IDP can only be obtained in your home country before you travel — it cannot be issued in Japan, so arrange it well in advance.",
  },
  {
    q: "Can I drive without an IDP?",
    a: "No, not on the standard basis. Without a valid 1949 Geneva IDP (or, for certain countries, an official Japanese translation of your licence) you are not legally permitted to drive on Japanese roads, and operators will not let you take the wheel. Drivers from Switzerland, Germany, France, Taiwan, Belgium and Monaco need an authorised Japanese translation instead of the usual IDP. US military personnel can use SOFA-based documentation. If you have none of these, you cannot drive, and Street Kart's single-seat karts have no passenger option.",
  },
  {
    q: "What is the minimum age to drive?",
    a: "Klook's listings and its go-kart guide set the minimum at 18, and you also need a valid driver's licence. Street Kart's own pages state the licence rule rather than an age, so a younger driver with no valid licence cannot take part.",
  },
  {
    q: "Are these the costumed karts I've seen online?",
    a: "These are street go-kart tours. They are not affiliated with, sponsored by, or endorsed by any video game, character, or entertainment brand, and any costumes provided are generic. It's simply a chance to drive a small, street-legal kart along public roads in central Tokyo as part of a guided tour.",
  },
  {
    q: "Which documents do I need to bring on the day?",
    a: "Bring three originals: (1) your physical home-country driver's licence, (2) your International Driving Permit under the 1949 Geneva Convention — or, for Switzerland, Germany, France, Taiwan, Belgium and Monaco, an authorised Japanese translation — and (3) your passport. US military personnel should bring their SOFA-based driving documentation. Photocopies and phone photos are not accepted.",
  },
  {
    q: "Is it safe, and which side of the road do you drive on?",
    a: "These are street-legal karts driven on real public roads, so it isn't a closed track — Japan drives on the LEFT, and you'll be in live traffic. Tours are guide-led: you follow a lead driver along a planned route, after a safety briefing. Drive carefully, obey traffic rules and your guide's instructions, and treat it as real driving rather than an amusement-park ride.",
  },
  {
    q: "Does a 1968 Vienna Convention IDP work in Japan?",
    a: "No. JAF states that only IDPs issued under the 1949 Geneva Convention are valid in Japan, and that IDPs under other treaties, such as the 1968 Vienna Convention, are not. Street Kart adds that most valid IDPs show 1949 on the cover, and asks you to contact it first if yours shows 1968.",
  },
  {
    q: "Can a passenger ride with me in a Tokyo go kart?",
    a: "No, not on a Street Kart tour. The operator says it has no karts for more than one person, and its terms bar anyone else from driving or riding your kart unless the shop or guide says so. Everyone in your group needs their own booking and their own documents.",
  },
  {
    q: "How early should I arrive, and what happens if I am late?",
    a: "Street Kart asks you to reach the shop 30 minutes before your reservation, and says that late arrivals cannot join. It has no parking and advises against coming by car or Uber because of traffic, so take public transport and leave a margin.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-go-kart") } });

export default function TokyoGoKartPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Tokyo Go Kart 2026: Price, IDP Rules and Which Tour to Book</title>
        <meta
          name="description"
          content="Tokyo go kart price in 2026: about ¥5,000 to ¥25,000 on the operator's own tables, plus the IDP rules by country, rain policy and which tour to book."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-go-kart" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Go Kart 2026: Price, IDP Rules and Which Tour to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-go-kart" />
        <meta property="og:description" content="Tokyo go kart price in 2026: about ¥5,000 to ¥25,000 on the operator's own tables, plus the IDP rules by country, rain policy and which tour to book." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Go Kart 2026: Price, IDP Rules and Which Tour to Book" />
        <meta name="twitter:description" content="Tokyo go kart price in 2026: about ¥5,000 to ¥25,000 on the operator's own tables, plus the IDP rules by country, rain policy and which tour to book." />
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
              headline: "Tokyo Go Kart 2026: Price, IDP Rules and Which Tour to Book",
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
            Tokyo Go Kart 2026:<br />Price, IDP Rules and Which Tour to Book
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
            A Tokyo go kart tour is a guided convoy on public roads, starting from a shop in Shibuya,
            Akihabara, Shinagawa, Asakusa or Tokyo Bay. It lasts about an hour, or up to two on the longer
            courses, and costs about ¥5,000 to ¥25,000 per person on Street Kart&apos;s own price tables for
            November 2026, with most one-hour central courses between ¥9,000 and ¥20,000. To drive you need
            your home licence, a 1949 Geneva Convention International Driving Permit (IDP) and your passport;
            licences from Switzerland, Germany, France, Belgium, Monaco and Taiwan take an authorised
            Japanese translation instead of the IDP. If you arrive without the original documents you cannot
            join, and you get no refund. Checked {CHECKED}.
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
            <KlookLink href={GOKART_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Tokyo Street Go-Kart →
            </KlookLink>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is a Tokyo go kart tour?</h2>
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
          <h2 className={styles.sectionTitle}>How much is a go kart tour in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            A Tokyo go kart tour costs about ¥5,000 to ¥25,000 per person on Street Kart&apos;s November 2026
            tables, and the shop, the course and the time of day set the price. Evening slots cost more than
            daytime slots at every shop below that lists both.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shop and course", "Route", "Course length", "Daytime, from", "Evening, from", "Regular price, from"].map((h) => (
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
            Regular Price is for guests who ask to keep their visit confidential.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Booking through Klook has its own price, so open the listing to see the figure for your date. For
            comparison, Street Kart&apos;s Osaka shop lists about an hour from ¥7,000 in the same month, and it
            also has a shop in Okinawa.
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
          <h2 className={styles.sectionTitle}>Which Tokyo go kart course should I book: Shibuya or Akihabara?</h2>
          <p className={styles.bodyText}>
            Book Shibuya if driving through Shibuya Crossing is the point, and book Akihabara if you would
            rather pay less. In the November tables a Shibuya course starts at ¥16,000, against ¥9,000 for a
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
            <KlookLink href={shibuyaAnnexGoKartTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Shibuya Annex tour →
            </KlookLink>
            <KlookLink href={akihabaraGoKartTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Akihabara tour →
            </KlookLink>
          </div>
        </section>

        {/* Requirements table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Eligibility</span>
          <h2 className={styles.sectionTitle}>Can I drive a go kart in Tokyo with my licence?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Because these karts run on public roads, you must hold a licence Japan recognises for driving.
            The single most important rule: an International Driving Permit under the 1949 Geneva Convention
            must be obtained in your <strong>home country before you travel</strong> — it cannot be issued in
            Japan. Use the table below to find your situation.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your situation", "What you need", "Can you drive?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requirementRows.map((row) => (
                    <tr key={row.group}>
                      <td className={styles.tdProvider}>{row.group}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.need}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.drive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From the National Police Agency, JAF and Street Kart&apos;s licence page, checked {CHECKED}. An IDP
            or foreign licence is valid in Japan for one year from entry or until it expires, whichever comes
            first, and an IDP itself lasts one year from issue. Rules can change, so confirm your nationality
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
            Checked {CHECKED}. Klook wording read from its search-indexed listing text.
          </p>
        </section>

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather</span>
          <h2 className={styles.sectionTitle}>Do Tokyo go kart tours run in the rain?</h2>
          <p className={styles.bodyText}>
            Usually yes. Street Kart says it normally goes ahead despite the weather and asks you to contact
            the shop if you are unsure, though its terms also let it suspend, cancel or change a tour.
          </p>
          <p className={styles.bodyText}>
            On a direct booking you can cancel free up to 7 days before your activity, Japan time. Inside
            those 6 days the operator&apos;s cancellation policy applies, so read it before you pay, and changes
            depend on availability. A Klook booking follows the terms on the Klook listing. Checked {CHECKED}.
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
            <KlookLink href={shibuyaAnnexGoKartTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Book the Shibuya Annex tour on Klook →
            </KlookLink>
            <KlookLink href={akihabaraGoKartTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
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
            <KlookLink href={GOKART_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Tokyo Street Go-Kart →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
