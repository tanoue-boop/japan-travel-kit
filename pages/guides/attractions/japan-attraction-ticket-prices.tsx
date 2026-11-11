import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import KlookLink from "../../../components/KlookLink";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL, articleJsonLd } from "../../../lib/structured-data";
import {
  attractionPrices,
  checkedLabel,
  pricesInGroup,
  priceRows,
  priceSummary,
  PRICE_CSV_PATH,
  PRICE_GROUP_LABELS,
  PRICE_TABLE_ROUTE,
  PRICE_UPDATE_POLICY,
  PRICES,
  unpricedAttractions,
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

/**
 * Japan attraction ticket prices — the site's official-price database, laid out to be
 * cited. Every number on this page is computed from data/attraction-prices.json through
 * lib/attraction-prices.ts and lib/attraction-prices-core.js; the same core writes
 * public/data/japan-attraction-prices.csv in prebuild, and the home page and the guides
 * read the same records. The monthly update edits the JSON only.
 */

const ROUTE = PRICE_TABLE_ROUTE;
const PAGE_URL = `${SITE_URL}${ROUTE}`;
const S = priceSummary;
const GROUP_ORDER: PriceGroup[] = ["views", "museums", "parks", "heritage", "passes"];

const yen = (n: number | null) => (n === null ? "—" : `¥${n.toLocaleString("en-US")}`);
const d = (iso: string | null) => (iso ? checkedLabel(iso) : "—");
const names = (list: { name: string }[]) => list.map((p) => p.name).join(", ");

const ROW_COUNT = S.count;
const FRESH = attractionPrices.filter((p) => p.checked === S.lastChecked).length;
const REVISED_2026 = S.revisedIn(2026).sort((a, b) => (a.revisedOn! < b.revisedOn! ? -1 : 1));
const WITH_HISTORY = priceRows.filter((r) => r.previousChecked);
const AS_OF = d(S.lastChecked);

const TITLE = `Japan Attraction Ticket Prices 2026: ${ROW_COUNT} Official Prices`;
const H1 = `Japan Attraction Ticket Prices 2026: ${ROW_COUNT} Official Prices, Updated Monthly`;
const DESC = `Official adult and child prices for ${ROW_COUNT} Japan attractions: median ${yen(S.medianAdultYen)}, ${S.mustBook.length} need booking, 2026 increases. Free CSV, checked monthly.`;

/** The answer-first sentence, also the short form under "Cite this data". */
const ANSWER = `We read the official admission prices of ${ROW_COUNT} Japanese attractions on each operator's own website (${FRESH} of them on ${AS_OF}). Across the ${S.paidCount} that charge, the median lowest adult ticket is ${yen(S.medianAdultYen)}; ${S.mustBook.length} must be booked before you arrive and ${S.freeCount} are free.`;
const CITE = `${SITE_NAME}, "Japan Attraction Ticket Prices 2026", ${PAGE_URL} (official prices checked ${d(S.firstChecked)}–${AS_OF}).`;

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
      "Unlimited Osaka Metro, city buses and the private railways within Osaka city, plus free admission to about 40 facilities — Osaka Castle, the Umeda Sky Building observatory, Tsutenkaku, the HEP FIVE wheel and the river cruises. Universal Studios Japan and the Kaiyukan are not on it.",
    breakEven:
      "Three paid facilities do it. Osaka Castle (¥1,200), the Umeda Sky Building before 15:00 (¥2,000) and the Tombori River Cruise (¥2,000) are ¥5,200 at the gate against a ¥3,500 pass. Two cheap ones, such as the castle keep and the Gozabune boat (¥3,000), fall just short until the subway rides are counted.",
    price: "¥3,500 (1 day) / ¥5,000 (2 day), one price for all ages",
    source: "osaka-amazing-pass.com/en, read 9 November 2026",
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
 * here are a few hundred yen to ¥2,500 and a guided day never undercuts them, so what each
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
      "Toshogu Shrine, Kegon Falls and Lake Chuzenji in a single day. Toshogu's own ¥1,600 adult admission is in the temple and shrine table above; the Irohazaka bus climb is the part a tour removes.",
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

/** "¥300–¥1,000 (median ¥500)" for one table group, from the lowest adult price of each paid row. */
function groupRange(group: PriceGroup): string {
  const mins = priceRows.filter((r) => r.group === group && r.adultMinYen).map((r) => r.adultMinYen as number);
  if (!mins.length) return "free";
  const sorted = [...mins].sort((a, b) => a - b);
  const mid = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : Math.round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2);
  return `${yen(sorted[0])}–${yen(sorted[sorted.length - 1])} (median ${yen(mid)})`;
}

