import type { ReactNode } from "react";
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
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import NextBookingBlock from "../../../../components/NextBookingBlock";
import {
  jrHarukaUrl,
  kaiyukanLegolandCombo,
  kaiyukanNifrelCombo,
  kaiyukanSameDayCards,
  kaiyukanSameDayPrep,
  osakaAmazingPassKaiyukanCombo,
  osakaAquariumKaiyukanTicket,
  osakaMetroDayPass,
  osakaPrivateWalkingTour,
  osakaSightsHighRatePrep,
  osakaSkyVistaHalfDayBusTour,
  santaMariaDayCruise,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/osaka-aquarium-kaiyukan-tickets) section by
// section as of 2026-11-28 (task-jtk-20261128-TR01): same sections, tables, FAQ and Klook CTAs in
// the same places. Every figure, date and source is the English page's; nothing is added. Title
// term: พิพิธภัณฑ์สัตว์น้ำไคยูคัง — the name Thai results use for the aquarium (kintetsu.co.jp/thai,
// gltjp.com/th, jeepe.jp/th, enjoy-osaka-kyoto-kobe.com/th), with ตั๋ว in front as Thai searches
// write it. The pass keeps its English name, Osaka Amazing Pass, as on the other Thai Osaka pages.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/osaka-aquarium-kaiyukan-tickets";
const TITLE = "ตั๋วพิพิธภัณฑ์สัตว์น้ำไคยูคัง 2026: ราคา";
const H1 = "ตั๋วพิพิธภัณฑ์สัตว์น้ำไคยูคัง โอซาก้า 2026: ราคา และเวลาที่ควรไป";
const DESC =
  "ตั๋วไคยูคัง ผู้ใหญ่ ¥2,700–3,200 ตามวันที่ เด็ก ¥1,400–1,650 จองรอบออนไลน์ล่วงหน้า 30 วัน";

const CHECKED_ISO = "2026-11-19";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
/** The 15-minute entry unit and the 10:00 / 20:00 hours pattern: last read on this date. */
const SET_CHECKED = dateLabel("2026-10-22", LOCALE);
const BANDS_CHECKED_ISO = "2026-11-23";

const OFFICIAL = {
  bands: "https://www.kaiyukan.com/info/group/",
  ticket: "https://www.kaiyukan.com/info/ticket/",
  calendar: "https://www.kaiyukan.com/info/ticket/kaiyukan/",
  night: "https://www.kaiyukan.com/program/night/",
  harbor: "https://www.kaiyukan.com/thv/general/",
  captainLine: "https://www.kaiyukan.com/thv/captline/",
  santaMaria: "https://suijo-bus.osaka/intro/santamaria/",
  amazingPass: "https://osaka-amazing-pass.com/en/service_free.html",
};

const TICKET_URL = klookFor(osakaAquariumKaiyukanTicket.url, LOCALE);
const PASS_COMBO_URL = klookFor(osakaAmazingPassKaiyukanCombo.url, LOCALE);
const LEGO_COMBO_URL = klookFor(kaiyukanLegolandCombo.url, LOCALE);
const NIFREL_COMBO_URL = klookFor(kaiyukanNifrelCombo.url, LOCALE);
const SANTA_MARIA_URL = klookFor(santaMariaDayCruise.url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);
const METRO_PASS_URL = klookFor(osakaMetroDayPass.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    ticket: "แนะนำ: ตั๋วออนไลน์เข้าชม (ระบุวันและรอบเวลา)",
    who: "ผู้ใหญ่ — นักเรียนมัธยมปลายหรืออายุ 16 ปีขึ้นไป",
    price: "¥2,700 – ¥3,200",
    what: "ราคากำหนดตามวันที่ และตั๋วออนไลน์เปิดขายล่วงหน้าประมาณ 30 วัน ตามประกาศการจองของผู้ให้บริการ วันที่ราคา ¥3,200 รับจองเฉพาะรอบตั้งแต่ 15:00 น. และวันที่ราคา ¥3,500 ไม่รับจอง",
  },
  {
    ticket: "ตั๋วเข้าชม",
    who: "เด็ก — นักเรียนประถมและมัธยมต้น",
    price: "¥1,400 – ¥1,650",
    what: "ประมาณครึ่งหนึ่งของราคาผู้ใหญ่ตลอดช่วงราคา",
  },
  {
    ticket: "ตั๋วเข้าชม",
    who: "เด็กเล็ก — อายุ 3 ปีขึ้นไป",
    price: "¥700 – ¥800",
    what: "หนึ่งในสี่ของราคาผู้ใหญ่",
  },
  {
    ticket: "ตั๋วเข้าชม",
    who: "อายุ 2 ปีหรือต่ำกว่า",
    price: "ฟรี",
    what: "ไม่ต้องใช้ตั๋ว",
  },
  {
    ticket: "ตั๋วเข้าชม ส่วนลดผู้พิการ",
    who: "ผู้ถือบัตรผู้พิการและผู้ดูแล 1 คน",
    price: "ครึ่งหนึ่งของราคาข้างต้น",
    what: "ใช้สมุดบัตร แอป Mirairo ID หรือ My Number Portal เป็นหลักฐานได้ แต่ใช้ภาพหน้าจอไม่ได้",
  },
  {
    ticket: "ชุดตั๋วไคยูคัง + เรือซานตามาเรียรอบกลางวัน",
    who: "ผู้ใหญ่ / มัธยมต้น / ประถม",
    price: "เริ่มต้น ¥4,200 / ¥2,900 / ¥2,150",
    what: "ถ้าซื้อแยกที่ราคาเข้าชมต่ำสุดจะเป็น ¥4,700 / ¥3,400 / ¥2,400 ผู้ให้บริการเรือแจ้งว่าราคาชุดตั๋วอาจเปลี่ยนในช่วงไฮซีซัน",
  },
];

const timingRows = [
  {
    when: "ตัวเลือกที่ดีที่สุด",
    official: "ค่าเข้าชมเป็นราคาที่กำหนดตามวันที่ให้สอดคล้องกับความต้องการ",
    means: "เลือกวันที่ราคาอยู่ช่วงต่ำในปฏิทินราคา ถ้าเป็นไปได้ให้เป็นวันธรรมดานอกช่วงปิดเทอม และเลือกรอบเข้าตั้งแต่ช่วงบ่ายแก่ ๆ",
  },
  {
    when: "วันที่คนมากที่สุด (ราคาสูงสุด)",
    official: "วันที่ผู้ใหญ่ราคา ¥3,200 รับจองเฉพาะรอบตั้งแต่ 15:00 น. วันที่ผู้ใหญ่ราคา ¥3,500 ไม่รับจอง",
    means: "ราคาที่สูงในปฏิทินคือสัญญาณว่าคนจะมาก วันแบบนี้ควรวางแผนไปช่วงบ่าย",
  },
  {
    when: "ไปโดยไม่มีตั๋ว",
    official: "จุดขายตั๋วหน้างานขายเฉพาะตั๋ววันนั้น ตั้งแต่เปิดจนถึงเวลาเข้าชมรอบสุดท้าย อาจไม่ได้รอบเวลาที่ต้องการและอาจต้องรอ",
    means: "ซื้อตั๋วออนไลน์แบบระบุวันและรอบเวลาแทน ซึ่งเปิดขายล่วงหน้าประมาณ 30 วัน",
  },
  {
    when: "ตั้งแต่ 17:00 น.",
    official: "โปรแกรมช่วงค่ำ 17:00–20:00 น. เข้าชมรอบสุดท้าย 19:00 น. เวลาเปลี่ยนตามฤดูกาล",
    means: "ใช้ตั๋วใบเดิม แต่แสงไฟและเสียงเพลงเปลี่ยนไป เป็นช่วงเย็นที่คนส่วนใหญ่ไม่เลือก",
  },
  {
    when: "เดินชมหนึ่งรอบ",
    official: "เส้นทางชมแบบทางเดียวใช้เวลา 90–120 นาทีต่อหนึ่งรอบ และยกเลิกการกลับเข้าชมซ้ำตั้งแต่ 15 มิถุนายน 2026",
    means: "เผื่อเวลาด้านในสองชั่วโมง และกินข้าวก่อนเข้าหรือหลังออก ไม่ใช่ระหว่างทาง",
  },
];

