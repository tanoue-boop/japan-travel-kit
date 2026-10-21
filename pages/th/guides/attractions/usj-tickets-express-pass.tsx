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
import { thUsjExpressPass, thUsjStudioPass } from "../../../../lib/klook-links-th";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, monthLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/attractions/usj-tickets-express-pass";
const TITLE = "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน";
const DESC =
  "USJ ขายบัตรออนไลน์เท่านั้นแล้ว และ Super Nintendo World ต้องใช้บัตรเข้าโซนตามเวลา หน้านี้อธิบายราคาของ " +
  "Studio Pass ที่คิดตามวัน ว่า Express Pass คุ้มหรือไม่ และปี 2026 ควรซื้อแบบไหน เนื้อหาใช้ข้อเท็จจริงชุดเดียวกับฉบับภาษาอังกฤษ";

// Same facts as the English guide: USJ prices by date tier and we deliberately
// quote no figure, because none could be verified for a given date.
const ticketRows = [
  { ticket: "Studio Pass 1 วัน", what: "สิทธิ์เข้าสวนหนึ่งวัน เครื่องเล่นทั่วไปต่อคิวปกติ", price: "คิดตามวัน — ตรวจสอบตอนจอง" },
  { ticket: "Studio Pass 2 วัน", what: "เข้าสองวันต่อเนื่อง เฉลี่ยต่อวันมักถูกกว่า", price: "คิดตามวัน — ตรวจสอบตอนจอง" },
  { ticket: "Express Pass (ซื้อเพิ่ม)", what: "ข้ามคิวเครื่องเล่นที่กำหนด＋บัตรเข้า Super Nintendo World ตามเวลา", price: "เปลี่ยนแปลง และยอดเพิ่มมักไม่น้อย — ตรวจสอบตอนจอง" },
];

const expressRows = [
  { pass: "Express Pass 4", rides: "เครื่องเล่นที่กำหนดประมาณ 4 อย่าง", snw: "มักรวมบัตรเข้า Super Nintendo World ตามเวลา (ขึ้นกับรอบ)", bestFor: "เวลาน้อย เน้นเครื่องเล่นหลัก" },
  { pass: "Express Pass 7", rides: "เครื่องเล่นที่กำหนดประมาณ 7 อย่าง", snw: "มักรวมบัตรเข้า Super Nintendo World ตามเวลา", bestFor: "ยอดนิยมที่สุด — เสาร์อาทิตย์และวันหยุดยาว" },
  { pass: "Express Pass 8・Premium", rides: "ครอบคลุมกว้างที่สุด", snw: "รวมบัตรเข้า Super Nintendo World ตามเวลา", bestFor: "วันที่คนเยอะที่สุดและช่วงครบรอบ 25 ปี" },
];

const whoFor = [
  {
    title: "คนที่ไปวันธรรมดานอกฤดูท่องเที่ยว",
    desc: "ถ้าคุณเลือกวันธรรมดาที่คนน้อยและแผนยืดหยุ่น Studio Pass เพียงใบเดียวอาจพอ โซน Super Nintendo World ใช้แอปทางการของ USJ รับบัตรคิวเข้าโซนแบบฟรี และเครื่องเล่นอื่นต่อคิวปกติ",
  },
  {
    title: "คนที่ไปเสาร์อาทิตย์・วันหยุดยาว",
    desc: "วันหยุดสุดสัปดาห์ วันหยุดยาว และตลอดช่วงครบรอบ 25 ปีในปี 2026 คิวปกติของเครื่องเล่นยอดนิยมอาจพุ่งถึง 180–240 นาที การซื้อ Studio Pass บวก Express Pass 7 คือวิธีที่จะได้เล่นเครื่องเล่นหลักจริงและได้เข้า Super Nintendo World แน่นอน",
  },
  {
    title: "มีวันเดียวและอยากเล่นให้ครบ",
    desc: "ถ้าคุณมีวันเดียวแต่อยากกวาดเครื่องเล่นใหญ่บวก Super Nintendo World ให้ครบ Express Pass 7 หรือ 8 คุ้มกับส่วนต่าง เพราะมันคือการซื้อเวลาที่คุณจะเสียไปกับการต่อคิวคืนมา",
  },
];

