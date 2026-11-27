import Link from "next/link";
import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { useComponentLocale } from "./componentLocale";
import {
  HOTEL_AREAS,
  HOTEL_CITIES,
  hotelAreaUrl,
  pickText,
  type HotelAreaKey,
  type HotelCityDef,
  type HotelCityKey,
} from "../lib/hotel-stay";
import type { Locale } from "../lib/i18n";

/**
 * "Where to stay in {city}" — 2 to 4 areas, each with its station, one line on why,
 * and a button to Klook's hotel search for that area. Added 27 Nov 2026 (task
 * jtk-20261127-A28) for the itinerary, ski/onsen, shinkansen/airport and ticket pages.
 *
 * Klook hotels pay 6.5% against 2% for most tickets, so this block sits where the
 * reader has to decide where to sleep. The areas and the Klook ids live in
 * lib/hotel-stay.ts; the links go through KlookLink like every other Klook anchor, so
 * they carry aid=119070 and the page's own aff_adid.
 *
 * The section carries data-placement="hotel-stay" and data-product-type="hotel";
 * pages/_app.tsx reads the latter so these clicks reach GA4 as
 * affiliate_click with product_type=hotel. No prices: see lib/hotel-stay.ts.
 */
type Props = {
  city: HotelCityKey;
  /** Override the city's default areas (order kept). */
  areas?: HotelAreaKey[];
  /** Override the heading, e.g. when the page already has a "Where to stay" h2. */
  heading?: string;
  /** One sentence under the heading. */
  intro?: string;
  /** Defaults to the locale of the route the block renders on. */
  locale?: Locale;
  /** Render the heading as h3 when the block sits inside an existing section. */
  as?: "h2" | "h3";
};

const COPY: Record<Locale, { label: string; heading: (city: string) => string; cta: string; station: string; guide: (city: string) => string; note: string }> = {
  en: {
    label: "Where to stay",
    heading: (c) => `Where to stay in ${c}`,
    cta: "See hotels on Klook →",
    station: "Station",
    guide: (c) => `How to choose an area in ${c}: our full guide`,
    note: "Hotel links go to Klook's own search for that area, which pays us a commission at no extra cost to you. Prices and availability are Klook's.",
  },
  "zh-tw": {
    label: "住哪裡",
    heading: (c) => `${c}住哪裡`,
    cta: "在 Klook 看飯店 →",
    station: "車站",
    guide: (c) => `${c}住宿區域的詳細選法（英文）`,
    note: "飯店連結將導向 Klook 該區域的搜尋結果，若透過連結預訂，我們會獲得分潤，您支付的價格不變。價格與空房以 Klook 為準。",
  },
  "zh-cn": {
    label: "住哪里",
    heading: (c) => `${c}住哪里`,
    cta: "在 Klook 看酒店 →",
    station: "车站",
    guide: (c) => `${c}住宿区域的详细选法（英文）`,
    note: "酒店链接前往 Klook 该区域的搜索结果，为推广联盟链接。如果你通过这些链接预订，我们可能获得佣金，你无需支付额外费用。价格及空房情况以 Klook 公布的信息为准。",
  },
  ko: {
    label: "어디에 묵을까",
    heading: (c) => `${c} 숙소는 어디가 좋을까`,
    cta: "클룩에서 호텔 보기 →",
    station: "역",
    guide: (c) => `${c} 숙소 지역 고르는 법 자세히 보기(영어)`,
    note: "호텔 링크는 해당 지역의 클룩 검색 결과로 연결되며, 추가 비용 없이 저희가 수수료를 받습니다. 가격과 객실 현황은 클룩 기준입니다.",
  },
  th: {
    label: "พักที่ไหนดี",
    heading: (c) => `พักที่ไหนดีใน${c}`,
    cta: "ดูโรงแรมบน Klook →",
    station: "สถานี",
    guide: (c) => `วิธีเลือกย่านที่พักใน${c}แบบละเอียด (ภาษาอังกฤษ)`,
    note: "ลิงก์โรงแรมไปที่หน้าค้นหาของ Klook สำหรับย่านนั้น ซึ่งจ่ายค่าคอมมิชชันให้เราโดยคุณไม่ต้องจ่ายเพิ่ม ราคาและห้องว่างเป็นของ Klook",
  },
};

export default function HotelStayBlock({ city, areas, heading, intro, locale, as = "h2" }: Props) {
  const loc = useComponentLocale(locale);
  const copy = COPY[loc];
  const def: HotelCityDef = HOTEL_CITIES[city];
  const cityName = pickText(def.name, loc);
  const keys = areas ?? def.areas;
  const Heading = as;
  return (
    <section className={styles.bodySection} data-placement="hotel-stay" data-product-type="hotel">
      <span className={styles.sectionLabel}>{copy.label}</span>
      <Heading className={styles.sectionTitle} style={as === "h3" ? { fontSize: "1.15rem" } : undefined}>
        {heading ?? copy.heading(cityName)}
      </Heading>
      {intro && <p className={styles.bodyText}>{intro}</p>}
      <div className={styles.sameDayGrid}>
        {keys.map((key) => {
          const area = HOTEL_AREAS[key];
          return (
            <KlookLink
              key={key}
              href={hotelAreaUrl(area, loc)}
              adPlacement="hotel-stay"
              target="_blank"
              rel="sponsored nofollow noopener"
              className={styles.sameDayCard}
            >
              <span className={styles.sameDayKind}>
                {copy.station}: {pickText(area.station, loc)}
              </span>
              <span className={styles.sameDayTitle}>{pickText(area.name, loc)}</span>
              <span className={styles.sameDayWhy}>{pickText(area.feature, loc)}</span>
              <span className={styles.sameDayCta}>{copy.cta}</span>
            </KlookLink>
          );
        })}
      </div>
      {(def.guide || def.extra) && (
        <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
          {def.guide && (
            <Link href={def.guide} style={{ color: "var(--accent)", fontWeight: 600 }}>
              {copy.guide(cityName)} →
            </Link>
          )}
          {def.guide && def.extra && <br />}
          {def.extra && (
            <Link href={def.extra.href} style={{ color: "var(--accent)", fontWeight: 600 }}>
              {pickText(def.extra.label, loc)} →
            </Link>
          )}
        </p>
      )}
      <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        {copy.note}
      </p>
    </section>
  );
}
