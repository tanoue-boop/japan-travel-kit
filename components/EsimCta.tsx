import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useComponentLocale } from "./componentLocale";
import KlookLink from "./KlookLink";
import { ESIM_PLACEMENT, airaloTrackedUrl, pageTag } from "../lib/esim-placement";
import { esimPicksCopy } from "../lib/esim-picks-copy";
import { cheapestPlan, formatDate, formatUsd, getProvider, siteCheapest, type EsimPlan } from "../lib/esim-prices";
import { dateLabel, type Locale } from "../lib/i18n";
import { KLOOK_ESIM_FACTS } from "../lib/klook-esim-facts";
import { klookEsim } from "../lib/klook-links";
import { klookFor } from "../lib/klook-locale";
import { SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT, simbyeTrackedUrl } from "../lib/simbye";
import styles from "../styles/EsimCta.module.css";

/**
 * The site-wide eSIM call to action (task jtk-20261111-E01, 11 Nov 2026).
 *
 * Two blocks, one component file, every guide page:
 *   - <EsimCtaTop />    a small box straight after the page's answer, before the first H2;
 *   - <EsimCtaBottom /> the detailed "Before you fly" box near the end of the page.
 * The eSIM guides carry their own comparison, so they get the top box only.
 *
 * Order: Simbye, Klook eSIM, Airalo, Sakura Mobile. Each row says why it sits where it
 * does, using only facts already recorded on this site: prices and check dates from
 * data/esim-prices.json (refreshed daily), Klook's listing facts from
 * lib/klook-esim-facts.ts, and the provider clauses in lib/esim-picks-copy.ts. Where
 * Simbye is not the cheapest plan in the price file the "lowest price" wording drops out.
 *
 * Every link is an existing affiliate link: simbyeTrackedUrl and airaloTrackedUrl only add
 * the placement to the URL, Klook goes through KlookLink (the page's eSIM ad id where it
 * has one, otherwise the page's own), Sakura and SafetyWing are the links already in use.
 *
 * Measurement: each block carries data-placement (esim-top / esim-bottom) and
 * data-position (top / bottom). The click handler in pages/_app.tsx sends both with the
 * affiliate_click event, next to the partner it resolves from the link's host.
 */

const SAFETYWING_URL =
  "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";
/** The day SafetyWing's terms quoted below were read (pages/guides/money/japan-ski-travel-insurance.tsx). */
const SAFETYWING_CHECKED = "2026-11-06";

