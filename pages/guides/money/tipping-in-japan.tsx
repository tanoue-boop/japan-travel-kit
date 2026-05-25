import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const noTipPlaces = [
  { place: "Restaurants", why: "Service charge is built into all menu prices" },
  { place: "Taxis", why: "Tipping is considered rude — drivers may be offended" },
  { place: "Hotels", why: "Not expected; staff are paid a professional wage" },
  { place: "Convenience stores", why: "Transaction is impersonal; tip would cause confusion" },
  { place: "Barbers & salons", why: "Not customary; price listed is the full price" },
];

const appreciationWays = [
  {
    title: "Say 'Arigatou gozaimasu'",
    desc: "A sincere, clear 'ありがとうございます' means far more to Japanese service staff than money. Make eye contact, speak clearly, and mean it — this is the cultural equivalent of a generous tip.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Bow slightly when leaving",
    desc: "A small bow (15–30 degrees) as you leave a restaurant, hotel, or shop acknowledges the service you've received. You'll see Japanese guests doing this naturally — it's the social currency of gratitude.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7 7 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    title: "Leave a Google review",
    desc: "Japanese businesses value their reputation highly. A positive Google or TripAdvisor review in English reaches a wide audience and is genuinely meaningful — especially for small family-run restaurants and guesthouses.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "Should I tip in Japan?",
    a: "No. Tipping is not part of Japanese culture and is not expected anywhere — from restaurants and taxis to hotels and salons. Service staff are paid a professional wage and are not dependent on tips. In most situations, the best way to show appreciation is a sincere 'arigatou gozaimasu' and a small bow.",
  },
  {
    q: "Is it rude to tip in Japan?",
    a: "In some situations, yes. Leaving cash on the table or trying to hand money to a taxi driver can cause confusion or even offence. Many staff will refuse a tip, sometimes chasing you down the street to return it. In upscale restaurants or traditional ryokan, the attempt may imply you are dissatisfied with the service. It is not malicious, but it is culturally out of place.",
  },
  {
    q: "Do you tip at ryokan in Japan?",
    a: "There is a traditional ryokan practice called 'kokorozuke' (心付け) — a small gratuity presented in an envelope to your assigned host (nakai-san) at the start of your stay. This is entirely optional, increasingly rare even among Japanese guests, and is usually ¥1,000–¥3,000 per person if given. It is a formal gesture, not a casual tip. Many ryokan staff will refuse it politely; if in doubt, simply don't.",
  },
  {
    q: "Do you tip taxi drivers in Japan?",
    a: "No. Japanese taxi drivers are professional workers who expect to receive the metered fare and nothing more. Attempting to tip or telling them to keep the change may cause confusion or embarrassment. Taxi drivers are generally very proud of their service and do not expect or want additional payment. Simply say 'arigatou gozaimasu' when you exit.",
  },
  {
    q: "What should I do instead of tipping in Japan?",
    a: "Express genuine verbal thanks — 'arigatou gozaimasu' — with eye contact and a slight bow. This is culturally meaningful. You can also show appreciation by returning to the same business on a future visit, recommending it to others, or leaving a positive online review. These actions are valued far more than money.",
  },
];

