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
  hanedaLimousineBus,
  jrPassWholeJapan,
  klookEsim,
  kyotoToTokyoArrivalStayAreas,
  kyotoToTokyoTripPrep,
  luggageDeliveryCards,
  naritaLimousineBus,
  shinkansenKyotoTokyo,
  tokyoPrivateAirportTransfer,
  tokyoSharedAirportTransfer,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/kyoto-to-tokyo-shinkansen) section by section as of
// 2026-11-27 (task jtk-20261127-TR01): same sections, tables, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: ชินคันเซ็น เกียวโต โตเกียว — the word order Thai results use for this route
// (ekitan.com/th kyoto-to-tokyo-shinkansen, shinkansentickets.net/th).

const LOCALE = "th" as const;
const ROUTE = "/th/guides/transport/kyoto-to-tokyo-shinkansen";
const TITLE = "ชินคันเซ็น เกียวโต โตเกียว 2026: ราคา";
const H1 = "ชินคันเซ็น เกียวโต โตเกียว 2026: เวลาเดินทาง ราคา และวิธีจองตั๋ว";
const DESC =
  "ชินคันเซ็น เกียวโต โตเกียว: โนโซมิ 2 ชม. 12 นาที ที่นั่งจอง ¥13,970 ไม่จอง ¥13,320";

const OWN_ISO = "2026-10-29";
const OWN = dateLabel(OWN_ISO, LOCALE);
const NOW = dateLabel("2026-11-11", LOCALE);
const TODAY_ISO = "2026-11-27";
const TODAY = dateLabel(TODAY_ISO, LOCALE);

const FARE_SOURCES = [
  { label: "ค่าโดยสาร smartEX (JR Central)", href: "https://smart-ex.jp/en/product/plan/service/" },
  { label: "ข้อมูลการเดินรถ JR Central", href: "https://traininfo.jr-central.co.jp/shinkansen/sp/en/" },
  { label: "ประกาศปรับค่าโดยสาร JR Central", href: "https://jr-central.co.jp/news/release/_pdf/000046069.pdf" },
  { label: "ตั๋ว NOZOMI MIZUHO สำหรับ JAPAN RAIL PASS", href: "https://japanrailpass.net/en/use/special-ticket/" },
  { label: "กฎสัมภาระขนาดใหญ่ JR Central", href: "https://global.jr-central.co.jp/en/info/oversized-baggage/" },
];

const STATION_NOZOMI = "¥14,170";
const NOZOMI_RESERVED = "¥13,970";
const HIKARI_RESERVED = "¥13,650";
const NON_RESERVED = "¥13,320";
const NOZOMI_TICKET = "¥4,960";
const JR_PASS_7 = "¥50,000";
const BAGGAGE_FEE = "¥1,000";

