import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const comparison = [
  { feature: "Issued by",       suica: "JR East",              pasmo: "Tokyo Metro & private rails"  },
  { feature: "Coverage",        suica: "Nationwide",            pasmo: "Nationwide"                   },
  { feature: "Mobile version",  suica: "iPhone & Android",      pasmo: "Android only"                 },
  { feature: "Tourist version", suica: "✓",                    pasmo: "✓"                            },
  { feature: "Best for",        suica: "Most travellers",       pasmo: "Tokyo Metro frequent users"   },
];

const worksOn = [
  "All JR lines nationwide",
  "Tokyo Metro & Toei Subway",
  "Private railways (Hankyu, Keio, Odakyu, Kintetsu, etc.)",
  "City buses across Japan",
  "7-Eleven, FamilyMart & Lawson convenience stores",
  "Most vending machines and some taxis in major cities",
];

const doesNotWork = [
  "Shinkansen boarding (requires a separate ticket)",
  "Some rural and regional buses",
  "Taxis outside major urban areas",
];

const steps = [
  {
    title: "Find a ticket vending machine at any JR station",
    desc: "Look for machines marked with a Suica or IC card sticker. Available at all major airports (Narita, Haneda, Kansai) and urban stations. Machines have English-language support.",
  },
  {
    title: "Select 'Suica' or 'New card'",
    desc: "Choose the new card option from the main menu. The process is straightforward — the machine walks you through each step.",
  },
  {
    title: "Pay the ¥500 deposit and choose your starting balance",
    desc: "Insert ¥2,000: ¥500 covers the deposit and ¥1,500 becomes your starting balance. Machines accept cash; some newer machines also accept foreign credit cards.",
  },
  {
    title: "Start using immediately",
    desc: "Touch the card to the IC reader at any ticket gate to enter. Your balance is deducted automatically and shown on the display. You'll hear a beep when it reads successfully.",
  },
];

const mobileSections = [
  {
    title: "iPhone: Apple Pay",
    desc: "Open the Wallet app → tap + → search for Suica. Requires iPhone XR or later. You can load money directly from a linked Visa or Mastercard — including foreign cards.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Android: Google Pay",
    desc: "Open Google Pay → Payment → Add payment method → IC card (Suica). Works on most NFC-enabled Android phones. Add money directly from a linked bank card.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="9" y1="14" x2="9" y2="14" />
        <line x1="12" y1="14" x2="12" y2="14" />
        <line x1="15" y1="14" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    title: "No card needed",
    desc: "With Mobile Suica, you don't need a physical card. Just hold your phone or watch near the card reader — it works even if your phone battery is low (on iPhone).",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.18 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "What is the best IC card for tourists in Japan?",
    a: "Suica is the best IC card for most tourists. It's accepted nationwide on trains, subways, and buses, and at convenience stores. Pasmo works equally well in practice — both use the same interoperable network. The main practical difference is where you get one: Suica from JR station machines, Pasmo from Tokyo Metro machines.",
  },
  {
    q: "Can I use Suica outside Tokyo?",
    a: "Yes. Suica is accepted across Japan on most public transport — including Osaka, Kyoto, Nagoya, Hiroshima, Sapporo, and Fukuoka. All major IC cards use a shared interoperable network, so you can use Suica on virtually any IC-compatible transport anywhere in Japan.",
  },
  {
    q: "How do I charge my IC card in Japan?",
    a: "Charge (top up) at any ticket vending machine at train stations — look for a machine labeled チャージ (charge) or with an IC card logo. Insert your card and cash, select the amount, and the balance updates instantly. You can also top up via Mobile Suica if set up on your phone.",
  },
  {
    q: "Can I use a foreign credit card to charge my IC card?",
    a: "Some newer vending machines in major stations accept foreign Visa and Mastercard. However, it's not universal — smaller stations may only accept cash. The safest approach is to have Japanese yen available, or set up Mobile Suica linked to a foreign Visa/Mastercard via Apple Pay or Google Pay.",
  },
  {
    q: "What happens if my IC card runs out of money at the gate?",
    a: "If your card balance is insufficient, you'll hear an error tone and the gate won't open. Don't panic — find the nearest fare adjustment machine (精算機) inside the station, insert your card, pay the difference in cash, and exit as normal. Most stations have these machines near the gates.",
  },
];

