import { Fragment } from "react";
import Link from "next/link";
import styles from "../styles/BestEsimJapan.module.css";
import { SITE_URL } from "../lib/structured-data";

/**
 * The repeated furniture of a 繁體中文 guide page: breadcrumb, affiliate
 * disclosure, FAQ accordion and the "keep reading" grid.
 *
 * The English pages each carry their own copy of this markup — eleven lines of
 * chevron SVG per breadcrumb, repeated 74 times. The Chinese edition starts from
 * one component instead, because the three strings that differ between its pages
 * (the trail, the disclosure, the FAQ) are the only things that actually differ.
 * Same CSS module as the English pages, so the two editions look identical.
 */

function BreadSep() {
  return (
    <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export type ZhCrumb = {
  /** Omitted on the last crumb, which is the current page. */
  href?: string;
  label: string;
};

/**
 * The trail every Chinese guide page starts from. The first two crumbs are the
 * Chinese hub, not the English home page — a reader who taps "back" from a
 * Chinese article should stay in Chinese.
 */
export const ZH_TRAIL_BASE: ZhCrumb[] = [{ href: "/zh-tw/guides/attractions", label: "日本景點門票" }];

export function ZhBreadcrumb({ trail }: { trail: ZhCrumb[] }) {
  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbInner}>
        {trail.map((crumb, i) => (
          // Fragment, not a wrapper element: breadcrumbInner lays its children out
          // directly, so an extra box between it and the links would break the row.
          <Fragment key={crumb.label}>
            {i > 0 && <BreadSep />}
            {crumb.href ? (
              <Link href={crumb.href} className={styles.breadLink}>{crumb.label}</Link>
            ) : (
              <span className={styles.breadCurrent}>{crumb.label}</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** BreadcrumbList JSON-LD for the same trail, so the two cannot drift apart. */
export function zhBreadcrumbJsonLd(trail: ZhCrumb[], currentRoute: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href ?? currentRoute}`,
    })),
  });
}

/**
 * The affiliate disclosure, in Chinese, with the same wording obligation as the
 * English one. It links to the English /disclaimer because that page is not
 * translated yet — and says so, rather than letting the link surprise anyone.
 */
export function ZhDisclosure() {
  return (
    <div className={styles.disclosure}>
      <p className={styles.disclosureText}>
        <strong>聯盟行銷聲明：</strong>本頁部分連結為聯盟行銷連結。若您透過這些連結預訂，我們可能獲得少許分潤，
        您支付的價格不會因此增加。{" "}
        <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>完整聲明（英文）→</Link>
      </p>
    </div>
  );
}

export type ZhFaqItem = { q: string; a: string };

export function ZhFaqList({ items, heading = "常見問題" }: { items: ZhFaqItem[]; heading?: string }) {
  return (
    <section className={styles.faqSection}>
      <span className={styles.sectionLabel}>FAQ</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <div className={styles.faqList}>
        {items.map((item, i) => (
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
  );
}

/** FAQPage JSON-LD from the same items the accordion renders. */
export function zhFaqJsonLd(items: ZhFaqItem[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });
}

export type ZhRelatedItem = { href: string; title: string };

/**
 * "延伸閱讀". Every href here points at another Chinese page — the ten pages of
 * this edition cross-link only to each other, so a reader never leaves Chinese
 * through a link that looks Chinese.
 */
export function ZhRelated({ items }: { items: ZhRelatedItem[] }) {
  return (
    <section className={styles.relatedSection}>
      <span className={styles.sectionLabel}>延伸閱讀</span>
      <h2 className={styles.sectionTitle}>其他攻略</h2>
      <div className={styles.relatedGrid}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={styles.relatedCard}>
            <div className={styles.relatedIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                <path d="M13 6v2M13 11v2M13 16v2" />
              </svg>
            </div>
            <div className={styles.relatedMeta}>
              <p className={styles.relatedTitle}>{item.title}</p>
              <span className={styles.relatedArrow}>看攻略 →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** The one place the Klook `rel` is written, so no page can forget "sponsored". */
export const KLOOK_REL = "sponsored noopener";
