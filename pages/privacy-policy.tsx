import Head from "next/head";
import Link from "next/link";
import styles from "../styles/LegalPage.module.css";

const UPDATED = "April 20, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Japan Travel Kit</title>
        <meta name="description" content="Privacy Policy for Japan Travel Kit. Learn how we collect, use, and protect your personal information." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Privacy Policy</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.meta}>Last updated: {UPDATED}</p>
        </div>
      </section>

      <div className={styles.body}>
        <div className={styles.highlight}>
          <strong>Plain-English summary:</strong> We do not sell your personal data. We use basic analytics to improve the site and may receive affiliate commissions when you purchase products through our links. Third-party services on this site (Google Analytics, Google AdSense) may use cookies.
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Who We Are</h2>
          <p className={styles.text}>
            Japan Travel Kit (<strong>japan-travel-kit.com</strong>) is an independent travel information website providing practical guides for foreign visitors to Japan. We are operated as an individual publisher based in Japan.
          </p>
          <p className={styles.text}>
            For privacy-related inquiries, please contact us at: <strong>info@japan-travel-kit.com</strong>
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
          <p className={styles.text}>We collect the following types of information:</p>
          <ul className={styles.list}>
            <li><strong>Usage data:</strong> Pages visited, time on site, referring URLs, browser type, and device type — collected automatically via Google Analytics.</li>
            <li><strong>Cookies:</strong> Small text files placed on your device by our site and third-party services (see Section 5).</li>
            <li><strong>Contact information:</strong> If you contact us via email, we collect your email address and message content.</li>
          </ul>
          <p className={styles.text}>
            We do <strong>not</strong> collect names, payment information, or any sensitive personal data through this website.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
          <p className={styles.text}>We use collected data to:</p>
          <ul className={styles.list}>
            <li>Understand how visitors use our site and improve content accordingly</li>
            <li>Display relevant advertisements via Google AdSense</li>
            <li>Analyze which affiliate links and products are most helpful to our readers</li>
            <li>Respond to your inquiries if you contact us</li>
          </ul>
          <p className={styles.text}>
            We do <strong>not</strong> sell, rent, or trade your personal information to third parties.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Affiliate Links & Commission</h2>
          <p className={styles.text}>
            Japan Travel Kit participates in affiliate programs. When you click on certain links and make a purchase or sign up for a service, we may earn a commission at <strong>no additional cost to you</strong>.
          </p>
          <p className={styles.text}>
            Affiliate relationships do not influence our editorial recommendations. We only recommend products and services we believe are genuinely useful for travelers to Japan.
          </p>
          <p className={styles.text}>
            See our full <Link href="/disclaimer" style={{ color: "#c62828", fontWeight: 600 }}>Affiliate Disclaimer</Link> for details.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Cookies & Third-Party Services</h2>
          <p className={styles.text}>The following third-party services may place cookies on your device:</p>
          <ul className={styles.list}>
            <li>
              <strong>Google Analytics:</strong> Tracks site usage statistics. You can opt out via the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "#c62828" }}>Google Analytics Opt-out Browser Add-on</a>.
            </li>
            <li>
              <strong>Google AdSense:</strong> Displays personalized or non-personalized ads. Governed by{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#c62828" }}>Google&apos;s Privacy Policy</a>.
            </li>
            <li>
              <strong>Affiliate networks (Airalo, Klook, etc.):</strong> May set cookies to track referrals. These operate under their own privacy policies.
            </li>
          </ul>
          <p className={styles.text}>
            You can control cookies through your browser settings. Note that disabling cookies may affect site functionality.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Data Retention</h2>
          <p className={styles.text}>
            Analytics data is retained for 26 months by default in Google Analytics. Email correspondence is retained for as long as necessary to resolve your inquiry. We do not store any other personal data.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Your Rights (GDPR & Global)</h2>
          <p className={styles.text}>
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className={styles.list}>
            <li><strong>Access:</strong> Request a copy of any personal data we hold about you.</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data.</li>
            <li><strong>Erasure:</strong> Request deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
            <li><strong>Objection:</strong> Object to processing of your data for certain purposes.</li>
            <li><strong>Portability:</strong> Request transfer of your data in a machine-readable format.</li>
          </ul>
          <p className={styles.text}>
            To exercise any of these rights, please contact us at <strong>info@japan-travel-kit.com</strong>. We will respond within 30 days.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. External Links</h2>
          <p className={styles.text}>
            Our website contains links to external sites (e.g., Airalo, Klook, IIJmio). Once you leave our site, we have no control over and accept no responsibility for those sites&apos; privacy practices. We encourage you to review their privacy policies before providing any personal information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Children&apos;s Privacy</h2>
          <p className={styles.text}>
            Japan Travel Kit is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can delete it.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Changes to This Policy</h2>
          <p className={styles.text}>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
          </p>
        </section>

        <div className={styles.contactBox}>
          <h3>Questions about this policy?</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
            <a href="mailto:info@japan-travel-kit.com">info@japan-travel-kit.com</a>.
            We are happy to help.
          </p>
        </div>
      </div>
    </>
  );
}
