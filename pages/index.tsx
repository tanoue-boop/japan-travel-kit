import Head from "next/head";
import { attractionPrices, latestChecked, priceSummary, PRICE_TABLE_ROUTE } from "../lib/attraction-prices";
import Link from "next/link";
import { esimArticles } from "../lib/guides-esim";
import { transportArticles } from "../lib/guides-transport";
import { moneyArticles } from "../lib/guides-money";
import { attractionArticles } from "../lib/guides-attractions";
import { articlesForCity } from "../lib/guide-hub";
import { hreflangLinks } from "../components/Hreflang";
import {
  BOOK_CARDS,
  CITY_HREFS,
  HUB_HREFS,
  POPULAR_HREFS,
  BookSection,
  CtaBand,
  HomeHero,
  HomeSection,
  StatsBand,
  TrustBand,
  type BookCard,
  type HomeRow,
} from "../components/HomeSections";

// The sections themselves live in components/HomeSections.tsx since 2026-11-01, shared
// with the four translated entry pages (/zh-tw, /zh-cn, /ko, /th) so that switching
// language on the home page keeps the same layout. This file holds the English words.

const allArticles = [...esimArticles, ...transportArticles, ...moneyArticles, ...attractionArticles];
const totalGuides = allArticles.length;

const dayTripCount = attractionArticles.filter((a) => a.group === "daytrips").length;
const cityCounts = {
  tokyo: articlesForCity("tokyo", attractionArticles, transportArticles).length,
  kyoto: articlesForCity("kyoto", attractionArticles, transportArticles).length,
  osaka: articlesForCity("osaka", attractionArticles, transportArticles).length,
};

// The homepage's only category navigation. Until 2026-10-09 a "What do you need help with?"
// section sat above this one pointing at /sim-cards, /wifi-pocket, /transport and /money —
// the first two now 301 to guides already linked below, and the other two *were* these hubs.
// One set of four cards, one destination each.
//
// Things to Do moved to the front 2026-10-19: it is the largest category, the one the daily
// article queue feeds, and the one the traffic and the bookings come from. eSIM, which this
// page was built around in September, now sits where its share of the site actually is.
//
// Restyled 2026-10-19: the coloured icon tile and pill badge on each card are gone. The list
// is now four rule-divided rows with a numeral, a serif title and the guide count as a small
// caps line — the category is carried by its name, not by a colour.
const [attractionsHub, transportHub, esimHub, moneyHub] = HUB_HREFS;
const guideHubs: HomeRow[] = [
  {
    href: attractionsHub,
    title: "Things to Do",
    desc: "Tickets, tours, theme parks and day trips — what needs booking ahead, at what official price, and which booking route works from abroad.",
    meta: `${attractionArticles.length} Guides`,
  },
  {
    href: transportHub,
    title: "Getting Around",
    desc: "Shinkansen passes, IC cards, airport trains, and city-by-city transport guides.",
    meta: `${transportArticles.length} Guides`,
  },
  {
    href: esimHub,
    title: "eSIM & SIM Cards",
    desc: "Which eSIM to buy, how to install it, network coverage, and honest plan comparisons.",
    meta: `${esimArticles.length} Guides`,
  },
  {
    href: moneyHub,
    title: "Money & Payment",
    desc: "Travel cards, ATM access, cash vs card, and how to pay your way across Japan.",
    meta: `${moneyArticles.length} Guides`,
  },
];

// Destination cards. Most visitors describe what they want by city ("things to do in Kyoto"),
// not by our category names, and each city hub now lists every guide we have for that city.
const destinations: HomeRow[] = [
  {
    href: CITY_HREFS.tokyo,
    title: "Tokyo",
    desc: "The decks, the teamLab slots, Disney, the studio tour — and the four day trips out of the city.",
    meta: `${cityCounts.tokyo} Guides`,
  },
  {
    href: CITY_HREFS.kyoto,
    title: "Kyoto",
    desc: "Mostly walk-in temples, which changes how you plan a day — plus kimono rental and the bus pass maths.",
    meta: `${cityCounts.kyoto} Guides`,
  },
  {
    href: CITY_HREFS.osaka,
    title: "Osaka",
    desc: "Where a city pass actually pays off, the one attraction no pass covers, and the Kansai day trips.",
    meta: `${cityCounts.osaka} Guides`,
  },
  {
    href: CITY_HREFS.daytrips,
    title: "Day Trips & Tours",
    desc: "Mt. Fuji, Hakone, Nikko, Kamakura, Nara, Hiroshima — which itinerary to book, and when doing it yourself is cheaper.",
    meta: `${dayTripCount} Guides`,
  },
];

