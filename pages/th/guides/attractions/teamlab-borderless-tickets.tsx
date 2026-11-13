import Head from "next/head";
import Link from "next/link";
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
import KlookTripPrep from "../../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../../components/GygCompare";
import { thTeamlabBorderless } from "../../../../lib/klook-links-th";
import {
  klookEsim,
  roppongiHotels,
  tokyoSubwayTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor } from "../../../../lib/klook-locale";
import { gygTeamlabBorderless } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (pages/guides/attractions/teamlab-borderless-tickets.tsx) section
// by section as of 2026-11-13 (task-jtk-20261113-R01). Prices, the Flexible Pass, hours and
// closed days follow teamlab.art/e/tokyo/, and the sale window, time needed, cancellation,
// re-entry and child rules follow teamlab.art/faq/tokyo/, both as read on 13 November 2026.
// The adult and child figures still come from lib/attraction-prices.ts.

const ROUTE = "/th/guides/attractions/teamlab-borderless-tickets";
// The Thai search term "ตั๋ว teamLab Borderless" stays first in the title, H1 and description.
const TITLE = "ตั๋ว teamLab Borderless 2026: วิธีจอง";
const H1 = "ตั๋ว teamLab Borderless 2026: ราคา รอบเวลาเข้าชม และวิธีจอง";
const DESC =
  "ตั๋ว teamLab Borderless 2026: ผู้ใหญ่ ¥3,400 ขึ้นไป เปิดขายก่อน 2 เดือน ใช้เวลา 1.5–2 ชม.";

const BORDERLESS_URL = thTeamlabBorderless.url;
const GYG_SLUG = "th-teamlab-borderless-tickets";

const P = PRICES.teamlabBorderless;
const CHECKED_ISO = "2026-11-13";
const CHECKED = dateLabel(CHECKED_ISO, "th");
const OFFICIAL_URL = "https://www.teamlab.art/e/tokyo/";
const FAQ_URL = "https://www.teamlab.art/faq/tokyo/";
// "from ¥3,400" -> "เริ่มต้น ¥3,400": same figure, Thai qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");

const PLANETS = PRICES.teamlabPlanets;
const PLANETS_CHECKED = dateLabel(PLANETS.checked, "th");

// The date the official ticket address was confirmed, and the date the GetYourGuide
// listing was confirmed live (GYG_CHECKED_AT in lib/gyg-links.ts, 21 Oct 2026).
const ADDRESS_CHECKED = dateLabel("2026-10-26", "th");
const GYG_CHECKED = dateLabel("2026-10-21", "th");

const priceRows = [
  {
    ticket: "ผู้ใหญ่ (18 ปีขึ้นไป)",
    price: ADULT,
    varies: "ใช่ — ตามวันและรอบเข้าชม",
    note: "¥3,400 คือราคาขั้นต่ำ ไม่ใช่ราคาจริง ตรวจสอบยอดของวันที่คุณจะไปก่อนชำระเงิน",
  },
  { ticket: "อายุ 13–17 ปี", price: "¥2,800", varies: "ไม่ — ราคาคงที่", note: "ถ้าดูโตกว่าอายุ ให้พกบัตรประจำตัวไปด้วย" },
  { ticket: "อายุ 4–12 ปี", price: CHILD, varies: "ไม่ — ราคาคงที่", note: "เลือกวันไหนก็ราคาเดิม" },
  { ticket: "อายุไม่เกิน 3 ปี", price: "ฟรี", varies: "ไม่ — ฟรี", note: "ไม่ต้องมีตั๋ว" },
  {
    ticket: "ผู้พิการ",
    price: "เริ่มต้น ¥1,700",
    varies: "ใช่ — ใช้ปฏิทินเดียวกับตั๋วผู้ใหญ่",
    note: "ผู้ติดตามหนึ่งคนได้ราคาลดเดียวกัน ต้องแสดงหลักฐานสิทธิ์",
  },
  {
    ticket: "Flexible Pass (ไม่ระบุเวลาเข้า)",
    price: "¥12,000",
    varies: "ประกาศเป็นราคาเดียวสำหรับผู้ใหญ่／เด็ก",
    note: "ใช้ได้ตลอดวันที่เลือก จนถึงเวลารับเข้าครั้งสุดท้าย",
  },
  {
    ticket: "ซื้อหน้างาน",
    price: "ผู้ใหญ่ +¥200",
    varies: "—",
    note: "มีขายเฉพาะเมื่อยังเหลือรอบ หน้าทางการระบุว่าราคาหน้างานต่างจากราคาออนไลน์",
  },
];

// Sale window and what happens after purchase — teamLab's own FAQ, except the worked
// example, which is that rule applied.
const saleRows = [
  {
    item: "เปิดขายเมื่อไร",
    detail: "ราววันที่ 1 ของเดือน ล่วงหน้าสองเดือนก่อนวันเข้าชม",
    source: "FAQ ของ teamlab.art",
  },
  {
    item: "ตัวอย่าง",
    detail: "ไปเดือนมกราคม 2027 → เปิดขายราว 1 พฤศจิกายน 2026 ไปเดือนกุมภาพันธ์ 2027 → ราว 1 ธันวาคม 2026",
    source: "คำนวณจากกฎใน FAQ",
  },
  {
    item: "ขายหมดไหม?",
    detail: "หมดได้ — teamLab แนะนำให้ซื้อทันทีที่กำหนดวันเดินทางได้",
    source: "FAQ ของ teamlab.art",
  },
  {
    item: "ตั๋ววันเดียวกัน",
    detail: "ซื้อบนเว็บไซต์ขายตั๋วทางการได้ถ้ายังไม่หมด และซื้อหน้างานได้เช่นกันในราคาที่ต่างออกไป",
    source: "FAQ ของ teamlab.art",
  },
  {
    item: "การยกเลิก",
    detail: "โดยทั่วไปซื้อแล้วยกเลิกไม่ได้",
    source: "FAQ ของ teamlab.art",
  },
  {
    item: "เปลี่ยนวัน",
    detail: "เฉพาะตั๋วทางการ: ได้สูงสุด 3 ครั้ง โดยต้องเปลี่ยนอย่างช้า 2 ชั่วโมงก่อนเวลาเข้าชมที่จอง (Flexible Pass: 2 ชั่วโมงก่อนเวลารับเข้าครั้งสุดท้าย)",
    source: "FAQ ของ teamlab.art",
  },
  {
    item: "ซื้อผ่าน Klook หรือที่อื่น",
    detail: "ใช้เงื่อนไขของผู้ขายรายนั้น — teamLab แนะนำให้ตรวจสอบกับผู้ขาย",
    source: "FAQ ของ teamlab.art",
  },
];

