import Head from "next/head";
import GuideHub from "../../../components/GuideHub";
import { esimArticles, esimCategory } from "../../../lib/guides-esim";
import { articleDates, pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { hubItemListJsonLd } from "../../../lib/structured-data";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/esim"), dates: articleDates(esimArticles.map((a) => a.href)) },
});

// Rendered with " Updated <month>." appended, so this is budgeted ~22 characters short of
// the 155 scripts/check-meta-length.js allows.
const DESC =
  "Japan eSIM and SIM card guides: which provider to buy, how each one performs, and the right plan for your trip length.";

export default function GuidesEsimPage({ updated, dates }: { updated: PageUpdated; dates: Record<string, string> }) {
  const description = `${DESC} Updated ${updated.label}.`;
  return (
    <>
      <Head>
        <title>Japan eSIM Guides 2026: Which to Buy and How to Set It Up</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan eSIM Guides 2026: Which to Buy and How to Set It Up" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan eSIM Guides 2026: Which to Buy and How to Set It Up" />
        <meta name="twitter:description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: hubItemListJsonLd(esimCategory, DESC) }}
        />
      </Head>

      <GuideHub
        category={esimCategory}
        heading="Japan eSIM Guides"
        heroDesc="Which SIM to buy, how to install a Japan eSIM, network coverage breakdowns, and honest comparisons — so you can stay connected from the moment you land."
        dates={dates}
      />
    </>
  );
}
