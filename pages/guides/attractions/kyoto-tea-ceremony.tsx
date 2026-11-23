import type { ReactNode } from "react";
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
  kyotoCityFushimiArashiyamaTour,
  kyotoGionChairTeaCeremony,
  kyotoGionKimonoTeaCeremony,
  kyotoKimonoAiwafukuGion,
  kyotoKimonoAiwafukuKiyomizu,
  kyotoTeaCeremonyTastingMaking,
  kyotoTeaTripPrep,
  kyotoTraditionalTeaCeremonyUrl,
  ujiTaihoanWalkingTour,
  ujiTeaCeremonyKyotoDayTourFromOsaka,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kyoto tea ceremony, added 23 Nov 2026 (task-jtk-20261123-02).
 *
 * Split from tea-ceremony-japan, which became the Tokyo places page on 22 Nov (R05):
 * this page takes the "tea ceremony kyoto" / "tea experience kyoto" queries, and
 * tea-ceremony-japan links here from its Kyoto section.
 *
 * Read on the operators' own sites, 23 Nov 2026 (node fetch):
 *   tea-kyoto.com (Camellia)
 *     /flower-general-information  Flower Teahouse, Ninenzaka: 45-minute sessions on the
 *       hour 10:00–17:00; shared ¥4,000 adult off peak / ¥5,000 in March, April, October,
 *       November and the New Year period; children 6–12 ¥2,500 / ¥3,000; shared room
 *       ages 6+, max 8; private ¥8,000 / ¥10,000 per person (one guest ¥15,000 /
 *       ¥17,000), ages 4+, max 5; kimono +¥6,000; performed in English; tax included.
 *     /garden-general-information  Garden Teahouse by Ryoan-ji: private only, 50 minutes,
 *       ¥15,000 / ¥18,000 per person for 2+ (one guest ¥25,000 / ¥30,000); no kimono.
 *     /kimonoplan  ¥6,000, whole-day rental, dressing 1 hour before the ceremony.
 *     /cancellation-policy  full refund up to 3 days before; none after.
 *   mai-ko.com  Maikoya Gion Kiyomizu and Maikoya Nishiki kimono tea ceremonies:
 *     approx. 90 minutes, ceremony about 30 minutes after the booked time, kimono until
 *     18:00, English shared session, ages 7+, price by date in the booking calendar.
 *   kyoto-uji-kankou.or.jp/taihoan-en.html  Taihoan (Uji City): usucha ¥1,500, 20–30 min;
 *     matcha otemae taiken ¥3,600, about 40 min, 3 days' notice; 10:00–16:00,
 *     10 January–20 December.
 *   experience.fukujuen.com  Uji Kobo stone-mill matcha ¥2,200, 40 min, 11:00–16:00
 *     (last admission 15:00), reservations preferred.
 * Kyoto Station to JR Uji about 16 min by JR Nara Line rapid (Uji City, as on
 * kyoto-3-day-itinerary). No Klook price appears on the page.
 */

const CHECKED = checkedLabel("2026-11-23");

const ROUTE = "/guides/attractions/kyoto-tea-ceremony";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const CAMELLIA_FLOWER_URL = "https://tea-kyoto.com/flower-general-information";
const CAMELLIA_GARDEN_URL = "https://tea-kyoto.com/garden-general-information";
const CAMELLIA_KIMONO_URL = "https://tea-kyoto.com/kimonoplan";
const CAMELLIA_CANCEL_URL = "https://tea-kyoto.com/cancellation-policy";
const MAIKOYA_GION_URL = "https://mai-ko.com/tour/kimono-tea-ceremony-gion-kiyomizu-at-the-registered-cultural-property/";
const MAIKOYA_NISHIKI_URL = "https://mai-ko.com/tour/tea-ceremony-and-kimono-experience-kyoto/";
const TAIHOAN_URL = "https://kyoto-uji-kankou.or.jp/taihoan-en.html";
const FUKUJUEN_URL = "https://experience.fukujuen.com/en/modelcourse/ujikoubou-make-uji-tea/";

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Room = { name: ReactNode; area: string; length: string; price: string; kimono: string; english: string };

