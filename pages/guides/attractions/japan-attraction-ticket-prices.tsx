import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import {
  attractionPrices,
  checkedLabel,
  latestChecked,
  pricesInGroup,
  PRICE_GROUP_LABELS,
  type AttractionPrice,
  type PriceGroup,
} from "../../../lib/attraction-prices";
import {
  fujiHakoneDayTour,
  hakoneFreepass,
  hakoneLoopBusTour,
  hiroshimaMiyajimaMultiCityDayTour,
  jrKansaiAreaPass,
  klookEsim,
  kyotoNaraKiyomizuTour,
  kyotoStayAreas,
  nikkoCulturalDayTourUrl,
  osakaAmazingPass,
  osakaStayAreas,
  tokyoSharedAirportTransfer,
  tokyoSubwayTicket,
  whereToStayTokyoAreas,
} from "../../../lib/klook-links";

const TITLE = "Japan Attraction Ticket Prices 2026: Official Prices";
const DESC =
  "Official adult and child admission for every ticketed Japanese attraction, park and pass in 1 table — each row dated and sourced to the operator.";

const GROUP_ORDER: PriceGroup[] = ["tickets", "parks", "passes", "daytrips"];

const ROW_COUNT = attractionPrices.length;
const FREE_COUNT = attractionPrices.filter((p) => p.adult === "Free").length;
const MUST_BOOK = attractionPrices.filter((p) => p.booking === "Required");
const NO_BOOKING = attractionPrices.filter((p) => p.booking === "Not needed");
const DATE_PRICED = attractionPrices.filter((p) => p.adult.includes("–") || p.adult.includes("from"));
const AS_OF = checkedLabel(latestChecked());

/**
 * What is deliberately not in the table, and why. Both operators price by date from a
 * calendar and publish no standing adult figure, so a cell here would be a guess —
 * and neither guide carries a verified check date to attach to one.
 */
const EXCLUDED = [
  {
    name: "Tokyo Disneyland and DisneySea",
    href: "/guides/attractions/tokyo-disney-tickets",
    why: "Every ticket is date-specified with variable pricing and there are no gate sales at all, so the only real answer is the price shown for your date at checkout. What matters instead is booking early — popular dates sell out weeks ahead.",
  },
  {
    name: "Universal Studios Japan",
    href: "/guides/attractions/usj-tickets-express-pass",
    why: "Studio Pass prices are tiered by date, and since May 2025 USJ has not sold same-day tickets at the gate. The Express Pass is a separate variable add-on on top. The guide covers which tier to buy rather than a figure that changes weekly.",
  },
  {
    name: "Grand Sumo tournament tickets",
    href: "/guides/attractions/sumo-tokyo-tickets",
    why: "Seat prices vary by tier and by tournament day, and the official sale opens on a schedule rather than at a fixed price. Around 400 same-day tickets go on sale each day at roughly ¥2,200.",
  },
];

/**
 * The four passes in the table above, set against the single tickets — added
 * 28 Oct 2026, because the pass rows carry a price but not the arithmetic that
 * decides the purchase, which is the thing a reader comparing tickets actually
 * needs. `breakEven` is where each pass stops being more expensive than paying
 * per ride or per gate.
 *
 * Every figure is the operator's own with the date it was read, carried over from
 * the guide on this site that read it — the Metro fare table and the pass prices
 * from tokyometro.jp and osp.osaka-info.jp (19 Oct 2026), the castle and deck
 * admissions from osakacastle.net and Osaka's official tourism site (23 Oct 2026),
 * the Hakone prices and leg fares from odakyu-global.com and hakonenavi.jp, and the
 * Kansai pass prices and the HARUKA single from westjr.co.jp (both 25 Oct 2026).
 *
 * No Klook price appears anywhere here: Klook answers automated reads of its
 * product pages with HTTP 403, so none could be verified.
 */
