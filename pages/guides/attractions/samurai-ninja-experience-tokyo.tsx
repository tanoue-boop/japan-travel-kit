import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const SAMURAI_NINJA_URL = "https://www.klook.com/en-US/search/?query=Tokyo%20samurai%20ninja%20experience";

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

export default function SamuraiNinjaExperienceTokyoPage() {
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Samurai & Ninja Experience in Tokyo (2026): Sword Lessons, Where to Go & Tickets",
              dateModified: "2026-06-18",
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
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>⚔️</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Samurai &amp; Ninja Experience in Tokyo (2026):<br />Sword Lessons, Where to Go &amp; Tickets
          </h1>
          <p className={styles.heroSubtitle}>
            Dress in armour, throw shuriken, and learn the basics of the sword — indoors and year-round in
            central Tokyo. Here&apos;s how museum experiences and sword lessons differ, and how to book.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Indoor & Year-Round", "English & Japanese"].map((t) => (
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
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
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
              <strong>In short:</strong> Choose a family-friendly museum experience (armour dress-up, shuriken,
              replica-sword photos) or a focused sword lesson that teaches actual form. Both are indoors and
              year-round — but age limits differ, so confirm the minimum age before you book.
            </p>
            <a href={SAMURAI_NINJA_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Samurai &amp; Ninja Experiences →
            </a>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Things to Do in Tokyo (2026): Tickets, Attractions &amp; Experiences</p>
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
                <p className={styles.relatedTitle}>Kimono Rental in Japan (2026): Kyoto &amp; Asakusa — Prices &amp; How to Book</p>
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
            <h2 className={styles.ctaBannerTitle}>Step into Japan&apos;s warrior past</h2>
            <p className={styles.ctaBannerDesc}>
              Whether you want a family-friendly museum session or a hands-on sword lesson, Tokyo&apos;s indoor,
              year-round experiences make an easy add to any itinerary. Compare options, check the age limits,
              and book your slot in advance.
            </p>
            <a href={SAMURAI_NINJA_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              Browse Samurai &amp; Ninja Experiences →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
