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
import { thFujiHakoneDayTour, thTeamlabPlanets } from "../../../../lib/klook-links-th";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless";
const DESC =
  "ตั๋ว teamLab Planets (โทโยสุ) 2026: ราคาทางการ ผู้ใหญ่เริ่มต้น ¥3,800 รอบเข้าชมแบบ 30 นาทีทำงานอย่างไร " +
  "ควรใส่อะไรไปเดินเท้าเปล่าในโซนน้ำ และ Planets ต่างจาก Borderless ที่อาซาบุไดฮิลส์อย่างไร ตัวเลขใช้ชุดข้อมูลและวันที่ตรวจสอบเดียวกับฉบับภาษาอังกฤษ";

// Same records the English guide and the ticket price table read, from
// lib/attraction-prices.ts. No figure here is new to the Thai edition.
const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const CHECKED = dateLabel(P.checked, "th");
// "from ¥3,800" -> "เริ่มต้น ¥3,800": same figure, Thai qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");
const B_ADULT = priceLabel(B.adult, "th");

const priceRows = [
  { ticket: "ผู้ใหญ่", price: ADULT, note: "ราคาเปลี่ยนตามวันและรอบเวลา" },
  { ticket: "นักเรียนมัธยมต้น・ปลาย", price: "¥2,800", note: "พกบัตรนักเรียนไปด้วย" },
  { ticket: "เด็กอายุ 4–12 ปี", price: CHILD, note: "อายุต่ำกว่า 4 ปีไม่ต้องมีตั๋ว" },
  { ticket: "อายุไม่เกิน 3 ปี", price: "ฟรี", note: "เตรียมเสื้อผ้าสำรอง โซนน้ำทุกคนเปียก" },
  { ticket: "ผู้พิการ", price: "เริ่มต้น ¥1,900", note: "พกเอกสารรับรองไปด้วย" },
  { ticket: "Premium Pass", price: "¥12,000", note: "เข้าก่อนคิว อายุ 4 ปีขึ้นไป" },
];

const compareRows = [
  { factor: "ที่ตั้ง", planets: "โทโยสุ (เขตโคโต)", borderless: "อาซาบุไดฮิลส์ (เขตมินาโตะ)" },
  { factor: "แนวคิด", planets: "ดำดิ่ง เดินเท้าเปล่า เดินลงน้ำ", borderless: "เขาวงกตไร้แผนที่ ผลงานกว่า 50 ชิ้น" },
  { factor: "เหมาะกับ", planets: "ครอบครัวมีเด็ก มาครั้งแรก อยากสัมผัสด้วยร่างกาย", borderless: "คนรักศิลปะ เดินช้า ๆ ถ่ายรูป" },
  { factor: "เวลาที่ควรเผื่อ", planets: "ประมาณ 1.5–2 ชม. รวมเตรียมเท้าเปล่า", borderless: "ประมาณ 2 ชม. อยู่นานกว่าได้" },
  { factor: "ตั๋วผู้ใหญ่ (เริ่มต้น)", planets: ADULT, borderless: B_ADULT },
  { factor: "เวลาเปิด", planets: "ประกาศไว้ 08:00–22:00 เปลี่ยนตามวัน", borderless: "ประกาศไว้ 08:30–21:00 เปลี่ยนตามวัน" },
  { factor: "การเข้าชม", planets: "รอบเข้าชมทุก 30 นาที", borderless: "รอบระบุเวลา หรือ Flexible Pass ที่ไม่ระบุเวลา" },
  {
    factor: "ควรรู้",
    planets: "มีกำหนดเปิดถึงสิ้นปี 2027 เดินเท้าเปล่าและมีโซนน้ำ",
    borderless: "ซื้อหน้างานแพงกว่า ¥200 ต่อผู้ใหญ่หนึ่งคน",
  },
];

