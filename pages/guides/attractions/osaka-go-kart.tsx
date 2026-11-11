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
 * operator's site and not linked. No price is printed.
 */

const ROUTE = "/guides/attractions/osaka-go-kart";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-11");
const LICENCE_CHECKED = checkedLabel("2026-11-07");

const operatorRows = [
  {
    op: "Akiba Kart Osaka",
    start: "The shop on your voucher; the listing places it about 5 min on foot from Tsutenkaku (Shinsekai). A separate Shinsekai listing exists",
    route: "Dotonbori, Namba and Osaka Castle",
    time: "From 1 hour, longer by package",
    licence: "Japanese licence, SOFA licence or IDP",
    costume: "Yes",
    url: akibaKartOsakaGoKart.url,
  },
  {
    op: "JAPANKART Osaka",
    start: "JAPANKART Osaka branch (meet at the shop)",
    route: "Famous areas of central Osaka, with a lead car in front and a second car behind",
    time: "1 to 2 hours",
    licence: "A licence valid in Japan",
    costume: "Check the listing",
    url: japanKartOsakaGoKart.url,
  },
  {
    op: "Monkey Kart (in costume)",
    start: "Check the listing",
    route: "Dotonbori, the Glico sign, Shinsaibashi, Nipponbashi and Tsutenkaku",
    time: "1 hour, private group",
    licence: "Paper 1949 Geneva IDP, a Japanese translation of your licence, or SOFA",
    costume: "Optional add-on",
    url: monkeyKartOsakaCostumeTour.url,
  },
  {
    op: "Future Kart (electric)",
    start: "Check the listing",
    route: "Custom routes on request",
    time: "Check the listing",
    licence: "Check the listing",
    costume: "Free",
    url: futureKartOsakaElectricGoKart.url,
  },
  {
    op: "Street Kart Osaka (operator site)",
    start: "1-14-19 Minami-Horie, Nishi-ku; about 4 min from Yotsubashi Station",
    route: "Amerikamura, Shinsaibashi, Dotonbori, Namba",
    time: "About 1 hour",
    licence: "Japanese licence, 1949 Geneva IDP, SOFA, or translation (6 countries)",
    costume: "Chosen at the shop",
    url: "",
  },
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
    q: "Do you need an International Driving Permit for Osaka go-karting?",
    a: "Yes, unless you hold a Japanese licence or a SOFA licence. Most visitors need their home licence, a paper 1949 Geneva Convention International Driving Permit and their passport, all as originals. Licences from Switzerland, Germany, France, Taiwan, Belgium and Monaco take an authorised Japanese translation instead. An IDP cannot be issued in Japan, so get it at home before you fly.",
  },
  {
    q: "Which route does the Osaka go-kart take?",
    a: "Most routes run through Dotonbori, Namba and Shinsaibashi. Street Kart Osaka's course adds Amerikamura; Akiba Kart's listing names Osaka Castle; Monkey Kart's names the Glico sign, Nipponbashi and Tsutenkaku. Future Kart offers custom routes on request.",
  },
  {
    q: "How long is the Osaka go-kart tour?",
    a: "About 1 hour on the standard courses, and 1 to 2 hours on JAPANKART's listing. Street Kart asks you to arrive 30 minutes before your slot for the document check and briefing, so allow about 90 minutes in total.",
  },
  {
    q: "Can you go-kart in Osaka at night?",
    a: `Yes. Street Kart Osaka lists evening slots from 16:30 to 19:30 plus 20:00 and 21:00 starts, varying by month, and Dotonbori's signs are lit after dark. On Klook, the time slots are on each listing's calendar. Checked ${OWN}.`,
  },
  {
    q: "What happens if it rains?",
    a: "Street Kart says its tours usually run whatever the weather. On Klook, the rain and cancellation terms are set per listing: Akiba Kart and JAPANKART show free cancellation, while Future Kart's terms need a careful read. Missing or invalid documents mean no refund anywhere.",
  },
  {
    q: "Osaka or Tokyo: where is go-karting better?",
    a: "Osaka for a compact one-hour loop of Dotonbori and Namba at the heart of the city; Tokyo for more shops and routes, including Shibuya Crossing and the Rainbow Bridge. The documents are the same in both cities.",
  },
];

