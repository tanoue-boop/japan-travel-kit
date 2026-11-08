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
import {
  dotonboriCityCruise,
  dotonboriDaytimeFoodTour,
  dotonboriNaniwaSightseeingBoat,
  dotonboriTonboriRaveCruise,
  nambaBarHoppingNightTour,
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaWonderCruise,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/dotonbori-river-cruise.tsx) as of
// 1 November 2026, section for section and CTA for CTA. Every figure comes from that page,
// which read them off osaka-info.jp, the Osaka Amazing Pass operator's list and
// suito-osaka.jp; nothing was re-checked or added for this edition.

const ROUTE = "/th/guides/attractions/dotonbori-river-cruise";
const TITLE = "ล่องเรือโดทงโบริ 2026: ¥2,000 20 นาที";
const DESC =
  "ล่องเรือโดทงโบริ: ผู้ใหญ่ ¥2,000 ราว 20 นาที ทุกครึ่งชั่วโมง 11:00–21:00 เทียบเรือแล้วจองเลย";

const CHECKED = dateLabel("2026-11-01", "th");
// The pass price is owned by lib/attraction-prices.ts, shared with the English pages.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, "th");

const PASS_URL = klookFor(osakaAmazingPass.url, "th");
const CITY_CRUISE_URL = klookFor(dotonboriCityCruise.url, "th");
const NANIWA_URL = klookFor(dotonboriNaniwaSightseeingBoat.url, "th");
const RAVE_URL = klookFor(dotonboriTonboriRaveCruise.url, "th");
const WONDER_URL = klookFor(osakaWonderCruise.url, "th");
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, "th");
const FOOD_TOUR_URL = klookFor(dotonboriDaytimeFoodTour.url, "th");

const LINK_STYLE = { color: "var(--text)", fontWeight: 600 } as const;

const fareRows = [
  { tier: "ผู้ใหญ่", price: "¥2,000", what: "ราคาที่เคาน์เตอร์ท่าทาซาเอมงบาชิ และเป็นตัวเลขที่ใช้วัดว่าบัตรพาสคุ้มไหม" },
  { tier: "นักเรียน (ม.ต้นขึ้นไป)", price: "¥1,000", what: "ครึ่งหนึ่งของผู้ใหญ่ — หนึ่งในไม่กี่สถานที่ในโอซาก้าที่มีราคานักเรียนแยกไว้" },
  { tier: "เด็ก (ประถม)", price: "¥500", what: "หนึ่งในสี่ของราคาผู้ใหญ่" },
  { tier: "เด็กก่อนวัยเรียน", price: "ฟรี", what: "ผู้ใหญ่ที่จ่ายเงินหนึ่งคนพาขึ้นฟรีได้หนึ่งคน คนที่สองจ่ายราคาเด็ก ¥500" },
  { tier: "ผู้ถือ Osaka Amazing Pass", price: "ฟรี", what: "รวมหนึ่งรอบ — แต่ต้องแลกเป็นตั๋วระบุเวลาที่เคาน์เตอร์ต้อนรับก่อน" },
  { tier: "ผู้ถือ Osaka e-Pass", price: "ฟรี", what: "หน้า e-Pass ของเมืองโอซาก้าเองก็ระบุว่าเป็นสถานที่เข้าฟรี" },
];

const scheduleRows = [
  { what: "รอบแรก", when: "11:00" },
  { what: "รอบสุดท้าย", when: "21:00" },
  { what: "ความถี่", when: "ทุก 30 นาที — ตรงชั่วโมงและครึ่งชั่วโมง รวมวันละ 21 รอบ" },
  { what: "เวลาอยู่บนน้ำ", when: "ราว 20 นาที" },
  { what: "จุดลงเรือ", when: "ท่าทาซาเอมงบาชิ บนทางเดิน Tonbori River Walk (ฝั่งเหนือ) ห่างสะพานเอบิสึบาชิหนึ่งนาที" },
  { what: "เคาน์เตอร์ต้อนรับ", when: "ชั้น 1 ของร้าน Don Quijote โดทงโบริ ตรงหน้าท่าเรือพอดี" },
  { what: "ห้องขายตั๋วเปิด", when: "หนึ่งชั่วโมงก่อนรอบแรกของวัน — 10:00" },
  { what: "ปิดจองออนไลน์", when: "10 นาทีก่อนออกเรือ (จ่ายล่วงหน้า)" },
  { what: "จองทางโทรศัพท์", when: "ไม่รับ" },
  { what: "วันหยุดเดินเรือปี 2026", when: "13, 24 และ 25 กรกฎาคม" },
  { what: "การงดเดินเรือ", when: "อาจเปลี่ยนโดยไม่แจ้งล่วงหน้าตามสภาพแม่น้ำและการซ่อมบำรุงเรือ" },
];

const boatRows = [
  {
    boat: "Tombori River Cruise (Ipponmatsu Kaiun)",
    run: "ราว 20 นาที 11:00–21:00 ทุกครึ่งชั่วโมง",
    fare: "ผู้ใหญ่ ¥2,000／นักเรียน ¥1,000／เด็ก ¥500",
    pass: "ฟรีด้วย Osaka Amazing Pass และ Osaka e-Pass",
    sold: "เคาน์เตอร์ที่ท่าทาซาเอมงบาชิ หรือระบบจองออนไลน์ของผู้ให้บริการเอง",
  },
  {
    boat: "Wonder Cruise — เส้นทางโดทงโบริ",
    run: "20 นาที วนหนึ่งรอบช่วงโดทงโบริ",
    fare: "ผู้ใหญ่ ¥1,000／เด็ก ¥500",
    pass: "ไม่ได้อยู่ในรายชื่อสถานที่ของบัตรพาส",
    sold: "ท่านิปปงบาชิ บูธขายตั๋วที่ร้าน WONDER PUB ข้าง ๆ",
  },
  {
    boat: "Wonder Cruise — เส้นทาง Osaka Cruise",
    run: "30–40 นาที เที่ยวเดียว ระหว่างนิปปงบาชิกับฮาจิเคนยาฮามะ",
    fare: "ผู้ใหญ่ ¥1,800／เด็ก ¥900",
    pass: "ไม่ได้อยู่ในรายชื่อสถานที่ของบัตรพาส",
    sold: "บูธเดียวกัน — รอบจำกัด หน้าข้อมูลจึงแนะนำให้จองล่วงหน้า",
  },
  {
    boat: "เรือชมวิวนานิวะ",
    run: "30 นาที (ตามหน้าสินค้า Klook)",
    fare: "ดูราคาปัจจุบันที่หน้าสินค้า",
    pass: "ไม่ใช่สถานที่ของบัตรพาส",
    sold: "Klook — นักท่องเที่ยวต่างชาติจองด้วยบัตรต่างประเทศได้",
  },
  {
    boat: "Dotonbori City Cruise",
    run: "20 นาที (ตามหน้าสินค้า Klook)",
    fare: "ดูราคาปัจจุบันที่หน้าสินค้า",
    pass: "ไม่ใช่สถานที่ของบัตรพาส",
    sold: "Klook — ที่นั่งแบบเลานจ์ นำเครื่องดื่มขึ้นเองได้ พาสัตว์เลี้ยงได้",
  },
  {
    boat: "เรือ TONBORIRAVE",
    run: "เป็นเรือ DJ ไม่ใช่เรือชมวิว",
    fare: "ดูราคาปัจจุบันที่หน้าสินค้า",
    pass: "ไม่ใช่สถานที่ของบัตรพาส",
    sold: "Klook — แพ็กเกจรวมบัตรเข้าไนต์คลับ Piccadilly ฟรี",
  },
];