const PASS_ROWS = [
  {
    pass: "Tokyo Subway Ticket",
    href: "/guides/attractions/tokyo-subway-ticket",
    covers:
      "Unlimited rides on every Tokyo Metro and Toei Subway line from first use. No JR at all, so the Yamanote Line is not on it.",
    breakEven:
      "Tokyo Metro adult fares run ¥178–¥324 a ride, so the 24-hour tier needs five or six rides inside one window. The 72-hour tier is about ¥667 a day, which four short rides already beat.",
    price: "¥1,000 / ¥1,500 / ¥2,000 adult for 24 / 48 / 72 hours",
    source: "tokyometro.jp, read 19 October 2026",
    url: tokyoSubwayTicket.url,
    cta: "Check the subway ticket →",
  },
  {
    pass: "Osaka Amazing Pass",
    href: "/guides/attractions/osaka-attractions-pass",
    covers:
      "Unlimited Osaka Metro and city buses plus free admission to more than 40 facilities — Osaka Castle, the Umeda Sky Building observatory, Tsutenkaku, the HEP FIVE wheel and the river cruises. Universal Studios Japan and the Kaiyukan are not on it.",
    breakEven:
      "Two paid facilities usually do it. The Osaka Castle keep is ¥1,200 and the Gozabune boat ¥1,800 at the gate — ¥3,000 against a ¥2,500 pass. The Umeda Sky Building is ¥2,000, but the pass only admits you free before 15:00.",
    price: "¥2,500 (1 day) / ¥3,300 (2 day) adult",
    source: "osp.osaka-info.jp/en, read 19 October 2026",
    url: osakaAmazingPass.url,
    cta: "Check the Osaka pass →",
  },
  {
    pass: "Hakone Freepass",
    href: "/guides/attractions/hakone-free-pass",
    covers:
      "The Odakyu Line out and back plus the eight transport modes around the loop — Tozan train, cable car, ropeway, the Lake Ashi cruise and the designated buses. The Romancecar reserved seat is ¥1,200 extra, and there is no 1-day version.",
    breakEven:
      "Ride the whole loop and it clears easily: the ropeway alone is ¥2,000 and the lake cruise ¥1,200, and Odakyu's own published comparison puts the same Hakone route at ¥9,200 via JR against ¥7,100 with the pass. Two short legs do not come close.",
    price: "¥7,100 (2-day) / ¥7,500 (3-day) from Shinjuku; ¥6,000 / ¥6,400 from Odawara",
    source: "odakyu-global.com and hakonenavi.jp, read 25 October 2026",
    url: hakoneFreepass.url,
    cta: "Check the Hakone Freepass →",
  },
  {
    pass: "WEST QR Kansai Area Pass",
    href: "/guides/attractions/kansai-area-pass",
    covers:
      "JR West local, rapid and special rapid trains around Osaka, Kyoto, Kobe, Nara and Himeji, plus unlimited non-reserved HARUKA from Kansai Airport and two reserved HARUKA seats. No subway, no city bus, no private railway and no shinkansen.",
    breakEven:
      "The airport run does most of the work: from 1 November 2026 the discounted HARUKA one-way ticket to Kyoto is ¥2,700 — exactly the price of a 1-day pass, with every other JR ride that day on top of it.",
    price: "¥2,700 (1 day) to ¥6,700 (4 days) adult, children half",
    source: "westjr.co.jp, read 25 October 2026",
    url: jrKansaiAreaPass.url,
    cta: "Check the Kansai pass →",
  },
];

/**
 * Day tours against the day-trip admissions in the table above — added
 * 28 Oct 2026. The comparison is deliberately not a price one: the admissions
 * here are ¥200 to ¥2,000 and a guided day never undercuts them, so what each
 * line states instead is the transport and the entries the listing itself covers.
 * Nothing below is first-hand, and no tour price appears — Klook's product pages
 * answer automated reads with HTTP 403.
 */
