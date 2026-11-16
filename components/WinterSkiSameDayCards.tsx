import type { ReactNode } from "react";
import Link from "next/link";
import KlookSameDayCards from "./KlookSameDayCards";
import { useComponentLocale } from "./componentLocale";
import {
  asahiyamaWinterBluePondTour,
  echigoYuzawaStationSkiRental,
  hakubaAirportShuttleBus,
  hakubaHapponeBusLiftRental,
  klookEsim,
  newChitoseSapporoSharedTransfer,
  nisekoLiftTicketGearDelivery,
  nisekoResortShuttleBus,
  nisekoSkiSnowboardRental,
  yuzawaNakazatoLiftRental,
  type KlookSameDayCard,
} from "../lib/klook-links";
import { klookFor } from "../lib/klook-locale";
import type { Locale } from "../lib/i18n";

/**
 * "Book for the same day" cards for the winter and ski pages (task jtk-20261116-04,
 * 16 Nov 2026), placed directly under each page's main CTA.
 *
 * Why: on 15 Nov three of the four bookings were Australian shinkansen tickets (2%),
 * one of them Tokyo → Echigo-Yuzawa — a ski trip that bought the train and not the
 * lift, the rental or the airport coach (6.5% and 5%). These cards put those next to
 * the button the ski reader has just looked at. Klook eSIM (20%) closes the winter
 * itinerary and Hokkaido sets.
 *
 * One component for all fifteen pages (three English, twelve translated) so the
 * five languages carry the same cards. Every fact on a card is from the Klook
 * listing, confirmed through the www.klook.com index (see lib/klook-links.ts). No
 * prices. Translated pages get the edition's own Klook locale path via klookFor().
 */
type Page = "winter" | "niseko" | "hokkaido7";
type Text = { kind: string; label: string; why: string; ctaLabel: string };
type Product = { url: string; text: Record<Locale, Text> };

