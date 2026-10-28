import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import CityGuideIndex from "../../../components/CityGuideIndex";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import {
  kyotoHighlightBusTour,
  kyotoNaraArashiyamaTour,
  arashiyamaNaraTodaijiTour,
} from "../../../lib/klook-links";
import GygCompare from "../../../components/GygCompare";
import { gygKyoto, gygKyotoDayTrips } from "../../../lib/gyg-links";

// Kyoto pass and single-fare figures are the ones our Kyoto Subway & Bus Pass guide verified
// against the city's own tables. Temple admissions are deliberately absent: Kinkaku-ji has a
// price revision posted on its own site as of this date, so no figure here would be reliable.
const CHECKED = "19 October 2026";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const faqItems = [
  {
    q: "Do I need to book anything in advance for Kyoto?",
    a: "Far less than for Tokyo, and that changes how you plan. Kyoto's headline sights — Fushimi Inari, Kiyomizu-dera, Kinkaku-ji, the Arashiyama bamboo grove, Gion, Nishiki Market — are walk-in temples, shrines, streets and markets with no timed entry to reserve. The things worth booking are the experiences that need a slot and a person: a kimono dressing appointment, a tea ceremony session, a guided day that covers several districts.",
  },
  {
    q: "What should I actually plan, then?",
    a: `The route and the transport. Kyoto's famous sights sit on opposite sides of the city — Kinkaku-ji in the north, Kiyomizu-dera and Gion in the east, Arashiyama in the west — and most are reached by bus rather than subway. That is why the Subway & Bus 1-Day Pass at ¥1,100 for an adult and ¥550 for a child is the decision that actually matters: with a flat city-bus fare of ¥230 and subway fares from ¥210, about five rides break even, and a full temple day clears that by mid-afternoon. Figures checked ${CHECKED}.`,
  },
  {
    q: "How many days do I need in Kyoto?",
    a: "Two to three, split by geography rather than by theme. One day for eastern Kyoto — Kiyomizu-dera, the lanes up to the gate, Gion — one for Arashiyama in the west and Kinkaku-ji in the north, and Fushimi Inari slotted in early or after dark when the gate paths are quiet. Kyoto also works as a base for Nara, which is under an hour away, so budget a fourth day if the deer appeal.",
  },
  {
    q: "Is Fushimi Inari free, and when should I go?",
    a: "Yes — Fushimi Inari Taisha charges no admission and the mountain paths are open around the clock, which is exactly why it is the one sight where timing beats planning. The Senbon Torii gates fill up by mid-morning. Go at first light or after dark and you get the same shrine with a fraction of the people, at no cost and with no booking.",
  },
  {
    q: "Is a guided Kyoto day tour worth it?",
    a: "It buys you the one thing Kyoto makes awkward: getting between districts. A guided day that strings Kinkaku-ji, Kiyomizu-dera, Fushimi Inari and Arashiyama together removes four bus-route decisions from your morning, and that is a real saving on a first visit with two days in the city. If you have more time, or are happy reading a bus map, the pass and your own feet do the same job for less.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/things-to-do-kyoto") } });

