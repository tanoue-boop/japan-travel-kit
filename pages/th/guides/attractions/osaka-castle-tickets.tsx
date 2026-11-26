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
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  jrHarukaUrl,
  osakaAmazingPass,
  osakaCastleNishinomaruWalkingTour,
  osakaCastleSameDayCards,
  osakaCastleTicket,
  osakaCastleTripPrep,
  osakaCastleUmedaTonboriDayTour,
  osakaSkyVistaHalfDayBusTour,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/osaka-castle-tickets) section by section as of
// 2026-11-26 (task-jtk-20261126-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (osakacastle.net, osaka-info.jp,
// osaka-amazing-pass.com, read 23 Oct 2026; price row re-read 23 Nov 2026); nothing is added.
// Title term: ปราสาทโอซาก้า — the name Thai guides (trvlogue th, haveagood-holiday th) use, with
// ตั๋ว / ค่าเข้า. The pass keeps its English name, Osaka Amazing Pass, as on the other Thai pages.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/osaka-castle-tickets";
const TITLE = "ตั๋วปราสาทโอซาก้า 2026: ราคา เวลาเปิด";
const H1 = "ตั๋วปราสาทโอซาก้า 2026: ราคา เวลาเปิด และสิ่งที่ Osaka Amazing Pass ใช้ได้";
const DESC =
  "ตั๋วเข้าปราสาทโอซาก้า ผู้ใหญ่ ¥1,200 นักศึกษา ¥600 เปิด 9:00–18:00 น. เข้าได้ถึง 17:30 น.";

const LAST_CHECKED_ISO = "2026-11-23";
const CHECKED_ISO = "2026-10-23";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const OFFICIAL_URL = "https://www.osakacastle.net/guide/";
// The pass price is owned by lib/attraction-prices.ts, shared with the English page.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, LOCALE);

const TICKET_URL = klookFor(osakaCastleTicket.url, LOCALE);
const PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const WALK_URL = klookFor(osakaCastleNishinomaruWalkingTour.url, LOCALE);
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    tier: "ผู้ใหญ่",
    price: "¥1,200",
    what: "เข้าชมหอหลักทั้ง 8 ชั้น และพิพิธภัณฑ์กำแพงหินโทโยโทมิ (Toyotomi Stone Wall Museum) ได้ในวันเดียวกัน",
  },
  {
    tier: "นักศึกษามหาวิทยาลัยและนักเรียนมัธยมปลาย",
    price: "¥600",
    what: "ต้องแสดงบัตรนักศึกษาที่ช่องขายตั๋ว นักศึกษาต่างชาติต้องแสดงบัตร ISIC ถ้าไม่มีบัตรจะคิดราคาผู้ใหญ่",
  },
  {
    tier: "นักเรียนมัธยมต้นและเด็กที่อายุน้อยกว่า",
    price: "ฟรี",
    what: "ต้องแสดงเอกสารยืนยันอายุ เช่น สมุดนักเรียน บัตรประกันสุขภาพ หรือพาสปอร์ต",
  },
  {
    tier: "ราคากลุ่ม 15 คนขึ้นไปที่ต้องจ่ายเงิน",
    price: "¥1,080 / ¥540",
    what: "ราคาผู้ใหญ่และราคานักศึกษาตามลำดับ กลุ่มที่เข้าฟรียังคงเข้าฟรี",
  },
  {
    tier: "ผู้ถือ Osaka Amazing Pass",
    price: "ฟรี",
    what: "เข้าได้ 1 ครั้งต่อวันของพาส ที่นี่ไม่มีการจำกัดช่วงเวลาของวัน",
  },
];

const parkRows = [
  {
    place: "Osaka Castle Museum (หอหลัก)",
    fee: "ผู้ใหญ่ ¥1,200",
    hours: "9:00 – 18:00 น. (เข้าได้ถึง 17:30 น.)",
    pass: "เข้าฟรีด้วยพาส",
    note: "ตั๋วรวมพิพิธภัณฑ์กำแพงหินโทโยโทมิ ปิด 28 ธันวาคม – 1 มกราคม",
  },
  {
    place: "สวนนิชิโนมารุ (Nishinomaru Garden)",
    fee: "¥300 (ช่วงซากุระ ¥350)",
    hours: "มี.ค.–ต.ค. 9:00 – 17:00 น. / พ.ย.–ก.พ. 9:00 – 16:30 น. (เข้าได้ถึง 30 นาทีก่อนปิด)",
    pass: "เข้าฟรีด้วยพาส",
    note: "สนามหญ้าที่เห็นหอหลักแบบภาพโปสการ์ด มีต้นซากุระราว 300 ต้น ปิดทุกวันจันทร์และช่วงปีใหม่",
  },
  {
    place: "เรือ Gozabune (Osaka-jo Gozabune)",
    fee: "ผู้ใหญ่ (16 ปีขึ้นไป) ¥1,800 วัยเรียน ¥900 อายุ 65 ปีขึ้นไป ¥1,200 เด็กก่อนวัยเรียนฟรี",
    hours: "10:00 – 16:30 น. (รอบสุดท้าย)",
    pass: "ขึ้นฟรีด้วยพาส แต่ต้องแลกตั๋วเมื่อไปถึง",
    note: "ล่องรอบคูเมืองชั้นในประมาณ 20 นาที เด็กอายุระดับมัธยมต้นหรือน้อยกว่าขึ้นเรือคนเดียวไม่ได้",
  },
  {
    place: "ป้อมยางุระ (Osaka Castle Yagura)",
    fee: "¥900 อายุระดับมัธยมปลายขึ้นไป",
    hours: "10:00 – 16:30 น. (เข้าได้ถึง 16:00 น.)",
    pass: "เข้าฟรีด้วยพาส",
    note: "ป้อมที่เป็นสมบัติทางวัฒนธรรมที่สำคัญของญี่ปุ่น เป็นภายในแนวป้องกัน ไม่ใช่ตัวหอหลัก",
  },
  {
    place: "KAIYODO Figure Museum ใน MIRAIZA OSAKA-JO",
    fee: "ผู้ใหญ่ ¥1,000 / เด็ก ¥500",
    hours: "9:30 – 17:30 น. (เข้าได้ถึง 17:00 น.)",
    pass: "เข้าฟรีด้วยพาส",
    note: "อยู่ในอาคารกองบัญชาการทหารเดิมที่เชิงหอหลัก ตัวอาคาร MIRAIZA เดินเข้าไปได้ฟรี",
  },
];

