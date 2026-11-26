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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import KlookTripPrep from "../../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../../components/BookingEsimCard";
import {
  jrHarukaUrl,
  osakaAmazingPass,
  osakaCastleNishinomaruWalkingTour,
  osakaCastleSameDayCards,
  osakaCastleTicket,
  osakaCastleTripPrep,
  osakaCastleUmedaTonboriDayTour,
  osakaSkyVistaHalfDayBusTour,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/osaka-castle-tickets) section by section as of
// 2026-11-26 (task-jtk-20261126-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (osakacastle.net, osaka-info.jp and
// osaka-amazing-pass.com, read 23 Oct 2026); nothing is added. Title term: 오사카성 천수각 — the name
// osaka-info.jp/ko uses for the keep (spot "osaka-castle-main-keep"), and the form Korean guides
// (trvlogue, tripstore) put in front of 입장료. The boat is 고자부네 놀잇배, as on osaka-info.jp's
// Korean Cool Osaka page; the pass is 오사카 주유패스, as on the other Korean Osaka pages.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/osaka-castle-tickets";
const TITLE = "오사카성 천수각 입장료 2026: 시간, 주유패스";
const H1 = "오사카성 천수각 입장료 2026: 요금, 운영 시간, 주유패스로 무료인 시설";
const DESC =
  "오사카성 천수각 입장료 성인 ¥1,200, 대학생·고등학생 ¥600. 9:00~18:00, 입장 마감 17:30. 유료 시설 5곳과 주유패스.";

const CHECKED_ISO = "2026-10-23";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);
const LAST_CHECKED_ISO = "2026-11-23";
const OFFICIAL_URL = "https://www.osakacastle.net/guide/";
// The pass price is owned by lib/attraction-prices.ts, shared with the English page.
const PASS_1_DAY = priceLabel(PRICES.osakaAmazingPass.adult, LOCALE);

