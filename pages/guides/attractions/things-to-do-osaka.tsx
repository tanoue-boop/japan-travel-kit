import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import CityGuideIndex from "../../../components/CityGuideIndex";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { osakaAmazingPass, kyotoNaraArashiyamaTour } from "../../../lib/klook-links";
import GygCompare from "../../../components/GygCompare";
import { gygNaraFromOsaka, gygOsaka } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";

// Osaka Amazing Pass prices read off the official site, osp.osaka-info.jp, on 19 Oct 2026.
// Individual attraction admissions are deliberately absent — most of the included venues
// price by date, so a fixed figure would be wrong as often as right.
const CHECKED = "19 October 2026";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const faqItems = [
  {
    q: "Is the Osaka Amazing Pass worth it?",
    a: `For a day of city sightseeing, usually yes — Osaka rewards a pass more than most Japanese cities, because its attractions are cheap individually and spread across a subway network you will use heavily. The pass is ¥2,500 for one day and ¥3,300 for two, and it bundles unlimited Osaka Metro and city buses with free admission to more than 40 facilities, including Osaka Castle, the Umeda Sky Building observatory, Tsutenkaku and the river cruises. Three or four of those in a day, plus the transport, clears ¥2,500 comfortably. Prices read off the official site on ${CHECKED}.`,
  },
  {
    q: "What does the Osaka Amazing Pass not cover?",
    a: "The two attractions most visitors assume it does: Universal Studios Japan and the Osaka Aquarium Kaiyukan. Neither is included, and both are among the most expensive things to do in the city, so a trip built around them gets no help from the pass at all. That is the single most useful thing to know before buying — see our Osaka Amazing Pass guide for the full inclusion list.",
  },
  {
    q: "How many days do I need in Osaka?",
    a: "Two, and they divide cleanly. One day for the city — Osaka Castle, Dotonbori, Shinsekai and the markets — which is the day the Amazing Pass earns its price. One day for a big single attraction: Universal Studios Japan or the Kaiyukan, neither of which the pass covers, so leave it unused that day rather than buying a 2-day version you half-waste. Add a third for Nara if the deer appeal.",
  },
  {
    q: "What should I eat in Osaka?",
    a: "Osaka is Japan's street-food capital, and Dotonbori is where to graze: takoyaki and okonomiyaki are the local icons, with kushikatsu skewers the speciality of Shinsekai. The Kuromon Ichiba market and the streets around Namba are the places to work through it at your own pace. None of this needs booking — it is the opposite of a timed-entry city.",
  },
  {
    q: "Is Osaka a good base for the rest of Kansai?",
    a: "It is the best one, mainly because of what is reachable in under an hour. Nara is a short train ride for the deer park and Todai-ji; Kyoto is close enough that most guided Kyoto day tours offer an Osaka departure; Hiroshima and Miyajima are about 90 minutes by shinkansen. Hotel rates in Osaka also tend to compare well with Kyoto in peak season.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/things-to-do-osaka") } });