const accessRows = [
  {
    station: "JR สถานีโอซากะโจโคเอ็น (Osakajokoen) สาย Osaka Loop Line",
    walk: "ประมาณ 15–20 นาที",
    note: "สถานีที่นักท่องเที่ยวส่วนใหญ่ใช้ เดินเข้าทางฝั่ง Osaka-jo Hall ผ่านแนวร้านคาเฟ่ในสวน",
  },
  {
    station: "JR / Osaka Metro สถานีโมริโนะมิยะ (Morinomiya)",
    walk: "ประมาณ 15–20 นาที",
    note: "Metro ทางออก 1 และ 3-B ทางเข้าฝั่งใต้ เงียบกว่าทางจากโอซากะโจโคเอ็น",
  },
  {
    station: "Osaka Metro สถานีทานิมาจิ 4-โจเมะ (Tanimachi 4-chome)",
    walk: "ประมาณ 15–20 นาที",
    note: "สาย Tanimachi ทางออก 1-B สาย Chuo ทางออก 9 ทางเข้าฝั่งตะวันตกผ่านประตูโอเทมง (Otemon) ซึ่งเป็นทางเข้าตามประวัติศาสตร์",
  },
  {
    station: "Osaka Metro / Keihan สถานีเท็มมะบาชิ (Temmabashi)",
    walk: "ประมาณ 15–20 นาที",
    note: "Metro สาย Tanimachi ทางออก 3 ทางเข้าฝั่งเหนือ ใกล้ท่าขึ้นเรือ Gozabune ที่สุด",
  },
  {
    station: "Osaka Metro สถานีโอซาก้าบิสซิเนสพาร์ก (Osaka Business Park)",
    walk: "ประมาณ 15–20 นาที",
    note: "สาย Nagahori Tsurumi-ryokuchi ทางออก 1 สะดวกถ้าพักในอาคารย่าน OBP",
  },
];