const rooms: Room[] = [
  {
    name: <>{ext(CAMELLIA_FLOWER_URL, "Camellia Flower Teahouse")} — shared</>,
    area: "Higashiyama: Ninenzaka, between Kiyomizu-dera and Gion",
    length: "45 min, on the hour 10:00–17:00",
    price: "¥4,000 adult (¥5,000 in Mar, Apr, Oct, Nov and New Year); ¥2,500 / ¥3,000 ages 6–12",
    kimono: "Optional, +¥6,000, all day",
    english: "Yes — performed in English",
  },
  {
    name: <>{ext(CAMELLIA_FLOWER_URL, "Camellia Flower Teahouse")} — private</>,
    area: "Higashiyama: Ninenzaka",
    length: "45 min",
    price: "¥8,000 per person (¥10,000 in peak months); one guest alone ¥15,000 / ¥17,000",
    kimono: "Optional, +¥6,000, all day",
    english: "Yes",
  },
  {
    name: ext(CAMELLIA_GARDEN_URL, "Camellia Garden Teahouse"),
    area: "North-west: a minute from Ryoan-ji, near Kinkaku-ji",
    length: "50 min, private only",
    price: "¥15,000 per person for 2+ (¥18,000 in peak months); one guest ¥25,000 / ¥30,000",
    kimono: "Not available",
    english: "Yes",
  },
  {
    name: ext(MAIKOYA_GION_URL, "Maikoya Gion Kiyomizu"),
    area: "Gion and Kiyomizu, in a registered cultural property",
    length: "About 90 min with kimono dressing",
    price: "Varies by date — shown in the booking calendar",
    kimono: "Included, keep it until 18:00",
    english: "Yes — shared session in English; ages 7+",
  },
  {
    name: ext(MAIKOYA_NISHIKI_URL, "Maikoya Nishiki"),
    area: "Central Kyoto, by Nishiki Market",
    length: "About 90 min with kimono dressing",
    price: "Varies by date — shown in the booking calendar",
    kimono: "Included, keep it until 18:00",
    english: "Yes — shared session in English; ages 7+",
  },
  {
    name: ext(TAIHOAN_URL, "Taihoan (Uji City tea house)"),
    area: "Uji, by the Uji River near Byodo-in",
    length: "Usucha 20–30 min; making your own matcha about 40 min",
    price: "¥1,500 usucha; ¥3,600 matcha-making (3 days' notice)",
    kimono: "Not offered",
    english: "English booking page; host language not stated",
  },
  {
    name: ext(FUKUJUEN_URL, "Fukujuen Uji Kobo — stone mill"),
    area: "Uji",
    length: "40 min",
    price: "¥2,200 — grind on a stone mill, then drink it (a workshop, not a ceremony)",
    kimono: "Not offered",
    english: "English page; host language not stated",
  },
];

type BookRow = { place: string; how: string; cancel: string; fills: string };

const bookRows: BookRow[] = [
  {
    place: "Camellia (Flower and Garden)",
    how: "Online calendar on tea-kyoto.com; kimono booked with the ceremony",
    cancel: "Full refund up to 3 days before; none after. Kimono alone cancellable 72 h ahead",
    fills: "Shared room holds 8; March, April, October, November and New Year are its peak-price months",
  },
  {
    place: "Maikoya Gion Kiyomizu / Nishiki",
    how: "Booking calendar on mai-ko.com, price per date",
    cancel: "Per Maikoya's cancellation and rescheduling policy page",
    fills: "Morning slots leave the most daylight in kimono — return is 18:00 whatever time you start",
  },
  {
    place: "Taihoan, Uji",
    how: "Reservation form on the Uji City Tourist Association site",
    cancel: "Not stated on the English page",
    fills: "Closed 21 December – 9 January; the matcha-making session needs 3 days' notice",
  },
  {
    place: "Klook listings (Gion and Kyoto)",
    how: "Date and time on the listing",
    cancel: "Set per listing — read it before paying",
    fills: "Small groups (the Gion kimono session caps at 10)",
  },
];