export default function IcCardsJapanPage() {
  return (
    <>
      <Head>
        <title>IC Cards in Japan 2026: Suica &amp; Pasmo Guide | Japan Travel Kit</title>
        <meta
          name="description"
          content="Suica or Pasmo? We explain what IC cards are, where to get them, where they work, and how to use Mobile Suica on iPhone and Android."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport/ic-cards-japan" />
        <meta property="og:title" content="IC Cards in Japan 2026: Suica, Pasmo & How to Use Them" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport/ic-cards-japan" />
        <meta property="og:description" content="Suica or Pasmo? We explain what IC cards are, where to get them, where they work, and how to use Mobile Suica on iPhone and Android." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IC Cards in Japan 2026: Suica, Pasmo & How to Use Them" />
        <meta name="twitter:description" content="Suica or Pasmo? We explain what IC cards are, where to get them, where they work, and how to use Mobile Suica on iPhone and Android." />
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
              headline: "IC Cards in Japan 2026: Suica, Pasmo & How to Use Them",
              dateModified: "2026-04-24",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://japan-travel-kit.com",
              },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>IC Cards in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚇</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            IC Cards in Japan 2026:<br />Suica, Pasmo &amp; How to Use Them
          </h1>
          <p className={styles.heroSubtitle}>
            An IC card is the single most useful thing you can have in Japan. Here&apos;s everything you need to know.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All IC Cards", "Beginner Friendly"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
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
                <p className={styles.verdictStatLabel}>Best IC card</p>
                <p className={styles.verdictStatValue}>Suica (nationwide)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where to get</p>
                <p className={styles.verdictStatValue}>Vending machine at any JR station</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Works on</p>
                <p className={styles.verdictStatValue}>Trains, buses, taxis, convenience stores</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Deposit</p>
                <p className={styles.verdictStatValue}>¥500 (refundable)</p>
              </div>
            </div>
          </div>
        </div>

        {/* What Is an IC Card? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is an IC Card?</h2>
          <p className={styles.bodyText}>
            An IC card is a rechargeable contactless smart card used for paying train and bus fares across Japan. You load it with cash, then tap it on card readers at ticket gates and checkout counters. The balance is deducted automatically — no need to buy individual tickets.
          </p>
          <p className={styles.bodyText}>
            IC cards work on virtually every form of public transport in Japan: JR trains, Tokyo Metro, private railways, city buses, and even some taxis. Beyond transport, they&apos;re accepted at all major convenience store chains (7-Eleven, FamilyMart, Lawson) and most vending machines.
          </p>
          <p className={styles.bodyText}>
            The two most common IC cards for tourists are <strong>Suica</strong> (issued by JR East) and <strong>Pasmo</strong> (issued by Tokyo Metro and private rail operators). Both work nationwide on the same interoperable network — in practice, there&apos;s almost no difference for tourists.
          </p>
        </section>

        {/* Suica vs Pasmo */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Suica vs Pasmo: Which Should You Get?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Suica</th>
                    <th>Pasmo</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td style={{ fontSize: "0.85rem", color: "#374151" }}>{row.suica}</td>
                      <td style={{ fontSize: "0.85rem", color: "#374151" }}>{row.pasmo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Verdict:</strong> Get whichever is available first. Both work equally well across Japan. Suica is slightly more versatile for mobile wallet use on iPhone — if you want Apple Pay, go with Suica.
          </p>
        </section>

        {/* How to Get an IC Card */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Get an IC Card</h2>
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

        {/* Where Can I Use an IC Card? */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Where Can I Use an IC Card?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Works Here</p>
              <ul className={styles.pickList}>
                {worksOn.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Does Not Work For</p>
              <ul className={styles.pickList}>
                {doesNotWork.map((item) => (
                  <li key={item}><span className={styles.conIcon}>✗</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Mobile Suica */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Digital option</span>
          <h2 className={styles.sectionTitle}>Mobile Suica</h2>
          <p className={styles.bodyText}>
            Mobile Suica lets you add Suica to your smartphone via Apple Pay or Google Pay — no physical card needed. You can top up using a foreign credit or debit card and tap your phone at any IC card reader across Japan.
          </p>
          <div className={styles.whoForGrid}>
            {mobileSections.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Returning Your IC Card */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you leave</span>
          <h2 className={styles.sectionTitle}>Returning Your IC Card</h2>
          <p className={styles.bodyText}>
            If you want your ¥500 deposit back before leaving Japan, return your card to any JR ticket office (Midori no Madoguchi) or an IC card return machine at major stations.
          </p>
          <p className={styles.bodyText}>
            You&apos;ll receive your ¥500 deposit plus any remaining balance, minus a ¥220 handling fee. If the remaining balance is less than ¥220, only the deposit is returned.
          </p>
          <p className={styles.bodyText}>
            Alternatively, keep the card for your next Japan trip — IC card balances don&apos;t expire. Mobile Suica balances also carry over between trips.
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
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <div className={styles.relatedCardSoon}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Money in Japan 2026: Cash vs Card Guide</p>
                <span className={styles.relatedSoon}>Coming soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Don&apos;t forget your eSIM</h2>
            <p className={styles.ctaBannerDesc}>
              An IC card handles your transport payments — a Japan eSIM handles your connectivity.
              Get set up before you fly.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              Find the Best eSIM for Japan →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
