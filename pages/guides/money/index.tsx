import Head from "next/head";
import Link from "next/link";
import GuideHub from "../../../components/GuideHub";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import { moneyArticles, moneyCategory } from "../../../lib/guides-money";
import { tokyoSubwayTicket } from "../../../lib/klook-links";
import { WISE_CARD_URL, wiseLink } from "../../../lib/wise-links";
import { articleDates } from "../../../lib/page-dates";
import { hubItemListJsonLd } from "../../../lib/structured-data";

export const getStaticProps = () => ({ props: { dates: articleDates(moneyArticles.map((a) => a.href)) } });

const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";
const WISE_CARD_CTA = wiseLink("guides-money-hub", WISE_CARD_URL);

const DESC =
  "Japan money guides, grouped by what you need to sort: which travel card to bring, how to get yen from an ATM that takes foreign cards, and the budget.";

export default function GuidesMoneyPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>Japan Money &amp; Payment Guides 2026: Cards, Cash &amp; ATMs</title>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: hubItemListJsonLd(moneyCategory, DESC) }}
        />
      </Head>

      <GuideHub
        category={moneyCategory}
        heading="Japan Money & Payment Guides"
        heroDesc="Cash vs card, ATM access, currency exchange, and how to avoid fees — everything you need to manage money in Japan."
        dates={dates}
        picks={
          <PartnerPick
            label="Before you fly"
            heading="Sort the card, the cover and the first train"
            cta={{ href: WISE_CARD_CTA, label: "Get a Wise card before you fly →" }}
          >
            The <PartnerTextLink href={WISE_CARD_CTA}>Wise card</PartnerTextLink> is the one to order early, because the
            physical card has to reach you before you leave; our{" "}
            <Link href="/guides/money/wise-card-japan" style={{ color: "var(--text)", fontWeight: 600 }}>Wise card Japan guide</Link>{" "}
            lists the free ATM allowance for each card-issuing country and which Japanese ATMs take it, and the{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--text)", fontWeight: 600 }}>ATMs in Japan guide</Link>{" "}
            sets out the 7-Eleven and Japan Post Bank fees, hours and limits for foreign cards. For medical cover,{" "}
            <PartnerTextLink href={SAFETYWING_URL}>SafetyWing</PartnerTextLink> publishes its price and can be bought
            before you leave or while already abroad; our{" "}
            <Link href="/guides/money/best-travel-insurance-japan" style={{ color: "var(--text)", fontWeight: 600 }}>travel insurance comparison</Link> sets it against
            the alternatives. And buying the{" "}
            <PartnerTextLink href={tokyoSubwayTicket.url}>Tokyo Subway Ticket</PartnerTextLink> up front on Klook
            settles the transport cost that is hardest to put on a foreign card once you arrive. Outside Tokyo, the{" "}
            <Link href="/guides/attractions/hakone-free-pass" style={{ color: "var(--text)", fontWeight: 600 }}>Hakone Free Pass</Link> and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--text)", fontWeight: 600 }}>JR Kansai Area Pass</Link> do the same job, and the{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>cheapest eSIM for Japan</Link> keeps your banking apps online. If the trip includes a shopping day, note that from 1 November 2026{" "}
            <Link href="/guides/money/tax-free-shopping-japan" style={{ color: "var(--text)", fontWeight: 600 }}>Japan tax free shopping</Link>{" "}
            works as a refund after a customs check at departure, so you pay the 10% up front on your card.
          </PartnerPick>
        }
      />
    </>
  );
}
