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
import HotelStayBlock from "../../../../components/HotelStayBlock";

// Mirrors the English page (/guides/attractions/hakone-free-pass) section by section as of
// 2026-11-24 (task-jtk-20261124-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: "Hakone Free Pass" — Thai results and Thai travel pages write the pass in Latin
// script, with "ราคา" / "คุ้มไหม" around it. Paragraphs stay on one line: a JSX line break
// renders as a space, and in Thai a space is a sentence break.

// R17 (2026-11-27, task-jtk-20261127-R17): the ride-by-ride break-even table, the route table
// and the 1-day-or-2-day table mirror the English page with the same figures and sources.
const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/hakone-free-pass";
const TITLE = "Hakone Free Pass 2026: ราคา คุ้มไหม";
const H1 = "Hakone Free Pass 2026: ราคาจากชินจูกุ เส้นทาง และคุ้มไหม";
const DESC =
  "Hakone Free Pass: ชินจูกุ 2 วัน ¥7,100 โอดาวาระ ¥6,000 ตั๋วเดี่ยวรวม ¥8,322 ถูกกว่า ¥1,222";

const CHECKED_ISO = "2026-11-27";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const BUY_CHECKED_ISO = "2026-11-27";
const BUY_CHECKED = dateLabel(BUY_CHECKED_ISO, LOCALE);
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const JR_URL = "https://odakyu-global.com/blog/2053/";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const NAVI_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ODAKYU_URL = "https://www.odakyu.jp/english/passes/hakone/";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";
const BREAKDOWN_URL = "https://www.hakonenavi.jp/feature/22866";
const LP_URL = "https://www.hakonenavi.jp/lp/hakone-freepass/";
const ROPEWAY_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-ropeway";
const CRUISE_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-kankosen";
const ITINERARY_URL = "https://hakonetrip.odakyu-global.com/feature/hakone-2-day-itinerary/";

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
  { pass: "นักท่องเที่ยวส่วนใหญ่ที่เดินทางจากโตเกียว: พาส 2 วันจากชินจูกุ", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "จากชินจูกุ (รวมค่าโดยสารรถไฟสายโอดะคิวไปกลับ)", d2a: PASS_2_DAY_SHINJUKU, d2c: "¥1,600", d3a: PASS_3_DAY_SHINJUKU, d3c: "¥1,850" },
  { pass: "จากโอดาวาระ (เฉพาะพื้นที่ฮาโกเน่)", d2a: PASS_2_DAY_ODAWARA, d2c: "¥1,500", d3a: PASS_3_DAY_ODAWARA, d3c: "¥1,750" },
  { pass: "จากมาจิดะ", d2a: "¥6,820", d2c: "¥1,600", d3a: "¥7,220", d3c: "¥1,850" },
  { pass: "จากฟุจิซาวะ", d2a: "¥7,050", d2c: "¥1,600", d3a: "¥7,450", d3c: "¥1,850" },
];

const buyRows = [
  {
    where: "สรุปสั้น ๆ",
    ticket: "ถ้าทุกคนในกลุ่มมีสมาร์ตโฟน ให้ซื้อออนไลน์ก่อนเดินทาง",
    when: "ถ้ามีเด็กที่ไม่มีโทรศัพท์ของตัวเอง ให้ซื้อตั๋วกระดาษที่สถานีโอดะคิว",
    note: "พาสดิจิทัลเก็บไว้ในสมาร์ตโฟน (ถ้าเดินทางด้วยกัน ตัวเลือก For Group เก็บพาสได้สูงสุด 4 ใบบนสมาร์ตโฟนเครื่องเดียว) ส่วนพาสกระดาษใช้ได้กับทุกคน",
  },
  {
    where: "EMot Online Tickets (เว็บไซต์ทางการของโอดะคิว)",
    ticket: "พาสดิจิทัลแบบ QR Code ใช้ได้เฉพาะบนสมาร์ตโฟน",
    when: "ออนไลน์ ก่อนเดินทาง",
    note: "ตัวเลือก For Group เก็บพาสได้สูงสุด 4 ใบบนสมาร์ตโฟนเครื่องเดียว สำหรับคนที่เดินทางด้วยกัน การจองที่นั่ง Romancecar ผ่านช่องทางนี้ถูกกว่าซื้อที่สถานี ¥50 ขอคืนเงินได้เฉพาะเมื่อมีปุ่ม Refund แสดงบนตั๋ว",
  },
  {
    where: "สถานีสายโอดะคิว (เครื่องขายตั๋ว) และ Odakyu Sightseeing Service Center",
    ticket: "ตั๋วกระดาษ",
    when: "สถานีสายโอดะคิวขายล่วงหน้าได้ 1 เดือน ส่วนเครื่องจำหน่ายตั๋วขายเฉพาะพาสที่เริ่มใช้ในวันที่ซื้อ",
    note: "เครื่องขายตั๋วรับเงินสด PASMO/Suica และ American Express, Diners Club, JCB, Mastercard, Visa",
  },
  {
    where: "7-Eleven (7-Ticket)",
    ticket: "ตั๋วกระดาษที่พิมพ์จากเครื่องมัลติฟังก์ชันในร้าน",
    when: "ก่อนเดินทาง",
    note: "ไม่มีค่าธรรมเนียมออกตั๋ว พาสที่รวมค่าโดยสารรถไฟสายโอดะคิวไปกลับมีขายเฉพาะแบบเริ่มต้นจากชินจูกุ",
  },
  {
    where: "ที่ฮาโกเน่: เครื่องขายตั๋วของรถไฟฮาโกเน่โทซัน และศูนย์บริการข้อมูลรถบัสฮาโกเน่โทซัน",
    ticket: "ตั๋วกระดาษ",
    when: "ในวันเดินทาง",
    note: "เครื่องขายตั๋วอยู่ที่ฮาโกเน่ยุโมโตะ โกระ โซอุนซัง และสถานีอื่นของรถไฟโทซัน ส่วนศูนย์บริการข้อมูลรถบัสอยู่ที่สถานีโอดาวาระ ฮาโกเน่ยุโมโตะ โมโตะฮาโกเน่ ฮาโกเน่มาจิ เซ็นโกคุ โทเง็นได และมิยางิโนะ",
  },
  {
    where: "Klook",
    ticket: "พาสของโอดะคิวแบบเดียวกันที่ซื้อผ่าน Klook",
    when: "ออนไลน์ ก่อนเดินทาง",
    note: "ชำระเงินผ่านหน้าภาษาไทยด้วยบัตรที่ออกในต่างประเทศได้ วิธีใช้ใบยืนยันการจองและเงื่อนไขการยกเลิกดูได้ในหน้าสินค้า",
  },
];