export default function ThingsToDoKyotoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Things to Do in Kyoto (2026): Temples, Timing and Booking</title>
        <meta
          name="description"
          content="Things to do in Kyoto in 2026: almost nothing needs booking, so the plan is the route. How the districts fit together, and why the ¥1,100 day pass matters."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/things-to-do-kyoto" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Things to Do in Kyoto (2026): Temples, Timing and What to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/things-to-do-kyoto" />
        <meta property="og:description" content="Things to do in Kyoto in 2026: almost nothing needs booking, so the plan is the route. How the districts fit together, and why the ¥1,100 day pass matters." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Things to Do in Kyoto (2026): Temples, Timing and What to Book" />
        <meta name="twitter:description" content="Things to do in Kyoto in 2026: almost nothing needs booking, so the plan is the route. How the districts fit together, and why the ¥1,100 day pass matters." />
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
              route: "/guides/attractions/things-to-do-kyoto",
              headline: "Things to Do in Kyoto (2026): Temples, Timing and What to Book",
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
                { "@type": "ListItem", position: 4, name: "Things to Do in Kyoto", item: "https://www.japan-travel-kit.com/guides/attractions/things-to-do-kyoto" },
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
          <span className={styles.breadCurrent}>Things to Do in Kyoto</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Things to Do in Kyoto (2026):<br />Temples, Timing &amp; What to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Kyoto needs almost no reservations. What it needs is a route: the famous sights sit on opposite
            edges of a city you cross by bus, and that is where a day costs or saves you.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Route over tickets", "Day-pass break-even"].map((t) => (
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
          <h2 className={styles.sectionTitle}>In Kyoto, the Planning Is the Route</h2>
          <p className={styles.bodyText}>
            Kyoto is the opposite of Tokyo to plan. Almost nothing here needs a reservation: Fushimi Inari,
            Kiyomizu-dera, Kinkaku-ji, the Arashiyama bamboo grove, Gion, Nishiki Market — they are temples,
            shrines, streets and markets you walk into. What Kyoto does instead is spread those sights across
            opposite edges of a city whose useful network is buses rather than subway, which makes the order
            you visit them in the decision that costs or saves you a day.
          </p>
          <p className={styles.bodyText}>
            So this page is about geography and timing, with the two things actually worth booking — a kimono
            appointment and a tea ceremony — called out separately. One rule overrides the rest: Kyoto&apos;s
            famous spots fill by mid-morning, so front-load them and save the backstreets and markets for the
            middle of the day.
          </p>
        </section>

        {/* The pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The one purchase</span>
          <h2 className={styles.sectionTitle}>Buy the Day Pass, Not the Tickets</h2>
          <p className={styles.bodyText}>
            Kinkaku-ji is in the north, Kiyomizu-dera and Gion in the east, Arashiyama in the west, and the
            bus is how you join them up. The Subway &amp; Bus 1-Day Pass is ¥1,100 for an adult and ¥550 for a
            child; against a flat city-bus fare of ¥230 and subway fares from ¥210, roughly five rides break
            even, which a temple day reaches by mid-afternoon. Our{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass" style={linkStyle}>Kyoto Subway &amp; Bus Pass guide</Link>{" "}
            works the break-even properly and explains why the ¥700 bus pass older guides still recommend no
            longer exists. Figures checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            For how the two subway lines and the sightseeing bus routes fit together, see{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>getting around Kyoto</Link>.
          </p>
        </section>

        {/* Shrines & temples */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shrines &amp; temples</span>
          <h2 className={styles.sectionTitle}>Fushimi Inari &amp; Kiyomizu-dera</h2>
          <p className={styles.bodyText}>
            <strong>Fushimi Inari Taisha</strong> is Kyoto&apos;s most photographed sight — thousands of vermilion
            torii gates winding up a wooded mountain. It&apos;s free and open 24 hours, so go early or after dark
            to beat the crowds along the Senbon Torii. Across town, <strong>Kiyomizu-dera</strong> is a
            UNESCO-listed temple famous for its great wooden terrace projecting over the hillside, with sweeping
            views back across the city and atmospheric lanes leading up to the gate.
          </p>
        </section>

        {/* Arashiyama & Kinkaku-ji */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>West &amp; north</span>
          <h2 className={styles.sectionTitle}>Arashiyama &amp; the Golden Pavilion</h2>
          <p className={styles.bodyText}>
            In the west, <strong>Arashiyama</strong> pairs its towering bamboo grove with the Zen temple and
            celebrated garden of <strong>Tenryu-ji</strong>, plus riverside walks and a scenic setting that&apos;s
            especially lovely in autumn. To the north, <strong>Kinkaku-ji</strong> — the Golden Pavilion — is a
            gold-leaf-covered hall mirrored in its reflecting pond, one of the most iconic images of Japan and an
            easy pairing with a temple-focused day.
          </p>
        </section>

        {/* Gion & culture */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Old Kyoto</span>
          <h2 className={styles.sectionTitle}>Gion, Nishiki Market &amp; Cultural Experiences</h2>
          <p className={styles.bodyText}>
            <strong>Gion</strong> is Kyoto&apos;s historic geisha district, a maze of wooden machiya, teahouses,
            and lantern-lit lanes where you may glimpse a geiko or maiko heading to an appointment (always observe
            respectfully). The covered <strong>Nishiki Market</strong> — &ldquo;Kyoto&apos;s kitchen&rdquo; — is
            the place to graze on local specialities. Kyoto is also the best city for traditional experiences:
            slip into a{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>kimono rental</Link> to wander
            the old streets, or sit down for a{" "}
            <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>Japanese tea ceremony</Link>{" "}
            built around Uji matcha.
          </p>
        </section>

        {/* Day trips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Beyond the city</span>
          <h2 className={styles.sectionTitle}>Nara, and the Longer Day to Hiroshima</h2>
          <p className={styles.bodyText}>
            Kyoto makes an excellent base. Under an hour away, <strong>Nara</strong> gives you free-roaming
            deer in a park that costs nothing and the Great Buddha at Todai-ji for ¥800 — our{" "}
            <Link href="/guides/attractions/nara-day-trip" style={linkStyle}>Nara day trip guide</Link> covers
            the train and what the admission actually buys, and our{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={linkStyle}>Kyoto and Nara day tour comparison</Link>{" "}
            sorts the guided itineraries if you would rather have both in one booking.
          </p>
          <p className={styles.bodyText}>
            The ambitious option is{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" style={linkStyle}>Hiroshima and Miyajima</Link>,
            about 100 to 120 minutes away by shinkansen. It is doable in a day from Kyoto, but only as the
            whole day — and if you hold a rail pass, mind that it covers Hikari and Sakura services but not
            Nozomi. Osaka is the other obvious neighbour; our{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>Osaka round-up</Link> covers
            where a pass pays there.
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
          heading="The Kyoto Day, Booked in One Go"
          intro="Guided days that join the districts the buses make awkward, including the versions that add Nara. Open a listing for the current price on your date."
          tours={[kyotoHighlightBusTour, kyotoNaraArashiyamaTour, arashiyamaNaraTodaijiTour]}
        />

        {/* A second catalogue for the same city. Nothing above is changed, and no temple
            admission appears here either — see the note on prices at the top of the file. */}
        <GygCompare
          slug="things-to-do-kyoto"
          heading="A Second Catalogue for the Same City"
          intro="Kyoto is the city where the thing you want is most likely to be full — tea ceremonies seat a handful at a time, kimono shops run out of dressers, and the Arashiyama coaches fill in autumn. GetYourGuide's Kyoto catalogue is the other place to search your dates."
          listings={[gygKyoto, gygKyotoDayTrips]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/japan-matcha-experiences" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h13v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
                  <path d="M17 11h2a2 2 0 0 1 0 4h-2" />
                  <path d="M6 6c0-1 1-1.5 1-2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Matcha Experiences in Japan (2026): Uji, Kyoto and Tokyo Tea Houses Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sagano-romantic-train-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sagano Romantic Train Tickets (2026): Prices, Seats &amp; When It Runs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4 4 4-3 3v11H7V10L4 7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Which Area, What&apos;s Included, When to Return</p>
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
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M12 7v14" />
                  <path d="M8 3L5 9v8a2 2 0 0 0 2 2M16 3l3 6v8a2 2 0 0 1-2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan (2026): Kyoto vs Asakusa and How Booking Works</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                  <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
                  <path d="M7 3v2M11 3v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tea Ceremony in Japan (2026): What Actually Happens, and Where to Book</p>
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
            <Link href="/guides/transport/kyoto-subway-bus-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Subway &amp; Bus Pass (2026): Is the ¥1,100 Day Pass Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Subway &amp; IC Cards</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Every guide for this city, generated from the `city` field in lib/guides-*.ts. */}
        <CityGuideIndex city="kyoto" exclude="/guides/attractions/things-to-do-kyoto" />
      </div>
    </>
  );
}
