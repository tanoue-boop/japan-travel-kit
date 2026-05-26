import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const paymentMethods = [
  {
    method: "IC Card (Suica/Pasmo)",
    trains: "✓",
    convenience: "✓",
    restaurants: "Partial",
    taxis: "Partial",
    stores: "Partial",
  },
  {
    method: "Contactless Card (Visa/MC)",
    trains: "✗",
    convenience: "✓",
    restaurants: "✓",
    taxis: "Partial",
    stores: "✓",
  },
  {
    method: "QR Pay (PayPay etc.)",
    trains: "✗",
    convenience: "✓",
    restaurants: "✓",
    taxis: "✗",
    stores: "✓",
  },
];

const suicaSteps = [
  {
    title: "Get a Suica card",
    desc: "Buy a Welcome Suica at Narita or Haneda airport on arrival (no deposit required), or order a Suica via Klook before you fly and collect it on arrival.",
  },
  {
    title: "Load credit at a ticket machine",
    desc: "Top up at any JR station machine. Most accept Visa and Mastercard. Add ¥2,000–¥5,000 for a full day of transit and convenience store shopping.",
  },
  {
    title: "Tap to ride trains and buses",
    desc: "Touch your card to the IC reader on entry and on exit. The correct fare is deducted automatically — no need to select a destination.",
  },
  {
    title: "Pay at convenience stores and vending machines",
    desc: "At checkout, tell the cashier 'Suica' or hold your card near the reader. Works at 7-Eleven, Lawson, FamilyMart, and most vending machines across Japan.",
  },
];

const faqItems = [
  {
    q: "Do contactless payments work on Japanese trains?",
    a: "Only IC cards (Suica, Pasmo, ICOCA) work on Japanese trains and subways. Standard Visa or Mastercard contactless does not work at JR or Tokyo Metro ticket gates. You must use a physical IC card — or the Suica feature loaded into Apple Pay or Google Pay.",
  },
  {
    q: "Can I use Apple Pay or Google Pay in Japan?",
    a: "Yes — but specifically for IC card functionality. Add Suica or Pasmo to Apple Wallet (Wallet app → + → Transit Card → Suica) and you can tap to ride any train and pay at convenience stores. Standard Apple Pay at retail terminals is growing but not universal. The Suica in Apple Pay works on iPhone 7 and later.",
  },
  {
    q: "Does Visa or Mastercard contactless work in Japan?",
    a: "Yes, at most major retailers, restaurants, hotels, and department stores. However, it does NOT work on trains, subways, or most local buses. For transit you still need an IC card. Acceptance at smaller shops varies — carry some cash as a backup.",
  },
  {
    q: "What's the difference between Suica and Pasmo?",
    a: "Suica is issued by JR East; Pasmo is issued by Tokyo Metro and private railways. In practice, both are accepted interchangeably on all trains and buses across Japan and at all IC card payment terminals. The brand doesn't matter — either works everywhere.",
  },
  {
    q: "Can tourists use PayPay or LINE Pay in Japan?",
    a: "It's possible, but not straightforward. PayPay requires a Japanese phone number and bank account for full top-up functionality, though limited tourist support launched in 2024. LINE Pay has similar restrictions. For most tourists, a Suica IC card and a contactless Visa or Mastercard will cover everything you need — skip QR pay entirely.",
  },
];

const canonicalUrl = "https://japan-travel-kit.com/guides/money/contactless-payment-japan";