const P: Record<string, Product> = {
  echigoRental: {
    url: echigoYuzawaStationSkiRental.url,
    text: {
      en: { kind: "Rental", label: echigoYuzawaStationSkiRental.title, ctaLabel: "Check the Yuzawa rental →", why: "About a minute's walk from Echigo-Yuzawa Station's west exit, with free shuttles to GALA Yuzawa and other resorts — the gear is sorted before you reach the lifts." },
      ko: { kind: "렌털", label: "에치고유자와 스키·스노보드 렌털(역 근처)", ctaLabel: "유자와 렌털 보기 →", why: "에치고유자와역 서쪽 출구에서 걸어서 약 1분이고 가라 유자와 등 스키장으로 가는 무료 셔틀이 있어, 리프트에 닿기 전에 장비를 준비할 수 있습니다." },
      "zh-tw": { kind: "裝備租借", label: "越後湯澤 滑雪・單板裝備租借（車站旁）", ctaLabel: "查看湯澤裝備租借 →", why: "距越後湯澤站西口步行約 1 分鐘，有免費接駁車前往 GALA 湯澤等雪場，到纜車前就先把裝備備妥。" },
      "zh-cn": { kind: "装备租赁", label: "越后汤泽 滑雪・单板装备租赁（车站旁）", ctaLabel: "查看汤泽装备租赁 →", why: "距越后汤泽站西口步行约 1 分钟，有免费接驳车前往 GALA 汤泽等雪场，到缆车前就先把装备备好。" },
      th: { kind: "เช่าอุปกรณ์", label: "เช่าชุดสกีและสโนว์บอร์ดที่เอจิโกะยูซาวะ (ใกล้สถานี)", ctaLabel: "ดูร้านเช่าที่ยูซาวะ →", why: "เดินจากทางออกฝั่งตะวันตกของสถานีเอจิโกะยูซาวะราว 1 นาที มีรถรับส่งฟรีไป GALA Yuzawa และลานสกีอื่น จึงได้อุปกรณ์ก่อนถึงลิฟต์" },
    },
  },
  nakazatoSet: {
    url: yuzawaNakazatoLiftRental.url,
    text: {
      en: { kind: "Lift + rental", label: yuzawaNakazatoLiftRental.title, ctaLabel: "Check Nakazato lift + rental →", why: "A one-day lift ticket and a rental set in one booking at a Yuzawa resort — for a shinkansen ski day that does not have to be GALA." },
      ko: { kind: "리프트＋렌털", label: "유자와 나카자토 스노 리조트 1일 리프트권＋렌털", ctaLabel: "나카자토 리프트＋렌털 보기 →", why: "유자와 지역 스키장의 1일 리프트권과 렌털 세트를 한 번에 예약합니다. 꼭 가라가 아니어도 되는 신칸센 스키 당일치기용입니다." },
      "zh-tw": { kind: "纜車＋租借", label: "湯澤中里雪場 1 日纜車券＋裝備租借", ctaLabel: "查看中里纜車＋租借 →", why: "湯澤地區雪場的 1 日纜車券與裝備租借一次訂好，適合不一定要去 GALA 的新幹線滑雪一日遊。" },
      "zh-cn": { kind: "缆车＋租赁", label: "汤泽中里雪场 1 日缆车券＋装备租赁", ctaLabel: "查看中里缆车＋租赁 →", why: "汤泽地区雪场的 1 日缆车券与装备租赁一次订好，适合不一定要去 GALA 的新干线滑雪一日游。" },
      th: { kind: "ลิฟต์ + เช่าอุปกรณ์", label: "ตั๋วลิฟต์ 1 วัน + เช่าอุปกรณ์ Yuzawa Nakazato Snow Resort", ctaLabel: "ดูตั๋วลิฟต์ + เช่า Nakazato →", why: "ตั๋วลิฟต์ 1 วันและชุดเช่าในการจองเดียวที่ลานสกีย่านยูซาวะ สำหรับวันสกีด้วยชินคันเซ็นที่ไม่จำเป็นต้องเป็น GALA" },
    },
  },
  happoOne: {
    url: hakubaHapponeBusLiftRental.url,
    text: {
      en: { kind: "Bus + lift + rental", label: "Hakuba Happo-one: bus from Tokyo + lift + rental", ctaLabel: "Check the Happo-one package →", why: "The round-trip coach from Tokyo, Happo-one's lift ticket and a ski or snowboard set in one checkout." },
      ko: { kind: "버스＋리프트＋렌털", label: "하쿠바 핫포오네: 도쿄 왕복 버스＋리프트권＋렌털", ctaLabel: "핫포오네 패키지 보기 →", why: "도쿄 왕복 버스, 핫포오네 리프트권, 스키 또는 스노보드 세트를 한 번에 결제합니다." },
      "zh-tw": { kind: "巴士＋纜車＋租借", label: "白馬八方尾根：東京來回巴士＋纜車券＋裝備租借", ctaLabel: "查看八方尾根套票 →", why: "東京來回巴士、八方尾根纜車券與滑雪或單板裝備，一次結帳。" },
      "zh-cn": { kind: "巴士＋缆车＋租赁", label: "白马八方尾根：东京往返巴士＋缆车券＋装备租赁", ctaLabel: "查看八方尾根套票 →", why: "东京往返巴士、八方尾根缆车券与滑雪或单板装备，一次结账。" },
      th: { kind: "รถบัส + ลิฟต์ + เช่า", label: "Hakuba Happo-one: รถบัสไปกลับจากโตเกียว + ตั๋วลิฟต์ + เช่าอุปกรณ์", ctaLabel: "ดูแพ็กเกจ Happo-one →", why: "รถบัสไปกลับจากโตเกียว ตั๋วลิฟต์ Happo-one และชุดสกีหรือสโนว์บอร์ด จ่ายครั้งเดียว" },
    },
  },
  nisekoShuttle: {
    url: nisekoResortShuttleBus.url,
    text: {
      en: { kind: "Airport transfer", label: "Niseko shuttle bus from New Chitose", ctaLabel: "Check the Niseko shuttle →", why: "A direct coach between New Chitose Airport and Niseko, with ski equipment and one piece of luggage per person in the booking." },
      ko: { kind: "공항 이동", label: "신치토세 공항–니세코 셔틀버스", ctaLabel: "니세코 셔틀 보기 →", why: "신치토세 공항과 니세코를 잇는 직행 버스로, 스키 장비와 1인 1개 짐이 예약에 포함됩니다." },
      "zh-tw": { kind: "機場接送", label: "新千歲機場–二世谷接駁巴士", ctaLabel: "查看二世谷接駁 →", why: "新千歲機場與二世谷之間的直達巴士，預訂已含滑雪裝備與每人 1 件行李。" },
      "zh-cn": { kind: "机场接送", label: "新千岁机场–二世谷接驳巴士", ctaLabel: "查看二世谷接驳 →", why: "新千岁机场与二世谷之间的直达巴士，预订已含滑雪装备与每人 1 件行李。" },
      th: { kind: "รถรับส่งสนามบิน", label: "รถบัสรับส่งสนามบินนิวชิโตเสะ–นิเซโกะ", ctaLabel: "ดูรถรับส่งนิเซโกะ →", why: "รถบัสตรงระหว่างสนามบินนิวชิโตเสะกับนิเซโกะ รวมอุปกรณ์สกีและกระเป๋า 1 ใบต่อคนในการจอง" },
    },
  },
  hakubaShuttle: {
    url: hakubaAirportShuttleBus.url,
    text: {
      en: { kind: "Airport transfer", label: "Hakuba shuttle bus from Narita / Haneda", ctaLabel: "Check the Hakuba shuttle →", why: "A coach from Narita, Haneda or Tokyo to the main Hakuba resorts, with ski equipment and one piece of luggage per person included." },
      ko: { kind: "공항 이동", label: "나리타·하네다–하쿠바 셔틀버스", ctaLabel: "하쿠바 셔틀 보기 →", why: "나리타, 하네다 또는 도쿄에서 하쿠바 주요 스키장까지 가는 버스로, 스키 장비와 1인 1개 짐이 포함됩니다." },
      "zh-tw": { kind: "機場接送", label: "成田・羽田–白馬接駁巴士", ctaLabel: "查看白馬接駁 →", why: "從成田、羽田或東京前往白馬主要雪場的巴士，含滑雪裝備與每人 1 件行李。" },
      "zh-cn": { kind: "机场接送", label: "成田・羽田–白马接驳巴士", ctaLabel: "查看白马接驳 →", why: "从成田、羽田或东京前往白马主要雪场的巴士，含滑雪装备与每人 1 件行李。" },
      th: { kind: "รถรับส่งสนามบิน", label: "รถบัสรับส่งนาริตะ/ฮาเนดะ–ฮาคุบะ", ctaLabel: "ดูรถรับส่งฮาคุบะ →", why: "รถบัสจากนาริตะ ฮาเนดะ หรือโตเกียวไปลานสกีหลักของฮาคุบะ รวมอุปกรณ์สกีและกระเป๋า 1 ใบต่อคน" },
    },
  },
  nisekoSet: {
    url: nisekoLiftTicketGearDelivery.url,
    text: {
      en: { kind: "Lift + rental", label: nisekoLiftTicketGearDelivery.title, ctaLabel: "Check Niseko lift + rental →", why: "A Hirafu and Hanazono lift ticket with a ski or snowboard set; the shop brings the gear to your Niseko hotel after a call the day before." },
      ko: { kind: "리프트＋렌털", label: "니세코 리프트권＋장비 배달 렌털", ctaLabel: "니세코 리프트＋렌털 보기 →", why: "히라후·하나조노 공통 리프트권과 스키 또는 스노보드 세트입니다. 전날 가게에 전화하면 니세코 숙소로 장비를 가져다줍니다." },
      "zh-tw": { kind: "纜車＋租借", label: "二世谷纜車券＋裝備送到住宿", ctaLabel: "查看二世谷纜車＋租借 →", why: "比羅夫與花園共通纜車券加滑雪或單板裝備；前一天打電話給店家，就會把裝備送到你在二世谷的住宿。" },
      "zh-cn": { kind: "缆车＋租赁", label: "二世谷缆车券＋装备送到住处", ctaLabel: "查看二世谷缆车＋租赁 →", why: "比罗夫与花园共通缆车券加滑雪或单板装备；前一天给店家打电话，就会把装备送到你在二世谷的住处。" },
      th: { kind: "ลิฟต์ + เช่าอุปกรณ์", label: "ตั๋วลิฟต์นิเซโกะ + เช่าอุปกรณ์ส่งถึงที่พัก", ctaLabel: "ดูตั๋วลิฟต์ + เช่านิเซโกะ →", why: "ตั๋วลิฟต์ร่วม Hirafu และ Hanazono พร้อมชุดสกีหรือสโนว์บอร์ด โทรหาร้านล่วงหน้า 1 วัน แล้วร้านจะนำอุปกรณ์ไปส่งที่พักในนิเซโกะ" },
    },
  },
  nisekoRental: {
    url: nisekoSkiSnowboardRental.url,
    text: {
      en: { kind: "Rental", label: "Niseko ski & snowboard rental (Hirafu)", ctaLabel: "Check Niseko rental →", why: "Ski or snowboard, boots and outerwear reserved before you fly, collected in Hirafu at the foot of the lifts." },
      ko: { kind: "렌털", label: "니세코 스키·스노보드 렌털(히라후)", ctaLabel: "니세코 렌털 보기 →", why: "스키 또는 스노보드, 부츠, 스키복을 출국 전에 예약하고 리프트 아래 히라후에서 받습니다." },
      "zh-tw": { kind: "裝備租借", label: "二世谷滑雪・單板裝備租借（比羅夫）", ctaLabel: "查看二世谷租借 →", why: "滑雪板或單板、雪靴與雪衣出發前訂好，在纜車下方的比羅夫取件。" },
      "zh-cn": { kind: "装备租赁", label: "二世谷滑雪・单板装备租赁（比罗夫）", ctaLabel: "查看二世谷租赁 →", why: "滑雪板或单板、雪靴与雪服出发前订好，在缆车下方的比罗夫取件。" },
      th: { kind: "เช่าอุปกรณ์", label: "เช่าชุดสกีและสโนว์บอร์ดนิเซโกะ (ฮิราฟุ)", ctaLabel: "ดูร้านเช่านิเซโกะ →", why: "จองสกีหรือสโนว์บอร์ด รองเท้า และชุดกันหนาวก่อนบิน แล้วรับที่ฮิราฟุใกล้ลิฟต์" },
    },
  },
  asahiyama: {
    url: asahiyamaWinterBluePondTour.url,
    text: {
      en: { kind: "Winter tour", label: "Winter Asahiyama Zoo & Blue Pond light-up day trip", ctaLabel: "Check the Asahiyama winter tour →", why: "Zoo admission and the round-trip coach from Sapporo in the booking, ending at the lit Blue Pond after dark; lunch is at your own cost." },
      ko: { kind: "겨울 투어", label: "겨울 아사히야마 동물원·청의 호수 라이트업 당일 투어", ctaLabel: "아사히야마 겨울 투어 보기 →", why: "동물원 입장료와 삿포로 왕복 버스가 포함되고, 해가 진 뒤 라이트업된 청의 호수에서 마칩니다. 점심은 개인 부담입니다." },
      "zh-tw": { kind: "冬季行程", label: "冬季旭山動物園・白鬚瀑布・青池點燈一日遊", ctaLabel: "查看旭山冬季行程 →", why: "含動物園門票與札幌來回巴士，天黑後在點燈的青池結束；午餐自費。" },
      "zh-cn": { kind: "冬季行程", label: "冬季旭山动物园・白须瀑布・青池点灯一日游", ctaLabel: "查看旭山冬季行程 →", why: "含动物园门票与札幌往返巴士，天黑后在点灯的青池结束；午餐自理。" },
      th: { kind: "ทัวร์ฤดูหนาว", label: "ทัวร์ฤดูหนาวสวนสัตว์อาซาฮิยามะ น้ำตกชิราฮิเกะ และบ่อน้ำสีฟ้าประดับไฟ", ctaLabel: "ดูทัวร์อาซาฮิยามะฤดูหนาว →", why: "รวมค่าเข้าสวนสัตว์และรถบัสไปกลับจากซัปโปโร จบที่บ่อน้ำสีฟ้าประดับไฟหลังมืด ค่าอาหารกลางวันจ่ายเอง" },
    },
  },
  chitoseTransfer: {
    url: newChitoseSapporoSharedTransfer.url,
    text: {
      en: { kind: "Airport transfer", label: "New Chitose Airport shared transfer to Sapporo", ctaLabel: "Check the airport transfer →", why: "A shared transfer between New Chitose and Sapporo; the listing sets the pick-up 45 minutes after a domestic arrival and 90 after an international one." },
      ko: { kind: "공항 이동", label: "신치토세 공항 합승 송영(삿포로)", ctaLabel: "공항 송영 보기 →", why: "신치토세와 삿포로를 잇는 합승 송영입니다. 상품 페이지 기준 픽업은 국내선 도착 45분 후, 국제선 도착 90분 후입니다." },
      "zh-tw": { kind: "機場接送", label: "新千歲機場共乘接送（札幌）", ctaLabel: "查看機場接送 →", why: "新千歲機場與札幌之間的共乘接送；商品頁規定接機時間為國內線抵達後 45 分鐘、國際線抵達後 90 分鐘。" },
      "zh-cn": { kind: "机场接送", label: "新千岁机场拼车接送（札幌）", ctaLabel: "查看机场接送 →", why: "新千岁机场与札幌之间的拼车接送；商品页规定接机时间为国内航班抵达后 45 分钟、国际航班抵达后 90 分钟。" },
      th: { kind: "รถรับส่งสนามบิน", label: "รถรับส่งแบบรวมสนามบินนิวชิโตเสะ (ซัปโปโร)", ctaLabel: "ดูรถรับส่งสนามบิน →", why: "รถรับส่งแบบรวมระหว่างนิวชิโตเสะกับซัปโปโร หน้าสินค้ากำหนดเวลารับ 45 นาทีหลังเที่ยวบินในประเทศถึง และ 90 นาทีหลังเที่ยวบินระหว่างประเทศถึง" },
    },
  },
  esim: {
    url: klookEsim.url,
    text: {
      en: { kind: "eSIM", label: "Klook Japan eSIM", ctaLabel: "See eSIM options on Klook →", why: "Lift holds for wind, held trains and pick-up changes all reach your phone on the morning itself." },
      ko: { kind: "eSIM", label: "클룩 일본 eSIM", ctaLabel: "클룩 eSIM 보기 →", why: "강풍에 따른 리프트 운행 중지, 열차 지연, 픽업 변경 소식은 모두 당일 아침 휴대폰으로 옵니다." },
      "zh-tw": { kind: "eSIM", label: "Klook 日本 eSIM", ctaLabel: "查看 Klook eSIM →", why: "強風停駛的纜車、延誤的列車與集合地點變更，都是當天早上傳到手機上。" },
      "zh-cn": { kind: "eSIM", label: "Klook 日本 eSIM", ctaLabel: "查看 Klook eSIM →", why: "强风停运的缆车、延误的列车与集合地点变更，都是当天早上发到手机上。" },
      th: { kind: "eSIM", label: "Klook eSIM ญี่ปุ่น", ctaLabel: "ดู Klook eSIM →", why: "ลิฟต์หยุดเพราะลมแรง รถไฟล่าช้า และการเปลี่ยนจุดนัดรับ ล้วนแจ้งผ่านมือถือในเช้าวันนั้น" },
    },
  },
};

