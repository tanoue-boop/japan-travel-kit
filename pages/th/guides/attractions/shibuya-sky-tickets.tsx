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
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiHakoneDayTour,
  shibuyaSkyDayTripPrep,
  shibuyaSkySameDayPrep,
  shibuyaSkyTicketUrl,
  tokyoSightseeingBusTour,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { gygShibuyaSky } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Thai edition of /guides/attractions/shibuya-sky-tickets. Mirrors the English page as of
// 2026-11-01 block by block — same sections, tables, FAQ, Klook and GetYourGuide CTAs —
// with every figure taken from the English page or lib/attraction-prices.ts; nothing added.

const ROUTE = "/th/guides/attractions/shibuya-sky-tickets";
const TITLE = "ตั๋ว Shibuya Sky 2026: ราคาและวิธีจอง";
const DESC =
  "ตั๋ว Shibuya Sky 2026: ออนไลน์ผู้ใหญ่ ¥2,700 ก่อน 15:00 และ ¥3,400 หลังจากนั้น";

const LOCALE = "th" as const;
const P = PRICES.shibuyaSky;
const CHECKED = dateLabel(P.checked, LOCALE);
const ADULT = priceLabel(P.adult, LOCALE);
const AT_DOOR = priceLabel(P.atDoor, LOCALE);

// The same Klook listing as the English CTA, on Klook's Thai locale path.
const SHIBUYA_SKY_URL = klookFor(shibuyaSkyTicketUrl, LOCALE);
const GYG_SLUG = "th-shibuya-sky-tickets";

/** What each ticket costs, by entry time and by where you buy it. */
const priceRows = [
  { ticket: "ผู้ใหญ่ เข้า 10:00–14:59", online: "¥2,700", counter: "¥3,000" },
  { ticket: "ผู้ใหญ่ เข้า 15:00–21:20", online: "¥3,400", counter: "¥3,700" },
  {
    ticket: "เด็กอายุ 6–12 ปี (รวมเด็ก 12 ปีที่ยังเรียนประถม)",
    online: "ไม่ขายออนไลน์",
    counter: "¥1,200",
  },
  { ticket: "เด็กก่อนวัยเรียน (ยังไม่เข้าประถม)", online: "ฟรี", counter: "ฟรี" },
];

/** Hours, last admission and closures — the part that decides which band you pay. */
const hoursRows = [
  { what: "เวลาเปิด", detail: "10:00–22:30" },
  { what: "เข้ารอบสุดท้าย", detail: "21:20" },
  { what: "ช่วงราคาถูกกว่า", detail: "เข้าระหว่าง 10:00 ถึง 14:59" },
  { what: "ช่วงราคาแพงกว่า", detail: "เข้าระหว่าง 15:00 ถึง 21:20 — รอบพระอาทิตย์ตกทุกรอบอยู่ในช่วงนี้" },
  {
    what: "วันปิด",
    detail: "วันขึ้นปีใหม่ (1 มกราคม) วันอื่นอาจปิดชั่วคราวหรือลดเวลาเปิดได้",
  },
];

/** The booking window, the counter and the cancellation terms. */
const bookingRows = [
  {
    q: "แต่ละวันเปิดขายเมื่อไร?",
    a: "เวลา 00:00 ตามเวลาญี่ปุ่น สองสัปดาห์ก่อนวันเข้าชม ประกาศวันที่ 27 กุมภาพันธ์ 2025 ย้ายเวลาเปิดขายมาที่จุดนี้โดยเฉพาะ เพื่อให้คาดเดาได้ว่าวันไหนจะเปิดเมื่อไร",
  },
  {
    q: "ยกเลิกได้ไหม?",
    a: "ประกาศฉบับเดียวกันเพิ่มการยกเลิกฟรีจนถึงวันเข้าชมสำหรับตั๋วเว็บ แต่ให้ยึดเงื่อนไขที่แสดงตอนชำระเงินของคุณเอง — แพลตฟอร์มตัวแทนกำหนดเงื่อนไขของตัวเอง และหน้าสินค้าของ Klook ระบุว่ายกเลิกฟรีได้ถึง 24 ชั่วโมงก่อน",
  },
  {
    q: "ซื้อตั๋วหน้างานได้ไหม?",
    a: "ได้ — เคาน์เตอร์ชั้น 14 ขาย ¥3,000 สำหรับเข้าก่อน 15:00 และ ¥3,700 ตั้งแต่ 15:00 สิ่งที่เคาน์เตอร์ทำไม่ได้คือจองรอบเวลาไว้ล่วงหน้า จึงเป็นแผนสำรอง ไม่ใช่แผนหลัก",
  },
  {
    q: "อะไรขายเฉพาะที่เคาน์เตอร์?",
    a: "ตั๋วเด็ก อายุ 6–12 ปีราคา ¥1,200 ขายที่เคาน์เตอร์ชั้น 14 ในวันเข้าชม ไม่ขายออนไลน์ ครอบครัวที่จองออนไลน์จึงซื้อตั๋วผู้ใหญ่ไว้ แล้วจ่ายค่าเด็กเมื่อไปถึง",
  },
];

