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
import {
  akihabaraGoKartTour,
  asakusaGoKartTour,
  asakusaSensojiWalkingTour,
  klookEsim,
  shibuyaAnnexGoKartTour,
  shinjukuNightFoodWalkingTour,
  tokyoBayGoKartTour,
  tokyoGoKartingListUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/tokyo-go-kart) section by section as of
// 2026-11-24 (task-jtk-20261124-TR03): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's; nothing is added. Title term:
// โกคาร์ทโตเกียว — the term Thai travel blogs and Klook th use, with ใบขับขี่สากล for the IDP.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/tokyo-go-kart";
const TITLE = "โกคาร์ทโตเกียว 2026: ราคา ใบขับขี่สากล";
const H1 = "โกคาร์ทในโตเกียว 2026: ราคา ใบขับขี่สากล และเส้นทาง";
const DESC =
  "โกคาร์ทในโตเกียว ¥5,000–¥25,000 ต่อคน ต้องใช้ใบขับขี่สากลเจนีวา 1949 ใบขับขี่ และพาสปอร์ตฉบับจริง";

const LAST_CHECKED = "2026-11-15";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);
const NPA_CHECKED = dateLabel("2026-11-07", LOCALE);

// The English page's Akiba Kart Shibuya listing (its GOKART_URL), on Klook's th path.
const GOKART_URL = klookFor(
  "https://www.klook.com/en-US/activity/116875-shibuya-go-karting-experience-by-akiba-kart-shibuya/",
  LOCALE,
);
const ANNEX_URL = klookFor(shibuyaAnnexGoKartTour.url, LOCALE);
const AKIHABARA_URL = klookFor(akihabaraGoKartTour.url, LOCALE);
const BAY_URL = klookFor(tokyoBayGoKartTour.url, LOCALE);
const ASAKUSA_URL = klookFor(asakusaGoKartTour.url, LOCALE);
const LIST_URL = klookFor(tokyoGoKartingListUrl, LOCALE);
const BUS_URL = klookFor(tokyoSightseeingBusTour.url, LOCALE);
const FOOD_WALK_URL = klookFor(shinjukuNightFoodWalkingTour.url, LOCALE);
const ASAKUSA_WALK_URL = klookFor(asakusaSensojiWalkingTour.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const srcStyle = { color: "var(--text-muted)" } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  { shop: "หากยังไม่แน่ใจว่าจะเลือกสาขาไหน แนะนำสาขา Shibuya Annex (H2-S)", route: "โดเก็นซากะ ห้าแยกชิบูย่า โอโมเตะซันโด ฮาราจูกุ", time: "ประมาณ 1 ชั่วโมง", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: ANNEX_URL, bookLabel: "สาขา Shibuya Annex บน Klook" },
  { shop: "สาขาชิบูย่า (H-S)", route: "ห้าแยกชิบูย่า ฮาราจูกุ โอโมเตะซันโด", time: "ประมาณ 1 ชั่วโมง", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: GOKART_URL, bookLabel: "สาขาชิบูย่าบน Klook" },
  { shop: "สาขาอากิฮาบาระ 1 (A1-S)", route: "ถนนสายหลักของอากิฮาบาระ", time: "ประมาณ 1 ชั่วโมง", day: "¥9,000", evening: "¥12,000", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "สาขาอากิฮาบาระบน Klook" },
  { shop: "สาขาอากิฮาบาระ 2 (A2-S)", route: "อากิฮาบาระ สถานีโตเกียว กินซ่า", time: "ประมาณ 1 ชั่วโมง", day: "¥9,000", evening: "ไม่ได้ระบุ", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "สาขาอากิฮาบาระบน Klook" },
  { shop: "สาขาอากิฮาบาระ 2 (A2-M)", route: "บริเวณรอบพระราชวังอิมพีเรียล ฮาราจูกุ ห้าแยกชิบูย่า", time: "1.5 ถึง 2 ชั่วโมง", day: "¥12,000", evening: "¥17,500", regular: "¥20,000", book: AKIHABARA_URL, bookLabel: "สาขาอากิฮาบาระบน Klook" },
  { shop: "สาขาอ่าวโตเกียว (K-M)", route: "สะพานเรนโบว์และโตเกียวทาวเวอร์", time: "1.5 ถึง 2 ชั่วโมง", day: "¥14,000", evening: "¥22,000", regular: "¥25,000", book: BAY_URL, bookLabel: "สาขาอ่าวโตเกียวบน Klook" },
  { shop: "สาขาชินากาวะ (S-S)", route: "จากชินากาวะไปโตเกียวทาวเวอร์", time: "ประมาณ 1 ชั่วโมง", day: "¥14,000", evening: "¥16,000", regular: "¥20,000", book: LIST_URL, bookLabel: "โกคาร์ทในโตเกียวทั้งหมดบน Klook" },
  { shop: "สาขาอาซากุสะ (Samurai-S)", route: "รอบย่านอาซากุสะ", time: "45 นาทีถึง 1 ชั่วโมง", day: "¥5,000", evening: "¥6,000", regular: "¥12,000", book: ASAKUSA_URL, bookLabel: "สาขาอาซากุสะบน Klook" },
];

const licenceRows = [
  { doc: "เอกสารที่นักท่องเที่ยวส่วนใหญ่ต้องใช้: ใบขับขี่สากลฉบับกระดาษแบบเล่มตามอนุสัญญาเจนีวา 1949 + ใบขับขี่ที่ออกโดยประเทศของคุณ + พาสปอร์ต", drive: "ได้", note: "ต้องเป็นแบบเล่มที่ออกในประเทศของคุณก่อนเดินทางเท่านั้น ไม่สามารถใช้ใบขับขี่สากลแบบบัตร แบบดิจิทัล แบบกระดาษแผ่นเดียว หรือสำเนาได้" },
  { doc: "มีเฉพาะใบขับขี่สากลตามอนุสัญญาเวียนนา 1968", drive: "ไม่ได้", note: "JAF ระบุว่าในญี่ปุ่นใช้ได้เฉพาะใบขับขี่สากลตามอนุสัญญาเจนีวา 1949 หากหน้าปกระบุปี 1968 ทาง Street Kart ขอให้ติดต่อร้านก่อน" },
  { doc: "ใบขับขี่ญี่ปุ่น", drive: "ได้", note: "เป็นเอกสารประเภทแรกที่ระบุไว้ในหน้าข้อมูลใบขับขี่ของ Street Kart ใช้ใบขับขี่รถจักรยานยนต์หรือรถจักรยานยนต์ขนาดเล็ก (Moped) ไม่ได้" },
  { doc: "ใบขับขี่จากสวิตเซอร์แลนด์ เยอรมนี ฝรั่งเศส ไต้หวัน เบลเยียม หรือโมนาโก + คำแปลภาษาญี่ปุ่นที่ได้รับการรับรอง", drive: "ได้", note: "คำแปลใช้แทนใบขับขี่สากล JAF รับคำขอทางออนไลน์เฉพาะจากผู้ที่อยู่ในญี่ปุ่นเท่านั้น" },
  { doc: "ใบขับขี่ SOFA (กองกำลังสหรัฐฯ ในญี่ปุ่น)", drive: "ได้", note: "มีระบุในหน้าข้อมูลใบขับขี่ของ Street Kart" },
  { doc: "ไม่มีใบขับขี่ หรือใบขับขี่จากประเทศที่ไม่อยู่ในรายชื่ออนุสัญญาเจนีวา 1949", drive: "ไม่ได้", note: "ไม่มีที่นั่งผู้โดยสาร และร้านออกเอกสารใด ๆ ให้ในวันนั้นไม่ได้" },
];

