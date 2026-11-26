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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import {
  japanWinterStayAreas,
  klookEsim,
  shirakawagoLightUpTripPrep,
  shirakawagoTakayamaKanazawaDayTour,
  shirakawagoWinterLightUpTakayamaNagoyaBusTour,
  takayamaShirakawagoNagoyaDayTrip,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { shirakawagoLightUp2027NagoyaTour } from "../../../../lib/klook-links-winter-hub";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/shirakawago-winter-light-up) section by section as
// of 2026-11-26 (task-jtk-20261126-TR03): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (shirakawa-go.gr.jp, nouhibus.co.jp
// and hokutetsu.co.jp, read 16 Nov 2026); nothing is added. Title term: ชิราคาวาโกะ ไลท์อัพ, as on
// gltjp.com/th; the body says ชมไฟประดับ, per the Thai style sheet. Nohi Bus and Hokuriku Railroad
// stay in Latin script as on the Thai winter itinerary. No ad id yet (spare list empty): ?aid=119070.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/shirakawago-winter-light-up";
const TITLE = "ชิราคาวาโกะ ไลท์อัพ 2027: วันงาน จองทัวร์";
const H1 = "ชิราคาวาโกะ ไลท์อัพ 2027: วันจัดงาน วิธีจอง และทัวร์ชมไฟประดับหมู่บ้านชิราคาวาโกะฤดูหนาว";
const DESC =
  "ชิราคาวาโกะ ไลท์อัพ 2027 มี 4 คืน 11–31 ม.ค. ต้องจองล่วงหน้า เทียบทัวร์ชมไฟประดับจากนาโกย่า";

const OWN = dateLabel("2026-11-16", LOCALE);
const NOHI_FARE_READ = dateLabel("2026-11-06", LOCALE);

