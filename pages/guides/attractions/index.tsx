import Head from "next/head";
import GuideHub from "../../../components/GuideHub";
import { attractionArticles, attractionsCategory } from "../../../lib/guides-attractions";
import { articleDates } from "../../../lib/page-dates";

export const getStaticProps = () => ({ props: { dates: articleDates(attractionArticles.map((a) => a.href)) } });

const DESC =
  "Japan attraction ticket guides: teamLab Planets and Borderless, Tokyo Disney, Universal Studios Japan, Shibuya Sky and sumo. Official prices, how to book from abroad, and when slots sell out.";

export default function GuidesAttractionsPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>Things to Do in Japan: Tickets &amp; Experiences (2026) | Japan Travel Kit</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions" />
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
