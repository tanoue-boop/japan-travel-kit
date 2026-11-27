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
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import {
  galaNaebaSkiDayTripTokyo,
  galaYuzawaLiftTicket,
  galaYuzawaSkiLesson,
  hakubaSkiResortDayTourTokyo,
  hanedaLimousineBus,
  jrEastPass,
  jrTokyoWidePass,
  klookEsim,
  naritaExpressRoundTripUrl,
  shinkansenTokyoGalaYuzawa,
  yuzawaIwapparaSkiDayTourTokyo,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";

// Mirrors the English page (/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo) section by
// section as of 2026-11-25 (task-jtk-20261125-TR03): same sections, tables, FAQ and Klook CTAs in
// the same places. Every figure, date and source is the English page's (read 15 Nov 2026); nothing
// is added. Title term: "GALA Yuzawa" — Thai results and JR East keep the resort's Latin name.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo";
const TITLE = "สกี GALA Yuzawa จากโตเกียว 2026-27";
const H1 = "สกี GALA Yuzawa จากโตเกียว 2026-27: เที่ยววันเดียวด้วยชินคันเซ็น JR Pass และวิธีเดินทาง";
const DESC =
  "สกี GALA Yuzawa จากโตเกียว ชินคันเซ็นตรง 71 นาที ใช้ JR Pass ได้ บัตรลิฟต์สกี ¥8,000";

const OWN_ISO = "2026-11-15";
const OWN = dateLabel(OWN_ISO, LOCALE);
const JRP_7DAY = "¥50,000";
const EAST_PASS_5DAY = "¥35,000";
const SLED = "¥2,500";
const FASTEST = "71 นาที";
const SLOPES_OPEN = "19 ธันวาคม 2026";
const SLOPES_CLOSE = "5 พฤษภาคม 2027";
const SIGHTSEEING_OPEN = "12 ธันวาคม 2026";
const LIFT_WINDOW = "¥8,000";
const LIFT_WEB = "¥7,500";
const SKI_SET = "¥6,500";
const WEAR = "¥5,500";
const PASS_ADULT = "¥16,000";
const JR_EXAMPLE = "ประมาณ ¥21,500";

const LIFT_URL = klookFor(galaYuzawaLiftTicket.url, LOCALE);
const LESSON_URL = klookFor(galaYuzawaSkiLesson.url, LOCALE);
const TRAIN_URL = klookFor(shinkansenTokyoGalaYuzawa.url, LOCALE);
const WIDE_URL = klookFor(jrTokyoWidePass.url, LOCALE);
const EAST_URL = klookFor(jrEastPass.url, LOCALE);
const IWAPPARA_URL = klookFor(yuzawaIwapparaSkiDayTourTokyo.url, LOCALE);
const CHARTER_URL = klookFor(galaNaebaSkiDayTripTokyo.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const accessRows = [
  {
    leg: "แนะนำ: สถานีโตเกียว → สถานี GALA Yuzawa ชินคันเซ็นสายโจเอ็ตสึ (Joetsu) ขบวน Tanigawa ที่วิ่งตรง",
    time: `ขบวนที่เร็วที่สุดใช้เวลา ${FASTEST} เช่น รถไฟขบวน Tanigawa 71 ออกจากโตเกียวเวลา 6:24 น. และถึง GALA Yuzawa เวลา 7:35 น. และหน้าแนะนำของ JR East ระบุว่าขบวน Tanigawa ใช้เวลาประมาณ 1 ชั่วโมง 20 นาที`,
    trains: "เฉพาะฤดูกาล: ตั้งแต่ 12 ธันวาคม 2026 JR East ขยายเส้นทางเดินรถของขบวน Tanigawa ที่ให้บริการตามปกติไปถึง GALA Yuzawa พร้อมเพิ่มขบวนพิเศษ จอดที่อุเอโนะ (Ueno) และโอมิยะ (Omiya) ด้วย",
    cost: `ใช้ JAPAN RAIL PASS, JR TOKYO Wide Pass (${PASS_ADULT}) และ JR EAST PASS ได้ ถ้าไม่มีพาส ราคาตั๋วชินคันเซ็นจะแสดงในหน้าชำระเงิน`,
    note: "สถานี GALA Yuzawa เป็นสถานีชินคันเซ็นที่เปิดเฉพาะฤดูกาลและตั้งอยู่ภายในอาคารศูนย์บริการของลานสกี ออกจากประตูตรวจตั๋วก็ถึงอาคารที่มีจุดจำหน่ายบัตรลิฟต์สกีและจุดเช่าอุปกรณ์ทันที ไม่ต้องนั่งรถบัส ไม่ต้องต่อรถ ไม่ต้องนั่งแท็กซี่ ไม่ใช่รถไฟ Tanigawa ทุกขบวนที่วิ่งไปถึง GALA Yuzawa ให้เลือกขบวนที่ระบุสถานีปลายทางเป็น GALA Yuzawa",
  },
  {
    leg: "สถานีโตเกียว → สถานีเอจิโกะยูซาวะ (Echigo-Yuzawa) แล้วต่อรถรับส่งฟรี",
    time: "นั่งชินคันเซ็นไปเอจิโกะยูซาวะ แล้วนั่งรถรับส่งฟรีของลานสกีประมาณ 10 นาที",
    trains: "เอจิโกะยูซาวะเป็นสถานีชินคันเซ็นสายโจเอ็ตสึที่เปิดตลอดปี อยู่ก่อนถึง GALA Yuzawa หนึ่งสถานี",
    cost: "รถรับส่งฟรี ส่วนรถไฟใช้พาสทั้งสามแบบเดียวกันได้",
    note: "เป็นทางเลือกเมื่อที่นั่งของขบวนตรงที่ต้องการเต็มแล้วหรือไม่วิ่งในวันนั้น และเป็นเส้นทางเดียวในช่วงนอกฤดูกาลของ GALA Yuzawa เพราะตามข้อมูลของ JR East สถานี GALA Yuzawa เปิดเฉพาะฤดูหนาวและฤดูใบไม้ผลิ ส่วนเอจิโกะยูซาวะเป็นสถานีก่อนหน้าที่เปิดตลอดปี",
  },
  {
    leg: "ทัวร์รถบัสสกีวันเดียวจากโตเกียว",
    time: "ใช้เวลารวม 11 ถึง 12.5 ชั่วโมง ตั้งแต่ออกเดินทางจนกลับถึงโตเกียว",
    trains: "ตามวันออกเดินทางที่ระบุในหน้าสินค้า",
    cost: "คิดราคาต่อคน เปลี่ยนตามวันที่ เลือกวันเดินทางในหน้าสินค้าเพื่อดูราคา",
    note: "เป็นทริปคนละรูปแบบ ไม่ใช่เพียงทางเลือกที่ถูกกว่า ทัวร์รถบัสไปลานสกีอิวัปปาระ (Iwappara) ในพื้นที่ยูซาวะเดียวกัน ไม่ใช่ GALA Yuzawa จองรถบัสไป-กลับได้ในครั้งเดียว พร้อมเลือกเพิ่มการเช่าอุปกรณ์หรือคอร์สเรียนสกี ใช้เวลานานกว่าชินคันเซ็น แต่ไม่ต้องจัดการอะไรเอง",
  },
  {
    leg: "บริการรถส่วนตัวแบบเหมาคันไป GALA Yuzawa หรือนาเอบะ (Naeba)",
    time: "บริการรถส่วนตัวแบบเหมาคัน 10 ชั่วโมง รับส่งจากที่พัก",
    trains: "ทุกวันที่ผู้ให้บริการเปิดรับจอง",
    cost: "คิดราคาต่อคัน เปลี่ยนตามวันที่ ดูในหน้าสินค้า",
    note: "เหมาะกับครอบครัวหรือกลุ่มที่มีอุปกรณ์ หรือต้องการออกเดินทางก่อนรถไฟขบวนแรก เลือกลานสกีตอนจอง บริการนี้จึงใช้ได้ทั้งไป GALA Yuzawa และนาเอบะ",
  },
];

const costRows = [
  {
    item: "ผู้ใหญ่ที่ไม่ได้นำอุปกรณ์มาเอง เล่นสกีหรือสโนว์บอร์ด 1 วัน (บัตรลิฟต์สกี ชุดอุปกรณ์สกี และชุดเสื้อผ้าสกี ราคาออนไลน์)",
    price: "¥19,500 บวกค่ารถไฟ",
    note: `ค่าใช้จ่ายที่นักท่องเที่ยวแบบไปเช้าเย็นกลับส่วนใหญ่ต้องจ่าย: บัตรลิฟต์สกี ${LIFT_WEB} ชุดอุปกรณ์สกีหรือสโนว์บอร์ด ${SKI_SET} และชุดเสื้อผ้าสกี (เสื้อและกางเกง) ${WEAR} ถ้าซื้อบัตรลิฟต์สกีที่เคาน์เตอร์จำหน่ายตั๋วจะเป็น ${LIFT_WINDOW} รวมเป็น ¥20,000`,
  },
  {
    item: "ชินคันเซ็น โตเกียว ⇄ GALA Yuzawa",
    price: "ใช้พาส หรือดูราคาตั๋วในหน้าชำระเงิน",
    note: `JR TOKYO Wide Pass ราคา ${PASS_ADULT} สำหรับ 3 วัน ตัวอย่างการคำนวณของ JR East คือไปกลับ GALA Yuzawa และไปกลับนิกโก้ (Nikko) แบบระบุที่นั่ง รวม ${JR_EXAMPLE} JR East ปรับค่าโดยสารเมื่อ 14 มีนาคม 2026 จึงควรดูราคาเที่ยวเดียวตามวันเดินทางในหน้าชำระเงิน`,
  },
  {
    item: "บัตรกอนโดลาและลิฟต์สกี 1 วัน (ผู้ใหญ่)",
    price: `ออนไลน์ ${LIFT_WEB} / เคาน์เตอร์ ${LIFT_WINDOW}`,
    note: "เด็กประถม ออนไลน์ ¥3,500 / เคาน์เตอร์ ¥4,000 เด็กที่ยังไม่เข้าโรงเรียนประถมศึกษาเข้าฟรี 2 คนต่อผู้ใหญ่ที่ซื้อบัตร 1 คน",
  },
  {
    item: "ชุดอุปกรณ์สกี 3 ชิ้น หรือชุดอุปกรณ์สโนว์บอร์ด 2 ชิ้น 1 วัน",
    price: SKI_SET,
    note: "เด็กระดับประถมศึกษาหรือต่ำกว่า ¥4,000 ค่าเช่า 2 วันเท่ากับค่าเช่า 1 วันคูณสอง",
  },
  {
    item: "ชุดเสื้อผ้าสกี (เสื้อและกางเกง) 1 วัน",
    price: WEAR,
    note: "เด็กระดับประถมศึกษาหรือต่ำกว่า ¥3,000",
  },
  {
    item: "แว่นสกีและหมวกกันน็อก 1 วัน",
    price: "¥1,800 และ ¥2,300",
    note: "เช่าแยกชิ้น ไม่รวมอยู่ในชุดอุปกรณ์",
  },
  {
    item: "สำหรับผู้ที่ไม่เล่นสกี: บัตรกอนโดลาและลิฟต์ Barouche พร้อมค่าเช่าเลื่อนหิมะ",
    price: `ออนไลน์ ¥5,500 และ ${SLED}`,
    note: "บัตรกอนโดลาและลิฟต์ Barouche (เคาน์เตอร์ ¥6,500) ใช้เข้าลานเล่นหิมะบริเวณสถานีกอนโดลาด้านบนและขึ้นลิฟต์ชมวิว Barouche ได้ เลื่อนหิมะเช่าที่สถานีกอนโดลาด้านบน",
  },
  {
    item: "SPA GALA no Yu (ออนเซ็นและสระว่ายน้ำ) ผู้ใหญ่",
    price: "¥1,500",
    note: "อยู่ในอาคารสถานี ใช้ระหว่างรอรถไฟขากลับได้ ราคาจากหน้าท่องเที่ยว GALA Yuzawa ของ JR East",
  },
];

const seasonRows = [
  { what: "ลานสกีเปิด (สกีและสโนว์บอร์ด)", detail: `${SLOPES_OPEN} → ${SLOPES_CLOSE}` },
  { what: "ช่วงที่เปิดให้บริการสำหรับการชมวิวเท่านั้น", detail: `${SIGHTSEEING_OPEN} → 18 ธันวาคม 2026: เปิดเฉพาะกอนโดลาและลิฟต์ชมวิว เล่นสกีไม่ได้ไม่ว่าหิมะจะมากแค่ไหน` },
  { what: "ชินคันเซ็นตรงถึง GALA Yuzawa", detail: "ตั้งแต่ 12 ธันวาคม 2026 ที่ GALA Yuzawa เริ่มเปิด JR East ขยายเส้นทางเดินรถของขบวน Tanigawa ที่ให้บริการตามปกติไปถึง GALA Yuzawa พร้อมเพิ่มขบวนพิเศษ (JR East, 22 ต.ค. 2026) ประกาศนี้ไม่ได้ระบุวันสิ้นสุด และสถานีเปิดเฉพาะฤดูหนาวและฤดูใบไม้ผลิ" },
  { what: "รถไฟขากลับสำหรับผู้ที่เล่นสกีตอนกลางคืน", detail: "Tanigawa 198 GALA Yuzawa 20:19 → โตเกียว 21:40 วันที่ 16 และ 30 มกราคม และ 13 และ 27 กุมภาพันธ์ 2027" },
  { what: "แพ็กเกจชินคันเซ็นพร้อมบัตรลิฟต์สกี JR SKISKI", detail: "เว็บไซต์ท่องเที่ยวของ JR East ยังขึ้นว่า \"Coming Soon\" และคาดว่าจะเปิดจองกลางเดือนพฤศจิกายน 2026" },
  { what: "เวลาเปิดให้บริการในแต่ละวัน", detail: "เวลาเปิดให้บริการในแต่ละวันสำหรับฤดูกาล 2026-27 ยังอยู่ระหว่างรอประกาศอย่างเป็นทางการ วันและเวลาเปิดให้บริการอาจเปลี่ยนตามปริมาณหิมะและสภาพอากาศ" },
];

const liftRows = [
  { ticket: "บัตรกอนโดลาและลิฟต์สกี 1 วัน ผู้ใหญ่", window: LIFT_WINDOW, web: LIFT_WEB, note: "บัตรมาตรฐาน ใช้กับกอนโดลาและลิฟต์ทุกตัวในสองโซนที่เปิดฤดูกาลนี้ได้" },
  { ticket: "บัตรกอนโดลาและลิฟต์สกี 1 วัน เด็กประถม", window: "¥4,000", web: "¥3,500", note: "ราคาที่เคาน์เตอร์เท่ากับครึ่งหนึ่งของราคาบัตรผู้ใหญ่ และออนไลน์ถูกลงอีก ¥500" },
  { ticket: "บัตรกอนโดลาและลิฟต์ Barouche ผู้ใหญ่", window: "¥6,500", web: "¥5,500", note: "บัตรราคาถูกกว่า ใช้ได้เฉพาะกอนโดลาและลิฟต์สกี Barouche แบบ 4 ที่นั่ง เหมาะสำหรับการเล่นสกีครั้งแรก การเล่นหิมะ หรือการเล่นช่วงสั้น ๆ ตอนบ่าย ไม่เหมาะสำหรับผู้ที่ต้องการเล่นสกีทั่วทั้งรีสอร์ต" },
  { ticket: "บัตรกอนโดลาและลิฟต์ Barouche เด็กประถม", window: "¥3,400", web: "¥2,900", note: "บัตรลิฟต์สกีที่ประหยัดที่สุดสำหรับพาเด็กขึ้นไปเล่นหิมะที่นี่" },
  { ticket: "บัตร 4 ชั่วโมง ผู้ใหญ่", window: "¥7,500", web: "¥7,000", note: "ที่เคาน์เตอร์ถูกกว่าบัตร 1 วันแค่ ¥500 จึงเหมาะกับผู้ที่มาถึงสาย มากกว่าผู้ที่ต้องการประหยัด" },
  { ticket: "บัตร 4 ชั่วโมง เด็กประถม", window: "¥3,500", web: "¥3,000", note: "เช่นเดียวกับบัตรผู้ใหญ่ เด็กเล็กส่วนใหญ่เล่นสกีได้ราว 4 ชั่วโมงต่อวันอยู่แล้ว" },
  { ticket: "เด็กที่ยังไม่เข้าโรงเรียนประถมศึกษา", window: "ฟรี", web: "ฟรี", note: "ฟรี 2 คนต่อผู้ใหญ่ที่ซื้อบัตร 1 คน ตั้งแต่เด็กคนที่สามต้องซื้อบัตรราคาเด็กประถม เป็นเงื่อนไขที่ลานสกีกำหนด" },
];

const rentalRows = [
  { item: "ชุดอุปกรณ์สกี 3 ชิ้น (แผ่นสกี รองเท้าสกี และไม้โพลสกี)", adult: `1 วัน ${SKI_SET}`, child: "1 วัน ¥4,000 (เด็กระดับประถมศึกษาหรือต่ำกว่า)", note: "ค่าเช่า 2 วันผู้ใหญ่ ¥13,000 เด็ก ¥8,000 เท่ากับค่าเช่า 1 วันคูณสอง จึงไม่มีส่วนลดสำหรับเช่าหลายวัน" },
  { item: "ชุดอุปกรณ์สโนว์บอร์ด 2 ชิ้น (แผ่นสโนว์บอร์ดและรองเท้าสโนว์บอร์ด)", adult: `1 วัน ${SKI_SET}`, child: "1 วัน ¥4,000 (เด็กระดับประถมศึกษาหรือต่ำกว่า)", note: "ราคาเท่ากับชุดอุปกรณ์สกีในทุกกลุ่มอายุและทุกระยะเวลาเช่า" },
  { item: "ชุดเสื้อผ้าสกี (เสื้อและกางเกง)", adult: `1 วัน ${WEAR}`, child: "1 วัน ¥3,000 (เด็กระดับประถมศึกษาหรือต่ำกว่า)", note: "สิ่งที่นักท่องเที่ยวแบบไปเช้าเย็นกลับจากโตเกียวส่วนใหญ่ต้องใช้ แต่มักลืมรวมไว้ในงบ เพราะเสื้อโค้ตที่ใส่มาระหว่างเดินทางด้วยเครื่องบินใช้เล่นสกีไม่ได้" },
  { item: "แว่นสกีและหมวกกันน็อก", adult: "1 วัน แว่นสกี ¥1,800 หมวกกันน็อก ¥2,300", child: "ราคาเดียวกัน", note: "2 วัน ¥3,600 และ ¥4,600 เช่าแยกชิ้น ไม่รวมในชุดอุปกรณ์ ค่าเช่าอุปกรณ์ครบชุดจึงสูงกว่าสองรายการข้างต้น" },
  { item: "PICK UP BOX", adult: "เพิ่ม ¥1,000 ต่อคน", child: "เพิ่ม ¥1,000 ต่อคน", note: "บริการรับอุปกรณ์เช่าโดยไม่ต้องต่อคิวที่ลานสกีจัดให้ 7:30–12:00 น. เปิดจองออนไลน์ 1 เดือนก่อนวันเปิด และปิดรับจองเวลา 12:00 น. ของ 2 วันก่อนวันใช้บริการ ชำระล่วงหน้าด้วยบัตรเท่านั้น จำนวนจำกัด และยกเลิกหลังเที่ยงวันดังกล่าวเสียค่าธรรมเนียม 100% บริการนี้เปิดให้ใช้ตั้งแต่ 19 ธันวาคมถึง 31 มีนาคม" },
];

const mountainRows = [
  { what: "ลานสกีที่เปิดให้บริการ", detail: "12 จาก 16 เส้นทาง: โซนกลาง (Central Area) 5 เส้นทาง โซนเหนือ (North Area) 6 เส้นทาง และเส้นทางดาวน์ฮิลล์ Falcon" },
  { what: "โซนใต้", detail: "4 เส้นทางปิดตลอดฤดูกาล 2026-27 หน้าแผนที่ลานสกีของรีสอร์ตเขียนว่า 南エリアの営業を休止いたします (งดให้บริการโซนใต้)" },
  { what: "ระดับความยาก", detail: "ระดับเริ่มต้น 35% ระดับกลาง 45% ระดับสูง 20% อ้างอิงสัดส่วนของลานสกีทั้งหมดที่รีสอร์ตประกาศ" },
  { what: "ลิฟต์สกี", detail: "11 ตัว รวมกอนโดลา Diligence 8 ที่นั่งที่ออกจากอาคารสถานี" },
  { what: "เส้นทางสกีที่ยาวที่สุด", detail: "2,500 ม. เส้นทางดาวน์ฮิลล์ Falcon" },
  { what: "ความสูง", detail: "จุดสูงสุด 1,181 ม. จุดต่ำสุด 358 ม. พื้นที่ 70 เฮกตาร์ ความชันสูงสุด 33°" },
  { what: "เวลาเปิด", detail: "เวลาเปิดให้บริการในแต่ละวันสำหรับฤดูกาล 2026-27 ยังอยู่ระหว่างรอประกาศอย่างเป็นทางการ ตั้งแต่วันที่ 19 ธันวาคม จุดเช่าอุปกรณ์เปิดเวลา 7:30 น." },
];

const shapeRows = [
  {
    shape: "นั่งชินคันเซ็นไปเอง",
    covers: "รถไฟไป GALA Yuzawa ส่วนบัตรลิฟต์สกีและบริการเช่าอุปกรณ์จองได้ที่ลานสกีหรือทางออนไลน์",
    verdict: "เหมาะสำหรับนักท่องเที่ยวส่วนใหญ่ และได้เวลาเล่นหิมะมากที่สุด",
    note: `ขบวนที่เร็วที่สุดใช้เวลา ${FASTEST} และสถานีอยู่ในอาคาร สิ่งที่ต้องแลกคือคุณต้องจัดการเองสี่รายการ ได้แก่ ตั๋วรถไฟ บัตรลิฟต์สกี อุปกรณ์สกี และชุดเสื้อผ้าสกี และ GALA Yuzawa ขายบัตรทุกแบบที่เคาน์เตอร์แพงกว่าออนไลน์อย่างน้อย ¥500`,
  },
  {
    shape: "ชินคันเซ็นและพาสของ JR East",
    covers: "ใช้ TOKYO Wide Pass หรือ JR EAST PASS สำหรับการเดินทางด้วยรถไฟ",
    verdict: "ควรคำนวณเฉพาะเมื่อ GALA Yuzawa เป็นหนึ่งในทริปวันเดียว 2 ถึง 3 ทริป ถ้าไปที่นี่ที่เดียวไม่คุ้มค่า",
    note: `พาสราคา ${PASS_ADULT} สำหรับ 3 วันติดกัน ตัวอย่างของ JR East (ไปกลับ GALA Yuzawa และไปกลับนิกโก้ แบบระบุที่นั่ง) รวม ${JR_EXAMPLE} ค่าเดินทางไป-กลับ GALA Yuzawa เพียงทริปเดียวยังไม่ถึงราคาพาส`,
  },
  {
    shape: "ทัวร์รถบัสวันเดียวจากโตเกียว",
    covers: "จองรถบัสไป-กลับอิวัปปาระได้ในครั้งเดียว พร้อมเลือกเพิ่มการเล่นหิมะ เช่าอุปกรณ์ หรือคอร์สเรียนสกี ไม่รวมอาหาร",
    verdict: "เหมาะสำหรับการเล่นสกีครั้งแรก หรือผู้ที่ต้องการจองทุกอย่างในครั้งเดียวแทนการจองแยกสี่รายการ",
    note: "ใช้เวลาเดินทางแต่ละเที่ยวนานกว่าชินคันเซ็น และไม่ได้ไป GALA Yuzawa แต่ไปลานสกีข้างเคียงในพื้นที่เดียวกัน ข้อดีของทัวร์นี้คือไม่ต้องจัดการอะไรเพิ่มในเช้าวันเดินทาง",
  },
  {
    shape: "บริการรถส่วนตัวแบบเหมาคัน",
    covers: "บริการรับ-ส่งระหว่างที่พักกับ GALA Yuzawa หรือนาเอบะ เลือกลานสกีตอนจอง",
    verdict: "เหมาะสำหรับผู้ที่เดินทางเป็นกลุ่ม ครอบครัวที่มีเด็กเล็ก หรือผู้ที่ต้องการออกเดินทางก่อนรถไฟขบวนแรก",
    note: "คิดราคาต่อคันไม่ใช่ต่อคน เมื่อเดินทางกัน 4 คน ค่าใช้จ่ายจึงไม่สูงเกินไป และเป็นวิธีเดียวที่วางอุปกรณ์ไว้ท้ายรถได้ ไม่ต้องแบกผ่านสถานีโตเกียว",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "เดินทางจากโตเกียวไป GALA Yuzawa อย่างไร",
    a: `นั่งชินคันเซ็นสายโจเอ็ตสึ (ขบวน Tanigawa) จากสถานีโตเกียวตรงไปสถานี GALA Yuzawa ขบวนที่เร็วที่สุดใช้เวลา ${FASTEST} ไม่ต้องต่อรถ เพราะสถานีตั้งอยู่ภายในอาคารศูนย์บริการของลานสกี และขึ้นกอนโดลาได้จากอาคารเดียวกัน รถไฟขบวนตรงให้บริการเฉพาะฤดูกาล ตั้งแต่ 12 ธันวาคม 2026 ที่รีสอร์ตเริ่มเปิด JR East ขยายเส้นทางเดินรถของขบวน Tanigawa ที่ให้บริการตามปกติไปถึง GALA Yuzawa พร้อมเพิ่มขบวนพิเศษ หากรถไฟที่คุณโดยสารมีปลายทางที่เอจิโกะยูซาวะ หรือเดินทางนอกฤดูกาล ให้ต่อรถรับส่งฟรีของรีสอร์ต ใช้เวลาประมาณ 10 นาที ทางเลือกอื่นคือทัวร์รถบัสวันเดียวจากโตเกียว (ไปอิวัปปาระ ลานสกีข้างเคียงในยูซาวะ) หรือบริการรถส่วนตัวแบบเหมาคัน ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "นั่งชินคันเซ็นจากโตเกียวไป GALA Yuzawa ใช้เวลากี่นาที",
    a: `ขบวนที่เร็วที่สุดใช้เวลา ${FASTEST} ตามข้อมูลของทั้งรีสอร์ตและ JR East ประกาศรถไฟฤดูหนาวของ JR East วันที่ 22 ตุลาคม 2026 ระบุว่ารถไฟขบวน Tanigawa 71 ออกจากโตเกียวเวลา 6:24 น. และถึง GALA Yuzawa เวลา 7:35 น. และขากลับ Tanigawa 86 GALA Yuzawa 17:04 → โตเกียว 18:20 หน้าแนะนำของ JR East ยังระบุว่าขบวน Tanigawa ใช้เวลาประมาณ 1 ชั่วโมง 20 นาที จึงควรเผื่อเวลา 71 ถึง 80 นาทีต่อเที่ยว ใน 4 คืนที่เปิดให้เล่นสกีตอนกลางคืน Tanigawa 198 ออกจาก GALA Yuzawa 20:19 ถึงโตเกียว 21:40 ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "ใช้ JR Pass ไป GALA Yuzawa ได้ไหม",
    a: `ได้ JAPAN RAIL PASS สำหรับเดินทางทั่วญี่ปุ่นใช้กับชินคันเซ็นทุกสายของกลุ่ม JR ได้ ยกเว้น NOZOMI และ MIZUHO จึงใช้กับชินคันเซ็นสายโจเอ็ตสึไป GALA Yuzawa ได้ (หากใช้ Gran Class ต้องชำระเพิ่ม) พาสสำหรับตู้โดยสารธรรมดาแบบ 7 วัน ราคา ${JRP_7DAY} เมื่อซื้อออนไลน์ JR TOKYO Wide Pass (${PASS_ADULT} 3 วันติดกัน) และ JR EAST PASS (${EAST_PASS_5DAY} 5 วัน) ก็ใช้ได้ และ JR East ระบุให้ GALA Yuzawa เป็นหนึ่งในจุดหมายที่ไปได้ด้วย Wide Pass การเดินทางไป-กลับ GALA Yuzawa เพียงทริปเดียวไม่คุ้มกับการซื้อ Wide Pass ตัวอย่างของ JR East คือไปกลับ GALA Yuzawa และไปกลับนิกโก้รวม ${JR_EXAMPLE} ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "GALA Yuzawa เปิดฤดูกาล 2026-27 เมื่อไร",
    a: `ลานสกีเปิด ${SLOPES_OPEN} และมีกำหนดเปิดถึง ${SLOPES_CLOSE} ช่วง ${SIGHTSEEING_OPEN} ถึง 18 ธันวาคม 2026 เปิดเฉพาะกอนโดลาและลิฟต์ชมวิว เล่นสกีไม่ได้ไม่ว่าหิมะจะมากแค่ไหน ชินคันเซ็นขบวนตรงเริ่มให้บริการพร้อมการเปิดรีสอร์ตในวันที่ 12 ธันวาคม เวลาเปิดให้บริการในแต่ละวันสำหรับฤดูกาล 2026-27 ยังอยู่ระหว่างรอประกาศอย่างเป็นทางการ และ GALA Yuzawa ระบุว่าวันและเวลาเปิดให้บริการอาจเปลี่ยนตามปริมาณหิมะและสภาพอากาศ ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "GALA Yuzawa เหมาะกับมือใหม่หรือคนที่ไม่เล่นสกีไหม",
    a: `เหมาะสำหรับทั้งสองกลุ่ม 35% ของเส้นทางสกีเป็นเส้นทางสำหรับผู้เริ่มต้น จุดเช่าอุปกรณ์ตั้งอยู่ในอาคารสถานี และจองคอร์สเรียนสกีที่สอนเป็นภาษาอังกฤษได้ คนที่ไม่เล่นสกีซื้อบัตรกอนโดลาและลิฟต์ Barouche (ออนไลน์ ¥5,500 เคาน์เตอร์ ¥6,500) เพื่อเข้าลานเล่นหิมะบริเวณสถานีกอนโดลาด้านบน เช่าเลื่อนหิมะ ${SLED} และขึ้นลิฟต์ชมวิว Barouche ไปจุดชมวิวเทือกเขาทานิงาวะ (Tanigawa) ได้ สิ่งที่ต้องทราบสำหรับฤดูกาล 2026-27 คือโซนใต้ปิด จึงเปิดให้เล่น 12 จาก 16 เส้นทาง ตรวจสอบเมื่อ ${OWN}`,
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "รถไฟ",
    label: "ตั๋วชินคันเซ็นโตเกียว → GALA Yuzawa",
    ctaLabel: "ดูรถไฟโตเกียว → GALA Yuzawa →",
    url: TRAIN_URL,
    why: "บัตรลิฟต์สกีไม่รวมการเดินทาง จองที่นั่งชินคันเซ็นขบวน Tanigawa ที่วิ่งตรงจากโตเกียวหรืออุเอโนะตามวันเดินทาง แล้วใช้ QR Code ขึ้นรถ",
  },
  {
    kind: "พาสรถไฟ",
    label: "JR TOKYO Wide Pass (3 วันติดกัน)",
    ctaLabel: "ดู TOKYO Wide Pass →",
    url: WIDE_URL,
    why: "JR East ระบุว่าพาสนี้ใช้กับชินคันเซ็นไป GALA Yuzawa ได้ หากมีทริปแบบไปเช้าเย็นกลับอีกหนึ่งทริปภายใน 3 วันดังกล่าว ควรเปรียบเทียบค่าเดินทาง",
  },
  {
    kind: "eSIM",
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดูตัวเลือก eSIM บน Klook →",
    url: ESIM_URL,
    why: "GALA Yuzawa ระบุว่าวันและเวลาเปิดให้บริการเปลี่ยนตามปริมาณหิมะและสภาพอากาศ และหน้าสินค้า Klook ขอให้แสดงใบยืนยันการจองบัตรลิฟต์สกีบนโทรศัพท์ที่ต่ออินเทอร์เน็ตได้",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดูตัวเลือก eSIM บน Klook →",
    url: ESIM_URL,
    why: "GALA Yuzawa ระบุว่าวันและเวลาเปิดให้บริการเปลี่ยนตามปริมาณหิมะและสภาพอากาศ และยังไม่มีประกาศเวลาเปิดให้บริการในแต่ละวันสำหรับฤดูกาล 2026-27 ที่สถานีที่เปิดเฉพาะฤดูกาล คุณจะได้รับข้อมูลการปิดลานสกีหรือชินคันเซ็นล่าช้าผ่านโทรศัพท์มือถือเท่านั้น",
  },
  {
    label: "ตั๋วไปกลับ Narita Express (N'EX)",
    ctaLabel: "ดูตั๋วไปกลับ N'EX →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "ไปถึงสถานีโตเกียว ซึ่งเป็นจุดออกของชินคันเซ็นสายโจเอ็ตสึไป GALA Yuzawa ถ้าเริ่มใช้ TOKYO Wide Pass ตั้งแต่วันที่เดินทางถึงญี่ปุ่น ก็ไม่ต้องซื้อตั๋ว N'EX แยก เพราะ JR East ระบุว่าพาสนี้ใช้กับที่นั่งแบบระบุที่นั่งของ N'EX ได้",
  },
  {
    label: "รถบัสลีมูซีนสนามบินฮาเนดะ – โตเกียว",
    ctaLabel: "ดูรถบัสลีมูซีน →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "สำหรับสนามบินฮาเนดะ ขึ้นรถด้วย QR code มีประโยชน์ถ้าเดินทางถึงพร้อมกระเป๋าสกี เพราะยังต้องนำสัมภาระไปไว้ที่โรงแรมในโตเกียวก่อนขึ้นรถไฟไปทางเหนือ",
  },
  {
    label: "JR TOKYO Wide Pass (3 วันติดกัน)",
    ctaLabel: "ดู TOKYO Wide Pass →",
    url: WIDE_URL,
    why: "พาสที่ควรเปรียบเทียบค่าเดินทางก่อนซื้อ ตัวอย่างของ JR East คือค่าเดินทางไป-กลับ GALA Yuzawa และนิกโก้แบบระบุที่นั่งรวมประมาณ ¥21,500 เทียบกับพาส ¥16,000 สำหรับ 3 วันติดกัน ไป GALA Yuzawa และทริปวันเดียวอีกหนึ่งทริปจึงเริ่มคุ้มค่า",
  },
  {
    label: "ตั๋วชินคันเซ็นโตเกียว → GALA Yuzawa",
    ctaLabel: "ดูรถไฟโตเกียว → GALA Yuzawa →",
    url: TRAIN_URL,
    why: "สำหรับผู้ที่เดินทางไป GALA Yuzawa โดยไม่ใช้พาส จองที่นั่งชินคันเซ็นขบวน Tanigawa ที่วิ่งตรงจากโตเกียวหรืออุเอโนะตามวันเดินทาง แล้วใช้ QR Code ขึ้นรถ ขบวนพิเศษช่วงเช้า Tanigawa 71 (โตเกียว 6:24) วิ่งเฉพาะบางวันหยุดสุดสัปดาห์และวันหยุดนักขัตฤกษ์ในเดือนมกราคมและกุมภาพันธ์ จึงควรตรวจสอบวันเดินรถก่อนวางแผนเดินทางด้วยขบวนนี้",
  },
  {
    label: "บัตรลิฟต์สกี GALA Yuzawa",
    ctaLabel: "ดูบัตรลิฟต์สกี GALA Yuzawa →",
    url: LIFT_URL,
    why: "บัตรกอนโดลาและลิฟต์สกี 1 วันของ GALA Yuzawa ราคาผู้ใหญ่ที่เคาน์เตอร์ ¥8,000 และออนไลน์ ¥7,500 ซื้อล่วงหน้าจึงประหยัด ¥500 เว็บไซต์ตัวแทนจำหน่ายรองรับบัตรที่ออกในต่างประเทศและมีหน้าจองภาษาไทย",
  },
  {
    label: "คอร์สเรียนสกี 1 วันที่ GALA Yuzawa",
    ctaLabel: "ดูคอร์สเรียนสกี GALA Yuzawa →",
    url: LESSON_URL,
    why: "รายการที่มือใหม่มักลืม ที่ GALA Yuzawa บัตรลิฟต์สกี อุปกรณ์เช่า และคอร์สเรียนสกีต้องซื้อแยกกัน และหน้าสินค้าระบุว่ายังต้องซื้อบัตรลิฟต์สกีเพิ่มจากคอร์สเรียน",
  },
];

const tourPicks = [
  withKlookLocale(yuzawaIwapparaSkiDayTourTokyo, LOCALE, {
    title: "ทัวร์เล่นหิมะและสกีวันเดียวที่ลานสกีอิวัปปาระ ยูซาวะ จากโตเกียว",
    desc: "รถบัสไปกลับจากโตเกียวถึงอิวัปปาระในพื้นที่เอจิโกะยูซาวะ เลือกเล่นหิมะ เล่นสกี เช่าอุปกรณ์ และคอร์สเรียนสกีได้ในการจองครั้งเดียว",
  }),
  withKlookLocale(galaNaebaSkiDayTripTokyo, LOCALE, {
    title: "ทริปวันเดียวไปลานสกี GALA Yuzawa หรือนาเอบะจากโตเกียว",
    desc: "ทริปวันเดียวช่วงฤดูหนาวจากโตเกียวไปลานสกีในยูซาวะด้วยบริการรถส่วนตัวแบบเหมาคัน เลือกลานสกีตอนจอง",
  }),
  withKlookLocale(hakubaSkiResortDayTourTokyo, LOCALE, {
    title: "ทัวร์วันเดียวลานสกีฮาคุบะ นากาโน่ จากโตเกียว",
    desc: "ทริปวันเดียวจากโตเกียวไปหุบเขาฮาคุบะ เลือกได้ 4 ลานสกี รวมบัตรลิฟต์สกีและอุปกรณ์เช่าในการจอง",
  }),
  withKlookLocale(galaYuzawaSkiLesson, LOCALE, {
    title: "คอร์สเรียนสกี 1 วันที่ GALA Yuzawa",
    desc: "เรียนสกีหรือสโนว์บอร์ด 3 ถึง 6 ชั่วโมงที่ GALA Yuzawa กับครูสอนสกีที่พูดภาษาจีนหรือภาษาอังกฤษ จองแยกจากบัตรลิฟต์สกี และหน้าสินค้าระบุว่ายังต้องซื้อบัตรลิฟต์สกีเพิ่ม",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "สกี GALA Yuzawa วันเดียว" }];

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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
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

function Sources({ children }: { children: ReactNode }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      ตรวจสอบล่าสุด: {OWN_ISO} แหล่งข้อมูล: {children}
    </p>
  );
}

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {label}
  </a>
);

export default function ThGalaYuzawaSkiDayTripPage({ updated }: { updated: PageUpdated }) {
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
            ลานสกีแห่งเดียวในญี่ปุ่นที่มีสถานีชินคันเซ็นอยู่ภายในรีสอร์ต ลานสกีเปิด {SLOPES_OPEN} และโซนใต้ (South Area) ปิดตลอดฤดูกาลนี้
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ตารางเดินรถชินคันเซ็นจาก JR East โดยตรง", "เงื่อนไข JR Pass", "ราคาฤดูกาล 2026-27 จาก GALA Yuzawa โดยตรง"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <WinterBookingTop
          heading="ทริปวันเดียวไป GALA Yuzawa จากโตเกียวที่จองได้ตอนนี้"
          checkedIso={OWN_ISO}
          tours={[
            {
              title: "บัตรลิฟต์สกี GALA Yuzawa",
              url: LIFT_URL,
              price: null,
              duration: "เล่นสกี 1 วัน (ต้องจองตั๋วชินคันเซ็นแยก)",
              departs: "สถานี GALA Yuzawa ภายในรีสอร์ต",
            },
            {
              title: "ทริปวันเดียวไปลานสกี GALA Yuzawa หรือนาเอบะจากโตเกียว",
              url: CHARTER_URL,
              price: null,
              duration: "บริการรถส่วนตัวแบบเหมาคัน 10 ชั่วโมง",
              departs: "โรงแรมใน 23 เขตของโตเกียว",
            },
            {
              title: "คอร์สเรียนสกี 1 วันที่ GALA Yuzawa",
              url: LESSON_URL,
              price: null,
              duration: "3 ถึง 6 ชั่วโมง",
              departs: "นัดพบที่ GALA Yuzawa",
            },
          ]}
          deadline={
            <>
              หากวางแผนไปตั้งแต่วันเปิดฤดูกาลสกี 19 ธันวาคมจนถึงช่วงปีใหม่ ควรจองภายใน 30 พฤศจิกายน ช่วง 12 ถึง 18 ธันวาคมเปิดเฉพาะกอนโดลา
              เล่นสกีไม่ได้ ถ้าไปเดือนมกราคมหรือกุมภาพันธ์ ควรจองล่วงหน้าอย่างน้อย 3 สัปดาห์ ณ วันที่ 15 พฤศจิกายน แพ็กเกจชินคันเซ็นพร้อมบัตรลิฟต์สกี
              JR SKISKI ของ JR East ยังขึ้นว่า &ldquo;Coming Soon&rdquo; และคาดว่าจะเปิดจองกลางเดือนพฤศจิกายน ส่วน GALA Yuzawa
              เปิดให้จอง PICK UP BOX ล่วงหน้า 1 เดือนก่อนเปิดฤดูกาลสกี
            </>
          }
          primaryCta="ดูวันที่และราคาบัตรลิฟต์สกี GALA Yuzawa บน Klook →"
          primaryNote={
            <>
              เลือกวันที่ต้องการเล่นสกีบนหน้าสินค้าเพื่อตรวจสอบราคาและวันว่าง ลานสกีของ GALA Yuzawa เปิด {SLOPES_OPEN} และยังไม่มีประกาศเวลาเปิดให้บริการในแต่ละวัน
              สำหรับฤดูกาล 2026-27
            </>
          }
        />

        <KlookSameDayCards heading="บริการที่ควรจองสำหรับทริปไป GALA Yuzawa" cards={sameDayCards} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปข้อมูลสำคัญ</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>จากสถานีโตเกียว</p>
                <p className={styles.verdictStatValue}>{FASTEST} ไม่ต้องต่อรถ</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ลานสกีเปิด</p>
                <p className={styles.verdictStatValue}>19 ธ.ค. 2026 – 5 พ.ค. 2027</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>บัตรลิฟต์สกี 1 วัน</p>
                <p className={styles.verdictStatValue}>เคาน์เตอร์ {LIFT_WINDOW} / ออนไลน์ {LIFT_WEB}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass / Wide Pass / JR EAST PASS</p>
                <p className={styles.verdictStatValue}>ใช้ไป GALA Yuzawa ได้ทั้งหมด</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              จากโตเกียว<strong>นั่งชินคันเซ็นสายโจเอ็ตสึจากสถานีโตเกียวไปสถานี GALA Yuzawa ได้โดยตรง ขบวนที่เร็วที่สุดใช้เวลา{" "}
              {FASTEST}</strong> (Tanigawa 71 ของ JR East ออกจากโตเกียว 6:24 ถึง 7:35) โดยสถานีตั้งอยู่ภายในอาคารศูนย์บริการของลานสกี แต่รถไฟขบวนตรงให้บริการเฉพาะฤดูหนาว
              เริ่ม <strong>{SIGHTSEEING_OPEN}</strong> <strong>ลานสกีของ GALA Yuzawa เปิด {SLOPES_OPEN}</strong> ถึง {SLOPES_CLOSE}{" "}
              ส่วน 12 ถึง 18 ธันวาคมเปิดเฉพาะกอนโดลาชมวิว <strong>JAPAN RAIL PASS</strong> (7 วัน ออนไลน์ {JRP_7DAY}){" "}
              <strong>JR TOKYO Wide Pass</strong> ({PASS_ADULT} 3 วัน) และ <strong>JR EAST PASS</strong> ({EAST_PASS_5DAY} 5 วัน)
              ใช้กับรถไฟในเส้นทางนี้ได้ทั้งหมด และทริปแบบไปเช้าเย็นกลับสำหรับผู้ที่ไม่ได้นำอุปกรณ์มาเอง มีค่าใช้จ่ายที่ลานสกีเพิ่ม <strong>¥19,500</strong> ตามราคาออนไลน์ของ GALA
              Yuzawa (บัตรลิฟต์สกี {LIFT_WEB} ชุดอุปกรณ์สกี {SKI_SET} ชุดเสื้อผ้าสกี (เสื้อและกางเกง) {WEAR}) ตรวจสอบเมื่อ {OWN} จากเว็บไซต์ของ GALA Yuzawa และ
              JR East เวลาเปิดให้บริการในแต่ละวันสำหรับฤดูกาล 2026-27 ยังอยู่ระหว่างรอประกาศอย่างเป็นทางการ
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                บัตรลิฟต์สกี GALA Yuzawa →
              </KlookLink>
              <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ทัวร์สกีวันเดียวจากโตเกียว →
              </KlookLink>
              <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                รถไฟโตเกียว → GALA Yuzawa →
              </KlookLink>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูราคา TOKYO Wide Pass →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                คอร์สเรียนสกี GALA Yuzawa →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="สิ่งที่ควรจองสำหรับทริปนี้"
          heading="ทริปวันเดียวไป GALA Yuzawa ต้องจองอะไรบ้าง"
          intro="เริ่มจากอินเทอร์เน็ตมือถือและการเดินทางจากสนามบิน จากนั้นจองพาส แล้วจึงเป็นรายการที่ GALA Yuzawa ขายแยก ผู้ที่ไปเล่นสกีแบบไปเช้าเย็นกลับครั้งแรกมักจองบัตรลิฟต์สกีและคอร์สเรียนสกีไม่ครบ ราคาบน Klook เปลี่ยนตามวันที่ จึงควรเปิดหน้าสินค้าตามวันเดินทางของคุณ"
          items={tripPrepItems}
        />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="yuzawa" />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>เดินทางจากโตเกียวไป GALA Yuzawa อย่างไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>นั่งชินคันเซ็นสายโจเอ็ตสึขบวน Tanigawa ที่วิ่งตรงจากสถานีโตเกียวไป GALA Yuzawa</strong> ขบวนที่เร็วที่สุดใช้เวลา {FASTEST} ไม่ต้องต่อรถ
            และออกจากประตูตรวจตั๋วก็ถึงศูนย์บริการของลานสกีทันที รถไฟขบวนตรงให้บริการเฉพาะฤดูกาล เริ่ม {SIGHTSEEING_OPEN} ทางเลือกสำรองคือนั่งชินคันเซ็นไปเอจิโกะยูซาวะแล้วต่อรถรับส่งฟรี
            10 นาทีของ GALA Yuzawa ส่วนทางเลือกที่ช้ากว่าคือทัวร์รถบัสวันเดียวหรือบริการรถส่วนตัวแบบเหมาคัน
          </p>
          <Table
            head={["เส้นทาง", "เวลา", "ขบวนรถ / ช่วงเวลาให้บริการ", "ค่าใช้จ่าย", "ข้อควรรู้"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.trains, r.cost, r.note])}
          />
          <Sources>
            {ext("https://gala.co.jp/winter/access/", "gala.co.jp/winter/access/")},{" "}
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "ประกาศรถไฟฤดูหนาวของ JR East (22 ต.ค. 2026)")},{" "}
            {ext("https://www.jreast.co.jp/en/multi/destinations/gala.html", "หน้าแนะนำ GALA Yuzawa ของ JR East")} หน้านี้ไม่ได้ระบุค่าโดยสารเที่ยวเดียว
            เพราะ JR East ปรับค่าโดยสารเมื่อ 14 มีนาคม 2026 และราคาตามวันเดินทางจะแสดงในหน้าชำระเงิน เวลาของทัวร์รถบัสและบริการรถส่วนตัวแบบเหมาคันมาจากหน้าสินค้าของ Klook
          </Sources>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>สิ่งที่ต้องตรวจสอบตามวันเดินทาง</strong> คือขบวนที่ต้องการวิ่งถึง GALA Yuzawa ในวันเดินทางหรือไม่ ขบวนพิเศษช่วงเช้า Tanigawa 71
            วิ่งเฉพาะบางวันหยุดสุดสัปดาห์และวันหยุดนักขัตฤกษ์ในเดือนมกราคมและกุมภาพันธ์ จองที่นั่งตามวันที่ หรือถ้า GALA Yuzawa เป็นหนึ่งในทริปวันเดียวสองทริป
            ให้ดูราคาพาสใน
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              คู่มือ JR Tokyo Wide Pass (ภาษาอังกฤษ)
            </Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRAIN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ชินคันเซ็นโตเกียว → GALA Yuzawa →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์รถบัสสกีวันเดียวจากโตเกียว →
            </KlookLink>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              บัตรลิฟต์สกี GALA Yuzawa →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ระยะเวลาเดินทาง</span>
          <h2 className={styles.sectionTitle}>นั่งชินคันเซ็นจากโตเกียวไป GALA Yuzawa ใช้เวลากี่นาที</h2>
          <p className={styles.bodyText}>
            <strong>ขบวนที่เร็วที่สุดใช้เวลา {FASTEST} โดยทั่วไปประมาณ 71 ถึง 80 นาที</strong> ประกาศของ JR East วันที่ 22 ตุลาคม 2026 ระบุว่า
            รถไฟขบวน Tanigawa 71 ออกจากโตเกียวเวลา 6:24 น. และถึง GALA Yuzawa เวลา 7:35 น. และขากลับ Tanigawa 86 GALA Yuzawa 17:04 → โตเกียว 18:20 ส่วนหน้าแนะนำ GALA Yuzawa ของ
            JR East ระบุว่าขบวน Tanigawa ใช้เวลาประมาณ 1 ชั่วโมง 20 นาที ถ้าเล่นสกีกลางคืน Tanigawa 198 ออกจาก GALA Yuzawa 20:19 ถึงโตเกียว
            21:40 ในวันที่ 16 และ 30 มกราคม และ 13 และ 27 กุมภาพันธ์ 2027 ตรวจสอบเมื่อ {OWN}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ค่าใช้จ่ายทั้งวัน</span>
          <h2 className={styles.sectionTitle}>ทริปวันเดียวไป GALA Yuzawa ใช้เงินเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>ผู้ใหญ่ที่ไม่ได้นำอุปกรณ์มาเองมีค่าใช้จ่ายที่ลานสกีประมาณ ¥19,500 บวกค่ารถไฟ</strong> ตามราคาออนไลน์ 2026-27 จาก GALA Yuzawa โดยตรง
            สำหรับผู้ที่ไม่เล่นสกี ค่าเล่นหิมะรวมค่าเช่าเลื่อนหิมะอยู่ที่ ¥8,000
          </p>
          <Table head={["รายการ", "ราคา", "ข้อควรรู้"]} rows={costRows.map((r) => [r.item, r.price, r.note])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "ราคาบัตรลิฟต์สกี GALA Yuzawa")},{" "}
            {ext("https://gala.co.jp/winter/rental/", "อุปกรณ์เช่า")},{" "}
            {ext("https://gala.co.jp/winter/activities/", "กิจกรรม")},{" "}
            {ext("https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html", "ราคาพาสของ JR East")},{" "}
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "เว็บไซต์ท่องเที่ยวของ JR East (SPA GALA no Yu)")}
          </Sources>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              บัตรลิฟต์สกี GALA Yuzawa →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ฤดูกาล</span>
          <h2 className={styles.sectionTitle}>GALA Yuzawa เปิดฤดูกาล 2026-27 เมื่อไร</h2>
          <p className={styles.bodyText}>
            <strong>ลานสกีเปิด {SLOPES_OPEN} และมีกำหนดเปิดถึง {SLOPES_CLOSE}</strong> ในสัปดาห์ก่อนเปิดฤดูกาลสกี ตั้งแต่ {SIGHTSEEING_OPEN} ถึง 18 ธันวาคม 2026
            เปิดให้บริการสำหรับการชมวิวเท่านั้น มีกอนโดลาและลิฟต์ชมวิว แต่เล่นสกีและสโนว์บอร์ดไม่ได้ไม่ว่าหิมะจะมากแค่ไหน และชินคันเซ็นขบวนตรงเริ่มให้บริการในวันที่ 12 ธันวาคมเช่นกัน
            GALA Yuzawa ระบุว่าช่วงเวลาและรูปแบบการเปิดอาจเปลี่ยนตามปริมาณหิมะและสภาพอากาศ หากจองทริปช่วง 12 ถึง 18 ธันวาคมโดยตั้งใจจะเล่นสกี
            คุณจะได้เพียงขึ้นกอนโดลาเท่านั้น
          </p>
          <Table head={["2026-27", "วันที่"]} rows={seasonRows.map((r) => [r.what, r.detail])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "gala.co.jp/winter/hours-pricing/")},{" "}
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR East (22 ต.ค. 2026)")},{" "}
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "เว็บไซต์ท่องเที่ยวของ JR East")}
          </Sources>
          <div style={{ marginTop: "1.25rem" }}>
            <Table head={["ข้อมูลลานสกี", `GALA Yuzawa 2026-27 (ตรวจสอบ ${OWN})`]} rows={mountainRows.map((r) => [r.what, r.detail])} />
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            เส้นทางสกี ระดับความยาก ลิฟต์สกี ความสูง และการปิดโซนใต้ มาจากหน้าแผนที่ลานสกีของ GALA Yuzawa โดยตรง (
            {ext("https://gala.co.jp/winter/gelande/", "gala.co.jp/winter/gelande/")}) ตรวจสอบเมื่อ {OWN}{" "}
            <strong>การปิดโซนใต้มีผลเฉพาะฤดูกาล 2026-27</strong> คู่มือเที่ยวที่เขียนไว้ก่อนหน้านี้จะไม่มีข้อมูลนี้
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>บัตรลิฟต์สกี</span>
          <h2 className={styles.sectionTitle}>บัตรลิฟต์สกี GALA Yuzawa ราคาเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>บัตรผู้ใหญ่ 1 วัน ราคา {LIFT_WINDOW} ที่เคาน์เตอร์ และ {LIFT_WEB} เมื่อซื้อออนไลน์</strong> บัตรทุกประเภทที่ GALA Yuzawa ขายมีราคาออนไลน์ต่ำกว่าที่เคาน์เตอร์อย่างน้อย ¥500
            การซื้อล่วงหน้าจึงเป็นวิธีประหยัดที่ง่ายที่สุดสำหรับทริปนี้ บัตรที่ช่วยประหยัดได้จริงมีสองประเภท และบัตร 4 ชั่วโมงไม่ใช่หนึ่งในนั้น
          </p>
          <Table head={["ประเภทบัตร", "เคาน์เตอร์", "ออนไลน์", "ข้อควรรู้"]} rows={liftRows.map((r) => [r.ticket, r.window, r.web, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            ทุกราคามาจากตารางราคา 2026-27 ของ GALA Yuzawa โดยตรง ตรวจสอบเมื่อ {OWN} &ldquo;เด็กประถม&rdquo; คือกลุ่ม 小学生 ของรีสอร์ต
            ตรวจสอบอีกครั้งในหน้าชำระเงิน บัตรราคาพิเศษ ¥4,300 จำนวน 1,000 ใบที่ GALA Yuzawa เปิดขายตั้งแต่ 5 ตุลาคม 2026 ขึ้นว่าขายหมดแล้ว
            ราคาที่ซื้อได้ในขณะนี้จึงเป็นราคาออนไลน์ข้างต้น
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LIFT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              บัตรลิฟต์สกี GALA Yuzawa →
            </KlookLink>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              คอร์สเรียนสกีและสโนว์บอร์ด GALA Yuzawa →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เช่าอุปกรณ์</span>
          <h2 className={styles.sectionTitle}>เช่าอุปกรณ์สกีที่ GALA Yuzawa ได้ไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ได้ และจุดเช่าอยู่ในอาคารเดียวกับสถานี จึงเดินทางจากโตเกียวมาเล่นสกีแบบไปเช้าเย็นกลับได้โดยไม่ต้องนำอุปกรณ์มาเอง สิ่งที่ควรรู้ก่อนคำนวณค่าใช้จ่ายทั้งหมดคือ GALA Yuzawa
            คิด<strong>ค่าเช่าอุปกรณ์สกีและชุดเสื้อผ้าสกีแยกกัน</strong> และต้องเช่าแว่นสกีและหมวกกันน็อกแยกต่างหาก
          </p>
          <Table
            head={["รายการ", "นักเรียนระดับมัธยมต้นขึ้นไป", "เด็กระดับประถมศึกษาหรือต่ำกว่า", "ข้อควรรู้"]}
            rows={rentalRows.map((r) => [r.item, r.adult, r.child, r.note])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>คำนวณค่าใช้จ่ายทั้งหมดก่อนจอง</strong> ผู้ใหญ่ที่ไม่ได้นำอุปกรณ์มาเองและซื้อบัตรกอนโดลาและลิฟต์สกี 1 วันแบบออนไลน์จ่าย {LIFT_WEB} ชุดอุปกรณ์สกี{" "}
            {SKI_SET} และชุดเสื้อผ้าสกี {WEAR} ยังไม่รวมแว่นสกี หมวกกันน็อก ชินคันเซ็น หรืออาหารกลางวัน เมื่อรวมค่าใช้จ่ายแล้ว จึงควรเปรียบเทียบสินค้า Klook ในหน้านี้กับการซื้อแยกที่เคาน์เตอร์
            และ PICK UP BOX ราคา ¥1,000 เป็นบริการเสริมเดียวที่เห็นประโยชน์ชัดเจน คือไม่ต้องเสียเวลารอที่จุดเช่าอุปกรณ์ ทุกราคาจาก GALA Yuzawa โดยตรง ตรวจสอบเมื่อ {OWN}
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>มือใหม่</span>
          <h2 className={styles.sectionTitle}>GALA Yuzawa เหมาะกับมือใหม่หรือคนที่ไม่เล่นสกีไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            เหมาะสำหรับทั้งสองกลุ่ม <strong>35% ของเส้นทางสกีเป็นเส้นทางสำหรับผู้เริ่มต้น</strong> และขึ้นกอนโดลาจากอาคารสถานีไปยังพื้นที่สำหรับผู้เริ่มต้นได้ คนที่ไม่เล่นสกีใช้บัตรกอนโดลาและ
            ลิฟต์ Barouche ซึ่งถูกกว่า เพื่อเข้าลานเล่นหิมะและลานเลื่อนหิมะบริเวณสถานีกอนโดลาด้านบนได้ สิ่งที่ต้องทราบสำหรับฤดูกาลนี้คือ โซนใต้ปิด พื้นที่เล่นสกีจึงเล็กกว่าที่ระบุในคู่มือท่องเที่ยวฉบับก่อน ๆ
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>สำหรับคนที่ไม่เล่นสกี</p>
              <p className={styles.whoForDesc}>
                บัตรกอนโดลาและลิฟต์ Barouche (ออนไลน์ ¥5,500 เคาน์เตอร์ ¥6,500) ใช้กับกอนโดลา ลานเล่นหิมะที่สถานีกอนโดลาด้านบน และลิฟต์ชมวิว Barouche ไปจุดชมวิว
                ระฆังแห่งความรัก (Ai no Kane / 愛の鐘) ซึ่งชมวิวเทือกเขาทานิงาวะได้ (10:00–16:00 น. ประมาณ 30 นาที) เช่าเลื่อนหิมะที่สถานีกอนโดลาด้านบน {SLED} ลานเล่นหิมะเปิด
                8:30–16:00 น. เมื่อสภาพอากาศเอื้ออำนวย เด็กที่ยังไม่เข้าโรงเรียนประถมศึกษาขึ้นกอนโดลาฟรี ข้อมูลจากหน้ากิจกรรมของ GALA Yuzawa ตรวจสอบเมื่อ {OWN}{" "}
                ถ้าอยากเล่นเลื่อนหิมะใกล้โตเกียวกว่านี้ ดู
                <Link href="/guides/attractions/tokyo-snow-day-trip" hrefLang="en" style={linkStyle}>
                  คู่มือเที่ยวหิมะวันเดียวจากโตเกียว (ภาษาอังกฤษ)
                </Link>
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>ข้อดี</p>
              <p className={styles.whoForDesc}>
                เส้นทางสกีแบ่งเป็นระดับเริ่มต้น 35% ระดับกลาง 45% และระดับสูง 20% ตามตัวเลขของรีสอร์ต ลิฟต์สกี 11 ตัว และเดินจากสถานีถึงลานสกีได้ในไม่กี่นาที
                สำหรับผู้ที่มาเล่นหิมะเป็นครั้งแรก ที่นี่โดดเด่นที่สุดในบรรดาลานสกีที่ไปกลับจากโตเกียวได้ในวันเดียว เพราะการเดินทางไม่ซับซ้อน จึงแทบไม่มีโอกาสผิดพลาดก่อนเริ่มเล่น
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>ข้อเสียในฤดูกาลนี้</p>
              <p className={styles.whoForDesc}>
                โซนใต้ไม่เปิดในฤดูกาล 2026-27 รีสอร์ตเขียนไว้ว่า 南エリアの営業を休止いたします เส้นทางสกีที่ใช้ได้มี 12 เส้นทาง ได้แก่ 5 เส้นทางในโซนกลาง
                6 เส้นทางในโซนเหนือ และเส้นทางดาวน์ฮิลล์ Falcon เพียงพอสำหรับมือใหม่หนึ่งวัน แต่น้อยไปสำหรับการมาครั้งที่สอง จึงเป็นเหตุผลให้พิจารณาทริปไปเช้าเย็นกลับที่ฮาคุบะหรือนาเอบะแทน
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>รายการที่มือใหม่มักลืมซื้อ</p>
              <p className={styles.whoForDesc}>
                คอร์สเรียนสกี เนื่องจาก GALA Yuzawa ระบุราคาบัตรลิฟต์สกีและค่าเช่าชุดอุปกรณ์ไว้ในตารางราคา ส่วนคอร์สเรียนต้องจองแยก และหน้าสินค้าของ Klook ระบุชัดว่ายังต้องซื้อบัตรลิฟต์สกีเพิ่มจากคอร์สเรียน
                หากมีบัตรและอุปกรณ์แต่ไม่ได้จองครูสอน แม้จะมีเส้นทางสำหรับผู้เริ่มต้น 35% ก็ไม่มีใครสอนวิธีเล่น
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>วิธีประหยัดที่สุดสำหรับการเล่นสกีครั้งแรก</p>
              <p className={styles.whoForDesc}>
                ซื้อบัตรกอนโดลาและลิฟต์ Barouche ที่เคาน์เตอร์ ¥6,500 หรือออนไลน์ ¥5,500 แทนบัตรลิฟต์สกีแบบเต็มวัน ¥8,000 มือใหม่จะเล่นอยู่ในพื้นที่ที่ไปได้ด้วยกอนโดลาและลิฟต์ Barouche
                การซื้อบัตรที่ใช้ได้ทั่วทั้งลานสกีจึงเท่ากับจ่ายเพิ่ม ¥2,500 สำหรับลิฟต์ที่คุณจะไม่ได้ใช้ ราคาจากรีสอร์ตโดยตรง ตรวจสอบเมื่อ {OWN}
              </p>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              คอร์สเรียนสกี 1 วันที่ GALA Yuzawa →
            </KlookLink>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์รถบัสสำหรับมือใหม่จากโตเกียว →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>พาส</span>
          <h2 className={styles.sectionTitle}>ใช้ JR Pass ไป GALA Yuzawa ได้ไหม</h2>
          <p className={styles.bodyText}>
            <strong>ได้ พาสรถไฟทั้งสามแบบที่นักท่องเที่ยวนิยมใช้ สามารถใช้กับชินคันเซ็นไป GALA Yuzawa ได้ทั้งหมด</strong> <strong>JAPAN RAIL PASS</strong>{" "}
            สำหรับเดินทางทั่วญี่ปุ่นใช้กับชินคันเซ็นทุกสายของกลุ่ม JR ได้ ยกเว้น NOZOMI และ MIZUHO จึงรวมชินคันเซ็นสายโจเอ็ตสึ (หากใช้ Gran Class ต้องชำระเพิ่ม)
            พาสสำหรับตู้โดยสารธรรมดาแบบ 7 วัน ราคา <strong>{JRP_7DAY}</strong> เมื่อซื้อออนไลน์ หรือ ¥53,000 ที่ตัวแทนจำหน่ายในต่างประเทศ <strong>JR EAST PASS</strong>{" "}
            ราคา <strong>{EAST_PASS_5DAY}</strong> สำหรับ 5 วัน และ ¥50,000 สำหรับ 10 วัน ใช้กับทุกสายของ JR East ได้ ตรวจสอบเมื่อ {OWN} จาก
            japanrailpass.net และ JR East
          </p>
          <p className={styles.bodyText}>
            <strong>JR TOKYO Wide Pass</strong> ถูกที่สุดในสามแบบสำหรับทริปนี้ GALA Yuzawa อยู่ในพื้นที่ที่พาสใช้ได้ JR East ระบุให้ GALA Yuzawa เป็นหนึ่งในจุดหมายที่ไปได้ด้วยพาสนี้
            และใช้กับชินคันเซ็นสายโจเอ็ตสึไปที่นั่นได้ทั้งที่นั่งแบบระบุที่นั่งและไม่ระบุที่นั่งในตู้โดยสารธรรมดา ราคาผู้ใหญ่ <strong>{PASS_ADULT}</strong> เด็กอายุ 6 ถึง 11 ปี{" "}
            <strong>¥8,000</strong> ใช้ได้ <strong>3 วันติดกัน</strong> ราคานี้มีผลตั้งแต่วันที่ <strong>14 มีนาคม 2026</strong> โดยปรับขึ้นจาก ¥15,000 และ
            ¥7,500 ตรวจสอบเมื่อ {OWN}
          </p>
          <p className={styles.bodyText}>
            ความคุ้มค่าของพาสดูได้จากตัวอย่างการคำนวณที่ JR East เผยแพร่ <strong>ไปกลับ GALA Yuzawa และไปกลับนิกโก้ด้วยรถด่วนพิเศษ</strong>{" "}
            แบบระบุที่นั่งทั้งหมด หากซื้อตั๋วแยกจะมีค่าใช้จ่ายรวม<strong>{JR_EXAMPLE}</strong> เทียบกับพาส {PASS_ADULT} ตัวอย่างนี้คือทริปวันเดียว<strong>สองทริป</strong>{" "}
            ค่าเดินทางไป-กลับ GALA Yuzawa เพียงทริปเดียวไม่ถึงราคาพาส {PASS_ADULT} หลักง่าย ๆ คือ ซื้อพาสหากมีแผนเที่ยวไปเช้าเย็นกลับจากโตเกียว 2 ถึง 3 ทริป โดยมี GALA Yuzawa เป็นหนึ่งในนั้น
            และซื้อตั๋วรถไฟแยกหากไปที่นี่เพียงแห่งเดียว ข้อจำกัดตามฤดูกาลคือสถานี GALA Yuzawa เปิดเฉพาะฤดูหนาวและฤดูใบไม้ผลิ นอกฤดูกาลใช้พาสเดิมเดินทางไปสถานีเอจิโกะยูซาวะแทนได้{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              คู่มือ JR Tokyo Wide Pass (ภาษาอังกฤษ)
            </Link>{" "}
            แสดงการคำนวณความคุ้มค่าของพาสสำหรับทุกทริปไปเช้าเย็นกลับในคันโต และ
            <Link href="/guides/transport/jr-pass-guide" hrefLang="en" style={linkStyle}>
              คู่มือ JR Pass (ภาษาอังกฤษ)
            </Link>{" "}
            แสดงการคำนวณแบบเดียวกันสำหรับพาสทั่วประเทศ
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูราคา TOKYO Wide Pass →
            </KlookLink>
            <KlookLink href={EAST_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR EAST PASS (5 หรือ 10 วัน) →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ทัวร์หรือรถไฟ</span>
          <h2 className={styles.sectionTitle}>ควรจองทัวร์หรือนั่งชินคันเซ็นไปเอง</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            เลือกชินคันเซ็นหากต้องการเวลาเล่นหิมะนานที่สุด จองทัวร์รถบัสหากต้องการวางแผนให้น้อยที่สุด สิ่งที่ต้องเข้าใจคือการเดินทางทั้งสองแบบไปคนละลานสกี
            รถไฟไป GALA Yuzawa ส่วนทัวร์รถบัสจากโตเกียวไปอิวัปปาระและลานสกีข้างเคียงในยูซาวะ
          </p>
          <Table head={["รูปแบบการเดินทาง", "สิ่งที่รวม", "สรุป", "ข้อควรรู้"]} rows={shapeRows.map((r) => [r.shape, r.covers, r.verdict, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>มีสิ่งหนึ่งที่ต้องตรวจสอบก่อนจองในขณะนี้</strong> ณ {OWN} เว็บไซต์ท่องเที่ยวของ JR East ยังขึ้นแพ็กเกจชินคันเซ็นพร้อมบัตรลิฟต์สกี{" "}
            <em>JR SKISKI</em> ไป GALA Yuzawa ฤดูกาล 2026-27 ว่า &ldquo;Coming Soon&rdquo; และคาดว่าจะเปิดจองราวกลางเดือนพฤศจิกายน 2026
            แพ็กเกจทางการของฤดูกาลนี้จึงยังจองไม่ได้ ขณะที่แพ็กเกจจากตัวแทนจำหน่ายด้านล่างเปิดให้จองแล้ว รับบัตรที่ออกในต่างประเทศ และมีหน้าจองภาษาไทย
            ถ้าต้องการแพ็กเกจ ให้รอกลางเดือนพฤศจิกายน หากต้องการยืนยันวันเดินทางตั้งแต่ตอนนี้ ให้จองแต่ละรายการแยกกัน
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์รถบัสยูซาวะจากโตเกียว →
            </KlookLink>
            <KlookLink href={CHARTER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              บริการรถส่วนตัวแบบเหมาคันไป GALA Yuzawa / นาเอบะ →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>วางแผนทริปช่วงฤดูหนาว</span>
          <h2 className={styles.sectionTitle}>ควรจัดทริป GALA Yuzawa ไว้ในแผนเที่ยวแบบไหน</h2>
          <p className={styles.bodyText}>
            GALA Yuzawa เป็นจุดหมายที่ไปเช้าเย็นกลับจากที่พักในโตเกียวได้ จึงควรวางแผนให้เข้ากับทริปที่เหลือ{" "}
            <Link href="/th/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              แผนเที่ยวญี่ปุ่นหน้าหนาว 12 วัน
            </Link>{" "}
            แสดงวิธีจัดแผนเที่ยวจากโตเกียวไปพื้นที่หิมะทางเหนือและตะวันตก อีกหนึ่งทริปฤดูหนาวแบบไปเช้าเย็นกลับที่ควรนำมาเปรียบเทียบคือ
            <Link href="/th/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>
              ทัวร์ลิงหิมะจิโกกุดานิ
            </Link>{" "}
            GALA Yuzawa ซึ่งไปด้วยชินคันเซ็นสายโจเอ็ตสึ และนากาโน่ซึ่งไปด้วยชินคันเซ็นสายโฮคุริคุอยู่ใน JR EAST PASS ทั้งคู่ หากไปทั้งสองแห่ง ความคุ้มค่าของพาสจะเปลี่ยนไป
            หลังเล่นสกีแล้วกลับเข้าเมืองให้ทันชม
            <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en" style={linkStyle}>
              ไฟประดับหน้าหนาวในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            ซึ่งเที่ยวได้ภายในช่วงเย็นวันเดียว
          </p>
          <p className={styles.bodyText}>
            ถ้าอยู่ญี่ปุ่นในเดือนมกราคม ให้กำหนด
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              ทัวร์ชมงานประดับไฟที่ทาคายามะและชิราคาวาโกะ (ภาษาอังกฤษ)
            </Link>{" "}
            ก่อน แล้วจึงจัดวันไป GALA Yuzawa ให้สอดคล้องกับกำหนดการนั้น เพราะงานประดับไฟจัดเพียง 4 คืนที่กำหนดไว้ ส่วน GALA Yuzawa เปิดตลอดฤดูกาล หากการเล่นสกีวันแรกทำให้อยากเล่นต่อทั้งสัปดาห์
            จุดหมายถัดไปคือ
            <Link href="/th/guides/attractions/niseko-ski-tours" style={linkStyle}>
              ทัวร์สกีนิเซโกะ
            </Link>{" "}
            ในฮอกไกโด หรือถ้าไม่อยากขึ้นเครื่องบิน ก็พักที่นากาโน่สักสองสามคืน
            <Link href="/guides/attractions/hakuba-ski-tours" hrefLang="en" style={linkStyle}>
              คู่มือทัวร์สกีฮาคุบะ (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายการเดินทางด้วยชินคันเซ็นต่อรถบัสจากโตเกียว และ
            <Link href="/guides/attractions/nozawa-onsen-ski" hrefLang="en" style={linkStyle}>
              คู่มือสกีโนซาวะออนเซ็น (ภาษาอังกฤษ)
            </Link>{" "}
            แนะนำลานสกีในหมู่บ้านออนเซ็นที่ไปได้จากสถานีอีอิยามะ
            <Link href="/guides/attractions/japan-ski-trip-itinerary" hrefLang="en" style={linkStyle}>
              แผนเที่ยวสกีญี่ปุ่น (ภาษาอังกฤษ)
            </Link>{" "}
            แนะนำจำนวนคืนที่ควรพักในแต่ละที่สำหรับทริปสกี 7 หรือ 10 วัน ทริปเที่ยวภาคเหนือเดือนกุมภาพันธ์วางแผนโดยยึด
            <Link href="/th/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              ทัวร์เทศกาลหิมะซัปโปโร
            </Link>{" "}
            วันที่ 4 ถึง 11 กุมภาพันธ์ 2027 เป็นหลัก แล้วเพิ่ม
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en" style={linkStyle}>
              ทริปวันเดียวไปโอตารุจากซัปโปโร (ภาษาอังกฤษ)
            </Link>{" "}
            หรือขยายเป็น
            <Link href="/th/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              แผนเที่ยวฮอกไกโด 7 วัน
            </Link>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ก่อนเล่นสกี</span>
          <h2 className={styles.sectionTitle}>ประกันการเดินทางคุ้มครองการเล่นสกีหรือไม่</h2>
          <p className={styles.bodyText}>
            ตรวจสอบก่อนซื้อบัตรลิฟต์สกี ไม่ใช่หลังจากนั้น ความคุ้มครองกีฬาบนหิมะขึ้นอยู่กับเงื่อนไขของกรมธรรม์แต่ละฉบับ เช่น SafetyWing คุ้มครองการเล่นสกีและสโนว์บอร์ดภายในเส้นทางสกีที่กำหนด หากสวมหมวกกันน็อก
            ส่วนการเล่นนอกเส้นทางที่กำหนดไม่อยู่ในเงื่อนไขนั้น และกรมธรรม์อื่นอาจต้องซื้อความคุ้มครองเพิ่ม วันที่เล่นหิมะเป็นวันที่มีความเสี่ยงต้องเสียค่ารักษาพยาบาลสูงที่สุดในทริปญี่ปุ่น
            เรื่องนี้จึงสำคัญกว่า ¥500 ที่ประหยัดได้จากการซื้อบัตรออนไลน์
            <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en" style={linkStyle}>
              คู่มือประกันการเดินทางสำหรับเล่นสกีในญี่ปุ่น (ภาษาอังกฤษ)
            </Link>{" "}
            สรุปข้อยกเว้นที่พบบ่อยในกรมธรรม์ และการเล่นแบบใดถือเป็นนอกเส้นทาง
          </p>
          <p className={styles.bodyText}>
            อีกสองเรื่องที่ควรเตรียมก่อนไป GALA Yuzawa เรื่องแรกคือ<strong>อินเทอร์เน็ตมือถือ</strong> เพราะตามประกาศของรีสอร์ต วันและเวลาเปิดให้บริการเปลี่ยนตามปริมาณหิมะและสภาพอากาศ
            และที่สถานีที่เปิดเฉพาะฤดูกาลบนเส้นทางสายย่อย คุณจะได้รับข้อมูลการปิดลานสกีผ่านโทรศัพท์มือถือเท่านั้น{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              ดูตัวเลือก eSIM บน Klook →
            </KlookLink>{" "}
            และ
            <Link href="/th/guides/esim/best-esim-japan" style={linkStyle}>
              คู่มือเลือก eSIM ญี่ปุ่น
            </Link>{" "}
            เปรียบเทียบกับตัวเลือกอื่น เรื่องที่สองคือ<strong>วิธีชำระเงิน</strong> ระบบจองโดยตรงของรีสอร์ตออกแบบมาสำหรับบัตรที่ออกในญี่ปุ่น
            ซึ่งเป็นเหตุผลสำคัญที่ควรจองผ่านตัวแทนจำหน่ายสำหรับรีสอร์ตนี้
          </p>
        </section>

        <p className={styles.bodyText}>
          ชินคันเซ็นไป GALA Yuzawa ออกจากสถานีโตเกียว
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={linkStyle}>
            คู่มือเลือกที่พักในโตเกียว (ภาษาอังกฤษ)
          </Link>{" "}
          จึงแนะนำให้พักย่านสถานีโตเกียวหากมีแผนเที่ยวไปเช้าเย็นกลับหลายครั้ง
        </p>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเกี่ยวกับ GALA Yuzawa" />

        <KlookTourPicks
          heading="ลานสกีอื่น ๆ ที่ไปเช้าเย็นกลับจากโตเกียวได้"
          intro="GALA Yuzawa เป็นลานสกีที่ไปได้เร็วที่สุด แต่ไม่ใช่ทางเลือกเดียว ตัวเลือกเหล่านี้เหมาะเมื่อหิมะในพื้นที่ยูซาวะมีน้อย เมื่อการปิดโซนใต้ทำให้ 12 เส้นทางดูไม่เพียงพอ หรือเมื่อต้องการจองทุกอย่างในครั้งเดียวแทนการจองแยกสี่รายการ"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/th/guides/attractions/jigokudani-snow-monkey-tour", title: "ทัวร์ชมลิงหิมะจากโตเกียว: คู่มือเที่ยวจิโกกุดานิ (2027)" },
            { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): ราคา วิธีใช้ และความคุ้มค่า (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-wide-pass", title: "JR Tokyo Wide Pass 2026: ราคา แผนที่ และความคุ้มค่า (ภาษาอังกฤษ)" },
            { href: "/guides/money/best-travel-insurance-japan", title: "ประกันการเดินทางไปญี่ปุ่น 2026: ใครควรเลือกความคุ้มครองแบบไหน (ภาษาอังกฤษ)" },
            { href: "/guides/money/japan-ski-travel-insurance", title: "ประกันการเดินทางสำหรับเล่นสกีในญี่ปุ่น (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/niseko-ski-tours", title: "ทัวร์สกีนิเซโกะ 2026-27" },
            { href: "/th/guides/attractions/japan-winter-itinerary", title: "แผนเที่ยวญี่ปุ่นหน้าหนาว 12 วัน (2027)" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "ทัวร์ทาคายามะและชิราคาวาโกะ (2027) (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/sapporo-snow-festival-tours", title: "ทัวร์เทศกาลหิมะซัปโปโร (2027)" },
            { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "ทริปวันเดียวไปโอตารุจากซัปโปโร (2027) (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/hokkaido-7-day-itinerary", title: "แผนเที่ยวฮอกไกโด 7 วัน" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "งานประดับไฟในโตเกียว: วันที่ เวลา และจุดชมฟรี (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-snow-day-trip", title: "เที่ยวหิมะวันเดียวจากโตเกียว (2026-27) (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "ทริปวันเดียวไปคารุอิซาวะจากโตเกียว (2026) (ภาษาอังกฤษ)" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น (2026): ผู้ให้บริการ ราคา และวิธีเลือก" },
            { href: "/guides/attractions", title: "กิจกรรมอื่น ๆ ที่น่าสนใจในญี่ปุ่น (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>เดินทางจากโตเกียวเพียง {FASTEST} กับสามรายการที่ต้องซื้อหรือจอง</h2>
            <p className={styles.ctaBannerDesc}>
              ลานสกีเปิด {SLOPES_OPEN} บัตรลิฟต์สกีที่เคาน์เตอร์ {LIFT_WINDOW} ออนไลน์ {LIFT_WEB} ส่วนอุปกรณ์ต้องเช่าแยก และคอร์สเรียนสกีต้องจองแยก
              จึงแนะนำให้จองพาสก่อน แล้วจึงจองคอร์สเรียน
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={WIDE_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูราคา TOKYO Wide Pass →
              </KlookLink>
              <KlookLink href={LESSON_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูคอร์สเรียนสกี GALA Yuzawa →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
