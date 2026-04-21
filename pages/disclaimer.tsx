import Head from "next/head";
import Link from "next/link";
import styles from "../styles/LegalPage.module.css";

const UPDATED = "April 20, 2026";

const affiliateNetworks = [
  {
    name: "Airalo",
    desc: "eSIM marketplace. We earn a commission on eSIM purchases made through our Airalo links.",
  },
  {
    name: "IIJmio",
    desc: "Japanese mobile carrier. Commissions are earned on SIM card and data plan purchases.",
  },
  {
    name: "Klook",
    desc: "Travel activities & SIM cards platform. Commissions are earned on bookings made via our links.",
  },
  {
    name: "Sakura Mobile",
    desc: "Foreigner-friendly SIM card service in Japan. Commissions are earned on plan purchases.",
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <Head>
        <title>Affiliate Disclaimer | Japan Travel Kit</title>
        <meta name="description" content="Affiliate disclosure and disclaimer for Japan Travel Kit. Learn about our affiliate relationships with Airalo, Klook, IIJmio, and Sakura Mobile." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Disclaimer</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 className={styles.title}>Disclaimer &amp; Affiliate Disclosure</h1>
          <p className={styles.meta}>Last updated: {UPDATED}</p>
        </div>
      </section>

      <div className={styles.body}>
        <div className={styles.highlight}>
          <strong>FTC Disclosure:</strong> Japan Travel Kit participates in affiliate programs and may earn commissions from qualifying purchases made through links on this site. This is at <strong>no extra cost to you</strong>. Our editorial opinions are our own and are not influenced by affiliate relationships.
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Affiliate Disclosure</h2>
          <p className={styles.text}>
            Japan Travel Kit (<strong>japan-travel-kit.com</strong>) is a participant in several affiliate marketing programs. This means that when you click on certain links on this website and make a purchase or sign up for a service, we may receive a referral commission from the merchant — at <strong>no additional cost to you</strong>.
          </p>
          <p className={styles.text}>
            This disclosure is provided in accordance with the U.S. Federal Trade Commission (FTC) guidelines on endorsements and testimonials (16 CFR Part 255) and similar regulations in other countries.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Our Affiliate Partners</h2>
          <p className={styles.text}>
            We currently have affiliate relationships with the following companies. Affiliate links from these partners may appear throughout our website, including on product comparison pages and articles.
          </p>

          <div className={styles.networkGrid}>
            {affiliateNetworks.map((n) => (
              <div key={n.name} className={styles.networkCard}>
                <p className={styles.networkName}>{n.name}</p>
                <p className={styles.networkDesc}>{n.desc}</p>
              </div>
            ))}
          </div>

          <p className={styles.text}>
            We may add or remove affiliate partners over time. This page will be updated to reflect any material changes.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How Affiliate Links Work</h2>
          <p className={styles.text}>
            When you click an affiliate link on Japan Travel Kit, a tracking cookie is placed in your browser. If you complete a qualifying purchase or action within the cookie window, we receive a small commission from the merchant.
          </p>
          <p className={styles.text}>
            The price you pay is <strong>identical</strong> whether you use our affiliate link or navigate directly to the merchant&apos;s website. Affiliate commissions are paid by the merchant, not added to your purchase price.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Our Editorial Independence</h2>
          <p className={styles.text}>
            Affiliate relationships <strong>do not</strong> influence our rankings, reviews, or recommendations. We evaluate products based on:
          </p>
          <ul className={styles.list}>
            <li>Price and value for money</li>
            <li>Network coverage and connection speed</li>
            <li>Ease of setup and use for foreign travelers</li>
            <li>Quality of customer support</li>
            <li>User reviews and our own testing</li>
          </ul>
          <p className={styles.text}>
            We recommend products we genuinely believe will benefit our readers. If a product we have an affiliate relationship with does not meet our standards, we will say so — or not recommend it at all.
          </p>
          <p className={styles.text}>
            We do <strong>not</strong> accept payment for positive reviews, sponsored rankings, or guaranteed placement. Our top picks reflect honest editorial judgment.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Price Accuracy</h2>
          <p className={styles.text}>
            Prices displayed on Japan Travel Kit are provided for informational purposes and were accurate at the time of writing. Prices and product availability are subject to change without notice. Always verify the current price on the merchant&apos;s official website before making a purchase.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. General Disclaimer</h2>
          <p className={styles.text}>
            The information on Japan Travel Kit is provided for general informational purposes only. While we make every effort to ensure accuracy, we make no warranties or representations — express or implied — about the completeness, accuracy, reliability, or suitability of the information on this site.
          </p>
          <p className={styles.text}>
            Travel conditions, prices, laws, and regulations can change rapidly. Japan Travel Kit is not responsible for any loss or damages arising from reliance on the information provided on this website. Always verify critical travel information (e.g., visa requirements, entry rules) with official government sources before traveling.
          </p>
          <p className={styles.text}>
            Japan Travel Kit is an independent publication and is not affiliated with, endorsed by, or officially connected to any Japanese government agency, tourism body, or carrier.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Third-Party Websites</h2>
          <p className={styles.text}>
            Our website contains links to third-party websites. These links are provided for your convenience. We have no control over the content or privacy practices of those sites and accept no responsibility for them. Linking to a third-party website does not imply endorsement of its content or policies.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Advertising</h2>
          <p className={styles.text}>
            Japan Travel Kit may display advertisements served by <strong>Google AdSense</strong>. Google uses cookies to serve ads based on your prior visits to our site and other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: "#c62828" }}>Google Ads Settings</a>.
          </p>
          <p className={styles.text}>
            Advertisements are clearly separated from editorial content. Advertised products are not endorsed by Japan Travel Kit unless specifically stated.
          </p>
        </section>

        <div className={styles.contactBox}>
          <h3>Questions or concerns?</h3>
          <p>
            If you have any questions about our affiliate relationships or this disclaimer, please contact us at{" "}
            <a href="mailto:info@japan-travel-kit.com">info@japan-travel-kit.com</a>.
            We are committed to transparency and will respond within 3 business days.
          </p>
        </div>
      </div>
    </>
  );
}
