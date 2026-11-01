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
import { GygCompareButton } from "../../../../components/GygCompare";
import { thTeamlabBorderless } from "../../../../lib/klook-links-th";
import { gygTeamlabBorderless } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English page (pages/guides/attractions/teamlab-borderless-tickets.tsx) section
// by section as of 2026-11-01. Figures come from lib/attraction-prices.ts and the English
// page; nothing was re-checked or added for this edition.

const ROUTE = "/th/guides/attractions/teamlab-borderless-tickets";
const TITLE = "ตั๋ว teamLab Borderless 2026: ราคา";
const DESC =
  "ตั๋ว teamLab Borderless 2026: ผู้ใหญ่เริ่มต้น ¥3,400 รอบระบุเวลา ซื้อหน้างานแพงกว่า ¥200";

const BORDERLESS_URL = thTeamlabBorderless.url;
const GYG_SLUG = "th-teamlab-borderless-tickets";

const P = PRICES.teamlabBorderless;
const CHECKED = dateLabel(P.checked, "th");
// "from ¥3,400" -> "เริ่มต้น ¥3,400": same figure, Thai qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");

const PLANETS = PRICES.teamlabPlanets;
const PLANETS_CHECKED = dateLabel(PLANETS.checked, "th");

// The date the official ticket address was confirmed, and the date the GetYourGuide
// listing was confirmed live (GYG_CHECKED_AT in lib/gyg-links.ts, 21 Oct 2026).
const ADDRESS_CHECKED = dateLabel("2026-10-26", "th");
const GYG_CHECKED = dateLabel("2026-10-21", "th");

const priceRows = [
  {
    ticket: "ผู้ใหญ่ (18 ปีขึ้นไป)",
    price: ADULT,
    varies: "ใช่ — ตามวันและรอบเข้าชม",
    note: "¥3,400 คือราคาขั้นต่ำ ไม่ใช่ราคาจริง ตรวจสอบยอดของวันที่คุณจะไปก่อนชำระเงิน",
  },
  { ticket: "อายุ 13–17 ปี", price: "¥2,800", varies: "ไม่ — ราคาคงที่", note: "ถ้าดูโตกว่าอายุ ให้พกบัตรประจำตัวไปด้วย" },
  { ticket: "อายุ 4–12 ปี", price: CHILD, varies: "ไม่ — ราคาคงที่", note: "เลือกวันไหนก็ราคาเดิม" },
  { ticket: "อายุไม่เกิน 3 ปี", price: "ฟรี", varies: "ไม่ — ฟรี", note: "ไม่ต้องมีตั๋ว" },
  {
    ticket: "ผู้พิการ",
    price: "เริ่มต้น ¥1,700",
    varies: "ใช่ — ใช้ปฏิทินเดียวกับตั๋วผู้ใหญ่",
    note: "ผู้ติดตามหนึ่งคนได้ราคาลดเดียวกัน ต้องแสดงหลักฐานสิทธิ์",
  },
];

const hoursRows = [
  { item: "เวลาเปิด", detail: "ประกาศไว้ 08:30–21:00 ต่างกันไปตามวัน", source: `teamlab.art, ${CHECKED}` },
  { item: "รับเข้าครั้งสุดท้าย", detail: "หนึ่งชั่วโมงก่อนปิด — ปิด 21:00 ต้องเข้าก่อน 20:00", source: `teamlab.art, ${CHECKED}` },
  {
    item: "วันปิดเร็วและปิดดึก",
    detail: "บางวันปิดเร็ว (17 พฤศจิกายน 2026 ปิด 17:00) และบางวันปิดดึก (22:00 ในบางวัน)",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "วันปิด",
    detail: "วันอังคารแบบไม่สม่ำเสมอ — รวม 20 ตุลาคม 24 พฤศจิกายน และ 8 ธันวาคม 2026",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Entrance Pass",
    detail: "ระบุทั้งวันและเวลาเข้าชม รอบเวลาก็คือการจอง",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "Flexible Pass",
    detail: "ใช้ได้ในวันที่เลือกโดยไม่ระบุเวลาเข้าชม ราคาสูงกว่า",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "เปลี่ยนวัน",
    detail: "ได้ถึงสามครั้งสำหรับตั๋วที่ซื้อจาก teamLab โดยตรง",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "ซื้อหน้างาน",
    detail: "ขายที่พิพิธภัณฑ์เมื่อยังเหลือรอบ ผู้ใหญ่ +¥200 เด็กหรือผู้พิการ +¥100",
    source: `teamlab.art, ${CHECKED}`,
  },
  {
    item: "เวลาที่ควรเผื่อ",
    detail: "ราวสองชั่วโมง — นานกว่านั้นถ้าถ่ายรูป และไม่มีเส้นทางตายตัวให้เดินเร่ง",
    source: "ตัวเลขวางแผนของเรา — teamLab ไม่ได้ประกาศ",
  },
];

const vsPlanetsRows = [
  {
    factor: "ที่ตั้ง",
    borderless: "อาซาบุไดฮิลส์ เขตมินาโตะ — 2 นาทีจากสถานีคามิยะโจ",
    planets: "โทโยสุ — 1 นาทีจากสถานีชินโทโยสุ",
  },
  { factor: "ตั๋วผู้ใหญ่", borderless: `${ADULT} ตามวันและรอบ`, planets: `${priceLabel(PLANETS.adult, "th")} ตามวันและรอบ` },
  { factor: "อายุ 4–12 ปี", borderless: CHILD, planets: priceLabel(PLANETS.child, "th") },
  {
    factor: "ทำอะไร",
    borderless: "เดินในเขาวงกตไร้แผนที่ที่มีผลงานกว่า 50 ชิ้น ใส่รองเท้าได้",
    planets: "เดินเท้าเปล่าผ่านน้ำที่สูงถึงระดับเข่าผู้ใหญ่",
  },
  {
    factor: "การเข้าชม",
    borderless: "วัน + เวลาเข้าชม หรือ Flexible Pass ที่ไม่ระบุเวลา",
    planets: "วัน + เวลาเข้าชมเท่านั้น",
  },
  {
    factor: "ซื้อหน้างาน",
    borderless: "ขายเมื่อยังเหลือรอบ ผู้ใหญ่ +¥200",
    planets: "ไม่ขายหน้างานเลย — ต้องซื้อออนไลน์ล่วงหน้าเท่านั้น",
  },
  { factor: "เวลาที่ควรเผื่อ", borderless: "ราว 2 ชั่วโมง", planets: "ราว 1.5–2 ชั่วโมง" },
  {
    factor: "เหมาะกับ",
    borderless: "ศิลปะ การถ่ายรูป ผู้ใหญ่ และบ่ายวันฝนตกกลางโตเกียว",
    planets: "เด็ก และความประทับใจแรกที่แรงที่สุด",
  },
];

