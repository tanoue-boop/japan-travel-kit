import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  hakoneAshinokoHanaori,
  hakoneChisujiListing,
  hakoneFreepass,
  hakoneGinyu,
  hakoneGoraKadan,
  hakoneGoraKaraku,
  hakoneHotels,
  hakoneKaiSengokuhara,
  hakoneKowakienMikawaya,
  hakoneKowakienTenyu,
  hakoneRyokanKyuan,
  hakoneRyokanTripPrep,
  hakoneSusukinoharaIchinoyu,
  hakoneYoshiikeRyokan,
  hakoneYuyuListing,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Staying the night in Hakone, for the reader searching for a private onsen. Added
 * 7 Nov 2026 with four inns; widened to ten inns by area on 23 Nov 2026
 * (task-jtk-20261123-R08). hakone-day-trip-from-tokyo and hakone-free-pass cover the
 * day out; this page covers the room.
 *
 * Every inn in the table is bookable on Klook, and its room bath or reservable bath is
 * stated on the inn's own site:
 *
 *   yoshiike.org          (7 Nov) room types, 2 indoor reserved baths, FAQ on tattoos
 *   hakonekowakien-mikawaya.jp  (7 Nov) 10 of 25 rooms with an open-air bath, free family bath
 *   kyuan.jp              (7 Nov) 10 rooms: 2 open-air, 8 semi-open-air; reserved bath Ryujin
 *   gorakadan.com         (7 Nov) room categories; FAQ PDF dated 21 Oct 2026
 *   hakoneginyu.co.jp/en  (23 Nov) every room has a terrace open-air bath; meals in the room;
 *                         Ginyu Spa reservable 21:00 to 23:00; 3 min from Miyanoshita Station
 *   gora-karaku.orixhotelsandresorts.com  (23 Nov) a balcony onsen open-air bath in every
 *                         room; 3 private baths; Mutsuki dining; Odawara shuttle, 2 a day
 *   ten-yu.com            (23 Nov) all rooms open-air: 66 + 54 standard, 24 top floor, 6 special;
 *                         buffet at Dining Hakone; bus about 20 min, Gora shuttle about 10 min
 *   hoshinoresorts.com/en/hotels/kaisengokuhara  (23 Nov) a private outdoor bath on every
 *                         terrace; 16 rooms; 14:30 / 11:00; about 15 min by car from Gora
 *   ichinoyu.co.jp/facilities/susuki  (23 Nov) all rooms with an open-air bath; bus about
 *                         30 min to Daigatake, 1 min on foot; shabu-shabu dinner
 *   ashinoko-hanaori.orixhotelsandresorts.com  (23 Nov) open-air bath room types; 2
 *                         semi-open-air private baths, 40 min, ¥3,000; buffet; Gora shuttle
 *
 * Left out on purpose: Ryuguden (its only in-room baths are indoor), KAI Hakone (no room
 * bath on its own site), Gora Hanaougi (no official site found). No Klook price
 * appears, and no per-person price is given: none of the inns' own pages states one
 * outside its booking engine. Nothing here is first-hand.
 */

const CHECKED = "2026-11-23";
const OWN = checkedLabel(CHECKED);
const FIRST_READ = checkedLabel("2026-11-07");
const PASS_DATE = checkedLabel("2026-10-25");

