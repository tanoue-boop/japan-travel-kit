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
  hanedaLimousineBus,
  jigokudaniStayAreas,
  jigokudaniZenkojiPrivateDayTrip,
  jigokudaniZenkojiSukiyakiTour,
  jrEastPass,
  klookEsim,
  naritaExpressRoundTripUrl,
  nozawaSnowMonkeyZenkojiTour,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  snowMonkeySukiyakiTourTokyo,
  snowMonkeysZenkojiSakeNaganoTour,
} from "../../../../lib/klook-links-winter-honshu";
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

// Mirrors the English guide (pages/guides/attractions/jigokudani-snow-monkey-tour.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/attractions/jigokudani-snow-monkey-tour";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "ลิงหิมะจิโกกุดานิ" }];

const CHECKED_ISO = "2026-11-06";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const factRows = [
  { item: "ค่าเข้าตั้งแต่ 1 ธ.ค. 2026 ผู้ใหญ่ (18 ปีขึ้นไป)", value: "หน้างาน ¥1,000 ตั๋วเว็บ ¥880", note: "¥800 ถึง 30 พ.ย. กลุ่ม 20 คนขึ้นไป ¥840 หรือตั๋วเว็บ ¥740" },
  { item: "ค่าเข้าตั้งแต่ 1 ธ.ค. 2026 เด็ก (ประถมถึงมัธยมปลาย)", value: "หน้างาน ¥500 ตั๋วเว็บ ¥440", note: "¥400 ถึง 30 พ.ย. เด็กต่ำกว่า 6 ปีฟรีเมื่อมาพร้อมผู้ปกครอง กลุ่ม ¥420 หรือตั๋วเว็บ ¥380" },
  { item: "เวลาเปิด พฤศจิกายน–มีนาคม", value: "9:00–16:00", note: "ควรมาถึงก่อนปิดอย่างน้อย 30 นาที" },
  { item: "เวลาเปิด เมษายน–ตุลาคม", value: "8:30–17:00", note: "" },
  { item: "วันปิด", value: "ไม่มีวันปิดประจำ", note: "อาจปิดโดยไม่แจ้งล่วงหน้าเพราะสภาพอากาศ พฤติกรรมของลิง หรือภัยธรรมชาติ" },
  { item: "ตั๋วเว็บ", value: "เข้าก่อนในเดือนธันวาคม–เมษายน", note: "ซื้อออนไลน์แบบระบุวัน ถูกกว่าหน้างานตั้งแต่ 1 ธ.ค." },
  { item: "ความสูง", value: "850 m", note: "ฤดูหนาวต่ำสุด −10°C หิมะหนากว่า 1 เมตร" },
];

const routeRows = [
  {
    leg: "โตเกียว → นากาโนะ",
    how: "โฮคุริคุชินคันเซ็น (Kagayaki, Hakutaka หรือ Asama)",
    time: "เร็วสุด 79 นาที",
    notes: "ใช้ JR EAST PASS ได้ ไม่แสดงค่าโดยสารที่นี่ ดูหมายเหตุด้านล่าง",
  },
  {
    leg: "นากาโนะ → ยุดะนากะ",
    how: "รถด่วนพิเศษ Nagano Electric Railway",
    time: "38 นาที",
    notes: "เป็นรถไฟเอกชน ใช้พาส JR ไม่ได้",
  },
  {
    leg: "ยุดะนากะ → ป้าย Snow Monkey Park",
    how: "รถบัสท้องถิ่น",
    time: "15 นาที",
    notes: "รวมอยู่ใน SNOW MONKEY PASS ของ Nagaden (แบบรถไฟ)",
  },
  {
    leg: "นากาโนะ → ป้าย Snow Monkey Park (ทางเลือก)",
    how: "รถบัสด่วนจากทางออกตะวันออกสถานีนากาโนะ",
    time: "41 นาที",
    notes: "ใช้แทนรถไฟและรถบัสท้องถิ่น Nagaden มีพาสรวมรถบัสและค่าเข้าด้วย",
  },
  {
    leg: "ป้าย Snow Monkey Park → สวน",
    how: "เดินเท้า ทางดินไม่ลาดยาง",
    time: "ประมาณ 35 นาที",
    notes: "ฤดูหนาวมีหิมะและน้ำแข็ง รถเข็นผ่านไม่ได้",
  },
  {
    leg: "ลานจอดรถคันบายาชิออนเซ็น → สวน",
    how: "เดินเท้า เส้นทาง Yumichi (ประมาณ 2 กม.)",
    time: "ประมาณ 30 นาที",
    notes: "ลานจอดรถฟรีของสวน ส่วนใหญ่เป็นทางราบ มีทางลาดบางช่วง",
  },
  {
    leg: "ลานจอดรถจิโกกุดานิ → สวน",
    how: "เดินเท้า",
    time: "ประมาณ 15 นาที",
    notes: "คันละ ¥500 แต่ถนนป่าจากชิบุออนเซ็นปิดในฤดูหนาว",
  },
];

