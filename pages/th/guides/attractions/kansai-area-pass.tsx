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
import {
  jrHarukaUrl,
  jrKansaiAreaPass3276,
  jrKansaiMiniPass,
  kansaiAreaPassSameDayCards,
  kansaiAreaPassSameDayPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/kansai-area-pass) section by section as of
// 2026-11-25 (task-jtk-20261125-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added.
// Title term: JR Kansai Area Pass — JR West has no Thai page for the pass, and Thai results
// (sellers, blogs) keep the English name; pass names stay in Latin script, places in Thai.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/kansai-area-pass";
const TITLE = "JR Kansai Area Pass 2026: ราคา";
const H1 = "JR Kansai Area Pass 2026: ราคา และเทียบกับ Kansai Wide Area Pass";
const DESC =
  "JR Kansai Area Pass ¥2,700–¥6,700 KIX→เกียวโต+นารา ตั๋วเที่ยวเดียว ¥4,140 รวม HARUKA";

// R18 (2026-11-27): re-read with the English page — same ordinary fares, itinerary table,
// coverage table and KANSAI ONE PASS notice; Klook pass listing moved to 3276.
const CHECKED_ISO = "2026-11-27";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const R04_CHECKED = dateLabel("2026-11-13", LOCALE);
const PREV_CHECKED = dateLabel("2026-11-03", LOCALE);
const OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";
const HARUKA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/haruka/";
const WIDE_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/";
const ICOCA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/howto/icoca/";
const FARE_PDF_URL = "https://www.westjr.co.jp/press/article/items/240515_00_press_keihanshin_unchin.pdf";
const HIMEJI_FARE_URL = "https://www.westjr.co.jp/press/article/items/260225_00_press_JRWESTQR2daypass_1.pdf";
const KOP_NOTICE_URL = "https://www.hanshin.co.jp/press/docs/20241223-toshikotsu-wanpasssyuryo2.pdf";

const KANSAI_PASS_URL = klookFor(jrKansaiAreaPass3276.url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);

const QR_1_DAY = "¥2,700";
const QR_4_DAY = "¥6,700";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const vsWideRows = [
  {
    option: "สรุป",
    area: "นั่ง JR ระหว่างเกียวโต โอซาก้า นารา โกเบ ฮิเมจิ และสนามบินคันไซ → Kansai Area Pass",
    shinkansen: "ต้องนั่งชินคันเซ็นไปโอกายามะ หรือไปคิโนซากิออนเซ็น อามาโนะฮาชิดาเตะ ชิราฮามะ → Kansai WIDE",
    price: "อยู่ในเมืองเดียวและนั่งรถไฟใต้ดิน → ICOCA",
    who: "",
  },
  {
    option: "JR West Kansai Area Pass (WEST QR)",
    area: "รถไฟธรรมดาของ JR West รอบเกียวโต โอซาก้า นารา โกเบ ฮิเมจิ วากายามะ โอตสึ สึรุงะ และอิงะอุเอโนะ HARUKA ที่นั่งไม่จองไม่จำกัดเที่ยว ที่นั่งจอง 2 ครั้ง",
    shinkansen: "✗ ใช้กับชินคันเซ็นไม่ได้ และใช้กับรถด่วนพิเศษอื่นนอกจาก HARUKA ไม่ได้",
    price: "¥2,700 (1 วัน) ¥4,700 (2 วัน) ¥5,500 (3 วัน) ¥6,700 (4 วัน) ผู้ใหญ่",
    who: "ทริปคันไซ 1–4 วันที่เริ่มหรือจบที่สนามบินคันไซ",
  },
  {
    option: "JR West Kansai WIDE Area Pass",
    area: "ทุกเส้นทางของ Area Pass บวกโอกายามะ ทาคามัตสึ คิโนซากิออนเซ็น อามาโนะฮาชิดาเตะ ทตโตริ และชิราฮามะ ที่นั่งจองบน HARUKA, KUROSHIO, KONOTORI, SUPER HAKUTO และอื่น ๆ",
    shinkansen: "✓ ที่นั่งจองชินคันเซ็นซันโย เฉพาะชินโอซาก้า ⇔ โอกายามะ (ไม่รวมชินคันเซ็นโทไกโดไปโตเกียว)",
    price: "¥12,000 สำหรับ 5 วันติดกัน ผู้ใหญ่ (เด็ก ¥6,000)",
    who: "ทริป 5 วันที่มีอย่างน้อยหนึ่งวันไปไกลกว่าฮิเมจิ",
  },
  {
    option: "ICOCA (บัตร IC ของ JR West)",
    area: "จ่ายตามการใช้จริงบนรถไฟและรถบัสในพื้นที่ใช้บัตร IC ทั่วญี่ปุ่น ทั้ง JR รถไฟใต้ดิน รถไฟเอกชน และรถบัส",
    shinkansen: "ไม่ใช่พาส: หักค่าโดยสารจากยอดเงินในบัตรทุกเที่ยว",
    price: "ICOCA ลายสำหรับนักท่องเที่ยว ¥2,000 รวมเงินมัดจำ ¥500 (ห้องขายตั๋ว JR สถานีสนามบินคันไซ)",
    who: "พักเมืองเดียว วันที่นั่งรถไฟใต้ดินและรถไฟเอกชน และใช้คู่กับพาสสำหรับค่าโดยสารส่วนที่เหลือ",
  },
];

const priceRows = [
  { days: "1 วัน", qrAdult: QR_1_DAY, qrChild: "¥1,350", perDay: "¥2,700", oldAdult: "¥2,800" },
  { days: "2 วัน", qrAdult: "¥4,700", qrChild: "¥2,350", perDay: "¥2,350", oldAdult: "¥4,800" },
  { days: "3 วัน", qrAdult: "¥5,500", qrChild: "¥2,750", perDay: "¥1,833", oldAdult: "¥5,800" },
  { days: "4 วัน", qrAdult: QR_4_DAY, qrChild: "¥3,350", perDay: "¥1,675", oldAdult: "¥7,000" },
];

const breakEvenRows = [
  { trip: "สนามบินคันไซ → เกียวโต 1 วัน", singles: "¥2,700", pass: `${QR_1_DAY} (1 วัน)`, result: "ราคาเท่ากัน และ JR เที่ยวอื่นในวันนั้นไม่ต้องจ่ายเพิ่ม" },
  { trip: "สนามบินคันไซ → โกเบ 1 วัน", singles: "¥2,300", pass: `${QR_1_DAY} (1 วัน)`, result: "ต้องนั่ง JR เที่ยวอื่นในวันนั้นอีก ¥400 จึงคุ้ม" },
  { trip: "สนามบินคันไซ → นารา 1 วัน", singles: "¥2,200", pass: `${QR_1_DAY} (1 วัน)`, result: "ต้องนั่ง JR เที่ยวอื่นในวันนั้นอีก ¥500 จึงคุ้ม" },
  { trip: "สนามบินคันไซ → โอซาก้า / ชินโอซาก้า 1 วัน", singles: "¥1,900", pass: `${QR_1_DAY} (1 วัน)`, result: "ต้องนั่ง JR เที่ยวอื่นในวันนั้นอีก ¥800 จึงคุ้ม" },
  { trip: "สนามบินคันไซ → เท็นโนจิเท่านั้น", singles: "¥1,600", pass: `${QR_1_DAY} (1 วัน)`, result: "ตั๋วเที่ยวเดียวถูกกว่า ¥1,100 ไม่ต้องซื้อพาส" },
  { trip: "เข้าเกียวโตและออกจากเกียวโต พัก 2 วัน", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: "¥4,700 (2 วัน)", result: "พาสถูกกว่า ¥700 แม้ไม่นั่งเที่ยวอื่นเลย" },
  { trip: "เข้าเกียวโต ออกจากโอซาก้า 3 วัน", singles: "¥2,700 + ¥1,900 = ¥4,600", pass: "¥5,500 (3 วัน)", result: "ต้องนั่ง JR เที่ยวอื่นอีก ¥900 ใน 3 วันจึงคุ้ม" },
  { trip: "เข้าเกียวโตและออกจากเกียวโต 4 วัน", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: `${QR_4_DAY} (4 วัน)`, result: "ต้องนั่ง JR เที่ยวอื่นอีก ¥1,300 ใน 4 วันจึงคุ้ม" },
];

// R18: ordinary JR West adult fares (same sources and figures as the English page).
const fareRows = [
  { route: "สนามบินคันไซ → เกียวโต (HARUKA One-way Ticket)", fare: "¥2,700", onPass: "✓ HARUKA ที่นั่งไม่จอง หรือใช้ที่นั่งจอง 1 ใน 2 ครั้ง" },
  { route: "สนามบินคันไซ → โอซาก้า / ชินโอซาก้า (HARUKA One-way Ticket)", fare: "¥1,900", onPass: "✓ HARUKA (ชินโอซาก้า) หรือ Kansai Airport Rapid" },
  { route: "โอซาก้า ↔ เกียวโต (JR Kyoto Line Special Rapid)", fare: "¥580", onPass: "✓ Special Rapid; ✗ ชินคันเซ็นชินโอซาก้า–เกียวโต" },
  { route: "เกียวโต ↔ นารา (JR Nara Line)", fare: "¥720", onPass: "✓" },
  { route: "เท็นโนจิ ↔ นารา (JR Yamatoji Line)", fare: "¥510", onPass: "✓" },
  { route: "โอซาก้า ↔ ซันโนมิยะ โกเบ (JR Kobe Line)", fare: "¥420", onPass: "✓" },
  { route: "โอซาก้า ↔ ฮิเมจิ (JR Kobe Line Special Rapid)", fare: "¥1,460", onPass: "✓ Special Rapid; ✗ ชินคันเซ็นชินโอซาก้า–ฮิเมจิ" },
];

