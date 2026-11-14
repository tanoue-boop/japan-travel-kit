import Head from "next/head";
import Link from "next/link";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import GuideHub from "../../../components/GuideHub";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import { esimArticles, esimCategory } from "../../../lib/guides-esim";
import { klookEsim } from "../../../lib/klook-links";
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
        picks={
          <>
          <EsimPageAnswer route="/guides/esim" />
          <PartnerPick
            label="Booking other things on Klook?"
            heading="One checkout for your eSIM and tickets"
            cta={{ href: klookEsim.url, label: klookEsim.ctaLabel }}
          >
            If you are already booking tickets or transport on Klook, its{" "}
            <PartnerTextLink href={klookEsim.url}>{klookEsim.name}</PartnerTextLink> keeps everything in one account.
            We leave it out of our rankings because its US$1.05 from-price names no plan, so compare it with
            the prices in our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>best eSIM for Japan</Link>{" "}
            comparison (which one to pick for each kind of trip) or every provider&apos;s price per GB in the{" "}
            <Link href="/guides/esim/japan-esim-price-tracker" style={{ color: "var(--text)", fontWeight: 600 }}>Japan eSIM price tracker</Link>{" "}
            before you buy. Then pick by what matters most: the{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>cheapest eSIM for Japan</Link>, an{" "}
            <Link href="/guides/esim/japan-esim-unlimited" style={{ color: "var(--text)", fontWeight: 600 }}>unlimited eSIM</Link>, a{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--text)", fontWeight: 600 }}>pocket WiFi rental</Link> for a group, or a{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" style={{ color: "var(--text)", fontWeight: 600 }}>SIM card at the airport</Link> if your
            phone cannot take an eSIM. On a Samsung or Pixel, the{" "}
            <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--text)", fontWeight: 600 }}>Japan eSIM for Android guide</Link>{" "}
            lists which models take an eSIM (Pixel 3 and Galaxy S20 onward) and the menu to install it from. Staying a month or more, or need a Japanese phone number? Read our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--text)", fontWeight: 600 }}>Sakura Mobile review</Link>.
            Read advice on a forum? The{" "}
            <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--text)", fontWeight: 600 }}>best eSIM for Japan Reddit check</Link>{" "}
            tests common Japan eSIM advice against today&apos;s prices.
          </PartnerPick>
          </>
        }
      />
    </>
  );
}
