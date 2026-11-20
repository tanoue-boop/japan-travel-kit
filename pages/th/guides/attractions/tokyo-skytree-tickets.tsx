import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import styles from "../../../../styles/BestEsimJapan.module.css";
import { seoTags } from "../../../../components/IntlSeo";
import {
  KLOOK_REL,
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
  type FaqItem,
} from "../../../../components/IntlChrome";
import KlookLink from "../../../../components/KlookLink";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { GygCompareButton } from "../../../../components/GygCompare";
import { gygTokyoSkytree } from "../../../../lib/gyg-links";
import {
  skytreeTicket,
  skytreeAquariumCombo,
  fujiHakoneDayTour,
  tokyoSightseeingBusTour,
  skytreeTripPrep,
  skytreeSameDayCards,
  type KlookSameDayCard,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (/guides/attractions/tokyo-skytree-tickets) block for block as of
// 2026-11-01, re-synced 2026-11-10 (answer-first opening, question headings, hours and
// cancellation table, three FAQs). Every figure comes from that page or lib/attraction-prices.ts.

// R02 (19 Nov 2026): re-synced with the English rewrite — answer-first paragraph, weekday /
// weekend / on-the-day price table, 350 vs 450 table, Skytree vs Shibuya Sky vs Tokyo Tower
// table with official URLs, five FAQs in FAQPage and the rest under "more questions".

const ROUTE = "/th/guides/attractions/tokyo-skytree-tickets";
const TITLE = "ตั๋ว Tokyo Skytree ราคา 2026 350/450";
const DESC =
  "ทางการ 19 พ.ย. 2026: 350ม. เริ่ม ¥1,800 คอมโบ+450ม. ออนไลน์ ¥3,000 หน้างาน +¥500";

const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, "th");
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");

const SKYTREE_TICKET_URL = "https://en.tokyo-skytree.jp/ticket/";
const SKYTREE_HOURS_URL = "https://en.tokyo-skytree.jp/open-hours/day_hours/";
const TOKYO_TOWER_FEE_URL = "https://www.tokyotower.co.jp/fee/";
const SHIBUYA_SKY_CHECKED = dateLabel(PRICES.shibuyaSky.checked, "th");

const TICKET_URL = klookFor(skytreeTicket.url, "th");
const GYG_SLUG = "th-tokyo-skytree-tickets";

const tripPrepItems = [
  withKlookLocale(skytreeTripPrep[0], "th", {
    label: "โรงแรมย่านอุเอโนะ / อาซากุสะ",
    ctaLabel: "ดูโรงแรมย่านอุเอโนะและอาซากุสะบน Klook →",
    why: "อยู่ฝั่งแม่น้ำสุมิดะเดียวกับ Tokyo Skytree อุเอโนะอยู่บนสายยามาโนเตะ จากนั้นสายกินซ่าวิ่งไปถึงอาซากุสะ และโอชิอาเกะอยู่ถัดไปอีกสองสถานีบนสายอาซากุสะ หลังชมวิวรอบค่ำจึงไม่ต้องนั่งรถไฟข้ามเมืองเพื่อกลับโรงแรม",
  }),
  withKlookLocale(skytreeTripPrep[1], "th", {
    label: "เช่ากิโมโน Kimono Yae ที่อาซากุสะ",
    ctaLabel: "ดูร้านเช่ากิโมโนที่อาซากุสะ →",
    why: "กิจกรรมช่วงกลางวันในทริปเดียวกัน ห่างไปสองสถานี ร้านอยู่ข้างประตูคามินาริมง และหน้าสินค้าระบุให้คืนชุดภายใน 17:30 จึงจัดไว้ก่อนขึ้น Skytree รอบเย็นได้พอดีโดยเวลาไม่ทับซ้อนกัน",
  }),
  withKlookLocale(skytreeTripPrep[2], "th", {
    label: "รถบัส Hop-on hop-off โตเกียว (Skyhop Bus)",
    ctaLabel: "ดูตั๋วรถบัสหลังคาเปิด →",
    why: "ตั๋วรถบัสหลังคาเปิดแบบขึ้นลงได้ไม่จำกัด ที่มีเส้นทางผ่านอาซากุสะ เหมาะซื้อถ้าวันนั้นมีทั้งวัดเซ็นโซจิและหอ แทนที่จะแวะจุดเดียวแล้วจ่ายค่ารถไฟใต้ดินทุกช่วง",
  }),
  withKlookLocale(skytreeTripPrep[3], "th", {
    label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    ctaLabel: "ดูตั๋วรถไฟใต้ดิน →",
    why: "โอชิอาเกะเป็นสถานีรถไฟใต้ดินของสายฮันโซมงและสายโทเออาซากุสะ ตั๋ว Metro และ Toei แบบ 24, 48 หรือ 72 ชั่วโมงจึงใช้เดินทางไป Tokyo Skytree ได้ รวมถึงสองสถานีไปวัดเซ็นโซจิหลังจากนั้นด้วย",
  }),
];

// P01 (14 Nov 2026): the same-day cards under the main CTA, as on the English page — an Asakusa
// guided walk (6.5%), an Asakusa kimono rental (6.5%) and the Tokyo Subway Ticket (5%). The pass
// reuses the label below; the Around-the-tower block drops it so it is not listed twice.
// R02 (19 Nov 2026): fourth card, the Asakusa–Odaiba Tokyo Mizube Line cruise, as in lib/klook-links.ts.
const sameDayCards: KlookSameDayCard[] = [
  withKlookLocale(skytreeSameDayCards[0], "th", {"kind":"ทัวร์","label":"ทัวร์เดินเที่ยวอาซากุสะและวัดเซ็นโซจิครึ่งวัน","ctaLabel":"ดูทัวร์เดินอาซากุสะ →","why":"เดินชมคามินาริมง ถนนนากามิเสะ และวัดเซ็นโซจิกับไกด์ภาษาอังกฤษ อยู่ห่างจาก Tokyo Skytree สองสถานีบนสายอาซากุสะ"}),
  withKlookLocale(skytreeSameDayCards[1], "th", {"kind":"กิโมโน","label":"เช่ากิโมโนพร้อมทำผม (Aiwafuku อาซากุสะ สาขา 1)","ctaLabel":"ดูร้านเช่ากิโมโนอาซากุสะ →","why":"เช่า 6 ชั่วโมงรวมทำผม ร้านอยู่ที่อาซากุสะ ห่างจาก Tokyo Skytree สองสถานี"}),
  { ...withKlookLocale(skytreeSameDayCards[2], "th"), label: tripPrepItems[3].label, ctaLabel: tripPrepItems[3].ctaLabel, kind: "พาส", why: "โอชิอาเกะอยู่บนสายฮันโซมงและโทเออาซากุสะ ตั๋ว 24/48/72 ชั่วโมงจึงใช้เดินทางไปได้ทั้ง Tokyo Skytree และอาซากุสะ" },
  withKlookLocale(skytreeSameDayCards[3], "th", {
    kind: "ล่องเรือ",
    label: "ล่องเรืออาซากุสะ–โอไดบะ สาย Tokyo Mizube Line",
    ctaLabel: "ดูเรือล่องแม่น้ำสุมิดะ →",
    why: "ออกจากอาซากุสะบริเวณริมแม่น้ำฝั่งตรงข้ามหอ แล่นไปตามแม่น้ำสุมิดะจนถึงโอไดบะ เป็นเส้นทางเที่ยวต่อหลังขึ้นจุดชมวิว",
  }),
];
const aroundTowerItems = tripPrepItems.filter((item) => !sameDayCards.some((card) => card.url === item.url));

