import Head from "next/head";
import Link from "next/link";
import styles from "../../../../styles/BestEsimJapan.module.css";
import tools from "../../../../styles/Tools.module.css";
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
import { thKlookEsim } from "../../../../lib/klook-links-th";
import { klookEsim } from "../../../../lib/klook-links";
import {
  cheapestPlan,
  formatDate,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceAtLeastLabel,
  priceFromLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, monthLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/esim/best-esim-japan";
const TITLE = "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook";
const DESC =
  "eSIM ญี่ปุ่น 2026: eSIM ญี่ปุ่นของ Klook พร้อมเทียบราคา เครือข่าย และการโทรของ Airalo, Holafly, eSIM Go " +
  "และ Sakura Mobile ราคาดึงจากเว็บไซต์ของผู้ให้บริการทุกวัน ใช้ชุดข้อมูลและเวลาตรวจสอบเดียวกับฉบับภาษาอังกฤษ";

// Prices come from data/esim-prices.json via lib/esim-prices.ts — the same file
// scripts/fetch-esim-prices.mjs refreshes daily and the English page reads. The
// Thai edition quotes no figure the English one does not.
const pricesCheckedAt = formatDate(latestCheckedAt());

// The eSIM hub and the full plan table are English-only for now, so the "see every
// plan" links are labelled as English rather than silently switching language.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

type ThPick = {
  esimId: EsimProviderId;
  rank: number;
  name: string;
  bestFor: string;
  target: string;
  voice: boolean;
  physicalSim: boolean;
  /** Set where we cannot link the provider itself — see HOLAFLY_NOTE. */
  altOf?: EsimProviderId;
  altNote?: string;
};

// Holafly runs no affiliate programme we can join, which is why the English page
// points its CTA at Airalo's unlimited plans. Same decision, stated the same way.
const HOLAFLY_NOTE =
  "Holafly ไม่มีโปรแกรมพันธมิตรที่เราเข้าร่วมได้ ลิงก์นี้จึงชี้ไปที่แพ็กเกจไม่จำกัดของ Airalo ซึ่งเป็นตัวเลือกแทนที่เราแนะนำ";

const picks: ThPick[] = [
  {
    esimId: "airalo",
    rank: 1,
    name: "Airalo",
    bestFor: "ตัวเลือกโดยรวมอันดับ 1",
    target: "นักท่องเที่ยวส่วนใหญ่ — เสถียร ราคาถูก ตั้งค่าง่ายมาก",
    voice: false,
    physicalSim: false,
  },
  {
    esimId: "holafly",
    rank: 2,
    name: "Holafly",
    bestFor: "อันดับ 1 สายไม่จำกัด",
    target: "คนใช้เน็ตหนัก: ทำงานทางไกล ไลฟ์สด วิดีโอคอลทุกวัน",
    voice: false,
    physicalSim: false,
    altOf: "airalo",
    altNote: HOLAFLY_NOTE,
  },
  {
    esimId: "esimgo",
    rank: 3,
    name: "eSIM Go",
    bestFor: "คุ้มค่าที่สุด",
    target: "งบจำกัด หรือทริปนี้เที่ยวหลายประเทศในเอเชีย",
    voice: false,
    physicalSim: false,
  },
  {
    esimId: "sakura",
    rank: 4,
    name: "Sakura Mobile",
    bestFor: "อันดับ 1 สายอยู่ยาว",
    target: "อยู่เกินหนึ่งเดือน และต้องการโทรออกพร้อมบริการลูกค้าภาษาอังกฤษ",
    voice: true,
    physicalSim: true,
  },
];

const installSteps = [
  {
    title: "ซื้อและรับ QR code",
    desc: "ซื้อออนไลน์ก่อนออกเดินทาง ภายในไม่กี่นาทีคุณจะได้ QR code ส่งเข้าอีเมล",
  },
  {
    title: "สแกน QR code ในหน้าตั้งค่า",
    desc: "ไปที่ ตั้งค่า → เซลลูลาร์ (เน็ตมือถือ) → เพิ่ม eSIM → สแกน QR code ใช้เวลาไม่ถึง 2 นาที และทำที่บ้านก่อนเก็บกระเป๋าได้เลย",
  },
  {
    title: "เปิดใช้งานเมื่อถึงญี่ปุ่น",
    desc: "เมื่อเครื่องลงจอด ให้สลับเน็ตมือถือไปที่ eSIM ญี่ปุ่น คุณจะมีสัญญาณก่อนเดินไปถึงสายพานกระเป๋า ไม่ต้องหาตู้ขายซิมในสนามบิน",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "eSIM คืออะไร และไปญี่ปุ่นจำเป็นไหม?",
    a: "eSIM คือซิมดิจิทัลที่ฝังอยู่ในเครื่อง ไม่ต้องใช้การ์ดจริง คุณดาวน์โหลดโปรไฟล์ด้วย QR code แล้วใช้ได้ทันที ไปญี่ปุ่นไม่จำเป็นต้องใช้ eSIM แต่ตอนนี้เป็นตัวเลือกที่สะดวกที่สุด: ซื้อและติดตั้งก่อนเดินทาง แล้วเปิดใช้งานเมื่อถึงที่หมาย",
  },
  {
    q: "มือถือรุ่นไหนใช้ eSIM ในญี่ปุ่นได้?",
    a: "เครื่องในช่วงไม่กี่ปีมานี้รองรับเกือบทั้งหมด: iPhone XS ขึ้นไป, Google Pixel 3 ขึ้นไป, Samsung Galaxy S20 ขึ้นไป และเรือธง Android อีกหลายรุ่น ตรวจสอบได้ที่ ตั้งค่า → เกี่ยวกับ ข้อควรระวังคือเครื่องที่ติดล็อกค่ายบางรุ่นอาจใช้ eSIM ไม่ได้",
  },
  {
    q: "ใช้ eSIM ญี่ปุ่นแล้วยังเปิดเบอร์ไทยไว้ได้ไหม?",
    a: "ได้ และนี่คือข้อดีใหญ่ที่สุดข้อหนึ่งของ eSIM เครื่องที่รองรับสองซิมส่วนใหญ่ใช้สองซิมพร้อมกันได้ คุณให้เบอร์เดิมรับสายและ SMS ต่อไป (เช่น แจ้งเตือนรายการบัตรเครดิต) แล้วให้ eSIM ญี่ปุ่นรับหน้าที่เน็ต",
  },
  {
    q: "ในญี่ปุ่นควรใช้ Airalo หรือ Holafly?",
    a: "สำหรับคนส่วนใหญ่ Airalo ดีกว่า: ถูกกว่า ขั้นปริมาณเน็ตยืดหยุ่นกว่า และใช้ทั้ง Docomo และ SoftBank ถ้าคุณต้องการเน็ตไม่จำกัดจริง ๆ (ทำงานทางไกล ดูวิดีโอมาก) และงบทริปนี้รับส่วนต่างได้ Holafly จะเหนือกว่า",
  },
  {
    q: "ถึงญี่ปุ่นแล้ว eSIM ใช้ไม่ได้ทำอย่างไร?",
    a: "เช็กก่อนว่าโปรไฟล์ eSIM นั้นเปิด 'ข้อมูลโรมมิ่ง' แล้วหรือยัง ถ้ายังไม่มีสัญญาณ ให้เปิด-ปิดโหมดเครื่องบินหนึ่งครั้งเพื่อบังคับค้นหาเครือข่ายใหม่ ผู้ให้บริการทุกรายในหน้านี้มีแชทช่วยเหลือ 24 ชั่วโมง โดย Airalo และ Holafly ตอบเร็วเป็นพิเศษ",
  },
  {
    q: "eSIM ญี่ปุ่นต่างจากซิมการ์ดจริงอย่างไร?",
    a: "ทั้งสองให้เน็ตมือถือในญี่ปุ่นเหมือนกัน แต่ eSIM ติดตั้งเร็วกว่า (ไม่ต้องรอคิวที่สนามบิน) มักถูกกว่า และซื้อไว้ก่อนเดินทางได้ ซิมการ์ดจริงต้องไปรับที่เคาน์เตอร์หรือตู้ขายในสนามบินหลังลงเครื่อง ข้อดีหลักของซิมจริงคือใช้ได้กับเครื่องที่ไม่รองรับ eSIM",
  },
  {
    q: "ใช้โรมมิ่งของค่ายไทยในญี่ปุ่นเลยได้ไหม?",
    a: "ได้ แต่แพง ผู้ให้บริการหลายรายคิดค่าโรมมิ่งญี่ปุ่นประมาณวันละ $10–15 ทริป 10 วันจะเป็นค่าเน็ตอย่างเดียว $100–150 ขณะที่แพ็กเกจ eSIM ญี่ปุ่นทั้งแพ็กอยู่ที่ $9–18 ถ้าค่ายของคุณไม่มีแพ็กเสริมสำหรับนักเดินทางราคาถูกที่ครอบคลุมญี่ปุ่น eSIM ญี่ปุ่นโดยเฉพาะมักถูกกว่าแทบทุกครั้ง",
  },
  {
    q: "Airalo ใช้เครือข่ายอะไรในญี่ปุ่น?",
    a: "แพ็กเกจ eSIM ญี่ปุ่นของ Airalo ใช้ Docomo และ SoftBank Docomo ครอบคลุมกว้างที่สุดในญี่ปุ่น รวมถึงชนบท ภูเขา และเกาะ ส่วน SoftBank แข็งในเมืองและปริมณฑล ในทางปฏิบัติ นักท่องเที่ยวส่วนใหญ่แยกความต่างของสองเครือข่ายนี้ในแหล่งท่องเที่ยวไม่ออก",
  },
  {
    q: "Sakura Mobile คืออะไร และเหมาะกับใคร?",
    a: "Sakura Mobile เป็นผู้ให้บริการในญี่ปุ่นที่ขายซิมการ์ดและ eSIM สำหรับนักท่องเที่ยวและผู้พำนักระยะยาว ต่างจาก Airalo และ Holafly คือมีฟังก์ชันโทรออก มีบริการลูกค้าภาษาอังกฤษ และมีแพ็กเกจที่รองรับการพำนักถึง 90 วัน ใช้เครือข่าย Docomo (รายใหญ่ที่สุดของญี่ปุ่น) ราคาแพงกว่า eSIM ถูก ๆ แต่เป็นตัวเลือกที่ดีที่สุดสำหรับคนที่ต้องมีเบอร์ญี่ปุ่นหรืออยู่ยาว",
  },
  {
    q: "ไปญี่ปุ่นต้องใช้เน็ตกี่ GB?",
    a: "การเที่ยวทั่วไป — Google Maps แชต เล่นเว็บเบา ๆ ถ่ายรูปบ้าง — ประมาณวันละ 1 GB เป็นค่าคาดการณ์ที่สมเหตุสมผล ทริป 10 วันจะใช้ราว 8–10 GB ถ้าคุณใช้นำทางขับรถเยอะ ดูวิดีโอ หรือทำงานทางไกล ให้คิดวันละ 2 GB ขึ้นไป นักท่องเที่ยวส่วนใหญ่รู้สึกว่าแพ็กเกจ 3–5 GB พอสำหรับญี่ปุ่นหนึ่งสัปดาห์",
  },
  {
    q: "eSIM ญี่ปุ่นราคาเท่าไร?",
    a: `ราคา eSIM ญี่ปุ่นต่างกันตามผู้ให้บริการและขั้นปริมาณเน็ต (เวลาตรวจสอบ ${pricesCheckedAt}) สายประหยัด: eSIM Go เริ่มต้น ${priceFromLabel("esimgo")}, Airalo เริ่มต้น ${priceFromLabel("airalo")} ระดับกลาง: แพ็ก 5 GB ของ eSIM Go ${priceAtLeastLabel("esimgo", 5)}, Airalo ${priceAtLeastLabel("airalo", 5)} ไม่จำกัด: Holafly เริ่มต้น ${unlimitedFromLabel("holafly")} ผู้ให้บริการในญี่ปุ่นที่มีสายช่วยเหลือภาษาอังกฤษ: Sakura Mobile เริ่มต้น ${priceFromLabel("sakura")} ทริปทั่วไปหนึ่งสัปดาห์ให้คาดไว้ที่ $10–20`,
  },
  {
    q: "แพ็กเกจไม่จำกัดคุ้มสำหรับทริปญี่ปุ่นไหม?",
    a: "สำหรับนักท่องเที่ยวส่วนใหญ่: ไม่คุ้ม ญี่ปุ่นมี Wi-Fi ครอบคลุมดีทั้งในโรงแรม ร้านสะดวกซื้อ และแหล่งท่องเที่ยว แพ็กเกจ 3–5 GB เอาอยู่สำหรับการนำทาง แชต และเล่นเว็บในหนึ่งสัปดาห์ตามปกติ แพ็กเกจไม่จำกัด (เช่น Holafly) แพงกว่า 2–3 เท่า และมีเหตุผลหลัก ๆ กับคนใช้หนักที่ดูวิดีโอมาก วิดีโอคอลบ่อย หรือเข้าพื้นที่ที่ Wi-Fi ไม่ดี ถ้าตัดสินใจไม่ได้ ให้เริ่มที่ 5 GB แล้วค่อยพิจารณาเติม",
  },
  {
    q: "ถึงญี่ปุ่นแล้วเติมเน็ตเพิ่มได้ไหม?",
    a: "ได้ ผู้ให้บริการส่วนใหญ่รองรับการเติมในแอปโดยไม่ต้องใช้ QR code ใหม่ ถ้าใช้ Airalo ให้ซื้อแพ็กใหม่ในแอป ระบบจะผูกเข้ากับโปรไฟล์ eSIM เดิมอัตโนมัติ eSIM Go และ Sakura Mobile มีขั้นตอนเติมคล้ายกัน ส่วนแพ็กไม่จำกัดของ Holafly กำหนดจำนวนวันไว้ ถ้าอยู่นานกว่านั้นต้องซื้อแพ็กใหม่",
  },
  {
    q: "แพ็กเกจ eSIM ญี่ปุ่นรวมโทรและ SMS ไหม?",
    a: "แพ็กเกจ eSIM สำหรับนักท่องเที่ยวส่วนใหญ่ — รวม Airalo, eSIM Go และ Holafly — เป็นเน็ตเท่านั้น ไม่มีการโทรหรือ SMS การโทรในญี่ปุ่นใช้ WhatsApp, LINE หรือ FaceTime ผ่านเน็ตได้ ถ้าคุณจำเป็นต้องมีเบอร์ญี่ปุ่นที่โทรได้จริง Sakura Mobile เป็นตัวเลือกที่ดีที่สุดในกลุ่มผู้ให้บริการหลัก",
  },
  {
    q: "eSIM ญี่ปุ่นเริ่มนับเมื่อไร?",
    a: "ให้ติดตั้ง (สแกน QR) ก่อนออกเดินทาง ใช้เวลา 2–5 นาทีและต้องต่อ Wi-Fi แต่แพ็กเกจส่วนใหญ่เริ่มนับวันตั้งแต่ครั้งแรกที่คุณเชื่อมต่อเครือข่ายในญี่ปุ่น ไม่ใช่ตั้งแต่ติดตั้งโปรไฟล์ ดังนั้นให้สลับเน็ตมาที่ eSIM ญี่ปุ่นหลังเครื่องลงจอด แพ็กเกจจะเริ่มเดินตอนที่คุณต้องใช้จริง",
  },
  {
    q: "เครือข่ายไหนครอบคลุมดีที่สุดในญี่ปุ่น?",
    a: "Docomo ครอบคลุมชนบทได้ละเอียดที่สุด ถ้าทริปของคุณออกนอกเมืองใหญ่ก็คุ้มที่จะเลือกอย่างตั้งใจ — eSIM Go และ Sakura Mobile ใช้ Docomo ส่วน SoftBank และ KDDI (ที่ Airalo และ Holafly ใช้) ทำงานได้ดีในเมืองและเส้นทางท่องเที่ยว ถ้าเป็นเส้นทางมาตรฐานโตเกียว–เกียวโต–โอซาก้า–ฮิโรชิมา ทั้งสี่รายเพียงพอและคุณจะแยกความต่างไม่ออก",
  },
  {
    q: "ควรซื้อ eSIM ญี่ปุ่นเมื่อไร?",
    a: "eSIM ซื้อก่อนเดินทางและเปิดใช้งานทันทีที่ลงเครื่องได้เลย ไม่มีเหตุผลต้องรอ และไม่มีของหมด ซิมการ์ดจริงต่างออกไป: เคาน์เตอร์และตู้ขายในสนามบินของหมดจริงในช่วงไฮซีซัน การจองซิม Sakura Mobile ให้ไปรับที่สนามบินหรือโรงแรมจึงถูกกว่าซื้อหน้างานและปลอดภัยกว่าการเสี่ยงดวง",
  },
  {
    q: "ทำไม eSIM ญี่ปุ่นของฉันช้า?",
    a: "มีหลายสาเหตุที่เป็นไปได้: คุณใช้เน็ตไปเกือบหมดแล้ว (หลายแพ็กลดความเร็วเมื่อเกินเกณฑ์) คุณอยู่ในที่ที่สัญญาณไม่ดี (อุโมงค์ ภูเขา) หรือเครือข่ายหนาแน่นในแหล่งท่องเที่ยวที่คนเยอะอย่างชิบูยะหรือสถานีเกียวโต ลองเปิด-ปิดโหมดเครื่องบินก่อน ถ้าเน็ตยังไม่หมดและความเร็วไม่ดีขึ้น ให้ติดต่อฝ่ายช่วยเหลือของผู้ให้บริการ",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "eSIM ญี่ปุ่น" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThBestEsimJapanPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>ตรวจสอบราคา {pricesCheckedAt}｜อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>
            eSIM ญี่ปุ่น 2026:<br />เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook
          </h1>
          <p className={styles.heroSubtitle}>
            รวม eSIM ญี่ปุ่นรายใหญ่ไว้ในหน้าเดียว เทียบราคา ปริมาณเน็ต และเครือข่าย สำหรับคนที่จองตั๋วกับ
            Klook อยู่แล้ว ยังมีอีกตัวเลือกที่ง่ายกว่านั้น
          </p>
          <div className={styles.heroBadges}>
            {["ตรวจสอบราคาทุกวัน", "เทียบ eSIM 4 ราย", "ประเมินอย่างเป็นอิสระ"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        {/* Klook's Japan eSIM leads this edition for the same reason it leads the
            Chinese and Korean ones: a Thai reader is very likely already holding a
            Klook account for the tickets, and one checkout is a real convenience
            rather than a sales line. It still carries no price, because Klook's
            product page blocks automated reads — the same constraint the English
            page states. */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>ใช้ Klook อยู่แล้ว?</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>eSIM ญี่ปุ่นของ Klook:</strong> ถ้าตั๋ว ทัวร์หนึ่งวัน หรือรถไฟสนามบินของคุณจองไว้กับ
              Klook แล้ว Klook ก็ขาย eSIM ญี่ปุ่นเองด้วย บัญชีเดียว จ่ายครั้งเดียว ได้ e-voucher QR code
              หนึ่งใบ สำหรับคนที่อยู่บนแพลตฟอร์มนั้นแล้ว นี่คือวิธีที่ยุ่งยากน้อยที่สุด
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.86rem" }}>
              เหตุผลที่เราไม่จัดอันดับให้มันด้านล่างนั้นง่ายมาก: หน้าสินค้าของ Klook บล็อกการอ่านข้อมูล
              อัตโนมัติ (เราลองครั้งล่าสุดเมื่อ {klookEsim.checkedAt}) เราจึงไม่มีราคาหรือขั้นปริมาณเน็ตที่
              ตรวจสอบแล้วมาเทียบกับอีกสี่ราย ให้เปิดหน้าสินค้าเพื่อดูแพ็กเกจปัจจุบัน ส่วนราคาของสี่รายด้านล่าง
              เราอ่านจากเว็บไซต์ของพวกเขาเองทุกวัน
            </p>
            <a href={thKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดูแพ็กเกจ eSIM ญี่ปุ่นของ Klook →
            </a>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>เทียบเร็ว</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ผู้ให้บริการ", "เหมาะกับ", "ราคาต่ำสุด", "แพ็กที่ถูกที่สุด", "เครือข่าย", "โทร・SMS", "ซิมจริง", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {picks.map(({ esimId, name, bestFor, voice, physicalSim, altOf }) => {
                    const cheapest = cheapestPlan(esimId);
                    const affiliateUrl = getProvider(altOf ?? esimId).affiliateUrl;
                    const isExternal = affiliateUrl !== "#";
                    const label = altOf ? "ดู eSIM ไม่จำกัดของ Airalo →" : `ดู ${name} →`;
                    return (
                      <tr key={esimId}>
                        <td className={styles.tdProvider}>{name}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</td>
                        <td className={styles.tdNetwork}>{cheapest ? cheapest.name : "—"}</td>
                        <td className={styles.tdNetwork}>{getProvider(esimId).network}</td>
                        <td>{voice ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>{physicalSim ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>
                          {isExternal ? (
                            <a href={affiliateUrl} className={styles.tdLink} target="_blank" rel="sponsored noopener">
                              {label}
                            </a>
                          ) : (
                            <Link href={PLANS_HREF} className={styles.tdLink}>
                              ดูทุกแพ็กเกจ (ภาษาอังกฤษ)
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Klook, unranked for the reason stated in the box above. */}
                  <tr>
                    <td className={styles.tdProvider}>{thKlookEsim.label}</td>
                    <td className={styles.tdBestFor}>คนที่จองตั๋วกับ Klook อยู่แล้ว</td>
                    <td className={tools.tdMuted}>ดูที่ Klook</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>ไม่ระบุในหน้าสินค้า</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td>
                      <a href={thKlookEsim.url} className={styles.tdLink} target="_blank" rel={KLOOK_REL}>
                        ดูราคา eSIM ของ Klook →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> ตรวจสอบราคาทุกวัน</span>
            <span>
              ‘ราคาต่ำสุด’ คือแพ็กเกจญี่ปุ่นที่ถูกที่สุดของผู้ให้บริการแต่ละราย ณ เวลา {pricesCheckedAt}{" "}
              <Link href={PLANS_HREF} className={tools.inlineLink}>ดูทุกแพ็กเกจเรียงตามราคาต่อ GB (ภาษาอังกฤษ) →</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            มีเพียง Sakura Mobile ที่ขายแพ็กเกจแบบโทรได้และซิมการ์ดจริง อีกสามรายเป็น eSIM แบบเน็ตเท่านั้น
            ถ้าคุณต้องมีเบอร์โทรญี่ปุ่น หรือเครื่องของคุณใช้ eSIM ไม่ได้เลย ตัวเลือกก็เหลือทางเดียวก่อนจะคิด
            เรื่องราคา
          </p>
        </section>

        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>อันดับของเรา</span>
          <h2 className={styles.sectionTitle}>eSIM ญี่ปุ่น 4 อันดับ</h2>
          <div className={styles.picksList}>
            {picks.map(({ esimId, rank, name, bestFor, target, altOf, altNote }) => {
              const provider = getProvider(esimId);
              const cheapest = cheapestPlan(esimId);
              const affiliateUrl = getProvider(altOf ?? esimId).affiliateUrl;
              const isExternal = affiliateUrl !== "#";
              const label = altOf ? "ดู eSIM ไม่จำกัดของ Airalo →" : `ดู ${name} →`;
              return (
                <article key={esimId} id={esimId} className={styles.pickCard}>
                  <div className={styles.pickCardHeader}>
                    <div className={styles.pickRank}>
                      <span className={styles.pickNumber}>{rank}</span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>{bestFor}</span>
                        <span className={styles.pickName}>{name}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>
                      เครือข่าย: {provider.network}
                      {cheapest ? ` แพ็กเกจญี่ปุ่นที่ถูกที่สุดคือ ${formatUsd(cheapest.priceUsd)} (${cheapest.name}) เวลาตรวจสอบราคา ${pricesCheckedAt}` : ""}
                    </p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>เหมาะกับ:</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickCtaRow}>
                      {isExternal ? (
                        <a href={affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
                          {label}
                        </a>
                      ) : (
                        <Link href={PLANS_HREF} className={styles.pickCta}>
                          ดูทุกแพ็กเกจ (ภาษาอังกฤษ)
                        </Link>
                      )}
                    </div>
                    {altNote && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                        {altNote}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>วิธีติดตั้ง</span>
          <h2 className={styles.sectionTitle}>ติดตั้ง eSIM ญี่ปุ่นอย่างไร</h2>
          <div className={styles.stepsList}>
            {installSteps.map((step, i) => (
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

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี" },
            { href: "/th/guides/attractions/teamlab-tokyo-tickets", title: "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless" },
            { href: "/guides/transport/tokyo-airport-transfer", title: "จากนาริตะ・ฮาเนดะเข้าเมืองโตเกียว — เทียบราคาและเวลา (ภาษาอังกฤษ)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองตั๋วที่ Klook แล้ว ซื้อ eSIM ไปพร้อมกัน</h2>
            <p className={styles.ctaBannerDesc}>
              บัญชีเดียว จ่ายครั้งเดียว ได้ e-voucher QR code หนึ่งใบ เปิดหน้าสินค้าเพื่อดูแพ็กเกจและราคาปัจจุบัน
            </p>
            <a href={thKlookEsim.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดู eSIM ญี่ปุ่นของ Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