const coverageRows = [
  {
    mode: "รถไฟสายโอดะคิว (ชินจูกุ ⇄ โอดาวาระ)",
    included: "✓ ไปกลับ 1 ครั้ง",
    note: "เฉพาะพาสแบบเริ่มต้นจากชินจูกุ และแวะลงระหว่างทางได้ พาสแบบเริ่มต้นจากโอดาวาระไม่รวมช่วงนี้",
  },
  { mode: "รถไฟฮาโกเน่โทซัน (โอดาวาระ / ฮาโกเน่ยุโมโตะ ⇄ โกระ)", included: "✓ ไม่จำกัดเที่ยว", note: "รถไฟไต่เขาที่สลับทิศทางการเดินรถ (สวิตช์แบ็ก) เพื่อขึ้นทางลาดชัน เป็นช่วงแรกของเส้นทางวงรอบจากฮาโกเน่ยุโมโตะ" },
  { mode: "รถรางไต่เขาฮาโกเน่โทซัน (Hakone Tozan Cable Car) (โกระ ⇄ โซอุนซัง)", included: "✓ ไม่จำกัดเที่ยว", note: "รถรางไต่เขาที่ขึ้นไปยังสถานีต้นทางของกระเช้าลอยฟ้า" },
  { mode: "กระเช้าลอยฟ้าฮาโกเน่ (โซอุนซัง ⇄ โอวาคุดานิ ⇄ โทเง็นได)", included: "✓ ไม่จำกัดเที่ยว", note: `ช่วงที่ผ่านโอวาคุดานิและมีค่าโดยสารสูงที่สุดในเส้นทางวงรอบ เที่ยวเดียว ${ROPEWAY}` },
  { mode: "เรือท่องเที่ยวฮาโกเน่ (เรือโจรสลัดในทะเลสาบอาชิ)", included: "✓ ไม่จำกัดเที่ยว", note: `จากโทเง็นไดไปฮาโกเน่มาจิหรือโมโตะฮาโกเน่ ถ้าไม่มีพาสเที่ยวเดียว ${CRUISE} ต้องจ่ายเพิ่มสำหรับห้องโดยสารพิเศษ` },
  { mode: "รถบัสฮาโกเน่โทซัน (เส้นทางที่กำหนด)", included: "✓ ไม่จำกัดเที่ยว", note: "ใช้เดินทางช่วงสุดท้ายของเส้นทางวงรอบกลับไปฮาโกเน่ยุโมโตะหรือโอดาวาระ" },
  { mode: "รถบัสวนชมสถานที่ท่องเที่ยว \"KANKO SHISETSU-MEGURI\"", included: "✓ ไม่จำกัดเที่ยว", note: "รถบัสฮาโกเน่โทซันและรถบัสทางด่วนโอดะคิว (Odakyu Highway Bus) เดินรถระหว่างสถานที่ท่องเที่ยว" },
  { mode: "รถบัสทางด่วนโอดะคิว (Odakyu Highway Bus) (เส้นทางที่กำหนด)", included: "✓ ไม่จำกัดเที่ยว", note: "ผู้โดยสารที่จองที่นั่งไว้ได้ขึ้นรถก่อน จึงอาจไม่มีที่นั่งว่าง" },
  { mode: "รถบัสโทไค (Tokai Bus) (เส้นทางที่กำหนด)", included: "✓ ไม่จำกัดเที่ยว", note: "ใช้พาสได้เฉพาะช่วงเส้นทางที่กำหนดเท่านั้น" },
  { mode: "รถไฟด่วนพิเศษ Romancecar", included: "✗ ไม่รวม", note: `ต้องซื้อตั๋วที่นั่งรถไฟด่วนพิเศษแยกต่างหาก ผู้ใหญ่ ${ROMANCECAR} เด็ก ¥600 จากชินจูกุไปฮาโกเน่ยุโมโตะ` },
  { mode: "Izu-Hakone Bus", included: "✗ ไม่รวม", note: "เป็นรถบัสของผู้ให้บริการรายอื่น โปรดตรวจสอบชื่อผู้ให้บริการก่อนขึ้นรถ" },
];

const fareRows: ReactNode[][] = [
  ["สรุป", "พาสคุ้มทุนในช่วงที่ 7 ของวงรอบ คือรถไฟขากลับชินจูกุ", LOOP_REGULAR, `มากกว่าพาส ${PASS_2_DAY_SHINJUKU} อยู่ ${LOOP_SAVING}`],
  ["1. รถไฟสายโอดะคิว + สายโทซัน", "ชินจูกุ → ฮาโกเน่ยุโมโตะ", "¥1,261", "¥1,261"],
  ["2. รถไฟฮาโกเน่โทซัน", "ฮาโกเน่ยุโมโตะ → โชโกกุโนะโมริ (ก่อนถึงโกระ 1 สถานี)", "¥460", "¥1,721"],
  ["3. รถรางไต่เขาฮาโกเน่โทซัน", "โกระ → โซอุนซัง", "¥430", "¥2,151"],
  ["4. กระเช้าลอยฟ้าฮาโกเน่", "โซอุนซัง → โอวาคุดานิ → โทเง็นได", ROPEWAY, "¥4,151"],
  ["5. เรือท่องเที่ยวฮาโกเน่ (เรือโจรสลัด)", "โทเง็นได → โมโตะฮาโกเน่", CRUISE, "¥5,851"],
  ["6. รถบัสฮาโกเน่โทซัน", "โมโตะฮาโกเน่ → ฮาโกเน่ยุโมโตะ", "¥1,210", "¥7,061 — ยังน้อยกว่าพาส ¥39"],
  ["7. รถไฟสายโอดะคิว + สายโทซัน", "ฮาโกเน่ยุโมโตะ → ชินจูกุ", "¥1,261", `${LOOP_REGULAR} — พาสคุ้มทุนแล้ว`],
  ["พาส 2 วันจากชินจูกุ", "วงรอบเดียวกันด้วยพาส", PASS_2_DAY_SHINJUKU, `ประหยัด ${LOOP_SAVING} ในวันเดียว`],
  ["พาส 3 วันจากชินจูกุ", "วงรอบเดียวกันด้วยพาส", PASS_3_DAY_SHINJUKU, "ประหยัด ¥822 ในวันเดียว"],
  ["แผน 2 วันของ Hakone Navi", "วงรอบ + รถบัสอีก 4 เที่ยวไปพิพิธภัณฑ์และสวนพฤกษชาติพื้นที่ชุ่มน้ำ", "¥10,622", `ประหยัด ¥3,522 ด้วยพาส ${PASS_2_DAY_SHINJUKU}`],
  ["พาสจากโอดาวาระ คิดเฉพาะช่วงที่ 2–6", "จากฮาโกเน่ยุโมโตะวนรอบแล้วกลับมา", "¥5,800", `น้อยกว่าพาส ${PASS_2_DAY_ODAWARA} อยู่ ¥200 — คุ้มเมื่อรวมรถไฟโอดาวาระ ⇄ ฮาโกเน่ยุโมโตะ หรือใช้วันที่สอง`],
];