// Popular guides — the list itself, and why it is in this order, is POPULAR_HREFS.
const popularGuides: HomeRow[] = POPULAR_HREFS.map((href) => {
  const article = allArticles.find((a) => a.href === href);
  if (!article) throw new Error(`index: popular guide ${href} is not in any category list`);
  return { href: article.href, title: article.title, desc: article.desc, meta: article.badge };
});

/**
 * "Book before you fly" — the home page's only outbound booking block, added
 * 2026-10-27.
 *
 * Until now every link on this page pointed at another page of our own, which on
 * the second most-read page of the site meant it carried no booking route at all.
 * One card per thing that is worth arranging from home, and each card also links
 * the guide that argues it, so a reader who wants to read first still can. What
 * each card sells is BOOK_CARDS in components/HomeSections.tsx.
 */
const bookBeforeYouFly: BookCard[] = [
  {
    kicker: "Data",
    title: "A Japan eSIM, working before you leave the terminal",
    desc: (
      <>
        The one thing worth having live the minute you land: train apps, hotel check-in and your tickets all run off the
        phone. Klook sells a Japan eSIM of its own as a QR voucher; to compare it with other providers, our{" "}
        <Link href="/guides/esim/japan-esim-price-tracker">Japan eSIM price tracker</Link> lists every provider&apos;s price per GB.
        On Android, the <Link href="/guides/esim/japan-esim-android">Japan eSIM for Android guide</Link> checks your
        model first — Pixel 3 and Galaxy S20 and later take one.
      </>
    ),
    ctas: [{ label: "See eSIM options on Klook →", url: BOOK_CARDS.esim.urls[0] }],
    guide: { href: BOOK_CARDS.esim.guide, label: "Read: the best eSIM for Japan" },
  },
  {
    kicker: "Where to stay",
    title: "A hotel on the line you will actually ride",
    desc: (
      <>
        In Tokyo, Kyoto and Osaka the area does more work than the room. A base on the Yamanote loop, on the Kyoto
        Station forecourt or on the Midosuji Line saves a transfer every day of the trip. In Osaka that means Namba for
        a first trip, Umeda for JR and Universal City for USJ — the{" "}
        <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka guide</Link> compares the three.
      </>
    ),
    ctas: [
      { label: "Tokyo hotels on Klook →", url: BOOK_CARDS.stay.urls[0] },
      { label: "Kyoto hotels on Klook →", url: BOOK_CARDS.stay.urls[1] },
      { label: "Osaka hotels on Klook →", url: BOOK_CARDS.stay.urls[2] },
    ],
    guide: { href: BOOK_CARDS.stay.guide, label: "Read: where to stay in Tokyo" },
  },
  {
    kicker: "Rail",
    title: "The JR Pass, priced against your own route",
    desc:
      "The whole-country pass earns its keep on long hops and loses on a single-city trip, so the only honest way to buy it is to price it against the trains you plan to take. It comes in 7, 14 and 21-day versions, Ordinary and Green Car.",
    ctas: [{ label: "Price the JR Pass on Klook →", url: BOOK_CARDS.rail.urls[0] }],
    guide: { href: BOOK_CARDS.rail.guide, label: "Read: is the JR Pass worth it?" },
  },
  {
    kicker: "Day trip",
    title: "Mt. Fuji and Hakone, as one day out of Tokyo",
    desc:
      "The day trip that is hardest to assemble yourself: the Fuji Fifth Station paired with the Hakone volcanic area and Lake Ashi, as a coach day that is back in Tokyo the same evening.",
    ctas: [{ label: "Check the day tour on Klook →", url: BOOK_CARDS.daytrip.urls[0] }],
    guide: { href: BOOK_CARDS.daytrip.guide, label: "Read: which Mt. Fuji day tour" },
  },
];

