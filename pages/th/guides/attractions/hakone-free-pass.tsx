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
  hakoneCruiseCableCarTour,
  hakoneFreepass,
  hakoneFreepassTripPrep,
  hakoneLoopBusTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/hakone-free-pass) section by section as of
// 2026-11-24 (task-jtk-20261124-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: "Hakone Free Pass" — Thai results and Thai travel pages write the pass in Latin
// script, with "ราคา" / "คุ้มไหม" around it. Paragraphs stay on one line: a JSX line break
// renders as a space, and in Thai a space is a sentence break.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/hakone-free-pass";
const TITLE = "Hakone Free Pass 2026: ราคา คุ้มไหม";
const H1 = "Hakone Free Pass 2026: ราคาจากชินจูกุ เส้นทาง และคุ้มไหม";
const DESC =
  "Hakone Free Pass: ชินจูกุ 2 วัน ¥7,100 โอดาวาระ ¥6,000 ไม่ใช้พาสครบวง ¥8,322 วันเดียวก็คุ้ม";

const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const BUY_CHECKED_ISO = "2026-11-13";
const BUY_CHECKED = dateLabel(BUY_CHECKED_ISO, LOCALE);
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const JR_URL = "https://odakyu-global.com/blog/2053/";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const NAVI_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ODAKYU_URL = "https://www.odakyu.jp/english/passes/hakone/";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";

const PASS_2_DAY_SHINJUKU = "¥7,100";
const PASS_3_DAY_SHINJUKU = "¥7,500";
const PASS_2_DAY_ODAWARA = "¥6,000";
const PASS_3_DAY_ODAWARA = "¥6,400";
const ROMANCECAR = "¥1,200";
const ROPEWAY = "¥2,000";
const CRUISE = "¥1,700";

const HAKONE_PASS_URL = klookFor(hakoneFreepass.url, LOCALE);
const HAKONE_TOUR_URL = klookFor(hakoneLoopBusTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { pass: "นักท่องเที่ยวส่วนใหญ่ที่ออกจากโตเกียว: แบบ 2 วันจากชินจูกุ", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "จากชินจูกุ (รวมรถไฟสายโอดะคิวไปกลับ)", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "จากโอดาวาระ (เฉพาะพื้นที่ฮาโกเน่)", d2a: PASS_2_DAY_ODAWARA, d2c: "¥1,500", d3a: PASS_3_DAY_ODAWARA, d3c: "¥1,750" },
  { pass: "จากมาจิดะ", d2a: "¥6,820", d2c: "¥1,600", d3a: "¥7,220", d3c: "¥1,850" },
  { pass: "จากฟุจิซาวะ", d2a: "¥7,050", d2c: "¥1,600", d3a: "¥7,450", d3c: "¥1,850" },
];

const buyRows = [
  {
    where: "สรุปสั้น ๆ",
    ticket: "ถ้าทุกคนในกลุ่มมีสมาร์ตโฟน ให้ซื้อออนไลน์ก่อนเดินทาง",
    when: "ถ้ามีเด็กที่ไม่มีโทรศัพท์ของตัวเอง ให้ซื้อตั๋วกระดาษที่สถานีโอดะคิว",
    note: "พาสดิจิทัลเก็บไว้ในสมาร์ตโฟน (ถ้าเดินทางด้วยกัน ตัวเลือก For Group ใส่ได้สูงสุด 4 ใบในโทรศัพท์เครื่องเดียว) ส่วนพาสกระดาษใช้ได้กับทุกคน",
  },
  {
    where: "EMot Online Tickets (เว็บไซต์ทางการของโอดะคิว)",
    ticket: "QR code ดิจิทัล ใช้ได้เฉพาะสมาร์ตโฟน",
    when: "ออนไลน์ ก่อนเดินทาง",
    note: "ตัวเลือก For Group ใส่ได้สูงสุด 4 ใบในโทรศัพท์เครื่องเดียว สำหรับคนที่เดินทางด้วยกัน ที่นั่ง Romancecar ที่จองที่นี่ถูกกว่าซื้อที่สถานี ¥50 ขอคืนเงินได้เฉพาะเมื่อตั๋วแสดงปุ่ม Refund",
  },
  {
    where: "สถานีสายโอดะคิว (เครื่องขายตั๋ว) และ Odakyu Sightseeing Service Center",
    ticket: "ตั๋วกระดาษ",
    when: "สถานีสายโอดะคิวขายล่วงหน้าได้ 1 เดือน ส่วนเครื่องขายตั๋วขายเฉพาะพาสที่เริ่มใช้วันนั้น",
    note: "เครื่องขายตั๋วรับเงินสด PASMO/Suica และ American Express, Diners Club, JCB, Mastercard, Visa",
  },
  {
    where: "7-Eleven (7-Ticket)",
    ticket: "ตั๋วกระดาษที่พิมพ์จากเครื่องถ่ายเอกสารอเนกประสงค์ในร้าน",
    when: "ก่อนเดินทาง",
    note: "ไม่มีค่าธรรมเนียมออกตั๋ว แบบที่รวมรถไฟสายโอดะคิวไปกลับขายเฉพาะแบบออกจากชินจูกุ",
  },
  {
    where: "ที่ฮาโกเน่: เครื่องขายตั๋วของรถไฟฮาโกเน่โทซัน และศูนย์ข้อมูลรถบัสฮาโกเน่โทซัน",
    ticket: "ตั๋วกระดาษ",
    when: "ในวันเดินทาง",
    note: "เครื่องขายตั๋วอยู่ที่ฮาโกเน่ยุโมโตะ โกระ โซอุนซัง และสถานีอื่นของรถไฟโทซัน ส่วนศูนย์ข้อมูลรถบัสอยู่ที่สถานีโอดาวาระ ฮาโกเน่ยุโมโตะ โมโตะฮาโกเน่ ฮาโกเน่มาจิ เซ็นโกคุ โทเง็นได และมิยางิโนะ",
  },
  {
    where: "Klook",
    ticket: "การจองผ่าน Klook สำหรับพาสโอดะคิวใบเดียวกัน",
    when: "ออนไลน์ ก่อนเดินทาง",
    note: "หน้าชำระเงินภาษาไทยที่รับบัตรที่ออกในต่างประเทศ วิธีใช้ใบยืนยันการจองและเงื่อนไขการยกเลิกดูได้ในหน้าสินค้า",
  },
];

