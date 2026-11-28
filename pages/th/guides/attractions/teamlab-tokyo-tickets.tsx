// Thai edition of /guides/attractions/teamlab-tokyo-tickets. Since 6 Nov 2026 (task
// jtk-20261106-A24) this page answers one question: which of Tokyo's two teamLab museums to
// book. Since 28 Nov 2026 (task jtk-20261128-R01) it mirrors the English page's order: a
// three-sentence answer with both price floors, the visit length and the booking rule; one
// comparison table with the verdict in row one (where, station, price, time, what to wear, when
// booking opens, tickets on the day); the two Klook buttons and a same-day block (Tokyo day tour,
// Subway Ticket, Klook eSIM) under it; question H2s — how much, on the day, both in one day — and
// the same five FAQ questions. Official figures re-read on 28 Nov 2026.
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
import NextBookingBlock from "../../../../components/NextBookingBlock";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { fujiDayTour, klookEsim, tokyoSightseeingBusTour, tokyoSubwayTicket, type KlookTour } from "../../../../lib/klook-links";
import { thTeamlabBorderless, thTeamlabPlanets } from "../../../../lib/klook-links-th";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import KlookAddOnLine from "../../../../components/KlookAddOnLine";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";
import HotelStayBlock from "../../../../components/HotelStayBlock";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import { teamlabSameDayCards } from "../../../../lib/teamlab-same-day-cards";

// Same-day cards under the comparison table (task-jtk-20261115-P01, moved 20 Nov 2026).
const SAME_DAY = teamlabSameDayCards("tokyo", "th");

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
const CHECKED_ISO = "2026-11-28";
const CHECKED = dateLabel(CHECKED_ISO, "th");
const P_ADULT = priceLabel(P.adult, "th");
const B_ADULT = priceLabel(B.adult, "th");
const CHILD = priceLabel(P.child, "th");
const SOURCE_NOTE = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const ROUTE = "/th/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "teamLab Planets หรือ Borderless";
const DESC =
  "teamLab Planets หรือ Borderless? ผู้ใหญ่ ¥3,800/¥3,400 ขึ้นไป ลุยน้ำเลือก Planets";

const PLANETS_URL = thTeamlabPlanets.url;
const BORDERLESS_URL = thTeamlabBorderless.url;

// แถวแรกคือคำตอบ
const compareRows = [
  { factor: "เหมาะกับ", planets: "อยากเดินเท้าเปล่าลุยน้ำ (มากับเด็กเลือกแห่งนี้)", borderless: "อยากใส่รองเท้าเดินชมงานศิลปะอย่างอิสระ ไม่มีเส้นทางตายตัว" },
  { factor: "ที่ตั้ง", planets: "โทโยสุ (เขตโคโต)", borderless: "อาซาบุไดฮิลส์ (เขตมินาโตะ)" },
  { factor: "สถานีใกล้สุด", planets: "สถานีชินโทโยสุ (สายยูริคาโมเมะ) ทางออก 1A เดิน 3 นาที", borderless: "สถานีคามิยะโจ (สายฮิบิยะ) ทางออก 5 เดิน 2 นาที" },
  { factor: "ผู้ใหญ่ (18 ปีขึ้นไป)", planets: `${P_ADULT} ราคาสูงขึ้นในวันและรอบเวลาที่มีผู้เข้าชมมาก`, borderless: `${B_ADULT} ราคาสูงขึ้นในวันและรอบเวลาที่มีผู้เข้าชมมาก` },
  { factor: "อายุ 13–17 / 4–12 ปี", planets: `¥2,800 / ${CHILD} อายุ 3 ปีลงไปฟรี`, borderless: `¥2,800 / ${CHILD} อายุ 3 ปีลงไปฟรี` },
  { factor: "เวลาที่ใช้", planets: "ทางการไม่ได้ระบุ เผื่อไว้ 1.5–2 ชั่วโมง", borderless: "ประมาณ 1.5–2 ชั่วโมง (FAQ ทางการ) โดยไม่จำกัดเวลาเมื่อเข้าไปแล้ว" },
  { factor: "การแต่งกาย", planets: "เท้าเปล่า น้ำลึกถึงระดับเข่าผู้ใหญ่ ยืมกางเกงขาสั้นได้ฟรี", borderless: "ใส่รองเท้าเดินชม ไม่มีน้ำ" },
  { factor: "เปิดจอง", planets: "ไม่ได้ประกาศวันเปิดขาย ขายตั๋วระบุรอบเวลาทางออนไลน์", borderless: "ราววันที่ 1 ของเดือน ล่วงหน้า 2 เดือน" },
  { factor: "ซื้อตั๋ววันเดียวกัน", planets: "ไม่มีขายหน้างาน ต้องซื้อออนไลน์ก่อนไป", borderless: "ซื้อออนไลน์ในวันนั้นได้ถ้ายังไม่หมด หรือซื้อหน้างานแพงกว่า ¥200" },
  { factor: "เวลาเปิด", planets: "08:00–22:00 (31 ธ.ค.–2 ม.ค. เปิด 08:00–20:30)", borderless: "08:30–21:00 บางวันต่างออกไป" },
  { factor: "ระยะเวลาจัดแสดง", planets: "ถึงสิ้นปี 2027", borderless: "ถาวร" },
];

