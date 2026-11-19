import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  lakeShikotsuIceFestivalShuttleBus,
  newChitoseAirportTransfers,
  noboribetsuToyaOtaruDayTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowFestivalStayAreas,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  lakeShikotsuTomamuIceVillageDayTour,
} from "../../../../lib/klook-links-winter-hokkaido";
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

// Mirrors the English guide (pages/guides/attractions/sapporo-snow-festival-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/sapporo-snow-festival-tours";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "เทศกาลหิมะซัปโปโร" }];

const OWN_ISO = "2026-10-30";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const JMA_CHECKED = dateLabel("2026-10-28", LOCALE);

const FEB_MEAN = "−2.7°C";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 ซม.";
const AIRPORT_FARE = "¥1,230";
const SUBWAY_FARE = "¥210";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const SHUTTLE_FARE = "¥200";

const siteRows = [
  {
    site: "สถานที่จัดงานโอโดริ (大通会場)",
    where: "สวนโอโดริ นิชิ 1 ถึงนิชิ 11 รวม 11 บล็อกเรียงเป็นแนวตรง เริ่มจากฐานหอโทรทัศน์ซัปโปโร",
    when: "ชมได้ตลอดเวลาในช่วงเทศกาล ประติมากรรมเปิดไฟถึง 22:00",
    cost: "ฟรี",
    what: "ประติมากรรมหิมะขนาดใหญ่ การประกวดของชาวเมือง และร้านอาหาร สถานที่จัดงานแห่งนี้คือภาพที่คนนึกถึงเมื่อพูดถึงเทศกาลหิมะ",
  },
  {
    site: "สถานที่จัดงานซูซูกิโนะ (すすきの会場)",
    where: "ถนนเอคิมาเอะ-โดริ ระหว่างมินามิ 4 ถึงมินามิ 6 ถนนหลักในย่านกลางคืน",
    when: "ชมได้ตลอดเวลา เปิดไฟถึง 23:00 และถึง 22:00 ในวันสุดท้าย",
    cost: "ฟรี",
    what: "มีประติมากรรมน้ำแข็งจัดแสดงตามถนนที่เรียงรายไปด้วยบาร์ เปิดดึกที่สุดในสามสถานที่จัดงาน เดินจากโอโดริไม่ไกล หรือนั่งรถไฟใต้ดินหนึ่งสถานี",
  },
  {
    site: "สถานที่จัดงานสึโดมุ (つどーむ会場)",
    where: "ศูนย์กีฬาของเมืองซัปโปโร สึโดมุ (つどーむ) ปลายด้านตะวันออกเฉียงเหนือของรถไฟใต้ดินสายโทโฮ",
    when: "เฉพาะ 10:00–16:00 ช่วงคนเยอะอาจปิดรับกิจกรรมเร็วกว่านั้น",
    cost: "เข้าฟรี บางกิจกรรมด้านในเสียเงิน",
    what: "สไลเดอร์หิมะ ล่องแพหิมะ และกิจกรรมหิมะที่ผู้เข้าชมร่วมเล่นได้ เป็นสถานที่จัดงานสำหรับครอบครัว และเป็นสถานที่จัดงานแห่งเดียวที่มีเวลาปิดทำการ ไม่ใช่เวลาปิดไฟ",
  },
];

const tourRows = [
  {
    tour: "ทริปโอตารุ ชิโรอิ โคอิบิโตะ พาร์ก และสวนหิมะ",
    adds: "เมืองริมคลองทางตะวันตก ใช้เวลา 33–41 นาทีด้วย Rapid Airport นาฬิกาไอน้ำ และจุดเล่นหิมะ จองรวมในวันเดียว",
    fits: "ทริปเต็มวัน ควรกลับมาชมเทศกาลในช่วงค่ำ ไม่ใช่ต่อด้วยทริปอื่น",
    note: "โอตารุมีงาน Snow Light Path ของตัวเองวันที่ 6–13 กุมภาพันธ์ 2027 จึงเหมาะไปในสัปดาห์เทศกาลมากกว่าเดือนธันวาคม",
  },
  {
    tour: "ทริปสวนสัตว์อาซาฮิยามะ บ่อน้ำสีฟ้าแห่งบิเอะ (Biei Blue Pond) และนิงเกิลเทอเรซ (Ningle Terrace)",
    adds: "สวนสัตว์อาซาฮิยามะในช่วงที่มีกิจกรรมเพนกวินเดินพาเหรด พร้อมบิเอะ และตัวเลือกสโนว์โมบิลฤดูหนาวโดยจ่ายเพิ่ม",
    fits: "ทริปเต็มวัน ไปไกลจากซัปโปโรที่สุดในรายการนี้",
    note: "การเดินเพนกวินต้องมีเส้นทางหิมะ และยังไม่ประกาศวันเริ่ม 2026-27 แต่กุมภาพันธ์อยู่ในช่วงปลายธันวาคมถึงกลางมีนาคมที่สวนสัตว์ระบุ",
  },
  {
    tour: "เทศกาลน้ำแข็งทะเลสาบชิโกะสึ แบบครึ่งวัน รถรับส่ง หรือทริปโทมามุ",
    adds: "งานน้ำแข็งเดือนกุมภาพันธ์อีกงานในฝั่งนี้ของฮอกไกโด 30 มกราคมถึง 23 กุมภาพันธ์ 2027 เปิดไฟ 16:30–20:00",
    fits: "ครึ่งวันหรือช่วงเย็น เหมาะกับวันเทศกาลที่มีบ่ายว่าง",
    note: "ขายสามแบบ: ทัวร์มีไกด์ครึ่งวัน รถบัสไปกลับ และทริป 10 ชั่วโมงพร้อม Tomamu Ice Village ค่าเข้าวันธรรมดา ¥1,000 สุดสัปดาห์และวันหยุด ¥3,000 รายการโทมามุระบุว่าไม่รวมค่าเข้า ส่วนรายการอื่นโปรดตรวจสอบ",
  },
  {
    tour: "โจซังเค: ทริปออนเซ็น หรือทริป Hill of the Buddha",
    adds: "เมืองออนเซ็นในหุบเขาทางใต้ของเมืองไม่ถึงหนึ่งชั่วโมง หรือทริปเดียวกันที่เพิ่ม Hill of the Buddha ของ Tadao Ando และชิโรอิ โคอิบิโตะ พาร์ก",
    fits: "ครึ่งวันหรือเต็มวัน แล้วแต่รายการ",
    note: "ตัวเลือกที่ดีที่สุดสำหรับปัญหาจริงของทริปเทศกาล คือการหาช่วงพักในร่ม เพราะสถานที่จัดงานทั้งหมดอยู่กลางแจ้ง และคุณจะอยากอยู่ในร่มช่วงกลางวัน",
  },
  {
    tour: "Wonderland Sapporo สวนหิมะครึ่งวัน",
    adds: "สวนหิมะนอกเมือง มีรถรับจากโรงแรมและบาร์บีคิวเจงกิสข่าน",
    fits: "ครึ่งวัน",
    note: "ทัวร์นี้เหมาะกับผู้ที่ไม่มีอุปกรณ์สกีของตัวเอง ซึ่งก็คือคนส่วนใหญ่ในทริปเทศกาล",
  },
  {
    tour: "ทริปโนโบริเบ็ตสึ ทะเลสาบโทยะ และโอตารุ",
    adds: "เส้นทางชมวิวลงใต้และไปตะวันตก หุบเขาออนเซ็น ทะเลสาบปล่องภูเขาไฟ และเมืองคลองในวันเดียว",
    fits: "ทริปเต็มวันแบบยาว สำหรับทริปที่มีวันเหลือ",
    note: "คุ้มเมื่อเที่ยวสี่วันขึ้นไป ถ้ามีสามวันจะเสียค่ำของเทศกาลไปหนึ่งคืน",
  },
];

