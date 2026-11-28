import type { ReactNode } from "react";
import { klookEsim } from "../lib/klook-links";
import { airaloTrackedUrl, ESIM_PLACEMENT, pageTag } from "../lib/esim-placement";
import { cheapestAtLeastGb, cheapestPlan, formatUsd, getProvider, latestCheckedAt, type EsimPlan } from "../lib/esim-prices";
import { VERDICT_CHECKED, VERDICT_CHECKED_ISO, verdictPrices as P, verdictSources as S } from "../lib/esim-verdict";
import { dateLabel, type TranslatedLocale } from "../lib/i18n";
import { klookFor } from "../lib/klook-locale";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, simbyeTrackedUrl } from "../lib/simbye";
import KlookLink from "./KlookLink";
import styles from "../styles/BestEsimJapan.module.css";

/**
 * The one conclusion box at the top of the six eSIM pages with the most impressions
 * (task jtk-20261127-A31): a one-line answer, then a three-row table by use, one button
 * per row. It replaces each page's own "short answer" box rather than sitting beside it.
 *
 *   Short trip  -> Klook Japan eSIM (activity 109393; KlookLink adds the page's aff_adid)
 *   Unlimited   -> Airalo Unlimited (Impact link, subId1 = esim-verdict, subId2 = page)
 *   Long stay   -> Sakura Mobile (its affiliate link)
 *
 * Every yen figure is in lib/esim-verdict.ts with the page it was read on. GA4 tells the
 * box apart by `data-placement="esim-verdict"` (esim_click / affiliate_click `placement`).
 *
 * `lead` replaces the default first line, and `top` adds one button above the table — the
 * Sakura Mobile review uses both so the brand searcher's sign-up button comes first.
 */
/** "https://www.airalo.com/japan-esim" -> "airalo.com/japan-esim". */
const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function EsimVerdictBox({
  route,
  lead,
  top,
  label = "The answer",
  locale,
}: {
  route: string;
  lead?: ReactNode;
  top?: "sakura";
  label?: string;
  /** A translated page: the Simbye-first box below, in that language (task jtk-20261128-P01). */
  locale?: TranslatedLocale;
}) {
  if (locale) return <LocalVerdictBox route={route} locale={locale} />;
  const placement = ESIM_PLACEMENT.verdict;
  const sakuraUrl = getProvider("sakura").affiliateUrl;
  const airaloUrl = airaloTrackedUrl(placement, pageTag(route));
  const btn = { padding: "0.55rem 1rem", fontSize: "0.8rem", whiteSpace: "nowrap" as const };
  const cell = { fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.55 };
  return (
    <div className={styles.verdictBox} data-placement={placement} style={{ marginBottom: "2.5rem" }}>
      <div className={styles.verdictHeader}>
        <span className={styles.verdictLabel}>{label}</span>
      </div>
      <div className={styles.verdictBody}>
        <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
          {lead ?? (
            <>
              <strong>Most travellers: Klook Japan eSIM</strong> (SoftBank 5G or IIJ/docomo, data only, 1–30 days).{" "}
              <strong>Long stay or need a Japanese phone number: Sakura Mobile</strong>, from {P.sakuraMonthly5Gb} a
              month.
            </>
          )}
        </p>
        {top === "sakura" ? (
          <p style={{ margin: "0 0 1.1rem" }}>
            <a href={sakuraUrl} className={styles.verdictBtn} target="_blank" rel="sponsored nofollow noopener">
              Sign up for Sakura Mobile →
            </a>
          </p>
        ) : null}
        <div className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Your trip</th>
                  <th>Get</th>
                  <th>Price (checked {VERDICT_CHECKED})</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tdProvider} style={{ minWidth: "120px" }}>Short trip (up to 30 days)</td>
                  <td style={{ ...cell, minWidth: "190px" }}>
                    <strong>Klook Japan eSIM</strong> — SoftBank 5G or IIJ (docomo), hotspot allowed
                  </td>
                  <td style={{ ...cell, minWidth: "170px" }}>
                    Changes by date; Klook shows yours before you pay
                  </td>
                  <td>
                    <KlookLink href={klookEsim.url} className={styles.pickCta} style={btn} target="_blank" rel="sponsored nofollow noopener">
                      Check Klook eSIM →
                    </KlookLink>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdProvider}>Unlimited data</td>
                  <td style={{ ...cell, minWidth: "190px" }}>
                    <strong>Airalo Unlimited</strong> — 3 GB a day at up to 20 Mbps, then slower
                  </td>
                  <td style={{ ...cell, minWidth: "170px" }}>
                    {P.airaloUnlimited3Days} / 3 days · {P.airaloUnlimited7Days} / 7 days
                  </td>
                  <td>
                    <a href={airaloUrl} className={styles.pickCta} style={btn} target="_blank" rel="sponsored nofollow noopener">
                      Get Airalo Unlimited →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdProvider}>Long stay, Japanese number</td>
                  <td style={{ ...cell, minWidth: "190px" }}>
                    <strong>Sakura Mobile</strong> monthly Voice + Data SIM or eSIM (docomo, 070/080/090 number)
                  </td>
                  <td style={{ ...cell, minWidth: "170px" }}>
                    {P.sakuraMonthly5Gb} a month (5 GB) + {P.sakuraActivation} activation; calls extra
                  </td>
                  <td>
                    <a href={sakuraUrl} className={styles.pickCta} style={btn} target="_blank" rel="sponsored nofollow noopener">
                      Sign up for Sakura →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.7rem", lineHeight: 1.6 }}>
          {/* Plain text, not links: an airalo.com or sakuramobile.jp anchor inside this block
              would be counted as an eSIM referral by the click handler in pages/_app.tsx. */}
          Affiliate links. Prices read on {VERDICT_CHECKED}: Airalo on {host(S.airalo)} (shown in yen; your
          currency may differ) with its speed terms on {host(S.airaloFairUse)}; Sakura Mobile on{" "}
          {host(S.sakuraMonthly)} (tax included). Klook&apos;s network and hotspot terms are from its listing, read{" "}
          {klookEsim.specsCheckedAt}.
        </p>
      </div>
    </div>
  );
}

