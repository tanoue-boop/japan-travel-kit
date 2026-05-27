import Head from "next/head";
import Link from "next/link";
import styles from "../styles/LegalPage.module.css";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Japan Travel Kit | Independent Japan Travel Resource</title>
        <meta name="description" content="Japan Travel Kit is an independent guide for foreign visitors to Japan, covering eSIMs, transport, and money. Operated by mjo inc., based in Japan." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/about" />
        <meta property="og:title" content="About Japan Travel Kit | Independent Japan Travel Resource" />
        <meta property="og:description" content="Japan Travel Kit is an independent guide for foreign visitors to Japan, covering eSIMs, transport, and money. Operated by mjo inc., based in Japan." />
        <meta property="og:url" content="https://www.japan-travel-kit.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "About", item: "https://www.japan-travel-kit.com/about" },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>About</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>About</span>
          <h1 className={styles.title}>About Japan Travel Kit</h1>
        </div>
      </section>

      <div className={styles.body}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is Japan Travel Kit?</h2>
          <p className={styles.text}>
            Japan Travel Kit is an independent travel resource for foreign visitors to Japan.
            We cover eSIMs, SIM cards, pocket WiFi, transport, and money — all in plain English, before you land.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who runs this site?</h2>
          <p className={styles.text}>
            Japan Travel Kit is operated by <strong>mjo inc.</strong>, a Japan-based company specialising in
            inbound tourism and e-commerce consulting.
            We test and review products independently.
            Some links on this site are affiliate links — we may earn a commission if you make a
            purchase, at no extra cost to you.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Trust Us?</h2>
          <ul className={styles.list}>
            <li>Based in Japan</li>
            <li>Independent reviews</li>
            <li>Regularly updated for 2026</li>
            <li>No paid placements — only honest picks</li>
          </ul>
        </section>

        <div className={styles.contactBox}>
          <h3>Contact</h3>
          <p>
            Questions or feedback? Reach us at{" "}
            <a href="mailto:info@japan-travel-kit.com">info@japan-travel-kit.com</a>
          </p>
        </div>
      </div>
    </>
  );
}
