import Head from "next/head";
import Link from "next/link";
import GuideHub from "../../../components/GuideHub";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import { transportArticles, transportCategory } from "../../../lib/guides-transport";
import { jrPassWholeJapan, tokyoSubwayTicket } from "../../../lib/klook-links";
import { articleDates } from "../../../lib/page-dates";
import { hubItemListJsonLd } from "../../../lib/structured-data";

export const getStaticProps = () => ({ props: { dates: articleDates(transportArticles.map((a) => a.href)) } });

const DESC =
  "Japan transport guides, grouped by the decision in front of you: rail passes, airport transfers, getting around 3 big cities, and how to pay a fare.";

export default function GuidesTransportPage({ dates }: { dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>Japan Transport Guides 2026: Rail Passes and City Travel</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport" />
        <meta property="og:title" content="Japan Transport Guides 2026: Rail Passes and City Travel" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Transport Guides 2026: Rail Passes and City Travel" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: hubItemListJsonLd(transportCategory, DESC) }}
        />
      </Head>

      <GuideHub
        category={transportCategory}
        heading="Japan Transport Guides"
        heroDesc="JR Pass, IC cards, Shinkansen routes, airport trains, and everything you need to get around Japan — prepared before you arrive."
        dates={dates}
        picks={
          <PartnerPick
            label="Ready to book"
            heading="Rail and subway passes on Klook"
            cta={{ href: jrPassWholeJapan.url, label: "Check JR Pass options on Klook →" }}
          >
            Once{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>our JR Pass guide</Link>{" "}
            has shown the pass pays off on your route, Klook sells the{" "}
            <PartnerTextLink href={jrPassWholeJapan.url}>7, 14 or 21 day JAPAN RAIL PASS</PartnerTextLink>. Our{" "}
            <Link href="/guides/transport/kyoto-to-tokyo-shinkansen" style={{ color: "var(--text)", fontWeight: 600 }}>Kyoto to Tokyo train guide</Link>{" "}
            shows what the pass covers on the busiest single leg, with the Nozomi ticket priced, and our{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" style={{ color: "var(--text)", fontWeight: 600 }}>Tokyo to Kanazawa shinkansen guide</Link>{" "}
            weighs it against the Hokuriku Arch Pass on the Kagayaki. For a stay
            based in the capital, the{" "}
            <PartnerTextLink href={tokyoSubwayTicket.url}>Tokyo Subway Ticket</PartnerTextLink> covers all Tokyo Metro
            and Toei Subway lines for 24, 48 or 72 hours;{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--text)", fontWeight: 600 }}>how many rides make the Tokyo Subway Ticket worth it</Link>{" "}
            is worked out against the official fares. On a day of only a few rides, tapping{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--text)", fontWeight: 600 }}>an IC card such as Suica, PASMO or ICOCA</Link>{" "}
            usually comes out cheaper than a pass. Landing at Narita, our{" "}
            <Link href="/guides/transport/skyliner-vs-nex" style={{ color: "var(--text)", fontWeight: 600 }}>Skyliner vs N&apos;EX comparison</Link>{" "}
            picks the airport train by the area your hotel is in; in Osaka, our{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={{ color: "var(--text)", fontWeight: 600 }}>Osaka Metro Pass and Enjoy Eco Card guide</Link>{" "}
            works out how many subway rides the 1-day pass needs to pay off.
          </PartnerPick>
        }
      />
    </>
  );
}