const faqItems = [
  {
    q: "Where can I do a tea ceremony in Kyoto?",
    a: `In Higashiyama, at Camellia's Flower Teahouse on Ninenzaka between Kiyomizu-dera and Gion; in Gion and by Nishiki Market at Maikoya, with a kimono included; near Ryoan-ji and Kinkaku-ji at Camellia's Garden Teahouse, private only; and in Uji, 16 minutes from Kyoto Station by JR, at Taihoan, the city's own tea house. Checked ${CHECKED} on each operator's site.`,
  },
  {
    q: "How much is a tea ceremony in Kyoto?",
    a: `¥1,500 to ¥5,000 per person for a shared session where the price is published: Camellia's 45-minute shared ceremony is ¥4,000, or ¥5,000 in March, April, October, November and the New Year period, and a bowl of usucha at Taihoan in Uji is ¥1,500 (¥3,600 to make your own). Private rooms start at ¥8,000 per person. Maikoya prices by date in its calendar. Checked ${CHECKED}.`,
  },
  {
    q: "Kyoto or Uji for a matcha experience?",
    a: "Kyoto for the ceremony in a machiya tea room on the way between temples; Uji for the tea itself. Uji is about 16 minutes from Kyoto Station on the JR Nara Line rapid, and its experiences are cheaper and shorter — ¥1,500 at Taihoan, ¥2,200 to grind matcha on a stone mill at Fukujuen — but none includes a kimono and Taihoan closes from 21 December to 9 January.",
  },
  {
    q: "Do I need to wear a kimono for a tea ceremony in Kyoto?",
    a: `No. Clean socks and clothes you can sit in are enough. If you want one, Maikoya includes it and lets you keep it until 18:00, and Camellia's Flower Teahouse adds a full-day kimono for ¥6,000 with dressing an hour before the ceremony. Camellia's Garden Teahouse and the Uji tea houses do not dress you. Checked ${CHECKED}.`,
  },
  {
    q: "Is a Kyoto tea ceremony OK for kids?",
    a: "Yes, from the minimum age of each room: Camellia's shared ceremony takes children from 6 (¥2,500, ¥3,000 in peak months), its private rooms from 4, and Maikoya from 7. Under those ages, ask the operator first — Camellia says it cannot host children of 3 and under in the Flower Teahouse.",
  },
  {
    q: "How long does a tea ceremony in Kyoto take?",
    a: "45 to 50 minutes for the ceremony alone at Camellia, about 90 minutes at Maikoya because kimono dressing comes first and the ceremony starts about 30 minutes after your booked time, and 20 to 40 minutes at Taihoan in Uji.",
  },
  {
    q: "How far ahead should I book a Kyoto tea ceremony?",
    a: "A few days outside the busy months; earlier for March, April, October, November and New Year, which Camellia prices as its peak. Shared rooms are small — eight guests at Camellia, ten on the Gion kimono listing — and Camellia refunds in full only up to three days before. Taihoan's matcha-making session needs three days' notice.",
  },
];

