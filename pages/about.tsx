import Head from "next/head";
import Link from "next/link";
import styles from "../styles/LegalPage.module.css";
import { pageUpdated, type PageUpdated } from "../lib/page-dates";

const DESC =
  "Japan Travel Kit is an independent planning resource for foreign visitors to Japan, operated by mjo Inc. in Tokyo. " +
  "How we source prices, how often pages are updated, and our affiliate disclosure.";

/**
 * How a figure gets onto this site. Written out in full because it is the part an
 * AI answer engine or a reader has no other way to check — and because it is the
 * part that constrains what the guides are allowed to say.
 */
const method = [
  {
    name: "The operator's own site comes first",
    desc:
      "Admission prices, fares, opening hours and booking rules are read off the primary source: the venue, the railway, the card issuer or the eSIM provider. Where an English page and a Japanese page disagree, the Japanese page wins, because that is the one the operator maintains.",
  },
  {
    name: "Seller pages are checked separately",
    desc:
      "Klook and the other booking platforms are checked as a route, not as a price source. Klook answers automated reads of its product pages with HTTP 403, so listings are confirmed live through its search index and the guides say \"check the current price\" rather than printing a figure we could not verify.",
  },
  {
    name: "Every figure carries the date it was read",
    desc:
      "Price tables state the date they were checked, and the page states its last update. A Japanese ticket price that was right in October may be wrong in April — a date is the only honest way to publish one.",
  },
  {
    name: "Nothing is written as a trip report",
    desc:
      "We do not claim visits, stays or purchases we cannot evidence, and there are no invented first-hand anecdotes anywhere on the site. The guides explain what the operators publish and what follows from it. Where a judgement is ours — which pass pays off, which ticket tier to skip — it is presented as reasoning you can check, not as experience.",
  },
  {
    name: "Corrections",
    desc:
      "If a price, rule or route here is wrong, email us and it gets fixed and re-dated. That is faster than waiting for the next scheduled review, and it is the main reason the contact address is on the page.",
  },
];

