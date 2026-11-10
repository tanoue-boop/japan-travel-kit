import KlookLink from "./KlookLink";
import { useComponentLocale } from "./componentLocale";
import { dateLabel, type Locale } from "../lib/i18n";
import { PRICES, checkedLabel } from "../lib/attraction-prices";
import { klookEsim, teamlabPlanetsTicketUrl, tokyoSubwayTicket, tsukijiCultureFoodTour } from "../lib/klook-links";
import { klookFor } from "../lib/klook-locale";
import styles from "../styles/BestEsimJapan.module.css";

/**
 * The first two blocks of every edition of /guides/attractions/teamlab-planets-tickets
 * (task jtk-20261106-A24): the answer table with the Klook button, then the three things
 * to book for the same day. Words live here once per language, as in BookingEsimCard.
 *
 * The date comes from PRICES in lib/attraction-prices.ts. Two rows
 * say "Not stated officially" on purpose: teamLab publishes neither its busy hours nor a
 * visit length, and the planning figure is labelled as ours.
 */
type Copy = {
  label: string;
  rows: { item: string; detail: string }[];
  cta: string;
  source: string;
  sameLabel: string;
  sameTitle: string;
  sameIntro: string;
  same: { title: string; why: string; cta: string }[];
  sameNote: string;
};

const P = PRICES.teamlabPlanets;

