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
  akibaKartOsakaGoKart,
  akibaKartShinsekaiGoKart,
  futureKartOsakaElectricGoKart,
  japanKartOsakaGoKart,
  monkeyKartOsakaCostumeTour,
  osakaGoKartTripPrep,
  osakaGoKartingListUrl,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Osaka go-kart. Added 11 Nov 2026 (task-jtk-20261111-02), the Osaka version of
 * tokyo-go-kart. The licence rules are written the same way as the Tokyo page after its
 * rank fix (e905a43): 1949 Geneva IDP, the six translation countries, the non-Geneva
 * countries and SOFA, from the National Police Agency, JAF and Street Kart, read
 * 7 Nov 2026 for that page.
 *
 * Official reads on 11 Nov 2026:
 *   streetkart.com/en/osaka.html      shop 1-14-19 Minami-Horie, Nishi-ku, about 4 min
 *                                     from Yotsubashi Station Exit 6; Osaka-S course
 *                                     Amerikamura, Shinsaibashi, Dotonbori, Namba, about
 *                                     1 hour; daytime slots from 10:30, evening slots
 *                                     16:30–19:30 plus 20:00 and 21:00 starts (vary by
 *                                     month); costume chosen at the shop; usually runs
 *                                     whatever the weather; arrive 30 min early; changes
 *                                     within 6 days fall under the cancellation policy.
 *   streetkart.com/license_osaka.html Japanese licence, 1949 Geneva IDP, SOFA, or a
 *                                     licence plus an official Japanese translation for
 *                                     Switzerland, Germany, France, Taiwan, Belgium and
 *                                     Monaco; the IDP must show category A–E with a stamp
 *                                     in section B, within one year of issue and of
 *                                     entering Japan; "1968" on the cover → contact first.
 * Klook listings (search-indexed text, 11 Nov 2026): 8590, 91213, 119916, 163321 and
 * 152539 — see the block comment in lib/klook-links.ts. Street Kart Osaka's own Klook
 * listing (112246) had no en-US page in the index, so it is described from the
 * operator's site and not linked.
 *
 * Rank fix 27 Nov 2026 (task-jtk-20261127-R13, re-run of 20261125-R05). Official reads:
 *   akiba-kart.com/en/osaka.html      redirects to osaka-go-kart.com/en/osaka.html, the
 *                                     Street Kart Osaka page (same Minami-Horie shop, signed
 *                                     "Street Kart Tour"). November and December tabs:
 *                                     10:30–16:00 ¥7,000~, 17:00–19:30 ¥7,800~, 20:00
 *                                     ¥8,500~, 21:00 ¥9,000~ ("Early Bird Review Price"),
 *                                     Standard Regular Price ¥12,000~ per person. Every
 *                                     month from January to December has a price tab.
 *   streetkart.com/en/osaka.html      same table; standard insurance included, ¥50,000
 *                                     kart-damage deductible; "usually proceed despite
 *                                     the weather".
 *   japankart.com                     "Osaka Castle 90min Tour : 10,000yen", departing
 *                                     Namba; Osaka branch 1-11-17 Shikitsunishi, Naniwa-ku;
 *                                     each tour accompanied by two staff vehicles;
 *                                     complimentary costume rental. No 2-hour Osaka course.
 *   japankart.com/driving-requirements 1949 Geneva IDP + licence + passport (originals),
 *                                     JAF translation for the six countries, SOFA 4EJ;
 *                                     1968 Vienna IDPs not accepted.
 * Minimum age 18: Klook's go-kart guide and its Street Kart Osaka / Future Kart listings
 * (search-indexed text). Monkey Kart and Future Kart have no operator site in the index,
 * so they are described from their Klook listings only.
 */

const ROUTE = "/guides/attractions/osaka-go-kart";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-27");