const faqItems = [
  {
    q: "How much do attraction tickets cost in Japan?",
    a: `Across the ${S.paidCount} paid attractions in the table on this page, the median lowest adult ticket is ${yen(S.medianAdultYen)}, read off each operator's own site (most recently on ${AS_OF}). The cheapest is ${names(S.cheapestPaid)} at ${yen(S.minPaidYen)}; the highest starting price is ${names(S.dearest)} at ${yen(S.maxPaidYen)}${S.dearest[0]?.pricing === "variable" ? " and up, priced by date" : ""}. By type: ${GROUP_ORDER.map((g) => `${PRICE_GROUP_LABELS[g].label.toLowerCase()} ${groupRange(g)}`).join("; ")}. ${S.freeCount} attractions here charge nothing at all, and many public museums, zoos, gardens and castles let children in free.`,
  },
  {
    q: "Which Japanese attractions have to be booked in advance?",
    a: `${S.mustBook.length} of the ${ROW_COUNT} here sell only a date- or time-specified ticket that has to be bought before you arrive: ${names(S.mustBook)}. ${S.noSameDay.length ? `${names(S.noSameDay)} sell no same-day tickets at the gate at all. ` : ""}Another ${attractionPrices.filter((p) => p.booking === "Advised").length} are worth booking — slots sell out or online is cheaper — and the other ${S.noBooking.length} are walk-up. Universal Studios Japan also sells date-specified Studio Passes only; it is listed below the table because its official price calendar could not be read.`,
  },
  {
    q: "Which Japanese attractions raised prices in 2026?",
    a: `${REVISED_2026.length} in this table have a 2026 fee revision announced on their own official site: ${REVISED_2026.map((r) => `${r.name} (${r.revisionNote}, from ${d(r.revisedOn)})`).join("; ")}. The table lists only revisions the operator itself publishes.`,
  },
  {
    q: "Are tickets cheaper online than at the gate in Japan?",
    a: `Sometimes, and the difference is smaller than people expect. Shibuya Sky is ${PRICES.shibuyaSky.adult} online against ${PRICES.shibuyaSky.atDoor} at the counter (before / from 15:00). Tokyo Skytree's same-day counter adds a ¥500 fee, the Hakone Open-Air Museum is ¥200 cheaper online, and Matsumoto Castle's e-ticket is ¥100 below paper. But Tokyo Tower's Main Deck is ${PRICES.tokyoTower.adult} either way, and most temple and museum admissions have no online price at all. Online booking is usually about securing a slot, not saving money.`,
  },
  {
    q: "Is it cheaper to buy a pass or individual attraction tickets in Japan?",
    a: "It depends on the pass, and the four in the pass comparison have a clear break-even. The Tokyo Subway Ticket is transport only — against Tokyo Metro fares of ¥178 to ¥324 a ride, the ¥1,000 24-hour tier needs five or six rides in one window. The ¥3,500 Osaka Amazing Pass competes with admissions directly: Osaka Castle (¥1,200), the Umeda Sky Building (¥2,000) and the Tombori River Cruise (¥2,000) are ¥5,200 at the gate, though Universal Studios Japan and the Kaiyukan are not included. The ¥7,100 two-day Hakone Freepass pays for itself if you ride the whole loop, where the ropeway alone is ¥2,000 one way. The WEST QR Kansai Area Pass is decided by the airport run. A pass bought for a light day almost never adds up.",
  },
  {
    q: "Why does the same Japanese ticket show different prices?",
    a: `Because ${S.variable.length} of the ${ROW_COUNT} attractions here price by date or time of day rather than at a flat rate — the table publishes a range or a "from" price for those. A Sanrio Puroland Day Passport is ${PRICES.sanrioPuroland.adult}, LEGOLAND Japan and Fuji-Q Highland move by thousands of yen across their calendars, and Shibuya Sky costs more from 15:00. On those tickets, moving your visit by a day saves more than shopping around between sellers.`,
  },
  {
    q: "Do Japanese attractions charge a child price?",
    a: "Almost all of them, but the age bands differ by venue — the table's child column names the band for each one. Temples and museums typically use elementary and junior high school age, observation decks start charging around age 4 to 6, and theme parks treat teenagers as juniors. Many public sites are free for children of junior high age and younger — Shinjuku Gyoen, the Edo-Tokyo Museum, the Peace Memorial Museum, Nagoya Castle and Asahiyama Zoo among them — and the Tokyo National Museum and, since March 2026, Himeji Castle are free for everyone under 18. The Osaka Amazing Pass sells no child pass at all.",
  },
  {
    q: "How current are the prices on this page, and can I reuse them?",
    a: `Every row carries the date its figures were read and a link to the official page. ${FRESH} of ${ROW_COUNT} were read on ${AS_OF}; the rest keep their last official reading because the operator's page could not be read that day, and say so. ${PRICE_UPDATE_POLICY} The full table is a free CSV under CC BY 4.0 — cite the page URL and check date.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const muted = { display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 } as const;

/** One table row. Null fields print as a blank cell — never a guess. */
function PriceRow({ price }: { price: AttractionPrice }) {
  const row = priceRows.find((r) => r.id === price.id)!;
  return (
    <tr>
      <td className={styles.tdProvider}>
        {price.href ? (
          <Link href={price.href} style={{ color: "var(--text)", fontWeight: 600 }}>
            {price.name}
          </Link>
        ) : (
          <strong>{price.name}</strong>
        )}
        <span style={{ ...muted, fontSize: "0.78rem" }}>
          {price.ticket} · {price.area}
        </span>
      </td>
      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>
        {price.adult}
        {price.atDoor && <span style={muted}>{price.atDoor} at the door</span>}
        {price.pricing === "variable" && <span style={muted}>priced by date/time</span>}
      </td>
      <td className={styles.tdPrice} style={{ fontWeight: 500 }}>
        {price.child ?? ""}
        {price.childAges && <span style={muted}>{price.childAges}</span>}
      </td>
      <td style={{ fontSize: "0.86rem" }}>
        <strong>{price.booking}</strong>
        {price.sameDay && <span style={muted}>Same-day tickets: {price.sameDay}</span>}
        {price.bookingNote && <span style={{ ...muted, fontSize: "0.78rem" }}>{price.bookingNote}</span>}
      </td>
      <td style={{ fontSize: "0.8rem" }}>{price.hours ?? ""}</td>
      <td style={{ fontSize: "0.8rem" }}>
        <span style={{ whiteSpace: "nowrap" }}>{d(price.checked)}</span>
        <a href={price.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" style={{ ...muted, textDecoration: "underline" }}>
          {price.source}
        </a>
        {price.revised && (
          <span style={{ ...muted, color: "var(--accent)" }}>
            Fee revised {d(price.revised.date)}: {price.revised.note}
          </span>
        )}
        {row.changedOn && (
          <span style={{ ...muted, color: "var(--accent)" }}>
            Changed since {d(row.previousChecked)} ({row.previousAdult})
          </span>
        )}
        {price.note && <span style={muted}>{price.note}</span>}
      </td>
      <td style={{ fontSize: "0.8rem" }}>
        {price.href && (
          <Link href={price.href} style={{ color: "var(--text)", fontWeight: 600, display: "block" }}>
            Our guide →
          </Link>
        )}
        {price.klook && (
          <KlookLink
            href={price.klook.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ color: "var(--accent)", fontWeight: 600, display: "block", marginTop: "0.3rem" }}
          >
            {price.klook.label} →
          </KlookLink>
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
        in the price column. The Buy column goes to Klook, which pays us a commission at no extra cost to you — no
        Klook price is quoted, because Klook prices change by date.
      </p>
    </section>
  );
}

/**
 * The day-tour question, under the temple, shrine and castle table. Deliberately not a
 * price comparison — see the TOUR_ROWS comment.
 */
function DayTours() {
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>Tour or tickets</span>
      <h2 className={styles.sectionTitle}>Is a day tour cheaper than buying tickets yourself?</h2>
      <p className={styles.bodyText}>
        On the admissions alone, no — and that is the wrong comparison. The gate fees in the table above run from ¥300 to
        ¥2,500, so no guided day undercuts them. What a day tour replaces is everything around them: the coach seat
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
        listing itself covers; prices and availability are Klook&apos;s, so check the listing for your
        date.
      </p>
    </section>
  );
}

const MUST_BOOK_NAMES = names(S.mustBook);

export default function JapanAttractionTicketPricesPage({ updated }: { updated: PageUpdated }) {
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Japan Attraction Ticket Prices 2026",
    description: `Official admission prices of ${ROW_COUNT} Japanese attractions — observation decks, museums, aquariums, theme parks, temples, shrines, castles, gardens, passes and ropeways — read from each operator's own website, with adult and child price, child age band, price at the door, fixed or date-based pricing, advance-booking rule, same-day ticket sales, opening hours, announced fee revisions, the previous reading, check date and source URL for every row.`,
    url: PAGE_URL,
    keywords: ["Japan attraction prices", "admission fees", "ticket prices", "Japan travel", "official prices", "price increases 2026"],
    dateModified: S.lastChecked,
    temporalCoverage: `${S.firstChecked}/${S.lastChecked}`,
    spatialCoverage: { "@type": "Place", name: "Japan" },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": ORGANIZATION_ID },
    variableMeasured: [
      "adult_price", "adult_min_jpy", "adult_max_jpy", "child_price", "child_ages", "price_at_door", "pricing",
      "advance_booking", "same_day_tickets", "hours", "price_revised_on", "price_revision", "previous_adult_price",
      "checked_on", "source_url",
    ],
    distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE_URL}${PRICE_CSV_PATH}` }],
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: H1, description: DESC, updated }),
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
                { "@type": "ListItem", position: 4, name: "Attraction Ticket Prices", item: PAGE_URL },
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
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>{ANSWER}</p>
          <div className={styles.heroBadges}>
            {[`${ROW_COUNT} attractions`, "Official prices only", `Checked to ${AS_OF}`, "Free CSV"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Official prices checked</p>
                <p className={styles.verdictStatValue}>{ROW_COUNT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Median adult ticket ({S.paidCount} paid)</p>
                <p className={styles.verdictStatValue}>{yen(S.medianAdultYen)}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must be booked ahead</p>
                <p className={styles.verdictStatValue}>{S.mustBook.length}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Official fee rises in 2026</p>
                <p className={styles.verdictStatValue}>{REVISED_2026.length}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>The short version:</strong> most of Japan is walk-up. Only {S.mustBook.length} of the {ROW_COUNT}{" "}
              attractions below sell nothing but a date- or time-specified ticket bought in advance — {MUST_BOOK_NAMES}.{" "}
              {S.variable.length} price by date or time of day, so the figure here is a floor or a range. The cheapest
              paid ticket is {names(S.cheapestPaid)} at {yen(S.minPaidYen)}; the highest starting price is{" "}
              {names(S.dearest)} at {yen(S.maxPaidYen)}.
            </p>
          </div>
        </div>

        {/* 2026 increases */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price changes</span>
          <h2 className={styles.sectionTitle}>Japan Attraction Price Increases in 2026</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {REVISED_2026.length} attractions in this table have a 2026 fee revision announced on their own official
            site. Only revisions the operator publishes are listed — where the notice gives no old figure, the row says
            so rather than reconstructing it. Dates after {AS_OF} are announced but not yet in force.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Attraction", "From", "What changed", "Adult now", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REVISED_2026.map((r) => (
                    <tr key={r.id}>
                      <td className={styles.tdProvider}>
                        {r.href ? (
                          <Link href={r.href} style={{ color: "var(--text)", fontWeight: 600 }}>{r.name}</Link>
                        ) : (
                          <strong>{r.name}</strong>
                        )}
                        <span style={muted}>{r.area}</span>
                      </td>
                      <td style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                        {d(r.revisedOn)}
                        {r.revisedOn! > S.lastChecked! && <span style={muted}>announced, not yet in force</span>}
                      </td>
                      <td style={{ fontSize: "0.85rem" }}>{r.revisionNote}</td>
                      <td className={styles.tdPrice}>{r.adult}</td>
                      <td style={{ fontSize: "0.8rem" }}>
                        <a href={r.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>
                          {r.source}
                        </a>
                        <span style={muted}>checked {d(r.checked)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
            Against our previous readings: {WITH_HISTORY.length} rows have an earlier check on this site, and{" "}
            {S.changed.length === 0
              ? `none of them changed by the ${AS_OF} check — the increases above were already in our guides or take effect later.`
              : `${S.changed.length} changed (${names(S.changed)}) — marked "Changed since" in the tables.`}{" "}
            Revisions from earlier years that the operators still publish (Hakone Ropeway October 2025, Osaka Castle and
            Matsumoto Castle April 2025, Kasuga Taisha October 2024) are shown on their rows below.
          </p>
        </section>

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
              The Klook links here are affiliate links and pay us a commission at no extra cost to you. No price is
              quoted for them: Klook prices change by date, so check the listing for yours.
            </p>
          </div>
        </div>

        {/* How to read */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How to read this</span>
          <h2 className={styles.sectionTitle}>Official Prices, and the Date Each Was Read</h2>
          <p className={styles.bodyText}>
            Every figure is the operator&apos;s own, read off its official website — the venue, the temple or shrine,
            the city or prefecture that runs a public site — never a reseller&apos;s. Every row states the date it was
            read and links the exact page. Where an operator publishes nothing, or its page could not be read, the cell
            is left blank instead of guessed; {ROW_COUNT - FRESH} rows whose page could not be re-read on {AS_OF} keep
            their last official reading and say so.
          </p>
          <p className={styles.bodyText}>
            &quot;Adult&quot; is the standard adult admission. For the {S.variable.length} date-priced attractions it is
            the range or the &quot;from&quot; figure the operator publishes; the median above uses the lowest adult price
            of each paid row. &quot;Must be booked&quot; means the operator sells only date- or time-specified tickets in
            advance; &quot;Advised&quot; means slots can sell out or the online price is lower.
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
                <span className={styles.sectionLabel}>{rows.length} attractions</span>
                <h2 className={styles.sectionTitle}>{meta.label}</h2>
                <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
                  {meta.desc} Lowest adult price {groupRange(group)}.
                </p>
                <div className={styles.tableWrap}>
                  <div className={styles.tableScroll}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          {["Attraction", "Adult", "Child", "Advance booking", "Hours", "Checked / source", "Links"].map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((price) => (
                          <PriceRow key={price.id} price={price} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              {group === "passes" && <PassComparison />}
              {group === "heritage" && <DayTours />}
            </Fragment>
          );
        })}

        <p className={styles.bodyText} style={{ fontSize: "0.85rem" }}>
          <strong>Last checked: {AS_OF}.</strong> {PRICE_UPDATE_POLICY} When an operator changes a price between checks,
          its site is right and this table is out of date — the date and link on every row are there so you can tell.
        </p>

        <BookingEsimCard lead="Tickets booked? Get mobile data before you land." />

        {/* What is not here */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Not in the table</span>
          <h2 className={styles.sectionTitle}>Checked, but No Official Price to Record</h2>
          <p className={styles.bodyText}>
            These were checked on their official sites on {AS_OF} and left out of the table rather than filled with a
            figure from somewhere else.
          </p>
          <div className={styles.stepsList}>
            {unpricedAttractions.map((item, i) => (
              <div key={item.id} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>
                    {item.href ? (
                      <Link href={item.href} style={{ color: "var(--text)" }}>{item.name} →</Link>
                    ) : (
                      item.name
                    )}{" "}
                    <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      ({item.area}, {item.status === "closed" ? "closed" : "page unreadable"})
                    </span>
                  </p>
                  <p className={styles.stepDesc}>
                    {item.reason}{" "}
                    <a href={item.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>
                      Official page
                    </a>
                  </p>
                </div>
              </div>
            ))}
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>{unpricedAttractions.length + 1}</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>
                  <Link href="/guides/attractions/sumo-tokyo-tickets" style={{ color: "var(--text)" }}>
                    Grand Sumo tournament tickets →
                  </Link>
                </p>
                <p className={styles.stepDesc}>
                  Seat prices vary by tier and by tournament day, and the official sale opens on a schedule rather than
                  at a fixed price, so there is no single admission to list. The guide covers the tiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Data</span>
          <h2 className={styles.sectionTitle}>Download and Cite This Data</h2>
          <p className={styles.bodyText}>
            The full table — every attraction, adult and child price, age band, door price, pricing type, booking
            rule, same-day sales, hours, announced revisions, previous reading, check date and source URL — is a free
            CSV:{" "}
            <a href={PRICE_CSV_PATH} className={tools.inlineLink} download>
              japan-attraction-prices.csv
            </a>{" "}
            ({ROW_COUNT} rows). You may reuse it under{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer license" className={tools.inlineLink}>
              CC BY 4.0
            </a>{" "}
            with a link back to this page.
          </p>
          <p className={styles.bodyText} style={{ marginBottom: "0.4rem" }}>
            <strong>Cite this data</strong>
          </p>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "var(--paper-alt, #f6f5f2)",
              border: "1px solid var(--rule)",
              borderRadius: "var(--radius-sm)",
              padding: "0.8rem 1rem",
              fontSize: "0.85rem",
              userSelect: "all",
            }}
          >
            {CITE}
          </pre>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Short form: {ANSWER}
          </p>
          <p className={styles.bodyText}>
            <strong>Last checked: {AS_OF}.</strong> {PRICE_UPDATE_POLICY} Rows whose figures move get the old reading
            kept as history, so the CSV&apos;s previous_adult_price and changed_since_previous_check columns show what
            changed and when. For mobile data prices on the same terms, see our{" "}
            <Link href="/guides/esim/japan-esim-price-tracker" className={tools.inlineLink}>Japan eSIM price tracker</Link>.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions", title: "Things to Do in Japan: Tickets & Experiences (2026)" },
              {
                href: "/guides/attractions/himeji-castle-day-trip",
                title: "Himeji Castle Day Trip (2026): ¥2,500 Admission, and Times From Osaka & Kyoto",
              },
              {
                href: "/guides/attractions/okinawa-churaumi-aquarium-tickets",
                title: "Okinawa Churaumi Aquarium Tickets 2026: Price, Hours, Access",
              },
              {
                href: "/guides/attractions/things-to-do-tokyo",
                title: "Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into",
              },
              {
                href: "/guides/attractions/tokyo-observation-decks",
                title: "Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower",
              },
              {
                href: "/guides/attractions/tokyo-disney-tickets",
                title: "Tokyo Disneyland Tickets 2026: Prices, Rules & DisneySea",
              },
              {
                href: "/guides/attractions/osaka-attractions-pass",
                title: "Osaka Amazing Pass 2026: ¥3,500 Price, Is It Worth It?",
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
