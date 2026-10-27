import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { tokyoSubwayTicket, tokyoSightseeingBusTour, skytreeTicket } from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygTokyoSamuraiNinja } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026).
const SAMURAI_NINJA_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1309228&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F133891-samurai-ninja-museum-tokyo-with-samurai-and-ninja-experience%2F";

// Location, hours, duration and activity list are as the Klook listing describes them,
// checked 19 Oct 2026. No price is quoted: Klook answers automated reads of its product pages
// with HTTP 403, so there is no figure here we could have verified.
const CHECKED = "19 October 2026";

const typeRows = [
  {
    type: "Museum-style (e.g. Samurai & Ninja Museum)",
    learn: "Armour dress-up, shuriken throwing, posing with replica swords, guided exhibits",
    age: "Family-friendly — often from around age 6",
  },
  {
    type: "Sword-lesson style (kenbu / iaido)",
    learn: "Basic sword form, drawing and choreographed movement, certificate on finish",
    age: "Some venues set a higher minimum (around 10+)",
  },
];

const whoFor = [
  {
    title: "Pick a museum experience if…",
    desc: "You're with family or want a relaxed, do-it-all session. Museum-style venues such as the Samurai & Ninja Museum in the Asakusa/Taito area combine Edo-period exhibits with armour dress-up, shuriken throwing and photo poses with replica swords, guided in English and Japanese.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M4 21V9l8-5 8 5v12" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Pick a sword lesson if…",
    desc: "You want to actually handle a blade. Lesson-style sessions — such as kenbu or iaido-inspired classes — teach the basic form of drawing and moving with a sword over roughly an hour, often ending with a certificate. These tend to set a higher minimum age.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4l5 5-9 9-5 1 1-5z" />
        <path d="M3 21l3-3" />
      </svg>
    ),
  },
  {
    title: "Choose either for a rainy day if…",
    desc: "The weather turns. These experiences are indoors, run year-round, and sit in central, easy-to-reach parts of the city — a reliable plan when an outdoor day falls through, and an easy add-on near other Asakusa sights.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 13a4 4 0 0 0 0-8 5 5 0 0 0-9.6 1.3A3.5 3.5 0 0 0 6 13" />
        <path d="M8 18l-1 2M12 18l-1 2M16 18l-1 2" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide: samurai, ninja, or both",
    desc: "Some sessions lean samurai (armour and swords), others ninja (shuriken and stealth themes), and many combine both. Museum-style venues usually let you sample several activities, while a dedicated sword lesson focuses on the samurai side.",
  },
  {
    title: "Choose museum-style or a lesson",
    desc: "A museum experience mixes guided Edo-period exhibits with hands-on activities — armour dress-up, shuriken throwing and replica-sword poses. A lesson-style class teaches actual sword form and movement over about an hour, often with a certificate at the end.",
  },
  {
    title: "Check the age limit before you book",
    desc: "Age rules vary by venue. Museum experiences are commonly open from around age six, while the more serious sword-handling classes may require participants to be roughly ten or older. Always confirm the minimum age on the listing if you're bringing children.",
  },
  {
    title: "Book your slot and bring a camera",
    desc: "Most venues are in central Tokyo — the Samurai & Ninja Museum sits in the Asakusa/Taito area — run year-round indoors, and offer English and Japanese guidance. Reserve a time slot online, then come ready for plenty of photo opportunities in costume.",
  },
];

