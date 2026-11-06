// Thai edition of /guides/attractions/teamlab-tokyo-tickets. Since 6 Nov 2026 (task
// jtk-20261106-A24) this page answers one question: which of Tokyo's two teamLab museums to
// book. Planets tickets, hours and access live on /th/guides/attractions/teamlab-planets-tickets.
// Prices come from lib/attraction-prices.ts; the rest comes from the English page's own text.
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
import { fujiDayTour, tokyoSightseeingBusTour, tokyoSubwayTicket } from "../../../../lib/klook-links";
import { thTeamlabBorderless, thTeamlabPlanets } from "../../../../lib/klook-links-th";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const PLANETS_CHECKED = dateLabel(P.checked, "th");
const BORDERLESS_CHECKED = dateLabel(B.checked, "th");
const P_ADULT = priceLabel(P.adult, "th");
const B_ADULT = priceLabel(B.adult, "th");
const P_CHILD = priceLabel(P.child, "th");
const B_CHILD = priceLabel(B.child, "th");

const ROUTE = "/th/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "teamLab Planets หรือ Borderless";
const DESC =
  "teamLab Planets หรือ Borderless โตเกียวมีสองแห่ง ตั๋วแยกกัน เทียบราคา เวลาเปิด";

const PLANETS_URL = thTeamlabPlanets.url;
const BORDERLESS_URL = thTeamlabBorderless.url;

const compareRows = [
  { factor: "ที่ตั้ง", planets: "โทโยสุ (เขตโคโต)", borderless: "อาซาบุไดฮิลส์ (เขตมินาโตะ)" },
  { factor: "เป็นแบบไหน", planets: "เดินเท้าเปล่า ลุยน้ำ", borderless: "ผลงานกว่า 50 ชิ้นในเขาวงกตไร้แผนที่" },
  { factor: "เหมาะกับ", planets: "ครอบครัว คนที่ไปครั้งแรก คนที่อยากใช้ร่างกาย", borderless: "คนรักศิลปะ คนที่อยากเดินช้า ๆ คนชอบถ่ายรูป" },
  { factor: "ตั๋วผู้ใหญ่", planets: P_ADULT, borderless: B_ADULT },
  { factor: "ตั๋วเด็ก", planets: `${P_CHILD} (อายุ 4–12 ปี ต่ำกว่า 4 ปีฟรี)`, borderless: `${B_CHILD} (อายุ 4–12 ปี ต่ำกว่า 4 ปีฟรี)` },
  { factor: "เวลาเปิด", planets: "08:00–22:00 (31 ธ.ค.–2 ม.ค. เปิด 08:00–20:00)", borderless: "ประกาศไว้ 08:30–21:00 เปลี่ยนตามวัน" },
  { factor: "การเข้าชม", planets: "ระบุวันและเวลาเข้าชม", borderless: "รอบระบุเวลา หรือ Flexible Pass ที่ไม่ระบุเวลา" },
  { factor: "ตั๋วหน้างาน", planets: "ไม่มีขายหน้างาน", borderless: "ซื้อหน้างานแพงกว่า ¥200" },
  { factor: "ระยะเวลาจัดแสดง", planets: "ถึงสิ้นปี 2027", borderless: "ถาวร" },
];

const whoFor = [
  {
    title: "เลือก Planets ถ้า…",
    desc: "คุณมากับเด็ก อยากได้ประสบการณ์ที่ใช้ร่างกาย และไม่ติดที่เท้าจะเปียก คุณจะเดินเท้าเปล่าลุยน้ำที่สูงถึงระดับเข่าผู้ใหญ่",
  },
  {
    title: "เลือก Borderless ถ้า…",
    desc: "คุณอยากดูงานศิลปะมากกว่าเดินลุยน้ำ ที่นี่ไม่มีเส้นทางตายตัว ผลงานเคลื่อนย้ายระหว่างห้อง และคุณเดินได้ตามจังหวะของตัวเอง",
  },
  {
    title: "ไปทั้งสองแห่ง ถ้า…",
    desc: "คุณมีเวลาว่างสองครึ่งวันและชอบ teamLab ทั้งสองแห่งอยู่คนละย่านและต้องจองตั๋วระบุเวลาแยกกัน จึงควรเว้นระยะให้ห่าง",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "teamLab ในโตเกียว Planets หรือ Borderless แห่งไหนดีกว่า?",
    a: "ไม่มีแห่งไหนดีกว่าในทุกด้าน Planets เหมาะกับครอบครัวและคนที่ไปครั้งแรกซึ่งอยากได้ประสบการณ์ที่ใช้ร่างกาย คุณจะเดินเท้าเปล่าลุยน้ำ ส่วน Borderless เหมาะกับคนรักศิลปะที่อยากเดินสำรวจช้า ๆ ไม่มีแผนที่และไม่มีเส้นทางตายตัว ถ้ามีเวลาแห่งเดียวและมากับเด็ก ให้เลือก Planets",
  },
  {
    q: "teamLab Planets กับ teamLab Borderless ใช้ตั๋วเดียวกันไหม?",
    a: "ไม่ใช่ ทั้งสองเป็นพิพิธภัณฑ์แยกกัน ตั๋วแยกกัน และอยู่คนละย่านของโตเกียว ตั๋ว Planets เข้า Borderless ไม่ได้ และตั๋ว Borderless ก็เข้า Planets ไม่ได้",
  },
  {
    q: "ตั๋ว teamLab ในโตเกียวราคาเท่าไร?",
    a: `ตั๋วผู้ใหญ่ของ Planets ${P_ADULT} ตรวจสอบเมื่อ ${PLANETS_CHECKED} ตั๋วผู้ใหญ่ของ Borderless ${B_ADULT} ตรวจสอบเมื่อ ${BORDERLESS_CHECKED} ทั้งสองแห่งตั้งราคาตามวันและเวลา จึงควรเช็กราคาของวันที่คุณจะไป`,
  },
  {
    q: "ไป Planets และ Borderless ในวันเดียวกันได้ไหม?",
    a: "ได้ เพราะตั๋วแต่ละใบระบุวันและเวลาของตัวเอง แต่ทั้งสองแห่งอยู่คนละย่านของเมือง และแต่ละแห่งใช้เวลานาน การแยกไปคนละครึ่งวันจะง่ายกว่า",
  },
  {
    q: "teamLab แห่งไหนเหมาะกับเด็กมากกว่า?",
    a: "Planets เด็กอายุต่ำกว่า 4 ปีเข้าฟรีทั้งสองแห่ง แต่ Planets ใช้เวลาไม่นาน ได้ใช้ร่างกาย และเด็กตามได้ง่าย ควรเตรียมเสื้อผ้าสำรองเพราะโซนน้ำทำให้ทุกคนเปียก และรถเข็นเด็กเข้าด้านในไม่ได้",
  },
];