const transportRows = [
  {
    leg: "สนามบินนิวชิโตเสะ → ซัปโปโร รถไฟ Rapid Airport",
    time: "Special Rapid เร็วสุด 33 นาที Rapid 37 นาที",
    fare: `ผู้ใหญ่ ${AIRPORT_FARE} ที่นั่งจอง U-Seat เพิ่ม ¥1,000 หรือ ¥800 แบบไม่ใช้ตั๋ว`,
    note: `JR Hokkaido วิ่งชั่วโมงละหกเที่ยวช่วงกลางวัน: Special Rapid หนึ่ง Rapid สาม และ Section Rapid สอง ตรวจสอบเมื่อ ${OWN}`,
  },
  {
    leg: "สนามบินนิวชิโตเสะ → ซัปโปโร รถรับส่งแบบจอง",
    time: "ทางถนน จึงขึ้นกับสภาพอากาศในเดือนกุมภาพันธ์",
    fare: "ตามรถและวันที่ ราคาของ Klook เปลี่ยนตามวันที่ โปรดเปิดหน้าสินค้า",
    note: "หน้ารถรับส่งสนามบินนิวชิโตเสะของ Klook เงื่อนไขแยกตามรถ จึงควรจองก่อนบิน",
  },
  {
    leg: "สถานีซัปโปโร → โอโดริ",
    time: "รถไฟใต้ดินหนึ่งสถานี หรือเดินประมาณ 10 นาที ส่วนใหญ่ใต้ดิน",
    fare: `ผู้ใหญ่ ${SUBWAY_FARE} เด็ก ¥110 ต่อหนึ่งโซน`,
    note: `ทางเดินใต้ดินระหว่างสองสถานีทำให้พักสถานีซัปโปโรได้สะดวกในเดือนกุมภาพันธ์ ตรวจสอบค่าโดยสารเมื่อ ${OWN}`,
  },
  {
    leg: "โอโดริ → ซูซูกิโนะ",
    time: "นั่งรถไฟใต้ดินสายนัมโบกุหนึ่งสถานี หรือเดินไม่กี่บล็อก",
    fare: `ผู้ใหญ่ ${SUBWAY_FARE}`,
    note: "สองสถานที่จัดงานอยู่ใกล้กันจนคนส่วนใหญ่เดิน และไฟซูซูกิโนะเปิดนานกว่าโอโดริหนึ่งชั่วโมง",
  },
  {
    leg: "ซัปโปโร → สถานที่จัดงานสึโดมุ",
    time: "รถไฟใต้ดินสายโทโฮถึงซากาเอะมาจิ แล้วต่อรถชัตเทิล",
    fare: `ปี 2026 ชัตเทิลผู้ใหญ่เที่ยวเดียว ${SHUTTLE_FARE} เงินสดเท่านั้น ฟรีสำหรับเด็กประถมลงมา อายุเกิน 65 ปี และผู้พิการ`,
    note: "เป็นการจัดการปี 2026 จากประกาศของคณะกรรมการ ยังไม่ประกาศชัตเทิลปี 2027 ไม่มีส่วนลดเมื่อเปลี่ยนจากรถไฟใต้ดินมาขึ้นรถชัตเทิล และสถานที่จัดงานปิด 16:00",
  },
  {
    leg: "ตั๋วรถไฟใต้ดินรายวัน",
    time: "หนึ่งวันตามปฏิทิน",
    fare: `วันธรรมดาผู้ใหญ่ ${SUBWAY_DAY_PASS} เด็ก ¥420 สุดสัปดาห์ วันหยุด และ 29 ธันวาคมถึง 3 มกราคม ${DONICHIKA} และ ¥260`,
    note: `ราคาทางการของสำนักงานขนส่งเมืองซัปโปโร ตรวจสอบเมื่อ ${OWN} เทียบกับหนึ่งโซน ${SUBWAY_FARE} ตั๋ววันหยุดคุ้มตั้งแต่สามเที่ยว ตั๋ววันธรรมดาคุ้มตั้งแต่สี่เที่ยว`,
  },
];

const bookingWindow = [
  {
    title: "ตอนนี้เลย ถ้าทริปคือกุมภาพันธ์ 2027: ที่พัก",
    desc: "กำหนดการประกาศตั้งแต่ 11 กุมภาพันธ์ 2026 เมื่อคณะกรรมการประกาศในแถลงการณ์ปิดเทศกาลครั้งที่ 76 เมื่อทราบกำหนดการ 8 คืนล่วงหน้าหนึ่งปี ทุกคนจึงจองที่พักเร็ว ที่นี่ไม่แสดงอัตราการเข้าพักเพราะไม่มีการเปิดเผยตัวเลข แต่นี่คือส่วนเดียวของทริปที่ไม่มีตัวเลือกสำรอง",
  },
  {
    title: "ก่อนบิน: การเดินทางจากสนามบินและพาสรถไฟฮอกไกโด",
    desc: "รถไฟ ¥1,230 ไม่ต้องจอง รถรับส่งทางถนนคือสิ่งที่ควรจองก่อนบิน พาสรถไฟคุ้มเฉพาะเมื่อออกนอกเมืองไปโอตารุ อาซาฮิคาวะ หรือโนโบริเบ็ตสึ และควรเทียบ Sapporo–Furano Area Pass 4 วันราคา ¥11,000 กับตั๋วเดี่ยวก่อน",
  },
  {
    title: "ภายใน 31 ธันวาคม: ทริปตามฤดูกาล",
    desc: "ทริปครึ่งวันเทศกาลน้ำแข็งชิโกะสึและสวนหิมะเป็นรายการตามฤดูกาล ส่วนทริปสวนสัตว์อาซาฮิยามะขึ้นกับฤดูเพนกวิน ทั้งหมดมีในสัปดาห์เดียวกับเทศกาล จึงควรจองไว้ก่อนถึงญี่ปุ่นและเช็กเงื่อนไขการยกเลิกขณะที่ยังเปลี่ยนแผนได้",
  },
  {
    title: "ไม่ต้องจองเลย: ตัวเทศกาล",
    desc: "ตาม FAQ ของคณะกรรมการ ทั้งสามสถานที่จัดงานเข้าชมฟรี โอโดริและซูซูกิโนะเป็นสวนและถนนที่เดินเข้าได้ทุกเวลา ส่วนสึโดมุเข้าฟรีและมีบางกิจกรรมเสียเงินด้านใน ไม่ต้องซื้อตั๋ว ไม่มีรอบเข้าชม และไม่มีอะไรต้องจอง",
  },
];

// 18 Nov 2026: dates and admission re-read on snowfes.com/news/948.html and snowfes.com/faq/.
const TODAY = dateLabel("2026-11-18", LOCALE);

