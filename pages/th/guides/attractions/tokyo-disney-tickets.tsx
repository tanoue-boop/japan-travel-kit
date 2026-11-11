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
import GygCompare, { GygCompareButton } from "../../../../components/GygCompare";
import { fujiDayTour, tokyoDisneyTripPrep, tokyoSightseeingBusTour } from "../../../../lib/klook-links";
import { thTokyoDisney } from "../../../../lib/klook-links-th";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTokyoDisneyResort, gygTokyoDisneySea } from "../../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

const ROUTE = "/th/guides/attractions/tokyo-disney-tickets";
const TITLE = "ตั๋วดิสนีย์แลนด์โตเกียว 2026: ราคาและที่ซื้อ";
const DESC =
  "ตั๋วโตเกียวดิสนีย์แลนด์ 2026: ผู้ใหญ่เริ่ม ¥8,900 ราคาตามวัน ไม่ขายหน้างาน ซื้อเว็บทางการหรือ Klook";
// 11 Nov 2026 (R08): mirrors the English page's where-to-buy, validity, Premier Access and Happy Entry
// additions — same official FAQ sources and check dates; no figure added beyond the English page.
const LAST_CHECKED_PRICES = "2026-10-28";
const LAST_CHECKED_RULES = "2026-11-11";

// Mirrors the English page (/guides/attractions/tokyo-disney-tickets) block by block as of
// 2026-11-01: same sections, tables, Klook and GetYourGuide CTAs. Every rule and figure is
// the English page's (Tokyo Disney Resort's own, read 28 Oct 2026); no figure is added.
const CHECKED = dateLabel("2026-10-28", "th");
const GYG_SLUG = "th-tokyo-disney-tickets";

/** The published minimums, by the resort's own age bands. */
const priceRows = [
  { band: "ผู้ใหญ่ (大人)", who: "อายุ 18 ปีขึ้นไป", price: priceLabel("From ¥8,900", "th") },
  { band: "เยาวชน (中人)", who: "อายุ 12–17 ปี — วัยมัธยมต้นและมัธยมปลาย", price: priceLabel("From ¥7,400", "th") },
  { band: "เด็ก (小人)", who: "อายุ 4–11 ปี — วัยอนุบาลและประถม", price: priceLabel("From ¥5,300", "th") },
  { band: "เด็กเล็ก", who: "อายุ 3 ปีลงไป", price: priceLabel("Free", "th") },
];

/** Which passports exist, and when each one lets you through the gate. */
const ticketRows = [
  {
    ticket: "1-Day Passport",
    entry: "ตั้งแต่เวลาเปิดสวน",
    dates: "ทุกวัน",
    note: "หนึ่งสวน หนึ่งวัน โดยวันที่และสวนจะถูกกำหนดตอนซื้อ เป็นบัตรแบบปกติ",
  },
  {
    ticket: "After 3 Passport (เฉพาะวันหยุด)",
    entry: "ตั้งแต่ 15:00",
    dates: "วันหยุด",
    note: "เข้าสวนสนุกได้หนึ่งแห่งในช่วงเย็นในราคาที่ถูกกว่า เฉพาะวันที่มีขาย",
  },
  {
    ticket: "After 5 Passport (เฉพาะวันธรรมดา)",
    entry: "ตั้งแต่ 17:00",
    dates: "วันธรรมดา",
    note: "เข้าได้สั้นที่สุดและถูกที่สุด สำหรับการไปช่วงเย็นวันธรรมดา",
  },
  {
    ticket: "1-Day Park Hopper (ช่วงเวลาจำกัด)",
    entry: "—",
    dates: "ปัจจุบันไม่มีขาย",
    note: "FAQ ของรีสอร์ทระบุว่าตอนนี้ไม่ได้ขาย ถ้าอยากไปทั้งสองสวนในทริปเดียว ต้องซื้อบัตรแยกของแต่ละสวน",
  },
  {
    ticket: "บัตรหลายวัน (Multi-day)",
    entry: "—",
    dates: "ไม่มีขาย",
    note: "FAQ เรื่องประเภทบัตรระบุว่าไม่มีการขายพาสปอร์ตที่ใช้ได้ตั้งแต่สองวันติดต่อกันขึ้นไป",
  },
];

/** Operating hours — set per date, not a standing figure. */
const hoursRows = [
  {
    what: "เวลาเปิดและปิด",
    detail:
      "กำหนดเป็นรายวัน รีสอร์ทประกาศไว้ในปฏิทินเวลาทำการของตัวเอง ไม่ได้มีเวลาทำการตายตัว และหน้าจอซื้อบัตรก็แสดงเวลาทำการของวันที่คุณเลือก",
  },
  {
    what: "ประกาศเวลาทำการล่วงหน้านานแค่ไหน",
    detail: "ประมาณห้าเดือน FAQ ระบุว่าเวลาทำการจะประกาศบนเว็บไซต์ทางการล่วงหน้าราวห้าเดือน",
  },
  {
    what: "เรื่องนี้มีผลกับบัตรอย่างไร",
    detail:
      "บัตรสำหรับวันที่ต้องการเปิดขายล่วงหน้าประมาณสองเดือน ซึ่งตอนนั้นเวลาทำการของวันนั้นประกาศมาหลายเดือนแล้ว จึงควรเช็กปฏิทินก่อนซื้อ ไม่ใช่หลังซื้อ After 5 Passport ในวันที่ปิด 20:00 คือการเที่ยวสามชั่วโมง",
  },
  {
    what: "เข้าก่อนเวลา (Happy Entry)",
    detail:
      "เฉพาะแขกที่พักโรงแรมดิสนีย์ โตเกียวดิสนีย์แลนด์เริ่มให้เข้าก่อนแขกทั่วไป 15 นาที ส่วนโตเกียวดิสนีย์ซีเฉพาะแขกของ Fantasy Springs Hotel และ MiraCosta เข้าก่อน 5 ถึง 15 นาที ใช้ได้ทุกวันระหว่างเข้าพักรวมวันเช็กเอาต์ แต่ไม่รวมวันเช็กอิน และต้องมีบัตรเข้าสวนพร้อม Special Entrance Pass คนละใบ",
  },
];

