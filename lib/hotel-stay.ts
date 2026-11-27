/**
 * Areas for components/HotelStayBlock.tsx — the site-wide "Where to stay in {city}"
 * block, added 27 Nov 2026 (task jtk-20261127-A28).
 *
 * Why. Most Klook clicks on this site land on 2% tickets and 5% rail, which pays a
 * few yen a click. Klook hotels pay 6.5%, and a reader who has just picked a ticket
 * or a shinkansen still has to sleep somewhere. This block puts one Klook hotel
 * search per area on the pages where that decision comes up.
 *
 * Every `path` below is a Klook `destination/<id>/3-hotel/` hotel search that was
 * either already used elsewhere in lib/klook-links.ts (confirmed when it was added)
 * or confirmed as a live, search-indexed Klook page on 27 Nov 2026 — those are
 * marked "new". No id is guessed. Klook ids are locale-independent, so the same path
 * is served under /en-US/, /ko/, /zh-TW/, /zh-CN/ or /th/ for the reader's language
 * and currency.
 *
 * No prices: Klook answers automated reads of its pages with HTTP 403, so none
 * could be verified.
 *
 * The features are written from facts this site already states on the host pages
 * (lines, stations, which bus goes where) — nothing here is a first-hand review.
 */
import { klookLink } from "./klook-links";
import type { Locale } from "./i18n";

/** English is required; a missing translation falls back to it. */
export type HotelText = { en: string } & Partial<Record<Exclude<Locale, "en">, string>>;

export type HotelArea = {
  name: HotelText;
  /** Nearest station or stop, as the host pages name it. */
  station: HotelText;
  /** One line: why stay here. */
  feature: HotelText;
  /** Klook path after the locale segment, e.g. `destination/p50006110-kyoto-station/3-hotel/`. */
  path: string;
};

/** Klook's own locale segment for each language this site publishes. */
const KLOOK_LOCALE: Record<Locale, string> = {
  en: "en-US",
  ko: "ko",
  "zh-tw": "zh-TW",
  "zh-cn": "zh-CN",
  th: "th",
};

/** The Klook hotel search for an area, in the reader's language, with our aid. */
export function hotelAreaUrl(area: HotelArea, locale: Locale): string {
  return klookLink(`https://www.klook.com/${KLOOK_LOCALE[locale]}/${area.path}`);
}

export function pickText(t: HotelText, locale: Locale): string {
  return (locale !== "en" && t[locale]) || t.en;
}

// ---------------------------------------------------------------------------
// Areas
// ---------------------------------------------------------------------------

