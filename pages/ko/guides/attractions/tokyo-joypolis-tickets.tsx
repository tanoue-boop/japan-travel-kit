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
  klookEsim,
  odaibaHotelsUrl,
  skyhopHopOnHopOffBus,
  teamlabPlanetsTicketUrl,
  tokyoBayDinnerCruiseSymphony,
  tokyoBaySunsetBoatCruise,
  tokyoBaySunsetCruise,
  tokyoBayYakatabuneDinnerShow,
  tokyoJoypolisPassport,
  tokyoJoypolisTicket,
  tokyoSightseeingBusTour,
  tokyoAirportStayAreas,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/tokyo-joypolis-tickets) section by section as of
// 2026-11-26 (task-jtk-20261126-TR01): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (tokyo-joypolis.com, read 17 Nov
// 2026); nothing is added. Title term: 도쿄 조이폴리스 — the form Korean resellers (WAUG) and the
// Tokyo Convention & Visitors Bureau's Korean page write.

const LOCALE = "ko" as const;
const ROUTE = "/ko/guides/attractions/tokyo-joypolis-tickets";
const TITLE = "도쿄 조이폴리스 입장권 2026: 패스포트 가격";
const H1 = "도쿄 조이폴리스 입장권 2026: 패스포트 가격, 가볼 만할까?";
const DESC =
  "도쿄 조이폴리스 입장권 ¥1,700, 패스포트 ¥6,000(15시부터 ¥5,000). 5번째 어트랙션부터 이득. 오다이바 일정과 클룩 예매.";

const CHECKED_ISO = "2026-11-17";
const CHECKED = dateLabel(CHECKED_ISO, LOCALE);