const routeRows: ReactNode[][] = [
  ["ทั้งวงรอบ", "ฮาโกเน่ยุโมโตะ → โกระ → โซอุนซัง → โอวาคุดานิ → โทเง็นได → โมโตะฮาโกเน่ → ฮาโกเน่ยุโมโตะ", "เวลานั่งรวมประมาณ 2.5–3 ชั่วโมง ไม่รวมเวลาเปลี่ยนรถและแวะเที่ยว", "✓ ทุกช่วง"],
  ["1. Romancecar หรือรถไฟสายโอดะคิว", "ชินจูกุ → ฮาโกเน่ยุโมโตะ", "Romancecar ประมาณ 80 นาทีแบบไม่ต้องเปลี่ยนขบวน รถไฟธรรมดามักต้องเปลี่ยนที่โอดาวาระ", `✓ รถไฟสายโอดะคิว (พาสจากชินจูกุ ไปกลับ 1 ครั้ง) · ✗ ค่าที่นั่ง Romancecar +${ROMANCECAR}`],
  ["2. รถไฟฮาโกเน่โทซัน", "ฮาโกเน่ยุโมโตะ → โกระ (สวิตช์แบ็ก)", "ประมาณ 40 นาทีถึงโชโกกุโนะโมริ สถานีถัดไปคือโกระ", "✓"],
  ["3. รถรางไต่เขาฮาโกเน่โทซัน", "โกระ → โซอุนซัง", "ประมาณ 10 นาที", "✓"],
  ["4. กระเช้าลอยฟ้าฮาโกเน่", "โซอุนซัง → โอวาคุดานิ → อุบาโกะ → โทเง็นได", "ประมาณ 15 นาทีต่อช่วง เปลี่ยนกระเช้าที่โอวาคุดานิ", "✓"],
  ["5. เรือท่องเที่ยวฮาโกเน่ (เรือโจรสลัด)", "โทเง็นได → ฮาโกเน่มาจิ หรือโมโตะฮาโกเน่", "ประมาณ 25–35 นาที", "✓ (ห้องโดยสารพิเศษ +¥800)"],
  ["6. รถบัสฮาโกเน่โทซัน", "โมโตะฮาโกเน่ → ฮาโกเน่ยุโมโตะ", "ประมาณ 40 นาที (สาย H) หรือ 35 นาที (สาย K)", "✓ · ✗ Izu-Hakone Bus"],
  ["7. รถไฟสายโอดะคิว หรือ Romancecar", "ฮาโกเน่ยุโมโตะ → ชินจูกุ", "เหมือนช่วงที่ 1", "✓ รถไฟสายโอดะคิว · ✗ ค่าที่นั่ง Romancecar"],
];

const passChoiceRows: ReactNode[][] = [
  ["สรุป: Hakone Freepass ไม่มีแบบ 1 วัน", "ถ้าเดินทางครบวงรอบ ซื้อแบบ 2 วันแม้ไปวันเดียว", `${PASS_2_DAY_SHINJUKU} จากชินจูกุ ถูกกว่าตั๋วเดี่ยว ${LOOP_SAVING}`],
  ["Hakone Freepass (2 หรือ 3 วัน)", "เที่ยวครบวงรอบ ค้างคืนในฮาโกเน่ หรือทั้งสองอย่าง", `จากชินจูกุ ${PASS_2_DAY_SHINJUKU} / ${PASS_3_DAY_SHINJUKU} จากโอดาวาระ ${PASS_2_DAY_ODAWARA} / ${PASS_3_DAY_ODAWARA}`],
  ["Owakudani 2-Day Pass", "เฉพาะโอวาคุดานิและกระเช้าลอยฟ้า: รถไฟโทซัน รถรางไต่เขา กระเช้าลอยฟ้าตลอดสาย เข้าสวนโกระฟรี — ไม่รวมเรือและรถบัส", "จากโอดาวาระ ผู้ใหญ่ ¥5,000 เด็ก ¥1,300"],
  ["Sightseeing Cruise & Ropeway Pass (1 วัน)", "มาด้วยรถยนต์: เฉพาะกระเช้าลอยฟ้าและเรือทะเลสาบอาชิ", "ผู้ใหญ่ ¥5,000 เด็ก ¥1,400"],
  ["ตั๋วเดี่ยว", "ไปเฉพาะฮาโกเน่ยุโมโตะเพื่อแช่ออนเซ็นและรับประทานอาหารกลางวัน", "จ่ายเป็นเที่ยว ๆ"],
];

const worthRows = [
  {
    plan: "เที่ยวฮาโกเน่ 2 วัน ค้างเรียวกังออนเซ็น 1 คืน",
    verdict: "✓ ซื้อแบบ 2 วัน",
    why: `พาสนี้มีราคาที่เหมาะกับแผนการเดินทางลักษณะนี้ ${PASS_2_DAY_SHINJUKU} จากชินจูกุ รวมค่าโดยสารรถไฟสายโอดะคิวไปกลับ และใช้ได้กับทุกช่วงของเส้นทางวงรอบทั้งสองวัน`,
  },
  {
    plan: "ไปกลับจากโตเกียวในวันเดียว เดินทางครบเส้นทางวงรอบ",
    verdict: "✓ ยังคุ้ม",
    why: `Hakone Navi คิดค่าโดยสารวงรอบจากชินจูกุตามค่าโดยสารปกติเมื่อใช้บัตร IC ไว้ที่ ${LOOP_REGULAR} พาส ${PASS_2_DAY_SHINJUKU} จึงประหยัด ${LOOP_SAVING} แม้ใช้แค่วันแรก โอดะคิวเองก็ระบุว่าคุ้มแม้ไปกลับวันเดียว`,
  },
  {
    plan: "มาถึงโอดาวาระด้วยชินคันเซ็น หรือพักอยู่ในฮาโกเน่แล้ว",
    verdict: "✓ ซื้อพาสแบบเริ่มต้นจากโอดาวาระ",
    why: `${PASS_2_DAY_ODAWARA} แทน ${PASS_2_DAY_SHINJUKU} เพราะไม่รวมค่าโดยสารรถไฟสายโอดะคิวไปกลับที่คุณไม่ได้ใช้ ใช้กับระบบขนส่ง 8 ประเภทในฮาโกเน่ได้เหมือนกัน`,
  },
  {
    plan: "ไปเฉพาะฮาโกเน่ยุโมโตะเพื่อแช่ออนเซ็นและรับประทานอาหารกลางวัน",
    verdict: "✗ ไม่ต้องซื้อ",
    why: "ถ้าไม่ขึ้นกระเช้าลอยฟ้าและเรือ ค่าโดยสารรวมจะต่ำกว่าราคาพาส ควรจ่ายค่าโดยสารแยกเป็นเที่ยว ๆ แทน",
  },
  {
    plan: "อยากเที่ยวครบเส้นทางวงรอบโดยไม่ต้องดูตารางเดินรถ",
    verdict: "✗ เลือกทัวร์ 1 วันแทน",
    why: "รถบัสพร้อมไกด์พาไปโอวาคุดานิและทะเลสาบอาชิตามเวลาออกเดินทางที่กำหนด และกลับถึงโตเกียวในเย็นวันเดียวกัน เป็นบริการคนละประเภทกับพาสสำหรับการเดินทาง",
  },
];

