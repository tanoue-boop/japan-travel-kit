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
    leg: "แนะนำ: สถานีโตเกียว → สถานี GALA Yuzawa ชินคันเซ็นสายโจเอ็ตสึ (Joetsu) ขบวนตรง Tanigawa",
    time: `ขบวนที่เร็วที่สุด ${FASTEST} เช่น Tanigawa 71 โตเกียว 6:24 → GALA Yuzawa 7:35 และหน้าแนะนำของ JR East ระบุว่าขบวน Tanigawa ใช้เวลาประมาณ 1 ชั่วโมง 20 นาที`,
    trains: "เฉพาะฤดูกาล: ตั้งแต่ 12 ธันวาคม 2026 JR East ขยายเส้นทางขบวน Tanigawa ปกติไปถึง GALA Yuzawa และเพิ่มขบวนพิเศษ จอดที่อุเอโนะ (Ueno) และโอมิยะ (Omiya) ด้วย",
    cost: `ใช้ JAPAN RAIL PASS, JR TOKYO Wide Pass (${PASS_ADULT}) และ JR EAST PASS ได้ ถ้าไม่มีพาส ราคาตั๋วชินคันเซ็นจะแสดงในหน้าชำระเงิน`,
    note: "สถานี GALA Yuzawa เป็นสถานีชินคันเซ็นเฉพาะฤดูกาลที่สร้างอยู่ในอาคารศูนย์สกี ออกจากประตูตรวจตั๋วก็ถึงอาคารที่ขายบัตรลิฟต์สกีและให้เช่าอุปกรณ์ทันที ไม่ต้องนั่งรถบัส ไม่ต้องต่อรถ ไม่ต้องนั่งแท็กซี่ ขบวน Tanigawa ไม่ได้วิ่งถึง GALA Yuzawa ทุกขบวน ให้เลือกขบวนที่ระบุสถานีปลายทางเป็น GALA Yuzawa",
  },
  {
    leg: "สถานีโตเกียว → สถานีเอจิโกะยูซาวะ (Echigo-Yuzawa) แล้วต่อรถรับส่งฟรี",
    time: "นั่งชินคันเซ็นไปเอจิโกะยูซาวะ แล้วนั่งรถรับส่งฟรีของลานสกีประมาณ 10 นาที",
    trains: "เอจิโกะยูซาวะเป็นสถานีชินคันเซ็นสายโจเอ็ตสึที่เปิดตลอดปี อยู่ก่อนถึง GALA Yuzawa หนึ่งสถานี",
    cost: "รถรับส่งฟรี ส่วนรถไฟใช้พาสทั้งสามแบบเดียวกันได้",
    note: "เป็นทางเลือกเมื่อขบวนตรงที่ต้องการถูกจองเต็มหรือไม่วิ่งในวันนั้น และเป็นวิธีเดียวนอกฤดูกาลของ GALA Yuzawa เพราะตามข้อมูลของ JR East สถานี GALA Yuzawa เปิดเฉพาะฤดูหนาวและฤดูใบไม้ผลิ ส่วนเอจิโกะยูซาวะเป็นสถานีก่อนหน้าที่เปิดตลอดปี",
  },
  {
    leg: "ทัวร์รถบัสสกีวันเดียวจากโตเกียว",
    time: "ตั้งแต่ขึ้นรถจนลงรถที่โตเกียวรวม 11 ถึง 12.5 ชั่วโมง",
    trains: "ตามวันออกเดินทางที่ระบุในหน้าสินค้า",
    cost: "คิดราคาต่อคน เปลี่ยนตามวันที่ เลือกวันเดินทางในหน้าสินค้าเพื่อดูราคา",
    note: "เป็นสินค้าคนละแบบ ไม่ใช่แบบที่ถูกกว่า ทัวร์รถบัสไปลานสกีอิวัปปาระ (Iwappara) ในพื้นที่ยูซาวะเดียวกัน ไม่ใช่ GALA Yuzawa จองรถไปกลับครั้งเดียว ส่วนเช่าอุปกรณ์และคอร์สเรียนสกีเป็นตัวเลือกเพิ่ม ใช้เวลานานกว่าชินคันเซ็น แต่ไม่ต้องจัดการอะไรเอง",
  },
  {
    leg: "รถเช่าเหมาคันไป GALA Yuzawa หรือนาเอบะ (Naeba)",
    time: "เหมารถ 10 ชั่วโมง รับส่งจากที่พัก",
    trains: "วันใดก็ได้ที่ผู้ให้บริการรับจอง",
    cost: "คิดราคาต่อคัน เปลี่ยนตามวันที่ ดูในหน้าสินค้า",
    note: "เหมาะกับครอบครัวหรือกลุ่มที่มีอุปกรณ์ หรือต้องการออกเดินทางก่อนรถไฟขบวนแรก เลือกลานสกีตอนจอง สินค้าเดียวกันจึงใช้ได้ทั้งวันที่ไป GALA Yuzawa และวันที่ไปนาเอบะ",
  },
];

const costRows = [
  {
    item: "ผู้ใหญ่ที่ไม่มีอุปกรณ์ เล่นสกีหรือสโนว์บอร์ด 1 วัน (บัตรลิฟต์สกี ชุดอุปกรณ์ และชุดสกี ราคาออนไลน์)",
    price: "¥19,500 บวกค่ารถไฟ",
    note: `ยอดที่นักท่องเที่ยวไปกลับวันเดียวส่วนใหญ่ต้องจ่าย: บัตรลิฟต์สกี ${LIFT_WEB} ชุดสกีหรือสโนว์บอร์ด ${SKI_SET} และชุดสกีเสื้อกับกางเกง ${WEAR} ถ้าซื้อบัตรลิฟต์สกีที่เคาน์เตอร์จำหน่ายตั๋วจะเป็น ${LIFT_WINDOW} รวมเป็น ¥20,000`,
  },
  {
    item: "ชินคันเซ็น โตเกียว ⇄ GALA Yuzawa",
    price: "ใช้พาส หรือดูราคาในหน้าชำระเงิน",
    note: `JR TOKYO Wide Pass ราคา ${PASS_ADULT} สำหรับ 3 วัน ตัวอย่างการคำนวณของ JR East คือไปกลับ GALA Yuzawa และไปกลับนิกโก้ (Nikko) แบบที่นั่งจอง รวม ${JR_EXAMPLE} JR East ปรับค่าโดยสารเมื่อ 14 มีนาคม 2026 จึงควรดูราคาเที่ยวเดียวตามวันเดินทางในหน้าชำระเงิน`,
  },
  {
    item: "บัตรกอนโดลาและลิฟต์สกี 1 วัน (ผู้ใหญ่)",
    price: `ออนไลน์ ${LIFT_WEB} / เคาน์เตอร์ ${LIFT_WINDOW}`,
    note: "เด็กประถม ออนไลน์ ¥3,500 / เคาน์เตอร์ ¥4,000 เด็กก่อนวัยเรียนเข้าฟรี 2 คนต่อผู้ใหญ่ที่จ่ายเงิน 1 คน",
  },
  {
    item: "ชุดสกี 3 ชิ้น หรือชุดสโนว์บอร์ด 2 ชิ้น 1 วัน",
    price: SKI_SET,
    note: "ชั้นประถมลงมา ¥4,000 ราคา 2 วันเป็นสองเท่าพอดี",
  },
  {
    item: "ชุดสกี (เสื้อและกางเกง) 1 วัน",
    price: WEAR,
    note: "ชั้นประถมลงมา ¥3,000",
  },
  {
    item: "แว่นสกีและหมวกกันน็อก 1 วัน",
    price: "¥1,800 และ ¥2,300",
    note: "เช่าแยกชิ้น ไม่รวมอยู่ในชุดอุปกรณ์",
  },
  {
    item: "วันที่ไม่เล่นสกี: บัตรกอนโดลาและ Barouche พร้อมเลื่อนหิมะ",
    price: `ออนไลน์ ¥5,500 และ ${SLED}`,
    note: "บัตรกอนโดลาและ Barouche (เคาน์เตอร์ ¥6,500) ใช้เข้าลานเล่นหิมะบนยอดสถานีกอนโดลาและขึ้นลิฟต์ชมวิว Barouche ได้ เลื่อนหิมะเช่าที่สถานีบนยอด",
  },
  {
    item: "SPA GALA no Yu (ออนเซ็นและสระว่ายน้ำ) ผู้ใหญ่",
    price: "¥1,500",
    note: "อยู่ในอาคารสถานี ใช้เวลารอรถไฟกลับได้ ราคาจากหน้าท่องเที่ยว GALA Yuzawa ของ JR East",
  },
];

