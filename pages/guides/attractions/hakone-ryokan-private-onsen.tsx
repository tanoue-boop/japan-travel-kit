import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  hakoneChisujiListing,
  hakoneFreepass,
  hakoneGoraKadan,
  hakoneHotels,
  hakoneKowakienMikawaya,
  hakoneRyokanKyuan,
  hakoneRyokanTripPrep,
  hakoneYoshiikeRyokan,
  hakoneYuyuListing,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * Staying the night in Hakone, for the reader searching for a private onsen. Added
 * 7 Nov 2026. hakone-day-trip-from-tokyo and hakone-free-pass cover the day out; this
 * page covers the room.
 *
 * Read on 7 November 2026, from each inn's own site:
 *
 *   yoshiike.org          room types, 2 indoor reserved baths, 14:00/10:00, FAQ on
 *                         tattoo cover seals and children, closed 7 to 10 Dec 2026
 *   hakonekowakien-mikawaya.jp  rooms, free family bath, FAQ, access. Room count
 *                         also on hakone.or.jp: 1 + 5 + 4 of 25 with an open-air bath
 *   kyuan.jp              10 rooms: 2 open-air, 8 semi-open-air; no public bath;
 *                         reserved bath Ryujin; pickups. Times from its booking engine
 *   gorakadan.com         room categories; FAQ PDF dated 21 Oct 2026 for reservations,
 *                         cancellation, shuttle, meals, children, tattoos
 *   hakone.or.jp, hakonenavi.jp, odakyu-global.com  area transport and autumn colour
 *
 * Gaps left open on purpose: YuYu Hakone, Chisuji Ryokan and Ajisai Onsen Ryokan have no
 * official site we could find, so none of them is described as having a room bath.
 * Ajisai is out altogether because no en-US Klook form was indexed. No Klook price
 * appears, and the inn table carries no prices. Nothing here is first-hand.
 */

const OWN = checkedLabel("2026-11-07");
const PASS_DATE = checkedLabel("2026-10-25");

const inns = [
  {
    hotel: hakoneYoshiikeRyokan,
    area: "Hakone-Yumoto",
    roomBath: "Open-air bath: Shiki no Ma (4 rooms) and Hollywood Twin. Semi-open-air: Family Suite",
    reservedBath: "2 indoor baths, paid, reserve ahead",
    meals: "Plans with or without meals, in the restaurant",
    access: "7 minutes on foot from Hakone-Yumoto Station",
    times: "14:00 / 10:00",
    source: "yoshiike.org",
  },
  {
    hotel: hakoneKowakienMikawaya,
    area: "Kowakudani",
    roomBath: "Open-air bath: 10 of 25 rooms",
    reservedBath: "1 semi-open-air family bath, free, no booking, about 60 minutes",
    meals: "Dinner in the main building restaurant, no in-room dining",
    access: "Horai-en bus stop, or a shuttle bus of about 10 minutes from Gora Station",
    times: "15:00 / 10:00",
    source: "hakonekowakien-mikawaya.jp",
  },
  {
    hotel: hakoneRyokanKyuan,
    area: "Ninotaira, near Kowakudani",
    roomBath: "All 10 rooms: open-air in 2, semi-open-air in 8",
    reservedBath: "Ryujin, 40 minutes, paid, reserve ahead. No public bath",
    meals: "Kaiseki dinner and breakfast. In-room dining in the annex and two main building rooms",
    access: "Pickup from Chokoku-no-Mori Station and other points, 14:30 to 17:30, on request",
    times: "15:00 to 18:00 / 11:00",
    source: "kyuan.jp",
  },
  {
    hotel: hakoneGoraKadan,
    area: "Gora",
    roomBath: "Open-air bath: Aoi, Fuji and Ume suites; Matsu, Tsubaki, Suzukake and the big stone bath room",
    reservedBath: "A private bath is listed. Ask how it is booked",
    meals: "Dinner and breakfast, generally in your room",
    access: "5 minutes on foot from Gora Station, or a free shuttle by phone call",
    times: "15:00 / 11:00",
    source: "gorakadan.com, hakone.or.jp",
  },
];

