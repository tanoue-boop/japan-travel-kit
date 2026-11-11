import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import WinterBookingTop from "../../../components/WinterBookingTop";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  hanedaLimousineBus,
  jigokudaniStayAreas,
  jigokudaniZenkojiPrivateDayTrip,
  jigokudaniZenkojiSukiyakiTour,
  jrEastPass,
  klookEsim,
  naritaExpressRoundTripUrl,
  nozawaSnowMonkeyZenkojiTour,
  type KlookTripPrepItem,
} from "../../../lib/klook-links";
import {
  snowMonkeySukiyakiTourTokyo,
  snowMonkeysZenkojiSakeNaganoTour,
} from "../../../lib/klook-links-winter-honshu";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Jigokudani Yaen-koen (the Snow Monkey Park) as a day from Tokyo — a winter page that has to be
 * live before December, when the bathing season starts and the park's web-ticket priority begins.
 *
 * Re-read 6 Nov 2026. The park's 20 Sep 2026 fee notice (information-3104, an image, read in full)
 * sets new admission from 1 Dec 2026 (令和8年12月1日): adults ¥800 → ¥1,000, children ¥400 → ¥500,
 * groups of 20+ ¥680 → ¥840 and ¥340 → ¥420, with web tickets at ¥880 / ¥440 and group web tickets
 * at ¥740 / ¥380. Its hours-and-fees page confirms the 1 Dec date and still prints the old table.
 * Online tickets started with the park's notice of 6 Aug 2026; the home page keeps the December–April
 * web-ticket priority. Access times were re-read from the park's access page and are unchanged.
 * The English site's guide page still says there is no advance ticket service; the Japanese
 * notices are newer, so this page follows them.
 *
 * Other dated copy, and where it came from, read on 3 Nov 2026:
 *
 * - Hours, closures: the park's own hours-and-fees page (jigokudani-yaenkoen.co.jp/guide/):
 *   April–October 8:30–17:00, November–March 9:00–16:00; open every day but may close without
 *   notice for weather, the monkeys' behaviour or natural disasters.
 * - Web-ticket priority: the park's home page (Japanese and English) — December to April, entry
 *   priority goes to visitors holding web tickets.
 * - Access: the park's own access page (Japanese and English) — Hokuriku Shinkansen Tokyo–Nagano
 *   fastest 79 minutes; Nagano Electric Railway limited express Nagano–Yudanaka 38 minutes; bus
 *   Yudanaka–Snow Monkey Park 15 minutes; express bus Nagano–Snow Monkey Park 41 minutes; walk from
 *   the Snow Monkey Park stop about 35 minutes; Kanbayashi Onsen free car park and the ~2 km Yumichi
 *   trail about 30 minutes; Jigokudani car park ¥500 and about 15 minutes, but the Shibu Onsen
 *   forest road to it closed in winter; no wheelchairs or carts.
 * - Footwear and rules: the park's caution page — snow boots in winter, simple crampons
 *   recommended; no dogs or cats including assistance dogs; no drones or selfie sticks; flash is
 *   fine; do not feed, touch or stare at the monkeys.
 * - Elevation 850 m, open since 1964, winter to −10°C and over 1 m of snow, bathing mainly
 *   December–March: the park's English "about" and first-visit pages.
 * - The two Snow Monkey Pass products: Nagaden's own Snow Monkey Resorts page (contents only — no
 *   price is published there as text).
 *
 * Deliberately absent: the shinkansen fare (JR East's site does not return readable pages to
 * automated reads), the Nagaden train fare and the bus fares (Nagaden publishes its fare table
 * only as a PDF we could not read, and third-party figures for the 2026-27 express bus disagree).
 * The top block shows from-prices only where a klook.com index result tied one to the listing; the
 * body has no Klook price, because Klook answers automated reads with HTTP 403.
 */

/** Everything dated below was read off the operators' own sites on this date. */
const CHECKED_ISO = "2026-11-06";
const CHECKED = checkedLabel(CHECKED_ISO);