const COPY: Record<Locale, Copy> = {
  en: {
    label: "The short answer",
    rows: [
      { item: "Price", detail: "Adult from ¥3,800 (priced by date and time), junior and senior high school ¥2,800, ages 4–12 ¥1,500, 3 and under free, Premium Pass ¥12,000" },
      { item: "Hours", detail: "08:00–22:00 (08:00–20:00 on 31 Dec–2 Jan). Last entry 1 hour before closing" },
      { item: "Closed", detail: "Thu 3 Dec 2026 and Thu 14 Jan 2027" },
      { item: "How to book", detail: "Online only, for a date and admission time. Nothing is sold at the museum. Sellers: official store, Lawson Ticket, Seven Ticket, Klook" },
      { item: "Busiest times", detail: "Not stated officially. The official store says only that you may wait 30–60 minutes to be admitted" },
      { item: "Time needed", detail: "Not stated officially. We plan on 1.5–2 hours, including lockers and drying off" },
      { item: "From Shin-Toyosu Station", detail: "3 minutes on foot from Exit 1A (Yurikamome Line)" },
      { item: "From Toyosu Station", detail: "10 minutes on foot from Exit 7 (Tokyo Metro Yurakucho Line), along the Yurikamome viaduct" },
    ],
    cta: "Check teamLab Planets tickets on Klook →",
    source: "Read on teamlab.art and the official ticket store (teamlabplanets.dmm.com) on {date}.",
    sameLabel: "Book for the same day",
    sameTitle: "What to book for the same day",
    sameIntro: "Three things that make a Toyosu day work, each worth sorting before you travel.",
    same: [
      { title: "Klook Japan eSIM", why: "Your QR ticket opens on your phone, so you need data at the door.", cta: "Check Klook eSIM →" },
      { title: "Tsukiji food tour", why: "A guided morning at the Outer Market, a short trip from Toyosu.", cta: "Check the Tsukiji tour →" },
      { title: "Tokyo Subway Ticket", why: "Covers the Yurakucho Line to Toyosu Station. It does not cover the Yurikamome.", cta: "Check the subway pass →" },
    ],
    sameNote: "Affiliate links: Klook pays us a commission at no extra cost to you. Klook prices change by date, so no Klook price is shown here.",
  },
  "zh-tw": {
    label: "快速解答",
    rows: [
      { item: "票價", detail: "成人 ¥3,800 起（依日期與時段變動），國高中生 ¥2,800，4–12 歲 ¥1,500，3 歲以下免費，Premium Pass ¥12,000" },
      { item: "營業時間", detail: "08:00–22:00（12/31–1/2 為 08:00–20:00），閉館前 1 小時停止入場" },
      { item: "休館日", detail: "2026/12/3（四）、2027/1/14（四）" },
      { item: "預約方式", detail: "僅限線上預約，須指定日期與入場時間，現場不售票。購票管道：官方售票網站、Lawson Ticket、Seven Ticket、Klook" },
      { item: "人潮尖峰時段", detail: "官方未公布。官方售票網站僅說明入場可能需等候 30–60 分鐘" },
      { item: "所需時間", detail: "官方未公布。我們的規劃時間是 1.5–2 小時，含置物櫃與擦乾雙腳的時間" },
      { item: "新豐洲站出發", detail: "1A 出口步行 3 分鐘（百合海鷗線）" },
      { item: "豐洲站出發", detail: "7 號出口步行 10 分鐘（東京地鐵有樂町線），沿百合海鷗線高架前進" },
    ],
    cta: "在 Klook 查看 teamLab Planets 門票 →",
    source: "{date} 查閱 teamlab.art 與官方售票網站（teamlabplanets.dmm.com）。",
    sameLabel: "同一天要訂的",
    sameTitle: "同一天可以一起訂的項目",
    sameIntro: "這三項能讓豐洲這一天更順利，建議出發前先準備好。",
    same: [
      { title: "Klook 日本 eSIM", why: "QR Code 門票要用手機開啟，到了入口就需要網路。", cta: "查看 Klook eSIM →" },
      { title: "築地美食導覽", why: "上午逛築地場外市場的導覽行程，從豐洲過去不遠。", cta: "查看築地導覽 →" },
      { title: "東京地鐵票", why: "可搭有樂町線到豐洲站，但不含百合海鷗線。", cta: "查看地鐵票 →" },
    ],
    sameNote: "以上為聯盟連結，您支付的價格不變，Klook 會支付我們分潤。Klook 價格依日期而變，因此這裡不列 Klook 價格。",
  },
  "zh-cn": {
    label: "快速解答",
    rows: [
      { item: "票价", detail: "成人 ¥3,800 起（随日期与时段变动），初高中生 ¥2,800，4–12 岁 ¥1,500，3 岁及以下免费，Premium Pass ¥12,000" },
      { item: "开放时间", detail: "08:00–22:00（12/31–1/2 为 08:00–20:00），闭馆前 1 小时停止入场" },
      { item: "闭馆日", detail: "2026/12/3（周四）、2027/1/14（周四）" },
      { item: "预约方式", detail: "仅限线上预约，须指定日期与入场时间，现场不售票。购票渠道：官方售票网站、Lawson Ticket、Seven Ticket、Klook" },
      { item: "人流高峰时段", detail: "官方未公布。官方售票网站仅说明入场可能需等候 30–60 分钟" },
      { item: "所需时间", detail: "官方未公布。我们按 1.5–2 小时规划，含存物柜与擦干双脚的时间" },
      { item: "从新丰洲站出发", detail: "1A 出口步行 3 分钟（百合海鸥线）" },
      { item: "从丰洲站出发", detail: "7 号出口步行 10 分钟（东京地铁有乐町线），沿百合海鸥线高架前行" },
    ],
    cta: "在 Klook 查看 teamLab Planets 门票 →",
    source: "{date} 查阅 teamlab.art 与官方售票网站（teamlabplanets.dmm.com）。",
    sameLabel: "同一天要订的",
    sameTitle: "同一天可以一起订的项目",
    sameIntro: "这三项能让丰洲这一天更顺利，建议出发前先准备好。",
    same: [
      { title: "Klook 日本 eSIM", why: "二维码门票要用手机打开，到了入口就需要网络。", cta: "查看 Klook eSIM →" },
      { title: "筑地美食导览", why: "上午逛筑地场外市场的导览行程，从丰洲过去不远。", cta: "查看筑地导览 →" },
      { title: "东京地铁票", why: "可乘有乐町线到丰洲站，但不含百合海鸥线。", cta: "查看地铁票 →" },
    ],
    sameNote: "以上部分链接为推广联盟链接，你无需支付额外费用，我们可能获得佣金。Klook 价格随日期变化，因此这里不列 Klook 价格。",
  },
  ko: {
    label: "핵심 요약",
    rows: [
      { item: "가격", detail: "성인 ¥3,800부터(날짜와 시간에 따라 변동), 중・고등학생 ¥2,800, 만 4~12세 ¥1,500, 만 3세 이하 무료, Premium Pass ¥12,000" },
      { item: "운영 시간", detail: "08:00–22:00(12/31~1/2는 08:00–20:00), 마지막 입장은 폐관 1시간 전" },
      { item: "휴관일", detail: "2026년 12월 3일(목), 2027년 1월 14일(목)" },
      { item: "예약 방법", detail: "온라인으로만 날짜와 입장 시간을 지정해 예약합니다. 현장 판매는 없습니다. 판매처: 공식 스토어, Lawson Ticket, Seven Ticket, 클룩" },
      { item: "붐비는 시간대", detail: "공식 안내 없음. 공식 스토어는 입장까지 30~60분 기다릴 수 있다고만 안내합니다" },
      { item: "소요 시간", detail: "공식 안내 없음. 저희는 보관함과 물기 닦는 시간까지 1.5~2시간으로 잡습니다" },
      { item: "신토요스역에서", detail: "1A 출구에서 도보 3분(유리카모메선)" },
      { item: "도요스역에서", detail: "7번 출구에서 도보 10분(도쿄 메트로 유라쿠초선), 유리카모메 고가를 따라 이동" },
    ],
    cta: "클룩에서 팀랩 플래닛 티켓 보기 →",
    source: "{date}에 teamlab.art와 공식 티켓 스토어(teamlabplanets.dmm.com)에서 확인했습니다.",
    sameLabel: "같은 날 함께 예약",
    sameTitle: "같은 날 함께 예약하면 좋은 것",
    sameIntro: "도요스 여행을 편하게 해 줄 세 가지입니다. 출발 전에 준비해 두세요.",
    same: [
      { title: "클룩 일본 eSIM", why: "QR 티켓을 휴대폰으로 열어야 하므로 입구에서 모바일 데이터가 필요합니다.", cta: "클룩 eSIM 보기 →" },
      { title: "쓰키지 푸드 투어", why: "오전에 쓰키지 장외시장을 도는 가이드 투어로, 도요스에서 가깝습니다.", cta: "쓰키지 투어 보기 →" },
      { title: "도쿄 서브웨이 티켓", why: "유라쿠초선으로 도요스역까지 갈 수 있지만 유리카모메선은 포함되지 않습니다.", cta: "서브웨이 티켓 보기 →" },
    ],
    sameNote: "제휴 링크이며, 추가 비용 없이 클룩이 저희에게 수수료를 지급합니다. 클룩 요금은 날짜에 따라 달라져 여기에 클룩 요금을 적지 않습니다.",
  },
  th: {
    label: "คำตอบสั้น ๆ",
    rows: [
      { item: "ราคา", detail: "ผู้ใหญ่เริ่มต้น ¥3,800 (เปลี่ยนตามวันและเวลา) นักเรียน ม.ต้น–ม.ปลาย ¥2,800 อายุ 4–12 ปี ¥1,500 อายุ 3 ปีลงมาฟรี Premium Pass ¥12,000" },
      { item: "เวลาเปิดทำการ", detail: "08:00–22:00 (31 ธ.ค.–2 ม.ค. เปิด 08:00–20:00) เข้าครั้งสุดท้าย 1 ชั่วโมงก่อนปิด" },
      { item: "วันปิด", detail: "พฤหัสบดี 3 ธ.ค. 2026 และพฤหัสบดี 14 ม.ค. 2027" },
      { item: "วิธีจอง", detail: "จองออนไลน์เท่านั้น เลือกวันและเวลาเข้าชม ไม่มีจำหน่ายบัตรหน้างาน ช่องทางซื้อ: เว็บไซต์จำหน่ายบัตรอย่างเป็นทางการ, Lawson Ticket, Seven Ticket, Klook" },
      { item: "ช่วงที่คนเยอะ", detail: "ไม่มีข้อมูลอย่างเป็นทางการ เว็บไซต์จำหน่ายบัตรอย่างเป็นทางการระบุเพียงว่าอาจต้องรอเข้า 30–60 นาที" },
      { item: "เวลาที่ใช้", detail: "ไม่มีข้อมูลอย่างเป็นทางการ เราวางแผนไว้ 1.5–2 ชั่วโมง รวมเวลาใช้ล็อกเกอร์และเช็ดตัว" },
      { item: "จากสถานี Shin-Toyosu", detail: "เดิน 3 นาทีจากทางออก 1A (สาย Yurikamome)" },
      { item: "จากสถานี Toyosu", detail: "เดิน 10 นาทีจากทางออก 7 (สาย Tokyo Metro Yurakucho) ตามแนวรางยกระดับของ Yurikamome" },
    ],
    cta: "ดูตั๋ว teamLab Planets บน Klook →",
    source: "ตรวจสอบข้อมูลจาก teamlab.art และเว็บไซต์จำหน่ายบัตรอย่างเป็นทางการ (teamlabplanets.dmm.com) เมื่อ {date}",
    sameLabel: "จองสำหรับวันเดียวกัน",
    sameTitle: "สิ่งที่ควรจองไว้สำหรับวันเดียวกัน",
    sameIntro: "สามสิ่งที่ช่วยให้เที่ยวโทโยสุได้ราบรื่น ควรเตรียมไว้ก่อนออกเดินทาง",
    same: [
      { title: "Klook eSIM ญี่ปุ่น", why: "ตั๋ว QR ต้องเปิดบนมือถือ จึงต้องมีอินเทอร์เน็ตมือถือที่หน้าทางเข้า", cta: "ดู Klook eSIM →" },
      { title: "ทัวร์อาหารสึกิจิ", why: "ทัวร์พร้อมไกด์ช่วงเช้าที่ตลาดนอกสึกิจิ เดินทางจากโทโยสุไม่ไกล", cta: "ดูทัวร์สึกิจิ →" },
      { title: "Tokyo Subway Ticket", why: "ใช้สาย Yurakucho ไปสถานี Toyosu ได้ แต่ไม่รวมสาย Yurikamome", cta: "ดูพาสรถไฟใต้ดิน →" },
    ],
    sameNote: "เป็นลิงก์พันธมิตร Klook จ่ายค่าคอมมิชชันให้เราโดยคุณไม่ต้องจ่ายเพิ่ม ราคาของ Klook เปลี่ยนตามวันที่ จึงไม่ได้ระบุราคา Klook ไว้ที่นี่",
  },
};

