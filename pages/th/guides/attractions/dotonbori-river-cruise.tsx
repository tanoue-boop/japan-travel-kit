import Head from "next/head";
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
import {
  thDotonboriCityCruise,
  thDotonboriNaniwaBoat,
  thOsakaAmazingPass,
} from "../../../../lib/klook-links-th";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/attractions/dotonbori-river-cruise";
const TITLE = "ล่องเรือโดทงโบริ 2026: ราคาและเวลา";
const DESC =
  "ล่องเรือโดทงโบริ 2026: ผู้ใหญ่ ¥2,000 ราว 20 นาที ท่าทาซาเอมงบาชิ 11:00–21:00 ทุกครึ่งชั่วโมง";

// Every figure comes from the English guide, which read the fares, the schedule and
// the pass conditions off osaka-info.jp (Osaka Convention & Tourism Bureau), the
// Osaka Amazing Pass operator's own free-admission list and suito-osaka.jp on
// 1 November 2026. Nothing was re-checked or added for this edition.
const CHECKED = dateLabel("2026-11-01", "th");
// The pass price is owned by lib/attraction-prices.ts, shared with the English pages.
const PASS_1_DAY = PRICES.osakaAmazingPass.adult;

const fareRows = [
  { tier: "ผู้ใหญ่", price: "¥2,000", what: "ราคาที่เคาน์เตอร์ท่าทาซาเอมงบาชิ และเป็นตัวเลขที่ใช้วัดว่าบัตรพาสคุ้มไหม" },
  { tier: "นักเรียน (ม.ต้นขึ้นไป)", price: "¥1,000", what: "ครึ่งหนึ่งของผู้ใหญ่ — เป็นหนึ่งในไม่กี่ที่ในโอซาก้าที่มีราคานักเรียนแยก" },
  { tier: "เด็ก (ประถม)", price: "¥500", what: "หนึ่งในสี่ของผู้ใหญ่" },
  { tier: "เด็กก่อนวัยเรียน", price: "ฟรี", what: "ผู้ใหญ่ที่จ่ายเงินหนึ่งคนพาได้ฟรีหนึ่งคน คนที่สองจ่ายราคาเด็ก ¥500" },
  { tier: "ผู้ถือ Osaka Amazing Pass", price: "ฟรี", what: "รวมหนึ่งรอบ — แต่ต้องแลกเป็นตั๋วระบุเวลาที่เคาน์เตอร์ต้อนรับก่อน" },
  { tier: "ผู้ถือ Osaka e-Pass", price: "ฟรี", what: "หน้า e-Pass ของเมืองโอซาก้าก็ระบุว่าเป็นสถานที่เข้าฟรี" },
];

const scheduleRows = [
  { what: "รอบแรก", when: "11:00" },
  { what: "รอบสุดท้าย", when: "21:00" },
  { what: "ความถี่", when: "ทุก 30 นาที — ลงตัวและครึ่งชั่วโมง รวมวันละ 21 รอบ" },
  { what: "เวลาอยู่บนน้ำ", when: "ราว 20 นาที" },
  { what: "จุดลงเรือ", when: "ท่าทาซาเอมงบาชิ บนทางเดิน Tonbori River Walk (ฝั่งเหนือ) ห่างสะพานเอบิสึบาชิหนึ่งนาที" },
  { what: "เคาน์เตอร์ต้อนรับ", when: "ชั้น 1 ของร้าน Don Quijote โดทงโบริ ตรงข้ามท่าเรือพอดี" },
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
    run: "20 นาที วนช่วงโดทงโบริ",
    fare: "ผู้ใหญ่ ¥1,000／เด็ก ¥500",
    pass: "ไม่ใช่สถานที่ของบัตรพาส",
    sold: "ท่านิปปงบาชิ บูธขายตั๋วที่ร้าน WONDER PUB ข้าง ๆ",
  },
  {
    boat: "Wonder Cruise — เส้นทาง Osaka Cruise",
    run: "30–40 นาที เที่ยวเดียว นิปปงบาชิ↔ฮาจิเคนยาฮามะ",
    fare: "ผู้ใหญ่ ¥1,800／เด็ก ¥900",
    pass: "ไม่ใช่สถานที่ของบัตรพาส",
    sold: "บูธเดียวกัน — รอบจำกัด หน้าข้อมูลจึงแนะนำให้จองล่วงหน้า",
  },
  {
    boat: "เรือชมวิวนานิวะ",
    run: "30 นาที (ตามหน้าสินค้า Klook)",
    fare: "ดูราคาปัจจุบันที่หน้าสินค้า",
    pass: "ไม่ใช่สถานที่ของบัตรพาส",
    sold: "Klook ด้วยหน้าจอที่อ่านเข้าใจและบัตรต่างประเทศ",
  },
  {
    boat: "Dotonbori City Cruise",
    run: "20 นาที (ตามหน้าสินค้า Klook)",
    fare: "ดูราคาปัจจุบันที่หน้าสินค้า",
    pass: "ไม่ใช่สถานที่ของบัตรพาส",
    sold: "Klook — ที่นั่งแบบเลานจ์ นำเครื่องดื่มขึ้นเองได้ พาสัตว์เลี้ยงได้",
  },
];