type Copy = {
  topLabel: string;
  /** {price} {plan} {discounted} {code} {percent} */
  topLine: string;
  /** Shown after topLine when Simbye has the lowest plan in the price file. */
  topLowest: string;
  /** {networks} */
  networks: string;
  others: string;
  bottomHeading: string;
  bottomIntro: string;
  simbyeFrom: string;
  simbyeCode: string;
  lowest: string;
  hotspot: string;
  /** {price} {plan} */
  from: string;
  /** {simbye} is orderLowest or orderNetworks; {date} the last price check. */
  orderNote: string;
  orderLowest: string;
  orderNetworks: string;
  insuranceName: string;
  insuranceText: string;
  insuranceSki: string;
  insuranceCta: string;
  insuranceMore?: { href: string; label: string };
  note: string;
  /** {swdate} */
  swNote: string;
  days: string;
  /** After a bold label: ": " or a full-width colon. */
  sep: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    topLabel: "Mobile data for Japan",
    topLine: "Our first pick is Simbye: {plan} from {price}, or {discounted} with code {code} ({percent}% off).",
    topLowest: "That is the lowest plan price in our price data.",
    networks: "Networks Simbye lists for Japan: {networks}.",
    others: "Other options:",
    bottomHeading: "What to have ready before you fly: mobile data",
    bottomIntro:
      "Set up an eSIM by QR code at home and it connects when you land, so maps, tickets and train times work from the airport. Four options, in the order we suggest them, each with the reason.",
    simbyeFrom: "From {price} ({plan}).",
    simbyeCode: "{discounted} with code {code} ({percent}% off).",
    lowest: "Lowest plan price in our price data.",
    hotspot: "Hotspot allowed on every Japan plan.",
    from: "From {price} ({plan}).",
    orderNote:
      "Why this order: {simbye}; Klook eSIM sits in the same account as your Klook bookings; Airalo installs from its own app with live chat; Sakura Mobile is the one with a Japanese-number option. Prices from our daily price check, last run {date}.",
    orderLowest: "Simbye has the lowest plan price in our price data",
    orderNetworks: "Simbye lists all four Japanese networks",
    insuranceName: "Travel insurance",
    insuranceText:
      "SafetyWing Nomad Insurance is a subscription you can start before or during the trip, with no deductible on either plan.",
    insuranceSki: "It covers skiing and snowboarding on piste with a helmet, not off-piste.",
    insuranceCta: "Get a SafetyWing quote →",
    insuranceMore: { href: "/guides/money/best-travel-insurance-japan", label: "Compare insurers" },
    note: "Affiliate links: we may earn a commission at no extra cost to you. Check the plan and terms on the seller's page before you buy.",
    swNote: "SafetyWing terms read {swdate}.",
    days: "{n} days",
    sep: ": ",
  },
  ko: {
    topLabel: "일본 모바일 데이터",
    topLine: "첫 번째 추천은 Simbye입니다: {plan} {price}부터, 코드 {code} 입력 시 {percent}% 할인되어 {discounted}.",
    topLowest: "저희 요금 데이터에서 가장 낮은 요금제 가격입니다.",
    networks: "Simbye가 밝힌 일본 회선: {networks}.",
    others: "다른 선택지:",
    bottomHeading: "출발 전에 준비할 것: 모바일 데이터",
    bottomIntro:
      "출발 전에 QR 코드로 eSIM을 설정해 두면 도착하자마자 쓸 수 있습니다. 추천 순서대로 네 가지와 그 이유입니다.",
    simbyeFrom: "{price}부터 ({plan}).",
    simbyeCode: "코드 {code} 입력 시 {percent}% 할인: {discounted}.",
    lowest: "확인한 요금제 중 최저가.",
    hotspot: "모든 일본 요금제에서 테더링 가능.",
    from: "{price}부터 ({plan}).",
    orderNote:
      "이 순서인 이유: {simbye}. 클룩 eSIM은 클룩의 다른 예약과 같은 계정에서 관리됩니다. Airalo는 자체 앱으로 설치하고 라이브 채팅을 지원합니다. Sakura Mobile은 일본 전화번호가 있는 요금제를 고를 수 있습니다. 가격은 매일 확인하는 요금 데이터 기준이며 마지막 확인일은 {date}입니다.",
    orderLowest: "Simbye는 저희 요금 데이터에서 요금제 가격이 가장 낮습니다",
    orderNetworks: "Simbye는 일본 4개 통신사 회선을 모두 표시합니다",
    insuranceName: "여행자 보험",
    insuranceText: "SafetyWing Nomad Insurance는 출발 전이나 여행 중에도 시작할 수 있는 구독형 보험이며, 두 플랜 모두 자기부담금이 없습니다.",
    insuranceSki: "헬멧을 쓰고 정규 슬로프에서 타는 스키·스노보드는 보장하며, 오프피스트는 보장하지 않습니다.",
    insuranceCta: "SafetyWing 견적 보기 →",
    note: "제휴 링크이며, 추가 비용 없이 저희가 수수료를 받을 수 있습니다. 구매 전에 판매처 페이지에서 요금제와 조건을 확인하세요.",
    swNote: "SafetyWing 조건 확인일: {swdate}.",
    days: "{n}일",
    sep: ": ",
  },
  "zh-tw": {
    topLabel: "日本行動上網",
    topLine: "首選 Simbye：{plan} {price} 起，輸入折扣碼 {code} 享 {percent}% 折扣，為 {discounted}。",
    topLowest: "這是我們價格資料中最低的方案價格。",
    networks: "Simbye 標示的日本線路：{networks}。",
    others: "其他選擇：",
    bottomHeading: "出發前要準備的東西：行動上網",
    bottomIntro: "出發前掃 QR Code 設定 eSIM，抵達後馬上就能上網。以下依推薦順序列出四個選擇與理由。",
    simbyeFrom: "{price} 起（{plan}）。",
    simbyeCode: "輸入折扣碼 {code} 享 {percent}% 折扣：{discounted}。",
    lowest: "已確認方案中的最低價。",
    hotspot: "所有日本方案皆可分享熱點。",
    from: "{price} 起（{plan}）。",
    orderNote:
      "排序理由：{simbye}；Klook eSIM 可與你的其他 Klook 訂單在同一個帳號中管理；Airalo 可透過自家 App 安裝，並提供線上客服；Sakura Mobile 有附日本電話號碼的方案可選。價格來自每日價格查核，最近一次為 {date}。",
    orderLowest: "Simbye 是我們價格資料中方案價格最低的",
    orderNetworks: "Simbye 標示涵蓋日本四家電信線路",
    insuranceName: "旅遊保險",
    insuranceText: "SafetyWing Nomad Insurance 為訂閱制，出發前或旅途中都能開始投保，兩種方案都不需負擔自負額。",
    insuranceSki: "在正規雪道並戴安全帽滑雪、單板滑雪在保障範圍內，非雪道（off-piste）不保。",
    insuranceCta: "查看 SafetyWing 報價 →",
    note: "以上為聯盟連結，您支付的價格不變，我們可能獲得分潤。購買前請在賣家頁面確認方案與條款。",
    swNote: "SafetyWing 條款確認日：{swdate}。",
    days: "{n} 天",
    sep: "：",
  },
  "zh-cn": {
    topLabel: "日本移动上网",
    topLine: "首选 Simbye：{plan} {price} 起，输入优惠码 {code} 可享 {percent}% 折扣，为 {discounted}。",
    topLowest: "这是我们价格数据中最低的套餐价格。",
    networks: "Simbye 标注的日本网络：{networks}。",
    others: "其他选择：",
    bottomHeading: "出发前要准备的东西：移动上网",
    bottomIntro: "出发前扫二维码设置 eSIM，抵达日本后马上就能上网。以下按推荐顺序列出四个选择及理由。",
    simbyeFrom: "{price} 起（{plan}）。",
    simbyeCode: "输入优惠码 {code} 可享受 {percent}% 折扣：{discounted}。",
    lowest: "已核实套餐中的最低价。",
    hotspot: "所有日本套餐均可共享热点。",
    from: "{price} 起（{plan}）。",
    orderNote:
      "排序理由：{simbye}；Klook eSIM 可以和其他 Klook 订单在同一个账户中管理；Airalo 用自家 App 安装并提供在线客服；Sakura Mobile 有带日本电话号码的套餐可选。价格来自每日价格核查，最近一次为 {date}。",
    orderLowest: "Simbye 是我们价格数据中套餐价格最低的",
    orderNetworks: "Simbye 标注覆盖日本四家运营商网络",
    insuranceName: "旅行保险",
    insuranceText: "SafetyWing Nomad Insurance 为订阅制，出发前或旅途中都可以开始投保，两种方案均无免赔额。",
    insuranceSki: "在正规雪道并佩戴头盔滑雪、单板滑雪在保障范围内，非雪道（off-piste）不保。",
    insuranceCta: "查看 SafetyWing 报价 →",
    note: "以上部分链接为推广联盟链接，你无需支付额外费用，我们可能获得佣金。购买前请在卖家页面确认套餐和条款。",
    swNote: "SafetyWing 条款核查日期：{swdate}。",
    days: "{n} 天",
    sep: "：",
  },
  th: {
    topLabel: "อินเทอร์เน็ตมือถือในญี่ปุ่น",
    topLine: "ตัวเลือกแรกของเราคือ Simbye: {plan} เริ่ม {price} ใส่โค้ด {code} ลด {percent}% เหลือ {discounted}",
    topLowest: "เป็นราคาแพ็กเกจต่ำสุดในข้อมูลราคาของเรา",
    networks: "เครือข่ายในญี่ปุ่นที่ Simbye ระบุ: {networks}",
    others: "ตัวเลือกอื่น:",
    bottomHeading: "สิ่งที่ต้องเตรียมก่อนออกเดินทาง: อินเทอร์เน็ตมือถือ",
    bottomIntro: "ตั้งค่า eSIM ด้วย QR Code ก่อนออกเดินทาง แล้วใช้งานได้ทันทีเมื่อถึงญี่ปุ่น ด้านล่างคือสี่ตัวเลือกตามลำดับที่เราแนะนำ พร้อมเหตุผล",
    simbyeFrom: "เริ่ม {price} ({plan})",
    simbyeCode: "ใส่โค้ด {code} ลด {percent}% เหลือ {discounted}",
    lowest: "ราคาต่ำสุดในแพ็กเกจที่ยืนยันได้",
    hotspot: "แชร์เน็ตได้ทุกแพ็กเกจญี่ปุ่น",
    from: "เริ่ม {price} ({plan})",
    orderNote:
      "เหตุผลของลำดับนี้: {simbye} Klook eSIM อยู่ในบัญชีเดียวกับการจองอื่นใน Klook, Airalo ติดตั้งผ่านแอปของตัวเองและมีแชตช่วยเหลือ, Sakura Mobile มีแพ็กเกจที่ได้เบอร์โทรญี่ปุ่นให้เลือก ราคามาจากการตรวจราคารายวัน ล่าสุดเมื่อ {date}",
    orderLowest: "Simbye มีราคาแพ็กเกจต่ำสุดในข้อมูลราคาของเรา",
    orderNetworks: "Simbye ระบุว่าใช้ได้กับเครือข่ายญี่ปุ่นทั้งสี่ราย",
    insuranceName: "ประกันการเดินทาง",
    insuranceText: "SafetyWing Nomad Insurance เป็นแบบสมัครสมาชิก เริ่มได้ทั้งก่อนออกเดินทางและระหว่างเดินทาง และไม่มีค่าเสียหายส่วนแรกทั้งสองแผน",
    insuranceSki: "คุ้มครองสกีและสโนว์บอร์ดบนลานสกีเมื่อสวมหมวกกันน็อก ไม่คุ้มครองนอกลาน (off-piste)",
    insuranceCta: "ดูราคา SafetyWing →",
    note: "เป็นลิงก์พันธมิตร เราอาจได้รับค่าคอมมิชชันโดยคุณไม่ต้องจ่ายเพิ่ม โปรดตรวจสอบแพ็กเกจและเงื่อนไขในหน้าของผู้ขายก่อนซื้อ",
    swNote: "ตรวจสอบเงื่อนไข SafetyWing เมื่อ {swdate}",
    days: "{n} วัน",
    sep: ": ",
  },
};

