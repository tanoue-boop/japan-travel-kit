import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import CityGuideIndex from "../../../components/CityGuideIndex";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import {
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  skytreeTicket,
  fujiHakoneDayTour,
} from "../../../lib/klook-links";
import GygCompare from "../../../components/GygCompare";
import { gygTokyo, gygTokyoEntryTickets } from "../../../lib/gyg-links";

// The only prices on this page are the two carried over from the dedicated guides that
// verified them against the operators' own sites — Shibuya Sky and Tokyo Skytree. The Tocho
// deck's 202 m height and free admission were read off metro.tokyo.lg.jp. All 19 Oct 2026.
const CHECKED = "19 October 2026";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const bookingRows = [
  {
    thing: "Tokyo Disneyland / DisneySea",
    when: "Weeks ahead",
    why: "Date-specified tickets, no gate sales at all",
  },
  {
    thing: "teamLab Planets / Borderless",
    when: "Days to weeks ahead",
    why: "30-minute timed entry slots that sell out",
  },
  {
    thing: "Shibuya Sky",
    when: "Days ahead for sunset",
    why: "The sunset slots go first; other slots are easier",
  },
  {
    thing: "Warner Bros. Studio Tour",
    when: "Weeks ahead",
    why: "Timed entry, no re-entry, and a four-hour visit",
  },
  {
    thing: "Sumo tournament",
    when: "The day tickets go on sale",
    why: "Only January, May and September in Tokyo",
  },
  {
    thing: "Go-karting",
    when: "Before you leave home",
    why: "Not the booking — the International Driving Permit",
  },
  {
    thing: "Tokyo Skytree, Tokyo Tower",
    when: "Same day is fine",
    why: "Advance online saves a little; capacity is rarely the issue",
  },
  {
    thing: "Tocho free deck, shrines, neighbourhoods",
    when: "Just turn up",
    why: "No ticket exists to book",
  },
];

const faqItems = [
  {
    q: "What actually needs booking ahead in Tokyo?",
    a: "Four things, really: Tokyo Disney (date-specified, no gate sales), the teamLab museums (30-minute timed slots), Shibuya Sky's sunset window, and the Warner Bros. Studio Tour. A sumo tournament counts too, but only if your dates fall in January, May or September. Almost everything else in Tokyo — the Skytree, Tokyo Tower, shrines, neighbourhoods, the free Tocho deck — you can decide on the morning of.",
  },
  {
    q: "Are there free things to do in Tokyo?",
    a: `Yes, and one of them is a genuine rival to the paid decks. The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has an observation room on the 45th floor at 202 metres, free to enter, with the Skytree and Tokyo Tower both in view. Shrines, parks and whole neighbourhoods cost nothing to wander, so the paid list below can stay short. Height and admission read off metro.tokyo.lg.jp on ${CHECKED}.`,
  },
  {
    q: "Why do Tokyo's official ticket sites reject my card?",
    a: "Several Japanese attraction sites run payment pages that do not handle foreign-issued cards cleanly, and Tokyo Disney is the best-known example. This is why a reseller checkout is often the smoother route from abroad even when the official site is theoretically open to you — it is an English checkout that takes a foreign card, rather than a cheaper ticket. Each of our attraction guides says which route works for that specific venue.",
  },
  {
    q: "How many days do I need for Tokyo's attractions?",
    a: "Three to four days is enough to pair two big ticketed attractions — say a theme park and a studio tour — with a deck, one hands-on experience and a day trip out of the city. The order matters more than the number: fix the timed-entry dates first, because they are the only things that cannot move, then fill the gaps with the walk-in sightseeing.",
  },
  {
    q: "What is worth doing as a day trip from Tokyo?",
    a: "Four stand out, and they are genuinely different days. Kamakura is the easiest — under an hour on one JR line, with the open-air Great Buddha and seaside temples. Nikko is a UNESCO shrine plus mountain scenery, two hours north. Hakone is hot springs and a volcanic valley, with one pass covering the whole loop. Lake Kawaguchi is where you go to look at Mt. Fuji. Each has its own guide below.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/things-to-do-tokyo") } });

