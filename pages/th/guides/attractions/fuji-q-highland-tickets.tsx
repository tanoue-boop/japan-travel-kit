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
import BookingEsimCard from "../../../../components/BookingEsimCard";
import HotelStayBlock from "../../../../components/HotelStayBlock";
import {
  fujiHakoneDayTour,
  fujiQHighlandAdmission,
  fujiQHighlandPass,
  fujiQHighlandQPack,
  fujikawaguchikoHotels,
  kawaguchikoYamanakakoBusTour,
  mtFujiPass,
  naritaLimousineBus,
  tokyoMtFujiHighwayBus,
  tokyoStayAreas,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/fuji-q-highland-tickets) section by section as of
// 2026-11-28 (task-jtk-20261128-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (fujiq.jp and bus.fujikyu.co.jp,
// read 23 Nov 2026); nothing is added. Title terms: ตั๋วฟูจิคิว ไฮแลนด์ and ราคา — the park's name as
// Thai results write it (trvlogue.com/th, jeepe.jp/th), with the pass names kept in English
// (One Day Pass / Free Pass) as those pages do. Ride names stay in English.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/fuji-q-highland-tickets";
const TITLE = "ตั๋วฟูจิคิว ไฮแลนด์ 2026: ราคา";
const H1 = "ตั๋วฟูจิคิว ไฮแลนด์ 2026: ราคา การเข้าสวนฟรี และ Free Pass";
const DESC = "ฟูจิคิวเข้าฟรี One Day Pass ¥6,000–¥7,900 ตามวันที่ รถไฟเหาะใหญ่รอบละ ¥2,000";

const LAST_CHECKED = "2026-11-23";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);

const OFFICIAL = {
  ticket: "https://www.fujiq.jp/en/ticket/",
  rides: "https://www.fujiq.jp/en/ticket/attraction.html",
  priority: "https://www.fujiq.jp/en/ticket/priority.html",
  tokuQ: "https://bus.fujikyu.co.jp/otoku/fujiq-beginner/",
  superTokuQ: "https://www.fujiq.jp/event/tokuQpack_2025.html",
  hours: "https://www.fujiq.jp/en/schedule/index.html",
  hotel: "https://www.fujiq.jp/en/relate/index.html",
  bus: "https://bus.fujikyu.co.jp/highway/detail/id/1",
};