const localized = (url: string, locale: Locale) => (locale === "en" ? url : klookFor(url, locale));

export function PlanetsAnswer() {
  const locale = useComponentLocale();
  const copy = COPY[locale];
  const date = locale === "en" ? checkedLabel(P.checked) : dateLabel(P.checked, locale);
  return (
    <div className={styles.verdictBox}>
      <div className={styles.verdictHeader}>
        <span className={styles.verdictLabel}>{copy.label}</span>
      </div>
      <div className={styles.verdictBody}>
        <div className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <tbody>
                {copy.rows.map((row) => (
                  <tr key={row.item}>
                    <td className={styles.tdProvider}>{row.item}</td>
                    <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
          <KlookLink href={localized(teamlabPlanetsTicketUrl, locale)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
            {copy.cta}
          </KlookLink>
        </div>
        <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
          {copy.source.replace("{date}", date)}
        </p>
      </div>
    </div>
  );
}

export function PlanetsSameDay() {
  const locale = useComponentLocale();
  const copy = COPY[locale];
  const urls = [klookEsim.url, tsukijiCultureFoodTour.url, tokyoSubwayTicket.url];
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>{copy.sameLabel}</span>
      <h2 className={styles.sectionTitle}>{copy.sameTitle}</h2>
      <p className={styles.bodyText}>{copy.sameIntro}</p>
      <ul className={styles.pickList}>
        {copy.same.map((item, i) => (
          <li key={item.title}>
            <span className={styles.proIcon}>▸</span>
            <span>
              <strong>{item.title}</strong> — {item.why}{" "}
              <KlookLink
                href={localized(urls[i], locale)}
                target="_blank"
                rel="sponsored noopener"
                style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {item.cta}
              </KlookLink>
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        {copy.sameNote}
      </p>
    </section>
  );
}