const faqItems = [
  {
    q: "Where can I do a samurai or ninja experience in Tokyo?",
    a: "A well-known option is the Samurai & Ninja Museum in the Asakusa/Taito area, which pairs Edo-period exhibits with hands-on activities — armour dress-up, shuriken throwing and posing with replica swords — guided in English and Japanese. Separately, lesson-style classes inspired by kenbu and iaido teach the basics of sword form and movement, usually over about an hour.",
  },
  {
    q: "What happens during a samurai and ninja experience?",
    a: "At a museum-style venue you typically dress up in armour, throw shuriken (ninja throwing stars), learn basic drawing and posing movements with a replica sword, and take photos, alongside a guided look at the exhibits. A dedicated sword lesson goes deeper into the actual form of drawing and moving with a sword and often finishes with a certificate of completion.",
  },
  {
    q: "Is there an age limit for the samurai and ninja experience?",
    a: "Yes, and it varies by venue. Museum experiences are commonly open from around age six and are family-friendly, while the more hands-on sword-handling classes may set a higher minimum — often around ten years old. If you're visiting with children, check the specific age requirement on the listing and confirm before booking.",
  },
  {
    q: "What's the difference between a museum experience and a sword lesson?",
    a: "A museum experience is broad and beginner-friendly: guided exhibits plus a sample of activities like armour dress-up, shuriken throwing and replica-sword photos, suitable for families. A sword lesson is narrower and more serious — it teaches the basic form of drawing and moving with a sword over roughly an hour, often with a certificate, and tends to have a higher minimum age.",
  },
  {
    q: "Is the samurai and ninja experience suitable for families?",
    a: "Museum-style experiences are generally well suited to families, often welcoming children from around age six, with activities that keep younger visitors engaged. The deeper sword-handling classes are better for older children and adults, since they may require participants to be around ten or older. Check the age policy for the specific experience you choose.",
  },
  {
    q: "Do I need to book a samurai or ninja experience in advance?",
    a: "It's wise to. These are timed, indoor experiences run year-round in central Tokyo, and popular slots fill up — especially family-friendly museum sessions during busy periods. Booking online in advance secures your time and lets you confirm the language of the guide and the minimum age before you arrive.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/samurai-ninja-experience-tokyo") } });

export default function SamuraiNinjaExperienceTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Samurai &amp; Ninja Experience in Tokyo (2026): Sword Lessons, Where to Go &amp; Tickets | Japan Travel Kit</title>
        <meta
          name="description"
          content="Samurai and ninja experiences in Tokyo for 2026: armour dress-up, shuriken throwing and sword lessons. Museum vs lesson styles, age limits, where to go and how to book."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/samurai-ninja-experience-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Samurai & Ninja Experience in Tokyo (2026): Sword Lessons, Where to Go & Tickets" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/samurai-ninja-experience-tokyo" />
        <meta property="og:description" content="Samurai and ninja experiences in Tokyo for 2026: armour dress-up, shuriken throwing and sword lessons. Museum vs lesson styles, age limits, where to go and how to book." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Samurai & Ninja Experience in Tokyo (2026): Sword Lessons, Where to Go & Tickets" />
        <meta name="twitter:description" content="Samurai and ninja experiences in Tokyo for 2026: armour dress-up, shuriken throwing and sword lessons. Museum vs lesson styles, age limits, where to go and how to book." />
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
              route: "/guides/attractions/samurai-ninja-experience-tokyo",
              headline: "Samurai & Ninja Experience in Tokyo (2026): Sword Lessons, Where to Go & Tickets",
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
                { "@type": "ListItem", position: 4, name: "Samurai & Ninja Experience", item: "https://www.japan-travel-kit.com/guides/attractions/samurai-ninja-experience-tokyo" },
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
          <span className={styles.breadCurrent}>Samurai &amp; Ninja Experience</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Samurai &amp; Ninja Experience in Tokyo (2026):<br />Sword Lessons, Where to Go &amp; Tickets
          </h1>
          <p className={styles.heroSubtitle}>
            Dress in armour, throw shuriken, and learn the basics of the sword — indoors and year-round in
            central Tokyo. Here&apos;s how museum experiences and sword lessons differ, and how to book.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Indoor & Year-Round", "English & Japanese"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Two styles</p>
                <p className={styles.verdictStatValue}>Museum vs sword lesson</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Activities</p>
                <p className={styles.verdictStatValue}>Armour, shuriken, sword form</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Central Tokyo (Asakusa/Taito)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Age limit</p>
                <p className={styles.verdictStatValue}>Varies — check before booking</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> three fairly different things are sold under one name, so decide which
              you actually want. A museum visit with hands-on extras is the family option — the listing we
              checked sits in Nishi-Asakusa, opens 09:00 to 18:00, suggests about an hour, and covers armour
              dress-up, throwing a ninja star and posing with replica swords, guided in English and Japanese.
              A sword lesson in the kenbu or iaido tradition teaches actual form and usually sets a higher
              minimum age. Both are indoors and run year-round, which makes either a reliable wet-weather
              plan around Asakusa. Confirm the minimum age before booking. Details as listed on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SAMURAI_NINJA_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Browse Samurai &amp; Ninja Experiences →
              </KlookLink>
              <GygCompareButton slug="samurai-ninja-experience-tokyo" listing={gygTokyoSamuraiNinja} />
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What a Samurai &amp; Ninja Experience Involves</h2>
          <p className={styles.bodyText}>
            Tokyo&apos;s samurai and ninja experiences let you step into Japan&apos;s warrior past for an hour or
            two: putting on armour, throwing shuriken, and trying the basic movements of the sword. They&apos;re
            indoors, run year-round, and sit in easy-to-reach central districts — a dependable plan in any
            weather and a natural add-on around Asakusa.
          </p>
          <p className={styles.bodyText}>
            There are two broad formats. A museum-style venue — such as the Samurai &amp; Ninja Museum in the
            Asakusa/Taito area — pairs Edo-period exhibits with hands-on activities like armour dress-up and
            shuriken throwing, guided in English and Japanese. A lesson-style class, drawing on traditions like
            kenbu and iaido, teaches the actual form of drawing and moving with a sword, often finishing with a
            certificate. Below we compare the two and explain the age rules to watch for.
          </p>
        </section>

        {/* Type table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Museum vs lesson</span>
          <h2 className={styles.sectionTitle}>Museum-Style vs Sword Lesson</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Experience type", "What you do", "Typical age"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {typeRows.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider}>{row.type}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.learn}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Formats and age policies vary by venue and are as of 2026 — confirm details at booking. Note that
            sword-handling classes often set a higher minimum age than family museum experiences.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Which Experience Should You Pick?</h2>
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
          <h2 className={styles.sectionTitle}>How to Choose and Book</h2>
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

        {/* Age note */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Good to know</span>
          <h2 className={styles.sectionTitle}>A Note on Age Limits</h2>
          <p className={styles.bodyText}>
            Age requirements are the one detail worth checking before you book. Museum-style experiences are
            usually family-friendly and often welcome children from around age six, while the more serious
            sword-handling classes may require participants to be roughly ten or older for safety. Policies
            differ from venue to venue, so always read the minimum age on the listing — especially if
            you&apos;re booking for younger children.
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
          heading="Around Asakusa, the Same Day"
          intro="The museum sits a few minutes from Senso-ji, so the obvious pairings are the ones that start or finish nearby. Open a listing for the current price on your date."
          tours={[skytreeTicket, tokyoSightseeingBusTour, tokyoSubwayTicket]}
        />

        {/* The same museums, plus the Shinjuku branch, on a second platform. The Klook
            link and the age-limit advice above are unchanged. */}
        <GygCompare
          slug="samurai-ninja-experience-tokyo"
          heading="Samurai and Ninja Experiences on GetYourGuide"
          intro="These run as timed sessions with a guide, so a wet afternoon fills them and the slot you want may be gone. GetYourGuide lists the Samurai Ninja Museum at both its Asakusa and Shinjuku branches, along with the kid-friendly training formats — check the minimum age there as carefully as you would here."
          listings={[gygTokyoSamuraiNinja]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
            <Link href="/guides/attractions/tokyo-go-kart" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13h2l2-3h8l2 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Street Go-Kart (2026): Rules, IDP Requirement &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 3 4-3 3 6-3 2v9H8v-9L5 9z" />
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
                  <path d="M6 3c0 1-1 1-1 2M10 3c0 1-1 1-1 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto &amp; What to Expect</p>
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
            <Link href="/guides/attractions/sumo-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="6" r="3" />
                  <path d="M6 21c0-4 2.7-7 6-7s6 3 6 7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice</p>
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
            <h2 className={styles.ctaBannerTitle}>Step into Japan&apos;s warrior past</h2>
            <p className={styles.ctaBannerDesc}>
              Whether you want a family-friendly museum session or a hands-on sword lesson, Tokyo&apos;s indoor,
              year-round experiences make an easy add to any itinerary. Compare options, check the age limits,
              and book your slot in advance.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SAMURAI_NINJA_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Browse Samurai &amp; Ninja Experiences →
              </KlookLink>
              <GygCompareButton slug="samurai-ninja-experience-tokyo" listing={gygTokyoSamuraiNinja} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