export default function ThingsToDoTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into | Japan Travel Kit</title>
        <meta
          name="description"
          content="Things to do in Tokyo in 2026, ordered by urgency: the four or five attractions whose timed tickets really do sell out, everything you can decide on over breakfast, and the best free view in the city."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" />
        {hreflangLinks("/guides/attractions/things-to-do-tokyo")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" />
        <meta property="og:description" content="Things to do in Tokyo in 2026, ordered by urgency: the four or five attractions whose timed tickets really do sell out, everything you can decide on over breakfast, and the best free view in the city." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into" />
        <meta name="twitter:description" content="Things to do in Tokyo in 2026, ordered by urgency: the four or five attractions whose timed tickets really do sell out, everything you can decide on over breakfast, and the best free view in the city." />
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
              route: "/guides/attractions/things-to-do-tokyo",
              headline: "Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into",
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
                { "@type": "ListItem", position: 4, name: "Things to Do in Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/things-to-do-tokyo" },
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
          <span className={styles.breadCurrent}>Things to Do in Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Things to Do in Tokyo (2026):<br />What to Book Ahead and What to Walk Into
          </h1>
          <p className={styles.heroSubtitle}>
            Only four or five things in Tokyo genuinely sell out. Here is that short list, how far ahead to
            book each one, and everything else you can decide on over breakfast.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Ordered by urgency", "Official prices"].map((t) => (
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
          <h2 className={styles.sectionTitle}>Most of Tokyo Does Not Need Booking</h2>
          <p className={styles.bodyText}>
            The useful thing to know about Tokyo is how short the list of genuinely time-sensitive attractions
            is. Four or five venues sell date- and time-specified tickets that really do run out, and
            everything else — the Skytree, Tokyo Tower, the shrines, the neighbourhoods, the best free view in
            the city — you can decide on over breakfast. Planning a Tokyo trip is mostly a matter of pinning
            down that short list first.
          </p>
          <p className={styles.bodyText}>
            So this page is ordered by urgency rather than by how famous something is. The table below says
            what to book and when; the sections after it link to the full guide for each, with official prices
            and the booking route that works from abroad.
          </p>
          <p className={styles.bodyText}>
            If you want the money side of that list in one place instead, our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              Japan attraction ticket prices table
            </Link>{" "}
            lists the official adult and child admission for every Tokyo venue below — plus the rest of the
            country — with the date each figure was read off the operator&apos;s own site.
          </p>
        </section>

        {/* Booking urgency */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Book or walk in</span>
          <h2 className={styles.sectionTitle}>What to Reserve, and How Far Ahead</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Attraction", "Book by", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Views from above */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Views from above</span>
          <h2 className={styles.sectionTitle}>Observation Decks</h2>
          <p className={styles.bodyText}>
            <strong>Shibuya Sky</strong> is the open-air rooftop above the Shibuya Scramble Crossing and the
            one deck where the slot matters: ¥2,500 for an adult booked online, ¥3,000 at the door, and the
            sunset window is what sells out. See our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={linkStyle}>Shibuya Sky tickets guide</Link>.{" "}
            <strong>Tokyo Skytree</strong> is the altitude option, from ¥1,800 for Floor 350 —{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets" style={linkStyle}>our guide</Link> explains
            why adding Floor 450 up front is cheaper than adding it on site.
          </p>
          <p className={styles.bodyText}>
            Before paying for any of them, read our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>observation decks comparison</Link>,
            which puts all four side by side — including the Tokyo Metropolitan Government Building in
            Shinjuku, whose 202-metre deck is free. Prices checked {CHECKED}.
          </p>
        </section>

        {/* teamLab */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Digital art</span>
          <h2 className={styles.sectionTitle}>teamLab Museums</h2>
          <p className={styles.bodyText}>
            Tokyo has two teamLab digital-art museums — Planets in Toyosu and Borderless in Azabudai — both
            immersive, walk-through experiences that use timed entry and sell out fast. Our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets" style={linkStyle}>teamLab tickets guide</Link>{" "}
            compares the two and explains which suits your trip and how to book before they&apos;re gone.
          </p>
        </section>

        {/* Theme parks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Theme parks</span>
          <h2 className={styles.sectionTitle}>Tokyo Disney &amp; the Warner Bros. Studio Tour</h2>
          <p className={styles.bodyText}>
            <strong>Tokyo Disney</strong> (Disneyland and DisneySea) uses date-specified tickets that sell out
            weeks ahead, with no gate sales — and the official site can block foreign cards. Our{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets" style={linkStyle}>Tokyo Disney tickets guide</Link>{" "}
            explains how to buy and how to choose between the two parks. For Harry Potter fans, the{" "}
            <strong>Warner Bros. Studio Tour Tokyo</strong> is the Harry Potter studio tour in Nerima, with
            timed entry, no re-entry and about four hours to allow — details in our{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" style={linkStyle}>studio tour guide</Link>.
          </p>
        </section>

        {/* Experiences */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Experiences</span>
          <h2 className={styles.sectionTitle}>Go-Karts, Sumo, Kimono and Swords</h2>
          <p className={styles.bodyText}>
            The hands-on things are mostly easy to book late, with one exception.{" "}
            <strong>Street go-karting</strong> lets you drive Tokyo&apos;s public roads in costume, but it
            needs an International Driving Permit, and an IDP has to be issued in your own country before you
            fly — our <Link href="/guides/attractions/tokyo-go-kart" style={linkStyle}>go-kart guide</Link>{" "}
            covers who can and cannot get one. To see the national sport, our{" "}
            <Link href="/guides/attractions/sumo-tokyo-tickets" style={linkStyle}>sumo in Tokyo guide</Link>{" "}
            explains tournament tickets, which Tokyo only sells in January, May and September, against the
            year-round morning practice tours.
          </p>
          <p className={styles.bodyText}>
            For the quieter end,{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={linkStyle}>kimono rental</Link> in
            Asakusa is a half-day commitment with a fixed return time rather than a costume hire, a{" "}
            <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>tea ceremony</Link> runs under
            an hour and is taught in English at most visitor-facing listings, and a{" "}
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" style={linkStyle}>samurai and ninja experience</Link>{" "}
            covers three fairly different things sold under one name.
          </p>
        </section>

        {/* Food */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Eating</span>
          <h2 className={styles.sectionTitle}>Food Tours and Cooking Classes</h2>
          <p className={styles.bodyText}>
            Tokyo is a city where the best food is often behind a door you would not push open on your own —
            the six-seat izakaya counters of Omoide Yokocho, the bars of Golden Gai. That is the actual
            argument for a <Link href="/guides/attractions/tokyo-food-tour" style={linkStyle}>guided food tour</Link>:
            not the food, which you could find, but the rooms. If you would rather take something home, a{" "}
            <Link href="/guides/attractions/tokyo-cooking-class" style={linkStyle}>cooking class</Link> runs a
            couple of hours in English and sends you away able to repeat the dish.
          </p>
        </section>

        {/* Day trips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Beyond the city</span>
          <h2 className={styles.sectionTitle}>Four Day Trips, Four Different Days</h2>
          <p className={styles.bodyText}>
            <Link href="/guides/attractions/kamakura-day-trip" style={linkStyle}>Kamakura</Link> is the one to
            take if you only have a spare morning&apos;s worth of planning in you: under an hour on a single
            JR line that a rail pass already covers, with the open-air Great Buddha and Hase-dera a few
            minutes apart.{" "}
            <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko</Link> is two hours north
            for a UNESCO shrine and a mountain waterfall, and the buses between them are the part to plan.
          </p>
          <p className={styles.bodyText}>
            For Mt. Fuji there are two separate questions. If you want the Lake Kawaguchi viewpoints, our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>Mt. Fuji day trip guide</Link>{" "}
            covers the direct train and the Mt. Fuji Pass; if you want the Subaru Line Fifth Station on the
            mountain, that needs a coach, and our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>tour comparison</Link>{" "}
            sorts the itineraries.{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>Hakone</Link> is the
            hot-spring alternative, where one pass covers the entire loop.
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
          heading="Tokyo Bookings Worth Having in Place"
          intro="A city pass for the transport, the deck ticket most people end up buying, a guided loop of the big three sights, and the Fuji coach. Open a listing for the current price on your date."
          tours={[tokyoSubwayTicket, skytreeTicket, tokyoSightseeingBusTour, fujiHakoneDayTour]}
        />

        {/* A round-up recommends a week, not a product, so this is a second catalogue
            rather than a second checkout. Nothing above is changed. */}
        <GygCompare
          slug="things-to-do-tokyo"
          heading="A Second Catalogue for the Same City"
          intro="Nothing on this page depends on one seller. If you are filling in dates and something above is sold out — a Shibuya Sky slot, a Fuji coach, a teamLab entry — GetYourGuide's Tokyo catalogue is the other place to search by date, and it carries operators Klook does not."
          listings={[gygTokyo, gygTokyoEntryTickets]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-joypolis-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <circle cx="12" cy="10" r="2" />
                  <path d="M8 20h8M12 16v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Joypolis Tickets (2026): Passport Prices, Hours &amp; Height Limits</p>
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
            <Link href="/guides/attractions/tokyo-bay-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 18h20l-2 3H4z" />
                  <path d="M4 18V8h16v10" />
                  <path d="M12 8V4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tsukiji-market-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-4 7-5 10-5s6 2 8 5c-2 3-5 5-8 5s-7-1-10-5z" />
                  <circle cx="16" cy="12" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tsukiji Market Food Tour (2026): Hours, What to Eat and Which Tour to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 14h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sanrio Puroland Tickets (2026): Prices, Variable Pricing &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/fuji-q-highland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fuji-Q Highland Tickets (2026): Free Pass Prices, the Q Pack &amp; How to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v8a3 3 0 0 0 6 0V3" />
                  <path d="M9 11v10" />
                  <path d="M17 3c-1.5 2-2 4-2 6h4c0-2-.5-4-2-6z" />
                  <path d="M17 9v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Food Tour (2026): Which Neighbourhood, and What a Tour Adds</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-cooking-class" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16" />
                  <path d="M5 12a7 7 0 0 1 14 0" />
                  <path d="M6 16h12l-1 4H7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Cooking Class (2026): Sushi, Ramen and What to Expect</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l9-9" />
                  <path d="M14 10l7-7" />
                  <path d="M12 12l5 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Samurai and Ninja Experience in Tokyo (2026): Which Kind to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nikko-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M6 21V9l6-4 6 4v12" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nikko Day Trip From Tokyo (2026): Getting There, Costs &amp; Whether to Take a Tour</p>
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
                <p className={styles.relatedTitle}>All Things to Do in Japan: Tickets &amp; Experiences →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-4 7 4v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Every guide for this city, generated from the `city` field in lib/guides-*.ts. */}
        <CityGuideIndex city="tokyo" exclude="/guides/attractions/things-to-do-tokyo" />
      </div>
    </>
  );
}