const buyingRows = [
  {
    factor: "ราคา",
    official: "ราคาพื้นฐาน ขึ้นลงตามวันและรอบ",
    klook: "ตั๋วใบเดียวกัน แสดงราคาด้วยสกุลเงินของคุณ",
    gyg: "กำหนดตามแพ็กเกจ ดูบนหน้าสินค้า",
    door: "ผู้ใหญ่ +¥200 เด็ก／ผู้พิการ +¥100",
  },
  {
    factor: "ภาษาตอนชำระเงิน",
    official: "มีเว็บไซต์ภาษาอังกฤษ",
    klook: "หน้าจอภาษาไทย ได้ตั๋วอิเล็กทรอนิกส์ทันที",
    gyg: "หน้าสินค้าภาษาอังกฤษ",
    door: "ที่เคาน์เตอร์ของพิพิธภัณฑ์",
  },
  {
    factor: "บัตรต่างประเทศ",
    official: "ส่วนใหญ่ได้ แต่ไม่รับประกัน",
    klook: "ออกแบบมาเพื่อบัตรต่างประเทศและวอลเล็ต",
    gyg: "ไม่ได้ตรวจสอบ — เช็กตอนชำระเงิน",
    door: "หน้างานรับบัตรได้",
  },
  {
    factor: "เปลี่ยนวัน",
    official: "เปลี่ยนวันได้ถึงสามครั้ง",
    klook: "ขึ้นกับแพ็กเกจ Klook ที่เลือก — อ่านก่อนชำระเงิน",
    gyg: "ไม่ได้ตรวจสอบ — ต่างกันตามแพ็กเกจ อ่านก่อนชำระเงิน",
    door: "ไม่เกี่ยว",
  },
  {
    factor: "ความเสี่ยงที่จะซื้อไม่ได้",
    official: "ต่ำ ถ้าจองล่วงหน้า",
    klook: "ต่ำ ถ้าจองล่วงหน้า",
    gyg: "เคาน์เตอร์ที่สองที่ควรลอง ถ้ารอบที่ต้องการหมดจากที่แรกแล้ว",
    door: "สูง — รอบยอดนิยมหมดก่อนถึงวันนั้น",
  },
];