const nearbyRows = [
  {
    what: "จับคู่ง่ายที่สุด: เรือซานตามาเรียรอบกลางวัน",
    time: "ประมาณ 45 นาที รอบกลางวัน 11:00–16:00 น. ออกทุกต้นชั่วโมง",
    price: "ผู้ใหญ่ ¥2,000 ประถม ¥1,000 (เด็กก่อนวัยเรียนฟรี 1 คนต่อผู้ใหญ่ 1 คน)",
    pass: "ใช้ได้",
    note: "ขึ้นเรือที่ท่าเรือ Kaiyukan Nishi Hatoba ข้างพิพิธภัณฑ์ งดเดินเรือ 31 ธันวาคม และ 12 มกราคม – 5 กุมภาพันธ์ ขึ้นอยู่กับสภาพอากาศและคลื่นลม",
  },
  {
    what: "ชิงช้าสวรรค์ยักษ์เท็มโปซัน (112.5 ม.)",
    time: "อยู่ติดกัน เปิด 10:00–21:00 น. วันธรรมดา และ 10:00–22:00 น. วันหยุดสุดสัปดาห์และวันหยุดนักขัตฤกษ์",
    price: "¥1,000 (ราคาปกติตามรายการของพาส)",
    pass: "ใช้ได้",
    note: "เป็นผู้ให้บริการคนละราย จึงไม่มีชุดตั๋วไคยูคัง + ชิงช้าสวรรค์ ผู้ให้บริการเรือขายชุดตั๋วชิงช้าสวรรค์ + เรือซานตามาเรีย",
  },
  {
    what: "เรือ Captain Line ไป Universal Studios Japan",
    time: "ข้ามฟากประมาณ 10 นาที 9:30–20:00 น. ตารางเดินเรือเปลี่ยนทุกเดือน",
    price: "ไป–กลับ ¥1,700 (ราคาปกติตามรายการของพาส)",
    pass: "ใช้ได้",
    note: "ท่าเรือ Universal City Port อยู่ห่างจากสถานียูนิเวอร์แซลซิตี้ (JR สายยูเมะซากิ) เดินประมาณ 5 นาที ไคยูคังขายชุดตั๋วรวม Captain Line",
  },
  {
    what: "LEGOLAND Discovery Center Osaka",
    time: "อยู่ในอาคารเดียวกัน วันธรรมดา 10:00–18:00 น. (เข้ารอบสุดท้าย 16:00 น.) วันหยุดสุดสัปดาห์ 10:00–19:00 น. (เข้ารอบสุดท้าย 17:00 น.)",
    price: "ดูที่เว็บไซต์ผู้ให้บริการ",
    pass: "เฉพาะวันที่ระบุ ต้องจองล่วงหน้า",
    note: "ไม่รับกลุ่มผู้ใหญ่ล้วนหรือเด็กล้วน ไคยูคังขายชุดตั๋วรวม LEGOLAND",
  },
];

const factRows = [
  {
    item: "รูปแบบตั๋ว",
    value: "เข้าชมตามวันและรอบเวลา ราคาเปลี่ยนตามวันที่ ตั๋วออนไลน์โดยหลักการเปิดขายล่วงหน้า 30 วัน",
    source: "kaiyukan.com/info/ticket/",
  },
  {
    item: "จุดขายตั๋วหน้างาน",
    value: "ขายเฉพาะตั๋ววันนั้น ตั้งแต่เปิดจนถึงเวลาเข้าชมรอบสุดท้าย รอบเวลาที่ต้องการอาจขายหมดแล้ว",
    source: "kaiyukan.com/info/ticket/",
  },
  {
    item: "กฎของวันที่คนมากที่สุด",
    value: "วันที่ผู้ใหญ่ราคา ¥3,200 รับจองเฉพาะรอบตั้งแต่ 15:00 น. วันที่ผู้ใหญ่ราคา ¥3,500 ไม่รับจอง",
    source: "kaiyukan.com/info/group/",
  },
  {
    item: "โปรแกรมช่วงค่ำ",
    value: "17:00–20:00 น. เข้าชมรอบสุดท้าย 19:00 น. เวลาเปลี่ยนตามฤดูกาล",
    source: "kaiyukan.com/program/night/",
  },
  {
    item: "การกลับเข้าชมซ้ำ",
    value: "ยกเลิกตั้งแต่ 15 มิถุนายน 2026 ตั๋วหนึ่งใบเข้าได้ครั้งเดียว",
    source: "kaiyukan.com/about/news/20564.html",
  },
  {
    item: "อายุต่ำกว่า 3 ปี",
    value: "อายุ 2 ปีหรือต่ำกว่าเข้าฟรี",
    source: "kaiyukan.com/info/ticket/kaiyukan/",
  },
  {
    item: "ทารก",
    value: "ห้องดูแลทารก (เตียงเปลี่ยนผ้าอ้อม เครื่องจ่ายน้ำร้อนชงนม) และห้องให้นม",
    source: "kaiyukan.com/info/area/",
  },
  {
    item: "ล็อกเกอร์และรถเข็น",
    value: "มีล็อกเกอร์ใกล้ทางเข้า ใน Kaiyukan Hall และข้างร้านของที่ระลึก ยืมรถเข็นผู้พิการได้ที่จุดประชาสัมพันธ์",
    source: "kaiyukan.com/info/area/",
  },
  {
    item: "การเดินทาง",
    value: "สถานีโอซาก้าโค (สาย Chuo) ทางออก 1 เดินประมาณ 5 นาที ที่จอดรถประมาณ 1,000 คัน",
    source: "kaiyukan.com/info/access/",
  },
];

const whoFor = [
  {
    title: "ซื้อตั๋วออนไลน์แบบระบุวันและรอบเวลา ถ้า…",
    desc: `คุณไปวันหยุดสุดสัปดาห์ ช่วงวันหยุดยาว หรือวางแผนล่วงหน้าได้ ตั๋วออนไลน์ของผู้ให้บริการจะระบุวันและรอบเวลาเข้าชม และเปิดขายล่วงหน้าประมาณ 30 วันก่อนวันเข้าชม ผู้ให้บริการยังเตือนว่าตั๋ววันนั้นจากจุดขายหน้างานอาจไม่ได้รอบเวลาที่ต้องการ ตรวจสอบเมื่อ ${CHECKED}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <circle cx="12" cy="15" r="2.5" />
      </svg>
    ),
  },
  {
    title: "ไปช่วงเย็น ถ้า…",
    desc: `คุณอยากได้บรรยากาศที่คนน้อยลงและราคาถูกลง ตั้งแต่ 17:00 น. แสงไฟและเสียงเพลงจะเปลี่ยนเป็นโปรแกรมช่วงค่ำ และในวันที่ปิด 20:00 น. เข้าชมรอบสุดท้ายได้ถึง 19:00 น. วันที่ผู้ใหญ่ราคาสูงสุด ¥3,200 รับจองเฉพาะรอบตั้งแต่ 15:00 น. วันที่คนมากที่สุดจึงทำให้คุณต้องไปช่วงบ่ายอยู่แล้ว ตรวจสอบเมื่อ ${CHECKED}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "ซื้อชุดตั๋วรวม ถ้า…",
    desc: "วันนั้นคุณจะเที่ยวทั้งย่านริมน้ำเท็มโปซัน ไม่ใช่แค่ดูตู้ปลา ชุดตั๋วทางการของพิพิธภัณฑ์มีให้เพิ่มเรือซานตามาเรียล่องอ่าว เรือ Captain Line ไปยูนิเวอร์แซลซิตี้ หรือ LEGOLAND ที่อยู่ติดกัน และควรสังเกตสิ่งที่ไม่อยู่ในรายการด้วย ชิงช้าสวรรค์ยักษ์เท็มโปซันเป็นผู้ให้บริการคนละราย จึงไม่มีตั๋วทางการแบบพิพิธภัณฑ์ + ชิงช้าสวรรค์",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15h18l-2 5H5z" />
        <path d="M12 3v9M12 3l6 3-6 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "ดูวันที่ของคุณในปฏิทินราคาก่อนอย่างอื่น",
    desc: `ไคยูคังใช้ระบบราคาแปรผัน (価格変動制) ค่าเข้าชมจึงกำหนดตามวันที่ให้สอดคล้องกับความต้องการ ไม่มีราคาเดียวให้เปิดดู ราคาผู้ใหญ่อยู่ที่ ¥2,700 ถึง ¥3,200 และผู้ให้บริการยังแจ้งถึงราคา ¥3,200 ที่รับจองเฉพาะรอบตั้งแต่ 15:00 น. กับราคา ¥3,500 ที่ไม่รับจองเลย วันที่คุณไปจะเป็นตัวกำหนดว่าใช้ราคาไหน ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    title: "เลือกรอบเวลาเข้าชม ไม่ใช่แค่วัน",
    desc: `ตั๋วออนไลน์ทางการเป็นตั๋วระบุวันและรอบเวลา (ตรวจสอบเมื่อ ${CHECKED}) โดยรอบเวลาแบ่งทุก 15 นาที (ตรวจสอบเมื่อ ${SET_CHECKED}) การเลือกรอบเวลาคือวิธีหลีกเลี่ยงคนมาก ผู้ให้บริการคุมจำนวนผู้เข้าชมในแต่ละรอบให้คงที่ และในวันที่คนมากที่สุดจะรับจองเฉพาะรอบตั้งแต่ 15:00 น.`,
  },
  {
    title: "จองล่วงหน้าประมาณ 30 วัน",
    desc: `ผู้ให้บริการระบุว่าตั๋วออนไลน์โดยหลักการเปิดขาย 30 วันก่อนวันเข้าชม และจุดขายหน้างานขายเฉพาะตั๋ววันนั้น ตั้งแต่เปิดจนถึงเวลาเข้าชมรอบสุดท้าย จึงมีช่วงเวลาจองที่ชัดเจน ไม่ต้องรีบจองตอนเที่ยงคืนสองสัปดาห์ก่อนเหมือนจุดชมวิวที่ต้องจองรอบในโตเกียว แต่ก็ไม่ได้จองได้ตลอด ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    title: "ถ้าต้องการหน้าชำระเงินภาษาไทยหรือใช้บัตรต่างประเทศ ให้ซื้อผ่านตัวแทนจำหน่าย",
    desc: "ระบบตั๋วออนไลน์ทางการเน้นภาษาญี่ปุ่น ใน Klook คุณซื้อตั๋วเข้าชมแบบเดียวกันด้วยบัตรต่างประเทศผ่านหน้าภาษาไทย และได้โค้ดไว้สแกนตอนเข้า ชุดตั๋วรวมและแพ็กเกจ Osaka Amazing Pass ก็อยู่ในที่เดียวกัน ก่อนจ่ายเงินให้ตรวจสอบกำหนดยกเลิกและดูว่าสินค้านั้นระบุวันหรือไม่ เพราะแต่ละรายการกำหนดไม่เหมือนกัน",
  },
  {
    title: "วางแผนอยู่ด้านในให้จบ เพราะยกเลิกการกลับเข้าชมซ้ำแล้ว",
    desc: `นี่คือกฎที่คู่มือเที่ยวหลายแห่งยังไม่ได้อัปเดต ไคยูคังยกเลิกการกลับเข้าชมซ้ำเมื่อ 15 มิถุนายน 2026 โดยให้เหตุผลว่าต้องการคุมจำนวนผู้เข้าชมในแต่ละรอบเวลาให้คงที่ การออกไปกินข้าวที่ Tempozan Marketplace แล้วกลับมาเดินรอบที่สองจึงทำไม่ได้อีกต่อไป ตั๋วหนึ่งใบเข้าได้ครั้งเดียว ตรวจสอบเมื่อ ${CHECKED}`,
  },
];