/** Where to buy — first row is the recommendation. Validity from the resort's FAQ. */
const sellerRows = [
  {
    where: "แนะนำ: เว็บไซต์หรือแอปทางการ (tokyodisneyresort.jp)",
    best: "ผู้ที่ชำระเงินด้วยบัตรผ่านเว็บไซต์ทางการได้",
    validity: "วันเดียวกันของหนึ่งปีหลังวันซื้อ",
    note: "เปลี่ยนวันและช่วงอายุออนไลน์ได้ ไม่มีค่าธรรมเนียม ไม่จำกัดครั้งภายในอายุบัตร — แต่ละครั้งคิดตามราคาของวันใหม่",
  },
  {
    where: "เอเจนซีท่องเที่ยวออนไลน์ต่างประเทศที่ได้รับอนุญาต (เช่น Klook)",
    best: "คนที่เว็บไซต์ทางการปฏิเสธบัตรต่างประเทศ",
    validity: "วันเดียวกันของหนึ่งเดือนหลังวันเข้าชม",
    note: "รับบัตรต่างประเทศ หน้าชำระเงินภาษาไทย ควรเช็กอีกครั้งเมื่อวันนั้นขึ้นว่าขายหมดบนเว็บไซต์ทางการ และอายุบัตรสั้นกว่า",
  },
  {
    where: "เอเจนซีท่องเที่ยวและร้านสะดวกซื้อในญี่ปุ่น",
    best: "ผู้พำนักในญี่ปุ่นและนักท่องเที่ยวที่อยู่ญี่ปุ่นแล้ว",
    validity: "วันเดียวกันของหนึ่งเดือนหลังวันเข้าชม",
    note: "จำหน่ายเป็นใบยืนยันการจอง (reservation voucher) หากไม่ได้เข้าชมตามวันที่กำหนด ให้ติดต่อจุดที่ออกบัตรก่อนบัตรหมดอายุ",
  },
  {
    where: "หน้าทางเข้าสวน",
    best: "ไม่มี — ไม่ขาย",
    validity: "—",
    note: "โตเกียวดิสนีย์แลนด์และโตเกียวดิสนีย์ซีไม่ขายบัตรเข้าสวนหน้างาน มีเพียงแขกโรงแรมดิสนีย์ที่ซื้อบัตรวันเดียวกันที่โรงแรมได้",
  },
];

/** In-park app services — first row is the recommendation. */
const accessRows = [
  {
    service: "คำแนะนำ: Standby Pass และ Entry Request (ฟรี)",
    cost: "ฟรี",
    what: "Standby Pass ให้เวลากลับมาสำหรับจุดที่ต้องใช้ ส่วน Entry Request ลองได้วันละครั้งต่อจุดสำหรับพาเหรด โชว์ และการพบตัวละครที่กำหนด ใช้สองอย่างนี้ก่อนจ่ายเงินเพิ่ม",
  },
  {
    service: "Disney Premier Access",
    cost: "เสียเงิน คิดต่อครั้ง แยกจากบัตรเข้าสวน",
    what: "จองช่วงเวลาเล่นเครื่องเล่นที่กำหนด (รอสั้นลง) หรือจองที่ชมพาเหรดและโชว์ที่กำหนด ซื้อในแอปทางการหลังเข้าสวนแล้ว มีจำนวนจำกัดและอาจขายหมด",
  },
  {
    service: "ต่อแถวปกติ",
    cost: "รวมในบัตร",
    what: "เครื่องเล่นทุกอย่างยังเล่นได้ด้วยการต่อแถว",
  },
  {
    service: "40th Anniversary Priority Pass",
    cost: "—",
    what: "บัตรฟรีนี้สิ้นสุดเมื่อ 31 สิงหาคม 2026",
  },
];

/** The buying window, the sell-outs and what you can and cannot undo. */
const buyingRows = [
  {
    q: "วันของฉันเปิดขายเมื่อไร?",
    a: "บัตรของวันเดียวกันในอีกสองเดือนข้างหน้าเปิดขายทุกวันตั้งแต่ 14:00 เวลาญี่ปุ่น ดังนั้นวันเข้าชม 1 มีนาคมจะเปิดขาย 14:00 ของวันที่ 1 มกราคม ถ้าเดือนนั้นไม่มีวันที่ตรงกัน จะเริ่มขาย 14:00 ของวันที่ 1 เดือนถัดไป",
  },
  {
    q: "ซื้อได้ครั้งละกี่ใบ?",
    a: "สูงสุดสิบใบต่อหนึ่งคำสั่งซื้อ และการขายของวันใดวันหนึ่งอาจหยุดโดยไม่แจ้งล่วงหน้าเมื่อถึงจำนวนของวันนั้นแล้ว",
  },
  {
    q: "มีบัตรขายหน้าทางเข้าไหม?",
    a: "ไม่มี FAQ ระบุชัดว่าไม่มีการขายบัตรเข้าสวนที่โตเกียวดิสนีย์แลนด์และโตเกียวดิสนีย์ซี การซื้อในวันเข้าชมทำได้เฉพาะบนเว็บไซต์หรือแอปทางการระหว่างที่ยังมีโควตาเหลือ และถ้าบัตรขายหมด คุณจะเข้าสวนไม่ได้",
  },
  {
    q: "มีข้อยกเว้นไหม?",
    a: "แขกที่พักโรงแรมดิสนีย์ซื้อบัตรวันเดียวกันได้ที่โรงแรม นอกจากนั้นเว็บไซต์และแอปคือช่องทางเดียวสำหรับบัตรวันเดียวกัน ส่วนบัตรที่ซื้อล่วงหน้ามีขายผ่านบริษัททัวร์และร้านสะดวกซื้อบางแห่งด้วย",
  },
  {
    q: "ยกเลิกเพื่อขอเงินคืนได้ไหม?",
    a: "ไม่ได้ การยกเลิกและคืนเงินด้วยเหตุผลส่วนตัวทำไม่ได้ และ FAQ ที่พูดถึงสภาพอากาศเลวร้าย แผ่นดินไหว หรือเหตุผลอื่นที่ทำให้ไปในวันที่กำหนดไม่ได้ ก็ชี้ไปที่กฎเดียวกัน",
  },
  {
    q: "เปลี่ยนวันแทนได้ไหม?",
    a: "ได้ นี่คือสิ่งเดียวที่ปรับเปลี่ยนได้ บัตรออนไลน์เปลี่ยนวันได้ภายในระยะเวลาที่บัตรมีผล ทั้งก่อนหรือหลังวันเข้าชมที่กำหนด โดยไม่จำกัดจำนวนครั้ง และแต่ละครั้งจะคิดตามราคาของวันใหม่ การเปลี่ยนทำบนเว็บไซต์หรือในแอป ไม่ใช่ที่สวน",
  },
  {
    q: "วันของฉันขายหมดแล้ว — จบแค่นั้นเลยไหม?",
    a: "ไม่เสมอไป FAQ ระบุว่าบัตรประเภทที่ขายหมดอาจกลับมาขายอีกโดยไม่แจ้งล่วงหน้า และเมื่อแขกคนอื่นย้ายบัตรไปวันอื่น ที่ว่างที่เกิดขึ้นจะกลับเข้าโควตาและขายออนไลน์อีกครั้ง การกลับมาเช็กซ้ำจึงได้ผลมากกว่าที่คิด",
  },
];