const deckRows = [
  {
    deck: "Shibuya Sky",
    height: "ประมาณ 229 ม. (ดาดฟ้า)",
    highlight: "ดาดฟ้ากลางแจ้งเหนือห้าแยกชิบูยะพอดี — ภาพโตเกียวที่ทุกคนรู้จัก",
    price: `ออนไลน์ ${ADULT} (เคาน์เตอร์ ${AT_DOOR})`,
    area: "สถานีชิบูยะ",
  },
  {
    deck: "Tokyo Skytree",
    height: "จุดชมวิว 350 ม. และ 450 ม. (ตัวหอ 634 ม.)",
    highlight: "วิวสูงที่สุด มีโซนพื้นกระจก วันฟ้าใสเห็นภูเขาไฟฟูจิ",
    price: `${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)} (Floor 350)`,
    area: "โอชิอาเกะ ใกล้อาซากุสะ",
  },
  {
    deck: "Tokyo Tower",
    height: "จุดชมวิวประมาณ 150 ม. และ 250 ม. (ตัวหอ 332 ม.)",
    highlight: "แลนด์มาร์กย้อนยุคปี 1958 ขึ้นชั้นสูงกว่าด้วย Top Deck Tour",
    price: `${priceLabel(PRICES.tokyoTower.adult, LOCALE)} Main Deck`,
    area: "ชิบะโคเอ็น / อาคาบาเนะบาชิ",
  },
  {
    deck: "ศาลาว่าการกรุงโตเกียว (Tocho)",
    height: "ประมาณ 202 ม.",
    highlight: "เข้าฟรี ได้วิวพาโนรามาเมืองแบบคุ้มสุดโดยไม่ต้องมีตั๋ว",
    price: priceLabel(PRICES.tochoDeck.adult, LOCALE),
    area: "ชินจูกุ",
  },
];

