import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import KlookTripPrep from "../../../components/KlookTripPrep";
import {
  asakusaKimonoTeaCeremony,
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

// Yen figures come only from each venue's own site, read on the date in CHECKED. Klook prices are
// never quoted: Klook answers automated reads of its product pages with HTTP 403, so Klook rows
// repeat the duration and inclusions from its search-indexed listing text and nothing else.
// No venue page read that day publishes a formal chaji or a temple zazen-and-tea session, so the
// page does not describe them.
const CHECKED = "7 November 2026";
const CHECKED_SHORT = "7 Nov 2026";
// The Tokyo rows: Klook listings read through the www.klook.com search index, and The Okura
// Tokyo and Maikoya Asakusa on their own sites, on this date. Hotel Chinzanso stays on CHECKED.
const TOKYO_CHECKED = "15 November 2026";
const TOKYO_CHECKED_SHORT = "15 Nov 2026";

const OKURA_URL = "https://theokuratokyo.jp/experiences-and-activities/tea-ceremony/";
const MAIKOYA_TOKYO_URL = "https://mai-ko.com/tour/tea-ceremony-and-kimono-experience-tokyo/";

const linkStyle = { color: "var(--red)", fontWeight: 600 };

type TokyoRow = {
  area: string;
  venue: string;
  time: string;
  kimono: string;
  english: string;
  cancel: string;
  book?: { label: string; href: string; klook: boolean };
};

// "If unsure, pick this" is the first row: the only Tokyo session that is on Klook, includes the
// kimono, states an English-speaking guide and states free cancellation.
const tokyoRows: TokyoRow[] = [
  {
    area: "Asakusa",
    venue: "Maikoya Asakusa — if unsure, pick this",
    time: "1 hr 30 min (60-min ceremony after dressing)",
    kimono: "Included; return by 18:00",
    english: "Yes, English-speaking guide",
    cancel: "Free cancellation 24 hours ahead",
    book: { label: "Check on Klook →", href: asakusaKimonoTeaCeremony.url, klook: true },
  },
  {
    area: "Asakusa",
    venue: "Table-style ceremony near Senso-ji",
    time: "About 90 minutes",
    kimono: "Included",
    english: "Not stated",
    cancel: "Shown on the listing",
    book: { label: "Check on Klook →", href: asakusaTableKimonoTeaCeremony.url, klook: true },
  },
  {
    area: "Shibuya",
    venue: "Cha An",
    time: "40–50 minutes",
    kimono: "None listed",
    english: "Not stated",
    cancel: "Shown on the listing",
    book: { label: "Check on Klook →", href: shibuyaChaAnTeaCeremony.url, klook: true },
  },
  {
    area: "Meguro",
    venue: "Aeru, two stops from Shibuya",
    time: "45 minutes",
    kimono: "None listed",
    english: "Yes, English-speaking host",
    cancel: "Shown on the listing",
    book: { label: "Check on Klook →", href: tokyoCasualTeaCeremony.url, klook: true },
  },
  {
    area: "Toyosu",
    venue: "Private room near teamLab Planets",
    time: "Shown on the listing",
    kimono: "None listed",
    english: "Yes, in English",
    cancel: "Shown on the listing",
    book: { label: "Check on Klook →", href: tokyoMatchaTeaCeremonyExpert.url, klook: true },
  },
  {
    area: "Not stated",
    venue: "Matcha and kimono workshop",
    time: "1 hr 30 min",
    kimono: "Included",
    english: "Not stated",
    cancel: "Cancelled with no refund if 10+ minutes late",
    book: { label: "Check on Klook →", href: tokyoMatchaKimonoTeaCeremony.url, klook: true },
  },
  {
    area: "Toranomon",
    venue: "The Okura Tokyo, Chosho-an",
    time: "About 60 minutes",
    kimono: "None listed",
    english: "Not stated",
    cancel: "Book 7+ days ahead (hotel)",
    book: { label: "Hotel booking page →", href: OKURA_URL, klook: false },
  },
  {
    area: "Bunkyo",
    venue: "Hotel Chinzanso Tokyo",
    time: "About 1 hour",
    kimono: "Optional, from ¥22,000",
    english: "Yes (also Chinese, Japanese)",
    cancel: "Book 10+ days ahead (hotel)",
  },
];

const tokyoPriceRows = [
  { venue: "The Okura Tokyo, Chosho-an (Toranomon)", session: "About 60 minutes, two or more guests, Tue/Thu/Sat 12:00, 13:30, 15:00", price: "¥5,000", note: "Tax and 15% service included; book 7+ days ahead", checked: TOKYO_CHECKED_SHORT },
  { venue: "The Okura Tokyo, Chosho-an", session: "About 30 minutes, matcha and sweet, no tea-making", price: "¥3,000", note: "By phone only", checked: TOKYO_CHECKED_SHORT },
  { venue: "Hotel Chinzanso Tokyo (Bunkyo)", session: "About 1 hour, price per group", price: "¥90,000 for 1–3 guests; ¥120,000 for 4–6; ¥180,000 for 7–12", note: "Kimono from ¥22,000 each; book 10+ days ahead", checked: CHECKED_SHORT },
  { venue: "Klook sessions (Asakusa, Shibuya, Meguro, Toyosu)", session: "40 minutes to 1 hr 30 min", price: "Shown on each listing", note: "Prices change by date", checked: TOKYO_CHECKED_SHORT },
];

const tokyoVsKyoto = [
  { point: "Verdict", tokyo: "Book here if Kyoto is not on your route, or if you only have an afternoon", kyoto: "Book here if you are going anyway: the tea rooms sit in the old streets" },
  { point: "Setting", tokyo: "Asakusa near Senso-ji, small tea rooms in Shibuya and Meguro, hotel tea rooms", kyoto: "Gion, Kiyomizu, near Kinkaku-ji and Ryoan-ji, in the old streets" },
  { point: "Choice on this page", tokyo: "6 Klook sessions and 2 hotel tea rooms", kyoto: "3 venues on their own sites and 4 Klook sessions" },
  { point: "Shortest session", tokyo: "40–50 minutes (Cha An, Shibuya)", kyoto: "20–30 minutes (TIA, Kiyomizu)" },
  { point: "Kimono", tokyo: "Included at the Asakusa sessions", kyoto: "Included in Gion; optional +¥3,000 at Tea Ceremony Koto" },
  { point: "Booking ahead", tokyo: "Okura 7 days, Chinzanso 10 days; Klook by calendar", kyoto: "Calendar or email; Camellia Garden charges peak rates in March, April, October, November" },
];

const formatRows = [
  { format: "Short matcha session", time: "20–30 minutes", starts: "Booked slot", includes: "Tea ceremony and matcha-making with an English guide", source: "TIA, Kiyomizu (Klook)" },
  { format: "Shared group ceremony", time: "45 minutes", starts: "11:45, 13:00, 14:15, 15:30, 16:45", includes: "A bowl made by the host, one you make yourself, organic Uji matcha, a dried sweet", source: "Tea Ceremony Koto, Kyoto (official)" },
  { format: "Table-seated ceremony", time: "50 minutes", starts: "Hourly 10:00–17:00, March to November; 11:00, 13:00, 15:00, 17:00 in winter", includes: "A performance, a sweet, a bowl you make yourself", source: "Camellia Garden, Kyoto (official)" },
  { format: "Hotel tea room", time: "About 60 minutes", starts: "Tue, Thu, Sat at 12:00, 13:30, 15:00", includes: "The ceremony, with tea-making", source: "The Okura Tokyo (official)" },
  { format: "Kimono and ceremony", time: "About 90 minutes", starts: "Booked slot; the ceremony starts about 30 minutes after dressing begins", includes: "Kimono and dressing, an English-guided ceremony, a bowl you make yourself, sweets", source: "Maikoya, Gion and Asakusa (official)" },
  { format: "Kimono, hair and ceremony", time: "1.5–2 hours", starts: "Booked slot", includes: "Kimono dressing and hair styling, then the ceremony, in a group of up to 10", source: "Orizuruya, Gion (Klook)" },
  { format: "Maiko ceremony", time: "2 hours 50 minutes", starts: "Booked slot", includes: "A maiko performance, matcha served by a maiko, a folding fan you make", source: "Gion-Shijo join-in (Klook)" },
];

const priceRows = [
  { venue: "Tea Ceremony Koto, near Kinkaku-ji, Kyoto", session: "Shared, 45 minutes", price: "¥3,300 (child 6–12 ¥2,500)", note: "Kimono +¥3,000" },
  { venue: "Tea Ceremony Koto, Kyoto", session: "Private, 45 minutes", price: "¥7,700 (solo ¥9,840)", note: "Kimono +¥3,000" },
  { venue: "Tea Ceremony Koto, Kyoto", session: "Private, ceremony with kimono and ikebana", price: "¥16,800 (solo ¥15,000)", note: "Child under 13 ¥13,000" },
  { venue: "Camellia Garden, near Ryoan-ji, Kyoto", session: "50 minutes, two or more guests", price: "¥15,000; ¥18,000 in peak months", note: "Solo ¥25,000 or ¥30,000; tax included" },
  { venue: "Maikoya, Gion", session: "About 90 minutes with kimono", price: "Varies by date", note: "Shown in the booking calendar" },
];

const compareRows = [
  { city: "Kyoto", area: "Gion / Kiyomizu (Maikoya)", time: "About 90 minutes", kimono: "Included", language: "English" },
  { city: "Kyoto", area: "Gion (Orizuruya, Klook)", time: "1.5–2 hours", kimono: "Included, with hair", language: "Not stated" },
  { city: "Kyoto", area: "Gion, on chairs (Klook)", time: "1 hour", kimono: "None listed", language: "Not stated" },
  { city: "Kyoto", area: "Kiyomizu (TIA, Klook)", time: "20–30 minutes", kimono: "Rental shop next door", language: "English" },
  { city: "Kyoto", area: "Kinkaku-ji (Tea Ceremony Koto)", time: "45 minutes", kimono: "Optional, +¥3,000", language: "English" },
  { city: "Kyoto", area: "Ryoan-ji (Camellia Garden)", time: "50 minutes", kimono: "Not available", language: "Not stated" },
  { city: "Tokyo", area: "Asakusa (Maikoya)", time: "About 90 minutes", kimono: "Included", language: "English" },
  { city: "Tokyo", area: "Asakusa, at tables (Klook)", time: "About 90 minutes", kimono: "Included", language: "Not stated" },
  { city: "Tokyo", area: "Toranomon (The Okura Tokyo)", time: "About 60 minutes", kimono: "None listed", language: "Not stated" },
  { city: "Tokyo", area: "Bunkyo (Hotel Chinzanso)", time: "About 1 hour", kimono: "Optional, from ¥22,000", language: "English, Chinese, Japanese" },
];

const whoFor = [
  {
    title: "Go in Kyoto if…",
    desc: "You want the most atmospheric setting. Kyoto is the home of the tea ceremony and of nearby Uji matcha, with traditional tea rooms around Gion, Kiyomizu, and Daitoku-ji. It pairs naturally with a kimono rental for a fully traditional half-day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 21h14" />
        <path d="M6 21V10l6-4 6 4v11" />
        <path d="M10 21v-5h4v5" />
      </svg>
    ),
  },
  {
    title: "Go in Tokyo if…",
    desc: "You're short on time or not visiting Kyoto. Tokyo has plenty of beginner-friendly venues with English-speaking hosts, easy to fit into a city day. You still get the full ritual — whisking matcha and a seasonal sweet — in a convenient central location.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="9" width="18" height="11" rx="2" />
        <path d="M7 9V6a5 5 0 0 1 10 0v3" />
      </svg>
    ),
  },
  {
    title: "Choose carefully if…",
    desc: "You have mobility needs or are pregnant. Some ceremonies involve kneeling (seiza) and, where kimono is included, dressing — so certain venues advise against attendance during pregnancy. Many offer chair-based seating; confirm what's available before you book.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Choose your city and setting",
    desc: "Kyoto offers the most traditional atmosphere — historic tea rooms in Gion or near Kiyomizu, in the Uji matcha heartland — while Tokyo has convenient, beginner-friendly venues that slot easily into a busy itinerary. Decide which fits your route first.",
  },
  {
    title: "Pick a session length and format",
    desc: `Most sessions run 45 to 60 minutes, and the format matters more than the length. One Kyoto listing on Klook, a few steps from Kinkaku-ji, runs 45 minutes to an hour with a second-degree Urasenke-school instructor: you are served organic Uji matcha first, then given a hands-on lesson in whisking your own, with a traditional sweet. Sessions of 20 to 30 minutes are the compact version. Details as listed on ${CHECKED}.`,
  },
  {
    title: "Check seating and any restrictions",
    desc: "Traditional seating is on tatami in the kneeling seiza position. Chairs are the default at some venues and on request at others, so ask when you book if you need one. Some ceremonies, especially those combined with kimono, advise against attendance during pregnancy, so check the policy.",
  },
  {
    title: "Consider pairing it with a kimono",
    desc: `A popular combination is to rent a kimono and attend a tea ceremony in it, which makes one cultural half-day out of two short bookings. Some venues bundle it: Maikoya keeps the kimono with you until 18:00 the same day, and one Kyoto listing on Klook has you wear it for the session only and return it before you leave. Checked ${CHECKED}.`,
  },
  {
    title: "Book ahead, and earlier in spring and autumn",
    desc: `The Okura Tokyo asks for at least 7 days' notice and Hotel Chinzanso Tokyo at least 10. Tea Ceremony Koto takes online bookings or email, and Maikoya shows open slots in its booking calendar. Camellia Garden charges its peak rate in March, April, October, November and over New Year, which are the months to book first. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "Where can I do a tea ceremony in Tokyo?",
    a: `In Asakusa, where Maikoya and a table-style tea room near Senso-ji run kimono-and-ceremony sessions; in Shibuya at Cha An; in Meguro, two stops from Shibuya; in Toyosu near teamLab Planets; and in the hotel tea rooms of The Okura Tokyo in Toranomon and Hotel Chinzanso Tokyo. Checked ${TOKYO_CHECKED}.`,
  },
  {
    q: "How much does a tea ceremony in Tokyo cost?",
    a: `The Okura Tokyo charges ¥5,000 per person for about 60 minutes (minimum two guests, tax and service included) and ¥3,000 for a 30-minute session without the tea-making, booked by phone. Hotel Chinzanso Tokyo charges per group, from ¥90,000 for up to three guests (checked ${CHECKED}). Klook sessions show the price for your date on each listing. Okura checked ${TOKYO_CHECKED}.`,
  },
  {
    q: "How long does a Japanese tea ceremony experience take?",
    a: `40 to 60 minutes for the ceremony alone in Tokyo — Cha An in Shibuya lists 40 to 50 minutes, the Meguro session 45 and The Okura Tokyo about 60 — and about 90 minutes with a kimono, because dressing comes first. At Maikoya Asakusa the ceremony starts about 30 minutes after your booked time. Checked ${TOKYO_CHECKED}.`,
  },
  {
    q: "Can I wear a kimono for the tea ceremony?",
    a: `Yes. The Asakusa sessions include one: Maikoya lets you keep it on until 18:00, so you can walk Asakusa in it afterwards. Hotel Chinzanso Tokyo offers kimono from ¥22,000 each. For a session without one, such as Shibuya, rent a kimono in Asakusa first. A kimono is never required: wear modest clothes and socks. Checked ${TOKYO_CHECKED}.`,
  },
  {
    q: "Should I do the tea ceremony in Tokyo or Kyoto?",
    a: "Kyoto if it is already on your route, because the tea rooms sit in Gion and near Kinkaku-ji, in the streets you came to walk. Tokyo if it is not, or if you have only an afternoon: Asakusa offers the same kimono-and-ceremony format and Shibuya has a 40-to-50-minute session.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tea-ceremony-japan") } });

export default function TeaCeremonyJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Tea Ceremony in Tokyo 2026: Best Experiences & Prices</title>
        <meta
          name="description"
          content="Tea ceremony Tokyo: a Japanese tea ceremony experience in Asakusa, Shibuya or a hotel tea room takes 40–90 min, ¥5,000 at The Okura. Compare and book."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tea-ceremony-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tea Ceremony in Tokyo 2026: Best Experiences & Prices" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tea-ceremony-japan" />
        <meta property="og:description" content="Tea ceremony Tokyo: a Japanese tea ceremony experience in Asakusa, Shibuya or a hotel tea room takes 40–90 min, ¥5,000 at The Okura. Compare and book." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tea Ceremony in Tokyo 2026: Best Experiences & Prices" />
        <meta name="twitter:description" content="Tea ceremony Tokyo: a Japanese tea ceremony experience in Asakusa, Shibuya or a hotel tea room takes 40–90 min, ¥5,000 at The Okura. Compare and book." />
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
              headline: "Tea Ceremony in Tokyo 2026: Best Experiences & Prices",
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
            Tea Ceremony in Tokyo: <br />Best Experiences, Prices &amp; Kyoto Options
          </h1>
          <p className={styles.heroSubtitle}>
            Where to book a Japanese tea ceremony experience in Tokyo — Asakusa, Shibuya, Meguro, Toyosu and the
            hotel tea rooms — how long each takes, which include a kimono, and when Kyoto is the better choice.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Beginner-Friendly", "Tokyo first, Kyoto below"].map((t) => (
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
            A tea ceremony in Tokyo takes 40 to 60 minutes on its own, or about 90 minutes with a kimono, and the
            main places to book one are Asakusa (kimono included), Shibuya, Meguro, Toyosu and the tea rooms of
            The Okura Tokyo and Hotel Chinzanso. The Okura Tokyo charges ¥5,000 per person for about 60 minutes and
            asks for at least 7 days&apos; notice; the Klook sessions are booked by date on each listing, and Maikoya
            Asakusa allows free cancellation up to 24 hours before. Checked {TOKYO_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Doing it in Kyoto instead? Go to{" "}
            <a href="#tokyo-or-kyoto" style={linkStyle}>Tokyo or Kyoto</a> for the Kyoto venues and prices.
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
                <p className={styles.verdictStatValue}>Asakusa, Shibuya, Meguro, Toyosu, hotels</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>40–60 min; about 90 with kimono</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price</p>
                <p className={styles.verdictStatValue}>¥5,000 at The Okura Tokyo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Good to know</p>
                <p className={styles.verdictStatValue}>Seiza; pregnancy limits at some venues</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> no background is needed. In Tokyo, Asakusa is the place for a ceremony
              in kimono and Shibuya for a short one; Kyoto gives you the most traditional setting if it is on your
              route. The two things to check
              before booking are the seating, because much of it is <em>seiza</em>, kneeling, and any pregnancy
              restrictions the venue lists.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TEA_CEREMONY_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Browse Tea Ceremony Experiences →
              </KlookLink>
              <GygCompareButton slug="tea-ceremony-japan" listing={gygJapanTeaCeremonies} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Tokyo comparison — added 15 Nov 2026 (R03) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tokyo</span>
          <h2 className={styles.sectionTitle}>Where can I do a tea ceremony in Tokyo?</h2>
          <p className={styles.bodyText}>
            In Asakusa for a ceremony in kimono, in Shibuya or Meguro for a short session without one, and at The
            Okura Tokyo or Hotel Chinzanso for a hotel tea room. If you are unsure, Maikoya Asakusa is the one
            session here that includes the kimono, states an English-speaking guide and allows free cancellation.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Session", "How long", "Kimono", "English", "Cancellation / notice", "Book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tokyoRows.map((row) => (
                    <tr key={row.venue}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.venue}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.kimono}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.english}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cancel}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>
                        {row.book ? (
                          row.book.klook ? (
                            <KlookLink href={row.book.href} target="_blank" rel="sponsored nofollow noopener" style={linkStyle}>
                              {row.book.label}
                            </KlookLink>
                          ) : (
                            <a href={row.book.href} target="_blank" rel="noopener" style={linkStyle}>
                              {row.book.label}
                            </a>
                          )
                        ) : (
                          "Through the hotel"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {TOKYO_CHECKED} (Hotel Chinzanso: {CHECKED}). Klook rows repeat the duration, inclusions
            and cancellation terms each listing states, and no Klook price; &ldquo;Not stated&rdquo; and &ldquo;Shown
            on the listing&rdquo; mean the listing text did not give it, so confirm on the listing for your date.
            Official pages:{" "}
            <a href={OKURA_URL} target="_blank" rel="noopener" style={linkStyle}>The Okura Tokyo tea ceremony</a>,{" "}
            <a href={MAIKOYA_TOKYO_URL} target="_blank" rel="noopener" style={linkStyle}>Maikoya Asakusa</a>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={asakusaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Asakusa kimono ceremony →
            </KlookLink>
            <KlookLink href={shibuyaChaAnTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book Cha An in Shibuya →
            </KlookLink>
            <GygCompareButton slug="tea-ceremony-japan" listing={gygTokyoTeaCeremonies} />
          </div>
        </section>

        {/* Tokyo price */}
        <section className={styles.comparisonSection} id="tokyo-price">
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How much does a tea ceremony in Tokyo cost?</h2>
          <p className={styles.bodyText}>
            ¥5,000 per person for about 60 minutes at The Okura Tokyo, the one Tokyo venue here that publishes a
            per-person price, or ¥3,000 for a 30-minute bowl and sweet without the tea-making. Klook sessions show
            the price for your date on each listing.
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
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {TOKYO_CHECKED} on{" "}
            <a href={OKURA_URL} target="_blank" rel="noopener" style={linkStyle}>theokuratokyo.jp</a>; Hotel
            Chinzanso on its own site, {CHECKED}. Klook prices are shown on each listing, not here.
          </p>
        </section>

        {/* Kimono */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kimono</span>
          <h2 className={styles.sectionTitle}>Can I wear a kimono for the tea ceremony?</h2>
          <p className={styles.bodyText}>
            Yes: the two Asakusa sessions and the Klook matcha-and-kimono workshop include one. At Maikoya Asakusa
            your booked time is the start of dressing, the ceremony begins about 30 minutes later, the whole visit
            takes about 90 minutes, and you can keep the kimono on until 18:00. Guests must be 7 or older. Checked{" "}
            {TOKYO_CHECKED} on{" "}
            <a href={MAIKOYA_TOKYO_URL} target="_blank" rel="noopener" style={linkStyle}>mai-ko.com</a>.
          </p>
          <p className={styles.bodyText}>
            For Shibuya, Meguro or a hotel tea room, none of which lists a kimono, rent one first: our{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental" style={linkStyle}>Asakusa kimono rental</Link>{" "}
            guide compares return times, which decide how late a ceremony slot can be.
          </p>
        </section>

        <KlookTripPrep
          label="Same day in Tokyo"
          heading="What should you book for the same day in Tokyo?"
          intro="A Tokyo tea ceremony fills 40 minutes to an hour and a half, so the rest of the day is yours. These are the bookings that fit around it."
          items={teaCeremonyTokyoSameDayPrep}
        />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What happens at a Japanese tea ceremony?</h2>
          <p className={styles.bodyText}>
            The Japanese tea ceremony — <strong>chanoyu</strong>, or <strong>sado</strong>, &ldquo;the way of
            tea&rdquo; — is the careful preparation and serving of matcha, powdered green tea whisked to a froth and
            served with a seasonal sweet. More than a drink, it&apos;s a practice of hospitality, attentiveness, and
            seasonal beauty, refined over centuries. For visitors, that tradition is distilled into a short, guided
            experience that anyone can enjoy.
          </p>
          <p className={styles.bodyText}>
            You don&apos;t need any background to take part. Sessions are designed for beginners, hosts usually speak
            English, and the focus is on the experience itself — the taste of the matcha, the quiet of the room, and
            the small, deliberate movements of the ritual. Typically the host prepares a bowl, you are served a
            sweet and the matcha, and at most visitor sessions you then whisk your own.
          </p>
          <p className={styles.bodyText}>
            This guide covers the ceremony itself: the etiquette, the time and the booking. For the tea, meaning
            Uji, Wazuka and grinding matcha on a stone mill, see our{" "}
            <Link href="/guides/attractions/japan-matcha-experiences" style={linkStyle}>matcha experiences guide</Link>.
          </p>
        </section>

        {/* Duration */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Time</span>
          <h2 className={styles.sectionTitle}>How long does a Japanese tea ceremony experience take?</h2>
          <p className={styles.bodyText}>
            40 to 60 minutes for the ceremony alone, and about 90 minutes to 2 hours with a kimono, because
            dressing takes the first half hour. In Tokyo, Cha An in Shibuya lists 40 to 50 minutes and The Okura
            Tokyo about 60 (checked {TOKYO_CHECKED}); the table below adds the Kyoto formats, where a maiko session
            takes close to 3 hours.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Format", "How long", "Start times", "Includes", "Source", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {formatRows.map((row) => (
                    <tr key={row.format}>
                      <td className={styles.tdProvider}>{row.format}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.starts}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.includes}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{CHECKED_SHORT}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From each venue&apos;s own site, or Klook&apos;s search-indexed listing text where marked, checked{" "}
            {CHECKED}. &ldquo;Booked slot&rdquo; means the times appear only in the booking calendar.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection} id="tokyo-or-kyoto">
          <span className={styles.sectionLabel}>Tokyo or Kyoto</span>
          <h2 className={styles.sectionTitle}>Should I do the tea ceremony in Tokyo or Kyoto?</h2>
          <p className={styles.bodyText}>
            Kyoto if you are going anyway, because the tea rooms sit in the old streets you came to walk. Tokyo if
            you are not, because Asakusa offers the same kimono-and-ceremony format and fits into a city day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Tokyo", "Kyoto"].map((h) => (
                      <th key={h || "point"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tokyoVsKyoto.map((row) => (
                    <tr key={row.point}>
                      <td className={styles.tdProvider}>{row.point}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tokyo}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.kyoto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: Tokyo {TOKYO_CHECKED}, Kyoto {CHECKED}, from the venues&apos; own sites and the Klook
            listings in the tables on this page.
          </p>
          <p className={styles.bodyText}>
            Looking for a tea experience in Kyoto that goes beyond the ceremony — Uji, the tea fields of Wazuka, or
            grinding matcha on a stone mill? That is in our{" "}
            <Link href="/guides/attractions/japan-matcha-experiences" style={linkStyle}>matcha experiences in Uji and Kyoto</Link>{" "}
            guide. The Kyoto tea rooms, with their own prices, are below.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["City", "Area and venue", "How long", "Kimono", "Language", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.city}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.kimono}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.language}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{CHECKED_SHORT}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            &ldquo;Not stated&rdquo; means the page read did not name a language, so confirm it before you
            book. Venues change their plans, so check the listing for your date. Checked {CHECKED}.
          </p>
        </section>

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How much is a tea ceremony experience in Kyoto?</h2>
          <p className={styles.bodyText}>
            From ¥3,300 per adult for a shared session to ¥15,000 to ¥18,000 at a garden tea house, on the
            prices the venues publish themselves. For Tokyo prices, see{" "}
            <a href="#tokyo-price" style={linkStyle}>how much a tea ceremony in Tokyo costs</a>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Venue", "Session", "Price per person", "Note", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
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
            Official prices from each venue&apos;s own site, checked {CHECKED}. Camellia&apos;s peak rate applies in
            March, April, October, November and over New Year. Klook prices are shown on each listing, not here.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Which tea ceremony should you choose?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoGionKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Gion kimono ceremony →
            </KlookLink>
            <KlookLink href={kyotoGionChairTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Gion ceremony on chairs →
            </KlookLink>
            <KlookLink href={asakusaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Asakusa kimono ceremony →
            </KlookLink>
            <KlookLink href={asakusaTableKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the Asakusa ceremony at tables →
            </KlookLink>
            <KlookLink href={TEA_CEREMONY_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Browse Tea Ceremony Experiences →
            </KlookLink>
            <GygCompareButton slug="tea-ceremony-japan" listing={gygKyotoTeaCeremonies} />
          </div>
        </section>

        {/* Time of day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>What time of day is best for a tea ceremony?</h2>
          <p className={styles.bodyText}>
            None of the venue pages names a best hour, so choose the slot that fits your day. With a kimono, take
            a morning or early-afternoon slot: Maikoya&apos;s rental ends at 18:00, so an earlier start leaves time
            to walk in it afterwards. Without one, a late slot works well. Tea Ceremony Koto&apos;s last session
            starts at 16:45 and Camellia Garden&apos;s at 17:00, which leaves the evening for a{" "}
            <Link href="/guides/attractions/gion-night-walking-tour" style={linkStyle}>Gion night walking tour</Link>.
            Camellia Garden has fewer slots in winter and closes on winter Sundays. For where a ceremony fits in a
            longer stay, see our{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>Kyoto 3 day itinerary</Link>.
            Checked {CHECKED}.
          </p>
        </section>

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do you book a tea ceremony in Japan?</h2>
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
            <KlookLink href={kyotoGionKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Gion kimono ceremony on Klook →
            </KlookLink>
            <KlookLink href={kyotoGionChairTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Gion ceremony on chairs →
            </KlookLink>
            <KlookLink href={asakusaKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Asakusa kimono ceremony on Klook →
            </KlookLink>
            <KlookLink href={asakusaTableKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Asakusa ceremony at tables →
            </KlookLink>
            <KlookLink href={TEA_CEREMONY_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Browse Tea Ceremony Experiences →
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

        {/* Good to know */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Good to know</span>
          <h2 className={styles.sectionTitle}>Do you have to kneel at a tea ceremony?</h2>
          <p className={styles.bodyText}>
            No, not at every visitor session. The traditional posture is seiza, kneeling on tatami, but Maikoya
            says you need not stay in it and offers chairs on request, subject to availability. Camellia Garden
            seats up to 10 guests at tables and chairs, and the one-hour Gion session on Klook is held on chairs
            throughout. Ask when you book. Some ceremonies involve kneeling and, where a kimono is included,
            being dressed in one, so certain venues advise against attendance during pregnancy. Checked{" "}
            {CHECKED}.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Dress</span>
          <h2 className={styles.sectionTitle}>What should I wear to a tea ceremony?</h2>
          <p className={styles.bodyText}>
            Modest clothes and socks. Maikoya&apos;s etiquette guide says everyone must wear socks, because shoes
            are not allowed on tatami. It says to avoid hats, ripped jeans and sleeveless tops, and warns that
            shorts can leave red marks from the cushion and the floor. Shoes that slip off easily save time at the
            door. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            To wear a kimono instead, book it with the ceremony or rent one first: see our{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>Kyoto kimono rental</Link> and{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental" style={linkStyle}>Asakusa kimono rental</Link>{" "}
            guides for return times, or the wider{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>kimono rental</Link> guide. For
            more ideas in the city, see our{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>best things to do in Kyoto</Link>{" "}
            guide.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Can children join a tea ceremony?</h2>
          <p className={styles.bodyText}>
            Yes, but the minimum age varies. Maikoya takes guests aged 7 and up, in Asakusa as well as Gion.
            Camellia Garden&apos;s sessions are typically for ages 4 and up, and it asks families with younger
            children to get in touch. Tea Ceremony Koto does not take babies aged 0 to 2 in its shared session,
            charges ¥2,500 for ages 6 to 12, may ask a crying child to wait in the next room, and suggests a
            private plan for families with small children. Checked {CHECKED}.
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
          heading="The Rest of a Kyoto Day"
          intro="A ceremony takes an hour or two, so it slots into a bigger day rather than filling one. Open a listing for the current price on your date."
          tours={[kyotoHighlightBusTour, kyotoNaraArashiyamaTour]}
        />

        {/* This guide covers more than one city, which is why the GetYourGuide side gets
            three lists rather than one. The Klook link and the seating and pregnancy
            advice above are unchanged. */}
        <GygCompare
          slug="tea-ceremony-japan"
          heading="Tea Ceremonies on GetYourGuide"
          intro="A tea room seats a handful of people at a time, so these are among the first things to go in a busy week — and the venue matters more than the platform. GetYourGuide splits its listings by city, with the Japan-wide one worth using if your trip does not pass through Kyoto or Tokyo. The seating and pregnancy questions above apply whichever counter you book through."
          listings={[gygKyotoTeaCeremonies, gygTokyoTeaCeremonies, gygJapanTeaCeremonies]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 8 Nov 2026: dinner with a maiko, booked as a tour. */}
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
            {/* Added 4 Nov 2026: the Gion evening as a booked tour. */}
            <Link href="/guides/attractions/gion-night-walking-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Gion Night Walking Tour 2026: Times, Types &amp; Photo Rules</p>
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
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M12 7v14" />
                  <path d="M8 3L5 9v8a2 2 0 0 0 2 2M16 3l3 6v8a2 2 0 0 1-2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan 2026: Prices, Where to Rent &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2 4 4 .5-3 3 .8 4L12 17l-3.8 1.5.8-4-3-3 4-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing &amp; What to Book</p>
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
            <h2 className={styles.ctaBannerTitle}>Sit down to the way of tea</h2>
            <p className={styles.ctaBannerDesc}>
              A beginner-friendly ceremony in Tokyo or Kyoto takes about an hour. Check seating and any pregnancy
              restrictions when you book, and consider pairing it with a kimono.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TEA_CEREMONY_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Browse Tea Ceremony Experiences →
              </KlookLink>
              <GygCompareButton slug="tea-ceremony-japan" listing={gygJapanTeaCeremonies} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
