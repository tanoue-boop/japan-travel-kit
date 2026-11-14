import Head from "next/head";
import Link from "next/link";
import GuideHub from "../../../components/GuideHub";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import { attractionArticles, attractionsCategory } from "../../../lib/guides-attractions";
import { attractionPrices } from "../../../lib/attraction-prices";
import { fujiDayTour, jrHokkaidoRailPass, tokyoSightseeingBusTour } from "../../../lib/klook-links";
import { articleDates } from "../../../lib/page-dates";
import { hubItemListJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";

export const getStaticProps = () => ({ props: { dates: articleDates(attractionArticles.map((a) => a.href)) } });

const L = { color: "var(--text)", fontWeight: 600 } as const;

const DESC =
  "Japan attraction guides: teamLab, Tokyo Disney, USJ, Shibuya Sky and sumo tickets, plus the day trips — with official prices and how to book abroad.";

export default function GuidesAttractionsPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>Things to Do in Japan: Tickets &amp; Experiences (2026)</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions" />
        {hreflangLinks("/guides/attractions")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Things to Do in Japan: Tickets & Experiences (2026)" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Things to Do in Japan: Tickets & Experiences (2026)" />
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
      </Head>

      <GuideHub
        category={attractionsCategory}
        heading="Things to Do in Japan"
        heroDesc="Tickets and experiences worth planning ahead — teamLab, Universal Studios Japan, Shibuya Sky and more. How to book, when to go, and which option suits your trip."
        dates={dates}
        picks={
          <>
          <PartnerPick
            label="Two easy first bookings"
            heading="Guided days out from Tokyo"
            cta={{ href: fujiDayTour.url, label: "See the Mt. Fuji day tour on Klook →" }}
          >
            If you want one day out of the city without planning the transport, this{" "}
            <PartnerTextLink href={fujiDayTour.url}>Mt. Fuji day tour from Tokyo</PartnerTextLink> runs by coach to the
            Fuji Fifth Station, Lake Kawaguchi and Oshino Hakkai and returns the same evening. In the city itself, the{" "}
            <PartnerTextLink href={tokyoSightseeingBusTour.url}>Tokyo sightseeing bus day tour</PartnerTextLink> is a
            guided loop of the Imperial Palace gardens, Asakusa and Tokyo Skytree. The tickets that sell out by date are{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>teamLab Planets</Link>{" "}
            (not sure which teamLab? see our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>teamLab Tokyo tickets comparison</Link>),{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>Shibuya Sky</Link>{" "}
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
            Osaka and Kyoto (about 34 minutes on the Kintetsu from Osaka-Namba) and Todai-ji at ¥800, and the{" "}
            <Link href="/guides/attractions/fuji-q-highland-tickets" style={L}>Fuji-Q Highland tickets guide</Link>{" "}
            explains the free entry, the date-priced 1-Day Pass and the Q Pack with the highway bus from Tokyo. Picking
            a base in the Kansai? Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={L}>where to stay in Osaka guide</Link>{" "}
            compares Namba, Umeda and Universal City.
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
          </PartnerPick>
          </>
        }
      />
    </>
  );
}
