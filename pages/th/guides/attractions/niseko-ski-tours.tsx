import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  hokkaidoPrivateCarCharterNiseko,
  japanWinterStayAreas,
  jrHokkaidoRailPass,
  klookEsim,
  newChitoseAirportTransfers,
  nisekoHirafuEnglishSkiLesson,
  nisekoHirafuLiftPassBusTour,
  nisekoResortShuttleBus,
  nisekoRusutsuKiroroPrivateLesson,
  nisekoSkiHotSpringTourFromSapporo,
  nisekoSkiSnowboardRental,
  noboribetsuToyaNisekoDayTour,
  rhythmNisekoPrivateSkiLesson,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
} from "../../../../components/IntlChrome";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English guide (pages/guides/attractions/niseko-ski-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/niseko-ski-tours";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "เล่นสกีนิเซโกะ" }];

const OWN_ISO = "2026-11-01";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const LESSON_PEAK = "14 ธันวาคม 2026 ถึง 3 มกราคม 2027 และ 6 ถึง 12 กุมภาพันธ์ 2027";

const AIRPORT_BUS = "2.5 ชั่วโมง";
const AIRPORT_BUS_FARE = "¥6,000";
const AIRPORT_TRAIN = "3 ชั่วโมง";
const AIRPORT_TRAIN_FARE = "¥6,200";
const SEASON_OPEN = "28 พฤศจิกายน 2026";
const PEAK_FROM = "24 ธันวาคม 2026";
const PEAK_TO = "28 กุมภาพันธ์ 2027";
const PEAK_DAY = "¥13,500";
const REGULAR_DAY = "¥12,600";
const EARLY_DAY = "¥8,800";

const accessRows = [
  {
    option: "รถบัสตรงจากสนามบินชิโตเสะ",
    time: AIRPORT_BUS,
    cost: AIRPORT_BUS_FARE,
    booking: "ต้องจอง",
    note: `ตัวเลือกหลักสำหรับทริปแรก และเป็นแบบที่บรรทุกกระเป๋าสกีได้ ตัวเลขของ Niseko United เมื่อต้องจองจึงต้องตัดสินใจก่อนบิน ไม่มีแบบซื้อหน้างาน ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    option: "รถไฟและรถบัสท้องถิ่น",
    time: AIRPORT_TRAIN,
    cost: AIRPORT_TRAIN_FARE,
    booking: "ไม่ต้องจอง",
    note: "ช้ากว่ารถบัสครึ่งชั่วโมงและแพงกว่า ¥200 แต่เป็นทางเดียวที่ไปได้โดยไม่ต้องจอง เหตุผลที่ควรเลี่ยงคือกระเป๋า การเปลี่ยนรถพร้อมกระเป๋าสกีบนชานชาลาในฤดูหนาวคือส่วนที่คนส่วนใหญ่ไม่ได้คิดเผื่อ",
  },
  {
    option: "รถบัสสกีตามฤดูกาล",
    time: "3 ถึง 3.5 ชั่วโมง",
    cost: AIRPORT_BUS_FARE,
    booking: "ต้องจอง เฉพาะธันวาคมถึงมีนาคม",
    note: "ค่าโดยสารเท่ารถบัสตรง แต่นานกว่าถึงหนึ่งชั่วโมงเพราะแวะรีสอร์ตตามทาง เหมาะเฉพาะเมื่อที่พักอยู่บนเส้นทาง",
  },
  {
    option: "รถเช่า",
    time: "2 ชั่วโมง",
    cost: "เริ่ม ¥8,000 ต่อวัน",
    booking: "ต้องจอง",
    note: "เร็วที่สุดตามที่ประกาศไว้ แต่มีเงื่อนไข นี่คือถนนฤดูหนาวของฮอกไกโด ถ้าไม่เคยขับบนหิมะและน้ำแข็ง ตัวเลขสองชั่วโมงก็ไม่มีความหมาย",
  },
  {
    option: "รถรับส่งส่วนตัว",
    time: "2 ชั่วโมง",
    cost: "เริ่ม ¥25,000",
    booking: "ต้องจอง",
    note: "คิดต่อคันไม่ใช่ต่อคน จึงสมเหตุสมผลสำหรับครอบครัวหรือกลุ่มสี่คนขึ้นไป และเป็นทางเดียวที่ออกเดินทางตามเวลาที่เครื่องลงจอดจริง",
  },
];

const seasonRows = [
  { what: "เปิดครบสี่พื้นที่", detail: `${SEASON_OPEN}` },
  { what: "Grand HIRAFU และ Annupuri ปิด", detail: "5 พฤษภาคม 2027" },
  { what: "Hanazono ปิด", detail: "11 เมษายน 2027" },
  { what: "Niseko Village ปิด", detail: "4 เมษายน 2027" },
  { what: "สกีกลางคืน", detail: "12 ธันวาคม 2026 ถึง 22 มีนาคม 2027" },
  { what: "ต้นฤดู", detail: "28 พฤศจิกายน ถึง 11 ธันวาคม 2026 ช่วงนี้ไม่ขายบัตรลิฟต์ออนไลน์" },
  { what: "ฤดูปกติ", detail: "12 ถึง 23 ธันวาคม 2026 และ 1 ถึง 22 มีนาคม 2027" },
  { what: "ไฮซีซัน", detail: `${PEAK_FROM} ถึง ${PEAK_TO}` },
  { what: "ฤดูใบไม้ผลิ", detail: "23 มีนาคม ถึง 4 เมษายน 2027" },
  { what: "ท้ายฤดู", detail: "5 เมษายน ถึง 5 พฤษภาคม 2027" },
];

const passRows = [
  { period: "ต้นฤดู (28 พ.ย. – 11 ธ.ค. 2026)", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "ปกติ (12–23 ธ.ค. 2026, 1–22 มี.ค. 2027)", adult: REGULAR_DAY, youth: "¥10,700", child: "¥7,600", senior: "¥10,700" },
  { period: `ไฮซีซัน (${PEAK_FROM} – ${PEAK_TO})`, adult: PEAK_DAY, youth: "¥11,500", child: "¥8,100", senior: "¥11,500" },
  { period: "ใบไม้ผลิ (23 มี.ค. – 4 เม.ย. 2027)", adult: EARLY_DAY, youth: "¥7,500", child: "¥5,300", senior: "¥7,500" },
  { period: "ท้ายฤดู (5 เม.ย. – 5 พ.ค. 2027)", adult: "¥6,300", youth: "¥5,400", child: "¥3,800", senior: "¥5,400" },
];

const areaRows = [
  {
    area: "Grand HIRAFU",
    what: "ใหญ่ที่สุดในสี่พื้นที่และมีหมู่บ้าน ทั้งร้านอาหาร บาร์ ร้านเช่าอุปกรณ์ และโรงเรียนสกีของรีสอร์ต",
    stay: "ย่านที่พักหลัก และเป็นที่เดียวที่ออกไปตอนค่ำได้ด้วยการเดิน ไม่ต้องนั่งชัตเทิล",
    note: "ตัวเลขของ Grand Hirafu: 22 เส้นทาง (เริ่มต้น 9 กลาง 6 สูง 7) กระเช้า 2 แห่ง เก้าอี้ลิฟต์ 7 แห่ง ความสูงต่าง 940 ม. จากยอด 1,200 ม. ถึงฐาน 260 ม. เส้นทางยาวสุด 5,300 ม.",
  },
  {
    area: "Hanazono",
    what: "ด้านที่เงียบที่สุดของภูเขา และเป็นที่ตั้งของ Niseko International Snowsports School ของรีสอร์ต",
    stay: "เหมาะกับครอบครัวและผู้เริ่มต้น คนน้อยในเขตสำหรับผู้เริ่มต้น และคอร์สเรียนสกีเริ่มที่นี่",
    note: "กฎการจองคอร์สเรียนที่ประกาศไว้ก็อยู่ที่นี่ ช่วงไฮซีซันจองล่วงหน้าได้เฉพาะคอร์สเรียนเต็มวัน ควรอ่านก่อนวางแผนเรียนครึ่งวันช่วงคริสต์มาส",
  },
  {
    area: "Niseko Village",
    what: "ฝั่งโรงแรม ลิฟต์สกีอยู่หน้าที่พัก ไม่ต้องข้ามถนน",
    stay: "คุ้มสำหรับความสะดวกแบบ ski-in, ski-out และทริปที่ไม่ออกไปไหนตอนค่ำ",
    note: "ปิดเร็วที่สุดในสี่พื้นที่ คือ 4 เมษายน 2027 ก่อน Grand HIRAFU และ Annupuri หนึ่งเดือน ควรเช็กถ้าจองปลายฤดู",
  },
  {
    area: "Annupuri",
    what: "เส้นทางกว้างและชันน้อยที่สุดในสี่พื้นที่ อยู่ด้านตะวันตกสุด",
    stay: "ตัวเลือกเงียบ เหมาะกับระดับกลางที่อยากได้พื้นที่มากกว่าชีวิตกลางคืน",
    note: "เปิดเต็มฤดูถึง 5 พฤษภาคม 2027 พร้อม Grand HIRAFU จึงเหมาะกับทริปใบไม้ผลิหรือ Golden Week",
  },
];

const monthRows = [
  {
    month: "ธันวาคม",
    snow: "สะสม 386 ซม. ที่ Grand Hirafu ในฤดูล่าสุดที่จบแล้ว",
    crowds: "ลิฟต์เงียบก่อนวันหยุด ที่พักราคาก่อนไฮซีซัน",
    verdict: "Niseko United เรียกเดือนนี้ว่าเดือนของคนท้องถิ่น ช่วงต้นฤดูมีบัตรลิฟต์ราคาถูกที่สุดของหน้าหนาวที่ ¥8,800 แต่ไม่ขายออนไลน์ก่อน 12 ธันวาคม และราคาไฮซีซันเริ่มวันคริสต์มาสอีฟ",
  },
  {
    month: "มกราคม",
    snow: "สะสม 620 ซม. มีหิมะมากที่สุดของฤดู ทิ้งห่างเดือนอื่นชัดเจน",
    crowds: "คนเยอะ รีสอร์ตเองก็ใช้คำว่าแออัด",
    verdict: `"Japanuary" และ Niseko United ระบุว่าเป็น "หนึ่งในสถานที่ที่หิมะตกสม่ำเสมอที่สุดในโลก" แลกกับราคาไฮซีซันทั้งเดือน วันละ ${PEAK_DAY}`,
  },
  {
    month: "กุมภาพันธ์",
    snow: "สะสม 263 ซม. หิมะบนยอดลึกที่สุดของฤดูที่ 400 ซม.",
    crowds: "คนเยอะ และเยอะที่สุดช่วงตรุษจีน ร้านอาหารยอดนิยมเต็ม",
    verdict: "ผงหิมะยังดีและหมู่บ้านใต้หิมะถ่ายรูปสวยที่สุด ราคาไฮซีซันถึง 28 กุมภาพันธ์ และเป็นสัปดาห์ที่ซัปโปโรเต็มเพราะเทศกาลหิมะ",
  },
  {
    month: "มีนาคม",
    snow: "สะสม 75 ซม. แต่บนยอดยังมี 380 ซม.",
    crowds: "คนน้อยลงหลังสัปดาห์แรก",
    verdict: "เดือนคุ้มค่า รีสอร์ตเองก็ว่าอย่างนั้น ท้องฟ้าแจ่มใสขึ้น อากาศอุ่นขึ้น ส่วนลดฤดูใบไม้ผลิสำหรับคอร์สเรียนและเช่าอุปกรณ์ และ \"เดือนที่ดีที่สุดสำหรับสำรวจแบ็กคันทรี\" ราคาปกติถึง 22 มีนาคม จากนั้น ¥8,800",
  },
  {
    month: "เมษายนถึงต้นพฤษภาคม",
    snow: "หิมะบนยอดยังลึก 315 ซม. ในเมษายน และ 170 ซม. ในพฤษภาคม ตามตารางของรีสอร์ต",
    crowds: "เงียบนอกช่วง Golden Week",
    verdict: "สกีฤดูใบไม้ผลิด้วยบัตรลิฟต์ถูกที่สุดของปี ¥6,300 ต่อวันตั้งแต่ 5 เมษายน ช่วงนี้เปิดเฉพาะ Grand HIRAFU และ Annupuri ส่วน Niseko Village ปิด 4 เมษายน และ Hanazono ปิด 11 เมษายน",
  },
];

const faqItems = [
  {
    q: "เดินทางจากสนามบินชิโตเสะไปนิเซโกะอย่างไร?",
    a: `Niseko United ประกาศไว้ห้าทางเลือก และตัวเลือกหลักคือรถบัสตรง ${AIRPORT_BUS} ราคา ${AIRPORT_BUS_FARE} ต้องจอง ตามหน้าการเดินทางที่ตรวจสอบเมื่อ ${OWN} ทางอื่นจากแหล่งเดียวกัน: รถไฟและรถบัสท้องถิ่น ${AIRPORT_TRAIN} ราคา ${AIRPORT_TRAIN_FARE} ไม่ต้องจอง รถบัสสกีตามฤดูกาล 3–3.5 ชั่วโมง ${AIRPORT_BUS_FARE} เฉพาะธันวาคมถึงมีนาคม รถเช่า 2 ชั่วโมงเริ่ม ¥8,000 ต่อวัน และรถส่วนตัว 2 ชั่วโมงเริ่ม ¥25,000 คนส่วนใหญ่ตัดสินจากสองเรื่อง หนึ่งคือกระเป๋า รถบัสรับอุปกรณ์สกีกับกระเป๋าคนละใบ และการเปลี่ยนรถพร้อมกระเป๋าสกีบนชานชาลาฮอกไกโดในเดือนมกราคมคือส่วนที่คนส่วนใหญ่ไม่ได้คิดเผื่อ สองคือการจอง มีเพียงรถไฟและรถบัสที่ไปได้โดยไม่จอง ที่เหลือต้องตัดสินใจก่อนบิน ถ้าขับรถเอง สองชั่วโมงนั้นสมมติว่าคุณคุ้นกับหิมะและน้ำแข็ง`,
  },
  {
    q: "ช่วงไหนดีที่สุดสำหรับเล่นสกีที่นิเซโกะ?",
    a: `มกราคมสำหรับหิมะ มีนาคมสำหรับความคุ้มค่า ธันวาคมถ้าอยากได้ภูเขาเงียบ หิมะสะสมของ Grand Hirafu ในฤดูล่าสุดที่จบแล้ว วัดที่เส้นทาง Shirakaba ราว 850 ม. ตรวจสอบเมื่อ ${OWN} คือ ธันวาคม 386 ซม. มกราคม 620 ซม. กุมภาพันธ์ 263 ซม. มีนาคม 75 ซม. มกราคมจึงมีหิมะมากกว่าเดือนอื่นอย่างชัดเจน และ Niseko United เรียกว่า "หนึ่งในสถานที่ที่หิมะตกสม่ำเสมอที่สุดในโลก" สิ่งที่ต้องแลกคือคนเยอะและราคาไฮซีซัน ทั้งเดือนมกราคมอยู่ในช่วง ${PEAK_FROM} ถึง ${PEAK_TO} วันละ ${PEAK_DAY} กุมภาพันธ์ยังมีผงหิมะ เพิ่มคนช่วงตรุษจีน และหิมะบนยอดลึกที่สุดของฤดูที่ 400 ซม. มีนาคมคือเดือนที่รีสอร์ตขายความคุ้มค่า ฟ้าแจ่มใส อากาศอุ่น ส่วนลดคอร์สเรียนและเช่าอุปกรณ์ และ "เดือนที่ดีที่สุดสำหรับสำรวจแบ็กคันทรี" ยอดยังมี 380 ซม. และบัตรลิฟต์ลดเหลือ ${EARLY_DAY} ตั้งแต่ 23 มีนาคม ธันวาคมก่อนวันหยุดคือตัวเลือกของคนท้องถิ่น ลิฟต์เงียบ ราคาก่อนไฮซีซัน และบัตรลิฟต์ถูกที่สุดของหน้าหนาวที่ ${EARLY_DAY}`,
  },
  {
    q: "ต้องจองคอร์สเรียนสกีนิเซโกะล่วงหน้าไหม?",
    a: `ต้องจอง และเป็นกฎที่ประกาศไว้ ไม่ใช่แค่คำแนะนำ Niseko International Snowsports School ของรีสอร์ตระบุในหน้าของตนซึ่งตรวจสอบเมื่อ ${SEASON} ว่า "ในช่วงไฮซีซัน จองล่วงหน้าได้เฉพาะคอร์สเรียนเต็มวัน" และช่วงไฮซีซันของโรงเรียนคือ ${LESSON_PEAK} ซึ่งไม่ใช่ไฮซีซันของบัตรลิฟต์สกี คอร์สเรียนครึ่งวันปลายมกราคมยังจองได้ แต่วันที่ 20 ธันวาคมหรือ 8 กุมภาพันธ์ต้องไปถามหน้างาน หากช่วงนั้นคุณหรือลูกเรียนได้แค่ครึ่งวัน ให้จองเต็มวันแล้วเลิกเร็ว หรือย้ายวัน โรงเรียนเปิด 28 พฤศจิกายน 2026 ถึง 11 เมษายน 2027 ตามวันเบื้องต้น มีคอร์สเรียนกลุ่ม ส่วนตัว และปรับแต่งเต็มรูปแบบ และเปิดจอง 2026-27 แล้ว คอร์สเรียนส่วนตัวผ่านตัวแทนเป็นคนละโควตาและรับบัตรต่างประเทศ มีประโยชน์เมื่อโรงเรียนรีสอร์ตเต็ม`,
  },
  {
    q: "นิเซโกะเหมาะกับผู้เริ่มต้นไหม?",
    a: `เหมาะ มากกว่าที่ชื่อเสียงเรื่องผงหิมะบอก ตามตัวเลขของ Grand Hirafu ตรวจสอบเมื่อ ${OWN} 9 จาก 22 เส้นทางเป็นระดับเริ่มต้น (กลาง 6 สูง 7) และเขตกว้างชันน้อยที่สุดอยู่ที่ Annupuri ทางตะวันตก ข้อดีสองข้อ All Mountain Pass ทำให้เปลี่ยนไปเล่นลานอื่นได้เมื่อเก่งขึ้น และโรงเรียนสกีของรีสอร์ตอยู่ที่ Hanazono ด้านที่เงียบที่สุด คนเล่นเร็วบนเนินเรียนจึงน้อย ข้อเสียสองข้อ กฎการจองด้านบนคือปัญหาจริง ช่วงไฮซีซันของโรงเรียน ${LESSON_PEAK} จองล่วงหน้าได้เฉพาะเต็มวัน ซึ่งไม่สะดวกกับผู้เริ่มต้นที่อยากเริ่มครึ่งวัน และบัตรลิฟต์หนึ่งวันช่วงไฮซีซัน ${PEAK_DAY} ผู้เริ่มต้นเดือนมกราคมจึงจ่ายเท่าผู้เชี่ยวชาญ ธันวาคมหรือมีนาคมจึงน่าสนใจกว่า`,
  },
  {
    q: "ควรพักที่ไหนในนิเซโกะ?",
    a: `เลือก Grand HIRAFU หากไม่มีเหตุผลอื่น เป็นพื้นที่ใหญ่ที่สุดและมีหมู่บ้านแห่งเดียว ร้านอาหาร บาร์ ร้านเช่าอุปกรณ์ และค่ำคืนจึงเดินถึง ตัวเลขของที่นี่: 22 เส้นทาง กระเช้า 2 แห่ง เก้าอี้ลิฟต์ 7 แห่ง ความสูงต่าง 940 ม. จากยอด 1,200 ม. ถึงฐาน 260 ม. และเส้นทางยาวสุด 5,300 ม. อีกสามแห่งให้สิ่งเฉพาะ Hanazono เงียบที่สุดและมีโรงเรียนสกีของรีสอร์ต เหมาะกับครอบครัวและผู้เริ่มต้น Niseko Village เน้นโรงแรมและ ski-in, ski-out จริง เหมาะกับทริปที่ไม่ออกตอนค่ำ Annupuri กว้างชันน้อยและคนน้อยที่สุด มีเรื่องวันที่หนึ่งข้อที่คนมักพลาด คือสี่พื้นที่ไม่ปิดพร้อมกัน Niseko Village ปิด 4 เมษายน 2027 Hanazono ปิด 11 เมษายน ส่วน Grand HIRAFU และ Annupuri เปิดถึง 5 พฤษภาคม ปลายฤดูหรือ Golden Week จึงเปิดแค่สองแห่ง วันที่ทั้งหมดของ Niseko United ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    q: "บัตรลิฟต์สกีนิเซโกะราคาเท่าไร?",
    a: `All Mountain Pass หนึ่งวันครอบคลุมสี่พื้นที่ ผู้ใหญ่ช่วงไฮซีซัน ${PEAK_DAY} ฤดูปกติ ${REGULAR_DAY} ต้นฤดูหรือใบไม้ผลิ ${EARLY_DAY} และท้ายฤดู ¥6,300 ราคาของ Niseko United ตรวจสอบเมื่อ ${OWN} เด็กอายุ 4–12 ปี ไฮซีซัน ¥8,100 ปกติ ¥7,600 ต้นฤดูหรือใบไม้ผลิ ¥5,300 ท้ายฤดู ¥3,800 เยาวชน 13–15 ปีและผู้สูงอายุ 65 ปีขึ้นไปจ่ายเท่ากัน ไฮซีซัน ¥11,500 ปกติ ¥10,700 ต้นฤดูหรือใบไม้ผลิ ¥7,500 ท้ายฤดู ¥5,400 สิ่งที่ควรวางแผนคือช่วงเวลามากกว่าราคา ไฮซีซันคือ ${PEAK_FROM} ถึง ${PEAK_TO} ซึ่งกินคริสต์มาส ปีใหม่ ทั้งเดือนมกราคม และทั้งเดือนกุมภาพันธ์ อีกรายละเอียดคือบัตรลิฟต์ต้นฤดู 28 พฤศจิกายนถึง 11 ธันวาคม 2026 ไม่ขายออนไลน์ สัปดาห์ที่ถูกที่สุดจึงต้องซื้อที่เคาน์เตอร์`,
  },
  {
    q: "ต้องซื้อทัวร์ไปนิเซโกะ หรือไปเองได้?",
    a: `ขึ้นอยู่กับว่าคุณพักที่ไหน ซึ่งเป็นคำถามจริงที่อยู่เบื้องหลังคำค้นนี้ ถ้าพักนิเซโกะ ไม่ต้องใช้ทัวร์ จองรถบัสสนามบิน คอร์สเรียน อุปกรณ์ และบัตรลิฟต์ ที่เหลือจัดการตัวเอง ถ้าพักซัปโปโร ซึ่งหลายคนเลือกเพราะโรงแรมและร้านอาหารอยู่ในเมือง ทริปมีไกด์คือวิธีเดียวที่สมเหตุสมผล เพราะตัวเลขของ Niseko United ระบุ 2–3.5 ชั่วโมงต่อเที่ยวจากฝั่งสนามบิน การจัดเองจึงเสียกลางวันไปกับรถบัส ทริปลิฟต์และรถโค้ชจากซัปโปโรมีไว้เพื่อสิ่งนี้ คือหกชั่วโมงที่ Grand Hirafu พร้อมการเดินทางและบัตรลิฟต์ในการจองเดียว กรณีที่สามคือกลุ่มที่มีทั้งคนเล่นและไม่เล่น รถเช่าเหมาส่วนตัวเหมาะที่สุดเพราะคิดต่อคัน ไม่ใช่ต่อคนเล่น`,
  },
  {
    q: "ไปนิเซโกะวันเดียวจากซัปโปโรได้ไหม?",
    a: `ได้ ถ้าเป็นทริปที่จองไว้ ไม่ใช่จัดเฉพาะหน้า ข้อจำกัดคือระยะทาง หน้าการเดินทางของ Niseko United ระบุสนามบินชิโตเสะถึงนิเซโกะ ${AIRPORT_BUS} ด้วยรถบัสจอง และ ${AIRPORT_TRAIN} ด้วยรถไฟและรถบัส ซัปโปโรก็อยู่ฝั่งเดียวกัน ทริปจัดเองจึงเสียกลางวันไปกับการเดินทาง แพ็กเกจที่แก้ปัญหานี้รวมเวลาเล่นสกีที่กำหนดและรถโค้ชไว้ในราคาเดียว ปกติราวหกชั่วโมงที่ Grand Hirafu รวมบัตรลิฟต์ และรับหลายจุดกลางซัปโปโร เหมาะกับทริปในเมืองที่อยากได้วันสกีจริงหนึ่งวัน ถ้าต้องการเล่นสองวัน ต้องคำนวณใหม่ และทัวร์สองสามวันพร้อมที่พักก็สมเหตุสมผล ถ้าภูเขาปิดเพราะลม ซึ่งเกิดขึ้นบ่อยกับลิฟต์บน ทริปโนโบริเบ็ตสึและทะเลสาบโทยะคือตัวเลือกสำรอง`,
  },
  {
    q: "นิเซโกะมีสกีกลางคืนไหม?",
    a: `มี 12 ธันวาคม 2026 ถึง 22 มีนาคม 2027 ตามวันของ Niseko United ตรวจสอบเมื่อ ${OWN} เป็นเหตุผลจริงที่คนเลือกนิเซโกะแทนรีสอร์ตบนเกาะฮอนชู เส้นทางเปิดไฟยืดวันฤดูหนาวที่สั้นในละติจูดนี้ และดีที่สุดในสัปดาห์ที่หิมะหนักที่สุด ข้อควรระวังสองข้อ วันที่ไม่ครอบคลุมทั้งฤดู สองสัปดาห์แรกหลังเปิด ${SEASON_OPEN} ไม่มีสกีกลางคืน และช่วงใบไม้ผลิกับท้ายฤดูหลัง 22 มีนาคมก็ไม่มี ซึ่งสำคัญถ้าเลือกสัปดาห์ถูกในเมษายน และการเปิดกลางคืนขึ้นกับอากาศ ลิฟต์ด้านบนหยุดเพราะลม และในคืนที่มีพายุจะปิดไฟ ดูสถานะรายวันของรีสอร์ต ไม่ใช่คู่มือ รวมถึงหน้านี้`,
  },
  {
    q: "ทริปนิเซโกะควรกี่วัน?",
    a: `อย่างน้อยสามคืนถ้ามาเพื่อหิมะ เหตุผลคือการเดินทาง ไม่ใช่ภูเขา ตัวเลขของ Niseko United คือ ${AIRPORT_BUS} ต่อเที่ยวด้วยรถบัสจอง ทริปสองคืนจึงเสียเวลาในรถมาก และคืนเดียวไม่คุ้ม สามคืนได้สองวันเต็มบวกบ่ายวันมาถึงหรือเช้าวันกลับ พักห้าถึงเจ็ดคืนถึงจะคุ้มกับการมานิเซโกะ เพราะสิ่งที่มีชื่อคือผงหิมะที่ตกซ้ำสม่ำเสมอ ซึ่งเป็นเรื่องของสถิติ ไม่ใช่วันเดียว ตัวเลขมกราคม 620 ซม. ของ Grand Hirafu คือหลายเช้า ไม่ใช่เช้าเดียว ตรงกันข้าม ถ้าทริปส่วนใหญ่เป็นเมืองและอยากเล่นสกีวันเดียว อย่าย้ายที่พักมานิเซโกะ จองทริปมีไกด์จากซัปโปโรและเก็บโรงแรมในเมืองไว้`,
  },
];

const nisekoSameTrip: KlookTripPrepItem[] = [
  {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดู eSIM บน Klook →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "แผนแต่ละวันที่นิเซโกะขึ้นอยู่กับอากาศ ลิฟต์ด้านบนหยุดเพราะลม พื้นที่ปิดและเปิดใหม่ระหว่างพายุ และประกาศเหล่านี้แจ้งทางมือถือ ไม่ใช่ที่บอร์ดเชิงเขา",
  },
  {
    label: "รถชัตเทิลนิเซโกะ (สนามบินชิโตเสะและซัปโปโร)",
    ctaLabel: "ดูชัตเทิลนิเซโกะ →",
    url: klookFor(nisekoResortShuttleBus.url, LOCALE),
    why: "ตัวเลขของ Niseko United คือรถบัสตรงจากสนามบินชิโตเสะ 2.5 ชั่วโมง ¥6,000 เทียบกับ 3 ชั่วโมง ¥6,200 ด้วยรถไฟและรถบัส รายการนี้รับอุปกรณ์สกีกับกระเป๋าคนละใบ และให้เผื่อเวลา 45 นาทีหลังเที่ยวบินภายในประเทศลงจอด และ 90 นาทีหลังเที่ยวบินระหว่างประเทศลงจอด จึงควรจับคู่กับเที่ยวบิน",
  },
  {
    label: "JR Hokkaido Rail Pass",
    ctaLabel: "ดู JR Hokkaido Pass →",
    url: klookFor(jrHokkaidoRailPass.url, LOCALE),
    why: "จำเป็นเฉพาะเมื่อนิเซโกะเป็นส่วนหนึ่งของทริปยาวในฮอกไกโด เริ่ม ¥22,000 สำหรับห้าวันตามหน้าของ JR Hokkaido และไม่รวมรถโค้ช ทริปสนามบินถึงรีสอร์ตไปกลับจึงไม่ต้องใช้",
  },
  {
    label: "คอร์สเรียนสกีและสโนว์บอร์ดภาษาอังกฤษ Niseko Grand Hirafu (4 หรือ 6 ชั่วโมง)",
    ctaLabel: "ดูคอร์สเรียนนิเซโกะ →",
    url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
    why: `การจองที่มีกฎประกาศไว้ โรงเรียนสกีของรีสอร์ตรับจองล่วงหน้าเฉพาะเต็มวันในช่วงไฮซีซันของตน ${LESSON_PEAK} ครึ่งวันในสัปดาห์นั้นจึงต้องใช้ตัวแทนหรือไปถามหน้างาน`,
  },
  {
    label: "เช่าอุปกรณ์สกีและสโนว์บอร์ดนิเซโกะ (Rhythm, Hirafu)",
    ctaLabel: "ดูเช่าอุปกรณ์นิเซโกะ →",
    url: klookFor(nisekoSkiSnowboardRental.url, LOCALE),
    why: "จองอุปกรณ์ก่อนเดินทาง แล้วรับที่ Hirafu บริเวณฐานลิฟต์สกี ซึ่งทำให้ได้เล่นสกีตั้งแต่เช้าแรกแทนที่จะต่อคิวทั้งเช้า",
  },
  {
    label: "โรงแรมในนิเซโกะ",
    ctaLabel: "ดูโรงแรมนิเซโกะบน Klook →",
    url: klookFor(japanWinterStayAreas[7].url, LOCALE),
    why: "การจองที่กำหนดทุกอย่าง พื้นที่ที่คุณพักเป็นตัวกำหนดว่าลิฟต์อยู่ในระยะเดินหรือต้องนั่งชัตเทิล และ Niseko United ระบุเองว่าช่วงวันหยุดไฮซีซันเต็มเร็ว",
  },
];

const TITLE = "เล่นสกีนิเซโกะ 2027: รถรับส่งและคอร์สเรียน";
const DESC =
  "เล่นสกีนิเซโกะ: รถจากสนามบินชิโตเสะ 2.5 ชม. 4 พื้นที่ บัตรลิฟต์ไฮซีซัน ¥13,500 พร้อมวันที่ 2026-27";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function NisekoSkiToursPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>
อัปเดต {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
เล่นสกีที่นิเซโกะ:<br />การเดินทาง คอร์สเรียนสกี และ 4 พื้นที่สกี
</h1>
          <p className={styles.heroSubtitle}>
พื้นที่สกี 4 แห่งที่เชื่อมถึงกัน ห่างจากสนามบินชิโตเสะ {AIRPORT_BUS} ด้วยรถบัสที่ต้องจองล่วงหน้า และกำหนดเวลาที่ประกาศไว้แต่หลายคนพลาด คือกฎการจองคอร์สเรียนช่วงไฮซีซัน
</p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${monthLabel(updated.iso, LOCALE)}`, "วันที่ 2026-27 ทางการ", "ราคา All Mountain Pass", "กฎการจองคอร์สเรียนช่วงไฮซีซัน พร้อมแหล่งที่มา"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

        <WinterBookingTop
          heading={"ควรจองทริปสกีนิเซโกะอะไรสำหรับหน้าหนาว 2026-27?"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
สำหรับคริสต์มาสหรือปีใหม่ จองคอร์สเรียนและรถบัสสนามบินภายในวันที่ 28 พฤศจิกายน ซึ่งเป็นวันที่ลิฟต์สกีเปิด เพราะช่วงไฮซีซันของคอร์สเรียนเริ่ม 14 ธันวาคม และในช่วงนั้นจองล่วงหน้าได้เฉพาะเต็มวัน สำหรับมกราคมหรือกุมภาพันธ์ จองภายใน 31 ธันวาคม ก่อนช่วงไฮซีซันรอบที่สองของโรงเรียนสกีวันที่ 6 ถึง 12 กุมภาพันธ์
</>
          }
          tours={[
            {
              title: "ทริปสกี Niseko Grand Hirafu จากซัปโปโร (บัตรลิฟต์ 6 ชั่วโมง + รถบัส)",
              url: klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE),
              price: null,
              duration: "ไปกลับวันเดียว บัตรลิฟต์ 6 ชั่วโมง",
              departs: "10 จุดกลางซัปโปโร",
            },
            {
              title: "คอร์สเรียนสกีและสโนว์บอร์ดภาษาอังกฤษ Niseko Grand Hirafu (4 หรือ 6 ชั่วโมง)",
              url: klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE),
              price: null,
              duration: "4 หรือ 6 ชั่วโมง",
              departs: "Niseko Tokyu Grand Hirafu",
            },
            {
              title: "ทริปโนโบริเบ็ตสึ ทะเลสาบโทยะ และนิเซโกะจากซัปโปโร",
              url: klookFor(noboribetsuToyaNisekoDayTour.url, LOCALE),
              price: null,
              duration: "ประมาณ 10 ชั่วโมง",
              departs: "ซัปโปโร",
            },
          ]}
        />

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
คำตอบสั้น ๆ
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
จากสนามบินชิโตเสะ
</p>
                <p className={styles.verdictStatValue}>
รถบัสจอง {AIRPORT_BUS}
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
ฤดูกาล
</p>
                <p className={styles.verdictStatValue}>
28 พ.ย. 2026 – 5 พ.ค. 2027
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
บัตรลิฟต์สกี 1 วัน
</p>
                <p className={styles.verdictStatValue}>
ไฮซีซัน {PEAK_DAY} / ต้นฤดู {EARLY_DAY}
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
ต้องจองก่อนไหม?
</p>
                <p className={styles.verdictStatValue}>
คอร์สเรียนและรถรับส่ง ควรจอง
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
การวางแผน<strong>เล่นสกีที่นิเซโกะ</strong>เริ่มจากการเดินทาง เพราะใช้เวลานานที่สุด หน้าการเดินทางของ Niseko United ระบุ<strong>สนามบินชิโตเสะถึงนิเซโกะ {AIRPORT_BUS} ราคา {AIRPORT_BUS_FARE} ด้วยรถบัสตรงแบบจอง</strong> {AIRPORT_TRAIN} ราคา {AIRPORT_TRAIN_FARE} ด้วยรถไฟและรถบัสท้องถิ่นโดยไม่ต้องจอง หรือ 2 ชั่วโมงด้วยรถเช่าหรือรถส่วนตัว ปลายทางคือ<strong>พื้นที่สกี 4 แห่งที่ใช้บัตรใบเดียวกันได้</strong>: <strong>Grand HIRAFU</strong> (ใหญ่สุด มีหมู่บ้าน) <strong>Hanazono</strong> (เงียบสุด มีโรงเรียนสกีของรีสอร์ต) <strong>Niseko Village</strong> (โรงแรม ski-in, ski-out) และ <strong>Annupuri</strong> (กว้างและชันน้อยสุด) ทั้งสี่เปิด <strong>{SEASON_OPEN}</strong> ส่วน Grand HIRAFU และ Annupuri เปิดถึง <strong>5 พฤษภาคม 2027</strong> All Mountain Pass หนึ่งวัน <strong>{PEAK_DAY}</strong> ในช่วงไฮซีซัน <strong>{PEAK_FROM} ถึง {PEAK_TO}</strong> และ <strong>{EARLY_DAY}</strong> ต้นฤดูหรือใบไม้ผลิ สิ่งที่ต้องจองล่วงหน้า ไม่ใช่ซื้อหน้างาน คือ<strong>คอร์สเรียนสกี</strong> โรงเรียนสกีของรีสอร์ตระบุว่าในช่วงไฮซีซันของตน {LESSON_PEAK} จองล่วงหน้าได้เฉพาะเต็มวัน ตัวเลขทั้งหมดมาจากผู้ให้บริการ ตรวจสอบอีกครั้งเมื่อ {SEASON}
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
ทริปนิเซโกะจากซัปโปโร →
</KlookLink>
              <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
ชัตเทิลสนามบินไปนิเซโกะ →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"จองไปพร้อมกันในทริปนี้"}
          heading={"ทริปนิเซโกะต้องจองอะไรจริง ๆ"}
          intro={"เตรียมอินเทอร์เน็ตมือถือและจองรถบัสสนามบินก่อน เพราะรายการอื่นยังแก้ไขได้ในวันนั้น หน้าการเดินทางของ Niseko United แสดงส่วนต่าง รถบัสจอง 2.5 ชั่วโมง ส่วนรถไฟและรถบัสแบบไม่จอง 3 ชั่วโมง"}
          items={nisekoSameTrip}
        />

        <EsimCtaTop />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
การเดินทาง
</span>
          <h2 className={styles.sectionTitle}>
เดินทางจากสนามบินชิโตเสะไปนิเซโกะอย่างไร?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>{AIRPORT_BUS} ราคา {AIRPORT_BUS_FARE} ด้วยรถบัสตรงแบบจอง</strong> คือตัวเลือกของคนส่วนใหญ่ และเป็นตัวเลขของ Niseko United รีสอร์ตประกาศไว้ห้าทางเลือก ความต่างไม่ได้อยู่ที่ความเร็ว (2–3.5 ชั่วโมง) แต่อยู่ที่<strong>ต้องจองหรือไม่</strong> และ<strong>การขนกระเป๋าสกี</strong>
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ทางเลือก", "เวลา", "ค่าใช้จ่าย", "การจอง", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.booking}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
เวลาและค่าโดยสารในตารางทั้งหมดของ Niseko United จากหน้า “Getting to Niseko” ตรวจสอบอีกครั้งเมื่อ {SEASON} ส่วนหมายเหตุเป็นของเรา สิ่งหนึ่งที่ตารางบอกไม่ได้แต่หน้าสินค้าบอกได้ คือรถบัสคันนั้นรับอุปกรณ์สกีและกระเป๋าต่อคนเท่าไร รายการชัตเทิลรีสอร์ตระบุกระเป๋าหนึ่งใบกับอุปกรณ์ ซึ่งทำให้ต่างจากรถไฟ
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoResortShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
ชัตเทิลรีสอร์ตนิเซโกะ →
</KlookLink>
            <KlookLink href={klookFor(hokkaidoPrivateCarCharterNiseko.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
รถส่วนตัวไปนิเซโกะ →
</KlookLink>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
รถรับส่งสนามบินชิโตเสะ →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
ฤดูกาล
</span>
          <h2 className={styles.sectionTitle}>
นิเซโกะเปิดและปิดเมื่อไรในปี 2026-27?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
ทั้งสี่พื้นที่เปิด <strong>{SEASON_OPEN}</strong> แต่ไม่ปิดพร้อมกัน และ<strong>ช่วงราคา</strong>ทั้งห้าสำคัญต่อการจองมากกว่าวันเปิด เพราะช่วงไฮซีซันกินคริสต์มาส ปีใหม่ ทั้งเดือนมกราคม และทั้งเดือนกุมภาพันธ์
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `Niseko United, 2026-27 (ตรวจสอบเมื่อ ${SEASON})`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seasonRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
วันที่ทั้งหมดของ Niseko United ตรวจสอบเมื่อ {SEASON} รีสอร์ตระบุว่าวันปิดเป็นกำหนดการ และใบไม้ผลิของฮอกไกโดอาจทำให้เปลี่ยน รายละเอียดที่ควรตรวจสอบอีกครั้งก่อนจองปลายฤดู: <strong>Niseko Village ปิด 4 เมษายน และ Hanazono ปิด 11 เมษายน</strong> ส่วน Grand HIRAFU และ Annupuri เปิดถึง 5 พฤษภาคม
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
บัตรลิฟต์สกี
</span>
          <h2 className={styles.sectionTitle}>
บัตรลิฟต์สกีนิเซโกะราคาเท่าไร?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>All Mountain Pass</strong> หนึ่งวันครอบคลุมสี่พื้นที่ ผู้ใหญ่ตั้งแต่ <strong>{EARLY_DAY}</strong> ถึง <strong>{PEAK_DAY}</strong> ขึ้นกับว่าไปเมื่อไร เยาวชน 13–15 ปีและผู้สูงอายุ 65 ปีขึ้นไปจ่ายเท่ากัน ซึ่งไม่ค่อยเห็น
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ช่วง", "ผู้ใหญ่", "เยาวชน 13–15", "เด็ก 4–12", "ผู้สูงอายุ 65+"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.period}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.period}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.youth}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td className={styles.tdPrice}>{row.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>รายละเอียดหนึ่งที่เปลี่ยนแผน</strong> บัตรลิฟต์ต้นฤดูซึ่งเป็นสัปดาห์ที่ถูกที่สุดของหน้าหนาว 28 พฤศจิกายนถึง 11 ธันวาคม 2026 <strong>ไม่ขายออนไลน์</strong>ตามหมายเหตุของ Niseko United สกีที่ถูกที่สุดของฤดูจึงต้องซื้อที่เคาน์เตอร์เมื่อมาถึง จึงจองล่วงหน้าจากบ้านไม่ได้ บัตรลิฟต์หลายวันมีถึงเจ็ดวันและมีตั๋ว 50 ชั่วโมงเฉพาะออนไลน์ เราแสดงเฉพาะหนึ่งวันเพราะอ่านตารางของรีสอร์ตได้ครบ ตรวจสอบราคาทั้งหมดเมื่อ {SEASON}
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
ทริปพร้อมบัตรลิฟต์ Hirafu + รถบัส →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiSnowboardRental.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
จองเช่าอุปกรณ์นิเซโกะ →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
คอร์สเรียน
</span>
          <h2 className={styles.sectionTitle}>
ต้องจองคอร์สเรียนสกีนิเซโกะล่วงหน้าไหม?
</h2>
          <p className={styles.bodyText}>
<strong>ต้องจอง และเป็นกฎที่ประกาศไว้ ไม่ใช่แค่คำแนะนำ</strong> <strong>Niseko International Snowsports School</strong> ของรีสอร์ตระบุในหน้าของตนซึ่งตรวจสอบเมื่อ {SEASON}: <em>“ในช่วงไฮซีซัน จองล่วงหน้าได้เฉพาะคอร์สเรียนเต็มวัน”</em> ช่วงไฮซีซันของโรงเรียนคือ <strong>{LESSON_PEAK}</strong> ไม่ใช่ไฮซีซันของบัตรลิฟต์สกี {PEAK_FROM} ถึง {PEAK_TO} ดังนั้นในสัปดาห์คริสต์มาสและปีใหม่ และสัปดาห์ 6–12 กุมภาพันธ์ คอร์สเรียนครึ่งวันต้องไปถามหน้างาน ไม่ใช่จองล่วงหน้า
</p>
          <p className={styles.bodyText}>
สำหรับครอบครัวหรือผู้เริ่มต้น นี่คือประโยคที่มีประโยชน์ที่สุดในหน้านี้ เพราะกลับด้านกับแผนปกติ หากช่วงนั้นคุณหรือลูกเรียนได้แค่ครึ่งวัน มีสามทางเลือก จองเต็มวันแล้วเลิกตอนเที่ยง ย้ายไปสัปดาห์ปกติของโรงเรียน (8–13 ธันวาคม, 4 มกราคม–5 กุมภาพันธ์, 13–28 กุมภาพันธ์) หรือจองผ่านตัวแทน ซึ่งเป็นคนละโควตา ราคาเป็นสกุลเงินของคุณ และอ่านเป็นภาษาอังกฤษ โรงเรียนเปิด <strong>{SEASON_OPEN} ถึง 11 เมษายน 2027</strong> ตามวันเบื้องต้น มีคอร์สเรียนกลุ่ม ส่วนตัว และปรับแต่งเต็มรูปแบบ และเปิดจอง 2026-27 แล้ว
</p>
          <p className={styles.bodyText}>
ราคาคอร์สเรียนส่วนตัวของโรงเรียนคิดต่อกลุ่มไม่เกินหกคน ตามหน้าที่ตรวจสอบเมื่อ {SEASON}: Niseko Classic หกชั่วโมง ไฮซีซัน <strong>¥120,000</strong> ปกติ ¥93,000 ต้นฤดูและใบไม้ผลิ ¥87,000 คอร์สเรียนเช้า ¥93,000, ¥71,000 และ ¥59,000 คอร์สเรียนบ่าย ¥55,000, ¥43,000 และ ¥43,000 คอร์สเรียนกลุ่มมีราคาของตัวเอง และไม่เปิด 28 พฤศจิกายนถึง 7 ธันวาคม เปิดหน้าสินค้าเพื่อดูราคาตัวแทนตามวันของคุณ
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
คอร์สเรียนภาษาอังกฤษ Hirafu →
</KlookLink>
            <KlookLink href={klookFor(rhythmNisekoPrivateSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
คอร์สเรียนส่วนตัว Rhythm →
</KlookLink>
            <KlookLink href={klookFor(nisekoRusutsuKiroroPrivateLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
นิเซโกะ / รุสึทสึ / คิโรโระ →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
สี่พื้นที่
</span>
          <h2 className={styles.sectionTitle}>
ควรพักที่ไหนในนิเซโกะ?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>เลือก Grand HIRAFU หากไม่มีเหตุผลอื่น</strong> เป็นพื้นที่ใหญ่ที่สุดและมีหมู่บ้านแห่งเดียว มื้อเย็นจึงเดินถึง อีกสามแห่งให้สิ่งเฉพาะ และการตัดสินใจจริงอยู่ที่คอลัมน์สุดท้าย
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["พื้นที่", "คืออะไร", "ใครควรพักที่นี่", "สิ่งที่ควรรู้"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.stay}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
ชื่อพื้นที่และวันปิดของ Niseko United ตัวเลขเส้นทาง Grand HIRAFU ของ Grand Hirafu: 22 เส้นทาง (เริ่มต้น 9 กลาง 6 สูง 7) กระเช้า 2 แห่ง เก้าอี้ลิฟต์ 7 แห่ง ความสูงต่าง 940 ม. จากยอด 1,200 ม. ถึงฐาน 260 ม. 135 เฮกตาร์ เส้นทางยาวสุด 5,300 ม. และชันสุด 40° ตรวจสอบทั้งคู่เมื่อ {OWN} Niseko United ระบุว่าที่พักยอดนิยมและช่วงวันหยุดไฮซีซันเต็มเร็ว แต่ไม่เผยแพร่ว่าเร็วแค่ไหน ที่นี่จึงไม่ระบุเช่นกัน
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(japanWinterStayAreas[7].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
ดูโรงแรมนิเซโกะ →
</KlookLink>
            <KlookLink href={klookFor(nisekoSkiHotSpringTourFromSapporo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
2 หรือ 3 คืน จองครั้งเดียว →
</KlookLink>
          </div>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
เดือนไหน
</span>
          <h2 className={styles.sectionTitle}>
ช่วงไหนดีที่สุดสำหรับเล่นสกีที่นิเซโกะ?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>มกราคมสำหรับหิมะ มีนาคมสำหรับความคุ้มค่า ธันวาคมสำหรับภูเขาเงียบ</strong> คอลัมน์หิมะคือยอดสะสมรายเดือนของ Grand Hirafu ในฤดูล่าสุดที่จบแล้ว วัดที่เส้นทาง Shirakaba ราว 850 ม. คอลัมน์คนและข้อสรุปตามคำแนะนำรายเดือนและช่วงราคาของ Niseko United
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["เดือน", "หิมะ (ฤดูล่าสุด)", "คน", "ข้อสรุป"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthRows.map((row) => (
                    <tr key={row.month}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.month}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.snow}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.crowds}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
ตัวเลขหิมะเป็นของฤดูเดียว ไม่ใช่ค่าเฉลี่ย และเป็นการวัดของรีสอร์ตจุดเดียว ใช้ดูภาพรวมของฤดูหนาว ไม่ใช่พยากรณ์สำหรับทริปของคุณ ตรวจสอบทุกอย่างในตารางนี้เมื่อ {OWN} <strong>สกีกลางคืน</strong>มี 12 ธันวาคม 2026 ถึง 22 มีนาคม 2027 ทั้งสองสัปดาห์แรกและสัปดาห์ถูกในเมษายนจึงไม่มี
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
ทัวร์หรือไม่
</span>
          <h2 className={styles.sectionTitle}>
ต้องซื้อทัวร์ หรือไปนิเซโกะเองได้?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
ขึ้นอยู่กับว่าคุณพักที่ไหน ซึ่งเป็นคำถามจริงที่อยู่เบื้องหลังคำค้นว่า “เล่นสกีนิเซโกะ” สี่กรณี และต้องการการจองสี่แบบ
</p>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
พักนิเซโกะ? ไม่ต้องใช้ทัวร์
</p>
              <p className={styles.whoForDesc}>
จองรถบัสสนามบิน จองอุปกรณ์ จองคอร์สเรียนถ้าต้องการ ซื้อบัตรลิฟต์ ที่เหลือจัดการตัวเอง สี่พื้นที่เชื่อมกันและใช้บัตรลิฟต์ใบเดียว การจองที่มีกำหนดเวลาคือรถรับส่ง คอร์สเรียนช่วงไฮซีซัน และที่พัก
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
พักซัปโปโร? จองทริปหนึ่งวัน
</p>
              <p className={styles.whoForDesc}>
นี่คือกรณีจริงของทริปมีไกด์ ตัวเลขของ Niseko United คือ 2–3.5 ชั่วโมงต่อเที่ยว ทริปจัดเองจึงเสียกลางวันไปกับรถบัส แพ็กเกจบัตรลิฟต์สกีและรถโค้ชรวมเวลาเล่นที่ Grand Hirafu การเดินทาง และบัตรลิฟต์ไว้ในราคาเดียว
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
บางคนไม่เล่น? จองแบบต่อคัน
</p>
              <p className={styles.whoForDesc}>
กลุ่มที่มีทั้งคนเล่นและไม่เล่นจัดยากที่สุด และการคิดราคาต่อที่นั่งไม่เหมาะ รถเหมาส่วนตัวคิดต่อคัน จึงสมเหตุสมผลสำหรับสี่คนขึ้นไป
</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>
เช็กเงื่อนไขอากาศทุกกรณี
</p>
              <p className={styles.whoForDesc}>
ที่ภูเขานี้ ลิฟต์สกีด้านบนหยุดเพราะลมบ่อยจนต้องวางแผนเผื่อไว้ ไม่ใช่เรื่องโชคร้าย ก่อนจองให้อ่านว่าจะเกิดอะไรถ้าผู้ให้บริการยกเลิกหรือคุณยกเลิก หน้านี้บอกไม่ได้เพราะแยกตามรายการและวันที่
</p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
อีกสิ่งที่ต้องเตรียม: <strong>อินเทอร์เน็ตมือถือ</strong> แผนแต่ละวันที่นิเซโกะขึ้นอยู่กับอากาศมากกว่าทริปสกีอื่นในญี่ปุ่น ลิฟต์หยุดและเปิดใหม่ระหว่างพายุ พื้นที่ปิด รถรับส่งล่าช้า และทุกประกาศแจ้งทางมือถือ ไม่ใช่ที่บอร์ดเชิงเขา <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>ดู Klook eSIM →</KlookLink> <Link href="/th/guides/esim/best-esim-japan">คู่มือ eSIM ญี่ปุ่น</Link>เปรียบเทียบกับทางเลือกอื่น และ<Link href="/guides/money/japan-ski-travel-insurance" hrefLang="en">คู่มือประกันเล่นสกีในญี่ปุ่น (ภาษาอังกฤษ)</Link>พูดถึงอีกเรื่องที่ควรจัดการก่อนซื้อบัตรลิฟต์ คือกรมธรรม์ของคุณคุ้มครองกีฬาหิมะหรือไม่ และมีเงื่อนไขอะไร
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ส่วนที่เหลือของหน้าหนาว
</span>
          <h2 className={styles.sectionTitle}>
ควรจับคู่ทริปนิเซโกะกับอะไร?
</h2>
          <p className={styles.bodyText}>
ทริปเดือนกุมภาพันธ์ได้ทั้งเมืองและหิมะ <Link href="/th/guides/attractions/sapporo-snow-festival-tours">คู่มือเทศกาลหิมะซัปโปโร</Link>ครอบคลุมเทศกาล 8 วันในเมืองวันที่ 4–11 กุมภาพันธ์ 2027 และ<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">ทริปโอตารุจากซัปโปโร (ภาษาอังกฤษ)</Link>คือวันพักที่ง่ายที่สุดระหว่างทางกลับสนามบิน ถ้าหิมะเป็นแค่ส่วนหนึ่งของสัปดาห์ <Link href="/th/guides/attractions/hokkaido-7-day-itinerary">เที่ยวฮอกไกโด 7 วัน</Link>มีแบบสลับเป็นวันสกี และ<Link href="/th/guides/attractions/japan-winter-itinerary">แผนเที่ยวญี่ปุ่นหน้าหนาว</Link>จัดฮอกไกโดเป็นช่วงหนึ่งของทริปทั่วประเทศ
</p>
          <p className={styles.bodyText}>
ผ่านโตเกียว? ถ้ายังไม่เคยเล่นสกีและอยากลองก่อนตัดสินใจมาฮอกไกโด <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">เล่นสกีวันเดียวที่ GALA Yuzawa จากโตเกียว (ภาษาอังกฤษ)</Link>คือแบบที่ผูกมัดน้อย สำหรับคนในกลุ่มที่ไม่เล่นสกี <Link href="/th/guides/attractions/jigokudani-snow-monkey-tour">ทัวร์ลิงหิมะจิโกกุดานิ</Link>และ<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">ทัวร์ทาคายามะและชิราคาวาโกะ (ภาษาอังกฤษ)</Link>คือวันหิมะที่ไม่ต้องใช้สกี และคู่มือ<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">ไฟประดับโตเกียว (ภาษาอังกฤษ)</Link>ครอบคลุมค่ำก่อนหรือหลังเที่ยวบิน
</p>
        </section>

        <EsimCtaBottom />

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"ทริปนิเซโกะที่จองได้จริง"}
          intro={"สี่รูปแบบของทริปเดียวกัน: หกชั่วโมงที่ Grand Hirafu จากซัปโปโรพร้อมบัตรลิฟต์ สองหรือสามคืนพร้อมที่พัก รถส่วนตัวสำหรับกลุ่มที่ไม่ได้เล่นสกีทุกคน และทริปฮอกไกโดแบบไม่เล่นสกีสำหรับวันที่ลิฟต์ด้านบนหยุดเพราะลม"}
          tours={[withKlookLocale(nisekoHirafuLiftPassBusTour, LOCALE, { title: "ทริปสกี Niseko Grand Hirafu จากซัปโปโร (บัตรลิฟต์ 6 ชั่วโมง + รถบัส)", desc: "หกชั่วโมงที่ Grand Hirafu พร้อมรถโค้ชไปกลับจากกลางซัปโปโรและบัตรลิฟต์สกีในการจองเดียว รับหลายจุดในเมือง" }), withKlookLocale(nisekoSkiHotSpringTourFromSapporo, LOCALE, { title: "ทัวร์สกีและออนเซ็นนิเซโกะจากซัปโปโร (2 วัน 1 คืน / 3 วัน 2 คืน)", desc: "แบบหลายวันสำหรับผู้ที่ตัดสินใจกลางทริปว่านิเซโกะวันเดียวไม่พอ กลุ่มเล็ก พักวิลล่า ออกจากซัปโปโร" }), withKlookLocale(hokkaidoPrivateCarCharterNiseko, LOCALE, { title: "รถเหมาส่วนตัวฮอกไกโด (ซัปโปโร / สนามบินชิโตเสะ ถึงนิเซโกะ)", desc: "รถ 7 ถึง 14 ที่นั่งพร้อมคนขับ ระหว่างซัปโปโรหรือสนามบินกับนิเซโกะ รุสึทสึ ทะเลสาบโทยะ หรือฟุราโนะ ออกตามเวลาของคุณ ไม่ใช่ตารางเวลา" }), withKlookLocale(noboribetsuToyaNisekoDayTour, LOCALE, { title: "ทริปโนโบริเบ็ตสึ ทะเลสาบโทยะ และนิเซโกะจากซัปโปโร", desc: "หุบเขานรก ทะเลสาบโทยะ และฝั่งนิเซโกะในวันเดียวพร้อมไกด์ เป็นวันพักของสัปดาห์สกี และใช้ได้เมื่อภูเขาปิดเพราะลม" })]}
        />

                <Related items={[{ href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "เล่นสกีวันเดียวที่ GALA Yuzawa จากโตเกียว: 71 นาที ลิฟต์ ¥8,000 (ภาษาอังกฤษ)" }, { href: "/guides/money/best-travel-insurance-japan", title: "ประกันเดินทางญี่ปุ่น 2026: ใครต้องการอะไร (ภาษาอังกฤษ)" }, { href: "/guides/money/japan-ski-travel-insurance", title: "ประกันเล่นสกีในญี่ปุ่น: สิ่งที่กรมธรรม์ทั่วไปไม่คุ้มครอง (ภาษาอังกฤษ)" }, { href: "/th/guides/attractions/hokkaido-7-day-itinerary", title: "เที่ยวฮอกไกโด 7 วัน: แผนรายวัน" }, { href: "/th/guides/attractions/sapporo-snow-festival-tours", title: "เทศกาลหิมะซัปโปโร 2027: 4–11 ก.พ." }, { href: "/th/guides/attractions/japan-winter-itinerary", title: "เที่ยวญี่ปุ่นหน้าหนาว 2027: แผน 12 วัน" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "ทริปโอตารุวันเดียวจากซัปโปโร (2027): ¥800 JR 33 นาที (ภาษาอังกฤษ)" }, { href: "/th/guides/attractions/jigokudani-snow-monkey-tour", title: "ทัวร์ลิงหิมะจากโตเกียว: คู่มือจิโกกุดานิ (2027)" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "ทัวร์ทาคายามะและชิราคาวาโกะ (2027): ออกจากที่ไหนดี (ภาษาอังกฤษ)" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "ไฟประดับโตเกียว: วันที่ เวลา และงานฟรี (ภาษาอังกฤษ)" }, { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่นที่ดีที่สุด (2026): ผู้ให้บริการ ราคา และวิธีเลือก" }, { href: "/guides/attractions", title: "ดูสถานที่เที่ยวอื่นในญี่ปุ่น → (ภาษาอังกฤษ)" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
4 พื้นที่สกี บัตรใบเดียว และกำหนดเวลาเดียว
</h2>
            <p className={styles.ctaBannerDesc}>
ลิฟต์เปิด {SEASON_OPEN} และราคาไฮซีซันเริ่ม {PEAK_FROM} รถรับส่งและคอร์สเรียนคือสองการจองที่มีกำหนดเวลา ตั้งแต่ 14 ธันวาคมถึง 3 มกราคม และ 6 ถึง 12 กุมภาพันธ์ โรงเรียนของรีสอร์ตรับจองล่วงหน้าเฉพาะเต็มวัน
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(nisekoHirafuLiftPassBusTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
ดูทริปสกีนิเซโกะ →
</KlookLink>
              <KlookLink href={klookFor(nisekoHirafuEnglishSkiLesson.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
จองคอร์สเรียนสกีนิเซโกะ →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
