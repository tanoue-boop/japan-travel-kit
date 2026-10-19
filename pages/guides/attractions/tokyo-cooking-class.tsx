import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { tokyoSubwayTicket, tokyoSightseeingBusTour } from "../../../lib/klook-links";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026).
const TOKYO_COOKING_CLASS_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1309224&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F122869-tokyo-sushi-making-experience-japanese-cooking-class%2F";

// Class length, location, course options and language are as the Klook listing describes them,
// checked 19 Oct 2026. No price appears on this page: Klook answers automated reads of its
// product pages with HTTP 403, and class pricing varies too widely by format to generalise.
const CHECKED = "19 October 2026";

const typeRows = [
  {
    type: "Sushi + ramen combo",
    learn: "Seasoning sushi rice, hand-shaping nigiri, ramen broth & noodles",
    good: "First-timers wanting the two signature dishes in one session",
  },
  {
    type: "Ramen + gyoza",
    learn: "Building dashi-based broth, noodles and folding gyoza",
    good: "Anyone who came for ramen above all else",
  },
  {
    type: "Wagashi & matcha",
    learn: "Shaping seasonal sweets and whisking matcha",
    good: "Visitors after a lighter, calmer hands-on session",
  },
  {
    type: "Market-tour class",
    learn: "Shopping for ingredients first, then cooking them",
    good: "Foodies who want the buying experience too",
  },
];

const whoFor = [
  {
    title: "Book a sushi + ramen class if…",
    desc: "You want Tokyo's two most iconic dishes in one go. The popular 2.5–3 hour combo sessions walk you through seasoning sushi rice and shaping nigiri, then making a ramen broth and noodles — a complete introduction with plenty to eat at the end.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Bring the family if…",
    desc: "You're travelling with children. Many Tokyo cooking classes welcome kids — often from around age five — and the hands-on shaping and folding tends to keep younger cooks engaged. Confirm the minimum age and any kid pricing when you book.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3 21v-1a6 6 0 0 1 12 0v1M15 21v-1a5 5 0 0 1 6-4.9" />
      </svg>
    ),
  },
  {
    title: "Add a market tour if…",
    desc: "You want the full from-scratch experience. Some classes start with a walk through a local market or the Tsukiji outer market to buy ingredients before cooking them. It's a longer session, but you learn what to look for as well as how to cook it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .7h7.7a1 1 0 0 0 1-.8L20 7H6" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick your dish and session length",
    desc: "Decide whether you want the sushi-and-ramen combo, a ramen-and-gyoza class, a wagashi-and-matcha session, or a class that includes a market shop. Length is the thing to read off the listing rather than price: a single-dish class can be as short as 90 minutes, while a combo or market class runs two and a half to three hours. Check what you actually cook, too — some sessions are more demonstration than participation.",
  },
  {
    title: "Confirm the language",
    desc: "Many Tokyo cooking classes are taught entirely in English, but not all — check the listing and confirm before booking if English instruction matters to you. This is especially worth doing for smaller, neighbourhood studios.",
  },
  {
    title: "Choose a neighbourhood",
    desc: "Classes run all over the city, with clusters around Tsukiji, Asakusa, Shinjuku and Tsukishima. Pick one that fits your itinerary so you're not crossing town — many are an easy add-on to a day you're already spending in that area.",
  },
  {
    title: "Check dietary needs and what's included",
    desc: "Ask whether vegetarian, halal or allergy-friendly options are available, and what the price covers — usually all ingredients, equipment and the meal you cook, sometimes with an optional sake pairing. Then book your slot online in advance.",
  },
];

const faqItems = [
  {
    q: "How much does a Tokyo cooking class cost?",
    a: "We do not print a price band for Tokyo cooking classes, because the formats are too different for one to mean anything — a 90-minute single-dish group class and a three-hour combo with a market tour and sake pairing are not the same product. What drives the figure is the number of dishes, the session length, the group size and the extras. Open a listing for the price on your date; Klook blocks automated reads of its product pages, so there is no figure here we could have verified.",
  },
  {
    q: "Are Tokyo cooking classes in English?",
    a: "Many are taught entirely in English and are designed for international visitors, but not every class is, so it's worth confirming before you book — especially for smaller neighbourhood studios. Listings usually state the language of instruction. If English matters to you, choose a class that explicitly advertises an English-speaking instructor.",
  },
  {
    q: "What will I cook in a sushi and ramen class?",
    a: "A typical sushi-and-ramen combo class covers seasoning the sushi rice and hand-shaping nigiri, then making a ramen broth from dashi along with the noodles. Some classes add gyoza, and many finish with you eating everything you've made. Sessions usually last around 2.5 to 3 hours from start to finish.",
  },
  {
    q: "Are Tokyo cooking classes suitable for children?",
    a: "Often yes — many classes welcome children, frequently from around age five, and the hands-on shaping and folding keeps younger cooks involved. Minimum ages and child pricing vary by studio, so check the listing and confirm when you book if you're bringing kids.",
  },
  {
    q: "Where are cooking classes held in Tokyo?",
    a: "Classes run across the city, with popular clusters around Tsukiji, Asakusa, Shinjuku and Tsukishima. Some begin with a walk through a local or the Tsukiji outer market to buy ingredients before cooking. Pick a class in an area you're already visiting so it slots neatly into your day.",
  },
  {
    q: "Can cooking classes cater to dietary requirements?",
    a: "Some can — vegetarian, halal and allergy-friendly options are available at certain studios, but they aren't universal. Because ingredients like dashi and pork are common in ramen and gyoza, it's important to ask about substitutions when you book rather than on the day, so the studio can prepare accordingly.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-cooking-class") } });