const ROUTE = "/guides/attractions/jigokudani-snow-monkey-tour";

const factRows = [
  { item: "Admission from 1 Dec 2026, adult (18+)", value: "¥1,000 at the gate, ¥880 web ticket", note: "¥800 until 30 Nov. Groups of 20 or more ¥840, or ¥740 by web ticket" },
  { item: "Admission from 1 Dec 2026, child (elementary to high school)", value: "¥500 at the gate, ¥440 web ticket", note: "¥400 until 30 Nov. Under 6 free with a guardian; groups ¥420, or ¥380 by web ticket" },
  { item: "Opening hours, November–March", value: "9:00–16:00", note: "Arrive at least 30 minutes before closing" },
  { item: "Opening hours, April–October", value: "8:30–17:00", note: "" },
  { item: "Closed", value: "No fixed closing day", note: "May close without notice for weather, the monkeys' behaviour or natural disasters" },
  { item: "Web tickets", value: "Priority entry December–April", note: "Bought online for a chosen date; cheaper than the gate from 1 Dec" },
  { item: "Elevation", value: "850 m", note: "Winter lows to −10°C and over 1 m of snow" },
];

const routeRows = [
  {
    leg: "Tokyo → Nagano",
    how: "Hokuriku Shinkansen (Kagayaki, Hakutaka or Asama)",
    time: "79 min at fastest",
    notes: "Covered by the JR EAST PASS. Fare not printed here — see the note below",
  },
  {
    leg: "Nagano → Yudanaka",
    how: "Nagano Electric Railway limited express",
    time: "38 min",
    notes: "Private railway, not JR — a JR pass does not cover it",
  },
  {
    leg: "Yudanaka → Snow Monkey Park stop",
    how: "Local bus",
    time: "15 min",
    notes: "Included in Nagaden's SNOW MONKEY PASS (train version)",
  },
  {
    leg: "Nagano → Snow Monkey Park stop (alternative)",
    how: "Express bus from Nagano Station East Exit",
    time: "41 min",
    notes: "Replaces the train and local bus. Nagaden also sells a bus-plus-admission pass",
  },
  {
    leg: "Snow Monkey Park stop → the park",
    how: "On foot, unpaved trail",
    time: "About 35 min",
    notes: "Snow and ice in winter; no wheelchairs or carts",
  },
  {
    leg: "Kanbayashi Onsen car park → the park",
    how: "On foot, Yumichi trail (about 2 km)",
    time: "About 30 min",
    notes: "The park's free car park. Mostly flat with some slopes",
  },
  {
    leg: "Jigokudani car park → the park",
    how: "On foot",
    time: "About 15 min",
    notes: "¥500 per car — but the forest road from Shibu Onsen is closed in winter",
  },
];

const compareRows = [
  {
    aspect: "Getting there",
    diy: "Shinkansen to Nagano (79 min at fastest), then train and bus or the express bus, then the walk",
    tour: "A coach from Tokyo, or a guided day from Nagano Station after your own shinkansen; the connections are the tour's problem",
  },
  {
    aspect: "Time on the move, one way",
    diy: "About 2 hr 50 min of pure travel and walking (79 + 38 + 15 + 35 min) before any waiting for connections",
    tour: "A long day: the Tokyo coach listings run about 12 to 13 hours round trip — but nothing to miss",
  },
  {
    aspect: "Park entry",
    diy: "From 1 December, ¥1,000 at the gate or ¥880 by dated web ticket — which has priority December to April",
    tour: "Check the listing for whether admission is included",
  },
  {
    aspect: "Zenko-ji on the same day",
    diy: "Possible, but only if you start early: the temple is in Nagano city, the park is 41+ minutes beyond it",
    tour: "Several Jigokudani day tours on Klook build it in; the Shinjuku sukiyaki coach day does not",
  },
  {
    aspect: "What goes wrong",
    diy: "A missed bus at Yudanaka or Nagano, and the 16:00 winter closing coming faster than planned",
    tour: "Weather and traffic on the expressway in snow; a fixed amount of time at the park",
  },
  {
    aspect: "Who it suits",
    diy: "Travellers with a JR EAST PASS already, or anyone staying a night at Shibu, Yudanaka or Kanbayashi",
    tour: "A single day from Tokyo with no night in Nagano, first-timers, and families who want a guide on the trail",
  },
];

