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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  dotonboriDaytimeFoodTour,
  jrPassWholeJapan,
  kantoKansaiLuggageDelivery,
  klookEsim,
  luggageDeliveryCards,
  osakaAmazingPass,
  osakaArrivalShinkansenPrep,
  shinkansenTokyoOsaka,
  tokyoOsakaArrivalPrep,
  tokyoOsakaArrivalStayAreas,
  tokyoOsakaFareTablePrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { PRICES } from "../../../../lib/attraction-prices";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/tokyo-to-osaka-shinkansen) section by section as of
// 2026-11-27 (task jtk-20261127-TR02): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: ชินคันเซ็น โตเกียว โอซาก้า — the route as Thai results write it (ekitan.com/th
// "อัตราค่าโดยสารและวิธีการจองตั๋วรถไฟชินคันเซ็น…", nomadotravel.app/th "โตเกียวไปโอซาก้า: เทียบชินคันเซ็น").
// Thai paragraphs are kept on one JSX line each so no line break turns into a space mid-phrase.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/transport/tokyo-to-osaka-shinkansen";
const TITLE = "ชินคันเซ็น โตเกียว โอซาก้า 2026: ราคา";
const H1 = "ชินคันเซ็น โตเกียว โอซาก้า 2026: ราคา เวลาเดินทาง และวิธีจองตั๋ว";
const DESC =
  "ชินคันเซ็น โตเกียว โอซาก้า: โนโซมิที่นั่งจอง ¥14,720 ไม่จอง ¥13,870 เร็วสุด 2 ชม. 21 นาที";

const OWN_ISO = "2026-11-21";
const OWN = dateLabel(OWN_ISO, LOCALE);
const EARLIER = dateLabel("2026-11-04", LOCALE);

const WINDOW_NOZOMI = "¥14,720";
const WINDOW_HIKARI = "¥14,400";
const SMART_NOZOMI = "¥14,520";
const SMART_HIKARI = "¥14,200";
const NON_RESERVED = "¥13,870";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_ONLINE = "¥50,000";
const JR_PASS_ORDER = "¥53,000";