// The first row is the pick for a reader who has not decided.
const operatorRows = [
  {
    op: "Pick if unsure: Akiba Kart Osaka (Klook)",
    start: "The shop on your voucher; the listing places it about 5 min on foot from Tsutenkaku (Shinsekai). A separate Shinsekai listing exists",
    route: "Dotonbori, Namba and Osaka Castle",
    time: "From 1 hour, longer by package",
    price: "Klook price by date; the Akiba Kart site's Osaka page lists from ¥7,000",
    costume: "Yes",
    url: akibaKartOsakaGoKart.url,
  },
  {
    op: "Street Kart Osaka (akiba-kart.com's Osaka page)",
    start: "1-14-19 Minami-Horie, Nishi-ku; about 4 min from Yotsubashi Station",
    route: "Amerikamura, Shinsaibashi, Dotonbori, Namba (Osaka-S course)",
    time: "About 1 hour",
    price: "¥7,000 (10:30–16:00) to ¥9,000 (21:00); regular ¥12,000",
    costume: "Chosen at the shop",
    url: "",
  },
  {
    op: "JAPANKART Osaka",
    start: "JAPANKART Osaka branch, 1-11-17 Shikitsunishi, Naniwa-ku (Namba)",
    route: "Tsutenkaku, Shinsekai, Osaka Castle, Midosuji, Amerikamura and Namba, with two staff vehicles",
    time: "90 minutes",
    price: "¥10,000 (official site)",
    costume: "Free rental",
    url: japanKartOsakaGoKart.url,
  },
  {
    op: "Monkey Kart (Klook only)",
    start: "Check the listing",
    route: "Dotonbori, the Glico sign, Shinsaibashi, Nipponbashi and Tsutenkaku",
    time: "1 hour, private group",
    price: "Klook price by date",
    costume: "Optional add-on",
    url: monkeyKartOsakaCostumeTour.url,
  },
  {
    op: "Future Kart, electric (Klook only)",
    start: "Check the listing",
    route: "Custom routes on request",
    time: "Check the listing",
    price: "Klook price by date",
    costume: "Free",
    url: futureKartOsakaElectricGoKart.url,
  },
];

// Street Kart Osaka's November–December 2026 price tab (osaka-go-kart.com / streetkart.com).
// The first row answers "how much": the cheapest one-hour slot.
const priceRows = [
  { slot: "Cheapest: 1 hour, 10:30–16:00 start", shop: "Street Kart Osaka (Akiba Kart site)", price: "¥7,000~" },
  { slot: "1 hour, 17:00–19:30 start", shop: "Street Kart Osaka", price: "¥7,800~" },
  { slot: "1 hour, 20:00 start", shop: "Street Kart Osaka", price: "¥8,500~" },
  { slot: "1 hour, 21:00 start", shop: "Street Kart Osaka", price: "¥9,000~" },
  { slot: "1 hour, standard regular price", shop: "Street Kart Osaka", price: "¥12,000~" },
  { slot: "90 minutes, Osaka Castle tour", shop: "JAPANKART Osaka", price: "¥10,000" },
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
    need: "These countries are not on Street Kart's list of 1949 Geneva signatories, so an IDP from them is not valid in Japan",
    drive: "No, unless you hold a Japanese licence",
  },
  {
    group: "US military personnel",
    need: "SOFA (USFJ 4EJ) or military driving licence + US state licence + DoD or military ID",
    drive: "Yes (with valid SOFA documents)",
  },
];

const bookingRows = [
  { op: "Akiba Kart Osaka (Klook)", cancel: "Free cancellation shown on the listing", weather: "Check the listing", note: "If your licence or IDP is invalid or missing, the tour is cancelled with no refund" },
  { op: "JAPANKART Osaka (Klook)", cancel: "Free cancellation and instant confirmation shown on the listing", weather: "Check the listing", note: "Licence valid in Japan required" },
  { op: "Future Kart (Klook)", cancel: "The listing text says both that no cancellations or changes are possible and that a full refund applies 24 hours ahead; read the terms before paying", weather: "Check the listing", note: "Accident insurance included, per the listing" },
  { op: "Monkey Kart (Klook)", cancel: "Check the listing", weather: "Check the listing", note: "Hard-copy IDP booklet required" },
  { op: "Street Kart Osaka (direct)", cancel: "Changes by availability; inside 6 days the operator's cancellation policy applies", weather: "Usually runs whatever the weather", note: "Arrive 30 min early; late arrivals cannot join and get no refund" },
];