const includedRows = [
  { item: "ไกด์นำขบวนและรถโกคาร์ท", status: "รวม", note: "เริ่มจากการชี้แจงด้านความปลอดภัย และไกด์ 1 คนดูแลผู้ขับได้สูงสุด 6 คน" },
  { item: "น้ำมัน", status: "รวม", note: "ผู้ร่วมทัวร์ไม่ต้องเติมน้ำมันเอง" },
  { item: "ประกันพื้นฐาน", status: "รวม", note: "วงเงิน: ความเสียหายต่อร่างกายของบุคคลภายนอก ¥80,000,000 ความเสียหายต่อทรัพย์สิน ¥20,000,000 การบาดเจ็บของผู้ขับ ¥5,000,000" },
  { item: "ค่าเสียหายส่วนแรกเมื่อรถเสียหาย", status: "ไม่รวม", note: "¥50,000 ต่อคัน เรียกเก็บทันทีหลังจบทัวร์ถ้ารถเสียหาย" },
  { item: "ประกันแบบคุ้มครองเต็มรูปแบบ", status: "ซื้อเพิ่มได้", note: "ไม่จำกัดวงเงินคุ้มครองสำหรับบุคคลภายนอก ทรัพย์สิน และรถโกคาร์ท และเพิ่มความคุ้มครองการบาดเจ็บของผู้ขับเป็น ¥30,000,000" },
  { item: "ชุดแฟนซี", status: "ตรวจสอบรายละเอียดขณะจอง", note: "เลือกได้ 1 ชุดตอนเช็กอิน และมีชุดแฟนซีให้เช่าและจำหน่ายด้วย" },
  { item: "กล้องแอ็กชัน", status: "ซื้อเพิ่มได้", note: "เช่าได้ที่ร้าน หรือนำมาเอง" },
  { item: "ใบขับขี่สากลหรือคำแปล", status: "ไม่รวม", note: "คุณต้องเตรียมเอง และทางร้านออกใบขับขี่สากลหรือจัดทำคำแปลให้ไม่ได้" },
];

const fitRows = [
  { rule: "อายุขั้นต่ำ", value: "18 ปี", source: "หน้าจองอากิฮาบาระของ Klook และบทความโกคาร์ทของ Klook" },
  { rule: "ส่วนสูง", value: "150–185 ซม. ในหน้าจองอากิฮาบาระของ Klook และ 150–190 ซม. ในหน้าจอง Akiba Kart ชิบูย่า", source: "หน้าจองของ Klook" },
  { rule: "น้ำหนัก", value: "ไม่เกิน 100 กก.", source: "หน้าจองอากิฮาบาระของ Klook" },
  { rule: "ทักษะการขับขี่", value: "รถใช้เกียร์อัตโนมัติ และผู้ขับขี่ต้องมีทักษะเพียงพอสำหรับขับบนถนนสาธารณะ", source: "คำถามที่พบบ่อยและข้อกำหนดของ Street Kart" },
  { rule: "การแต่งกาย", value: "ห้ามใส่รองเท้าส้นสูง รองเท้าแตะ หรือกระโปรงยาว", source: "หน้าร้านของ Street Kart" },
];

const startRows = [
  { shop: "สาขาอากิฮาบาระ 1", address: "4-12-9 โซโตคันดะ เขตชิโยดะ", access: "ทางออก 1 สถานีซูเอะฮิโรโจ 3 นาที, สถานี JR อากิฮาบาระ 7 นาที" },
  { shop: "สาขาอากิฮาบาระ 2", address: "4-16-7 คันดะซากุมะโจ เขตชิโยดะ", access: "สถานี JR อากิฮาบาระ (ทางออกโชวะโดริ) 8 นาที" },
  { shop: "สาขาชิบูย่า", address: "15-3 มารุยามะโจ เขตชิบูย่า", access: "สถานีชินเซ็น รถไฟสายเคโอ อิโนะคาชิระ 3 นาที, สถานี JR ชิบูย่า 15 นาที" },
  { shop: "สาขา Shibuya Annex", address: "The City Shibuya ชั้น 2, 10-11 มารุยามะโจ", access: "สถานีชินเซ็น รถไฟสายเคโอ อิโนะคาชิระ 5 นาที, สถานี JR ชิบูย่า 15 นาที" },
  { shop: "สาขาชินากาวะ", address: "1-23-15 คิตะชินากาวะ เขตชินากาวะ", access: "สถานีคิตะชินากาวะ สายเคคิว 5 นาที, สถานี JR ชินากาวะ 15 นาที" },
  { shop: "สาขาอาซากุสะ", address: "3-25-31 นิชิอาซากุสะ เขตไทโต", access: "สถานีอาซากุสะของ Tokyo Metro 8 นาที" },
  { shop: "สาขาอ่าวโตเกียว", address: "2-10-8 ชินคิบะ เขตโคโต", access: "สถานีชินคิบะ 10 ถึง 13 นาที" },
];

