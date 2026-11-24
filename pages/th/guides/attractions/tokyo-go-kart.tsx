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
const H1 = "โกคาร์ทโตเกียว 2026: ราคา ใบขับขี่สากล และเส้นทาง";
const DESC =
  "โกคาร์ทโตเกียว ¥5,000–¥25,000 ต่อคน ต้องใช้ใบขับขี่สากลเจนีวา 1949 ใบขับขี่ และพาสปอร์ตตัวจริง";

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
  { shop: "ถ้ายังไม่แน่ใจ เลือกสาขา Shibuya Annex (H2-S)", route: "โดเก็นซากะ ทางข้ามชิบูย่า โอโมเตะซันโด ฮาราจูกุ", time: "ประมาณ 1 ชั่วโมง", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: ANNEX_URL, bookLabel: "สาขา Shibuya Annex บน Klook" },
  { shop: "สาขาชิบูย่า (H-S)", route: "ทางข้ามชิบูย่า ฮาราจูกุ โอโมเตะซันโด", time: "ประมาณ 1 ชั่วโมง", day: "¥16,000", evening: "¥18,000", regular: "¥20,000", book: GOKART_URL, bookLabel: "สาขาชิบูย่าบน Klook" },
  { shop: "สาขาอากิฮาบาระ 1 (A1-S)", route: "ถนนสายหลักของอากิฮาบาระ", time: "ประมาณ 1 ชั่วโมง", day: "¥9,000", evening: "¥12,000", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "สาขาอากิฮาบาระบน Klook" },
  { shop: "สาขาอากิฮาบาระ 2 (A2-S)", route: "อากิฮาบาระ สถานีโตเกียว กินซ่า", time: "ประมาณ 1 ชั่วโมง", day: "¥9,000", evening: "ไม่ได้ระบุ", regular: "¥15,000", book: AKIHABARA_URL, bookLabel: "สาขาอากิฮาบาระบน Klook" },
  { shop: "สาขาอากิฮาบาระ 2 (A2-M)", route: "รอบพระราชวังอิมพีเรียล ฮาราจูกุ ทางข้ามชิบูย่า", time: "1.5 ถึง 2 ชั่วโมง", day: "¥12,000", evening: "¥17,500", regular: "¥20,000", book: AKIHABARA_URL, bookLabel: "สาขาอากิฮาบาระบน Klook" },
  { shop: "สาขาอ่าวโตเกียว (K-M)", route: "สะพานเรนโบว์และโตเกียวทาวเวอร์", time: "1.5 ถึง 2 ชั่วโมง", day: "¥14,000", evening: "¥22,000", regular: "¥25,000", book: BAY_URL, bookLabel: "สาขาอ่าวโตเกียวบน Klook" },
  { shop: "สาขาชินากาวะ (S-S)", route: "จากชินากาวะไปโตเกียวทาวเวอร์", time: "ประมาณ 1 ชั่วโมง", day: "¥14,000", evening: "¥16,000", regular: "¥20,000", book: LIST_URL, bookLabel: "โกคาร์ทโตเกียวทั้งหมดบน Klook" },
  { shop: "สาขาอาซากุสะ (Samurai-S)", route: "รอบย่านอาซากุสะ", time: "45 นาทีถึง 1 ชั่วโมง", day: "¥5,000", evening: "¥6,000", regular: "¥12,000", book: ASAKUSA_URL, bookLabel: "สาขาอาซากุสะบน Klook" },
];

const licenceRows = [
  { doc: "คำตอบสำหรับนักท่องเที่ยวส่วนใหญ่: ใบขับขี่สากลแบบเล่มกระดาษตามอนุสัญญาเจนีวา 1949 + ใบขับขี่ประเทศของคุณ + พาสปอร์ต", drive: "ได้", note: "ต้องเป็นแบบเล่มที่ออกในประเทศของคุณก่อนเดินทางเท่านั้น ใบขับขี่สากลแบบบัตร แบบดิจิทัล แบบแผ่นเดียว และสำเนาใช้ไม่ได้" },
  { doc: "มีเฉพาะใบขับขี่สากลตามอนุสัญญาเวียนนา 1968", drive: "ไม่ได้", note: "JAF ระบุว่าในญี่ปุ่นใช้ได้เฉพาะใบขับขี่สากลตามอนุสัญญาเจนีวา 1949 ถ้าหน้าปกเขียนว่า 1968 ทาง Street Kart ขอให้ติดต่อร้านก่อน" },
  { doc: "ใบขับขี่ญี่ปุ่น", drive: "ได้", note: "อยู่ลำดับแรกในหน้าข้อมูลใบขับขี่ของ Street Kart ใบขับขี่รถจักรยานยนต์และโมเพดใช้ไม่ได้" },
  { doc: "ใบขับขี่จากสวิตเซอร์แลนด์ เยอรมนี ฝรั่งเศส ไต้หวัน เบลเยียม หรือโมนาโก + คำแปลภาษาญี่ปุ่นที่ได้รับการรับรอง", drive: "ได้", note: "คำแปลใช้แทนใบขับขี่สากล JAF รับคำขอออนไลน์จากภายในญี่ปุ่นเท่านั้น" },
  { doc: "ใบขับขี่ SOFA (กองกำลังสหรัฐฯ ในญี่ปุ่น)", drive: "ได้", note: "มีระบุในหน้าข้อมูลใบขับขี่ของ Street Kart" },
  { doc: "ไม่มีใบขับขี่ หรือใบขับขี่จากประเทศที่ไม่อยู่ในรายชื่ออนุสัญญาเจนีวา 1949", drive: "ไม่ได้", note: "ไม่มีที่นั่งผู้โดยสาร และร้านออกเอกสารใด ๆ ให้ในวันนั้นไม่ได้" },
];