const steps = [
  {
    title: "ซื้อ Studio Pass ออนไลน์ก่อนออกเดินทาง",
    desc: "ตั้งแต่พฤษภาคม 2025 USJ ไม่ขายบัตรเข้าในวันนั้นที่ประตูแล้ว การซื้อออนไลน์จึงจำเป็นในทางปฏิบัติ Klook เป็นพาร์ตเนอร์ทางการของ USJ หน้าจอเป็นภาษาไทย และรองรับบัตรเครดิตที่ออกนอกญี่ปุ่น",
  },
  {
    title: "ตัดสินใจว่าคุณต้องการ Express Pass จริงไหม",
    desc: "เทียบวันที่คุณจะเข้ากับความแน่นที่คาดไว้ เสาร์อาทิตย์ วันหยุดยาว และช่วงครบรอบแนะนำให้ซื้อ Express Pass เพิ่ม ส่วนวันธรรมดาที่คนน้อยอาจไม่จำเป็น",
  },
  {
    title: "จัดการวิธีเข้า Super Nintendo World ให้ชัด",
    desc: "วันที่คนเยอะ Super Nintendo World ใช้ระบบเข้าโซนตามเวลา Express Pass ที่รวมบัตรเข้าโซนตามเวลาจะการันตีว่าคุณเข้าได้ ถ้าไม่ซื้อ ให้เข้าสวนแล้วใช้แอปทางการของ USJ รับบัตรคิวเข้าโซนแบบฟรี",
  },
  {
    title: "ไปถึงก่อนเวลาเปิดสวน",
    desc: "วันที่คนเยอะ สวนอาจเปิดประตูก่อนเวลาที่ประกาศ ไปถึงก่อน 30–60 นาทีจะได้บัตรเข้า Super Nintendo World ตามเวลาง่ายขึ้น และได้ต่อคิวปกติรอบแรกก่อนด้วย",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "บัตร USJ ต้องซื้อล่วงหน้าไหม?",
    a: "ต้อง ตั้งแต่พฤษภาคม 2025 Universal Studios Japan หยุดขายบัตรเข้าในวันนั้นที่ประตู ดังนั้นคุณต้องซื้อออนไลน์ก่อนออกเดินทาง การจองผ่านพาร์ตเนอร์ทางการอย่าง Klook ทำให้หน้าจอเป็นภาษาไทย รับบัตรเครดิตต่างประเทศ และส่งตั๋วอิเล็กทรอนิกส์ที่สแกนตอนเข้าสวนได้เลย",
  },
  {
    q: "Express Pass USJ ปี 2026 คุ้มไหม?",
    a: "วันที่คนเยอะ คุ้ม ปี 2026 เป็นช่วงครบรอบ 25 ปีของ USJ และคิวปกติของเครื่องเล่นยอดนิยมที่สุดอาจถึง 180–240 นาที Express Pass เปลี่ยนการรอหลายชั่วโมงนั้นเป็นการเข้าก่อน และเวอร์ชันส่วนใหญ่ยังการันตีบัตรเข้า Super Nintendo World ตามเวลาด้วย ถ้าเป็นวันธรรมดานอกฤดูที่คนน้อยก็จำเป็นน้อยลง แต่สำหรับเสาร์อาทิตย์ วันหยุดยาว และคนช่วงครบรอบ ถ้าอยากเล่นเครื่องเล่นหลักก็แทบจะต้องมี",
  },
  {
    q: "Express Pass 4, 7, 8 ต่างกันอย่างไร?",
    a: "ตัวเลขสอดคล้องคร่าว ๆ กับจำนวนเครื่องเล่นที่กำหนดที่คุณข้ามคิวได้ Express Pass 4 ประมาณสี่อย่าง Express Pass 7 ประมาณเจ็ดอย่าง และระดับ 8・Premium ครอบคลุมกว้างที่สุด เวอร์ชันส่วนใหญ่ยังรวมบัตรเข้า Super Nintendo World ตามเวลาหนึ่งใบ Express Pass 7 เป็นจุดสมดุลระหว่างความครอบคลุมกับราคาที่ได้รับความนิยมที่สุด ส่วน 8・Premium เหมาะกับวันที่แน่นที่สุด รายการเครื่องเล่นที่รวมจริงเปลี่ยนตามวัน โปรดตรวจสอบรายละเอียดของวันคุณก่อนซื้อ",
  },
  {
    q: "เข้า Super Nintendo World อย่างไร?",
    a: "วันที่คนเยอะ Super Nintendo World ใช้ระบบเข้าโซนตามเวลา มีสองวิธีที่เชื่อถือได้: ซื้อ Express Pass ที่รวมบัตรเข้าโซนตามเวลา หรือเข้าสวนแล้วใช้แอปทางการของ USJ รับบัตรคิวเข้าโซนแบบฟรี วันที่คนน้อยคุณอาจเดินเข้าไปได้เลย แต่อย่าหวังแบบนั้นในเสาร์อาทิตย์ วันหยุดยาว และช่วงครบรอบ",
  },
  {
    q: "บัตร USJ ราคาเท่าไร?",
    a: "USJ คิดราคาเป็นระดับตามวัน ดังนั้นบัตรใบเดียวกันจะแพงกว่าในวันยอดนิยมและถูกกว่าในวันที่คนน้อย เพราะราคาขยับตามวันและความต้องการ เราจึงไม่ระบุยอดคงที่ — โปรดตรวจสอบราคาจริงของวันคุณตอนจอง Express Pass เป็นรายการซื้อเพิ่มนอกเหนือจาก Studio Pass และยอดต่างกันมากตามวัน",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "บัตร USJ และ Express Pass" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThUsjTicketsPage({ updated }: { updated: PageUpdated }) {
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
            บัตร USJ และ Express Pass USJ<br />(2026): ควรซื้อแบบไหน
          </h1>
          <p className={styles.heroSubtitle}>
            ตอนนี้ขายออนไลน์เท่านั้น Super Nintendo World ต้องใช้บัตรเข้าโซนตามเวลา และปี 2026 ยังมีคน
            ช่วงครบรอบ 25 ปี หน้านี้บอกว่าทริปของคุณควรซื้ออะไรจริง ๆ
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "Studio Pass＋Express Pass", "Super Nintendo World"].map((t) => (
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
                <p className={styles.verdictStatLabel}>ทุกคนต้องมี</p>
                <p className={styles.verdictStatValue}>Studio Pass (ออนไลน์)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เมื่อไรควรเพิ่ม Express Pass</p>
                <p className={styles.verdictStatValue}>เสาร์อาทิตย์・วันหยุดยาว・ช่วงครบรอบ</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Super Nintendo World</p>
                <p className={styles.verdictStatValue}>วันคนเยอะต้องเข้าตามเวลา</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ซื้อหน้างานได้ไหม</p>
                <p className={styles.verdictStatValue}>ไม่ได้ — ตั้งแต่ 2025 ขายออนไลน์เท่านั้น</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ซื้อ Studio Pass ออนไลน์เป็นบัตรเข้าสวน วันที่คนเยอะ — ซึ่งปี 2026
              ถือว่าเยอะเกือบทั้งปี — ให้เพิ่ม Express Pass หนึ่งใบ เพื่อตัดการต่อคิวหลายชั่วโมงและการันตี
              การเข้า Super Nintendo World
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={thUsjStudioPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                บัตร USJ (Studio Pass) →
              </a>
              <a href={thUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Express Pass USJ →
              </a>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>บัตร USJ ปี 2026 ทำงานอย่างไร</h2>
          <p className={styles.bodyText}>
            ก่อนซื้อต้องเข้าใจสองเรื่อง เรื่องแรก <strong>Studio Pass</strong> คือบัตรเข้าสวน ทุกคนต้องมี
            หนึ่งใบ และตั้งแต่พฤษภาคม 2025 คุณซื้อที่ประตูในวันนั้นไม่ได้ ขายออนไลน์เท่านั้น และคิดราคา
            เป็นระดับตามวัน วันยอดนิยมแพงกว่า
          </p>
          <p className={styles.bodyText}>
            เรื่องที่สอง <strong>Express Pass</strong> เป็นรายการซื้อเพิ่มแบบเลือกได้ ให้คุณข้ามคิวปกติของ
            เครื่องเล่นที่กำหนด และเวอร์ชันส่วนใหญ่ยังรวมบัตรเข้า <strong>Super Nintendo World</strong>
            ตามเวลาหนึ่งใบ ตัวมันเองไม่ใช่บัตรเข้าสวน จึงต้องซื้อแยกจาก Studio Pass และเนื่องจากปี 2026
            เป็นช่วงครบรอบ 25 ปีของ USJ ที่คนแน่น มูลค่าของ Express Pass จึงสูงกว่าปีปกติมาก
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ประเภทบัตร</span>
          <h2 className={styles.sectionTitle}>บัตร USJ มีอะไรบ้าง</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ประเภทบัตร", "ได้อะไร", "ราคา"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            USJ คิดราคาเป็นระดับตามวัน — บัตรใบเดียวกันแพงกว่าในวันยอดนิยม เราไม่ระบุยอดคงที่
            โปรดตรวจสอบราคาจริงของวันคุณตอนจอง (ปี 2026 เปลี่ยนแปลงได้ ยืนยันตอนชำระเงิน)
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ระดับของ Express Pass</span>
          <h2 className={styles.sectionTitle}>Express Pass 4 vs 7 vs 8</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Express Pass", "เครื่องเล่นที่ข้ามคิวได้", "Super Nintendo World", "เหมาะกับ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expressRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rides}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            รายการเครื่องเล่นที่รวมจริง และการรวมบัตรเข้า Super Nintendo World ตามเวลาหรือไม่ ขึ้นอยู่กับ
            เวอร์ชันและวัน — โปรดตรวจสอบรายละเอียดของวันคุณก่อนซื้อทุกครั้ง
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ใครควรซื้ออะไร</span>
          <h2 className={styles.sectionTitle}>คุณควรซื้อแบบไหน?</h2>
          <div className={styles.stepsList}>
            {whoFor.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจองและวางแผนวันนั้น</h2>
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

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>ไป USJ จากโอซาก้าและสนามบินคันไซ</h2>
          <p className={styles.bodyText}>
            USJ อยู่ในเขตโคโนฮานะ ทางตะวันตกของโอซาก้า เดินจากสถานี Universal City ของสาย JR Yumesaki
            (สายซากุระจิมะ) ไม่ไกล โดยปกติเปลี่ยนรถที่นิชิคุโจ จากสนามบินคันไซเข้าเมืองใช้รถไฟ Haruka
            หรือสาย Nankai ได้ และเมื่อถึงในเมืองแล้วต่อรถไฟอีกช่วงเดียวก็ถึง
          </p>
          <p className={styles.bodyText}>
            การเดินทางในโอซาก้าและช่วงสนามบินยังไม่มีฉบับภาษาไทย ฉบับภาษาอังกฤษดูได้ที่{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              ไกด์เดินทางจากสนามบินโอซาก้า (ภาษาอังกฤษ)
            </Link>
            {" "}และ{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              ไกด์เดินทางในเมืองโอซาก้า (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/th/guides/attractions/teamlab-tokyo-tickets", title: "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "Osaka Amazing Pass — รวมอะไรและคุ้มหรือไม่ (ภาษาอังกฤษ)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>ต่อคิวให้น้อยลงที่ USJ</h2>
            <p className={styles.ctaBannerDesc}>
              ซื้อ Studio Pass ออนไลน์ (จำเป็นตั้งแต่ปี 2025) แล้วเพิ่ม Express Pass หนึ่งใบ เพื่อเลี่ยงคน
              ช่วงครบรอบ 25 ปี และการันตีการเข้า Super Nintendo World
            </p>
            <a href={thUsjExpressPass.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดูบัตร USJ และ Express Pass →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
