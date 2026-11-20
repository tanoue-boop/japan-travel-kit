// Thai edition of /guides/attractions/teamlab-tokyo-tickets. Since 6 Nov 2026 (task
// jtk-20261106-A24) this page answers one question: which of Tokyo's two teamLab museums to
// book. Since 20 Nov 2026 (task jtk-20261120-R01) it mirrors the English page's order: a
// numbers-first answer, one comparison table with the verdict in row one, the Klook buttons and
// same-day block under it, short Planets-only / Borderless-only sections that hand over to their
// own guides, and the same five FAQ questions. Official figures re-read on teamlab.art 20 Nov 2026.
import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../../components/BookingEsimCard";
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
import { fujiDayTour, tokyoSightseeingBusTour, tokyoSubwayTicket } from "../../../../lib/klook-links";
import { thTeamlabBorderless, thTeamlabPlanets } from "../../../../lib/klook-links-th";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { teamlabSameDayCards } from "../../../../lib/teamlab-same-day-cards";

// Same-day cards under the comparison table (task-jtk-20261115-P01, moved 20 Nov 2026).
const SAME_DAY = teamlabSameDayCards("tokyo", "th");

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const CHECKED_ISO = "2026-11-20";
const CHECKED = dateLabel(CHECKED_ISO, "th");
const P_ADULT = priceLabel(P.adult, "th");
const B_ADULT = priceLabel(B.adult, "th");
const CHILD = priceLabel(P.child, "th");

const ROUTE = "/th/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "teamLab Planets หรือ Borderless";
const DESC =
  "teamLab Planets หรือ Borderless? ผู้ใหญ่ ¥3,800/¥3,400 ขึ้นไป มีเด็กเลือก Planets";

const PLANETS_URL = thTeamlabPlanets.url;
const BORDERLESS_URL = thTeamlabBorderless.url;

// แถวแรกคือคำตอบ
const compareRows = [
  { factor: "เหมาะกับ", planets: "มากับเด็ก หรืออยากเดินเท้าเปล่าลุยน้ำ", borderless: "ไปครั้งแรกโดยไม่มีเด็ก หรืออยากชมงานศิลปะช้า ๆ โดยใส่รองเท้า" },
  { factor: "ผู้ใหญ่ (18 ปีขึ้นไป)", planets: `${P_ADULT} วันและรอบที่คนเยอะราคาสูงขึ้น`, borderless: `${B_ADULT} วันและรอบที่คนเยอะราคาสูงขึ้น` },
  { factor: "อายุ 13–17 ปี", planets: "¥2,800", borderless: "¥2,800" },
  { factor: "เด็ก (4–12 ปี)", planets: `${CHILD} อายุ 3 ปีลงไปฟรี`, borderless: `${CHILD} อายุ 3 ปีลงไปฟรี` },
  { factor: "ต้องลุยน้ำไหม", planets: "ใช่ เดินเท้าเปล่า น้ำสูงถึงเข่าผู้ใหญ่", borderless: "ไม่ ใส่รองเท้าเดินชม" },
  { factor: "เวลาที่ใช้", planets: "ทางการไม่ได้ระบุ เผื่อไว้ 1.5–2 ชั่วโมง", borderless: "ประมาณ 1.5–2 ชั่วโมง (FAQ ทางการ) ไม่จำกัดเวลาด้านใน" },
  { factor: "ตั๋วขายหมดไหม", planets: "ระบุรอบเวลา และไม่มีขายหน้างาน ต้องจองออนไลน์ล่วงหน้า", borderless: "เว็บไซต์ทางการระบุว่าตั๋วอาจขายหมด เปิดขายราววันที่ 1 ของเดือน ล่วงหน้า 2 เดือน" },
  { factor: "ตั๋วหน้างาน", planets: "ไม่มีขายหน้างาน", borderless: "ซื้อหน้างานได้ถ้ายังมีรอบว่าง แพงกว่า ¥200" },
  { factor: "สถานีใกล้สุด", planets: "Shin-Toyosu (Yurikamome) ทางออก 1A เดิน 3 นาที", borderless: "Kamiyacho (สาย Hibiya) ทางออก 5 เดิน 2 นาที" },
  { factor: "เวลาเปิด", planets: "08:00–22:00 (31 ธ.ค.–2 ม.ค. เปิด 08:00–20:00)", borderless: "08:30–21:00 บางวันต่างออกไป" },
  { factor: "ระยะเวลาจัดแสดง", planets: "ถึงสิ้นปี 2027", borderless: "ถาวร" },
];

