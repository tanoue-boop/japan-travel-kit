import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tippingTripPrep } from "../../../lib/klook-links";
import { EsimCtaBottom } from "../../../components/EsimCta";

const PLAIN_REL = "noopener noreferrer nofollow";

/**
 * Restored 14 Nov 2026 (task-jtk-20261114-03). This URL was a 301 to cash-vs-card-japan from
 * the September 2026 merge, but GSC for 10/14–11/10 still showed 18 impressions at an average
 * position of 10.4 for it. cash-vs-card-japan answers how to pay; this page answers whether to
 * tip, situation by situation, and what appears on the bill instead.
 *
 * Read on 14 Nov 2026:
 *   japan.travel/en/plan/tipping-in-japan/   not common to tip in bars, cafes, restaurants, taxis
 *                                     and hotels; kokorozuke custom; a private guide or interpreter
 *                                     accustomed to overseas practices may accept a tip; not expected
 *                                     and discreet even then; in an envelope, sold at convenience
 *                                     stores, stationery stores and 100 yen stores.
 *   japan.travel/en/faq/              "Is there a tipping culture in Japan? No."
 *   faq.japan-travel.jnto.go.jp/en/plan/getting-around/taxis/  taxi drivers do not expect or accept
 *                                     tips; fixed / flat-rate fares from Narita and Haneda.
 *   japan.travel/en/in/accommodation/ 10% consumption tax on accommodation; first class hotels may
 *                                     impose a 10 to 15% service charge; tipping not customary except
 *                                     at top luxury ryokan, to the maid who first serves tea.
 *   japan.travel/en/us/blog/table-manners-in-japan/  not rude to pay without a tip; service charge
 *                                     usually included in a bill; extra is OK but some refuse it.
 *   japan.travel/en/ca/etiquette/     izakaya: late-night surcharge at some; otoshi as a cover charge.
 *   japan.travel/en/au/guide/is-japan-expensive/  tip may be politely refused; exceptions include
 *                                     tour guides, interpreters and some innkeepers.
 *   gotokyo.org izakaya guide         otoshi with a seating charge of ¥200–1,000 per person.
 *   gourmet.gotokyo.org/article/95    service charges in most cases already in the bill.
 *   osaka-info.jp manners page        no custom of tips; saying "arigato" is fine.
 * Hair salons are not named on any of these pages, so they have no row of their own.
 */
const CHECKED = checkedLabel("2026-11-14");
const LAST_CHECKED = "2026-11-14";

const situationRows = [
  {
    where: "Anywhere in Japan (the rule)",
    tip: "No",
    instead: "Pay the amount on the bill. A spoken \"arigato\" (thank you) is enough.",
    source: "JNTO, Osaka Convention & Tourism Bureau",
  },
  {
    where: "Restaurants, cafes and bars",
    tip: "No",
    instead: "A service charge is usually already included in the bill.",
    source: "JNTO, GO TOKYO",
  },
  {
    where: "Izakaya (Japanese pubs)",
    tip: "No",
    instead: "Otoshi: a small starter served automatically with a seating charge of ¥200–¥1,000 per person. Some add a late-night surcharge.",
    source: "GO TOKYO, JNTO",
  },
  {
    where: "Taxis",
    tip: "No: drivers do not expect or accept tips",
    instead: "The meter fare. From Narita and Haneda, ask for a fixed or flat-rate fare into Tokyo.",
    source: "JNTO",
  },
  {
    where: "Hotels",
    tip: "No",
    instead: "First-class hotels may add a 10 to 15% service charge; accommodation also carries 10% consumption tax.",
    source: "JNTO",
  },
  {
    where: "Ryokan (Japanese inns)",
    tip: "Optional, not expected",
    instead: "Kokorozuke: at top luxury ryokan only, handed to the staff member who first serves tea in your room, in an envelope.",
    source: "JNTO",
  },
  {
    where: "Private tour guides and interpreters",
    tip: "Not expected; may be accepted",
    instead: "A guide or interpreter used to overseas practice may accept a tip. Give it discreetly, in an envelope.",
    source: "JNTO",
  },
];

