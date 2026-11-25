import type { ReactNode } from "react";
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import {
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaNaniWonderNightBusTour,
  osakaPrivateWalkingTour,
  umedaSkyBuildingTicket,
  umedaSkySameDayPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/umeda-sky-building-tickets) section by section
// as of 2026-11-25 (task-jtk-20261125-TR01): same sections, tables, FAQ and Klook CTAs in the
// same places. Every figure, date and source is the English page's; nothing is added.
// Title term: ตั๋ว Umeda Sky Building — Thai guides (trvlogue th, Booking.com th) keep the
// building's English name rather than a Thai transliteration. The pass is Osaka Amazing Pass,
// as on the Thai Dotonbori page.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/umeda-sky-building-tickets";
const TITLE = "ตั๋ว Umeda Sky Building 2026: ราคา";
const H1 = "ตั๋ว Umeda Sky Building 2026: ราคา เวลาเปิด และเวลาพระอาทิตย์ตก";
const DESC =
  "Umeda Sky Building ผู้ใหญ่ ¥2,000 เด็ก ¥500 เปิด 9:30–22:30 Amazing Pass ฟรีก่อน 15:00";

const LAST_CHECKED_ISO = "2026-11-19";
const LAST_CHECKED = dateLabel(LAST_CHECKED_ISO, LOCALE);
const CHECKED_ISO = "2026-11-03";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const OFFICIAL_URL = "https://www.skybldg.co.jp/en/observatory/";
const HARUKAS_URL = "https://www.abenoharukas-300.jp/observatory/ticket/";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s2811.html";
// The pass price is owned by lib/attraction-prices.ts, shared with the English page.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, LOCALE);

const TICKET_URL = klookFor(umedaSkyBuildingTicket.url, LOCALE);
const PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const NIGHT_BUS_URL = klookFor(osakaNaniWonderNightBusTour.url, LOCALE);
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    tier: "ผู้ใหญ่",
    price: "¥2,000",
    what: "ราคาที่เคาน์เตอร์ขายตั๋วชั้น 39 จ่ายเป็นเงินสดหรือบัตรเครดิตได้ เว็บไซต์ภาษาญี่ปุ่นของผู้ให้บริการยังขายตั๋วออนไลน์แบบระบุวันที่ซึ่งถูกกว่าผ่าน asoview แต่ไม่ได้แสดงราคา",
  },
  { tier: "เด็กอายุ 4–12 ปี", price: "¥500", what: "หนึ่งในสี่ของราคาผู้ใหญ่ ถือว่าถูกเป็นพิเศษเมื่อเทียบกับจุดชมวิวอื่นในโอซาก้า" },
  { tier: "อายุต่ำกว่า 4 ปี", price: "ฟรี", what: "ไม่ต้องใช้ตั๋ว" },
  { tier: "ผู้ถือบัตรผู้พิการ", price: "¥1,000 / ¥250", what: "ผู้ใหญ่ / อายุ 4–12 ปี ซื้อที่เคาน์เตอร์ขายตั๋วของจุดชมวิวโดยแสดงบัตร" },
  { tier: "กลุ่ม 10 คนขึ้นไป", price: "¥1,800 / ¥450", what: "ผู้ใหญ่ / อายุ 4–12 ปี ติดต่อที่เคาน์เตอร์ชั้น 39" },
  {
    tier: "ผู้ถือ Osaka Amazing Pass เข้าก่อน 15:00 น.",
    price: "ฟรี",
    what: "รวมการเข้าชมหนึ่งครั้งในพาส ช่วงเวลานี้คือสิ่งที่ตัดสินว่าพาสคุ้มค่าหรือไม่",
  },
  {
    tier: "ผู้ถือ Osaka Amazing Pass เข้าตั้งแต่ 15:00 น.",
    price: "ลด 10%",
    what: "ผู้ใหญ่ประมาณ ¥1,800 พาสใช้เข้าชมฟรีช่วงพระอาทิตย์ตกหรือกลางคืนไม่ได้",
  },
];

const floorRows = [
  { floor: "RF (ดาดฟ้า)", what: "ชั้นชมวิวกลางแจ้ง 360 องศา เว็บไซต์ภาษาญี่ปุ่นระบุ Lumi Sky Walk ไว้ที่ชั้นนี้ด้วย", ticket: "ต้องใช้ — อาจปิดเมื่อฝนตกหนัก" },
  { floor: "40F", what: "ชั้นในร่ม มีคาเฟ่ SKY 40 และที่นั่งเคาน์เตอร์ริมหน้าต่าง", ticket: "ต้องใช้" },
  { floor: "39F", what: "เคาน์เตอร์ขายตั๋ว ร้านของที่ระลึก ร้านอาหารจีน Sangu และ Sky Lounge Stardust", ticket: "ชั้นเคาน์เตอร์ขายตั๋วและร้านค้า" },
  { floor: "35F–39F", what: "ทางขึ้นสู่จุดชมวิวที่ผ่านช่องว่างระหว่างตึกสองหลัง", ticket: "ขึ้นทางเข้าเฉพาะของจุดชมวิว ไม่ใช่ลิฟต์สำนักงาน" },
  { floor: "B1F–1F", what: "ทาคิมิ โคจิ (Takimi Koji) ถนนร้านอาหารและร้านค้าบรรยากาศยุคโชวะ มีตู้ ATM และที่ทำการไปรษณีย์", ticket: "ไม่ต้องใช้" },
];

const hoursRows = [
  { what: "เวลาเปิดจุดชมวิว", when: "9:30 – 22:30 น." },
  { what: "เข้าครั้งสุดท้าย", when: "22:00 น." },
  { what: "วันหยุด", when: "เว็บไซต์ผู้ให้บริการไม่ได้ระบุวันหยุดประจำ วันเปิดพิเศษ เช่น เทศกาลดอกไม้ไฟโยโดกาวะ ใช้ตั๋วพิเศษและเวลาเปิดพิเศษ" },
  { what: "สภาพอากาศไม่ดี", when: "ดาดฟ้ากลางแจ้งอาจปิดเมื่อฝนตกหนัก ส่วนชั้น 39 และ 40 อยู่ในร่ม" },
  { what: "เข้าฟรีด้วย Osaka Amazing Pass", when: "เฉพาะ 9:30 – 15:00 น. ตั้งแต่ 15:00 ถึง 22:00 น. ลด 10%" },
  { what: "ระยะเวลาที่ควรเผื่อ", when: "1 – 2 ชั่วโมง (ตามที่หน้าสินค้าของ Klook ประมาณไว้)" },
];

