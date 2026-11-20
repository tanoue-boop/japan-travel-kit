import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import GuideHub from "../../../components/GuideHub";
import KlookTripPrep from "../../../components/KlookTripPrep";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import { attractionArticles, attractionsCategory } from "../../../lib/guides-attractions";
import { attractionPrices } from "../../../lib/attraction-prices";
import {
  attractionsHubSameTripPrep,
  fujiDayTour,
  jrHokkaidoRailPass,
  tokyoSightseeingBusTour,
} from "../../../lib/klook-links";
import { articleDates, pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, hubItemListJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import styles from "../../../styles/BestEsimJapan.module.css";

const ROUTE = "/guides/attractions";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE), dates: articleDates(attractionArticles.map((a) => a.href)) },
});

const L = { color: "var(--text)", fontWeight: 600 } as const;
const muted = { marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" } as const;

// task-jtk-20261116-R02: the hub answers "which Japan attraction tickets to book in advance,
// and when". Prices stay on /guides/attractions/japan-attraction-ticket-prices so the two
// pages do not compete; this one links there with a "Japan attraction ticket prices" anchor.
// Title ≤ 60 characters without the site-name suffix.
const TITLE = "Japan Attraction Tickets 2026: What to Book in Advance, When";
const H1 = "Japan Attraction Tickets: What to Book in Advance and When (2026)";
const DESC =
  "Japan attraction tickets to book in advance: Ghibli Museum on the 10th, Tokyo Disney and USJ 2 months out, SHIBUYA SKY 2 weeks. Table by city, then book.";

/**
 * Booking windows read on the official sites on this date (16 Nov 2026):
 *   - Ghibli Museum: ghibli-museum.jp/en/tickets/ — advance reservation only, nothing sold at
 *     the museum; on sale 10:00 JST on the 10th of each month for the following month.
 *   - Ghibli Park: ghibli-park.jp/en/ticket/ — day passes on sale two months in advance, on the
 *     10th at 14:00 JST; advance reservation required with no exceptions.
 *   - Tokyo Disney Resort: tokyodisneyresort.jp/en/ticket/index.html — sold daily from 14:00 for
 *     the same date two months later; faq-en.tokyodisneyresort.jp — not sold at the resort
 *     (Disney Hotel guests excepted), same-day purchase online while tickets remain.
 *   - USJ: usj.co.jp/company/company_e/news/2025/0421/ — sales approximately two months before
 *     the visit; .../2025/0425/ — booth sales ended 6 May 2025, same-day tickets on the WEB
 *     Ticket Store may be sold out.
 *   - teamLab Borderless: teamlab.art/faq/tokyo/ — on sale around the 1st of the month, two
 *     months before the admission date; tickets may be sold out.
 *   - SHIBUYA SKY: shibuya-scramble-square.com (2025-02-27 ticket notice and the ticket page) —
 *     on sale at 00:00 JST two weeks before the admission date; counter tickets also sold.
 *   - Warner Bros. Studio Tour Tokyo: wbstudiotour.jp/en/tickets/ — sold in advance online and
 *     at the ticket office on site; pre-booking recommended as dates and times may sell out.
 */
const CHECKED = "2026-11-16";

type Row = {
  name: string;
  city: string;
  opens: string;
  onTheDay: string;
  guide: ReactNode;
  source: { href: string; label: string };
};

const rows: Row[] = [
  {
    name: "Ghibli Museum",
    city: "Tokyo (Mitaka)",
    opens: "10:00 JST on the 10th of each month, for the whole of the following month",
    onTheDay: "No — advance reservation only; nothing is sold at the museum",
    guide: <Link href="/guides/attractions/things-to-do-tokyo" style={L}>Things to do in Tokyo</Link>,
    source: { href: "https://www.ghibli-museum.jp/en/tickets/", label: "ghibli-museum.jp" },
  },
  {
    name: "Ghibli Park",
    city: "Nagoya",
    opens: "14:00 JST on the 10th, two months ahead",
    onTheDay: "No — advance reservation required with no exceptions",
    guide: <Link href="/guides/attractions/ghibli-park-tickets" style={L}>Ghibli Park tickets</Link>,
    source: { href: "https://ghibli-park.jp/en/ticket/", label: "ghibli-park.jp" },
  },
  {
    name: "Tokyo Disneyland & DisneySea",
    city: "Tokyo (Maihama)",
    opens: "Daily from 14:00 JST, for the same date two months later",
    onTheDay: "Online only (official site or app) if tickets remain; not sold at the resort except to Disney Hotel guests",
    guide: <Link href="/guides/attractions/tokyo-disney-tickets" style={L}>Tokyo Disneyland tickets</Link>,
    source: { href: "https://www.tokyodisneyresort.jp/en/ticket/index.html", label: "tokyodisneyresort.jp" },
  },
  {
    name: "Universal Studios Japan (Studio Pass, Express Pass)",
    city: "Osaka",
    opens: "About two months before the visit date",
    onTheDay: "Online only and may be sold out — the gate booths stopped selling on 6 May 2025",
    guide: <Link href="/guides/attractions/usj-tickets-express-pass" style={L}>USJ Express Pass</Link>,
    source: { href: "https://www.usj.co.jp/company/company_e/news/2025/0425/", label: "usj.co.jp" },
  },
  {
    name: "teamLab Borderless",
    city: "Tokyo (Azabudai Hills)",
    opens: "Around the 1st of the month, two months before your date",
    onTheDay: "Not to count on — the official FAQ warns that tickets may sell out",
    guide: <Link href="/guides/attractions/teamlab-borderless-tickets" style={L}>teamLab Borderless tickets</Link>,
    source: { href: "https://www.teamlab.art/faq/tokyo/", label: "teamlab.art" },
  },
  {
    name: "SHIBUYA SKY",
    city: "Tokyo (Shibuya)",
    opens: "00:00 JST, two weeks before the admission date",
    onTheDay: "Yes — at the ticket counter, as well as online",
    guide: <Link href="/guides/attractions/shibuya-sky-tickets" style={L}>Shibuya Sky tickets</Link>,
    source: { href: "https://www.shibuya-scramble-square.com/sky/ticket/", label: "shibuya-scramble-square.com" },
  },
  {
    name: "Warner Bros. Studio Tour Tokyo",
    city: "Tokyo (Nerima)",
    opens: "Online in advance; the operator recommends pre-booking because dates and times sell out",
    onTheDay: "Yes — at the on-site ticket office, if your date and time are not sold out",
    guide: <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" style={L}>Harry Potter Studio Tour Tokyo</Link>,
    source: { href: "https://www.wbstudiotour.jp/en/tickets/", label: "wbstudiotour.jp" },
  },
];

const faqItems = [
  {
    q: "Which Japan attractions need tickets in advance?",
    a: "Four sell nothing at the gate: the Ghibli Museum (advance reservation only, on sale at 10:00 JST on the 10th for the following month), Ghibli Park (on sale at 14:00 JST on the 10th, two months ahead), Tokyo Disneyland and DisneySea (on sale daily from 14:00 JST for the same date two months later) and Universal Studios Japan (on sale about two months ahead; the gate booths closed on 6 May 2025). teamLab Borderless and SHIBUYA SKY sell timed slots that can sell out, so book those ahead too. Checked on the official sites on 2026-11-16.",
  },
  {
    q: "How far ahead should I book teamLab or SHIBUYA SKY?",
    a: "As soon as your date opens if you need a particular time. teamLab Borderless goes on sale around the 1st of the month, two months before the admission date, and its FAQ warns that tickets may sell out. SHIBUYA SKY goes on sale at 00:00 Japan time exactly two weeks before the admission date. Checked on teamlab.art and shibuya-scramble-square.com on 2026-11-16.",
  },
  {
    q: "Can I buy Japan attraction tickets on the day?",
    a: "At some. SHIBUYA SKY sells at its ticket counter, and the Warner Bros. Studio Tour Tokyo sells at its on-site ticket office if the date and time are not sold out. Tokyo Disney and Universal Studios Japan sell same-day tickets online only, while they last. The Ghibli Museum and Ghibli Park sell nothing on the day. Checked 2026-11-16.",
  },
  {
    q: "Are combo tickets for Tokyo attractions worth it?",
    a: "Only when you would pay for every venue in the combo anyway. Add up the official single admissions in the Japan attraction ticket prices table first, and for timed venues such as SHIBUYA SKY and teamLab check which entry times the combo allows before you buy — the time slot, not the ticket, is what sells out.",
  },
  {
    q: "When do Tokyo Disney tickets go on sale?",
    a: "Every day from 14:00 Japan time, for the same date two months later; where that date does not exist in the purchase month, sales open at 14:00 on the 1st of the next month. Sold-out tickets may come back on sale without notice. Checked on tokyodisneyresort.jp on 2026-11-16.",
  },
];

export default function GuidesAttractionsPage({ updated, dates }: { updated: PageUpdated; dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions" />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: hubItemListJsonLd(attractionsCategory, DESC) }}
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: H1, description: DESC, updated }) }}
        />
      </Head>

      <GuideHub
        category={attractionsCategory}
        heading={H1}
        heroDesc="Things to do in Japan, sorted by how far ahead each ticket has to be bought — teamLab, Universal Studios Japan, Tokyo Disney, SHIBUYA SKY and more, with the guide for each."
        dates={dates}
        lead={
          <>
            <section className={styles.bodySection} style={{ marginBottom: "2rem" }}>
              <p className={styles.bodyText}>
                Four of Japan&apos;s best-known attractions sell <strong>no tickets at the gate</strong>, so book them
                before you fly: the <strong>Ghibli Museum</strong> goes on sale at 10:00 JST on the 10th for the following
                month,{" "}
                <Link href="/guides/attractions/ghibli-park-tickets">
                  <strong>Ghibli Park tickets</strong>
                </Link>{" "}
                at 14:00 JST on the 10th two months ahead, and{" "}
                <strong>Tokyo Disney</strong> daily from 14:00 JST for the same date two months later.{" "}
                <strong>Universal Studios Japan</strong> sells about two months ahead and has had no gate sales since 6 May
                2025. <strong>teamLab Borderless</strong> opens around the 1st of the month two months ahead and{" "}
                <strong>SHIBUYA SKY</strong> at 00:00 JST two weeks ahead — book either as soon as your date opens if you
                need a particular time slot.
              </p>
              <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
                Booking windows read on each official site on {CHECKED}. What each ticket costs is in the{" "}
                <Link href="/guides/attractions/japan-attraction-ticket-prices" style={L}>Japan attraction ticket prices</Link>{" "}
                table ({attractionPrices.length} sights, official admissions, dated). eSIM, money and transport sit
                alongside these in the full index of{" "}
                <Link href="/guides" style={L}>Japan travel guides</Link>.
              </p>
            </section>
            <KlookTripPrep
              label="Same trip"
              heading="What to book for the same trip"
              intro="While the timed tickets are open, these are the bookings that go with them in Tokyo, Kyoto and Osaka."
              items={attractionsHubSameTripPrep}
            />
          </>
        }
        groupLeads={{
          tickets: (
            <>
              Start with{" "}
              <Link href="/guides/attractions/shibuya-sky-tickets" style={L}>Shibuya Sky tickets</Link>: the clearest
              example of a timed slot that opens two weeks ahead and also sells at the counter. In Osaka,{" "}
              <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" style={L}>Kaiyukan tickets</Link> work
              the same way from about 30 days out, with the price set by date.
            </>
          ),
          parks: (
            <>
              Both big parks open about two months ahead with no gate sales — see{" "}
              <Link href="/guides/attractions/tokyo-disney-tickets" style={L}>Tokyo Disneyland tickets</Link> and the{" "}
              <Link href="/guides/attractions/usj-tickets-express-pass" style={L}>Universal Studios Japan Express Pass</Link>.
            </>
          ),
          daytrips: (
            <>
              Here you book the tour, not an entry slot; the{" "}
              <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={L}>Mt. Fuji day tour from Tokyo</Link>{" "}
              guide shows how to pick between the coach itineraries, and the{" "}
              <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={L}>Tokyo to Kawaguchiko</Link>{" "}
              guide sets that tour against the ¥2,200 highway bus and the Fuji Excursion train.
            </>
          ),
          experiences: (
            <>
              Most of these are bookable the week before; the{" "}
              <Link href="/guides/attractions/sumo-tokyo-tickets" style={L}>sumo tickets in Tokyo</Link> guide explains
              how tournament seats are sold.
            </>
          ),
          cities: (
            <>
              What to book ahead city by city:{" "}
              <Link href="/guides/attractions/things-to-do-tokyo" style={L}>things to do in Tokyo</Link>,{" "}
              <Link href="/guides/attractions/things-to-do-osaka" style={L}>Osaka</Link> and{" "}
              <Link href="/guides/attractions/things-to-do-kyoto" style={L}>Kyoto</Link>.
            </>
          ),
          passes: (
            <>
              Weigh a pass against single tickets in the{" "}
              <Link href="/guides/attractions/japan-attraction-ticket-prices" style={L}>Japan attraction ticket prices</Link>{" "}
              table; in Tokyo, start with the{" "}
              <Link href="/guides/attractions/tokyo-subway-ticket" style={L}>Tokyo Subway Ticket</Link>.
            </>
          ),
        }}
        picks={
          <>
          {/* Booking-window table — first row is the conclusion. */}
          <section className={styles.comparisonSection} style={{ marginTop: "2.5rem" }}>
            <span className={styles.sectionLabel}>Book in advance</span>
            <h2 className={styles.sectionTitle}>Which Japan attractions need tickets in advance?</h2>
            <p className={styles.bodyText}>
              The Ghibli Museum, Ghibli Park, Tokyo Disney and Universal Studios Japan: none of them sells tickets at the
              gate. The table gives the moment each one goes on sale and whether anything is left for the day itself.
            </p>
            <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Attraction</th>
                      <th>City</th>
                      <th>When tickets go on sale</th>
                      <th>Tickets on the day?</th>
                      <th>Guide</th>
                      <th>Official source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.tdProvider} style={{ minWidth: "150px" }}>Must book in advance</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)" }}>Tokyo, Nagoya, Osaka</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>
                        Ghibli Museum, Ghibli Park, Tokyo Disney, Universal Studios Japan
                      </td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "180px" }}>
                        None at the gate — buy before you fly
                      </td>
                      <td style={{ fontSize: "0.82rem" }}>
                        <Link href="/guides/attractions/japan-attraction-ticket-prices" style={L}>Japan attraction ticket prices</Link>
                      </td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Rows below</td>
                    </tr>
                    {rows.map((row) => (
                      <tr key={row.name}>
                        <td className={styles.tdProvider} style={{ minWidth: "150px" }}>{row.name}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "110px" }}>{row.city}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.opens}</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.onTheDay}</td>
                        <td style={{ fontSize: "0.82rem", minWidth: "150px" }}>{row.guide}</td>
                        <td style={{ fontSize: "0.82rem", minWidth: "130px" }}>
                          <a href={row.source.href} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>
                            {row.source.label}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={muted}>
              Last checked: {CHECKED}. Official pages: ghibli-museum.jp/en/tickets/ · ghibli-park.jp/en/ticket/ ·
              tokyodisneyresort.jp/en/ticket/index.html and faq-en.tokyodisneyresort.jp · usj.co.jp/company/company_e/news/2025/0421/
              and /0425/ · teamlab.art/faq/tokyo/ · shibuya-scramble-square.com/sky/ticket/ · wbstudiotour.jp/en/tickets/.
              Special events can have their own sale dates. Prices are not in this table; see the{" "}
              <Link href="/guides/attractions/japan-attraction-ticket-prices" style={L}>Japan attraction ticket prices</Link> page.
            </p>
          </section>

          {/* Question sections, each answered in the first sentence */}
          <section className={styles.bodySection}>
            <h2 className={styles.sectionTitle}>How far ahead should I book teamLab or SHIBUYA SKY?</h2>
            <p className={styles.bodyText}>
              {faqItems[1].a} Planets or Borderless? The{" "}
              <Link href="/guides/attractions/teamlab-tokyo-tickets" style={L}>teamLab Planets vs Borderless</Link> comparison{" "}
              puts the two side by side; for Planets alone, see{" "}
              <Link href="/guides/attractions/teamlab-planets-tickets" style={L}>teamLab Planets tickets</Link>.
            </p>
          </section>
          <section className={styles.bodySection}>
            <h2 className={styles.sectionTitle}>Can I buy Japan attraction tickets on the day?</h2>
            <p className={styles.bodyText}>
              {faqItems[2].a} Still choosing a deck for a walk-up visit? See the{" "}
              <Link href="/guides/attractions/tokyo-observation-decks" style={L}>best observation deck in Tokyo</Link>.
            </p>
          </section>
          <section className={styles.bodySection}>
            <h2 className={styles.sectionTitle}>Are combo tickets for Tokyo attractions worth it?</h2>
            <p className={styles.bodyText}>{faqItems[3].a}</p>
          </section>

          <PartnerPick
            label="Two easy first bookings"
            heading="Guided days out from Tokyo"
            cta={{ href: fujiDayTour.url, label: "See the Mt. Fuji day tour on Klook →" }}
          >
            If you want one day out of the city without planning the transport, this{" "}
            <PartnerTextLink href={fujiDayTour.url}>Mt. Fuji day tour from Tokyo</PartnerTextLink> runs by coach to the
            Fuji Fifth Station, Lake Kawaguchi and Oshino Hakkai and returns the same evening. In the city itself, the{" "}
            <PartnerTextLink href={tokyoSightseeingBusTour.url}>Tokyo sightseeing bus day tour</PartnerTextLink> is a
            guided loop of the Imperial Palace gardens, Asakusa and Tokyo Skytree (compare it with Hato Bus and the Sky
            Hop Bus in our{" "}
            <Link href="/guides/attractions/tokyo-sightseeing-bus-tour" style={{ color: "var(--text)", fontWeight: 600 }}>Tokyo sightseeing bus tour guide</Link>
            ). The tickets that sell out by date are{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>teamLab Planets tickets</Link>{" "}
            (not sure which teamLab? see our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>teamLab Tokyo tickets comparison</Link>),{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>Shibuya Sky tickets</Link>{" "}
            (still choosing a deck? see the{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={L}>best observation deck in Tokyo</Link>),{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>Tokyo Disneyland tickets</Link>{" "}
            (no gate sales, on sale two months ahead) and the{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={{ color: "var(--text)", fontWeight: 600 }}>Universal Studios Japan Express Pass</Link>; the passes
            that pay back fastest are the{" "}
            <Link href="/guides/attractions/hakone-free-pass" style={{ color: "var(--text)", fontWeight: 600 }}>Hakone Free Pass</Link> and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--text)", fontWeight: 600 }}>JR Kansai Area Pass</Link>.
            For Tokyo alone, our{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>things to do in Tokyo guide</Link>{" "}
            lists ticket prices and what to book ahead; for the whole country, the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={L}>Japan attraction ticket prices table</Link>{" "}
            has the official admission of {attractionPrices.length} sights, the 2026 fee rises and a free CSV. For a first night in Tokyo, a 3-hour{" "}
            <Link href="/guides/attractions/tokyo-food-tour" style={L}>Tokyo food tour through Shinjuku&apos;s izakaya and Golden Gai</Link>{" "}
            is the easy booking; in Osaka, the{" "}
            <Link href="/guides/attractions/dotonbori-river-cruise" style={L}>Dotonbori River Cruise</Link> is ¥2,000
            for 20 minutes, every half hour from 11:00 to 21:00, and{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets" style={L}>Umeda Sky Building tickets</Link> are
            ¥2,000 for the open-air rooftop, open until 22:30; and in Kyoto,{" "}
            <Link href="/guides/attractions/teamlab-kyoto-tickets" style={L}>teamLab Kyoto tickets</Link> start at
            ¥3,800, seven minutes&apos; walk from Kyoto Station. For a day out on your own, the{" "}
            <Link href="/guides/attractions/nara-day-trip" style={L}>Nara day trip guide</Link> has the trains from
            Osaka and Kyoto (about 34 minutes on the Kintetsu from Osaka-Namba) and Todai-ji at ¥800; further
            north, the{" "}
            <Link href="/guides/attractions/amanohashidate-ine-day-trip" style={L}>Amanohashidate day trip</Link>{" "}
            guide sets a tour against the 2h14 limited express from Kyoto and the bus to Ine; and the{" "}
            <Link href="/guides/attractions/fuji-q-highland-tickets" style={L}>Fuji-Q Highland tickets guide</Link>{" "}
            explains the free entry, the date-priced 1-Day Pass and the Q Pack with the highway bus from Tokyo. Picking
            a base in the Kansai? Our guide to{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={L}>where to stay in Osaka</Link>{" "}
            compares Namba, Shinsaibashi, Umeda, Tennoji and Universal City by the train to Kansai Airport and
            Shin-Osaka.
          </PartnerPick>
          {/* Winter route, added 6 Nov 2026 (jtk-20261106-A21). */}
          <PartnerPick
            label="December to February"
            heading="Planning a winter trip?"
            cta={{ href: jrHokkaidoRailPass.url, label: "Price the JR Hokkaido Rail Pass on Klook →" }}
          >
            The <Link href="/guides/attractions/japan-winter-itinerary" style={L}>Japan winter itinerary</Link> is the
            place to start. It leads to the <Link href="/guides/attractions/sapporo-snow-festival-tours" style={L}>Sapporo
            Snow Festival</Link>, the <Link href="/guides/attractions/otaru-day-trip-from-sapporo" style={L}>Otaru day
            trip</Link> and the <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={L}>7-day Hokkaido
            itinerary</Link> in the north, and for skiing to <Link href="/guides/attractions/niseko-ski-tours" style={L}>Niseko
            ski tours</Link> and the <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={L}>GALA Yuzawa
            day trip from Tokyo</Link>. The <Link href="/guides/attractions/jigokudani-snow-monkey-tour" style={L}>Jigokudani
            snow monkeys</Link>, the <Link href="/guides/attractions/takayama-shirakawago-tour" style={L}>Takayama and
            Shirakawa-go tours</Link> and the <Link href="/guides/attractions/tokyo-illumination-tours" style={L}>Tokyo
            illuminations</Link> fit a shorter trip. A Hokkaido trip that leaves Sapporo is also where the{" "}
            <PartnerTextLink href={jrHokkaidoRailPass.url}>JR Hokkaido Rail Pass</PartnerTextLink> is worth pricing.
            Planning by trip length instead? The{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" style={L}>Tokyo Kyoto Osaka 7-day itinerary</Link>,
            the <Link href="/guides/attractions/japan-10-day-itinerary" style={L}>10-day Japan itinerary</Link>, the{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary" style={L}>Japan 14 day itinerary for 2 weeks in Japan</Link>{" "}
            and the <Link href="/guides/attractions/japan-3-week-itinerary" style={L}>Japan 3 week itinerary</Link> each
            set out how many nights to spend in each city. Going for the first time and not sure how long? The{" "}
            <Link href="/guides/attractions/japan-first-time-itinerary" style={L}>first time Japan itinerary</Link>{" "}
            answers that first: 9 days across Tokyo, Kyoto and Osaka, with what to book before you fly.
          </PartnerPick>

          <section className={styles.faqSection} style={{ marginTop: "3rem" }}>
            <span className={styles.sectionLabel}>FAQ</span>
            <h2 className={styles.sectionTitle}>Japan attraction tickets FAQ</h2>
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
          </>
        }
      />
    </>
  );
}