const factRows = [
  { item: "เทศกาลหิมะซัปโปโร 2027 (ครั้งที่ 77)", fact: "4 (พฤ.) ถึง 11 (พฤ. วันหยุด) กุมภาพันธ์ 2027 รวม 8 วัน เข้าชมฟรีทั้ง 3 สถานที่จัดงาน ไม่ต้องใช้ตั๋ว" },
  { item: "สถานที่จัดงานโอโดริ", fact: "สวนโอโดริ นิชิ 1 ถึงนิชิ 11 ชมได้ตลอดเวลา เปิดไฟถึง 22:00" },
  { item: "สถานที่จัดงานซูซูกิโนะ", fact: "เอคิมาเอะ-โดริ มินามิ 4 ถึงมินามิ 6 ชมได้ตลอดเวลา เปิดไฟถึง 23:00 (วันสุดท้าย 22:00)" },
  { item: "สถานที่จัดงานสึโดมุ", fact: "10:00–16:00 เข้าฟรี กิจกรรมบางอย่างมีค่าใช้จ่าย และอาจปิดรับกิจกรรมก่อนเวลาเมื่อคนแน่น" },
  { item: "งานที่เกี่ยวข้อง", fact: "Sapporo Snow Sports Park 2027 วันที่ 12–14 กุมภาพันธ์ 2027 ที่ Daiwa House Premist Dome" },
];

const faqItems = [
  {
    q: "ทัวร์เทศกาลหิมะซัปโปโรราคาเท่าไร?",
    a: `ตัวเทศกาลไม่มีค่าใช้จ่าย คำถามที่พบบ่อยของคณะกรรมการตอบว่า 「全会場無料です」 (ทุกสถานที่จัดงานฟรี) มีเพียงกิจกรรมบางอย่าง เช่นที่สึโดมุ ที่เก็บเงิน สิ่งที่ต้องจ่ายคือทัวร์วันเดียวรอบช่วงเทศกาล ซึ่ง Klook แสดงราคาตามวันที่ จึงควรเปิดดูด้วยวันเดินทางของคุณ ตรวจสอบบน snowfes.com เมื่อ ${TODAY}`,
  },
  {
    q: "ควรจองกิจกรรมเทศกาลหิมะซัปโปโรล่วงหน้านานแค่ไหน?",
    a: "จองที่พักก่อนทันทีที่วันเดินทางแน่นอน กำหนดการวันที่ 4–11 กุมภาพันธ์ 2027 ประกาศตั้งแต่ 11 กุมภาพันธ์ 2026 แล้ว ส่วนทัวร์วันเดียวตามฤดูกาล เช่น โอตารุ สวนสัตว์อาซาฮิยามะ หรือเทศกาลน้ำแข็งชิโกะสึ ควรจองภายในราว 31 ธันวาคม ขณะที่ยังตรวจสอบเงื่อนไขการยกเลิกและเปลี่ยนแผนได้ ตัวสถานที่จัดงานไม่ต้องจองอะไรเลย",
  },
  {
    q: "เทศกาลหิมะซัปโปโรต้องซื้อตั๋วไหม?",
    a: `ไม่ต้อง คำถามที่พบบ่อยของคณะกรรมการตอบว่า 「全会場無料です」 โอโดริเป็นสวนสาธารณะชมได้ตลอดเวลาและเปิดไฟถึง 22:00 ซูซูกิโนะเปิดไฟถึง 23:00 (วันสุดท้าย 22:00) และสึโดมุเข้าฟรีเวลา 10:00–16:00 โดยกิจกรรมบางอย่างข้างในมีค่าใช้จ่าย ตรวจสอบเมื่อ ${TODAY}`,
  },
  {
    q: "เทศกาลหิมะซัปโปโร 2027 จัดเมื่อไร?",
    a: `4 ถึง 11 กุมภาพันธ์ 2027 รวมแปดวัน ประกาศของคณะกรรมการระบุว่า 「2027年2月4日（木）から11日（木・祝）の8日間」 จึงเป็นวันที่ยืนยันแล้ว ไม่ใช่การคาดเดา และครอบคลุมทั้งสามสถานที่จัดงาน งานที่เกี่ยวข้อง さっぽろスノースポーツパーク2027 ตามมาในวันที่ 12–14 กุมภาพันธ์ 2027 สถานที่จัดงานสึโดมุเป็นแห่งเดียวที่มีเวลาปิดทำการ คือ 10:00 ถึง 16:00 ตรวจสอบเมื่อ ${OWN} คณะกรรมการประกาศวันของปีถัดไปตอนปิดแต่ละครั้ง วันปี 2027 ประกาศเมื่อ 11 กุมภาพันธ์ 2026 ถ้าหาปี 2028 ให้ดูที่ประกาศนั้นก่อน`,
  },
  {
    q: "ต้องซื้อทัวร์เทศกาลหิมะซัปโปโรไหม?",
    a: `ไม่ต้อง และควรระวังสิ่งที่ขายในชื่อนั้น ทั้งสามสถานที่จัดงานเข้าชมฟรีและเดินเข้าได้ โอโดริและซูซูกิโนะเป็นสวนและถนนห่างกันไม่กี่บล็อก ส่วนสึโดมุนั่งรถไฟใต้ดินแล้วต่อชัตเทิลสั้น ๆ ไม่มีบริการซื้อสิทธิ์ข้ามคิว ไม่ต้องถือตั๋ว สิ่งที่ทัวร์ช่วยได้จริงคืออีกครึ่งของแต่ละวัน สถานที่จัดงานทั้งหมดอยู่กลางแจ้งในเดือนที่อุณหภูมิสูงสุดเฉลี่ย ${FEB_MAX} คนส่วนใหญ่จึงอยากอยู่ในร่มหรือออกนอกเมืองช่วงกลางวัน แล้วดูไฟที่โอโดริตอนค่ำ รายการในหน้านี้คือสิ่งเหล่านั้น: คลองโอตารุ สวนสัตว์อาซาฮิยามะหน้าหนาว เทศกาลน้ำแข็งชิโกะสึตอนค่ำ ครึ่งวันออนเซ็นโจซังเค และสวนหิมะ ไม่มีรายการใดเป็นทัวร์เข้าชมเทศกาลหิมะ เพราะทัวร์แบบนี้ไม่มีและไม่จำเป็น`,
  },
  {
    q: "ช่วงเทศกาลควรพักที่ไหน?",
    a: `สถานีซัปโปโรหรือซูซูกิโนะ ต่างกันที่กิจกรรมช่วงค่ำที่คุณให้ความสำคัญ สถานีซัปโปโรอยู่ห่างโอโดริหนึ่งสถานีและเดินใต้ดินได้เป็นส่วนใหญ่ ซึ่งสำคัญกว่าวิวเมื่ออุณหภูมิสูงสุดเฉลี่ยเดือนกุมภาพันธ์คือ ${FEB_MAX} และเป็นจุดที่ Rapid Airport จากสนามบินนิวชิโตเสะจอด ซูซูกิโนะมีงานประติมากรรมน้ำแข็งอยู่หน้าที่พัก สถานที่จัดงานอยู่ตามเอคิมาเอะ-โดริระหว่างมินามิ 4 ถึง 6 และเปิดไฟถึง 23:00 ช่วงดึกจึงเดินกลับได้โดยไม่ต้องรีบขึ้นรถไฟเที่ยวสุดท้าย โอตารุเป็นตัวเลือกสำรองเมื่อซัปโปโรเต็ม ใช้ Rapid Airport 33–41 นาที ราคา ¥800 ตามตัวเลขของ JR Hokkaido และมี Snow Light Path ในสัปดาห์เดียวกัน ไม่ว่าเลือกที่ไหน กำหนดการประกาศตั้งแต่กุมภาพันธ์ 2026 นี่จึงเป็นการจองที่ควรทำก่อน`,
  },
];

