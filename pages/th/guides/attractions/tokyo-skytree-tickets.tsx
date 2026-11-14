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

const ROUTE = "/th/guides/attractions/tokyo-skytree-tickets";
const TITLE = "ราคาตั๋ว Tokyo Skytree: 350 vs 450";
const DESC =
  "ราคาตั๋ว Tokyo Skytree 2026: 350 ม. เริ่ม ¥1,800 คอมโบ 450 ม. ¥3,000 ซื้อหน้างาน +¥500";

const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, "th");
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");

const TICKET_URL = klookFor(skytreeTicket.url, "th");
const GYG_SLUG = "th-tokyo-skytree-tickets";

const tripPrepItems = [
  withKlookLocale(skytreeTripPrep[0], "th", {
    label: "โรงแรมย่านอุเอโนะ / อาซากุสะ",
    ctaLabel: "ดูโรงแรมย่านอุเอโนะและอาซากุสะบน Klook →",
    why: "ฝั่งแม่น้ำเดียวกับหอ อุเอโนะอยู่บนสายยามาโนเตะ จากนั้นสายกินซ่าวิ่งไปถึงอาซากุสะ และโอชิอาเกะอยู่ถัดไปอีกสองสถานีบนสายอาซากุสะ ชมวิวรอบค่ำเสร็จแล้วจึงไม่ต้องนั่งรถไฟข้ามเมืองกลับโรงแรม",
  }),
  withKlookLocale(skytreeTripPrep[1], "th", {
    label: "เช่ากิโมโน Kimono Yae ที่อาซากุสะ",
    ctaLabel: "ดูร้านเช่ากิโมโนที่อาซากุสะ →",
    why: "กิจกรรมช่วงกลางวันในทริปเดียวกัน ห่างไปสองสถานี ร้านอยู่ข้างประตูคามินาริมง และหน้าสินค้าระบุให้คืนชุดภายใน 17:30 จึงจัดไว้ก่อนรอบ Skytree ตอนเย็นได้พอดีโดยไม่ชนกัน",
  }),
  withKlookLocale(skytreeTripPrep[2], "th", {
    label: "รถบัส Hop-on hop-off โตเกียว (Skyhop Bus)",
    ctaLabel: "ดูตั๋วรถบัสหลังคาเปิด →",
    why: "ตั๋วรถบัสหลังคาเปิดแบบขึ้นลงได้ไม่จำกัด ที่มีเส้นทางผ่านอาซากุสะ เหมาะซื้อถ้าวันนั้นมีทั้งวัดเซ็นโซจิและหอ แทนที่จะแวะจุดเดียวแล้วจ่ายค่ารถไฟใต้ดินทุกช่วง",
  }),
  withKlookLocale(skytreeTripPrep[3], "th", {
    label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    ctaLabel: "ดูตั๋วรถไฟใต้ดิน →",
    why: "โอชิอาเกะเป็นสถานีรถไฟใต้ดินของสายฮันโซมงและสายโทเออาซากุสะ ตั๋ว Metro และ Toei แบบ 24, 48 หรือ 72 ชั่วโมงจึงครอบคลุมการเดินทางไปหอแล้ว รวมถึงสองสถานีไปวัดเซ็นโซจิหลังจากนั้นด้วย",
  }),
];

