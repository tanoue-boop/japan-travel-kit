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
import { thFujiHakoneDayTour, thSkytreeTicket } from "../../../../lib/klook-links-th";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/attractions/tokyo-skytree-tickets";
const TITLE = "ตั๋ว Tokyo Skytree 2026: ราคา ชั้น 350";
const DESC =
  "ตั๋ว Tokyo Skytree 2026: ชั้น 350 เริ่ม ¥1,800 คอมโบ 350+450 ¥3,000 ซื้อหน้างานบวก ¥500";

// Every figure comes from lib/attraction-prices.ts and the English guide that read
// it off tokyo-skytree.jp. Nothing was re-checked or added for this edition.
const P = PRICES.tokyoSkytree;
const CHECKED = dateLabel(P.checked, "th");
// "from ¥1,800" -> "เริ่มต้น ¥1,800": same figure, Thai qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");

const priceRows = [
  { ticket: "ชั้น 350 — ผู้ใหญ่ (15 ปีขึ้นไป)", advance: ADULT, sameDay: "บวกค่าบริการ ¥500" },
  { ticket: "ชั้น 350 — เด็ก (6–14 ปี)", advance: CHILD, sameDay: "บวกค่าบริการ ¥500" },
  { ticket: "คอมโบ 350＋450 — ผู้ใหญ่", advance: "เริ่มต้น ¥3,000", sameDay: "บวกค่าบริการ ¥500" },
  { ticket: "คอมโบ 350＋450 — เด็ก", advance: "เริ่มต้น ¥1,500", sameDay: "บวกค่าบริการ ¥500" },
  { ticket: "เพิ่มชั้น 450 ที่หน้างาน — ผู้ใหญ่", advance: "ไม่ขายออนไลน์", sameDay: "¥1,400" },
  { ticket: "เพิ่มชั้น 450 ที่หน้างาน — เด็ก", advance: "ไม่ขายออนไลน์", sameDay: "¥700" },
  { ticket: "อายุไม่เกิน 5 ปี", advance: "ฟรี", sameDay: "ฟรี" },
];

const deckRows = [
  {
    deck: "Tokyo Skytree",
    height: "ชั้น 350 และชั้น 450",
    price: `ชั้น 350 ${ADULT}・คอมโบ เริ่มต้น ¥3,000`,
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
    highlight: "ไม่ต้องมีตั๋วเลย — วิวเมืองที่คุ้มที่สุดในโตเกียว",
    area: "ชินจูกุ",
  },
];

const whoFor = [
  {
    title: "ชั้น 350 ก็พอ ถ้า…",
    desc: `คุณต้องการวิว ไม่ใช่ของเสริม ชั้น 350 คือจุดชมวิวหลักสามชั้น และมองเห็นที่ราบคันโตทั้งผืนอยู่แล้ว ผู้ใหญ่ ${ADULT} คิดต่อความสูงหนึ่งเมตรแล้วถูกที่สุดในบรรดาจุดชมวิวแบบเก็บเงินหลัก ๆ ของโตเกียว`,
  },
  {
    title: "เพิ่มชั้น 450 ถ้า…",
    desc: "ความสูงเป็นเป้าหมายของทริปนี้ ชั้น 450 คือ Tembo Galleria ทางเดินกระจกที่ไล่ลาดวนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ คอมโบออนไลน์เริ่มต้น ¥3,000 แต่ถ้าไปเพิ่มที่หน้างานบนตั๋วชั้น 350 จะบวกอีก ¥1,400",
  },
  {
    title: "เลือกรอบดึก ถ้า…",
    desc: `คุณอยากได้วิวกลางคืนมากกว่าเส้นขอบฟ้า วันที่ตรวจสอบเว็บไซต์ทางการ ${CHECKED} จุดชมวิวเปิดถึง 22:00 และรับเข้าครั้งสุดท้าย 21:00 รอบที่ยังเหลือหลังรอบกลางวันเต็มมักเป็นรอบดึก`,
  },
];

