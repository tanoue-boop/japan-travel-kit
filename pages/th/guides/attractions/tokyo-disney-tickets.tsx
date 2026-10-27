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
import { thFujiDayTour, thTokyoDisney, thTokyoSightseeingBusTour } from "../../../../lib/klook-links-th";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, monthLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/attractions/tokyo-disney-tickets";
const TITLE = "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี";
const DESC =
  "ตั๋วดิสนีย์แลนด์โตเกียว 2026: ทุกบัตรระบุวันเข้าชม และไม่มีการขายหน้างานเลย วิธีซื้อเมื่อบัตรเครดิต " +
  "ต่างประเทศใช้ไม่ผ่าน และควรเลือกโตเกียวดิสนีย์แลนด์หรือดิสนีย์ซี เนื้อหาใช้ข้อเท็จจริงชุดเดียวกับฉบับภาษาอังกฤษ";

// Facts and figures are the English guide's, unchanged. Tokyo Disney publishes no
// fixed yen price — the passport is variable, date-based — so this page quotes the
// same indicative "from about $55" the English page does and nothing more.
const ticketRows = [
  {
    ticket: "1-Day Passport (ขายอยู่ตอนนี้)",
    what: "ระบุวัน เข้าได้หนึ่งสวน (แลนด์ หรือ ซี)",
    price: "ประมาณ $55 ขึ้นไป เปลี่ยนตามวัน — ตรวจสอบตอนจอง",
  },
  {
    ticket: "บัตรหลายวันและพาสปอร์ตแบบอื่น",
    what: "ตอนที่เขียนยังไม่ได้เปิดขายทั่วไป — สถานะการขายเปลี่ยนได้",
    price: "เช็กสถานะล่าสุดตอนจอง",
  },
  {
    ticket: "บัตรหน้างาน・ที่ประตู",
    what: "ไม่มีขาย — ทุกบัตรระบุวันและต้องซื้อล่วงหน้า",
    price: "ไม่มีตัวเลือกนี้",
  },
];

const parkRows = [
  {
    park: "โตเกียวดิสนีย์แลนด์",
    style: "สวนปราสาทแบบคลาสสิก: ขบวนพาเหรด พลุ เครื่องเล่นสำหรับทุกวัย",
    suits: "มาครั้งแรก มากับเด็กเล็ก แฟนดิสนีย์สายคลาสสิก",
    note: "ถ้าเคยไปดิสนีย์ที่อื่น จะคุ้นเส้นทางอยู่แล้ว",
  },
  {
    park: "โตเกียวดิสนีย์ซี",
    style: "ธีมการเดินเรือและน้ำ มีที่โตเกียวแห่งเดียวในโลก โทนผู้ใหญ่กว่า และขายเครื่องดื่มแอลกอฮอล์ในสวน",
    suits: "ผู้ใหญ่ คู่รัก คนที่กลับมาอีกครั้งและอยากได้อะไรที่ต่าง",
    note: "กำลังฉลองครบรอบ 25 ปี (เมษายน 2026 – มีนาคม 2027)",
  },
];

const whoFor = [
  {
    title: "ถ้าเลือกโตเกียวดิสนีย์แลนด์",
    desc: "คุณมากับเด็กเล็ก หรือนี่เป็นดิสนีย์แห่งแรกในชีวิตของคุณ สวนนี้ยังใช้ผังปราสาทแบบคลาสสิก มีขบวนพาเหรดช่วงกลางวัน และน้ำหนักอยู่ที่เครื่องเล่นสำหรับทุกวัย เป็นวันที่สบายและคุ้นเคย",
  },
  {
    title: "ถ้าเลือกโตเกียวดิสนีย์ซี",
    desc: "คุณอยากได้สิ่งที่หาไม่ได้ในดิสนีย์รีสอร์ตอื่น และคุณเป็นผู้ใหญ่หรือไม่ได้มากับเด็กเล็ก ดิสนีย์ซีมีโทนผู้ใหญ่กว่า ท่าเรือตามธีมมีเฉพาะที่โตเกียว และต่างจากแลนด์คือขายเครื่องดื่มแอลกอฮอล์ในสวน",
  },
  {
    title: "ไปปี 2026? ระวังช่วงครบรอบ",
    desc: "โตเกียวดิสนีย์ซีกำลังฉลองครบรอบ 25 ปี ช่วงเมษายน 2026 ถึงมีนาคม 2027 ช่วงครบรอบมักคนเยอะกว่าและวันยอดนิยมเต็มเร็วกว่า บัตรระบุวันจึงควรจองให้เร็วที่สุด",
  },
];