const parkRows = [
  {
    park: "โตเกียวดิสนีย์แลนด์",
    style: "สวนปราสาทดิสนีย์แบบคลาสสิก: ขบวนพาเหรด พลุ เครื่องเล่นสำหรับครอบครัว",
    suits: "มาครั้งแรก ครอบครัวที่มีเด็กเล็ก แฟนดิสนีย์สายคลาสสิก",
    note: "รูปแบบพื้นที่จะคุ้นเคยถ้าเคยไปสวนดิสนีย์ที่อื่นมาแล้ว",
  },
  {
    park: "โตเกียวดิสนีย์ซี",
    style: "สวนธีมการเดินเรือและน้ำ มีเอกลักษณ์เฉพาะโตเกียวกว่า บรรยากาศเหมาะกับผู้ใหญ่มากกว่า และมีเครื่องดื่มแอลกอฮอล์",
    suits: "ผู้ใหญ่ คู่รัก คนที่กลับมาอีกครั้งและอยากได้อะไรที่ต่างออกไป",
    note: "ฉลองครบรอบ 25 ปี (เมษายน 2026 – มีนาคม 2027)",
  },
];

const whoFor = [
  {
    title: "เลือกโตเกียวดิสนีย์แลนด์ ถ้า…",
    desc: "คุณมากับเด็กเล็ก หรือนี่เป็นสวนดิสนีย์แห่งแรกของคุณ ผังเป็นสวนปราสาทแบบคลาสสิก มีขบวนพาเหรดกลางวัน และเน้นเครื่องเล่นที่เหมาะกับครอบครัว เที่ยวได้สบาย ๆ ในบรรยากาศดิสนีย์ที่คุ้นเคย",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V11l4-3 5 4 5-4 4 3v10z" />
        <path d="M12 21v-5" />
        <path d="M7 11V6l2-2 2 2v2" />
      </svg>
    ),
  },
  {
    title: "เลือกโตเกียวดิสนีย์ซี ถ้า…",
    desc: "คุณอยากได้สิ่งที่หาไม่ได้ในดิสนีย์รีสอร์ทอื่น และคุณเป็นผู้ใหญ่หรือเดินทางโดยไม่มีเด็กเล็ก ดิสนีย์ซีมีบรรยากาศเหมาะกับผู้ใหญ่มากกว่า ท่าเรือตามธีมมีเฉพาะที่โตเกียว และต่างจากดิสนีย์แลนด์ตรงที่มีเครื่องดื่มแอลกอฮอล์",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12V7a7 7 0 0 1 14 0v5" />
        <path d="M4 16c2 1.5 4-1.5 8 0s6-1.5 8 0" />
      </svg>
    ),
  },
  {
    title: "ไปปี 2026? อย่าลืมเรื่องครบรอบ",
    desc: "โตเกียวดิสนีย์ซีฉลองครบรอบ 25 ปีตั้งแต่เมษายน 2026 ถึงมีนาคม 2027 ช่วงครบรอบทำให้วันยอดนิยมคนเยอะขึ้น และด้วยราคาที่เปลี่ยนตามวัน วันเหล่านั้นก็เป็นวันที่แพงด้วย จึงควรจองทันทีที่บัตรสำหรับวันที่ต้องการเปิดขาย ล่วงหน้าสองเดือน",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 5.4 5.6.5-4.2 3.8 1.3 5.7L12 14.8 6.9 17.4l1.3-5.7L4 7.9l5.6-.5z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "กำหนดวันและสวนให้ได้ก่อนอย่างอื่น",
    desc: "ทุกบัตรของโตเกียวดิสนีย์ระบุวันและสวน และ 1-Day Park Hopper ที่เคยให้เที่ยวได้ทั้งสองสวนในวันเดียวก็ไม่มีขายในตอนนี้ สองสวนจึงหมายถึงบัตรสองใบในสองวัน",
  },
  {
    title: "เช็กเวลาทำการของวันนั้นในปฏิทินเวลาทำการ",
    desc: "เวลาทำการกำหนดเป็นรายวันและประกาศล่วงหน้าประมาณห้าเดือน ซึ่งเป็นตัวตัดสินว่า After 5 Passport จะได้เที่ยวทั้งช่วงเย็นหรือแค่นิดเดียว และพลุจะอยู่ในช่วงที่คุณอยู่ในสวนหรือไม่",
  },
  {
    title: "เตรียมพร้อมซื้อบัตรเมื่อเปิดขายเวลา 14:00 น. ตามเวลาญี่ปุ่น ล่วงหน้าสองเดือน",
    desc: "นั่นคือเวลาที่บัตรสำหรับวันที่ต้องการเปิดขาย ใส่ไว้ในปฏิทินตามเวลาไทย — 14:00 ที่โตเกียวคือ 12:00 ที่กรุงเทพฯ — เพราะโควตาของแต่ละวันมีจำกัด และการขายอาจหยุดโดยไม่แจ้งล่วงหน้า",
  },
  {
    title: "ใช้ Klook ถ้าบัตรต่างประเทศเป็นปัญหา",
    desc: "เว็บไซต์ทางการของโตเกียวดิสนีย์รีสอร์ทปฏิเสธหรือบล็อกบัตรเครดิตที่ออกนอกญี่ปุ่นบ่อยครั้ง Klook เป็นผู้ขายที่ได้รับอนุญาตอย่างเป็นทางการ รับบัตรต่างประเทศ และหน้าชำระเงินเป็นภาษาไทย นักท่องเที่ยวต่างชาติจำนวนมากจึงใช้ช่องทางนี้",
  },
  {
    title: "ลงทะเบียน QR Code ของตั๋วอิเล็กทรอนิกส์ในแอปทางการ",
    desc: "หลังซื้อคุณจะได้ QR code ของตั๋วอิเล็กทรอนิกส์ ซึ่งลงทะเบียนในแอปทางการของโตเกียวดิสนีย์รีสอร์ทได้ แอปนี้ยังเป็นที่จัดการฟีเจอร์ในสวนในวันนั้นด้วย ตั้งค่าให้เรียบร้อยก่อนไปถึง",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋วโตเกียวดิสนีย์แลนด์ปี 2026 ราคาเท่าไร?",
    a: `ไม่มีราคาเดียว โตเกียวดิสนีย์รีสอร์ทระบุชัดว่าบัตรเข้าสวนตั้งราคาตามวันเข้าชม สิ่งที่ประกาศคือราคาขั้นต่ำของ 1-Day Passport — ผู้ใหญ่ (18 ปีขึ้นไป) เริ่มต้น ¥8,900 เยาวชน (12–17 ปี) เริ่มต้น ¥7,400 เด็ก (4–11 ปี) เริ่มต้น ¥5,300 และอายุ 3 ปีลงไปฟรี — ส่วนราคาจริงของวันคุณจะแสดงเมื่อเลือกวัน ตรวจสอบเมื่อ ${CHECKED} วันยอดนิยม โดยเฉพาะวันในช่วงครบรอบ 25 ปีของดิสนีย์ซี จะสูงกว่าราคาขั้นต่ำมาก`,
  },
  {
    q: "ควรซื้อตั๋วโตเกียวดิสนีย์แลนด์ที่ไหน?",
    a: "หากชำระเงินด้วยบัตรของคุณได้ ให้ซื้อบนเว็บไซต์หรือแอปทางการของโตเกียวดิสนีย์รีสอร์ท บัตรที่ซื้อที่นั่นใช้ได้ถึงวันเดียวกันของหนึ่งปีหลังวันซื้อ และเปลี่ยนวันออนไลน์ได้โดยไม่มีค่าธรรมเนียม ถ้าหน้าชำระเงินทางการปฏิเสธบัตรต่างประเทศ เอเจนซีท่องเที่ยวออนไลน์ต่างประเทศที่ได้รับอนุญาตอย่าง Klook ก็ขาย 1-Day Passport ระบุวันแบบเดียวกัน แต่ FAQ ของรีสอร์ทกำหนดอายุบัตรประเภทนี้สั้นกว่า คือถึงวันเดียวกันของหนึ่งเดือนหลังวันเข้าชม ทั้งสองสวนไม่ขายบัตรหน้าทางเข้า ตรวจสอบล่าสุด: 2026-11-11",
  },
  {
    q: "ตั๋วโตเกียวดิสนีย์แลนด์มีอายุนานแค่ไหน?",
    a: "บัตรเข้าสวนที่ซื้อบนเว็บไซต์หรือแอปทางการใช้ได้ถึงวันเดียวกันของหนึ่งปีหลังวันซื้อ ไม่ใช่หนึ่งปีหลังวันเข้าชม บัตรที่ซื้อผ่านเอเจนซีท่องเที่ยว ร้านสะดวกซื้อ หรือเอเจนซีท่องเที่ยวออนไลน์ต่างประเทศ ใช้ได้ถึงวันเดียวกันของหนึ่งเดือนหลังวันเข้าชม ภายในอายุบัตรเปลี่ยนวันได้ เมื่อหมดอายุแล้วบัตรจะใช้ไม่ได้ ตรวจสอบล่าสุด: 2026-11-11",
  },
  {
    q: "Disney Premier Access คืออะไร และจำเป็นไหม?",
    a: "Disney Premier Access เป็นบริการเสียเงินแยกจากบัตรเข้าสวน ใช้จองช่วงเวลาเล่นเครื่องเล่นที่กำหนด หรือจองที่ชมโชว์ที่กำหนด ซื้อในแอปทางการของโตเกียวดิสนีย์รีสอร์ทหลังเข้าสวนแล้ว มีจำนวนจำกัดและอาจขายหมด ไม่จำเป็นต้องซื้อ เพราะเครื่องเล่นทุกอย่างยังเล่นได้ด้วยการต่อแถว และ Standby Pass กับ Entry Request แบบฟรียังมีอยู่ ส่วน 40th Anniversary Priority Pass แบบฟรีสิ้นสุดเมื่อ 31 สิงหาคม 2026 ตรวจสอบล่าสุด: 2026-11-11",
  },
  {
    q: "ตั๋วโตเกียวดิสนีย์เปิดขายเมื่อไร?",
    a: `บัตรของวันเดียวกันในอีกสองเดือนข้างหน้าเปิดขายทุกวันตั้งแต่ 14:00 เวลาญี่ปุ่น (12:00 เวลาไทย) — วันเข้าชม 1 มีนาคมเปิดขาย 14:00 ของวันที่ 1 มกราคม — และถ้าเดือนนั้นไม่มีวันที่ตรงกัน จะเริ่มขาย 14:00 ของวันที่ 1 เดือนถัดไป ซื้อได้สูงสุดสิบใบต่อคำสั่งซื้อ และการขายของวันหนึ่งอาจหยุดโดยไม่แจ้งเมื่อถึงจำนวนของวันนั้น ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "วันที่ในตั๋วโตเกียวดิสนีย์แลนด์เปลี่ยนได้ไหม?",
    a: `วันที่ถูกกำหนดตอนซื้อ แต่เปลี่ยนได้ และคืนเงินไม่ได้ การยกเลิกและคืนเงินด้วยเหตุผลส่วนตัวทำไม่ได้ — FAQ ที่พูดถึงสภาพอากาศเลวร้าย แผ่นดินไหว หรือเหตุผลอื่นที่ทำให้ไปในวันที่กำหนดไม่ได้ ก็ชี้ไปที่กฎเดียวกัน บัตรออนไลน์เปลี่ยนวันได้ภายในระยะเวลาที่บัตรมีผล ทั้งก่อนหรือหลังวันที่กำหนด ไม่จำกัดจำนวนครั้ง แต่ละครั้งคิดตามราคาของวันใหม่ ผ่านเว็บไซต์หรือแอปทางการ ไม่ใช่ที่สวน ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "วันของฉันขายหมดแล้ว — ยังเข้าได้อยู่ไหม?",
    a: "ซื้อหน้างานไม่ได้ — วันที่ขายหมดแล้วเข้าสวนไม่ได้ แต่ FAQ ของรีสอร์ทระบุว่าบัตรเข้าสวนที่ขายหมดอาจกลับมาขายอีกโดยไม่แจ้งล่วงหน้า และเมื่อแขกเปลี่ยนบัตรไปวันอื่น ที่เดิมจะกลับมาให้ซื้อออนไลน์ได้อีกบนเว็บไซต์และแอปทางการ จึงควรกลับไปเช็กซ้ำ และเช็กผู้ขายที่ได้รับอนุญาตด้วย ตรวจสอบล่าสุด: 2026-11-11",
  },
  {
    q: "ควรเลือกโตเกียวดิสนีย์แลนด์หรือโตเกียวดิสนีย์ซี?",
    a: "1-Day Passport ใช้ได้หนึ่งสวน คุณจึงต้องเลือก โตเกียวดิสนีย์แลนด์คือสวนปราสาทแบบคลาสสิก มีพาเหรดและเครื่องเล่นสำหรับครอบครัว เหมาะกับคนมาครั้งแรกและครอบครัวที่มีเด็กเล็ก โตเกียวดิสนีย์ซีเป็นธีมการเดินเรือ มีเอกลักษณ์เฉพาะโตเกียวกว่า บรรยากาศเหมาะกับผู้ใหญ่มากกว่า มีเครื่องดื่มแอลกอฮอล์ และฉลองครบรอบ 25 ปีตั้งแต่เมษายน 2026 ถึงมีนาคม 2027 มาครั้งแรกกับเด็ก เลือกดิสนีย์แลนด์ อยากได้อะไรที่ไม่เหมือนใคร เลือกดิสนีย์ซี",
  },
];