const festivalSameTrip: KlookTripPrepItem[] = [
  {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดู eSIM บน Klook →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "สถานที่จัดงานกลางแจ้งสามแห่ง ชัตเทิลสึโดมุที่ยังไม่มีตารางปี 2027 และเดือนที่อุณหภูมิสูงสุดเฉลี่ย 0.4°C ประกาศของงานและข่าวสภาพอากาศแจ้งผ่านมือถือ ไม่ได้ประกาศที่เคาน์เตอร์",
  },
  {
    label: "รถรับส่งสนามบินนิวชิโตเสะ (รถส่วนตัวและรถร่วม)",
    ctaLabel: "ดูรถรับส่งสนามบินนิวชิโตเสะ →",
    url: klookFor(newChitoseAirportTransfers.url, LOCALE),
    why: "ทางเลือกแทน Rapid Airport เมื่อมีกระเป๋าในเดือนกุมภาพันธ์ ไปถึงหน้าโรงแรมโดยไม่ต้องยืนรอที่สถานีท่ามกลางหิมะ มีประโยชน์ที่สุดเมื่อลงเครื่องดึกหรือพักซูซูกิโนะ",
  },
  {
    label: "Hokkaido Sapporo–Furano Area Pass (4 วัน)",
    ctaLabel: "ดูพาสพื้นที่ →",
    url: klookFor(sapporoFuranoAreaPass.url, LOCALE),
    why: "จำเป็นเฉพาะเมื่อออกนอกเมืองด้วยรถไฟ ซื้อล่วงหน้า ¥11,000 ตามหน้าของ JR Hokkaido ครอบคลุมสนามบินนิวชิโตเสะ โอตารุ และอาซาฮิคาวะ ขณะที่สนามบินไปกลับอย่างเดียว ¥2,460 ทริปที่อยู่ในซัปโปโรและจองทัวร์ไม่ต้องใช้",
  },
  {
    label: "โรงแรมรอบสถานีซัปโปโร",
    ctaLabel: "ดูโรงแรมซัปโปโรบน Klook →",
    url: klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE),
    why: "วันจัดงานประกาศแล้วตั้งแต่ 11 กุมภาพันธ์ 2026 ห้องพักสำหรับ 8 คืนนี้จึงเป็นการจองที่ควรทำก่อน และเป็นสิ่งที่หน้านี้บอกราคาไม่ได้",
  },
];

