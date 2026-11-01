import styles from "../styles/BestEsimJapan.module.css";
import { gygLink, GYG_REL, type GygListing } from "../lib/gyg-links";
import { useComponentLocale } from "./componentLocale";
import type { Locale } from "../lib/i18n";

/**
 * The fixed strings, once per language (2026-11-01, task jtk-20261101-A15). The
 * English ones are unchanged. GetYourGuide's URLs are not localised here: its
 * language follows the reader's own settings, and no locale path for these
 * listings could be confirmed (GetYourGuide answers automated reads with 403).
 */
const COPY: Record<Locale, { label: string; cta: string }> = {
  en: { label: "Also sold elsewhere", cta: "Compare on GetYourGuide →" },
  "zh-tw": { label: "其他購買管道", cta: "到 GetYourGuide 比較 →" },
  "zh-cn": { label: "其他购买渠道", cta: "到 GetYourGuide 比较 →" },
  ko: { label: "다른 판매처", cta: "GetYourGuide에서 비교 →" },
  th: { label: "ช่องทางซื้ออื่น", cta: "เทียบราคาบน GetYourGuide →" },
};

/**
 * The listing names and one-line descriptions, translated, for the GetYourGuide
 * listings the translated editions carry — keyed by URL so lib/gyg-links.ts stays the
 * one English record. Each line translates that record's `title`/`what` and adds
 * nothing. A listing missing here renders its English text, as before.
 */
type ListingCopy = { title: string; what: string };
const LISTING_COPY: Partial<Record<Locale, Record<string, ListingCopy>>> = {
  "zh-tw": {
    "https://www.getyourguide.com/tokyo-disney-resort-l104703/entry-tickets-tc123/": { title: "東京迪士尼度假區", what: "東京迪士尼樂園與迪士尼海洋的門票在同一個頁面，皆須指定日期與園區" },
    "https://www.getyourguide.com/tokyo-disneysea-l4082/entry-tickets-tc123/": { title: "東京迪士尼海洋", what: "迪士尼海洋門票的獨立頁面，與迪士尼樂園分開" },
    "https://www.getyourguide.com/universal-studios-japan-l80971/entry-tickets-tc123/": { title: "日本環球影城", what: "GetYourGuide 上的環球影城一日門票，同一頁也有含接送的組合" },
    "https://www.getyourguide.com/osaka-l1204/osaka-universal-studios-japan-express-pass-only-t883811/": { title: "環球影城快速通關", what: "GetYourGuide 單獨販售的快速通關——入園需另買一日門票" },
    "https://www.getyourguide.com/tokyo-l193/day-trips-tc360/mount-fuji-tl7924/": { title: "東京出發的富士山一日遊", what: "GetYourGuide 上從東京出發的富士山一日遊總覽，巴士團與包車都有" },
    "https://www.getyourguide.com/mount-fuji-l7924/bus-minivan-tours-tc4/": { title: "富士山巴士與小巴行程", what: "富士山周邊的併團巴士與小巴行程，集中在同一頁" },
    "https://www.getyourguide.com/tokyo-l193/": { title: "東京", what: "GetYourGuide 在東京販售的所有行程，可依日期搜尋——Klook 售完時的第二個選擇" },
    "https://www.getyourguide.com/tokyo-l193/entry-tickets-tc123/": { title: "東京景點門票", what: "東京目錄中只有門票的部分，對應本頁介紹的景點" },
  },
  "zh-cn": {
    "https://www.getyourguide.com/tokyo-disney-resort-l104703/entry-tickets-tc123/": { title: "东京迪士尼度假区", what: "东京迪士尼乐园与迪士尼海洋的门票在同一个页面，均需指定日期与园区" },
    "https://www.getyourguide.com/tokyo-disneysea-l4082/entry-tickets-tc123/": { title: "东京迪士尼海洋", what: "迪士尼海洋门票的独立页面，与迪士尼乐园分开" },
    "https://www.getyourguide.com/universal-studios-japan-l80971/entry-tickets-tc123/": { title: "日本环球影城", what: "GetYourGuide 上的环球影城一日门票，同一页也有含接送的组合" },
    "https://www.getyourguide.com/osaka-l1204/osaka-universal-studios-japan-express-pass-only-t883811/": { title: "环球影城快速通行证", what: "GetYourGuide 单独销售的快速通行证——入园需另买一日门票" },
    "https://www.getyourguide.com/tokyo-l193/day-trips-tc360/mount-fuji-tl7924/": { title: "东京出发的富士山一日游", what: "GetYourGuide 上从东京出发的富士山一日游汇总，大巴团与包车都有" },
    "https://www.getyourguide.com/mount-fuji-l7924/bus-minivan-tours-tc4/": { title: "富士山大巴与小巴行程", what: "富士山周边的拼团大巴与小巴行程，集中在同一页" },
    "https://www.getyourguide.com/tokyo-l193/": { title: "东京", what: "GetYourGuide 在东京销售的所有项目，可按日期搜索——Klook 售罄时的第二个选择" },
    "https://www.getyourguide.com/tokyo-l193/entry-tickets-tc123/": { title: "东京景点门票", what: "东京目录中只有门票的部分，对应本页介绍的景点" },
  },
  ko: {
    "https://www.getyourguide.com/tokyo-disney-resort-l104703/entry-tickets-tc123/": { title: "도쿄 디즈니 리조트", what: "도쿄 디즈니랜드와 디즈니씨 입장권을 한 페이지에서, 모두 날짜・파크 지정" },
    "https://www.getyourguide.com/tokyo-disneysea-l4082/entry-tickets-tc123/": { title: "도쿄 디즈니씨", what: "디즈니랜드와 분리된 디즈니씨 입장권 전용 페이지" },
    "https://www.getyourguide.com/universal-studios-japan-l80971/entry-tickets-tc123/": { title: "유니버설 스튜디오 재팬", what: "GetYourGuide의 USJ 스튜디오 패스 입장권. 같은 페이지에 교통 포함 상품도 있습니다" },
    "https://www.getyourguide.com/osaka-l1204/osaka-universal-studios-japan-express-pass-only-t883811/": { title: "USJ 익스프레스 패스", what: "GetYourGuide가 단독으로 파는 익스프레스 패스 — 입장은 스튜디오 패스가 따로 필요합니다" },
  },
  th: {
    "https://www.getyourguide.com/tokyo-disney-resort-l104703/entry-tickets-tc123/": { title: "โตเกียวดิสนีย์รีสอร์ท", what: "ตั๋วเข้าโตเกียวดิสนีย์แลนด์และดิสนีย์ซีในหน้าเดียว ทุกใบระบุวันและสวน" },
    "https://www.getyourguide.com/tokyo-disneysea-l4082/entry-tickets-tc123/": { title: "โตเกียวดิสนีย์ซี", what: "หน้าตั๋วดิสนีย์ซีโดยเฉพาะ แยกจากดิสนีย์แลนด์" },
    "https://www.getyourguide.com/universal-studios-japan-l80971/entry-tickets-tc123/": { title: "ยูนิเวอร์แซล สตูดิโอ เจแปน", what: "ตั๋ว Studio Pass ของ USJ บน GetYourGuide พร้อมแพ็กเกจรวมรถรับส่งในหน้าเดียวกัน" },
    "https://www.getyourguide.com/osaka-l1204/osaka-universal-studios-japan-express-pass-only-t883811/": { title: "Express Pass USJ", what: "Express Pass ที่ GetYourGuide ขายแยก — ต้องซื้อ Studio Pass สำหรับเข้าสวนต่างหาก" },
  },
};