const inns = [
  {
    hotel: hakoneYoshiikeRyokan,
    area: "Hakone-Yumoto",
    type: "Some rooms + reservable bath",
    roomBath: "Open-air: Shiki no Ma (4 rooms) and Hollywood Twin. Semi-open-air: Family Suite",
    reservedBath: "2 indoor baths, paid, reserve ahead",
    meals: "Plans with or without meals, in the restaurant",
    access: "7 minutes on foot from Hakone-Yumoto Station",
    source: "yoshiike.org",
  },
  {
    hotel: hakoneGinyu,
    area: "Miyanoshita",
    type: "Every room",
    roomBath: "Every room: open-air bath on a terrace over the Hayakawa valley",
    reservedBath: "The whole Ginyu Spa pavilion, 21:00 to 23:00, by reservation",
    meals: "Kaiseki dinner and breakfast, served in your room",
    access: "3 minutes on foot from Miyanoshita Station (Hakone Tozan Train)",
    source: "hakoneginyu.co.jp",
  },
  {
    hotel: hakoneKowakienMikawaya,
    area: "Kowakudani",
    type: "Some rooms + free family bath",
    roomBath: "Open-air: 10 of 25 rooms",
    reservedBath: "1 semi-open-air family bath, free, no booking, about 60 minutes",
    meals: "Dinner in the main building restaurant, no in-room dining",
    access: "Horai-en bus stop, or a shuttle of about 10 minutes from Gora Station",
    source: "hakonekowakien-mikawaya.jp",
  },
  {
    hotel: hakoneRyokanKyuan,
    area: "Ninotaira (Kowakudani)",
    type: "Every room",
    roomBath: "All 10 rooms: open-air in 2, semi-open-air in 8. No public bath",
    reservedBath: "Ryujin, 40 minutes, paid, reserve ahead",
    meals: "Kaiseki dinner and breakfast; in-room dining in some rooms",
    access: "Pickup from Chokoku-no-Mori Station and other points, 14:30 to 17:30, on request",
    source: "kyuan.jp",
  },
  {
    hotel: hakoneKowakienTenyu,
    area: "Ninotaira (Kowakudani)",
    type: "Every room",
    roomBath: "All 150 rooms: an onsen open-air bath in a Shigaraki-ware tub",
    reservedBath: "Not listed: the room bath is the private bath",
    meals: "Japanese-Western buffet at Dining Hakone or set menus; in-room dinner for the 6 special rooms",
    access: "Bus from Hakone-Yumoto, about 20 minutes to the Tenyu stop; free shuttle from Gora, about 10 minutes",
    source: "ten-yu.com",
  },
  {
    hotel: hakoneGoraKadan,
    area: "Gora",
    type: "Some rooms + private bath",
    roomBath: "Open-air: Aoi, Fuji and Ume suites; Matsu, Tsubaki, Suzukake and the big stone bath room",
    reservedBath: "A private bath is listed. Ask how it is booked",
    meals: "Dinner and breakfast, generally in your room",
    access: "5 minutes on foot from Gora Station, or a free shuttle by phone call",
    source: "gorakadan.com",
  },
  {
    hotel: hakoneGoraKaraku,
    area: "Gora",
    type: "Every room + 3 private baths",
    roomBath: "Every room: an onsen open-air bath on the balcony",
    reservedBath: "3 private baths",
    meals: "Japanese course dinner at Mutsuki, 17:00 to 21:30, or the grill restaurant",
    access: "Free shuttle from JR Odawara Station, 2 a day, booked online, 45 to 50 minutes",
    source: "gora-karaku.orixhotelsandresorts.com",
  },
  {
    hotel: hakoneKaiSengokuhara,
    area: "Sengokuhara",
    type: "Every room",
    roomBath: "All 16 rooms: a private outdoor bath on the terrace",
    reservedBath: "Not listed",
    meals: "Kaiseki dinner",
    access: "About 15 minutes by car from Gora Station. No shuttle",
    source: "hoshinoresorts.com",
  },
  {
    hotel: hakoneSusukinoharaIchinoyu,
    area: "Sengokuhara",
    type: "Every room",
    roomBath: "Every room: an open-air bath (twin, Japanese-style and sauna suite types)",
    reservedBath: "Not listed",
    meals: "Yonezawa beef shabu-shabu with 70 minutes of drinks; Japanese breakfast",
    access: "Hakone Tozan Bus from Hakone-Yumoto, about 30 minutes to Daigatake, then 1 minute on foot",
    source: "ichinoyu.co.jp",
  },
  {
    hotel: hakoneAshinokoHanaori,
    area: "Lake Ashi (Togendai)",
    type: "Some rooms + reservable bath",
    roomBath: "Open-air in the deluxe, standard and casual twin room types sold with a bath",
    reservedBath: "2 semi-open-air baths, 40 minutes for ¥3,000, guests only, reserve ahead",
    meals: "Japanese-Western buffet dinner and breakfast",
    access: "On foot from Togendai (ropeway and lake cruise); free shuttle from Gora, about 20 minutes",
    source: "ashinoko-hanaori.orixhotelsandresorts.com",
  },
];