export const ESIM_CTA_PLACEMENT = { top: "esim-top", bottom: "esim-bottom" } as const;

/** Ski, itinerary and activity pages, which also get the travel-insurance line. */
const INSURANCE_ROUTE = /(itinerary|ski|snow|niseko|hakuba|tour|day-trip|experience|kumano|cooking|kimono|ninja|onsen|hike|hiking|diving|winter|class|matcha|tea-ceremony)/;
const SKI_ROUTE = /(ski|niseko|hakuba|rusutsu|nozawa)/;

function useCtx() {
  const locale = useComponentLocale();
  const route = useRouter().pathname;
  const copy = COPY[locale];
  const dateOf = (iso: string | null | undefined) =>
    !iso ? "" : locale === "en" ? formatDate(iso) : dateLabel(iso.slice(0, 10), locale);
  const planName = (p: EsimPlan) => p.name.replace(/(\d+) days?/, (_, n) => copy.days.replace("{n}", n));
  return { locale, route, copy, dateOf, planName, tag: pageTag(route) };
}

const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m);

function OutLink({ href, className, children, klook }: { href: string; className?: string; children: ReactNode; klook?: boolean }) {
  if (klook)
    return (
      <KlookLink href={href} adPlacement={ESIM_PLACEMENT.bookingCard} className={className} target="_blank" rel="sponsored noopener">
        {children}
      </KlookLink>
    );
  return (
    <a href={href} className={className} target="_blank" rel="sponsored noopener">
      {children}
    </a>
  );
}