const hoursRows = [
  {
    item: "เวลาที่ควรเผื่อ",
    detail: "ราว 1.5–2 ชั่วโมง — teamLab ระบุว่าโดยเฉลี่ยใช้ราวหนึ่งชั่วโมงครึ่ง และ \"ราว 2 ชั่วโมง\" ไม่มีจำกัดเวลา และกลับเข้าใหม่ไม่ได้",
    source: `FAQ ของ teamlab.art, ${CHECKED}`,
  },
  { item: "เวลาเปิด", detail: "ประกาศไว้ 08:30–21:00 ต่างกันไปตามวัน", source: `teamlab.art, ${CHECKED}` },
  { item: "รับเข้าครั้งสุดท้าย", detail: "หนึ่งชั่วโมงก่อนปิด — ปิด 21:00 ต้องเข้าก่อน 20:00", source: `teamlab.art, ${CHECKED}` },
  {
    item: "วันปิดเร็วและปิดดึก",
    detail: "ปิด 22:00 วันที่ 2, 5, 6, 9, 12, 13 พฤศจิกายน และ 26–30 ธันวาคม 2026 ปิด 17:00 วันที่ 26 มกราคม 2027",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "วันปิด",
    detail: "วันอังคารที่ 24 พฤศจิกายน และวันอังคารที่ 8 ธันวาคม 2026 วันพุธที่ 13 มกราคม และวันอังคารที่ 19 มกราคม 2027",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Entrance Pass",
    detail: "ระบุทั้งวันและเวลาเข้าชม รอบเวลาก็คือการจอง",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Flexible Pass",
    detail: "ใช้ได้ในวันที่เลือกโดยไม่ระบุเวลาเข้าชม ราคาสูงกว่า",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "เปลี่ยนวัน",
    detail: "ได้ถึงสามครั้งสำหรับตั๋วที่ซื้อจาก teamLab โดยตรง",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "ซื้อหน้างาน",
    detail: "ขายที่พิพิธภัณฑ์เมื่อยังเหลือรอบ ผู้ใหญ่แพงกว่า ¥200",
    source: `teamlab.art, ${CHECKED}`,
  },
];

const vsPlanetsRows = [
  {
    factor: "ที่ตั้ง",
    borderless: "อาซาบุไดฮิลส์ เขตมินาโตะ — 2 นาทีจากสถานีคามิยะโจ",
    planets: "โทโยสุ — เดิน 3 นาทีจากทางออก 1A สถานีชินโทโยสุ",
  },
  { factor: "ตั๋วผู้ใหญ่", borderless: `${ADULT} ตามวันและรอบ`, planets: `${priceLabel(PLANETS.adult, "th")} ตามวันและรอบ` },
  { factor: "อายุ 4–12 ปี", borderless: CHILD, planets: priceLabel(PLANETS.child, "th") },
  {
    factor: "ทำอะไร",
    borderless: "เดินในเขาวงกตไร้แผนที่ที่มีผลงานราว 70 ชิ้น ใส่รองเท้าได้",
    planets: "เดินเท้าเปล่าผ่านน้ำที่สูงถึงระดับเข่าผู้ใหญ่",
  },
  {
    factor: "ควรแต่งตัวอย่างไร",
    borderless: "ใส่อะไรก็ได้ teamLab แนะนำสีขาวหรือสีพื้นสว่าง ๆ เพื่อให้ถ่ายรูปสวย",
    planets: "กางเกงที่พับขึ้นเหนือเข่าได้ — น้ำลึกระดับเข่า",
  },
  {
    factor: "การเข้าชม",
    borderless: "วัน + เวลาเข้าชม หรือ Flexible Pass ที่ไม่ระบุเวลา",
    planets: "วัน + เวลาเข้าชมเท่านั้น",
  },
  {
    factor: "ซื้อหน้างาน",
    borderless: "ขายเมื่อยังเหลือรอบ ผู้ใหญ่ +¥200",
    planets: "ไม่ขายหน้างานเลย — ต้องซื้อออนไลน์ล่วงหน้าเท่านั้น",
  },
  { factor: "เวลาที่ควรเผื่อ", borderless: "ราว 1.5–2 ชั่วโมง (FAQ ทางการ)", planets: "ราว 1.5–2 ชั่วโมง" },
  {
    factor: "เหมาะกับ",
    borderless: "ศิลปะ การถ่ายรูป ผู้ใหญ่ และบ่ายวันฝนตกกลางโตเกียว",
    planets: "เด็ก และความประทับใจแรกที่แรงที่สุด",
  },
];

const buyingRows = [
  {
    factor: "ราคา",
    official: "ราคาพื้นฐาน ขึ้นลงตามวันและรอบ",
    klook: "ตั๋วใบเดียวกัน แสดงราคาด้วยสกุลเงินของคุณ",
    gyg: "กำหนดตามแพ็กเกจ ดูบนหน้าสินค้า",
    door: "ผู้ใหญ่ +¥200 ราคาหน้างานประเภทอื่นก็ต่างไปด้วย",
  },
  {
    factor: "ภาษาตอนชำระเงิน",
    official: "มีเว็บไซต์ภาษาอังกฤษ",
    klook: "หน้าจอภาษาไทย ได้ตั๋วอิเล็กทรอนิกส์ทันที",
    gyg: "หน้าสินค้าภาษาอังกฤษ",
    door: "ที่เคาน์เตอร์ของพิพิธภัณฑ์",
  },
  {
    factor: "บัตรต่างประเทศ",
    official: "ส่วนใหญ่ได้ แต่ไม่รับประกัน",
    klook: "ออกแบบมาเพื่อบัตรต่างประเทศและวอลเล็ต",
    gyg: "ไม่ได้ตรวจสอบ — เช็กตอนชำระเงิน",
    door: "หน้างานรับบัตรได้",
  },
  {
    factor: "เปลี่ยนวัน",
    official: "เปลี่ยนวันได้ถึงสามครั้ง",
    klook: "ขึ้นกับแพ็กเกจ Klook ที่เลือก — อ่านก่อนชำระเงิน",
    gyg: "ไม่ได้ตรวจสอบ — ต่างกันตามแพ็กเกจ อ่านก่อนชำระเงิน",
    door: "ไม่เกี่ยว",
  },
  {
    factor: "ความเสี่ยงที่จะซื้อไม่ได้",
    official: "ต่ำ ถ้าจองล่วงหน้า",
    klook: "ต่ำ ถ้าจองล่วงหน้า",
    gyg: "เคาน์เตอร์ที่สองที่ควรลอง ถ้ารอบที่ต้องการหมดจากที่แรกแล้ว",
    door: "สูง — รอบยอดนิยมหมดก่อนถึงวันนั้น",
  },
];