export default function ContactlessPaymentJapanPage() {
  return (
    <>
      <Head>
        <title>Contactless Payment in Japan (2026) | Japan Travel Kit</title>
        <meta
          name="description"
          content="Which contactless payment methods actually work in Japan? IC cards, QR pay, and tap-to-pay credit cards — explained clearly for tourists visiting in 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Contactless Payment in Japan (2026): What Actually Works" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:description" content="Which contactless payment methods actually work in Japan? IC cards, QR pay, and tap-to-pay credit cards — explained clearly for tourists." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contactless Payment in Japan (2026): What Actually Works" />
        <meta name="twitter:description" content="Which contactless payment methods actually work in Japan? IC cards, QR pay, and tap-to-pay credit cards — explained clearly for tourists." />
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
              headline: "Contactless Payment in Japan (2026): IC Cards, QR Pay & Tap-to-Pay Explained",
              dateModified: "2026-05-26",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money", item: "https://japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Contactless Payment in Japan", item: canonicalUrl },
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
          <Link href="/guides/money" className={styles.breadLink}>Money</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Contactless Payment in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💳</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Contactless Payment in Japan (2026):<br />What Actually Works
          </h1>
          <p className={styles.heroSubtitle}>
            IC cards, QR pay, and tap-to-pay — a clear guide for tourists.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Independently Written", "For Foreign Visitors"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our editorial recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Contactless Payments in Japan: The Short Version</h2>
          <p className={styles.bodyText}>
            Japan has three main contactless payment systems: IC cards (Suica, Pasmo, ICOCA), QR pay apps (PayPay, LINE Pay), and tap-to-pay credit cards (Visa, Mastercard). For tourists, only two of these are practical.
          </p>
          <p className={styles.bodyText}>
            <strong>IC cards work everywhere that matters.</strong> Trains, buses, convenience stores, vending machines, taxis — a Suica card covers daily transit and small purchases from the moment you land. It&apos;s the single most useful thing to have in Japan.
          </p>
          <p className={styles.bodyText}>
            <strong>Contactless credit cards work at major retailers.</strong> Department stores, larger restaurants, hotels, and supermarkets increasingly accept Visa and Mastercard contactless. But they don&apos;t work on trains.
          </p>
          <p className={styles.bodyText}>
            <strong>QR pay is mostly for residents.</strong> PayPay and LINE Pay require a Japanese bank account for full functionality. Most tourists should skip them entirely.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Where Each Payment Method Works</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Method", "Trains & Buses", "Convenience Stores", "Restaurants", "Taxis", "Department Stores"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((m) => (
                    <tr key={m.method}>
                      <td className={styles.tdProvider}>{m.method}</td>
                      <td>{m.trains}</td>
                      <td>{m.convenience}</td>
                      <td>{m.restaurants}</td>
                      <td>{m.taxis}</td>
                      <td>{m.stores}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* IC Card section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Method 1</span>
          <h2 className={styles.sectionTitle}>IC Cards (Suica & Pasmo): The Essential Tool</h2>
          <p className={styles.bodyText}>
            An IC card is a rechargeable contactless card that works as both a transit pass and a small-value payment card. Suica is issued by JR East; Pasmo by Tokyo Metro and private railways. Both are accepted interchangeably on all trains, buses, and at IC card payment terminals across Japan.
          </p>
          <p className={styles.bodyText}>
            IC cards are the <strong>only</strong> contactless method accepted at train and subway gates. They also work at every 7-Eleven, Lawson, and FamilyMart, most vending machines, and an increasing number of taxis and restaurants.
          </p>
          <p className={styles.bodyText}>
            You can add Suica to Apple Wallet or Google Pay and use your phone to tap — no physical card required. This works on iPhone 7 and later, and on most modern Android phones that support NFC.
          </p>
          <a
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Get Suica on Klook →
          </a>
        </section>

        {/* Tap-to-pay section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Method 2</span>
          <h2 className={styles.sectionTitle}>Tap-to-Pay Credit Cards: Good for Shopping</h2>
          <p className={styles.bodyText}>
            Visa and Mastercard contactless are now widely accepted at major retailers, department stores, hotels, and most restaurants in tourist areas. Look for the contactless symbol (four curved lines) at the payment terminal and tap your card or phone.
          </p>
          <p className={styles.bodyText}>
            The key limitation: contactless credit cards do <strong>not</strong> work on trains, subways, or most buses. Tapping your credit card at a JR or Tokyo Metro gate will not work — you need an IC card for transit.
          </p>
          <p className={styles.bodyText}>
            American Express contactless is less widely accepted in Japan than Visa or Mastercard. If your wallet has both, use Visa for the broadest acceptance.
          </p>
        </section>

        {/* QR Pay section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Method 3</span>
          <h2 className={styles.sectionTitle}>QR Pay: Skip It as a Tourist</h2>
          <p className={styles.bodyText}>
            Japan&apos;s QR pay ecosystem — PayPay, LINE Pay, Rakuten Pay, au PAY — is enormous. Most small restaurants, markets, and local shops accept at least one of them. PayPay alone is accepted at over 6 million locations.
          </p>
          <p className={styles.bodyText}>
            The problem for tourists: full PayPay functionality requires a Japanese bank account or phone number. While PayPay launched limited tourist support in 2024, the setup process is cumbersome compared to simply tapping a Suica card.
          </p>
          <p className={styles.bodyText}>
            Unless you&apos;re on an extended stay and encounter specific shops that refuse cards, skip QR pay entirely. A Suica plus a contactless Visa or Mastercard covers 95% of tourist spending.
          </p>
        </section>

        {/* How to get Suica steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Getting started</span>
          <h2 className={styles.sectionTitle}>How to Get and Use a Suica Card</h2>
          <div className={styles.stepsList}>
            {suicaSteps.map((step, i) => (
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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M6 9h4M6 13h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Don&apos;t forget your eSIM for Japan</h2>
            <p className={styles.ctaBannerDesc}>
              Have working data before you land — use Google Maps and translation apps from the airport without hunting for Wi-Fi.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              Best eSIM for Japan →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