/** The five questions in the FAQPage markup, as on the English page. */
const faqItems: FaqItem[] = [
  {
    q: "ตั๋วไคยูคังราคาเท่าไร",
    a: `ตั๋วไคยูคังราคาผู้ใหญ่ (นักเรียนมัธยมปลายหรืออายุ 16 ปีขึ้นไป) ¥2,700–¥3,200 นักเรียนประถมและมัธยมต้น ¥1,400–¥1,650 เด็กเล็กอายุ 3 ปีขึ้นไป ¥700–¥800 ส่วนอายุ 2 ปีหรือต่ำกว่าเข้าฟรี พิพิธภัณฑ์ใช้ระบบราคาแปรผัน ราคาที่แน่นอนจึงกำหนดตามวันที่ในปฏิทินราคา และวันที่คนมากจะอยู่ช่วงบนของราคา ผู้ถือบัตรผู้พิการและผู้ดูแล 1 คนจ่ายครึ่งราคา ชุดตั๋วไคยูคัง + เรือซานตามาเรียสำหรับผู้ใหญ่เริ่มต้น ¥4,200 ตรวจสอบจาก kaiyukan.com และ suijo-bus.osaka เมื่อ ${CHECKED}`,
  },
  {
    q: "ต้องจองตั๋วพิพิธภัณฑ์สัตว์น้ำโอซาก้าล่วงหน้าไหม",
    a: `ไม่บังคับ แต่แนะนำให้จอง การเข้าชมเป็นแบบระบุวันและรอบเวลา จุดขายหน้างานขายเฉพาะตั๋ววันนั้นและเตือนว่าอาจไม่ได้รอบเวลาที่ต้องการและอาจต้องรอ ส่วนตั๋วออนไลน์ทางการจะยืนยันรอบเวลาของคุณ และเปิดขายประมาณ 30 วันก่อนวันเข้าชม ในวันที่ราคาสูงสุด กฎการจองเข้มงวดกว่า วันที่ผู้ใหญ่ราคา ¥3,200 รับจองเฉพาะรอบตั้งแต่ 15:00 น. และวันที่ราคา ¥3,500 ไม่รับจอง ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ต้องใช้เวลาที่ไคยูคังนานเท่าไร",
    a: `พิพิธภัณฑ์ระบุว่าเส้นทางชมแบบทางเดียวใช้เวลา 90–120 นาทีต่อหนึ่งรอบ เส้นทางจะพาขึ้นไปชั้นบนสุดก่อน แล้ววนลงมาผ่านตู้ต่าง ๆ รวมถึงตู้มหาสมุทรแปซิฟิกที่มีฉลามวาฬ จึงเดินเพียงรอบเดียว ตั้งแต่ยกเลิกการกลับเข้าชมซ้ำเมื่อ 15 มิถุนายน 2026 ควรวางแผนเป็นช่วงเวลาต่อเนื่องช่วงเดียว แล้วเผื่อเวลาสำหรับเรือซานตามาเรีย (ประมาณ 45 นาที) หรือชิงช้าสวรรค์ที่อยู่ติดกัน ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ควรไปไคยูคังช่วงไหนดีที่สุด",
    a: `วันธรรมดาที่ราคาอยู่ช่วงต่ำในปฏิทินราคา และเข้าตั้งแต่ช่วงบ่ายแก่ ๆ ผู้ให้บริการไม่ได้เผยแพร่การคาดการณ์จำนวนคน แต่ราคากำหนดตามความต้องการ วันที่ราคาสูงสุด (¥3,200) รับจองเฉพาะรอบตั้งแต่ 15:00 น. และโปรแกรมช่วงค่ำคือ 17:00–20:00 น. เข้าชมรอบสุดท้าย 19:00 น. (เวลาเปลี่ยนตามฤดูกาล) ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ใช้ Osaka Amazing Pass เข้าไคยูคังได้ไหม",
    a: `ไม่ได้ ไคยูคังไม่อยู่ในรายชื่อสถานที่ที่ร่วมรายการของ Osaka Amazing Pass ที่ตรวจสอบเมื่อ ${CHECKED} แต่พาส (1 วัน ¥3,500) ใช้กับสามอย่างที่อยู่ติดกันได้ คือชิงช้าสวรรค์ยักษ์เท็มโปซัน เรือซานตามาเรียรอบกลางวัน และเรือ Captain Line ไป Universal City Port ถ้าวันที่ไปเท็มโปซันคุณใช้สิ่งเหล่านี้ด้วย พาสก็ยังคุ้มค่าได้ Klook ยังขายแพ็กเกจ Amazing Pass + ไคยูคังที่จ่ายเงินครั้งเดียวด้วย`,
  },
];

/** Further questions shown on the page but kept out of the FAQPage markup. */
const moreFaqItems: FaqItem[] = [
  {
    q: "ทำไมราคาตั๋วไคยูคังถึงเปลี่ยนตามวันที่",
    a: `เพราะพิพิธภัณฑ์เลือกใช้ระบบนี้ ไคยูคังระบุว่านำระบบราคาแปรผัน (価格変動制) มาใช้เพื่อตั้ง “ราคาที่เหมาะสม” ตามความต้องการ และรับผู้เข้าชมได้มากขึ้น ในทางปฏิบัติ วันอังคารที่เงียบในเดือนกุมภาพันธ์กับวันเสาร์ในช่วงโกลเด้นวีคจึงมีราคาต่างกัน และราคาเดียวที่เขียนไว้บนเว็บอื่นไม่มีทางถูกต้องทั้งสองวัน ราคาเองยังบอกได้ว่าคนจะมากแค่ไหน ถ้าวันที่คุณไปอยู่ช่วงบนของราคา วันนั้นคนจะมาก เหตุผลและประกาศเรื่องราคาแปรผันตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "พิพิธภัณฑ์สัตว์น้ำไคยูคังเปิดกี่โมงถึงกี่โมง",
    a: `แตกต่างกันตามวันที่ ผู้ให้บริการประกาศเวลาเปิดเป็นปฏิทิน ไม่ใช่ตารางตายตัว และขอให้ผู้เข้าชมตรวจสอบวันของตัวเอง ซึ่งเป็นคำแนะนำที่ควรทำตาม รูปแบบทั่วไปคือเปิด 10:00 น. ปิด 20:00 น. เข้าชมรอบสุดท้าย 1 ชั่วโมงก่อนปิด และมีวันหยุดไม่กี่วันในเดือนมกราคมและกุมภาพันธ์ (ตรวจสอบเมื่อ ${SET_CHECKED}) หน้าโปรแกรมช่วงค่ำระบุ 17:00–20:00 น. เข้าชมรอบสุดท้าย 19:00 น. และเวลาเปลี่ยนตามฤดูกาล (ตรวจสอบเมื่อ ${CHECKED}) ตรวจสอบวันของคุณในปฏิทินก่อนวางแผนทั้งวัน`,
  },
  {
    q: "ที่ไคยูคังมีล็อกเกอร์หยอดเหรียญไหม",
    a: `มี 3 จุด คือใกล้ทางเข้าพิพิธภัณฑ์ ใน Kaiyukan Hall และใกล้ร้านของที่ระลึก ล็อกเกอร์ใน Kaiyukan Hall และข้างร้านใช้ได้โดยไม่ต้องมีตั๋วเข้าชม และยังมีล็อกเกอร์ใน Tempozan Marketplace และใต้ชิงช้าสวรรค์ ยืมรถเข็นผู้พิการได้ที่จุดประชาสัมพันธ์ ตรวจสอบจาก kaiyukan.com/info/area/ เมื่อ ${CHECKED}`,
  },
  {
    q: "ช่วงปีใหม่ ตั๋วไคยูคังแพงขึ้นไหม",
    a: `ให้ดูราคาของวันที่คุณไปในปฏิทิน เพราะหน้าเว็บทางการที่ตรวจสอบเมื่อ ${CHECKED} ไม่ได้เขียนราคาช่วงพฤศจิกายนถึงปีใหม่เป็นข้อความ ราคาของแต่ละวันแสดงเฉพาะในปฏิทินราคา สิ่งที่ผู้ให้บริการประกาศไว้คือกฎของช่วงราคาสูง วันที่ผู้ใหญ่ราคา ¥3,200 รับจองเฉพาะรอบตั้งแต่ 15:00 น. และวันที่ผู้ใหญ่ราคา ¥3,500 ไม่รับจองเลย ถ้าวันที่คุณไปอยู่ในช่วงวันหยุด ให้ดูทันทีที่ตั๋วออนไลน์เปิดขายประมาณ 30 วันล่วงหน้า`,
  },
  {
    q: "เดินทางไปพิพิธภัณฑ์สัตว์น้ำไคยูคังอย่างไร",
    a: `เส้นทางหลักคือรถไฟใต้ดิน Osaka Metro สาย Chuo ไปสถานีโอซาก้าโค ซึ่งชื่อทางการคือ 大阪港駅（海遊館前） แปลว่า “สถานีโอซาก้าโค หน้าไคยูคัง” แล้วออกทางออก 1 เดินประมาณ 5 นาที ถ้ามาจากฝั่ง Universal Studios Japan เรือ Captain Line จะเทียบท่า Kaiyukan Nishi Hatoba หน้าทางเข้าพอดี รถเมล์ Osaka City Bus จอดป้าย Tempozan Harbor Village และรถเมล์ Nankai Bus จอดป้าย Kaiyukan (Tempozan) และมีที่จอดรถประมาณ 1,000 คัน ทั้งหมดตรวจสอบจาก kaiyukan.com/info/access/ เมื่อ ${CHECKED}`,
  },
  {
    q: "ออกไปกินข้าวกลางวันแล้วกลับเข้าไคยูคังได้ไหม",
    a: `ไม่ได้แล้ว และนี่คือรายละเอียดที่คู่มือส่วนใหญ่ยังเขียนผิด ไคยูคังประกาศยกเลิกการกลับเข้าชมซ้ำตั้งแต่ 15 มิถุนายน 2026 โดยให้เหตุผลว่าต้องการคุมจำนวนผู้เข้าชมในแต่ละรอบเวลาให้คงที่ เพื่อให้ทุกคนชมนิทรรศการได้ตามจังหวะของตัวเอง ให้กินข้าวก่อนเข้าหรือหลังออก คนส่วนใหญ่กินที่ Tempozan Marketplace ที่อยู่ติดกัน และตั๋วเข้าชมยังใช้เป็นคูปองส่วนลดที่นั่นได้ด้วย ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "เที่ยวไคยูคังพร้อมชิงช้าสวรรค์เท็มโปซันหรือเรือซานตามาเรียได้ไหม",
    a: `ได้บางส่วน และความต่างนี้สำคัญตอนซื้อ พิพิธภัณฑ์ขายชุดตั๋วทางการรวมกับสามอย่าง คือเรือซานตามาเรีย เรือจำลองเรือใบที่ล่องอ่าวโอซาก้าประมาณ 45 นาที (ชุดตั๋วผู้ใหญ่เริ่มต้น ¥4,200) เรือ Captain Line ไป Universal City Port ข้ามน้ำประมาณ 10 นาที และ LEGOLAND Discovery Center Osaka ในอาคารเดียวกัน ส่วนชิงช้าสวรรค์ยักษ์เท็มโปซัน สูง 112.5 เมตร ใน Harbor Village เดียวกัน ไม่อยู่ในรายการและเป็นผู้ให้บริการคนละราย จึงไม่มีตั๋วทางการแบบพิพิธภัณฑ์ + ชิงช้าสวรรค์ ให้ซื้อตั๋วชิงช้าสวรรค์ในวันนั้น หรือใช้ Osaka Amazing Pass ซึ่งใช้กับชิงช้าสวรรค์ได้ ทั้งหมดตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "พาเด็กเล็กไปไคยูคังคุ้มไหม",
    a: `เป็นหนึ่งในสถานที่ท่องเที่ยวหลักของโอซาก้าที่ไปกับครอบครัวได้ง่าย ข้อควรระวังเป็นเรื่องการวางแผน ไม่ใช่เรื่องความสนุก อายุต่ำกว่า 3 ปีเข้าฟรี อายุ 3 ปีขึ้นไป ¥700–800 เส้นทางเป็นทางเดียวไม่ซับซ้อน และไฮไลต์อย่างฉลามวาฬในตู้มหาสมุทรแปซิฟิกกับเพนกวินแอนตาร์กติกก็เป็นสิ่งที่เด็กเล็กอยากดูจริง ๆ ในอาคารมีห้องดูแลทารกพร้อมเตียงเปลี่ยนผ้าอ้อมและเครื่องจ่ายน้ำร้อนชงนม และมีห้องให้นม สิ่งที่ต้องวางแผนคือการยกเลิกการกลับเข้าชมซ้ำ ซึ่งทำให้ต้องชมให้จบในครั้งเดียว และเวลา 90–120 นาทีต่อหนึ่งรอบตามที่ผู้ให้บริการระบุ หน้าเว็บทางการที่ตรวจสอบไม่ได้ระบุกฎเรื่องรถเข็นเด็ก ถ้าต้องรู้ก่อนไปให้สอบถามที่ทางเข้า ราคาและสิ่งอำนวยความสะดวกตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "วันฝนตกในโอซาก้า ไปไคยูคังดีไหม",
    a: "เป็นตัวเลือกที่ดีที่สุดอย่างหนึ่ง แต่มีข้อจำกัดอยู่ข้อเดียว พิพิธภัณฑ์อยู่ในร่มทั้งหมด และ Tempozan Marketplace ที่อยู่ติดกันก็มีหลังคา ฝนจึงไม่กระทบการชมด้านใน แต่จากทางออก 1 ของสถานีโอซาก้าโคยังต้องเดิน 5 นาที และสิ่งที่นิยมจับคู่กันอย่างเรือซานตามาเรียล่องอ่าวกับชิงช้าสวรรค์ ก็เป็นส่วนของการเที่ยวเท็มโปซันที่ฝนทำให้เที่ยวไม่สนุก โดยเฉพาะเรือซานตามาเรียที่ออกเรือตามสภาพอากาศและคลื่นลม ถ้าพยากรณ์อากาศไม่ดี ให้ซื้อแค่ตั๋วเข้าชม แล้วเก็บเรือกับชิงช้าสวรรค์ไว้วันอื่น",
  },
];

/** Thai copy per English card, keyed by the card's kind (each kind appears once). */
const SAME_DAY_TH: Record<string, Partial<KlookSameDayCard>> = {
  Cruise: {
    kind: "ล่องเรือ",
    label: "เรือซานตามาเรียรอบกลางวัน",
    ctaLabel: "ดูเรือซานตามาเรีย →",
    why: "ล่องรอบอ่าวโอซาก้าประมาณ 45 นาที จากท่าเรือข้างพิพิธภัณฑ์ รอบกลางวันออกทุกต้นชั่วโมง",
  },
  Hotel: {
    kind: "โรงแรม",
    label: "โรงแรมใกล้ Universal Studios Japan (ยูนิเวอร์แซลซิตี้)",
    ctaLabel: "ดูโรงแรมย่านยูนิเวอร์แซลซิตี้ →",
    why: "เรือ Captain Line ข้ามจาก Universal City Port มาถึงหน้าพิพิธภัณฑ์ในประมาณ 10 นาที",
  },
  Pass: {
    kind: "พาส",
    label: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    ctaLabel: "ดู Osaka Amazing Pass →",
    why: "ใช้เข้าไคยูคังไม่ได้ แต่ใช้กับชิงช้าสวรรค์เท็มโปซัน เรือซานตามาเรีย และ Captain Line ที่อยู่ติดกันได้",
  },
  Activity: {
    kind: "กิจกรรม",
    label: "ชิงช้าสวรรค์ยักษ์เท็มโปซัน",
    ctaLabel: "ดูชิงช้าสวรรค์ →",
    why: "ชิงช้าสวรรค์สูง 112.5 ม. อยู่ในย่านเท็มโปซันเดียวกับพิพิธภัณฑ์ เป็นอีกครึ่งหนึ่งของการเที่ยวริมท่าเรือ",
  },
  "Food tour": {
    kind: "ฟู้ดทัวร์",
    label: "ฟู้ดทัวร์โดทงโบริช่วงกลางวัน",
    ctaLabel: "ดูฟู้ดทัวร์ →",
    why: "ทัวร์ระบุเวลา 11:00–14:00 น. จึงไปก่อนรอบเข้าพิพิธภัณฑ์ช่วงบ่ายที่เดินทางด้วยสาย Chuo ได้พอดี",
  },
  eSIM: {
    kind: "eSIM",
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM ของ Klook →",
    why: "ตั๋วออนไลน์แบบระบุรอบของพิพิธภัณฑ์และเส้นทางไปสถานีโอซาก้าโคอยู่ในมือถือทั้งหมด การมีอินเทอร์เน็ตมือถือตั้งแต่สนามบินจึงช่วยให้เปิดดูได้ตลอด",
  },
  "Airport train": {
    kind: "รถไฟสนามบิน",
    label: "ตั๋วรถไฟด่วนพิเศษ Nankai Rapi:t",
    ctaLabel: "ดูตั๋ว Rapi:t →",
    why: "รถไฟที่นั่งจองระหว่างสนามบินคันไซกับนัมบะ สำหรับวันเดินทางถึงหรือวันออกจากโอซาก้า",
  },
};

const sameDayCards: KlookSameDayCard[] = kaiyukanSameDayCards.map((card) =>
  withKlookLocale(card, LOCALE, SAME_DAY_TH[card.kind] ?? {}),
);

// The same-day cards under the main CTA leave the lower blocks, as on the English page.
const notInTopCards = (item: { url: string }) => !kaiyukanSameDayCards.some((c) => c.url === item.url);

// On the English page every item of kaiyukanSameDayPrep is also a same-day card, so this block
// renders its heading and intro with no lines, exactly as the English one does.
const sameDayPrepItems: KlookTripPrepItem[] = kaiyukanSameDayPrep
  .filter(notInTopCards)
  .map((item) => withKlookLocale(item, LOCALE));

const HIGH_RATE_TH: Partial<KlookTripPrepItem>[] = [
  {
    label: "ตั๋วหอหลักปราสาทโอซาก้า",
    ctaLabel: "ดูตั๋วปราสาทโอซาก้า →",
    why: "เข้าชมหอหลัก 8 ชั้นและพิพิธภัณฑ์กำแพงหินโทโยโทมิ สแกนตั๋วที่ประตู ถ้ามี Osaka Amazing Pass ไม่ต้องซื้อ เพราะพาสใช้กับปราสาทได้อยู่แล้ว",
  },
  {
    label: "ตั๋วจุดชมวิว Umeda Sky Building",
    ctaLabel: "ดูตั๋ว Umeda Sky →",
    why: "ลานชมวิวดาดฟ้าวงแหวนสูง 173 ม. บนตึกแฝด เดินจากสถานีโอซาก้าได้ เหมาะแวะช่วงเย็น และใช้ Amazing Pass ได้เช่นกัน",
  },
  {
    label: "ทัวร์ 1 วัน ปราสาทโอซาก้า Umeda Sky Building และล่องเรือทงโบริ",
    ctaLabel: "ดูทัวร์ 1 วันในโอซาก้า →",
    why: "เที่ยวปราสาท จุดชมวิวอุเมดะ และล่องเรือ Tombori River Cruise ที่โดทงโบริกับไกด์ในวันเดียว โดยไกด์จัดเส้นทางให้",
  },
];

const highRateItems: KlookTripPrepItem[] = osakaSightsHighRatePrep.map((item, i) =>
  withKlookLocale(item, LOCALE, HIGH_RATE_TH[i] ?? {}),
);

const tourPicks = [osakaSkyVistaHalfDayBusTour, osakaPrivateWalkingTour].filter(notInTopCards).map((tour) =>
  withKlookLocale(
    tour,
    LOCALE,
    tour.url === osakaSkyVistaHalfDayBusTour.url
      ? {
          title: "ทัวร์รถบัส 2 ชั้น Osaka Sky Vista ครึ่งวัน",
          desc: "ทัวร์กลุ่มครึ่งวันบนรถบัส 2 ชั้นแบบเปิดหลังคา ผ่านปราสาทโอซาก้า โดทงโบริ และหอสึเท็นคาคุ",
        }
      : {
          title: "ทัวร์เดินเที่ยวโอซาก้าแบบส่วนตัว ครึ่งวัน / เต็มวัน",
          desc: "เดินเที่ยวย่านนัมบะและชินไซบาชิตามเส้นทางที่คุณเลือก กับไกด์ส่วนตัวที่พูดภาษาอังกฤษหรือญี่ปุ่น",
        },
  ),
);

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋วพิพิธภัณฑ์สัตว์น้ำไคยูคัง" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h || `blank-${i}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.86rem" }}>
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

export default function ThOsakaAquariumKaiyukanTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG.th }),
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
            ราคาตั๋วไคยูคังตามอายุ สัญญาณทางการที่บอกว่าวันไหนคนมาก เวลาที่ใช้เดินชมหนึ่งรอบ และสิ่งที่เที่ยวคู่กันได้ที่เท็มโปซัน ทั้งชิงช้าสวรรค์ เรือซานตามาเรีย และเรือไป Universal Studios Japan
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ช่วงราคาทางการ พร้อมวันที่ตรวจสอบ", "อธิบายกฎการกลับเข้าชมซ้ำ"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>ตั๋วพิพิธภัณฑ์สัตว์น้ำไคยูคัง โอซาก้า ราคาผู้ใหญ่ ¥2,700–¥3,200 นักเรียนประถมและมัธยมต้น ¥1,400–¥1,650 เด็กเล็กอายุ 3 ปีขึ้นไป ¥700–¥800 และอายุต่ำกว่า 3 ปีเข้าฟรี</strong> ราคากำหนดตามวันที่ภายใต้ระบบราคาแปรผันของพิพิธภัณฑ์ วันที่คนมากจึงอยู่ช่วงบนของราคา (kaiyukan.com ตรวจสอบเมื่อ {CHECKED}) การเข้าชมเป็นแบบระบุวันและรอบเวลา ไม่บังคับจอง แต่จุดขายหน้างานขายเฉพาะตั๋ววันนั้นและอาจไม่มีรอบเวลาที่คุณต้องการ ตั๋วออนไลน์ทางการที่เปิดขายล่วงหน้าประมาณ 30 วันจึงเป็นทางที่ปลอดภัยกว่า ไคยูคังอยู่ห่างจากทางออก 1 ของสถานีโอซาก้าโค Osaka Metro สาย Chuo เดินประมาณ 5 นาที และพิพิธภัณฑ์ระบุว่าเส้นทางชมแบบทางเดียวใช้เวลา 90–120 นาทีต่อหนึ่งรอบ
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดูตั๋วไคยูคังตามวันที่ของคุณใน Klook →
            </KlookLink>
          </div>
          <NextBookingBlock region="osaka" locale="th" />
        </section>

        <KlookSameDayCards
          heading="สิ่งที่ควรจองไว้สำหรับวันเที่ยวไคยูคัง"
          cards={sameDayCards}
          footnote={
            <>
              Osaka Amazing Pass ใช้เข้าไคยูคังไม่ได้ (รายชื่อสถานที่ของ osaka-amazing-pass.com ตรวจสอบเมื่อ 23 พฤศจิกายน 2026) แต่ใช้กับชิงช้าสวรรค์เท็มโปซันและเรือซานตามาเรียได้ ถ้าเดินทางเข้าหรือออกทางสนามบินคันไซโดยผ่านเกียวโต ชินโอซาก้า หรือเทนโนจิ{" "}
              <KlookLink href={HARUKA_URL} adPlacement="same-day-cards" target="_blank" rel={KLOOK_REL}>
                ดูตั๋ว JR Haruka ใน Klook →
              </KlookLink>{" "}
              ถ้านั่งรถไฟใต้ดินบ่อยกว่าเข้าสถานที่เสียค่าเข้าชม{" "}
              <KlookLink href={METRO_PASS_URL} adPlacement="same-day-cards" target="_blank" rel={KLOOK_REL}>
                ดูพาส Osaka Metro 1 วัน / 2 วันใน Klook →
              </KlookLink>{" "}
              (เปรียบเทียบกับ Enjoy Eco Card ที่ขายในตู้ของสถานีได้ใน{" "}
              <Link href="/guides/transport/osaka-metro-pass" hrefLang="en">
                คู่มือพาส Osaka Metro (ภาษาอังกฤษ)
              </Link>
              )
            </>
          }
        />

        <EsimCtaTop />

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>คำตอบสั้น ๆ</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ค่าเข้าชมผู้ใหญ่</p>
                <p className={styles.verdictStatValue}>¥2,700–3,200 ตามวันที่</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาที่ควรเผื่อ</p>
                <p className={styles.verdictStatValue}>90–120 นาที เดินทางเดียวหนึ่งรอบ</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การเดินทาง</p>
                <p className={styles.verdictStatValue}>สถานีโอซาก้าโค ทางออก 1 เดิน 5 นาที</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การจอง</p>
                <p className={styles.verdictStatValue}>ตั๋วออนไลน์ระบุวัน ล่วงหน้า 30 วัน</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ตั๋วพิพิธภัณฑ์สัตว์น้ำไคยูคังไม่ได้มีราคาเดียว พิพิธภัณฑ์ใช้ระบบราคาแปรผัน ผู้ใหญ่จึงจ่ายระหว่าง <strong>¥2,700 ถึง ¥3,200</strong> ตามวันที่ เด็กวัยเรียน <strong>¥1,400–1,650</strong> เด็กเล็กอายุ 3 ปีขึ้นไป <strong>¥700–800</strong> และอายุต่ำกว่า 3 ปีไม่เสียเงิน ให้ซื้อตั๋วออนไลน์ทางการแบบระบุวันและรอบเวลา ซึ่งยืนยันเวลาเข้าของคุณและเปิดขายประมาณ <strong>30 วัน</strong>ก่อนวันเข้าชม จุดขายหน้างานขายเฉพาะตั๋ววันนั้น ตั๋วออนไลน์จึงเป็นวิธีที่ไม่ต้องต่อคิวซื้อตั๋วด้วย เผื่อเวลา <strong>90–120 นาที</strong> (เวลาหนึ่งรอบที่พิพิธภัณฑ์ระบุ) และวางแผนให้ชมจบในครั้งเดียว เพราะ<strong>ยกเลิกการกลับเข้าชมซ้ำตั้งแต่ 15 มิถุนายน 2026</strong> เดินจากทางออก 1 ของสถานีโอซาก้าโคบนสาย Chuo 5 นาที และ Osaka Amazing Pass <strong>ใช้ไม่ได้</strong> ทั้งหมดตรวจสอบจาก kaiyukan.com เมื่อ {CHECKED}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋วไคยูคังใน Klook →
              </KlookLink>
              <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                แบบรวม Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>พิพิธภัณฑ์สัตว์น้ำไคยูคังคืออะไร</h2>
          <p className={styles.bodyText}>
            ไคยูคังคือพิพิธภัณฑ์สัตว์น้ำที่เท็มโปซัน ริมน้ำในเขตมินาโตะของโอซาก้า สร้างขึ้นจากแนวคิดเดียว คือการเดินผ่านถิ่นที่อยู่ของสัตว์รอบมหาสมุทรแปซิฟิก โดยมีตู้มหาสมุทรแปซิฟิกขนาดใหญ่ที่มีฉลามวาฬเป็นศูนย์กลาง ผู้ให้บริการระบุว่ามีสัตว์ประมาณ <strong>620 ชนิด 30,000 ตัว</strong> รวมถึงเพนกวินแอนตาร์กติกที่ผู้เข้าชมส่วนใหญ่พูดถึงหลังออกมา
          </p>
          <p className={styles.bodyText}>
            มีสามเรื่องที่ควรคิดก่อนซื้อตั๋ว ราคาเปลี่ยนตามวันที่ การไปครั้งเดียวกันจึงมีทั้งวันที่ถูกและวันที่แพง รอบเวลาเข้าชมถูกกำหนดตอนจอง และเป็นวิธีเดียวที่คุณควบคุมเรื่องคนมากได้ และตั้งแต่มิถุนายน 2026 ออกแล้วกลับเข้ามาไม่ได้ จึงต้องวางแผนให้ชมจบในช่วงเดียว ไม่ใช่แบ่งไปกินข้าวกลางวัน ส่วนที่เหลือของหน้านี้คือสามเรื่องนี้และตัวเลขที่อยู่เบื้องหลัง
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋วไคยูคังปี 2026 ราคาเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ตั๋วไคยูคังผู้ใหญ่ราคา ¥2,700 ถึง ¥3,200 และเด็ก ¥1,400 ถึง ¥1,650 ขึ้นอยู่กับวันที่ ไคยูคังระบุว่าค่าเข้าชมเป็นราคาแปรผัน (入館料は変動価格) และราคาของวันที่คุณไปจะแสดงในปฏิทินราคา ประเภทตั๋วตามอายุมีดังนี้
          </p>
          <Table
            head={["ตั๋ว", "สำหรับ", "ราคา (ทางการ)", "หมายเหตุ"]}
            rows={priceRows.map((r) => [r.ticket, r.who, <span key="p" style={{ whiteSpace: "nowrap" }}>{r.price}</span>, r.what])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {BANDS_CHECKED_ISO} — <a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a> (ช่วงราคาและประกาศการจอง) และ {CHECKED_ISO} — <a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a> (ราคาแปรผัน ปฏิทินราคา กฎส่วนลดผู้พิการ) และ <a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a> (ชุดตั๋ว)
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            หน้าการจองแบบกลุ่มเป็นหน้าที่เขียนช่วงราคาเป็นข้อความ ส่วนหน้าตั๋วหลักจะแสดงราคาที่แน่นอนเมื่อเลือกวันที่ในปฏิทินเท่านั้น หน้าที่ตรวจสอบไม่ได้เขียนราคาช่วงพฤศจิกายนถึงปีใหม่เป็นข้อความ ให้ดูวันหยุดในปฏิทินเอง ราคาอาจเปลี่ยนแปลง โปรดตรวจสอบวันที่ของคุณก่อนซื้อ ราคาค่าเข้าชมทั่วญี่ปุ่นพร้อมวันที่ตรวจสอบของแต่ละแห่งดูได้ใน{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดูตั๋วไคยูคังตามวันที่ของคุณใน Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            ราคาใน Klook ก็เปลี่ยนตามวันที่เช่นกัน โปรดดูหน้าสินค้าสำหรับวันของคุณและเงื่อนไขการยกเลิกก่อนจ่ายเงิน
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>กฎและสิ่งอำนวยความสะดวก</span>
          <h2 className={styles.sectionTitle}>กฎการเข้าชม เวลาเปิด และสิ่งอำนวยความสะดวกของไคยูคังเป็นอย่างไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            การเข้าชมเป็นแบบระบุวันและรอบเวลา ยกเลิกการกลับเข้าชมซ้ำแล้ว และช่วงค่ำเปิดถึง 20:00 น. เข้าชมรอบสุดท้าย 19:00 น. ทุกบรรทัดด้านล่างมาจากหน้าเว็บทางการที่ระบุ พร้อมวันที่ตรวจสอบ
          </p>
          <Table head={["หัวข้อ", "ข้อมูลทางการ", "แหล่งที่มา", "ตรวจสอบ"]} rows={factRows.map((r) => [r.item, r.value, r.source, CHECKED])} />
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>เลือกตั๋ว</span>
          <h2 className={styles.sectionTitle}>ควรซื้อตั๋วไคยูคังแบบไหน</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋วเข้าชมไคยูคังใน Klook →
            </KlookLink>
            <KlookLink href={LEGO_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              รวม LEGOLAND ที่อยู่ติดกัน →
            </KlookLink>
            <KlookLink href={NIFREL_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              รวม NIFREL ที่ EXPOCITY →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem" }}>
            LEGOLAND ที่อยู่ติดกันคือ Discovery Center ในร่ม ไม่ใช่สวนสนุกกลางแจ้ง สวนสนุกเต็มรูปแบบคือ LEGOLAND Japan ที่นาโกย่า ราคา เวลาเปิด และการนั่งรถไฟสาย Aonami จากสถานีนาโกย่าอยู่ใน{" "}
            <Link href="/guides/attractions/legoland-japan-tickets" hrefLang="en" style={linkStyle}>
              คู่มือตั๋ว LEGOLAND Japan (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เวลาเปิดและจำนวนคน</span>
          <h2 className={styles.sectionTitle}>ควรไปไคยูคังช่วงไหนดีที่สุด</h2>
          <p className={styles.bodyText}>
            <strong>วันธรรมดาที่ราคาอยู่ช่วงต่ำในปฏิทินราคา และเข้าตั้งแต่ช่วงบ่ายแก่ ๆ</strong> หน้าเว็บทางการที่ตรวจสอบเมื่อ {CHECKED} ไม่ได้เผยแพร่การคาดการณ์จำนวนคน แต่กฎการจองชี้ไปทางเดียวกัน ในวันที่ผู้ใหญ่ราคาสูงสุด (¥3,200) ไคยูคังรับจองเฉพาะรอบตั้งแต่ 15:00 น. และโปรแกรมช่วงค่ำคือ <strong>17:00–20:00 น. เข้าชมรอบสุดท้าย 19:00 น.</strong> โดยเวลาเปลี่ยนตามฤดูกาล
          </p>
          <div style={{ margin: "1rem 0" }}>
            <Table head={["ช่วงเวลา", "สิ่งที่หน้าเว็บทางการระบุ", "ความหมายสำหรับคุณ"]} rows={timingRows.map((r) => [r.when, r.official, r.means])} />
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — <a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>, <a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a> (ประกาศการจองและเวลาหนึ่งรอบ 90–120 นาที), <a href={OFFICIAL.ticket} target="_blank" rel="noopener">kaiyukan.com/info/ticket/</a> (การขายที่จุดขายหน้างาน) และ <a href={OFFICIAL.night} target="_blank" rel="noopener">kaiyukan.com/program/night/</a>
          </p>
          <p className={styles.bodyText}>
            เวลาเปิดอยู่ในปฏิทินเดียวกับราคา ประกาศเป็นรายวัน และเว็บไซต์ขอให้คุณตรวจสอบวันของตัวเอง รูปแบบทั่วไปคือ <strong>เปิด 10:00 น. ปิด 20:00 น. เข้าชมรอบสุดท้าย 1 ชั่วโมงก่อนปิด</strong> และมีวันหยุดไม่กี่วันในเดือนมกราคมและกุมภาพันธ์ (ตรวจสอบเมื่อ {SET_CHECKED}) ตั้งแต่ 17:00 น. แสงไฟและเสียงเพลงจะเปลี่ยนเป็นโปรแกรมช่วงค่ำ ใช้ตั๋วใบเดิมและดูตู้เดิม ในช่วงบ่ายที่ปฏิทินราคาพาคุณไปในวันที่คนมากที่สุด
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เวลาที่ใช้</span>
          <h2 className={styles.sectionTitle}>ต้องใช้เวลาที่ไคยูคังนานเท่าไร</h2>
          <p className={styles.bodyText}>
            <strong>90–120 นาที ตามที่พิพิธภัณฑ์ระบุ</strong> หน้าการจองแบบกลุ่มของไคยูคังให้เวลานี้สำหรับการเดินชมหนึ่งรอบ (ตรวจสอบเมื่อ {CHECKED}) เส้นทางจะพาขึ้นไปชั้นบนสุดแล้วลงมาผ่านตู้ต่าง ๆ ในทิศทางเดียว จึงเดินเพียงรอบเดียว ถ้าอยากยืนดูฉลามวาฬหน้าตู้มหาสมุทรแปซิฟิกนาน ๆ หรือแวะ Cafe R.O.F ที่อยู่หลังตู้ร่องลึกญี่ปุ่นและมีบางที่นั่งหันหน้าเข้าตู้ ให้เผื่อเวลาเพิ่ม
          </p>
          <p className={styles.bodyText}>
            ยังเหลือเวลาส่วนใหญ่ของวัน เท็มโปซันอยู่ริมอ่าว การจับคู่ที่ง่ายที่สุดคืออีกครึ่งหนึ่งของย่านริมน้ำ อย่างชิงช้าสวรรค์หรือเรือซานตามาเรีย หรือ Universal Studios Japan ที่อยู่อีกฝั่งน้ำ{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" hrefLang="en" style={linkStyle}>
              แผนเที่ยวโอซาก้า 2 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            ใส่ไคยูคังไว้ในวันเต็มพร้อมเส้นทาง{" "}
            <Link href="/guides/attractions/osaka-3-day-itinerary" hrefLang="en" style={linkStyle}>
              แผนเที่ยวโอซาก้า 3 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            ใส่ไว้ในช่วงบ่ายริมอ่าว และ{" "}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" hrefLang="en" style={linkStyle}>
              แผนเที่ยวโอซาก้าและเกียวโต 3 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            ใช้เป็นตัวเลือกสำหรับวันฝนตกหรือวันที่เน้นเด็กในวันที่ 3
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การกลับเข้าชมซ้ำ</span>
          <h2 className={styles.sectionTitle}>กลับเข้าไคยูคังซ้ำได้ไหม</h2>
          <p className={styles.bodyText}>
            <strong>ไม่ได้</strong> ไคยูคังยกเลิกการกลับเข้าชมซ้ำตั้งแต่ <strong>15 มิถุนายน 2026</strong> โดยประกาศเมื่อ 21 พฤษภาคม 2026 ว่าเป็นหนึ่งในมาตรการคุมจำนวนผู้เข้าชมในแต่ละรอบเวลาให้คงที่ เพื่อให้ทุกคนชมนิทรรศการได้ตามจังหวะของตัวเอง (kaiyukan.com/about/news/20564.html ตรวจสอบเมื่อ {CHECKED})
          </p>
          <p className={styles.bodyText}>
            กินข้าวก่อนเข้าหรือหลังออก ร้านเครื่องดื่ม SEA SAW อยู่ในบริเวณก่อนถึงประตูตรวจตั๋ว Tempozan Marketplace อยู่ติดกัน และล็อกเกอร์ใน Kaiyukan Hall กับข้างร้านของที่ระลึกใช้ได้โดยไม่ต้องมีตั๋ว จึงฝากกระเป๋าก่อนเข้าได้สะดวก
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ไปกับเด็ก</span>
          <h2 className={styles.sectionTitle}>พาทารกและเด็กเล็กไปไคยูคังสะดวกไหม</h2>
          <p className={styles.bodyText}>
            <strong>สะดวก ตามรายการสิ่งอำนวยความสะดวกทางการ</strong> อายุ 2 ปีหรือต่ำกว่าเข้าฟรี และในอาคารมี<strong>ห้องดูแลทารก</strong>พร้อมเตียงเปลี่ยนผ้าอ้อมและเครื่องจ่ายน้ำร้อนชงนม รวมถึง<strong>ห้องให้นม</strong> ยืมรถเข็นผู้พิการได้ที่จุดประชาสัมพันธ์ ทั้งหมดตรวจสอบจาก kaiyukan.com เมื่อ {CHECKED} หน้าเว็บทางการที่ตรวจสอบไม่ได้ระบุกฎเรื่องรถเข็นเด็ก ถ้าเรื่องนี้มีผลกับแผนของคุณ ให้สอบถามที่ทางเข้า
          </p>
          <p className={styles.bodyText}>
            แผนสำหรับครอบครัวก็เหมือนกับทุกคน แต่ต้องรอบคอบกว่า จองรอบเวลาไว้เพื่อไม่ให้เด็กเล็กต้องยืนต่อคิวซื้อตั๋ววันนั้น และเพราะยกเลิกการกลับเข้าชมซ้ำแล้ว การนอนกลางวันหรือมื้ออาหารต้องอยู่ก่อนหรือหลัง ไม่ใช่ระหว่างทาง ถ้าทริปนี้เน้นเด็ก{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" hrefLang="en" style={linkStyle}>
              คู่มือย่านที่พักในโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            เปรียบเทียบย่านที่พักต่าง ๆ รวมถึงยูนิเวอร์แซลซิตี้ ซึ่งนั่งเรือ Captain Line ไปพิพิธภัณฑ์ได้ในเวลาสั้น ๆ
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>ต้องจองตั๋วพิพิธภัณฑ์สัตว์น้ำโอซาก้าล่วงหน้าไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>ไม่บังคับ แต่แนะนำให้จอง</strong> จุดขายหน้างานขายเฉพาะตั๋ววันนั้นและเตือนว่าอาจไม่ได้รอบเวลาที่ต้องการ ส่วนตั๋วออนไลน์ทางการแบบระบุวันและรอบเวลาเปิดขายล่วงหน้าประมาณ 30 วัน (kaiyukan.com/info/ticket/ ตรวจสอบเมื่อ {CHECKED}) วิธีจองทีละขั้นตอนมีดังนี้
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูตั๋วไคยูคังใน Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="วันเดียวกัน จองที่เดียวกัน"
          heading="วันเที่ยวไคยูคังควรจองอะไรอีกบ้าง"
          intro="อยู่ในพิพิธภัณฑ์สองถึงสามชั่วโมงก็ยังเหลือเวลาส่วนที่เหลือของวัน และพาสที่ใช้เข้าไคยูคังไม่ได้ก็ยังคุ้มค่าในอีกวันหนึ่ง รายการเหล่านี้จองได้ในบัญชี Klook เดียวกับตั๋ว"
          items={sameDayPrepItems}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ชุดตั๋วรวม</span>
          <h2 className={styles.sectionTitle}>เที่ยวอะไรคู่กับไคยูคังได้บ้างในบริเวณใกล้เคียง</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>เรือซานตามาเรียล่องอ่าวคือการจับคู่ที่ง่ายที่สุด</strong> ขึ้นเรือที่ท่าข้างพิพิธภัณฑ์และใช้เวลาประมาณ 45 นาที พิพิธภัณฑ์ขายชุดตั๋วทางการรวมกับสามอย่าง คือเรือซานตามาเรีย เรือ Captain Line และ LEGOLAND ส่วน Osaka Amazing Pass ใช้กับชิงช้าสวรรค์ เรือซานตามาเรีย และ Captain Line ได้ แต่ใช้กับไคยูคังเองไม่ได้
          </p>
          <Table
            head={["สถานที่", "เวลา", "ราคา (ทางการ)", "Amazing Pass", "ควรรู้"]}
            rows={nearbyRows.map((r) => [r.what, r.time, r.price, r.pass, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} — <a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a> (ราคาเรือ ระยะเวลา ท่าเรือ), <a href={OFFICIAL.amazingPass} target="_blank" rel="noopener">osaka-amazing-pass.com/en/service_free.html</a> (เวลาเปิด วันหยุด ราคาตามรายการ และการใช้พาส), <a href={OFFICIAL.captainLine} target="_blank" rel="noopener">kaiyukan.com/thv/captline/</a> และ <a href={OFFICIAL.harbor} target="_blank" rel="noopener">kaiyukan.com/thv/general/</a> (เวลาข้ามฟาก ความสูงของชิงช้าสวรรค์)
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SANTA_MARIA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เรือซานตามาเรียใน Klook →
            </KlookLink>
            <KlookLink href={LEGO_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ไคยูคัง + LEGOLAND ใน Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            สังเกตสิ่งที่<strong>ไม่อยู่</strong>ในรายการชุดตั๋วของพิพิธภัณฑ์ <strong>ชิงช้าสวรรค์ยักษ์เท็มโปซัน</strong> สูง 112.5 เมตรจากพื้น และเป็นหนึ่งในชิงช้าสวรรค์ที่ใหญ่ที่สุดในโลก อยู่ใน Harbor Village เดียวกับพิพิธภัณฑ์ แต่เป็นผู้ให้บริการคนละราย จึงไม่มีชุดตั๋วทางการแบบพิพิธภัณฑ์ + ชิงช้าสวรรค์ ให้ซื้อตั๋วชิงช้าสวรรค์ในวันนั้น ถ้าทริปของคุณมี Universal Studios Japan ชุดตั๋ว <strong>Captain Line</strong> คือชุดที่ควรดูให้ดี เพราะนั่งเรือ 10 นาทีจาก Universal City Port ถึงหน้าประตูพิพิธภัณฑ์ ทำให้เที่ยวสองที่ที่อยู่คนละฝั่งน้ำได้ในบ่ายเดียว สิ่งที่ต้องจองสำหรับสวนสนุกอยู่ใน{" "}
            <Link href="/th/guides/attractions/usj-tickets-express-pass" style={linkStyle}>
              คู่มือบัตร USJ และ Express Pass
            </Link>{" "}
            และการเปรียบเทียบห้องพักในยูนิเวอร์แซลซิตี้ที่นั่งเรือข้ามไปได้ อยู่ใน{" "}
            <Link href="/guides/attractions/usj-hotels" hrefLang="en" style={linkStyle}>
              คู่มือโรงแรมใกล้ USJ (ภาษาอังกฤษ)
            </Link>{" "}
            ชุดตั๋วและความสูง 112.5 ม. ของชิงช้าสวรรค์ตรวจสอบจาก kaiyukan.com เมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>เดินทางไปไคยูคังอย่างไร</h2>
          <p className={styles.bodyText}>
            นั่ง Osaka Metro <strong>สาย Chuo ไปสถานีโอซาก้าโค</strong> ซึ่งพิพิธภัณฑ์เรียกว่า 大阪港駅（海遊館前） แปลว่า “สถานีโอซาก้าโค หน้าไคยูคัง” แล้ว<strong>ออกทางออก 1 เดินประมาณ 5 นาที</strong> แทบทุกคนใช้เส้นทางนี้ และสาย Chuo วิ่งผ่านใจกลางเมือง จากสถานีฮนมาจิจึงนั่งได้ตรง ส่วนสถานีใจกลางเมืองอื่น ๆ ส่วนใหญ่เปลี่ยนขบวนครั้งเดียว{" "}
            <Link href="/guides/transport/osaka-transportation" hrefLang="en" style={linkStyle}>
              คู่มือการเดินทางในโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายว่าสาย Chuo เชื่อมกับเครือข่ายอย่างไร และ{" "}
            <Link href="/guides/transport/osaka-metro-pass" hrefLang="en" style={linkStyle}>
              คู่มือพาส Osaka Metro (ภาษาอังกฤษ)
            </Link>{" "}
            คำนวณว่าวันแบบนี้ตั๋ว 1 วันคุ้มกว่าการแตะบัตร IC หรือไม่
          </p>
          <p className={styles.bodyText}>
            หน้าการเดินทางของผู้ให้บริการยังระบุอีกสามวิธี คือเรือ <strong>Captain Line</strong> จาก Universal City Port ซึ่งเทียบท่า Kaiyukan Nishi Hatoba ตรงหน้าทางเข้า รถเมล์ Osaka City Bus ป้าย Tempozan Harbor Village หรือรถเมล์ Nankai Bus ป้าย Kaiyukan (Tempozan) ซึ่งเดินไม่กี่ก้าวถึงประตู และรถยนต์ โดยมีที่จอดรถประมาณ 1,000 คัน ทั้งหมดตรวจสอบเมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เรื่องพาส</span>
          <h2 className={styles.sectionTitle}>ใช้ Osaka Amazing Pass เข้าไคยูคังได้ไหม</h2>
          <p className={styles.bodyText}>
            <strong>ไม่ได้</strong> ไคยูคังไม่อยู่ในรายชื่อสถานที่ที่ร่วมรายการของพาส (osaka-amazing-pass.com ตรวจสอบเมื่อ {CHECKED}) และเป็นสถานที่ที่แพงที่สุดที่พาสไม่รวม พาส (1 วัน ¥3,500 / 2 วัน ¥5,000) รวมการนั่ง Osaka Metro และรถเมล์ในเมืองแบบไม่จำกัดเที่ยว กับการเข้าชมฟรีประมาณ 40 แห่ง เช่น ปราสาทโอซาก้า จุดชมวิว Umeda Sky Building และเรือล่องแม่น้ำ (รวมถึง{" "}
            <Link href="/th/guides/attractions/dotonbori-river-cruise" style={linkStyle}>
              เรือล่องโดทงโบริ
            </Link>{" "}
            ที่ราคา ¥2,000 ถ้าไม่มีพาส) และที่อยู่ติดพิพิธภัณฑ์ คือชิงช้าสวรรค์ยักษ์เท็มโปซัน เรือซานตามาเรียรอบกลางวัน และ Captain Line ส่วน Universal Studios Japan ก็ไม่อยู่ในรายการเช่นกัน รายชื่อสถานที่ทั้งหมดและการคำนวณจุดคุ้มทุนอยู่ใน{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              คู่มือ Osaka Amazing Pass (ภาษาอังกฤษ)
            </Link>
          </p>
          <p className={styles.bodyText}>
            ผลที่ตามมาจึงเป็นเรื่องการจัดตารางมากกว่าเรื่องเงิน วันเที่ยวในเมืองที่เข้าสถานที่ในพาสสามถึงสี่แห่งคือวันที่พาสคุ้มค่า แต่วันที่ใช้ไปกับไคยูคังไม่ใช่ การซื้อพาสเพิ่มอีกวันสำหรับวันนี้จึงไม่คุ้มค่า แผนที่ใช้ได้ผลคือใช้พาสหนึ่งวันสำหรับเที่ยวในเมือง และอีกวันไม่ใช้พาสสำหรับสถานที่ใหญ่ ซึ่ง{" "}
            <Link href="/guides/attractions/things-to-do-osaka" hrefLang="en" style={linkStyle}>
              คู่มือสิ่งที่น่าทำในโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            จัดไว้สำหรับทริป 2–3 วัน ถ้าอยากจ่ายทั้งสองอย่างในครั้งเดียวอยู่ดี Klook มีขาย Amazing Pass ที่รวมตั๋วไคยูคัง ซึ่งเป็นสินค้าเดียวที่รวมแบบนี้
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Amazing Pass + ไคยูคังใน Klook →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เฉพาะพิพิธภัณฑ์ →
            </KlookLink>
          </div>
        </section>

        <div data-placement="kaiyukan-highrate-faq">
          <KlookTripPrep
            label="ทริปเดียวกัน"
            heading="จองสถานที่อื่นในโอซาก้าสำหรับทริปเดียวกันได้ที่ไหนบ้าง"
            intro="ไคยูคังใช้เวลาสองถึงสามชั่วโมง ยังเหลือเวลาไปปราสาทหรือจุดชมวิวอุเมดะในเย็นวันนั้นหรือวันถัดไป ทั้งสองแห่งใช้ Osaka Amazing Pass ได้ รายการนี้จึงสำหรับทริปที่ไม่ได้ซื้อพาส"
            items={highRateItems}
            adPlacement="kaiyukan-highrate-faq"
          />
        </div>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            พิพิธภัณฑ์พี่น้องของไคยูคัง{" "}
            <Link href="/guides/attractions/nifrel-osaka-tickets" hrefLang="en" style={linkStyle}>
              NIFREL (ภาษาอังกฤษ)
            </Link>{" "}
            อยู่ที่ EXPOCITY ในเมืองซุอิตะ ผู้ใหญ่ ¥2,400 ปิด 19–20 มกราคม 2027
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            ที่ชิโกกุ{" "}
            <Link href="/guides/attractions/shikoku-aquarium-tickets" hrefLang="en" style={linkStyle}>
              Shikoku Aquarium (ภาษาอังกฤษ)
            </Link>{" "}
            ในจังหวัดคากาวะ ผู้ใหญ่ ¥2,600 นักเรียนประถมและมัธยมต้น ¥1,400
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            ติดกันใน Tempozan Marketplace{" "}
            <Link href="/guides/attractions/legoland-discovery-center-osaka-tickets" hrefLang="en" style={linkStyle}>
              LEGOLAND Discovery Center Osaka (ภาษาอังกฤษ)
            </Link>{" "}
            ราคาออนไลน์ ¥2,900–3,300 สำหรับอายุ 3 ปีขึ้นไป
          </p>
        </section>
        <EsimCtaBottom />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="คำถามที่พบบ่อยเกี่ยวกับตั๋วไคยูคัง" />

        <KlookTourPicks
          heading="ช่วงเวลาที่เหลือของวันในโอซาก้า"
          intro="ไคยูคังใช้เวลาสองถึงสามชั่วโมงของวัน ยังเหลืออีกครึ่งวัน และเท็มโปซันอยู่ไกลจากย่านที่คนส่วนใหญ่อยากไปในโอซาก้า ทัวร์นี้พาไปฝั่งปราสาท โดทงโบริ และชินเซไก ราคาใน Klook เปลี่ยนตามวันที่ โปรดเปิดหน้าสินค้าเพื่อดูราคาปัจจุบันและจุดนัดพบ"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "ตั๋วพิพิธภัณฑ์สัตว์น้ำชูราอุมิ โอกินาว่า 2026: ราคา เวลาเปิด การเดินทาง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/osaka-castle-tickets", title: "ตั๋วปราสาทโอซาก้า 2026: ราคา เวลาเปิด" },
            { href: "/th/guides/attractions/umeda-sky-building-tickets", title: "ตั๋ว Umeda Sky Building 2026: ราคา เวลาเปิด และเวลาพระอาทิตย์ตก" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "Osaka Amazing Pass 2026: ¥3,500 คุ้มไหม พร้อมแผน 1 วัน (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/usj-tickets-express-pass", title: "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน" },
            { href: "/guides/attractions/things-to-do-osaka", title: "สิ่งที่น่าทำในโอซาก้า (2026): ที่ไหนพาสคุ้ม ที่ไหนไม่คุ้ม (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-transportation", title: "การเดินทางในโอซาก้า (2026): รถไฟใต้ดิน รถไฟ และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-metro-pass", title: "พาส Osaka Metro 2026: เทียบตั๋ว 1 วันกับ 2 วัน และ Enjoy Eco Card (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "ราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น 2026: ราคาทางการและกฎการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำในญี่ปุ่นเพิ่มเติม (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>เลือกรอบเวลา ไม่ใช่แค่วัน</h2>
            <p className={styles.ctaBannerDesc}>
              ราคาเปลี่ยนตามวันที่ และจำนวนคนเปลี่ยนตามชั่วโมง รอบเวลาเข้าชมจึงเป็นเรื่องที่ควรตัดสินใจให้ดี จองล่วงหน้าเพื่อใช้หน้าชำระเงินภาษาไทย จ่ายด้วยบัตรต่างประเทศได้ และสแกนโค้ดเข้าแทนการต่อคิวซื้อตั๋วหน้างาน ก่อนจ่ายเงินให้ตรวจสอบกำหนดยกเลิกที่แสดงสำหรับวันของคุณ
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋วไคยูคังใน Klook →
              </KlookLink>
              <KlookLink href={PASS_COMBO_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                แบบรวม Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