const whoFor = [
  {
    title: "ซื้อจากเว็บไซต์ทางการ ถ้า…",
    desc: "คุณอยากได้ราคาพื้นฐานที่ต่ำที่สุดและความยืดหยุ่นเรื่องวันมากที่สุด ตั๋วที่ซื้อจาก teamLab โดยตรงเปลี่ยนวันได้ถึงสามครั้ง ซึ่งมีประโยชน์ถ้าแผนโตเกียวของคุณยังขยับอยู่",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "ซื้อผ่าน Klook ถ้า…",
    desc: "คุณอยากชำระเงินด้วยสกุลเงินของตัวเองบนหน้าจอที่อ่านเข้าใจ จ่ายด้วยบัตรที่ออกนอกญี่ปุ่น และเก็บตั๋วอิเล็กทรอนิกส์ไว้ในแอปเดียวกับการจองอื่น ๆ Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab บัตรจึงมีสิทธิ์เข้าชมเหมือนกัน ต่างกันเพียงช่องทางการซื้อ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M14 6v12" strokeDasharray="2 2" />
        <path d="M6 10h4M6 14h4" />
      </svg>
    ),
  },
  {
    title: "อย่าวางแผนซื้อหน้างาน ถ้า…",
    desc: "คุณไปวันหยุดสุดสัปดาห์ วันหยุดนักขัตฤกษ์ หรือรอบช่วงเย็น ตั๋วหน้างานของผู้ใหญ่แพงกว่า ¥200 และมีขายเฉพาะเมื่อยังเหลือรอบ ซึ่งในช่วงเวลาที่คนส่วนใหญ่ต้องการ มักไม่เหลือ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "เลือกวันก่อน แล้วดูราคาของวันนั้น",
    desc: "ตั๋วผู้ใหญ่และตั๋วผู้พิการของ Borderless เป็นราคาแบบยืดหยุ่น ยอดที่เห็นขึ้นอยู่กับวันและรอบเวลาที่เลือก เช้าวันธรรมดามักถูกที่สุดและคนน้อยที่สุด",
  },
  {
    title: "เลือกเวลาเข้าชม หรือเลือก Flexible Pass",
    desc: "Entrance Pass แบบมาตรฐานระบุเวลาเข้าชม teamLab ยังขาย Flexible Pass ที่ใช้ได้ในวันที่ระบุโดยไม่กำหนดเวลาเข้าชม ซึ่งคุ้มกับส่วนต่างถ้าวันของคุณคาดเดาไม่ได้",
  },
  {
    title: "ซื้อทันทีที่วันเดินทางลงตัว — ตั๋วเปิดขายล่วงหน้าราวสองเดือน",
    desc: "ตั๋วเปิดขายราววันที่ 1 ของเดือน ล่วงหน้าสองเดือนก่อนวันเข้าชม และ teamLab เองแนะนำให้ซื้อทันทีที่กำหนดวันได้ เพราะตั๋วขายหมดได้ รอบวันหยุดสุดสัปดาห์และรอบเย็นคือรอบที่ควรจองให้ได้ก่อน",
  },
  {
    title: "แสดงตั๋วบนมือถือ และเผื่อเวลา 1.5–2 ชั่วโมง",
    desc: "ตั๋วทางการเปิดได้จากลิงก์ในอีเมลยืนยัน ถ้ามีมือถือก็ไม่ต้องพิมพ์ เข้าไปแล้วไม่มีจำกัดเวลา แต่กลับเข้าใหม่ไม่ได้ และ teamLab ระบุว่าการเข้าชมใช้เวลาราว 1.5–2 ชั่วโมง รถเข็นเด็กต้องฝากไว้ที่ห้องเก็บสัมภาระ ส่วนสถานีคามิยะโจและร็อปปงหงิอิตโจเมะเชื่อมใต้ดินมาถึงได้ทั้งคู่",
  },
];

// Same-day bookings: the English page's three products (hotels near Roppongi, the
// Tokyo Subway Ticket, the eSIM) with Thai text. No prices.
const tripPrep: KlookTripPrepItem[] = [
  {
    label: "โรงแรมใกล้สถานีร็อปปงหงิ",
    ctaLabel: "ดูโรงแรมย่านร็อปปงหงิบน Klook →",
    url: klookFor(roppongiHotels.url, "th"),
    why: "สถานีร็อปปงหงิอิตโจเมะเชื่อมกับพิพิธภัณฑ์ทางใต้ดิน การพักย่านนี้จึงทำให้รอบแรก 08:30 หรือการเข้ารอบสุดท้าย 20:00 เป็นแค่การเดินระยะสั้น ไม่ต้องนั่งรถข้ามเมือง",
  },
  {
    label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    ctaLabel: "ดู Tokyo Subway Ticket บน Klook →",
    url: klookFor(tokyoSubwayTicket.url, "th"),
    why: "สถานีที่ใช้เดินทางมาทั้งสองแห่ง — คามิยะโจบนสายฮิบิยะ และร็อปปงหงิอิตโจเมะบนสายนัมโบกุ — เป็นสถานีของโตเกียวเมโทร ตั๋ว 24, 48 หรือ 72 ชั่วโมงจึงครอบคลุมทั้งขาไปและการเที่ยวต่อตลอดวัน",
  },
  {
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM ของ Klook →",
    url: klookFor(klookEsim.url, "th"),
    why: "ตั๋วทางการคือหน้าจอที่เปิดจากลิงก์ในอีเมลยืนยันแล้วแสดงที่ทางเข้า และการเปลี่ยนวันต้องทำออนไลน์อย่างช้า 2 ชั่วโมงก่อนรอบ ทั้งสองอย่างต้องใช้อินเทอร์เน็ตระหว่างอยู่ข้างนอก ไม่ใช่แค่ Wi-Fi โรงแรม",
  },
];