const coverageRows = [
  {
    mode: "รถไฟสายโอดะคิว (ชินจูกุ ⇄ โอดาวาระ)",
    included: "✓ ไปกลับ 1 รอบ",
    note: "เฉพาะแบบออกจากชินจูกุ และแวะลงระหว่างทางได้ แบบออกจากโอดาวาระไม่รวมช่วงนี้",
  },
  { mode: "รถไฟฮาโกเน่โทซัน (โอดาวาระ / ฮาโกเน่ยุโมโตะ ⇄ โกระ)", included: "✓ ไม่จำกัดเที่ยว", note: "รถไฟภูเขาที่ไต่ขึ้นแบบสลับฟันปลา เป็นช่วงแรกของเส้นทางวงรอบจากฮาโกเน่ยุโมโตะ" },
  { mode: "เคเบิลคาร์ฮาโกเน่โทซัน (โกระ ⇄ โซอุนซัง)", included: "✓ ไม่จำกัดเที่ยว", note: "รถรางไต่เขาที่ขึ้นไปยังสถานีล่างของกระเช้าลอยฟ้า" },
  { mode: "กระเช้าลอยฟ้าฮาโกเน่ (โซอุนซัง ⇄ โอวาคุดานิ ⇄ โทเง็นได)", included: "✓ ไม่จำกัดเที่ยว", note: `ช่วงที่ผ่านโอวาคุดานิ และเป็นช่วงที่แพงที่สุดของเส้นทางวงรอบ เที่ยวเดียว ${ROPEWAY}` },
  { mode: "เรือท่องเที่ยวฮาโกเน่ (เรือโจรสลัดทะเลสาบอาชิ)", included: "✓ ไม่จำกัดเที่ยว", note: `จากโทเง็นไดไปฮาโกเน่มาจิหรือโมโตะฮาโกเน่ ถ้าไม่มีพาสเที่ยวเดียว ${CRUISE} ห้องโดยสารพิเศษต้องจ่ายเพิ่ม` },
  { mode: "รถบัสฮาโกเน่โทซัน (เส้นทางที่กำหนด)", included: "✓ ไม่จำกัดเที่ยว", note: "ใช้ปิดวงรอบกลับไปฮาโกเน่ยุโมโตะหรือโอดาวาระ" },
  { mode: "รถบัสวนชมสถานที่ท่องเที่ยว \"KANKO SHISETSU-MEGURI\"", included: "✓ ไม่จำกัดเที่ยว", note: "รถบัสฮาโกเน่โทซันและ Odakyu Highway Bus เดินรถระหว่างสถานที่ท่องเที่ยว" },
  { mode: "Odakyu Highway Bus (เส้นทางที่กำหนด)", included: "✓ ไม่จำกัดเที่ยว", note: "ผู้ที่มีตั๋วจองที่นั่งได้ขึ้นก่อน รถจึงอาจเต็ม" },
  { mode: "Tokai Bus (เส้นทางที่กำหนด)", included: "✓ ไม่จำกัดเที่ยว", note: "ใช้ได้เฉพาะในช่วงที่กำหนดเท่านั้น" },
  { mode: "รถไฟด่วนพิเศษ Romancecar", included: "✗ ไม่รวม", note: `ต้องซื้อตั๋วที่นั่งแยก ผู้ใหญ่ ${ROMANCECAR} เด็ก ¥600 จากชินจูกุไปฮาโกเน่ยุโมโตะ` },
  { mode: "Izu-Hakone Bus", included: "✗ ไม่รวม", note: "เป็นบริษัทเดินรถอื่น ตรวจสอบบริษัทรถบัสก่อนขึ้น" },
];

