import Head from "next/head";
import Link from "next/link";
import EsimUseCaseTable from "../../../../components/EsimUseCaseTable";
import EsimBuyGuide from "../../../../components/EsimBuyGuide";
import { esimPicksCopy } from "../../../../lib/esim-picks-copy";
import styles from "../../../../styles/BestEsimJapan.module.css";
import tools from "../../../../styles/Tools.module.css";
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
import SimbyeOffer from "../../../../components/SimbyeOffer";
import { simCards } from "../../../../lib/sim-cards";
import {
  allEsimPlans,
  cheapestAtLeastGb,
  cheapestPlan,
  cheapestUnlimited,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceAtLeastLabel,
  priceFromLabel,
  unlimitedFromLabel,
  type EsimPlanRow,
  type EsimProviderId,
} from "../../../../lib/esim-prices";
import { klookEsim } from "../../../../lib/klook-links";
import { thKlookEsim } from "../../../../lib/klook-links-th";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

/**
 * Thai edition of /guides/esim/best-esim-japan. Mirrors the English page block by
 * block as of 2026-11-05 — same sections, tables, FAQ and Klook CTAs in the same
 * places — and reads every price from lib/esim-prices.ts exactly as the English page
 * does. No figure here that the English page (or its data) does not carry.
 */

const ROUTE = "/th/guides/esim/best-esim-japan";
const TITLE = "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจและ Klook";
const DESC =
  "eSIM ญี่ปุ่น 2026: เทียบราคา เครือข่าย และการโทรของ 5 ผู้ให้บริการ กับ eSIM ของ Klook";

const LOCALE = "th" as const;

