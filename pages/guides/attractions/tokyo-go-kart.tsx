import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const GOKART_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304902&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F116875-shibuya-go-karting-experience-by-akiba-kart-shibuya%2F";

const requirementRows = [
  {
    group: "Most countries (1949 Geneva IDP)",
    need: "Your home driver's licence + an International Driving Permit issued under the 1949 Geneva Convention + your passport — all originals",
    drive: "Yes",
  },
  {
    group: "Switzerland, Germany, France, Taiwan, Belgium, Monaco",
    need: "Your home driver's licence + an official Japanese translation (issued by JAF or your embassy) + your passport",
    drive: "Yes",
  },
  {
    group: "Non-Geneva countries (China, Indonesia, etc.)",
    need: "These countries are not party to the 1949 Geneva Convention, so a Geneva IDP is not valid in Japan",
    drive: "No (cannot drive on this permit basis)",
  },
  {
    group: "US military personnel",
    need: "SOFA-based driving documentation (per your status of forces agreement) + passport/ID",
    drive: "Yes (with valid SOFA documents)",
  },
];

const whoFor = [
  {
    title: "Confident, fully licensed drivers",
    desc: "You hold a valid full driver's licence at home, you're comfortable on real roads, and you've sorted an International Driving Permit before flying. This is built for licensed adults — not a theme-park ride.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h2l1-3h12l1 3h2" />
        <path d="M5 12v5h14v-5" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Sightseers who want a different angle",
    desc: "You want to see landmarks like Tokyo Tower, Odaiba and the Rainbow Bridge area from street level, open-air, with the wind in your face. Popular routes are scenic and guide-led, so you simply follow the lead driver.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Not for you if you can't drive in Japan",
    desc: "If you're under 18, don't hold a licence, or come from a country whose licence Japan won't recognise for this permit basis, you cannot legally drive these karts. There's no on-the-spot fix — sort documents at home first.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Get your International Driving Permit at home — before you fly",
    desc: "An IDP under the 1949 Geneva Convention can only be issued in your home country, and never in Japan. Apply well before departure (your home motoring authority or automobile association issues it). If you're from Switzerland, Germany, France, Taiwan, Belgium or Monaco, arrange an official Japanese translation of your licence from JAF or your embassy instead.",
  },
  {
    title: "Pack the three originals: IDP, home licence and passport",
    desc: "You must carry all originals on the day — your physical home-country driver's licence, your IDP (or JAF/embassy translation), and your passport. Photocopies and phone photos are not accepted, and operators will refuse to let you drive without them.",
  },
  {
    title: "Confirm you meet the eligibility rules",
    desc: "You must be 18 or older with a valid licence, and your licence must be recognised in Japan for driving (a 1949 Geneva IDP, or the JAF translation route for the listed countries). Drivers from non-Geneva countries such as China and Indonesia cannot drive on this basis. Passengers without these documents may still ride along, depending on the operator.",
  },
  {
    title: "Book ahead, then arrive early for the briefing",
    desc: "Reserve your slot online in advance and choose a route. Arrive in good time for the safety briefing and document check, pick a generic costume if you want one, and remember Japan drives on the LEFT. Tours are guide-led — you follow a lead driver the whole way.",
  },
];

const faqItems = [
  {
    q: "Do I need an International Driving Permit to drive a street go-kart in Tokyo?",
    a: "Yes — for most visitors it is mandatory. To drive on Tokyo's public roads you must carry a valid International Driving Permit (IDP) issued under the 1949 Geneva Convention, together with your physical home-country driver's licence and your passport. All three must be originals. Crucially, the IDP can only be obtained in your home country before you travel — it cannot be issued in Japan, so arrange it well in advance.",
  },
  {
    q: "Can I drive without an IDP?",
    a: "No, not on the standard basis. Without a valid 1949 Geneva IDP (or, for certain countries, an official Japanese translation of your licence) you are not legally permitted to drive on Japanese roads, and operators will not let you take the wheel. Drivers from Switzerland, Germany, France, Taiwan, Belgium and Monaco need an official Japanese translation issued by JAF or their embassy instead of the usual IDP. US military personnel can use SOFA-based documentation. If you have none of these, you cannot drive — but a licensed friend can, and you may be able to ride along as a passenger depending on the operator.",
  },
  {
    q: "What is the minimum age to drive?",
    a: "You must be at least 18 years old and hold a valid driver's licence to drive a street go-kart in Tokyo. There is no exception for younger riders behind the wheel.",
  },
  {
    q: "Are these the costumed karts I've seen online?",
    a: "These are street go-kart tours. They are not affiliated with, sponsored by, or endorsed by any video game, character, or entertainment brand, and any costumes provided are generic. It's simply a chance to drive a small, street-legal kart along public roads in central Tokyo as part of a guided tour.",
  },
  {
    q: "Which documents do I need to bring on the day?",
    a: "Bring three originals: (1) your physical home-country driver's licence, (2) your International Driving Permit under the 1949 Geneva Convention — or, for Switzerland, Germany, France, Taiwan, Belgium and Monaco, an official Japanese translation from JAF or your embassy — and (3) your passport. US military personnel should bring their SOFA-based driving documentation. Photocopies and phone photos are not accepted.",
  },
  {
    q: "Is it safe, and which side of the road do you drive on?",
    a: "These are street-legal karts driven on real public roads, so it isn't a closed track — Japan drives on the LEFT, and you'll be in live traffic. Tours are guide-led: you follow a lead driver along a planned route, after a safety briefing. Drive carefully, obey traffic rules and your guide's instructions, and treat it as real driving rather than an amusement-park ride.",
  },
];