const whoFor = [
  {
    title: "ไปหลังมืด ถ้า…",
    desc: "คุณอยากได้ภาพแบบที่อยู่บนโปสการ์ด ป้ายกูลิโกะ นีออนบนหน้าตึกแถวเอบิสึบาชิ และแสงสะท้อนบนผิวน้ำ คือหัวใจของการล่องเรือนี้ และตอนบ่ายสองไม่มีอะไรในนั้นเลย รอบสุดท้ายคือ 21:00 ดังนั้นแม้กลางฤดูร้อนที่พระอาทิตย์ตกที่โอซาก้าหลัง 19:00 ก็ยังเหลือรอบกลางคืนอีกสี่รอบหลังฟ้ามืด",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "ไปตอนกลางวัน ถ้า…",
    desc: `คุณถือบัตรพาสและอยากให้ทั้งวันลงตัว หรือมากับเด็ก รอบกลางวันคือรอบที่จองได้ง่าย — คำแนะนำของผู้ให้บริการบัตรพาสเองคือให้แลกตั๋วช่วงกลางวัน เพราะเรือรอบเย็นเต็มก่อน — และ 20 นาทีตอน 13:00 ไม่มีค่าใช้จ่ายสำหรับผู้ถือพาส แถมแทรกไว้ระหว่างอีกสองจุดได้พอดี คำแนะนำตามที่ประกาศไว้ ณ ${CHECKED}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "เลือกเรือลำอื่น ถ้า…",
    desc: "คุณอยากได้ราคาถูกกว่า ที่นั่งจริง ๆ แทนม้านั่ง รอบที่นานกว่า หรือเครื่องดื่มในมือ เรือ Tombori มีรอบให้บริการบ่อย และใช้บัตรพาสได้ Wonder Cruise วิ่ง 20 นาทีเท่ากันในราคาครึ่งเดียวจากท่านิปปงบาชิ ส่วนผู้ให้บริการรายอื่นในโดทงโบริขายรอบ 30 นาที เรือที่นั่งเลานจ์ที่นำเครื่องดื่มขึ้นเองได้ และเรือ DJ ที่แนบบัตรเข้าคลับมาด้วย แม่น้ำเดียวกัน แต่เป็นค่ำคืนที่ต่างกัน",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h18l-2 4H5z" />
        <path d="M5 17V9h14v8" />
        <path d="M12 3v6" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "ตัดสินใจก่อนซื้ออะไรว่าจะใช้บัตรพาสหรือไม่",
    desc: `นี่คือการตัดสินใจเดียวในหน้านี้ที่มีผลกับเงิน Tombori River Cruise เป็นสถานที่เข้าฟรีของ Osaka Amazing Pass ซึ่งบัตรหนึ่งวันราคา ${PASS_1_DAY} ดังนั้นถ้าแผนของคุณมีวันที่ใช้พาสอยู่แล้ว ก็ไม่ต้องซื้อตั๋วเรือเลย ถ้าไม่มี ราคาที่เคาน์เตอร์คือผู้ใหญ่ ¥2,000 และ Wonder Cruise จากท่านิปปงบาชิอยู่ที่ ¥1,000 สำหรับเส้นทางวนโดทงโบริ 20 นาที ซึ่งเป็นตั๋วใบเดียวที่ถูกกว่าบนแม่น้ำสายนี้`,
  },
  {
    title: "ถ้าใช้บัตรพาส ให้แลกตั๋วตั้งแต่ช่วงต้นของวัน",
    desc: "บัตรพาสเพียงอย่างเดียวพาคุณขึ้นเรือไม่ได้ คุณต้องแลกที่เคาน์เตอร์ต้อนรับเป็นตั๋วที่พิมพ์เวลาไว้ และผู้ให้บริการระบุว่าขึ้นเรือได้เฉพาะเวลาที่อยู่บนตั๋วนั้น หมายเหตุของผู้ให้บริการบัตรพาสเองบอกว่าเรือรอบเย็นเต็มก่อน และควรแลกช่วงกลางวัน — เดินผ่านท่าเรือระหว่างทางไปที่อื่นแล้วจัดการรอบเวลาไปเลย",
  },
  {
    title: "ถ้าจ่ายเอง ให้ซื้อที่เคาน์เตอร์หรือออนไลน์ ไม่ใช่ทางโทรศัพท์",
    desc: "ตั๋ววันเดียวกันขายที่ห้องขายตั๋วข้างท่าเรือ ซึ่งเปิดหนึ่งชั่วโมงก่อนรอบแรกของวัน ไม่มีการจองทางโทรศัพท์ การจองออนไลน์ทำได้ถึง 10 นาทีก่อนออกเรือและจ่ายล่วงหน้า ซึ่งเป็นวิธีที่ควรใช้ในเย็นวันศุกร์หรือเสาร์",
  },
  {
    title: "การหาท่าเรือไม่ยากอย่างที่คิด",
    desc: "ท่าทาซาเอมงบาชิอยู่บนทางเดิน Tonbori River Walk ฝั่งเหนือ และเคาน์เตอร์ต้อนรับอยู่ชั้น 1 ของร้าน Don Quijote โดทงโบริ — ตึกที่มีชิงช้าสวรรค์ติดอยู่ด้านข้าง เดินจากสถานีนัมบะ ชินไซบาชิ หรือนิปปงบาชิ 5 ถึง 10 นาที แต่ทั้งสามสถานีอยู่คนละฝั่งของคลองกับท่าเรือ จึงต้องข้ามที่สะพานเอบิสึบาชิหรือทาซาเอมงบาชิ",
  },
  {
    title: "เผื่อเวลาราว 40 นาทีรวมทั้งหมด ไม่ใช่ 20 นาที",
    desc: "ล่องเรือ 20 นาที คิวที่เคาน์เตอร์ต้อนรับ การเดินลงไปที่ทุ่นลอย และการขึ้นเรือที่จุคนได้ราวยี่สิบกว่าคน คืออีกครึ่งหนึ่ง ถ้าจะแทรกไว้ระหว่างร้านอาหารที่จองไว้กับการแสดง ให้คิดเป็นบล็อก 40 นาที",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ล่องเรือโดทงโบริราคาเท่าไร?",
    a: `ผู้ใหญ่ ¥2,000 Tombori River Cruise ซึ่งเป็นเรือของผู้ให้บริการที่ออกจากท่าทาซาเอมงบาชิ ราคาผู้ใหญ่ ¥2,000 นักเรียนตั้งแต่ ม.ต้นขึ้นไป ¥1,000 และเด็กประถม ¥500 โดยผู้ใหญ่ที่จ่ายเงินหนึ่งคนพาเด็กก่อนวัยเรียนขึ้นฟรีได้หนึ่งคน ทั้งหน่วยงานท่องเที่ยวทางการของโอซาก้าและรายการสถานที่ของผู้ให้บริการ Osaka Amazing Pass ประกาศตัวเลขสามตัวเดียวกันนี้ เรือลำนี้ฟรีด้วย Osaka Amazing Pass และฟรีด้วย Osaka e-Pass โดยทั้งสองกรณีต้องแลกบัตรพาสเป็นตั๋วระบุเวลาที่เคาน์เตอร์ต้อนรับก่อน เรือลำอื่นในโดทงโบริตั้งราคาแยก — Wonder Cruise จากท่านิปปงบาชิอยู่ที่ ¥1,000 สำหรับเส้นทางโดทงโบริ 20 นาที และเรือที่ขายบน Klook ประกาศราคาไว้บนหน้าสินค้าของตัวเอง ทั้งหมดอ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "Tombori River Cruise ใช้เวลานานเท่าไร?",
    a: `อยู่บนน้ำราว 20 นาที วิ่งตามคลองโดทงโบริผ่านใจกลางย่านมินามิแล้วกลับ นับว่าสั้นสำหรับการล่องเรือ และเป็นความยาวที่พอดี เพราะช่วงแม่น้ำที่ผ่านมีแค่หน้าตึกนีออนไม่กี่ร้อยเมตร ถ้านานกว่านี้ก็แค่วนอีกรอบ เมื่อนับคิวที่เคาน์เตอร์ การเดินไปทุ่นลอย และการขึ้นเรือ ให้เผื่อใกล้ 40 นาทีรวมทั้งหมด ระยะเวลาตามที่เว็บไซต์ท่องเที่ยวทางการของโอซาก้าและพอร์ทัลล่องเรือ Aqua Metropolis Osaka ประกาศไว้ อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "ล่องเรือโดทงโบริออกกี่โมง?",
    a: `ออกตั้งแต่ 11:00 ถึง 21:00 ทุก 30 นาที — ตรงชั่วโมงและครึ่งชั่วโมง รวมวันละ 21 รอบ ทุกวันยกเว้นวันที่ 13, 24 และ 25 กรกฎาคม 2026 ห้องขายตั๋วข้างท่าเรือเปิดหนึ่งชั่วโมงก่อนรอบแรก คือ 10:00 ตัวเลขที่สำคัญตอนวางแผนคือรอบสุดท้าย 21:00 เพราะดึกพอที่จะล่องเรือกลางคืนหลังมื้อเย็นได้ในทุกฤดู และทำให้รอบช่วงเย็นเป็นรอบที่หายาก ไม่ใช่รอบกลางวัน ตารางอ่านเมื่อ ${CHECKED} และอาจเปลี่ยนตามสภาพแม่น้ำและการซ่อมบำรุงเรือ`,
  },
  {
    q: "เรือรอบสุดท้ายของล่องเรือโดทงโบริคือกี่โมง?",
    a: `21:00 ทุกวันที่เดินเรือ เพราะทุกรอบราคาเท่ากัน รอบสุดท้ายจึงเป็นวิธีที่ถูกที่สุดในการได้เห็นโดทงโบริตอนไฟเปิดเต็มที่ แต่ก็อยู่ในช่วงที่ผู้ให้บริการบัตรพาสบอกว่าเต็มก่อน จึงเป็นรอบที่ควรล็อกไว้ล่วงหน้าแทนที่จะไปลุ้นหน้างาน ถ้าใช้บัตรพาส ให้แลกตั๋วรอบ 20:30 หรือ 21:00 ตอนกลางวัน ถ้าจ่ายเอง ระบบจองออนไลน์ของผู้ให้บริการเปิดถึง 10 นาทีก่อนออกเรือ เวลารอบสุดท้ายอ่านเมื่อ ${CHECKED} จากเว็บไซต์ท่องเที่ยวทางการของโอซาก้าและรายการสถานที่ของผู้ให้บริการบัตรพาส ซึ่งตรงกัน`,
  },
  {
    q: "ลงเรือล่องโดทงโบริที่ไหน?",
    a: "ที่ท่าทาซาเอมงบาชิ บนทางเดิน Tonbori River Walk ริมฝั่งเหนือของคลองโดทงโบริ ห่างสะพานเอบิสึบาชิไปทางตะวันออกราวหนึ่งนาที เคาน์เตอร์ต้อนรับอยู่ชั้น 1 ของร้าน Don Quijote โดทงโบริ ตรงหน้าท่าเรือพอดี ซึ่งเป็นแลนด์มาร์กที่ควรเล็งแทนตัวท่าเรือ เดินจากสถานีนัมบะ ชินไซบาชิ หรือนิปปงบาชิ 5 ถึง 10 นาที ทั้งสามสถานีอยู่ฝั่งใต้ที่มีป้ายกูลิโกะ จึงต้องข้ามที่เอบิสึบาชิหรือทาซาเอมงบาชิเพื่อไปถึงเรือ โปรดทราบว่า Wonder Cruise เป็นผู้ให้บริการอีกราย และลงเรือที่ท่านิปปงบาชิแทน จึงควรเช็กว่าตั๋วของคุณเป็นของเรือลำไหนก่อนเดินไปที่ทุ่นลอย",
  },
  {
    q: "ล่องเรือโดทงโบริกับ Tombori River Cruise ต่างกันอย่างไร?",
    a: `เป็นเรือลำเดียวกันที่มีสองชื่อ "Tombori River Cruise" (とんぼりリバークルーズ) เป็นชื่อสินค้าทางการ ดำเนินการโดย Ipponmatsu Kaiun และเป็นชื่อที่ปรากฏบนตั๋ว ที่ท่าเรือ และในรายการสถานที่เข้าฟรีของ Osaka Amazing Pass ส่วน "ล่องเรือโดทงโบริ" เป็นคำบรรยายที่นักท่องเที่ยวส่วนใหญ่ใช้ค้นหา และยังถูกใช้แบบหลวม ๆ กับเรือลำไหนก็ได้บนคลองนี้ รวมถึง Wonder Cruise จากท่านิปปงบาชิ และเรือที่ขายบน Klook ได้แก่ City Cruise เรือชมวิวนานิวะ และเรือ DJ TONBORIRAVE ซึ่งเป็นผู้ให้บริการต่างรายและราคาต่างกัน ถ้าบัตรพาสคือเหตุผลที่คุณจะขึ้นเรือ เรือ Tombori เป็นลำเดียวที่ใช้บัตรพาสได้ ชื่อและผู้ให้บริการตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "มีเรือในโดทงโบริที่ถูกกว่า Tombori River Cruise ราคา ¥2,000 ไหม?",
    a: `มี ถ้าคุณไม่ได้ใช้บัตรพาส หน่วยงานท่องเที่ยวทางการของโอซาก้าระบุ Wonder Cruise เส้นทางโดทงโบริที่ผู้ใหญ่ ¥1,000 และเด็ก ¥500 สำหรับการวนช่วงเดียวกัน 20 นาที — ครึ่งราคาของ Tombori ในความยาวเท่ากัน — ลงเรือที่ท่านิปปงบาชิ บูธขายตั๋วอยู่ที่ร้าน WONDER PUB ข้าง ๆ ส่วนเส้นทาง Osaka Cruise ที่ยาวกว่า เป็นเที่ยวเดียว 30 ถึง 40 นาทีระหว่างนิปปงบาชิกับฮาจิเคนยาฮามะ ผู้ใหญ่ ¥1,800 และเด็ก ¥900 ข้อแลกเปลี่ยนคือแต่ละเส้นทางมีรอบจำกัด หน้าข้อมูลจึงแนะนำให้จองล่วงหน้า และไม่มีบัตรพาสโอซาก้าใบไหนใช้ได้ ถ้าคุณถือ Osaka Amazing Pass อยู่ เรือ Tombori ฟรี การเปรียบเทียบนี้ก็ไม่จำเป็น ราคาอ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "ล่องเรือโดทงโบริฟรีด้วย Osaka Amazing Pass ไหม?",
    a: `ฟรี — Tombori River Cruise เป็นหนึ่งในสถานที่เข้าฟรีของ Osaka Amazing Pass และไม่มีการตัดเวลาแบบที่ Umeda Sky Building มี และยังฟรีด้วย Osaka e-Pass เงื่อนไขเป็นเรื่องขั้นตอน ไม่ใช่เรื่องเงิน คุณต้องแลกบัตรพาสที่เคาน์เตอร์ต้อนรับเป็นตั๋วที่พิมพ์เวลาออกเรือไว้ และผู้ให้บริการระบุว่าขึ้นเรือได้เฉพาะเวลาที่อยู่บนตั๋ว ผู้ให้บริการบัตรพาสยังเตือนว่าเรือรอบเย็นเต็มเร็วและแนะนำให้แลกช่วงกลางวัน ด้วยบัตรหนึ่งวันราคา ${PASS_1_DAY} แค่เรือ ¥2,000 บวกหอหลักปราสาทโอซาก้า ¥1,200 ก็เกือบคุ้มแล้วก่อนจะนับรถไฟใต้ดินแม้แต่เที่ยวเดียว เงื่อนไขอ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "ต้องจองล่องเรือโดทงโบริล่วงหน้าไหม?",
    a: "ปกติไม่ต้อง แต่ตอนเย็นเป็นคนละเรื่องกับตอนบ่าย ตั๋ววันเดียวกันขายที่ห้องขายตั๋วข้างท่าเรือซึ่งเปิดหนึ่งชั่วโมงก่อนรอบแรก และบ่ายวันธรรมดาเดินไปซื้อได้เลย ไม่มีการจองทางโทรศัพท์ สำหรับรอบคืนวันศุกร์หรือเสาร์ ให้ใช้ระบบจองออนไลน์ของผู้ให้บริการ ซึ่งเปิดถึง 10 นาทีก่อนออกเรือและจ่ายล่วงหน้า หรือถ้าใช้บัตรพาส ให้แลกตั๋วรอบเย็นตั้งแต่ช่วงต้นของวัน เพราะคำแนะนำของผู้ให้บริการเองคือเรือกลางคืนเต็มก่อน",
  },
  {
    q: "ล่องเรือโดทงโบริกลางคืนหรือกลางวันดีกว่า?",
    a: "กลางคืน ถ้าคุณขึ้นแค่ครั้งเดียว สิ่งที่คุณจ่ายเงินเพื่อดูคือป้ายกูลิโกะ หน้าตึกนีออน และแสงบนผิวน้ำ ซึ่งทั้งหมดต้องอาศัยความมืด กลางวันมีข้อดีสองข้อ และทั้งสองข้อเป็นเรื่องปฏิบัติ คือรอบจองได้ง่ายกว่า และผู้ถือบัตรพาสที่พยายามใส่สถานที่เข้าฟรีหลายแห่งไว้ในวันเดียว จะพบว่ารอบ 13:00 จัดตารางง่ายกว่ารอบ 19:30 ถ้าอยากเลือกรอบที่ทันช่วงแสงเปลี่ยน คู่มือ Umeda Sky Building (ภาษาอังกฤษ) ของเรามีเวลาพระอาทิตย์ตกของโอซาก้าที่ประกาศไว้ตามฤดูกาล",
  },
  {
    q: "ฝนตกยังเดินเรือไหม?",
    a: `ปกติยังเดิน แต่ควรเตรียมเสื้อคลุมและหมวกฮู้ด เรือลำนี้ถูกระบุว่าไม่มีหลังคาบนพอร์ทัลล่องเรือ Aqua Metropolis Osaka อ่านเมื่อ ${CHECKED} ซึ่งเป็นสิ่งที่ทำให้มันลอดใต้สะพานเตี้ย ๆ ของโดทงโบริได้ เงื่อนไขการงดเดินเรือที่ประกาศไว้ไม่ใช่ฝนโดยตรง — รายการสถานที่ของผู้ให้บริการบัตรพาสระบุว่าบริการอาจถูกระงับเพราะสภาพแม่น้ำหรือการซ่อมบำรุงเรือ ให้มองว่าฝนหนักและระดับน้ำสูงคือความเสี่ยง ไม่ใช่ฝนปรอย และถ้าอากาศไม่แน่นอน ทางเลือกที่หลบฝนได้ในละแวกเดียวกันคือทัวร์อาหาร ไม่ใช่เรือ`,
  },
  {
    q: "ควรเลือกเรือล่องโดทงโบริลำไหน?",
    a: "Tombori River Cruise ถ้าคุณถือบัตรพาสโอซาก้าหรืออยากได้ลำที่รอบถี่ที่สุด — ¥2,000, 20 นาที, ทุกครึ่งชั่วโมง และเป็นลำเดียวที่ใช้บัตรพาสได้ Wonder Cruise เส้นทางโดทงโบริ ถ้าคุณจ่ายเงินสดและอยากได้ 20 นาทีเท่ากันในราคา ¥1,000 โดยลงเรือที่ท่านิปปงบาชิแทน และไม่ติดที่ต้องจองล่วงหน้าเพราะรอบจำกัด เรือชมวิวนานิวะ ถ้าอยากได้รอบที่ยาวกว่าที่ 30 นาที Dotonbori City Cruise ถ้าอยากได้ที่นั่งแบบเลานจ์และเครื่องดื่มของตัวเองบนเรือ หน้าสินค้ายังระบุว่าพาสัตว์เลี้ยงได้ ซึ่งหาไม่ค่อยได้ และเรือ TONBORIRAVE ถ้านี่คือการเริ่มต้นค่ำคืนมากกว่าการเที่ยวชม — เป็นเรือ DJ ที่แนบบัตรเข้าไนต์คลับ Piccadilly ฟรีมาด้วย แม่น้ำเดียวกัน แต่ค่ำคืนต่างกันมาก",
  },
  {
    q: "ล่องเรือโดทงโบริเหมาะกับเด็กไหม?",
    a: "เหมาะ และโครงสร้างราคาก็บอกเช่นนั้น เด็กประถม ¥500 เทียบกับผู้ใหญ่ ¥2,000 ยี่สิบนาทีสั้นพอที่จะดึงความสนใจเด็กเล็กไว้ได้ คำบรรยายสนุกสนานมากกว่าจริงจัง และไม่ต้องต่อคิวแบบจุดชมวิวหรือเครื่องเล่นในสวนสนุก สิ่งที่ควรวางแผนเผื่อคือเรือเปิดโล่ง — ไม่มีหลังคา แดดในเดือนสิงหาคมและลมในเดือนมกราคม — และตั๋วระบุเวลาหมายความว่าต้องไปถึงก่อนเวลาที่พิมพ์บนตั๋ว ไม่ใช่ไปถึงเมื่อไรก็ได้",
  },
  {
    q: "รอบ ๆ โดทงโบริมีอะไรทำบ้างก่อนและหลังล่องเรือ?",
    a: "นั่งเรือยี่สิบนาทียังไม่ใช่ทั้งค่ำคืน และถนนสองฝั่งของท่าเรือคือย่านที่ร้านอาหารหนาแน่นที่สุดในญี่ปุ่น ทางเลือกช่วงกลางวันคือทัวร์เดินกิน — ทัวร์โดทงโบริแบบจอยที่ระบุเวลา 11:00 ถึง 14:00 มีคุชิคัตสึ ทาโกยากิ ชุดอาหารกลางวันตามฤดูกาล และของหวาน สำหรับกลุ่มสองถึงสิบคน ทางเลือกช่วงเย็นคือทัวร์บาร์ผ่านนัมบะและตรอกด้านหลัง แทนที่จะเป็นถนนโดทงโบริเอง ทั้งสองกิจกรรมอยู่ในย่านเดียวกับเส้นทางล่องเรือ ห่างกันเพียงไม่กี่ร้อยเมตร",
  },
];