const costRows = [
  { who: "ผู้ใหญ่ (18 ปีขึ้นไป)", planets: P_ADULT, borderless: B_ADULT, both: "¥7,200 ขึ้นไป" },
  { who: "อายุ 13–17 ปี", planets: "¥2,800", borderless: "¥2,800", both: "¥5,600" },
  { who: "อายุ 4–12 ปี", planets: CHILD, borderless: CHILD, both: "¥3,000" },
  { who: "อายุ 3 ปีลงไป", planets: "ฟรี", borderless: "ฟรี", both: "ฟรี" },
  { who: "ผู้พิการ", planets: "¥1,900 ขึ้นไป", borderless: "¥1,700 ขึ้นไป", both: "¥3,600 ขึ้นไป" },
  { who: "ซื้อหน้างาน", planets: "ไม่มีขาย", borderless: "ผู้ใหญ่ +¥200", both: "—" },
];

const faqItems: FaqItem[] = [
  {
    q: "teamLab ในโตเกียว Planets กับ Borderless แห่งไหนดีกว่า?",
    a: "ไม่มีแห่งไหนดีกว่าในทุกด้าน Planets ต้องเดินเท้าเปล่าลุยน้ำที่ลึกถึงระดับเข่าผู้ใหญ่ จึงเหมาะกับคนที่มากับเด็ก ส่วน Borderless ไม่มีแผนที่นำชมและไม่มีเส้นทางตายตัว ใส่รองเท้าเดินชมงานศิลปะได้อย่างอิสระ",
  },
  {
    q: "ตั๋ว teamLab ในโตเกียวปี 2026 ราคาเท่าไร?",
    a: `ตั๋วผู้ใหญ่ของ Planets ${P_ADULT} และของ Borderless ${B_ADULT} ราคาสูงขึ้นในวันและรอบเวลาที่มีผู้เข้าชมมาก (ตรวจสอบจาก teamlab.art เมื่อ ${CHECKED}) อายุ 13–17 ปี ¥2,800 อายุ 4–12 ปี ${CHILD} ทั้งสองแห่ง และอายุ 3 ปีลงไปเข้าฟรี ถ้าไปทั้งสองแห่ง ผู้ใหญ่ต้องจ่ายตั้งแต่ ¥7,200`,
  },
  {
    q: "ซื้อตั๋ว teamLab ในวันเดียวกันได้ไหม?",
    a: "ได้เฉพาะ Borderless ถ้าตั๋วยังไม่หมดก็ซื้อในวันนั้นผ่านเว็บไซต์ขายตั๋วทางการได้ และซื้อหน้างานได้โดยผู้ใหญ่แพงกว่า ¥200 ส่วน Planets ไม่มีขายตั๋วหน้างานเลย ต้องซื้อออนไลน์ก่อนไป",
  },
  {
    q: "ไป Planets และ Borderless ในวันเดียวได้ไหม?",
    a: "ได้ เพราะตั๋วแต่ละแห่งระบุวันและเวลาแยกกัน แต่ทั้งสองแห่งอยู่คนละย่าน คือโทโยสุและอาซาบุไดฮิลส์ และ teamLab ระบุว่า Borderless ใช้เวลาประมาณ 1.5–2 ชั่วโมง ควรเว้นเวลาระหว่างสองรอบอย่างน้อยเท่าระยะเวลาเข้าชมดังกล่าว บวกเวลาเดินทาง หรือแบ่งไปแห่งละครึ่งวัน",
  },
  {
    q: "ซื้อตั๋ว teamLab ที่ไหนถูกที่สุด?",
    a: "ราคาพื้นฐานกำหนดโดยเว็บไซต์ขายตั๋วทางการ และ teamLab ระบุให้ Klook เป็นช่องทางขายทางการของ Borderless ด้วย ปัจจัยที่ทำให้ราคาต่างกันมากกว่าคือวันที่เข้าชม เพราะตั๋วผู้ใหญ่ทั้งสองแห่งแพงขึ้นในวันและรอบที่คนเยอะ ควรเทียบหลายวันก่อนจ่าย และการซื้อหน้างานที่ Borderless แพงกว่าออนไลน์ ¥200",
  },
];