const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "19 Oct 2026" (the English constants' format) -> "2026-10-19", so dateLabel can read it. */
function isoOfEnDate(s: string): string {
  const [d, mon, y] = s.split(" ");
  const m = EN_MONTHS.indexOf(mon) + 1;
  return `${y}-${String(m).padStart(2, "0")}-${String(Number(d)).padStart(2, "0")}`;
}

const latest = latestCheckedAt();
const pricesCheckedAt = latest ? dateLabel(latest.slice(0, 10), LOCALE) : "ยังไม่ได้ตรวจสอบ";
// The day every provider term on the English page was read (its SPECS_CHECKED, 29 Oct 2026).
const SPECS_CHECKED = dateLabel("2026-10-29", LOCALE);
const KLOOK_CHECKED = dateLabel(isoOfEnDate(klookEsim.checkedAt), LOCALE);
const KLOOK_SPECS_CHECKED = dateLabel(isoOfEnDate(klookEsim.specsCheckedAt), LOCALE);
// Simbye joined after the others, so its rows have their own date (the English SIMBYE_SPECS_CHECKED_AT).
const SIMBYE_CHECKED = dateLabel("2026-11-05", LOCALE);

// English-only for now, so every link to it says so.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

/** "Unlimited / 7 days" -> "ไม่จำกัด / 7 วัน". The figures are untouched. */
function planName(name: string): string {
  return name.replace(/^Unlimited/, "ไม่จำกัด").replace(/(\d+) days?$/, "$1 วัน");
}

const HOLAFLY_ALT = {
  esimId: "airalo" as EsimProviderId,
  ctaLabel: "ดู eSIM ไม่จำกัดของ Airalo →",
  note: "Holafly ซื้อผ่านลิงก์ของเราไม่ได้ — เราแนะนำ Airalo เป็นตัวเลือกแทน",
};

/** Thai copy of the default in components/SimbyeOffer.tsx. {plan} prints the feed's English plan name. */
const SIMBYE_OFFER = {
  label: "ส่วนลด Simbye:",
  text: "โค้ด {code} ลด {percent}% ทุกแพ็กเกจ eSIM: {plan} ราคาปกติ {list} และเหลือ {price} เมื่อใช้โค้ด",
  cta: "ดู eSIM ของ Simbye →",
};

type TopPick = {
  id: string;
  esimId: EsimProviderId;
  rank: number;
  bestFor: string;
  badgeCls: string;
  target: string;
  ctaLabel: string;
  ctaExternal: boolean;
  ctaAlt?: typeof HOLAFLY_ALT;
  /** One line of fact for why the pick sits where it does, with live prices in it. */
  why: () => string;
};

const tenGb = (id: EsimProviderId) => {
  const plan = cheapestAtLeastGb(id, 10);
  return plan ? formatUsd(plan.priceUsd) : "—";
};

const topPicks: TopPick[] = [
  {
    id: "simbye-japan",
    esimId: "simbye",
    rank: 1,
    bestFor: "ราคาต่ำสุด",
    badgeCls: styles.pickBadgeGreen,
    target: "นักท่องเที่ยวส่วนใหญ่ที่ต้องการแค่เน็ต ไม่ว่าทริปแบบไหน",
    ctaLabel: "ดู eSIM ของ Simbye →",
    ctaExternal: true,
    why: () =>
      `ราคาปกติต่ำสุดในห้าราย: 10 GB ราคา ${tenGb("simbye")} เทียบกับ ${tenGb("esimgo")} ของ eSIM Go และ ${tenGb("airalo")} ของ Airalo ใช้สี่ค่ายของญี่ปุ่นและแชร์เน็ตได้`,
  },
  {
    id: "airalo-japan",
    esimId: "airalo",
    rank: 2,
    bestFor: "ดีที่สุดด้านแอปและบริการ",
    badgeCls: styles.pickBadgeBlue,
    target: "นักเดินทางที่ต้องการแอป แชทสด และการแชร์เน็ตแบบไม่จำกัด",
    ctaLabel: "ดู eSIM ของ Airalo →",
    ctaExternal: false,
    why: () =>
      `แพงกว่าที่ ${tenGb("airalo")} สำหรับ 10 GB แต่แพ็กไม่จำกัดเร็วเต็มที่ถึงวันละ 3 GB ไม่จำกัดการแชร์เน็ต และมีแชทสด 24/7`,
  },
  {
    id: "holafly-japan",
    esimId: "holafly",
    rank: 3,
    bestFor: "ดีที่สุดสายไม่จำกัด",
    badgeCls: styles.pickBadgeOrange,
    target: "คนใช้เน็ตหนัก: ทำงานทางไกล สตรีมมิง วิดีโอคอลทุกวัน",
    ctaLabel: "ดู eSIM ของ Holafly →",
    ctaExternal: false,
    ctaAlt: HOLAFLY_ALT,
    why: () =>
      `ขายเฉพาะแบบไม่จำกัด เริ่มต้น ${formatUsd(cheapestUnlimited("holafly")?.priceUsd ?? 0)} ไม่มีเกณฑ์ลดความเร็วรายวันบนตัวเครื่อง อยู่หลัง Airalo เพราะฮอตสปอตจำกัดวันละ 1 GB และเราไม่มีลิงก์ไปยัง Holafly`,
  },
  {
    id: "esim-go-japan",
    esimId: "esimgo",
    rank: 4,
    bestFor: "ปริมาณเน็ตสูงสุด",
    badgeCls: styles.pickBadgeBlue,
    target: "นักเดินทางงบจำกัด หรือคนที่เที่ยวหลายประเทศในเอเชียในทริปเดียว",
    ctaLabel: "ดู eSIM Go →",
    ctaExternal: true,
    why: () =>
      `${tenGb("esimgo")} สำหรับ 10 GB และเป็นผู้ขายรายเดียวในหน้านี้ที่มีแพ็ก 100 GB และ 200 GB รวมถึงแพ็กไม่จำกัดเริ่มที่ 1 วัน`,
  },
  {
    id: "sakura-mobile",
    esimId: "sakura",
    rank: 5,
    bestFor: "ดีที่สุดสำหรับอยู่ยาว",
    badgeCls: styles.pickBadgeGreen,
    target: "ผู้มาเยือนระยะยาว (1 เดือนขึ้นไป) ที่ต้องการโทรออกและบริการลูกค้าภาษาอังกฤษ",
    ctaLabel: "ดู Sakura Mobile →",
    ctaExternal: false,
    why: () =>
      "ราคาอยู่ท้ายสุด แต่เป็นรายเดียวในห้ารายที่ขายเบอร์ญี่ปุ่นพร้อมโทรและ SMS และเป็นรายเดียวที่มีซิมจริง",
  },
];

/** Thai copy of the qualitative profile in lib/sim-cards.ts — translated, nothing added. */
const SIM_COPY: Record<string, { name: string; summary: string; pros: string[]; cons: string[] }> = {
  "simbye-japan": {
    name: "eSIM ญี่ปุ่นของ Simbye",
    summary:
      "eSIM ญี่ปุ่นแบบเน็ตอย่างเดียวบน NTT docomo, KDDI/au, SoftBank และ Rakuten Mobile มีแพ็กกำหนดปริมาณตั้งแต่ 1 GB ถึง 50 GB และแพ็กไม่จำกัดที่เร็วเต็มที่วันละ 2 GB ทุกแพ็กในฟีดราคาของ Simbye แชร์เน็ตได้",
    pros: ["ราคาปกติต่ำสุดในห้ารายสำหรับแพ็กกำหนดปริมาณ", "สี่ค่ายของญี่ปุ่น เลือกให้อัตโนมัติ", "แชร์เน็ตได้ทุกแพ็กญี่ปุ่น", "แพ็ก 50 GB ใช้ได้ 180 วัน"],
    cons: ["เน็ตอย่างเดียว (ไม่มีเบอร์ญี่ปุ่น โทร หรือ SMS)", "แพ็กไม่จำกัดลดเหลือ 1 Mbps หลังใช้ครบวันละ 2 GB", "แพ็กไม่จำกัดเติมเน็ตไม่ได้"],
  },
  "airalo-japan": {
    name: "eSIM ญี่ปุ่นของ Airalo",
    summary:
      "ตลาด eSIM ที่ใหญ่ที่สุดในโลก ผู้ใช้กว่า 10 ล้านคน ติดตั้งไว้ก่อนออกเดินทางแล้วเปิดใช้ได้ทันทีเมื่อถึงญี่ปุ่น — ไม่ต้องต่อคิว ไม่ต้องใช้ซิมจริง",
    pros: ["ตลาด eSIM ที่ใหญ่ที่สุดในโลก", "ติดตั้งไว้ก่อนเดินทาง พร้อมเปิดใช้เมื่อถึงญี่ปุ่น", "แพ็กเกจตั้งแต่ 1 GB ถึงไม่จำกัด 3 ถึง 30 วัน", "นักเดินทางกว่า 10 ล้านคนไว้ใจ"],
    cons: ["เน็ตอย่างเดียว (ไม่มีโทรหรือ SMS)", "ต้องใช้เครื่องที่รองรับ eSIM"],
  },
  "holafly-japan": {
    name: "eSIM ญี่ปุ่นของ Holafly",
    summary:
      "eSIM เน็ตไม่จำกัด — ไม่ต้องคอยดูโควตา ได้รับความนิยมมากในหมู่นักเดินทางยุโรปและอเมริกาที่ต้องออนไลน์ตลอดเวลา",
    pros: ["เน็ตบนเครื่องไม่จำกัด", "เลือกระยะเวลาได้ตั้งแต่ 1 ถึง 90 วัน", "นิยมในหมู่นักเดินทางอเมริกาและยุโรป", "ตั้งค่าง่ายด้วย QR code"],
    cons: ["เน็ตอย่างเดียว (ไม่มีโทรหรือ SMS)", "ฮอตสปอตจำกัดวันละ 1 GB", "แพงกว่าแพ็กเกจแบบจำกัดปริมาณ"],
  },
  "esim-go-japan": {
    name: "eSIM Go ญี่ปุ่น (Breeze)",
    summary:
      "eSIM คุ้มค่าโดดเด่น ครอบคลุมกว่า 190 ประเทศ ขายผ่าน Breeze แบรนด์สำหรับผู้บริโภคของ eSIM Go เหมาะกับนักเดินทางที่คุมงบหรือเที่ยวหลายประเทศในทริปเดียว",
    pros: ["แพ็กไม่จำกัดระยะสั้นเริ่มที่ 1 วัน", "ใช้ได้กว่า 190 ประเทศ", "เปิดใช้ทันทีผ่าน QR code", "เหมาะกับทริปหลายประเทศ"],
    cons: ["เน็ตอย่างเดียว (ไม่มีโทรหรือ SMS)", "แบรนด์เล็กกว่า Airalo หรือ Holafly", "ต้องใช้เครื่องที่รองรับ eSIM"],
  },
  "sakura-mobile": {
    name: "eSIM สำหรับนักท่องเที่ยวของ Sakura Mobile",
    summary:
      "ตัวเลือกสัญชาติญี่ปุ่นสำหรับคนอยู่ยาวและนักเดินทางที่ต้องการบริการภาษาอังกฤษ eSIM สำหรับนักท่องเที่ยวมีแบบวันละ 3 GB หรือไม่จำกัด ส่วนแพ็กเกจซิมจริงมีตัวเลือกโทรได้",
    pros: ["บริการลูกค้าภาษาอังกฤษเต็มรูปแบบ", "มีแพ็กเกจซิมโทรได้ (ซิมจริง)", "เลือกได้ทั้งซิมจริงหรือ eSIM", "ดีที่สุดสำหรับอยู่ 1 เดือนขึ้นไป"],
    cons: ["แพงกว่าผู้ขายต่อแบบเน็ตอย่างเดียว", "ตั้งค่าครั้งแรกช้ากว่าเล็กน้อย"],
  },
};

/** Cheapest plan covering `days` days at `gb` GB in total — same rule as the English page. */
function cheapestForTrip(days: number, gb: number): EsimPlanRow | null {
  const rows = allEsimPlans
    .filter((p) => {
      if (p.providerId === "holafly") return false;
      if (p.days < days) return false;
      if (p.unlimited) return true;
      if (p.dailyCapGb) return p.dailyCapGb * days >= gb;
      return (p.gb ?? 0) >= gb;
    })
    .sort((a, b) => a.priceUsd - b.priceUsd || a.days - b.days);
  return rows[0] ?? null;
}

function tripPlanLabel(days: number, gb: number): string {
  const p = cheapestForTrip(days, gb);
  return p ? `${p.provider} ${planName(p.name)} — ${formatUsd(p.priceUsd)}` : "—";
}

const SHORT_TRIP_PLAN = cheapestAtLeastGb("simbye", 10);
const LONG_TRIP_PLAN = cheapestAtLeastGb("simbye", 20);
const SIMBYE_UNLIMITED = cheapestUnlimited("simbye", 7);
const ESIMGO_UNLIMITED = cheapestUnlimited("esimgo", 7);
const AIRALO_UNLIMITED = cheapestUnlimited("airalo", 7);
const SAKURA_DAILY_LONG = allEsimPlans.find((p) => p.id === "sakura-90-gb-30-days") ?? null;

function planLabel(plan: { priceUsd: number; name: string } | null): string {
  return plan ? `${formatUsd(plan.priceUsd)} (${planName(plan.name)})` : "—";
}

const itineraryPicks = [
  {
    trip: "ไม่เกิน 10 วัน ใช้งานแบบนักท่องเที่ยวทั่วไป",
    pick: "Simbye แบบกำหนดปริมาณ",
    detail: () =>
      `${planLabel(SHORT_TRIP_PLAN)} — 10 GB คือวันละ 1 GB สำหรับทริปสิบวันแล้วยังเหลือ ฟีดของ Simbye ระบุ NTT docomo, KDDI/au, SoftBank และ Rakuten Mobile และหน้าญี่ปุ่นบอกว่า “คุณไม่ต้องเลือกเครือข่ายเอง” แชร์เน็ตได้`,
  },
  {
    trip: "2 ถึง 4 สัปดาห์",
    pick: "Simbye สำหรับแบบกำหนดปริมาณ, Sakura Mobile สำหรับแบบจำกัดรายวัน",
    detail: () =>
      `${planLabel(LONG_TRIP_PLAN)} ครอบคลุม 20 วันที่วันละ 1 GB บนสี่ค่ายเดียวกัน ถ้าอยากได้โควตาใหม่ทุกเช้า แพ็กวันละ 3 GB ของ Sakura Mobile ใช้ Docomo 5G — ${planLabel(SAKURA_DAILY_LONG)} — และจะลดเหลือ 200 kbps ก็ต่อเมื่อใช้เกิน 3 GB ในวันเดียว`,
  },
  {
    trip: "ชนบทญี่ปุ่น ภูเขา และเกาะ",
    pick: "แพ็กเกจที่ใช้ Docomo หรือแพ็กเกจที่ใช้ครบทั้งสี่ค่าย",
    detail: () =>
      "แพ็กวันละ 3 GB ของ Sakura Mobile เป็น Docomo 5G ส่วนของ Simbye และ eSIM Go เป็นหลายค่ายพร้อมเลือกอัตโนมัติ หน้าญี่ปุ่นของ Airalo แสดง SoftBank เป็นเครือข่ายหลัก และอีกสองเครือข่ายที่หน้านั้นไม่ได้ระบุชื่อ (ตรวจสอบเมื่อ 1 พฤศจิกายน 2026) ส่วนสินค้าของ Klook ใช้ SoftBank 5G สำหรับแพ็กรายวัน และ docomo 4G LTE สำหรับแพ็กแบบปริมาณรวม",
  },
  {
    trip: "เน็ตไม่จำกัด — ทำงานทางไกล สตรีมมิง แชร์เน็ตให้แล็ปท็อป",
    pick: "Simbye Unlimited ถ้าเน้นราคา, eSIM Go Premium หรือ Airalo Unlimited ถ้าต้องการเน็ตเร็วเต็มที่มากกว่า",
    detail: () =>
      `${planLabel(SIMBYE_UNLIMITED)} ของ Simbye เป็นราคาปกติต่ำสุดเมื่อเทียบที่หนึ่งสัปดาห์ เร็วเต็มที่วันละ 2 GB จากนั้น 1 Mbps ส่วน ${planLabel(ESIMGO_UNLIMITED)} ของ eSIM Go ให้ความเร็วเต็มที่ 30 GB ใน 5 วัน 60 GB ใน 10 วัน หรือ 90 GB ใน 15 วัน หลังจากนั้น “ความเร็วจะลดลง (แต่ยังพอสำหรับสตรีมวิดีโอ 720p)” และ “แชร์เน็ตได้ทุกแพ็กเกจ” ส่วน ${planLabel(AIRALO_UNLIMITED)} ของ Airalo เร็วเต็มที่ถึงวันละ 3 GB จากนั้น 1 Mbps จนรีเซ็ตทุก 24 ชั่วโมง และระบุว่า “ไม่จำกัดการแชร์เน็ตหรือจำนวนอุปกรณ์ที่เชื่อมต่อ”`,
  },
  {
    trip: "คุณต้องมีเบอร์โทรญี่ปุ่น",
    pick: "eSIM Voice + Data ของ Sakura Mobile",
    detail: () =>
      "แพ็กเกจเดียวในหกรายที่มีเบอร์ญี่ปุ่น โทรและ SMS ได้: au (KDDI) 5G วันละ 3 GB และนาทีโทร 120 นาทีสำหรับแพ็ก 1–10 วัน 240 นาทีสำหรับ 11–60 วัน และ 360 นาทีสำหรับ 61 วันขึ้นไป ต้องยืนยันตัวตนแบบพบหน้าในญี่ปุ่น และระยะเวลาใช้งานเริ่มหลังการยืนยันนั้น ไม่ใช่ตอนเดินทางถึง",
  },
  {
    trip: "ญี่ปุ่นพร้อมเกาหลีใต้หรือไต้หวันในทริปเดียว",
    pick: "eSIM โซนเอเชียแทนแบบญี่ปุ่นอย่างเดียว",
    detail: () =>
      "eSIM เอเชียของ Airalo ครอบคลุม “18 ประเทศและเครือข่าย” โดยมีญี่ปุ่น เกาหลีใต้ และไต้หวันอยู่ในรายการ ส่วน eSIM Asia ของ Breeze ครอบคลุม “13 ประเทศและเครือข่าย” แต่ไม่มีรายชื่อประเทศในหน้าที่เราอ่าน ทั้งสองเป็นสินค้าแยกจากแพ็กเกจญี่ปุ่นที่แสดงราคาในหน้านี้",
  },
];

const dataNeedRows = [10, 14, 21].map((days) => ({
  days,
  light: days * 0.5,
  normal: days,
}));

const networkRows = [
  {
    provider: "Simbye",
    carriers: getProvider("simbye").network,
    how: "ค่ายตามที่ระบุในฟีดราคาของ Simbye หน้าญี่ปุ่นบอกว่า “คุณไม่ต้องเลือกเครือข่ายเอง” และแพ็ก 50 GB ใช้ NTT Docomo เท่านั้น แชร์เน็ตได้ เน็ตอย่างเดียว",
    checked: SIMBYE_CHECKED,
  },
  {
    provider: "Airalo (Moshi Moshi Japan)",
    carriers: "SoftBank (หลัก) และอีก 2 เครือข่ายที่หน้าไม่ได้ระบุชื่อ",
    how: "หน้าสินค้าญี่ปุ่นระบุ SoftBank เป็นเครือข่ายหลัก และแสดง “+2 others” โดยไม่ระบุชื่อ เน็ตอย่างเดียว",
    checked: dateLabel("2026-11-01", LOCALE),
  },
  {
    provider: "eSIM Go (Breeze)",
    carriers: "NTT Docomo, KDDI, Rakuten Mobile, SoftBank",
    how: "“อุปกรณ์ของคุณจะเชื่อมต่อกับสัญญาณที่แรงที่สุดโดยอัตโนมัติ” เน็ตอย่างเดียว — “ไม่รวม SMS หรือการโทร”",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile — แพ็กวันละ 3 GB",
    carriers: "Docomo 5G",
    how: "กลุ่มแพ็กจำกัดรายวัน ใช้ฮอตสปอตได้ ไม่มีเบอร์โทร ไม่มีการโทร ไม่มี SMS",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile — Unlimited และ Voice + Data",
    carriers: "au (KDDI) 5G",
    how: "Unlimited เป็นเน็ตอย่างเดียว ส่วน Voice + Data มีเบอร์ญี่ปุ่นเพิ่ม และต้องยืนยันตัวตนแบบพบหน้า",
    checked: SPECS_CHECKED,
  },
  {
    provider: thKlookEsim.label,
    carriers: "SoftBank 5G (แพ็กรายวัน) / docomo 4G LTE (แพ็กปริมาณรวม)",
    how: "ไม่มีเบอร์ — เน็ตอย่างเดียว แชร์เน็ต: รองรับ ข้อมูลจากรายการสินค้าของ Klook เอง ไม่ใช่จากหน้าสินค้า — หน้านั้นตอบการอ่านอัตโนมัติด้วย HTTP 403",
    checked: KLOOK_SPECS_CHECKED,
  },
];

const unlimitedRows = [
  {
    plan: "Simbye Unlimited",
    full: "วันละ 2 GB",
    after: "“จากนั้นไม่จำกัดที่ 1 Mbps” ตามฟีดราคาของ Simbye",
    hotspot: "“ใช้ได้ — สำหรับแล็ปท็อป แท็บเล็ต หรือเพื่อนร่วมทาง”",
    checked: SIMBYE_CHECKED,
  },
  {
    plan: "Airalo Unlimited (ญี่ปุ่น)",
    full: "วันละ 3 GB",
    after: "1 Mbps “ตลอดช่วงที่เหลือของวันนั้น” โควตา “รีเซ็ตทุก 24 ชั่วโมง นับจากเวลาที่คุณเปิดใช้ eSIM”",
    hotspot: "“ไม่จำกัดการแชร์เน็ตหรือจำนวนอุปกรณ์ที่เชื่อมต่อ”",
    checked: SPECS_CHECKED,
  },
  {
    plan: "eSIM Go Premium Unlimited",
    full: "30 GB ใน 5 วัน, 60 GB ใน 10 วัน, 90 GB ใน 15 วัน",
    after: "“ความเร็วจะลดลง (แต่ยังพอสำหรับสตรีมวิดีโอ 720p)”",
    hotspot: "“แชร์เน็ตได้ทุกแพ็กเกจ” โดยไม่มีค่าใช้จ่ายเพิ่ม",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile Unlimited (au 5G)",
    full: "ไม่จำกัดบนตัวเครื่อง",
    after: "ไม่มีเกณฑ์การใช้บนเครื่องเผยแพร่ในหน้าที่เราอ่าน",
    hotspot: "จำกัดตามระยะเวลาแพ็ก — 2 GB ถึง 30 GB",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile วันละ 3 GB (Docomo 5G)",
    full: "วันละ 3 GB",
    after: "“ความเร็วจะถูกจำกัดที่ 200 Kbps หลังใช้เน็ตครบ 3 GB ต่อวัน”",
    hotspot: "ใช้ได้",
    checked: SPECS_CHECKED,
  },
  {
    plan: `${thKlookEsim.label} — แพ็กไม่จำกัด`,
    full: "วันละ 10 GB",
    after: "128 kbps หลังครบ 10 GB ต่อวัน ตามข้อมูลสินค้า",
    hotspot: "รองรับ",
    checked: KLOOK_SPECS_CHECKED,
  },
  {
    plan: "Holafly ไม่จำกัด",
    full: "ไม่เปิดเผยเกณฑ์รายวัน",
    after: "ใช้ “Fair Usage Policy” โดยระบุว่าไม่เกินครั้งละหนึ่งวัน แล้วกลับสู่ความเร็วเดิม",
    hotspot: "แชร์ได้วันละ 1 GB",
    checked: "6 พ.ย. 2026",
  },
];

const timingRows = [
  {
    provider: "Simbye",
    starts: "“แพ็กจะเริ่มนับเมื่อ eSIM เชื่อมต่อครั้งแรกที่จุดหมายปลายทางเท่านั้น”",
    install: "ได้ — หน้าญี่ปุ่นของ Simbye บอกให้ติดตั้งผ่าน Wi-Fi ก่อนบิน",
    refund: "คืนเงินเต็มจำนวนถ้าไม่เคยติดตั้งหรือเปิดใช้งานและไม่ได้ใช้เน็ต โดยขอภายใน 30 วันหลังซื้อ ดูนโยบายคืนเงินของ Simbye",
    checked: SIMBYE_CHECKED,
  },
  {
    provider: "Airalo",
    starts:
      "“ระยะเวลาใช้งานของแพ็กเกจ eSIM เริ่มเมื่อเกิดอย่างใดอย่างหนึ่งต่อไปนี้: เมื่อคุณเชื่อมต่อเครือข่ายที่รองรับในพื้นที่ให้บริการ หรือเมื่อคุณติดตั้ง eSIM” แพ็กเกจส่วนใหญ่เริ่มเมื่อเชื่อมต่อเครือข่าย — นโยบายระยะเวลาใช้งานของแต่ละแพ็กจะระบุว่าแบบไหน",
    install: "แพ็กส่วนใหญ่ติดตั้งที่บ้านได้อย่างปลอดภัย — เช็กนโยบายระยะเวลาใช้งานของแพ็กก่อน",
    refund: "ยื่นขอคืนเงินได้จากบัญชี Airalo ส่วน eSIM ที่หมดอายุหรือใช้หมดแล้วไม่เข้าเงื่อนไข",
    checked: SPECS_CHECKED,
  },
  {
    provider: "eSIM Go (Breeze)",
    starts: "“ระยะเวลาของแพ็กเริ่มเมื่อใช้เน็ตครั้งแรกในญี่ปุ่น ไม่ใช่ตอนซื้อ”",
    install: "“ติดตั้งก่อนบิน”",
    refund: "“ถ้าคุณยังไม่ได้ใช้เน็ตเลย คุณมีสิทธิ์ได้เงินคืนเต็มจำนวน — ไม่มีคำถาม” ดำเนินการภายใน 3 วันทำการ",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile",
    starts:
      "Unlimited เน็ตอย่างเดียว: “ระยะเวลาใช้งานเริ่มเมื่อคุณเดินทางถึงญี่ปุ่น” เน็ตวันละ 3 GB: “ระยะเวลาใช้งานเริ่มเมื่อคุณติดตั้ง eSIM” Voice + Data: หลังเดินทางถึงและยืนยันตัวตนแบบพบหน้า",
    install: "แพ็กวันละ 3 GB ให้ติดตั้งเมื่อถึงญี่ปุ่น — ติดตั้งที่บ้านจะเริ่มนับเวลา",
    refund: "ไม่มีเงื่อนไขการคืนเงินเผยแพร่ในหน้าที่เราอ่าน",
    checked: SPECS_CHECKED,
  },
  {
    provider: thKlookEsim.label,
    starts: `ขายเป็นวอชเชอร์ QR code (“${klookEsim.listingTitle}”) ไม่ระบุกฎการเริ่มนับในข้อมูลสินค้าที่มี`,
    install: "ไม่ระบุ — ดูในหน้าสินค้า",
    refund: "ไม่ระบุ — ดูในหน้าสินค้า",
    checked: KLOOK_SPECS_CHECKED,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "eSIM คืออะไร และไปญี่ปุ่นจำเป็นไหม?",
    a: "eSIM คือซิมดิจิทัลที่ฝังอยู่ในเครื่อง ไม่ต้องใช้การ์ดจริง คุณดาวน์โหลดโปรไฟล์ด้วย QR code แล้วใช้ได้ทันที ไปญี่ปุ่นไม่จำเป็นต้องใช้ eSIM แต่เป็นตัวเลือกที่สะดวกที่สุดแบบทิ้งห่าง: ซื้อและติดตั้งก่อนบิน แล้วเปิดใช้งานเมื่อเครื่องลง",
  },
  {
    q: "มือถือรุ่นไหนใช้ eSIM ในญี่ปุ่นได้?",
    a: "มือถือรุ่นใหม่ส่วนใหญ่รองรับ: iPhone XS ขึ้นไป, Google Pixel 3 ขึ้นไป, Samsung Galaxy S20 ขึ้นไป และเรือธง Android อีกหลายรุ่น ตรวจสอบได้ที่ ตั้งค่า → เกี่ยวกับ หมายเหตุ: เครื่องที่ติดล็อกค่ายบางรุ่นอาจไม่รองรับ eSIM",
  },
  {
    q: "ใช้ eSIM ญี่ปุ่นแล้วยังเปิดซิมไทยไว้ได้ไหม?",
    a: "ได้ และนี่คือข้อดีใหญ่ที่สุดข้อหนึ่งของ eSIM เครื่องสองซิมส่วนใหญ่ใช้ทั้งสองซิมพร้อมกันได้ เปิดซิมเดิมไว้รับสายและ SMS แล้วให้ eSIM ญี่ปุ่นรับหน้าที่เน็ต",
  },
  {
    q: "ในญี่ปุ่นควรใช้ Airalo หรือ Holafly?",
    a: "สำหรับคนส่วนใหญ่ Airalo ดีกว่า: ถูกกว่า เลือกปริมาณเน็ตได้ยืดหยุ่น และใช้ SoftBank เป็นเครือข่ายหลักตามหน้าญี่ปุ่นของ Airalo เอง (ตรวจสอบเมื่อ 1 พฤศจิกายน 2026) Holafly จะชนะถ้าคุณต้องการเน็ตไม่จำกัดจริง ๆ (ทำงานทางไกล สตรีมหนัก) และราคาที่สูงกว่าคุ้มค่าสำหรับทริปของคุณ",
  },
  {
    q: "ถึงญี่ปุ่นแล้ว eSIM ใช้ไม่ได้ทำอย่างไร?",
    a: "เช็กก่อนว่าโปรไฟล์ eSIM นั้นเปิด 'ข้อมูลโรมมิ่ง' แล้วหรือยัง ถ้ายังไม่มีสัญญาณ ให้เปิด-ปิดโหมดเครื่องบินเพื่อบังคับค้นหาเครือข่ายใหม่ ผู้ให้บริการทุกรายในหน้านี้มีแชทช่วยเหลือสด 24/7 โดย Airalo และ Holafly ตอบเร็วเป็นพิเศษ",
  },
  {
    q: "eSIM ญี่ปุ่นต่างจากซิมการ์ดจริงอย่างไร?",
    a: "ทั้งสองให้เน็ตมือถือในญี่ปุ่นเหมือนกัน แต่ eSIM ติดตั้งเร็วกว่า (ไม่ต้องต่อคิวที่สนามบิน) ส่วนใหญ่ถูกกว่า และซื้อได้ก่อนเดินทาง ซิมการ์ดจริงต้องรอที่เคาน์เตอร์หรือตู้ขายในสนามบินหลังลงเครื่อง ข้อดีหลักของซิมจริงคือใช้ได้กับเครื่องที่ไม่รองรับ eSIM",
  },
  {
    q: "ใช้โรมมิ่งของค่ายมือถือเดิมในญี่ปุ่นแทนการซื้อ eSIM ได้ไหม?",
    a: "ได้ แต่โรมมิ่งแพง ค่ายมือถือต่างประเทศส่วนใหญ่คิดค่าโรมมิ่งญี่ปุ่นวันละ $10–15 ทริป 10 วันจะเป็นค่าเน็ตอย่างเดียว $100–150 เทียบกับ $9–18 สำหรับแพ็กเกจ eSIM ญี่ปุ่นเต็มแพ็ก ถ้าค่ายของคุณไม่มีแพ็กเสริมสำหรับเดินทางแบบเหมาจ่ายที่ครอบคลุมญี่ปุ่นได้ดี eSIM ญี่ปุ่นโดยเฉพาะแทบจะถูกกว่าเสมอ",
  },
  {
    q: "Airalo ใช้เครือข่ายอะไรในญี่ปุ่น?",
    a: "เครือข่ายที่แสดงบนหน้าญี่ปุ่นอย่างเป็นทางการของ Airalo: SoftBank เป็นเครือข่ายหลัก และมี “+2 others” ที่หน้านั้นไม่ได้ระบุชื่อ คู่มือนี้จึงไม่ระบุชื่อเช่นกัน ตรวจสอบเมื่อ 1 พฤศจิกายน 2026 ถ้าค่ายใดค่ายหนึ่งสำคัญกับเส้นทางของคุณ ให้เปิดรายการเครือข่ายบนหน้านั้นก่อนซื้อ",
  },
  {
    q: "Sakura Mobile คืออะไร และเหมาะกับใคร?",
    a: "Sakura Mobile เป็นผู้ให้บริการในญี่ปุ่นที่มีทั้งซิมการ์ดและ eSIM ออกแบบมาสำหรับนักท่องเที่ยวและผู้มาเยือนระยะยาว ต่างจาก Airalo และ Holafly ตรงที่มีการโทร บริการลูกค้าภาษาอังกฤษ และแพ็กเกจสำหรับการพำนักถึง 90 วัน ใช้เครือข่าย Docomo (ค่ายใหญ่ที่สุดของญี่ปุ่น) แพงกว่า eSIM ราคาประหยัด แต่เป็นตัวเลือกที่ดีที่สุดสำหรับคนที่ต้องมีเบอร์ญี่ปุ่นหรือวางแผนอยู่ยาว",
  },
  {
    q: "ไปญี่ปุ่นต้องใช้เน็ตกี่ GB?",
    a: "การเที่ยวทั่วไป — Google Maps แชต เล่นเว็บเบา ๆ และถ่ายรูปบ้าง — วันละ 1 GB เป็นค่าประมาณที่สมเหตุสมผล ทริป 10 วันจะใช้ราว 8–10 GB ถ้าใช้แผนที่นำทางขับรถมาก ดูวิดีโอ หรือทำงานทางไกล ให้เผื่อวันละ 2 GB ขึ้นไป นักท่องเที่ยวส่วนใหญ่พบว่าแพ็ก 3–5 GB พอสำหรับเที่ยวญี่ปุ่นหนึ่งสัปดาห์",
  },
  {
    q: "eSIM ญี่ปุ่นราคาเท่าไร?",
    a: `ราคา eSIM ญี่ปุ่นต่างกันตามผู้ให้บริการและขนาดแพ็ก (ตรวจสอบ ${pricesCheckedAt}) สายประหยัด: Simbye เริ่มต้น ${priceFromLabel("simbye")}, eSIM Go เริ่มต้น ${priceFromLabel("esimgo")}, Airalo เริ่มต้น ${priceFromLabel("airalo")} ระดับกลาง: แพ็ก 5 GB ของ Simbye ${priceAtLeastLabel("simbye", 5)}, ของ eSIM Go ${priceAtLeastLabel("esimgo", 5)} หรือของ Airalo ${priceAtLeastLabel("airalo", 5)} ไม่จำกัด: Holafly เริ่มต้น ${unlimitedFromLabel("holafly")} ผู้ให้บริการในญี่ปุ่นที่มีสายช่วยเหลือภาษาอังกฤษ: Sakura Mobile เริ่มต้น ${priceFromLabel("sakura")} ทริปท่องเที่ยวทั่วไปหนึ่งสัปดาห์ ให้คาดไว้ที่ $10–20`,
  },
  {
    q: "เน็ตไม่จำกัดคุ้มสำหรับทริปญี่ปุ่นไหม?",
    a: "สำหรับนักท่องเที่ยวส่วนใหญ่: ไม่คุ้ม ญี่ปุ่นมี Wi-Fi ครอบคลุมดีเยี่ยมในโรงแรม ร้านสะดวกซื้อ และแหล่งท่องเที่ยว แพ็ก 3–5 GB เพียงพอสำหรับแผนที่ แชต และเล่นเว็บตลอดหนึ่งสัปดาห์ แพ็กไม่จำกัด (เช่น Holafly) แพงกว่า 2–3 เท่า และให้ประโยชน์หลัก ๆ กับคนใช้หนักที่สตรีมวิดีโอ วิดีโอคอลบ่อย หรือไปพื้นที่ที่ Wi-Fi ไม่ดี ถ้าไม่แน่ใจ ให้เริ่มที่แพ็ก 5 GB แล้วค่อยพิจารณาว่าต้องการเพิ่มไหม",
  },
  {
    q: "ถึงญี่ปุ่นแล้วเติมเน็ต eSIM ได้ไหม?",
    a: "ได้ ผู้ให้บริการส่วนใหญ่รองรับการเติมในแอปโดยไม่ต้องใช้ QR code ใหม่ กับ Airalo ให้ซื้อแพ็กเพิ่มในแอป ระบบจะเติมเข้าโปรไฟล์ eSIM เดิมโดยอัตโนมัติ eSIM Go และ Sakura Mobile มีขั้นตอนเติมคล้ายกัน ส่วนแพ็กไม่จำกัดของ Holafly กำหนดระยะเวลาตายตัว ถ้าอยู่นานกว่านั้นต้องซื้อแพ็กใหม่",
  },
  {
    q: "แพ็กเกจ eSIM ญี่ปุ่นรวมโทรและ SMS ไหม?",
    a: "แพ็กเกจ eSIM สำหรับนักท่องเที่ยวส่วนใหญ่ — รวมถึง Simbye, Airalo, eSIM Go และ Holafly — เป็นเน็ตอย่างเดียว ไม่มีการโทรหรือ SMS การโทรในญี่ปุ่นใช้ WhatsApp, LINE หรือ FaceTime ผ่านเน็ตได้ ถ้าคุณจำเป็นต้องมีเบอร์ญี่ปุ่นที่โทรได้จริง Sakura Mobile คือตัวเลือกที่ดีที่สุดในกลุ่มผู้ให้บริการหลัก",
  },
  {
    q: "ควรเปิดใช้ eSIM ญี่ปุ่นเมื่อไร?",
    a: "ติดตั้ง eSIM (สแกน QR code) ก่อนออกจากบ้าน — ใช้เวลา 2–5 นาทีและต้องเชื่อมต่อ Wi-Fi แต่แพ็กเกจส่วนใหญ่เริ่มนับวันตั้งแต่ครั้งแรกที่คุณเชื่อมต่อเครือข่ายในญี่ปุ่น ไม่ใช่ตอนติดตั้งโปรไฟล์ สลับสายเน็ตไปที่ eSIM ญี่ปุ่นเมื่อเครื่องลงจอด แพ็กเกจจะได้เริ่มตอนที่คุณต้องใช้",
  },
  {
    q: "เครือข่ายไหนครอบคลุมดีที่สุดในญี่ปุ่น?",
    a: "Docomo ครอบคลุมชนบทกว้างที่สุด จึงคุ้มที่จะเลือกอย่างตั้งใจถ้าทริปของคุณออกนอกเมืองใหญ่ — Simbye, eSIM Go และ Sakura Mobile ใช้ Docomo ทั้งหมด SoftBank และ KDDI (ที่ Holafly ใช้ และ SoftBank ยังเป็นเครือข่ายหลักบนหน้าญี่ปุ่นของ Airalo) ยอดเยี่ยมในเมืองและตามเส้นทางท่องเที่ยว สำหรับเส้นทางมาตรฐานโตเกียว–เกียวโต–โอซาก้า–ฮิโรชิมา รายไหนก็ใช้ได้ดีและคุณจะไม่รู้สึกถึงความต่าง",
  },
  {
    q: "ควรซื้อซิมหรือ eSIM ญี่ปุ่นเมื่อไร?",
    a: "ซื้อ eSIM ก่อนออกจากบ้านแล้วเปิดใช้ทันทีที่เครื่องลง — ไม่มีเหตุผลต้องรอ และไม่มีของหมด ซิมจริงต่างออกไป: เคาน์เตอร์และตู้ขายในสนามบินของหมดจริงในช่วงไฮซีซัน การสั่งซิม Sakura Mobile ล่วงหน้าเพื่อรับที่สนามบินหรือโรงแรมจึงทั้งถูกกว่าซื้อตอนถึงและปลอดภัยกว่าการเสี่ยงดวง",
  },
  {
    q: "ใช้ eSIM แล้วได้เบอร์โทรญี่ปุ่นไหม?",
    a: `ได้จาก Sakura Mobile เท่านั้น eSIM Voice + Data ของที่นี่ใช้ au (KDDI) 5G มีเน็ตความเร็วสูงวันละ 3 GB พร้อมเบอร์ญี่ปุ่น การโทร และ SMS — นาทีโทร 120 นาทีสำหรับแพ็ก 1–10 วัน 240 นาทีสำหรับ 11–60 วัน และ 360 นาทีสำหรับ 61 วันขึ้นไป — แต่ต้องยืนยันตัวตนแบบพบหน้าในญี่ปุ่น และระยะเวลาใช้งานเริ่มหลังการยืนยันนั้น Simbye, Airalo, eSIM Go และสินค้าของ Klook เป็นเน็ตอย่างเดียวทั้งหมดในแพ็กญี่ปุ่น: ไม่มีเบอร์ญี่ปุ่น ไม่มี SMS ไม่มีการโทร ถ้าคุณแค่ต้องรับ SMS รหัสยืนยัน ให้เปิดซิมไทยไว้ในอีกช่องแล้วให้ eSIM รับหน้าที่เน็ต ตรวจสอบ ${SPECS_CHECKED}`,
  },
  {
    q: "เน็ตไม่จำกัดจะช้าลงไหม?",
    a: `ช้าลง — แพ็ก “ไม่จำกัด” ของญี่ปุ่นทุกแพ็กมีเกณฑ์ที่เผยแพร่ไว้ Simbye เร็วเต็มที่วันละ 2 GB จากนั้น 1 Mbps Airalo ลดเหลือ 1 Mbps ตลอดช่วงที่เหลือของวันเมื่อใช้เกิน 3 GB และโควตา “รีเซ็ตทุก 24 ชั่วโมง นับจากเวลาที่คุณเปิดใช้ eSIM” Premium Unlimited ของ eSIM Go ให้ความเร็วเต็มที่ 30 GB ใน 5 วัน 60 GB ใน 10 วัน หรือ 90 GB ใน 15 วัน หลังจากนั้น “ความเร็วจะลดลง (แต่ยังพอสำหรับสตรีมวิดีโอ 720p)” แพ็กไม่จำกัดของ Sakura Mobile ไม่จำกัดบนตัวเครื่อง แต่จำกัดฮอตสปอตที่ 2–30 GB ตามระยะเวลาแพ็ก และแพ็กวันละ 3 GB จะลดเหลือ 200 kbps เมื่อใช้เกิน 3 GB ในวันนั้น แพ็กไม่จำกัดของสินค้า Klook เร็วเต็มที่วันละ 10 GB จากนั้น 128 kbps ตัวเลขของ Airalo และ eSIM Go ตรวจสอบ ${SPECS_CHECKED} ตัวเลขของ Klook มาจากข้อมูลสินค้าวันที่ ${KLOOK_SPECS_CHECKED}`,
  },
  {
    q: "ถ้าไม่ได้ใช้ eSIM ญี่ปุ่นเลย ขอเงินคืนได้ไหม?",
    a: `ขึ้นอยู่กับผู้ให้บริการ นโยบายคืนเงินของ Simbye ให้เงินคืนเต็มจำนวนสำหรับ eSIM ที่ไม่เคยติดตั้งหรือเปิดใช้งานและไม่ได้ใช้เน็ต หากขอภายใน 30 วันหลังซื้อ eSIM Go ระบุว่า “ถ้าคุณยังไม่ได้ใช้เน็ตเลย คุณมีสิทธิ์ได้เงินคืนเต็มจำนวน — ไม่มีคำถาม” ดำเนินการภายใน 3 วันทำการ Airalo ให้ยื่นขอคืนเงินได้จากบัญชี และระบุว่า eSIM ที่หมดอายุหรือใช้หมดแล้วไม่เข้าเงื่อนไข Sakura Mobile ไม่ได้เผยแพร่เงื่อนไขคืนเงินในหน้า eSIM สำหรับนักท่องเที่ยว และเงื่อนไขของสินค้า Klook อ่านไม่ได้ กับดักที่เกี่ยวข้องคือเรื่องจังหวะเวลามากกว่าเงิน: ระยะเวลาของ eSIM Go “เริ่มเมื่อใช้เน็ตครั้งแรกในญี่ปุ่น ไม่ใช่ตอนซื้อ” แต่แพ็กวันละ 3 GB ของ Sakura Mobile เริ่ม “เมื่อคุณติดตั้ง eSIM” — จึงควรติดตั้งแพ็กนั้นเมื่อถึงญี่ปุ่น ไม่ใช่ที่บ้าน ตรวจสอบ ${SPECS_CHECKED}`,
  },
  {
    q: "ทำไม eSIM ญี่ปุ่นของฉันช้า?",
    a: "มีหลายสาเหตุที่เป็นไปได้: คุณใช้โควตาเน็ตไปเกือบหมดแล้ว (หลายแพ็กลดความเร็วเมื่อเกินเกณฑ์) คุณอยู่ในพื้นที่สัญญาณอ่อน (อุโมงค์ ภูเขาในชนบท) หรือเครือข่ายหนาแน่นช่วงพีคในย่านท่องเที่ยวที่คนแน่นอย่างชิบูยะหรือสถานีเกียวโต ลองเปิด-ปิดโหมดเครื่องบิน ถ้าความเร็วไม่ดีขึ้นทั้งที่ยังไม่เกินโควตา ให้ติดต่อฝ่ายช่วยเหลือของผู้ให้บริการ",
  },
];

/** One Klook eSIM slot, for the two places on the page where a reader has just picked a plan. */
function KlookEsimSlot({ why }: { why: string }) {
  return (
    <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
      <span className={styles.pickTargetLabel}>มีบน Klook ด้วย:</span>
      <span>
        {why}{" "}
        <KlookLink
          href={thKlookEsim.url}
          target="_blank"
          rel={KLOOK_REL}
          style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
        >
          ดูราคา eSIM ของ Klook →
        </KlookLink>
      </span>
    </div>
  );
}

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "eSIM ญี่ปุ่น" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThBestEsimJapanPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>ตรวจสอบราคา {pricesCheckedAt}｜อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            eSIM ญี่ปุ่น 2026:<br />เทียบตามราคาและเครือข่าย
          </h1>
          <p className={styles.heroSubtitle}>
            eSIM ญี่ปุ่นรายใหญ่ทุกรายในหน้าเดียว พร้อมตัวเลือกสำหรับทริปแต่ละแบบ — และแต่ละแพ็กใช้เครือข่ายค่ายไหนจริง ๆ
          </p>
          <div className={styles.heroBadges}>
            {["ตรวจสอบราคาทุกวัน", "เทียบ eSIM 6 ราย", "ประเมินอย่างเป็นอิสระ"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <EsimUseCaseTable copy={esimPicksCopy["th"]} checkedLabel={pricesCheckedAt} formatPlan={planName} />

        {/* The answer, before the table — a pick per kind of trip, with the numbers in it. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            สำหรับทริป<strong>ไม่เกิน 10 วัน</strong>ที่ใช้งานแบบนักท่องเที่ยวทั่วไป ตัวเลือกคือ{" "}
            <strong>{planLabel(SHORT_TRIP_PLAN)} ของ Simbye</strong> — 10 GB คือวันละ 1 GB แล้วยังเหลือ
            ในราคาปกติต่ำสุดที่เราติดตาม และฟีดราคาระบุ NTT docomo, KDDI/au, SoftBank และ Rakuten Mobile ถ้าเป็น{" "}
            <strong>2 ถึง 4 สัปดาห์</strong> แพ็ก <strong>{planLabel(LONG_TRIP_PLAN)}</strong> ของผู้ให้บริการเดียวกัน
            ครอบคลุม 20 วันในอัตราเดียวกัน ถ้าอยากได้<strong>เน็ตไม่จำกัด</strong>แทนแบบกำหนดปริมาณ{" "}
            <strong>{planLabel(SIMBYE_UNLIMITED)}</strong> ของ Simbye ถูกที่สุดเมื่อเทียบที่หนึ่งสัปดาห์ แต่เร็วเต็มที่วันละ 2 GB
            จากนั้น 1 Mbps ส่วน <strong>{planLabel(ESIMGO_UNLIMITED)}</strong> ของ eSIM Go เร็วเต็มที่ 30 GB ใน 5 วัน หรือ 60 GB ใน 10 วัน
            ก่อนลดลงเป็นความเร็วที่ยังดูวิดีโอ 720p ได้ ส่วน <strong>{planLabel(AIRALO_UNLIMITED)}</strong> ของ Airalo
            เร็วเต็มที่ถึงวันละ 3 GB จากนั้น 1 Mbps จนรีเซ็ตทุก 24 ชั่วโมง และไม่จำกัดการแชร์เน็ต มีเพียง{" "}
            <strong>Sakura Mobile</strong> ที่ขาย<strong>เบอร์โทรญี่ปุ่น</strong>: eSIM Voice + Data บน au (KDDI) 5G
            วันละ 3 GB พร้อมนาทีโทร 120–360 นาทีตามระยะเวลาแพ็ก และต้องยืนยันตัวตนแบบพบหน้าหลังเครื่องลง
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            ราคาอ่านจากเว็บไซต์ของผู้ให้บริการแต่ละรายเมื่อ {pricesCheckedAt} โดยระบบที่อ่านซ้ำทุกวัน
            เครือข่าย เกณฑ์การใช้งานที่เป็นธรรม ขีดจำกัดฮอตสปอต การมีเบอร์โทร และกฎการคืนเงิน อ่านเมื่อ{" "}
            {SPECS_CHECKED} (Simbye อ่านเมื่อ {SIMBYE_CHECKED} จาก simbye.com และฟีดราคาของ Simbye) ส่วนแถวของ Klook มาจากข้อมูลสินค้าของ Klook เองวันที่ {KLOOK_SPECS_CHECKED}
            เพราะ Klook ตอบการอ่านหน้าสินค้าแบบอัตโนมัติด้วย HTTP 403
          </p>
        </section>

        {/* Quick Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>เทียบเร็ว</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ผู้ให้บริการ", "เหมาะกับ", "ราคาเริ่มต้น", "แพ็กที่ถูกที่สุด", "เครือข่าย", "โทร / SMS", "ซิมจริง", "คะแนน", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topPicks.map(({ id, esimId, bestFor, ctaLabel, ctaAlt }) => {
                    const sim = simCards.find((s) => s.id === id)!;
                    const cheapest = cheapestPlan(esimId);
                    const affiliateUrl = getProvider(ctaAlt?.esimId ?? esimId).affiliateUrl;
                    const url = affiliateUrl === "#" ? PLANS_HREF : affiliateUrl;
                    const isExternal = affiliateUrl !== "#";
                    const label = ctaAlt?.ctaLabel ?? ctaLabel;
                    return (
                      <tr key={id}>
                        <td className={styles.tdProvider}>{sim.provider}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</td>
                        <td className={styles.tdNetwork}>{cheapest ? planName(cheapest.name) : "—"}</td>
                        <td className={styles.tdNetwork}>{getProvider(esimId).network}</td>
                        <td>{sim.voiceCall ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>{sim.physicalSim ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>
                          <span className={styles.tdRating}>
                            {sim.rating !== null && <span style={{ color: "var(--accent)" }}>★</span>}
                            {sim.rating ?? "—"}
                          </span>
                        </td>
                        <td>
                          {isExternal ? (
                            <a
                              href={url}
                              className={styles.tdLink}
                              target="_blank"
                              rel={ctaAlt || esimId === "simbye" ? "sponsored noopener" : "noopener noreferrer nofollow"}
                            >
                              {label}
                            </a>
                          ) : (
                            <Link href={PLANS_HREF} className={styles.tdLink}>
                              {label}
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Unranked extra — Klook's product page blocks automated price reads. */}
                  <tr>
                    <td className={styles.tdProvider}>{thKlookEsim.label}</td>
                    <td className={styles.tdBestFor}>คนที่จองตั๋วกับ Klook อยู่แล้ว</td>
                    <td className={tools.tdMuted}>ดูที่ Klook</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>ไม่ระบุในหน้าสินค้า</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td className={tools.tdMuted}>ไม่จัดอันดับ</td>
                    <td>
                      <KlookLink href={thKlookEsim.url} className={styles.tdLink} target="_blank" rel={KLOOK_REL}>
                        ดูราคา eSIM ของ Klook →
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            แถวของ Klook อยู่นอกการจัดอันดับโดยตั้งใจ ห้ารายด้านบนจัดอันดับจากราคาที่อ่านจากเว็บไซต์ของพวกเขาเองทุกวัน
            แต่รายการ eSIM ของ Klook อ่านอัตโนมัติไม่ได้ในความพยายามครั้งล่าสุด ({KLOOK_CHECKED}) จึงไม่มีราคาหรือ
            ขั้นปริมาณเน็ตที่จะวางเทียบได้ เปิดหน้าสินค้าเพื่อดูตัวเลือกปัจจุบัน
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> ตรวจสอบราคาทุกวัน</span>
            <span>
              ‘ราคาเริ่มต้น’ คือแพ็กเกจญี่ปุ่นที่ถูกที่สุดของผู้ให้บริการแต่ละราย ณ {pricesCheckedAt}{" "}
              <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>ดูทุกแพ็กเกจเรียงตามราคาต่อ GB (ภาษาอังกฤษ) →</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            มีเพียง Sakura Mobile ที่ขายแพ็กโทรได้หรือซิมจริง อีกสี่รายเป็น eSIM เน็ตอย่างเดียว ถ้าคุณต้องมีเบอร์โทร
            ญี่ปุ่น หรือเครื่องของคุณใช้ eSIM ไม่ได้เลย ตัวเลือกก็เหลือหนึ่งเดียวก่อนจะคิดเรื่องราคา ดู{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={tools.inlineLink}>
              ซิมการ์ด vs eSIM สำหรับญี่ปุ่น (ภาษาอังกฤษ) →
            </Link>
          </p>
        </section>

        {/* Q: What is the best eSIM for Japan? — the pick-by-itinerary table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>คำตอบสั้น ๆ</span>
          <h2 className={styles.sectionTitle}>eSIM ญี่ปุ่นเจ้าไหนดีที่สุด?</h2>
          <p className={styles.bodyText}>
            ไม่มีเจ้าเดียวที่ดีที่สุด เพราะผู้ให้บริการทั้งห้าไม่ได้แข่งกันในทริปแบบเดียวกัน Simbye มีราคาปกติต่ำสุดในแพ็กกำหนดปริมาณ
            eSIM Go มีปริมาณเน็ตสูงสุด Airalo คือตัวเลือกสำหรับเน็ตไม่จำกัดที่แชร์เน็ตได้ไม่จำกัด
            ส่วน Sakura Mobile เป็นทางเดียวที่จะได้เบอร์โทรญี่ปุ่น หาแถวที่ตรงกับคุณ:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ทริปของคุณ</th>
                    <th>ควรซื้ออะไร</th>
                    <th>เหตุผล — วัน, GB, ค่าย, ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  {itineraryPicks.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider} style={{ minWidth: "170px" }}>{row.trip}</td>
                      <td className={styles.tdBestFor} style={{ minWidth: "180px" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "300px" }}>{row.detail()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            ราคา ณ {pricesCheckedAt} รายชื่อค่าย เกณฑ์การใช้งานที่เป็นธรรม และจำนวนประเทศของ eSIM โซน อ่านจากเว็บไซต์ของ
            ผู้ให้บริการแต่ละรายเมื่อ {SPECS_CHECKED}
          </p>
          <KlookEsimSlot why="ถ้าตั๋วและการเดินทางของทริปนี้อยู่ในตะกร้า Klook แล้ว eSIM ญี่ปุ่นของ Klook เองก็จ่ายรวมในครั้งเดียวกันได้ — แพ็กรายวันใช้ SoftBank 5G แพ็กปริมาณรวมใช้ docomo 4G LTE รองรับการแชร์เน็ต ที่นี่ไม่จัดอันดับให้เพราะหน้าสินค้าบล็อกการอ่านราคาอัตโนมัติ เปิดดูเพื่อเช็กตัวเลือกปัจจุบัน" />
        </section>

        {/* Q: Which eSIM is best for a 2-week trip? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>สองสัปดาห์</span>
          <h2 className={styles.sectionTitle}>เที่ยวญี่ปุ่น 2 สัปดาห์ ใช้ eSIM ไหนดี?</h2>
          <p className={styles.bodyText}>
            <strong>{tripPlanLabel(14, 14)}</strong> คือแพ็กที่ถูกที่สุดที่ขายอยู่ซึ่งครอบคลุม 14 วันที่วันละ 1 GB และ{" "}
            <strong>{tripPlanLabel(14, 7)}</strong> ก็พอถ้าคุณใช้แค่แผนที่ แชต และถ่ายรูปบ้าง มากกว่าดูวิดีโอ ทั้งสองเป็น
            แพ็ก 30 วัน ดังนั้นสำหรับทริปสองสัปดาห์ ข้อจำกัดไม่ใช่อายุแพ็ก — แต่เป็นปริมาณเน็ต
          </p>
          <p className={styles.bodyText}>
            มีสองทางเลือกที่คุ้มกับเงินที่เพิ่มขึ้นด้วยเหตุผลเฉพาะ ไม่ใช่โดยทั่วไป แพ็ก{" "}
            {planLabel(allEsimPlans.find((p) => p.id === "sakura-45-gb-15-days") ?? null)} ของ Sakura Mobile
            ให้ 3 GB ทุกเช้าบน Docomo 5G แทนเน็ตก้อนเดียวที่ต้องคอยประหยัด เหมาะกับสองสัปดาห์ที่มีภูเขาหรือเกาะเล็ก ๆ
            และถ้าการเดินทางทำงานสองสัปดาห์หมายถึงต้องแชร์เน็ตให้แล็ปท็อป {planLabel(cheapestUnlimited("esimgo", 15))}{" "}
            หรือ {planLabel(cheapestUnlimited("airalo", 15))} ซื้อเน็ตไม่จำกัดได้ในช่วงเวลาเดียวกัน — ดูตารางการลดความเร็ว
            ด้านล่างว่าแต่ละแพ็กลดเหลือเท่าไร
          </p>
        </section>

        {/* Q: How much data do I need in Japan? — the days-to-GB table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เลือกขนาดแพ็ก</span>
          <h2 className={styles.sectionTitle}>ไปญี่ปุ่นต้องใช้เน็ตเท่าไร?</h2>
          <p className={styles.bodyText}>
            วางแผนไว้ที่<strong>วันละ 0.5 GB</strong> สำหรับแผนที่ แชต ถ่ายรูปบ้าง และเปิดดูตารางรถไฟเป็นครั้งคราว และ{" "}
            <strong>วันละ 1 GB</strong> เมื่อมีวิดีโอคอล วิดีโอโซเชียล หรือสตรีมเพลงเข้ามาด้วย นั่นทำให้ทริป 10 วันอยู่ที่
            5–10 GB สองสัปดาห์ 7–14 GB และสามสัปดาห์ 10.5–21 GB — ยังอยู่ในขอบเขตที่ผู้ให้บริการเองถือว่าเป็นการใช้หนัก
            อย่างสบาย เพราะเกณฑ์การใช้งานที่เป็นธรรมของ Airalo คือวันละ 3 GB ขีดจำกัดรายวันของ Sakura Mobile คือ 3 GB
            และแพ็กไม่จำกัดของสินค้า Klook เร็วเต็มที่วันละ 10 GB
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ระยะเวลาทริป</th>
                    <th>ที่วันละ 0.5 GB</th>
                    <th>ที่วันละ 1 GB</th>
                    <th>แพ็กถูกที่สุดที่ครอบคลุมวันละ 0.5 GB</th>
                    <th>แพ็กถูกที่สุดที่ครอบคลุมวันละ 1 GB</th>
                  </tr>
                </thead>
                <tbody>
                  {dataNeedRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.days} วัน</td>
                      <td className={styles.tdPrice}>{row.light} GB</td>
                      <td className={styles.tdPrice}>{row.normal} GB</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>
                        {tripPlanLabel(row.days, row.light)}
                      </td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>
                        {tripPlanLabel(row.days, row.normal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            คอลัมน์ GB คำนวณจากตัวเลขวางแผนด้านบน คอลัมน์แพ็กคือแพ็กที่ถูกที่สุดที่ขายอยู่ซึ่งครอบคลุมปริมาณนั้น จากราคาที่
            อ่านเมื่อ {pricesCheckedAt} ไม่รวม Holafly ในสองคอลัมน์นี้ เพราะเว็บไซต์นี้ไม่มีลิงก์ให้ซื้อ แพ็กจำกัดรายวัน
            คิดเป็นขีดจำกัด × จำนวนวันของทริป แทนปริมาณรวมที่โฆษณา ซึ่งเป็นวิธีเดียวที่เทียบกับแพ็กปริมาณคงที่ได้อย่างเท่าเทียม{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>
              ทุกแพ็กเกจ เรียงตามราคาต่อ GB (ภาษาอังกฤษ) →
            </Link>
          </p>
          <KlookEsimSlot why="eSIM ญี่ปุ่นของ Klook เองขายเป็นขั้นตั้งแต่ 500 MB ถึง 50 GB พร้อมตัวเลือกไม่จำกัด จึงครอบคลุมขนาดเดียวกัน — ที่นี่ไม่แสดงราคาเพราะอ่านหน้าสินค้าแบบอัตโนมัติไม่ได้" />
        </section>

        {/* Q: Which network is best in Japan? — carrier table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เครือข่าย</span>
          <h2 className={styles.sectionTitle}>เครือข่ายไหนดีที่สุดในญี่ปุ่น: Docomo, au หรือ SoftBank?</h2>
          <p className={styles.bodyText}>
            บนเส้นทางโตเกียว–เกียวโต–โอซาก้า–ฮิโรชิมา แทบไม่มีความต่างในทางปฏิบัติ — ทั้งสามค่ายครอบคลุมตัวเมืองและแนว
            ชินคันเซ็น ความต่างจะเกิดเมื่อออกนอกเส้นทางเหล่านั้น ซึ่งเครือข่าย Docomo เป็นฐานที่ผู้ให้บริการสัญชาติญี่ปุ่นใช้
            สร้างแพ็กสำหรับชนบท และไม่มีผู้ให้บริการรายใดเผยแพร่เปอร์เซ็นต์การครอบคลุมในหน้าที่เราอ่าน วิธีเลือกที่ซื่อตรงจึง
            คือดูว่าแพ็กใช้เครือข่ายอะไรจริง ไม่ใช่ดูคำโฆษณา แบรนด์ในหน้าชำระเงินไม่ใช่เครือข่าย:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>แพ็กเกจ</th>
                    <th>ค่ายในญี่ปุ่น</th>
                    <th>สิ่งที่ผู้ให้บริการระบุ</th>
                    <th>ตรวจสอบ</th>
                  </tr>
                </thead>
                <tbody>
                  {networkRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ minWidth: "180px" }}>{row.provider}</td>
                      <td className={styles.tdNetwork} style={{ minWidth: "180px" }}>{row.carriers}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "280px" }}>{row.how}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            ถ้าไม่อยากเลือกค่ายเลย Simbye และ eSIM Go คือแพ็กที่ไม่บังคับให้คุณต้องเลือก: ทั้งสองรายระบุชื่อสี่ค่าย
            และเลือกค่ายให้อัตโนมัติ
          </p>
        </section>

        {/* "Unlimited", throttling and hotspot */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>รายละเอียดเงื่อนไข</span>
          <h2 className={styles.sectionTitle}>‘ไม่จำกัด’ หมายถึงอะไรจริง ๆ และแชร์เน็ตได้ไหม</h2>
          <p className={styles.bodyText}>
            ไม่มีแพ็กไม่จำกัดของญี่ปุ่นที่เร็วเต็มที่ไปตลอด ทุกแพ็กเผยแพร่เกณฑ์และความเร็วที่ลดลงหลังเกณฑ์นั้น และฮอตสปอต
            คือจุดที่ต่างกันมากที่สุด — รายหนึ่งไม่จำกัดการแชร์เน็ต อีกรายจำกัดเป็นกิกะไบต์ ถ้าการแชร์เน็ตให้แล็ปท็อปคือ
            เหตุผลที่คุณซื้อแพ็กไม่จำกัด คอลัมน์นี้คือตัวตัดสิน:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>แพ็กเกจ</th>
                    <th>เร็วเต็มที่ถึง</th>
                    <th>หลังจากนั้น</th>
                    <th>ฮอตสปอต / แชร์เน็ต</th>
                    <th>ตรวจสอบ</th>
                  </tr>
                </thead>
                <tbody>
                  {unlimitedRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider} style={{ minWidth: "170px" }}>{row.plan}</td>
                      <td className={styles.tdPrice} style={{ minWidth: "150px", whiteSpace: "normal" }}>{row.full}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "240px" }}>{row.after}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.hotspot}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            ข้อความในเครื่องหมายคำพูดแปลจากถ้อยคำของผู้ให้บริการเอง อ่านในวันที่ระบุในคอลัมน์สุดท้าย Holafly เป็นผู้ขาย
            แพ็กไม่จำกัดรายที่หก และจำกัดฮอตสปอตวันละ 1 GB อยู่ในตารางเปรียบเทียบด้านบน แต่ไม่มีลิงก์ที่นี่ เพราะไม่มี
            โปรแกรมพันธมิตรที่เว็บไซต์นี้เข้าร่วมได้{" "}
            <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>
              eSIM ไม่จำกัดสำหรับญี่ปุ่นแบบละเอียด (ภาษาอังกฤษ) →
            </Link>
          </p>
        </section>

        {/* Phone numbers, SMS and voice */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>โทรและ SMS</span>
          <h2 className={styles.sectionTitle}>เบอร์โทรญี่ปุ่น SMS และการโทร</h2>
          <p className={styles.bodyText}>
            ห้าในหกรายเป็นเน็ตอย่างเดียว — ไม่มีเบอร์ญี่ปุ่น ไม่มี SMS ไม่มีการโทร eSIM Go ระบุตรง ๆ (“ไม่รวม SMS หรือ
            การโทร เน็ตอย่างเดียว”) หน้าญี่ปุ่นของ Simbye ระบุว่า “การโทรและข้อความ: ไม่รวม” แพ็กญี่ปุ่นของ Airalo เป็นเน็ตอย่างเดียวไม่มีเบอร์ และสินค้าของ Klook ระบุประเภทบริการ
            ว่า ‘ไม่มีเบอร์ — เน็ตอย่างเดียว’
          </p>
          <p className={styles.bodyText}>
            ข้อยกเว้นคือ <strong>eSIM Voice + Data ของ Sakura Mobile</strong>: au (KDDI) 5G เน็ตความเร็วสูงวันละ 3 GB
            เบอร์ญี่ปุ่นที่โทรและส่ง SMS ได้ และนาทีโทรที่เพิ่มตามแพ็ก — 120 นาทีสำหรับแพ็ก 1–10 วัน 240 นาทีสำหรับ
            11–60 วัน และ 360 นาทีสำหรับ 61 วันขึ้นไป มีเงื่อนไขหนึ่งที่แพ็กเน็ตอย่างเดียวไม่มี: ต้องยืนยันตัวตนแบบพบหน้าใน
            ญี่ปุ่น และระยะเวลาใช้งานเริ่มหลังการยืนยันนั้น ไม่ใช่ตอนเครื่องลง อ่านจาก sakuramobile.jp เมื่อ {SPECS_CHECKED}
          </p>
          <p className={styles.bodyText}>
            ถ้าสิ่งที่คุณต้องการจริง ๆ คือรับ SMS รหัสยืนยันจากธนาคาร คุณไม่จำเป็นต้องมีเบอร์ญี่ปุ่นเลย: เปิดซิมไทยไว้คู่กับ
            eSIM แล้วให้ eSIM รับหน้าที่เน็ต สำหรับการโทร LINE คือแอปที่ญี่ปุ่นเองใช้ และ WhatsApp หรือ FaceTime
            ก็ใช้ผ่านเน็ตได้{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={tools.inlineLink}>
              แพ็กอยู่ยาวที่มีเบอร์ (ภาษาอังกฤษ) →
            </Link>
          </p>
        </section>

        {/* Refunds and install timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>จังหวะเวลา</span>
          <h2 className={styles.sectionTitle}>เริ่มนับเวลาเมื่อไร และยังขอเงินคืนได้ถึงเมื่อไร</h2>
          <p className={styles.bodyText}>
            การติดตั้งล่วงหน้าเป็นทางที่ถูกกับผู้ให้บริการรายหนึ่ง แต่เป็นความผิดพลาดราคาแพงกับอีกราย เพราะผู้ให้บริการ
            ไม่ได้ตกลงกันว่าอะไรเป็นตัวเริ่มนับระยะเวลาใช้งาน ความต่างนี้มีค่าเท่ากับหนึ่งหรือสองวันของแพ็กสั้น ๆ:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ผู้ให้บริการ</th>
                    <th>อะไรเริ่มนับเวลา</th>
                    <th>ติดตั้งก่อนบินได้ไหม?</th>
                    <th>คืนเงินถ้าไม่ได้ใช้</th>
                    <th>ตรวจสอบ</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ minWidth: "140px" }}>{row.provider}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "300px" }}>{row.starts}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.install}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "220px" }}>{row.refund}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Q: Do I need an eSIM for Japan? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ก่อนซื้ออะไร</span>
          <h2 className={styles.sectionTitle}>ไปญี่ปุ่นจำเป็นต้องใช้ eSIM ไหม?</h2>
          <p className={styles.bodyText}>
            ไม่จำเป็น — การเข้าประเทศญี่ปุ่นไม่ได้บังคับ และโรงแรม ร้านสะดวกซื้อ สถานี และคาเฟ่ส่วนใหญ่มี Wi-Fi สิ่งที่
            eSIM ให้คือช่วงระหว่างนั้น: ชานชาลารถไฟที่ตารางเวลาเปลี่ยน ป้ายรถเมล์ที่ต้องดูแผนที่ คิวร้านอาหารที่ต้องสแกน
            เมนู QR ตัวเลือกญี่ปุ่นที่ถูกที่สุดในหน้านี้คือ {planLabel(cheapestPlan("simbye"))} จาก Simbye
            ซึ่งถูกกว่าค่าโรมมิ่งหนึ่งวันที่ค่ายส่วนใหญ่เรียกเก็บ
          </p>
          <p className={styles.bodyText}>
            มีสองเรื่องที่ต้องเช็กสำคัญกว่าราคา เครื่องของคุณต้องรองรับ eSIM และไม่ติดล็อกค่าย และแพ็กต้องตรงกับวิธีเที่ยว
            ของคุณ ไม่ใช่แค่จำนวนวันที่ไป — แพ็ก 30 วันที่มี 5 GB เป็นการซื้อที่ผิดสำหรับสองสัปดาห์ที่วิดีโอคอลบ่อย{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" className={tools.inlineLink}>
              มือถือของคุณใช้ eSIM ในญี่ปุ่นได้ไหม? (ภาษาอังกฤษ) →
            </Link>
          </p>
        </section>

        {/* Q: iPhone and Android */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ตามรุ่นมือถือ</span>
          <h2 className={styles.sectionTitle}>eSIM ไหนใช้กับ iPhone และ Android ในญี่ปุ่นได้ดีที่สุด?</h2>
          <p className={styles.bodyText}>
            ตัวเดียวกันทั้งสองระบบ ผู้ให้บริการทั้งห้าไม่มีใครขายแพ็กญี่ปุ่นเฉพาะ iPhone หรือเฉพาะ Android — เป็นโปรไฟล์
            eSIM มาตรฐาน ติดตั้งจาก QR code หรือลิงก์เปิดใช้งาน และควรเลือกผู้ให้บริการจากตารางด้านบน ไม่ใช่จากรุ่นเครื่อง
            สิ่งที่ต่างคือสิ่งที่ต้องเช็กก่อนซื้อและเมนูที่ใช้ติดตั้ง
          </p>
          <p className={styles.bodyText}>
            บน iPhone ต้องเป็น iPhone XS ขึ้นไปและเครื่องไม่ติดล็อก เพิ่มโปรไฟล์ที่ ตั้งค่า → เซลลูลาร์ ส่วน Android ต้องเช็ก
            EID และเมนูอยู่คนละที่บน Samsung, Pixel, Xperia และ OnePlus แต่ละแบบมีไกด์ของตัวเอง:{" "}
            <Link href="/guides/esim/japan-esim-iphone" className={tools.inlineLink}>
              eSIM ญี่ปุ่นบน iPhone (ภาษาอังกฤษ) →
            </Link>{" "}
            และ{" "}
            <Link href="/guides/esim/japan-esim-android" className={tools.inlineLink}>
              eSIM ญี่ปุ่นบน Android (ภาษาอังกฤษ) →
            </Link>
          </p>
        </section>

        {/* Top Picks */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>ตัวเลือกของเรา</span>
          <h2 className={styles.sectionTitle}>eSIM ญี่ปุ่น 5 อันดับแรก</h2>
          <div className={styles.picksList}>
            {topPicks.map(({ id, esimId, rank, bestFor, badgeCls, target, ctaLabel, ctaAlt, why }) => {
              const sim = simCards.find((s) => s.id === id)!;
              const copy = SIM_COPY[id];
              const affiliateUrl = getProvider(ctaAlt?.esimId ?? esimId).affiliateUrl;
              const url = affiliateUrl === "#" ? PLANS_HREF : affiliateUrl;
              const isExternal = affiliateUrl !== "#";
              const label = ctaAlt?.ctaLabel ?? ctaLabel;
              return (
                <article key={id} id={id} className={styles.pickCard}>
                  <div className={styles.pickCardHeader}>
                    <div className={styles.pickRank}>
                      <span className={styles.pickNumber}>{rank}</span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${badgeCls}`}>{bestFor}</span>
                        <span className={styles.pickName}>{copy.name}</span>
                      </div>
                    </div>
                    <span className={styles.pickRating}>
                      {sim.rating !== null && <span style={{ color: "var(--accent)" }}>★</span>}
                      {sim.rating ?? "—"}
                    </span>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>{copy.summary}</p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>เหมาะกับ:</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickTarget} style={{ marginTop: "0.6rem" }}>
                      <span className={styles.pickTargetLabel}>ทำไมถึงอันดับ {rank}:</span>
                      <span>{why()}</span>
                    </div>
                    <div className={styles.pickGrid}>
                      <div className={styles.pickPros}>
                        <p className={styles.pickListLabel}>ข้อดี</p>
                        <ul className={styles.pickList}>
                          {copy.pros.map((p) => (
                            <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.pickCons}>
                        <p className={styles.pickListLabel}>ข้อเสีย</p>
                        <ul className={styles.pickList}>
                          {copy.cons.map((c) => (
                            <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.pickCtaRow}>
                      {isExternal ? (
                        <a
                          href={url}
                          className={styles.pickCta}
                          target="_blank"
                          rel={ctaAlt || esimId === "simbye" ? "sponsored noopener" : "noopener noreferrer nofollow"}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link href={PLANS_HREF} className={styles.pickCta}>
                          {label}
                        </Link>
                      )}
                      <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                        เทียบทุกแพ็กเกจ (ภาษาอังกฤษ)
                      </Link>
                    </div>
                    {esimId === "simbye" && <SimbyeOffer copy={SIMBYE_OFFER} />}
                    {ctaAlt && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                        {ctaAlt.note}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Fifth slot, deliberately unranked — see the note under the comparison table. */}
          <article id="klook-japan-esim" className={styles.pickCard} style={{ marginTop: "1.5rem" }}>
            <div className={styles.pickCardHeader}>
              <div className={styles.pickRank}>
                <div className={styles.pickMeta}>
                  <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>มีให้เลือกด้วย</span>
                  <span className={styles.pickName}>{thKlookEsim.label}</span>
                </div>
              </div>
            </div>
            <div className={styles.pickCardBody}>
              <p className={styles.pickSummary}>
                Klook ขาย eSIM ญี่ปุ่นของตัวเองด้วย และน่าดูถ้าคุณจองตั๋วหรือการเดินทางที่นั่นอยู่แล้ว — จ่ายครั้งเดียว
                บัญชีเดียว เราไม่จัดอันดับให้: หน้าสินค้าของ Klook บล็อกการอ่านราคาอัตโนมัติ เราจึงไม่มีราคาที่ตรวจสอบแล้ว
                มาจัดอันดับ เปิดหน้าสินค้าเพื่อดูตัวเลือกปัจจุบัน
              </p>
              <div className={styles.pickTarget}>
                <span className={styles.pickTargetLabel}>เหมาะกับ:</span>
                <span>นักเดินทางที่ซื้อตั๋วหรือการเดินทางในญี่ปุ่นบน Klook อยู่แล้ว และอยากได้ eSIM ในบัญชีเดียวกัน</span>
              </div>
              <div className={styles.pickCtaRow}>
                <KlookLink href={thKlookEsim.url} className={styles.pickCta} target="_blank" rel={KLOOK_REL}>
                  ดูราคา eSIM ของ Klook →
                </KlookLink>
                <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                  เทียบทุกแพ็กเกจ (ภาษาอังกฤษ)
                </Link>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                บน Klook ใช้ชื่อสินค้าว่า “{klookEsim.listingTitle}” ที่นี่ไม่แสดงราคาหรือปริมาณเน็ต เพราะอ่านหน้าสินค้า
                แบบอัตโนมัติไม่ได้เมื่อ {KLOOK_CHECKED}
              </p>
            </div>
          </article>
        </section>

        <EsimBuyGuide copy={esimPicksCopy["th"]} />

        <FaqList items={faqItems} />

        {/* Deep dives — these answer questions this comparison deliberately keeps short. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เจาะลึก</span>
          <h2 className={styles.sectionTitle}>ถ้าสถานการณ์ของคุณเฉพาะกว่านั้น</h2>
          <p className={styles.bodyText}>
            หน้านี้จัดอันดับผู้ให้บริการทั้งห้าสำหรับทริปทั่วไป มีหลายสถานการณ์ที่พบบ่อยซึ่งทำให้คำตอบเปลี่ยน และแต่ละแบบ
            มีไกด์ของตัวเอง (ทั้งหมดเป็นภาษาอังกฤษ):
          </p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
                eSIM ใช้ในญี่ปุ่นได้หรือเปล่า? (ภาษาอังกฤษ)
              </Link>{" "}
              — สามเรื่องที่ต้องเช็กบนเครื่องก่อนซื้ออะไรทั้งนั้น
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--accent)", fontWeight: 600 }}>
                ซิมการ์ด vs eSIM (ภาษาอังกฤษ)
              </Link>{" "}
              — สองสถานการณ์ที่ซิมจริงเป็นทางเดียว ไม่ว่าราคาจะเป็นอย่างไร
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-students" style={{ color: "var(--accent)", fontWeight: 600 }}>
                นักศึกษาและการไปเรียนระยะยาว (ภาษาอังกฤษ)
              </Link>{" "}
              — ราคาต่อเดือน และเมื่อไรที่ MVNO ในประเทศชนะ eSIM นักท่องเที่ยวทุกเจ้า
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-family-group" style={{ color: "var(--accent)", fontWeight: 600 }}>
                ครอบครัวและกลุ่ม (ภาษาอังกฤษ)
              </Link>{" "}
              — จำนวนคนที่ Pocket WiFi ตัวเดียวใช้ร่วมกันคุ้มกว่า eSIM คนละอัน
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-business" style={{ color: "var(--accent)", fontWeight: 600 }}>
                เดินทางเพื่อธุรกิจ (ภาษาอังกฤษ)
              </Link>{" "}
              — เงื่อนไขฮอตสปอตสำคัญกว่าราคา เพราะการแชร์เน็ตให้แล็ปท็อปทำให้การใช้ต่อวันเพิ่มเป็นสามเท่า
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--accent)", fontWeight: 600 }}>
                บน Android (ภาษาอังกฤษ)
              </Link>{" "}
              — การเช็ก EID และเมนูที่ต้องเปิดบน Samsung, Pixel, Xperia และ OnePlus
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/simbye-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Simbye แบบละเอียด (ภาษาอังกฤษ)
              </Link>{" "}
              — ตัวเลือกราคาต่ำสุดของเรา: ทุกแพ็กญี่ปุ่น โค้ดส่วนลด และใครที่ไม่เหมาะ
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/esim-go-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                eSIM Go แบบละเอียด (ภาษาอังกฤษ)
              </Link>{" "}
              — ทีละผู้ให้บริการ: ราคา เครือข่าย และการแชร์เน็ต
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Reddit แนะนำอะไร (ภาษาอังกฤษ)
              </Link>{" "}
              — คำแนะนำประจำของ r/JapanTravel เทียบกับราคาเดือนนี้
            </li>
          </ul>
        </section>

        <Related
          items={[
            { href: "/guides/esim/japan-esim-10-days", title: "eSIM ญี่ปุ่น 10 วัน: ต้องใช้เน็ตเท่าไร? (ภาษาอังกฤษ)" },
            { href: "/guides/esim/japan-esim-data-plans", title: "แพ็กเน็ต eSIM ญี่ปุ่น 2026: ต้องใช้เน็ตเท่าไร? (ภาษาอังกฤษ)" },
            { href: "/guides/esim/japan-sim-card-long-term-stay", title: "ซิมญี่ปุ่นสำหรับอยู่ระยะยาว: แพ็ก 90 วันขึ้นไป (ภาษาอังกฤษ)" },
            { href: "/guides/esim/cheapest-esim-japan", title: "eSIM ญี่ปุ่นที่ถูกที่สุด 2026: ตัวเลือกงบประหยัด (ภาษาอังกฤษ)" },
            { href: "/guides/esim/airalo-japan-review", title: "รีวิว Airalo ญี่ปุ่น 2026: คุ้มไหม? (ภาษาอังกฤษ)" },
            { href: "/guides/esim/sakura-mobile-review", title: "รีวิว Sakura Mobile 2026: ซิมที่ดีที่สุดสำหรับอยู่ยาว? (ภาษาอังกฤษ)" },
            { href: "/guides/esim/japan-esim-unlimited", title: "eSIM ไม่จำกัดที่ดีที่สุดสำหรับญี่ปุ่น (2026): สำหรับคนใช้หนัก (ภาษาอังกฤษ)" },
            { href: "/guides/esim/how-to-set-up-esim-japan", title: "วิธีตั้งค่า eSIM ในญี่ปุ่น (ทีละขั้นตอน) (ภาษาอังกฤษ)" },
            { href: "/guides/esim/japan-esim-iphone", title: "eSIM ญี่ปุ่นที่ดีที่สุดบน iPhone (2026): ตั้งค่าและตัวเลือก (ภาษาอังกฤษ)" },
            { href: "/guides/esim/airalo-vs-holafly-japan", title: "Airalo vs Holafly สำหรับญี่ปุ่น: eSIM ไหนชนะ? (ภาษาอังกฤษ)" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>พร้อมเทียบทุกแพ็กเกจแล้วหรือยัง?</h2>
            <p className={styles.ctaBannerDesc}>
              ทุกแพ็กเกจ eSIM ญี่ปุ่นจากผู้ให้บริการทั้งห้า เรียงตามราคาต่อ GB และอัปเดตทุกวัน
            </p>
            <Link href={PLANS_HREF} className={styles.ctaBannerBtn}>
              ดูทุกแพ็กเกจตามราคาต่อ GB (ภาษาอังกฤษ) →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
