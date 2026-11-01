// Thai edition of /guides/attractions/teamlab-tokyo-tickets. Mirrors the English page as of
// 2026-11-01 block by block (same sections, tables, CTAs and Klook/GetYourGuide blocks); no
// figure here is new to the Thai edition — prices come from lib/attraction-prices.ts and the
// rest from the English page's own text.
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
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "ตั๋ว teamLab Planets 2026: ราคา วิธีจอง";
const DESC =
  "ตั๋ว teamLab Planets 2026: ราคาผู้ใหญ่เริ่มต้น ¥3,800 รอบเข้าชม 30 นาที และวิธีจอง";

const PLANETS_URL = thTeamlabPlanets.url;
const GYG_SLUG = "th-teamlab-tokyo-tickets";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
// ราคาและกฎการจองอ่านจากร้านตั๋วทางการ (CHECKED) ส่วนเวลาเปิดและวันปิดอ่านจาก
// teamlab.art (HOURS_CHECKED) เหมือนฉบับภาษาอังกฤษ
const CHECKED = dateLabel(P.checked, "th");
const HOURS_CHECKED = dateLabel("2026-10-09", "th");
const BORDERLESS_CHECKED = dateLabel(B.checked, "th");
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");
const B_ADULT = priceLabel(B.adult, "th");

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
  { item: "เวลาเปิด", detail: "ประกาศไว้ 08:00–22:00 เปลี่ยนตามวัน", source: `teamlab.art, ${HOURS_CHECKED}` },
  { item: "รับเข้าครั้งสุดท้าย", detail: "หนึ่งชั่วโมงก่อนปิด", source: `ร้านตั๋วทางการ, ${CHECKED}` },
  {
    item: "วันปิด",
    detail: "ไม่ประจำ — รวมวันพฤหัสบดีที่ 5 พฤศจิกายน และวันพฤหัสบดีที่ 3 ธันวาคม 2026",
    source: `teamlab.art, ${HOURS_CHECKED}`,
  },
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
  {
    item: "มาสายกว่ารอบ",
    detail: "ยังเข้าได้ในวันเดียวกันภายในเวลาทำการ โดยไม่เกินเวลารับเข้าครั้งสุดท้าย",
    source: `ร้านตั๋วทางการ, ${CHECKED}`,
  },
  {
    item: "เวลาที่ควรเผื่อในสถานที่",
    detail: "ประมาณ 1.5–2 ชั่วโมง รวมห้องล็อกเกอร์และการเช็ดตัว",
    source: "ตัวเลขวางแผนของเรา — teamLab ไม่ได้เผยแพร่ตัวเลขนี้",
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

const compareRows = [
  { factor: "ที่ตั้ง", planets: "โทโยสุ (เขตโคโต)", borderless: "อาซาบุไดฮิลส์ (เขตมินาโตะ)" },
  { factor: "แนวคิด", planets: "ดำดิ่ง เดินเท้าเปล่า เดินลุยน้ำ", borderless: "ผลงานกว่า 50 ชิ้นในเขาวงกตไร้แผนที่" },
  { factor: "เหมาะกับ", planets: "ครอบครัว มาครั้งแรก ประสบการณ์ทางประสาทสัมผัส", borderless: "คนรักศิลปะ เดินสำรวจช้า ๆ ถ่ายรูป" },
  { factor: "เวลาที่ใช้", planets: "ประมาณ 1.5–2 ชม. รวมเตรียมเท้าเปล่า", borderless: "ประมาณ 2 ชม. นานกว่านั้นถ้าอยู่ต่อ" },
  { factor: "ตั๋วผู้ใหญ่ (เริ่มต้น)", planets: ADULT, borderless: B_ADULT },
  { factor: "เวลาเปิด", planets: "ประกาศไว้ 08:00–22:00 เปลี่ยนตามวัน", borderless: "ประกาศไว้ 08:30–21:00 เปลี่ยนตามวัน" },
  { factor: "การเข้าชม", planets: "รอบเข้าชม 30 นาที", borderless: "รอบระบุเวลา หรือ Flexible Pass ที่ไม่ระบุเวลา" },
  { factor: "ควรรู้", planets: "มีกำหนดเปิดถึงสิ้นปี 2027 เดินเท้าเปล่าและมีโซนน้ำ", borderless: "ซื้อหน้างานแพงกว่า ¥200" },
];

const whoFor = [
  {
    title: "เลือก Planets ถ้า…",
    desc: "คุณมากับเด็ก อยากได้ประสบการณ์ที่ได้ลงมือและใช้ร่างกาย และไม่ติดที่เท้าจะเปียก เพราะคุณจะเดินเท้าเปล่าลุยน้ำที่ลึกถึงระดับหัวเข่าผู้ใหญ่ เป็นแห่งที่สนุกและได้สัมผัสมากกว่าในสองแห่ง และสนุกกับเด็กได้ง่ายกว่า",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "เลือก Borderless ถ้า…",
    desc: "คุณอยากจมดิ่งไปกับงานศิลปะมากกว่าเดินผ่านมัน Borderless ที่อาซาบุไดฮิลส์ไม่มีเส้นทางตายตัว ผลงานเคลื่อนย้ายระหว่างห้อง และคุณเดินสำรวจได้อิสระในพื้นที่กว่า 50 ส่วน ที่นี่ให้รางวัลกับคนที่มีเวลาและใจเย็น และถ่ายรูปสวยกว่าสำหรับผู้ใหญ่",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
      </svg>
    ),
  },
  {
    title: "ไปทั้งสองที่ ถ้า…",
    desc: "คุณมีครึ่งวันว่างสองครั้งและเป็นแฟน teamLab ตัวจริง ทั้งสองแห่งเป็นประสบการณ์ที่ต่างกันจริง ๆ ในต่างย่านของเมือง การไปทั้งสองที่จึงไม่ซ้ำ ขอแค่เว้นระยะห่างและจองรอบระบุเวลาของแต่ละที่ล่วงหน้า",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
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
    a: "ต้อง และจำเป็นกว่าสถานที่ส่วนใหญ่ในโตเกียว Planets ใช้รอบเข้าชม 30 นาที และช่วงเวลายอดนิยมเต็มล่วงหน้า 2–3 สัปดาห์ โดยเฉพาะวันหยุดสุดสัปดาห์และช่วงวันหยุดยาว หน้าช่วยเหลือทางการระบุชัดว่าไม่ควรหวังพึ่งการซื้อที่พิพิธภัณฑ์ ตั๋วขายออนไลน์ล่วงหน้า ไม่ได้ขายที่เคาน์เตอร์หน้างาน จองวันและรอบให้เรียบร้อยก่อนออกเดินทาง",
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
    q: "teamLab Planets ใช้เวลานานแค่ไหน?",
    a: "เผื่อเวลาทั้งหมดประมาณ 1.5 ถึง 2 ชั่วโมง ตัวผลงานใช้เวลาราวหนึ่งถึงหนึ่งชั่วโมงครึ่งถ้าเดินไม่รีบ แต่ต้องเผื่อเวลาห้องล็อกเกอร์ การถอดรองเท้า และการเช็ดตัวหลังออกมาด้วย ช่วงคนเยอะแค่การเตรียมตัวเข้าก็อาจใช้ 30–60 นาที อย่าวางนัดที่กระชั้นต่อทันที",
  },
  {
    q: "teamLab Planets เปิดกี่โมง และปิดวันไหน?",
    a: `เวลาเปิดเปลี่ยนตามวัน ตอนที่ตรวจสอบ teamlab.art เมื่อ ${HOURS_CHECKED} Planets ประกาศเวลาเปิด 08:00–22:00 และร้านตั๋วทางการยังระบุเมื่อ ${CHECKED} ว่ารับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด วันปิดช่วงปลายปี 2026 รวมวันพฤหัสบดีที่ 5 พฤศจิกายน และวันพฤหัสบดีที่ 3 ธันวาคม เนื่องจากปฏิทินเปลี่ยนทุกเดือน ควรเช็กปฏิทินทางการด้วยวันของคุณก่อนจองรอบ`,
  },
  {
    q: "ถ้าพลาดรอบเวลาที่จอง teamLab Planets ไว้จะเป็นอย่างไร?",
    a: "ไม่ได้แปลว่าเข้าไม่ได้เสมอไป หน้าช่วยเหลือทางการระบุว่าเวลาที่พิมพ์ไว้เป็นเวลาอ้างอิง และถ้ามาสายก็ยังเข้าได้ในวันเดียวกันภายในเวลาทำการ โดยจำไว้ว่ารับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด แต่คุณอาจต้องรอนานกว่าคนที่ถือตั๋วรอบนั้น จึงควรถือว่ารอบเวลาคือแผนหลัก",
  },
  {
    q: "teamLab Planets อยู่ที่ไหน และไปอย่างไร?",
    a: "อยู่ที่โทโยสุ ริมน้ำฝั่งตะวันออกของโตเกียว ข้อมูลการเดินทางทางการระบุว่าเดินหนึ่งนาทีจากสถานีชินโทโยสุ สายยูริคาโมเมะ ห้านาทีจากสถานีชิโจมาเอะและตลาดโทโยสุ และสิบนาทีจากสถานีโทโยสุ สายยูรากุโจของโตเกียวเมโทร นั่งแท็กซี่จากสถานีโตเกียวประมาณ 15 นาที หรือจากสนามบินฮาเนดะทางด่วนประมาณ 15 นาที ช่วงรถไฟใช้บัตร IC อย่าง Suica หรือ PASMO ได้",
  },
  {
    q: "teamLab Planets จะปิดแล้วหรือ?",
    a: "teamLab Planets ที่โทโยสุมีกำหนดเปิดถึงสิ้นปี 2027 และ teamLab ประกาศแผนขยายที่เพิ่มงานติดตั้งมากกว่าสิบชิ้น กำหนดการอาจเปลี่ยน จึงควรเช็กเว็บไซต์ทางการก่อนวางทริปเพื่อที่นี่โดยเฉพาะ teamLab Borderless ที่อาซาบุไดฮิลส์เป็นพิพิธภัณฑ์แยกที่เปิดต่อเนื่อง และมีตั๋วของตัวเอง",
  },
  {
    q: "teamLab Planets กับ Borderless ต่างกันอย่างไร?",
    a: "Planets ที่โทโยสุเป็นประสบการณ์ดำดิ่งแบบเท้าเปล่า คุณเดินลุยน้ำและผ่านงานติดตั้งขนาดใหญ่ เป็นแห่งที่ใช้ร่างกายมากกว่าและเหมาะกับครอบครัวมากกว่า Borderless ที่อาซาบุไดฮิลส์เป็นเขาวงกตของผลงานกว่า 50 ชิ้นที่ไม่มีแผนที่และไม่มีเส้นทางตายตัว ผลงานเคลื่อนย้ายระหว่างพื้นที่และคุณเดินสำรวจได้อิสระ Planets เหมาะกับครอบครัวและคนมาครั้งแรก Borderless เหมาะกับคนรักศิลปะที่อยากสำรวจช้า ๆ ทั้งสองเป็นพิพิธภัณฑ์แยกกัน ตั๋วแยกกัน และอยู่ต่างย่านของโตเกียว",
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
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            ตั๋ว teamLab Planets (2026):<br />ราคา วิธีจอง และ Planets vs Borderless
          </h1>
          <p className={styles.heroSubtitle}>
            ตั๋ว teamLab Planets ที่โทโยสุราคาเท่าไร รอบเข้าชม 30 นาทีทำงานอย่างไร ควรใส่อะไรไปโซนน้ำ — และ
            Planets ต่างจาก Borderless ที่อาซาบุไดฮิลส์อย่างไร
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "Planets vs Borderless"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <p className={styles.bodyText}>
          ตั๋วผู้ใหญ่ของ <strong>teamLab Planets</strong> ที่โทโยสุบนร้านตั๋วทางการคือ <strong>{ADULT}</strong>{" "}
          และยอดเปลี่ยนตามวันและเวลาเข้าชมที่คุณเลือก ¥3,800 จึงเป็นราคาต่ำสุด ไม่ใช่ราคาจริง การเข้าชมแบ่งเป็น{" "}
          <strong>รอบเข้าชม 30 นาที</strong> ที่ต้องจองล่วงหน้า — ร้านระบุว่าไม่มีการขายหน้างานที่เคาน์เตอร์หรือ
          เครื่องขายตั๋ว — และควร<strong>เผื่อเวลาประมาณ 1.5 ถึง 2 ชั่วโมง</strong> รวมห้องล็อกเกอร์ที่ต้องถอด
          รองเท้าและการเช็ดตัวหลังออกมา ทางเข้าอยู่ห่าง<strong>สถานีชินโทโยสุเพียงเดิน 1 นาที</strong> บนสาย
          ยูริคาโมเมะ ถ้าคุณกำลังหา<strong>ตั๋ว teamLab โตเกียว</strong> โดยไม่ได้เจาะจง Planets โตเกียวมีพิพิธภัณฑ์
          teamLab สองแห่ง และไกด์นี้จะบอกว่าแห่งไหนที่คุณต้องการจริง ๆ ราคาและกฎการจองอ่านจากร้านตั๋วทางการของ
          teamLab Planets เมื่อ {CHECKED} ส่วนเวลาเปิดอ่านจาก teamlab.art เมื่อ {HOURS_CHECKED}
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ตั๋วผู้ใหญ่</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การเข้าชม</p>
                <p className={styles.verdictStatValue}>รอบ 30 นาที ต้องจองก่อน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาที่ใช้</p>
                <p className={styles.verdictStatValue}>ประมาณ 1.5–2 ชม.</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การแต่งตัว</p>
                <p className={styles.verdictStatValue}>ขาสั้น — เท้าเปล่า น้ำถึงเข่า</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ค่าเข้า teamLab Planets สำหรับผู้ใหญ่ {ADULT} นักเรียนมัธยม ¥2,800 และเด็ก
              4–12 ปี {CHILD} ตั๋วครอบคลุมช่วงเข้าชม 30 นาที และไม่มีขายที่เคาน์เตอร์หน้างาน ถ้าไปวันหยุดสุด
              สัปดาห์ให้จองล่วงหน้า 2–3 สัปดาห์ คุณจะเดินเท้าเปล่า และบางผลงานเป็นพื้นที่น้ำที่ลึกถึงระดับหัวเข่า
              ผู้ใหญ่ ให้ใส่กางเกงขาสั้นหรือกางเกงที่ม้วนขึ้นได้ (มีกางเกงขาสั้นให้ยืมฟรีไซส์ XS–6L) เผื่อเวลา
              1.5–2 ชั่วโมง และเดินจากสถานีชินโทโยสุ 1 นาที กำลังหาพิพิธภัณฑ์ที่อาซาบุไดอยู่หรือเปล่า? ดู{" "}
              <Link href="/th/guides/attractions/teamlab-borderless-tickets">ไกด์ตั๋ว teamLab Borderless</Link>
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว teamLab Planets →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              ราคาและกฎการจองอ่านจากร้านตั๋วทางการของ teamLab Planets เมื่อ {CHECKED} ส่วนเวลาเปิดและวันปิดอ่าน
              จาก teamlab.art เมื่อ {HOURS_CHECKED} ราคาของ Planets เปลี่ยนตามวันและรอบ และปฏิทินก็เปลี่ยน โปรด
              ตรวจสอบทั้งสองอย่างด้วยวันของคุณตอนชำระเงิน
            </p>
          </div>
        </div>

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
            Planets เปิดหลายชั่วโมง แต่ตั๋วของคุณไม่ได้ยาวขนาดนั้น: เวลาที่พิมพ์บนตั๋วคือเวลาเข้าชม และคิวที่ทางเข้า
            อาจเพิ่มอีก 30 ถึง 60 นาที เผื่อเวลารวมประมาณ 1.5 ถึง 2 ชั่วโมง และอย่าวางนัดที่กระชั้นต่อท้าย
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
            เวลาเปิดและวันปิดเปลี่ยนทุกเดือน ควรเปิดปฏิทินทางการด้วยวันเดินทางของคุณก่อนเลือกรอบ ข้อมูลข้างต้น
            ทั้งหมดยกเว้นเวลาที่ควรเผื่อคือถ้อยคำทางการ อ่านในวันที่ระบุในตาราง
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
            และที่นี่คนเยอะ: teamLab รายงานว่ามีผู้เข้าชมเกิน 2.5 ล้านคนในปี 2025 พิพิธภัณฑ์มีกำหนดเปิดถึงสิ้นปี
            2027 และประกาศแผนขยายที่เพิ่มงานติดตั้งมากกว่าสิบชิ้น — ถ้าคุณเคยไปแล้ว ครั้งหน้าก็ไม่ใช่การไปแบบเดิม
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
            <li><strong>ราคาต่อชั่วโมงสูง</strong> เริ่มต้น ¥3,800 สำหรับ 1.5–2 ชั่วโมง แพงกว่า Main Deck ของโตเกียวทาวเวอร์ที่ ¥1,500 มากกว่าสองเท่า และสูงกว่า Shibuya Sky ที่ ¥2,500 มาก ซึ่งทั้งสองที่คุณอยู่ได้นาน คุณจ่ายเพื่อสิ่งที่ไม่มีที่อื่น ไม่ใช่เพื่อความยาว — เทียบตัวเลขได้ในตาราง<Link href="/guides/attractions/japan-attraction-ticket-prices">ราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)</Link></li>
            <li><strong>ต้นทุนการเข้าคือเวลา ไม่ใช่แค่เงิน</strong> FAQ ทางการเตือนว่าช่วงคนเยอะอาจรอเข้า 30 ถึง 60 นาที บวกเวลาถอดรองเท้า สองชั่วโมงคือเวลาที่ควรกันไว้จริง ๆ</li>
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
            <li><strong>ช่วงเวลาจองที่เราแนะนำ:</strong> สองถึงสามสัปดาห์ล่วงหน้าสำหรับรอบวันหยุดสุดสัปดาห์หรือวันหยุด ไม่กี่วันสำหรับวันธรรมดา และเร็วที่สุดเท่าที่ทำได้สำหรับช่วงซากุระหรือปีใหม่ นี่คือคำแนะนำการวางแผนของเราจากพฤติกรรมของปฏิทิน ไม่ใช่ตัวเลขทางการ — teamLab ไม่เผยแพร่ข้อมูลการขายหมด</li>
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
            <strong>ส่วนเวลาเข้าชม:</strong> รอบแรก ๆ ของวัน และชั่วโมงสุดท้ายก่อนรับเข้าครั้งสุดท้าย คือสองช่วงที่
            มีโอกาสเจอคิวยาวที่ทางเข้าน้อยที่สุด และวันธรรมดาดีกว่าวันหยุดสุดสัปดาห์ทั้งเรื่องคิวและ ส่วนใหญ่ เรื่อง
            ราคา เราบอกไม่ได้ว่ารอบไหนถูกที่สุดในวันของคุณ เพราะ teamLab ไม่เผยแพร่ราคาแยกตามรอบ — ปฏิทินเป็นคน
            บอก และอยู่ห่างไปแค่คลิกเดียวจากผู้ขายทั้งสองด้านล่าง
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

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกันข้าง ๆ</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs Borderless: ควรจองที่ไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>จอง Planets ถ้าคุณมากับเด็กหรือจะไป teamLab แค่ครั้งเดียว จอง Borderless ถ้าคุณอยากดูงาน
            ศิลปะมากกว่าเดินผ่านมัน</strong> โตเกียวมีพิพิธภัณฑ์ teamLab สองแห่ง และนักท่องเที่ยวจองผิดแห่งกันเป็น
            ประจำ ทั้งสองเป็นสถานที่แยกกัน ตั๋วแยกกัน และอยู่ต่างย่านของเมือง: <strong>Planets</strong> ที่โทโยสุ
            คือแห่งที่เดินเท้าเปล่าลุยน้ำ ส่วน <strong>Borderless</strong> ที่อาซาบุไดฮิลส์คือเขาวงกตไร้แผนที่ของ
            ผลงานกว่า 50 ชิ้นที่เคลื่อนย้ายระหว่างห้อง Borderless มีราคา เวลาเปิด และข้อควรรู้ในการจองของตัวเอง —
            เราอธิบายไว้ใน{" "}
            <Link href="/th/guides/attractions/teamlab-borderless-tickets">ไกด์ตั๋ว teamLab Borderless</Link>
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab Borderless"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ราคาของ Planets อ่านจากร้านตั๋วทางการเมื่อ {CHECKED} ส่วนราคา Borderless และเวลาเปิดของทั้งสองแห่ง
            อ่านจาก teamlab.art เมื่อ {BORDERLESS_CHECKED} ทั้งสองพิพิธภัณฑ์ตั้งราคาตั๋วผู้ใหญ่ตามวันและรอบ และ
            ปฏิทินของทั้งสองเปลี่ยน โปรดยืนยันด้วยวันของคุณ เวลาที่ใช้เป็นคำแนะนำการวางแผนของเรา ไม่ใช่ตัวเลข
            ทางการ
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>แห่งไหนเหมาะกับคุณ</span>
          <h2 className={styles.sectionTitle}>ควรเลือก teamLab แห่งไหน?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>teamLab Planets อยู่ที่ไหน</h2>
          <p className={styles.bodyText}>
            Planets อยู่ที่โทโยสุ ริมน้ำฝั่งตะวันออกของโตเกียว ติดกับตลาดโทโยสุ ข้อมูลการเดินทางทางการระบุว่า:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>สถานีชินโทโยสุ</strong> (สายยูริคาโมเมะ) — เดิน 1 นาที เป็นเส้นทางที่ง่ายที่สุด</li>
            <li><strong>สถานีชิโจมาเอะ</strong> / ตลาดโทโยสุ — เดิน 5 นาที</li>
            <li><strong>สถานีโทโยสุ</strong> (โตเกียวเมโทรสายยูรากุโจ) — เดิน 10 นาที เช่นเดียวกับ LaLaport โทโยสุ</li>
            <li>นั่งแท็กซี่จากสถานีโตเกียวประมาณ 15 นาที จากกินซ่า 10 นาที หรือจากสนามบินฮาเนดะทางด่วนประมาณ 15 นาที</li>
            <li><strong>ไม่มีที่จอดรถที่พิพิธภัณฑ์</strong> — ร้านทางการขอให้ผู้เข้าชมมาด้วยรถไฟหรือรถบัส มีรถชัตเติลบัสแบบเสียเงินระหว่าง GINZA SIX กับ Planets อ่านเมื่อ {CHECKED}</li>
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
              การเข้าชมแบ่งเป็นรอบ 30 นาที และรอบดี ๆ หมดล่วงหน้า 2–3 สัปดาห์ Klook เป็นพาร์ตเนอร์ขายตั๋วทางการ
              ของ teamLab ชำระเงินเป็นภาษาไทยด้วยสกุลเงินของคุณเอง และรับตั๋วอิเล็กทรอนิกส์บนมือถือ
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
