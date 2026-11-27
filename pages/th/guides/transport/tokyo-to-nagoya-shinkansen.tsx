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
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  jrPassWholeJapan,
  klookEsim,
  legolandJapanHotelPackage,
  legolandJapanTicket,
  nagoyaArrivalShinkansenPrep,
  nagoyaParkStayAreas,
  shinkansenTokyoNagoya,
  shoryudoHighwayBusPass,
  takayamaShirakawagoNagoyaDayTrip,
  shirakawagoTakayamaOldTownDayTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import fares from "../../../../data/jr-fares.json";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/tokyo-to-nagoya-shinkansen) section by section as of
// 2026-11-28 (task jtk-20261127-TR03): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: ชินคันเซ็น โตเกียว นาโกย่า — the route as Thai results write it (ekitan.com/th
// "ราคาและวิธีการจองตั๋วรถไฟชินคันเซ็นจากโตเกียวไปยังนาโกย่า").

const LOCALE = "th" as const;
const ROUTE = "/th/guides/transport/tokyo-to-nagoya-shinkansen";
const TITLE = "ชินคันเซ็น โตเกียว นาโกย่า 2026: ราคา";
const H1 = "ชินคันเซ็น โตเกียว นาโกย่า 2026: ราคา เวลาเดินทาง และ JR Pass";
const DESC =
  "ชินคันเซ็น โตเกียว นาโกย่า: โนโซมิเร็วสุด 1 ชม. 33 นาที ที่นั่งจอง ¥11,100 จองผ่าน Klook";

const OWN_ISO = "2026-10-28";
const OWN = dateLabel(OWN_ISO, LOCALE);
const PARKS = dateLabel("2026-10-26", LOCALE);
const LAST_CHECKED = "2026-11-18";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);

const tokyoNagoya = fares.segments.find((s) => s.id === "tokyo-nagoya")!;
const WINDOW_FARE = `¥${tokyoNagoya.fareYen.toLocaleString("en-US")}`;
const FARE_AS_OF = monthLabel(`${fares.asOf}-01`, LOCALE);

const SMART_EX_NOZOMI = "¥11,100";
const SMART_EX_HIKARI = "¥10,890";
const NOZOMI_TICKET = "¥4,180";
const JR_PASS_7 = "¥50,000";
const KINTETSU_PASS_1 = "¥1,900";

const JRC_TRAININFO_URL = "https://traininfo.jr-central.co.jp/shinkansen/pc/en/ti04.html?station=1&bound=2";
const SMART_EX_PDF_URL = "https://smart-ex.jp/en/product/plan/service/pdf/service_fares_reserved.pdf";
const NOZOMI_FASTEST = "1 ชม. 33 นาที";
const NOZOMI_RANGE = "1 ชม. 33 นาที ถึง 1 ชม. 41 นาที";
const HIKARI_RANGE = "1 ชม. 41 นาที ถึง 1 ชม. 59 นาที";
const KODAMA_RANGE = "2 ชม. 36 นาที ถึง 2 ชม. 46 นาที";
const NOZOMI_PER_DAY = 119;