const TOUR_ROWS = [
  {
    title: fujiHakoneDayTour.title,
    covers:
      "The Fuji Fifth Station paired with the Hakone volcanic area and Lake Ashi in one day out of Tokyo. There is no admission to the Fifth Station — what the booking buys is the coach, which is the part a train and mountain bus day makes hardest.",
    url: fujiHakoneDayTour.url,
    cta: "Check the Fuji & Hakone day →",
  },
  {
    title: hakoneLoopBusTour.title,
    covers:
      "The guided version of the Hakone loop, with the ropeway and the pirate-ship cruise inside the booking — the two legs that are ¥2,000 and ¥1,200 on their own, and the reason the Hakone Freepass exists.",
    url: hakoneLoopBusTour.url,
    cta: "Check the Hakone loop day →",
  },
  {
    title: kyotoNaraKiyomizuTour.title,
    covers:
      "Kiyomizu-dera, Fushimi Inari and Nara Park on one coach day from Osaka or Kyoto. Nara Park and the deer are free either way; the ¥800 Great Buddha Hall fee at Todai-ji is the one in the table above that listings differ on, so read the inclusions before you book.",
    url: kyotoNaraKiyomizuTour.url,
    cta: "Check the Kyoto–Nara day →",
  },
  {
    title: hiroshimaMiyajimaMultiCityDayTour.title,
    covers:
      "Itsukushima Shrine and the Peace Memorial Park as a guided day, sold out of Hiroshima, Kyoto or Osaka. The admissions themselves are small — ¥300 for the shrine and ¥200 for the museum — so the long rail legs and the Miyajima crossing are what you are actually buying.",
    url: hiroshimaMiyajimaMultiCityDayTour.url,
    cta: "Check the Miyajima day →",
  },
  {
    title: "Nikko cultural day tour from Tokyo",
    covers:
      "Toshogu Shrine, Kegon Falls and Lake Chuzenji in a single day. Nikko has no row in the table above because its admissions sit in a different guide — Toshogu is ¥1,600 for an adult, read off toshogu.jp on 19 October 2026 — and the Irohazaka bus climb is the part a tour removes.",
    url: nikkoCulturalDayTourUrl,
    cta: "Check the Nikko day →",
  },
];

/**
 * The three things worth settling before a ticket, each with the guide on this
 * site that answers it. Added 28 Oct 2026: a reader on this page is pricing a
 * trip, not just a ticket, and timed entries are the one purchase where where you
 * sleep and whether your phone works decide whether the slot is usable.
 */
const BEFORE_BOOKING = [
  {
    title: "Pick the area before the slot",
    body:
      "A timed entry is only as good as the journey to it — the teamLab museums sell a 30-minute window and Shibuya Sky's sunset slots are the ones that sell out. Our area guides compare the bases by the lines that reach them:",
    links: [
      { href: "/guides/attractions/where-to-stay-in-tokyo", label: "Where to stay in Tokyo" },
      { href: "/guides/attractions/where-to-stay-in-osaka", label: "Osaka" },
      { href: "/guides/attractions/where-to-stay-in-kyoto", label: "Kyoto" },
    ],
    klook: [
      { label: "Shinjuku hotels", url: whereToStayTokyoAreas[0].url },
      { label: "Namba hotels", url: osakaStayAreas[1].url },
      { label: "Kyoto Station hotels", url: kyotoStayAreas[0].url },
    ],
  },
  {
    title: "Know how you get in from the airport",
    body:
      "Arrival day is the one most often wasted on a ticket bought for it. Which train or coach suits your landing time is the whole of our",
    links: [{ href: "/guides/transport/tokyo-airport-transfer", label: "Tokyo airport transfer guide" }],
    klook: [{ label: tokyoSharedAirportTransfer.title, url: tokyoSharedAirportTransfer.url }],
  },
  {
    title: "Have data before you need the QR code",
    body:
      "Almost every ticket on this page is now a QR code on a phone, and the two teamLab museums sell nothing at the door at all. That makes mobile data part of the ticket rather than a convenience.",
    links: [{ href: "/guides/esim/best-esim-japan", label: "Best eSIM for Japan" }],
    klook: [{ label: klookEsim.name, url: klookEsim.url }],
  },
];