const whoFor = [
  {
    title: "ผู้ที่มีใบขับขี่ที่ใช้ได้ตามกฎหมายและมั่นใจในการขับรถ",
    desc: "คุณมีใบขับขี่ฉบับสมบูรณ์ที่ยังไม่หมดอายุซึ่งออกโดยประเทศของคุณ คุ้นเคยกับการขับรถบนถนนสาธารณะ และขอใบขับขี่สากลไว้แล้วก่อนเดินทาง ทัวร์นี้จัดขึ้นสำหรับผู้ใหญ่ที่มีใบขับขี่ ไม่ใช่เครื่องเล่นในสวนสนุก",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h2l1-3h12l1 3h2" />
        <path d="M5 12v5h14v-5" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    title: "คนที่อยากเห็นโตเกียวในมุมใหม่",
    desc: "คุณอยากเห็นแลนด์มาร์กอย่างโตเกียวทาวเวอร์ โอไดบะ และบริเวณสะพานเรนโบว์บริดจ์จากระดับถนน ขณะขับรถเปิดประทุนและรับลมตลอดเส้นทาง เส้นทางยอดนิยมมีวิวสวยและมีไกด์นำ คุณเพียงขับตามรถของไกด์ที่นำขบวน",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "ไม่เหมาะสำหรับผู้ที่ไม่มีสิทธิ์ขับรถในญี่ปุ่น",
    desc: "ถ้าคุณอายุต่ำกว่า 18 ปี ไม่มีใบขับขี่ หรือใบขับขี่ของคุณออกโดยประเทศที่ไม่เข้าข่ายเงื่อนไขที่ญี่ปุ่นรับรอง คุณจะขับโกคาร์ทเหล่านี้อย่างถูกกฎหมายไม่ได้ ทางร้านแก้ปัญหาเรื่องเอกสารให้ไม่ได้ในวันทัวร์ จึงควรเตรียมเอกสารให้พร้อมก่อนจอง",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "ขอใบขับขี่สากลในประเทศของคุณก่อนเดินทาง",
    desc: "ใบขับขี่สากลตามอนุสัญญาเจนีวา 1949 ออกได้เฉพาะในประเทศของคุณ และออกในญี่ปุ่นไม่ได้ ต้องเป็นฉบับกระดาษแบบเล่ม ใบขับขี่สากลแบบบัตร แบบดิจิทัล และแบบแผ่นเดียวใช้ไม่ได้ นอกจากนี้ยังมีการขายใบขับขี่สากลปลอมทางออนไลน์ด้วย ถ้าคุณมาจากสวิตเซอร์แลนด์ เยอรมนี ฝรั่งเศส ไต้หวัน เบลเยียม หรือโมนาโก ต้องใช้คำแปลภาษาญี่ปุ่นที่ได้รับการรับรองแทน JAF รับคำขอเหล่านี้ทางออนไลน์จากภายในญี่ปุ่นเท่านั้น และใช้เวลาเฉลี่ย 2 ถึง 3 วันทำการ จึงควรเผื่อเวลาสำหรับขั้นตอนนี้ไว้ช่วงต้นทริป หรือสอบถามสถานทูตหรือสถานกงสุลของประเทศคุณในญี่ปุ่น",
  },
  {
    title: "นำเอกสารฉบับจริง 3 รายการมาด้วย: ใบขับขี่สากล ใบขับขี่ที่ออกโดยประเทศของคุณ และหนังสือเดินทาง",
    desc: "ในวันทัวร์ต้องนำเอกสารฉบับจริงทั้งหมดมา คือใบขับขี่ฉบับจริงที่ออกโดยประเทศของคุณ ใบขับขี่สากล (หรือคำแปลจาก JAF หรือสถานทูต) และพาสปอร์ต สำเนา รูปถ่ายในโทรศัพท์ และใบขับขี่ดิจิทัลใช้ไม่ได้ หากไม่ได้นำเอกสารฉบับจริงมา จะเข้าร่วมทัวร์ไม่ได้และไม่ได้รับเงินคืน",
  },
  {
    title: "ตรวจสอบว่าคุณมีคุณสมบัติตามเงื่อนไข",
    desc: `หน้าจองของ Klook กำหนดอายุขั้นต่ำ 18 ปี และใบขับขี่ของคุณต้องเป็นประเภทที่ใช้ขับรถในญี่ปุ่นได้อย่างถูกกฎหมาย (ใบขับขี่สากลตามอนุสัญญาเจนีวา 1949 หรือคำแปลสำหรับประเทศที่ระบุ) ใช้ใบขับขี่รถจักรยานยนต์หรือรถจักรยานยนต์ขนาดเล็ก (Moped) ไม่ได้ Street Kart ยังเปิดให้ส่งรูปถ่ายเอกสารหลังการจองเพื่อตรวจสอบล่วงหน้าได้ด้วย รถโกคาร์ทมีเพียงที่นั่งเดียว จึงไม่สามารถนั่งไปด้วยในฐานะผู้โดยสารได้ ตรวจสอบกฎของ Street Kart เมื่อ ${CHECKED} และเกณฑ์อายุของ Klook เมื่อ ${NPA_CHECKED}`,
  },
  {
    title: "จองล่วงหน้าและไปถึงก่อนเวลาเพื่อรับฟังคำชี้แจงด้านความปลอดภัย",
    desc: `จองรอบที่ต้องการทางออนไลน์และเลือกเส้นทาง Street Kart ขอให้ไปถึงสาขา 30 นาทีก่อนเวลาเริ่มทัวร์เพื่อตรวจเอกสารและรับฟังคำชี้แจงด้านความปลอดภัย และคนที่มาสายจะร่วมทัวร์ไม่ได้ ในญี่ปุ่นต้องขับรถชิดซ้าย ทัวร์มีไกด์นำ คุณจึงขับตามรถของไกด์ที่นำขบวนตลอดทาง ข้อมูล ณ ${CHECKED}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ขับโกคาร์ทในโตเกียวต้องมีใบขับขี่ไหม",
    a: "ต้องมี โกคาร์ทบนถนนในโตเกียววิ่งบนถนนสาธารณะ คุณจึงต้องมีใบขับขี่ญี่ปุ่น หรือใบขับขี่ที่ออกโดยประเทศของคุณพร้อมใบขับขี่สากลฉบับกระดาษแบบเล่มตามอนุสัญญาเจนีวา 1949 และพาสปอร์ต เอกสารทั้งหมดต้องเป็นฉบับจริง ผู้ถือใบขับขี่จากสวิตเซอร์แลนด์ เยอรมนี ฝรั่งเศส ไต้หวัน เบลเยียม และโมนาโกใช้คำแปลภาษาญี่ปุ่นที่ได้รับการรับรองแทนใบขับขี่สากลได้ ใบขับขี่สากลออกได้เฉพาะในประเทศของคุณก่อนเดินทาง",
  },
  {
    q: "ขับโกคาร์ทในโตเกียวราคาเท่าไร",
    a: `ตารางราคาทางการของ Street Kart เดือนพฤศจิกายน 2026 เริ่มต้นที่ ¥5,000 ต่อคนสำหรับเส้นทางอาซากุสะ 45 นาทีถึง 1 ชั่วโมง ¥9,000 ที่อากิฮาบาระ และ ¥16,000 ที่ชิบูย่า ส่วนเส้นทาง 1.5 ถึง 2 ชั่วโมงของอากิฮาบาระและอ่าวโตเกียวเริ่มที่ ¥12,000 ถึง ¥14,000 ราคาปกติสูงสุด ¥25,000 ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ใบขับขี่สากลตามอนุสัญญาเวียนนา 1968 ใช้ในญี่ปุ่นได้ไหม",
    a: "ใช้ไม่ได้ JAF ระบุว่าในญี่ปุ่นใช้ได้เฉพาะใบขับขี่สากลที่ออกตามอนุสัญญาเจนีวา 1949 และใบขับขี่สากลตามสนธิสัญญาอื่น เช่น อนุสัญญาเวียนนา 1968 ใช้ไม่ได้ Street Kart ระบุเพิ่มเติมว่าใบขับขี่สากลที่ใช้ได้ส่วนใหญ่มีตัวเลข 1949 บนหน้าปก และแนะนำให้ติดต่อทางร้านก่อนหากใบขับขี่สากลของคุณระบุปี 1968",
  },
  {
    q: "ขับโกคาร์ทในโตเกียวตอนฝนตกหรือหน้าหนาวได้ไหม",
    a: "โดยทั่วไปทำได้ Street Kart ระบุว่าปกติจัดทัวร์ทุกสภาพอากาศ และแนะนำให้ติดต่อทางร้านหากไม่แน่ใจ ตารางราคาของทุกสาขาในโตเกียวแสดงรอบให้บริการครบทั้ง 12 เดือน รวมถึงธันวาคมถึงกุมภาพันธ์ อย่างไรก็ตาม ตามข้อกำหนด ผู้ให้บริการสามารถระงับ ยกเลิก หรือเปลี่ยนแปลงทัวร์ได้",
  },
  {
    q: "โกคาร์ทบนถนนในโตเกียวปลอดภัยและถูกกฎหมายไหม",
    a: "ถูกกฎหมายเมื่อคุณมีใบขับขี่ที่ใช้ได้ในญี่ปุ่น รถของ Street Kart สร้างมาสำหรับถนนสาธารณะในญี่ปุ่น และผู้ให้บริการไม่รับผู้ขับที่ไม่มีเอกสารถูกต้อง คุณขับบนถนนจริงและต้องขับชิดซ้าย มีไกด์นำ ไกด์ 1 คนดูแลผู้ขับได้สูงสุด 6 คน รวมประกันพื้นฐาน และเส้นทางไม่ใช้ทางด่วน",
  },
];