const QPACK_URL = klookFor(fujiQHighlandQPack.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const textLink = { color: "var(--text)", fontWeight: 600 } as const;
const lastChecked = { marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

// Row 1 is the answer; the rest are adult prices as fujiq.jp lists them.
const priceRows = [
  ["ควรซื้อแบบไหน", "รถไฟเหาะใหญ่ 4 เครื่องขึ้นไป → One Day Pass", "1–2 เครื่อง → เข้าสวนฟรีแล้วจ่ายเป็นรอบ ส่วนคนที่มาจากโตเกียวด้วยรถบัส → Toku-Q Pack"],
  ["เข้าสวน (ตั๋วเข้าสวนฟรี)", "ฟรี (¥0)", "เข้าสวนได้อย่างเดียว เครื่องเล่นทุกเครื่องจ่ายที่ตู้ขายตั๋วในสวน"],
  ["One Day Pass (Free Pass)", "¥6,000 – ¥7,900 ตามวันที่", "เล่นได้ไม่จำกัดรอบทั้งวัน ยกเว้นเครื่องเล่นที่สวนประกาศว่าใช้ไม่ได้"],
  ["Afternoon Pass", "¥4,100 – ¥6,000 ตามวันที่", "เล่นได้ไม่จำกัดรอบตั้งแต่ 13:00 น."],
  ["Sunset★Night Pass", "¥3,700 / ¥4,000", "ใช้ได้ตั้งแต่ 16:00 น. ในวันที่สวนเปิดถึงหลัง 19:00 น. ขายที่สวนในวันนั้นเท่านั้น"],
  ["Thomas Land Pass", "¥3,000 – ¥3,500 ตามวันที่", "เล่นเครื่องเล่นใน Thomas Land ได้ทั้ง 12 เครื่อง เครื่องเล่นนอก Thomas Land จ่ายแยก"],
  ["One Day Pass แบบเข้าสวนก่อนเวลา", "ตามตารางราคารายเดือน", "ซื้อออนไลน์เท่านั้น เข้าสวนได้ก่อนเวลาเปิด ช่วงนั้นเปิดเฉพาะรถไฟเหาะใหญ่ ไม่ขายระหว่าง 1 ธ.ค. 2026 – 5 ก.พ. 2027"],
  ["One Day Pass แบบต่อคิวเสมือน (Bunshin-kun)", "ราคา One Day Pass + ¥2,000", "ต่อคิวเครื่องเล่นที่กำหนดผ่านแอป Q-chan จำนวนจำกัด ขายเฉพาะผู้ใหญ่ถึงเด็กประถม"],
  ["รถไฟเหาะใหญ่ 1 รอบ", "¥2,000", "Fujiyama, Takabisha, Eejanaika, ZOKKON, Attack on Titan THE RIDE"],
];

const ageRows = [
  ["ผู้ใหญ่ (18–64 ปี)", "¥6,000 – ¥7,900", "¥4,100 – ¥6,000"],
  ["นักเรียนมัธยมต้นและมัธยมปลาย", "¥5,500 – ¥7,400", "¥3,800 – ¥5,700"],
  ["นักเรียนประถม", "¥4,400 – ¥5,100", "¥3,500 – ¥4,200"],
  ["เด็กเล็ก (1 ปีขึ้นไป)", "¥2,100 – ¥2,600", "¥1,700 – ¥2,100"],
  ["ผู้สูงอายุ (65 ปีขึ้นไป)", "¥2,100 – ¥2,600", "¥1,700 – ¥2,100"],
];

// Pay per ride, from fujiq.jp/en/ticket/attraction.html. Row 1 is the break-even.
const rideRows = [
  ["จุดคุ้มทุน", "รถไฟเหาะใหญ่ 3 รอบ = ¥6,000", "เท่ากับราคาพาสในวันที่ถูกที่สุด ส่วน 4 รอบ (¥8,000) แพงกว่าพาสทุกวัน"],
  ["Fujiyama, Takabisha, Eejanaika, ZOKKON, Attack on Titan THE RIDE", "รอบละ ¥2,000", "เครื่องเล่นที่ผู้มาเยือนส่วนใหญ่ตั้งใจมาเล่น"],
  ["Tondemina, Tekkotsubanchou, Nagashimasuka, Fuji Airways, Panic Rock, Desperation Fortress, 3D Shooting Ride", "รอบละ ¥1,500", "Tentekomai (ราคา ¥1,500 เช่นกัน) ปิดถึงปลายเดือนกรกฎาคม 2027"],
  ["Senritsu Meikyu (บ้านผีโรงพยาบาลร้าง)", "กลุ่มละ ¥4,000 / ¥8,000", "สูงสุด 4 คน ¥4,000 ถ้ามี One Day Pass หรือ Afternoon Pass และ ¥8,000 ถ้าไม่มี ขายเป็นตั๋วระบุรอบเวลา"],
  ["เครื่องเล่นใน Thomas Land", "รอบละ ¥500", "หรือซื้อ Thomas Land Pass ราคา ¥3,000 – ¥3,500"],
];

// The Toku-Q Pack, the plain pass and the priority ticket side by side. Row 1 is the answer.
const compareRows = [
  ["ควรเลือกแบบไหน", "—", "มาจากโตเกียวด้วยรถบัส: Toku-Q Pack อยู่แถวทะเลสาบแล้วหรือมาทางรถไฟ: One Day Pass วันที่คนเยอะ: ซื้อ Priority Ticket เพิ่ม"],
  ["Super Toku-Q Pack (ออกจาก Busta Shinjuku)", "ผู้ใหญ่ ¥11,100 / มัธยม ¥10,700 / ประถม ¥7,100", "รถบัสทางด่วนไป-กลับ + One Day Pass + สิทธิ์เล่นรถไฟเหาะ 1 เครื่องแบบลดเวลารอคิว 1 รอบ (ใช้ช่วง 9:00–10:00 น.)"],
  ["Toku-Q Pack (จุดออกเดินทางอื่น)", "ราคาตามจุดออกเดินทาง", "รถบัสตรงไป-กลับ + One Day Pass ออกจากกว่า 30 จุดรอบโตเกียวและชิซุโอกะ รวมถึงนาโกย่า เกียวโต และโอซาก้า"],
  ["One Day Pass อย่างเดียว", "¥6,000 – ¥7,900 ตามวันที่", "เล่นได้ไม่จำกัดรอบ ไม่รวมการเดินทาง"],
  ["Priority Ticket (ตั๋วลดเวลารอคิวของฟูจิคิว)", "ราคาตามเครื่องเล่นและรอบเวลา ทุกวัยราคาเท่ากัน", "ลดเวลารอคิวเครื่องเล่น 1 เครื่อง ยังต้องมีพาสหรือตั๋วเครื่องเล่น ขายออนไลน์ตั้งแต่ 18:00 น. ของ 3 วันก่อน"],
];

const hoursRows = [
  ["คำตอบสั้น ๆ", "เปิด 9:00 หรือ 10:00 น. ปิด 17:00 – 20:00 น.", "เวลาเปิดปิดเปลี่ยนตามวันที่ ตรวจสอบตารางรายเดือนก่อนไป"],
  ["พฤศจิกายน 2026", "9:00 – 18:00 / 19:00 / 20:00 น.", "30 พ.ย. เปิด 10:00 – 17:00 น. เดือนพฤศจิกายนไม่มีวันหยุด"],
  ["ธันวาคม 2026 วันธรรมดา (ถึง 25 ธ.ค.)", "10:00 – 17:00 น.", "ปิดวันพฤหัสบดีที่ 10 ธันวาคม"],
  ["ธันวาคม 2026 วันเสาร์อาทิตย์", "9:00 – 18:00 น.", "5–6, 12–13 และ 19–20 ธันวาคม"],
  ["26 – 30 ธันวาคม 2026", "9:00 – 19:00 น.", "31 ธันวาคม เปิด 9:00 น. ถึง 1:00 น. ของวันถัดไป"],
  ["เครื่องเล่นที่ปิดปรับปรุง", "—", "Tentekomai 5 ต.ค. 2026 – ปลาย ก.ค. 2027 (ตามแผน) ชิงช้าสวรรค์ 9 พ.ย. 2026 – 31 ม.ค. 2027 และ Red Tower ปิดอยู่ในตอนนี้"],
];

// Under the price table: the bus bundle and bus seat, the lakes tour and a night at the lake.
const priceTableCards: KlookSameDayCard[] = [
  {
    label: "Fuji-Q Highland Q Pack (One Day Pass + รถบัสทางด่วน)",
    ctaLabel: "ดู Fuji-Q Q Pack บน Klook →",
    url: QPACK_URL,
    kind: "พาส + รถบัส",
    why: "One Day Pass รวมกับรถบัสทางด่วนไป-กลับจากชินจูกุหรืออุเอโนะในวอเชอร์ใบเดียว ชำระเงินผ่านหน้าภาษาไทยได้",
  },
  {
    label: "รถบัสทางด่วน โตเกียว – ภูเขาไฟฟูจิ",
    ctaLabel: "ดูรถบัสทางด่วนไปฟูจิ →",
    url: klookFor(tokyoMtFujiHighwayBus.url, LOCALE),
    kind: "รถบัส",
    why: "จองเฉพาะที่นั่ง เหมาะกับคนที่จะจ่ายเป็นรอบหรือซื้อพาสที่สวน รถบัสสายนี้จอดที่ฟูจิคิว ไฮแลนด์และคาวากุจิโกะ",
  },
  {
    label: "ทัวร์รถบัส 1 วัน ทะเลสาบคาวากุจิและยามานากะพร้อมออนเซ็น จากโตเกียว",
    ctaLabel: "ดูทัวร์รถบัสคาวากุจิโกะ →",
    url: klookFor(kawaguchikoYamanakakoBusTour.url, LOCALE),
    kind: "ทัวร์",
    why: "สำหรับคนในกลุ่มที่อยากชมทะเลสาบมากกว่าเล่นเครื่องเล่น เป็นทัวร์รถบัสพร้อมไกด์ 1 วันในฝั่งเดียวกันของภูเขาไฟฟูจิ",
  },
  {
    label: "โรงแรมในฟูจิคาวากุจิโกะ",
    ctaLabel: "ดูโรงแรมในฟูจิคาวากุจิโกะ →",
    url: klookFor(fujikawaguchikoHotels.url, LOCALE),
    kind: "โรงแรม",
    why: "รถบัสจากชินจูกุจอดสถานีคาวากุจิโกะเป็นป้ายถัดจากสวน การค้างที่ทะเลสาบ 1 คืนจึงเปลี่ยนวันเที่ยวสวนสนุกเป็นทริป 2 วันได้",
  },
];

const whoFor = [
  {
    title: "ซื้อ Toku-Q Pack / Q Pack ถ้า…",
    desc: "คุณเดินทางจากโตเกียวโดยไม่มีรถ ทั้งสองแบบรวม One Day Pass กับรถบัสทางด่วนไป-กลับ จึงจองครั้งเดียวแทนสามครั้ง และรถบัสไปจอดที่สถานีรถบัสของสวนเอง ไม่ต้องลงที่สถานีรถไฟแล้วเปลี่ยนรถอีก",
  },
  {
    title: "ซื้อพาสอย่างเดียว ถ้า…",
    desc: "คุณอยู่แถวฟูจิห้าทะเลสาบอยู่แล้ว หรือมาทางรถไฟ และจะเล่นรถไฟเหาะใหญ่ 4 เครื่องขึ้นไป One Day Pass ผู้ใหญ่ราคา ¥6,000 ถึง ¥7,900 ส่วนรถไฟเหาะใหญ่ 4 รอบ รอบละ ¥2,000 รวมเป็น ¥8,000",
  },
  {
    title: "เข้าสวนอย่างเดียว ถ้า…",
    desc: "คุณไม่ได้มาเพื่อเครื่องเล่น ฟูจิคิวเข้าสวนฟรี และจ่ายค่าเครื่องเล่นแต่ละเครื่องได้ที่ตู้ขายตั๋วในสวน เหมาะกับคนที่มาชมวิวภูเขาไฟฟูจิ โซนนารูโตะและโทมัส หรือเล่นรถไฟเหาะแค่ 1–2 เครื่อง",
  },
];

const steps = [
  {
    title: "รู้ไว้ว่าเข้าสวนฟรี พาสมีไว้สำหรับเครื่องเล่น",
    desc: `หน้าราคาตั๋วทางการของฟูจิคิวระบุว่าเข้าสวนได้ฟรี และขายตั๋วเครื่องเล่นที่ตู้ในสวน สิ่งที่ต้องตัดสินใจจึงไม่ใช่ว่าจะซื้อตั๋วเข้าสวนหรือไม่ แต่เป็นจะซื้อ One Day Pass หรือจ่ายเป็นรอบ ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    title: "ดูราคาของวันที่คุณจะไป ไม่ใช่ราคาที่โฆษณา",
    desc: `ราคาเปลี่ยนตามวันที่ One Day Pass ผู้ใหญ่ ¥6,000 ถึง ¥7,900 และ Afternoon Pass ที่ใช้ได้ตั้งแต่ 13:00 น. ¥4,100 ถึง ¥6,000 ฟูจิคิวประกาศตารางราคารายเดือน จึงควรดูราคาของวันที่จะไปจริงก่อนวางงบ ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    title: "ตัดสินใจเรื่องการเดินทางก่อนซื้อพาส",
    desc: "ตรงนี้คือความต่างระหว่างแพ็กเกจกับพาสอย่างเดียว Toku-Q Pack และ Q Pack ของ Klook รวมรถบัสทางด่วนไป-กลับจากโตเกียว ส่วนพาสอย่างเดียวไม่รวม ถ้าเดินทางด้วยรถไฟ (JR ไปโอสึกิ แล้วต่อสายฟูจิคิวโกะ (Fujikyuko Line) ไปสถานีฟูจิคิว ไฮแลนด์) ให้ซื้อพาสอย่างเดียว",
  },
  {
    title: "ตรวจสอบเวลาเปิดปิดและเครื่องเล่นที่ปิดในวันที่จะไป",
    desc: `เวลาเปิดปิดเปลี่ยนตามวันที่ วันธรรมดาส่วนใหญ่ในเดือนธันวาคม 10:00 ถึง 17:00 น. วันเสาร์อาทิตย์ในเดือนธันวาคม 9:00 ถึง 18:00 น. และหน้ารายเดือนจะบอกว่าวันไหนเครื่องเล่นใดปิด Tentekomai ปิดเพื่อก่อสร้างถึงปลายเดือนกรกฎาคม 2027 ตรวจสอบเมื่อ ${CHECKED}`,
  },
];

// The first five go into FAQPage, as on the English page.
const faqItems: FaqItem[] = [
  {
    q: "ตั๋วฟูจิคิว ไฮแลนด์ปี 2026 ราคาเท่าไร",
    a: `ฟูจิคิว ไฮแลนด์เข้าสวนฟรี สิ่งที่ต้องจ่ายคือค่าเครื่องเล่น One Day Pass สำหรับผู้ใหญ่อายุ 18–64 ปี ราคา ¥6,000 ถึง ¥7,900 นักเรียนมัธยมต้นและมัธยมปลาย ¥5,500 ถึง ¥7,400 นักเรียนประถม ¥4,400 ถึง ¥5,100 เด็กเล็กอายุ 1 ปีขึ้นไปและผู้สูงอายุ 65 ปีขึ้นไป ¥2,100 ถึง ¥2,600 ส่วน Afternoon Pass ที่ใช้ได้ตั้งแต่ 13:00 น. ผู้ใหญ่ ¥4,100 ถึง ¥6,000 รถไฟเหาะใหญ่ 1 รอบ ¥2,000 ราคาจาก fujiq.jp ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ฟูจิคิว ไฮแลนด์เข้าฟรีจริงไหม",
    a: `จริง หน้าราคาตั๋วทางการระบุว่าฟูจิคิว ไฮแลนด์เข้าสวนฟรี (ตั๋วเข้าสวนฟรีราคา ¥0) และผู้มาเยือนซื้อตั๋วเครื่องเล่นจากตู้ในสวน คนในกลุ่มที่ไม่เล่นเครื่องเล่นจึงเข้าไปชมสวนและวิวภูเขาไฟฟูจิได้โดยไม่ต้องจ่าย ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "Free Pass ของฟูจิคิวคุ้มไหม หรือควรจ่ายเป็นรอบ",
    a: `นับจำนวนรถไฟเหาะใหญ่ Fujiyama, Takabisha, Eejanaika, ZOKKON และ Attack on Titan THE RIDE ราคารอบละ ¥2,000 เล่น 3 เครื่องเป็น ¥6,000 เท่ากับราคาต่ำสุดของ One Day Pass และ 4 เครื่องเป็น ¥8,000 แพงกว่าพาสทุกวัน (¥6,000 ถึง ¥7,900) ถ้าเล่น 4 เครื่องขึ้นไปให้ซื้อพาส ถ้าเล่น 1–2 เครื่องให้จ่ายเป็นรอบ ราคาเครื่องเล่นจาก fujiq.jp ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "Toku-Q Pack คืออะไร",
    a: `ตั๋วชุดของฟูจิคิวเอง ได้แก่รถบัสทางด่วนตรงไป-กลับฟูจิคิว ไฮแลนด์พร้อม One Day Pass ขายจากกว่า 30 จุดรอบโตเกียวและชิซุโอกะ รวมถึงนาโกย่า เกียวโต และโอซาก้า ราคาตามจุดออกเดินทาง ถ้าออกจาก Busta Shinjuku จะเป็น Super Toku-Q Pack ที่เพิ่มสิทธิ์เล่นรถไฟเหาะ 1 เครื่องแบบลดเวลารอคิว 1 รอบ ระหว่าง 9:00 ถึง 10:00 น. ราคาผู้ใหญ่ ¥11,100 นักเรียนมัธยม ¥10,700 และนักเรียนประถม ¥7,100 ข้อมูลจาก fujiq.jp และ bus.fujikyu.co.jp ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ฟูจิคิว ไฮแลนด์มี Fast Pass ไหม",
    a: `มี ฟูจิคิวเรียกว่า Priority Ticket ช่วยลดเวลารอคิวเครื่องเล่นยอดนิยม 1 เครื่องจากรายการของสวน ราคาตามเครื่องเล่นและรอบเวลา ทุกวัยราคาเท่ากัน ขายออนไลน์จำนวนจำกัดตั้งแต่ 18:00 น. ของ 3 วันก่อนจนถึง 60 นาทีก่อนรอบเวลา และยังต้องมี One Day Pass หรือตั๋วเครื่องเล่นด้วย ส่วน One Day Pass แบบเข้าสวนก่อนเวลาเปิดเป็นอีกแบบหนึ่ง และไม่ขายระหว่าง 1 ธันวาคม 2026 ถึง 5 กุมภาพันธ์ 2027 ตรวจสอบเมื่อ ${CHECKED}`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "เดินทางจากชินจูกุไปฟูจิคิว ไฮแลนด์อย่างไร",
    a: `นั่งรถบัสทางด่วนฟูจิคิวจาก Busta Shinjuku ไปป้ายฟูจิคิว ไฮแลนด์ ใช้เวลาประมาณ 1 ชั่วโมง 40 นาที ผู้ใหญ่เริ่มต้น ¥2,200 (จองออนไลน์ ¥2,000) ถ้ารถติดอาจนานกว่านั้น ฟูจิคิว ไฮแลนด์เป็นป้ายก่อนสถานีคาวากุจิโกะ Toku-Q Pack และ Q Pack บน Klook รวมรถบัสไป-กลับกับ One Day Pass ไว้ด้วยกัน เวลาเดินทางจากเว็บไซต์ของ Fujikyu ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ซื้อตั๋วฟูจิคิว ไฮแลนด์ล่วงหน้าได้ที่ไหน",
    a: `ที่เว็บไซต์ขายตั๋วออนไลน์ทางการของฟูจิคิว ซึ่งขาย One Day Pass, Afternoon Pass, Thomas Land Pass และพาสเข้าสวนก่อนเวลาที่ขายออนไลน์เท่านั้น หรือที่ Klook ซึ่งขายพาสและ Q Pack ที่รวมรถบัส ส่วน Toku-Q Pack ขายบนเว็บไซต์ออนไลน์ทางการของฟูจิคิวและคอลเซ็นเตอร์ของ Fujikyu ตั๋วทางการขอคืนเงินไม่ได้ และเปลี่ยนจำนวนคนหรือกลุ่มอายุหลังซื้อไม่ได้ ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ฟูจิคิว ไฮแลนด์เปิดกี่โมง",
    a: `เปลี่ยนตามวันที่ เดือนพฤศจิกายน 2026 สวนเปิด 9:00 น. และปิดระหว่าง 18:00 ถึง 20:00 น. ส่วนเดือนธันวาคม วันธรรมดาส่วนใหญ่เปิด 10:00 ถึง 17:00 น. วันเสาร์อาทิตย์ 9:00 ถึง 18:00 น. และปิดวันที่ 10 ธันวาคม ฟูจิคิวประกาศตารางรายเดือนและรายชื่อเครื่องเล่นที่ปิดในแต่ละวัน ข้อมูลจาก fujiq.jp ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "รถไฟเหาะหลักของฟูจิคิว ไฮแลนด์มีอะไรบ้าง",
    a: "Fujiyama ที่สวนเรียกว่า King of Coasters, Eejanaika รถไฟเหาะแบบสี่มิติ, Takabisha ที่สวนเรียกว่ารถไฟเหาะที่ชันที่สุด และ ZOKKON ทุกเครื่องรอบละ ¥2,000 ส่วน Tentekomai รถไฟเหาะลอยฟ้าปิดตั้งแต่ 5 ตุลาคม 2026 ถึงปลายเดือนกรกฎาคม 2027 (ตามแผน) ระหว่างสร้างเครื่องเล่นใหม่ ในสวนยังมีโซนธีมนารูโตะ โทมัสยอดหัวรถจักร และตัวละครของ San-X",
  },
  {
    q: "มองเห็นภูเขาไฟฟูจิจากฟูจิคิว ไฮแลนด์ไหม",
    a: "สวนตั้งอยู่ที่เชิงภูเขาไฟฟูจิใกล้คาวากุจิโกะ ในวันที่ฟ้าใสจะเห็นภูเขาไฟฟูจิเป็นฉากหลังของสวน แต่เช่นเดียวกับทุกที่ในฟูจิห้าทะเลสาบ จะเห็นหรือไม่ขึ้นกับสภาพอากาศ และช่วงเดือนที่อากาศเย็นและแห้งมีโอกาสเห็นมากกว่ากลางฤดูร้อน ใช้ข้อนี้เป็นเหตุผลในการเลือกวันที่พยากรณ์อากาศดี ไม่ใช่สิ่งที่รับประกันได้",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "โรงแรมย่านชินจูกุ",
    ctaLabel: "ดูโรงแรมย่านชินจูกุบน Klook →",
    url: klookFor(tokyoStayAreas[0].url, LOCALE),
    why: "รถบัสทางด่วนไปคาวากุจิโกะขึ้นที่ชินจูกุ การพักย่านชินจูกุจึงทำให้รถบัสเช้าไปสวนเป็นแค่การเดินไปสถานีรถบัส",
  },
  {
    label: "ทัวร์รถบัส 1 วัน ทะเลสาบคาวากุจิและยามานากะพร้อมออนเซ็น จากโตเกียว",
    ctaLabel: "ดูทัวร์รถบัสคาวากุจิโกะ →",
    url: klookFor(kawaguchikoYamanakakoBusTour.url, LOCALE),
    why: "ฝั่งทะเลสาบของเส้นทางเดียวกันในรูปแบบทัวร์พร้อมไกด์ 1 วันจากโตเกียว เหมาะกับวันก่อนหรือหลังวันเที่ยวสวน ถ้าวิวสำคัญพอ ๆ กับรถไฟเหาะ",
  },
  {
    label: "ทัวร์ 1 วัน ภูเขาไฟฟูจิและฮาโกเน่ จากโตเกียว",
    ctaLabel: "ดูทัวร์ 1 วัน →",
    url: klookFor(fujiHakoneDayTour.url, LOCALE),
    why: "อีกวิธีชมภูเขาไฟฟูจิจากโตเกียวใน 1 วัน และไปฮาโกเน่ด้วยรถบัสคันเดียวกัน เหมาะกับคนในกลุ่มที่อยากข้ามเครื่องเล่นไป",
  },
  {
    label: "รถบัสลีมูซีนสนามบินนาริตะ",
    ctaLabel: "ดูรถบัสลีมูซีน →",
    url: klookFor(naritaLimousineBus.url, LOCALE),
    why: "รถบัสสนามบินที่ขนกระเป๋าใหญ่ไปถึงป้ายในใจกลางโตเกียว วันที่เดินทางถึงจึงจบที่โรงแรมที่คุณจะออกไปสวนได้เลย ตรวจสอบรายชื่อป้ายก่อน",
  },
];

const parkPicks = [
  withKlookLocale(fujiQHighlandQPack, LOCALE, {
    title: "Fuji-Q Highland Q Pack (One Day Pass + รถบัสทางด่วน)",
    desc: "พาสเล่นไม่จำกัดรอบรวมกับรถบัสทางด่วนไป-กลับจากชินจูกุหรืออุเอโนะ จองครั้งเดียวแทนสามครั้ง",
  }),
  withKlookLocale(fujiQHighlandPass, LOCALE, {
    title: "Fuji-Q Highland One Day Pass (Free Pass)",
    desc: "พาสอย่างเดียว สำหรับคนที่เดินทางไปคาวากุจิโกะเอง",
  }),
  withKlookLocale(fujiQHighlandAdmission, LOCALE, {
    title: "ตั๋วเข้าสวน Fuji-Q Highland",
    desc: "เข้าสวนโดยไม่มีพาสเครื่องเล่น เหมาะกับคนที่ไปชมวิวภูเขาไฟฟูจิและโซนธีม",
  }),
];

const transportPicks = [
  withKlookLocale(tokyoMtFujiHighwayBus, LOCALE, {
    title: "รถบัสทางด่วน โตเกียว – ภูเขาไฟฟูจิ",
    desc: "รถบัสตรงจากโตเกียวไปคาวากุจิโกะ ฟูจิคิว ไฮแลนด์ และสถานีฟูจิซัง จองเป็นที่นั่ง ไม่ใช่ทัวร์",
  }),
  withKlookLocale(mtFujiPass, LOCALE, {
    title: "Mt. Fuji Pass (1, 2 หรือ 3 วัน)",
    desc: "นั่งรถบัสและรถไฟรอบฟูจิห้าทะเลสาบได้ไม่จำกัดเที่ยว รวมกระเช้าและเรือล่องทะเลสาบ เหมาะกับคนที่เที่ยวเองแทนการไปกับทัวร์",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋วฟูจิคิว ไฮแลนด์" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, boldFirst = false }: { head: string[]; rows: ReactNode[][]; boldFirst?: boolean }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} style={boldFirst && r === 0 ? { fontWeight: 700 } : undefined}>
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

const checkedLine = (...urls: string[]) => `ตรวจสอบล่าสุด: ${LAST_CHECKED} แหล่งข้อมูล: ${urls.join(", ")}`;

export default function ThFujiQHighlandTicketsPage({ updated }: { updated: PageUpdated }) {
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
            เข้าสวนฟรี สิ่งที่คุณจ่ายคือสิทธิ์เล่นเครื่องเล่น จะเป็น One Day Pass, Toku-Q Pack ที่รวมพาสกับรถบัส หรือตั๋วรถไฟเหาะรอบละ ¥2,000 แบบไหนถูกกว่าขึ้นอยู่กับจำนวนเครื่องเล่นที่คุณอยากเล่น
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "เข้าสวนฟรี"].map((t) => (
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
            <strong>ฟูจิคิว ไฮแลนด์เข้าสวนฟรี และ One Day Pass (Free Pass) สำหรับผู้ใหญ่ราคา ¥6,000 ถึง ¥7,900</strong> ตามวันที่ รถไฟเหาะใหญ่อย่าง Fujiyama, Takabisha, Eejanaika และ ZOKKON ราคารอบละ ¥2,000 ดังนั้น <strong>ถ้าจะเล่น 4 เครื่องขึ้นไป ให้ซื้อ Free Pass</strong> ถ้าเล่น 1–2 เครื่องให้จ่ายเป็นรอบ ส่วน Super Toku-Q Pack จาก Busta Shinjuku รวมรถบัสไป-กลับ One Day Pass และสิทธิ์ลดเวลารอคิว 1 รอบไว้ในตั๋วใบเดียว ราคาผู้ใหญ่ ¥11,100 ราคาจาก fujiq.jp ตรวจสอบเมื่อ {CHECKED}
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>คำตอบสั้น ๆ</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เข้าสวน</p>
                <p className={styles.verdictStatValue}>ฟรี</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>One Day Pass (ผู้ใหญ่)</p>
                <p className={styles.verdictStatValue}>¥6,000 – ¥7,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>รถไฟเหาะใหญ่ 1 รอบ</p>
                <p className={styles.verdictStatValue}>¥2,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>มาจากโตเกียว</p>
                <p className={styles.verdictStatValue}>Toku-Q / Q Pack (พาส + รถบัส)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ไม่ต้องซื้อตั๋วเข้าสวน เพราะเข้าฟรี ซื้อ One Day Pass ถ้าจะเล่นรถไฟเหาะใหญ่ 4 เครื่องขึ้นไป ซื้อ Afternoon Pass ถ้าไปถึงหลังมื้อกลางวัน หรือไม่ต้องซื้ออะไรเลยแล้วจ่ายเป็นรอบที่ตู้ในสวน ถ้ามาจากโตเกียวโดยไม่มีรถ ให้จองพาสที่รวมรถบัสไป-กลับ คือ Toku-Q Pack ของ Fujikyu หรือ Q Pack ของ Klook ราคาจาก fujiq.jp ตรวจสอบเมื่อ {CHECKED}
            </p>
            <KlookLink href={QPACK_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดู Fuji-Q Q Pack บน Klook →
            </KlookLink>
          </div>
        </div>

        <HotelStayBlock city="kawaguchiko" areas={["fujiQ", "kawaguchikoStation", "lakeKawaguchi"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋วฟูจิคิว ไฮแลนด์ราคาเท่าไร</h2>
          <p className={styles.bodyText}>
            เข้าสวนฟรี One Day Pass ผู้ใหญ่ราคา ¥6,000 ถึง ¥7,900 ตามวันที่ และรถไฟเหาะใหญ่รอบละ ¥2,000 ตั๋วทุกแบบที่ฟูจิคิวขาย พร้อมสิ่งที่ใช้ได้ มีดังนี้
          </p>
          <Table head={["ตั๋ว", "ราคาผู้ใหญ่", "ใช้กับอะไรได้"]} rows={priceRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.ticket, OFFICIAL.rides)}
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            ราคา One Day Pass และ Afternoon Pass ตามช่วงอายุ
          </h3>
          <Table head={["ช่วงอายุ", "One Day Pass", "Afternoon Pass (ตั้งแต่ 13:00 น.)"]} rows={ageRows} />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            สวนตั้งราคาตามวันที่และประกาศตารางราคารายเดือน จึงควรดูราคาของวันที่คุณจะไป เด็กเล็กซื้อตั๋ว QR ออนไลน์ หรือซื้อที่จุดขายตั๋วในวันนั้น
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.ticket)}
          </p>
        </section>

        <KlookSameDayCards
          heading="จองวันเที่ยวสวน: พาสพร้อมรถบัส รถบัสอย่างเดียว ทัวร์ทะเลสาบ หรือค้างคืนที่ทะเลสาบ"
          cards={priceTableCards}
          footnote={
            <>
              ถ้าอยากได้เรียวกังริมทะเลสาบที่เห็นภูเขาไฟฟูจิจากห้อง ดู <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" hrefLang="en">เรียวกังคาวากุจิโกะวิวภูเขาไฟฟูจิ (ภาษาอังกฤษ)</Link>
            </>
          }
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเข้าสวน</span>
          <h2 className={styles.sectionTitle}>ฟูจิคิวเข้าสวนฟรีไหม</h2>
          <p className={styles.bodyText}>
            ฟรี หน้าราคาตั๋วทางการของฟูจิคิว ไฮแลนด์ระบุว่าเข้าสวนได้ฟรี ตั๋วเข้าสวนฟรีราคา ¥0 ขอได้ที่จุดขายตั๋วหรือออนไลน์ จากนั้นจ่ายค่าเครื่องเล่นแต่ละเครื่องด้วยตั๋วจากตู้ในสวน หรือใช้พาส แบบนี้ไม่ค่อยพบในสวนสนุกใหญ่ของญี่ปุ่น และสะดวกสำหรับกลุ่มที่ชอบต่างกัน คนที่ไม่เล่นเครื่องเล่นเข้าไปชมวิวภูเขาไฟฟูจิ และโซนนารูโตะ Thomas Land และ San-X ได้โดยไม่ต้องจ่าย ตรวจสอบเมื่อ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            จุดเด่นของสวนคือรถไฟเหาะ ได้แก่ Fujiyama ที่สวนเรียกว่า King of Coasters, Eejanaika แบบสี่มิติ, Takabisha ที่ดิ่งชัน และ ZOKKON ส่วน Tentekomai รถไฟเหาะลอยฟ้าปิดตั้งแต่ 5 ตุลาคม 2026 ถึงปลายเดือนกรกฎาคม 2027 (ตามแผน) ระหว่างสร้างเครื่องเล่นใหม่
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>พาสหรือจ่ายเป็นรอบ</span>
          <h2 className={styles.sectionTitle}>Free Pass ของฟูจิคิว กับการจ่ายเป็นรอบ แบบไหนถูกกว่า</h2>
          <p className={styles.bodyText}>
            Free Pass ถูกกว่าตั้งแต่รถไฟเหาะใหญ่เครื่องที่ 4 เพราะ 4 รอบ รอบละ ¥2,000 รวมเป็น ¥8,000 สูงกว่าราคาสูงสุดของพาส ¥7,900 ส่วน 3 รอบเป็น ¥6,000 เท่ากับราคาต่ำสุด ราคาเครื่องเล่นจากรายการราคาทางการ มีดังนี้
          </p>
          <Table head={["เครื่องเล่น", "ราคาต่อรอบ", "หมายเหตุ"]} rows={rideRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.rides)}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Toku-Q Pack</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack คืออะไร</h2>
          <p className={styles.bodyText}>
            Toku-Q Pack คือตั๋วชุดของ Fujikyu ที่รวมรถบัสทางด่วนตรงไป-กลับฟูจิคิว ไฮแลนด์กับ One Day Pass ราคาตามจุดที่ออกเดินทาง ถ้าออกจาก Busta Shinjuku จะเป็น Super Toku-Q Pack ที่รวมสิทธิ์เล่นรถไฟเหาะ 1 เครื่องแบบลดเวลารอคิว 1 รอบระหว่าง 9:00 ถึง 10:00 น. ราคาผู้ใหญ่ ¥11,100 เทียบกับการจองรถบัสชินจูกุออนไลน์ (เที่ยวละ ¥2,000) แล้วซื้อพาสแยก ซึ่งรวมเป็น ¥10,000 ถึง ¥11,900 ตามวันที่
          </p>
          <Table head={["ตัวเลือก", "ราคา", "สิ่งที่รวม"]} rows={compareRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.superTokuQ, OFFICIAL.tokuQ, OFFICIAL.priority, OFFICIAL.bus)}
          </p>
          <p className={styles.bodyText}>
            Priority Ticket คือ Fast Pass ของสวน ช่วยลดเวลารอคิวเครื่องเล่น 1 เครื่องในรายการของฟูจิคิว (เช่น Fujiyama, ZOKKON, Takabisha และ Eejanaika) ทุกวัยราคาเท่ากัน ขายจำนวนจำกัด ซื้อได้สูงสุด 10 ใบต่อครั้ง ขายออนไลน์ตั้งแต่ 18:00 น. ของ 3 วันก่อนจนถึง 60 นาทีก่อนรอบเวลา หรือซื้อที่ตู้ข้างเครื่องเล่นแต่ละเครื่องในวันนั้น ตั๋วนี้ใช้แทนพาสไม่ได้ ยังต้องมี One Day Pass หรือตั๋วเครื่องเล่น ตรวจสอบเมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>เลือกตั๋ว</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack พาสอย่างเดียว หรือไม่ซื้ออะไรเลย</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ซื้อล่วงหน้า</span>
          <h2 className={styles.sectionTitle}>ซื้อตั๋วฟูจิคิวล่วงหน้าได้ที่ไหน</h2>
          <p className={styles.bodyText}>
            มีสองที่ คือเว็บไซต์ขายตั๋วออนไลน์ทางการของฟูจิคิว หรือ Klook เว็บไซต์ทางการขาย One Day Pass, Afternoon Pass และ Thomas Land Pass แบบระบุวัน รวมถึง One Day Pass แบบเข้าสวนก่อนเวลาที่ขายออนไลน์เท่านั้น และพาสแบบต่อคิวเสมือน (ขายถึงวันก่อนหน้า) ส่วน Toku-Q Pack ขายบนเว็บไซต์ทางการเดียวกันหรือคอลเซ็นเตอร์ของ Fujikyu ตั๋วทางการขอคืนเงินไม่ได้ และเปลี่ยนจำนวนคนหรือกลุ่มอายุหลังซื้อไม่ได้ ส่วน Sunset★Night Pass ขายที่สวนในวันนั้นตั้งแต่ 16:00 น. เท่านั้น ตรวจสอบเมื่อ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            Klook ขาย One Day Pass ตั๋วเข้าสวน และ Q Pack ซึ่งเป็นพาสพร้อมรถบัสทางด่วนไป-กลับจากชินจูกุหรืออุเอโนะ ชำระเงินผ่านหน้าภาษาไทยได้ วันนี้ยังใส่ในทริปโตเกียว 1 สัปดาห์ได้ด้วย <Link href="/guides/attractions/tokyo-7-day-itinerary" hrefLang="en">แผนเที่ยวโตเกียว 7 วัน (ภาษาอังกฤษ)</Link> จัดวันเที่ยวฟูจิไว้วันที่ 6 และ <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en">ตารางราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น (ภาษาอังกฤษ)</Link> เทียบฟูจิคิวกับสวนสนุกใหญ่แห่งอื่น
          </p>
        </section>

        <KlookTourPicks
          heading="ตั๋วฟูจิคิว 3 แบบบน Klook เรียงตามลำดับที่แนะนำ"
          intro="ทั้งสามแบบเป็นสวนเดียวกัน ต่างกันที่ราคารวมการเดินทางและเครื่องเล่นหรือไม่ ถ้ามาจากโตเกียวให้จอง Q Pack ถ้ามาทางรถไฟให้จองพาสอย่างเดียว และถ้ามาเพื่อชมวิวและโซนธีมมากกว่ารถไฟเหาะ ให้จองตั๋วเข้าสวน"
          tours={parkPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ที่พัก</span>
          <h2 className={styles.sectionTitle}>Highland Resort Hotel &amp; Spa คุ้มไหม</h2>
          <p className={styles.bodyText}>
            คุ้มถ้าคุณอยากเล่นรถไฟเหาะก่อนนักท่องเที่ยวแบบไปกลับวันเดียวจะมาถึง Highland Resort Hotel &amp; Spa เป็นโรงแรมทางการของฟูจิคิว เชื่อมกับสวนโดยตรงและมีภูเขาไฟฟูจิอยู่ด้านหน้า ฟูจิคิวระบุสิทธิพิเศษ 2 อย่างสำหรับแขกโรงแรมทางการ คือเข้าสวนก่อน (ช่วงนั้นเปิดเครื่องเล่นบางส่วน) และฝากกระเป๋าไว้ได้ตลอดการเข้าพัก สถานีรถบัสทางด่วนอยู่ในลานจอดรถของโรงแรมเอง โรงแรมมีห้องธีมโทมัสและนารูโตะ และห้องธีมซุมิกโกะ กุราชิจะเปิดวันที่ 28 พฤศจิกายน ตรวจสอบเมื่อ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            ถ้าวิวและออนเซ็นสำคัญกว่าการได้เล่นเครื่องเล่นแต่เช้า คาวากุจิโกะอยู่ถัดไปอีกป้าย และ <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" hrefLang="en">เรียวกังคาวากุจิโกะวิวภูเขาไฟฟูจิ (ภาษาอังกฤษ)</Link> เปรียบเทียบเรียวกัง 6 แห่งที่นั่น ถ้าเดินทางกับเด็ก <Link href="/guides/attractions/tokyo-itinerary-with-kids" hrefLang="en">แผนเที่ยวโตเกียวกับเด็ก (ภาษาอังกฤษ)</Link> บอกว่าวันเที่ยวนอกเมืองควรอยู่ตรงไหนระหว่างดิสนีย์กับวันเที่ยวในร่ม
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.hotel)}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวลาเปิดปิด</span>
          <h2 className={styles.sectionTitle}>ฟูจิคิว ไฮแลนด์เปิดกี่โมง</h2>
          <p className={styles.bodyText}>
            ฟูจิคิวเปิด 9:00 หรือ 10:00 น. และปิดระหว่าง 17:00 ถึง 20:00 น. ตามวันที่ และมีวันหยุดเป็นบางวัน ในปี 2026 คือวันที่ 10 ธันวาคม
          </p>
          <Table head={["ช่วงเวลา", "เวลาเปิดปิด", "หมายเหตุ"]} rows={hoursRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.hours)}
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจองตั๋วฟูจิคิว ไฮแลนด์</h2>
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

        <BookingEsimCard lead="จองฟูจิคิวแล้วใช่ไหม เตรียมอินเทอร์เน็ตมือถือไว้ก่อนเดินทาง" />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>เดินทางจากโตเกียวไปฟูจิคิว ไฮแลนด์อย่างไร</h2>
          <p className={styles.bodyText}>
            นั่งรถบัสทางด่วนฟูจิคิวจาก Busta Shinjuku ไปป้ายฟูจิคิว ไฮแลนด์ ใช้เวลาประมาณ 1 ชั่วโมง 40 นาที ผู้ใหญ่เริ่มต้น ¥2,200 (จองออนไลน์ ¥2,000) และนานกว่านั้นถ้ารถติด รถบัสทางด่วนไปสิ้นสุดที่สถานีรถบัสในลานจอดรถของ Highland Resort Hotel &amp; Spa ซึ่งอยู่ติดสวน ถ้าเดินทางด้วยรถไฟ ให้นั่ง JR ไปโอสึกิ แล้วต่อสายฟูจิคิวโกะ (Fujikyuko Line) ไปสถานีฟูจิคิว ไฮแลนด์ {checkedLine(OFFICIAL.bus)}
          </p>
          <p className={styles.bodyText}>
            ความต่างนี้คือเหตุผลที่มีแพ็กเกจรวมรถบัส และสำหรับการไปกลับวันเดียว แพ็กเกจมักคุ้มกว่า เพราะรถบัสส่งถึงหน้าประตูทางเข้าสวนและรับกลับจากที่เดิม ไม่ต้องคอยจับเวลาเปลี่ยนขบวนที่โอสึกิ ถ้าอยากให้ทริปยืดหยุ่น <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" hrefLang="en" style={textLink}>คู่มือเที่ยวภูเขาไฟฟูจิ 1 วันด้วยตัวเอง (ภาษาอังกฤษ)</Link> อธิบายเส้นทางเดียวกันโดยไม่มีตั๋วสวน <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" hrefLang="en" style={textLink}>เที่ยวคาวากุจิโกะ 1 วันจากโตเกียว (ภาษาอังกฤษ)</Link> อธิบายทะเลสาบที่อยู่ถัดไปอีกป้าย และ <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" hrefLang="en" style={textLink}>เปรียบเทียบทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว (ภาษาอังกฤษ)</Link> เหมาะกับคนในกลุ่มที่จะไปสถานีที่ 5 แทน
          </p>
        </section>

        <KlookTripPrep
          label="จองไว้สำหรับวันเดียวกัน"
          heading="วันเที่ยวฟูจิคิว ควรจองอะไรอีก"
          intro="ตั๋วสวนกำหนดตัวทริปในวันนั้นแล้ว สิ่งที่ต้องจองเพิ่มคือที่พักที่คุณจะออกเดินทาง และทะเลสาบสองข้างของสวน"
          items={tripPrepItems}
        />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="คำถามที่พบบ่อยเกี่ยวกับฟูจิคิว ไฮแลนด์" />

        <KlookTourPicks
          heading="เดินทางไปโดยไม่ใช้ Q Pack"
          intro="ถ้าคุณมีพาสอยู่แล้ว หรืออยากเที่ยวฟูจิห้าทะเลสาบมากกว่าเล่นรถไฟเหาะ สองรายการนี้ใช้กับการเดินทางได้ รถบัสทางด่วนจอดที่ฟูจิคิว ไฮแลนด์และคาวากุจิโกะ ส่วนพาสของพื้นที่ใช้กับรถบัสและรถไฟท้องถิ่นเมื่อไปถึงแล้ว"
          tours={transportPicks}
        />

        <p className={styles.bodyText}>
          ชินจูกุที่เป็นจุดขึ้นรถบัสไปฟูจิคิว ยังเป็นย่านที่แนะนำสำหรับการไปโตเกียวครั้งแรกใน <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en">คู่มือเลือกที่พักในโตเกียว (ภาษาอังกฤษ)</Link>
        </p>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            อยากเที่ยวทะเลสาบรอบสวนเพิ่มไหม <Link href="/guides/transport/mt-fuji-pass" hrefLang="en" style={linkStyle}>Mt. Fuji Pass (ภาษาอังกฤษ)</Link> ของ Fujikyu ใช้กับรถบัสและรถไฟรอบภูเขาไฟฟูจิได้ 1 ถึง 3 วัน
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            ใกล้กันที่ริมทะเลสาบคาวากุจิ มี <Link href="/guides/attractions/mt-fuji-panoramic-ropeway-tickets" hrefLang="en" style={linkStyle}>กระเช้า Mt. Fuji Panoramic Ropeway (ภาษาอังกฤษ)</Link> ราคาไป-กลับ ¥1,200 และ <Link href="/guides/attractions/kawaguchiko-music-forest-museum-tickets" hrefLang="en" style={linkStyle}>Kawaguchiko Music Forest Museum (ภาษาอังกฤษ)</Link> ราคา ¥1,800 ในวันธรรมดา
          </p>
        </section>
        <EsimCtaBottom />

        <Related
          items={[
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "เที่ยวคาวากุจิโกะ 1 วันจากโตเกียว (2026): เส้นทางและค่าเดินทาง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "เที่ยวภูเขาไฟฟูจิ 1 วันจากโตเกียวด้วยตัวเอง (2026) (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว (2026): เลือกทัวร์ไหนดี (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วโตเกียวดิสนีย์: ราคาและวิธีซื้อ" },
            { href: "/th/guides/attractions/usj-tickets-express-pass", title: "ตั๋ว USJ และ Express Pass" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "ตั๋ว Sanrio Puroland (2026): ราคาและวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "ตั๋วโตเกียวทาวเวอร์ (2026): ราคาและวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "เที่ยวโตเกียว (2026): ที่ไหนต้องจองล่วงหน้า (ภาษาอังกฤษ)" },
            { href: "/th", title: "คู่มือเที่ยวญี่ปุ่นทั้งหมด" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองครั้งเดียวสำหรับทั้งวัน</h2>
            <p className={styles.ctaBannerDesc}>
              Q Pack รวม One Day Pass (Free Pass) กับรถบัสทางด่วนไป-กลับจากชินจูกุหรืออุเอโนะไว้ในวอเชอร์ใบเดียว ชำระเงินผ่านหน้าภาษาไทยได้ จึงไปกลับวันเดียวได้โดยไม่ต้องจัดการรถบัสและพาสแยกกัน
            </p>
            <KlookLink href={QPACK_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดู Fuji-Q Q Pack →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