const SHINKANSEN_URL = klookFor(shinkansenKyotoTokyo.url, LOCALE);
const JR_PASS_URL = klookFor(jrPassWholeJapan.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);
const PRIVATE_TRANSFER_URL = klookFor(tokyoPrivateAirportTransfer.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const nozomiAllReservedPeriods = [
  "24 เมษายน – 6 พฤษภาคม 2026 (โกลเดนวีก)",
  "7 – 16 สิงหาคม 2026 (โอบ้ง)",
  "18 – 23 กันยายน 2026",
  "10 – 12 ตุลาคม 2026",
  "21 – 23 พฤศจิกายน 2026",
  "25 ธันวาคม 2026 – 5 มกราคม 2027",
  "9 – 11 มกราคม 2027",
  "20 – 22 มีนาคม 2027",
];

const trainTypeRows = [
  {
    train: "สรุป: นั่งโนโซมิ",
    time: "ส่วนใหญ่ 2 ชม. 12 นาที ไม่ต้องเปลี่ยนขบวน",
    count: "ชั่วโมงละ 8–12 ขบวนตลอดวัน",
    reserved: `${NOZOMI_RESERVED} (ซื้อที่สถานี ${STATION_NOZOMI})`,
    nonReserved: NON_RESERVED,
    pass: `ฮิคาริไม่ต้องจ่ายเพิ่ม หรือนั่งโนโซมิโดยซื้อตั๋ว ${NOZOMI_TICKET} เพิ่ม`,
  },
  {
    train: "โนโซมิ (Nozomi)",
    time: "2 ชม. 7 นาที – 2 ชม. 15 นาที",
    count: "วันละ 151 ขบวน ชั่วโมงละ 8–12 ขบวน ช่วง 07:00–21:00 น.",
    reserved: NOZOMI_RESERVED,
    nonReserved: `${NON_RESERVED} (ไม่มีในช่วงไฮซีซันที่เป็นที่นั่งจองทั้งขบวน)`,
    pass: `ต้องจ่ายเพิ่ม: ซื้อตั๋ว NOZOMI/MIZUHO ${NOZOMI_TICKET} ทุกครั้งที่นั่ง`,
  },
  {
    train: "ฮิคาริ (Hikari)",
    time: "2 ชม. 24 นาที – 2 ชม. 51 นาที",
    count: "วันละ 30 ขบวน ชั่วโมงละ 2 ขบวน",
    reserved: HIKARI_RESERVED,
    nonReserved: NON_RESERVED,
    pass: "ใช้ได้ จองที่นั่งฟรี",
  },
  {
    train: "โคดามะ (Kodama)",
    time: "3 ชม. 38 นาที",
    count: "วันละ 12 ขบวน ชั่วโมงละ 1 ขบวน (08:10–19:10 น.)",
    reserved: HIKARI_RESERVED,
    nonReserved: NON_RESERVED,
    pass: "ใช้ได้ จองที่นั่งฟรี จอดทุกสถานี",
  },
];

const stationRows = [
  {
    item: "ชานชาลาชินคันเซ็นไปโตเกียว",
    answer: "ชานชาลา 11 และ 12",
    detail:
      "ตารางเวลาสถานีเกียวโตของ JR West วันที่ 11 พฤศจิกายน 2026 แสดงว่าขบวนไปโตเกียวทุกขบวนออกจากชานชาลา 11 หรือ 12 ดูชานชาลาของขบวนคุณได้จากป้ายประกาศและบนตั๋ว JR West แจ้งว่าชานชาลาอาจเปลี่ยนในวันเดินทาง",
    source: `timetable.jr-odekake.net, ${NOW}`,
  },
  {
    item: "มาจากถนนฝั่งใต้",
    answer: "ทางออกฮาจิโจ (Hachijo Exit)",
    detail:
      "โถงชินคันเซ็นอยู่ฝั่งฮาจิโจ (ทิศใต้) ประตูตรวจตั๋วที่ชื่อ \"Shinkansen Central Exit\" พาไปทางออกฮาจิโจ ไม่ใช่ \"ทางออกกลาง (Central Exit)\" ฝั่งเหนือของรถไฟสายปกติ ซึ่งเป็นจุดที่คนเดินผิดบ่อยที่สุด",
    source: `kyoto.travel (สมาคมการท่องเที่ยวเมืองเกียวโต), ${NOW}`,
  },
  {
    item: "มาจากถนนฝั่งเหนือ",
    answer: "ทางออกกลาง (Central Exit ฝั่งเกียวโตทาวเวอร์)",
    detail:
      "ท่ารถเมล์ประจำทางเกียวโตอยู่หน้าทางออกกลางฝั่งเหนือ ใต้เกียวโตทาวเวอร์ ถ้ามาจากฝั่งนี้พร้อมกระเป๋าเดินทาง ควรเผื่อเวลาหลายนาทีเพื่อเดินข้ามสถานีไปประตูตรวจตั๋วชินคันเซ็น",
    source: `kyoto.travel, ${NOW}`,
  },
  {
    item: "มาจากรถไฟ JR สายปกติ (สายเกียวโต สายโคเซย์ หรือสายนารา)",
    answer: "ประตูเปลี่ยนสาย Central Transfer",
    detail:
      "ประตู \"Transfer to JR Lines (Central Transfer)\" เชื่อมชานชาลารถไฟสายปกติกับชินคันเซ็นโดยไม่ต้องออกจากเขตตรวจตั๋ว และมีบันไดเลื่อน ลิฟต์ และห้องน้ำอเนกประสงค์อยู่ติดกับประตู",
    source: `kyoto.travel, ${NOW}`,
  },
  {
    item: "มาจากรถไฟใต้ดินสายคาราสุมะ",
    answer: "ประตูตรวจตั๋วฝั่งใต้ของรถไฟใต้ดิน → ฝั่งฮาจิโจ",
    detail:
      "ทางเดินฝั่งฮาจิโจจากโถงชินคันเซ็น รวมถึงทางออกฮาจิโจฝั่งตะวันออกที่อยู่ด้านในของโถง เชื่อมใต้ดินไปถึงประตูตรวจตั๋วฝั่งใต้ของสายคาราสุมะ",
    source: `kyoto.travel, ${NOW}`,
  },
];

const bookingRows = [
  {
    item: "ที่นั่งแบบจองเปิดขายเมื่อไร",
    answer: "1 เดือนก่อนวันเดินทาง",
    detail:
      "หน้ากฎสัมภาระของ JR Central ระบุว่าที่นั่งที่มีพื้นที่วางสัมภาระขนาดใหญ่เปิดขาย 1 เดือนล่วงหน้า \"เหมือนที่นั่งแบบจองอื่น ๆ\" ส่วนตั๋ว NOZOMI/MIZUHO ของ JAPAN RAIL PASS ขาย \"ตั้งแต่ 1 เดือนก่อนวันขึ้นรถจนถึงวันขึ้นรถ\"",
    source: `global.jr-central.co.jp และ japanrailpass.net, ${NOW}`,
  },
  {
    item: "ช่วงที่เหลือในปี 2026–27 ที่โนโซมิเป็นที่นั่งจองทั้งขบวน",
    answer: "25 ธ.ค. 2026 – 5 ม.ค. 2027, 9–11 ม.ค. 2027, 20–22 มี.ค. 2027",
    detail:
      "ในวันเหล่านี้โนโซมิไม่มีตู้ที่นั่งแบบไม่จองเลย จึงซื้อตั๋วแล้วขึ้นโนโซมิทันทีไม่ได้ ฮิคาริและโคดามะยังมีตู้ที่นั่งแบบไม่จอง แต่ JR Central เตือนว่า \"อาจแออัดมาก\"",
    source: `railway.jr-central.co.jp/nozomi และ global.jr-central.co.jp/en/nozomi, ${OWN}`,
  },
  {
    item: "กระเป๋าไม่เกิน 160 ซม. (รวมสามด้าน)",
    answer: "ไม่ต้องจอง ไม่มีค่าธรรมเนียม",
    detail: "วางบนชั้นเหนือศีรษะ ที่เท้า หรือในที่เก็บของบริเวณประตูตู้",
    source: `หน้ากฎสัมภาระของ JR Central, ${NOW}`,
  },
  {
    item: "กระเป๋า 161–250 ซม.",
    answer: "จองที่นั่งที่มีพื้นที่วางสัมภาระขนาดใหญ่",
    detail: `ราคาเท่ากับที่นั่งแบบจองตู้ธรรมดาหรือกรีนคาร์ จองได้ที่ห้องจำหน่ายตั๋ว เครื่องขายตั๋วที่นั่งจอง (\"Seat with an oversized baggage area\") หรือออนไลน์ ถ้าขึ้นรถโดยไม่ได้จอง ต้องจ่ายค่าธรรมเนียม ${BAGGAGE_FEE} รวมภาษี`,
    source: `หน้ากฎสัมภาระของ JR Central, ${NOW}`,
  },
  {
    item: "กระเป๋าเกิน 250 ซม.",
    answer: "นำขึ้นรถไม่ได้",
    detail: "JR Central ระบุว่าสัมภาระที่รวมสามด้านเกิน 250 ซม. \"นำขึ้นรถไม่ได้\" ให้ส่งผ่านบริการขนส่งพัสดุแทน",
    source: `หน้ากฎสัมภาระของ JR Central, ${NOW}`,
  },
];

const routeRows = [
  {
    item: "เวลาเดินทางเกียวโต → โตเกียวที่เร็วที่สุด",
    value: "2 ชม. 7 นาที โนโซมิส่วนใหญ่ใช้ 2 ชม. 12 นาที",
    detail:
      "ตามข้อมูลการเดินรถของ JR Central วันที่ 27 พฤศจิกายน 2026 โนโซมิจากเกียวโตไปโตเกียวทุกขบวนใช้เวลา 2 ชม. 7 นาที ถึง 2 ชม. 15 นาที ไม่ต้องเปลี่ยนขบวน ขบวนที่เร็วที่สุดของวันนั้นคือขบวนสุดท้าย โนโซมิ 64 เวลา 21:38 → 23:45 น.",
    source: `traininfo.jr-central.co.jp, ${TODAY}`,
  },
  {
    item: "จำนวนขบวนจากเกียวโตไปโตเกียวต่อวัน",
    value: "193 ขบวน: โนโซมิ 151 ฮิคาริ 30 โคดามะ 12",
    detail:
      "นับจากรายการของ JR Central วันที่ 27 พฤศจิกายน 2026 เฉพาะขบวนที่วิ่งถึงโตเกียว คือโนโซมิ 8–12 ขบวนทุกชั่วโมงตั้งแต่ 07:00 ถึง 21:00 น. ฮิคาริชั่วโมงละ 2 ขบวน และโคดามะชั่วโมงละ 1 ขบวน ซึ่งจอดทุกสถานีและช้ากว่าโนโซมิประมาณ 1 ชั่วโมงครึ่ง",
    source: `traininfo.jr-central.co.jp, ${TODAY}`,
  },
  {
    item: "ขบวนแรกและขบวนสุดท้ายไปโตเกียว",
    value: "06:14 และ 21:38 น. (ถึง 23:45 น.)",
    detail:
      "ขบวนแรกไปโตเกียวคือโนโซมิ 230 เวลา 06:14 น. และขบวนสุดท้ายคือโนโซมิ 64 เวลา 21:38 น. ถึงโตเกียว 23:45 น. ขบวนที่มุ่งไปทางตะวันออกหลังจากนั้นในคืนเดียวกันวิ่งถึงแค่นาโกย่า",
    source: `traininfo.jr-central.co.jp, ${TODAY}; timetable.jr-odekake.net, ${NOW}`,
  },
  {
    item: "ประเภทที่นั่งที่ขายในเส้นทางนี้",
    value: "ตู้ธรรมดาที่นั่งแบบไม่จอง ตู้ธรรมดาที่นั่งแบบจอง และกรีนคาร์ที่นั่งแบบจอง",
    detail:
      "ตั๋วสามประเภทที่หน้าเส้นทางเกียวโตไปโตเกียวของ Klook แสดงไว้ สายโทไกโดไม่มีแกรนคลาส (Gran Class) ซึ่งเป็นตู้ของชินคันเซ็นสายโทโฮคุและสายโฮคุริคุ JR Central กำลังเปิดตัว Supreme Class ที่เหนือกว่ากรีนคาร์บนสายนี้ แต่หน้าเส้นทางยังไม่ได้ขายที่นั่งประเภทนี้",
    source: `หน้ารถไฟของ klook.com, ${OWN}`,
  },
  {
    item: "สถานีในเขตโตเกียวก่อนถึงสถานีปลายทาง",
    value: "ชินโยโกฮาม่า ชินางาวะ แล้วจึงโตเกียว",
    detail:
      "ลำดับสถานีเมื่อมุ่งไปทางตะวันออกตามรายชื่อสถานีของ JR Central คือ เกียวโต ไมบาระ กิฟุฮาชิมะ นาโกย่า มิกาวะอันโจ โทโยฮาชิ ฮามามัตสึ คาเกงาวะ ชิซึโอกะ ชินฟูจิ มิชิมะ อาตามิ โอดาวาระ ชินโยโกฮาม่า ชินางาวะ โตเกียว จะลงที่สถานีไหนในสามสถานีสุดท้ายเป็นเรื่องที่ต้องตัดสินใจจริง ดูด้านล่าง",
    source: `รายชื่อสถานี global.jr-central.co.jp, ${OWN}`,
  },
  {
    item: "ถ้านั่งต่อไปชินโอซาก้าแทน",
    value: "ขบวนเดียวกันวิ่งในทิศทางกลับ",
    detail:
      "ในภาพรวมของทั้งสาย JR Central ระบุว่า \"จากสถานีโตเกียวถึงชินโอซาก้าใช้เวลาเพียง 2 ชั่วโมง 21 นาที\" เกียวโตเป็นสถานีก่อนหน้านั้น การออกจากเกียวโตจึงสั้นกว่าออกจากโอซาก้าเพียงประมาณ 15 นาที",
    source: `Shinkansen Perfect Guide ของ JR Central, ${OWN}`,
  },
];

const priceRows = [
  {
    item: "โนโซมิ ตู้ธรรมดาที่นั่งแบบจอง",
    price: NOZOMI_RESERVED,
    covers:
      "ผู้ใหญ่ 1 คน เที่ยวเดียว ช่วงปกติ บนบริการ smartEX ของ JR Central ตามกฎฤดูกาลของ smartEX ช่วงโลว์ซีซันถูกกว่า ¥200 และช่วงไฮซีซันแพงกว่า",
    source: `ตารางราคา smart-ex.jp "As of April 1, 2025", ${TODAY}`,
  },
  {
    item: "โนโซมิ ตู้ธรรมดาที่นั่งแบบจอง ซื้อที่สถานี",
    price: STATION_NOZOMI,
    covers:
      "ค่าโดยสารมาตรฐานของ JR Central ช่วงโตเกียว/ชินางาวะ–เกียวโต บนโนโซมิ ช่วงปกติ ซื้อที่เครื่องขายตั๋วหรือห้องจำหน่ายตั๋ว JR โดย JR Central และ JR West ประกาศว่าค่าที่นั่งจองโนโซมิช่วงนี้จะเพิ่มขึ้น ¥700 สำหรับตั๋วที่ซื้อตั้งแต่ 1 กรกฎาคม 2027 ส่วนค่าที่นั่งแบบไม่จองไม่เปลี่ยน",
    source: `ประกาศของ jr-central.co.jp วันที่ 30 พ.ค. 2023 และ 16 ต.ค. 2026, ${TODAY}`,
  },
  {
    item: "ฮิคาริหรือโคดามะ ตู้ธรรมดาที่นั่งแบบจอง",
    price: HIKARI_RESERVED,
    covers:
      "ที่นั่งแบบเดียวกันบนขบวนที่ช้ากว่า ถูกกว่าโนโซมิ ¥320 เป็นขบวนที่ JAPAN RAIL PASS ใช้ได้โดยไม่ต้องซื้อตั๋วเพิ่ม",
    source: `ตารางราคา smart-ex.jp "As of April 1, 2025", ${NOW}`,
  },
  {
    item: "ตู้ธรรมดาที่นั่งแบบไม่จอง",
    price: NON_RESERVED,
    covers:
      "ขึ้นโนโซมิ ฮิคาริ หรือโคดามะขบวนไหนก็ได้ที่มีตู้ที่นั่งแบบไม่จอง แล้วนั่งที่ว่าง ใช้กับโนโซมิไม่ได้ในช่วงไฮซีซันที่ระบุด้านล่าง เพราะโนโซมิเป็นที่นั่งจองทุกตู้",
    source: `ตารางราคา smart-ex.jp "As of April 1, 2025", ${NOW}`,
  },
  {
    item: "กรีนคาร์ (Green Car) ที่นั่งแบบจอง",
    price: "แพงกว่าตู้ธรรมดาที่นั่งแบบจอง ขายเป็นประเภทแยก",
    covers:
      "หน้าเส้นทางเกียวโตไปโตเกียวของ Klook ขายครบทั้งสามประเภท กรีนคาร์เงียบกว่าและกว้างกว่า และสำหรับวิวภูเขาไฟฟูจิ ตัวอักษรที่นั่งริมหน้าต่างจะเปลี่ยน JR Central ระบุที่นั่ง D ในกรีนคาร์แทนที่นั่ง E",
    source: `หน้ารถไฟของ klook.com และ Shinkansen Perfect Guide ของ JR Central, ${OWN}`,
  },
  {
    item: "ตั๋ว NOZOMI / MIZUHO สำหรับผู้ถือพาส",
    price: `${NOZOMI_TICKET} โตเกียว – เกียวโต`,
    covers:
      "ตั๋วพิเศษที่ผู้ถือ JAPAN RAIL PASS ต้องซื้อทุกครั้งที่นั่งโนโซมิ JR ระบุว่า \"ราคาเท่ากันทั้งตั๋วกรีนคาร์ ตั๋วที่นั่งแบบจองตู้ธรรมดา และตั๋วที่นั่งแบบไม่จองตู้ธรรมดา\" และขาย \"ตั้งแต่ 1 เดือนก่อนวันขึ้นรถจนถึงวันขึ้นรถ\"",
    source: `japanrailpass.net, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS ตู้ธรรมดา",
    price: `${JR_PASS_7} / ¥80,000 / ¥100,000 สำหรับ 7 / 14 / 21 วัน ซื้อออนไลน์`,
    covers:
      "แบบ Exchange Order ที่ซื้อผ่านตัวแทนในต่างประเทศราคา ¥53,000 ¥84,000 และ ¥105,000 แบบกรีนคาร์ราคา ¥70,000 ¥110,000 และ ¥140,000 เมื่อซื้อออนไลน์ และ ¥74,000 ¥116,000 และ ¥147,000 แบบ Exchange Order",
    source: `หน้าราคาของ japanrailpass.net, ${OWN}`,
  },
  {
    item: "สัมภาระขนาดใหญ่ที่ไม่ได้จองที่นั่ง",
    price: `${BAGGAGE_FEE} รวมภาษี`,
    covers:
      "ค่าธรรมเนียมที่ JR เรียกเก็บเมื่อขึ้นรถพร้อมกระเป๋าที่รวมสามด้านเกิน 160 ซม. โดยไม่มีที่นั่งแบบจองที่มีพื้นที่วางสัมภาระ ตัวที่นั่งเองไม่มีค่าใช้จ่ายเพิ่ม ดูหัวข้อสัมภาระด้านล่าง",
    source: `หน้ากฎสัมภาระของ JR Central, ${OWN}`,
  },
];

const compareRows = [
  {
    option: "ตั๋วตู้ธรรมดาที่นั่งแบบจอง 1 ใบ ซื้อล่วงหน้า",
    cost: `โนโซมิ ${NOZOMI_RESERVED} ฮิคาริ ${HIKARI_RESERVED} (smartEX)`,
    gets: "ได้ที่นั่งระบุหมายเลขบนขบวนตรง 2 ชั่วโมง และเรื่องสัมภาระก็เรียบร้อยก่อนออกจากโรงแรม",
    pick: "เป็นตัวเลือกหลัก โดยเฉพาะในเช้าวันสุดท้ายที่เกียวโต เพราะคุณเดินทางพร้อมของทุกอย่างที่ซื้อมา บนขบวนที่พลาดไม่ได้",
  },
  {
    option: "ตู้ธรรมดาที่นั่งแบบไม่จอง ซื้อแล้วขึ้นเลย",
    cost: `${NON_RESERVED} (smartEX)`,
    gets: "ขึ้นขบวนไหนก็ได้ที่มีตู้ที่นั่งแบบไม่จอง เมื่อไปถึงชานชาลา",
    pick: "เหมาะกับวันธรรมดาที่มีแค่กระเป๋าถือ ไม่เหมาะในช่วงไฮซีซันด้านล่าง เพราะโนโซมิไม่มีตู้ที่นั่งแบบไม่จองเลย",
  },
  {
    option: "JAPAN RAIL PASS บนฮิคาริหรือโคดามะ",
    cost: `ออนไลน์ ${JR_PASS_7} แบบ Exchange Order ¥53,000`,
    gets: "เดินทางช่วงนี้โดยไม่ต้องจ่ายเพิ่ม และใช้สายยามาโนเตะกับนาริตะเอ็กซ์เพรสที่โตเกียวได้ด้วย ทั้งฮิคาริ (2 ชม. 24 นาที – 2 ชม. 51 นาที ตามรายการของ JR Central วันที่ 27 พฤศจิกายน) และโคดามะ (3 ชม. 38 นาที) เป็นขบวนตรงทั้งคู่",
    pick: "เฉพาะเมื่อสัปดาห์เดียวกันมีฮิโรชิมะ คานาซาวะ หรือโทโฮคุอยู่แล้ว ตั๋วเที่ยวเดียวเกียวโต–โตเกียวบวกโตเกียว–เกียวโตยังห่างจาก ¥50,000 มาก",
  },
  {
    option: "JAPAN RAIL PASS พร้อมตั๋วโนโซมิ",
    cost: `${JR_PASS_7} บวก ${NOZOMI_TICKET} สำหรับช่วงนี้`,
    gets: "ได้ทั้งพาสและขบวนที่เร็ว ประมาณ 2 ชม. 12 นาที แทน 2 ชม. 24 นาที – 2 ชม. 51 นาทีของฮิคาริ",
    pick: "คุ้มค่าสำหรับช่วงที่ต้องไปขึ้นเครื่องบินหรือมีนัดที่ระบุเวลาในโตเกียว JR ตั้งราคาเท่ากันไม่ว่าจะนั่งกรีนคาร์ ที่นั่งแบบจอง หรือที่นั่งแบบไม่จอง",
  },
  {
    option: "รถบัสกลางคืน",
    cost: "ถูกกว่าค่ารถไฟมาก ใช้เวลาประมาณ 7–8 ชั่วโมง",
    gets: "วิธีที่ถูกที่สุดระหว่างสองเมือง โดยค้างคืนบนรถ",
    pick: "ไม่ค่อยเหมาะเมื่อเดินทางไปโตเกียวพร้อมกระเป๋าใบใหญ่ หน้าเส้นทางโตเกียวไปเกียวโตเปรียบเทียบไว้ครบแล้ว หน้านี้จึงไม่ทำตารางซ้ำ",
  },
];

const buyRows = [
  {
    way: "สรุป: smartEX สำหรับนักท่องเที่ยวส่วนใหญ่",
    price: `โนโซมิที่นั่งแบบจอง ${NOZOMI_RESERVED} ถูกกว่าราคาที่สถานี ${STATION_NOZOMI} อยู่ ¥200`,
    when: "จองล่วงหน้า เลือกที่นั่งจากผัง เปลี่ยนได้ฟรี หรือใช้ Klook ถ้าอยากจ่ายให้เรียบร้อยก่อนเดินทาง",
    board: "ตั๋ว QR หรือบัตร IC ที่ลงทะเบียนไว้",
  },
  {
    way: "smartEX (เว็บไซต์และแอปของ JR Central มีภาษาอังกฤษ)",
    price: `โนโซมิ ${NOZOMI_RESERVED} / ฮิคาริหรือโคดามะ ${HIKARI_RESERVED} / ที่นั่งแบบไม่จอง ${NON_RESERVED}`,
    when: "ตั้งแต่ 05:30 น. หนึ่งปีก่อนเดินทาง (ยืนยันขบวนและที่นั่ง 1 เดือนก่อน) จนถึง 4 นาทีก่อนรถออก เปลี่ยนฟรีก่อนรถออก ค่าธรรมเนียมคืนตั๋ว ¥320",
    board: "สแกนตั๋ว QR หรือแตะบัตร IC ผ่านประตูตรวจตั๋วชินคันเซ็นได้เลย",
  },
  {
    way: "เครื่องขายตั๋วที่สถานีหรือห้องจำหน่ายตั๋ว JR",
    price: `โนโซมิที่นั่งแบบจอง ${STATION_NOZOMI} ช่วงปกติ`,
    when: "ที่นั่งแบบจองเปิดขาย 1 เดือนก่อนวันเดินทาง และเป็นที่ที่ผู้ถือ JR Pass จองที่นั่งและซื้อตั๋ว NOZOMI MIZUHO",
    board: "ใช้ตั๋วกระดาษผ่านประตูตรวจตั๋ว",
  },
  {
    way: "Klook (หน้าเส้นทางเกียวโต–โตเกียว)",
    price: "แสดงตามวันที่บนหน้าสินค้า (ไม่ระบุในหน้านี้)",
    when: "จองเป็นภาษาอังกฤษได้ก่อนเดินทาง หน้าเส้นทางขายที่นั่งแบบไม่จอง ตู้ธรรมดาที่นั่งแบบจอง และกรีนคาร์ที่นั่งแบบจอง",
    board: "ทำตามวิธีรับตั๋วหรือขึ้นรถที่ระบุบนหน้าสินค้า",
  },
];

const arrivalRows = [
  {
    station: "สรุป: สถานีโตเกียว",
    forWho: "นักเดินทางส่วนใหญ่ แต่ลงที่ชินางาวะแทนถ้าจะไปฮาเนดะ ชิบูย่า หรือโอไดบะ",
    why: "เป็นสถานีปลายทาง จึงไม่ต้องคอยดูว่าจะลงสถานีไหน ชินางาวะอยู่ก่อนหน้า 1 สถานี",
    transfer: "ดูสองแถวด้านล่าง",
    source: `รายชื่อสถานีของ JR Central, ${OWN}`,
  },
  {
    station: "สถานีโตเกียว",
    forWho: "มารุโนะอุจิ กินซ่า นิฮงบาชิ อาซากุสะ อุเอโนะ และคนที่บินออกจากนาริตะ",
    why: "เป็นสถานีปลายทาง ไม่มีใครต้องคอยดูป้าย นาริตะเอ็กซ์เพรส สายมารุโนะอุจิ สายยามาโนเตะ สายชูโอ และสายเคโย ออกจากอาคารเดียวกันทั้งหมด และชานชาลาสายโทไกโดอยู่ในอาคาร",
    transfer: "นาริตะเอ็กซ์เพรส JR สายยามาโนเตะ สายชูโอ สายเคโย และ Tokyo Metro สายมารุโนะอุจิ",
    source: `รายชื่อสถานีของ JR Central, ${OWN}`,
  },
  {
    station: "ชินางาวะ",
    forWho: "ชิบูย่า เมกุโระ โอไดบะ โยโกฮาม่า และคนที่บินออกจากฮาเนดะ",
    why: "สถานีก่อนปลายทาง ช่วยให้ไม่ต้องนั่งช่วงสุดท้ายเข้าสถานีโตเกียวและเจอความแออัดที่นั่น รถไฟเคคิวไปฮาเนดะออกจากสถานีเดียวกัน และสายยามาโนเตะถึงชิบูย่าในไม่กี่สถานี",
    transfer: "JR สายยามาโนเตะ และสายเคคิวไปสนามบินฮาเนดะ",
    source: `รายชื่อสถานีของ JR Central, ${OWN}`,
  },
  {
    station: "ชินโยโกฮาม่า",
    forWho: "โยโกฮาม่า มินาโตะมิไร คามาคุระ และพื้นที่ฝั่งตะวันตกเฉียงใต้ทั้งหมด",
    why: "อยู่ก่อนโตเกียว 2 สถานี ถ้าคืนนั้นพักที่โยโกฮาม่าไม่ใช่โตเกียว การลงที่นี่ช่วยให้ไม่ต้องนั่งย้อนกลับเกือบชั่วโมงพร้อมกระเป๋า",
    transfer: "รถไฟสายปกติเข้าเมืองโยโกฮาม่า",
    source: `รายชื่อสถานีของ JR Central, ${OWN}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ชินคันเซ็นจากเกียวโตไปโตเกียวใช้เวลากี่ชั่วโมง",
    a: `ประมาณ 2 ชั่วโมง 12 นาทีด้วยโนโซมิซึ่งเป็นขบวนที่เร็วที่สุด ไม่ต้องเปลี่ยนขบวน โนโซมิทุกขบวนในรายการออกจากเกียวโตของ JR Central วันที่ 27 พฤศจิกายน 2026 ใช้เวลา 2 ชม. 7 นาที ถึง 2 ชม. 15 นาที ฮิคาริใช้ 2 ชม. 24 นาที ถึง 2 ชม. 51 นาที และโคดามะซึ่งจอดทุกสถานีใช้ 3 ชม. 38 นาที ตลอดวันมีโนโซมิชั่วโมงละ 8–12 ขบวน บวกฮิคาริ 2 ขบวนและโคดามะ 1 ขบวน ขบวนแรกไปโตเกียวออก 06:14 น. และขบวนสุดท้ายออก 21:38 น. ถึง 23:45 น. ตรวจสอบเมื่อ ${TODAY} เวลาอาจต่างกันเล็กน้อยตามขบวนและวันที่`,
  },
  {
    q: "ชินคันเซ็น เกียวโต โตเกียว ราคาเท่าไร",
    a: `เที่ยวเดียว ${NOZOMI_RESERVED} สำหรับโนโซมิที่นั่งแบบจองบน smartEX ของ JR Central, ${HIKARI_RESERVED} สำหรับฮิคาริหรือโคดามะ และ ${NON_RESERVED} สำหรับที่นั่งแบบไม่จอง ผู้ใหญ่ 1 คน ช่วงปกติ ตามตารางราคา smartEX "As of April 1, 2025" ตรวจสอบเมื่อ ${TODAY} ถ้าซื้อที่เครื่องขายตั๋วหรือห้องจำหน่ายตั๋วที่สถานี โนโซมิที่นั่งแบบจองราคา ${STATION_NOZOMI} ซึ่งเป็นค่าโดยสารมาตรฐานของ JR Central ที่นั่งแบบจองช่วงโลว์ซีซันถูกกว่า ¥200 และช่วงไฮซีซันแพงกว่า ¥200–¥400 JR Central ประกาศว่าค่าที่นั่งจองโนโซมิช่วงโตเกียว–เกียวโตจะเพิ่มขึ้น ¥700 สำหรับตั๋วที่ซื้อตั้งแต่ 1 กรกฎาคม 2027 ส่วนที่นั่งแบบไม่จองไม่เปลี่ยน`,
  },
  {
    q: "ใช้ JR Pass ขึ้นโนโซมิจากเกียวโตได้ไหม",
    a: `ได้ แต่ต้องจ่ายเพิ่ม ผู้ถือ JAPAN RAIL PASS ต้องซื้อตั๋ว NOZOMI MIZUHO ราคา ${NOZOMI_TICKET} ทุกครั้งที่นั่งโนโซมิระหว่างเกียวโตกับโตเกียว ส่วนฮิคาริและโคดามะใช้ได้โดยไม่ต้องจ่ายเพิ่มและจองที่นั่งฟรี ตั๋วโนโซมิขายตั้งแต่ 1 เดือนก่อนวันเดินทาง และราคาเท่ากันทั้งกรีนคาร์ ที่นั่งแบบจอง และที่นั่งแบบไม่จอง (japanrailpass.net ตรวจสอบเมื่อ ${TODAY}) สำหรับช่วงนี้ช่วงเดียวพาสไม่คุ้มค่า พาสตู้ธรรมดา 7 วันราคา ${JR_PASS_7} เมื่อซื้อออนไลน์ หรือ ¥53,000 แบบ Exchange Order เทียบกับค่าโดยสาร smartEX เที่ยวเดียว ${NOZOMI_RESERVED} พาสเริ่มคุ้มเมื่อสัปดาห์เดียวกันมีฮิโรชิมะ คานาซาวะ หรือโทโฮคุ`,
  },
  {
    q: "ควรจองตั๋วชินคันเซ็นเกียวโตไปโตเกียวล่วงหน้าไหม",
    a: `ควรจองในช่วงไฮซีซัน เมื่อมีกระเป๋าใบใหญ่ หรือเมื่อมีเที่ยวบินหรือโรงแรมในโตเกียวรออยู่ ในวันอื่นตั๋วที่นั่งแบบไม่จอง ${NON_RESERVED} ก็ใช้ได้ เพราะมีโนโซมิออกจากเกียวโตชั่วโมงละ 8–12 ขบวน ในช่วงไฮซีซันของ JR Central โนโซมิเป็นที่นั่งจองทุกตู้ (ช่วงที่เหลือในปี 2026–27: 25 ธ.ค. 2026 – 5 ม.ค. 2027, 9–11 ม.ค. 2027, 20–22 มี.ค. 2027) และกระเป๋าขนาด 161–250 ซม. ต้องมีที่นั่งแบบจองที่มีพื้นที่วางสัมภาระขนาดใหญ่ ซึ่งไม่มีค่าใช้จ่ายเพิ่มจากค่าตั๋ว หรือต้องจ่ายค่าธรรมเนียม ${BAGGAGE_FEE} ถ้าขึ้นรถโดยไม่ได้จอง ที่สถานี ที่นั่งแบบจองเปิดขาย 1 เดือนก่อนวันเดินทาง ส่วน smartEX รับคำขอจองล่วงหน้าได้ถึง 1 ปี และเปลี่ยนได้ฟรีก่อนรถออก ตรวจสอบเมื่อ ${TODAY}`,
  },
  {
    q: "นั่งฝั่งไหนจึงเห็นภูเขาไฟฟูจิเมื่อเดินทางจากเกียวโตไปโตเกียว",
    a: `ฝั่งซ้ายตามทิศทางที่รถวิ่ง จองที่นั่ง E ในตู้ธรรมดา หรือที่นั่ง D ในกรีนคาร์ Shinkansen Perfect Guide ของ JR Central ระบุว่า "ถ้าอยากเห็นภูเขาไฟฟูจิชัดที่สุด ให้เลือกที่นั่ง E ใน Standard Class หรือที่นั่ง D ใน Green Class" ตัวอักษรที่นั่งยึดตามตัวรถ ดังนั้นเมื่อเดินทางจากเกียวโตไปโตเกียว หน้าต่างนั้นจะอยู่ทางซ้ายมือ ในเส้นทางนี้ภูเขาไฟฟูจิจะปรากฏช่วงท้าย คือช่วงชิซึโอกะ–ชินฟูจิ–มิชิมะในหนึ่งในสามส่วนสุดท้ายของการเดินทาง และมักถูกเมฆบัง ตรวจสอบเมื่อ ${OWN}`,
  },
];

const tripPrepItems = [
  withKlookLocale(kyotoToTokyoTripPrep[0], LOCALE, {
    label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    ctaLabel: "ดู Tokyo Subway Ticket →",
    why: "ตั๋วชินคันเซ็นสิ้นสุดที่ประตูตรวจตั๋ว ตั๋วนี้ใช้กับรถไฟใต้ดิน Tokyo Metro และ Toei Subway ได้ทุกสายภายใน 24, 48 หรือ 72 ชั่วโมง สำหรับวันหลังจากเดินทางถึง",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[1], LOCALE, {
    label: "ทัวร์บาร์ฮอปปิงยามค่ำที่ชินจูกุ โตเกียว",
    ctaLabel: "ดูทัวร์ยามค่ำที่ชินจูกุ →",
    why: "ถ้าขึ้นโนโซมิออกจากเกียวโตภายในช่วงบ่าย จะถึงโตเกียวก่อนมืด และชินจูกุอยู่ห่างจากโตเกียวหรือชินางาวะไม่กี่สถานี ทัวร์แบบจอยกรุ๊ป 3 ชั่วโมงที่รวมอาหารและเครื่องดื่มช่วยให้วันที่เดินทางถึงเป็นคืนแรกในโตเกียวได้",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[2], LOCALE, {
    label: "โรงแรมรอบสถานีโตเกียว / มารุโนะอุจิ",
    ctaLabel: "ดูราคาโรงแรมบน Klook →",
    why: "ชินคันเซ็นสายโทไกโดสิ้นสุดในสถานีโตเกียว ห้องพักย่านมารุโนะอุจิจึงเดินจากชานชาลาไปได้ไม่ไกล ไม่ต้องลากกระเป๋าข้ามเมืองตอนท้ายวัน",
  }),
  withKlookLocale(kyotoToTokyoTripPrep[3], LOCALE, {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดู eSIM บน Klook →",
    why: "ที่นั่งของคุณเป็นตั๋ว QR หรือข้อมูลการจองในโทรศัพท์ และการเลือกระหว่างชินางาวะกับสถานีโตเกียวเกิดขึ้นระหว่างที่รถไฟกำลังวิ่ง ทั้งสองอย่างต้องใช้อินเทอร์เน็ตมือถือตั้งแต่ก่อนออกจากเกียวโต",
  }),
  withKlookLocale(luggageDeliveryCards.kyotoToTokyo, LOCALE, {
    label: "บริการส่งกระเป๋า (โรงแรมในโตเกียว ⇔ นาริตะ / ฮาเนดะ)",
    ctaLabel: "ดูบริการส่งกระเป๋าโรงแรม ⇔ สนามบิน →",
    why: "ทริปเกียวโตไปโตเกียวส่วนใหญ่จบที่นาริตะหรือฮาเนดะในอีกหนึ่งหรือสองวัน จองเป็นรายใบ แล้วกระเป๋าจะถูกส่งจากโรงแรมในโตเกียวไปสนามบิน วันเที่ยววันสุดท้ายจึงไม่ต้องลากกระเป๋าไปด้วย",
  }),
];

const stayAreas = [
  withKlookLocale(kyotoToTokyoArrivalStayAreas[0], LOCALE, {
    area: "สถานีโตเกียว / มารุโนะอุจิ",
    why: "ชินคันเซ็นสายโทไกโดสิ้นสุดในอาคารสถานี เมื่อถึงแล้วแค่เดินขึ้นไปชั้นบน ไม่ต้องนั่งรถข้ามเมืองพร้อมกระเป๋า และในวันบินกลับ นาริตะเอ็กซ์เพรสก็ออกจากชั้นใต้ดินของสถานีเดียวกัน",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[1], LOCALE, {
    area: "กินซ่า",
    why: "ห่างจากสถานีโตเกียว 1 สถานีด้วยสายมารุโนะอุจิ และรถไฟวิ่งต่อเนื่องเคคิว–โทเอจากฮาเนดะถึงฮิงาชิกินซ่าโดยไม่ต้องเปลี่ยนขบวน เหมาะเมื่อรถไฟจากเกียวโตเป็นช่วงรองสุดท้ายของทริป",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[2], LOCALE, {
    area: "ชินจูกุ",
    why: "ไม่ใช่สถานีชินคันเซ็น แต่นั่งสายชูโอจากสถานีโตเกียวได้ตรง และเป็นต้นทางของสายชูโอ สายโอดะคิว และสายเคโอ เหมาะถ้ายังอยู่โตเกียวอีกหลายวัน ไม่ใช่แค่คืนเดียวก่อนบิน",
  }),
  withKlookLocale(kyotoToTokyoArrivalStayAreas[3], LOCALE, {
    area: "ชิบูย่า",
    why: "ห่างจากชินางาวะ 2 สถานีด้วยสายยามาโนเตะ ซึ่งชินางาวะเป็นสถานีสายโทไกโดก่อนปลายทาง การลงก่อนจึงพาไปถึงที่พักได้เลย ไม่ต้องย้อนกลับออกจากสถานีโตเกียว",
  }),
];

const tourPicks = [
  withKlookLocale(tokyoPrivateAirportTransfer, LOCALE, {
    title: "รถรับส่งส่วนตัว ฮาเนดะหรือนาริตะ ⇄ โตเกียว",
    desc: "จองรถพร้อมคนขับไปยังที่อยู่โรงแรมของคุณแทนสถานี ใช้ได้จากทั้งสองสนามบิน คนขับติดตามเที่ยวบินให้ ให้บริการ 24 ชั่วโมง มีรถขนาด 7 และ 10 ที่นั่ง",
  }),
  withKlookLocale(tokyoSharedAirportTransfer, LOCALE, {
    title: "รถรับส่งแบบแชร์ นาริตะหรือฮาเนดะ → โตเกียว",
    desc: "บริการแบบเดียวกันที่จองเป็นรายที่นั่งสำหรับนักเดินทาง 1–2 คน ไปยังที่อยู่ในใจกลางโตเกียวแทนการเหมาทั้งคัน",
  }),
  withKlookLocale(naritaLimousineBus, LOCALE, {
    title: "รถบัสลีมูซีนสนามบินนาริตะ – โตเกียว",
    desc: "Airport Limousine ระหว่างอาคารผู้โดยสารทั้งสามของนาริตะกับจุดจอดที่โรงแรมและสถานีในโตเกียว ขึ้นรถด้วย QR code แทนตั๋วกระดาษ",
  }),
  withKlookLocale(hanedaLimousineBus, LOCALE, {
    title: "รถบัสลีมูซีนสนามบินฮาเนดะ – โตเกียว",
    desc: "ผู้ให้บริการเดียวกันจากอาคารผู้โดยสารทั้งสามของฮาเนดะ ปลายทางบนหน้าสินค้ามีทั้งชินจูกุ อิเคบุคุโระ และดิสนีย์รีสอร์ต",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ชินคันเซ็น เกียวโต โตเกียว" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SourcesLine({ what }: { what: string }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      <strong>ตรวจสอบล่าสุด: {TODAY_ISO}</strong> ({what}) หน้าทางการ:{" "}
      {FARE_SOURCES.map((s, i) => (
        <span key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{s.label}</a>
          {i < FARE_SOURCES.length - 1 ? ", " : ""}
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
                    style={{ fontSize: c === 0 ? "0.88rem" : c === row.length - 1 && head.length === 4 ? "0.82rem" : "0.85rem" }}
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

export default function ThKyotoToTokyoShinkansenPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.heroSubtitle}>ออกจากสถานีเกียวโต: เทียบโนโซมิ ฮิคาริ และโคดามะ เทียบ smartEX กับการซื้อที่สถานีและ Klook และควรลงสถานีไหนในโตเกียว</p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคา smartEX พร้อมวันที่ตรวจสอบ", "สถานีเกียวโต ชานชาลา 11–12", "โตเกียว ชินางาวะ หรือชินโยโกฮาม่า"].map((t) => (
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
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>เกียวโต → โตเกียว</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เร็วที่สุด</p>
                <p className={styles.verdictStatValue}>โนโซมิ 2 ชม. 12 นาที (เร็วสุด 2 ชม. 7 นาที) ไม่ต้องเปลี่ยนขบวน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ที่นั่งแบบจอง (smartEX)</p>
                <p className={styles.verdictStatValue}>โนโซมิ {NOZOMI_RESERVED} ฮิคาริ {HIKARI_RESERVED}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ขบวนสุดท้ายไปโตเกียว</p>
                <p className={styles.verdictStatValue}>21:38 น. ถึง 23:45 น.</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ใช้ JR Pass</p>
                <p className={styles.verdictStatValue}>ฮิคาริฟรี โนโซมิจ่ายเพิ่ม {NOZOMI_TICKET}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>ชินคันเซ็น เกียวโต โตเกียว</strong> คือโนโซมิ (Nozomi) ของชินคันเซ็นสายโทไกโด ใช้เวลา <strong>ประมาณ 2 ชั่วโมง 12 นาที</strong> (ขบวนที่เร็วที่สุด 2 ชม. 7 นาที) โดยไม่ต้องเปลี่ยนขบวน ตามข้อมูลการเดินรถของ JR Central (JR โทไก) วันที่ {TODAY} ที่นั่งโนโซมิเที่ยวเดียวราคา <strong>ที่นั่งแบบจอง (Reserved) {NOZOMI_RESERVED}</strong> หรือ <strong>ที่นั่งแบบไม่จอง (Non-reserved) {NON_RESERVED}</strong> บน smartEX ของ JR Central (ผู้ใหญ่ ช่วงปกติ ถ้าซื้อที่สถานี ที่นั่งแบบจอง {STATION_NOZOMI}) จากเกียวโตมี <strong>โนโซมิไปโตเกียวชั่วโมงละ 8–12 ขบวน</strong> ตั้งแต่ 07:00 ถึง 21:00 น. รวมวันละ 151 ขบวน บวกฮิคาริ (Hikari) ชั่วโมงละ 2 ขบวน และโคดามะ (Kodama) ชั่วโมงละ 1 ขบวน
            </p>
            <p className={styles.verdictText}>
              ถ้ามี <strong>JAPAN RAIL PASS</strong> ฮิคาริและโคดามะไม่ต้องจ่ายเพิ่ม ส่วนโนโซมิต้องซื้อตั๋ว NOZOMI MIZUHO ราคา <strong>{NOZOMI_TICKET}</strong> ทุกครั้งที่นั่ง (japanrailpass.net, {TODAY}) ขบวนออกจากชานชาลา 11 และ 12 ฝั่งฮาจิโจ (ทิศใต้) ของสถานีเกียวโต และขบวนสุดท้ายไปโตเกียวออก 21:38 น. หน้านี้เป็นการเดินทางไปโตเกียว ถ้าเดินทางทางกลับ ดู{" "}
              <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>
                โตเกียวไปเกียวโต (ภาษาอังกฤษ)
              </Link>
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋วชินคันเซ็นเกียวโต → โตเกียว →
              </KlookLink>
              <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูราคา JAPAN RAIL PASS →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          headingLevel={3}
          label="จองพร้อมตั๋วรถไฟ"
          heading="จองในวันเดียวกัน: ตั๋วรถไฟใต้ดิน ทัวร์ยามค่ำในโตเกียว โรงแรม eSIM"
          intro="รถไฟสิ้นสุดในสถานีโตเกียว ตั๋วรถไฟใต้ดินสำหรับวันต่อ ๆ ไป ทัวร์ในค่ำแรก ห้องพักใกล้ชานชาลา อินเทอร์เน็ตมือถือระหว่างเดินทาง และบริการส่งกระเป๋าในวันไปสนามบิน เป็นสิ่งที่ตั๋วชินคันเซ็นไม่ได้รวมไว้"
          items={tripPrepItems}
        />

        <BookingEsimCard />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ชินคันเซ็นเกียวโตไปโตเกียวต่างจากโตเกียวไปเกียวโตอย่างไร</h2>
          <p className={styles.bodyText}>รถไฟเป็นขบวนเดียวกันและเส้นทางก็เป็นสายเดียวกัน สิ่งที่เปลี่ยนคือทุกอย่างรอบ ๆ เมื่อไปทางตะวันตก คุณมักออกจากสถานีที่ใกล้โรงแรม ไปถึงสถานีปลายทางแห่งเดียว และเห็นภูเขาไฟฟูจิทางขวาหลังออกเดินทางราว 40 นาที เมื่อไปทางตะวันออก คุณออกเดินทางในเช้าวันสุดท้ายที่เกียวโต จากชานชาลาอีกฝั่งของสถานีขนาดใหญ่มาก พร้อมสัมภาระมากกว่าตอนมา และไปถึงเมืองที่มีสถานีชินคันเซ็นสามแห่ง ซึ่งมักมีเพียงแห่งเดียวที่เหมาะกับคุณ</p>
          <p className={styles.bodyText}>
            หน้านี้จึงจัดตามสี่เรื่องที่ต้องตัดสินใจเฉพาะในทิศทางนี้ ได้แก่ <strong>ใช้ประตูตรวจตั๋วและชานชาลาไหนที่สถานีเกียวโต</strong> <strong>จัดการกระเป๋าอย่างไรหลังเช็กเอาต์</strong> <strong>ภูเขาไฟฟูจิอยู่ฝั่งไหนเมื่อเดินทางในทิศตรงข้าม</strong> และ <strong>ควรลงที่โตเกียว ชินางาวะ หรือชินโยโกฮาม่า</strong> เรื่องการเลือกตั๋วเหมือนกันทั้งสองทิศทางและอธิบายไว้ด้านล่าง ส่วนการเปรียบเทียบชินคันเซ็นกับรถบัสอยู่ในหน้าเส้นทางโตเกียวไปเกียวโต หน้านี้จึงใส่ลิงก์แทนการทำตารางซ้ำ
          </p>
          <p className={styles.bodyText}>
            เรื่องที่ควรรู้ก่อนอย่างอื่น: ขบวนไปโตเกียวหมดเร็วกว่าที่หลายคนคิด ตารางเวลาสถานีเกียวโตของ JR West วันที่ 11 พฤศจิกายน 2026 ระบุขบวนสุดท้ายไปโตเกียวเวลา <strong>21:38 น.</strong> ถึงโตเกียว 23:45 น. ถ้าวันนี้เป็นวันเดินทางและมีเที่ยวบินรออยู่ เวลานี้มีผลต่อแผนมากกว่าค่าโดยสาร
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>รถไฟ</span>
          <h2 className={styles.sectionTitle}>ชินคันเซ็นจากเกียวโตไปโตเกียวใช้เวลากี่ชั่วโมง</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            โนโซมิประมาณ 2 ชม. 12 นาที ฮิคาริ 2 ชม. 24 นาที ถึง 2 ชม. 51 นาที และโคดามะ 3 ชม. 38 นาที ทั้งหมดเป็นขบวนตรง ไม่ต้องเปลี่ยนขบวน เวลาและจำนวนขบวนด้านล่างนับจากขบวนไปโตเกียวทุกขบวนในรายการออกจากเกียวโตของ JR Central วันที่ 27 พฤศจิกายน 2026 ส่วนค่าโดยสารเป็นราคา smartEX ของ JR Central สำหรับผู้ใหญ่ 1 คน ช่วงปกติ ตรวจสอบทั้งหมดเมื่อ {TODAY}
          </p>
          <Table
            head={["ขบวน", "เกียวโต → โตเกียว", "จำนวนขบวนจากเกียวโต", "ที่นั่งแบบจอง (smartEX)", "ที่นั่งแบบไม่จอง (smartEX)", "ใช้ JR Pass"]}
            rows={trainTypeRows.map((r) => [r.train, r.time, r.count, r.reserved, r.nonReserved, r.pass])}
          />
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
            <strong>กระเป๋าใบใหญ่:</strong> กระเป๋าที่รวมสามด้าน 161–250 ซม. ต้องจอง &ldquo;ที่นั่งที่มีพื้นที่วางสัมภาระขนาดใหญ่&rdquo; พร้อมตั๋วโดยไม่มีค่าใช้จ่ายเพิ่ม ถ้าขึ้นรถโดยไม่ได้จอง JR Central เรียกเก็บค่าธรรมเนียม {BAGGAGE_FEE} รวมภาษี ไม่เกิน 160 ซม. ไม่ต้องจอง และเกิน 250 ซม. นำขึ้นรถไม่ได้
          </p>
          <SourcesLine what="เวลาและจำนวนขบวนจากรายการออกจากเกียวโตของ JR Central ราคา smartEX ตั๋วสำหรับ JR Pass และกฎสัมภาระของ JR Central" />
          <p className={styles.bodyText} style={{ margin: "1rem 0" }}>ข้อมูลอื่นของเส้นทาง รวมถึงขบวนแรก ขบวนสุดท้าย และสถานีก่อนถึงโตเกียว:</p>
          <Table
            head={["หัวข้อ", "ข้อมูล", "หมายความว่าอย่างไร", "แหล่งข้อมูลและวันที่ตรวจสอบ"]}
            rows={routeRows.map((r) => [r.item, r.value, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            วิธีการทำงานของตั๋วชินคันเซ็นโดยทั่วไป ทั้งค่าโดยสารสองส่วน ประเภทที่นั่ง และขบวนที่พาสใช้ได้หรือไม่ได้ อธิบายไว้ใน{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>ไกด์ชินคันเซ็น (ภาษาอังกฤษ)</Link>{" "}
            ส่วน{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>โตเกียวไปเกียวโต (ภาษาอังกฤษ)</Link>{" "}
            เป็นเส้นทางเดียวกันในทิศทางกลับ พร้อมเทียบราคารถบัสกลางคืนกับรถไฟ ถ้าออกจากโอซาก้าแทน{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>ไกด์ราคาและเวลาชินคันเซ็นโตเกียว–โอซาก้า (ภาษาอังกฤษ)</Link>{" "}
            มีค่าโดยสารชินโอซาก้าทุกประเภทที่นั่ง
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋วเกียวโต → โตเกียว →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ชินคันเซ็น เกียวโต โตเกียว ราคาเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            เที่ยวเดียว <strong>{NOZOMI_RESERVED}</strong> สำหรับโนโซมิตู้ธรรมดาที่นั่งแบบจอง <strong>{HIKARI_RESERVED}</strong> สำหรับฮิคาริหรือโคดามะ และ <strong>{NON_RESERVED}</strong> สำหรับที่นั่งแบบไม่จอง เป็นราคา smartEX ของ JR Central สำหรับผู้ใหญ่ 1 คน ช่วงปกติ จากตารางราคาที่ระบุ &ldquo;As of April 1, 2025&rdquo; และตรวจสอบอีกครั้งเมื่อ {TODAY} ถ้าซื้อที่เครื่องขายตั๋วหรือห้องจำหน่ายตั๋วที่สถานี โนโซมิที่นั่งแบบจองราคา <strong>{STATION_NOZOMI}</strong> แถวสำหรับผู้ถือพาสเป็นตัวเลขของ japanrailpass.net
          </p>
          <Table
            head={["ตั๋ว", "ราคา", "รายละเอียด", "แหล่งข้อมูลและวันที่ตรวจสอบ"]}
            rows={priceRows.map((r) => [r.item, r.price, r.covers, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ราคาอาจเปลี่ยนแปลง ควรตรวจสอบก่อนซื้อ ราคา smartEX เป็นราคาผู้ใหญ่ 1 คน เที่ยวเดียว ตามกฎฤดูกาลของ smartEX ที่นั่งแบบจองช่วงโลว์ซีซันถูกกว่า ¥200 และช่วงไฮซีซันแพงกว่า หน้านี้ไม่ได้ระบุราคา Klook เพราะราคา Klook เปลี่ยนตามวันที่ ให้ดูราคาสำหรับวันเดินทางของคุณบนหน้าสินค้า
          </p>
          <SourcesLine what="ตารางราคา smartEX ประกาศปรับค่าโดยสารของ JR Central และ japanrailpass.net" />
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ตั๋ว</span>
          <h2 className={styles.sectionTitle}>จองตั๋วชินคันเซ็นเกียวโตไปโตเกียวได้ที่ไหน</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ซื้อผ่าน smartEX ของ JR Central จะได้ราคาปกติที่ถูกที่สุด คือ {NOZOMI_RESERVED} เทียบกับ {STATION_NOZOMI} สำหรับที่นั่งโนโซมิเดียวกันที่สถานี หรือซื้อผ่าน Klook ถ้าอยากจัดการให้เรียบร้อยก่อนเดินทาง เครื่องขายตั๋วและห้องจำหน่ายตั๋วที่สถานีเป็นที่ที่ผู้ถือ JR Pass จองที่นั่ง และเป็นที่ที่ทุกคนซื้อตั๋วในวันเดินทางได้
          </p>
          <Table
            head={["ซื้อที่ไหน", "ราคา (ผู้ใหญ่ ช่วงปกติ)", "ช่วงเวลาจองและการเปลี่ยนตั๋ว", "ที่ประตูตรวจตั๋ว"]}
            rows={buyRows.map((r) => [r.way, r.price, r.when, r.board])}
          />
          <SourcesLine what="กฎการจองของ smartEX ราคาที่สถานี และตั๋วสำหรับ JR Pass ประเภทที่นั่งของ Klook จากหน้ารถไฟ วันที่ 29 ต.ค. 2026" />
          <p className={styles.bodyText}>
            เรื่องที่คำตอบสั้น ๆ ไม่ได้บอก: ในช่วงไฮซีซันด้านล่าง ที่นั่งโนโซมิทั้งหมดเป็นที่นั่งแบบจอง จึงควรจองทันทีที่วันเดินทางแน่นอน smartEX เปลี่ยนได้ฟรีจนถึงเวลารถออก ส่วนการคืนตั๋วก่อนรถออกมีค่าธรรมเนียม ¥320 และกระเป๋าที่เกิน 160 ซม. ต้องใช้ที่นั่งที่มีพื้นที่วางสัมภาระขนาดใหญ่ ซึ่ง JR Central ขายที่ห้องจำหน่ายตั๋ว เครื่องขายตั๋วที่นั่งจอง และออนไลน์ ดูวิธีใช้ตั๋วแต่ละประเภทได้ใน{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>ไกด์ชินคันเซ็น (ภาษาอังกฤษ)</Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูที่นั่งเกียวโต → โตเกียว บน Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เปรียบเทียบ</span>
          <h2 className={styles.sectionTitle}>ใช้ JR Pass ขึ้นโนโซมิจากเกียวโตได้ไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ได้ แต่ต้องจ่ายเพิ่ม ผู้ถือพาสต้องซื้อตั๋ว NOZOMI/MIZUHO ราคา <strong>{NOZOMI_TICKET}</strong> ทุกครั้งที่นั่งโนโซมิไปโตเกียว ส่วนฮิคาริและโคดามะใช้ได้และจองที่นั่งฟรี อย่างไรก็ตาม การซื้อพาสเพื่อช่วงนี้ช่วงเดียวไม่คุ้มค่า <strong>JAPAN RAIL PASS</strong> ตู้ธรรมดา 7 วันราคา {JR_PASS_7} เมื่อซื้อออนไลน์ และ ¥53,000 แบบ Exchange Order ที่ซื้อจากต่างประเทศ เทียบกับค่าโดยสาร smartEX โนโซมิเที่ยวเดียว {NOZOMI_RESERVED} แม้ไปกลับระหว่างสองเมืองก็ยังไม่ถึงราคาพาส สิ่งที่เปลี่ยนคำตอบคือแผนเที่ยวที่เหลือในสัปดาห์นั้น และการใช้ JR เมื่ออยู่ในโตเกียว
          </p>
          <Table
            head={["ตัวเลือก", "ค่าใช้จ่าย", "ได้อะไร", "เลือกเมื่อไร"]}
            rows={compareRows.map((r) => [r.option, r.cost, r.gets, r.pick])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            กฎที่ JR เขียนไว้เอง: การนั่งโนโซมิหรือมิซุโฮด้วยพาสต้องใช้ตั๋วพิเศษที่ออกให้เฉพาะผู้ถือ JAPAN RAIL PASS และ &ldquo;ราคาเท่ากันทั้งตั๋วกรีนคาร์ ตั๋วที่นั่งแบบจองตู้ธรรมดา และตั๋วที่นั่งแบบไม่จองตู้ธรรมดา&rdquo; สำหรับโตเกียว–เกียวโต ตั๋วนี้ราคา <strong>{NOZOMI_TICKET}</strong> และขาย &ldquo;ตั้งแต่ 1 เดือนก่อนวันขึ้นรถจนถึงวันขึ้นรถ&rdquo; ที่เครื่องขายตั๋วที่นั่งจอง ห้องจำหน่ายตั๋ว JR และ Travel Center{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>ไกด์ราคา JR Pass (ภาษาอังกฤษ)</Link>{" "}
            เทียบราคาเดือนตุลาคม 2026 กับเส้นทางของคุณเอง และ{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" style={linkStyle}>แผนเที่ยว 7 วัน โตเกียว–เกียวโต–โอซาก้า (ภาษาอังกฤษ)</Link>{" "}
            เป็นรูปแบบทริปที่พาสคุ้มค่าบ่อยที่สุด
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={JR_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 วัน) →
            </KlookLink>
            <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูราคาตั๋วเที่ยวเดียวแทน →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>วิวระหว่างทาง</span>
          <h2 className={styles.sectionTitle}>นั่งฝั่งไหนจึงเห็นภูเขาไฟฟูจิเมื่อเดินทางจากเกียวโตไปโตเกียว</h2>
          <p className={styles.bodyText}>
            <strong>ฝั่งซ้าย</strong> ตามทิศทางที่รถวิ่ง และตัวอักษรที่นั่งที่ต้องจองเหมือนกับทิศทางกลับ Shinkansen Perfect Guide ของ JR Central ระบุไว้โดยไม่มีเงื่อนไขว่า &ldquo;ถ้าอยากเห็นภูเขาไฟฟูจิชัดที่สุด ให้เลือกที่นั่ง E ใน Standard Class หรือที่นั่ง D ใน Green Class&rdquo; ไม่ได้บอกว่าซ้ายหรือขวา และไม่จำเป็นต้องบอก เพราะตัวอักษรที่นั่งยึดตามตัวรถ ไม่ได้ขึ้นกับทิศทางที่รถวิ่ง หน้าต่างที่นั่ง E และ D จึงหันไปด้านเดียวกันของรถทุกเที่ยว เมื่อเดินทางจากโตเกียวไปทางตะวันตก ด้านนั้นคือขวามือ เมื่อเดินทางจากเกียวโตไปทางตะวันออก ด้านนั้นคือซ้ายมือ
          </p>
          <p className={styles.bodyText}>
            จังหวะเวลาก็กลับด้านเช่นกัน ไปทางตะวันตกจะเห็นภูเขาไฟฟูจิเร็ว ไปทางตะวันออกจะเห็นช้า ตามลำดับสถานีของ JR Central ภูเขาไฟฟูจิอยู่ช่วง <strong>ชิซึโอกะ–ชินฟูจิ–มิชิมะ</strong> ซึ่งเมื่อออกจากเกียวโตคือหนึ่งในสามส่วนสุดท้ายของการเดินทาง ไม่ใช่ส่วนแรก ถ้าตั้งใจจะงีบ ให้งีบช่วงต้น
          </p>
          <p className={styles.bodyText}>
            และข้อจำกัดที่การจองช่วยไม่ได้: ภูเขาไฟฟูจิมักมองไม่เห็น เช้าฤดูหนาวที่อากาศแจ่มใสและแห้งมีโอกาสดีที่สุด บ่ายฤดูร้อนที่มีหมอกควันมีโอกาสน้อยที่สุด ที่นั่งริมหน้าต่างคุ้มที่จะจอง แต่ไม่คุ้มที่จะจ่ายเพิ่มเป็นกรีนคาร์เพื่อวิวที่ขึ้นกับสภาพอากาศ ตรวจสอบเมื่อ {OWN}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ออกจากเกียวโต</span>
          <h2 className={styles.sectionTitle}>ชินคันเซ็นไปโตเกียวออกจากชานชาลาไหนที่สถานีเกียวโต</h2>
          <p className={styles.bodyText}>
            <strong>ชานชาลา 11 หรือ 12</strong> ขบวนไปโตเกียวทุกขบวนในตารางเวลาสถานีเกียวโตของ JR West วันที่ 11 พฤศจิกายน 2026 อยู่ที่ชานชาลาใดชานชาลาหนึ่งในสองนี้ ชานชาลาอยู่หลังประตูตรวจตั๋วชินคันเซ็นของตัวเองทาง <strong>ฝั่งฮาจิโจ (ทิศใต้)</strong> ของสถานี ซึ่งอยู่คนละฝั่งกับทางออกกลางฝั่งเหนือ ท่ารถเมล์ประจำทาง และเกียวโตทาวเวอร์ ประตูที่ควรใช้ขึ้นกับว่าคุณมาถึงสถานีด้วยวิธีใด:
          </p>
          <Table
            head={["คุณอยู่ที่ไหน", "ใช้ทางไหน", "สิ่งที่ควรรู้", "แหล่งข้อมูลและวันที่ตรวจสอบ"]}
            rows={stationRows.map((r) => [r.item, r.answer, r.detail, r.source])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            เหตุผลที่เรื่องนี้ควรเป็นตาราง ไม่ใช่แค่หมายเหตุ: ถ้าเช้าวันสุดท้ายที่เกียวโตจบลงที่ฝั่งเหนือ เช่น ตลาดนิชิกิ รถไฟใต้ดินสายคาราสุมะ หรือรถเมล์ประจำทางเกือบทุกสาย คุณต้องเดินหลายนาทีผ่านโถงที่คนพลุกพล่านที่สุดแห่งหนึ่งในญี่ปุ่นก่อนถึงประตูตรวจตั๋ว ถ้ามีกระเป๋าเดินทางในวันเดินทาง ให้เผื่อเวลานี้ไว้
          </p>
          <p className={styles.bodyText}>
            ส่วนกระเป๋ามีสามทางเลือกที่ใช้ได้จริง ฝากไว้ที่ห้องเก็บกระเป๋าของโรงแรมหลังเช็กเอาต์แล้วกลับมารับก่อนไปสถานี นำไปที่สถานีเกียวโตแล้วใช้ล็อกเกอร์หรือบริการรับฝากที่มีพนักงาน หรือส่งไปโรงแรมในโตเกียวด้วยบริการส่งพัสดุ (takkyubin) ซึ่งคนที่มีกระเป๋ามากกว่ามือมักเลือก และไม่ต้องจองที่นั่งสำหรับสัมภาระขนาดใหญ่บนชินคันเซ็นเลย ค่าบริการและเวลาปิดรับต่างกันไปตามโรงแรมและเคาน์เตอร์ หน้านี้จึงไม่ระบุ ให้สอบถามที่แผนกต้อนรับในคืนก่อนหน้า และยืนยันว่าโรงแรมในโตเกียวรับพัสดุได้
          </p>
          <p className={styles.bodyText}>
            เรื่องการเดินทางในเกียวโตเช้าวันนั้น ทั้งรถเมล์สายไหน รถไฟใต้ดินสายไหน และควรซื้อบัตรรายวันสำหรับครึ่งวันหรือไม่ ดู{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>การเดินทางในเกียวโต (ภาษาอังกฤษ)</Link>{" "}
            และ{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass" style={linkStyle}>ไกด์บัตรรถไฟใต้ดินและรถเมล์เกียวโต (ภาษาอังกฤษ)</Link>{" "}
            และถ้ารถไฟขบวนนี้ปิดทริปเกียวโตช่วงสั้น ๆ{" "}
            <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>แผนเที่ยวเกียวโต 3 วัน (ภาษาอังกฤษ)</Link>{" "}
            ช่วยวางแผนวันก่อนหน้านั้น
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เดินทางถึง</span>
          <h2 className={styles.sectionTitle}>ควรลงที่สถานีโตเกียว ชินางาวะ หรือชินโยโกฮาม่า</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ลงสถานีที่ใกล้ที่พักหรือสนามบินของคุณที่สุด ตามรายชื่อสถานีของ JR Central เส้นทางผ่าน <strong>ชินโยโกฮาม่า แล้วชินางาวะ แล้วจึงโตเกียว</strong> ตัวเลือกสองในสามแห่งจึงมาก่อนสถานีปลายทาง และการลงก่อนมักใช้เวลาไปถึงจุดหมายสั้นกว่า
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ลงที่", "เหมาะกับ", "เหตุผล", "เปลี่ยนไปสาย", "แหล่งข้อมูลและวันที่ตรวจสอบ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {arrivalRows.map((row) => (
                    <tr key={row.station}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.station}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.forWho}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.transfer}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>ตรวจสอบล่าสุด: {OWN_ISO}</strong> (ลำดับสถานีของชินคันเซ็นสายโทไกโด) หน้าทางการ:{" "}
            <a href="https://global.jr-central.co.jp/en/" target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>
              JR Central (global.jr-central.co.jp)
            </a>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            ข้อสังเกตหนึ่งที่ควรชั่งน้ำหนักกับทั้งหมดข้างต้น: สถานีปลายทางเป็นตัวเลือกที่ง่ายเพราะพลาดไม่ได้ ถ้าเหนื่อย มีของเยอะ หรือเดินทางกับเด็ก การลงที่สถานีโตเกียวก็ไม่ใช่ทางเลือกที่ผิด แม้ชินางาวะจะใกล้กว่าก็ตาม{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>ไกด์ย่านที่พักในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            เปรียบเทียบย่านต่าง ๆ ไว้ และ{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={linkStyle}>ไกด์การเดินทางจากสนามบินโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            อธิบายการเดินทางไปนาริตะและฮาเนดะจากแต่ละย่าน
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การจอง</span>
          <h2 className={styles.sectionTitle}>ควรจองตั๋วชินคันเซ็นเกียวโตไปโตเกียวล่วงหน้าไหม</h2>
          <p className={styles.bodyText}>
            ควรจองล่วงหน้าในช่วงไฮซีซันด้านล่าง เมื่อมีกระเป๋าเกิน 160 ซม. หรือเมื่อมีเที่ยวบินรออยู่ที่โตเกียว ในวันอื่น ตั๋วที่นั่งแบบไม่จอง {NON_RESERVED} ใช้ได้ เพราะมีโนโซมิชั่วโมงละ 8–12 ขบวน ที่สถานี ที่นั่งแบบจองเปิดขาย 1 เดือนก่อนวันเดินทาง ส่วน smartEX รับคำขอจองล่วงหน้าได้ถึง 1 ปี
          </p>
          <div style={{ margin: "1rem 0" }}>
            <Table
              head={["สถานการณ์", "ควรทำอย่างไร", "รายละเอียด", "แหล่งข้อมูลและวันที่ตรวจสอบ"]}
              rows={bookingRows.map((r) => [r.item, r.answer, r.detail, r.source])}
            />
          </div>
          <p className={styles.bodyText}>
            นอกช่วงไฮซีซัน ซื้อตั๋วแล้วขึ้นได้เลย ตามรายการของ JR Central วันที่ 27 พฤศจิกายน 2026 มี <strong>ขบวนจากเกียวโตไปโตเกียววันละ 193 ขบวน</strong> การไปถึงแล้วขึ้นขบวนถัดไปด้วยตั๋วที่นั่งแบบไม่จองจึงเป็นแผนที่ใช้ได้จริง แต่ในแปดช่วงของปีไม่มีทางเลือกนี้ JR Central ให้ <strong>โนโซมิเป็นที่นั่งจองทุกตู้</strong> ตลอดช่วงไฮซีซัน ขบวนเร็วไปโตเกียวในวันเหล่านั้นจึงไม่มีที่นั่งแบบไม่จองเลย ตรวจสอบจากหน้าทางการของ JR Central เมื่อ {OWN}:
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
            ข้อความภาษาอังกฤษของ JR Central ระบุว่า &ldquo;ในช่วงไฮซีซัน โนโซมิไม่มีที่นั่งแบบไม่จอง&rdquo; ขณะที่ &ldquo;ฮิคาริ โคดามะ มิซุโฮ ซากุระ และสึบาเมะ มีที่นั่งแบบไม่จองตามปกติ&rdquo; พร้อมคำเตือนว่าที่นั่งแบบไม่จองบนฮิคาริและโคดามะ &ldquo;อาจแออัดมากในช่วงไฮซีซัน&rdquo; ดังนั้นในช่วงโกลเดนวีกก็ยังมีขบวนที่ซื้อแล้วขึ้นได้ แต่ช้ากว่าและอาจต้องยืน
          </p>
          <p className={styles.bodyText}>
            นอกช่วงเหล่านั้นก็ยังมีเหตุผลสองข้อที่ควรจองช่วงนี้ และทั้งสองข้อเกิดเฉพาะในทิศทางนี้ การออกจากเกียวโตมักเป็นเช้าวันสุดท้ายของทริป มีโรงแรมในโตเกียวหรือเที่ยวบินรออยู่ และไม่มีขบวนหลังจากนั้นให้แก้ไขความผิดพลาด อีกข้อคือคุณมีของมากกว่าตอนมา ที่นั่งระบุหมายเลข และพื้นที่วางสัมภาระถ้าจำเป็น จึงคุ้มกับเงินไม่กี่ร้อยเยน ถ้ามี <strong>JAPAN RAIL PASS</strong> การจองที่นั่งเองก็ฟรี จึงไม่มีเหตุผลที่จะไม่จอง
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>สัมภาระ</span>
          <h2 className={styles.sectionTitle}>วางกระเป๋าใบใหญ่บนชินคันเซ็นได้ที่ไหน</h2>
          <p className={styles.bodyText}>
            กระเป๋าที่รวมสามด้าน <strong>ไม่เกิน 160 ซม.</strong> วางบนชั้นเหนือศีรษะหรือที่เท้า ไม่ต้องจองและไม่ต้องจ่าย ถ้าใหญ่กว่านั้น หน้ากฎสัมภาระของ JR Central กำหนดให้ใช้ที่นั่งแบบจองที่มีพื้นที่วางสัมภาระขนาดใหญ่ สัมภาระที่รวม <strong>161 ถึง 250 ซม.</strong> ต้องวางในพื้นที่สัมภาระด้านหลังที่นั่งประเภทนี้ ที่นั่งไม่มีค่าใช้จ่ายเพิ่ม JR ระบุว่าตั๋วนี้ &ldquo;ราคาเท่ากับที่นั่งแบบจองในตู้ธรรมดาและกรีนคาร์&rdquo;
          </p>
          <p className={styles.bodyText}>
            ถ้าขึ้นรถพร้อมกระเป๋าใบใหญ่โดยไม่ได้จอง จะมี <strong>ค่าธรรมเนียมสัมภาระ {BAGGAGE_FEE} รวมภาษี</strong> จองที่นั่งได้ที่ห้องจำหน่ายตั๋วโดยขอที่นั่งที่มีพื้นที่วางสัมภาระขนาดใหญ่ ที่เครื่องขายตั๋วที่นั่งจอง หรือออนไลน์ กฎนี้ใช้กับชินคันเซ็นสายโทไกโด ซันโย และคิวชู ซึ่งรวมการเดินทางนี้ด้วย ตรวจสอบเมื่อ {OWN}
          </p>
          <p className={styles.bodyText}>
            กฎนี้มีผลมากกว่าตอนออกจากเกียวโตเมื่อเทียบกับตอนมาถึง กระเป๋าโหลดใต้เครื่องส่วนใหญ่ไม่เกิน 160 ซม. แต่ของที่ซื้อระหว่างทริป รถเข็นเด็กที่ใส่ถุง กระเป๋าสกี หรือถุงกอล์ฟมักเกิน และที่นั่งที่มีพื้นที่สัมภาระมีเฉพาะในตู้ที่นั่งแบบจอง ตั๋วที่นั่งแบบไม่จองจึงเลี่ยงกฎนี้ไม่ได้ ถ้าขนาดก้ำกึ่ง การส่งกระเป๋าใบใหญ่ไปโตเกียวด้วยบริการส่งพัสดุถูกกว่าไปรู้คำตอบที่ประตูตรวจตั๋ว
          </p>
        </section>

        <KlookTourPicks
          heading="อีกครึ่งหนึ่งของวันเดินทางเกียวโต → โตเกียว"
          intro="การออกจากเกียวโตมักจบที่โรงแรมในโตเกียวหรือสนามบิน และช่วงที่สองนี้คือช่วงที่คนมักไม่ได้วางแผน นี่คือสี่ตัวเลือกสำหรับช่วงนั้น ทั้งหมดรับที่โตเกียวหรือชินางาวะ รถส่วนตัวถ้ามาถึงพร้อมกระเป๋าทั้งหมด รถรับส่งแบบแชร์ถ้าไม่ได้มีของมาก และรถบัสลีมูซีนจากทั้งสองสนามบินสำหรับวันบินกลับ เปิดหน้าสินค้าเพื่อดูที่ว่างและราคาปัจจุบันในวันเดินทางของคุณ"
          tours={tourPicks}
        />

        <KlookStayAreas
          heading="ที่พักฝั่งโตเกียว"
          intro="จัดลำดับตาม 20 นาทีหลังชินคันเซ็นมาถึง ไม่ใช่ตามทริปโตเกียวทั้งทริป จึงต่างจากรายการทั่วไป มารุโนะอุจิอยู่อันดับแรกเพราะชานชาลาสายโทไกโดอยู่ในอาคารสถานี และชิบูย่าอยู่ในรายการเพราะรถไฟจอดที่ชินางาวะก่อนถึงสถานีปลายทาง"
          areas={stayAreas}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ก่อนขึ้นรถ</span>
          <h2 className={styles.sectionTitle}>สิ่งหนึ่งที่ควรเตรียมก่อนเช้าวันสุดท้ายที่เกียวโต</h2>
          <p className={styles.bodyText}>
            อินเทอร์เน็ตมือถือ เพราะวันเดินทางต้องเปิดดูข้อมูลตลอด ที่นั่งของคุณเป็น QR code หรือข้อมูลการจองที่ต้องแสดง โถงสถานีเกียวโตเป็นที่ที่คุณต้องใช้แผนที่แทนการเดา และเมื่อใกล้ถึง คุณต้องตัดสินใจระหว่างชินางาวะกับโตเกียวขณะที่รถไฟยังวิ่งอยู่ eSIM ที่เปิดใช้งานก่อนเดินทางทำให้ทุกอย่างดูได้ในโทรศัพท์ทันที{" "}
            <KlookLink href={ESIM_URL} target="_blank" rel={KLOOK_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              ดูตัวเลือก eSIM บน Klook →
            </KlookLink>{" "}
            <Link href="/th/guides/esim/best-esim-japan" style={linkStyle}>ไกด์เลือก eSIM ญี่ปุ่น</Link>{" "}
            เปรียบเทียบกับตัวเลือกอื่น และ{" "}
            <Link href="/guides/transport/ic-cards-japan" style={linkStyle}>ไกด์บัตร IC (ภาษาอังกฤษ)</Link>{" "}
            อธิบายว่าทำไม ICOCA ยังใช้ผ่านประตูตรวจตั๋วสายยามาโนเตะที่โตเกียวได้ แต่ใช้ขึ้นชินคันเซ็นไม่ได้
          </p>
        </section>

        <Related
          items={[
            { href: "/guides/attractions/kyoto-day-trip-from-tokyo", title: "เที่ยวเกียวโตไปกลับจากโตเกียว: รถไฟ ค่าใช้จ่าย แผนเที่ยว 2026 (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-to-kyoto", title: "โตเกียวไปเกียวโต 2026: วิธีที่ถูกที่สุดและเร็วที่สุด (ภาษาอังกฤษ)" },
            { href: "/guides/transport/shinkansen-guide", title: "ไกด์ชินคันเซ็น 2026: ตั๋ว พาส และเคล็ดลับสำหรับมือใหม่ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/jr-pass-guide", title: "ไกด์ JR Pass 2026: ราคา คุ้มไหม และวิธีซื้อ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "ชินคันเซ็นโตเกียว–นาโกย่า: เวลา ค่าโดยสาร JR Pass (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-to-hiroshima-shinkansen", title: "ชินคันเซ็นโตเกียว–ฮิโรชิมะ: เวลา ค่าโดยสาร JR Pass (ภาษาอังกฤษ)" },
            { href: "/guides/transport/kyoto-transportation", title: "การเดินทางในเกียวโต 2026: รถเมล์ รถไฟ แท็กซี่ (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/where-to-stay-in-tokyo", title: "พักย่านไหนในโตเกียว 2026: เทียบตามสายรถไฟและสนามบิน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "แผนเที่ยว 7 วัน โตเกียว เกียวโต โอซาก้า 2026 (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-airport-transfer", title: "การเดินทางจากสนามบินโตเกียว 2026: นาริตะและฮาเนดะเข้าเมือง (ภาษาอังกฤษ)" },
            { href: "/th", title: "ไกด์ภาษาไทยทั้งหมด →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>เดินทาง 2 ชั่วโมง และสามเรื่องที่ควรตัดสินใจก่อน</h2>
            <p className={styles.ctaBannerDesc}>จองที่นั่งก่อนเช้าวันสุดท้ายที่เกียวโต ไม่ใช่ในเช้าวันนั้น ทั้งที่นั่งระบุหมายเลข พื้นที่วางสัมภาระถ้าจำเป็น และขบวนที่เช้าพอจนไม่ต้องพึ่งขบวน 21:38 น. จากนั้นจึงตัดสินใจว่าจะลงที่สถานีไหนในโตเกียว และจะไปต่ออย่างไร</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={SHINKANSEN_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋วเกียวโต → โตเกียว →
              </KlookLink>
              <KlookLink href={PRIVATE_TRANSFER_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูรถรับส่งสนามบินโตเกียว →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
