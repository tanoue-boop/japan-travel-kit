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
import { thShibuyaSky } from "../../../../lib/klook-links-th";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/attractions/shibuya-sky-tickets";
const TITLE = "ตั๋ว Shibuya Sky 2026: ราคาและวิธีจอง";
const DESC =
  "ตั๋ว Shibuya Sky 2026: ราคาทางการออนไลน์ผู้ใหญ่ ¥2,500 หน้างาน ¥3,000 และวิธีจอง";

// Every figure on this page comes from lib/attraction-prices.ts — the same record
// the English guide and the ticket price table read. Nothing is re-checked for the
// Thai edition and nothing new is added: same numbers, same source, same date.
const P = PRICES.shibuyaSky;
const CHECKED = dateLabel(P.checked, "th");
// priceLabel moves the English qualifier in these records ("from …", "Free") into
// Thai without touching the figure — see lib/i18n.ts.
const ADULT = priceLabel(P.adult, "th");
const AT_DOOR = priceLabel(P.atDoor, "th");

const priceRows = [
  { ticket: "ผู้ใหญ่ (ซื้อออนไลน์ล่วงหน้า)", price: ADULT },
  { ticket: "ผู้ใหญ่ (ซื้อหน้างาน)", price: AT_DOOR },
  { ticket: "เด็กอายุต่ำกว่า 5 ปี", price: priceLabel(P.child, "th") },
];

const deckRows = [
  {
    deck: "Shibuya Sky (SHIBUYA SKY)",
    height: "ประมาณ 229 ม. (ดาดฟ้า)",
    highlight: "ดาดฟ้ากลางแจ้งเหนือห้าแยกชิบูยะพอดี ภาพที่เป็นสัญลักษณ์ของโตเกียวที่สุด",
    price: "ประมาณ ¥2,500 ขึ้นไป (ผู้ใหญ่ ออนไลน์)",
    area: "สถานีชิบูยะ",
  },
  {
    deck: "Tokyo Skytree",
    height: "จุดชมวิว 350 ม. และ 450 ม. (ตัวหอสูง 634 ม.)",
    highlight: "วิวสูงที่สุดในเมือง มีพื้นกระจก วันฟ้าใสเห็นภูเขาไฟฟูจิ",
    price: "ประมาณ ¥1,800 (350 ม.) บัตรรวมประมาณ ¥3,100",
    area: "โอชิอาเกะ ติดอาซากุสะ",
  },
  {
    deck: "Tokyo Tower",
    height: "จุดชมวิวประมาณ 150 ม. และ 250 ม. (ตัวหอสูง 332 ม.)",
    highlight: "แลนด์มาร์กย้อนยุคปี 1958 ขึ้นชั้นสูงกว่าต้องซื้อ Top Deck Tour แยก",
    price: "ประมาณ ¥3,300 (Top Deck Tour)",
    area: "สวนชิบะ・อาคาบาเนะบาชิ",
  },
  {
    deck: "จุดชมวิวศาลาว่าการกรุงโตเกียว",
    height: "ประมาณ 202 ม.",
    highlight: "เข้าฟรี ได้วิวเมืองเต็มตาโดยไม่ต้องมีตั๋ว",
    price: "ฟรี",
    area: "ชินจูกุ",
  },
];

const whoFor = [
  {
    title: "ถ้ามาเพื่อถ่ายพระอาทิตย์ตก",
    desc: "รอบพระอาทิตย์ตกสวยที่สุดและแย่งกันมากที่สุด จึงมักเต็มก่อนรอบอื่น เลือกเข้าก่อนพระอาทิตย์ตก 30–60 นาที แล้วคุณจะได้ทั้งตอนกลางวัน ช่วงแสงทอง และเมืองติดไฟในรอบเดียว",
  },
  {
    title: "ถ้าแผนยังไม่แน่ ให้เลือกกลางวัน",
    desc: "รอบกลางวันจองง่ายกว่าและมักมีที่ว่างแม้ใกล้วันเดินทาง วันฟ้าใสเห็นภูเขาไฟฟูจิได้ด้วย ถ้าแผนยังเปลี่ยนได้ นี่คือตัวเลือกที่ยืดหยุ่นที่สุด",
  },
  {
    title: "ถ้าอยากเห็นวิวกลางคืนเท่านั้น",
    desc: "รอบกลางคืนคือทะเลไฟนีออน ไม่เห็นเส้นขอบฟ้า เป็นรอบที่มีที่ว่างเหลือนานที่สุด และเป็นแผนสำรองเมื่อรอบพระอาทิตย์ตกเต็ม",
  },
];