const COACH_URL = klookFor(shirakawagoWinterLightUpTakayamaNagoyaBusTour.url, LOCALE);
const SMALL_GROUP_URL = klookFor(shirakawagoLightUp2027NagoyaTour.url, LOCALE);
const KANAZAWA_DAY_URL = klookFor(shirakawagoTakayamaKanazawaDayTour.url, LOCALE);
const NAGOYA_DAY_URL = klookFor(takayamaShirakawagoNagoyaDayTrip.url, LOCALE);
const TAKAYAMA_HOTELS_URL = klookFor(japanWinterStayAreas[3].url, LOCALE);
const KANAZAWA_HOTELS_URL = klookFor(japanWinterStayAreas[2].url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

/** Table 1: dates and the five ways in. First row is the answer. */
const wayRows = [
  {
    way: "ง่ายที่สุดตอนนี้: ทัวร์รถบัสชมไฟประดับ (บริษัทรถบัสประจำทางหรือบริษัททัวร์)",
    deck: "ทัวร์ของบริษัทรถบัสประจำทาง: บางแบบรวม บางแบบไม่รวม ทัวร์ของบริษัททัวร์: ไม่รวม",
    status: "ทัวร์ของบริษัทรถบัสประจำทางเปิดขายตามวันระหว่าง 13 ต.ค. – 2 พ.ย. 2026 แพ็กเกจของบริษัททัวร์จะขึ้นลิงก์วันที่ 2 ธ.ค. 2026 เวลา 13:00 น.",
    book: "กับบริษัทรถบัสหรือบริษัททัวร์ ไม่ใช่สมาคมการท่องเที่ยว",
  },
  {
    way: "พักค้างคืนในหมู่บ้าน",
    deck: "รวม",
    status: "ปิดรับการจับฉลากวันที่ 31 ต.ค. แจ้งผู้ได้รับสิทธิ์วันที่ 10 พ.ย. ห้องที่ผู้ได้รับสิทธิ์สละจะเปิดให้จองตามลำดับก่อนหลังวันที่ 26 พ.ย. 2026 เวลา 13:00 น.",
    book: "เว็บไซต์สมาคมการท่องเที่ยว",
  },
  {
    way: "ขับรถมาเอง จองที่จอดรถ (ลานจอดรถ Midashima)",
    deck: "ไม่รวม",
    status: "รอบขายที่ 1 ขายหมดแล้ว รอบขายที่ 2 เปิดวันที่ 1 ธ.ค. 2026 เวลา 13:00 น.: คันละ ¥7,000 (1–5 คน), ¥10,000 (6–10 คน)",
    book: "เว็บไซต์สมาคมการท่องเที่ยว ชำระด้วยบัตรเครดิต ไม่คืนเงิน",
  },
  {
    way: "แท็กซี่ ใช้ที่จอดรถที่จองไว้",
    deck: "ไม่รวม",
    status: "ใช้การขายที่จอดรถเดียวกับรถยนต์ บริษัทแท็กซี่ในหมู่บ้านไม่ให้บริการในวันจัดงาน",
    book: "จองที่จอดรถก่อน แล้วจึงจองแท็กซี่",
  },
  {
    way: "ไปในวันงานโดยไม่จอง",
    deck: "—",
    status: "ไม่ได้: ไม่มีขายบัตรเข้างานในวันงาน และตั้งแต่ 15:30 น. มีประตูกั้นไม่ให้ผู้ที่ไม่มีบัตรเข้าหมู่บ้าน",
    book: "—",
  },
];

/** Table 2: ways to get there, on each operator's own figures. */
const routeRows = [
  {
    option: "รถบัสชมไฟประดับของ Klook จากนาโกย่า (แวะฮิดะทาคายามะระหว่างทาง)",
    time: "12 ชม. 25 นาทีตามหน้ารายการ ออกจาก Meitetsu Bus Center",
    cost: "ดูราคาของวันที่คุณต้องการในหน้ารายการ",
    book: "จองบน Klook มีเจ้าหน้าที่พูดภาษาอังกฤษ หน้ารายการระบุว่ายืนยันออกเดินทางทั้ง 4 วัน",
  },
  {
    option: "ทัวร์กลุ่มเล็กชมไฟประดับของ Klook จากนาโกย่า",
    time: "ใช้เวลาทั้งวัน ชมเฉพาะในหมู่บ้าน ไม่รวมจุดชมวิว",
    cost: "ดูราคาของวันที่คุณต้องการในหน้ารายการ",
    book: "จองบน Klook ประมาณ 9 คน รับจากโรงแรมในย่านซากาเอะหรือที่สถานีนาโกย่า",
  },
  {
    option: "รถบัสชมไฟประดับของ Nohi Bus จากทาคายามะ",
    time: "ออก 14:40–15:40 น. กลับถึง 20:20–20:45 น.",
    cost: "¥13,000 (พิพิธภัณฑ์กลางแจ้งบ้านกัสโชและเซนไซ), ¥14,000 (บัตรออนเซ็น), ¥16,000 (จุดชมวิว)",
    book: "จองได้เฉพาะเว็บไซต์ Nohi Bus สูงสุด 6 คนต่อการจอง ไม่มีรายชื่อสำรอง",
  },
  {
    option: "รถบัสชมไฟประดับของ Hokuriku Railroad (Hokutetsu) จากคานาซาวะ",
    time: "คานาซาวะ 14:30 → หมู่บ้าน 16:30–19:50 → คานาซาวะ 21:50",
    cost: "ผู้ใหญ่ ¥18,500 เด็ก ¥16,500 รวมบัตรจุดชมวิว",
    book: "เว็บไซต์หรือโทรศัพท์ของ Hokutetsu สูงสุด 4 คนต่อการจอง",
  },
  {
    option: "รถบัสทางด่วนประจำทาง (เฉพาะกลางวัน)",
    time: "คานาซาวะ 1 ชม. 15 นาที ทาคายามะประมาณ 50 นาที",
    cost: `คานาซาวะ ผู้ใหญ่ ¥2,800 (Hokutetsu) ทาคายามะ ¥2,900 ตั้งแต่ 1 ธ.ค. (Nohi Bus ตรวจสอบเมื่อ ${NOHI_FARE_READ})`,
    book: "ที่นั่งระบุ แต่รถเที่ยวสุดท้ายออกจากหมู่บ้าน 17:30 น. ก่อนไฟประดับจะปิด",
  },
];

/** Table 3: where to sleep. */
const stayRows = [
  {
    base: "ทาคายามะ",
    why: "รถบัสชมไฟประดับของ Nohi Bus ออกและกลับที่ศูนย์รถบัสข้างสถานี JR ทาคายามะ กลับถึงภายใน 20:45 น.",
    watch: "หลังชมไฟประดับไม่มีรถบัสประจำทางกลับทาคายามะ จึงต้องกลับด้วยรถบัสชมไฟประดับของ Nohi Bus",
  },
  {
    base: "คานาซาวะ",
    why: "รถบัสชมไฟประดับของ Hokutetsu ออกจากทางออกฝั่งตะวันตกของสถานีคานาซาวะและกลับถึง 21:50 น. อยู่บนเส้นทางโฮคุริคุชินคันเซ็น",
    watch: "กลับถึง 21:50 น. ควรพักที่คานาซาวะคืนนั้น แทนการนั่งรถไฟเที่ยวดึกต่อไปเมืองอื่น",
  },
  {
    base: "บ้านพักแบบมินชูคุในหมู่บ้านชิราคาวาโกะ",
    why: "ที่พักเดียวที่รวมบัตรจุดชมวิว และได้อยู่ในหมู่บ้านต่อหลังรถบัสทัวร์ออกไปแล้ว",
    watch: "คืนที่มีการชมไฟประดับใช้ระบบจับฉลาก (ปิดแล้ว) ห้องที่ถูกยกเลิกเปิดให้จองตามลำดับก่อนหลังวันที่ 26 พ.ย. 2026 เวลา 13:00 น.",
  },
  {
    base: "นาโกย่า",
    why: "จุดออกเดินทางของรถบัสชมไฟประดับของ Klook อยู่บนเส้นทางโทไคโดชินคันเซ็น",
    watch: "วันที่ยาวที่สุดในบรรดาสี่เมือง",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ชมไฟประดับชิราคาวาโกะปี 2027 จัดวันไหน?",
    a: `สี่คืน: 11 มกราคม (วันจันทร์ วันหยุดนักขัตฤกษ์) 17, 24 และ 31 มกราคม 2027 ทุกคืนเวลา 17:30–19:30 น. ในหมู่บ้านโอกิมาจิ เป็นครั้งที่ 41 ตามประกาศของสมาคมการท่องเที่ยวชิราคาวาโกะ (ตรวจสอบเมื่อ ${OWN}) สมาคมอาจยกเลิกงานหากคลื่นความหนาวทั่วประเทศทำให้การเดินทางติดขัดอย่างหนัก`,
  },
  {
    q: "ต้องจองล่วงหน้าเพื่อชมไฟประดับชิราคาวาโกะไหม?",
    a: `ต้องจอง งานใช้ระบบจองล่วงหน้าทั้งหมดพร้อมบัตรเข้างานที่ต้องคล้องคอ ไม่มีขายบัตรในวันงาน และตั้งแต่ 15:30 น. มีประตูกั้นไม่ให้ผู้ที่ไม่มีบัตรเข้าหมู่บ้าน ช่องทางเข้าห้าแบบคือ พักในหมู่บ้าน จองที่จอดรถสำหรับรถยนต์หรือแท็กซี่ ทัวร์ชมไฟประดับของบริษัทรถบัสประจำทาง หรือทัวร์รถบัสของบริษัททัวร์ (ตรวจสอบเมื่อ ${OWN})`,
  },
  {
    q: "ทัวร์เป็นวิธีที่ดีที่สุดในการชมไฟประดับไหม?",
    a: "สำหรับนักท่องเที่ยวส่วนใหญ่ ใช่ รถบัสประจำทางเที่ยวสุดท้ายออกจากหมู่บ้าน 17:30 น. ก่อนไฟประดับจะปิด ที่พักในหมู่บ้านใช้ระบบจับฉลาก และการจอดรถต้องใช้รถที่ใส่ยางสำหรับหิมะบนถนนที่มีหิมะ รถบัสชมไฟประดับจากนาโกย่า ทาคายามะ หรือคานาซาวะจะกันที่เข้างานไว้ให้และพาคุณกลับในคืนเดียวกัน",
  },
  {
    q: "ชมไฟประดับจากจุดชมวิวได้ไหม?",
    a: "ได้เฉพาะผู้ที่มีบัตรจุดชมวิว ซึ่งไม่ขายแยก บัตรนี้รวมอยู่ในที่พักในหมู่บ้านที่จองแพ็กเกจจุดชมวิว หรือทัวร์จุดชมวิวของบริษัทรถบัสประจำทาง เช่น คอร์ส ¥16,000 ของ Nohi Bus จากทาคายามะ หรือรถบัส ¥18,500 ของ Hokutetsu จากคานาซาวะ ผู้ที่มาด้วยรถยนต์ แท็กซี่ และทัวร์ของบริษัททัวร์จะชมไฟประดับจากในหมู่บ้าน",
  },
  {
    q: "ชิราคาวาโกะตอนกลางคืนเดือนมกราคมหนาวแค่ไหน?",
    a: `สมาคมการท่องเที่ยวระบุว่าช่วงเวลาชมไฟประดับอุณหภูมิ −10°C ถึง 0°C และถนนเป็นน้ำแข็ง สมาคมแนะนำให้เตรียมเสื้อโค้ทกันหนาว รองเท้าบูทกันน้ำกันหนาว แผ่นกันลื่นสวมรองเท้า และไฟฉาย เพราะทางเดินมืด (ตรวจสอบเมื่อ ${OWN})`,
  },
  {
    q: "ในวันที่มีการชมไฟประดับ ไปเที่ยวชิราคาวาโกะตอนกลางวันได้ไหม?",
    a: "ได้ แต่มีข้อจำกัด รถยนต์ไม่ต้องจอง แต่ต้องเข้าภายใน 15:00 น. และออกภายใน 17:00 น. รถบัสนำเที่ยวต้องจองที่จอดรถ เข้าภายใน 14:00 น. และออกภายใน 16:00 น. ถ้ามาด้วยรถบัสประจำทาง ต้องขึ้นเที่ยวที่ถึงหมู่บ้านภายใน 15:20 น. ทางเดินไปจุดชมวิวปิด 15:45 น. และจุดชมวิวปิด 16:10 น.",
  },
  {
    q: "ยกเลิกหรือเปลี่ยนการจองชมไฟประดับได้ไหม?",
    a: "การจองที่จอดรถเปลี่ยนหรือคืนเงินไม่ได้ เว้นแต่คณะกรรมการจัดงานยกเลิกงาน Nohi Bus คิดค่าธรรมเนียม ¥100 หากยกเลิกก่อนออกเดินทาง และไม่รับเปลี่ยนแปลงหลังชำระเงิน สำหรับทัวร์ Klook ให้อ่านเงื่อนไขการยกเลิกในหน้ารายการก่อนชำระเงิน",
  },
  {
    q: "มีทัวร์ชมไฟประดับชิราคาวาโกะจากโตเกียวไหม?",
    a: "ไม่มีแบบไปกลับวันเดียว ให้นั่งชินคันเซ็นไปนาโกย่าหรือคานาซาวะในวันก่อนหน้า แล้วขึ้นรถบัสชมไฟประดับจากที่นั่น เส้นทางคานาซาวะอยู่ในคู่มือโตเกียวไปคานาซาวะ (ภาษาอังกฤษ) ของเรา",
  },
];

const TRIP_PREP_TH: Partial<KlookTripPrepItem>[] = [
  {
    label: "ทัวร์รถบัสชมไฟประดับชิราคาวาโกะฤดูหนาวและฮิดะทาคายามะ 1 วัน (จากนาโกย่า)",
    ctaLabel: "ดูรถบัสชมไฟประดับจากนาโกย่า →",
    why: "การเข้างานต้องจองล่วงหน้า และไม่มีรถบัสประจำทางออกจากหมู่บ้านหลังไฟประดับปิด รถบัสที่กันที่เข้างานไว้ให้จึงครบทั้งแผนในการจองครั้งเดียว",
  },
  {
    label: "โรงแรมใกล้สถานีทาคายามะ",
    ctaLabel: "ดูโรงแรมในทาคายามะ →",
    why: "รถบัสชมไฟประดับของ Nohi Bus ออกและกลับที่ศูนย์รถบัสข้างสถานีทาคายามะเวลา 20:20–20:45 น. คืนนั้นจึงเดินกลับที่พักได้ใกล้ ๆ",
  },
  {
    label: "โรงแรมในคานาซาวะ",
    ctaLabel: "ดูโรงแรมในคานาซาวะ →",
    why: "รถบัสชมไฟประดับของ Hokutetsu ออกจากทางออกฝั่งตะวันตกของสถานีคานาซาวะเวลา 14:30 น. และกลับถึง 21:50 น. ถ้าไปเส้นทางนี้ ห้องพักใกล้สถานีคือฐานที่เหมาะ",
  },
  {
    label: "Hokuriku Arch Pass",
    ctaLabel: "ดู Hokuriku Arch Pass →",
    why: "ถ้าเดินทางโตเกียว → คานาซาวะ → คันไซด้วยรถไฟ พาสนี้ใช้กับช่วงชินคันเซ็นได้ แต่ JR Pass ทุกแบบใช้กับรถบัสไปชิราคาวาโกะไม่ได้",
  },
  {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดู Klook eSIM →",
    why: "ประกาศยกเลิกการชมไฟประดับเพราะคลื่นความหนาว รถบัสล่าช้าเพราะหิมะ และข้อมูลการเข้างานส่งมาทางออนไลน์ทั้งหมด และหมู่บ้านไม่มีสถานีให้สอบถาม",
  },
];

const tripPrepItems: KlookTripPrepItem[] = shirakawagoLightUpTripPrep.map((item, i) =>
  withKlookLocale(item, LOCALE, TRIP_PREP_TH[i] ?? {}),
);

const stayAreas = [
  withKlookLocale(japanWinterStayAreas[3], LOCALE, {
    area: "สถานีทาคายามะ",
    why: "ที่นอนในภูเขาของเส้นทางนี้ และจุดขึ้นรถบัสชมไฟประดับชิราคาวาโกะเดือนมกราคม สถานีรถบัส Nohi Bus อยู่ข้างสถานีรถไฟ จบ 19:30 น. แล้วเดินกลับได้เลย",
  }),
  withKlookLocale(japanWinterStayAreas[2], LOCALE, {
    area: "คานาซาวะ",
    why: "สองคืนที่ปลายทางโฮคุริคุชินคันเซ็น รถบัสไป Kenroku-en และรถบัสแบบจองไปชิราคาวาโกะออกจากหน้าสถานี เป็นช่วงที่มีเวลาสำรองน้อยที่สุดของทริป",
  }),
];

const tourPicks = [
  withKlookLocale(shirakawagoWinterLightUpTakayamaNagoyaBusTour, LOCALE, {
    title: "ทัวร์รถบัสชมไฟประดับชิราคาวาโกะฤดูหนาวและฮิดะทาคายามะ 1 วัน (จากนาโกย่า)",
    desc: "รถบัส 12 ชม. 25 นาทีจาก Meitetsu Bus Center ในนาโกย่า ในสี่คืนชมไฟประดับเดือนมกราคม มีเจ้าหน้าที่พูดภาษาอังกฤษ และแวะเมืองเก่าทาคายามะระหว่างทาง",
  }),
  withKlookLocale(shirakawagoLightUp2027NagoyaTour, LOCALE, {
    title: "ทัวร์ชมไฟประดับชิราคาวาโกะ สี่คืนในปี 2027 (จากนาโกย่า)",
    desc: "ทัวร์ 10–12 ชั่วโมงจากนาโกย่าในสี่คืนชมไฟประดับเดือนมกราคม 2027 ชมเฉพาะในหมู่บ้าน เลือกรับจากโรงแรมได้",
  }),
  withKlookLocale(shirakawagoTakayamaKanazawaDayTour, LOCALE, {
    title: "ทัวร์รถบัสชิราคาวาโกะและทาคายามะ 1 วัน จากคานาซาวะ",
    desc: "ทัวร์แบบกลุ่ม 8–10 ชั่วโมงตามหน้ารายการ มีไกด์ใบอนุญาตพูดภาษาอังกฤษ เลือกได้ว่าจะกลับคานาซาวะหรือลงที่ทาคายามะ",
  }),
  withKlookLocale(takayamaShirakawagoNagoyaDayTrip, LOCALE, {
    title: "ทริปทาคายามะและชิราคาวาโกะ 1 วัน จากนาโกย่า",
    desc: "ไปกลับจากสถานีนาโกย่า ประมาณ 11 ชั่วโมงตามหน้ารายการ อยู่ที่ชิราคาวาโกะและเมืองเก่าทาคายามะแห่งละประมาณ 2 ชั่วโมง",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ชิราคาวาโกะ ไลท์อัพ" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.86rem" }}>
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

export default function ThShirakawagoWinterLightUpPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.heroSubtitle}>สี่คืนในเดือนมกราคม ต้องจองล่วงหน้าเท่านั้น รวมทุกช่องทางเข้างาน รถบัสที่พากลับในคืนเดียวกัน และเมืองที่ควรพัก</p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "กฎของสมาคมการท่องเที่ยว ระบุวันที่ตรวจสอบ", "ค่าโดยสาร Nohi Bus และ Hokutetsu", "นาโกย่า ทาคายามะ คานาซาวะ"].map((t) => (
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
            <span className={styles.verdictLabel}>คำตอบสั้น ๆ</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>วันจัดงานปี 2027</p>
                <p className={styles.verdictStatValue}>11, 17, 24 และ 31 มกราคม</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาเปิดไฟ</p>
                <p className={styles.verdictStatValue}>17:30–19:30 น.</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การจอง</p>
                <p className={styles.verdictStatValue}>ต้องจอง ไม่มีบัตรขายในวันงาน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>วิธีที่ดีที่สุด</p>
                <p className={styles.verdictStatValue}>ทัวร์รถบัสชมไฟประดับ</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>การชมไฟประดับชิราคาวาโกะฤดูหนาว</strong>จัด<strong>สี่คืน: 11, 17, 24 และ 31 มกราคม 2027 เวลา 17:30–19:30 น.</strong> เข้าได้เฉพาะผู้ที่จองล่วงหน้า ไม่มีขายบัตรในวันงาน รถยนต์ต้องจองที่จอดรถ (รอบขายที่ 2 เปิด<strong>วันที่ 1 ธันวาคม 2026 เวลา 13:00 น.</strong>) และรถบัสประจำทางเที่ยวสุดท้ายออกจากหมู่บ้าน 17:30 น. ก่อนไฟประดับจะปิด ทัวร์รถบัสชมไฟประดับจาก<strong>นาโกย่า ทาคายามะ หรือคานาซาวะ</strong>เป็นวิธีที่แน่นอนที่สุดทั้งขาไปและขากลับ กฎทั้งหมดตรวจสอบจากเว็บไซต์สมาคมการท่องเที่ยวชิราคาวาโกะเมื่อ {OWN}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ทัวร์ชมไฟประดับจากนาโกย่า →
              </KlookLink>
              <KlookLink href={TAKAYAMA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                โรงแรมในทาคายามะ →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>วันจัดงานและการจอง</span>
          <h2 className={styles.sectionTitle}>ชมไฟประดับชิราคาวาโกะปี 2027 จัดวันไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>11 มกราคม (วันจันทร์ วันหยุดนักขัตฤกษ์) 17, 24 และ 31 มกราคม 2027</strong> ทุกคืนเวลา 17:30–19:30 น. ที่หมู่บ้านโอกิมาจิ นี่คือวันจัดงานทั้งหมดของครั้งที่ 41 สมาคมอาจยกเลิกงานคืนใดคืนหนึ่งหากคลื่นความหนาวทั่วประเทศทำให้การเดินทางติดขัดอย่างหนัก วิธีที่คุณเข้าหมู่บ้านเป็นตัวกำหนดว่าจะขึ้นจุดชมวิวได้หรือไม่:
          </p>
          <Table
            head={["ช่องทางเข้างาน", "ขึ้นจุดชมวิวได้ไหม", "สถานะ (16 พ.ย. 2026)", "จองที่ไหน"]}
            rows={wayRows.map((r) => [r.way, r.deck, r.status, r.book])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด {OWN}:{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">
              สมาคมการท่องเที่ยวชิราคาวาโกะ ภาพรวมการชมไฟประดับปี 2027
            </a>
            ,{" "}
            <a href="https://shirakawa-go.gr.jp/events/459/" target="_blank" rel="noopener">
              ประกาศการจับฉลากที่พัก
            </a>{" "}
            บัตรเข้างานแต่ละใบใช้ได้เฉพาะวันที่ระบุ และต้องคล้องคอไว้ตลอดเวลาที่อยู่ในหมู่บ้าน
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การจอง</span>
          <h2 className={styles.sectionTitle}>ต้องจองล่วงหน้าเพื่อชมไฟประดับชิราคาวาโกะไหม?</h2>
          <p className={styles.bodyText}>
            ต้องจองเสมอ สมาคมใช้<strong>ระบบจองล่วงหน้าทั้งหมดพร้อมบัตรเข้างาน</strong> ถ้าไม่มีบัตรจะถูกปฏิเสธไม่ให้เข้า และ<strong>ไม่มีขายบัตรในวันงาน</strong> ตั้งแต่ 15:30 น. มีประตูกั้นที่ทางเข้าหมู่บ้าน บัตรจุดชมวิวไม่ขายแยก และการจองเปลี่ยนหรือคืนเงินไม่ได้ เว้นแต่คณะกรรมการจัดงานยกเลิกงาน (ตรวจสอบเมื่อ {OWN})
          </p>
          <p className={styles.bodyText}>
            <strong>การจองที่เต็มก่อน:</strong> ที่พักในหมู่บ้าน (จับฉลาก ปิดแล้ว) ตามด้วยที่จอดรถรอบขายที่ 1 (ขายหมดในวันที่เปิดขาย) ที่จอดรถรอบขายที่ 2 เปิด<strong>วันที่ 1 ธันวาคม 2026 เวลา 13:00 น.</strong> และแพ็กเกจของบริษัททัวร์จะขึ้นลิงก์บนเว็บไซต์ของสมาคม<strong>วันที่ 2 ธันวาคม 2026 เวลา 13:00 น.</strong> ทัวร์ชมไฟประดับจากนาโกย่าบน Klook ระบุวันในเดือนมกราคมไว้แล้ว ตรวจสอบวันที่คุณต้องการในหน้ารายการ
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ชมไฟประดับและทาคายามะจากนาโกย่า →
            </KlookLink>
            <KlookLink href={SMALL_GROUP_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์กลุ่มเล็กชมไฟประดับ →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>ทัวร์เป็นวิธีที่ดีที่สุดในการชมไฟประดับไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            สำหรับนักท่องเที่ยวส่วนใหญ่ ใช่ รถบัสประจำทางหมดเที่ยว 17:30 น. ก่อนไฟประดับจะปิด รถบัสหรือ<strong>ทัวร์ชมไฟประดับชิราคาวาโกะ</strong>จะกันที่เข้างานไว้ให้และพาคุณกลับในคืนเดียวกัน เลือกแบบที่ออกจากเมืองที่คุณพัก
          </p>
          <Table head={["ตัวเลือก", "เวลา", "ราคา", "การจอง"]} rows={routeRows.map((r) => [r.option, r.time, r.cost, r.book])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด {OWN}:{" "}
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">
              รถบัสชมไฟประดับของ Nohi Bus
            </a>
            ,{" "}
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">
              รถบัสชมไฟประดับของ Hokutetsu
            </a>
            ,{" "}
            <a href="https://www.hokutetsu.co.jp/highway-bus/takayama/" target="_blank" rel="noopener">
              สายชิราคาวาโกะ–ทาคายามะของ Hokutetsu
            </a>{" "}
            ค่าโดยสารทาคายามะ ¥2,900 ของ Nohi Bus ตั้งแต่ 1 ธันวาคม ตรวจสอบเมื่อ {NOHI_FARE_READ} Nohi Bus และ Hokutetsu เปิดขายที่นั่งรถบัสชมไฟประดับตามวันระหว่าง 13 ตุลาคมถึง 2 พฤศจิกายน Nohi Bus ไม่มีรายชื่อสำรอง ที่นั่งที่ว่างจากการยกเลิกจะกลับมาแสดงในหน้าจอง รายละเอียดทัวร์ Klook เป็นไปตามที่หน้ารายการระบุ
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            ควรเลือกรถบัสชมไฟประดับแบบไหน?
          </h3>
          <p className={styles.bodyText}>
            <strong>พักที่ทาคายามะ:</strong> คอร์ส B ของ Nohi Bus (¥16,000) ถ้าอยากขึ้นจุดชมวิว ต้องเดินขึ้นเนินบนหิมะประมาณ 20 นาทีต่อเที่ยว หรือคอร์ส A (¥13,000) สำหรับหมู่บ้านและพิพิธภัณฑ์กลางแจ้ง <strong>พักที่คานาซาวะ:</strong> รถบัสของ Hokutetsu (¥18,500 รวมจุดชมวิว) อยู่ในหมู่บ้านประมาณ 3 ชั่วโมง 20 นาที <strong>พักที่นาโกย่า หรือจองผ่านเว็บไซต์ภาษาญี่ปุ่นไม่สะดวก:</strong> รถบัสของ Klook ซึ่งจองเป็นภาษาอังกฤษได้
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              รถบัสชมไฟประดับจากนาโกย่า (เจ้าหน้าที่พูดอังกฤษ) →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>กลางวัน</span>
          <h2 className={styles.sectionTitle}>ในวันที่มีการชมไฟประดับ ไปเที่ยวชิราคาวาโกะตอนกลางวันได้ไหม?</h2>
          <p className={styles.bodyText}>
            ได้ แต่ต้องออกเร็ว ในสี่วันนี้รถยนต์จอดได้โดยไม่ต้องจอง แต่ต้อง<strong>เข้าภายใน 15:00 น. และออกภายใน 17:00 น.</strong> รถบัสนำเที่ยวต้องจองที่จอดรถ เข้าภายใน 14:00 น. และออกภายใน 16:00 น. ถ้ามาด้วยรถบัสประจำทาง ให้ขึ้นเที่ยวที่<strong>ถึงหมู่บ้านภายใน 15:20 น.</strong> ทางเดินไปจุดชมวิวปิด 15:45 น. และจุดชมวิวปิด 16:10 น. สมาคมแนะนำให้เผื่อเวลาเที่ยวหมู่บ้าน 2–3 ชั่วโมง และจอดรถภายใน 12:00 น. (ตรวจสอบเมื่อ {OWN})
          </p>
          <p className={styles.bodyText}>
            ถ้าไปกลางวันในวันอื่น เราเทียบเที่ยวรถและค่าโดยสารไว้ใน{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en" style={linkStyle}>
              คู่มือทัวร์ทาคายามะและชิราคาวาโกะ (ภาษาอังกฤษ)
            </Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANAZAWA_DAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์กลางวันจากคานาซาวะ →
            </KlookLink>
            <KlookLink href={NAGOYA_DAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์กลางวันจากนาโกย่า →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="จองในทริปเดียวกัน"
          heading="ต้องจองอะไรบ้างสำหรับการชมไฟประดับชิราคาวาโกะ?"
          intro="รถบัสชมไฟประดับ ห้องพักในเมืองที่รถออก พาสรถไฟถ้าคุ้มค่า และอินเทอร์เน็ตมือถือ ราคาบน Klook เปลี่ยนตามวัน เปิดหน้ารายการเพื่อดูราคาของวันที่คุณเดินทาง"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>สภาพอากาศ</span>
          <h2 className={styles.sectionTitle}>ชิราคาวาโกะตอนกลางคืนเดือนมกราคมหนาวแค่ไหน?</h2>
          <p className={styles.bodyText}>
            <strong>−10°C ถึง 0°C</strong> ในช่วงเวลาชมไฟประดับ ตามตัวเลขของสมาคมการท่องเที่ยวเอง และถนนเป็นน้ำแข็ง เตรียมเสื้อโค้ทกันหนาว รองเท้าบูทกันน้ำกันหนาว แผ่นกันลื่นสวมรองเท้า และไฟฉาย เพราะทางเดินระหว่างบ้านมืด ห้ามใช้ขาตั้งกล้องบนจุดชมวิว และห้ามบินโดรนทั่วทั้งหมู่บ้าน
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            พาเด็กไปชมไฟประดับได้ไหม?
          </h3>
          <p className={styles.bodyText}>
            ได้ ถ้าแต่งตัวกันหนาวให้พร้อม Nohi Bus คิดราคาเดียวกันสำหรับผู้ใหญ่และเด็กประถม เด็กอายุต่ำกว่า 6 ปีไม่เสียค่าโดยสารถ้าไม่ใช้ที่นั่ง ส่วนราคาเด็กของ Hokutetsu คือ ¥16,500 ทางไปจุดชมวิวต้องเดินขึ้นเนินบนหิมะ
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            ถ้างานถูกยกเลิกเพราะหิมะจะเป็นอย่างไร?
          </h3>
          <p className={styles.bodyText}>
            ค่าที่จอดรถคืนเงินเฉพาะเมื่อคณะกรรมการจัดงานยกเลิกงาน Nohi Bus แจ้งว่าหิมะอาจทำให้รถบัสล่าช้าและเวลาในหมู่บ้านสั้นลง สำหรับทัวร์ Klook เงื่อนไขเรื่องสภาพอากาศและการคืนเงินอยู่ในหน้ารายการ
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ที่พัก</span>
          <h2 className={styles.sectionTitle}>ควรพักที่ไหนเพื่อไปชมไฟประดับ?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            พักที่เมืองที่รถบัสชมไฟประดับของคุณออก: ทาคายามะสำหรับ Nohi Bus คานาซาวะสำหรับ Hokutetsu และนาโกย่าสำหรับรถบัสของ Klook
          </p>
          <Table head={["เมืองที่พัก", "เหตุผล", "ข้อควรระวัง"]} rows={stayRows.map((r) => [r.base, r.why, r.watch])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด {OWN}:{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">
              shirakawa-go.gr.jp
            </a>
            ,{" "}
            <a href="https://www.nouhibus.co.jp/shirakawa_lightup_2027/" target="_blank" rel="noopener">
              nouhibus.co.jp
            </a>
            ,{" "}
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">
              hokutetsu.co.jp
            </a>{" "}
            แผนเที่ยวคานาซาวะสองวันพร้อมชิราคาวาโกะอยู่ใน{" "}
            <Link href="/guides/attractions/kanazawa-2-day-itinerary" hrefLang="en" style={linkStyle}>
              แผนเที่ยวคานาซาวะ 2 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            และเส้นทางเดือนมกราคมที่วางรอบการชมไฟประดับอยู่ใน{" "}
            <Link href="/th/guides/attractions/japan-winter-itinerary" style={linkStyle}>
              แผนเที่ยวญี่ปุ่นหน้าหนาว
            </Link>
          </p>
        </section>

        <KlookStayAreas
          heading="ค้นหาโรงแรมสำหรับการชมไฟประดับ"
          intro="ราคาห้องและห้องว่างเปลี่ยนตามวัน แต่ละเมืองจึงลิงก์ไปที่หน้าค้นหาโรงแรมของ Klook สำหรับเมืองนั้น"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            ข้อมูลการเข้างาน ข้อความนัดรับของรถบัส และประกาศยกเลิกเพราะคลื่นความหนาว ส่งมาทางออนไลน์ทั้งหมด{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              ดูตัวเลือก Klook eSIM →
            </KlookLink>{" "}
            มาจากโตเกียว? ช่วงชินคันเซ็นอยู่ใน{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" hrefLang="en" style={linkStyle}>
              คู่มือโตเกียวไปคานาซาวะ (ภาษาอังกฤษ)
            </Link>{" "}
            และคู่มือ{" "}
            <Link href="/guides/transport/hokuriku-arch-pass" hrefLang="en" style={linkStyle}>
              Hokuriku Arch Pass (ภาษาอังกฤษ)
            </Link>{" "}
            คำนวณว่าพาส 7 วันถูกกว่าตั๋วเดี่ยวหรือไม่ เมื่อคานาซาวะอยู่ระหว่างโตเกียวกับโอซาก้า
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อย" />

        <KlookTourPicks
          heading="ทัวร์ชิราคาวาโกะบน Klook"
          intro="รถบัสชมไฟประดับจากนาโกย่าสองแบบ และทัวร์กลางวันสองแบบสำหรับวันอื่น ระยะเวลา จุดรับ และสิ่งที่รวมอยู่ในแต่ละหน้ารายการ"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "ทัวร์ทาคายามะและชิราคาวาโกะ: ออกจากเมืองไหนดี (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "แผนเที่ยวคานาซาวะ 2 วัน: คานาซาวะและชิราคาวาโกะ (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/japan-winter-itinerary", title: "เที่ยวญี่ปุ่นหน้าหนาว 2027: แผนเที่ยว 12 วัน" },
            { href: "/guides/transport/tokyo-to-kanazawa", title: "โตเกียวไปคานาซาวะด้วยชินคันเซ็น (ภาษาอังกฤษ)" },
            { href: "/guides/transport/hokuriku-arch-pass", title: "Hokuriku Arch Pass (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/hokkaido-winter-tours", title: "ทัวร์ฮอกไกโดหน้าหนาวจากซัปโปโร (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "ที่เที่ยวในญี่ปุ่นเพิ่มเติม (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>สี่คืนเท่านั้น ไม่มีบัตรขายในวันงาน</h2>
            <p className={styles.ctaBannerDesc}>เลือกวัน จองรถบัสชมไฟประดับจากเมืองที่คุณพัก และเตรียมเสื้อผ้าสำหรับ −10°C</p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={COACH_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูทัวร์ชมไฟประดับ →
              </KlookLink>
              <KlookLink href={KANAZAWA_HOTELS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                โรงแรมในคานาซาวะ →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