const steps = [
  {
    title: "ตัดสินใจก่อนจองว่าเอาแค่ชั้น 350 หรือคอมโบ",
    desc: "ชั้น 450 ซื้อเป็นคอมโบออนไลน์ (ผู้ใหญ่เริ่มต้น ¥3,000) ถูกกว่าไปเพิ่มที่หน้างานบนตั๋วชั้น 350 (บวก ¥1,400) ถ้ามีโอกาสที่คุณจะอยากขึ้นทางเดินกระจก ให้ซื้อคอมโบตั้งแต่แรก",
  },
  {
    title: "จองตั๋วระบุวันทางออนไลน์",
    desc: `เว็บไซต์ทางการขายตั๋วระบุวันด้วยราคา "เริ่มต้น" ข้างบน และยอดจริงของวันคุณอาจสูงกว่านั้น ซื้อหน้างานที่เคาน์เตอร์ชั้น 4 หรือร้านสะดวกซื้อจะบวกค่าบริการ ¥500 ต่อตั๋วหนึ่งใบ นี่คือเหตุผลที่ชัดที่สุดของการจองล่วงหน้า วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    title: "ถ้าใช้บัตรที่ออกนอกญี่ปุ่น ให้ใช้ตัวแทนจำหน่าย",
    desc: "Klook ขายตั๋วระบุเวลาเข้าชมใบเดียวกัน พร้อมหน้าจอที่อ่านเข้าใจและตั๋วอิเล็กทรอนิกส์ทันที ช่วยเลี่ยงปัญหาบัตรและภาษาที่เจอบ่อยในเว็บขายตั๋วทางการของญี่ปุ่น และหน้าสินค้าเดียวกันก็มีคอมโบชั้น 450 ด้วย",
  },
  {
    title: "เช็กเวลาของวันคุณ ไม่ใช่เวลาทั่วไป",
    desc: `Skytree ประกาศปฏิทินรายวัน และเว็บไซต์ทางการระบุชัดว่า "เวลาเปิดอาจเปลี่ยนโดยไม่แจ้งล่วงหน้า" โดยรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด วันที่ตรวจสอบ ${CHECKED} จุดชมวิวเปิด 10:00–22:00 และรับเข้าครั้งสุดท้าย 21:00`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว Tokyo Skytree ราคาเท่าไร?",
    a: `ตั๋วระบุวันบนเว็บไซต์ทางการ สำหรับชั้น 350 ซึ่งเป็นจุดชมวิวหลัก ผู้ใหญ่ (15 ปีขึ้นไป) ${ADULT} และเด็กอายุ 6–14 ปี ${CHILD} ตั๋วคอมโบที่ครอบคลุมชั้น 350 และชั้น 450 ผู้ใหญ่เริ่มต้น ¥3,000 เด็กเริ่มต้น ¥1,500 เด็กอายุไม่เกิน 5 ปีเข้าฟรี ทั้งหมดเป็นราคา "เริ่มต้น" ยอดของวันที่เจาะจงอาจสูงกว่า วันที่ตรวจสอบเว็บไซต์ทางการ ${CHECKED}`,
  },
  {
    q: "ซื้อตั๋ว Tokyo Skytree ล่วงหน้าถูกกว่าไหม?",
    a: `ถูกกว่า และส่วนต่างเป็นตัวเลขที่ประกาศไว้ ไม่ใช่เรื่องของอุปสงค์ ซื้อหน้างานที่เคาน์เตอร์ขายตั๋วชั้น 4 หรือร้านสะดวกซื้อจะบวกค่าบริการ ¥500 ต่อตั๋วหนึ่งใบบนราคาค่าเข้า ครอบครัวสี่คนคือ ¥2,000 ที่เลี่ยงได้ การจองตั๋วระบุวันออนไลน์ ไม่ว่าจะที่เว็บไซต์ทางการหรือตัวแทนจำหน่าย ข้ามทั้งค่าบริการและคิวที่เคาน์เตอร์ วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "ชั้น 350 กับชั้น 450 ต่างกันอย่างไร?",
    a: "ชั้น 350 คือ Tembo Deck จุดชมวิวหลักสามชั้น และเป็นชั้นที่ตั๋วทุกใบรวมอยู่แล้ว ชั้น 450 คือ Tembo Galleria ทางเดินผนังกระจกที่ไล่ลาดวนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ ชั้น 450 ไปแบบเดี่ยวไม่ได้ คุณต้องมีตั๋วชั้น 350 ก่อน ไม่ว่าจะเป็นส่วนหนึ่งของคอมโบออนไลน์ หรือเพิ่มที่เครื่องขายตั๋วหน้างานในราคาผู้ใหญ่ ¥1,400",
  },
  {
    q: "ซื้อตั๋วชั้น 450 ออนไลน์ได้ไหม?",
    a: `ซื้อแบบเดี่ยวไม่ได้ เว็บไซต์ทางการขายชั้น 450 เฉพาะในรูปคอมโบ ถ้าคุณมาถึงพร้อมตั๋วชั้น 350 แล้วเปลี่ยนใจ ให้เพิ่มชั้น 450 ที่เครื่องขายตั๋วหน้างาน ผู้ใหญ่ ¥1,400 หรือเด็ก 6–14 ปี ¥700 ซื้อคอมโบออนไลน์เป็นทางที่ถูกกว่า เพราะผู้ใหญ่เริ่มต้น ¥3,000 เทียบกับ ¥1,800 บวก ¥1,400 เมื่อแยกซื้อสองครั้ง วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "Tokyo Skytree เปิดกี่โมง?",
    a: `Skytree ใช้ปฏิทินรายวันแทนตารางเวลาคงที่ และเว็บไซต์ทางการระบุว่า "เวลาเปิดอาจเปลี่ยนโดยไม่แจ้งล่วงหน้า" โดยรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด วันที่ตรวจสอบ ${CHECKED} จุดชมวิวเปิด 10:00–22:00 และรับเข้าครั้งสุดท้าย 21:00 ควรเปิดปฏิทินด้วยวันของคุณเองก่อนจัดเย็นนั้นไว้ที่นี่`,
  },
  {
    q: "Tokyo Skytree หรือ Shibuya Sky ดีกว่า?",
    a: "สองที่ตอบคำถามต่างกัน Skytree คือเรื่องความสูงและระยะสายตา ชั้น 350 และ 450 เป็นจุดชมวิวที่สูงที่สุดในโตเกียว วิวครอบคลุมที่ราบคันโตทั้งผืน และวันที่อากาศดีจะมีภูเขาไฟฟูจิอยู่ในนั้น Shibuya Sky คือเรื่องรูปถ่าย ดาดฟ้ากลางแจ้งราว 229 เมตรเหนือแยกชิบูยะพอดี สวยที่สุดตอนพระอาทิตย์ตก และได้บรรยากาศมากกว่าความสูง ถ้าเลือกได้แห่งเดียว เอาวิวพาโนรามาไป Skytree เอารูปที่ทุกคนจำได้ไป Shibuya Sky",
  },
  {
    q: "มองเห็นภูเขาไฟฟูจิจาก Tokyo Skytree ไหม?",
    a: "วันที่อากาศดีเห็น และด้วยความสูงของมัน โอกาสสูงกว่าจุดชมวิวอื่นในเมืองนี้ ทัศนวิสัยขึ้นอยู่กับอากาศทั้งหมด และมักดีกว่าในเดือนที่อากาศเย็นและแห้ง รวมถึงช่วงต้นของวัน ไม่มีการรับประกันสำหรับวันใดวันหนึ่ง ซึ่งควรจำไว้ก่อนจ่ายราคาคอมโบเพื่อวิวฟูจิโดยเฉพาะ",
  },
  {
    q: "ไป Tokyo Skytree อย่างไร?",
    a: "หอตั้งอยู่เหนือสถานี Tokyo Skytree ของสาย Tobu Skytree และสถานีโอชิอาเกะ ซึ่งมีรถไฟใต้ดินโตเกียวเมโทรสายฮันโซมง สายโทเออาซากุสะ และสายเคเซโอชิอาเกะ โอชิอาเกะอยู่ในขอบเขตของ Tokyo Subway Ticket ดังนั้นถ้าคุณถือบัตรนั้นอยู่แล้ว การเดินทางไปที่นี่ไม่มีค่าใช้จ่ายเพิ่ม อาซากุสะอยู่ห่างสองสถานีบนสายอาซากุสะ ทำให้จัดสองที่นี้ไว้ในบ่ายเดียวกันได้ง่าย",
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
            ตั๋ว Tokyo Skytree 2026:<br />ราคา ชั้น 350 กับ 450 และวิธีจอง
          </h1>
          <p className={styles.heroSubtitle}>
            จุดชมวิวที่สูงที่สุดในโตเกียว และเป็นสถานที่ไม่กี่แห่งที่การซื้อหน้างานมีราคาที่ประกาศไว้ชัดเจน
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
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>คอมโบ 350＋450</p>
                <p className={styles.verdictStatValue}>เริ่มต้น ¥3,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ซื้อหน้างาน</p>
                <p className={styles.verdictStatValue}>บวก ¥500 ต่อใบ</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>อายุไม่เกิน 5 ปี</p>
                <p className={styles.verdictStatValue}>ฟรี</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> จองตั๋วระบุวันทางออนไลน์ Skytree เก็บค่าบริการ ¥500 ต่อตั๋วหนึ่งใบ
              ที่เคาน์เตอร์หน้างาน ดังนั้นการจองล่วงหน้าถูกกว่าด้วยจำนวนที่ประกาศไว้ ไม่ใช่ด้วยโชค
              ถ้ามีโอกาสที่คุณจะอยากขึ้นทางเดินกระจกชั้น 450 ให้ซื้อคอมโบตั้งแต่แรก เพราะไปเพิ่มที่หน้างาน
              ภายหลังจะแพงขึ้น ¥1,400 ราคาอ่านจากเว็บไซต์ทางการ วันที่ตรวจสอบ {CHECKED}
            </p>
            <KlookLink href={thSkytreeTicket.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดูตั๋ว Tokyo Skytree →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>คุณซื้ออะไร</span>
          <h2 className={styles.sectionTitle}>ตั๋วหนึ่งใบครอบคลุมถึงไหน</h2>
          <p className={styles.bodyText}>
            Tokyo Skytree ขายค่าเข้าสองชั้นที่แยกกัน <strong>ชั้น 350</strong> คือ Tembo Deck
            จุดชมวิวสามชั้น และเป็นชั้นที่ตั๋วทุกใบรวมอยู่แล้ว <strong>ชั้น 450</strong> คือ Tembo Galleria
            ทางเดินผนังกระจกที่ไล่ลาดวนขึ้นไปถึงจุดสูงสุดที่เข้าถึงได้ของหอ และไปแบบเดี่ยวไม่ได้
          </p>
          <p className={styles.bodyText}>
            ความสับสนส่วนใหญ่มาจากโครงสร้างสองชั้นนี้ เพราะราคาของสองชั้นต่างกันตามว่าคุณซื้อรวมกันออนไลน์
            หรือแยกซื้อที่หน้างาน ส่วนถัดไปวางสองเส้นทางไว้ข้างกัน
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
                    {["ตั๋ว", "ออนไลน์ ระบุวัน", "ที่หน้างาน"].map((h) => (
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
            &ldquo;เริ่มต้น&rdquo; ยอดของวันที่เจาะจงจึงอาจสูงกว่า ควรยืนยันตอนชำระเงิน ค่าบริการหน้างาน ¥500
            คิดต่อตั๋วหนึ่งใบ ทั้งที่เคาน์เตอร์ชั้น 4 และที่ร้านสะดวกซื้อ
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>ตั๋วแบบไหน</span>
          <h2 className={styles.sectionTitle}>ชั้น 350 คอมโบ หรือรอบดึก?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
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
            <Link href="/th/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Shibuya Sky
            </Link>{" "}
            คุ้มกว่า และถ้าอยากได้วิวเมืองโดยไม่จ่ายอะไรเลย อาคารรัฐบาลกรุงโตเกียวที่ชินจูกุเข้าฟรี
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
            เป็นค่าประมาณและอาจเปลี่ยนแปลง ควรยืนยันตอนชำระเงิน
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ขั้นตอน</span>
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
            ตัดสินใจจองแล้ว?{" "}
            <KlookLink href={thSkytreeTicket.url} target="_blank" rel={KLOOK_REL}>
              ดูรอบและราคาของ Skytree บน Klook →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>Tokyo Skytree อยู่ที่ไหน</h2>
          <p className={styles.bodyText}>
            การเดินทางเป็นส่วนที่ง่าย เพราะหอตั้งอยู่บนสถานีพอดี
          </p>
          <ul className={styles.bodyList}>
            <li><strong>สถานี Tokyo Skytree</strong> (สาย Tobu Skytree) — อยู่ใต้หอโดยตรง</li>
            <li><strong>สถานีโอชิอาเกะ</strong> — สายฮันโซมงของโตเกียวเมโทร สายโทเออาซากุสะ และสายเคเซโอชิอาเกะ</li>
            <li>โอชิอาเกะเป็นสถานีรถไฟใต้ดิน จึงอยู่ในขอบเขตของ Tokyo Subway Ticket ถ้าถือบัตรนั้นอยู่แล้วก็ไม่มีค่าใช้จ่ายเพิ่ม</li>
            <li>อาซากุสะอยู่ห่างสองสถานีบนสายอาซากุสะ จัดสองที่ไว้ในบ่ายเดียวกันได้ง่าย</li>
          </ul>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>เวลาที่เหลือของวัน</span>
          <h2 className={styles.sectionTitle}>จุดชมวิวใช้หนึ่งถึงสองชั่วโมง แล้วที่เหลือ?</h2>
          <p className={styles.bodyText}>
            รอบ Skytree ใช้เวลาหนึ่งถึงสองชั่วโมง จึงมักแบ่งวันกับกิจกรรมอื่น ถ้าในแผนโตเกียวของคุณยังมีวันว่าง
            ทัวร์หนึ่งวันภูเขาไฟฟูจิกับฮาโกเน่ออกจากโตเกียวและกลับเย็นวันเดียวกัน และจ่ายในบัญชี Klook
            เดียวกับตั๋วใบนี้
          </p>
          <KlookLink href={thFujiHakoneDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta} style={{ marginTop: "0.5rem", display: "inline-block" }}>
            ดู{thFujiHakoneDayTour.label} →
          </KlookLink>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/th/guides/attractions/teamlab-tokyo-tickets", title: "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless" },
            { href: "/th/guides/attractions/teamlab-borderless-tickets", title: "ตั๋ว teamLab Borderless (2026): ราคา รอบเวลา และช่องทางซื้อ" },
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จองก่อนที่เคาน์เตอร์จะคิดเพิ่ม</h2>
            <p className={styles.ctaBannerDesc}>
              ตั๋วหน้างานมีค่าบริการ ¥500 ต่อคน ตั๋วระบุวันที่จองออนไลน์ข้ามทั้งค่าบริการและคิว
              และ Klook จ่ายด้วยสกุลเงินของคุณเอง พร้อมตั๋วอิเล็กทรอนิกส์เข้ามือถือทันที
            </p>
            <KlookLink href={thSkytreeTicket.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดูตั๋ว Tokyo Skytree →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
