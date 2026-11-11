import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  goldenGaiBarHoppingExperience,
  goldenGaiFoodTastingExperience,
  shinjukuBarHoppingNightTour,
  shinjukuNightFoodWalkingTour,
  tokyoSubwayTicket,
  tokyoSightseeingBusTour,
  tsukijiStreetFoodTour,
} from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygTokyoFoodTours, gygTokyoStreetFood } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026).
const TOKYO_FOOD_TOUR_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307856&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F94282-shinjuku-area-join-half-day-drinks-tour-3-hour-tokyo-local-bar-izakaya-crawl%2F";

// Tour length, format and stops are as the Klook listing describes them, checked 19 Oct 2026.
// No price is quoted anywhere on this page: Klook answers automated reads of its product pages
// with HTTP 403, and tour pricing moves with the number of tastings included.
const CHECKED = "19 October 2026";

/**
 * Area facts re-read 11 Nov 2026 on GO TOKYO, the Tokyo Metropolitan Government's
 * official travel site (task-jtk-20261111-C02):
 *   gotokyo.org/en/spot/62/  Shinjuku Golden Gai — "Around 280 bars fit into a tight
 *                            six-row block of alleys", many "seating only five or six
 *                            patrons", most bars open "typically around 20:00", about
 *                            5 min from Shinjuku Station's east exit, "Photography is
 *                            not allowed without permission", no smoking or drinking
 *                            in the street. No cover charge is stated there, so none
 *                            is quoted on this page.
 *   gotokyo.org/en/spot/63/  Omoide Yokocho — 1 Nishi Shinjuku, 2 min on foot from
 *                            Shinjuku Station, yakitori and beer, five or six seats per
 *                            eatery, price line "Cash".
 * The tour rows use the desc lines in lib/klook-links.ts (listings confirmed via
 * the Klook search index on 27 Oct 2026); no Klook price appears.
 */
const AREA_CHECKED_ISO = "2026-11-11";
const GOLDEN_GAI_URL = "https://www.gotokyo.org/en/spot/62/index.html";
const OMOIDE_URL = "https://www.gotokyo.org/en/spot/63/index.html";

const TITLE = "Tokyo Food Tour 2026: Shinjuku Izakaya & Golden Gai, 3 Hrs";
const DESC =
  "Which Tokyo food tour to book: a 3-hour Shinjuku izakaya night via Omoide Yokocho and Golden Gai (20+), a yakitori walk, or a daytime Tsukiji graze.";

/** Which tour to book — the first row is the default answer. */
const compareRows = [
  {
    option: "Shinjuku izakaya & bar hopping night (default pick)",
    url: shinjukuBarHoppingNightTour.url,
    when: "Evening, ~3 hrs, join-in",
    route: "Omoide Yokocho → Kabukicho → Golden Gai, three bars",
    note: "Food and drinks included; listing states 20+ and asks for ID",
  },
  {
    option: "Shinjuku night food walk (food-led)",
    url: shinjukuNightFoodWalkingTour.url,
    when: "Evening, ~3 hrs, join-in",
    route: "Omoide Yokocho, Kabukicho, Golden Gai",
    note: "Three food stops, then a drink at a Golden Gai izakaya",
  },
  {
    option: "Golden Gai food tasting (yakitori + ramen)",
    url: goldenGaiFoodTastingExperience.url,
    when: "Evening, ~3 hrs, guided",
    route: "Shinjuku, ending inside Golden Gai",
    note: "Built around yakitori and a bowl of ramen",
  },
  {
    option: "Golden Gai bar hopping (bars only)",
    url: goldenGaiBarHoppingExperience.url,
    when: "Evening, after dinner",
    route: "Golden Gai alleys",
    note: "No meal attached — for a night that has already eaten",
  },
  {
    option: "Tsukiji street food walk (daytime)",
    url: tsukijiStreetFoodTour.url,
    when: "Daytime, ~2 hrs, small group",
    route: "Tsukiji Hongwanji → Tsukiji Outer Market",
    note: "Skewers, tamagoyaki, sushi and wagyu; the all-ages option",
  },
];