/** The English page's tokyoDisneyTripPrep, in Thai, on Klook's th path. */
const TH_TRIP_PREP_COPY = [
  {
    label: "โรงแรมรอบไมฮามะ",
    ctaLabel: "ดูโรงแรมไมฮามะบน Klook →",
    why: "สถานีที่สองสวนใช้ร่วมกัน มาจากสถานีโตเกียวด้วยสาย JR Keiyo ราว 15 ถึง 20 นาที และเป็นจุดเริ่มของโมโนเรล Disney Resort Line ซึ่งทำให้การเข้าสวนแต่เช้าหรือดูพาเหรดรอบดึกเป็นไปได้จริง",
  },
  {
    label: "โรงแรมในอุรายาสุ / ชินอุรายาสุ",
    ctaLabel: "ดูโรงแรมอุรายาสุบน Klook →",
    why: "ห่างออกไปอีกหนึ่งสถานีและโดยทั่วไปถูกกว่าห้องพักฝั่งรีสอร์ท โรงแรมหลายแห่งในย่านนี้มีรถรับส่งฟรีไปถึงประตู สิ่งที่แลกมาคือต้องดูตารางรถรับส่งแทนโมโนเรล",
  },
  {
    label: "รถบัสลีมูซีนสนามบินฮาเนดะ",
    ctaLabel: "ดูรถบัสจากฮาเนดะ →",
    why: "รายการฮาเนดะระบุโตเกียวดิสนีย์รีสอร์ทเป็นหนึ่งในจุดหมาย จึงเป็นเส้นทางจากสนามบินที่ไปจบที่รีสอร์ท ไม่ใช่สถานีในเมืองที่ต้องลากกระเป๋าออกไปต่ออีกรอบ",
  },
  {
    label: "รถบัสลีมูซีนสนามบินนาริตะ",
    ctaLabel: "ดูรถบัสลีมูซีน →",
    why: "ถ้าบินเข้านาริตะ ผู้ให้บริการ Airport Limousine รายเดียวกันวิ่งไปยังโรงแรมและสถานีในใจกลางโตเกียวพร้อมรับกระเป๋าโหลด เช็กรายชื่อป้ายของวันที่คุณเดินทางก่อนจอง เพราะจุดหมายต่างกันไปตามเส้นทาง",
  },
  {
    label: "Klook Japan eSIM",
    ctaLabel: "ดูตัวเลือก eSIM บน Klook →",
    why: "พาสปอร์ตของคุณคือ QR code ที่ลงทะเบียนไว้ในแอปทางการของโตเกียวดิสนีย์รีสอร์ท และแอปก็เป็นที่จัดการฟีเจอร์ในสวนในวันนั้นด้วย ถ้าพึ่งแค่ Wi-Fi โรงแรม จะใช้ฟังก์ชันเหล่านี้ในสวนสนุกไม่ได้",
  },
];
const thTripPrep = tokyoDisneyTripPrep.map((item, i) => withKlookLocale(item, "th", TH_TRIP_PREP_COPY[i]));