const faqItems = [
  {
    q: "How much do attraction tickets cost in Japan?",
    a: `Across the ${ROW_COUNT} tickets in the table on this page, adult admission runs from free to about ¥7,900. Tokyo's observation decks are the cheapest paid tier — Tokyo Tower's Main Deck is ¥1,500 and Tokyo Skytree's Floor 350 starts at ¥1,800 — while the Tokyo Metropolitan Government Building deck in Shinjuku charges nothing at all. Timed-entry museums sit higher: teamLab Borderless starts at ¥3,400 and teamLab Planets at ¥3,800. Theme parks are the most expensive, from ¥3,900 for a Sanrio Puroland Day Passport to ¥7,900 for a Fuji-Q Highland 1-Day Pass on a peak date. Temple and shrine admissions on the day trips are in a different league entirely: ¥300 for Kotoku-in in Kamakura, ¥300 for Itsukushima Shrine, ¥800 for the Great Buddha Hall at Todai-ji.`,
  },
  {
    q: "Which Japanese attractions have to be booked in advance?",
    a: `${MUST_BOOK.length} of the ${ROW_COUNT} tickets here genuinely require a booking before you arrive: ${MUST_BOOK.map((p) => p.name).join(", ")}. All of them sell a specific date, and most sell a specific entry slot within that date. Tokyo Disney and Universal Studios Japan also require advance tickets, which is why they are discussed separately below rather than given a price here. Everything else in the table can be bought on the day, though two cases are worth booking anyway: Shibuya Sky is ¥500 cheaper online, and Tokyo Skytree's same-day counter adds a ¥500 service fee.`,
  },
  {
    q: "Are tickets cheaper online than at the gate in Japan?",
    a: "Sometimes, and the difference is smaller than people expect. Shibuya Sky is ¥2,700 online against ¥3,000 at the counter for an entry before 15:00, and ¥3,400 against ¥3,700 from 15:00 — ¥300 either way. Tokyo Skytree's same-day window adds a ¥500 service fee. teamLab Borderless costs ¥200 more per adult bought on site. But Tokyo Tower's Main Deck is ¥1,500 either way, and most temple and museum admissions have no online price at all. Online booking is usually about securing a slot and paying in your own currency, not about saving money.",
  },
  {
    q: "Is it cheaper to buy a pass or individual attraction tickets in Japan?",
    a: "It depends on the pass, and three of the four in the table above have a clear break-even. The Tokyo Subway Ticket is transport only — against Tokyo Metro fares of ¥178 to ¥324 a ride, the ¥1,000 24-hour tier needs five or six rides in one window, while the ¥2,000 72-hour tier at about ¥667 a day needs roughly four a day. The ¥2,500 Osaka Amazing Pass is the one that competes with admissions directly: the Osaka Castle keep (¥1,200) plus the Gozabune boat (¥1,800) is ¥3,000 at the gate, so two facilities clear it, though Universal Studios Japan and the Kaiyukan are not included and the Umeda Sky Building is only free before 15:00. The ¥7,100 two-day Hakone Freepass pays for itself if you ride the whole loop, where the ropeway alone is ¥2,000 and the lake cruise ¥1,200, and Odakyu's own comparison puts the same route at ¥9,200 via JR. The WEST QR Kansai Area Pass is decided by the airport run: from 1 November 2026 the discounted HARUKA single to Kyoto is ¥2,700, identical to a 1-day pass. What makes a pass the wrong buy is a short day — one or two admissions and a couple of rides almost never adds up.",
  },
  {
    q: "Why does the same Japanese ticket show different prices?",
    a: `Because several operators now price by the date you visit rather than at a flat rate. ${DATE_PRICED.length} of the tickets in this table publish a range or a "from" price for exactly that reason: a Sanrio Puroland Day Passport is ¥3,900 on the quietest dates and ¥6,900 on the busiest, and a Fuji-Q Highland 1-Day Pass runs ¥6,000 to ¥7,900. On those tickets, moving your visit by a day saves far more than shopping around between sellers.`,
  },
  {
    q: "Do Japanese attractions charge a child price?",
    a: "Almost all of them, but the age bands differ by venue and are worth checking against your children's ages rather than assumed. The table's child column names the band for each one. Broadly: temples and museums use ages 6–12, observation decks start charging around age 4 to 6, and theme parks treat anyone up to 17 as a child. Under-3s and under-4s are usually free, and the Hiroshima Peace Memorial Museum is free for junior high school age and below. The Osaka Amazing Pass is the exception that publishes no child rate at all.",
  },
  {
    q: "Can I pay for Japanese attraction tickets with a foreign card?",
    a: "At the venue, yes — cards are widely accepted at ticket windows in Tokyo, Osaka and Kyoto. Online is where it breaks: the official Shibuya Sky site has rejected many foreign-issued cards since July 2024, and the Tokyo Disney site is known to block them too. That is the specific problem a reseller solves — an English checkout that takes a foreign card and issues an e-ticket. It is not about price.",
  },
  {
    q: "How current are the prices on this page?",
    a: `Every row carries the date its figures were read off the operator's own site, and the most recent check here was ${AS_OF}. Nothing on this page is an estimate: where an operator publishes no figure — a child rate, a standing adult price — the cell says so instead of filling the gap. Japanese ticket prices move, and several of these operators changed their pricing structure during 2026, so confirm the current figure at checkout before you travel.`,
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/japan-attraction-ticket-prices") },
});

