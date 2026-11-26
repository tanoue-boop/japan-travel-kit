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
import {
  klookEsim,
  odaibaHotelsUrl,
  skyhopHopOnHopOffBus,
  teamlabPlanetsTicketUrl,
  tokyoBayDinnerCruiseSymphony,
  tokyoBaySunsetBoatCruise,
  tokyoBaySunsetCruise,
  tokyoBayYakatabuneDinnerShow,
  tokyoJoypolisPassport,
  tokyoJoypolisTicket,
  tokyoSightseeingBusTour,
  tokyoAirportStayAreas,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/tokyo-joypolis-tickets) section by section as of
// 2026-11-26 (task-jtk-20261126-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (tokyo-joypolis.com, read 17 Nov
// 2026); nothing is added. Title term: ตั๋ว Tokyo Joypolis — Thai results keep the Latin name
// (the Tokyo Convention & Visitors Bureau's Thai page writes โตเกียวจอยโพลิส, given once in the hero).

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/tokyo-joypolis-tickets";
const TITLE = "ตั๋ว Tokyo Joypolis 2026: ราคา";
const H1 = "ตั๋ว Tokyo Joypolis 2026: ราคา Joypolis Passport และคุ้มไหม?";
const DESC =
  "ตั๋ว Tokyo Joypolis: ค่าเข้า ¥1,700 Passport ¥6,000 คุ้มตั้งแต่เครื่องที่ 5 และแผนเที่ยวโอไดบะ";