const officialSources = [
  ["Yoshiike Ryokan", "https://www.yoshiike.org/"],
  ["Hakone Ginyu", "https://www.hakoneginyu.co.jp/en/"],
  ["Mikawaya", "https://hakonekowakien-mikawaya.jp/"],
  ["Kyuan", "https://kyuan.jp/"],
  ["Ten-yu", "https://www.ten-yu.com/room.html"],
  ["Gora Kadan", "https://www.gorakadan.com/"],
  ["Karaku", "https://gora-karaku.orixhotelsandresorts.com/"],
  ["KAI Sengokuhara", "https://hoshinoresorts.com/en/hotels/kaisengokuhara/"],
  ["Susukinohara Ichinoyu", "https://www.ichinoyu.co.jp/facilities/susuki/"],
  ["Hanaori", "https://ashinoko-hanaori.orixhotelsandresorts.com/contents/kashikiri/"],
] as const;

const areaRows = [
  {
    area: "Hakone-Yumoto",
    inns: "Yoshiike",
    getting: "Romancecar direct from Shinjuku: fastest 75 minutes, about 90 on some trains",
    sights: "The start of the train and bus routes into the hills",
    colour: "Late November to early December",
  },
  {
    area: "Miyanoshita",
    inns: "Hakone Ginyu",
    getting: "From Hakone-Yumoto, about 28 minutes on the Hakone Tozan Train",
    sights: "Halfway up the train line, for Gora and for Yumoto",
    colour: "Mid to late November",
  },
  {
    area: "Kowakudani and Ninotaira",
    inns: "Mikawaya, Kyuan, Ten-yu",
    getting: "From Hakone-Yumoto, about 20 minutes by bus",
    sights: "Close to Hakone Kowakien Yunessun",
    colour: "Mid to late November",
  },
  {
    area: "Gora",
    inns: "Gora Kadan, Karaku",
    getting: "From Hakone-Yumoto, about 40 to 45 minutes on the Hakone Tozan Train",
    sights: "Cable car to Sounzan, then the ropeway. Gora Park and the Open-Air Museum nearby",
    colour: "Mid to late November",
  },
  {
    area: "Sengokuhara",
    inns: "KAI Sengokuhara, Susukinohara Ichinoyu",
    getting: "From Hakone-Yumoto, about 30 minutes by bus",
    sights: "The pampas grass fields. Bus or car only",
    colour: "Early November",
  },
  {
    area: "Lake Ashi",
    inns: "Hanaori",
    getting: "From Hakone-Yumoto by bus, or from Gora by cable car and ropeway to Togendai",
    sights: "Lake cruise, ropeway and Hakone Shrine",
    colour: "Early to mid November",
  },
];

const faqItems = [
  {
    q: "Which Hakone ryokan have a private onsen in the room?",
    a: `Of the 10 inns in this guide, 6 put an open-air bath in every room: Hakone Ginyu in Miyanoshita, Kyuan and Ten-yu in Ninotaira, Karaku in Gora, and KAI Sengokuhara and Susukinohara Ichinoyu in Sengokuhara. Yoshiike, Mikawaya, Gora Kadan and Hanaori sell some room types with one. Each is stated on the inn's own site, read ${OWN}.`,
  },
  {
    q: "Private open-air bath vs reservable private bath: what's the difference?",
    a: "A room with an open-air bath has the bath on its own terrace or balcony, and it is yours for the whole stay. A reservable private bath is a separate bath you lock for one session: 40 minutes for ¥3,000 at Hanaori, 40 minutes at Kyuan, and about 60 minutes free of charge at Mikawaya. Semi-open-air means roofed but open to the air on one side.",
  },
  {
    q: "Which area of Hakone is best for a ryokan?",
    a: "Gora, Miyanoshita and Kowakudani if you want a bath in every room: 4 of the 6 inns here that have one are there, on the Hakone Tozan Train or a short bus ride. Hakone-Yumoto is the easiest arrival from Shinjuku. Sengokuhara is quieter and reached by bus or car, and Lake Ashi puts you by the ropeway and the lake cruise.",
  },
  {
    q: "Are tattoos OK in a private onsen?",
    a: `A bath in your room is yours alone, so it is the simplest answer. Public-bath rules differ by inn: Mikawaya sends guests with tattoos to the room bath or family bath, Gora Kadan asks guests with tattoos larger than about A4 to use the private bath, and Yoshiike allows tattoos that two 10 × 14 cm cover seals can hide. Read ${FIRST_READ}.`,
  },
  {
    q: "How far in advance should I book?",
    a: "As soon as your dates are fixed, and earliest for weekends and November's autumn colour. At several inns only some rooms have a bath: 10 of 25 at Mikawaya. Kyuan has 10 rooms in total and KAI Sengokuhara 16. Gora Kadan opens reservations six months ahead, on the 1st of the month at 12:30 Japan time. None of the inns publishes a sell-out date.",
  },
];