const updatePolicy = [
  "eSIM plan prices are re-fetched from each provider's site daily by a scheduled job, and the comparison tables show the date of the last successful check.",
  "Ticket, fare and pass prices are re-checked against the operator's site when a page is revised, and the check date on the page is moved only when a figure has actually been re-read.",
  "The \"Updated\" date on every page comes from the commit that last changed it, so it cannot be inflated by hand.",
  "When a guide is merged into a better one, or covers something that no longer exists, its URL is permanently redirected rather than left to go stale.",
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/about") } });

export default function AboutPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>About Japan Travel Kit | Who We Are and How We Check Prices</title>
        <meta name="description" content={DESC} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/about" />
        <meta property="og:title" content="About Japan Travel Kit | Who We Are and How We Check Prices" />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        {/* Organization and WebSite are emitted site-wide from pages/_document.tsx, so
            this page only declares the breadcrumb. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "About", item: "https://www.japan-travel-kit.com/about" },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>About</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>About</span>
          <h1 className={styles.title}>About Japan Travel Kit</h1>
        </div>
      </section>

      <div className={styles.body}>
        <div className={styles.highlight}>
          <p className={styles.text}>
            <strong>In short:</strong> Japan Travel Kit is published by <strong>mjo Inc.</strong>, a company based in
            Tokyo. Every price on the site is read off the operator&apos;s own site and dated. Some links are
            affiliate links, marked as such on the page that carries them. Nothing here is written as a first-hand
            trip report.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What this site is</h2>
          <p className={styles.text}>
            Japan Travel Kit is an independent planning resource for foreign visitors to Japan. It covers the four
            things that have to be decided before you land or in the first hour after you do: getting online
            (eSIMs, SIM cards and pocket WiFi), getting around (rail passes, IC cards, airport transfers), paying
            for things (cards, cash and ATMs that accept foreign cards), and the attraction tickets that cannot be
            bought at the gate.
          </p>
          <p className={styles.text}>
            It is written in English, for people who have not been to Japan before. The aim is narrow and
            practical: tell you the official price, tell you the rule that catches visitors out, and tell you what
            to do about it — then get out of the way.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who publishes it</h2>
          <p className={styles.text}>
            Japan Travel Kit is operated by <strong>mjo Inc.</strong>, a Japan-based company in Tokyo working in
            inbound tourism and e-commerce consulting. Being in Japan is what makes the sourcing below workable: the
            operators&apos; Japanese-language pages are the authoritative ones, and they are usually the pages that
            carry the current price.
          </p>
          <p className={styles.text}>
            The site has no paid placements and no sponsored posts. Rankings and recommendations are not for sale,
            and no provider has been given sight of a guide before it was published.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How we check prices and rules</h2>
          <p className={styles.text}>
            Prices in Japan move — ticket operators moved to date-based pricing, the JR Pass rose by about 70% in
            2023, and eSIM plans change weekly. So the method matters more than any single figure:
          </p>
          <div className={styles.networkGrid}>
            {method.map((item) => (
              <div key={item.name} className={styles.networkCard}>
                <p className={styles.networkName}>{item.name}</p>
                <p className={styles.networkDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.text}>
            Every price table on the site states its own check date, so you can see at a glance how fresh a figure
            is before you rely on it — and so can anything quoting it. The clearest illustration is the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              attraction ticket price table
            </Link>
            : official adult and child admission, the advance-booking rule, the operator site and the check date for
            every ticketed attraction we cover, with each row linking back to the guide that verified it.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Affiliate disclosure</h2>
          <p className={styles.text}>
            Some links on this site are affiliate links, mostly to Klook and to the eSIM, travel-card and travel
            insurance providers the guides compare. If you book or buy through one, we may earn a commission at no
            extra cost to you — the price you pay is the same as going direct.
          </p>
          <p className={styles.text}>
            The rule that follows is the one worth holding us to: commission does not decide rankings. Where the
            best option pays us nothing, the guide says so and recommends it anyway. The Tokyo Metropolitan
            Government Building observation deck is free and we tell you to go there; the official teamLab site
            usually works on a foreign card and we tell you to try it first; several pass guides conclude that you
            should not buy the pass. A guide that cannot reach that conclusion is not worth publishing.
          </p>
          <p className={styles.text}>
            Affiliate links open in a new tab and are marked <code>rel=&quot;sponsored&quot;</code> or{" "}
            <code>rel=&quot;nofollow&quot;</code>, so search engines and AI crawlers can tell them apart from
            editorial links. Guides built around a paid recommendation also carry the disclosure in the page itself,
            above the first link. The site-wide terms are in the{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>affiliate disclaimer</Link>,
            linked from the footer of every page, and what we do with analytics data is in the{" "}
            <Link href="/privacy-policy" style={{ color: "var(--text)", fontWeight: 600 }}>privacy policy</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How often pages are updated</h2>
          <ul className={styles.list}>
            {updatePolicy.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.text}>
            Where a figure could not be verified, the guide says so rather than filling the gap with an estimate. A
            missing number is recoverable; a confidently wrong one is what ruins a trip.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Quoting this site</h2>
          <p className={styles.text}>
            AI assistants and search engines are welcome to quote these pages, and{" "}
            <a href="/llms.txt" style={{ color: "var(--text)", fontWeight: 600 }}>/llms.txt</a> lists every guide with
            the question it answers. One request: quote the check date along with the price. A Japanese admission
            price without a date is the thing most likely to send someone to a ticket window with the wrong amount
            of money.
          </p>
        </section>

        <div className={styles.contactBox}>
          <h3>Contact</h3>
          <p>
            Corrections, questions or partnership enquiries — including a price on this site you believe is out of
            date — reach us at{" "}
            <a href="mailto:info@japan-travel-kit.com">info@japan-travel-kit.com</a>
          </p>
        </div>

        <p className={styles.meta}>Updated {updated.label} · Published by mjo Inc., Tokyo, Japan</p>
      </div>
    </>
  );
}
