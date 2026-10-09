import Head from "next/head";
import GuideHub from "../../../components/GuideHub";
import { moneyArticles, moneyCategory } from "../../../lib/guides-money";
import { articleDates } from "../../../lib/page-dates";

export const getStaticProps = () => ({ props: { dates: articleDates(moneyArticles.map((a) => a.href)) } });

const DESC =
  "Japan money guides, grouped by what you need to sort: which travel card to bring, how to get yen from an ATM that accepts foreign cards, what to tap where, and what the trip will cost.";

export default function GuidesMoneyPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>Japan Money &amp; Payment Guides 2026: Cards, Cash & ATMs | Japan Travel Kit</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money" />
        <meta property="og:title" content="Japan Money & Payment Guides 2026: Cards, Cash & ATMs" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Money & Payment Guides 2026: Cards, Cash & ATMs" />
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
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
              ],
            }),
          }}
        />
      </Head>

      <GuideHub
        category={moneyCategory}
        heading="Japan Money & Payment Guides"
        heroDesc="Cash vs card, ATM access, currency exchange, and how to avoid fees — everything you need to manage money in Japan."
        dates={dates}
      />
    </>
  );
}