const steps = [
  {
    title: "เลือกสวนและวันที่ให้ชัดก่อน",
    desc: "ทุกบัตรของโตเกียวดิสนีย์ระบุวัน คุณต้องเลือกวันที่จะไปและสวนที่จะเข้า และบัตรนั้นใช้ได้เฉพาะวันนั้น ตัดสินใจว่าแลนด์หรือซีก่อนซื้อ เพราะ 1-Day Passport รวมแค่หนึ่งสวน ไม่ใช่สองสวน",
  },
  {
    title: "จองล่วงหน้า เพราะหน้างานไม่มีขาย",
    desc: "เนื่องจากที่ประตูไม่ขายบัตร และทุกบัตรผูกกับวันที่เฉพาะ วันยอดนิยมอาจเต็มล่วงหน้าหลายสัปดาห์ถึงหลายเดือน ให้ถือว่าการจองเป็นงานที่ต้องทำก่อนออกเดินทาง",
  },
  {
    title: "ถ้าบัตรเครดิตต่างประเทศมีปัญหา ใช้ Klook",
    desc: "เว็บไซต์ทางการของโตเกียวดิสนีย์รีสอร์ทปฏิเสธหรือบล็อกบัตรเครดิตที่ออกนอกญี่ปุ่นบ่อยครั้ง Klook เป็นช่องทางขายตั๋วที่ได้รับอนุญาตอย่างเป็นทางการ ใช้บัตรต่างประเทศได้และหน้าจอเป็นภาษาไทย นี่คือเหตุผลที่นักท่องเที่ยวต่างชาติหลายคนเลือกช่องทางนี้",
  },
  {
    title: "ผูก QR code ของตั๋วเข้าแอปทางการ",
    desc: "หลังซื้อคุณจะได้ QR code ของตั๋วอิเล็กทรอนิกส์ คุณผูก QR นั้นเข้ากับแอปทางการของโตเกียวดิสนีย์รีสอร์ทได้ และฟังก์ชันในสวนของวันนั้นก็ใช้ในแอปนี้ ตั้งค่าก่อนออกเดินทางจะช่วยประหยัดเวลาตอนเข้าสวน",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋วโตเกียวดิสนีย์ต้องซื้อล่วงหน้าไหม?",
    a: "ต้อง โตเกียวดิสนีย์รีสอร์ทไม่ขายบัตรที่ประตู ทุกบัตรระบุวัน หมายความว่าคุณต้องเลือกวันและสวนตอนที่ซื้อ วันยอดนิยมอาจเต็มล่วงหน้าหลายสัปดาห์ถึงหลายเดือน การจองล่วงหน้าจึงเป็นสิ่งจำเป็น ไม่ใช่ตัวเลือก",
  },
  {
    q: "ใช้บัตรเครดิตที่ออกนอกญี่ปุ่นซื้อตั๋วโตเกียวดิสนีย์ได้ไหม?",
    a: "บนเว็บไซต์ทางการของโตเกียวดิสนีย์รีสอร์ทมักใช้ไม่ได้ เพราะเว็บไซต์ทางการปฏิเสธหรือบล็อกบัตรที่ออกนอกญี่ปุ่นบ่อยครั้ง และเป็นปัญหาที่นักท่องเที่ยวต่างชาติเจอกันทั่วไป วิธีที่คนใช้กันคือจองผ่าน Klook ซึ่งเป็นช่องทางขายตั๋วที่ได้รับอนุญาตอย่างเป็นทางการ รับบัตรต่างประเทศ หน้าจอเป็นภาษาไทย และส่ง QR code ของตั๋วอิเล็กทรอนิกส์ที่ผูกเข้าแอปทางการของโตเกียวดิสนีย์รีสอร์ทได้",
  },
  {
    q: "ควรเลือกโตเกียวดิสนีย์แลนด์หรือดิสนีย์ซี?",
    a: "1-Day Passport รวมแค่หนึ่งสวน ดังนั้นปกติต้องเลือกข้างใดข้างหนึ่ง โตเกียวดิสนีย์แลนด์คือสวนปราสาทแบบคลาสสิก มีพาเหรดและเครื่องเล่นสำหรับทุกวัย เหมาะกับคนมาครั้งแรกและครอบครัวที่มีเด็กเล็ก โตเกียวดิสนีย์ซีเป็นธีมการเดินเรือ มีที่โตเกียวแห่งเดียวในโลก โทนผู้ใหญ่กว่า และขายเครื่องดื่มแอลกอฮอล์ในสวน และกำลังฉลองครบรอบ 25 ปีช่วงเมษายน 2026 ถึงมีนาคม 2027 ถ้าพาเด็กไปครั้งแรก แลนด์คือตัวเลือกที่ปลอดภัย ถ้าอยากได้อะไรที่ไม่เหมือนใคร เลือกซี",
  },
  {
    q: "ตอนนี้มีบัตรแบบไหนขายอยู่?",
    a: "ตอนที่เขียน บัตรที่เปิดขายทั่วไปมักเป็น 1-Day Passport ซึ่งใช้ราคาที่เปลี่ยนตามวัน คร่าว ๆ คือประมาณ $55 ขึ้นไป แต่ยอดจะขยับตามวันและความต้องการ จึงควรตรวจสอบราคาจริงของวันคุณตอนจอง ส่วนพาสปอร์ตแบบอื่นจะเปิดขายหรือไม่ขึ้นอยู่กับช่วงเวลา ให้เช็กสถานะล่าสุด",
  },
  {
    q: "1-Day Passport ของโตเกียวดิสนีย์ราคาเท่าไร?",
    a: "ราคาเปลี่ยนตามวัน ดังนั้นพาสปอร์ตใบเดียวกันจะแพงกว่าในวันยอดนิยมและถูกกว่าในวันที่คนน้อย คร่าว ๆ คือประมาณ $55 ขึ้นไป แต่ขอให้ถือเป็นค่า 'เริ่มต้น' สำหรับอ้างอิงเท่านั้น ราคาปี 2026 อาจปรับได้ โปรดตรวจสอบยอดจริงของวันที่คุณเลือกตอนจอง",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋วดิสนีย์แลนด์โตเกียว" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
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
            ตั๋วดิสนีย์แลนด์โตเกียว (2026):<br />บัตรระบุวัน และเลือกแลนด์หรือซี
          </h1>
          <p className={styles.heroSubtitle}>
            ทุกบัตรระบุวันเข้าชม ไม่มีการขายหน้างานเลย และเว็บไซต์ทางการยังปฏิเสธบัตรเครดิตต่างประเทศบ่อย
            หน้านี้อธิบายวิธีซื้อ และวิธีเลือกระหว่างสองสวน
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "บัตรระบุวัน", "บัตรต่างประเทศใช้ Klook"].map((t) => (
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
                <p className={styles.verdictStatLabel}>ขายอยู่ตอนนี้</p>
                <p className={styles.verdictStatValue}>1-Day Passport</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ราคา (อ้างอิง)</p>
                <p className={styles.verdictStatValue}>ประมาณ $55 ขึ้นไป เปลี่ยนตามวัน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>บัตรหน้างาน</p>
                <p className={styles.verdictStatValue}>ไม่มี — มีแต่บัตรระบุวัน</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>บัตรต่างประเทศ?</p>
                <p className={styles.verdictStatValue}>ใช้ Klook (ช่องทางที่ได้รับอนุญาต)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> เลือกสวนและวันก่อน แล้วจอง 1-Day Passport ล่วงหน้า เพราะหน้างานไม่มีขาย
              และวันยอดนิยมจะเต็ม ถ้าเว็บไซต์ทางการปฏิเสธบัตรเครดิตต่างประเทศของคุณ Klook เป็นช่องทางขายตั๋ว
              ที่ได้รับอนุญาตอย่างเป็นทางการ รับบัตรต่างประเทศ และส่ง QR code ที่ผูกเข้าแอปทางการได้
            </p>
            <KlookLink href={thTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดูตั๋วโตเกียวดิสนีย์ →
            </KlookLink>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ภาพรวม</span>
          <h2 className={styles.sectionTitle}>ตั๋วโตเกียวดิสนีย์ปี 2026 ทำงานอย่างไร</h2>
          <p className={styles.bodyText}>
            โตเกียวดิสนีย์รีสอร์ทตั้งอยู่ที่เมืองอุรายาสุ ทางตะวันออกของโตเกียว ประกอบด้วยสองสวนที่แยกจากกัน:
            <strong>โตเกียวดิสนีย์แลนด์</strong> และ <strong>โตเกียวดิสนีย์ซี</strong> สิ่งสำคัญที่สุดก่อนซื้อ
            บัตรคือ บัตร<strong>ระบุวันเข้าชม</strong> — คุณเลือกวันที่แน่นอนและสวนที่จะเข้า และบัตรนั้นใช้ได้
            เฉพาะวันนั้น
          </p>
          <p className={styles.bodyText}>
            และ<strong>ที่ประตูไม่มีขายบัตรเลย</strong> หมายความว่าคุณไปซื้อหน้างานในวันนั้นไม่ได้ และเพราะ
            ทุกบัตรผูกกับวันที่ วันยอดนิยมจึงอาจเต็มล่วงหน้าหลายสัปดาห์ถึงหลายเดือน ปัจจุบันบัตรที่เปิดขาย
            ทั่วไปมักเป็น 1-Day Passport ซึ่งใช้ราคาที่เปลี่ยนตามวัน ดังนั้นพาสปอร์ตใบเดียวกันจะแพงกว่าในวัน
            ยอดนิยม
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ประเภทบัตร</span>
          <h2 className={styles.sectionTitle}>บัตรโตเกียวดิสนีย์มีอะไรบ้าง</h2>
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
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ราคาเปลี่ยนแปลงและขึ้นอยู่กับวัน (ปี 2026 อาจปรับได้ — ตรวจสอบตอนจอง) ค่า ‘ประมาณ $55 ขึ้นไป’
            ของ 1-Day Passport เป็นเพียงค่าอ้างอิง โปรดดูราคาจริงของวันและสวนที่คุณเลือกตอนชำระเงิน
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>แลนด์ vs ซี</span>
          <h2 className={styles.sectionTitle}>ควรเลือกสวนไหน?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["สวน", "บุคลิกโดยรวม", "เหมาะกับ", "หมายเหตุ"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            1-Day Passport รวมแค่หนึ่งสวน ดังนั้นคนส่วนใหญ่จะเลือกข้างใดข้างหนึ่ง ข้อมูลข้างต้นเป็นภาพรวม
            เพื่อช่วยตัดสินใจ ทั้งสองสวนกว้างมากและเป็นกิจกรรมเต็มวันทั้งคู่
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>เหมาะกับใคร</span>
          <h2 className={styles.sectionTitle}>สวนไหนเหมาะกับคุณ?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            เลือกสวนไหนก็ควรวางแผนเส้นทางก่อน เพราะรีสอร์ทอยู่ห่างจากใจกลางโตเกียวหนึ่งช่วงรถไฟ ส่วนการ
            เดินทางจากสนามบินในวันที่มาถึง ดูได้ที่{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              ไกด์เดินทางจากนาริตะ・ฮาเนดะเข้าเมืองโตเกียว (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีซื้อตั๋วโตเกียวดิสนีย์</h2>
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
          <span className={styles.sectionLabel}>บัตรเครดิตต่างประเทศ</span>
          <h2 className={styles.sectionTitle}>ทำไมนักท่องเที่ยวหลายคนย้ายไปใช้ Klook</h2>
          <p className={styles.bodyText}>
            เว็บไซต์ทางการของโตเกียวดิสนีย์รีสอร์ทเป็นช่องทางซื้อหลัก แต่ปฏิเสธหรือบล็อกบัตรเครดิตที่ออกนอก
            ญี่ปุ่นบ่อยครั้ง ซึ่งเป็นปัญหาเก่าแก่ของนักท่องเที่ยวต่างชาติ ในกรณีนี้มีทางเลือกที่ตรงไปตรงมา
          </p>
          <p className={styles.bodyText}>
            <strong>Klook เป็นช่องทางขายตั๋วที่โตเกียวดิสนีย์รีสอร์ทอนุญาตอย่างเป็นทางการ</strong>
            รับบัตรต่างประเทศ หน้าจอเป็นภาษาไทย และส่ง QR code ของตั๋วอิเล็กทรอนิกส์ที่ผูกเข้าแอปทางการของ
            โตเกียวดิสนีย์รีสอร์ทได้ การรวมกันของสองอย่างนี้ — รับบัตรต่างประเทศ และ QR ที่ผูกเข้าแอปได้ —
            คือเหตุผลที่กลายเป็นวิธีหลักของนักท่องเที่ยวต่างชาติ ถ้าคุณกำลังจัดกิจกรรมอื่นในโตเกียวด้วย{" "}
            <Link href="/th/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              ไกด์ตั๋ว Shibuya Sky
            </Link>
            {" "}ของเราก็เป็นอีกการจองที่ผ่านแพลตฟอร์มแล้วราบรื่นกว่า
          </p>
        </section>

        <FaqList items={faqItems} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ทัวร์หนึ่งวันในเมืองเดียวกัน</span>
          <h2 className={styles.sectionTitle}>วันที่ไม่เข้าสวนจะทำอะไร</h2>
          <p className={styles.bodyText}>
            การเข้าสวนกินเวลาทั้งวัน ดังนั้นคนส่วนใหญ่จึงใส่ดิสนีย์ลงในสัปดาห์โตเกียว ไม่ใช่ใส่สัปดาห์โตเกียว
            ลงในดิสนีย์ สองแผนด้านล่างเติมวันที่ไม่เข้าสวนได้ และจ่ายในบัญชี Klook เดียวกับตั๋ว
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <KlookLink href={thFujiDayTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู{thFujiDayTour.label} →
            </KlookLink>
            <KlookLink href={thTokyoSightseeingBusTour.url} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดู{thTokyoSightseeingBusTour.label} →
            </KlookLink>
          </div>
        </section>

        <Related
          items={[
            { href: "/th/guides/attractions/usj-tickets-express-pass", title: "บัตร USJ และ Express Pass USJ (2026): ควรซื้อแบบไหน" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/th/guides/attractions/teamlab-tokyo-tickets", title: "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "เที่ยวโตเกียว — อะไรต้องจองล่วงหน้า อะไรเดินเข้าได้เลย (ภาษาอังกฤษ)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>ล็อกวันโตเกียวดิสนีย์ไว้ก่อน</h2>
            <p className={styles.ctaBannerDesc}>
              หน้างานไม่มีขาย และวันยอดนิยมจะเต็ม จึงควรจองล่วงหน้า Klook เป็นช่องทางขายตั๋วที่ได้รับอนุญาต
              อย่างเป็นทางการ รับบัตรเครดิตต่างประเทศ และส่ง QR code ที่ผูกเข้าแอปทางการได้
            </p>
            <KlookLink href={thTokyoDisney.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดูตั๋วโตเกียวดิสนีย์ →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