const sunsetRows = [
  { date: "พฤศจิกายน – กุมภาพันธ์", sunset: "16:47 – 17:53 น.", note: "ช่วงหน้าหนาว เข้าระหว่างประมาณ 16:00 ถึง 17:15 น. ตามวันที่ในตารางด้านล่าง" },
  { date: "1 พฤศจิกายน", sunset: "17:05 น.", note: "เข้าภายในประมาณ 16:30 น." },
  { date: "15 พฤศจิกายน", sunset: "16:54 น.", note: "เข้าภายในประมาณ 16:15 น." },
  { date: "30 พฤศจิกายน", sunset: "16:47 น.", note: "วันที่พระอาทิตย์ตกเร็วที่สุดของปีอยู่ช่วงปลายพฤศจิกายนถึงต้นธันวาคม" },
  { date: "1 ธันวาคม", sunset: "16:47 น.", note: "ช่วงแสงสีทองเริ่มตั้งแต่บ่าย อยู่ในช่วงเข้าฟรีก่อน 15:00 น. ของ Amazing Pass" },
  { date: "15 ธันวาคม", sunset: "16:49 น.", note: "เข้าภายในประมาณ 16:10 น." },
  { date: "31 ธันวาคม", sunset: "16:57 น.", note: "มืดราว 17:30 น. และยังเหลือเวลาชมวิวกลางคืนอีก 5 ชั่วโมงก่อนปิด" },
  { date: "1 มกราคม", sunset: "16:58 น.", note: "เข้าภายในประมาณ 16:15 น. (ตารางปี 2026)" },
  { date: "15 มกราคม", sunset: "17:10 น.", note: "เข้าภายในประมาณ 16:30 น. (ตารางปี 2026)" },
  { date: "1 กุมภาพันธ์", sunset: "17:27 น.", note: "เข้าภายในประมาณ 16:45 น. (ตารางปี 2026)" },
  { date: "15 กุมภาพันธ์", sunset: "17:41 น.", note: "เข้าภายในประมาณ 17:00 น. (ตารางปี 2026)" },
  { date: "28 กุมภาพันธ์", sunset: "17:53 น.", note: "เข้าภายในประมาณ 17:10 น. (ตารางปี 2026)" },
  { date: "31 มีนาคม", sunset: "18:18 น.", note: "ฤดูซากุระ สองสัปดาห์ที่คนมากที่สุดของปีในโอซาก้า" },
  { date: "1 กรกฎาคม", sunset: "19:15 น.", note: "พระอาทิตย์ตกช้าที่สุดของปี เข้าภายใน 18:30 น." },
  { date: "1 กันยายน", sunset: "18:25 น.", note: "ดาดฟ้าอากาศอุ่นและช่วงโพล้เพล้ยาว วางแผนดูพระอาทิตย์ตกได้ง่ายที่สุด" },
  { date: "30 กันยายน", sunset: "17:44 น.", note: "พระอาทิตย์ตกก่อน 18:00 น. แล้ว และเร็วขึ้นอย่างรวดเร็ว" },
];

const choiceRows = [
  {
    situation: "ไปตอนกลางวัน และวันเดียวกันจะเข้าสถานที่ที่ต้องเสียเงินอย่างน้อยอีกสองแห่ง",
    pick: "Osaka Amazing Pass และเข้าจุดชมวิวก่อน 15:00 น.",
    why: "จุดชมวิว (¥2,000) ปราสาทโอซาก้า (¥1,200) และชิงช้าสวรรค์ HEP FIVE (¥1,000) รวมกันแล้วเกินราคาพาส หลัง 15:00 น. พาสใช้ที่นี่ได้แค่ส่วนลด 10%",
  },
  {
    situation: "ไปดูพระอาทิตย์ตกหรือวิวกลางคืน และวันนั้นไม่มีสถานที่อื่นที่ต้องเสียเงิน",
    pick: "ตั๋วจุดชมวิวใบเดียว ซื้อที่เคาน์เตอร์หรือออนไลน์",
    why: "ไม่มีรอบเวลาและตั๋วไม่ขายหมด การจองออนไลน์จึงได้หน้าชำระเงินภาษาไทยและจ่ายด้วยบัตรต่างประเทศได้ ไม่ใช่การรับประกันรอบเข้าชม",
  },
  {
    situation: "วันแรกในโอซาก้า อยากไปปราสาท จุดชมวิว และโดทงโบริ โดยไม่ต้องวางเส้นทางเอง",
    pick: "ทัวร์ 1 วันพร้อมไกด์ที่รวมอุเมดะ",
    why: "จุดนัดพบเดียวและจองครั้งเดียว ก่อนจ่ายเงินให้ตรวจสอบจุดแวะและเงื่อนไขการยกเลิกในหน้าสินค้า",
  },
];

const deckRows = [
  {
    deck: "Umeda Sky Building (Kuchu Teien)",
    height: "173 ม. — ชั้น 39 ชั้น 40 และดาดฟ้ากลางแจ้ง",
    price: "ผู้ใหญ่ ¥2,000 / อายุ 4–12 ปี ¥500",
    hours: "9:30 – 22:30 น. (เข้าครั้งสุดท้าย 22:00 น.)",
    area: "อุเมดะ — เดิน 7 นาทีจากสถานี JR โอซาก้า",
    pass: "ฟรีด้วย Amazing Pass ก่อน 15:00 น. หลังจากนั้นลด 10%",
  },
  {
    deck: "Harukas 300 (อาเบโนะ ฮารุคัส)",
    height: "ชั้นบนสุดของตึกที่ผู้ให้บริการระบุว่าสูงที่สุดในญี่ปุ่น มีลานชมวิวไม่มีหลังคาที่ชั้น 58",
    price: "ที่เคาน์เตอร์ผู้ใหญ่ ¥2,200 / เด็ก ¥900 ซื้อล่วงหน้าทางเว็บ ¥1,980 / ¥810",
    hours: "9:00 – 22:00 น. (เข้าครั้งสุดท้าย 21:30 น.)",
    area: "เทนโนจิ — อยู่เหนือสถานีคินเท็ตสึ โอซาก้า-อาเบโนบาชิ",
    pass: "ไม่อยู่ในรายชื่อสถานที่ของ Amazing Pass",
  },
  {
    deck: "หอคอยสึเท็นคาคุ (Tsutenkaku)",
    height: "หอคอยสัญลักษณ์ของย่านชินเซไก",
    price: "ผู้ใหญ่ (อายุ 15 ปีขึ้นไป) ¥1,500 (¥1,800 ระหว่าง 30 ธ.ค. ถึง 3 ม.ค.)",
    hours: "9:00 – 21:45 น. (เข้าครั้งสุดท้าย 21:15 น.)",
    area: "ชินเซไก — สถานีเอบิสึโจ / โดบุตสึเอ็นมาเอะ",
    pass: "ฟรีด้วย Amazing Pass แต่ต้องจองรอบเวลาที่สถานที่",
  },
];