export default function ThingsToDoOsakaPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Things to Do in Osaka (2026): Where the Pass Pays &amp; Where It Doesn&apos;t | Japan Travel Kit</title>
        <meta
          name="description"
          content="Things to do in Osaka in 2026: the Amazing Pass at ¥2,500 a day covers Osaka Castle, the Umeda Sky deck and the river cruise — but not Universal Studios Japan or the Kaiyukan. How to split the days around that."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/things-to-do-osaka" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn't" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/things-to-do-osaka" />
        <meta property="og:description" content="Things to do in Osaka in 2026: the Amazing Pass at ¥2,500 a day covers Osaka Castle, the Umeda Sky deck and the river cruise — but not Universal Studios Japan or the Kaiyukan. How to split the days around that." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn't" />
        <meta name="twitter:description" content="Things to do in Osaka in 2026: the Amazing Pass at ¥2,500 a day covers Osaka Castle, the Umeda Sky deck and the river cruise — but not Universal Studios Japan or the Kaiyukan. How to split the days around that." />
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
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/things-to-do-osaka",
              headline: "Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn't",
              updated,
            }),
          }}
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
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Things to Do in Osaka", item: "https://www.japan-travel-kit.com/guides/attractions/things-to-do-osaka" },
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Things to Do in Osaka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Things to Do in Osaka (2026):<br />Where the Pass Pays &amp; Where It Doesn&apos;t
          </h1>
          <p className={styles.heroSubtitle}>
            Osaka is the one Japanese city where a sightseeing pass genuinely pays — with two large
            exceptions that happen to be the reasons most people come.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official pass prices", "What's excluded"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Osaka Is a Pass City, With One Big Exception</h2>
          <p className={styles.bodyText}>
            Osaka is unusual among Japanese cities in that a sightseeing pass genuinely pays. Its attractions
            are individually cheap, there are a lot of them, and they are scattered across a subway network
            you will ride all day — which is exactly the shape the Osaka Amazing Pass is built for. At ¥2,500
            for one day it covers the transport plus free entry to more than 40 facilities, and three or four
            stops gets you there. Prices checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The exception is the reason most people come. Universal Studios Japan is not on the pass, and
            neither is the Kaiyukan aquarium — the two most expensive things in the city. So the sensible shape
            for an Osaka trip is one pass day for the city and one unpassed day for whichever blockbuster you
            came for.
          </p>
        </section>

        {/* Castle & Dotonbori */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The icons</span>
          <h2 className={styles.sectionTitle}>Osaka Castle &amp; Dotonbori</h2>
          <p className={styles.bodyText}>
            <strong>Osaka Castle</strong> is the city&apos;s landmark — a reconstructed keep in a moated park,
            with a museum inside and city views from the top — and it is one of the headline inclusions on the
            Amazing Pass, so on a pass day it costs you nothing extra. After dark, head to{" "}
            <strong>Dotonbori</strong>, the neon-soaked canal district famous for the running Glico sign and
            wall-to-wall street food. The Tombori River Cruise that runs through it is on the pass too, which
            is the kind of thing that quietly makes the maths work.
          </p>
        </section>

        {/* USJ & Kaiyukan */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Big attractions</span>
          <h2 className={styles.sectionTitle}>Universal Studios Japan &amp; the Kaiyukan</h2>
          <p className={styles.bodyText}>
            <strong>Universal Studios Japan</strong> is the region&apos;s blockbuster theme park, home to Super
            Nintendo World and a roster of major rides — it needs online tickets and, for some areas, timed entry,
            so plan ahead with our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={linkStyle}>USJ tickets &amp; Express Pass guide</Link>.
            On the waterfront, the <strong>Kaiyukan</strong> is one of the world&apos;s great aquariums, built
            around a giant central tank with whale sharks — a superb option for families or a rainy day. Both
            of these are the attractions the Amazing Pass excludes, and both sell their own tickets, so treat
            whichever you choose as its own day and its own budget line.
          </p>
        </section>

        {/* Umeda & Shinsekai */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Views &amp; old Osaka</span>
          <h2 className={styles.sectionTitle}>Umeda Sky Building &amp; Shinsekai</h2>
          <p className={styles.bodyText}>
            For the view, the <strong>Umeda Sky Building</strong>&apos;s Floating Garden Observatory links two
            towers with an open-air rooftop ring high above the north of the city. For a complete change of mood,
            <strong> Shinsekai</strong> is a retro, slightly ramshackle quarter around the <strong>Tsutenkaku</strong>{" "}
            tower, packed with kushikatsu (deep-fried skewer) joints and a nostalgic, mid-century atmosphere. Round
            it off at the <strong>Kuromon Ichiba</strong> market and the buzzing streets of Namba.
          </p>
        </section>

        {/* Passes & day trips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Plan smarter</span>
          <h2 className={styles.sectionTitle}>The Pass, and Three Days Out</h2>
          <p className={styles.bodyText}>
            Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>Osaka Amazing Pass guide</Link>{" "}
            works through the ¥2,500 and ¥3,300 prices against what the 40-plus inclusions are individually
            worth, and lists the exclusions in full. If the pass does not suit your days, our{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>Osaka Metro pass guide</Link>{" "}
            covers the transport-only options and{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>getting around Osaka</Link>{" "}
            covers the Midosuji Line and IC cards.
          </p>
          <p className={styles.bodyText}>
            Osaka is the best base in Kansai for days out.{" "}
            <Link href="/guides/attractions/nara-day-trip" style={linkStyle}>Nara</Link> is barely an hour away
            for the free deer park and Todai-ji&apos;s ¥800 Great Buddha Hall. Most guided{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={linkStyle}>Kyoto and Nara day tours</Link>{" "}
            depart from here, which saves the Kyoto hotel premium in peak season. And{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" style={linkStyle}>Hiroshima and Miyajima</Link>{" "}
            is about 90 minutes by shinkansen — a long day, but a single one.
          </p>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
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

        <KlookTourPicks
          heading="The Osaka Day, Booked"
          intro="The pass that covers the city day, and the guided Kyoto-and-Nara day most visitors take from here. Open a listing for the current price on your date."
          tours={[osakaAmazingPass, kyotoNaraArashiyamaTour]}
        />

        {/* A second catalogue for the same city. The Amazing Pass prices above, read off
            the official site, are unchanged. */}
        <GygCompare
          slug="things-to-do-osaka"
          heading="A Second Catalogue for the Same City"
          intro="Two things on an Osaka trip genuinely sell out: a USJ date, and a seat on the Kyoto-and-Nara coach. GetYourGuide carries both, along with the Dotonbori cruises and the city walking tours — worth searching if a date above has gone. The Amazing Pass is an official city product and stays where it is."
          listings={[gygOsaka, gygNaraFromOsaka]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-4 7-6 11-6 3 0 5 1 7 3-2 2-4 3-7 3-4 0-8-2-11 0z" />
                  <circle cx="15" cy="9" r="0.8" fill="currentColor" stroke="none" />
                  <path d="M3 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Aquarium Kaiyukan Tickets (2026): Prices, Hours and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 0 0 18M3 12h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" />
                  <path d="M9 11h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20h16" />
                  <path d="M7 20V9h10v11" />
                  <path d="M5 9h14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing &amp; What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Metro, IC Cards &amp; Passes</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Every guide for this city, generated from the `city` field in lib/guides-*.ts. */}
        <CityGuideIndex city="osaka" exclude="/guides/attractions/things-to-do-osaka" />
      </div>
    </>
  );
}
