/**
 * The same-day cards for the two teamLab pages in every edition (task-jtk-20261115-P01).
 *
 * The English cards live in lib/klook-links.ts (planetsSameDayCards,
 * teamlabTokyoSameDayCards); this file adds the four translations on the edition's own
 * Klook locale path, so each translated page only picks its locale. Same products, same
 * order: Tsukiji food tour, the Toyosu tea ceremony and the Tokyo Bay cruise — all in
 * Klook's 6.5% band. No prices.
 */
import type { Locale, TranslatedLocale } from "./i18n";
import { planetsSameDayCards, teamlabTokyoSameDayCards, type KlookSameDayCard } from "./klook-links";
import { withKlookLocale } from "./klook-locale";

type CardCopy = { kind: string; label: string; ctaLabel: string; why: string };
// Planets has three cards; the teamLab Tokyo chooser has five since 27 Nov 2026
// (task-jtk-20261127-04: + Tokyo Subway Ticket 5% and Klook eSIM 20%).
type PageCopy = { heading: string; cards: CardCopy[] };

const T: Record<TranslatedLocale, { planets: PageCopy; tokyo: PageCopy }> = {
  "zh-tw": {
    planets: {
      heading: "teamLab Planets 同一天還能預訂什麼？",
      cards: [
        { kind: "美食導覽", label: "築地文化與美食導覽", ctaLabel: "查看築地導覽 →", why: "上午跟著導遊逛築地場外市場，最後坐下來吃壽司；從豐洲過去不遠。" },
        { kind: "體驗", label: "東京茶道體驗：跟著茶道老師學習刷抹茶", ctaLabel: "查看茶道體驗 →", why: "由裏千家認證的老師，在豐洲的獨立空間帶你體驗刷抹茶。" },
        { kind: "遊船", label: "東京灣白天與夕陽遊船", ctaLabel: "查看東京灣遊船 →", why: "從芝浦出發的 1 小時遊船，途經台場，並從彩虹大橋下方通過。" },
      ],
    },
    tokyo: {
      heading: "去 teamLab 的同一天還能預訂什麼？",
      cards: [
        { kind: "美食導覽", label: "築地文化與美食導覽", ctaLabel: "查看築地導覽 →", why: "上午跟著導遊逛築地場外市場，最後坐下來吃壽司；從豐洲的 Planets 過去不遠。" },
        { kind: "體驗", label: "東京茶道體驗：跟著茶道老師學習刷抹茶", ctaLabel: "查看茶道體驗 →", why: "選 Planets 的話：由裏千家認證的老師，在豐洲的獨立空間帶你體驗刷抹茶。" },
        { kind: "遊船", label: "東京灣白天與夕陽遊船", ctaLabel: "查看東京灣遊船 →", why: "參觀完任一座美術館後，可以搭乘從芝浦出發的 1 小時遊船，途經台場，並從彩虹大橋下方通過。" },
        { kind: "地鐵票", label: "東京地鐵通票（24／48／72 小時）", ctaLabel: "查看地鐵通票 →", why: "Borderless 離日比谷線神谷町站 5 號出口步行 2 分鐘，東京 Metro 路線在通票範圍內；前往 Planets 的百合海鷗號不包含在內。" },
        { kind: "eSIM", label: "Klook 日本 eSIM", ctaLabel: "查看 eSIM →", why: "兩座美術館都是手機電子憑證、入口出示，路上就需要網路。" },
      ],
    },
  },
  "zh-cn": {
    planets: {
      heading: "teamLab Planets 同一天还能预订什么？",
      cards: [
        { kind: "美食导览", label: "筑地文化与美食导览", ctaLabel: "查看筑地导览 →", why: "上午跟随导游游览筑地场外市场，最后坐下来品尝寿司；从丰洲过去不远。" },
        { kind: "体验", label: "东京茶道体验：跟随茶道老师学习点抹茶", ctaLabel: "查看茶道体验 →", why: "由里千家认证老师在丰洲的独立房间内指导你点抹茶。" },
        { kind: "游船", label: "东京湾日间与夕阳游船", ctaLabel: "查看东京湾游船 →", why: "从芝浦出发、全程 1 小时的游船，经过台场、穿过彩虹大桥下方。" },
      ],
    },
    tokyo: {
      heading: "参观 teamLab 的当天，还能安排哪些体验？",
      cards: [
        { kind: "美食导览", label: "筑地文化与美食导览", ctaLabel: "查看筑地导览 →", why: "上午跟随导游游览筑地场外市场，最后品尝寿司；从丰洲的 Planets 前往筑地也不远。" },
        { kind: "体验", label: "东京茶道体验：跟随茶道老师学习制作抹茶", ctaLabel: "查看茶道体验 →", why: "选 Planets 的话：由里千家认证的茶道老师在丰洲的独立房间内指导你制作抹茶。" },
        { kind: "游船", label: "东京湾日间与夕阳游船", ctaLabel: "查看东京湾游船 →", why: "参观完任意一座美术馆后，可乘坐从芝浦出发、航程 1 小时的游船，途经台场，并从彩虹大桥下方驶过。" },
        { kind: "地铁票", label: "东京地铁通票（24／48／72 小时）", ctaLabel: "查看地铁通票 →", why: "Borderless 距日比谷线神谷町站 5 号出口步行 2 分钟，东京 Metro 线路在通票范围内；前往 Planets 的百合海鸥线不包含在内。" },
        { kind: "eSIM", label: "Klook 日本 eSIM", ctaLabel: "查看 eSIM →", why: "两座美术馆都使用手机电子凭证、在入口出示，路上就需要流量。" },
      ],
    },
  },
  ko: {
    planets: {
      heading: "팀랩 플래닛과 같은 날 예약해 두면 좋은 것",
      cards: [
        { kind: "푸드 투어", label: "쓰키지 문화·음식 투어", ctaLabel: "쓰키지 투어 보기 →", why: "오전에 가이드와 쓰키지 장외시장을 걷고 자리에 앉아 스시를 먹습니다. 도요스에서 가깝습니다." },
        { kind: "체험", label: "도쿄 말차 만들기·다도 체험(전문가 진행)", ctaLabel: "다도 체험 보기 →", why: "도요스의 개별실에서 우라센케 자격을 갖춘 강사와 함께 말차를 만듭니다." },
        { kind: "크루즈", label: "도쿄만 주간·일몰 보트 크루즈", ctaLabel: "도쿄만 크루즈 보기 →", why: "시바우라에서 출발하는 1시간 크루즈로, 오다이바를 지나 레인보우 브리지 아래를 통과합니다." },
      ],
    },
    tokyo: {
      heading: "팀랩 방문일에 함께 예약하면 좋은 상품",
      cards: [
        { kind: "푸드 투어", label: "쓰키지 문화·음식 투어", ctaLabel: "쓰키지 투어 보기 →", why: "오전에 가이드와 쓰키지 장외시장을 걷고 자리에 앉아 스시를 먹습니다. 도요스의 플래닛에서 가깝습니다." },
        { kind: "체험", label: "도쿄 말차 만들기·다도 체험(전문가 진행)", ctaLabel: "다도 체험 보기 →", why: "플래닛을 선택했다면: 도요스의 개별실에서 우라센케 자격을 갖춘 강사와 함께 말차를 만들어 볼 수 있습니다." },
        { kind: "크루즈", label: "도쿄만 주간·일몰 보트 크루즈", ctaLabel: "도쿄만 크루즈 보기 →", why: "어느 미술관을 관람하든 이후 시바우라에서 출발해 오다이바를 지나 레인보우 브리지 아래를 통과하는 1시간 크루즈입니다." },
        { kind: "지하철 패스", label: "도쿄 서브웨이 티켓(24/48/72시간)", ctaLabel: "서브웨이 티켓 보기 →", why: "보더리스는 히비야선 가미야초역 5번 출구에서 걸어서 2분이고, 도쿄 메트로 노선은 이 티켓으로 탈 수 있습니다. 플래닛으로 가는 유리카모메는 포함되지 않습니다." },
        { kind: "eSIM", label: "클룩 일본 eSIM", ctaLabel: "eSIM 보기 →", why: "두 미술관 모두 휴대폰 바우처를 입구에서 보여 주므로 가는 길부터 데이터가 필요합니다." },
      ],
    },
  },
  th: {
    planets: {
      heading: "ไป teamLab Planets แล้วควรจองกิจกรรมอะไรในวันเดียวกันอีก?",
      cards: [
        { kind: "ทัวร์อาหาร", label: "ทัวร์วัฒนธรรมและอาหารที่สึกิจิ", ctaLabel: "ดูทัวร์สึกิจิ →", why: "ช่วงเช้าเดินชมตลาดนอกสึกิจิกับไกด์ แล้วนั่งรับประทานซูชิ อยู่ไม่ไกลจากโทโยสุ" },
        { kind: "ประสบการณ์", label: "กิจกรรมเรียนชงมัทฉะและเรียนรู้พิธีชงชากับผู้เชี่ยวชาญ (โตเกียว)", ctaLabel: "ดูพิธีชงชา →", why: "ชงมัทฉะในห้องส่วนตัวที่โทโยสุกับผู้สอนที่ได้รับการรับรองจากสำนักอุราเซ็นเกะ" },
        { kind: "ล่องเรือ", label: "ล่องเรือชมอ่าวโตเกียวช่วงกลางวันและช่วงพระอาทิตย์ตก", ctaLabel: "ดูล่องเรืออ่าวโตเกียว →", why: "ล่องเรือ 1 ชั่วโมงจากชิบาอุระ ผ่านโอไดบะและลอดใต้สะพานเรนโบว์" },
      ],
    },
    tokyo: {
      heading: "ไป teamLab แล้วควรจองกิจกรรมอะไรในวันเดียวกันอีก?",
      cards: [
        { kind: "ทัวร์อาหาร", label: "ทัวร์วัฒนธรรมและอาหารที่สึกิจิ", ctaLabel: "ดูทัวร์สึกิจิ →", why: "ช่วงเช้าเดินชมตลาดนอกสึกิจิกับไกด์ แล้วนั่งรับประทานซูชิ อยู่ไม่ไกลจาก Planets ที่โทโยสุ" },
        { kind: "ประสบการณ์", label: "กิจกรรมเรียนชงมัทฉะและเรียนรู้พิธีชงชากับผู้เชี่ยวชาญ (โตเกียว)", ctaLabel: "ดูพิธีชงชา →", why: "ถ้าเลือก Planets: ชงมัทฉะในห้องส่วนตัวที่โทโยสุกับผู้สอนที่ได้รับการรับรองจากสำนักอุราเซ็นเกะ" },
        { kind: "ล่องเรือ", label: "ล่องเรือชมอ่าวโตเกียวช่วงกลางวันและช่วงพระอาทิตย์ตก", ctaLabel: "ดูล่องเรืออ่าวโตเกียว →", why: "หลังชมพิพิธภัณฑ์แห่งใดแห่งหนึ่ง คุณสามารถล่องเรือจากชิบาอุระเป็นเวลา 1 ชั่วโมง ผ่านโอไดบะและลอดใต้สะพานเรนโบว์" },
        { kind: "บัตรรถไฟใต้ดิน", label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)", ctaLabel: "ดู Tokyo Subway Ticket →", why: "Borderless เดิน 2 นาทีจากทางออก 5 สถานีคามิยะโจ สายฮิบิยะ ซึ่งเป็นสาย Tokyo Metro ที่บัตรนี้ใช้ได้ ส่วนยูริคาโมเมะไป Planets ใช้ไม่ได้" },
        { kind: "eSIM", label: "Klook eSIM ญี่ปุ่น", ctaLabel: "ดู eSIM →", why: "ทั้งสองพิพิธภัณฑ์ใช้บัตรเข้าชมแบบวอเชอร์บนมือถือที่ต้องแสดงที่ทางเข้า จึงต้องมีอินเทอร์เน็ตระหว่างทาง" },
      ],
    },
  },
};

const EN_HEADING = { planets: "What else to book for a Planets day", tokyo: "What else to book on a teamLab day" };

export function teamlabSameDayCards(page: "planets" | "tokyo", locale: Locale): { heading: string; cards: KlookSameDayCard[] } {
  const base = page === "planets" ? planetsSameDayCards : teamlabTokyoSameDayCards;
  if (locale === "en") return { heading: EN_HEADING[page], cards: base };
  const copy = T[locale][page];
  return { heading: copy.heading, cards: base.map((card, i) => withKlookLocale(card, locale, copy.cards[i])) };
}