export const HOTEL_AREAS = {
  // ── Tokyo ────────────────────────────────────────────────────────────────
  shinjuku: {
    name: { en: "Shinjuku", ko: "신주쿠", "zh-tw": "新宿", "zh-cn": "新宿", th: "ชินจูกุ" },
    station: { en: "Shinjuku Station", ko: "신주쿠역", "zh-tw": "新宿站", "zh-cn": "新宿站", th: "สถานีชินจูกุ" },
    feature: {
      en: "Yamanote Line hub; the Odakyu Romancecar to Hakone and the highway buses to Kawaguchiko leave from here.",
      ko: "야마노테선 거점역. 하코네행 오다큐 로망스카와 가와구치코행 고속버스가 여기서 출발합니다.",
      "zh-tw": "山手線大站，往箱根的小田急浪漫特快與往河口湖的高速巴士都從這裡出發。",
      "zh-cn": "山手线大站，去箱根的小田急浪漫特快和去河口湖的高速巴士都从这里出发。",
      th: "สถานีหลักของสาย Yamanote รถไฟ Odakyu Romancecar ไปฮาโกเน่และรถบัสทางด่วนไปคาวากุจิโกะออกจากที่นี่",
    },
    path: "destination/p60269837-shinjuku-station/3-hotel/",
  },
  tokyoStation: {
    name: { en: "Tokyo Station / Marunouchi", ko: "도쿄역・마루노우치", "zh-tw": "東京車站・丸之內", "zh-cn": "东京站・丸之内", th: "สถานีโตเกียว / มารุโนะอุจิ" },
    station: { en: "Tokyo Station", ko: "도쿄역", "zh-tw": "東京車站", "zh-cn": "东京站", th: "สถานีโตเกียว" },
    feature: {
      en: "Where the shinkansen lines start, plus the Narita Express and the JR Keiyo Line to Maihama.",
      ko: "신칸센의 출발역이자 나리타 익스프레스, 마이하마행 JR 게이요선이 출발하는 역입니다.",
      "zh-tw": "新幹線的起點站，成田特快與往舞濱的 JR 京葉線也從這裡發車。",
      "zh-cn": "新干线的起点站，成田特快和去舞滨的 JR 京叶线也从这里发车。",
      th: "ต้นทางของรถไฟชินคันเซ็น รวมถึง Narita Express และ JR Keiyo Line ไปไมฮามะ",
    },
    path: "destination/p50006601-tokyo-railway-station/3-hotel/",
  },
  ueno: {
    name: { en: "Ueno / Asakusa", ko: "우에노・아사쿠사", "zh-tw": "上野・淺草", "zh-cn": "上野・浅草", th: "อุเอโนะ / อาซากุสะ" },
    station: { en: "Ueno Station", ko: "우에노역", "zh-tw": "上野站", "zh-cn": "上野站", th: "สถานีอุเอโนะ" },
    feature: {
      en: "On the Yamanote and Ginza lines, with the Keisei Skyliner from Narita arriving at Keisei Ueno.",
      ko: "야마노테선과 긴자선이 지나고, 나리타공항발 게이세이 스카이라이너가 게이세이우에노역에 도착합니다.",
      "zh-tw": "山手線與銀座線經過，從成田機場出發的京成 Skyliner 抵達京成上野站。",
      "zh-cn": "山手线和银座线经过，从成田机场出发的京成 Skyliner 抵达京成上野站。",
      th: "อยู่บนสาย Yamanote และสาย Ginza และรถไฟ Keisei Skyliner จากนาริตะมาถึงสถานี Keisei Ueno",
    },
    path: "destination/p50214596-ueno/3-hotel/",
  },
  shibuya: {
    name: { en: "Shibuya", ko: "시부야", "zh-tw": "澀谷", "zh-cn": "涩谷", th: "ชิบุยะ" },
    station: { en: "Shibuya Station", ko: "시부야역", "zh-tw": "澀谷站", "zh-cn": "涩谷站", th: "สถานีชิบุยะ" },
    feature: {
      en: "SHIBUYA SKY sits on top of Shibuya Scramble Square, directly above the station — a sunset slot is a walk back to the hotel.",
      ko: "시부야 스카이는 역과 바로 연결된 시부야 스크램블 스퀘어 꼭대기에 있어, 일몰 시간대에 가도 호텔까지 걸어서 돌아갈 수 있습니다.",
      "zh-tw": "SHIBUYA SKY 位於與車站直通的澀谷 Scramble Square 頂樓，看完夕陽走路就能回飯店。",
      "zh-cn": "SHIBUYA SKY 位于与车站直通的涩谷 Scramble Square 顶层，看完日落步行就能回酒店。",
      th: "SHIBUYA SKY อยู่บนยอดตึก Shibuya Scramble Square ที่เชื่อมกับสถานีโดยตรง ดูพระอาทิตย์ตกแล้วเดินกลับโรงแรมได้",
    },
    path: "destination/p50205584-shibuya-scramble-crossing/3-hotel/",
  },
  ginza: {
    name: { en: "Ginza", ko: "긴자", "zh-tw": "銀座", "zh-cn": "银座", th: "กินซ่า" },
    station: { en: "Ginza / Ginza-itchome Station", ko: "긴자역・긴자잇초메역", "zh-tw": "銀座站・銀座一丁目站", "zh-cn": "银座站・银座一丁目站", th: "สถานีกินซ่า / กินซ่าอิตโชเมะ" },
    feature: {
      en: "Ginza, Marunouchi and Hibiya lines, and the Yurakucho Line from Ginza-itchome runs straight to Toyosu for teamLab Planets.",
      ko: "긴자선・마루노우치선・히비야선이 지나고, 긴자잇초메역에서 유라쿠초선으로 팀랩 플래닛이 있는 도요스까지 환승 없이 갈 수 있습니다.",
      "zh-tw": "銀座線、丸之內線、日比谷線經過，從銀座一丁目站搭有樂町線可直達 teamLab Planets 所在的豐洲。",
      "zh-cn": "银座线、丸之内线、日比谷线经过，从银座一丁目站乘有乐町线可直达 teamLab Planets 所在的丰洲。",
      th: "มีสาย Ginza, Marunouchi และ Hibiya และสาย Yurakucho จากกินซ่าอิตโชเมะวิ่งตรงไปโทโยสุซึ่งเป็นที่ตั้งของ teamLab Planets",
    },
    path: "destination/p50061911-ginza/3-hotel/",
  },
  odaiba: {
    name: { en: "Odaiba", ko: "오다이바", "zh-tw": "台場", "zh-cn": "台场", th: "โอไดบะ" },
    station: { en: "Yurikamome line stations", ko: "유리카모메 각 역", "zh-tw": "百合海鷗號各站", "zh-cn": "百合海鸥号各站", th: "สถานีสาย Yurikamome" },
    feature: {
      en: "Bay-side hotels on the Yurikamome, the same line that stops at Shin-Toyosu for teamLab Planets.",
      ko: "유리카모메선 연선의 베이 지역 호텔. 같은 노선의 신토요스역이 팀랩 플래닛과 가장 가까운 역입니다.",
      "zh-tw": "百合海鷗號沿線的灣岸飯店，同一條線的新豐洲站就是 teamLab Planets 的車站。",
      "zh-cn": "百合海鸥号沿线的湾岸酒店，同一条线的新丰洲站就是 teamLab Planets 的车站。",
      th: "โรงแรมริมอ่าวบนสาย Yurikamome ซึ่งเป็นสายเดียวกับที่จอดสถานี Shin-Toyosu ของ teamLab Planets",
    },
    path: "destination/p50200203-odaiba/3-hotel/",
  },
  roppongi: {
    name: { en: "Roppongi", ko: "롯폰기", "zh-tw": "六本木", "zh-cn": "六本木", th: "รปปงหงิ" },
    station: { en: "Roppongi Station", ko: "롯폰기역", "zh-tw": "六本木站", "zh-cn": "六本木站", th: "สถานีรปปงหงิ" },
    feature: {
      en: "One stop on the Hibiya Line from Kamiyacho, the station for teamLab Borderless at Azabudai Hills.",
      ko: "팀랩 보더리스가 있는 아자부다이 힐스와 가장 가까운 가미야초역에서 히비야선으로 한 정거장입니다.",
      "zh-tw": "距離 teamLab Borderless 所在麻布台之丘的神谷町站，日比谷線只要一站。",
      "zh-cn": "距离 teamLab Borderless 所在麻布台之丘的神谷町站，日比谷线只要一站。",
      th: "ห่างจากสถานี Kamiyacho ของ teamLab Borderless ที่ Azabudai Hills เพียงหนึ่งสถานีบนสาย Hibiya",
    },
    path: "destination/p50048776-roppongi/3-hotel/",
  },
  disneyResort: {
    name: { en: "Tokyo Disney Resort hotels", ko: "도쿄 디즈니 리조트 주변 호텔", "zh-tw": "東京迪士尼度假區周邊飯店", "zh-cn": "东京迪士尼度假区周边酒店", th: "โรงแรมรอบโตเกียวดิสนีย์รีสอร์ท" },
    station: { en: "Disney Resort Line stations", ko: "디즈니 리조트 라인 각 역", "zh-tw": "迪士尼度假區線各站", "zh-cn": "迪士尼度假区线各站", th: "สถานีสาย Disney Resort Line" },
    feature: {
      en: "The hotels around the two parks, linked by the Disney Resort Line monorail — no train back to the city at closing time.",
      ko: "두 파크 주변 호텔로 디즈니 리조트 라인 모노레일로 연결되어, 폐장 후 도심까지 전철을 탈 필요가 없습니다.",
      "zh-tw": "兩座樂園周邊的飯店，以迪士尼度假區線單軌電車連接，閉園後不必再搭電車回市區。",
      "zh-cn": "两座乐园周边的酒店，由迪士尼度假区线单轨电车连接，闭园后不必再坐电车回市区。",
      th: "โรงแรมรอบสองสวนสนุก เชื่อมด้วยโมโนเรล Disney Resort Line ไม่ต้องนั่งรถไฟกลับเมืองตอนสวนปิด",
    },
    path: "destination/p50014798-tokyo-disney-resort/3-hotel/",
  },
  maihama: {
    name: { en: "Maihama", ko: "마이하마", "zh-tw": "舞濱", "zh-cn": "舞滨", th: "ไมฮามะ" },
    station: { en: "Maihama Station (JR Keiyo Line)", ko: "마이하마역(JR 게이요선)", "zh-tw": "舞濱站（JR 京葉線）", "zh-cn": "舞滨站（JR 京叶线）", th: "สถานีไมฮามะ (JR Keiyo Line)" },
    feature: {
      en: "The JR station at the resort entrance, on the Keiyo Line from Tokyo Station.",
      ko: "리조트 입구에 있는 JR역으로, 도쿄역에서 게이요선으로 갑니다.",
      "zh-tw": "度假區入口的 JR 車站，從東京車站搭京葉線即可抵達。",
      "zh-cn": "度假区入口的 JR 车站，从东京站乘京叶线即可抵达。",
      th: "สถานี JR ที่ทางเข้ารีสอร์ท นั่งสาย Keiyo จากสถานีโตเกียว",
    },
    path: "destination/p50231652-maihama/3-hotel/",
  },

  // ── Hakone (two new ids, confirmed 27 Nov 2026) ───────────────────────────
  hakone: {
    name: { en: "Hakone (all areas)", ko: "하코네 전역", "zh-tw": "箱根全區", "zh-cn": "箱根全区", th: "ฮาโกเน่ (ทุกย่าน)" },
    station: { en: "Hakone-Yumoto Station", ko: "하코네유모토역", "zh-tw": "箱根湯本站", "zh-cn": "箱根汤本站", th: "สถานีฮาโกเน่-ยุโมโตะ" },
    feature: {
      en: "Every ryokan and hotel from Yumoto up to Gora and the lake; the Hakone Freepass covers the trains and buses between them.",
      ko: "유모토부터 고라, 아시노코까지 모든 료칸과 호텔. 그 사이의 전철과 버스는 하코네 프리패스로 탈 수 있습니다.",
      "zh-tw": "從湯本到強羅、蘆之湖的所有旅館與飯店，之間的電車與巴士都可用箱根周遊券搭乘。",
      "zh-cn": "从汤本到强罗、芦之湖的所有旅馆和酒店，之间的电车和巴士都可用箱根周游券乘坐。",
      th: "เรียวกังและโรงแรมทั้งหมดตั้งแต่ยุโมโตะถึงโกระและทะเลสาบ รถไฟและรถบัสระหว่างนั้นใช้ Hakone Freepass ได้",
    },
    path: "destination/c441-hakone/3-hotel/",
  },
  hakoneOnsen: {
    name: { en: "Hakone hot-spring inns", ko: "하코네 온천 료칸", "zh-tw": "箱根溫泉旅館", "zh-cn": "箱根温泉旅馆", th: "เรียวกังออนเซ็นฮาโกเน่" },
    station: { en: "Hakone Tozan Line stations (Yumoto–Gora)", ko: "하코네 등산전차 각 역(유모토~고라)", "zh-tw": "箱根登山電車各站（湯本～強羅）", "zh-cn": "箱根登山电车各站（汤本～强罗）", th: "สถานีรถไฟ Hakone Tozan (ยุโมโตะ–โกระ)" },
    feature: {
      en: "Klook's search for Hakone's onsen inns — the night that turns a day trip into the full loop without rushing.",
      ko: "클룩의 하코네 온천 숙소 검색. 하룻밤 묵으면 당일치기로는 빠듯한 순환 코스를 여유 있게 돌 수 있습니다.",
      "zh-tw": "Klook 的箱根溫泉旅館搜尋。住一晚，就能從容走完一日遊很趕的箱根環線。",
      "zh-cn": "Klook 的箱根温泉旅馆搜索。住一晚，就能从容走完一日游很赶的箱根环线。",
      th: "หน้าค้นหาเรียวกังออนเซ็นในฮาโกเน่ของ Klook ค้างหนึ่งคืนก็เที่ยวครบวงได้โดยไม่ต้องรีบ",
    },
    path: "destination/p60271900-hakone-onsen/3-hotel/",
  },
  lakeAshi: {
    name: { en: "Lake Ashi (Hakone-machi / Moto-Hakone)", ko: "아시노코(하코네마치・모토하코네)", "zh-tw": "蘆之湖（箱根町・元箱根）", "zh-cn": "芦之湖（箱根町・元箱根）", th: "ทะเลสาบอาชิ (ฮาโกเน่มาจิ / โมโตะฮาโกเน่)" },
    station: { en: "Hakone-machi / Moto-Hakone (cruise piers, Tozan Bus)", ko: "하코네마치・모토하코네(유람선 선착장, 등산버스)", "zh-tw": "箱根町・元箱根（觀光船碼頭、登山巴士）", "zh-cn": "箱根町・元箱根（观光船码头、登山巴士）", th: "ฮาโกเน่มาจิ / โมโตะฮาโกเน่ (ท่าเรือ, รถบัส Tozan)" },
    feature: {
      en: "Lakeside stays near the Hakone Checkpoint, at the end of the Lake Ashi cruise and a short walk from Hakone Shrine.",
      ko: "하코네 세키쇼 근처 호숫가 숙소. 아시노코 유람선의 종점이며 하코네 신사까지 걸어갈 수 있습니다.",
      "zh-tw": "箱根關所附近的湖畔住宿，是蘆之湖觀光船的終點，步行可到箱根神社。",
      "zh-cn": "箱根关所附近的湖畔住宿，是芦之湖观光船的终点，步行可到箱根神社。",
      th: "ที่พักริมทะเลสาบใกล้ด่าน Hakone Checkpoint ปลายทางเรือล่องทะเลสาบอาชิ และเดินไปศาลเจ้าฮาโกเน่ได้",
    },
    path: "destination/p50310113-hakone-checkpoint/3-hotel/",
  },

  // ── Mt Fuji / Kawaguchiko (two new ids, confirmed 27 Nov 2026) ────────────
  kawaguchikoStation: {
    name: { en: "Kawaguchiko Station area", ko: "가와구치코역 주변", "zh-tw": "河口湖站周邊", "zh-cn": "河口湖站周边", th: "รอบสถานีคาวากุจิโกะ" },
    station: { en: "Kawaguchiko Station", ko: "가와구치코역", "zh-tw": "河口湖站", "zh-cn": "河口湖站", th: "สถานีคาวากุจิโกะ" },
    feature: {
      en: "The end of the Fujikyu Railway and the stop for the highway buses from Shinjuku; the lake sightseeing buses start here.",
      ko: "후지큐 철도의 종점이자 신주쿠발 고속버스 정류장. 호수 주변 관광버스도 여기서 출발합니다.",
      "zh-tw": "富士急行線終點，也是新宿高速巴士的停靠站，環湖觀光巴士也從這裡出發。",
      "zh-cn": "富士急行线终点，也是新宿高速巴士的停靠站，环湖观光巴士也从这里出发。",
      th: "ปลายทางรถไฟ Fujikyu และจุดจอดรถบัสทางด่วนจากชินจูกุ รถบัสชมทะเลสาบก็ออกจากที่นี่",
    },
    path: "destination/p50274308-fujikawaguchiko/3-hotel/",
  },
  lakeKawaguchi: {
    name: { en: "Lake Kawaguchi shore", ko: "가와구치코 호숫가", "zh-tw": "河口湖湖畔", "zh-cn": "河口湖湖畔", th: "ริมทะเลสาบคาวากุจิ" },
    station: { en: "Lake sightseeing bus stops", ko: "호수 순환 관광버스 정류장", "zh-tw": "環湖觀光巴士各站", "zh-cn": "环湖观光巴士各站", th: "ป้ายรถบัสชมทะเลสาบ" },
    feature: {
      en: "Ryokan and hotels along the lake, for the early-morning Fuji view before the day-trippers arrive.",
      ko: "호숫가의 료칸과 호텔. 당일치기 관광객이 오기 전 이른 아침의 후지산을 볼 수 있습니다.",
      "zh-tw": "湖畔的旅館與飯店，可以在一日遊旅客到來之前看清晨的富士山。",
      "zh-cn": "湖畔的旅馆和酒店，可以在一日游游客到来之前看清晨的富士山。",
      th: "เรียวกังและโรงแรมริมทะเลสาบ ได้ชมฟูจิยามเช้าก่อนนักท่องเที่ยวแบบไปกลับจะมาถึง",
    },
    path: "destination/p50143802-lake-kawaguchi/3-hotel/",
  },
  fujiQ: {
    name: { en: "Fuji-Q Highland / Fujiyoshida", ko: "후지큐 하이랜드・후지요시다", "zh-tw": "富士急樂園・富士吉田", "zh-cn": "富士急乐园・富士吉田", th: "ฟูจิคิว ไฮแลนด์ / ฟูจิโยชิดะ" },
    station: { en: "Fujikyu Highland Station", ko: "후지큐 하이랜드역", "zh-tw": "富士急樂園站", "zh-cn": "富士急乐园站", th: "สถานี Fujikyu Highland" },
    feature: {
      en: "One stop before Kawaguchiko, with the park gate next to the station — the base for an opening-time start on the coasters.",
      ko: "가와구치코 한 정거장 전, 역 바로 옆이 파크 입구라 개장 시간에 맞춰 들어가기 좋습니다.",
      "zh-tw": "河口湖的前一站，樂園入口就在車站旁，適合開園就入場。",
      "zh-cn": "河口湖的前一站，乐园入口就在车站旁，适合开园就入场。",
      th: "ก่อนถึงคาวากุจิโกะหนึ่งสถานี ประตูสวนสนุกอยู่ติดสถานี เหมาะกับการเข้าตั้งแต่เปิด",
    },
    path: "destination/p50049627-fuji-q-highland/3-hotel/",
  },

  // ── Kyoto ────────────────────────────────────────────────────────────────
  kyotoStation: {
    name: { en: "Kyoto Station", ko: "교토역", "zh-tw": "京都車站", "zh-cn": "京都站", th: "สถานีเกียวโต" },
    station: { en: "Kyoto Station", ko: "교토역", "zh-tw": "京都車站", "zh-cn": "京都站", th: "สถานีเกียวโต" },
    feature: {
      en: "Where the shinkansen and the Haruka from Kansai Airport arrive, and where the 100 and 101 sightseeing buses start.",
      ko: "신칸센과 간사이공항발 하루카가 도착하고, 100・101번 관광버스가 출발합니다.",
      "zh-tw": "新幹線與關西機場 HARUKA 的抵達站，100、101 路觀光巴士也從這裡發車。",
      "zh-cn": "新干线和关西机场 HARUKA 的抵达站，100、101 路观光巴士也从这里发车。",
      th: "ชินคันเซ็นและรถไฟ Haruka จากสนามบินคันไซมาถึงที่นี่ และรถบัสท่องเที่ยวสาย 100 และ 101 ออกจากที่นี่",
    },
    path: "destination/p50006110-kyoto-station/3-hotel/",
  },
  karasumaOike: {
    name: { en: "Karasuma Oike / Shijo", ko: "가라스마오이케・시조", "zh-tw": "烏丸御池・四條", "zh-cn": "乌丸御池・四条", th: "คาราสุมะโออิเกะ / ชิโจ" },
    station: { en: "Karasuma Oike Station", ko: "가라스마오이케역", "zh-tw": "烏丸御池站", "zh-cn": "乌丸御池站", th: "สถานีคาราสุมะโออิเกะ" },
    feature: {
      en: "The one point where the Karasuma and Tozai subway lines cross, with Nishiki Market and the evening streets on foot.",
      ko: "가라스마선과 도자이선이 교차하는 유일한 역으로, 니시키 시장과 저녁 거리까지 걸어갈 수 있습니다.",
      "zh-tw": "烏丸線與東西線唯一的交會站，步行可到錦市場和晚上熱鬧的街區。",
      "zh-cn": "乌丸线与东西线唯一的交汇站，步行可到锦市场和晚上热闹的街区。",
      th: "จุดเดียวที่รถไฟใต้ดินสาย Karasuma และ Tozai ตัดกัน เดินไปตลาดนิชิกิและย่านกลางคืนได้",
    },
    path: "destination/p50017847-karasuma-oike-station/3-hotel/",
  },
  gion: {
    name: { en: "Gion / Higashiyama", ko: "기온・히가시야마", "zh-tw": "祇園・東山", "zh-cn": "祇园・东山", th: "กิอง / ฮิงาชิยามะ" },
    station: { en: "Gion-Shijo / Higashiyama Station", ko: "기온시조역・히가시야마역", "zh-tw": "祇園四條站・東山站", "zh-cn": "祇园四条站・东山站", th: "สถานีกิอง-ชิโจ / ฮิงาชิยามะ" },
    feature: {
      en: "Walking distance to Kiyomizudera and the old lanes, before the tour buses arrive.",
      ko: "기요미즈데라와 옛 골목까지 걸어서 갈 수 있어 단체 관광버스가 오기 전에 둘러볼 수 있습니다.",
      "zh-tw": "步行可到清水寺與老街，能在旅行團巴士抵達前逛完。",
      "zh-cn": "步行可到清水寺和老街，能在旅游团大巴到达前逛完。",
      th: "เดินไปวัดคิโยมิซุและตรอกเก่าได้ ก่อนรถบัสทัวร์จะมาถึง",
    },
    path: "destination/p50294481-gion/3-hotel/",
  },

  // ── Osaka ────────────────────────────────────────────────────────────────
  umeda: {
    name: { en: "Umeda / Osaka Station", ko: "우메다・오사카역", "zh-tw": "梅田・大阪站", "zh-cn": "梅田・大阪站", th: "อุเมดะ / สถานีโอซาก้า" },
    station: { en: "Umeda / Osaka Station", ko: "우메다역・오사카역", "zh-tw": "梅田站・大阪站", "zh-cn": "梅田站・大阪站", th: "สถานีอุเมดะ / โอซาก้า" },
    feature: {
      en: "The northern Midosuji Line hub joined to JR Osaka Station — the base for Kyoto, Kobe and the shinkansen at Shin-Osaka.",
      ko: "JR 오사카역과 연결된 미도스지선 북쪽 거점. 교토・고베・신오사카(신칸센)로 이동하기 좋습니다.",
      "zh-tw": "與 JR 大阪站相連的御堂筋線北側樞紐，往京都、神戶和新大阪（新幹線）都方便。",
      "zh-cn": "与 JR 大阪站相连的御堂筋线北侧枢纽，去京都、神户和新大阪（新干线）都方便。",
      th: "ศูนย์กลางฝั่งเหนือของสาย Midosuji เชื่อมกับสถานี JR โอซาก้า สะดวกไปเกียวโต โกเบ และชินคันเซ็นที่ชินโอซาก้า",
    },
    path: "destination/p50050002-umeda-station/3-hotel/",
  },
  namba: {
    name: { en: "Namba", ko: "난바", "zh-tw": "難波", "zh-cn": "难波", th: "นัมบะ" },
    station: { en: "Namba Station", ko: "난바역", "zh-tw": "難波站", "zh-cn": "难波站", th: "สถานีนัมบะ" },
    feature: {
      en: "Midosuji Line and the Nankai terminus for Kansai Airport, with Dotonbori and Kuromon Market on foot.",
      ko: "미도스지선과 간사이공항행 난카이선 터미널. 도톤보리와 구로몬 시장까지 걸어갈 수 있습니다.",
      "zh-tw": "御堂筋線與往關西機場的南海線起點，步行可到道頓堀和黑門市場。",
      "zh-cn": "御堂筋线和去关西机场的南海线起点，步行可到道顿堀和黑门市场。",
      th: "สาย Midosuji และสถานีต้นทาง Nankai ไปสนามบินคันไซ เดินไปโดทงโบริและตลาดคุโรมงได้",
    },
    path: "destination/p50043205-namba-station/3-hotel/",
  },
  tennoji: {
    name: { en: "Tennoji", ko: "덴노지", "zh-tw": "天王寺", "zh-cn": "天王寺", th: "เทนโนจิ" },
    station: { en: "Tennoji Station", ko: "덴노지역", "zh-tw": "天王寺站", "zh-cn": "天王寺站", th: "สถานีเทนโนจิ" },
    feature: {
      en: "A direct JR Haruka stop from Kansai Airport and the south end of the Midosuji Line.",
      ko: "간사이공항발 JR 하루카가 직행으로 서는 역이자 미도스지선 남쪽 거점입니다.",
      "zh-tw": "關西機場 JR HARUKA 直達的停靠站，也是御堂筋線南側的樞紐。",
      "zh-cn": "关西机场 JR HARUKA 直达的停靠站，也是御堂筋线南侧的枢纽。",
      th: "จุดจอดของ JR Haruka จากสนามบินคันไซโดยตรง และปลายทางใต้ของสาย Midosuji",
    },
    path: "destination/p50039722-tennoji-station/3-hotel/",
  },

  // ── Hiroshima ────────────────────────────────────────────────────────────
  hiroshimaStation: {
    name: { en: "Hiroshima Station", ko: "히로시마역", "zh-tw": "廣島站", "zh-cn": "广岛站", th: "สถานีฮิโรชิม่า" },
    station: { en: "Hiroshima Station", ko: "히로시마역", "zh-tw": "廣島站", "zh-cn": "广岛站", th: "สถานีฮิโรชิม่า" },
    feature: {
      en: "Where the shinkansen stops and the JR Sanyo Line leaves for Miyajimaguchi — no luggage across town on arrival day.",
      ko: "신칸센이 정차하고 미야지마구치행 JR 산요선이 출발하는 역이라 도착일에 짐을 들고 이동할 필요가 없습니다.",
      "zh-tw": "新幹線停靠站，往宮島口的 JR 山陽本線也從這裡出發，抵達當天不必拖行李穿越市區。",
      "zh-cn": "新干线停靠站，去宫岛口的 JR 山阳本线也从这里出发，抵达当天不必拖行李穿越市区。",
      th: "ชินคันเซ็นจอดที่นี่ และรถไฟ JR Sanyo ไปมิยาจิมะกุจิออกจากที่นี่ ไม่ต้องลากกระเป๋าข้ามเมืองวันที่มาถึง",
    },
    path: "destination/p50039899-hiroshima-station/3-hotel/",
  },
  peacePark: {
    name: { en: "Peace Park / Hondori", ko: "평화공원・혼도리", "zh-tw": "和平公園・本通", "zh-cn": "和平公园・本通", th: "สวนสันติภาพ / ฮอนโดริ" },
    station: { en: "Genbaku Dome-mae tram stop", ko: "겐바쿠돔마에 노면전차 정류장", "zh-tw": "原爆圓頂館前電車站", "zh-cn": "原爆圆顶馆前电车站", th: "ป้ายรถราง Genbaku Dome-mae" },
    feature: {
      en: "Walking distance to the Peace Memorial Park and museum, and to the evening restaurants of Hondori.",
      ko: "평화기념공원과 자료관, 저녁 식당가인 혼도리까지 걸어갈 수 있습니다.",
      "zh-tw": "步行可到和平紀念公園與資料館，以及晚上的本通餐廳街。",
      "zh-cn": "步行可到和平纪念公园与资料馆，以及晚上的本通餐厅街。",
      th: "เดินไปสวนอนุสรณ์สันติภาพและพิพิธภัณฑ์ รวมถึงร้านอาหารย่านฮอนโดริได้",
    },
    path: "destination/p50056982-hiroshima-peace-memorial-museum/3-hotel/",
  },
  miyajima: {
    name: { en: "Miyajima", ko: "미야지마", "zh-tw": "宮島", "zh-cn": "宫岛", th: "มิยาจิมะ" },
    station: { en: "Miyajima ferry pier", ko: "미야지마 페리 선착장", "zh-tw": "宮島渡輪碼頭", "zh-cn": "宫岛轮渡码头", th: "ท่าเรือเฟอร์รี่มิยาจิมะ" },
    feature: {
      en: "A night on the island for Itsukushima Shrine after the last day-trip ferries leave.",
      ko: "마지막 당일치기 페리가 떠난 뒤의 이쓰쿠시마 신사를 보려면 섬에서 1박.",
      "zh-tw": "在島上住一晚，可在一日遊旅客搭最後一班渡輪離開後看嚴島神社。",
      "zh-cn": "在岛上住一晚，可在一日游游客坐最后一班轮渡离开后看严岛神社。",
      th: "ค้างบนเกาะหนึ่งคืน เพื่อชมศาลเจ้าอิตสึกุชิมะหลังเรือเฟอร์รี่เที่ยวสุดท้ายของนักท่องเที่ยวไปกลับออกไปแล้ว",
    },
    path: "destination/p50001702-miyajima-itsukushima-shrine/3-hotel/",
  },

  // ── Kanazawa (two new ids, confirmed 27 Nov 2026) ─────────────────────────
  kanazawa: {
    name: { en: "Kanazawa Station area", ko: "가나자와역 주변", "zh-tw": "金澤站周邊", "zh-cn": "金泽站周边", th: "รอบสถานีคานาซาว่า" },
    station: { en: "Kanazawa Station", ko: "가나자와역", "zh-tw": "金澤站", "zh-cn": "金泽站", th: "สถานีคานาซาว่า" },
    feature: {
      en: "Where the Hokuriku Shinkansen from Tokyo arrives and the city loop buses start (Klook's all-Kanazawa search).",
      ko: "도쿄발 호쿠리쿠 신칸센이 도착하고 시내 순환버스가 출발하는 역(클룩의 가나자와 전체 검색).",
      "zh-tw": "東京出發的北陸新幹線抵達站，市內周遊巴士也從這裡出發（Klook 金澤全區搜尋）。",
      "zh-cn": "东京出发的北陆新干线抵达站，市内周游巴士也从这里出发（Klook 金泽全区搜索）。",
      th: "ที่ที่ชินคันเซ็น Hokuriku จากโตเกียวมาถึงและรถบัสวนรอบเมืองออกเดินทาง (หน้าค้นหาทั้งคานาซาว่าของ Klook)",
    },
    path: "destination/c445-kanazawa/3-hotel/",
  },
  kenrokuen: {
    name: { en: "Kenroku-en / Korinbo", ko: "겐로쿠엔・고린보", "zh-tw": "兼六園・香林坊", "zh-cn": "兼六园・香林坊", th: "เคนโรคุเอ็น / โครินโบ" },
    station: { en: "Kenrokuen / Korinbo bus stops", ko: "겐로쿠엔・고린보 버스 정류장", "zh-tw": "兼六園・香林坊巴士站", "zh-cn": "兼六园・香林坊巴士站", th: "ป้ายรถบัสเคนโรคุเอ็น / โครินโบ" },
    feature: {
      en: "Kenroku-en, Kanazawa Castle Park and the 21st Century Museum all on foot.",
      ko: "겐로쿠엔, 가나자와성 공원, 21세기 미술관까지 모두 걸어갈 수 있습니다.",
      "zh-tw": "兼六園、金澤城公園與 21 世紀美術館都在步行範圍內。",
      "zh-cn": "兼六园、金泽城公园和 21 世纪美术馆都在步行范围内。",
      th: "เดินไปสวนเคนโรคุเอ็น สวนปราสาทคานาซาว่า และพิพิธภัณฑ์ศตวรรษที่ 21 ได้ทั้งหมด",
    },
    path: "destination/p50200296-kenroku-en/3-hotel/",
  },
  higashiChaya: {
    name: { en: "Higashi Chaya District", ko: "히가시차야가이", "zh-tw": "東茶屋街", "zh-cn": "东茶屋街", th: "ย่านฮิงาชิชายะ" },
    station: { en: "Hashibacho bus stop", ko: "하시바초 버스 정류장", "zh-tw": "橋場町巴士站", "zh-cn": "桥场町巴士站", th: "ป้ายรถบัสฮาชิบะโจ" },
    feature: {
      en: "The old teahouse streets by the Asano River, quiet in the early morning before the shops open.",
      ko: "아사노강 옆 옛 찻집 거리로, 가게가 열기 전 이른 아침에는 조용합니다.",
      "zh-tw": "淺野川旁的老茶屋街，清晨店家開門前很安靜。",
      "zh-cn": "浅野川旁的老茶屋街，清晨店铺开门前很安静。",
      th: "ถนนโรงน้ำชาเก่าริมแม่น้ำอาซาโนะ ยามเช้าก่อนร้านเปิดจะเงียบสงบ",
    },
    path: "destination/p50200504-higashi-chaya-district/3-hotel/",
  },

  // ── Hokkaido ─────────────────────────────────────────────────────────────
  sapporoStation: {
    name: { en: "Sapporo Station", ko: "삿포로역", "zh-tw": "札幌站", "zh-cn": "札幌站", th: "สถานีซัปโปโร" },
    station: { en: "Sapporo Station", ko: "삿포로역", "zh-tw": "札幌站", "zh-cn": "札幌站", th: "สถานีซัปโปโร" },
    feature: {
      en: "The JR rapid from New Chitose Airport arrives here, and most ski and day tours pick up nearby.",
      ko: "신치토세공항발 JR 쾌속이 도착하고, 스키・당일 투어 대부분이 근처에서 픽업합니다.",
      "zh-tw": "新千歲機場的 JR 快速列車抵達這裡，大多數滑雪與一日遊團也在附近集合。",
      "zh-cn": "新千岁机场的 JR 快速列车抵达这里，大多数滑雪和一日游团也在附近集合。",
      th: "รถไฟ JR ด่วนจากสนามบินชินชิโตเสะมาถึงที่นี่ และทัวร์สกีกับทัวร์ไปกลับส่วนใหญ่รับใกล้ๆ นี้",
    },
    path: "destination/p50006996-sapporo-station/3-hotel/",
  },
  susukino: {
    name: { en: "Susukino / Odori", ko: "스스키노・오도리", "zh-tw": "薄野・大通", "zh-cn": "薄野・大通", th: "ซูซูกิโนะ / โอโดริ" },
    station: { en: "Susukino Station", ko: "스스키노역", "zh-tw": "薄野站", "zh-cn": "薄野站", th: "สถานีซูซูกิโนะ" },
    feature: {
      en: "Sapporo's evening district, a subway stop or two south of the station and next to Odori Park.",
      ko: "삿포로의 밤 거리. 역에서 지하철로 한두 정거장 남쪽, 오도리 공원 옆입니다.",
      "zh-tw": "札幌的夜生活區，從車站搭地鐵往南一兩站，就在大通公園旁。",
      "zh-cn": "札幌的夜生活区，从车站坐地铁往南一两站，就在大通公园旁。",
      th: "ย่านยามค่ำคืนของซัปโปโร ห่างจากสถานีไปทางใต้หนึ่งถึงสองสถานีรถไฟใต้ดิน ติดสวนโอโดริ",
    },
    path: "destination/p50291802-susukino/3-hotel/",
  },
  niseko: {
    name: { en: "Niseko", ko: "니세코", "zh-tw": "二世谷", "zh-cn": "二世谷", th: "นิเซโกะ" },
    station: { en: "Kutchan Station / Hirafu", ko: "굿찬역・히라후", "zh-tw": "俱知安站・比羅夫", "zh-cn": "俱知安站・比罗夫", th: "สถานีคุตจัง / ฮิราฟุ" },
    feature: {
      en: "Hotels and lodges by the Niseko United lifts — the way to ski more than one day without the long bus ride each morning.",
      ko: "니세코 유나이티드 리프트 근처의 호텔과 로지. 매일 아침 장거리 버스를 타지 않고 여러 날 스키를 탈 수 있습니다.",
      "zh-tw": "Niseko United 纜車旁的飯店與山屋，連滑好幾天也不必每天早上搭長途巴士。",
      "zh-cn": "Niseko United 缆车旁的酒店与山屋，连滑好几天也不必每天早上坐长途巴士。",
      th: "โรงแรมและลอดจ์ใกล้ลิฟต์ Niseko United เล่นสกีหลายวันได้โดยไม่ต้องนั่งรถบัสไกลทุกเช้า",
    },
    path: "destination/p50340243-niseko/3-hotel/",
  },

  // ── Nagano ski (Hakuba / Nozawa) ─────────────────────────────────────────
  hakuba: {
    name: { en: "Hakuba", ko: "하쿠바", "zh-tw": "白馬", "zh-cn": "白马", th: "ฮาคุบะ" },
    station: { en: "Hakuba Station / Happo bus terminal", ko: "하쿠바역・핫포 버스터미널", "zh-tw": "白馬站・八方巴士總站", "zh-cn": "白马站・八方巴士总站", th: "สถานีฮาคุบะ / สถานีรถบัสฮัปโปะ" },
    feature: {
      en: "The valley's hotels and lodges, reached by express bus from Nagano Station.",
      ko: "하쿠바 계곡의 호텔과 로지로, 나가노역에서 특급버스로 갑니다.",
      "zh-tw": "白馬山谷的飯店與山屋，從長野站搭特急巴士前往。",
      "zh-cn": "白马山谷的酒店与山屋，从长野站坐特急巴士前往。",
      th: "โรงแรมและลอดจ์ในหุบเขาฮาคุบะ นั่งรถบัสด่วนจากสถานีนากาโนะ",
    },
    path: "destination/p50304245-hakuba/3-hotel/",
  },
  nozawa: {
    name: { en: "Nozawa Onsen", ko: "노자와 온천", "zh-tw": "野澤溫泉", "zh-cn": "野泽温泉", th: "โนซาวะออนเซ็น" },
    station: { en: "Iiyama Station + Nozawa Onsen Liner", ko: "이이야마역 + 노자와 온천 라이너", "zh-tw": "飯山站＋野澤溫泉接駁巴士", "zh-cn": "饭山站＋野泽温泉接驳巴士", th: "สถานีอีอิยามะ + รถบัส Nozawa Onsen Liner" },
    feature: {
      en: "A hot-spring village at the foot of the ski area — inns within walking distance of the lifts and the free public baths.",
      ko: "스키장 기슭의 온천 마을. 리프트와 무료 공동 목욕탕까지 걸어갈 수 있는 숙소가 많습니다.",
      "zh-tw": "位於滑雪場山腳的溫泉村，許多旅館走路就能到纜車和免費的外湯。",
      "zh-cn": "位于滑雪场山脚的温泉村，许多旅馆步行就能到缆车和免费的外汤。",
      th: "หมู่บ้านออนเซ็นที่ตีนลานสกี ที่พักหลายแห่งเดินไปลิฟต์และโรงอาบน้ำสาธารณะฟรีได้",
    },
    path: "destination/p50053885-nozawa-onsen-ski-resort/3-hotel/",
  },
  nagano: {
    name: { en: "Nagano city", ko: "나가노 시내", "zh-tw": "長野市區", "zh-cn": "长野市区", th: "เมืองนากาโนะ" },
    station: { en: "Nagano Station", ko: "나가노역", "zh-tw": "長野站", "zh-cn": "长野站", th: "สถานีนากาโนะ" },
    feature: {
      en: "A Hokuriku Shinkansen stop where the express buses to Hakuba and the ski areas leave — one base for several resorts.",
      ko: "호쿠리쿠 신칸센 정차역으로 하쿠바와 스키장행 특급버스가 출발해, 여러 스키장을 한 거점에서 다닐 수 있습니다.",
      "zh-tw": "北陸新幹線停靠站，往白馬與各滑雪場的特急巴士從這裡出發，一個據點就能跑好幾個雪場。",
      "zh-cn": "北陆新干线停靠站，去白马和各滑雪场的特急巴士从这里出发，一个据点就能跑好几个雪场。",
      th: "สถานีชินคันเซ็น Hokuriku ที่รถบัสด่วนไปฮาคุบะและลานสกีออกเดินทาง ใช้เป็นฐานเดียวไปได้หลายรีสอร์ท",
    },
    path: "destination/c26277-nagano/3-hotel/",
  },

  // ── Yuzawa / GALA (two new ids, confirmed 27 Nov 2026) ────────────────────
  yuzawa: {
    name: { en: "Echigo-Yuzawa", ko: "에치고유자와", "zh-tw": "越後湯澤", "zh-cn": "越后汤泽", th: "เอจิโกะ-ยูซาวะ" },
    station: { en: "Echigo-Yuzawa Station (Joetsu Shinkansen)", ko: "에치고유자와역(조에쓰 신칸센)", "zh-tw": "越後湯澤站（上越新幹線）", "zh-cn": "越后汤泽站（上越新干线）", th: "สถานีเอจิโกะ-ยูซาวะ (ชินคันเซ็น Joetsu)" },
    feature: {
      en: "Onsen ryokan and ski hotels around the shinkansen station, with several ski areas a short shuttle away.",
      ko: "신칸센역 주변의 온천 료칸과 스키 호텔. 여러 스키장이 셔틀로 가깝습니다.",
      "zh-tw": "新幹線車站周邊的溫泉旅館與滑雪飯店，多個雪場搭接駁車就到。",
      "zh-cn": "新干线车站周边的温泉旅馆与滑雪酒店，多个雪场坐接驳车就到。",
      th: "เรียวกังออนเซ็นและโรงแรมสกีรอบสถานีชินคันเซ็น มีลานสกีหลายแห่งใกล้ๆ นั่งรถรับส่งไม่นาน",
    },
    path: "destination/p50341570-yuzawa/3-hotel/",
  },
  gala: {
    name: { en: "GALA Yuzawa", ko: "가라유자와", "zh-tw": "GALA 湯澤", "zh-cn": "GALA 汤泽", th: "GALA ยูซาวะ" },
    station: { en: "GALA Yuzawa Station (ski season)", ko: "가라유자와역(겨울 한정)", "zh-tw": "GALA 湯澤站（冬季限定）", "zh-cn": "GALA 汤泽站（冬季限定）", th: "สถานี Gala-Yuzawa (เฉพาะฤดูหนาว)" },
    feature: {
      en: "Klook's hotel search around the resort itself, for a second ski day without the morning shinkansen.",
      ko: "리조트 주변 클룩 호텔 검색. 아침 신칸센 없이 이틀째 스키를 탈 수 있습니다.",
      "zh-tw": "Klook 的滑雪場周邊飯店搜尋，第二天滑雪不必一早再搭新幹線。",
      "zh-cn": "Klook 的滑雪场周边酒店搜索，第二天滑雪不必一早再坐新干线。",
      th: "หน้าค้นหาโรงแรมรอบรีสอร์ทของ Klook เล่นสกีวันที่สองได้โดยไม่ต้องนั่งชินคันเซ็นตอนเช้า",
    },
    path: "destination/p60271539-gala-yuzawa-snow-resort/3-hotel/",
  },

  // ── Arima / Kobe (two new ids, confirmed 27 Nov 2026) ─────────────────────
  arima: {
    name: { en: "Arima Onsen", ko: "아리마 온천", "zh-tw": "有馬溫泉", "zh-cn": "有马温泉", th: "อาริมะออนเซ็น" },
    station: { en: "Arima Onsen Station (Kobe Electric Railway)", ko: "아리마온센역(고베전철)", "zh-tw": "有馬溫泉站（神戶電鐵）", "zh-cn": "有马温泉站（神户电铁）", th: "สถานีอาริมะออนเซ็น (Kobe Electric Railway)" },
    feature: {
      en: "Ryokan in the hot-spring town itself — the night that lets you bathe after the day visitors have gone back to Osaka and Kobe.",
      ko: "온천 마을 안의 료칸. 당일 방문객이 오사카・고베로 돌아간 뒤 온천을 즐길 수 있습니다.",
      "zh-tw": "溫泉街裡的旅館，一日遊旅客回大阪、神戶後還能慢慢泡湯。",
      "zh-cn": "温泉街里的旅馆，一日游游客回大阪、神户后还能慢慢泡汤。",
      th: "เรียวกังในเมืองออนเซ็นเอง ได้แช่ออนเซ็นหลังนักท่องเที่ยวไปกลับกลับโอซาก้าและโกเบไปแล้ว",
    },
    path: "destination/p60271476-arima-onsen/3-hotel/",
  },
  kobe: {
    name: { en: "Kobe (Sannomiya)", ko: "고베(산노미야)", "zh-tw": "神戶（三宮）", "zh-cn": "神户（三宫）", th: "โกเบ (ซันโนมิยะ)" },
    station: { en: "Sannomiya Station", ko: "산노미야역", "zh-tw": "三宮站", "zh-cn": "三宫站", th: "สถานีซันโนมิยะ" },
    feature: {
      en: "Kobe's hub, with buses and the subway–Kobe Electric route up to Arima.",
      ko: "고베의 중심역으로, 버스나 지하철+고베전철로 아리마까지 갑니다.",
      "zh-tw": "神戶的交通中心，可搭巴士或地鐵轉神戶電鐵上有馬。",
      "zh-cn": "神户的交通中心，可坐巴士或地铁转神户电铁上有马。",
      th: "ศูนย์กลางของโกเบ มีรถบัสและเส้นทางรถไฟใต้ดินต่อ Kobe Electric ขึ้นไปอาริมะ",
    },
    path: "destination/c135-kobe/3-hotel/",
  },

  // ── Fukuoka / Beppu / Yufuin (two new ids, confirmed 27 Nov 2026) ─────────
  hakata: {
    name: { en: "Hakata Station", ko: "하카타역", "zh-tw": "博多站", "zh-cn": "博多站", th: "สถานีฮากาตะ" },
    station: { en: "Hakata Station", ko: "하카타역", "zh-tw": "博多站", "zh-cn": "博多站", th: "สถานีฮากาตะ" },
    feature: {
      en: "The shinkansen and the limited expresses to Beppu and Yufuin leave from here; the airport is two subway stops away.",
      ko: "신칸센과 벳푸・유후인행 특급열차가 출발하고, 공항까지 지하철로 두 정거장입니다.",
      "zh-tw": "新幹線與往別府、由布院的特急列車從這裡出發，到機場只要兩站地鐵。",
      "zh-cn": "新干线和去别府、由布院的特急列车从这里出发，到机场只要两站地铁。",
      th: "ชินคันเซ็นและรถด่วนพิเศษไปเบปปุและยูฟุอินออกจากที่นี่ สนามบินห่างไปสองสถานีรถไฟใต้ดิน",
    },
    path: "destination/p50007409-hakata-station/3-hotel/",
  },
  tenjin: {
    name: { en: "Tenjin", ko: "덴진", "zh-tw": "天神", "zh-cn": "天神", th: "เทนจิน" },
    station: { en: "Tenjin Station", ko: "덴진역", "zh-tw": "天神站", "zh-cn": "天神站", th: "สถานีเทนจิน" },
    feature: {
      en: "Fukuoka's shopping district, by the Nakasu yatai stalls and the Nishitetsu line to Dazaifu.",
      ko: "후쿠오카의 쇼핑가로, 나카스 포장마차와 다자이후행 니시테쓰선이 가깝습니다.",
      "zh-tw": "福岡的購物區，靠近中洲屋台與往太宰府的西鐵線。",
      "zh-cn": "福冈的购物区，靠近中洲屋台和去太宰府的西铁线。",
      th: "ย่านช้อปปิ้งของฟุกุโอกะ ใกล้แผงยาไตนากาสุและรถไฟ Nishitetsu ไปดาไซฟุ",
    },
    path: "destination/p60271225-tenjin-ward/3-hotel/",
  },
  beppu: {
    name: { en: "Beppu", ko: "벳푸", "zh-tw": "別府", "zh-cn": "别府", th: "เบปปุ" },
    station: { en: "Beppu Station (JR Nippo Line)", ko: "벳푸역(JR 닛포선)", "zh-tw": "別府站（JR 日豐本線）", "zh-cn": "别府站（JR 日丰本线）", th: "สถานีเบปปุ (JR Nippo Line)" },
    feature: {
      en: "Onsen hotels in Japan's biggest hot-spring town, with the Hells (jigoku) a bus ride from the station.",
      ko: "일본 최대 온천 마을의 온천 호텔. 지옥 순례(지고쿠)는 역에서 버스로 갑니다.",
      "zh-tw": "日本規模最大溫泉鄉的溫泉飯店，地獄巡禮從車站搭巴士就到。",
      "zh-cn": "日本规模最大温泉乡的温泉酒店，地狱巡游从车站坐巴士就到。",
      th: "โรงแรมออนเซ็นในเมืองออนเซ็นที่ใหญ่ที่สุดของญี่ปุ่น บ่อนรก (จิโกกุ) นั่งรถบัสจากสถานีไปได้",
    },
    path: "destination/c8601-beppu/3-hotel/",
  },
  yufuin: {
    name: { en: "Yufuin", ko: "유후인", "zh-tw": "由布院", "zh-cn": "由布院", th: "ยูฟุอิน" },
    station: { en: "Yufuin Station (JR Kyudai Line)", ko: "유후인역(JR 규다이선)", "zh-tw": "由布院站（JR 久大本線）", "zh-cn": "由布院站（JR 久大本线）", th: "สถานียูฟุอิน (JR Kyudai Line)" },
    feature: {
      en: "Ryokan in the valley town under Mt Yufu, quiet once the day-trip buses leave.",
      ko: "유후다케 아래 계곡 마을의 료칸. 당일 관광버스가 떠나면 조용해집니다.",
      "zh-tw": "由布岳下山谷小鎮的旅館，一日遊巴士離開後就安靜下來。",
      "zh-cn": "由布岳下山谷小镇的旅馆，一日游大巴离开后就安静下来。",
      th: "เรียวกังในเมืองหุบเขาใต้ภูเขายูฟุ เงียบสงบเมื่อรถบัสทัวร์ไปกลับออกไปแล้ว",
    },
    path: "destination/p50200619-yufuin/3-hotel/",
  },
} satisfies Record<string, HotelArea>;