const TICKET_URL = klookFor(osakaCastleTicket.url, LOCALE);
const PASS_URL = klookFor(osakaAmazingPass.url, LOCALE);
const WALK_URL = klookFor(osakaCastleNishinomaruWalkingTour.url, LOCALE);
const DAY_TOUR_URL = klookFor(osakaCastleUmedaTonboriDayTour.url, LOCALE);
const HARUKA_URL = klookFor(jrHarukaUrl, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const priceRows = [
  {
    tier: "성인",
    price: "¥1,200",
    what: "천수각 8개 층과 같은 날 도요토미 이시가키관 입장이 포함됩니다",
  },
  {
    tier: "대학생·고등학생",
    price: "¥600",
    what: "매표소에서 학생증을 보여 줘야 하며, 해외 학생은 ISIC 카드를 요구합니다. 학생증이 없으면 성인 요금입니다",
  },
  {
    tier: "중학생 이하",
    price: "무료",
    what: "나이를 확인할 수 있는 서류가 필요하며, 학생수첩, 보험증, 여권 모두 됩니다",
  },
  {
    tier: "단체(유료 입장 15명 이상)",
    price: "¥1,080 / ¥540",
    what: "각각 성인 요금과 학생 요금이며, 무료 대상은 그대로 무료입니다",
  },
  {
    tier: "오사카 주유패스 소지자",
    price: "무료",
    what: "패스 이용일마다 1회 입장할 수 있고, 이 시설에는 시간대 제한이 없습니다",
  },
];

const parkRows = [
  {
    place: "오사카성 천수각(천수각 박물관)",
    fee: "성인 ¥1,200",
    hours: "9:00~18:00(입장 마감 17:30)",
    pass: "패스로 무료",
    note: "도요토미 이시가키관 입장이 포함됩니다. 12월 28일~1월 1일 휴관",
  },
  {
    place: "니시노마루 정원",
    fee: "¥300(벚꽃 시즌 ¥350)",
    hours: "3~10월 9:00~17:00, 11~2월 9:00~16:30(입장 마감은 30분 전)",
    pass: "패스로 무료",
    note: "엽서에 나오는 천수각 풍경을 볼 수 있는 잔디밭으로, 벚나무가 약 300그루 있습니다. 월요일과 연말연시 휴무",
  },
  {
    place: "오사카성 고자부네 놀잇배",
    fee: "성인(16세 이상) ¥1,800, 초·중학생 ¥900, 65세 이상 ¥1,200, 미취학 아동 무료",
    hours: "10:00~16:30(마지막 출항)",
    pass: "패스로 무료지만, 현장에서 승선권으로 교환해야 합니다",
    note: "안쪽 해자를 약 20분 동안 한 바퀴 돕니다. 중학생 이하 어린이는 혼자 탈 수 없습니다",
  },
  {
    place: "오사카성 망루(야구라)",
    fee: "고등학생 이상 ¥900",
    hours: "10:00~16:30(입장 마감 16:00)",
    pass: "패스로 무료",
    note: "중요문화재인 망루로, 천수각이 아니라 성의 방어 시설 내부를 볼 수 있습니다",
  },
  {
    place: "가이요도 피규어 뮤지엄(미라이자 오사카성)",
    fee: "성인 ¥1,000 / 어린이 ¥500",
    hours: "9:30~17:30(입장 마감 17:00)",
    pass: "패스로 무료",
    note: "천수각 아래에 있는 옛 육군 사령부 건물 안에 있으며, 미라이자 건물 자체는 무료로 들어갈 수 있습니다",
  },
];

const accessRows = [
  {
    station: "JR 오사카조코엔역(오사카 순환선)",
    walk: "약 15~20분",
    note: "방문객 대부분이 이용하는 역입니다. 오사카조 홀 쪽으로 들어가며, 가는 길에 공원 카페 거리가 있습니다",
  },
  {
    station: "JR·오사카 메트로 모리노미야역",
    walk: "약 15~20분",
    note: "메트로 1번, 3-B번 출구. 남쪽에서 들어가는 길로, 오사카조코엔역 쪽보다 한산합니다",
  },
  {
    station: "오사카 메트로 다니마치욘초메역",
    walk: "약 15~20분",
    note: "다니마치선 1-B번 출구, 주오선 9번 출구. 서쪽에서 오테몬(大手門)을 지나 들어가는 길로, 원래 성의 정문으로 들어가는 경로입니다",
  },
  {
    station: "오사카 메트로·게이한 덴마바시역",
    walk: "약 15~20분",
    note: "메트로 다니마치선 3번 출구. 북쪽에서 들어가는 길로, 고자부네 승선장과 가장 가깝습니다",
  },
  {
    station: "오사카 메트로 오사카 비즈니스파크역",
    walk: "약 15~20분",
    note: "나가호리쓰루미료쿠치선 1번 출구. OBP 지역 고층 빌딩에 숙소를 잡았다면 편리합니다",
  },
];

const whoFor = [
  {
    title: "9:00에 가야 하는 경우",
    desc: `줄 서지 않고 천수각을 보고 싶다면 9:00에 가세요. 천수각은 9:00에 문을 열고, 박물관 공식 사이트는 붐비는 날에는 17:30 마감보다 일찍 입장을 제한할 수 있다고 안내합니다. 개관 직후는 입장이 제한되지 않는 시간이고, 오후를 통째로 정원과 고자부네에 쓸 수 있습니다. ${CHECKED} 확인.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "오후에 가야 하는 경우",
    desc: "박물관보다 공원이 더 중요하다면 오후에 가세요. 공원은 무료이고 천수각이 18:00에 문을 닫은 뒤에도 오래 열려 있으며, 해가 지면 천수각에 야간 조명이 켜집니다. 해 질 녘에 오테몬에서 걸어 들어가는 길이 이곳에서 가장 좋은 사진 장소입니다. 다만 성 안에서 더 일찍 끝나는 시설에 주의하세요. 고자부네는 16:30, 망루도 16:30에 끝납니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "패스를 사야 하는 경우",
    desc: `천수각 말고도 둘러볼 계획이라면 패스를 사세요. 오사카성 공원 안의 유료 시설 5곳을 성인 1명이 현장에서 모두 이용하면 ¥5,200이고, 5곳 모두 1일 ${PASS_1_DAY}의 오사카 주유패스로 무료이며 지하철도 탈 수 있습니다. 천수각, 고자부네, 가이요도 피규어 뮤지엄(¥4,000)만으로도 패스 가격을 넘습니다. 시설 목록은 ${CHECKED}, 패스 가격은 2026년 11월 9일 확인.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
        <path d="M12 6v12" strokeDasharray="2 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "입장권을 사기 전에 유료 시설이 몇 곳인지 세어 보세요",
    desc: `천수각은 ¥1,200이고, 대부분의 사람은 여기까지만 봅니다. 하지만 같은 성벽 안에 유료 시설이 4곳 더 있습니다. 니시노마루 정원, 고자부네, 망루, 미라이자의 가이요도 피규어 뮤지엄으로, 성인 1명이 모두 이용하면 ¥5,200입니다. 어떤 입장권을 살지는 천수각이 아니라 이 중 2곳을 갈지 5곳을 모두 갈지에 따라 정해집니다. ${CHECKED} 확인.`,
  },
  {
    title: "3곳 이상이면 패스가 더 저렴합니다",
    desc: `5곳 모두 오사카 주유패스로 무료 입장할 수 있고, 패스는 1일 ${PASS_1_DAY}입니다(공식 요금, 2026년 11월 9일 확인). 천수각과 고자부네는 현장 요금 ¥3,000, 천수각, 정원, 고자부네는 ¥3,300으로 둘 다 패스 가격보다 조금 적으므로, 그날 지하철 요금까지 더해야 이득입니다. 천수각, 고자부네, 가이요도 피규어 뮤지엄은 ¥4,000으로, 성벽 안에서만 패스 가격을 넘습니다.`,
  },
  {
    title: "천수각만 간다면 단일 입장권을 미리 예매하세요",
    desc: "박물관은 자체 온라인 예매 사이트에서 입장권을 판매하고, 클룩에서는 같은 입장권을 해외 발급 카드로 결제할 수 있습니다. 둘 다 필수는 아니고 당일에 매표소에서도 살 수 있지만, 미리 예매하면 입구에서 줄을 서는 대신 휴대폰의 코드로 입장할 수 있어 봄 주말에 도움이 됩니다. 결제 전에 예약 화면의 취소 규정을 확인하세요.",
  },
  {
    title: "고자부네는 당일 현장에서 구매하세요",
    desc: "고자부네는 이곳에서 미리 정해 둘 수 없는 유일한 시설입니다. 승선권은 천수각 북쪽, 고쿠라쿠바시 바로 서쪽의 매표소에서 판매하고, 패스 소지자도 같은 곳에서 탑승 시간이 적힌 승선권으로 교환합니다. 좌석이 한정되어 있고 승선권에 적힌 시간에만 탈 수 있으므로, 16:00가 아니라 하루 일찍 교환해 두세요.",
  },
  {
    title: "천수각에 1시간, 성벽 주변에 1시간을 더 잡으세요",
    desc: `오사카 공식 관광 사이트는 박물관 관람을 약 60분으로 안내하며, 8개 층과 꼭대기까지 가는 엘리베이터를 생각하면 맞는 시간입니다. 주변 공원은 따로 1~2시간이 걸립니다. 해자, 오테몬으로 들어가는 길, 도요토미 시대의 돌담은 돈을 내지 않는 곳이면서 시간을 들일 가치가 가장 큰 곳입니다. ${CHECKED} 확인.`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "오사카성 천수각 입장료는 얼마인가요?",
    a: `천수각(오사카성 천수각 박물관) 입장료는 성인 ¥1,200입니다. 대학생·고등학생은 학생증을 보여 주면 ¥600이고, 중학생 이하는 나이를 확인할 수 있는 서류가 있으면 무료입니다. 유료 입장 15명 이상 단체는 ¥1,080과 ¥540입니다. 같은 날 도요토미 이시가키관도 이 입장권으로 들어갈 수 있습니다. 해외 학생은 ISIC 카드를 요구하며, 학생증이 없으면 성인 요금입니다. 모두 ${CHECKED}에 osakacastle.net과 오사카 공식 관광 사이트에서 확인했습니다.`,
  },
  {
    q: "오사카성 천수각 운영 시간은 어떻게 되나요?",
    a: `천수각은 9:00부터 18:00까지 운영하고, 입장권 판매와 입장은 폐관 30분 전인 17:30에 마감합니다. 12월 28일부터 1월 1일까지 휴관합니다. 붐비는 날에 중요한 안내가 박물관 공식 사이트에 있습니다. 방문객이 많으면 17:30보다 일찍 입장을 제한할 수 있으므로, 벚꽃 시즌에 17:00에 도착하면 입장하지 못할 수 있습니다. 공원 자체에는 문도 폐장 시간도 없습니다. ${CHECKED} 확인.`,
  },
  {
    q: "오사카성 관람에는 시간이 얼마나 걸리나요?",
    a: `오사카 공식 관광 사이트는 박물관 관람을 약 60분으로 안내하며, 실제로 맞는 시간입니다. 8개 층의 전시를 한 방향으로 보고, 꼭대기 전망 층까지는 엘리베이터로 올라갑니다. 공원에는 적어도 1시간을 더 잡으세요. 바깥쪽과 안쪽 해자, 오테몬으로 들어가는 길, 도요토미 시대의 돌담은 무료이고, 이곳을 찾아갈 이유가 되는 부분입니다. 정원과 고자부네까지 간다면 잠깐 들르는 곳이 아니라 반나절 일정으로 생각하세요.`,
  },
  {
    q: "오사카성 공원 안에서 돈을 내야 하는 곳은 또 어디인가요?",
    a: `천수각 말고 4곳이 있으며, 이 때문에 오사카성 방문 비용이 ¥1,200이 아니라 ¥5,200까지 늘어날 수 있습니다. 니시노마루 정원은 ¥300(벚꽃 시즌 ¥350)으로 3~10월 9:00~17:00, 11~2월 9:00~16:30에 운영하고 월요일에 휴무입니다. 오사카성 고자부네 놀잇배(御座船)는 16세 이상 성인 ¥1,800, 초·중학생 ¥900, 65세 이상 ¥1,200, 미취학 아동 무료이며 10:00부터 16:30까지 운항합니다. 망루는 고등학생 이상 ¥900으로 10:00~16:30, 입장 마감 16:00입니다. 미라이자 오사카성 안의 가이요도 피규어 뮤지엄은 성인 ¥1,000, 어린이 ¥500으로 9:30~17:30입니다. 해자, 성문, 돌담, 미라이자 건물 자체 등 공원의 나머지는 모두 무료입니다. 요금은 ${CHECKED} 확인.`,
  },
  {
    q: "오사카 주유패스로 오사카성에 무료로 들어갈 수 있나요?",
    a: `네, 공원 안의 다른 유료 시설 4곳도 무료입니다. 패스 운영사의 이용 시설 목록에는 오사카성 천수각, 니시노마루 정원, 오사카성 망루, 미라이자의 가이요도 피규어 뮤지엄, 고자부네가 있으며, 성인 1명의 현장 요금 합계 ¥5,200에 비해 1일권은 ${PASS_1_DAY}입니다. 15:00 전에만 무료인 우메다 스카이빌딩과 달리 오사카성의 시설에는 시간대 제한이 없습니다. 다만 고자부네는 전용 매표소에서 패스를 탑승 시간이 적힌 승선권으로 교환해야 합니다. 시설 목록은 ${CHECKED} 확인.`,
  },
  {
    q: "오사카성만 보려고 오사카 주유패스를 사도 이득인가요?",
    a: `유료 시설 3곳을 이용하거나, 2곳을 이용하면서 하루 종일 지하철을 탈 때만 이득입니다. 패스는 ${PASS_1_DAY}입니다(공식 요금, 2026년 11월 9일 확인). 천수각(¥1,200)과 고자부네(¥1,800)는 현장 요금 ¥3,000, 정원을 더하면 ¥3,300으로, 둘 다 패스로 탈 수 있는 오사카 메트로 요금을 더하기 전까지는 패스 가격보다 적습니다. 천수각, 고자부네, 가이요도 피규어 뮤지엄(¥1,000)은 ¥4,000으로 패스 가격을 넘습니다. 천수각만 간다면 패스가 손해입니다. 시내 전체로 같은 계산을 한 내용은 오사카 주유패스 가이드(영어)에 있습니다.`,
  },
  {
    q: "오사카성까지 어떻게 가나요?",
    a: `가까운 역이 5곳 있고, 모두 걸어서 약 15~20분입니다. 공원이 넓고 천수각이 그 한가운데 있어서 더 가까운 역은 없습니다. 오사카 순환선 JR 오사카조코엔역이 일반적인 경로이고, 모리노미야역(JR, 메트로)은 남쪽 입구입니다. 오사카 메트로 다니마치욘초메역(다니마치선 1-B번 출구, 주오선 9번 출구)에서는 원래 성의 정문인 오테몬으로 들어갑니다. 메트로와 게이한 덴마바시역은 북쪽 입구로 고자부네와 가장 가깝고, 오사카 비즈니스파크역은 OBP 지역 고층 빌딩에 묵는 사람에게 편리합니다. 시내버스는 오사카조 오테마에와 바바초 정류장에 서고, 수상 버스는 오사카조코 선착장에 정박합니다. 역과 출구는 ${CHECKED}에 osakacastle.net에서 확인했습니다.`,
  },
  {
    q: "오사카성이 가장 한산한 때는 언제인가요?",
    a: `이른 시간, 그리고 4월 첫 2주를 피한 때입니다. 천수각은 9:00에 문을 열고, 박물관 공식 사이트에는 방문객이 많으면 17:30 마감 전에 입장을 제한할 수 있다고 적혀 있습니다. 혼잡이 낮 시간에 몰린다는 뜻입니다. 봄 성수기는 기간이 분명하므로 피하거나 일부러 그 시기에 맞춰 가세요. 2026년 니시노마루 정원의 벚꽃 야간 개장은 3월 20일부터 4월 12일까지였고, 21:00까지 연장 운영, 입장 마감 20:30, 입장료 ¥350이었습니다. 이곳이 가장 아름다운 2주이자 단연 가장 붐비는 2주입니다. 이 기간을 피한 평일 오전은 전혀 다른 분위기입니다.`,
  },
  {
    q: "오사카성 입장권은 미리 예매해야 하나요?",
    a: "아니요. 입장 시간 지정이 없고 매진되지도 않으며, 천수각 매표소에서 운영 시간 내내 당일 입장권을 판매합니다. 미리 예매하면 편리할 뿐입니다. 박물관에 자체 온라인 예매 사이트가 있고, 클룩에서는 같은 입장권을 해외 발급 카드로 결제하고 스캔용 코드를 받을 수 있습니다. 늦은 시간까지 미루면 안 되는 것은 두 가지입니다. 좌석이 한정되어 있고 탑승 시간이 적힌 승선권이 필요한 고자부네, 그리고 인원과 출발 시간이 정해져 있는 가이드 투어입니다.",
  },
  {
    q: "아이와 함께 오사카성에 가도 괜찮을까요?",
    a: "요금으로 보면 좋습니다. 중학생 이하는 나이를 확인할 수 있는 서류가 있으면 무료이므로, 천수각은 가족에게 오사카에서 가장 저렴한 주요 관광지 중 하나입니다. 실제로 신경 쓸 점은 거리와 계단입니다. 모든 역에서 천수각까지 걸어서 15~20분이고, 박물관은 8개 층에 엘리베이터가 붐비며, 성으로 가는 길에는 한여름에 그늘이 거의 없습니다. 대신 공원은 오사카 중심에서 아이들이 마음껏 뛰어놀 수 있는 몇 안 되는 곳입니다. 아이들이 가장 기억하는 것은 보통 고자부네인데, 중학생 이하 어린이는 어른과 함께 타야 합니다.",
  },
  {
    q: "비 오는 날 오사카성에 가도 괜찮을까요?",
    a: "일부는 괜찮고, 구분이 분명합니다. 천수각은 8개 층의 실내 박물관이라 ¥1,200의 가치는 날씨와 관계없고, 미라이자의 가이요도 피규어 뮤지엄도 실내입니다. 비가 오면 나머지를 즐기기 어렵습니다. 고자부네는 지붕 없는 해자를 운항하고, 니시노마루 정원은 잔디밭이며, 망루는 트인 길을 지나야 하고, 각 역에서 걷는 15~20분 동안 비를 피할 곳이 없습니다. 비 오는 날에는 천수각만 보고, 고자부네와 정원은 다른 날로 미루세요.",
  },
];

/** Korean copy per English card, keyed by the English URL so the list stays in the English order. */
const SAME_DAY_KO: Record<string, Partial<KlookSameDayCard>> = {
  [osakaAmazingPass.url]: {
    kind: "패스",
    label: "오사카 주유패스(1일권 / 2일권)",
    ctaLabel: "오사카 주유패스 보기 →",
    why: "천수각, 니시노마루 정원, 고자부네, 망루, 가이요도 피규어 뮤지엄을 모두 패스로 이용할 수 있고, 시설 사이를 지하철로 이동할 수 있습니다. 가이유칸(오사카 수족관)은 포함되지 않습니다.",
  },
  [osakaCastleNishinomaruWalkingTour.url]: {
    kind: "투어",
    label: "오사카성과 니시노마루 정원 반일 워킹 투어",
    ctaLabel: "오사카성 워킹 투어 보기 →",
    why: "오사카성 공원과, 천수각 아래에서 입장료를 따로 받는 잔디밭인 니시노마루 정원을 반나절 동안 걷는 그룹 투어입니다.",
  },
};

const sameDayFallback: Record<string, Partial<KlookSameDayCard>> = {
  "Food tour": {
    kind: "푸드 투어",
    label: "도톤보리 낮 푸드 투어",
    ctaLabel: "푸드 투어 보기 →",
    why: "도톤보리에서 11:00~14:00로 등록된 투어입니다. 9:00에 천수각을 보고, 걸으면서 점심을 먹는 일정입니다.",
  },
  Cruise: {
    kind: "크루즈",
    label: "도톤보리 시티 크루즈",
    ctaLabel: "도톤보리 크루즈 보기 →",
    why: "다자에몬바시 선착장에서 글리코 간판 앞을 지나는 20분 크루즈로, 오사카성에서 시작한 하루의 저녁 일정입니다.",
  },
  Hotel: {
    kind: "호텔",
    label: "난바 주변 호텔",
    ctaLabel: "클룩에서 난바 호텔 보기 →",
    why: "난바에서 도톤보리까지 걸어갈 수 있고, 간사이 공항으로 가는 난카이선이 난바에서 출발합니다.",
  },
  eSIM: {
    kind: "eSIM",
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    why: "입장권 코드, 역 출구, 고자부네 매표소 지도를 모두 휴대폰으로 확인하게 되고, 공원을 가로지르는 데만 15~20분이 걸립니다.",
  },
  "Airport train": {
    kind: "공항 열차",
    label: "난카이 특급 라피트 티켓",
    ctaLabel: "라피트 티켓 보기 →",
    why: "간사이 공항과 난바를 잇는 지정석 열차로, 오사카 여행의 도착일이나 출발일에 이용합니다.",
  },
};

const sameDayCards: KlookSameDayCard[] = osakaCastleSameDayCards.map((card) =>
  withKlookLocale(card, LOCALE, SAME_DAY_KO[card.url] ?? sameDayFallback[card.kind] ?? {}),
);

// The same-day cards under the main CTA leave the lower trip-prep block, as on the English page.
const notInTopCards = (item: { url: string }) => !osakaCastleSameDayCards.some((c) => c.url === item.url);

const TRIP_PREP_KO: Partial<KlookTripPrepItem>[] = [
  {
    label: "우메다·오사카역 주변 호텔",
    ctaLabel: "클룩에서 오사카역 호텔 보기 →",
    why: "우메다는 미도스지선의 북쪽 거점이고 오사카역과 이어져 있어, 오사카성, 우메다 전망대, 오사카를 떠나는 열차 모두 숙소에서 가깝습니다.",
  },
  {
    label: "오사카 “나니 원더” 2층 오픈탑 버스 야경 투어",
    ctaLabel: "야경 버스 투어 보기 →",
    why: "오사카역 버스 터미널에서 출발해 미도스지를 따라 신세카이까지 달리는 오픈탑 야간 버스로, 천수각이 문을 닫은 뒤의 시간에 탈 수 있습니다.",
  },
];

const tripPrepItems: KlookTripPrepItem[] = osakaCastleTripPrep
  .filter(notInTopCards)
  .map((item, i) => withKlookLocale(item, LOCALE, TRIP_PREP_KO[i] ?? {}));

const tourPicks = [
  withKlookLocale(osakaCastleNishinomaruWalkingTour, LOCALE, {
    title: "오사카성과 니시노마루 정원 반일 워킹 투어",
    desc: "오사카성 공원과, 천수각 풍경이 엽서처럼 보이고 벚나무가 약 300그루 있는 유료 잔디밭 니시노마루 정원을 반나절 동안 걷는 그룹 투어입니다",
  }),
  withKlookLocale(osakaCastleUmedaTonboriDayTour, LOCALE, {
    title: "오사카성, 우메다 스카이빌딩, 톤보리 리버크루즈 당일 투어",
    desc: "오사카성, 우메다 전망대, 도톤보리 리버크루즈를 가이드와 함께 하루에 도는 투어로, 경로는 가이드가 정합니다",
  }),
  withKlookLocale(osakaSkyVistaHalfDayBusTour, LOCALE, {
    title: "오사카 스카이 비스타 2층 버스 반일 투어",
    desc: "지붕 없는 2층 버스를 타고 오사카성, 도톤보리, 쓰텐카쿠를 지나는 반일 그룹 투어로, 쇼핑하는 날 앉아서 이동하는 일정입니다",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "오사카성 천수각 입장료" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.86rem" }}>
                    {cell}
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

export default function KoOsakaCastleTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG.ko }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            천수각은 ¥1,200이고 관람에 약 1시간이 걸립니다. 그런데 같은 성벽 안에 유료 시설이 4곳 더 있어서, 모두
            이용하면 오사카성 방문 비용이 ¥5,200이 됩니다. 오사카 주유패스가 있다면 이야기가 달라집니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금, 확인일 표시", "공원 안 유료 시설 5곳 요금"].map((t) => (
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
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>천수각</p>
                <p className={styles.verdictStatValue}>성인 ¥1,200, 학생 ¥600</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>운영 시간</p>
                <p className={styles.verdictStatValue}>9:00~18:00, 입장 마감 17:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>관람 소요 시간</p>
                <p className={styles.verdictStatValue}>실내 약 60분</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가는 방법</p>
                <p className={styles.verdictStatValue}>어느 역에서든 도보 15~20분</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 오사카성 천수각 입장권은 <strong>성인 ¥1,200</strong>, 학생증이 있는
              대학생·고등학생 <strong>¥600</strong>, 중학생 이하 <strong>무료</strong>이며, 입장권 1장으로 도요토미
              이시가키관도 들어갈 수 있습니다. 천수각은 <strong>9:00부터 18:00까지, 입장 마감 17:30</strong>이고 12월
              28일부터 1월 1일까지 휴관하며, 오사카 공식 관광 사이트는 관람 시간을 <strong>약 60분</strong>으로
              안내합니다. 모든 역에서 <strong>걸어서 15~20분</strong>입니다. 많은 사람이 예산에 넣지 않는 부분은 공원
              안의 다른 유료 시설 4곳입니다. 니시노마루 정원, 고자부네, 망루, 가이요도 피규어 뮤지엄으로,{" "}
              <strong>5곳을 모두 이용하면 현장 요금 ¥5,200이고, {PASS_1_DAY}의 오사카 주유패스로는 모두 무료</strong>
              입니다. 모두 {CHECKED}에 확인했습니다.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                클룩에서 오사카성 티켓 보기 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                오사카 주유패스 →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookSameDayCards
          heading="오사카성에 가는 날 함께 예약할 것"
          cards={sameDayCards}
          footnote={
            <>
              오사카 주유패스로 천수각에 입장할 수 있지만(osaka-amazing-pass.com의 18번 시설, 2026년 11월 23일 확인),
              가이유칸(오사카 수족관)은 포함되지 않습니다.{" "}
              <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" hrefLang="en">
                가이유칸 입장권 가이드(영어)
              </Link>
              를 보세요. 간사이 공항에 도착해 난바가 아니라 교토, 신오사카, 덴노지로 간다면{" "}
              <KlookLink href={HARUKA_URL} target="_blank" rel={KLOOK_REL}>
                클룩에서 JR 하루카 티켓 보기 →
              </KlookLink>
            </>
          }
        />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>오사카성 입장권으로 무엇을 볼 수 있나요?</h2>
          <p className={styles.bodyText}>
            건물 하나입니다. ¥1,200 입장권으로 <strong>오사카성 천수각 박물관</strong>에 들어갈 수 있습니다. 복원된
            천수각 안에 도요토미 히데요시와 그 가문을 끝낸 전투에 관한 전시가 8개 층에 걸쳐 있고, 꼭대기 전망 층까지
            엘리베이터가 있습니다. 같은 날 <strong>도요토미 이시가키관</strong>에도 들어갈 수 있습니다. 대표 입장권으로
            볼 수 있는 것은 여기까지입니다.
          </p>
          <p className={styles.bodyText}>
            오사카성의 나머지는 무료이거나 요금을 따로 받으며, 이 페이지는 그 구분을 정리합니다. 해자, 성문, 오테몬으로
            들어가는 길, 천수각 아래의 미라이자 건물은 모두 무료로 걸어 다닐 수 있습니다. 정원, 안쪽 해자를 도는
            고자부네, 망루, 피규어 뮤지엄은 각각 요금, 더 이른 마감 시간, 대기 줄이 따로 있습니다. 5곳을 모두 더하면 성인
            1명이 한 성벽 안에서 <strong>¥5,200</strong>을 내게 되며, 그래서 오사카성은 오사카에서 주유패스를 살 이유가
            가장 분명한 관광지입니다. 요금은 {CHECKED}에 확인했습니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>오사카성 천수각 입장료는 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            대상별로 요금이 하나씩이고, 날짜에 따라 달라지지 않으며 사전 예매 할인도 없습니다. 매표소와 온라인 요금이
            같습니다. 박물관 공식 사이트에 따르면 현재 요금은 2025년 4월 1일부터 적용되었습니다.
          </p>
          <Table head={["대상", "입장료", "참고"]} rows={priceRows.map((r) => [r.tier, r.price, r.what])} />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {LAST_CHECKED_ISO} — 출처:{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">
              osakacastle.net/guide/
            </a>{" "}
            (¥1,200 / ¥600 / 무료, 9:00~18:00, 입장 마감 17:30). 학생과 단체 요금은 {CHECKED}에 osakacastle.net과
            오사카 공식 관광 사이트에서 확인했습니다. 요금은 바뀔 수 있으니 구매 전에 확인하세요. 일본 각지의 입장료는
            확인 날짜와 함께{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              일본 관광지 입장권 가격표(영어)
            </Link>
            에 정리했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>운영 시간</span>
          <h2 className={styles.sectionTitle}>오사카성 천수각 운영 시간은 어떻게 되나요?</h2>
          <p className={styles.bodyText}>
            천수각은 <strong>9:00부터 18:00까지 운영하고, 입장권 판매와 입장은 17:30에 마감</strong>합니다. 폐관 30분
            전입니다. <strong>12월 28일부터 1월 1일까지</strong> 휴관하고, 그 밖에는 1년 내내 운영합니다.
          </p>
          <p className={styles.bodyText}>
            박물관 공식 사이트에서 꼭 확인할 안내가 하나 있습니다. <strong>방문객이 많으면 17:30보다 일찍 입장을
            제한할 수 있다</strong>는 내용입니다. 벚꽃 시즌에 늦은 오후에 도착하면 입장하지 못할 수 있다는 뜻이고,
            운영사가 건물이 붐비는 시간에 대해 알려 주는 가장 분명한 정보입니다. 천수각 밖의 공원에는 문도 폐장 시간도
            없어서, 박물관이 문을 닫은 뒤에도 성벽과 야간 조명이 켜진 천수각을 볼 수 있습니다. 운영 시간은{" "}
            {CHECKED}에 확인했습니다.
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>성벽 안의 유료 시설</span>
          <h2 className={styles.sectionTitle}>오사카성 공원 안에서 돈을 내야 하는 곳은 또 어디인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            공원 하나에 유료 시설이 5곳 있습니다. 누구나 사는 것은 천수각 입장권이고, 비용이 늘어나는 것은 나머지
            4곳이며, 그중 3곳은 천수각보다 일찍 문을 닫습니다. 고자부네는 일본어로 御座船이라고 씁니다.
          </p>
          <Table
            head={["시설", "일반 요금", "운영 시간", "주유패스", "참고"]}
            rows={parkRows.map((r) => [r.place, r.fee, r.hours, r.pass, r.note])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            요금과 운영 시간은 {CHECKED}에 오사카 주유패스 운영사의 이용 시설 목록에서, 고자부네 요금과 정원 휴무일은
            같은 날 오사카 공식 관광 사이트에서 확인했습니다. 한 가지는 분명히 적어 둡니다. 니시노마루 정원은 패스
            운영사의 현재 목록에는 <strong>¥300</strong>, 오사카 관광 사이트의 오래된 페이지에는 아직{" "}
            <strong>¥200</strong>으로 나와 있으므로, 정원 요금은 ¥200~300으로 보고 입구에서 확인하세요. 해자, 오테몬으로
            들어가는 길, 돌담, 미라이자 건물 자체 등 공원의 나머지는 모두 무료입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 오사카성 티켓 보기 →
            </KlookLink>
            <KlookLink href={WALK_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              오사카성·니시노마루 정원 워킹 투어 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>패스 문제</span>
          <h2 className={styles.sectionTitle}>오사카성에서 오사카 주유패스는 이득인가요?</h2>
          <p className={styles.bodyText}>
            <strong>3곳을 이용하면 이득입니다.</strong> 패스 운영사의 목록에는 오사카성 공원 안의 유료 시설 5곳이 모두
            있습니다. 천수각, 니시노마루 정원, 망루, 가이요도 피규어 뮤지엄, 고자부네입니다. 성인 1명의 현장 요금
            합계 <strong>¥5,200</strong>에 비해 1일권은 <strong>{PASS_1_DAY}</strong>이고, 우메다 스카이빌딩과 달리 어느
            시설에도 시간대 제한이 없습니다.
          </p>
          <p className={styles.bodyText}>
            계산은 간단합니다. 패스는 1일 {PASS_1_DAY}입니다(공식 요금, 2026년 11월 9일 확인). 천수각과 고자부네는{" "}
            <strong>¥3,000</strong>, 천수각, 정원, 고자부네는 <strong>¥3,300</strong>으로 둘 다 패스 가격보다 조금
            적으므로, 그날 지하철 요금까지 더해야 이득입니다. 천수각, 고자부네, 가이요도 피규어 뮤지엄은{" "}
            <strong>¥4,000</strong>으로, 성 밖으로 나가지 않아도 패스 가격을 넘습니다. 천수각만 간다면 패스가 손해입니다.
            정리하면 1곳이면 입장권을, 3곳 이상이면 패스를 사세요.{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              오사카 주유패스 가격과 손익 계산표(영어)
            </Link>
            에서 시내 전체로 같은 계산을 했습니다.
          </p>
          <p className={styles.bodyText}>
            오사카성을 중심으로 패스 일정을 짜기 전에 알아 둘 점은 시내 반대편에 있습니다.{" "}
            <Link href="/ko/guides/attractions/umeda-sky-building-tickets" style={linkStyle}>
              우메다 스카이빌딩 입장권 가이드
            </Link>
            에서 설명한 것처럼 패스로 그 전망대에 무료 입장할 수 있는 것은 <strong>15:00 전</strong>까지이므로, 패스를
            쓰는 날에는 오전에 우메다 전망대, 오후에 오사카성 순서로 다니세요. 반대 순서는 안 됩니다.{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" hrefLang="en" style={linkStyle}>
              오사카 주유패스 가이드(영어)
            </Link>
            에는 40곳 이상의 이용 시설 전체 목록, 2일권 가격, 주요 제외 시설 2곳이 있고,{" "}
            <Link href="/guides/attractions/things-to-do-osaka" hrefLang="en" style={linkStyle}>
              오사카에서 즐길 거리(영어)
            </Link>
            에서는 2~3일 일정을 어떻게 나눌지 정리했습니다. 시설 목록은 {CHECKED}에 확인했습니다. 복원이 아닌 원래의
            천수각을 보고 싶다면{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip" hrefLang="en" style={linkStyle}>
              오사카에서 가는 히메지성 당일치기(영어)
            </Link>
            를 보세요. JR 신쾌속으로 편도 약 1시간입니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 오사카 주유패스 보기 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              천수각 입장권만 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>오사카성까지 어떻게 가나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            공원 주변에 역이 5곳 있고, <strong>모두 천수각까지 걸어서 약 15~20분</strong>입니다. 공원이 넓어서 지름길은
            없습니다. 어느 역을 고르느냐에 따라 달라지는 것은 거리가 아니라 들어가는 방향입니다.
          </p>
          <Table head={["역", "천수각까지 도보", "가는 길"]} rows={accessRows.map((r) => [r.station, r.walk, r.note])} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            시내버스는 오사카조 오테마에와 바바초 정류장에 서고, 수상 버스는 북쪽의 오사카조코 선착장에 정박합니다. 역과
            출구는 {CHECKED}에 osakacastle.net에서, 도보 시간은 같은 날 오사카 공식 관광 사이트에서 확인했습니다.{" "}
            <Link href="/guides/transport/osaka-transportation" hrefLang="en" style={linkStyle}>
              오사카 교통 가이드(영어)
            </Link>
            에서 주오선과 다니마치선이 노선망에서 어떻게 이어지는지 설명했고, 주유패스를 사지 않는다면{" "}
            <Link href="/guides/transport/osaka-metro-pass" hrefLang="en" style={linkStyle}>
              오사카 메트로 패스 가이드(영어)
            </Link>
            에서 1일권이 교통카드보다 저렴한지 계산했습니다.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별 안내</span>
          <h2 className={styles.sectionTitle}>오사카성 입장권 예매 방법</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 오사카성 티켓 보기 →
            </KlookLink>
            <KlookLink href={DAY_TOUR_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              우메다 전망대, 리버크루즈와 함께 →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="오사카성 입장권을 예매했다면, 출국 전에 모바일 데이터도 준비하세요." />

        <KlookTripPrep
          label="같은 날 함께 예약"
          heading="오사카성에 가는 날 함께 예약할 만한 것은 무엇인가요?"
          intro="천수각과 성벽 주변을 보는 데 반나절이 걸리고, 오사카성은 우메다와 난바 사이에 있으므로 남은 예약은 숙소와 저녁 일정입니다."
          items={tripPrepItems}
        />

        <EsimCtaBottom />

        <FaqList items={faqItems} heading="오사카성 자주 묻는 질문" />

        <KlookTourPicks
          heading="가이드 투어, 또는 오사카의 나머지"
          intro="천수각에서 1시간, 성벽 주변에서 1시간을 보내면 반나절이고, 오사카성은 우메다와 도톤보리 사이에 애매하게 떨어져 있습니다. 첫 번째는 공원과 정원을 가이드와 함께 도는 투어이고, 두 번째는 오사카성, 우메다 전망대, 리버크루즈를 하루에 도는 투어입니다. 클룩 가격은 날짜에 따라 달라지므로 상품 페이지에서 현재 요금과 집합 장소를 확인하세요."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/ko/guides/attractions/dotonbori-river-cruise", title: "도톤보리 리버크루즈(2026): 요금, 운항 시간, 선착장" },
            { href: "/ko/guides/attractions/umeda-sky-building-tickets", title: "우메다 스카이빌딩 입장료 2026: 공중정원 시간, 일몰" },
            { href: "/guides/attractions/osaka-attractions-pass", title: "오사카 주유패스 2026: ¥3,500, 살 만할까? 1일 일정(영어)" },
            { href: "/guides/attractions/things-to-do-osaka", title: "오사카에서 즐길 거리(2026): 패스가 이득인 곳과 아닌 곳(영어)" },
            { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "가이유칸 입장권(2026): 요금, 운영 시간, 입장 시간대(영어)" },
            { href: "/ko/guides/attractions/usj-tickets-express-pass", title: "유니버설 스튜디오 재팬 입장권과 익스프레스 패스(2026)" },
            { href: "/guides/transport/osaka-transportation", title: "오사카 교통 가이드(2026): 지하철, 열차, 교통카드(영어)" },
            { href: "/guides/transport/osaka-metro-pass", title: "오사카 메트로 패스 2026: 1일권과 2일권 비교(영어)" },
            { href: "/guides/attractions/japan-attraction-ticket-prices", title: "일본 관광지 입장권 가격 2026: 공식 요금과 예약 규칙(영어)" },
            { href: "/guides/attractions", title: "일본에서 즐길 거리 더 보기(영어) →" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>1곳만 갈까요, 5곳 모두 갈까요?</h2>
            <p className={styles.ctaBannerDesc}>
              이곳에서 비용을 좌우하는 것은 이 질문뿐입니다. 천수각만 간다면 ¥1,200이고 단일 입장권을 사면 됩니다.
              고자부네, 정원, 망루를 더한다면 성벽 안에서만으로도 주유패스가 더 저렴하고, 지하철도 탈 수 있습니다. 결제
              전에 예약 화면의 취소 규정을 확인하세요.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                클룩에서 오사카성 티켓 보기 →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
                오사카 주유패스 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