const tourPicks = [
  withKlookLocale(dotonboriDaytimeFoodTour, "th", {
    title: "ทัวร์อาหารโดทงโบริช่วงกลางวัน โอซาก้า",
    desc: "ทัวร์เดินแบบจอยสามชั่วโมง ระบุเวลา 11:00–14:00 สำหรับ 2 ถึง 10 คน มีคุชิคัตสึ ทาโกยากิ ชุดอาหารกลางวันตามฤดูกาลที่อิซากายะ และของหวานท้องถิ่น",
  }),
  withKlookLocale(nambaBarHoppingNightTour, "th", {
    title: "ทัวร์ตระเวนบาร์ยามค่ำในนัมบะ โอซาก้า",
    desc: "ทัวร์ค่ำแบบจอยสามชั่วโมงครึ่งกับไกด์ที่พูดภาษาอังกฤษ ตระเวนบาร์รอบนัมบะและเท็มมะ แทนที่จะเป็นถนนโดทงโบริ",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ล่องเรือโดทงโบริ" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThDotonboriRiverCruisePage({ updated }: { updated: PageUpdated }) {
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
            ล่องเรือโดทงโบริ 2026:<br />ราคา เวลาออกเรือ และเรือ Tombori
          </h1>
          <p className={styles.heroSubtitle}>
            ผู้ใหญ่ ¥2,000 ราว 20 นาที และออกจากท่าทาซาเอมงบาชิทุกครึ่งชั่วโมงระหว่าง 11:00 ถึง 21:00 —
            ฟรีด้วย Osaka Amazing Pass ถ้าคุณแลกตั๋วก่อนที่เรือรอบเย็นจะเต็ม
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ ระบุวันที่", "เทียบ 6 ตัวเลือก"].map((t) => (
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
            <span className={styles.verdictLabel}>สรุปสั้น</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ราคา</p>
                <p className={styles.verdictStatValue}>ผู้ใหญ่ ¥2,000／เด็ก ¥500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาอยู่บนน้ำ</p>
                <p className={styles.verdictStatValue}>ราว 20 นาที</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>รอบออกเรือ</p>
                <p className={styles.verdictStatValue}>11:00–21:00 ทุกครึ่งชั่วโมง</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Osaka Amazing Pass</p>
                <p className={styles.verdictStatValue}>ฟรีทั้งวัน</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>ล่องเรือโดทงโบริ</strong> — ชื่อทางการคือ{" "}
              <strong>Tombori River Cruise</strong> ดำเนินการโดย{" "}
              <strong>Ipponmatsu Kaiun</strong> — ราคา <strong>¥2,000</strong> สำหรับผู้ใหญ่
              ใช้เวลา <strong>ราว 20 นาที</strong> และออกจาก{" "}
              <strong>ท่าทาซาเอมงบาชิ</strong> บนทางเดิน Tonbori River Walk ห่างสะพานเอบิสึบาชิหนึ่งนาที{" "}
              <strong>ทุก 30 นาที ตั้งแต่ 11:00 ถึง 21:00</strong> และ{" "}
              <strong>ฟรีด้วย Osaka Amazing Pass</strong>
            </p>
            <p className={styles.verdictText}>
              รายละเอียดที่เหลือ: นักเรียนตั้งแต่ ม.ต้นขึ้นไป <strong>¥1,000</strong> เด็กประถม{" "}
              <strong>¥500</strong> และผู้ใหญ่ที่จ่ายเงินหนึ่งคนพาเด็กก่อนวัยเรียนขึ้นฟรีได้หนึ่งคน
              เคาน์เตอร์ต้อนรับอยู่ชั้น 1 ของร้าน Don Quijote โดทงโบริ ตรงหน้าท่าเรือพอดี{" "}
              <strong>Osaka e-Pass</strong> ก็ใช้ได้เช่นกัน และทั้งสองพาสไม่มีการตัดเวลาช่วงบ่าย —
              แต่บัตรพาสไม่ได้พาคุณขึ้นเรือ คุณต้องแลกที่เคาน์เตอร์ต้อนรับเป็นตั๋วที่พิมพ์เวลาออกเรือไว้
              และผู้ให้บริการบัตรพาสเตือนว่าเรือรอบเย็นเต็มก่อน ตั๋ววันเดียวกันขายที่ท่าเรือตั้งแต่หนึ่ง
              ชั่วโมงก่อนรอบแรก (10:00) การจองออนไลน์ปิด 10 นาทีก่อนออกเรือ และไม่มีการจองทางโทรศัพท์
              ทั้งหมดอ่านเมื่อ {CHECKED}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดู Osaka Amazing Pass บน Klook →
              </KlookLink>
              <KlookLink href={CITY_CRUISE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                จองล่องเรือโดทงโบริออนไลน์ →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ล่องเรือโดทงโบริคืออะไร?</h2>
          <p className={styles.bodyText}>
            การนั่งเรือลำเตี้ยเปิดโล่ง <strong>20 นาที ราคา ¥2,000</strong> ชื่อว่า{" "}
            <strong>Tombori River Cruise</strong> ดำเนินการโดย <strong>Ipponmatsu Kaiun</strong>{" "}
            ออกจาก <strong>ท่าทาซาเอมงบาชิ</strong> ทุกครึ่งชั่วโมงระหว่าง{" "}
            <strong>11:00 ถึง 21:00</strong> และ <strong>ฟรีด้วย Osaka Amazing Pass</strong>{" "}
            คำว่า &ldquo;ล่องเรือโดทงโบริ&rdquo; คือสิ่งที่นักท่องเที่ยวค้นหา แต่{" "}
            <strong>Tombori River Cruise</strong> คือชื่อบนตั๋ว บนป้ายท่าเรือ และในรายการสถานที่
            เข้าฟรีของผู้ให้บริการบัตรพาส จึงเป็นชื่อที่ควรมองหาเมื่ออยู่หน้างาน
          </p>
          <p className={styles.bodyText}>
            เส้นทางคือผิวน้ำไม่กี่ร้อยเมตรที่ป้ายกูลิโกะ ฝูงคนบนสะพานเอบิสึบาชิ และปูกลยักษ์
            หันหน้าเข้าหา โดยมีไกด์บนเรือบรรยายด้วยจังหวะฉับไวแบบโอซาก้าที่เมืองนี้ขึ้นชื่อ
          </p>
          <p className={styles.bodyText}>
            เหตุผลที่คุ้มกับยี่สิบนาทีคือมุมมอง โดทงโบริที่ระดับถนนคือความเบียดเสียด คุณยืนไหล่ชนไหล่
            บนสะพานเอบิสึบาชิเพื่อถ่ายป้ายที่ถอยออกมาไม่ได้ จากผิวน้ำคุณอยู่ต่ำกว่าฝูงคนและมองเห็น
            หน้าตึกได้โล่ง ๆ ส่วนสะพานที่ผ่านเหนือหัวในระยะใกล้ก็อธิบายไปในตัวว่าทำไมเรือเหล่านี้
            ไม่มีหลังคา
          </p>
          <p className={styles.bodyText}>
            ที่นี่ไม่มีระบบจองรอบที่ต้องแย่งกัน ไม่มีวันเปิดขาย และบ่ายวันธรรมดาไม่มีความเสี่ยงที่จะเต็ม
            สิ่งที่มีแทนคือ <strong>กฎการแลกตั๋วสำหรับผู้ถือบัตรพาส</strong> และช่วงเย็นที่เต็มก่อนช่วงกลางวัน —
            และสองเรื่องนี้คือตัวตัดสินว่าคนส่วนใหญ่ควรวางแผนอย่างไร ส่วนที่เหลือของหน้านี้คือราคา
            ตารางเวลา ท่าเรือ และเรืออีกสี่ลำที่วิ่งบนผิวน้ำช่วงเดียวกัน
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ล่องเรือโดทงโบริราคาเท่าไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>ผู้ใหญ่ ¥2,000 นักเรียน ¥1,000 เด็ก ¥500</strong> หนึ่งราคาต่อหนึ่งช่วงอายุ
            และเท่ากันทุกรอบ — ไม่มีการบวกเพิ่มสำหรับรอบกลางคืน ซึ่งไม่ค่อยพบ และเป็นเหตุผลเงียบ ๆ
            ที่ทำให้คุ้มค่า:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ใคร", "ราคา", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.tier}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tier}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ราคาอ่านเมื่อ {CHECKED} จากเว็บไซต์ท่องเที่ยวทางการของโอซาก้าและรายการสถานที่เข้าฟรีของ
            ผู้ให้บริการ Osaka Amazing Pass ซึ่งพิมพ์ตัวเลขสามตัวเดียวกัน เว็บไซต์ของบริษัทเรือเองปิด
            ปรับปรุงในวันที่ตรวจสอบ ทุกตัวเลขในหน้านี้จึงมาจากสองแหล่งนั้น อาจเปลี่ยนแปลง —
            ควรยืนยันก่อนจ่ายเงิน สำหรับค่าเข้าสถานที่อื่น ๆ ทั่วญี่ปุ่นที่เว็บไซต์นี้รวบรวมไว้ พร้อมวันที่ตรวจสอบ
            ของแต่ละรายการ ดูได้ที่{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={LINK_STYLE}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวลาและท่าเรือ</span>
          <h2 className={styles.sectionTitle}>ล่องเรือโดทงโบริออกกี่โมง?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>ตั้งแต่ 11:00 ถึง 21:00 ทุก 30 นาที</strong> — ตรงชั่วโมงและครึ่งชั่วโมง ทุกวันยกเว้นวันที่
            13, 24 และ 25 กรกฎาคม 2026 ห้องขายตั๋วข้างท่าเรือเปิดหนึ่งชั่วโมงก่อนรอบแรก คือ{" "}
            <strong>10:00</strong>:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "รายละเอียด"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            วันละ 21 รอบคือตัวเลขที่มีประโยชน์ หมายความว่าการล่องเรือเป็นสิ่งที่คุณแทรกไว้ในค่ำคืน
            ไม่ใช่สิ่งที่ต้องจัดค่ำคืนทั้งหมดรอบมัน และ <strong>รอบสุดท้าย 21:00</strong> ดึกพอที่ยัง
            ใช้ได้หลังมื้อเย็นในทุกฤดู ตารางอ่านเมื่อ {CHECKED}
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            Tombori River Cruise ใช้เวลานานเท่าไร?
          </h3>
          <p className={styles.bodyText}>
            <strong>อยู่บนน้ำราว 20 นาที</strong> เว็บไซต์ท่องเที่ยวทางการของโอซาก้าพิมพ์ไว้ 20 นาที
            และพอร์ทัลล่องเรือ Aqua Metropolis Osaka พิมพ์ว่า &ldquo;ประมาณ 20 นาที&rdquo; ทั้งคู่อ่านเมื่อ{" "}
            {CHECKED} แต่ให้วางแผนเป็น <strong>ราว 40 นาทีรวมทั้งหมด</strong> แทน เพราะเคาน์เตอร์ต้อนรับ
            การเดินลงไปที่ทุ่นลอย และการขึ้นเรือที่จุคนได้ราวยี่สิบกว่าคน คืออีกครึ่งหนึ่ง ยี่สิบนาทีคือ
            ความยาวที่เหมาะกับเส้นทางนี้ — ช่วงแม่น้ำมีแค่หน้าตึกนีออนไม่กี่ร้อยเมตร ถ้านานกว่านี้ก็แค่วนอีกรอบ
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            ลงเรือล่องโดทงโบริที่ไหน?
          </h3>
          <p className={styles.bodyText}>
            ที่ <strong>ท่าทาซาเอมงบาชิ</strong> บนทางเดิน Tonbori River Walk ริม
            <strong>ฝั่งเหนือ</strong>ของคลองโดทงโบริ ห่างสะพานเอบิสึบาชิไปทางตะวันออกราวหนึ่งนาที
            ให้เล็งแลนด์มาร์กแทนตัวท่าเรือ: เคาน์เตอร์ต้อนรับอยู่ที่{" "}
            <strong>ชั้น 1 ของร้าน Don Quijote โดทงโบริ</strong> — ตึกที่มีชิงช้าสวรรค์ติดอยู่ด้านข้าง —
            ตรงหน้าทุ่นลอยพอดี เดินจากสถานี <strong>นัมบะ</strong> <strong>ชินไซบาชิ</strong> หรือ{" "}
            <strong>นิปปงบาชิ</strong> 5 ถึง 10 นาที ทั้งสามสถานีอยู่ฝั่งใต้ที่มีป้ายกูลิโกะ
            จึงต้องข้ามที่เอบิสึบาชิหรือทาซาเอมงบาชิเพื่อไปถึงเรือ{" "}
            <Link href="/guides/transport/osaka-transportation">คู่มือการเดินทางในโอซาก้า (ภาษาอังกฤษ)</Link>{" "}
            อธิบายว่าสาย Midosuji เชื่อมนัมบะกับอูเมดะและเทนโนจิอย่างไร ตำแหน่งและเวลาเดินอ่านเมื่อ {CHECKED}
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            ซื้อตั๋ววันเดียวกันหรือจองล่วงหน้า — และเรือเต็มเมื่อไร
          </h3>
          <p className={styles.bodyText}>
            สองวิธีนี้ไม่เท่ากัน และความต่างสำคัญเฉพาะหลังมืด{" "}
            <strong>วันเดียวกัน</strong>: ห้องขายตั๋วข้างท่าเรือขายรอบถัดไปที่ยังว่างตั้งแต่ 10:00
            และคำของผู้ให้บริการบัตรพาสเรื่องข้อจำกัดนั้นตรงไปตรงมา — &ldquo;เมื่อที่นั่งเต็มแล้ว
            จะขึ้นเรือไม่ได้&rdquo; <strong>ล่วงหน้า</strong>: ระบบจองออนไลน์ของผู้ให้บริการจ่ายล่วงหน้าและเปิดถึง{" "}
            <strong>10 นาทีก่อนออกเรือ</strong> ซึ่งเป็นวิธีที่ควรใช้ในเย็นวันศุกร์หรือเสาร์
            ส่วนการจองทางโทรศัพท์ไม่รับเลย
          </p>
          <p className={styles.bodyText}>
            เรื่องรอบไหนเต็มก่อน คำแนะนำเดียวที่ประกาศไว้มาจากผู้ให้บริการบัตรพาส และค่อนข้างเจาะจง: ให้แลกตั๋ว{" "}
            <strong>ช่วงกลางวัน</strong> เพราะ <strong>เรือรอบเย็นเต็มเร็ว</strong> อ่านตามตรง
            นั่นทำให้รอบหลังมืด — รอบออกเรือช่วง 19:00 ถึง 21:00 และยิ่งในวันหยุดสุดสัปดาห์ — เป็นรอบที่หายาก
            และบ่ายวันธรรมดาเป็นช่วงที่เดินไปขึ้นได้เลย เราไม่มีตัวเลขอัตราที่นั่งที่ประกาศไว้มากกว่านั้น
            จึงควรถือว่าอะไรที่เจาะจงกว่านี้เป็นการเดา ไม่ใช่ตัวเลข คำแนะนำอ่านเมื่อ {CHECKED}
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Osaka Amazing Pass — รวมล่องเรือ →
            </KlookLink>
            <KlookLink href={CITY_CRUISE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              จองรอบล่องเรือโดทงโบริล่วงหน้า →
            </KlookLink>
          </div>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>ควรไปตอนไหน</span>
          <h2 className={styles.sectionTitle}>ล่องเรือโดทงโบริกลางคืนหรือกลางวันดีกว่า?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>กลางคืน ถ้าขึ้นครั้งเดียว</strong> — จุดเด่นของการล่องเรือตอนกลางคืนคือแสงนีออน และราคาเท่ากันทุกรอบ
            และได้ชมวิวกลางคืนโดยไม่ต้องจ่ายเพิ่ม แต่บัตรพาสเปลี่ยนคำตอบ เพราะรอบที่คุณจองได้จริงไม่ใช่รอบที่คุณอยากได้เสมอไป:
          </p>
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
            ถ้าอยากทันช่วงที่แสงเปลี่ยนจริง ๆ ให้เลือกรอบตามวันที่:{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets">คู่มือ Umeda Sky Building (ภาษาอังกฤษ)</Link>{" "}
            ของเรามีเวลาพระอาทิตย์ตกของโอซาก้าที่ประกาศไว้ตามฤดูกาล ซึ่งต่างกันราวสองชั่วโมงครึ่งตลอดทั้งปี
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={RAVE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เรือ DJ สำหรับคืนปาร์ตี้ →
            </KlookLink>
            <KlookLink href={NANIWA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เรือชมวิว 30 นาที →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกัน</span>
          <h2 className={styles.sectionTitle}>ควรเลือกเรือล่องโดทงโบริลำไหน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            มีผู้ให้บริการหลายรายบนผิวน้ำช่วงนี้ และใช้แทนกันไม่ได้ มีความไม่เท่ากันสองข้อที่สำคัญ
            ข้อแรก <strong>มีเพียงเรือ Tombori ที่เป็นสถานที่ของบัตรพาส</strong> และ Klook ไม่ได้ขายเรือลำนี้
            เป็นสินค้าเดี่ยว — ดังนั้นถ้าคุณถือบัตรพาสโอซาก้า เรือที่คุณต้องการคือลำที่จองที่เคาน์เตอร์
            ไม่ใช่บนมือถือ ข้อสอง คู่แข่งรายเดียวที่มีราคาทางการประกาศไว้ คือ{" "}
            <strong>Wonder Cruise</strong> จากท่านิปปงบาชิ{" "}
            <strong>วิ่งเส้นทางวนโดทงโบริ 20 นาทีในราคา ¥1,000 — ครึ่งหนึ่งของ Tombori</strong>{" "}
            ซึ่งเป็นคำตอบถ้าคุณจ่ายเงินสดและไม่ได้ถือบัตรพาส
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["เรือ", "ความยาวรอบ", "ราคา", "อยู่ในบัตรพาสโอซาก้า?", "ขายที่ไหน"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {boatRows.map((row) => (
                    <tr key={row.boat}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.boat}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.run}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตัวเลขของ Tombori มาจากเว็บไซต์ท่องเที่ยวทางการของโอซาก้าและรายการสถานที่ของผู้ให้บริการ
            บัตรพาส สองแถวของ Wonder Cruise มาจากหน้า WONDER CRUISE・PIRATES ของหน่วยงานท่องเที่ยว
            เดียวกัน และสามแถวสุดท้ายเป็นสิ่งที่หน้าสินค้า Klook แต่ละหน้าระบุไว้เอง ทั้งหมดอ่านเมื่อ{" "}
            {CHECKED} ราคาของ Klook เปลี่ยนตามวันที่ จึงไม่มีการอ้างราคาของ Klook ที่นี่ —
            เปิดหน้าสินค้าเพื่อดูราคาปัจจุบันและช่วงเวลายกเลิก ซึ่งกำหนดตามสินค้า ไม่ใช่ตามผู้ให้บริการ
            อาจเปลี่ยนแปลง
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={CITY_CRUISE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              City Cruise ที่นั่งเลานจ์ →
            </KlookLink>
            <KlookLink href={WONDER_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Osaka Wonder Cruise →
            </KlookLink>
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจองล่องเรือโดทงโบริ</h2>
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
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู Osaka Amazing Pass บน Klook →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ปราสาท จุดชมวิวอูเมดะ และล่องเรือในวันเดียว →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เรื่องบัตรพาส</span>
          <h2 className={styles.sectionTitle}>ล่องเรือโดทงโบริฟรีด้วย Osaka Amazing Pass ไหม?</h2>
          <p className={styles.bodyText}>
            <strong>ฟรี และฟรีทั้งวัน</strong> Tombori River Cruise เป็นหนึ่งในสถานที่เข้าฟรีกว่า 40
            แห่งของ Osaka Amazing Pass และ <strong>ไม่มีการตัดเวลาช่วงบ่าย</strong> —
            ซึ่งควรพูดให้ชัด เพราะ Umeda Sky Building บนพาสใบเดียวกันหยุดเข้าฟรีตั้งแต่ 15:00
            และเรือลำนี้ยังเป็นสถานที่เข้าฟรีของ Osaka e-Pass ด้วย
          </p>
          <p className={styles.bodyText}>
            สิ่งที่ติดคือคิว ไม่ใช่นาฬิกา บัตรพาสไม่ได้พาคุณขึ้นเรือ คุณต้องแลกที่เคาน์เตอร์ต้อนรับเป็นตั๋ว
            ที่พิมพ์เวลาออกเรือไว้ และผู้ให้บริการระบุว่า{" "}
            <strong>ขึ้นเรือได้เฉพาะเวลาที่อยู่บนตั๋ว</strong> คำแนะนำที่พวกเขาประกาศไว้คือเรือรอบเย็น
            เต็มเร็วและควรแลกตั๋วช่วงกลางวัน ในทางปฏิบัติคือเดินผ่านร้าน Don Quijote ตอนไปกินมื้อกลางวัน
            แล้วรับรอบ 19:30 ไว้เลย ดีกว่าไปถึง 19:20 แล้วพบว่าเรือฟรีลำถัดไปคือ 21:00
          </p>
          <p className={styles.bodyText}>
            ตัวเลขออกมาสบาย ๆ ด้วยบัตรหนึ่งวันราคา {PASS_1_DAY} ล่องเรือ (¥2,000) บวกหอหลักปราสาท
            โอซาก้า (¥1,200) เท่ากับค่าเข้า ¥3,200 ก่อนจะนับรถไฟใต้ดินแม้แต่เที่ยวเดียว และจุดชมวิว
            อูเมดะก่อน 15:00 เพิ่มอีก ¥2,000{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">คู่มือ Osaka Amazing Pass (ภาษาอังกฤษ)</Link>{" "}
            มีรายการสถานที่ทั้งหมด ราคาบัตรสองวัน และข้อยกเว้น และ{" "}
            <Link href="/guides/attractions/things-to-do-osaka">คู่มือเที่ยวโอซาก้า (ภาษาอังกฤษ)</Link>{" "}
            แจกแจงว่าส่วนไหนของวันในเมืองที่บัตรพาสจ่ายให้ และส่วนไหนไม่ เงื่อนไขอ่านเมื่อ {CHECKED}
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={FOOD_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์เดินกินโดทงโบริ 11:00–14:00 →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="ช่วงเวลาก่อนและหลังลงเรือ"
          intro="ยี่สิบนาทีบนผิวน้ำยังเหลือค่ำคืนอีกมาก และถนนรอบท่าเรือคือย่านที่ร้านอาหารหนาแน่นที่สุดในญี่ปุ่น รายการแรกคือทัวร์เดินช่วงกลางวัน รายการที่สองคือช่วงหลังมืด ราคาของ Klook เปลี่ยนตามวันที่ จึงควรเปิดหน้าสินค้าเพื่อดูราคาปัจจุบันและจุดนัดพบ"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/osaka-food-tour", title: "ทัวร์อาหารโอซาก้า (2026): ควรจองทัวร์ไหน เวลา และได้กินอะไร (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-2-day-itinerary", title: "เที่ยวโอซาก้า 2 วัน (2026): แผนรายวัน และสิ่งที่ต้องจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "Osaka Amazing Pass (2026): วันละ ¥2,500 คุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "เที่ยวโอซาก้า (2026): ที่ไหนบัตรพาสคุ้ม ที่ไหนไม่คุ้ม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/umeda-sky-building-tickets", title: "ตั๋ว Umeda Sky Building (2026): ราคา เวลาเปิด และช่วงเวลาที่ควรไป (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-castle-tickets", title: "ตั๋วปราสาทโอซาก้า (2026): ราคา เวลาเปิด และสิ่งที่บัตรพาสครอบคลุม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "ตั๋วพิพิธภัณฑ์สัตว์น้ำไคยูคัง (2026): ราคา เวลาเปิด และรอบเข้าชม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "ล่องเรืออ่าวโตเกียว (2026): ยากาตะบุเนะ vs Symphony เวลาและราคา (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-transportation", title: "การเดินทางในโอซาก้า (2026): รถไฟใต้ดิน รถไฟ และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "ราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น 2026: ราคาทางการและกฎการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "ที่เที่ยวอื่น ๆ ในญี่ปุ่น (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>สิ่งสำคัญคือการเลือกรอบเวลา ไม่ใช่แค่การซื้อตั๋ว</h2>
            <p className={styles.ctaBannerDesc}>
              ที่ ¥2,000 ค่าโดยสารเป็นส่วนเล็ก สิ่งที่หายากคือรอบช่วงเย็น และบัตรพาสที่ทำให้การนั่งเรือนี้
              ฟรี ก็ยังต้องแลกตั๋วที่เคาน์เตอร์ก่อนที่เรือกลางคืนจะเต็ม ควรดูเงื่อนไขการยกเลิกที่แสดง
              บนการจองของคุณเองก่อนจ่ายเงิน — กำหนดตามสินค้า ไม่ใช่ตามผู้ให้บริการ
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดู Osaka Amazing Pass บน Klook →
              </KlookLink>
              <KlookLink href={CITY_CRUISE_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                จองล่องเรือโดทงโบริ →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