const seasonRows = [
  { what: "ลานสกีเปิด (สกีและสโนว์บอร์ด)", detail: `${SLOPES_OPEN} → ${SLOPES_CLOSE}` },
  { what: "ช่วงเปิดเฉพาะชมวิว", detail: `${SIGHTSEEING_OPEN} → 18 ธันวาคม 2026: เปิดเฉพาะกอนโดลาและลิฟต์ชมวิว เล่นสกีไม่ได้ไม่ว่าหิมะจะมากแค่ไหน` },
  { what: "ชินคันเซ็นตรงถึง GALA Yuzawa", detail: "ตั้งแต่ 12 ธันวาคม 2026 ที่ GALA Yuzawa เริ่มเปิด JR East ขยายเส้นทางขบวน Tanigawa ปกติไปถึง GALA Yuzawa และเพิ่มขบวนพิเศษ (JR East, 22 ต.ค. 2026) ประกาศนี้ไม่ได้ระบุวันสิ้นสุด และสถานีเปิดเฉพาะฤดูหนาวและฤดูใบไม้ผลิ" },
  { what: "รถไฟกลับหลังเล่นสกีกลางคืน", detail: "Tanigawa 198 GALA Yuzawa 20:19 → โตเกียว 21:40 วันที่ 16 และ 30 มกราคม และ 13 และ 27 กุมภาพันธ์ 2027" },
  { what: "แพ็กเกจชินคันเซ็นพร้อมบัตรลิฟต์สกี JR SKISKI", detail: "เว็บไซต์ท่องเที่ยวของ JR East ยังขึ้นว่า \"Coming Soon\" และคาดว่าจะเปิดจองกลางเดือนพฤศจิกายน 2026" },
  { what: "เวลาเปิดรายวัน", detail: "เวลาเปิดรายวันฤดูกาล 2026-27 ยังรอประกาศอย่างเป็นทางการ วันและเวลาเปิดอาจเปลี่ยนตามปริมาณหิมะและสภาพอากาศ" },
];

const liftRows = [
  { ticket: "บัตรกอนโดลาและลิฟต์สกี 1 วัน ผู้ใหญ่", window: LIFT_WINDOW, web: LIFT_WEB, note: "บัตรมาตรฐาน ใช้กับกอนโดลาและลิฟต์ทุกตัวในสองโซนที่เปิดฤดูกาลนี้ได้" },
  { ticket: "บัตรกอนโดลาและลิฟต์สกี 1 วัน เด็กประถม", window: "¥4,000", web: "¥3,500", note: "ที่เคาน์เตอร์เป็นครึ่งหนึ่งของราคาผู้ใหญ่ และออนไลน์ถูกลงอีก ¥500" },
  { ticket: "บัตรกอนโดลาและ Barouche ผู้ใหญ่", window: "¥6,500", web: "¥5,500", note: "บัตรราคาถูกกว่า ใช้ได้เฉพาะกอนโดลาและลิฟต์ 4 ที่นั่ง Barouche เหมาะกับวันแรกที่เล่นสกี วันเล่นหิมะ หรือบ่ายสั้น ๆ ไม่เหมาะกับการเล่นทั่วทั้งภูเขา" },
  { ticket: "บัตรกอนโดลาและ Barouche เด็กประถม", window: "¥3,400", web: "¥2,900", note: "วิธีที่ถูกที่สุดในการพาเด็กขึ้นลานหิมะที่นี่พร้อมบัตรลิฟต์สกี" },
  { ticket: "บัตร 4 ชั่วโมง ผู้ใหญ่", window: "¥7,500", web: "¥7,000", note: "ที่เคาน์เตอร์ถูกกว่าบัตร 1 วันแค่ ¥500 จึงเหมาะกับวันที่มาถึงสาย ไม่ใช่การประหยัด" },
  { ticket: "บัตร 4 ชั่วโมง เด็กประถม", window: "¥3,500", web: "¥3,000", note: "เหตุผลเดียวกัน เด็กเล็กส่วนใหญ่เล่นสกีได้ราว 4 ชั่วโมงต่อวันอยู่แล้ว" },
  { ticket: "เด็กก่อนวัยเรียน", window: "ฟรี", web: "ฟรี", note: "ฟรี 2 คนต่อผู้ใหญ่ที่จ่ายเงิน 1 คน คนที่สามจ่ายราคาเด็กประถม เป็นกฎของลานสกีเอง" },
];

const rentalRows = [
  { item: "ชุดสกี 3 ชิ้น (สกี รองเท้า ไม้ค้ำ)", adult: `1 วัน ${SKI_SET}`, child: "1 วัน ¥4,000 (ชั้นประถมลงมา)", note: "2 วันผู้ใหญ่ ¥13,000 เด็ก ¥8,000 เป็นสองเท่าพอดี จึงไม่มีส่วนลดหลายวัน" },
  { item: "ชุดสโนว์บอร์ด 2 ชิ้น (บอร์ด รองเท้า)", adult: `1 วัน ${SKI_SET}`, child: "1 วัน ¥4,000 (ชั้นประถมลงมา)", note: "ราคาเท่ากับชุดสกีทั้งทุกช่วงอายุและทุกระยะเวลา" },
  { item: "ชุดสกี (เสื้อและกางเกง)", adult: `1 วัน ${WEAR}`, child: "1 วัน ¥3,000 (ชั้นประถมลงมา)", note: "รายการที่คนเที่ยววันเดียวจากโตเกียวส่วนใหญ่ต้องใช้แต่มักไม่ได้รวมไว้ในงบ เพราะเสื้อโค้ตที่ใส่มาบนเครื่องบินใช้เล่นสกีไม่ได้" },
  { item: "แว่นสกีและหมวกกันน็อก", adult: "1 วัน แว่นสกี ¥1,800 หมวกกันน็อก ¥2,300", child: "ราคาเดียวกัน", note: "2 วัน ¥3,600 และ ¥4,600 เช่าแยกชิ้น ไม่รวมในชุดอุปกรณ์ วันที่ใช้อุปกรณ์ครบจึงแพงกว่าสองรายการข้างบน" },
  { item: "PICK UP BOX", adult: "เพิ่ม ¥1,000 ต่อคน", child: "เพิ่ม ¥1,000 ต่อคน", note: "บริการของลานสกีเองสำหรับรับอุปกรณ์เช่าโดยไม่ต้องต่อคิว 7:30–12:00 น. เปิดจองออนไลน์ 1 เดือนก่อนวันเปิด และปิดรับเที่ยงวันของ 2 วันก่อนใช้ ชำระล่วงหน้าด้วยบัตรเท่านั้น จำนวนจำกัด และยกเลิกหลังเที่ยงวันดังกล่าวเสียค่าธรรมเนียม 100% ช่วงให้เช่าคือ 19 ธันวาคมถึง 31 มีนาคม" },
];

const mountainRows = [
  { what: "เส้นทางที่เปิด", detail: "12 จาก 16 เส้นทาง: โซน Central 5 เส้นทาง โซน North 6 เส้นทาง และเส้นทางดาวน์ฮิล Falcon" },
  { what: "โซน South", detail: "4 เส้นทางปิดตลอดฤดูกาล 2026-27 หน้าแผนที่ลานสกีของรีสอร์ตเขียนว่า 南エリアの営業を休止いたします (ระงับการเปิดโซนใต้)" },
  { what: "ระดับความยาก", detail: "ระดับเริ่มต้น 35% ระดับกลาง 45% ระดับสูง 20% ตามตัวเลขทั้งภูเขาที่รีสอร์ตประกาศ" },
  { what: "ลิฟต์", detail: "11 ตัว รวมกอนโดลา Diligence 8 ที่นั่งที่ออกจากอาคารสถานี" },
  { what: "เส้นทางยาวที่สุด", detail: "2,500 ม. เส้นทางดาวน์ฮิล Falcon" },
  { what: "ความสูง", detail: "ยอด 1,181 ม. ฐาน 358 ม. พื้นที่ 70 เฮกตาร์ ความชันสูงสุด 33°" },
  { what: "เวลาเปิด", detail: "เวลาเปิดรายวันฤดูกาล 2026-27 ยังรอประกาศอย่างเป็นทางการ จุดเช่าอุปกรณ์เปิด 7:30 น. ตั้งแต่ 19 ธันวาคม" },
];