const whoFor = [
  {
    title: "ถ้าเลือก Planets",
    desc: "คุณมากับเด็ก หรืออยากได้ประสบการณ์ที่ใช้ร่างกาย และไม่ติดว่าเท้าจะเปียก เพราะคุณจะเดินเท้าเปล่าผ่านโซนน้ำที่ลึกถึงระดับหัวเข่าผู้ใหญ่ ที่นี่เป็นฝั่งที่สนุกและสัมผัสได้ตรงกว่า และเป็นฝั่งที่เด็กสนุกได้ง่ายกว่า",
  },
  {
    title: "ถ้าเลือก Borderless",
    desc: "คุณอยากจมลงไปในงานศิลปะ ไม่ใช่เดินผ่านมัน Borderless ที่อาซาบุไดฮิลส์ไม่มีเส้นทางกำหนด ผลงานเคลื่อนย้ายระหว่างห้อง และคุณเดินสำรวจอิสระในพื้นที่กว่า 50 ส่วน ที่นี่ตอบแทนเวลาและความใจเย็น และถ่ายรูปสวยกว่าสำหรับผู้ใหญ่",
  },
  {
    title: "ไปทั้งสองที่ ถ้า…",
    desc: "คุณมีครึ่งวันว่างสองครั้งและเป็นแฟน teamLab จริงจัง ทั้งสองแห่งอยู่ต่างย่านของเมืองและเป็นประสบการณ์ที่ต่างกันจริง จึงไม่ซ้ำกัน ขอให้แยกวันและจองรอบระบุเวลาของแต่ละที่ล่วงหน้า",
  },
];