/**
 * The translated pages' box (task jtk-20261128-P01): the same one-line answer and table as
 * the English box, but Simbye first. Its prices are the daily partner feed's cheapest plan
 * and cheapest 10 GB plan (lib/esim-prices.ts), never a typed number. Klook eSIM stays as the
 * last row, for the reader who wants to pay in their own currency on the Klook account they
 * booked tickets with; its link keeps the page's own aff_adid (KlookLink, no adPlacement).
 * Same data-placement="esim-verdict", so GA4 counts it with the English boxes.
 */
type LocalCopy = {
  label: string;
  lead: string;
  leadRest: string;
  topCta: string;
  colTrip: string;
  colGet: string;
  colPrice: string;
  simbyeTrip: string;
  simbyeGet: string;
  simbyePrice: string;
  simbyeCode: string;
  simbyeCta: string;
  airaloTrip: string;
  airaloGet: string;
  airaloPrice: string;
  airaloCta: string;
  sakuraTrip: string;
  sakuraGet: string;
  sakuraPrice: string;
  sakuraCta: string;
  klookTrip: string;
  klookGet: string;
  klookPrice: string;
  klookCta: string;
  hotspot: string;
  note: string;
  /** "{n} days" in a plan name. */
  days: string;
};

const LOCAL_COPY: Record<TranslatedLocale, LocalCopy> = {
  "zh-tw": {
    label: "結論",
    lead: "大多數旅客：Simbye",
    leadRest:
      "（{networks} 自動選網，純數據）{from} 起（{plan}）。要吃到飽選 Airalo Unlimited；長住或需要日本電話號碼選 Sakura Mobile，月租 {monthly} 起。",
    topCta: "取得 Simbye eSIM，{from} 起 →",
    colTrip: "你的行程",
    colGet: "選這家",
    colPrice: "價格（Simbye 查核日 {feed}）",
    simbyeTrip: "大多數行程（30 天內）",
    simbyeGet: "Simbye 日本 eSIM——{networks}{hotspot}",
    simbyePrice: "{from} 起（{plan}）· {tenPlan} {ten}",
    simbyeCode: "折扣碼 {code} 再折 {percent}%",
    simbyeCta: "取得 Simbye →",
    airaloTrip: "吃到飽",
    airaloGet: "Airalo Unlimited——每天 3 GB 最高 20 Mbps，之後降速",
    airaloPrice: "{d3}／3 天 · {d7}／7 天",
    airaloCta: "取得 Airalo Unlimited →",
    sakuraTrip: "長住、需要日本電話號碼",
    sakuraGet: "Sakura Mobile 月租語音＋數據 SIM 或 eSIM（docomo，070/080/090 號碼）",
    sakuraPrice: "月租 {monthly}（5 GB）＋開通費 {activation}；通話另計",
    sakuraCta: "申辦 Sakura →",
    klookTrip: "想用新台幣、和 Klook 訂單同帳號結帳",
    klookGet: "Klook 日本 eSIM——SoftBank 5G 或 IIJ（docomo），可分享熱點",
    klookPrice: "依日期變動；付款前 Klook 會顯示你的價格",
    klookCta: "查看 Klook eSIM →",
    hotspot: "，可分享熱點",
    note:
      "以上為聯盟連結。Simbye 價格取自其價格資料（{feed} 取得，美元，折扣前）；Airalo 於 {verdict} 在 {airalo} 讀取（以日圓顯示，你的幣別可能不同），速度條件見 {fairUse}；Sakura Mobile 於 {verdict} 在 {sakura} 讀取（含稅）。Klook 的網路與熱點條件來自其 {klook} 的商品資料。",
    days: "{n} 天",
  },
  "zh-cn": {
    label: "结论",
    lead: "多数旅客：Simbye",
    leadRest:
      "（{networks} 自动选网，纯数据）{from} 起（{plan}）。要无限流量选 Airalo Unlimited；长住或需要日本电话号码选 Sakura Mobile，月租 {monthly} 起。",
    topCta: "购买 Simbye eSIM，{from} 起 →",
    colTrip: "你的行程",
    colGet: "选这家",
    colPrice: "价格（Simbye 核查日 {feed}）",
    simbyeTrip: "多数行程（30 天内）",
    simbyeGet: "Simbye 日本 eSIM——{networks}{hotspot}",
    simbyePrice: "{from} 起（{plan}）· {tenPlan} {ten}",
    simbyeCode: "优惠码 {code} 再减 {percent}%",
    simbyeCta: "购买 Simbye →",
    airaloTrip: "无限流量",
    airaloGet: "Airalo Unlimited——每天 3 GB 最高 20 Mbps，之后降速",
    airaloPrice: "{d3}／3 天 · {d7}／7 天",
    airaloCta: "购买 Airalo Unlimited →",
    sakuraTrip: "长住、需要日本电话号码",
    sakuraGet: "Sakura Mobile 月租语音＋数据 SIM 或 eSIM（docomo，070/080/090 号码）",
    sakuraPrice: "月租 {monthly}（5 GB）＋开通费 {activation}；通话另计",
    sakuraCta: "申请 Sakura →",
    klookTrip: "想用人民币、和 Klook 订单同一账号结账",
    klookGet: "Klook 日本 eSIM——SoftBank 5G 或 IIJ（docomo），可开热点",
    klookPrice: "随日期变动；付款前 Klook 会显示你的价格",
    klookCta: "查看 Klook eSIM →",
    hotspot: "，可开热点",
    note:
      "以上为推广联盟链接。Simbye 价格来自其价格数据（{feed} 获取，美元，优惠前）；Airalo 于 {verdict} 在 {airalo} 读取（以日元显示，你的币种可能不同），速度条件见 {fairUse}；Sakura Mobile 于 {verdict} 在 {sakura} 读取（含税）。Klook 的网络与热点条件来自其 {klook} 的商品数据。",
    days: "{n} 天",
  },
  ko: {
    label: "결론",
    lead: "대부분의 여행자: Simbye",
    leadRest:
      " ({networks} 자동 연결, 데이터 전용) {from}부터 ({plan}). 무제한은 Airalo Unlimited, 장기 체류나 일본 전화번호가 필요하면 Sakura Mobile(월 {monthly}부터).",
    topCta: "Simbye eSIM {from}부터 보기 →",
    colTrip: "여행 유형",
    colGet: "추천",
    colPrice: "가격 (Simbye 확인일 {feed})",
    simbyeTrip: "대부분의 여행 (30일 이내)",
    simbyeGet: "Simbye 일본 eSIM — {networks}{hotspot}",
    simbyePrice: "{from}부터 ({plan}) · {tenPlan} {ten}",
    simbyeCode: "코드 {code} 입력 시 {percent}% 추가 할인",
    simbyeCta: "Simbye 보기 →",
    airaloTrip: "무제한 데이터",
    airaloGet: "Airalo Unlimited — 하루 3 GB까지 최대 20 Mbps, 이후 감속",
    airaloPrice: "{d3} / 3일 · {d7} / 7일",
    airaloCta: "Airalo Unlimited 보기 →",
    sakuraTrip: "장기 체류, 일본 전화번호",
    sakuraGet: "Sakura Mobile 월정액 음성+데이터 SIM 또는 eSIM (docomo, 070/080/090 번호)",
    sakuraPrice: "월 {monthly} (5 GB) + 개통비 {activation}, 통화료 별도",
    sakuraCta: "Sakura 신청 →",
    klookTrip: "원화로, 클룩 예약과 같은 계정으로 결제하고 싶다면",
    klookGet: "클룩 일본 eSIM — SoftBank 5G 또는 IIJ(docomo), 테더링 가능",
    klookPrice: "날짜에 따라 다름, 결제 전 클룩에서 가격 표시",
    klookCta: "클룩 eSIM 보기 →",
    hotspot: ", 테더링 가능",
    note:
      "제휴 링크입니다. Simbye 가격은 Simbye 가격 정보 기준({feed} 확인, 미국 달러, 할인 전). Airalo는 {verdict}에 {airalo}에서 확인(엔화 표시, 결제 통화는 다를 수 있음), 속도 조건은 {fairUse}. Sakura Mobile은 {verdict}에 {sakura}에서 확인(세금 포함). 클룩의 통신망·테더링 조건은 {klook} 클룩 상품 데이터 기준입니다.",
    days: "{n}일",
  },
  th: {
    label: "สรุป",
    lead: "นักท่องเที่ยวส่วนใหญ่: Simbye",
    leadRest:
      " (เชื่อมต่อ {networks} อัตโนมัติ เน็ตอย่างเดียว) เริ่ม {from} ({plan}) ถ้าต้องการเน็ตไม่จำกัดเลือก Airalo Unlimited ถ้าอยู่ยาวหรือต้องการเบอร์โทรญี่ปุ่นเลือก Sakura Mobile เริ่มเดือนละ {monthly}",
    topCta: "ดู Simbye eSIM เริ่ม {from} →",
    colTrip: "ทริปของคุณ",
    colGet: "เลือก",
    colPrice: "ราคา (Simbye ตรวจเมื่อ {feed})",
    simbyeTrip: "ทริปส่วนใหญ่ (ไม่เกิน 30 วัน)",
    simbyeGet: "Simbye eSIM ญี่ปุ่น — {networks}{hotspot}",
    simbyePrice: "เริ่ม {from} ({plan}) · {tenPlan} {ten}",
    simbyeCode: "ใส่โค้ด {code} ลดเพิ่ม {percent}%",
    simbyeCta: "ดู Simbye →",
    airaloTrip: "เน็ตไม่จำกัด",
    airaloGet: "Airalo Unlimited — วันละ 3 GB ที่สูงสุด 20 Mbps จากนั้นความเร็วลดลง",
    airaloPrice: "{d3} / 3 วัน · {d7} / 7 วัน",
    airaloCta: "ดู Airalo Unlimited →",
    sakuraTrip: "อยู่ยาว ต้องการเบอร์ญี่ปุ่น",
    sakuraGet: "Sakura Mobile ซิมหรือ eSIM รายเดือน Voice + Data (docomo เบอร์ 070/080/090)",
    sakuraPrice: "เดือนละ {monthly} (5 GB) + ค่าเปิดใช้ {activation} ค่าโทรคิดแยก",
    sakuraCta: "สมัคร Sakura →",
    klookTrip: "อยากจ่ายเป็นเงินบาทในบัญชี Klook เดียวกับที่จองอย่างอื่น",
    klookGet: "Klook eSIM ญี่ปุ่น — SoftBank 5G หรือ IIJ (docomo) แชร์ฮอตสปอตได้",
    klookPrice: "เปลี่ยนตามวันที่ Klook แสดงราคาของคุณก่อนชำระเงิน",
    klookCta: "ดู Klook eSIM →",
    hotspot: " แชร์ฮอตสปอตได้",
    note:
      "เป็นลิงก์พันธมิตร ราคา Simbye มาจากฟีดราคาของ Simbye (ดึงเมื่อ {feed} ดอลลาร์สหรัฐ ก่อนส่วนลด) Airalo อ่านเมื่อ {verdict} จาก {airalo} (แสดงเป็นเยน สกุลเงินของคุณอาจต่างออกไป) เงื่อนไขความเร็วจาก {fairUse} Sakura Mobile อ่านเมื่อ {verdict} จาก {sakura} (รวมภาษี) เครือข่ายและเงื่อนไขฮอตสปอตของ Klook มาจากข้อมูลสินค้าของ Klook วันที่ {klook}",
    days: "{n} วัน",
  },
};