/** Verified area facts, GO TOKYO, read on AREA_CHECKED_ISO. */
const areaRows = [
  {
    area: "Omoide Yokocho",
    where: "1 Nishi Shinjuku — 2 min on foot from Shinjuku Station",
    what: "Yakitori stalls and beer; five or six seats per eatery; listed as cash",
  },
  {
    area: "Shinjuku Golden Gai",
    where: "About 5 min from Shinjuku Station's east exit, next to Kabukicho",
    what: "Around 280 bars in six narrow alleys, many seating five or six; most open around 20:00; no photos without permission",
  },
];

const whoFor = [
  {
    title: "Go for the evening izakaya crawl if…",
    desc: "You want Tokyo's after-dark side. A Shinjuku bar-hopping tour leads you through the lantern-lit alleys of Omoide Yokocho and the tiny bars of Golden Gai, with yakitori, drinks, and local know-how you'd struggle to find alone. Note these tours include alcohol and are for ages 20 and over.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3h14l-1 9a6 6 0 0 1-12 0z" />
        <path d="M12 21v-3M8 21h8" />
      </svg>
    ),
  },
  {
    title: "Go for a daytime market walk if…",
    desc: "You're travelling with family or prefer to keep it light on alcohol. A Tsukiji Outer Market food tour is a daytime graze through stalls and specialist shops — fresh seafood, tamagoyaki, and snacks — and works for all ages.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16l-1.5 12.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
    ),
  },
  {
    title: "Go guided rather than solo if…",
    desc: "You don't read Japanese, feel unsure about tiny bars with their own etiquette, or just want the stories behind the food. A small-group tour with an English-speaking guide handles ordering, etiquette, and pacing — ideal for a first night out in the city.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 14h1a4 4 0 0 1 4 4v3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick your style — night out or daytime graze",
    desc: "An evening izakaya and bar-hopping tour in Shinjuku is the classic choice for atmosphere and nightlife. A daytime food walk through the Tsukiji Outer Market is the better fit for families or anyone who'd rather keep drinking light. Decide which mood you're after first.",
  },
  {
    title: "Check the age policy if alcohol is included",
    desc: "Most izakaya and bar-hopping tours include alcoholic drinks, so they're restricted to ages 20 and over — Japan's legal drinking age. If you're travelling with under-20s, choose a daytime market or food-walk tour instead, or confirm a non-alcohol option before booking.",
  },
  {
    title: "Know the Shinjuku trio",
    desc: "Omoide Yokocho is a warren of tiny post-war yakitori stalls under red lanterns; Golden Gai is a cluster of minuscule themed bars; and Kabukicho is the surrounding entertainment district. Many have a cash-first, small-room culture, which is exactly why a guide helps.",
  },
  {
    title: "Come hungry and carry some cash",
    desc: "Tours usually run around three hours in a small group and include several tastings, so arrive hungry. Even on a guided tour, it's wise to carry some yen in cash — many of the smallest, most atmospheric spots don't take cards.",
  },
];

