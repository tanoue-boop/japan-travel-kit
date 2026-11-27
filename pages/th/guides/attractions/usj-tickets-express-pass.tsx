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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { gygUsj, gygUsjExpressPass } from "../../../../lib/gyg-links";
import {
  jrHarukaUrl,
  jrKansaiMiniPass,
  klookEsim,
  nankaiRapitUrl,
  parkFrontHotelUsjKlook,
  usjExpressSameDayPrep,
  usjSameDayPrep,
  usjStayAreas,
  usjTripPrep,
  usjHighRateTopPrep,
  osakaSightsHighRatePrep,
  type KlookStayArea,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { thUsjExpressPass, thUsjStudioPass } from "../../../../lib/klook-links-th";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/usj-tickets-express-pass) section by
// section as of 2026-11-01: same sections, tables, FAQ and Klook/GetYourGuide CTAs in
// the same places. Every fact and figure is the English page's; nothing is added.

const ROUTE = "/th/guides/attractions/usj-tickets-express-pass";
// 14 Nov 2026 (R01): the query leads the title, H1 and meta, as on the English page.
// 22 Nov 2026 (R07): Thai readers search "บัตร universal studio japan (มีกี่แบบ)" — the ticket, and how many
// kinds there are — before "express pass". Title and H1 now read บัตร → Universal Studios Japan → มีกี่แบบ →
// Express Pass, in that order. The title runs past the 35-glyph Thai budget (Latin letters are narrow; the
// full park name is the query), so "2026" moves to the H1.
const TITLE = "บัตร Universal Studios Japan มีกี่แบบ + Express Pass";
const H1 = "บัตร Universal Studios Japan ปี 2026 มีกี่แบบ และ Express Pass ราคาเท่าไหร่";
const DESC =
  "บัตร USJ มี 1 วัน 1.5 วัน 2 วัน ราคาตามวัน Express Pass ราคาเท่าไหร่ 4 กับ 7 ต่างกันยังไง";

const LOCALE = "th" as const;
const GYG_SLUG = "th-usj-tickets-express-pass";
const CHECKED = dateLabel("2026-10-26", LOCALE);
const CHECKED_USJ = dateLabel("2026-10-27", LOCALE);
const CHECKED_TODAY = dateLabel("2026-11-14", LOCALE);
const USE_CHECKED = dateLabel("2026-11-06", LOCALE);
const USJ_EXPRESS_URL = "https://www.usj.co.jp/web/en/us/tickets/express-pass";
const VARIANT_PRICE = "แตกต่างตามวันเข้าสวน — แสดงตอนชำระเงิน";
const CHECKED_R07 = dateLabel("2026-11-22", LOCALE);
const USJ_MULTIDAY_URL = "https://www.usj.co.jp/web/ja/jp/enjoy/multi-day-pass-plan";

// 22 Nov 2026 (R07): the two tables under the opening answer — admission ticket types, then Express Pass
// types. No yen: USJ prices both per date, and usj.co.jp list pages disagree on "from" prices (see the
// price section). The 1.5-day rule is USJ's own multi-day page, read through the search index on 22 Nov 2026.
const admissionRows = [
  {
    ticket: "สรุป: มาวันเดียวซื้อ Studio Pass 1 วัน",
    what: "อยู่โอซาก้า 2 วันขึ้นไปและอยากเที่ยว USJ สองวัน ให้เลือก Studio Pass แบบ 2 วัน (เฉลี่ยต่อวันมักถูกกว่า) ถ้ามาถึงโอซาก้าช่วงบ่าย ให้เลือก Studio Pass แบบ 1.5 วัน",
    price: "ทุกแบบราคาตามวันเข้าสวน — ไม่มีราคาคงที่",
  },
  {
    ticket: "Studio Pass 1 วัน",
    what: "เข้าสวนได้ 1 วันเต็ม เล่นเครื่องเล่นทั่วไปด้วยคิวปกติ",
    price: "กำหนดตามวัน — ราคาของวันนั้นแสดงตอนชำระเงิน",
  },
  {
    ticket: "Studio Pass 1.5 วัน",
    what: "วันแรกเข้าได้ตั้งแต่ 15:00 วันที่สองเข้าได้ตั้งแต่สวนเปิด เหมาะกับวันที่เดินทางมาถึงโอซาก้า",
    price: "กำหนดตามวัน — ราคาของวันนั้นแสดงตอนชำระเงิน",
  },
  {
    ticket: "Studio Pass 2 วัน",
    what: "เข้าสวนได้ 2 วันติดต่อกัน",
    price: "กำหนดตามวัน — ราคาของวันนั้นแสดงตอนชำระเงิน",
  },
  {
    ticket: "Express Pass (ซื้อเพิ่ม)",
    what: "ไม่ใช่บัตรเข้าสวน — ต้องมี Studio Pass ของวันเดียวกันด้วย",
    price: "กำหนดตามวัน (ดูตารางถัดไป)",
  },
];

const expressTypeRows = [
  {
    type: "สรุป: ส่วนใหญ่เลือก Express Pass 7",
    covers: "มาครั้งแรกและมีวันเดียวในวันเสาร์อาทิตย์หรือวันหยุด เลือก 7 วันที่คนน้อยให้เลือก Express Pass 4 ถ้าไปเพราะ Super Nintendo World เลือกเวอร์ชันที่รวมสิทธิ์เข้าโซน",
    snw: "เฉพาะเวอร์ชันที่ระบุ",
    where: "USJ WEB Ticket Store / Lawson Ticket / Klook — เปิดขายประมาณ 2 เดือนก่อนวันเข้าสวน",
  },
  {
    type: "Express Pass 4",
    covers: "ลัดคิวได้ 4 เครื่องเล่น — รายชื่อเครื่องเล่นที่ใช้ได้ขึ้นอยู่กับเวอร์ชันและวันที่เข้าชม",
    snw: "เฉพาะเวอร์ชันที่ระบุ",
    where: "WEB Ticket Store, Lawson Ticket, Klook",
  },
  {
    type: "Express Pass 7",
    covers: "ลัดคิวได้ 7 เครื่องเล่น — รายชื่อเครื่องเล่นกำหนดตามเวอร์ชันเช่นกัน",
    snw: "เฉพาะเวอร์ชันที่ระบุ",
    where: "WEB Ticket Store, Lawson Ticket, Klook",
  },
  {
    type: "Express Pass Premium และ Express Pass 4 ตามธีม",
    covers: "ขายเฉพาะช่วงวันเข้าสวนที่กำหนด แต่ละแบบมีรายชื่อเครื่องเล่นของตัวเอง",
    snw: "แตกต่างตามเวอร์ชัน",
    where: "ตรวจสอบวันที่เปิดขายผ่านแต่ละช่องทาง",
  },
  {
    type: "ที่ประตูสวนในวันนั้น",
    covers: "—",
    snw: "—",
    where: "ไม่มีขาย — USJ ไม่ขายบัตรที่ประตูในวันนั้นแล้ว ต้องซื้อออนไลน์ก่อนไป",
  },
];

const ticketRows = [
  { ticket: "Studio Pass 1 วัน", what: "เข้าสวนได้หนึ่งวัน เครื่องเล่นทั่วไปต่อคิวปกติ", price: "กำหนดตามวัน — ราคาของวันนั้นแสดงตอนชำระเงิน" },
  { ticket: "Studio Pass 2 วัน", what: "เข้าสวนสองวันติดกัน คิดต่อวันมักถูกกว่า", price: "กำหนดตามวัน — ราคาของวันนั้นแสดงตอนชำระเงิน" },
  { ticket: "Express Pass (ซื้อเพิ่ม)", what: "ใช้ช่องทางต่อคิวพิเศษที่ใช้เวลารอน้อยกว่าคิวปกติ สำหรับเครื่องเล่นที่กำหนดไว้ในบัตร ไม่ใช่บัตรเข้าสวน — ต้องมี Studio Pass หรือ Annual Pass ด้วย", price: "กำหนดตามวัน ตามระบบที่ USJ เริ่มใช้กับ Express Pass ในปี 2018" },
];

const variantRows = [
  // First row is the answer (14 Nov 2026, R01), as on the English page.
  {
    pass: "ยังไม่แน่ใจ? เริ่มที่นี่",
    covers: "Express Pass 7 สำหรับวันเดียวที่คนเยอะในการมาครั้งแรก Express Pass 4 สำหรับวันที่คนน้อยกว่าหรือมาซ้ำ และเวอร์ชันที่รวมสิทธิ์เข้าโซน ถ้า Super Nintendo World คือเหตุผลของทริป",
    snw: "เลือกเวอร์ชันที่ระบุว่ารวมสิทธิ์เข้าโซน",
    price: VARIANT_PRICE,
    bestFor: "คนมาครั้งแรกส่วนใหญ่ในวันเสาร์อาทิตย์หรือวันหยุด: Express Pass 7",
  },
  {
    pass: "Express Pass 4",
    covers: "สิทธิ์เครื่องเล่น 4 รายการ USJ อธิบายว่าเป็นพาสสำหรับเครื่องเล่นที่ห้ามพลาด ส่วนสี่รายการนั้นคืออะไรกำหนดตามแต่ละเวอร์ชันและแต่ละวัน",
    snw: "เฉพาะเวอร์ชันที่ระบุไว้",
    price: VARIANT_PRICE,
    bestFor: "วันที่มีเวลาน้อย มาเที่ยวรอบสอง หรือวันที่คนน้อยและอยากเล่นแค่เครื่องเล่นหลัก",
  },
  {
    pass: "Express Pass 7",
    covers: "สิทธิ์เครื่องเล่น 7 รายการ — ตัวที่ใหญ่กว่าในสองแบบที่คนมาครั้งแรกส่วนใหญ่เลือก และรายการเครื่องเล่นก็กำหนดตามเวอร์ชันเช่นกัน",
    snw: "เฉพาะเวอร์ชันที่ระบุไว้",
    price: VARIANT_PRICE,
    bestFor: "มีวันเดียว มาครั้งแรก วันที่คนเยอะ",
  },
  {
    pass: "จำนวนอื่นและเวอร์ชันตามธีม",
    covers: "USJ ยังขาย Express Pass ที่สร้างรอบเครื่องเล่นเดียวหรือชุดเครื่องเล่นตามฤดูกาล แต่ละแบบมีรายการของตัวเอง และมีมาแล้วหายไปตามอีเวนต์ของสวน",
    snw: "แตกต่างตามเวอร์ชัน",
    price: VARIANT_PRICE,
    bestFor: "มีเครื่องเล่นเฉพาะที่ต้องได้เล่น มากกว่าอยากได้ความครอบคลุมกว้าง ๆ",
  },
  {
    pass: "เวอร์ชันที่รวมบัตรเข้าโซน",
    covers: "Express Pass บางแบบมาพร้อม Area Timed Entry Ticket ของ Super Nintendo World คุณจึงได้รอบเข้าโซนไว้ก่อนไปถึง",
    snw: "รวม — ส่วนที่จ่ายเพิ่มคือสิ่งนี้",
    price: VARIANT_PRICE,
    bestFor: "คนที่ไปเพราะ Super Nintendo World โดยเฉพาะ",
  },
];

const PRICING_RELEASE = "“Pricing for Studio Passes to Change” (ประกาศเปลี่ยนราคา Studio Pass), 30 มิถุนายน 2026, usj.co.jp";
const EXPRESS_PAGE = "หน้า Universal Express Pass, usj.co.jp";
const PERIOD_RELEASE = "ประกาศช่วงเวลาจำหน่าย, 21 เมษายน 2025, usj.co.jp";

