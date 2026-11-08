import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import { GygCompareButton } from "../../../../components/GygCompare";
import { gygTokyoSkytree } from "../../../../lib/gyg-links";
import {
  skytreeTicket,
  skytreeAquariumCombo,
  fujiHakoneDayTour,
  tokyoSightseeingBusTour,
  skytreeTripPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

// Mirrors the English guide (/guides/attractions/tokyo-skytree-tickets) block for block as of
// 2026-11-01. Every figure comes from that page or lib/attraction-prices.ts; nothing was added.

const ROUTE = "/th/guides/attractions/tokyo-skytree-tickets";
const TITLE = "ตั๋ว Tokyo Skytree 2026: ราคา ชั้น 350";
const DESC =
  "ตั๋ว Tokyo Skytree 2026: ชั้น 350 เริ่ม ¥1,800 คอมโบ 350+450 ¥3,000 ซื้อหน้างานบวก ¥500";

const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, "th");
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");

const TICKET_URL = klookFor(skytreeTicket.url, "th");
const GYG_SLUG = "th-tokyo-skytree-tickets";

const tripPrepItems = [
  withKlookLocale(skytreeTripPrep[0], "th", {
    label: "โรงแรมย่านอุเอโนะ / อาซากุสะ",
    ctaLabel: "ดูโรงแรมย่านอุเอโนะและอาซากุสะบน Klook →",
    why: "ฝั่งแม่น้ำเดียวกับหอ อุเอโนะอยู่บนสายยามาโนเตะ จากนั้นสายกินซ่าวิ่งไปถึงอาซากุสะ และโอชิอาเกะอยู่ถัดไปอีกสองสถานีบนสายอาซากุสะ ขึ้นจุดชมวิวรอบดึกแล้วจึงไม่ต้องนั่งรถไฟข้ามเมืองกลับโรงแรม",
  }),
  withKlookLocale(skytreeTripPrep[1], "th", {
    label: "เช่ากิโมโน Kimono Yae ที่อาซากุสะ",
    ctaLabel: "ดูร้านเช่ากิโมโนที่อาซากุสะ →",
    why: "ครึ่งกลางวันของทริปเดียวกัน ห่างไปสองสถานี ร้านอยู่ข้างประตูคามินาริมง และหน้าสินค้าระบุให้คืนชุดภายใน 17:30 ซึ่งทำให้กิจกรรมนี้มาก่อนรอบ Skytree ตอนเย็นพอดี ไม่ชนกัน",
  }),
  withKlookLocale(skytreeTripPrep[2], "th", {
    label: "รถบัส Hop-on hop-off โตเกียว (Skyhop Bus)",
    ctaLabel: "ดูตั๋วรถบัสหลังคาเปิด →",
    why: "ตั๋วรถบัสหลังคาเปิดแบบขึ้นลงได้ไม่จำกัด ที่มีเส้นทางผ่านอาซากุสะ เหมาะซื้อถ้าวันนั้นมีทั้งวัดเซ็นโซจิและหอ แทนที่จะแวะจุดเดียวแล้วจ่ายค่ารถไฟใต้ดินทุกช่วง",
  }),
  withKlookLocale(skytreeTripPrep[3], "th", {
    label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    ctaLabel: "ดูตั๋วรถไฟใต้ดิน →",
    why: "โอชิอาเกะเป็นสถานีรถไฟใต้ดินของสายฮันโซมงและสายโทเออาซากุสะ ตั๋ว Metro และ Toei แบบ 24, 48 หรือ 72 ชั่วโมงจึงครอบคลุมการเดินทางไปหอแล้ว รวมถึงสองสถานีไปวัดเซ็นโซจิหลังจากนั้นด้วย",
  }),
];

