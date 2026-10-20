import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  kyotoNaraArashiyamaTour,
  arashiyamaNaraTodaijiTour,
  kyotoNaraKiyomizuTour,
  kyotoNaraUjiTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Tour contents and durations are as the Klook listings describe them; Todai-ji figures are from
// todaiji.or.jp. Both checked 19 Oct 2026.
const CHECKED = "19 October 2026";

const tourRows = [
  {
    tour: "Sagano railway, Nara Park & Fushimi Inari",
    covers: "Arashiyama with the Sagano scenic railway, the bamboo grove, Nara Park deer and the Fushimi Inari torii gates",
    length: "Full day from Osaka",
    best: "The scenic railway, which the other tours skip",
    url: kyotoNaraArashiyamaTour.url,
  },
  {
    tour: "Arashiyama, Kinkaku-ji & Nara Todai-ji",
    covers: "Arashiyama, the Golden Pavilion and the Great Buddha Hall at Todai-ji, with an English-speaking guide",
    length: "Listed at 8 hr 55 min – 9 hr 05 min",
    best: "The one that actually goes inside Todai-ji",
    url: arashiyamaNaraTodaijiTour.url,
  },
  {
    tour: "Kiyomizu-dera, Fushimi Inari & Nara Park",
    covers: "The eastern Kyoto temple district paired with Fushimi Inari and Nara Park",
    length: "Full day, departs Osaka or Kyoto",
    best: "Temples over gardens; flexible departure city",
    url: kyotoNaraKiyomizuTour.url,
  },
  {
    tour: "Kyoto, Nara & Uji world heritage",
    covers: "Adds Uji — Byodo-in and the matcha street — to Nara Park and Fushimi Inari",
    length: "Full day from Osaka",
    best: "Three cities in one day",
    url: kyotoNaraUjiTour.url,
  },
];

const todaijiRows = [
  { ticket: "Daibutsuden (Great Buddha Hall), adult", price: "¥800" },
  { ticket: "Daibutsuden, ages 6–12", price: "¥400" },
  { ticket: "Combined pass: Daibutsuden + Museum, adult", price: "¥1,200" },
  { ticket: "Combined pass, ages 6–12", price: "¥600" },
];

