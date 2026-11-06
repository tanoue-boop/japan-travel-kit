import Head from "next/head";
import Link from "next/link";
import GuideHub from "../../../components/GuideHub";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import { attractionArticles, attractionsCategory } from "../../../lib/guides-attractions";
import { fujiDayTour, tokyoSightseeingBusTour } from "../../../lib/klook-links";
import { articleDates } from "../../../lib/page-dates";
import { hubItemListJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";

export const getStaticProps = () => ({ props: { dates: articleDates(attractionArticles.map((a) => a.href)) } });

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
            <Link href="/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>teamLab Planets</Link>,{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>Shibuya Sky</Link> and the{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={{ color: "var(--text)", fontWeight: 600 }}>USJ Express Pass</Link>; the passes
            that pay back fastest are the{" "}
            <Link href="/guides/attractions/hakone-free-pass" style={{ color: "var(--text)", fontWeight: 600 }}>Hakone Free Pass</Link> and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--text)", fontWeight: 600 }}>JR Kansai Area Pass</Link>.
          </PartnerPick>
        }
      />
    </>
  );
}
