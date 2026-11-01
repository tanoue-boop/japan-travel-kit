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
import { thTeamlabBorderless } from "../../../../lib/klook-links-th";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/th/guides/attractions/teamlab-borderless-tickets";
const TITLE = "ตั๋ว teamLab Borderless 2026: ราคา";
const DESC =
  "ตั๋ว teamLab Borderless 2026: ผู้ใหญ่เริ่มต้น ¥3,400 รอบระบุเวลา ซื้อหน้างานแพงกว่า ¥200";

// All figures come from lib/attraction-prices.ts and the English guide that read
// them off teamlab.art. Nothing was re-checked or added for this edition.
const P = PRICES.teamlabBorderless;
const CHECKED = dateLabel(P.checked, "th");
// "from ¥3,400" -> "เริ่มต้น ¥3,400": same figure, Thai qualifier. See lib/i18n.ts.
const ADULT = priceLabel(P.adult, "th");
const CHILD = priceLabel(P.child, "th");

const priceRows = [
  { ticket: "ผู้ใหญ่ (18 ปีขึ้นไป)", price: ADULT, note: "ราคาแบบยืดหยุ่น — วันและรอบที่คุณเลือกอาจแพงกว่านี้" },
  { ticket: "อายุ 13–17 ปี", price: "¥2,800", note: "ราคาคงที่" },
  { ticket: "อายุ 4–12 ปี", price: CHILD, note: "ราคาคงที่" },
  { ticket: "อายุไม่เกิน 3 ปี", price: "ฟรี", note: "ไม่ต้องมีตั๋ว" },
  { ticket: "ผู้พิการ", price: "เริ่มต้น ¥1,700", note: "ราคาแบบยืดหยุ่น ผู้ติดตามหนึ่งคนได้ราคาเดียวกัน" },
];

const buyingRows = [
  {
    factor: "ราคา",
    official: "ราคาพื้นฐาน ขึ้นลงตามวันและรอบ",
    klook: "ตั๋วใบเดียวกัน แสดงราคาด้วยสกุลเงินของคุณ",
    door: "ผู้ใหญ่ +¥200 เด็ก／ผู้พิการ +¥100",
  },
  {
    factor: "ภาษาตอนชำระเงิน",
    official: "มีเว็บไซต์ภาษาอังกฤษ",
    klook: "หน้าจอภาษาไทย ได้ตั๋วอิเล็กทรอนิกส์ทันที",
    door: "ที่เคาน์เตอร์ของพิพิธภัณฑ์",
  },
  {
    factor: "บัตรเครดิตต่างประเทศ",
    official: "ส่วนใหญ่ได้ แต่ไม่รับประกัน",
    klook: "ออกแบบมาเพื่อบัตรต่างประเทศและการจ่ายผ่านมือถืออยู่แล้ว",
    door: "หน้างานรับบัตรได้",
  },
  {
    factor: "เปลี่ยนวัน",
    official: "ตั๋วที่ซื้อจากเว็บไซต์ทางการเปลี่ยนวันได้ถึงสามครั้ง",
    klook: "ขึ้นกับแพ็กเกจที่เลือก — อ่านก่อนชำระเงิน",
    door: "ไม่เกี่ยว",
  },
  {
    factor: "ความเสี่ยงที่จะซื้อไม่ได้",
    official: "ต่ำ ถ้าจองล่วงหน้า",
    klook: "ต่ำ ถ้าจองล่วงหน้า",
    door: "สูง — รอบยอดนิยมหมดก่อนถึงวันนั้น",
  },
];