const faqItems = [
  {
    q: "Which Tokyo food tour should I book?",
    a: "For a first night in Tokyo, a 3-hour Shinjuku izakaya and bar-hopping tour: it starts in Omoide Yokocho's yakitori alley (2 minutes from Shinjuku Station) or Kabukicho and ends in Golden Gai, where around 280 bars sit in six narrow alleys. Pick a food-led Shinjuku walk if you want more eating than drinking, a Golden Gai bars-only crawl if you have already had dinner, and a daytime Tsukiji street-food walk if anyone in the group is under 20. Area facts from GO TOKYO, read on 11 November 2026.",
  },
  {
    q: "Is there a Golden Gai food tour?",
    a: "Yes. Klook lists a three-hour Golden Gai food tasting built around yakitori and a bowl of ramen that ends with a drink inside Golden Gai, and a Golden Gai bar-hopping experience with no meal attached. Most Shinjuku izakaya tours also finish in Golden Gai. Golden Gai bars typically open around 20:00 and many seat only five or six people, which is why a guide who knows which doors welcome visitors is useful. GO TOKYO also notes photography is not allowed without permission. Read on 11 November 2026.",
  },
  {
    q: "What happens on a Tokyo food or izakaya tour?",
    a: "A typical evening tour gathers a small group and an English-speaking guide, then moves between several izakaya and tiny bars — often in Shinjuku's Omoide Yokocho and Golden Gai — sampling dishes like yakitori, gyoza, and fried tofu with sake or beer along the way. Tours usually last around three hours and include the food and drinks, so you taste a range of places in one night.",
  },
  {
    q: "How much does a Tokyo food tour cost?",
    a: `No figure is quoted here, because the honest answer is that it depends almost entirely on what is included and the listings change. What to compare instead of headline price: how many stops, how many dishes and drinks are covered versus paid on the night, the group size, and whether the guide stays with you throughout. A three-hour tour with two venues and drinks included is a different product from a walking tour that stops outside places and leaves you to order. Open a listing for the current price on your date — Klook prices change by date, so there is no fixed figure to print. Checked ${CHECKED}.`,
  },
  {
    q: "Is there an age limit for izakaya bar-hopping tours?",
    a: "Yes. Because izakaya and bar-hopping tours include alcoholic drinks, they're generally limited to ages 20 and over, in line with Japan's legal drinking age. If you're travelling with younger members of your group, look instead at a daytime market food tour (such as Tsukiji), which is family-friendly and lighter on alcohol.",
  },
  {
    q: "Where do Tokyo food tours usually go?",
    a: "Evening tours centre on Shinjuku — the lantern-lit yakitori alley of Omoide Yokocho, the tiny themed bars of Golden Gai, and the Kabukicho entertainment district around them. For a daytime option, the Tsukiji Outer Market is the classic choice, with stalls and shops selling fresh seafood and street snacks to graze through.",
  },
  {
    q: "What food will I try on a Tokyo izakaya tour?",
    a: "Expect izakaya staples: yakitori (grilled chicken skewers), gyoza (dumplings), and fried tofu, typically paired with sake or beer. Exact dishes depend on the venues and the season, and many tours adapt to the group. If you have dietary needs, flag them when booking — smaller bars have limited menus, so advance notice helps.",
  },
  {
    q: "Should I do a food tour or explore on my own?",
    a: "If you read some Japanese and feel comfortable wandering into tiny, cash-only bars, exploring solo is part of the fun. But a guided tour is worth it for a first night out: the guide handles ordering and etiquette, gets you into places you might walk past, and shares the stories behind the food. It's an efficient, low-stress way to taste a lot in one evening.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-food-tour") } });