const whoFor = [
  {
    title: "เลือก Planets ถ้า…",
    desc: "คุณมากับเด็ก อยากทำกิจกรรมที่ได้เคลื่อนไหวร่างกาย และไม่กังวลว่าเท้าจะเปียก คุณจะได้เดินเท้าเปล่าลุยน้ำที่ลึกถึงระดับเข่าของผู้ใหญ่",
  },
  {
    title: "เลือก Borderless ถ้า…",
    desc: "คุณอยากดูงานศิลปะมากกว่าเดินลุยน้ำ ที่นี่ไม่มีเส้นทางตายตัว ผลงานศิลปะเคลื่อนที่ไปมาระหว่างห้อง และคุณเดินได้ตามจังหวะของตัวเอง",
  },
  {
    title: "ไปทั้งสองแห่ง ถ้า…",
    desc: "คุณมีเวลาว่างครึ่งวันสองช่วง และชอบ teamLab ทั้งสองแห่งอยู่คนละย่านและต้องจองตั๋วระบุเวลาแยกกัน จึงควรเว้นเวลาระหว่างสองแห่งให้เพียงพอ",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "teamLab Planets กับ Borderless แห่งไหนดีกว่า?",
    a: "ไม่มีแห่งไหนดีกว่าในทุกด้าน Planets ต้องเดินเท้าเปล่าลุยน้ำที่สูงถึงเข่าผู้ใหญ่ จึงเหมาะกับคนที่มากับเด็ก ส่วน Borderless ไม่มีแผนที่และเส้นทางตายตัว ใส่รองเท้าเดินชมงานศิลปะได้ตามจังหวะตัวเอง ถ้ามากับเด็กให้เลือก Planets ถ้าไปครั้งแรกโดยไม่มีเด็กให้เลือก Borderless",
  },
  {
    q: "ตั๋ว teamLab ในโตเกียวปี 2026 ราคาเท่าไร?",
    a: `ตั๋วผู้ใหญ่ของ Planets ${P_ADULT} และของ Borderless ${B_ADULT} วันและรอบที่คนเยอะจะแพงขึ้น (ตรวจสอบจาก teamlab.art เมื่อ ${CHECKED}) อายุ 13–17 ปี ¥2,800 อายุ 4–12 ปี ${CHILD} ทั้งสองแห่ง และอายุ 3 ปีลงไปเข้าฟรี ถ้าไปทั้งสองแห่ง ผู้ใหญ่ต้องจ่ายตั้งแต่ ¥7,200`,
  },
  {
    q: "ตั๋ว teamLab ขายหมดไหม?",
    a: "ขายหมดได้ เว็บไซต์ทางการของ Borderless ระบุว่าตั๋วเป็นแบบระบุวันและเวลาและอาจขายหมด จึงแนะนำให้ซื้อทันทีที่กำหนดวันได้ ตั๋วเปิดขายราววันที่ 1 ของเดือน ล่วงหน้า 2 เดือนก่อนวันเข้าชม ส่วน Planets ไม่มีขายตั๋วหน้างานเลย ต้องจองออนไลน์ก่อนไป",
  },
  {
    q: "ไป Planets และ Borderless ในวันเดียวกันได้ไหม?",
    a: "ได้ เพราะตั๋วแต่ละแห่งระบุวันและเวลาแยกกัน แต่ทั้งสองแห่งอยู่คนละย่าน คือโทโยสุและอาซาบุไดฮิลส์ และ teamLab ระบุว่า Borderless ใช้เวลาประมาณ 1.5–2 ชั่วโมง ควรเว้นระหว่างสองรอบอย่างน้อยเท่านั้นบวกเวลาเดินทาง หรือแบ่งไปแห่งละครึ่งวัน",
  },
  {
    q: "ซื้อตั๋ว teamLab ที่ไหนถูกที่สุด?",
    a: "ราคาพื้นฐานกำหนดโดยเว็บไซต์ขายตั๋วทางการ และ teamLab ระบุให้ Klook เป็นช่องทางขายทางการของ Borderless ด้วย สิ่งที่ทำให้ราคาต่างกันมากกว่าคือวันที่ เพราะตั๋วผู้ใหญ่ทั้งสองแห่งแพงขึ้นในวันและรอบที่คนเยอะ ควรเทียบหลายวันก่อนจ่าย และการซื้อหน้างานที่ Borderless แพงกว่าออนไลน์ ¥200",
  },
];