const CHECKED_ISO = "2026-11-17";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const PASSPORT_URL = klookFor(tokyoJoypolisPassport.url, LOCALE);
const TICKET_URL = klookFor(tokyoJoypolisTicket.url, LOCALE);
const SUNSET_URL = klookFor(tokyoBaySunsetCruise.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const OFFICIAL = [
  { label: "หน้าราคาตั๋ว tokyo-joypolis.com", href: "https://tokyo-joypolis.com/ticket/" },
  { label: "รายชื่อเครื่องเล่นและราคาต่อครั้ง", href: "https://tokyo-joypolis.com/attraction/" },
  { label: "หน้าการเดินทาง", href: "https://tokyo-joypolis.com/access/" },
];

const priceRows = [
  {
    ticket: "คำตอบ: ซื้อตั๋วแบบไหน?",
    adult: "Passport ถ้าเล่นตั้งแต่ 5 เครื่อง",
    child: "Passport ถ้าเล่นตั้งแต่ 4 เครื่อง",
    what: "ถ้ามีแค่ตั๋วเข้า เครื่องเล่นราคาครั้งละ ¥700–¥1,000 ถ้าจะเล่น 5 เครื่องขึ้นไป (นักเรียน 4 เครื่อง) ให้ซื้อ Passport ถ้าน้อยกว่านั้น ซื้อตั๋วเข้าแล้วจ่ายเป็นครั้ง",
  },
  {
    ticket: "ตั๋วเข้าอย่างเดียว (入場券)",
    adult: "¥1,700",
    child: "¥1,400",
    what: "เข้าได้อย่างเดียว ทุกเครื่องเล่นต้องจ่ายแยก",
  },
  {
    ticket: "เล่นเครื่องเล่นครั้งเดียว เมื่อมีตั๋วเข้า",
    adult: "¥700–¥1,000",
    child: "¥700–¥1,000",
    what: "ต่อคนต่อครั้ง รถไฟเหาะ Halfpipe Tokyo และ NARUTO ราคา ¥1,000 ส่วนอื่นส่วนใหญ่ ¥700–¥900",
  },
  {
    ticket: "Passport (パスポート)",
    adult: "¥6,000",
    child: "¥5,000",
    what: "ค่าเข้าพร้อมเล่นเครื่องเล่นได้ไม่จำกัดทั้งวัน เป็นตั๋วที่คนส่วนใหญ่ต้องการ",
  },
  {
    ticket: "Passport ที่ซื้อในสวนสนุก (館内料金)",
    adult: "¥4,300",
    child: "¥3,600",
    what: "ราคาอัปเกรดเมื่อเข้ามาด้วยตั๋วเข้าแล้ว ¥1,700 + ¥4,300 = ¥6,000 จึงไม่ใช่ส่วนลด",
  },
  {
    ticket: "Evening Passport (イブニングパスポート)",
    adult: "¥5,000",
    child: "¥4,000",
    what: "ขายตั้งแต่ 15:00 หรือ 16:00 ในวันที่สวนสนุกปิด 22:00 เล่นได้ไม่จำกัดจนปิดในวันนั้น",
  },
  {
    ticket: "Evening Passport ที่ซื้อในสวนสนุก",
    adult: "¥3,300",
    child: "¥2,600",
    what: "คำนวณแบบเดียวกัน ¥1,700 + ¥3,300 = ¥5,000",
  },
  {
    ticket: "ตั๋ว CHOI-NORI-NIGHT 2 ครั้ง (ちょいのりナイト2回券)",
    adult: "¥3,100",
    child: "¥3,100",
    what: "ค่าเข้าพร้อมเครื่องเล่น 2 อย่างที่เลือกเอง ราคาเดียวตั้งแต่ชั้นประถมขึ้นไป ขายตั้งแต่ 17:00 หรือ 18:00 ในวันที่ปิด 22:00",
  },
  {
    ticket: "Annual Passport (年間パスポート)",
    adult: "¥29,000",
    child: "¥24,000",
    what: "เล่นไม่จำกัดหนึ่งปี เหมาะเฉพาะคนที่อาศัยอยู่ในโตเกียว",
  },
];

const heightRows = [
  {
    limit: "ไม่จำกัดส่วนสูง",
    rides:
      "Pirate's Plunder, NARUTO Music Dancer, MISSION SPARK, Gyakuten Saiban in Joypolis, Fortune Forest, Laura & Carla, Attack on Titan THE ATTRACTION, MURDER LODGE",
    note: "8 จาก 21 เครื่อง พอให้เด็กเล็กเล่นได้ระยะหนึ่ง แต่ไม่มีเครื่องเล่นหวาดเสียวเลย",
  },
  {
    limit: "90 ซม. ขึ้นไป",
    rides: "Spicy Taxi, House of the Dead ~Scarlet Dawn~ THE ATTRACTION",
    note: "เกณฑ์ต่ำที่สุดในสวนสนุก",
  },
  {
    limit: "110 ซม. ขึ้นไป",
    rides:
      "LASER SHOOTING ISSEN, Sonic Athletics, Ayakashi Yashiki, Wild Wing, Wild Jungle Brothers, Wild River The Treasure Hunt",
    note: "เกณฑ์ที่ตัดสินการมาเที่ยวของครอบครัวส่วนใหญ่ และเป็น 110 ซม. เดียวกับเกณฑ์เข้าฟรี",
  },
  {
    limit: "130 ซม. ขึ้นไป",
    rides: "Gekion Live Coaster, Halfpipe Tokyo, Transformers Human Alliance Special",
    note: "รถไฟเหาะในร่มและ Halfpipe สองเครื่องเล่นที่ Joypolis มีชื่อเสียงที่สุด",
  },
  {
    limit: "140 ซม. ขึ้นไป และมีเกณฑ์สูงสุด",
    rides: "Sadako ~Kurui Uranai no Yakata~ (140–185 ซม.), Storm-G (140–200 ซม.)",
    note: "มีเพียงสองเครื่องนี้ที่มีทั้งเกณฑ์ต่ำสุดและสูงสุด",
  },
];

const comboRows = [
  {
    when: "คำตอบ",
    what: "ช่วงเช้า teamLab Planets ตั้งแต่ 15:00 เล่น Joypolis ด้วย Evening Passport แล้วไปชมวิวกลางคืนที่สวนสาธารณะโอไดบะไคฮิน",
    ticket: "จองรอบ Planets ก่อน Joypolis ไม่ต้องระบุวัน",
  },
  {
    when: "ช่วงเช้า",
    what: "teamLab Planets TOKYO ย่านโทโยสุ เดิน 3 นาทีจากทางออก 1A สถานีชินโทโยสุ (สาย Yurikamome) เปิด 8:00–22:00 เข้าได้ถึง 1 ชั่วโมงก่อนปิด",
    ticket: "ตั๋วระบุวันและรอบเข้าชม ผู้ใหญ่เริ่ม ¥3,800 บนเว็บไซต์จำหน่ายบัตรอย่างเป็นทางการ",
  },
  {
    when: "ช่วงกลางวัน",
    what: "นั่งสาย Yurikamome จากชินโทโยสุไปโอไดบะไคฮินโคเอ็น สายเดียวกัน ไม่ต้องเปลี่ยนรถ กินมื้อกลางวันที่ DECKS Tokyo Beach",
    ticket: "บัตร IC",
  },
  {
    when: "ตั้งแต่ 15:00",
    what: "Tokyo Joypolis ชั้น 3–5 ของ DECKS เดิน 2 นาทีจากสถานีโอไดบะไคฮินโคเอ็น Evening Passport เริ่มขาย 15:00 (16:00 ในวันที่ปิด 22:00)",
    ticket: "Evening Passport ผู้ใหญ่ ¥5,000 / นักเรียน ¥4,000 เข้าได้ถึง 45 นาทีก่อนปิด",
  },
  {
    when: "ช่วงค่ำ",
    what: "สวนสาธารณะโอไดบะไคฮิน หน้า DECKS ผู้ดูแลสวนแนะนำวิวพระอาทิตย์ตกและวิวกลางคืนจากชายหาด จุดชมวิว หรือสกายวอล์ก",
    ticket: "ไม่ต้องจอง",
  },
  {
    when: "ทางเลือก",
    what: "ล่องเรือชมพระอาทิตย์ตกอ่าวโตเกียว ผ่านสะพานเรนโบว์และริมน้ำโอไดบะ ถ้าอยากชมวิวกลางคืนจากบนน้ำ",
    ticket: "จองล่วงหน้า ดูคู่มือล่องเรือ",
  },
];

const whoFor = [
  {
    title: "ซื้อ Passport ถ้า…",
    desc: `คุณจะเล่น 5 เครื่องขึ้นไป (นักเรียน 4 เครื่อง) Passport ผู้ใหญ่ ¥6,000 นักเรียน ¥5,000 ส่วนที่เป็นค่าเครื่องเล่นเท่ากับ ¥4,300 และ ¥3,600 ขณะที่เล่นครั้งเดียวราคา ¥700–¥1,000 ดังนั้นถ้าเลือกเครื่องละ ¥1,000 จะคุ้มตั้งแต่เครื่องที่ 5 และไม่ต้องคิดเงินทุกครั้งที่ต่อแถว ราคาจาก tokyo-joypolis.com เมื่อ ${CHECKED}`,
  },
  {
    title: "ซื้อตั๋วเข้าอย่างเดียวถ้า…",
    desc: `คุณอยากเล่นแค่สองสามเครื่อง เดินดูชั้นเกมอาร์เคด หรือเป็นผู้ใหญ่ที่คอยถือของ ค่าเข้าผู้ใหญ่ ¥1,700 นักเรียน ¥1,400 และอัปเกรดเป็น Passport ข้างในได้ในราคา ¥4,300 รวมเป็น ¥6,000 เท่าเดิม จึงไม่เสียอะไรถ้าตัดสินใจหน้างาน ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    title: "ซื้อตั๋วช่วงเย็นถ้า…",
    desc: `Joypolis อยู่ช่วงครึ่งหลังของวันเที่ยวโอไดบะ Evening Passport เริ่มขาย 15:00 (16:00 ในวันที่ปิด 22:00) ผู้ใหญ่ ¥5,000 เด็ก ¥4,000 และตั๋ว CHOI-NORI-NIGHT 2 ครั้ง ราคา ¥3,100 ตั้งแต่ 17:00 สำหรับทุกคนตั้งแต่ชั้นประถมขึ้นไป ตรวจสอบเมื่อ ${CHECKED}`,
  },
];

const steps = [
  {
    title: "ดูวันที่ในปฏิทินทางการก่อน",
    desc: `ขั้นตอนนี้ข้ามไม่ได้ Joypolis ไม่ประกาศเวลาเปิดแบบตายตัว เว็บไซต์ทางการใช้ปฏิทินประกาศเวลาเป็นช่วง ๆ และระบุว่าอาจเปลี่ยนโดยไม่แจ้งล่วงหน้า วันที่คุณไปมีตั๋วเย็นแบบไหนและเริ่มขายกี่โมง ขึ้นกับว่าวันนั้นปิด 22:00 หรือไม่ ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    title: "เลือกประเภทตั๋วก่อนเลือกผู้ขาย",
    desc: "ตั๋วเข้า Passport, Evening Passport และตั๋วกลางคืน 2 ครั้ง เป็นสินค้าสี่แบบที่ต่างกัน ราคาถูกสุดกับแพงสุดห่างกันมากกว่า ¥4,000 เลือกจากตารางด้านบนก่อน แล้วค่อยเปิดหน้าผู้ขาย อย่าสลับลำดับ",
  },
  {
    title: "จองล่วงหน้าถ้าอยากจ่ายเงินผ่านหน้าภาษาไทยหรือใช้บัตรต่างประเทศ",
    desc: "Joypolis ขายตั๋วหน้างาน ตั๋วหมดจึงไม่ใช่ปัญหา สิ่งที่ยุ่งยากคือการจ่ายเงิน หน้าสินค้า Klook จ่ายเงินผ่านหน้าภาษาไทยได้ รับบัตรต่างประเทศ และให้ QR code บนมือถือสำหรับสแกนที่ทางเข้าแทนการต่อแถวซื้อตั๋ว หน้าสินค้ายังระบุว่าจองวันเดียวกันได้ ยืนยันทันที และยกเลิกฟรี ก่อนจ่ายเงินให้ตรวจสอบเงื่อนไขการยกเลิกที่แสดงสำหรับวันที่คุณเลือก",
  },
  {
    title: "ไปถึงก่อนปิดอย่างน้อย 90 นาที และเร็วกว่านั้นจะดีกว่า",
    desc: `เข้าได้ถึง 45 นาทีก่อนปิด ซึ่งเป็นเส้นตายของวัน นอกจากนี้หน้าสินค้า Klook แนะนำให้เผื่อ 2 ถึง 4 ชั่วโมง และเครื่องเล่นกระจายอยู่สามชั้น ไปถึงชั่วโมงสุดท้ายก่อนปิดได้แค่เดินดูรอบเดียว กฎเวลาเข้าสุดท้ายจาก tokyo-joypolis.com เมื่อ ${CHECKED}`,
  },
  {
    title: "เก็บบัตร Joypolis ไว้สำหรับกลับเข้าใหม่",
    desc: `หน้าภาษาอังกฤษของทางการระบุว่าผู้ถือบัตร Joypolis กลับเข้าได้ไม่จำกัดในวันที่ออกบัตร และเว็บไซต์ภาษาญี่ปุ่นเพิ่มว่ากลับเข้าได้ถึง 45 นาทีก่อนปิด ทำให้ Joypolis จับคู่กับที่อื่นในโอไดบะได้โดยไม่ต้องใช้ทั้งวัน ตรวจสอบเมื่อ ${CHECKED}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "Tokyo Joypolis Passport ราคาเท่าไร?",
    a: `Joypolis Passport ซึ่งรวมค่าเข้าและเล่นเครื่องเล่นได้ไม่จำกัดทั้งวัน ราคาหน้างาน ผู้ใหญ่ (18 ปีขึ้นไป) ¥6,000 นักเรียนประถม มัธยมต้น และมัธยมปลาย ¥5,000 ถ้าซื้อข้างในหลังเข้าด้วยตั๋วเข้า ราคา ¥4,300 และ ¥3,600 รวมแล้วเท่ากัน หลัง 15:00 (16:00 ในวันที่ปิด 22:00) Evening Passport ราคา ¥5,000 และ ¥4,000 ตั๋วเข้าอย่างเดียว ¥1,700 และ ¥1,400 ข้อมูลจาก tokyo-joypolis.com เมื่อ ${CHECKED}`,
  },
  {
    q: "Tokyo Joypolis คุ้มไหม?",
    a: `คุ้ม ถ้ากลุ่มของคุณจะเล่นอย่างน้อย 5 เครื่องและทุกคนผ่านเกณฑ์ส่วนสูง ถ้ามีแค่ตั๋วเข้า เครื่องเล่นราคาครั้งละ ¥700 ถึง ¥1,000 ส่วนค่าเครื่องเล่น ¥4,300 ใน Passport ผู้ใหญ่จึงคุ้มตั้งแต่เครื่องที่ 5 (ถ้าเลือกเครื่องละ ¥1,000) ถึงเครื่องที่ 7 (ถ้าเลือกเครื่องละ ¥700) สำหรับเด็กที่สูงไม่ถึง 110 ซม. ซึ่งเล่นได้เฉพาะเครื่องที่ไม่จำกัดส่วนสูง จะคุ้มน้อยกว่า ราคาตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ต้องใช้เวลาที่ Joypolis นานแค่ไหน?",
    a: `เผื่อไว้ 2 ถึง 4 ชั่วโมง ตามที่หน้าสินค้า Klook ระบุ มีเครื่องเล่น 21 อย่างในสามชั้น และเข้าได้ถึง 45 นาทีก่อนปิด ถ้าจะแวะสั้น ๆ ให้ไปถึงอย่างน้อย 90 นาทีก่อนปิด ในวันเดียวกันกลับเข้าได้จนถึงเวลาเข้าสุดท้าย จึงออกไปกินข้าวแล้วกลับมาได้ ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "Joypolis เหมาะกับผู้ใหญ่ไหม?",
    a: `เหมาะ สวนสนุกนี้เน้นเครื่องเล่นสำหรับวัยรุ่นและผู้ใหญ่ Gekion Live Coaster และ Halfpipe Tokyo ต้องสูง 130 ซม. Storm-G รับ 140 ถึง 200 ซม. และเครื่องเล่นสยองขวัญเสียง 3D อย่าง MURDER LODGE ไม่รับเด็กอายุต่ำกว่า 7 ปี Passport ผู้ใหญ่ราคา ¥6,000 ส่วนผู้ที่อายุ 60 ปีขึ้นไปเข้าฟรีเมื่อแสดงหลักฐานอายุ และซื้อ Passport ได้ในราคาในสวนสนุก ¥4,300 ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ไป Tokyo Joypolis อย่างไร?",
    a: `นั่งสาย Yurikamome ไปสถานีโอไดบะไคฮินโคเอ็น (Odaiba-Kaihinkoen) เดิน 2 นาที หรือสาย Rinkai ไปสถานีโตเกียวเทเลพอร์ต (Tokyo Teleport) เดิน 5 นาที หน้าการเดินทางทางการระบุว่าจากชิมบาชิประมาณ 13 นาที จากสถานีโตเกียวผ่านชิมบาชิประมาณ 23 นาทีด้วยสาย Yurikamome และจากชิบุยะประมาณ 18 นาที ชินจูกุ 23 นาทีด้วยสาย Rinkai Joypolis อยู่ชั้น 3 ถึง 5 ของ DECKS Tokyo Beach เลขที่ 1-6-1 Daiba ตรวจสอบเมื่อ ${CHECKED}`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "ตั๋ว Tokyo Joypolis ราคาเท่าไร?",
    a: `ตั๋วเข้าอย่างเดียว ผู้ใหญ่อายุ 18 ปีขึ้นไป ¥1,700 นักเรียนประถม มัธยมต้น และมัธยมปลาย ¥1,400 Passport ซึ่งเพิ่มการเล่นเครื่องเล่นไม่จำกัดทั้งวัน ผู้ใหญ่ ¥6,000 นักเรียน ¥5,000 Evening Passport ขายตั้งแต่ 15:00 (16:00 ในวันที่ปิด 22:00) ราคา ¥5,000 และ ¥4,000 ส่วนตั๋ว CHOI-NORI-NIGHT ซึ่งรวมค่าเข้าและเครื่องเล่น 2 อย่างที่เลือกเอง ขายตั้งแต่ 17:00 ราคา ¥3,100 สำหรับทุกคนตั้งแต่ชั้นประถมขึ้นไป Annual Passport ผู้ใหญ่ ¥29,000 นักเรียน ¥24,000 ทั้งหมดจาก tokyo-joypolis.com เมื่อ ${CHECKED}`,
  },
  {
    q: "ตั๋วเข้ากับ Joypolis Passport ต่างกันอย่างไร?",
    a: `ตั๋วเข้าพาคุณเข้าอาคาร Passport พาคุณขึ้นเครื่องเล่น ด้วยตั๋วเข้าผู้ใหญ่ ¥1,700 คุณจ่ายค่าเครื่องเล่นแยกแต่ละอย่าง และอัปเกรดเป็น Passport ข้างในได้ในราคา ¥4,300 รวมเป็น ¥6,000 พอดีกับราคา Passport หน้างาน การซื้อสองขั้นจึงไม่ได้ประหยัดหรือเสียเพิ่ม เครื่องเล่นครั้งละ ¥700 ถึง ¥1,000 ถ้าอยากเล่น 5 อย่างขึ้นไป Passport คือคำตอบ ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "มีตั๋ว Joypolis ช่วงเย็นที่ถูกกว่าไหม?",
    a: `มีสองแบบ Evening Passport ผู้ใหญ่ ¥5,000 นักเรียน ¥4,000 ถูกกว่า Passport ทั้งวัน ¥1,000 เริ่มขาย 15:00 ในวันปกติ หรือ 16:00 ในวันที่ปิด 22:00 ถูกกว่านั้นคือตั๋ว CHOI-NORI-NIGHT 2 ครั้ง ราคา ¥3,100 สำหรับทุกคนตั้งแต่ชั้นประถมขึ้นไป ขายตั้งแต่ 17:00 (18:00 ในวันที่ปิด 22:00) ใช้ได้กับค่าเข้าและเครื่องเล่น 2 อย่างที่เลือกเอง ทั้งสองแบบจากหน้าราคาทางการเมื่อ ${CHECKED}`,
  },
  {
    q: "Tokyo Joypolis เปิดกี่โมง?",
    a: `ไม่มีคำตอบเดียว และนั่นคือคำตอบของทางการเอง tokyo-joypolis.com ประกาศเวลาเปิดในปฏิทินเป็นช่วง ๆ และระบุว่าอาจเปลี่ยนโดยไม่แจ้งล่วงหน้า กฎสองข้อใช้ทุกวัน คือเข้าได้ถึง 45 นาทีก่อนปิด และกลับเข้าได้ถึง 45 นาทีก่อนปิดเช่นกัน ตั๋วเย็นขึ้นกับเวลาปิด (Evening Passport 15:00 หรือ 16:00 ตั๋วกลางคืน 17:00 หรือ 18:00) การดูวันที่ในปฏิทินจึงบอกด้วยว่าวันนั้นมีตั๋วเย็นแบบไหน ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "Tokyo Joypolis มีข้อจำกัดส่วนสูงไหม?",
    a: `มี 13 จาก 21 เครื่องเล่น และมีผลมากกว่าสวนสนุกส่วนใหญ่ 2 เครื่องกำหนด 90 ซม. ขึ้นไป 6 เครื่อง 110 ซม. ขึ้นไป 3 เครื่อง 130 ซม. ขึ้นไป รวมถึง Gekion Live Coaster และ Halfpipe Tokyo สองเครื่องเล่นที่สวนสนุกมีชื่อเสียง และอีก 2 เครื่องมีเกณฑ์สูงสุดด้วย Sadako รับ 140 ถึง 185 ซม. และ Storm-G รับ 140 ถึง 200 ซม. อีก 8 เครื่องไม่จำกัดเลย ข้อมูลจากหน้าเครื่องเล่นทางการเมื่อ ${CHECKED}`,
  },
  {
    q: "พาเด็กเล็กไป Tokyo Joypolis ได้ไหม?",
    a: `พาเข้าฟรีได้ แต่ดูตารางส่วนสูงก่อนวางแผนทั้งบ่าย เว็บไซต์ทางการให้เด็กก่อนวัยเรียนที่สูงไม่ถึง 110 ซม. เข้าฟรี และ 110 ซม. ก็เป็นเกณฑ์ต่ำสุดของเครื่องเล่น 6 อย่าง อีก 3 อย่างกำหนด 130 ซม. ในทางปฏิบัติ เด็กที่สูงไม่ถึง 110 ซม. เล่นได้ 8 เครื่องที่ไม่จำกัดส่วนสูงและชั้นเกมอาร์เคด ซึ่งก็ไปได้แต่ใช้เวลาไม่นาน เครื่องเล่นที่เกณฑ์ต่ำที่สุดคือ Spicy Taxi และ House of the Dead เริ่มที่ 90 ซม. ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ใครเข้าฟรีได้อีกบ้าง?",
    a: `หน้าราคาตั๋วทางการระบุไว้สี่กลุ่ม เด็กก่อนวัยเรียนที่สูงไม่ถึง 110 ซม. ผู้ที่อายุ 60 ปีขึ้นไปเมื่อแสดงหลักฐานอายุ ผู้ตั้งครรภ์ที่แสดงสมุดสุขภาพแม่และเด็ก และผู้ถือบัตรผู้พิการพร้อมผู้ติดตามไม่เกิน 2 คน ถ้ามีคนในกลุ่มที่อยู่ในกลุ่มเหล่านี้ ให้ซื้อตั๋วของเขาที่สวนสนุกแทนการซื้อออนไลน์ ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ต้องจองตั๋ว Tokyo Joypolis ล่วงหน้าไหม?",
    a: "ไม่ต้อง Joypolis ต่างจากโตเกียวดิสนีย์หรือ teamLab ตรงที่เดินเข้าได้เลย ไม่มีตั๋วระบุวันและไม่มีรอบเข้าชม จึงไม่มีอะไรขายหมดและไม่ต้องวางแผนล่วงหน้าหลายสัปดาห์ การจองออนไลน์เป็นเรื่องของการจ่ายเงินมากกว่าที่นั่ง ผู้ขายตั๋วออนไลน์ให้คุณซื้อผ่านหน้าภาษาไทย ใช้บัตรที่จ่ายผ่านได้จริง และได้ QR code ไว้สแกนที่ทางเข้า ถ้าคุณอยู่โอไดบะแล้วและมีบัตรญี่ปุ่น ซื้อที่จุดขายตั๋วหน้างานก็ได้เช่นกัน",
  },
  {
    q: "Tokyo Joypolis เป็นตัวเลือกที่ดีในวันฝนตกไหม?",
    a: "เป็นหนึ่งในตัวเลือกที่ดีกว่าในโตเกียว สวนสนุกทั้งหมดอยู่ในร่มภายในศูนย์การค้า และศูนย์การค้าเชื่อมกับส่วนอื่นของริมน้ำโอไดบะด้วยทางเดินมีหลังคาบางช่วง สถานี Yurikamome ห่างไปเพียง 2 นาที ถ้าล่องเรืออ่าวหรือจุดชมวิวกลางแจ้งต้องยกเลิกเพราะฝน ที่นี่เปลี่ยนแผนได้โดยไม่ต้องจองใหม่ และด้วยกฎกลับเข้าใหม่ คุณออกไปกินข้าวที่ DECKS แล้วกลับมาได้",
  },
  {
    q: "ในวันเดียวกันทำอะไรที่โอไดบะได้อีก?",
    a: "ล่องเรืออ่าวโตเกียวเข้ากันที่สุด เรือออกจากโอไดบะและท่าเรือฮิโนเดะที่อยู่ไม่ไกล และรอบเย็นตรงกับ Evening Passport พอดี มีเรื่องหนึ่งที่ต้องแก้ไขเพราะยังมีคนเข้าใจผิด teamLab Borderless ไม่ได้อยู่ที่โอไดบะแล้ว ปิดที่โอไดบะและเปิดใหม่ที่อาซาบุไดฮิลส์ วันที่ไปทั้ง Joypolis และ teamLab จึงเป็นสองย่านที่ต่างกันของโตเกียว ไม่ใช่ริมน้ำเดียวกัน และ Madame Tussauds Tokyo ซึ่งเคยอยู่ในอาคาร DECKS เดียวกันและมักขายเป็นตั๋วคอมโบกับ Joypolis ระบุบนเว็บไซต์ของตัวเองว่าปิดให้บริการเมื่อ 30 กันยายน 2026",
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "ตั๋ว",
    label: "ตั๋ว teamLab Planets TOKYO",
    ctaLabel: "จองรอบ teamLab Planets →",
    url: klookFor(teamlabPlanetsTicketUrl, LOCALE),
    why: "Planets อยู่ห่างสถานีชินโทโยสุ 3 นาที บนสาย Yurikamome สายเดียวกับ Joypolis แต่ขายตั๋วแบบระบุวันและรอบเข้าชม จึงเป็นส่วนที่ต้องจองก่อนในวันเที่ยวโอไดบะ",
  },
  {
    kind: "โรงแรม",
    label: "โรงแรมในโอไดบะ",
    ctaLabel: "ดูโรงแรมโอไดบะบน Klook →",
    url: klookFor(odaibaHotelsUrl, LOCALE),
    why: "Evening Passport ใช้ได้จนสวนสนุกปิด และวิวกลางคืนริมน้ำมาหลังจากนั้น การพักบนเกาะจึงไม่ต้องข้ามอ่าวกลับดึก",
  },
  {
    kind: "eSIM",
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดู Klook eSIM →",
    url: ESIM_URL,
    why: "Joypolis ประกาศเวลาเปิดในปฏิทินแทนเวลาตายตัว และตั๋วเย็นขึ้นกับเวลานั้น จึงควรเช็กวันที่บนมือถือก่อนออกเดินทาง",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "ล่องเรือชมพระอาทิตย์ตกอ่าวโตเกียว",
    ctaLabel: "ดูล่องเรือชมพระอาทิตย์ตก →",
    url: SUNSET_URL,
    why: "เรือออกตามเวลาพระอาทิตย์ตก ผ่านสะพานเรนโบว์และริมน้ำโอไดบะ ตรงกับบ่ายที่เล่น Joypolis ด้วย Evening Passport",
  },
  {
    label: "ล่องเรือดินเนอร์อ่าวโตเกียวบนเรือ Symphony",
    ctaLabel: "ดูล่องเรือดินเนอร์ Symphony →",
    url: klookFor(tokyoBayDinnerCruiseSymphony.url, LOCALE),
    why: "ค่ำคืนเดียวกันแบบมีอาหาร ล่องเรือพร้อมอาหารฟูลคอร์ส 2 ชั่วโมง 30 นาที จากท่าเรือฮิโนเดะ วนรอบสะพานเรนโบว์",
  },
  {
    label: "รถบัสชมเมืองโตเกียวแบบเปิดหลังคา (Skyhop Bus)",
    ctaLabel: "ดูตั๋วรถบัสเปิดหลังคา →",
    url: klookFor(skyhopHopOnHopOffBus.url, LOCALE),
    why: "เส้นทางมีทั้งอาซากุสะ รปปงงิ–ชิบุยะ และโอไดบะ ใช้ได้ทั้งขาไปเกาะและเวลาที่เหลือรอบ ๆ",
  },
  {
    label: "โรงแรมรอบสถานีโตเกียว / มารุโนอุจิ",
    ctaLabel: "ดูราคาโรงแรมบน Klook →",
    url: klookFor(tokyoAirportStayAreas[0].url, LOCALE),
    why: "รถบัสลีมูซีนจากทั้งสองสนามบินและ N'EX จากนาริตะจอดที่นี่ จึงเป็นที่พักที่ง่ายที่สุดถ้าวันเที่ยวโอไดบะอยู่ช่วงต้นทริป",
  },
];

const tourPicks = [
  withKlookLocale(tokyoBaySunsetBoatCruise, LOCALE, {
    title: "ล่องเรือเล็กอ่าวโตเกียว ช่วงกลางวันและพระอาทิตย์ตก",
    desc: "ล่องเรือเล็ก 1 ชั่วโมงจากชิบาอุระ มีไกด์บนเรือ เป็นแบบไม่มีอาหารเย็น",
  }),
  withKlookLocale(tokyoBayYakatabuneDinnerShow, LOCALE, {
    title: "ล่องเรือยากาตะบุเนะพร้อมดินเนอร์และการแสดง อ่าวโตเกียว",
    desc: "เรือบ้านแบบดั้งเดิม 1 ชั่วโมง 30 นาที มีสุกี้ยากี้ เครื่องดื่มซอฟต์ดริงก์ไม่อั้น และขึ้นดาดฟ้าได้นอกชายฝั่งโอไดบะ",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "ทัวร์รถบัสชมเมืองโตเกียว 1 วัน",
    desc: "ทัวร์มีไกด์ชมสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมเสียงบรรยายหลายภาษา",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว Tokyo Joypolis" }];

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

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>
    {label}
  </a>
);

export default function ThTokyoJoypolisTicketsPage({ updated }: { updated: PageUpdated }) {
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
            Tokyo Joypolis (โตเกียวจอยโพลิส) สวนสนุกในร่มของ SEGA อยู่ชั้น 3 ขึ้นไปของอาคารในโอไดบะ ห่างสถานี Yurikamome 2 นาที ตั๋วแต่ละแบบราคาเท่าไร Passport คุ้มตั้งแต่เครื่องเล่นที่เท่าไร และจัดเข้าวันเที่ยวโอไดบะอย่างไร
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ ระบุวันที่ตรวจสอบ", "จุดคุ้มทุนของ Passport"].map((t) => (
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
            ตั๋ว Tokyo Joypolis สำหรับผู้ใหญ่ ค่าเข้าอย่างเดียว ¥1,700 และ Joypolis Passport ที่เล่นได้ทุกเครื่อง ¥6,000 (นักเรียน ¥1,400 และ ¥5,000) ถ้ามีแค่ตั๋วเข้า เครื่องเล่นราคาครั้งละ ¥700–¥1,000 Passport จึงคุ้มตั้งแต่ประมาณเครื่องที่ 5 มีราคาช่วงเย็นด้วย Evening Passport ราคา ¥5,000 ตั้งแต่ 15:00 (16:00 ในวันที่ปิด 22:00) และตั๋ว CHOI-NORI-NIGHT เล่น 2 ครั้ง ราคา ¥3,100 ตั้งแต่ 17:00 เผื่อเวลา 2 ถึง 4 ชั่วโมง นั่งสาย Yurikamome ไปสถานีโอไดบะไคฮินโคเอ็น (เดิน 2 นาที ประมาณ 13 นาทีจากชิมบาชิ) หรือสาย Rinkai ไปสถานีโตเกียวเทเลพอร์ต (เดิน 5 นาที) ราคาและการเดินทางจาก tokyo-joypolis.com เมื่อ {CHECKED}
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>คำตอบสั้น ๆ</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ตั๋วเข้าอย่างเดียว</p>
                <p className={styles.verdictStatValue}>ผู้ใหญ่ ¥1,700 / นักเรียน ¥1,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Passport (เล่นทุกเครื่อง)</p>
                <p className={styles.verdictStatValue}>ผู้ใหญ่ ¥6,000 / นักเรียน ¥5,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาที่ควรเผื่อ</p>
                <p className={styles.verdictStatValue}>2–4 ชั่วโมง เข้าได้ถึง 45 นาทีก่อนปิด</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การเดินทาง</p>
                <p className={styles.verdictStatValue}>2 นาทีจากสถานีโอไดบะไคฮินโคเอ็น</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ตั๋ว Tokyo Joypolis มีสี่แบบ ตั๋วเข้าอย่างเดียว ผู้ใหญ่ ¥1,700 นักเรียน ¥1,400 Passport ซึ่งเพิ่มการเล่นไม่จำกัด ¥6,000 และ ¥5,000 Evening Passport ที่ขายตั้งแต่ 15:00 ราคา ¥5,000 และ ¥4,000 และตั๋วกลางคืน 2 ครั้งตั้งแต่ 17:00 ราคา ¥3,100 สำหรับทุกคน ไม่มีตั๋วระบุวันและไม่มีอะไรขายหมด จึงควรซื้อตั๋วที่เหมาะ ไม่ใช่ซื้อให้เร็วที่สุด และดูตารางส่วนสูงด้านล่างก่อน เพราะ 13 จาก 21 เครื่องเล่นมีเกณฑ์ส่วนสูงขั้นต่ำ และสองเครื่องเล่นหลักต้องสูง 130 ซม. ราคาจาก tokyo-joypolis.com เมื่อ {CHECKED}
            </p>
            <KlookLink
              href={PASSPORT_URL}
              target="_blank"
              rel={KLOOK_REL}
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              ดู Joypolis Passport บน Klook →
            </KlookLink>
          </div>
        </div>

        <KlookSameDayCards
          heading="จองส่วนที่เหลือของวันเที่ยวโอไดบะ: teamLab Planets ที่พักริมอ่าว และอินเทอร์เน็ตมือถือ"
          cards={sameDayCards}
          footnote={
            <>
              รอบเข้าชมและราคา ดู{" "}
              <Link href="/th/guides/attractions/teamlab-planets-tickets">คู่มือตั๋ว teamLab Planets</Link>
            </>
          }
        />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>Tokyo Joypolis คืออะไร?</h2>
          <p className={styles.bodyText}>
            Tokyo Joypolis คือสวนสนุกในร่มของ SEGA อยู่ชั้น 3 ถึง 5 ของศูนย์การค้า DECKS Tokyo Beach เลขที่ 1-6-1 Daiba ในโอไดบะ ไม่ใช่ธีมพาร์กแบบดิสนีย์และก็ไม่ได้ตั้งใจจะเป็น มีเครื่องเล่น 21 อย่าง ได้แก่ รถไฟเหาะในร่ม เครื่องจำลอง Halfpipe ห้องสยองขวัญและไขปริศนาแบบเดินชมหลายห้อง และประสบการณ์จากผลงานลิขสิทธิ์อีกจำนวนหนึ่ง ทั้งหมดอยู่เหนือชั้นเกมอาร์เคดใต้หลังคาเดียวกัน
          </p>
          <p className={styles.bodyText}>
            จึงมีประโยชน์ในแบบที่ชัดเจน อยู่ในร่มทั้งหมด เดินจากสถานี 2 นาที ไม่ต้องจองล่วงหน้า และใช้เวลา 2 ถึง 4 ชั่วโมงแทนทั้งวัน สำหรับบ่ายวันฝนตก กลุ่มวัยรุ่น หรือครึ่งหลังของวันเที่ยวโอไดบะ ที่นี่เป็นหนึ่งในที่ที่เพิ่มเข้าแผนได้ง่ายที่สุดในโตเกียว สิ่งที่ต้องตัดสินใจให้ถูกคือจะซื้อตั๋วแบบไหนในสี่แบบ และทุกคนในกลุ่มผ่านเกณฑ์ส่วนสูงหรือไม่
          </p>
          <p className={styles.bodyText}>
            ถ้ากลุ่มของคุณอยากดูโชว์และพบตัวละครมากกว่าเล่นเครื่องเล่น สวนสนุกในร่มขนาดใหญ่อีกแห่งของโตเกียวคือ Sanrio Puroland ที่ทามะเซ็นเตอร์ ต่างจาก Joypolis ตรงที่ขาย Passport ระบุวันและต้องจองเวลาเข้าด้วย ก่อนเลือกวันให้อ่าน{" "}
            <Link href="/guides/attractions/sanrio-puroland-tickets" hrefLang="en" style={linkStyle}>
              คู่มือตั๋ว Sanrio Puroland (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>Tokyo Joypolis Passport ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้ใหญ่ ¥6,000 นักเรียน ¥5,000 หรือ Evening Passport ตั้งแต่ 15:00 ราคา ¥5,000 และ ¥4,000 ตั๋ว Tokyo Joypolis ทุกแบบอยู่ด้านล่าง แถวแรกคือจำนวนเครื่องเล่นที่ Passport เริ่มคุ้ม &ldquo;นักเรียน&rdquo; เป็นประเภทของสวนสนุกเอง (นักเรียนประถม มัธยมต้น และมัธยมปลาย) และ &ldquo;ผู้ใหญ่&rdquo; คืออายุ 18 ปีขึ้นไป
          </p>
          <Table
            head={["ตั๋ว", "ผู้ใหญ่ (18 ปีขึ้นไป)", "นักเรียน", "คืออะไร"]}
            rows={priceRows.map((r) => [r.ticket, r.adult, r.child, r.what])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} แหล่งข้อมูลทางการ:{" "}
            {OFFICIAL.map((o, i) => (
              <span key={o.href}>
                {ext(o.href, o.label)}
                {i < OFFICIAL.length - 1 ? ", " : " "}
              </span>
            ))}
            แถวจุดคุ้มทุนคำนวณจากราคาเหล่านี้ Passport ลบค่าเข้าเท่ากับ ¥4,300 สำหรับผู้ใหญ่และ ¥3,600 สำหรับนักเรียน จึงคุ้มตั้งแต่เครื่องที่ 5 (นักเรียนเครื่องที่ 4) ถ้าเลือกเครื่องละ ¥1,000 หรือเครื่องที่ 7 (เครื่องที่ 6) ถ้าเลือกเครื่องละ ¥700 ราคาอาจเปลี่ยนแปลง ตรวจสอบอีกครั้งเมื่อซื้อ และสวนสนุกไม่คืนเงินค่าตั๋ว ผู้ที่เข้าฟรีมีสี่กลุ่ม เด็กก่อนวัยเรียนที่สูงไม่ถึง 110 ซม. ผู้ที่อายุ 60 ปีขึ้นไปพร้อมหลักฐานอายุ ผู้ตั้งครรภ์ที่แสดงสมุดสุขภาพแม่และเด็ก และผู้ถือบัตรผู้พิการพร้อมผู้ติดตามไม่เกิน 2 คน ค่าเข้าสถานที่อื่นทั่วญี่ปุ่นพร้อมวันที่ตรวจสอบ ดู{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>เลือกตั๋ว</span>
          <h2 className={styles.sectionTitle}>Tokyo Joypolis คุ้มไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            คุ้ม ถ้าคุณจะเล่น 5 เครื่องขึ้นไปและทุกคนผ่านเกณฑ์ส่วนสูง ถ้าเล่นแค่สองสามเครื่อง ตั๋วเข้าบวกค่าเล่นเป็นครั้งถูกกว่า ตั๋วรายวันสี่แบบเหมาะกับใคร:
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Joypolis Passport บน Klook →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              สินค้าตั๋วเข้าแบบพื้นฐาน →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เกณฑ์ส่วนสูง</span>
          <h2 className={styles.sectionTitle}>เครื่องเล่นไหนมีข้อจำกัดส่วนสูง?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            13 จาก 21 เครื่องเล่นมีเกณฑ์ส่วนสูงขั้นต่ำ และ 2 เครื่องมีเกณฑ์สูงสุดด้วย ตารางนี้ต้องอ่านก่อนซื้อ Passport นักเรียน ¥5,000 ให้เด็กที่สูง 105 ซม. และเป็นเหตุผลที่ควรดูเกณฑ์เข้าฟรี 110 ซม. อีกครั้ง เพราะเป็นเกณฑ์ขั้นต่ำที่พบบ่อยที่สุดในสวนสนุกด้วย
          </p>
          <Table head={["ส่วนสูง", "เครื่องเล่น", "หมายความว่า"]} rows={heightRows.map((r) => [r.limit, r.rides, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            ทุกเกณฑ์ด้านบนจากหน้าเครื่องเล่นแต่ละหน้าที่ tokyo-joypolis.com เมื่อ {CHECKED} เครื่องเล่นคอลแลบมีมาแล้วก็ไป ถ้าไปเพราะเครื่องเล่นใดเครื่องหนึ่ง ให้ดูรายชื่อเครื่องเล่นของวันที่คุณไป
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ผู้ใหญ่</span>
          <h2 className={styles.sectionTitle}>Joypolis เหมาะกับผู้ใหญ่ไหม?</h2>
          <p className={styles.bodyText}>
            เหมาะ สองเครื่องเล่นที่สวนสนุกมีชื่อเสียง Gekion Live Coaster และ Halfpipe Tokyo ต้องสูง 130 ซม. และ Storm-G รับ 140 ถึง 200 ซม. เครื่องเล่นอื่นก็ไปในทางเดียวกัน ทั้งเกมยิงอย่าง House of the Dead และ LASER SHOOTING ISSEN บ้านผีซาดาโกะแบบเดินชม และ MURDER LODGE เครื่องเล่นสยองขวัญเสียง 3D ที่ไม่รับเด็กอายุต่ำกว่า 7 ปี Passport ผู้ใหญ่ราคา ¥6,000 ผู้ที่อายุ 60 ปีขึ้นไปเข้าฟรีเมื่อแสดงหลักฐานอายุ และซื้อ Passport ได้ในราคาในสวนสนุก ¥4,300 ข้อมูลจาก tokyo-joypolis.com เมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เวลาเปิดและการเดินทาง</span>
          <h2 className={styles.sectionTitle}>ไป Tokyo Joypolis อย่างไร?</h2>
          <p className={styles.bodyText}>
            นั่งสาย Yurikamome ไปสถานีโอไดบะไคฮินโคเอ็น เดิน 2 นาที หรือสาย Rinkai ไปสถานีโตเกียวเทเลพอร์ต เดิน 5 นาที เส้นทางทั้งหมดอยู่ท้ายหัวข้อนี้
          </p>
          <h2 className={styles.sectionTitle}>ต้องใช้เวลาที่ Joypolis นานแค่ไหน?</h2>
          <p className={styles.bodyText}>
            เผื่อไว้ 2 ถึง 4 ชั่วโมงตามที่หน้าสินค้า Klook แนะนำ และไปถึงอย่างน้อย 90 นาทีก่อนปิด Joypolis ไม่ประกาศเวลาเปิดแบบตายตัว เว็บไซต์ทางการใช้ปฏิทินประกาศเวลาเป็นช่วง ๆ และระบุชัดว่าอาจเปลี่ยนโดยไม่แจ้งล่วงหน้า วิธีที่ตรงที่สุดจึงเป็นการเช็กวันที่ของคุณเอง แทนการเชื่อตัวเลขบนเว็บไซต์อื่น รวมถึงหน้านี้ กฎสองข้อใช้ทุกวัน <strong>เข้าได้ถึง 45 นาทีก่อนปิด</strong> และกลับเข้าได้ถึง 45 นาทีก่อนปิดเช่นกัน โดยหน้าภาษาอังกฤษของทางการระบุว่าผู้ถือบัตร Joypolis กลับเข้าได้ไม่จำกัดในวันที่ออกบัตร
          </p>
          <p className={styles.bodyText}>
            เวลาปิดยังเป็นตัวกำหนดตั๋วเย็นด้วย วันปกติ Evening Passport เริ่มขาย 15:00 และตั๋วกลางคืน 2 ครั้งเริ่ม 17:00 ในวันที่ปิด 22:00 จะเลื่อนเป็น 16:00 และ 18:00 ถ้าวางแผนใช้ตั๋วเย็น ให้ดูปฏิทินเป็นอย่างแรก
          </p>
          <p className={styles.bodyText}>
            การเดินทางไม่ยาก หน้าการเดินทางของผู้ให้บริการระบุสาย Yurikamome ไปสถานีโอไดบะไคฮินโคเอ็น เดินประมาณ 2 นาที หรือสาย Rinkai ไปสถานีโตเกียวเทเลพอร์ต ประมาณ 5 นาที จากชิมบาชิถึงโอไดบะไคฮินโคเอ็นประมาณ 13 นาที จากสถานีโตเกียวผ่านชิมบาชิประมาณ 23 นาที จากโทโยสุประมาณ 18 นาที ส่วนชิบุยะ ชินจูกุ และอิเคบุกุโระ ประมาณ 18, 23 และ 29 นาทีด้วยสาย Rinkai ผู้ให้บริการขอให้ใช้ขนส่งสาธารณะ ทั้งหมดตรวจสอบเมื่อ {CHECKED}{" "}
            <Link href="/guides/transport/tokyo-transportation" hrefLang="en" style={linkStyle}>
              คู่มือการเดินทางในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายการใช้สาย Yurikamome และ Rinkai กับบัตร IC และพาส และควรรู้ว่า{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" hrefLang="en" style={linkStyle}>
              Tokyo Subway Ticket (ภาษาอังกฤษ)
            </Link>{" "}
            ใช้กับทั้งสองสายไม่ได้
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจองตั๋ว Tokyo Joypolis</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู Passport บน Klook →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="จองตั๋ว Joypolis แล้ว? เตรียมอินเทอร์เน็ตมือถือก่อนเดินทาง" />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>วันเที่ยวโอไดบะ</span>
          <h2 className={styles.sectionTitle}>เที่ยว teamLab Planets และ Joypolis ในวันเดียวได้ไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ได้ ทั้งสองแห่งอยู่บนสาย Yurikamome ช่วงเช้าไป Planets ตั้งแต่ 15:00 เล่น Joypolis ด้วย Evening Passport และหลังมืดไปริมน้ำโอไดบะ มีเพียง Planets ที่ต้องจองรอบเข้าชม
          </p>
          <Table head={["เวลา", "ทำอะไร", "ตั๋ว"]} rows={comboRows.map((r) => [r.when, r.what, r.ticket])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} แหล่งข้อมูลทางการ: {ext("https://tokyo-joypolis.com/ticket/", "ตั๋ว Tokyo Joypolis")},{" "}
            {ext("https://www.teamlab.art/e/planets/", "เวลาเปิดและการเดินทาง teamLab Planets")} และ{" "}
            {ext("https://teamlabplanets.dmm.com/en", "เว็บไซต์จำหน่ายบัตรอย่างเป็นทางการ")},{" "}
            {ext("https://www.tptc.co.jp/park/01_02", "สวนสาธารณะโอไดบะไคฮิน")} ราคาผู้ใหญ่ของ teamLab เปลี่ยนตามวันและรอบ เรื่องเรือ ดู{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" hrefLang="en" style={linkStyle}>
              คู่มือล่องเรืออ่าวโตเกียว (ภาษาอังกฤษ)
            </Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Joypolis Passport บน Klook →
            </KlookLink>
            <KlookLink href={SUNSET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ล่องเรือชมพระอาทิตย์ตกอ่าวโตเกียว →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ส่วนที่เหลือของวัน</span>
          <h2 className={styles.sectionTitle}>วันนั้นทำอะไรที่โอไดบะได้อีก?</h2>
          <p className={styles.bodyText}>
            อยู่ข้างใน 2 ถึง 4 ชั่วโมงยังเหลือเวลาเกือบทั้งวัน และกฎกลับเข้าใหม่ทำให้ Joypolis เป็นแค่ช่วงหนึ่งของวัน ไม่ต้องอยู่ทั้งวัน ที่เข้ากันที่สุดคือทะเล ล่องเรืออ่าวโตเกียวออกจากริมน้ำโอไดบะและท่าเรือฮิโนเดะที่อยู่ไม่ไกล และรอบเย็นตรงกับ Evening Passport ที่ซื้อตอน 15:00 พอดี{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" hrefLang="en" style={linkStyle}>
              คู่มือล่องเรืออ่าวโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            แยกเรือสองแบบที่ต่างกันมากแต่ขายภายใต้คำค้นเดียวกัน พร้อมเวลาออกเรือและราคาทางการ
          </p>
          <p className={styles.bodyText}>
            มีเรื่องหนึ่งที่ควรแก้ไข เพราะยังทำให้คนไปผิดฝั่งของเมือง <strong>teamLab Borderless ไม่ได้อยู่ที่โอไดบะแล้ว</strong> ปิดที่โอไดบะและเปิดใหม่ที่อาซาบุไดฮิลส์ วันที่ไปทั้ง Joypolis และ teamLab จึงเป็นสองย่านและนั่งรถไฟสองต่อ{" "}
            <Link href="/th/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>
              คู่มือตั๋ว teamLab Borderless
            </Link>{" "}
            มีที่ตั้งปัจจุบัน รอบเข้าชม และราคา teamLab อีกแห่งในโตเกียวคือ Planets อยู่บนสาย Yurikamome ที่คุณนั่งไปโอไดบะ เดิน 3 นาทีจากทางออก 1A สถานีชินโทโยสุ ตามข้อมูลของ teamLab และ{" "}
            <Link href="/th/guides/attractions/teamlab-planets-tickets" style={linkStyle}>
              คู่มือตั๋ว teamLab Planets
            </Link>{" "}
            มีรอบเข้าชมและเว็บไซต์จำหน่ายบัตรอย่างเป็นทางการ ในทำนองเดียวกัน Madame Tussauds Tokyo ซึ่งอยู่ในอาคาร DECKS เดียวกับ Joypolis และมักขายเป็นตั๋วคอมโบด้วยกัน ระบุบนเว็บไซต์ของตัวเองว่าปิดให้บริการเมื่อ 30 กันยายน 2026 ตั๋วคอมโบนั้นจึงไม่มีแล้ว
          </p>
          <p className={styles.bodyText}>
            ถ้าจะใส่ Joypolis ในทริปสั้น{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" hrefLang="en" style={linkStyle}>
              แผนเที่ยวโตเกียว 3 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            แสดงว่าบ่ายริมน้ำอยู่ตรงไหนโดยไม่เบียดสองที่ที่ต้องจองรอบจริง ๆ และ{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" hrefLang="en" style={linkStyle}>
              สิ่งที่ต้องทำในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            แบ่งสถานที่ในโตเกียวเป็นที่ต้องจองหลายสัปดาห์ล่วงหน้า กับที่เดินเข้าได้เลย Joypolis อยู่ในกลุ่มหลังอย่างชัดเจน
          </p>
        </section>

        <KlookTripPrep
          label="จองสำหรับวันเดียวกัน"
          heading="วันเที่ยวโอไดบะ มีอะไรน่าจองอีกบ้าง?"
          intro="อยู่ข้างใน 2 ถึง 4 ชั่วโมงยังเหลือช่วงเย็นว่าง และทะเลคือทางเลือกที่ชัดที่สุด"
          items={tripPrepItems}
        />

        <EsimCtaBottom />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="ตั๋ว Tokyo Joypolis: คำถามที่พบบ่อย" />

        <KlookTourPicks
          heading="ส่วนที่เหลือของวันเที่ยวโอไดบะ"
          intro="ล่องเรืออ่าวโตเกียวสองรายการที่ออกจากฝั่งโอไดบะและฮิโนเดะ และทัวร์รถบัสชมเมือง สำหรับช่วงก่อนและหลัง Joypolis ราคา Klook เปลี่ยนตามวัน เปิดหน้าสินค้าเพื่อดูราคาและจุดขึ้นเรือในวันที่คุณไป"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/legoland-japan-tickets", title: "ตั๋ว LEGOLAND Japan (2026): ราคา เวลาเปิด คุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "ตั๋ว Ghibli Park (2026): ราคา วันเปิดขาย และวิธีซื้อจากต่างประเทศ (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/teamlab-planets-tickets", title: "ตั๋ว teamLab Planets: ราคา เวลาเปิด และวิธีจอง" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "ล่องเรืออ่าวโตเกียว (2026): ยากาตะบุเนะกับ Symphony เวลาและราคา (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/teamlab-borderless-tickets", title: "ตั๋ว teamLab Borderless: ราคา วิธีจอง และรอบเข้าชม" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "ตั๋ว Sanrio Puroland 2026: ราคาและการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "ตั๋ว Fuji-Q Highland (2026): ราคา Free Pass และการเดินทาง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "แผนเที่ยวโตเกียว 3 วัน (2026): จองอะไร ตามลำดับไหน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "สิ่งที่ต้องทำในโตเกียว (2026): จองล่วงหน้าหรือเดินเข้าได้เลย (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 หรือ 72 ชั่วโมง (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-transportation", title: "การเดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>ซื้อตั๋วที่เหมาะ ไม่ใช่ตั๋วแรกที่เห็น</h2>
            <p className={styles.ctaBannerDesc}>
              ที่นี่ไม่มีตั๋วระบุวันและไม่มีอะไรขายหมด คำถามเดียวคือจะซื้อสินค้าแบบไหนในสี่แบบ หน้าสินค้า Klook จ่ายเงินผ่านหน้าภาษาไทยได้ รับบัตรต่างประเทศ และให้ QR code สำหรับทางเข้า ก่อนจ่ายเงินให้ตรวจสอบเงื่อนไขการยกเลิกที่แสดงสำหรับวันที่คุณเลือก
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดู Joypolis Passport บน Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