const whoFor = [
  {
    title: "ไปตอน 9:00 น. ถ้า…",
    desc: `คุณอยากเข้าหอหลักโดยไม่ต้องต่อคิว หอหลักเปิด 9:00 น. และเว็บไซต์ของพิพิธภัณฑ์แจ้งว่าเมื่อคนมาก อาจจำกัดการเข้าก่อนเวลาปิดรับ 17:30 น. ชั่วโมงแรกหลังเปิดจึงเป็นช่วงเดียวที่ไม่ถูกจำกัด และยังเหลือช่วงบ่ายทั้งหมดสำหรับสวนและเรือ ตรวจสอบเมื่อ ${CHECKED}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "ไปช่วงบ่าย ถ้า…",
    desc: "คุณสนใจสวนมากกว่าพิพิธภัณฑ์ บริเวณสวนเข้าฟรีและเปิดนานหลังหอหลักปิด 18:00 น. หลังมืดจะมีไฟส่องหอหลัก และทางเดินจากประตูโอเทมงช่วงแสงเย็นเป็นมุมถ่ายภาพที่ดีที่สุดของที่นี่ แต่ให้ระวังจุดที่ปิดเร็วกว่าในเขตกำแพง เรือ Gozabune รอบสุดท้าย 16:30 น. และป้อมยางุระปิด 16:30 น. เช่นกัน",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "ซื้อพาส ถ้า…",
    desc: `คุณจะเข้ามากกว่าหอหลัก สถานที่เสียเงิน 5 แห่งในสวนปราสาทโอซาก้ารวมกันเป็น ¥5,200 สำหรับผู้ใหญ่ 1 คน และทั้ง 5 แห่งเข้าฟรีด้วย Osaka Amazing Pass ราคา ${PASS_1_DAY} ต่อวัน ซึ่งรวมรถไฟใต้ดินด้วย หอหลัก เรือ และ KAIYODO Figure Museum (¥4,000) ก็เกินราคาพาสแล้ว รายชื่อสถานที่ตรวจสอบเมื่อ ${CHECKED} ราคาพาสตรวจสอบเมื่อ 9 พฤศจิกายน 2026`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
        <path d="M12 6v12" strokeDasharray="2 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "นับสถานที่เสียเงินก่อนซื้ออะไร",
    desc: `หอหลักราคา ¥1,200 และคนส่วนใหญ่ดูแค่ตัวเลขนี้ แต่ในเขตกำแพงเดียวกันยังมีสถานที่เสียเงินอีก 4 แห่ง คือ สวนนิชิโนมารุ เรือ Gozabune ป้อมยางุระ และ KAIYODO Figure Museum ใน MIRAIZA รวมทั้งหมด ¥5,200 สำหรับผู้ใหญ่ 1 คน ตั๋วที่ควรซื้อขึ้นอยู่กับว่าคุณจะเข้า 2 แห่งหรือทั้ง 5 แห่ง ไม่ใช่หอหลักอย่างเดียว ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    title: "ถ้าเข้า 3 แห่งขึ้นไป พาสคุ้มกว่า",
    desc: `ทั้ง 5 แห่งเข้าฟรีด้วย Osaka Amazing Pass ราคา ${PASS_1_DAY} สำหรับ 1 วัน (ราคาทางการ ตรวจสอบเมื่อ 9 พฤศจิกายน 2026) หอหลักกับเรือรวม ¥3,000 และหอหลัก สวน กับเรือรวม ¥3,300 ทั้งสองแบบต่ำกว่าราคาพาสเล็กน้อย จึงคุ้มเมื่อนับค่ารถไฟใต้ดินของวันนั้นด้วย หอหลัก เรือ และ KAIYODO Figure Museum รวม ¥4,000 ซึ่งเกินราคาพาสในเขตกำแพงเดียว`,
  },
  {
    title: "ถ้าเข้าแค่หอหลัก ซื้อตั๋วเดี่ยวล่วงหน้า",
    desc: "พิพิธภัณฑ์ขายตั๋วผ่านเว็บไซต์จองของตัวเอง และ Klook เป็นช่องทางภาษาไทยสำหรับตั๋วเข้าชมเดียวกันโดยจ่ายด้วยบัตรต่างประเทศ ทั้งสองทางไม่บังคับ ช่องขายตั๋วขายในวันนั้นได้ แต่ทั้งสองทางจะได้โค้ดในโทรศัพท์แทนการต่อคิวที่ประตู ซึ่งสำคัญในวันหยุดสุดสัปดาห์ช่วงฤดูใบไม้ผลิ ตรวจสอบเงื่อนไขการยกเลิกในหน้าการจองของคุณก่อนจ่ายเงิน",
  },
  {
    title: "ซื้อตั๋วเรือ Gozabune ด้วยตัวเองในวันนั้น",
    desc: "เรือเป็นสิ่งเดียวที่จองล่วงหน้าไม่ได้ ตั๋วขายที่ซุ้มด้านเหนือของหอหลัก ทางตะวันตกของสะพานโกคุราคุบาชิ (Gokurakubashi) และผู้ถือพาสแลกใบขึ้นเรือที่ระบุเวลาได้ที่เคาน์เตอร์เดียวกัน ที่นั่งมีจำกัดและขึ้นเรือได้เฉพาะเวลาที่พิมพ์บนใบ จึงควรแลกตั้งแต่ช่วงเช้า ไม่ใช่ตอน 16:00 น.",
  },
  {
    title: "เผื่อเวลา 1 ชั่วโมงสำหรับหอหลัก และอีก 1 ชั่วโมงสำหรับกำแพง",
    desc: `เว็บไซต์ท่องเที่ยวทางการของโอซาก้าระบุว่าการชมพิพิธภัณฑ์ใช้เวลาประมาณ 60 นาที ซึ่งเหมาะกับ 8 ชั้นและลิฟต์ขึ้นชั้นบนสุด บริเวณสวนรอบ ๆ ใช้อีก 1–2 ชั่วโมง คูเมือง ทางเข้าโอเทมง และกำแพงหินสมัยโทโยโทมิเป็นส่วนที่ไม่ต้องจ่ายเงินและคุ้มเวลาที่สุด เวลาโดยประมาณตรวจสอบเมื่อ ${CHECKED}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋วปราสาทโอซาก้าราคาเท่าไหร่?",
    a: `ตั๋วผู้ใหญ่เข้าหอหลัก (Osaka Castle Museum) ราคา ¥1,200 นักศึกษามหาวิทยาลัยและนักเรียนมัธยมปลายจ่าย ¥600 โดยแสดงบัตรนักศึกษา และนักเรียนมัธยมต้นหรืออายุน้อยกว่าเข้าฟรีโดยแสดงเอกสารยืนยันอายุ กลุ่มที่จ่ายเงิน 15 คนขึ้นไปจ่าย ¥1,080 และ ¥540 ตั๋วรวมพิพิธภัณฑ์กำแพงหินโทโยโทมิในวันเดียวกัน นักศึกษาต่างชาติต้องแสดงบัตร ISIC ถ้าไม่มีบัตรจะคิดราคาผู้ใหญ่ ข้อมูลทั้งหมดจาก osakacastle.net และเว็บไซต์ท่องเที่ยวทางการของโอซาก้า ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ปราสาทโอซาก้าเปิดกี่โมง?",
    a: `หอหลักเปิด 9:00 ถึง 18:00 น. ขายตั๋วและรับเข้าครั้งสุดท้าย 17:30 น. คือ 30 นาทีก่อนปิด ปิดตั้งแต่ 28 ธันวาคม ถึง 1 มกราคม เว็บไซต์ของพิพิธภัณฑ์ระบุอีกข้อที่สำคัญในวันที่คนมาก คืออาจจำกัดการเข้าก่อน 17:30 น. เมื่อผู้เข้าชมมีจำนวนมาก การมาถึง 17:00 น. ช่วงซากุระจึงอาจเข้าไม่ได้ ตัวสวนไม่มีประตูและไม่มีเวลาปิด ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ควรใช้เวลาที่ปราสาทโอซาก้านานเท่าไหร่?",
    a: `เว็บไซต์ท่องเที่ยวทางการของโอซาก้าระบุว่าพิพิธภัณฑ์ใช้เวลาประมาณ 60 นาที ซึ่งตรงกับความจริง คือนิทรรศการ 8 ชั้นพร้อมลิฟต์ขึ้นชั้นชมวิวบนสุด เดินไปทางเดียว ให้เผื่ออีกอย่างน้อย 1 ชั่วโมงสำหรับบริเวณสวน คูเมืองชั้นนอกและชั้นใน ทางเข้าประตูโอเทมง และกำแพงหินสมัยโทโยโทมิเข้าชมฟรี และเป็นส่วนที่ทำให้ที่นี่คุ้มค่าที่จะมา ถ้าจะเข้าสวนและขึ้นเรือด้วย ให้ถือว่าปราสาทเป็นแผนครึ่งวัน ไม่ใช่แค่แวะ`,
  },
  {
    q: "ในสวนปราสาทโอซาก้ามีอะไรที่ต้องเสียเงินอีก?",
    a: `มีอีก 4 แห่งนอกจากหอหลัก และนี่คือเหตุผลที่การเที่ยวปราสาทอาจใช้เงิน ¥5,200 แทน ¥1,200 สวนนิชิโนมารุ ¥300 (ช่วงซากุระ ¥350) เปิด 9:00–17:00 น. ตั้งแต่มีนาคมถึงตุลาคม และ 9:00–16:30 น. ตั้งแต่พฤศจิกายนถึงกุมภาพันธ์ ปิดวันจันทร์ เรือ Gozabune ผู้ใหญ่อายุ 16 ปีขึ้นไป ¥1,800 วัยเรียน ¥900 อายุ 65 ปีขึ้นไป ¥1,200 และเด็กก่อนวัยเรียนฟรี ให้บริการ 10:00 ถึง 16:30 น. ป้อมยางุระ ¥900 สำหรับอายุระดับมัธยมปลายขึ้นไป เปิด 10:00–16:30 น. เข้าได้ถึง 16:00 น. KAIYODO Figure Museum ใน MIRAIZA OSAKA-JO ผู้ใหญ่ ¥1,000 เด็ก ¥500 เปิด 9:30–17:30 น. ส่วนอื่นทั้งหมดในสวน ทั้งคูเมือง ประตู กำแพงหิน และตัวอาคาร MIRAIZA เข้าฟรี ราคาตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "Osaka Amazing Pass เข้าปราสาทโอซาก้าฟรีไหม?",
    a: `ฟรี และสถานที่เสียเงินอีก 4 แห่งในสวนก็ฟรีด้วย รายชื่อของผู้ให้บริการพาสมี Osaka Castle Museum สวนนิชิโนมารุ ป้อมยางุระ KAIYODO Figure Museum ใน MIRAIZA และเรือ Gozabune รวมราคาหน้าประตู ¥5,200 สำหรับผู้ใหญ่ 1 คน เทียบกับพาส 1 วันราคา ${PASS_1_DAY} ต่างจาก Umeda Sky Building ที่พาสใช้ได้เฉพาะก่อน 15:00 น. สถานที่ในปราสาทไม่มีการจำกัดช่วงเวลาของวัน แต่เรือ Gozabune ต้องนำพาสไปแลกใบขึ้นเรือที่ระบุเวลาที่เคาน์เตอร์ของเรือ รายชื่อสถานที่ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ซื้อ Osaka Amazing Pass เพื่อปราสาทโอซาก้าอย่างเดียวคุ้มไหม?",
    a: `คุ้มเฉพาะเมื่อเข้าสถานที่เสียเงิน 3 แห่ง หรือ 2 แห่งพร้อมนั่งรถไฟใต้ดินทั้งวัน พาสราคา ${PASS_1_DAY} (ราคาทางการ ตรวจสอบเมื่อ 9 พฤศจิกายน 2026) หอหลัก (¥1,200) กับเรือ Gozabune (¥1,800) รวม ¥3,000 และเพิ่มสวนเป็น ¥3,300 ทั้งสองแบบยังต่ำกว่าราคาพาสจนกว่าจะนับค่า Osaka Metro ที่พาสใช้ได้ด้วย หอหลัก เรือ และ KAIYODO Figure Museum (¥1,000) รวม ¥4,000 ซึ่งเกินราคาพาส ถ้าเข้าแค่หอหลัก พาสไม่คุ้มค่า คู่มือ Osaka Amazing Pass ของเรา (ภาษาอังกฤษ) คำนวณแบบเดียวกันสำหรับทั้งเมือง`,
  },
  {
    q: "ไปปราสาทโอซาก้าอย่างไร?",
    a: `มี 5 สถานีที่ใช้ได้ และทุกสถานีเดินประมาณ 15 ถึง 20 นาที สวนกว้างและหอหลักอยู่ตรงกลาง จึงไม่มีทางที่สั้นกว่านี้ JR สถานีโอซากะโจโคเอ็น สาย Osaka Loop Line เป็นสถานีที่คนส่วนใหญ่ใช้ สถานีโมริโนะมิยะเป็นทางเข้าฝั่งใต้ ทั้ง JR และ Metro Osaka Metro สถานีทานิมาจิ 4-โจเมะ (สาย Tanimachi ทางออก 1-B สาย Chuo ทางออก 9) พาเข้าทางประตูโอเทมง ซึ่งเป็นทางเข้าตามประวัติศาสตร์ สถานีเท็มมะบาชิของ Metro และ Keihan เป็นทางเข้าฝั่งเหนือ ใกล้เรือ Gozabune และสถานีโอซาก้าบิสซิเนสพาร์กเหมาะกับผู้ที่พักในอาคารย่าน OBP รถบัสเมืองจอดที่ป้าย Osakajo Otemae และ Babacho และเรือแม่น้ำจอดที่ท่า Osakajo-ko สถานีและทางออกจาก osakacastle.net ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ปราสาทโอซาก้าคนน้อยช่วงไหน?",
    a: `ช่วงเช้า และนอกช่วงสองสัปดาห์แรกของเดือนเมษายน หอหลักเปิด 9:00 น. และเว็บไซต์ของพิพิธภัณฑ์ระบุว่าอาจจำกัดการเข้าก่อนเวลาปิดรับ 17:30 น. เมื่อคนมาก ซึ่งบอกว่าช่วงที่คนแน่นคือกลางวัน ช่วงไฮซีซันฤดูใบไม้ผลิมีกำหนดชัดเจน ควรเลี่ยงหรือตั้งใจไปให้ตรง ในปี 2026 สวนนิชิโนมารุเปิดชมซากุระยามค่ำตั้งแต่ 20 มีนาคม ถึง 12 เมษายน ขยายเวลาถึง 21:00 น. เข้าได้ถึง 20:30 น. และตั๋วราคา ¥350 เป็นสองสัปดาห์ที่สวยที่สุดของที่นี่ และคนมากที่สุดอย่างชัดเจน เช้าวันธรรมดานอกช่วงนี้จะต่างกันมาก`,
  },
  {
    q: "ต้องจองตั๋วปราสาทโอซาก้าล่วงหน้าไหม?",
    a: "ไม่ต้อง ไม่มีรอบเข้าชม ตั๋วไม่ขายหมด และช่องขายตั๋วที่หอหลักขายตั๋ววันเดียวกันตลอดเวลาเปิด การจองล่วงหน้าเป็นเรื่องความสะดวก พิพิธภัณฑ์มีเว็บไซต์จองของตัวเอง และ Klook เป็นช่องทางภาษาไทยสำหรับตั๋วเข้าชมเดียวกัน จ่ายด้วยบัตรต่างประเทศและได้โค้ดสำหรับสแกน สองอย่างที่ไม่ควรรอจนบ่ายคือเรือ Gozabune ซึ่งที่นั่งมีจำกัดและต้องใช้ใบขึ้นเรือที่ระบุเวลา และทัวร์มีไกด์ ซึ่งต้องมีผู้ร่วมทัวร์และเวลาเริ่มที่กำหนด",
  },
  {
    q: "ปราสาทโอซาก้าเหมาะกับการพาเด็กไปไหม?",
    a: "ในแง่ราคาเหมาะ นักเรียนมัธยมต้นและเด็กที่อายุน้อยกว่าเข้าฟรีโดยแสดงเอกสารยืนยันอายุ ทำให้หอหลักเป็นหนึ่งในสถานที่ท่องเที่ยวหลักที่ถูกที่สุดในเมืองสำหรับครอบครัว สิ่งที่ต้องเตรียมคือระยะทางและบันได ทุกสถานีเดินไปหอหลัก 15 ถึง 20 นาที พิพิธภัณฑ์มี 8 ชั้นและลิฟต์ที่คนมาก และทางเดินโล่งแทบไม่มีร่มเงาช่วงกลางฤดูร้อน ส่วนสวนเป็นหนึ่งในไม่กี่ที่ในใจกลางโอซาก้าที่เด็กวิ่งเล่นได้ เรือ Gozabune เป็นส่วนเสริมที่เด็กมักจำได้ แต่เด็กอายุระดับมัธยมต้นหรือน้อยกว่าขึ้นเรือโดยไม่มีผู้ใหญ่ไม่ได้",
  },
  {
    q: "ไปปราสาทโอซาก้าวันที่ฝนตกดีไหม?",
    a: "ได้บางส่วน และแบ่งได้ชัดเจน หอหลักเป็นพิพิธภัณฑ์ในร่ม 8 ชั้น ตั๋ว ¥1,200 จึงไม่ได้รับผลจากสภาพอากาศ และ KAIYODO Figure Museum ใน MIRAIZA ก็อยู่ในร่มเช่นกัน สิ่งที่ฝนทำให้เสียไปคือส่วนที่เหลือ เรือ Gozabune ล่องในคูเมืองกลางแจ้ง สวนนิชิโนมารุเป็นสนามหญ้า ป้อมยางุระต้องเดินผ่านพื้นที่โล่ง และทางเดิน 15 ถึง 20 นาทีจากทุกสถานีไม่มีหลังคา วันที่ฝนตกให้ซื้อแค่หอหลัก แล้วเก็บเรือและสวนไว้วันอื่น",
  },
];