const subwayTour = withKlookLocale(tokyoSubwayTicket, "th", {
  title: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
  desc: "นั่งได้ไม่จำกัดทุกสายของ Tokyo Metro และ Toei Subway รับตั๋วเมื่อเดินทางมาถึงได้โดยไม่ต้องต่อคิวซื้อ",
});
const tripTours = [
  withKlookLocale(tokyoSightseeingBusTour, "th", {
    title: "ทัวร์รถบัสชมเมืองโตเกียว 1 วัน",
    desc: "ทัวร์พร้อมไกด์พาชมสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมระบบบรรยายเสียงหลายภาษา",
  }),
  withKlookLocale(fujiDayTour, "th", {
    title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว",
    desc: "นั่งรถบัสเที่ยวเต็มวันไปยังสถานีที่ 5 ของภูเขาไฟฟูจิ ทะเลสาบคาวากุจิ และโอชิโนะฮักไก กลับถึงโตเกียวในช่วงเย็นของวันเดียวกัน",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "teamLab Planets หรือ Borderless" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function ThTeamLabTokyoPage({ updated }: { updated: PageUpdated }) {
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
            teamLab Planets หรือ Borderless (2026): <br />ราคาตั๋ว และควรจองแห่งไหน
          </h1>
          <p className={styles.heroSubtitle}>
            โตเกียวมีพิพิธภัณฑ์ teamLab สองแห่ง โดยแต่ละแห่งต้องซื้อตั๋วแยกกัน มาดูความแตกต่างของทั้งสองแห่งและแห่งที่ควรจอง
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "เปรียบเทียบทุกด้าน"].map((t) => (
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
            <span className={styles.verdictLabel}>คำตอบสั้น ๆ</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>ตั๋ว teamLab ในโตเกียว</strong>ขายแยกสองแห่ง ผู้ใหญ่ที่ <strong>teamLab Planets (โทโยสุ) {P_ADULT}</strong> และที่{" "}
              <strong>teamLab Borderless (อาซาบุไดฮิลส์) {B_ADULT}</strong> เด็กอายุ 4–12 ปี {CHILD} ทั้งสองแห่ง (ตรวจสอบจากเว็บไซต์ทางการเมื่อ{" "}
              {CHECKED}) teamLab ระบุว่า Borderless ใช้เวลาประมาณ 1.5–2 ชั่วโมง ส่วน Planets ไม่ได้ระบุ จึงเผื่อไว้ 1.5–2
              ชั่วโมงเช่นกัน ถ้ามากับเด็ก <strong>จอง Planets</strong> ที่เดินเท้าเปล่าลุยน้ำสูงถึงเข่า ถ้าไปครั้งแรกโดยไม่มีเด็ก{" "}
              <strong>จอง Borderless</strong> ที่ใส่รองเท้าเดินชมและซื้อตั๋วหน้างานได้ถ้ายังมีรอบว่าง
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว Planets →
              </KlookLink>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว Borderless →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เปรียบเทียบแบบเคียงข้างกัน</span>
          <h2 className={styles.sectionTitle}>teamLab Planets หรือ Borderless: ควรจองแห่งไหน?</h2>
          <p className={styles.bodyText}>มากับเด็กเลือก Planets ผู้ใหญ่ที่ไปครั้งแรกเลือก Borderless เหตุผลแต่ละข้ออยู่ในตารางด้านล่าง</p>
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
            ตรวจสอบล่าสุด: {CHECKED_ISO} แหล่งข้อมูล:{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>,{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>{" "}
            และ FAQ ของ Borderless{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>{" "}
            ตั๋วผู้ใหญ่ของทั้งสองแห่งเปลี่ยนราคาตามวันและเวลา และประกาศเฉพาะราคาต่ำสุด จึงควรตรวจสอบราคาของวันที่คุณจะไป
            เวลาที่ใช้ใน Planets เป็นตัวเลขสำหรับวางแผน teamLab ไม่ได้ประกาศไว้
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดูตั๋ว Planets ของวันที่คุณจะไป →
            </KlookLink>
            <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              ดูตั๋ว Borderless ของวันที่คุณจะไป →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        <KlookTourPicks
          heading="เดินทางระหว่างโทโยสุกับอาซาบุไดฮิลส์"
          intro="สถานี Kamiyacho ของ Borderless อยู่บนสาย Hibiya ของ Tokyo Metro และ Tokyo Subway Ticket นั่งได้ทุกสายของ Tokyo Metro และ Toei ภายใน 24, 48 หรือ 72 ชั่วโมง ส่วนสถานี Shin-Toyosu ของ Planets เป็นสาย Yurikamome ซึ่งตั๋วนี้ใช้ไม่ได้ ให้ใช้สถานี Toyosu ของสาย Yurakucho แทน"
          tours={[subwayTour]}
        />

        <BookingEsimCard />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ไป Planets อย่างเดียว</span>
          <h2 className={styles.sectionTitle}>ตัดสินใจไป teamLab Planets แล้วใช่ไหม?</h2>
          <p className={styles.bodyText}>
            teamLab Planets ที่โทโยสุขายเฉพาะตั๋วระบุรอบเวลา ผู้ใหญ่ {P_ADULT} และไม่มีขายหน้างาน การจองจึงคือการเลือกวันและเวลาเข้าชมทางออนไลน์
            ราคาตามวัน Premium Pass การแต่งกายสำหรับโซนน้ำ และเส้นทางจากสถานี Shin-Toyosu หรือ Toyosu อยู่ในไกด์ตั๋ว Planets
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/th/guides/attractions/teamlab-planets-tickets" className={styles.verdictBtn}>
              อ่านไกด์ตั๋ว teamLab Planets ฉบับเต็ม →
            </Link>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ไป Borderless อย่างเดียว</span>
          <h2 className={styles.sectionTitle}>ตัดสินใจไป teamLab Borderless แล้วใช่ไหม?</h2>
          <p className={styles.bodyText}>
            teamLab Borderless ที่อาซาบุไดฮิลส์ขายตั๋วระบุรอบเวลา ผู้ใหญ่ {B_ADULT} และ Flexible Pass ที่ไม่ระบุเวลาเข้า
            ตั๋วเปิดขายราววันที่ 1 ของเดือน ล่วงหน้า 2 เดือน วันเปิดขาย Flexible Pass เวลาปิดที่เปลี่ยนไป และการซื้อหน้างาน
            อยู่ในไกด์ตั๋ว Borderless
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <Link href="/th/guides/attractions/teamlab-borderless-tickets" className={styles.verdictBtn}>
              อ่านไกด์ตั๋ว teamLab Borderless ฉบับเต็ม →
            </Link>
          </div>
        </section>

        <EsimCtaTop />

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

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="จองไว้สำหรับทริปเดียวกัน"
          intro="ไม่ว่าจะเลือกแห่งไหน การเข้าชมก็ใช้เวลาเพียงส่วนหนึ่งของวันเที่ยวโตเกียว ตัวเลือกเหล่านี้มีทั้งทัวร์ชมเมืองพร้อมไกด์ และทัวร์ 1 วันนอกเมือง ราคาของ Klook เปลี่ยนตามวันที่ จึงควรเปิดหน้าสินค้าเพื่อดูราคาในวันของคุณ"
          tours={tripTours}
        />

        <Related
          items={[
            { href: "/th/guides/attractions/teamlab-planets-tickets", title: "ตั๋ว teamLab Planets (2026): ราคา เวลาเปิด และวิธีจอง" },
            { href: "/th/guides/attractions/teamlab-borderless-tickets", title: "ตั๋ว teamLab Borderless (2026): ราคา รอบเวลา และช่องทางซื้อ" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "ตั๋ว teamLab Kyoto: ราคา เวลาเปิด และการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "ตั๋ว teamLab Fukuoka 2026: ราคา เวลาเปิด และการจอง (ภาษาอังกฤษ)" },
            { href: "/guides/transport/tokyo-transportation", title: "เดินทางในโตเกียว (2026): รถไฟ รถไฟใต้ดิน และบัตร IC (ภาษาอังกฤษ)" },
          ]}
        />
      </div>
    </>
  );
}
