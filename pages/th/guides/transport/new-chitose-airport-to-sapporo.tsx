import type { ReactNode } from "react";
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
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  jrHokkaidoRailPass,
  newChitoseAirportTransfers,
  newChitoseSapporoStayAreas,
  newChitoseSapporoTripPrep,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/transport/new-chitose-airport-to-sapporo) section by section as
// of 2026-11-28 (task jtk-20261128-TR03): same sections, table, FAQ (5) and Klook CTAs in the same
// order. Every fare, time, date and source is the English page's; nothing is added.
// Title term: สนามบินนิวชิโตเสะ ไปซัปโปโร — the airport as sapporo.travel/th, japan.travel/th and
// JR Hokkaido write it (Thai blogs such as trvlogue.com/th and gltjp.com/th also write ชินชิโตเสะ),
// with the train under its English name, Rapid Airport, in the H1.

const LOCALE = "th" as const;
const ROUTE = "/th/guides/transport/new-chitose-airport-to-sapporo";
const TITLE = "สนามบินนิวชิโตเสะ ไปซัปโปโร 2026";
const H1 = "สนามบินนิวชิโตเสะ ไปซัปโปโร 2026: รถไฟหรือรถบัส ราคาและเวลา";
const DESC =
  "สนามบินนิวชิโตเสะไปซัปโปโร รถไฟ JR 37 นาที ¥1,230 รถบัสราว 70 นาที ¥1,500";

const CHECKED = dateLabel("2026-11-28", LOCALE);
const JRP_CHECKED = dateLabel("2026-11-03", LOCALE);

const JR_AIRPORT_URL = "https://www.jrhokkaido.co.jp/airport/";
const JR_EN_URL = "https://www.jrhokkaido.co.jp/global/english/travel/airport.html";
const JR_FARE_URL = "https://www.jrhokkaido.co.jp/global/english/ticket/regular/";
const BUS_URL = "https://www.chuo-bus.co.jp/feature/airport";
const HOKUTO_URL = "https://www.hokto.co.jp/sapporo-chitose/";
const RENEWAL_URL = "https://www.hokto.co.jp/information/49138/";
const TAXI_URL = "https://www.hokto.co.jp/hire-chitose/";
const CTS_BUS_URL = "https://www.hokkaido-airports.com/en/new-chitose/access/bus/";

const TRANSFERS_URL = klookFor(newChitoseAirportTransfers.url, LOCALE);
const RAIL_PASS_URL = klookFor(jrHokkaidoRailPass.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{label}</a>
);

type ModeRow = { mode: string; time: string; fare: string; service: string; snow: string; bags: string };