const legRows = [
  {
    leg: `นั่งครบวงจากชินจูกุในหนึ่งวัน: ไม่ใช้พาส ${LOOP_REGULAR} ใช้พาส ${PASS_2_DAY_SHINJUKU}`,
    adult: `ประหยัด ${LOOP_SAVING}`,
    child: "—",
    source: "Hakone Navi (Odakyu Hakone) ค่าโดยสารบัตร IC ไม่รวม Romancecar",
  },
  {
    leg: "ครบวงโดยไม่ใช้พาส: สายโอดะคิวไปกลับ รถไฟโทซัน เคเบิลคาร์ กระเช้าลอยฟ้า เรือ และรถบัส",
    adult: LOOP_REGULAR,
    child: "—",
    source: "ยอดรวมของ Hakone Navi (ค่าโดยสารบัตร IC)",
  },
  { leg: "Hakone Freepass แบบ 2 วันจากชินจูกุ", adult: PASS_2_DAY_SHINJUKU, child: "¥1,600", source: "odakyu-global.com / hakonenavi.jp" },
  { leg: "ส่วนหนึ่งของยอดรวม: กระเช้าลอยฟ้าฮาโกเน่ โซอุนซัง → โทเง็นได (เที่ยวเดียว)", adult: ROPEWAY, child: "¥700", source: "ประกาศค่าโดยสาร Odakyu Hakone ตั้งแต่ 1 ต.ค. 2025" },
  { leg: "ส่วนหนึ่งของยอดรวม: เรือทะเลสาบอาชิ โทเง็นได → ฮาโกเน่มาจิ / โมโตะฮาโกเน่ (เที่ยวเดียว)", adult: CRUISE, child: "¥850", source: "ประกาศค่าโดยสาร Odakyu Hakone ตั้งแต่ 1 ต.ค. 2025" },
  { leg: "สายโอดะคิว ชินจูกุ ⇄ โอดาวาระ (ค่าโดยสารปกติ ต่อเที่ยว)", adult: "¥910", child: "—", source: "odakyu.jp" },
  { leg: "นั่ง Romancecar ทั้งขาไปและขากลับ", adult: `${PASS_2_DAY_SHINJUKU} + ¥2,400 = ¥9,500`, child: "—", source: "ตัวอย่างการคำนวณของ odakyu.jp" },
];

const worthRows = [
  {
    plan: "เที่ยวฮาโกเน่ 2 วัน ค้างเรียวกังออนเซ็น 1 คืน",
    verdict: "✓ ซื้อแบบ 2 วัน",
    why: `พาสนี้ตั้งราคามาสำหรับแผนแบบนี้ ${PASS_2_DAY_SHINJUKU} จากชินจูกุ รวมสายโอดะคิวไปกลับ และใช้ได้กับทุกช่วงของเส้นทางวงรอบทั้งสองวัน`,
  },
  {
    plan: "ไปกลับจากโตเกียวในวันเดียว นั่งครบทั้งวง",
    verdict: "✓ ยังคุ้ม",
    why: `Hakone Navi คิดค่าโดยสารวงรอบจากชินจูกุตามราคาบัตร IC ปกติไว้ที่ ${LOOP_REGULAR} พาส ${PASS_2_DAY_SHINJUKU} จึงประหยัด ${LOOP_SAVING} แม้ใช้แค่วันแรก โอดะคิวเองก็ระบุว่าคุ้มแม้ไปกลับวันเดียว`,
  },
  {
    plan: "มาถึงโอดาวาระด้วยชินคันเซ็น หรือพักอยู่ในฮาโกเน่แล้ว",
    verdict: "✓ ซื้อแบบออกจากโอดาวาระ",
    why: `${PASS_2_DAY_ODAWARA} แทน ${PASS_2_DAY_SHINJUKU} เพราะไม่รวมสายโอดะคิวไปกลับที่คุณไม่ได้ใช้ ใช้กับยานพาหนะ 8 ประเภทในฮาโกเน่ได้เหมือนกัน`,
  },
  {
    plan: "ไปแค่ฮาโกเน่ยุโมโตะเพื่อแช่ออนเซ็นและกินมื้อกลางวัน",
    verdict: "✗ ไม่ต้องซื้อ",
    why: "ถ้าไม่ขึ้นกระเช้าลอยฟ้าและเรือ ค่าโดยสารรวมจะต่ำกว่าราคาพาส ให้จ่ายค่าโดยสารเป็นรายเที่ยวแทน",
  },
  {
    plan: "อยากเที่ยวครบวงโดยไม่ต้องดูตารางเวลา",
    verdict: "✗ เลือกทัวร์ 1 วันแทน",
    why: "รถบัสพร้อมไกด์พาไปโอวาคุดานิและทะเลสาบอาชิตามเวลาออกเดินทางที่กำหนด และกลับถึงโตเกียวในเย็นวันเดียวกัน เป็นสินค้าคนละแบบกับพาสเดินทาง",
  },
];

const formatRows = [
  { item: "ควรเลือกแบบไหน", digital: "เลือกดิจิทัล ถ้าทุกคนในกลุ่มมีสมาร์ตโฟนและไม่อยากต่อคิวที่สถานี", paper: "เลือกกระดาษ ถ้าเด็กใช้ Kids Phone หรือไม่อยากพึ่งแบตเตอรี่โทรศัพท์" },
  { item: "ซื้อได้ที่ไหน", digital: "EMot Online Tickets ใช้ได้เฉพาะสมาร์ตโฟน", paper: "Odakyu Sightseeing Service Center หรือเครื่องขายตั๋วที่สถานี" },
  { item: "การชำระเงิน", digital: "ออนไลน์", paper: "เครื่องขายตั๋วรับเงินสด PASMO/Suica และ American Express, Diners Club, JCB, Mastercard, Visa" },
  { item: "เดินทางเป็นกลุ่ม", digital: "ตัวเลือก For Group ใส่ได้สูงสุด 4 ใบในโทรศัพท์เครื่องเดียว ต้องเดินทางด้วยกัน และที่ประตูตรวจตั๋วให้สแกนของเพื่อนร่วมทางก่อน แล้วสแกนของตัวเองเป็นใบสุดท้าย", paper: "คนละหนึ่งใบ" },
  { item: "เด็ก", digital: "อายุ 6–11 ปีจ่ายราคาเด็ก อายุต่ำกว่า 6 ปีไม่ต้องมีตั๋ว ใช้กับ Kids Phone ของญี่ปุ่นไม่ได้", paper: "อายุ 6–11 ปีจ่ายราคาเด็ก อายุต่ำกว่า 6 ปีไม่ต้องมีตั๋ว" },
  { item: "การคืนเงิน", digital: "คืนได้เฉพาะเมื่อตั๋วแสดงปุ่ม Refund ช่วงที่หยุดเดินรถเพราะสภาพอากาศคืนเงินผ่านฝ่ายบริการลูกค้าของ EMot", paper: "ถ้ามีการหยุดเดินรถ คืนเงินที่สถานีสุดท้ายที่คุณเดินทางถึง เฉพาะช่วงที่ไม่ได้ใช้" },
];