const steps = [
  {
    title: "เลือกรอบเวลาก่อน หัวใจอยู่ที่พระอาทิตย์ตก",
    desc: "รอบพระอาทิตย์ตกให้ทั้งกลางวัน แสงทอง และวิวกลางคืนในรอบเดียว จึงหมดเร็วที่สุด ถ้าอยากได้รอบนี้ ให้ถือว่าการจองเป็นเรื่องที่มีเส้นตาย",
  },
  {
    title: "ตั๋วเปิดขายประมาณ 2 สัปดาห์ก่อน เวลาเที่ยงคืนญี่ปุ่น",
    desc: "ตั๋วเปิดขายประมาณ 2 สัปดาห์ก่อนวันเข้าชม และวันที่ใหม่มักเปิดเวลา 00:00 ตามเวลาญี่ปุ่น ถ้าจะล่ารอบพระอาทิตย์ตก ให้ล็อกอินรอตอนวันของคุณเปิดขาย",
  },
  {
    title: "ถ้าใช้บัตรที่ออกนอกญี่ปุ่น ควรจองผ่านแพลตฟอร์ม",
    desc: "ตั้งแต่กรกฎาคม 2024 เว็บไซต์ทางการของ Shibuya Sky ปฏิเสธบัตรเครดิตที่ออกนอกญี่ปุ่นจำนวนมาก Klook จ่ายด้วยบัตรต่างประเทศได้ หน้าจอเป็นภาษาไทย และยกเลิกฟรีได้ถึง 24 ชั่วโมงก่อนเข้าชม ซึ่งมีประโยชน์มากเพราะอากาศโตเกียวเปลี่ยนง่าย",
  },
  {
    title: "รอบพระอาทิตย์ตก ไปถึงก่อน 30–60 นาที",
    desc: "เผื่อเวลาสำหรับผ่านทางเข้า ฝากของในล็อกเกอร์ (ดาดฟ้าเป็นที่โล่ง ลมแรง) และหาที่ยืนก่อนแสงจะเปลี่ยน",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว Shibuya Sky ราคาเท่าไร?",
    a: `ซื้อออนไลน์ล่วงหน้า ผู้ใหญ่ ${ADULT} ซื้อหน้างานในวันเข้าชม ${AT_DOOR} เด็กอายุต่ำกว่า 5 ปีเข้าฟรี และมีราคาเด็กและผู้สูงอายุแยกต่างหาก ซื้อออนไลน์ไม่ได้ถูกกว่าอย่างเดียวแต่ปลอดภัยกว่า เพราะรอบยอดนิยม (เฉพาะอย่างยิ่งพระอาทิตย์ตก) หมดก่อนถึงวันเข้าชม ราคาข้างต้นอ่านจากเว็บไซต์ทางการของ Shibuya Sky วันที่ตรวจสอบ ${CHECKED}`,
  },
  {
    q: "ควรไป Shibuya Sky ตอนไหนดีที่สุด?",
    a: "รอบพระอาทิตย์ตกได้รับความนิยมที่สุดและสวยที่สุด เพราะได้เห็นทั้งกลางวัน ช่วงแสงทอง และวิวกลางคืนในรอบเดียว และด้วยเหตุนั้นเองจึงเต็มเร็วที่สุด แนะนำให้เข้าก่อนพระอาทิตย์ตก 30–60 นาที ถ้ารอบพระอาทิตย์ตกเต็ม รอบกลางวันในวันฟ้าใสจะเห็นภูเขาไฟฟูจิ และรอบกลางคืนคือทะเลไฟที่มีที่ว่างเหลือนานที่สุด",
  },
  {
    q: "ควรจอง Shibuya Sky ล่วงหน้ากี่วัน?",
    a: "ตั๋วมักเปิดขายประมาณ 2 สัปดาห์ก่อนวันเข้าชม และวันที่ใหม่เปิดเวลาประมาณ 00:00 (เที่ยงคืน) ตามเวลาญี่ปุ่น รอบพระอาทิตย์ตกให้กดจ่ายทันทีที่วันของคุณเปิด เพราะช่วงไฮซีซันหมดได้ในไม่กี่นาที รอบกลางวันและกลางคืนสบายกว่า แต่ก็ยังควรจองล่วงหน้า",
  },
  {
    q: "ใช้บัตรเครดิตที่ออกนอกญี่ปุ่นซื้อตั๋ว Shibuya Sky ได้ไหม?",
    a: "บนเว็บไซต์ทางการของ Shibuya Sky มักใช้ไม่ได้ เพราะตั้งแต่กรกฎาคม 2024 เว็บไซต์ทางการปฏิเสธบัตรที่ออกนอกญี่ปุ่นจำนวนมาก วิธีที่ชัวร์คือจองผ่านแพลตฟอร์มอย่าง Klook จ่ายด้วยบัตรต่างประเทศได้ รับตั๋วอิเล็กทรอนิกส์ และยกเลิกฟรีได้ถึง 24 ชั่วโมงก่อนเข้าชม",
  },
  {
    q: "Shibuya Sky สูงเท่าไร และเห็นอะไรบ้าง?",
    a: "Shibuya Sky เป็นจุดชมวิวบนดาดฟ้าที่ความสูงประมาณ 229 เมตรเหนือชิบูยะ แบ่งเป็นดาดฟ้ากลางแจ้งและโซนในอาคาร จากด้านบนมองเห็นห้าแยกชิบูยะและเส้นขอบฟ้าโตเกียวได้รอบ 360 องศา วันที่อากาศใสเห็นภูเขาไฟฟูจิด้วย จุดเด่นคือดาดฟ้ากลางแจ้ง ดังนั้นใส่เสื้อกันลมและเช็กพยากรณ์อากาศก่อนออกเดินทาง",
  },
  {
    q: "ควรเลือก Shibuya Sky หรือ Skytree?",
    a: "Shibuya Sky ขายประสบการณ์และภาพถ่าย: ดาดฟ้ากลางแจ้งที่ความสูงประมาณ 229 เมตรเหนือห้าแยกชิบูยะ สวยที่สุดตอนพระอาทิตย์ตก และเป็นมุมที่จำได้ง่ายที่สุดของเมือง Tokyo Skytree ขายความสูงและระยะมอง: จุดชมวิวสองชั้นที่ 350 ม. และ 450 ม. มีโซนพื้นกระจก วันฟ้าใสมองไปได้ไกลรวมถึงภูเขาไฟฟูจิ อยากได้ภาพห้าแยกและบรรยากาศให้เลือก Shibuya Sky อยากได้พาโนรามาที่สูงและกว้างที่สุดให้เลือก Skytree",
  },
  {
    q: "โตเกียวมีจุดชมวิวฟรีไหม?",
    a: "มี อาคารศาลาว่าการกรุงโตเกียวที่ชินจูกุมีห้องชมวิวที่ความสูงประมาณ 202 เมตร และเข้าฟรี เป็นวิวเมืองแบบไม่เสียเงินที่คุ้มที่สุดในโตเกียว และเป็นทางเลือกที่ฉลาดถ้าอยากเก็บงบไว้ให้ Shibuya Sky หรือกิจกรรมอื่น เวลาเปิดและห้องชมวิวที่เปิดให้เข้ามีการเปลี่ยนแปลง ควรเช็กก่อนไป",
  },
  {
    q: "จาก Shibuya Sky เห็นภูเขาไฟฟูจิไหม?",
    a: "วันที่อากาศใสเห็นได้ ในวันที่อากาศโปร่ง Shibuya Sky มองเห็นภูเขาไฟฟูจิ แต่โอกาสสูงที่สุดยังเป็น Tokyo Skytree ที่สูงกว่า ทัศนวิสัยขึ้นอยู่กับสภาพอากาศ มักดีที่สุดในเดือนที่อากาศเย็นและแห้ง และในช่วงเช้า ไม่มีวันไหนรับประกันได้",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว Shibuya Sky" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThShibuyaSkyTicketsPage({ updated }: { updated: PageUpdated }) {
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
            ตั๋ว Shibuya Sky (2026):<br />ราคา รอบเวลาที่ควรไป และวิธีจอง
          </h1>
          <p className={styles.heroSubtitle}>
            วิวดาดฟ้าที่ดีที่สุดของโตเกียว — สูง 229 เมตรเหนือห้าแยกชิบูยะ ตั๋วราคาเท่าไร ควรไปตอนไหน
            และจองอย่างไรก่อนรอบพระอาทิตย์ตกจะเต็ม
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "เคล็ดลับจองรอบพระอาทิตย์ตก", "เทียบกับ Skytree และ Tokyo Tower"].map((t) => (
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
                <p className={styles.verdictStatLabel}>ราคา (ออนไลน์)</p>
                <p className={styles.verdictStatValue}>ผู้ใหญ่ {ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>รอบที่ควรไป</p>
                <p className={styles.verdictStatValue}>พระอาทิตย์ตก (เต็มเร็วที่สุด)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>จองเมื่อไร</p>
                <p className={styles.verdictStatValue}>ประมาณ 2 สัปดาห์ก่อน เที่ยงคืนญี่ปุ่น</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>บัตรต่างประเทศ?</p>
                <p className={styles.verdictStatValue}>แนะนำจองผ่านแพลตฟอร์ม</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ซื้อออนไลน์ ({ADULT} ถูกกว่าหน้างาน) และพยายามเลือกรอบพระอาทิตย์ตก
              เพราะเป็นรอบที่หมดก่อนใคร ถ้าบัตรของคุณออกนอกญี่ปุ่น จองผ่าน Klook จะชัวร์กว่า จ่ายด้วยบัตร
              ต่างประเทศได้ และยกเลิกฟรีได้ถึง 24 ชั่วโมงก่อนเข้าชม
            </p>
            <KlookLink href={thShibuyaSky.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดูตั๋ว Shibuya Sky →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>คืออะไร</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky คืออะไร?</h2>
          <p className={styles.bodyText}>
            Shibuya Sky คือจุดชมวิวบนชั้นดาดฟ้าของอาคาร Shibuya Scramble Square ที่ความสูงประมาณ 229 เมตร
            เหนือหนึ่งในสี่แยกที่พลุกพล่านที่สุดในโลก ประกอบด้วยดาดฟ้ากลางแจ้งและโซนในอาคาร มองเห็นห้าแยก
            ชิบูยะและเส้นขอบฟ้าโตเกียวได้รอบ 360 องศา และวันที่อากาศดีเห็นภูเขาไฟฟูจิด้วย
          </p>
          <p className={styles.bodyText}>
            ที่นี่กลายเป็นจุดที่ถูกถ่ายรูปมากที่สุดแห่งหนึ่งของโตเกียว ซึ่งเป็นทั้งจุดขายและปัญหา: รอบเวลาดี ๆ
            เต็ม และระบบจองมีกับดักสำหรับนักท่องเที่ยวต่างชาติอยู่สองสามจุด จัดการสองเรื่องนี้ได้ ที่นี่คือ
            หนึ่งในกิจกรรมที่คุ้มค่าที่สุดในโตเกียว
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ราคาตั๋ว Shibuya Sky</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ประเภทตั๋ว", "ราคา"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ราคาข้างต้นอ่านจากเว็บไซต์ทางการของ Shibuya Sky วันที่ตรวจสอบ {CHECKED} ราคาอาจปรับได้
            โปรดตรวจสอบอีกครั้งก่อนชำระเงิน การซื้อออนไลน์ล่วงหน้า ({ADULT}) ถูกกว่าหน้างาน ({AT_DOOR})
            และเป็นวิธีเดียวที่จะล็อกรอบพระอาทิตย์ตกได้ ราคาทางการชุดเดียวกันพร้อมสถานที่อื่นในญี่ปุ่นที่เรา
            ตรวจสอบแล้ว รวมอยู่ใน{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              ตารางราคาตั๋วสถานที่ท่องเที่ยวญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
            {" "}โดยทุกแถวมีวันที่ตรวจสอบกำกับไว้
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>รอบเวลา</span>
          <h2 className={styles.sectionTitle}>ควรเลือกรอบไหน?</h2>
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
          <span className={styles.sectionLabel}>เปรียบเทียบ</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky กับจุดชมวิวอื่นในโตเกียว</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shibuya Sky ชนะด้วยภาพห้าแยก แต่ไม่ใช่จุดชมวิวที่สูงที่สุดหรือถูกที่สุดในโตเกียว ตัวเลือกหลักมี
            สี่แห่ง: อยากได้ความสูงและวิวภูเขาไฟฟูจิให้เลือก Skytree อยากได้แลนด์มาร์กย้อนยุคให้เลือก
            Tokyo Tower อยากได้วิวเมืองแบบฟรีให้เลือกศาลาว่าการกรุงโตเกียว
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["จุดชมวิว", "ความสูง", "จุดเด่น", "ราคา (ประมาณ)", "ย่าน・สถานีใกล้สุด"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ความสูงและราคาเป็นค่าประมาณของปี 2026 ซึ่งอาจปรับได้ โปรดตรวจสอบก่อนชำระเงิน สำหรับ Skytree
            จุดชมวิว 350 ม. ประมาณ ¥1,800 เพิ่มจุดชมวิว 450 ม. อีกประมาณ ¥1,400 รวมเป็นบัตรเซ็ตประมาณ ¥3,100
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจอง Shibuya Sky</h2>
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
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/th/guides/attractions/teamlab-tokyo-tickets", title: "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless" },
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี" },
            { href: "/th/guides/attractions/usj-tickets-express-pass", title: "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "เที่ยวโตเกียว — อะไรต้องจองล่วงหน้า อะไรเดินเข้าได้เลย (ภาษาอังกฤษ)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>ล็อกพระอาทิตย์ตกที่ชิบูยะไว้ก่อน</h2>
            <p className={styles.ctaBannerDesc}>
              ซื้อออนไลน์ถูกกว่าหน้างาน และเป็นวิธีเดียวที่จะได้รอบพระอาทิตย์ตก Klook จ่ายด้วยบัตรเครดิต
              ต่างประเทศได้ และยกเลิกฟรีได้ถึง 24 ชั่วโมงก่อนเข้าชม ถ้าอากาศโตเกียวเปลี่ยนก็ไม่เสียเงินเปล่า
            </p>
            <KlookLink href={thShibuyaSky.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดูตั๋ว Shibuya Sky →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