const thTours = [
  withKlookLocale(fujiDayTour, "th", {
    title: "ทัวร์ภูเขาไฟฟูจิหนึ่งวันจากโตเกียว",
    desc: "นั่งรถโค้ชเต็มวันไปสถานีที่ 5 ของฟูจิ ทะเลสาบคาวากุจิ และโอชิโนะฮักไก แล้วกลับถึงโตเกียวในเย็นวันเดียวกัน",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "th", {
    title: "ทัวร์รถบัสชมเมืองโตเกียวหนึ่งวัน",
    desc: "ทัวร์มีไกด์วนชมสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมออดิโอไกด์หลายภาษา",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋วดิสนีย์แลนด์โตเกียว" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, "th");

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
          <p className={styles.eyebrow}>อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            ตั๋วโตเกียวดิสนีย์แลนด์ (2026):{" "}<br />ราคา ซื้อที่ไหน และวิธีจอง
          </h1>
          <p className={styles.heroSubtitle}>
            บัตรต้องระบุวันที่ ราคาแตกต่างตามวัน ไม่มีจำหน่ายที่หน้าทางเข้า และขอคืนเงินไม่ได้ บทความนี้อธิบายราคาบัตรเข้าสวนสนุก (Passport)
            ควรซื้อที่ไหน บัตรสำหรับวันที่ต้องการเปิดขายเมื่อไร และควรเลือกสวนไหน
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาและกฎทางการ", "เปิดขายล่วงหน้า 2 เดือน", "ใช้ Klook หากชำระด้วยบัตรต่างประเทศ"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Lead paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>ตั๋วโตเกียวดิสนีย์แลนด์</strong>ปี 2026 แบบ 1-Day Passport ผู้ใหญ่เริ่มต้น <strong>¥8,900</strong>{" "}
            อายุ 12–17 ปีเริ่มต้น <strong>¥7,400</strong> และอายุ 4–11 ปีเริ่มต้น <strong>¥5,300</strong> (อายุ 3 ปีลงไปฟรี)
            โดยราคาจริงขึ้นอยู่กับวันเข้าชม ทั้งสองสวนไม่ขายบัตรหน้าทางเข้า จึงต้องซื้อบนเว็บไซต์หรือแอปทางการของโตเกียวดิสนีย์รีสอร์ท
            หรือผ่านผู้ขายที่ได้รับอนุญาตอย่าง Klook ถ้าเว็บไซต์ทางการปฏิเสธบัตรของคุณ โดยเปิดขาย
            <strong>ล่วงหน้าสองเดือน ทุกวันเวลา 14:00 เวลาญี่ปุ่น</strong> (12:00 เวลาไทย)
            บัตรหนึ่งใบใช้ได้หนึ่งสวนในหนึ่งวัน: โตเกียวดิสนีย์แลนด์เหมาะกับการมาครั้งแรกและเด็กเล็ก
            ส่วนโตเกียวดิสนีย์ซีเหมาะกับผู้ใหญ่และช่วงครบรอบ 25 ปี (เมษายน 2026 – มีนาคม 2027)
          </p>
          <p className={styles.bodyText}>
            วันที่ขายหมดแล้วเข้าไม่ได้ คืนเงินไม่ได้ แต่เปลี่ยนวันได้ไม่จำกัดครั้งภายในอายุบัตร ราคาและช่วงอายุตรวจสอบจากหน้าบัตรของรีสอร์ทเมื่อ{" "}
            {CHECKED} ส่วนอายุบัตรและกฎในสวนตรวจสอบจาก FAQ ทางการเมื่อ 11 พฤศจิกายน 2026 กำลังวางแผนเที่ยวโตเกียวต่อ? ดู{" "}
            <Link href="/th/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              เปรียบเทียบตั๋ว teamLab โตเกียว
            </Link>{" "}
            และ{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              คู่มือเที่ยวโตเกียว (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1-Day Passport</p>
                <p className={styles.verdictStatValue}>ผู้ใหญ่ เริ่มต้น ¥8,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ราคา</p>
                <p className={styles.verdictStatValue}>เปลี่ยนตามวันเข้าชม</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เปิดขาย</p>
                <p className={styles.verdictStatValue}>14:00 เวลาญี่ปุ่น ล่วงหน้า 2 เดือน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>บัตรหน้าทางเข้า</p>
                <p className={styles.verdictStatValue}>ไม่มีทั้งสองสวน</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> เลือกสวนและวัน เช็กเวลาทำการของวันนั้นในปฏิทินเวลาทำการ แล้วซื้อทันทีที่
              เปิดขายล่วงหน้าสองเดือน ไม่มีการคืนเงิน แต่บัตรออนไลน์เปลี่ยนวันได้บ่อยเท่าที่ต้องการ ถ้าเว็บไซต์
              ทางการปฏิเสธบัตรต่างประเทศของคุณ Klook เป็นผู้ขายที่ได้รับอนุญาต รับบัตรต่างประเทศ และออก QR
              สำหรับแอปทางการ
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={thTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                เช็กตั๋วโตเกียวดิสนีย์ →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋วโตเกียวดิสนีย์แลนด์ปี 2026 ราคาเท่าไร?</h2>
          <p className={styles.bodyText}>
            ผู้ใหญ่เริ่มต้น ¥8,900 — และคำว่า ‘เริ่มต้น’ ในประโยคนี้มีความหมายจริง ๆ โตเกียวดิสนีย์รีสอร์ทระบุว่า
            บัตรเข้าสวนใช้ราคาแบบผันแปร และค่าบัตรต่างกันตามวันเข้าชม ราคาที่ประกาศจึงเป็นราคาขั้นต่ำ ไม่ใช่ราคา
            ตายตัว ราคาของวันนั้นจะแสดงเมื่อคุณเลือกวันบนหน้าบัตรทางการ
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ช่วงอายุ", "ครอบคลุมใคร", "1-Day Passport หนึ่งสวน"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>ตรวจสอบล่าสุด: {LAST_CHECKED_PRICES}</strong> · ที่มา: https://www.tokyodisneyresort.jp/en/ticket/index.html (ราคา)
            และ https://faq-en.tokyodisneyresort.jp/ (กฎ){" "}
            ราคาขั้นต่ำและช่วงอายุจากหน้าบัตรเข้าสวนทางการ ตรวจสอบเมื่อ {CHECKED} ส่วนกฎราคาผันแปรเป็นถ้อยคำ
            จาก FAQ ของรีสอร์ทเอง ที่นี่ไม่ได้ระบุราคาสูงสุด เพราะรีสอร์ทไม่ได้ประกาศเป็นตัวเลขตายตัว — วันหยุด
            สุดสัปดาห์หรือวันในช่วงครบรอบ 25 ปีของดิสนีย์ซีแพงกว่าราคาขั้นต่ำอย่างเห็นได้ชัด บัตรระบุวันอื่น ๆ ใน
            โตเกียวพร้อมวันที่ตรวจสอบ อยู่ใน{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
            {" "}ของเรา
          </p>
        </section>

        {/* Q2 — which ticket */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ประเภทบัตร</span>
          <h2 className={styles.sectionTitle}>ควรซื้อตั๋วโตเกียวดิสนีย์แบบไหน?</h2>
          <p className={styles.bodyText}>
            1-Day Passport สำหรับเต็มวัน บัตรช่วงเย็น (After 3 / After 5 Passport) หากต้องการเที่ยวเฉพาะช่วงเย็นถึงค่ำ และบัตรสองใบแยกกันถ้าอยากไปทั้ง
            สองสวน — 1-Day Park Hopper ที่เคยใช้ได้ทั้งสองสวนในวันเดียวไม่มีขายในตอนนี้ และไม่มีบัตรหลายวันขาย
            เลย
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["บัตร", "เข้าได้ตั้งแต่", "วันที่ขาย", "คืออะไร"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.entry}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dates}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ประเภทบัตร เวลาเข้า และสถานะปัจจุบันของ Park Hopper มาจากคำตอบใน FAQ ของรีสอร์ท ตรวจสอบเมื่อ{" "}
            {CHECKED} พาสปอร์ตแบบไหนเปิดขายในวันที่คุณจะไปเป็นเรื่องรายวัน — บัตรช่วงเวลาจำกัดมีมาและหมดไปตาม
            อีเวนต์ของรีสอร์ท — รายการข้างต้นจึงเป็นภาพรวมของประเภทบัตร ไม่ใช่แคตตาล็อกตายตัว
          </p>
        </section>

        {/* Q3 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวลาทำการ</span>
          <h2 className={styles.sectionTitle}>โตเกียวดิสนีย์เปิดกี่โมงถึงกี่โมง?</h2>
          <p className={styles.bodyText}>
            ไม่มีเวลาทำการตายตัวให้อ้างอิง รีสอร์ทกำหนดเป็นรายวันและประกาศในปฏิทินเวลาทำการของตัวเองล่วงหน้า
            ประมาณห้าเดือน ซึ่งเร็วกว่าการเปิดขายบัตร และนั่นคือส่วนที่มีประโยชน์ — พอบัตรสำหรับวันที่ต้องการเปิดขาย คุณก็รู้
            แล้วว่าวันนั้นสวนเปิดนานแค่ไหน
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `สิ่งที่รีสอร์ทประกาศ (ตรวจสอบ ${CHECKED})`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>ตรวจสอบล่าสุด: {LAST_CHECKED_RULES}</strong> · ที่มา: https://faq-en.tokyodisneyresort.jp/ (เวลาทำการ) และ
            https://www.tokyodisneyresort.jp/en/hotel/topics/info/happy_entry.html (Happy Entry) Happy Entry ไม่ได้รับประกันว่าจะได้อยู่ในสวนเพิ่ม
            15 นาที รีสอร์ทระบุว่าในวันที่คนแน่น การเข้าทางเข้าพิเศษของโรงแรมอาจใช้เวลา
          </p>
        </section>

        {/* Where to buy — added 11 Nov 2026 (R08). First row is the recommendation. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ซื้อที่ไหน</span>
          <h2 className={styles.sectionTitle}>ควรซื้อตั๋วโตเกียวดิสนีย์แลนด์ที่ไหน?</h2>
          <p className={styles.bodyText}>
            หากชำระเงินด้วยบัตรของคุณได้ ให้ซื้อบนเว็บไซต์หรือแอปทางการของโตเกียวดิสนีย์รีสอร์ท — บัตรที่ซื้อที่นั่นใช้ได้หนึ่งปีนับจากวันซื้อ
            ถ้าเว็บไซต์ปฏิเสธบัตรต่างประเทศ ผู้ขายต่างประเทศที่ได้รับอนุญาตอย่าง Klook ก็ขายบัตรระบุวันแบบเดียวกัน ใช้ได้ถึงหนึ่งเดือนหลังวันเข้าชม
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ซื้อที่ไหน", "เหมาะกับ", "บัตรใช้ได้ถึง", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellerRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.validity}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>ตรวจสอบล่าสุด: {LAST_CHECKED_RULES}</strong> · ที่มา:
            https://faq-en.tokyodisneyresort.jp/answer/680ba03d01fdf7431bafb1d5/ (อายุบัตร) และ FAQ ของรีสอร์ทเรื่องบัตรเข้าสวน (ไม่ขายหน้างาน การซื้อวันเดียวกัน ข้อยกเว้นของโรงแรมดิสนีย์)
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={thTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เว็บไซต์ทางการไม่รับบัตรของคุณ? เช็กที่ Klook →
            </KlookLink>
          </div>
        </section>

        {/* Q4 — the booking window, sell-outs and refunds, then the CTA stack. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ช่วงเปิดขาย</span>
          <h2 className={styles.sectionTitle}>ต้องจองตั๋วโตเกียวดิสนีย์ล่วงหน้าไหม?</h2>
          <p className={styles.bodyText}>
            ต้อง และรีสอร์ทก็ตัดทางเลือกอื่นออกไปแล้ว: ไม่มีการขายบัตรเข้าสวนที่โตเกียวดิสนีย์แลนด์และ
            โตเกียวดิสนีย์ซีเลย บัตรสำหรับวันที่ต้องการเปิดขาย<strong>ล่วงหน้าสองเดือน ทุกวันตั้งแต่ 14:00 เวลาญี่ปุ่น</strong>{" "}
            — ตรงกับ 12:00 เวลาไทย — และโควตาของแต่ละวันมีจำกัด การขายหยุดได้โดยไม่แจ้งล่วงหน้าเมื่อหมด ในวันหยุด
            สุดสัปดาห์ วันหยุดนักขัตฤกษ์ของญี่ปุ่น หรือวันในช่วงครบรอบ 25 ปีของดิสนีย์ซี ต้องซื้อให้ทันช่วงเปิดขาย
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["คำถาม", `สิ่งที่รีสอร์ทประกาศ (ตรวจสอบ ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            เพราะโควตาแบ่งตามผู้ขายด้วย ไม่ใช่แค่ตามวัน วันที่หมดในช่องทางหนึ่งจึงควรเช็กอีกช่องทาง — และผู้ขาย
            ที่ได้รับอนุญาตก็เป็นทางเลือกที่เชื่อถือได้เมื่อหน้าชำระเงินทางการไม่รับบัตรต่างประเทศ:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={thTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เช็กตั๋วโตเกียวดิสนีย์บน Klook →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
          </div>
        </section>

        {/* Q5 — which park */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ดิสนีย์แลนด์ vs ดิสนีย์ซี</span>
          <h2 className={styles.sectionTitle}>ดิสนีย์แลนด์หรือดิสนีย์ซี — ควรเลือกสวนไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            บัตรหนึ่งใบ หนึ่งสวน — และเมื่อไม่มี Park Hopper ขาย นี่จึงเป็นการเลือกจริง ๆ ไม่ใช่แค่เรื่องลำดับ
            ดิสนีย์แลนด์สำหรับสวนปราสาทแบบคลาสสิกและเด็กเล็ก ดิสนีย์ซีสำหรับสวนที่ไม่มีที่ไหนอีก และสำหรับปี
            ครบรอบ 25 ปี
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["สวน", "บุคลิกโดยรวม", "เหมาะกับ", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            นี่เป็นภาพรวมกว้าง ๆ เพื่อช่วยตัดสินใจ — ทั้งสองสวนใหญ่และเที่ยวได้เต็มวัน วันเข้าสวนยังกินเวลาทั้งวัน
            ของทริปในเมือง จึงมักถูกวางไว้ช่วงต้น ๆ ใน{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>
              แผนเที่ยวโตเกียวห้าวัน (ภาษาอังกฤษ)
            </Link>
            {" "}ของเรา วันดิสนีย์อยู่ในวันที่สี่
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>เหมาะกับใคร</span>
          <h2 className={styles.sectionTitle}>สวนไหนเหมาะกับคุณ?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            ไม่ว่าจะเลือกสวนไหน ควรวางแผนเส้นทางไว้ก่อน — รีสอร์ทอยู่ห่างจากใจกลางโตเกียว ต้องเดินทางด้วยรถไฟ{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              ไกด์การเดินทางในโตเกียว (ภาษาอังกฤษ)
            </Link>
            {" "}ของเราอธิบายรถไฟ รถไฟใต้ดิน และบัตร IC ที่คุณจะใช้เดินทางไปที่นั่น
          </p>
        </section>

        {/* Premier Access — added 11 Nov 2026 (R08). First row is the recommendation. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ลดเวลาต่อแถว</span>
          <h2 className={styles.sectionTitle}>จำเป็นต้องซื้อ Disney Premier Access ไหม?</h2>
          <p className={styles.bodyText}>
            ไม่จำเป็น Disney Premier Access เป็นบริการเสียเงินที่ซื้อในแอปทางการหลังเข้าสวนแล้ว และเครื่องเล่นทุกอย่างยังเล่นได้ด้วยการต่อแถว
            40th Anniversary Priority Pass แบบฟรีสิ้นสุดเมื่อ 31 สิงหาคม 2026 ส่วน Standby Pass และ Entry Request แบบฟรียังมีอยู่
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["บริการ", "ค่าใช้จ่าย", "ใช้ทำอะไร"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>ตรวจสอบล่าสุด: {LAST_CHECKED_RULES}</strong> · ที่มา:
            https://faq-en.tokyodisneyresort.jp/answer/680ba05101fdf7431bafb6b0/ และ
            https://faq-en.tokyodisneyresort.jp/answer/680ba05101fdf7431bafb6b8/ ราคา Premier Access กำหนดตามเครื่องเล่นหรือโชว์และแสดงในแอป
            เราไม่ใส่ตัวเลขที่ไม่ได้อ่านจากหน้าทางการของรีสอร์ทเอง
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>ซื้อตั๋วโตเกียวดิสนีย์อย่างไร?</h2>
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

        {/* Klook: the stay and the days either side. */}
        <KlookTripPrep
          label="รอบ ๆ วันเข้าสวน"
          heading="ควรพักใกล้โตเกียวดิสนีย์รีสอร์ทไหม?"
          intro="ถ้าวันที่คุณจะไปเป็นวันหยุดสุดสัปดาห์หรือวันในช่วงครบรอบ ควร — รีสอร์ทอยู่ห่างจากสถานีโตเกียว 15 ถึง 20 นาทีด้วยสาย JR Keiyo ซึ่งเป็นการเดินทางที่ต้องทำก่อนประตูเปิดและอีกครั้งหลังพาเหรดกลางคืน การพักที่ไมฮามะหรือห่างออกไปหนึ่งสถานีช่วยประหยัดเวลาเดินทางทั้งตอนเช้าและตอนกลับ"
          items={thTripPrep}
        />

        {/* Foreign card / Klook explainer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>บัตรเครดิตต่างประเทศ</span>
          <h2 className={styles.sectionTitle}>ซื้อตั๋วโตเกียวดิสนีย์ด้วยบัตรต่างประเทศได้ไหม?</h2>
          <p className={styles.bodyText}>
            บนเว็บไซต์ทางการมักไม่ได้ เว็บไซต์ทางการของโตเกียวดิสนีย์รีสอร์ทเป็นช่องทางซื้อหลัก แต่ปฏิเสธหรือบล็อก
            บัตรเครดิตที่ออกนอกญี่ปุ่นบ่อยครั้ง — ปัญหาที่นักท่องเที่ยวต่างชาติเจอซ้ำ ๆ และยิ่งหนักเมื่อสิ่งที่คุณ
            พยายามซื้อเปิดขายแค่ช่วงเวลาเดียวล่วงหน้าสองเดือน
          </p>
          <p className={styles.bodyText}>
            <strong>Klook เป็นผู้ขายตั๋วโตเกียวดิสนีย์รีสอร์ทที่ได้รับอนุญาตอย่างเป็นทางการ</strong> รับบัตร
            ต่างประเทศ หน้าชำระเงินเป็นภาษาไทย และส่ง QR code ของตั๋วอิเล็กทรอนิกส์ที่ลงทะเบียนในแอปทางการของ
            โตเกียวดิสนีย์รีสอร์ทได้ การรวมกันของสองอย่างนี้ — รับบัตรต่างประเทศ และ QR ที่ลงทะเบียนในแอปได้ — คือ
            เหตุผลที่กลายเป็นช่องทางที่นักท่องเที่ยวต่างชาตินิยมใช้ ถ้าคุณจัดแผนอื่นในโตเกียวไปด้วย{" "}
            <Link href="/th/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              ไกด์ตั๋ว Shibuya Sky
            </Link>
            {" "}ของเราพูดถึงอีกการจองแบบระบุวันที่ทำผ่านผู้ขายแล้วง่ายกว่า
          </p>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <FaqList items={faqItems} />

        {/* Klook tours in the same city. */}
        <KlookTourPicks
          heading="ทัวร์หนึ่งวันจากเมืองเดียวกัน"
          intro="วันเข้าสวนกินเวลาทั้งวัน คนส่วนใหญ่จึงจัดวันเที่ยวดิสนีย์ไว้เป็นส่วนหนึ่งของทริปโตเกียว สองรายการนี้เติมวันที่ไม่เข้าสวนได้หนึ่งวัน และชำระเงินในบัญชี Klook เดียวกับตั๋ว"
          tours={thTours}
        />

        {/* A second authorized-reseller route. */}
        <GygCompare
          slug={GYG_SLUG}
          heading="พาสปอร์ตเดียวกันบน GetYourGuide"
          intro="โตเกียวดิสนีย์ไม่มีขายบัตรหน้าทางเข้า และวันที่ขายหมดก็เข้าไม่ได้ ถ้าวันที่ต้องการขายหมดในผู้ขายรายหนึ่ง ก็แทบไม่มีทางได้บัตรวันนั้นจากผู้ขายรายนั้น GetYourGuide ก็มี 1-Day Passport ทั้งดิสนีย์แลนด์และดิสนีย์ซี — ควรเปิดอีกแท็บดูก่อนตัดสินใจเลือกวัน"
          listings={[gygTokyoDisneyResort, gygTokyoDisneySea]}
        />

        {/* Related articles */}
        <Related
          items={[
            { href: "/guides/attractions/tokyo-5-day-itinerary", title: "แผนเที่ยวโตเกียว 5 วัน (2026): ห้าวัน วันต่อวัน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/legoland-japan-tickets", title: "ตั๋วเลโกแลนด์ญี่ปุ่น (2026): ราคา เวลาทำการ และคุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "ตั๋วจิบลิพาร์ค (2026): ราคา เปิดขายเมื่อไร และวิธีซื้อจากต่างประเทศ (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-airport-limousine-bus", title: "รถบัสลีมูซีนสนามบินโตเกียว (2026): ค่าโดยสาร เวลา และป้าย นาริตะ & ฮาเนดะ (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "ตั๋วซานริโอพูโรแลนด์ (2026): ราคา ราคาผันแปร และวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "ตั๋วฟูจิคิว ไฮแลนด์ (2026): ราคา Free Pass, Q Pack และวิธีเดินทาง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "ตั๋ว Warner Bros. Studio Tour Tokyo (2026): ราคาและวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/th/guides/attractions/teamlab-planets-tickets", title: "ตั๋ว teamLab Planets 2026 ราคา เวลา" },
            { href: "/guides/transport/tokyo-transportation", title: "เดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "กิจกรรมอื่น ๆ ในญี่ปุ่น (ภาษาอังกฤษ) →" },
            { href: "/th/guides/attractions/usj-tickets-express-pass", title: "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน" },
            { href: "/guides/attractions/sumo-tokyo-tickets", title: "ซูโม่ในโตเกียว (2026): ตั๋วการแข่งขัน vs ดูซ้อมตอนเช้า (ภาษาอังกฤษ)" },
          ]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองบัตรโตเกียวดิสนีย์สำหรับวันที่ต้องการไว้ล่วงหน้า</h2>
            <p className={styles.ctaBannerDesc}>
              ไม่มีขายบัตรหน้าทางเข้า วันที่ขายหมดเข้าไม่ได้ และบัตรสำหรับวันที่ต้องการเปิดขายล่วงหน้าสองเดือนตอน 14:00 เวลา
              ญี่ปุ่น Klook เป็นผู้ขายที่ได้รับอนุญาตอย่างเป็นทางการ รับบัตรต่างประเทศ และออก QR ที่ลงทะเบียนใน
              แอปทางการได้
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={thTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋วโตเกียวดิสนีย์ →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