// Five questions, matching the English page.
const faqItems: FaqItem[] = [
  {
    q: "จองตั๋ว teamLab Borderless แบบระบุรอบเวลาอย่างไร?",
    a: `เลือกวันบนปฏิทินตั๋วทางการ (teamlab.art/e/tokyo) หรือบน Klook ซึ่ง teamLab ระบุว่าเป็นช่องทางขายทางการอีกแห่ง ดูราคาผู้ใหญ่ของวันนั้น แล้วเลือกเวลาเข้าชมสำหรับ Entrance Pass — หรือเลือก Flexible Pass ราคา ¥12,000 ที่ไม่กำหนดเวลาเข้า ชำระด้วยบัตรเครดิต (เว็บไซต์ทางการรับ PayPay ด้วย) แล้วตั๋วจะมาเป็นลิงก์ในอีเมลยืนยัน ใช้แสดงบนมือถือที่ทางเข้า ราคาและเงื่อนไขตามเว็บไซต์ทางการเมื่อ ${CHECKED}`,
  },
  {
    q: "ตั๋ว teamLab Borderless เปิดขายเมื่อไร?",
    a: `ราววันที่ 1 ของเดือน ล่วงหน้าสองเดือนก่อนวันเข้าชม — ถ้าไปเดือนมกราคม 2027 ตั๋วจะเปิดขายราว 1 พฤศจิกายน 2026 FAQ ของ teamLab (อ่านเมื่อ ${CHECKED}) ระบุว่าตั๋วขายหมดได้ และแนะนำให้ซื้อทันทีที่กำหนดวันได้ ส่วนตั๋ววันเดียวกันมีขายออนไลน์หรือหน้างานเฉพาะเมื่อยังเหลือ`,
  },
  {
    q: "ตั๋ว teamLab Borderless ซื้อออนไลน์ราคาเท่าไร?",
    a: `บนเว็บไซต์ขายตั๋วทางการ ตรวจสอบเมื่อ ${CHECKED}: ผู้ใหญ่ (18 ปีขึ้นไป) เริ่มต้น ¥3,400 อายุ 13–17 ปี ¥2,800 อายุ 4–12 ปี ¥1,500 เด็กอายุไม่เกิน 3 ปีเข้าฟรี และผู้พิการเริ่มต้น ¥1,700 (ผู้ติดตามหนึ่งคนได้ราคาเดียวกัน) ราคาผู้ใหญ่และผู้พิการเปลี่ยนตามวันและรอบเวลา ¥3,400 จึงเป็นราคาขั้นต่ำ Flexible Pass ราคา ¥12,000 และถ้าซื้อหน้างาน ผู้ใหญ่จ่ายแพงกว่า ¥200`,
  },
  {
    q: "teamLab Borderless ใช้เวลานานเท่าไร?",
    a: `ราว 1.5 ถึง 2 ชั่วโมง FAQ ของ teamLab (อ่านเมื่อ ${CHECKED}) ระบุว่าโดยเฉลี่ยใช้เวลาราวหนึ่งชั่วโมงครึ่ง และระบุด้วยว่าการเข้าชมใช้เวลาราว 2 ชั่วโมง ไม่มีจำกัดเวลา ไม่ต้องออกเมื่อรอบถัดไปเริ่ม แต่ออกแล้วกลับเข้าใหม่ไม่ได้`,
  },
  {
    q: "เด็กอายุต่ำกว่า 4 ขวบต้องซื้อตั๋ว teamLab Borderless ไหม?",
    a: `ไม่ต้อง — เด็กอายุไม่เกิน 3 ปีเข้าฟรี และไม่มีอายุขั้นต่ำ ส่วนอายุ 4–12 ปีจ่าย ¥1,500 เด็กวัยประถมและเล็กกว่าต้องมาพร้อมผู้ใหญ่อายุ 18 ปีขึ้นไป ในอัตราผู้ใหญ่หนึ่งคนต่อเด็กไม่เกินห้าคน (นับรวมเด็กเล็กที่เข้าฟรี) และห้ามนำรถเข็นเด็กเข้าไปข้างใน ต้องฝากไว้ที่ห้องเก็บสัมภาระ ตาม FAQ ทางการ อ่านเมื่อ ${CHECKED}`,
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว teamLab Borderless" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
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
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            teamLab Borderless ที่อาซาบุไดฮิลส์ ราคาบัตรเข้าชมเท่าไร ตั๋วของแต่ละเดือนเปิดขายเมื่อไร
            ระบบรอบระบุเวลาทำงานอย่างไร และควรซื้อจากเว็บไซต์ทางการหรือผ่าน Klook
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "อธิบายรอบระบุเวลา"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <p className={styles.bodyText}>
          <strong>ตั๋ว teamLab Borderless</strong> บนเว็บไซต์ทางการ ผู้ใหญ่<strong>เริ่มต้น ¥3,400</strong>{" "}
          อายุ 13–17 ปี ¥2,800 อายุ 4–12 ปี ¥1,500 และเด็กอายุไม่เกิน 3 ปีเข้าฟรี โดยราคาผู้ใหญ่จะสูงขึ้นในวันและรอบที่คนเยอะ
          Entrance Pass แต่ละใบระบุทั้งวันและ<strong>เวลาเข้าชม</strong> และตั๋ว
          <strong>เปิดขายราววันที่ 1 ของเดือน ล่วงหน้าสองเดือน</strong>ก่อนวันเข้าชม — ถ้าไปเดือนมกราคม 2027
          ตั๋วจะเปิดขายราว 1 พฤศจิกายน 2026 teamLab ระบุว่าการเข้าชมใช้เวลา<strong>ราว 1.5–2 ชั่วโมง</strong>{" "}
          และเข้าไปแล้วไม่มีจำกัดเวลา
        </p>
        <p className={styles.bodyText}>
          ตัวเลขทั้งหมดอ่านจากเว็บไซต์ทางการของ teamLab และหน้า FAQ เมื่อ {CHECKED} ถ้ายังเลือกไม่ได้ว่าจะไปแห่งไหน{" "}
          <Link href="/th/guides/attractions/teamlab-tokyo-tickets">เทียบ teamLab Planets กับ Borderless</Link>{" "}
          มีคำตอบให้ ส่วนหน้านี้ว่าด้วยการจองตั๋ว Borderless โดยเฉพาะ
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ตั๋วผู้ใหญ่</p>
                <p className={styles.verdictStatValue}>เริ่มต้น ¥3,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การเข้าชม</p>
                <p className={styles.verdictStatValue}>ระบุวัน＋รอบเวลา</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาที่ควรเผื่อ</p>
                <p className={styles.verdictStatValue}>ราว 1.5–2 ชั่วโมง</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เปิดขาย</p>
                <p className={styles.verdictStatValue}>ราววันที่ 1 ของเดือน ล่วงหน้า 2 เดือน</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ค่าเข้าชมผู้ใหญ่เริ่มต้น ¥3,400 และเป็นราคาแบบยืดหยุ่น วันและรอบที่คุณเลือก
              จะเป็นตัวกำหนดยอดสุดท้าย ตั๋วระบุทั้งวันและเวลา ยกเลิกไม่ได้ และขายหมดได้ ซื้อหน้างานผู้ใหญ่แพงกว่า ¥200
              และต้องยังเหลือรอบ พิพิธภัณฑ์เปิดราว 08:30–21:00 รับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด เผื่อเวลา 1.5–2 ชั่วโมง
              และไปทางสถานีคามิยะโจ (สายฮิบิยะ เดิน 2 นาที) หรือร็อปปงหงิอิตโจเมะ (สายนัมโบกุ เดิน 6 นาที)
              ซึ่งเชื่อมใต้ดินทั้งคู่ ซื้อจากเว็บไซต์ทางการถ้าอยากได้ราคาพื้นฐานและเปลี่ยนวันฟรีได้ถึงสามครั้ง
              ซื้อผ่าน Klook ถ้าอยากชำระเงินบนหน้าจอที่อ่านเข้าใจ ด้วยสกุลเงินของตัวเอง และรับบัตรต่างประเทศ
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                จองตั๋ว teamLab Borderless →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              ราคา เวลาเปิด และวันปิดในหน้านี้อ่านจากเว็บไซต์ทางการของ teamLab เมื่อ {CHECKED}{" "}
              Borderless ใช้ราคาแบบยืดหยุ่นและปฏิทินที่เปลี่ยนอยู่เสมอ ควรยืนยันทั้งสองอย่างด้วยวันของคุณเองตอนชำระเงิน
            </p>
          </div>
        </div>

        <KlookTripPrep
          label="จองไว้สำหรับวันเดียวกัน"
          heading="วันไป teamLab Borderless ควรจองอะไรอีก?"
          headingLevel={3}
          intro="รอบเวลาที่จองไว้กำหนดว่าคุณต้องอยู่ที่ไหนและเมื่อไร สามรายการนี้จองได้ในบัญชี Klook เดียวกับตั๋ว: ที่พักใกล้อาซาบุไดฮิลส์ ตั๋วรถไฟใต้ดินที่ครอบคลุมทั้งสองสถานี และอินเทอร์เน็ตสำหรับตั๋วอิเล็กทรอนิกส์"
          items={tripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋ว teamLab Borderless ซื้อออนไลน์ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ซื้อออนไลน์ ผู้ใหญ่จ่าย<strong>เริ่มต้น ¥3,400</strong> อายุ 13–17 ปี ¥2,800 เด็กอายุ 4–12 ปี ¥1,500
            และเด็กอายุต่ำกว่า 4 ปีไม่ต้องจ่ายเลย ส่วน Flexible Pass ราคา ¥12,000 ที่ขยับมีแค่ตั๋วผู้ใหญ่และตั๋วผู้พิการ Borderless ตั้งราคาสองประเภทนี้
            ตามวันและรอบเข้าชม ราคาทางการจึงมีคำว่า &ldquo;เริ่มต้น&rdquo; และตั๋วที่ถูกที่สุดในทริปของคุณ
            จึงเป็นคำถามเรื่องปฏิทิน ไม่ใช่เรื่องผู้ขาย
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ประเภทตั๋ว", "ราคา (เริ่มต้น)", "ขยับตามวันไหม?", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a>{" "}
            ตั๋วที่ซื้อหน้างานแพงกว่า ¥200 สำหรับผู้ใหญ่ ตั๋วลดราคาต้องแสดงหลักฐานสิทธิ์ จึงควรพกบัตรประจำตัวไปด้วย
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
            เด็กอายุต่ำกว่า 4 ขวบต้องมีตั๋วไหม?
          </h3>
          <p className={styles.bodyText}>
            ไม่ต้อง เด็กอายุไม่เกิน 3 ปีเข้าฟรีและไม่มีอายุขั้นต่ำ แต่เด็กวัยประถมหรือเล็กกว่าทุกคนต้องมีผู้ใหญ่อายุ 18 ปีขึ้นไปมาด้วย
            ในอัตราผู้ใหญ่หนึ่งคนต่อเด็กไม่เกินห้าคน นับรวมเด็กเล็กที่เข้าฟรี และห้ามนำรถเข็นเด็กเข้าไปข้างใน
            ต้องฝากไว้ที่ห้องเก็บสัมภาระ (FAQ ทางการ, {CHECKED})
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>ราคาผู้ใหญ่ขยับได้มากแค่ไหนไม่มีการประกาศ</strong> teamLab พิมพ์ราคาเริ่มต้นกับปฏิทิน
            ไม่ใช่ตารางราคา ไม่มีใครบอกราคาที่แน่นอนของเย็นวันเสาร์ที่ Borderless ได้ เพราะราคาขึ้นอยู่กับวันและรอบเข้าชม และหน้าไหนที่บอกช่วงราคา
            ให้คุณ ก็แต่งขึ้นเอง ให้ถือว่า ¥3,400 คือราคาขั้นต่ำ เปิดปฏิทินทางการทุกวันที่ทริปของคุณยืดหยุ่นได้
            แล้วเทียบตัวเลขก่อนชำระเงิน การเลื่อนวันเข้าชมเพียงหนึ่งวันช่วยให้ราคาถูกลงได้ แต่การหาผู้ขายที่ถูกกว่าไม่ช่วย
            เพราะวันและรอบเป็นตัวกำหนดราคา
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ก่อนจอง</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless ต้องใช้เวลานานเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ราว 1.5 ถึง 2 ชั่วโมง teamLab ระบุว่าโดยเฉลี่ยใช้เวลาราวหนึ่งชั่วโมงครึ่ง ไม่มีจำกัดเวลา
            และไม่ต้องออกเมื่อรอบถัดไปเริ่ม — แต่ออกแล้วกลับเข้าใหม่ไม่ได้ สิ่งที่ทำให้คนพลาดบ่อยกว่าเวลาคือปฏิทิน
            พิพิธภัณฑ์ปิดเป็นบางวัน และบางวันปิดเร็วหรือปิดดึก จึงควรดูตารางก่อนเลือกรอบ
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "ที่เว็บไซต์ทางการระบุ", "แหล่งที่มาและวันที่"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">teamlab.art/e/tokyo</a> (เวลาเปิด
            วันปิด และประเภทตั๋ว) และ{" "}
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a> (เวลาที่ควรเผื่อ)
            เวลาเปิดและวันปิดเปลี่ยนไปทุกเดือน จึงควรเปิดปฏิทินทางการด้วยวันของคุณเองก่อนจองรอบ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>คุณซื้ออะไร</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless คืออะไรกันแน่</h2>
          <p className={styles.bodyText}>
            Borderless เป็นพิพิธภัณฑ์ที่ไม่มีแผนที่ ผลงานราว 70 ชิ้นอยู่ในกลุ่มห้องที่เชื่อมถึงกัน
            และตัวผลงานเองเคลื่อนไหว ผลงานเดินออกจากพื้นที่หนึ่งไปอีกพื้นที่ ตอบสนองต่อคนในห้อง และเปลี่ยนไปตลอดวัน
            ไม่มีเส้นทางแนะนำ ไม่มีจุดที่ใส่หมายเลข คนสองคนที่ถือตั๋วแบบเดียวกันจึงอาจได้ประสบการณ์ที่ต่างกันจริง ๆ
          </p>
          <p className={styles.bodyText}>
            การออกแบบแบบนี้คือเหตุผลที่ตั๋วใบนี้คุ้มกับการวางแผน รีบดูหนึ่งชั่วโมงจะได้แค่ห้องดัง ๆ
            ส่วน 1.5–2 ชั่วโมงทำให้คุณเดินเรื่อยเปื่อย ย้อนกลับ และเจอผลงานที่ปรากฏเฉพาะเมื่อคุณรอ
            นี่จึงทำให้ Borderless เป็นแห่งที่เป็นผู้ใหญ่กว่าและเหมาะกับการถ่ายรูปมากกว่าในบรรดา
            พิพิธภัณฑ์ teamLab สองแห่งของโตเกียว — ดู{" "}
            <Link href="/th/guides/attractions/teamlab-planets-tickets">ไกด์ตั๋ว teamLab Planets</Link>{" "}
            สำหรับแห่งที่โทโยสุซึ่งเดินเท้าเปล่าลุยน้ำ และมุมมองการตัดสินใจจากฝั่ง Planets
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การตัดสินใจ</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless คุ้มไหม?</h2>
          <p className={styles.bodyText}>
            สำหรับคนที่ชอบศิลปะ การถ่ายรูป หรือแค่อยากอยู่ในที่ที่ไม่เหมือนที่ไหน คำตอบคือคุ้ม —
            แต่นี่คือสถานที่ราว 1.5–2 ชั่วโมงที่เริ่มต้น ¥3,400 ต่อคน ราคาเท่าการเที่ยวครึ่งบ่าย แต่ใช้เวลาเท่ามื้อกลางวันยาว ๆ
            นี่คือตัวเลขให้คุณตัดสินเอง แทนที่จะเป็นคำตัดสินที่ซ่อนตัวเลขไว้ข้างหลัง
          </p>
          <ul className={styles.bodyList}>
            <li><strong>ค่าใช้จ่ายต่อชั่วโมงสูง</strong> ¥3,400 สำหรับ 1.5–2 ชั่วโมง มากกว่าสองเท่าของ Main Deck ของโตเกียวทาวเวอร์ที่ ¥1,500 และสูงกว่าตั๋วออนไลน์ช่วงกลางวันของ Shibuya Sky ที่ {PRICES.shibuyaSky.adult.split(" / ")[0]} ซึ่งทั้งสองแห่งอยู่ได้นาน — เทียบตัวเลขได้ที่<Link href="/guides/attractions/japan-attraction-ticket-prices">ตารางราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)</Link> คุณจ่ายเพื่อสิ่งที่ดูที่อื่นไม่ได้ ไม่ใช่เพื่อความยาว</li>
            <li><strong>การไม่มีแผนที่คือคุณค่า และความเสี่ยง</strong> ผลงานราว 70 ชิ้นที่ไม่มีเส้นทางและไม่มีหมายเลข หมายความว่ารีบดูหนึ่งชั่วโมงจะได้แค่ห้องดัง ๆ ถ้าคุณมีแค่ชั่วโมงเดียว ตั๋วนี้ไม่คุ้ม ไม่ใช่แค่ฉบับย่อของสิ่งดี</li>
            <li><strong>ใช้แรงน้อยกว่าในสองแห่ง</strong> ใส่รองเท้าได้ ไม่ต้องลุยน้ำ ไม่ต้องพกเสื้อผ้าเปลี่ยน ถ้ารูปแบบของ Planets ฟังดูเป็นภาระมากกว่าประสบการณ์ ที่นี่คือ teamLab เดียวกันโดยไม่มีส่วนนั้น</li>
            <li><strong>ไม่กลัวฝนและอยู่ใจกลางเมือง</strong> อาซาบุไดฮิลส์อยู่ห่างสถานีคามิยะโจสองนาทีทางใต้ดิน บ่ายวันฝนตกจึงไม่ทำให้คุณเสียอะไรในการเดินทาง ซึ่งแผนวันฝนตกส่วนใหญ่ในโตเกียวทำไม่ได้</li>
            <li><strong>พลาดที่นี่ยังพอแก้ได้</strong> ต่างจาก Planets ตรงที่ Borderless ยังขายหน้างานเมื่อเหลือรอบ การจองไม่ทันจึงหมายถึงจ่ายเพิ่ม ¥200 และได้รอบที่แย่กว่า ไม่ใช่เสียทั้งบ่าย</li>
          </ul>
          <p className={styles.bodyText}>
            ข้ามไปถ้าวันในโตเกียวของคุณแน่นอยู่แล้ว ถ้าให้เวลาได้แค่ชั่วโมงเดียว หรือถ้าเดินทางกับเด็กเล็กและไปได้แค่
            teamLab แห่งเดียว — Planets ง่ายกว่าเมื่อไปกับเด็ก นี่คือสามเหตุผลที่ตั๋วนี้ทำให้ผิดหวัง และไม่มีข้อไหนเกี่ยวกับตัวงานศิลปะ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ความว่างของรอบ</span>
          <h2 className={styles.sectionTitle}>ตั๋ว teamLab Borderless เปิดขายเมื่อไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ราววันที่ 1 ของเดือน ล่วงหน้าสองเดือนก่อนวันเข้าชม — วันเข้าชมเดือนมกราคม 2027 จึงเปิดขายราว
            1 พฤศจิกายน 2026 teamLab ระบุว่าตั๋วขายหมดได้ และแนะนำให้ซื้อทันทีที่กำหนดวันได้ ตั๋วทางการยกเลิกไม่ได้
            ทำได้แค่เลื่อนไปวันอื่น
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "สิ่งที่ teamLab ระบุ", "แหล่งที่มา"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {saleRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} —{" "}
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer">teamlab.art/faq/tokyo</a>{" "}
            teamLab ไม่ได้ประกาศว่ารอบแต่ละรอบเต็มล่วงหน้ากี่วัน หน้านี้จึงไม่ใส่ตัวเลขนั้น
          </p>
          <ul className={styles.bodyList}>
            <li><strong>วางแผนวันซื้อ ไม่ใช่แค่วันไป:</strong> ถ้าทริปของคุณตรงกับเดือนที่ตั๋วเปิดขายในช่วงที่คุณยังตัดสินใจอยู่ วันเปิดขายคือวันที่ควรจดไว้ในปฏิทิน</li>
            <li><strong>ตั๋ววันเดียวกันเป็นแค่แผนสำรอง:</strong> ซื้อได้ทั้งออนไลน์และหน้างานเฉพาะเมื่อยังเหลือ และหน้างานผู้ใหญ่แพงกว่า ¥200</li>
            <li><strong>ถ้าวันเปลี่ยน ให้เปลี่ยนวัน อย่าจองใหม่:</strong> ตั๋วทางการเลื่อนวันได้สูงสุดสามครั้ง อย่างช้า 2 ชั่วโมงก่อนเวลาเข้าชมที่จอง ถ้าวันใหม่แพงกว่า คุณจ่ายราคาใหม่และได้เงินค่าตั๋วเดิมคืน</li>
            <li><strong>เงื่อนไขของตัวแทนเป็นของตัวแทนเอง:</strong> ระยะเวลาเปลี่ยนและยกเลิกบน Klook และ GetYourGuide กำหนดตามแต่ละแพ็กเกจ ควรอ่านบนหน้าจองก่อนชำระเงิน อย่าเหมาว่าสิทธิ์เปลี่ยนสามครั้งของ teamLab จะติดไปด้วย</li>
          </ul>
          <p className={styles.bodyText}>
            ลำดับที่ใช้ได้จริงจึงเป็น เลือกวัน อ่านราคาของวันนั้น แล้วค่อยเลือกผู้ขาย มีแค่สองขั้นแรกที่เปลี่ยนยอดที่คุณจ่าย
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดูวันและรอบของ teamLab Borderless →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab ส่วน GetYourGuide เป็นที่ที่สองให้ลองดูเมื่อรอบที่คุณต้องการหมดแล้ว
            หน้านี้ไม่ได้ใส่ราคาของทั้งสองแห่ง — ทั้งคู่ตั้งราคาตามวัน จึงควรเปิดปฏิทิน แทนที่จะเชื่อตัวเลขหัวข่าว
            รวมถึงตัวเลขในหน้านี้ด้วย
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ซื้อที่ไหน</span>
          <h2 className={styles.sectionTitle}>เว็บไซต์ทางการ vs Klook vs GetYourGuide vs หน้างาน</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab สิทธิ์เข้าชมจึงเหมือนกันไม่ว่าคุณจะใช้เคาน์เตอร์ไหน
            สิ่งที่ต่างคือขั้นตอนชำระเงิน ความยืดหยุ่น และ — ถ้าปล่อยไว้ถึงวันนั้น — ราคา GetYourGuide ก็ขาย
            Borderless เช่นกัน และคอลัมน์ด้านล่างตั้งใจให้บาง ดูหมายเหตุใต้ตารางว่าข้อมูลใดยืนยันแล้วและข้อมูลใดยังไม่ได้ยืนยัน
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "เว็บไซต์ทางการ", "Klook", "GetYourGuide", "หน้างานวันนั้น"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.gyg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ส่วนต่างราคาหน้างานและจำนวนครั้งที่เปลี่ยนวันได้ อ้างตามเว็บไซต์ทางการของ teamLab เมื่อ {CHECKED}{" "}
            เงื่อนไขการยกเลิกและเปลี่ยนแปลงของตัวแทนต่างกันไปตามแพ็กเกจ — อ่านบนหน้าจองก่อนชำระเงิน
            คอลัมน์ GetYourGuide ตั้งใจให้สั้น: ยืนยันได้ว่าหน้าสินค้า Borderless ยังเปิดอยู่เมื่อ {GYG_CHECKED}{" "}
            แต่ราคา การรับบัตร และเงื่อนไขการเปลี่ยนยังไม่ได้ตรวจสอบในหน้านี้ โปรดดูบนหน้าสินค้า
            ช่องเหล่านั้นจึงระบุตามนั้นแทนการเดา
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>แบบไหนเหมาะกับคุณ</span>
          <h2 className={styles.sectionTitle}>ควรซื้อแบบไหน?</h2>
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

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>จองตั๋ว teamLab Borderless แบบระบุรอบเวลาอย่างไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            เลือกวันก่อน อ่านราคาของวันนั้น เลือกเวลาเข้าชมของ Entrance Pass (หรือ Flexible Pass ราคา ¥12,000
            ที่ไม่กำหนดเวลา) แล้วค่อยซื้อ — บนเว็บไซต์ทางการ หรือบน Klook ซึ่ง teamLab ระบุว่าเป็นช่องทางขายทางการอีกแห่ง
            สี่ขั้นตอน และขั้นแรกเป็นขั้นเดียวที่เปลี่ยนยอดที่คุณจ่าย
          </p>
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
            พร้อมล็อกรอบแล้ว?{" "}
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL}>
              ดูรอบว่างและราคาของ Borderless บน Klook →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ซื้อโดยตรง</span>
          <h2 className={styles.sectionTitle}>เว็บไซต์ขายตั๋วทางการของ teamLab Borderless อยู่ที่ไหน?</h2>
          <p className={styles.bodyText}>
            หน้าของพิพิธภัณฑ์เองคือ <strong>teamlab.art/e/tokyo</strong> — ภาษาอังกฤษ ส่วนฉบับภาษาญี่ปุ่นอยู่ที่
            teamlab.art/jp/e/tokyo — และปฏิทินตั๋วกับการชำระเงินเปิดจากที่นั่น ถ้าคุณบันทึกลิงก์เก่าไว้{" "}
            <strong>borderless.teamlab.art</strong> ไม่ใช่ร้านค้าแยกอีกต่อไป ทั้งที่อยู่ภาษาอังกฤษและภาษาญี่ปุ่น
            ตอนนี้พาไปที่หน้า teamlab.art ข้างต้น ซึ่งยืนยันแล้วเมื่อ {ADDRESS_CHECKED}
          </p>
          <ul className={styles.bodyList}>
            <li><strong>ทำไม &ldquo;ทางการ&rdquo; จึงสำคัญที่นี่:</strong> ราคาพื้นฐานอยู่บนปฏิทินของ teamLab เอง และสิทธิ์เปลี่ยนวันฟรีสามครั้งมีเฉพาะตั๋วที่ซื้อตรง ตัวแทนขายสิทธิ์เข้าชมเดียวกันภายใต้เงื่อนไขของตัวเอง</li>
            <li><strong>ใครอีกบ้างที่ถูกต้อง:</strong> Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab ตั๋ว Klook จึงเป็นสิทธิ์เข้าชมเดียวกันที่เคาน์เตอร์อื่น — ไม่ใช่ทางลัดและไม่ใช่การบวกราคาจากหน้าประตู</li>
            <li><strong>สิ่งที่การซื้อตรงไม่ได้ให้:</strong> ส่วนลด วันและรอบเป็นตัวกำหนดราคาผู้ใหญ่ และปฏิทินนั้นคือปฏิทินเดียวกันที่อยู่เบื้องหลังทุกช่องทางทางการ</li>
            <li><strong>สิ่งที่อาจทำให้คุณเสีย:</strong> บัตรถูกปฏิเสธ หน้าชำระเงินแบบญี่ปุ่นเป็นเหตุผลทั่วไปที่ผู้มาเยือนหันไปใช้ตัวแทน และการชำระเงินแบบสากลก็เป็นคำตอบที่สมเหตุสมผล ไม่ใช่ความผิดพลาด</li>
          </ul>
          <p className={styles.bodyText}>
            สรุปคือ ซื้อตรงถ้าบัตรของคุณใช้ได้และอยากได้ความยืดหยุ่นเรื่องวัน ซื้อผ่าน Klook ถ้าอยากชำระเงินในภาษาและ
            สกุลเงินของตัวเอง พร้อมเก็บตั๋วอิเล็กทรอนิกส์ไว้กับการจองอื่น
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกัน</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless vs Planets: ควรจองแห่งไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>จอง Borderless ถ้าอยากดูงานศิลปะ จอง Planets ถ้าอยากเดินเข้าไปในงานศิลปะ หรือถ้าพาเด็กไปด้วย</strong>{" "}
            โตเกียวมีพิพิธภัณฑ์ teamLab สองแห่ง และผู้มาเยือนจองผิดแห่งกันเป็นประจำ ทั้งสองเป็นสถานที่แยกกัน
            ตั๋วแยกกัน อยู่คนละย่านของเมือง และตัวเลขด้านล่างคือสิ่งที่ช่วยตัดสิน สำหรับฝั่ง Planets แบบเต็ม — กฎเท้าเปล่า
            ล็อกเกอร์ นโยบายเรื่องเด็ก — ดู{" "}
            <Link href="/th/guides/attractions/teamlab-planets-tickets">ไกด์ตั๋ว teamLab Planets</Link>
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Borderless", "teamLab Planets"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsPlanetsRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตัวเลขของ Borderless อ่านจากเว็บไซต์ทางการของ teamLab เมื่อ {CHECKED} ส่วนตัวเลขของ Planets
            อ่านจากร้านขายตั๋วทางการของ Planets เองเมื่อ {PLANETS_CHECKED} ทั้งสองพิพิธภัณฑ์ตั้งราคาผู้ใหญ่ตามวันและรอบ
            และปฏิทินของทั้งคู่เปลี่ยนได้ จึงควรยืนยันด้วยวันของคุณเอง เวลาที่ควรเผื่อของ Borderless มาจาก FAQ ทางการ
            ส่วนของ Planets เป็นตัวเลขสำหรับวางแผน ไม่ใช่ตัวเลขทางการ
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            ถ้ามีเวลาไปทั้งสองแห่ง ให้ไปคนละวัน ถ้าดูดิจิทัลอาร์ตสี่ชั่วโมงติดในบ่ายเดียว จะล้าจนไม่ได้ซึมซับอะไรเลย
            และสองแห่งนี้ห่างกัน 30 นาที อยู่คนละฝั่งของเมือง
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless อยู่ที่ไหน</h2>
          <p className={styles.bodyText}>
            พิพิธภัณฑ์อยู่ชั้น B1 ของ Azabudai Hills Garden Plaza B ในย่านโทราโนมง 5 โจเมะ เขตมินาโตะ
            ที่นี่ไม่ใช่ Borderless เดิมที่โอไดบะ — ที่นั่นปิดไปแล้ว — จึงควรข้ามเส้นทางที่พาคุณไปริมอ่าว
          </p>
          <ul className={styles.bodyList}>
            <li><strong>สถานีคามิยะโจ</strong> (สายฮิบิยะ โตเกียวเมโทร) — เดิน 2 นาทีจากทางออก 5</li>
            <li><strong>สถานีร็อปปงหงิอิตโจเมะ</strong> (สายนัมโบกุ โตเกียวเมโทร) — เดิน 6 นาทีจากทางออก 4</li>
            <li>ทั้งสองสถานีเชื่อมกับ Azabudai Hills ด้วยทางเดินใต้ดิน เดินตามป้ายได้ตลอดทางโดยไม่ต้องขึ้นไปที่ระดับถนน</li>
          </ul>
          <p className={styles.bodyText}>
            แตะเข้าออกด้วย{" "}
            <Link href="/guides/transport/ic-cards-japan">บัตร IC อย่าง Suica หรือ Pasmo (ภาษาอังกฤษ)</Link>{" "}
            แล้วทั้งสองสถานีก็ไม่ต้องวางแผนอะไร —{" "}
            <Link href="/guides/transport/tokyo-transportation">ไกด์การเดินทางในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            อธิบายสายรถไฟอย่างละเอียดกว่า
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "ตั๋ว teamLab Fukuoka 2026: ราคา เวลาเปิด และการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "ตั๋ว teamLab Kyoto: ราคา เวลาเปิด และการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "ตั๋ว teamLab Botanical Garden Osaka: ราคาและเวลาเปิด (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "ตั๋ว Tokyo Joypolis (2026): ราคาพาสปอร์ต เวลาเปิด และเกณฑ์ส่วนสูง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/teamlab-planets-tickets", title: "ตั๋ว teamLab Planets 2026 ราคา เวลา" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/guides/transport/tokyo-transportation", title: "เดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำอีกมากในญี่ปุ่น (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองรอบ Borderless ของคุณ</h2>
            <p className={styles.ctaBannerDesc}>
              การเข้าชมแบบระบุเวลาหมายความว่ารอบที่คุณอยากได้คือรอบที่หมดก่อน Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ
              teamLab ชำระเงินด้วยสกุลเงินของคุณเอง และรับตั๋วอิเล็กทรอนิกส์บนมือถือ
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋ว teamLab Borderless →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