const whoFor = [
  {
    title: "ไปรอบพระอาทิตย์ตก ถ้า…",
    desc: "คุณอยากได้ภาพเด็ดและวางแผนล่วงหน้าได้ พระอาทิตย์ตกอยู่ในช่วงราคา ¥3,400 ไม่ว่าจะไปเดือนไหน สิ่งที่ต้องแลกจึงไม่ใช่ราคาแต่เป็นที่ว่าง — และนี่คือรอบที่หมดก่อน ตั้งใจเข้าก่อนพระอาทิตย์ตก 30–60 นาที จะได้ทั้งตอนกลางวัน ช่วงแสงทอง และเมืองเปิดไฟในรอบเดียว",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="4.2" y1="10.2" x2="5.6" y2="11.6" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.4" y1="11.6" x2="19.8" y2="10.2" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "ไปก่อน 15:00 ถ้า…",
    desc: "ราคาสำคัญกว่าแสง เข้าระหว่าง 10:00 ถึง 14:59 ราคา ¥2,700 เทียบกับ ¥3,400 — ถูกกว่า ¥700 บนดาดฟ้าเดียวกัน — และรอบช่วงเช้าเป็นรอบที่จองกระชั้นชิดได้ง่ายที่สุด วันที่ฟ้าใสและอากาศแห้ง วิวกลางวันมองได้ไกลที่สุด รวมถึงภูเขาไฟฟูจิ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "ไปรอบดึก ถ้า…",
    desc: "คุณอยากเห็นเมืองแสงนีออน และรอบพระอาทิตย์ตกหมดแล้ว รอบดึกอยู่ในช่วงราคา ¥3,400 เดียวกับพระอาทิตย์ตก แต่มักเป็นรอบที่ขายหมดหลังสุด เข้ารอบสุดท้าย 21:20 และจุดชมวิวเปิดถึง 22:30 — ทางรอดที่ดีเมื่อวันของคุณเปิดขายไปตั้งแต่สองสัปดาห์ก่อนและช่วงแสงทองถูกจองไปแล้ว",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "นับย้อนสองสัปดาห์จากวันเข้าชม",
    desc: "แต่ละวันเปิดขายเวลา 00:00 ตามเวลาญี่ปุ่น ล่วงหน้าสองสัปดาห์พอดี ซึ่งตรงกับ 22:00 ของคืนก่อนหน้าตามเวลาประเทศไทย ใส่เวลานี้ลงปฏิทินก่อนทำอย่างอื่น — นี่คือสิ่งเดียวที่ตัดสินว่าคุณจะได้รอบพระอาทิตย์ตกหรือไม่",
  },
  {
    title: "เลือกช่วงราคาก่อนดูรอบเวลา",
    desc: "เข้าก่อน 15:00 ราคา ¥2,700 เข้าตั้งแต่ 15:00 ราคา ¥3,400 ทั้งพระอาทิตย์ตกและกลางคืนอยู่ในช่วงที่แพงกว่า จึงไม่มีพระอาทิตย์ตกราคาถูก — เลือกแสงที่อยากได้ก่อน แล้วค่อยเลือกเวลา",
  },
  {
    title: "จองออนไลน์ดีกว่าซื้อที่เคาน์เตอร์",
    desc: "ออนไลน์ถูกกว่าเคาน์เตอร์ชั้น 14 อยู่ ¥300 ทั้งสองช่วงราคา และเป็นทางเดียวที่จองรอบเวลาไว้ล่วงหน้าได้ ข้อยกเว้นคือตั๋วเด็ก อายุ 6–12 ปีขายที่เคาน์เตอร์ในวันเข้าชม",
  },
  {
    title: "ถ้าใช้บัตรที่ออกนอกญี่ปุ่น ให้จองผ่านแพลตฟอร์ม",
    desc: "ตั้งแต่กรกฎาคม 2024 เว็บไซต์ทางการของ Shibuya Sky ปฏิเสธบัตรที่ออกนอกญี่ปุ่นจำนวนมาก Klook รับบัตรต่างประเทศ และระบุว่ายกเลิกฟรีได้ถึง 24 ชั่วโมงก่อน — เป็นหลักประกันที่ดีเมื่ออากาศโตเกียวไม่แน่นอน",
  },
  {
    title: "รอบพระอาทิตย์ตก ไปถึงก่อนรอบ 30–60 นาที",
    desc: "เผื่อเวลาผ่านทางเข้า ฝากของในล็อกเกอร์ (ดาดฟ้าเป็นที่โล่งและลมแรง) และหาตำแหน่งยืนก่อนแสงจะเปลี่ยน",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว Shibuya Sky ปี 2026 ราคาเท่าไร?",
    a: `ตั๋วเว็บผู้ใหญ่ราคา ¥2,700 สำหรับเข้าระหว่าง 10:00 ถึง 14:59 และ ¥3,400 สำหรับเข้าระหว่าง 15:00 ถึง 21:20 ตั๋วเดียวกันที่เคาน์เตอร์ชั้น 14 ราคา ¥3,000 และ ¥3,700 จองออนไลน์จึงประหยัด ¥300 ทั้งสองแบบ เด็กอายุ 6–12 ปีราคา ¥1,200 ขายที่เคาน์เตอร์เท่านั้น และเด็กก่อนวัยเรียนเข้าฟรี ราคานี้ใช้กับการเข้าชมตั้งแต่ 1 เมษายน 2025 ตามการปรับตั๋วของ Shibuya Scramble Square เอง ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "Shibuya Sky เปิดกี่โมง และเข้ารอบสุดท้ายกี่โมง?",
    a: `Shibuya Sky เปิด 10:00 ถึง 22:30 เข้ารอบสุดท้าย 21:20 ตามข้อมูลบนเว็บไซต์ท่องเที่ยวทางการของรัฐบาลกรุงโตเกียว ตรวจสอบเมื่อ ${CHECKED} ปิดวันขึ้นปีใหม่ และวันอื่นอาจปิดชั่วคราวหรือลดเวลาเปิด เวลาเปิดมีผลทั้งต่อแผนและต่อราคา: ช่วงราคา ¥2,700 สิ้นสุดที่ 14:59 และตั้งแต่ 15:00 ถึงเส้นตาย 21:20 เป็น ¥3,400 ทั้งหมด`,
  },
  {
    q: "ต้องจอง Shibuya Sky ล่วงหน้าไหม?",
    a: "ถ้าจะไปรอบพระอาทิตย์ตก ต้อง — และนั่นคือทั้งหมดของการตัดสินใจ รอบกลางวันหรือรอบดึกส่วนใหญ่ไม่จำเป็น แต่การจองยังประหยัดคนละ ¥300 เมื่อเทียบกับเคาน์เตอร์ และตัดความเสี่ยงที่รอบที่อยากได้จะหมด เคาน์เตอร์ชั้น 14 ขายตั๋ววันนั้นได้ จึงไม่ใช่ว่าไม่จองแล้วจะขึ้นไม่ได้ สิ่งที่ทำไม่ได้ในวันนั้นคือเลือกว่าจะขึ้นตอนไหน",
  },
  {
    q: "ตั๋ว Shibuya Sky เปิดขายล่วงหน้ากี่วัน?",
    a: `สองสัปดาห์ แต่ละวันเปิดขายเวลา 00:00 ตามเวลาญี่ปุ่น ก่อนวันเข้าชม 14 วันพอดี ซึ่งผู้ให้บริการกำหนดไว้ในประกาศวันที่ 27 กุมภาพันธ์ 2025 เพื่อให้คาดเดาได้ ถ้าต้องการรอบพระอาทิตย์ตกในวันยอดนิยม ให้จองตอนที่เปิดขาย ไม่ใช่สายของวันนั้น ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "รอบไหนของ Shibuya Sky ขายหมดก่อน?",
    a: "รอบพระอาทิตย์ตก ทิ้งห่างรอบอื่นมาก — เป็นรอบเดียวที่ได้ทั้งกลางวัน ช่วงแสงทอง และวิวกลางคืนในการขึ้นครั้งเดียว และพระอาทิตย์ตกในโตเกียวขยับจากราว 16:30 ในเดือนธันวาคมไปจนเลย 19:00 ในเดือนมิถุนายน รอบที่คนแย่งกันจึงเปลี่ยนไปทุกเดือน รอบกลางวันสบายที่สุด รอบค่ำดึกคือทางเลือกสำรองที่นิยม: ช่วงราคา ¥3,400 เดียวกัน คู่แข่งน้อยกว่ามาก และได้เห็นเมืองเปิดไฟแทนเส้นขอบฟ้า",
  },
  {
    q: "ยกเลิกหรือเปลี่ยนตั๋ว Shibuya Sky ได้ไหม?",
    a: `ประกาศวันที่ 27 กุมภาพันธ์ 2025 ที่กำหนดราคาปัจจุบัน ยังเพิ่มการยกเลิกฟรีจนถึงวันเข้าชมสำหรับตั๋วเว็บที่ซื้อจากผู้ให้บริการด้วย แพลตฟอร์มตัวแทนกำหนดเงื่อนไขของตัวเอง — หน้าสินค้าของ Klook ระบุว่ายกเลิกฟรีได้ถึง 24 ชั่วโมงก่อนรอบ — จึงควรเช็กเงื่อนไขที่แสดงตอนชำระเงินของคุณ ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ใช้บัตรเครดิตต่างประเทศซื้อตั๋ว Shibuya Sky ได้ไหม?",
    a: "บนเว็บไซต์ทางการของ Shibuya Sky มักไม่ได้ — ตั้งแต่กรกฎาคม 2024 เว็บไซต์ปฏิเสธบัตรที่ออกนอกญี่ปุ่นจำนวนมาก ทางออกที่ไว้ใจได้คือแพลตฟอร์มตัวแทนอย่าง Klook ซึ่งรับบัตรต่างประเทศ ออกตั๋วอิเล็กทรอนิกส์ให้ และระบุว่ายกเลิกฟรีได้ถึง 24 ชั่วโมงก่อนรอบของคุณ",
  },
  {
    q: "Shibuya Sky สูงเท่าไร และเห็นอะไรบ้าง?",
    a: "Shibuya Sky เป็นจุดชมวิวบนดาดฟ้าสูงประมาณ 229 เมตรเหนือชิบูยะ มีทั้งโซนกลางแจ้งและในอาคาร จากด้านบนมองเห็นห้าแยกชิบูยะ เส้นขอบฟ้าโตเกียว และ — ในวันฟ้าใส — ภูเขาไฟฟูจิ ได้รอบ 360 องศา ไฮไลต์คือดาดฟ้ากลางแจ้ง จึงควรแต่งตัวกันลมและเช็กสภาพอากาศก่อนไป",
  },
  {
    q: "Shibuya Sky หรือ Skytree — ควรเลือกที่ไหน?",
    a: `Shibuya Sky คือประสบการณ์และภาพถ่าย: ดาดฟ้ากลางแจ้งสูงราว 229 ม. เหนือห้าแยกชิบูยะ ดีที่สุดตอนพระอาทิตย์ตก ราคา ¥2,700 ก่อน 15:00 หรือ ¥3,400 หลังจากนั้น Tokyo Skytree คือความสูงและระยะมอง: จุดชมวิวที่ 350 ม. และ 450 ม. โซนพื้นกระจก และวิวไกลสุดสายตา ${priceLabel(PRICES.tokyoSkytree.adult, LOCALE)} สำหรับ Floor 350 เลือก Shibuya Sky ถ้าอยากได้ภาพห้าแยกและบรรยากาศ เลือก Skytree ถ้าอยากได้พาโนรามาที่สูงและกว้างที่สุด`,
  },
  {
    q: "โตเกียวมีจุดชมวิวฟรีไหม?",
    a: "มี อาคารศาลาว่าการกรุงโตเกียว (Tocho) ที่ชินจูกุมีจุดชมวิวที่ความสูงประมาณ 202 เมตรซึ่งเข้าฟรี — วิวเมืองแบบไม่เสียเงินที่ดีที่สุดในโตเกียว และเป็นทางเลือกที่สมเหตุสมผลถ้าไม่อยากจ่าย ¥3,400 ตอนพระอาทิตย์ตก เวลาเปิดและจุดชมวิวที่เปิดให้เข้าอาจเปลี่ยน ควรเช็กก่อนไป",
  },
  {
    q: "นำกระเป๋าขึ้นดาดฟ้า Shibuya Sky ได้ไหม?",
    a: "ไม่ได้ กระเป๋า เป้ ร่ม และไม้เซลฟี่ห้ามนำขึ้นดาดฟ้า ต้องฝากล็อกเกอร์ชั้น 46 ก่อน ส่วนโทรศัพท์และกล้องขนาดพกนำขึ้นได้ ขาตั้งกล้องและโมโนพอดใช้ได้เฉพาะในอาคารชั้น 46 และเจ้าหน้าที่อาจขอให้หยุดใช้ช่วงคนแน่น จาก FAQ ตั๋วของผู้ดำเนินการตามดัชนีการค้นหา ตรวจสอบเมื่อ 6 พ.ย. 2026",
  },
  {
    q: "จาก Shibuya Sky เห็นภูเขาไฟฟูจิไหม?",
    a: "วันฟ้าใสเห็นได้ — แต่ Tokyo Skytree มีโอกาสดีกว่าเพราะสูงกว่า ทัศนวิสัยขึ้นอยู่กับสภาพอากาศ และมักดีที่สุดในเดือนที่อากาศเย็นและแห้ง และช่วงต้นของวัน นี่จึงเป็นเหตุผลให้เลือกช่วงกลางวันราคา ¥2,700 ถ้าฟูจิคือเป้าหมายของคุณ ไม่มีวันไหนรับประกันได้",
  },
];

// The English page's Klook blocks, item for item, on the Thai locale path.
const sameDayCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "ทัวร์อาหารยามค่ำชินจูกุ (โอโมอิเดะโยโกโจ・คาบุกิโจ・โกลเด้นไก)",
    ctaLabel: "ดูทัวร์ค่ำชินจูกุ →",
    why: "สำหรับช่วงค่ำหลังรอบพระอาทิตย์ตก ชินจูกุอยู่ไม่ไกลจากชิบูยะบนสาย Yamanote: ทัวร์เดินแบบจอยกรุ๊ป 3 ชั่วโมงผ่านโอโมอิเดะโยโกโจ คาบุกิโจ และโกลเด้นไก ปิดท้ายด้วยเครื่องดื่มที่อิซากายะในโกลเด้นไก",
  },
  {
    label: "ทัวร์รถบัสชมเมืองโตเกียว 1 วัน",
    ctaLabel: "ดูทัวร์โตเกียว 1 วัน →",
    why: "ถ้ารอบของคุณเป็นช่วงค่ำ กลางวันยังเที่ยวส่วนอื่นของโตเกียวได้: ทัวร์ 1 วันพร้อมไกด์ ผ่านสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมออดิโอไกด์หลายภาษา",
  },
  {
    label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    ctaLabel: "ดู Tokyo Subway Ticket →",
    why: "สถานีชิบูยะมีสาย Hanzomon, Ginza และ Fukutoshin ตั๋ว 24 / 48 / 72 ชั่วโมงจึงครอบคลุมการเดินทางไปกลับจุดชมวิว แต่ไม่รวมสาย JR อย่าง Yamanote",
  },
  {
    label: "eSIM ญี่ปุ่นจาก Klook",
    ctaLabel: "ดู eSIM ของ Klook →",
    why: "ตั๋วจาก Klook เป็นอีตั๋วบนมือถือ และรอบเข้าชมกำหนดเวลาไว้แล้ว มีอินเทอร์เน็ตตั้งแต่สนามบินทำให้เปิดวอชเชอร์ แผนที่ และเช็กสภาพอากาศได้ทันทีในวันนั้น",
  },
  {
    label: "รถรับส่งส่วนตัว สนามบินนาริตะ・ฮาเนดะ ⇄ โตเกียว",
    ctaLabel: "ดูรถรับส่งสนามบิน →",
    why: "จองถึงที่อยู่โรงแรมแทนสถานี ได้ทั้งนาริตะและฮาเนดะ และคนขับติดตามเที่ยวบินของคุณ — เหมาะเมื่อคุณถึงญี่ปุ่นวันเดียวกับรอบช่วงค่ำ",
  },
];
const sameDayPrep: KlookTripPrepItem[] = shibuyaSkySameDayPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, sameDayCopy[i]),
);

const dayTripCopy: Pick<KlookTripPrepItem, "label" | "ctaLabel" | "why">[] = [
  {
    label: "โรงแรมย่านชิบูยะ",
    ctaLabel: "ดูโรงแรมชิบูยะบน Klook →",
    why: "รอบพระอาทิตย์ตกจบหลังฟ้ามืด ตอนที่สาย Yamanote แน่นที่สุด พักที่ชิบูยะทำให้ทางกลับที่พักเป็นแค่การเดิน และอยู่ใกล้สถานีที่รถบัสทางด่วนออกในตอนเช้า",
  },
  {
    label: "ทัวร์บาร์ฮอปปิงชิบูยะ (3 ชั่วโมง)",
    ctaLabel: "ดูทัวร์บาร์ชิบูยะ →",
    why: "สิ่งที่เข้าท่าที่สุดสำหรับชั่วโมงหลังรอบพระอาทิตย์ตก และเป็นมุมหนึ่งของชิบูยะที่ดาดฟ้าไม่ได้ให้เห็น — สองบาร์กับไกด์ที่สั่งให้คุณ",
  },
  {
    label: "ทัวร์บาร์ฮอปปิงยามค่ำโตเกียว (ชินจูกุ / ชิบูยะ)",
    ctaLabel: "ดูทัวร์ยามค่ำ →",
    why: "เวอร์ชันที่ข้ามไปชินจูกุด้วย เหมาะกับรอบดึก: จุดชมวิวจองง่ายที่สุดตอนดึก และหลังจากนั้นค่ำคืนก็ยังมีที่ให้ไปต่อ",
  },
  {
    label: "ทัวร์เดินชมอาหารและวัฒนธรรมชิบูยะครึ่งวัน",
    ctaLabel: "ดูทัวร์เดินชิมอาหาร →",
    why: "คำตอบช่วงกลางวันสำหรับทุกวัย ถ้ารอบของคุณเป็นกลางวันหรือในกลุ่มมีคนอายุต่ำกว่า 20 ปี — เดินครึ่งวันรอบ Shibuya 109, Nonbei Yokocho และ Miyashita Park แทนการตระเวนบาร์",
  },
  {
    label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    ctaLabel: "ดู Tokyo Subway Ticket →",
    why: "สถานีชิบูยะมีสาย Hanzomon, Ginza และ Fukutoshin ตั๋ว 24, 48 หรือ 72 ชั่วโมงจึงครอบคลุมการเดินทางตลอดวันรอบ ๆ รอบของคุณ — และบัตรคอนแทกต์เลสต่างประเทศเปิดประตูตรวจตั๋วของสายเหล่านี้ไม่ได้",
  },
];
const dayTripPrep: KlookTripPrepItem[] = shibuyaSkyDayTripPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, dayTripCopy[i]),
);

const tours = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "ทัวร์รถบัสชมเมืองโตเกียว 1 วัน",
    desc: "ทัวร์พร้อมไกด์ผ่านสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมออดิโอไกด์หลายภาษา",
  }),
  withKlookLocale(fujiHakoneDayTour, LOCALE, {
    title: "ทัวร์ 1 วัน ภูเขาไฟฟูจิ＋ฮาโกเน่",
    desc: "ชั้น 5 ภูเขาไฟฟูจิคู่กับเขตภูเขาไฟฮาโกเน่และทะเลสาบอาชิ เป็นทริปไปกลับจากโตเกียวในวันเดียว",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว Shibuya Sky" }];

const linkStyle = { color: "var(--text)", fontWeight: 600 };
const redLinkStyle = { color: "var(--red)", fontWeight: 600 };

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

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

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            ตั๋ว Shibuya Sky 2026:<br />ราคา เวลาเปิด และรอบพระอาทิตย์ตก
          </h1>
          <p className={styles.heroSubtitle}>
            วิวดาดฟ้าที่ดีที่สุดของโตเกียว — สูง 229 เมตรเหนือห้าแยกชิบูยะ ราคาสองช่วงเวลา เปิดจองล่วงหน้าสองสัปดาห์
            และมีอยู่รอบเดียวที่ขายหมดจริง ๆ
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ ตรวจสอบแล้ว", "เวลาเปิดจองรอบพระอาทิตย์ตก", "เทียบกับ Skytree และ Tokyo Tower"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>ตั๋ว Shibuya Sky</strong> คิดราคาตามเวลาที่คุณขึ้น: ตั๋วเว็บผู้ใหญ่ราคา <strong>¥2,700</strong>{" "}
            สำหรับเข้าระหว่าง 10:00 ถึง 14:59 และ <strong>¥3,400</strong> สำหรับเข้าระหว่าง 15:00 ถึง 21:20 ส่วนตั๋ว
            สองแบบเดียวกันที่เคาน์เตอร์ชั้น 14 ราคา ¥3,000 และ ¥3,700 — จองออนไลน์จึงประหยัด ¥300 ไม่ว่าเลือกช่วงไหน
            และเด็กอายุ 6–12 ปีราคา ¥1,200 ขายที่เคาน์เตอร์เท่านั้น ซื้อได้จากเว็บไซต์ของผู้ให้บริการเองหรือแพลตฟอร์ม
            ตัวแทนอย่าง Klook และควรซื้อเร็ว: แต่ละวันเปิดขาย<strong>เวลา 00:00 ตามเวลาญี่ปุ่น ล่วงหน้าสองสัปดาห์พอดี</strong>{" "}
            และรอบที่หมดคือรอบพระอาทิตย์ตก เส้นตายที่แท้จริงจึงเป็นตอนที่วันของคุณเปิดขาย ไม่ใช่สัปดาห์ที่เดินทาง
            จุดชมวิวเปิด 10:00–22:30 เข้ารอบสุดท้าย 21:20 ตัวเลขทั้งหมดตรวจสอบเมื่อ {CHECKED} — ราคาจากประกาศปรับ
            ตั๋วของ Shibuya Scramble Square วันที่ 27 กุมภาพันธ์ 2025 เวลาเปิดจากเว็บไซต์ท่องเที่ยวของรัฐบาลกรุงโตเกียว
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ราคา (ออนไลน์)</p>
                <p className={styles.verdictStatValue}>ผู้ใหญ่ ¥2,700 / ¥3,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาเปิด</p>
                <p className={styles.verdictStatValue}>10:00–22:30 เข้ารอบสุดท้าย 21:20</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เปิดขาย</p>
                <p className={styles.verdictStatValue}>00:00 เวลาญี่ปุ่น ล่วงหน้า 2 สัปดาห์</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>หมดก่อน</p>
                <p className={styles.verdictStatValue}>รอบพระอาทิตย์ตก</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> จองออนไลน์ (ถูกกว่าเคาน์เตอร์ ¥300 ทั้งสองช่วง) และถ้าอยากได้พระอาทิตย์ตก
              ให้จองทันทีที่วันของคุณเปิดขายล่วงหน้าสองสัปดาห์ ถ้าบัตรของคุณออกนอกญี่ปุ่น ให้จองผ่าน Klook
              ซึ่งรับบัตรต่างประเทศและระบุว่ายกเลิกฟรีได้ถึง 24 ชั่วโมงก่อน
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว Shibuya Sky →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋ว Shibuya Sky ปี 2026 ราคาเท่าไร?</h2>
          <p className={styles.bodyText}>
            ผู้ใหญ่ที่เข้าก่อน 15:00 ราคา ¥2,700 ตั้งแต่ 15:00 ราคา ¥3,400 — และแพงขึ้นอีก ¥300 ทั้งสองแบบถ้าซื้อที่
            เคาน์เตอร์แทนออนไลน์ โครงสร้างสองช่วงราคานี้คือสิ่งที่คู่มือส่วนใหญ่ยังเขียนผิด: Shibuya Sky ไม่มีราคา
            เดียวอีกแล้วตั้งแต่ 1 เมษายน 2025 ที่ Shibuya Scramble Square แบ่งค่าเข้าตามเวลาเข้า
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ตั๋ว", "เว็บ (ล่วงหน้า)", "เคาน์เตอร์ชั้น 14"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.online}</td>
                      <td className={styles.tdPrice}>{row.counter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ราคาตรวจสอบเมื่อ {CHECKED} และใช้กับการเข้าชมตั้งแต่ 1 เมษายน 2025 ตามประกาศของ Shibuya Scramble Square
            เอง &ldquo;SHIBUYA SKY 入場チケットの改定について&rdquo; (เรื่องการปรับตั๋วเข้าชม SHIBUYA SKY) วันที่ 27
            กุมภาพันธ์ 2025 ราคาเด็กและกฎขายเฉพาะเคาน์เตอร์มาจากหน้าตั๋วของผู้ให้บริการ โปรดตรวจสอบอีกครั้งตอนจอง —
            ตัวเลขเหล่านี้รวมอยู่กับสถานที่อื่นทุกแห่งที่คู่มือนี้ครอบคลุมใน{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
            {" "}ซึ่งระบุวันที่ตรวจสอบของแต่ละรายการ
          </p>
        </section>

        {/* Klook, directly under the price table */}
        <KlookTripPrep
          label="จองไว้สำหรับวันเดียวกัน"
          heading="สิ่งที่ควรจองคู่กับตั๋ว Shibuya Sky"
          intro="รอบ Shibuya Sky ใช้เวลาราวหนึ่งชั่วโมงของวัน ห้าอย่างนี้คือสิ่งที่วันเดียวกันนั้นมักต้องใช้ด้วย — ช่วงค่ำหลังขึ้นจุดชมวิว ช่วงกลางวันก่อนหน้า การเดินทางระหว่างนั้น อินเทอร์เน็ตบนมือถือ และการเดินทางจากสนามบินเข้าเมือง"
          items={sameDayPrep}
        />

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวลาเปิด</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky เปิดกี่โมง และเข้ารอบสุดท้ายกี่โมง?</h2>
          <p className={styles.bodyText}>
            10:00 ถึง 22:30 เข้ารอบสุดท้าย 21:20 เวลาเปิดก็คือราคาด้วย: 14:59 คือเวลาเข้าสุดท้ายของช่วง ¥2,700
            และตั้งแต่ 15:00 จนถึงเส้นตายเป็น ¥3,400 ทั้งหมด — คำถามว่า &ldquo;จะไปกี่โมงดี?&rdquo; จึงเป็นเรื่องเงิน
            ¥700 ก่อนจะเป็นเรื่องแสง
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `Shibuya Sky (ตรวจสอบ ${CHECKED})`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            เวลาเปิด เวลาเข้ารอบสุดท้าย และการปิดวันขึ้นปีใหม่ มาจากข้อมูล SHIBUYA SKY ของรัฐบาลกรุงโตเกียวบน
            gotokyo.org ซึ่งเขียนตรงกันทั้งภาษาอังกฤษและภาษาญี่ปุ่น ตรวจสอบเมื่อ {CHECKED} ดาดฟ้าเป็นพื้นที่กลางแจ้ง
            จึงอาจปิดในวันนั้นเมื่อลมแรง ฟ้าผ่า หรือฝนตกหนัก ขณะที่ชั้นในอาคารยังเปิดอยู่
          </p>
        </section>

        {/* Q3 — booking window, then the CTA stack */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ช่วงเวลาจอง</span>
          <h2 className={styles.sectionTitle}>ต้องจอง Shibuya Sky ล่วงหน้าไหม?</h2>
          <p className={styles.bodyText}>
            ถ้าจะไปรอบพระอาทิตย์ตก ต้อง — และเส้นตายมาเร็วกว่าที่คิด แต่ละวันเปิดขาย
            <strong> เวลา 00:00 ตามเวลาญี่ปุ่น ก่อนวันนั้นสองสัปดาห์พอดี</strong> ซึ่งตรงกับ 22:00 ของคืนก่อนหน้าตาม
            เวลาประเทศไทย รอบพระอาทิตย์ตกในวันยอดนิยมคือรอบที่หมด กฎในทางปฏิบัติจึงเป็น: อยู่หน้าจอชำระเงินตอนที่
            วันของคุณเปิดขาย ไม่ใช่สัปดาห์ที่เดินทาง รอบกลางวันหรือรอบดึกมีเวลาเหลือเยอะกว่ามาก — แต่ออนไลน์ก็ยัง
            ประหยัดคนละ ¥300
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["คำถาม", `สิ่งที่ผู้ให้บริการประกาศ (ตรวจสอบ ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            มีผู้ขายสองราย เพราะรอบที่หมดในที่หนึ่งไม่จำเป็นต้องหมดในอีกที่ — และเพราะเว็บไซต์ทางการปฏิเสธบัตรที่
            ออกนอกญี่ปุ่นจำนวนมากมาตั้งแต่กรกฎาคม 2024:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูตั๋ว Shibuya Sky บน Klook →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
          </div>
        </section>

        {/* Q4 — which slot */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>รอบเวลา</span>
          <h2 className={styles.sectionTitle}>ควรจองรอบเวลาไหนของ Shibuya Sky?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            พระอาทิตย์ตกถ้าจองได้ ก่อน 15:00 ถ้าราคาเป็นตัวตัดสิน และค่ำดึกถ้ารอบพระอาทิตย์ตกหมดแล้ว พระอาทิตย์ตก
            ในโตเกียวขยับจากราว 16:30 ในเดือนธันวาคมไปจนเลย 19:00 ในเดือนมิถุนายน รอบที่คนแย่งกันจึงไม่ใช่รอบเดิม
            ตลอดปี — แต่อยู่ในช่วงราคา ¥3,400 เสมอ
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            หนึ่งชั่วโมงบนดาดฟ้าเป็นแค่ช่วงหนึ่งของค่ำคืน รอบเวลาจึงมักถูกเลือกให้เข้ากับแผนทั้งวัน ของเราอยู่ใน{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={redLinkStyle}>
              แผนเที่ยวโตเกียว 3 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            และอยู่ในรายการแนะนำของ{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={redLinkStyle}>
              เที่ยวอะไรดีในโตเกียว (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        {/* Klook: the evening the slot sits inside */}
        <KlookTripPrep
          label="ส่วนที่เหลือของวัน"
          heading="วันไป Shibuya Sky ควรจองอะไรอีก?"
          intro="ตัวจุดชมวิวใช้เวลาราวหนึ่งชั่วโมง ไม่ว่าคุณเลือกรอบไหนข้างบน วันหรือค่ำคืนส่วนใหญ่รอบ ๆ ก็ยังว่าง นี่คือการจองที่ต่อเนื่องจากรอบนั้น — ที่พักในย่านเดียวกัน ที่ไปต่อหลังจากนั้น และพาสที่ครอบคลุมการเดินทางระหว่างกัน"
          items={dayTripPrep}
        />

        {/* Q5 — vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เปรียบเทียบ</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky vs Skytree vs Tokyo Tower — เลือกจุดชมวิวไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shibuya Sky ชนะเรื่องภาพห้าแยกชิบูยะ แต่ไม่ใช่จุดชมวิวที่สูงที่สุดหรือถูกที่สุดในโตเกียว — และตั้งแต่การปรับ
            ราคาเดือนเมษายน 2025 การเข้าตอน 15:00 แพงกว่า Top Deck Tour ของ Tokyo Tower เสียอีก Skytree เหมาะกับ
            ความสูงล้วน ๆ และวิวภูเขาไฟฟูจิ Tokyo Tower เหมาะกับแลนด์มาร์กย้อนยุค และ Tocho ที่ชินจูกุถ้าอยากได้วิว
            พาโนรามาแบบไม่เสียเงิน
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["จุดชมวิว", "ความสูง", "จุดเด่น", "ราคาผู้ใหญ่", "ย่าน / สถานีใกล้สุด"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ความสูงเป็นค่าประมาณ ราคาทุกรายการเป็นราคาทางการของผู้ให้บริการ นำมาจาก{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              ตารางราคาตั๋วของเรา (ภาษาอังกฤษ)
            </Link>{" "}
            ซึ่งมีวันที่ตรวจสอบของแต่ละแถว ทั้งสี่แห่งถูกเปรียบเทียบแบบละเอียดทีละรอบเวลาใน{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>
              คู่มือจุดชมวิวโตเกียว (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>กฎบนดาดฟ้า</span>
          <h2 className={styles.sectionTitle}>นำอะไรขึ้นดาดฟ้า Shibuya Sky ได้บ้าง?</h2>
          <ul className={styles.bodyList}>
            <li><strong>ห้ามนำขึ้นดาดฟ้า:</strong> กระเป๋า เป้ ร่ม และไม้เซลฟี่ ต้องฝากไว้ในล็อกเกอร์ชั้น 46 ก่อนขึ้น</li>
            <li><strong>นำขึ้นได้:</strong> โทรศัพท์และกล้องขนาดพกในกระเป๋า</li>
            <li><strong>ขาตั้งกล้องและโมโนพอด:</strong> ใช้ได้เฉพาะในอาคารชั้น 46 และเจ้าหน้าที่อาจขอให้หยุดใช้ช่วงคนแน่น ห้ามใช้บนดาดฟ้าและชั้นอื่น</li>
            <li><strong>สภาพอากาศไม่ดี:</strong> ดาดฟ้าอาจปิดโดยไม่แจ้งล่วงหน้าเมื่ออากาศแย่ลง ส่วนชั้นในอาคารยังเปิด ตรวจสอบเงื่อนไขของตั๋วก่อนจอง</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            จาก FAQ ตั๋วของผู้ดำเนินการตามดัชนีการค้นหา ตรวจสอบเมื่อ 6 พ.ย. 2026 กฎอาจเปลี่ยนได้ จึงควรตรวจสอบกฎอีกครั้งในวันเข้าชม
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>จอง Shibuya Sky อย่างไร?</h2>
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
        </section>

        <FaqList items={faqItems} />

        {/* Klook tours in the same city */}
        <KlookTourPicks
          heading="ทัวร์ 1 วันจากเมืองเดียวกัน"
          intro="รอบ Shibuya Sky ใช้เวลาหนึ่งชั่วโมงของค่ำคืน ส่วนที่เหลือของวันยังว่าง ถ้ายังมีวันในโตเกียวที่ไม่ได้วางแผน ทั้งสองทัวร์นี้จองได้ด้วยบัญชี Klook เดียวกับตั๋วของคุณ"
          tours={tours}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-observation-decks", title: "จุดชมวิวโตเกียว (2026): Shibuya Sky vs Skytree vs Tokyo Tower (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "แผนเที่ยวโตเกียว 3 วัน (2026): จองอะไร และตามลำดับไหน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "ตั๋ว Tokyo Tower (2026): ราคา Main Deck vs Top Deck และวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/tokyo-skytree-tickets", title: "ตั๋ว Tokyo Skytree (2026): ราคา และเลือกชั้น 350 หรือ 450" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 หรือ 72 ชั่วโมง คุ้มไหม? (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/teamlab-planets-tickets", title: "ตั๋ว teamLab Planets 2026 ราคา เวลา" },
            { href: "/th/guides/attractions/teamlab-borderless-tickets", title: "ตั๋ว teamLab Borderless (2026): ราคา รอบเวลา และช่องทางซื้อ" },
            { href: "/guides/transport/tokyo-transportation", title: "เดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "เที่ยวญี่ปุ่นที่อื่นอีก (ภาษาอังกฤษ) →" },
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "ซูโม่ในโตเกียว (2026): ตั๋วการแข่งขัน vs ชมซ้อมตอนเช้า (ภาษาอังกฤษ)" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>ไปดูพระอาทิตย์ตกที่ชิบูยะ</h2>
            <p className={styles.ctaBannerDesc}>
              ออนไลน์ถูกกว่าเคาน์เตอร์ ¥300 ทั้งสองช่วงราคา และแต่ละวันเปิดขายล่วงหน้าสองสัปดาห์ตอนเที่ยงคืนเวลาญี่ปุ่น
              Klook รับบัตรต่างประเทศและระบุว่ายกเลิกฟรีได้ถึง 24 ชั่วโมงก่อน — สะดวกถ้าอากาศโตเกียวเปลี่ยน
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋ว Shibuya Sky →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygShibuyaSky} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