const faqItems = [
  {
    q: "Do you tip in Japan?",
    a: `No. JNTO says it is not common to tip in bars, cafes, restaurants, taxis or hotels in Japan, and that a service charge is usually included in the bill. The narrow exceptions are a top luxury ryokan and a private guide or interpreter, and even there a tip is not expected. Read on ${CHECKED}.`,
  },
  {
    q: "Is it rude to tip in Japan?",
    a: `Not tipping is never rude: JNTO says it is not rude at all to pay the bill without a tip. Offering extra for very good service is OK on JNTO's own blog, but some staff refuse it, and JNTO's cost guide says a tip may be politely refused. Read on ${CHECKED}.`,
  },
  {
    q: "Do you tip taxi drivers in Japan?",
    a: `No. JNTO's taxi guide says taxi drivers, like other service-industry professionals in Japan, do not expect or accept tips. Pay the meter fare, or ask for a fixed fare from Narita or a flat-rate fare from Haneda into Tokyo. Read on ${CHECKED}.`,
  },
  {
    q: "Should you tip tour guides in Japan?",
    a: `It is not expected. JNTO says a private guide or interpreter used to overseas practices may accept a tip as thanks; if you give one, do it discreetly and in an envelope, which convenience stores, stationery stores and 100 yen stores sell. Read on ${CHECKED}.`,
  },
  {
    q: "Do you tip at a ryokan?",
    a: `Usually not. JNTO says tipping is not customary except at top luxury ryokan, where a guest may give the staff member who first serves tea in the room a kokorozuke, a gratuity in an envelope. It is optional. Read on ${CHECKED}.`,
  },
];

const TITLE = "Tipping in Japan 2026: Do You Tip? Restaurant, Taxi & Ryokan";
const DESCRIPTION =
  "Do you tip in Japan? No: JNTO says restaurants, taxis and hotels expect no tip. Tipping in Japan by situation: service charges, izakaya otoshi, ryokan.";