const formatRows = [
  { item: "ควรเลือกแบบไหน", digital: "เลือกดิจิทัล ถ้าทุกคนในกลุ่มมีสมาร์ตโฟนและไม่อยากต่อคิวที่สถานี", paper: "เลือกพาสแบบกระดาษหากเด็กใช้โทรศัพท์สำหรับเด็ก (Kids Phone) หรือไม่อยากกังวลเรื่องแบตเตอรี่โทรศัพท์" },
  { item: "ซื้อได้ที่ไหน", digital: "EMot Online Tickets ใช้ได้เฉพาะสมาร์ตโฟน", paper: "Odakyu Sightseeing Service Center หรือเครื่องขายตั๋วที่สถานี" },
  { item: "การชำระเงิน", digital: "ออนไลน์", paper: "เครื่องขายตั๋วรับเงินสด PASMO/Suica และ American Express, Diners Club, JCB, Mastercard, Visa" },
  { item: "เดินทางเป็นกลุ่ม", digital: "ตัวเลือก For Group เก็บพาสได้สูงสุด 4 ใบบนสมาร์ตโฟนเครื่องเดียว ต้องเดินทางด้วยกัน และเมื่อผ่านประตูตรวจตั๋ว ให้สแกนพาสของผู้ร่วมเดินทางก่อน แล้วจึงสแกนพาสของตนเองเป็นใบสุดท้าย", paper: "คนละหนึ่งใบ" },
  { item: "เด็ก", digital: "อายุ 6–11 ปีจ่ายราคาเด็ก อายุต่ำกว่า 6 ปีไม่ต้องมีตั๋ว ใช้กับ Kids Phone ของญี่ปุ่นไม่ได้", paper: "อายุ 6–11 ปีจ่ายราคาเด็ก อายุต่ำกว่า 6 ปีไม่ต้องมีตั๋ว" },
  { item: "การคืนเงิน", digital: "ขอคืนเงินได้เฉพาะเมื่อมีปุ่ม Refund แสดงบนตั๋ว ช่วงที่ระงับบริการเพราะสภาพอากาศคืนเงินผ่านฝ่ายบริการลูกค้าของ EMot", paper: "หากมีการระงับบริการ ขอคืนเงินได้ที่สถานีสุดท้ายที่เดินทางไปถึง เฉพาะช่วงที่ยังไม่ได้ใช้" },
];

const faqItems: FaqItem[] = [
  {
    q: "Hakone Free Pass ปี 2026 ราคาเท่าไร?",
    a: `แบบ 2 วันจากชินจูกุ ผู้ใหญ่ ${PASS_2_DAY_SHINJUKU} เด็ก (6–11 ปี) ¥1,600 และแบบ 3 วัน ${PASS_3_DAY_SHINJUKU} / ¥1,850 ส่วนพาสแบบเริ่มต้นจากโอดาวาระที่ใช้ได้เฉพาะในพื้นที่ฮาโกเน่ แบบ 2 วัน ${PASS_2_DAY_ODAWARA} / ¥1,500 และแบบ 3 วัน ${PASS_3_DAY_ODAWARA} / ¥1,750 ราคานี้ใช้ตั้งแต่ 1 ตุลาคม 2025 ตรวจสอบจาก hakonenavi.jp และ odakyu.jp เมื่อ ${CHECKED}`,
  },
  {
    q: "Hakone Free Pass คุ้มไหม?",
    a: `คุ้มหากเดินทางครบวงรอบ แม้ไปวันเดียว ตามค่าตั๋วเดี่ยวของ Hakone Navi วงรอบจากชินจูกุ ได้แก่ รถไฟสายโอดะคิวเที่ยวละ ¥1,261 (ไปและกลับ) รถไฟโทซัน ¥460 รถรางไต่เขา ¥430 กระเช้าลอยฟ้า ${ROPEWAY} เรือทะเลสาบอาชิ ${CRUISE} และรถบัสขากลับ ¥1,210 รวมเป็น ${LOOP_REGULAR} เทียบกับพาส 2 วัน ${PASS_2_DAY_SHINJUKU} จึงประหยัด ${LOOP_SAVING} และประหยัด ¥3,522 ตามแผน 2 วันของ Hakone Navi พาสคุ้มทุนในช่วงที่ 7 คือรถไฟขากลับ ถ้าไปแค่ฮาโกเน่ยุโมโตะจะไม่คุ้ม ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ซื้อ Hakone Free Pass ได้ที่ไหน?",
    a: `ซื้อออนไลน์ได้ที่ EMot Online Tickets ของโอดะคิว (พาสดิจิทัลแบบ QR Code ใช้ได้เฉพาะบนสมาร์ตโฟน) ซื้อตั๋วกระดาษได้ที่เครื่องขายตั๋วสถานีสายโอดะคิวและ Odakyu Sightseeing Service Center ที่ 7-Eleven ผ่าน 7-Ticket ที่ร้าน Odakyu Travel และที่ฮาโกเน่ ได้แก่เครื่องขายตั๋วของรถไฟฮาโกเน่โทซันและศูนย์บริการข้อมูลรถบัสฮาโกเน่โทซัน สถานีโอดะคิวขายล่วงหน้าได้ 1 เดือน ส่วนเครื่องจำหน่ายตั๋วขายเฉพาะพาสที่เริ่มใช้ในวันที่ซื้อ และยังซื้อพาสนี้ผ่าน Klook และชำระเงินผ่านหน้าภาษาไทยได้เช่นกัน ตรวจสอบเมื่อ ${BUY_CHECKED}`,
  },
  {
    q: "Hakone Free Pass รวม Romancecar ไหม?",
    a: `ไม่รวม พาสแบบเริ่มต้นจากชินจูกุรวมค่าโดยสารรถไฟสายโอดะคิวไปกลับ 1 ครั้ง แต่รถไฟด่วนพิเศษ Romancecar ต้องซื้อตั๋วที่นั่งรถไฟด่วนพิเศษแยกต่างหาก ผู้ใหญ่ ${ROMANCECAR} เด็ก ¥600 ต่อเที่ยวระหว่างชินจูกุกับฮาโกเน่ยุโมโตะ หรือ ¥200 / ¥100 จากโอดาวาระ ใช้เวลาประมาณ 80 นาทีแบบไม่ต้องเปลี่ยนขบวน และจองที่นั่งผ่าน EMot Online Tickets ถูกกว่า ¥50 ตัวอย่างของโอดะคิวเอง: พาส ${PASS_2_DAY_SHINJUKU} + Romancecar ไปกลับ ¥2,400 = ¥9,500 ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "1 วันหรือ 2 วัน: ควรซื้อพาสฮาโกเน่แบบไหน?",
    a: `Hakone Freepass ไม่มีแบบ 1 วัน มีเฉพาะแบบ 2 วันและ 3 วัน ถ้าเดินทางครบวงรอบให้ซื้อแบบ 2 วัน (${PASS_2_DAY_SHINJUKU} จากชินจูกุ) แม้ไปวันเดียว เพราะถูกกว่าตั๋วเดี่ยว ${LOOP_SAVING} ถ้าไปเฉพาะโอวาคุดานิโดยไม่ไปทะเลสาบ Owakudani 2-Day Pass (¥5,000 จากโอดาวาระ) รวมรถไฟโทซัน รถรางไต่เขา และกระเช้าลอยฟ้า ถ้ามาด้วยรถยนต์ Sightseeing Cruise & Ropeway Pass แบบ 1 วันราคา ¥5,000 ตรวจสอบจากประกาศค่าโดยสาร Odakyu Hakone และ Hakone Navi เมื่อ ${CHECKED}`,
  },
];