const tourPicks = [
  withKlookLocale(skytreeAquariumCombo, "th", {
    title: "ตั๋วคอมโบ Tokyo Skytree + Sumida Aquarium",
    desc: "ตั๋วรวมจุดชมวิวกับพิพิธภัณฑ์สัตว์น้ำในคอมเพล็กซ์ Solamachi ที่ฐานหอ",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "th", {
    title: "ทัวร์รถบัสเที่ยวโตเกียว 1 วัน",
    desc: "ทัวร์พร้อมไกด์ที่พาเที่ยวรอบสวนพระราชวังอิมพีเรียล อาซากุสะ และ Tokyo Skytree พร้อมออดิโอไกด์หลายภาษา",
  }),
  withKlookLocale(fujiHakoneDayTour, "th", {
    title: "ทัวร์ 1 วัน ภูเขาไฟฟูจิ＋ฮาโกเน่",
    desc: "สถานีที่ 5 ของภูเขาไฟฟูจิ คู่กับเขตภูเขาไฟฮาโกเน่และทะเลสาบอาชิ เป็นทริปไปกลับหนึ่งวันจากโตเกียว",
  }),
];

const SAME_DAY = "ราคาของวันที่คุณไป + ¥500";
const NOT_SOLD = "ไม่ขายแยก";

const priceRows = [
  {
    ticket: "สรุป: คอมโบ (350 ม. + 450 ม.) ออนไลน์ ผู้ใหญ่",
    weekday: "เริ่มต้น ¥3,000",
    weekend: "เริ่มต้น ¥3,000",
    sameDay: SAME_DAY,
  },
  { ticket: "Tembo Deck (350 ม.) — ผู้ใหญ่ (15 ปีขึ้นไป)", weekday: ADULT, weekend: ADULT, sameDay: SAME_DAY },
  { ticket: "Tembo Deck (350 ม.) — เด็ก (6–14 ปี)", weekday: CHILD, weekend: CHILD, sameDay: SAME_DAY },
  { ticket: "คอมโบ 350 ม. + 450 ม. — เด็ก (6–14 ปี)", weekday: "เริ่มต้น ¥1,500", weekend: "เริ่มต้น ¥1,500", sameDay: SAME_DAY },
  { ticket: "Tembo Galleria (450 ม.) เพิ่มที่หน้างาน — ผู้ใหญ่", weekday: NOT_SOLD, weekend: NOT_SOLD, sameDay: "¥1,400 (ไม่มีค่าธรรมเนียม)" },
  { ticket: "Tembo Galleria (450 ม.) เพิ่มที่หน้างาน — เด็ก", weekday: NOT_SOLD, weekend: NOT_SOLD, sameDay: "¥700 (ไม่มีค่าธรรมเนียม)" },
  { ticket: "อายุไม่เกิน 5 ปี", weekday: "ฟรี", weekend: "ฟรี", sameDay: "ฟรี" },
];

const floorRows = [
  { item: "สรุป", deck: "เพียงพอสำหรับชมวิว", galleria: "คุ้มถ้าความสูงคือเป้าหมาย ให้ซื้อเป็นคอมโบ" },
  { item: "ความสูง", deck: "ชั้น 340, 345 และ 350", galleria: "ชั้น 445 และ 450 จุดสูงสุด 451.2 ม. (Sorakara Point)" },
  { item: "วิธีขึ้น", deck: "รวมอยู่ในตั๋วทุกใบ", galleria: "ขึ้น Tembo Shuttle จากชั้น 350 ต้องมีตั๋ว Tembo Deck ก่อน" },
  { item: "ราคาผู้ใหญ่", deck: "เริ่มต้น ¥1,800", galleria: "+¥1,200 ในคอมโบออนไลน์ (เริ่มต้น ¥3,000) หรือ +¥1,400 เมื่อเพิ่มในวันเข้าชม" },
  { item: "ความหนาแน่นและการขายหมด", deck: "รอบเวลาหน้างานขึ้นอยู่กับแต่ละวัน และอาจต้องต่อคิว", galleria: "การขายเพิ่มในวันนั้นอาจหยุดชั่วคราวเมื่อคนเต็ม คอมโบรับประกันสิทธิ์เข้าไว้แล้ว" },
  { item: "ค่าธรรมเนียมในวันเข้าชม", deck: "+¥500 ต่อใบ ที่เคาน์เตอร์และเครื่องขายตั๋ว", galleria: "ตั๋วเพิ่มไม่มีค่าธรรมเนียม" },
];

const towerRows = [
  {
    deck: "สรุป",
    price: "Skytree สำหรับความสูง Shibuya Sky สำหรับพระอาทิตย์ตกแบบกลางแจ้ง Tokyo Tower ถูกที่สุดและเปิดดึกที่สุด",
    hours: "",
    sunset: "",
  },
  {
    deck: "Tokyo Skytree (350 ม. / 450 ม.)",
    price: "เริ่มต้น ¥1,800 (350 ม.) เริ่มต้น ¥3,000 (350 ม. + 450 ม.) +¥500 ในวันเข้าชม",
    hours: "10:00–22:00 รับเข้าครั้งสุดท้าย 21:00 (19 พ.ย. 2026 เปลี่ยนตามวัน)",
    sunset: "ในอาคารหลังกระจก พระอาทิตย์ตก 16:31 วันที่ 19 พ.ย. 2026",
  },
  {
    deck: "SHIBUYA SKY (ดาดฟ้า 229 ม.)",
    price: `${PRICES.shibuyaSky.adult} ออนไลน์ (ก่อน / ตั้งแต่ 15:00)`,
    hours: "10:00–22:30 เข้าครั้งสุดท้าย 21:20",
    sunset: "กลางแจ้ง รอบพระอาทิตย์ตกอยู่ในช่วงราคาที่สูงกว่า",
  },
  {
    deck: "Tokyo Tower (150 ม. / 250 ม.)",
    price: "Main Deck ¥1,500 Top Deck Tour ¥3,300 บนเว็บ / ¥3,500 ที่เคาน์เตอร์",
    hours: "Main Deck 9:00–23:00 เข้าครั้งสุดท้าย 22:30",
    sunset: "จุดชมวิวในอาคาร เปิดดึกที่สุดในสามแห่ง",
  },
];

// Same rows as the English guide's visitRows, read off en.tokyo-skytree.jp on 10 Nov 2026.
const visitRows = [
  { item: "เวลาเปิด (10 พ.ย. 2026)", detail: "10:00–22:00 รับเข้าครั้งสุดท้าย 21:00 เวลาเปิดกำหนดเป็นรายวันและอาจเปลี่ยนโดยไม่แจ้งล่วงหน้า รับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิดเสมอ" },
  { item: "เปลี่ยนวันหรือเวลา", detail: "ทำไม่ได้ ต้องยกเลิกแล้วซื้อใหม่ การเปลี่ยนระหว่างคอมโบกับตั๋ว Tembo Deck ก็เช่นกัน" },
  { item: "ค่ายกเลิก (ตั๋วออนไลน์ทางการ)", detail: "0% ถึง 31 วันก่อนเข้าชม 20% ตั้งแต่ 30 วันก่อนจนถึงเวลาเข้า 100% หลังเวลาเข้า ยกเลิกภายใน 59 นาทีหลังซื้อไม่มีค่าธรรมเนียม" },
  { item: "ซื้อในวันเข้าชม", detail: "เคาน์เตอร์ชั้น 4 และเครื่องขายตั๋ว บวก ¥500 ต่อใบ รอบเวลาที่ซื้อได้จะแตกต่างกันในแต่ละวัน และอาจต้องต่อคิว" },
  { item: "Tembo Galleria (450 ม.)", detail: "445–450 ม. จุดสูงสุด 451.2 ม. (Sorakara Point) ขึ้นด้วย Tembo Shuttle จากชั้น 350 การขายเพิ่มในวันนั้นอาจหยุดชั่วคราวเมื่อคนเต็ม" },
  { item: "ช่วงที่คนน้อยกว่า", detail: "บ่ายวันธรรมดา ช่วงเปิดตอนเช้า และช่วงดึกก่อนปิด (ตามหน้าคาดการณ์ความหนาแน่นทางการ)" },
  { item: "สถานีใกล้ที่สุด", detail: "สถานี Tokyo Skytree (สาย Tobu Skytree) และสถานีโอชิอาเกะ (สายฮันโซมง ฯลฯ) จากอาซากุสะราว 5 นาที จากสถานีโตเกียวราว 20 นาที" },
];

const whoFor = [
  {
    title: "ชั้น 350 อย่างเดียวก็พอ ถ้า…",
    desc: `หากต้องการชมวิวเป็นหลัก ไม่จำเป็นต้องขึ้นชั้น 450 ชั้น 350 คือจุดชมวิวหลักที่มี 3 ชั้น และมองเห็นที่ราบคันโตทั้งผืนอยู่แล้ว ตั๋วผู้ใหญ่ ${ADULT} หากคำนวณราคาต่อความสูง 1 เมตร ถือว่าถูกที่สุดในบรรดาจุดชมวิวแบบเสียเงินหลัก ๆ ของโตเกียว`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "เพิ่มชั้น 450 ถ้า…",
    desc: "คุณต้องการขึ้นไปยังจุดที่สูงที่สุด ชั้น 450 คือ Tembo Galleria ทางเดินกระจกลาดเอียงที่วนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ บัตรคอมโบ (ชั้น 350 + 450) ราคาออนไลน์เริ่มต้น ¥3,000 ถ้าซื้อเพิ่มในวันเข้าชม จะต้องจ่ายเพิ่มจากตั๋ว 350 ม. อีก ¥1,400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "เลือกรอบค่ำ ถ้า…",
    desc: "คุณอยากชมวิวยามค่ำคืนมากกว่าวิวเส้นขอบฟ้าไกล ๆ ณ วันที่ตรวจสอบ จุดชมวิวเปิดถึง 22:00 และเข้าชมรอบสุดท้ายได้ถึง 21:00 เมื่อรอบกลางวันเต็มแล้ว รอบค่ำเป็นรอบที่ยังมีที่ว่างให้จอง",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "ก่อนจอง ให้เลือกว่าจะซื้อตั๋ว 350 ม. หรือตั๋วคอมโบ",
    desc: "ชั้น 450 ซื้อเป็นคอมโบออนไลน์ (ผู้ใหญ่เริ่มต้น ¥3,000) ถูกกว่าไปซื้อเพิ่มในวันนั้นบนตั๋วชั้น 350 (บวก ¥1,400) ถ้ามีโอกาสที่คุณจะอยากขึ้นทางเดินกระจก ให้ซื้อคอมโบตั้งแต่แรก",
  },
  {
    title: "จองตั๋วแบบระบุวันทางออนไลน์",
    desc: `เว็บไซต์ทางการขายตั๋วระบุวันตามราคา "เริ่มต้น" ข้างบน และราคาจริงในวันที่คุณไปอาจสูงกว่านั้น ซื้อในวันเข้าชมที่เคาน์เตอร์ชั้น 4 หรือเครื่องขายตั๋วจะบวกค่าธรรมเนียม ¥500 ต่อตั๋วหนึ่งใบ ซึ่งเป็นเหตุผลที่ชัดที่สุดของการจองล่วงหน้า วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    title: "ถ้าใช้บัตรชำระเงินที่ออกในต่างประเทศ ให้ซื้อผ่านตัวแทนจำหน่าย",
    desc: "Klook ขายตั๋วระบุเวลาเข้าชมแบบเดียวกัน พร้อมหน้าชำระเงินภาษาไทยและ e-ticket ช่วยหลีกเลี่ยงปัญหาการชำระเงินด้วยบัตรและอุปสรรคด้านภาษาที่นักท่องเที่ยวหลายคนพบเมื่อใช้เว็บไซต์ของสถานที่ท่องเที่ยวในญี่ปุ่น และหน้าสินค้าเดียวกันก็มีคอมโบชั้น 450 ด้วย",
  },
  {
    title: "เช็กเวลาเปิดของวันที่คุณไป ไม่ใช่เวลาเปิดทั่วไป",
    desc: `Skytree ประกาศเวลาเปิดเป็นรายวัน และระบุชัดว่า "เวลาเปิดอาจเปลี่ยนแปลงโดยไม่แจ้งล่วงหน้า" โดยรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด ในวันที่ตรวจสอบ จุดชมวิวเปิด 10:00–22:00 และรับเข้าครั้งสุดท้าย 21:00`,
  },
];

// The five questions in FAQPage (task-jtk-20261119-R02), as on the English page. The older
// answers stay on the page under "คำถามเพิ่มเติม" but are not in the structured data.
const faqItems: FaqItem[] = [
  {
    q: "ตั๋วโตเกียวสกายทรีราคาเท่าไร?",
    a: `ตั๋ว Tokyo Skytree สำหรับ Tembo Deck (350 ม.) ผู้ใหญ่ (15 ปีขึ้นไป) เริ่มต้น ¥1,800 และเด็กอายุ 6–14 ปี เริ่มต้น ¥900 ส่วนคอมโบที่รวม Tembo Galleria (450 ม.) เริ่มต้น ¥3,000 / ¥1,500 เมื่อจองออนไลน์แบบระบุวันและเวลา ซื้อในวันเข้าชมที่หอจะบวก ¥500 ต่อใบ เด็กอายุไม่เกิน 5 ปีเข้าฟรี ทั้งหมดเป็นราคา "เริ่มต้น" เว็บไซต์ทางการไม่ได้แยกตารางราคาวันธรรมดากับวันหยุด ราคาของวันที่คุณไปจะแสดงตอนชำระเงิน ตรวจสอบจากเว็บไซต์ทางการเมื่อ ${CHECKED}`,
  },
  {
    q: "Tembo Galleria 450 ม. คุ้มไหม?",
    a: `คุ้มถ้าความสูงคือเหตุผลที่คุณขึ้นไป ชั้นนี้เพิ่มทางเดินกระจกลาดเอียงที่ 445–450 ม. จุดสูงสุด 451.2 ม. โดยแพงกว่า Tembo Deck อย่างเดียว ¥1,200 ในคอมโบออนไลน์ (ผู้ใหญ่เริ่มต้น ¥3,000 เทียบกับเริ่มต้น ¥1,800) ถ้าต้องการชมวิวเป็นหลัก จุดชมวิวที่ความสูง 350 ม. ก็เพียงพอแล้ว ถ้ายังลังเล ให้ซื้อคอมโบ เพราะเพิ่ม 450 ม. ในวันเข้าชมราคา ¥1,400 และเว็บไซต์ทางการแจ้งว่าการขายนั้นอาจหยุดชั่วคราวเมื่อคนเต็ม วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "ควรจองตั๋วโตเกียวสกายทรีล่วงหน้าไหม?",
    a: `ควร ซื้อในวันเข้าชมที่เคาน์เตอร์ชั้น 4 หรือเครื่องขายตั๋วจะบวกค่าธรรมเนียม ¥500 ต่อใบ ครอบครัวสี่คนคือ ¥2,000 และเว็บไซต์ทางการระบุว่ารอบเวลาที่ซื้อได้ในวันนั้นขึ้นอยู่กับแต่ละวัน ตั๋วระบุวันและเวลาที่จองออนไลน์ไม่ต้องเสียค่าธรรมเนียมและไม่ต้องต่อคิวที่เคาน์เตอร์ ข้อควรรู้เรื่องการเปลี่ยน: ตั๋วทางการเปลี่ยนไม่ได้ ทำได้เพียงยกเลิก ยกเลิกฟรีถึง 31 วันก่อนเข้าชม และเสีย 20% ตั้งแต่ 30 วันก่อน วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "ไปโตเกียวสกายทรีกี่โมงดีที่สุด?",
    a: `ถ้าอยากได้จุดชมวิวที่คนน้อย ไปบ่ายวันธรรมดาหรือรอบแรกของช่วงเช้า ถ้าอยากชมวิวกลางคืน ไปหนึ่งถึงสองชั่วโมงก่อนปิด ซึ่งเป็นสามช่วงที่หน้าคาดการณ์ความหนาแน่นทางการแนะนำ วันที่ ${CHECKED} จุดชมวิวเปิด 10:00–22:00 รับเข้าครั้งสุดท้าย 21:00 และพระอาทิตย์ตก 16:31 รอบ 16:00 จึงทันช่วงแสงเปลี่ยน เวลาเปิดกำหนดเป็นรายวัน ควรเช็กปฏิทินของวันที่คุณไป`,
  },
  {
    q: "โตเกียวสกายทรีหรือ Shibuya Sky?",
    a: `เลือก Skytree ถ้าต้องการความสูงและระยะการมองเห็น จุดชมวิว 350 ม. และ 450 ม. อยู่ในอาคารหลังกระจก ผู้ใหญ่เริ่มต้น ¥1,800 เลือก SHIBUYA SKY ถ้าต้องการดาดฟ้ากลางแจ้งสูง 229 ม. เหนือแยกชิบูยะตอนพระอาทิตย์ตก ราคาออนไลน์ ${PRICES.shibuyaSky.adult} ตามเวลาเข้า หากต้องเลือกเพียงแห่งเดียวสำหรับการเที่ยวครั้งแรกในวันที่อากาศแจ่มใส Skytree ให้วิวพาโนรามาที่กว้างกว่า ส่วนภาพวิวที่ผู้คนจดจำได้คือ Shibuya Sky ราคา Skytree ตรวจสอบ ${CHECKED} ราคา Shibuya Sky ตรวจสอบ ${SHIBUYA_SKY_CHECKED}`,
  },
];

const moreQuestions: FaqItem[] = [
  {
    q: "ชั้น 350 กับชั้น 450 ต่างกันอย่างไร?",
    a: "Tembo Deck อยู่ที่ความสูง 350 ม. เป็นจุดชมวิวหลักที่มี 3 ชั้น และเป็นชั้นที่ตั๋วทุกใบรวมไว้ ชั้น 450 คือ Tembo Galleria ทางเดินผนังกระจกลาดเอียงที่วนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ ชั้น 450 ซื้อตั๋วขึ้นเฉพาะส่วนนี้ไม่ได้ ต้องมีตั๋วชั้น 350 ก่อน ไม่ว่าจะซื้อเป็นคอมโบออนไลน์ หรือเพิ่มที่เครื่องขายตั๋วหน้างานในราคา ¥1,400 (ผู้ใหญ่)",
  },
  {
    q: "ซื้อตั๋วชั้น 450 ออนไลน์ได้ไหม?",
    a: `ซื้อเป็นตั๋วเดี่ยวไม่ได้ เว็บไซต์ทางการขายชั้น 450 เฉพาะในตั๋วคอมโบ ถ้าคุณมาพร้อมตั๋วชั้น 350 แล้วเปลี่ยนใจ ให้เพิ่มชั้น 450 ที่เครื่องขายตั๋วหน้างานในราคา ¥1,400 (ผู้ใหญ่) หรือ ¥700 (เด็ก 6–14 ปี) การซื้อคอมโบออนไลน์ถูกกว่า คือผู้ใหญ่เริ่มต้น ¥3,000 เทียบกับ ¥1,800 บวก ¥1,400 เมื่อแยกซื้อสองครั้ง วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "Tokyo Skytree เปิดกี่โมง?",
    a: `เวลาเปิดของ Skytree กำหนดเป็นรายวัน ไม่ได้ตายตัวตลอดปี และเว็บไซต์ทางการระบุว่า "เวลาเปิดอาจเปลี่ยนแปลงโดยไม่แจ้งล่วงหน้า" และรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด ในวันที่ตรวจสอบ จุดชมวิวเปิด 10:00–22:00 และรับเข้าครั้งสุดท้าย 21:00 ควรเช็กปฏิทินของวันที่คุณไปก่อนวางแผนช่วงเย็นไว้ที่นี่ วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "มองเห็นภูเขาไฟฟูจิจาก Tokyo Skytree ไหม?",
    a: "ในวันที่ท้องฟ้าแจ่มใสสามารถมองเห็นได้ และด้วยความสูงของ Skytree จึงมีโอกาสมองเห็นได้มากที่สุดในบรรดาจุดชมวิวในเมือง ทัศนวิสัยขึ้นอยู่กับสภาพอากาศทั้งหมด และมักดีกว่าในเดือนที่อากาศเย็นและแห้ง รวมถึงช่วงเช้า แต่ไม่มีอะไรรับประกันได้ในวันที่คุณไป ซึ่งควรจำไว้ก่อนซื้อตั๋วคอมโบเพื่อวิวฟูจิโดยเฉพาะ",
  },
  {
    q: "ไป Tokyo Skytree อย่างไร?",
    a: "หอตั้งอยู่ติดกับสถานี Tokyo Skytree ของสาย Tobu Skytree และสถานีโอชิอาเกะ ซึ่งมีรถไฟใต้ดินโตเกียวเมโทรสายฮันโซมง สายโทเออาซากุสะ และสายเคเซโอชิอาเกะ โอชิอาเกะอยู่ในขอบเขตของ Tokyo Subway Ticket ถ้าคุณถือบัตรนั้นอยู่แล้ว การเดินทางมาที่นี่จึงไม่มีค่าใช้จ่ายเพิ่ม อาซากุสะอยู่ห่างไปสองสถานีบนสายอาซากุสะ จัดสองที่นี้ไว้ในบ่ายเดียวกันได้ง่าย",
  },
  {
    q: "เปลี่ยนวันหรือเวลาของตั๋ว Tokyo Skytree ได้ไหม?",
    a: `ไม่ได้ เว็บไซต์ทางการระบุว่าตั๋วที่ซื้อแล้วเปลี่ยนไม่ได้ ถ้าจะเปลี่ยนวัน เวลา หรือประเภทตั๋ว ต้องยกเลิกแล้วซื้อใหม่ ตั๋วจากร้านออนไลน์ทางการยกเลิกฟรีถึง 31 วันก่อนเข้าชม เสีย 20% ตั้งแต่ 30 วันก่อนจนถึงเวลาเข้า และยกเลิกไม่ได้หลังเวลาเข้า ยกเลิกภายใน 59 นาทีหลังซื้อไม่มีค่าธรรมเนียม ตั๋วที่ซื้อผ่านบริษัททัวร์หรือตัวแทนจำหน่ายเป็นไปตามเงื่อนไขของผู้ขายนั้น วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "ตั๋วเด็กของ Tokyo Skytree ใช้กับเด็กอายุเท่าไร?",
    a: `ราคาเด็กใช้กับอายุ 6–14 ปี (นักเรียนมัธยมต้นลงมา) ผู้ที่อายุ 15 ปีขึ้นไป รวมถึงนักเรียนมัธยมปลาย ใช้ราคาผู้ใหญ่ เด็กอายุไม่เกิน 5 ปีเข้าฟรี วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "Tembo Galleria (450 ม.) ขายหมดในวันนั้นได้ไหม?",
    a: `อาจหยุดขายชั่วคราวได้ ตั๋วเพิ่ม Tembo Galleria ขายที่เครื่องขายตั๋วภายใน Tembo Deck ในวันเข้าชม และเว็บไซต์ทางการแจ้งว่าอาจต้องหยุดขายเพราะจำกัดจำนวนคน ตั๋วคอมโบที่ซื้อออนไลน์รวมสิทธิ์ขึ้น 450 ม. ไว้ในรอบเวลาที่จองแล้ว วันที่ตรวจสอบ ${CHECKED}`,
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว Tokyo Skytree" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, "th");

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: ROUTE,
              headline: TITLE,
              description: DESC,
              updated,
              inLanguage: JSONLD_LANG.th,
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            ตั๋ว Tokyo Skytree ราคา 2026 <br />350/450
          </h1>
          <p className={styles.heroSubtitle}>
            ตั๋วเข้าชม Tembo Deck (350 ม.) ของ Tokyo Skytree สำหรับผู้ใหญ่ เริ่มต้นที่ ¥1,800 และคอมโบรวม Tembo Galleria (450 ม.)
            เริ่มต้น ¥3,000 (เว็บไซต์ทางการ ตรวจสอบ {CHECKED} ราคากำหนดเป็นรายวัน ราคาจริงในวันที่คุณไปอาจสูงกว่า)
            ตั๋วออนไลน์แบบระบุวันและเวลาไม่ต้องเสียค่าธรรมเนียม ¥500 ต่อใบ ซึ่งจะเรียกเก็บเฉพาะเมื่อซื้อที่เคาน์เตอร์หรือเครื่องขายตั๋วหน้างาน
            และรอบเวลาที่ซื้อหน้างานได้จะแตกต่างกันในแต่ละวัน จึงควรจองรอบที่ต้องการไว้ก่อน โดยเฉพาะรอบเย็น
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาจากเว็บไซต์ทางการ", "350 ม. vs 450 ม."].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* R02: the answer in the first body paragraph, ahead of the boxes */}
        <p className={styles.bodyText}>
          ตั๋วโตเกียวสกายทรีสำหรับ Tembo Deck (350 ม.) ผู้ใหญ่เริ่มต้น ¥1,800 และคอมโบ Tembo Deck + Tembo Galleria
          (450 ม.) เริ่มต้น ¥3,000 เมื่อจองออนไลน์แบบระบุวันและเวลาบนเว็บไซต์ทางการ (ตรวจสอบ {CHECKED}) เด็กอายุ 6–14 ปี
          เริ่มต้น ¥900 หรือเริ่มต้น ¥1,500 ซื้อในวันเข้าชมที่หอจะเป็นราคาของวันนั้นบวก ¥500 ต่อใบ และเว็บไซต์ทางการไม่ได้แยกตาราง
          ราคาวันธรรมดากับวันหยุด ราคาของวันที่คุณไปจะแสดงตอนชำระเงิน ถ้าคิดว่าอาจอยากขึ้นไปชมทางเดินกระจกที่ความสูง 450 ม. ให้ซื้อบัตรคอมโบออนไลน์
          เพราะเพิ่มในวันเข้าชมต้องจ่ายอีก ¥1,400 และการขายนั้นอาจหยุดชั่วคราวเมื่อคนเต็ม
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ชั้น 350 (ผู้ใหญ่)</p>
                <p className={styles.verdictStatValue}>เริ่มต้น ¥1,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>คอมโบ 350＋450</p>
                <p className={styles.verdictStatValue}>เริ่มต้น ¥3,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ซื้อหน้างานในวันเข้าชม</p>
                <p className={styles.verdictStatValue}>มีค่าธรรมเนียมเพิ่ม ¥500 ต่อใบ</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>อายุไม่เกิน 5 ปี</p>
                <p className={styles.verdictStatValue}>ฟรี</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> จองตั๋วแบบระบุวันทางออนไลน์ เพราะ Tokyo Skytree เก็บค่าธรรมเนียม ¥500 ต่อใบ
              เมื่อซื้อที่เคาน์เตอร์ในวันเข้าชม การจองล่วงหน้าจึงถูกกว่าแน่นอนตามจำนวนเงินที่ประกาศไว้
              ถ้ามีโอกาสที่คุณจะอยากขึ้นทางเดินกระจกชั้น 450 ให้ซื้อคอมโบตั้งแต่แรก เพราะไปเพิ่มที่หน้างาน
              ภายหลังจะแพงขึ้น ¥1,400 ราคาจากเว็บไซต์ทางการ วันที่ตรวจสอบ {CHECKED}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                เช็กตั๋ว Tokyo Skytree บน Klook →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>

        {/* P01: the 6.5% / 5% bookings of the same day, directly under the 2% ticket CTA. */}
        <KlookSameDayCards heading="ไป Skytree แล้วควรจองกิจกรรมอะไรเพิ่มในวันเดียวกัน?" cards={sameDayCards} />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ตั๋ว Tokyo Skytree รวมอะไรบ้าง?</h2>
          <p className={styles.bodyText}>
            หน้านี้อธิบายประเภทตั๋ว ราคา และวิธีจองตั๋ว Tokyo Skytree ถ้ายังเลือกไม่ได้ว่าจะไปจุดชมวิวแห่งไหน{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">บทความเปรียบเทียบจุดชมวิวในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            เปรียบเทียบ Skytree กับ Shibuya Sky, Tokyo Tower และจุดชมวิวฟรีที่ศาลาว่าการ Tokyo Skytree มีจุดชมวิวสองระดับความสูง โดยมีตั๋วให้เลือกตามระดับความสูง <strong>ระดับ 350 ม.</strong> คือ Tembo Deck
            จุดชมวิวที่มี 3 ชั้น และเป็นชั้นที่ตั๋วทุกใบรวมไว้ <strong>ระดับ 450 ม.</strong> คือ Tembo Galleria
            ทางเดินผนังกระจกลาดเอียงที่วนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ และซื้อตั๋วขึ้นเฉพาะส่วนนี้ไม่ได้
          </p>
          <p className={styles.bodyText}>
            ความสับสนส่วนใหญ่เกิดจากการที่จุดชมวิวแบ่งเป็นสองระดับ และราคายังแตกต่างกันตามวิธีซื้อ ไม่ว่าจะซื้อเป็นคอมโบออนไลน์หรือซื้อแยกในวันเข้าชม ส่วนถัดไปเปรียบเทียบสองวิธีซื้อนี้
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋ว Tokyo Skytree ปี 2026 ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้ใหญ่เริ่มต้น ¥1,800 สำหรับ Tembo Deck (350 ม.) และเริ่มต้น ¥3,000 สำหรับคอมโบที่รวม Tembo Galleria
            (450 ม.) เด็กอายุ 6–14 ปีเริ่มต้น ¥900 และ ¥1,500 ตามลำดับ ซื้อที่เคาน์เตอร์หรือเครื่องขายตั๋วหน้างานต้องจ่ายเพิ่ม ¥500 ต่อใบ
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ตั๋ว", "ออนไลน์ วันธรรมดา", "ออนไลน์ วันหยุด / วันนักขัตฤกษ์", "ซื้อในวันเข้าชมที่หอ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row, i) => (
                    <tr key={row.ticket} style={i === 0 ? { fontWeight: 700 } : undefined}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.weekday}</td>
                      <td className={styles.tdPrice}>{row.weekend}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: {P.checked} — <a href={SKYTREE_TICKET_URL} target="_blank" rel="noopener">{SKYTREE_TICKET_URL}</a>{" "}
            หน้าทางการระบุราคา &ldquo;เริ่มต้น&rdquo; และไม่ได้แยกตารางราคาวันธรรมดากับวันหยุด ทั้งสองคอลัมน์จึงแสดงตัวเลข
            เริ่มต้นเดียวกัน ราคาที่ใช้จริงคือราคาที่แสดงสำหรับวันที่คุณเลือกตอนชำระเงิน ค่าธรรมเนียม ¥500 สำหรับการซื้อหน้างาน
            คิดต่อตั๋วหนึ่งใบ ทั้งที่เคาน์เตอร์ชั้น 4 และเครื่องขายตั๋ว ส่วนตั๋วเพิ่ม Tembo Galleria ไม่มีค่าธรรมเนียม
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>ตั๋วแบบไหน</span>
          <h2 className={styles.sectionTitle}>Tembo Galleria 450 ม. คุ้มกว่าจุดชมวิว 350 ม. ไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            คุ้มค่าเฉพาะเมื่อคุณต้องการขึ้นไปยังจุดที่สูงที่สุด คอมโบแพงกว่า Tembo Deck อย่างเดียว ¥1,200 สำหรับผู้ใหญ่ (เริ่มต้น
            ¥3,000 เทียบกับเริ่มต้น ¥1,800) และพาคุณจาก 350 ม. ขึ้นไปทางเดินกระจกที่ 445–450 ม. จุดสูงสุด 451.2 ม.
            ถ้ายังลังเล ให้ซื้อคอมโบออนไลน์ เพราะเพิ่ม 450 ม. ในวันนั้นราคา ¥1,400 และเว็บไซต์ทางการแจ้งว่าอาจหยุดขายเมื่อคนเต็ม
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Tembo Deck (350 ม.)", "Tembo Galleria (450 ม.)"].map((h) => (
                      <th key={h || "item"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {floorRows.map((row, i) => (
                    <tr key={row.item} style={i === 0 ? { fontWeight: 700 } : undefined}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.galleria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginBottom: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: {P.checked} — <a href={SKYTREE_TICKET_URL} target="_blank" rel="noopener">{SKYTREE_TICKET_URL}</a>{" "}
            (ราคา ตั๋วเพิ่ม และหมายเหตุเรื่องจำนวนคน) ความสูงของชั้นจากหน้าผังชั้น Tembo Galleria ทางการ ข้อมูลวันที่ 10 พ.ย. 2026
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>เลือกตั๋วได้แล้ว?</strong> หน้าสินค้า TOKYO SKYTREE บน Klook มีทั้งตั๋วระบุเวลาเข้าชมและตั๋วคอมโบ 350 ม. ＋450 ม. ให้เลือกในหน้าเดียวกัน ชำระเงินเป็นภาษาไทยและได้ e-ticket ดูราคาและรอบเวลาของวันที่คุณไปได้ในหน้าสินค้า
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว TOKYO SKYTREE บน Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="รอบ ๆ หอ"
          heading="กิจกรรมที่ควรจองไว้สำหรับวันที่เที่ยวย่านโอชิอาเกะ"
          intro="การขึ้นจุดชมวิวใช้เวลาหนึ่งถึงสองชั่วโมง และมีเพียงตั๋วที่กล่าวถึงข้างต้นเท่านั้นที่ต้องระบุเวลาเข้าชม รายการด้านล่างคือสิ่งที่ควรจองสำหรับช่วงบ่ายที่เหลือของวันนั้น ทั้งหมดอยู่ริมแม่น้ำสุมิดะฝั่งเดียวกับ Tokyo Skytree และจองได้ในบัญชีเดียวกับตั๋ว"
          items={aroundTowerItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>วันเข้าชม</span>
          <h2 className={styles.sectionTitle}>ซื้อตั๋ว Tokyo Skytree หน้างานได้ไหม?</h2>
          <p className={styles.bodyText}>
            ได้ ที่เคาน์เตอร์ชั้น 4 และเครื่องขายตั๋ว แต่แพงกว่าออนไลน์ใบละ ¥500 เว็บไซต์ทางการระบุว่ารอบเวลาที่เปิดขายหน้างาน
            จะแตกต่างกันในแต่ละวัน และอาจต้องต่อคิวซื้อ ตั๋วเพิ่ม Tembo Galleria ขายที่เครื่องภายใน Tembo Deck โดยไม่มีค่าธรรมเนียม
            แต่อาจหยุดขายเมื่อคนเต็ม
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ช่วงเวลา</span>
          <h2 className={styles.sectionTitle}>ควรไป Tokyo Skytree ช่วงเวลาไหนดีที่สุด?</h2>
          <p className={styles.bodyText}>
            ถ้าอยากชมวิวในช่วงที่คนไม่พลุกพล่าน ไปบ่ายวันธรรมดาหรือช่วงเปิดตอนเช้า ถ้าอยากชมวิวยามค่ำคืน ให้ไปก่อนเวลาปิดหนึ่งถึงสองชั่วโมง
            ทั้งสามช่วงเป็นช่วงที่หน้าคาดการณ์ความหนาแน่นบนเว็บไซต์ทางการแนะนำ และระบุว่าช่วงปีใหม่ โกลเดนวีก และปิดเทอมฤดูใบไม้ผลิ
            จะคนมากกว่า เวลาพระอาทิตย์ตกเปลี่ยนไปตลอดปี หน้าเวลาเปิดรายวันทางการระบุ 16:31 ในวันที่ {CHECKED}
            จึงควรเลือกรอบเย็นให้ตรงกับเวลาพระอาทิตย์ตกของวันที่ไป
            ถ้าอยู่โตเกียวเพียงไม่กี่วัน{" "}
            <Link href="/guides/attractions/tokyo-2-day-itinerary">แผนเที่ยวโตเกียว 2 วัน (ภาษาอังกฤษ)</Link>{" "}
            ของเราจัดให้เที่ยว Skytree และอาซากุสะในวันเดียวกัน
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  เว็บไซต์ทางการ TOKYO SKYTREE (หน้าเวลาเปิด การยกเลิก คาดการณ์ความหนาแน่น การเดินทาง และผังชั้น) วันที่ตรวจสอบ {CHECKED}
                </caption>
                <thead>
                  <tr>
                    {["หัวข้อ", "ข้อมูลทางการ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visitRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกัน</span>
          <h2 className={styles.sectionTitle}>Tokyo Skytree, Shibuya Sky หรือ Tokyo Tower: ควรซื้อตั๋วไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Skytree คือตัวเลือกเรื่องความสูง จุดชมวิว 350 ม. เริ่มต้น ¥1,800 ถ้าสิ่งที่คุณอยากได้จริง ๆ คือพระอาทิตย์ตกแบบกลางแจ้ง
            เหนือแยกชิบูยะ{" "}
            <Link href="/th/guides/attractions/shibuya-sky-tickets">ตั๋ว Shibuya Sky</Link>{" "}
            คุ้มกว่า ถ้าอยากได้จุดชมวิวแบบเสียเงินที่ถูกที่สุดและเข้าได้ดึกที่สุด{" "}
            <Link href="/guides/attractions/tokyo-tower-tickets">ตั๋ว Tokyo Tower (ภาษาอังกฤษ)</Link>{" "}
            เริ่มที่ ¥1,500 ถ้าอยากชม Skytree จากบนน้ำ{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise">ล่องเรืออ่าวโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            จากอาซากุสะไปท่าเรือฮิโนเดะราคา ¥1,000 ด้วยเรือ Tokyo Cruise
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["จุดชมวิว", "ราคาผู้ใหญ่", "เวลาเปิด", "พระอาทิตย์ตกและกลางคืน"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {towerRows.map((row, i) =>
                    i === 0 ? (
                      <tr key={row.deck} style={{ fontWeight: 700 }}>
                        <td className={styles.tdProvider}>{row.deck}</td>
                        <td colSpan={3} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      </tr>
                    ) : (
                      <tr key={row.deck}>
                        <td className={styles.tdProvider}>{row.deck}</td>
                        <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.sunset}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: Skytree {P.checked} — <a href={SKYTREE_HOURS_URL} target="_blank" rel="noopener">{SKYTREE_HOURS_URL}</a>;
            Tokyo Tower 2026-11-19 — <a href={TOKYO_TOWER_FEE_URL} target="_blank" rel="noopener">{TOKYO_TOWER_FEE_URL}</a>;
            ราคา SHIBUYA SKY {PRICES.shibuyaSky.checked} —{" "}
            <a href={PRICES.shibuyaSky.sourceUrl} target="_blank" rel="noopener">{PRICES.shibuyaSky.sourceUrl}</a>{" "}
            (เวลาเปิดจาก gotokyo.org วันที่ 14 พ.ย. 2026)
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            ยังเลือกจุดชมวิวไม่ได้?{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">เปรียบเทียบจุดชมวิวในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            วางทุกแห่งเทียบกัน รวมจุดชมวิวฟรีด้วย หน้านี้เน้นเรื่องการซื้อตั๋ว Skytree
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>จองตั๋ว Tokyo Skytree อย่างไร?</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            การเดินทางมาที่นี่ไม่ยาก หอตั้งอยู่ติดกับสถานี Tokyo Skytree และสถานีโอชิอาเกะ และโอชิอาเกะเป็นสถานีรถไฟใต้ดิน
            จึงใช้{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket (ภาษาอังกฤษ)</Link>{" "}
            ได้ถ้าคุณมีอยู่แล้ว ส่วน{" "}
            <Link href="/guides/transport/tokyo-transportation">คู่มือการเดินทางในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            อธิบายว่าเครือข่าย Metro และ Toei เชื่อมกันอย่างไร
          </p>
        </section>

        <p className={styles.bodyText}>
          ถ้ามาช่วงธันวาคมถึงกุมภาพันธ์ ดู<Link href="/th/guides/attractions/japan-winter-itinerary">แผนเที่ยวญี่ปุ่นหน้าหนาว 12 วัน</Link> ที่รวมโตเกียว คานาซาวะ ชิราคาวาโกะ และเทศกาลหิมะซัปโปโร 4–11 ก.พ. 2027
        </p>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        {/* Older answers: on the page, not in the FAQPage structured data. */}
        <section className={styles.faqSection} style={{ paddingTop: 0 }}>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>คำถามเพิ่มเติม</h3>
          <div className={styles.faqList}>
            {moreQuestions.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faqItems.length + i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="จองไปพร้อมกับกิจกรรมอื่นของวัน"
          intro="การชมวิวที่ Skytree ใช้เวลาหนึ่งถึงสองชั่วโมง และสามารถจองกิจกรรมเหล่านี้ผ่านบัญชี Klook เดียวกับที่ใช้จองตั๋วได้ จึงจองกิจกรรมที่เหลือของวันไปพร้อมกันได้"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-bay-cruise", title: "ล่องเรืออ่าวโตเกียว (2026): Yakatabune vs Symphony เวลาและราคา (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/asakusa-kimono-rental", title: "เช่ากิโมโนที่อาซากุสะ (2026): เวลาคืนชุด ทำผม และจุดถ่ายรูป (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "แผนเที่ยวโตเกียว 3 วัน (2026): จองอะไร และจองตามลำดับไหน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "ตั๋ว Tokyo Tower (2026): ราคา Main Deck vs Top Deck และวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 หรือ 72 ชั่วโมง คุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "ตั๋ว Warner Bros. Studio Tour Tokyo (2026): ราคาและวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว (2026): เลือกทัวร์ไหน และได้เห็นอะไรจริง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/teamlab-planets-tickets", title: "ตั๋ว teamLab Planets 2026 ราคา เวลา" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำในญี่ปุ่นเพิ่มเติม (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองออนไลน์ล่วงหน้า เพื่อไม่ต้องเสียค่าธรรมเนียมเพิ่มที่เคาน์เตอร์</h2>
            <p className={styles.ctaBannerDesc}>
              ตั๋วที่ซื้อในวันเข้าชมมีค่าธรรมเนียม ¥500 ต่อคน ตั๋วแบบระบุวันที่จองออนไลน์ไม่ต้องเสียค่าธรรมเนียมและไม่ต้องต่อคิว
              และ Klook ให้ชำระเงินผ่านหน้าภาษาไทยด้วยบัตรต่างประเทศได้
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋ว Tokyo Skytree บน Klook →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