const areaRows = [
  {
    area: "Hakone-Yumoto",
    getting: "Romancecar direct from Shinjuku: fastest 75 minutes, about 90 on some trains",
    sights: "The start of the train and bus routes into the hills",
    colour: "Late November to early December",
  },
  {
    area: "Miyanoshita",
    getting: "From Hakone-Yumoto, about 28 minutes on the Hakone Tozan Train",
    sights: "Halfway up the train line, for Gora and for Yumoto",
    colour: "Mid to late November",
  },
  {
    area: "Kowakudani and Ninotaira",
    getting: "From Hakone-Yumoto, about 20 minutes by bus to Horai-en",
    sights: "Close to Hakone Kowakien Yunessun",
    colour: "Mid to late November",
  },
  {
    area: "Gora",
    getting: "From Hakone-Yumoto, about 40 to 45 minutes on the Hakone Tozan Train",
    sights: "Cable car to Sounzan, then the ropeway. Gora Park and the Open-Air Museum nearby",
    colour: "Mid to late November",
  },
  {
    area: "Sengokuhara",
    getting: "From Hakone-Yumoto, about 30 minutes by T Line bus to Sengoku-kogen",
    sights: "The pampas grass fields. Bus only",
    colour: "Early November",
  },
  {
    area: "Lake Ashi (Moto-Hakone)",
    getting: "From Hakone-Yumoto, about 35 minutes by bus",
    sights: "Lake cruise and Hakone Shrine",
    colour: "Early to mid November",
  },
];

const faqItems = [
  {
    q: "Which Hakone ryokan have a private onsen?",
    a: `On the inns' own sites, Yoshiike Ryokan in Hakone-Yumoto, Hakone Kowakien Mikawaya Ryokan in Kowakudani, Kyuan in Ninotaira and Gora Kadan in Gora all sell rooms with a private open-air bath. At Kyuan every one of the 10 rooms has an open-air or semi-open-air bath. All four also have a reserved or family bath. Read ${OWN}.`,
  },
  {
    q: "Is a private onsen worth it in Hakone?",
    a: "Yes, if you have tattoos, want to bathe as a couple or a family, or want a bath whenever you like. Otherwise a reserved bath can be enough. Mikawaya's family bath is free and needs no booking, and Yoshiike and Kyuan sell a reserved bath by the session, so you can bathe privately without paying for the room type.",
  },
  {
    q: "Where should I stay in Hakone?",
    a: "Hakone-Yumoto if you want the easiest arrival: the Romancecar runs there directly from Shinjuku. Gora or Kowakudani if you want to be near the cable car, the museums and most of the inns on this page. Sengokuhara and Lake Ashi are quieter and reached by bus.",
  },
  {
    q: "Can I use an onsen with tattoos in Hakone?",
    a: `Often not in a public bath, so ask first. A room with its own bath avoids the problem. At Yoshiike, tattoos that two 10 × 14 cm cover seals can hide are allowed in the public baths. Mikawaya sends guests with tattoos to the room bath or family bath. Gora Kadan allows small fashion tattoos up to about A4 size and asks others to use the private bath. Read ${OWN}.`,
  },
  {
    q: "How far ahead should I book a Hakone ryokan?",
    a: "As soon as your dates are fixed, and earlier for weekends and November's autumn colour. Rooms with a bath are a minority at some inns: 10 of 25 at Mikawaya. Gora Kadan opens reservations six months ahead, on the 1st of the month at 12:30 Japan time. None of the inns gives a sell-out date.",
  },
  {
    q: "What is the difference between a room with an open-air bath and a reserved bath?",
    a: "A room with an open-air bath has the bath on its own balcony or garden, and it is yours for the whole stay. A reserved or family bath is a separate room you use for one session, about 40 to 60 minutes at the inns here. Semi-open-air means roofed but open to the air on one side.",
  },
  {
    q: "What time is check-in at a Hakone ryokan?",
    a: `At the inns here, 14:00 or 15:00, with check-out at 10:00 or 11:00. Dinner sets a limit on late arrivals: Yoshiike's last check-in with dinner is 17:00, Kyuan's window closes at 18:00, and Gora Kadan's latest dinner start is 19:00. Read ${OWN}.`,
  },
  {
    q: "Can children stay at a Hakone ryokan with a private onsen?",
    a: `Yes at all four, on different terms. Gora Kadan has no age limit, Mikawaya and Kyuan say children are welcome, and Yoshiike asks you to state each child's age when you book. Children's meals follow the adult menu at Yoshiike. Kyuan has no elevator. A room with its own bath lets a family bathe together. Read ${OWN}.`,
  },
];