const EN_MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "6 Nov 2026" -> "2026-11-6", for dateLabel(). */
const enToIso = (s: string) => {
  const m = s.match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/);
  return m ? `${m[3]}-${EN_MONTH.indexOf(m[2]) + 1}-${m[1]}` : s;
};

const fill = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);

function LocalVerdictBox({ route, locale }: { route: string; locale: TranslatedLocale }) {
  const c = LOCAL_COPY[locale];
  const placement = ESIM_PLACEMENT.verdict;
  const tag = pageTag(route);
  const cheapest = cheapestPlan("simbye");
  const ten = cheapestAtLeastGb("simbye", 10);
  if (!cheapest || !ten) return null;
  const planName = (p: EsimPlan) => p.name.replace(/(\d+) days?/, (_, n: string) => c.days.replace("{n}", n));
  const simbyeUrl = simbyeTrackedUrl(placement, tag);
  const sakuraUrl = getProvider("sakura").affiliateUrl;
  const airaloUrl = airaloTrackedUrl(placement, tag);
  const feedIso = latestCheckedAt()?.slice(0, 10);
  const v: Record<string, string> = {
    networks: getProvider("simbye").network,
    from: formatUsd(cheapest.priceUsd),
    plan: planName(cheapest),
    ten: formatUsd(ten.priceUsd),
    tenPlan: planName(ten),
    hotspot: cheapest.tethering ? c.hotspot : "",
    code: SIMBYE_DISCOUNT_CODE,
    percent: String(SIMBYE_DISCOUNT_PERCENT),
    d3: P.airaloUnlimited3Days,
    d7: P.airaloUnlimited7Days,
    monthly: P.sakuraMonthly5Gb,
    activation: P.sakuraActivation,
    feed: feedIso ? dateLabel(feedIso, locale) : "—",
    verdict: dateLabel(VERDICT_CHECKED_ISO, locale),
    airalo: host(S.airalo),
    fairUse: host(S.airaloFairUse),
    sakura: host(S.sakuraMonthly),
    klook: dateLabel(enToIso(klookEsim.specsCheckedAt), locale),
  };
  const btn = { padding: "0.55rem 1rem", fontSize: "0.8rem", whiteSpace: "nowrap" as const };
  const cell = { fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.55 };
  const out = (href: string, label: string) => (
    <a href={href} className={styles.pickCta} style={btn} target="_blank" rel="sponsored nofollow noopener">
      {label}
    </a>
  );
  const rows: { trip: string; get: string; price: ReactNode; cta: ReactNode }[] = [
    {
      trip: c.simbyeTrip,
      get: fill(c.simbyeGet, v),
      price: (
        <>
          {fill(c.simbyePrice, v)}
          <br />
          <strong>{fill(c.simbyeCode, v)}</strong>
        </>
      ),
      cta: out(simbyeUrl, c.simbyeCta),
    },
    { trip: c.airaloTrip, get: c.airaloGet, price: fill(c.airaloPrice, v), cta: out(airaloUrl, c.airaloCta) },
    { trip: c.sakuraTrip, get: c.sakuraGet, price: fill(c.sakuraPrice, v), cta: out(sakuraUrl, c.sakuraCta) },
    {
      trip: c.klookTrip,
      get: c.klookGet,
      price: c.klookPrice,
      cta: (
        <KlookLink href={klookFor(klookEsim.url, locale)} className={styles.pickCta} style={btn} target="_blank" rel="sponsored nofollow noopener">
          {c.klookCta}
        </KlookLink>
      ),
    },
  ];
  return (
    <div className={styles.verdictBox} data-placement={placement} style={{ marginBottom: "2.5rem" }}>
      <div className={styles.verdictHeader}>
        <span className={styles.verdictLabel}>{c.label}</span>
      </div>
      <div className={styles.verdictBody}>
        <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
          <strong>{c.lead}</strong>
          {fill(c.leadRest, v)}
        </p>
        <p style={{ margin: "0 0 1.1rem" }}>
          <a href={simbyeUrl} className={styles.verdictBtn} target="_blank" rel="sponsored nofollow noopener">
            {fill(c.topCta, v)}
          </a>
        </p>
        <div className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{c.colTrip}</th>
                  <th>{c.colGet}</th>
                  <th>{fill(c.colPrice, v)}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.trip}>
                    <td className={styles.tdProvider} style={{ minWidth: "120px" }}>{r.trip}</td>
                    <td style={{ ...cell, minWidth: "190px" }}>{r.get}</td>
                    <td style={{ ...cell, minWidth: "170px" }}>{r.price}</td>
                    <td>{r.cta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Plain text, not links (see the English box above). */}
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.7rem", lineHeight: 1.6 }}>{fill(c.note, v)}</p>
      </div>
    </div>
  );
}