const whoFor = [
  {
    title: "เลือกเว็บไซต์ทางการ ถ้า…",
    desc: "คุณอยากได้ราคาพื้นฐานที่ต่ำที่สุดและความยืดหยุ่นเรื่องวันมากที่สุด ตั๋วที่ซื้อจาก teamLab โดยตรงเปลี่ยนวันได้ถึงสามครั้ง ซึ่งมีประโยชน์ถ้าแผนโตเกียวของคุณยังขยับอยู่",
  },
  {
    title: "เลือก Klook ถ้า…",
    desc: "คุณอยากชำระเงินด้วยสกุลเงินของตัวเองบนหน้าจอที่อ่านเข้าใจ จ่ายด้วยบัตรที่ออกนอกญี่ปุ่น และเก็บตั๋วอิเล็กทรอนิกส์ไว้ในแอปเดียวกับการจองอื่น ๆ Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab ตั๋วเป็นใบเดียวกัน เปลี่ยนแค่เคาน์เตอร์",
  },
  {
    title: "อย่าวางแผนซื้อหน้างาน ถ้า…",
    desc: "วันของคุณเป็นวันหยุดสุดสัปดาห์ วันหยุดญี่ปุ่น หรือคุณอยากได้รอบช่วงเย็น ตั๋วหน้างานแพงกว่า ¥200 สำหรับผู้ใหญ่ (เด็กและผู้พิการ ¥100) และมีขายเฉพาะเมื่อยังเหลือที่ ซึ่งในรอบที่คนส่วนใหญ่ต้องการมักไม่เหลือ",
  },
];