const faqItems: FaqItem[] = [
  {
    q: "Hakone Free Pass ปี 2026 ราคาเท่าไร?",
    a: `แบบ 2 วันจากชินจูกุ ผู้ใหญ่ ${PASS_2_DAY_SHINJUKU} เด็ก (6–11 ปี) ¥1,600 และแบบ 3 วัน ${PASS_3_DAY_SHINJUKU} / ¥1,850 ส่วนแบบออกจากโอดาวาระที่ใช้ได้เฉพาะในพื้นที่ฮาโกเน่ แบบ 2 วัน ${PASS_2_DAY_ODAWARA} / ¥1,500 และแบบ 3 วัน ${PASS_3_DAY_ODAWARA} / ¥1,750 ราคานี้ใช้ตั้งแต่ 1 ตุลาคม 2025 ตรวจสอบจาก hakonenavi.jp และ odakyu.jp เมื่อ ${CHECKED}`,
  },
  {
    q: "Hakone Free Pass ใช้วันเดียวคุ้มไหม?",
    a: `คุ้ม ถ้านั่งครบทั้งวง พาสนี้ไม่มีแบบ 1 วัน แต่ Hakone Navi ซึ่งเป็นเว็บไซต์ของ Odakyu Hakone เอง คิดค่าโดยสารวงรอบจากชินจูกุ (สายโอดะคิวไปกลับ รถไฟโทซัน เคเบิลคาร์ กระเช้าลอยฟ้า เรือทะเลสาบอาชิ และรถบัส) ตามราคาบัตร IC ปกติไว้ที่ ${LOOP_REGULAR} เทียบกับพาส 2 วัน ${PASS_2_DAY_SHINJUKU} จึงประหยัด ${LOOP_SAVING} ในวันเดียว ส่วนต่างส่วนใหญ่มาจากกระเช้าลอยฟ้า (เที่ยวเดียว ${ROPEWAY}) และเรือ (${CRUISE}) ถ้าไปแค่ฮาโกเน่ยุโมโตะจะไม่คุ้มค่า ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ซื้อ Hakone Free Pass ได้ที่ไหน?",
    a: `ซื้อออนไลน์ได้ที่ EMot Online Tickets ของโอดะคิว (พาส QR ดิจิทัล ใช้ได้เฉพาะสมาร์ตโฟน) ซื้อตั๋วกระดาษได้ที่เครื่องขายตั๋วสถานีสายโอดะคิวและ Odakyu Sightseeing Service Center ที่ 7-Eleven ผ่าน 7-Ticket ที่ร้าน Odakyu Travel และที่ฮาโกเน่ ได้แก่เครื่องขายตั๋วของรถไฟฮาโกเน่โทซันและศูนย์ข้อมูลรถบัสฮาโกเน่โทซัน สถานีโอดะคิวขายล่วงหน้าได้ 1 เดือน ส่วนเครื่องขายตั๋วขายเฉพาะพาสที่เริ่มใช้วันนั้น Klook ก็ขายพาสนี้พร้อมหน้าชำระเงินภาษาไทย ตรวจสอบเมื่อ ${BUY_CHECKED}`,
  },
  {
    q: "Hakone Free Pass รวม Romancecar ไหม?",
    a: `ไม่รวม แบบออกจากชินจูกุรวมสายโอดะคิวไปกลับ 1 รอบ แต่รถไฟด่วนพิเศษ Romancecar ต้องซื้อตั๋วที่นั่งแยก ผู้ใหญ่ ${ROMANCECAR} เด็ก ¥600 ต่อเที่ยวระหว่างชินจูกุกับฮาโกเน่ยุโมโตะ หรือ ¥200 / ¥100 จากโอดาวาระ ใช้เวลาประมาณ 80 นาทีแบบไม่ต้องเปลี่ยนรถ และจองที่นั่งผ่าน EMot Online Tickets ถูกกว่า ¥50 ตัวอย่างของโอดะคิวเอง: พาส ${PASS_2_DAY_SHINJUKU} + Romancecar ไปกลับ ¥2,400 = ¥9,500 ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ใช้ Hakone Free Pass คู่กับ JR Pass ได้ไหม?",
    a: `ใช้คู่กันได้ แต่ใช้แทนกันไม่ได้ โอดะคิวระบุว่า JR Pass และ JR Tokyo Wide Pass ใช้ภายในพื้นที่ฮาโกเน่ไม่ได้ แต่ใช้นั่งรถไฟสาย JR ไปถึงโอดาวาระได้ จากนั้นให้ซื้อ Hakone Free Pass แบบออกจากโอดาวาระ (2 วัน ${PASS_2_DAY_ODAWARA} 3 วัน ${PASS_3_DAY_ODAWARA}) ซึ่งใช้ได้เฉพาะพื้นที่ฮาโกเน่และไม่รวมสายโอดะคิวที่คุณไม่ได้นั่ง ตรวจสอบเมื่อ ${CHECKED}`,
  },
];