const SHINKANSEN_URL = klookFor(shinkansenTokyoNagoya.url, LOCALE);
const GHIBLI_TOUR_URL = klookFor(ghibliParkNagoyaBusTour.url, LOCALE);
const GHIBLI_TICKET_URL = klookFor(ghibliParkTicket.url, LOCALE);
const LEGOLAND_URL = klookFor(legolandJapanTicket.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const SHORYUDO_URL = klookFor(shoryudoHighwayBusPass.url, LOCALE);
const SHIRAKAWAGO_URL = klookFor(takayamaShirakawagoNagoyaDayTrip.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const answerRows = [
  {
    train: "โนโซมิ (Nozomi) เร็วที่สุด",
    time: `${NOZOMI_RANGE} ไม่ต้องเปลี่ยนขบวน`,
    fare: SMART_EX_NOZOMI,
    note: `วันละ ${NOZOMI_PER_DAY} ขบวนจากโตเกียวที่จอดนาโกย่า ขบวนแรก 06:00 น. ใช้ JR Pass ไม่ได้`,
  },
  {
    train: "ฮิคาริ (Hikari)",
    time: `${HIKARI_RANGE} ไม่ต้องเปลี่ยนขบวน`,
    fare: SMART_EX_HIKARI,
    note: "วันละ 30 ขบวนจากโตเกียว ใช้ JAPAN RAIL PASS ได้",
  },
  {
    train: "โคดามะ (Kodama)",
    time: `${KODAMA_RANGE} ไม่ต้องเปลี่ยนขบวน`,
    fare: SMART_EX_HIKARI,
    note: "วันละ 29 ขบวนจากโตเกียว จอดทุกสถานี",
  },
];

/** The eight 2026–27 periods JR Central lists, as the English page prints them. */
const nozomiAllReservedPeriods = [
  "24 เมษายน – 6 พฤษภาคม 2026 (โกลเดนวีก)",
  "7–16 สิงหาคม 2026 (โอบ้ง)",
  "18–23 กันยายน 2026",
  "10–12 ตุลาคม 2026",
  "21–23 พฤศจิกายน 2026",
  "25 ธันวาคม 2026 – 5 มกราคม 2027",
  "9–11 มกราคม 2027",
  "20–22 มีนาคม 2027",
];

const routeRows = [
  {
    item: "เวลาเดินทางเร็วที่สุด โตเกียว → นาโกย่า",
    value: `โนโซมิ ${NOZOMI_FASTEST}`,
    detail: `ไม่ต้องเปลี่ยนขบวน โนโซมิส่วนใหญ่ใช้เวลา 1 ชม. 35 นาที ถึง 1 ชม. 40 นาที ช่วงเวลาทั้งหมดในวันที่ตรวจสอบคือ ${NOZOMI_RANGE}`,
    source: `ข้อมูลการเดินรถของ JR Central, ${CHECKED}`,
  },
  {
    item: "โนโซมิที่ออกจากโตเกียวและจอดนาโกย่า",
    value: `วันละ ${NOZOMI_PER_DAY} ขบวน ขบวนแรก 06:00 น.`,
    detail: "โนโซมิทุกขบวนจอดที่นาโกย่า และเกือบทุกช่วงเวลามีรถไฟทุกไม่กี่นาที จึงควรวางแผนตามขบวนที่ตั๋วของคุณขึ้นได้ มากกว่าตามตารางเวลา",
    source: `ข้อมูลการเดินรถของ JR Central, ${CHECKED}`,
  },
  {
    item: "ขบวนที่ใช้ JR Pass ได้ (ฮิคาริ)",
    value: `${HIKARI_RANGE} ไม่ต้องเปลี่ยนขบวน`,
    detail: "JAPAN RAIL PASS ใช้กับโนโซมิไม่ได้ แต่ใช้กับฮิคาริที่วิ่งตรงจากโตเกียวถึงนาโกย่าได้ (วันละ 30 ขบวนจากโตเกียว) เสียเวลาเพิ่มแค่ไม่กี่นาที ไม่ใช่หนึ่งชั่วโมง เส้นทางนี้จึงเป็นช่วงบนโทไกโดชินคันเซ็นที่ผู้ถือพาสเสียเปรียบน้อยที่สุด",
    source: `ข้อมูลการเดินรถของ JR Central, ${CHECKED}`,
  },
  {
    item: "โคดามะ (จอดทุกสถานี)",
    value: KODAMA_RANGE,
    detail: "ขบวนที่จอดทุกสถานี วันละ 29 ขบวนจากโตเกียว ใช้พาสได้ แต่ควรขึ้นเฉพาะเมื่อจะไปสถานีเล็กระหว่างทาง",
    source: `ข้อมูลการเดินรถของ JR Central, ${CHECKED}`,
  },
  {
    item: "ประเภทที่นั่งที่ขายในเส้นทางนี้",
    value: "ตู้ธรรมดาที่นั่งไม่จอง ตู้ธรรมดาที่นั่งจอง และกรีนคาร์ที่นั่งจอง",
    detail: "ตั๋วสามแบบที่หน้าเส้นทางของ Klook แสดงไว้ โทไกโดชินคันเซ็นไม่มี Gran Class ซึ่งเป็นตู้ของโทโฮคุและโฮคุริคุชินคันเซ็น",
    source: `หน้ารถไฟของ klook.com, ${OWN}`,
  },
  {
    item: "ขึ้นจากชินางาวะแทน",
    value: "ตั๋วเดียวกัน ราคาตั๋วโนโซมิเท่ากัน",
    detail: "โนโซมิทุกขบวนบนโทไกโดชินคันเซ็นจอดที่ชินางาวะหลังออกจากโตเกียวไม่กี่นาที และ JR กำหนดราคาตั๋วโนโซมิสำหรับผู้ถือพาสเป็น \"โตเกียว/ชินางาวะ–นาโกย่า\" ราคาเดียว ถ้าพักฝั่งใต้หรือฝั่งตะวันตกของโตเกียว ขึ้นที่ชินางาวะได้เลย",
    source: `japanrailpass.net, ${OWN}`,
  },
];

const priceRows = [
  {
    item: "โตเกียว → นาโกย่า เที่ยวเดียว ตู้ธรรมดาที่นั่งจอง (โนโซมิ, มิซุโฮะ)",
    price: SMART_EX_NOZOMI,
    covers: "ราคาออนไลน์ smartEX ของ JR สำหรับผู้ใหญ่ 1 คน ช่วงปกติ บนขบวนเร็ว เป็นราคาที่ผู้โดยสารส่วนใหญ่จ่าย",
    source: `ตารางค่าโดยสาร smartEX ของ smart-ex.jp, ${OWN}`,
  },
  {
    item: "ที่นั่งเดียวกันบนฮิคาริ โคดามะ ซากุระ หรือสึบาเมะ",
    price: SMART_EX_HIKARI,
    covers: "ถูกกว่า ¥210 ในตาราง smartEX เดียวกัน เป็นส่วนลดของการไม่ขึ้นโนโซมิ ในเส้นทางนี้ขบวนที่ช้ากว่าใช้เวลาเพิ่มประมาณ 15 นาที",
    source: `ตารางค่าโดยสาร smartEX ของ smart-ex.jp, ${OWN}`,
  },
  {
    item: "โตเกียว → นาโกย่า ที่ช่องขายตั๋วในสถานี",
    price: `ประมาณ ${WINDOW_FARE}`,
    covers: "ค่าโดยสารพื้นฐานรวมค่าด่วนพิเศษที่นั่งจองบนฮิคาริ ซึ่งเป็นขบวนที่ JAPAN RAIL PASS ใช้ได้โดยไม่ต้องจ่ายเพิ่ม",
    source: `ข้อมูลค่าโดยสาร JR ของเว็บไซต์นี้ ณ ${FARE_AS_OF} เป็นค่าอ้างอิงที่ปัดเศษ ไม่ใช่ตารางของผู้ให้บริการ`,
  },
  {
    item: "ตั๋วโนโซมิ/มิซุโฮะสำหรับผู้ถือพาส",
    price: `${NOZOMI_TICKET} โตเกียวหรือชินางาวะ–นาโกย่า`,
    covers:
      "ตั๋วพิเศษที่ผู้ถือ JAPAN RAIL PASS ต้องซื้อทุกครั้งที่ขึ้นโนโซมิ JR ระบุว่า \"ตั๋วกรีนคาร์ ตั๋วที่นั่งจองตู้ธรรมดา และตั๋วที่นั่งไม่จองตู้ธรรมดาราคาเดียวกัน\"",
    source: `japanrailpass.net, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS ตู้ธรรมดา",
    price: `ออนไลน์ 7 วัน ${JR_PASS_7}, 14 วัน ¥80,000, 21 วัน ¥100,000`,
    covers: "Exchange Order จากตัวแทนในต่างประเทศ ¥53,000, ¥84,000 และ ¥105,000 กรีนคาร์ออนไลน์ ¥70,000, ¥110,000 และ ¥140,000 และ Exchange Order ¥74,000, ¥116,000 และ ¥147,000",
    source: `ตารางราคาทางการของ JR Group, ${OWN}`,
  },
  {
    item: "KINTETSU RAIL PASS สำหรับช่วงไปอิเสะ",
    price: `1 วัน ${KINTETSU_PASS_1}, 2 วัน ¥3,700, 5 วัน ¥4,900, 5 วัน Plus ¥6,700`,
    covers: "พาสสำหรับนักท่องเที่ยวของคินเท็ตสึ ซึ่งเป็นบริษัทรถไฟที่วิ่งจากคินเท็ตสึนาโกย่าไปอิเสะ เป็นคนละบริษัทกับ JR จึงใช้พาสของ JR ไม่ได้",
    source: `หน้าพาสภาษาอังกฤษของ kintetsu.co.jp, ${OWN}`,
  },
];

const compareRows = [
  {
    option: "ตั๋วโนโซมิที่นั่งจองเที่ยวเดียว ซื้อทีละเที่ยว",
    cost: `smartEX เที่ยวเดียว ${SMART_EX_NOZOMI}`,
    gets: `ขบวนตรงที่เร็วที่สุด (เร็วสุด ${NOZOMI_FASTEST}) ไม่ต้องเปลี่ยนขบวน และไม่ต้องซื้อหรือวางแผนอะไรเพิ่ม`,
    pick: "ตัวเลือกหลัก ตั๋วเที่ยวเดียว 2 ใบประมาณ ¥22,200 เทียบกับพาส 7 วัน ¥50,000 (เว็บไซต์ทางการ) หรือ ¥53,000 (ตัวแทน) ไปกลับนาโกย่าอย่างเดียวจึงไม่คุ้มค่าซื้อพาส",
  },
  {
    option: "JAPAN RAIL PASS ตู้ธรรมดา 7 วัน นั่งฮิคาริ",
    cost: `ออนไลน์ ${JR_PASS_7}`,
    gets: "ใช้ได้กับรถไฟ JR ทั่วประเทศ และเส้นทางโตเกียว–นาโกย่ายังเป็นขบวนตรง ฮิคาริไม่ต้องเปลี่ยนขบวน",
    pick: "เลือกเมื่อสัปดาห์เดียวกันมีเกียวโต คานาซาวะ ฮิโรชิมะ หรือโทโฮคุด้วย นาโกย่าเป็นเมืองบนเส้นทางโทไกโดที่ใช้พาสแล้วแทบไม่เสียเวลาเพิ่ม จึงเหมาะเป็นจุดแวะระหว่างทางของแผนเที่ยวที่ใช้พาส",
  },
  {
    option: "JAPAN RAIL PASS กับตั๋วโนโซมิ",
    cost: `${JR_PASS_7} และจ่ายเพิ่ม ${NOZOMI_TICKET} ต่อเที่ยว`,
    gets: "ได้ทั้งพาสและขบวนที่เร็วที่สุด แต่ในเส้นทางนี้ฮิคาริช้ากว่าเพียงประมาณ 15 นาที",
    pick: "ในเส้นทางนี้แทบไม่คุ้มค่า เท่ากับจ่าย ¥4,180 เพื่อประหยัด 15 นาที เก็บตั๋วโนโซมิไว้ใช้กับโตเกียว–ฮิโรชิมะ ที่เวลาต่างกัน 1 ชม. 15 นาที",
  },
  {
    option: "ตู้ธรรมดาที่นั่งไม่จอง",
    cost: "ถูกกว่าที่นั่งจอง ส่วนต่างคือค่าที่นั่งจอง",
    gets: "ไปถึงสถานีแล้วขึ้นขบวนที่มาได้เลย ยกเว้น 8 ช่วงไฮซีซันด้านล่าง ที่โนโซมิทุกตู้เป็นที่นั่งจอง",
    pick: `นอกช่วงไฮซีซันและมีสัมภาระน้อย โนโซมิจากโตเกียวอย่างเดียวมีวันละ ${NOZOMI_PER_DAY} ขบวน วิธีนี้จึงใช้ได้จริง ต่างจากเส้นทางที่มีแค่วันละ 30 ขบวน`,
  },
  {
    option: "Shoryudo Highway Bus Pass",
    cost: "ดูราคาวันที่คุณเดินทางในหน้าสินค้า",
    gets: "พาสรถบัสทางด่วนสำหรับนักท่องเที่ยวต่างชาติ 3 หรือ 5 วัน ในภูมิภาคชูบุโดยเริ่มจากนาโกย่า รวมตั๋วเดินทางไปสนามบิน",
    pick: "ไม่ใช่สำหรับช่วงจากโตเกียว เป็นพาสสำหรับหลังจากถึงนาโกย่าแล้ว ถ้าแผนคือทาคายามะ ชิราคาวาโกะ และอิเสะ มากกว่าสวนสนุกที่เดียวแล้วกลับ",
  },
  {
    option: "ทัวร์แบบมีไกด์จากนาโกย่า",
    cost: "ดูราคาวันที่คุณเดินทางในหน้าสินค้า",
    gets: "ชิราคาวาโกะกับย่านเมืองเก่าทาคายามะ หรือ Ghibli Park กับ Aichi Museum of Flight ในการจองครั้งเดียว",
    pick: "เลือกหลังจากจองรถไฟแล้ว เหมาะกับวันที่การเดินทางในพื้นที่ยุ่งยาก เช่น การเปลี่ยนไปขึ้น Linimo หรือรถบัสขึ้นเขาที่ต้องจองล่วงหน้า",
  },
];

const fromNagoyaRows = [
  {
    place: "Ghibli Park (นางาคุเตะ)",
    how: "รถบัสตรงของ Meitetsu จาก Bus Center ที่สถานีนาโกย่า หรือรถไฟใต้ดินสายฮิงาชิยามะไปฟุจิงาโอกะแล้วต่อ Linimo",
    time: "รถบัสตรง 40 นาที",
    cost: "รถบัสผู้ใหญ่ ¥1,200 เด็ก ¥600 ช่วง Linimo จากฟุจิงาโอกะ ¥400 / ¥200",
    source: `เว็บไซต์ทางการของ Meitetsu Bus และ Linimo, ${PARKS}`,
  },
  {
    place: "LEGOLAND® Japan (คินโจฟุโตะ)",
    how: "Aonami Line จากสถานีนาโกย่า ซึ่งอยู่ในอาคารเดียวกับที่ชินคันเซ็นมาถึง",
    time: "24 นาที 15.2 กม.",
    cost: "ผู้ใหญ่ ¥360 เด็ก ¥180",
    source: `aonamiline.co.jp, ${PARKS}`,
  },
  {
    place: "ทาคายามะและชิราคาวาโกะ",
    how: "Nohi Bus ระหว่าง Meitetsu Bus Center ที่สถานีนาโกย่ากับ Takayama Nohi Bus Center หรือทัวร์แบบมีไกด์จากสถานีนาโกย่า",
    time: "ถึงทาคายามะ 2 ชม. 45 นาที ทัวร์ระบุว่าไปกลับประมาณ 11 ชั่วโมง",
    cost: "รถบัสต้องจองล่วงหน้า ราคาทัวร์ดูในหน้าสินค้า",
    source: `nouhibus.co.jp, ${OWN}`,
  },
  {
    place: "อิเสะ (ศาลเจ้าอิเสะ)",
    how: "รถไฟคินเท็ตสึจากสถานีคินเท็ตสึนาโกย่า ซึ่งเป็นคนละบริษัทกับ JR และอยู่ข้างสถานี JR",
    time: "ประมาณ 1 ชม. 15 นาที ตารางเวลา Shimakaze ของคินเท็ตสึ ออกจากคินเท็ตสึนาโกย่า 10:25 น. ถึงอิเสะชิ 11:40 น. และอุจิยามาดะ 11:42 น.",
    cost: `ใช้พาสของ JR ไม่ได้ KINTETSU RAIL PASS 1 วัน ${KINTETSU_PASS_1}`,
    source: `kintetsu.co.jp, ${OWN}`,
  },
  {
    place: "เกียวโต โอซาก้า และเส้นทางโทไกโดที่เหลือ",
    how: "อยู่ชานชาลาเดิมแล้วเดินทางต่อไปทางตะวันตก",
    time: "นาโกย่าอยู่ประมาณหนึ่งในสามของเส้นทางโตเกียว–ชินโอซาก้า",
    cost: "ใช้กฎตั๋วเดียวกับหน้านี้",
    source: `คู่มือนี้, ${OWN}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ชินคันเซ็นจากโตเกียวไปนาโกย่าใช้เวลากี่ชั่วโมง",
    a: `เร็วสุด ${NOZOMI_FASTEST} ด้วยโนโซมิ ไม่ต้องเปลี่ยนขบวน และ ${NOZOMI_RANGE} สำหรับโนโซมิ ${NOZOMI_PER_DAY} ขบวนที่ออกจากโตเกียวไปนาโกย่าในแต่ละวัน ตามข้อมูลการเดินรถของ JR Central ที่ตรวจสอบเมื่อ ${CHECKED} ฮิคาริซึ่งใช้ JAPAN RAIL PASS ได้ใช้เวลา ${HIKARI_RANGE} และไม่ต้องเปลี่ยนขบวนเช่นกัน ส่วนโคดามะที่จอดทุกสถานีใช้เวลา ${KODAMA_RANGE}`,
  },
  {
    q: "ชินคันเซ็นโตเกียวไปนาโกย่าราคาเท่าไร",
    a: `${SMART_EX_NOZOMI} เที่ยวเดียว สำหรับตู้ธรรมดาที่นั่งจองบนโนโซมิ ตามตารางค่าโดยสาร smartEX ของ JR (ผู้ใหญ่ 1 คน ตรวจสอบเมื่อ ${CHECKED}) ที่นั่งเดียวกันบนฮิคาริหรือโคดามะ ${SMART_EX_HIKARI} ถูกกว่า ¥210 โนโซมิเที่ยวเดียว 2 ใบรวม ¥22,200 เทียบกับ JAPAN RAIL PASS ตู้ธรรมดา 7 วันที่ซื้อออนไลน์ ${JR_PASS_7}`,
  },
  {
    q: "ควรนั่งโนโซมิ ฮิคาริ หรือโคดามะ",
    a: `ถ้าซื้อตั๋วให้นั่งโนโซมิ ถ้าถือพาสให้นั่งฮิคาริ และนั่งโคดามะเฉพาะเมื่อจะไปสถานีเล็กระหว่างทาง โนโซมิใช้เวลา ${NOZOMI_RANGE} ที่นั่งจอง ${SMART_EX_NOZOMI} ฮิคาริใช้เวลา ${HIKARI_RANGE} ราคา ${SMART_EX_HIKARI} และไม่ต้องเปลี่ยนขบวนเช่นกัน โคดามะใช้เวลา ${KODAMA_RANGE} JAPAN RAIL PASS ใช้กับฮิคาริและโคดามะได้ แต่ใช้กับโนโซมิไม่ได้ และในเส้นทางนี้ข้อจำกัดนั้นทำให้ผู้ถือพาสเสียเวลาเพิ่มแค่ไม่กี่นาที`,
  },
  {
    q: "JR Pass คุ้มไหมสำหรับโตเกียว–นาโกย่า",
    a: `ถ้าไปกลับอย่างเดียว ไม่คุ้มค่า แต่ถ้าจะซื้อพาสอยู่แล้ว นาโกย่าเป็นจุดแวะที่คุ้มที่สุด JAPAN RAIL PASS ตู้ธรรมดา 7 วันราคา ${JR_PASS_7} ออนไลน์ และ ¥53,000 สำหรับ Exchange Order จากตัวแทนในต่างประเทศ ส่วนตั๋วที่นั่งจองไปกลับนาโกย่า 2 ใบประมาณ ¥22,200 ตามราคา smartEX ของ JR ตัวเลขจึงไม่คุ้มค่าเลย ที่ต่างคือเรื่องเวลา ฮิคาริวิ่งตรงจากโตเกียวถึงนาโกย่า ผู้ถือพาสจึงเสียเวลาเพิ่มแค่ไม่กี่นาที (${HIKARI_RANGE} เทียบกับ ${NOZOMI_RANGE} ตามตารางเวลาของ JR Central) ขณะที่เส้นทางฮิโรชิมะต่างกัน 1 ชม. 15 นาที ถ้ามีพาสสำหรับเกียวโต คานาซาวะ หรือฮิโรชิมะอยู่แล้ว การเพิ่มนาโกย่าจึงแทบไม่มีค่าใช้จ่าย และตั๋วโนโซมิ ${NOZOMI_TICKET} ที่คุ้มค่าในเส้นทางไกล ไม่จำเป็นต้องซื้อในเส้นทางนี้ ราคาพาสทั้งหมดจาก japanrailpass.net, ${OWN}`,
  },
  {
    q: "ต้องจองที่นั่งล่วงหน้าไหม",
    a: `ส่วนใหญ่ไม่ต้อง ตามตารางเวลาของ JR Central โนโซมิจากโตเกียวอย่างเดียวมีวันละ ${NOZOMI_PER_DAY} ขบวน นี่จึงเป็นเส้นทางระหว่างเมืองในญี่ปุ่นที่ไปถึงสถานีแล้วขึ้นได้เลย แต่มี 8 ช่วงที่ต้องจองแน่นอน หน้าเว็บของ JR Central ระบุช่วงที่โนโซมิทุกตู้เป็นที่นั่งจองและไม่มีที่นั่งไม่จองเลย ได้แก่ ${nozomiAllReservedPeriods.join(", ")} ในช่วงนั้น JR Central ระบุว่าขบวนอื่นนอกจากโนโซมิ คือ ฮิคาริ โคดามะ มิซุโฮะ ซากุระ และสึบาเมะ "ยังมีที่นั่งไม่จองตามปกติ" ขบวนที่ช้ากว่าจึงเป็นทางเลือกสำหรับคนที่ไม่ได้จอง ที่นั่งจองเปิดขายเวลา 10:00 น. หนึ่งเดือนก่อนวันที่รถไฟออกจากสถานีต้นทาง ถ้ามีพาส การจองที่นั่งไม่มีค่าใช้จ่าย จึงควรจองไว้ ตรวจสอบเมื่อ ${OWN}`,
  },
];

const topPrep = [
  withKlookLocale(nagoyaArrivalShinkansenPrep[0], LOCALE, {
    label: "โรงแรมใกล้สถานีนาโกย่า",
    ctaLabel: "ดูโรงแรมนาโกย่าบน Klook →",
    why: "ทั้งชินคันเซ็นและรถไฟใต้ดินออกจากสถานีนาโกย่า พักที่นี่แล้ววันไปสวนสนุกหรือทาคายามะก็ไม่ต้องข้ามเมือง",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[1], LOCALE, {
    label: "ตั๋ว Ghibli Park",
    ctaLabel: "ดูตั๋ว Ghibli Park →",
    why: "เวลาเข้า Ghibli's Grand Warehouse เลือกตอนชำระเงิน จึงควรเลือกพร้อมกับจองรถไฟ ไม่ใช่รอถึงวันเที่ยว",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[2], LOCALE, {
    label: "ตั๋ว LEGOLAND® Japan",
    ctaLabel: "ดูตั๋ว LEGOLAND →",
    why: "บัตร 1 วันเป็น QR code บนมือถือ และเลือกแพ็กคู่ SEA LIFE Nagoya กับ Skip Pass ได้ในหน้าสินค้าเดียวกัน",
  }),
  withKlookLocale(nagoyaArrivalShinkansenPrep[3], LOCALE, {
    label: "ทัวร์รถบัส Ghibli Park และ Aichi Museum of Flight จากนาโกย่า",
    ctaLabel: "ดูทัวร์รถบัสจากนาโกย่า →",
    why: "ทัวร์รถบัสแบบจอยจากนาโกย่า สำหรับคนที่ไม่อยากวางแผนเปลี่ยนไปขึ้น Linimo เอง",
  }),
];

const tourPicks = [
  withKlookLocale(ghibliParkNagoyaBusTour, LOCALE, {
    title: "ทัวร์รถบัส Ghibli Park และ Aichi Museum of Flight จากนาโกย่า",
    desc: "ทัวร์รถบัสแบบจอยจากนาโกย่าที่รวม Ghibli Park กับ Aichi Museum of Flight ไม่ต้องจัดการเรื่องเปลี่ยนไปขึ้น Linimo เอง",
  }),
  withKlookLocale(takayamaShirakawagoNagoyaDayTrip, LOCALE, {
    title: "ทัวร์ทาคายามะและชิราคาวาโกะ 1 วันจากนาโกย่า",
    desc: "ไปกลับจากสถานีนาโกย่า ระบุว่าประมาณ 11 ชั่วโมง อยู่ที่ชิราคาวาโกะและย่านเมืองเก่าทาคายามะแห่งละประมาณ 2 ชั่วโมง",
  }),
  withKlookLocale(shirakawagoTakayamaOldTownDayTour, LOCALE, {
    title: "ทัวร์ชิราคาวาโกะและย่านเมืองเก่าทาคายามะ 1 วัน (เลือกเพิ่มมื้อกลางวันเนื้อฮิดะได้)",
    desc: "อีกหนึ่งทัวร์จากนาโกย่าที่ไปสองที่เดียวกัน มื้อกลางวันเนื้อฮิดะเป็นตัวเลือกเพิ่ม ไม่ได้รวมในราคา",
  }),
  withKlookLocale(legolandJapanHotelPackage, LOCALE, {
    title: "ห้องพัก LEGOLAND Japan Hotel",
    desc: "พักหนึ่งคืนในห้องธีมพร้อมอาหารเช้าที่รีสอร์ตข้างประตูสวนสนุก ทำให้สวนสนุกที่เปิด 10:00–17:00 น. เที่ยวได้สองช่วงเช้า",
  }),
];

const stayAreas = [
  withKlookLocale(nagoyaParkStayAreas[0], LOCALE, {
    area: "สถานีนาโกย่า",
    why: "การเดินทางไปสวนสนุกทั้งสองแห่งเริ่มจากที่นี่ รถไฟใต้ดินสายฮิงาชิยามะไปฟุจิงาโอกะเพื่อต่อ Linimo หรือ Aonami Line ไปคินโจฟุโตะ ซึ่ง Aonami ระบุว่าใช้เวลา 24 นาที ราคา ¥360 และโทไกโดชินคันเซ็นก็มาถึงอาคารเดียวกัน",
  }),
  withKlookLocale(nagoyaParkStayAreas[1], LOCALE, {
    area: "ใกล้ Ghibli Park (นางาคุเตะ / เซโตะ)",
    why: "โรงแรมใกล้ Linimo แทนที่จะอยู่ในเมือง เหมาะกับคนที่ได้เวลาเข้า Ghibli's Grand Warehouse 9 โมงเช้า สวนสนุกอยู่หน้าทางออก 2 ของสถานีไอจิคิวฮาคุคิเน็นโคเอ็น",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ชินคันเซ็น โตเกียว นาโกย่า" }];

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

export default function ThTokyoToNagoyaShinkansenPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.heroSubtitle}>
            ประมาณชั่วโมงครึ่ง มีโนโซมิทุกไม่กี่นาที และเป็นช่วงเดียวบนเส้นทางโทไกโดที่ผู้ถือพาสเสียเวลาเพิ่มแค่ไม่กี่นาที ไม่ใช่ 1 ชม. 15 นาที
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการจาก smartEX และ JR Group พร้อมวันที่ตรวจสอบ", "จุดคุ้มทุนของ JR Pass", "เที่ยวต่อจากนาโกย่า"].map((t) => (
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
                <p className={styles.verdictStatLabel}>เวลาเดินทางเร็วที่สุด</p>
                <p className={styles.verdictStatValue}>{NOZOMI_FASTEST} (โนโซมิ) ไม่ต้องเปลี่ยนขบวน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ตู้ธรรมดาที่นั่งจอง</p>
                <p className={styles.verdictStatValue}>เที่ยวเดียว {SMART_EX_NOZOMI}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass (ฮิคาริ)</p>
                <p className={styles.verdictStatValue}>ใช้ได้ {HIKARI_RANGE}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>โนโซมิจากโตเกียวต่อวัน</p>
                <p className={styles.verdictStatValue}>{NOZOMI_PER_DAY} ขบวน ขบวนแรก 06:00 น.</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>ชินคันเซ็น โตเกียว นาโกย่า</strong> ใช้เวลาเร็วสุด <strong>{NOZOMI_FASTEST}</strong> ด้วยโนโซมิที่วิ่งตรง ({NOZOMI_RANGE}{" "}
              สำหรับ {NOZOMI_PER_DAY} ขบวนต่อวันจากโตเกียว) ตู้ธรรมดาที่นั่งจองราคา <strong>{SMART_EX_NOZOMI}</strong> เที่ยวเดียวตามราคา smartEX
              ของ JR JAPAN RAIL PASS ใช้กับโนโซมิไม่ได้ แต่ฮิคาริที่ใช้พาสได้ก็วิ่งตรงเช่นกัน ใช้เวลา <strong>{HIKARI_RANGE}</strong> และราคา{" "}
              {SMART_EX_HIKARI} ถ้าไม่มีพาส ตัวเลขจาก JR Central และ smart-ex.jp ตรวจสอบเมื่อ {CHECKED}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋วโตเกียว → นาโกย่าบน Klook →
              </KlookLink>
              <KlookLink href={GHIBLI_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ทัวร์ Ghibli Park จากนาโกย่า →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>คำตอบ</span>
          <h2 className={styles.sectionTitle}>ชินคันเซ็นจากโตเกียวไปนาโกย่าใช้เวลากี่ชั่วโมง</h2>
          <p className={styles.bodyText}>
            เร็วสุด {NOZOMI_FASTEST} และโนโซมิเกือบทุกขบวนใช้เวลา {NOZOMI_RANGE} ไม่ต้องเปลี่ยนขบวน ตารางเวลาของ JR Central แสดงโนโซมิ{" "}
            {NOZOMI_PER_DAY} ขบวนที่ออกจากโตเกียวและจอดนาโกย่าในวันที่ {CHECKED} ขบวนแรก 06:00 น. ฮิคาริใช้เวลา {HIKARI_RANGE} และโคดามะที่จอดทุกสถานีใช้เวลา{" "}
            {KODAMA_RANGE}
          </p>
          <h2 className={styles.sectionTitle}>ชินคันเซ็นโตเกียวไปนาโกย่าราคาเท่าไร</h2>
          <p className={styles.bodyText}>
            {SMART_EX_NOZOMI} เที่ยวเดียวสำหรับตู้ธรรมดาที่นั่งจองบนโนโซมิ และ {SMART_EX_HIKARI} สำหรับที่นั่งเดียวกันบนฮิคาริหรือโคดามะ เป็นราคา smartEX
            ของ JR สำหรับผู้ใหญ่ 1 คน ไปกลับด้วยโนโซมิจึงเป็น ¥22,200 ไม่ถึงครึ่งหนึ่งของ JAPAN RAIL PASS 7 วัน ({JR_PASS_7})
          </p>
          <Table
            head={["ขบวน", "เวลาโตเกียว → นาโกย่า", "ที่นั่งจอง (smartEX)", "หมายเหตุ"]}
            rows={answerRows.map((r) => [r.train, r.time, r.fare, r.note])}
          />
          <LastChecked
            date={LAST_CHECKED}
            sources={[
              { label: "ข้อมูลการเดินรถของ JR Central (โตเกียว มุ่งหน้าตะวันตก)", href: JRC_TRAININFO_URL },
              { label: "ตารางค่าโดยสารที่นั่งจอง smartEX (smart-ex.jp)", href: SMART_EX_PDF_URL },
            ]}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            ถ้าจะค้างคืน{" "}
            <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>
              แผนเที่ยวนาโกย่า 2 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            จัดวันหลังจากมาถึงเป็นสองวัน และ{" "}
            <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>
              คู่มือตั๋วปราสาทนาโกย่า (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายครึ่งวันที่นักท่องเที่ยวส่วนใหญ่ใช้ในตัวเมือง
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              จองที่นั่งโตเกียว → นาโกย่า →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          headingLevel={3}
          label="จองพร้อมรถไฟ"
          heading="สิ่งที่ควรจองในนาโกย่าพร้อมที่นั่ง"
          intro="รถไฟพาคุณไปถึงสถานีนาโกย่า ที่เหลือคือที่พักใกล้สถานี และตั๋วสวนสนุกแบบระบุเวลาที่ขายตามวัน จึงควรจองไปพร้อมกันตอนจองรถไฟ"
          items={topPrep}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ทำไมนาโกย่าจึงเป็นจุดแวะที่คนมักมองข้าม</h2>
          <p className={styles.bodyText}>
            เพราะคนส่วนใหญ่มองว่านาโกย่าเป็นแค่เมืองที่รถไฟไปเกียวโตวิ่งผ่าน ตามตารางเวลา นาโกย่าอยู่ประมาณหนึ่งในสามของโทไกโดชินคันเซ็นจากโตเกียวถึงชินโอซาก้า
            จึงเป็นเส้นทางระยะไกลที่ง่ายที่สุดในญี่ปุ่น เร็วสุด <strong>{NOZOMI_FASTEST}</strong> ด้วยโนโซมิ ไม่ต้องเปลี่ยนขบวน และโนโซมิจากโตเกียวอย่างเดียวมีวันละ{" "}
            {NOZOMI_PER_DAY} ขบวน
          </p>
          <p className={styles.bodyText}>
            การเลือกตั๋วก็ง่ายที่สุดบนเส้นทางนี้ และมีเหตุผลที่ควรอธิบาย บนช่วงอื่นของโทไกโดและซันโยชินคันเซ็น <strong>JAPAN RAIL PASS</strong>{" "}
            ใช้กับโนโซมิไม่ได้ จึงต้องเลือกระหว่างจ่ายเพิ่มกับนั่งขบวนที่ช้ากว่า โตเกียว–นาโกย่าเป็นข้อยกเว้น เพราะ<strong>ฮิคาริ</strong>วิ่งตรงตลอดเส้นทาง
            การเดินทางด้วยพาสจึงยังไม่ต้องเปลี่ยนขบวน และใช้เวลาเพิ่มเพียงประมาณ 15 นาที ตั๋วโนโซมิ {NOZOMI_TICKET} มีขายสำหรับเส้นทางนี้ แต่แทบไม่คุ้มค่าที่จะซื้อ
          </p>
          <p className={styles.bodyText}>
            สิ่งที่ควรวางแผนจริง ๆ คือหลังจากถึงแล้ว นาโกย่าไม่ใช่เมืองท่องเที่ยวมากเท่ากับเป็นสถานีเปลี่ยนรถไปเที่ยว 1 วันดี ๆ สี่แห่ง ได้แก่ Ghibli Park ทาง Linimo
            LEGOLAND Japan ทาง Aonami Line ชิราคาวาโกะและทาคายามะบนเส้นทางขึ้นเขา และศาลเจ้าอิเสะบนรถไฟที่พาสของ JR ใช้ไม่ได้ แต่ละแห่งมีผู้ให้บริการและค่าโดยสารของตัวเอง
            และสองแห่งมีกฎการจองของตัวเองด้วย ส่วนนี้คือสิ่งที่ควรอ่านล่วงหน้า และเป็นเนื้อหาที่เหลือของหน้านี้
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>รถไฟ</span>
          <h2 className={styles.sectionTitle}>โนโซมิ ฮิคาริ หรือโคดามะ: เทียบเวลาเดินทาง</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            เร็วสุด {NOZOMI_FASTEST} ไม่ต้องเปลี่ยนขบวน ตัวเลขทุกตัวด้านล่างระบุแหล่งที่มาและวันที่ตรวจสอบ รวมถึงแถวที่อธิบายว่าทำไมการเดินทางของผู้ถือพาสในเส้นทางนี้แทบไม่ต่างจากคนอื่น
          </p>
          <Table
            head={["รายการ", "ข้อมูล", "ความหมาย", "แหล่งที่มาและวันที่ตรวจสอบ"]}
            rows={routeRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            พื้นฐานของตั๋วชินคันเซ็น เช่น ค่าโดยสารสองส่วน ประเภทที่นั่ง และขบวนที่พาสใช้ได้หรือไม่ได้ อยู่ใน{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              คู่มือชินคันเซ็น (ภาษาอังกฤษ)
            </Link>{" "}
            ส่วน{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
              โตเกียวไปเกียวโต (ภาษาอังกฤษ)
            </Link>{" "}
            คือเส้นทางเดียวกันที่ไปต่ออีก 40 นาที และ{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" style={linkStyle}>
              ชินคันเซ็นโตเกียว–ฮิโรชิมะ (ภาษาอังกฤษ)
            </Link>{" "}
            คือเส้นทางที่ข้อจำกัดของพาสมีผลจริง
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋วโตเกียว → นาโกย่า →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ค่าโดยสารและราคาพาสโตเกียว–นาโกย่าทั้งหมด</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {SMART_EX_NOZOMI} เที่ยวเดียวสำหรับตู้ธรรมดาที่นั่งจองบนโนโซมิ และ {SMART_EX_HIKARI} สำหรับที่นั่งเดียวกันบนฮิคาริหรือโคดามะ ทั้งสองเป็นราคาออนไลน์ของ JR
            จากตารางค่าโดยสาร smartEX ที่ smart-ex.jp เผยแพร่ ตรวจสอบเมื่อ {OWN} (ผู้ใหญ่ 1 คน ช่วงปกติ) ข้อควรทราบคือ JR Central ไม่ได้เผยแพร่ราคาช่องขายตั๋วในสถานีเป็นตารางตายตัว
            แถวช่องขายตั๋วด้านล่างจึงเป็นค่าอ้างอิงที่ปัดเศษของเว็บไซต์นี้ และระบุไว้ชัดเจน
          </p>
          <Table
            head={["ตั๋ว", "ราคา", "รายละเอียด", "แหล่งที่มาและวันที่ตรวจสอบ"]}
            rows={priceRows.map((r) => [r.item, r.price, r.covers, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ราคาอาจเปลี่ยนแปลง โปรดตรวจสอบก่อนซื้อ ราคาช่องขายตั๋วคือค่าโดยสารพื้นฐานรวมค่าด่วนพิเศษที่นั่งจอง (ตู้ธรรมดา) เที่ยวเดียวช่วงปกติ บนขบวนที่ใช้ JR Pass ได้
            (บนโทไกโดและซันโยชินคันเซ็นคือฮิคาริ ซากุระ และโคดามะ) เป็นค่าอ้างอิงที่ปัดเศษ ราคา smartEX เป็นราคาออนไลน์และต่างจากราคาที่สถานี ช่วงไฮซีซันและโลว์ซีซันทำให้ค่าที่นั่งจองขึ้นลงไม่กี่ร้อยเยน
            หน้านี้ไม่แสดงราคา Klook เพราะราคา Klook เปลี่ยนตามวัน โปรดดูราคาวันที่คุณเดินทางในหน้าสินค้า
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เปรียบเทียบ</span>
          <h2 className={styles.sectionTitle}>JR Pass คุ้มไหมสำหรับโตเกียว–นาโกย่า</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ถ้าไปแค่เส้นทางนี้ ไม่คุ้มค่า ตั๋วที่นั่งจองเที่ยวเดียว 2 ใบประมาณ ¥22,200 ตามราคา smartEX ของ JR เทียบกับพาสตู้ธรรมดา 7 วัน {JR_PASS_7}{" "}
            ออนไลน์ หรือ ¥53,000 สำหรับ Exchange Order ที่ซื้อจากต่างประเทศ แต่ถ้า<em>เพิ่ม</em>นาโกย่าเข้าไปในแผนที่ต้องใช้พาสอยู่แล้ว
            นาโกย่าคือเมืองที่คุ้มที่สุดบนเส้นทางนี้ เพราะผู้ถือพาสแทบไม่เสียเวลาเพิ่ม
          </p>
          <Table
            head={["ตัวเลือก", "ค่าใช้จ่าย", "สิ่งที่ได้", "ควรเลือกเมื่อ"]}
            rows={compareRows.map((r) => [r.option, r.cost, r.gets, r.pick])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            กฎที่ JR เขียนไว้เองคือ การขึ้นโนโซมิหรือมิซุโฮะด้วยพาสต้องใช้ตั๋วพิเศษที่ขายเฉพาะผู้ถือ JAPAN RAIL PASS และ &ldquo;ตั๋วกรีนคาร์
            ตั๋วที่นั่งจองตู้ธรรมดา และตั๋วที่นั่งไม่จองตู้ธรรมดาราคาเดียวกัน&rdquo; สำหรับโตเกียวหรือชินางาวะ–นาโกย่า ตั๋วนี้ราคา{" "}
            <strong>{NOZOMI_TICKET}</strong> ถูกที่สุดในหกช่วงที่ JR กำหนดราคา และเป็นช่วงที่ไม่ซื้อก็ได้มากที่สุด{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              คู่มือ JR Pass (ภาษาอังกฤษ)
            </Link>{" "}
            มีวิธีคำนวณจุดคุ้มทุนตามเส้นทางของคุณ และ{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" style={linkStyle}>
              คู่มือโตเกียวไปคานาซาวะ (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายอีกเส้นทางหนึ่งในภูมิภาคชูบุที่ไปชิราคาวาโกะจากทางเหนือ
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 วัน) →
            </KlookLink>
            <KlookLink href={SHORYUDO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Shoryudo Highway Bus Pass →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การจองที่นั่ง</span>
          <h2 className={styles.sectionTitle}>ต้องจองที่นั่งล่วงหน้าไหม</h2>
          <p className={styles.bodyText}>
            เกือบทั้งปีไม่ต้อง ตามตารางเวลาของ JR Central โนโซมิจากโตเกียวมีวันละ {NOZOMI_PER_DAY} ขบวน นี่จึงเป็นเส้นทางระหว่างเมืองในญี่ปุ่นที่ไปถึงสถานีแล้วขึ้นขบวนถัดไปได้เลย
            แต่มี 8 ช่วงที่ไม่มีทางเลือก JR Central ให้<strong>โนโซมิทุกตู้เป็นที่นั่งจอง</strong>ในช่วงไฮซีซันด้านล่าง วันนั้นขบวนเร็วไปนาโกย่าจึงไม่มีที่นั่งไม่จองเลย
            ตรวจสอบจากหน้าเว็บของ JR Central เมื่อ {OWN}
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
            ทางเลือกของเส้นทางนี้คือฮิคาริ JR Central ระบุว่าในช่วงเดียวกัน ขบวนอื่นนอกจากโนโซมิ ได้แก่ ฮิคาริ โคดามะ มิซุโฮะ ซากุระ และสึบาเมะ &ldquo;ยังมีที่นั่งไม่จองตามปกติ&rdquo;
            และฮิคาริวิ่งตรงจากโตเกียวถึงนาโกย่า แม้ในช่วงโกลเดนวีกก็ยังมีขบวนที่ขึ้นได้โดยไม่ต้องจอง เพียงแต่ใช้เวลาเพิ่มประมาณ 15 นาที
          </p>
          <p className={styles.bodyText}>
            ถ้าจะจอง เวลาเปิดขายเหมือนกันทุกขบวน ที่นั่งจองเปิดขายเวลา <strong>10:00 น. หนึ่งเดือนก่อน</strong>วันที่รถไฟออกจากสถานีต้นทาง
            ขบวนวันที่ 1 เมษายนจึงเปิดขายเวลา 10:00 น. วันที่ 1 มีนาคม ถ้ามี <strong>JAPAN RAIL PASS</strong> การจองที่นั่งไม่มีค่าใช้จ่าย
            เส้นทางนี้จึงไม่ต้องจ่ายอะไรเพิ่มเลย
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เลือกขบวนและประเภทที่นั่ง →
            </KlookLink>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เที่ยวต่อจากนาโกย่า</span>
          <h2 className={styles.sectionTitle}>นาโกย่าคุ้มค่าที่จะแวะไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ในฐานะย่านที่พัก คุ้มค่า และเหตุผลอยู่ในตารางนี้มากกว่าตัวเมือง สี่ที่ที่ไปจากโตเกียวยากหรือไปกลับวันเดียวไม่ได้ ไปจากสถานีนาโกย่าได้สะดวกทั้งหมด
            และสองในสี่เส้นทางออกจากอาคารเดียวกับที่ชินคันเซ็นมาถึง
          </p>
          <Table
            head={["ปลายทาง", "วิธีเดินทาง", "เวลา", "ค่าใช้จ่าย", "แหล่งที่มาและวันที่ตรวจสอบ"]}
            rows={fromNagoyaRows.map((r) => [r.place, r.how, r.time, r.cost, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            สองแห่งในนี้มีกฎการจองที่สำคัญกว่ารถไฟ Ghibli Park ขายตั๋วแบบระบุวันและเวลาล่วงหน้าสองเดือน และมีเวลาเข้า Ghibli&apos;s Grand Warehouse
            ที่กำหนดไว้ ปฏิทินการขาย ตั๋วสองระดับ และราคาทางการอยู่ใน{" "}
            <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>
              คู่มือตั๋ว Ghibli Park (ภาษาอังกฤษ)
            </Link>{" "}
            LEGOLAND Japan ราคาเปลี่ยนตามวัน ซึ่ง{" "}
            <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>
              คู่มือตั๋ว LEGOLAND Japan (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายไว้ และรถบัสขึ้นเขาไปทางเหนือหลายเที่ยวต้องจองล่วงหน้า ซึ่ง{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour" style={linkStyle}>
              คู่มือทาคายามะและชิราคาวาโกะ (ภาษาอังกฤษ)
            </Link>{" "}
            สรุปไว้ทีละเที่ยว
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={GHIBLI_TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋ว Ghibli Park →
            </KlookLink>
            <KlookLink href={LEGOLAND_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋ว LEGOLAND® Japan →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            แวะนาโกย่าระหว่างทางจากโตเกียวไปโอซาก้าได้ไหม
          </h3>
          <p className={styles.bodyText}>
            ได้ ถ้าเป็นตั๋วค่าโดยสารพื้นฐานที่ไกลเกิน 100 กม. JR Central อนุญาตให้แวะพักระหว่างทาง (ออกจากประตูตรวจตั๋วแล้วกลับเข้ามาใหม่) ที่สถานีระหว่างต้นทางกับปลายทาง
            โดยห้ามย้อนกลับ ตั๋วด่วนพิเศษของชินคันเซ็นใช้แวะพักไม่ได้ จึงต้องซื้อโตเกียว → นาโกย่า และนาโกย่า → ชินโอซาก้าแยกกัน ส่วน smartEX แวะพักไม่ได้
            และเมื่อลงจากรถไฟ ช่วงที่ยังไม่ได้นั่งจะใช้ไม่ได้ กฎนี้ตรวจสอบจาก{" "}
            <a href="https://global.jr-central.co.jp/en/tickets/type/stopovers.html" target="_blank" rel="noopener">
              หน้าการแวะพักระหว่างทางของ JR Central
            </a>{" "}
            และ smart-ex.jp เมื่อ 13 พฤศจิกายน 2026 ค่าโดยสารถึงชินโอซาก้าอยู่ใน{" "}
            <Link href="/th/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>
              คู่มือชินคันเซ็น โตเกียว โอซาก้า
            </Link>{" "}
            สำหรับครึ่งวันในนาโกย่า{" "}
            <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>
              คู่มือตั๋วปราสาทนาโกย่า (ภาษาอังกฤษ)
            </Link>{" "}
            มีราคา เวลาเปิด และเรื่องหอปราสาทที่ปิดอยู่
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>สัมภาระ</span>
          <h2 className={styles.sectionTitle}>กฎสัมภาระขนาดใหญ่เป็นอย่างไร</h2>
          <p className={styles.bodyText}>
            กระเป๋าที่ผลรวมสามด้าน<strong>เกิน 160 ซม.</strong> ต้องจองล่วงหน้า หน้าสัมภาระของ JR Central กำหนดสัมภาระขนาดใหญ่ว่าผลรวมสามด้าน
            <strong>161 ถึง 250 ซม.</strong> และต้องวางในพื้นที่หลังที่นั่งที่มีพื้นที่วางสัมภาระขนาดใหญ่ ที่นั่งนี้ไม่มีค่าใช้จ่ายเพิ่ม
            JR ระบุว่าตั๋ว &ldquo;ราคาเดียวกับที่นั่งจองในตู้ธรรมดาและกรีนคาร์&rdquo;
          </p>
          <p className={styles.bodyText}>
            ถ้าขึ้นรถไฟพร้อมสัมภาระขนาดใหญ่โดยไม่ได้จอง จะมี<strong>ค่าสัมภาระ ¥1,000 รวมภาษี</strong> ตรวจสอบเมื่อ {OWN} จองได้ที่ช่องขายตั๋วในสถานี
            เครื่องขายตั๋วที่นั่งจอง หรือออนไลน์โดยเลือกที่นั่งที่มีพื้นที่วางสัมภาระ ในทางปฏิบัติ กระเป๋าเดินทางที่โหลดใต้เครื่องบินส่วนใหญ่ไม่เกิน 160 ซม.
            กฎนี้จึงใช้กับกระเป๋าสกี ถุงใส่กอล์ฟ กระเป๋าเดินทางขนาดใหญ่พิเศษ และรถเข็นเด็กที่ใส่ถุง ที่นั่งที่มีพื้นที่วางสัมภาระมีเฉพาะในตู้ที่นั่งจอง
            ตั๋วที่นั่งไม่จองจึงไม่ใช่วิธีเลี่ยงกฎนี้
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ไปกลับวันเดียวหรือค้างคืน</span>
          <h2 className={styles.sectionTitle}>ไป Ghibli Park แบบไปกลับวันเดียวจากโตเกียวได้ไหม</h2>
          <p className={styles.bodyText}>
            ได้ แต่เวลาตึงกว่าที่คิด ชินคันเซ็นโนโซมิใช้เวลาประมาณ <strong>1 ชม. 35 นาที</strong> ต่อเที่ยว และรถบัสตรงของ Meitetsu จาก Bus Center
            ที่สถานีนาโกย่าใช้เวลา <strong>40 นาที</strong> ตามที่ผู้ให้บริการระบุ จึงต้องใช้เวลาเดินทางเกิน 4 ชั่วโมงครึ่งไปมาก ไม่นับเวลาในสวนสนุก
          </p>
          <p className={styles.bodyText}>
            ข้อจำกัดจริงไม่ใช่ระยะทาง แต่เป็นตั๋ว{" "}
            <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>
              ตั๋ว Ghibli Park (ภาษาอังกฤษ)
            </Link>{" "}
            เป็นตั๋วแบบระบุวันและเวลา มีเวลาเข้า Ghibli&apos;s Grand Warehouse ที่กำหนดไว้ และรอบเช้าจะถูกจองหมดก่อน ถ้าจะเข้า Warehouse เวลา 9 โมงเช้า
            ต้องขึ้นรถไฟจากโตเกียวก่อน 06:00 น. และรถบัสตรงของ Meitetsu ไม่วิ่งในวันที่สวนปิด ซึ่งรวมถึงวันอังคาร การค้างคืนที่นาโกย่าหรือโรงแรมย่านนางาคุเตะใกล้
            Linimo ทำให้การออกเดินทางก่อนฟ้าสางกลายเป็นเช้าปกติ
          </p>
          <p className={styles.bodyText}>
            ชิราคาวาโกะยิ่งเป็นเช่นนั้น ต้องนั่งรถบัสที่ต้องจองล่วงหน้าต่อจากนาโกย่าอีก 2 ชม. 45 นาที การไปกลับวันเดียวจากโตเกียวจึงเที่ยวได้ไม่เต็มที่
            ถ้าที่ใดที่หนึ่งในสองแห่งนี้คือเหตุผลของการเดินทาง ให้จองที่พักหนึ่งคืน และถ้าไม่อยากวางแผนการเดินทางในพื้นที่เอง ทัวร์แบบมีไกด์จากสถานีนาโกย่ามีไว้สำหรับการต่อรถที่ยุ่งยากนี้โดยเฉพาะ
          </p>
        </section>

        <KlookTourPicks
          heading="ทริป 1 วันที่เริ่มจากนาโกย่า"
          intro="ทั้งสี่รายการเริ่มที่หรือใกล้สถานีนาโกย่า ได้แก่ ทัวร์ Ghibli Park ที่จัดการเรื่องเปลี่ยนไปขึ้น Linimo ให้ ตั๋วสวนสนุกอย่างเดียว และทัวร์ชิราคาวาโกะกับทาคายามะสองรายการที่เปลี่ยนวันเที่ยวภูเขาที่ต้องต่อรถบัสสองครั้งให้เหลือการจองครั้งเดียว เปิดหน้าสินค้าเพื่อดูที่ว่างและราคาปัจจุบันในวันที่คุณเดินทาง"
          tours={tourPicks}
        />

        <KlookStayAreas
          heading="พักที่ไหนถ้าค้างคืนที่นาโกย่า"
          intro="สองย่าน และการเลือกขึ้นอยู่กับตารางด้านบนโดยตรง พักใกล้สถานีถ้านาโกย่าเป็นแค่จุดแวะหนึ่งในแผนเที่ยวด้วยรถไฟที่ยาวกว่าและไปสวนสนุกแบบไปกลับวันเดียว หรือพักใกล้ Linimo ถ้าเหตุผลที่มาคือเวลาเข้า Ghibli's Grand Warehouse 9 โมงเช้า"
          areas={stayAreas}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ก่อนขึ้นรถไฟ</span>
          <h2 className={styles.sectionTitle}>สิ่งเดียวที่ควรเตรียมก่อนขึ้นรถไฟ</h2>
          <p className={styles.bodyText}>
            อินเทอร์เน็ตมือถือ เพราะทุกการตัดสินใจหลังออกจากสถานีนาโกย่าทำบนมือถือ ตั๋ว Ghibli Park เป็น QR code ที่มีเวลาเข้าระบุไว้ รถบัส Meitetsu
            และ Nohi Bus มีตารางเวลาที่ต้องเทียบกับเวลาที่คุณมาถึงจริง และการเปลี่ยนไปขึ้น Linimo ที่ฟุจิงาโอกะง่ายเมื่อมีแผนที่ แต่ยุ่งยากเมื่อไม่มี
            เปิดใช้ eSIM ก่อนเดินทาง ทุกอย่างก็เช็กได้ทันทีบนมือถือ{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              ดู eSIM ของ Klook →
            </KlookLink>{" "}
            <Link href="/th/guides/esim/best-esim-japan" style={linkStyle}>
              คู่มือ eSIM ญี่ปุ่น
            </Link>{" "}
            เปรียบเทียบกับตัวเลือกอื่น และ{" "}
            <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>
              คู่มือบัตร IC (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายการผ่านประตูตรวจตั๋วของรถไฟใต้ดินนาโกย่า Aonami Line และ Meitetsu หลังลงจากชินคันเซ็น
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/nagoya-2-day-itinerary", title: "แผนเที่ยวนาโกย่า 2 วัน (2026): Ghibli Park หรือ LEGOLAND (ภาษาอังกฤษ)" },
            { href: "/th/guides/transport/tokyo-to-osaka-shinkansen", title: "ชินคันเซ็น โตเกียว โอซาก้า 2026: ราคา" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "ตั๋ว Ghibli Park 2026: วิธีซื้อ ราคา และวันเปิดขาย (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/legoland-japan-tickets", title: "ตั๋ว LEGOLAND Japan (2026): ราคาตามวัน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/takayama-shirakawago-tour", title: "ทัวร์ทาคายามะและชิราคาวาโกะ (2026): เที่ยวไหนและราคาเท่าไร (ภาษาอังกฤษ)" },
            { href: "/guides/transport/shinkansen-guide", title: "คู่มือชินคันเซ็น 2026: ตั๋ว พาส และเคล็ดลับสำหรับมือใหม่ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/jr-pass-guide", title: "คู่มือ JR Pass 2026: ราคา คุ้มไหม และวิธีซื้อ (ภาษาอังกฤษ)" },
            { href: "/th/guides/transport/kyoto-to-tokyo-shinkansen", title: "ชินคันเซ็น เกียวโต โตเกียว 2026: ราคา" },
            { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "ชินคันเซ็นโตเกียว–ฮิโรชิมะ: เวลา ค่าโดยสาร JR Pass (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-to-kanazawa", title: "โตเกียวไปคานาซาวะ (2026): คากายากิ ที่นั่ง และพาส (ภาษาอังกฤษ)" },
            { href: "/th", title: "ดูคู่มือภาษาไทยทั้งหมด →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>รถไฟชั่วโมงครึ่ง แล้วตัดสินใจเรื่องที่สำคัญ</h2>
            <p className={styles.ctaBannerDesc}>
              ถ้าซื้อตั๋วให้จองโนโซมิ ถ้าถือพาสให้จองฮิคาริ ในเส้นทางนี้ต่างกันประมาณ 15 นาที จากนั้นจัดการสิ่งที่เป็นเหตุผลของการไปนาโกย่า
              คือเวลาเข้า Ghibli Park หรือการจองรถบัสขึ้นเหนือ
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋วโตเกียว → นาโกย่า →
              </KlookLink>
              <KlookLink href={SHIRAKAWAGO_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูทัวร์ชิราคาวาโกะ 1 วัน →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