const whoFor = [
  {
    title: "ไปหลังมืด ถ้า…",
    desc: "คุณอยากได้เวอร์ชันที่อยู่บนโพสต์การ์ด ป้ายกูลิโกะ นีออนบนหน้าร้านแถวเอบิสึบาชิ และแสงสะท้อนบนผิวน้ำ คือจุดขายของการล่องเรือนี้ และตอนบ่ายสองไม่มีอะไรในนั้นเลย รอบสุดท้ายคือ 21:00 ดังนั้นแม้ในกลางฤดูร้อนที่โอซาก้าพระอาทิตย์ตกหลัง 19:00 ก็ยังมีรอบกลางคืนเหลืออีกสี่รอบ",
  },
  {
    title: "ไปตอนกลางวัน ถ้า…",
    desc: `คุณถือบัตรพาสและอยากให้ทั้งวันลงตัว หรือมากับเด็ก รอบกลางวันคือรอบที่จับได้ง่ายกว่า — คำแนะนำของผู้ให้บริการบัตรพาสเองคือให้ไปแลกตั๋วช่วงกลางวัน เพราะเรือรอบเย็นเต็มก่อน — และ 20 นาทีตอน 13:00 ไม่มีค่าใช้จ่ายสำหรับผู้ถือพาส แถมแทรกไว้ระหว่างอีกสองจุดได้ คำแนะนำตามที่ประกาศไว้ วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    title: "เลือกเรือลำอื่น ถ้า…",
    desc: "คุณอยากได้ราคาถูกกว่า ที่นั่งแบบมีพนักพิง รอบที่นานกว่า หรือเครื่องดื่มในมือ เรือ Tombori คือลำที่รอบถี่ที่สุดและบัตรพาสครอบคลุม Wonder Cruise ออกจากท่านิปปงบาชิ 20 นาทีเท่ากันในราคาครึ่งเดียว ส่วนผู้ให้บริการรายอื่นขายรอบ 30 นาที เรือที่นั่งเลานจ์ที่นำเครื่องดื่มขึ้นเองได้ และเรือ DJ ที่แนบบัตรเข้าคลับมาด้วย แม่น้ำเดียวกัน แต่เป็นคืนที่ต่างกันมาก",
  },
];

const steps = [
  {
    title: "ตัดสินใจก่อนว่าคุณจะใช้บัตรพาสหรือไม่",
    desc: `นี่คือการตัดสินใจเดียวในหน้านี้ที่ขยับเงิน Tombori River Cruise เป็นสถานที่เข้าฟรีของ Osaka Amazing Pass ซึ่งบัตรหนึ่งวันราคา ${PASS_1_DAY} ดังนั้นถ้าแผนของคุณมีวันที่ใช้พาสอยู่แล้ว คุณไม่ต้องซื้อตั๋วเรือเลย ถ้าไม่มี ราคาที่เคาน์เตอร์คือผู้ใหญ่ ¥2,000 และ Wonder Cruise จากท่านิปปงบาชิอยู่ที่ ¥1,000 สำหรับเส้นทางโดทงโบริ 20 นาที ซึ่งเป็นตั๋วใบเดียวที่ถูกกว่าบนแม่น้ำสายนี้`,
  },
  {
    title: "ถ้าใช้บัตรพาส ให้แลกตั๋วตั้งแต่ช่วงต้นของวัน",
    desc: "บัตรพาสเพียงใบเดียวไม่พาคุณขึ้นเรือ คุณต้องแลกที่เคาน์เตอร์ต้อนรับเป็นตั๋วที่พิมพ์เวลาไว้ และผู้ให้บริการระบุว่าขึ้นเรือได้เฉพาะเวลาที่อยู่บนตั๋วนั้น คำเตือนของผู้ให้บริการบัตรพาสเองคือเรือรอบเย็นเต็มก่อน จึงควรแลกช่วงกลางวัน — เดินผ่านท่าเรือตอนไปทำอย่างอื่นแล้วจัดการรอบเวลาไปเลย",
  },
  {
    title: "ถ้าจ่ายเอง ให้ซื้อที่เคาน์เตอร์หรือออนไลน์ ไม่ใช่ทางโทรศัพท์",
    desc: "ตั๋วของวันนั้นขายที่ห้องขายตั๋วข้างท่าเรือ ซึ่งเปิดหนึ่งชั่วโมงก่อนรอบแรกของวัน ไม่มีการจองทางโทรศัพท์ การจองออนไลน์เปิดถึง 10 นาทีก่อนออกเรือและจ่ายล่วงหน้า เป็นเวอร์ชันที่ควรใช้ในเย็นวันศุกร์หรือเสาร์",
  },
  {
    title: "ท่าเรือหาง่ายกว่าที่ชื่อที่อยู่ทำให้คิด",
    desc: "ท่าทาซาเอมงบาชิอยู่บนทางเดิน Tonbori River Walk ฝั่งเหนือ และเคาน์เตอร์ต้อนรับอยู่ชั้นหนึ่งของร้าน Don Quijote โดทงโบริ — ตึกที่มีชิงช้าสวรรค์ติดอยู่ด้านข้าง เดินจากสถานีนัมบะ ชินไซบาชิ หรือนิปปงบาชิ 5 ถึง 10 นาที แต่ทั้งสามสถานีปล่อยคุณไว้ฝั่งตรงข้าม จึงต้องข้ามที่สะพานเอบิสึบาชิหรือทาซาเอมงบาชิ",
  },
  {
    title: "เผื่อไว้ราว 40 นาทีตั้งแต่ต้นจนจบ ไม่ใช่ 20 นาที",
    desc: "ล่องเรือคือ 20 นาที คิวที่เคาน์เตอร์ต้อนรับ การเดินลงไปที่ทุ่นลอย และการขึ้นเรือที่จุคนได้หลายสิบคน คืออีกครึ่งที่เหลือ ถ้าคุณจะแทรกมันไว้ระหว่างการจองร้านอาหารกับการแสดง ให้คิดเป็นบล็อก 40 นาที",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ล่องเรือโดทงโบริราคาเท่าไร?",
    a: `ผู้ใหญ่ ¥2,000 Tombori River Cruise ซึ่งเป็นเรือของผู้ให้บริการที่ออกจากท่าทาซาเอมงบาชิ อยู่ที่ผู้ใหญ่ ¥2,000 นักเรียนตั้งแต่ ม.ต้นขึ้นไป ¥1,000 และเด็กประถม ¥500 โดยผู้ใหญ่ที่จ่ายเงินหนึ่งคนพาเด็กก่อนวัยเรียนขึ้นฟรีได้หนึ่งคน ทั้งหน่วยงานท่องเที่ยวทางการของโอซาก้าและรายการสถานที่เข้าฟรีของผู้ให้บริการ Osaka Amazing Pass ประกาศตัวเลขสามตัวเดียวกันนี้ เรือลำนี้เข้าฟรีด้วย Osaka Amazing Pass และ Osaka e-Pass โดยทั้งสองกรณีต้องแลกบัตรพาสเป็นตั๋วระบุเวลาที่เคาน์เตอร์ต้อนรับก่อน เรือลำอื่นบนแม่น้ำสายนี้ตั้งราคาแยก — Wonder Cruise จากท่านิปปงบาชิอยู่ที่ ¥1,000 สำหรับเส้นทางโดทงโบริ 20 นาที และเรือที่ขายบน Klook ประกาศราคาไว้บนหน้าสินค้าของตัวเอง ทั้งหมดอ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "Tombori River Cruise ใช้เวลานานเท่าไร?",
    a: `อยู่บนน้ำราว 20 นาที วิ่งตามคลองโดทงโบริผ่านใจกลางย่านมินามิแล้วกลับ นับว่าสั้นสำหรับการล่องเรือ และเป็นความยาวที่พอดี เพราะช่วงแม่น้ำที่มันครอบคลุมมีแค่หน้าร้านนีออนไม่กี่ร้อยเมตร ถ้านานกว่านี้ก็แค่วนอีกรอบ เมื่อนับคิวที่เคาน์เตอร์ การเดินไปทุ่นลอย และการขึ้นเรือ ให้เผื่อใกล้ 40 นาทีตั้งแต่ต้นจนจบ ระยะเวลาตามที่เว็บไซต์ท่องเที่ยวทางการของโอซาก้าและพอร์ทัลล่องเรือ Aqua Metropolis Osaka ประกาศไว้ อ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "ล่องเรือโดทงโบริออกกี่โมง?",
    a: `ออกจาก 11:00 ถึง 21:00 ทุก 30 นาที — ลงตัวและครึ่งชั่วโมง รวมวันละ 21 รอบ ทุกวันยกเว้นวันที่ 13, 24 และ 25 กรกฎาคม 2026 ห้องขายตั๋วข้างท่าเรือเปิดหนึ่งชั่วโมงก่อนรอบแรก คือ 10:00 ตัวเลขที่สำคัญตอนวางแผนคือรอบสุดท้าย 21:00 เพราะดึกพอที่จะแทรกรอบกลางคืนไว้หลังมื้อเย็นได้ในทุกฤดู และทำให้รอบช่วงเย็นเป็นรอบที่หาได้ยากกว่ารอบกลางวัน ตารางอ่านเมื่อ ${CHECKED} และอาจเปลี่ยนตามสภาพแม่น้ำและการซ่อมบำรุงเรือ`,
  },
  {
    q: "เรือรอบสุดท้ายของล่องเรือโดทงโบริคือกี่โมง?",
    a: "21:00 ทุกวันที่เดินเรือ เพราะทุกรอบราคาเท่ากัน รอบสุดท้ายจึงเป็นวิธีที่ถูกที่สุดในการได้เห็นโดทงโบริเวอร์ชันที่ไฟติดครบ แต่มันก็อยู่ในช่วงที่ผู้ให้บริการบัตรพาสบอกว่าเต็มก่อน จึงเป็นรอบเดียวที่ควรล็อกไว้ล่วงหน้าแทนที่จะไปลุ้นหน้างาน ถ้าคุณใช้บัตรพาส ให้ไปแลกตั๋วรอบ 20:30 หรือ 21:00 ตอนกลางวัน ถ้าจ่ายเอง ระบบจองออนไลน์ของผู้ให้บริการเปิดถึง 10 นาทีก่อนออกเรือ",
  },
  {
    q: "ลงเรือล่องโดทงโบริที่ไหน?",
    a: "ที่ท่าทาซาเอมงบาชิ บนทางเดิน Tonbori River Walk ริมฝั่งเหนือของคลองโดทงโบริ ห่างสะพานเอบิสึบาชิไปทางตะวันออกราวหนึ่งนาที เคาน์เตอร์ต้อนรับอยู่ชั้นหนึ่งของร้าน Don Quijote โดทงโบริ ตรงข้ามท่าเรือพอดี ซึ่งเป็นแลนด์มาร์กที่ควรเล็งแทนตัวท่าเรือเอง เดินจากสถานีนัมบะ ชินไซบาชิ หรือนิปปงบาชิ 5 ถึง 10 นาที ทั้งสามสถานีปล่อยคุณไว้ฝั่งใต้ที่มีป้ายกูลิโกะ จึงต้องข้ามที่เอบิสึบาชิหรือทาซาเอมงบาชิเพื่อไปถึงเรือ และโปรดทราบว่า Wonder Cruise เป็นผู้ให้บริการอีกราย ลงเรือที่ท่านิปปงบาชิแทน จึงควรเช็กก่อนว่าตั๋วของคุณเป็นเรือลำไหนก่อนจะเดินไปที่ทุ่นลอย",
  },
  {
    q: "ล่องเรือโดทงโบริกับ Tombori River Cruise ต่างกันไหม?",
    a: `เป็นเรือลำเดียวกันที่มีสองชื่อ "Tombori River Cruise" (とんぼりリバークルーズ) เป็นชื่อสินค้าทางการ ดำเนินการโดย Ipponmatsu Kaiun และเป็นชื่อที่ปรากฏบนตั๋ว บนท่าเรือ และในรายการสถานที่เข้าฟรีของ Osaka Amazing Pass ส่วน "ล่องเรือโดทงโบริ" เป็นคำบรรยายที่นักท่องเที่ยวส่วนใหญ่ค้นหา และถูกใช้อย่างกว้าง ๆ กับเรือลำไหนก็ได้บนคลองนี้ รวมถึง Wonder Cruise จากท่านิปปงบาชิ และเรือที่ขายบน Klook ได้แก่ City Cruise เรือชมวิวนานิวะ และเรือ DJ TONBORIRAVE ซึ่งเป็นผู้ให้บริการต่างรายและราคาต่างกัน ถ้าบัตรพาสเป็นเหตุผลที่คุณจะขึ้นเรือ มีเพียงเรือ Tombori ลำเดียวที่พาสครอบคลุม ชื่อและผู้ให้บริการตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "มีเรือที่ถูกกว่า Tombori River Cruise ราคา ¥2,000 ไหม?",
    a: `มี ถ้าคุณไม่ได้ใช้บัตรพาส หน่วยงานท่องเที่ยวทางการของโอซาก้าระบุ Wonder Cruise เส้นทางโดทงโบริที่ผู้ใหญ่ ¥1,000 และเด็ก ¥500 สำหรับการวนช่วงเดียวกัน 20 นาที — ครึ่งราคาของ Tombori ในความยาวเท่ากัน — ลงเรือที่ท่านิปปงบาชิ บูธขายตั๋วอยู่ที่ร้าน WONDER PUB ข้าง ๆ ส่วนเส้นทาง Osaka Cruise ที่ยาวกว่า เป็นเที่ยวเดียว 30 ถึง 40 นาที ระหว่างนิปปงบาชิกับฮาจิเคนยาฮามะ ผู้ใหญ่ ¥1,800 และเด็ก ¥900 ข้อแลกเปลี่ยนคือแต่ละเส้นทางมีรอบจำกัด หน้าข้อมูลจึงแนะนำให้จองล่วงหน้า และไม่มีบัตรพาสโอซาก้าใบไหนครอบคลุมมัน ถ้าคุณถือ Osaka Amazing Pass อยู่ เรือ Tombori ฟรี การเปรียบเทียบนี้ก็ไม่เกิดขึ้น ราคาอ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "ล่องเรือโดทงโบริฟรีด้วย Osaka Amazing Pass ไหม?",
    a: `ฟรี และฟรีทั้งวัน Tombori River Cruise เป็นหนึ่งในสถานที่เข้าฟรีกว่า 40 แห่งของ Osaka Amazing Pass และไม่มีการตัดรอบช่วงบ่ายแบบที่ Umeda Sky Building มี และยังเป็นสถานที่เข้าฟรีของ Osaka e-Pass ด้วย เงื่อนไขเป็นเรื่องขั้นตอนไม่ใช่เรื่องเงิน คุณต้องแลกบัตรพาสที่เคาน์เตอร์ต้อนรับเป็นตั๋วที่พิมพ์เวลาออกเรือไว้ และผู้ให้บริการระบุว่าขึ้นเรือได้เฉพาะเวลาที่อยู่บนตั๋ว ผู้ให้บริการบัตรพาสยังเตือนว่าเรือรอบเย็นเต็มเร็วและแนะนำให้แลกช่วงกลางวัน ด้วยบัตรหนึ่งวันราคา ${PASS_1_DAY} แค่เรือ ¥2,000 บวกหอหลักปราสาทโอซาก้า ¥1,200 ก็เกือบคุ้มก่อนจะนับรถไฟใต้ดินแม้แต่เที่ยวเดียว เงื่อนไขอ่านเมื่อ ${CHECKED}`,
  },
  {
    q: "ต้องจองล่องเรือโดทงโบริล่วงหน้าไหม?",
    a: "ปกติไม่ต้อง แต่ตอนเย็นเป็นคำถามที่ต่างจากตอนบ่าย ตั๋วของวันนั้นขายที่ห้องขายตั๋วข้างท่าเรือซึ่งเปิดหนึ่งชั่วโมงก่อนรอบแรก และบ่ายวันธรรมดาเดินไปซื้อได้เลย ไม่มีการจองทางโทรศัพท์ สำหรับรอบเย็นวันศุกร์หรือเสาร์ ให้ใช้ระบบจองออนไลน์ของผู้ให้บริการ ซึ่งเปิดถึง 10 นาทีก่อนออกเรือและจ่ายล่วงหน้า หรือถ้าคุณใช้บัตรพาส ให้แลกตั๋วรอบเย็นตั้งแต่ช่วงกลางวัน เพราะคำแนะนำของผู้ให้บริการเองคือเรือกลางคืนไปก่อน",
  },
  {
    q: "ล่องเรือโดทงโบริกลางคืนหรือกลางวันดีกว่า?",
    a: "กลางคืน ถ้าคุณขึ้นเรือครั้งเดียว สิ่งที่คุณจ่ายเงินซื้อคือป้ายกูลิโกะ หน้าร้านนีออน และแสงบนผิวน้ำ ซึ่งทั้งหมดต้องการความมืด กลางวันมีเหตุผลสองข้อที่ฟังขึ้น และทั้งสองข้อเป็นเรื่องปฏิบัติ คือรอบจับได้ง่ายกว่า และผู้ถือบัตรพาสที่พยายามยัดสถานที่เข้าฟรีหลายแห่งไว้ในวันเดียว จะพบว่ารอบ 13:00 จัดง่ายกว่ารอบ 19:30",
  },
  {
    q: "ฝนตกยังเดินเรือไหม?",
    a: `ปกติยังเดิน แต่ควรพาเสื้อคลุมและหมวกไปด้วย เรือลำนี้ถูกระบุว่าไม่มีหลังคาบนพอร์ทัลล่องเรือ Aqua Metropolis Osaka อ่านเมื่อ ${CHECKED} ซึ่งเป็นสิ่งที่ทำให้มันลอดใต้สะพานเตี้ย ๆ ของโดทงโบริได้ เงื่อนไขการงดเดินเรือที่ประกาศไว้ไม่ใช่ฝนโดยตรง — รายการสถานที่ของผู้ให้บริการบัตรพาสระบุว่าบริการอาจถูกระงับเพราะสภาพแม่น้ำหรือการซ่อมบำรุงเรือ ให้มองว่าฝนหนักและระดับน้ำสูงเป็นความเสี่ยง ไม่ใช่ฝนปรอย`,
  },
  {
    q: "ควรเลือกเรือล่องโดทงโบริลำไหน?",
    a: "Tombori River Cruise ถ้าคุณถือบัตรพาสโอซาก้าหรืออยากได้ลำที่รอบถี่ที่สุด — ¥2,000, 20 นาที, ทุกครึ่งชั่วโมง และเป็นลำเดียวที่บัตรพาสครอบคลุม Wonder Cruise เส้นทางโดทงโบริ ถ้าคุณจ่ายเงินเองและอยากได้ 20 นาทีเท่ากันในราคา ¥1,000 โดยไม่ติดที่ต้องไปลงเรือที่ท่านิปปงบาชิ และไม่ติดที่ต้องจองล่วงหน้าเพราะรอบจำกัด เรือชมวิวนานิวะ ถ้าอยากได้รอบที่ยาวกว่าที่ 30 นาที Dotonbori City Cruise ถ้าคุณอยากได้ที่นั่งแบบเลานจ์และเครื่องดื่มของตัวเองบนเรือ หน้าสินค้ายังระบุว่าพาสัตว์เลี้ยงได้ ซึ่งหาไม่ค่อยได้ และเรือ TONBORIRAVE ถ้านี่คือการเริ่มค่ำคืนมากกว่าการเที่ยวชม เพราะเป็นเรือที่มี DJ และแนบบัตรเข้าคลับ Piccadilly ฟรีมาด้วย",
  },
  {
    q: "เหมาะกับเด็กไหม?",
    a: "เหมาะ และโครงสร้างราคาก็บอกเช่นนั้น เด็กประถม ¥500 เทียบกับผู้ใหญ่ ¥2,000 ยี่สิบนาทีสั้นพอที่จะดึงความสนใจเด็กเล็กไว้ได้ และไม่ต้องต่อคิวแบบจุดชมวิวหรือเครื่องเล่นในสวนสนุก สิ่งที่ควรวางแผนเผื่อคือเรือไม่มีหลังคา — แดดในเดือนสิงหาคมและลมในเดือนมกราคม — และตั๋วระบุเวลาหมายความว่าคุณต้องไปถึงก่อนเวลาที่พิมพ์บนตั๋ว ไม่ใช่ไปถึงเมื่อไรก็ได้",
  },
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
            ฟรีด้วย Osaka Amazing Pass ถ้าคุณไปแลกตั๋วก่อนที่เรือรอบเย็นจะเต็ม
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ ระบุวันที่", "เทียบห้าลำ"].map((t) => (
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
              เคาน์เตอร์ต้อนรับอยู่ชั้น 1 ของร้าน Don Quijote โดทงโบริ ตรงข้ามท่าเรือพอดี{" "}
              <strong>Osaka e-Pass</strong> ก็ครอบคลุมเช่นกัน และทั้งสองพาสไม่มีการตัดรอบช่วงบ่าย —
              แต่บัตรพาสไม่พาคุณขึ้นเรือ คุณต้องแลกที่เคาน์เตอร์ต้อนรับเป็นตั๋วที่พิมพ์เวลาออกเรือไว้
              และผู้ให้บริการบัตรพาสเตือนว่าเรือรอบเย็นเต็มก่อน ตั๋วของวันนั้นขายที่ท่าเรือตั้งแต่หนึ่ง
              ชั่วโมงก่อนรอบแรก (10:00) การจองออนไลน์ปิด 10 นาทีก่อนออกเรือ และไม่มีการจองทางโทรศัพท์
              ทั้งหมดอ่านเมื่อ {CHECKED}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={thOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดู Osaka Amazing Pass บน Klook →
              </KlookLink>
              <KlookLink href={thDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                จองล่องเรือโดทงโบริ →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ล่องเรือโดทงโบริคืออะไร</h2>
          <p className={styles.bodyText}>
            การนั่งเรือลำเตี้ยไม่มีหลังคาเป็นเวลา <strong>20 นาที ราคา ¥2,000</strong> ชื่อว่า{" "}
            <strong>Tombori River Cruise</strong> ดำเนินการโดย <strong>Ipponmatsu Kaiun</strong>{" "}
            ออกจาก <strong>ท่าทาซาเอมงบาชิ</strong> ทุกครึ่งชั่วโมงระหว่าง{" "}
            <strong>11:00 ถึง 21:00</strong> และ <strong>ฟรีด้วย Osaka Amazing Pass</strong>{" "}
            คำว่า &ldquo;ล่องเรือโดทงโบริ&rdquo; คือสิ่งที่นักท่องเที่ยวค้นหา แต่{" "}
            <strong>Tombori River Cruise</strong> คือชื่อบนตั๋ว บนป้ายท่าเรือ และในรายการสถานที่
            เข้าฟรีของผู้ให้บริการบัตรพาส จึงเป็นชื่อที่ควรมองหาเมื่ออยู่หน้างาน
          </p>
          <p className={styles.bodyText}>
            เส้นทางของมันคือผิวน้ำไม่กี่ร้อยเมตรที่ป้ายกูลิโกะ ฝูงคนบนสะพานเอบิสึบาชิ และปูกลไกตัวยักษ์
            หันหน้าเข้าหา โดยมีไกด์บนเรือบรรยายด้วยจังหวะเร็วแบบโอซาก้าที่เมืองนี้ขึ้นชื่อ
          </p>
          <p className={styles.bodyText}>
            เหตุผลที่คุ้มกับยี่สิบนาทีคือแนวสายตา โดทงโบริที่ระดับถนนคือความเบียดเสียด คุณยืนไหล่ชนไหล่
            บนสะพานเอบิสึบาชิเพื่อถ่ายป้ายที่ถอยหลังไม่ได้เลย จากผิวน้ำคุณอยู่ใต้ฝูงคนและมีแนวสายตา
            โล่งตรงไปที่หน้าร้าน ส่วนสะพานที่ผ่านเหนือหัวในระยะใกล้ก็อธิบายไปในตัวว่าทำไมเรือเหล่านี้
            ไม่มีหลังคา
          </p>
          <p className={styles.bodyText}>
            ที่นี่ไม่มีระบบระบุรอบที่ต้องแย่งกัน ไม่มีวันเปิดขาย และบ่ายวันธรรมดาไม่มีความเสี่ยงที่จะเต็ม
            สิ่งที่มีแทนคือ <strong>กฎการแลกตั๋วของผู้ถือบัตรพาส</strong> และช่วงเย็นที่เต็มก่อนทั้งวัน —
            และสองบรรทัดนี้คือตัวตัดสินว่าคนส่วนใหญ่ควรวางแผนอย่างไร
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ล่องเรือโดทงโบริราคาเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>ผู้ใหญ่ ¥2,000 นักเรียน ¥1,000 เด็ก ¥500</strong> หนึ่งราคาต่อหนึ่งช่วงอายุ
            และเท่ากันทุกรอบ — ไม่มีการบวกเพิ่มสำหรับรอบกลางคืน ซึ่งไม่ค่อยพบ และเป็นเหตุผลเงียบ ๆ
            ที่ทำให้มันคุ้ม:
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
            ผู้ให้บริการ Osaka Amazing Pass ซึ่งประกาศตัวเลขสามตัวเดียวกัน เว็บไซต์ของบริษัทเรือเองปิด
            ปรับปรุงในวันที่ตรวจสอบ ทุกตัวเลขในหน้านี้จึงมีสองแหล่งนั้นเป็นที่มา อาจเปลี่ยนแปลง —
            ควรยืนยันก่อนจ่ายเงิน
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เวลาและท่าเรือ</span>
          <h2 className={styles.sectionTitle}>ออกกี่โมง และลงเรือที่ไหน</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>จาก 11:00 ถึง 21:00 ทุก 30 นาที</strong> — ลงตัวและครึ่งชั่วโมง ทุกวันยกเว้นวันที่
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
            วันละ 21 รอบคือตัวเลขที่ใช้ได้จริง มันหมายความว่าการล่องเรือเป็นสิ่งที่คุณแทรกไว้ในค่ำคืน
            ไม่ใช่สิ่งที่ค่ำคืนต้องสร้างขึ้นรอบมัน และ <strong>รอบสุดท้าย 21:00</strong> ดึกพอที่ยัง
            ใช้ได้หลังมื้อเย็นในทุกฤดู ตารางอ่านเมื่อ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            การซื้อวันนั้นกับการจองล่วงหน้าไม่เท่ากัน และความต่างสำคัญเฉพาะหลังมืด{" "}
            <strong>วันนั้น</strong>: ห้องขายตั๋วข้างท่าเรือขายรอบถัดไปที่ยังมีที่ตั้งแต่ 10:00
            แต่คำที่ผู้ให้บริการบัตรพาสใช้ตรงไปตรงมา — เมื่อที่นั่งเต็มทั้งหมดก็ขึ้นเรือไม่ได้{" "}
            <strong>ล่วงหน้า</strong>: ระบบจองออนไลน์ของผู้ให้บริการจ่ายล่วงหน้าและเปิดถึง{" "}
            <strong>10 นาทีก่อนออกเรือ</strong> ซึ่งเป็นเวอร์ชันที่ควรใช้ในเย็นวันศุกร์หรือเสาร์
            การจองทางโทรศัพท์ไม่รับเลย
          </p>
          <p className={styles.bodyText}>
            เรื่องรอบไหนเต็มก่อน คำแนะนำเดียวที่ประกาศไว้มาจากผู้ให้บริการบัตรพาส และเจาะจง: ให้แลกตั๋ว{" "}
            <strong>ช่วงกลางวัน</strong> เพราะ <strong>เรือรอบเย็นเต็มเร็ว</strong> อ่านตามตัวอักษร
            นั่นทำให้รอบหลังมืด — ช่วง 19:00 ถึง 21:00 และยิ่งในวันหยุดสุดสัปดาห์ — เป็นรอบที่หายาก
            และบ่ายวันธรรมดาเป็นช่วงที่เดินไปขึ้นได้เลย เราไม่มีตัวเลขอัตราที่นั่งที่ประกาศไว้มากกว่านั้น
            จึงควรถือว่าอะไรที่เจาะจงกว่านี้เป็นการเดา ไม่ใช่ข้อมูล คำแนะนำอ่านเมื่อ {CHECKED}
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={thOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Osaka Amazing Pass — รวมล่องเรือ →
            </KlookLink>
            <KlookLink href={thDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              จองรอบล่องเรือล่วงหน้า →
            </KlookLink>
          </div>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>ควรไปตอนไหน</span>
          <h2 className={styles.sectionTitle}>กลางคืนหรือกลางวัน?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>กลางคืน ถ้าขึ้นครั้งเดียว</strong> — นีออนคือตัวสินค้า และราคาเท่ากันทุกรอบ
            วิวจึงเหมือนได้ฟรี แต่บัตรพาสเปลี่ยนคำตอบ เพราะรอบที่คุณจับได้จริงไม่ใช่รอบที่คุณอยากได้เสมอ:
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
            <KlookLink href={thDotonboriNaniwaBoat.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เรือชมวิว 30 นาที →
            </KlookLink>
            <KlookLink href={thDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              City Cruise ที่นั่งเลานจ์ →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกัน</span>
          <h2 className={styles.sectionTitle}>ควรเลือกเรือล่องโดทงโบริลำไหน</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            มีผู้ให้บริการหลายรายบนผิวน้ำช่วงนี้ และไม่ใช่สิ่งที่ใช้แทนกันได้ มีสองความไม่สมมาตรที่สำคัญ
            ข้อแรก <strong>มีเพียงเรือ Tombori ที่เป็นสถานที่ของบัตรพาส</strong> และ Klook ไม่ได้ขายมัน
            เป็นสินค้าเดี่ยว — ดังนั้นถ้าคุณถือบัตรพาสโอซาก้า เรือที่คุณต้องการคือลำที่จองที่เคาน์เตอร์
            ไม่ใช่บนมือถือ ข้อสอง คู่แข่งรายเดียวที่มีราคาทางการประกาศไว้ คือ{" "}
            <strong>Wonder Cruise</strong> จากท่านิปปงบาชิ{" "}
            <strong>วิ่งเส้นทางโดทงโบริ 20 นาทีเท่ากันในราคา ¥1,000 — ครึ่งหนึ่งของ Tombori</strong>{" "}
            ซึ่งเป็นคำตอบถ้าคุณจ่ายเงินเองและไม่ได้ถือบัตรพาส
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["เรือ", "ความยาวรอบ", "ราคา", "อยู่ในบัตรพาส?", "ขายที่ไหน"].map((h) => (
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
            {CHECKED} Klook บล็อกการอ่านราคาแบบอัตโนมัติ จึงไม่มีการอ้างราคาของ Klook ที่นี่ — เปิดหน้า
            สินค้าเพื่อดูยอดปัจจุบันและเงื่อนไขการยกเลิก ซึ่งกำหนดตามสินค้า ไม่ใช่ตามผู้ให้บริการ
            อาจเปลี่ยนแปลง
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ขั้นตอน</span>
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
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เรื่องบัตรพาส</span>
          <h2 className={styles.sectionTitle}>ฟรีด้วย Osaka Amazing Pass ไหม</h2>
          <p className={styles.bodyText}>
            <strong>ฟรี และฟรีทั้งวัน</strong> Tombori River Cruise เป็นหนึ่งในสถานที่เข้าฟรีกว่า 40
            แห่งของ Osaka Amazing Pass และ <strong>ไม่มีการตัดรอบช่วงบ่าย</strong> —
            ซึ่งควรพูดให้ชัด เพราะ Umeda Sky Building บนพาสใบเดียวกันหยุดเข้าฟรีตั้งแต่ 15:00
            และเรือลำนี้ยังเป็นสถานที่เข้าฟรีของ Osaka e-Pass ด้วย
          </p>
          <p className={styles.bodyText}>
            สิ่งที่ติดคือคิว ไม่ใช่นาฬิกา บัตรพาสไม่พาคุณขึ้นเรือ คุณต้องแลกที่เคาน์เตอร์ต้อนรับเป็นตั๋ว
            ที่พิมพ์เวลาออกเรือไว้ และผู้ให้บริการระบุว่า{" "}
            <strong>ขึ้นเรือได้เฉพาะเวลาที่อยู่บนตั๋ว</strong> คำแนะนำที่พวกเขาประกาศไว้คือเรือรอบเย็น
            เต็มเร็วและควรแลกตั๋วช่วงกลางวัน ในทางปฏิบัติคือเดินผ่านร้าน Don Quijote ตอนไปกินมื้อกลางวัน
            แล้วรับรอบ 19:30 ไว้เลย ดีกว่าไปถึง 19:20 แล้วพบว่าเรือฟรีลำถัดไปคือ 21:00
          </p>
          <p className={styles.bodyText}>
            เลขคำนวณออกมาสบาย ด้วยบัตรหนึ่งวันราคา {PASS_1_DAY} ล่องเรือ (¥2,000) บวกหอหลักปราสาท
            โอซาก้า (¥1,200) เท่ากับค่าเข้า ¥3,200 ก่อนจะนับรถไฟใต้ดินแม้แต่เที่ยวเดียว และจุดชมวิว
            อูเมดะก่อน 15:00 เพิ่มอีก ¥2,000 เงื่อนไขอ่านเมื่อ {CHECKED}
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={thOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
          </div>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/th/guides/attractions/usj-tickets-express-pass", title: "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน" },
            { href: "/th/guides/attractions/tokyo-skytree-tickets", title: "ตั๋ว Tokyo Skytree (2026): ราคา และเลือกชั้น 350 หรือ 450" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/th/guides/attractions/teamlab-borderless-tickets", title: "ตั๋ว teamLab Borderless (2026): ราคา รอบเวลา และช่องทางซื้อ" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จัดการรอบเวลา ไม่ใช่ตัวตั๋ว</h2>
            <p className={styles.ctaBannerDesc}>
              ที่ ¥2,000 ค่าโดยสารเป็นส่วนเล็ก สิ่งที่หายากคือรอบช่วงเย็น และบัตรพาสที่ทำให้การนั่งเรือนี้
              ฟรี ก็ยังต้องแลกตั๋วที่เคาน์เตอร์ก่อนที่เรือกลางคืนจะเต็ม ควรดูเงื่อนไขการยกเลิกที่แสดง
              บนการจองของคุณเองก่อนจ่ายเงิน — กำหนดตามสินค้า ไม่ใช่ตามผู้ให้บริการ
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={thOsakaAmazingPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดู Osaka Amazing Pass บน Klook →
              </KlookLink>
              <KlookLink href={thDotonboriCityCruise.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                จองล่องเรือโดทงโบริ →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