const tripTours = [
  withKlookLocale(tokyoSubwayTicket, "th", {
    title: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    desc: "นั่งได้ไม่จำกัดทุกสายของ Tokyo Metro และ Toei Subway รับตั๋วเมื่อมาถึงแทนการต่อคิวซื้อ",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "th", {
    title: "ทัวร์รถบัสชมเมืองโตเกียว 1 วัน",
    desc: "ทัวร์มีไกด์วนชมสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมออดิโอไกด์หลายภาษา",
  }),
  withKlookLocale(fujiDayTour, "th", {
    title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว",
    desc: "นั่งรถโค้ชเต็มวันไปสถานีที่ 5 ของฟูจิ ทะเลสาบคาวากุจิ และโอชิโนะฮักไก กลับถึงโตเกียวเย็นวันเดียวกัน",
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
            teamLab Planets หรือ Borderless (2026):<br />ไปที่ไหนดี และควรจองแห่งไหน
          </h1>
          <p className={styles.heroSubtitle}>
            โตเกียวมีพิพิธภัณฑ์ teamLab สองแห่ง แต่ละแห่งมีตั๋วของตัวเอง นี่คือความต่างของทั้งสองแห่ง และแห่งที่ควรจอง
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ราคาทางการ", "เทียบกันทุกข้อ"].map((t) => (
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
              ตั๋ว teamLab ในโตเกียวคือการเลือกระหว่างสองพิพิธภัณฑ์ <strong>จอง Planets</strong> ถ้าคุณมากับเด็กหรืออยากเดินลุยน้ำ <strong>จอง Borderless</strong> ถ้าอยากเดินชมงานศิลปะช้า ๆ แต่ละแห่งมีตั๋วของตัวเอง ตั๋วผู้ใหญ่ของ Planets {P_ADULT} และของ Borderless {B_ADULT}
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

        <p className={styles.bodyText}>
          ตัดสินใจแล้ว? ดู<Link href="/th/guides/attractions/teamlab-planets-tickets">ไกด์ตั๋ว teamLab Planets</Link> สำหรับเวลาเปิด การจอง และการเดินทาง หรือ<Link href="/th/guides/attractions/teamlab-borderless-tickets">ไกด์ตั๋ว teamLab Borderless</Link>
        </p>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เทียบกันข้าง ๆ</span>
          <h2 className={styles.sectionTitle}>teamLab Planets หรือ Borderless: ควรจองแห่งไหน?</h2>
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
            ข้อมูล Planets ตรวจสอบจาก teamlab.art และเว็บขายตั๋วทางการเมื่อ {PLANETS_CHECKED} ข้อมูล Borderless ตรวจสอบจาก teamlab.art เมื่อ {BORDERLESS_CHECKED} ทั้งสองแห่งตั้งราคาตั๋วผู้ใหญ่ตามวันและเวลา จึงควรยืนยันด้วยวันที่คุณจะไป
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>แห่งไหนเหมาะกับคุณ</span>
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

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="จองไว้สำหรับทริปเดียวกัน"
          intro="ไม่ว่าเลือกแห่งไหนก็ใช้เวลาเพียงส่วนหนึ่งของวันในโตเกียว รายการเหล่านี้ครอบคลุมรถไฟใต้ดิน ทัวร์ชมเมืองพร้อมไกด์ และทัวร์ 1 วันออกนอกเมือง Klook บล็อกการอ่านราคาอัตโนมัติ จึงควรเปิดหน้าสินค้าเพื่อดูราคาในวันของคุณ"
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