const faqItems = [
  {
    q: "How much is the Jigokudani Snow Monkey Park entrance fee?",
    a: `From 1 December 2026 it is ¥1,000 for an adult (18 and over) and ¥500 for a child from elementary to high school age at the gate, or ¥880 and ¥440 by web ticket, according to the park's own fee notice. Until 30 November it is still ¥800 and ¥400. Children under 6 are free with a guardian, groups of 20 or more pay ¥840 and ¥420 (¥740 and ¥380 by web ticket), and there is no senior discount. Discounts cannot be combined. From December to April, visitors who bought a web ticket for their date get priority entry. Read on ${CHECKED}.`,
  },
  {
    q: "What are the Jigokudani opening hours?",
    a: `9:00 to 16:00 from November to March and 8:30 to 17:00 from April to October, per the park's own site. There is no regular closing day, but the park says it may close without notice for weather, the monkeys' behaviour or natural disasters, and asks you to arrive at least 30 minutes before closing so you are out by closing time. Read on ${CHECKED}.`,
  },
  {
    q: "Can you do a snow monkey day trip from Tokyo?",
    a: "Yes, but it is a long one. The park's own access page gives 79 minutes at fastest from Tokyo to Nagano on the Hokuriku Shinkansen, then 38 minutes on the Nagano Electric Railway limited express to Yudanaka, a 15-minute bus to the Snow Monkey Park stop and about 35 minutes on foot. That is close to three hours each way before any waiting — and the park closes at 16:00 in winter. Leave Tokyo early, or let a tour carry the connections.",
  },
  {
    q: "How long is the walk to the snow monkeys?",
    a: "About 35 minutes from the Snow Monkey Park bus stop, about 30 minutes (roughly 2 km on the Yumichi trail) from the free car park at Kanbayashi Onsen, and about 15 minutes from the paid Jigokudani car park — which you cannot use in winter because the forest road from Shibu Onsen is closed. The path is unpaved with slopes and steps, and wheelchairs and carts cannot be used.",
  },
  {
    q: "When is the best time to see the snow monkeys?",
    a: "December to March for the bathing. The park's own pages say the monkeys bathe mainly in that season, to keep warm, and are reluctant to bathe when it is warm. Winter at 850 m means lows of −10°C and over a metre of snow, which is the picture most visitors want. The monkeys are wild, so the park publishes a weekly forecast of how likely they are to come down — check it before you go.",
  },
  {
    q: "What should I wear to Jigokudani in winter?",
    a: "Snow boots, and simple crampons if you have them. That is the park's own advice: boots or snow boots in winter, sneakers or hiking shoes in summer, and simple crampons (light slip-on spikes) for a safer walk on the packed snow and ice. Dress for −10°C rather than for Tokyo, and keep your hands free for the steps.",
  },
  {
    q: "Is a snow monkey tour worth it?",
    a: "For a single day from Tokyo, usually yes. The train route has four legs and a walk, two of them on small operators with limited departures, and the winter closing is 16:00 — a missed connection costs you the monkeys, not just time. Several tours also add Zenko-ji, which is hard to fit in independently on the same day. If you are staying a night at Shibu, Yudanaka or Kanbayashi, or already hold a JR EAST PASS, doing it yourself is easy and cheaper.",
  },
  {
    q: "Can you combine snow monkeys with Shibu Onsen or Zenko-ji?",
    a: "Yes, and both are on the way. Shibu Onsen is the hot-spring village just below the park, and the natural add-on if you stay the night. Zenko-ji is in Nagano city, where the trip changes trains, and several Klook Jigokudani day tours pair it with the park. Done independently in one day from Tokyo, the temple works best in the afternoon on the way back — but only if you left the park well before the 16:00 winter closing.",
  },
  {
    q: "Do you need to book Jigokudani tickets in advance?",
    a: "Not essential, but worth it in winter. The park sells dated web tickets, gives their holders priority entry from December to April, and from 1 December 2026 charges ¥880 for one against ¥1,000 at the gate, so in the busy season a web ticket is both the way past the queue and the cheaper ticket. Join-in tours also run to a fixed capacity on a fixed date, so book one as soon as your date is fixed, and check the listing's cancellation terms for snow days.",
  },
  {
    q: "Can you bring children, a pushchair or a dog to Jigokudani?",
    a: "Children yes, pushchairs and dogs no. Under-6s enter free with a guardian, but the trail is unpaved with slopes and steps, and the park says wheelchairs and carts cannot be used — carry small children. Dogs and cats are not allowed, including assistance dogs, because dogs are the monkeys' natural enemy.",
  },
  {
    q: "What are the rules at the Snow Monkey Park?",
    a: "Do not feed, touch or stare at the monkeys. The park's own caution page says food makes them grab bags and cling to legs, that staring closely into a monkey's eyes is a sign of hostility, and that if a young monkey approaches you should move away. Photos and even flash are fine, but drones and selfie sticks are banned and cameras must not go near the monkeys or into the bath.",
  },
  {
    q: "Does the JR Pass or JR EAST PASS cover the trip to the snow monkeys?",
    a: "As far as Nagano. The JR EAST PASS (¥35,000 for 5 days, ¥50,000 for 10) covers the Hokuriku Shinkansen from Tokyo to Nagano. From Nagano onward the Nagano Electric Railway and the buses are private, so you pay for them separately — or buy Nagaden's own SNOW MONKEY PASS, which bundles the railway, the Yudanaka bus and park admission.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

/** The same-trip block. The TOKYO Wide Pass stops short of Nagano, so the pass here is the JR EAST PASS. */
const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "Klook Japan eSIM",
    ctaLabel: "See eSIM options on Klook →",
    url: klookEsim.url,
    why: "Your dated web ticket, the bus times at Yudanaka and Nagano, and the park's monkey forecast all live on your phone, and the park can close without notice for weather.",
  },
  {
    label: "Narita Express (N'EX) round-trip ticket",
    ctaLabel: "Check the N'EX round trip →",
    url: naritaExpressRoundTripUrl,
    why: "It reaches Tokyo Station, where the Hokuriku Shinkansen to Nagano leaves, so an arrival from Narita can sleep near the first train north.",
  },
  {
    label: hanedaLimousineBus.title,
    ctaLabel: "Check the limousine bus →",
    url: hanedaLimousineBus.url,
    why: "The Haneda version, with Shinjuku among its stops. That matters if you are taking the Shinjuku coach day, which leaves early from the west side of the station.",
  },
  {
    label: jrEastPass.title,
    ctaLabel: "Check the JR EAST PASS →",
    url: jrEastPass.url,
    why: "Covers the shinkansen as far as Nagano, not the private railway and buses after it. It pays when the snow monkeys are one of several long trips in the same 5 or 10 days.",
  },
];