const compareRows = [
  {
    aspect: "การเดินทาง",
    diy: "ชินคันเซ็นถึงนากาโนะ (เร็วสุด 79 นาที) ต่อรถไฟและรถบัสหรือรถบัสด่วน แล้วเดิน",
    tour: "รถโค้ชจากโตเกียว หรือทัวร์มีไกด์จากสถานีนากาโนะหลังนั่งชินคันเซ็นเอง ทัวร์จัดการเรื่องการต่อรถให้",
  },
  {
    aspect: "เวลาเดินทางเที่ยวเดียว",
    diy: "ประมาณ 2 ชม. 50 นาทีเฉพาะการเดินทางและเดิน (79 + 38 + 15 + 35 นาที) ยังไม่รวมเวลารอต่อรถ",
    tour: "เป็นวันที่ยาว ทัวร์จากโตเกียวไปกลับราว 12–13 ชั่วโมง แต่ไม่มีการต่อรถให้พลาด",
  },
  {
    aspect: "การเข้าสวน",
    diy: "ตั้งแต่ 1 ธันวาคม หน้างาน ¥1,000 หรือตั๋วเว็บระบุวัน ¥880 ซึ่งได้เข้าก่อนในเดือนธันวาคมถึงเมษายน",
    tour: "ดูในหน้าสินค้าว่ารวมค่าเข้าหรือไม่",
  },
  {
    aspect: "เซนโกจิในวันเดียวกัน",
    diy: "ทำได้ถ้าออกเช้า วัดอยู่ในตัวเมืองนากาโนะ ส่วนสวนอยู่ไกลออกไปอีกอย่างน้อย 41 นาที",
    tour: "ทัวร์จิโกกุดานิบางรายการบน Klook รวมไว้แล้ว ส่วนทัวร์รถโค้ชสุกี้ยากี้จากชินจูกุไม่รวม",
  },
  {
    aspect: "สิ่งที่อาจผิดพลาด",
    diy: "พลาดรถบัสที่ยุดะนากะหรือนากาโนะ และเวลาปิด 16:00 ในฤดูหนาวมาถึงเร็วกว่าที่คิด",
    tour: "สภาพอากาศและรถติดบนทางด่วนเมื่อหิมะตก มีเวลาอยู่ที่สวนจำกัด",
  },
  {
    aspect: "เหมาะกับใคร",
    diy: "ผู้ที่มี JR EAST PASS อยู่แล้ว หรือค้างคืนที่ชิบุ ยุดะนากะ หรือคันบายาชิ",
    tour: "ผู้ที่ไปกลับจากโตเกียววันเดียวโดยไม่ค้างนากาโนะ ผู้ที่ไปครั้งแรก และครอบครัวที่อยากมีไกด์บนเส้นทางเดิน",
  },
];