const TITLE = "Hakone Ryokan with Private Onsen: 10 Inns by Area (2026)";
const DESCRIPTION =
  "Hakone ryokan with private onsen: 10 inns by area, Yumoto and Gora to Lake Ashi, with an open-air bath in the room or a reservable bath, meals and access.";

const ROUTE = "/guides/attractions/hakone-ryokan-private-onsen";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/kawaguchiko-ryokan-mt-fuji-view", title: "Kawaguchiko Ryokan with Mt Fuji View & Private Onsen 2026" },
  { href: "/guides/attractions/hakone-free-pass", title: "Hakone Freepass 2026: Price from Shinjuku & Is It Worth It?" },
  { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip From Tokyo (2026): Timed Itinerary, Cost and Tours" },
  { href: "/guides/attractions/hakone-2-day-itinerary", title: "Hakone 2 Day Itinerary (2026): Loop, Ryokan Night & Freepass" },
  { href: "/guides/attractions/tokyo-7-day-itinerary", title: "Tokyo 7 Day Itinerary (2026): Day Trips, Passes & Bookings" },
  { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport" },
  { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan Itinerary 10 Days: Tokyo, Kyoto, Osaka & Hakone (2026)" },
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
];

const cellStyle = { fontSize: "0.86rem" } as const;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function HakoneRyokanPrivateOnsenPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Hakone Ryokan with Private Onsen", item: URL },
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
          <span className={styles.breadCurrent}>Hakone Ryokan with Private Onsen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>{TITLE}</h1>
          <p className={styles.heroSubtitle}>
            A bath of your own, or one you reserve for 40 minutes. Ten inns from Hakone-Yumoto to Lake Ashi,
            each bath taken from the inn&apos;s own site.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "10 inns, 6 areas", "Room baths checked on official sites", "Tattoo rules"].map((t) => (
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

        {/* Lead paragraph: the whole answer, in the body rather than the hero. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Of the 10 <strong>Hakone ryokan with private onsen</strong> in this guide, 6 put an open-air bath in
            every room, and 4 of those 6 are in <strong>Miyanoshita, Ninotaira and Gora</strong>; the other 2
            are in Sengokuhara. If you only want a private bath for one session, Mikawaya&apos;s family bath in
            Kowakudani is free and Hanaori&apos;s two semi-open-air baths at Lake Ashi cost ¥3,000 for 40
            minutes. Every bath here is stated on the inn&apos;s own site, read {OWN}.
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
                <p className={styles.verdictStatLabel}>Bath in every room, by train</p>
                <p className={styles.verdictStatValue}>Hakone Ginyu, 3 min on foot</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Largest choice of bath rooms</p>
                <p className={styles.verdictStatValue}>Ten-yu, all 150 rooms</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Private bath without the room</p>
                <p className={styles.verdictStatValue}>Mikawaya (free) · Hanaori (¥3,000)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Closest to the Romancecar</p>
                <p className={styles.verdictStatValue}>Yoshiike, 7 min on foot</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> for a bath in the room with meals in the room, Hakone Ginyu or Kyuan; for
              a big inn where every room has one, Ten-yu or Karaku; for the quiet side, KAI Sengokuhara or
              Susukinohara Ichinoyu; for the lake, Hanaori; for the easiest arrival, Yoshiike.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={hakoneGinyu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Hakone Ginyu on Klook →
              </KlookLink>
              <KlookLink href={hakoneKowakienTenyu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Ten-yu on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Inns */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare inns</span>
          <h2 className={styles.sectionTitle}>Which Hakone Ryokan Have a Private Onsen in the Room?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Six of these ten have an open-air bath in every room: Hakone Ginyu, Kyuan, Ten-yu, Karaku, KAI
            Sengokuhara and Susukinohara Ichinoyu. At the other four only some room types have one, so choose the
            room type, not just the inn. Prices move by date, so none are listed here: open Klook for yours.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Inn", "Area", "Private bath", "Bath in the room", "Reservable private bath", "Dinner", "Getting there", "Book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>Our pick by area and budget</td>
                    <td colSpan={7} style={cellStyle}>
                      <strong>A bath in every room:</strong> Miyanoshita (Hakone Ginyu), Ninotaira (Kyuan, Ten-yu) or
                      Gora (Karaku). <strong>Quieter:</strong> Sengokuhara (KAI Sengokuhara, Susukinohara Ichinoyu).{" "}
                      <strong>By the lake:</strong> Hanaori. <strong>Easiest arrival:</strong> Yoshiike, 7 minutes
                      from Hakone-Yumoto Station. <strong>To spend less:</strong> book a standard room and the
                      reservable bath, free at Mikawaya and ¥3,000 for 40 minutes at Hanaori.
                    </td>
                  </tr>
                  {inns.map((row) => (
                    <tr key={row.hotel.title}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.hotel.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.hotel.title}
                        </KlookLink>
                      </td>
                      <td style={cellStyle}>{row.area}</td>
                      <td style={cellStyle}>{row.type}</td>
                      <td style={cellStyle}>{row.roomBath}</td>
                      <td style={cellStyle}>{row.reservedBath}</td>
                      <td style={cellStyle}>{row.meals}</td>
                      <td style={cellStyle}>{row.access}</td>
                      <td style={cellStyle}>
                        <KlookLink href={row.hotel.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                          Klook →
                        </KlookLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED}. Official sites:{" "}
            {officialSources.map(([name, href], i) => (
              <span key={href}>
                {name} <a href={href} target="_blank" rel="noopener noreferrer">{href.replace(/^https:\/\//, "")}</a>
                {i < officialSources.length - 1 ? "; " : "."}
              </span>
            ))}{" "}
            Yoshiike, Mikawaya, Kyuan and Gora Kadan were first read in full {FIRST_READ}. Kyuan&apos;s rooms page
            splits its baths into 2 open-air and 8 semi-open-air. Yoshiike is closed 7 to 10 December 2026.
            Hanaori&apos;s private baths run 15:00 to 22:00 and 7:00 to 9:30.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneGinyu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hakone Ginyu →
            </KlookLink>
            <KlookLink href={hakoneGoraKaraku.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Karaku →
            </KlookLink>
            <KlookLink href={hakoneKaiSengokuhara.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              KAI Sengokuhara →
            </KlookLink>
            <KlookLink href={hakoneAshinokoHanaori.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hanaori →
            </KlookLink>
            <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              All Hakone hotels →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Two more on Klook.</strong> No official site is listed here for{" "}
            <KlookLink href={hakoneYuyuListing.url} target="_blank" rel="sponsored nofollow noopener">YuYu Hakone</KlookLink>{" "}
            or{" "}
            <KlookLink href={hakoneChisujiListing.url} target="_blank" rel="sponsored nofollow noopener">Chisuji Ryokan</KlookLink>
            , so they are not in the table. Read the room type on Klook to see what bath you are booking.
          </p>
        </section>

        {/* Types */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Bath types</span>
          <h2 className={styles.sectionTitle}>Private Open-Air Bath vs Reservable Private Bath: What&apos;s the Difference?</h2>
          <p className={styles.bodyText}>
            A room with an open-air bath has the bath on its own terrace or balcony, and it is yours for the whole
            stay, at any hour. A reservable private bath is a separate bath you lock for one session: 40 minutes for
            ¥3,000 at Hanaori, 40 minutes at Kyuan, and about 60 minutes free of charge at Mikawaya, where it is
            first come rather than booked. Semi-open-air means roofed but open to the air on one side. Yoshiike&apos;s
            two reservable baths are indoors, and Karaku has three. At Hakone Ginyu the whole spa pavilion can be
            reserved from 21:00 to 23:00.
          </p>
          <p className={styles.bodyText}>
            Pick the room bath if you have tattoos, travel as a couple or family, or want to bathe late at night and
            again at dawn. Pick the reservable bath if one private soak is enough: you do not pay for the room type.
            If you want Mt Fuji outside the window instead of the Hakone hills, our guide to the{" "}
            <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view">Kawaguchiko ryokan with Mt Fuji view and private onsen</Link>{" "}
            does the same comparison for six inns at Lake Kawaguchi.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneKowakienMikawaya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Mikawaya rooms →
            </KlookLink>
            <KlookLink href={hakoneAshinokoHanaori.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Hanaori rooms →
            </KlookLink>
          </div>
        </section>

        {/* Areas */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Areas</span>
          <h2 className={styles.sectionTitle}>Which Area of Hakone Is Best for a Ryokan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Gora, Miyanoshita and Kowakudani for a bath in every room: 4 of the 6 inns here that have one are there,
            on the Hakone Tozan Train or a short bus ride. Hakone-Yumoto is the easiest arrival from Shinjuku.
            Sengokuhara is quieter and reached by bus or car, and Lake Ashi puts you by the ropeway and the cruise.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Inns here", "Getting there", "For sightseeing", "Autumn colour, usual timing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.area}</td>
                      <td style={cellStyle}>{row.inns}</td>
                      <td style={cellStyle}>{row.getting}</td>
                      <td style={cellStyle}>{row.sights}</td>
                      <td style={cellStyle}>{row.colour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED} for the inns; train, bus and colour timings from Hakone Navi, Odakyu and the
            Hakone tourism association, read {FIRST_READ}. Add the Shinjuku to Hakone-Yumoto time to each leg: the
            fastest Romancecar is 75 minutes, and the inns quote about 90. The Hakone Tozan Train, the cable car,
            the ropeway and Hakone Tozan Bus are covered by the 2-day{" "}
            <Link href="/guides/attractions/hakone-free-pass">Hakone Freepass</Link>, which runs to the last
            service on the day after you buy it. Izu-Hakone Bus is not, and its J Line is the bus that Ten-yu
            and Hanaori both give from Hakone-Yumoto Station.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              All Hakone hotels on Klook →
            </KlookLink>
            <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hakone Freepass →
            </KlookLink>
          </div>
        </section>

        {/* Tattoos */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tattoos</span>
          <h2 className={styles.sectionTitle}>Are Tattoos OK in a Private Onsen?</h2>
          <p className={styles.bodyText}>
            Yes in a bath in your own room, which is the best reason to book one: it is yours alone. Japan&apos;s
            national tourism organization says many onsen refuse guests with tattoos in shared baths, so check the
            inn&apos;s rule before you use the public bath. Four of the inns state theirs:
          </p>
          <ul className={styles.bodyText}>
            <li><strong>Yoshiike:</strong> tattoos are generally refused in the public baths, but those that two 10 × 14 cm cover seals can hide are allowed. Seals are sold at the front desk.</li>
            <li><strong>Mikawaya:</strong> the public baths are not available. Use the room&apos;s open-air bath or the family bath.</li>
            <li><strong>Gora Kadan:</strong> small fashion tattoos up to about A4 size are allowed. For larger ones, use the private bath.</li>
            <li><strong>Kyuan:</strong> has no public bath, and its FAQ does not state a tattoo rule. Ask if you plan to use the shared reserved bath.</li>
          </ul>
          <p className={styles.bodyText}>
            Read {FIRST_READ} on each inn&apos;s site. At the six inns with a bath in every room, the room bath
            avoids the question altogether.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How Far in Advance Should I Book?</h2>
          <p className={styles.bodyText}>
            As soon as your dates are fixed, and earliest for weekends and November. Rooms with a bath are a limited
            part of several inns: 10 of 25 at Mikawaya, and Kyuan has only 10 rooms in total and KAI Sengokuhara
            16. Gora Kadan opens each month six months ahead, on the 1st at 12:30 Japan time. No inn publishes a
            sell-out date, so treat this as planning advice rather than a rule.
          </p>
          <p className={styles.bodyText}>
            Read the cancellation terms before you pay, because they change with where you book. At Gora Kadan,
            direct bookings cost nothing to cancel 8 or more days out, while travel agency bookings carry 70% from
            31 days and 100% from 14 days. Check the terms shown for your room on Klook before you pay. Klook&apos;s
            Hakone listings also show a bathing tax of ¥150 per person per night.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneRyokanKyuan.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check your dates at Kyuan →
            </KlookLink>
            <KlookLink href={hakoneSusukinoharaIchinoyu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Susukinohara Ichinoyu →
            </KlookLink>
          </div>
        </section>

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Can You Stay at a Hakone Ryokan With Children?</h2>
          <p className={styles.bodyText}>
            Yes at the first four inns in the table, and a room with its own bath lets a family bathe together.
            Gora Kadan has no age limit and lends baby items such as a cot and a kettle. Mikawaya has a
            children&apos;s menu but no baby supplies. Yoshiike asks for each child&apos;s age when you book, and its
            children&apos;s meals follow the adult menu. Kyuan welcomes children but has no elevator. Susukinohara
            Ichinoyu lists a children&apos;s plate, and KAI Sengokuhara lets children up to 6 share a bed. Read{" "}
            {FIRST_READ} and {OWN}.
          </p>
        </section>

        {/* Times */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Times</span>
          <h2 className={styles.sectionTitle}>What Time Is Check-In at a Hakone Ryokan?</h2>
          <p className={styles.bodyText}>
            Check-in is 14:00 at Yoshiike and Hakone Ginyu, 14:30 at KAI Sengokuhara and 15:00 at Mikawaya, Kyuan
            and Gora Kadan. Check-out is 10:00 at Yoshiike and Mikawaya, and 11:00 at Hakone Ginyu, KAI
            Sengokuhara, Kyuan and Gora Kadan. Arrive in time for dinner: Yoshiike&apos;s last check-in with dinner
            is 17:00, Kyuan&apos;s check-in closes at 18:00, and Gora Kadan&apos;s latest dinner start is 19:00.
          </p>
        </section>

        {/* Night vs day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Night or day trip</span>
          <h2 className={styles.sectionTitle}>Should You Stay the Night or Visit Hakone for the Day?</h2>
          <p className={styles.bodyText}>
            Stay if the bath is the point. A night gives you 19 to 20 hours at the inn, with dinner and breakfast,
            while a day trip usually means a public bath and a train home. It also makes the transport simpler: the{" "}
            <Link href="/guides/attractions/hakone-free-pass">Hakone Freepass</Link> has no 1-day version, and
            the 2-day pass from Shinjuku is ¥7,100, with the ¥1,200 Romancecar surcharge on top (read{" "}
            {PASS_DATE}). For the day-out version, see our{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone day trip guide</Link>; for what to
            do around the night, hour by hour, our{" "}
            <Link href="/guides/attractions/hakone-2-day-itinerary">Hakone 2 day itinerary</Link>. If Hakone is
            one stop on a longer trip, our{" "}
            <Link href="/guides/attractions/tokyo-7-day-itinerary">Tokyo 7 day itinerary</Link> fits the night in
            as a day trip out of Tokyo, and our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link> pairs it with the
            snow days. In Kansai, Arima Onsen near Kobe has a ryokan day-use plan with private baths for the
            afternoon — see our <Link href="/guides/attractions/arima-onsen-day-trip">Arima Onsen day trip</Link>{" "}
            guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hakone Freepass →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book the same day"
          heading="What Should You Book Around a Night in Hakone?"
          intro="Once the room is settled, these cover the rest of the trip. Open a listing for the price on your dates."
          items={hakoneRyokanTripPrep}
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
          heading="Hakone Ryokan on Klook"
          intro="The ten inns in the table. Open one for the current price and the room types on your dates."
          tours={inns.map((row) => row.hotel)}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{guide.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Choose the room, not just the inn</h2>
            <p className={styles.ctaBannerDesc}>
              At four of these ten inns only some rooms have their own bath, so check your dates first.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hakoneGinyu.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Hakone Ginyu →
              </KlookLink>
              <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                All Hakone Hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
