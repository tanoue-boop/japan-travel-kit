import type { ReactNode } from "react";
import Link from "next/link";
import KlookLink from "./KlookLink";
import styles from "../styles/BestEsimJapan.module.css";
import {
  ginzanWineryTwoDayTourFromTokyo,
  hakubaHapponeBusLiftRental,
  hakubaSkiResortDayTourTokyo,
  hokurikuArchPass,
  klookEsim,
  shirakawagoTakayamaKanazawaDayTour,
} from "../lib/klook-links";
import { jrPassWholeJapanCurrent } from "../lib/klook-links-winter-hub";
import { klookFor } from "../lib/klook-locale";
import type { Locale } from "../lib/i18n";

/**
 * The 7- and 10-day winter routes, the New Year / winter closure table and the pass table for
 * /guides/attractions/japan-winter-itinerary and its four translations (task jtk-20261127-R15).
 * One component so the five editions carry the same rows and the same figures.
 *
 * Read on 27 Nov 2026, directly (node fetch):
 *   sagano-kanko.co.jp/news/6056/   press release of 25 Nov 2026: the current Sagano Romantic Train
 *                                   cars end service on 29 Dec 2026; the new train debuts 1 Mar 2027
 *                                   (so no trains 30 Dec 2026 – 28 Feb 2027).
 *   gala.co.jp/winter/hours-pricing/  sightseeing only 12–18 Dec 2026; slopes 19 Dec 2026 – 5 May 2027;
 *                                   gondola & lift ticket ¥8,000 adult (¥7,500 web).
 *   shirakawa-go.gr.jp/events/441/  light-up 11, 17, 24, 31 Jan 2027, 17:30–19:30; no tickets on the day.
 *   westjr.co.jp …/hokuriku-arch-pass/  7 days ¥35,000 adult; Hokuriku Shinkansen Tokyo–Tsuruga,
 *                                   HARUKA and Thunderbird; Joetsu Shinkansen only Tokyo–Takasaki.
 *   japanrailpass.net/en/purchase/price/  ordinary 7-day ¥50,000, 14-day ¥80,000 adult.
 * Carried with their own dates from japan-new-year-itinerary (20 Nov 2026): banks closed 31 Dec –
 * 3 Jan, government offices 29 Dec – 3 Jan, Tokyo National Museum closed 26–31 Dec and open 1 Jan
 * 12:00–20:00, Kinkaku-ji open every day 9:00–17:00, 449 Tokaido Shinkansen trains a day 25 Dec – 5 Jan.
 * Journey times carried from ginzan-onsen-tour (JNTO: Tokyo–Oishida about 3 h 20 min, bus 35–40 min)
 * and japan-ski-trip-itinerary (Tokyo–Nagano about 80 min, Alpico bus to Hakuba 70 min).
 */

const URLS = {
  sagano: "https://www.sagano-kanko.co.jp/news/6056/",
  gala: "https://gala.co.jp/winter/hours-pricing/",
  shirakawa: "https://shirakawa-go.gr.jp/events/441/",
  arch: "https://www.westjr.co.jp/travel-information/en/tickets-passes/other/hokuriku-arch-pass/",
  jrp: "https://japanrailpass.net/en/purchase/price/",
  tnm: "https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en",
  bank: "https://laws.e-gov.go.jp/law/357CO0000000040",
  jrc: "https://jr-central.co.jp/news/release/_pdf/000046107.pdf",
};

type Row4 = [string, string, string, string];

type Copy = {
  routesH2: string;
  routesAnswer: ReactNode;
  routesHead: Row4;
  routes: Row4[];
  routesNote: ReactNode;
  comboH2: string;
  comboAnswer: ReactNode;
  closedH2: string;
  closedAnswer: ReactNode;
  closedHead: Row4;
  closed: Row4[];
  closedNote: ReactNode;
  passH2: string;
  passAnswer: ReactNode;
  passHead: Row4;
  passes: Row4[];
  passNote: ReactNode;
  cta: { tourHakuba: string; tourShirakawa: string; tourGinzan: string; rental: string; arch: string; jrp: string; esim: string };
};

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

const SOURCES_TODAY = (
  <>
    {ext(URLS.sagano, "sagano-kanko.co.jp")}, {ext(URLS.gala, "gala.co.jp")}, {ext(URLS.shirakawa, "shirakawa-go.gr.jp")}
  </>
);
const SOURCES_NY = (
  <>
    {ext(URLS.tnm, "tnm.jp")}, {ext(URLS.bank, "e-Gov")}, {ext(URLS.jrc, "jr-central.co.jp")}
  </>
);
const SOURCES_PASS = (
  <>
    {ext(URLS.arch, "westjr.co.jp")}, {ext(URLS.jrp, "japanrailpass.net")}
  </>
);