const faqItems = [
  {
    q: "ค่าเข้าสวนลิงจิโกกุดานิเท่าไร?",
    a: `ตามประกาศค่าเข้าของสวน ตั้งแต่ 1 ธันวาคม 2026 หน้างานผู้ใหญ่ (18 ปีขึ้นไป) ¥1,000 เด็กประถมถึงมัธยมปลาย ¥500 ส่วนตั๋วเว็บ ¥880 และ ¥440 ถึง 30 พฤศจิกายนยังเป็น ¥800 และ ¥400 เด็กต่ำกว่า 6 ปีฟรีเมื่อมาพร้อมผู้ปกครอง กลุ่ม 20 คนขึ้นไป ¥840 และ ¥420 (ตั๋วเว็บ ¥740 และ ¥380) ไม่มีส่วนลดผู้สูงอายุ และใช้ส่วนลดร่วมกันไม่ได้ ตั้งแต่ธันวาคมถึงเมษายน ผู้ซื้อตั๋วเว็บของวันนั้นได้เข้าก่อน ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "สวนจิโกกุดานิเปิดกี่โมง?",
    a: `ตามเว็บไซต์ของสวน เปิด 9:00–16:00 ในเดือนพฤศจิกายนถึงมีนาคม และ 8:30–17:00 ในเดือนเมษายนถึงตุลาคม ไม่มีวันปิดประจำ แต่สวนแจ้งว่าอาจปิดโดยไม่แจ้งล่วงหน้าเพราะสภาพอากาศ พฤติกรรมของลิง หรือภัยธรรมชาติ และขอให้มาถึงก่อนปิดอย่างน้อย 30 นาทีเพื่อออกทันเวลา ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "ไปดูลิงหิมะจากโตเกียววันเดียวได้ไหม?",
    a: "ได้ แต่เป็นวันที่ยาว ข้อมูลการเดินทางของสวนระบุว่าจากโตเกียวถึงนากาโนะใช้โฮคุริคุชินคันเซ็นเร็วสุด 79 นาที ต่อรถด่วนพิเศษ Nagano Electric Railway ถึงยุดะนากะ 38 นาที รถบัส 15 นาทีถึงป้าย Snow Monkey Park แล้วเดินประมาณ 35 นาที รวมเกือบ 3 ชั่วโมงต่อเที่ยวโดยยังไม่นับเวลารอ และสวนปิด 16:00 ในฤดูหนาว ควรออกจากโตเกียวแต่เช้า หรือให้ทัวร์จัดการการต่อรถ",
  },
  {
    q: "ต้องเดินไปหาลิงไกลแค่ไหน?",
    a: "ประมาณ 35 นาทีจากป้ายรถบัส Snow Monkey Park ประมาณ 30 นาที (เส้นทาง Yumichi ราว 2 กม.) จากลานจอดรถฟรีที่คันบายาชิออนเซ็น และประมาณ 15 นาทีจากลานจอดรถจิโกกุดานิแบบเสียเงิน ซึ่งใช้ไม่ได้ในฤดูหนาวเพราะถนนป่าจากชิบุออนเซ็นปิด ทางเดินไม่ลาดยาง มีทางลาดและขั้นบันได รถเข็นใช้ไม่ได้",
  },
  {
    q: "ช่วงไหนดีที่สุดสำหรับดูลิงหิมะ?",
    a: "ธันวาคมถึงมีนาคมถ้าอยากเห็นลิงแช่น้ำ สวนระบุว่าลิงแช่ออนเซ็นเพื่อคลายหนาวในช่วงนี้เป็นหลัก และไม่ค่อยลงแช่เมื่ออากาศอุ่น ฤดูหนาวที่ความสูง 850 เมตรต่ำสุดถึง −10°C และหิมะหนากว่าหนึ่งเมตร ซึ่งเป็นภาพที่คนส่วนใหญ่อยากเห็น ลิงเป็นสัตว์ป่า สวนจึงเผยแพร่พยากรณ์รายสัปดาห์ว่าลิงจะลงมาหรือไม่ ควรเช็กก่อนไป",
  },
  {
    q: "ไปจิโกกุดานิหน้าหนาวควรใส่อะไร?",
    a: "รองเท้าบูตลุยหิมะ และถ้ามี ควรมีตะปูกันลื่นแบบง่าย สวนแนะนำรองเท้าบูตหรือบูตลุยหิมะในฤดูหนาว รองเท้าผ้าใบหรือรองเท้าเดินป่าในฤดูร้อน และตะปูกันลื่นแบบสวมรองเท้าเพื่อเดินบนหิมะอัดแน่นและน้ำแข็งได้ปลอดภัยขึ้น แต่งตัวสำหรับ −10°C ไม่ใช่อากาศโตเกียว และให้มือว่างไว้สำหรับขั้นบันได",
  },
  {
    q: "ทัวร์ลิงหิมะคุ้มไหม?",
    a: "ถ้าไปกลับวันเดียวจากโตเกียว มักจะคุ้ม เส้นทางรถไฟมีสี่ช่วงกับการเดินเท้า สองช่วงเป็นผู้ให้บริการรายเล็กที่มีเที่ยวรถจำกัด และสวนปิด 16:00 ในฤดูหนาว พลาดการต่อรถครั้งเดียวอาจไม่ได้เห็นลิงเลย ทัวร์บางรายการยังรวมเซนโกจิ ซึ่งจัดเองในวันเดียวกันได้ยาก ถ้าค้างคืนที่ชิบุ ยุดะนากะ หรือคันบายาชิ หรือมี JR EAST PASS อยู่แล้ว การไปเองทั้งง่ายและถูกกว่า",
  },
  {
    q: "เที่ยวลิงหิมะพร้อมชิบุออนเซ็นหรือเซนโกจิได้ไหม?",
    a: "ได้ และทั้งสองแห่งอยู่ระหว่างทาง ชิบุออนเซ็นเป็นหมู่บ้านออนเซ็นใต้สวน เหมาะมากถ้าค้างคืน เซนโกจิอยู่ในตัวเมืองนากาโนะซึ่งเป็นจุดเปลี่ยนรถ และทัวร์จิโกกุดานิบางรายการบน Klook รวมไว้กับสวน ถ้าไปเองวันเดียวจากโตเกียว ควรแวะวัดช่วงบ่ายขากลับ แต่ต้องออกจากสวนก่อนเวลาปิด 16:00 พอสมควร",
  },
  {
    q: "ต้องจองตั๋วจิโกกุดานิล่วงหน้าไหม?",
    a: "ไม่จำเป็น แต่คุ้มค่าในฤดูหนาว สวนขายตั๋วเว็บแบบระบุวัน ให้ผู้ถือตั๋วเข้าก่อนตั้งแต่ธันวาคมถึงเมษายน และตั้งแต่ 1 ธันวาคม 2026 ราคา ¥880 เทียบกับ ¥1,000 หน้างาน ในช่วงคนเยอะตั๋วเว็บจึงทั้งช่วยเลี่ยงคิวและถูกกว่า ทัวร์แบบจอยก็มีที่นั่งจำกัดต่อวัน จึงควรจองทันทีที่วันแน่นอน และเช็กเงื่อนไขการยกเลิกกรณีหิมะตกในหน้าสินค้า",
  },
  {
    q: "พาเด็ก รถเข็นเด็ก หรือสุนัขไปจิโกกุดานิได้ไหม?",
    a: "เด็กได้ รถเข็นเด็กและสุนัขไม่ได้ เด็กต่ำกว่า 6 ปีเข้าฟรีเมื่อมาพร้อมผู้ปกครอง แต่ทางเดินไม่ลาดยาง มีทางลาดและขั้นบันได และสวนแจ้งว่าใช้รถเข็นไม่ได้ เด็กเล็กต้องอุ้ม ห้ามนำสุนัขและแมวเข้า รวมถึงสุนัขช่วยเหลือ เพราะสุนัขเป็นศัตรูตามธรรมชาติของลิง",
  },
  {
    q: "สวนลิงหิมะมีกฎอะไรบ้าง?",
    a: "ห้ามให้อาหาร ห้ามจับ และห้ามจ้องลิง หน้าคำเตือนของสวนระบุว่าอาหารทำให้ลิงแย่งกระเป๋าและเกาะขา การจ้องตาลิงใกล้ ๆ เป็นสัญญาณของความเป็นศัตรู และถ้าลิงเด็กเข้ามาใกล้ควรถอยห่าง ถ่ายรูปและใช้แฟลชได้ แต่ห้ามโดรนและไม้เซลฟี่ และห้ามยื่นกล้องเข้าใกล้ลิงหรือลงไปในบ่อ",
  },
  {
    q: "JR Pass หรือ JR EAST PASS ใช้ไปถึงลิงหิมะได้ไหม?",
    a: "ได้ถึงนากาโนะ JR EAST PASS (5 วัน ¥35,000, 10 วัน ¥50,000) ครอบคลุมโฮคุริคุชินคันเซ็นจากโตเกียวถึงนากาโนะ หลังจากนั้น Nagano Electric Railway และรถบัสเป็นของเอกชน ต้องจ่ายแยก หรือซื้อ SNOW MONKEY PASS ของ Nagaden ที่รวมรถไฟ รถบัสยุดะนากะ และค่าเข้าสวน",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "Klook eSIM ญี่ปุ่น",
    ctaLabel: "ดู eSIM บน Klook →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "ตั๋วเว็บแบบระบุวัน เวลารถบัสที่ยุดะนากะและนากาโนะ และพยากรณ์ลิงของสวนอยู่ในมือถือทั้งหมด และสวนอาจปิดโดยไม่แจ้งล่วงหน้าเพราะสภาพอากาศ",
  },
  {
    label: "ตั๋วไปกลับ Narita Express (N'EX)",
    ctaLabel: "ดูตั๋วไปกลับ N'EX →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "ถึงสถานีโตเกียว ซึ่งเป็นจุดขึ้นโฮคุริคุชินคันเซ็นไปนากาโนะ ผู้ที่ลงนาริตะจึงพักใกล้ขบวนแรกขึ้นเหนือได้",
  },
  {
    label: "รถบัสลิมูซีนสนามบินฮาเนดะ – โตเกียว",
    ctaLabel: "ดูรถบัสลิมูซีน →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "สำหรับผู้ลงฮาเนดะ โดยมีชินจูกุเป็นหนึ่งในจุดจอด สำคัญถ้าคุณจะขึ้นทัวร์รถโค้ชจากชินจูกุ ซึ่งออกแต่เช้าจากฝั่งตะวันตกของสถานี",
  },
  {
    label: "JR EAST PASS (5 หรือ 10 วันติดต่อกัน)",
    ctaLabel: "ดู JR EAST PASS →",
    url: klookFor(jrEastPass.url, LOCALE),
    why: "ครอบคลุมชินคันเซ็นถึงนากาโนะ แต่ไม่รวมรถไฟเอกชนและรถบัสหลังจากนั้น คุ้มเมื่อมีการเดินทางไกลหลายเที่ยวใน 5 หรือ 10 วันเดียวกัน",
  },
];