export default function TippingInJapanPage() {
  return (
    <>
      <Head>
        <title>Tipping in Japan 2026: Should You Tip? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Should you tip in Japan? No — and here's why. We explain Japan's no-tipping culture, what happens if you try, and how to show appreciation instead."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/money/tipping-in-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tipping in Japan 2026: Should You Tip? | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/money/tipping-in-japan" />
        <meta property="og:description" content="Should you tip in Japan? No — and here's why. We explain Japan's no-tipping culture, what happens if you try, and how to show appreciation instead." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tipping in Japan 2026: Should You Tip? | Japan Travel Kit" />
        <meta name="twitter:description" content="Should you tip in Japan? No — and here's why. We explain Japan's no-tipping culture, what happens if you try, and how to show appreciation instead." />
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
              headline: "Tipping in Japan (2026): Why You Should Never Tip",
              dateModified: "2026-05-02",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://japan-travel-kit.com",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Tipping in Japan", item: "https://japan-travel-kit.com/guides/money/tipping-in-japan" },
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tipping in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🙏</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Tipping in Japan (2026):<br />Why You Should Never Tip
          </h1>
          <p className={styles.heroSubtitle}>
            Tipping is not just unnecessary in Japan — it can actually cause offence.
            Here&apos;s everything you need to know.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Cultural Guide", "Important to Know"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tipping in Japan</p>
                <p className={styles.verdictStatValue}>Not expected, not required</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Can it cause offence?</p>
                <p className={styles.verdictStatValue}>Yes, in some situations</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>What to do instead</p>
                <p className={styles.verdictStatValue}>Say &ldquo;thank you&rdquo; sincerely</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> Do not tip in Japan. It is not part of the culture,
              it can cause confusion or embarrassment, and staff are professionally compensated
              without it. Some tourist-focused businesses may accept a tip, but it is never expected.
            </p>
          </div>
        </div>

        {/* Why You Don't Tip in Japan */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Culture</span>
          <h2 className={styles.sectionTitle}>Why You Don&apos;t Tip in Japan</h2>
          <p className={styles.bodyText}>
            Japan operates on a service philosophy rooted in the concept of <strong>omotenashi</strong>
            — wholehearted hospitality given without expectation of reward. Service in Japan is not
            a transaction; it is a matter of professional pride. From the ramen chef who has spent
            decades perfecting their broth to the taxi driver who wears white gloves, service excellence
            is simply the standard — not something that requires additional payment.
          </p>
          <p className={styles.bodyText}>
            The phrase <strong>「お客様は神様」</strong> (<em>okyaku-sama wa kamisama</em> — &ldquo;the customer
            is a god&rdquo;) captures this ethos. Staff are expected to deliver exceptional service as
            a matter of course. Attempting to pay extra for this can inadvertently imply that you
            are surprised by the quality — or worse, that you feel the standard service was
            insufficient.
          </p>
          <p className={styles.bodyText}>
            Crucially, Japanese service workers receive a professional wage that is not supplemented
            by tips. The price on the menu, the meter in the taxi, the rate at the hotel — these
            is the total cost. There is no hidden expectation of gratuity built into the system.
          </p>
          <p className={styles.bodyText}>
            Many staff will politely but firmly refuse a tip. Some will chase you down the street
            to return money you left on a table. This is not unusual — it is the expected response.
          </p>
        </section>

        {/* What Happens If You Try to Tip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What to expect</span>
          <h2 className={styles.sectionTitle}>What Happens If You Try to Tip?</h2>
          <p className={styles.bodyText}>
            In the vast majority of cases, your tip will be politely refused. Staff will return
            the money with both hands, a bow, and a phrase like <em>&ldquo;Iie, kekkou desu&rdquo;</em>
            (no, thank you). This is not rudeness — it is the culturally correct response.
          </p>
          <p className={styles.bodyText}>
            Depending on the context, attempting to tip can also cause visible discomfort.
            A server who does not understand why you are leaving extra money may wonder
            whether you received the wrong change, whether something went wrong, or whether
            you need assistance. The interaction becomes awkward for everyone involved.
          </p>
          <p className={styles.bodyText}>
            In tourist-heavy areas — particularly in parts of Tokyo, Osaka, and Kyoto that
            cater primarily to foreign visitors — some staff have become accustomed to the
            practice and may accept a tip without visible discomfort. But this is not
            universal, and it is still not expected.
          </p>
        </section>

        {/* Where You Should NOT Tip */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Never tip here</span>
          <h2 className={styles.sectionTitle}>Where You Absolutely Should NOT Tip</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Place", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {noTipPlaces.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Exceptions */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Exceptions</span>
          <h2 className={styles.sectionTitle}>Are There Any Exceptions?</h2>
          <p className={styles.bodyText}>
            There are a few nuanced situations where extra payment is culturally recognised —
            though still entirely optional:
          </p>
          <ul className={styles.bodyList}>
            <li>
              <strong>Kokorozuke at traditional ryokan:</strong> A small gratuity in an envelope
              (¥1,000–¥3,000 per person) may be presented to your personal host (nakai-san)
              at the beginning of your stay at a high-end ryokan. This is a formal gesture with
              its own etiquette — it is placed in an envelope, not handed over as cash —
              and is increasingly rare even among Japanese guests. Most ryokan staff will refuse it.
            </li>
            <li>
              <strong>Private tour guides:</strong> For private or semi-private guided tours,
              a small voluntary gratuity at the end is accepted in some contexts, particularly
              if the guide is working independently rather than for a large tour company.
              This is more common on international tours where the expectation has been introduced
              by foreign clients.
            </li>
            <li>
              <strong>Some foreign-facing businesses:</strong> A small number of tourist-oriented
              businesses in major cities have adapted to foreign customs and may accept a tip
              without incident. This is the exception, not the rule.
            </li>
          </ul>
        </section>

        {/* How to Show Appreciation */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Instead of tipping</span>
          <h2 className={styles.sectionTitle}>How to Show Appreciation in Japan</h2>
          <div className={styles.whoForGrid}>
            {appreciationWays.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            Becoming a repeat customer is perhaps the highest compliment in Japanese service culture.
            Returning to the same restaurant, the same ryokan, or the same barber on a future trip
            signals that you valued the experience — and means far more than any monetary gesture.
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
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): What Actually Works?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget Guide (2026): How Much Does Japan Cost?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="18" rx="2" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Where to Find Them &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning your Japan trip budget?</h2>
            <p className={styles.ctaBannerDesc}>
              From tipping etiquette to ATMs and currency exchange — we cover
              everything you need to manage money in Japan.
            </p>
            <Link href="/guides/money" className={styles.ctaBannerBtn}>
              View All Money Guides →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
