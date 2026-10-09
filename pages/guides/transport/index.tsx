import Head from "next/head";
import GuideHub from "../../../components/GuideHub";
import { transportArticles, transportCategory } from "../../../lib/guides-transport";
import { articleDates } from "../../../lib/page-dates";

export const getStaticProps = () => ({ props: { dates: articleDates(transportArticles.map((a) => a.href)) } });

const DESC =
  "Japan transport guides, grouped by the decision in front of you: rail passes and intercity travel, airport transfers, getting around Tokyo, Kyoto and Osaka, and how to pay with an IC card or day pass.";

export default function GuidesTransportPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>Japan Transport Guides 2026: Rail Passes, Airports & City Travel | Japan Travel Kit</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport" />
        <meta property="og:title" content="Japan Transport Guides 2026: Rail Passes, Airports & City Travel" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Transport Guides 2026: Rail Passes, Airports & City Travel" />
        <meta name="twitter:description" content={DESC} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around", item: "https://www.japan-travel-kit.com/guides/transport" },
              ],
            }),
          }}
        />
      </Head>

      <GuideHub
        category={transportCategory}
        heading="Japan Transport Guides"
        heroDesc="JR Pass, IC cards, Shinkansen routes, airport trains, and everything you need to get around Japan — prepared before you arrive."
        dates={dates}
      />
    </>
  );
}