const CARDS: Record<Page, string[]> = {
  winter: ["echigoRental", "nakazatoSet", "happoOne", "nisekoShuttle", "hakubaShuttle", "esim"],
  niseko: ["nisekoShuttle", "nisekoSet", "nisekoRental"],
  hokkaido7: ["asahiyama", "chitoseTransfer", "esim"],
};

const HEADING: Record<Page, Record<Locale, string>> = {
  winter: {
    en: "Ski or Snow Day? Book the Lift, Rental and Transfer With the Train",
    ko: "스키·눈 여행이라면 신칸센과 같은 날 예약해 둘 것",
    "zh-tw": "滑雪・賞雪行程：和新幹線同一天要先訂的東西",
    "zh-cn": "滑雪・赏雪行程：和新干线同一天要先订的东西",
    th: "ทริปสกีและหิมะ: สิ่งที่ควรจองไว้สำหรับวันเดียวกับชินคันเซ็น",
  },
  niseko: {
    en: "Airport Coach, Lift and Rental: What to Book for Your First Niseko Day",
    ko: "니세코 첫날 같이 예약해 둘 것: 공항 버스, 리프트, 렌털",
    "zh-tw": "二世谷第一天要一起訂的：機場巴士、纜車與裝備",
    "zh-cn": "二世谷第一天要一起订的：机场巴士、缆车与装备",
    th: "วันแรกที่นิเซโกะ: รถบัสสนามบิน ลิฟต์ และอุปกรณ์ที่ควรจองพร้อมกัน",
  },
  hokkaido7: {
    en: "Doing the Winter Version? Book the Asahiyama Day and the Airport Run Together",
    ko: "겨울 버전이라면 함께 예약할 것: 아사히야마 투어와 공항 송영",
    "zh-tw": "走冬季版本：旭山一日遊與機場接送一起訂",
    "zh-cn": "走冬季版本：旭山一日游与机场接送一起订",
    th: "ถ้าไปฤดูหนาว: จองทัวร์อาซาฮิยามะและรถรับส่งสนามบินไว้พร้อมกัน",
  },
};