const tripPrepItems = [
  withKlookLocale(hakoneFreepassTripPrep[0], LOCALE, {
    label: "ทัวร์รถบัสโอวาคุดานิ ทะเลสาบอาชิ และศาลเจ้าฮาโกเน่",
    ctaLabel: "ดูทัวร์ฮาโกเน่ 1 วัน →",
    why: "พาสนี้ไม่มีแบบ 1 วัน ถ้าออกจากโตเกียวเพียงวันเดียว รถบัสพร้อมไกด์พาไปโอวาคุดานิและทะเลสาบอาชิได้ด้วยการจองครั้งเดียว",
  }),
  withKlookLocale(hakoneFreepassTripPrep[1], LOCALE, {
    label: "โรงแรมทั้งหมดในฮาโกเน่",
    ctaLabel: "ดูโรงแรมในฮาโกเน่ →",
    why: "พาส 2 วันใช้ได้ถึงเที่ยวสุดท้ายของวันที่สอง ค้างหนึ่งคืนในฮาโกเน่จึงได้ใช้วันที่สองที่จ่ายไปแล้ว",
  }),
  withKlookLocale(hakoneFreepassTripPrep[2], LOCALE, {
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM บน Klook →",
    why: "Freepass แบบดิจิทัลคือ QR code ในโทรศัพท์ และสถานะการเดินรถของกระเช้าลอยฟ้าและเรือเช็กได้สะดวกที่สุดในเช้าวันที่จะนั่ง",
  }),
];

