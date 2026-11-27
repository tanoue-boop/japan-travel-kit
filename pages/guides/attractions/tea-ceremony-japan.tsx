import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import KlookTripPrep from "../../../components/KlookTripPrep";
import {
  asakusaKimonoAiwafukuNo1,
  asakusaKimonoTeaCeremony,
  asakusaKimonoYae,
  asakusaTableKimonoTeaCeremony,
  kyotoGionChairTeaCeremony,
  kyotoGionKimonoTeaCeremony,
  kyotoHighlightBusTour,
  kyotoNaraArashiyamaTour,
  shibuyaChaAnTeaCeremony,
  teaCeremonySameDayPrep,
  teaCeremonyTokyoSameDayPrep,
  tokyoCasualTeaCeremony,
  tokyoMatchaKimonoTeaCeremony,
  tokyoMatchaTeaCeremonyExpert,
} from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygJapanTeaCeremonies, gygKyotoTeaCeremonies, gygTokyoTeaCeremonies } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026).
const TEA_CEREMONY_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307860&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F160630-traditional-japanese-tea-ceremony-experience-in-kyoto%2F";

// 22 Nov 2026 (R05): the page now leads with the 8 Tokyo places. Kyoto is one section near the end
// that keeps the existing Kyoto affiliate links; the Kyoto venue tables move to a separate Kyoto page.
//
// Yen figures come only from each venue's own site, read on CHECKED: The Okura Tokyo, Hotel
// Chinzanso Tokyo (whose 7–12 guest price is now ¥155,000) and Maikoya Asakusa. Klook prices are
// never quoted; Klook rows repeat the duration and inclusions in each listing's search-indexed text.
const CHECKED = "22 November 2026";
const CHECKED_ISO = "2026-11-22";
const CHECKED_SHORT = "22 Nov 2026";

const OKURA_URL = "https://theokuratokyo.jp/experiences-and-activities/tea-ceremony/";
const MAIKOYA_TOKYO_URL = "https://mai-ko.com/tour/tea-ceremony-and-kimono-experience-tokyo/";
const CHINZANSO_URL = "https://hotel-chinzanso-tokyo.com/garden/activity/";

const TITLE = "Tea Ceremony in Tokyo (2026): 8 Places, Prices & How to Book";
const DESCRIPTION =
  "Tea ceremony Tokyo: 8 places for a Japanese tea ceremony experience in Asakusa, Shibuya, Meguro and hotels, 40–90 min, ¥5,000 at The Okura. Book here.";

const linkStyle = { color: "var(--red)", fontWeight: 600 };

type TokyoRow = {
  area: string;
  venue: string;
  format: string;
  time: string;
  price: string;
  booking: string;
  book: { label: string; href: string; klook: boolean };
};