export type HotelAreaKey = keyof typeof HOTEL_AREAS;

/**
 * The Stay22 map address for each area ("Area, City, Japan"), for the map under the
 * Klook buttons (components/Stay22Map.tsx, task jtk-20261127-A30). Each one was
 * checked on 27 Nov 2026 against the place Stay22 resolves it to: "Niseko Hirafu,
 * Kutchan" returns a 404 so Hirafu is written "Hirafu, Niseko", and "Tennoji" alone
 * resolves to the whole ward, so the station is named.
 */
export const HOTEL_AREA_MAP: Record<HotelAreaKey, string> = {
  shinjuku: "Shinjuku, Tokyo, Japan",
  tokyoStation: "Tokyo Station, Tokyo, Japan",
  ueno: "Ueno, Tokyo, Japan",
  shibuya: "Shibuya, Tokyo, Japan",
  ginza: "Ginza, Tokyo, Japan",
  odaiba: "Odaiba, Tokyo, Japan",
  roppongi: "Roppongi, Tokyo, Japan",
  disneyResort: "Tokyo Disney Resort, Urayasu, Japan",
  maihama: "Maihama, Urayasu, Japan",
  hakone: "Hakone, Kanagawa, Japan",
  hakoneOnsen: "Hakone-Yumoto, Hakone, Japan",
  lakeAshi: "Moto-Hakone, Hakone, Japan",
  kawaguchikoStation: "Kawaguchiko Station, Fujikawaguchiko, Japan",
  lakeKawaguchi: "Lake Kawaguchi, Fujikawaguchiko, Japan",
  fujiQ: "Fuji-Q Highland, Fujiyoshida, Japan",
  kyotoStation: "Kyoto Station, Kyoto, Japan",
  karasumaOike: "Karasuma Oike, Kyoto, Japan",
  gion: "Gion, Kyoto, Japan",
  umeda: "Umeda, Osaka, Japan",
  namba: "Namba, Osaka, Japan",
  tennoji: "Tennoji Station, Osaka, Japan",
  hiroshimaStation: "Hiroshima Station, Hiroshima, Japan",
  peacePark: "Hiroshima Peace Memorial Park, Hiroshima, Japan",
  miyajima: "Miyajima, Hatsukaichi, Japan",
  kanazawa: "Kanazawa Station, Kanazawa, Japan",
  kenrokuen: "Kenroku-en, Kanazawa, Japan",
  higashiChaya: "Higashi Chaya District, Kanazawa, Japan",
  sapporoStation: "Sapporo Station, Sapporo, Japan",
  susukino: "Susukino, Sapporo, Japan",
  niseko: "Hirafu, Niseko, Japan",
  hakuba: "Hakuba, Nagano, Japan",
  nozawa: "Nozawa Onsen, Nagano, Japan",
  nagano: "Nagano Station, Nagano, Japan",
  yuzawa: "Echigo-Yuzawa Station, Yuzawa, Japan",
  gala: "GALA Yuzawa, Yuzawa, Japan",
  arima: "Arima Onsen, Kobe, Japan",
  kobe: "Sannomiya, Kobe, Japan",
  hakata: "Hakata Station, Fukuoka, Japan",
  tenjin: "Tenjin, Fukuoka, Japan",
  beppu: "Beppu, Oita, Japan",
  yufuin: "Yufuin, Oita, Japan",
};