const COPY: Record<Locale, Copy> = {
  en: {
    routesH2: "What Is the Best Japan Itinerary for Winter?",
    routesAnswer: (
      <>
        For 7 days, Tokyo (3 nights) → Kanazawa (2) → Kyoto (1), with a snow day at GALA Yuzawa and a
        Shirakawa-go day from Kanazawa; the rail legs come to about ¥22,800 on single tickets. For 10 days, add 2 nights of skiing in
        Hakuba on the way to Kanazawa — the Hokuriku Shinkansen stops at Nagano, so it costs no extra rail leg.
      </>
    ),
    routesHead: ["Days", "Route (nights)", "Main winter experiences", "Pass to use"],
    routes: [
      [
        "7 days (best first winter trip)",
        "Tokyo 3 → Kanazawa 2 → Kyoto 1, fly out of Kansai",
        "Tokyo illuminations; GALA Yuzawa snow day (slopes from 19 Dec); Kenroku-en in snow; Shirakawa-go by bus (1 h 15 min, ¥2,900)",
        "Single tickets: Tokyo → Kanazawa ¥14,400 + Kanazawa → Kyoto ¥6,500 + Osaka → Kansai Airport ¥1,900 = ¥22,800, under the ¥35,000 Hokuriku Arch Pass. GALA is extra",
      ],
      [
        "10 days (snow + onsen + Kanazawa)",
        "Tokyo 3 → Hakuba 2 → Kanazawa 2 → Kyoto 2, fly out of Kansai",
        "Skiing in Hakuba (Tokyo–Nagano about 80 min + Alpico bus 70 min); onsen after the slopes; Shirakawa-go light-up if you hold a 11/17/24/31 Jan ticket",
        "Single tickets, or the Hokuriku Arch Pass (¥35,000, 7 days, covers Nagano) if you add Hokuriku Shinkansen side trips; the Hakuba bus is extra",
      ],
      [
        "12 days (the day-by-day plan below)",
        "Tokyo 4 → Kanazawa 2 → Takayama 2 → Kyoto 2 → Osaka 1",
        "All of the above plus Takayama and the Nohi Bus light-up coach",
        "Price the JR Pass (7 days ¥50,000 online): Takayama → Nagoya → Kyoto is JR Central, outside the Arch Pass",
      ],
      [
        "12 days, 20 Dec – 1 Jan",
        "Tokyo 3 → Ginzan Onsen 1 → Tokyo 1 → Hakuba 3 → Kanazawa 2 → Kyoto 1",
        "Ginzan Onsen gas lamps (Tokyo–Oishida about 3 h 20 min + bus 35–40 min); skiing over Christmas; Kanazawa; New Year in Kyoto",
        "JR EAST PASS (¥35,000, 5 days) for Tokyo ⇄ Oishida and Tokyo → Nagano; Nagano → Kanazawa ¥8,970 and Kanazawa → Kyoto ¥6,500 as single tickets; buses extra",
      ],
    ],
    routesNote: (
      <>
        Last checked: 27 November 2026 — pass prices {SOURCES_PASS}; GALA season {ext(URLS.gala, "gala.co.jp")};
        light-up dates {ext(URLS.shirakawa, "shirakawa-go.gr.jp")}. Journey times are carried from our{" "}
        <Link href="/guides/attractions/ginzan-onsen-tour">Ginzan Onsen guide</Link> and our{" "}
        <Link href="/guides/attractions/japan-ski-trip-itinerary">Japan ski trip itinerary</Link>.
      </>
    ),
    comboH2: "Can I Combine Skiing, Onsen and Kanazawa in One Winter Trip?",
    comboAnswer: (
      <>
        Yes — 10 days is enough, because Nagano (for Hakuba and Nozawa Onsen) and Kanazawa sit on the same
        Hokuriku Shinkansen line from Tokyo. Ginzan Onsen is the exception: it is on the Yamagata Shinkansen, a
        different line, so it costs a night and a return through Tokyo — which is why the 20 Dec – 1 Jan row above
        is 12 days. For snow monsters on the same Yamagata line, see our{" "}
        <Link href="/guides/attractions/zao-snow-monsters-tour">Zao snow monsters tour guide</Link>.
      </>
    ),
    closedH2: "What Closes in Japan Over New Year?",
    closedAnswer: (
      <>
        Banks close 31 December – 3 January and government offices 29 December – 3 January; most museums shut for
        part of the week. Shrines, temples, the shinkansen and the ski resorts stay open. Two winter closures catch
        out a 20 December – 1 January trip: the Sagano Romantic Train stops after 29 December, and the Shirakawa-go
        light-up is only in January.
      </>
    ),
    closedHead: ["What", "Dates", "What it means for the trip", "Source"],
    closed: [
      ["Bank branches / government offices", "Closed 31 Dec – 3 Jan / 29 Dec – 3 Jan", "Use ATMs at 7-Eleven or Japan Post; carry cash for buses", "e-Gov (law)"],
      ["Sagano Romantic Train (Kyoto)", "Last run of the current train 29 Dec 2026; new train from 1 Mar 2027", "No trains 30 Dec 2026 – 28 Feb 2027 — Arashiyama without it", "Sagano Scenic Railway"],
      ["Shirakawa-go light-up", "11, 17, 24, 31 Jan 2027, 17:30–19:30", "Not in December; advance tickets only, none sold on the day", "Shirakawa-go Tourist Association"],
      ["GALA Yuzawa", "Sightseeing only 12–18 Dec 2026; slopes 19 Dec 2026 – 5 May 2027", "Open over New Year; gondola & lift ¥8,000 adult (¥7,500 online)", "GALA Yuzawa"],
      ["Tokyo National Museum", "Closed 26–31 Dec 2026; open 1 Jan 2027 12:00–20:00", "Plan museums for 1 Jan or later", "Tokyo National Museum"],
      ["Tokaido Shinkansen / Kinkaku-ji", "449 trains a day 25 Dec – 5 Jan / open every day 9:00–17:00", "Runs and opens through the holiday — book seats a month ahead", "JR Central; Shokoku-ji"],
    ],
    closedNote: (
      <>
        Last checked: 27 November 2026 for the Sagano, Shirakawa-go and GALA rows ({SOURCES_TODAY}). The bank,
        museum, shinkansen and Kinkaku-ji rows are the values our{" "}
        <Link href="/guides/attractions/japan-new-year-itinerary">Japan New Year itinerary</Link> read on 20
        November 2026 ({SOURCES_NY}).
      </>
    ),
    passH2: "Is a JR Pass Worth It for a Winter Trip?",
    passAnswer: (
      <>
        Usually not. A Tokyo → Kanazawa → Kyoto → Kansai Airport run is about ¥22,800 on single tickets, against
        ¥35,000 for the Hokuriku Arch Pass and ¥50,000 for a 7-day JR Pass. A pass only pays once you add long
        legs: Hokuriku Shinkansen side trips for the Arch Pass, or the Yamagata (Ginzan) and Joetsu (GALA)
        lines for the ¥35,000 5-day JR EAST PASS.
      </>
    ),
    passHead: ["Pass", "Price (adult)", "Covers", "Does not cover"],
    passes: [
      ["Single tickets (best for the 7-day route)", "About ¥22,800", "Tokyo → Kanazawa ¥14,400, Kanazawa → Kyoto ¥6,500, Osaka → Kansai Airport ¥1,900", "Nothing to activate; buy each leg"],
      ["Hokuriku Arch Pass", "¥35,000 / 7 days", "Hokuriku Shinkansen Tokyo–Tsuruga (incl. Nagano, Kanazawa), Thunderbird, HARUKA", "Tokaido Shinkansen; Joetsu beyond Takasaki (GALA); private buses"],
      ["JR EAST PASS", "¥35,000 / 5 days", "JR East lines incl. the Yamagata and Joetsu Shinkansen (Ginzan, GALA) and Tokyo–Nagano", "Nagano → Kanazawa (JR West); private buses"],
      ["JAPAN RAIL PASS", "¥50,000 / 7 days; ¥80,000 / 14 days (online)", "All JR shinkansen (Nozomi needs a supplement)", "Private buses (Ginzan, Hakuba, Shirakawa-go)"],
    ],
    passNote: (
      <>
        Last checked: 27 November 2026 — {SOURCES_PASS}. The single fares (e5489, HOKURIKU and HARUKA one-way
        tickets) and the JR EAST PASS price are the values our{" "}
        <Link href="/guides/transport/hokuriku-arch-pass">Hokuriku Arch Pass guide</Link> and{" "}
        <Link href="/guides/transport/jr-east-pass">JR East Pass guide</Link> read on 22 and 17 November 2026.
      </>
    ),
    cta: {
      tourHakuba: "Hakuba ski day from Tokyo →",
      tourShirakawa: "Shirakawa-go day from Kanazawa →",
      tourGinzan: "2-day Ginzan Onsen tour from Tokyo →",
      rental: "Hakuba bus + lift + rental →",
      arch: "Hokuriku Arch Pass →",
      jrp: "Price the JR Pass →",
      esim: "Klook Japan eSIM →",
    },
  },
  ko: {
    routesH2: "겨울 일본 여행 일정은 어떻게 짜는 게 가장 좋나요?",
    routesAnswer: (
      <>
        7일이면 도쿄 3박 → 가나자와 2박 → 교토 1박에 갈라 유자와 눈 체험과 가나자와 출발 시라카와고를 넣고, 철도는 개별 승차권으로 약 ¥22,800입니다. 10일이면 가나자와로 가는 길에 하쿠바 스키 2박을 더합니다. 호쿠리쿠 신칸센이 나가노에 서기 때문에 철도 구간이 늘지 않습니다.
      </>
    ),
    routesHead: ["일수", "경로(숙박)", "주요 겨울 체험", "쓸 패스"],
    routes: [
      ["7일 (첫 겨울 여행 추천)", "도쿄 3 → 가나자와 2 → 교토 1, 간사이 출국", "도쿄 일루미네이션, 갈라 유자와 눈 체험(12/19부터 활주), 눈 덮인 겐로쿠엔, 시라카와고 버스(1시간 15분, ¥2,900)", "개별 승차권: 도쿄→가나자와 ¥14,400 + 가나자와→교토 ¥6,500 + 오사카→간사이공항 ¥1,900 = ¥22,800로 호쿠리쿠 아치 패스(¥35,000)보다 저렴. 갈라는 별도"],
      ["10일 (스키+온천+가나자와)", "도쿄 3 → 하쿠바 2 → 가나자와 2 → 교토 2, 간사이 출국", "하쿠바 스키(도쿄–나가노 약 80분 + 알피코 버스 70분), 스키 후 온천, 1월 11·17·24·31일 티켓이 있으면 시라카와고 라이트업", "개별 승차권, 또는 호쿠리쿠 신칸센 왕복을 더하면 호쿠리쿠 아치 패스(¥35,000, 7일, 나가노 포함). 하쿠바 버스는 별도"],
      ["12일 (아래 일자별 일정)", "도쿄 4 → 가나자와 2 → 다카야마 2 → 교토 2 → 오사카 1", "위 내용 + 다카야마와 노히 버스 라이트업 버스", "JR 패스(온라인 7일 ¥50,000)와 비교: 다카야마→나고야→교토는 JR 도카이라 아치 패스 범위 밖"],
      ["12일, 12/20~1/1", "도쿄 3 → 긴잔 온천 1 → 도쿄 1 → 하쿠바 3 → 가나자와 2 → 교토 1", "긴잔 온천 가스등(도쿄–오이시다 약 3시간 20분 + 버스 35~40분), 크리스마스 스키, 가나자와, 교토에서 새해", "JR 동일본 패스(¥35,000, 5일)로 도쿄⇄오이시다, 도쿄→나가노. 나가노→가나자와 ¥8,970, 가나자와→교토 ¥6,500은 개별 승차권. 버스는 별도"],
    ],
    routesNote: (
      <>
        Last checked: 2026년 11월 27일 — 패스 가격 {SOURCES_PASS}, 갈라 영업기간 {ext(URLS.gala, "gala.co.jp")}, 라이트업 날짜 {ext(URLS.shirakawa, "shirakawa-go.gr.jp")}. 소요 시간은 영어판 긴잔 온천·스키 일정 가이드의 확인값입니다.
      </>
    ),
    comboH2: "스키, 온천, 가나자와를 한 번의 겨울 여행에 넣을 수 있나요?",
    comboAnswer: (
      <>
        네, 10일이면 됩니다. 나가노(하쿠바·노자와 온천)와 가나자와가 도쿄에서 같은 호쿠리쿠 신칸센 노선 위에 있기 때문입니다. 긴잔 온천은 예외로 다른 노선인 야마가타 신칸센이라 1박과 도쿄 경유 왕복이 필요하고, 그래서 위 표의 12/20~1/1 일정이 12일입니다.
      </>
    ),
    closedH2: "일본은 연말연시에 무엇이 문을 닫나요?",
    closedAnswer: (
      <>
        은행은 12월 31일~1월 3일, 관공서는 12월 29일~1월 3일에 쉬고 박물관도 대부분 며칠 휴관합니다. 신사·절, 신칸센, 스키장은 엽니다. 12/20~1/1 여행에서 놓치기 쉬운 것은 두 가지입니다. 사가노 도롯코 열차는 12월 29일 이후 운행하지 않고, 시라카와고 라이트업은 1월에만 열립니다.
      </>
    ),
    closedHead: ["항목", "날짜", "여행에 미치는 영향", "출처"],
    closed: [
      ["은행 창구 / 관공서", "12/31~1/3 휴무 / 12/29~1/3 휴무", "세븐일레븐·우체국 ATM 이용, 버스용 현금 준비", "e-Gov(법령)"],
      ["사가노 도롯코 열차(교토)", "현행 차량 마지막 운행 2026/12/29, 신형 2027/3/1부터", "2026/12/30~2027/2/28 운행 없음 — 아라시야마는 열차 없이", "사가노 관광철도"],
      ["시라카와고 라이트업", "2027/1/11·17·24·31, 17:30~19:30", "12월에는 없음. 사전 예약 티켓만, 당일 판매 없음", "시라카와고 관광협회"],
      ["갈라 유자와", "관광 영업 2026/12/12~18, 활주 2026/12/19~2027/5/5", "연말연시 영업. 곤돌라·리프트권 성인 ¥8,000(웹 ¥7,500)", "갈라 유자와"],
      ["도쿄 국립박물관", "2026/12/26~31 휴관, 2027/1/1 12:00~20:00 개관", "박물관은 1/1 이후로", "도쿄 국립박물관"],
      ["도카이도 신칸센 / 긴카쿠지", "12/25~1/5 하루 449편 / 매일 9:00~17:00", "연휴에도 운행·개관 — 좌석은 1개월 전에 예약", "JR 도카이, 쇼코쿠지"],
    ],
    closedNote: (
      <>
        Last checked: 2026년 11월 27일(사가노·시라카와고·갈라 행, {SOURCES_TODAY}). 은행·박물관·신칸센·긴카쿠지 행은 영어판 New Year 일정 가이드가 2026년 11월 20일에 확인한 값입니다({SOURCES_NY}).
      </>
    ),
    passH2: "겨울 여행에 JR 패스가 이득인가요?",
    passAnswer: (
      <>
        대개 아닙니다. 도쿄→가나자와→교토→간사이공항은 개별 승차권으로 약 ¥22,800로, 호쿠리쿠 아치 패스 ¥35,000, JR 패스 7일 ¥50,000보다 저렴합니다. 패스는 장거리 구간을 더할 때만 이득입니다. 호쿠리쿠 신칸센 왕복을 더하면 아치 패스, 야마가타(긴잔)·조에쓰(갈라) 노선을 더하면 5일 ¥35,000 JR 동일본 패스입니다.
      </>
    ),
    passHead: ["패스", "가격(성인)", "포함", "불포함"],
    passes: [
      ["개별 승차권(7일 경로에 최적)", "약 ¥22,800", "도쿄→가나자와 ¥14,400, 가나자와→교토 ¥6,500, 오사카→간사이공항 ¥1,900", "구간마다 구매"],
      ["호쿠리쿠 아치 패스", "¥35,000 / 7일", "호쿠리쿠 신칸센 도쿄–쓰루가(나가노·가나자와 포함), 선더버드, 하루카", "도카이도 신칸센, 다카사키 이후 조에쓰(갈라), 민영 버스"],
      ["JR 동일본 패스", "¥35,000 / 5일", "야마가타·조에쓰 신칸센(긴잔, 갈라), 도쿄–나가노 등 JR 동일본 노선", "나가노→가나자와(JR 서일본), 민영 버스"],
      ["JR 패스", "¥50,000 / 7일, ¥80,000 / 14일(온라인)", "JR 신칸센 전체(노조미는 추가 요금)", "민영 버스(긴잔, 하쿠바, 시라카와고)"],
    ],
    passNote: <>Last checked: 2026년 11월 27일 — {SOURCES_PASS}. 개별 운임과 JR 동일본 패스 가격은 영어판 호쿠리쿠 아치 패스·JR 동일본 패스 가이드가 2026년 11월 22일·17일에 확인한 값입니다.</>,
    cta: {
      tourHakuba: "도쿄 출발 하쿠바 스키 당일 →",
      tourShirakawa: "가나자와 출발 시라카와고 →",
      tourGinzan: "도쿄 출발 긴잔 온천 1박 2일 →",
      rental: "하쿠바 버스+리프트+렌탈 →",
      arch: "호쿠리쿠 아치 패스 →",
      jrp: "JR 패스 가격 보기 →",
      esim: "클룩 일본 eSIM →",
    },
  },
  "zh-tw": {
    routesH2: "日本冬季行程怎麼排最好？",
    routesAnswer: (
      <>
        7 天：東京 3 晚 → 金澤 2 晚 → 京都 1 晚，加上 GALA 湯澤玩雪日與金澤出發的白川鄉，鐵路用單程票約 ¥22,800。10 天：前往金澤途中加 2 晚白馬滑雪，北陸新幹線停靠長野，不必多加鐵路段。
      </>
    ),
    routesHead: ["天數", "路線（住宿）", "主要冬季體驗", "使用票券"],
    routes: [
      ["7 天（第一次冬季旅行首選）", "東京 3 → 金澤 2 → 京都 1，關西出境", "東京燈飾；GALA 湯澤玩雪（12/19 起開滑）；雪中兼六園；巴士往白川鄉（1 小時 15 分，¥2,900）", "單程票：東京→金澤 ¥14,400＋金澤→京都 ¥6,500＋大阪→關西機場 ¥1,900＝¥22,800，比北陸拱型周遊券 ¥35,000 便宜。GALA 另購"],
      ["10 天（滑雪＋溫泉＋金澤）", "東京 3 → 白馬 2 → 金澤 2 → 京都 2，關西出境", "白馬滑雪（東京–長野約 80 分＋Alpico 巴士 70 分）；滑雪後泡湯；持 1/11、17、24、31 門票可看白川鄉點燈", "單程票；若再加北陸新幹線來回，可用北陸拱型周遊券（¥35,000、7 天、含長野）。白馬巴士另付"],
      ["12 天（下方逐日行程）", "東京 4 → 金澤 2 → 高山 2 → 京都 2 → 大阪 1", "以上全部＋高山與濃飛巴士點燈專車", "比較 JR Pass（線上 7 天 ¥50,000）：高山→名古屋→京都屬 JR 東海，不在拱型周遊券內"],
      ["12 天，12/20–1/1", "東京 3 → 銀山溫泉 1 → 東京 1 → 白馬 3 → 金澤 2 → 京都 1", "銀山溫泉煤氣燈（東京–大石田約 3 小時 20 分＋巴士 35–40 分）；聖誕節滑雪；金澤；在京都跨年", "JR 東日本鐵路周遊券（¥35,000、5 天）搭東京⇄大石田、東京→長野；長野→金澤 ¥8,970、金澤→京都 ¥6,500 買單程票；巴士另付"],
    ],
    routesNote: (
      <>
        Last checked：2026年11月27日 — 票價 {SOURCES_PASS}；GALA 營業期間 {ext(URLS.gala, "gala.co.jp")}；點燈日期 {ext(URLS.shirakawa, "shirakawa-go.gr.jp")}。車程沿用英文版銀山溫泉與滑雪行程指南的確認值。
      </>
    ),
    comboH2: "滑雪、溫泉和金澤可以排進同一趟冬季旅行嗎？",
    comboAnswer: (
      <>
        可以，10 天就夠。長野（白馬、野澤溫泉）和金澤都在東京出發的同一條北陸新幹線上。銀山溫泉是例外：它在另一條山形新幹線上，需要多住一晚並經東京往返，所以上表 12/20–1/1 的行程是 12 天。
      </>
    ),
    closedH2: "日本過年期間哪些地方會休息？",
    closedAnswer: (
      <>
        銀行 12 月 31 日至 1 月 3 日、政府機關 12 月 29 日至 1 月 3 日休息，多數博物館也會休館幾天；神社寺院、新幹線和滑雪場照常營業。12/20–1/1 的旅程容易踩雷的有兩個：嵯峨野觀光小火車 12 月 29 日後停駛，白川鄉點燈只在 1 月。
      </>
    ),
    closedHead: ["項目", "日期", "對行程的影響", "來源"],
    closed: [
      ["銀行櫃台／政府機關", "12/31–1/3 休／12/29–1/3 休", "用 7-Eleven 或郵局 ATM，備好搭巴士的現金", "e-Gov（法令）"],
      ["嵯峨野觀光小火車（京都）", "現行車輛 2026/12/29 最後營運，新車 2027/3/1 起", "2026/12/30–2027/2/28 不行駛，嵐山改走不搭車的路線", "嵯峨野觀光鐵道"],
      ["白川鄉點燈", "2027/1/11、17、24、31，17:30–19:30", "12 月沒有；只售預約門票，當天不售票", "白川鄉觀光協會"],
      ["GALA 湯澤", "觀光營業 2026/12/12–18；滑雪 2026/12/19–2027/5/5", "過年照常營業；纜車＋吊椅票成人 ¥8,000（網路 ¥7,500）", "GALA 湯澤"],
      ["東京國立博物館", "2026/12/26–31 休館；2027/1/1 12:00–20:00 開館", "博物館排在 1/1 以後", "東京國立博物館"],
      ["東海道新幹線／金閣寺", "12/25–1/5 每天 449 班／每天 9:00–17:00", "連假照常行駛、開放，座位一個月前預訂", "JR 東海、相國寺"],
    ],
    closedNote: (
      <>
        Last checked：2026年11月27日（嵯峨野、白川鄉、GALA 各列，{SOURCES_TODAY}）。銀行、博物館、新幹線、金閣寺各列為英文版過年行程指南 2026年11月20日確認的數值（{SOURCES_NY}）。
      </>
    ),
    passH2: "冬季旅行買 JR Pass 划算嗎？",
    passAnswer: (
      <>
        通常不划算。東京→金澤→京都→關西機場用單程票約 ¥22,800，低於北陸拱型周遊券 ¥35,000 和 JR Pass 7 天 ¥50,000。只有加上長途路段時周遊券才划算：加北陸新幹線來回用拱型周遊券，加山形（銀山）、上越（GALA）路線用 5 天 ¥35,000 的 JR 東日本鐵路周遊券。
      </>
    ),
    passHead: ["票券", "價格（成人）", "涵蓋", "不涵蓋"],
    passes: [
      ["單程票（7 天路線首選）", "約 ¥22,800", "東京→金澤 ¥14,400、金澤→京都 ¥6,500、大阪→關西機場 ¥1,900", "逐段購買"],
      ["北陸拱型周遊券", "¥35,000／7 天", "北陸新幹線東京–敦賀（含長野、金澤）、雷鳥號、HARUKA", "東海道新幹線；高崎以北的上越新幹線（GALA）；民營巴士"],
      ["JR 東日本鐵路周遊券", "¥35,000／5 天", "JR 東日本路線，含山形、上越新幹線（銀山、GALA）與東京–長野", "長野→金澤（JR 西日本）；民營巴士"],
      ["JR Pass 全國版", "¥50,000／7 天；¥80,000／14 天（線上）", "全部 JR 新幹線（希望號需補費）", "民營巴士（銀山、白馬、白川鄉）"],
    ],
    passNote: <>Last checked：2026年11月27日 — {SOURCES_PASS}。單程票價與 JR 東日本鐵路周遊券價格為英文版北陸拱型周遊券、JR 東日本周遊券指南於 2026年11月22日、17日確認的數值。</>,
    cta: {
      tourHakuba: "東京出發白馬滑雪一日遊 →",
      tourShirakawa: "金澤出發白川鄉一日遊 →",
      tourGinzan: "東京出發銀山溫泉 2 天 →",
      rental: "白馬巴士＋纜車＋租借 →",
      arch: "北陸拱型周遊券 →",
      jrp: "查看 JR Pass 價格 →",
      esim: "Klook 日本 eSIM →",
    },
  },
  "zh-cn": {
    routesH2: "日本冬季行程怎么排最好？",
    routesAnswer: (
      <>
        7 天：东京 3 晚 → 金泽 2 晚 → 京都 1 晚，加上 GALA 汤泽玩雪日和金泽出发的白川乡，铁路用单程票约 ¥22,800。10 天：去金泽途中加 2 晚白马滑雪，北陆新干线停靠长野，不必多加铁路段。
      </>
    ),
    routesHead: ["天数", "路线（住宿）", "主要冬季体验", "使用票券"],
    routes: [
      ["7 天（第一次冬季旅行首选）", "东京 3 → 金泽 2 → 京都 1，关西出境", "东京灯饰；GALA 汤泽玩雪（12/19 起开滑）；雪中兼六园；巴士去白川乡（1 小时 15 分，¥2,900）", "单程票：东京→金泽 ¥14,400＋金泽→京都 ¥6,500＋大阪→关西机场 ¥1,900＝¥22,800，比北陆拱形周游券 ¥35,000 便宜。GALA 另购"],
      ["10 天（滑雪＋温泉＋金泽）", "东京 3 → 白马 2 → 金泽 2 → 京都 2，关西出境", "白马滑雪（东京–长野约 80 分＋Alpico 巴士 70 分）；滑雪后泡温泉；持 1/11、17、24、31 门票可看白川乡点灯", "单程票；若再加北陆新干线往返，可用北陆拱形周游券（¥35,000、7 天、含长野）。白马巴士另付"],
      ["12 天（下方逐日行程）", "东京 4 → 金泽 2 → 高山 2 → 京都 2 → 大阪 1", "以上全部＋高山和浓飞巴士点灯专车", "对比 JR Pass（线上 7 天 ¥50,000）：高山→名古屋→京都属 JR 东海，不在拱形周游券内"],
      ["12 天，12/20–1/1", "东京 3 → 银山温泉 1 → 东京 1 → 白马 3 → 金泽 2 → 京都 1", "银山温泉煤气灯（东京–大石田约 3 小时 20 分＋巴士 35–40 分）；圣诞节滑雪；金泽；在京都跨年", "JR 东日本铁路周游券（¥35,000、5 天）坐东京⇄大石田、东京→长野；长野→金泽 ¥8,970、金泽→京都 ¥6,500 买单程票；巴士另付"],
    ],
    routesNote: (
      <>
        Last checked：2026年11月27日 — 票价 {SOURCES_PASS}；GALA 营业期间 {ext(URLS.gala, "gala.co.jp")}；点灯日期 {ext(URLS.shirakawa, "shirakawa-go.gr.jp")}。车程沿用英文版银山温泉和滑雪行程指南的确认值。
      </>
    ),
    comboH2: "滑雪、温泉和金泽可以排进同一趟冬季旅行吗？",
    comboAnswer: (
      <>
        可以，10 天就够。长野（白马、野泽温泉）和金泽都在东京出发的同一条北陆新干线上。银山温泉是例外：它在另一条山形新干线上，需要多住一晚并经东京往返，所以上表 12/20–1/1 的行程是 12 天。
      </>
    ),
    closedH2: "日本过年期间哪些地方会休息？",
    closedAnswer: (
      <>
        银行 12 月 31 日至 1 月 3 日、政府机关 12 月 29 日至 1 月 3 日休息，多数博物馆也会闭馆几天；神社寺院、新干线和滑雪场照常营业。12/20–1/1 的行程容易踩坑的有两个：嵯峨野观光小火车 12 月 29 日后停运，白川乡点灯只在 1 月。
      </>
    ),
    closedHead: ["项目", "日期", "对行程的影响", "来源"],
    closed: [
      ["银行柜台／政府机关", "12/31–1/3 休／12/29–1/3 休", "用 7-Eleven 或邮局 ATM，备好坐巴士的现金", "e-Gov（法令）"],
      ["嵯峨野观光小火车（京都）", "现行车辆 2026/12/29 最后运营，新车 2027/3/1 起", "2026/12/30–2027/2/28 不运行，岚山改走不坐车的路线", "嵯峨野观光铁道"],
      ["白川乡点灯", "2027/1/11、17、24、31，17:30–19:30", "12 月没有；只售预约门票，当天不售票", "白川乡观光协会"],
      ["GALA 汤泽", "观光营业 2026/12/12–18；滑雪 2026/12/19–2027/5/5", "过年照常营业；缆车＋吊椅票成人 ¥8,000（网购 ¥7,500）", "GALA 汤泽"],
      ["东京国立博物馆", "2026/12/26–31 闭馆；2027/1/1 12:00–20:00 开馆", "博物馆排在 1/1 以后", "东京国立博物馆"],
      ["东海道新干线／金阁寺", "12/25–1/5 每天 449 班／每天 9:00–17:00", "假期照常运行、开放，座位提前一个月预订", "JR 东海、相国寺"],
    ],
    closedNote: (
      <>
        Last checked：2026年11月27日（嵯峨野、白川乡、GALA 各行，{SOURCES_TODAY}）。银行、博物馆、新干线、金阁寺各行为英文版过年行程指南 2026年11月20日确认的数值（{SOURCES_NY}）。
      </>
    ),
    passH2: "冬季旅行买 JR Pass 划算吗？",
    passAnswer: (
      <>
        通常不划算。东京→金泽→京都→关西机场用单程票约 ¥22,800，低于北陆拱形周游券 ¥35,000 和 JR Pass 7 天 ¥50,000。只有加上长途路段时周游券才划算：加北陆新干线往返用拱形周游券，加山形（银山）、上越（GALA）线路用 5 天 ¥35,000 的 JR 东日本铁路周游券。
      </>
    ),
    passHead: ["票券", "价格（成人）", "覆盖", "不覆盖"],
    passes: [
      ["单程票（7 天路线首选）", "约 ¥22,800", "东京→金泽 ¥14,400、金泽→京都 ¥6,500、大阪→关西机场 ¥1,900", "逐段购买"],
      ["北陆拱形周游券", "¥35,000／7 天", "北陆新干线东京–敦贺（含长野、金泽）、雷鸟号、HARUKA", "东海道新干线；高崎以北的上越新干线（GALA）；民营巴士"],
      ["JR 东日本铁路周游券", "¥35,000／5 天", "JR 东日本线路，含山形、上越新干线（银山、GALA）和东京–长野", "长野→金泽（JR 西日本）；民营巴士"],
      ["JR Pass 全国版", "¥50,000／7 天；¥80,000／14 天（线上）", "全部 JR 新干线（希望号需补费）", "民营巴士（银山、白马、白川乡）"],
    ],
    passNote: <>Last checked：2026年11月27日 — {SOURCES_PASS}。单程票价和 JR 东日本铁路周游券价格为英文版北陆拱形周游券、JR 东日本周游券指南于 2026年11月22日、17日确认的数值。</>,
    cta: {
      tourHakuba: "东京出发白马滑雪一日游 →",
      tourShirakawa: "金泽出发白川乡一日游 →",
      tourGinzan: "东京出发银山温泉 2 天 →",
      rental: "白马巴士＋缆车＋租赁 →",
      arch: "北陆拱形周游券 →",
      jrp: "查看 JR Pass 价格 →",
      esim: "Klook 日本 eSIM →",
    },
  },
  th: {
    routesH2: "แผนเที่ยวญี่ปุ่นหน้าหนาวแบบไหนดีที่สุด?",
    routesAnswer: (
      <>
        7 วัน: โตเกียว 3 คืน → คานาซาวะ 2 คืน → เกียวโต 1 คืน พร้อมวันเล่นหิมะที่ GALA Yuzawa และชิราคาวาโกะจากคานาซาวะ ค่ารถไฟแบบตั๋วเดี่ยวราว ¥22,800 10 วัน: เพิ่มเล่นสกีที่ฮาคุบะ 2 คืนระหว่างทางไปคานาซาวะ เพราะชินคันเซ็นโฮคุริคุจอดที่นากาโนะ ไม่ต้องเพิ่มเส้นทางรถไฟ
      </>
    ),
    routesHead: ["จำนวนวัน", "เส้นทาง (คืน)", "ประสบการณ์หน้าหนาวหลัก", "บัตรที่ใช้"],
    routes: [
      ["7 วัน (เหมาะกับทริปหน้าหนาวครั้งแรก)", "โตเกียว 3 → คานาซาวะ 2 → เกียวโต 1 บินออกจากคันไซ", "ไฟประดับโตเกียว; เล่นหิมะ GALA Yuzawa (เปิดลานสกี 19 ธ.ค.); เคนโรคุเอ็นในหิมะ; รถบัสไปชิราคาวาโกะ (1 ชม. 15 นาที ¥2,900)", "ตั๋วเดี่ยว: โตเกียว→คานาซาวะ ¥14,400 + คานาซาวะ→เกียวโต ¥6,500 + โอซาก้า→สนามบินคันไซ ¥1,900 = ¥22,800 ถูกกว่า Hokuriku Arch Pass ¥35,000 ส่วน GALA จ่ายแยก"],
      ["10 วัน (สกี+ออนเซ็น+คานาซาวะ)", "โตเกียว 3 → ฮาคุบะ 2 → คานาซาวะ 2 → เกียวโต 2 บินออกจากคันไซ", "สกีฮาคุบะ (โตเกียว–นากาโนะ ~80 นาที + รถบัส Alpico 70 นาที); แช่ออนเซ็นหลังเล่นสกี; ไลต์อัปชิราคาวาโกะถ้ามีตั๋ว 11/17/24/31 ม.ค.", "ตั๋วเดี่ยว หรือ Hokuriku Arch Pass (¥35,000, 7 วัน, รวมนากาโนะ) ถ้าเพิ่มทริปไป-กลับบนชินคันเซ็นโฮคุริคุ รถบัสฮาคุบะจ่ายแยก"],
      ["12 วัน (แผนรายวันด้านล่าง)", "โตเกียว 4 → คานาซาวะ 2 → ทาคายามะ 2 → เกียวโต 2 → โอซาก้า 1", "ทั้งหมดข้างบน + ทาคายามะและรถบัสไลต์อัปของ Nohi Bus", "เทียบกับ JR Pass (ออนไลน์ 7 วัน ¥50,000): ทาคายามะ→นาโกย่า→เกียวโตเป็นของ JR Central ไม่อยู่ใน Arch Pass"],
      ["12 วัน 20 ธ.ค. – 1 ม.ค.", "โตเกียว 3 → กินซังออนเซ็น 1 → โตเกียว 1 → ฮาคุบะ 3 → คานาซาวะ 2 → เกียวโต 1", "ตะเกียงแก๊สกินซัง (โตเกียว–โออิชิดะ ~3 ชม. 20 นาที + รถบัส 35–40 นาที); สกีช่วงคริสต์มาส; คานาซาวะ; ปีใหม่ที่เกียวโต", "JR EAST PASS (¥35,000, 5 วัน) สำหรับโตเกียว⇄โออิชิดะ และโตเกียว→นากาโนะ; นากาโนะ→คานาซาวะ ¥8,970 และคานาซาวะ→เกียวโต ¥6,500 ซื้อตั๋วเดี่ยว; รถบัสจ่ายแยก"],
    ],
    routesNote: (
      <>
        Last checked: 27 พฤศจิกายน 2026 — ราคาบัตร {SOURCES_PASS}; ช่วงเปิด GALA {ext(URLS.gala, "gala.co.jp")}; วันไลต์อัป {ext(URLS.shirakawa, "shirakawa-go.gr.jp")} เวลาเดินทางใช้ค่าที่คู่มือภาษาอังกฤษเรื่องกินซังออนเซ็นและทริปสกีตรวจไว้
      </>
    ),
    comboH2: "รวมสกี ออนเซ็น และคานาซาวะในทริปหน้าหนาวเดียวได้ไหม?",
    comboAnswer: (
      <>
        ได้ 10 วันก็พอ เพราะนากาโนะ (ฮาคุบะ, โนซาวะออนเซ็น) กับคานาซาวะอยู่บนชินคันเซ็นโฮคุริคุสายเดียวกันจากโตเกียว ยกเว้นกินซังออนเซ็นที่อยู่บนชินคันเซ็นยามากาตะซึ่งเป็นคนละสาย ต้องเพิ่ม 1 คืนและย้อนผ่านโตเกียว แผน 20 ธ.ค. – 1 ม.ค. ในตารางจึงเป็น 12 วัน
      </>
    ),
    closedH2: "ช่วงปีใหม่ที่ญี่ปุ่นอะไรปิดบ้าง?",
    closedAnswer: (
      <>
        ธนาคารปิด 31 ธ.ค. – 3 ม.ค. หน่วยงานราชการปิด 29 ธ.ค. – 3 ม.ค. พิพิธภัณฑ์ส่วนใหญ่ปิดบางวัน ส่วนศาลเจ้า วัด ชินคันเซ็น และลานสกีเปิดตามปกติ ทริป 20 ธ.ค. – 1 ม.ค. มักพลาดสองอย่าง: รถไฟสายโรแมนติกซางาโนะหยุดหลัง 29 ธ.ค. และไลต์อัปชิราคาวาโกะมีเฉพาะเดือนมกราคม
      </>
    ),
    closedHead: ["อะไร", "วันที่", "ผลต่อทริป", "แหล่งที่มา"],
    closed: [
      ["เคาน์เตอร์ธนาคาร / ราชการ", "ปิด 31 ธ.ค. – 3 ม.ค. / ปิด 29 ธ.ค. – 3 ม.ค.", "ใช้ ATM ที่ 7-Eleven หรือไปรษณีย์ เตรียมเงินสดสำหรับรถบัส", "e-Gov (กฎหมาย)"],
      ["รถไฟโรแมนติกซางาโนะ (เกียวโต)", "ขบวนปัจจุบันวิ่งวันสุดท้าย 29 ธ.ค. 2026 ขบวนใหม่เริ่ม 1 มี.ค. 2027", "ไม่มีรถไฟ 30 ธ.ค. 2026 – 28 ก.พ. 2027 เที่ยวอาราชิยามะโดยไม่นั่งรถไฟ", "Sagano Scenic Railway"],
      ["ไลต์อัปชิราคาวาโกะ", "11, 17, 24, 31 ม.ค. 2027 เวลา 17:30–19:30", "ไม่มีในเดือนธันวาคม ตั๋วจองล่วงหน้าเท่านั้น ไม่ขายหน้างาน", "สมาคมการท่องเที่ยวชิราคาวาโกะ"],
      ["GALA Yuzawa", "ชมวิวอย่างเดียว 12–18 ธ.ค. 2026; ลานสกี 19 ธ.ค. 2026 – 5 พ.ค. 2027", "เปิดช่วงปีใหม่ ตั๋วกระเช้า+ลิฟต์ผู้ใหญ่ ¥8,000 (ออนไลน์ ¥7,500)", "GALA Yuzawa"],
      ["พิพิธภัณฑ์แห่งชาติโตเกียว", "ปิด 26–31 ธ.ค. 2026; เปิด 1 ม.ค. 2027 เวลา 12:00–20:00", "วางพิพิธภัณฑ์ไว้ตั้งแต่ 1 ม.ค.", "Tokyo National Museum"],
      ["ชินคันเซ็นโทไกโด / คินคาคุจิ", "449 ขบวนต่อวัน 25 ธ.ค. – 5 ม.ค. / เปิดทุกวัน 9:00–17:00", "วิ่งและเปิดตลอดวันหยุด จองที่นั่งล่วงหน้า 1 เดือน", "JR Central; Shokoku-ji"],
    ],
    closedNote: (
      <>
        Last checked: 27 พฤศจิกายน 2026 สำหรับแถวซางาโนะ ชิราคาวาโกะ และ GALA ({SOURCES_TODAY}) แถวธนาคาร พิพิธภัณฑ์ ชินคันเซ็น และคินคาคุจิเป็นค่าที่คู่มือปีใหม่ภาษาอังกฤษตรวจเมื่อ 20 พฤศจิกายน 2026 ({SOURCES_NY})
      </>
    ),
    passH2: "ทริปหน้าหนาวคุ้มไหมที่จะซื้อ JR Pass?",
    passAnswer: (
      <>
        ส่วนใหญ่ไม่คุ้ม เส้นทางโตเกียว→คานาซาวะ→เกียวโต→สนามบินคันไซ ใช้ตั๋วเดี่ยวราว ¥22,800 ถูกกว่า Hokuriku Arch Pass ¥35,000 และ JR Pass 7 วัน ¥50,000 บัตรจะคุ้มเมื่อเพิ่มเส้นทางไกล: ไป-กลับบนชินคันเซ็นโฮคุริคุสำหรับ Arch Pass หรือสายยามากาตะ (กินซัง) และโจเอ็ตสึ (GALA) สำหรับ JR EAST PASS 5 วัน ¥35,000
      </>
    ),
    passHead: ["บัตร", "ราคา (ผู้ใหญ่)", "ครอบคลุม", "ไม่ครอบคลุม"],
    passes: [
      ["ตั๋วเดี่ยว (ดีที่สุดสำหรับแผน 7 วัน)", "ราว ¥22,800", "โตเกียว→คานาซาวะ ¥14,400, คานาซาวะ→เกียวโต ¥6,500, โอซาก้า→สนามบินคันไซ ¥1,900", "ซื้อทีละช่วง"],
      ["Hokuriku Arch Pass", "¥35,000 / 7 วัน", "ชินคันเซ็นโฮคุริคุ โตเกียว–สึรุงะ (รวมนากาโนะ คานาซาวะ), Thunderbird, HARUKA", "ชินคันเซ็นโทไกโด; โจเอ็ตสึเลยทาคาซากิ (GALA); รถบัสเอกชน"],
      ["JR EAST PASS", "¥35,000 / 5 วัน", "สาย JR East รวมชินคันเซ็นยามากาตะและโจเอ็ตสึ (กินซัง, GALA) และโตเกียว–นากาโนะ", "นากาโนะ→คานาซาวะ (JR West); รถบัสเอกชน"],
      ["JR Pass", "¥50,000 / 7 วัน; ¥80,000 / 14 วัน (ออนไลน์)", "ชินคันเซ็น JR ทุกสาย (โนโซมิต้องจ่ายเพิ่ม)", "รถบัสเอกชน (กินซัง ฮาคุบะ ชิราคาวาโกะ)"],
    ],
    passNote: <>Last checked: 27 พฤศจิกายน 2026 — {SOURCES_PASS} ค่าตั๋วเดี่ยวและราคา JR EAST PASS เป็นค่าที่คู่มือภาษาอังกฤษเรื่อง Hokuriku Arch Pass และ JR East Pass ตรวจเมื่อ 22 และ 17 พฤศจิกายน 2026</>,
    cta: {
      tourHakuba: "ทัวร์สกีฮาคุบะจากโตเกียว →",
      tourShirakawa: "ชิราคาวาโกะจากคานาซาวะ →",
      tourGinzan: "ทัวร์กินซังออนเซ็น 2 วันจากโตเกียว →",
      rental: "ฮาคุบะ รถบัส+ลิฟต์+เช่าอุปกรณ์ →",
      arch: "Hokuriku Arch Pass →",
      jrp: "ดูราคา JR Pass →",
      esim: "Klook eSIM ญี่ปุ่น →",
    },
  },
};