const steps = [
  {
    title: "เลือกวันก่อน แล้วดูราคาของวันนั้น",
    desc: "ตั๋วผู้ใหญ่ของ Planets เริ่มต้น ¥3,800 แต่ยอดจริงขึ้นอยู่กับวันและรอบที่คุณเลือก เช้าวันธรรมดาถูกที่สุดและคนน้อยที่สุด",
  },
  {
    title: "จองรอบเข้าชม 30 นาที ล่วงหน้า 2–3 สัปดาห์",
    desc: "ตั๋วของคุณผูกกับช่วงเข้าชม 30 นาที เช่น 10:00–10:30 รอบยอดนิยมมักเต็มล่วงหน้า 2–3 สัปดาห์ และพิพิธภัณฑ์ไม่มีเคาน์เตอร์ขายตั๋วหน้างาน การจองล่วงหน้าจึงเป็นตัวแผนเอง ไม่ใช่แผนสำรอง",
  },
  {
    title: "ซื้อจาก teamLab หรือพาร์ตเนอร์ขายตั๋วทางการ",
    desc: "เว็บไซต์ตั๋วทางการของ Planets ขายตั๋วอิเล็กทรอนิกส์โดยตรง ส่วน Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab จ่ายด้วยสกุลเงินของคุณเองและหน้าจอภาษาไทย รับบัตรที่ออกนอกญี่ปุ่นได้ดี ทั้งสองทางได้ QR code บนมือถือเหมือนกัน",
  },
  {
    title: "แต่งตัวให้ถูก และไปถึงภายในรอบของคุณ",
    desc: "ใส่กางเกงขาสั้น หรือกางเกงที่ม้วนขึ้นเหนือหัวเข่าได้ เพราะบางผลงานเป็นพื้นที่น้ำที่ลึกถึงระดับหัวเข่าผู้ใหญ่ ถ้าใส่กระโปรงหรือกางเกงขากว้าง ที่นี่มีกางเกงขาสั้นให้ยืมฟรีไซส์ XS ถึง 6L เพราะพื้นบางส่วนเป็นกระจก ช่วงคนเยอะ การเตรียมตัวก่อนเข้าอาจใช้ 30–60 นาที ควรไปถึงตอนรอบเริ่ม",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว teamLab Planets ปี 2026 ราคาเท่าไร?",
    a: `ตามเว็บไซต์ตั๋วทางการของ teamLab Planets วันที่ตรวจสอบ ${CHECKED}: ผู้ใหญ่ ${ADULT} นักเรียนมัธยมต้นและปลาย ¥2,800 เด็กอายุ 4–12 ปี ${CHILD} และอายุไม่เกิน 3 ปีเข้าฟรี ผู้พิการเริ่มต้น ¥1,900 และมี Premium Pass ราคา ¥12,000 สำหรับอายุ 4 ปีขึ้นไป ตั๋วผู้ใหญ่เปลี่ยนตามวันและรอบเวลา ควรตรวจสอบยอดของรอบตัวเองก่อนชำระเงิน ตั๋วลดราคาต้องแสดงหลักฐาน ให้พกบัตรนักเรียน พาสปอร์ต หรือเอกสารรับรองผู้พิการ`,
  },
  {
    q: "ต้องจอง teamLab Planets ล่วงหน้าไหม?",
    a: "ต้องจอง และจำเป็นมากกว่าสถานที่อื่นในโตเกียว Planets ใช้รอบเข้าชมทุก 30 นาที รอบยอดนิยมเต็มล่วงหน้า 2–3 สัปดาห์ โดยเฉพาะวันหยุดสุดสัปดาห์และวันหยุดยาว หน้าข้อมูลทางการระบุชัดว่าอย่าคาดหวังว่าจะซื้อตั๋วได้ที่พิพิธภัณฑ์ เพราะตั๋วขายออนไลน์ล่วงหน้า ไม่ใช่ขายที่เคาน์เตอร์ ควรล็อกวันและรอบก่อนออกเดินทาง",
  },
  {
    q: "ไป teamLab Planets ควรใส่อะไร?",
    a: "กางเกงขาสั้น หรือกางเกงที่ม้วนขึ้นเหนือหัวเข่าได้ บางผลงานเป็นพื้นที่น้ำที่ลึกถึงระดับหัวเข่าผู้ใหญ่ และทั้งพิพิธภัณฑ์เป็นประสบการณ์เท้าเปล่า รองเท้า ถุงเท้า และถุงน่องถอดไว้ที่ล็อกเกอร์ทางเข้า พื้นบางส่วนเป็นกระจก จึงไม่แนะนำกระโปรงและกางเกงขากว้าง ที่นี่มีกางเกงขาสั้นให้ยืมฟรีไซส์ XS ถึง 6L ถ้ามากับเด็กให้เตรียมเสื้อผ้าสำรอง และรถเข็นเด็กเข้าไม่ได้ (มีที่จอดรถเข็น ใช้เป้อุ้มเด็กได้)",
  },
  {
    q: "teamLab Planets ใช้เวลานานเท่าไร?",
    a: "เผื่อไว้ประมาณ 1.5 ถึง 2 ชั่วโมง ตัวผลงานใช้เวลาเดินแบบไม่รีบประมาณหนึ่งถึงหนึ่งชั่วโมงครึ่ง แต่ต้องบวกเวลาล็อกเกอร์ เตรียมเท้าเปล่า และเช็ดตัวหลังออกมา ช่วงคนเยอะแค่การเตรียมตัวก่อนเข้าก็อาจใช้ 30–60 นาที อย่านัดกิจกรรมอื่นต่อทันทีหลังจากนี้",
  },
  {
    q: "teamLab Planets เปิดกี่โมง และปิดวันไหน?",
    a: `เวลาเปิดเปลี่ยนตามวัน ตอนที่เราดูเว็บไซต์ทางการเมื่อ ${CHECKED} Planets ประกาศเวลา 08:00–22:00 และรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด วันปิดช่วงปลายปี 2026 รวมวันที่ 5 พฤศจิกายน (พฤหัสบดี) และ 3 ธันวาคม (พฤหัสบดี) เนื่องจากปฏิทินเปลี่ยนทุกเดือน ควรเช็กปฏิทินทางการด้วยวันของคุณก่อนจองรอบ`,
  },
  {
    q: "ถ้าพลาดรอบที่จองไว้จะเป็นอย่างไร?",
    a: "ไม่ได้หมายความว่าเข้าไม่ได้แน่นอน หน้าข้อมูลทางการระบุว่าเวลาบนตั๋วเป็นเวลาอ้างอิง หากคุณมาสาย ยังเข้าได้ภายในเวลาทำการของวันนั้น โดยต้องไม่เกินเวลารับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด แต่คุณอาจต้องรอนานกว่าผู้ถือตั๋วของรอบนั้น จึงควรถือว่ารอบเวลาคือแผนของคุณ",
  },
  {
    q: "teamLab Planets อยู่ที่ไหน และไปอย่างไร?",
    a: "อยู่ที่โทโยสุ ย่านริมน้ำทางตะวันออกของโตเกียว ข้อมูลการเดินทางทางการระบุว่า: สถานีชินโทโยสุ สายยูริคาโมเมะ เดิน 1 นาที สถานีชิโจมาเอะและตลาดโทโยสุ เดิน 5 นาที สถานีโทโยสุ รถไฟใต้ดินโตเกียวเมโทรสายยูรากุโจ เดิน 10 นาที จากสถานีโตเกียวนั่งแท็กซี่ประมาณ 15 นาที และจากสนามบินฮาเนดะทางด่วนประมาณ 15 นาที ช่วงรถไฟใช้บัตร IC อย่าง Suica หรือ PASMO ก็พอ",
  },
  {
    q: "teamLab Planets จะปิดแล้วจริงไหม?",
    a: "teamLab Planets ที่โทโยสุมีกำหนดเปิดให้บริการถึงสิ้นปี 2027 และ teamLab ยังประกาศแผนขยายที่เพิ่มผลงานกว่า 10 ชิ้น กำหนดการอาจเปลี่ยน ถ้าคุณจะจัดทริปเพื่อที่นี่โดยเฉพาะ ควรเช็กเว็บไซต์ทางการก่อน teamLab Borderless ที่อาซาบุไดฮิลส์เป็นพิพิธภัณฑ์อีกแห่งที่เปิดต่อเนื่องแยกกัน และตั๋วแยกกัน",
  },
  {
    q: "teamLab Planets ต่างจาก Borderless อย่างไร?",
    a: "Planets ที่โทโยสุเป็นประสบการณ์ดำดิ่งแบบเท้าเปล่า คุณเดินลงน้ำและเข้าไปในงานติดตั้งขนาดใหญ่ เป็นฝั่งที่ใช้ร่างกายมากกว่าและเหมาะกับครอบครัวมีเด็กมากกว่า Borderless ที่อาซาบุไดฮิลส์เป็นเขาวงกตไร้แผนที่ที่ประกอบด้วยผลงานกว่า 50 ชิ้น ไม่มีเส้นทางกำหนด ผลงานเคลื่อนย้ายระหว่างพื้นที่ และผู้ชมเดินสำรวจอิสระ Planets เหมาะกับครอบครัวและคนมาครั้งแรก Borderless เหมาะกับคนรักศิลปะที่อยากสำรวจช้า ๆ ทั้งสองเป็นพิพิธภัณฑ์ในย่านต่างกันของโตเกียว และตั๋วแยกกัน",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว teamLab Planets" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
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
            ตั๋ว teamLab Planets (2026):<br />ราคา รอบเข้าชม และเทียบกับ Borderless
          </h1>
          <p className={styles.heroSubtitle}>
            ตั๋ว teamLab Planets ที่โทโยสุราคาเท่าไร รอบเข้าชมแบบ 30 นาทีทำงานอย่างไร ควรใส่อะไรไปโซนน้ำ —
            และ Planets ต่างจาก Borderless ที่อาซาบุไดฮิลส์อย่างไร
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "Planets vs Borderless"].map((t) => (
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
                <p className={styles.verdictStatLabel}>ตั๋วผู้ใหญ่</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การเข้าชม</p>
                <p className={styles.verdictStatValue}>รอบ 30 นาที ต้องจองก่อน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาที่ควรเผื่อ</p>
                <p className={styles.verdictStatValue}>ประมาณ 1.5–2 ชม.</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>การแต่งตัว</p>
                <p className={styles.verdictStatValue}>ขาสั้น — เท้าเปล่า น้ำถึงเข่า</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> teamLab Planets ผู้ใหญ่ {ADULT} นักเรียนมัธยม ¥2,800 เด็ก 4–12 ปี {CHILD}
              ตั๋วผูกกับช่วงเข้าชม 30 นาที และไม่มีเคาน์เตอร์ขายหน้างาน ถ้าไปวันหยุดสุดสัปดาห์ให้จองล่วงหน้า
              2–3 สัปดาห์ คุณจะเข้าแบบเท้าเปล่า และบางผลงานเป็นพื้นที่น้ำลึกถึงระดับหัวเข่าผู้ใหญ่ ให้ใส่
              กางเกงขาสั้นหรือกางเกงที่ม้วนขึ้นได้ (ที่นี่มีให้ยืมฟรีไซส์ XS–6L) เผื่อเวลา 1.5–2 ชั่วโมง
              และเดินจากสถานีชินโทโยสุ 1 นาที
            </p>
            <a href={thTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดูตั๋ว teamLab Planets →
            </a>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              ราคา เวลาเปิด และวันปิดในหน้านี้อ่านจากเว็บไซต์ทางการของ teamLab วันที่ตรวจสอบ {CHECKED}
              ราคาของ Planets เปลี่ยนตามวันและรอบเวลา และปฏิทินก็เปลี่ยน โปรดตรวจสอบทั้งสองอย่างด้วยวันของคุณ
              ตอนชำระเงิน
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ราคาตั๋ว teamLab Planets</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ส่วนที่ขยับคือตั๋วผู้ใหญ่: {ADULT} และยอดที่คุณเห็นขึ้นอยู่กับวันและรอบที่เลือก ตั๋วนักเรียนและ
            เด็กเป็นราคาคงที่ และอายุต่ำกว่า 4 ปีไม่ต้องมีตั๋วเลย
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ประเภทตั๋ว", "ราคา (เริ่มต้น)", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            อ่านจากเว็บไซต์ตั๋วทางการของ teamLab Planets วันที่ตรวจสอบ {CHECKED} ตั๋วลดราคาต้องแสดงหลักฐาน
            ให้พกบัตรนักเรียน พาสปอร์ต หรือเอกสารรับรองผู้พิการ ตั๋วส่งเป็น QR code บนมือถือ
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ก่อนจอง</span>
          <h2 className={styles.sectionTitle}>เวลาเปิด รอบเข้าชม และการแต่งตัว</h2>
          <p className={styles.bodyText}>
            Planets เรียกร้องจากคุณมากกว่าพิพิธภัณฑ์ทั่วไป: ต้องเข้าแบบเท้าเปล่า และเส้นทางส่วนหนึ่งเป็นน้ำ
            ข้อมูลด้านล่างคือสิ่งที่เราเห็นบนเว็บไซต์ทางการเมื่อ {CHECKED}
          </p>
          <ul className={styles.bodyList}>
            <li><strong>เวลาเปิด:</strong> ประกาศไว้ 08:00–22:00 เปลี่ยนตามวัน และรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด</li>
            <li><strong>วันปิด:</strong> ไม่ประจำ รวมวันที่ 5 พฤศจิกายน (พฤหัสบดี) และ 3 ธันวาคม (พฤหัสบดี) ปี 2026</li>
            <li><strong>การเข้าชม:</strong> ตั๋วผูกกับช่วง 30 นาที เช่น 10:00–10:30 ช่วงคนเยอะการเตรียมตัวก่อนเข้าอาจใช้ 30–60 นาที</li>
            <li><strong>มาสาย?</strong> หน้าข้อมูลทางการระบุว่าเวลาบนตั๋วเป็นเวลาอ้างอิง ยังเข้าได้ภายในเวลาทำการของวันนั้น แต่ต้องไม่เกินเวลารับเข้าครั้งสุดท้าย</li>
            <li><strong>เท้าเปล่า:</strong> รองเท้า ถุงเท้า และถุงน่องถอดไว้ที่ล็อกเกอร์ และชมทั้งหมดแบบเท้าเปล่า</li>
            <li><strong>น้ำ:</strong> บางผลงานเป็นพื้นที่น้ำที่ลึกถึงระดับหัวเข่าผู้ใหญ่ ให้ใส่กางเกงขาสั้นหรือกางเกงที่ม้วนขึ้นได้</li>
            <li><strong>พื้นกระจก:</strong> กระโปรงและกางเกงขากว้างจะมีปัญหา ที่นี่มีกางเกงขาสั้นให้ยืมฟรีไซส์ XS ถึง 6L</li>
            <li><strong>มากับเด็ก:</strong> เตรียมเสื้อผ้าสำรอง รถเข็นเด็กเข้าไม่ได้ (มีที่จอดรถเข็น) ใช้เป้อุ้มเด็กได้</li>
            <li><strong>กระเป๋า:</strong> กระเป๋าที่ใหญ่กว่าประมาณ 23 × 34 × 37 ซม. ต้องฝากที่จุดรับฝากที่กำหนด ไม่ใช่ล็อกเกอร์</li>
          </ul>
          <p className={styles.bodyText}>
            เวลาเปิดและวันปิดเปลี่ยนทุกเดือน ควรเปิดปฏิทินทางการด้วยวันเดินทางของคุณก่อนเลือกรอบ เช้าวัน
            ธรรมดาถูกที่สุดและคนน้อยที่สุด
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>คุณจ่ายเพื่ออะไร</span>
          <h2 className={styles.sectionTitle}>teamLab Planets คืออะไรจริง ๆ</h2>
          <p className={styles.bodyText}>
            teamLab คือกลุ่มศิลปินในโตเกียวที่มีชื่อเรื่องงานติดตั้งดิจิทัลขนาดใหญ่ที่ให้คุณ ‘เดินเข้าไป’
            ไม่ใช่ ‘มองดู’ Planets ที่โทโยสุเป็นฝั่งที่ใช้ร่างกายมากที่สุด: คุณเดินเท้าเปล่าลงน้ำ ผ่านผลงาน
            ที่ตอบสนองต่อการมีอยู่ของคุณ ทั้งห้องกระจกไร้ขอบเขต ห้องโถงที่เต็มไปด้วยลูกแสงลอย และสวนที่มีชีวิต
            ที่นี่เป็นฝั่งที่เด็กสนุกได้ง่ายกว่าในสอง teamLab ของโตเกียว และเป็นฝั่งที่สะเทือนที่สุดถ้าคุณ
            ไม่เคยเห็นศิลปะดิจิทัลสเกลนี้
          </p>
          <p className={styles.bodyText}>
            และที่นี่คนเยอะ: teamLab ประกาศว่าปี 2025 มีผู้เข้าชมเกิน 2.5 ล้านคน พิพิธภัณฑ์มีกำหนดเปิดถึง
            สิ้นปี 2027 และประกาศแผนขยายที่เพิ่มผลงานกว่า 10 ชิ้น ดังนั้นถ้าคุณไปแล้ว ครั้งต่อไปก็ไม่ใช่ทริปเดิม
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจองตั๋ว teamLab Planets</h2>
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
            ตัดสินใจจองแล้ว?{" "}
            <a href={thTeamlabPlanets.url} target="_blank" rel={KLOOK_REL}>
              ดูรอบเวลาและราคาของ Planets บน Klook →
            </a>
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกันข้าง ๆ</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs Borderless</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            โตเกียวมีพิพิธภัณฑ์ teamLab สองแห่ง และนักท่องเที่ยวจองผิดกันบ่อย ทั้งสองเป็นสถานที่แยกกันในย่าน
            ต่างกัน และตั๋วแยกกัน: <strong>Planets</strong> ที่โทโยสุคือแห่งที่เดินเท้าเปล่าลงน้ำ ส่วน
            {" "}<strong>Borderless</strong> ที่อาซาบุไดฮิลส์คือเขาวงกตไร้แผนที่ซึ่งผลงานกว่า 50 ชิ้น
            เคลื่อนย้ายระหว่างห้อง Borderless มีราคา เวลา และกฎการจองของตัวเอง และยังไม่มีฉบับภาษาไทย
            ฉบับภาษาอังกฤษอยู่ที่{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              ไกด์ตั๋ว teamLab Borderless (ภาษาอังกฤษ)
            </Link>
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab Borderless"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ราคาและเวลาเปิดอ่านจากเว็บไซต์ทางการของ teamLab วันที่ตรวจสอบ {CHECKED} ตั๋วผู้ใหญ่ของทั้งสองแห่ง
            คิดราคาตามวันและรอบเวลา และปฏิทินก็เปลี่ยน โปรดตรวจสอบวันของคุณเอง ส่วน ‘เวลาที่ควรเผื่อ’
            เป็นคำแนะนำการจัดเวลาของเรา ไม่ใช่ตัวเลขทางการ
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>ที่ไหนเหมาะกับคุณ</span>
          <h2 className={styles.sectionTitle}>ควรเลือก teamLab แห่งไหน?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>teamLab Planets อยู่ที่ไหน</h2>
          <p className={styles.bodyText}>
            Planets อยู่ที่โทโยสุ ย่านริมน้ำทางตะวันออกของโตเกียว ติดกับตลาดโทโยสุ ข้อมูลการเดินทางทางการ
            ระบุว่า:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>สถานีชินโทโยสุ</strong> (สายยูริคาโมเมะ) — เดิน 1 นาที เส้นทางที่ง่ายที่สุด</li>
            <li><strong>สถานีชิโจมาเอะ</strong>・ตลาดโทโยสุ — เดิน 5 นาที</li>
            <li><strong>สถานีโทโยสุ</strong> (โตเกียวเมโทรสายยูรากุโจ) — เดิน 10 นาที เช่นเดียวกับ LaLaport โทโยสุ</li>
            <li>จากสถานีโตเกียวนั่งแท็กซี่ประมาณ 15 นาที จากสนามบินฮาเนดะทางด่วนประมาณ 15 นาที</li>
          </ul>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เวลาที่เหลือของวัน</span>
          <h2 className={styles.sectionTitle}>Planets ใช้เวลาชั่วโมงเดียว แล้วอีกครึ่งวัน?</h2>
          <p className={styles.bodyText}>
            Planets ใช้เวลาในอาคารประมาณหนึ่งชั่วโมง จึงมักแชร์วันกับกิจกรรมอื่น ถ้าทริปโตเกียวของคุณยังมี
            วันว่างเต็มวัน ทัวร์ภูเขาไฟฟูจิและฮาโกเน่ออกจากโตเกียวและกลับเย็นวันเดียวกัน และจ่ายในบัญชี Klook
            เดียวกับตั๋ว
          </p>
          <a href={thFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta} style={{ marginTop: "0.5rem", display: "inline-block" }}>
            ดู{thFujiHakoneDayTour.label} →
          </a>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี" },
            { href: "/th/guides/attractions/usj-tickets-express-pass", title: "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook" },
            { href: "/guides/attractions/teamlab-borderless-tickets", title: "ตั๋ว teamLab Borderless — ราคา รอบเวลา ช่องทางซื้อ (ภาษาอังกฤษ)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>พร้อมจอง teamLab Planets แล้วหรือยัง?</h2>
            <p className={styles.ctaBannerDesc}>
              การเข้าชมแบ่งเป็นรอบ 30 นาที และรอบดี ๆ หมดก่อน 2–3 สัปดาห์ Klook เป็นพาร์ตเนอร์ขายตั๋วทางการ
              ของ teamLab จ่ายด้วยสกุลเงินของคุณเอง และเก็บตั๋วอิเล็กทรอนิกส์ไว้ในมือถือได้เลย
            </p>
            <a href={thTeamlabPlanets.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดูตั๋ว teamLab Planets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