const whoFor = [
  {
    title: "ซื้อจากเว็บไซต์ทางการ ถ้า…",
    desc: "คุณอยากได้ราคาพื้นฐานที่ต่ำที่สุดและความยืดหยุ่นเรื่องวันมากที่สุด ตั๋วที่ซื้อจาก teamLab โดยตรงเปลี่ยนวันได้ถึงสามครั้ง ซึ่งมีประโยชน์ถ้าแผนโตเกียวของคุณยังขยับอยู่",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "ซื้อผ่าน Klook ถ้า…",
    desc: "คุณอยากชำระเงินด้วยสกุลเงินของตัวเองบนหน้าจอที่อ่านเข้าใจ จ่ายด้วยบัตรที่ออกนอกญี่ปุ่น และเก็บตั๋วอิเล็กทรอนิกส์ไว้ในแอปเดียวกับการจองอื่น ๆ Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab จึงเป็นสิทธิ์เข้าชมเดียวกัน แค่ต่างเคาน์เตอร์",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M14 6v12" strokeDasharray="2 2" />
        <path d="M6 10h4M6 14h4" />
      </svg>
    ),
  },
  {
    title: "อย่าวางแผนซื้อหน้างาน ถ้า…",
    desc: "คุณไปวันหยุดสุดสัปดาห์ วันหยุดนักขัตฤกษ์ หรือรอบช่วงเย็น ตั๋วหน้างานแพงกว่า ¥200 สำหรับผู้ใหญ่ (เด็กและผู้พิการแพงกว่า ¥100) และมีขายเฉพาะเมื่อยังเหลือรอบ ซึ่งในช่วงเวลาที่คนส่วนใหญ่ต้องการ มักไม่เหลือ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "เลือกวันก่อน แล้วดูราคาของวันนั้น",
    desc: "ตั๋วผู้ใหญ่และตั๋วผู้พิการของ Borderless เป็นราคาแบบยืดหยุ่น ยอดที่เห็นขึ้นอยู่กับวันและรอบเวลาที่เลือก เช้าวันธรรมดามักถูกที่สุดและคนน้อยที่สุด",
  },
  {
    title: "เลือกเวลาเข้าชม หรือเลือก Flexible Pass",
    desc: "Entrance Pass แบบมาตรฐานระบุเวลาเข้าชม teamLab ยังขาย Flexible Pass ที่ใช้ได้ในวันที่ระบุโดยไม่กำหนดเวลาเข้าชม ซึ่งคุ้มกับส่วนต่างถ้าวันของคุณคาดเดาไม่ได้",
  },
  {
    title: "รอบวันหยุดสุดสัปดาห์และรอบเย็น จองล่วงหน้า 2–3 สัปดาห์",
    desc: "Borderless มีผู้เข้าชมเกินหนึ่งล้านคนต่อปีไปมาก และรอบยอดนิยมหมดก่อน การจองเร็วคือความต่างระหว่างการได้เลือกเวลาเอง กับการรับรอบที่เหลือ",
  },
  {
    title: "เผื่อเวลาราวสองชั่วโมง และถือของให้น้อย",
    desc: "ไม่มีเส้นทางตายตัว และผลงานเคลื่อนย้ายระหว่างห้อง คนส่วนใหญ่จึงอยากอยู่ข้างในราวสองชั่วโมง ไปถึงก่อนรอบเล็กน้อยและเดินทางตัวเบา สถานีคามิยะโจและร็อปปงหงิอิตโจเมะเชื่อมใต้ดินทั้งคู่ จึงไปถึงได้โดยไม่ต้องขึ้นไปที่ระดับถนน",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว teamLab Borderless ปี 2026 ราคาเท่าไร?",
    a: `ตามเว็บไซต์ทางการของ teamLab ที่ตรวจสอบเมื่อ ${CHECKED} Entrance Pass ผู้ใหญ่ (18 ปีขึ้นไป) เริ่มต้น ¥3,400 อายุ 13–17 ปี ¥2,800 อายุ 4–12 ปี ¥1,500 และเด็กอายุไม่เกิน 3 ปีเข้าฟรี ผู้พิการเริ่มต้น ¥1,700 และผู้ติดตามหนึ่งคนได้ราคาลดเดียวกัน ตั๋วผู้ใหญ่และตั๋วผู้พิการเป็นราคาแบบยืดหยุ่น ยอดจริงขึ้นอยู่กับวันและรอบที่เลือก ควรตรวจสอบราคาของวันตัวเองก่อนชำระเงิน ซื้อหน้างานแพงกว่า ¥200 สำหรับผู้ใหญ่ และ ¥100 สำหรับเด็กและผู้พิการ`,
  },
  {
    q: "ซื้อตั๋ว teamLab Borderless หน้างานได้ไหม?",
    a: `ได้ แต่เฉพาะเมื่อยังเหลือรอบ และต้องจ่ายเพิ่ม ตอนที่ตรวจสอบเมื่อ ${CHECKED} เว็บไซต์ทางการระบุว่าตั๋วหน้างานแพงกว่า ¥200 สำหรับผู้ใหญ่ และ ¥100 สำหรับเด็กและผู้พิการ หน้างานจึงเป็นแผนสำรอง ไม่ใช่แผนหลัก ในวันหยุดสุดสัปดาห์ วันหยุดนักขัตฤกษ์ และรอบเย็น ช่วงเวลาที่คนส่วนใหญ่ต้องการหมดก่อนถึงวัน และปฏิทินที่เต็มแล้วไม่มีทางกู้คืนได้ที่เคาน์เตอร์ นี่ยังเป็นความต่างที่ชัดที่สุดจาก teamLab Planets ที่โทโยสุ ซึ่งร้านค้าทางการระบุว่าไม่ขายหน้างานเลย`,
  },
  {
    q: "เปลี่ยนวันของตั๋ว teamLab Borderless ได้ไหม?",
    a: `ตั๋วที่ซื้อจาก teamLab โดยตรงเปลี่ยนวันได้ถึงสามครั้ง ตามที่ระบุบนเว็บไซต์ทางการเมื่อ ${CHECKED} ซึ่งเป็นเหตุผลเชิงปฏิบัติหลักที่ควรซื้อตรงแทนการซื้อผ่านตัวแทน ถ้าวันในโตเกียวของคุณยังขยับอยู่ ตัวแทนจำหน่ายกำหนดเงื่อนไขการเปลี่ยนและยกเลิกเองตามแต่ละแพ็กเกจ และต่างกันไป ควรอ่านบนหน้าจองก่อนชำระเงิน อย่าเหมาว่าสิทธิ์ของตั๋วทางการจะติดไปด้วย`,
  },
  {
    q: "Entrance Pass กับ Flexible Pass ต่างกันอย่างไร?",
    a: `Entrance Pass ระบุวันและเวลาเข้าชม คุณเลือกรอบตอนชำระเงิน และรอบนั้นคือการจองของคุณ Flexible Pass ใช้ได้ในวันที่ระบุโดยไม่กำหนดเวลาเข้าชม ไปถึงเมื่อไรก็เข้าได้ และมีราคาสูงกว่าสำหรับอิสระนั้น ทั้งสองแบบระบุอยู่บนเว็บไซต์ทางการเมื่อ ${CHECKED} ถ้าวันของคุณรอบอาซาบุไดฮิลส์คาดเดาไม่ได้ Flexible Pass จะซื้อคืนสิ่งที่รอบระบุเวลาเอาไป ถ้าวันของคุณลงตัวแล้ว Entrance Pass คือตั๋วที่ถูกกว่า`,
  },
  {
    q: "teamLab Borderless ต้องระบุรอบเวลาไหม เดินเข้าไปเลยได้หรือไม่?",
    a: "Entrance Pass แบบมาตรฐานระบุทั้งวันและเวลา คุณเลือกรอบเข้าชมตอนจอง teamLab ยังขาย Flexible Pass ที่ใช้ได้ในวันที่ระบุโดยไม่กำหนดเวลาเข้าชม มีขายหน้างานด้วย แต่ผู้ใหญ่ต้องจ่ายเพิ่ม ¥200 และขายเฉพาะเมื่อยังเหลือรอบ ซึ่งในวันหยุดสุดสัปดาห์ วันหยุดนักขัตฤกษ์ และรอบเย็นมักไม่เหลือ ควรถือว่าการซื้อหน้างานเป็นแผนสำรอง ไม่ใช่แผนหลัก",
  },
  {
    q: "teamLab Borderless เปิดกี่โมง?",
    a: `เวลาเปิดต่างกันไปตามวัน ตอนที่ตรวจสอบเว็บไซต์ทางการเมื่อ ${CHECKED} พิพิธภัณฑ์ประกาศเวลา 08:30–21:00 โดยบางวันปิดเร็วกว่า (17 พฤศจิกายน 2026 ปิด 17:00) และบางวันปิดดึกกว่า (22:00 ในบางวัน) รับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด และยังปิดในวันอังคารแบบไม่สม่ำเสมอ ซึ่งรวม 20 ตุลาคม 24 พฤศจิกายน และ 8 ธันวาคม 2026 ควรเปิดปฏิทินทางการด้วยวันของคุณเองก่อนจองรอบทุกครั้ง`,
  },
  {
    q: "teamLab Borderless ใช้เวลานานเท่าไร?",
    a: "เผื่อไว้ราวสองชั่วโมง Borderless ไม่มีแผนที่และไม่มีเส้นทางตายตัว ผลงานกว่า 50 ชิ้นกระจายอยู่ในเขาวงกตของห้องต่าง ๆ โดยผลงานเคลื่อนข้ามพื้นที่และเปลี่ยนไปตลอดวัน เวลาที่อยู่จึงขึ้นอยู่กับคุณจริง ๆ สองชั่วโมงพอสำหรับห้องหลักโดยไม่ต้องรีบ ส่วนคนรักศิลปะและช่างภาพมักอยู่ใกล้สามชั่วโมง",
  },
  {
    q: "teamLab Borderless อยู่ที่ไหน และไปอย่างไร?",
    a: "อยู่ชั้น B1 ของ Azabudai Hills Garden Plaza B ในย่านโทราโนมง 5 โจเมะ เขตมินาโตะ โตเกียว ข้อมูลการเดินทางทางการระบุว่าเดินสองนาทีจากทางออก 5 ของสถานีคามิยะโจ สายฮิบิยะของโตเกียวเมโทร และหกนาทีจากทางออก 4 ของสถานีร็อปปงหงิอิตโจเมะ สายนัมโบกุ ทั้งสองสถานีเชื่อมกับ Azabudai Hills ด้วยทางเดินใต้ดิน คุณจึงเดินตามป้ายได้ตลอดทางโดยไม่ต้องขึ้นไปที่ระดับถนน สะดวกมากตอนฝนตกหรืออากาศร้อนหน้าร้อน",
  },
  {
    q: "ควรซื้อตั๋ว teamLab Borderless ที่เว็บไซต์ทางการหรือ Klook?",
    a: "ทั้งสองทางถูกต้อง Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab ซื้อทางไหนก็เป็นสิทธิ์เข้าชมเดียวกัน เว็บไซต์ทางการให้ราคาพื้นฐานและเปลี่ยนวันได้ถึงสามครั้ง ส่วน Klook ให้การชำระเงินด้วยสกุลเงินของคุณบนหน้าจอที่อ่านเข้าใจ รับบัตรที่ออกนอกญี่ปุ่นได้อย่างเชื่อถือได้ และเก็บตั๋วอิเล็กทรอนิกส์ไว้กับการจองอื่น ถ้าความยืดหยุ่นเรื่องวันสำคัญที่สุด ซื้อจากเว็บไซต์ทางการ ถ้าการชำระเงินที่ไม่ติดขัดสำคัญที่สุด ซื้อผ่าน Klook",
  },
  {
    q: "ควรจอง teamLab Borderless หรือ teamLab Planets?",
    a: "ทั้งสองเป็นพิพิธภัณฑ์ต่างแห่งในย่านต่างกันของโตเกียว ไม่ใช่สองสาขาของสิ่งเดียวกัน Borderless ที่อาซาบุไดฮิลส์เป็นเขาวงกตของผลงานกว่า 50 ชิ้นที่ให้รางวัลกับเวลาและความอยากรู้ ส่วน Planets ที่โทโยสุคือแห่งที่เดินเท้าเปล่า คุณเดินผ่านน้ำลึกระดับเข่า และเป็นตัวเลือกที่ง่ายกว่าเมื่อไปกับเด็ก ถ้ามีเวลาแห่งเดียว เลือก Borderless สำหรับศิลปะและการถ่ายรูป และ Planets สำหรับประสบการณ์ที่ใช้ร่างกายและประสาทสัมผัสกับเด็ก ๆ",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว teamLab Borderless" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
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
            ตั๋ว teamLab Borderless 2026:<br />ราคา วิธีจอง และรอบเวลา
          </h1>
          <p className={styles.heroSubtitle}>
            ตั๋ว teamLab Borderless ที่อาซาบุไดฮิลส์ราคาเท่าไรจริง ๆ ระบบรอบระบุเวลาทำงานอย่างไร
            และควรซื้อจากเว็บไซต์ทางการหรือผ่าน Klook
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "อธิบายรอบระบุเวลา"].map((t) => (
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
          ตั๋วผู้ใหญ่ของ <strong>teamLab Borderless</strong> ที่ <strong>อาซาบุไดฮิลส์</strong>{" "}
          <strong>เริ่มต้น ¥3,400</strong> บนเว็บไซต์ทางการของ teamLab และตั๋วผู้ใหญ่เป็นราคาแบบยืดหยุ่น
          ¥3,400 จึงเป็นราคาขั้นต่ำ ไม่ใช่ราคาของวันที่คุณจะไป การเข้าชม<strong>ระบุวันและเวลา</strong> —
          Entrance Pass แบบมาตรฐานกำหนดรอบเข้าชม ส่วน Flexible Pass กำหนดแค่วัน — และควร
          <strong>เผื่อเวลาราวสองชั่วโมง</strong> ในพิพิธภัณฑ์ที่ไม่มีแผนที่และไม่มีเส้นทางตายตัวให้เดินเร่ง
          ราคา เวลาเปิด และวันปิดในหน้านี้อ่านจากเว็บไซต์ทางการของ teamLab (teamlab.art) เมื่อ {CHECKED}{" "}
          เพราะราคาผู้ใหญ่ขยับตามปฏิทิน ควรยืนยันยอดของวันคุณก่อนชำระเงิน
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ตั๋วผู้ใหญ่</p>
                <p className={styles.verdictStatValue}>เริ่มต้น ¥3,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การเข้าชม</p>
                <p className={styles.verdictStatValue}>ระบุวัน＋รอบเวลา</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาที่ควรเผื่อ</p>
                <p className={styles.verdictStatValue}>ราว 2 ชั่วโมง</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ที่ตั้ง</p>
                <p className={styles.verdictStatValue}>อาซาบุไดฮิลส์ เขตมินาโตะ</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ค่าเข้าชมผู้ใหญ่เริ่มต้น ¥3,400 และเป็นราคาแบบยืดหยุ่น วันและรอบที่คุณเลือก
              จะเป็นตัวกำหนดยอดสุดท้าย ตั๋วระบุทั้งวันและเวลา ซื้อหน้างานผู้ใหญ่แพงกว่า ¥200 และต้องยังเหลือรอบ
              พิพิธภัณฑ์เปิดราว 08:30–21:00 รับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด เผื่อเวลาราวสองชั่วโมง
              และไปทางสถานีคามิยะโจ (สายฮิบิยะ เดิน 2 นาที) หรือร็อปปงหงิอิตโจเมะ (สายนัมโบกุ เดิน 6 นาที)
              ซึ่งเชื่อมใต้ดินทั้งคู่ ซื้อจากเว็บไซต์ทางการถ้าอยากได้ราคาพื้นฐานและเปลี่ยนวันฟรีได้ถึงสามครั้ง
              ซื้อผ่าน Klook ถ้าอยากชำระเงินบนหน้าจอที่อ่านเข้าใจ ด้วยสกุลเงินของตัวเอง และรับบัตรต่างประเทศ
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว teamLab Borderless →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              ราคา เวลาเปิด และวันปิดในหน้านี้อ่านจากเว็บไซต์ทางการของ teamLab เมื่อ {CHECKED}{" "}
              Borderless ใช้ราคาแบบยืดหยุ่นและปฏิทินที่เปลี่ยนอยู่เสมอ ควรยืนยันทั้งสองอย่างด้วยวันของคุณเองตอนชำระเงิน
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋ว teamLab Borderless ปี 2026 ราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้ใหญ่จ่าย<strong>เริ่มต้น ¥3,400</strong> อายุ 13–17 ปี ¥2,800 เด็กอายุ 4–12 ปี ¥1,500
            และเด็กอายุต่ำกว่า 4 ปีไม่ต้องจ่ายเลย ที่ขยับมีแค่ตั๋วผู้ใหญ่และตั๋วผู้พิการ Borderless ตั้งราคาสองประเภทนี้
            ตามวันและรอบเข้าชม ราคาทางการจึงมีคำว่า &ldquo;เริ่มต้น&rdquo; และตั๋วที่ถูกที่สุดในทริปของคุณ
            จึงเป็นคำถามเรื่องปฏิทิน ไม่ใช่เรื่องผู้ขาย
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ประเภทตั๋ว", "ราคา (เริ่มต้น)", "ขยับตามวันไหม?", "หมายเหตุ"].map((h) => (
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
            อ่านจากเว็บไซต์ทางการของ teamLab เมื่อ {CHECKED} ตั๋วที่ซื้อหน้างานแพงกว่า ¥200 สำหรับผู้ใหญ่
            และ ¥100 สำหรับเด็กและผู้พิการ ตั๋วลดราคาต้องแสดงหลักฐานสิทธิ์ จึงควรพกบัตรประจำตัวไปด้วย
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>ราคาผู้ใหญ่ขยับได้มากแค่ไหนไม่มีการประกาศ</strong> teamLab พิมพ์ราคาเริ่มต้นกับปฏิทิน
            ไม่ใช่ตารางราคา ไม่มีไกด์ที่ซื่อตรงคนไหนบอกได้ว่าเย็นวันเสาร์ที่ Borderless ราคาเท่าไร และหน้าไหนที่บอกช่วงราคา
            ให้คุณ ก็แต่งขึ้นเอง ให้ถือว่า ¥3,400 คือราคาขั้นต่ำ เปิดปฏิทินทางการทุกวันที่ทริปของคุณยืดหยุ่นได้
            แล้วเทียบตัวเลขก่อนชำระเงิน การเลื่อนวันไปหนึ่งวันคือคันโยกที่ได้ผล การหาผู้ขายที่ถูกกว่าไม่ใช่
            เพราะวันและรอบเป็นตัวกำหนดราคา
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ก่อนจอง</span>
          <h2 className={styles.sectionTitle}>เวลาเปิด รอบเข้าชม วันปิด และเวลาที่ต้องใช้</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Borderless เปิดวันละหลายชั่วโมง แต่ปฏิทินขยับไปมา ซึ่งทำให้คนพลาดบ่อยกว่าเรื่องราคา —
            พิพิธภัณฑ์ปิดในวันอังคารแบบไม่สม่ำเสมอ และบางวันปิด 17:00 เผื่อเวลาข้างในราวสองชั่วโมง
            และอย่านัดอะไรที่กระชั้นไว้ต่อจากนั้น
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "ที่เว็บไซต์ทางการระบุ", "แหล่งที่มาและวันที่"].map((h) => (
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
            เพราะเวลาเปิดและวันปิดเปลี่ยนไปทุกเดือน ควรเปิดปฏิทินทางการด้วยวันเดินทางของคุณเองก่อนตัดสินใจ —
            แล้วค่อยจองรอบ เช้าวันธรรมดาคนน้อยที่สุดและมักถูกที่สุด ส่วนรอบวันหยุดสุดสัปดาห์และรอบเย็นหมดก่อน
            แถวเดียวในตารางที่ไม่ใช่ถ้อยคำของ teamLab คือเวลาที่ควรเผื่อ และเราก็ระบุไว้แล้ว พิพิธภัณฑ์ไม่ได้ประกาศ
            ว่าการเข้าชมใช้เวลาเท่าไร เพราะเส้นทางเป็นของคุณที่จะเลือกเอง
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>คุณซื้ออะไร</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless คืออะไรกันแน่</h2>
          <p className={styles.bodyText}>
            Borderless เป็นพิพิธภัณฑ์ที่ไม่มีแผนที่ ผลงานดิจิทัลกว่า 50 ชิ้นอยู่ในกลุ่มห้องที่เชื่อมถึงกัน
            และตัวผลงานเองเคลื่อนไหว ผลงานเดินออกจากพื้นที่หนึ่งไปอีกพื้นที่ ตอบสนองต่อคนในห้อง และเปลี่ยนไปตลอดวัน
            ไม่มีเส้นทางแนะนำ ไม่มีจุดที่ใส่หมายเลข คนสองคนที่ถือตั๋วแบบเดียวกันจึงอาจได้ประสบการณ์ที่ต่างกันจริง ๆ
          </p>
          <p className={styles.bodyText}>
            การออกแบบแบบนี้คือเหตุผลที่ตั๋วใบนี้คุ้มกับการวางแผน รีบดูหนึ่งชั่วโมงจะได้แค่ห้องดัง ๆ
            ส่วนราวสองชั่วโมงทำให้คุณเดินเรื่อยเปื่อย ย้อนกลับ และเจอผลงานที่ปรากฏเฉพาะเมื่อคุณรอ
            นี่จึงทำให้ Borderless เป็นแห่งที่เป็นผู้ใหญ่กว่าและเหมาะกับการถ่ายรูปมากกว่าในบรรดา
            พิพิธภัณฑ์ teamLab สองแห่งของโตเกียว — ดู{" "}
            <Link href="/th/guides/attractions/teamlab-tokyo-tickets">ไกด์ตั๋ว teamLab Planets</Link>{" "}
            สำหรับแห่งที่โทโยสุซึ่งเดินเท้าเปล่าลุยน้ำ และมุมมองการตัดสินใจจากฝั่ง Planets
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การตัดสินใจ</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless คุ้มไหม?</h2>
          <p className={styles.bodyText}>
            สำหรับคนที่ชอบศิลปะ การถ่ายรูป หรือแค่อยากอยู่ในที่ที่ไม่เหมือนที่ไหน คำตอบคือคุ้ม —
            แต่นี่คือสถานที่ราวสองชั่วโมงที่เริ่มต้น ¥3,400 ต่อคน ราคาเท่าการเที่ยวครึ่งบ่าย แต่ใช้เวลาเท่ามื้อกลางวันยาว ๆ
            นี่คือตัวเลขให้คุณตัดสินเอง แทนที่จะเป็นคำตัดสินที่ซ่อนตัวเลขไว้ข้างหลัง
          </p>
          <ul className={styles.bodyList}>
            <li><strong>ค่าใช้จ่ายต่อชั่วโมงสูง</strong> ¥3,400 สำหรับราวสองชั่วโมง มากกว่าสองเท่าของ Main Deck ของโตเกียวทาวเวอร์ที่ ¥1,500 และสูงกว่า Shibuya Sky ที่ ¥2,500 ซึ่งทั้งสองแห่งอยู่ได้นาน — เทียบตัวเลขได้ที่<Link href="/guides/attractions/japan-attraction-ticket-prices">ตารางราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)</Link> คุณจ่ายเพื่อสิ่งที่ดูที่อื่นไม่ได้ ไม่ใช่เพื่อความยาว</li>
            <li><strong>การไม่มีแผนที่คือคุณค่า และความเสี่ยง</strong> ผลงานกว่า 50 ชิ้นที่ไม่มีเส้นทางและไม่มีหมายเลข หมายความว่ารีบดูหนึ่งชั่วโมงจะได้แค่ห้องดัง ๆ ถ้าคุณมีแค่ชั่วโมงเดียว ตั๋วนี้ไม่คุ้ม ไม่ใช่แค่ฉบับย่อของสิ่งดี</li>
            <li><strong>ใช้แรงน้อยกว่าในสองแห่ง</strong> ใส่รองเท้าได้ ไม่ต้องลุยน้ำ ไม่ต้องพกเสื้อผ้าเปลี่ยน ถ้ารูปแบบของ Planets ฟังดูเป็นภาระมากกว่าประสบการณ์ ที่นี่คือ teamLab เดียวกันโดยไม่มีส่วนนั้น</li>
            <li><strong>ไม่กลัวฝนและอยู่ใจกลางเมือง</strong> อาซาบุไดฮิลส์อยู่ห่างสถานีคามิยะโจสองนาทีทางใต้ดิน บ่ายวันฝนตกจึงไม่ทำให้คุณเสียอะไรในการเดินทาง ซึ่งแผนวันฝนตกส่วนใหญ่ในโตเกียวทำไม่ได้</li>
            <li><strong>พลาดที่นี่ยังพอแก้ได้</strong> ต่างจาก Planets ตรงที่ Borderless ยังขายหน้างานเมื่อเหลือรอบ การจองไม่ทันจึงหมายถึงจ่ายเพิ่ม ¥200 และได้รอบที่แย่กว่า ไม่ใช่เสียทั้งบ่าย</li>
          </ul>
          <p className={styles.bodyText}>
            ข้ามไปถ้าวันในโตเกียวของคุณแน่นอยู่แล้ว ถ้าให้เวลาได้แค่ชั่วโมงเดียว หรือถ้าเดินทางกับเด็กเล็กและไปได้แค่
            teamLab แห่งเดียว — Planets ง่ายกว่าเมื่อไปกับเด็ก นี่คือสามเหตุผลที่ตั๋วนี้ทำให้ผิดหวัง และไม่มีข้อไหนเกี่ยวกับตัวงานศิลปะ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ความว่างของรอบ</span>
          <h2 className={styles.sectionTitle}>ตั๋ว teamLab Borderless ขายหมดไหม?</h2>
          <p className={styles.bodyText}>
            รอบเวลาแต่ละรอบหมดได้ และรอบยอดนิยมหมดก่อน Borderless มีผู้เข้าชมเกินหนึ่งล้านคนต่อปีไปมาก
            และรอบวันหยุดสุดสัปดาห์กับรอบเย็นหายไปก่อน สิ่งที่ไม่เกิดขึ้นคือการปิดตายสนิท — ยังมีตั๋วขายที่พิพิธภัณฑ์
            เมื่อยังเหลือรอบ ทำให้ Borderless ให้อภัยมากกว่าสถานที่แบบระบุเวลาส่วนใหญ่ในโตเกียว โดยแลกกับราคาที่สูงขึ้น
          </p>
          <ul className={styles.bodyList}>
            <li><strong>ช่วงจองที่เราแนะนำ:</strong> สองถึงสามสัปดาห์ล่วงหน้าสำหรับวันหยุดสุดสัปดาห์ วันหยุดนักขัตฤกษ์ หรือรอบเย็น ส่วนเช้าวันธรรมดามักพอที่ไม่กี่วัน นี่คือคำแนะนำในการวางแผนจากพฤติกรรมของปฏิทิน ไม่ใช่ตัวเลขทางการ — teamLab ไม่ได้เผยแพร่ข้อมูลการขายหมด</li>
            <li><strong>วันเดียวกันและหน้างาน:</strong> ขายเมื่อยังเหลือรอบ แพงกว่า ¥200 สำหรับผู้ใหญ่ และ ¥100 สำหรับเด็กหรือผู้พิการ ข้อมูลทางการ อ่านเมื่อ {CHECKED} ให้ถือเป็นแผนสำรอง ไม่ใช่แผนหลัก ในวันที่คนส่วนใหญ่อยากไป รอบที่คนส่วนใหญ่อยากได้ก็หมดไปแล้ว</li>
            <li><strong>ถ้าวันเปลี่ยน ให้เปลี่ยนวัน อย่าจองใหม่:</strong> ตั๋วที่ซื้อจาก teamLab โดยตรงเปลี่ยนวันได้ถึงสามครั้ง ข้อมูลทางการ อ่านเมื่อ {CHECKED}</li>
            <li><strong>เงื่อนไขของตัวแทนเป็นของตัวแทนเอง:</strong> ระยะเวลาเปลี่ยนและยกเลิกบน Klook และ GetYourGuide กำหนดตามแต่ละแพ็กเกจและต่างกัน ควรอ่านเงื่อนไขบนหน้าจองก่อนชำระเงิน อย่าเหมาว่าสิทธิ์เปลี่ยนสามครั้งของ teamLab จะติดไปด้วย</li>
            <li><strong>รอบที่ถูกที่สุดเป็นเรื่องของปฏิทิน:</strong> เช้าวันธรรมดาทั้งคนน้อยที่สุดและมักถูกที่สุด แต่ teamLab ไม่ได้เผยแพร่ตารางราคาต่อรอบ ราคาของวันคุณจึงมีอยู่บนปฏิทินเท่านั้น</li>
          </ul>
          <p className={styles.bodyText}>
            ลำดับที่ใช้ได้จริงจึงเป็น เลือกวัน อ่านราคาของวันนั้น แล้วค่อยเลือกผู้ขาย มีแค่สองขั้นแรกที่เปลี่ยนยอดที่คุณจ่าย
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดูวันและรอบของ teamLab Borderless →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab ส่วน GetYourGuide เป็นที่ที่สองให้ลองดูเมื่อรอบที่คุณต้องการหมดแล้ว
            หน้านี้ไม่ได้ใส่ราคาของทั้งสองแห่ง — ทั้งคู่ตั้งราคาตามวัน จึงควรเปิดปฏิทิน แทนที่จะเชื่อตัวเลขหัวข่าว
            รวมถึงตัวเลขในหน้านี้ด้วย
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ซื้อที่ไหน</span>
          <h2 className={styles.sectionTitle}>เว็บไซต์ทางการ vs Klook vs GetYourGuide vs หน้างาน</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab สิทธิ์เข้าชมจึงเหมือนกันไม่ว่าคุณจะใช้เคาน์เตอร์ไหน
            สิ่งที่ต่างคือขั้นตอนชำระเงิน ความยืดหยุ่น และ — ถ้าปล่อยไว้ถึงวันนั้น — ราคา GetYourGuide ก็ขาย
            Borderless เช่นกัน และคอลัมน์ด้านล่างตั้งใจให้บาง ดูหมายเหตุใต้ตารางว่าเรายืนยันอะไรได้และไม่ได้
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "เว็บไซต์ทางการ", "Klook", "GetYourGuide", "หน้างานวันนั้น"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.gyg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ส่วนต่างราคาหน้างานและจำนวนครั้งที่เปลี่ยนวันได้ อ้างตามเว็บไซต์ทางการของ teamLab เมื่อ {CHECKED}{" "}
            เงื่อนไขการยกเลิกและเปลี่ยนแปลงของตัวแทนต่างกันไปตามแพ็กเกจ — อ่านบนหน้าจองก่อนชำระเงิน
            คอลัมน์ GetYourGuide ตั้งใจให้สั้น: ยืนยันได้ว่าหน้าสินค้า Borderless ยังเปิดอยู่เมื่อ {GYG_CHECKED}{" "}
            แต่ GetYourGuide บล็อกการอ่านหน้าเว็บแบบอัตโนมัติ เราจึงตรวจสอบราคา การรับบัตร และเงื่อนไขการเปลี่ยนไม่ได้
            ช่องเหล่านั้นจึงระบุตามนั้นแทนการเดา
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>แบบไหนเหมาะกับคุณ</span>
          <h2 className={styles.sectionTitle}>ควรซื้อแบบไหน?</h2>
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

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>จอง teamLab Borderless อย่างไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            เลือกวันก่อน อ่านราคาของวันนั้น เลือกระหว่าง Entrance Pass แบบระบุเวลากับ Flexible Pass แล้วค่อยซื้อ —
            บนเว็บไซต์ทางการ หรือผ่าน Klook ถ้าอยากชำระเงินด้วยสกุลเงินของตัวเอง สี่ขั้นตอน และขั้นแรกเป็นขั้นเดียว
            ที่เปลี่ยนยอดที่คุณจ่าย
          </p>
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
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL}>
              ดูรอบว่างและราคาของ Borderless บน Klook →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ซื้อโดยตรง</span>
          <h2 className={styles.sectionTitle}>เว็บไซต์ขายตั๋วทางการของ teamLab Borderless อยู่ที่ไหน?</h2>
          <p className={styles.bodyText}>
            หน้าของพิพิธภัณฑ์เองคือ <strong>teamlab.art/e/tokyo</strong> — ภาษาอังกฤษ ส่วนฉบับภาษาญี่ปุ่นอยู่ที่
            teamlab.art/jp/e/tokyo — และปฏิทินตั๋วกับการชำระเงินเปิดจากที่นั่น ถ้าคุณบันทึกลิงก์เก่าไว้{" "}
            <strong>borderless.teamlab.art</strong> ไม่ใช่ร้านค้าแยกอีกต่อไป ทั้งที่อยู่ภาษาอังกฤษและภาษาญี่ปุ่น
            ตอนนี้พาไปที่หน้า teamlab.art ข้างต้น ซึ่งเรายืนยันแล้วเมื่อ {ADDRESS_CHECKED}
          </p>
          <ul className={styles.bodyList}>
            <li><strong>ทำไม &ldquo;ทางการ&rdquo; จึงสำคัญที่นี่:</strong> ราคาพื้นฐานอยู่บนปฏิทินของ teamLab เอง และสิทธิ์เปลี่ยนวันฟรีสามครั้งมีเฉพาะตั๋วที่ซื้อตรง ตัวแทนขายสิทธิ์เข้าชมเดียวกันภายใต้เงื่อนไขของตัวเอง</li>
            <li><strong>ใครอีกบ้างที่ถูกต้อง:</strong> Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab ตั๋ว Klook จึงเป็นสิทธิ์เข้าชมเดียวกันที่เคาน์เตอร์อื่น — ไม่ใช่ทางลัดและไม่ใช่การบวกราคาจากหน้าประตู</li>
            <li><strong>สิ่งที่การซื้อตรงไม่ได้ให้:</strong> ส่วนลด วันและรอบเป็นตัวกำหนดราคาผู้ใหญ่ และปฏิทินนั้นคือปฏิทินเดียวกันที่อยู่เบื้องหลังทุกช่องทางทางการ</li>
            <li><strong>สิ่งที่อาจทำให้คุณเสีย:</strong> บัตรถูกปฏิเสธ หน้าชำระเงินแบบญี่ปุ่นเป็นเหตุผลทั่วไปที่ผู้มาเยือนหันไปใช้ตัวแทน และการชำระเงินแบบสากลก็เป็นคำตอบที่สมเหตุสมผล ไม่ใช่ความผิดพลาด</li>
          </ul>
          <p className={styles.bodyText}>
            สรุปคือ ซื้อตรงถ้าบัตรของคุณใช้ได้และอยากได้ความยืดหยุ่นเรื่องวัน ซื้อผ่าน Klook ถ้าอยากชำระเงินในภาษาและ
            สกุลเงินของตัวเอง พร้อมเก็บตั๋วอิเล็กทรอนิกส์ไว้กับการจองอื่น
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกัน</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless vs Planets: ควรจองแห่งไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>จอง Borderless ถ้าอยากดูงานศิลปะ จอง Planets ถ้าอยากเดินเข้าไปในงานศิลปะ หรือถ้าพาเด็กไปด้วย</strong>{" "}
            โตเกียวมีพิพิธภัณฑ์ teamLab สองแห่ง และผู้มาเยือนจองผิดแห่งกันเป็นประจำ ทั้งสองเป็นสถานที่แยกกัน
            ตั๋วแยกกัน อยู่คนละย่านของเมือง และตัวเลขด้านล่างคือสิ่งที่ช่วยตัดสิน สำหรับฝั่ง Planets แบบเต็ม — กฎเท้าเปล่า
            ล็อกเกอร์ นโยบายเรื่องเด็ก — ดู{" "}
            <Link href="/th/guides/attractions/teamlab-tokyo-tickets">ไกด์ตั๋ว teamLab Planets</Link>
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Borderless", "teamLab Planets"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsPlanetsRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตัวเลขของ Borderless อ่านจากเว็บไซต์ทางการของ teamLab เมื่อ {CHECKED} ส่วนตัวเลขของ Planets
            อ่านจากร้านขายตั๋วทางการของ Planets เองเมื่อ {PLANETS_CHECKED} ทั้งสองพิพิธภัณฑ์ตั้งราคาผู้ใหญ่ตามวันและรอบ
            และปฏิทินของทั้งคู่เปลี่ยนได้ จึงควรยืนยันด้วยวันของคุณเอง เวลาที่ควรเผื่อของแต่ละแห่งเป็นคำแนะนำในการวางแผนของเรา
            ไม่ใช่ตัวเลขทางการ
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            ถ้ามีเวลาไปทั้งสองแห่ง ให้ไปคนละวัน ดูดิจิทัลอาร์ตสี่ชั่วโมงในบ่ายเดียวคือวิธีที่เร็วที่สุดที่จะไม่เห็นอะไรเลย
            และสองแห่งนี้ห่างกัน 30 นาที อยู่คนละฝั่งของเมือง
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless อยู่ที่ไหน</h2>
          <p className={styles.bodyText}>
            พิพิธภัณฑ์อยู่ชั้น B1 ของ Azabudai Hills Garden Plaza B ในย่านโทราโนมง 5 โจเมะ เขตมินาโตะ
            ที่นี่ไม่ใช่ Borderless เดิมที่โอไดบะ — ที่นั่นปิดไปแล้ว — จึงควรข้ามเส้นทางที่พาคุณไปริมอ่าว
          </p>
          <ul className={styles.bodyList}>
            <li><strong>สถานีคามิยะโจ</strong> (สายฮิบิยะ โตเกียวเมโทร) — เดิน 2 นาทีจากทางออก 5</li>
            <li><strong>สถานีร็อปปงหงิอิตโจเมะ</strong> (สายนัมโบกุ โตเกียวเมโทร) — เดิน 6 นาทีจากทางออก 4</li>
            <li>ทั้งสองสถานีเชื่อมกับ Azabudai Hills ด้วยทางเดินใต้ดิน เดินตามป้ายได้ตลอดทางโดยไม่ต้องขึ้นไปที่ระดับถนน</li>
          </ul>
          <p className={styles.bodyText}>
            แตะเข้าออกด้วย{" "}
            <Link href="/guides/transport/ic-cards-japan">บัตร IC อย่าง Suica หรือ Pasmo (ภาษาอังกฤษ)</Link>{" "}
            แล้วทั้งสองสถานีก็ไม่ต้องวางแผนอะไร —{" "}
            <Link href="/guides/transport/tokyo-transportation">ไกด์การเดินทางในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            อธิบายสายรถไฟอย่างละเอียดกว่า
          </p>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "ตั๋ว teamLab Fukuoka 2026: ราคา เวลาเปิด และการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "ตั๋ว teamLab Kyoto: ราคา เวลาเปิด และการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "ตั๋ว teamLab Botanical Garden Osaka: ราคาและเวลาเปิด (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-joypolis-tickets", title: "ตั๋ว Tokyo Joypolis (2026): ราคาพาสปอร์ต เวลาเปิด และเกณฑ์ส่วนสูง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/teamlab-tokyo-tickets", title: "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/guides/transport/tokyo-transportation", title: "เดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำอีกมากในญี่ปุ่น (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองรอบ Borderless ของคุณ</h2>
            <p className={styles.ctaBannerDesc}>
              การเข้าชมแบบระบุเวลาหมายความว่ารอบที่คุณอยากได้คือรอบที่หมดก่อน Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ
              teamLab ชำระเงินด้วยสกุลเงินของคุณเอง และรับตั๋วอิเล็กทรอนิกส์บนมือถือ
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋ว teamLab Borderless →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabBorderless} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