const TITLE = "Kyoto Tea Ceremony Experience 2026: Prices & Where to Book";
const DESCRIPTION =
  "Kyoto tea ceremony experience: ¥4,000–¥5,000 for 45 min near Ninenzaka, kimono sessions in Gion, ¥1,500 at Uji's Taihoan — official prices by area.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/tea-ceremony-japan", title: "Tea Ceremony in Tokyo (2026): 8 Places, Prices & How to Book" },
  { href: "/guides/attractions/japan-matcha-experiences", title: "Matcha Experiences in Japan: Uji, Kyoto and Tokyo" },
  { href: "/guides/attractions/kyoto-kimono-rental", title: "Kyoto Kimono Rental: Shop Prices Compared" },
  { href: "/guides/attractions/gion-night-walking-tour", title: "Gion Night Walking Tour" },
  { href: "/guides/attractions/kyoto-maiko-dinner", title: "Kyoto Maiko Dinner" },
  { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary" },
  { href: "/guides/attractions/kyoto-cooking-class", title: "Kyoto Cooking Class" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
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

export default function KyotoTeaCeremonyPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kyoto Tea Ceremony", item: URL },
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Kyoto Tea Ceremony</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kyoto Tea Ceremony Experience 2026: <br />Prices &amp; Where to Book
          </h1>
          <p className={styles.heroSubtitle}>
            The Kyoto tea rooms that publish their prices, by area — Higashiyama, Gion, the north-west temples and
            Uji — with session length, whether a kimono is included and who teaches in English.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Prices from each operator's own site", "7 tea rooms compared"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Shared session</p>
                <p className={styles.verdictStatValue}>¥1,500–¥5,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>45 min; 90 with kimono</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>First time</p>
                <p className={styles.verdictStatValue}>Higashiyama or Gion</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Kyoto tea ceremony experience</strong> takes about 45 minutes and costs{" "}
              <strong>¥1,500 to ¥5,000</strong> per person at the shared sessions whose operators publish a price:
              Camellia&apos;s Flower Teahouse on Ninenzaka charges <strong>¥4,000</strong> for 45 minutes (¥5,000 in
              March, April, October, November and New Year), and Taihoan, Uji City&apos;s own tea house, ¥1,500 for a
              bowl of usucha. Do it in <strong>Higashiyama or Gion</strong> if it fits between Kiyomizu-dera and an
              evening in Gion — Maikoya there includes a kimono until 18:00 in a session of about 90 minutes — near{" "}
              <strong>Kinkaku-ji</strong> for a private room, or in <strong>Uji</strong>, 16 minutes from Kyoto Station,
              for the tea itself. Prices from each operator&apos;s site, checked {CHECKED}.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              In Tokyo instead? See the{" "}
              <Link href="/guides/attractions/tea-ceremony-japan">tea ceremony in Tokyo</Link> guide. For Uji&apos;s tea
              farms and stone mills, the{" "}
              <Link href="/guides/attractions/japan-matcha-experiences">matcha experiences guide</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoGionKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Gion kimono tea ceremony →
              </KlookLink>
              <KlookLink href={kyotoGionChairTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Gion ceremony on chairs →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price table</span>
          <h2 className={styles.sectionTitle}>Where Can I Do a Tea Ceremony in Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            In four places, and the area decides more than the price: Higashiyama (Ninenzaka, below Kiyomizu-dera),
            Gion and central Kyoto, the north-west by Ryoan-ji and Kinkaku-ji, and Uji. These are the rooms whose
            operators state their session length and price on their own sites; Maikoya prices per date in its
            calendar, so its row says so instead of quoting a figure.
          </p>
          <SimpleTable
            head={["Tea room", "Area", "Length", "Price per person (tax incl.)", "Kimono", "English"]}
            rows={rooms.map((r) => [r.name, r.area, r.length, r.price, r.kimono, r.english])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(CAMELLIA_FLOWER_URL, "Camellia Flower Teahouse")},{" "}
            {ext(CAMELLIA_GARDEN_URL, "Camellia Garden Teahouse")}, {ext(CAMELLIA_KIMONO_URL, "Camellia kimono plan")} (tea-kyoto.com);{" "}
            {ext(MAIKOYA_GION_URL, "Maikoya Gion Kiyomizu")} and {ext(MAIKOYA_NISHIKI_URL, "Maikoya Nishiki")} (mai-ko.com);{" "}
            {ext(TAIHOAN_URL, "Taihoan")} (Uji City Tourist Association); {ext(FUKUJUEN_URL, "Fukujuen Uji Kobo")}. Camellia&apos;s
            peak price applies in March, April, October, November and the New Year period. Prices change; the
            operator&apos;s page on your date is the one that counts.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is a Tea Ceremony in Kyoto?</h2>
          <p className={styles.bodyText}>
            ¥1,500 to ¥5,000 per person for a shared session, ¥8,000 and up for a private room. At the low end, a bowl
            of usucha with a sweet at Taihoan in Uji is ¥1,500 and making your own matcha there is ¥3,600. In the
            middle, Camellia&apos;s shared Flower Teahouse ceremony is ¥4,000 off peak and ¥5,000 in March, April,
            October, November and New Year, with children aged 6 to 12 at ¥2,500 or ¥3,000; it includes the
            performance, a sweet and a bowl you whisk yourself. Private: ¥8,000 to ¥10,000 per person at the Flower
            Teahouse, ¥15,000 to ¥18,000 at the Garden Teahouse near Ryoan-ji. A kimono adds ¥6,000 at Camellia; at
            Maikoya it is built into the price shown for your date.
          </p>
          <p className={styles.bodyText}>
            On Klook the Gion sessions price by date as well. The{" "}
            <K href={kyotoGionKimonoTeaCeremony.url}>Orizuruya kimono ceremony in Gion</K> runs 1.5 to 2 hours for up
            to 10 guests, the <K href={kyotoGionChairTeaCeremony.url}>one-hour Gion ceremony on chairs</K> suits
            anyone who cannot kneel, and the{" "}
            <K href={kyotoTraditionalTeaCeremonyUrl}>session near Kinkaku-ji</K> runs 45 minutes to an hour with an
            Urasenke instructor.
          </p>
        </section>

        <KlookTripPrep
          label="Book these on the same day"
          heading="What Should You Book with a Kyoto Tea Ceremony?"
          intro="The ceremony, a kimono if the room has none, and the rest of the day. Klook prices change by date, so open a listing for the figure on yours."
          items={kyotoTeaTripPrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Kyoto or Uji</span>
          <h2 className={styles.sectionTitle}>Kyoto vs Uji: Which Matcha Experience?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Kyoto for the ceremony in a machiya on the way between temples; Uji for the tea. Uji is about 16 minutes
            from Kyoto Station by JR Nara Line rapid, and the shops there are the firms that grow and blend it.
          </p>
          <SimpleTable
            head={["", "Kyoto city (Higashiyama, Gion, north-west)", "Uji"]}
            rows={[
              ["Getting there", "Bus or on foot between temples", "JR Nara Line rapid, about 16 min from Kyoto Station"],
              ["What you do", "A ceremony performed for you, then a bowl you whisk", "A bowl at Taihoan, making your own, or grinding on a stone mill"],
              ["Price", "¥4,000–¥5,000 shared at Camellia; Maikoya by date", "¥1,500 (Taihoan usucha), ¥2,200 (Fukujuen mill), ¥3,600 (Taihoan matcha-making)"],
              ["Kimono", "Included at Maikoya; +¥6,000 at Camellia Flower", "Not offered"],
              ["Pairs with", "Kiyomizu-dera, Gion, Kinkaku-ji", "Byodo-in and the Uji River"],
              ["Closed", "Open daily (check the calendar)", "Taihoan: 21 Dec – 9 Jan"],
            ]}
          />
          <p className={styles.bodyText} style={note}>
            Uji prices from {ext(TAIHOAN_URL, "kyoto-uji-kankou.or.jp")} and {ext(FUKUJUEN_URL, "experience.fukujuen.com")},
            checked {CHECKED}. A guided way to do Uji is the{" "}
            <K href={ujiTaihoanWalkingTour.url}>Uji walk with a ceremony at Taihoan</K> or the{" "}
            <K href={ujiTeaCeremonyKyotoDayTourFromOsaka.url}>day tour from Osaka with a Uji tea ceremony</K>; the
            full Uji day is in the <Link href="/guides/attractions/kyoto-3-day-itinerary">Kyoto 3 day itinerary</Link>.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kimono</span>
          <h2 className={styles.sectionTitle}>Do I Need to Wear a Kimono?</h2>
          <p className={styles.bodyText}>
            No. Shoes come off on tatami, so wear socks and clothes you can sit in; that is all any of these rooms asks.
            If you want the kimono, pick the room by it. Maikoya includes one and you keep it until 18:00, so a morning
            session leaves the afternoon for Gion and Kiyomizu in it. Camellia&apos;s Flower Teahouse adds a full-day kimono
            for ¥6,000, with dressing an hour before the ceremony at the studio next door; it cannot dress pregnant
            guests and offers a haori set instead. The Garden Teahouse and the Uji tea houses do not dress you, so rent
            first — the <Link href="/guides/attractions/kyoto-kimono-rental">Kyoto kimono rental</Link> guide compares shops
            and return times.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Gion kimono rental →
            </KlookLink>
            <KlookLink href={kyotoKimonoAiwafukuKiyomizu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kiyomizu kimono rental →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Children</span>
          <h2 className={styles.sectionTitle}>Is a Kyoto Tea Ceremony OK for Kids?</h2>
          <p className={styles.bodyText}>
            Yes, above each room&apos;s minimum age. Camellia&apos;s shared ceremony takes children from 6 (¥2,500, or
            ¥3,000 in peak months) and its private rooms from 4; Maikoya&apos;s kimono sessions are for ages 7 and up.
            Camellia cannot host children of 3 and under in the Flower Teahouse and asks families with infants to get in
            touch. A private room is the easier choice with younger children — nobody else&apos;s ceremony is
            interrupted. The 45-minute format is the short one; a 90-minute kimono session is long for a young child.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Do Kyoto Tea Rooms Fill Up, and Can You Cancel?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The rooms are small and the busy months are the ones Camellia charges more for: March, April, October,
            November and New Year. Book a few days ahead outside those, and earlier inside them. There is no walk-in
            ceremony at these rooms, and refunds stop a few days out.
          </p>
          <SimpleTable
            head={["Where", "How to book", "Cancellation", "What fills it"]}
            rows={bookRows.map((r) => [r.place, r.how, r.cancel, r.fills])}
          />
          <p className={styles.bodyText} style={note}>
            Camellia&apos;s terms from {ext(CAMELLIA_CANCEL_URL, "tea-kyoto.com/cancellation-policy")}; Maikoya&apos;s from
            the booking pages linked above; Taihoan&apos;s closing dates from its own page — all {CHECKED}. For a booking
            you can move at short notice, read the cancellation line on the Klook listing before paying.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoGionKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Gion kimono ceremony →
            </KlookLink>
            <KlookLink href={kyotoTeaCeremonyTastingMaking.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto tasting and making session →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of the day</span>
          <h2 className={styles.sectionTitle}>What Goes Well with a Tea Ceremony in Kyoto?</h2>
          <p className={styles.bodyText}>
            A Ninenzaka or Gion session sits between Kiyomizu-dera in the morning and Gion at dusk — the Day 1 loop of
            the <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2 day itinerary</Link>. Evenings in the
            same streets are the <Link href="/guides/attractions/gion-night-walking-tour">Gion night walking tour</Link>{" "}
            or a <Link href="/guides/attractions/kyoto-maiko-dinner">maiko dinner</Link>. The Garden Teahouse is a
            minute from Ryoan-ji, so it belongs on a Kinkaku-ji day. For a guided day around it,{" "}
            <K href={kyotoCityFushimiArashiyamaTour.url}>a Kyoto day tour</K> covers Fushimi Inari, Arashiyama and
            Kiyomizu-dera from Kyoto Station.
          </p>
        </section>

        <BookingEsimCard lead="Tea-room confirmations, Ninenzaka's lanes and the train to Uji — get mobile data before you land." />

        <KlookTourPicks
          heading="Kyoto and Uji Tea Ceremonies on Klook"
          intro="Gion with a kimono or on chairs, a tasting-and-making session, Uji's Taihoan, and a day tour from Osaka with a ceremony in it. Klook prices change by date, so open a listing for yours."
          tours={[kyotoGionKimonoTeaCeremony, kyotoGionChairTeaCeremony, kyotoTeaCeremonyTastingMaking, ujiTaihoanWalkingTour, ujiTeaCeremonyKyotoDayTourFromOsaka]}
        />

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
            <h2 className={styles.ctaBannerTitle}>Tea in Gion, then the rest of Kyoto</h2>
            <p className={styles.ctaBannerDesc}>
              Book the tea room for your date first, then the kimono if the room has none.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kyotoGionKimonoTeaCeremony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Gion kimono tea ceremony →
              </KlookLink>
              <KlookLink href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Gion kimono rental →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