const includedRows = [
  { item: "ไกด์นำขบวนและรถโกคาร์ท", status: "รวม", note: "เริ่มจากการบรรยายความปลอดภัย และไกด์ 1 คนดูแลผู้ขับได้สูงสุด 6 คน" },
  { item: "น้ำมัน", status: "รวม", note: "ผู้ร่วมทัวร์ไม่ต้องเติมน้ำมันเอง" },
  { item: "ประกันพื้นฐาน", status: "รวม", note: "วงเงิน: ความเสียหายต่อร่างกายผู้อื่น ¥80,000,000 ทรัพย์สิน ¥20,000,000 การบาดเจ็บของผู้ขับ ¥5,000,000" },
  { item: "ค่าเสียหายส่วนแรกเมื่อรถเสียหาย", status: "ไม่รวม", note: "¥50,000 ต่อคัน เรียกเก็บทันทีหลังจบทัวร์ถ้ารถเสียหาย" },
  { item: "ประกันแบบคุ้มครองเต็ม", status: "ซื้อเพิ่มได้", note: "ยกเลิกวงเงินจำกัดสำหรับผู้อื่น ทรัพย์สิน และรถโกคาร์ท และเพิ่มความคุ้มครองการบาดเจ็บของผู้ขับเป็น ¥30,000,000" },
  { item: "ชุดคอสตูม", status: "ตรวจสอบในการจอง", note: "เลือกได้ 1 ชุดตอนเช็กอิน และมีชุดคอสตูมในรายการเช่าและขายด้วย" },
  { item: "กล้องแอ็กชัน", status: "ซื้อเพิ่มได้", note: "เช่าได้ที่ร้าน หรือนำมาเอง" },
  { item: "ใบขับขี่สากลหรือคำแปล", status: "ไม่รวม", note: "คุณต้องเตรียมเอง และร้านออกให้ไม่ได้ทั้งสองอย่าง" },
];

const fitRows = [
  { rule: "อายุขั้นต่ำ", value: "18 ปี", source: "หน้าสินค้าอากิฮาบาระของ Klook และบทความโกคาร์ทของ Klook" },
  { rule: "ส่วนสูง", value: "150–185 ซม. ในหน้าสินค้าอากิฮาบาระของ Klook และ 150–190 ซม. ในหน้าสินค้า Akiba Kart ชิบูย่า", source: "หน้าสินค้าของ Klook" },
  { rule: "น้ำหนัก", value: "ไม่เกิน 100 กก.", source: "หน้าสินค้าอากิฮาบาระของ Klook" },
  { rule: "ทักษะการขับ", value: "รถเกียร์อัตโนมัติ และต้องมีทักษะพอจะขับบนถนนสาธารณะได้", source: "คำถามที่พบบ่อยและข้อกำหนดของ Street Kart" },
  { rule: "การแต่งกาย", value: "ห้ามใส่รองเท้าส้นสูง รองเท้าแตะ หรือกระโปรงยาว", source: "หน้าร้านของ Street Kart" },
];

const startRows = [
  { shop: "สาขาอากิฮาบาระ 1", address: "4-12-9 โซโตคันดะ เขตชิโยดะ", access: "ทางออก 1 สถานีซูเอะฮิโรโจ 3 นาที, JR อากิฮาบาระ 7 นาที" },
  { shop: "สาขาอากิฮาบาระ 2", address: "4-16-7 คันดะซากุมะโจ เขตชิโยดะ", access: "JR อากิฮาบาระ (ทางออกโชวะโดริ) 8 นาที" },
  { shop: "สาขาชิบูย่า", address: "15-3 มารุยามะโจ เขตชิบูย่า", access: "สถานีชินเซ็น สายเคโอ อิโนะคาชิระ 3 นาที, JR ชิบูย่า 15 นาที" },
  { shop: "สาขา Shibuya Annex", address: "The City Shibuya ชั้น 2, 10-11 มารุยามะโจ", access: "สถานีชินเซ็น สายเคโอ อิโนะคาชิระ 5 นาที, JR ชิบูย่า 15 นาที" },
  { shop: "สาขาชินากาวะ", address: "1-23-15 คิตะชินากาวะ เขตชินากาวะ", access: "สถานีคิตะชินากาวะ สายเคคิว 5 นาที, JR ชินากาวะ 15 นาที" },
  { shop: "สาขาอาซากุสะ", address: "3-25-31 นิชิอาซากุสะ เขตไทโต", access: "สถานีอาซากุสะ Tokyo Metro 8 นาที" },
  { shop: "สาขาอ่าวโตเกียว", address: "2-10-8 ชินคิบะ เขตโคโต", access: "สถานีชินคิบะ 10 ถึง 13 นาที" },
];