const whoFor = [
  {
    title: "ควรไปก่อน 15:00 น. ถ้า…",
    desc: `คุณมี Osaka Amazing Pass การเข้าฟรีด้วยพาสสิ้นสุดเวลา 15:00 น. หลังจากนั้นเป็นส่วนลด 10% คือจ่ายประมาณ ¥1,800 แทนที่จะไม่ต้องจ่าย การไปช่วงเช้าหรือบ่ายต้นๆ จึงเป็นทางเดียวที่พาสใช้เข้าจุดชมวิวนี้ได้ฟรี ตรวจสอบเมื่อ ${CHECKED}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "ควรไปตอนพระอาทิตย์ตก ถ้า…",
    desc: "คุณอยากเห็นสิ่งที่จุดชมวิวนี้ทำได้ดีกว่าที่อื่นในโอซาก้า คือดาดฟ้าวงแหวน 360 องศาที่ไม่มีหลังคา เปิดโล่งสู่ท้องฟ้า ขณะไฟของเมืองเริ่มสว่าง เข้าก่อนพระอาทิตย์ตก 30 ถึง 45 นาที แล้วตั๋วใบเดียวจะได้ทั้งวิวตอนกลางวัน แสงสีทอง และวิวกลางคืน ดูตารางเวลาพระอาทิตย์ตกด้านล่าง เพราะในโอซาก้าเวลาพระอาทิตย์ตกต่างกันเกือบสองชั่วโมงครึ่งตลอดปี",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "ควรไปดึก ถ้า…",
    desc: `คุณอยากได้บรรยากาศเงียบ จุดชมวิวเปิดถึง 22:30 น. และเข้าครั้งสุดท้าย 22:00 น. ซึ่งดึกกว่า Harukas 300 และสึเท็นคาคุ และยังเหลือเวลาอีกสองชั่วโมงหลังพระอาทิตย์ตกแม้ในกลางฤดูร้อน เข้าตอน 21:00 น. จะได้วิวเดียวกันโดยมีคนน้อยกว่ามาก และยังซื้อตั๋วที่เคาน์เตอร์ได้ ตรวจสอบเวลาเปิดเมื่อ ${CHECKED}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "เลือกเวลาไปก่อนเลือกตั๋ว",
    desc: "นี่คือเรื่องที่ต้องตัดสินใจในหน้านี้ ก่อน 15:00 น. Amazing Pass ใช้เข้าฟรีได้ แต่ช่วงพระอาทิตย์ตกใช้ไม่ได้ การไปตอนพระอาทิตย์ตกได้ประสบการณ์ดีกว่า ส่วนการใช้พาสประหยัดกว่า และทั้งสองอย่างไม่ตรงกัน ให้ตัดสินใจก่อนว่าจะให้ความสำคัญกับอะไร",
  },
  {
    title: "เช็กเวลาพระอาทิตย์ตกของวันที่คุณจะไป",
    desc: "พระอาทิตย์ตกในโอซาก้าอยู่ระหว่าง 16:47 น. ต้นเดือนธันวาคม ถึง 19:15 น. ต้นเดือนกรกฎาคม ต่างกันเกือบสองชั่วโมงครึ่ง และเป็นตัวกำหนดว่าแสงสีทองจะมาตอนบ่ายหรือราว 19:00 น. ตารางด้านล่างมีเวลาทางการของวันที่ใช้อ้างอิงตลอดปี",
  },
  {
    title: "ซื้อล่วงหน้าถ้าต้องการหน้าชำระเงินภาษาไทยหรือจ่ายด้วยบัตรต่างประเทศ",
    desc: "ที่นี่ไม่มีรอบเวลาเข้าชม และเคาน์เตอร์ชั้น 39 ขายตั๋วโดยรับเงินสดหรือบัตรเครดิต การซื้อล่วงหน้าจึงเป็นเรื่องความสะดวก ไม่ใช่การรับประกันว่าจะได้เข้าชม เว็บไซต์ภาษาญี่ปุ่นของผู้ให้บริการขายตั๋วออนไลน์แบบระบุวันที่ซึ่งถูกกว่าผ่าน asoview ส่วน Klook ขายตั๋วเข้าชมเดียวกันเป็นภาษาไทย จ่ายด้วยบัตรต่างประเทศได้ และได้รหัสสำหรับสแกน ตรวจสอบเงื่อนไขการยกเลิกในหน้าการจองของคุณก่อนจ่ายเงิน เพราะแต่ละสินค้ากำหนดไม่เหมือนกัน",
  },
  {
    title: "เผื่อเวลาอีก 15 นาทีสำหรับบันไดเลื่อน",
    desc: "เคาน์เตอร์ขายตั๋วอยู่ชั้น 39 และทางขึ้นคือบันไดเลื่อนกระจกใสที่พาดผ่านช่องว่างระหว่างตึกสองหลังจากชั้น 35 บันไดเลื่อนนี้เป็นจุดถ่ายรูปในตัวเองและเป็นเหตุผลที่ตึกนี้อยู่บนโปสการ์ด อย่ามองว่าเป็นแค่ช่วงเดินทาง",
  },
  {
    title: "แต่งตัวสำหรับดาดฟ้า ไม่ใช่สำหรับในห้อง",
    desc: "ชั้นบนสุดเป็นวงแหวนกลางแจ้ง 360 องศา สูง 173 เมตร และไม่มีอะไรอยู่เหนือศีรษะ ลมแรงและหนาวกว่าบนถนนตลอดทั้งปี และชั้นนี้ไม่มีที่หลบฝน ส่วนชั้น 40 ด้านล่างอยู่ในร่ม มีเคาน์เตอร์กระจกยาว 35 เมตรตามแนวหน้าต่าง หน้าหนาวควรเตรียมเสื้อกันหนาวเพิ่มอีกชั้น และทำใจไว้ว่าผมจะยุ่ง",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ค่าเข้า Umeda Sky Building เท่าไหร่?",
    a: `ค่าเข้า Umeda Sky Building ผู้ใหญ่ ¥2,000 เด็กอายุ 4–12 ปี ¥500 และเด็กอายุต่ำกว่า 4 ปีเข้าฟรี ผู้ถือบัตรผู้พิการจ่าย ¥1,000 / ¥250 และกลุ่ม 10 คนขึ้นไป ¥1,800 / ¥450 Osaka Amazing Pass ใช้เข้าฟรีได้ตั้งแต่ 9:30 ถึง 15:00 น. และลด 10% ตั้งแต่ 15:00 ถึง 22:00 น. ราคาทางการจาก skybldg.co.jp ตรวจสอบล่าสุดเมื่อ ${LAST_CHECKED}`,
  },
  {
    q: "Umeda Sky Building เปิดกี่โมง และควรใช้เวลานานเท่าไหร่?",
    a: `จุดชมวิว Kuchu Teien เปิด 9:30 ถึง 22:30 น. เข้าครั้งสุดท้าย 22:00 น. และเว็บไซต์ผู้ให้บริการไม่ได้ระบุวันหยุดประจำ ควรเผื่อเวลาหนึ่งถึงสองชั่วโมง (ตามที่หน้าสินค้าของ Klook ประมาณไว้) วันเปิดพิเศษ เช่น เทศกาลดอกไม้ไฟโยโดกาวะ ใช้ตั๋วพิเศษและเวลาเปิดพิเศษ และดาดฟ้ากลางแจ้งอาจปิดเมื่อฝนตกหนัก ตรวจสอบเวลาเปิดล่าสุดเมื่อ ${LAST_CHECKED}`,
  },
  {
    q: "ตั๋ว Umeda Sky Building เปิดขายเมื่อไหร่?",
    a: `ไม่มีวันเปิดขาย จุดชมวิวไม่มีรอบเวลาเข้าชม และเคาน์เตอร์ชั้น 39 ขายตั๋ววันเดียวกันตั้งแต่ 9:30 น. จนถึงเวลาเข้าครั้งสุดท้าย 22:00 น. ผู้ใหญ่ ¥2,000 อายุ 4–12 ปี ¥500 มีเพียงวันเปิดพิเศษ เช่น เทศกาลดอกไม้ไฟโยโดกาวะ ที่ต้องใช้ตั๋วพิเศษตามเวลาที่กำหนด ตรวจสอบเว็บไซต์ทางการเมื่อ ${LAST_CHECKED_ISO}`,
  },
  {
    q: "ต้องจอง Umeda Sky Building ล่วงหน้าไหม?",
    a: "ไม่ต้อง ไม่มีรอบเวลาเข้าชม และเคาน์เตอร์ชั้น 39 ขายตั๋ววันเดียวกัน การจองล่วงหน้าเป็นเรื่องความสะดวก คือได้หน้าชำระเงินภาษาไทยและจ่ายด้วยบัตรต่างประเทศผ่าน Klook ซึ่งเว็บไซต์ภาษาอังกฤษของผู้ให้บริการลิงก์ไป ช่วงที่คนมากคือหนึ่งชั่วโมงก่อนพระอาทิตย์ตก และช่วงก่อนหมดเวลาเข้าฟรีของพาสตอน 15:00 น. ช่วงที่คนน้อยที่สุดคือสายๆ และหลัง 21:00 น. ถ้าคุณมี Osaka Amazing Pass และมาถึงก่อน 15:00 น. ก็ไม่ต้องซื้อตั๋วเลย",
  },
  {
    q: "พระอาทิตย์ตกที่ Umeda Sky Building กี่โมง?",
    a: "ตามตารางปี 2026 ของหอดูดาวแห่งชาติญี่ปุ่นสำหรับโอซาก้า ช่วงพฤศจิกายนถึงกุมภาพันธ์ พระอาทิตย์ตกระหว่าง 16:47 ถึง 17:53 น. ได้แก่ 17:05 น. วันที่ 1 พฤศจิกายน 16:54 น. วันที่ 15 พฤศจิกายน 16:47 น. วันที่ 30 พฤศจิกายนและ 1 ธันวาคม 16:57 น. วันที่ 31 ธันวาคม 17:10 น. วันที่ 15 มกราคม และ 17:41 น. วันที่ 15 กุมภาพันธ์ ช่วงหน้าร้อนช้าสุดถึง 19:15 น. (1 กรกฎาคม) เข้าก่อนพระอาทิตย์ตก 30 ถึง 45 นาทีเพื่อชมวิวกลางวัน แสงสีทอง และวิวกลางคืนด้วยตั๋วใบเดียว",
  },
];