function links(placement: string, tag: string, locale: Locale) {
  return {
    simbye: simbyeTrackedUrl(placement, tag),
    klook: locale === "en" ? klookEsim.url : klookFor(klookEsim.url, locale),
    airalo: airaloTrackedUrl(placement, tag),
    sakura: getProvider("sakura").affiliateUrl,
  };
}

/** The small box after the answer, before the first H2. */
export function EsimCtaTop() {
  const { locale, copy, planName, tag } = useCtx();
  const plan = cheapestPlan("simbye");
  if (!plan?.discountedUsd) return null;
  const cta = esimPicksCopy[locale].cta;
  const href = links(ESIM_CTA_PLACEMENT.top, tag, locale);
  const lowest = siteCheapest()?.providerId === "simbye";
  return (
    <aside className={styles.top} data-placement={ESIM_CTA_PLACEMENT.top} data-position="top">
      <span className={styles.label}>{copy.topLabel}</span>
      <p className={styles.text}>
        {fill(copy.topLine, {
          plan: planName(plan),
          price: formatUsd(plan.priceUsd),
          discounted: formatUsd(plan.discountedUsd),
          code: SIMBYE_DISCOUNT_CODE,
          percent: String(SIMBYE_DISCOUNT_PERCENT),
        })}{" "}
        {lowest && `${copy.topLowest} `}
        {fill(copy.networks, { networks: getProvider("simbye").network })}
      </p>
      <div className={styles.topRow}>
        <OutLink href={href.simbye} className={styles.buy}>
          {cta.simbye}
        </OutLink>
        <span className={styles.others}>
          {copy.others}{" "}
          <OutLink href={href.klook} klook>
            Klook eSIM
          </OutLink>
          {" · "}
          <OutLink href={href.airalo}>Airalo</OutLink>
          {" · "}
          <OutLink href={href.sakura}>Sakura Mobile</OutLink>
        </span>
      </div>
    </aside>
  );
}