/** A link to an English-only guide, marked as English on the translated editions. */
function EnLink({ href, locale, children }: { href: string; locale: Locale; children: ReactNode }) {
  return locale === "en" ? <Link href={href}>{children}</Link> : <Link href={href} hrefLang="en">{children}</Link>;
}

function footnote(page: Page, locale: Locale): ReactNode {
  const nisekoHref = locale === "en" ? "/guides/attractions/niseko-ski-tours" : `/${locale}/guides/attractions/niseko-ski-tours`;
  const gala = "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo";
  const winterTours = "/guides/attractions/hokkaido-winter-tours";
  const sapporo3 = "/guides/attractions/sapporo-3-day-itinerary";
  if (page === "winter") {
    const copy: Record<Locale, [string, string, string, string, string]> = {
      en: ["Taking the Joetsu Shinkansen to Echigo-Yuzawa? Our ", "GALA Yuzawa day trip from Tokyo", " guide has the direct trains, the JR Pass rule and the lift prices, and the ", "Niseko ski tours", " guide covers the New Chitose side."],
      ko: ["조에쓰 신칸센으로 에치고유자와에 간다면 ", "도쿄 출발 가라 유자와 당일치기 가이드(영어)", "에 직행 열차, JR 패스 규칙, 리프트 요금이 있고, 신치토세 쪽은 ", "니세코 스키 투어 가이드", "에 있습니다."],
      "zh-tw": ["搭上越新幹線去越後湯澤的話，", "東京出發 GALA 湯澤一日遊指南（英文）", "有直達列車、JR Pass 規則與纜車票價；新千歲這一側請看", "二世谷滑雪行程指南", "。"],
      "zh-cn": ["坐上越新干线去越后汤泽的话，", "东京出发 GALA 汤泽一日游指南（英文）", "有直达列车、JR Pass 规则与缆车票价；新千岁这一侧请看", "二世谷滑雪行程指南", "。"],
      th: ["ถ้านั่งชินคันเซ็นโจเอ็ตสึไปเอจิโกะยูซาวะ ", "คู่มือเที่ยว GALA Yuzawa แบบไปกลับจากโตเกียว (ภาษาอังกฤษ)", " มีรถไฟตรง กติกา JR Pass และราคาลิฟต์ ส่วนฝั่งนิวชิโตเสะดูได้ที่ ", "คู่มือทัวร์สกีนิเซโกะ", ""],
    };
    const [a, b, c, d, e] = copy[locale];
    return (
      <>
        {a}
        <EnLink href={gala} locale={locale}>{b}</EnLink>
        {c}
        <Link href={nisekoHref}>{d}</Link>
        {e}
      </>
    );
  }
  const copy: Record<Locale, [string, string, string]> =
    page === "niseko"
      ? {
          en: ["Staying in Sapporo rather than at the resort? Our ", "Hokkaido winter tours", " guide compares the day tours out of the city, Niseko among them."],
          ko: ["리조트가 아니라 삿포로에 묵는다면 ", "홋카이도 겨울 투어 가이드(영어)", "에서 니세코를 포함한 삿포로 출발 당일 투어를 비교합니다."],
          "zh-tw": ["如果住札幌而不是雪場，", "北海道冬季行程指南（英文）", "比較了從札幌出發、包含二世谷在內的一日遊。"],
          "zh-cn": ["如果住札幌而不是雪场，", "北海道冬季行程指南（英文）", "比较了从札幌出发、包含二世谷在内的一日游。"],
          th: ["ถ้าพักที่ซัปโปโรแทนรีสอร์ต ", "คู่มือทัวร์ฤดูหนาวฮอกไกโด (ภาษาอังกฤษ)", " เปรียบเทียบทัวร์ไปกลับจากซัปโปโร รวมถึงนิเซโกะ"],
        }
      : {
          en: ["Three nights in Sapporo rather than a week? Our ", "Sapporo 3-day itinerary", " fits Otaru and Asahiyama around one city base."],
          ko: ["일주일이 아니라 삿포로 3박이라면 ", "삿포로 3일 일정(영어)", "에서 도시 숙소 하나로 오타루와 아사히야마를 다녀오는 방법을 정리했습니다."],
          "zh-tw": ["如果只在札幌住三晚而不是一週，", "札幌 3 日行程（英文）", "以市區一個住處安排小樽與旭山。"],
          "zh-cn": ["如果只在札幌住三晚而不是一周，", "札幌 3 日行程（英文）", "以市区一个住处安排小樽与旭山。"],
          th: ["ถ้าพักซัปโปโร 3 คืนแทนหนึ่งสัปดาห์ ", "แผนเที่ยวซัปโปโร 3 วัน (ภาษาอังกฤษ)", " จัดโอตารุและอาซาฮิยามะจากที่พักในเมืองแห่งเดียว"],
        };
  const [a, b, c] = copy[locale];
  return (
    <>
      {a}
      <EnLink href={page === "niseko" ? winterTours : sapporo3} locale={locale}>{b}</EnLink>
      {c}
    </>
  );
}

export default function WinterSkiSameDayCards({ page }: { page: Page }) {
  const locale = useComponentLocale();
  const cards: KlookSameDayCard[] = CARDS[page].map((key) => {
    const product = P[key];
    return {
      ...product.text[locale],
      url: locale === "en" ? product.url : klookFor(product.url, locale),
    };
  });
  return (
    <KlookSameDayCards
      heading={HEADING[page][locale]}
      cards={cards}
      adPlacement="ski-same-day"
      footnote={footnote(page, locale)}
    />
  );
}
