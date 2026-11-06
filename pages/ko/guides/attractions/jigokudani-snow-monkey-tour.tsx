import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookStayAreas from "../../../../components/KlookStayAreas";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import WinterBookingTop from "../../../../components/WinterBookingTop";
import styles from "../../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import {
  hanedaLimousineBus,
  jigokudaniStayAreas,
  jigokudaniZenkojiPrivateDayTrip,
  jigokudaniZenkojiSukiyakiTour,
  jrEastPass,
  klookEsim,
  naritaExpressRoundTripUrl,
  nozawaSnowMonkeyZenkojiTour,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  snowMonkeySukiyakiTourTokyo,
  snowMonkeysZenkojiSakeNaganoTour,
} from "../../../../lib/klook-links-winter-honshu";
import { seoTags } from "../../../../components/IntlSeo";
import {
  Breadcrumb,
  Disclosure,
  FaqList,
  Related,
  TRAIL_BASE,
  breadcrumbJsonLd,
  faqJsonLd,
  type Crumb,
} from "../../../../components/IntlChrome";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";

// Mirrors the English guide (pages/guides/attractions/jigokudani-snow-monkey-tour.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/jigokudani-snow-monkey-tour";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "지고쿠다니 원숭이 공원" }];

const CHECKED_ISO = "2026-11-06";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const factRows = [
  { item: "12월 1일부터 입장료, 성인(18세 이상)", value: "현장 ¥1,000, 웹 티켓 ¥880", note: "11월 30일까지 ¥800. 20명 이상 단체 ¥840, 웹 티켓 ¥740" },
  { item: "12월 1일부터 입장료, 어린이(초등학생~고등학생)", value: "현장 ¥500, 웹 티켓 ¥440", note: "11월 30일까지 ¥400. 6세 미만은 보호자 동반 시 무료, 단체 ¥420, 웹 티켓 ¥380" },
  { item: "운영 시간, 11~3월", value: "9:00–16:00", note: "폐원 30분 전까지 도착" },
  { item: "운영 시간, 4~10월", value: "8:30–17:00", note: "" },
  { item: "휴원일", value: "정기 휴원일 없음", note: "날씨, 원숭이의 행동, 자연재해로 예고 없이 닫을 수 있음" },
  { item: "웹 티켓", value: "12~4월 우선 입장", note: "날짜를 지정해 온라인 구매. 12월 1일부터 현장보다 저렴" },
  { item: "해발 고도", value: "850 m", note: "겨울 최저 −10°C, 적설 1 m 이상" },
];

const routeRows = [
  {
    leg: "도쿄 → 나가노",
    how: "호쿠리쿠 신칸센(가가야키, 하쿠타카, 아사마)",
    time: "최단 79분",
    notes: "JR EAST PASS 적용. 요금은 여기에 싣지 않음(아래 설명 참고)",
  },
  {
    leg: "나가노 → 유다나카",
    how: "나가노 전철 특급",
    time: "38분",
    notes: "사철이므로 JR 패스 적용 안 됨",
  },
  {
    leg: "유다나카 → 스노 몽키 파크 정류장",
    how: "노선버스",
    time: "15분",
    notes: "나가덴 SNOW MONKEY PASS(전철 버전)에 포함",
  },
  {
    leg: "나가노 → 스노 몽키 파크 정류장(대안)",
    how: "나가노역 동쪽 출구에서 급행버스",
    time: "41분",
    notes: "전철과 노선버스를 대신합니다. 나가덴은 버스와 입장권을 묶은 패스도 판매합니다",
  },
  {
    leg: "스노 몽키 파크 정류장 → 공원",
    how: "도보, 비포장 산길",
    time: "약 35분",
    notes: "겨울에는 눈과 얼음, 휠체어와 카트 불가",
  },
  {
    leg: "간바야시 온천 주차장 → 공원",
    how: "도보, 유미치 산책로(약 2 km)",
    time: "약 30분",
    notes: "공원의 무료 주차장. 대체로 평탄하고 일부 경사가 있음",
  },
  {
    leg: "지고쿠다니 주차장 → 공원",
    how: "도보",
    time: "약 15분",
    notes: "1대 ¥500. 다만 시부 온천에서 오는 임도는 겨울에 폐쇄",
  },
];