const TITLE = "Osaka Go Kart 2026: IDP Rules, Routes and Which Tour to Book";
const DESCRIPTION =
  "Osaka go kart guide: Osaka street go kart routes past Dotonbori and Namba, IDP rules by country, night slots, rain, and go karting in Osaka by operator.";

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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Osaka Go Kart</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka Go Kart 2026:<br />IDP Rules, Routes and Which Tour to Book
          </h1>
          <p className={styles.heroSubtitle}>
            A street-legal kart through Dotonbori and Namba, in costume if you like. The documents decide whether
            you can drive, and the IDP can only be issued at home.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "IDP required", "5 operators compared", "Night slots"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Route</p>
                <p className={styles.verdictStatValue}>Dotonbori, Namba, Shinsaibashi</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>About 1 hour, up to 2</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>To drive you need</p>
                <p className={styles.verdictStatValue}>IDP + home licence + passport</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Arrive</p>
                <p className={styles.verdictStatValue}>30 min early (Street Kart)</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              An <strong>Osaka go kart</strong> tour is a guided convoy on public roads through{" "}
              <strong>Dotonbori, Namba and Shinsaibashi</strong>, with some routes reaching Osaka Castle or
              Tsutenkaku. It lasts <strong>about 1 hour</strong>, or 1 to 2 hours on longer courses. To drive you
              need a <strong>Japanese licence</strong>, or your home licence with a{" "}
              <strong>1949 Geneva Convention International Driving Permit</strong> and your passport; licences from
              Switzerland, Germany, France, Taiwan, Belgium and Monaco take an authorised Japanese translation instead.
              Most shops lend a costume for photos. Checked on the operators&apos; pages and Klook listings, {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={akibaKartOsakaGoKart.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Akiba Kart Osaka →
              </KlookLink>
              <KlookLink href={japanKartOsakaGoKart.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
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
          <h2 className={styles.sectionTitle}>Do You Need an International Driving Permit for Osaka Go-Karting?</h2>
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
            From the National Police Agency, JAF and Street Kart&apos;s licence page, checked {LICENCE_CHECKED};
            Street Kart&apos;s Osaka licence page rechecked {OWN}. An IDP or foreign licence is valid in Japan for
            one year from entry or until it expires, whichever comes first. Street Kart adds that the IDP must show
            category A to E with a stamp in section B, and asks you to contact it first if the cover says 1968. All
            documents must be originals: photocopies and phone photos are not accepted.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The translation route takes time: JAF accepts applications online from inside Japan only, and the{" "}
            <Link href="/guides/attractions/tokyo-go-kart" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo go kart guide
            </Link>{" "}
            explains it step by step. If you use JAF, book the kart for later in the trip.
          </p>
        </section>

        {/* Operators */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Operators</span>
          <h2 className={styles.sectionTitle}>Which Osaka Street Go Kart Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Akiba Kart for the most-reviewed Osaka street go kart on Klook, JAPANKART for a longer drive
            with a chase car, Monkey Kart for a private group.</strong> All of them need the same documents.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Operator", "Where you start", "Route", "Length", "Licence the listing names", "Costume", ""].map((h) => (
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
                      <td style={{ fontSize: "0.85rem" }}>{row.licence}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.costume}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        {row.url ? (
                          <KlookLink href={row.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
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
            Klook rows from each listing and Street Kart from streetkart.com, checked {OWN}. No price is printed:
            Klook prices change by date and slot. Age, height and weight limits differ by listing, so check yours
            before you pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaGoKartingListUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Osaka go karting on Klook →
            </KlookLink>
            <KlookLink href={akibaKartShinsekaiGoKart.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Akiba Kart Shinsekai →
            </KlookLink>
          </div>
        </section>

        {/* Route */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Route</span>
          <h2 className={styles.sectionTitle}>Which Route Does the Osaka Go-Kart Take?</h2>
          <p className={styles.bodyText}>
            <strong>Dotonbori, Namba and Shinsaibashi are on almost every route.</strong> Street Kart Osaka leaves
            its Minami-Horie shop for Amerikamura, then Shinsaibashi, under the Dotonbori signs and finishes through
            Namba. Akiba Kart&apos;s listing adds Osaka Castle; Monkey Kart&apos;s names the Glico sign, Nipponbashi
            and Tsutenkaku in Shinsekai. You follow the guide&apos;s kart the whole way, and Japan drives on the
            left.
          </p>
        </section>

        {/* Duration */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Time</span>
          <h2 className={styles.sectionTitle}>How Long Is the Osaka Go-Kart Tour?</h2>
          <p className={styles.bodyText}>
            <strong>About 1 hour of driving, about 90 minutes with check-in.</strong> Street Kart asks you to be at
            the shop 30 minutes before your slot for the document check and briefing, and late arrivals cannot join.
            JAPANKART&apos;s listing runs 1 to 2 hours. Pair it with a{" "}
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
            <strong>Yes.</strong> Street Kart Osaka lists evening slots from 16:30 to 19:30 plus 20:00 and 21:00
            starts, varying by month, so the Dotonbori signs are lit as you drive past. On Klook, open the
            listing&apos;s calendar for the evening times on your date. Bring a warm layer in winter: the karts are
            open.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={akibaKartOsakaGoKart.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check evening slots →
            </KlookLink>
          </div>
        </section>

        {/* Rain + booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking and weather</span>
          <h2 className={styles.sectionTitle}>What Happens If It Rains?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Most tours still run.</strong> Street Kart says it usually goes ahead whatever the weather. On
            Klook the rain and cancellation terms are set per listing, and missing documents never earn a refund.
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
            <strong>Only with a valid licence.</strong> Every driver needs their own documents, so children and
            anyone without a recognised licence cannot drive. Age and height limits are on each listing. These are
            generic street go-kart tours, not affiliated with any video game or character brand, and the costumes
            are generic.
          </p>
        </section>

        <BookingEsimCard lead="Shop maps, your booking QR code and the operator's messages all live on your phone. Get mobile data before you land." />

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
              { href: "/guides/attractions/tokyo-go-kart", title: "Tokyo Go Kart 2026: Price, IDP Rules and Which Tour to Book" },
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
              <KlookLink href={akibaKartOsakaGoKart.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Akiba Kart Osaka →
              </KlookLink>
              <KlookLink href={japanKartOsakaGoKart.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                JAPANKART Osaka →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
