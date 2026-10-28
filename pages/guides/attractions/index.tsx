import Head from "next/head";
import GuideHub from "../../../components/GuideHub";
import { attractionArticles, attractionsCategory } from "../../../lib/guides-attractions";
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
      />
    </>
  );
}