// ใต้ตารางเปรียบเทียบ: ทัวร์โตเกียว 1 วัน・Tokyo Subway Ticket・Klook eSIM
const sameDayBookings: KlookTour[] = [
  withKlookLocale(tokyoSightseeingBusTour, "th", {
    title: "ทัวร์รถบัสเที่ยวโตเกียว 1 วัน",
    desc: "ทัวร์พร้อมไกด์พาชมสวนพระราชวังอิมพีเรียล อาซากุสะ และโตเกียวสกายทรี พร้อมระบบบรรยายเสียงหลายภาษา",
  }),
  withKlookLocale(tokyoSubwayTicket, "th", {
    title: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)",
    desc: "นั่งได้ไม่จำกัดทุกสายของ Tokyo Metro และ Toei Subway รับตั๋วเมื่อเดินทางมาถึงได้โดยไม่ต้องต่อคิวซื้อ",
  }),
  { title: "eSIM ญี่ปุ่นของ Klook", desc: "ทั้งสองแห่งสแกนตั๋วบนมือถือที่ทางเข้า จึงควรเตรียมอินเทอร์เน็ตไว้ก่อนวันเข้าชม", url: klookFor(klookEsim.url, "th") },
];
const fujiTour = withKlookLocale(fujiDayTour, "th", {
  title: "ทัวร์ภูเขาไฟฟูจิ 1 วันจากโตเกียว",
  desc: "นั่งรถบัสเที่ยวตลอดวันไปยังสถานีที่ 5 ของภูเขาไฟฟูจิ ทะเลสาบคาวากุจิ และโอชิโนะฮักไก กลับถึงโตเกียวในช่วงเย็นของวันเดียวกัน",
});

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
            โตเกียวมีพิพิธภัณฑ์ teamLab สองแห่ง โดยแต่ละแห่งต้องซื้อตั๋วแยกกัน มาดูความแตกต่างและวิธีเลือกว่าควรจองแห่งไหน
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
              <strong>ตั๋ว teamLab ในโตเกียว</strong>สำหรับผู้ใหญ่ราคา <strong>{P_ADULT} ที่ teamLab Planets (โทโยสุ)</strong> และ <strong>{B_ADULT} ที่ teamLab Borderless (อาซาบุไดฮิลส์)</strong> และราคาสูงขึ้นในวันและรอบเวลาที่มีผู้เข้าชมมาก (ตรวจสอบจากเว็บไซต์ทางการเมื่อ {CHECKED}) teamLab ระบุว่า Borderless ใช้เวลาประมาณ 1.5–2 ชั่วโมง ส่วน Planets ไม่ได้ระบุไว้ จึงเผื่อไว้ 1.5–2 ชั่วโมงเช่นกัน ทั้งสองแห่งขายตั๋วระบุรอบเวลาทางออนไลน์ และมีเพียง Borderless ที่ซื้อหน้างานได้ (แพงกว่า ¥200)
            </p>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0 }}>
              อยากเดินเท้าเปล่าลุยน้ำ <strong>เลือก Planets</strong> อยากเดินชมงานศิลปะอย่างอิสระ <strong>เลือก Borderless</strong> ดูราคาตามวันและขั้นตอนจองได้ในคู่มือ{" "}
              <Link href="/th/guides/attractions/teamlab-planets-tickets">ตั๋ว teamLab Planets</Link>
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว Planets →
              </KlookLink>
              <KlookLink href={BORDERLESS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                ดูตั๋ว Borderless →
              </KlookLink>
            </div>
            {/* A32 (27 Nov 2026): one line of 5% / 20% under the 2% ticket buttons. */}
            <KlookAddOnLine
              lead="จองไปพร้อมกันสำหรับวันเดียวกัน:"
              items={[
                { label: "Tokyo Subway Ticket (24 / 48 / 72 ชั่วโมง)", url: klookFor(tokyoSubwayTicket.url, "th") },
                { label: "eSIM ญี่ปุ่นของ Klook", url: klookFor(klookEsim.url, "th") },
              ]}
            />
            {/* A34 (27 Nov 2026): the next booking of the same trip (high-EPC guides) — lib/next-booking.ts. */}
            <NextBookingBlock region="tokyo" locale="th" />
          </div>
        </div>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>เปรียบเทียบแบบเคียงข้างกัน</span>
          <h2 className={styles.sectionTitle}>teamLab ในโตเกียว Planets หรือ Borderless แห่งไหนดีกว่า?</h2>
          <p className={styles.bodyText}>อยากเดินลุยน้ำให้เลือก Planets (มากับเด็กก็เลือกแห่งนี้) อยากใส่รองเท้าเดินชมอย่างอิสระให้เลือก Borderless ดูความแตกต่างอื่น ๆ ได้จากตารางด้านล่าง</p>
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
          <p className={styles.bodyText} style={SOURCE_NOTE}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} แหล่งข้อมูล:{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>,{" "}
            <a href="https://teamlabplanets.dmm.com/en/ticket" target="_blank" rel="noopener noreferrer">teamlabplanets.dmm.com/en/ticket</a>,{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>{" "}
            และ FAQ ของ Borderless{" "}
            <a href="https://www.teamlab.art/faq/Tokyo/" target="_blank" rel="noopener noreferrer">teamlab.art/faq/Tokyo</a>{" "}
            ตั๋วผู้ใหญ่ของทั้งสองแห่งเปลี่ยนราคาตามวันและเวลา และประกาศเฉพาะราคาต่ำสุด จึงควรตรวจสอบราคาของวันที่คุณจะไป เวลาที่ใช้ใน Planets เป็นตัวเลขสำหรับวางแผน teamLab ไม่ได้ประกาศไว้
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

        <KlookTourPicks
          heading="จองไว้สำหรับวันเดียวกับ teamLab"
          intro="ทัวร์โตเกียว 1 วันพร้อมไกด์ บัตรรถไฟใต้ดิน และอินเทอร์เน็ตสำหรับตั๋วบนมือถือ Tokyo Subway Ticket ใช้ไปสถานีคามิยะโจของ Borderless ได้ ส่วน Planets ใช้ไปสถานีโทโยสุของสายยูราคุโจ (เดิน 10 นาที) ได้ แต่ใช้กับสายยูริคาโมเมะไปสถานีชินโทโยสุไม่ได้ ราคาของ Klook เปลี่ยนตามวันที่ จึงควรเปิดหน้าสินค้าเพื่อดูราคาในวันของคุณ"
          tours={sameDayBookings}
        />

        <KlookSameDayCards heading={SAME_DAY.heading} cards={SAME_DAY.cards} />

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="tokyo" areas={["ginza", "odaiba", "roppongi", "tokyoStation"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ราคา</span>
          <h2 className={styles.sectionTitle}>ตั๋ว teamLab ในโตเกียวราคาเท่าไร?</h2>
          <p className={styles.bodyText}>ผู้ใหญ่ Planets {P_ADULT} และ Borderless {B_ADULT} เนื่องจากต้องซื้อตั๋วแยกกัน ถ้าไปทั้งสองแห่ง ผู้ใหญ่ตั้งแต่ ¥7,200 และเด็กอายุ 4–12 ปี ¥3,000</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ตั๋ว", "teamLab Planets", "teamLab Borderless", "ทั้งสองแห่ง"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.both}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={SOURCE_NOTE}>
            ตรวจสอบล่าสุด: {CHECKED_ISO} จาก{" "}
            <a href="https://www.teamlab.art/e/planets/" target="_blank" rel="noopener noreferrer">teamlab.art/e/planets</a>{" "}
            และ{" "}
            <a href="https://www.teamlab.art/e/borderless-azabudai/" target="_blank" rel="noopener noreferrer">teamlab.art/e/borderless-azabudai</a>{" "}
            ราคาผู้ใหญ่และผู้พิการเป็นราคาต่ำสุดที่สูงขึ้นในบางวัน ช่อง &quot;ทั้งสองแห่ง&quot; คือผลรวมของราคาต่ำสุดทั้งสอง
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ซื้อวันเดียวกัน</span>
          <h2 className={styles.sectionTitle}>ซื้อตั๋ว teamLab ในวันเดียวกันได้ไหม?</h2>
          <p className={styles.bodyText}>ได้เฉพาะ Borderless ถ้าตั๋วยังไม่หมดก็ซื้อในวันนั้นผ่านเว็บไซต์ขายตั๋วทางการได้ และซื้อหน้างานได้โดยผู้ใหญ่แพงกว่า ¥200 ส่วน Planets ไม่มีขายหน้างาน ต้องซื้อออนไลน์ก่อนไป</p>
          <p className={styles.bodyText}>
            ตั๋ว Borderless เปิดขายราววันที่ 1 ของเดือน ล่วงหน้า 2 เดือน และ teamLab แจ้งว่าอาจขายหมด ส่วน Planets ไม่ได้ประกาศวันเปิดขาย ดูวันเปิดขาย Flexible Pass และการซื้อหน้างานได้ในคู่มือ{" "}
            <Link href="/th/guides/attractions/teamlab-borderless-tickets">ตั๋ว teamLab Borderless</Link> และดูราคาตามวัน Premium Pass และการแต่งกายสำหรับโซนน้ำได้ในคู่มือ{" "}
            <Link href="/th/guides/attractions/teamlab-planets-tickets">ตั๋ว teamLab Planets</Link>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ไปทั้งสองแห่ง</span>
          <h2 className={styles.sectionTitle}>ไปทั้งสองแห่งในวันเดียวได้ไหม?</h2>
          <p className={styles.bodyText}>ได้ ถ้ามีตั๋วระบุรอบเวลาสองใบและเว้นช่วงให้พอ เผื่อเวลาแห่งละ 1.5–2 ชั่วโมงบวกเวลาเดินทางระหว่างโทโยสุกับอาซาบุไดฮิลส์ หรือแบ่งไปแห่งละครึ่งวัน</p>
          <p className={styles.bodyText}>ไปทั้งสองแห่ง ผู้ใหญ่ตั้งแต่ ¥7,200 สถานีคามิยะโจของ Borderless อยู่บนสายฮิบิยะของ Tokyo Metro ส่วน Planets เดิน 10 นาทีจากสถานีโทโยสุ (สายยูราคุโจ) หรือ 3 นาทีจากสถานีชินโทโยสุ (สายยูริคาโมเมะ)</p>
        </section>

        <BookingEsimCard />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="ทัวร์ 1 วันออกนอกโตเกียว"
          intro="ไม่ว่าจะเลือกแห่งไหน การเข้าชมใช้เวลาเพียงส่วนหนึ่งของวันในโตเกียว ถ้าอยากออกนอกเมืองทั้งวัน มีทัวร์ภูเขาไฟฟูจิ ราคาของ Klook เปลี่ยนตามวันที่ จึงควรเปิดหน้าสินค้าเพื่อดูราคาในวันของคุณ"
          tours={[fujiTour]}
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
