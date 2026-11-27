import { useRouter } from "next/router";
import { useComponentLocale } from "./componentLocale";
import { stay22Campaign, stay22MapUrl } from "../lib/stay22";
import type { Locale } from "../lib/i18n";

/**
 * A Stay22 accommodation map for one area (task jtk-20261127-A30). Lazy-loaded so it
 * costs nothing until the reader scrolls near it; the frame is 100% wide and 420px
 * tall so the layout does not shift when it loads. Prices and the booking links are
 * Stay22's partners' own — this site states no rates.
 */
type Props = {
  /** "Area, City, Japan" — geocoded by Stay22. */
  address: string;
  /** The area as the page names it, for the frame title. */
  label: string;
  locale?: Locale;
  /** Hide the one-line caption, e.g. when a block already carries a disclosure. */
  bare?: boolean;
};

const COPY: Record<Locale, { title: (a: string) => string; caption: string }> = {
  en: {
    title: (a) => `Map of places to stay near ${a}`,
    caption: "Map by Stay22: prices and rooms come from Booking.com, Expedia and other partners. Booking through it pays us a commission at no extra cost to you.",
  },
  "zh-tw": {
    title: (a) => `${a}周邊住宿地圖`,
    caption: "地圖由 Stay22 提供，價格與房間來自 Booking.com、Expedia 等合作網站。透過地圖預訂，我們會獲得分潤，您支付的價格不變。",
  },
  "zh-cn": {
    title: (a) => `${a}周边住宿地图`,
    caption: "地图由 Stay22 提供，价格和房间来自 Booking.com、Expedia 等合作网站，为推广联盟链接。通过地图预订，我们可能获得佣金，你无需支付额外费用。",
  },
  ko: {
    title: (a) => `${a} 주변 숙소 지도`,
    caption: "지도는 Stay22 제공이며, 가격과 객실은 Booking.com・Expedia 등 제휴 사이트의 정보입니다. 지도를 통해 예약하면 추가 비용 없이 저희가 수수료를 받습니다.",
  },
  th: {
    title: (a) => `แผนที่ที่พักใกล้${a}`,
    caption: "แผนที่โดย Stay22 ราคาและห้องพักมาจาก Booking.com, Expedia และพันธมิตรอื่น การจองผ่านแผนที่นี้จ่ายค่าคอมมิชชันให้เราโดยคุณไม่ต้องจ่ายเพิ่ม",
  },
};

/** The disclosure line, for blocks that show several bare maps and one caption. */
export const STAY22_CAPTION: Record<Locale, string> = {
  en: COPY.en.caption,
  "zh-tw": COPY["zh-tw"].caption,
  "zh-cn": COPY["zh-cn"].caption,
  ko: COPY.ko.caption,
  th: COPY.th.caption,
};

export default function Stay22Map({ address, label, locale, bare }: Props) {
  const loc = useComponentLocale(locale);
  const { pathname } = useRouter();
  const copy = COPY[loc];
  return (
    <div data-placement="stay22-map" data-product-type="hotel" style={{ marginTop: "1rem" }}>
      <iframe
        src={stay22MapUrl(address, stay22Campaign(pathname, loc))}
        title={copy.title(label)}
        loading="lazy"
        width="100%"
        height="420"
        style={{ display: "block", width: "100%", height: 420, border: 0, borderRadius: 8 }}
      />
      {!bare && (
        <p style={{ marginTop: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{copy.caption}</p>
      )}
    </div>
  );
}