export default function TokyoCookingClassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Tokyo Cooking Class (2026): Sushi &amp; Ramen Making — What to Expect &amp; How to Book | Japan Travel Kit</title>
        <meta
          name="description"
          content="Tokyo cooking classes in 2026: what sushi, ramen and wagashi sessions actually cover, how long each format runs, English-language and kid-friendly options, and how to pick the right class."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-cooking-class" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Cooking Class (2026): Sushi & Ramen Making — What to Expect & How to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-cooking-class" />
        <meta property="og:description" content="Tokyo cooking classes in 2026: what sushi, ramen and wagashi sessions actually cover, how long each format runs, English-language and kid-friendly options, and how to pick the right class." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Cooking Class (2026): Sushi & Ramen Making — What to Expect & How to Book" />
        <meta name="twitter:description" content="Tokyo cooking classes in 2026: what sushi, ramen and wagashi sessions actually cover, how long each format runs, English-language and kid-friendly options, and how to pick the right class." />
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
              headline: "Tokyo Cooking Class (2026): Sushi & Ramen Making — What to Expect & How to Book",
              dateModified: updated.iso,
              author: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
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
                { "@type": "ListItem", position: 4, name: "Tokyo Cooking Class", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-cooking-class" },
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
          <span className={styles.breadCurrent}>Tokyo Cooking Class</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Cooking Class (2026):<br />Sushi &amp; Ramen Making — What to Expect &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Make sushi and ramen from scratch with a local instructor, then eat what you cook. Here&apos;s what
            the classes cover, what they cost, and how to pick and book the right one.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Hands-On & Beginner-Friendly", "English Classes"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Most popular</p>
                <p className={styles.verdictStatValue}>Sushi + ramen combo</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Typical length</p>
                <p className={styles.verdictStatValue}>1.5 to 3 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Format</p>
                <p className={styles.verdictStatValue}>Group, hands-on, meet on site</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Language</p>
                <p className={styles.verdictStatValue}>Often English (confirm)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the useful thing a class gives you is a skill you can repeat at home,
              which is why the dish matters more than the venue. The sushi-making listing we checked sits in
              Shinbashi in central Tokyo, runs 1 hour 30 minutes as a join-in group with English-speaking
              staff, and offers two courses — maki and temari sushi, or maki and nigiri. Longer formats pair
              sushi with ramen or add a market shop first. Most are beginner-friendly and many welcome
              children; confirm the language and minimum age when you book. Details as listed on {CHECKED}.
            </p>
            <a href={TOKYO_COOKING_CLASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Tokyo Cooking Classes →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What a Tokyo Cooking Class Is Like</h2>
          <p className={styles.bodyText}>
            A cooking class is one of the most hands-on ways to get under the skin of Japanese food — and in
            Tokyo the most sought-after format pairs sushi and ramen in a single session. You don&apos;t just
            watch; you season the rice, shape the nigiri, build a broth and pull the noodles, then sit down to
            eat everything you made.
          </p>
          <p className={styles.bodyText}>
            Length varies more than people expect, and it is the clearest signal of what you are buying. The
            sushi-only listing we checked, in Shinbashi, runs 1 hour 30 minutes; a sushi-and-ramen combo
            typically runs two and a half to three; a market-tour class adds the shopping on top. We do not
            print prices here — Klook blocks automated reads of its product pages, so there is no figure we
            could have verified, and the range across formats is wide enough that a quoted band would mislead
            more than it helps. Most classes are beginner-friendly, many are taught in English, and a good
            number welcome children. Checked {CHECKED}.
          </p>
        </section>

        {/* Type table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Class types</span>
          <h2 className={styles.sectionTitle}>Which Cooking Class Should You Pick?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Class type", "What you learn", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {typeRows.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.type}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.learn}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Formats and inclusions vary by studio and are as of 2026 — confirm the menu, length and language at
            booking. Some classes add a sake pairing or begin with a market shop.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Who Each Class Is For</h2>
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

        {/* How to book / steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book a Cooking Class</h2>
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
          heading="Around the Class"
          intro="A class is a half-day at most, so these are the bookings that tend to go either side of it. Open a listing for the current price on your date."
          tours={[tokyoSubwayTicket, tokyoSightseeingBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .7h7.7a1 1 0 0 0 1-.8L20 7H6" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="17" cy="20" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Food &amp; Izakaya Tours (2026): Shinjuku Bar Hopping &amp; What to Eat</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                  <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
                  <path d="M6 3c0 1-1 1-1 2M10 3c0 1-1 1-1 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto &amp; What to Expect</p>
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
            <h2 className={styles.ctaBannerTitle}>Cook your own sushi &amp; ramen</h2>
            <p className={styles.ctaBannerDesc}>
              A hands-on class is a memorable way to learn Tokyo&apos;s signature dishes — and you eat the
              results. Browse English-friendly sushi and ramen classes, check the times and prices, and book
              your slot in advance.
            </p>
            <a href={TOKYO_COOKING_CLASS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              Browse Tokyo Cooking Classes →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