// P01 (14 Nov 2026): the same-day cards under the main CTA, as on the English page — an Asakusa
// guided walk (6.5%), an Asakusa kimono rental (6.5%) and the Tokyo Subway Ticket (5%). The pass
// reuses the label below; the Around-the-tower block drops it so it is not listed twice.
const sameDayCards: KlookSameDayCard[] = [
  withKlookLocale(skytreeSameDayCards[0], "th", {"kind":"ทัวร์","label":"ทัวร์เดินเที่ยวอาซากุสะและวัดเซ็นโซจิครึ่งวัน","ctaLabel":"ดูทัวร์เดินอาซากุสะ →","why":"เดินชมคามินาริมง ถนนนากามิเสะ และวัดเซ็นโซจิกับไกด์ภาษาอังกฤษ ห่างจากหอสองสถานีบนสายอาซากุสะ"}),
  withKlookLocale(skytreeSameDayCards[1], "th", {"kind":"กิโมโน","label":"เช่ากิโมโนพร้อมทำผม (Aiwafuku อาซากุสะ สาขา 1)","ctaLabel":"ดูร้านเช่ากิโมโนอาซากุสะ →","why":"เช่า 6 ชั่วโมงรวมทำผม ร้านอยู่ที่อาซากุสะ ห่างจากหอสองสถานี"}),
  { ...withKlookLocale(skytreeSameDayCards[2], "th"), label: tripPrepItems[3].label, ctaLabel: tripPrepItems[3].ctaLabel, kind: "พาส", why: "โอชิอาเกะอยู่บนสายฮันโซมงและโทเออาซากุสะ ตั๋ว 24/48/72 ชั่วโมงจึงครอบคลุมทั้งหอและอาซากุสะ" },
];
const aroundTowerItems = tripPrepItems.filter((item) => !sameDayCards.some((card) => card.url === item.url));