const tourPicks = [
  withKlookLocale(skytreeAquariumCombo, "th", {
    title: "ตั๋วคอมโบ Tokyo Skytree + Sumida Aquarium",
    desc: "จุดชมวิวรวมกับพิพิธภัณฑ์สัตว์น้ำในคอมเพล็กซ์ Solamachi เดียวกันที่ฐานหอ",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "th", {
    title: "ทัวร์รถบัสเที่ยวโตเกียว 1 วัน",
    desc: "ทัวร์พร้อมไกด์วนรอบสวนพระราชวังอิมพีเรียล อาซากุสะ และ Tokyo Skytree พร้อมออดิโอไกด์หลายภาษา",
  }),
  withKlookLocale(fujiHakoneDayTour, "th", {
    title: "ทัวร์ 1 วัน ภูเขาไฟฟูจิ＋ฮาโกเน่",
    desc: "สถานีที่ 5 ของภูเขาไฟฟูจิ คู่กับเขตภูเขาไฟฮาโกเน่และทะเลสาบอาชิ เป็นทริปไปกลับหนึ่งวันจากโตเกียว",
  }),
];

const priceRows = [
  { ticket: "ชั้น 350 — ผู้ใหญ่ (15 ปีขึ้นไป)", advance: ADULT, sameDay: "บวกค่าบริการ ¥500" },
  { ticket: "ชั้น 350 — เด็ก (6–14 ปี)", advance: CHILD, sameDay: "บวกค่าบริการ ¥500" },
  { ticket: "คอมโบ ชั้น 350＋450 — ผู้ใหญ่", advance: "เริ่มต้น ¥3,000", sameDay: "บวกค่าบริการ ¥500" },
  { ticket: "คอมโบ ชั้น 350＋450 — เด็ก", advance: "เริ่มต้น ¥1,500", sameDay: "บวกค่าบริการ ¥500" },
  { ticket: "เพิ่มชั้น 450 ที่หน้างาน — ผู้ใหญ่", advance: "ไม่ขายออนไลน์", sameDay: "¥1,400" },
  { ticket: "เพิ่มชั้น 450 ที่หน้างาน — เด็ก", advance: "ไม่ขายออนไลน์", sameDay: "¥700" },
  { ticket: "อายุไม่เกิน 5 ปี", advance: "ฟรี", sameDay: "ฟรี" },
];

const whoFor = [
  {
    title: "ชั้น 350 อย่างเดียวก็พอ ถ้า…",
    desc: `หากต้องการชมวิวเป็นหลัก ไม่จำเป็นต้องขึ้นชั้น 450 ชั้น 350 คือจุดชมวิวหลักสามชั้น และมองเห็นที่ราบคันโตทั้งผืนอยู่แล้ว ผู้ใหญ่ ${ADULT} เมื่อคิดเป็นราคาต่อความสูง 1 เมตร ถือว่าถูกที่สุดในบรรดาจุดชมวิวแบบเสียเงินหลัก ๆ ของโตเกียว`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "เพิ่มชั้น 450 ถ้า…",
    desc: "ความสูงคือเป้าหมายของทริป ชั้น 450 คือ Tembo Galleria ทางเดินกระจกลาดเอียงที่วนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ บัตรคอมโบ (ชั้น 350 + 450) ราคาออนไลน์เริ่มต้น ¥3,000 ถ้าไปเพิ่มในวันนั้นจะบวกอีก ¥1,400 จากตั๋วชั้น 350",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "ไปรอบดึก ถ้า…",
    desc: "คุณอยากได้วิวกลางคืนมากกว่าเส้นขอบฟ้า ในวันที่ตรวจสอบ จุดชมวิวเปิดถึง 22:00 และรับเข้าครั้งสุดท้าย 21:00 รอบดึกคือรอบที่ยังมีที่ว่างเมื่อรอบกลางวันเต็มไปแล้ว",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const deckRows = [
  {
    deck: "Tokyo Skytree",
    height: "ชั้น 350 และชั้น 450",
    price: "เริ่มต้น ¥1,800 (ชั้น 350)・คอมโบ เริ่มต้น ¥3,000",
    highlight: "จุดชมวิวที่สูงที่สุดในโตเกียว และเป็นที่เดียวที่มีทางเดินกระจก",
    area: "โอชิอาเกะ／สถานี Tokyo Skytree",
  },
  {
    deck: "Shibuya Sky",
    height: "ดาดฟ้าสูงราว 229 เมตร",
    price: "จองออนไลน์ล่วงหน้า ¥2,500",
    highlight: "ดาดฟ้ากลางแจ้งเหนือแยกชิบูยะ — จุดขายคือรูป ไม่ใช่ความสูง",
    area: "สถานีชิบูยะ",
  },
  {
    deck: "Tokyo Tower",
    height: "ชั้นชมวิวราว 150 และราว 250 เมตร",
    price: "ราว ¥3,300 (Top Deck Tour)",
    highlight: "แลนด์มาร์กปี 1958 และวิวที่มี Skytree อยู่ในนั้น",
    area: "สวนชิบะ／อากาบาเนะบาชิ",
  },
  {
    deck: "อาคารรัฐบาลกรุงโตเกียว",
    height: "ราว 202 เมตร",
    price: "ฟรี",
    highlight: "ไม่ต้องมีตั๋วเลย — วิวพาโนรามาเมืองที่คุ้มที่สุดในโตเกียว",
    area: "ชินจูกุ",
  },
];

const steps = [
  {
    title: "ตัดสินใจก่อนจองว่าเอาชั้น 350 หรือคอมโบ",
    desc: "ชั้น 450 ซื้อเป็นคอมโบออนไลน์ (ผู้ใหญ่เริ่มต้น ¥3,000) ถูกกว่าไปซื้อเพิ่มในวันนั้นบนตั๋วชั้น 350 (บวก ¥1,400) ถ้ามีโอกาสที่คุณจะอยากขึ้นทางเดินกระจก ให้ซื้อคอมโบตั้งแต่แรก",
  },
  {
    title: "จองตั๋วระบุวันทางออนไลน์",
    desc: `เว็บไซต์ทางการขายตั๋วระบุวันตามราคา "เริ่มต้น" ข้างบน และยอดของวันที่คุณไปจริงอาจสูงกว่านั้น ซื้อในวันเข้าชมที่เคาน์เตอร์ชั้น 4 หรือร้านสะดวกซื้อจะบวกค่าบริการ ¥500 ต่อตั๋วหนึ่งใบ ซึ่งเป็นเหตุผลที่ชัดที่สุดของการจองล่วงหน้า วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    title: "ถ้าใช้บัตรที่ออกในต่างประเทศ ให้ซื้อผ่านตัวแทนจำหน่าย",
    desc: "Klook ขายตั๋วระบุเวลาเข้าชมแบบเดียวกัน พร้อมหน้าชำระเงินภาษาไทยและ e-ticket ช่วยเลี่ยงปัญหาเรื่องบัตรและภาษาที่ผู้มาเยือนหลายคนเจอในเว็บไซต์สถานที่ท่องเที่ยวของญี่ปุ่น และหน้าสินค้าเดียวกันก็มีคอมโบชั้น 450 ด้วย",
  },
  {
    title: "เช็กเวลาเปิดของวันที่คุณไป ไม่ใช่เวลาทั่วไป",
    desc: `Skytree ประกาศปฏิทินรายวัน และระบุชัดว่า "เวลาเปิดอาจเปลี่ยนแปลงโดยไม่แจ้งล่วงหน้า" โดยรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด ในวันที่ตรวจสอบ จุดชมวิวเปิด 10:00–22:00 และรับเข้าครั้งสุดท้าย 21:00`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว Tokyo Skytree ราคาเท่าไร?",
    a: `ตั๋วระบุวันบนเว็บไซต์ทางการสำหรับชั้น 350 ซึ่งเป็นจุดชมวิวหลัก ผู้ใหญ่ (15 ปีขึ้นไป) เริ่มต้น ¥1,800 และเด็กอายุ 6–14 ปี เริ่มต้น ¥900 ตั๋วคอมโบที่รวมชั้น 350 และชั้น 450 ผู้ใหญ่เริ่มต้น ¥3,000 เด็กเริ่มต้น ¥1,500 เด็กอายุไม่เกิน 5 ปีเข้าฟรี ทั้งหมดเป็นราคา "เริ่มต้น" ยอดของวันที่เจาะจงอาจสูงกว่า ตรวจสอบจากเว็บไซต์ทางการเมื่อ ${CHECKED}`,
  },
  {
    q: "ซื้อตั๋ว Tokyo Skytree ล่วงหน้าถูกกว่าไหม?",
    a: `ถูกกว่า และส่วนต่างเป็นตัวเลขที่ประกาศไว้ชัดเจน ไม่ได้ขึ้นกับความต้องการที่ขึ้นลง ซื้อในวันเข้าชมที่เคาน์เตอร์ขายตั๋วชั้น 4 หรือที่ร้านสะดวกซื้อจะบวกค่าบริการ ¥500 ต่อตั๋วหนึ่งใบจากค่าเข้าชม ครอบครัวสี่คนคือ ¥2,000 ที่เลี่ยงได้ การจองตั๋วระบุวันทางออนไลน์ ไม่ว่าที่เว็บไซต์ทางการหรือผ่านตัวแทนจำหน่าย จะข้ามทั้งค่าบริการและคิวที่เคาน์เตอร์ วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "ชั้น 350 กับชั้น 450 ต่างกันอย่างไร?",
    a: "ชั้น 350 คือ Tembo Deck จุดชมวิวหลักสามชั้น และเป็นชั้นที่ตั๋วทุกใบรวมไว้ ชั้น 450 คือ Tembo Galleria ทางเดินผนังกระจกลาดเอียงที่วนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ ชั้น 450 ไปอย่างเดียวไม่ได้ ต้องมีตั๋วชั้น 350 ก่อน ไม่ว่าจะซื้อเป็นคอมโบออนไลน์ หรือเพิ่มที่เครื่องขายตั๋วหน้างานในราคา ¥1,400 (ผู้ใหญ่)",
  },
  {
    q: "ซื้อตั๋วชั้น 450 ออนไลน์ได้ไหม?",
    a: `ซื้อเป็นตั๋วเดี่ยวไม่ได้ เว็บไซต์ทางการขายชั้น 450 เฉพาะในตั๋วคอมโบ ถ้าคุณมาพร้อมตั๋วชั้น 350 แล้วเปลี่ยนใจ ให้เพิ่มชั้น 450 ที่เครื่องขายตั๋วหน้างานในราคา ¥1,400 (ผู้ใหญ่) หรือ ¥700 (เด็ก 6–14 ปี) การซื้อคอมโบออนไลน์ถูกกว่า คือผู้ใหญ่เริ่มต้น ¥3,000 เทียบกับ ¥1,800 บวก ¥1,400 เมื่อแยกซื้อสองครั้ง วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "Tokyo Skytree เปิดกี่โมง?",
    a: `Skytree ใช้ปฏิทินรายวันแทนตารางเวลาเดียวตายตัว และเว็บไซต์ทางการระบุว่า "เวลาเปิดอาจเปลี่ยนแปลงโดยไม่แจ้งล่วงหน้า" และรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด ในวันที่ตรวจสอบ จุดชมวิวเปิด 10:00–22:00 และรับเข้าครั้งสุดท้าย 21:00 ควรเช็กปฏิทินของวันที่คุณไปก่อนวางแผนช่วงเย็นไว้ที่นี่ วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "Tokyo Skytree หรือ Shibuya Sky ที่ไหนดีกว่า?",
    a: "สองที่ตอบโจทย์ต่างกัน Skytree คือเรื่องความสูงและระยะมอง ชั้น 350 และชั้น 450 เป็นจุดชมวิวที่สูงที่สุดในโตเกียว วิวครอบคลุมที่ราบคันโตทั้งผืน และวันที่ฟ้าใสจะเห็นภูเขาไฟฟูจิด้วย Shibuya Sky คือเรื่องรูปถ่าย ดาดฟ้ากลางแจ้งสูงราว 229 เมตรเหนือแยกชิบูยะพอดี สวยที่สุดตอนพระอาทิตย์ตก และให้บรรยากาศมากกว่าความสูง ถ้าเลือกได้ที่เดียว ไป Skytree เพื่อวิวพาโนรามา และไป Shibuya Sky เพื่อรูปที่ทุกคนจำได้",
  },
  {
    q: "มองเห็นภูเขาไฟฟูจิจาก Tokyo Skytree ไหม?",
    a: "วันที่ฟ้าใสมองเห็นได้ และด้วยความสูง Skytree จึงมีโอกาสดีที่สุดในบรรดาจุดชมวิวในเมือง ทัศนวิสัยขึ้นอยู่กับสภาพอากาศทั้งหมด และมักดีกว่าในเดือนที่อากาศเย็นและแห้ง รวมถึงช่วงเช้า ไม่มีอะไรรับประกันในวันใดวันหนึ่ง ซึ่งควรจำไว้ก่อนจ่ายราคาคอมโบเพื่อวิวฟูจิโดยเฉพาะ",
  },
  {
    q: "ไป Tokyo Skytree อย่างไร?",
    a: "หอตั้งอยู่เหนือสถานี Tokyo Skytree ของสาย Tobu Skytree และสถานีโอชิอาเกะ ซึ่งมีรถไฟใต้ดินโตเกียวเมโทรสายฮันโซมง สายโทเออาซากุสะ และสายเคเซโอชิอาเกะ โอชิอาเกะอยู่ในขอบเขตของ Tokyo Subway Ticket ถ้าคุณถือบัตรนั้นอยู่แล้ว การเดินทางมาที่นี่จึงไม่มีค่าใช้จ่ายเพิ่ม อาซากุสะอยู่ห่างไปสองสถานีบนสายอาซากุสะ จัดสองที่นี้ไว้ในบ่ายเดียวกันได้ง่าย",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว Tokyo Skytree" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTokyoSkytreePage({ updated }: { updated: PageUpdated }) {
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
            ตั๋ว Tokyo Skytree 2026:<br />ราคา ชั้น 350 vs 450 และวิธีจอง
          </h1>
          <p className={styles.heroSubtitle}>
            จุดชมวิวที่สูงที่สุดในโตเกียว และเป็นสถานที่ที่การซื้อตั๋วในวันเข้าชมมีค่าธรรมเนียมเพิ่มตามที่ประกาศไว้ชัดเจน
            นี่คือราคาทางการ สิ่งที่ชั้น 450 ให้เพิ่มจริง ๆ และวิธีจองจากต่างประเทศ
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "ชั้น 350 vs ชั้น 450"].map((t) => (
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
                <p className={styles.verdictStatLabel}>ชั้น 350 (ผู้ใหญ่)</p>
                <p className={styles.verdictStatValue}>เริ่มต้น ¥1,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>คอมโบ 350＋450</p>
                <p className={styles.verdictStatValue}>เริ่มต้น ¥3,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ซื้อในวันเข้าชม</p>
                <p className={styles.verdictStatValue}>เพิ่ม ¥500 ต่อใบ</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>อายุไม่เกิน 5 ปี</p>
                <p className={styles.verdictStatValue}>ฟรี</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> จองตั๋วระบุวันทางออนไลน์ Skytree เก็บค่าบริการ ¥500 ต่อตั๋วหนึ่งใบ
              ที่เคาน์เตอร์ขายตั๋ววันเดียวกัน การจองล่วงหน้าจึงถูกกว่าตามจำนวนที่ประกาศไว้ชัดเจน ไม่ต้องลุ้น
              ถ้ามีโอกาสที่คุณจะอยากขึ้นทางเดินกระจกชั้น 450 ให้ซื้อคอมโบตั้งแต่แรก เพราะไปเพิ่มที่หน้างาน
              ภายหลังจะแพงขึ้น ¥1,400 ราคาอ่านจากเว็บไซต์ทางการ วันที่ตรวจสอบ {CHECKED}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                เช็กตั๋ว Tokyo Skytree บน Klook →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>คุณกำลังซื้ออะไร</h2>
          <p className={styles.bodyText}>
            Tokyo Skytree ขายค่าเข้าชมสองชั้นที่แยกกัน <strong>ชั้น 350</strong> คือ Tembo Deck
            จุดชมวิวสามชั้น และเป็นชั้นที่ตั๋วทุกใบรวมไว้ <strong>ชั้น 450</strong> คือ Tembo Galleria
            ทางเดินผนังกระจกลาดเอียงที่วนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ และไปอย่างเดียวไม่ได้
          </p>
          <p className={styles.bodyText}>
            ความสับสนส่วนใหญ่มาจากโครงสร้างสองระดับนี้ เพราะราคาของสองชั้นต่างกันตามว่าคุณซื้อรวมกันออนไลน์
            หรือแยกซื้อในวันเข้าชม ส่วนถัดไปวางสองทางเลือกไว้เทียบกัน
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ราคาตั๋ว Tokyo Skytree</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ตั๋ว", "ออนไลน์ ระบุวัน", "ซื้อในวันเข้าชม"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            อ่านจากเว็บไซต์ทางการของ Tokyo Skytree วันที่ตรวจสอบ {CHECKED} หน้าทางการระบุราคาเหล่านี้เป็นราคา
            &ldquo;เริ่มต้น&rdquo; ยอดของวันที่เจาะจงจึงอาจสูงกว่า ควรยืนยันตอนจอง ค่าบริการ ¥500
            สำหรับการซื้อในวันเข้าชมคิดต่อตั๋วหนึ่งใบ ทั้งที่เคาน์เตอร์ชั้น 4 และที่ร้านสะดวกซื้อ
          </p>
        </section>

        <KlookTripPrep
          label="รอบ ๆ หอ"
          heading="สิ่งที่ควรจองไว้สำหรับวันฝั่งโอชิอาเกะ"
          intro="รอบขึ้นจุดชมวิวใช้เวลาหนึ่งถึงสองชั่วโมง และตั๋วข้างบนเป็นสิ่งเดียวที่ต้องระบุเวลา รายการด้านล่างคือการจองที่ช่วงบ่ายที่เหลือของวันนั้นต้องใช้ ทั้งหมดอยู่ฝั่งแม่น้ำเดียวกับหอ และอยู่ในบัญชีเดียวกับตั๋ว"
          items={tripPrepItems}
        />

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>ตั๋วแบบไหน</span>
          <h2 className={styles.sectionTitle}>ชั้น 350 คอมโบ หรือรอบดึก?</h2>
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

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกัน</span>
          <h2 className={styles.sectionTitle}>Skytree เทียบกับจุดชมวิวอื่นในโตเกียว</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Skytree คือตัวเลือกด้านความสูง ถ้าสิ่งที่คุณอยากได้จริง ๆ คือรูปแยกชิบูยะ{" "}
            <Link href="/th/guides/attractions/shibuya-sky-tickets">Shibuya Sky</Link>{" "}
            คุ้มกว่า และถ้าอยากได้วิวพาโนรามาเมืองโดยไม่เสียเงินเลย อาคารรัฐบาลกรุงโตเกียวที่ชินจูกุเข้าฟรี
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["จุดชมวิว", "ความสูง", "ราคา (ราว)", "จุดเด่น", "ย่าน"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตัวเลขของ Skytree และ Shibuya Sky มาจากเว็บไซต์ของผู้ให้บริการเอง ส่วน Tokyo Tower และอาคารรัฐบาล
            กรุงโตเกียวเป็นค่าประมาณและอาจเปลี่ยนแปลง ควรยืนยันตอนจอง
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจองตั๋ว Tokyo Skytree</h2>
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
            การเดินทางเป็นส่วนที่ง่าย หอตั้งอยู่บนสถานี Tokyo Skytree และสถานีโอชิอาเกะ และโอชิอาเกะเป็นสถานี
            รถไฟใต้ดิน จึงใช้{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket (ภาษาอังกฤษ)</Link>{" "}
            ได้ถ้าคุณมีอยู่แล้ว ส่วน{" "}
            <Link href="/guides/transport/tokyo-transportation">คู่มือการเดินทางในโตเกียว (ภาษาอังกฤษ)</Link>{" "}
            อธิบายว่าเครือข่าย Metro และ Toei เชื่อมกันอย่างไร
          </p>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="จองไปพร้อมกับกิจกรรมอื่นของวัน"
          intro="รอบ Skytree ใช้เวลาหนึ่งถึงสองชั่วโมง รายการเหล่านี้อยู่ในบัญชี Klook เดียวกับตั๋ว จึงจองกิจกรรมที่เหลือของวันในการชำระเงินครั้งเดียวกันได้"
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/tokyo-bay-cruise", title: "ล่องเรืออ่าวโตเกียว (2026): Yakatabune vs Symphony เวลาและราคา (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/asakusa-kimono-rental", title: "เช่ากิโมโนที่อาซากุสะ (2026): เวลาคืนชุด ทำผม และจุดถ่ายรูป (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "แผนเที่ยวโตเกียว 3 วัน (2026): จองอะไร และจองตามลำดับไหน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "ตั๋ว Tokyo Tower (2026): ราคา Main Deck vs Top Deck และวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 หรือ 72 ชั่วโมง คุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "ตั๋ว Warner Bros. Studio Tour Tokyo (2026): ราคาและวิธีจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว (2026): เลือกทัวร์ไหน และได้เห็นอะไรจริง (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/teamlab-planets-tickets", title: "ตั๋ว teamLab Planets 2026 ราคา เวลา" },
            { href: "/guides/attractions", title: "สิ่งที่น่าทำในญี่ปุ่นเพิ่มเติม (ภาษาอังกฤษ) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองก่อนที่เคาน์เตอร์จะคิดเงินเพิ่ม</h2>
            <p className={styles.ctaBannerDesc}>
              ตั๋วที่ซื้อในวันเข้าชมมีค่าบริการ ¥500 ต่อคน ตั๋วระบุวันที่จองออนไลน์ข้ามทั้งค่าบริการและคิว
              และ Klook ให้ชำระเงินผ่านหน้าภาษาไทยด้วยบัตรต่างประเทศได้
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                ดูตั๋ว Tokyo Skytree บน Klook →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
