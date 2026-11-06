// Thai edition of /guides/attractions/teamlab-planets-tickets. Mirrors the English page as of
// 6 Nov 2026 section by section; no figure here is new to the Thai edition. Prices come from
// lib/attraction-prices.ts, the rest from the English page, read on teamlab.art/e/planets and
// the official ticket store on that date. teamLab publishes no busy hours and no visit length.
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
import { GygCompareButton } from "../../../../components/GygCompare";
import { PlanetsAnswer, PlanetsSameDay } from "../../../../components/PlanetsBooking";
import {
  fujiDayTour,
  tokyoBaySunsetBoatCruise,
  tokyoJoypolisPassport,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiCultureFoodTour,
} from "../../../../lib/klook-links";
import { thTeamlabPlanets } from "../../../../lib/klook-links-th";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTeamlabPlanets } from "../../../../lib/gyg-links";
import { PLANETS_FACTS, PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd, attractionEventJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const P = PRICES.teamlabPlanets;
const CHECKED = dateLabel(P.checked, "th");
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");

const ROUTE = "/th/guides/attractions/teamlab-planets-tickets";
const TITLE = "ตั๋ว teamLab Planets 2026 ราคา เวลา";
const DESC = `ตั๋ว teamLab Planets ${ADULT} ตามวันและเวลา เวลาเปิด วันปิด วิธีจอง`;

const PLANETS_URL = thTeamlabPlanets.url;
const GYG_SLUG = "th-teamlab-planets-tickets";

const priceRows = [
  {
    ticket: "ผู้ใหญ่ (18 ปีขึ้นไป)",
    price: ADULT,
    varies: "ใช่ — ตามวันและเวลาเข้าชม",
    note: "¥3,800 คือราคาต่ำสุด ไม่ใช่ราคาจริง ร้านตั้งราคาแยกกันทุกวันและทุกรอบ",
  },
  { ticket: "นักเรียนมัธยมต้น・ปลาย", price: "¥2,800", varies: "ไม่ — ราคาคงที่", note: "พกบัตรนักเรียนไปด้วย" },
  { ticket: "เด็ก (4–12 ปี)", price: CHILD, varies: "ไม่ — ราคาคงที่", note: "อายุต่ำกว่า 4 ปีไม่ต้องมีตั๋ว" },
  {
    ticket: "อายุไม่เกิน 3 ปี",
    price: priceLabel("Free", "th"),
    varies: "ไม่ — ฟรี",
    note: "เตรียมเสื้อผ้าสำรอง โซนน้ำทำให้ทุกคนเปียก",
  },
  {
    ticket: "ผู้พิการ",
    price: priceLabel("from ¥1,900", "th"),
    varies: "ใช่ — ปฏิทินเดียวกับตั๋วผู้ใหญ่",
    note: "พกเอกสารรับรองความพิการไปด้วย",
  },
  {
    ticket: "Premium Pass (4 ปีขึ้นไป)",
    price: "¥12,000",
    varies: "ไม่ — ราคาคงที่",
    note: "เข้าได้ทุกเวลาโดยไม่ต้องต่อคิวทางเข้า แต่ไม่ได้ข้ามคิวด้านใน",
  },
];

const hoursRows = [
  { item: "เวลาเปิด", detail: "08:00–22:00 และ 08:00–20:00 ตั้งแต่วันพฤหัสบดีที่ 31 ธันวาคมถึงวันเสาร์ที่ 2 มกราคม", source: `teamlab.art, ${CHECKED}` },
  { item: "รับเข้าครั้งสุดท้าย", detail: "หนึ่งชั่วโมงก่อนปิด", source: `teamlab.art, ${CHECKED}` },
  { item: "วันปิด", detail: "วันพฤหัสบดีที่ 3 ธันวาคม 2026 และวันพฤหัสบดีที่ 14 มกราคม 2027", source: `teamlab.art, ${CHECKED}` },
  { item: "ระยะเวลาจัดแสดง", detail: "7 กรกฎาคม 2018 ถึงสิ้นปี 2027", source: `teamlab.art, ${CHECKED}` },
  {
    item: "รอบเข้าชม",
    detail: "เวลาบนตั๋วคือเวลาเข้าชม และ 30 นาทีนับจากนั้นคือช่วงเตรียมตัวเข้า",
    source: `ร้านตั๋วทางการ, ${CHECKED}`,
  },
  {
    item: "เวลารอเข้า",
    detail: "อาจต้องรอที่ทางเข้า 30 ถึง 60 นาที",
    source: `ร้านตั๋วทางการ, ${CHECKED}`,
  },
  { item: "ช่วงที่คนเยอะ", detail: "ไม่มีข้อมูลจากทางการ", source: `ตรวจสอบ teamlab.art และร้านตั๋วทางการ, ${CHECKED}` },
  {
    item: "มาสายกว่ารอบ",
    detail: "ยังเข้าได้ในวันเดียวกันภายในเวลาทำการ โดยไม่เกินเวลารับเข้าครั้งสุดท้าย",
    source: `ร้านตั๋วทางการ, ${CHECKED}`,
  },
  {
    item: "เวลาที่ควรเผื่อในสถานที่",
    detail: "ไม่มีข้อมูลจากทางการ เราวางแผนไว้ 1.5–2 ชั่วโมง รวมเวลาที่ล็อกเกอร์และเช็ดตัว",
    source: "ตัวเลขวางแผนของเรา",
  },
  {
    item: "ล็อกเกอร์",
    detail: "ฟรี กว้าง 23 ซม. × ลึก 34 ซม. × สูง 37 ซม. ไม่มีจุดรับฝากสำหรับของที่ใหญ่กว่านี้",
    source: `ร้านตั๋วทางการ, ${CHECKED}`,
  },
];

const ticketChoice = [
  {
    title: "Entrance Pass — ผู้ใหญ่เริ่มต้น ¥3,800",
    desc: `ตั๋วปกติ และเป็นตั๋วที่แทบทุกคนต้องการ ตั๋วนี้ระบุวันและเวลาเข้าชม และร้านทางการตั้งราคาแต่ละชุดแยกกัน วันที่คุณเลือกจึงสำคัญกว่าผู้ขายที่คุณเลือก อ่านเมื่อ ${CHECKED}`,
  },
  {
    title: "Premium Pass — ¥12,000 อายุ 4 ปีขึ้นไป",
    desc: `สิ่งที่ร้านทางการบอกว่าได้มีอย่างเดียว: เข้าได้ทุกเวลาโดยไม่ต้องต่อคิวทางเข้า โดยไปที่ Information Centre แทน และระบุชัดว่าไม่ได้ข้ามคิวภายในนิทรรศการ คุ้มก็ต่อเมื่อการรอที่ทางเข้า 30–60 นาทีจะทำให้แผนทั้งวันพัง ไม่ใช่การอัปเกรดทั่วไป อ่านเมื่อ ${CHECKED}`,
  },
  {
    title: "เปลี่ยนได้ แต่คืนเงินไม่ได้",
    desc: `ซื้อแล้วคืนเงินไม่ได้ทุกกรณี แต่ย้ายได้: หน้าช่วยเหลือของร้านอนุญาตให้เปลี่ยน Entrance Pass ได้จนถึง 2 ชั่วโมงก่อนเวลาเข้าชม และ Premium Pass ได้จนถึง 08:30 ของวันนั้น เปลี่ยนได้สูงสุดสามครั้งทั้งสองแบบ และตั๋วที่ซื้อด้วยคูปองเปลี่ยนไม่ได้เลย อ่านเมื่อ ${CHECKED}`,
  },
];

const steps = [
  {
    title: "เลือกวันก่อน แล้วอ่านราคาจากปฏิทิน",
    desc: `ตั๋วผู้ใหญ่เริ่มต้น ¥3,800 และยอดที่คุณจ่ายขึ้นอยู่กับวันและเวลาเข้าชมที่เลือก หน้าช่วยเหลือของร้านเองยืนยันว่าอัตราราคาต่างกันในแต่ละวัน ไล่ดูวันที่คุณไปได้ก่อนตัดสินใจเลือกวันเดียว อ่านเมื่อ ${CHECKED}`,
  },
  {
    title: "เลือกเวลาเข้าชม เพราะนั่นคือการจอง",
    desc: "เวลาบนตั๋วคือเวลาเข้าชม และ 30 นาทีนับจากนั้นคือช่วงเตรียมตัวเข้า ที่พิพิธภัณฑ์ไม่มีเคาน์เตอร์ให้พึ่ง รอบที่คุณเลือกจึงเป็นการเข้าชมที่คุณได้ รวมถึงวันจริงซึ่งปฏิทินอาจเต็มไปแล้ว",
  },
  {
    title: "เลือกระหว่าง Entrance Pass กับ Premium Pass",
    desc: "มีสี่ระดับราคาบวก Premium Pass ราคา ¥12,000 และมีแค่อย่างเดียวที่เกี่ยวกับคิว อ่านตารางตั๋วด้านบนก่อน: Premium Pass ซื้อได้แค่การเข้าโดยไม่ต้องต่อคิวทางเข้า ไม่มีอย่างอื่น คนส่วนใหญ่จึงควรเลือก Entrance Pass แล้วจองรอบที่เช้ากว่าแทน",
  },
  {
    title: "ซื้อจากร้านทางการหรือผู้ขายที่ร้านระบุชื่อ",
    desc: `หน้าช่วยเหลือของร้านทางการระบุว่าไม่มีการขายตั๋วหน้างานที่เคาน์เตอร์หรือเครื่องขายตั๋ว และระบุช่องทางที่ขาย ได้แก่ Ticket Store ทางการ, Lawson Ticket, Seven Ticket และ Klook หน้าชำระเงินของ Klook เป็นภาษาไทยและใช้สกุลเงินของคุณเอง ซึ่งเป็นเหตุผลในทางปฏิบัติที่นักท่องเที่ยวส่วนใหญ่ใช้ Klook ไม่ว่าทางไหน ตั๋วคือ QR code บนมือถือ อ่านเมื่อ ${CHECKED}`,
  },
  {
    title: "แต่งตัวให้พร้อมลุยน้ำ และไปถึงตอนรอบเริ่ม",
    desc: "ใส่กางเกงขาสั้นหรือกางเกงที่ม้วนขึ้นเหนือเข่าได้ บางผลงานเป็นพื้นที่น้ำ และน้ำอาจสูงถึงระดับหัวเข่าผู้ใหญ่ มีกางเกงขาสั้นให้ยืมฟรีไซส์ XS ถึง 6L ถ้าคุณใส่กระโปรงหรือกางเกงขากว้างมา เพราะพื้นบางส่วนเป็นกระจก การรอที่ทางเข้าอาจนาน 30 ถึง 60 นาที จึงควรไปถึงตอนรอบของคุณเปิด",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว teamLab Planets ปี 2026 ราคาเท่าไร?",
    a: `ตามร้านตั๋วทางการของ teamLab Planets ที่ตรวจสอบเมื่อ ${CHECKED} ตั๋วผู้ใหญ่เริ่มต้น ¥3,800 นักเรียนมัธยมต้นและปลาย ¥2,800 เด็กอายุ 4–12 ปี ${CHILD} และเด็กอายุไม่เกิน 3 ปีเข้าฟรี ผู้พิการเริ่มต้น ¥1,900 และมี Premium Pass ราคา ¥12,000 สำหรับอายุ 4 ปีขึ้นไป ราคาผู้ใหญ่เปลี่ยนตามวันและรอบเวลา จึงควรเช็กยอดของรอบตัวเองก่อนจ่าย ตั๋วลดราคาต้องมีหลักฐาน พกบัตรนักเรียน พาสปอร์ต หรือเอกสารรับรองความพิการไปด้วย`,
  },
  {
    q: "ต้องจอง teamLab Planets ล่วงหน้าไหม?",
    a: `ต้อง ตั๋วระบุวันและเวลาเข้าชม และร้านทางการระบุว่าไม่มีการขายหน้างาน ถ้าวันของคุณเต็มจึงแก้ที่หน้าประตูไม่ได้ teamLab ไม่เผยแพร่ข้อมูลการขายหมด ตั๋วเต็มล่วงหน้านานแค่ไหนจึงไม่มีข้อมูลจากทางการ จองทันทีที่วันเดินทางแน่นอน อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "ซื้อตั๋ว teamLab Planets หน้างานได้ไหม?",
    a: `ไม่ได้ หน้าช่วยเหลือของร้านตั๋วทางการระบุว่าไม่มีการขายตั๋วหน้างานที่เคาน์เตอร์หรือเครื่องขายตั๋ว และระบุช่องทางที่ขาย ได้แก่ Ticket Store ทางการ, Lawson Ticket, Seven Ticket และ Klook ถ้าวันของคุณเต็มก็ไม่มีช่องขายหน้างานให้พึ่ง ซึ่งเป็นความต่างที่ใหญ่ที่สุดระหว่าง Planets กับสถานที่ส่วนใหญ่ในโตเกียว อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "รอบเวลาไหนของ teamLab Planets ถูกที่สุด?",
    a: `รอบที่ปฏิทินทางการตั้งราคาต่ำสุดในวันของคุณ — teamLab ไม่เผยแพร่ราคาแยกตามรอบ นั่นจึงเป็นคำตอบเดียวที่ตรงไปตรงมา สิ่งที่ร้านทางการยืนยันคือ Entrance Pass ผู้ใหญ่เริ่มต้น ¥3,800 และอัตราราคาต่างกันในแต่ละวัน หน้าช่วยเหลือบอกว่าย้ายการจองได้ "แม้ไปยังวันที่มีอัตราราคาต่างกัน" ดังนั้นให้เปิดปฏิทินของร้าน ไล่ดูวันและเวลาเข้าชมที่ทริปของคุณรับได้ แล้วเทียบราคาก่อนจ่าย ไม่ใช่หลังจ่าย อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "teamLab Planets มีล็อกเกอร์ไหม?",
    a: `มี และฟรี หน้าช่วยเหลือทางการระบุขนาดกว้าง 23 ซม. ลึก 34 ซม. สูง 37 ซม. เป้สะพายใบเล็กใส่ได้ แต่กระเป๋าเดินทางใส่ไม่ได้ ไม่มีจุดรับฝากของ ของที่ใหญ่กว่านั้นคุณต้องล็อกเองด้วยสายล็อกที่ที่จอดรถเข็นเด็กนอกอาคาร รองเท้า ถุงเท้า และถุงน่องก็ถอดไว้ที่ล็อกเกอร์ด้วย เพราะจากจุดนั้นพิพิธภัณฑ์ต้องเดินเท้าเปล่า อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "ไป teamLab Planets ควรใส่อะไร?",
    a: "กางเกงขาสั้น หรือกางเกงที่ม้วนขึ้นเหนือเข่าได้ บางผลงานเป็นพื้นที่น้ำและน้ำอาจสูงถึงระดับหัวเข่าผู้ใหญ่ และทั้งพิพิธภัณฑ์ชมแบบเท้าเปล่า คุณจะถอดรองเท้า ถุงเท้า และถุงน่องที่ห้องล็อกเกอร์ตอนเข้า พื้นบางส่วนเป็นกระจก กระโปรงและกางเกงขากว้างจึงไม่ใช่ตัวเลือกที่ดี มีกางเกงขาสั้นให้ยืมฟรีไซส์ XS ถึง 6L ถ้ามากับเด็กให้เตรียมเสื้อผ้าสำรอง และรถเข็นเด็กเข้าไปด้านในไม่ได้ (มีที่จอดรถเข็น และใช้เป้อุ้มเด็กได้)",
  },
  {
    q: "จะได้รับตั๋ว QR ของ teamLab Planets เมื่อไร?",
    a: `ตั๋วเป็นตั๋ว QR เท่านั้น อีเมลยืนยันการซื้อมีลิงก์ตั๋ว อีเมลแจ้งเตือนจะมาก่อนวันเข้าชม 2 วัน และรหัส QR จะแสดงตั้งแต่ 00:00 ของวันเข้าชม QR เดียวใช้ได้กับทุกคนในการซื้อครั้งนั้น แสดงบนมือถือ แท็บเล็ต หรือพิมพ์ออกมาก็ได้ อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "teamLab Planets ใช้เวลานานแค่ไหน?",
    a: `teamLab ไม่ได้ระบุเวลาเข้าชม เราวางแผนไว้ 1.5 ถึง 2 ชั่วโมงด้านใน รวมเวลาที่ล็อกเกอร์และเช็ดตัว บวกเวลารอเข้า 30 ถึง 60 นาทีที่ร้านทางการเตือนไว้ และอย่าวางนัดกระชั้นต่อทันที ร้านทางการยังระบุว่าช่วงคนเยอะ ผู้เข้าชมที่อยู่นานอาจถูกขอให้เดินต่อ อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "teamLab Planets เปิดกี่โมง และปิดวันไหน?",
    a: `teamlab.art ระบุเวลาเปิด 08:00–22:00 และ 08:00–20:00 ตั้งแต่ 31 ธันวาคมถึง 2 มกราคม รับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด วันปิดที่ระบุไว้คือวันพฤหัสบดีที่ 3 ธันวาคม 2026 และวันพฤหัสบดีที่ 14 มกราคม 2027 อ่านเมื่อ ${CHECKED} ควรเช็กเว็บไซต์ทางการด้วยวันของคุณก่อนจอง`,
  },
  {
    q: "ถ้าพลาดรอบเวลาที่จอง teamLab Planets ไว้จะเป็นอย่างไร?",
    a: "ยังเข้าได้ หน้าช่วยเหลือทางการระบุว่าเวลาที่พิมพ์ไว้เป็นเวลาอ้างอิง และถ้ามาสายก็ยังเข้าได้ในวันเดียวกันภายในเวลาทำการ รับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด",
  },
  {
    q: "teamLab Planets อยู่ที่ไหน และไปอย่างไร?",
    a: `อยู่ที่ 6-1-16 Toyosu, Koto-ku teamlab.art ระบุว่าเดิน 3 นาทีจากทางออก 1A สถานีชินโทโยสุ สายยูริคาโมเมะ เดิน 5 นาทีจากสถานีชิโจมาเอะและตลาดโทโยสุ และเดิน 10 นาทีจากทางออก 7 สถานีโทโยสุ สายยูรากุโจของโตเกียวเมโทร นั่งแท็กซี่จากสถานีโตเกียว 15 นาที หรือใช้ทางด่วนจากสนามบินฮาเนดะ 15 นาที อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "teamLab Planets จะปิดแล้วหรือ?",
    a: `teamlab.art ระบุระยะเวลาจัดแสดงตั้งแต่ 7 กรกฎาคม 2018 ถึงสิ้นปี 2027 อ่านเมื่อ ${CHECKED} ส่วน teamLab Borderless ที่อาซาบุไดฮิลส์เป็นพิพิธภัณฑ์แยกที่มีตั๋วของตัวเอง`,
  },
  {
    q: "teamLab Planets กับ Borderless ต่างกันอย่างไร?",
    a: "Planets ที่โทโยสุคือพิพิธภัณฑ์ที่คุณเดินเท้าเปล่าลุยน้ำ ส่วน Borderless ที่อาซาบุไดฮิลส์คือเขาวงกตไร้แผนที่ที่ผลงานเคลื่อนย้ายระหว่างห้อง ทั้งสองเป็นพิพิธภัณฑ์แยกกันและตั๋วแยกกัน หน้าเปรียบเทียบ teamLab โตเกียวของเราวางทั้งสองแห่งไว้เทียบกัน",
  },
];

// Same-day picks and day trips: the English page's products, on Klook's Thai path.
const sameDayTours = [
  withKlookLocale(tokyoJoypolisPassport, "th", {
    title: "Tokyo Joypolis Passport",
    desc: "พาสปอร์ตเข้าชมพร้อมเล่นเครื่องเล่นไม่จำกัดของสวนสนุกในร่ม DECKS ที่โอไดบะ ใช้ QR code บนมือถือ หน้าสินค้าแนะนำเวลา 2 ถึง 4 ชั่วโมง",
  }),
  withKlookLocale(tokyoBaySunsetBoatCruise, "th", {
    title: "ล่องเรืออ่าวโตเกียว รอบกลางวันและพระอาทิตย์ตก",
    desc: "ล่องเรือลำเล็กหนึ่งชั่วโมงจากชิบาอุระ มีไกด์บนเรือ — เวอร์ชันไม่มีอาหารเย็นของการล่องเรืออ่าว",
  }),
  withKlookLocale(tsukijiCultureFoodTour, "th", {
    title: "ทัวร์วัฒนธรรมและอาหารสึกิจิ",
    desc: "เดินชมตลาดนอกสึกิจิกับไกด์ พร้อมชิมอาหารและแวะนั่งทานซูชิ นำทัวร์เป็นภาษาอังกฤษ จีน หรือสเปน",
  }),
  withKlookLocale(tokyoSubwayTicket, "th", {
    title: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    desc: "นั่งได้ไม่จำกัดทุกสายของ Tokyo Metro และ Toei Subway รับตั๋วเมื่อมาถึงแทนการต่อคิวซื้อ",
  }),
];

const dayTrips = [
  withKlookLocale(fujiDayTour, "th", {
    title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว",
    desc: "นั่งรถโค้ชเต็มวันไปสถานีที่ 5 ของฟูจิ ทะเลสาบคาวากุจิ และโอชิโนะฮักไก กลับถึงโตเกียวเย็นวันเดียวกัน",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "th", {
    title: "ทัวร์รถบัสชมเมืองโตเกียว 1 วัน",
    desc: "ทัวร์มีไกด์วนชมสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมออดิโอไกด์หลายภาษา",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว teamLab Planets" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: attractionEventJsonLd({
              route: ROUTE,
              name: "teamLab Planets TOKYO",
              description: DESC,
              inLanguage: JSONLD_LANG.th,
              facts: PLANETS_FACTS,
            }),
          }}
        />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            ตั๋ว teamLab Planets (2026):<br />ราคา เวลาเปิด และวิธีจอง
          </h1>
          <p className={styles.heroSubtitle}>
            ตั๋ว teamLab Planets ที่โทโยสุราคาเท่าไร เปิดกี่โมง จองอย่างไร และเดินทางจากสถานีชินโทโยสุหรือโทโยสุอย่างไร
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาและเวลาเปิดทางการ", "ตรวจสอบจาก teamlab.art"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <PlanetsAnswer />

        <PlanetsSameDay />

        <p className={styles.bodyText}>
          กำลังเลือกระหว่างสองพิพิธภัณฑ์ในโตเกียว? <Link href="/th/guides/attractions/teamlab-tokyo-tickets">หน้าเปรียบเทียบ teamLab Planets หรือ Borderless</Link> ของเราวางทั้งสองแห่งไว้เทียบกัน
        </p>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋ว teamLab Planets ปี 2026 ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้ใหญ่จ่าย <strong>{ADULT}</strong> นักเรียนมัธยมต้นหรือปลาย ¥2,800 เด็กอายุ 4–12 ปี ¥1,500 และเด็ก
            อายุต่ำกว่า 4 ปีไม่ต้องจ่ายเลย มีแค่ระดับผู้ใหญ่และผู้พิการที่ราคาขยับ: ร้านทางการตั้งราคาแยกทุกวันและ
            ทุกเวลาเข้าชม ตัวเลขของร้านเองจึงมีเครื่องหมาย ~ ต่อท้าย และตั๋วที่ถูกที่สุดในทริปของคุณจึงเป็นเรื่อง
            ของปฏิทิน ไม่ใช่เรื่องของผู้ขาย
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ตั๋ว", "ราคา (เริ่มต้น)", "เปลี่ยนตามวันไหม?", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            อ่านจากร้านตั๋วทางการของ teamLab Planets เมื่อ {CHECKED} ทั้งฉบับภาษาอังกฤษและภาษาญี่ปุ่น ตั๋วลดราคา
            ต้องมีหลักฐานสิทธิ์ จึงควรพกบัตรนักเรียน พาสปอร์ต หรือเอกสารรับรองความพิการ ตั๋วออกเป็น QR code บน
            มือถือ
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>ราคาผู้ใหญ่ขยับได้มากแค่ไหนไม่มีการเผยแพร่</strong> teamLab พิมพ์ราคาเริ่มต้นและปฏิทิน ไม่ใช่
            ตารางราคา และหน้าช่วยเหลือยืนยันแค่ว่าอัตราราคาต่างกัน — การจองย้ายได้ &ldquo;แม้ไปยังวันที่มีอัตรา
            ราคาต่างกัน&rdquo; ดังนั้นให้ถือ ¥3,800 เป็นราคาต่ำสุด เปิดปฏิทินของร้านในวันที่ทริปของคุณรับได้ แล้ว
            เทียบเวลาเข้าชมของแต่ละวันก่อนจ่าย การเลื่อนวันไป Planets หนึ่งวันคือตัวช่วยจริง การหาผู้ขายที่ถูกกว่า
            ไม่ใช่ เพราะวันเป็นตัวกำหนดราคา
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ก่อนจอง</span>
          <h2 className={styles.sectionTitle}>เวลาเปิด รอบเข้าชม และเวลาที่ต้องใช้</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            เวลาที่พิมพ์บนตั๋วคือเวลาเข้าชม และร้านทางการเตือนว่าอาจต้องรอ 30 ถึง 60 นาที teamLab ไม่ได้ระบุทั้งช่วงที่คนเยอะและเวลาที่ใช้ในการเข้าชม
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "ข้อมูลจากแหล่งทางการ", "แหล่งที่มาและวันที่"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Planets ยังขออะไรจากคุณมากกว่าตั๋วพิพิธภัณฑ์ทั่วไป — คุณเข้าแบบเท้าเปล่า และเส้นทางส่วนหนึ่งเป็นน้ำ:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>เท้าเปล่า:</strong> รองเท้า ถุงเท้า และถุงน่องถอดไว้ที่ล็อกเกอร์ ประสบการณ์ทั้งหมดเป็นแบบเท้าเปล่า</li>
            <li><strong>น้ำ:</strong> บางผลงานเป็นพื้นที่น้ำ และน้ำอาจสูงถึงระดับหัวเข่าผู้ใหญ่ ใส่กางเกงขาสั้นหรือกางเกงที่ม้วนขึ้นได้</li>
            <li><strong>พื้นกระจก:</strong> กระโปรงและกางเกงขากว้างเป็นปัญหา — FAQ ทางการบอกว่าอาจเห็นชุดชั้นใน มีกางเกงขาสั้นให้ยืมฟรีไซส์ XS ถึง 6L</li>
            <li><strong>มากับเด็ก:</strong> เตรียมเสื้อผ้าสำรอง รถเข็นเด็กเข้าด้านในไม่ได้ — มีที่จอดรถเข็นด้านนอก และใช้เป้อุ้มเด็กได้</li>
            <li><strong>สัมภาระ:</strong> ล็อกเกอร์ฟรีรับขนาด 23 × 34 × 37 ซม. ไม่มีจุดรับฝากของ กระเป๋าเดินทางจึงต้องล็อกเองด้วยสายล็อกที่ที่จอดรถเข็น</li>
            <li><strong>ความสะอาดของน้ำ:</strong> FAQ ทางการระบุว่าน้ำผ่านการกรองตลอดเวลาและวัดค่าคลอรีนทุกชั่วโมง พร้อมผ้าขนหนูฆ่าเชื้อที่ทางออก</li>
            <li><strong>รถเข็นวีลแชร์:</strong> เข้าได้ และเจ้าหน้าที่จะอธิบายเส้นทาง บางผลงานเข้าไม่ถึง และโซนน้ำต้องย้ายไปนั่งวีลแชร์พิเศษพร้อมผู้ติดตาม</li>
          </ul>
          <p className={styles.bodyText}>
            ควรเช็กเว็บไซต์ทางการด้วยวันเดินทางของคุณก่อนจอง ข้อมูลข้างต้นทั้งหมดยกเว้นเวลาที่ควรเผื่อมาจากแหล่งทางการ อ่านในวันที่ระบุในตาราง ร้านทางการยังระบุว่าช่วงคนเยอะ ผู้เข้าชมที่อยู่นานอาจถูกขอให้เดินต่อ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>คุณจ่ายเพื่ออะไร</span>
          <h2 className={styles.sectionTitle}>teamLab Planets คืออะไรจริง ๆ</h2>
          <p className={styles.bodyText}>
            teamLab คือกลุ่มศิลปินในโตเกียวที่มีชื่อเรื่องงานติดตั้งดิจิทัลเต็มห้องที่คุณเดินเข้าไป ไม่ใช่แค่มองดู
            Planets ที่โทโยสุคือแห่งที่ใช้ร่างกาย: คุณเดินเท้าเปล่า ลุยน้ำ และเคลื่อนผ่านผลงานที่ตอบสนองต่อการ
            มีอยู่ของคุณ — ห้องกระจกไร้ที่สิ้นสุด ห้องโถงที่เต็มไปด้วยลูกกลมลอยได้ และสวนที่มีชีวิต เป็นแห่งที่สนุก
            กับเด็กได้ง่ายกว่าในสองพิพิธภัณฑ์ teamLab ของโตเกียว และเป็นแห่งที่ประทับใจที่สุดถ้าคุณไม่เคยเห็น
            ศิลปะดิจิทัลสเกลนี้มาก่อน
          </p>
          <p className={styles.bodyText}>
            teamlab.art ระบุระยะเวลาจัดแสดงตั้งแต่ 7 กรกฎาคม 2018 ถึงสิ้นปี 2027 ถ้าทริปของคุณอยู่หลังจากนั้นจึงควรเช็กอีกครั้ง
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การตัดสินใจ</span>
          <h2 className={styles.sectionTitle}>teamLab Planets คุ้มไหม?</h2>
          <p className={styles.bodyText}>
            สำหรับคนที่มาโตเกียวครั้งแรกส่วนใหญ่ คุ้ม — แต่เป็นสถานที่ 1.5 ถึง 2 ชั่วโมงในราคา {ADULT} ต่อคน จึงตั้ง
            ราคาเหมือนครึ่งวันแต่ใช้เวลาเท่ามื้อกลางวันยาว ๆ นี่คือตัวเลขให้คุณคิดเอง แทนคำตัดสินจากเรา:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>ราคาต่อชั่วโมงสูง</strong> เริ่มต้น ¥3,800 สำหรับ 1.5–2 ชั่วโมง แพงกว่า Main Deck ของโตเกียวทาวเวอร์ที่ ¥1,500 มากกว่าสองเท่า และสูงกว่าตั๋วออนไลน์ช่วงกลางวันของ Shibuya Sky ที่ {PRICES.shibuyaSky.adult.split(" / ")[0]} มาก ซึ่งทั้งสองที่คุณอยู่ได้นาน คุณจ่ายเพื่อสิ่งที่ไม่มีที่อื่น ไม่ใช่เพื่อความยาว — เทียบตัวเลขได้ในตาราง<Link href="/guides/attractions/japan-attraction-ticket-prices">ราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)</Link></li>
            <li><strong>ต้นทุนการเข้าคือเวลา ไม่ใช่แค่เงิน</strong> ร้านทางการเตือนว่าอาจต้องรอเข้า 30 ถึง 60 นาที บวกเวลาถอดรองเท้า</li>
            <li><strong>เป็นพิพิธภัณฑ์ที่ใช้ร่างกายมากที่สุดในโตเกียว</strong> เท้าเปล่าตลอด น้ำถึงหัวเข่าผู้ใหญ่ พื้นกระจก ถ้าฟังดูเป็นความลำบากมากกว่าประสบการณ์ Borderless ที่อาซาบุไดคือกลุ่มศิลปินเดียวกันแต่ไม่มีน้ำ</li>
            <li><strong>ไม่กลัวฝน และเหมาะกับเด็ก</strong> อยู่ในร่ม เด็กต่ำกว่า 4 ปีฟรี และเป็นสิ่งที่เด็ก ๆ จำได้จากทริปบ่อยกว่าวัด</li>
            <li><strong>แก้ไขในวันจริงไม่ได้</strong> ไม่มีขายหน้างาน ปฏิทินเต็มคือจบ ถ้าพลาด คุณเสียแผนทั้งบ่ายวันนั้น ซึ่งเป็นเหตุผลจริงที่ควรจองที่นี่เป็นอย่างแรก</li>
          </ul>
          <p className={styles.bodyText}>
            ข้ามไปได้ถ้าวันในโตเกียวของคุณแน่นอยู่แล้ว ถ้ารอบตายตัว 30 นาทีจะทำลายวันที่คุณอยากเที่ยวแบบตามใจ หรือ
            ถ้าไม่มีใครในกลุ่มอยากม้วนขากางเกง นี่คือสามเหตุผลที่ตั๋วนี้ทำให้ผิดหวัง และไม่มีข้อไหนเกี่ยวกับตัวงาน
            ศิลปะ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ความว่างของรอบ</span>
          <h2 className={styles.sectionTitle}>ตั๋ว teamLab Planets ขายหมดไหม?</h2>
          <p className={styles.bodyText}>
            แต่ละเวลาเข้าชมขายหมดได้ และเมื่อวันของคุณเต็มก็ไม่มีเคาน์เตอร์ให้พึ่ง: ร้านทางการระบุชัดว่าไม่มีการขาย
            ตั๋วหน้างานที่เคาน์เตอร์หรือเครื่องขายตั๋ว Planets จึงเป็นสิ่งแรกที่ควรจองในสัปดาห์ที่โตเกียว ไม่ใช่สิ่ง
            สุดท้าย
          </p>
          <ul className={styles.bodyList}>
            <li><strong>ควรจองล่วงหน้านานแค่ไหน:</strong> ไม่มีข้อมูลจากทางการ และ teamLab ไม่เผยแพร่ข้อมูลการขายหมด จองเมื่อวันเดินทางแน่นอน</li>
            <li><strong>ไม่มีตั๋วหน้างาน:</strong> เป็นข้อมูลทางการ ตรวจสอบเมื่อ {CHECKED} ขายออนไลน์เท่านั้น ผ่าน Ticket Store ทางการ, Lawson Ticket, Seven Ticket หรือ Klook</li>
            <li><strong>ครั้งละสิบใบ:</strong> ร้านจำกัดการซื้อต่อครั้งไว้ที่ 10 ใบ และจำนวนคงเหลืออาจจำกัดให้น้อยกว่านั้น กลุ่ม 20 คนขึ้นไปต้องสมัครผ่านขั้นตอนกลุ่มแยกต่างหาก</li>
            <li><strong>จองรอบผิด?</strong> เปลี่ยนแทนการจองใหม่ Entrance Pass ย้ายได้จนถึงสองชั่วโมงก่อนเวลาเข้าชม สูงสุดสามครั้ง Premium Pass ได้จนถึง 08:30 ของวันนั้น ไม่มีการคืนเงิน และตั๋วคูปองเปลี่ยนไม่ได้เลย</li>
            <li><strong>มาสายยังรอด พลาดทั้งวันไม่รอด:</strong> FAQ ทางการบอกว่ายังเข้าได้ภายหลังในวันเดียวกันภายในเวลาทำการ โดยไม่เกินเวลารับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด</li>
          </ul>
          <p className={styles.bodyText}>
            ผลในทางปฏิบัติ: เลือกวัน แล้วเลือกเวลาเข้าชม แล้วค่อยเลือกผู้ขาย สองในสามอย่างนี้ตัดสินว่าคุณจะได้เข้า
            หรือไม่
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ตั๋วแบบไหน</span>
          <h2 className={styles.sectionTitle}>ควรซื้อตั๋ว teamLab Planets แบบไหน?</h2>
          <p className={styles.bodyText}>
            Entrance Pass ในเกือบทุกกรณี ตัวเลือกอื่นมีแค่ Premium Pass ราคา ¥12,000 และสิ่งเดียวที่ร้านทางการบอก
            ว่าได้คือการเข้าโดยไม่ต้องต่อคิวทางเข้า — จึงคุ้มถ้าการรอ 30 ถึง 60 นาทีจะทำให้วันของคุณพัง และเสีย
            ¥8,000 เปล่า ๆ ถ้าไม่
          </p>
          <div className={styles.stepsList}>
            {ticketChoice.map((item, i) => (
              <div key={item.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>ส่วนเวลาเข้าชม:</strong> ช่วงที่คนเยอะไม่มีข้อมูลจากทางการ และ teamLab ไม่เผยแพร่ราคาแยกตามรอบ ปฏิทินจะแสดงราคาของแต่ละเวลา เปิดดูได้จากผู้ขายทั้งสองด้านล่าง
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดูวันและรอบของ teamLab Planets →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook เป็นหนึ่งในผู้ขายที่ร้านทางการระบุชื่อ ส่วน GetYourGuide เป็นที่ที่สองให้ดูเมื่อรอบหายไป ทั้งสอง
            ตั้งราคาตามวัน จึงควรเปิดปฏิทินแทนการเชื่อตัวเลขหัวข้อ — รวมถึงตัวเลขในหน้านี้ด้วย
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>จอง teamLab Planets โตเกียวอย่างไร?</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            พร้อมล็อกรอบแล้ว?{" "}
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL}>
              ดูรอบว่างและราคาของ Planets บน Klook →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ซื้อตรง</span>
          <h2 className={styles.sectionTitle}>เว็บไซต์ตั๋วทางการของ teamLab Planets อยู่ที่ไหน?</h2>
          <p className={styles.bodyText}>
            หน้าของพิพิธภัณฑ์เองคือ <strong>teamlab.art/e/planets</strong> และตั๋วขายผ่าน{" "}
            <strong>teamLab Planets TOKYO Official Ticket Store</strong> ที่ <strong>teamlabplanets.dmm.com</strong>{" "}
            — ร้านนี้ ไม่ใช่ผลการค้นหา คือหน้าชำระเงินทางการ หน้าช่วยเหลือของร้านยังเป็นที่มาของกฎการจองทุกข้อใน
            หน้านี้ อ่านเมื่อ {CHECKED}
          </p>
          <ul className={styles.bodyList}>
            <li><strong>ใครอีกที่เป็นทางการ:</strong> ร้านระบุชื่อ Lawson Ticket, Seven Ticket และ Klook ควบคู่กับตัวเอง ที่ไม่อยู่ในรายชื่อนี้คือผู้ขายต่อที่คุณไม่มีเหตุผลต้องใช้</li>
            <li><strong>ร้านรับชำระอย่างไร:</strong> บัตรเครดิต PayPay และ UnionPay ผ่าน DMM ถ้าบัตรของคุณถูกปฏิเสธ — ซึ่งเป็นเหตุผลปกติที่นักท่องเที่ยวไปซื้อที่อื่น — ผู้ขายที่มีระบบชำระเงินระหว่างประเทศช่วยแก้ได้</li>
            <li><strong>ตั๋วมาถึงอย่างไร:</strong> อีเมลพร้อมลิงก์ไปยังตั๋ว QR สองวันก่อนเข้าชม และตัว QR code จะแสดงตั้งแต่ 00:00 ของวันเข้าชม</li>
            <li><strong>สิ่งที่ซื้อตรงไม่ได้ให้:</strong> ราคาที่ถูกกว่า วันและเวลาเข้าชมเป็นตัวกำหนดราคา และร้านตั้งราคาบนปฏิทินเดียวกันไม่ว่าคุณใช้ช่องทางทางการไหน</li>
          </ul>
          <p className={styles.bodyText}>
            พูดง่าย ๆ คือ ซื้อตรงถ้าบัตรของคุณใช้ได้และอ่านร้านภาษาญี่ปุ่นหรืออังกฤษได้สบาย ซื้อจากผู้ขายที่ระบุชื่อ
            ถ้าอยากชำระเงินเป็นภาษาและสกุลเงินของคุณเอง ทั้งสองทางเป็นทางการ และไม่มีทางไหนเป็นทางลัด
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>มากับเด็ก</span>
          <h2 className={styles.sectionTitle}>teamLab Planets เหมาะกับเด็กไหม?</h2>
          <p className={styles.bodyText}>
            เป็นพิพิธภัณฑ์ที่เป็นมิตรกับเด็กที่สุดในโตเกียว และเป็นแห่งที่มีกฎมากที่สุด เด็กต่ำกว่า 4 ปีฟรี 4–12 ปี
            จ่าย ¥1,500 น้ำในบางจุดสูงถึงหัวเข่าผู้ใหญ่ — จึงสูงกว่านั้นสำหรับเด็ก — และรถเข็นเด็กเข้าด้านในไม่ได้
            เลย ทุกข้อด้านล่างเป็นถ้อยคำทางการ อ่านเมื่อ {CHECKED}
          </p>
          <ul className={styles.bodyList}>
            <li><strong>อายุและราคา:</strong> เด็กอายุไม่เกิน 3 ปีไม่ต้องเสียค่าตั๋ว 4–12 ปี ¥1,500 มัธยมต้นและปลาย ¥2,800 Premium Pass ขายตั้งแต่อายุ 4 ปี</li>
            <li><strong>การดูแล:</strong> ผู้ใหญ่หนึ่งคนต้องดูแลเด็กทุกสามคน พ่อหรือแม่คนเดียวกับเด็กเล็กสี่คนเป็นการจองที่ร้านไม่รับ</li>
            <li><strong>รถเข็นเด็ก:</strong> นำเข้าพิพิธภัณฑ์ไม่ได้ มีที่จอดรถเข็นนอกอาคารที่คุณล็อกเองด้วยกุญแจสายล็อก และใช้เป้อุ้มเด็กด้านในได้</li>
            <li><strong>ผ้าอ้อม:</strong> โต๊ะเปลี่ยนผ้าอ้อมอยู่ในห้องน้ำหญิง</li>
            <li><strong>น้ำ:</strong> ระดับหัวเข่าผู้ใหญ่ และทั้งเส้นทางเป็นเท้าเปล่า เตรียมเสื้อผ้าสำรอง และคาดไว้ว่าทุกคนจะเปียก ไม่ใช่แค่เด็ก</li>
            <li><strong>เสื้อผ้า:</strong> กางเกงขาสั้นหรือกางเกงที่ม้วนขึ้นได้สำหรับทุกคน พื้นบางจุดเป็นกระจก กางเกงขาสั้นให้ยืมฟรีมีไซส์ XS ถึง 6L เด็กที่ใส่ชุดกระโปรงมาก็ไม่มีปัญหา</li>
            <li><strong>ที่เก็บของ:</strong> ล็อกเกอร์ฟรีขนาด 23 × 34 × 37 ซม. — กระเป๋าผ้าอ้อมใส่ได้ กระเป๋าเดินทางใส่ไม่ได้ และของขนาดใหญ่ต้องไปไว้ที่ที่จอดรถเข็น</li>
          </ul>
          <p className={styles.bodyText}>
            ในทางปฏิบัติ: จองรอบเช้า ให้เด็กกินก่อน และเว้นช่วงบ่ายไว้หลวม ๆ การรอที่ทางเข้า 30 ถึง 60 นาทีคือส่วน
            ที่ทดสอบเด็กเล็ก ไม่ใช่ตัวผลงาน
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Planets หรือ Borderless</span>
          <h2 className={styles.sectionTitle}>ควรจอง Planets หรือ Borderless?</h2>
          <p className={styles.bodyText}>
            ทั้งสองเป็นพิพิธภัณฑ์แยกกันและตั๋วแยกกัน Planets คือแห่งที่คุณเดินเท้าเปล่าลุยน้ำ ส่วน Borderless คือเขาวงกตไร้แผนที่ที่อาซาบุไดฮิลส์ <Link href="/th/guides/attractions/teamlab-tokyo-tickets">หน้าเปรียบเทียบ teamLab Planets หรือ Borderless</Link> มีราคา เวลาเปิด และแห่งไหนเหมาะกับใคร ส่วน<Link href="/th/guides/attractions/teamlab-borderless-tickets">ไกด์ตั๋ว teamLab Borderless</Link>อธิบายการจองของแห่งนั้น
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ก่อนไป</span>
          <h2 className={styles.sectionTitle}>ควรใส่อะไรและเตรียมอะไรไป teamLab Planets?</h2>
          <ul className={styles.bodyList}>
            <li><strong>การแต่งกาย:</strong> กางเกงขาสั้นหรือกางเกงที่พับเหนือเข่าได้ น้ำสูงถึงระดับเข่าผู้ใหญ่ และบางจุดพื้นเป็นกระจก จึงไม่ควรใส่กระโปรงสั้น มีกางเกงขาสั้นให้ยืมฟรีไซซ์ XS ถึง 6L ต้องคืนก่อนออก</li>
            <li><strong>ตั๋ว:</strong> ตั๋ว QR บนมือถือหรือแท็บเล็ต หรือพิมพ์ออกมา QR เดียวใช้ได้กับทุกคนในการซื้อครั้งนั้น อีเมลแจ้งเตือนจะมาก่อน 2 วัน และรหัส QR จะแสดงตั้งแต่ 00:00 ของวันเข้าชม</li>
            <li><strong>บัตรยืนยัน:</strong> ตั๋วนักเรียนมัธยมต้นและปลายต้องใช้บัตรนักเรียนหรือเอกสารยืนยันอายุทางการ ตั๋วผู้พิการต้องใช้เอกสารรับรองที่ได้รับการยอมรับ</li>
            <li><strong>กระเป๋า:</strong> มีล็อกเกอร์ฟรีหลังประตูทางเข้า ขนาด 23 × 34 × 37 ซม. ของที่ใหญ่กว่านั้นต้องล็อกด้วยสายล็อกไว้ที่จุดจอดรถเข็นด้านนอก</li>
            <li><strong>ผ้าเช็ดตัว:</strong> ไม่ต้องเตรียม มีผ้าเช็ดตัวให้ที่ทางออกของผลงานในน้ำ</li>
            <li><strong>พาเด็กไป:</strong> ต้องมีผู้ใหญ่อย่างน้อย 1 คนต่อเด็ก 3 คน รวมเด็กที่เข้าฟรี ควรเตรียมเสื้อผ้าสำรอง เป้อุ้มเด็กใช้ได้ แต่รถเข็นต้องจอดด้านนอก</li>
            <li><strong>การกลับเข้าซ้ำ:</strong> ทำไม่ได้กับตั๋วทุกประเภท รวม Premium Pass และเมื่อเข้าแล้วขอคืนเงินไม่ได้</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            จากร้านตั๋วทางการและหน้าช่วยเหลือ อ่านเมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>เดินทางไป teamLab Planets จากสถานีโทโยสุและชินโทโยสุอย่างไร</h2>
          <p className={styles.bodyText}>
            ที่อยู่คือ 6-1-16 Toyosu, Koto-ku (東京都江東区豊洲6-1-16) teamlab.art ระบุเส้นทางเหล่านี้ อ่านเมื่อ {CHECKED}:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>สถานีชินโทโยสุ</strong> (สายยูริคาโมเมะ): เดิน 3 นาทีจากทางออก 1A ร้านทางการแนะนำให้ออกจากประตูตรวจตั๋ว เลี้ยวขวา แล้วใช้ทางออกทิศเหนือ</li>
            <li><strong>สถานีโทโยสุ</strong> (โตเกียวเมโทรสายยูรากุโจ): เดิน 10 นาทีจากทางออก 7 เดินตามแนวรางยกระดับของยูริคาโมเมะ แล้วพิพิธภัณฑ์จะอยู่ทางขวา</li>
            <li><strong>สถานีชิโจมาเอะ</strong> (สายยูริคาโมเมะ) และตลาดโทโยสุ: เดิน 5 นาที</li>
            <li><strong>แท็กซี่:</strong> 10 นาทีจากกินซ่า 15 นาทีจากสถานีโตเกียว หรือ 15 นาทีจากสนามบินฮาเนดะทางทางด่วน</li>
            <li><strong>รถบัส:</strong> teamlab.art เตือนว่ารถบัส Toei สาย To-05-2 จากสถานีโตเกียว กินซ่า และสึกิจิแออัดมาก และแนะนำให้ใช้การเดินทางอื่น มีรถชัตเติลบัสแบบเสียเงินระหว่าง GINZA SIX กับพิพิธภัณฑ์</li>
            <li><strong>ที่จอดรถ:</strong> ไม่มีที่พิพิธภัณฑ์</li>
          </ul>
          <p className={styles.bodyText}>
            <Link href="/guides/transport/ic-cards-japan">บัตร IC อย่าง Suica หรือ PASMO (ภาษาอังกฤษ)</Link>{" "}
            ใช้ได้ทั้งช่วงสายยูรากุโจและยูริคาโมเมะ —{" "}
            <Link href="/guides/transport/tokyo-transportation">ไกด์การเดินทางในโตเกียวของเรา (ภาษาอังกฤษ)</Link>{" "}
            อธิบายสายรถไฟถ้าคุณยังไม่คุ้นกับโทโยสุ
          </p>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="จองไว้สำหรับวันเดียวกันที่โทโยสุและโอไดบะ"
          intro="รอบ Planets ใช้เวลาหนึ่งชั่วโมงครึ่งของวันเที่ยวฝั่งตะวันออก และสายยูริคาโมเมะที่พาคุณถึงหน้าประตูยังวิ่งต่อไปถึงโอไดบะ ตั๋วรถไฟใต้ดินครอบคลุมช่วงเมโทรไปโทโยสุ แต่ไม่ครอบคลุมสายยูริคาโมเมะ อีกสามรายการอยู่ห่างจากพิพิธภัณฑ์แค่นั่งรถไม่นาน Klook บล็อกการอ่านราคาอัตโนมัติ จึงควรเปิดหน้าสินค้าเพื่อดูราคาและเวลาในวันของคุณ"
          tours={sameDayTours}
        />

        <KlookTourPicks
          heading="ทัวร์ 1 วันจากเมืองเดียวกัน"
          intro="Planets ใช้เวลาในสถานที่ประมาณหนึ่งชั่วโมงครึ่ง จึงมักแชร์วันกับกิจกรรมอื่น ถ้ายังมีวันว่างในช่วงโตเกียวของทริป สองทัวร์นี้ออกนอกเมืองและกลับมาในเย็นวันเดียวกัน"
          tours={dayTrips}
        />

        <Related
          items={[
            { href: "/th/guides/attractions/teamlab-tokyo-tickets", title: "teamLab Planets หรือ Borderless (2026): ไปที่ไหนดี" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "ตั๋ว teamLab Fukuoka 2026: ราคา เวลาเปิด และการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "ตั๋ว teamLab Kyoto: ราคา เวลาเปิด และการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "ตั๋ว teamLab Botanical Garden Osaka: ราคาและเวลาเปิด (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/tokyo-skytree-tickets", title: "ตั๋ว Tokyo Skytree (2026): ราคา และเลือกชั้น 350 หรือ 450" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "ตั๋ว Warner Bros. Studio Tour Tokyo (2026): ราคาและวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/teamlab-borderless-tickets", title: "ตั๋ว teamLab Borderless (2026): ราคา รอบเวลา และช่องทางซื้อ" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/guides/transport/tokyo-transportation", title: "เดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/transport/ic-cards-japan", title: "บัตร IC ในญี่ปุ่น 2026: Suica, PASMO และวิธีใช้ (ภาษาอังกฤษ)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>พร้อมจอง teamLab Planets แล้วหรือยัง?</h2>
            <p className={styles.ctaBannerDesc}>
              ตั๋วระบุวันและเวลา และไม่มีขายที่พิพิธภัณฑ์ Klook เป็นหนึ่งในตัวแทนจำหน่ายที่ร้านทางการระบุชื่อ และตั๋วเป็น QR code บนมือถือ
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋ว teamLab Planets →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