const TITLE = "ทัวร์เทศกาลหิมะซัปโปโร 2027 วันที่ ราคา ตั๋ว";
const DESC =
  "เทศกาลหิมะซัปโปโร 2027 จัด 4–11 ก.พ. เข้าชมฟรีไม่ต้องใช้ตั๋ว จองที่พักตอนนี้ ทัวร์จองบน Klook";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function SapporoSnowFestivalToursPage({ updated }: { updated: PageUpdated }) {
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
ทัวร์เทศกาลหิมะซัปโปโร 2027: <br />วันจัดงาน 4–11 ก.พ. ราคา ตั๋ว และสิ่งที่ควรจอง
</h1>
          <p className={styles.heroSubtitle}>
เทศกาล 8 วัน 3 สถานที่จัดงาน ไม่ต้องใช้ตั๋ว ทัวร์ที่ควรจองคือทริปไปเช้าเย็นกลับก่อนหรือหลังชมเทศกาล และที่พักเป็นสิ่งเดียวที่หาสิ่งอื่นมาทดแทนไม่ได้
</p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${monthLabel(updated.iso, LOCALE)}`, "วันจัดงานปี 2027 ที่คณะกรรมการประกาศ", "เข้าชมฟรีทั้งสามสถานที่จัดงาน", "ค่าโดยสารและเวลา พร้อมวันที่ตรวจสอบ"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

        {/* Answer-first block, added 18 Nov 2026. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>เทศกาลหิมะซัปโปโร 2027</strong> จัดวันที่ <strong>4 ถึง 11 กุมภาพันธ์ 2027 รวม 8 วัน</strong> ที่โอโดริ ซูซูกิโนะ และสึโดมุ และ<strong>เข้าชมฟรีโดยไม่ต้องใช้ตั๋ว</strong> ดังนั้น<strong>ทัวร์เทศกาลหิมะซัปโปโร</strong>จึงเป็นทริปวันเดียวเสริมรอบช่วงเทศกาล จองที่พักก่อน และจองทัวร์วันเดียวภายในราว 31 ธันวาคม ข้อมูลจากเว็บไซต์คณะกรรมการ ตรวจสอบเมื่อ {TODAY}
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["หัวข้อ", "ข้อมูลทางการ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-18 · แหล่งข้อมูลทางการ: <a href="https://www.snowfes.com/news/948.html" target="_blank" rel="noopener noreferrer">snowfes.com (ภาพรวมงานปี 2027)</a>, <a href="https://www.snowfes.com/faq/" target="_blank" rel="noopener noreferrer">snowfes.com FAQ</a>
          </p>

          <h2 className={styles.sectionTitle}>ทัวร์เทศกาลหิมะซัปโปโรราคาเท่าไร?</h2>
          <p className={styles.bodyText}>
            ตัวเทศกาลราคา ¥0 คำถามที่พบบ่อยของคณะกรรมการตอบว่า 「全会場無料です」 (ทุกสถานที่จัดงานฟรี) มีเพียงกิจกรรมบางอย่าง เช่นที่สึโดมุ ที่เก็บเงิน สิ่งที่ต้องจ่ายคือทัวร์วันเดียว เช่น โอตารุ สวนสัตว์อาซาฮิยามะ หรือเทศกาลน้ำแข็งชิโกะสึ ซึ่ง Klook แสดงราคาตามวันที่ จึงควรเปิดดูด้วยวันเดินทางของคุณ
          </p>

          <h2 className={styles.sectionTitle}>ควรจองกิจกรรมเทศกาลหิมะซัปโปโรล่วงหน้านานแค่ไหน?</h2>
          <p className={styles.bodyText}>
            จองที่พักก่อนทันทีที่วันเดินทางแน่นอน เพราะกำหนดการ 8 คืนระหว่างวันที่ 4–11 กุมภาพันธ์ 2027 ประกาศตั้งแต่ 11 กุมภาพันธ์ 2026 แล้ว ทัวร์วันเดียวตามฤดูกาลควรจองภายในราว 31 ธันวาคม ขณะที่ยังตรวจสอบเงื่อนไขการยกเลิกและเปลี่ยนแผนได้ ส่วนสถานที่จัดงานไม่ต้องจองอะไรเลย
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              ดูโรงแรมซัปโปโร 4–11 ก.พ. →
            </KlookLink>
            <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              ทัวร์วันเดียวโอตารุ →
            </KlookLink>
          </div>
        </section>

        <WinterBookingTop
          heading={"ควรจองทัวร์อะไรสำหรับเทศกาลหิมะซัปโปโร กุมภาพันธ์ 2027?"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
จองที่พักตั้งแต่ตอนนี้ เพราะวันจัดงานทั้ง 8 วันประกาศแล้วตั้งแต่ 11 กุมภาพันธ์ 2026 และเป็นส่วนเดียวของทริปที่ไม่มีตัวเลือกสำรอง จองทัวร์วันเดียวภายใน 31 ธันวาคม ขณะที่ยังตรวจสอบเงื่อนไขการยกเลิกและเปลี่ยนแผนได้
</>
          }
          tours={[
            {
              title: "ทัวร์โอตารุ ชิโรอิ โคอิบิโตะ พาร์ก และสวนหิมะ",
              url: klookFor(otaruSnowParkDayTour.url, LOCALE),
              price: "ประมาณ US$65–76",
              duration: "เต็มวัน",
              departs: "ซัปโปโร",
            },
            {
              title: "ทัวร์สวนสัตว์อาซาฮิยามะ บ่อน้ำสีฟ้าแห่งบิเอะ และนิงเกิลเทอเรซ จากซัปโปโร",
              url: klookFor(asahiyamaBieiHighlightsTour.url, LOCALE),
              price: "เริ่มต้นประมาณ US$55",
              duration: "เต็มวัน",
              departs: "ซัปโปโร",
            },
            {
              title: "ทัวร์เทศกาลน้ำแข็งชิโกะสึและ Tomamu Ice Village",
              url: klookFor(lakeShikotsuTomamuIceVillageDayTour.url, LOCALE),
              price: "เริ่มต้นประมาณ US$103",
              duration: "10 ชั่วโมง",
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
เมื่อไร
</p>
                <p className={styles.verdictStatValue}>
4–11 กุมภาพันธ์ 2027 แปดวัน
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
ที่ไหน
</p>
                <p className={styles.verdictStatValue}>
โอโดริ ซูซูกิโนะ และสึโดมุ
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
ค่าเข้า
</p>
                <p className={styles.verdictStatValue}>
เข้าชมฟรีทั้งสามสถานที่จัดงาน
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
ต้องซื้อทัวร์ไหม?
</p>
                <p className={styles.verdictStatValue}>
ไม่ต้อง จองที่พักและทริปเที่ยวรอบซัปโปโรแทน
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
<strong>เทศกาลหิมะซัปโปโร 2027</strong> จัดวันที่ 4–11 ก.พ. (วันที่จาก snowfes.com ตรวจสอบเมื่อ {TODAY}) และเข้าชมฟรีทั้ง 3 จุด จึงไม่จำเป็นต้องซื้อ<strong>ทัวร์เทศกาลหิมะซัปโปโร</strong> ควรจองที่พักตอนนี้ และจองทัวร์รายวันภายใน 31 ธ.ค. <strong>เทศกาลหิมะซัปโปโรครั้งที่ 77 จัดวันที่ 4 ถึง 11 กุมภาพันธ์ 2027</strong> รวม 8 วัน ในสามสถานที่จัดงาน ได้แก่ <strong>สวนโอโดริ ตั้งแต่นิชิ 1 ถึงนิชิ 11</strong> <strong>ซูซูกิโนะบนถนนเอคิมาเอะ-โดริ ระหว่างมินามิ 4 ถึงมินามิ 6</strong> และศูนย์กีฬา<strong>สึโดมุ</strong> และ FAQ ของคณะกรรมการระบุว่า<strong>ฟรี</strong>ทั้งหมด โอโดริชมได้ทุกเวลา ประติมากรรมเปิดไฟถึง <strong>22:00</strong> ซูซูกิโนะถึง <strong>23:00</strong> (22:00 ในวันสุดท้าย) และสึโดมุเปิด <strong>10:00–16:00</strong> โดยมีบางกิจกรรมเสียเงิน ไม่ต้องซื้อตั๋ว ไม่มีรอบเข้าชม และไม่มีบริการซื้อสิทธิ์ข้ามคิว สิ่งที่ควรจองคือสัปดาห์รอบเทศกาล ได้แก่ที่พักซึ่งไม่มีตัวเลือกสำรอง และทริปนอกเมืองที่มีเฉพาะฤดูนี้ เช่น โอตารุ สวนสัตว์อาซาฮิยามะ เทศกาลน้ำแข็งชิโกะสึ และบ่ายออนเซ็นโจซังเค กุมภาพันธ์ในซัปโปโรมีอุณหภูมิสูงสุดเฉลี่ย <strong>{FEB_MAX}</strong> จึงควรวางแผนให้มีกิจกรรมในร่มช่วงกลางวันของแต่ละวัน ข้อมูลเทศกาลตรวจสอบเมื่อ {OWN} ค่าปกติอุณหภูมิเมื่อ {JMA_CHECKED}
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
ดูโรงแรมซัปโปโรสำหรับวันนั้น →
</KlookLink>
              <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
ทริปโอตารุ →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"จองไปพร้อมกันในทริปนี้"}
          heading={"ทริปเทศกาลต้องจองอะไรก่อนบิน"}
          intro={"สิ่งที่ต้องจอง 4 อย่างนอกเหนือจากตัวงาน: อินเทอร์เน็ตมือถือ รถรับส่งสนามบินแทนการยืนรอที่ชานชาลา พาสรถไฟที่เลือกตามเส้นทาง และที่พักซึ่งวันจัดงานประกาศล่วงหน้าหนึ่งปีและไม่มีตัวเลือกสำรอง"}
          items={festivalSameTrip}
        />

        <EsimCtaTop />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
วันที่และสถานที่
</span>
          <h2 className={styles.sectionTitle}>
เทศกาลหิมะซัปโปโร 2027 จัดเมื่อไรและที่ไหน?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>4 ถึง 11 กุมภาพันธ์ 2027</strong> แปดวัน ตามประกาศของคณะกรรมการ 「2027年2月4日（木）から11日（木・祝）の8日間」 เป็นวันที่ยืนยันแล้ว ไม่ใช่การคาดจากปีก่อน และประกาศเดียวกันระบุทั้งสามสถานที่จัดงานพร้อมขอบเขต งานที่เกี่ยวข้อง Sapporo Snow Sports Park ตามมาในวันที่ <strong>12 ถึง 14 กุมภาพันธ์ 2027</strong> ที่ Daiwa House Premist Dome
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["สถานที่จัดงาน", "ตำแหน่ง", "เวลา", "ค่าเข้า", "มีอะไรบ้าง"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteRows.map((row) => (
                    <tr key={row.site}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.site}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
วันที่และขอบเขตงานจากประกาศครั้งที่ 77 ของคณะกรรมการจัดงานเทศกาลหิมะซัปโปโร เวลาและค่าเข้าจาก FAQ ของคณะกรรมการ (「全会場無料です」) อ่านครั้งแรกเมื่อ {OWN} และอ่านซ้ำเมื่อ {SEASON} ไม่มีการเปลี่ยนแปลง คณะกรรมการแจ้งว่าจะอัปเดตข้อมูล 2027 เมื่อยืนยัน จึงควรเช็กขอบเขตงานอีกครั้งเมื่อใกล้วัน และขอบด้านใต้ของสถานที่จัดงานซูซูกิโนะเปลี่ยนจากมินามิ 7 ในปี 2026 เป็นมินามิ 6 ในปี 2027
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ฟรีไหม?
</span>
          <h2 className={styles.sectionTitle}>
เทศกาลหิมะซัปโปโรต้องซื้อตั๋วไหม และต้องซื้อทัวร์หรือเปล่า?
</h2>
          <p className={styles.bodyText}>
ฟรี และไม่ต้อง FAQ ของคณะกรรมการตอบเรื่องค่าเข้าบรรทัดเดียวว่า <strong>「全会場無料です」</strong> คือเข้าชมฟรีทุกสถานที่จัดงาน และไม่มีส่วนใดต้องใช้ตั๋ว สถานที่จัดงานโอโดริเป็นสวนสาธารณะที่เดินเข้าได้ทุกเวลาตลอด 8 วัน สถานที่จัดงานซูซูกิโนะเป็นถนนสาธารณะ สถานที่จัดงานสึโดมุเข้าฟรี บางกิจกรรมเก็บเงินแยก และคณะกรรมการเตือนว่าอาจปิดรับก่อน 16:00 เมื่อคนเยอะ ตรวจสอบเมื่อ {OWN}
</p>
          <p className={styles.bodyText}>
งานนี้จึงต่างจากงานอื่นในเว็บไซต์นี้ ไม่มีบริการซื้อสิทธิ์ข้ามคิว ไม่มีรอบเข้าชม สินค้าแบบ “ไม่ต้องต่อคิว” จึงไม่มีประโยชน์ บน Klook ไม่มีรายการที่ขายตัวเทศกาลหิมะซัปโปโร และไม่ควรมี สิ่งที่การจองให้ได้จริงคือ<strong>อีกครึ่งของแต่ละวัน</strong> สถานที่จัดงานทั้งหมดอยู่กลางแจ้งในเดือนที่อุณหภูมิสูงสุดเฉลี่ย <strong>{FEB_MAX}</strong> ตามค่าปกติของ JMA และประติมากรรมสวยที่สุดหลังมืด วันเทศกาลที่ดีจึงเป็นเช้านอกเมืองหรือบ่ายในร่ม แล้วค่ำดูไฟที่โอโดริและซูซูกิโนะ รายการด้านล่างคือครึ่งแรกนั้น
</p>
          <p className={styles.bodyText}>
มีตั๋วหนึ่งที่ควรพูดถึงเพราะทำเลที่ตั้ง จุดชมวิว<strong>หอโทรทัศน์ซัปโปโร</strong>อยู่ที่นิชิ 1 ตรงจุดเริ่มของประติมากรรม 11 บล็อกของสถานที่จัดงานโอโดริ จึงเป็นจุดเสียค่าเข้าชมเพียงแห่งเดียวในช่วงเทศกาลที่ให้มุมมองซึ่งเดินชมงานไม่ได้ คือภาพทั้งสถานที่จัดงานที่เรียงเป็นแนวตรงและเปิดไฟ <KlookLink href={klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>ดูตั๋วรวมหอโทรทัศน์และภูเขาโมอิวะ →</KlookLink>
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
ทัวร์
</span>
          <h2 className={styles.sectionTitle}>
ทัวร์ไหนคุ้มที่จะจองในสัปดาห์เทศกาล?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
รายการที่ขายเฉพาะฤดูนี้ และทัวร์ที่เพิ่มช่วงพักในร่มให้วันที่ต้องอยู่กลางแจ้ง ทุกรายการด้านล่างตรวจสอบกับดัชนีค้นหาของ Klook อีกครั้งเมื่อ {SEASON} ไม่มีรายการใดเป็นทัวร์เข้าชมเทศกาลหิมะ และแต่ละแถวบอกว่าเพิ่มอะไรและเหมาะกับวันแบบไหน ตารางไม่มีราคาเพราะราคาของ Klook เปลี่ยนตามวันที่ ราคาเริ่มต้นด้านบนของหน้านี้คือราคาที่ดัชนีแสดง เปิดหน้าสินค้าเพื่อดูราคาตามวันของคุณ
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["รายการ", "เพิ่มอะไร", "เหมาะกับวันแบบไหน", "สิ่งที่ควรรู้"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adds}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fits}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>วิธีเลือก</strong> ถ้ามีสามคืน ให้เลือกทริปเต็มวันหนึ่งและครึ่งวันหนึ่ง แล้วเก็บสองค่ำไว้ดูไฟที่โอโดริและซูซูกิโนะ รายละเอียดงานแกะสลักตอนกลางวันกับไฟตอนกลางคืนเป็นคนละประสบการณ์ และคนส่วนใหญ่เสียดายถ้าพลาด ถ้ามีสี่คืนขึ้นไป ทริปยาวโนโบริเบ็ตสึและโทยะก็คุ้ม ถ้ามากับเด็ก สึโดมุตอนเช้าและสวนหิมะตอนบ่ายคือแบบที่เหมาะ ไม่ว่าจองอะไร ให้เช็กเงื่อนไขการยกเลิก เพราะเป็นรอบเดือนกุมภาพันธ์ในฮอกไกโด และรถบัสคือสิ่งแรกที่ถูกยกเลิกเมื่อหิมะตกหนัก
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
โอตารุและสวนหิมะ →
</KlookLink>
            <KlookLink href={klookFor(asahiyamaBieiHighlightsTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
สวนสัตว์อาซาฮิยามะ →
</KlookLink>
            <KlookLink href={klookFor(lakeShikotsuIceFestivalHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
เทศกาลน้ำแข็งชิโกะสึ →
</KlookLink>
            <KlookLink href={klookFor(jozankeiHotSpringBusTrip.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
ออนเซ็นโจซังเค →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ที่พัก
</span>
          <h2 className={styles.sectionTitle}>
ช่วงเทศกาลควรพักที่ไหน?
</h2>
          <p className={styles.bodyText}>
<strong>สถานีซัปโปโรหรือซูซูกิโนะ</strong> เลือกตามกิจกรรมช่วงค่ำที่คุณให้ความสำคัญ สถานีซัปโปโรอยู่ห่างโอโดริหนึ่งสถานีและเดินใต้ดินได้เป็นส่วนใหญ่ และเป็นจุดที่ Rapid Airport จากสนามบินนิวชิโตเสะจอด ในเทศกาลกลางแจ้ง 8 วันที่อุณหภูมิสูงสุดเฉลี่ย {FEB_MAX} การกลับเข้าในร่มระหว่างงานมีค่ามากกว่าวิว <strong>ซูซูกิโนะ</strong>มีงานประติมากรรมน้ำแข็งอยู่หน้าที่พักและเปิดไฟถึง 23:00 ช่วงดึกจึงเดินกลับได้ <strong>โอตารุ</strong>อยู่ทางตะวันตก ใช้เวลา 33–41 นาทีด้วย Rapid Airport บนรถไฟ JR สายฮาโกดาเตะ เป็นตัวเลือกสำรองเมื่อซัปโปโรเต็ม และมี Snow Light Path ในสัปดาห์เดียวกัน
</p>
          <p className={styles.bodyText}>
เรื่องกำหนดการ เราแยกข้อมูลที่ยืนยันแล้วออกจากข้อมูลที่ยังไม่ประกาศ <strong>กำหนดการประกาศตั้งแต่ 11 กุมภาพันธ์ 2026</strong> เมื่อคณะกรรมการประกาศวันปี 2027 ในแถลงการณ์ปิดเทศกาลครั้งที่ 76 กำหนดการ 8 คืนจึงทราบล่วงหน้ามาแปดเดือนแล้ว ซึ่งเป็นเหตุผลที่หนักแน่นที่สุดให้จองเร็ว สิ่งที่เราตั้งใจไม่แสดงคืออัตราการเข้าพักหรือตัวเลขห้องเต็ม เพราะไม่มีการเปิดเผยตัวเลข และเราจะไม่แต่งขึ้นเอง ให้ถือว่าที่พักคือการจองที่ไม่มีตัวเลือกสำรอง และอย่างอื่นยืดหยุ่นได้
</p>
        </section>

        <KlookStayAreas
          heading={"ค้นหาโรงแรมใน 3 ย่านด้านบน"}
          intro={"ห้องที่เหลือและราคาขึ้นกับวัน แต่ละย่านจึงลิงก์ไปยังการค้นหาโรงแรมของ Klook ในช่วงเทศกาล สิ่งที่ควรเปรียบเทียบไม่ใช่ราคาต่อคืน แต่เป็นระยะทางถึงอาคารที่มีเครื่องทำความร้อน ซึ่งคำอธิบายของแต่ละแห่งพูดถึงเรื่องนี้"}
          areas={sapporoSnowFestivalStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "ห่างโอโดริหนึ่งสถานีหรือเดินในทางที่มีหลังคา และเป็นจุดที่ Rapid Airport จากสนามบินนิวชิโตเสะจอด ในเทศกาล 8 วันเดือนกุมภาพันธ์สิ่งนี้สำคัญกว่าวิว เพราะเป็นย่านที่ทำให้กลับเข้าในร่มระหว่างชมงานได้", area: "สถานีซัปโปโร" }, { why: "งานประติมากรรมน้ำแข็งอยู่บนถนนหน้าที่พัก สถานที่จัดงานซูซูกิโนะอยู่ตามเอคิมาเอะ-โดริระหว่างมินามิ 4 ถึง 6 เปิดไฟถึง 23:00 ช่วงดึกจึงเดินกลับได้ ไม่ต้องรีบขึ้นรถไฟใต้ดินเที่ยวสุดท้าย", area: "ซูซูกิโนะ" }, { why: "ตัวเลือกสำรองเมื่อซัปโปโรเต็ม และเป็นจุดหมายในตัวเอง โอตารุอยู่ห่าง 33–41 นาทีด้วย Rapid Airport บนรถไฟ JR สายฮาโกดาเตะ และมี Snow Light Path ในช่วงเดียวกันของเดือนกุมภาพันธ์", area: "สถานีโอตารุ" }] as Partial<typeof item>[])[i]))}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
อากาศและการแต่งกาย
</span>
          <h2 className={styles.sectionTitle}>
ซัปโปโรเดือนกุมภาพันธ์หนาวแค่ไหน ควรใส่อะไร?
</h2>
          <p className={styles.bodyText}>
ตามค่าปกติปี 1991–2020 ของกรมอุตุนิยมวิทยาญี่ปุ่นสำหรับซัปโปโร กุมภาพันธ์เฉลี่ย <strong>{FEB_MEAN}</strong> <strong>สูงสุดเฉลี่ย {FEB_MAX}</strong> <strong>ต่ำสุดเฉลี่ย {FEB_MIN}</strong> และหิมะตกรวม <strong>{FEB_SNOW}</strong> ตรวจสอบเมื่อ {JMA_CHECKED}
</p>
          <p className={styles.bodyText}>
ตัวเลขเหล่านี้หมายถึงสิ่งที่ต้องเตรียม 3 ข้อ หนึ่ง สูงสุดราวจุดเยือกแข็งหมายความว่าหิมะใต้เท้าแข็งและลื่น ไม่เปียก การยึดเกาะพื้นจึงสำคัญกว่าคุณสมบัติกันน้ำ และเป็นเรื่องที่สำคัญที่สุดที่ต้องเลือกให้ถูก สอง อาคาร รถไฟ และทางเดินใต้ดินในซัปโปโรเปิดเครื่องทำความร้อนแรง เสื้อหลายชั้นที่ถอดได้จึงดีกว่าโค้ตหนาตัวเดียว ทางเดินใต้ดินระหว่างสถานีซัปโปโรกับโอโดริสร้างขึ้นด้วยเหตุผลนี้และเป็นส่วนหนึ่งของการวางแผนค่ำเทศกาล สาม ประติมากรรมสวยที่สุดหลังมืด ซึ่งอุณหภูมิใกล้จุดต่ำสุด ชั่วโมงที่คุณอยากอยู่ข้างนอกที่สุดจึงเป็นชั่วโมงที่หนาวที่สุด ถุงมือ หมวก และผ้าปิดหน้าไม่ใช่ของเสริม <Link href="/th/guides/attractions/japan-winter-itinerary">แผนเที่ยวญี่ปุ่นหน้าหนาว</Link>แสดงค่าปกติของโตเกียว เกียวโต และโอซาก้าเทียบกับซัปโปโร ซึ่งอธิบายว่าทำไมฮอกไกโดต้องใช้เสื้อผ้าต่างจากส่วนอื่นของญี่ปุ่น
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
การเดินทาง
</span>
          <h2 className={styles.sectionTitle}>
เดินทางจากสนามบินนิวชิโตเสะไปซัปโปโรอย่างไร?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>รถไฟ Rapid Airport 33–37 นาที ราคา {AIRPORT_FARE}</strong> เป็นตัวเลขของ JR Hokkaido และเป็นตัวเลือกที่เหมาะกับผู้เดินทางเกือบทุกคน ตารางด้านล่างเพิ่มส่วนที่เหลือ ได้แก่ ค่าที่นั่งจอง วิธีไปแต่ละสถานที่จัดงาน และตั๋วรถไฟใต้ดินรายวันสองแบบ พร้อมราคาทางการของผู้ให้บริการ
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ช่วง", "เวลา", "ค่าโดยสาร", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
มีสองเรื่องที่ต้องตัดสินใจ <strong>ที่นั่งจอง U-Seat</strong> ตู้ที่ 4 เพิ่ม ¥1,000 หรือ ¥800 แบบไม่ใช้ตั๋ว และคุ้มในเดือนกุมภาพันธ์ เพราะตู้ธรรมดาแน่นไปด้วยผู้โดยสารที่มีกระเป๋าสกี <strong>JR Hokkaido Rail Pass</strong> คุ้มเฉพาะเมื่อออกนอกเมือง สนามบินไปกลับประมาณ ¥2,460 ความคุ้มของพาสจึงขึ้นกับการไปโอตารุ อาซาฮิคาวะ และโนโบริเบ็ตสึ ไม่ใช่การไปสนามบิน คำนวณจากเส้นทางของคุณ ตรวจสอบค่าโดยสารเมื่อ {OWN} <Link href="/guides/transport/jr-pass-guide" hrefLang="en">คู่มือ JR Pass (ภาษาอังกฤษ)</Link> ใช้วิธีเดียวกันกับพาสทั่วประเทศ
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
รถรับส่งสนามบินนิวชิโตเสะ →
</KlookLink>
            <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
JR Hokkaido Rail Pass →
</KlookLink>
            <KlookLink href={klookFor(lakeShikotsuIceFestivalShuttleBus.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
รถรับส่งทะเลสาบชิโกะสึ →
</KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
อีกหนึ่งสิ่งที่ต้องเตรียมสำหรับวันมาถึงที่ไม่ใช่การเดินทาง คืออินเทอร์เน็ตมือถือ สถานที่จัดงานกลางแจ้งสามแห่ง ชัตเทิลที่ยังไม่มีตารางปี 2027 และอากาศเดือนกุมภาพันธ์ที่เปลี่ยนแผนได้ในวันนั้น ประกาศทั้งหมดแจ้งผ่านมือถือ ไม่ได้ประกาศที่เคาน์เตอร์ <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>ดู Klook eSIM →</KlookLink> <Link href="/th/guides/esim/best-esim-japan">คู่มือ eSIM ญี่ปุ่น</Link>เปรียบเทียบกับทางเลือกอื่น
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
ช่วงเวลาจอง
</span>
          <h2 className={styles.sectionTitle}>
ต้องจองอะไรบ้าง และเมื่อไร?
</h2>
          <p className={styles.bodyText}>
สี่อย่างตามลำดับนี้ และตัวเทศกาลไม่อยู่ในนั้น เรียงตามว่าต้องตัดสินใจล่วงหน้าแค่ไหน
</p>
          <div className={styles.whoForGrid}>
            {bookingWindow.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
เงื่อนไขการยกเลิกสำคัญกว่าปกติในทริปนี้ เพราะฮอกไกโดเดือนกุมภาพันธ์ หิมะตกไม่ได้ทำให้เทศกาลปิด เพราะงานจัดกลางแจ้ง เข้าชมฟรี และประติมากรรมยังจัดแสดงอยู่ แต่อาจปิดถนนออกจากเมืองและทำให้เที่ยวบินล่าช้า จึงควรเช็กเงื่อนไขของรถบัสทุกวันที่จอง และถ้าบินเช้าวันสุดท้าย อย่าจองเที่ยวบินแรกของวันจากสนามบินนิวชิโตเสะ
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ส่วนที่เหลือของหน้าหนาว
</span>
          <h2 className={styles.sectionTitle}>
ควรจับคู่เทศกาลหิมะกับอะไร?
</h2>
          <p className={styles.bodyText}>
เริ่มจากที่เที่ยวอื่นในฮอกไกโดก่อน <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">ทริปโอตารุจากซัปโปโร (ภาษาอังกฤษ)</Link>เพิ่มง่ายที่สุด เพราะ Snow Light Path ทับซ้อนกับเทศกาลเกือบทั้งหมด ถ้ามีเต็มสัปดาห์ <Link href="/th/guides/attractions/hokkaido-7-day-itinerary">เที่ยวฮอกไกโด 7 วัน</Link>จัดเทศกาลไว้ในเส้นทางถึงอาซาฮิคาวะและฟุราโนะ และถ้าการเล่นสกีหนึ่งวันสำคัญกว่าการชมโอโดริเป็นค่ำที่สาม <Link href="/th/guides/attractions/niseko-ski-tours">คู่มือเล่นสกีนิเซโกะ</Link>ครอบคลุมทริปมีไกด์จากซัปโปโร
</p>
          <p className={styles.bodyText}>
ถ้าบินผ่านโตเกียว หน้าหนาวบนเกาะหลักคุ้มแวะอีกจุด <Link href="/th/guides/attractions/jigokudani-snow-monkey-tour">ทัวร์ลิงหิมะจิโกกุดานิ</Link>และ<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">ทัวร์ทาคายามะและชิราคาวาโกะ (ภาษาอังกฤษ)</Link>ให้หิมะหนาโดยไม่ต้องบินขึ้นเหนือ และ<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">เล่นสกีวันเดียวที่ GALA Yuzawa จากโตเกียว (ภาษาอังกฤษ)</Link>เป็นทางเลือกที่เดินทางสั้นกว่าถ้าอยากเล่นสกีแค่วันเดียว สำหรับค่ำก่อนหรือหลังฮอกไกโด คู่มือ<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">ไฟประดับโตเกียว (ภาษาอังกฤษ)</Link>บอกว่างานไหนยังมีในเดือนกุมภาพันธ์
</p>
        </section>

        <EsimCtaBottom />

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"ทริปวันเดียวที่มีเฉพาะฤดูนี้"}
          intro={"สี่รายการจากซัปโปโร สำหรับครึ่งของวันเทศกาลที่ไม่ได้อยู่ที่โอโดริ เส้นทางหน้าหนาวต่างจากหน้าร้อน จึงควรเปิดดูก่อนมาถึง ไม่ใช่เช้าวันนั้น"}
          tours={[withKlookLocale(otaruSnowParkDayTour, LOCALE, { title: "ทัวร์โอตารุ ชิโรอิ โคอิบิโตะ พาร์ก และสวนหิมะ", desc: "ทริปฮอกไกโดรวมคลองโอตารุและนาฬิกาไอน้ำ ชิโรอิ โคอิบิโตะ พาร์ก และจุดเล่นหิมะ" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "ทัวร์สวนสัตว์อาซาฮิยามะ บ่อน้ำสีฟ้าแห่งบิเอะ และนิงเกิลเทอเรซ จากซัปโปโร", desc: "รถบัสวันเดียวจากซัปโปโรไปสวนสัตว์อาซาฮิยามะ บ่อน้ำสีฟ้าแห่งบิเอะ และนิงเกิลเทอเรซ มีหลายเส้นทาง และตัวเลือกสโนว์โมบิลหน้าหนาวโดยจ่ายเพิ่ม" }), withKlookLocale(sapporoJozankeiBuddhaDayTour, LOCALE, { title: "ทัวร์ซัปโปโร โจซังเค และ Hill of the Buddha", desc: "เต็มวันรวมหุบเขาโจซังเค Hill of the Buddha ของ Tadao Ando ชิโรอิ โคอิบิโตะ พาร์ก และพิพิธภัณฑ์เบียร์ เป็นวันในซัปโปโรที่ไม่ใช่งานเทศกาลพร้อมไกด์" }), withKlookLocale(noboribetsuToyaOtaruDayTour, LOCALE, { title: "ทัวร์โนโบริเบ็ตสึ ทะเลสาบโทยะ และโอตารุจากซัปโปโร", desc: "ทัวร์แบบร่วมกลุ่มชมวิวทางใต้และตะวันตกของเมือง สำหรับทริปที่มีวันเหลือและไม่อยากใช้ค่ำที่สี่ที่โอโดริ" })]}
        />

                <Related items={[{ href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass (2026): ราคาและคุ้มไหม (ภาษาอังกฤษ)" }, { href: "/th/guides/attractions/niseko-ski-tours", title: "เล่นสกีนิเซโกะ (2027): รถรับส่ง คอร์สเรียนสกี และ 4 พื้นที่" }, { href: "/th/guides/attractions/hokkaido-7-day-itinerary", title: "เที่ยวฮอกไกโด 7 วัน: แผนรายวัน" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "ทริปโอตารุวันเดียวจากซัปโปโร (2027): ¥800 JR 33 นาที (ภาษาอังกฤษ)" }, { href: "/th/guides/attractions/japan-winter-itinerary", title: "เที่ยวญี่ปุ่นหน้าหนาว: แผน 12 วัน (2027)" }, { href: "/guides/money/japan-ski-travel-insurance", title: "ประกันเล่นสกีในญี่ปุ่น (2027): ควรคุ้มครองอะไร (ภาษาอังกฤษ)" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "ทัวร์ไฟประดับโตเกียว: วันที่ จุดฟรี และสิ่งที่ควรจอง (ภาษาอังกฤษ)" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "เล่นสกีวันเดียวที่ GALA Yuzawa จากโตเกียว: 71 นาที ลิฟต์ ¥8,000 (ภาษาอังกฤษ)" }, { href: "/th/guides/attractions/jigokudani-snow-monkey-tour", title: "ทัวร์ลิงหิมะจากโตเกียว: คู่มือจิโกกุดานิ (2027)" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "ทัวร์ทาคายามะและชิราคาวาโกะ (2027): ออกจากที่ไหนดี (ภาษาอังกฤษ)" }, { href: "/guides/transport/jr-pass-guide", title: "คู่มือ JR Pass (2026): ราคา ความครอบคลุม และคุ้มไหม (ภาษาอังกฤษ)" }, { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่นที่ดีที่สุด (2026): ผู้ให้บริการ ราคา และวิธีเลือก" }, { href: "/guides/attractions", title: "ดูสถานที่เที่ยวอื่นในญี่ปุ่น → (ภาษาอังกฤษ)" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
เที่ยวฟรี 8 วัน กับการจองหนึ่งอย่างที่ไม่มีตัวเลือกสำรอง
</h2>
            <p className={styles.ctaBannerDesc}>
เทศกาลไม่มีค่าใช้จ่ายและไม่ต้องจอง แต่ที่พักวันที่ 4–11 กุมภาพันธ์ 2027 ต้องจอง รวมถึงทริปนอกเมืองที่มีเฉพาะช่วงเทศกาลนี้
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
ดูโรงแรมซัปโปโร →
</KlookLink>
              <KlookLink href={klookFor(sapporoSnowParkHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
ดูสวนหิมะครึ่งวัน →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