// The cards under the main CTA, localised one for one; the trip-prep block below drops the
// URLs these cards already carry, as on the English page.
const sameDayCards = [
  withKlookLocale(osakaCastleSameDayCards[0], LOCALE, {
    kind: "พาส",
    label: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    ctaLabel: "ดู Osaka Amazing Pass →",
    why: "หอหลัก สวนนิชิโนมารุ เรือ Gozabune ป้อมยางุระ และ KAIYODO Figure Museum ใช้พาสได้ทั้งหมด พร้อมรถไฟใต้ดินระหว่างจุด แต่ใช้กับพิพิธภัณฑ์สัตว์น้ำ Kaiyukan ไม่ได้",
  }),
  withKlookLocale(osakaCastleSameDayCards[1], LOCALE, {
    kind: "ทัวร์",
    label: "ทัวร์เดินปราสาทโอซาก้าและสวนนิชิโนมารุ ครึ่งวัน",
    ctaLabel: "ดูทัวร์เดินชมปราสาท →",
    why: "ทัวร์แบบกลุ่มครึ่งวันในบริเวณปราสาทและสวนนิชิโนมารุ สนามหญ้าใต้หอหลักที่ต้องซื้อตั๋วแยก",
  }),
  withKlookLocale(osakaCastleSameDayCards[2], LOCALE, {
    kind: "ทัวร์อาหาร",
    label: "ทัวร์อาหารกลางวันที่โดทงโบริ",
    ctaLabel: "ดูทัวร์อาหาร →",
    why: "หน้าสินค้าระบุเวลา 11:00 ถึง 14:00 น. ที่โดทงโบริ เข้าหอหลักตอน 9:00 น. แล้วไปกินมื้อกลางวันระหว่างเดินชมได้",
  }),
  withKlookLocale(osakaCastleSameDayCards[3], LOCALE, {
    kind: "ล่องเรือ",
    label: "ล่องเรือชมเมืองโดทงโบริ โอซาก้า",
    ctaLabel: "ดูล่องเรือโดทงโบริ →",
    why: "เรือ 20 นาทีจากท่าทาซาเอมงบาชิ (Tazaemonbashi) ผ่านป้าย Glico สำหรับช่วงเย็นของวันที่เริ่มจากปราสาท",
  }),
  withKlookLocale(osakaCastleSameDayCards[4], LOCALE, {
    kind: "โรงแรม",
    label: "โรงแรมย่านนัมบะ",
    ctaLabel: "ดูโรงแรมนัมบะบน Klook →",
    why: "เดินจากนัมบะไปโดทงโบริได้ และรถไฟสาย Nankai ไปสนามบินคันไซออกจากที่นี่",
  }),
  withKlookLocale(osakaCastleSameDayCards[5], LOCALE, {
    kind: "eSIM",
    label: "eSIM ญี่ปุ่นของ Klook",
    ctaLabel: "ดู eSIM ของ Klook →",
    why: "โค้ดตั๋ว ทางออกสถานี และแผนที่ซุ้มขายตั๋วเรืออยู่บนโทรศัพท์ทั้งหมด ในสวนที่ใช้เวลาเดินข้าม 15–20 นาที",
  }),
  withKlookLocale(osakaCastleSameDayCards[6], LOCALE, {
    kind: "รถไฟสนามบิน",
    label: "ตั๋วรถไฟด่วนพิเศษ Nankai Rapi:t",
    ctaLabel: "ดูตั๋ว Rapi:t →",
    why: "ที่นั่งสำรองระหว่างสนามบินคันไซกับนัมบะ สำหรับขามาถึงหรือขากลับของทริปโอซาก้า",
  }),
];