const tourPicks = [
  withKlookLocale(hakoneLoopBusTour, LOCALE, {
    title: "ทัวร์รถบัสโอวาคุดานิ ทะเลสาบอาชิ และศาลเจ้าฮาโกเน่",
    desc: "เส้นทางวงรอบฮาโกเน่แบบรถบัสพร้อมไกด์จากโตเกียว รวมกระเช้าลอยฟ้าและเรือโจรสลัด",
  }),
  withKlookLocale(hakoneCruiseCableCarTour, LOCALE, {
    title: "ทัวร์ 1 วัน ล่องเรือ เคเบิลคาร์ และโอวาคุดานิ",
    desc: "ล่องเรือทะเลสาบอาชิ นั่งเคเบิลคาร์ข้ามหุบเขาภูเขาไฟ และแวะออนเซ็น จองเป็นทริป 1 วันจากโตเกียวในครั้งเดียว",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "Hakone Free Pass" }];

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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
                  >
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

function LastChecked({ children, iso = CHECKED_ISO }: { children?: ReactNode; iso?: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      ตรวจสอบล่าสุด: {iso} — <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a>, <a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp (Hakone Freepass)</a>
      {children}
    </p>
  );
}

export default function ThHakoneFreePassPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "Hakone Freepass",
              description: DESC,
              brand: "Odakyu",
              currency: "JPY",
              lowPrice: 6000,
              highPrice: 7500,
              offerCount: 4,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            ราคา Hakone Free Pass จากชินจูกุและโอดาวาระตามราคาทางการของโอดะคิว เส้นทางวงรอบที่ใช้วันเดียวก็คุ้ม พาสดิจิทัลในโทรศัพท์ และที่นั่ง Romancecar ที่พาสไม่รวม
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการของโอดะคิว", "ไม่มีแบบ 1 วัน"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Hakone Freepass</strong> ราคา <strong>{PASS_2_DAY_SHINJUKU} สำหรับ 2 วัน และ {PASS_3_DAY_SHINJUKU} สำหรับ 3 วันจากชินจูกุ</strong> (ผู้ใหญ่) หรือ {PASS_2_DAY_ODAWARA} และ {PASS_3_DAY_ODAWARA} จากโอดาวาระ ตรวจสอบจากหน้าทางการของโอดะคิวเมื่อ {CHECKED} พาสนี้ใช้กับรถไฟฮาโกเน่โทซัน เคเบิลคาร์ กระเช้าลอยฟ้าฮาโกเน่ เรือโจรสลัดทะเลสาบอาชิ และรถบัสในฮาโกเน่ได้ และแบบออกจากชินจูกุรวมสายโอดะคิวไปกลับ 1 รอบ ตามการคำนวณของ Hakone Navi ถ้านั่งครบวงนี้ในวันเดียว <strong>ไม่ใช้พาสจะเสีย {LOOP_REGULAR}</strong> พาสจากชินจูกุจึง<strong>ประหยัด {LOOP_SAVING} ในวันเดียว</strong> ส่วนที่นั่ง Romancecar (เที่ยวละ {ROMANCECAR}) ต้องจ่ายเพิ่มไม่ว่าจะเลือกแบบไหน
          </p>
          <p className={styles.bodyText}>
            หน้านี้พูดถึงตัวพาส ได้แก่ราคา Hakone Free Pass ยานพาหนะที่ใช้ได้ และที่ซื้อ ส่วนการเที่ยวทีละจุดในหนึ่งวันอยู่ใน <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>คู่มือเที่ยวฮาโกเน่ 1 วันจากโตเกียว (ภาษาอังกฤษ)</Link> และการใช้พาสให้ครบทั้งสองวันโดยค้างหนึ่งคืนอยู่ใน <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>แผนเที่ยวฮาโกเน่ 2 วัน (ภาษาอังกฤษ)</Link>
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2 วัน จากชินจูกุ</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2 วัน จากโอดาวาระ</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ใช้ได้กับ</p>
                <p className={styles.verdictStatValue}>ยานพาหนะ 8 ประเภท</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Romancecar</p>
                <p className={styles.verdictStatValue}>+{ROMANCECAR} ไม่รวมในพาส</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              โอดะคิวสะกดชื่อพาสว่า <strong>Freepass</strong> แต่คนส่วนใหญ่ค้นหาว่า Hakone Free Pass ทั้งสองชื่อคือตั๋วใบเดียวกัน พาสนี้ไม่มีแบบ 1 วัน ซื้อออนไลน์ (EMot หรือ Klook) แล้วไม่ต้องต่อคิวที่สถานี และถ้าคุณมาถึงด้วยชินคันเซ็น ให้ซื้อแบบออกจากโอดาวาระ
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                ดู Hakone Free Pass บน Klook →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                ดูทัวร์ฮาโกเน่ 1 วันแทน →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>Hakone Free Pass ปี 2026 ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้ใหญ่ {PASS_2_DAY_SHINJUKU} สำหรับ 2 วันจากชินจูกุ ซึ่งเป็นแบบที่นักท่องเที่ยวส่วนใหญ่ที่ออกจากโตเกียวต้องใช้ ราคาขึ้นอยู่กับสถานีที่พาสเริ่มต้น และวันที่สามเพิ่มเพียง ¥400
          </p>
          <Table
            head={["สถานีต้นทาง", "2 วัน ผู้ใหญ่", "2 วัน เด็ก", "3 วัน ผู้ใหญ่", "3 วัน เด็ก"]}
            rows={priceRows.map((r) => [r.pass, r.d2a, r.d2c, r.d3a, r.d3c])}
          />
          <LastChecked>
            {" "}ราคาเด็กสำหรับอายุ 6–11 ปี อายุต่ำกว่า 6 ปีนั่งฟรี ราคานี้ใช้ตั้งแต่ 1 ตุลาคม 2025 ที่นั่ง Romancecar ต้องจ่ายเพิ่ม: {ROMANCECAR} / ¥600 จากชินจูกุ และ ¥200 / ¥100 จากโอดาวาระ ไปฮาโกเน่ยุโมโตะ
          </LastChecked>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            ซื้อแบบชินจูกุหรือโอดาวาระดี? ส่วนต่าง ¥1,100 คือค่าสายโอดะคิวไปกลับระหว่างชินจูกุกับโอดาวาระเท่านั้น ทั้งสองแบบใช้กับยานพาหนะ 8 ประเภทในฮาโกเน่ได้เหมือนกัน พาสอื่น ๆ ทั้งหมดในเว็บไซต์นี้รวมไว้ใน <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>ตารางราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น (ภาษาอังกฤษ)</Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              เช็ก Hakone Freepass บน Klook →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              มีแค่วันเดียว? เทียบกับทัวร์ฮาโกเน่ 1 วันพร้อมไกด์ →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="จองในทริปเดียวกัน"
          heading="ซื้อ Hakone Freepass แล้วควรจองอะไรเพิ่ม?"
          headingLevel={3}
          intro="พาสใช้กับการเดินทางเท่านั้น ไม่รวมกิจกรรมของวันหรือที่พัก ถ้ามีเพียงวันเดียวและไม่อยากดูตารางเวลา ทัวร์ฮาโกเน่ 1 วันพร้อมไกด์พาไปเส้นทางวงรอบเดียวกันด้วยการจองครั้งเดียว ถ้ามีสองวัน การพักในฮาโกเน่ทำให้ได้ใช้วันที่สองที่จ่ายไปแล้ว อินเทอร์เน็ตมือถือสำหรับตั๋วดิจิทัลก็จองได้ในบัญชี Klook เดียวกัน"
          items={tripPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ที่ซื้อ</span>
          <h2 className={styles.sectionTitle}>ซื้อ Hakone Freepass ได้ที่ไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ซื้อออนไลน์ได้ที่ EMot Online Tickets ของโอดะคิวหรือ Klook หรือซื้อตั๋วกระดาษที่สถานีสายโอดะคิว 7-Eleven หรือในฮาโกเน่ สิ่งที่ต่างกันคือรูปแบบตั๋วที่ได้รับ และซื้อล่วงหน้าได้นานแค่ไหน
          </p>
          <Table
            head={["ที่ซื้อ", "ตั๋วที่ได้", "ซื้อได้เมื่อไร", "ควรรู้"]}
            rows={buyRows.map((r) => [r.where, r.ticket, r.when, r.note])}
          />
          <LastChecked iso={BUY_CHECKED_ISO}>{" "}แถว Klook ไม่มีแหล่งข้อมูลทางการ เงื่อนไขล่าสุดดูได้ในหน้าสินค้า</LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>รวมและไม่รวม</span>
          <h2 className={styles.sectionTitle}>Hakone Freepass ใช้กับอะไรได้บ้าง?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            นั่งยานพาหนะ 8 ประเภทในฮาโกเน่ได้ไม่จำกัดเที่ยว และแบบออกจากชินจูกุรวมสายโอดะคิวไปกลับ 1 รอบ ที่นั่ง Romancecar และ Izu-Hakone Bus ไม่รวมในพาส
          </p>
          <Table head={["ยานพาหนะ", "ใช้พาสได้ไหม", "หมายความว่า"]} rows={coverageRows.map((r) => [r.mode, r.included, r.note])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            {" "}พาสนี้ยังได้ส่วนลดที่สถานที่ประมาณ 70 แห่งในฮาโกเน่ แต่รายชื่อเปลี่ยนเรื่อย ๆ จึงไม่ได้ระบุราคาไว้ที่นี่
          </LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>คุ้มไหม</span>
          <h2 className={styles.sectionTitle}>Hakone Freepass ใช้วันเดียวคุ้มไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            คุ้ม ถ้านั่งครบทั้งวง Hakone Navi ซึ่งเป็นเว็บไซต์ของ Odakyu Hakone เอง คิดค่าโดยสารเส้นทางยอดนิยมจากชินจูกุตามราคาบัตร IC ปกติไว้ที่ {LOOP_REGULAR} เทียบกับพาส {PASS_2_DAY_SHINJUKU} จึงประหยัด {LOOP_SAVING} แม้กลับโตเกียวในเย็นวันเดียวกัน
          </p>
          <Table head={["เส้นทาง (ผู้ใหญ่ ไม่รวม Romancecar)", "ผู้ใหญ่", "เด็ก", "แหล่งข้อมูล"]} rows={legRows.map((r) => [r.leg, r.adult, r.child, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — <a href={LOOP_URL} target="_blank" rel="noopener noreferrer">Hakone Navi (ยอดรวมทั้งวง)</a>, <a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">ประกาศค่าโดยสาร Odakyu Hakone (PDF)</a>, <a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp</a> Hakone Navi ไม่ได้แยกยอด {LOOP_REGULAR} เป็นรายช่วง หน้านี้จึงไม่ได้ระบุค่าโดยสารรถไฟโทซัน เคเบิลคาร์ และรถบัสทีละช่วง ห้องโดยสารพิเศษบนเรือเพิ่มอีก ¥800 / ¥400 ต่อเที่ยว
          </p>
          <Table head={["แผนของคุณ", "คำแนะนำ", "เหตุผล"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            ทั้งกระเช้าลอยฟ้าและเรือหยุดให้บริการเมื่อสภาพอากาศไม่ดี และกระเช้าลอยฟ้าที่โอวาคุดานิหยุดให้บริการกะทันหันได้ ถ้ามีช่วงที่หยุดเดินรถและคุณไม่ได้นั่ง พาสกระดาษคืนเงินได้ที่สถานีสุดท้ายที่คุณเดินทางถึง เส้นทางรายวันว่าแต่ละจุดมีอะไรน่าดูและควรออกจากโตเกียวกี่โมง อยู่ใน <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>คู่มือเที่ยวฮาโกเน่ 1 วันจากโตเกียว (ภาษาอังกฤษ)</Link> ส่วนหน้านี้พูดถึงตัวพาส
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              เช็ก Hakone Free Pass →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              เทียบทัวร์ฮาโกเน่ 1 วัน →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทางไป</span>
          <h2 className={styles.sectionTitle}>Hakone Freepass รวม Romancecar ไหม?</h2>
          <p className={styles.bodyText}>
            ไม่รวม แบบออกจากชินจูกุรวมสายโอดะคิวไปกลับ 1 รอบ แต่รถไฟด่วนพิเศษ Romancecar ต้องซื้อตั๋วที่นั่งแยก <strong>ผู้ใหญ่ {ROMANCECAR} เด็ก ¥600 ต่อเที่ยว</strong> จากชินจูกุไปฮาโกเน่ยุโมโตะ ใช้เวลา<strong>ประมาณ 80 นาทีแบบไม่ต้องเปลี่ยนรถ</strong> ทุกที่นั่งเป็นที่นั่งจอง และจองที่นั่งผ่าน EMot Online Tickets ถูกกว่าซื้อที่สถานี ¥50 ตัวอย่างการคำนวณของโอดะคิวเองสำหรับการไปกลับจากชินจูกุ คือพาส {PASS_2_DAY_SHINJUKU} บวก Romancecar ไปกลับ ¥2,400 รวม ¥9,500 รถไฟโอดะคิวธรรมดาที่พาสใช้ได้ใช้เวลานานกว่า และมักต้องเปลี่ยนรถที่โอดาวาระ
          </p>
          <p className={styles.bodyText}>
            ฮาโกเน่มักเที่ยวคู่กับทะเลสาบทั้งห้าของฟูจิ ซึ่งเป็นพาสและพื้นที่แยกกัน อ่านได้ใน <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>คู่มือเที่ยวภูเขาไฟฟูจิ 1 วัน (ภาษาอังกฤษ)</Link> ถ้าฮาโกเน่เป็นหนึ่งคืนในทริปที่ยาวกว่านั้น <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>แผนเที่ยวโตเกียว 7 วัน (ภาษาอังกฤษ)</Link>, <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>แผนเที่ยวโตเกียว 5 วัน (ภาษาอังกฤษ)</Link> และ <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>แผนเที่ยวญี่ปุ่น 14 วัน (ภาษาอังกฤษ)</Link> แสดงว่าวันฮาโกเน่อยู่ตรงไหน ส่วน <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>เรียวกังฮาโกเน่ที่มีออนเซ็นส่วนตัว (ภาษาอังกฤษ)</Link> รวบรวมเรียวกัง 10 แห่งตามย่าน ตั้งแต่ฮาโกเน่ยุโมโตะถึงทะเลสาบอาชิ พร้อมรถบัสหรือรถไฟที่ใช้ไปแต่ละแห่ง
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ผู้ถือ JR Pass</span>
          <h2 className={styles.sectionTitle}>ใช้ Hakone Freepass คู่กับ JR Pass ได้ไหม?</h2>
          <p className={styles.bodyText}>
            ได้ แต่ทั้งสองใช้คนละส่วน โอดะคิวระบุว่า JR Pass และ JR Tokyo Wide Pass ใช้ภายในพื้นที่ฮาโกเน่ไม่ได้ ใช้ได้เพียงนั่งสาย JR ไปถึงโอดาวาระ จากโอดาวาระ <strong>Hakone Freepass แบบออกจากโอดาวาระ ({PASS_2_DAY_ODAWARA} สำหรับ 2 วัน {PASS_3_DAY_ODAWARA} สำหรับ 3 วัน)</strong> ใช้ได้ทั้งวง และไม่รวมสายโอดะคิวที่คุณไม่ได้นั่ง ถ้าขากลับนั่ง Romancecar ไปชินจูกุ ต้องจ่ายค่าตั๋วที่นั่งและค่าโดยสารพื้นฐานโอดาวาระ–ชินจูกุเพิ่ม JR Pass คุ้มสำหรับทริปโตเกียวหรือไม่ อ่านได้ใน <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>คู่มือ JR Pass (ภาษาอังกฤษ)</Link> และ <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>คู่มือ JR Tokyo Wide Pass (ภาษาอังกฤษ)</Link>
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — <a href={JR_URL} target="_blank" rel="noopener noreferrer">คำถามที่พบบ่อยเรื่อง Hakone Freepass ของโอดะคิว</a>, <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ตัวตั๋ว</span>
          <h2 className={styles.sectionTitle}>ดิจิทัลหรือกระดาษ: ควรซื้อ Hakone Freepass แบบไหน?</h2>
          <Table head={["", "ดิจิทัล (EMot)", "กระดาษ"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            {" "}เลือกดิจิทัลถ้ากลุ่มของคุณเดินทางด้วยกันและใช้โทรศัพท์เครื่องเดียว เลือกกระดาษถ้าเด็กใช้ Kids Phone หรือไม่อยากพึ่งแบตเตอรี่ อายุการใช้งานนับตามวันในปฏิทิน: พาส 2 วันหมดอายุหลังเที่ยวสุดท้ายของวันถัดจากวันที่ซื้อ ไม่ใช่ 48 ชั่วโมงหลังซื้อ
          </LastChecked>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเรื่อง Hakone Freepass" />

        <KlookTourPicks
          heading="ถ้ามีเวลาแค่วันเดียว"
          intro="ถ้าจะเที่ยววงรอบเอง พาสคือตัวเลือกที่เหมาะ ถ้าต้องการออกจากโตเกียววันเดียวโดยไม่ต้องดูตารางเวลา ด้านล่างคือเส้นทางวงรอบเดียวกันแบบมีไกด์ รถบัสคันเดียว ออกเดินทางตามเวลาที่กำหนด และกลับถึงเมืองในเย็นวันเดียวกัน เปิดหน้าสินค้าเพื่อดูราคาของวันที่คุณไป"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "เรียวกังฮาโกเน่ที่มีออนเซ็นส่วนตัว: 10 แห่งตามย่าน (2026) (ภาษาอังกฤษ)" },
            { href: "/guides/transport/jr-pass-guide", title: "ราคา JR Pass 2026: ราคาใหม่และคุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "เที่ยวฮาโกเน่ 1 วันจากโตเกียว (2026): ราคา Freepass เทียบกับทัวร์ (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "เที่ยวภูเขาไฟฟูจิ 1 วันจากโตเกียว (2026): วิธีไปเอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว (2026): เลือกทัวร์ไหน และได้เห็นอะไรจริง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "เที่ยวคาวากุจิโกะ 1 วันจากโตเกียว (2026): เส้นทาง ค่าโดยสาร และเที่ยวอะไรได้บ้าง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "แผนเที่ยวโตเกียว 5 วัน (2026): แผนรายวัน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "แผนเที่ยวญี่ปุ่น 14 วัน (2026): 2 สัปดาห์แบบรายวัน (ภาษาอังกฤษ)" },
            { href: "/guides/transport/shinkansen-guide", title: "คู่มือชินคันเซ็น 2026: ตั๋ว พาส และเคล็ดลับสำหรับครั้งแรก (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "ราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น 2026: ราคาทางการและกฎการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำในญี่ปุ่นเพิ่มเติม (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>นั่งครบวงฮาโกเน่ด้วยตั๋วใบเดียว</h2>
            <p className={styles.ctaBannerDesc}>
              ยานพาหนะ 8 ประเภท ใช้ได้ 2 หรือ 3 วัน และหน้าชำระเงินของ Klook รับบัตรที่ออกในต่างประเทศ ถ้ามีเวลาแค่วันเดียวและไม่อยากดูตารางเวลา ทัวร์รถบัสพร้อมไกด์ในเส้นทางวงรอบเดียวกันเหมาะกว่า
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดู Hakone Free Pass →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูทัวร์ฮาโกเน่ 1 วัน →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