const tripPrepItems = [
  withKlookLocale(hakoneFreepassTripPrep[0], LOCALE, {
    label: "ทัวร์รถบัสโอวาคุดานิ ทะเลสาบอาชิ และศาลเจ้าฮาโกเน่",
    ctaLabel: "ดูทัวร์ฮาโกเน่ 1 วัน →",
    why: "พาสนี้ไม่มีแบบ 1 วัน หากเที่ยวแบบไปกลับจากโตเกียวเพียงวันเดียว รถบัสพร้อมไกด์พาไปโอวาคุดานิและทะเลสาบอาชิได้ด้วยการจองครั้งเดียว",
  }),
  withKlookLocale(hakoneFreepassTripPrep[1], LOCALE, {
    label: "โรงแรมทั้งหมดในฮาโกเน่",
    ctaLabel: "ดูโรงแรมในฮาโกเน่ →",
    why: "พาส 2 วันใช้ได้จนถึงเที่ยวเดินรถสุดท้ายของวันที่สอง การพักค้างคืนในฮาโกเน่ช่วยให้ใช้พาสได้ครบทั้งสองวันที่จ่ายไปแล้ว",
  }),
  withKlookLocale(hakoneFreepassTripPrep[2], LOCALE, {
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM บน Klook →",
    why: "Freepass แบบดิจิทัลใช้งานผ่าน QR Code บนสมาร์ตโฟน และสถานะการให้บริการของกระเช้าลอยฟ้าและเรือตรวจสอบได้สะดวกที่สุดในเช้าวันที่จะเดินทาง",
  }),
];

