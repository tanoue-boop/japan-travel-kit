import { useRouter } from "next/router";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, SIMBYE_JAPAN_DISCOUNT_URL } from "../lib/simbye";
import styles from "../styles/EsimStickyCta.module.css";

/**
 * The fixed "see the lowest confirmed price" bar on phones, on every eSIM page in every language.
 *
 * Mounted once in _app.tsx and switched on by route, so a new eSIM page gets it without
 * being edited, and the wording has one home. The bar links to Simbye because it is the
 * lowest list price in data/esim-prices.json and the highest commission on the site. The
 * wording stops at "confirmed" because Klook's US$1.05 from-price names no plan. It
 * quotes no price, so the price file stays out of the bundle of every other page.
 *
 * Hidden on wider screens by the stylesheet, not by JavaScript, so it never flashes.
 */
const COPY = {
  en: { cta: "See the lowest confirmed price", code: "Code {code}: {percent}% off" },
  ko: { cta: "확인된 최저가 보기", code: "코드 {code} {percent}% 할인" },
  "zh-tw": { cta: "查看已確認的最低價", code: "優惠碼 {code} 享 {percent}% 折扣" },
  "zh-cn": { cta: "查看已确认的最低价", code: "优惠码 {code} 享 {percent}% 折扣" },
  th: { cta: "ดูราคาต่ำสุดที่ยืนยันได้", code: "โค้ด {code} ลด {percent}%" },
} as const;

type Locale = keyof typeof COPY;

/** The language of an eSIM route, or null for any other page. */
export function esimRouteLocale(pathname: string): Locale | null {
  const match = pathname.match(/^(?:\/(ko|zh-tw|zh-cn|th))?\/guides\/esim(?:\/|$)/);
  return match ? ((match[1] as Locale | undefined) ?? "en") : null;
}

export default function EsimStickyCta() {
  const { pathname } = useRouter();
  const locale = esimRouteLocale(pathname);
  if (!locale) return null;
  const copy = COPY[locale];
  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <div className={styles.bar} data-placement="esim-sticky">
        <a href={SIMBYE_JAPAN_DISCOUNT_URL} className={styles.button} target="_blank" rel="sponsored noopener">
          <span className={styles.label}>{copy.cta} →</span>
          <span className={styles.code}>
            {copy.code.replace("{code}", SIMBYE_DISCOUNT_CODE).replace("{percent}", String(SIMBYE_DISCOUNT_PERCENT))}
          </span>
        </a>
      </div>
    </>
  );
}