const TITLE = "Snow Monkey Tour from Tokyo: Jigokudani Park Guide 2027";
const DESC =
  "Snow Monkey Tour or DIY? Jigokudani is ¥1,000 from 1 Dec (¥880 web), open 9:00–16:00 in winter, 79 min to Nagano by shinkansen, then a 35-min snowy walk.";

export default function JigokudaniSnowMonkeyTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
              route: ROUTE,
              headline: TITLE,
              description: DESC,
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Jigokudani Snow Monkey Tour",
                  item: `https://www.japan-travel-kit.com${ROUTE}`,
                },
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
          <span className={styles.breadCurrent}>Jigokudani Snow Monkey Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Snow Monkey Tour from Tokyo (2027):<br />Jigokudani Fees, Hours, the Walk and Tour vs DIY
          </h1>
          <p className={styles.heroSubtitle}>
            Japan&apos;s bathing monkeys live in a valley above Nagano, a train, a bus and a snowy
            trail beyond the shinkansen. Here is what it costs, how long it takes, and when a tour is
            the better way in.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fees & hours, dated", "Tour vs doing it yourself"].map((t) => (
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

        <WinterBookingTop
          heading="Which Snow Monkey Tour from Tokyo Can You Book for This Winter?"
          checkedIso="2026-11-06"
          deadline={
            <>
              Book by 30 November for Christmas and New Year dates, and at least three weeks out for January
              and February. Bathing is mainly December to March, so every tour date falls in the same short
              season. Going on your own? Buy the dated web ticket when your date is fixed: holders get
              priority from December to April, and from 1 December it costs ¥880 against ¥1,000 at the gate.
            </>
          }
          tours={[
            {
              title: snowMonkeySukiyakiTourTokyo.title,
              url: snowMonkeySukiyakiTourTokyo.url,
              price: "from about US$128",
              duration: "12 hours (08:00–20:00)",
              departs: "Shinjuku, Tokyo",
            },
            {
              title: jigokudaniZenkojiSukiyakiTour.title,
              url: jigokudaniZenkojiSukiyakiTour.url,
              price: null,
              duration: "About 13 hours 10 minutes",
              departs: "Tokyo",
            },
            {
              title: jigokudaniZenkojiPrivateDayTrip.title,
              url: jigokudaniZenkojiPrivateDayTrip.url,
              price: null,
              duration: "10 hours",
              departs: "Your hotel in Tokyo",
            },
          ]}
        />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Admission from 1 Dec</p>
                <p className={styles.verdictStatValue}>¥1,000 adult (¥880 web)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Winter hours (Nov–Mar)</p>
                <p className={styles.verdictStatValue}>9:00–16:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tokyo → Nagano</p>
                <p className={styles.verdictStatValue}>79 min at fastest</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Walk to the monkeys</p>
                <p className={styles.verdictStatValue}>30–35 min, snow in winter</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Jigokudani Yaen-koen, the Snow Monkey Park, costs ¥1,000 for
              an adult and ¥500 for a child at the gate from 1 December 2026, or ¥880 and ¥440 by web
              ticket (¥800 and ¥400 until 30 November), and is open 9:00–16:00 from November to March (8:30–17:00
              April to October). From Tokyo it is 79 minutes at fastest to Nagano on the Hokuriku
              Shinkansen, then 38 minutes on the Nagano Electric Railway to Yudanaka and a 15-minute
              bus — or a 41-minute express bus from Nagano — and finally about 35 minutes on foot on
              an unpaved trail that is snow and ice in winter. A snow monkey tour carries all of
              those connections for you and often adds Zenko-ji; doing it yourself is cheaper but
              close to three hours each way. All figures from the park&apos;s own site, read on{" "}
              {CHECKED}.
            </p>
            <KlookLink
              href={snowMonkeySukiyakiTourTokyo.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check snow monkey tours on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Same trip */}
        <KlookTripPrep
          label="Book on the same trip"
          heading="What Else Does a Snow Monkey Trip Need?"
          intro="Three things a day to Jigokudani depends on: data for the buses and your ticket, a way in from the airport, and the pass that covers the shinkansen half."
          items={sameTripItems}
        />

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Jigokudani Snow Monkey Park?</h2>
          <p className={styles.bodyText}>
            Jigokudani Yaen-koen is a wild monkey park in the Yokoyu valley above Yamanouchi, in
            northern Nagano Prefecture. It has been open since 1964, sits at 850 m, and is famous for
            one thing: Japanese macaques sitting in a hot-spring pool while snow falls around them.
            The park&apos;s own pages describe winters down to −10°C with more than a metre of snow,
            and say the monkeys bathe to keep warm — mainly from December to March.
          </p>
          <p className={styles.bodyText}>
            The monkeys are wild and come and go as they please. The park publishes a weekly forecast
            of how likely they are to appear and warns that on some days they may not come down at
            all, so check it before you commit a whole day from Tokyo.
          </p>
        </section>

        {/* Fees and hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fees &amp; hours</span>
          <h2 className={styles.sectionTitle}>How Much Is the Entrance Fee, and When Is It Open?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Official figure", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fees from the park&apos;s fee-revision notice of 20 September 2026; hours and closures from
            its hours-and-fees page, which confirms the 1 December change but still prints the old
            table; web-ticket priority from its home page; elevation and climate from its English
            &quot;about&quot; page. Fees, hours and priority read on jigokudani-yaenkoen.co.jp on{" "}
            {CHECKED}. The web ticket is sold through the park&apos;s webticket page, and Nagaden also
            sells a bus-plus-admission version.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get From Tokyo to the Snow Monkeys?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Four legs and a walk. The first is fast; the last three are where the day is won or lost.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "How", "Time", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.how}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Times from the park&apos;s own access page, read on {CHECKED}; the pass contents from
            Nagano Electric Railway&apos;s own Snow Monkey page, read on 3 November 2026.{" "}
            <strong>On fares:</strong> no yen figure is printed here for the shinkansen, the Nagaden train or
            the buses. JR East&apos;s fare page is not quoted here, Nagaden publishes its
            fare table only as a PDF, and the third-party figures for the 2026-27
            express bus disagree with each other — so check them at the station or on the
            operators&apos; own sites. Our{" "}
            <Link href="/guides/transport/jr-east-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR East Pass guide
            </Link>{" "}
            works out when the pass beats single tickets to Nagano.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR EAST PASS on Klook →
            </KlookLink>
            <KlookLink href={snowMonkeysZenkojiSakeNaganoTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Guided day from Nagano Station →
            </KlookLink>
          </div>
        </section>

        {/* Walk */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The walk</span>
          <h2 className={styles.sectionTitle}>How Long Is the Walk to the Snow Monkeys?</h2>
          <p className={styles.bodyText}>
            <strong>About 30 to 35 minutes in winter, whichever way you come.</strong> From the Snow
            Monkey Park bus stop the park gives about 35 minutes; from the free car park at Kanbayashi
            Onsen, about 30 minutes along the roughly 2 km Yumichi trail, which it describes as mostly
            flat with some slopes. The short way — about 15 minutes from the paid Jigokudani car park
            (¥500) — is a summer option only: the forest road up from Shibu Onsen is closed in winter
            and too narrow for large vehicles at any time.
          </p>
          <p className={styles.bodyText}>
            The path is unpaved, with slopes, steps and stairs, and the park says wheelchairs and carts
            cannot be used on it. In winter it is packed snow and, in places, ice. Budget an hour for
            the round-trip walk plus whatever time you spend watching, and plan to be at the gate at
            least 30 minutes before the 16:00 winter closing.
          </p>
        </section>

        {/* Clothing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What to wear</span>
          <h2 className={styles.sectionTitle}>What Should You Wear to See the Snow Monkeys in Winter?</h2>
          <p className={styles.bodyText}>
            <strong>Snow boots and, ideally, simple crampons.</strong> The park&apos;s own advice is
            boots or snow boots in winter (sneakers or hiking shoes the rest of the year) and to buy
            simple crampons — light slip-on spikes — in advance for a safer walk. Dress for the
            valley, not for Tokyo: the park describes winter lows of −10°C. Gloves you can use a
            phone in, a hat, and a bag that closes properly are the other three essentials.
          </p>
          <p className={styles.bodyText}>
            Once inside, the rules are short and the park takes them seriously: do not feed the
            monkeys, do not touch them, do not stare closely into their eyes (a sign of hostility),
            and move away if a young one approaches. Photos and flash are fine; drones and selfie
            sticks are banned, and cameras must not be pushed towards the monkeys or into the bath.
            Dogs and cats — including assistance dogs — are not allowed.
          </p>
        </section>

        {/* Tour vs DIY */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is a Snow Monkey Tour Worth It, or Should You Go Yourself?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "On your own", "Snow monkey tour"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.aspect}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.aspect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.diy}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The decision rule: <strong>a single day from Tokyo with no night in Nagano — take a
            tour.</strong> Four legs, two small operators and a 16:00 closing leave little room for
            a missed bus. <strong>A night at Shibu, Yudanaka or Kanbayashi, or a JR EAST PASS already
            in your pocket — go yourself.</strong> Staying close turns the walk into a morning stroll
            before the day-trippers arrive.
          </p>
          <p className={styles.bodyText}>
            <strong>When to book:</strong> join-in tours run to a fixed capacity on a fixed date, and
            the bathing season is only four months long, so book as soon as your date is fixed —
            holiday weeks first. Check the cancellation
            terms on the listing before you pay — snow on the expressway is the most likely reason a
            winter day changes shape.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jigokudaniZenkojiSukiyakiTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Snow monkeys + Zenko-ji day tour →
            </KlookLink>
            <KlookLink href={jigokudaniZenkojiPrivateDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private day trip for your group →
            </KlookLink>
          </div>
        </section>

        {/* Season */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Seasons</span>
          <h2 className={styles.sectionTitle}>When Is the Best Time to See the Snow Monkeys?</h2>
          <p className={styles.bodyText}>
            <strong>December to March, on a cold day.</strong> That is when the park says the monkeys
            bathe, and bathing is most common on the coldest, snowiest days. It is also when the park
            gives web-ticket holders priority entry (December to April), which tells you when the
            queues are. Go early in the day: the winter gate closes at 16:00, and a morning arrival
            leaves room for a late bus.
          </p>
          <p className={styles.bodyText}>
            Outside winter the park is open longer (8:30–17:00 from April to October) and the monkeys
            are still there, but the park says they are reluctant to bathe in the warm months, so
            the bath scene is unlikely. If that photograph is why you are going, November and April are a
            gamble and summer is the wrong trip.
          </p>
        </section>

        {/* Combine */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Combine</span>
          <h2 className={styles.sectionTitle}>Can You Combine the Snow Monkeys With Shibu Onsen or Zenko-ji?</h2>
          <p className={styles.bodyText}>
            <strong>Zenko-ji</strong> is in Nagano city, where every route to the park changes, and it
            is the stop several Jigokudani tours on Klook add. On your own, put it on the way back — only
            if you left the park in good time — rather than on the way out, when the park&apos;s
            closing time is the one that matters.
          </p>
          <p className={styles.bodyText}>
            <strong>Shibu Onsen</strong> is the old ryokan street just below the park, and{" "}
            <strong>Kanbayashi Onsen</strong> sits at the trailhead itself. Neither is really a
            day-trip add-on; both are the reason to make it an overnight. If you are skiing at Nozawa
            Onsen, there is also a winter-only Klook tour that brings the monkeys and Zenko-ji to you.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nozawaSnowMonkeyZenkojiTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              From Nozawa Onsen →
            </KlookLink>
          </div>
        </section>

        {/* The rest of the winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of your winter</span>
          <h2 className={styles.sectionTitle}>What Goes Well With the Snow Monkeys on a Winter Trip?</h2>
          <p className={styles.bodyText}>
            Jigokudani sits best inside a longer route rather than on its own, and our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link> lays out
            the 12-day version. If you are based in Tokyo, the closest match is a{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">Gala Yuzawa ski day trip</Link>:
            a JR EAST PASS covers both, so two long days share one pass. Save a free evening back in the
            city for the{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations</Link>, which ask
            far less of you than a 12-hour day out. The Hokuriku Shinkansen that brings you to Nagano also
            runs on to Kanazawa, the usual way into a{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour</Link>,
            and a January trip should fix that light-up date before the monkey day.
          </p>
          <p className={styles.bodyText}>
            Going further north is a separate trip, and a fair alternative if snow is the point. Skiers
            should compare this valley with{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link>. In February, the{" "}
            <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival tours</Link>{" "}
            are tied to 4–11 February 2027, so a monkey day has to fit before or after them. From Sapporo,
            an{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip</Link> is the easy
            add-on, and the{" "}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary">7-day Hokkaido itinerary</Link> shows
            what a full week up there looks like.
          </p>
        </section>

        <KlookStayAreas
          heading="Where Should You Stay for the Snow Monkeys?"
          intro="One night near the park turns a three-hour commute into a morning walk. These are four bases, from the trailhead itself to Nagano Station, each with a Klook hotel link."
          areas={jigokudaniStayAreas}
        />

        {/* eSIM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>Do You Need Mobile Data for the Snow Monkeys?</h2>
          <p className={styles.bodyText}>
            Yes, on this trip more than most. Your web ticket, the bus times at Yudanaka and Nagano,
            and the park&apos;s monkey forecast all live on your phone, and the trail and bus stops
            have no hotel Wi-Fi.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            or compare providers in our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link>.
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
          heading="Snow Monkey Tours on Klook"
          intro="Two Tokyo-departure day tours, a guided day from Nagano Station, a private day trip and the ski-season tour from Nozawa Onsen. Open a listing for the current price, what is included, the guide language and the cancellation terms on your date."
          tours={[
            snowMonkeySukiyakiTourTokyo,
            jigokudaniZenkojiSukiyakiTour,
            snowMonkeysZenkojiSakeNaganoTour,
            jigokudaniZenkojiPrivateDayTrip,
            nozawaSnowMonkeyZenkojiTour,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/zao-snow-monsters-tour", title: "Zao Snow Monsters Tour (2026–27): Season, Ropeway and Tours" },
              { href: "/guides/attractions/ginzan-onsen-tour", title: "Ginzan Onsen Tour (2026–27): Day Trip, Winter and Gas Lamps" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
              { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): Price, Coverage and Is It Worth It?" },
              { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "Gala Yuzawa Ski Day Trip from Tokyo" },
              { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tour (2027): Which Departure" },
              { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours (2027): Transfers, Lessons & 4 Areas" },
              { href: "/guides/attractions/sapporo-snow-festival-tours", title: "Sapporo Snow Festival Tours (2027)" },
              { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo (2027)" },
              { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day" },
              { href: "/guides/attractions/tokyo-illumination-tours", title: "Tokyo Illuminations: Dates, Hours and the Free Ones" },
              { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "Karuizawa Day Trip From Tokyo" },
              { href: "/guides/transport/tokyo-to-kanazawa", title: "Tokyo to Kanazawa (2026)" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026)" },
              { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan Itinerary 10 Days (2026): 10 Days in Japan, Day by Day" },
              { href: "/guides/esim/best-esim-japan", title: "Best eSIM for Japan (2026)" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18l6-13 5 8 3-4 4 9z" />
                    <line x1="2" y1="21" x2="22" y2="21" />
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
            <h2 className={styles.ctaBannerTitle}>Book the winter date before it fills</h2>
            <p className={styles.ctaBannerDesc}>
              Snow monkey tours run to a fixed capacity on a fixed date, and the bathing season is
              only December to March. Pick your day, check what the listing includes, and let the
              guide handle the train, the bus and the trail. Klook checks out in English and takes
              foreign cards.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={snowMonkeySukiyakiTourTokyo.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View snow monkey tours on Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