/**
 * The detailed "Before you fly" box. `insurance` adds the SafetyWing line; left unset it
 * follows the route (itinerary, ski and activity pages).
 */
export function EsimCtaBottom({ insurance }: { insurance?: boolean }) {
  const { locale, route, copy, dateOf, planName, tag } = useCtx();
  const simbye = cheapestPlan("simbye");
  const airalo = cheapestPlan("airalo");
  const sakura = cheapestPlan("sakura");
  if (!simbye?.discountedUsd) return null;
  const picks = esimPicksCopy[locale];
  const href = links(ESIM_CTA_PLACEMENT.bottom, tag, locale);
  const lowest = siteCheapest()?.providerId === "simbye";
  const slug = route.split("/").pop() ?? "";
  const showInsurance = insurance ?? INSURANCE_ROUTE.test(slug);
  const ski = SKI_ROUTE.test(slug);
  const checked = dateOf(getProvider("simbye").fetchedAt);
  const fromLine = (p: EsimPlan | null) => (p ? fill(copy.from, { price: formatUsd(p.priceUsd), plan: planName(p) }) + " " : "");

  return (
    <section className={styles.bottom} data-placement={ESIM_CTA_PLACEMENT.bottom} data-position="bottom">
      <span className={styles.label}>{copy.topLabel}</span>
      <h2 className={styles.heading}>{copy.bottomHeading}</h2>
      <p className={styles.intro}>{copy.bottomIntro}</p>
      <ol className={styles.list}>
        <li className={styles.row}>
          <div>
            <p className={styles.name}>1. Simbye</p>
            <p className={styles.text}>
              {lowest && <strong>{copy.lowest} </strong>}
              {fill(copy.simbyeFrom, { price: formatUsd(simbye.priceUsd), plan: planName(simbye) })}{" "}
              {fill(copy.simbyeCode, {
                discounted: formatUsd(simbye.discountedUsd),
                code: SIMBYE_DISCOUNT_CODE,
                percent: String(SIMBYE_DISCOUNT_PERCENT),
              })}{" "}
              {fill(copy.networks, { networks: getProvider("simbye").network })} {copy.hotspot}
            </p>
          </div>
          <OutLink href={href.simbye} className={styles.buy}>
            {picks.cta.simbye}
          </OutLink>
        </li>
        <li className={styles.row}>
          <div>
            <p className={styles.name}>2. Klook eSIM</p>
            <p className={styles.text}>
              <strong>{picks.rows.klook.need}{copy.sep}</strong> {KLOOK_ESIM_FACTS[locale]}
            </p>
          </div>
          <OutLink href={href.klook} className={styles.buySecondary} klook>
            {picks.cta.klook}
          </OutLink>
        </li>
        <li className={styles.row}>
          <div>
            <p className={styles.name}>3. Airalo</p>
            <p className={styles.text}>
              {fromLine(airalo)}
              <strong>{picks.rows.iphone.need}{copy.sep}</strong> {picks.rows.iphone.why}
            </p>
          </div>
          <OutLink href={href.airalo} className={styles.buySecondary}>
            {picks.cta.airalo}
          </OutLink>
        </li>
        <li className={styles.row}>
          <div>
            <p className={styles.name}>4. Sakura Mobile</p>
            <p className={styles.text}>
              {fromLine(sakura)}
              <strong>{picks.rows.number.need}{copy.sep}</strong> {picks.rows.number.why}
            </p>
          </div>
          <OutLink href={href.sakura} className={styles.buySecondary}>
            {picks.cta.sakura}
          </OutLink>
        </li>
        {showInsurance && (
          <li className={styles.row}>
            <div>
              <p className={styles.name}>{copy.insuranceName}</p>
              <p className={styles.text}>
                {copy.insuranceText} {ski && copy.insuranceSki}{" "}
                {copy.insuranceMore && (
                  <Link href={copy.insuranceMore.href} className={styles.inline}>
                    {copy.insuranceMore.label} →
                  </Link>
                )}
              </p>
            </div>
            <a href={SAFETYWING_URL} className={styles.buySecondary} target="_blank" rel="sponsored noopener">
              {copy.insuranceCta}
            </a>
          </li>
        )}
      </ol>
      <p className={styles.note}>
        {fill(copy.orderNote, { date: checked, simbye: lowest ? copy.orderLowest : copy.orderNetworks })} {copy.note}
        {showInsurance && ` ${fill(copy.swNote, { swdate: dateOf(SAFETYWING_CHECKED) })}`}
      </p>
    </section>
  );
}