// ---------------------------------------------------------------------------
// Cities — the default areas and the "how to choose" page, where one exists
// ---------------------------------------------------------------------------

export type HotelCityDef = {
  name: HotelText;
  areas: HotelAreaKey[];
  /** The site's own where-to-stay guide for the city (English only for now). */
  guide?: string;
  /** A second internal page worth linking, e.g. the Disney hotel guide. */
  extra?: { href: string; label: HotelText };
};

export const HOTEL_CITIES = {
  tokyo: {
    name: { en: "Tokyo", ko: "도쿄", "zh-tw": "東京", "zh-cn": "东京", th: "โตเกียว" },
    areas: ["shinjuku", "tokyoStation", "ueno", "shibuya"],
    guide: "/guides/attractions/where-to-stay-in-tokyo",
  },
  "tokyo-disney": {
    name: { en: "Tokyo Disney Resort", ko: "도쿄 디즈니 리조트", "zh-tw": "東京迪士尼度假區", "zh-cn": "东京迪士尼度假区", th: "โตเกียวดิสนีย์รีสอร์ท" },
    areas: ["disneyResort", "maihama", "tokyoStation"],
    extra: {
      href: "/guides/attractions/tokyo-disney-hotels",
      label: {
        en: "Tokyo Disney hotels compared: official, partner and Good Neighbor",
        ko: "도쿄 디즈니 호텔 비교(영어)",
        "zh-tw": "東京迪士尼飯店比較（英文）",
        "zh-cn": "东京迪士尼酒店比较（英文）",
        th: "เปรียบเทียบโรงแรมโตเกียวดิสนีย์ (ภาษาอังกฤษ)",
      },
    },
  },
  kyoto: {
    name: { en: "Kyoto", ko: "교토", "zh-tw": "京都", "zh-cn": "京都", th: "เกียวโต" },
    areas: ["kyotoStation", "karasumaOike", "gion"],
    guide: "/guides/attractions/where-to-stay-in-kyoto",
  },
  osaka: {
    name: { en: "Osaka", ko: "오사카", "zh-tw": "大阪", "zh-cn": "大阪", th: "โอซาก้า" },
    areas: ["namba", "umeda", "tennoji"],
    guide: "/guides/attractions/where-to-stay-in-osaka",
  },
  hiroshima: {
    name: { en: "Hiroshima", ko: "히로시마", "zh-tw": "廣島", "zh-cn": "广岛", th: "ฮิโรชิม่า" },
    areas: ["hiroshimaStation", "peacePark", "miyajima"],
  },
  kanazawa: {
    name: { en: "Kanazawa", ko: "가나자와", "zh-tw": "金澤", "zh-cn": "金泽", th: "คานาซาว่า" },
    areas: ["kanazawa", "kenrokuen", "higashiChaya"],
  },
  hakone: {
    name: { en: "Hakone", ko: "하코네", "zh-tw": "箱根", "zh-cn": "箱根", th: "ฮาโกเน่" },
    areas: ["hakone", "hakoneOnsen", "lakeAshi"],
  },
  kawaguchiko: {
    name: { en: "Kawaguchiko", ko: "가와구치코", "zh-tw": "河口湖", "zh-cn": "河口湖", th: "คาวากุจิโกะ" },
    areas: ["kawaguchikoStation", "lakeKawaguchi", "fujiQ"],
  },
  sapporo: {
    name: { en: "Sapporo", ko: "삿포로", "zh-tw": "札幌", "zh-cn": "札幌", th: "ซัปโปโร" },
    areas: ["sapporoStation", "susukino"],
  },
  niseko: {
    name: { en: "Niseko", ko: "니세코", "zh-tw": "二世谷", "zh-cn": "二世谷", th: "นิเซโกะ" },
    areas: ["niseko", "sapporoStation"],
  },
  hakuba: {
    name: { en: "Hakuba", ko: "하쿠바", "zh-tw": "白馬", "zh-cn": "白马", th: "ฮาคุบะ" },
    areas: ["hakuba", "nagano"],
  },
  nozawa: {
    name: { en: "Nozawa Onsen", ko: "노자와 온천", "zh-tw": "野澤溫泉", "zh-cn": "野泽温泉", th: "โนซาวะออนเซ็น" },
    areas: ["nozawa", "nagano"],
  },
  "japan-ski": {
    name: { en: "the ski resorts", ko: "스키장", "zh-tw": "滑雪場", "zh-cn": "滑雪场", th: "รีสอร์ทสกี" },
    areas: ["hakuba", "nozawa", "niseko", "nagano"],
  },
  yuzawa: {
    name: { en: "Yuzawa", ko: "유자와", "zh-tw": "湯澤", "zh-cn": "汤泽", th: "ยูซาวะ" },
    areas: ["yuzawa", "gala", "tokyoStation"],
  },
  arima: {
    name: { en: "Arima Onsen", ko: "아리마 온천", "zh-tw": "有馬溫泉", "zh-cn": "有马温泉", th: "อาริมะออนเซ็น" },
    areas: ["arima", "kobe", "umeda"],
  },
  fukuoka: {
    name: { en: "Fukuoka", ko: "후쿠오카", "zh-tw": "福岡", "zh-cn": "福冈", th: "ฟุกุโอกะ" },
    areas: ["hakata", "tenjin"],
  },
  "beppu-yufuin": {
    name: { en: "Beppu and Yufuin", ko: "벳푸・유후인", "zh-tw": "別府・由布院", "zh-cn": "别府・由布院", th: "เบปปุและยูฟุอิน" },
    areas: ["beppu", "yufuin"],
  },
} satisfies Record<string, HotelCityDef>;

export type HotelCityKey = keyof typeof HOTEL_CITIES;

/** Every where-to-stay guide, for the home page and /guides entry block. */
export const WHERE_TO_STAY_GUIDES: { city: HotelCityKey; href: string }[] = [
  { city: "tokyo", href: "/guides/attractions/where-to-stay-in-tokyo" },
  { city: "kyoto", href: "/guides/attractions/where-to-stay-in-kyoto" },
  { city: "osaka", href: "/guides/attractions/where-to-stay-in-osaka" },
];
