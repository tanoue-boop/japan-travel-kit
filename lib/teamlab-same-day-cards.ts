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
type PageCopy = { heading: string; cards: [CardCopy, CardCopy, CardCopy] };

const T: Record<TranslatedLocale, { planets: PageCopy; tokyo: PageCopy }> = {
  "zh-tw": {
    planets: {
      heading: "teamLab Planets 同一天還能預訂什麼？",
      cards: [
        { kind: "美食導覽", label: "築地文化・美食導覽", ctaLabel: "查看築地導覽 →", why: "上午跟著導遊逛築地場外市場，最後坐下來吃壽司；從豐洲過去不遠。" },
        { kind: "體驗", label: "東京：跟著茶道老師點抹茶・茶道體驗", ctaLabel: "查看茶道體驗 →", why: "由裏千家認證老師在豐洲的包廂帶你點抹茶。" },
        { kind: "遊船", label: "東京灣白天・夕陽遊船", ctaLabel: "查看東京灣遊船 →", why: "從芝浦出發的 1 小時遊船，經過台場、穿過彩虹大橋下方。" },
      ],
    },
    tokyo: {
      heading: "去 teamLab 的同一天還能預訂什麼？",
      cards: [
        { kind: "美食導覽", label: "築地文化・美食導覽", ctaLabel: "查看築地導覽 →", why: "上午跟著導遊逛築地場外市場，最後坐下來吃壽司；從豐洲的 Planets 過去不遠。" },
        { kind: "體驗", label: "東京：跟著茶道老師點抹茶・茶道體驗", ctaLabel: "查看茶道體驗 →", why: "選 Planets 的話：由裏千家認證老師在豐洲的包廂帶你點抹茶。" },
        { kind: "遊船", label: "東京灣白天・夕陽遊船", ctaLabel: "查看東京灣遊船 →", why: "看完任一間美術館後，從芝浦出發的 1 小時遊船，經過台場、穿過彩虹大橋下方。" },
      ],
    },
  },
  "zh-cn": {
    planets: {
      heading: "teamLab Planets 同一天还能预订什么？",
      cards: [
        { kind: "美食导览", label: "筑地文化・美食导览", ctaLabel: "查看筑地导览 →", why: "上午跟着导游逛筑地场外市场，最后坐下来吃寿司；从丰洲过去不远。" },
        { kind: "体验", label: "东京：跟着茶道老师点抹茶・茶道体验", ctaLabel: "查看茶道体验 →", why: "由里千家认证老师在丰洲的包间带你点抹茶。" },
        { kind: "游船", label: "东京湾白天・夕阳游船", ctaLabel: "查看东京湾游船 →", why: "从芝浦出发的 1 小时游船，经过台场、穿过彩虹大桥下方。" },
      ],
    },
    tokyo: {
      heading: "去 teamLab 的同一天还能预订什么？",
      cards: [
        { kind: "美食导览", label: "筑地文化・美食导览", ctaLabel: "查看筑地导览 →", why: "上午跟着导游逛筑地场外市场，最后坐下来吃寿司；从丰洲的 Planets 过去不远。" },
        { kind: "体验", label: "东京：跟着茶道老师点抹茶・茶道体验", ctaLabel: "查看茶道体验 →", why: "选 Planets 的话：由里千家认证老师在丰洲的包间带你点抹茶。" },
        { kind: "游船", label: "东京湾白天・夕阳游船", ctaLabel: "查看东京湾游船 →", why: "看完任一间美术馆后，从芝浦出发的 1 小时游船，经过台场、穿过彩虹大桥下方。" },
      ],
    },
  },
  ko: {
    planets: {
      heading: "팀랩 플래닛과 같은 날 예약해 두면 좋은 것",
      cards: [
        { kind: "푸드 투어", label: "쓰키지 문화・음식 투어", ctaLabel: "쓰키지 투어 보기 →", why: "오전에 가이드와 쓰키지 장외시장을 걷고 자리에 앉아 스시를 먹습니다. 도요스에서 가깝습니다." },
        { kind: "체험", label: "도쿄 말차 만들기・다도 체험(전문가 진행)", ctaLabel: "다도 체험 보기 →", why: "도요스의 개별 룸에서 우라센케 자격 강사와 함께 말차를 만듭니다." },
        { kind: "크루즈", label: "도쿄만 낮・선셋 보트 크루즈", ctaLabel: "도쿄만 크루즈 보기 →", why: "시바우라에서 출발하는 1시간 크루즈로, 오다이바를 지나 레인보우 브리지 아래를 통과합니다." },
      ],
    },
    tokyo: {
      heading: "팀랩과 같은 날 예약해 두면 좋은 것",
      cards: [
        { kind: "푸드 투어", label: "쓰키지 문화・음식 투어", ctaLabel: "쓰키지 투어 보기 →", why: "오전에 가이드와 쓰키지 장외시장을 걷고 자리에 앉아 스시를 먹습니다. 도요스의 플래닛에서 가깝습니다." },
        { kind: "체험", label: "도쿄 말차 만들기・다도 체험(전문가 진행)", ctaLabel: "다도 체험 보기 →", why: "플래닛을 고른다면: 도요스의 개별 룸에서 우라센케 자격 강사와 함께 말차를 만듭니다." },
        { kind: "크루즈", label: "도쿄만 낮・선셋 보트 크루즈", ctaLabel: "도쿄만 크루즈 보기 →", why: "어느 미술관이든 관람 후, 시바우라에서 출발해 오다이바를 지나 레인보우 브리지 아래를 통과하는 1시간 크루즈." },
      ],
    },
  },
  th: {
    planets: {
      heading: "วันเดียวกับ teamLab Planets ควรจองอะไรอีก?",
      cards: [
        { kind: "ทัวร์อาหาร", label: "ทัวร์วัฒนธรรมและอาหารสึกิจิ", ctaLabel: "ดูทัวร์สึกิจิ →", why: "ช่วงเช้าเดินตลาดนอกสึกิจิกับไกด์ แล้วนั่งทานซูชิ เดินทางจากโทโยสุไม่ไกล" },
        { kind: "ประสบการณ์", label: "ทำมัทฉะและพิธีชงชากับผู้เชี่ยวชาญ (โตเกียว)", ctaLabel: "ดูพิธีชงชา →", why: "ห้องส่วนตัวที่โทโยสุ กับครูที่ได้รับใบรับรองจากสำนักอุระเซ็นเกะ" },
        { kind: "ล่องเรือ", label: "ล่องเรืออ่าวโตเกียวช่วงกลางวันและพระอาทิตย์ตก", ctaLabel: "ดูล่องเรืออ่าวโตเกียว →", why: "ล่องเรือ 1 ชั่วโมงจากชิบาอุระ ผ่านโอไดบะและลอดใต้สะพานเรนโบว์" },
      ],
    },
    tokyo: {
      heading: "วันเดียวกับ teamLab ควรจองอะไรอีก?",
      cards: [
        { kind: "ทัวร์อาหาร", label: "ทัวร์วัฒนธรรมและอาหารสึกิจิ", ctaLabel: "ดูทัวร์สึกิจิ →", why: "ช่วงเช้าเดินตลาดนอกสึกิจิกับไกด์ แล้วนั่งทานซูชิ เดินทางจาก Planets ที่โทโยสุไม่ไกล" },
        { kind: "ประสบการณ์", label: "ทำมัทฉะและพิธีชงชากับผู้เชี่ยวชาญ (โตเกียว)", ctaLabel: "ดูพิธีชงชา →", why: "ถ้าเลือก Planets: ห้องส่วนตัวที่โทโยสุ กับครูที่ได้รับใบรับรองจากสำนักอุระเซ็นเกะ" },
        { kind: "ล่องเรือ", label: "ล่องเรืออ่าวโตเกียวช่วงกลางวันและพระอาทิตย์ตก", ctaLabel: "ดูล่องเรืออ่าวโตเกียว →", why: "หลังชมพิพิธภัณฑ์แห่งใดก็ได้ ล่องเรือ 1 ชั่วโมงจากชิบาอุระ ผ่านโอไดบะและลอดใต้สะพานเรนโบว์" },
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