export default function TokyoGoKartPage() {
  return (
    <>
      <Head>
        <title>Tokyo Street Go-Kart (2026): Rules, IDP Requirement &amp; How to Book | Japan Travel Kit</title>
        <meta
          name="description"
          content="Tokyo street go-kart in 2026: the driving rules that matter most — you need an International Driving Permit, home licence and passport — plus eligibility by country and how to book."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-go-kart" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Street Go-Kart (2026): Rules, IDP Requirement & How to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-go-kart" />
        <meta property="og:description" content="Tokyo street go-kart in 2026: the driving rules that matter most — you need an International Driving Permit, home licence and passport — plus eligibility by country and how to book." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Street Go-Kart (2026): Rules, IDP Requirement & How to Book" />
        <meta name="twitter:description" content="Tokyo street go-kart in 2026: the driving rules that matter most — you need an International Driving Permit, home licence and passport — plus eligibility by country and how to book." />
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
              headline: "Tokyo Street Go-Kart (2026): Rules, IDP Requirement & How to Book",
              dateModified: "2026-06-15",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Street Go-Kart", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-go-kart" },
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
          <span className={styles.breadCurrent}>Tokyo Street Go-Kart</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🏎️</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Street Go-Kart (2026):<br />Rules, IDP Requirement &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Drive a street-legal go-kart through central Tokyo past landmarks like Tokyo Tower and the
            Rainbow Bridge area. The catch: you need the right driving documents — sorted at home, before you fly.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "IDP Required", "Ages 18+"].map((t) => (
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
                <p className={styles.verdictStatLabel}>To drive you need</p>
                <p className={styles.verdictStatValue}>IDP + home licence + passport</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Minimum age</p>
                <p className={styles.verdictStatValue}>18+</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Get the IDP</p>
                <p className={styles.verdictStatValue}>At home, before you fly</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price</p>
                <p className={styles.verdictStatValue}>Variable (2026) — confirm at booking</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> A street go-kart tour is a fun, open-air way to see Tokyo — but it&apos;s
              real driving on public roads. You must be 18+ and carry an International Driving Permit (1949 Geneva
              Convention), your home-country licence and your passport. The IDP must be obtained in your home
              country before you travel — it cannot be issued in Japan.
            </p>
            <a href={GOKART_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Tokyo Street Go-Kart →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is a Tokyo Street Go-Kart Tour?</h2>
          <p className={styles.bodyText}>
            A Tokyo street go-kart tour lets you drive a small, street-legal kart along the city&apos;s public
            roads as part of a guided convoy. Popular routes weave past well-known sights — areas around the
            Rainbow Bridge, Tokyo Tower, Odaiba and Shibuya feature on many itineraries — giving you an
            open-air, ground-level view of the city you simply don&apos;t get from a train or bus. Generic
            costumes are usually available to wear during the tour.
          </p>
          <p className={styles.bodyText}>
            One important point up front: this is a <strong>generic street go-kart experience</strong>. It is{" "}
            <strong>not affiliated with, sponsored by, or endorsed by any video game, character, or
            entertainment brand</strong>, and the costumes offered are generic. The real appeal is the driving
            itself — and that&apos;s exactly why the paperwork matters so much.
          </p>
        </section>

        {/* Requirements table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Eligibility</span>
          <h2 className={styles.sectionTitle}>Who Can Drive — Requirements by Country</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Because these karts run on public roads, you must hold a licence Japan recognises for driving.
            The single most important rule: an International Driving Permit under the 1949 Geneva Convention
            must be obtained in your <strong>home country before you travel</strong> — it cannot be issued in
            Japan. Use the table below to find your situation.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your situation", "What you need", "Can you drive?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requirementRows.map((row) => (
                    <tr key={row.group}>
                      <td className={styles.tdProvider}>{row.group}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.need}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.drive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Rules are based on Japan&apos;s recognition of foreign licences and can change — always confirm the
            exact requirements for your nationality with the operator before booking. All documents must be
            carried as originals on the day.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Who it&apos;s for</span>
          <h2 className={styles.sectionTitle}>Is a Street Go-Kart Tour Right for You?</h2>
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

        {/* Document prep steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Prepare Your Documents &amp; Book</h2>
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

        {/* Getting around */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Plan your day</span>
          <h2 className={styles.sectionTitle}>Getting to Your Meeting Point</h2>
          <p className={styles.bodyText}>
            Go-kart operators run from several bases around Tokyo — often near areas like Shibuya, Asakusa,
            Akihabara or the bay. Check your booking confirmation for the exact meeting point and give yourself
            plenty of time to arrive before the briefing.
          </p>
          <p className={styles.bodyText}>
            Tokyo&apos;s trains and subway make it easy to reach almost any starting base. If you&apos;re still
            getting your bearings, our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              guide to getting around Tokyo
            </Link>{" "}
            explains the train, subway and IC card basics.
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
            <h2 className={styles.ctaBannerTitle}>Ready to drive Tokyo?</h2>
            <p className={styles.ctaBannerDesc}>
              Book your street go-kart tour ahead, then bring your International Driving Permit, home licence
              and passport on the day. Remember: the IDP must be sorted in your home country before you fly.
            </p>
            <a href={GOKART_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              View Tokyo Street Go-Kart →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