const ROUTE = "/guides/money/tipping-in-japan";
const PAGE_URL = `https://www.japan-travel-kit.com${ROUTE}`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TippingInJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
        />
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
                { "@type": "ListItem", position: 4, name: "Tipping in Japan", item: PAGE_URL },
              ],
            }),
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tipping in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tipping in Japan (2026):<br />Do You Tip at Restaurants, Taxis and Ryokan?
          </h1>
          <p className={styles.heroSubtitle}>
            Situation by situation, what Japan&apos;s national tourism organization says about tips, and what shows
            up on the bill instead.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JNTO and GO TOKYO sources", "7 situations"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            Klook links on this page are affiliate links; we may earn a commission at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer first: the opening paragraph of the body. */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              You do not tip in Japan: the Japan National Tourism Organization (JNTO) says it is not common to tip in
              restaurants, bars, cafes, taxis or hotels, and that taxi drivers do not expect or accept tips. What
              you may see instead is a <strong>service charge</strong>: JNTO says one is usually included in a
              restaurant bill, and first-class hotels may add 10 to 15%. At a ryokan, a <em>kokorozuke</em> (a
              gratuity in an envelope) is optional, and JNTO says tipping is not customary except at top luxury
              ryokan. Read on {CHECKED}.
            </p>
          </div>
        </div>

        {/* 1. The situation table. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By situation</span>
          <h2 className={styles.sectionTitle}>Do You Tip in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            No, in every everyday situation. The only places a tip comes up at all are a top luxury ryokan and a
            private guide or interpreter, and even there it is not expected.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Situation", "Tip?", "What happens instead", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {situationRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.tip}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.instead}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {LAST_CHECKED}. Sources:{" "}
            <a href="https://www.japan.travel/en/plan/tipping-in-japan/" target="_blank" rel={PLAIN_REL}>JNTO, Tipping</a>,{" "}
            <a href="https://faq.japan-travel.jnto.go.jp/en/plan/getting-around/taxis/" target="_blank" rel={PLAIN_REL}>JNTO, Taxis in Japan</a>,{" "}
            <a href="https://www.japan.travel/en/in/accommodation/" target="_blank" rel={PLAIN_REL}>JNTO, Accommodation</a>,{" "}
            <a href="https://www.japan.travel/en/us/blog/table-manners-in-japan/" target="_blank" rel={PLAIN_REL}>JNTO, Table manners</a>,{" "}
            <a href="https://www.japan.travel/en/ca/etiquette/" target="_blank" rel={PLAIN_REL}>JNTO, Etiquette</a>,{" "}
            <a href="https://www.gotokyo.org/en/story/guide/pub-grub-decoded-a-guide-to-japanese-izakaya/index.html" target="_blank" rel={PLAIN_REL}>GO TOKYO, izakaya guide</a>{" "}
            and{" "}
            <a href="https://osaka-info.jp/en/information/to-tourist/the-dos-and-donts-of-manner/index.html" target="_blank" rel={PLAIN_REL}>Osaka Convention &amp; Tourism Bureau</a>.
          </p>
        </section>

        {/* Rude or not. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Etiquette</span>
          <h2 className={styles.sectionTitle}>Is It Rude to Tip in Japan?</h2>
          <p className={styles.bodyText}>
            Not tipping is never rude: JNTO&apos;s own blog says it is not rude at all to pay the bill without a tip.
            Offering a tip is not an offence either, but it often does not land: JNTO says paying extra for very good
            service is OK yet some staff refuse it, and its cost guide adds that a tip may be politely refused.
          </p>
          <p className={styles.bodyText}>
            The thanks that works everywhere costs nothing: the Osaka Convention &amp; Tourism Bureau says that after
            a bar, restaurant or taxi, simply saying &ldquo;arigato&rdquo; is fine.
          </p>
        </section>

        {/* Service charges. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On the bill</span>
          <h2 className={styles.sectionTitle}>What Is the Service Charge on Japanese Restaurant Bills?</h2>
          <p className={styles.bodyText}>
            It is usually already in the price: JNTO and GO TOKYO both say a service charge is in most cases included
            in the bill, so there is nothing to add at the table. Neither publishes a standard restaurant percentage.
          </p>
          <p className={styles.bodyText}>
            Two other charges are worth knowing. At an izakaya, the <em>otoshi</em> is a small
            dish that arrives automatically with a seating charge of ¥200–¥1,000 per person (GO TOKYO), and JNTO
            notes some izakaya add a late-night surcharge. At hotels, JNTO says first-class hotels may add a 10 to
            15% service charge, and accommodation carries 10% consumption tax. For what a day of meals and rooms
            adds up to, see our{" "}
            <Link href="/guides/money/japan-travel-budget" style={linkStyle}>Japan travel budget per day</Link>.
          </p>
          <p className={styles.bodyText}>
            Whether that bill is paid by card or in yen is the other question at the till, and our{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={linkStyle}>cash vs card in Japan</Link> guide sets
            out, place by place, what each one takes.
          </p>
        </section>

        {/* Taxis. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Taxis</span>
          <h2 className={styles.sectionTitle}>Do You Tip Taxi Drivers in Japan?</h2>
          <p className={styles.bodyText}>
            No. JNTO&apos;s taxi guide says taxi drivers, like other service-industry professionals in Japan, do not
            expect or accept tips; you pay the meter. From Narita, JNTO suggests asking for a fixed fare to your
            destination, and Haneda offers flat-rate fares to most of Tokyo.
          </p>
        </section>

        {/* Tour guides. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tours</span>
          <h2 className={styles.sectionTitle}>Should You Tip Tour Guides in Japan?</h2>
          <p className={styles.bodyText}>
            It is not expected. JNTO says a private guide or interpreter used to overseas practices may accept a
            tip as thanks, and lists tour guides among the exceptions to the no-tipping rule. If you give one, do it
            discreetly and in an envelope; JNTO says small cash envelopes are sold at convenience stores, stationery
            stores and 100 yen stores.
          </p>
          <p className={styles.bodyText}>
            On a booked group tour, the listing is where to look: it says what the price covers, such as tastings,
            drinks or admissions, which is the part of the cost an answer about tipping does not settle.
          </p>
        </section>

        {/* Ryokan. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Ryokan</span>
          <h2 className={styles.sectionTitle}>Do You Tip at a Ryokan?</h2>
          <p className={styles.bodyText}>
            Usually not. JNTO says tipping is not customary except at top luxury ryokan, where a guest may give the
            staff member who first serves tea in the room a <em>kokorozuke</em>, a gratuity &ldquo;from the
            heart&rdquo;, in an envelope. It is optional, and JNTO gives no amount.
          </p>
          <p className={styles.bodyText}>
            What does decide a ryokan bill is the plan you book, so read the plan for which meals it includes
            before you pay.
          </p>
        </section>

        <KlookTripPrep
          label="Book before you land"
          heading="What to Settle Before You Fly, Instead of a Tip"
          intro="With no tip to work out, what you pay on the day comes down to what you booked: what a guided tour includes, whether the ryokan plan has dinner, and how you get in from the airport. These are the bookings to make before the flight."
          items={tippingTripPrep}
        />

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Tipping in Japan FAQ</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/money/japan-travel-budget", title: "Japan Travel Budget 2026: Cost per Day" },
              { href: "/guides/money/cash-vs-card-japan", title: "Cash vs Card in Japan (2026)" },
              { href: "/guides/money/tokyo-trip-cost", title: "Trip to Tokyo Cost (2026)" },
              { href: "/guides/money/how-much-yen-to-bring-japan", title: "How Much Yen to Bring to Japan" },
              { href: "/guides/money", title: "All Japan Money & Payment Guides →" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