const whoFor = [
  {
    title: "Take the tour if…",
    desc: "You have one day and want Kyoto and Nara both in it. Doing that independently from Osaka means two separate rail trips on two different operators, plus local buses at each end. A coach tour removes all of that and the guiding comes with it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="11" rx="2" />
        <circle cx="7.5" cy="18.5" r="1.5" />
        <circle cx="16.5" cy="18.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Go independently if…",
    desc: "You would rather do one city properly. Kyoto alone fills several days and Nara is a comfortable half-day from Osaka on the Kintetsu or JR Nara lines. Two cities in nine hours is a highlights reel, and it is honest to say so.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
  {
    title: "Check what the entry fees cover…",
    desc: "Tours differ on whether temple admissions are included. Todai-ji's Great Buddha Hall is ¥800 for an adult, and Kinkaku-ji and Kiyomizu-dera charge separately too. A cheaper tour that excludes them is not necessarily cheaper.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M7 7V5a5 5 0 0 1 10 0v2" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide which Kyoto you want",
    desc: "The tours split roughly into an Arashiyama itinerary — bamboo grove, the Sagano scenic railway, sometimes Kinkaku-ji — and an eastern-Kyoto one around Kiyomizu-dera. Both usually finish at Fushimi Inari. Pick the half of Kyoto you would rather see, because you will not get both.",
  },
  {
    title: "Check whether the tour enters Todai-ji",
    desc: `Nara Park is free to walk through and the deer are the photograph most people come for, but the Great Buddha itself sits inside the Daibutsuden, which charges ¥800 for an adult and ¥400 for ages 6–12. Some tours include that admission, some stop at the park. Prices checked ${CHECKED}.`,
  },
  {
    title: "Mind the Daibutsuden's closing time",
    desc: `The Great Buddha Hall closes at 17:30 from April to October and at 17:00 from November to March. A late-running tour on a short winter day can arrive after the doors shut, which is worth asking about if Todai-ji is your reason for going. Checked ${CHECKED}.`,
  },
  {
    title: "Confirm the departure point and the length of the day",
    desc: "These are long days — one of the listings we checked runs 8 hr 55 min to 9 hr 05 min — and most depart from central Osaka in the morning. Several also allow a Kyoto departure, which is worth taking if you are already staying there.",
  },
  {
    title: "Book in English on a card that works",
    desc: "Klook checks out in English and takes foreign cards, and the listings carry the itinerary in full so you can see which stops and admissions are included before you pay.",
  },
];

const faqItems = [
  {
    q: "Can you do Kyoto and Nara in one day from Osaka?",
    a: "On a tour, yes — and that is largely what these tours exist for. Osaka sits between the two, so a coach can take in a slice of Kyoto and Nara Park in a single day of around nine hours. Doing it independently is harder than it looks: Kyoto and Nara are on different railway lines from Osaka, and you would be making two separate out-and-back trips with local buses at each end. What you cannot do in one day is see either city properly.",
  },
  {
    q: "How long is a Kyoto and Nara day tour from Osaka?",
    a: `Expect a full day. One of the listings we checked is given as 8 hr 55 min to 9 hr 05 min, and the others describe a full-day itinerary departing central Osaka in the morning. Several offer a Kyoto departure as an alternative, which saves an hour or so if you are already staying in Kyoto. Durations as listed on ${CHECKED}.`,
  },
  {
    q: "How much is admission to Todai-ji in Nara?",
    a: `The Great Buddha Hall (Daibutsuden) is ¥800 for an adult and ¥400 for ages 6–12. A combined pass covering the Daibutsuden and the Todaiji Museum is ¥1,200 for an adult and ¥600 for ages 6–12. Groups of 30 or more pay less. Nara Park itself, including the deer, is free to walk through. Prices read off Todai-ji's official site on ${CHECKED}.`,
  },
  {
    q: "What are Todai-ji's opening hours?",
    a: `The Great Buddha Hall is open 7:30–17:30 from April to October and 8:00–17:00 from November to March. The Todaiji Museum runs 9:30–17:30 with last admission at 17:00 in the April–October period, and 9:30–17:00 with last admission at 16:30 from November to March. Hokke-do and Senju-do keep 8:30–16:00 year round. Checked ${CHECKED}.`,
  },
  {
    q: "Which Kyoto and Nara tour should I pick?",
    a: "If you want the Sagano scenic railway through the Hozugawa valley, only one of these itineraries includes it. If seeing the Great Buddha matters more than the gardens, take the tour that goes into Todai-ji and Kinkaku-ji. If you would rather have eastern Kyoto — Kiyomizu-dera and the approach streets — there is an itinerary built around that instead. And if you want to add Uji, with Byodo-in and the matcha street, the three-city tour covers it at the cost of less time anywhere.",
  },
  {
    q: "Are temple entry fees included in these tours?",
    a: "It varies by listing, and it is the detail most worth checking before you compare prices. Fushimi Inari and Nara Park are free, so no tour charges for them. Todai-ji's Great Buddha Hall (¥800 adult), Kinkaku-ji and Kiyomizu-dera all have their own admissions, and some tours include them while others leave you to pay at the gate. Read the inclusions on the listing rather than assuming.",
  },
  {
    q: "Do I need a JR Pass for a Kyoto and Nara day tour?",
    a: "No. These are coach tours and the transport is in the price, so a rail pass buys you nothing on the day. A pass is a question about the rest of your trip — the long-distance legs between cities — not about this. If you are deciding, our JR Pass guide notes that a Kansai-only itinerary rarely justifies one.",
  },
  {
    q: "Is Nara worth visiting at all?",
    a: "Yes, and it is one of the better-value stops in Kansai: the park is free, the deer are genuinely a spectacle, and Todai-ji's Great Buddha Hall is one of the largest wooden buildings in the world for ¥800. If you would rather not spend the day on a coach, Nara is an easy half-day from Osaka on its own — the Kintetsu and JR Nara lines both run there, and an IC card covers the fare.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/kyoto-nara-day-tour-from-osaka") },
});

const TITLE = "Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book";
const DESC =
  "Comparing Kyoto and Nara day tours from Osaka for 2026: what each itinerary covers, how long the day runs, Todai-ji's official admission and hours, and which temple fees are extra.";

export default function KyotoNaraDayTourFromOsakaPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kyoto-nara-day-tour-from-osaka" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kyoto-nara-day-tour-from-osaka" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: TITLE,
              dateModified: updated.iso,
              author: { "@type": "Organization", name: "Japan Travel Kit", url: "https://www.japan-travel-kit.com" },
              publisher: { "@type": "Organization", name: "Japan Travel Kit", url: "https://www.japan-travel-kit.com" },
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Kyoto and Nara Day Tour From Osaka",
                  item: "https://www.japan-travel-kit.com/guides/attractions/kyoto-nara-day-tour-from-osaka",
                },
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
          <span className={styles.breadCurrent}>Kyoto &amp; Nara Day Tour From Osaka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Kyoto and Nara Day Tour From Osaka (2026):<br />Which Itinerary to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Osaka sits between both cities, which is why the day works at all. The tours differ on which half
            of Kyoto you get — and on whether the temple admissions are in the price.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Four itineraries compared", "Official Todai-ji prices"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day length</p>
                <p className={styles.verdictStatValue}>About 9 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Usual finish</p>
                <p className={styles.verdictStatValue}>Fushimi Inari</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Todai-ji entry</p>
                <p className={styles.verdictStatValue}>¥800 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nara Park</p>
                <p className={styles.verdictStatValue}>Free</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> all four itineraries give you a slice of Kyoto plus Nara Park in about
              nine hours. Choose on which Kyoto you want — Arashiyama and the Sagano railway, or eastern Kyoto
              around Kiyomizu-dera — and on whether the tour actually goes inside Todai-ji, where the Great
              Buddha Hall charges ¥800 for an adult.
            </p>
            <a href={kyotoNaraArashiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Kyoto &amp; Nara day tours on Klook →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why This Day Trip Works From Osaka</h2>
          <p className={styles.bodyText}>
            Osaka is the awkward middle of Kansai, and for once that is an advantage. Kyoto is about half an
            hour north and Nara about forty minutes east, on different railway lines — which means a day trip
            that visits both is two out-and-back journeys if you do it yourself, and one loop if a coach does
            it.
          </p>
          <p className={styles.bodyText}>
            That is the honest case for taking a tour here. The honest case against it is that neither city gets
            more than a few hours, and both deserve more. If you have the days, see them separately; if you have
            one day and want to have seen both, this is how.
          </p>
        </section>

        {/* Tour comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Four Kyoto &amp; Nara Itineraries</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "What it covers", "Length", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <a href={row.url} target="_blank" rel="sponsored noopener" className={styles.tdLink}>
                          {row.tour}
                        </a>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Contents and durations are as the Klook listings described them on {CHECKED}. We do not quote prices
            here: Klook blocks automated reads of its product pages, so there is no figure we could have
            verified — open a listing for the current price on your date.
          </p>
        </section>

        {/* Todai-ji admission */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Entry fees</span>
          <h2 className={styles.sectionTitle}>What Todai-ji Costs if the Tour Does Not Include It</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Nara Park is free and the deer cost nothing to look at, but the Great Buddha is inside a building
            with a ticket desk. These are Todai-ji&apos;s own published rates.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {todaijiRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Hours matter as much as price on a tour day: the Great Buddha Hall closes at 17:30 from April to
            October and at 17:00 from November to March. On a short winter day, a tour that reaches Nara late
            can arrive after the doors have shut — worth asking about if Todai-ji is the reason you are going.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off Todai-ji&apos;s official site on {CHECKED}. Subject to change — confirm before you go.
          </p>
        </section>

        {/* Who for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Tour or not</span>
          <h2 className={styles.sectionTitle}>Should You Take the Tour at All?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            If you decide to go under your own steam, our guides to{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka</Link> and{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto</Link> cover the lines and
            passes, and <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto</Link> handles the long leg
            if you are coming from further east. For the Osaka Metro rides at either end of the day, the{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro Pass price breakdown</Link> shows whether a
            day pass beats paying per ride.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Pick and Book</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Weighing a rail pass for the wider trip? The{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works through the break-even, and
            notes that a Kansai-only itinerary rarely justifies one.
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
          heading="The Itineraries Compared Above"
          intro="All four depart Osaka and pair a slice of Kyoto with Nara Park. Open a listing to check the price, the departure point and which admissions are included."
          tours={[kyotoNaraArashiyamaTour, arashiyamaNaraTodaijiTour, kyotoNaraKiyomizuTour, kyotoNaraUjiTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="11" rx="2" />
                  <circle cx="7.5" cy="18.5" r="1.5" />
                  <circle cx="16.5" cy="18.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <path d="M6 20l2-4M18 20l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two cities, one coach, nine hours</h2>
            <p className={styles.ctaBannerDesc}>
              Pick the itinerary that covers the half of Kyoto you want, and check whether Todai-ji&apos;s ¥800
              admission is in the price. Klook checks out in English and takes foreign cards.
            </p>
            <a href={kyotoNaraArashiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Kyoto &amp; Nara day tours on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