export default function TokyoFoodTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-food-tour" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-food-tour" />
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
            __html: articleJsonLd({
              route: "/guides/attractions/tokyo-food-tour",
              headline: TITLE,
              description: DESC,
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
                { "@type": "ListItem", position: 4, name: "Tokyo Food & Izakaya Tours", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-food-tour" },
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
          <span className={styles.breadCurrent}>Tokyo Food &amp; Izakaya Tours</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Food Tour 2026:<br />Shinjuku Izakaya, Golden Gai &amp; Yakitori Nights
          </h1>
          <p className={styles.heroSubtitle}>
            Which tour to book by area, time of day and length — from the 3-hour Shinjuku izakaya crawl
            through Omoide Yokocho and Golden Gai to a 2-hour daytime walk at Tsukiji.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Shinjuku Nightlife", "Small-Group Tours"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Shinjuku alleys &amp; bars</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>~3 hrs, small group</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Language</p>
                <p className={styles.verdictStatValue}>English and Japanese</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Age</p>
                <p className={styles.verdictStatValue}>20+ if alcohol included</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>The Tokyo food tour to book first is a 3-hour Shinjuku izakaya night</strong>: an
              evening join-in crawl that starts at an izakaya in Omoide Yokocho (the yakitori alley 2 minutes
              from Shinjuku Station) or Kabukicho and ends in <strong>Golden Gai</strong>, where around 280 bars, many with five or
              six seats, open from about 20:00. If you want Golden Gai itself rather than a route through it,
              book a Golden Gai food tasting (yakitori and ramen, then a drink in the alley); if anyone is under
              20, book a 2-hour daytime Tsukiji street-food walk instead.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOKYO_FOOD_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Book a Shinjuku izakaya tour →
              </KlookLink>
              <KlookLink href={goldenGaiFoodTastingExperience.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Golden Gai food tour →
              </KlookLink>
              <GygCompareButton slug="tokyo-food-tour" listing={gygTokyoFoodTours} />
            </div>
            <p className={styles.verdictText} style={{ marginTop: "1rem" }}>
              What you are paying for is access, not food: six-seat counters and alley bars where the menu is
              handwritten in Japanese and the etiquette is unwritten. Alcohol-inclusive tours are 20 and over.
              Tour formats as each Klook listing describes them; area facts from GO TOKYO, read on{" "}
              {AREA_CHECKED_ISO}. No tour prices are quoted — open a listing for your date.
            </p>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Take a Food Tour in Tokyo?</h2>
          <p className={styles.bodyText}>
            Tokyo has more restaurants than any city on earth, and some of its best are the hardest to walk into:
            counter-only izakaya, six-seat bars, and smoky yakitori stalls where the menus are in Japanese and the
            etiquette is unwritten. A food tour cuts straight through that. In a single evening you taste a string
            of places with a guide who orders for you, explains what you&apos;re eating, and gets you past the
            doorways you&apos;d otherwise hesitate at.
          </p>
          <p className={styles.bodyText}>
            The spiritual home of the Tokyo crawl is <strong>Shinjuku</strong>, where the post-war alley of Omoide
            Yokocho, the tiny bars of Golden Gai, and the neon of Kabukicho sit side by side. Below we compare the
            evening crawl with a daytime market option, then cover what to eat and the practical rules. For the
            after-dark listings one by one, see our{" "}
            <Link href="/guides/attractions/tokyo-night-food-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo night food tour guide
            </Link>
            ; for the daytime version, our{" "}
            <Link href="/guides/attractions/tsukiji-market-food-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tsukiji market food tour guide
            </Link>
            ; and for the rest of the city, our{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              things to do in Tokyo guide
            </Link>
            .
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Food Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>The Shinjuku izakaya night, unless you are under 20 or out in daylight.</strong> Every
            evening option below covers the same three Shinjuku names — Omoide Yokocho, Kabukicho and Golden
            Gai — and differs in whether food or drink leads:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "When & length", "Route", "Good to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener">
                          {row.option}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Formats as each Klook listing describes them (listings confirmed live on 27 October 2026). No tour
            price is quoted: Klook prices change by date and with the number of tastings included, so open a
            listing for your date. Alcohol-inclusive tours are restricted to ages 20 and over.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={shinjukuBarHoppingNightTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shinjuku izakaya &amp; bar hopping night →
            </KlookLink>
            <KlookLink href={tsukijiStreetFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Daytime Tsukiji street food walk →
            </KlookLink>
          </div>
        </section>

        {/* Golden Gai and Shinjuku izakaya — the two searches this page gets most. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Shinjuku</span>
          <h2 className={styles.sectionTitle}>Is There a Golden Gai Food Tour?</h2>
          <p className={styles.bodyText}>
            <strong>Yes — two kinds.</strong> A Golden Gai food tasting runs about three hours around yakitori
            and a bowl of ramen and ends with a drink inside Golden Gai; a Golden Gai bar-hopping experience
            skips the meal and is for an evening that has already eaten. Golden Gai is around 280 bars in six
            narrow alleys, many seating five or six, and most open around 20:00 — so a guide who knows which
            doors welcome visitors does most of the work.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Where", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {AREA_CHECKED_ISO}</strong> — source: GO TOKYO (Tokyo&apos;s official travel
            site),{" "}
            <a href={GOLDEN_GAI_URL} target="_blank" rel="noopener">Shinjuku Golden Gai</a> and{" "}
            <a href={OMOIDE_URL} target="_blank" rel="noopener">Omoide Yokocho</a>. GO TOKYO also states that
            photography in Golden Gai is not allowed without permission and that smoking and drinking in the
            street are not allowed. It does not publish a cover charge, and bars set their own, so none is
            quoted here.
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            Is a Shinjuku Izakaya Tour Worth It?
          </h3>
          <p className={styles.bodyText}>
            <strong>For a first night, yes.</strong> A Shinjuku izakaya tour is about three hours, in a join-in
            group, across the yakitori counters of Omoide Yokocho and the bars of Kabukicho and Golden Gai,
            with the food and drink on the bar-hopping listing included. The guide orders, explains the
            etiquette and picks rooms that take visitors — the part that is hard to do alone in alleys where
            each place seats five or six.
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            Is There a Yakitori and Izakaya Food Tour in Tokyo?
          </h3>
          <p className={styles.bodyText}>
            <strong>Yes — that is what the Shinjuku tours are.</strong> Omoide Yokocho, the usual first stop,
            is an alley of yakitori stalls serving skewers and beer, 2 minutes from Shinjuku Station on GO
            TOKYO&apos;s figure. If you are comparing a named Shinjuku izakaya tour sold elsewhere — for
            example one advertised by its number of stops and tastings — compare on the same four points:
            how many venues, which drinks are included, group size, and whether it ends in Golden Gai.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={goldenGaiFoodTastingExperience.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Golden Gai food tasting →
            </KlookLink>
            <KlookLink href={shinjukuNightFoodWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shinjuku night food walk →
            </KlookLink>
          </div>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Who Should Take One?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Pick &amp; Book</h2>
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
        </section>

        {/* Note on age / drinking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Good to know</span>
          <h2 className={styles.sectionTitle}>The 20+ Rule &amp; Cash Culture</h2>
          <p className={styles.bodyText}>
            Japan&apos;s legal drinking age is 20, and any tour that includes alcohol — which covers most izakaya
            and bar-hopping crawls — is therefore limited to guests aged 20 and over. If your group includes
            under-20s, pick a daytime market food walk such as Tsukiji, or confirm a non-alcoholic alternative
            with the operator before you book.
          </p>
          <p className={styles.bodyText}>
            The other practical point is cash: the smallest, most characterful bars often don&apos;t take cards, so
            carry some yen even on a guided tour. While you&apos;re planning the night, our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo observation decks guide
            </Link>{" "}
            pairs well — a sunset view before dinner makes an easy lead-in to a Shinjuku food crawl.
          </p>
        </section>

        <EsimCtaBottom />

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
          heading="Getting There and Back"
          intro="A Shinjuku crawl ends late, which makes the subway ticket more useful than it looks. Open a listing for the current price on your date."
          tours={[tokyoSubwayTicket, tokyoSightseeingBusTour]}
        />

        {/* A different roster of guides over the same neighbourhoods. The Klook tour
            and every detail quoted from its listing are unchanged. */}
        <GygCompare
          slug="tokyo-food-tour"
          heading="Tokyo Food Tours on GetYourGuide"
          intro="Food tours run on small groups, which means a handful of places per departure and a waitlist on a Friday. The two platforms sign different guides, so the neighbourhood you wanted — Shinjuku, Shibuya, Ginza, the Ameyoko arcade — may be bookable on one when it is not on the other."
          listings={[gygTokyoFoodTours, gygTokyoStreetFood]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/osaka-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v8a6 6 0 0 0 12 0V3" />
                  <path d="M12 17v4M9 21h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Food Tour (2026): Which One to Book, Times and What You Eat</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-night-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3h14l-1 9a6 6 0 0 1-12 0z" />
                  <path d="M12 21v-3M8 21h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Night Food Tour (2026): Omoide Yokocho, Golden Gai and the 20+ Rule</p>
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
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M8 22h8" />
                  <path d="M9 7l3-3 3 3" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
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
                <p className={styles.relatedTitle}>Tokyo Cooking Class (2026): Sushi &amp; Ramen Making — What to Expect</p>
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
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Eat your way through Shinjuku</h2>
            <p className={styles.ctaBannerDesc}>
              A small-group izakaya and bar-hopping tour is the easiest way into Tokyo&apos;s nightlife — yakitori,
              sake, and tiny bars with a guide to lead the way. Alcohol-inclusive tours are for ages 20 and over.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TOKYO_FOOD_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Browse Tokyo Food Tours →
              </KlookLink>
              <GygCompareButton slug="tokyo-food-tour" listing={gygTokyoFoodTours} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