const sameDayUrls = new Set(osakaCastleSameDayCards.map((c) => c.url));
const tripPrepCopy: Record<string, { label: string; ctaLabel: string; why: string }> = {
  [osakaCastleTripPrep[0].url]: {
    label: "โรงแรมย่านอุเมดะ / สถานีโอซาก้า",
    ctaLabel: "ดูโรงแรมใกล้สถานีโอซาก้าบน Klook →",
    why: "อุเมดะเป็นศูนย์กลางฝั่งเหนือของรถไฟใต้ดินสายมิโดสึจิและเชื่อมกับสถานีโอซาก้า ปราสาท จุดชมวิวอุเมดะ และรถไฟออกนอกเมืองจึงนั่งรถไปไม่ไกลจากที่พัก",
  },
  [osakaCastleTripPrep[1].url]: {
    label: "โรงแรมย่านนัมบะ",
    ctaLabel: "ดูโรงแรมนัมบะบน Klook →",
    why: "อีกครึ่งหนึ่งของวันเดียวกันทางใต้ เดินจากนัมบะไปโดทงโบริและตลาดคุโรมงได้ และรถไฟสาย Nankai ไปสนามบินคันไซออกจากที่นี่",
  },
  [osakaCastleTripPrep[2].url]: {
    label: "ล่องเรือชมเมืองโดทงโบริ โอซาก้า",
    ctaLabel: "ดูล่องเรือโดทงโบริ →",
    why: "เรือ 20 นาทีจากท่าทาซาเอมงบาชิผ่านป้าย Glico สำหรับช่วงเย็นของวันที่เริ่มจากปราสาท",
  },
  [osakaCastleTripPrep[3].url]: {
    label: "ทัวร์รถบัสเปิดหลังคา 2 ชั้นยามค่ำ “Nani Wonder” โอซาก้า",
    ctaLabel: "ดูทัวร์รถบัสยามค่ำ →",
    why: "รถบัสเปิดหลังคายามค่ำออกจากสถานีรถบัสสถานีโอซาก้า วิ่งตามถนนมิโดสึจิไปชินเซไก สำหรับช่วงเวลาหลังหอหลักปิด",
  },
  [osakaCastleTripPrep[4].url]: {
    label: "Osaka Amazing Pass (1 วัน / 2 วัน)",
    ctaLabel: "ดู Osaka Amazing Pass →",
    why: "พาสใช้เข้าหอหลักได้ในบรรดาสถานที่ในเมือง พร้อมรถไฟใต้ดินระหว่างจุด จึงควรเทียบราคากับตั๋วเดี่ยวก่อนซื้ออย่างใดอย่างหนึ่ง",
  },
};
const tripPrepItems = osakaCastleTripPrep
  .filter((item) => !sameDayUrls.has(item.url))
  .map((item) => withKlookLocale(item, LOCALE, tripPrepCopy[item.url]));