/** One table row. `child` and `klook` are nullable by design — the cell says so. */
function PriceRow({ price }: { price: AttractionPrice }) {
  return (
    <tr>
      <td className={styles.tdProvider}>
        <Link href={price.href} style={{ color: "var(--text)", fontWeight: 600 }}>
          {price.name}
        </Link>
        <span style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 400 }}>
          {price.ticket}
        </span>
      </td>
      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>
        {price.adult}
        {price.atDoor && (
          <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>
            {price.atDoor} at the door
          </span>
        )}
      </td>
      <td className={styles.tdPrice} style={{ fontWeight: 500 }}>
        {price.child ?? <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>No child rate published</span>}
        {price.childAges && (
          <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>
            {price.childAges}
          </span>
        )}
      </td>
      <td style={{ fontSize: "0.88rem" }}>
        <strong>{price.booking}</strong>
        <span style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)" }}>{price.bookingNote}</span>
      </td>
      <td style={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}>
        {checkedLabel(price.checked)}
        <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>{price.source}</span>
      </td>
      <td style={{ fontSize: "0.8rem" }}>
        <Link href={price.href} style={{ color: "var(--text)", fontWeight: 600, display: "block" }}>
          Full guide →
        </Link>
        {price.klook ? (
          <KlookLink
            href={price.klook.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ color: "var(--accent)", fontWeight: 600, display: "block", marginTop: "0.3rem" }}
          >
            {price.klook.label} →
          </KlookLink>
        ) : (
          <span style={{ color: "var(--text-muted)", display: "block", marginTop: "0.3rem" }}>No ticket to buy</span>
        )}
      </td>
    </tr>
  );
}

/**
 * The pass-versus-single-tickets question, directly under the pass table whose
 * rows it is about. Prices are the operators' own and dated; the Klook CTA on each
 * row is the pass itself, not a reseller's price.
 */