// R18: itineraries priced as singles vs the pass (the lead row is the verdict).
const itineraryRows = [
  { plan: "วันที่ 1: สนามบินคันไซ → เกียวโต แล้วไปกลับเกียวโต ↔ นารา", singles: "¥2,700 + ¥720 + ¥720 = ¥4,140", pass: "¥2,700 (1 วัน)", result: "✓ พาสประหยัด ¥1,440" },
  { plan: "ไปกลับโอซาก้า ↔ ฮิเมจิ 1 วัน", singles: "¥1,460 × 2 = ¥2,920", pass: "¥2,700 (1 วัน)", result: "✓ พาสประหยัด ¥220" },
  { plan: "ไปกลับโอซาก้า ↔ เกียวโต อย่างเดียว", singles: "¥580 × 2 = ¥1,160", pass: "¥2,700 (1 วัน)", result: "✗ ตั๋วเที่ยวเดียวถูกกว่า ¥1,540" },
  { plan: "ไปกลับเท็นโนจิ ↔ นารา อย่างเดียว", singles: "¥510 × 2 = ¥1,020", pass: "¥2,700 (1 วัน)", result: "✗ ตั๋วเที่ยวเดียวถูกกว่า ¥1,680" },
  { plan: "3 วัน: KIX → เกียวโต; ไปกลับเกียวโต ↔ นารา; เกียวโต → โอซาก้า → KIX", singles: "¥2,700 + ¥1,440 + ¥580 + ¥1,900 = ¥6,620", pass: "¥5,500 (3 วัน)", result: "✓ พาสประหยัด ¥1,120" },
  { plan: "4 วัน: แผน 3 วัน + ไปกลับโอซาก้า ↔ ฮิเมจิ ในวันที่ 3", singles: "¥6,620 + ¥2,920 = ¥9,540", pass: `${QR_4_DAY} (4 วัน)`, result: "✓ พาสประหยัด ¥2,840" },
  { plan: "2 วัน อยู่แต่โอซาก้า: KIX → โอซาก้า, โอซาก้า → KIX", singles: "¥1,900 × 2 = ¥3,800", pass: "¥4,700 (2 วัน)", result: "✗ ตั๋วเที่ยวเดียวถูกกว่า ¥900" },
];

const lineLead = "รถไฟธรรมดาของ JR West บวก HARUKA ไม่รวมชินคันเซ็น รถด่วนพิเศษอื่น รถไฟใต้ดิน รถบัส หรือรถไฟเอกชน";

const lineRows = [
  { service: "JR Kyoto Line / Kobe Line Special Rapid (Shinkaisoku)", allowed: "✓ ไม่จำกัดเที่ยว", note: "รถไฟ JR สายเร็วเกียวโต–โอซาก้า–ซันโนมิยะ–ฮิเมจิ ที่นั่งธรรมดา ตู้ A-Seat ต้องจ่ายเพิ่ม" },
  { service: "JR Nara Line และ Yamatoji Line", allowed: "✓ ไม่จำกัดเที่ยว", note: "เกียวโต–อินาริ (ฟูชิมิอินาริ)–นาราบน Nara Line และเท็นโนจิ/JR นัมบะ–นาราบน Yamatoji Line" },
  { service: "Kansai Airport Line Rapid", allowed: "✓ ไม่จำกัดเที่ยว", note: "รถไฟสนามบินสาย JR ที่ช้ากว่า วิ่งผ่านเท็นโนจิไปโอซาก้า เป็นทางเลือกเมื่อเวลาของ HARUKA ไม่สะดวก" },
  { service: "Kansai-Airport Express HARUKA ที่นั่งไม่จอง", allowed: "✓ ไม่จำกัดเที่ยว", note: "รถไฟสนามบินจากสนามบินคันไซไปเท็นโนจิ ชินโอซาก้า และเกียวโต นี่คือเหตุผลหลักที่สุดในการซื้อพาสนี้" },
  { service: "Kansai-Airport Express HARUKA ที่นั่งจองรถธรรมดา", allowed: "✓ 2 ครั้ง", note: "รวมที่นั่งจอง 2 ครั้งโดยไม่ต้องจ่ายเพิ่ม จองได้บนเว็บไซต์ WEST-QR ตั้งแต่ 30 วันก่อนขึ้นรถ JR West ระบุว่าจองบนรถไฟ ที่เครื่องขายตั๋ว หรือที่เคาน์เตอร์ขายตั๋วไม่ได้" },
  { service: "HARUKA Green Car (ชั้นหนึ่ง)", allowed: "✗ ไม่รวม", note: "ต้องซื้อตั๋วแยก พาสใช้ได้เฉพาะรถธรรมดา" },
  { service: "รถไฟ Special Rapid, Rapid และ Local ของ JR West", allowed: "✓ ไม่จำกัดเที่ยว", note: "เส้นทางปกติในพื้นที่ใช้งาน เช่น โอซาก้า–เกียวโต โอซาก้า–โกเบ โอซาก้า–นารา โอซาก้า–ฮิเมจิ และอื่น ๆ" },
  { service: "ชินคันเซ็น (โทไกโดและซันโย)", allowed: "✗ ใช้ไม่ได้", note: "ใช้ไม่ได้ทุกช่วง แม้ในวันที่พาสใช้ได้ การนั่งชินคันเซ็นจากชินโอซาก้าไปเกียวโตต้องซื้อตั๋วแยก" },
  { service: "รถด่วนพิเศษอื่น", allowed: "✗ ไม่รวม", note: "HARUKA เป็นรถด่วนพิเศษขบวนเดียวที่ใช้พาสได้ Thunderbird, Kuroshio และขบวนอื่นต้องซื้อตั๋วแยก" },
  { service: "รถไฟเอกชน: Hankyu, Keihan, Kintetsu, Nankai", allowed: "✗ ไม่รวม", note: "พาสนี้เป็นตั๋วของ JR West หน้าเว็บพาสรุ่นเก่าของ JR West ขายสิทธิ์นั่ง Keihan และ Hankyu เป็นใบยืนยันการจองแยกเท่านั้น เส้นทางที่สะดวกที่สุดสำหรับเที่ยวในเกียวโตและโอซาก้ามักเป็นรถไฟเอกชนเหล่านี้ ไม่ใช่ JR" },
  { service: "Osaka Metro รถไฟใต้ดินเกียวโต และรถบัสในเมือง", allowed: "✗ ไม่รวม", note: "ใช้กับรถไฟใต้ดินและรถบัสในเมืองไม่ได้ ในทั้งสองเมืองคุณยังต้องมีบัตร IC หรือพาสเมืองเพิ่ม" },
  { service: "ที่นั่งเสียเงินบนรถไฟ JR (A-Seat) และ Green Car ของรถไฟธรรมดา", allowed: "✗ จ่ายเพิ่ม", note: "ที่นั่งธรรมดาบน Special Rapid, Rapid และ Local ใช้ได้ แต่ A-Seat และ Green Car ต้องจ่ายเพิ่ม" },
];

const compareRows = [
  { option: "สรุป", price: "—", covers: "เที่ยวเฉพาะคันไซด้วย JR และ HARUKA → Kansai Area Pass ไปนาราด้วย Kintetsu → KINTETSU RAIL PASS มีฮิโรชิม่าในทริปเดียวกัน → Kansai-Hiroshima Area Pass", pick: "KANSAI ONE PASS เป็นบัตร IC ไม่ใช่พาสที่ใช้แทนกันได้" },
  { option: "WEST QR Kansai Area Pass", price: `${QR_1_DAY} (1 วัน) ถึง ${QR_4_DAY} (4 วัน) ผู้ใหญ่`, covers: "รถไฟธรรมดาของ JR West รอบโอซาก้า เกียวโต โกเบ นารา ฮิเมจิ วากายามะ โอตสึ สึรุงะ และอิงะอุเอโนะ พร้อม HARUKA ที่นั่งไม่จองไม่จำกัดเที่ยวและที่นั่งจอง 2 ครั้ง", pick: "ตัวเลือกหลักสำหรับทริปคันไซที่เริ่มหรือจบที่สนามบินคันไซ" },
  { option: "Kansai Mini Pass", price: "¥3,000 สำหรับ 3 วันติดกัน ผู้ใหญ่ (เด็ก ¥1,500)", covers: "รถไฟ Rapid และ Local ของ JR West รวม Kansai-Airport Rapid Service ส่วน HARUKA ต้องซื้อตั๋วรถด่วนพิเศษแยก", pick: "ถูกที่สุดถ้าคุณนั่ง Rapid ที่ช้ากว่าแทน HARUKA ในช่วงสนามบิน" },
  { option: "HARUKA One-way Ticket", price: "จากสนามบินคันไซ: เท็นโนจิ ¥1,600 โอซาก้า / ชินโอซาก้า ¥1,900 โกเบ ¥2,300 นารา ¥2,200 เกียวโต ¥2,700", covers: "เดินทางช่วงสนามบินเที่ยวเดียว ไม่รวมการเดินทางระหว่างเมืองหลังจากนั้น", pick: "เฉพาะเมื่อช่วงสนามบินเป็นการนั่ง JR ครั้งเดียวในทริป" },
  { option: "KINTETSU RAIL PASS", price: "¥1,900 (1 วัน) ¥3,700 (2 วัน) ¥4,900 (5 วัน) ¥6,700 (5 วันแบบ plus)", covers: "เฉพาะสาย Kintetsu: โอซาก้า-นัมบะไปคินเท็ตสึ-นาราและเกียวโต แบบ 5 วันไปอิเสะ-ชิมะและนาโงย่าได้ ไม่รวม JR และ HARUKA", pick: "ถ้าสวนนาราเป็นทริปไปกลับหลัก และคุณพักใกล้นัมบะ ซึ่งรถไฟไปนาราเป็น Kintetsu ไม่ใช่ JR" },
  { option: "Kansai-Hiroshima Area Pass", price: "¥17,000 สำหรับ 5 วันติดกัน ผู้ใหญ่ (เด็ก ¥8,500)", covers: "JR West ในคันไซ พร้อมที่นั่งจองชินคันเซ็นซันโยชินโอซาก้า ⇄ ฮิโรชิม่า รถด่วนพิเศษรวมถึง HARUKA และเรือ JR Miyajima Ferry", pick: "ถ้ามีฮิโรชิม่าและมิยาจิมะในทริปเดียวกัน เพราะ Kansai Area Pass ใช้กับชินคันเซ็นไม่ได้เลย" },
  { option: "KANSAI ONE PASS", price: "ไม่ใช่ราคาพาส เป็นบัตร IC เติมเงินที่จ่ายค่าโดยสารทุกเที่ยว", covers: "จ่ายตามการใช้จริงบน JR รถไฟเอกชน รถไฟใต้ดิน และรถบัส กำลังทยอยหยุดขายภายในมีนาคม 2027", pick: "ใช้แทนพาสรถไฟไม่ได้ ถ้าจะจ่ายตามการใช้จริง บัตร IC ใดก็ได้ เช่น ICOCA ทำหน้าที่เดียวกัน" },
  { option: "Kansai WIDE Area Pass", price: "¥12,000 สำหรับ 5 วันติดกัน ผู้ใหญ่ (เด็ก ¥6,000)", covers: "ทุกอย่างข้างต้นบวกที่นั่งจองชินคันเซ็นซันโยชินโอซาก้า ⇄ โอกายามะ และทาคามัตสึ คิโนซากิออนเซ็น อามาโนะฮาชิดาเตะ ทตโตริ ชิราฮามะ", pick: "ถ้าฮิเมจิไม่ใช่จุดไกลที่สุดของทริป การไปเที่ยวนอกคันไซทำให้คำตอบเปลี่ยน" },
  { option: "Osaka Amazing Pass", price: `¥3,500 สำหรับ 1 วัน ¥5,000 สำหรับ 2 วัน (ตรวจสอบ ${PREV_CHECKED})`, covers: "นั่งรถบัสและรถไฟตามแผนที่เส้นทางในโอซาก้าฟรี และเข้าสถานที่ท่องเที่ยวตามรายชื่อ เป็นพาสเมือง ไม่ใช่พาสรถไฟระดับภูมิภาค", pick: "สำหรับหนึ่งวันในโอซาก้า ใช้แทนช่วงสนามบินหรือการเดินทางไปเกียวโตและนาราของ Kansai Area Pass ไม่ได้" },
  { option: "JAPAN RAIL PASS (ทั่วประเทศ หลังปรับเมื่อ 1 ตุลาคม 2026)", price: `7 วัน รถธรรมดา: ¥50,000 บนเว็บไซต์ทางการ ¥53,000 แบบ Exchange Order จากตัวแทนในต่างประเทศ (ตรวจสอบ ${PREV_CHECKED})`, covers: "JR ทั่วประเทศรวมชินคันเซ็นส่วนใหญ่ กว้างกว่าคันไซมาก และแพงกว่า Kansai Area Pass แบบ 4 วันมากกว่า 7 เท่า", pick: "เฉพาะเมื่อมีโตเกียวในแผนเที่ยว ดูจุดคุ้มทุนในคู่มือ JR Pass" },
];