const modeRows: ModeRow[] = [
  {
    mode: "เหมาะกับคนส่วนใหญ่: รถไฟ JR Rapid Airport",
    time: "ถึงซัปโปโร 37 นาที (Special Rapid เร็วสุด 33 นาที)",
    fare: "¥1,230 และ ¥2,230 ในตู้ที่นั่งจอง U-Seat",
    service: "ชั่วโมงละ 6 ขบวนช่วง 9:00–16:00 น. ขบวนแรกจากสนามบิน 6:38 น. ขบวนสุดท้าย 23:21 น.",
    snow: "ไม่ได้วิ่งบนถนนจึงไม่ติดการจราจร หาก JR งดเดินรถ หน้าสนามบินของ JR Hokkaido มีคำแนะนำสำหรับกรณีนี้",
    bags: "ได้สูงสุด 2 ชิ้น ชิ้นละไม่เกิน 250 ซม. (กว้าง+ยาว+สูง) และ 30 กก. ต้องยกขึ้นรถเอง",
  },
  {
    mode: "รถบัสสนามบิน (Hokuto Kotsu / Hokkaido Chuo Bus)",
    time: "ราว 70 นาทีถึงหน้าสถานีซัปโปโร แวะซูซูกิโนะและโอโดริระหว่างทาง",
    fare: "¥1,500 (เด็ก ¥750)",
    service: "ราวทุก 10–20 นาที 8:40–22:55 น. จากอาคารผู้โดยสารภายในประเทศ วันละ 83 เที่ยวตั้งแต่ 11 ธ.ค. 2026",
    snow: "ใช้ถนนเดียวกับรถยนต์ ผู้ให้บริการระบุว่าเวลาเดินทางเป็นเพียงค่าประมาณและเตือนว่าอาจล่าช้าเพราะรถติด",
    bags: "กระเป๋าเดินทางใส่ช่องเก็บสัมภาระใต้รถ ไม่รับจองล่วงหน้า",
  },
  {
    mode: "แท็กซี่จากจุดขึ้นรถ",
    time: "ถึงหน้าที่พัก ใช้ถนนเหมือนรถบัส",
    fare: "ตามมิเตอร์: 1.4 กม. แรก ¥740 จากนั้น ¥100 ทุก 293 ม. ฤดูหนาวบวก 20% กลางคืนบวก 20% ค่าทางด่วนแยก",
    service: "มีจุดขึ้นรถที่อาคารผู้โดยสารทั้งสองแห่ง ทุกช่วงเวลา",
    snow: "ใช้ถนนเดียวกัน ค่าธรรมเนียมเพิ่มฤดูหนาวใช้ช่วง 10 ธ.ค. – 26 มี.ค.",
    bags: "ใส่ท้ายรถ ขอรถแวนหรือรถตู้ 9 ที่นั่งได้",
  },
  {
    mode: "รถส่วนตัวที่จองไว้ (Klook)",
    time: "ถึงหน้าที่พัก",
    fare: "ราคาต่อคัน ดูราคาในวันที่ของคุณได้ที่หน้าสินค้า",
    service: "จองก่อนเดินทาง คนขับรอรับตามเที่ยวบิน",
    snow: "ใช้ถนนเดียวกับรถบัส",
    bags: "เลือกขนาดรถให้พอสำหรับกระเป๋าสกี",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "เดินทางจากสนามบินนิวชิโตเสะไปซัปโปโรอย่างไร?",
    a: `ขึ้นรถไฟ JR Rapid Airport ที่สถานีใต้อาคารผู้โดยสารภายในประเทศ ใช้เวลา 37 นาทีถึงสถานีซัปโปโร ราคา ¥1,230 ช่วงกลางวันมีชั่วโมงละ 6 ขบวน ขบวนสุดท้าย 23:21 น. ส่วนรถบัสสนามบินใช้เวลาราว 70 นาที ราคา ¥1,500 จอดที่ซูซูกิโนะ โอโดริ และสถานีซัปโปโร ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "จากสนามบินนิวชิโตเสะ นั่งรถไฟหรือรถบัสดีกว่า?",
    a: "ถ้าต้องการความเร็วหรือหิมะตก ให้นั่งรถไฟ เร็วกว่ารถบัสราวครึ่งชั่วโมง ถูกกว่า ¥270 และไม่ติดการจราจรบนถนน เลือกรถบัสเมื่อโรงแรมอยู่ใกล้ป้ายรถบัสในซูซูกิโนะหรือโอโดริ หรือเมื่อกระเป๋าหนักเกินกว่าจะยกขึ้นรถไฟ เพราะรถบัสเก็บกระเป๋าไว้ในช่องสัมภาระใต้รถ",
  },
  {
    q: "ใช้ JR Pass หรือ Hokkaido Rail Pass ไปซัปโปโรได้ไหม?",
    a: "ได้ ทั้งสองพาสใช้กับรถไฟ Rapid Airport ของ JR Hokkaido ได้ Hokkaido Rail Pass เริ่มต้นที่ ¥22,000 สำหรับ 5 วันเมื่อซื้อล่วงหน้า จึงคุ้มค่าเฉพาะเมื่อทริปนั้นนั่ง JR ไปโอตารุ อาซาฮิกาวะ ฮาโกดาเตะ หรือไปทางนิเซโกะด้วย ถ้านั่งแค่ช่วงสนามบินราคา ¥1,230 รถบัสสนามบินเป็นของบริษัทเอกชนจึงใช้พาสทั้งสองไม่ได้",
  },
  {
    q: "รถไฟเที่ยวสุดท้ายจากสนามบินนิวชิโตเสะไปซัปโปโรกี่โมง?",
    a: `23:21 น. เป็นขบวน Special Rapid Airport ที่ JR Hokkaido เดินรถไว้สำหรับเที่ยวบินที่ลงดึก และออกตรงเวลาแม้เที่ยวบินของคุณจะล่าช้า รถบัสสนามบินเที่ยวสุดท้ายจากอาคารผู้โดยสารภายในประเทศคือ 22:55 น. หลังจากนั้นต้องใช้แท็กซี่ตามมิเตอร์หรือรถที่จองไว้ล่วงหน้า ตรวจสอบเมื่อ ${CHECKED}`,
  },
  {
    q: "แท็กซี่จากสนามบินนิวชิโตเสะไปซัปโปโรราคาเท่าไร?",
    a: "ไม่มีบริษัทใดประกาศราคาเหมา แท็กซี่ในชิโตเสะคิดตามมิเตอร์ 1.4 กม. แรก ¥740 และ ¥100 ทุก 293 ม. ถัดไป บวกเพิ่ม 20% ระหว่าง 10 ธันวาคมถึง 26 มีนาคม และอีก 20% ช่วง 22:00–5:00 น. รวมค่าทางด่วนแยก ส่วนรถที่จองผ่าน Klook จะรู้ราคาต่อคันตั้งแต่ก่อนเดินทาง",
  },
];

const tripPrepItems = [
  withKlookLocale(newChitoseSapporoTripPrep[0], LOCALE, {
    label: "โรงแรมรอบสถานีซัปโปโร",
    ctaLabel: "ดูโรงแรมใกล้สถานีซัปโปโร →",
    why: "สถานีปลายทางของรถไฟ Rapid Airport ส่วนใหญ่และเป็นป้ายของรถบัสสนามบิน จึงเดินลากกระเป๋าบนหิมะสั้นที่สุดไม่ว่าจะมาทางไหน",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[1], LOCALE, {
    label: "Klook Japan eSIM",
    ctaLabel: "ดู Klook eSIM →",
    why: "เวลารถไฟ หมายเลขชานชาลารถบัส และเส้นทางเดินไปโรงแรม ต้องใช้อินเทอร์เน็ตมือถือทันทีที่ออกจากโถงผู้โดยสารขาเข้าที่นิวชิโตเสะ",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[2], LOCALE, {
    label: "รถรับส่งสนามบินนิวชิโตเสะ (รถส่วนตัวและรถร่วม)",
    ctaLabel: "ดูรถรับส่งนิวชิโตเสะ →",
    why: "ราคาต่อคันไปถึงหน้าโรงแรม เหมาะกับคนที่มีกระเป๋าสกี มากันทั้งครอบครัว หรือลงเครื่องหลังรถไฟขบวนสุดท้าย 23:21 น.",
  }),
  withKlookLocale(newChitoseSapporoTripPrep[3], LOCALE, {
    label: "JR Hokkaido Rail Pass",
    ctaLabel: "ดูราคา JR Hokkaido Rail Pass →",
    why: "ใช้กับ Rapid Airport ได้ แต่ค่าโดยสารเที่ยวละ ¥1,230 พาสจึงคุ้มค่าเมื่อทริปเดียวกันมีวันนั่งรถไฟไปโอตารุ อาซาฮิกาวะ ฮาโกดาเตะ หรือนิเซโกะด้วย",
  }),
];

const stayAreas = [
  withKlookLocale(newChitoseSapporoStayAreas[0], LOCALE, {
    area: "สถานีซัปโปโร",
    why: "รถไฟ Rapid Airport สิ้นสุดที่นี่ และรถบัสสนามบินจอดที่หน้าสถานีซัปโปโร พักใกล้สถานีจึงไม่ต้องลากกระเป๋าต่ออีกทอด",
  }),
  withKlookLocale(newChitoseSapporoStayAreas[1], LOCALE, {
    area: "ซูซูกิโนะ",
    why: "รถบัสสนามบินจอดที่มินามิ 3 โจ ซูซูกิโนะ ก่อนถึงโอโดริและสถานี และตั้งแต่ 11 ธ.ค. 2026 มีรถบัสตรงจากซูซูกิโนะไปสนามบินใช้เวลาราว 62 นาทีสำหรับขากลับ",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.th, { label: "สนามบินนิวชิโตเสะ ไปซัปโปโร" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function ThNewChitoseAirportToSapporoPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG[LOCALE] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>อัปเดต {updatedLabel}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            รถไฟ JR Rapid Airport รถบัสสนามบิน แท็กซี่ และรถที่จองไว้ จากสนามบินนิวชิโตเสะเข้าใจกลางเมืองซัปโปโร พร้อมค่าโดยสาร เวลาเที่ยวแรกและเที่ยวสุดท้าย และควรเลือกแบบไหนในวันที่หิมะตก
          </p>
          <div className={styles.heroBadges}>
            {[`อัปเดต ${updatedLabel}`, "ค่าโดยสารจาก JR Hokkaido และผู้ให้บริการรถบัส", "ราคา Klook ตรวจสอบตามวันที่"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เร็วที่สุด</p>
                <p className={styles.verdictStatValue}>JR 37 นาที ¥1,230</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>กระเป๋าใส่ใต้รถ</p>
                <p className={styles.verdictStatValue}>รถบัส ราว 70 นาที ¥1,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>เที่ยวสุดท้าย</p>
                <p className={styles.verdictStatValue}>รถไฟ 23:21 น. (รถบัส 22:55 น.)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              จาก<strong>สนามบินนิวชิโตเสะไปซัปโปโร</strong> รถไฟ <strong>JR Rapid Airport</strong> ใช้เวลา <strong>37 นาที</strong> ถึงสถานีซัปโปโร ราคา <strong>¥1,230</strong> ช่วงกลางวันมีชั่วโมงละ 6 ขบวน ขบวนสุดท้าย <strong>23:21 น.</strong> ส่วน<strong>รถบัสสนามบิน</strong>ใช้เวลาราว <strong>70 นาที</strong> ถึงหน้าสถานีซัปโปโร ราคา <strong>¥1,500</strong> แวะซูซูกิโนะและโอโดริ และเก็บกระเป๋าไว้ใต้รถ แท็กซี่คิดตามมิเตอร์ 1.4 กม. แรก ¥740 และบวกเพิ่ม 20% ช่วง 10 ธันวาคมถึง 26 มีนาคม ถ้าต้องการราคาตายตัวไปถึงหน้าโรงแรม ให้จองรถส่วนตัวก่อนเดินทาง ข้อมูลจาก JR Hokkaido, Hokuto Kotsu และ Hokkaido Chuo Bus ตรวจสอบเมื่อ {CHECKED}
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              จะไปลานสกีเลยใช่ไหม? ดูรถบัสสกีจากสนามบินได้ที่{" "}
              <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>
                ซัปโปโรไปนิเซโกะในฤดูหนาว (ภาษาอังกฤษ)
              </Link>
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                รถรับส่งนิวชิโตเสะ →
              </KlookLink>
              <KlookLink href={RAIL_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                JR Hokkaido Rail Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ทุกวิธีเดินทาง</span>
          <h2 className={styles.sectionTitle}>เดินทางจากสนามบินนิวชิโตเสะไปซัปโปโรอย่างไร?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ผู้มาถึงส่วนใหญ่นั่งรถไฟ JR Rapid Airport ได้เลย ใช้เวลา 37 นาที ราคา ¥1,230 ขึ้นที่สถานีใต้อาคารผู้โดยสารภายในประเทศ ตารางด้านล่างแยกวิธีละหนึ่งแถว ราคาผู้ใหญ่เที่ยวเดียว และแถวแรกคือวิธีที่แนะนำ
          </p>
          <SimpleTable
            head={["วิธีเดินทาง", "เวลา", "ราคาผู้ใหญ่", "เที่ยวรถ", "วันหิมะตก", "สัมภาระ"]}
            rows={modeRows.map((r) => [r.mode, r.time, r.fare, r.service, r.snow, r.bags])}
          />
          <p className={styles.bodyText} style={note}>
            ตรวจสอบล่าสุด: 2026-11-28 แหล่งข้อมูล: {ext(JR_AIRPORT_URL, "JR Hokkaido, Rapid Airport")}; {ext(JR_EN_URL, "JR Hokkaido, ข้อมูลการเดินทางจากสนามบิน (ภาษาอังกฤษ)")}; {ext(JR_FARE_URL, "ค่าโดยสาร JR Hokkaido")}; {ext(BUS_URL, "Hokkaido Chuo Bus, ตารางรถบัสสนามบิน")}; {ext(HOKUTO_URL, "Hokuto Kotsu, สายใจกลางเมืองซัปโปโร")}; {ext(TAXI_URL, "ค่าแท็กซี่ชิโตเสะของ Hokuto Kotsu")}; {ext(CTS_BUS_URL, "ชานชาลารถบัสสนามบินนิวชิโตเสะ")} เวลารถบัสนับจากอาคารผู้โดยสารภายในประเทศ (ฝั่ง ANA) ป้ายที่อาคารผู้โดยสารระหว่างประเทศช้ากว่าราว 6 นาที เด็กอายุ 6–11 ปีนั่ง JR ครึ่งราคา
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>รถไฟหรือรถบัส</span>
          <h2 className={styles.sectionTitle}>จากสนามบินนิวชิโตเสะ นั่งรถไฟหรือรถบัสดีกว่า?</h2>
          <p className={styles.bodyText}>
            นั่งรถไฟ เว้นแต่กระเป๋าของคุณหนักเกินกว่าจะยกขึ้นรถไฟเอง Rapid Airport เร็วกว่ารถบัสราวครึ่งชั่วโมง ถูกกว่า ¥270 และวิ่งบนราง ไม่ใช่ทางด่วน ซึ่งช่วยได้มากในเย็นวันที่หิมะตก ตู้ 5 จาก 6 ตู้ใช้บัตร IC ผ่านประตูตรวจตั๋วได้โดยไม่ต้องซื้อตั๋ว ส่วนตู้ที่ 4 เป็นที่นั่งจอง U-Seat จ่ายเพิ่ม ¥1,000 (¥800 แบบไม่ใช้ตั๋วกระดาษ) และมีที่วางกระเป๋าใบใหญ่ JR Hokkaido อนุญาตให้นำสัมภาระขึ้นรถได้ 2 ชิ้น ชิ้นละไม่เกิน 250 ซม. และ 30 กก. รถบัสเหมาะกว่าเมื่อคุณยกกระเป๋าไม่ไหว เพราะกระเป๋าเก็บไว้ใต้รถ หรือเมื่อโรงแรมอยู่ในซูซูกิโนะหรือใกล้สวนโอโดริ ซึ่งรถบัสจอดก่อนถึงหน้าสถานีซัปโปโร ผู้ให้บริการทั้งสองรายระบุว่าเวลาเดินรถเป็นค่าประมาณที่อาจนานขึ้นตามสภาพการจราจร และ Hokuto Kotsu ประกาศเมื่อ 22 พฤศจิกายน 2026 ว่าอาจงดเดินรถบางเที่ยวระหว่างที่เพิ่มการซ่อมบำรุงรถ
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              ดูรถส่วนตัวแทน →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ตั้งแต่ 11 ธันวาคม</span>
          <h2 className={styles.sectionTitle}>รถบัสสนามบินเปลี่ยนอะไรบ้างในฤดูหนาวนี้?</h2>
          <p className={styles.bodyText}>
            เที่ยวรถมากขึ้นและเส้นทางเข้าใจง่ายขึ้น ในราคาเดิม ตั้งแต่ 11 ธันวาคม 2026 Hokuto Kotsu และ Chuo Bus แยกสายใจกลางเมืองซัปโปโรเป็นสองสาย ได้แก่สาย<strong>หน้าสถานีซัปโปโร / ซูซูกิโนะ</strong> วันละ 72 เที่ยวจากสนามบิน และสาย<strong>วนรอบโรงแรมในใจกลางเมือง</strong> วันละ 11 เที่ยว ออกจากสนามบินราว 12:30–19:30 น. จอดที่โรงแรมเคโอพลาซ่า แกรนด์เมอร์เคียว และโรงแรมอื่น ๆ รวมถึงสวนนากาจิมะ ส่วนขาไปสนามบิน มีสาย<strong>ซูซูกิโนะตรงไปสนามบิน</strong>ใหม่ ใช้เวลาราว 1 ชั่วโมง 2 นาที ผ่าน Sapporo-minami IC สำหรับวันฤดูหนาวที่รถบัสเต็มตั้งแต่ซูซูกิโนะจนผู้โดยสารที่ป้ายถัดไปขึ้นไม่ได้ ราคาผู้ใหญ่ยังคง ¥1,500 (¥1,400 จากป้ายย่านคิโยตะ) จ่ายด้วยเงินสด บัตรเครดิตแบบไร้สัมผัส หรือ PayPay และไม่รับจองล่วงหน้า
          </p>
          <p className={styles.bodyText} style={note}>
            ตรวจสอบล่าสุด: 2026-11-28 แหล่งข้อมูล: {ext(RENEWAL_URL, "ประกาศข่าวของ Hokuto Kotsu (21 ต.ค. 2026)")} และ {ext(BUS_URL, "ตารางเวลา Hokkaido Chuo Bus")}
          </p>
        </section>

        <KlookTripPrep
          label="จองก่อนเดินทาง"
          heading="ควรจองอะไรไว้ก่อนเดินทางไปนิวชิโตเสะ?"
          intro="ห้องพักใกล้สถานีซัปโปโร อินเทอร์เน็ตมือถือ และรถรับส่งหากมีกระเป๋าสกีหรือลงเครื่องดึก ราคา Klook เปลี่ยนตามวันที่ จึงควรเปิดหน้าสินค้าเพื่อดูราคาในวันของคุณ"
          items={tripPrepItems}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>พาสรถไฟ</span>
          <h2 className={styles.sectionTitle}>ใช้ JR Pass หรือ Hokkaido Rail Pass ไปซัปโปโรได้ไหม?</h2>
          <p className={styles.bodyText}>
            ได้ ทั้งสองพาสใช้กับ Rapid Airport ได้เพราะเป็นรถไฟของ JR Hokkaido แต่ใช้กับรถบัสสนามบินซึ่งเป็นของบริษัทเอกชนไม่ได้ ส่วนจะคุ้มค่าหรือไม่เป็นอีกเรื่องหนึ่ง{" "}
            <Link href="/guides/transport/hokkaido-rail-pass" style={linkStyle}>
              Hokkaido Rail Pass (ภาษาอังกฤษ)
            </Link>{" "}
            ราคา ¥22,000 สำหรับ 5 วันเมื่อซื้อล่วงหน้า (JR Hokkaido, {CHECKED}) เทียบกับเที่ยวละ ¥1,230 ไปสนามบิน จึงคุ้มค่าเฉพาะเมื่อมีวันนั่ง JR ระยะไกลกว่านั้น เช่น โอตารุ อาซาฮิกาวะ ฮาโกดาเตะ หรือรถไฟผ่านโอตารุไปทางนิเซโกะ ส่วน Japan Rail Pass ทั่วประเทศ ¥53,000 สำหรับ 7 วัน ({JRP_CHECKED}) เหมาะเฉพาะเมื่อสัปดาห์เดียวกันมีการนั่งชินคันเซ็นบนเกาะฮอนชูด้วย
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={RAIL_PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              JR Hokkaido Rail Pass →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>ลงเครื่องดึกและวันหิมะตก</span>
          <h2 className={styles.sectionTitle}>ถ้าลงเครื่องดึกหรือหิมะตกต้องทำอย่างไร?</h2>
          <p className={styles.bodyText}>
            วางแผนจากสองเวลานี้ รถบัสสนามบินเที่ยวสุดท้ายออกจากอาคารผู้โดยสารภายในประเทศ <strong>22:55 น.</strong> และรถไฟขบวนสุดท้ายคือ Special Rapid Airport เวลา <strong>23:21 น.</strong> JR Hokkaido เดินรถขบวนนี้ไว้สำหรับเที่ยวบินที่ลงดึก แต่ระบุว่าขบวนออกตามเวลาไม่ว่าเที่ยวบินจะล่าช้าหรือไม่ เมื่อหิมะตก รถไฟเป็นตัวเลือกที่ปลอดภัยกว่าเพราะไม่ใช้ถนน และหาก JR งดเดินรถ หน้าสนามบินของ JR จะอธิบายทางเลือกอื่นไว้ หลังรถไฟขบวนสุดท้าย ทางเลือกที่เหลือคือแท็กซี่ตามมิเตอร์จากจุดขึ้นรถ (มีค่าธรรมเนียมเพิ่มฤดูหนาว 20% ตั้งแต่ 10 ธันวาคม และอีก 20% ช่วง 22:00–5:00 น. บวกค่าทางด่วน) หรือรถที่จองไว้ล่วงหน้า ในเดือนกุมภาพันธ์ช่วง{" "}
            <Link href="/th/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>
              เทศกาลหิมะซัปโปโร
            </Link>{" "}
            ที่เมืองคึกคัก ให้จองห้องพักก่อน ถ้าจะพากระเป๋าสกีไปถึงลานสกีเลย{" "}
            <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>
              รถรับส่งไปนิเซโกะ (ภาษาอังกฤษ)
            </Link>{" "}
            ก็ออกจากสนามบินเดียวกัน
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              จองรถจากนิวชิโตเสะ →
            </KlookLink>
          </div>
        </section>

        <KlookStayAreas
          heading="ลงเครื่องแล้วควรพักย่านไหนในซัปโปโร?"
          intro="รถไฟสิ้นสุดที่สถานีซัปโปโร และรถบัสจอดที่ซูซูกิโนะ โอโดริ และสถานี ห้องว่างและราคาเปลี่ยนตามวันที่ แต่ละย่านจึงลิงก์ไปที่การค้นหาโรงแรมของ Klook"
          areas={stayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>ต่อจากนี้</span>
          <h2 className={styles.sectionTitle}>ออกจากสนามบินแล้วไปต่อที่ไหน?</h2>
          <p className={styles.bodyText}>
            แผนเที่ยวในเมือง 3 วันอยู่ใน{" "}
            <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>
              แผนเที่ยวซัปโปโร 3 วัน (ภาษาอังกฤษ)
            </Link>{" "}
            และแผนเที่ยวรอบเกาะหนึ่งสัปดาห์อยู่ใน{" "}
            <Link href="/th/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>
              เที่ยวฮอกไกโด 7 วัน
            </Link>{" "}
            ถ้าจะไปเล่นสกีแบบไปกลับจากโรงแรมในซัปโปโร ดู{" "}
            <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>
              ทริปสกีหนึ่งวันจากซัปโปโร (ภาษาอังกฤษ)
            </Link>{" "}
            และถ้าอยากส่งกระเป๋าล่วงหน้าแทนการลากไปเอง ดู{" "}
            <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>
              บริการส่งกระเป๋าในญี่ปุ่น (ภาษาอังกฤษ)
            </Link>
          </p>
        </section>

        <BookingEsimCard lead="เวลารถไฟ ชานชาลารถบัส และแผนที่ไปโรงแรม เตรียมอินเทอร์เน็ตมือถือให้พร้อมก่อนถึงสนามบินนิวชิโตเสะ" />

        <EsimCtaBottom />

        <FaqList items={faqItems} />

        <Related
          items={[
            { href: "/guides/transport/sapporo-to-niseko-transfer", title: "ซัปโปโรไปนิเซโกะในฤดูหนาว: รถบัสสกี รถไฟ และรถรับส่ง (ภาษาอังกฤษ)" },
            { href: "/guides/attractions/sapporo-3-day-itinerary", title: "แผนเที่ยวซัปโปโร 3 วัน (ภาษาอังกฤษ)" },
            { href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass (2026): ราคาและคุ้มไหม (ภาษาอังกฤษ)" },
            { href: "/th/guides/attractions/sapporo-snow-festival-tours", title: "เทศกาลหิมะซัปโปโร" },
            { href: "/th/guides/attractions/hokkaido-7-day-itinerary", title: "เที่ยวฮอกไกโด 7 วัน" },
            { href: "/guides/attractions/sapporo-ski-day-trip", title: "ทริปสกีหนึ่งวันจากซัปโปโร (ภาษาอังกฤษ)" },
            { href: "/guides/transport/japan-luggage-delivery", title: "บริการส่งกระเป๋าในญี่ปุ่น (ภาษาอังกฤษ)" },
            { href: "/th", title: "คู่มือภาษาไทยทั้งหมด →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>จากนิวชิโตเสะถึงซัปโปโรในการเดินทางเดียว</h2>
            <p className={styles.ctaBannerDesc}>
              นั่ง Rapid Airport หรือจองรถสำหรับกระเป๋าสกีและเที่ยวบินที่ลงดึก แล้วจองที่พักคืนแรกใกล้สถานีซัปโปโร
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TRANSFERS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                รถรับส่งนิวชิโตเสะ →
              </KlookLink>
              <KlookLink href={stayAreas[0].url} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                โรงแรมใกล้สถานีซัปโปโร →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