const faqItems = [
  {
    q: "Do you need an international driving permit for go-karting in Osaka?",
    a: "Yes, unless you hold a Japanese licence or a SOFA licence. Most visitors need their home licence, a paper 1949 Geneva Convention International Driving Permit and their passport, all as originals; 1968 Vienna Convention permits are not accepted. Licences from Switzerland, Germany, France, Taiwan, Belgium and Monaco take an authorised Japanese translation instead. An IDP cannot be issued in Japan, so get it at home before you fly.",
  },
  {
    q: "How much is go-karting in Osaka?",
    a: `From ¥7,000 per person for about 1 hour. Street Kart Osaka (the Osaka page of the Akiba Kart site) lists ¥7,000 for 10:30–16:00 starts, ¥7,800 to ¥9,000 in the evening and a ¥12,000 regular price, and JAPANKART's 90-minute Osaka Castle tour is ¥10,000. Klook listings have their own price by date. Checked ${OWN}.`,
  },
  {
    q: "Which Osaka go-kart route passes Dotonbori?",
    a: "Street Kart Osaka's Osaka-S course (Amerikamura, Shinsaibashi, Dotonbori, Namba), Akiba Kart's Klook listing (Dotonbori, Namba, Osaka Castle) and Monkey Kart's (Dotonbori, the Glico sign, Shinsaibashi, Tsutenkaku) all pass Dotonbori. JAPANKART's 90-minute course goes via Tsutenkaku, Osaka Castle, Midosuji, Amerikamura and Namba.",
  },
  {
    q: "Is street go-karting in Osaka safe in winter or rain?",
    a: "The tours run all year with a guide leading the group: Street Kart Osaka has price tabs for every month from January to December and says it usually runs whatever the weather, and JAPANKART sends two staff vehicles with each group. The karts are open, so dress warmly in winter. Standard insurance is included at Street Kart, with a ¥50,000 deductible if the kart is damaged.",
  },
];