function Table({ head, rows }: { head: Row4; rows: Row4[] }) {
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
            {rows.map((r) => (
              <tr key={r[0]}>
                <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{r[0]}</td>
                <td style={{ fontSize: "0.88rem" }}>{r[1]}</td>
                <td style={{ fontSize: "0.88rem" }}>{r[2]}</td>
                <td style={{ fontSize: "0.88rem" }}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

/** The routes table and the skiing/onsen/Kanazawa answer — goes right after the lead paragraph. */
export function WinterRoutesSection({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const k = (url: string) => (locale === "en" ? url : klookFor(url, locale));
  const cta = (url: string, label: string) => (
    <KlookLink key={url} href={k(url)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
      {label}
    </KlookLink>
  );
  return (
    <>
      <section className={styles.comparisonSection}>
        <h2 className={styles.sectionTitle}>{c.routesH2}</h2>
        <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{c.routesAnswer}</p>
        <Table head={c.routesHead} rows={c.routes} />
        <p className={styles.bodyText} style={noteStyle}>{c.routesNote}</p>
        <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
          {cta(hokurikuArchPass.url, c.cta.arch)}
          {cta(shirakawagoTakayamaKanazawaDayTour.url, c.cta.tourShirakawa)}
          {cta(klookEsim.url, c.cta.esim)}
        </div>
      </section>
      <section className={styles.comparisonSection}>
        <h2 className={styles.sectionTitle}>{c.comboH2}</h2>
        <p className={styles.bodyText}>{c.comboAnswer}</p>
        <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
          {cta(hakubaSkiResortDayTourTokyo.url, c.cta.tourHakuba)}
          {cta(hakubaHapponeBusLiftRental.url, c.cta.rental)}
          {cta(ginzanWineryTwoDayTourFromTokyo.url, c.cta.tourGinzan)}
        </div>
      </section>
    </>
  );
}

/** New Year / winter closures and the pass comparison. */
export function WinterClosuresSection({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const k = (url: string) => (locale === "en" ? url : klookFor(url, locale));
  const cta = (url: string, label: string) => (
    <KlookLink key={url} href={k(url)} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
      {label}
    </KlookLink>
  );
  return (
    <>
      <section className={styles.comparisonSection}>
        <h2 className={styles.sectionTitle}>{c.closedH2}</h2>
        <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{c.closedAnswer}</p>
        <Table head={c.closedHead} rows={c.closed} />
        <p className={styles.bodyText} style={noteStyle}>{c.closedNote}</p>
        <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
          {cta(hakubaSkiResortDayTourTokyo.url, c.cta.tourHakuba)}
          {cta(klookEsim.url, c.cta.esim)}
        </div>
      </section>
      <section className={styles.comparisonSection}>
        <h2 className={styles.sectionTitle}>{c.passH2}</h2>
        <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{c.passAnswer}</p>
        <Table head={c.passHead} rows={c.passes} />
        <p className={styles.bodyText} style={noteStyle}>{c.passNote}</p>
        <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
          {cta(hokurikuArchPass.url, c.cta.arch)}
          {cta(jrPassWholeJapanCurrent.url, c.cta.jrp)}
          {cta(klookEsim.url, c.cta.esim)}
        </div>
      </section>
    </>
  );
}