const shapeRows = [
  {
    shape: "นั่งชินคันเซ็นไปเอง",
    covers: "รถไฟไป GALA Yuzawa ส่วนบัตรลิฟต์สกีและอุปกรณ์เช่าซื้อที่ลานสกีหรือออนไลน์",
    verdict: "เหมาะกับคนส่วนใหญ่ที่สุด และได้เวลาบนลานหิมะมากที่สุด",
    note: `ขบวนที่เร็วที่สุด ${FASTEST} และสถานีอยู่ในอาคาร ข้อแลกคือคุณต้องซื้อเองสี่อย่าง ได้แก่ ที่นั่ง บัตรลิฟต์สกี อุปกรณ์ และชุดสกี และ GALA Yuzawa ขายบัตรทุกแบบที่เคาน์เตอร์แพงกว่าออนไลน์อย่างน้อย ¥500`,
  },
  {
    shape: "ชินคันเซ็นและพาสของ JR East",
    covers: "ใช้ TOKYO Wide Pass หรือ JR EAST PASS กับช่วงรถไฟ",
    verdict: "ควรคำนวณเฉพาะเมื่อ GALA Yuzawa เป็นหนึ่งในทริปวันเดียว 2 ถึง 3 ทริป ถ้าไปที่นี่ที่เดียวไม่คุ้มค่า",
    note: `พาสราคา ${PASS_ADULT} สำหรับ 3 วันติดกัน ตัวอย่างของ JR East (ไปกลับ GALA Yuzawa และไปกลับนิกโก้ ที่นั่งจอง) รวม ${JR_EXAMPLE} ไป GALA Yuzawa วันเดียวยังไม่ถึงราคาพาส`,
  },
  {
    shape: "ทัวร์รถบัสวันเดียวจากโตเกียว",
    covers: "จองรถไปกลับอิวัปปาระครั้งเดียว เล่นหิมะ เช่าอุปกรณ์ หรือคอร์สเรียนสกีเป็นตัวเลือกเพิ่ม ไม่รวมอาหาร",
    verdict: "เหมาะกับวันแรกที่เล่นสกี หรือคนที่อยากจองครั้งเดียวแทนการซื้อแยกสี่อย่าง",
    note: "ใช้เวลาเดินทางแต่ละเที่ยวนานกว่าชินคันเซ็น และไม่ได้ไป GALA Yuzawa แต่ไปลานสกีข้างเคียงในพื้นที่เดียวกัน ข้อดีของสินค้านี้คือเช้าวันเดินทางไม่ต้องจัดการอะไรเพิ่ม",
  },
  {
    shape: "รถเช่าเหมาคัน",
    covers: "รับส่งจากที่พักถึง GALA Yuzawa หรือนาเอบะ เลือกลานสกีตอนจอง",
    verdict: "เหมาะกับกลุ่ม ครอบครัวที่มีเด็กเล็ก หรือการออกเดินทางก่อนรถไฟขบวนแรก",
    note: "คิดราคาต่อคันไม่ใช่ต่อคน เมื่อไป 4 คนจึงไม่แพงเกินไป และเป็นวิธีเดียวที่วางอุปกรณ์ไว้ท้ายรถได้ ไม่ต้องแบกผ่านสถานีโตเกียว",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "เดินทางจากโตเกียวไป GALA Yuzawa อย่างไร",
    a: `นั่งชินคันเซ็นสายโจเอ็ตสึ (ขบวน Tanigawa) จากสถานีโตเกียวตรงไปสถานี GALA Yuzawa ขบวนที่เร็วที่สุดใช้เวลา ${FASTEST} ไม่ต้องต่อรถ เพราะสถานีสร้างอยู่ในศูนย์สกีและกอนโดลาออกจากอาคารเดียวกัน ขบวนตรงวิ่งเฉพาะฤดูกาล ตั้งแต่ 12 ธันวาคม 2026 ที่รีสอร์ตเริ่มเปิด JR East ขยายเส้นทางขบวน Tanigawa ปกติไปถึง GALA Yuzawa และเพิ่มขบวนพิเศษ ถ้าขบวนของคุณสิ้นสุดที่เอจิโกะยูซาวะ หรือเดินทางนอกฤดูกาล ให้นั่งรถรับส่งฟรีของรีสอร์ตต่ออีกประมาณ 10 นาที ทางเลือกอื่นคือทัวร์รถบัสวันเดียวจากโตเกียว (ไปอิวัปปาระ ลานสกีข้างเคียงในยูซาวะ) หรือรถเช่าเหมาคัน ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "นั่งชินคันเซ็นจากโตเกียวไป GALA Yuzawa ใช้เวลากี่นาที",
    a: `ขบวนที่เร็วที่สุด ${FASTEST} ตามตัวเลขของทั้งรีสอร์ตและ JR East ประกาศรถไฟฤดูหนาวของ JR East วันที่ 22 ตุลาคม 2026 ระบุว่า Tanigawa 71 โตเกียว 6:24 → GALA Yuzawa 7:35 และขากลับ Tanigawa 86 GALA Yuzawa 17:04 → โตเกียว 18:20 หน้าแนะนำของ JR East ยังระบุว่าขบวน Tanigawa ใช้เวลาประมาณ 1 ชั่วโมง 20 นาที จึงควรเผื่อเวลา 71 ถึง 80 นาทีต่อเที่ยว ใน 4 คืนที่เปิดสกีกลางคืน Tanigawa 198 ออกจาก GALA Yuzawa 20:19 ถึงโตเกียว 21:40 ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "ใช้ JR Pass ไป GALA Yuzawa ได้ไหม",
    a: `ได้ JAPAN RAIL PASS แบบทั่วประเทศใช้กับชินคันเซ็นทุกสายของกลุ่ม JR ได้ ยกเว้น NOZOMI และ MIZUHO จึงใช้กับชินคันเซ็นสายโจเอ็ตสึไป GALA Yuzawa ได้ (Gran Class ต้องจ่ายเพิ่ม) พาสธรรมดา 7 วันราคา ${JRP_7DAY} เมื่อซื้อออนไลน์ JR TOKYO Wide Pass (${PASS_ADULT} 3 วันติดกัน) และ JR EAST PASS (${EAST_PASS_5DAY} 5 วัน) ก็ใช้ได้ และ JR East ระบุ GALA Yuzawa เป็นหนึ่งในจุดหมายของ Wide Pass ไป GALA Yuzawa วันเดียวไม่คุ้มค่ากับ Wide Pass ตัวอย่างของ JR East คือไปกลับ GALA Yuzawa และไปกลับนิกโก้รวม ${JR_EXAMPLE} ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "GALA Yuzawa ฤดูกาล 2026-27 เปิดเมื่อไร",
    a: `ลานสกีเปิด ${SLOPES_OPEN} และมีกำหนดเปิดถึง ${SLOPES_CLOSE} ช่วง ${SIGHTSEEING_OPEN} ถึง 18 ธันวาคม 2026 เปิดเฉพาะกอนโดลาและลิฟต์ชมวิว เล่นสกีไม่ได้ไม่ว่าหิมะจะมากแค่ไหน ชินคันเซ็นตรงเริ่มวิ่งพร้อมรีสอร์ตวันที่ 12 ธันวาคม เวลาเปิดรายวันฤดูกาล 2026-27 ยังรอประกาศอย่างเป็นทางการ และ GALA Yuzawa ระบุว่าวันและเวลาเปิดอาจเปลี่ยนตามปริมาณหิมะและสภาพอากาศ ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "GALA Yuzawa เหมาะกับมือใหม่หรือคนที่ไม่เล่นสกีไหม",
    a: `เหมาะทั้งสองกลุ่ม 35% ของเส้นทางเป็นระดับเริ่มต้น จุดเช่าอุปกรณ์อยู่ในอาคารสถานี และจองคอร์สเรียนสกีภาษาอังกฤษได้ คนที่ไม่เล่นสกีซื้อบัตรกอนโดลาและ Barouche (ออนไลน์ ¥5,500 เคาน์เตอร์ ¥6,500) เพื่อเข้าลานเล่นหิมะบนยอดสถานีกอนโดลา เช่าเลื่อนหิมะ ${SLED} และขึ้นลิฟต์ชมวิว Barouche ไปจุดชมวิวเทือกเขาทานิงาวะ (Tanigawa) ได้ ข้อควรรู้ของฤดูกาล 2026-27 คือโซน South ปิด จึงเปิด 12 จาก 16 เส้นทาง ตรวจสอบเมื่อ ${OWN}`,
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "รถไฟ",
    label: "ตั๋วชินคันเซ็นโตเกียว → GALA Yuzawa",
    ctaLabel: "ดูรถไฟโตเกียว → GALA Yuzawa →",
    url: TRAIN_URL,
    why: "บัตรลิฟต์สกีไม่รวมการเดินทาง ที่นั่งขบวนตรง Tanigawa จากโตเกียวหรืออุเอโนะ จองตามวันที่และขึ้นรถด้วย QR code",
  },
  {
    kind: "พาสรถไฟ",
    label: "JR TOKYO Wide Pass (3 วันติดกัน)",
    ctaLabel: "ดู TOKYO Wide Pass →",
    url: WIDE_URL,
    why: "JR East ระบุว่าพาสนี้ใช้กับชินคันเซ็นไป GALA Yuzawa ได้ ถ้ามีทริปวันเดียวอีกทริปใน 3 วันเดียวกัน ควรเทียบราคา",
  },
  {
    kind: "eSIM",
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดูตัวเลือก eSIM บน Klook →",
    url: ESIM_URL,
    why: "GALA Yuzawa ระบุว่าวันและเวลาเปิดเปลี่ยนตามหิมะและสภาพอากาศ และหน้าสินค้า Klook ขอให้แสดงใบยืนยันการจองบัตรลิฟต์สกีบนโทรศัพท์ที่ต่ออินเทอร์เน็ตได้",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดูตัวเลือก eSIM บน Klook →",
    url: ESIM_URL,
    why: "GALA Yuzawa ระบุว่าวันและเวลาเปิดเปลี่ยนตามหิมะและสภาพอากาศ และเวลาเปิดรายวันฤดูกาล 2026-27 ยังไม่ประกาศ ที่สถานีเฉพาะฤดูกาล ประกาศปิดลานหรือข่าวชินคันเซ็นล่าช้าจะมาถึงคุณทางโทรศัพท์เท่านั้น",
  },
  {
    label: "ตั๋วไปกลับ Narita Express (N'EX)",
    ctaLabel: "ดูตั๋วไปกลับ N'EX →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "ไปถึงสถานีโตเกียว ซึ่งเป็นจุดออกของชินคันเซ็นสายโจเอ็ตสึไป GALA Yuzawa ถ้าเริ่มใช้ TOKYO Wide Pass ตั้งแต่วันที่เดินทางถึงก็ไม่ต้องซื้อ เพราะ JR East ระบุว่าพาสนี้ใช้กับที่นั่งจอง N'EX ได้",
  },
  {
    label: "รถบัสลีมูซีนสนามบินฮาเนดะ – โตเกียว",
    ctaLabel: "ดูรถบัสลีมูซีน →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "สำหรับสนามบินฮาเนดะ ขึ้นรถด้วย QR code มีประโยชน์ถ้าเดินทางถึงพร้อมกระเป๋าสกี เพราะยังต้องนำกระเป๋าไปโรงแรมในโตเกียวก่อนขึ้นรถไฟไปทางเหนือ",
  },
  {
    label: "JR TOKYO Wide Pass (3 วันติดกัน)",
    ctaLabel: "ดู TOKYO Wide Pass →",
    url: WIDE_URL,
    why: "รายการที่ควรคำนวณจริง ตัวอย่างของ JR East คือไปกลับ GALA Yuzawa และไปกลับนิกโก้แบบที่นั่งจองประมาณ ¥21,500 เทียบกับพาส ¥16,000 สำหรับ 3 วันติดกัน ไป GALA Yuzawa และทริปวันเดียวอีกหนึ่งทริปจึงเริ่มคุ้มค่า",
  },
  {
    label: "ตั๋วชินคันเซ็นโตเกียว → GALA Yuzawa",
    ctaLabel: "ดูรถไฟโตเกียว → GALA Yuzawa →",
    url: TRAIN_URL,
    why: "สำหรับวันไป GALA Yuzawa ที่ไม่ใช้พาส ที่นั่งขบวนตรง Tanigawa จากโตเกียวหรืออุเอโนะ จองตามวันที่และขึ้นรถด้วย QR code ขบวนพิเศษช่วงเช้า Tanigawa 71 (โตเกียว 6:24) วิ่งเฉพาะบางวันหยุดสุดสัปดาห์และวันหยุดนักขัตฤกษ์ในเดือนมกราคมและกุมภาพันธ์ จึงควรตรวจสอบวันที่ก่อนวางแผนตามขบวนนี้",
  },
  {
    label: "บัตรลิฟต์สกี GALA Yuzawa",
    ctaLabel: "ดูบัตรลิฟต์สกี GALA Yuzawa →",
    url: LIFT_URL,
    why: "บัตรกอนโดลาและลิฟต์สกี 1 วันของ GALA Yuzawa ราคาผู้ใหญ่ที่เคาน์เตอร์ ¥8,000 และออนไลน์ ¥7,500 ซื้อล่วงหน้าจึงประหยัด ¥500 เว็บไซต์ตัวแทนจำหน่ายรับบัตรที่ออกในต่างประเทศและแสดงหน้าจอเป็นภาษาไทย",
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
    desc: "ทริปวันเดียวช่วงฤดูหนาวจากโตเกียวไปลานสกีในยูซาวะด้วยรถเช่าเหมาคัน เลือกลานสกีตอนจอง",
  }),
  withKlookLocale(hakubaSkiResortDayTourTokyo, LOCALE, {
    title: "ทัวร์วันเดียวลานสกีฮาคุบะ นากาโน่ จากโตเกียว",
    desc: "ทริปวันเดียวจากโตเกียวไปหุบเขาฮาคุบะ เลือกได้ 4 ลานสกี รวมบัตรลิฟต์สกีและอุปกรณ์เช่าในการจอง",
  }),
  withKlookLocale(galaYuzawaSkiLesson, LOCALE, {
    title: "คอร์สเรียนสกี 1 วันที่ GALA Yuzawa",
    desc: "เรียนสกีหรือสโนว์บอร์ด 3 ถึง 6 ชั่วโมงที่ GALA Yuzawa กับครูที่พูดภาษาจีนหรืออังกฤษ จองแยกจากบัตรลิฟต์สกี และหน้าสินค้าระบุว่ายังต้องซื้อบัตรลิฟต์สกีเพิ่ม",
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
            ลานสกีแห่งเดียวในญี่ปุ่นที่มีสถานีชินคันเซ็นอยู่ภายใน ลานสกีเปิด {SLOPES_OPEN} และโซน South ไม่เปิดเลยในฤดูกาลนี้
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "เวลาชินคันเซ็นตรงจาก JR East", "เงื่อนไข JR Pass", "ราคา 2026-27 ของ GALA Yuzawa เอง"].map((t) => (
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
              duration: "เล่นสกี 1 วัน ชินคันเซ็นจองแยก",
              departs: "สถานี GALA Yuzawa ภายในรีสอร์ต",
            },
            {
              title: "ทริปวันเดียวไปลานสกี GALA Yuzawa หรือนาเอบะจากโตเกียว",
              url: CHARTER_URL,
              price: null,
              duration: "เหมารถ 10 ชั่วโมง",
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
              สำหรับวันตั้งแต่ 19 ธันวาคมที่ลานสกีเปิดครั้งแรกจนถึงช่วงปีใหม่ ควรจองภายใน 30 พฤศจิกายน ช่วง 12 ถึง 18 ธันวาคมเปิดเฉพาะกอนโดลา
              เล่นสกีไม่ได้ ถ้าไปเดือนมกราคมหรือกุมภาพันธ์ ควรจองล่วงหน้าอย่างน้อย 3 สัปดาห์ ณ วันที่ 15 พฤศจิกายน แพ็กเกจชินคันเซ็นพร้อมบัตรลิฟต์สกี
              JR SKISKI ของ JR East ยังขึ้นว่า &ldquo;Coming Soon&rdquo; และคาดว่าจะเปิดจองกลางเดือนพฤศจิกายน ส่วนการจอง PICK UP BOX
              ของ GALA Yuzawa เปิด 1 เดือนก่อนวันเปิดลาน
            </>
          }
          primaryCta="ดูวันที่และราคาบัตรลิฟต์สกี GALA Yuzawa บน Klook →"
          primaryNote={
            <>
              เลือกวันเล่นสกีในหน้าสินค้าเพื่อดูราคาและสถานะการขาย ลานสกีของ GALA Yuzawa เปิด {SLOPES_OPEN} และเวลาเปิดรายวันฤดูกาล
              2026-27 ยังไม่ประกาศ
            </>
          }
        />

        <KlookSameDayCards heading="สิ่งที่ควรจองสำหรับวันเดียวกันที่ GALA Yuzawa" cards={sameDayCards} />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>คำตอบสั้น ๆ</span>
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
              จากโตเกียวไป GALA Yuzawa ให้<strong>นั่งชินคันเซ็นสายโจเอ็ตสึจากสถานีโตเกียวตรงไปสถานี GALA Yuzawa ขบวนที่เร็วที่สุด{" "}
              {FASTEST}</strong> (Tanigawa 71 ของ JR East ออกจากโตเกียว 6:24 ถึง 7:35) และสถานีอยู่ในศูนย์สกี แต่ขบวนตรงวิ่งเฉพาะฤดูหนาว
              เริ่ม <strong>{SIGHTSEEING_OPEN}</strong> <strong>ลานสกีของ GALA Yuzawa เปิด {SLOPES_OPEN}</strong> ถึง {SLOPES_CLOSE}{" "}
              ส่วน 12 ถึง 18 ธันวาคมเปิดเฉพาะกอนโดลาชมวิว <strong>JAPAN RAIL PASS</strong> (7 วัน ออนไลน์ {JRP_7DAY}){" "}
              <strong>JR TOKYO Wide Pass</strong> ({PASS_ADULT} 3 วัน) และ <strong>JR EAST PASS</strong> ({EAST_PASS_5DAY} 5 วัน)
              ใช้กับรถไฟช่วงนี้ได้ทั้งหมด และทริปวันเดียวแบบไม่มีอุปกรณ์มีค่าใช้จ่ายเพิ่ม <strong>¥19,500</strong> ตามราคาออนไลน์ของ GALA
              Yuzawa (บัตรลิฟต์สกี {LIFT_WEB} ชุดสกี {SKI_SET} ชุดสกีเสื้อกางเกง {WEAR}) ตรวจสอบเมื่อ {OWN} จากเว็บไซต์ของ GALA Yuzawa และ
              JR East เวลาเปิดรายวันฤดูกาล 2026-27 ยังรอประกาศอย่างเป็นทางการ
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
          label="จองสำหรับทริปเดียวกัน"
          heading="ทริปวันเดียวไป GALA Yuzawa ต้องจองอะไรบ้าง"
          intro="เริ่มจากอินเทอร์เน็ตมือถือและการเดินทางจากสนามบิน ตามด้วยพาส แล้วจึงเป็นรายการที่ GALA Yuzawa ขายแยก บัตรลิฟต์สกีและคอร์สเรียนสกีเป็นสองรายการที่ทริปสกีวันเดียวครั้งแรกมักจองไม่ครบ ราคาบน Klook เปลี่ยนตามวันที่ จึงควรเปิดหน้าสินค้าตามวันเดินทางของคุณ"
          items={tripPrepItems}
        />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="yuzawa" />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>เดินทางจากโตเกียวไป GALA Yuzawa อย่างไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>นั่งชินคันเซ็นสายโจเอ็ตสึขบวนตรง (Tanigawa) จากสถานีโตเกียวไป GALA Yuzawa</strong> ขบวนที่เร็วที่สุด {FASTEST} ไม่ต้องต่อรถ
            และประตูตรวจตั๋วเปิดสู่ศูนย์สกีทันที ขบวนตรงวิ่งเฉพาะฤดูกาลเริ่ม {SIGHTSEEING_OPEN} ทางเลือกสำรองคือนั่งชินคันเซ็นไปเอจิโกะยูซาวะแล้วต่อรถรับส่งฟรี
            10 นาทีของ GALA Yuzawa ส่วนทางเลือกที่ช้ากว่าคือทัวร์รถบัสวันเดียวหรือรถเช่าเหมาคัน
          </p>
          <Table
            head={["เส้นทาง", "เวลา", "ขบวน / ช่วงที่วิ่ง", "ค่าใช้จ่าย", "ข้อควรรู้"]}
            rows={accessRows.map((r) => [r.leg, r.time, r.trains, r.cost, r.note])}
          />
          <Sources>
            {ext("https://gala.co.jp/winter/access/", "gala.co.jp/winter/access/")},{" "}
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "ประกาศรถไฟฤดูหนาวของ JR East (22 ต.ค. 2026)")},{" "}
            {ext("https://www.jreast.co.jp/en/multi/destinations/gala.html", "หน้าแนะนำ GALA Yuzawa ของ JR East")} หน้านี้ไม่ได้ระบุค่าโดยสารเที่ยวเดียว
            เพราะ JR East ปรับค่าโดยสารเมื่อ 14 มีนาคม 2026 และราคาตามวันเดินทางจะแสดงในหน้าชำระเงิน เวลาของทัวร์รถบัสและรถเช่าเหมาคันมาจากหน้าสินค้าของ Klook
          </Sources>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>สิ่งที่คุณต้องตรวจสอบเองตามวันที่</strong> คือขบวนที่ต้องการวิ่งถึง GALA Yuzawa ในวันเดินทางหรือไม่ ขบวนพิเศษช่วงเช้า Tanigawa 71
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
            <strong>ขบวนที่เร็วที่สุด {FASTEST} และในทางปฏิบัติประมาณ 71 ถึง 80 นาที</strong> ประกาศของ JR East วันที่ 22 ตุลาคม 2026 ระบุว่า
            Tanigawa 71 โตเกียว 6:24 → GALA Yuzawa 7:35 และขากลับ Tanigawa 86 GALA Yuzawa 17:04 → โตเกียว 18:20 ส่วนหน้าแนะนำ GALA Yuzawa ของ
            JR East ระบุว่าขบวน Tanigawa ใช้เวลาประมาณ 1 ชั่วโมง 20 นาที ถ้าเล่นสกีกลางคืน Tanigawa 198 ออกจาก GALA Yuzawa 20:19 ถึงโตเกียว
            21:40 ในวันที่ 16 และ 30 มกราคม และ 13 และ 27 กุมภาพันธ์ 2027 ตรวจสอบเมื่อ {OWN}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ค่าใช้จ่ายทั้งวัน</span>
          <h2 className={styles.sectionTitle}>ทริปวันเดียวไป GALA Yuzawa ใช้เงินเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>ผู้ใหญ่ที่ไม่มีอุปกรณ์ใช้ประมาณ ¥19,500 ที่ลานสกี บวกค่ารถไฟ</strong> ตามราคาออนไลน์ 2026-27 ของ GALA Yuzawa เอง
            วันเล่นหิมะของคนที่ไม่เล่นสกีพร้อมเลื่อนหิมะอยู่ที่ ¥8,000
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
          <h2 className={styles.sectionTitle}>GALA Yuzawa ฤดูกาล 2026-27 เปิดเมื่อไร</h2>
          <p className={styles.bodyText}>
            <strong>ลานสกีเปิด {SLOPES_OPEN} และมีกำหนดเปิดถึง {SLOPES_CLOSE}</strong> สัปดาห์ก่อนหน้า {SIGHTSEEING_OPEN} ถึง 18 ธันวาคม 2026
            เปิดเฉพาะชมวิว มีกอนโดลาและลิฟต์ชมวิว แต่เล่นสกีและสโนว์บอร์ดไม่ได้ไม่ว่าหิมะจะมากแค่ไหน และชินคันเซ็นตรงเริ่มวิ่งพร้อมกันวันที่ 12 ธันวาคม
            GALA Yuzawa ระบุว่าช่วงเวลาและรูปแบบการเปิดอาจเปลี่ยนตามปริมาณหิมะและสภาพอากาศ ถ้าจองช่วง 12 ถึง 18 ธันวาคมโดยตั้งใจจะเล่นสกี
            คุณจะได้แค่นั่งกอนโดลา
          </p>
          <Table head={["2026-27", "วันที่"]} rows={seasonRows.map((r) => [r.what, r.detail])} />
          <Sources>
            {ext("https://gala.co.jp/winter/hours-pricing/", "gala.co.jp/winter/hours-pricing/")},{" "}
            {ext("https://www.jreast.co.jp/press/2026/niigata_j/20261022_n01.pdf", "JR East (22 ต.ค. 2026)")},{" "}
            {ext("https://www.jre-travel.com/seasonal/ski/gala/", "เว็บไซต์ท่องเที่ยวของ JR East")}
          </Sources>
          <div style={{ marginTop: "1.25rem" }}>
            <Table head={["ภูเขา", `GALA Yuzawa 2026-27 (ตรวจสอบ ${OWN})`]} rows={mountainRows.map((r) => [r.what, r.detail])} />
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            เส้นทาง ระดับความยาก ลิฟต์ ความสูง และการปิดโซน South มาจากหน้าแผนที่ลานสกีของ GALA Yuzawa เอง (
            {ext("https://gala.co.jp/winter/gelande/", "gala.co.jp/winter/gelande/")}) ตรวจสอบเมื่อ {OWN}{" "}
            <strong>การปิดโซน South เป็นเรื่องเฉพาะฤดูกาล 2026-27</strong> คู่มือเที่ยวที่เขียนไว้ก่อนหน้านี้จะไม่มีข้อมูลนี้
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>บัตรลิฟต์สกี</span>
          <h2 className={styles.sectionTitle}>บัตรลิฟต์สกี GALA Yuzawa ราคาเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>ผู้ใหญ่ 1 วัน ที่เคาน์เตอร์ {LIFT_WINDOW} ออนไลน์ {LIFT_WEB}</strong> บัตรทุกแบบที่ GALA Yuzawa ขายต่างกันอย่างน้อย ¥500
            การซื้อล่วงหน้าจึงเป็นวิธีประหยัดที่ง่ายที่สุดของวันนี้ ตัวเลือกที่ถูกกว่าจริงมีสองแบบ และบัตร 4 ชั่วโมงไม่ใช่หนึ่งในนั้น
          </p>
          <Table head={["ประเภทบัตร", "เคาน์เตอร์", "ออนไลน์", "ข้อควรรู้"]} rows={liftRows.map((r) => [r.ticket, r.window, r.web, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            ทุกราคามาจากตารางราคา 2026-27 ของ GALA Yuzawa เอง ตรวจสอบเมื่อ {OWN} &ldquo;เด็กประถม&rdquo; คือกลุ่ม 小学生 ของรีสอร์ต
            ตรวจสอบอีกครั้งในหน้าชำระเงิน บัตรราคาพิเศษ ¥4,300 จำนวน 1,000 ใบที่ GALA Yuzawa เปิดขายตั้งแต่ 5 ตุลาคม 2026 ขึ้นว่าขายหมดแล้ว
            ราคาที่ซื้อได้จริงจึงเป็นราคาออนไลน์ข้างบน
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
            ได้ และจุดเช่าอยู่ในอาคารเดียวกับสถานี ทริปวันเดียวจากโตเกียวแบบไม่มีอุปกรณ์จึงทำได้ที่นี่ สิ่งที่ควรรู้ก่อนรวมค่าใช้จ่ายคือ GALA Yuzawa
            คิดราคา<strong>อุปกรณ์และชุดสกีแยกกัน</strong> และให้เช่าแว่นสกีกับหมวกกันน็อกเป็นชิ้นเพิ่มอีก
          </p>
          <Table
            head={["รายการ", "มัธยมต้นขึ้นไป", "ชั้นประถมลงมา", "ข้อควรรู้"]}
            rows={rentalRows.map((r) => [r.item, r.adult, r.child, r.note])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>รวมยอดหนึ่งครั้งก่อนจอง</strong> ผู้ใหญ่ที่ไม่มีอุปกรณ์และซื้อบัตรกอนโดลาและลิฟต์สกี 1 วันแบบออนไลน์จ่าย {LIFT_WEB} ชุดอุปกรณ์{" "}
            {SKI_SET} และชุดสกี {WEAR} ยังไม่รวมแว่นสกี หมวกกันน็อก ชินคันเซ็น หรืออาหารกลางวัน ยอดนี้คือเหตุผลที่ควรเทียบสินค้า Klook ในหน้านี้กับการซื้อแยกที่เคาน์เตอร์
            และ PICK UP BOX ราคา ¥1,000 เป็นบริการเสริมเดียวที่ให้ผลชัดเจน คือไม่ต้องรอที่จุดเช่าอุปกรณ์ ทุกราคาเป็นของ GALA Yuzawa เอง ตรวจสอบเมื่อ {OWN}
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>มือใหม่</span>
          <h2 className={styles.sectionTitle}>GALA Yuzawa เหมาะกับมือใหม่หรือคนที่ไม่เล่นสกีไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            เหมาะทั้งสองกลุ่ม <strong>35% ของพื้นที่เป็นระดับเริ่มต้น</strong> และกอนโดลาพาคุณจากอาคารสถานีขึ้นไปถึงด้านบนของพื้นที่นั้น คนที่ไม่เล่นสกีใช้บัตรกอนโดลาและ
            Barouche ซึ่งถูกกว่า เพื่อเข้าลานเล่นหิมะและลานเลื่อนหิมะบนยอดกอนโดลาได้ ข้อควรรู้เป็นเรื่องของฤดูกาลนี้ โซน South ปิด ภูเขาจึงเล็กกว่าที่คู่มือเที่ยวรุ่นเก่าบรรยาย
          </p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>สำหรับคนที่ไม่เล่นสกี</p>
              <p className={styles.whoForDesc}>
                บัตรกอนโดลาและ Barouche (ออนไลน์ ¥5,500 เคาน์เตอร์ ¥6,500) ใช้กับกอนโดลา ลานเล่นหิมะที่สถานีบนยอด และลิฟต์ชมวิว Barouche ไปจุดชมวิว
                愛の鐘 (ระฆังแห่งความรัก) ที่มองเห็นเทือกเขาทานิงาวะ (10:00–16:00 น. ประมาณ 30 นาที) ได้ เช่าเลื่อนหิมะที่สถานีบนยอด {SLED} ลานเล่นหิมะเปิด
                8:30–16:00 น. เมื่อสภาพอากาศเอื้ออำนวย เด็กก่อนวัยเรียนขึ้นกอนโดลาฟรี ข้อมูลจากหน้ากิจกรรมของ GALA Yuzawa ตรวจสอบเมื่อ {OWN}{" "}
                ถ้าอยากเล่นเลื่อนหิมะใกล้โตเกียวกว่านี้ ดู
                <Link href="/guides/attractions/tokyo-snow-day-trip" hrefLang="en" style={linkStyle}>
                  คู่มือเที่ยวหิมะวันเดียวจากโตเกียว (ภาษาอังกฤษ)
                </Link>
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>ข้อดี</p>
              <p className={styles.whoForDesc}>
                ภูเขาที่แบ่งระดับเริ่มต้น 35% ระดับกลาง 45% และระดับสูง 20% ตามตัวเลขของรีสอร์ต ลิฟต์ 11 ตัว และเดินจากสถานีถึงลานสกีได้ในไม่กี่นาที
                สำหรับวันแรกบนหิมะ ที่นี่โดดเด่นที่สุดในบรรดาลานสกีที่ไปกลับจากโตเกียวได้ในวันเดียว เพราะเรื่องการเดินทางแทบไม่มีจุดที่จะผิดพลาดก่อนเริ่มเล่น
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>ข้อเสียในฤดูกาลนี้</p>
              <p className={styles.whoForDesc}>
                โซน South ไม่เปิดในฤดูกาล 2026-27 รีสอร์ตเขียนไว้ว่า 南エリアの営業を休止いたします เส้นทางที่ใช้ได้มี 12 เส้นทาง ได้แก่ 5 เส้นทางในโซน Central
                6 เส้นทางในโซน North และเส้นทางดาวน์ฮิล Falcon พอสำหรับวันของมือใหม่ แต่น้อยไปสำหรับการมาครั้งที่สอง และเป็นเหตุผลให้ดูทริปวันเดียวไปฮาคุบะหรือนาเอบะแทน
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>รายการที่มือใหม่มักลืมซื้อ</p>
              <p className={styles.whoForDesc}>
                คอร์สเรียนสกี ตารางราคาของ GALA Yuzawa ขายบัตรลิฟต์สกีและชุดอุปกรณ์เช่า ส่วนคอร์สเรียนต้องจองแยก และหน้าสินค้าของ Klook ระบุชัดว่ายังต้องซื้อบัตรลิฟต์สกีเพิ่มจากคอร์สเรียน
                วันที่มีบัตรและอุปกรณ์แต่ไม่มีครู คือมีพื้นที่ระดับเริ่มต้น 35% แต่ไม่มีใครสอนวิธีเล่น
              </p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>วิธีที่ถูกที่สุดสำหรับวันแรก</p>
              <p className={styles.whoForDesc}>
                ซื้อบัตรกอนโดลาและ Barouche ที่เคาน์เตอร์ ¥6,500 หรือออนไลน์ ¥5,500 แทนบัตรเต็ม ¥8,000 มือใหม่จะไม่ออกนอกพื้นที่กอนโดลาและ Barouche
                บัตรทั้งภูเขาจึงเท่ากับจ่าย ¥2,500 ให้ลิฟต์ที่คุณจะไม่ได้ขึ้น ราคาของรีสอร์ตเอง ตรวจสอบเมื่อ {OWN}
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
            <strong>ได้ พาสทั้งสามแบบที่นักท่องเที่ยวน่าจะมีใช้กับชินคันเซ็นไป GALA Yuzawa ได้ทั้งหมด</strong> <strong>JAPAN RAIL PASS</strong>{" "}
            แบบทั่วประเทศใช้กับชินคันเซ็นทุกสายของกลุ่ม JR ได้ ยกเว้น NOZOMI และ MIZUHO จึงรวมชินคันเซ็นสายโจเอ็ตสึ (Gran Class ต้องจ่ายเพิ่ม)
            พาสธรรมดา 7 วันราคา <strong>{JRP_7DAY}</strong> เมื่อซื้อออนไลน์ หรือ ¥53,000 ที่ตัวแทนจำหน่ายในต่างประเทศ <strong>JR EAST PASS</strong>{" "}
            ราคา <strong>{EAST_PASS_5DAY}</strong> สำหรับ 5 วัน และ ¥50,000 สำหรับ 10 วัน ใช้กับทุกสายของ JR East ได้ ตรวจสอบเมื่อ {OWN} จาก
            japanrailpass.net และ JR East
          </p>
          <p className={styles.bodyText}>
            <strong>JR TOKYO Wide Pass</strong> ถูกที่สุดในสามแบบสำหรับทริปนี้ GALA Yuzawa อยู่ในพื้นที่ใช้งาน JR East ระบุเป็นหนึ่งในจุดหมายของพาสเอง
            และใช้กับชินคันเซ็นสายโจเอ็ตสึไปที่นั่นได้ทั้งที่นั่งจองและไม่จองในตู้ธรรมดา ราคาผู้ใหญ่ <strong>{PASS_ADULT}</strong> เด็กอายุ 6 ถึง 11 ปี{" "}
            <strong>¥8,000</strong> ใช้ได้ <strong>3 วันติดกัน</strong> เป็นราคาตั้งแต่ <strong>14 มีนาคม 2026</strong> ที่ปรับขึ้นจาก ¥15,000 และ
            ¥7,500 ตรวจสอบเมื่อ {OWN}
          </p>
          <p className={styles.bodyText}>
            คำถามที่ควรตอบคือ<em>คุ้มค่าไหม</em> และ JR East ตอบด้วยตัวอย่างการคำนวณของตัวเอง <strong>ไปกลับ GALA Yuzawa และไปกลับนิกโก้ด้วยรถด่วนพิเศษ</strong>{" "}
            แบบที่นั่งจองทั้งหมด ซื้อแยกรวม <strong>{JR_EXAMPLE}</strong> เทียบกับพาส {PASS_ADULT} ตัวอย่างนี้คือทริปวันเดียว<strong>สองทริป</strong>{" "}
            ไป GALA Yuzawa วันเดียวไม่ถึงราคาพาส {PASS_ADULT} หลักง่าย ๆ คือ ซื้อพาสถ้า GALA Yuzawa เป็นหนึ่งในทริปวันเดียวจากโตเกียว 2 ถึง 3 ทริป
            และซื้อตั๋วเฉพาะเส้นทางถ้าไปที่นี่ที่เดียว ข้อจำกัดตามฤดูกาลคือสถานี GALA Yuzawa เปิดเฉพาะฤดูหนาวและฤดูใบไม้ผลิ นอกฤดูกาลพาสเดียวกันจะพาคุณไปเอจิโกะยูซาวะแทน{" "}
            <Link href="/guides/transport/tokyo-wide-pass" hrefLang="en" style={linkStyle}>
              คู่มือ JR Tokyo Wide Pass (ภาษาอังกฤษ)
            </Link>{" "}
            คำนวณจุดคุ้มทุนของทุกทริปวันเดียวในคันโต และ
            <Link href="/guides/transport/jr-pass-guide" hrefLang="en" style={linkStyle}>
              คู่มือ JR Pass (ภาษาอังกฤษ)
            </Link>{" "}
            ทำแบบเดียวกันสำหรับพาสทั่วประเทศ
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
            นั่งชินคันเซ็นถ้าอยากได้เวลาบนหิมะมากที่สุด จองทัวร์รถบัสถ้าอยากตัดสินใจน้อยที่สุด สิ่งที่ต้องเข้าใจคือทั้งสองแบบไม่ได้ไปลานสกีเดียวกัน
            รถไฟไป GALA Yuzawa ส่วนทัวร์รถบัสจากโตเกียวไปอิวัปปาระและลานสกีข้างเคียงในยูซาวะ
          </p>
          <Table head={["รูปแบบของวัน", "สิ่งที่รวม", "สรุป", "ข้อควรรู้"]} rows={shapeRows.map((r) => [r.shape, r.covers, r.verdict, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>มีรายละเอียดการจองหนึ่งข้อที่ต้องตรวจสอบตอนนี้</strong> ณ {OWN} เว็บไซต์ท่องเที่ยวของ JR East ยังขึ้นแพ็กเกจชินคันเซ็นพร้อมบัตรลิฟต์สกี{" "}
            <em>JR SKISKI</em> ไป GALA Yuzawa ฤดูกาล 2026-27 ว่า &ldquo;Coming Soon&rdquo; และคาดว่าจะเปิดจองราวกลางเดือนพฤศจิกายน 2026
            แพ็กเกจทางการของฤดูกาลนี้จึงยังจองไม่ได้ ขณะที่สินค้าของตัวแทนจำหน่ายด้านล่างเปิดขายแล้ว รับบัตรที่ออกในต่างประเทศ และแสดงหน้าจอเป็นภาษาไทย
            ถ้าต้องการแพ็กเกจ ให้รอกลางเดือนพฤศจิกายน ถ้าอยากได้วันที่แน่นอนตอนนี้ ให้จองแยกทีละรายการ
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={IWAPPARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์รถบัสยูซาวะจากโตเกียว →
            </KlookLink>
            <KlookLink href={CHARTER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              รถเช่าเหมาคันไป GALA Yuzawa / นาเอบะ →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ทริปหน้าหนาวที่เหลือ</span>
          <h2 className={styles.sectionTitle}>วันที่ GALA Yuzawa เข้ากับทริปไหน</h2>
          <p className={styles.bodyText}>
            GALA Yuzawa เป็นทริปหนึ่งวันจากที่พักในโตเกียว จึงควรวางแผนให้เข้ากับทริปที่เหลือ{" "}
            <Link href="/th/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              แผนเที่ยวญี่ปุ่นหน้าหนาว 12 วัน
            </Link>{" "}
            แสดงว่าช่วงพักในโตเกียวต่อกับพื้นที่หิมะทางเหนือและตะวันตกอย่างไร ทริปหน้าหนาววันเดียวอีกทริปที่ควรเทียบราคาด้วยคือ
            <Link href="/th/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>
              ทัวร์ลิงหิมะจิโกกุดานิ
            </Link>{" "}
            GALA Yuzawa บนชินคันเซ็นสายโจเอ็ตสึและนากาโน่บนชินคันเซ็นสายโฮคุริคุอยู่ใน JR EAST PASS ทั้งคู่ ถ้าไปทั้งสองที่ ผลการคำนวณจะเปลี่ยน
            หลังเล่นสกีแล้วกลับเข้าเมืองให้ทันชม
            <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en" style={linkStyle}>
              ไฟประดับหน้าหนาวในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            ซึ่งใช้แค่ช่วงเย็นเดียว
          </p>
          <p className={styles.bodyText}>
            ถ้าอยู่ญี่ปุ่นในเดือนมกราคม ให้กำหนด
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              ทัวร์ชมไฟที่ทาคายามะและชิราคาวาโกะ (ภาษาอังกฤษ)
            </Link>{" "}
            ก่อน แล้วจึงจัด GALA Yuzawa รอบ ๆ เพราะงานประดับไฟจัดเพียง 4 คืนที่กำหนดไว้ ส่วน GALA Yuzawa เปิดตลอดฤดูกาล ถ้าวันแรกทำให้อยากเล่นสกีทั้งสัปดาห์
            ขั้นต่อไปคือ
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
            อธิบายลานสกีหมู่บ้านออนเซ็นที่ไปจากสถานีอีอิยามะ
            <Link href="/guides/attractions/japan-ski-trip-itinerary" hrefLang="en" style={linkStyle}>
              แผนเที่ยวสกีญี่ปุ่น (ภาษาอังกฤษ)
            </Link>{" "}
            แบ่งจำนวนคืนในแต่ละที่สำหรับทริปสกี 7 หรือ 10 วัน ทริปขึ้นเหนือเดือนกุมภาพันธ์วางแผนรอบ
            <Link href="/th/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              ทัวร์เทศกาลหิมะซัปโปโร
            </Link>{" "}
            วันที่ 4 ถึง 11 กุมภาพันธ์ 2027 ได้ แล้วเพิ่ม
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
          <h2 className={styles.sectionTitle}>ประกันการเดินทางใช้กับวันเล่นสกีได้ไหม</h2>
          <p className={styles.bodyText}>
            ตรวจสอบก่อนซื้อบัตรลิฟต์สกี ไม่ใช่หลังจากนั้น กรมธรรม์จะคุ้มครองกีฬาหิมะหรือไม่ขึ้นกับกรมธรรม์ เช่น SafetyWing คุ้มครองการเล่นสกีและสโนว์บอร์ดในเส้นทางของลานถ้าสวมหมวกกันน็อก
            ส่วนนอกเส้นทางไม่อยู่ในเงื่อนไขนั้น และกรมธรรม์อื่นอาจต้องซื้อความคุ้มครองเพิ่ม วันเล่นหิมะเป็นวันที่มีโอกาสเกิดค่ารักษาพยาบาลมากที่สุดในทริปญี่ปุ่น
            เรื่องนี้จึงสำคัญกว่า ¥500 ที่ประหยัดได้จากการซื้อบัตรออนไลน์
            <Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en" style={linkStyle}>
              คู่มือประกันการเดินทางสำหรับเล่นสกีในญี่ปุ่น (ภาษาอังกฤษ)
            </Link>{" "}
            สรุปว่าข้อยกเว้นที่พบบ่อยเขียนไว้อย่างไร และอะไรนับเป็นนอกเส้นทาง
          </p>
          <p className={styles.bodyText}>
            อีกสองเรื่องที่ควรเตรียมก่อนไป GALA Yuzawa เรื่องแรกคือ<strong>อินเทอร์เน็ตมือถือ</strong> เพราะรีสอร์ตแจ้งในประกาศของตัวเองว่าวันและเวลาเปิดเปลี่ยนตามหิมะและสภาพอากาศ
            และที่สถานีเฉพาะฤดูกาลบนเส้นทางสายย่อย ประกาศปิดลานจะมาถึงคุณทางโทรศัพท์เท่านั้น{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              ดูตัวเลือก eSIM บน Klook →
            </KlookLink>{" "}
            และ
            <Link href="/th/guides/esim/best-esim-japan" style={linkStyle}>
              คู่มือเลือก eSIM ญี่ปุ่น
            </Link>{" "}
            เปรียบเทียบกับตัวเลือกอื่น เรื่องที่สองคือ<strong>วิธีชำระเงิน</strong> ระบบจองของรีสอร์ตเองออกแบบมาสำหรับบัตรที่ออกในญี่ปุ่น
            ซึ่งเป็นเหตุผลสำคัญที่มีตัวแทนจำหน่ายสำหรับรีสอร์ตนี้
          </p>
        </section>

        <p className={styles.bodyText}>
          ชินคันเซ็นไป GALA Yuzawa ออกจากสถานีโตเกียว
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en" style={linkStyle}>
            คู่มือเลือกที่พักในโตเกียว (ภาษาอังกฤษ)
          </Link>{" "}
          จึงแนะนำย่านสถานีโตเกียวสำหรับทริปที่มีทริปวันเดียวหลายวัน
        </p>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเกี่ยวกับ GALA Yuzawa" />

        <KlookTourPicks
          heading="ลานสกีวันเดียวอื่นที่ไปจากโตเกียวได้"
          intro="GALA Yuzawa เร็วที่สุด แต่ไม่ใช่ที่เดียว ตัวเลือกเหล่านี้เหมาะเมื่อหิมะในพื้นที่ยูซาวะมีน้อย เมื่อการปิดโซน South ทำให้ 12 เส้นทางดูน้อยไป หรือเมื่อคุณอยากจองครั้งเดียวแทนการซื้อแยกสี่อย่าง"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/th/guides/attractions/jigokudani-snow-monkey-tour", title: "ทัวร์ลิงหิมะจากโตเกียว: คู่มือจิโกกุดานิ (2027)" },
            { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): ราคา การใช้งาน และคุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-wide-pass", title: "JR Tokyo Wide Pass 2026: ราคา แผนที่ และคุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/money/best-travel-insurance-japan", title: "ประกันการเดินทางญี่ปุ่น 2026: ใครต้องการอะไร (ภาษาอังกฤษ)" },
            { href: "/guides/money/japan-ski-travel-insurance", title: "ประกันการเดินทางสำหรับเล่นสกีในญี่ปุ่น (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/niseko-ski-tours", title: "ทัวร์สกีนิเซโกะ 2026-27" },
            { href: "/th/guides/attractions/japan-winter-itinerary", title: "แผนเที่ยวญี่ปุ่นหน้าหนาว 12 วัน (2027)" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "ทัวร์ทาคายามะและชิราคาวาโกะ (2027) (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/sapporo-snow-festival-tours", title: "ทัวร์เทศกาลหิมะซัปโปโร (2027)" },
            { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "ทริปวันเดียวไปโอตารุจากซัปโปโร (2027) (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/hokkaido-7-day-itinerary", title: "แผนเที่ยวฮอกไกโด 7 วัน" },
            { href: "/guides/attractions/tokyo-illumination-tours", title: "ไฟประดับโตเกียว: วันที่ เวลา และจุดฟรี (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-snow-day-trip", title: "เที่ยวหิมะวันเดียวจากโตเกียว (2026-27) (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "ทริปวันเดียวไปคารุอิซาวะจากโตเกียว (2026) (ภาษาอังกฤษ)" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น (2026): ผู้ให้บริการ ราคา และวิธีเลือก" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำในญี่ปุ่นเพิ่มเติม (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>{FASTEST} จากโตเกียว และสามสิ่งที่ต้องซื้อ</h2>
            <p className={styles.ctaBannerDesc}>
              ลานสกีเปิด {SLOPES_OPEN} บัตรลิฟต์สกีที่เคาน์เตอร์ {LIFT_WINDOW} ออนไลน์ {LIFT_WEB} อุปกรณ์แยก และคอร์สเรียนสกีก็แยกอีก
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