const whoFor = [
  {
    title: "คนที่มีใบขับขี่ถูกต้องและมั่นใจในการขับ",
    desc: "คุณมีใบขับขี่ฉบับสมบูรณ์ที่ยังใช้ได้จากประเทศของคุณ คุ้นเคยกับการขับบนถนนจริง และทำใบขับขี่สากลไว้แล้วก่อนเดินทาง ทัวร์นี้ออกแบบมาสำหรับผู้ใหญ่ที่มีใบขับขี่ ไม่ใช่เครื่องเล่นในสวนสนุก",
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
    desc: "คุณอยากเห็นแลนด์มาร์กอย่างโตเกียวทาวเวอร์ โอไดบะ และย่านสะพานเรนโบว์จากระดับถนน บนรถเปิดประทุนที่รับลมตลอดทาง เส้นทางยอดนิยมมีวิวสวยและมีไกด์นำ คุณแค่ขับตามรถคันนำ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "ไม่เหมาะถ้าคุณขับรถในญี่ปุ่นไม่ได้",
    desc: "ถ้าคุณอายุต่ำกว่า 18 ปี ไม่มีใบขับขี่ หรือใบขับขี่มาจากประเทศที่ญี่ปุ่นไม่รับรองตามเกณฑ์นี้ คุณจะขับโกคาร์ทเหล่านี้อย่างถูกกฎหมายไม่ได้ ที่ร้านไม่มีทางแก้ไขในวันนั้น จึงควรเตรียมเอกสารให้พร้อมก่อนจอง",
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
    title: "ทำใบขับขี่สากลที่ประเทศของคุณก่อนเดินทาง",
    desc: "ใบขับขี่สากลตามอนุสัญญาเจนีวา 1949 ออกได้เฉพาะในประเทศของคุณ และออกในญี่ปุ่นไม่ได้ ต้องเป็นแบบเล่มกระดาษ ใบขับขี่สากลแบบบัตร แบบดิจิทัล และแบบแผ่นเดียวใช้ไม่ได้ และมีผู้ขายใบขับขี่สากลปลอมทางออนไลน์ด้วย ถ้าคุณมาจากสวิตเซอร์แลนด์ เยอรมนี ฝรั่งเศส ไต้หวัน เบลเยียม หรือโมนาโก ต้องใช้คำแปลภาษาญี่ปุ่นที่ได้รับการรับรองแทน JAF รับคำขอเหล่านี้ทางออนไลน์จากภายในญี่ปุ่นเท่านั้น และใช้เวลาเฉลี่ย 2 ถึง 3 วันทำการ จึงควรเผื่อเวลานี้ไว้ช่วงต้นทริป หรือสอบถามสถานทูตหรือสถานกงสุลของประเทศคุณในญี่ปุ่น",
  },
  {
    title: "พกตัวจริง 3 อย่าง: ใบขับขี่สากล ใบขับขี่ประเทศของคุณ และพาสปอร์ต",
    desc: "ในวันทัวร์ต้องพกตัวจริงทั้งหมด คือใบขับขี่ฉบับจริงจากประเทศของคุณ ใบขับขี่สากล (หรือคำแปลจาก JAF หรือสถานทูต) และพาสปอร์ต สำเนา รูปถ่ายในโทรศัพท์ และใบขับขี่ดิจิทัลใช้ไม่ได้ ถ้ามาโดยไม่มีตัวจริงจะร่วมทัวร์ไม่ได้และไม่ได้รับเงินคืน",
  },
  {
    title: "ตรวจสอบว่าคุณมีคุณสมบัติตามเงื่อนไข",
    desc: `หน้าสินค้าของ Klook กำหนดอายุขั้นต่ำ 18 ปี และใบขับขี่ของคุณต้องได้รับการรับรองให้ขับรถในญี่ปุ่น (ใบขับขี่สากลตามอนุสัญญาเจนีวา 1949 หรือคำแปลสำหรับประเทศที่ระบุ) ใบขับขี่รถจักรยานยนต์และโมเพดใช้ไม่ได้ Street Kart ยังให้ส่งรูปเอกสารหลังจองเพื่อตรวจสอบล่วงหน้าได้ รถเป็นแบบที่นั่งเดียว จึงไม่มีตัวเลือกนั่งเป็นผู้โดยสาร ตรวจสอบกฎของ Street Kart เมื่อ ${CHECKED} และเกณฑ์อายุของ Klook เมื่อ ${NPA_CHECKED}`,
  },
  {
    title: "จองล่วงหน้า แล้วไปถึงก่อนเวลาเพื่อฟังการบรรยาย",
    desc: `จองรอบที่ต้องการทางออนไลน์และเลือกเส้นทาง Street Kart ขอให้ไปถึงร้าน 30 นาทีก่อนรอบของคุณเพื่อตรวจเอกสารและฟังการบรรยายความปลอดภัย และคนที่มาสายจะร่วมทัวร์ไม่ได้ ญี่ปุ่นขับรถชิดซ้าย ทัวร์มีไกด์นำ คุณจึงขับตามรถคันนำตลอดทาง ข้อมูล ณ ${CHECKED}`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ขับโกคาร์ทในโตเกียวต้องมีใบขับขี่ไหม",
    a: "ต้องมี โกคาร์ทบนถนนในโตเกียววิ่งบนถนนสาธารณะ คุณจึงต้องมีใบขับขี่ญี่ปุ่น หรือใบขับขี่ประเทศของคุณพร้อมใบขับขี่สากลแบบเล่มกระดาษตามอนุสัญญาเจนีวา 1949 และพาสปอร์ต ทั้งหมดต้องเป็นตัวจริง ใบขับขี่จากสวิตเซอร์แลนด์ เยอรมนี ฝรั่งเศส ไต้หวัน เบลเยียม และโมนาโกใช้คำแปลภาษาญี่ปุ่นที่ได้รับการรับรองแทนใบขับขี่สากล ใบขับขี่สากลออกได้เฉพาะในประเทศของคุณก่อนเดินทาง",
  },
  {
    q: "โกคาร์ทโตเกียวราคาเท่าไร",
    a: `ตารางราคาทางการของ Street Kart เดือนพฤศจิกายน 2026 เริ่มต้นที่ ¥5,000 ต่อคนสำหรับเส้นทางอาซากุสะ 45 นาทีถึง 1 ชั่วโมง ¥9,000 ที่อากิฮาบาระ และ ¥16,000 ที่ชิบูย่า ส่วนเส้นทาง 1.5 ถึง 2 ชั่วโมงของอากิฮาบาระและอ่าวโตเกียวเริ่มที่ ¥12,000 ถึง ¥14,000 ราคาปกติสูงสุด ¥25,000 ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ใบขับขี่สากลตามอนุสัญญาเวียนนา 1968 ใช้ในญี่ปุ่นได้ไหม",
    a: "ใช้ไม่ได้ JAF ระบุว่าในญี่ปุ่นใช้ได้เฉพาะใบขับขี่สากลที่ออกตามอนุสัญญาเจนีวา 1949 และใบขับขี่สากลตามสนธิสัญญาอื่น เช่น อนุสัญญาเวียนนา 1968 ใช้ไม่ได้ Street Kart เสริมว่าใบขับขี่สากลที่ใช้ได้ส่วนใหญ่มีเลข 1949 บนหน้าปก และขอให้ติดต่อร้านก่อนถ้าของคุณเขียนว่า 1968",
  },
  {
    q: "ขับโกคาร์ทในโตเกียวตอนฝนตกหรือหน้าหนาวได้ไหม",
    a: "โดยหลักแล้วได้ Street Kart ระบุว่าปกติจัดทัวร์ทุกสภาพอากาศ และให้ติดต่อร้านถ้าไม่แน่ใจ ตารางราคาของทุกสาขาในโตเกียวมีรอบครบทั้ง 12 เดือน รวมถึงธันวาคมถึงกุมภาพันธ์ แต่ตามข้อกำหนด ร้านยังระงับ ยกเลิก หรือเปลี่ยนทัวร์ได้",
  },
  {
    q: "โกคาร์ทบนถนนในโตเกียวปลอดภัยและถูกกฎหมายไหม",
    a: "ถูกกฎหมายเมื่อคุณมีใบขับขี่ที่ใช้ได้ในญี่ปุ่น รถของ Street Kart สร้างมาสำหรับถนนสาธารณะในญี่ปุ่น และผู้ให้บริการไม่รับผู้ขับที่ไม่มีเอกสารถูกต้อง คุณขับบนถนนจริงที่ชิดซ้าย มีไกด์นำ ไกด์ 1 คนดูแลผู้ขับได้สูงสุด 6 คน รวมประกันพื้นฐาน และเส้นทางไม่ใช้ทางด่วน",
  },
];

const picks = [
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "ทัวร์รถบัสเที่ยวโตเกียว 1 วัน",
    desc: "ทัวร์มีไกด์นำเที่ยวสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมเสียงบรรยายหลายภาษา",
  }),
  withKlookLocale(shinjukuNightFoodWalkingTour, LOCALE, {
    title: "ทัวร์อาหารกลางคืนชินจูกุ: โอโมอิเดะโยโกโจ คาบุกิโจ และโกลเดนไก",
    desc: "เดินแบบกลุ่ม 3 ชั่วโมงหลังพระอาทิตย์ตกผ่านโอโมอิเดะโยโกโจ คาบุกิโจ และโกลเดนไก ชิมอาหารที่ร้านท้องถิ่น 3 ร้าน และดื่ม 1 แก้วที่อิซากายะในโกลเดนไก",
  }),
  { title: "eSIM ญี่ปุ่นของ Klook", desc: "eSIM ญี่ปุ่นที่ได้รับเป็นวอเชอร์ QR code สำหรับใช้แผนที่และส่งข้อความตลอดทริป", url: ESIM_URL },
  withKlookLocale(tokyoSubwayTicket, LOCALE, {
    title: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    desc: "นั่งรถไฟใต้ดิน Tokyo Metro และ Toei ได้ทุกสายแบบไม่จำกัดเที่ยว รับตั๋วเมื่อเดินทางถึงโดยไม่ต้องต่อคิวซื้อ",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "โกคาร์ทโตเกียว" }];

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
            ขับโกคาร์ทที่วิ่งบนถนนได้ถูกกฎหมายผ่านใจกลางโตเกียว ผ่านแลนด์มาร์กอย่างโตเกียวทาวเวอร์และย่านสะพานเรนโบว์ สิ่งที่ต้องระวังคือเอกสารการขับขี่ เพราะใบขับขี่สากลออกได้เฉพาะในประเทศของคุณก่อนเดินทาง
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
            การขับโกคาร์ทในโตเกียวต้องใช้ใบขับขี่ญี่ปุ่น หรือใบขับขี่ประเทศของคุณพร้อมใบขับขี่สากลแบบเล่มกระดาษที่ออกตาม<strong>อนุสัญญาเจนีวา 1949</strong> และพาสปอร์ต ใบขับขี่สากลตามอนุสัญญาเวียนนา 1968 อย่างเดียวใช้ไม่ได้ ตารางราคาทางการของ Street Kart เดือนพฤศจิกายน 2026 ระบุราคาเส้นทาง 1 ชั่วโมงเริ่มต้นที่ <strong>¥5,000</strong> (อาซากุสะ) <strong>¥9,000</strong> (อากิฮาบาระ) หรือ <strong>¥16,000</strong> (ชิบูย่า) ต่อคน และเส้นทาง 1.5 ถึง 2 ชั่วโมงเริ่มที่ <strong>¥12,000</strong> (อากิฮาบาระ) หรือ <strong>¥14,000</strong> (อ่าวโตเกียว ข้ามสะพานเรนโบว์) ราคาปกติสูงสุด ¥25,000 ทัวร์ออกจากร้านในชิบูย่า อากิฮาบาระ อาซากุสะ ชินากาวะ และอ่าวโตเกียว (ชินคิบะ) และผู้ขับที่ไม่มีเอกสารตัวจริงจะร่วมทัวร์ไม่ได้และไม่ได้รับเงินคืน ตรวจสอบเมื่อ {CHECKED}
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
                <p className={styles.verdictStatLabel}>เอกสารที่ต้องใช้ขับ</p>
                <p className={styles.verdictStatValue}>ใบขับขี่สากล + ใบขับขี่ประเทศของคุณ + พาสปอร์ต</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ทำใบขับขี่สากล</p>
                <p className={styles.verdictStatValue}>ที่ประเทศของคุณ ก่อนเดินทาง</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุปสั้น ๆ:</strong> การจองเป็นเรื่องง่าย สิ่งที่ทำให้คนส่วนใหญ่ไปไม่ได้คือเอกสาร ใบขับขี่สากลออกได้<em>เฉพาะ</em>ในประเทศของคุณก่อนเดินทาง ทำในญี่ปุ่นไม่ได้ และที่ร้านไม่มีทางแก้ไขในวันนั้น เตรียมเอกสารให้เสร็จก่อน ที่เหลือเป็นรายละเอียด
            </p>
            <KlookLink href={GOKART_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดูโกคาร์ทบนถนนในโตเกียว →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>โกคาร์ทบนถนนในญี่ปุ่นคืออะไร และทัวร์โกคาร์ทโตเกียวเป็นอย่างไร</h2>
          <p className={styles.bodyText}>
            ทัวร์โกคาร์ทบนถนนในโตเกียวคือการขับรถโกคาร์ทคันเล็กที่วิ่งบนถนนได้ถูกกฎหมาย ไปตามถนนสาธารณะของเมืองเป็นขบวนที่มีไกด์นำ เส้นทางยอดนิยมผ่านจุดท่องเที่ยวที่รู้จักกันดี เช่น ย่านสะพานเรนโบว์ โตเกียวทาวเวอร์ โอไดบะ และชิบูย่า คุณจะได้เห็นเมืองจากรถเปิดประทุนในระดับถนน ซึ่งเป็นมุมที่ไม่ได้เห็นจากรถไฟหรือรถบัส และปกติมีชุดคอสตูมทั่วไปให้ใส่ระหว่างทัวร์
          </p>
          <p className={styles.bodyText}>
            เรื่องสำคัญที่ต้องรู้ก่อน: นี่คือ<strong>ประสบการณ์ขับโกคาร์ทบนถนนทั่วไป</strong> <strong>ไม่มีความเกี่ยวข้อง ไม่ได้รับการสนับสนุน และไม่ได้รับการรับรองจากวิดีโอเกม ตัวละคร หรือแบรนด์บันเทิงใด ๆ</strong> และชุดคอสตูมที่มีให้ก็เป็นชุดทั่วไป จุดเด่นจริง ๆ คือการขับรถ และนั่นคือเหตุผลที่เอกสารสำคัญมาก
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>โกคาร์ทโตเกียวราคาเท่าไร</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            ตามตารางราคาของ Street Kart เดือนพฤศจิกายน 2026 โกคาร์ทบนถนนในโตเกียวราคาประมาณ ¥5,000 ถึง ¥25,000 ต่อคน โดยราคาขึ้นอยู่กับสาขาที่ออกเดินทาง เส้นทาง และช่วงเวลา ถ้ายังไม่แน่ใจ ให้จองเส้นทาง 1 ชั่วโมงของสาขา Shibuya Annex ซึ่งผ่านทางข้ามชิบูย่า โอโมเตะซันโด และฮาราจูกุ ทุกสาขาด้านล่างที่ระบุทั้งสองช่วงเวลา รอบเย็นแพงกว่ารอบกลางวัน
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
            ราคาต่อคนขั้นต่ำจากแท็บเดือนพฤศจิกายน 2026 ในตารางราคาทางการของแต่ละสาขา ตรวจสอบเมื่อ {CHECKED} ราคาเปลี่ยนตามเดือนและรอบ และปฏิทินการจองของผู้ให้บริการแสดงราคาสำหรับวันของคุณ คอลัมน์รอบกลางวันและรอบเย็นแสดงราคารีวิว ซึ่งการจองออนไลน์ใช้ให้อัตโนมัติ ตามข้อกำหนดของผู้ให้บริการ ราคานี้ไม่ขึ้นกับการเขียนรีวิว ส่วนราคาปกติสำหรับลูกค้าที่ขอไม่เปิดเผยการมาใช้บริการ คอลัมน์จองจะเปิดหน้าสินค้า Klook ของสาขานั้น ซึ่งมีราคาของตัวเอง สาขาชินากาวะไม่มีหน้าสินค้าแยก ลิงก์จึงเปิดรายการโกคาร์ทโตเกียวทั้งหมดบน Klook
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
            การจองผ่าน Klook มีราคาของตัวเอง เปิดหน้าสินค้าเพื่อดูราคาสำหรับวันของคุณ เพื่อเปรียบเทียบ สาขาโอซาก้าของ Street Kart ระบุราคาประมาณ 1 ชั่วโมงเริ่มที่ ¥7,000 ในเดือนเดียวกัน และยังมีสาขาที่โอกินาว่า คุณขับที่โอซาก้าได้ด้วยเอกสารชุดเดียวกัน{" "}
            <Link href="/guides/attractions/osaka-go-kart" style={linkStyle}>
              คู่มือโกคาร์ทโอซาก้า (ภาษาอังกฤษ)
            </Link>{" "}
            เปรียบเทียบเส้นทางผ่านโดทงโบริและนัมบะ
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>สิ่งที่รวมในราคา</span>
          <h2 className={styles.sectionTitle}>ทัวร์โกคาร์ทโตเกียวรวมอะไรบ้าง</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            ค่าทัวร์รวมรถโกคาร์ท ไกด์ และประกันพื้นฐาน แต่คุณต้องจ่ายค่าเสียหายส่วนแรก ¥50,000 ถ้ารถเสียหาย ค่าใบขับขี่สากลหรือคำแปลเป็นค่าใช้จ่ายของคุณเองเสมอ
          </p>
          <Table head={["รายการ", "สถานะ", "รายละเอียด"]} rows={includedRows.map((r) => [r.item, r.status, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            จากคำถามที่พบบ่อย หน้าร้าน และข้อกำหนดของ Street Kart ตรวจสอบเมื่อ {CHECKED} ถ้าจองผ่าน Klook จะใช้รายการที่รวมตามหน้าสินค้าของ Klook
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เลือกเส้นทาง</span>
          <h2 className={styles.sectionTitle}>โกคาร์ทโตเกียวเส้นทางไหนดีที่สุด (ชิบูย่า อากิฮาบาระ หรืออ่าวโตเกียว)</h2>
          <p className={styles.bodyText}>
            จองชิบูย่าถ้าเป้าหมายคือขับผ่านทางข้ามชิบูย่า จองอากิฮาบาระถ้าอยากจ่ายน้อยกว่า และจองอ่าวโตเกียวถ้าอยากข้ามสะพานเรนโบว์และมีเวลา 1.5 ถึง 2 ชั่วโมง ในตารางราคาเดือนพฤศจิกายน เส้นทางชิบูย่าเริ่มที่ ¥16,000 ส่วนเส้นทาง 1 ชั่วโมงของอากิฮาบาระเริ่มที่ ¥9,000 เส้นทาง 1 ชั่วโมงของสาขาอากิฮาบาระ 2 ยังผ่านสถานีโตเกียวและกินซ่าด้วย
          </p>
          <p className={styles.bodyText}>
            เส้นทางอื่นเหมาะกับความต้องการที่เจาะจงกว่า เส้นทางชินากาวะมุ่งไปโตเกียวทาวเวอร์ เส้นทางอ่าวโตเกียวคือเส้นทางที่ข้ามสะพานเรนโบว์ และเส้นทาง A2-M ที่ยาวกว่าของสาขาอากิฮาบาระ 2 ไปถึงทางข้ามชิบูย่าโดยผ่านรอบพระราชวังอิมพีเรียลและฮาราจูกุ ถ้าคุณพักแถวย่านเครื่องใช้ไฟฟ้าอากิฮาบาระอยู่แล้ว ลองจัดคู่กับ{" "}
            <Link href="/guides/attractions/akihabara-anime-tour" style={linkStyle}>
              คู่มือทัวร์อนิเมะอากิฮาบาระ (ภาษาอังกฤษ)
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
          <span className={styles.sectionLabel}>คุณสมบัติ</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียวต้องมีใบขับขี่ไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            ต้องมี โกคาร์ทบนถนนในญี่ปุ่นวิ่งบนถนนสาธารณะ คุณจึงต้องมีใบขับขี่ที่ญี่ปุ่นรับรองให้ขับรถได้ และไม่มีที่นั่งผู้โดยสารสำหรับคนที่ไม่มีใบขับขี่ กฎที่สำคัญที่สุดคือ ใบขับขี่สากลตามอนุสัญญาเจนีวา 1949 ต้องทำ<strong>ที่ประเทศของคุณก่อนเดินทาง</strong> ออกในญี่ปุ่นไม่ได้ ดูตารางด้านล่างเพื่อหากรณีของคุณ
          </p>
          <Table head={["เอกสารที่คุณมี", "ขับได้ไหม", "รายละเอียด"]} rows={licenceRows.map((r) => [r.doc, r.drive, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบล่าสุด: {LAST_CHECKED} (หน้าข้อมูลใบขับขี่ของ Street Kart และ JAF) ใบขับขี่สากลหรือใบขับขี่ต่างประเทศใช้ในญี่ปุ่นได้ 1 ปีนับจากวันที่เข้าประเทศ หรือจนถึงวันหมดอายุ แล้วแต่ว่าอย่างไหนถึงก่อน และใบขับขี่สากลเองมีอายุ 1 ปีนับจากวันออก (สำนักงานตำรวจแห่งชาติญี่ปุ่น ตรวจสอบเมื่อ {NPA_CHECKED}) แหล่งข้อมูลทางการ:{" "}
            <Src href="https://akiba-kart.com/en/license_shibuya.html">หน้าข้อมูลใบขับขี่ของ Street Kart</Src>,{" "}
            <Src href="https://english.jaf.or.jp/driving-in-japan/drive-in-japan/switch-to-japanese-license">JAF</Src> กฎเปลี่ยนได้ จึงควรยืนยันสัญชาติของคุณกับผู้ให้บริการก่อนจอง และต้องพกเอกสารทั้งหมดเป็นตัวจริงในวันทัวร์
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ไม่มีใบขับขี่สากล</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียวโดยไม่มีใบขับขี่สากลได้ไหม</h2>
          <p className={styles.bodyText}>
            ได้เฉพาะเมื่อคุณมีเอกสารอื่นที่ใช้บนถนนในญี่ปุ่นได้ คือใบขับขี่ญี่ปุ่น ใบขับขี่ SOFA หรือใบขับขี่จาก 6 ประเทศและดินแดนที่ระบุไว้พร้อมคำแปลภาษาญี่ปุ่นที่ได้รับการรับรอง ถ้าไม่มีอย่างใดอย่างหนึ่ง คุณจะขับไม่ได้ ร้านแก้ไขให้ในวันนั้นไม่ได้ และไม่ได้รับเงินคืน
          </p>
          <p className={styles.bodyText}>
            เรื่องที่คนพลาดบ่อยคือคำแปล เพราะ JAF ไม่รับคำขอจากนอกญี่ปุ่น JAF รับคำขอทางออนไลน์จากภายในญี่ปุ่น ค่าธรรมเนียม ¥6,000 บวกค่าพิมพ์หน้าละ ¥20 และใช้เวลาเฉลี่ย 2 ถึง 3 วันทำการสำหรับใบขับขี่จาก 6 แห่งนี้ ถ้าใช้ JAF การเดินทางถึงญี่ปุ่นวันก่อนทัวร์ไม่ทันแน่นอน จึงควรจองโกคาร์ทไว้ช่วงหลังของทริป
          </p>
          <div className={styles.verdictBox} style={{ marginTop: "1.25rem" }}>
            <div className={styles.verdictBody}>
              <p className={styles.verdictText}>
                <strong>ไม่มีใบขับขี่สากล? จองทัวร์เหล่านี้แทน</strong> ได้เห็นถนนเดียวกันโดยไม่ต้องมีใบขับขี่ ได้แก่ ทัวร์รถบัสมีไกด์นำเที่ยวสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี ทัวร์อาหารแบบกลุ่ม 3 ชั่วโมงเดินในชินจูกุหลังพระอาทิตย์ตก หรือทัวร์เดินครึ่งวันมีไกด์นำรอบวัดเซ็นโซจิ
              </p>
              <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
                <KlookLink href={BUS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  ดูทัวร์รถบัสโตเกียว 1 วัน →
                </KlookLink>
                <KlookLink href={FOOD_WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                  ดูทัวร์อาหารกลางคืนชินจูกุ →
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
          <h2 className={styles.sectionTitle}>โกคาร์ทโตเกียวจำกัดอายุและส่วนสูงไหม</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            จำกัด หน้าสินค้าของ Klook กำหนดอายุขั้นต่ำ 18 ปี และช่วงส่วนสูงเริ่มที่ 150 ซม. หน้าของ Street Kart เองไม่ได้ระบุอายุหรือส่วนสูง จึงควรตรวจสอบหน้าสินค้าที่คุณจอง
          </p>
          <Table head={["เงื่อนไข", "ข้อกำหนด", "แหล่งที่มา"]} rows={fitRows.map((r) => [r.rule, r.value, r.source])} />
          <p className={styles.bodyText} style={noteStyle}>
            ตรวจสอบเมื่อ {NPA_CHECKED} ข้อความของ Klook อ่านจากเนื้อหาหน้าสินค้าที่เครื่องมือค้นหาจัดทำดัชนีไว้
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>สภาพอากาศ</span>
          <h2 className={styles.sectionTitle}>ขับโกคาร์ทในโตเกียวตอนฝนตกหรือหน้าหนาวได้ไหม</h2>
          <p className={styles.bodyText}>
            ส่วนใหญ่ได้ Street Kart ระบุว่าปกติจัดทัวร์ทุกสภาพอากาศ และให้ติดต่อร้านถ้าไม่แน่ใจ แต่ตามข้อกำหนดก็ระงับ ยกเลิก หรือเปลี่ยนทัวร์ได้ หน้าหนาวไม่ใช่ช่วงปิด ตารางราคาของทุกสาขาในโตเกียวมีรอบครบทั้ง 12 เดือน รวมถึงธันวาคมถึงกุมภาพันธ์ จึงควรแต่งตัวให้เหมาะกับรถเปิดประทุน
          </p>
          <p className={styles.bodyText}>
            ถ้าจองตรงกับผู้ให้บริการ ยกเลิกฟรีได้จนถึง 7 วันก่อนวันทัวร์ตามเวลาญี่ปุ่น ภายใน 6 วันหลังจากนั้นจะใช้นโยบายยกเลิกของผู้ให้บริการ จึงควรอ่านก่อนชำระเงิน และการเปลี่ยนแปลงขึ้นอยู่กับที่ว่าง การจองผ่าน Klook ใช้เงื่อนไขตามหน้าสินค้าของ Klook ตรวจสอบเมื่อ {CHECKED}
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ความปลอดภัย</span>
          <h2 className={styles.sectionTitle}>โกคาร์ทบนถนนในโตเกียวปลอดภัยและถูกกฎหมายไหม</h2>
          <p className={styles.bodyText}>
            ถูกกฎหมายเมื่อผู้ขับทุกคนมีใบขับขี่ที่ใช้ได้ในญี่ปุ่น Street Kart อธิบายว่ารถของตนสร้างขึ้นเฉพาะสำหรับถนนสาธารณะในญี่ปุ่น และไม่รับคนที่ไม่มีเอกสารตัวจริงที่ถูกต้อง แต่ก็ยังเป็นการขับบนถนนจริงที่ชิดซ้าย จึงควรคิดว่าเป็นการขับรถ ไม่ใช่เครื่องเล่น
          </p>
          <p className={styles.bodyText}>
            ทัวร์มีไกด์นำ โดยไกด์ 1 คนดูแลผู้ขับได้สูงสุด 6 คน หลังการบรรยายความปลอดภัยที่ร้าน เส้นทางไม่ใช้ทางด่วน ประกันพื้นฐานรวมอยู่ในค่าทัวร์ และรถเป็นแบบที่นั่งเดียว จึงไม่มีใครนั่งเป็นผู้โดยสาร ถ้ารถเสียหายต้องจ่ายค่าเสียหายส่วนแรก ¥50,000 เว้นแต่จะซื้อประกันแบบคุ้มครองเต็มเพิ่ม ตรวจสอบเมื่อ {CHECKED}
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
            เส้นทาง 1 ชั่วโมงใช้เวลาประมาณ 90 นาทีเมื่อรวมการเช็กอิน 30 นาที จึงใส่ใน{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>
              แผนเที่ยวโตเกียว 3 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            หรือ{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>
              สิ่งที่ต้องทำในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            ได้ง่าย เด็กขับไม่ได้และรถเป็นแบบที่นั่งเดียว ครอบครัวจึงต้องวางแผนให้สมาชิกที่อายุต่ำกว่า 18 ปี{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>
              แผนเที่ยวโตเกียวกับเด็ก (ภาษาอังกฤษ)
            </Link>{" "}
            มีวันที่เหมาะกับทุกคน ถ้าอยากเดินเที่ยวช่วงเย็นแทน{" "}
            <Link href="/guides/attractions/tokyo-night-food-tour" style={linkStyle}>
              ทัวร์อาหารกลางคืนโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            ไม่ต้องใช้ใบขับขี่เลย และทัวร์จักรยานไฟฟ้าใน{" "}
            <Link href="/guides/attractions/tokyo-bike-tour" style={linkStyle}>
              คู่มือทัวร์จักรยานโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            ก็เช่นกัน ถ้าทริปยาวขึ้น เส้นทางอ่าวโตเกียวเข้ากับวันเที่ยวอ่าวใน{" "}
            <Link href="/guides/attractions/tokyo-4-day-itinerary" style={linkStyle}>
              แผนเที่ยวโตเกียว 4 วัน (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ทีละขั้นตอน</span>
          <h2 className={styles.sectionTitle}>จองทัวร์โกคาร์ทโตเกียวอย่างไร</h2>
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
            <strong>มีเอกสารครบแล้วหรือยัง</strong> นั่นคือเวลาที่ควรจอง ไม่ใช่ก่อนหน้านั้น เพราะร้านไม่คืนเงินถ้าเอกสารไม่ครบ
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
          <h2 className={styles.sectionTitle}>ทัวร์โกคาร์ทโตเกียวเริ่มที่ไหน</h2>
          <p className={styles.bodyText}>
            ทัวร์ของ Street Kart เริ่มที่สาขาที่คุณจอง และแต่ละสาขามีเส้นทางของตัวเอง ดูจุดนัดพบที่แน่นอนในใบยืนยันการจอง และเผื่อเวลาให้ไปถึงก่อนการบรรยายความปลอดภัย
          </p>
          <Table head={["สาขา", "ที่อยู่", "สถานีใกล้ที่สุด (เดิน)"]} rows={startRows.map((r) => [r.shop, r.address, r.access])} />
          <p className={styles.bodyText} style={noteStyle}>
            จากหน้าร้านของ Street Kart ตรวจสอบเมื่อ {CHECKED}
          </p>
          <p className={styles.bodyText}>
            ร้านไม่มีที่จอดรถ และผู้ให้บริการไม่แนะนำให้มาด้วยรถยนต์หรือ Uber เพราะรถติดทำให้มาสายได้ และคนที่มาสายจะร่วมทัวร์ไม่ได้{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>
              คู่มือย่านที่พักในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            เปรียบเทียบย่านที่น่าพัก และถ้ายังไม่คุ้นกับการเดินทาง{" "}
            <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>
              คู่มือการเดินทางในโตเกียว (ภาษาอังกฤษ)
            </Link>{" "}
            อธิบายพื้นฐานเรื่องรถไฟ รถไฟใต้ดิน และบัตร IC
          </p>
        </section>

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="คำถามที่พบบ่อยเรื่องโกคาร์ทโตเกียว" />

        <KlookTourPicks
          heading="ถ้าเอกสารไม่ผ่านเงื่อนไข"
          intro="ทัวร์โตเกียว 2 รายการที่แค่จองก็ไปได้ พร้อม eSIM และตั๋วรถไฟใต้ดินที่ใช้ได้ทุกวัน เปิดหน้าสินค้าเพื่อดูราคาปัจจุบันสำหรับวันของคุณ"
          tours={picks}
        />

        <Related
          items={[
            { href: "/guides/attractions/akihabara-anime-tour", title: "ทัวร์อนิเมะอากิฮาบาระ (2026): ทัวร์มีไกด์ เวลาเปิดร้าน และวิธีเดินทาง (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-transportation", title: "การเดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "สิ่งที่ต้องทำในโตเกียว (2026): อะไรต้องจองก่อน อะไรไปได้เลย (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "ประสบการณ์ซามูไรและนินจาในโตเกียว (2026): ควรจองแบบไหน (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-food-tour", title: "ทัวร์อาหารโตเกียว (2026): ย่านไหน และทัวร์ช่วยอะไรได้ (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 หรือ 72 ชั่วโมง คุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/th", title: "คู่มือเที่ยวญี่ปุ่นเพิ่มเติม →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>พร้อมขับรถเที่ยวโตเกียวหรือยัง</h2>
            <p className={styles.ctaBannerDesc}>
              จองทัวร์โกคาร์ทบนถนนล่วงหน้า แล้วพกใบขับขี่สากล ใบขับขี่ประเทศของคุณ และพาสปอร์ตไปในวันทัวร์ อย่าลืมว่าใบขับขี่สากลต้องทำที่ประเทศของคุณก่อนเดินทาง
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