/**
 * "Compare on GetYourGuide" — a second seller next to the Klook CTA that is
 * already on the page.
 *
 * Why it exists: Klook's Special Activities band pays 2% (SHIBUYA SKY, Tokyo
 * Disney) and some tickets pay 0% (the USJ Express Pass), while GetYourGuide's
 * floor is 8%. The Klook links and every factual claim around them are
 * unchanged — this only adds somewhere else to look.
 *
 * What it must not do: claim first-hand experience, print a price, or compare
 * cancellation terms. GetYourGuide answers automated reads with HTTP 403, so
 * none of that could be verified; see lib/gyg-links.ts.
 */

type Props = {
  /** Reporting key sent as `cmp` — the article slug. */
  slug: string;
  heading: string;
  /** Why a reader of *this* page might want the second seller. */
  intro: string;
  listings: GygListing[];
  /** Defaults to the locale of the route the block renders on. */
  locale?: Locale;
};

export default function GygCompare({ slug, heading, intro, listings, locale }: Props) {
  const resolved = useComponentLocale(locale);
  const copy = COPY[resolved];
  const listingCopy = LISTING_COPY[resolved] ?? {};
  return (
    <section className={styles.relatedSection}>
      <span className={styles.sectionLabel}>{copy.label}</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText}>{intro}</p>
      <div className={styles.relatedGrid}>
        {listings.map((listing) => (
          <a
            key={listing.url}
            href={gygLink(listing.url, slug)}
            target="_blank"
            rel={GYG_REL}
            className={styles.relatedCard}
          >
            <div className={styles.relatedIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
            </div>
            <div className={styles.relatedMeta}>
              <p className={styles.relatedTitle}>{listingCopy[listing.url]?.title ?? listing.title}</p>
              <span className={styles.relatedArrow}>{listingCopy[listing.url]?.what ?? listing.what} · {copy.cta}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/**
 * The inline form: one outlined button to sit directly beside a filled Klook
 * CTA. `pickCtaRow` is the flex row the pick cards already use, so the two
 * buttons wrap together on a phone.
 */
export function GygCompareButton({
  slug,
  listing,
  label,
  locale,
}: {
  slug: string;
  listing: GygListing;
  label?: string;
  /** Defaults to the locale of the route the button renders on. */
  locale?: Locale;
}) {
  const copy = COPY[useComponentLocale(locale)];
  return (
    <a
      href={gygLink(listing.url, slug)}
      target="_blank"
      rel={GYG_REL}
      className={styles.pickCtaInternal}
    >
      {label ?? copy.cta}
    </a>
  );
}