const picks = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "ทัวร์รถบัสเที่ยวโตเกียว 1 วัน",
    desc: "ทัวร์มีไกด์นำเที่ยวสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมคำบรรยายเสียงหลายภาษา",
  }),
  withKlookLocale(shinjukuNightFoodWalkingTour, LOCALE, {
    title: "ทัวร์ชิมอาหารยามค่ำคืนในชินจูกุ: โอโมอิเดะโยโกโจ คาบุกิโจ และโกลเดนไก",
    desc: "ทัวร์เดินชิมอาหารแบบกลุ่มหลังพระอาทิตย์ตก ระยะเวลา 3 ชั่วโมง ผ่านโอโมอิเดะโยโกโจ คาบุกิโจ และโกลเดนไก ชิมอาหารที่ร้านท้องถิ่น 3 ร้าน และดื่ม 1 แก้วที่อิซากายะในโกลเดนไก",
  }),
  { title: "eSIM ญี่ปุ่นของ Klook", desc: "eSIM สำหรับญี่ปุ่นที่ส่งเป็นวอเชอร์พร้อม QR Code สำหรับใช้แผนที่และส่งข้อความตลอดทริป", url: ESIM_URL },
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    desc: "ใช้รถไฟใต้ดิน Tokyo Metro และ Toei ได้ทุกสายโดยไม่จำกัดเที่ยว รับตั๋วเมื่อเดินทางถึงญี่ปุ่นโดยไม่ต้องต่อคิวซื้อ",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "โกคาร์ทในโตเกียว" }];

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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={c === 0 ? undefined : { fontSize: "0.88rem" }}>
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

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={srcStyle}>
      {children}
    </a>
  );
}