const SHINKANSEN_URL = klookFor(shinkansenTokyoOsaka.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const LUGGAGE_URL = klookFor(kantoKansaiLuggageDelivery.url, LOCALE);
const AMAZING_PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const FOOD_TOUR_URL = klookFor(dotonboriDaytimeFoodTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

/** Only the periods still ahead on the date this page was checked. */
const nozomiAllReservedPeriods = [
  "21–23 พฤศจิกายน 2026",
  "25 ธันวาคม 2026 – 5 มกราคม 2027",
  "9–11 มกราคม 2027",
  "20–22 มีนาคม 2027",
];

const fareRows = [
  {
    train: "โนโซมิ (Nozomi): เร็วที่สุด ขบวนที่ควรจอง",
    time: "เร็วสุด 2 ชม. 21 นาที ปกติ 2 ชม. 27 นาที",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_NOZOMI} (smartEX ${SMART_NOZOMI})`,
    green: "¥19,590 (smartEX ¥19,390)",
    pass: `ไม่ได้ ต้องซื้อตั๋ว ${NOZOMI_TICKET} เพิ่ม`,
  },
  {
    train: "ฮิคาริ (Hikari): ขบวนที่ใช้ JR Pass ได้",
    time: "2 ชม. 48 นาที ถึง 3 ชม. 6 นาที",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI} (smartEX ${SMART_HIKARI})`,
    green: "¥19,270 (smartEX ¥19,070)",
    pass: "ได้",
  },
  {
    train: "โคดามะ (Kodama) จอดทุกสถานี",
    time: "3 ชม. 42 นาที ถึง 3 ชม. 54 นาที",
    nonReserved: NON_RESERVED,
    reserved: `${WINDOW_HIKARI} (smartEX ${SMART_HIKARI})`,
    green: "¥19,270 (smartEX ¥19,070)",
    pass: "ได้",
  },
];

const frequencyRows = [
  {
    item: "โนโซมิ โตเกียว → ชินโอซาก้า",
    value: "160 ขบวน 2 ชม. 21 นาที – 2 ชม. 30 นาที",
    detail: "โนโซมิทุกขบวนที่ออกจากโตเกียวและวิ่งถึงชินโอซาก้าในวันที่ 21 พ.ย. 2026 เวลาเดินทางปกติ (ค่ามัธยฐาน) 2 ชม. 27 นาที ไม่ต้องเปลี่ยนขบวน",
    source: "ข้อมูลตารางเดินรถของ JR Central",
  },
  {
    item: "โนโซมิขบวนแรกและขบวนสุดท้าย",
    value: "06:00 และ 21:24 น.",
    detail: "เวลาออกจากโตเกียววันที่ 21 พ.ย. 2026 ตารางเดินรถวันหยุดจะเปลี่ยนเวลาขบวนสุดท้าย จึงควรตรวจสอบวันที่คุณเดินทาง",
    source: "ข้อมูลตารางเดินรถของ JR Central",
  },
  {
    item: "ฮิคาริและโคดามะ",
    value: "28 และ 11 ขบวน",
    detail: "ในวันเดียวกัน ฮิคาริใช้เวลา 2 ชม. 48 นาที ถึง 3 ชม. 6 นาที และโคดามะ 3 ชม. 42 นาที ถึง 3 ชม. 54 นาที ซึ่งเป็นขบวนที่ใช้ JR Pass ได้",
    source: "ข้อมูลตารางเดินรถของ JR Central",
  },
  {
    item: "ความถี่ทั้งสาย",
    value: "สูงสุด 18 ขบวนต่อชั่วโมง",
    detail: "ถ้าพลาดขบวน ส่วนใหญ่ก็ไม่ต้องรอนาน",
    source: "global.jr-central.co.jp",
  },
];

const passRows = [
  {
    item: "ไปกลับโตเกียว–โอซาก้า 1 รอบ",
    answer: "ซื้อตั๋วเที่ยวเดียว ไม่ต้องซื้อพาส",
    cost: `โนโซมิที่นั่งแบบจองใน smartEX 2 ใบ ¥29,040 เทียบกับพาส 7 วันที่ถูกที่สุด ${JR_PASS_ONLINE}`,
  },
  {
    item: "JR Pass ตู้ธรรมดา 7 วัน",
    answer: "ราคาตั้งแต่ 1 ตุลาคม 2026",
    cost: `${JR_PASS_ONLINE} บนเว็บไซต์ทางการ หรือ ${JR_PASS_ORDER} สำหรับ Exchange Order จากตัวแทนในต่างประเทศ`,
  },
  {
    item: "ฮิคาริและโคดามะ",
    answer: "ใช้พาสได้",
    cost: "ไม่ต้องจ่ายเพิ่มทั้งที่นั่งแบบจองและไม่จองในตู้ธรรมดา",
  },
  {
    item: "โนโซมิ",
    answer: "ใช้พาสอย่างเดียวไม่ได้",
    cost: `${NOZOMI_TICKET} ต่อเที่ยว โตเกียว–ชินโอซาก้า ราคาเดียวกันทั้งที่นั่งแบบจอง ไม่จอง และกรีนคาร์ (กรีนคาร์เฉพาะผู้ถือพาสกรีน)`,
  },
  {
    item: "เมื่อไรพาสจึงคุ้มค่า",
    answer: "เดินทางระยะไกล 4 ช่วงขึ้นไปใน 7 วัน",
    cost: "ที่ราคา smartEX ต้องนั่งโนโซมิเที่ยวเดียว 4 เที่ยวจึงเกิน ¥50,000 จึงต้องเพิ่มฮิโรชิมะ คานาซาวะ หรือโทโฮคุ",
  },
];

const bookingRows = [
  {
    route: "smartEX (เว็บไซต์และแอปของ JR): ตัวเลือกหลัก",
    price: `โนโซมิที่นั่งแบบจอง ${SMART_NOZOMI} ลด ¥200 ทุกที่นั่งแบบจอง`,
    when: "ตั้งแต่ 5:30 น. 1 ปีก่อนวันเดินทาง จนถึง 4 นาทีก่อนรถออก ที่นั่งจะยืนยันหลัง 8:00 น. 1 เดือนล่วงหน้า",
    cancel: "เปลี่ยนได้ฟรีไม่จำกัดครั้ง จนถึง 4 นาทีก่อนรถออก และภายใน 3 เดือนหลังซื้อ คืนเงินมีค่าธรรมเนียม ¥320",
  },
  {
    route: "หน้าเส้นทางรถไฟโตเกียว → โอซาก้าของ Klook",
    price: "แสดงตามวันที่ตอนชำระเงิน",
    when: "เลือกวันที่ ขบวน และประเภทที่นั่ง: ไม่จอง จอง หรือกรีนคาร์",
    cancel: "ตามเงื่อนไขของ Klook ที่แสดงก่อนชำระเงิน",
  },
  {
    route: "เครื่องขายตั๋วหรือห้องจำหน่ายตั๋วที่สถานี",
    price: `ราคาที่สถานี: โนโซมิ ${WINDOW_NOZOMI} ฮิคาริที่นั่งแบบจอง ${WINDOW_HIKARI}`,
    when: "ซื้อในวันเดินทางที่สถานีโตเกียว หรือที่นั่งแบบจองตั้งแต่ 10:00 น. 1 เดือนก่อนขบวนออกจากสถานีต้นทาง",
    cancel: `สอบถามที่ห้องจำหน่ายตั๋ว ที่นี่ยังเป็นที่ที่ผู้ถือ JR Pass ซื้อตั๋วโนโซมิ ${NOZOMI_TICKET}`,
  },
  {
    route: "JR Pass (ตู้ธรรมดา 7 วัน)",
    price: `ออนไลน์ ${JR_PASS_ONLINE} ตัวแทนในต่างประเทศ ${JR_PASS_ORDER} โนโซมิจ่ายเพิ่ม ${NOZOMI_TICKET} ต่อเที่ยว`,
    when: "จองที่นั่งฮิคาริและโคดามะด้วยพาสได้ฟรี ตั๋วโนโซมิขายที่สถานี JR ในญี่ปุ่นตั้งแต่ 1 เดือนก่อนวันเดินทาง",
    cancel: "คุ้มค่าเฉพาะเมื่อใน 7 วันเดียวกันมีฮิโรชิมะ คานาซาวะ หรือโทโฮคุด้วย ดูตาราง JR Pass ด้านบน",
  },
];

const altRows = [
  {
    option: "ชินคันเซ็น ที่นั่งแบบไม่จอง",
    time: "2 ชม. 21 นาที ถึง 3 ชม. 54 นาที ตามขบวน",
    cost: `${NON_RESERVED} ราคาเดียวกันทุกวันตลอดปี`,
    verdict: "ที่นั่งชินคันเซ็นที่ถูกที่สุด เลือกที่นั่งไม่ได้ ไม่มีที่นั่งสำหรับสัมภาระขนาดใหญ่ และช่วงไฮซีซันโนโซมิไม่มีตู้ที่นั่งแบบไม่จอง",
    source: `ตารางราคา smart-ex.jp, ${OWN}`,
  },
  {
    option: "ชินคันเซ็น ที่นั่งแบบจองใน smartEX",
    time: "เร็วสุด 2 ชม. 21 นาที",
    cost: `ฮิคาริ ${SMART_HIKARI} โนโซมิ ${SMART_NOZOMI}`,
    verdict: "ถูกกว่าราคาที่สถานี ¥200 ทุกที่นั่งแบบจอง smartEX ยังขายตั๋วจองล่วงหน้าราคาพิเศษที่มีจำนวนจำกัด ราคาดูได้ที่ smart-ex.jp",
    source: `smart-ex.jp และ JR Central, ${OWN}`,
  },
  {
    option: "รถบัสทางด่วนกลางคืน",
    time: "ประมาณ 8 ถึง 9 ชั่วโมง",
    cost: "ต่างกันตามวันที่ บริษัท และที่นั่ง ดูที่หน้ารายการ",
    verdict: "ค่าโดยสารต่ำที่สุด และประหยัดค่าโรงแรม 1 คืนถ้านอนบนรถบัสได้ ไม่เหมาะกับกระเป๋าเดินทางใบใหญ่",
    source: `kosokubus.com (เว็บไซต์จอง ไม่ใช่บริษัทผู้ให้บริการ), ${EARLIER}`,
  },
  {
    option: "เครื่องบิน ฮาเนดะ → อิตามิ หรือคันไซ",
    time: "ไม่ได้ระบุ",
    cost: "ต่างกันตามวันที่และสายการบิน",
    verdict: "หน้าเว็บทางการของ ANA และ JAL ไม่ได้ระบุเวลาบิน จึงไม่ได้ใส่ตัวเลขไว้ เมื่อเปรียบเทียบให้รวมการเดินทางไปและกลับจากสนามบินทั้งสองฝั่งด้วย",
    source: `ana.co.jp และ jal.co.jp, ${EARLIER}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ชินคันเซ็นโตเกียวไปโอซาก้าราคาเท่าไร?",
    a: `โนโซมิที่นั่งแบบจองตู้ธรรมดาเที่ยวเดียว ${WINDOW_NOZOMI} ที่สถานี หรือ ${SMART_NOZOMI} ใน smartEX ของ JR ส่วนฮิคาริและโคดามะที่นั่งแบบจอง ${WINDOW_HIKARI} (smartEX ${SMART_HIKARI}) และที่นั่งแบบไม่จองของทุกขบวนราคา ${NON_RESERVED} ทั้งหมดนี้เป็นราคาผู้ใหญ่ 1 คนในช่วงปกติ ที่นั่งแบบจองแพงขึ้น ¥200 ในช่วงไฮซีซัน ¥400 ในช่วงไฮซีซันสูงสุด และถูกลง ¥200 ในช่วงโลว์ซีซัน กรีนคาร์ของโนโซมิราคา ¥19,590 (smartEX ¥19,390) ตรวจสอบจากหน้าเว็บทางการของ JR Central และ smartEX เมื่อ ${OWN}`,
  },
  {
    q: "ชินคันเซ็นโตเกียวไปโอซาก้าใช้เวลากี่ชั่วโมง?",
    a: `จากสถานีโตเกียวถึงชินโอซาก้า โนโซมิเร็วสุด 2 ชั่วโมง 21 นาที และปกติ 2 ชั่วโมง 27 นาที ไม่ต้องเปลี่ยนขบวน ข้อมูลตารางเดินรถของ JR Central แสดงว่าในวันที่ 21 พ.ย. 2026 มีโนโซมิวิ่งเส้นทางนี้ 160 ขบวน ขบวนแรก 06:00 น. ขบวนสุดท้าย 21:24 น. ฮิคาริใช้เวลา 2 ชม. 48 นาที ถึง 3 ชม. 6 นาที และโคดามะที่จอดทุกสถานีใช้เวลา 3 ชม. 42 นาที ถึง 3 ชม. 54 นาที ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "ชินคันเซ็นโตเกียวไปโอซาก้าต้องจองล่วงหน้าไหม?",
    a: `ส่วนใหญ่ไม่ต้อง แต่บางวันต้องจอง วันปกติมีสูงสุด 18 ขบวนต่อชั่วโมง ตั๋วที่นั่งแบบไม่จอง (${NON_RESERVED}) จึงใช้ได้ ช่วงต่อไปนี้โนโซมิเป็นที่นั่งแบบจองทุกตู้: ${nozomiAllReservedPeriods.join(", ")} ในช่วงนั้นฮิคาริและโคดามะยังมีตู้ที่นั่งแบบไม่จอง แต่ JR เตือนว่าอาจแออัดมาก ควรจองเสมอถ้ามีกระเป๋าขนาด 161 ถึง 250 ซม. (ถ้าขึ้นรถโดยไม่มีที่นั่งสำหรับสัมภาระขนาดใหญ่ต้องจ่าย ¥1,000) มีเวลาต่อรถที่ต้องตรงเวลา หรืออยากได้ที่นั่งฝั่งภูเขาไฟฟูจิ ตรวจสอบจากเว็บไซต์ JR Central เมื่อ ${OWN}`,
  },
  {
    q: "ไปแค่โตเกียว–โอซาก้า JR Pass คุ้มไหม?",
    a: `ไม่คุ้มค่า โนโซมิที่นั่งแบบจองใน smartEX 2 ใบราคา ¥29,040 ขณะที่ JR Pass ตู้ธรรมดา 7 วันราคา ${JR_PASS_ONLINE} ออนไลน์ หรือ ${JR_PASS_ORDER} จากตัวแทนในต่างประเทศ (ราคาตั้งแต่ 1 ตุลาคม 2026) และพาสใช้กับโนโซมิไม่ได้ถ้าไม่ซื้อตั๋ว ${NOZOMI_TICKET} ทุกเที่ยว ซึ่งขายเฉพาะที่สถานี JR ในญี่ปุ่น พาสเริ่มคุ้มค่าเมื่อสัปดาห์เดียวกันไปถึงฮิโรชิมะ คานาซาวะ หรือโทโฮคุ ตรวจสอบจาก japanrailpass.net เมื่อ ${OWN}`,
  },
  {
    q: "นั่งฝั่งไหนจึงเห็นภูเขาไฟฟูจิจากโตเกียวไปโอซาก้า?",
    a: "ฝั่งขวาเมื่อเดินทางไปทางตะวันตก: ที่นั่ง E ในตู้ธรรมดา หรือที่นั่ง D ในกรีนคาร์ ซึ่งเป็นที่นั่งที่คู่มือของ JR Central ระบุไว้ ตู้ที่นั่งแบบไม่จองรับประกันที่นั่งเหล่านี้ไม่ได้ จึงควรจองที่นั่ง และ JR Central ระบุว่าอาจมองไม่เห็นภูเขาไฟฟูจิขึ้นอยู่กับสภาพอากาศ ตรวจสอบจาก global.jr-central.co.jp เมื่อ 21 พฤศจิกายน 2026",
  },
];

const topPrep = [
  withKlookLocale(osakaArrivalShinkansenPrep[0], LOCALE, {
    label: "โรงแรมย่านอุเมดะและสถานีโอซาก้า",
    ctaLabel: "ดูโรงแรมใกล้สถานีโอซาก้าบน Klook →",
    why: "อุเมดะอยู่ห่างจากชินโอซาก้าเพียง 2 สถานีบนสายมิโดสุจิ จากชานชาลาไปถึงห้องพักได้ในเวลาไม่นาน",
  }),
  withKlookLocale(osakaArrivalShinkansenPrep[1], LOCALE, {
    label: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    ctaLabel: "ดู Osaka Amazing Pass →",
    why: "ใช้รถไฟใต้ดิน Osaka Metro และรถเมล์ในเมืองได้ทันทีที่ออกจากชินโอซาก้า และใช้เข้าปราสาทโอซาก้ากับล่องเรือได้ในวันเดียวกัน",
  }),
  withKlookLocale(osakaArrivalShinkansenPrep[2], LOCALE, {
    label: "ตั๋วอิเล็กทรอนิกส์ Universal Studios Japan",
    ctaLabel: "ดูตั๋ว USJ →",
    why: "ถ้าไปโอซาก้าเพื่อ USJ: ตั๋วอิเล็กทรอนิกส์ระบุวันที่ สแกน QR code เข้าสวนได้ทันที ไม่ต้องต่อคิวซื้อตั๋วที่ประตู",
  }),
];

const fareTablePrep = [
  withKlookLocale(tokyoOsakaFareTablePrep[0], LOCALE, {
    label: "ทัวร์ 1 วัน ปราสาทโอซาก้า อุเมดะสกายบิลดิง และล่องเรือทมโบริ",
    ctaLabel: "ดูทัวร์ 1 วันในโอซาก้า →",
    why: "ปราสาทโอซาก้า จุดชมวิวอุเมดะ และล่องเรือทมโบริ รวมเป็นทัวร์พร้อมไกด์ 1 วัน เหมาะกับเช้าวันถัดจากวันที่มาถึง หรือวันที่นั่งโนโซมิเที่ยวเช้าออกจากโตเกียว",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[1], LOCALE, {
    label: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    ctaLabel: "ดู Osaka Amazing Pass →",
    why: "ใช้รถไฟใต้ดิน Osaka Metro และรถเมล์ในเมืองได้ทันทีที่ออกจากชินโอซาก้า และใช้เข้าปราสาทโอซาก้ากับล่องเรือได้ในวันเดียวกัน",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[2], LOCALE, {
    label: "โรงแรมใกล้ Universal Studios Japan (ยูนิเวอร์แซลซิตี้)",
    ctaLabel: "ดูโรงแรมย่านยูนิเวอร์แซลซิตี้บน Klook →",
    why: "ถ้าไปโอซาก้าเพื่อ USJ: ประตูสวนอยู่ห่างจากสถานียูนิเวอร์แซลซิตี้ประมาณ 5 นาทีเดิน จองห้องพักคืนเดียวกับที่นั่งรถไฟไปพร้อมกัน",
  }),
  withKlookLocale(tokyoOsakaFareTablePrep[3], LOCALE, {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดู Klook eSIM →",
    why: "การเปลี่ยนตั๋วใน smartEX ตั๋ว QR และประกาศรถล่าช้าล้วนส่งมาที่โทรศัพท์ จึงต้องมีอินเทอร์เน็ตมือถือก่อนถึงสถานีโตเกียว",
  }),
];

const arrivalPrep = [
  withKlookLocale(tokyoOsakaArrivalPrep[0], LOCALE, {
    label: "ทัวร์อาหารกลางวันย่านโดทงโบริ",
    ctaLabel: "ดูทัวร์อาหาร →",
    why: "ทัวร์ระบุเวลา 11:00 ถึง 14:00 น. ถ้าขึ้นรถไฟจากโตเกียวภายในประมาณ 08:00 น. ก็มาทันทัวร์ และยังมีเวลาช่วงบ่าย",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[1], LOCALE, {
    label: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    ctaLabel: "ดู Osaka Amazing Pass →",
    why: "ใช้รถไฟใต้ดิน Osaka Metro และรถเมล์ในเมืองได้ทันทีที่ออกจากชินโอซาก้า และใช้เข้าปราสาทโอซาก้ากับล่องเรือได้ในวันเดียวกัน",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[2], LOCALE, {
    label: "โรงแรมย่านอุเมดะและสถานีโอซาก้า",
    ctaLabel: "ดูโรงแรมใกล้สถานีโอซาก้าบน Klook →",
    why: "จองห้องพักพร้อมที่นั่ง ขบวนที่เลือกและที่พักคืนที่มาถึงจะได้ตกลงในครั้งเดียว",
  }),
  withKlookLocale(tokyoOsakaArrivalPrep[3], LOCALE, {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดู Klook eSIM →",
    why: "การเปลี่ยนที่นั่งใน smartEX หรือการดูประกาศรถล่าช้าทำบนโทรศัพท์ จึงต้องมีอินเทอร์เน็ตมือถือก่อนถึงสถานีโตเกียว",
  }),
  withKlookLocale(luggageDeliveryCards.tokyoToOsakaFlyHome, LOCALE, {
    label: "บริการส่งกระเป๋า (โรงแรมในโอซาก้าหรือเกียวโต ⇔ สนามบินคันไซ)",
    ctaLabel: "ดูบริการส่งกระเป๋าไปสนามบินคันไซ →",
    why: "ถ้าบินกลับจากคันไซ เช้าวันสุดท้ายก็ทำแบบเดียวกับวันนั่งรถไฟ: กระเป๋าออกจากโรงแรมในโอซาก้าหรือเกียวโตก่อน แล้วไปรอคุณที่สนามบินคันไซ",
    guide: { href: "/guides/transport/japan-luggage-delivery", label: "วิธีใช้บริการส่งกระเป๋า (ภาษาอังกฤษ)" },
  }),
];

const stayAreas = [
  withKlookLocale(tokyoOsakaArrivalStayAreas[0], LOCALE, {
    area: "อุเมดะ โอซาก้า",
    why: "ห่างจากชินโอซาก้า 2 สถานีบนสายมิโดสุจิ เชื่อมกับสถานีโอซาก้า และสะดวกกว่าถ้าขากลับจะนั่งรถไฟเช่นกัน",
  }),
  withKlookLocale(tokyoOsakaArrivalStayAreas[1], LOCALE, {
    area: "นัมบะ โอซาก้า",
    why: "นั่งสายมิโดสุจิขบวนเดิมจากชินโอซาก้ามาได้เลย เดินไปโดทงโบริได้ และเป็นสถานีต้นทางของรถไฟนันไกไปสนามบินคันไซ",
  }),
  withKlookLocale(tokyoOsakaArrivalStayAreas[2], LOCALE, {
    area: "เทนโนจิ โอซาก้า",
    why: "ปลายช่วงที่ใช้ประโยชน์ได้ของสายมิโดสุจิ และเป็นสถานีที่ JR Haruka จอดโดยตรงถ้าคุณบินออกจากคันไซ",
  }),
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, LOCALE, {
    title: "ทัวร์อาหารกลางวันย่านโดทงโบริ โอซาก้า",
    desc: "ทัวร์เดินแบบจอยกรุ๊ป 3 ชั่วโมง เวลา 11:00–14:00 น. สำหรับ 2 ถึง 10 คน มีคุชิคัตสึ ทาโกะยากิ ชุดอาหารกลางวันตามฤดูกาลที่อิซากายะ และของหวานท้องถิ่น",
  }),
  withKlookLocale(osakaAmazingPass, LOCALE, {
    title: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    desc: "พาสดิจิทัลสำหรับนั่ง Osaka Metro และรถเมล์ในเมืองแบบไม่จำกัดเที่ยว พร้อมเข้าชมสถานที่กว่า 40 แห่งฟรี",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ชินคันเซ็น โตเกียว โอซาก้า" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function LastChecked({ date, sources }: { date: string; sources: { label: string; href?: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>ตรวจสอบล่าสุด: {date}</strong>{" "}
      {sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 ? ", " : ""}
          {s.href ? (
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ) : (
            s.label
          )}
        </span>
      ))}
    </p>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
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
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : c === 1 ? styles.tdPrice : undefined}
                    style={{ fontSize: c === 0 ? "0.88rem" : "0.85rem" }}
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

export default function ThTokyoToOsakaShinkansenPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>ราคาที่นั่งแต่ละแบบบนโนโซมิ ฮิคาริ และโคดามะ ชินคันเซ็นใช้เวลานานเท่าไร JR Pass คุ้มค่าไหม และจองตั๋วได้ที่ไหน</p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการของ JR พร้อมวันที่ตรวจสอบ", "จุดคุ้มทุนของ JR Pass", "เทียบวิธีจองตั๋ว"].map((t) => (
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
            <strong>ชินคันเซ็น โตเกียว โอซาก้า</strong> ขบวนที่เร็วที่สุดคือโนโซมิ ใช้เวลา <strong>2 ชั่วโมง 21 นาที</strong> จากสถานีโตเกียวถึงชินโอซาก้า (ขบวนปกติ 2 ชั่วโมง 27 นาที) และในวันที่ 21 พฤศจิกายน 2026 มีโนโซมิวิ่งเส้นทางนี้ 160 ขบวน โนโซมิที่นั่งแบบจองราคาเที่ยวเดียว <strong>{WINDOW_NOZOMI}</strong> ที่สถานี หรือ {SMART_NOZOMI} ใน smartEX ของ JR ส่วนที่นั่งแบบไม่จองทุกขบวนราคา <strong>{NON_RESERVED}</strong> JR Pass ใช้กับฮิคาริได้ (ที่นั่งแบบจอง {WINDOW_HIKARI} ประมาณ 3 ชั่วโมง) แต่ใช้กับโนโซมิไม่ได้ถ้าไม่ซื้อตั๋ว {NOZOMI_TICKET} ดังนั้นถ้าไปกลับรอบเดียว ซื้อตั๋วเที่ยวเดียว 2 ใบจะถูกกว่า ราคาและเวลาเดินทางตรวจสอบจากหน้าเว็บทางการของ JR Central และ smartEX เมื่อ {OWN}
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>คำตอบสั้น ๆ</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ราคาโนโซมิที่นั่งแบบจอง</p>
                <p className={styles.verdictStatValue}>{WINDOW_NOZOMI} หรือ {SMART_NOZOMI} ใน smartEX</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาเร็วที่สุด</p>
                <p className={styles.verdictStatValue}>2 ชม. 21 นาที ไม่ต้องเปลี่ยนขบวน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ที่นั่งถูกที่สุด</p>
                <p className={styles.verdictStatValue}>ที่นั่งแบบไม่จอง {NON_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ใช้ JR Pass กับโนโซมิ</p>
                <p className={styles.verdictStatValue}>ต้องซื้อตั๋ว {NOZOMI_TICKET} เพิ่ม</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> จองโนโซมิที่นั่งแบบจองทั้งขาไปและขากลับ เว้นแต่สัปดาห์เดียวกันจะไปถึงฮิโรชิมะ คานาซาวะ หรือโทโฮคุด้วย ตั๋วเที่ยวเดียว 2 ใบใน smartEX ราคา ¥29,040 เทียบกับพาส 7 วันที่ถูกที่สุด {JR_PASS_ONLINE}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋วโตเกียว → โอซาก้าบน Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="จองพร้อมตั๋วรถไฟ"
          heading="สิ่งที่ควรจองในโอซาก้าพร้อมที่นั่งรถไฟ"
          intro="โนโซมิสิ้นสุดที่ชินโอซาก้า ที่พัก พาสในเมือง และตั๋วสวนสนุก เป็นส่วนของทริปเดียวกันที่ตัดสินใจได้ง่ายที่สุดตอนที่หน้าจองตั๋วรถไฟยังเปิดอยู่"
          items={topPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ชินคันเซ็นโตเกียวไปโอซาก้าราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            โนโซมิที่นั่งแบบจองเที่ยวเดียว {WINDOW_NOZOMI} หรือ {SMART_NOZOMI} ใน smartEX สำหรับผู้ใหญ่ 1 คนในช่วงปกติ ที่นั่งแบบไม่จองราคา {NON_RESERVED} ทั้ง 3 ขบวนและไม่เปลี่ยนตามฤดูกาล ส่วนที่นั่งแบบจองแพงขึ้น ¥200 ในช่วงไฮซีซัน ¥400 ในช่วงไฮซีซันสูงสุด และถูกลง ¥200 ในช่วงโลว์ซีซัน
          </p>
          <Table
            head={["ขบวน", "โตเกียว → ชินโอซาก้า", "ที่นั่งแบบไม่จอง", "ที่นั่งแบบจอง (สถานี / smartEX)", "กรีนคาร์", "ใช้ JR Pass ได้ไหม"]}
            rows={fareRows.map((r) => [r.train, r.time, r.nonReserved, r.reserved, r.green, r.pass])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "ประกาศของ JR Central และ JR West 16 ต.ค. 2026 (ราคาที่สถานี)", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "ราคาที่นั่งแบบจอง smartEX (PDF)", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf" },
              { label: "บริการ smartEX", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "ข้อมูลการเดินรถของ JR Central", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            เวลาเดินทางคือขบวนที่เร็วที่สุดและช้าที่สุดจากโตเกียวถึงชินโอซาก้าในวันที่ 21 พ.ย. 2026 จากข้อมูลตารางเดินรถของ JR Central ราคาที่สถานีของฮิคาริและกรีนคาร์คำนวณจากตารางค่าธรรมเนียมในประกาศของ JR Central และแต่ละรายการแพงกว่าราคา smartEX ¥200 หน้านี้ไม่ได้ใส่ราคาของ Klook เพราะราคาเปลี่ยนตามวันที่
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋วโตเกียว → โอซาก้าบน Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="วันเดียวกันในโอซาก้า"
          heading="สิ่งที่ควรจองสำหรับวันที่ถึงโอซาก้า"
          intro="ที่นั่งรถไฟเป็นเพียง 2 ชั่วโมงของวันนั้น 4 รายการนี้ช่วยจัดการส่วนที่เหลือก่อนออกจากโตเกียว: วันแรกพร้อมไกด์ พาสในเมือง ห้องพักใกล้ประตู USJ ถ้าตั้งใจไปสวนสนุก และอินเทอร์เน็ตมือถือ"
          items={fareTablePrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวลา</span>
          <h2 className={styles.sectionTitle}>ชินคันเซ็นโตเกียวไปโอซาก้าใช้เวลากี่ชั่วโมง?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            โนโซมิขบวนที่เร็วที่สุด 2 ชั่วโมง 21 นาที ขบวนปกติ 2 ชั่วโมง 27 นาที ไม่ต้องเปลี่ยนขบวน ฮิคาริใช้เวลา 2 ชม. 48 นาที ถึง 3 ชม. 6 นาที และโคดามะ 3 ชม. 42 นาที ถึง 3 ชม. 54 นาที เพราะจอดหลายสถานีกว่า โนโซมิที่ไปชินโอซาก้าออกจากโตเกียวตั้งแต่ 06:00 ถึง 21:24 น.
          </p>
          <Table
            head={["รายการ", "ตัวเลข", "หมายความว่า", "แหล่งข้อมูล"]}
            rows={frequencyRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "ข้อมูลการเดินรถของ JR Central (ตารางวันที่ 21 พ.ย. 2026)", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
              { label: "ชินคันเซ็นสายโทไกโดของ JR Central", href: "https://global.jr-central.co.jp/en/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            จำนวนขบวนเป็นข้อมูลของวันเสาร์ 1 วัน ตารางวันธรรมดาและวันหยุดต่างกัน ฝั่งที่เห็นภูเขาไฟฟูจิ กฎสัมภาระ และภาพรวมของระบบอยู่ใน <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>ไกด์ชินคันเซ็นสำหรับมือใหม่ (ภาษาอังกฤษ)</Link>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>ไปแค่โตเกียว–โอซาก้า JR Pass คุ้มไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ไม่คุ้มค่าสำหรับไปกลับรอบเดียว: โนโซมิที่นั่งแบบจองใน smartEX 2 ใบราคา ¥29,040 ส่วนพาส 7 วันที่ถูกที่สุดราคา {JR_PASS_ONLINE} พาสใช้กับฮิคาริและโคดามะได้ แต่นั่งโนโซมิทุกเที่ยวต้องซื้อตั๋ว {NOZOMI_TICKET} แยก ซึ่งขายเฉพาะที่สถานี JR ในญี่ปุ่น ตั้งแต่ 1 เดือนก่อนวันเดินทาง
          </p>
          <Table
            head={["คำถาม", "คำตอบ", "ค่าใช้จ่าย"]}
            rows={passRows.map((r) => [r.item, r.answer, r.cost])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "ราคาใน japanrailpass.net", href: "https://japanrailpass.net/en/purchase/price/" },
              { label: "ตั๋ว NOZOMI/MIZUHO ใน japanrailpass.net", href: "https://japanrailpass.net/en/use/special-ticket/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            พาสตู้ธรรมดา 14 และ 21 วันราคา ¥80,000 / ¥100,000 ออนไลน์ และ ¥84,000 / ¥105,000 จากตัวแทน <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>ไกด์ราคา JR Pass (ภาษาอังกฤษ)</Link> มีรายละเอียดการขึ้นราคาเดือนตุลาคม 2026 และคำนวณจุดคุ้มทุนตามเส้นทางของคุณ ถ้าจะไปทางอ้อมผ่านคานาซาวะ <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>Hokuriku Arch Pass (ภาษาอังกฤษ)</Link> ใช้เดินทางจากโตเกียวไปโอซาก้าด้วยชินคันเซ็นสายโฮคุริคุและรถไฟธันเดอร์เบิร์ดได้ 7 วัน แต่ใช้กับชินคันเซ็นสายโทไกโดไม่ได้
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 วัน) →
            </KlookLink>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              หรือตั๋วเที่ยวเดียวบน Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ทางเลือกที่ถูกกว่า</span>
          <h2 className={styles.sectionTitle}>มีวิธีเดินทางจากโตเกียวไปโอซาก้าที่ถูกกว่านี้ไหม?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            สำหรับชินคันเซ็น ที่นั่งแบบไม่จองราคา {NON_RESERVED} เป็นค่าโดยสารปกติที่ถูกที่สุด และ smartEX ลด ¥200 ทุกที่นั่งแบบจอง ถ้าต้องการถูกกว่านั้น รถบัสทางด่วนกลางคืนเป็นทางเลือกราคาประหยัด ใช้เวลาประมาณ 8 ถึง 9 ชั่วโมง
          </p>
          <Table
            head={["ทางเลือก", "เวลา", "ค่าใช้จ่าย", "ความเห็น", "แหล่งข้อมูลและวันที่ตรวจสอบ"]}
            rows={altRows.map((r) => [r.option, r.time, r.cost, r.verdict, r.source])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "ราคาที่นั่งแบบไม่จอง smartEX (PDF)", href: "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_non_reserved.pdf" },
              { label: "บริการ smartEX", href: "https://smart-ex.jp/en/product/plan/service/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            จะแวะเกียวโตระหว่างทางไหม? <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>โตเกียวไปเกียวโต (ภาษาอังกฤษ)</Link> เทียบรถบัสกับรถไฟสำหรับช่วงนั้น และ <Link href="/th/guides/transport/kyoto-to-tokyo-shinkansen" style={linkStyle}>ไกด์ชินคันเซ็น เกียวโต โตเกียว</Link> อธิบายขากลับ สำหรับเส้นทางอื่น ตาราง <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>วิธีซื้อตั๋วชินคันเซ็น (ภาษาอังกฤษ)</Link> เทียบ smartEX สถานี Klook และ JR Pass พร้อมกฎที่นั่งสำหรับสัมภาระขนาดใหญ่
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            แวะนาโกย่าระหว่างทางจากโตเกียวไปโอซาก้าได้ไหม?
          </h3>
          <p className={styles.bodyText}>
            ได้ ถ้าใช้ตั๋วค่าโดยสารพื้นฐานที่ระยะทางเกิน 100 กม.: JR Central อนุญาตให้แวะพัก (ออกจากประตูตรวจตั๋วแล้วกลับเข้ามาใหม่) ที่สถานีระหว่างต้นทางและปลายทาง โดยห้ามย้อนกลับ ตั๋วด่วนพิเศษของชินคันเซ็นใช้แวะพักไม่ได้ จึงต้องซื้อโตเกียว → นาโกย่า และนาโกย่า → ชินโอซาก้าแยกกัน ส่วน smartEX แวะพักไม่ได้ และช่วงที่ยังไม่ได้นั่งจะใช้ไม่ได้ทันทีเมื่อลงจากรถ กฎนี้ตรวจสอบจาก <a href="https://global.jr-central.co.jp/en/tickets/type/stopovers.html" target="_blank" rel="noopener">หน้าการแวะพักระหว่างทาง</a> ของ JR Central และ smart-ex.jp เมื่อ 13 พฤศจิกายน 2026 ส่วนจะใช้เวลาที่นาโกย่าอย่างไร ดูได้ใน <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" style={linkStyle}>ไกด์ชินคันเซ็นโตเกียว–นาโกย่า (ภาษาอังกฤษ)</Link>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ตั๋ว</span>
          <h2 className={styles.sectionTitle}>จองตั๋วชินคันเซ็นโตเกียวไปโอซาก้าอย่างไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ใช้ smartEX ถ้าต้องการราคาที่นั่งแบบจองที่ต่ำที่สุดและเปลี่ยนได้ฟรี ใช้ Klook ถ้าอยากเลือกขบวนและประเภทที่นั่งพร้อมจองส่วนอื่นของทริปในการชำระเงินครั้งเดียว ซื้อที่สถานีถ้าอยู่ในญี่ปุ่นแล้วและเดินทางวันนั้น และใช้ JR Pass เฉพาะเมื่อสัปดาห์เดียวกันไปไกลกว่าโอซาก้ามาก
          </p>
          <Table
            head={["ช่องทาง", "ราคา", "จองได้เมื่อไร", "การเปลี่ยนและคืนเงิน"]}
            rows={bookingRows.map((r) => [r.route, r.price, r.when, r.cancel])}
          />
          <LastChecked
            date={OWN_ISO}
            sources={[
              { label: "บริการ smartEX", href: "https://smart-ex.jp/en/product/plan/service/" },
              { label: "ประกาศของ JR Central และ JR West (ราคาที่สถานี)", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
              { label: "ตั๋ว NOZOMI/MIZUHO ใน japanrailpass.net", href: "https://japanrailpass.net/en/use/special-ticket/" },
              { label: "เงื่อนไขของ Klook แสดงตอนชำระเงิน" },
            ]}
          />
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เลือกขบวนและประเภทที่นั่งบน Klook →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            ชินคันเซ็นโตเกียวไปโอซาก้าต้องจองล่วงหน้าไหม?
          </h3>
          <p className={styles.bodyText}>
            วันปกติไม่ต้อง แต่ต้องจองในวันต่อไปนี้: โนโซมิเป็นที่นั่งแบบจองทุกตู้ จึงไม่มีตั๋วโนโซมิที่นั่งแบบไม่จองสำหรับซื้อวันเดินทาง และที่นั่งในขบวนช่วงเช้าจะถูกจองเต็มก่อน ฮิคาริและโคดามะยังมีตู้ที่นั่งแบบไม่จอง แต่ JR เตือนว่าอาจแออัดมาก ตรวจสอบจากเว็บไซต์ JR Central เมื่อ {OWN}
          </p>
          <ul className={styles.pickList}>
            {nozomiAllReservedPeriods.map((period) => (
              <li key={period}>
                <span className={styles.proIcon}>▸</span>
                <span><strong>{period}</strong></span>
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            นอกช่วงเหล่านี้ ควรจองล่วงหน้าเพียง 3 กรณี: กระเป๋าขนาด 161 ถึง 250 ซม. ซึ่งต้องใช้ที่นั่งแบบจองที่มีพื้นที่วางสัมภาระขนาดใหญ่ (ถ้าขึ้นรถโดยไม่มีต้องจ่าย ¥1,000 และกระเป๋าที่เกิน 250 ซม. นำขึ้นรถไม่ได้) มีเวลาต่อรถที่ต้องตรงเวลา หรืออยากเห็นภูเขาไฟฟูจิ ตู้ที่นั่งแบบไม่จองไม่มีที่นั่งทั้งสองแบบนี้ กฎสัมภาระตรวจสอบจาก <a href="https://global.jr-central.co.jp/en/info/oversized-baggage/" target="_blank" rel="noopener noreferrer">หน้าสัมภาระขนาดใหญ่</a> ของ JR Central เมื่อ {OWN}
          </p>
          <p className={styles.bodyText}>
            ถ้าปัญหาอยู่ที่กระเป๋า ไม่ใช่ที่นั่ง ก็ส่งกระเป๋าแยกได้: บริการส่งกระเป๋าภายในวันเดียวของ LuggAgent บน Klook ส่งกระเป๋าจากโรงแรมในเขตโตเกียวไปโรงแรมในเขตโอซาก้า ก่อนจองให้ตรวจสอบในหน้ารายการว่าโรงแรมทั้งสองแห่งอยู่ในพื้นที่บริการ และเวลาปิดรับฝากกระเป๋าตอนเช้า ทางเลือกที่ช้ากว่าและถูกกว่าคือ TA-Q-BIN ของยามาโตะ ราคาตามขนาดดูได้ใน <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>ไกด์ส่งกระเป๋าในญี่ปุ่น (ภาษาอังกฤษ)</Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={LUGGAGE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ส่งกระเป๋าโตเกียว → โอซาก้าภายในวันเดียว →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            นั่งฝั่งไหนจึงเห็นภูเขาไฟฟูจิจากโตเกียวไปโอซาก้า?
          </h3>
          <p className={styles.bodyText}>
            ฝั่งขวาเมื่อเดินทางไปทางตะวันตก: <strong>ที่นั่ง E</strong> ในตู้ธรรมดา หรือ <strong>ที่นั่ง D</strong> ในกรีนคาร์ ซึ่งเป็นที่นั่งที่คู่มือของ JR Central ระบุไว้ เลือกได้จากผังที่นั่งใน smartEX หรือขอที่ห้องจำหน่ายตั๋ว การมองเห็นขึ้นอยู่กับสภาพอากาศ และ JR Central ระบุว่าอาจมองไม่เห็นภูเขา ตรวจสอบจาก <a href="https://global.jr-central.co.jp/en/goldenroute/shinkansen/" target="_blank" rel="noopener noreferrer">Shinkansen Perfect Guide ของ JR Central</a> เมื่อ {OWN}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การปรับราคา</span>
          <h2 className={styles.sectionTitle}>ราคาชินคันเซ็นโตเกียวไปโอซาก้าจะขึ้นไหม?</h2>
          <p className={styles.bodyText}>
            ขึ้น ตั้งแต่ปี 2027 JR Central และ JR West ประกาศเมื่อ 16 ตุลาคม 2026 ว่าโนโซมิที่นั่งแบบจองจะขึ้นราคาสำหรับ<strong>ตั๋วที่ซื้อตั้งแต่ 1 กรกฎาคม 2027</strong> ทำให้โตเกียว–ชินโอซาก้าเปลี่ยนจาก {WINDOW_NOZOMI} เป็น <strong>¥15,420</strong> กรีนคาร์เปลี่ยนจาก ¥19,590 เป็น <strong>¥23,290</strong> สำหรับการเดินทางตั้งแต่ 15 ธันวาคม 2027 ค่าที่นั่งแบบไม่จองไม่เปลี่ยน และทริปที่จองก่อนวันดังกล่าวไม่ได้รับผลกระทบ ประกาศนี้ระบุเฉพาะราคาที่สถานี ไม่มีราคา smartEX ตรวจสอบเมื่อ {OWN}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เมื่อเดินทางถึง</span>
          <h2 className={styles.sectionTitle}>ลงชินคันเซ็นแล้วควรพักย่านไหนในโอซาก้า?</h2>
          <p className={styles.bodyText}>
            อุเมดะหรือนัมบะ ทั้งสองย่านอยู่บนสายมิโดสุจิจากชินโอซาก้า ชินคันเซ็นไม่ได้วิ่งถึงสถานีโอซาก้า การนั่งรถไฟใต้ดินช่วงสุดท้ายนี้จึงเป็นส่วนหนึ่งของทุกทริป อุเมดะห่างไป 2 สถานี และนัมบะอีกไม่กี่สถานีบนขบวนเดียวกัน <Link href="/guides/attractions/where-to-stay-in-osaka" style={linkStyle}>ไกด์ย่านที่พักในโอซาก้า (ภาษาอังกฤษ)</Link> เทียบแต่ละย่านอย่างละเอียด ถ้ามาถึงช่วงสาย Osaka Amazing Pass 1 วันราคา {PRICES.osakaAmazingPass.adult} ใช้กับรถไฟใต้ดินและสถานที่ท่องเที่ยวได้ (ราคาจากผู้ให้บริการ ตรวจสอบเมื่อ {dateLabel(PRICES.osakaAmazingPass.checked, LOCALE)}) <Link href="/guides/attractions/osaka-attractions-pass" style={linkStyle}>ตารางจุดคุ้มทุน Osaka Amazing Pass (ภาษาอังกฤษ)</Link> มีการคำนวณ และ <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>แผนเที่ยวโอซาก้า 2 วัน (ภาษาอังกฤษ)</Link> วางแผนต่อจากนั้น
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={AMAZING_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={FOOD_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์อาหารโดทงโบริ →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="โรงแรมในโอซาก้าใกล้สายมิโดสุจิ"
          intro="ทั้งสามย่านอยู่บนสายมิโดสุจิจากชินโอซาก้า จึงเลือกตามแผนเที่ยวต่อจากนั้น ไม่ใช่ตามวิธีเดินทางไป"
          areas={stayAreas}
        />

        <KlookTripPrep
          label="จองพร้อมตั๋วรถไฟ"
          heading="สิ่งที่ควรจองสำหรับวันที่เดินทางถึง"
          intro="รถไฟเป็นส่วนเดียวของวันนั้นที่ JR จัดการให้แล้ว ส่วนที่เหลือต้องเตรียม: อาหารกลางวันที่ปลายทาง การเดินทางในเมือง ที่พัก อินเทอร์เน็ตมือถือ และถ้าบินกลับจากคันไซ บริการส่งกระเป๋าในเช้าวันสุดท้าย"
          items={arrivalPrep}
        />

        <KlookTourPicks
          heading="สิ่งที่ควรจองสำหรับบ่ายวันแรก"
          intro="ถ้ามาถึงช่วงเที่ยง 2 รายการนี้เติมวันนั้นได้เต็ม เปิดหน้ารายการเพื่อดูวันที่ว่างและราคาปัจจุบันในวันที่คุณเดินทาง"
          tours={tourPicks}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ก่อนเดินทาง</span>
          <h2 className={styles.sectionTitle}>สิ่งที่ควรเตรียมก่อนขึ้นรถไฟ</h2>
          <p className={styles.bodyText}>
            อินเทอร์เน็ตมือถือ การเปลี่ยนตั๋วใน smartEX ตั๋ว QR และประกาศรถล่าช้าล้วนอยู่บนโทรศัพท์ และคุณจะต้องใช้แผนที่ทันทีที่ลงจากรถที่ชินโอซาก้า{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              ดู Klook eSIM →
            </KlookLink>{" "}
            <Link href="/th/guides/esim/best-esim-japan" style={linkStyle}>ไกด์ eSIM ญี่ปุ่น</Link> เทียบกับตัวเลือกอื่น
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/japan-first-time-itinerary", title: "แผนเที่ยวญี่ปุ่นครั้งแรก 2026: 9 วันแบบรายวัน (ภาษาอังกฤษ)" },
            { href: "/guides/transport/shinkansen-guide", title: "ไกด์ชินคันเซ็น 2026: ตั๋ว พาส และเคล็ดลับสำหรับมือใหม่ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-to-kyoto", title: "โตเกียวไปเกียวโต 2026: วิธีที่ถูกที่สุดและเร็วที่สุด (ภาษาอังกฤษ)" },
            { href: "/th/guides/transport/kyoto-to-tokyo-shinkansen", title: "ชินคันเซ็น เกียวโต โตเกียว 2026: เวลาเดินทาง ราคา และวิธีจองตั๋ว" },
            { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "ชินคันเซ็นโตเกียว–นาโกย่า: เวลา ค่าโดยสาร JR Pass (ภาษาอังกฤษ)" },
            { href: "/guides/transport/jr-pass-guide", title: "ราคา JR Pass 2026: ราคาใหม่ตั้งแต่ 1 ต.ค. และคุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/th", title: "ไกด์ภาษาไทยทั้งหมด →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองที่นั่ง แล้ววางแผนเที่ยวโอซาก้าต่อ</h2>
            <p className={styles.ctaBannerDesc}>ที่นั่ง E สำหรับวิวภูเขาไฟฟูจิ ตู้ที่นั่งแบบจองถ้ามีกระเป๋าใบใหญ่ และฮิคาริถ้าคุณถือ JR Pass</p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋วโตเกียว → โอซาก้า →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