const tourPicks = [
  withKlookLocale(hakoneLoopBusTour, LOCALE, {
    title: "ทัวร์รถบัสโอวาคุดานิ ทะเลสาบอาชิ และศาลเจ้าฮาโกเน่",
    desc: "ทัวร์รถบัสพร้อมไกด์จากโตเกียว เที่ยวตามเส้นทางวงรอบฮาโกเน่ รวมกระเช้าลอยฟ้าและเรือโจรสลัด",
  }),
  withKlookLocale(hakoneCruiseCableCarTour, LOCALE, {
    title: "ทัวร์ 1 วัน ล่องเรือ กระเช้าลอยฟ้า และโอวาคุดานิ",
    desc: "ล่องเรือทะเลสาบอาชิ นั่งกระเช้าลอยฟ้าข้ามหุบเขาภูเขาไฟ และแวะออนเซ็น จองทั้งหมดได้ในครั้งเดียวเป็นทัวร์ 1 วันจากโตเกียว",
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
            ราคา Hakone Free Pass จากชินจูกุและโอดาวาระตามราคาที่โอดะคิวประกาศอย่างเป็นทางการ เส้นทางวงรอบที่ใช้พาสเพียงวันเดียวก็คุ้มค่า พาสดิจิทัลบนสมาร์ตโฟน และค่าที่นั่งรถไฟ Romancecar ที่พาสไม่รวม
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการของโอดะคิว", "ไม่มีพาสแบบ 1 วัน"].map((t) => (
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
            <strong>Hakone Freepass</strong> แบบ 2 วัน ผู้ใหญ่ราคา <strong>{PASS_2_DAY_SHINJUKU} จากชินจูกุ และ {PASS_2_DAY_ODAWARA} จากโอดาวาระ</strong> (แบบ 3 วัน {PASS_3_DAY_SHINJUKU} / {PASS_3_DAY_ODAWARA}) นั่งระบบขนส่ง 8 ประเภทในฮาโกเน่ได้ไม่จำกัดเที่ยว ถ้าเดินทางครบวงรอบหนึ่งรอบจากชินจูกุ (รถไฟสายโอดะคิว รถไฟโทซัน รถรางไต่เขา กระเช้าลอยฟ้า เรือทะเลสาบอาชิ และรถบัส) <strong>ค่าตั๋วเดี่ยวรวมเป็น {LOOP_REGULAR}</strong> พาสจึง<strong>ถูกกว่า {LOOP_SAVING} แม้ไปกลับวันเดียว</strong> ค่าที่นั่ง Romancecar (เที่ยวละ {ROMANCECAR} จากชินจูกุ) ต้องจ่ายเพิ่ม ราคาทั้งหมดตรวจสอบจากหน้าทางการของโอดะคิวและ Hakone Navi เมื่อ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            หน้านี้อธิบายรายละเอียดของ Hakone Free Pass ทั้งราคา ระบบขนส่งที่ใช้ได้ และช่องทางการซื้อ ส่วนแผนเที่ยวแต่ละจุดภายในหนึ่งวันอยู่ใน <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>คู่มือเที่ยวฮาโกเน่ 1 วันจากโตเกียว (ภาษาอังกฤษ)</Link> และการใช้พาสทั้งสองวันโดยพักค้างคืนหนึ่งคืนอยู่ใน <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>แผนเที่ยวฮาโกเน่ 2 วัน (ภาษาอังกฤษ)</Link>
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>พาส 2 วันจากชินจูกุ</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>พาส 2 วันจากโอดาวาระ</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ใช้ได้กับ</p>
                <p className={styles.verdictStatValue}>ระบบขนส่ง 8 ประเภท</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Romancecar</p>
                <p className={styles.verdictStatValue}>จ่ายเพิ่ม {ROMANCECAR} ไม่รวมในพาส</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              โอดะคิวสะกดชื่อพาสว่า <strong>Freepass</strong> แต่คนส่วนใหญ่ค้นหาว่า Hakone Free Pass ทั้งสองชื่อหมายถึงพาสเดียวกัน พาสนี้ไม่มีแบบ 1 วัน ซื้อออนไลน์ (EMot หรือ Klook) แล้วไม่ต้องต่อคิวที่สถานี และถ้าคุณมาถึงด้วยชินคันเซ็น ให้ซื้อพาสแบบเริ่มต้นจากโอดาวาระ
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

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="hakone" />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>Hakone Free Pass ปี 2026 ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            พาส 2 วันจากชินจูกุสำหรับผู้ใหญ่ราคา {PASS_2_DAY_SHINJUKU} เป็นแบบที่นักท่องเที่ยวส่วนใหญ่ที่เดินทางจากโตเกียวต้องใช้ ราคาขึ้นอยู่กับสถานีต้นทางที่เลือก และพาสแบบ 3 วันแพงขึ้นเพียง ¥400
          </p>
          <Table
            head={["สถานีต้นทาง", "ผู้ใหญ่ (2 วัน)", "เด็ก (2 วัน)", "ผู้ใหญ่ (3 วัน)", "เด็ก (3 วัน)"]}
            rows={priceRows.map((r) => [r.pass, r.d2a, r.d2c, r.d3a, r.d3c])}
          />
          <LastChecked>
            {" "}ราคาเด็กใช้สำหรับเด็กอายุ 6–11 ปี ส่วนเด็กอายุต่ำกว่า 6 ปีเดินทางฟรี ราคานี้ใช้ตั้งแต่ 1 ตุลาคม 2025 ค่าที่นั่งรถไฟ Romancecar ต้องจ่ายเพิ่ม: {ROMANCECAR} / ¥600 จากชินจูกุ และ ¥200 / ¥100 จากโอดาวาระ ไปฮาโกเน่ยุโมโตะ
          </LastChecked>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            ควรซื้อพาสแบบเริ่มต้นจากชินจูกุหรือโอดาวาระ? ส่วนต่าง ¥1,100 คือค่าโดยสารรถไฟสายโอดะคิวไปกลับระหว่างชินจูกุกับโอดาวาระเท่านั้น ทั้งสองแบบใช้กับระบบขนส่ง 8 ประเภทในฮาโกเน่ได้เหมือนกัน เรารวบรวมพาสอื่น ๆ ทั้งหมดในเว็บไซต์นี้ไว้ใน <Link href="/guides/attractions/japan-attraction-ticket-prices" style={linkStyle}>ตารางราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น (ภาษาอังกฤษ)</Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              เช็ก Hakone Freepass บน Klook →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              มีเวลาเที่ยวเพียงวันเดียว? เทียบกับทัวร์ฮาโกเน่ 1 วันพร้อมไกด์ →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="สิ่งที่ควรจองเพิ่มสำหรับทริปนี้"
          heading="ซื้อ Hakone Freepass แล้วควรจองอะไรเพิ่ม?"
          headingLevel={3}
          intro="พาสใช้ได้เฉพาะค่าเดินทาง ไม่รวมกิจกรรมท่องเที่ยวหรือค่าที่พัก ถ้ามีเพียงวันเดียวและไม่อยากดูตารางเดินรถ ทัวร์ฮาโกเน่ 1 วันพร้อมไกด์จะพาเที่ยวตามเส้นทางวงรอบเดียวกัน โดยจองเพียงครั้งเดียว ถ้ามีสองวัน การพักค้างคืนในฮาโกเน่ช่วยให้ใช้พาสได้ครบทั้งสองวันที่จ่ายไปแล้ว และซื้อแพ็กเกจอินเทอร์เน็ตมือถือสำหรับใช้ตั๋วดิจิทัลได้ในบัญชี Klook เดียวกัน"
          items={tripPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ช่องทางการซื้อ</span>
          <h2 className={styles.sectionTitle}>ซื้อ Hakone Freepass ได้ที่ไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ซื้อออนไลน์ได้ที่ EMot Online Tickets ของโอดะคิวหรือ Klook หรือซื้อตั๋วกระดาษที่สถานีสายโอดะคิว 7-Eleven หรือในฮาโกเน่ แต่ละช่องทางต่างกันที่รูปแบบตั๋วและระยะเวลาที่ซื้อล่วงหน้าได้
          </p>
          <Table
            head={["ช่องทางการซื้อ", "รูปแบบตั๋ว", "ระยะเวลาที่ซื้อได้", "ควรรู้"]}
            rows={buyRows.map((r) => [r.where, r.ticket, r.when, r.note])}
          />
          <LastChecked iso={BUY_CHECKED_ISO}>{" "}ข้อมูลในส่วนของ Klook ไม่ได้อ้างอิงจากแหล่งข้อมูลทางการ เงื่อนไขล่าสุดดูได้ในหน้าสินค้า</LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>สิ่งที่รวมและไม่รวมในพาส</span>
          <h2 className={styles.sectionTitle}>Hakone Freepass ใช้กับอะไรได้บ้าง?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ใช้บริการระบบขนส่ง 8 ประเภทในฮาโกเน่ได้ไม่จำกัดเที่ยว และพาสแบบเริ่มต้นจากชินจูกุรวมค่าโดยสารรถไฟสายโอดะคิวไปกลับ 1 ครั้ง ค่าที่นั่งรถไฟ Romancecar และค่าโดยสาร Izu-Hakone Bus ไม่รวมในพาส
          </p>
          <Table head={["ระบบขนส่ง", "ใช้พาสได้ไหม", "รายละเอียด"]} rows={coverageRows.map((r) => [r.mode, r.included, r.note])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            {" "}พาสนี้ยังใช้รับส่วนลดได้ที่สถานที่ประมาณ 70 แห่งในฮาโกเน่ แต่รายชื่อเปลี่ยนเรื่อย ๆ จึงไม่ได้ระบุราคาไว้ที่นี่
          </LastChecked>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>คุ้มไหม</span>
          <h2 className={styles.sectionTitle}>Hakone Freepass คุ้มไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            คุ้มหากเดินทางครบวงรอบ แม้ไปวันเดียว ค่าตั๋วเดี่ยว 7 ช่วงจากชินจูกุแล้วกลับชินจูกุรวมเป็น {LOOP_REGULAR} เทียบกับพาส {PASS_2_DAY_SHINJUKU} จึงประหยัด {LOOP_SAVING} ยอดสะสมแซงราคาพาสในช่วงที่ 7 คือรถไฟขากลับชินจูกุ
          </p>
          <Table head={["ช่วง (ตามลำดับวงรอบ)", "เส้นทาง", "ค่าตั๋วเดี่ยว ผู้ใหญ่", "ยอดสะสม"]} rows={fareRows} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — <a href={BREAKDOWN_URL} target="_blank" rel="noopener noreferrer">Hakone Navi ค่าโดยสารแต่ละช่วง (ภาษาญี่ปุ่น)</a>, <a href={LOOP_URL} target="_blank" rel="noopener noreferrer">Hakone Navi (ค่าโดยสารรวมทั้งเส้นทางวงรอบ)</a>, <a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">ประกาศค่าโดยสาร Odakyu Hakone (PDF)</a>, <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a> ค่าโดยสารผู้ใหญ่เมื่อใช้บัตร IC ไม่รวม Romancecar ถ้านั่งรถไฟโทซันต่อไปถึงโกระเพิ่มอีก ¥160 ตารางคำนวณไม่มีค่าโดยสารเด็กแต่ละช่วง กระเช้าลอยฟ้าเด็กเที่ยวละ ¥700 และเรือ ¥850 ผู้ถือพาสเข้าสวนฮาโกเน่โกระ (¥650) ได้ฟรี และห้องโดยสารพิเศษบนเรือเพิ่มอีก ¥800 ต่อเที่ยว
          </p>
          <Table head={["แผนของคุณ", "คำแนะนำ", "เหตุผล"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            ทั้งกระเช้าลอยฟ้าและเรือหยุดให้บริการเมื่อสภาพอากาศไม่ดี และกระเช้าลอยฟ้าที่โอวาคุดานิหยุดให้บริการกะทันหันได้ หากมีการระงับบริการในช่วงที่คุณยังไม่ได้ใช้ ผู้ใช้พาสแบบกระดาษขอคืนเงินได้ที่สถานีสุดท้ายที่เดินทางไปถึง แผนเที่ยวรายวัน ทั้งสถานที่น่าสนใจในแต่ละจุดและเวลาที่ควรออกจากโตเกียว อยู่ใน <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>คู่มือเที่ยวฮาโกเน่ 1 วันจากโตเกียว (ภาษาอังกฤษ)</Link> ส่วนหน้านี้เน้นอธิบายรายละเอียดของพาส
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

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>แผนที่เส้นทาง</span>
          <h2 className={styles.sectionTitle}>เส้นทาง Hakone Freepass นั่งตามลำดับอย่างไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            วงรอบมี 7 ช่วง: รถไฟสายโอดะคิวไปฮาโกเน่ยุโมโตะ รถไฟโทซันขึ้นไปโกระ รถรางไต่เขาไปโซอุนซัง กระเช้าลอยฟ้าผ่านโอวาคุดานิไปโทเง็นได เรือโจรสลัดข้ามทะเลสาบอาชิ รถบัสกลับฮาโกเน่ยุโมโตะ แล้วนั่งรถไฟสายโอดะคิวกลับ ทุกช่วงใช้พาสได้ และเที่ยวย้อนทิศทางก็ได้
          </p>
          <Table head={["ยานพาหนะ", "เส้นทาง", "เวลา", "ใช้พาสได้ไหม?"]} rows={routeRows} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — <a href={ODAKYU_URL} target="_blank" rel="noopener noreferrer">odakyu.jp (เวลา Romancecar)</a>, <a href={ITINERARY_URL} target="_blank" rel="noopener noreferrer">Odakyu HAKONE TRIP (เวลารถไฟโทซัน)</a>, <a href={LP_URL} target="_blank" rel="noopener noreferrer">หน้า Freepass ของ Hakone Navi (รถรางไต่เขา ภาษาญี่ปุ่น)</a>, <a href={ROPEWAY_URL} target="_blank" rel="noopener noreferrer">FAQ กระเช้าลอยฟ้าฮาโกเน่</a>, <a href={CRUISE_URL} target="_blank" rel="noopener noreferrer">FAQ เรือท่องเที่ยวฮาโกเน่ (เวลาเรือและรถบัส)</a> เวลานั่งรวมได้จากการบวกเวลาเหล่านี้ กระเช้าลอยฟ้าและเรือหยุดให้บริการเมื่อมีลมแรงหรือสภาพอากาศไม่ดี และกระเช้าลอยฟ้าหยุดซ่อมบำรุงประจำปีด้วย ดูวันหยุดช่วงฤดูหนาวได้ใน <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>แผนเที่ยวฮาโกเน่ 2 วัน (ภาษาอังกฤษ)</Link>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เลือกพาส</span>
          <h2 className={styles.sectionTitle}>1 วันหรือ 2 วัน: ควรซื้อพาสฮาโกเน่แบบไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ถ้าเดินทางครบวงรอบ ให้ซื้อ Hakone Freepass แบบ 2 วันแม้ไปวันเดียว เพราะไม่มี Freepass แบบ 1 วัน และแบบ 2 วันยังถูกกว่าตั๋วเดี่ยว {LOOP_SAVING} พาสที่ครอบคลุมน้อยกว่าจะคุ้มก็ต่อเมื่อไม่ไปทะเลสาบหรือไม่ขึ้นกระเช้าลอยฟ้า
          </p>
          <Table head={["พาส", "เหมาะกับ", "ราคาผู้ใหญ่"]} rows={passChoiceRows} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — <a href={FARE_NOTICE_URL} target="_blank" rel="noopener noreferrer">ประกาศค่าโดยสาร Odakyu Hakone (PDF)</a>, <a href={LOOP_URL} target="_blank" rel="noopener noreferrer">พาสส่วนลดของ Hakone Navi</a>, <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทางไปฮาโกเน่</span>
          <h2 className={styles.sectionTitle}>Hakone Freepass รวม Romancecar ไหม?</h2>
          <p className={styles.bodyText}>
            ไม่รวม พาสแบบเริ่มต้นจากชินจูกุรวมค่าโดยสารรถไฟสายโอดะคิวไปกลับ 1 ครั้ง แต่รถไฟด่วนพิเศษ Romancecar ต้องซื้อตั๋วที่นั่งรถไฟด่วนพิเศษแยกต่างหาก <strong>ผู้ใหญ่ {ROMANCECAR} เด็ก ¥600 ต่อเที่ยว</strong> จากชินจูกุไปฮาโกเน่ยุโมโตะ ใช้เวลา<strong>ประมาณ 80 นาทีแบบไม่ต้องเปลี่ยนขบวน</strong> เป็นรถไฟแบบสำรองที่นั่งทุกที่นั่ง และจองที่นั่งผ่าน EMot Online Tickets ถูกกว่าซื้อที่สถานี ¥50 ตัวอย่างการคำนวณของโอดะคิวเองสำหรับการไปกลับจากชินจูกุ คือพาส {PASS_2_DAY_SHINJUKU} บวก Romancecar ไปกลับ ¥2,400 รวม ¥9,500 รถไฟสายโอดะคิวแบบปกติที่ใช้พาสได้จะใช้เวลานานกว่า และมักต้องเปลี่ยนขบวนที่โอดาวาระ
          </p>
          <p className={styles.bodyText}>
            นักท่องเที่ยวมักเที่ยวฮาโกเน่คู่กับทะเลสาบทั้งห้าของฟูจิ ซึ่งเป็นคนละพื้นที่และใช้พาสแยกกัน อ่านได้ใน <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>คู่มือเที่ยวภูเขาไฟฟูจิ 1 วัน (ภาษาอังกฤษ)</Link> หากพักฮาโกเน่หนึ่งคืนระหว่างทริปที่ยาวกว่านั้น <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>แผนเที่ยวโตเกียว 7 วัน (ภาษาอังกฤษ)</Link>, <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>แผนเที่ยวโตเกียว 5 วัน (ภาษาอังกฤษ)</Link> และ <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>แผนเที่ยวญี่ปุ่น 14 วัน (ภาษาอังกฤษ)</Link> แสดงวิธีจัดวันเที่ยวฮาโกเน่ในแผนการเดินทาง ส่วน <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>เรียวกังฮาโกเน่ที่มีออนเซ็นส่วนตัว (ภาษาอังกฤษ)</Link> รวบรวมเรียวกัง 10 แห่งแยกตามพื้นที่ ตั้งแต่ฮาโกเน่ยุโมโตะถึงทะเลสาบอาชิ พร้อมข้อมูลการเดินทางไปแต่ละแห่งด้วยรถบัสหรือรถไฟ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>สำหรับผู้ถือ JR Pass</span>
          <h2 className={styles.sectionTitle}>ใช้ Hakone Freepass คู่กับ JR Pass ได้ไหม?</h2>
          <p className={styles.bodyText}>
            ใช้ร่วมกันได้ แต่พาสทั้งสองใช้กับการเดินทางคนละช่วง โอดะคิวระบุว่า JR Pass และ JR Tokyo Wide Pass ใช้ภายในพื้นที่ฮาโกเน่ไม่ได้ ใช้ได้เฉพาะการเดินทางด้วยรถไฟ JR ไปถึงสถานีโอดาวาระ จากโอดาวาระ <strong>Hakone Freepass แบบเริ่มต้นจากโอดาวาระ ({PASS_2_DAY_ODAWARA} สำหรับ 2 วัน {PASS_3_DAY_ODAWARA} สำหรับ 3 วัน)</strong> ใช้ได้ครบเส้นทางวงรอบ และไม่รวมค่าโดยสารรถไฟสายโอดะคิวที่คุณไม่ได้นั่ง ถ้าขากลับนั่ง Romancecar ไปชินจูกุ ต้องจ่ายค่าตั๋วที่นั่งและค่าโดยสารปกติระหว่างโอดาวาระกับชินจูกุเพิ่ม JR Pass คุ้มสำหรับทริปโตเกียวหรือไม่ อ่านได้ใน <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>คู่มือ JR Pass (ภาษาอังกฤษ)</Link> และ <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>คู่มือ JR Tokyo Wide Pass (ภาษาอังกฤษ)</Link>
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — <a href={JR_URL} target="_blank" rel="noopener noreferrer">คำถามที่พบบ่อยเรื่อง Hakone Freepass ของโอดะคิว</a>, <a href={NAVI_URL} target="_blank" rel="noopener noreferrer">hakonenavi.jp (Hakone Freepass)</a>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>รูปแบบตั๋ว</span>
          <h2 className={styles.sectionTitle}>ควรซื้อ Hakone Freepass แบบดิจิทัลหรือแบบกระดาษ?</h2>
          <Table head={["", "ดิจิทัล (EMot)", "กระดาษ"]} rows={formatRows.map((r) => [r.item, r.digital, r.paper])} />
          <LastChecked iso={BUY_CHECKED_ISO}>
            {" "}เลือกดิจิทัลถ้ากลุ่มของคุณเดินทางด้วยกันและใช้โทรศัพท์เครื่องเดียว เลือกพาสแบบกระดาษหากเด็กใช้โทรศัพท์สำหรับเด็ก (Kids Phone) หรือไม่อยากกังวลเรื่องแบตเตอรี่โทรศัพท์ ระยะเวลาใช้งานของพาสนับตามวันปฏิทิน: พาส 2 วันหมดอายุหลังเที่ยวสุดท้ายของวันถัดจากวันที่ซื้อ ไม่ใช่ 48 ชั่วโมงหลังซื้อ
          </LastChecked>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเรื่อง Hakone Freepass" />

        <KlookTourPicks
          heading="ถ้ามีเวลาแค่วันเดียว"
          intro="หากเที่ยวตามเส้นทางวงรอบด้วยตนเอง พาสนี้เป็นตัวเลือกที่เหมาะสม ถ้าต้องการออกจากโตเกียววันเดียวโดยไม่ต้องดูตารางเดินรถ ด้านล่างเป็นทัวร์พร้อมไกด์ที่พาเที่ยวตามเส้นทางวงรอบเดียวกันด้วยรถบัสคันเดียว ออกเดินทางตามเวลาที่กำหนด และกลับถึงโตเกียวในเย็นวันเดียวกัน โปรดตรวจสอบราคาในหน้ารายละเอียดสินค้าตามวันที่ต้องการเดินทาง"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "เรียวกังฮาโกเน่ที่มีออนเซ็นส่วนตัว: 10 แห่งแยกตามพื้นที่ (2026) (ภาษาอังกฤษ)" },
            { href: "/guides/transport/jr-pass-guide", title: "ราคา JR Pass 2026: ราคาใหม่และความคุ้มค่า (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "เที่ยวฮาโกเน่ 1 วันจากโตเกียว (2026): ราคา Freepass เทียบกับทัวร์ (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "เที่ยวภูเขาไฟฟูจิ 1 วันจากโตเกียว (2026): วิธีไปเอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว (2026): เลือกทัวร์อย่างไร และแต่ละทัวร์พาไปชมอะไร (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "เที่ยวคาวากุจิโกะ 1 วันจากโตเกียว (2026): เส้นทาง ค่าโดยสาร และเที่ยวอะไรได้บ้าง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "แผนเที่ยวโตเกียว 5 วัน (2026): โปรแกรมเที่ยวรายวัน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/japan-14-day-itinerary", title: "แผนเที่ยวญี่ปุ่น 14 วัน (2026): โปรแกรมเที่ยวรายวันตลอด 2 สัปดาห์ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/shinkansen-guide", title: "คู่มือชินคันเซ็น 2026: ตั๋ว พาส และเคล็ดลับสำหรับผู้ใช้ครั้งแรก (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "ราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น 2026: ราคาอย่างเป็นทางการและเงื่อนไขการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "กิจกรรมน่าสนใจอื่น ๆ ในญี่ปุ่น (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>เที่ยวครบเส้นทางวงรอบฮาโกเน่ด้วยพาสใบเดียว</h2>
            <p className={styles.ctaBannerDesc}>
              ใช้ระบบขนส่ง 8 ประเภทได้ 2 หรือ 3 วัน และชำระเงินผ่าน Klook ด้วยบัตรที่ออกในต่างประเทศได้ หากมีเวลาเพียงวันเดียวและไม่อยากเช็กตารางเดินรถเอง ทัวร์รถบัสพร้อมไกด์ที่เที่ยวตามเส้นทางวงรอบเดียวกันจะเหมาะกว่า
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