const TITLE = "Japan Travel Kit | Tickets, Tours & Trip Planning for 2026";
const DESC =
  "Which Japan attractions, tours and day trips need booking ahead — with official prices and the booking route that works from abroad, checked at source.";

/**
 * "Prices last checked" stat. Read from the official price table (lib/attraction-prices.ts),
 * the same source the translated home pages use, so every edition shows the same month and
 * the same count of checked prices (unified 2026-11-10).
 */
export const getStaticProps = () => {
  const [y, m] = latestChecked().split("-").map(Number);
  return {
    props: {
      pricesChecked: new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }),
    },
  };
};

export default function HomePage({ pricesChecked }: { pricesChecked: string }) {
  // Counts and dates, not claims: nothing here asserts we have been anywhere or tried anything.
  const stats = [
    { value: `${attractionArticles.length}`, label: "Ticket & tour guides" },
    { value: `${attractionPrices.length}`,   label: "Official prices checked" },
    { value: `${totalGuides}`,               label: "Guides in total" },
    { value: pricesChecked,                  label: "Prices last checked" },
  ];

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://www.japan-travel-kit.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        {/* The WebSite node that used to sit here moved to pages/_document.tsx on
            2026-10-20, where it is emitted on every page alongside Organization —
            keeping it here as well would have declared the site twice on the home page. */}
        {/* The home page is now one side of a translated group: /zh-tw, /zh-cn, /ko and
            /th each have an entry page of their own (2026-10-21). hreflang has to be
            reciprocal or Google ignores it, so this page declares the whole cluster
            exactly as the four translated entry pages do. */}
        {hreflangLinks("/")}
      </Head>

      <HomeHero
        eyebrow="Updated for the 2026 season"
        title="What to book"
        titleAccent="before Japan"
        desc="The tickets, tours and day trips that need reserving ahead — with official prices and the booking route that works from abroad. Then the trip prep: transport, eSIM and money."
        primary={{ href: "/guides/attractions", label: "Browse Tours & Tickets" }}
        secondary={{ href: "#categories", label: "Plan Your Trip" }}
        imageAlt="An empty early-morning street in the Higashiyama district of Kyoto, with the Yasaka Pagoda beyond the machiya rooftops"
      />

      {/* Book before you fly — the one outbound booking block on the page, directly
          under the hero. Nothing below it was removed to make room. */}
      <BookSection
        eyebrow="Book before you fly"
        title="Four things worth sorting from home"
        desc="Most of a Japan trip can be arranged on the day. These four are the exceptions — the connection, the room, the rail and the one day trip that sells out by date. Each card links the guide that explains it as well as the place to book it."
        cards={bookBeforeYouFly}
        note={
          <>
            The booking links above are affiliate links: we may earn a small commission if you book
            through them, at no extra cost to you. Prices and availability are the seller&apos;s.{" "}
            <Link href="/disclaimer">Full disclaimer →</Link>
          </>
        }
      />

      <StatsBand stats={stats} />

      {/* The official-price database behind the "Official prices checked" count above
          (jtk-20261111-D02). Numbers come from data/attraction-prices.json. */}
      <HomeSection
        tone="paper"
        eyebrow="Official prices"
        title="What Japan's Attractions Cost in 2026"
        desc="Every figure read on the operator's own site, dated and sourced."
      >
        <p style={{ color: "var(--text-muted)", lineHeight: 1.75 }}>
          The <Link href={PRICE_TABLE_ROUTE}>Japan attraction ticket prices table</Link> lists the official adult and
          child admission of {attractionPrices.length} attractions — observation decks, museums, theme parks, temples,
          castles and passes. The median adult ticket is ¥{priceSummary.medianAdultYen?.toLocaleString("en-US")},
          only {priceSummary.mustBook.length} have to be booked before you arrive, and{" "}
          {priceSummary.revisedIn(2026).length} raised their fees in 2026. The full table is a free CSV, re-checked on
          the 1st of every month.
        </p>
      </HomeSection>

      {/* Winter, December to February. Added 6 Nov 2026 (jtk-20261106-A21): the booking
          window for these trips opens now, and the guides had no route from this page. */}
      <HomeSection
        tone="paper"
        eyebrow="December to February"
        title="Planning a Winter Trip to Japan?"
        desc="The dates, tours and passes for this winter, on a separate track from the rest of the year."
      >
        <p style={{ color: "var(--text-muted)", lineHeight: 1.75 }}>
          Start with the <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link>,
          then pick the part you came for. In February that is the{" "}
          <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival</Link>, which pairs
          with an <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip</Link> or a full{" "}
          <Link href="/guides/attractions/hokkaido-7-day-itinerary">7-day Hokkaido itinerary</Link>. For skiing,
          compare <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link> with a{" "}
          <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">GALA Yuzawa day trip from Tokyo</Link>.
          For a day out of the snow-country kind, see the{" "}
          <Link href="/guides/attractions/jigokudani-snow-monkey-tour">Jigokudani snow monkeys</Link> and the{" "}
          <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tours</Link>. If
          you are staying in the city, the <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo
          illuminations</Link> run through the season.
        </p>
      </HomeSection>

      {/* Day trips and the Kansai airport run. Added 12 Nov 2026 (jtk-20261112-I01): these
          guides had no impressions and no link from this page. */}
      <HomeSection
        tone="white"
        eyebrow="Day trips and arrivals"
        title="Which Day Trip, and Which Airport Train?"
        desc="Three questions with a one-line answer each, and a guide behind it."
      >
        <p style={{ color: "var(--text-muted)", lineHeight: 1.75 }}>
          From Osaka or Kyoto, Nara needs no tour: the{" "}
          <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link> has the Kintetsu and JR trains
          (about 34 minutes from Osaka-Namba), the free deer park and Todai-ji at ¥800. From Tokyo, the{" "}
          <Link href="/guides/attractions/fuji-q-highland-tickets">Fuji-Q Highland tickets guide</Link> explains why
          entry is free and the 1-Day Pass is what you buy, and when the Q Pack with the highway bus makes it one
          booking. Landing at Kansai Airport, the{" "}
          <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Nankai Rapi:t comparison</Link> picks the
          train by your hotel: the Rapi:t to Namba, the Haruka to Tennoji, Osaka, Shin-Osaka and Kyoto.
        </p>
      </HomeSection>

      {/* Travel Guides hubs — the one category navigation on the page */}
      <HomeSection
        id="categories"
        tone="white"
        eyebrow="Plan your trip"
        title="Travel Guides"
        desc="Start with what you need to book, then sort the rest — in-depth, independent guides for every part of your Japan trip."
        rows={guideHubs}
      />

      {/* Destinations — the city hubs, which list every guide for their city */}
      <HomeSection
        tone="paper"
        eyebrow="Destinations"
        title="Browse by city"
        desc="Most trips are planned city by city. Each hub lists every guide we have written for it."
        rows={destinations}
        footLink={{ href: "/guides", label: `Browse all ${totalGuides} guides →` }}
      />

      <HomeSection
        tone="white"
        eyebrow="Most read"
        title="Popular Guides"
        desc="The articles travellers open most before landing in Japan."
        rows={popularGuides}
      />

      {/* Trust — the one general-interest block on the page. The "Quick tips every visitor
          should know" section that used to sit above it said nothing the guides don't say
          better, and pushed the guide links further down. Removed 2026-10-09. */}
      <TrustBand
        eyebrow="How we work"
        title="Independent. Honest. Up-to-date."
        desc="We research every product we recommend and check its prices against the provider's own published rates. Our reviews are never sponsored — we only earn a small affiliate commission if you buy through our links, at no extra cost to you."
        checks={["No paid placements", "Verified prices", "Updated monthly"]}
      />

      <CtaBand
        eyebrow="Start here"
        title="Ready to plan your Japan trip?"
        desc="Start with the bookings — the timed tickets and tours are the only part of a Japan trip that can sell out before you arrive."
        button={{ href: "/guides/attractions", label: "Browse Tours & Tickets" }}
      />
    </>
  );
}