const pricingRows = [
  {
    what: "ราคา Express Pass",
    usj: "ประเภทและราคาของ Express Pass ที่ใช้ได้แตกต่างกันไปตามวัน",
    source: EXPRESS_PAGE,
  },
  {
    what: "เป็นแบบนี้มาตั้งแต่เมื่อไร",
    usj: "Express Pass ใช้ระบบราคาตามความต้องการในลักษณะเดียวกันมาตั้งแต่ปี 2018 และไม่มีแผนจะเปลี่ยน",
    source: PRICING_RELEASE,
  },
  {
    what: "ราคา Studio Pass (บัตรเข้าสวนที่ต้องมีด้วย)",
    usj: "สำหรับบัตรที่ขายตั้งแต่ 1 กรกฎาคม 2026 ซึ่งเข้าสวนตั้งแต่ 1 กันยายน 2026 ราคาของแต่ละวันจะมีการปรับตามความต้องการ ราคาเด็กและผู้สูงอายุก็เปลี่ยนด้วย ยกเว้น Annual Pass",
    source: PRICING_RELEASE,
  },
  {
    what: "คำแนะนำของ USJ เอง",
    usj: "ราคาอาจสูงขึ้น ควรซื้อให้เร็วที่สุดเท่าที่ทำได้",
    source: PRICING_RELEASE,
  },
];

const windowRows = [
  {
    q: "ซื้อล่วงหน้าได้นานแค่ไหน?",
    a: "ประมาณสองเดือนก่อนวันเข้าสวน ที่ WEB Ticket Store ทางการ และ Lawson Ticket (เว็บไซต์ และเครื่อง Loppi ในร้าน Lawson)",
    source: PERIOD_RELEASE,
  },
  {
    q: "เคยเปิดขายนานกว่านี้ไหม?",
    a: "เคย ช่วง Osaka Expo ขยายเป็นสามเดือนสำหรับวันเข้าสวนถึง 13 ตุลาคม 2025 และ USJ แจ้งว่าหลังจากนั้นจะกลับเป็นประมาณสองเดือน",
    source: PERIOD_RELEASE,
  },
  {
    q: "ขายวันละกี่ใบ?",
    a: "จำนวนจำกัดในแต่ละวัน — หน้าของ USJ เองระบุว่ามักขายหมดล่วงหน้า",
    source: EXPRESS_PAGE,
  },
  {
    q: "เลื่อนไปวันอื่นได้ไหม?",
    a: "ไม่ได้ Express Pass ที่ซื้อล่วงหน้าใช้ได้เฉพาะวันที่ระบุไว้ และถ้าคุณไปถึงเครื่องเล่นที่กำหนดเวลาใช้สิทธิ์ช้า จะไม่มีการคืนเงินหรือเปลี่ยนเป็นรอบอื่น",
    source: EXPRESS_PAGE,
  },
];

const needRows = [
  // First row is the answer (14 Nov 2026, R01), as on the English page.
  {
    date: "คำตอบสั้น ๆ",
    verdict: "ซื้อในวันเสาร์อาทิตย์ วันหยุด และช่วงวันหยุดฤดูหนาว ไม่ต้องซื้อในวันธรรมดาที่คนน้อย",
    why: "USJ ขายจำนวนจำกัดในแต่ละวันและระบุว่ามักขายหมดล่วงหน้า และราคาเปลี่ยนตามความต้องการของแต่ละวัน",
  },
  {
    date: "วันธรรมดาที่คนน้อย นอกช่วงปิดเทอมของโรงเรียนญี่ปุ่น",
    verdict: "ส่วนใหญ่ไม่ต้องซื้อ",
    why: "คิวปกติสั้นที่สุด และบัตรเข้าโซนตามเวลาแบบฟรีผ่านแอปทางการก็มีโอกาสยังเหลือมากที่สุดตอนคุณเดินเข้าสวน",
  },
  {
    date: "วันเสาร์หรืออาทิตย์",
    verdict: "ซื้อ",
    why: "ความต้องการวันหยุดสุดสัปดาห์คือสิ่งที่ราคาตามวันสะท้อนอยู่ นี่คือกรณีปกติของ Express Pass และเวอร์ชันที่ถูกกว่าจะหมดก่อน",
  },
  {
    date: "วันหยุดราชการญี่ปุ่นหรือวันหยุดยาว",
    verdict: "ซื้อ และซื้อเร็ว",
    why: "ความต้องการของคนญี่ปุ่นเพิ่มเข้ามาซ้อนกับนักท่องเที่ยวต่างชาติ และจำนวนต่อวันมีจำกัด ในวันแบบนี้เวอร์ชันที่คุณอยากได้คือตัวที่มีโอกาสหมดมากที่สุด",
  },
  {
    date: "ช่วงครบรอบ 25 ปีและช่วงวันหยุดฤดูหนาว",
    verdict: "ซื้อทันทีที่วันของคุณเปิดขาย",
    why: `ปี 2026 เป็นปีครบรอบ 25 ปีของ USJ และห้องข่าวของ USJ เองเปิดขาย Holiday Kids Free Pass เมื่อ 14 กันยายน 2026 เชิญเด็กทั่วประเทศเข้าสวนฟรีในฤดูหนาวนี้ — จึงมีครอบครัวเดินทางมาเที่ยวมากขึ้นในช่วงดังกล่าว ตรวจสอบเมื่อ ${CHECKED_USJ}`,
  },
  {
    date: "ไปเพราะ Super Nintendo World",
    verdict: "ซื้อเวอร์ชันที่รวมบัตรเข้าโซน",
    why: "เป็นวิธีเดียวที่จะได้รอบเข้าโซนไว้ก่อนไปถึง วิธีฟรีก็มี แต่รับสิทธิ์ได้ในสวนวันนั้นตามลำดับก่อนหลัง",
  },
];

const buyRows = [
  {
    where: "USJ WEB Ticket Store (ทางการ)",
    what: "ทุกเวอร์ชันที่ขายสำหรับวันของคุณ ในราคาของวันนั้น",
    opens: "ประมาณ 2 เดือนก่อนวันเข้าสวน",
    change: "ใช้ได้เฉพาะวันที่ระบุไว้ (USJ)",
    note: "วันที่เปิดขายวันยอดนิยมให้เตรียมเจอระบบคิว",
  },
  {
    where: "Lawson Ticket — เว็บไซต์และเครื่อง Loppi",
    what: "ช่องทางทางการอีกช่องที่ USJ ระบุชื่อ",
    opens: "ประมาณ 2 เดือนก่อนวันเข้าสวน",
    change: "ใช้ได้เฉพาะวันที่ระบุไว้ (USJ)",
    note: "ระบุไว้คู่กับ WEB Ticket Store ในประกาศช่วงเวลาจำหน่ายของ USJ วันที่ 21 เมษายน 2025",
  },
  {
    where: "Klook",
    what: "Express Pass เป็นสินค้าแยก หน้าชำระเงินภาษาอังกฤษ จ่ายด้วยบัตรต่างประเทศ และได้อีตั๋ว",
    opens: "ตามวันที่แสดงในหน้าสินค้า",
    change: "ดูเงื่อนไขการยกเลิกในหน้าสินค้า",
    note: "หน้าบัตรเข้าโซนตามเวลาของ USJ เองระบุว่าจองสิทธิ์เข้าโซนล่วงหน้าผ่านบริษัทท่องเที่ยวบางแห่งได้ด้วย",
  },
  {
    where: "GetYourGuide",
    what: "จำหน่าย Express Pass แยกต่างหาก เป็นอีกช่องทางหนึ่งสำหรับตรวจสอบบัตร",
    opens: "ตามวันที่แสดงในหน้าสินค้า",
    change: "ดูเงื่อนไขการยกเลิกในหน้าสินค้า",
    note: "น่าดูเมื่อวันของคุณหมดที่ร้านแรก — จำนวนจัดสรรแยกตามผู้ขายและตามวัน",
  },
  {
    where: "ที่สวนสนุกในวันนั้น",
    what: "ไม่มีขายที่ประตู — USJ ไม่ขายบัตรที่ประตูในวันนั้นแล้ว",
    opens: "—",
    change: "—",
    note: "ซื้อออนไลน์ก่อนไป",
  },
];

