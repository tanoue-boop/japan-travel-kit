import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { hreflangLinks } from "./Hreflang";
import { EsimCtaBottom, EsimCtaTop } from "./EsimCta";
import { articleJsonLd } from "../lib/structured-data";
import type { PageUpdated } from "../lib/page-dates";
import type { KlookTour } from "../lib/klook-links";

/**
 * One page = one Klook product (task jtk-20261127-A35).
 *
 * Why this exists. The pages that book on this site sell one product each
 * (hakone-free-pass, tokyo-go-kart, sagano-romantic-train-tickets), and A35 adds
 * up to ten such pages a day for 5%-band products that had no page of their own.
 * Every one of them has the same skeleton — answer first, the product's own Klook
 * button, an official price table, two or three same-day bookings, FAQ — so the
 * skeleton lives here and each page file holds only its checked facts and copy.
 *
 * Internal links are passed in as JSX (`links`, and `<Link href="…">` inside
 * section bodies) so scripts/check-internal-links.js still sees them as literal
 * hrefs in the page's own source. The `related` cards are rendered from data, so
 * a page should never rely on them alone for its inbound/outbound link counts.
 */

const SITE = "https://www.japan-travel-kit.com";

export type GuideTable = {
  head: string[];
  rows: string[][];
  /** Small print under the table: date checked and the official source. */
  note?: ReactNode;
};

export type GuideSection = {
  label: string;
  /** H2 — phrased as the question the reader typed. */
  title: string;
  body: ReactNode;
  table?: GuideTable;
  /** Optional Klook buttons under the section (the page's own product). */
  ctas?: { href: string; label: string }[];
};

export type ProductTicketGuideProps = {
  route: string;
  category: { name: string; href: "/guides/transport" | "/guides/attractions" };
  /** Short name for the breadcrumb and JSON-LD. */
  crumb: string;
  title: string;
  description: string;
  h1: ReactNode;
  subtitle: string;
  badges: string[];
  updated: PageUpdated;
  /** The answer paragraph(s) — price, hours/validity and how to book. */
  answer: ReactNode;
  main: { href: string; label: string };
  stats: { label: string; value: string }[];
  verdict: ReactNode;
  sections: GuideSection[];
  sameDay: { heading: string; intro: string; tours: KlookTour[] };
  /** Paragraph of internal links to the area guides and itineraries. */
  links: ReactNode;
  faq: { q: string; a: string }[];
  related: { href: string; title: string }[];
  banner: { title: string; desc: string; label: string };
};

const Chevron = () => (
  <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

function Table({ table }: { table: GuideTable }) {
  return (
    <>
      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {table.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, i) => (
                    <td key={i} className={i === 0 ? styles.tdProvider : undefined} style={i === 0 ? undefined : { fontSize: "0.88rem" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {table.note ? (
        <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          {table.note}
        </p>
      ) : null}
    </>
  );
}

export default function ProductTicketGuide(p: ProductTicketGuideProps) {
  const url = `${SITE}${p.route}`;
  return (
    <>
      <Head>
        <title>{p.title}</title>
        <meta name="description" content={p.description} />
        <link rel="canonical" href={url} />
        {hreflangLinks(p.route)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={p.title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={p.description} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={p.title} />
        <meta name="twitter:description" content={p.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: p.faq.map((item) => ({
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
            __html: articleJsonLd({ route: p.route, headline: p.title, description: p.description, updated: p.updated }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE },
                { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
                { "@type": "ListItem", position: 3, name: p.category.name, item: `${SITE}${p.category.href}` },
                { "@type": "ListItem", position: 4, name: p.crumb, item: url },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <Chevron /><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <Chevron /><span className="sr-only"> / </span>
          <Link href={p.category.href} className={styles.breadLink}>{p.category.name}</Link>
          <Chevron /><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>{p.crumb}</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {p.updated.label}</p>
          <h1 className={styles.heroTitle}>{p.h1}</h1>
          <p className={styles.heroSubtitle}>{p.subtitle}</p>
          <div className={styles.heroBadges}>
            {p.badges.map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links. We may earn a
            small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <section className={styles.bodySection}>
          {p.answer}
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={p.main.href} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              {p.main.label}
            </KlookLink>
          </div>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {p.stats.map((s) => (
                <div key={s.label} className={styles.verdictStat}>
                  <p className={styles.verdictStatLabel}>{s.label}</p>
                  <p className={styles.verdictStatValue}>{s.value}</p>
                </div>
              ))}
            </div>
            <p className={styles.verdictText}>{p.verdict}</p>
            <KlookLink href={p.main.href} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              {p.main.label}
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        {p.sections.map((s) => (
          <section key={s.title} className={s.table ? styles.comparisonSection : styles.bodySection}>
            <span className={styles.sectionLabel}>{s.label}</span>
            <h2 className={styles.sectionTitle}>{s.title}</h2>
            {s.body}
            {s.table ? <Table table={s.table} /> : null}
            {s.ctas?.length ? (
              <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
                {s.ctas.map((c) => (
                  <KlookLink key={c.label} href={c.href} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                    {c.label}
                  </KlookLink>
                ))}
              </div>
            ) : null}
          </section>
        ))}

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Same trip, same day</span>
          <h2 className={styles.sectionTitle}>{p.sameDay.heading}</h2>
          <p className={styles.bodyText}>{p.sameDay.intro}</p>
          <div className={styles.relatedGrid}>
            {p.sameDay.tours.map((tour) => (
              <KlookLink key={tour.url} href={tour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18l6-13 5 8 3-4 4 9z" />
                    <line x1="2" y1="21" x2="22" y2="21" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{tour.title}</p>
                  <span className={styles.relatedArrow}>{tour.desc} · View on Klook →</span>
                </div>
              </KlookLink>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>{p.links}</section>

        <EsimCtaBottom />

        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
          <div className={styles.faqList}>
            {p.faq.map((item, i) => (
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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {p.related.map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="14" rx="3" />
                    <line x1="4" y1="10" x2="20" y2="10" />
                    <path d="M7 21l2-4M17 21l-2-4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>{p.banner.title}</h2>
            <p className={styles.ctaBannerDesc}>{p.banner.desc}</p>
            <KlookLink href={p.main.href} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              {p.banner.label}
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