const tourPicks = [
  withKlookLocale(osakaCastleNishinomaruWalkingTour, LOCALE, {
    title: "ทัวร์เดินปราสาทโอซาก้าและสวนนิชิโนมารุ ครึ่งวัน",
    desc: "ทัวร์แบบกลุ่มครึ่งวันในบริเวณปราสาทและสวนนิชิโนมารุ สนามหญ้าเสียเงินที่เห็นหอหลักแบบภาพโปสการ์ด และมีต้นซากุระราว 300 ต้น",
  }),
  withKlookLocale(osakaCastleUmedaTonboriDayTour, LOCALE, {
    title: "ทัวร์ 1 วัน ปราสาทโอซาก้า Umeda Sky Building และล่องเรือโทนโบริ",
    desc: "ทัวร์พร้อมไกด์ที่พาไปปราสาท จุดชมวิวอุเมดะ และล่องเรือโดทงโบริในวันเดียว โดยไกด์เป็นผู้วางเส้นทาง",
  }),
  withKlookLocale(osakaSkyVistaHalfDayBusTour, LOCALE, {
    title: "ทัวร์รถบัส 2 ชั้น Osaka Sky Vista ครึ่งวัน",
    desc: "ทัวร์แบบกลุ่มครึ่งวันบนรถบัส 2 ชั้นเปิดหลังคา ผ่านปราสาทโอซาก้า โดทงโบริ และซึเท็นคาคุ",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋วปราสาทโอซาก้า" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.86rem" }}>
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

export default function ThOsakaCastleTicketsPage({ updated }: { updated: PageUpdated }) {
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
            หอหลักราคา ¥1,200 และใช้เวลาชมประมาณ 1 ชั่วโมง แต่ในเขตกำแพงเดียวกันยังมีสถานที่เสียเงินอีก 4 แห่ง ซึ่งทำให้ค่าเที่ยวปราสาทกลายเป็น ¥5,200 ถ้าไม่ได้ถือพาสของเมือง
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการพร้อมวันที่ตรวจสอบ", "ราคาครบทั้ง 5 สถานที่ในสวน"].map((t) => (
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
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>หอหลัก</p>
                <p className={styles.verdictStatValue}>ผู้ใหญ่ ¥1,200 นักศึกษา ¥600</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาเปิด</p>
                <p className={styles.verdictStatValue}>9:00–18:00 น. เข้าได้ถึง 17:30 น.</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาที่ควรเผื่อ</p>
                <p className={styles.verdictStatValue}>ในอาคารประมาณ 60 นาที</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การเดินทาง</p>
                <p className={styles.verdictStatValue}>เดิน 15–20 นาทีจากทุกสถานี</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ตั๋วเข้าหอหลักปราสาทโอซาก้าราคา <strong>¥1,200</strong> สำหรับผู้ใหญ่ <strong>¥600</strong> สำหรับนักศึกษามหาวิทยาลัยหรือนักเรียนมัธยมปลายที่แสดงบัตร และ <strong>ฟรี</strong> สำหรับนักเรียนมัธยมต้นและเด็กที่อายุน้อยกว่า ตั๋วใบเดียวรวมพิพิธภัณฑ์กำแพงหินโทโยโทมิด้วย หอหลักเปิด <strong>9:00 ถึง 18:00 น. รับเข้าครั้งสุดท้าย 17:30 น.</strong> ปิด 28 ธันวาคม ถึง 1 มกราคม และเว็บไซต์ท่องเที่ยวทางการของโอซาก้าระบุเวลาชม <strong>ประมาณ 60 นาที</strong> ทุกสถานีอยู่ห่างโดย <strong>เดิน 15 ถึง 20 นาที</strong> ตัวเลขที่คนส่วนใหญ่ไม่ได้เผื่อไว้คือ ในสวนยังมีสถานที่เสียเงินอีก 4 แห่ง ได้แก่ สวนนิชิโนมารุ เรือ Gozabune ป้อมยางุระ และ KAIYODO Figure Museum <strong>ทั้ง 5 แห่งรวมกัน ¥5,200 ที่หน้าประตู หรือเข้าฟรีด้วย Osaka Amazing Pass ราคา {PASS_1_DAY}</strong> ตรวจสอบทั้งหมดเมื่อ {CHECKED}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋วปราสาทโอซาก้าบน Klook →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                Osaka Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookSameDayCards
          heading="สิ่งที่ควรจองสำหรับวันเที่ยวปราสาทโอซาก้า"
          cards={sameDayCards}
          footnote={
            <>
              Osaka Amazing Pass ใช้เข้าหอหลักได้ (สถานที่ลำดับที่ 18 บน osaka-amazing-pass.com ตรวจสอบเมื่อ 23 พฤศจิกายน 2026) แต่ใช้กับพิพิธภัณฑ์สัตว์น้ำ Kaiyukan ไม่ได้ ดู{" "}
              <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" hrefLang="en">
                คู่มือตั๋ว Kaiyukan (ภาษาอังกฤษ)
              </Link>{" "}
              ถ้าลงที่สนามบินคันไซแล้วจะไปเกียวโต ชินโอซาก้า หรือเทนโนจิ แทนนัมบะ{" "}
              <KlookLink href={klookFor(jrHarukaUrl, LOCALE)} target="_blank" rel={KLOOK_REL}>
                ตั๋ว JR Haruka บน Klook →
              </KlookLink>
            </>
          }
        />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ตั๋วปราสาทโอซาก้าเข้าชมอะไรได้บ้าง?</h2>
          <p className={styles.bodyText}>
            อาคารเดียว ตั๋ว ¥1,200 ใช้เข้า <strong>Osaka Castle Museum</strong> คือหอหลักที่สร้างขึ้นใหม่ มีนิทรรศการ 8 ชั้นเกี่ยวกับโทโยโทมิ ฮิเดโยชิ และการล้อมเมืองที่ทำให้ตระกูลของเขาสิ้นสุด มีลิฟต์และชั้นชมวิวที่ด้านบน รวมถึง <strong>พิพิธภัณฑ์กำแพงหินโทโยโทมิ</strong> ในวันเดียวกัน ตั๋วหลักใช้ได้เท่านี้
          </p>
          <p className={styles.bodyText}>
            ส่วนอื่นของปราสาทโอซาก้าเข้าฟรีหรือมีราคาแยก และหน้านี้มีไว้เพื่ออธิบายความต่างนี้ คูเมือง ประตู ทางเข้าโอเทมง และอาคาร MIRAIZA ที่เชิงหอหลักเดินผ่านได้ฟรี สวน เรือในคูเมืองชั้นใน ป้อม และพิพิธภัณฑ์ฟิกเกอร์มีค่าเข้า เวลาปิดที่เร็วกว่า และคิวของตัวเอง ถ้าเข้าทั้ง 5 แห่งจะเป็น <strong>¥5,200</strong> สำหรับผู้ใหญ่ 1 คนในเขตกำแพงเดียว ปราสาทจึงเป็นจุดที่ทำให้พาสของเมืองคุ้มค่าชัดเจนที่สุดในโอซาก้า ราคาตรวจสอบเมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋วปราสาทโอซาก้าราคาเท่าไหร่?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ราคาคงที่ตามกลุ่ม ไม่มีราคาผันแปร ไม่มีส่วนลดเมื่อจองล่วงหน้า ตั๋วที่ช่องขายตั๋วกับตั๋วออนไลน์ราคาเท่ากัน เว็บไซต์ของพิพิธภัณฑ์ระบุว่าราคาปัจจุบันมีผลตั้งแต่ 1 เมษายน 2025
          </p>
          <Table head={["ผู้เข้าชม", "ค่าเข้า", "หมายเหตุ"]} rows={priceRows.map((r) => [r.tier, r.price, r.what])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {LAST_CHECKED_ISO} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">osakacastle.net/guide/</a>{" "}
            (¥1,200 / ¥600 / ฟรี, 9:00–18:00 น., เข้าได้ถึง 17:30 น.) ราคานักศึกษาและราคากลุ่มจาก osakacastle.net และเว็บไซต์ท่องเที่ยวทางการของโอซาก้า ตรวจสอบเมื่อ {CHECKED} ราคาอาจเปลี่ยนแปลง ตรวจสอบก่อนซื้อ ค่าเข้าสถานที่อื่นทั่วญี่ปุ่นพร้อมวันที่ตรวจสอบดูได้ที่{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เวลาเปิด</span>
          <h2 className={styles.sectionTitle}>ปราสาทโอซาก้าเปิดกี่โมง?</h2>
          <p className={styles.bodyText}>
            หอหลักเปิด <strong>9:00 ถึง 18:00 น. ขายตั๋วและรับเข้าครั้งสุดท้าย 17:30 น.</strong> คือ 30 นาทีก่อนปิด ปิดตั้งแต่ <strong>28 ธันวาคม ถึง 1 มกราคม</strong> และเปิดทุกวันที่เหลือของปี
          </p>
          <p className={styles.bodyText}>
            มีข้อความหนึ่งบนเว็บไซต์ของพิพิธภัณฑ์ที่ควรอ่านให้ดี คือขอสงวนสิทธิ์ <strong>จำกัดการเข้าก่อน 17:30 น. เมื่อผู้เข้าชมมีจำนวนมาก</strong> ในทางปฏิบัติ การมาถึงช่วงบ่ายแก่ในฤดูซากุระจึงอาจเข้าไม่ได้ และเป็นสัญญาณที่ชัดที่สุดจากผู้ให้บริการว่าอาคารแน่นช่วงไหน สวนนอกหอหลักไม่มีประตูและไม่มีเวลาปิด จึงเดินชมกำแพงและหอหลักที่มีไฟส่องได้หลังพิพิธภัณฑ์ปิดไปนานแล้ว เวลาเปิดตรวจสอบเมื่อ {CHECKED}
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ในเขตกำแพง</span>
          <h2 className={styles.sectionTitle}>ในสวนปราสาทโอซาก้ามีอะไรที่ต้องเสียเงินอีก?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            สถานที่เสียเงิน 5 แห่งในสวนเดียว ทุกคนซื้อตั๋วหอหลัก อีก 4 แห่งคือส่วนที่ทำให้งบเพิ่ม และ 3 แห่งในนั้นปิดเร็วกว่าหอหลัก
          </p>
          <Table
            head={["สถานที่", "ราคาปกติ", "เวลาเปิด", "ใช้พาสได้ไหม?", "ควรรู้"]}
            rows={parkRows.map((r) => [r.place, r.fee, r.hours, r.pass, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ราคาและเวลาเปิดจากรายชื่อสถานที่ของผู้ให้บริการ Osaka Amazing Pass ตรวจสอบเมื่อ {CHECKED} ราคาเรือ Gozabune ตามกลุ่มอายุและวันปิดของสวนจากเว็บไซต์ท่องเที่ยวทางการของโอซาก้าในวันเดียวกัน มีข้อควรระวังหนึ่งข้อ สวนนิชิโนมารุราคา <strong>¥300</strong> ในรายชื่อปัจจุบันของผู้ให้บริการพาส แต่ยังเป็น <strong>¥200</strong> ในหน้าเก่าของเว็บไซต์ท่องเที่ยวของเมือง จึงควรถือว่าค่าเข้าสวนอยู่ที่ ¥200–300 และตรวจสอบที่ประตู ส่วนอื่นทั้งหมดในสวน ทั้งคูเมือง ทางเข้าโอเทมง กำแพงหิน และตัวอาคาร MIRAIZA เข้าฟรี
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ตั๋วปราสาทโอซาก้าบน Klook →
            </KlookLink>
            <KlookLink href={WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ทัวร์เดินปราสาทและสวนนิชิโนมารุ →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เรื่องพาส</span>
          <h2 className={styles.sectionTitle}>Osaka Amazing Pass คุ้มค่าที่ปราสาทไหม?</h2>
          <p className={styles.bodyText}>
            <strong>ถ้าเข้า 3 แห่ง คุ้ม</strong> รายชื่อของผู้ให้บริการพาสมีสถานที่เสียเงินทั้ง 5 แห่งในสวนปราสาทโอซาก้า ได้แก่ พิพิธภัณฑ์ สวนนิชิโนมารุ ป้อมยางุระ KAIYODO Figure Museum และเรือ Gozabune รวมราคาหน้าประตู <strong>¥5,200</strong> สำหรับผู้ใหญ่ 1 คน เทียบกับพาส 1 วันราคา <strong>{PASS_1_DAY}</strong> และต่างจาก Umeda Sky Building ตรงที่ไม่มีแห่งใดจำกัดช่วงเวลาของวัน
          </p>
          <p className={styles.bodyText}>
            การคำนวณสั้น ๆ พาสราคา {PASS_1_DAY} สำหรับ 1 วัน (ราคาทางการ ตรวจสอบเมื่อ 9 พฤศจิกายน 2026) หอหลักกับเรือ Gozabune รวม <strong>¥3,000</strong> และหอหลัก สวน กับเรือรวม <strong>¥3,300</strong> ทั้งสองแบบต่ำกว่าราคาพาสเล็กน้อย จึงคุ้มเมื่อนับค่ารถไฟใต้ดินของวันนั้น หอหลัก เรือ และ KAIYODO Figure Museum รวม <strong>¥4,000</strong> ซึ่งเกินราคาพาสโดยไม่ต้องออกจากบริเวณปราสาท ถ้าเข้าแค่หอหลัก พาสไม่คุ้มค่า หลักง่าย ๆ คือ เข้า 1 แห่งซื้อตั๋ว เข้า 3 แห่งขึ้นไปซื้อพาส{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              ราคาและตารางคำนวณความคุ้มค่าของ Osaka Amazing Pass (ภาษาอังกฤษ)
            </Link>{" "}
            คำนวณแบบเดียวกันสำหรับวันเที่ยวทั้งเมือง
          </p>
          <p className={styles.bodyText}>
            ข้อที่ควรรู้ก่อนวางแผนวันใช้พาสโดยมีปราสาทอยู่ในนั้นอยู่อีกฝั่งของเมือง{" "}
            <Link href="/th/guides/attractions/umeda-sky-building-tickets" style={linkStyle}>
              คู่มือตั๋ว Umeda Sky Building
            </Link>{" "}
            อธิบายว่าพาสใช้กับจุดชมวิวนั้นได้เฉพาะ <strong>ก่อน 15:00 น.</strong> ซึ่งเป็นตัวกำหนดลำดับของวันใช้พาส คือจุดชมวิวอุเมดะตอนเช้า ปราสาทตอนบ่าย ไม่ใช่กลับกัน{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              คู่มือ Osaka Amazing Pass (ภาษาอังกฤษ)
            </Link>{" "}
            มีรายชื่อสถานที่กว่า 40 แห่ง ราคาพาส 2 วัน และสถานที่ใหญ่ 2 แห่งที่ใช้ไม่ได้ และ{" "}
            <Link href="/guides/attractions/things-to-do-osaka" hrefLang="en" style={linkStyle}>
              สิ่งที่น่าทำในโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            แสดงวิธีแบ่งทริป 2 หรือ 3 วันรอบสถานที่เหล่านี้ รายชื่อสถานที่ตรวจสอบเมื่อ {CHECKED} ถ้าอยากเห็นหอหลักดั้งเดิมแทนหอที่สร้างใหม่{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip" hrefLang="en" style={linkStyle}>
              เที่ยวปราสาทฮิเมจิ 1 วันจากโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            ใช้เวลาประมาณ 1 ชั่วโมงต่อเที่ยวด้วย JR Special Rapid
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              Osaka Amazing Pass บน Klook →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              เฉพาะหอหลัก →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>ไปปราสาทโอซาก้าอย่างไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            มี 5 สถานีรอบสวน และ <strong>ทุกสถานีเดินไปหอหลักประมาณ 15 ถึง 20 นาที</strong> เพราะบริเวณกว้างมากและไม่มีทางลัด สถานีที่เลือกเปลี่ยนแค่ทางเข้า ไม่ได้เปลี่ยนระยะทาง
          </p>
          <Table head={["สถานี", "เดินไปหอหลัก", "ลักษณะทางเข้า"]} rows={accessRows.map((r) => [r.station, r.walk, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            รถบัสเมืองจอดที่ป้าย Osakajo Otemae และ Babacho และเรือแม่น้ำจอดที่ท่า Osakajo-ko ทางฝั่งเหนือ สถานีและทางออกจาก osakacastle.net ตรวจสอบเมื่อ {CHECKED} เวลาเดินจากเว็บไซต์ท่องเที่ยวทางการของโอซาก้าในวันเดียวกัน{" "}
            <Link href="/guides/transport/osaka-transportation" hrefLang="en" style={linkStyle}>
              คู่มือการเดินทางในโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายว่าสาย Chuo และสาย Tanimachi เชื่อมกับเส้นทางอื่นอย่างไร และ{" "}
            <Link href="/guides/transport/osaka-metro-pass" hrefLang="en" style={linkStyle}>
              คู่มือพาส Osaka Metro (ภาษาอังกฤษ)
            </Link>{" "}
            คำนวณว่าตั๋ว 1 วันธรรมดาถูกกว่าการแตะบัตร IC หรือไม่ ถ้าไม่ได้ซื้อ Amazing Pass
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจองตั๋วปราสาทโอซาก้า</h2>
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
              ดูตั๋วปราสาทโอซาก้าบน Klook →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              พร้อมจุดชมวิวอุเมดะและล่องเรือ →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="จองตั๋วปราสาทแล้ว? เตรียมอินเทอร์เน็ตมือถือก่อนเดินทาง" />

        <KlookTripPrep
          label="จองสำหรับวันเดียวกัน"
          heading="วันเที่ยวปราสาทโอซาก้า ควรจองอะไรเพิ่ม?"
          intro="หอหลักและกำแพงใช้เวลาประมาณครึ่งวัน และปราสาทอยู่ระหว่างอุเมดะกับนัมบะ สิ่งที่ยังต้องจองคือที่พักและแผนช่วงค่ำ"
          items={tripPrepItems}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเกี่ยวกับปราสาทโอซาก้า" />

        <KlookTourPicks
          heading="ทัวร์มีไกด์ หรือเที่ยวส่วนอื่นของเมือง"
          intro="1 ชั่วโมงในหอหลักและอีก 1 ชั่วโมงรอบกำแพงคือครึ่งวัน และปราสาทอยู่กึ่งกลางระหว่างอุเมดะกับโดทงโบริซึ่งเดินทางไม่สะดวกนัก ทัวร์แรกเป็นการชมบริเวณปราสาทและสวนพร้อมไกด์ ทัวร์ที่สองไปปราสาท จุดชมวิวอุเมดะ และล่องเรือในวันเดียว ราคาบน Klook เปลี่ยนตามวันที่ เปิดหน้าสินค้าเพื่อดูราคาปัจจุบันและจุดนัดพบ"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/th/guides/attractions/dotonbori-river-cruise", title: "ล่องเรือโดทงโบริ (2026): ราคา เวลาออกเรือ และท่าเรือ" },
            { href: "/th/guides/attractions/umeda-sky-building-tickets", title: "ตั๋ว Umeda Sky Building 2026: ราคา เวลาเปิด และเวลาพระอาทิตย์ตก" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "Osaka Amazing Pass 2026: ¥3,500 คุ้มไหม พร้อมแผน 1 วัน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "สิ่งที่น่าทำในโอซาก้า (2026): ที่ไหนพาสคุ้ม ที่ไหนไม่คุ้ม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "ตั๋ว Kaiyukan (2026): ราคา เวลาเปิด และรอบเข้าชม (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/usj-tickets-express-pass", title: "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน" },
            { href: "/guides/transport/osaka-transportation", title: "การเดินทางในโอซาก้า (2026): รถไฟใต้ดิน รถไฟ และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/transport/osaka-metro-pass", title: "พาส Osaka Metro 2026: เทียบตั๋ว 1 วันกับ 2 วัน และ Enjoy Eco Card (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "ราคาตั๋วสถานที่ท่องเที่ยวในญี่ปุ่น 2026: ราคาทางการและกฎการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำในญี่ปุ่นเพิ่มเติม (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>เข้า 1 แห่ง หรือ 5 แห่ง?</h2>
            <p className={styles.ctaBannerDesc}>
              นี่คือคำถามเดียวที่ทำให้ค่าใช้จ่ายต่างกันที่นี่ ถ้าเข้าแค่หอหลัก ¥1,200 ตั๋วเดี่ยวคือตัวเลือกที่ถูกต้อง ถ้าเพิ่มเรือ สวน หรือป้อม พาสของเมืองจะถูกกว่าตั้งแต่ยังไม่ออกจากเขตกำแพง และใช้นั่งรถไฟใต้ดินได้ด้วย ตรวจสอบเงื่อนไขการยกเลิกในหน้าการจองของคุณก่อนจ่ายเงิน
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋วปราสาทโอซาก้าบน Klook →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                Osaka Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