const tripPrepItems = [
  withKlookLocale(umedaSkySameDayPrep[0], LOCALE, {
    label: "ทัวร์อาหารโอซาก้า",
    ctaLabel: "ดูทัวร์อาหารโอซาก้า →",
    why: "สำหรับช่วงค่ำหลังขึ้นจุดชมวิว รถไฟใต้ดินสายมิโดสึจิวิ่งจากอุเมดะไปนัมบะ และทัวร์นี้เป็นทัวร์เดินแบบกลุ่ม 3 ชั่วโมงในซอยข้างถนนโดทงโบริ ได้ชิมคุชิคัตสึ ทาโกยากิ อิซากายะลับ และของหวานท้องถิ่น",
  }),
  withKlookLocale(umedaSkySameDayPrep[1], LOCALE, {
    label: "โรงแรมย่านอุเมดะ โอซาก้า",
    ctaLabel: "ดูโรงแรมอุเมดะ →",
    why: "จุดชมวิวปิด 22:30 น. ถ้าพักใกล้สถานีโอซาก้า หลังขึ้นชมวิวตอนดึกก็เดินกลับที่พักได้ในไม่กี่นาที",
  }),
  withKlookLocale(umedaSkySameDayPrep[2], LOCALE, {
    label: "รถไฟด่วน HARUKA (สนามบินคันไซ ⇄ โอซาก้า)",
    ctaLabel: "ดูตั๋ว HARUKA →",
    why: "จากสนามบินคันไซตรงถึงสถานีโอซาก้า ซึ่งเป็นสถานีที่เดินไปจุดชมวิว หน้าสินค้าของ Klook ระบุว่าขายเฉพาะผู้ถือพาสปอร์ตต่างประเทศที่มีตราประทับผู้พำนักชั่วคราว (Temporary Visitor)",
  }),
  withKlookLocale(umedaSkySameDayPrep[3], LOCALE, {
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM ของ Klook →",
    why: "ตั๋วจาก Klook เป็นตั๋วอิเล็กทรอนิกส์บนโทรศัพท์ และทางเดินจากสถานีโอซาก้าผ่านอุโมงค์ใต้ดิน การเปิดแผนที่ด้วยอินเทอร์เน็ตมือถือจึงช่วยได้",
  }),
];