const PASSPORT_URL = klookFor(tokyoJoypolisPassport.url, LOCALE);
const TICKET_URL = klookFor(tokyoJoypolisTicket.url, LOCALE);
const SUNSET_URL = klookFor(tokyoBaySunsetCruise.url, LOCALE);
const ESIM_URL = klookFor(klookEsim.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

const OFFICIAL = [
  { label: "tokyo-joypolis.com 요금 페이지", href: "https://tokyo-joypolis.com/ticket/" },
  { label: "어트랙션 목록과 이용 요금", href: "https://tokyo-joypolis.com/attraction/" },
  { label: "교통 안내 페이지", href: "https://tokyo-joypolis.com/access/" },
];

const priceRows = [
  {
    ticket: "결론: 어떤 입장권?",
    adult: "5번째 어트랙션부터 패스포트",
    child: "4번째 어트랙션부터 패스포트",
    what: "입장권만 있으면 어트랙션은 1회 ¥700~¥1,000입니다. 5개 이상(초·중·고생은 4개 이상) 탈 계획이면 패스포트를, 그보다 적으면 입장권을 사고 탈 때마다 결제하세요",
  },
  {
    ticket: "입장권만(入場券)",
    adult: "¥1,700",
    child: "¥1,400",
    what: "입장만 할 수 있고, 어트랙션은 하나씩 따로 결제합니다",
  },
  {
    ticket: "입장권으로 어트랙션 1회",
    adult: "¥700~¥1,000",
    child: "¥700~¥1,000",
    what: "1인 1회 요금입니다. 코스터, Halfpipe Tokyo, NARUTO는 ¥1,000이고 나머지는 대부분 ¥700~¥900입니다",
  },
  {
    ticket: "패스포트(パスポート)",
    adult: "¥6,000",
    child: "¥5,000",
    what: "입장과 당일 어트랙션 무제한 이용이 포함되며, 대부분의 방문객에게 맞는 입장권입니다",
  },
  {
    ticket: "파크 안에서 사는 패스포트(館内料金)",
    adult: "¥4,300",
    child: "¥3,600",
    what: "입장권으로 이미 들어온 뒤 업그레이드하는 요금입니다. ¥1,700 + ¥4,300 = ¥6,000이므로 할인이 아닙니다",
  },
  {
    ticket: "이브닝 패스포트(イブニングパスポート)",
    adult: "¥5,000",
    child: "¥4,000",
    what: "15:00부터 판매하며, 22:00에 폐장하는 날은 16:00부터입니다. 그날 남은 시간 동안 어트랙션을 무제한 이용합니다",
  },
  {
    ticket: "파크 안에서 사는 이브닝 패스포트",
    adult: "¥3,300",
    child: "¥2,600",
    what: "위와 같은 계산입니다. ¥1,700 + ¥3,300 = ¥5,000",
  },
  {
    ticket: "CHOI-NORI-NIGHT 2회권(ちょいのりナイト2回券)",
    adult: "¥3,100",
    child: "¥3,100",
    what: "입장과 원하는 어트랙션 2개가 포함되며, 초등학생 이상은 모두 같은 요금입니다. 17:00부터 판매하며, 22:00에 폐장하는 날은 18:00부터입니다",
  },
  {
    ticket: "연간 패스포트(年間パスポート)",
    adult: "¥29,000",
    child: "¥24,000",
    what: "1년 동안 어트랙션을 무제한 이용합니다. 도쿄에 사는 사람에게만 해당합니다",
  },
];

const heightRows = [
  {
    limit: "키 제한 없음",
    rides:
      "Pirate's Plunder, NARUTO Music Dancer, MISSION SPARK, Gyakuten Saiban in Joypolis, Fortune Forest, Laura & Carla, Attack on Titan THE ATTRACTION, MURDER LODGE",
    note: "21개 중 8개입니다. 어린 아이와 함께 시간을 보내기에는 충분하지만 스릴 라이드는 없습니다",
  },
  {
    limit: "90cm 이상",
    rides: "Spicy Taxi, House of the Dead ~Scarlet Dawn~ THE ATTRACTION",
    note: "파크에서 가장 낮은 기준입니다",
  },
  {
    limit: "110cm 이상",
    rides:
      "LASER SHOOTING ISSEN, Sonic Athletics, Ayakashi Yashiki, Wild Wing, Wild Jungle Brothers, Wild River The Treasure Hunt",
    note: "가족 방문 대부분을 좌우하는 기준이며, 무료 입장 기준과 같은 110cm입니다",
  },
  {
    limit: "130cm 이상",
    rides: "Gekion Live Coaster, Halfpipe Tokyo, Transformers Human Alliance Special",
    note: "조이폴리스를 대표하는 두 어트랙션, 실내 코스터와 하프파이프가 여기에 있습니다",
  },
  {
    limit: "140cm 이상, 상한 있음",
    rides: "Sadako ~Kurui Uranai no Yakata~(140~185cm), Storm-G(140~200cm)",
    note: "최저 기준과 최고 기준이 모두 있는 것은 이 두 개뿐입니다",
  },
];

const comboRows = [
  {
    when: "결론",
    what: "오전에 teamLab Planets, 15:00부터 이브닝 패스포트로 조이폴리스, 밤에는 오다이바 해변공원에서 야경",
    ticket: "Planets 입장 시간대를 먼저 예매하세요. 조이폴리스는 날짜 지정이 없습니다",
  },
  {
    when: "오전",
    what: "teamLab Planets TOKYO(도요스): 유리카모메 신토요스역 1A 출구에서 도보 3분. 8:00~22:00 운영, 입장 마감은 폐장 1시간 전",
    ticket: "날짜와 입장 시간대 지정 입장권. 공식 판매 사이트에서 성인 ¥3,800부터",
  },
  {
    when: "점심",
    what: "같은 유리카모메로 신토요스에서 오다이바카이힌코엔까지 환승 없이 이동하고, 점심은 DECKS Tokyo Beach에서",
    ticket: "IC 카드",
  },
  {
    when: "15:00부터",
    what: "도쿄 조이폴리스(DECKS 3~5층, 오다이바카이힌코엔역에서 2분). 이브닝 패스포트는 15:00부터 판매합니다(22:00 폐장일은 16:00)",
    ticket: "이브닝 패스포트 성인 ¥5,000 / 초·중·고생 ¥4,000. 입장 마감은 폐장 45분 전",
  },
  {
    when: "저녁",
    what: "DECKS 앞의 오다이바 해변공원: 공원 운영자가 해변, 전망대, 스카이워크에서 보는 일몰과 야경을 특히 소개합니다",
    ticket: "예약할 것 없음",
  },
  {
    when: "대안",
    what: "레인보우 브리지와 오다이바 해안을 지나는 도쿄만 선셋 크루즈. 야경을 바다 위에서 보고 싶다면",
    ticket: "미리 예약하세요. 크루즈 가이드 참고",
  },
];

const whoFor = [
  {
    title: "패스포트를 사야 하는 경우",
    desc: `어트랙션을 5개 이상(초·중·고생은 4개 이상) 탈 계획일 때입니다. 패스포트는 성인 ¥6,000, 초·중·고생 ¥5,000이고 그중 어트랙션 몫은 ¥4,300과 ¥3,600이며, 1회 요금은 ¥700~¥1,000입니다. 따라서 ¥1,000짜리 어트랙션이면 5번째부터 패스포트가 이득이고, 줄을 설 때마다 계산할 필요도 없어집니다. ${CHECKED}에 tokyo-joypolis.com에서 확인한 요금입니다.`,
  },
  {
    title: "입장권만 사야 하는 경우",
    desc: `어트랙션 2~3개, 아케이드 층만 둘러보거나, 짐을 지키는 어른일 때입니다. 입장권은 성인 ¥1,700, 초·중·고생 ¥1,400이고, 안에서 ¥4,300에 패스포트로 업그레이드할 수 있습니다. 합계가 같은 ¥6,000이므로 현장에서 정해도 손해가 없습니다. ${CHECKED} 확인.`,
  },
  {
    title: "저녁 입장권을 사야 하는 경우",
    desc: `조이폴리스가 오다이바 하루 일정의 후반일 때입니다. 이브닝 패스포트는 15:00부터(22:00 폐장일은 16:00부터) 성인 ¥5,000, 어린이 ¥4,000에 판매하고, CHOI-NORI-NIGHT 2회권은 17:00부터 초등학생 이상 누구나 ¥3,100입니다. ${CHECKED} 확인.`,
  },
];

const steps = [
  {
    title: "먼저 공식 캘린더에서 날짜를 확인하세요",
    desc: `건너뛸 수 없는 단계입니다. 조이폴리스는 고정 영업시간을 공개하지 않습니다. 공식 사이트는 캘린더를 운영하며, 영업시간은 기간별로 공개되고 예고 없이 바뀔 수 있다고 안내합니다. 그날 어떤 저녁 입장권이 있고 몇 시부터 판매하는지는 22:00 폐장일인지에 따라 정해집니다. ${CHECKED} 확인.`,
  },
  {
    title: "판매처보다 입장권 종류를 먼저 정하세요",
    desc: "입장권, 패스포트, 이브닝 패스포트, 2회 야간권은 서로 다른 네 가지 상품이고, 가장 저렴한 것과 가장 비싼 것의 차이는 ¥4,000이 넘습니다. 위 표에서 고른 다음 판매처를 여세요. 순서를 바꾸지 마세요.",
  },
  {
    title: "한국어 결제나 해외 발급 카드를 쓰려면 미리 예매하세요",
    desc: "조이폴리스는 현장에서도 판매하므로 매진은 걱정할 일이 아닙니다. 번거로운 것은 결제입니다. 클룩 상품은 한국어 화면으로 결제하고 해외 발급 카드를 받으며, 매표소에 줄을 서는 대신 입구에서 모바일 QR 코드를 보여 주면 됩니다. 상품 페이지에는 당일 예매, 즉시 확정, 무료 취소도 표시되어 있으니, 결제 전에 원하는 날짜의 취소 가능 기한을 확인하세요.",
  },
  {
    title: "폐장 90분 전보다 일찍, 가능하면 더 일찍 도착하세요",
    desc: `입장 마감은 폐장 45분 전으로, 이것이 그날의 최종 시한입니다. 그 밖에 클룩 상품 페이지는 2~4시간을 권하고, 어트랙션은 3개 층에 나뉘어 있습니다. 폐장 1시간 전에 도착하면 한 바퀴 둘러보는 정도로 끝납니다. 입장 마감 규정은 ${CHECKED}에 tokyo-joypolis.com에서 확인했습니다.`,
  },
  {
    title: "재입장을 위해 조이폴리스 카드를 보관하세요",
    desc: `공식 영어 페이지에 따르면 조이폴리스 카드를 가진 사람은 발권 당일 무제한으로 재입장할 수 있고, 일본어 사이트에는 폐장 45분 전까지 재입장할 수 있다고 적혀 있습니다. 덕분에 조이폴리스에 하루를 다 쓰지 않고 오다이바의 다른 일정과 묶을 수 있습니다. ${CHECKED} 확인.`,
  },
];

const faqItems: FaqItem[] = [
  {
    q: "도쿄 조이폴리스 패스포트는 얼마인가요?",
    a: `입장과 당일 어트랙션 무제한 이용이 포함된 조이폴리스 패스포트는 현장에서 성인(18세 이상) ¥6,000, 초·중·고생 ¥5,000입니다. 입장권으로 들어간 뒤 안에서 사면 ¥4,300과 ¥3,600이며, 합계는 같습니다. 15:00 이후(22:00 폐장일은 16:00 이후)에는 이브닝 패스포트가 ¥5,000과 ¥4,000입니다. 입장권만은 ¥1,700과 ¥1,400입니다. ${CHECKED}에 tokyo-joypolis.com에서 확인했습니다.`,
  },
  {
    q: "도쿄 조이폴리스는 가볼 만한가요?",
    a: `일행이 어트랙션을 5개 이상 타고 모두 키 제한을 통과한다면 가볼 만합니다. 입장권만 있으면 어트랙션은 1회 ¥700~¥1,000이므로, 성인 패스포트의 어트랙션 몫 ¥4,300은 5번째(¥1,000짜리를 고를 때)부터 7번째(¥700짜리를 고를 때) 어트랙션에서 이득이 납니다. 키 110cm 미만인 아이는 키 제한이 없는 어트랙션만 이용할 수 있어 덜 이득입니다. ${CHECKED} 확인 요금.`,
  },
  {
    q: "조이폴리스에서는 시간이 얼마나 필요한가요?",
    a: `클룩 상품 페이지가 안내하는 대로 2~4시간을 잡으세요. 어트랙션 21개가 3개 층에 있고 입장 마감은 폐장 45분 전이므로, 짧게 들르더라도 폐장 90분 전까지는 도착하세요. 당일에는 입장 마감까지 재입장할 수 있어 점심을 먹고 다시 들어올 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "조이폴리스는 어른도 즐길 수 있나요?",
    a: `네. 이 파크는 10대와 어른을 위한 어트랙션이 중심입니다. Gekion Live Coaster와 Halfpipe Tokyo는 130cm 이상, Storm-G는 140~200cm이고, 3D 사운드 호러 어트랙션 MURDER LODGE는 7세 미만은 입장할 수 없습니다. 성인 패스포트는 ¥6,000이고, 60세 이상은 연령 확인 서류를 보여 주면 무료로 입장해 파크 안 요금 ¥4,300으로 패스포트를 살 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "도쿄 조이폴리스까지 어떻게 가나요?",
    a: `유리카모메를 타고 오다이바카이힌코엔역에서 내려 도보 2분, 또는 린카이선 도쿄텔레포트역에서 도보 5분입니다. 공식 교통 안내에 따르면 유리카모메로 신바시에서 약 13분, 도쿄역에서 신바시 경유 약 23분, 린카이선으로 시부야에서 약 18분, 신주쿠에서 약 23분입니다. 조이폴리스는 다이바 1-6-1 DECKS Tokyo Beach 3~5층에 있습니다. ${CHECKED} 확인.`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "도쿄 조이폴리스 입장권은 얼마인가요?",
    a: `입장권만은 18세 이상 성인 ¥1,700, 초·중·고생 ¥1,400입니다. 당일 어트랙션 무제한 이용이 추가되는 패스포트는 성인 ¥6,000, 초·중·고생 ¥5,000입니다. 15:00부터(22:00 폐장일은 16:00부터) 판매하는 이브닝 패스포트는 ¥5,000과 ¥4,000이고, 입장과 원하는 어트랙션 2개가 포함된 CHOI-NORI-NIGHT 2회권은 17:00부터 초등학생 이상 누구나 ¥3,100입니다. 연간 패스포트는 성인 ¥29,000, 초·중·고생 ¥24,000입니다. 모두 ${CHECKED}에 tokyo-joypolis.com에서 확인했습니다.`,
  },
  {
    q: "입장권과 조이폴리스 패스포트는 무엇이 다른가요?",
    a: `입장권으로는 건물 안에 들어갈 수 있고, 패스포트로는 어트랙션을 탈 수 있습니다. 성인 입장권 ¥1,700으로 들어가면 어트랙션은 하나씩 결제하며, 안에서 ¥4,300에 패스포트로 업그레이드할 수 있습니다. 합계는 현장 패스포트 요금과 정확히 같은 ¥6,000이므로, 두 번에 나눠 사도 이득도 손해도 없습니다. 어트랙션 1회는 ¥700~¥1,000이므로 5개 이상 타고 싶다면 패스포트를 사세요. ${CHECKED} 확인.`,
  },
  {
    q: "저녁에 더 저렴한 조이폴리스 입장권이 있나요?",
    a: `네, 두 가지가 있습니다. 이브닝 패스포트는 성인 ¥5,000, 초·중·고생 ¥4,000으로 1일 패스포트보다 ¥1,000 저렴하고, 평소에는 15:00, 22:00 폐장일에는 16:00부터 판매합니다. 더 저렴한 것은 CHOI-NORI-NIGHT 2회권으로, 초등학생 이상 누구나 ¥3,100이며 17:00부터(22:00 폐장일은 18:00부터) 판매하고 입장과 원하는 어트랙션 2개를 이용할 수 있습니다. 둘 다 ${CHECKED}에 공식 요금 페이지에서 확인했습니다.`,
  },
  {
    q: "도쿄 조이폴리스 영업시간은 어떻게 되나요?",
    a: `한 가지로 답할 수 없으며, 이것이 공식 입장입니다. tokyo-joypolis.com은 영업시간을 기간별 캘린더로 공개하고, 예고 없이 바뀔 수 있다고 안내합니다. 어느 날이든 적용되는 규칙은 두 가지입니다. 입장 마감은 폐장 45분 전이고, 재입장도 폐장 45분 전까지 가능합니다. 저녁 입장권은 폐장 시간에 따라 판매 시작이 정해지므로(이브닝 패스포트 15:00 또는 16:00, 야간권 17:00 또는 18:00), 캘린더에서 날짜를 확인하면 어떤 저녁 입장권이 있는지도 알 수 있습니다. ${CHECKED} 확인.`,
  },
  {
    q: "도쿄 조이폴리스에 키 제한이 있나요?",
    a: `네. 21개 어트랙션 중 13개에 있으며, 다른 테마파크보다 영향이 큽니다. 90cm 이상이 2개, 110cm 이상이 6개, 130cm 이상이 3개(파크를 대표하는 Gekion Live Coaster와 Halfpipe Tokyo 포함)이고, 2개는 상한도 있어 Sadako는 140~185cm, Storm-G는 140~200cm입니다. 나머지 8개는 제한이 없습니다. ${CHECKED}에 공식 어트랙션 페이지에서 확인했습니다.`,
  },
  {
    q: "도쿄 조이폴리스에 어린 아이를 데려가도 되나요?",
    a: `무료로 입장할 수 있지만, 오후 일정을 정하기 전에 키 제한 표를 먼저 보세요. 공식 사이트에 따르면 키 110cm 미만 미취학 아동은 무료입니다. 그런데 110cm는 어트랙션 6개의 최저 기준이기도 하고, 3개는 130cm입니다. 실제로 110cm 미만인 아이는 키 제한이 없는 8개 어트랙션과 아케이드 층을 이용할 수 있어, 방문할 의미는 있지만 짧은 일정이 됩니다. 가장 낮은 기준인 Spicy Taxi와 House of the Dead 어트랙션은 90cm부터입니다. ${CHECKED} 확인.`,
  },
  {
    q: "그 밖에 무료로 입장할 수 있는 사람은 누구인가요?",
    a: `공식 요금 페이지에는 네 그룹이 있습니다. 키 110cm 미만 미취학 아동, 연령 확인 서류를 보여 주는 60세 이상, 모자건강수첩을 보여 주는 임산부, 장애인 수첩 소지자와 동반자 2명까지입니다. 일행 중 해당하는 사람이 있다면 그 사람의 입장권은 온라인이 아니라 현장에서 사세요. ${CHECKED} 확인.`,
  },
  {
    q: "도쿄 조이폴리스 입장권은 미리 예매해야 하나요?",
    a: "아니요. 도쿄 디즈니나 teamLab과 달리 조이폴리스는 날짜 지정 입장권도 입장 시간 지정도 없이 그냥 들어가는 파크라, 매진될 일이 없고 몇 주 전부터 계획할 이유도 없습니다. 온라인 예매는 판매 여부가 아니라 결제의 문제입니다. 판매 대행 사이트에서는 한국어로 결제하고, 실제로 결제되는 카드를 쓰고, 입구에서 QR 코드를 보여 주면 됩니다. 이미 오다이바에 있고 일본 카드가 있다면 매표소에서 사도 전혀 문제없습니다.",
  },
  {
    q: "비 오는 날 도쿄 조이폴리스에 가는 것은 좋은 선택인가요?",
    a: "도쿄에서 손꼽히는 선택지 중 하나입니다. 파크 전체가 쇼핑몰 안의 실내에 있고, 쇼핑몰은 오다이바 해안의 다른 시설과 일부 지붕 있는 통로로 이어지며, 유리카모메역까지 2분입니다. 도쿄만 크루즈나 야외 전망대가 비로 취소되면 새로 예약할 필요 없이 바꿀 수 있는 일정이고, 재입장 규정 덕분에 DECKS에서 식사하고 다시 들어올 수 있습니다.",
  },
  {
    q: "같은 날 오다이바에서 무엇을 더 할 수 있나요?",
    a: "가장 자연스러운 조합은 도쿄만 크루즈입니다. 배는 오다이바와 가까운 히노데 부두에서 출항하고, 저녁 출항편은 이브닝 패스포트와 시간이 잘 맞습니다. 아직도 헷갈리는 사람이 많아 바로잡을 점이 하나 있습니다. teamLab Borderless는 더 이상 오다이바에 없습니다. 오다이바에서 문을 닫고 아자부다이 힐스에서 다시 열었으므로, 조이폴리스와 teamLab을 함께 가는 하루는 이제 한 해안이 아니라 도쿄의 서로 다른 두 지역입니다. 또한 DECKS 건물에 함께 있었고 조이폴리스와 세트 입장권으로 자주 판매되던 마담 투소 도쿄는 자체 사이트에서 2026년 9월 30일에 영업을 종료했다고 밝혔습니다.",
  },
];

const sameDayCards: KlookSameDayCard[] = [
  {
    kind: "입장권",
    label: "teamLab Planets TOKYO 티켓",
    ctaLabel: "teamLab Planets 입장 시간 예매 →",
    url: klookFor(teamlabPlanetsTicketUrl, LOCALE),
    why: "Planets는 조이폴리스와 같은 유리카모메 노선의 신토요스역에서 3분 거리지만, 날짜와 입장 시간대를 지정해 판매하므로 오다이바 하루 중 가장 먼저 예매할 부분입니다.",
  },
  {
    kind: "호텔",
    label: "오다이바 호텔",
    ctaLabel: "클룩에서 오다이바 호텔 확인 →",
    url: klookFor(odaibaHotelsUrl, LOCALE),
    why: "이브닝 패스포트는 폐장까지 쓸 수 있고 해안 야경은 그 뒤에 보게 되므로, 섬 안에 숙소를 잡으면 밤늦게 만을 건너 돌아가지 않아도 됩니다.",
  },
  {
    kind: "eSIM",
    label: "클룩 일본 eSIM",
    ctaLabel: "클룩 eSIM 보기 →",
    url: ESIM_URL,
    why: "조이폴리스는 영업시간을 고정 시간이 아니라 캘린더로 공개하고, 저녁 입장권도 그 시간에 따라 달라지므로 출발 전에 휴대폰으로 날짜를 확인하세요.",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "도쿄만 선셋 크루즈",
    ctaLabel: "도쿄만 선셋 크루즈 확인 →",
    url: SUNSET_URL,
    why: "레인보우 브리지와 오다이바 해안을 지나며 일몰 시간에 맞춰 출항하는 배로, 조이폴리스에서 이브닝 패스포트로 보내는 오후와 시간이 맞습니다.",
  },
  {
    label: "심포니호 도쿄만 디너 크루즈",
    ctaLabel: "심포니 디너 크루즈 확인 →",
    url: klookFor(tokyoBayDinnerCruiseSymphony.url, LOCALE),
    why: "같은 저녁을 식사와 함께 보내는 상품으로, 히노데 부두에서 출항해 레인보우 브리지를 도는 2시간 30분 풀코스 크루즈입니다.",
  },
  {
    label: "도쿄 오픈탑 시티투어 버스(Skyhop Bus)",
    ctaLabel: "오픈탑 버스 티켓 확인 →",
    url: klookFor(skyhopHopOnHopOffBus.url, LOCALE),
    why: "아사쿠사, 롯폰기·시부야 코스와 함께 오다이바 코스도 있어, 섬까지 가는 길과 그 주변의 나머지 하루를 함께 다닐 수 있습니다.",
  },
  {
    label: "도쿄역·마루노우치 주변 호텔",
    ctaLabel: "클룩에서 호텔 가격 확인 →",
    url: klookFor(tokyoAirportStayAreas[0].url, LOCALE),
    why: "두 공항의 리무진 버스와 나리타의 N'EX가 이곳에 정차하므로, 여행 초반에 오다이바 하루를 넣는다면 가장 간단한 숙소 위치입니다.",
  },
];

const tourPicks = [
  withKlookLocale(tokyoBaySunsetBoatCruise, LOCALE, {
    title: "도쿄만 낮·선셋 보트 크루즈",
    desc: "시바우라에서 출항하는 소형 보트 1시간 크루즈로 가이드가 함께 탑니다. 식사가 없는 도쿄만 크루즈입니다",
  }),
  withKlookLocale(tokyoBayYakatabuneDinnerShow, LOCALE, {
    title: "도쿄만 야카타부네 디너 크루즈(쇼 포함)",
    desc: "1시간 30분의 전통 지붕 배 크루즈로, 스키야키와 무제한 소프트드링크가 포함되고 오다이바 앞바다에서 갑판에 나갈 수 있습니다",
  }),
  withKlookLocale(tokyoSightseeingBusTour, LOCALE, {
    title: "도쿄 관광버스 1일 투어",
    desc: "고쿄 정원, 아사쿠사, 도쿄 스카이트리를 다국어 오디오 가이드와 함께 도는 가이드 투어입니다",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "도쿄 조이폴리스 입장권" }];

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
                  <td key={c} className={c === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
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

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)" }}>
    {label}
  </a>
);

export default function KoTokyoJoypolisTicketsPage({ updated }: { updated: PageUpdated }) {
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
            세가(SEGA)의 실내 테마파크 도쿄 조이폴리스(東京ジョイポリス)는 오다이바 건물 3층부터 있고, 유리카모메역에서
            2분입니다. 입장권별 요금, 패스포트가 이득이 되는 어트랙션 수, 오다이바 하루 일정에 넣는 방법을 정리했습니다.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 요금, 확인일 표시", "패스포트 손익분기점"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            도쿄 조이폴리스 입장권은 성인 기준 입장만 ¥1,700, 전 어트랙션을 이용할 수 있는 조이폴리스 패스포트는 ¥6,000이며
            (초·중·고생은 ¥1,400과 ¥5,000), 입장권만 있으면 어트랙션은 1회 ¥700~¥1,000이므로 패스포트는 약 5번째
            어트랙션부터 이득입니다. 저녁 요금도 있습니다. 이브닝 패스포트는 15:00부터(22:00 폐장일은 16:00부터) ¥5,000,
            2회 이용 CHOI-NORI-NIGHT 입장권은 17:00부터 ¥3,100입니다. 2~4시간을 잡고, 유리카모메로 오다이바카이힌코엔역
            (도보 2분, 신바시에서 약 13분) 또는 린카이선으로 도쿄텔레포트역(도보 5분)에 가세요. 요금과 교통은 {CHECKED}에
            tokyo-joypolis.com에서 확인했습니다.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>입장권만</p>
                <p className={styles.verdictStatValue}>성인 ¥1,700 / 초·중·고생 ¥1,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>패스포트(전 어트랙션)</p>
                <p className={styles.verdictStatValue}>성인 ¥6,000 / 초·중·고생 ¥5,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>필요한 시간</p>
                <p className={styles.verdictStatValue}>2~4시간, 입장 마감은 폐장 45분 전</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>가는 방법</p>
                <p className={styles.verdictStatValue}>오다이바카이힌코엔역에서 2분</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 도쿄 조이폴리스 입장권은 네 종류입니다. 입장권만은 성인 ¥1,700, 초·중·고생 ¥1,400,
              어트랙션 무제한 이용이 추가되는 패스포트는 ¥6,000과 ¥5,000, 15:00부터 판매하는 이브닝 패스포트는 ¥5,000과
              ¥4,000, 17:00부터 판매하는 2회 야간권은 누구나 ¥3,100입니다. 날짜 지정도 매진도 없으므로 가장 먼저가 아니라 맞는
              입장권을 사세요. 그리고 아래 키 제한 표를 먼저 보세요. 21개 어트랙션 중 13개에 최저 키 기준이 있고, 대표
              어트랙션 두 개는 130cm가 필요합니다. 요금은 {CHECKED}에 tokyo-joypolis.com에서 확인했습니다.
            </p>
            <KlookLink
              href={PASSPORT_URL}
              target="_blank"
              rel={KLOOK_REL}
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              클룩에서 조이폴리스 패스포트 확인 →
            </KlookLink>
          </div>
        </div>

        <KlookSameDayCards
          heading="오다이바 하루의 나머지 예약: teamLab Planets, 바닷가 숙소, 모바일 데이터"
          cards={sameDayCards}
          footnote={
            <>
              입장 시간대와 요금은{" "}
              <Link href="/ko/guides/attractions/teamlab-planets-tickets">teamLab Planets 입장권 가이드</Link>를 보세요.
            </>
          }
        />

        <EsimCtaTop />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>개요</span>
          <h2 className={styles.sectionTitle}>도쿄 조이폴리스는 어떤 곳인가요?</h2>
          <p className={styles.bodyText}>
            도쿄 조이폴리스는 세가의 실내 놀이공원으로, 오다이바 다이바 1-6-1 DECKS Tokyo Beach의 3~5층에 있습니다. 디즈니
            같은 테마파크가 아니고 그렇게 보이려고 하지도 않습니다. 실내 롤러코스터, 하프파이프 시뮬레이터, 걸어서 체험하는
            호러·미스터리 어트랙션 여러 개, 라이선스 작품 체험 몇 가지 등 21개 어트랙션이 아케이드 게임 층 위에 모두 한 지붕
            아래 있습니다.
          </p>
          <p className={styles.bodyText}>
            그래서 쓰임새가 분명합니다. 완전히 실내이고, 역에서 걸어서 2분이며, 미리 예매할 필요가 없고, 하루가 아니라 2~4시간이면
            됩니다. 비 오는 오후, 10대 일행, 오다이바 하루 일정의 후반으로 넣기에 도쿄에서 가장 쉬운 곳 중 하나입니다. 제대로
            정해야 할 것은 네 가지 입장권 중 무엇을 살지, 그리고 일행 모두가 키 제한을 통과하는지입니다.
          </p>
          <p className={styles.bodyText}>
            어트랙션보다 공연과 캐릭터를 보고 싶은 일행이라면, 도쿄의 다른 큰 실내 테마파크는 다마센터의 산리오 퓨로랜드입니다.
            조이폴리스와 달리 날짜 지정 패스포트에 도착 시간 예약까지 필요하므로, 날짜를 정하기 전에{" "}
            <Link href="/guides/attractions/sanrio-puroland-tickets" hrefLang="en" style={linkStyle}>
              산리오 퓨로랜드 입장권 가이드(영어)
            </Link>
            를 읽어 보세요.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>요금</span>
          <h2 className={styles.sectionTitle}>도쿄 조이폴리스 패스포트는 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            성인 ¥6,000, 초·중·고생 ¥5,000이고, 15:00부터 판매하는 이브닝 패스포트는 ¥5,000과 ¥4,000입니다. 도쿄 조이폴리스의
            모든 입장권을 아래에 정리했고, 첫 행에 패스포트가 이득이 되기 시작하는 어트랙션 수를 적었습니다.
            &ldquo;초·중·고생&rdquo;은 파크 자체 요금 구분(초등학생, 중학생, 고등학생)이고, &ldquo;성인&rdquo;은 18세
            이상입니다.
          </p>
          <Table
            head={["입장권", "성인(18세 이상)", "초·중·고생", "내용"]}
            rows={priceRows.map((r) => [r.ticket, r.adult, r.child, r.what])}
          />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO}. 공식 출처:{" "}
            {OFFICIAL.map((o, i) => (
              <span key={o.href}>
                {ext(o.href, o.label)}
                {i < OFFICIAL.length - 1 ? ", " : "."}
              </span>
            ))}{" "}
            손익분기 행은 이 요금으로 계산한 것입니다. 패스포트에서 입장권을 뺀 금액은 성인 ¥4,300, 초·중·고생 ¥3,600이므로,
            ¥1,000짜리 어트랙션을 고르면 5번째(초·중·고생은 4번째)부터, ¥700짜리를 고르면 7번째(6번째)부터 이득입니다. 요금은
            바뀔 수 있으니 구매할 때 확인하세요. 파크는 입장권을 환불하지 않습니다. 무료 입장 대상은 네 그룹입니다. 키 110cm
            미만 미취학 아동, 연령 확인 서류를 보여 주는 60세 이상, 모자건강수첩을 보여 주는 임산부, 장애인 수첩 소지자와
            동반자 2명까지입니다. 일본 각지의 입장료를 확인일과 함께 정리한{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en" style={linkStyle}>
              일본 관광지 입장료 표(영어)
            </Link>
            도 참고하세요.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>입장권 선택</span>
          <h2 className={styles.sectionTitle}>도쿄 조이폴리스는 가볼 만한가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            어트랙션을 5개 이상 타고 일행 모두가 키 제한을 통과한다면 가볼 만합니다. 2~3개만 탄다면 입장권과 1회 요금이 더
            저렴합니다. 네 가지 당일 입장권 중 맞는 것은 다음과 같습니다.
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩 조이폴리스 패스포트 →
            </KlookLink>
            <KlookLink href={TICKET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              입장 중심 티켓 상품 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>키 제한</span>
          <h2 className={styles.sectionTitle}>키 제한이 있는 어트랙션은 무엇인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            21개 어트랙션 중 13개에 최저 키 기준이 있고, 2개는 최고 기준도 있습니다. 키 105cm인 아이에게 ¥5,000짜리 패스포트를
            사기 전에 봐야 할 표이며, 무료 입장 기준인 110cm를 다시 봐야 하는 이유이기도 합니다. 110cm는 파크에서 가장 흔한
            최저 기준이기도 하기 때문입니다.
          </p>
          <Table head={["키", "어트랙션", "의미"]} rows={heightRows.map((r) => [r.limit, r.rides, r.note])} />
          <p className={styles.bodyText} style={noteStyle}>
            위의 모든 기준은 {CHECKED}에 tokyo-joypolis.com의 어트랙션별 페이지에서 확인했습니다. 콜라보 어트랙션은 바뀌므로,
            특정 어트랙션 때문에 간다면 방문 날짜의 어트랙션 목록을 확인하세요.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>어른</span>
          <h2 className={styles.sectionTitle}>조이폴리스는 어른도 즐길 수 있나요?</h2>
          <p className={styles.bodyText}>
            네. 파크를 대표하는 두 어트랙션 Gekion Live Coaster와 Halfpipe Tokyo는 130cm 이상이고, Storm-G는 140~200cm입니다.
            다른 어트랙션도 같은 방향입니다. House of the Dead, LASER SHOOTING ISSEN 같은 슈팅 어트랙션, 걸어서 체험하는 사다코
            어트랙션, 그리고 7세 미만은 입장할 수 없는 3D 사운드 호러 어트랙션 MURDER LODGE가 있습니다. 성인 패스포트는
            ¥6,000이고, 60세 이상은 연령 확인 서류를 보여 주면 무료로 입장해 파크 안 요금 ¥4,300으로 패스포트를 살 수 있습니다.{" "}
            {CHECKED}에 tokyo-joypolis.com에서 확인했습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>영업시간과 교통</span>
          <h2 className={styles.sectionTitle}>도쿄 조이폴리스까지 어떻게 가나요?</h2>
          <p className={styles.bodyText}>
            유리카모메 오다이바카이힌코엔역에서 도보 2분, 또는 린카이선 도쿄텔레포트역에서 도보 5분입니다. 출발지별 소요 시간은
            이 섹션 끝에 정리했습니다.
          </p>
          <h2 className={styles.sectionTitle}>조이폴리스에서는 시간이 얼마나 필요한가요?</h2>
          <p className={styles.bodyText}>
            클룩 상품 페이지가 권하는 대로 2~4시간을 잡고, 폐장 90분 전까지는 도착하세요. 조이폴리스는 고정 영업시간을 공개하지
            않습니다. 공식 사이트는 캘린더를 운영하며 영업시간을 기간별로 공개하고, 예고 없이 바뀔 수 있다고 분명히 적고
            있습니다. 따라서 이 페이지를 포함한 다른 사이트의 숫자를 믿기보다 방문 날짜를 직접 확인하세요. 어느 날이든 적용되는
            규칙은 두 가지입니다. <strong>입장 마감은 폐장 45분 전</strong>이고, 재입장도 폐장 45분 전까지 가능합니다. 공식
            영어 페이지에는 조이폴리스 카드를 가진 사람은 발권 당일 무제한 재입장할 수 있다고 적혀 있습니다.
          </p>
          <p className={styles.bodyText}>
            폐장 시간은 저녁 입장권도 정합니다. 평소에는 이브닝 패스포트가 15:00, 2회 야간권이 17:00부터 판매되고, 22:00에
            폐장하는 날은 각각 16:00과 18:00으로 늦춰집니다. 저녁 입장권을 쓸 계획이라면 캘린더부터 확인하세요.
          </p>
          <p className={styles.bodyText}>
            가는 길은 어렵지 않습니다. 운영사 교통 안내에 따르면 유리카모메 오다이바카이힌코엔역에서 도보 약 2분, 또는 린카이선
            도쿄텔레포트역에서 약 5분입니다. 오다이바카이힌코엔까지 신바시에서 약 13분, 도쿄역에서 신바시 경유 약 23분,
            도요스에서 약 18분이고, 린카이선으로 시부야, 신주쿠, 이케부쿠로에서 각각 약 18분, 23분, 29분입니다. 운영사는 대중교통
            이용을 부탁합니다. 모두 {CHECKED} 확인.{" "}
            <Link href="/guides/transport/tokyo-transportation" hrefLang="en" style={linkStyle}>
              도쿄 교통 가이드(영어)
            </Link>
            에서 유리카모메와 린카이선을 IC 카드와 패스로 이용하는 방법을 정리했고,{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" hrefLang="en" style={linkStyle}>
              도쿄 서브웨이 티켓(영어)
            </Link>
            은 두 노선 모두에 사용할 수 없다는 점을 알아 두세요.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별</span>
          <h2 className={styles.sectionTitle}>도쿄 조이폴리스 입장권 예매 방법</h2>
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
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩에서 패스포트 확인 →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="조이폴리스 예매를 마쳤다면, 출국 전에 모바일 데이터도 준비하세요." />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>오다이바 하루</span>
          <h2 className={styles.sectionTitle}>teamLab Planets와 조이폴리스를 하루에 갈 수 있나요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            네. 둘 다 유리카모메 노선에 있으므로, 오전에 Planets, 15:00부터 이브닝 패스포트로 조이폴리스, 해가 진 뒤 오다이바
            해안 순서로 다니면 됩니다. 입장 시간 예매가 필요한 곳은 Planets뿐입니다.
          </p>
          <Table head={["시간", "일정", "입장권"]} rows={comboRows.map((r) => [r.when, r.what, r.ticket])} />
          <p className={styles.bodyText} style={noteStyle}>
            최종 확인: {CHECKED_ISO}. 공식 출처: {ext("https://tokyo-joypolis.com/ticket/", "도쿄 조이폴리스 요금")},{" "}
            {ext("https://www.teamlab.art/e/planets/", "teamLab Planets 운영시간과 교통")}과{" "}
            {ext("https://teamlabplanets.dmm.com/en", "공식 판매 사이트")},{" "}
            {ext("https://www.tptc.co.jp/park/01_02", "오다이바 해변공원")}. teamLab 성인 요금은 날짜와 입장 시간대에 따라
            달라집니다. 배에 대해서는{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" hrefLang="en" style={linkStyle}>
              도쿄만 크루즈 가이드(영어)
            </Link>
            를 보세요.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              클룩 조이폴리스 패스포트 →
            </KlookLink>
            <KlookLink href={SUNSET_URL} target="_blank" rel={KLOOK_REL} className={styles.pickCta}>
              도쿄만 선셋 크루즈 →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>하루의 나머지</span>
          <h2 className={styles.sectionTitle}>그날 오다이바에서 무엇을 더 할 수 있나요?</h2>
          <p className={styles.bodyText}>
            안에서 2~4시간을 보내도 하루의 대부분이 남고, 재입장 규정 덕분에 조이폴리스를 하루 전체가 아니라 일정의 한 부분으로
            넣을 수 있습니다. 가장 자연스러운 조합은 바다입니다. 도쿄만 크루즈는 오다이바 해안과 가까운 히노데 부두에서
            출항하고, 저녁 출항편은 15:00에 산 이브닝 패스포트와 시간이 잘 맞습니다.{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" hrefLang="en" style={linkStyle}>
              도쿄만 크루즈 가이드(영어)
            </Link>
            는 같은 검색어로 판매되는 전혀 다른 두 종류의 배를 공식 출항 시간과 요금과 함께 구분했습니다.
          </p>
          <p className={styles.bodyText}>
            아직도 사람들이 도쿄 반대편으로 가는 일이 있어 바로잡을 점이 하나 있습니다.{" "}
            <strong>teamLab Borderless는 더 이상 오다이바에 없습니다.</strong> 오다이바에서 문을 닫고 아자부다이 힐스에서 다시
            열었으므로, 조이폴리스와 teamLab을 함께 가는 하루는 이제 서로 다른 두 지역과 두 번의 열차 이동이 됩니다.{" "}
            <Link href="/ko/guides/attractions/teamlab-borderless-tickets" style={linkStyle}>
              teamLab Borderless 입장권 가이드
            </Link>
            에서 현재 위치, 입장 시간대, 요금을 확인하세요. 도쿄의 다른 teamLab인 Planets는 오다이바로 가는 유리카모메 노선에
            있으며, teamLab의 안내로 신토요스역 1A 출구에서 도보 3분입니다.{" "}
            <Link href="/ko/guides/attractions/teamlab-planets-tickets" style={linkStyle}>
              teamLab Planets 입장권 가이드
            </Link>
            에서 입장 시간대와 공식 판매 사이트를 정리했습니다. 같은 맥락에서, DECKS 건물에 조이폴리스와 함께 있고 세트
            입장권으로 자주 판매되던 마담 투소 도쿄는 자체 사이트에서 2026년 9월 30일에 영업을 종료했다고 밝혔으므로, 그 조합은
            더 이상 없습니다.
          </p>
          <p className={styles.bodyText}>
            짧은 여행에 조이폴리스를 넣는다면,{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" hrefLang="en" style={linkStyle}>
              도쿄 3일 일정(영어)
            </Link>
            에서 입장 시간 예매가 꼭 필요한 두 곳을 밀어내지 않고 해안 오후를 넣는 위치를 볼 수 있고,{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" hrefLang="en" style={linkStyle}>
              도쿄에서 할 것(영어)
            </Link>
            은 도쿄의 관광지를 몇 주 전에 예매해야 하는 곳과 그냥 들어갈 수 있는 곳으로 나눴습니다. 조이폴리스는 확실히 뒤쪽입니다.
          </p>
        </section>

        <KlookTripPrep
          label="같은 날 함께 예약"
          heading="오다이바 하루에 함께 예약할 만한 것은?"
          intro="안에서 2~4시간을 보내도 저녁이 비고, 그 시간을 보내기에 가장 좋은 곳은 바다입니다."
          items={tripPrepItems}
        />

        <EsimCtaBottom />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="도쿄 조이폴리스 입장권 자주 묻는 질문" />

        <KlookTourPicks
          heading="오다이바 하루의 나머지"
          intro="오다이바와 히노데 쪽 바다에서 출항하는 도쿄만 크루즈 두 가지와 시내 관광버스로, 조이폴리스 앞뒤 시간에 맞는 상품입니다. 클룩 가격은 날짜에 따라 달라지므로 상품 페이지에서 여행 날짜의 가격과 승선장을 확인하세요."
          tours={tourPicks}
        />

        <Related
          items={[
            { href: "/guides/attractions/legoland-japan-tickets", title: "레고랜드 재팬 입장권(2026): 가격, 영업시간, 가볼 만할까 (영어)" },
            { href: "/guides/attractions/ghibli-park-tickets", title: "지브리 파크 입장권(2026): 가격, 예매 시작일, 해외에서 사는 법 (영어)" },
            { href: "/ko/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets 입장권: 가격, 운영시간, 예매 방법" },
            { href: "/guides/attractions/tokyo-bay-cruise", title: "도쿄만 크루즈(2026): 야카타부네와 심포니, 시간과 요금 (영어)" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "teamLab Borderless 입장권: 가격, 예매 방법, 입장 시간대" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "산리오 퓨로랜드 입장권 2026: 가격, 예매 (영어)" },
            { href: "/guides/attractions/fuji-q-highland-tickets", title: "후지큐 하이랜드 입장권(2026): 프리패스 가격과 가는 방법 (영어)" },
            { href: "/guides/attractions/tokyo-3-day-itinerary", title: "도쿄 3일 일정(2026): 무엇을 어떤 순서로 예매할까 (영어)" },
            { href: "/guides/attractions/things-to-do-tokyo", title: "도쿄에서 할 것(2026): 미리 예매할 곳과 그냥 갈 곳 (영어)" },
            { href: "/guides/attractions/tokyo-subway-ticket", title: "도쿄 서브웨이 티켓(2026): 24, 48, 72시간권 (영어)" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 열차, 지하철, IC 카드 (영어)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>가장 먼저 보이는 것이 아니라 맞는 입장권을 사세요</h2>
            <p className={styles.ctaBannerDesc}>
              날짜 지정도 매진도 없으므로, 정할 것은 네 가지 상품 중 무엇을 살지뿐입니다. 클룩 상품은 한국어 화면으로 결제하고
              해외 발급 카드를 받으며 입구용 QR 코드를 줍니다. 결제 전에 원하는 날짜의 취소 가능 기한을 확인하세요.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PASSPORT_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                클룩에서 조이폴리스 패스포트 보기 →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