const tourPicks = [
  withKlookLocale(skytreeAquariumCombo, "th", {
    title: "ตั๋วคอมโบ Tokyo Skytree + Sumida Aquarium",
    desc: "จุดชมวิวรวมกับพิพิธภัณฑ์สัตว์น้ำในคอมเพล็กซ์ Solamachi เดียวกันที่ฐานหอ",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "th", {
    title: "ทัวร์รถบัสเที่ยวโตเกียว 1 วัน",
    desc: "ทัวร์พร้อมไกด์วนรอบสวนพระราชวังอิมพีเรียล อาซากุสะ และ Tokyo Skytree พร้อมออดิโอไกด์หลายภาษา",
  }),
  withKlookLocale(fujiHakoneDayTour, "th", {
    title: "ทัวร์ 1 วัน ภูเขาไฟฟูจิ＋ฮาโกเน่",
    desc: "สถานีที่ 5 ของภูเขาไฟฟูจิ คู่กับเขตภูเขาไฟฮาโกเน่และทะเลสาบอาชิ เป็นทริปไปกลับหนึ่งวันจากโตเกียว",
  }),
];

const priceRows = [
  { ticket: "ชั้น 350 — ผู้ใหญ่ (15 ปีขึ้นไป)", advance: ADULT, sameDay: "บวกค่าธรรมเนียม ¥500" },
  { ticket: "ชั้น 350 — เด็ก (6–14 ปี)", advance: CHILD, sameDay: "บวกค่าธรรมเนียม ¥500" },
  { ticket: "คอมโบ ชั้น 350＋450 — ผู้ใหญ่", advance: "เริ่มต้น ¥3,000", sameDay: "บวกค่าธรรมเนียม ¥500" },
  { ticket: "คอมโบ ชั้น 350＋450 — เด็ก", advance: "เริ่มต้น ¥1,500", sameDay: "บวกค่าธรรมเนียม ¥500" },
  { ticket: "เพิ่มชั้น 450 ที่หน้างาน — ผู้ใหญ่", advance: "ไม่ขายแยก", sameDay: "¥1,400 (ไม่มีค่าธรรมเนียม)" },
  { ticket: "เพิ่มชั้น 450 ที่หน้างาน — เด็ก", advance: "ไม่ขายแยก", sameDay: "¥700 (ไม่มีค่าธรรมเนียม)" },
  { ticket: "อายุไม่เกิน 5 ปี", advance: "ฟรี", sameDay: "ฟรี" },
];

// Same rows as the English guide's visitRows, read off en.tokyo-skytree.jp on 10 Nov 2026.
const visitRows = [
  { item: "เวลาเปิด (10 พ.ย. 2026)", detail: "10:00–22:00 รับเข้าครั้งสุดท้าย 21:00 เวลาเปิดกำหนดเป็นรายวันและอาจเปลี่ยนโดยไม่แจ้งล่วงหน้า รับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิดเสมอ" },
  { item: "เปลี่ยนวันหรือเวลา", detail: "ทำไม่ได้ ต้องยกเลิกแล้วซื้อใหม่ การเปลี่ยนระหว่างคอมโบกับตั๋ว Tembo Deck ก็เช่นกัน" },
  { item: "ค่ายกเลิก (ตั๋วออนไลน์ทางการ)", detail: "0% ถึง 31 วันก่อนเข้าชม 20% ตั้งแต่ 30 วันก่อนจนถึงเวลาเข้า 100% หลังเวลาเข้า ยกเลิกภายใน 59 นาทีหลังซื้อไม่มีค่าธรรมเนียม" },
  { item: "ซื้อในวันเข้าชม", detail: "เคาน์เตอร์ชั้น 4 และเครื่องขายตั๋ว บวก ¥500 ต่อใบ รอบเวลาที่ซื้อได้ขึ้นกับแต่ละวัน และอาจต้องต่อคิว" },
  { item: "Tembo Galleria (450 ม.)", detail: "445–450 ม. จุดสูงสุด 451.2 ม. (Sorakara Point) ขึ้นด้วย Tembo Shuttle จากชั้น 350 การขายเพิ่มในวันนั้นอาจหยุดชั่วคราวเมื่อคนเต็ม" },
  { item: "ช่วงที่คนน้อยกว่า", detail: "บ่ายวันธรรมดา ช่วงเปิดตอนเช้า และช่วงดึกก่อนปิด (ตามหน้าคาดการณ์ความหนาแน่นทางการ)" },
  { item: "สถานีใกล้ที่สุด", detail: "สถานี Tokyo Skytree (สาย Tobu Skytree) และสถานีโอชิอาเกะ (สายฮันโซมง ฯลฯ) จากอาซากุสะราว 5 นาที จากสถานีโตเกียวราว 20 นาที" },
];

const whoFor = [
  {
    title: "ชั้น 350 อย่างเดียวก็พอ ถ้า…",
    desc: `หากต้องการชมวิวเป็นหลัก ไม่จำเป็นต้องขึ้นชั้น 450 ชั้น 350 คือจุดชมวิวหลักที่มี 3 ชั้น และมองเห็นที่ราบคันโตทั้งผืนอยู่แล้ว ผู้ใหญ่ ${ADULT} เมื่อคิดเป็นราคาต่อความสูง 1 เมตร ถือว่าถูกที่สุดในบรรดาจุดชมวิวแบบเสียเงินหลัก ๆ ของโตเกียว`,
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
    desc: "คุณต้องการขึ้นไปให้สูงที่สุด ชั้น 450 คือ Tembo Galleria ทางเดินกระจกลาดเอียงที่วนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ บัตรคอมโบ (ชั้น 350 + 450) ราคาออนไลน์เริ่มต้น ¥3,000 ถ้าไปเพิ่มในวันนั้นจะบวกอีก ¥1,400 จากตั๋วชั้น 350",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "เลือกรอบค่ำ ถ้า…",
    desc: "คุณอยากชมวิวยามค่ำคืนมากกว่าวิวเส้นขอบฟ้าไกล ๆ ในวันที่ตรวจสอบ จุดชมวิวเปิดถึง 22:00 และรับเข้าครั้งสุดท้าย 21:00 รอบค่ำคือรอบที่ยังมีที่ว่างเมื่อรอบกลางวันเต็มไปแล้ว",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const deckRows = [
  {
    deck: "Tokyo Skytree",
    height: "ชั้น 350 และชั้น 450",
    price: "เริ่มต้น ¥1,800 (ชั้น 350)・คอมโบ เริ่มต้น ¥3,000",
    highlight: "จุดชมวิวที่สูงที่สุดในโตเกียว และเป็นที่เดียวที่มีทางเดินกระจก",
    area: "โอชิอาเกะ／สถานี Tokyo Skytree",
  },
  {
    deck: "Shibuya Sky",
    height: "ดาดฟ้าสูงราว 229 เมตร",
    price: "ออนไลน์ ¥2,700 (ก่อน 15:00) / ¥3,400 (หลัง 15:00)",
    highlight: "ดาดฟ้ากลางแจ้งเหนือแยกชิบูยะ — จุดเด่นคือมุมถ่ายภาพ ไม่ใช่ความสูง",
    area: "สถานีชิบูยะ",
  },
  {
    deck: "Tokyo Tower",
    height: "ชั้นชมวิวราว 150 และราว 250 เมตร",
    price: "ราว ¥3,300 (Top Deck Tour)",
    highlight: "แลนด์มาร์กที่สร้างในปี 1958 และวิวที่มี Skytree อยู่ในนั้น",
    area: "สวนชิบะ／อากาบาเนะบาชิ",
  },
  {
    deck: "อาคารรัฐบาลกรุงโตเกียว",
    height: "ราว 202 เมตร",
    price: "ฟรี",
    highlight: "ไม่ต้องมีตั๋วเลย — วิวพาโนรามาเมืองที่คุ้มที่สุดในโตเกียว",
    area: "ชินจูกุ",
  },
];

const steps = [
  {
    title: "เลือกก่อนจองว่าจะซื้อตั๋วชั้น 350 หรือตั๋วคอมโบ",
    desc: "ชั้น 450 ซื้อเป็นคอมโบออนไลน์ (ผู้ใหญ่เริ่มต้น ¥3,000) ถูกกว่าไปซื้อเพิ่มในวันนั้นบนตั๋วชั้น 350 (บวก ¥1,400) ถ้ามีโอกาสที่คุณจะอยากขึ้นทางเดินกระจก ให้ซื้อคอมโบตั้งแต่แรก",
  },
  {
    title: "จองตั๋วแบบระบุวันทางออนไลน์",
    desc: `เว็บไซต์ทางการขายตั๋วระบุวันตามราคา "เริ่มต้น" ข้างบน และราคาจริงในวันที่คุณไปอาจสูงกว่านั้น ซื้อในวันเข้าชมที่เคาน์เตอร์ชั้น 4 หรือเครื่องขายตั๋วจะบวกค่าธรรมเนียม ¥500 ต่อตั๋วหนึ่งใบ ซึ่งเป็นเหตุผลที่ชัดที่สุดของการจองล่วงหน้า วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    title: "ถ้าใช้บัตรที่ออกในต่างประเทศ ให้ซื้อผ่านตัวแทนจำหน่าย",
    desc: "Klook ขายตั๋วระบุเวลาเข้าชมแบบเดียวกัน พร้อมหน้าชำระเงินภาษาไทยและ e-ticket ช่วยเลี่ยงปัญหาเรื่องบัตรและภาษาที่ผู้มาเยือนหลายคนเจอในเว็บไซต์สถานที่ท่องเที่ยวของญี่ปุ่น และหน้าสินค้าเดียวกันก็มีคอมโบชั้น 450 ด้วย",
  },
  {
    title: "เช็กเวลาเปิดของวันที่คุณไป ไม่ใช่เวลาเปิดทั่วไป",
    desc: `Skytree ประกาศเวลาเปิดเป็นรายวัน และระบุชัดว่า "เวลาเปิดอาจเปลี่ยนแปลงโดยไม่แจ้งล่วงหน้า" โดยรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด ในวันที่ตรวจสอบ จุดชมวิวเปิด 10:00–22:00 และรับเข้าครั้งสุดท้าย 21:00`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว Tokyo Skytree ราคาเท่าไร?",
    a: `ตั๋วระบุวันบนเว็บไซต์ทางการสำหรับชั้น 350 ซึ่งเป็นจุดชมวิวหลัก ผู้ใหญ่ (15 ปีขึ้นไป) เริ่มต้น ¥1,800 และเด็กอายุ 6–14 ปี เริ่มต้น ¥900 ตั๋วคอมโบที่รวมชั้น 350 และชั้น 450 ผู้ใหญ่เริ่มต้น ¥3,000 เด็กเริ่มต้น ¥1,500 เด็กอายุไม่เกิน 5 ปีเข้าฟรี ทั้งหมดเป็นราคา "เริ่มต้น" ราคาจริงของแต่ละวันอาจสูงกว่า ตรวจสอบจากเว็บไซต์ทางการเมื่อ ${CHECKED}`,
  },
  {
    q: "ซื้อตั๋ว Tokyo Skytree ล่วงหน้าถูกกว่าไหม?",
    a: `ถูกกว่า และส่วนต่างเป็นตัวเลขที่ประกาศไว้ชัดเจน ไม่ได้ขึ้นกับความต้องการที่ขึ้นลง ซื้อในวันเข้าชมที่เคาน์เตอร์ขายตั๋วชั้น 4 หรือที่เครื่องขายตั๋วจะบวกค่าธรรมเนียม ¥500 ต่อตั๋วหนึ่งใบจากค่าเข้าชม ครอบครัวสี่คนจะประหยัดค่าธรรมเนียมได้ ¥2,000 การจองตั๋วแบบระบุวันทางออนไลน์ ไม่ว่าที่เว็บไซต์ทางการหรือผ่านตัวแทนจำหน่าย ไม่ต้องเสียค่าธรรมเนียมและไม่ต้องต่อคิวที่เคาน์เตอร์ วันที่ตรวจสอบ ${CHECKED}`,
  },
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
    q: "Tokyo Skytree หรือ Shibuya Sky ที่ไหนดีกว่า?",
    a: "สองที่ตอบโจทย์ต่างกัน Skytree คือเรื่องความสูงและระยะมอง ชั้น 350 และชั้น 450 เป็นจุดชมวิวที่สูงที่สุดในโตเกียว วิวครอบคลุมที่ราบคันโตทั้งผืน และวันที่ฟ้าใสจะเห็นภูเขาไฟฟูจิด้วย Shibuya Sky คือเรื่องรูปถ่าย ดาดฟ้ากลางแจ้งสูงราว 229 เมตรเหนือแยกชิบูยะพอดี สวยที่สุดตอนพระอาทิตย์ตก และให้บรรยากาศมากกว่าความสูง ถ้าเลือกได้ที่เดียว ไป Skytree เพื่อวิวพาโนรามา และไป Shibuya Sky เพื่อถ่ายรูปมุมที่ทุกคนจำได้",
  },
  {
    q: "มองเห็นภูเขาไฟฟูจิจาก Tokyo Skytree ไหม?",
    a: "วันที่ฟ้าใสมองเห็นได้ และด้วยความสูง Skytree จึงมีโอกาสดีที่สุดในบรรดาจุดชมวิวในเมือง ทัศนวิสัยขึ้นอยู่กับสภาพอากาศทั้งหมด และมักดีกว่าในเดือนที่อากาศเย็นและแห้ง รวมถึงช่วงเช้า แต่ไม่มีอะไรรับประกันได้ในวันที่คุณไป ซึ่งควรจำไว้ก่อนซื้อตั๋วคอมโบเพื่อวิวฟูจิโดยเฉพาะ",
  },
  {
    q: "ไป Tokyo Skytree อย่างไร?",
    a: "หอตั้งอยู่เหนือสถานี Tokyo Skytree ของสาย Tobu Skytree และสถานีโอชิอาเกะ ซึ่งมีรถไฟใต้ดินโตเกียวเมโทรสายฮันโซมง สายโทเออาซากุสะ และสายเคเซโอชิอาเกะ โอชิอาเกะอยู่ในขอบเขตของ Tokyo Subway Ticket ถ้าคุณถือบัตรนั้นอยู่แล้ว การเดินทางมาที่นี่จึงไม่มีค่าใช้จ่ายเพิ่ม อาซากุสะอยู่ห่างไปสองสถานีบนสายอาซากุสะ จัดสองที่นี้ไว้ในบ่ายเดียวกันได้ง่าย",
  },
  {
    q: "เปลี่ยนวันหรือเวลาของตั๋ว Tokyo Skytree ได้ไหม?",
    a: `ไม่ได้ เว็บไซต์ทางการระบุว่าตั๋วที่ซื้อแล้วเปลี่ยนไม่ได้ ถ้าจะเปลี่ยนวัน เวลา หรือประเภทตั๋ว ต้องยกเลิกแล้วซื้อใหม่ ตั๋วจากร้านออนไลน์ทางการยกเลิกฟรีถึง 31 วันก่อนเข้าชม เสีย 20% ตั้งแต่ 30 วันก่อนจนถึงเวลาเข้า และยกเลิกไม่ได้หลังเวลาเข้า ยกเลิกภายใน 59 นาทีหลังซื้อไม่มีค่าธรรมเนียม ตั๋วที่ซื้อผ่านบริษัททัวร์หรือตัวแทนจำหน่ายเป็นไปตามเงื่อนไขของผู้ขายนั้น วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "ตั๋ว Tokyo Skytree ราคาเด็กใช้กับอายุเท่าไร?",
    a: `ราคาเด็กใช้กับอายุ 6–14 ปี (นักเรียนมัธยมต้นลงมา) ผู้ที่อายุ 15 ปีขึ้นไป รวมถึงนักเรียนมัธยมปลาย ใช้ราคาผู้ใหญ่ เด็กอายุไม่เกิน 5 ปีเข้าฟรี วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "Tembo Galleria (450 ม.) ขายหมดในวันนั้นได้ไหม?",
    a: `อาจหยุดขายชั่วคราวได้ ตั๋วเพิ่ม Tembo Galleria ขายที่เครื่องขายตั๋วภายใน Tembo Deck ในวันเข้าชม และเว็บไซต์ทางการแจ้งว่าอาจต้องหยุดขายเพราะจำกัดจำนวนคน ตั๋วคอมโบที่ซื้อออนไลน์รวมการขึ้น 450 ม. ไว้กับรอบที่จองแล้ว วันที่ตรวจสอบ ${CHECKED}`,
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
            ราคาตั๋ว Tokyo Skytree 2026:<br />ชั้น 350 ม. เทียบกับ 450 ม. พร้อมวิธีจอง
          </h1>
          <p className={styles.heroSubtitle}>
            ตั๋ว Tokyo Skytree ส่วน Tembo Deck (350 ม.) ผู้ใหญ่เริ่มต้น ¥1,800 และคอมโบรวม Tembo Galleria (450 ม.)
            เริ่มต้น ¥3,000 (เว็บไซต์ทางการ ตรวจสอบ {CHECKED} ราคากำหนดเป็นรายวัน ราคาจริงในวันที่คุณไปอาจสูงกว่า)
            ตั๋วออนไลน์แบบระบุวันและเวลาไม่ต้องเสียค่าธรรมเนียม ¥500 ต่อใบ ที่เรียกเก็บเมื่อซื้อที่เคาน์เตอร์หรือเครื่องขายตั๋วหน้างาน
            และรอบที่ซื้อหน้างานได้ขึ้นกับแต่ละวัน จึงควรจองรอบที่ต้องการไว้ก่อน โดยเฉพาะรอบเย็น
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
                <p className={styles.verdictStatLabel}>ซื้อในวันเข้าชม</p>
                <p className={styles.verdictStatValue}>เพิ่ม ¥500 ต่อใบ</p>
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
        <KlookSameDayCards heading="วันเดียวกับ Skytree ควรจองอะไรอีก?" cards={sameDayCards} />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ตั๋ว Tokyo Skytree รวมอะไรบ้าง?</h2>
          <p className={styles.bodyText}>
            หน้านี้อธิบายประเภทตั๋ว ราคา และวิธีจอง Tokyo Skytree ถ้ายังเลือกไม่ได้ว่าจะขึ้นหอไหน{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">บทความเปรียบเทียบจุดชมวิวในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            เปรียบเทียบ Skytree กับ Shibuya Sky, Tokyo Tower และจุดชมวิวฟรีที่ศาลาว่าการ Tokyo Skytree ขายตั๋วจุดชมวิวสองระดับความสูงแยกกัน <strong>ชั้น 350</strong> คือ Tembo Deck
            จุดชมวิวที่มี 3 ชั้น และเป็นชั้นที่ตั๋วทุกใบรวมไว้ <strong>ชั้น 450</strong> คือ Tembo Galleria
            ทางเดินผนังกระจกลาดเอียงที่วนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ และซื้อตั๋วขึ้นเฉพาะส่วนนี้ไม่ได้
          </p>
          <p className={styles.bodyText}>
            ความสับสนส่วนใหญ่มาจากการที่จุดชมวิวแบ่งเป็นสองระดับ เพราะราคาของสองชั้นต่างกันตามว่าคุณซื้อรวมกันออนไลน์
            หรือแยกซื้อในวันเข้าชม ส่วนถัดไปเปรียบเทียบสองวิธีซื้อนี้
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋ว Tokyo Skytree ปี 2026 ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้ใหญ่เริ่มต้น ¥1,800 สำหรับ Tembo Deck (350 ม.) และเริ่มต้น ¥3,000 สำหรับคอมโบที่รวม Tembo Galleria
            (450 ม.) เด็กอายุ 6–14 ปีเริ่มต้น ¥900 และ ¥1,500 ตามลำดับ ซื้อที่หอต้องจ่ายเพิ่ม ¥500 ต่อใบ
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  ราคาจากเว็บไซต์ทางการ (en.tokyo-skytree.jp/ticket) วันที่ตรวจสอบ {CHECKED}
                </caption>
                <thead>
                  <tr>
                    {["ตั๋ว", "ออนไลน์ ระบุวัน", "ซื้อในวันเข้าชม"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ข้อมูลจากเว็บไซต์ทางการของ Tokyo Skytree วันที่ตรวจสอบ {CHECKED} หน้าทางการระบุราคาเหล่านี้เป็นราคา
            &ldquo;เริ่มต้น&rdquo; ราคาจริงของแต่ละวันจึงอาจสูงกว่า ควรยืนยันตอนจอง ค่าธรรมเนียม ¥500
            สำหรับการซื้อหน้างานคิดต่อตั๋วหนึ่งใบ ทั้งที่เคาน์เตอร์ชั้น 4 และเครื่องขายตั๋ว ส่วนตั๋วเพิ่ม Tembo
            Galleria ไม่มีค่าธรรมเนียม แหล่งทางการที่ตรวจสอบไม่ได้แยกตารางราคาวันธรรมดากับวันหยุด
            ราคาที่ใช้คือราคาที่แสดงสำหรับวันที่คุณเลือกตอนชำระเงิน
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>ตั๋วแบบไหน</span>
          <h2 className={styles.sectionTitle}>Tembo Galleria 450 ม. คุ้มกว่าจุดชมวิว 350 ม. ไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            คุ้มเฉพาะเมื่อคุณต้องการขึ้นไปให้สูงที่สุด คอมโบแพงกว่า Tembo Deck อย่างเดียว ¥1,200 สำหรับผู้ใหญ่ (เริ่มต้น
            ¥3,000 เทียบกับเริ่มต้น ¥1,800) และพาคุณจาก 350 ม. ขึ้นไปทางเดินกระจกที่ 445–450 ม. จุดสูงสุด 451.2 ม.
            ถ้ายังลังเล ให้ซื้อคอมโบออนไลน์ เพราะเพิ่ม 450 ม. ในวันนั้นราคา ¥1,400 และเว็บไซต์ทางการแจ้งว่าอาจหยุดขายเมื่อคนเต็ม
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
              <strong>เลือกตั๋วได้แล้ว?</strong> สินค้า TOKYO SKYTREE บน Klook มีตั๋วระบุเวลาเข้าชมและคอมโบ 350 ม.
              ＋450 ม. ในหน้าเดียวกัน ชำระเงินเป็นภาษาไทยและได้ e-ticket ดูราคาและรอบเวลาของวันที่คุณไปได้ในหน้าสินค้า
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
          heading="สิ่งที่ควรจองไว้สำหรับวันฝั่งโอชิอาเกะ"
          intro="การขึ้นจุดชมวิวใช้เวลาหนึ่งถึงสองชั่วโมง และตั๋วข้างบนเป็นสิ่งเดียวที่ต้องระบุเวลา รายการด้านล่างคือสิ่งที่ควรจองสำหรับช่วงบ่ายที่เหลือของวันนั้น ทั้งหมดอยู่ฝั่งแม่น้ำเดียวกับหอ และจองได้ในบัญชีเดียวกับตั๋ว"
          items={aroundTowerItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>วันเข้าชม</span>
          <h2 className={styles.sectionTitle}>ซื้อตั๋ว Tokyo Skytree ที่หน้างานได้ไหม?</h2>
          <p className={styles.bodyText}>
            ได้ ที่เคาน์เตอร์ชั้น 4 และเครื่องขายตั๋ว แต่แพงกว่าออนไลน์ใบละ ¥500 เว็บไซต์ทางการระบุว่ารอบที่ซื้อได้ในวันนั้น
            ขึ้นกับแต่ละวัน และอาจต้องต่อคิวซื้อ ตั๋วเพิ่ม Tembo Galleria ขายที่เครื่องภายใน Tembo Deck โดยไม่มีค่าธรรมเนียม
            แต่อาจหยุดขายเมื่อคนเต็ม
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ช่วงเวลา</span>
          <h2 className={styles.sectionTitle}>ไป Tokyo Skytree ช่วงไหนดีที่สุด?</h2>
          <p className={styles.bodyText}>
            ถ้าอยากได้จุดชมวิวที่คนน้อย ไปบ่ายวันธรรมดาหรือช่วงเปิดตอนเช้า ถ้าอยากชมวิวยามค่ำคืน ไปหนึ่งถึงสองชั่วโมงก่อนปิด
            สามช่วงนี้คือช่วงที่หน้าคาดการณ์ความหนาแน่นทางการแนะนำ และระบุว่าช่วงปีใหม่ โกลเดนวีก และปิดเทอมฤดูใบไม้ผลิ
            จะคนมากกว่า เวลาพระอาทิตย์ตกเปลี่ยนไปตามฤดู จึงควรเลือกรอบเย็นให้ตรงกับเวลาพระอาทิตย์ตกของวันที่ไป
            ถ้าอยู่โตเกียวไม่กี่วัน{" "}
            <Link href="/guides/attractions/tokyo-2-day-itinerary">แผนเที่ยวโตเกียว 2 วัน (อังกฤษ)</Link>{" "}
            จัด Skytree คู่กับอาซากุสะในวันเดียวกัน
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
          <h2 className={styles.sectionTitle}>Skytree ต่างจากจุดชมวิวอื่นในโตเกียวอย่างไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Skytree คือตัวเลือกด้านความสูง ถ้าสิ่งที่คุณอยากได้จริง ๆ คือรูปแยกชิบูยะ{" "}
            <Link href="/th/guides/attractions/shibuya-sky-tickets">Shibuya Sky</Link>{" "}
            คุ้มกว่า และถ้าอยากได้วิวพาโนรามาเมืองโดยไม่เสียเงินเลย อาคารรัฐบาลกรุงโตเกียวที่ชินจูกุเข้าฟรี
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["จุดชมวิว", "ความสูง", "ราคา (ราว)", "จุดเด่น", "ย่าน"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตัวเลขของ Skytree และ Shibuya Sky มาจากเว็บไซต์ของผู้ให้บริการเอง ส่วน Tokyo Tower และอาคารรัฐบาล
            กรุงโตเกียวเป็นค่าประมาณและอาจเปลี่ยนแปลง ควรยืนยันตอนจอง
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
            การเดินทางเป็นส่วนที่ง่าย หอตั้งอยู่บนสถานี Tokyo Skytree และสถานีโอชิอาเกะ และโอชิอาเกะเป็นสถานีรถไฟใต้ดิน
            จึงใช้{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket (ภาษาอังกฤษ)</Link>{" "}
            ได้ถ้าคุณมีอยู่แล้ว ส่วน{" "}
            <Link href="/guides/transport/tokyo-transportation">คู่มือการเดินทางในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            อธิบายว่าเครือข่าย Metro และ Toei เชื่อมกันอย่างไร
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="จองไปพร้อมกับกิจกรรมอื่นของวัน"
          intro="การชม Skytree ใช้เวลาหนึ่งถึงสองชั่วโมง รายการเหล่านี้จองได้ในบัญชี Klook เดียวกับตั๋ว จึงจองกิจกรรมที่เหลือของวันไปพร้อมกันได้"
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
            <h2 className={styles.ctaBannerTitle}>จองออนไลน์ล่วงหน้า ก่อนต้องจ่ายค่าธรรมเนียมเพิ่มที่เคาน์เตอร์</h2>
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