const TITLE = "Hakone Ryokan with Private Onsen (2026): 4 Inns Compared";
const H1_LINE = "Hakone Ryokan with Private Onsen (2026):";
const DESCRIPTION =
  "Hakone Ryokan with Private Onsen: four inns compared on room baths, reserved baths, meals and tattoos. Hakone ryokan private onsen areas, Yumoto to Gora.";

const ROUTE = "/guides/attractions/hakone-ryokan-private-onsen";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/hakone-free-pass", title: "Hakone Free Pass (2026): Prices, What It Covers & Is It Worth It?" },
  { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip From Tokyo (2026): Timed Itinerary, Cost and Tours" },
  { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport" },
  { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day" },
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
];

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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Hakone Ryokan with Private Onsen</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE}<br />Which Room, Which Area, Which Rules
          </h1>
          <p className={styles.heroSubtitle}>
            A bath of your own, or one you reserve for an hour. Here is what four inns actually sell, from their
            own sites.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Room baths checked on official sites", "Six areas compared", "Tattoo rules"].map((t) => (
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
            A <strong>Hakone Ryokan with Private Onsen</strong> is either a room with its own open-air bath or an
            inn with a bath you reserve for about 40 to 60 minutes. Of the four inns confirmed on their own
            sites, three are in central Hakone around <strong>Kowakudani and Gora</strong>, and one is 7 minutes
            on foot from Hakone-Yumoto Station. Stays are usually sold with dinner and breakfast, so book early
            for weekends and November&apos;s autumn colour. Read {OWN}.
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
                <p className={styles.verdictStatLabel}>A bath in every room</p>
                <p className={styles.verdictStatValue}>Kyuan, 10 rooms</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free family bath</p>
                <p className={styles.verdictStatValue}>Mikawaya</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Closest to the Romancecar</p>
                <p className={styles.verdictStatValue}>Yoshiike, 7 min on foot</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Check-in / check-out</p>
                <p className={styles.verdictStatValue}>14:00–15:00 / 10:00–11:00</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> pick Kyuan if you want a bath in the room with no public bath to share,
              Mikawaya for a choice of room types, Yoshiike for the easiest arrival, and Gora Kadan for a top-end
              stay in Gora.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={hakoneRyokanKyuan.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Kyuan on Klook →
              </KlookLink>
              <KlookLink href={hakoneKowakienMikawaya.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Mikawaya on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Inns */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare inns</span>
          <h2 className={styles.sectionTitle}>Which Hakone Ryokan Have a Private Onsen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            These four, on their own sites. Only some rooms qualify at three of them, so choose the room type,
            not just the inn. Prices move by date, so none are listed here: open Klook for yours.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Inn", "Area", "Bath in the room", "Reserved or family bath", "Meals", "Getting there", "In / out", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inns.map((row) => (
                    <tr key={row.hotel.title}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.hotel.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.hotel.title}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.roomBath}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.reservedBath}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.meals}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.access}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.times}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Kyuan&apos;s home page says every room has an open-air bath, while its rooms page splits them into 2
            open-air and 8 semi-open-air, so this guide uses the rooms page. Its times come from its booking page.
            Yoshiike&apos;s Hollywood Twin bath is circulated rather than free-flowing, and the whole inn is closed
            7 to 10 December 2026. Gora Kadan&apos;s walk is from the Hakone tourism association.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneYoshiikeRyokan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Yoshiike Ryokan →
            </KlookLink>
            <KlookLink href={hakoneRyokanKyuan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyuan →
            </KlookLink>
            <KlookLink href={hakoneGoraKadan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Gora Kadan →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Two more on Klook.</strong> No official site is listed here for{" "}
            <KlookLink href={hakoneYuyuListing.url} target="_blank" rel="sponsored noopener">YuYu Hakone</KlookLink>{" "}
            or{" "}
            <KlookLink href={hakoneChisujiListing.url} target="_blank" rel="sponsored noopener">Chisuji Ryokan</KlookLink>
            , so they are not in the table. Read the room type on Klook to see what bath you are booking.
          </p>
        </section>

        {/* Types */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Bath types</span>
          <h2 className={styles.sectionTitle}>What Is the Difference Between a Room Bath and a Reserved Bath?</h2>
          <p className={styles.bodyText}>
            A room with an open-air bath has the bath on its own balcony or garden, and it is yours for the whole
            stay. A reserved or family bath is a separate room that you lock for one session: about 60 minutes at
            Mikawaya and 40 at Kyuan. Semi-open-air means covered but open to the air on one side. Yoshiike&apos;s
            two reserved baths are indoors. Booking rules differ: Mikawaya&apos;s is free and first come, while
            Yoshiike and Kyuan take reservations and charge for it.
          </p>
        </section>

        {/* Worth it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Worth it?</span>
          <h2 className={styles.sectionTitle}>Is a Private Onsen Worth It in Hakone?</h2>
          <p className={styles.bodyText}>
            Yes, if you have tattoos, want to bathe as a couple or a family, or want to bathe at any hour. If you
            only want one private soak, a reserved bath is the cheaper route, because you do not pay for the room
            type. Mikawaya&apos;s free family bath is the clearest example, open 5:00 to 10:00 and 15:00 to 24:00.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneKowakienMikawaya.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Mikawaya rooms →
            </KlookLink>
          </div>
        </section>

        {/* Areas */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Areas</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay in Hakone?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Stay in Hakone-Yumoto for the easiest arrival, or Gora and Kowakudani to be near the cable car and
            museums. Sengokuhara and Lake Ashi are a bus ride from Hakone-Yumoto, so they suit a slower stay.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Getting there", "For sightseeing", "Autumn colour, usual timing", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.sights}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.colour}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Add the Shinjuku to Hakone-Yumoto time to each leg: the fastest Romancecar is 75 minutes on Hakone
            Navi, and the inns quote about 85 to 90. Train, bus and colour timings come from Hakone Navi, Odakyu,
            the Hakone tourism association and Mikawaya&apos;s access page, and they vary by service and by year.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Hakone hotels on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Tattoos */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tattoos</span>
          <h2 className={styles.sectionTitle}>Can I Use an Onsen With Tattoos in Hakone?</h2>
          <p className={styles.bodyText}>
            Often not in a public bath, which is the best reason to book your own. Japan&apos;s national tourism
            organization says many onsen refuse guests with tattoos, so check first. The rules differ by inn:
          </p>
          <ul className={styles.bodyText}>
            <li><strong>Yoshiike:</strong> tattoos are generally refused in the public baths, but those that two 10 × 14 cm cover seals can hide are allowed. Seals are sold at the front desk.</li>
            <li><strong>Mikawaya:</strong> the public baths are not available. Use the room&apos;s open-air bath or the family bath.</li>
            <li><strong>Gora Kadan:</strong> small fashion tattoos up to about A4 size are allowed. For larger ones, use the private bath.</li>
            <li><strong>Kyuan:</strong> has no public bath, and its FAQ does not state a tattoo rule. Ask if you plan to use the shared reserved bath.</li>
          </ul>
          <p className={styles.bodyText}>Read {OWN} on each inn&apos;s site.</p>
        </section>

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Can You Stay at a Hakone Ryokan With Children?</h2>
          <p className={styles.bodyText}>
            Yes at all four, and a room with its own bath lets a family bathe together. Gora Kadan has no age
            limit and lends baby items such as a cot and a kettle. Mikawaya has a children&apos;s menu but no baby
            supplies. Yoshiike asks for each child&apos;s age when you book, and its children&apos;s meals follow the
            adult menu. Kyuan welcomes children but has no elevator. In public baths, Yoshiike and Gora Kadan
            limit children in the opposite sex&apos;s bath to age 6 or under, and Yoshiike adds a limit of under 120
            cm. Read {OWN}.
          </p>
        </section>

        {/* Times */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Times</span>
          <h2 className={styles.sectionTitle}>What Time Is Check-In at a Hakone Ryokan?</h2>
          <p className={styles.bodyText}>
            Check-in is 14:00 at Yoshiike and 15:00 at the other three. Check-out is 10:00 at Yoshiike and
            Mikawaya, and 11:00 at Kyuan and Gora Kadan. Arrive in time for dinner: Yoshiike&apos;s last check-in
            with dinner is 17:00, Kyuan&apos;s check-in closes at 18:00, and Gora Kadan&apos;s latest dinner start is
            19:00. Tell the inn if you will be late.
          </p>
        </section>

        {/* Night vs day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Night or day trip</span>
          <h2 className={styles.sectionTitle}>Should You Stay the Night or Visit Hakone for the Day?</h2>
          <p className={styles.bodyText}>
            Stay if the bath is the point. A night gives you 19 to 20 hours at the inn, with dinner and breakfast,
            while a day trip usually means a public bath and a train home. It also makes the transport simpler: the
            Hakone Freepass has no 1-day version, and the 2-day pass from Shinjuku is ¥7,100, with the ¥1,200
            Romancecar surcharge on top (read {PASS_DATE}). For the day-out version, see our{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone day trip guide</Link> and our{" "}
            <Link href="/guides/attractions/hakone-free-pass">Hakone Free Pass guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hakone Freepass →
            </KlookLink>
          </div>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How Far Ahead Should I Book a Hakone Ryokan?</h2>
          <p className={styles.bodyText}>
            As soon as your dates are fixed, and first for weekends and November. Rooms with a bath are a limited
            part of each inn: 10 of 25 at Mikawaya, and Kyuan has only 10 rooms in total. Gora Kadan opens each
            month six months ahead, on the 1st at 12:30 Japan time. No inn publishes a sell-out date, so treat
            this as planning advice rather than a rule.
          </p>
          <p className={styles.bodyText}>
            Read the cancellation terms before you pay, because they change with where you book. At Gora Kadan,
            direct bookings cost nothing to cancel 8 or more days out, while travel agency bookings carry 70% from
            31 days and 100% from 14 days. Check the terms shown for your room on Klook before you pay. Klook&apos;s Hakone
            listings also show a bathing tax of ¥150 per person per night.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneRyokanKyuan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your dates at Kyuan →
            </KlookLink>
            <KlookLink href={hakoneYoshiikeRyokan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your dates at Yoshiike →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="What Should You Book Around a Night in Hakone?"
          intro="Once the room is settled, these cover the rest of the trip. Open a listing for the price on your dates."
          items={hakoneRyokanTripPrep}
        />

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
          intro="The four inns in the table. Open one for the current price and the room types on your dates."
          tours={[hakoneRyokanKyuan, hakoneKowakienMikawaya, hakoneYoshiikeRyokan, hakoneGoraKadan]}
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
              Rooms with their own bath are limited at most inns, so check your dates first.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hakoneRyokanKyuan.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kyuan →
              </KlookLink>
              <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                All Hakone Hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
