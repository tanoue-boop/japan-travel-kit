import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/BestEsimJapan.module.css";
import { SITE_URL } from "../lib/structured-data";
import { LOCALE_PREFIX, translatedLocaleOf, type TranslatedLocale } from "../lib/i18n";

/**
 * The repeated furniture of a translated guide page: breadcrumb, affiliate
 * disclosure, FAQ accordion and the "keep reading" grid.
 *
 * The English pages each carry their own copy of this markup — eleven lines of
 * chevron SVG per breadcrumb, repeated 74 times. The translated editions start from
 * one component instead, because the three strings that differ between its pages
 * (the trail, the disclosure, the FAQ) are the only things that actually differ.
 * Same CSS module as the English pages, so every edition looks identical.
 *
 * Named ZhChrome until 2026-10-21, when 한국어 and ไทย joined the two Chinese
 * editions and the name stopped being true. Nothing about the mechanism changed.
 *
 * The handful of fixed words this file owns exist once per language in COPY below.
 * Which set renders is resolved from the route — the same way Header and Footer do
 * it — rather than passed down as a prop through all thirty pages: a page under
 * /zh-cn cannot then accidentally render 繁體 chrome around 简体 body text, and a
 * page under /th cannot render Korean.
 */

type Copy = {
  disclosureLabel: string;
  disclosureText: string;
  disclosureLink: string;
  faqHeading: string;
  relatedLabel: string;
  relatedTitle: string;
  relatedArrow: string;
};

const COPY: Record<TranslatedLocale, Copy> = {
  "zh-tw": {
    disclosureLabel: "聯盟行銷聲明：",
    disclosureText:
      "本頁部分連結為聯盟行銷連結。若您透過這些連結預訂，我們可能獲得少許分潤，您支付的價格不會因此增加。",
    disclosureLink: "完整聲明（英文）→",
    faqHeading: "常見問題",
    relatedLabel: "延伸閱讀",
    relatedTitle: "其他攻略",
    relatedArrow: "看攻略 →",
  },
  "zh-cn": {
    disclosureLabel: "推广链接声明：",
    disclosureText:
      "本页部分链接为推广联盟链接。若您通过这些链接预订，我们可能获得少量分成，您支付的价格不会因此增加。",
    disclosureLink: "完整声明（英文）→",
    faqHeading: "常见问题",
    relatedLabel: "延伸阅读",
    relatedTitle: "其他攻略",
    relatedArrow: "看攻略 →",
  },
  ko: {
    disclosureLabel: "제휴 링크 안내: ",
    disclosureText:
      "이 페이지의 일부 링크는 제휴 링크입니다. 이 링크로 예약하시면 저희가 소액의 수수료를 받을 수 있으며, 고객님이 지불하는 금액은 달라지지 않습니다.",
    disclosureLink: "전체 고지 사항(영어) →",
    faqHeading: "자주 묻는 질문",
    relatedLabel: "함께 읽기",
    relatedTitle: "다른 가이드",
    relatedArrow: "가이드 보기 →",
  },
  th: {
    disclosureLabel: "การเปิดเผยลิงก์พันธมิตร: ",
    disclosureText:
      "ลิงก์บางส่วนในหน้านี้เป็นลิงก์พันธมิตร หากคุณจองผ่านลิงก์เหล่านี้ เราอาจได้รับค่าตอบแทนเล็กน้อย โดยราคาที่คุณจ่ายไม่เพิ่มขึ้น",
    disclosureLink: "ข้อความเปิดเผยฉบับเต็ม (ภาษาอังกฤษ) →",
    faqHeading: "คำถามที่พบบ่อย",
    relatedLabel: "อ่านต่อ",
    relatedTitle: "ไกด์อื่น ๆ",
    relatedArrow: "ดูไกด์ →",
  },
};

/** The copy set for the page currently rendering. */
function useCopy(): Copy {
  return COPY[translatedLocaleOf(useRouter().pathname)];
}

function BreadSep() {
  return (
    <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export type Crumb = {
  /** Omitted on the last crumb, which is the current page. */
  href?: string;
  label: string;
};

/**
 * The trail every translated guide page starts from, per edition.
 *
 * In Chinese the first crumb is the Chinese hub of the same script, not the English
 * home page — a reader who taps "back" from a 简体 article should stay in 简体. The
 * Korean and Thai editions are five pages with no hub of their own, so their first
 * crumb is the English Things to Do hub, which is the real parent of all five, and
 * it is labelled as English rather than looking like a page in the reader's own
 * language. When those editions get a hub, this is the only line that changes.
 */
export const TRAIL_BASE: Record<TranslatedLocale, Crumb[]> = {
  "zh-tw": [{ href: `${LOCALE_PREFIX["zh-tw"]}/guides/attractions`, label: "日本景點門票" }],
  "zh-cn": [{ href: `${LOCALE_PREFIX["zh-cn"]}/guides/attractions`, label: "日本景点门票" }],
  ko: [{ href: "/guides/attractions", label: "일본 티켓 가이드(영어)" }],
  th: [{ href: "/guides/attractions", label: "ไกด์ตั๋วญี่ปุ่น (ภาษาอังกฤษ)" }],
};

export function Breadcrumb({ trail }: { trail: Crumb[] }) {
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
export function breadcrumbJsonLd(trail: Crumb[], currentRoute: string): string {
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
 * The affiliate disclosure, in the page's language, with the same wording
 * obligation as the English one. It links to the English /disclaimer because that
 * page is not translated yet — and says so, rather than letting the link surprise
 * anyone.
 */
export function Disclosure() {
  const copy = useCopy();
  return (
    <div className={styles.disclosure}>
      <p className={styles.disclosureText}>
        <strong>{copy.disclosureLabel}</strong>
        {copy.disclosureText}{" "}
        <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>{copy.disclosureLink}</Link>
      </p>
    </div>
  );
}

export type FaqItem = { q: string; a: string };

export function FaqList({ items, heading }: { items: FaqItem[]; heading?: string }) {
  const copy = useCopy();
  return (
    <section className={styles.faqSection}>
      <span className={styles.sectionLabel}>FAQ</span>
      <h2 className={styles.sectionTitle}>{heading ?? copy.faqHeading}</h2>
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
export function faqJsonLd(items: FaqItem[]): string {
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

export type RelatedItem = { href: string; title: string };

/**
 * "延伸閱讀" / "함께 읽기" / "อ่านต่อ". Every href here points at another page of the
 * same edition — the pages of an edition cross-link only to each other, so a reader
 * never leaves their own language through a link that looks like it stays. Where an
 * edition has nothing of its own to link (the Korean and Thai sets are five pages),
 * an English destination is labelled as English in the title.
 */
export function Related({ items }: { items: RelatedItem[] }) {
  const copy = useCopy();
  return (
    <section className={styles.relatedSection}>
      <span className={styles.sectionLabel}>{copy.relatedLabel}</span>
      <h2 className={styles.sectionTitle}>{copy.relatedTitle}</h2>
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
              <span className={styles.relatedArrow}>{copy.relatedArrow}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** The one place the Klook `rel` is written, so no page can forget "sponsored". */
export const KLOOK_REL = "sponsored noopener";