const compareRows = [
  {
    aspect: "가는 방법",
    diy: "신칸센으로 나가노까지(최단 79분), 이후 전철과 버스 또는 급행버스, 마지막으로 도보",
    tour: "도쿄 출발 버스 투어, 또는 신칸센을 직접 타고 나가노역에서 합류하는 가이드 투어. 환승은 투어가 해결합니다",
  },
  {
    aspect: "편도 이동 시간",
    diy: "대기 시간을 빼고 이동과 도보만 약 2시간 50분(79 + 38 + 15 + 35분)",
    tour: "긴 하루입니다. 도쿄 출발 상품은 왕복 약 12~13시간이지만 놓칠 환승은 없습니다",
  },
  {
    aspect: "입장",
    diy: "12월 1일부터 현장 ¥1,000 또는 날짜 지정 웹 티켓 ¥880이며, 12~4월에는 웹 티켓이 우선입니다",
    tour: "입장료 포함 여부는 상품 페이지에서 확인",
  },
  {
    aspect: "같은 날 젠코지",
    diy: "가능하지만 일찍 출발해야 합니다. 절은 나가노 시내에 있고 공원은 거기서 41분 이상 더 들어갑니다",
    tour: "클룩의 지고쿠다니 당일 투어 중 몇 개는 일정에 포함되어 있습니다. 신주쿠 출발 스키야키 버스 투어는 포함되지 않습니다",
  },
  {
    aspect: "주의할 점",
    diy: "유다나카나 나가노에서 버스를 놓치는 것, 그리고 겨울 폐원 시간 16:00이 생각보다 빨리 다가오는 것",
    tour: "눈 오는 날의 고속도로 날씨와 정체, 공원에서 쓸 수 있는 시간이 정해져 있는 점",
  },
  {
    aspect: "추천 대상",
    diy: "이미 JR EAST PASS가 있는 여행자, 또는 시부, 유다나카, 간바야시에서 1박하는 여행자",
    tour: "나가노에서 묵지 않고 도쿄에서 당일로 다녀오는 여행자, 처음 가는 여행자, 산길에 가이드가 필요한 가족",
  },
];