const TITLE = "Osaka Go Kart 2026: Shops, Routes, Prices & License Rules";
const DESCRIPTION =
  "Osaka go kart from ¥7,000 for 1 hour: Akiba Kart, JAPANKART, Monkey Kart and Future Kart compared on route past Dotonbori, price, costume and IDP rules.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function OsakaGoKartPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Osaka Go Kart", item: URL },
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Osaka Go Kart</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka Go Kart 2026: <br />Shops, Routes, Prices &amp; License Rules
          </h1>
          <p className={styles.heroSubtitle}>
            A street-legal kart through Dotonbori and Namba, in costume if you like. The documents decide whether
            you can drive, and the IDP can only be issued at home.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "From ¥7,000 / 1 hour", "1949 Geneva IDP", "5 shops compared"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Price</p>
                <p className={styles.verdictStatValue}>From ¥7,000 / 1 hour; ¥10,000 / 90 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Route</p>
                <p className={styles.verdictStatValue}>Dotonbori, Namba, Shinsaibashi</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>To drive you need</p>
                <p className={styles.verdictStatValue}>1949 Geneva IDP + home licence + passport</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Minimum age</p>
                <p className={styles.verdictStatValue}>18 (Klook listings)</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              An <strong>Osaka go kart</strong> tour costs <strong>from ¥7,000 per person for about 1 hour</strong>{" "}
              at Street Kart Osaka, the Osaka shop on the Akiba Kart site (¥12,000 regular price), and JAPANKART&apos;s
              90-minute Osaka Castle tour costs <strong>¥10,000</strong>; no Osaka shop lists a 2-hour course on its
              own site. To drive you need a Japanese or SOFA licence, or your home licence with a{" "}
              <strong>1949 Geneva Convention International Driving Permit</strong> and your passport, and licences
              from Switzerland, Germany, France, Taiwan, Belgium and Monaco take an authorised Japanese translation
              instead. The minimum age on Klook&apos;s Osaka go-kart listings is <strong>18</strong>. Checked on the
              operators&apos; sites and Klook, {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={akibaKartOsakaGoKart.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Book Akiba Kart Osaka on Klook →
              </KlookLink>
              <KlookLink href={japanKartOsakaGoKart.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check JAPANKART Osaka →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book with the kart"
          heading="Book These on the Same Day as Your Osaka Go Kart"
          intro="The pass for the rest of the day, a food walk in the same streets, a bed in Namba and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={osakaGoKartTripPrep}
        />

        <EsimCtaTop />

        {/* IDP */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Documents</span>
          <h2 className={styles.sectionTitle}>Do You Need an International Driving Permit for Go-Karting in Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>Yes, unless you hold a Japanese or SOFA licence.</strong> The karts run on public roads, so the
            rules are the ones for driving a car in Japan. The IDP must be issued under the 1949 Geneva Convention
            in your <strong>home country before you travel</strong>; it cannot be issued in Japan.
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
            Last checked: 2026-11-27 on{" "}
            <a href="https://streetkart.com/license_osaka.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>streetkart.com/license_osaka.html</a>{" "}
            and{" "}
            <a href="https://japankart.com/driving-requirements/" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>japankart.com/driving-requirements</a>
            ; the National Police Agency and JAF rules were read for the Tokyo page. An IDP or foreign licence is
            valid in Japan for one year from entry or until it expires, whichever comes first. Street Kart adds that
            the IDP must show category A to E with a stamp in section B, and asks you to contact it first if the
            cover says 1968; JAPANKART does not accept 1968 Vienna Convention permits. All documents must be
            originals: photocopies and phone photos are not accepted.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The translation route takes time: JAF accepts applications online from inside Japan only, and the{" "}
            <Link href="/guides/attractions/tokyo-go-kart" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo go kart guide
            </Link>{" "}
            explains it step by step. If you use JAF, book the kart for later in the trip.
          </p>
        </section>

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is Go-Karting in Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>From ¥7,000 per person for about 1 hour, and ¥10,000 for JAPANKART&apos;s 90-minute tour.</strong>{" "}
            At Street Kart Osaka the start time sets the price: evening slots cost ¥7,800 to ¥9,000, and the
            standard regular price is ¥12,000.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Course and start time", "Shop", "Price per person"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.slot}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.slot}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.shop}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-27. Street Kart rows from the November and December tabs on{" "}
            <a href="https://akiba-kart.com/en/osaka.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>akiba-kart.com/en/osaka.html</a>{" "}
            (which opens osaka-go-kart.com) and{" "}
            <a href="https://streetkart.com/en/osaka.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>streetkart.com/en/osaka.html</a>
            , where the lower prices are labelled &quot;Early Bird Review Price&quot;; JAPANKART from{" "}
            <a href="https://japankart.com/" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>japankart.com</a>
            . Optional full-coverage insurance costs extra. Klook sets its own price by date and slot.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={akibaKartOsakaGoKart.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Akiba Kart Osaka price on your date →
            </KlookLink>
            <KlookLink href={japanKartOsakaGoKart.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JAPANKART Osaka on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Operators */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Shops</span>
          <h2 className={styles.sectionTitle}>Which Osaka Go Kart Shop Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Akiba Kart for the most-reviewed Osaka street go kart on Klook, JAPANKART for a 90-minute drive
            to Osaka Castle with staff cars, Monkey Kart for a private group.</strong> All of them need the same
            documents.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shop", "Where you start", "Route", "Length", "Price per person", "Costume", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {operatorRows.map((row) => (
                    <tr key={row.op}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.op}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.start}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.costume}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        {row.url ? (
                          <KlookLink href={row.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                            Check dates →
                          </KlookLink>
                        ) : (
                          "Book with the operator"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-27. Street Kart and JAPANKART from{" "}
            <a href="https://streetkart.com/en/osaka.html" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>streetkart.com/en/osaka.html</a>{" "}
            and{" "}
            <a href="https://japankart.com/destinations/osaka/" target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>japankart.com/destinations/osaka</a>
            ; Akiba Kart, Monkey Kart and Future Kart from their Klook listings (Monkey Kart and Future Kart have
            no operator site of their own). The Akiba Kart site&apos;s Osaka page opens Street Kart Osaka, while the
            Klook Akiba Kart listing names a start near Tsutenkaku, so check the shop on your voucher. Klook prices
            change by date and slot. Age, height and weight limits differ by listing, so check yours before you pay.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            Driving in Tokyo too? The{" "}
            <Link href="/guides/attractions/tokyo-go-kart" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo go kart
            </Link>{" "}
            route table lists each start point there, from Shibuya and Akihabara to Tokyo Bay, with the official
            price for each course.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaGoKartingListUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              All Osaka go karting on Klook →
            </KlookLink>
            <KlookLink href={akibaKartShinsekaiGoKart.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Akiba Kart Shinsekai →
            </KlookLink>
          </div>
        </section>

        {/* Route */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Route</span>
          <h2 className={styles.sectionTitle}>Which Osaka Go-Kart Route Passes Dotonbori?</h2>
          <p className={styles.bodyText}>
            <strong>Street Kart Osaka, Akiba Kart and Monkey Kart all drive through Dotonbori.</strong> Street Kart
            Osaka&apos;s Osaka-S course leaves its Minami-Horie shop for Amerikamura, then Shinsaibashi, under the
            Dotonbori signs and finishes through Namba. Akiba Kart&apos;s Klook listing adds Osaka Castle; Monkey
            Kart&apos;s names the Glico sign, Nipponbashi and Tsutenkaku in Shinsekai. JAPANKART&apos;s 90-minute
            course heads from Namba to Tsutenkaku, Shinsekai and Osaka Castle, then back along Midosuji through
            Amerikamura and Namba. You follow the guide the whole way, and Japan drives on the left.
          </p>
        </section>

        {/* Duration */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Time</span>
          <h2 className={styles.sectionTitle}>How Long Is the Osaka Go-Kart Tour?</h2>
          <p className={styles.bodyText}>
            <strong>About 1 hour of driving, about 90 minutes with check-in.</strong> Street Kart asks you to be at
            the shop 30 minutes before your slot for the document check and briefing, and late arrivals cannot join.
            JAPANKART&apos;s Osaka course is 90 minutes on its own site. Pair it with a{" "}
            <Link href="/guides/attractions/dotonbori-river-cruise" style={{ color: "var(--red)", fontWeight: 600 }}>
              Dotonbori river cruise
            </Link>{" "}
            or a food walk in the same streets, or fit it into an{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka 2-day itinerary
            </Link>
            .
          </p>
        </section>

        {/* Night */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Night</span>
          <h2 className={styles.sectionTitle}>Can You Go-Kart in Osaka at Night?</h2>
          <p className={styles.bodyText}>
            <strong>Yes.</strong> Street Kart Osaka&apos;s November and December tables list 17:00 to 19:30 starts
            from ¥7,800, a 20:00 start from ¥8,500 and a 21:00 start from ¥9,000 (the times vary by month), so the
            Dotonbori signs are lit as you drive past. On Klook, open the
            listing&apos;s calendar for the evening times on your date. Bring a warm layer in winter: the karts are
            open.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={akibaKartOsakaGoKart.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check evening slots →
            </KlookLink>
          </div>
        </section>

        {/* Rain + booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking and weather</span>
          <h2 className={styles.sectionTitle}>Is Street Go-Karting in Osaka Safe in Winter or Rain?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>The tours run all year, rain included, with a guide leading every group.</strong> Street Kart
            Osaka has price tabs for every month from January to December and says it usually goes ahead whatever
            the weather; JAPANKART sends two staff vehicles with each group. The karts are open, so wear warm layers
            in winter and no heels, sandals or long skirts. Standard insurance is included at Street Kart, with a
            ¥50,000 deductible if the kart is damaged and an optional full-coverage plan. On Klook the rain and
            cancellation terms are set per listing, and missing documents never earn a refund.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Operator", "Cancellation", "Rain", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.op}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.op}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.cancel}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.weather}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From the Klook listings&apos; search-indexed text and streetkart.com, checked {OWN}. Terms change, so
            read the cancellation section on the listing before you pay. Book once your documents are in hand.
          </p>
        </section>

        {/* Osaka vs Tokyo */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Osaka or Tokyo</span>
          <h2 className={styles.sectionTitle}>Osaka or Tokyo: Where Is Go-Karting Better?</h2>
          <p className={styles.bodyText}>
            <strong>Osaka for one compact hour at the centre of the city, Tokyo for choice.</strong> Go karting in
            Osaka is a short loop of Dotonbori, Namba and Shinsaibashi. Tokyo has more shops and courses, including
            the one through Shibuya Crossing and the one over the Rainbow Bridge; see the{" "}
            <Link href="/guides/attractions/tokyo-go-kart" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo go kart guide
            </Link>
            . The documents are identical, so if you can drive in one city you can drive in the other. For the rest
            of an Osaka day, see{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
              things to do in Osaka
            </Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/osaka-3-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka 3-day itinerary
            </Link>
            .
          </p>
        </section>

        {/* Who it is not for */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Who it&apos;s for</span>
          <h2 className={styles.sectionTitle}>Can Children or Non-Drivers Join?</h2>
          <p className={styles.bodyText}>
            <strong>Only drivers aged 18 or over with a valid licence.</strong> Every driver needs their own
            documents, so children and anyone without a recognised licence cannot drive; the minimum age on
            Klook&apos;s Osaka go-kart listings is 18. Height and weight limits are on each listing. These are
            generic street go-kart tours, not affiliated with any video game or character brand, and the costumes
            are generic.
          </p>
        </section>

        <BookingEsimCard lead="Shop maps, your booking QR code and the operator's messages all live on your phone. Get mobile data before you land." />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            In the same Shinsekai area, <Link href="/guides/attractions/spa-world-osaka-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Spa World</Link> has onsen-only tickets from ¥1,500 for adults.
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
          heading="Osaka Go Kart Tours on Klook"
          intro="Five Osaka street kart listings. Routes, slots and document rules are on each listing."
          tours={[akibaKartOsakaGoKart, japanKartOsakaGoKart, monkeyKartOsakaCostumeTour, akibaKartShinsekaiGoKart, futureKartOsakaElectricGoKart]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/tokyo-go-kart", title: "Tokyo Go Kart 2026: Street Karting in Japan, Price & IDP" },
              { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
              { href: "/guides/attractions/dotonbori-river-cruise", title: "Dotonbori River Cruise" },
              { href: "/guides/attractions/osaka-3-day-itinerary", title: "Osaka 3-Day Itinerary" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h2l1-3h12l1 3h2" />
                    <path d="M5 12v5h14v-5" />
                    <circle cx="7.5" cy="17" r="1.5" />
                    <circle cx="16.5" cy="17" r="1.5" />
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
            <h2 className={styles.ctaBannerTitle}>Ready to drive Osaka?</h2>
            <p className={styles.ctaBannerDesc}>
              Sort the IDP at home, then book the slot. Bring the licence, the IDP and your passport on the day.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={akibaKartOsakaGoKart.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Akiba Kart Osaka →
              </KlookLink>
              <KlookLink href={japanKartOsakaGoKart.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                JAPANKART Osaka →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