function PassComparison() {
  return (
    <section className={styles.comparisonSection}>
      <span className={styles.sectionLabel}>Pass or single tickets</span>
      <h2 className={styles.sectionTitle}>Should I buy a city pass instead of single tickets?</h2>
      <p className={styles.bodyText}>
        Only when the pass replaces things you were going to pay for anyway — and for three of the four above, two
        admissions or five short subway rides in one day is the whole of the test. A pass bought for a light day, or
        for a day built around something it does not cover, costs more than the tickets it replaced.
      </p>
      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {["Pass", "What it covers", "Where it breaks even", "Official price", "Buy"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PASS_ROWS.map((row) => (
                <tr key={row.pass}>
                  <td className={styles.tdProvider}>
                    <Link href={row.href} style={{ color: "var(--text)", fontWeight: 600 }}>
                      {row.pass}
                    </Link>
                  </td>
                  <td style={{ fontSize: "0.86rem" }}>{row.covers}</td>
                  <td style={{ fontSize: "0.86rem" }}>{row.breakEven}</td>
                  <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>
                    {row.price}
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>
                      {row.source}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.82rem" }}>
                    <KlookLink
                      href={row.url}
                      target="_blank"
                      rel="sponsored noopener"
                      style={{ color: "var(--accent)", fontWeight: 600 }}
                    >
                      {row.cta}
                    </KlookLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        Pass prices and the fares they are measured against are the operators&apos; own, with the date each was read
        in the price column. The Buy column goes to Klook, which pays us a commission at no extra cost to you — we
        quote no Klook price, because its product pages block automated checks.
      </p>
    </section>
  );
}

/**
 * The day-tour question, under the day-trip admissions table. Deliberately not a
 * price comparison — see the TOUR_ROWS comment.
 */
function DayTours() {
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>Tour or tickets</span>
      <h2 className={styles.sectionTitle}>Is a day tour cheaper than buying tickets yourself?</h2>
      <p className={styles.bodyText}>
        On the admissions alone, no — and that is the wrong comparison. The fees in the table above run from ¥200 to
        ¥2,000, so no guided day undercuts them. What a day tour replaces is everything around them: the coach seat
        out of Tokyo, the ferry or the mountain bus, and the ordering of a day that otherwise needs four changes and
        a timetable.
      </p>
      <p className={styles.bodyText}>
        So the thing to read on a listing is its inclusions, not its price. Tours differ on whether a temple
        admission is inside the booking or collected on the day — the ¥800 Great Buddha Hall fee at Todai-ji is the
        clearest example in the table above — and on whether the paid legs of a route, like the ¥2,000 Hakone
        ropeway and the ¥1,200 Lake Ashi cruise, are covered. A tour that includes those is doing more than driving
        you there.
      </p>
      <ul className={styles.pickList}>
        {TOUR_ROWS.map((tour) => (
          <li key={tour.url}>
            <span className={styles.proIcon}>▸</span>
            <span>
              <strong>{tour.title}</strong> — {tour.covers}{" "}
              <KlookLink
                href={tour.url}
                target="_blank"
                rel="sponsored noopener"
                style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {tour.cta}
              </KlookLink>
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        These go to Klook, which pays us a commission at no extra cost to you. What each line states is what the
        listing itself covers; prices and availability are Klook&apos;s, and we do not quote them because its product
        pages block automated checks.
      </p>
    </section>
  );
}

export default function JapanAttractionTicketPricesPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link
          rel="canonical"
          href="https://www.japan-travel-kit.com/guides/attractions/japan-attraction-ticket-prices"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta
          property="og:url"
          content="https://www.japan-travel-kit.com/guides/attractions/japan-attraction-ticket-prices"
        />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/japan-attraction-ticket-prices",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Things to Do",
                  item: "https://www.japan-travel-kit.com/guides/attractions",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Attraction Ticket Prices",
                  item: "https://www.japan-travel-kit.com/guides/attractions/japan-attraction-ticket-prices",
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
          <span className={styles.breadCurrent}>Attraction Ticket Prices</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Attraction Ticket Prices 2026:<br />Official Prices and Booking Rules
          </h1>
          <p className={styles.heroSubtitle}>
            Every official adult and child admission price we have verified, in one table — with whether the ticket
            has to be booked before you arrive, and the date each figure was read off the operator&apos;s own site.
          </p>
          <div className={styles.heroBadges}>
            {[`${ROW_COUNT} tickets`, "Official prices only", `Checked to ${AS_OF}`].map((t) => (
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
            <strong>Affiliate disclosure:</strong> The Klook links on this page — the last column of the tables, and
            the passes, tours and hotels in the sections around them — are affiliate links. We may earn a small
            commission if you book through them, at no extra cost to you. Every price on this page is the
            operator&apos;s own, not a reseller&apos;s.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tickets in this table</p>
                <p className={styles.verdictStatValue}>{ROW_COUNT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must be booked ahead</p>
                <p className={styles.verdictStatValue}>{MUST_BOOK.length}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Walk up and pay</p>
                <p className={styles.verdictStatValue}>{NO_BOOKING.length}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free</p>
                <p className={styles.verdictStatValue}>{FREE_COUNT}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>The short version:</strong> most of Japan is walk-up. Only {MUST_BOOK.length} of the{" "}
              {ROW_COUNT} tickets below actually require a booking before you arrive — the two teamLab museums,
              Sanrio Puroland and the Warner Bros. studio tour — plus Tokyo Disney and Universal Studios Japan,
              which price by date and so have no figure here. Everything else you can buy on the day. Put your
              booking effort where the slot can run out, and spend the rest of your planning time elsewhere.
            </p>
          </div>
        </div>

        {/* Before you book — the trip decisions a ticket depends on */}
        <div className={styles.verdictBox} style={{ marginTop: "1.5rem" }}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Before you book tickets</span>
          </div>
          <div className={styles.verdictBody}>
            <ul className={styles.pickList}>
              {BEFORE_BOOKING.map((item) => (
                <li key={item.title}>
                  <span className={styles.proIcon}>▸</span>
                  <span>
                    <strong>{item.title}</strong> — {item.body}{" "}
                    {item.links.map((link, i) => (
                      <span key={link.href}>
                        {i > 0 && " · "}
                        <Link href={link.href} style={{ color: "var(--text)", fontWeight: 600 }}>
                          {link.label} →
                        </Link>
                      </span>
                    ))}
                    {". "}
                    {item.klook.map((product, i) => (
                      <span key={product.url}>
                        {i > 0 && " · "}
                        <KlookLink
                          href={product.url}
                          target="_blank"
                          rel="sponsored noopener"
                          style={{ color: "var(--accent)", fontWeight: 600 }}
                        >
                          {product.label} →
                        </KlookLink>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "0.75rem 0 0" }}>
              The Klook links here are affiliate links and pay us a commission at no extra cost to you. We quote no
              price for them: Klook&apos;s product pages block automated checks, so nothing on them could be verified.
            </p>
          </div>
        </div>

        {/* Why this page exists */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How to read this</span>
          <h2 className={styles.sectionTitle}>Official Prices, and the Date We Read Them</h2>
          <p className={styles.bodyText}>
            Japanese attraction prices are harder to pin down than they look. Several operators moved to date-based
            pricing during 2026, so there is no single adult figure to quote —{" "}
            {DATE_PRICED.length} of the {ROW_COUNT} tickets below publish a range or a &quot;from&quot; price for
            that reason. Resale listings rank well in search and are often invalid for entry. And a price copied
            from a blog post two years ago can be out by thousands of yen.
          </p>
          <p className={styles.bodyText}>
            So this table has three rules. Every figure is the operator&apos;s own, read off their site rather than
            a reseller&apos;s. Every row states the date it was read, because a Japanese ticket price without a date
            is not usable information. And where an operator publishes nothing — no child rate, no standing adult
            price — the cell says so instead of guessing.
          </p>
          <p className={styles.bodyText}>
            The prices come from the individual guides on this site, which is where the rest of the detail lives:
            the tiers not shown here, opening hours, how to reach each venue, and whether a foreign card works at
            checkout. Each row links to its guide.
          </p>
        </section>

        {/* The table, by group */}
        {GROUP_ORDER.map((group) => {
          const rows = pricesInGroup(group);
          if (!rows.length) return null;
          const meta = PRICE_GROUP_LABELS[group];
          return (
            <Fragment key={group}>
              <section className={styles.comparisonSection}>
                <span className={styles.sectionLabel}>{rows.length} tickets</span>
                <h2 className={styles.sectionTitle}>{meta.label}</h2>
                <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{meta.desc}</p>
                <div className={styles.tableWrap}>
                  <div className={styles.tableScroll}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          {["Attraction", "Adult", "Child", "Advance booking", "Checked", "Links"].map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((price) => (
                          <PriceRow key={`${price.href}-${price.name}`} price={price} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              {/* Each group's own follow-on question, directly under the rows it is about. */}
              {group === "passes" && <PassComparison />}
              {group === "daytrips" && <DayTours />}
            </Fragment>
          );
        })}

        {/* What is not here */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Not in the table</span>
          <h2 className={styles.sectionTitle}>Three Tickets With No Official Price to Quote</h2>
          <p className={styles.bodyText}>
            Japan&apos;s three biggest ticketed attractions are missing from the table above, and it is for the same
            reason in each case: they publish no standing adult price, only the figure shown for your date at
            checkout. Printing an average would be worse than printing nothing.
          </p>
          <div className={styles.stepsList}>
            {EXCLUDED.map((item, i) => (
              <div key={item.name} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>
                    <Link href={item.href} style={{ color: "var(--text)" }}>{item.name} →</Link>
                  </p>
                  <p className={styles.stepDesc}>{item.why}</p>
                </div>
              </div>
            ))}
          </div>
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions", title: "Things to Do in Japan: Tickets & Experiences (2026)" },
              {
                href: "/guides/attractions/things-to-do-tokyo",
                title: "Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into",
              },
              {
                href: "/guides/attractions/tokyo-observation-decks",
                title: "Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower",
              },
              {
                href: "/guides/attractions/shibuya-sky-tickets",
                title: "Shibuya Sky Tickets (2026): Price, Best Time & How to Book",
              },
              {
                href: "/guides/attractions/tokyo-subway-ticket",
                title: "Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?",
              },
              {
                href: "/guides/attractions/osaka-attractions-pass",
                title: "Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?",
              },
              { href: "/about", title: "How we check the prices on this site" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                    <path d="M13 6v2M13 11v2M13 16v2" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{link.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