const faqItems = [
  {
    q: "지고쿠다니 원숭이 공원 입장료는 얼마인가요?",
    a: `2026년 12월 1일부터 현장 요금은 성인(18세 이상) ¥1,000, 초등학생~고등학생 어린이 ¥500이고, 웹 티켓은 ¥880과 ¥440입니다. 공원의 요금 공지 기준입니다. 11월 30일까지는 ¥800과 ¥400입니다. 6세 미만은 보호자 동반 시 무료, 20명 이상 단체는 ¥840과 ¥420(웹 티켓 ¥740과 ¥380)이며, 경로 할인은 없습니다. 할인은 중복 적용되지 않습니다. 12월부터 4월까지는 해당 날짜의 웹 티켓을 구매한 사람이 우선 입장합니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "지고쿠다니 운영 시간은 어떻게 되나요?",
    a: `공원 사이트 기준으로 11~3월은 9:00~16:00, 4~10월은 8:30~17:00입니다. 정기 휴원일은 없지만 날씨, 원숭이의 행동, 자연재해로 예고 없이 닫을 수 있다고 밝히고 있으며, 폐원 시간까지 나올 수 있도록 폐원 30분 전까지 도착해 달라고 안내합니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "도쿄에서 원숭이 공원 당일치기가 가능한가요?",
    a: "가능하지만 긴 하루입니다. 공원의 교통 안내에 따르면 도쿄에서 나가노까지 호쿠리쿠 신칸센으로 최단 79분, 나가노 전철 특급으로 유다나카까지 38분, 버스로 스노 몽키 파크 정류장까지 15분, 그리고 도보 약 35분입니다. 대기 시간을 빼도 편도 3시간 가까이 걸리고, 공원은 겨울에 16:00에 닫습니다. 도쿄에서 일찍 출발하거나 환승을 투어에 맡기세요.",
  },
  {
    q: "원숭이 공원까지 얼마나 걸어야 하나요?",
    a: "스노 몽키 파크 버스 정류장에서 약 35분, 간바야시 온천의 무료 주차장에서 약 30분(유미치 산책로 약 2 km), 유료 지고쿠다니 주차장에서 약 15분입니다. 다만 유료 주차장은 시부 온천에서 오는 임도가 폐쇄되어 겨울에는 이용할 수 없습니다. 길은 비포장이고 경사와 계단이 있으며 휠체어와 카트는 사용할 수 없습니다.",
  },
  {
    q: "원숭이를 보기 가장 좋은 시기는 언제인가요?",
    a: "온천욕을 보려면 12월부터 3월까지입니다. 공원은 원숭이가 주로 이 시기에 몸을 녹이려고 온천에 들어가고, 따뜻할 때는 잘 들어가지 않는다고 설명합니다. 해발 850 m의 겨울은 최저 −10°C에 적설 1 m가 넘어, 많은 방문객이 기대하는 풍경이 펼쳐집니다. 원숭이는 야생이라 공원이 내려올 가능성을 주간 예보로 알려 주므로 가기 전에 확인하세요.",
  },
  {
    q: "겨울 지고쿠다니에는 무엇을 입고 가야 하나요?",
    a: "스노 부츠, 그리고 있으면 간이 아이젠입니다. 공원의 안내는 겨울에는 부츠나 스노 부츠, 여름에는 운동화나 등산화이며, 다져진 눈과 얼음 위를 안전하게 걷도록 간이 아이젠(신발에 끼우는 가벼운 스파이크)을 권합니다. 도쿄가 아니라 −10°C에 맞춰 입고, 계단에서 두 손을 쓸 수 있게 해 두세요.",
  },
  {
    q: "원숭이 공원 투어는 할 만한가요?",
    a: "도쿄에서 당일로 간다면 대체로 그렇습니다. 전철 경로는 네 구간과 도보로 이루어지고 그중 두 구간은 편수가 적은 소규모 사업자이며, 겨울 폐원은 16:00입니다. 환승을 놓치면 시간만이 아니라 원숭이를 볼 기회를 잃습니다. 일부 투어는 혼자서는 같은 날 넣기 어려운 젠코지도 포함합니다. 시부, 유다나카, 간바야시에서 1박하거나 이미 JR EAST PASS가 있다면 직접 가는 것이 쉽고 저렴합니다.",
  },
  {
    q: "원숭이 공원과 시부 온천이나 젠코지를 함께 볼 수 있나요?",
    a: "네, 둘 다 가는 길에 있습니다. 시부 온천은 공원 바로 아래의 온천 마을로 1박할 때 함께 보기 좋습니다. 젠코지는 환승 지점인 나가노 시내에 있고, 클룩의 지고쿠다니 당일 투어 중 몇 개가 공원과 묶어서 갑니다. 도쿄에서 혼자 당일로 간다면 돌아오는 길 오후가 가장 좋지만, 겨울 폐원 16:00보다 한참 전에 공원을 나온 경우에만 가능합니다.",
  },
  {
    q: "지고쿠다니 입장권을 미리 예약해야 하나요?",
    a: "필수는 아니지만 겨울에는 예약할 만합니다. 공원은 날짜 지정 웹 티켓을 판매하고 12월부터 4월까지 소지자에게 우선 입장을 제공하며, 2026년 12월 1일부터 현장 ¥1,000에 비해 ¥880입니다. 성수기에는 줄을 피하는 방법이자 더 저렴한 티켓인 셈입니다. 합류형 투어도 날짜별 정원이 정해져 있으니 날짜가 정해지면 바로 예약하고, 눈 오는 날의 취소 조건을 상품 페이지에서 확인하세요.",
  },
  {
    q: "아이, 유모차, 반려견을 데리고 갈 수 있나요?",
    a: "아이는 가능하고 유모차와 반려견은 안 됩니다. 6세 미만은 보호자 동반 시 무료이지만 길이 비포장이고 경사와 계단이 있으며, 공원은 휠체어와 카트를 쓸 수 없다고 안내합니다. 어린아이는 안고 가세요. 개와 고양이는 출입할 수 없으며, 개는 원숭이의 천적이어서 보조견도 마찬가지입니다.",
  },
  {
    q: "원숭이 공원의 규칙은 무엇인가요?",
    a: "원숭이에게 먹이를 주거나 만지거나 눈을 빤히 쳐다보면 안 됩니다. 공원의 주의 사항에 따르면 음식이 있으면 원숭이가 가방을 낚아채거나 다리에 매달리고, 눈을 가까이서 빤히 보는 것은 적의의 표시이며, 어린 원숭이가 다가오면 자리를 피해야 합니다. 사진은 플래시까지 괜찮지만 드론과 셀카봉은 금지이고, 카메라를 원숭이나 온천 안으로 가까이 대면 안 됩니다.",
  },
  {
    q: "JR 패스나 JR EAST PASS로 원숭이 공원까지 갈 수 있나요?",
    a: "나가노까지입니다. JR EAST PASS(5일 ¥35,000, 10일 ¥50,000)는 도쿄에서 나가노까지 호쿠리쿠 신칸센을 포함합니다. 나가노부터는 나가노 전철과 버스가 민영이라 따로 내야 하며, 전철, 유다나카 버스, 공원 입장을 묶은 나가덴의 SNOW MONKEY PASS를 살 수도 있습니다.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const sameTripItems: KlookTripPrepItem[] = [
  {
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩에서 eSIM 보기 →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "날짜 지정 웹 티켓, 유다나카와 나가노의 버스 시간, 공원의 원숭이 예보를 모두 휴대폰으로 확인하게 되고, 공원은 날씨에 따라 예고 없이 닫을 수 있습니다.",
  },
  {
    label: "나리타 익스프레스(N'EX) 왕복 티켓",
    ctaLabel: "N'EX 왕복 티켓 보기 →",
    url: klookFor(naritaExpressRoundTripUrl, LOCALE),
    why: "호쿠리쿠 신칸센이 출발하는 도쿄역에 도착하므로, 나리타로 들어와 북쪽으로 가는 첫 열차 근처에서 묵을 수 있습니다.",
  },
  {
    label: "하네다 공항 – 도쿄 리무진 버스",
    ctaLabel: "리무진 버스 보기 →",
    url: klookFor(hanedaLimousineBus.url, LOCALE),
    why: "하네다에서 들어오는 경우로, 신주쿠도 정차지에 포함됩니다. 신주쿠역 서쪽에서 아침 일찍 출발하는 버스 투어를 탄다면 유용합니다.",
  },
  {
    label: "JR EAST PASS(연속 5일 또는 10일)",
    ctaLabel: "JR EAST PASS 보기 →",
    url: klookFor(jrEastPass.url, LOCALE),
    why: "나가노까지의 신칸센은 포함되지만 이후의 사철과 버스는 포함되지 않습니다. 같은 5일 또는 10일 안에 장거리 이동이 여러 번 있을 때 이득입니다.",
  },
];

const TITLE = "지고쿠다니 원숭이 공원(2027): 도쿄 출발 투어";
const DESC =
  "지고쿠다니 원숭이 공원 입장료 ¥1,000(12/1부터, 웹 ¥880), 겨울 9:00–16:00, 나가노까지 79분, 눈길 도보 35분.";

export default function JigokudaniSnowMonkeyTourPage({ updated }: { updated: PageUpdated }) {
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
          <p className={styles.eyebrow}>
업데이트 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
도쿄 출발 지고쿠다니 원숭이 공원(2027):<br />입장료, 운영 시간, 도보, 투어와 직접 가기 비교
</h1>
          <p className={styles.heroSubtitle}>
온천에 들어가는 일본 원숭이는 나가노 위쪽 계곡에 삽니다. 신칸센에서 내려 전철, 버스, 눈 덮인 산길을 지나야 합니다. 비용과 시간, 그리고 투어가 더 나은 경우를 정리했습니다.
</p>
          <div className={styles.heroBadges}>
            {[`업데이트 ${monthLabel(updated.iso, LOCALE)}`, "공식 요금과 시간, 확인일 표기", "투어와 직접 가기 비교"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
                <Disclosure />

        <WinterBookingTop
          heading={"이번 겨울에 예약할 수 있는 도쿄 출발 원숭이 공원 투어는?"}
          checkedIso="2026-11-06"
          deadline={
            <>
크리스마스와 연말연시는 11월 30일까지, 1~2월은 최소 3주 전까지 예약하세요. 온천욕은 주로 12~3월이라 모든 투어 날짜가 이 짧은 시즌에 몰립니다. 직접 간다면 날짜가 정해지는 대로 날짜 지정 웹 티켓을 사세요. 12~4월에는 웹 티켓 소지자가 우선이고, 12월 1일부터 현장 ¥1,000에 비해 ¥880입니다.
</>
          }
          tours={[
            {
              title: "도쿄 출발 원숭이 공원 투어(소고기 스키야키 점심)",
              url: klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE),
              price: "약 US$128부터",
              duration: "12시간(08:00–20:00)",
              departs: "도쿄 신주쿠",
            },
            {
              title: "지고쿠다니 원숭이 공원과 젠코지 당일 투어(소고기 스키야키 점심)",
              url: klookFor(jigokudaniZenkojiSukiyakiTour.url, LOCALE),
              price: null,
              duration: "약 13시간 10분",
              departs: "도쿄",
            },
            {
              title: "지고쿠다니 원숭이 공원과 젠코지 프라이빗 당일 여행",
              url: klookFor(jigokudaniZenkojiPrivateDayTrip.url, LOCALE),
              price: null,
              duration: "10시간",
              departs: "도쿄 내 호텔",
            },
          ]}
        />

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
결론부터
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
12월 1일부터 입장료
</p>
                <p className={styles.verdictStatValue}>
성인 ¥1,000(웹 ¥880)
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
겨울 운영 시간(11~3월)
</p>
                <p className={styles.verdictStatValue}>9:00–16:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
도쿄 → 나가노
</p>
                <p className={styles.verdictStatValue}>
최단 79분
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
원숭이까지 도보
</p>
                <p className={styles.verdictStatValue}>
30~35분, 겨울에는 눈길
</p>
              </div>
            </div>
            <p className={styles.verdictText}>
<strong>요약:</strong> 지고쿠다니 야엔코엔(스노 몽키 파크)의 입장료는 2026년 12월 1일부터 현장 기준 성인 ¥1,000, 어린이 ¥500, 웹 티켓은 ¥880과 ¥440입니다(11월 30일까지 ¥800과 ¥400). 운영 시간은 11~3월 9:00~16:00, 4~10월 8:30~17:00입니다. 도쿄에서는 호쿠리쿠 신칸센으로 나가노까지 최단 79분, 나가노 전철로 유다나카까지 38분, 버스 15분(또는 나가노에서 급행버스 41분), 마지막으로 겨울에 눈과 얼음으로 덮이는 비포장 산길을 약 35분 걷습니다. 원숭이 공원 투어는 이 환승을 모두 대신해 주고 젠코지를 포함하는 경우도 많습니다. 직접 가면 저렴하지만 편도 3시간 가까이 걸립니다. 모든 수치는 공원 사이트 기준이며 확인일은 {CHECKED}입니다.
</p>
            <KlookLink
              href={klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE)}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
클룩에서 원숭이 공원 투어 보기 →
</KlookLink>
          </div>
        </div>

                <KlookTripPrep
          label={"같은 여행에서 예약할 것"}
          heading={"원숭이 공원 여행에 또 무엇이 필요할까요?"}
          intro={"지고쿠다니 당일 여행에 필요한 세 가지입니다. 버스와 티켓을 확인할 데이터, 공항에서 들어오는 교통편, 신칸센 구간을 커버하는 패스입니다."}
          items={sameTripItems}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
개요
</span>
          <h2 className={styles.sectionTitle}>
지고쿠다니 원숭이 공원이란?
</h2>
          <p className={styles.bodyText}>
지고쿠다니 야엔코엔은 나가노현 북부 야마노우치 위쪽 요코유 계곡에 있는 야생 원숭이 공원입니다. 1964년에 문을 열었고 해발 850 m에 있으며, 눈이 내리는 가운데 일본원숭이가 온천에 들어가 있는 모습으로 유명합니다. 공원은 겨울이 −10°C까지 내려가고 눈이 1 m 넘게 쌓이며, 원숭이가 주로 12월부터 3월까지 몸을 녹이려고 온천에 들어간다고 설명합니다.
</p>
          <p className={styles.bodyText}>
원숭이는 야생이라 마음대로 오고 갑니다. 공원은 나타날 가능성을 주간 예보로 알려 주고, 전혀 내려오지 않는 날도 있다고 경고하므로 도쿄에서 하루를 통째로 쓰기 전에 확인하세요.
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
요금과 시간
</span>
          <h2 className={styles.sectionTitle}>
입장료는 얼마이고 언제 여나요?
</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 수치", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
요금은 공원의 2026년 9월 20일 요금 개정 공지, 운영 시간과 휴원은 시간·요금 페이지(12월 1일 개정을 확인하지만 표는 아직 이전 요금), 웹 티켓 우선 입장은 홈페이지, 고도와 기후는 영어 소개 페이지 기준입니다. 요금, 시간, 우선 입장은 jigokudani-yaenkoen.co.jp에서 {CHECKED}에 확인했습니다. 웹 티켓은 공원의 웹 티켓 페이지에서 판매하며, 나가덴도 버스와 입장권을 묶은 상품을 판매합니다.
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
가는 방법
</span>
          <h2 className={styles.sectionTitle}>
도쿄에서 원숭이 공원까지 어떻게 가나요?
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
네 구간과 도보입니다. 첫 구간은 빠르고, 하루의 성패는 나머지 세 구간에서 갈립니다.
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["구간", "방법", "시간", "알아 둘 점"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.how}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
시간은 공원의 교통 안내({CHECKED} 확인), 패스 내용은 나가노 전철의 스노 몽키 페이지(2026년 11월 3일 확인) 기준입니다. <strong>요금에 대해:</strong> 신칸센, 나가덴 전철, 버스의 엔화 요금은 싣지 않습니다. JR 동일본 사이트에서 읽을 수 있는 요금 페이지를 얻지 못했고, 나가덴은 요금표를 읽을 수 없는 PDF로만 공개하며, 2026-27 급행버스의 제3자 수치는 서로 다릅니다. 역이나 운영사 사이트에서 확인하세요. <Link href="/guides/transport/jr-east-pass" hrefLang="en" style={{ color: "var(--text)", fontWeight: 600 }}>JR 동일본 패스 가이드(영어)</Link>에서 나가노행 개별 티켓보다 패스가 유리한 경우를 계산해 두었습니다.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jrEastPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
클룩에서 JR EAST PASS 보기 →
</KlookLink>
            <KlookLink href={klookFor(snowMonkeysZenkojiSakeNaganoTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
나가노역 출발 가이드 투어 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
도보 구간
</span>
          <h2 className={styles.sectionTitle}>
원숭이 공원까지 얼마나 걸어야 하나요?
</h2>
          <p className={styles.bodyText}>
<strong>겨울에는 어느 길로 가든 약 30~35분입니다.</strong> 스노 몽키 파크 버스 정류장에서 약 35분, 간바야시 온천의 무료 주차장에서는 약 2 km의 유미치 산책로를 따라 약 30분이며, 공원은 이 길이 대체로 평탄하고 일부 경사가 있다고 설명합니다. 유료 지고쿠다니 주차장(¥500)에서 약 15분 걷는 짧은 길은 여름에만 쓸 수 있습니다. 시부 온천에서 올라가는 임도는 겨울에 폐쇄되고, 대형 차량은 계절과 관계없이 지나가기 어렵습니다.
</p>
          <p className={styles.bodyText}>
길은 비포장이고 경사와 계단이 있으며 공원은 휠체어와 카트를 쓸 수 없다고 안내합니다. 겨울에는 다져진 눈이고 곳곳이 얼음입니다. 왕복 도보로 1시간에 구경하는 시간을 더하고, 겨울 폐원 16:00의 최소 30분 전에는 입구에 도착하도록 계획하세요.
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
옷차림
</span>
          <h2 className={styles.sectionTitle}>
겨울에 원숭이를 보러 갈 때 무엇을 입어야 하나요?
</h2>
          <p className={styles.bodyText}>
<strong>스노 부츠, 그리고 가능하면 간이 아이젠입니다.</strong> 공원의 안내는 겨울에는 부츠나 스노 부츠(그 외 계절에는 운동화나 등산화)이고, 안전하게 걷도록 간이 아이젠(신발에 끼우는 가벼운 스파이크)을 미리 사 두라는 것입니다. 도쿄가 아니라 계곡에 맞춰 입으세요. 공원은 겨울 최저 −10°C를 안내합니다. 휴대폰을 쓸 수 있는 장갑, 모자, 잘 닫히는 가방도 꼭 챙기세요.
</p>
          <p className={styles.bodyText}>
입장 후의 규칙은 짧지만 공원은 이를 엄격하게 적용합니다. 먹이를 주지 말고, 만지지 말고, 눈을 가까이서 빤히 보지 말고(적의의 표시), 어린 원숭이가 다가오면 자리를 피하세요. 사진과 플래시는 괜찮지만 드론과 셀카봉은 금지이고, 카메라를 원숭이나 온천 쪽으로 들이밀면 안 됩니다. 개와 고양이는 보조견을 포함해 출입할 수 없습니다.
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
비교
</span>
          <h2 className={styles.sectionTitle}>
원숭이 공원 투어가 좋을까요, 직접 가는 게 좋을까요?
</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "직접 가기", "원숭이 공원 투어"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.aspect}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.aspect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.diy}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
판단 기준은 이렇습니다. <strong>나가노에서 묵지 않고 도쿄에서 당일로 간다면 투어를 타세요.</strong> 네 구간, 소규모 사업자 두 곳, 16:00 폐원으로는 버스를 놓칠 여유가 없습니다. <strong>시부, 유다나카, 간바야시에서 1박하거나 이미 JR EAST PASS가 있다면 직접 가세요.</strong> 가까이서 묵으면 당일 여행객이 오기 전에 아침 산책처럼 다녀올 수 있습니다.
</p>
          <p className={styles.bodyText}>
<strong>예약 시기:</strong> 합류형 투어는 날짜별 정원이 정해져 있고 온천욕 시즌은 4개월뿐이니 날짜가 정해지면 바로, 연휴 주간부터 먼저 예약하세요. 결제 전에 상품 페이지의 취소 조건을 확인하세요. 겨울에 일정이 바뀌는 가장 흔한 이유는 고속도로의 눈입니다.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(jigokudaniZenkojiSukiyakiTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
원숭이 공원 + 젠코지 당일 투어 →
</KlookLink>
            <KlookLink href={klookFor(jigokudaniZenkojiPrivateDayTrip.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
우리 일행만의 프라이빗 당일 여행 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
계절
</span>
          <h2 className={styles.sectionTitle}>
원숭이를 보기 가장 좋은 시기는 언제인가요?
</h2>
          <p className={styles.bodyText}>
<strong>12월부터 3월까지, 추운 날입니다.</strong> 공원에 따르면 이 시기에 원숭이가 온천에 들어가며 가장 춥고 눈이 많은 날에 특히 자주 들어갑니다. 공원이 웹 티켓 소지자에게 우선 입장을 주는 시기(12~4월)이기도 해서 언제 붐비는지 알 수 있습니다. 일찍 가세요. 겨울에는 16:00에 닫고, 오전에 도착하면 늦은 버스를 탈 여유가 생깁니다.
</p>
          <p className={styles.bodyText}>
겨울이 아니면 운영 시간이 더 길고(4~10월 8:30~17:00) 원숭이도 있지만, 공원은 따뜻한 달에는 원숭이가 온천에 잘 들어가지 않는다고 설명합니다. 온천 장면이 목적이라면 11월과 4월은 운에 맡겨야 하고 여름은 맞지 않습니다.
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
함께 보기
</span>
          <h2 className={styles.sectionTitle}>
원숭이 공원과 시부 온천이나 젠코지를 함께 볼 수 있나요?
</h2>
          <p className={styles.bodyText}>
<strong>젠코지</strong>는 공원으로 가는 모든 경로의 환승 지점인 나가노 시내에 있고, 클룩의 지고쿠다니 투어 몇 개가 일정에 넣는 곳입니다. 직접 간다면 공원 폐원 시간이 중요한 갈 때보다, 공원을 일찍 나온 경우에 한해 돌아오는 길에 넣으세요.
</p>
          <p className={styles.bodyText}>
<strong>시부 온천</strong>은 공원 바로 아래의 오래된 료칸 거리이고, <strong>간바야시 온천</strong>은 산책로 입구에 있습니다. 둘 다 당일 여행에 덧붙이기보다는 1박을 하는 이유가 되는 곳입니다. 노자와 온천에서 스키를 탄다면 그곳에서 원숭이 공원과 젠코지를 도는 겨울 한정 클룩 투어도 있습니다.
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(nozawaSnowMonkeyZenkojiTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
노자와 온천 출발 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
겨울 여행의 나머지
</span>
          <h2 className={styles.sectionTitle}>
겨울 여행에서 원숭이 공원과 잘 어울리는 곳은?
</h2>
          <p className={styles.bodyText}>
지고쿠다니는 단독보다 긴 일정 안에 넣는 편이 좋으며, <Link href="/guides/attractions/japan-winter-itinerary" hrefLang="en">일본 겨울 여행 일정(영어)</Link>에 12일 코스를 정리했습니다. 도쿄에 머문다면 가장 잘 맞는 것은 <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">갈라 유자와 스키 당일 여행(영어)</Link>으로, JR EAST PASS 하나로 긴 하루 이틀을 함께 커버할 수 있습니다. 도쿄로 돌아온 저녁에는 12시간 여행보다 훨씬 가벼운 <Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">도쿄 일루미네이션(영어)</Link>을 남겨 두세요. 나가노로 오는 호쿠리쿠 신칸센은 가나자와까지 이어지며, 가나자와는 <Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">다카야마와 시라카와고 투어(영어)</Link>의 일반적인 출발지입니다. 1월 여행이라면 라이트업 날짜를 원숭이 공원 날짜보다 먼저 정하세요.
</p>
          <p className={styles.bodyText}>
더 북쪽은 별도의 여행이며, 눈이 목적이라면 좋은 대안입니다. 스키어는 이 계곡과 <Link href="/guides/attractions/niseko-ski-tours" hrefLang="en">니세코 스키 투어(영어)</Link>를 비교해 보세요. 2월의 <Link href="/ko/guides/attractions/sapporo-snow-festival-tours">삿포로 눈축제 투어</Link>는 2027년 2월 4~11일로 정해져 있으므로 원숭이 공원은 그 앞이나 뒤에 넣어야 합니다. 삿포로에서는 <Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">오타루 당일 여행(영어)</Link>을 쉽게 더할 수 있고, <Link href="/guides/attractions/hokkaido-7-day-itinerary" hrefLang="en">홋카이도 7일 여행(영어)</Link>에서 일주일 일정을 볼 수 있습니다.
</p>
        </section>

        <KlookStayAreas
          heading={"원숭이 공원을 보려면 어디에 묵어야 하나요?"}
          intro={"공원 근처에서 하루 묵으면 3시간 이동이 아침 산책으로 바뀝니다. 산책로 입구부터 나가노역까지 네 곳을 클룩 호텔 링크와 함께 정리했습니다."}
          areas={jigokudaniStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "산책로 입구의 온천 마을입니다. 공원의 무료 주차장과 2 km의 유미치 산책로가 여기서 시작되어 당일 여행객보다 먼저 길에 나설 수 있습니다.", area: "간바야시 온천(간바야시 호텔 센주카쿠)" }, { why: "공원 바로 아래의 오래된 료칸 거리로, 원숭이를 본 뒤 나가노행 전철을 타기 전에 하룻밤 묵기 좋습니다.", area: "시부 온천(와후노야도 MASUYA)" }, { why: "나가노 전철의 종점으로, 스노 몽키 파크 정류장까지 가는 15분 노선버스가 여기서 출발합니다.", area: "유다나카(호텔 쓰바키노)" }, { why: "모든 선택지를 열어 두는 거점입니다. 도쿄발 신칸센, 유다나카행 나가덴, 공원행 급행버스, 젠코지가 모두 여기서 시작됩니다.", area: "나가노역" }] as Partial<typeof item>[])[i]))}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
출발 전
</span>
          <h2 className={styles.sectionTitle}>
원숭이 공원에 모바일 데이터가 필요한가요?
</h2>
          <p className={styles.bodyText}>
네, 다른 여행보다 더 필요합니다. 웹 티켓, 유다나카와 나가노의 버스 시간, 공원의 원숭이 예보를 모두 휴대폰으로 확인해야 하고, 산길과 버스 정류장에는 호텔 Wi-Fi가 없습니다. <KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>클룩 eSIM 보기 →</KlookLink> 또는 <Link href="/ko/guides/esim/best-esim-japan">일본 eSIM 추천 가이드</Link>에서 비교해 보세요.
</p>
        </section>

                <FaqList items={faqItems} />

        <KlookTourPicks
          heading={"클룩의 원숭이 공원 투어"}
          intro={"도쿄 출발 당일 투어 2개, 나가노역 출발 가이드 투어, 프라이빗 당일 여행, 노자와 온천 출발 스키 시즌 투어입니다. 상품 페이지에서 날짜별 가격, 포함 사항, 가이드 언어, 취소 조건을 확인하세요."}
          tours={[withKlookLocale(snowMonkeySukiyakiTourTokyo, LOCALE, { title: "도쿄 출발 원숭이 공원 투어(소고기 스키야키 점심)", desc: "신주쿠에서 출발하는 12시간 버스 투어로 공원 입장료와 소고기 스키야키 점심이 포함됩니다. 가마쿠라노사토 눈집 방문은 1월 하순부터 2월 하순경까지만 운영합니다" }), withKlookLocale(jigokudaniZenkojiSukiyakiTour, LOCALE, { title: "지고쿠다니 원숭이 공원과 젠코지 당일 투어(소고기 스키야키 점심)", desc: "원숭이 공원과 나가노의 국보 사찰 젠코지를 함께 도는 가이드 투어로 소고기 스키야키 점심이 포함됩니다" }), withKlookLocale(snowMonkeysZenkojiSakeNaganoTour, LOCALE, { title: "나가노 원숭이 공원, 젠코지, 사케 당일 투어", desc: "JR 패스로 신칸센을 타고 올라오는 여행자를 위한 나가노역 출발 가이드 투어입니다. 사철과 버스 환승 없이 원숭이, 젠코지, 사케 양조장을 둘러봅니다" }), withKlookLocale(jigokudaniZenkojiPrivateDayTrip, LOCALE, { title: "지고쿠다니 원숭이 공원과 젠코지 프라이빗 당일 여행", desc: "같은 두 곳을 일행 전용 차량으로 도는 상품으로, 가족이나 산길 속도를 직접 정하고 싶은 여행자에게 맞습니다" }), withKlookLocale(nozawaSnowMonkeyZenkojiTour, LOCALE, { title: "노자와 온천 출발 겨울 투어: 원숭이 공원, 젠코지, 사케 시음", desc: "이미 나가노에서 스키를 타는 여행자를 위해 노자와 온천에서 출발하는 겨울 한정 상품으로, 젠코지와 사케 시음이 함께 들어 있습니다" })]}
        />

                <Related items={[{ href: "/guides/attractions/japan-winter-itinerary", title: "일본 겨울 여행 일정 (영어)" }, { href: "/guides/transport/jr-east-pass", title: "JR East Pass(2026): 가격, 적용 범위, 이득일까? (영어)" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "도쿄 출발 갈라 유자와 스키 당일 여행 (영어)" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "다카야마와 시라카와고 투어(2027): 어디서 출발할까 (영어)" }, { href: "/guides/attractions/niseko-ski-tours", title: "니세코 스키 투어(2027): 셔틀, 강습, 4개 스키장 (영어)" }, { href: "/ko/guides/attractions/sapporo-snow-festival-tours", title: "삿포로 눈축제 투어(2027)" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "삿포로 출발 오타루 당일 여행(2027) (영어)" }, { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "홋카이도 7일 여행: 날짜별 일정 (영어)" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "도쿄 일루미네이션: 일정, 시간, 무료 명소 (영어)" }, { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "도쿄 출발 가루이자와 당일 여행 (영어)" }, { href: "/guides/transport/tokyo-to-kanazawa", title: "도쿄에서 가나자와로(2026) (영어)" }, { href: "/guides/attractions/japan-14-day-itinerary", title: "일본 14일 일정(2026) (영어)" }, { href: "/guides/attractions/japan-10-day-itinerary", title: "일본 10일 일정(2026) (영어)" }, { href: "/ko/guides/esim/best-esim-japan", title: "일본 eSIM 추천(2026)" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
겨울 날짜가 차기 전에 예약하세요
</h2>
            <p className={styles.ctaBannerDesc}>
원숭이 공원 투어는 날짜별 정원이 정해져 있고 온천욕 시즌은 12월부터 3월까지뿐입니다. 날짜를 고르고 상품 페이지의 포함 사항을 확인한 뒤 전철, 버스, 산길은 가이드에게 맡기세요. 클룩은 해외 카드로 결제할 수 있습니다.
</p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={klookFor(snowMonkeySukiyakiTourTokyo.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
클룩에서 원숭이 공원 투어 보기 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