const TITLE = "ลิงหิมะจิโกกุดานิ 2027: ทัวร์จากโตเกียว";
const DESC =
  "ลิงหิมะจิโกกุดานิ ค่าเข้า ¥1,000 จาก 1 ธ.ค. เปิด 9:00–16:00 ถึงนากาโนะ 79 นาที เดิน 35 นาที";

export default function JigokudaniSnowMonkeyTourPage({ updated }: { updated: PageUpdated }) {
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
ทัวร์ลิงหิมะจากโตเกียว (2027):<br />ค่าเข้าจิโกกุดานิ เวลา ทางเดิน และทัวร์เทียบไปเอง
</h1>
          <p className={styles.heroSubtitle}>
ลิงแช่ออนเซ็นของญี่ปุ่นอาศัยอยู่ในหุบเขาเหนือนากาโนะ ต้องนั่งรถไฟ รถบัส และเดินบนทางหิมะต่อจากชินคันเซ็น นี่คือค่าใช้จ่าย เวลา และกรณีที่ทัวร์เป็นทางเลือกที่ดีกว่า
</p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${monthLabel(updated.iso, LOCALE)}`, "ค่าเข้าและเวลาทางการ พร้อมวันที่ตรวจสอบ", "ทัวร์เทียบไปเอง"].map((t) => (
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
          heading={"ทัวร์ลิงหิมะจากโตเกียวทัวร์ไหนจองได้สำหรับหน้าหนาวนี้?"}
          checkedIso="2026-11-06"
          deadline={
            <>
จองภายใน 30 พฤศจิกายนสำหรับช่วงคริสต์มาสและปีใหม่ และล่วงหน้าอย่างน้อยสามสัปดาห์สำหรับมกราคมและกุมภาพันธ์ ลิงแช่น้ำหลัก ๆ ในเดือนธันวาคมถึงมีนาคม ทุกวันทัวร์จึงอยู่ในฤดูสั้น ๆ นี้ ถ้าไปเอง ให้ซื้อตั๋วเว็บแบบระบุวันเมื่อวันแน่นอน ผู้ถือตั๋วได้เข้าก่อนตั้งแต่ธันวาคมถึงเมษายน และตั้งแต่ 1 ธันวาคม ราคา ¥880 เทียบกับ ¥1,000 หน้างาน
</>
          }
          tours={[
            {
              title: "ทัวร์ลิงหิมะจากโตเกียว พร้อมมื้อกลางวันสุกี้ยากี้เนื้อ",
              url: klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE),
              price: "เริ่มต้นประมาณ US$128",
              duration: "12 ชั่วโมง (08:00–20:00)",
              departs: "ชินจูกุ โตเกียว",
            },
            {
              title: "ทัวร์สวนลิงจิโกกุดานิและวัดเซนโกจิ (มื้อกลางวันสุกี้ยากี้เนื้อ)",
              url: klookFor(jigokudaniZenkojiSukiyakiTour.url, LOCALE),
              price: null,
              duration: "ประมาณ 13 ชั่วโมง 10 นาที",
              departs: "โตเกียว",
            },
            {
              title: "ทริปส่วนตัวสวนลิงจิโกกุดานิและวัดเซนโกจิ",
              url: klookFor(jigokudaniZenkojiPrivateDayTrip.url, LOCALE),
              price: null,
              duration: "10 ชั่วโมง",
              departs: "โรงแรมของคุณในโตเกียว",
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
ค่าเข้าตั้งแต่ 1 ธ.ค.
</p>
                <p className={styles.verdictStatValue}>
ผู้ใหญ่ ¥1,000 (เว็บ ¥880)
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
เวลาหน้าหนาว (พ.ย.–มี.ค.)
</p>
                <p className={styles.verdictStatValue}>9:00–16:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
โตเกียว → นากาโนะ
</p>
                <p className={styles.verdictStatValue}>
เร็วสุด 79 นาที
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
เดินไปหาลิง
</p>
                <p className={styles.verdictStatValue}>
30–35 นาที มีหิมะในฤดูหนาว
</p>
              </div>
            </div>
            <p className={styles.verdictText}>
<strong>สรุป:</strong> Jigokudani Yaen-koen หรือ Snow Monkey Park ค่าเข้าหน้างานผู้ใหญ่ ¥1,000 เด็ก ¥500 ตั้งแต่ 1 ธันวาคม 2026 หรือตั๋วเว็บ ¥880 และ ¥440 (¥800 และ ¥400 ถึง 30 พฤศจิกายน) เปิด 9:00–16:00 ในเดือนพฤศจิกายนถึงมีนาคม (8:30–17:00 เมษายนถึงตุลาคม) จากโตเกียวใช้โฮคุริคุชินคันเซ็นถึงนากาโนะเร็วสุด 79 นาที ต่อ Nagano Electric Railway ถึงยุดะนากะ 38 นาที และรถบัส 15 นาที (หรือรถบัสด่วนจากนากาโนะ 41 นาที) แล้วเดินประมาณ 35 นาทีบนทางไม่ลาดยางที่มีหิมะและน้ำแข็งในฤดูหนาว ทัวร์ลิงหิมะจัดการการต่อรถทั้งหมดและมักรวมเซนโกจิ การไปเองถูกกว่า แต่ใช้เวลาเกือบ 3 ชั่วโมงต่อเที่ยว ตัวเลขทั้งหมดจากเว็บไซต์ของสวน ตรวจสอบเมื่อ {CHECKED}
</p>
            <KlookLink
              href={klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
ดูทัวร์ลิงหิมะบน Klook →
</KlookLink>
          </div>
        </div>

                <KlookTripPrep
          label={"จองไปพร้อมกันในทริปนี้"}
          heading={"ทริปลิงหิมะต้องเตรียมอะไรอีก?"}
          intro={"สามสิ่งที่ทริปจิโกกุดานิต้องมี: ดาต้าสำหรับรถบัสและตั๋ว การเดินทางจากสนามบิน และพาสที่ครอบคลุมช่วงชินคันเซ็น"}
          items={sameTripItems}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ภาพรวม
</span>
          <h2 className={styles.sectionTitle}>
สวนลิงจิโกกุดานิคืออะไร?
</h2>
          <p className={styles.bodyText}>
Jigokudani Yaen-koen เป็นสวนลิงป่าในหุบเขาโยโกยุเหนือเมืองยามาโนะอุจิ ทางเหนือของจังหวัดนากาโนะ เปิดตั้งแต่ปี 1964 อยู่ที่ความสูง 850 เมตร และมีชื่อเสียงจากภาพลิงญี่ปุ่นนั่งแช่บ่อน้ำพุร้อนท่ามกลางหิมะ สวนระบุว่าฤดูหนาวต่ำถึง −10°C หิมะหนากว่าหนึ่งเมตร และลิงแช่น้ำเพื่อคลายหนาว โดยเฉพาะเดือนธันวาคมถึงมีนาคม
</p>
          <p className={styles.bodyText}>
ลิงเป็นสัตว์ป่าและไปมาตามใจ สวนเผยแพร่พยากรณ์รายสัปดาห์ และเตือนว่าบางวันลิงอาจไม่ลงมาเลย ควรเช็กก่อนสละทั้งวันจากโตเกียว
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
ค่าเข้าและเวลา
</span>
          <h2 className={styles.sectionTitle}>
ค่าเข้าเท่าไร และเปิดเมื่อไร?
</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "ตัวเลขทางการ", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
ค่าเข้าจากประกาศปรับราคาของสวนลงวันที่ 20 กันยายน 2026 เวลาและวันปิดจากหน้าเวลาและค่าเข้า ซึ่งยืนยันการเปลี่ยนแปลงวันที่ 1 ธันวาคม แต่ตารางยังเป็นราคาเดิม สิทธิ์เข้าก่อนของตั๋วเว็บจากหน้าแรก ความสูงและอากาศจากหน้าเกี่ยวกับภาษาอังกฤษ ตรวจสอบค่าเข้า เวลา และสิทธิ์เข้าก่อนที่ jigokudani-yaenkoen.co.jp เมื่อ {CHECKED} ตั๋วเว็บขายผ่านหน้า webticket ของสวน และ Nagaden มีแบบรวมรถบัสและค่าเข้าด้วย
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
การเดินทาง
</span>
          <h2 className={styles.sectionTitle}>
เดินทางจากโตเกียวไปลิงหิมะอย่างไร?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
สี่ช่วงกับการเดินเท้า ช่วงแรกเร็ว ส่วนสามช่วงหลังคือจุดตัดสินว่าวันนั้นจะราบรื่นหรือไม่
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ช่วง", "วิธี", "เวลา", "สิ่งที่ควรรู้"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.how}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
เวลาจากหน้าการเดินทางของสวน ตรวจสอบเมื่อ {CHECKED} เนื้อหาพาสจากหน้า Snow Monkey ของ Nagano Electric Railway ตรวจสอบเมื่อ 3 พฤศจิกายน 2026 <strong>เรื่องค่าโดยสาร:</strong> เราไม่แสดงค่าโดยสารเป็นเยนสำหรับชินคันเซ็น รถไฟ Nagaden หรือรถบัส เว็บไซต์ JR East ไม่ให้หน้าค่าโดยสารที่อ่านได้ Nagaden เผยแพร่ตารางค่าโดยสารเป็น PDF ที่เราอ่านไม่ได้ และตัวเลขรถบัสด่วน 2026-27 จากแหล่งภายนอกไม่ตรงกัน จึงควรเช็กที่สถานีหรือเว็บไซต์ผู้ให้บริการ <Link href="/guides/transport/jr-east-pass" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>คู่มือ JR East Pass(ภาษาอังกฤษ)</Link> คำนวณว่าพาสคุ้มกว่าตั๋วเดี่ยวไปนากาโนะเมื่อใด
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrEastPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
ดู JR EAST PASS บน Klook →
</KlookLink>
            <KlookLink href={klookFor(snowMonkeysZenkojiSakeNaganoTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
ทัวร์มีไกด์จากสถานีนากาโนะ →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ทางเดิน
</span>
          <h2 className={styles.sectionTitle}>
ต้องเดินไปหาลิงไกลแค่ไหน?
</h2>
          <p className={styles.bodyText}>
<strong>ฤดูหนาวประมาณ 30 ถึง 35 นาที ไม่ว่ามาทางไหน</strong> จากป้ายรถบัส Snow Monkey Park สวนระบุว่าประมาณ 35 นาที จากลานจอดรถฟรีที่คันบายาชิออนเซ็นประมาณ 30 นาทีตามเส้นทาง Yumichi ราว 2 กม. ซึ่งส่วนใหญ่เป็นทางราบและมีทางลาดบางช่วง ทางสั้นประมาณ 15 นาทีจากลานจอดรถจิโกกุดานิแบบเสียเงิน (¥500) ใช้ได้เฉพาะฤดูร้อน เพราะถนนป่าจากชิบุออนเซ็นปิดในฤดูหนาว และแคบเกินไปสำหรับรถใหญ่ตลอดปี
</p>
          <p className={styles.bodyText}>
ทางเดินไม่ลาดยาง มีทางลาดและขั้นบันได และสวนแจ้งว่าใช้รถเข็นไม่ได้ ฤดูหนาวเป็นหิมะอัดแน่นและมีน้ำแข็งบางจุด เผื่อเวลาเดินไปกลับหนึ่งชั่วโมงบวกเวลาดูลิง และวางแผนให้ถึงประตูก่อนเวลาปิด 16:00 อย่างน้อย 30 นาที
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
การแต่งกาย
</span>
          <h2 className={styles.sectionTitle}>
ไปดูลิงหิมะหน้าหนาวควรใส่อะไร?
</h2>
          <p className={styles.bodyText}>
<strong>รองเท้าบูตลุยหิมะ และถ้าเป็นไปได้ควรมีตะปูกันลื่นแบบง่าย</strong> สวนแนะนำรองเท้าบูตหรือบูตลุยหิมะในฤดูหนาว (ฤดูอื่นใช้รองเท้าผ้าใบหรือรองเท้าเดินป่า) และให้ซื้อตะปูกันลื่นแบบสวมรองเท้าไว้ล่วงหน้าเพื่อความปลอดภัย แต่งตัวสำหรับหุบเขา ไม่ใช่โตเกียว สวนระบุว่าฤดูหนาวต่ำถึง −10°C ถุงมือที่ใช้มือถือได้ หมวก และกระเป๋าที่ปิดสนิทก็จำเป็น
</p>
          <p className={styles.bodyText}>
เมื่อเข้าไปแล้วกฎมีไม่มาก แต่สวนเคร่งครัด ห้ามให้อาหาร ห้ามจับ ห้ามจ้องตาใกล้ ๆ (เป็นสัญญาณของความเป็นศัตรู) และถอยห่างถ้าลิงเด็กเข้ามาใกล้ ถ่ายรูปและใช้แฟลชได้ แต่ห้ามโดรนและไม้เซลฟี่ และห้ามยื่นกล้องเข้าหาลิงหรือลงไปในบ่อ ห้ามนำสุนัขและแมวเข้า รวมถึงสุนัขช่วยเหลือ
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
เปรียบเทียบ
</span>
          <h2 className={styles.sectionTitle}>
ทัวร์ลิงหิมะคุ้มไหม หรือควรไปเอง?
</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "ไปเอง", "ทัวร์ลิงหิมะ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.aspect}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.aspect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.diy}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
หลักตัดสินใจ: <strong>ไปกลับวันเดียวจากโตเกียวโดยไม่ค้างนากาโนะ ให้เลือกทัวร์</strong> สี่ช่วง ผู้ให้บริการรายเล็กสองราย และเวลาปิด 16:00 แทบไม่เหลือที่ให้พลาดรถบัส <strong>ค้างคืนที่ชิบุ ยุดะนากะ หรือคันบายาชิ หรือมี JR EAST PASS อยู่แล้ว ให้ไปเอง</strong> การพักใกล้ทำให้เดินเล่นตอนเช้าได้ก่อนคนที่มาเที่ยววันเดียว
</p>
          <p className={styles.bodyText}>
<strong>ควรจองเมื่อไร:</strong> ทัวร์แบบจอยมีที่นั่งจำกัดต่อวันและฤดูแช่น้ำมีเพียงสี่เดือน จึงควรจองทันทีที่วันแน่นอน โดยเริ่มจากสัปดาห์วันหยุด ก่อนจ่ายเงินให้เช็กเงื่อนไขการยกเลิกในหน้าสินค้า หิมะบนทางด่วนคือเหตุผลที่พบบ่อยที่สุดที่ทำให้แผนหน้าหนาวเปลี่ยน
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jigokudaniZenkojiSukiyakiTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
ทัวร์ลิงหิมะ + เซนโกจิ →
</KlookLink>
            <KlookLink href={klookFor(jigokudaniZenkojiPrivateDayTrip.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
ทริปส่วนตัวสำหรับกลุ่มของคุณ →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ฤดูกาล
</span>
          <h2 className={styles.sectionTitle}>
ช่วงไหนดีที่สุดสำหรับดูลิงหิมะ?
</h2>
          <p className={styles.bodyText}>
<strong>ธันวาคมถึงมีนาคม ในวันที่อากาศหนาว</strong> สวนระบุว่าลิงแช่น้ำในช่วงนี้ และพบบ่อยที่สุดในวันที่หนาวและหิมะตกมาก นี่ยังเป็นช่วงที่ผู้ถือตั๋วเว็บได้เข้าก่อน (ธันวาคมถึงเมษายน) ซึ่งบอกได้ว่าคิวยาวเมื่อใด ควรไปแต่เช้า ประตูปิด 16:00 ในฤดูหนาว และการมาถึงตอนเช้าทำให้มีเวลาเผื่อรถบัสเที่ยวหลัง
</p>
          <p className={styles.bodyText}>
นอกฤดูหนาวสวนเปิดนานกว่า (8:30–17:00 เมษายนถึงตุลาคม) และลิงยังอยู่ แต่สวนระบุว่าลิงไม่ค่อยแช่น้ำในเดือนที่อากาศอุ่น จึงไม่น่าจะเห็นภาพแช่น้ำ ถ้าไปเพื่อภาพนี้ พฤศจิกายนและเมษายนต้องลุ้น และฤดูร้อนไม่ใช่ทริปที่เหมาะ
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
เที่ยวร่วมกัน
</span>
          <h2 className={styles.sectionTitle}>
เที่ยวลิงหิมะพร้อมชิบุออนเซ็นหรือเซนโกจิได้ไหม?
</h2>
          <p className={styles.bodyText}>
<strong>เซนโกจิ</strong>อยู่ในตัวเมืองนากาโนะ ซึ่งทุกเส้นทางไปสวนต้องเปลี่ยนรถ และทัวร์จิโกกุดานิบางรายการบน Klook เพิ่มจุดนี้ไว้ ถ้าไปเอง ให้แวะขากลับเมื่อออกจากสวนทันเวลา ไม่ใช่ขาไป เพราะขาไปเวลาปิดของสวนสำคัญกว่า
</p>
          <p className={styles.bodyText}>
<strong>ชิบุออนเซ็น</strong>เป็นถนนเรียวกังเก่าใต้สวน และ<strong>คันบายาชิออนเซ็น</strong>อยู่ตรงจุดเริ่มเส้นทางเดิน ทั้งสองแห่งไม่ใช่จุดแวะของทริปวันเดียว แต่เป็นเหตุผลให้ค้างคืน ถ้าเล่นสกีที่โนซาวะออนเซ็น Klook ยังมีทัวร์เฉพาะฤดูหนาวที่พาไปดูลิงและเซนโกจิจากที่นั่น
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nozawaSnowMonkeyZenkojiTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
จากโนซาวะออนเซ็น →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ส่วนที่เหลือของหน้าหนาว
</span>
          <h2 className={styles.sectionTitle}>
ทริปหน้าหนาวไหนเข้ากับลิงหิมะ?
</h2>
          <p className={styles.bodyText}>
จิโกกุดานิเหมาะกับการอยู่ในเส้นทางยาวมากกว่าไปเดี่ยว ๆ และ<Link href="/th/guides/attractions/japan-winter-itinerary">แผนเที่ยวญี่ปุ่นหน้าหนาว</Link>ของเราวางแบบ 12 วันไว้ ถ้าพักโตเกียว ทริปที่เข้ากันที่สุดคือ<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">เล่นสกีวันเดียวที่ GALA Yuzawa(ภาษาอังกฤษ)</Link> เพราะ JR EAST PASS ครอบคลุมทั้งคู่ สองวันยาวจึงใช้พาสเดียวกันได้ เก็บเย็นวันว่างในเมืองไว้ให้<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">ไฟประดับโตเกียว(ภาษาอังกฤษ)</Link> ซึ่งเหนื่อยน้อยกว่าทริป 12 ชั่วโมงมาก โฮคุริคุชินคันเซ็นที่พาคุณมานากาโนะวิ่งต่อถึงคานาซาวะ ซึ่งเป็นทางเข้าปกติของ<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">ทัวร์ทาคายามะและชิราคาวาโกะ(ภาษาอังกฤษ)</Link> ทริปเดือนมกราคมควรกำหนดวันไลต์อัปก่อนวันไปดูลิง
</p>
          <p className={styles.bodyText}>
ไปทางเหนือต่อเป็นอีกทริปหนึ่ง และเป็นทางเลือกที่ดีถ้าหิมะคือเป้าหมาย นักสกีควรเทียบหุบเขานี้กับ<Link href="/th/guides/attractions/niseko-ski-tours">เล่นสกีนิเซโกะ</Link> ในเดือนกุมภาพันธ์ <Link href="/th/guides/attractions/sapporo-snow-festival-tours">ทัวร์เทศกาลหิมะซัปโปโร</Link>ผูกกับวันที่ 4–11 กุมภาพันธ์ 2027 วันไปดูลิงจึงต้องอยู่ก่อนหรือหลังช่วงนั้น จากซัปโปโร <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">ทริปโอตารุวันเดียว(ภาษาอังกฤษ)</Link>เพิ่มได้ง่าย และ<Link href="/th/guides/attractions/hokkaido-7-day-itinerary">เที่ยวฮอกไกโด 7 วัน</Link>แสดงว่าหนึ่งสัปดาห์เต็มเป็นอย่างไร
</p>
        </section>

        <KlookStayAreas
          heading={"ควรพักที่ไหนสำหรับลิงหิมะ?"}
          intro={"ค้างหนึ่งคืนใกล้สวนเปลี่ยนการเดินทางสามชั่วโมงให้เป็นการเดินเล่นตอนเช้า นี่คือสี่ฐานที่พัก ตั้งแต่จุดเริ่มเส้นทางถึงสถานีนากาโนะ พร้อมลิงก์โรงแรมบน Klook"}
          areas={jigokudaniStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "หมู่บ้านออนเซ็นตรงจุดเริ่มเส้นทาง ลานจอดรถฟรีของสวนและเส้นทาง Yumichi 2 กม. เริ่มที่นี่ คุณจึงออกเดินได้ก่อนคนมาเที่ยววันเดียว", area: "คันบายาชิออนเซ็น (Kanbayashi Hotel Senjukaku)" }, { why: "ถนนเรียวกังเก่าใต้สวน เหมาะค้างหนึ่งคืนระหว่างดูลิงกับนั่งรถไฟกลับนากาโนะ", area: "ชิบุออนเซ็น (Wafu No Yado MASUYA)" }, { why: "ปลายทางของ Nagano Electric Railway จุดเริ่มรถบัสท้องถิ่น 15 นาทีไปป้าย Snow Monkey Park", area: "ยุดะนากะ (Hotel Tsubakino)" }, { why: "ฐานที่เปิดทุกทางเลือก ชินคันเซ็นจากโตเกียว รถไฟ Nagaden ไปยุดะนากะ รถบัสด่วนไปสวน และเซนโกจิเริ่มที่นี่ทั้งหมด", area: "สถานีนากาโนะ" }] as Partial<typeof item>[])[i]))}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
ก่อนออกเดินทาง
</span>
          <h2 className={styles.sectionTitle}>
ไปดูลิงหิมะต้องมีดาต้าไหม?
</h2>
          <p className={styles.bodyText}>
ต้องมี และทริปนี้จำเป็นกว่าทริปส่วนใหญ่ ตั๋วเว็บ เวลารถบัสที่ยุดะนากะและนากาโนะ และพยากรณ์ลิงของสวนอยู่ในมือถือทั้งหมด และทางเดินกับป้ายรถบัสไม่มี Wi-Fi โรงแรม <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>ดู Klook eSIM →</KlookLink> หรือเปรียบเทียบผู้ให้บริการใน<Link href="/th/guides/esim/best-esim-japan">คู่มือ eSIM ญี่ปุ่น</Link>
</p>
        </section>

                <FaqList items={faqItems} />

        <KlookTourPicks
          heading={"ทัวร์ลิงหิมะบน Klook"}
          intro={"ทัวร์วันเดียวจากโตเกียวสองรายการ ทัวร์มีไกด์จากสถานีนากาโนะ ทริปส่วนตัว และทัวร์ฤดูสกีจากโนซาวะออนเซ็น เปิดหน้าสินค้าเพื่อดูราคาตามวัน สิ่งที่รวม ภาษาไกด์ และเงื่อนไขการยกเลิก"}
          tours={[withKlookLocale(snowMonkeySukiyakiTourTokyo, LOCALE, { title: "ทัวร์ลิงหิมะจากโตเกียว พร้อมมื้อกลางวันสุกี้ยากี้เนื้อ", desc: "รถโค้ช 12 ชั่วโมงจากชินจูกุ รวมค่าเข้าสวนและมื้อกลางวันสุกี้ยากี้เนื้อ จุดแวะบ้านหิมะ Kamakura no Sato มีเฉพาะช่วงประมาณปลายมกราคมถึงปลายกุมภาพันธ์" }), withKlookLocale(jigokudaniZenkojiSukiyakiTour, LOCALE, { title: "ทัวร์สวนลิงจิโกกุดานิและวัดเซนโกจิ (มื้อกลางวันสุกี้ยากี้เนื้อ)", desc: "ทัวร์มีไกด์รวมสวนลิงหิมะกับวัดเซนโกจิ สมบัติของชาติในนากาโนะ พร้อมมื้อกลางวันสุกี้ยากี้เนื้อ" }), withKlookLocale(snowMonkeysZenkojiSakeNaganoTour, LOCALE, { title: "ทัวร์ลิงหิมะ วัดเซนโกจิ และสาเกในนากาโนะ", desc: "ทัวร์มีไกด์จากสถานีนากาโนะ สำหรับผู้นั่งชินคันเซ็นด้วยพาส JR เที่ยวลิง เซนโกจิ และแวะสาเกโดยไม่ต้องต่อรถไฟเอกชนและรถบัส" }), withKlookLocale(jigokudaniZenkojiPrivateDayTrip, LOCALE, { title: "ทริปส่วนตัวสวนลิงจิโกกุดานิและวัดเซนโกจิ", desc: "สองจุดเดียวกันด้วยรถส่วนตัวสำหรับกลุ่มของคุณ เหมาะกับครอบครัวหรือผู้ที่อยากกำหนดจังหวะเดินเอง" }), withKlookLocale(nozawaSnowMonkeyZenkojiTour, LOCALE, { title: "ทัวร์หน้าหนาวจากโนซาวะออนเซ็น: ลิงหิมะ เซนโกจิ และชิมสาเก", desc: "ทริปเฉพาะฤดูหนาวจากโนซาวะออนเซ็น สำหรับนักสกีที่อยู่ในนากาโนะแล้ว พร้อมเซนโกจิและชิมสาเกในวันเดียวกัน" })]}
        />

                <Related items={[{ href: "/th/guides/attractions/japan-winter-itinerary", title: "แผนเที่ยวญี่ปุ่นหน้าหนาว" }, { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): ราคา ความครอบคลุม และคุ้มไหม (ภาษาอังกฤษ)" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "เล่นสกีวันเดียวที่ GALA Yuzawa จากโตเกียว (ภาษาอังกฤษ)" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "ทัวร์ทาคายามะและชิราคาวาโกะ (2027): ออกจากที่ไหนดี (ภาษาอังกฤษ)" }, { href: "/th/guides/attractions/niseko-ski-tours", title: "เล่นสกีนิเซโกะ (2027): รถรับส่ง คลาสสกี และ 4 พื้นที่" }, { href: "/th/guides/attractions/sapporo-snow-festival-tours", title: "ทัวร์เทศกาลหิมะซัปโปโร (2027)" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "ทริปโอตารุวันเดียวจากซัปโปโร (2027) (ภาษาอังกฤษ)" }, { href: "/th/guides/attractions/hokkaido-7-day-itinerary", title: "เที่ยวฮอกไกโด 7 วัน: แผนรายวัน" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "ไฟประดับโตเกียว: วันที่ เวลา และงานฟรี (ภาษาอังกฤษ)" }, { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "ทริปคารุอิซาวะวันเดียวจากโตเกียว (ภาษาอังกฤษ)" }, { href: "/guides/transport/tokyo-to-kanazawa", title: "โตเกียวไปคานาซาวะ (2026) (ภาษาอังกฤษ)" }, { href: "/guides/attractions/japan-14-day-itinerary", title: "แผนเที่ยวญี่ปุ่น 14 วัน (2026) (ภาษาอังกฤษ)" }, { href: "/guides/attractions/japan-10-day-itinerary", title: "แผนเที่ยวญี่ปุ่น 10 วัน (2026) (ภาษาอังกฤษ)" }, { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่นที่ดีที่สุด (2026)" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
จองวันหน้าหนาวก่อนเต็ม
</h2>
            <p className={styles.ctaBannerDesc}>
ทัวร์ลิงหิมะมีที่นั่งจำกัดต่อวัน และฤดูแช่น้ำมีเพียงธันวาคมถึงมีนาคม เลือกวัน เช็กสิ่งที่รวมในหน้าสินค้า แล้วให้ไกด์จัดการรถไฟ รถบัส และทางเดิน Klook รับบัตรต่างประเทศ
</p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
ดูทัวร์ลิงหิมะบน Klook →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