const worthRows = [
  { plan: "บินเข้าสนามบินคันไซแล้วไปเกียวโตทันที", verdict: "✓ ซื้อแบบ 1 วัน", why: "HARUKA One-way Ticket ไปเกียวโตราคา ¥2,700 สำหรับตั๋วที่ขายตั้งแต่ 1 พฤศจิกายน 2026 เท่ากับพาส 1 วันพอดี พาสจึงไม่มีค่าใช้จ่ายเพิ่ม และ JR ทุกเที่ยวที่คุณนั่งในวันเดียวกันก็ไม่ต้องจ่ายเพิ่ม" },
  { plan: "เที่ยวโอซาก้า เกียวโต นารา และโกเบ 3–4 วัน เดินทางระหว่างเมืองด้วย JR", verdict: "✓ ซื้อแบบ 3 หรือ 4 วัน", why: `${QR_4_DAY} สำหรับ 4 วัน ใช้ได้ทั้งช่วงสนามบินขาไปขากลับและการเดินทางระหว่างเมือง แค่ช่วงสนามบิน คือเข้าเกียวโต ¥2,700 และออกจากโอซาก้า ¥1,900 ด้วยตั๋ว HARUKA เที่ยวเดียว ก็เป็น ¥4,600 จาก ¥6,700 แล้ว เหลือ ¥2,100 ที่ต้องนั่งเพิ่ม` },
  { plan: "พักเมืองเดียว เที่ยวด้วยการเดิน รถไฟใต้ดิน และรถบัส", verdict: "✗ ไม่ต้องซื้อ", why: "พาสใช้กับ Osaka Metro รถไฟใต้ดินเกียวโต และรถบัสในเมืองไม่ได้เลย ถ้าคุณเที่ยวอยู่ในเมืองเดียว บัตร IC คู่กับพาสเมืองถูกกว่า และพาสนี้ซ้ำกับช่วงสนามบินเท่านั้น" },
  { plan: "เที่ยววัดในเกียวโตด้วย Hankyu, Keihan หรือ Kintetsu", verdict: "✗ พาสไม่ตรงกับแผน", why: "ฟูชิมิอินาริ อาราชิยามะ และนารา มีทั้งสถานี JR และสถานีรถไฟเอกชน พาสใช้ได้เฉพาะสถานี JR (อินาริ, ซากะ-อาราชิยามะ, JR นารา) ก่อนซื้อสินค้าของ JR ให้ตรวจสอบว่าสถานีที่จะไปเป็นของบริษัทไหน" },
  { plan: "มีโตเกียวในทริปเดียวกัน หรือมีช่วงชินคันเซ็น", verdict: "✗ ไม่ใช่พาสนี้", why: "ใช้กับชินคันเซ็นไม่ได้ทุกช่วง และพื้นที่ใช้งานไปไม่ถึงโตเกียว ให้เทียบราคา JAPAN RAIL PASS ทั่วประเทศ หรือซื้อตั๋วชินคันเซ็นช่วงนั้นแยก แล้วใช้ Kansai Area Pass เฉพาะวันที่อยู่คันไซ" },
  { plan: "ถือพาสปอร์ตญี่ปุ่นหรืออาศัยอยู่ในญี่ปุ่น", verdict: "✗ ไม่มีสิทธิ์ซื้อ", why: "JR West ขายให้เฉพาะผู้ถือพาสปอร์ตที่ออกโดยรัฐบาลต่างประเทศและเข้าญี่ปุ่นด้วยสถานะ Temporary Visitor (ผู้พำนักระยะสั้น) คนสัญชาติญี่ปุ่นใช้ไม่ได้ และชาวต่างชาติที่มีสิทธิ์พำนักถาวรในญี่ปุ่นก็ใช้ไม่ได้" },
];

const faqItems: FaqItem[] = [
  {
    q: "JR Kansai Area Pass ราคาเท่าไร?",
    a: `ผู้ใหญ่ ${QR_1_DAY} สำหรับ 1 วัน ¥4,700 สำหรับ 2 วัน ¥5,500 สำหรับ 3 วัน และ ${QR_4_DAY} สำหรับ 4 วันติดกัน เด็กอายุ 6–11 ปีจ่ายครึ่งราคา (¥1,350 / ¥2,350 / ¥2,750 / ¥3,350) นี่คือราคาของ WEST QR Kansai Area Pass ของ JR West ซึ่งเป็นแบบที่ขายอยู่ตอนนี้ Kansai Area Pass แบบกระดาษรุ่นเก่า (¥2,800 / ¥4,800 / ¥5,800 / ¥7,000) หยุดขายเมื่อ 30 กันยายน 2026 ตรวจสอบจาก westjr.co.jp เมื่อ ${CHECKED}`,
  },
  {
    q: "Kansai Area Pass กับ Kansai Wide Area Pass แบบไหนดีกว่า?",
    a: `ทริปคันไซครั้งแรกส่วนใหญ่ใช้ Kansai Area Pass ส่วน Kansai WIDE Area Pass เหมาะเฉพาะเมื่อไปไกลกว่าฮิเมจิ Area Pass ราคา ${QR_1_DAY}–${QR_4_DAY} สำหรับ 1–4 วัน และใช้กับชินคันเซ็นไม่ได้ ส่วน WIDE ราคา ¥12,000 สำหรับ 5 วันติดกัน และเพิ่มที่นั่งจองชินคันเซ็นซันโยระหว่างชินโอซาก้ากับโอกายามะ รวมถึงคิโนซากิออนเซ็น อามาโนะฮาชิดาเตะ ทตโตริ ชิราฮามะ และทาคามัตสึ ถ้าแผนของคุณคือเกียวโต โอซาก้า นารา โกเบ และฮิเมจิ Area Pass แบบ 4 วัน (${QR_4_DAY}) ถูกกว่า ¥5,300 ทั้งสองแบบตรวจสอบจาก westjr.co.jp เมื่อ ${CHECKED}`,
  },
  {
    q: "KANSAI ONE PASS หยุดขายแล้วหรือยัง?",
    a: `หยุดขายแล้ว KANSAI ONE PASS เป็นบัตร IC เติมเงิน ไม่ใช่พาสรถไฟ ทยอยหยุดขายทีละบริษัทตั้งแต่ 1 พฤศจิกายน 2025 เมื่อสต็อกหมด และจะหยุดขายทั้งหมดภายในสิ้นปีงบประมาณ 2026 (มีนาคม 2027) ตามประกาศร่วมลงวันที่ 23 ธันวาคม 2024 ของ JR West และผู้ให้บริการอีก 9 ราย บัตรที่ซื้อไปแล้วยังใช้เป็นบัตร IC ได้ ส่วนสิทธิพิเศษที่ร้านค้าและสถานที่ท่องเที่ยวสิ้นสุดพร้อมปีงบประมาณ 2026 ประกาศนี้ไม่ได้ระบุบัตรที่มาแทน ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "Kansai Area Pass คุ้มไหมสำหรับเที่ยวเกียวโตและโอซาก้า?",
    a: `คุ้ม ถ้าคุณลงที่สนามบินคันไซและเดินทางระหว่างเมืองด้วย JR แต่ไม่คุ้มสำหรับการไปกลับโอซาก้า–เกียวโตเพียงเที่ยวเดียว ตามค่าโดยสารของ JR West ตั๋ว HARUKA เที่ยวเดียวสนามบินคันไซ–เกียวโต (¥2,700) บวกไปกลับเกียวโต–นารา (¥1,440) รวม ¥4,140 เทียบกับพาส 1 วัน ¥2,700 และแผน 3 วัน KIX → เกียวโต → นารา → โอซาก้า → KIX ใช้ตั๋วเที่ยวเดียวรวม ¥6,620 เทียบกับพาส ¥5,500 ส่วนไปกลับโอซาก้า–เกียวโตแค่ ¥1,160 (เที่ยวละ ¥580) จึงไม่คุ้มกับพาส ¥2,700 ต่อวัน พาสนี้ใช้กับ Osaka Metro รถไฟใต้ดินเกียวโต รถบัสในเมือง และสาย Kintetsu, Hankyu, Keihan, Nankai ไม่ได้ ค่าโดยสารจาก westjr.co.jp ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "Kansai Area Pass ใช้กับชินคันเซ็น HARUKA และรถไฟใต้ดินได้ไหม?",
    a: `ใช้กับ HARUKA ได้ แต่ใช้กับชินคันเซ็นและรถไฟใต้ดินไม่ได้ JR West ระบุว่า WEST QR Kansai Area Pass นั่ง HARUKA ที่นั่งไม่จองได้ไม่จำกัดเที่ยวพร้อมที่นั่งจอง 2 ครั้ง และ "ใช้กับชินคันเซ็นไม่ได้ แม้จะจ่ายค่าโดยสารเพิ่ม" Osaka Metro รถไฟใต้ดินเกียวโต รถบัสในเมือง และรถไฟเอกชนไม่ใช่ของ JR West จึงใช้ไม่ได้ ถ้าต้องการพาสคันไซที่มีชินคันเซ็น Kansai WIDE Area Pass (¥12,000, 5 วัน) รวมที่นั่งจองชินคันเซ็นซันโยชินโอซาก้า ⇔ โอกายามะ และ Kansai-Hiroshima Area Pass (¥17,000, 5 วัน) รวมชินโอซาก้า ⇔ ฮิโรชิม่า ตรวจสอบ ${CHECKED} (Kansai-Hiroshima ตรวจสอบ ${R04_CHECKED})`,
  },
];