// Row 1 is the verdict: the one Tokyo session on Klook that includes the kimono, states an
// English-speaking guide and states free cancellation.
const tokyoRows: TokyoRow[] = [
  {
    area: "Asakusa",
    venue: "First time? Pick this: Maikoya Asakusa, near Senso-ji",
    format: "Kimono included",
    time: "About 90 min (ceremony starts ~30 min after dressing)",
    price: "By date, shown in the calendar",
    booking: "Klook or official calendar; free cancellation 24 h ahead on Klook; kimono back by 18:00",
    book: { label: "Check on Klook →", href: asakusaKimonoTeaCeremony.url, klook: true },
  },
  {
    area: "Asakusa",
    venue: "Table-style ceremony near Senso-ji and Skytree",
    format: "Kimono included, seated at tables",
    time: "About 90 min",
    price: "By date on Klook",
    booking: "Klook time slot",
    book: { label: "Check on Klook →", href: asakusaTableKimonoTeaCeremony.url, klook: true },
  },
  {
    area: "Shibuya",
    venue: "Cha An",
    format: "Hands-on, no kimono",
    time: "40–50 min",
    price: "By date on Klook",
    booking: "Klook time slot",
    book: { label: "Check on Klook →", href: shibuyaChaAnTeaCeremony.url, klook: true },
  },
  {
    area: "Meguro",
    venue: "Aeru, two stops from Shibuya",
    format: "Hands-on, no kimono",
    time: "45 min",
    price: "By date on Klook",
    booking: "Klook time slot; English-speaking host",
    book: { label: "Check on Klook →", href: tokyoCasualTeaCeremony.url, klook: true },
  },
  {
    area: "Toyosu",
    venue: "Private room near teamLab Planets",
    format: "Hands-on, Urasenke instructor",
    time: "Shown on the listing",
    price: "By date on Klook",
    booking: "Klook time slot; in English",
    book: { label: "Check on Klook →", href: tokyoMatchaTeaCeremonyExpert.url, klook: true },
  },
  {
    area: "Tokyo (see listing)",
    venue: "Matcha and kimono workshop",
    format: "Kimono included",
    time: "1 hr 30 min",
    price: "By date on Klook",
    booking: "Klook time slot; no refund if 10+ min late",
    book: { label: "Check on Klook →", href: tokyoMatchaKimonoTeaCeremony.url, klook: true },
  },
  {
    area: "Toranomon",
    venue: "The Okura Tokyo, Chosho-an",
    format: "Hotel tea room",
    time: "About 60 min (or 30 min, bowl and sweet only)",
    price: "¥5,000 per person, 2+ guests (30 min: ¥3,000)",
    booking: "Hotel, 7+ days ahead; Tue, Thu, Sat 12:00, 13:30, 15:00",
    book: { label: "Hotel booking page →", href: OKURA_URL, klook: false },
  },
  {
    area: "Bunkyo (Mejiro)",
    venue: "Hotel Chinzanso Tokyo",
    format: "Hotel tea room, private group",
    time: "About 1 hour",
    price: "¥90,000 per group of 1–3",
    booking: "Hotel, 10+ days ahead; weekdays 13:00–17:00",
    book: { label: "Hotel activities page →", href: CHINZANSO_URL, klook: false },
  },
];

const tokyoPriceRows = [
  { venue: "The Okura Tokyo, Chosho-an (Toranomon)", session: "About 60 minutes, you make the tea; minimum two guests", price: "¥5,000 per person", note: "Tax and 15% service included; book 7+ days ahead" },
  { venue: "The Okura Tokyo, Chosho-an", session: "About 30 minutes, matcha and a sweet, no tea-making", price: "¥3,000 per person", note: "Bookings by phone only" },
  { venue: "Hotel Chinzanso Tokyo (Bunkyo)", session: "About 1 hour, private, price per group", price: "¥90,000 for 1–3; ¥120,000 for 4–6; ¥155,000 for 7–12", note: "Tax and service included; weekdays; book 10+ days ahead" },
  { venue: "Maikoya Asakusa", session: "About 90 minutes with kimono", price: "Varies by date", note: "Per-person price shown in the booking calendar, tax included" },
  { venue: "Klook sessions (Asakusa, Shibuya, Meguro, Toyosu)", session: "40 minutes to 1 hr 30 min", price: "Shown on each listing", note: "Prices change by date" },
];

const tokyoTimeRows = [
  { format: "Short hands-on session — the quickest", example: "Cha An, Shibuya (40–50 min); Aeru, Meguro (45 min)", time: "40–50 minutes" },
  { format: "Bowl and sweet only", example: "The Okura Tokyo short session", time: "About 30 minutes" },
  { format: "Hotel tea room", example: "The Okura Tokyo; Hotel Chinzanso Tokyo", time: "About 60 minutes" },
  { format: "Kimono and ceremony", example: "Maikoya Asakusa; table-style session near Senso-ji; matcha and kimono workshop", time: "About 90 minutes" },
];