const steps = [
  {
    title: "เลือกวันก่อน แล้วดูราคาของวันนั้น",
    desc: "ตั๋วผู้ใหญ่และตั๋วผู้พิการของ Borderless เป็นราคาแบบยืดหยุ่น ยอดที่คุณเห็นขึ้นอยู่กับวันและรอบเวลาเข้าชมที่เลือก เช้าวันธรรมดามักถูกที่สุดและคนน้อยที่สุด",
  },
  {
    title: "เลือกเวลาเข้าชม หรือเลือก Flexible Pass",
    desc: "Entrance Pass แบบมาตรฐานระบุเวลาเข้าชม teamLab ยังขาย Flexible Pass ที่ระบุวันแต่ไม่ระบุเวลาเข้าชม ซึ่งคุ้มกับส่วนต่างถ้าวันของคุณคุมยาก",
  },
  {
    title: "รอบวันหยุดสุดสัปดาห์และรอบเย็นควรจองล่วงหน้า 2–3 สัปดาห์",
    desc: "ผู้เข้าชม Borderless ต่อปีเกินหนึ่งล้านคนไปไกล และรอบยอดนิยมหายไปก่อน ความต่างของการจองล่วงหน้าคือ คุณเลือกรอบ หรือรอบที่เหลือเลือกคุณ",
  },
  {
    title: "เผื่อเวลาราวสองชั่วโมง และถือของให้น้อย",
    desc: "ในพิพิธภัณฑ์ไม่มีเส้นทางกำหนด และผลงานเคลื่อนย้ายระหว่างห้อง คนส่วนใหญ่จึงอยากอยู่ข้างในราวสองชั่วโมง ไปถึงก่อนรอบของคุณเล็กน้อยและถือของให้น้อย เพราะสถานีคามิยะโจและร็อปปงหงิอิตโจเมะเชื่อมใต้ดินถึงกัน จึงไม่ต้องขึ้นไปที่ระดับถนน",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "ตั๋ว teamLab Borderless ปี 2026 ราคาเท่าไร?",
    a: `ตามเว็บไซต์ทางการของ teamLab วันที่ตรวจสอบ ${CHECKED}: Entrance Pass ผู้ใหญ่ (18 ปีขึ้นไป) ${ADULT} อายุ 13–17 ปี ¥2,800 อายุ 4–12 ปี ${CHILD} และอายุไม่เกิน 3 ปีเข้าฟรี ผู้พิการเริ่มต้น ¥1,700 และผู้ติดตามหนึ่งคนได้ราคาเดียวกัน ตั๋วผู้ใหญ่และตั๋วผู้พิการเป็นราคาแบบยืดหยุ่น ยอดจริงขึ้นอยู่กับวันและรอบที่เลือก ควรตรวจสอบราคาของวันตัวเองก่อนชำระเงิน ซื้อหน้างานแพงกว่า ¥200 สำหรับผู้ใหญ่ และ ¥100 สำหรับเด็กและผู้พิการ`,
  },
  {
    q: "teamLab Borderless ต้องระบุรอบเวลาไหม เดินเข้าไปเลยได้หรือไม่?",
    a: "Entrance Pass แบบมาตรฐานระบุทั้งวันและเวลา คุณเลือกรอบเข้าชมตอนจอง teamLab ยังขาย Flexible Pass ที่ระบุวันแต่ไม่ระบุเวลาเข้าชม มีขายหน้างานด้วย แต่ผู้ใหญ่ต้องจ่ายเพิ่ม ¥200 และขายเฉพาะเมื่อยังเหลือที่ ซึ่งในวันหยุดสุดสัปดาห์ วันหยุดยาว และรอบช่วงเย็นมักไม่เหลือ ควรถือว่าการซื้อหน้างานเป็นแผนสำรอง ไม่ใช่แผนหลัก",
  },
  {
    q: "teamLab Borderless เปิดกี่โมง?",
    a: `เวลาเปิดต่างกันไปตามวัน วันที่ตรวจสอบเว็บไซต์ทางการ ${CHECKED} พิพิธภัณฑ์ประกาศเวลา 08:30–21:00 โดยบางวันปิดเร็วกว่า (17 พฤศจิกายน 2026 ปิด 17:00) และบางวันขยายถึง 22:00 รับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด และยังมีวันปิดเป็นวันอังคารแบบไม่สม่ำเสมอ ซึ่งรวมวันที่ 20 ตุลาคม 24 พฤศจิกายน และ 8 ธันวาคม 2026 ควรเปิดปฏิทินทางการด้วยวันของคุณเองก่อนจองรอบทุกครั้ง`,
  },
  {
    q: "teamLab Borderless ใช้เวลานานเท่าไร?",
    a: "เผื่อไว้ราวสองชั่วโมง Borderless ไม่มีแผนที่และไม่มีเส้นทางกำหนด ผลงานกว่า 50 ชิ้นกระจายอยู่ในพื้นที่คล้ายเขาวงกต ผลงานเคลื่อนย้ายข้ามห้องและเปลี่ยนไปทั้งวัน เวลาที่อยู่จึงขึ้นอยู่กับคุณจริง ๆ สองชั่วโมงพอสำหรับเดินดูห้องหลักแบบไม่รีบ ส่วนคนที่ชอบศิลปะและการถ่ายรูปมักอยู่ใกล้สามชั่วโมง",
  },
  {
    q: "teamLab Borderless อยู่ที่ไหน และไปอย่างไร?",
    a: "อยู่ชั้น B1 ของอาคาร Azabudai Hills Garden Plaza B ในย่านโทราโนมง 5 โจเมะ เขตมินาโตะ โตเกียว ข้อมูลการเดินทางทางการระบุว่าเดินสองนาทีจากทางออก 5 ของสถานีคามิยะโจ สายฮิบิยะของโตเกียวเมโทร และหกนาทีจากทางออก 4 ของสถานีร็อปปงหงิอิตโจเมะ สายนัมโบกุ ทั้งสองสถานีเชื่อมกับ Azabudai Hills ด้วยทางเดินใต้ดิน คุณจึงเดินตามป้ายได้ทั้งทางโดยไม่ต้องขึ้นไปที่ระดับถนน ซึ่งช่วยมากตอนฝนตกหรือหน้าร้อน และโปรดทราบว่าที่นี่ไม่ใช่ Borderless เดิมที่โอไดบะ สาขานั้นปิดไปแล้ว จึงควรข้ามคำแนะนำเส้นทางที่พาคุณไปริมอ่าว",
  },
  {
    q: "ควรซื้อตั๋ว teamLab Borderless ที่เว็บไซต์ทางการหรือ Klook?",
    a: "ทั้งสองทางเป็นช่องทางที่ถูกต้อง Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab ซื้อทางไหนก็เป็นตั๋วใบเดียวกัน เว็บไซต์ทางการให้ราคาพื้นฐานและเปลี่ยนวันได้ถึงสามครั้ง ส่วน Klook ให้การชำระเงินด้วยสกุลเงินของคุณเองบนหน้าจอที่อ่านเข้าใจ รับบัตรที่ออกนอกญี่ปุ่นได้ดี และเก็บตั๋วอิเล็กทรอนิกส์ไว้กับการจองอื่น ถ้าความยืดหยุ่นเรื่องวันสำคัญที่สุด ซื้อจากเว็บไซต์ทางการ ถ้าการชำระเงินที่ไม่ติดขัดสำคัญที่สุด ไปทาง Klook",
  },
  {
    q: "ควรจอง teamLab Borderless หรือ teamLab Planets?",
    a: "ทั้งสองเป็นพิพิธภัณฑ์ต่างแห่งในย่านต่างกันของโตเกียว ไม่ใช่สองสาขาของแบรนด์เดียวกัน Borderless ที่อาซาบุไดฮิลส์เป็นเขาวงกตไร้แผนที่ที่ประกอบด้วยผลงานกว่า 50 ชิ้น และคุ้มกับการเดินช้า ๆ ส่วน Planets ที่โทโยสุคือที่ที่ถอดรองเท้าเดินลงน้ำ และเหมาะกับการไปกับเด็กมากกว่า ถ้าไปแห่งเดียว เลือก Borderless สำหรับศิลปะและการถ่ายรูป เลือก Planets สำหรับประสบการณ์ที่ใช้ร่างกายและการไปกับเด็ก",
  },
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "ตั๋ว teamLab Borderless" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTeamLabBorderlessPage({ updated }: { updated: PageUpdated }) {
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
            ตั๋ว teamLab Borderless 2026:<br />ราคา รอบเวลา และช่องทางซื้อ
          </h1>
          <p className={styles.heroSubtitle}>
            teamLab Borderless ที่อาซาบุไดฮิลส์ ตั๋วหนึ่งใบจ่ายเท่าไรจริง ๆ ระบบรอบระบุเวลาทำงานอย่างไร
            และควรซื้อจากเว็บไซต์ทางการหรือผ่าน Klook
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "อธิบายรอบระบุเวลา"].map((t) => (
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
                <p className={styles.verdictStatValue}>ระบุวัน＋รอบเวลา</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เวลาที่ควรเผื่อ</p>
                <p className={styles.verdictStatValue}>ราว 2 ชั่วโมง</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>ที่ตั้ง</p>
                <p className={styles.verdictStatValue}>เขตมินาโตะ・อาซาบุไดฮิลส์</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>สรุป:</strong> ตั๋วผู้ใหญ่ {ADULT} และเป็นราคาแบบยืดหยุ่น ยอดสุดท้ายตัดสินโดยวัน
              และรอบที่คุณเลือก ตั๋วระบุทั้งวันและเวลา ซื้อหน้างานผู้ใหญ่แพงกว่า ¥200 และต้องยังเหลือที่
              เวลาที่พิพิธภัณฑ์ประกาศไว้อยู่ราว 08:30–21:00 โดยรับเข้าครั้งสุดท้ายหนึ่งชั่วโมงก่อนปิด
              เผื่อเวลาไว้ราวสองชั่วโมง และไปจากสถานีคามิยะโจ (สายฮิบิยะ เดิน 2 นาที) หรือ
              ร็อปปงหงิอิตโจเมะ (สายนัมโบกุ เดิน 6 นาที) ซึ่งทั้งสองสถานีมีทางเดินใต้ดิน
              ถ้าอยากได้ราคาพื้นฐานและการเปลี่ยนวันฟรีถึงสามครั้ง ซื้อจากเว็บไซต์ทางการ
              ถ้าอยากได้การชำระเงินที่อ่านเข้าใจ จ่ายด้วยสกุลเงินของตัวเองและบัตรต่างประเทศผ่านได้
              ไปทาง Klook
            </p>
            <KlookLink href={thTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              ดูตั๋ว teamLab Borderless →
            </KlookLink>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              ราคา เวลาเปิด และวันปิดในหน้านี้อ่านจากเว็บไซต์ทางการของ teamLab วันที่ตรวจสอบ {CHECKED}{" "}
              Borderless ใช้ราคาแบบยืดหยุ่นและปฏิทินก็เปลี่ยน ควรยืนยันทั้งสองอย่างด้วยวันของคุณเอง
              ตอนชำระเงิน
            </p>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ราคาตั๋ว teamLab Borderless</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            สิ่งที่ Borderless ขายคือ <strong>Entrance Pass</strong> ที่ระบุเวลาเข้าชม ตั๋วผู้ใหญ่และ
            ตั๋วผู้พิการเป็นราคาแบบยืดหยุ่น ตารางด้านล่างคือราคาพื้นฐานบนเว็บไซต์ทางการ โดยเย็นวันเสาร์
            ที่คนเยอะจะแพงกว่าเช้าวันอังคารที่คนน้อย ส่วนตั๋ววัยรุ่นและเด็กเป็นราคาคงที่
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
            อ่านจากเว็บไซต์ทางการของ teamLab วันที่ตรวจสอบ {CHECKED} ซื้อหน้างานผู้ใหญ่แพงกว่า ¥200
            เด็กและผู้พิการแพงกว่า ¥100 ตั๋วลดราคาต้องแสดงหลักฐาน ให้พกเอกสารรับรองไปด้วย
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ก่อนจอง</span>
          <h2 className={styles.sectionTitle}>เวลาเปิด รอบเข้าชม และวันปิด</h2>
          <p className={styles.bodyText}>
            Borderless เปิดนาน แต่ปฏิทินเปลี่ยนบ่อย และเรื่องนี้ทำให้คนพลาดมากกว่าเรื่องราคา
            ด้านล่างคือเนื้อหาจากเว็บไซต์ทางการ วันที่ตรวจสอบ {CHECKED}
          </p>
          <ul className={styles.bodyList}>
            <li><strong>เวลาเปิด:</strong> ประกาศไว้ 08:30–21:00 บางวันปิดเร็วกว่า (17 พฤศจิกายน 2026 ปิด 17:00) และบางวันขยายถึง 22:00</li>
            <li><strong>รับเข้าครั้งสุดท้าย:</strong> หนึ่งชั่วโมงก่อนปิด — ปิด 21:00 หมายความว่าต้องเข้าก่อน 20:00</li>
            <li><strong>วันปิด:</strong> วันอังคารแบบไม่สม่ำเสมอ รวมวันที่ 20 ตุลาคม 24 พฤศจิกายน และ 8 ธันวาคม 2026</li>
            <li><strong>การเข้าชม:</strong> Entrance Pass ระบุวันและเวลาเข้าชม และยังมี <strong>Flexible Pass</strong> ที่ระบุวันแต่ไม่ระบุเวลา</li>
            <li><strong>เปลี่ยนวัน:</strong> ตั๋วที่ซื้อจาก teamLab โดยตรงเปลี่ยนวันได้ถึงสามครั้ง</li>
          </ul>
          <p className={styles.bodyText}>
            เพราะเวลาเปิดและวันปิดเปลี่ยนทุกเดือน ควรเปิดปฏิทินทางการด้วยวันเดินทางของคุณเองก่อนจองรอบ
            เช้าวันธรรมดาคนน้อยที่สุดและมักถูกที่สุด ส่วนรอบวันหยุดสุดสัปดาห์และรอบเย็นหายไปก่อน
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>คุณซื้ออะไร</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless คืออะไรกันแน่</h2>
          <p className={styles.bodyText}>
            Borderless เป็นพิพิธภัณฑ์ที่ไม่มีแผนที่ ผลงานดิจิทัลกว่า 50 ชิ้นกระจายอยู่ในกลุ่มห้องที่
            เชื่อมถึงกัน และตัวผลงานเองเคลื่อนไหว มันเดินจากพื้นที่หนึ่งไปอีกพื้นที่ ตอบสนองกับคนในห้อง
            และเปลี่ยนไปทั้งวัน ไม่มีเส้นทางแนะนำ ไม่มีจุดที่ใส่หมายเลข คนสองคนที่ซื้อตั๋วใบเดียวกัน
            จึงอาจได้ประสบการณ์ที่ต่างกันจริง
          </p>
          <p className={styles.bodyText}>
            เพราะการออกแบบแบบนี้ ตั๋วใบนี้คุ้มกับการวางแผนล่วงหน้า รีบดูหนึ่งชั่วโมงจะได้เห็นแค่ห้องดัง
            ไม่กี่ห้อง ราวสองชั่วโมงจึงพอให้คุณเดินสะเปะสะปะ ย้อนกลับ และเจอผลงานที่ต้องรอให้ปรากฏ
            นี่ก็เป็นเหตุที่ทำให้ Borderless เป็นฝั่งที่ค่อนไปทางผู้ใหญ่และเหมาะกับการถ่ายรูปมากกว่า
            ในบรรดา teamLab สองแห่งของโตเกียว ถ้าคุณกำลังหาแห่งที่โทโยสุซึ่งถอดรองเท้าเดินลงน้ำ
            ดูได้ที่{" "}
            <Link href="/th/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              ไกด์ตั๋ว teamLab Planets
            </Link>{" "}
            ซึ่งมีการเทียบ Planets กับ Borderless แบบครบอยู่ในนั้นด้วย
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ซื้อที่ไหน</span>
          <h2 className={styles.sectionTitle}>เว็บไซต์ทางการ vs Klook vs หน้างาน</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook เป็นพาร์ตเนอร์ขายตั๋วทางการของ teamLab ดังนั้นไม่ว่าจะผ่านเคาน์เตอร์ไหน สิทธิ์เข้าชม
            ก็เหมือนกัน สิ่งที่ต่างคือขั้นตอนชำระเงิน ความยืดหยุ่น และ — ถ้าคุณปล่อยไว้ถึงวันนั้น — ราคา
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "เว็บไซต์ทางการ", "Klook", "หน้างานวันนั้น"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            ส่วนต่างราคาหน้างานและจำนวนครั้งที่เปลี่ยนวันได้ อ้างตามประกาศบนเว็บไซต์ทางการของ teamLab
            วันที่ {CHECKED} เงื่อนไขการยกเลิกและเปลี่ยนแปลงของแพลตฟอร์มขายตั๋วต่างกันไปตามแพ็กเกจ
            ควรอ่านบนหน้าสั่งซื้อก่อนชำระเงิน
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>แบบไหนเหมาะกับคุณ</span>
          <h2 className={styles.sectionTitle}>ควรซื้อแบบไหน?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ขั้นตอน</span>
          <h2 className={styles.sectionTitle}>วิธีจอง teamLab Borderless</h2>
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
            <KlookLink href={thTeamlabBorderless.url} target="_blank" rel={KLOOK_REL}>
              ดูรอบและราคาของ Borderless บน Klook →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>การเดินทาง</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless อยู่ที่ไหน</h2>
          <p className={styles.bodyText}>
            พิพิธภัณฑ์อยู่ชั้น B1 ของอาคาร Azabudai Hills Garden Plaza B ในย่านโทราโนมง 5 โจเมะ
            เขตมินาโตะ ที่นี่ไม่ใช่ Borderless เดิมที่โอไดบะ สาขานั้นปิดไปแล้ว จึงควรข้ามคำแนะนำ
            เส้นทางที่พาคุณไปริมอ่าว
          </p>
          <ul className={styles.bodyList}>
            <li><strong>สถานีคามิยะโจ</strong> (สายฮิบิยะ โตเกียวเมโทร) — เดิน 2 นาทีจากทางออก 5</li>
            <li><strong>สถานีร็อปปงหงิอิตโจเมะ</strong> (สายนัมโบกุ โตเกียวเมโทร) — เดิน 6 นาทีจากทางออก 4</li>
            <li>ทั้งสองสถานีเชื่อมกับ Azabudai Hills ด้วยทางเดินใต้ดิน เดินตามป้ายได้ทั้งทางโดยไม่ต้องขึ้นไปที่ระดับถนน</li>
          </ul>
        </section>

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/th/guides/attractions/teamlab-tokyo-tickets", title: "ตั๋ว teamLab Planets (2026): ราคา รอบเข้าชม และเทียบกับ Borderless" },
            { href: "/th/guides/attractions/shibuya-sky-tickets", title: "ตั๋ว Shibuya Sky (2026): ราคา รอบเวลาที่ควรไป และวิธีจอง" },
            { href: "/th/guides/attractions/tokyo-skytree-tickets", title: "ตั๋ว Tokyo Skytree (2026): ราคา และเลือกชั้น 350 หรือ 450" },
            { href: "/th/guides/attractions/tokyo-disney-tickets", title: "ตั๋วดิสนีย์แลนด์โตเกียว (2026): บัตรระบุวัน และเลือกแลนด์หรือซี" },
            { href: "/th/guides/esim/best-esim-japan", title: "eSIM ญี่ปุ่น 2026: เทียบแพ็กเกจ และ eSIM ญี่ปุ่นของ Klook" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>ล็อกรอบของ Borderless ไว้ก่อน</h2>
            <p className={styles.ctaBannerDesc}>
              การเข้าชมแบบระบุเวลาหมายความว่ารอบที่คุณอยากไปที่สุด คือรอบที่เต็มก่อน Klook เป็น
              พาร์ตเนอร์ขายตั๋วทางการของ teamLab ชำระเงินด้วยสกุลเงินของคุณเอง และเก็บตั๋วอิเล็กทรอนิกส์
              ไว้ในมือถือได้ทันที
            </p>
            <KlookLink href={thTeamlabBorderless.url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              ดูตั๋ว teamLab Borderless →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