// R18: the same-day cards sit under the main CTA (localized here).
const sameDayCards = [
  withKlookLocale(kansaiAreaPassSameDayCards[0], LOCALE, {
    label: "ทัวร์เกียวโตและนารา 1 วัน (วัดคิโยมิสึ ฟูชิมิอินาริ และสวนนารา)",
    kind: "ทัวร์ 1 วัน",
    ctaLabel: "ดูทัวร์เกียวโต–นารา 1 วัน →",
    why: "ทัวร์รถบัสพร้อมไกด์พาไปเกียวโตและสวนนาราในการจองครั้งเดียว รวมช่วงรถบัสและเดินระหว่างจุดเที่ยวที่พาส JR ไม่ครอบคลุม",
  }),
  withKlookLocale(kansaiAreaPassSameDayCards[1], LOCALE, {
    label: "โรงแรมใกล้สถานีเกียวโต",
    kind: "โรงแรม",
    ctaLabel: "ดูโรงแรมใกล้สถานีเกียวโต →",
    why: "สถานีเกียวโตเป็นปลายทางของ HARUKA และต้นทางของ JR Nara Line สองเส้นทางที่ใช้พาสบ่อยที่สุดจึงเริ่มหน้าที่พัก",
  }),
  withKlookLocale(kansaiAreaPassSameDayCards[2], LOCALE, {
    label: "Klook Japan eSIM",
    kind: "eSIM",
    ctaLabel: "ดู eSIM บน Klook →",
    why: "WEST QR pass คือ QR code ในโทรศัพท์ การกด \"Use ticket\" (ใช้ตั๋ว) และการจองที่นั่ง HARUKA 2 ครั้งต้องใช้อินเทอร์เน็ตตั้งแต่ถึงสนามบิน",
  }),
];