const steps = [
  {
    title: "กำหนดวันก่อน แล้วซื้อ Studio Pass",
    desc: "ทุกอย่างในหน้านี้ขึ้นกับวัน USJ ไม่ขายบัตรที่ประตูในวันนั้นแล้ว Studio Pass จึงต้องซื้อออนไลน์ — และมันคือบัตรเข้าสวนที่ Express Pass ไม่ได้รวมไว้",
  },
  {
    title: "ตัดสินใจว่าวันนั้นจำเป็นต้องซื้อ Express Pass หรือไม่",
    desc: "ใช้ตารางซื้อหรือไม่ซื้อด้านบน วันธรรมดาที่คนน้อยมักไม่ต้องใช้ ส่วนเสาร์อาทิตย์ วันหยุดราชการญี่ปุ่น หรือวันครบรอบควรมี",
  },
  {
    title: "ตรวจว่าเวอร์ชันนั้นรวม Super Nintendo World หรือไม่",
    desc: "สิทธิ์เข้าโซนเป็นส่วนที่รวมแยก ไม่ได้มีให้ทุกใบ ถ้า Super Nintendo World คือเหตุผลของการไป ให้ซื้อเวอร์ชันที่ระบุว่ารวม Area Timed Entry Ticket",
  },
  {
    title: "ติดตั้งแอปทางการของ USJ ก่อนเดินทาง",
    desc: `หน้าบัตรเข้าโซนตามเวลาของ USJ เองระบุว่าตั้งแต่ 5 มกราคม 2026 ต้องใช้แอปทางการเพื่อรับ Area Timed Entry Ticket และ Standby Entry Ticket และต้องลงทะเบียนบัตรเข้าสวนในแอปก่อน ตรวจสอบเมื่อ ${CHECKED_USJ}`,
  },
  {
    title: "ไปถึงก่อนสวนเปิด",
    desc: "วันที่คนเยอะ ประตูอาจเปิดก่อนเวลาที่ประกาศ ไปถึงสวนแต่เช้าจะเพิ่มโอกาสได้สิทธิ์เข้าโซนแบบฟรี ถ้าคุณไม่ได้ซื้อเวอร์ชันที่รวมไว้",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "บัตร Universal Studios Japan มีกี่แบบ?",
    a: `บัตรเข้าสวน (Studio Pass) มี 3 แบบหลัก: 1 วัน, 1.5 วัน (วันแรกเข้าได้ตั้งแต่ 15:00 วันที่สองตั้งแต่สวนเปิด) และ 2 วันติดต่อกัน ส่วน Express Pass เป็นบัตรลัดคิวที่ต้องซื้อเพิ่ม มีแบบหลักคือ Express Pass 4 และ Express Pass 7 และบางเวอร์ชันรวมสิทธิ์เข้าโซน Super Nintendo World ทุกแบบราคาตามวันเข้าสวน และ Express Pass ใช้แทนบัตรเข้าสวนไม่ได้ ตรวจสอบบน usj.co.jp เมื่อ ${CHECKED_R07}`,
  },
  {
    q: "ไม่มี Express Pass เล่นได้ไหม?",
    a: `เล่นได้ มี Studio Pass ก็เข้าสวนและต่อคิวปกติเล่นเครื่องเล่นได้ Express Pass แค่ซื้อเพิ่มเพื่อให้คิวสั้นลง วันธรรมดาที่คนน้อยมักซื้อแค่ Studio Pass ก็พอ และยังมีวิธีฟรีอีกสองทาง คือคิว Single Rider (ไม่ได้เปิดตลอดเวลา) และการรับ Area Timed Entry Ticket ของ Super Nintendo World ผ่านแอปทางการในวันนั้นตามลำดับก่อนหลัง ส่วนวันเสาร์อาทิตย์ วันหยุด และช่วงวันหยุดฤดูหนาวที่คิวยาว ควรซื้อเพิ่ม ตรวจสอบบน usj.co.jp เมื่อ ${CHECKED_USJ}`,
  },
  {
    q: "USJ Express Pass กับ Fast Pass คือสิ่งเดียวกันไหม?",
    a: `ในทางปฏิบัติ ใช่ บัตรลดเวลาต่อคิวแบบเสียเงินของยูนิเวอร์แซล สตูดิโอ เจแปน ชื่อว่า Universal Express Pass และ "USJ fast pass" คือชื่อที่นักท่องเที่ยวจำนวนมากใช้ค้นหา หน้าบัตรของ USJ เองไม่มีสินค้าแยกที่ชื่อ Fast Pass ขายหลัก ๆ เป็น Express Pass 4 และ Express Pass 7 ใช้ได้เฉพาะวันที่ระบุ และต้องมี Studio Pass ของวันเดียวกัน ตรวจสอบบน usj.co.jp เมื่อ ${CHECKED_USJ}`,
  },
  {
    q: "บัตร USJ ต้องซื้อล่วงหน้าไหม?",
    a: "ต้อง Universal Studios Japan หยุดขายบัตรวันเดียวกันที่ประตูแล้ว คุณจึงต้องซื้อออนไลน์ก่อนไป การจองผ่านผู้ขายอย่าง Klook ได้หน้าชำระเงินภาษาอังกฤษ รับบัตรต่างประเทศ และส่งตั๋วอิเล็กทรอนิกส์ที่สแกนตอนเข้าสวนได้",
  },
  {
    q: "Express Pass USJ ปี 2026 คุ้มไหม?",
    a: `ในวันที่คนเยอะ คุ้ม ปี 2026 เป็นปีครบรอบ 25 ปีของ USJ — ห้องข่าวของสวนเองลงข่าวครบรอบเมื่อ 14 และ 28 กันยายน 2026 ตรวจสอบเมื่อ ${CHECKED_USJ} — และในวันเสาร์อาทิตย์หรือวันหยุดราชการ Express Pass คือสิ่งที่เปลี่ยนคิวปกติหลายชั่วโมงให้เป็นคิวแยกสั้น ๆ พร้อมสิทธิ์เข้า Super Nintendo World ในเวอร์ชันที่รวมไว้ ส่วนวันธรรมดานอกฤดูที่คนน้อยก็จำเป็นน้อยกว่ามาก: คิวปกติสั้นที่สุด และวิธีเข้าโซนฟรีผ่านแอปก็มีโอกาสเหลือรอบมากที่สุด`,
  },
  {
    q: "Express Pass 4 กับ Express Pass 7 ต่างกันอย่างไร?",
    a: "ตัวเลขคือจำนวนสิทธิ์เครื่องเล่นที่พาสครอบคลุม — สี่หรือเจ็ด USJ อธิบาย Express Pass 4 ว่าเป็นพาสสำหรับเครื่องเล่นที่ห้ามพลาด และ Express Pass 7 คือตัวที่กว้างกว่า รายการเครื่องเล่นจริงกำหนดตามเวอร์ชันและตามวัน และสิทธิ์เข้า Super Nintendo World มีเฉพาะเวอร์ชันที่ระบุไว้ ดังนั้นตรวจรายการที่รวมของวันคุณก่อนซื้อ",
  },
  {
    q: "ใช้ Express Pass USJ โดยไม่มี Studio Pass ได้ไหม?",
    a: `ไม่ได้ หน้า Express Pass ของ USJ เองระบุว่าต้องมี Studio Pass — หรือ Annual Pass — เพื่อเข้าสวน และต้องมีบัตรเข้าสวนแยกต่างหากนอกเหนือจาก Express Pass Express Pass แค่ทำให้คิวสั้นลงเมื่อคุณอยู่ในสวนแล้ว ตรวจสอบเมื่อ ${CHECKED_USJ}`,
  },
  {
    q: "ต้องซื้อ Express Pass ล่วงหน้ากี่วัน?",
    a: `เปิดขายประมาณ 2 เดือนก่อนวันเข้าสวน และถ้าเป็นวันเสาร์อาทิตย์ วันหยุดราชการญี่ปุ่น หรือช่วงวันหยุดฤดูหนาว ควรซื้อทันทีที่เปิดขาย เพราะขายจำนวนจำกัดต่อวันและมักหมดล่วงหน้า ประกาศช่วงเวลาจำหน่ายของ USJ วันที่ 21 เมษายน 2025 ระบุว่าบัตร — Studio Pass, Express และอื่น ๆ — เปิดขายที่ WEB Ticket Store ทางการ และ Lawson Ticket ประมาณสองเดือนล่วงหน้า ช่วง Osaka Expo ขยายเป็นสามเดือนสำหรับวันเข้าสวนถึง 13 ตุลาคม 2025 แล้วจะกลับเป็นประมาณสองเดือน ตรวจสอบเมื่อ ${CHECKED_USJ}`,
  },
  {
    q: "เปลี่ยนวันหรือขอคืนเงิน Express Pass USJ ได้ไหม?",
    a: `ให้ถือว่าเปลี่ยนไม่ได้ หน้า Express Pass ของ USJ เองระบุว่าพาสที่ซื้อล่วงหน้าใช้ได้เฉพาะวันที่ระบุไว้ และถ้าไปถึงเครื่องเล่นที่กำหนดเวลาใช้สิทธิ์ช้า จะไม่มีการคืนเงินและไม่เปลี่ยนเป็นรอบเวลาอื่น ตรวจสอบเมื่อ ${CHECKED_USJ}`,
  },
  {
    q: "เข้า Super Nintendo World อย่างไร?",
    a: `มีสองวิธี และเป็นวิธีที่ USJ ระบุเอง: ล่วงหน้า ด้วย Express Pass เวอร์ชันที่รวม Area Timed Entry Ticket หรือผ่านแอปทางการของ USJ เมื่อเข้าสวนแล้ว หน้าบัตรเข้าโซนตามเวลาของ USJ ยังระบุว่าตั้งแต่ 5 มกราคม 2026 ต้องใช้แอปทางการเพื่อรับ Area Timed Entry Ticket และ Standby Entry Ticket และต้องลงทะเบียนบัตรเข้าสวนในแอปก่อน ตรวจสอบเมื่อ ${CHECKED_USJ} วันที่คนน้อยคุณอาจเดินเข้าไปได้เลย แต่ไม่ควรวางแผนทริปโดยหวังแบบนั้น`,
  },
  {
    q: "Express Pass USJ ราคาเท่าไหร่?",
    a: `USJ ไม่ได้ประกาศราคาคงที่ หน้า Express Pass ของ USJ ระบุว่าประเภทและราคาของ Express Pass ที่ใช้ได้แตกต่างกันไปตามวัน และประกาศเรื่องราคา Studio Pass วันที่ 30 มิถุนายน 2026 ระบุว่า Express Pass ใช้ระบบราคาตามความต้องการมาตั้งแต่ปี 2018 และไม่มีแผนจะเปลี่ยน ราคาของวันนั้นแสดงตอนชำระเงิน จึงไม่มีตัวเลขเงินเยนในหน้านี้ — ตรวจสอบเมื่อ ${CHECKED_USJ}`,
  },
  {
    q: "ไปยูนิเวอร์แซล สตูดิโอ เจแปน ควรพักที่ไหน?",
    a: `พักย่าน Universal City ถ้าอยากไปถึงทางเข้าตอนสวนเปิด ถ้าไม่จำเป็น ให้พักอุเมดะหรือรอบสถานีโอซาก้า ประตูสวนอยู่ห่างจากสถานี Universal City บนสาย JR Yumesaki ประมาณห้านาทีเดิน และสวนอยู่ห่างจากสถานีโอซาก้าประมาณ 20 นาที — ทั้งสองตัวเลขเป็นของ Osaka Convention & Tourism Bureau ตรวจสอบเมื่อ ${CHECKED} หน้าจุดหมายของ JR West เองระบุว่าสถานี Universal-City เป็นสถานีที่ใกล้สวนที่สุด และบรรยายว่าสวนอยู่ “ติดกับ” สถานี ข้อที่ต้องแลกคือส่วนที่เหลือของทริป: อุเมดะและสถานีโอซาก้าอยู่บนเครือข่าย JR หลัก ส่วนโรงแรมย่าน Universal City มีอยู่ไม่กี่แห่ง จึงเป็นห้องที่หมดก่อนในวันที่คนเยอะ`,
  },
  {
    q: "ไป USJ จากสนามบินคันไซหรือสถานีโอซาก้าอย่างไร?",
    a: `สถานีคือ Universal City บนสาย JR Yumesaki (สายซากุระจิมะ) โดยทั่วไปเดินทางไปได้โดยเปลี่ยนรถที่สถานีนิชิคุโจ และ Osaka Convention & Tourism Bureau ระบุว่าสวนอยู่ห่างจากสถานีโอซาก้าประมาณ 20 นาที จากสนามบินคันไซไม่มีรถไฟตรง: HARUKA ของ JR West วิ่งไปเท็นโนจิ โอซาก้า ชินโอซาก้า และเกียวโตโดยไม่ต้องเปลี่ยนรถ — ตั๋วเที่ยวเดียวราคาพิเศษสำหรับผู้ถือพาสปอร์ตต่างชาติที่เข้าประเทศแบบ Temporary Visitor ราคา ¥1,300 ไปเท็นโนจิ และ ¥1,800 ไปโอซาก้าหรือชินโอซาก้า ถึง 31 ตุลาคม 2026 และขึ้นเป็น ¥1,600 และ ¥1,900 ตั้งแต่ 1 พฤศจิกายน 2026 — หรือ Rapi:t ของ Nankai ไปถึงนัมบะในเวลาอย่างน้อย 34 นาที โดยต้องซื้อตั๋วรถด่วนพิเศษเพิ่มจากค่าโดยสาร ผู้ใหญ่ ¥700 ไม่ว่าจะเลือกเส้นทางใด ให้ต่อรถไฟสาย Osaka Loop ไปยังนิชิคุโจ แล้วเปลี่ยนเป็นสาย Yumesaki ตัวเลขทั้งหมดตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ใช้ USJ Express Pass ในวันเที่ยวอย่างไร?",
    a: "แสดงตั๋วบนหน้าจอมือถือพร้อม QR Code ให้เจ้าหน้าที่ตรวจสอบที่ทางเข้า Express Pass บางเครื่องเล่นมีเวลาพิมพ์ไว้บนตั๋ว ที่เหลือเล่นได้ทุกเวลาในช่วงที่สวนสนุกเปิด ถ้ามาสายจะไม่ได้เงินคืนและเปลี่ยนรอบไม่ได้ และทุกคนต้องมีตั๋วของตัวเอง จาก usj.co.jp ตามดัชนีการค้นหา ตรวจสอบเมื่อ 6 พ.ย. 2026",
  },
  {
    q: "มีพาสโอซาก้าหรือคันไซที่ครอบคลุม USJ ไหม?",
    a: `ตัวสวนไม่อยู่ใน Osaka Amazing Pass และไม่มีพาส Osaka Metro ใดครอบคลุมรถไฟ JR ไป Universal City ด้านรถไฟ หน้า Kansai Area Pass ของ JR West เองบรรยาย WEST QR Kansai Mini Pass ว่า “Kyoto, Universal Studios Japan, Osaka, Namba, Kobe and Nara 3-Day Unlimited Rides” ราคาผู้ใหญ่ ¥3,000 เด็ก ¥1,500 ใช้ได้สามวันติดกันบนรถไฟธรรมดา Rapid และ Special Rapid แต่ใช้กับรถด่วนพิเศษใด ๆ รวมถึง HARUKA ไม่ได้ ส่วน WEST QR Kansai Area Pass ครอบคลุม HARUKA โดยนั่งที่นั่งไม่ระบุได้ไม่จำกัด บวกที่นั่งระบุสองครั้ง ราคา ¥2,700 สำหรับหนึ่งวันไปจนถึง ¥6,700 สำหรับสี่วัน ตรวจสอบเมื่อ ${CHECKED} ไม่มีพาสใดรวมบัตรเข้าสวน — บัตรเข้าสวนคือ Studio Pass ที่ต้องซื้อแยกเสมอ`,
  },
];

// The FAQPage markup carries five questions; the visible list keeps all of them.
// 22 Nov 2026 (R07): the five are the Thai landing questions (บัตร … มีกี่แบบ, ราคาเท่าไหร่, ล่วงหน้ากี่วัน).
const FAQ_SCHEMA_QS = new Set([
  "บัตร Universal Studios Japan มีกี่แบบ?",
  "Express Pass USJ ราคาเท่าไหร่?",
  "ต้องซื้อ Express Pass ล่วงหน้ากี่วัน?",
  "ไม่มี Express Pass เล่นได้ไหม?",
  "Express Pass 4 กับ Express Pass 7 ต่างกันอย่างไร?",
]);
const faqSchemaItems = faqItems.filter((item) => FAQ_SCHEMA_QS.has(item.q));

// Klook blocks: the English page's own lists, moved onto Klook's /th/ path with the
// text translated from the English entries.
const expressSameDayPrep: KlookTripPrepItem[] = [
  withKlookLocale(usjExpressSameDayPrep[0], LOCALE, {
    label: "The Park Front Hotel (โรงแรมทางการของ USJ)",
    ctaLabel: "ดู The Park Front Hotel →",
    why: "โรงแรมอย่างเป็นทางการของ USJ ตั้งอยู่ตรงหน้าทางเข้าหลัก — ในวันที่ใช้ Express Pass สิ่งสำคัญคือผ่านประตูหมุนให้เร็ว ห้องพักติดประตูสวนจะหมดก่อนในวันที่คนเยอะ ซึ่งก็คือวันเดียวกับที่ Express Pass ขายหมด",
  }),
  withKlookLocale(usjExpressSameDayPrep[1], LOCALE, {
    label: "Hotel Kintetsu Universal City",
    ctaLabel: "ดู Hotel Kintetsu Universal City →",
    why: "โรงแรมทางการของ USJ อีกแห่ง อยู่ข้างสถานี Universal City สำหรับวันที่ The Park Front Hotel ถูกจองเต็ม",
  }),
  withKlookLocale(usjExpressSameDayPrep[2], LOCALE, {
    label: "รถบัสลีมูซีนสนามบินคันไซ (เที่ยวเดียว)",
    ctaLabel: "ดูรถบัสลีมูซีนสนามบิน →",
    why: "สินค้านี้รวมเส้นทางสนามบินคันไซ ⇄ ยูนิเวอร์แซล สตูดิโอ เจแปน วันที่เดินทางมาถึงจึงไม่ต้องลากกระเป๋าเปลี่ยนรถไฟ",
  }),
  withKlookLocale(usjExpressSameDayPrep[3], LOCALE, {
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM ของ Klook →",
    why: "Express Pass และ Studio Pass เป็นตั๋วอิเล็กทรอนิกส์แบบ QR และสิทธิ์เข้าโซน Super Nintendo World ใช้ผ่านแอปทางการของ USJ — ทั้งหมดต้องใช้อินเทอร์เน็ตในสวน",
  }),
];

const sameDayPrep: KlookTripPrepItem[] = [
  withKlookLocale(usjSameDayPrep[0], LOCALE, {
    label: "โรงแรมใกล้ยูนิเวอร์แซล สตูดิโอ เจแปน (Universal City)",
    ctaLabel: "ดูโรงแรมย่าน Universal City บน Klook →",
    why: "หน้าค้นหาโรงแรมของ Klook เดียวกับที่คู่มือที่พักโอซาก้าใช้ เดินจากสถานี Universal City ไปยังทางเข้าสวนสนุกใช้เวลาประมาณห้านาที ซึ่งเหมาะสำหรับเช้าที่ตั้งใจไปถึงก่อนสวนเปิด",
  }),
  withKlookLocale(usjSameDayPrep[1], LOCALE, {
    label: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    ctaLabel: "ดูพาสโอซาก้า →",
    why: "สำหรับวันเที่ยวโอซาก้าก่อนและหลังวันไปสวนสนุก ไม่ใช่วันไปสวนสนุก: ครอบคลุม Osaka Metro และรถบัสในเมือง บวกสถานที่กว่า 40 แห่ง แต่ไม่รวมยูนิเวอร์แซล สตูดิโอ เจแปน และไม่รวมสาย JR ไป Universal City",
  }),
  withKlookLocale(usjSameDayPrep[2], LOCALE, {
    label: "ตั๋วรถไฟด่วนสนามบิน JR HARUKA",
    ctaLabel: "ดูตั๋ว HARUKA →",
    why: "จากสนามบินคันไซตรงไปเท็นโนจิ โอซาก้า หรือชินโอซาก้า ซึ่งเป็นสถานีที่ทริป USJ เริ่มต้น หน้าสินค้าของ Klook ระบุว่าขายเฉพาะผู้ถือพาสปอร์ตที่ไม่ใช่ญี่ปุ่นและมีตราประทับ Temporary Visitor",
  }),
  withKlookLocale(usjSameDayPrep[3], LOCALE, {
    label: "ทัวร์อาหาร Absolute Osaka",
    ctaLabel: "ดูทัวร์อาหารโอซาก้า →",
    why: "มื้อค่ำของวันที่ไม่ได้ไปสวนสนุก: ทัวร์เดินแบบจอยกรุ๊ป 3 ชั่วโมงที่แยกออกจากถนนหลักโดทงโบริ มีคุชิคัตสึ ทาโกยากิ ร้านอิซากายะที่ซ่อนอยู่ในตรอก และของหวานท้องถิ่น",
  }),
  withKlookLocale(usjSameDayPrep[4], LOCALE, {
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM ของ Klook →",
    why: "USJ ใช้แอปของตัวเองสำหรับบัตรเข้าโซน Super Nintendo World ตามเวลา ซึ่งใช้ในสวนในวันนั้น และ Studio Pass ก็เป็นตั๋วอิเล็กทรอนิกส์ — ทั้งสองอย่างต้องใช้อินเทอร์เน็ตขณะอยู่ในสวนสนุก จึงพึ่งพาแค่ Wi-Fi ของโรงแรมไม่ได้",
  }),
];

// 22 Nov 2026 (R07), as on zh-tw (R04): directly under the answer — USJ-area hotels (6.5%), the Osaka Amazing
// Pass (5%) and the Klook eSIM (20%), the bookings that share the Studio Pass / Express Pass date. Same
// products as usjSameDayPrep[0], [1] and [4]; GA4 placement usj-sameday-answer.
const answerSameDayPrep: KlookTripPrepItem[] = [0, 1, 4].map((i) => sameDayPrep[i]);

const stayAreas: KlookStayArea[] = [
  withKlookLocale(usjStayAreas[0], LOCALE, {
    area: "Universal City",
    why: "ตามตัวเลขของ Osaka Convention & Tourism Bureau เดินจากสถานี Universal City ไปยังทางเข้าสวนสนุกใช้เวลาประมาณห้านาที — ข้อดีของย่านนี้คือเดินไปสวนสนุกได้ในเวลาไม่นาน เหมาะกับวันที่อยากไปถึงทางเข้าก่อนสวนเปิด",
  }),
  withKlookLocale(usjStayAreas[1], LOCALE, {
    area: "อุเมดะ / สถานีโอซาก้า",
    why: "ย่านที่ขึ้นรถไฟสาย JR Yumesaki ได้สะดวก:Bureau ระบุว่าสวนอยู่ห่างจากสถานีโอซาก้าประมาณ 20 นาที และคุณอยู่บนเครือข่าย JR หลัก — สายเกียวโตและโกเบ สาย Loop และชินคันเซ็นที่ชินโอซาก้า — ตลอดทริป",
  }),
  withKlookLocale(usjStayAreas[2], LOCALE, {
    area: "เท็นโนจิ",
    why: "ฐานฝั่ง JR ที่ถูกกว่า และเป็นสถานีแรกในเมืองของ HARUKA จากสนามบินคันไซ สาย Loop พาคุณไปนิชิคุโจเพื่อเปลี่ยนสาย Yumesaki โดยไม่ต้องผ่านใจกลางเมือง",
  }),
  withKlookLocale(usjStayAreas[3], LOCALE, {
    area: "นัมบะ",
    why: "ตัวเลือกถ้าสวนเป็นแค่หนึ่งวันของทริปโอซาก้าที่กว้างกว่า: เดินไปโดทงโบริและตลาดคุโรมงได้ และเป็นสถานีต้นทางของ Nankai — Nankai ระบุว่า Rapi:t ใช้เวลาอย่างน้อย 34 นาทีไปสนามบินคันไซในวันบินกลับ",
  }),
];

const tripPrep: KlookTripPrepItem[] = [
  withKlookLocale(usjTripPrep[0], LOCALE, {
    label: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    ctaLabel: "ดูพาสโอซาก้า →",
    why: "อ่านข้อนี้ให้ดี: พาสนี้ไม่ครอบคลุมยูนิเวอร์แซล สตูดิโอ เจแปน และไม่ครอบคลุมรถไฟ JR ไป Universal City ด้วย สิ่งที่ครอบคลุมคือทุกวันอื่นของทริปโอซาก้า — Osaka Metro และรถบัสในเมืองไม่จำกัด บวกสถานที่กว่า 40 แห่ง",
  }),
  withKlookLocale(usjTripPrep[1], LOCALE, {
    label: "ทัวร์วันเดียวเกียวโตและนารา (วัดคิโยมิซุ ศาลเจ้าฟูชิมิอินาริ และสวนนารา)",
    ctaLabel: "ดูทัวร์เกียวโต–นารา →",
    why: "วันที่สองที่ชัดเจนที่สุดสำหรับคนที่บินมาโอซาก้าเพื่อสวนสนุก: วัดคิโยมิซุ ศาลเจ้าฟูชิมิอินาริ และสวนนาราในการจองครั้งเดียว ออกเดินทางจากโอซาก้า ไม่ต้องวางเส้นทางเอง",
  }),
  withKlookLocale(usjTripPrep[2], LOCALE, {
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM ของ Klook →",
    why: "USJ ขาย Studio Pass แบบระบุวันเป็นตั๋วอิเล็กทรอนิกส์ และใช้แอปของตัวเองสำหรับบัตรเข้าโซน Super Nintendo World ตามเวลา ซึ่งใช้ในสวนในวันนั้น — ควรเตรียมอินเทอร์เน็ตมือถือให้พร้อม เพราะต้องใช้แอประหว่างอยู่ในสวน",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "บัตร USJ และ Express Pass" }];

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

// P01 (21 Nov 2026, task-jtk-20261121-P01): as on the English page, the 5% / 6.5% blocks under the
// Express Pass block and before the FAQ. Same products and order as lib/klook-links.ts.
const highRateTopPrep: KlookTripPrepItem[] = [
  withKlookLocale(usjHighRateTopPrep[0], LOCALE, {
    label: "ทัวร์เกียวโต–นาระ 1 วัน (วัดคิโยมิซุ ศาลเจ้าฟูชิมิอินาริ สวนนาระ)",
    ctaLabel: "ดูทัวร์เกียวโต–นาระ →",
    why: "แผนเที่ยววันถัดไปที่นักท่องเที่ยวที่มา USJ มักเลือกออกจากโอซาก้าแล้วเที่ยววัดคิโยมิซุ ศาลเจ้าฟูชิมิอินาริ และสวนนาระในวันเดียว",
  }),
  withKlookLocale(usjHighRateTopPrep[1], LOCALE, {
    label: "บริการส่งกระเป๋า สนามบินคันไซ ⇄ โรงแรมในโอซาก้า (LuggAgent)",
    ctaLabel: "ดูบริการส่งกระเป๋า →",
    why: "บริการส่งกระเป๋าระหว่างสนามบินคันไซกับโรงแรมในโอซาก้า วันที่มาถึงหรือวันกลับจึงเที่ยวได้โดยไม่ต้องลากกระเป๋า ก่อนจองโปรดตรวจสอบว่าโรงแรมอยู่ในพื้นที่ให้บริการ และเวลาสุดท้ายที่รับฝากกระเป๋า",
  }),
  withKlookLocale(usjHighRateTopPrep[2], LOCALE, {
    label: "JR-West Kansai Rail Pass (1–4 วัน)",
    ctaLabel: "ดู JR Kansai Rail Pass →",
    why: "ตามรายละเอียดสินค้าของ Klook สามารถใช้รถไฟธรรมดาและรถไฟเร็วของ JR West ในพื้นที่โอซาก้า เกียวโต โคเบ และนาระได้ไม่จำกัดเที่ยว รวมถึงรถไฟฮารุกะจากสนามบินคันไซ เหมาะกับวันที่ไปเกียวโตหรือนาระเอง",
  }),
];
const highRateFaqPrep: KlookTripPrepItem[] = [
  withKlookLocale(osakaSightsHighRatePrep[0], LOCALE, {
    label: "ตั๋วเข้าชมหอปราสาทโอซาก้า",
    ctaLabel: "ดูตั๋วปราสาทโอซาก้า →",
    why: "ตั๋วเข้าชมหอปราสาท 8 ชั้นและพิพิธภัณฑ์กำแพงหินโทโยโทมิ สแกนที่ทางเข้า ถ้ามี Osaka Amazing Pass อยู่แล้วไม่ต้องซื้อเพิ่ม",
  }),
  withKlookLocale(osakaSightsHighRatePrep[1], LOCALE, {
    label: "ตั๋วจุดชมวิว Kuchu Teien อุเมดะสกายบิลดิ้ง",
    ctaLabel: "ดูตั๋วอุเมดะสกาย →",
    why: "จุดชมวิวบนดาดฟ้าสูง 173 เมตรที่เชื่อมยอดตึกแฝด เดินจากสถานีโอซาก้าได้ เหมาะแวะช่วงเย็น Osaka Amazing Pass ก็ครอบคลุมที่นี่",
  }),
  withKlookLocale(osakaSightsHighRatePrep[2], LOCALE, {
    label: "ทัวร์ 1 วัน ปราสาทโอซาก้า อุเมดะสกายบิลดิ้ง และล่องเรือโทนโบริ",
    ctaLabel: "ดูทัวร์ 1 วัน →",
    why: "เที่ยวปราสาทโอซาก้า จุดชมวิวอุเมดะ และล่องเรือโทนโบริในย่านโดทงโบริวันเดียวพร้อมไกด์ ไม่ต้องวางเส้นทางเอง",
  }),
];

export default function ThUsjTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqSchemaItems) }} />
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
            Express Pass 4 และ Express Pass 7 แต่ละแบบใช้กับเครื่องเล่นใดได้บ้าง ทำไมราคาจึงเปลี่ยนตามวันที่เข้าชม และวันไหนที่
            ซื้อแค่ Studio Pass ก็เพียงพอ
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "Express Pass 4 vs 7", "Super Nintendo World", "ซื้อหรือไม่ซื้อ"].map((t) => (
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
            <strong>บัตร Universal Studios Japan (USJ)</strong> มี 2 ส่วน: <strong>บัตรเข้าสวน Studio Pass</strong> แบบ 1 วัน 1.5 วัน และ 2 วัน
            และ <strong>Express Pass</strong> ซึ่งเป็นบัตรลัดคิวที่ต้องซื้อเพิ่ม แบบหลักคือ Express Pass 4 (ลัดคิว 4 เครื่องเล่น) และ Express Pass 7
            (7 เครื่องเล่น) ราคาของบัตรทั้งสองประเภทเปลี่ยนตามวันที่เข้าสวนสนุก USJ ไม่มีราคาคงที่ และราคาของวันนั้นแสดงตอนชำระเงิน
          </p>
          <p className={styles.bodyText}>
            Express Pass ไม่ใช่บัตรเข้าสวน ทุกคนต้องมี Studio Pass ของวันเดียวกันด้วย บัตรทั้งสองประเภทเปิดขายประมาณ 2 เดือนก่อนวันเข้าสวน
            Express Pass มีจำนวนจำกัดต่อวันและมักขายหมดล่วงหน้า — วันเสาร์อาทิตย์ วันหยุดราชการญี่ปุ่น และช่วงวันหยุดฤดูหนาวควรซื้อทันทีที่เปิดขาย
            ส่วนวันธรรมดาที่คนน้อย ซื้อแค่ Studio Pass ก็มักเพียงพอ ตรวจสอบบน usj.co.jp เมื่อ {CHECKED_USJ} และ {CHECKED_R07}
          </p>
        </section>

        {/* 22 Nov 2026 (R07): "บัตร universal studio japan มีกี่แบบ" asked outright, with the two type tables. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ประเภทบัตร</span>
          <h2 className={styles.sectionTitle}>บัตร Universal Studios Japan มีกี่แบบ?</h2>
          <p className={styles.bodyText}>
            บัตรเข้าสวนมี 3 แบบ (1 วัน 1.5 วัน 2 วัน) และ Express Pass มีแบบหลัก 2 แบบ (4 และ 7) บวกเวอร์ชันพิเศษที่ขายเป็นช่วง ๆ
            เลือกบัตรเข้าสวนตามจำนวนวัน แล้วค่อยตัดสินว่าจะเพิ่ม Express Pass หรือไม่ตามวันที่ไป
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["บัตรเข้าสวน", "ใช้ได้อย่างไร", "ราคา"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {admissionRows.map((row, i) => (
                    <tr key={row.ticket} style={i === 0 ? { fontWeight: 600 } : undefined}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: 2026-11-22 —{" "}
            <a href={USJ_MULTIDAY_URL} target="_blank" rel="noopener noreferrer">หน้าบัตรหลายวันทางการของ USJ</a>{" "}
            (เวลาเข้าสวนของบัตร 1.5 วัน) และประกาศราคา Studio Pass วันที่ 30 มิถุนายน 2026 (ราคาตามวัน) ตารางนี้ไม่มีตัวเลขเงินเยน
            เพราะ USJ กำหนดราคาตามวัน
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ประเภท Express Pass", "เครื่องเล่นที่รวม", "Super Nintendo World", "ซื้อที่ไหน"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expressTypeRows.map((row, i) => (
                    <tr key={row.type} style={i === 0 ? { fontWeight: 600 } : undefined}>
                      <td className={styles.tdProvider}>{row.type}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: 2026-11-22 —{" "}
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">หน้า Universal Express Pass ทางการของ USJ</a>{" "}
            (ประเภทและราคาแตกต่างตามวัน ต้องมีบัตรเข้าสวนแยก) ช่องทางและช่วงเวลาขายจากประกาศช่วงเวลาจำหน่ายของ USJ วันที่ 21 เมษายน 2025
            รายชื่อเครื่องเล่นของแต่ละเวอร์ชันเปลี่ยนตามช่วงเวลา จึงควรดูรายการที่รวมของวันคุณในหน้าชำระเงิน
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={thUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู Studio Pass USJ บน Klook →
            </KlookLink>
          </div>
          {/* A32 (27 Nov 2026): Klook pays 0% on the Express Pass, so it is a text link here, not a main button. */}
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.88rem" }}>
            Express Pass เป็นของเสริม ไม่ใช่บัตรเข้าสวน:{" "}
            <KlookLink href={thUsjExpressPass.url} target="_blank" rel={KLOOK_REL} style={linkStyle}>
              ดูวันที่ของ Express Pass บน Klook
            </KlookLink>
          </p>
        </section>

        {/* 22 Nov 2026 (R07), as on zh-tw (R04): the bookings that share the park date, right under the answer:
            hotels 6.5%, Osaka Amazing Pass 5%, Klook eSIM 20%. GA4 placement usj-sameday-answer. */}
        <div data-placement="usj-sameday-answer">
          <KlookTripPrep
            label="จองในวันเดียวกัน"
            heading="เมื่อกำหนดวันเข้า USJ ได้แล้ว ควรจองอะไรเพิ่มบ้าง"
            intro="เมื่อได้วันของ Studio Pass และ Express Pass แล้ว ควรจองโรงแรมใกล้ USJ พาสโอซาก้าสำหรับวันก่อนและหลังไปสวน และอินเทอร์เน็ตสำหรับแอปและตั๋วอิเล็กทรอนิกส์ไปพร้อมกัน ในวันที่คนเยอะ โรงแรมย่าน Universal City มักถูกจองเต็มเร็วพอ ๆ กับที่ Express Pass ขายหมด"
            items={answerSameDayPrep}
            headingLevel={3}
          />
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ทุกคนต้องมี</p>
                <p className={styles.verdictStatValue}>Studio Pass (ออนไลน์)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เพิ่ม Express Pass ถ้า</p>
                <p className={styles.verdictStatValue}>วันเสาร์–อาทิตย์ / วันหยุด / ช่วงเฉลิมฉลองครบรอบ 25 ปี</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ราคา</p>
                <p className={styles.verdictStatValue}>เปลี่ยนตามวัน — ไม่มีราคาคงที่</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เปิดขาย</p>
                <p className={styles.verdictStatValue}>ประมาณ 2 เดือนล่วงหน้า จำกัดต่อวัน</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ซื้อ Studio Pass เพื่อเข้าสวน แล้วตัดสินเรื่อง Express Pass ตามวันของคุณ
              Express Pass 7 ถ้าเป็นวันเดียวที่คนเยอะและอยากเล่นเครื่องเล่นหลัก Express Pass 4 ถ้าวันนั้นคนน้อยกว่า
              หรืออยากเล่นแค่ไม่กี่อย่างที่เด่นที่สุด และเวอร์ชันที่รวมสิทธิ์เข้าโซน ถ้า Super Nintendo World
              คือจุดประสงค์ของทริป
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={thUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Studio Pass USJ →
              </KlookLink>
            </div>
          </div>
        </div>

        <BookingEsimCard />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Express Pass</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              Express Pass เป็นตัวเสริม ไม่ใช่บัตรเข้าสวน — ต้องมี Studio Pass ของวันเดียวกัน และจำนวนต่อวันมี
              จำกัด ตัดสินใจตามวันของคุณ โดยใช้หัวข้อด้านล่าง
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={thUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Express Pass USJ →
              </KlookLink>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} label="เทียบ Express Pass บน GetYourGuide →" />
            </div>
          </div>
        </div>

        {/* 14 Nov 2026 (R01), as on the English page: directly under the Express Pass box,
            the bookings that share its date. */}
        <KlookTripPrep
          label="จองในวันเดียวกัน"
          heading="สิ่งที่ควรจองสำหรับวันเดียวกับ Express Pass"
          intro="Express Pass กำหนดวันไปสวนของคุณ ในวันที่คนเยอะซึ่ง Express Pass ขายหมด โรงแรมทางการติดประตูสวนก็เต็มด้วย — จึงควรจองห้องพัก การเดินทางจากสนามบินคันไซ และเตรียมอินเทอร์เน็ตสำหรับแอปของสวนไปพร้อมกัน"
          items={expressSameDayPrep}
        />

        {/* 21 Nov 2026 (P01): 5% / 6.5% for the days either side of the park, under the 0% Express Pass. GA4 placement usj-highrate-top. */}
        <div data-placement="usj-highrate-top">
          <KlookTripPrep
            label="วันก่อนและหลังเข้าสวน"
            heading="สิ่งที่ควรจองไว้สำหรับวันก่อนและหลังไป USJ"
            intro="เมื่อ Express Pass กำหนดวันเข้าสวนแล้ว วันอื่นในโอซาก้าก็จองไปพร้อมกันได้ ได้แก่ ทัวร์เกียวโต–นาระ 1 วัน บริการส่งกระเป๋าระหว่างสนามบินกับโรงแรม และ JR Kansai Rail Pass"
            items={highRateTopPrep}
            adPlacement="usj-highrate-top"
            headingLevel={3}
          />
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เกี่ยวกับ Express Pass</span>
          <h2 className={styles.sectionTitle}>Express Pass ของยูนิเวอร์แซล สตูดิโอ เจแปน คืออะไร?</h2>
          <p className={styles.bodyText}>
            เป็นตัวเสริมแบบระบุวัน ที่ให้คุณใช้ช่อง Express Pass ที่สั้นกว่าในเครื่องเล่นชุดที่กำหนด แทนคิวปกติ
            มัน<strong>ไม่ใช่</strong>บัตรเข้าสวน: หน้า Express Pass ของ USJ เองระบุว่าต้องมีบัตรเข้าสวนแยกต่างหาก
            ดังนั้นต้องมี Studio Pass หรือ Annual Pass ที่ครอบคลุมวันเดียวกัน ตรวจสอบเมื่อ {CHECKED_USJ}
          </p>
          <p className={styles.bodyText}>
            มีอีกสองเรื่องที่สำคัญก่อนเทียบเวอร์ชัน เครื่องเล่นในพาสบางรายการระบุเวลาและบางรายการไม่ระบุ — สำหรับ
            รายการที่ไม่ระบุ USJ บอกว่าใช้ได้ทุกเวลาในช่วงที่สวนเปิด — และคุณแสดง QR Code ที่ทางเข้า Express Pass
            ของเครื่องเล่น อีกเรื่องคือพาสครอบคลุมเฉพาะเครื่องเล่นที่ระบุไว้ในพาสเท่านั้น นี่คือเหตุผลที่การเลือก
            เวอร์ชันสำคัญกว่าตัวเลขบนหน้าพาส
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["บัตร", "คืออะไร", "การตั้งราคา"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            หลักเกณฑ์การตั้งราคาของ USJ ตรวจสอบบน usj.co.jp เมื่อ {CHECKED_USJ} ตารางนี้ไม่มีตัวเลขเงินเยน
            เพราะ USJ ไม่ได้ประกาศราคาคงที่ — ดูหัวข้อราคาด้านล่าง
          </p>
        </section>

        {/* 14 Nov 2026 (R01), as on the English page: the two questions the search terms ask outright. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>บัตรเข้าสวน</span>
          <h2 className={styles.sectionTitle}>มี Express Pass แล้วต้องมี Studio Pass ด้วยไหม?</h2>
          <p className={styles.bodyText}>
            ต้องมี หน้า Express Pass ของ USJ เองระบุว่าต้องมีบัตรเข้าสวนแยกต่างหาก ทุกคนจึงต้องมี Studio Pass
            (หรือ Annual Pass) ที่ใช้ได้ในวันเดียวกับ Express Pass — Express Pass แค่ทำให้คิวสั้นลงเมื่อคุณอยู่ในสวนแล้ว
            ตรวจสอบเมื่อ {CHECKED_USJ}
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={thUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Studio Pass USJ →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fast pass</span>
          <h2 className={styles.sectionTitle}>Express Pass กับ Fast Pass ต่างกันอย่างไร?</h2>
          <p className={styles.bodyText}>
            สำหรับ USJ ทั้งสองคำหมายถึงบัตรประเภทเดียวกัน: บัตรลดเวลาต่อคิวแบบเสียเงินของ USJ ชื่อว่า{" "}
            <strong>Universal Express Pass</strong> และ &ldquo;USJ fast pass&rdquo; เป็นแค่ชื่อที่นักท่องเที่ยวจำนวนมากใช้ค้นหา
            — หน้าบัตรของ USJ เองไม่มีสินค้าแยกที่ชื่อ Fast Pass ส่วนสองวิธีฟรีที่ช่วยลดเวลาในวันเที่ยว USJ เป็นอีกเรื่องหนึ่ง:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Single Rider:</strong> คิวแยกที่นั่งเติมที่ว่างแยกจากกลุ่มของคุณ ไม่ได้เปิดตลอดเวลา</li>
            <li><strong>Area Timed Entry Ticket (แอปทางการ):</strong> เวลาเข้าโซน Super Nintendo World ที่รับได้ในสวนในวันนั้น — ไม่ได้ทำให้คิวเครื่องเล่นสั้นลง</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            จากหน้า Express Pass, FAQ และบัตรเข้าโซนตามเวลาของ USJ ตรวจสอบเมื่อ {CHECKED_USJ} และ {USE_CHECKED}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>Express Pass ราคาเท่าไหร่?</h2>
          <p className={styles.bodyText}>
            Express Pass ของยูนิเวอร์แซล สตูดิโอ เจแปน ไม่มีราคาคงที่สำหรับปี 2026: USJ กำหนดราคาตามวันเข้าสวนและ
            ตามประเภท และแสดงราคาของวันนั้นตอนชำระเงิน ไม่มีคำตอบเดียว และนั่นคือจุดยืนของ USJ เอง ไม่ใช่การเลี่ยงตอบ: หน้า Express Pass ระบุว่าประเภทและราคา
            ของ Express Pass ที่ใช้ได้แตกต่างกันไปตามวัน และประกาศเรื่องราคา Studio Pass วันที่ 30 มิถุนายน 2026
            ระบุว่า Express Pass ใช้ระบบราคาตามความต้องการมาตั้งแต่ปี 2018 และไม่มีแผนจะเปลี่ยน สิ่งที่วางแผนได้
            คือกฎ ตารางนี้จึงแสดงกฎเหล่านั้น
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["เรื่อง", "สิ่งที่ USJ ระบุ", `แหล่งที่มา (ตรวจสอบ ${CHECKED_USJ})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.usj}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: 2026-11-22 —{" "}
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">หน้า Universal Express Pass ทางการของ USJ</a>{" "}
            ทำไมไม่ระบุช่วงราคา: ตัวเลข &ldquo;เริ่มต้น&rdquo; ในหน้ารายการบัตรต่าง ๆ ของ usj.co.jp ไม่ตรงกัน
            และรายการของ WEB Ticket Store ระบุว่าราคาแตกต่างตามวันเข้าสวน แทนที่จะใส่ตัวเลขที่อาจไม่ตรงกับวันของคุณ
            คู่มือนี้แสดงหลักเกณฑ์การตั้งราคาของ USJ และให้คุณดูราคาของวันนั้นที่หน้าชำระเงินเอง
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวอร์ชันไหน</span>
          <h2 className={styles.sectionTitle}>ควรซื้อ USJ Express Pass แบบไหน (4 หรือ 7)?</h2>
          <p className={styles.bodyText}>
            Express Pass 7 สำหรับวันที่คนเยอะและมาครั้งแรก Express Pass 4 สำหรับวันที่คนน้อยกว่า วันที่มีเวลาน้อย
            หรือมาซ้ำและอยากเล่นแค่ไม่กี่อย่างที่เด่นที่สุด ตัวเลขคือจำนวนสิทธิ์เครื่องเล่นที่พาสครอบคลุม ส่วนรายการ
            เครื่องเล่นกำหนดตามเวอร์ชันและตามวัน — จึงควรอ่านรายการที่รวมของวันคุณ มากกว่าดูตัวเลขในชื่อบัตร
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ประเภท Express Pass", "ครอบคลุมอะไร", "สิทธิ์เข้า Super Nintendo World", "ราคาทางการ", "เหมาะกับ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variantRows.map((row, i) => (
                    <tr key={row.pass} style={i === 0 ? { fontWeight: 600 } : undefined}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: 2026-11-22 —{" "}
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">หน้า Universal Express Pass ทางการของ USJ</a>{" "}
            ชื่อเวอร์ชันและกฎสิทธิ์เข้าโซนตรวจสอบบน usj.co.jp เมื่อ {CHECKED_USJ} รายการ Express Pass ทางการของ USJ
            ซึ่งตรวจสอบอีกครั้งเมื่อ {CHECKED_TODAY} ยังมี Express Pass Premium และ Express Pass 4 ชุดตามธีมหลายแบบ
            แต่ละแบบขายสำหรับช่วงวันเข้าสวนที่กำหนด เวอร์ชันไหนมีในวันไหนเป็นเรื่องเฉพาะของแต่ละวัน
            แถวด้านบนจึงอธิบายรูปแบบ ไม่ใช่รายการสินค้าตายตัว
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={thUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูวันที่ของ Express Pass บน Klook →
            </KlookLink>
            <KlookLink href={klookFor(parkFrontHotelUsjKlook.url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              The Park Front Hotel (โรงแรมทางการของ USJ) →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ไม่ซื้อ Express Pass</span>
          <h2 className={styles.sectionTitle}>ไม่มี Express Pass เล่นได้ไหม?</h2>
          <p className={styles.bodyText}>
            เล่นได้ มี Studio Pass ก็เข้าสวนและต่อคิวปกติเล่นเครื่องเล่นได้ Express Pass แค่ซื้อเพิ่มเพื่อให้คิวสั้นลง
            วันธรรมดาที่คนน้อยมักซื้อแค่ Studio Pass ก็พอ ส่วนวันเสาร์อาทิตย์ วันหยุด และช่วงวันหยุดฤดูหนาวที่คิวยาว จึงควรซื้อเพิ่ม
          </p>
          <p className={styles.bodyText}>
            ถ้าไม่ซื้อ ยังมีวิธีฟรีสองทาง: คิว Single Rider (นั่งแยกจากกลุ่ม ไม่ได้เปิดตลอดเวลา) และการรับ Area Timed Entry Ticket ของ
            Super Nintendo World ผ่านแอปทางการของ USJ ในวันนั้นตามลำดับก่อนหลัง ตรวจสอบบน usj.co.jp เมื่อ {CHECKED_USJ}
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={thUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Studio Pass USJ →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ซื้อหรือไม่ซื้อ</span>
          <h2 className={styles.sectionTitle}>USJ Express Pass คุ้มไหม?</h2>
          <p className={styles.bodyText}>
            ในวันเสาร์อาทิตย์ วันหยุดราชการญี่ปุ่น หรือช่วงวันหยุดฤดูหนาว คุ้ม ส่วนวันธรรมดาที่คนน้อย ส่วนใหญ่ไม่คุ้ม
            แทบทั้งหมดขึ้นกับวัน ไม่ใช่ขึ้นกับตัวคุณ วันธรรมดาที่คนน้อย ซื้อแค่ Studio Pass ก็มักเพียงพอ ส่วนเสาร์อาทิตย์
            วันหยุดราชการญี่ปุ่น หรือวันในช่วงครบรอบ 25 ปี Express Pass คือความต่างระหว่างได้เล่นเครื่องเล่นหลัก
            กับได้แค่ต่อคิว
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["วันที่คุณไป", "Express Pass?", "เหตุผล"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {needRows.map((row) => (
                    <tr key={row.date}>
                      <td className={styles.tdProvider}>{row.date}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: 2026-10-27 —{" "}
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">หน้า Universal Express Pass ทางการของ USJ</a>{" "}
            (จำนวนจำกัดต่อวันและการขายหมด) และห้องข่าวของ USJ (ช่วงครบรอบ 25 ปี, Holiday Kids Free Pass ตรวจสอบเมื่อ{" "}
            {CHECKED_USJ}) USJ ไม่ได้ประกาศการคาดการณ์จำนวนคนรายวัน แถวในตารางจึงแบ่งตามประเภทของวัน ไม่ใช่รายวัน
          </p>

          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={thUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู Express Pass บน Klook →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} label="เทียบ Express Pass บน GetYourGuide →" />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            และเมื่อกำหนดวันแล้ว มีสามการจองที่ตามมา — ห้องพักในโรงแรมใกล้ทางเข้าสวนสนุก การเดินทางจากสนามบินคันไซ
            และอินเทอร์เน็ตที่ต้องใช้กับแอปของสวนในวันนั้น:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={klookFor(usjStayAreas[0].url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              โรงแรมย่าน Universal City บน Klook →
            </KlookLink>
            <KlookLink href={klookFor(jrHarukaUrl, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูตั๋ว HARUKA บน Klook →
            </KlookLink>
            <KlookLink href={klookFor(jrKansaiMiniPass.url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู Kansai Mini Pass บน Klook →
            </KlookLink>
            <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูตัวเลือก eSIM ของ Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ขายหมด</span>
          <h2 className={styles.sectionTitle}>ต้องซื้อ Express Pass ล่วงหน้ากี่วัน?</h2>
          <p className={styles.bodyText}>
            <strong>เปิดขายประมาณ 2 เดือนก่อนวันเข้าสวน วันเสาร์อาทิตย์ วันหยุดราชการญี่ปุ่น และช่วงวันหยุดฤดูหนาวให้ซื้อทันทีที่เปิดขาย</strong>{" "}
            หน้าของ USJ เองระบุว่าแต่ละวันมีจำนวนจำกัดและมักขายหมดล่วงหน้า
          </p>
          <p className={styles.bodyText}>
            เมื่อจำนวนของวันนั้นหมด — หน้าของ USJ เองระบุว่าแต่ละวันมีจำนวนจำกัดและมักขายหมดล่วงหน้า จึงไม่มีช่วงเวลาที่รับประกันว่าบัตรจะยังเหลือ ยิ่งจองเร็วยิ่งดี
            ช่วงเวลาที่คุณซื้อได้ยาวประมาณสองเดือน ซึ่งเป็นเรื่องที่มีประโยชน์
            ที่สุดที่ควรรู้
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["คำถาม", "สิ่งที่ USJ ประกาศ", `แหล่งที่มา (ตรวจสอบ ${CHECKED_USJ})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {windowRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            ในทางปฏิบัติ นั่นทำให้ Express Pass เป็นสิ่งแรกที่ควรจองต่อจากตั๋วเครื่องบินและห้องพัก ไม่ใช่สิ่งสุดท้าย
            และทำให้ผู้ขายรายที่สองเป็นสิ่งที่ควรดูจริง ๆ ไม่ใช่แค่มีไว้ก็ดี: จำนวนจัดสรรแยกตามผู้ขายและตามวัน
            วันที่หมดในเว็บหนึ่งจึงไม่ได้หมดทุกที่เสมอไป
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>วิธีซื้อ</span>
          <h2 className={styles.sectionTitle}>ซื้อ Express Pass ยูนิเวอร์แซล สตูดิโอ เจแปน อย่างไร?</h2>
          <p className={styles.bodyText}>
            ซื้อออนไลน์โดยเลือกวันที่เข้าชม จาก USJ โดยตรงหรือจากตัวแทนจำหน่าย ประกาศช่วงเวลาจำหน่ายของ USJ ระบุชื่อ
            WEB Ticket Store ทางการ และ Lawson Ticket เป็นช่องทางขาย และกำหนดช่วงเวลาไว้ประมาณสองเดือนก่อนวันเข้าสวน
            ส่วนตัวแทนจำหน่ายขายสินค้าแบบระบุวันตัวเดียวกันพร้อมหน้าชำระเงินภาษาอังกฤษ
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ซื้อที่ไหน", "ได้อะไร", "เปิดขายตั้งแต่", "เปลี่ยนวัน / คืนเงิน", "ควรรู้"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.opens}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: 2026-10-27 —{" "}
            <a href="https://www.usj.co.jp/company/company_e/news/2025/0421/" target="_blank" rel="noopener noreferrer">ประกาศช่วงเวลาจำหน่ายของ USJ</a>{" "}
            และ{" "}
            <a href={USJ_EXPRESS_URL} target="_blank" rel="noopener noreferrer">หน้า Express Pass ของ USJ</a>{" "}
            ช่องทางและช่วงเวลาจากประกาศช่วงเวลาจำหน่ายของ USJ วันที่ 21 เมษายน 2025 ส่วนเส้นทางผ่านบริษัทท่องเที่ยวเข้า Super Nintendo World
            จากหน้าบัตรเข้าโซนตามเวลาของ USJ ทั้งสองตรวจสอบเมื่อ {CHECKED_USJ} ไม่ว่าจะซื้อจากผู้ขายไหน พาสเป็นแบบระบุวันและการเปลี่ยนหรือคืนเงินมีข้อจำกัด — ดูข้อเรื่องการยกเลิกใน FAQ ด้านล่าง
            ก่อนตัดสินใจเลือกวัน
          </p>
          <div className={styles.stepsList} style={{ marginTop: "1.5rem" }}>
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ในวันเที่ยว</span>
          <h2 className={styles.sectionTitle}>ใช้ Express Pass ที่ USJ อย่างไร?</h2>
          <ul className={styles.bodyList}>
            <li><strong>เครื่องเล่นที่กำหนดเวลาใช้สิทธิ์:</strong> บางเครื่องเล่นบนพาสมีเวลาพิมพ์ไว้บนตั๋ว ต้องไปตามเวลานั้น ถ้ามาสายจะไม่ได้เงินคืนและเปลี่ยนรอบไม่ได้</li>
            <li><strong>เครื่องเล่นที่ไม่กำหนดเวลาใช้สิทธิ์:</strong> ที่เหลือเล่นได้ทุกเวลาในช่วงที่สวนสนุกเปิด</li>
            <li><strong>ที่เครื่องเล่น:</strong> แสดงตั๋วบนหน้าจอมือถือพร้อม QR Code ให้เจ้าหน้าที่ตรวจสอบที่ทางเข้า Express Pass</li>
            <li><strong>ใช้สิทธิ์ได้หนึ่งครั้งต่อหนึ่งเครื่องเล่น:</strong> ถ้าในบรรทัดเดียวมีหลายเครื่องเล่น ใช้ได้กับเครื่องเล่นเดียวเท่านั้น</li>
            <li><strong>ทุกคน:</strong> ตั๋วเป็นแบบรายบุคคล ทุกคนในกลุ่มต้องมีของตัวเอง</li>
            <li><strong>Single Rider:</strong> เป็นระบบแยกจาก Express Pass สำหรับผู้ที่ยอมนั่งแยกจากกลุ่ม เพื่อเติมที่นั่งว่าง บางวันและบางเวลาใช้ไม่ได้ ควรถามทีมงานที่เครื่องเล่น</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            จากหน้า Express Pass และ FAQ ของ USJ ตามดัชนีการค้นหา ตรวจสอบเมื่อ 6 พ.ย. 2026 เวลาอาจเปลี่ยนได้ จึงควรดูเวลาบนตั๋วของคุณ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Super Nintendo World</span>
          <h2 className={styles.sectionTitle}>Express Pass รวม Super Nintendo World ไหม?</h2>
          <p className={styles.bodyText}>
            รวมเฉพาะเวอร์ชันที่ระบุไว้ สิทธิ์เข้าโซนเป็นส่วนที่รวมแยก ไม่ใช่สิ่งที่ Express Pass ทุกใบมี — หน้าบัตร
            เข้าโซนตามเวลาของ USJ เองอธิบายสองเส้นทางเข้าโซน: ล่วงหน้า ด้วย Universal Express Pass บางแบบหรือผ่าน
            บริษัทท่องเที่ยวบางแห่ง หรือผ่านแอปทางการของ USJ เมื่อเข้าสวนแล้ว
          </p>
          <p className={styles.bodyText}>
            เส้นทางผ่านแอปคือแบบฟรี และเป็นเส้นทางที่เข้มขึ้น USJ ระบุว่าตั้งแต่ 5 มกราคม 2026 ต้องใช้แอปทางการเพื่อ
            รับ Area Timed Entry Ticket และ Standby Entry Ticket: ลงทะเบียนบัตรเข้าสวนในแอป แล้วเลือกโซน จำนวนคน
            และเวลา จากนั้นแสดง QR Code ที่ทางเข้าโซน ตรวจสอบเมื่อ {CHECKED_USJ} สิทธิ์นี้รับได้ในวันนั้นตามลำดับก่อนหลัง
            ซึ่งเป็นเหตุผลที่ Express Pass เวอร์ชันที่รวมสิทธิ์เข้าโซนคือวิธีเดียวที่จะได้รอบ Super Nintendo World
            ไว้ก่อนเดินทาง ติดตั้งแอปและลงทะเบียนบัตรก่อนบิน — การมาทำตอนต่อคิวด้วยมือถือที่ไม่มีอินเทอร์เน็ต
            คือปัญหาที่หลีกเลี่ยงได้
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>พักที่ไหนดี</span>
          <h2 className={styles.sectionTitle}>ไปยูนิเวอร์แซล สตูดิโอ เจแปน ควรพักที่ไหน?</h2>
          <p className={styles.bodyText}>
            <strong>พักย่าน Universal City ถ้าอยากไปถึงทางเข้าตอนสวนเปิด หากไม่จำเป็นต้องพักใกล้สวนสนุก ให้เลือกพักย่านอุเมดะหรือบริเวณสถานีโอซาก้า</strong>{" "}
            เดินจากสถานี Universal City บนสาย JR Yumesaki ไปยังทางเข้าสวนสนุกใช้เวลาประมาณห้านาที
            และสวนอยู่ห่างจากสถานีโอซาก้าประมาณ 20 นาที — ทั้งสองตัวเลขเป็นของ Osaka Convention &amp; Tourism Bureau ตรวจสอบเมื่อ{" "}
            {CHECKED} หน้าจุดหมายของ JR West สำหรับสวนระบุว่าสถานี Universal-City เป็นสถานีที่ใกล้ที่สุด
            และบรรยายว่าสวนอยู่ &ldquo;ติดกับ&rdquo; สถานี ตรวจสอบวันเดียวกัน
          </p>
          <p className={styles.bodyText}>
            ระยะเดินนั้นคือเหตุผลทั้งหมด ในวันที่มี Express Pass คุณอยากผ่านประตูหมุนให้เร็ว และ Universal City
            เป็นย่านเดียวที่ทำให้การเดินทางเหลือแค่เดินห้านาที ข้อโต้แย้งคือส่วนที่เหลือของทริป: อุเมดะและสถานี
            โอซาก้าอยู่บนเครือข่าย JR หลัก ส่วนโรงแรมย่าน Universal City มีอยู่ไม่กี่แห่ง จึงเป็นห้องที่หมดก่อน
            ในวันที่คนเยอะ{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>
              คู่มือที่พักโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            เทียบทั้งสี่ย่านตามสายรถไฟและเส้นทางจากสนามบิน และ{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>
              แผนเที่ยวโอซาก้า 2 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            แสดงว่าวันไปสวนเข้ากับส่วนอื่นของเมืองอย่างไร
          </p>
        </section>

        <KlookStayAreas
          heading="ค้นหาโรงแรมใกล้ USJ แยกตามย่าน"
          intro="ห้องไหนยังว่างและราคาเท่าไรเป็นเรื่องของแต่ละวัน แต่ละย่านจึงลิงก์ตรงไปหน้าค้นหาโรงแรมของ Klook สำหรับย่านนั้น ใส่วันที่ตาม Studio Pass ของคุณ แล้วเทียบ Universal City กับฐานฝั่ง JR สักแห่ง — วันธรรมดาที่คนน้อย ความต่างมักเป็นเรื่องราคา ส่วนสุดสัปดาห์ช่วงครบรอบ ความต่างมักเป็นเรื่องห้องว่าง"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>ไป USJ จากสนามบินคันไซหรือสถานีโอซาก้าอย่างไร?</h2>
          <p className={styles.bodyText}>
            USJ อยู่ในเขตโคโนฮานะ ทางตะวันตกของโอซาก้า และสถานีคือ Universal City บนสาย JR Yumesaki (สายซากุระจิมะ)
            — โดยทั่วไปเดินทางไปได้โดยเปลี่ยนรถที่สถานีนิชิคุโจ JR West ระบุว่าสถานี Universal-City เป็นสถานีที่ใกล้สวนที่สุด
            และ Osaka Convention &amp; Tourism Bureau ระบุว่าเดินจากสถานีไปยังทางเข้าสวนสนุกใช้เวลาประมาณห้านาที
            และสวนอยู่ห่างจากสถานีโอซาก้าประมาณ 20 นาที ทั้งสองตรวจสอบเมื่อ {CHECKED} JR West ไม่ได้ระบุเวลาเดินทางรวม
            ตั้งแต่ต้นทางจนถึงทางเข้าสวนสนุกสำหรับช่วงสาย Yumesaki บนเว็บไซต์ภาษาอังกฤษ ที่นี่จึงไม่ระบุไว้
          </p>
          <p className={styles.bodyText}>
            จาก<strong>สนามบินคันไซ</strong> มีสองวิธีที่สมเหตุสมผลในการเข้าเมือง และไม่มีวิธีไหนถึงสวนโดยตรง
            HARUKA ของ JR West วิ่งจากสนามบินไปเท็นโนจิ โอซาก้า ชินโอซาก้า และเกียวโตโดยไม่ต้องเปลี่ยนรถ ตั๋วเที่ยว
            เดียวราคาพิเศษ — ขายเฉพาะผู้ถือพาสปอร์ตต่างชาติที่เข้าประเทศแบบ Temporary Visitor — ราคา ¥1,300 ไป
            เท็นโนจิ และ ¥1,800 ไปโอซาก้าหรือชินโอซาก้า ถึง 31 ตุลาคม 2026 และขึ้นเป็น ¥1,600 และ ¥1,900 ตั้งแต่
            1 พฤศจิกายน 2026 ค่าโดยสารเด็กครึ่งราคา Rapi:t ของ Nankai วิ่งไปนัมบะในเวลาอย่างน้อย 34 นาทีโดยไม่ต้อง
            เปลี่ยนรถ ใช้ตั๋วด่วนพิเศษผู้ใหญ่ ¥700 หรือเด็ก ¥350 เพิ่มจากค่าโดยสารปกติ — แพงขึ้น ¥300 ถ้าซื้อบนรถ
            และถูกลง ¥150 ถ้าซื้อแบบไม่ใช้ตั๋วกระดาษ ตัวเลขของ JR West และ Nankai ตรวจสอบเมื่อ {CHECKED} ทั้งสองทาง
            จากนั้นต่อสาย Loop ไปนิชิคุโจ แล้วต่อสาย Yumesaki
          </p>
          <p className={styles.bodyText}>
            มีบัตรโดยสารอีกแบบหนึ่งที่ควรรู้: หน้า Kansai Area Pass ของ JR West เองบรรยาย{" "}
            <strong>WEST QR Kansai Mini Pass</strong> ว่า &ldquo;Kyoto, Universal Studios Japan, Osaka, Namba,
            Kobe and Nara 3-Day Unlimited Rides&rdquo; ตัวพาสราคาผู้ใหญ่ ¥3,000 เด็ก ¥1,500 ใช้ได้สามวันติดกันบน
            รถไฟธรรมดา รวมถึง Special Rapid และ Rapid ใช้กับรถด่วนพิเศษใด ๆ ไม่ได้ รวมถึง HARUKA — JR West ระบุว่า
            ต้องซื้อตั๋วแยก <strong>WEST QR Kansai Area Pass</strong> คือพาสที่ครอบคลุม HARUKA (ที่นั่งไม่ระบุไม่จำกัด
            บวกที่นั่งระบุสองครั้ง) ราคา ¥2,700 สำหรับหนึ่งวันไปจนถึง ¥6,700 สำหรับสี่วัน ทั้งหมดตรวจสอบเมื่อ{" "}
            {CHECKED} ทั้งสองพาสไม่ครอบคลุม Osaka Metro และไม่มีพาส Osaka Metro ใดไปถึง Universal City
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrHarukaUrl, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูตั๋ว HARUKA บน Klook →
            </KlookLink>
            <KlookLink href={klookFor(nankaiRapitUrl, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู Nankai Rapi:t บน Klook →
            </KlookLink>
            <KlookLink href={klookFor(jrKansaiMiniPass.url, LOCALE)} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู Kansai Mini Pass บน Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            วางเส้นทางด้วย{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>
              ไกด์เดินทางจากสนามบินโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            (รวมการเทียบ HARUKA กับ Nankai Rapi:t) และ{" "}
            <Link href="/guides/transport/osaka-transportation" style={linkStyle}>
              ไกด์เดินทางในเมืองโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            สำหรับตัวเลือกพาสรายวัน หรือ{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              คู่มือ Kansai Area Pass (ภาษาอังกฤษ)
            </Link>{" "}
            สำหรับพาส JR ด้านบนแบบละเอียด
          </p>
        </section>

        {/* Moved here from above the Express Pass box on 14 Nov 2026 (R01), as on the English page; unchanged. */}
        <KlookTripPrep
          label="รอบ ๆ วันไปสวนสนุก"
          heading="สิ่งที่ควรจองคู่กับ Studio Pass ของ USJ"
          intro="Studio Pass พาคุณเข้าสวน แต่วันไปสวนยังต้องมีที่พัก การเดินทางไปกลับโอซาก้า และอินเทอร์เน็ตบนมือถือ ทั้ง 5 รายการนี้จองได้ในบัญชี Klook เดียวกับที่ใช้ซื้อตั๋ว"
          items={sameDayPrep}
        />

        <KlookTripPrep
          label="จองไว้ด้วยกัน"
          heading="ทริปโอซาก้าควรจองอะไรอีก?"
          intro="วันไปสวนคือหนึ่งวัน สามรายการนี้คือสิ่งที่ทริปเดียวกันมักต้องใช้รอบ ๆ วันนั้น และรายการแรกอยู่ในลิสต์เพื่อไม่ให้คุณซื้อมันด้วยเหตุผลที่ผิด"
          items={tripPrep}
        />

        {/* 21 Nov 2026 (P01): the 5% Osaka sights and a 6.5% day tour, just before the FAQ. GA4 placement usj-highrate-faq. */}
        <div data-placement="usj-highrate-faq">
          <KlookTripPrep
            label="วันที่ไม่ได้ไปสวนสนุก"
            heading="สถานที่ในโอซาก้าที่จองไว้สำหรับวันที่ไม่ได้ไปสวนสนุก"
            intro="ถ้าไม่ได้ซื้อ Osaka Amazing Pass ปราสาทโอซาก้าและอุเมดะสกายบิลดิ้งต้องซื้อตั๋วแยก และยังมีทัวร์พร้อมไกด์ที่เที่ยวทั้งสองแห่งในวันเดียว"
            items={highRateFaqPrep}
            adPlacement="usj-highrate-faq"
          />
        </div>

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/where-to-stay-in-osaka", title: "พักที่ไหนในโอซาก้า (2026): ย่านที่ดีที่สุด เทียบตามสายรถไฟและสนามบิน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "ตั๋วพิพิธภัณฑ์สัตว์น้ำไคยูคังโอซาก้า (2026): ราคา เวลาเปิด และรอบเข้าชม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "เที่ยวโอซาก้าทำอะไรดี (2026): ที่ไหนพาสคุ้ม ที่ไหนไม่คุ้ม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "Osaka Amazing Pass (2026): วันละ ¥3,500 คุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "ทัวร์วันเดียวเกียวโตและนาราจากโอซาก้า (2026): ควรจองแผนไหน (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-airport-transfer", title: "ไกด์เดินทางจากสนามบินโอซาก้า (2026): KIX และ ITM เข้าเมือง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "แผนเที่ยวโอซาก้า 2 วัน (2026): แผนเที่ยวรายวันและสิ่งที่ควรจอง (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-transportation", title: "เดินทางในโอซาก้า (2026): รถไฟใต้ดิน รถไฟ และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำอื่น ๆ ในญี่ปุ่น (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกระหว่าง Tokyo Disneyland กับ Tokyo DisneySea" },
            { href: "/guides/transport/osaka-metro-pass", title: "Osaka Metro Pass กับ Enjoy Eco Card (2026): นักท่องเที่ยวควรซื้อแบบไหน (ภาษาอังกฤษ)" },
          ]}
        />

        <GygCompare
          slug={GYG_SLUG}
          heading="บัตร USJ และ Express Pass บน GetYourGuide"
          intro="Express Pass มีจำนวนจำกัดต่อวันและผูกกับวันที่ระบุ ใบที่คุณอยากได้จึงมักไม่มีเหลือแล้ว GetYourGuide ขาย Express Pass แยก — ข้อควรรู้เหมือนที่อื่น คือไม่รวมบัตรเข้าสวน — และขาย Studio Pass แยกอีกรายการ ถ้าวันของคุณหมดในช่องทางด้านบน ลองดูที่นี่ก่อนเปลี่ยนวันเดินทาง"
          listings={[gygUsjExpressPass, gygUsj]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>ลดเวลารอคิวเครื่องเล่นที่ USJ</h2>
            <p className={styles.ctaBannerDesc}>
              ซื้อ Studio Pass ออนไลน์เพื่อเข้าสวน แล้วเพิ่ม Express Pass เวอร์ชันที่วันของคุณต้องการ — จำนวนต่อวัน
              มีจำกัด และเวอร์ชันที่รวมสิทธิ์เข้าโซน Super Nintendo World หมดก่อน
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={thUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูบัตรและพาส USJ →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygUsjExpressPass} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