const steps = [
  {
    title: "Choose the area that fits your day",
    desc: "Asakusa if you want the ceremony in kimono and a walk round Senso-ji afterwards; Shibuya or Meguro for a short session between other plans; Toyosu if you are already at teamLab Planets; a hotel tea room for a quieter, more formal room.",
  },
  {
    title: "Book the time slot",
    desc: `Klook sessions and Maikoya are booked by date and time in a calendar, with the price shown for your date. The Okura Tokyo asks for at least 7 days' notice and Hotel Chinzanso Tokyo at least 10. Checked ${CHECKED}.`,
  },
  {
    title: "Check seating and any restrictions",
    desc: "Traditional seating is seiza, kneeling on tatami. The table-style Asakusa session seats you at tables, and Maikoya provides chairs on request, subject to availability. Some kimono sessions advise against attendance during pregnancy, so read the listing.",
  },
  {
    title: "Plan the kimono return",
    desc: `Maikoya Asakusa keeps the kimono with you until 18:00 the same day, so a morning or early-afternoon slot leaves time to walk Asakusa in it. If your session has no kimono, a separate Asakusa rental shop sets its own return time. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "Where can I do a tea ceremony in Tokyo?",
    a: `In Asakusa, where Maikoya and a table-style tea room near Senso-ji run kimono-and-ceremony sessions; in Shibuya at Cha An; in Meguro, two stops from Shibuya; in Toyosu near teamLab Planets; and in the hotel tea rooms of The Okura Tokyo in Toranomon and Hotel Chinzanso Tokyo in Bunkyo. For a first visit, Maikoya Asakusa includes the kimono and an English-speaking guide. Checked ${CHECKED}.`,
  },
  {
    q: "How much is a tea ceremony in Tokyo?",
    a: `The Okura Tokyo charges ¥5,000 per person for about 60 minutes (minimum two guests, tax and service included) and ¥3,000 for a 30-minute bowl and sweet, booked by phone. Hotel Chinzanso Tokyo charges per group, from ¥90,000 for one to three guests. Maikoya and the Klook sessions price by date in their booking calendars. Checked ${CHECKED}.`,
  },
  {
    q: "Do I need to wear a kimono for a tea ceremony?",
    a: `No. A kimono is never required: modest clothes and socks are enough, because shoes come off on tatami. If you want one, the Asakusa sessions include it, and Maikoya lets you keep it on until 18:00. For Shibuya, Meguro or a hotel tea room, rent one in Asakusa first. Checked ${CHECKED}.`,
  },
  {
    q: "How long does a Japanese tea ceremony experience take?",
    a: `40 to 60 minutes for the ceremony alone in Tokyo — Cha An in Shibuya lists 40 to 50 minutes, the Meguro session 45 and The Okura Tokyo about 60 — and about 90 minutes with a kimono, because dressing comes first. At Maikoya Asakusa the ceremony starts about 30 minutes after your booked time. Checked ${CHECKED}.`,
  },
  {
    q: "Should I do the tea ceremony in Tokyo or Kyoto?",
    a: "Kyoto if it is already on your route, because the tea rooms sit in the old streets of Gion and near Kinkaku-ji. Tokyo if it is not, or if you have only an afternoon: Asakusa offers the same kimono-and-ceremony format and Shibuya has a 40-to-50-minute session.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tea-ceremony-japan") } });

function KimonoRentalCtas() {
  return (
    <>
      <KlookLink href={asakusaKimonoYae.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
        Asakusa kimono rental (Kimono Yae) →
      </KlookLink>
      <KlookLink href={asakusaKimonoAiwafukuNo1.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
        Kimono rental with hair styling (Aiwafuku) →
      </KlookLink>
    </>
  );
}

function LastChecked() {
  return (
    <>
      Last checked: {CHECKED_ISO}. Official pages:{" "}
      <a href={OKURA_URL} target="_blank" rel="noopener" style={linkStyle}>The Okura Tokyo tea ceremony</a>,{" "}
      <a href={CHINZANSO_URL} target="_blank" rel="noopener" style={linkStyle}>Hotel Chinzanso Tokyo activities</a>,{" "}
      <a href={MAIKOYA_TOKYO_URL} target="_blank" rel="noopener" style={linkStyle}>Maikoya Asakusa</a>.
    </>
  );
}

export default function TeaCeremonyJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tea-ceremony-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tea-ceremony-japan" />
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
              route: "/guides/attractions/tea-ceremony-japan",
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
                { "@type": "ListItem", position: 4, name: "Tea Ceremony in Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/tea-ceremony-japan" },
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
          <span className={styles.breadCurrent}>Tea Ceremony in Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tea Ceremony in Tokyo (2026): <br />8 Places, Prices &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Where to book a Japanese tea ceremony experience in Tokyo — Asakusa, Shibuya, Meguro, Toyosu and two
            hotel tea rooms — with how long each takes, what it costs and which include a kimono.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "8 Tokyo places", "Official prices"].map((t) => (
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
            A Japanese tea ceremony experience in Tokyo takes 40 to 90 minutes, and where a venue publishes a
            per-person price it is ¥3,000 to ¥5,000 (The Okura Tokyo). The 8 places to book one are in Asakusa
            (kimono included, about 90 minutes), Shibuya and Meguro (40 to 50 minutes), Toyosu, and the hotel tea
            rooms of The Okura Tokyo and Hotel Chinzanso Tokyo. Every one is by reservation: a time slot on Klook
            or Maikoya&apos;s calendar, or 7 to 10 days&apos; notice at the hotels. Checked {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.5rem" }}>
            <KlookLink href={asakusaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the Asakusa kimono tea ceremony →
            </KlookLink>
            <KlookLink href={shibuyaChaAnTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Shibuya tea ceremony →
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
                <p className={styles.verdictStatLabel}>Where in Tokyo</p>
                <p className={styles.verdictStatValue}>Asakusa, Shibuya, Meguro, Toyosu, 2 hotels</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>40–60 min; about 90 with kimono</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price</p>
                <p className={styles.verdictStatValue}>¥3,000–¥5,000 at The Okura Tokyo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>First time</p>
                <p className={styles.verdictStatValue}>Maikoya Asakusa, kimono included</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> no background is needed. Asakusa is the place for a ceremony in kimono,
              Shibuya or Meguro for a short one, and a hotel tea room for a quieter room. The two things to check
              before booking are the seating, because much of it is <em>seiza</em>, kneeling, and any pregnancy
              restrictions the listing gives.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={asakusaTableKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check the Asakusa ceremony at tables →
              </KlookLink>
              <GygCompareButton slug="tea-ceremony-japan" listing={gygTokyoTeaCeremonies} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* The 8 places */}
        <section className={styles.comparisonSection} id="tokyo-places">
          <span className={styles.sectionLabel}>8 places</span>
          <h2 className={styles.sectionTitle}>Where can I do a tea ceremony in Tokyo?</h2>
          <p className={styles.bodyText}>
            In Asakusa for a ceremony in kimono, in Shibuya or Meguro for a short session without one, in Toyosu
            near teamLab Planets, and at The Okura Tokyo or Hotel Chinzanso for a hotel tea room. If it is your
            first, book Maikoya Asakusa: it includes the kimono, states an English-speaking guide and allows free
            cancellation up to 24 hours ahead.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Place", "Type", "How long", "Price guide", "How to book", "Book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tokyoRows.map((row) => (
                    <tr key={row.venue}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.venue}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.format}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>
                        {row.book.klook ? (
                          <KlookLink href={row.book.href} target="_blank" rel="sponsored nofollow noopener" style={linkStyle}>
                            {row.book.label}
                          </KlookLink>
                        ) : (
                          <a href={row.book.href} target="_blank" rel="noopener" style={linkStyle}>
                            {row.book.label}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <LastChecked /> Klook rows repeat the duration, inclusions and terms each listing states, and no Klook
            price; &ldquo;Shown on the listing&rdquo; means the listing text does not give it, so confirm on the
            listing for your date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={asakusaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Asakusa kimono ceremony →
            </KlookLink>
            <KlookLink href={shibuyaChaAnTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book Cha An in Shibuya →
            </KlookLink>
            <KimonoRentalCtas />
          </div>
        </section>

        {/* Tokyo price */}
        <section className={styles.comparisonSection} id="tokyo-price">
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How much is a tea ceremony in Tokyo?</h2>
          <p className={styles.bodyText}>
            ¥5,000 per person for about 60 minutes at The Okura Tokyo, the one Tokyo venue here that publishes a
            per-person price, or ¥3,000 for a 30-minute bowl and sweet without the tea-making. Hotel Chinzanso
            prices per private group, from ¥90,000; Maikoya and the Klook sessions price by date.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Venue", "Session", "Price", "Note", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tokyoPriceRows.map((row) => (
                    <tr key={row.venue + row.session}>
                      <td className={styles.tdProvider}>{row.venue}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.session}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{CHECKED_SHORT}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <LastChecked /> Klook prices are shown on each listing, not here.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={asakusaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              See the Asakusa price for your date →
            </KlookLink>
            <KlookLink href={tokyoCasualTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              See the 45-minute Meguro session →
            </KlookLink>
          </div>
        </section>

        {/* Kimono */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kimono</span>
          <h2 className={styles.sectionTitle}>Do I need to wear a kimono?</h2>
          <p className={styles.bodyText}>
            No: modest clothes and socks are enough, because shoes come off on tatami. To wear one, book an
            Asakusa session that includes it. At Maikoya Asakusa your booked time is the start of dressing, the
            ceremony begins about 30 minutes later, the visit takes about 90 minutes, and the kimono stays with
            you until 18:00; guests must be 7 or older. Checked {CHECKED} on{" "}
            <a href={MAIKOYA_TOKYO_URL} target="_blank" rel="noopener" style={linkStyle}>mai-ko.com</a>.
          </p>
          <p className={styles.bodyText}>
            For Shibuya, Meguro or a hotel tea room, none of which lists a kimono, rent one first: our{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental" style={linkStyle}>Asakusa kimono rental</Link>{" "}
            guide compares return times, which decide how late a ceremony slot can be, and the wider{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>kimono rental in Japan</Link> guide
            shows which city is best for kimono rental, from Kyoto to Kamakura and Kanazawa. Maikoya&apos;s etiquette guide asks everyone to wear socks and to avoid hats, ripped
            jeans and sleeveless tops.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoMatchaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Matcha and kimono workshop →
            </KlookLink>
            <KimonoRentalCtas />
          </div>
        </section>

        {/* Duration */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Time</span>
          <h2 className={styles.sectionTitle}>How long does a Japanese tea ceremony experience take?</h2>
          <p className={styles.bodyText}>
            40 to 60 minutes for the ceremony alone, and about 90 minutes with a kimono, because dressing takes the
            first half hour. The shortest in Tokyo is Cha An in Shibuya at 40 to 50 minutes.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Format", "Where in Tokyo", "How long", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tokyoTimeRows.map((row) => (
                    <tr key={row.format}>
                      <td className={styles.tdProvider}>{row.format}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.example}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{CHECKED_SHORT}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <LastChecked />
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shibuyaChaAnTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              40–50 minutes at Cha An, Shibuya →
            </KlookLink>
            <KlookLink href={tokyoMatchaTeaCeremonyExpert.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Urasenke instructor in Toyosu →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Same day in Tokyo"
          heading="What should you book for the same day in Tokyo?"
          intro="A Tokyo tea ceremony fills 40 minutes to an hour and a half, so the rest of the day is yours. These are the bookings that fit around it."
          items={teaCeremonyTokyoSameDayPrep}
        />

        {/* What happens */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What happens at a Japanese tea ceremony?</h2>
          <p className={styles.bodyText}>
            The host prepares a bowl of matcha, powdered green tea whisked to a froth, and you are served it with a
            seasonal sweet; at most visitor sessions you then whisk your own. The Japanese tea ceremony —{" "}
            <strong>chanoyu</strong>, or <strong>sado</strong>, &ldquo;the way of tea&rdquo; — is a practice of
            hospitality and seasonal beauty refined over centuries, and the visitor sessions in Tokyo are made for
            beginners.
          </p>
          <p className={styles.bodyText}>
            This guide covers the ceremony itself: where, how long and how to book. For the tea, meaning Uji,
            Wazuka and grinding matcha on a stone mill, see our{" "}
            <Link href="/guides/attractions/japan-matcha-experiences" style={linkStyle}>matcha experiences guide</Link>;
            to make food rather than tea, a{" "}
            <Link href="/guides/attractions/tokyo-cooking-class" style={linkStyle}>Tokyo cooking class</Link>{" "}
            teaches sushi in about 1.5 hours. For the rest of the city, see{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>.
          </p>
        </section>

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do you book a tea ceremony in Tokyo?</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={asakusaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Asakusa kimono ceremony on Klook →
            </KlookLink>
            <KlookLink href={asakusaTableKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Asakusa ceremony at tables →
            </KlookLink>
            <GygCompareButton slug="tea-ceremony-japan" listing={gygTokyoTeaCeremonies} />
          </div>
        </section>

        {/* Good to know */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Good to know</span>
          <h2 className={styles.sectionTitle}>Do you have to kneel at a tea ceremony?</h2>
          <p className={styles.bodyText}>
            No, not at every session. The traditional posture is seiza, kneeling on tatami, but Maikoya says you
            need not stay in it and offers chairs on request, subject to availability, and the table-style session
            near Senso-ji seats you at tables. Ask when you book. Some sessions that include a kimono advise
            against attendance during pregnancy. Checked {CHECKED}.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Can children join a tea ceremony in Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes, but check the minimum age on the listing: Maikoya Asakusa takes guests aged 7 and up. Hotel
            Chinzanso prices per group of up to 12, so a family books the room rather than seats. Checked{" "}
            {CHECKED}.
          </p>
        </section>

        {/* Kyoto, one section */}
        <section className={styles.bodySection} id="tokyo-or-kyoto">
          <span className={styles.sectionLabel}>Kyoto</span>
          <h2 className={styles.sectionTitle}>Doing the tea ceremony in Kyoto instead?</h2>
          <p className={styles.bodyText}>
            Book it in Kyoto if Kyoto is already on your route: the tea rooms sit in Gion, near Kiyomizu and
            Kinkaku-ji, in the streets you came to walk, and the Gion sessions on Klook include a kimono or seat
            you on chairs. The Kyoto tea rooms, their prices and which include a kimono are compared in our{" "}
            <Link href="/guides/attractions/kyoto-tea-ceremony" style={linkStyle}>tea ceremony in Kyoto</Link> guide.
            Pair it with a{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>Kyoto kimono rental</Link>, a{" "}
            <Link href="/guides/attractions/gion-night-walking-tour" style={linkStyle}>Gion night walking tour</Link>{" "}
            in the evening, or see the{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>Kyoto 3 day itinerary</Link> and{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>best things to do in Kyoto</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoGionKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Gion kimono ceremony →
            </KlookLink>
            <KlookLink href={kyotoGionChairTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Gion ceremony on chairs →
            </KlookLink>
            <KlookLink href={TEA_CEREMONY_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto tea ceremony near Kinkaku-ji →
            </KlookLink>
            <GygCompareButton slug="tea-ceremony-japan" listing={gygKyotoTeaCeremonies} />
          </div>
        </section>

        <KlookTripPrep
          label="Same day in Kyoto"
          heading="What should you book for the same day in Kyoto?"
          intro="A ceremony fills an hour or two, so the rest of a Kyoto day is yours to plan. These are the bookings that fit around it."
          items={teaCeremonySameDayPrep}
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
          heading="The Rest of a Kyoto Day"
          intro="If the ceremony is in Kyoto, it slots into a bigger day rather than filling one. Open a listing for the current price on your date."
          tours={[kyotoHighlightBusTour, kyotoNaraArashiyamaTour]}
        />

        <GygCompare
          slug="tea-ceremony-japan"
          heading="Tea Ceremonies on GetYourGuide"
          intro="A tea room seats a handful of people at a time, so these are among the first things to go in a busy week — and the venue matters more than the platform. GetYourGuide splits its listings by city, with the Japan-wide one worth using if your trip does not pass through Tokyo or Kyoto. The seating and pregnancy questions above apply whichever counter you book through."
          listings={[gygTokyoTeaCeremonies, gygKyotoTeaCeremonies, gygJapanTeaCeremonies]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 14h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-matcha-experiences" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h13v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
                  <path d="M17 11h2a2 2 0 0 1 0 4h-2" />
                  <path d="M6 6c0-1 1-1.5 1-2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Matcha Experiences in Japan (2026): Uji, Kyoto and Tokyo Tea Houses Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-cooking-class" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16" />
                  <path d="M5 12a7 7 0 0 1 14 0" />
                  <path d="M6 16h12l-1 4H7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Cooking Class (2026): Sushi &amp; Ramen Making — What to Expect</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M12 7v14" />
                  <path d="M8 3L5 9v8a2 2 0 0 0 2 2M16 3l3 6v8a2 2 0 0 1-2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan 2026: Prices, Best Cities &amp; How Far Ahead to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4 4 4-3 3v11H7V10L4 7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Which Area, What&apos;s Included, When to Return</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-maiko-dinner" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Maiko Dinner (2026): Types, Gion Rules &amp; Booking</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book a tea ceremony in Tokyo</h2>
            <p className={styles.ctaBannerDesc}>
              40 to 90 minutes in Asakusa, Shibuya, Meguro, Toyosu or a hotel tea room. Check the seating and the
              kimono return time when you book.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={asakusaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Check the Asakusa kimono tea ceremony →
              </KlookLink>
              <GygCompareButton slug="tea-ceremony-japan" listing={gygJapanTeaCeremonies} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