const tripPrepItems = [
  withKlookLocale(kansaiAreaPassSameDayPrep[0], LOCALE, {
    label: "ทัวร์เกียวโตและนารา 1 วัน (วัดคิโยมิสึ ฟูชิมิอินาริ และสวนนารา)",
    ctaLabel: "ดูทัวร์เกียวโต–นารา 1 วัน →",
    why: "พาสใช้กับ JR ไปเกียวโตและนาราได้ แต่ใช้กับ Keihan ไปฟูชิมิอินาริหรือ Kintetsu เข้าสวนนาราไม่ได้ ทัวร์รถบัส 1 วันพาไปครบทั้งสามจุดด้วยการจองครั้งเดียว",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[1], LOCALE, {
    label: "ทัวร์รถบัสแบบกลุ่มไปปราสาทฮิเมจิจากโอซาก้า",
    ctaLabel: "ดูทัวร์ฮิเมจิ 1 วัน →",
    why: "ฮิเมจิอยู่ในพื้นที่ใช้พาสด้วย JR แต่ถ้าไม่อยากวางแผนวันเที่ยวปราสาทเอง ทัวร์รถบัสแบบกลุ่มจากโอซาก้าเป็นอีกทางเลือก",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[2], LOCALE, {
    label: "ตั๋วรถไฟด่วนสนามบิน JR HARUKA (สนามบินคันไซ)",
    ctaLabel: "ดูตั๋ว HARUKA →",
    why: "ถ้าช่วงสนามบินอยู่นอกวันที่ใช้พาส หรือเป็นการนั่ง JR ครั้งเดียวของคุณ ตั๋ว HARUKA เที่ยวเดียวคือตั๋วสนามบินคันไซที่ควรเทียบราคากับพาส",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[3], LOCALE, {
    label: "Klook Japan eSIM",
    ctaLabel: "ดู eSIM บน Klook →",
    why: "WEST QR pass คือ QR code ในโทรศัพท์ คุณต้องกดปุ่ม \"Use ticket\" (ใช้ตั๋ว) และจองที่นั่ง HARUKA 2 ครั้งทางออนไลน์ ทั้งสองอย่างต้องใช้อินเทอร์เน็ตมือถือตั้งแต่เดินทางถึง",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[4], LOCALE, {
    label: "โรงแรมย่านอุเมดะ / สถานีโอซาก้า",
    ctaLabel: "ดูโรงแรมใกล้สถานีโอซาก้า →",
    why: "สถานีโอซาก้าเป็นศูนย์กลางของ JR West สำหรับรถ Special Rapid ไปเกียวโต โกเบ และฮิเมจิ ซึ่งเป็นการเดินทางระหว่างเมืองที่ทำให้พาสหลายวันคุ้มค่า",
  }),
  withKlookLocale(kansaiAreaPassSameDayPrep[5], LOCALE, {
    label: "โรงแรมใกล้สถานีเกียวโต",
    ctaLabel: "ดูโรงแรมใกล้สถานีเกียวโต →",
    why: "สถานีเกียวโตเป็นปลายทางของ HARUKA จากสนามบินคันไซ พักที่นี่แล้วช่วงสนามบินของพาสไม่ต้องเปลี่ยนรถเลย",
  }),
].filter((p) => !sameDayCards.some((c) => c.url === p.url));

const tourPicks = [
  withKlookLocale(jrKansaiAreaPass3276, LOCALE, {
    title: "JR West Kansai Area Pass",
    desc: "Kansai Area Pass ตามที่ Klook ขาย นั่งรถไฟ Local, Rapid และ Special Rapid ของ JR West รอบโอซาก้า เกียวโต โกเบ นารา และฮิเมจิได้ไม่จำกัดเที่ยว พร้อม HARUKA จากสนามบินคันไซ",
  }),
  withKlookLocale(jrKansaiMiniPass, LOCALE, {
    title: "JR Kansai Mini Pass (3 วัน)",
    desc: "แบบ 3 วันที่ถูกกว่าสำหรับคนที่ไม่นั่ง HARUKA ใช้ได้เฉพาะรถไฟ Rapid และ Local ของ JR West รวม Kansai-Airport Rapid Service",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "JR Kansai Area Pass" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, lead }: { head: string[]; rows: ReactNode[][]; lead?: { label: string; text: ReactNode } }) {
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
            {lead && (
              <tr>
                <td className={styles.tdProvider} style={{ fontWeight: 700 }}>{lead.label}</td>
                <td className={styles.tdPrice} colSpan={head.length - 1} style={{ fontSize: "0.88rem" }}>{lead.text}</td>
              </tr>
            )}
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.88rem" }}>
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

export default function ThKansaiAreaPassPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);
  const [vsLead, ...vsRest] = vsWideRows;
  const [cmpLead, ...cmpRest] = compareRows;

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
              name: "WEST QR Kansai Area Pass",
              description: DESC,
              brand: "JR West",
              currency: "JPY",
              lowPrice: 2700,
              highPrice: 6700,
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
          <p className={styles.heroSubtitle}>ราคาแบบ 1 วันและ 3 วัน HARUKA จากสนามบินคันไซใช้ได้แค่ไหน และเมื่อไรที่ Kansai Wide Area Pass หรือบัตร ICOCA เป็นตัวเลือกที่ดีกว่า</p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการของ JR West", "เทียบกับ Kansai Wide Area Pass"].map((t) => (
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
            <strong>JR West Kansai Area Pass</strong> ราคา <strong>{QR_1_DAY} สำหรับ 1 วัน ¥4,700 สำหรับ 2 วัน ¥5,500 สำหรับ 3 วัน และ {QR_4_DAY} สำหรับ 4 วัน</strong> สำหรับผู้ใหญ่ (เด็ก 6–11 ปีครึ่งราคา) ตามหน้า WEST QR ทางการของ JR West ที่ตรวจสอบเมื่อ {CHECKED} พาสนี้ขายผ่านตัวแทนท่องเที่ยวในต่างประเทศเท่านั้น จึงไม่มีราคาแยกสำหรับซื้อในญี่ปุ่น พาส 1 วันราคา {QR_1_DAY} เท่ากับ HARUKA One-way Ticket จากสนามบินคันไซไปเกียวโต และถ้าไปกลับเกียวโต–นารา (เที่ยวละ ¥720) ในวันเดียวกัน พาสจะถูกกว่าตั๋วเที่ยวเดียว ¥1,440 ใช้กับรถไฟ JR West ระหว่าง <strong>เกียวโต โอซาก้า นารา โกเบ และสนามบินคันไซ</strong> รวมที่นั่งไม่จองของรถด่วนสนามบิน <strong>HARUKA</strong> แบบไม่จำกัดเที่ยว แต่ใช้กับชินคันเซ็นและสาย Kintetsu, Hankyu, Keihan, Nankai ไม่ได้ เลือก <strong>Kansai Wide Area Pass</strong> (¥12,000 สำหรับ 5 วัน) เฉพาะเมื่อคุณไปไกลกว่าฮิเมจิถึงโอกายามะ คิโนซากิออนเซ็น หรืออามาโนะฮาชิดาเตะ และใช้บัตร <strong>ICOCA</strong> แทนทั้งสองแบบถ้าคุณอยู่ในเมืองเดียวและนั่งรถไฟใต้ดิน
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1 วัน</p>
                <p className={styles.verdictStatValue}>{QR_1_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>4 วัน</p>
                <p className={styles.verdictStatValue}>{QR_4_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>HARUKA</p>
                <p className={styles.verdictStatValue}>รวม (ที่นั่งจอง 2 ครั้ง)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ชินคันเซ็น</p>
                <p className={styles.verdictStatValue}>ไม่รวม</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>JR West Kansai Area Pass</strong> ราคา <strong>{QR_1_DAY} สำหรับ 1 วัน</strong> ¥4,700 สำหรับ 2 วัน ¥5,500 สำหรับ 3 วัน และ <strong>{QR_4_DAY} สำหรับ 4 วัน</strong> (ผู้ใหญ่ เด็ก 6–11 ปีครึ่งราคา เป็น WEST QR Kansai Area Pass ของ JR West ตรวจสอบจาก westjr.co.jp เมื่อ {CHECKED}) นั่งที่นั่งไม่จองของ <strong>HARUKA ระหว่างสนามบินคันไซกับเท็นโนจิ ชินโอซาก้า และเกียวโต</strong> ได้ไม่จำกัดเที่ยว (พร้อมที่นั่งจอง 2 ครั้ง) และนั่งรถไฟ Special Rapid, Rapid และ Local ของ JR West รอบโอซาก้า เกียวโต โกเบ นารา และฮิเมจิได้ <strong>ใช้ไม่ได้</strong> กับชินคันเซ็น รถด่วนพิเศษอื่น Osaka Metro หรือรถไฟใต้ดินเกียวโต รถบัสในเมือง และรถไฟเอกชน Hankyu, Keihan, Kintetsu, Nankai พาสนี้คุ้มที่สุดเมื่อคุณ <strong>ลงที่สนามบินคันไซแล้วไปเกียวโต</strong> เพราะตั๋ว HARUKA เที่ยวเดียวไปเกียวโตก็ราคา ¥2,700 พาส 1 วันจึงราคาเท่ากัน และ JR เที่ยวอื่นในวันนั้นไม่ต้องจ่ายเพิ่ม แบบกระดาษหยุดขายเมื่อ 30 กันยายน 2026 พาสนี้พาคุณไปถึงซันโนมิยะสำหรับ <Link href="/guides/attractions/arima-onsen-day-trip" style={linkStyle}>ทริปอาริมะออนเซ็น 1 วัน (ภาษาอังกฤษ)</Link> ได้ แต่ใช้กับรถบัสหรือรถไฟใต้ดินโกเบจากซันโนมิยะไปออนเซ็นไม่ได้
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                ดู Kansai Area Pass บน Klook →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                ดูตั๋ว HARUKA เที่ยวเดียวแทน →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookSameDayCards heading="จองอะไรเพิ่มสำหรับวันเดียวกับ Kansai Area Pass" cards={sameDayCards} locale={LOCALE} />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>พาสเทียบตั๋วเที่ยวเดียว</span>
          <h2 className={styles.sectionTitle}>Kansai Area Pass คุ้มกับแผนเที่ยวของคุณไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            คุ้มในวันที่เริ่มด้วย HARUKA ไปเกียวโตหรือไปไกลถึงฮิเมจิ ไม่คุ้มในวันที่มีแค่ไปกลับโอซาก้า–เกียวโตหรือโอซาก้า–นารา ตามค่าโดยสารของ JR West ทริป 3 วัน สนามบินคันไซ → เกียวโต → นารา → โอซาก้า → สนามบินคันไซ ใช้ตั๋วเที่ยวเดียวรวม ¥6,620 เทียบกับพาส 3 วัน ¥5,500
          </p>
          <Table
            head={["แผนเที่ยว", "ตั๋วเที่ยวเดียว (ผู้ใหญ่)", "พาส", "ผลลัพธ์"]}
            lead={{ label: "สรุป", text: "ซื้อเมื่อเข้าทางเกียวโต มีวันไปฮิเมจิ หรือเดินทางระหว่างเมือง 3–4 วัน ไม่ต้องซื้อถ้ามีแค่ไปกลับโอซาก้า–เกียวโตหรือโอซาก้า–นาราเที่ยวเดียว" }}
            rows={itineraryRows.map((r) => [r.plan, r.singles, r.pass, r.result])}
          />
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>ตั๋ว JR เที่ยวเดียวราคาเท่าไร?</h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้ใหญ่ โอซาก้า–เกียวโต ¥580 เกียวโต–นารา ¥720 และโอซาก้า–ฮิเมจิ ¥1,460 บนรถไฟธรรมดาของ JR West ส่วน HARUKA เที่ยวเดียวจากสนามบินคันไซไปเกียวโตราคา ¥2,700
          </p>
          <Table
            head={["เส้นทาง", "ผู้ใหญ่ เที่ยวเดียว", "ใช้ Kansai Area Pass ได้ไหม?"]}
            lead={{ label: "สรุป", text: "ทุกเส้นทางในตารางใช้พาสได้ด้วยรถไฟธรรมดาของ JR หรือ HARUKA แต่ใช้กับชินคันเซ็นไม่ได้" }}
            rows={fareRows.map((r) => [r.route, r.fare, r.onPass])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — แหล่งข้อมูลทางการ: <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR West, WEST QR Kansai Area Pass</a>, <a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR West, WEST QR HARUKA One-way Ticket</a> (ค่าโดยสารสำหรับตั๋วที่ขายตั้งแต่ 1 พฤศจิกายน 2026), <a href={FARE_PDF_URL} target="_blank" rel="noopener noreferrer">JR West, ตารางค่าโดยสารเคฮันชิน (ค่าโดยสารพิเศษ ตั้งแต่ 1 เมษายน 2025)</a> และ <a href={HIMEJI_FARE_URL} target="_blank" rel="noopener noreferrer">ข่าวประชาสัมพันธ์ JR West 25 กุมภาพันธ์ 2026 (โอซาก้า–ฮิเมจิ ¥1,460)</a> ค่าโดยสารจากสถานีโอซาก้าไปนาราไม่อยู่ในรายการค่าโดยสารพิเศษ แถวของนาราจึงเริ่มที่เท็นโนจิ ค่าโดยสารเป็นราคาตั๋วกระดาษผู้ใหญ่ เด็กครึ่งราคา
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดู Kansai Area Pass บน Klook →
            </KlookLink>
          </div>
        </section>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>Kansai Area Pass คืออะไร?</h2>
          <p className={styles.bodyText}>
            เป็นพาสภูมิภาคของ JR West ที่มีพื้นที่ใช้งานเล็กที่สุดและถูกที่สุด และเป็นพาสที่นักท่องเที่ยวที่มาคันไซครั้งแรกส่วนใหญ่ต้องใช้จริง ภายใน 1–4 วันติดกัน คุณนั่งรถไฟธรรมดาของ JR West (Local, Rapid และ Special Rapid) ได้ไม่จำกัดเที่ยวในพื้นที่ที่ JR West ระบุว่ารวม <strong>โอซาก้า เกียวโต โกเบ นารา ฮิเมจิ วากายามะ โอตสึ สึรุงะ และอิงะอุเอโนะ</strong> และยังได้สิ่งที่บัตร IC ทั่วไปให้ไม่ได้ คือ Kansai-Airport Express HARUKA ที่นั่งไม่จองแบบไม่จำกัดเที่ยว และที่นั่งจองรถธรรมดา 2 ครั้ง
          </p>
          <p className={styles.bodyText}>
            ปี 2026 มีการเปลี่ยนแปลงที่สำคัญกว่าราคา หน้าเว็บของ JR West ระบุว่า Kansai Area Pass <strong>หยุดขายตั้งแต่ 30 กันยายน 2026</strong> และพาสที่ซื้อก่อนวันนั้นยังใช้ได้จนครบระยะเวลา สินค้านี้ไม่ได้หายไป แต่เปลี่ยนเป็น <strong>WEST QR Kansai Area Pass</strong> ใช้ได้ 1–4 วันเหมือนเดิม ขายเป็น QR code ที่ลงทะเบียนออนไลน์แล้วสแกนที่ประตูตรวจตั๋ว ในราคาที่ต่ำลงเล็กน้อย ถ้าคุณอ่านคู่มือเก่าที่บอกว่า 1 วัน ¥2,800 นั่นคือราคาที่ไม่ใช้แล้ว
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>JR Kansai Area Pass ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้ใหญ่ {QR_1_DAY} สำหรับ 1 วัน ¥4,700 สำหรับ 2 วัน ¥5,500 สำหรับ 3 วัน และ {QR_4_DAY} สำหรับ 4 วันติดกัน เด็กอายุ 6–11 ปีครึ่งราคาพอดี JR West ประกาศราคา WEST QR pass ไว้ชุดเดียว ไม่มีราคาแยกตามช่องทางขาย
          </p>
          <Table
            head={["ระยะเวลา", "ผู้ใหญ่ (WEST QR)", "เด็ก 6–11 ปี", "ผู้ใหญ่ต่อวัน", "พาสกระดาษรุ่นเก่า ผู้ใหญ่"]}
            lead={{ label: "สรุป", text: `แบบ 1 วัน (${QR_1_DAY}) ราคาเท่ากับ HARUKA เที่ยวเดียวไปเกียวโต แบบ 4 วัน (${QR_4_DAY}) ถูกที่สุดต่อวันที่ ¥1,675` }}
            rows={priceRows.map((r) => [r.days, r.qrAdult, r.qrChild, r.perDay, r.oldAdult])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — แหล่งข้อมูลทางการ: <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR West, WEST QR Kansai Area Pass</a> คอลัมน์พาสรุ่นเก่า (JR West: &quot;หยุดขายตั้งแต่ 30 กันยายน 2026&quot;) มีไว้ให้คุณดูออกว่าราคาไหนเป็นราคาเก่า ราคาต่อวันคือราคาผู้ใหญ่หารด้วยจำนวนวัน พาสใช้ได้ตั้งแต่ 04:00 น. ของวันเริ่มต้นถึง 24:00 น. ของวันสุดท้าย ตามเวลาญี่ปุ่น ในวันที่ติดกัน
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดู Kansai Area Pass บน Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            ก่อนซื้อ ให้ตรวจสอบสองเรื่องในหน้าสินค้าที่ตารางค่าโดยสารไม่ได้บอก คือช่วงเวลาที่ใช้แลกใบยืนยันการจองตรงกับวันบินของคุณหรือไม่ และเงื่อนไขคืนเงินของผู้ขาย เมื่อกดปุ่ม &quot;Use ticket&quot; (ใช้ตั๋ว) แล้ว JR West ไม่คืนเงินใด ๆ
          </p>
          <KlookTripPrep
            label="จองในทริปเดียวกัน"
            heading="ซื้อ Kansai Area Pass แล้วควรจองอะไรเพิ่ม?"
            intro="พาสใช้เดินทางระหว่างเมือง ส่วนที่เหลือของทริปคือที่พักใกล้สาย JR ที่พาสใช้ได้ วันเที่ยวนาราหรือฮิเมจิพร้อมไกด์ และอินเทอร์เน็ตมือถือสำหรับ QR code ที่นี่ไม่ได้ระบุราคา เปิดหน้าสินค้าแต่ละรายการเพื่อดูราคาปัจจุบัน"
            items={tripPrepItems}
          />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Area, Wide หรือ ICOCA</span>
          <h2 className={styles.sectionTitle}>Kansai Area Pass กับ Kansai Wide Area Pass แบบไหนดีกว่า?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Kansai Area Pass สำหรับทริปที่อยู่ระหว่างเกียวโต โอซาก้า นารา โกเบ และฮิเมจิ เพราะแบบ 4 วัน ({QR_4_DAY}) ถูกกว่า Kansai Wide Area Pass แบบ 5 วัน (¥12,000) อยู่ ¥5,300 Wide pass จะคุ้มราคาก็ต่อเมื่อมีวันเดินทางไกล เช่น นั่งชินคันเซ็นซันโยไปโอกายามะ หรือนั่งรถด่วนพิเศษแบบที่นั่งจองไปคิโนซากิออนเซ็น อามาโนะฮาชิดาเตะ หรือชิราฮามะ ส่วน ICOCA ไม่ใช่พาสเลย แต่จ่ายค่าโดยสารทุกเที่ยว จึงเหมาะกับการพักในเมืองเดียว
          </p>
          <Table
            head={["", "พื้นที่ใช้งาน", "ชินคันเซ็น", "ราคา (ผู้ใหญ่)", "เหมาะกับ"]}
            lead={{ label: vsLead.option, text: `${vsLead.area} / ${vsLead.shinkansen} / ${vsLead.price}` }}
            rows={vsRest.map((r) => [r.option, r.area, r.shinkansen, r.price, r.who])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — แหล่งข้อมูลทางการ: <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR West, WEST QR Kansai Area Pass</a>, <a href={WIDE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR West, Kansai WIDE Area Pass</a> และ <a href={ICOCA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR West, คู่มือ ICOCA</a> วิธีได้แต่ละแบบต่างกัน Area Pass เป็นใบยืนยันการจอง WEST QR ที่ขายผ่านตัวแทนท่องเที่ยวในต่างประเทศเท่านั้น และไม่ต้องแลกตั๋ว Wide pass เป็น Exchange Order จากตัวแทนในต่างประเทศ หรือจองผ่าน JR-WEST ONLINE TRAIN RESERVATION แล้วรับที่สถานี JR West โดยแสดงพาสปอร์ต ส่วน ICOCA ลายสำหรับนักท่องเที่ยวซื้อได้ที่ห้องขายตั๋ว JR สถานีสนามบินคันไซ Wide pass ใช้ได้ตั้งแต่ 00:00 น. ของวันแรก ส่วน Area Pass ตั้งแต่ 04:00 น. ทั้งสองแบบใช้กับชินคันเซ็นโทไกโดไปโตเกียวไม่ได้
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            ไม่ว่าจะเลือกแบบไหน วันที่ทำให้พาสคุ้มคือวันเที่ยวไปกลับ <Link href="/guides/attractions/himeji-castle-day-trip" style={linkStyle}>ทริปปราสาทฮิเมจิ 1 วัน (ภาษาอังกฤษ)</Link> อยู่ที่ขอบสุดของพื้นที่ Area Pass ส่วน <Link href="/guides/attractions/amanohashidate-ine-day-trip" style={linkStyle}>ทริปอามาโนะฮาชิดาเตะ 1 วัน (ภาษาอังกฤษ)</Link> ต้องใช้ Wide pass
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>รวมและไม่รวม</span>
          <h2 className={styles.sectionTitle}>Kansai Area Pass ใช้กับชินคันเซ็น HARUKA และรถไฟใต้ดินได้ไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ใช้กับ HARUKA ได้ (ที่นั่งไม่จองไม่จำกัดเที่ยว ที่นั่งจอง 2 ครั้ง) แต่ใช้กับชินคันเซ็นและรถไฟใต้ดินไม่ได้ นอกจาก HARUKA แล้วใช้ได้เฉพาะรถไฟธรรมดาของ JR West (Special Rapid, Rapid และ Local) บนสาย JR Kyoto, Kobe, Nara, Yamatoji และ Kansai Airport ไม่รวมรถด่วนพิเศษอื่น รถบัส หรือรถไฟเอกชน สิ่งที่ไม่รวมมักเป็นตัวตัดสินว่าจะซื้อพาสนี้หรือไม่ มากกว่าสิ่งที่รวม
          </p>
          <Table head={["บริการ", "ใช้พาสได้ไหม", "หมายความว่า"]} lead={{ label: "สรุป", text: lineLead }} rows={lineRows.map((r) => [r.service, r.allowed, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — แหล่งข้อมูลทางการ: <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR West, WEST QR Kansai Area Pass</a> (ตารางการใช้กับขบวนรถ) การเดินทางในเมืองที่พาสไม่รวมอยู่ใน <Link href="/guides/transport/osaka-transportation" style={linkStyle}>คู่มือการเดินทางในโอซาก้า (ภาษาอังกฤษ)</Link> และ <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>คู่มือการเดินทางในเกียวโต (ภาษาอังกฤษ)</Link> ทั้งสองคู่มือรวมรถไฟใต้ดิน รถบัส และตัวเลือก <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>บัตร IC (ภาษาอังกฤษ)</Link> ที่คุณยังต้องใช้เพิ่ม
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>จากสนามบิน</span>
          <h2 className={styles.sectionTitle}>ใช้ Kansai Area Pass นั่ง HARUKA จากสนามบินคันไซอย่างไร?</h2>
          <p className={styles.bodyText}>สแกน QR code ที่ประตูตรวจตั๋ว JR แล้วขึ้น HARUKA ขบวนไหนก็ได้ ที่นั่งไม่จองระหว่างสนามบินคันไซกับเท็นโนจิ ชินโอซาก้า และเกียวโตใช้ได้ไม่จำกัดเที่ยว และรวมที่นั่งจองรถธรรมดา 2 ครั้ง (Green Car ต้องจ่ายเพิ่ม)</p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>Kansai Area Pass ใช้กับชินคันเซ็นได้ไหม?</h3>
          <p className={styles.bodyText}>ไม่ได้ JR West ระบุว่าพาสนี้ &quot;ใช้กับชินคันเซ็นไม่ได้ แม้จะจ่ายค่าโดยสารเพิ่ม&quot; พาสคันไซที่รวมชินคันเซ็นคือ Kansai Wide Area Pass ซึ่งใช้ที่นั่งจองชินคันเซ็นซันโยระหว่างชินโอซาก้ากับโอกายามะได้</p>
          <p className={styles.bodyText}>
            ในวันที่เดินทางถึง ให้กด &quot;Use ticket&quot; (ใช้ตั๋ว) หลัง 04:00 น. สแกน QR code ที่ประตูตรวจตั๋ว JR ที่สนามบินคันไซ แล้วขึ้น HARUKA ไป <strong>เท็นโนจิ</strong> <strong>ชินโอซาก้า</strong> หรือ <strong>เกียวโต</strong> การนั่งชินคันเซ็นจากชินโอซาก้าไปเกียวโตต้องซื้อตั๋วแยกแม้ในวันที่พาสใช้ได้ ถ้าแผนเที่ยวมีชินคันเซ็นไปฮิโรชิม่า <Link href="/guides/transport/kansai-hiroshima-area-pass" style={linkStyle}>Kansai Hiroshima Area Pass (ภาษาอังกฤษ)</Link> คือพาสที่รวมชินคันเซ็น เส้นแบ่งระหว่างสองพาสนี้คือฮิโรชิม่า
          </p>
          <p className={styles.bodyText}>
            ที่นั่งจอง 2 ครั้งควรใช้ในวันที่คุณลากกระเป๋าเดินทาง JR West ระบุว่าจองได้บนเว็บไซต์ WEST-QR ตั้งแต่ 30 วันก่อนขึ้นรถ และจองบนรถไฟ ที่เครื่องขายตั๋ว หรือที่เคาน์เตอร์ขายตั๋วไม่ได้ จึงควรจองก่อนเดินทาง ตรวจสอบ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            ถ้าจะไปนัมบะและฝั่งโดทงโบริของโอซาก้า HARUKA ไม่ช่วย เพราะเส้นทางนั้นคือ Nankai ซึ่งพาสใช้ไม่ได้ <Link href="/guides/transport/haruka-vs-nankai-rapit" style={linkStyle}>เทียบ HARUKA กับ Nankai Rapi:t (ภาษาอังกฤษ)</Link> เทียบสองเส้นทางตามปลายทาง ไม่ใช่ตามค่าโดยสาร และ <Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>คู่มือเดินทางจากสนามบินโอซาก้า (ภาษาอังกฤษ)</Link> รวมสนามบินอิตามิด้วย สรุปคือ ที่พักของคุณเป็นตัวตัดสินว่าพาสนี้เป็นตั๋วสนามบินที่เหมาะหรือไม่
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              Kansai Area Pass พร้อม HARUKA →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ตั๋ว HARUKA เที่ยวเดียว →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เปรียบเทียบ</span>
          <h2 className={styles.sectionTitle}>พาสคันไซแบบไหนใช้แทน Kansai Area Pass ได้บ้าง?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ทริปเฉพาะคันไซที่ใช้ JR และ HARUKA ให้ซื้อ Kansai Area Pass ส่วน KINTETSU RAIL PASS เหมาะกับการไปนาราด้วย Kintetsu, Kansai-Hiroshima Area Pass เหมาะกับการนั่งชินคันเซ็นไปทางตะวันตก และ KANSAI ONE PASS เป็นบัตร IC ไม่ใช่พาส
          </p>
          <Table
            head={["ตัวเลือก", "ราคา (ผู้ใหญ่)", "ใช้กับอะไรได้", "ควรเลือกเมื่อไร"]}
            lead={{ label: cmpLead.option, text: `${cmpLead.covers} ${cmpLead.pick}` }}
            rows={cmpRest.map((r) => [r.option, r.price, r.covers, r.pick])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: หน้า Kansai Area, HARUKA One-way, Kansai Mini และ Kansai WIDE Area Pass ของ JR West (westjr.co.jp) และประกาศ KANSAI ONE PASS เมื่อ {CHECKED_ISO} หน้า Kansai-Hiroshima Area Pass และ Kintetsu (kintetsu.co.jp/foreign/english/ticket/) เมื่อ {R04_CHECKED} พาสทั่วประเทศจาก japanrailpass.net และ Osaka Amazing Pass จากเว็บไซต์ทางการ เมื่อ {PREV_CHECKED} ถ้านาราเป็นวันเที่ยวหลัก <Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>คู่มือ KINTETSU RAIL PASS (ภาษาอังกฤษ)</Link> คำนวณว่าเมื่อไรพาส Kintetsu ถูกกว่าตั๋วเที่ยวเดียว สำหรับหนึ่งวันในโอซาก้า <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>คู่มือ Osaka Amazing Pass (ภาษาอังกฤษ)</Link> อธิบายพาสเมืองที่ Kansai Area Pass ใช้แทนไม่ได้ สำหรับคิโนซากิออนเซ็น Kansai Area Pass ใช้กับรถด่วนพิเศษ Konotori ไม่ได้ ส่วน WIDE pass รวมที่นั่งจองของขบวนนี้ <Link href="/guides/attractions/kinosaki-onsen-day-trip" style={linkStyle}>คู่มือทริปคิโนซากิออนเซ็น 1 วัน (ภาษาอังกฤษ)</Link> มีเวลา Konotori จากโอซาก้า HARUKA One-way Ticket คือตั๋วเที่ยวเดียวราคาพิเศษสำหรับผู้ถือพาสปอร์ตต่างประเทศที่เข้าญี่ปุ่นด้วยสถานะ Temporary Visitor ค่าโดยสารที่แสดงใช้กับตั๋วที่ขายตั้งแต่ 1 พฤศจิกายน 2026 ซึ่งเป็นวันที่ JR West ปรับราคาขึ้น ตอนนี้ตั๋วเที่ยวเดียวไปเกียวโตจึงราคาเท่ากับพาส 1 วัน จุดคุ้มทุนของพาสทั่วประเทศดูได้ใน <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>คู่มือ JR Pass (ภาษาอังกฤษ)</Link> สำหรับเส้นทางวงรอบที่เริ่มจากโตเกียวและเข้าคันไซผ่านคานาซาวะ <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>Hokuriku Arch Pass (ภาษาอังกฤษ)</Link> แบบ 7 วันใช้กับ Thunderbird และ HARUKA ได้ รวมถึงชินคันเซ็นโฮคุริคุ สำหรับฮิโรชิม่าซึ่งพาสคันไซแบบไหนก็ไปไม่ถึง <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>คู่มือชินคันเซ็นโอซาก้า–ฮิโรชิม่า (ภาษาอังกฤษ)</Link> เทียบ Kansai-Hiroshima Area Pass ของ JR West กับตั๋วเที่ยวเดียว ICOCA &amp; HARUKA ไม่ได้รวมไว้ เพราะหน้าภาษาอังกฤษปัจจุบันของ JR West ไม่แสดงราคาในวันที่ตรวจสอบ
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>คุ้มไหม</span>
          <h2 className={styles.sectionTitle}>Kansai Area Pass คุ้มไหมสำหรับเที่ยวเกียวโตและโอซาก้า?</h2>
          <p className={styles.bodyText}>
            คุ้ม ถ้าคุณบินเข้าสนามบินคันไซและเดินทางระหว่างเกียวโตกับโอซาก้าด้วย JR ไม่คุ้มถ้าอยู่เมืองเดียวและนั่งรถไฟใต้ดิน ในตัวอย่าง 1 วัน (สนามบินคันไซไปเกียวโต) HARUKA เที่ยวเดียวราคา ¥2,700 เท่ากับพาส 1 วัน ในตัวอย่าง 3 วัน (เข้าเกียวโต ออกจากโอซาก้า) ตั๋วเที่ยวเดียวสองใบรวม ¥4,600 เทียบกับพาส 3 วัน ¥5,500 ถ้านั่ง JR ระหว่างทางอีก ¥900 ก็คุ้มแล้ว
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <Table
              head={["ทริป", "รวมตั๋ว HARUKA เที่ยวเดียว", "พาสจำนวนวันเท่ากัน", "ผลลัพธ์"]}
              lead={{ label: "สรุป", text: "ซื้อพาสถ้าเข้าทางเกียวโต หรือถ้าช่วงสนามบินทั้งไปและกลับอยู่ในวันที่ใช้พาส ไม่ต้องซื้อถ้าช่วงสนามบินไปเท็นโนจิหรือโอซาก้าเป็นการนั่ง JR ครั้งเดียว" }}
              rows={breakEvenRows.map((r) => [r.trip, r.singles, r.pass, r.result])}
            />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — แหล่งข้อมูลทางการ: <a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">JR West, WEST QR HARUKA One-way Ticket</a> (ค่าโดยสารผู้ใหญ่สำหรับตั๋วที่ขายตั้งแต่ 1 พฤศจิกายน 2026) และ <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">WEST QR Kansai Area Pass</a> ตั๋วนี้เป็นตั๋วเที่ยวเดียว ไปกลับจึงต้องใช้สองใบ และพาสใช้ขากลับได้ก็ต่อเมื่อช่วงสนามบินทั้งสองขาอยู่ในวันที่ติดกันของพาส สำหรับการเดินทางเกียวโต–โอซาก้า โอซาก้า–นารา หรือโอซาก้า–ฮิเมจิที่เหลือ ให้ตรวจสอบค่าโดยสารของสถานีที่คุณจะใช้ในระบบค้นหาค่าโดยสารของ JR West เพราะหน้านี้ไม่ได้ระบุค่าโดยสารปกติเหล่านั้น
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              พาสคุ้ม: เช็ก Kansai Area Pass →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ตั๋วเที่ยวเดียวคุ้มกว่า: เช็กตั๋ว HARUKA →
            </KlookLink>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Table head={["แผนของคุณ", "คำแนะนำ", "เหตุผล"]} rows={worthRows.map((r) => [r.plan, r.verdict, r.why])} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            มีสองเรื่องที่ควรตรวจสอบในหน้าสินค้าแทนที่นี่ เพราะไม่ใช่ค่าโดยสารที่ประกาศไว้ คือพาสที่ขายสำหรับวันเดินทางของคุณเป็นแบบ QR code หรือแบบ Exchange Order ที่ต้องไปรับในญี่ปุ่น และเงื่อนไขการยกเลิก ซึ่งสำคัญเพราะพาสใช้ได้เฉพาะวันที่ติดกันตามที่คุณระบุ ใบยืนยันการจองมักขายพร้อมช่วงเวลาที่ใช้แลกได้ ไม่ใช่วันที่ตายตัว จึงควรตรวจสอบช่วงนั้นกับเที่ยวบินของคุณก่อนซื้อ
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              เช็ก Kansai Area Pass →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              เทียบกับตั๋ว HARUKA เที่ยวเดียว →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>จุดคุ้มทุน</span>
          <h2 className={styles.sectionTitle}>แผนเที่ยวแบบไหนที่ทำให้พาสคุ้ม?</h2>
          <p className={styles.bodyText}>
            สิ่งที่นักท่องเที่ยวควรเทียบไม่ใช่ค่าโดยสารปกติ แต่เป็น <strong>HARUKA One-way Ticket</strong> ราคาพิเศษ ซึ่งเป็นตั๋วสนามบินเที่ยวเดียวที่ถูกที่สุดที่ JR West ขายให้ผู้ถือพาสปอร์ตต่างประเทศอย่างเป็นทางการ สำหรับตั๋วที่ขายตั้งแต่ <strong>1 พฤศจิกายน 2026</strong> ราคาคือ เท็นโนจิ ¥1,600 โอซาก้าหรือชินโอซาก้า ¥1,900 เกียวโต ¥2,700 โกเบ ¥2,300 และนารา ¥2,200 พาสต้องถูกกว่าตัวเลขเหล่านี้จึงจะคุ้ม
          </p>
          <p className={styles.bodyText}>
            <strong>เข้าทางเกียวโต พาส 1 วัน ({QR_1_DAY})</strong> ตั๋วเที่ยวเดียวไปเกียวโตราคา ¥2,700 เท่ากับราคาพาสพอดี คุณไม่ต้องจ่ายเพิ่มสำหรับช่วงสนามบิน และ JR ทุกเที่ยวในวันนั้น รวมถึงเกียวโต–นาราหรือเกียวโต–โอซาก้า ก็ไม่ต้องจ่ายเพิ่ม
          </p>
          <p className={styles.bodyText}>
            <strong>เที่ยวคันไซ 4 วัน พาส 4 วัน ({QR_4_DAY})</strong> บินเข้าและออกที่คันไซ เข้าเกียวโต ¥2,700 และออกจากโอซาก้า ¥1,900 รวม ¥4,600 จาก {QR_4_DAY} ใช้ไปกับช่วงสนามบินสองขาแล้ว ส่วนที่เหลือ ¥2,100 ต้องมาจากการเดินทางระหว่างเมืองใน 4 วัน เช่น เกียวโตไปนารา โอซาก้าไปโกเบ โอซาก้าไปฮิเมจิ ซึ่งเกินได้ไม่ยากถ้าคุณนั่ง JR แต่ <em>ไม่คุ้ม</em> ถ้าใช้วันเหล่านั้นอยู่ในเมืองเดียวด้วยรถไฟใต้ดิน เพราะพาสใช้กับรถไฟใต้ดินไม่ได้ สำหรับวันที่อยู่แต่ในโอซาก้า <Link href="/guides/transport/osaka-metro-pass" style={linkStyle}>Osaka Metro Pass (Enjoy Eco Card) (ภาษาอังกฤษ)</Link> ใช้กับรถไฟใต้ดินและรถบัสในเมืองได้หนึ่งวันตามปฏิทิน ในทริป 5 วันที่มีหนึ่งวันอยู่ในโอซาก้า พาส 3 วันสำหรับ 3 วันสุดท้ายถูกกว่าพาส 4 วัน การคำนวณรายวันอยู่ใน <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>แผนเที่ยวคันไซ 5 วัน (ภาษาอังกฤษ)</Link>
          </p>
          <p className={styles.bodyText}>
            <strong>กรณีที่ไม่คุ้ม</strong> ทริปที่มีวันว่างอยู่กลางช่วงพาส ทริปที่ไปนาราด้วย Kintetsu และไปอาราชิยามะด้วย Hankyu หรือทริปที่มีชินคันเซ็นไปโตเกียว ทั้งสามกรณีคำนวณอย่างไรก็ไม่คุ้มตั้งแต่ต้น ค่าโดยสารตรวจสอบเมื่อ {CHECKED} ถ้าต้องการเที่ยวแค่หนึ่งวัน <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={linkStyle}>ทัวร์เกียวโตและนารา 1 วันจากโอซาก้า (ภาษาอังกฤษ)</Link> รวมรถบัสแล้ว วันนั้นจึงไม่ต้องใช้พาสรถไฟ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>คนละสินค้า</span>
          <h2 className={styles.sectionTitle}>KANSAI ONE PASS หยุดขายแล้วหรือยัง?</h2>
          <p className={styles.bodyText}>
            กำลังทยอยหยุดขาย และไม่เคยเป็นพาสรถไฟของ JR KANSAI ONE PASS เป็นบัตร IC เติมเงินสำหรับนักท่องเที่ยว ในประกาศร่วมลงวันที่ 23 ธันวาคม 2024 JR West, Hankyu, Kintetsu, Keihan, Nankai, Hanshin, Osaka Metro, Osaka City Bus และสำนักงานขนส่งของเมืองเกียวโตและโกเบ แจ้งว่าแต่ละบริษัทจะหยุดขายตั้งแต่ 1 พฤศจิกายน 2025 เมื่อสต็อกหมด และจะหยุดขายทั้งหมดภายในสิ้นปีงบประมาณ 2026 (มีนาคม 2027)
          </p>
          <p className={styles.bodyText}>
            ประกาศเดียวกันระบุว่าบัตรที่ซื้อไปแล้วยังใช้เป็นบัตร IC เติมเงินได้ ส่วนสิทธิพิเศษที่ร้านค้าและสถานที่ท่องเที่ยวสิ้นสุดพร้อมปีงบประมาณ 2026 ประกาศไม่ได้ระบุบัตรที่มาแทน แต่ให้เหตุผลว่าตั๋วอิเล็กทรอนิกส์ของ KANSAI MaaS สำหรับนักท่องเที่ยวแพร่หลายมากขึ้น บัตรนี้ไม่เคยใช้แทน Kansai Area Pass ได้ เพราะบัตร IC จ่ายค่าโดยสารทุกเที่ยว ส่วนพาสใช้แทนค่าโดยสารเหล่านั้น ถ้าจะจ่ายตามการใช้จริง ICOCA ทำหน้าที่เดียวกัน
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — แหล่งข้อมูลทางการ: <a href={KOP_NOTICE_URL} target="_blank" rel="noopener noreferrer">ประกาศร่วมวันที่ 23 ธันวาคม 2024 (JR West, Hankyu, Kintetsu, Keihan, Nankai, Hanshin, Osaka Metro และอื่น ๆ) บน hanshin.co.jp</a>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การซื้อ</span>
          <h2 className={styles.sectionTitle}>ซื้อและแลก Kansai Area Pass ได้ที่ไหน?</h2>
          <p className={styles.bodyText}>
            ซื้อเป็นใบยืนยันการจอง WEST-QR จากตัวแทนท่องเที่ยวในต่างประเทศก่อนเดินทาง และไม่ต้องแลกอะไรในญี่ปุ่น JR West ระบุว่าซื้อพาสนี้จากตัวแทนท่องเที่ยวในญี่ปุ่นหรือผ่าน JR-WEST ONLINE TRAIN RESERVATION ไม่ได้ และไม่มีขายที่สถานี
          </p>
          <ol className={styles.bodyText} style={{ paddingLeft: "1.25rem" }}>
            <li>ซื้อใบยืนยันการจองจากตัวแทนท่องเที่ยวในต่างประเทศ (Klook เป็นหนึ่งในนั้น)</li>
            <li>ลงทะเบียนข้อมูลใบยืนยันการจองบนเว็บไซต์ WEST-QR ที่พิมพ์อยู่บนใบนั้น</li>
            <li>จองที่นั่ง HARUKA 2 ครั้งบนเว็บไซต์เดียวกัน ตั้งแต่ 30 วันก่อนขึ้นรถ</li>
            <li>ในวันแรก กด &quot;Use ticket&quot; (ใช้ตั๋ว) หลัง 04:00 น. แล้วสแกน QR code ที่ประตูตรวจตั๋ว</li>
          </ol>
          <p className={styles.bodyText}>
            การเปลี่ยนแปลงและคืนเงินก่อนกด &quot;Use ticket&quot; ทำผ่านตัวแทนที่คุณซื้อ ซึ่งอาจเก็บค่าธรรมเนียมของตัวเอง หลังกด &quot;Use ticket&quot; แล้ว JR West ไม่คืนเงิน รวมถึงกรณีรถไฟล่าช้าหรือหยุดให้บริการ ต้องใช้สมาร์ตโฟนที่มีอินเทอร์เน็ต (แสดงจากโทรศัพท์ของผู้ร่วมเดินทางก็ได้) ผู้มีสิทธิ์ใช้คือผู้ถือพาสปอร์ตที่ออกโดยรัฐบาลต่างประเทศและเข้าญี่ปุ่นด้วยสถานะ Temporary Visitor คนสัญชาติญี่ปุ่นใช้ไม่ได้ พาสกระดาษรุ่นเก่าที่ขายถึง 30 กันยายน 2026 คือแบบที่ต้องนำ Exchange Order ไปแลกที่สถานี JR West ตรวจสอบเมื่อ {CHECKED} จาก <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">westjr.co.jp</a>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ซื้อใบยืนยันการจอง Kansai Area Pass →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเกี่ยวกับ JR Kansai Area Pass" />

        <KlookTourPicks
          heading="เทียบพาสรถไฟคันไซสองแบบ"
          intro="ทั้งสองรายการคือพาสของ JR West ที่อธิบายไว้ข้างบน ชำระเงินได้ในหน้าภาษาไทย Area Pass รวม HARUKA ส่วน Mini Pass ถูกกว่าแต่ไม่รวม HARUKA เปิดหน้าสินค้าเพื่อดูราคาปัจจุบันตามวันเดินทางของคุณ"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/kinosaki-onsen-day-trip", title: "ทริปคิโนซากิออนเซ็น 1 วัน (2026): จากโอซาก้า พาสออนเซ็น และเรียวกัง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/kumano-kodo-tour", title: "ทัวร์คุมาโนะโคโด (2026): ทริป 1 วัน เส้นทางนากาเฮจิ และระยะเดิน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/amanohashidate-ine-day-trip", title: "ทริปอามาโนะฮาชิดาเตะ 1 วัน (2026): บ้านเรืออิเนะ ทัวร์ และรถไฟจากเกียวโต (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/hiroshima-peace-memorial-tours", title: "ทัวร์อนุสรณ์สันติภาพฮิโรชิม่า: ไกด์ พิพิธภัณฑ์ และตั๋ว (ภาษาอังกฤษ)" },
            { href: "/guides/transport/kintetsu-rail-pass", title: "KINTETSU RAIL PASS (2026): ราคาและคุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "แผนเที่ยวโอซาก้า เกียวโต 3 วัน (2026): รายวันและการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/himeji-castle-day-trip", title: "ทริปปราสาทฮิเมจิ 1 วัน (2026): ค่าเข้า ¥2,500 และเวลา (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "ทัวร์เกียวโตและนารา 1 วันจากโอซาก้า (2026): ควรจองแบบไหน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "ทริปโกเบ 1 วันจากโอซาก้า (2026): เส้นทาง เนื้อโกเบ และแผนหนึ่งวัน (ภาษาอังกฤษ)" },
            { href: "/guides/transport/haruka-vs-nankai-rapit", title: "HARUKA กับ Nankai Rapi:t (2026): รถไฟจากสนามบินคันไซแบบไหนดี (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-airport-transfer", title: "คู่มือเดินทางจากสนามบินโอซาก้า (2026): KIX และ ITM เข้าเมือง (ภาษาอังกฤษ)" },
            { href: "/guides/transport/kyoto-transportation", title: "การเดินทางในเกียวโต (2026): รถบัส รถไฟ และแท็กซี่ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-transportation", title: "การเดินทางในโอซาก้า (2026): รถไฟใต้ดิน รถไฟ และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/transport/jr-pass-guide", title: "คู่มือ JR Pass 2026: ราคา คุ้มไหม และวิธีซื้อ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-metro-pass", title: "Osaka Metro Pass กับ Enjoy Eco Card (2026): ซื้อแบบไหนดี (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "Osaka Amazing Pass 2026: ¥3,500 คุ้มไหม และแผน 1 วัน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/nara-day-trip", title: "ทริปนารา 1 วัน (2026): จากโอซาก้าหรือเกียวโต และค่าเข้าวัดโทไดจิ (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "ทริปฮิโรชิม่าและมิยาจิมะ 1 วัน (2026): วันเดียวพอไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "เที่ยวโอซาก้า (2026): ที่ไหนใช้พาสคุ้ม ที่ไหนไม่คุ้ม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "สถานที่ท่องเที่ยวอื่น ๆ ในญี่ปุ่น (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จากช่วงสนามบิน สู่การเดินทางทั่วคันไซ</h2>
            <p className={styles.ctaBannerDesc}>นั่งรถไฟ JR West รอบโอซาก้า เกียวโต โกเบ นารา และฮิเมจิได้ 1–4 วัน พร้อม HARUKA จากสนามบินคันไซ ถ้าช่วงสนามบินเป็นการนั่ง JR ครั้งเดียวของคุณ ให้ซื้อตั๋วเที่ยวเดียวแทน</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดู Kansai Area Pass →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋ว HARUKA →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