export default function ThTokyoGoKartPage({ updated }: { updated: PageUpdated }) {
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
            ขับโกคาร์ทที่วิ่งบนถนนได้อย่างถูกกฎหมายผ่านใจกลางกรุงโตเกียว ผ่านแลนด์มาร์กอย่างโตเกียวทาวเวอร์และบริเวณสะพานเรนโบว์บริดจ์ สิ่งที่ต้องให้ความสำคัญคือเอกสารที่ใช้ในการขับขี่ เพราะใบขับขี่สากลออกได้เฉพาะในประเทศของคุณก่อนเดินทาง
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ต้องมีใบขับขี่สากล", "อายุ 18 ปีขึ้นไป"].map((t) => (
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
            การขับโกคาร์ทในโตเกียวต้องใช้ใบขับขี่ญี่ปุ่น หรือใบขับขี่ที่ออกโดยประเทศของคุณพร้อมใบขับขี่สากลฉบับกระดาษแบบเล่มที่ออกตาม<strong>อนุสัญญาเจนีวา 1949</strong> และพาสปอร์ต ใบขับขี่สากลตามอนุสัญญาเวียนนา 1968 อย่างเดียวใช้ไม่ได้ ตารางราคาทางการของ Street Kart เดือนพฤศจิกายน 2026 ระบุราคาเส้นทาง 1 ชั่วโมงเริ่มต้นที่ <strong>¥5,000</strong> (อาซากุสะ) <strong>¥9,000</strong> (อากิฮาบาระ) หรือ <strong>¥16,000</strong> (ชิบูย่า) ต่อคน และเส้นทาง 1.5 ถึง 2 ชั่วโมงเริ่มที่ <strong>¥12,000</strong> (อากิฮาบาระ) หรือ <strong>¥14,000</strong> (อ่าวโตเกียว ข้ามสะพานเรนโบว์) ราคาปกติสูงสุด ¥25,000 ทัวร์เริ่มต้นจากสาขาในชิบูย่า อากิฮาบาระ อาซากุสะ ชินากาวะ และอ่าวโตเกียว (ชินคิบะ) และผู้ขับขี่ที่ไม่มีเอกสารฉบับจริงจะเข้าร่วมทัวร์ไม่ได้และไม่ได้รับเงินคืน ตรวจสอบเมื่อ {CHECKED}
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูโกคาร์ทชิบูย่าบน Klook →
            </KlookLink>
          </div>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>คำตอบสั้น ๆ</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ราคาต่อคน</p>
                <p className={styles.verdictStatValue}>ประมาณ ¥5,000 ถึง ¥25,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ระยะเวลาทัวร์</p>
                <p className={styles.verdictStatValue}>45 นาทีถึง 2 ชั่วโมง มีไกด์นำ</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เอกสารที่จำเป็นสำหรับการขับขี่</p>
                <p className={styles.verdictStatValue}>ใบขับขี่สากล + ใบขับขี่ที่ออกโดยประเทศของคุณ + พาสปอร์ต</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ขอใบขับขี่สากล</p>
                <p className={styles.verdictStatValue}>ที่ประเทศของคุณ ก่อนเดินทาง</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุปสั้น ๆ:</strong> การจองทำได้ง่าย แต่สิ่งที่ทำให้คนส่วนใหญ่เข้าร่วมทัวร์ไม่ได้คือเอกสาร ใบขับขี่สากลออกได้<em>เฉพาะ</em>ในประเทศของคุณก่อนเดินทาง ทำในญี่ปุ่นไม่ได้ และทางร้านแก้ปัญหาเรื่องเอกสารให้ไม่ได้ในวันทัวร์ เมื่อเตรียมเอกสารพร้อมแล้ว ที่เหลือก็เป็นเพียงรายละเอียด
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดูโกคาร์ทบนถนนในโตเกียว →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>โกคาร์ทบนถนนในญี่ปุ่นคืออะไร และทัวร์โกคาร์ทในโตเกียวเป็นแบบไหน</h2>
          <p className={styles.bodyText}>
            ทัวร์โกคาร์ทบนถนนในโตเกียวคือการขับรถโกคาร์ทขนาดเล็กที่วิ่งบนถนนได้อย่างถูกกฎหมาย ขับเป็นขบวนไปตามถนนสาธารณะในเมืองโดยมีไกด์นำทาง เส้นทางยอดนิยมผ่านสถานที่ท่องเที่ยวชื่อดัง เช่น บริเวณสะพานเรนโบว์บริดจ์ โตเกียวทาวเวอร์ โอไดบะ และชิบูย่า คุณจะได้ชมเมืองจากมุมมองระดับถนนขณะขับรถเปิดประทุน ซึ่งเป็นมุมที่ไม่ได้เห็นจากรถไฟหรือรถบัส และปกติมีชุดแฟนซีทั่วไปให้ใส่ระหว่างทัวร์
          </p>
          <p className={styles.bodyText}>
            เรื่องสำคัญที่ต้องรู้ก่อน: นี่คือ<strong>กิจกรรมขับโกคาร์ทบนถนนทั่วไป</strong> <strong>ไม่มีความเกี่ยวข้อง ไม่ได้รับการสนับสนุนหรือรับรองจากวิดีโอเกม ตัวละคร หรือแบรนด์บันเทิงใด ๆ</strong> และชุดแฟนซีที่มีให้ก็เป็นชุดทั่วไป จุดเด่นของกิจกรรมนี้คือการได้ขับรถด้วยตัวเอง และนั่นคือเหตุผลที่เอกสารสำคัญมาก
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียวราคาเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            ตามตารางราคาของ Street Kart เดือนพฤศจิกายน 2026 โกคาร์ทบนถนนในโตเกียวราคาประมาณ ¥5,000 ถึง ¥25,000 ต่อคน โดยราคาขึ้นอยู่กับสาขาที่เป็นจุดเริ่มต้นของทัวร์ เส้นทาง และช่วงเวลา ถ้ายังไม่แน่ใจ ให้จองเส้นทาง 1 ชั่วโมงของสาขา Shibuya Annex ซึ่งผ่านห้าแยกชิบูย่า โอโมเตะซันโด และฮาราจูกุ ทุกสาขาในตารางด้านล่างที่ระบุราคาทั้งสองช่วงเวลา รอบเย็นมีราคาสูงกว่ารอบกลางวัน
          </p>
          <Table
            head={["สาขาและเส้นทาง", "จุดเด่นระหว่างทาง", "ระยะเวลาเส้นทาง", "รอบกลางวัน เริ่มต้น", "รอบเย็น เริ่มต้น", "ราคาปกติ เริ่มต้น", "จอง"]}
            rows={priceRows.map((row) => [
              row.shop,
              row.route,
              row.time,
              row.day,
              row.evening,
              row.regular,
              <KlookLink key="b" href={row.book} target="_blank" rel={KLOOK_REL} style={{ color: "var(--red)", fontWeight: 600 }}>
                {row.bookLabel} →
              </KlookLink>,
            ])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            ราคาขั้นต่ำต่อคนตามตารางราคาอย่างเป็นทางการของแต่ละสาขาในเดือนพฤศจิกายน 2026 ตรวจสอบเมื่อ {CHECKED} ราคาเปลี่ยนตามเดือนและรอบ และปฏิทินการจองของผู้ให้บริการแสดงราคาสำหรับวันที่คุณเลือก ราคาในคอลัมน์รอบกลางวันและรอบเย็นเป็นราคารีวิว ซึ่งระบบใช้ให้อัตโนมัติเมื่อจองออนไลน์ ตามข้อกำหนดของผู้ให้บริการ ราคานี้ไม่ขึ้นอยู่กับว่าจะเขียนรีวิวหรือไม่ ส่วนราคาปกติใช้กับลูกค้าที่ไม่ประสงค์ให้เปิดเผยการมาใช้บริการ ลิงก์ในคอลัมน์จองจะพาไปยังหน้าจองของสาขานั้นบน Klook ซึ่งกำหนดราคาแยกต่างหาก สาขาชินากาวะไม่มีหน้าจองแยก ลิงก์จึงเปิดรายการโกคาร์ทในโตเกียวทั้งหมดบน Klook
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ตรวจสอบล่าสุด: {LAST_CHECKED} แหล่งข้อมูลทางการ: <Src href="https://akiba-kart.com/en/shibuya2.html">สาขา Shibuya Annex</Src>,{" "}
            <Src href="https://akiba-kart.com/en/shibuya.html">สาขาชิบูย่า</Src>,{" "}
            <Src href="https://streetkart.tokyo/en/akihabara.html">สาขาอากิฮาบาระ 1</Src>,{" "}
            <Src href="https://streetkart.tokyo/en/akihabara2.html">สาขาอากิฮาบาระ 2</Src>,{" "}
            <Src href="https://streetkart.com/en/tokyobay.html">สาขาอ่าวโตเกียว</Src>,{" "}
            <Src href="https://streetkart.com/en/shinagawa.html">สาขาชินากาวะ</Src>,{" "}
            <Src href="https://streetkart.com/en/asakusa.html">สาขาอาซากุสะ</Src>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            การจองผ่าน Klook มีราคาของตัวเอง เปิดหน้าจองเพื่อดูราคาสำหรับวันที่คุณเลือก เพื่อเปรียบเทียบ ในเดือนเดียวกัน Street Kart สาขาโอซาก้าระบุว่าทัวร์ประมาณ 1 ชั่วโมงราคาเริ่มต้นที่ ¥7,000 และยังมีสาขาที่โอกินาว่า คุณใช้เอกสารชุดเดียวกันขับโกคาร์ทที่โอซาก้าได้{" "}
            <Link href="/guides/attractions/osaka-go-kart" style={linkStyle}>
              คู่มือโกคาร์ทโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            เปรียบเทียบเส้นทางผ่านโดทงโบริและนัมบะ
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>สิ่งที่รวมในราคา</span>
          <h2 className={styles.sectionTitle}>ค่าทัวร์โกคาร์ทในโตเกียวรวมอะไรบ้าง</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            ค่าทัวร์รวมรถโกคาร์ท ไกด์ และประกันพื้นฐาน แต่คุณต้องจ่ายค่าเสียหายส่วนแรก ¥50,000 ถ้ารถเสียหาย ค่าใช้จ่ายในการขอใบขับขี่สากลหรือคำแปลเป็นความรับผิดชอบของคุณเองเสมอ
          </p>
          <Table head={["รายการ", "สถานะ", "รายละเอียด"]} rows={includedRows.map((r) => [r.item, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            จากคำถามที่พบบ่อย หน้าร้าน และข้อกำหนดของ Street Kart ตรวจสอบเมื่อ {CHECKED} หากจองผ่าน Klook ให้ยึดรายการที่รวมตามที่ระบุในหน้าจองของ Klook
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เลือกเส้นทาง</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียว เส้นทางไหนดีที่สุด (ชิบูย่า อากิฮาบาระ หรืออ่าวโตเกียว)</h2>
          <p className={styles.bodyText}>
            เลือกสาขาชิบูย่าหากต้องการขับผ่านห้าแยกชิบูย่า เลือกสาขาอากิฮาบาระหากต้องการจ่ายน้อยกว่า และเลือกสาขาอ่าวโตเกียวหากอยากข้ามสะพานเรนโบว์และมีเวลา 1.5 ถึง 2 ชั่วโมง ในตารางราคาเดือนพฤศจิกายน เส้นทางชิบูย่าเริ่มที่ ¥16,000 ส่วนเส้นทาง 1 ชั่วโมงของอากิฮาบาระเริ่มที่ ¥9,000 เส้นทาง 1 ชั่วโมงของสาขาอากิฮาบาระ 2 ยังผ่านสถานีโตเกียวและกินซ่าด้วย
          </p>
          <p className={styles.bodyText}>
            เส้นทางอื่น ๆ เหมาะกับผู้ที่มีจุดหมายเฉพาะเจาะจง เส้นทางจากสาขาชินากาวะมุ่งหน้าไปโตเกียวทาวเวอร์ เส้นทางอ่าวโตเกียวคือเส้นทางที่ข้ามสะพานเรนโบว์ และเส้นทาง A2-M ที่ยาวกว่าของสาขาอากิฮาบาระ 2 ไปถึงห้าแยกชิบูย่าโดยผ่านบริเวณรอบพระราชวังอิมพีเรียลและย่านฮาราจูกุ หากพักอยู่ในย่านอากิฮาบาระซึ่งขึ้นชื่อเรื่องเครื่องใช้ไฟฟ้าอยู่แล้ว ลองวางแผนเที่ยวคู่กับ{" "}
            <Link href="/guides/attractions/akihabara-anime-tour" style={linkStyle}>
              คู่มือทัวร์อนิเมะในอากิฮาบาระ (ภาษาอังกฤษ)
            </Link>
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูทัวร์สาขา Shibuya Annex →
            </KlookLink>
            <KlookLink href={AKIHABARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูทัวร์อากิฮาบาระ →
            </KlookLink>
            <KlookLink href={BAY_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูทัวร์อ่าวโตเกียว →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>คุณสมบัติของผู้ขับขี่</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียวต้องมีใบขับขี่ไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            ต้องมี โกคาร์ทบนถนนในญี่ปุ่นวิ่งบนถนนสาธารณะ คุณจึงต้องมีใบขับขี่ที่ใช้ขับรถในญี่ปุ่นได้อย่างถูกกฎหมาย และไม่มีที่นั่งผู้โดยสารสำหรับคนที่ไม่มีใบขับขี่ กฎที่สำคัญที่สุดคือ ใบขับขี่สากลตามอนุสัญญาเจนีวา 1949 ต้องขอ<strong>ในประเทศของคุณก่อนเดินทาง</strong> ออกในญี่ปุ่นไม่ได้ ตรวจสอบตารางด้านล่างว่าคุณเข้าข่ายกรณีใด
          </p>
          <Table head={["เอกสารที่คุณมี", "ขับได้ไหม", "รายละเอียด"]} rows={licenceRows.map((r) => [r.doc, r.drive, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {LAST_CHECKED} (หน้าข้อมูลใบขับขี่ของ Street Kart และ JAF) ใบขับขี่สากลหรือใบขับขี่ต่างประเทศใช้ในญี่ปุ่นได้ 1 ปีนับจากวันที่เข้าประเทศ หรือจนถึงวันหมดอายุ แล้วแต่ว่ากำหนดใดจะมาถึงก่อน และใบขับขี่สากลเองมีอายุ 1 ปีนับจากวันออก (สำนักงานตำรวจแห่งชาติญี่ปุ่น ตรวจสอบเมื่อ {NPA_CHECKED}) แหล่งข้อมูลทางการ:{" "}
            <Src href="https://akiba-kart.com/en/license_shibuya.html">หน้าข้อมูลใบขับขี่ของ Street Kart</Src>,{" "}
            <Src href="https://english.jaf.or.jp/driving-in-japan/drive-in-japan/switch-to-japanese-license">JAF</Src> กฎเปลี่ยนได้ จึงควรตรวจสอบกับผู้ให้บริการก่อนจองว่าสัญชาติของคุณเข้าข่ายหรือไม่ และต้องนำเอกสารฉบับจริงทั้งหมดมาในวันทัวร์
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ไม่มีใบขับขี่สากล</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียวโดยไม่มีใบขับขี่สากลได้ไหม</h2>
          <p className={styles.bodyText}>
            ได้เฉพาะเมื่อคุณมีเอกสารอื่นที่ใช้ขับรถในญี่ปุ่นได้อย่างถูกกฎหมาย คือใบขับขี่ญี่ปุ่น ใบขับขี่ SOFA หรือใบขับขี่จาก 6 ประเทศและดินแดนที่ระบุไว้พร้อมคำแปลภาษาญี่ปุ่นที่ได้รับการรับรอง ถ้าไม่มีอย่างใดอย่างหนึ่ง คุณจะขับไม่ได้ ทางร้านแก้ปัญหาให้ในวันทัวร์ไม่ได้ และคุณจะไม่ได้รับเงินคืน
          </p>
          <p className={styles.bodyText}>
            เรื่องที่หลายคนมักพลาดคือการขอคำแปลใบขับขี่ เพราะ JAF ไม่รับคำขอจากนอกญี่ปุ่น JAF รับคำขอทางออนไลน์จากภายในญี่ปุ่น ค่าธรรมเนียม ¥6,000 บวกค่าพิมพ์หน้าละ ¥20 และการจัดทำคำแปลใบขับขี่จากทั้ง 6 ประเทศและดินแดนนี้ใช้เวลาเฉลี่ย 2 ถึง 3 วันทำการ หากใช้บริการ JAF การมาถึงญี่ปุ่นเพียงหนึ่งวันก่อนทัวร์จะไม่ทันแน่นอน จึงควรจองทัวร์โกคาร์ทไว้ช่วงท้ายของทริป
          </p>
          <div className={styles.verdictBox} style={{ marginTop: "1.25rem" }}>
            <div className={styles.verdictBody}>
              <p className={styles.verdictText}>
                <strong>ไม่มีใบขับขี่สากล? จองทัวร์เหล่านี้แทน</strong> คุณได้ชมถนนสายเดียวกันโดยไม่ต้องมีใบขับขี่ ได้แก่ ทัวร์รถบัสมีไกด์นำเที่ยวสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี ทัวร์เดินชิมอาหารแบบกลุ่มในชินจูกุหลังพระอาทิตย์ตก ระยะเวลา 3 ชั่วโมง หรือทัวร์เดินเที่ยวครึ่งวันพร้อมไกด์บริเวณวัดเซ็นโซจิ
              </p>
              <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
                <KlookLink href={BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  ดูทัวร์รถบัสโตเกียว 1 วัน →
                </KlookLink>
                <KlookLink href={FOOD_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  ดูทัวร์ชิมอาหารยามค่ำคืนในชินจูกุ →
                </KlookLink>
                <KlookLink href={ASAKUSA_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  ดูทัวร์เดินอาซากุสะ →
                </KlookLink>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ข้อจำกัด</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียวมีข้อจำกัดด้านอายุและส่วนสูงไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            จำกัด หน้าจองของ Klook กำหนดอายุขั้นต่ำ 18 ปี และส่วนสูงขั้นต่ำ 150 ซม. เว็บไซต์ของ Street Kart ไม่ได้ระบุข้อจำกัดด้านอายุหรือส่วนสูง จึงควรตรวจสอบหน้าจองของรายการที่คุณจอง
          </p>
          <Table head={["เงื่อนไข", "ข้อกำหนด", "แหล่งที่มา"]} rows={fitRows.map((r) => [r.rule, r.value, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบเมื่อ {NPA_CHECKED} ข้อมูลของ Klook อ้างอิงจากเนื้อหาหน้าจองที่ระบบค้นหาจัดทำดัชนีไว้
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>สภาพอากาศ</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียวตอนฝนตกหรือหน้าหนาวได้ไหม</h2>
          <p className={styles.bodyText}>
            ส่วนใหญ่ได้ Street Kart ระบุว่าปกติจัดทัวร์ทุกสภาพอากาศ และแนะนำให้ติดต่อทางร้านหากไม่แน่ใจ อย่างไรก็ตาม ตามข้อกำหนด ผู้ให้บริการสามารถระงับ ยกเลิก หรือเปลี่ยนแปลงทัวร์ได้ ในฤดูหนาวยังเปิดให้บริการ ตารางราคาของทุกสาขาในโตเกียวแสดงรอบให้บริการครบทั้ง 12 เดือน รวมถึงธันวาคมถึงกุมภาพันธ์ จึงควรแต่งกายให้เหมาะกับสภาพอากาศขณะขับรถเปิดประทุน
          </p>
          <p className={styles.bodyText}>
            ถ้าจองตรงกับผู้ให้บริการ ยกเลิกฟรีได้จนถึง 7 วันก่อนวันทัวร์ตามเวลาญี่ปุ่น หากยกเลิกในช่วง 6 วันก่อนวันทัวร์ จะเป็นไปตามนโยบายการยกเลิกของผู้ให้บริการ จึงควรอ่านก่อนชำระเงิน และการเปลี่ยนแปลงการจองขึ้นอยู่กับที่ว่างในรอบที่ต้องการ การจองผ่าน Klook ใช้เงื่อนไขตามหน้าจองของ Klook ตรวจสอบเมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ความปลอดภัย</span>
          <h2 className={styles.sectionTitle}>โกคาร์ทบนถนนในโตเกียวปลอดภัยและถูกกฎหมายไหม</h2>
          <p className={styles.bodyText}>
            ถูกกฎหมายเมื่อผู้ขับทุกคนมีใบขับขี่ที่ใช้ได้ในญี่ปุ่น Street Kart ระบุว่ารถของบริษัทออกแบบมาเฉพาะสำหรับถนนสาธารณะในญี่ปุ่น และไม่รับคนที่ไม่มีเอกสารฉบับจริงที่ถูกต้อง แต่ก็ยังเป็นการขับบนถนนจริงและต้องขับชิดซ้าย จึงควรปฏิบัติเหมือนการขับรถจริง ไม่ใช่เครื่องเล่น
          </p>
          <p className={styles.bodyText}>
            ทัวร์มีไกด์นำ โดยไกด์ 1 คนดูแลผู้ขับได้สูงสุด 6 คน หลังจากรับฟังคำชี้แจงด้านความปลอดภัยที่ร้าน เส้นทางไม่ใช้ทางด่วน ประกันพื้นฐานรวมอยู่ในค่าทัวร์ และรถโกคาร์ทมีเพียงที่นั่งเดียว จึงพาผู้โดยสารนั่งไปด้วยไม่ได้ ถ้ารถเสียหายต้องจ่ายค่าเสียหายส่วนแรก ¥50,000 เว้นแต่จะซื้อประกันแบบคุ้มครองเต็มรูปแบบเพิ่ม ตรวจสอบเมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>เหมาะกับใคร</span>
          <h2 className={styles.sectionTitle}>ทัวร์โกคาร์ทบนถนนเหมาะกับคุณไหม</h2>
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
          <p className={styles.bodyText}>
            เส้นทาง 1 ชั่วโมงใช้เวลาประมาณ 90 นาทีเมื่อรวมการเช็กอิน 30 นาที จึงจัดไว้ใน{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>
              แผนเที่ยวโตเกียว 3 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            หรือ{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>
              กิจกรรมน่าทำในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            ได้ง่าย เด็กขับไม่ได้และรถเป็นแบบที่นั่งเดียว ครอบครัวจึงต้องวางแผนกิจกรรมอื่นสำหรับสมาชิกที่อายุต่ำกว่า 18 ปี{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>
              แผนเที่ยวโตเกียวกับเด็ก (ภาษาอังกฤษ)
            </Link>{" "}
            มีแผนเที่ยวรายวันที่เหมาะกับสมาชิกทุกคนในครอบครัว ถ้าอยากเดินเที่ยวช่วงเย็นแทน{" "}
            <Link href="/guides/attractions/tokyo-night-food-tour" style={linkStyle}>
              ทัวร์ชิมอาหารยามค่ำคืนในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            ไม่ต้องใช้ใบขับขี่เลย และทัวร์จักรยานไฟฟ้าใน{" "}
            <Link href="/guides/attractions/tokyo-bike-tour" style={linkStyle}>
              คู่มือทัวร์จักรยานโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            ก็เช่นกัน ถ้าทริปยาวขึ้น เส้นทางอ่าวโตเกียวจัดไว้ในวันที่เที่ยวบริเวณอ่าวของ{" "}
            <Link href="/guides/attractions/tokyo-4-day-itinerary" style={linkStyle}>
              แผนเที่ยวโตเกียว 4 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            ได้ดี
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจองทัวร์โกคาร์ทในโตเกียว</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>ควรจองทัวร์เมื่อเตรียมเอกสารครบแล้ว</strong> ไม่ใช่ก่อนหน้านั้น เพราะร้านไม่คืนเงินถ้าเอกสารไม่ครบ
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ANNEX_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              จองทัวร์สาขา Shibuya Annex บน Klook →
            </KlookLink>
            <KlookLink href={AKIHABARA_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              จองทัวร์อากิฮาบาระบน Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>วางแผนวันเที่ยว</span>
          <h2 className={styles.sectionTitle}>ทัวร์โกคาร์ทในโตเกียวเริ่มจากที่ไหน</h2>
          <p className={styles.bodyText}>
            ทัวร์ของ Street Kart เริ่มที่สาขาที่คุณจอง และแต่ละสาขามีเส้นทางของตัวเอง ตรวจสอบจุดนัดพบที่แน่นอนในใบยืนยันการจอง และเผื่อเวลาเดินทางให้ไปถึงก่อนเริ่มการชี้แจงด้านความปลอดภัย
          </p>
          <Table head={["สาขา", "ที่อยู่", "สถานีที่ใกล้ที่สุด (เวลาเดิน)"]} rows={startRows.map((r) => [r.shop, r.address, r.access])} />
          <p className={styles.bodyText} style={noteStyle}>
            จากหน้าร้านของ Street Kart ตรวจสอบเมื่อ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            ร้านไม่มีที่จอดรถ และผู้ให้บริการไม่แนะนำให้เดินทางมาด้วยรถยนต์หรือ Uber เพราะรถติดทำให้มาสายได้ และคนที่มาสายจะร่วมทัวร์ไม่ได้{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>
              คู่มือเลือกย่านที่พักในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            เปรียบเทียบย่านต่าง ๆ ที่น่าพัก และถ้ายังไม่คุ้นกับการเดินทาง{" "}
            <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>
              คู่มือการเดินทางในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายพื้นฐานเรื่องรถไฟ รถไฟใต้ดิน และบัตร IC
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเรื่องโกคาร์ทในโตเกียว" />

        <KlookTourPicks
          heading="หากเอกสารของคุณไม่ตรงตามข้อกำหนด"
          intro="ทัวร์ในโตเกียว 2 รายการที่เพียงจองก็เข้าร่วมได้ พร้อม eSIM และตั๋วรถไฟใต้ดินที่ใช้ได้ทุกวัน เปิดหน้าจองเพื่อดูราคาล่าสุดตามวันที่คุณเลือก"
          tours={picks}
        />

        <Related
          items={[
            { href: "/guides/attractions/akihabara-anime-tour", title: "ทัวร์อนิเมะในอากิฮาบาระ (2026): ทัวร์พร้อมไกด์ เวลาเปิดทำการของร้าน และวิธีเดินทาง (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-transportation", title: "การเดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "กิจกรรมน่าทำในโตเกียว (2026): อะไรต้องจองก่อน อะไรไปได้เลย (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "กิจกรรมสัมผัสประสบการณ์ซามูไรและนินจาในโตเกียว (2026): ควรจองแบบไหน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-food-tour", title: "ทัวร์ชิมอาหารในโตเกียว (2026): เลือกย่านไหนดี และทัวร์มีข้อดีอย่างไร (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 หรือ 72 ชั่วโมง คุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/th", title: "คู่มือเที่ยวญี่ปุ่นเพิ่มเติม →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>พร้อมขับโกคาร์ทเที่ยวโตเกียวแล้วหรือยัง</h2>
            <p className={styles.ctaBannerDesc}>
              จองทัวร์โกคาร์ทบนถนนล่วงหน้า แล้วนำเอกสารฉบับจริง 3 รายการมาในวันทัวร์: ใบขับขี่สากล ใบขับขี่ที่ออกโดยประเทศของคุณ และหนังสือเดินทาง อย่าลืมว่าต้องขอใบขับขี่สากลในประเทศของคุณก่อนเดินทาง
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดูโกคาร์ทบนถนนในโตเกียว →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