const tourPicks = [
  withKlookLocale(osakaCastleUmedaTonboriDayTour, LOCALE, {
    title: "ทัวร์ 1 วัน ปราสาทโอซาก้า Umeda Sky Building และล่องเรือโทนโบริ",
    desc: "ทัวร์พร้อมไกด์ที่พาไปปราสาทโอซาก้า จุดชมวิวอุเมดะ และล่องเรือโดทงโบริในวันเดียว โดยไกด์เป็นผู้วางเส้นทาง",
  }),
  withKlookLocale(osakaPrivateWalkingTour, LOCALE, {
    title: "ทัวร์เดินเที่ยวโอซาก้าแบบส่วนตัว ครึ่งวันหรือเต็มวัน",
    desc: "ไกด์ส่วนตัวที่พูดภาษาอังกฤษหรือญี่ปุ่น พาเดินย่านนัมบะและชินไซบาชิตามเส้นทางที่คุณกำหนด",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว Umeda Sky Building" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.86rem" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LastChecked({ url, label }: { url: string; label: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      ตรวจสอบล่าสุด: {LAST_CHECKED_ISO} — แหล่งข้อมูล: <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
    </p>
  );
}

export default function ThUmedaSkyBuildingTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG.th }),
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
            ดาดฟ้าวงแหวนกลางแจ้งสูง 173 เมตรเหนือย่านอุเมดะ เดินจากสถานีโอซาก้าเพียง 7 นาที มีตั๋วแบบเดียวและไม่มีรอบเวลา แต่การเข้าฟรีด้วย Amazing Pass สิ้นสุดเวลา 15:00 น. และเวลานี้คือสิ่งที่ตัดสินว่าควรซื้อพาสหรือไม่
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการพร้อมวันที่ตรวจสอบ", "เวลาพระอาทิตย์ตกในโอซาก้าตามฤดู"].map((t) => (
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
            <span className={styles.verdictLabel}>สรุปสั้นๆ</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ค่าเข้าชม</p>
                <p className={styles.verdictStatValue}>ผู้ใหญ่ ¥2,000 / เด็ก ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาเปิด</p>
                <p className={styles.verdictStatValue}>9:30–22:30 น. เข้าครั้งสุดท้าย 22:00 น.</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การเดินทาง</p>
                <p className={styles.verdictStatValue}>เดิน 7 นาทีจากสถานี JR โอซาก้า</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Amazing Pass</p>
                <p className={styles.verdictStatValue}>ฟรีเฉพาะก่อน 15:00 น.</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              ราคาตั๋ว Umeda Sky Building คือ <strong>ผู้ใหญ่ ¥2,000</strong> และ <strong>เด็กอายุ 4–12 ปี ¥500</strong> จุดชมวิว Kuchu Teien เปิด <strong>9:30 ถึง 22:30 น. เข้าครั้งสุดท้าย 22:00 น.</strong> (เว็บไซต์ทางการ skybldg.co.jp ตรวจสอบเมื่อ {LAST_CHECKED_ISO}) ตั๋วไม่มีวันเปิดขายและไม่มีรอบเวลา เคาน์เตอร์ชั้น 39 ขายตั๋ววันเดียวกันโดยรับเงินสดหรือบัตรเครดิต และใช้เวลาเที่ยวชม <strong>1 ถึง 2 ชั่วโมง</strong> <strong>Osaka Amazing Pass ใช้เข้าฟรีได้เฉพาะ 9:30 ถึง 15:00 น.</strong> และในเดือนพฤศจิกายน พระอาทิตย์ตกที่โอซาก้าระหว่าง 16:47 ถึง 17:05 น.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว Umeda Sky Building บน Klook →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                Osaka Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ตั๋ว Umeda Sky Building: ราคา เวลาเปิด และวิธีซื้อ</h2>
          <p className={styles.bodyText}>
            ตั๋ว Umeda Sky Building ราคา <strong>ผู้ใหญ่ ¥2,000 และเด็กอายุ 4–12 ปี ¥500</strong> เด็กอายุต่ำกว่า 4 ปีเข้าฟรี จุดชมวิวเปิด <strong>9:30 ถึง 22:30 น. เข้าครั้งสุดท้าย 22:00 น.</strong> และหนึ่งถึงสองชั่วโมงก็พอสำหรับทั้งสามชั้น ช่วงหน้าหนาว (พฤศจิกายนถึงกุมภาพันธ์) พระอาทิตย์ตกที่โอซาก้าระหว่าง <strong>16:47 ถึง 17:53 น.</strong> ถ้าจะดูพระอาทิตย์ตกให้เข้าระหว่างประมาณ 16:00 ถึง 17:15 น.
          </p>
          <p className={styles.bodyText}>
            ซื้อตั๋วได้ <strong>ในวันที่ไปที่เคาน์เตอร์ชั้น 39</strong> หรือ <strong>จองออนไลน์ล่วงหน้า</strong> ผ่าน Klook (ภาษาไทย) ซึ่งเว็บไซต์ภาษาอังกฤษของผู้ให้บริการลิงก์ไป หรือตั๋วออนไลน์แบบระบุวันที่ของผู้ให้บริการบน asoview (ภาษาญี่ปุ่น) (ตรวจสอบเมื่อ {CHECKED}) <strong>Osaka Amazing Pass ใช้เข้าฟรีได้ตั้งแต่ 9:30 ถึง 15:00 น.</strong> และลด 10% ตั้งแต่ 15:00 ถึง 22:00 น. จึงใช้กับการไปตอนกลางวันได้ แต่ใช้กับการไปดูพระอาทิตย์ตกไม่ได้ ดูว่าพาสคุ้มค่าเมื่อไหร่ได้ที่{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              ตารางคำนวณความคุ้มค่าของ Osaka Amazing Pass (ภาษาอังกฤษ)
            </Link>{" "}
            ราคาและเวลาเปิดตรวจสอบล่าสุดเมื่อ {LAST_CHECKED} บนเว็บไซต์ของผู้ให้บริการ
          </p>
          <p className={styles.bodyText}>
            ตึกสองหลังสูง 40 ชั้น 173 เมตร เชื่อมกันที่ด้านบนด้วยวงแหวน นี่คือแนวคิดของตึกทั้งหลัง และเป็นเหตุผลที่ตึกนี้อยู่บนโปสการ์ดโอซาก้าแทบทุกใบ ส่วนที่ต้องเสียเงินคือ <strong>จุดชมวิว Kuchu Teien</strong> ซึ่งแปลตรงตัวว่า &quot;สวนลอยฟ้า&quot; มีสามชั้น ได้แก่ <strong>ชั้น 39</strong> ที่ซื้อและสแกนตั๋ว <strong>ชั้น 40</strong> ในร่มที่มีเคาน์เตอร์กระจกยาว 35 เมตรตามแนวหน้าต่าง และเหนือขึ้นไปคือ <strong>ดาดฟ้ากลางแจ้ง</strong> ที่เดินได้รอบ 360 องศาโดยไม่มีอะไรอยู่เหนือศีรษะ
          </p>
          <p className={styles.bodyText}>
            ทางขึ้นก็เป็นส่วนหนึ่งของการเที่ยวชม บันไดเลื่อนกระจกใสพาดผ่านช่องว่างระหว่างตึกสองหลังจากชั้น 35 ไปชั้น 39 เป็นภาพถ่ายที่มีชื่อเสียงที่สุดของตึก และเป็นเหตุผลที่คิวซื้อตั๋วอยู่ชั้นบนแทนที่จะอยู่ระดับถนน ข้อมูลผังชั้นและการเดินทางตรวจสอบจากเว็บไซต์ท่องเที่ยวทางการของโอซาก้าเมื่อ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            ต่างจากจุดชมวิวในโตเกียวที่ต้องจองรอบเวลา ที่นี่ไม่มีอะไรต้องจัดตาราง ไม่มีรอบเข้าชมทุก 15 นาที ไม่มีวันเปิดขาย และไม่ต้องแย่งรอบพระอาทิตย์ตก สิ่งที่มีแทนคือ <strong>เวลา 15:00 น. ที่การเข้าฟรีด้วยพาสสิ้นสุด</strong> และคนส่วนใหญ่ควรวางแผนตามเวลานี้ เนื้อหาที่เหลือในหน้านี้คือราคา เวลาเปิด การคำนวณเวลาพระอาทิตย์ตก และการตัดสินใจข้อนี้
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            แต่ละชั้นมีอะไรบ้าง: จากดาดฟ้าถึงชั้นใต้ดิน
          </h3>
          <Table head={["ชั้น", "มีอะไรบ้าง", "ต้องใช้ตั๋วไหม?"]} rows={floorRows.map((r) => [r.floor, r.what, r.ticket])} />
          <p className={styles.bodyText} style={noteStyle}>
            ข้อมูลชั้นจากหน้าจุดชมวิวภาษาอังกฤษและภาษาญี่ปุ่นของผู้ให้บริการ ตรวจสอบเมื่อ {CHECKED} หน้าภาษาญี่ปุ่นระบุเพียงชื่อ Lumi Sky Walk ที่ชั้นดาดฟ้าโดยไม่ได้อธิบาย หน้านี้จึงไม่ได้อธิบายเช่นกัน
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>วันเปิดขาย</span>
          <h2 className={styles.sectionTitle}>ตั๋ว Umeda Sky Building เปิดขายเมื่อไหร่?</h2>
          <p className={styles.bodyText}>
            <strong>ตั๋ว Umeda Sky Building ไม่มีวันเปิดขาย</strong> ไม่มีรอบเวลาเข้าชม และเคาน์เตอร์ชั้น 39 ขายตั๋ววันเดียวกันตั้งแต่ 9:30 น. จนถึงเวลาเข้าครั้งสุดท้าย 22:00 น. ในราคา ¥2,000 (ผู้ใหญ่) และ ¥500 (อายุ 4–12 ปี) ข้อยกเว้นมีเพียงวันเปิดพิเศษ เช่น เทศกาลดอกไม้ไฟโยโดกาวะ ซึ่งผู้ให้บริการระบุว่าต้องใช้ตั๋วพิเศษตามเวลาที่กำหนด (skybldg.co.jp ตรวจสอบเมื่อ {LAST_CHECKED_ISO})
          </p>
          <p className={styles.bodyText}>
            ทางออนไลน์ เว็บไซต์ภาษาญี่ปุ่นของผู้ให้บริการขายตั๋วออนไลน์แบบระบุวันที่ผ่าน asoview ส่วน Klook ขายตั๋วเข้าชมเดียวกันเป็นภาษาไทยและรับบัตรต่างประเทศ เมื่อกำหนดวันในโอซาก้าได้แล้วก็จองที่ไหนก็ได้ เพราะไม่มีวันเปิดขายให้รอ ถ้าจุดชมวิวเป็นหนึ่งในจุดแวะของทริปคันไซที่ยาวกว่านั้น{" "}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" style={linkStyle}>
              แผนเที่ยวโอซาก้าและเกียวโต 3 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            จัดไว้ในวันที่อยู่โอซาก้า และ{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น (ภาษาอังกฤษ)
            </Link>{" "}
            บอกว่าสถานที่ใดบ้างที่ตั๋วขายหมดล่วงหน้าจริง
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋ว Umeda Sky Building ตามวันที่ของคุณบน Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ค่าเข้า Umeda Sky Building เท่าไหร่?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ค่าเข้าคือ <strong>ผู้ใหญ่ ¥2,000</strong> และ <strong>เด็กอายุ 4–12 ปี ¥500</strong> ตามราคาที่เคาน์เตอร์ของผู้ให้บริการ มีราคาเดียวต่อกลุ่มอายุและไม่มีรอบราคาพิเศษ สิ่งเดียวที่ทำให้ราคาเปลี่ยนคือพาส และการเข้าฟรีด้วยพาสมีเวลาจำกัด
          </p>
          <Table head={["ใคร / เวลา", "ราคา", "หมายเหตุ"]} rows={priceRows.map((r) => [r.tier, r.price, r.what])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/ (ทางการ)" />
          <p className={styles.bodyText} style={noteStyle}>
            แถวของพาสตรงกับรายชื่อสถานที่ของผู้ให้บริการ Osaka Amazing Pass ซึ่งตรวจสอบเมื่อ {CHECKED} ราคาเปลี่ยนแปลงได้ ควรตรวจสอบก่อนซื้อ ตั๋วเข้าชมทั่วญี่ปุ่นที่เว็บไซต์นี้รวบรวมไว้ พร้อมวันที่ตรวจสอบของแต่ละรายการ ดูได้ที่{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            ตั๋วเด็ก Umeda Sky Building ราคาเท่าไหร่?
          </h3>
          <p className={styles.bodyText}>
            <strong>อายุ 4–12 ปี ¥500 และต่ำกว่า 4 ปีเข้าฟรี</strong> เท่ากับหนึ่งในสี่ของราคาผู้ใหญ่ ตั้งแต่อายุ 13 ปีใช้ตั๋วผู้ใหญ่ ¥2,000 เด็กที่ถือบัตรผู้พิการจ่าย ¥250 และเด็กในกลุ่ม 10 คนขึ้นไปจ่าย ¥450 สำหรับทริปครอบครัว{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              แผนเที่ยวโอซาก้า 2 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            จัดจุดชมวิวไว้ในวันที่สอง หลังพิพิธภัณฑ์สัตว์น้ำและก่อนหมดเวลาเข้าฟรีของพาสตอน 15:00 น.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวลาเปิด</span>
          <h2 className={styles.sectionTitle}>Umeda Sky Building เปิดกี่โมง?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            จุดชมวิวเปิด <strong>9:30 ถึง 22:30 น. เข้าครั้งสุดท้าย 22:00 น.</strong> และผู้ให้บริการไม่ได้ระบุวันหยุดประจำ ควรเผื่อเวลาหนึ่งถึงสองชั่วโมง
          </p>
          <Table head={["", "เวลา"]} rows={hoursRows.map((r) => [r.what, r.when])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/ (ทางการ)" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>เวลาปิด 22:30 น.</strong> คือข้อดีที่คนไม่ค่อยพูดถึง ดึกกว่า Harukas 300 (22:00 น.) และจุดชมวิวทั่วไปของสึเท็นคาคุ (21:45 น.) และยังเหลือเวลาอีกสามชั่วโมงหลังพระอาทิตย์ตกแม้ในกลางฤดูร้อน ซึ่งพระอาทิตย์ตกที่โอซาก้าช้าถึง 19:15 น. ถ้าตารางวันนั้นแน่นแล้ว ที่นี่คือสถานที่ที่ไปได้หลังอาหารเย็น ผู้ให้บริการใช้ตั๋วแยกสำหรับวันเปิดพิเศษ จึงควรเช็กเว็บไซต์ก่อนไปในวันที่มีงานใหญ่ เช่น เทศกาลดอกไม้ไฟโยโดกาวะ
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวลาที่ควรไป</span>
          <h2 className={styles.sectionTitle}>พระอาทิตย์ตกที่ Umeda Sky Building กี่โมง?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ช่วงพฤศจิกายนถึงกุมภาพันธ์ พระอาทิตย์ตกที่โอซาก้าระหว่าง <strong>16:47 ถึง 17:53 น.</strong> ส่วนต้นกรกฎาคมช้าถึง 19:15 น. <strong>เข้าก่อนพระอาทิตย์ตก 30 ถึง 45 นาที</strong> แล้วตั๋วใบเดียวจะได้ทั้งวิวกลางวัน แสงสีทอง และวิวกลางคืนจากดาดฟ้ากลางแจ้ง ตารางด้านล่างคือเวลาที่หอดูดาวแห่งชาติญี่ปุ่นเผยแพร่สำหรับโอซาก้าปี 2026 ถ้าจะไปในปี 2027 ให้เปิดหน้าเดียวกันของหอดูดาวแห่งชาติญี่ปุ่นสำหรับปีนั้น
          </p>
          <Table head={["วันที่", "พระอาทิตย์ตกที่โอซาก้า", "ความหมายบนดาดฟ้า"]} rows={sunsetRows.map((r) => [r.date, r.sunset, r.note])} />
          <LastChecked url={NAOJ_URL} label="ตารางเวลาพระอาทิตย์ขึ้นและตกที่โอซาก้า หอดูดาวแห่งชาติญี่ปุ่น (ทางการ)" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            มีสองเรื่องที่ควรรู้ เรื่องแรก <strong>หน้าหนาวพระอาทิตย์ตกอยู่ในช่วงเข้าฟรีของพาส แต่หน้าร้อนไม่ใช่</strong> วันที่ 1 ธันวาคม แสงสีทองเริ่มก่อน 15:00 น. ผู้ถือพาสจึงได้ทั้งการเข้าฟรีและแสงสวย ส่วนวันที่ 1 กรกฎาคม พระอาทิตย์ตกหลังหมดเวลาเข้าฟรีถึงสี่ชั่วโมง เรื่องที่สอง จุดชมวิวเปิดต่อไปอีกนานหลังฟ้ามืดในทุกฤดู ถ้าพลาดแสงสวยก็ไม่ได้พลาดการเที่ยวชม วิวกลางคืนจากดาดฟ้าคืออีกครึ่งหนึ่งของสิ่งที่คุณจ่ายเงินไป และเป็นครึ่งที่ได้เห็นง่ายกว่า
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋ว Umeda Sky Building บน Klook →
            </KlookLink>
            <KlookLink href={NIGHT_BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              รถบัสชมวิวกลางคืนจากสถานีโอซาก้า →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ความหนาแน่น</span>
          <h2 className={styles.sectionTitle}>คนเยอะแค่ไหน และช่วงไหนคนน้อยที่สุด?</h2>
          <p className={styles.bodyText}>
            ที่นี่ไม่มีระบบจอง ข้อดีคือตั๋วไม่ขายหมด ข้อเสียคือไม่มีการจำกัดจำนวนคนบนดาดฟ้าเช่นกัน ช่วงที่คนแน่นคาดเดาได้จากวิธีขายตั๋ว ไม่ต้องเดา <strong>หนึ่งชั่วโมงก่อนพระอาทิตย์ตก</strong> คือช่วงที่แน่นที่สุด เพราะทุกคนอยากยืนที่ราวกั้นฝั่งตะวันตกยาวราว 20 เมตรเดียวกัน และ <strong>ช่วงก่อน 15:00 น.</strong> คือช่วงแน่นอีกช่วงที่คนไม่ค่อยรู้ เพราะเป็นเวลาสิ้นสุดการเข้าฟรีของทั้ง Osaka Amazing Pass และ Osaka e-Pass
          </p>
          <p className={styles.bodyText}>
            ช่วงที่คนน้อยที่สุดคือก่อนและหลังสองช่วงนั้น ได้แก่ ช่วงสายหลัง 9:30 น. และช่วงค่ำตั้งแต่ประมาณ 21:00 น. ซึ่งวิวเหมือนเดิมและยังเหลือเวลาอีกหนึ่งชั่วโมงก่อนเข้าครั้งสุดท้าย ฤดูซากุระ (ปลายมีนาคมถึงกลางเมษายน) และช่วงปิดเทอมหน้าร้อนทำให้คนมากขึ้นทั่วโอซาก้า และแถว 31 มีนาคมในตารางด้านบนอยู่ในช่วงนั้นพอดี ดูวิธีจัดวันเที่ยวในเมืองรอบการขึ้นจุดชมวิวได้ที่{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>
              สิ่งที่น่าทำในโอซาก้า (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เปรียบเทียบ</span>
          <h2 className={styles.sectionTitle}>Umeda Sky Building กับ Abeno Harukas ที่ไหนคุ้มกว่า?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>เลือก Umeda Sky Building ถ้าต้องการดาดฟ้ากลางแจ้ง เวลาปิดที่ดึก และจุดชมวิวที่อยู่ติดสถานีโอซาก้า</strong> อุเมดะราคา ¥2,000 ส่วน Harukas 300 ที่เคาน์เตอร์ ¥2,200 (ซื้อล่วงหน้าทางเว็บ ¥1,980) และอุเมดะเปิดนานกว่าครึ่งชั่วโมง ถ้าความสูงสำคัญกว่าการได้อยู่กลางแจ้ง ให้เลือก Abeno Harukas โอซาก้ามีจุดชมวิวแบบเสียเงินสามแห่งที่ต่างกันชัดเจน แห่งหนึ่งสูงที่สุด แห่งหนึ่งเปิดโล่งสู่ท้องฟ้า และอีกแห่งถูกที่สุดและอยู่ในย่านเก่าชินเซไก คอลัมน์พาสคือสิ่งที่บทความเปรียบเทียบส่วนใหญ่ไม่ได้พูดถึง และเป็นตัวกำหนดค่าใช้จ่ายจริง
          </p>
          <Table
            head={["จุดชมวิว", "ความสูง / ผัง", "ราคาผู้ใหญ่", "เวลาเปิด", "ย่าน", "Osaka Amazing Pass"]}
            rows={deckRows.map((r) => [r.deck, r.height, r.price, r.hours, r.area, r.pass])}
          />
          <LastChecked url={HARUKAS_URL} label="abenoharukas-300.jp (ทางการ) และ skybldg.co.jp สำหรับอุเมดะ" />
          <p className={styles.bodyText} style={noteStyle}>
            แถวของอุเมดะและ Harukas 300 ตรวจสอบซ้ำเมื่อ {LAST_CHECKED} แถวสึเท็นคาคุ (tsutenkaku.co.jp) และคอลัมน์พาส (รายชื่อสถานที่ของผู้ให้บริการ Osaka Amazing Pass) ตรวจสอบเมื่อ {CHECKED} ความสูง 173 ม. ของอุเมดะมาจากเว็บไซต์ท่องเที่ยวทางการของโอซาก้า มีสองเรื่องที่ต่างกัน <strong>Harukas 300 ไม่อยู่ในรายชื่อสถานที่ของ Amazing Pass</strong> จึงต้องจ่ายเต็มราคาแม้ในวันที่ใช้พาส และ <strong>สึเท็นคาคุต้องจองรอบเวลาที่สถานที่</strong> แม้จะมีพาส ซึ่งอีกสองแห่งไม่ต้อง ข้อมูลเปลี่ยนแปลงได้ ควรตรวจสอบก่อนเดินทาง
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>จากสถานีโอซาก้าไป Umeda Sky Building อย่างไร?</h2>
          <p className={styles.bodyText}>
            เดินไป <strong>จากสถานี JR โอซาก้า เดินประมาณ 7 นาที</strong> และ <strong>จากสถานีฮันคิว โอซาก้า-อุเมดะ หรือสถานีอุเมดะของ Osaka Metro ประมาณ 9 นาที</strong> โดยเดินไปทางตะวันตกเฉียงเหนือผ่านกลุ่มอาคาร New Umeda City (ตามเว็บไซต์ท่องเที่ยวทางการของโอซาก้า อีกหน้าหนึ่งในเว็บไซต์เดียวกันระบุประมาณ 10 นาที) ที่รู้สึกนานกว่า 7 นาทีเป็นเพราะทางรถไฟ เส้นทางเดินจากแต่ละสถานีที่ผู้ให้บริการแนะนำต้องผ่านอุโมงค์ใต้ทางรถไฟยาว 40 เมตร จึงมองไม่เห็นตึกช่วงหนึ่งระหว่างทาง เดินต่อไปแล้วจะเห็นตึกอีกครั้ง เมื่อเข้าไปในอาคาร ให้ใช้ทางเข้าเฉพาะของจุดชมวิว ไม่ใช่ลิฟต์สำนักงาน
          </p>
          <p className={styles.bodyText}>
            อุเมดะเป็นศูนย์กลางฝั่งเหนือของรถไฟใต้ดินสายมิโดสึจิ (Midosuji Line) การเดินทางมาถึงสถานีโอซาก้าจากทุกที่ในเมืองจึงทำได้ง่าย{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              คู่มือการเดินทางในโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายว่าสายมิโดสึจิเชื่อมอุเมดะกับนัมบะและเทนโนจิอย่างไร{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>
              คู่มือพาส Osaka Metro (ภาษาอังกฤษ)
            </Link>{" "}
            คำนวณว่าในวันที่แวะหลายที่ ตั๋ววันคุ้มกว่าการแตะบัตรหรือไม่ และ{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              คู่มือเลือกที่พักในโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            เปรียบเทียบการพักย่านอุเมดะกับนัมบะ เวลาเดินตรวจสอบเมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>ต้องจอง Umeda Sky Building ล่วงหน้าไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>ไม่ต้อง</strong> ไม่มีรอบเวลาเข้าชม และเคาน์เตอร์ชั้น 39 ขายตั๋ววันเดียวกันโดยรับเงินสดหรือบัตรเครดิต ซื้อล่วงหน้าเพื่อความสะดวกเท่านั้น คือ Klook สำหรับหน้าชำระเงินภาษาไทยและบัตรต่างประเทศ หรือตั๋วออนไลน์แบบระบุวันที่ของผู้ให้บริการบน asoview ซึ่งถูกกว่า ถ้าคุณอ่านภาษาญี่ปุ่นได้ ถ้ามี Osaka Amazing Pass และมาถึงก่อน 15:00 น. ก็ไม่ต้องซื้ออะไรเลย
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
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            ควรเลือกตั๋ว Umeda Sky Building แบบไหน?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>เลือกตามเวลาที่จะไป</strong> ตั๋ววันเดียวกันขายที่เคาน์เตอร์และไม่ขายหมด แต่หนึ่งชั่วโมงก่อนพระอาทิตย์ตกและช่วงก่อน 15:00 น. คนจะแน่น การจองออนไลน์แต่ละสินค้ามีเงื่อนไขการยกเลิกของตัวเอง ตรวจสอบในหน้าสินค้าก่อนจ่ายเงิน
          </p>
          <Table head={["แผนของคุณ", "ตัวเลือกที่เหมาะที่สุด", "เหตุผล"]} rows={choiceRows.map((r) => [r.situation, r.pick, r.why])} />
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/ (ทางการ)" />
          <p className={styles.bodyText} style={{ marginTop: "0.5rem" }}>
            รายชื่อสถานที่ทั้งหมดที่ใช้พาสได้และการคำนวณตั๋ว 1 วันกับ 2 วัน ดูได้ที่{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              คู่มือ Osaka Amazing Pass (ภาษาอังกฤษ)
            </Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูตั๋ว Umeda Sky Building บน Klook →
            </KlookLink>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ไปตอนกลางวัน? Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              รวมปราสาทและล่องเรือ →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="จองสำหรับวันเดียวกัน"
          heading="จองอะไรเพิ่มพร้อมตั๋ว Umeda Sky Building"
          intro="จุดชมวิวใช้เวลาหนึ่งถึงสองชั่วโมง แต่วันนั้นยังต้องมีมื้อเย็น ที่พักใกล้อุเมดะ การเดินทางจากสนามบินคันไซ และอินเทอร์เน็ตมือถือ ทั้งสี่อย่างนี้จองได้ในบัญชี Klook เดียวกับตั๋ว หน้านี้ไม่ได้ระบุราคา เปิดหน้าสินค้าแต่ละรายการเพื่อดูราคาปัจจุบัน"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เรื่องพาส</span>
          <h2 className={styles.sectionTitle}>Osaka Amazing Pass เข้า Umeda Sky Building ฟรีไหม?</h2>
          <p className={styles.bodyText}>
            <strong>ฟรี แต่เฉพาะ 9:30 ถึง 15:00 น.</strong> Umeda Sky Building เป็นหนึ่งในสถานที่มากกว่า 40 แห่งที่เข้าฟรีด้วย Osaka Amazing Pass (และ Osaka e-Pass) แต่ทั้งเว็บไซต์ของตึกและรายชื่อสถานที่ของผู้ให้บริการพาสจำกัดการเข้าด้วยพาสไว้ที่ <strong>ก่อน 15:00 น.</strong> ตั้งแต่ 15:00 น. พาสให้ได้แค่ <strong>ส่วนลด 10%</strong> การไปตอนเย็นจึงต้องจ่ายอีกประมาณ ¥1,800 นอกเหนือจาก {PASS_1_DAY} ที่จ่ายค่าพาสไปแล้ว นี่คือความเข้าใจผิดที่ทำให้เสียเงินมากที่สุดในวันที่ใช้พาสโอซาก้า และบทความเกี่ยวกับจุดชมวิวนี้แทบไม่มีใครพูดถึง
          </p>
          <p className={styles.bodyText}>
            ลองคำนวณด้วยพาส 1 วันราคา {PASS_1_DAY} (ราคาทางการ ตรวจสอบเมื่อ 9 พฤศจิกายน 2026) <strong>จุดชมวิวนี้ก่อน 15:00 น. (¥2,000)</strong> และ <strong>หอหลักปราสาทโอซาก้า (¥1,200)</strong> รวมค่าเข้า ¥3,200 ต่ำกว่าราคาพาสเล็กน้อย จึงต้องนับค่ารถไฟใต้ดินของวันนั้นด้วยถึงจะคุ้ม เพิ่ม <strong>ชิงช้าสวรรค์ HEP FIVE (¥1,000)</strong> ซึ่งห่างจากอุเมดะห้านาที รวมเป็น ¥4,200 เกินราคาพาสโดยยังไม่นับค่าเดินทาง ส่วนการซื้อพาสเพื่อขึ้นตึกนี้ตึกเดียวตอนเย็นนั้นไม่คุ้มค่าแน่นอน{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>
              ราคาและตารางคำนวณความคุ้มค่าของ Osaka Amazing Pass (ภาษาอังกฤษ)
            </Link>{" "}
            มีรายชื่อสถานที่ทั้งหมด ราคาพาส 2 วัน และสิ่งที่ใช้พาสไม่ได้ ส่วน{" "}
            <Link href="/guides/attractions/osaka-castle-tickets" style={linkStyle}>
              คู่มือตั๋วปราสาทโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            คำนวณแบบเดียวกันจากฝั่งปราสาท ซึ่งมีสถานที่ที่ต้องเสียเงินสามแห่งอยู่ในกำแพงเดียวกัน เงื่อนไขของสถานที่ตรวจสอบเมื่อ {CHECKED}
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Osaka Amazing Pass บน Klook →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เฉพาะจุดชมวิว →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเรื่อง Umeda Sky Building" />

        <KlookTourPicks
          heading="เวลาที่เหลือของวันในโอซาก้า"
          intro="ขึ้นดาดฟ้าหนึ่งถึงสองชั่วโมงยังเหลือเวลาอีกเกือบทั้งวัน และอุเมดะอยู่ทางเหนือสุดของเมือง ห่างจากโดทงโบริและปราสาท ทัวร์แรกรวมปราสาทและจุดชมวิวไว้ด้วยกัน ทัวร์ที่สองเป็นทัวร์เดินเที่ยว ราคาบน Klook เปลี่ยนตามวันที่ เปิดหน้าสินค้าเพื่อดูราคาปัจจุบันและจุดนัดพบ"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/th/guides/attractions/dotonbori-river-cruise", title: "ล่องเรือโดทงโบริ (2026): ราคา เวลาออกเรือ และท่าเรือ" },
            { href: "/guides/attractions/osaka-castle-tickets", title: "ตั๋วปราสาทโอซาก้า (2026): ราคา เวลาเปิด และสิ่งที่พาสใช้ได้ (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "Osaka Amazing Pass 2026: ราคา คุ้มไหม และแผน 1 วัน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "ตั๋วพิพิธภัณฑ์สัตว์น้ำไคยูคัง (2026): ราคา เวลาเปิด และรอบเวลา (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "สิ่งที่น่าทำในโอซาก้า (2026): ที่ไหนพาสคุ้ม ที่ไหนไม่คุ้ม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "แผนเที่ยวโอซาก้า 2 วัน (2026): รายวันและการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "แผนเที่ยวโอซาก้าและเกียวโต 3 วัน (2026): รายวันและการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-food-tour", title: "ทัวร์อาหารโอซาก้า (2026): ควรจองแบบไหนและได้กินอะไร (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "ที่พักในโอซาก้า 2026: เทียบนัมบะ อุเมดะ และ USJ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-transportation", title: "การเดินทางในโอซาก้า (2026): รถไฟใต้ดิน รถไฟ และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-metro-pass", title: "พาส Osaka Metro 2026: เทียบตั๋ว 1 วันกับ 2 วัน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-observation-decks", title: "จุดชมวิวในโตเกียว (2026): ที่ไหนคุ้มค่าที่จะจ่าย (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "ราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น 2026: ราคาทางการและกฎการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำในญี่ปุ่นเพิ่มเติม (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>เลือกเวลาก่อน แล้วค่อยเลือกตั๋ว</h2>
            <p className={styles.ctaBannerDesc}>
              ที่นี่ตั๋วไม่ขายหมด สิ่งเดียวที่ทำให้เสียเงินมากหรือน้อยคือเวลาที่ไป ก่อน 15:00 น. เข้าฟรีด้วย Amazing Pass หลังจากนั้นใช้ตั๋วใบเดียวเพื่อแสงที่สวยกว่าและวิวกลางคืน จองล่วงหน้าเพื่อหน้าชำระเงินภาษาไทยและบัตรต่างประเทศที่ใช้ได้ และตรวจสอบเงื่อนไขการยกเลิกในหน้าการจองของคุณก่อนจ่ายเงิน
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋ว Umeda Sky Building บน Klook →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                Osaka Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
