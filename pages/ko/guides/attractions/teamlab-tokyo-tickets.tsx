// Korean edition of /guides/attractions/teamlab-tokyo-tickets. Mirrors the English page as of
// 2026-11-01 block by block (same sections, tables, CTAs and Klook/GetYourGuide blocks); no
// figure here is new to the Korean edition — prices come from lib/attraction-prices.ts and the
// rest from the English page's own text.
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
import KlookTourPicks from "../../../../components/KlookTourPicks";
import { GygCompareButton } from "../../../../components/GygCompare";
import {
  fujiDayTour,
  tokyoBaySunsetBoatCruise,
  tokyoJoypolisPassport,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiCultureFoodTour,
} from "../../../../lib/klook-links";
import { koTeamlabPlanets } from "../../../../lib/klook-links-ko";
import { withKlookLocale } from "../../../../lib/klook-locale";
import { gygTeamlabPlanets } from "../../../../lib/gyg-links";
import { PRICES } from "../../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel, priceLabel } from "../../../../lib/i18n";

const ROUTE = "/ko/guides/attractions/teamlab-tokyo-tickets";
const TITLE = "팀랩 플래닛 예약(2026): 티켓 가격과 입장 시간";
const DESC =
  "팀랩 플래닛 예약 2026: 도요스 공식 가격 성인 ¥3,800부터, 30분 단위 입장 시간, 맨발 구간 복장, 보더리스와의 차이.";

const PLANETS_URL = koTeamlabPlanets.url;
const GYG_SLUG = "ko-teamlab-tokyo-tickets";

const P = PRICES.teamlabPlanets;
const B = PRICES.teamlabBorderless;
// 가격과 예약 규칙은 공식 티켓 스토어를 읽은 날짜(CHECKED), 운영 시간과 휴관일은
// teamlab.art를 읽은 날짜(HOURS_CHECKED)입니다. 영어판과 같은 처리입니다.
const CHECKED = dateLabel(P.checked, "ko");
const HOURS_CHECKED = dateLabel("2026-10-09", "ko");
const BORDERLESS_CHECKED = dateLabel(B.checked, "ko");
const ADULT = priceLabel(P.adult, "ko");
const CHILD = priceLabel(P.child, "ko");
const B_ADULT = priceLabel(B.adult, "ko");

const priceRows = [
  {
    ticket: "성인(만 18세 이상)",
    price: ADULT,
    varies: "예 — 날짜와 입장 시간에 따라",
    note: "¥3,800은 최저 요금이며, 스토어가 날짜와 회차마다 따로 가격을 매깁니다",
  },
  { ticket: "중・고등학생", price: "¥2,800", varies: "아니요 — 고정", note: "학생증을 지참하세요" },
  { ticket: "어린이(만 4~12세)", price: CHILD, varies: "아니요 — 고정", note: "만 4세 미만은 티켓이 필요 없습니다" },
  {
    ticket: "만 3세 이하",
    price: priceLabel("Free", "ko"),
    varies: "아니요 — 무료",
    note: "여벌 옷을 챙기세요. 물 구간에서는 모두 젖습니다",
  },
  {
    ticket: "장애인 방문객",
    price: priceLabel("from ¥1,900", "ko"),
    varies: "예 — 성인 티켓과 같은 달력",
    note: "장애인 증명서를 지참하세요",
  },
  {
    ticket: "Premium Pass(만 4세 이상)",
    price: "¥12,000",
    varies: "아니요 — 고정",
    note: "입장 대기줄 없이 아무 시간에나 입장. 관내의 줄은 건너뛰지 못합니다",
  },
];

const hoursRows = [
  { item: "운영 시간", detail: "공지 08:00–22:00, 날짜에 따라 변동", source: `teamlab.art, ${HOURS_CHECKED}` },
  { item: "마지막 입장", detail: "폐관 1시간 전", source: `공식 티켓 스토어, ${CHECKED}` },
  {
    item: "휴관일",
    detail: "비정기 — 2026년 12월 3일(목) 포함",
    source: `teamlab.art, ${HOURS_CHECKED}`,
  },
  {
    item: "입장 회차",
    detail: "티켓에 적힌 시간이 입장 시간이고, 그로부터 30분이 입장 준비 시간입니다",
    source: `공식 티켓 스토어, ${CHECKED}`,
  },
  {
    item: "입장 대기",
    detail: "입구에서 30~60분 기다릴 수 있습니다",
    source: `공식 티켓 스토어, ${CHECKED}`,
  },
  {
    item: "회차에 늦었을 때",
    detail: "당일 운영 시간 안이라면 마지막 입장 전까지 입장할 수 있습니다",
    source: `공식 티켓 스토어, ${CHECKED}`,
  },
  {
    item: "관내 체류 시간",
    detail: "보관함과 물기 닦는 시간까지 약 1.5~2시간",
    source: "저희의 일정 기준 — 팀랩은 공식 수치를 발표하지 않습니다",
  },
  {
    item: "보관함",
    detail: "무료, 가로 23cm × 깊이 34cm × 높이 37cm. 그보다 큰 짐을 맡기는 곳은 없습니다",
    source: `공식 티켓 스토어, ${CHECKED}`,
  },
];

const ticketChoice = [
  {
    title: "Entrance Pass — 성인 ¥3,800부터",
    desc: `일반 티켓이고 거의 모든 사람에게 필요한 것은 이쪽입니다. 날짜와 입장 시간을 지정하며, 공식 스토어가 그 조합마다 따로 가격을 매기므로 판매처보다 고르는 날짜가 더 중요합니다. 확인일 ${CHECKED}.`,
  },
  {
    title: "Premium Pass — ¥12,000, 만 4세 이상",
    desc: `공식 스토어가 말하는 효과는 하나입니다. 입장 대기줄에 서지 않고 아무 시간에나 입장할 수 있고, 대신 인포메이션 센터로 갑니다. 전시 안의 줄을 건너뛸 수 없다고 명시하고 있습니다. 입구의 30~60분 대기가 하루 일정을 망가뜨릴 때만 가치가 있고, 일반적인 업그레이드로 볼 것은 아닙니다. 확인일 ${CHECKED}.`,
  },
  {
    title: "환불은 안 되고, 변경은 됩니다",
    desc: `구매 후에는 어떤 티켓도 환불되지 않습니다. 대신 옮길 수 있습니다. 스토어 도움말 페이지 기준으로 Entrance Pass는 입장 시간 2시간 전까지, Premium Pass는 당일 08:30까지 변경할 수 있고, 어느 쪽이든 최대 3회이며 쿠폰으로 산 티켓은 변경할 수 없습니다. 확인일 ${CHECKED}.`,
  },
];

const compareRows = [
  { factor: "위치", planets: "도요스(고토구)", borderless: "아자부다이힐스(미나토구)" },
  { factor: "콘셉트", planets: "몰입형, 맨발, 물속을 걷습니다", borderless: "지도 없는 미로 속 50점 이상의 작품" },
  { factor: "어울리는 사람", planets: "가족, 첫 방문, 몸으로 느끼는 체험", borderless: "미술 애호가, 천천히 둘러보기, 사진" },
  { factor: "필요한 시간", planets: "맨발 준비까지 약 1.5~2시간", borderless: "약 2시간, 더 머물면 더 길게" },
  { factor: "성인 티켓(부터)", planets: ADULT, borderless: B_ADULT },
  { factor: "운영 시간", planets: "공지 08:00–22:00, 날짜에 따라 변동", borderless: "공지 08:30–21:00, 날짜에 따라 변동" },
  { factor: "입장", planets: "30분 단위 입장 회차", borderless: "지정 회차 또는 시간 미지정 Flexible Pass" },
  { factor: "알아 둘 점", planets: "2027년 말까지 운영 예정, 맨발과 물 구간", borderless: "현장 구매 시 ¥200 더 비쌉니다" },
];

const whoFor = [
  {
    title: "플래닛을 고른다면",
    desc: "아이와 함께이거나, 몸을 쓰는 체험을 원하고 발이 젖는 걸 꺼리지 않는 경우입니다. 성인 무릎 높이까지 오는 물속을 맨발로 걷습니다. 두 곳 중 더 즐겁고 감각적인 곳이며, 아이와 함께 즐기기 쉬운 곳입니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "보더리스를 고른다면",
    desc: "작품 사이를 지나가기보다 작품 속에 빠져들고 싶은 경우입니다. 아자부다이힐스의 보더리스에는 정해진 경로가 없습니다. 작품이 방과 방 사이를 옮겨 다니고, 50개가 넘는 공간을 자유롭게 돌아다닙니다. 시간을 들여 천천히 감상하기 좋은 곳이며, 성인에게는 사진도 더 잘 나옵니다.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
      </svg>
    ),
  },
  {
    title: "둘 다 가도 좋은 경우",
    desc: "비어 있는 반나절이 두 번 있고 팀랩을 제대로 좋아한다면 좋습니다. 도시의 서로 다른 구역에 있는 전혀 다른 체험이라 두 곳 모두 가도 겹치지 않습니다. 날짜를 나누고 각각의 지정 회차를 미리 예약하세요.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "날짜를 먼저 정하고, 그 날짜의 가격을 달력에서 읽습니다",
    desc: `성인 티켓은 ¥3,800부터이고 실제 금액은 고른 날짜와 입장 시간에 따라 달라집니다. 스토어 도움말 페이지도 날짜마다 요금이 다르다고 확인하고 있습니다. 하나로 정하기 전에 가능한 날짜를 하나씩 넘겨 보세요. 확인일 ${CHECKED}.`,
  },
  {
    title: "입장 시간을 고릅니다. 그것이 곧 예약입니다",
    desc: "티켓에 적힌 시간이 입장 시간이고, 그로부터 30분이 입장 준비 시간입니다. 미술관에는 기댈 매표 창구가 없으므로 고른 회차가 곧 방문 일정입니다. 당일이라면 달력이 이미 차 있을 수도 있습니다.",
  },
  {
    title: "Entrance Pass와 Premium Pass 중에서 고릅니다",
    desc: "요금 구분 네 가지에 ¥12,000 Premium Pass가 더해지며, 줄과 관련된 것은 그중 하나뿐입니다. 위의 티켓 표를 먼저 보세요. Premium Pass로 사는 것은 입구 대기줄 없이 들어가는 것뿐이므로, 대부분은 Entrance Pass로 더 이른 회차를 잡는 편이 낫습니다.",
  },
  {
    title: "공식 스토어나 스토어가 명시한 판매처에서 삽니다",
    desc: `공식 스토어 도움말 페이지는 현장 창구나 자동판매기에서 티켓을 팔지 않는다고 적고, 판매 경로로 공식 Ticket Store, Lawson Ticket, Seven Ticket, 클룩을 명시합니다. 클룩은 한국어 화면과 자국 통화로 결제할 수 있어 많은 여행자가 실제로 이쪽을 씁니다. 어느 쪽이든 티켓은 휴대폰의 QR 코드입니다. 확인일 ${CHECKED}.`,
  },
  {
    title: "물에 젖어도 괜찮은 옷을 입고, 지정된 입장 시간에 맞춰 도착하세요",
    desc: "반바지나 무릎 위까지 걷어 올릴 수 있는 바지를 입으세요. 일부 작품은 물 공간이고 수심이 성인 무릎까지 올라올 수 있습니다. 바닥 일부가 거울이라 치마나 통이 넓은 바지라면 XS~6L 무료 대여 반바지를 이용할 수 있습니다. 입구 대기가 30~60분까지 걸릴 수 있으니 회차가 열리는 시간에 도착하세요.",
  },
];

const faqItems: FaqItem[] = [
  {
    q: "2026년 팀랩 플래닛 티켓 가격은 얼마인가요?",
    a: `팀랩 플래닛 공식 티켓 스토어 기준(확인일 ${CHECKED}), 성인은 ¥3,800부터, 중・고등학생 ¥2,800, 만 4~12세 어린이 ${CHILD}, 만 3세 이하는 무료입니다. 장애인 방문객은 ¥1,900부터이고, 만 4세 이상 대상 Premium Pass가 ¥12,000에 판매됩니다. 성인 가격은 날짜와 회차에 따라 달라지므로 결제 전에 본인 회차의 금액을 확인하세요. 할인 티켓은 자격 증빙이 필요합니다. 학생증, 여권, 장애인 증명서를 챙기세요.`,
  },
  {
    q: "팀랩 플래닛은 미리 예약해야 하나요?",
    a: "네, 도쿄의 다른 명소보다 더 그렇습니다. 플래닛은 30분 단위 입장 회차로 운영되고 인기 시간대는 2~3주 전에 매진되며, 주말과 연휴에는 특히 그렇습니다. 공식 도움말 페이지도 미술관 현장 구매에 기대지 말라고 분명히 적고 있습니다. 티켓은 현장 창구가 아니라 온라인 사전 판매입니다. 출발 전에 날짜와 회차를 예약하세요.",
  },
  {
    q: "팀랩 플래닛 티켓을 현장에서 살 수 있나요?",
    a: `아니요. 공식 티켓 스토어 도움말 페이지는 현장 매표 창구나 자동판매기에서 티켓을 구매할 수 없다고 적고, 판매 경로로 공식 Ticket Store, Lawson Ticket, Seven Ticket, 클룩을 명시합니다. 날짜가 매진되면 기댈 현장 창구가 없다는 점이 플래닛과 도쿄 대부분의 명소 사이의 가장 큰 차이입니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛은 어느 회차가 가장 저렴한가요?",
    a: `본인 날짜의 공식 달력에서 가장 낮게 책정된 회차입니다. 팀랩은 회차별 가격표를 공개하지 않으므로 그것이 유일하게 정직한 답입니다. 공식 스토어가 확인해 주는 것은 성인 Entrance Pass가 ¥3,800부터이고 날짜마다 요금이 다르다는 점입니다. 도움말 페이지는 예약을 "요금이 다른 날짜로도" 옮길 수 있다고 적고 있습니다. 그러니 스토어 달력을 열어 여행 일정에 넣을 수 있는 날짜와 입장 시간을 넘겨 보고, 결제하기 전에 금액을 비교하세요. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛에 보관함이 있나요?",
    a: `네, 무료입니다. 공식 도움말 페이지 기준 크기는 가로 23cm, 깊이 34cm, 높이 37cm로, 작은 배낭은 들어가지만 캐리어는 들어가지 않습니다. 짐 맡기는 곳은 없어서, 더 큰 짐은 건물 밖 유모차 보관 공간에 본인이 와이어 잠금장치로 직접 고정해야 합니다. 신발, 양말, 스타킹도 보관함에서 벗습니다. 거기서부터는 맨발로 관람하기 때문입니다. 확인일 ${CHECKED}.`,
  },
  {
    q: "팀랩 플래닛에 무엇을 입고 가야 하나요?",
    a: "반바지, 또는 무릎 위까지 걷어 올릴 수 있는 바지입니다. 일부 작품은 물 공간이고 수심이 성인 무릎까지 올라올 수 있으며, 미술관 전체를 맨발로 체험합니다. 입장할 때 보관함 공간에서 신발, 양말, 스타킹을 벗습니다. 바닥 일부가 거울이라 치마와 통이 넓은 바지는 좋지 않고, XS~6L 무료 대여 반바지가 있습니다. 아이와 함께라면 여벌 옷을 챙기세요. 유모차는 들어갈 수 없습니다(유모차 보관 공간이 있고 아기띠는 괜찮습니다).",
  },
  {
    q: "팀랩 플래닛 QR 티켓은 언제 받나요?",
    a: "티켓은 QR 전자 티켓뿐입니다. 구매 확인 메일에 링크가 있고, 입장일 2일 전에 안내 메일이 오며, QR 코드는 입장일 00:00부터 표시됩니다. QR 하나로 구매 인원 전체가 입장하고, 휴대폰이나 태블릿으로 보여 주거나 인쇄해도 됩니다. 2026년 11월 6일 확인.",
  },
  {
    q: "팀랩 플래닛은 얼마나 걸리나요?",
    a: "전체적으로 약 1.5~2시간을 잡으세요. 작품 자체는 서두르지 않는 속도로 한 시간에서 한 시간 반 정도지만, 보관함, 맨발 준비, 끝난 뒤 물기를 닦는 시간이 더 필요합니다. 붐빌 때는 입장 준비만으로 30~60분이 걸릴 수 있습니다. 끝난 직후에 빠듯한 일정을 넣지 마세요.",
  },
  {
    q: "팀랩 플래닛 운영 시간과 휴관일은 어떻게 되나요?",
    a: `운영 시간은 날짜에 따라 다릅니다. ${HOURS_CHECKED}에 teamlab.art를 확인했을 때 플래닛의 공지 운영 시간은 08:00–22:00이었고, 공식 티켓 스토어는 ${CHECKED}에도 마지막 입장이 폐관 1시간 전이라고 적고 있었습니다. 2026년 말 휴관일에는 12월 3일(목)이 포함됐습니다. 달력은 매달 바뀌므로 회차를 예약하기 전에 본인 날짜로 공식 달력을 확인하세요.`,
  },
  {
    q: "예약한 팀랩 플래닛 회차를 놓치면 어떻게 되나요?",
    a: "반드시 못 들어가는 것은 아닙니다. 공식 도움말 페이지는 티켓에 적힌 시간이 기준이며, 늦게 도착해도 당일 운영 시간 안에는 입장할 수 있다고 적고 있습니다. 마지막 입장이 폐관 1시간 전이라는 점은 기억하세요. 다만 해당 회차 소지자보다 오래 기다릴 수 있으니 회차를 계획으로 생각하세요.",
  },
  {
    q: "팀랩 플래닛은 어디에 있고 어떻게 가나요?",
    a: "도쿄 동쪽 수변의 도요스에 있습니다. 공식 교통 안내 기준으로 유리카모메선 신토요스역에서 도보 1분, 시조마에역과 도요스 시장에서 도보 5분, 도쿄메트로 유라쿠초선 도요스역에서 도보 10분입니다. 도쿄역에서 택시로 약 15분, 하네다 공항에서 고속도로로 약 15분입니다. 전철 구간은 스이카나 파스모 IC 카드로 충분합니다.",
  },
  {
    q: "팀랩 플래닛은 곧 문을 닫나요?",
    a: "도요스의 팀랩 플래닛은 2027년 말까지 운영될 예정이며, 팀랩은 작품 10점 이상을 추가하는 확장 계획을 발표했습니다. 일정은 바뀔 수 있으니 이곳을 위해 여행을 계획한다면 먼저 공식 사이트를 확인하세요. 아자부다이힐스의 팀랩 보더리스는 계속 운영되는 별개의 미술관이고 티켓도 따로입니다.",
  },
  {
    q: "팀랩 플래닛과 보더리스는 무엇이 다른가요?",
    a: "도요스의 플래닛은 물과 대형 설치 작품 속을 걸어 지나가는 몰입형 맨발 체험으로, 두 곳 중 몸으로 체험하는 요소가 더 많고 가족에게 맞는 곳입니다. 아자부다이힐스의 보더리스는 지도도 정해진 경로도 없는 50점 이상의 작품으로 된 미로로, 작품이 공간 사이를 옮겨 다니고 관람객은 자유롭게 돌아다닙니다. 플래닛은 가족과 첫 방문에, 보더리스는 천천히 탐색하고 싶은 미술 애호가에게 맞습니다. 도쿄의 서로 다른 구역에 있는 별개의 미술관이고 티켓도 따로입니다.",
  },
];

// Same-day picks and day trips: the English page's products, on Klook's Korean path.
const sameDayTours = [
  withKlookLocale(tokyoJoypolisPassport, "ko", {
    title: "도쿄 조이폴리스 패스포트",
    desc: "오다이바 DECKS 실내 테마파크의 입장과 어트랙션 무제한 이용 패스포트. 모바일 QR 코드이며, 상품 페이지 기준 권장 시간은 2~4시간",
  }),
  withKlookLocale(tokyoBaySunsetBoatCruise, "ko", {
    title: "도쿄만 낮・선셋 보트 크루즈",
    desc: "시바우라에서 출발하는 가이드 동승 1시간 소형 보트 크루즈 — 저녁 식사가 없는 버전의 도쿄만 크루즈",
  }),
  withKlookLocale(tsukijiCultureFoodTour, "ko", {
    title: "쓰키지 문화・음식 투어",
    desc: "쓰키지 장외시장을 가이드와 걸으며 시식하고 자리에 앉아 스시를 먹는 코스까지, 영어・중국어・스페인어 진행",
  }),
  withKlookLocale(tokyoSubwayTicket, "ko", {
    title: "도쿄 서브웨이 티켓(24 / 48 / 72시간)",
    desc: "도쿄메트로와 도에이 지하철 전 노선 무제한 승차. 줄 서서 사는 대신 도착해서 수령",
  }),
];

const dayTrips = [
  withKlookLocale(fujiDayTour, "ko", {
    title: "도쿄 출발 후지산 1일 투어",
    desc: "후지산 5합목, 가와구치호, 오시노핫카이를 도는 종일 버스 투어, 당일 저녁 도쿄 복귀",
  }),
  withKlookLocale(tokyoSightseeingBusTour, "ko", {
    title: "도쿄 관광버스 1일 투어",
    desc: "황거 정원, 아사쿠사, 도쿄 스카이트리를 도는 가이드 투어, 다국어 오디오 안내 포함",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE.ko, { label: "팀랩 플래닛 예약" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KoTeamLabPlanetsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, "ko");

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
              inLanguage: JSONLD_LANG.ko,
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel} 업데이트</p>
          <h1 className={styles.heroTitle}>
            팀랩 플래닛 예약(2026):<br />티켓 가격, 예약 방법, 플래닛 vs 보더리스
          </h1>
          <p className={styles.heroSubtitle}>
            도요스 팀랩 플래닛 티켓은 얼마인지, 30분 간격으로 운영되는 입장 시간대는 어떻게 예약하는지, 물에 들어가는 구역에서는
            어떤 옷을 입어야 하는지 — 그리고 플래닛과 아자부다이힐스 보더리스는 무엇이 다른지.
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel} 업데이트`, "공식 가격", "플래닛 vs 보더리스"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <Disclosure />

        <p className={styles.bodyText}>
          도요스 <strong>팀랩 플래닛</strong>의 성인 티켓은 공식 티켓 스토어에서 <strong>{ADULT}</strong>이고, 고르는
          날짜와 입장 시간에 따라 금액이 달라지므로 ¥3,800은 최저 요금입니다. 입장은 사전 예약하는{" "}
          <strong>30분 단위 입장 회차</strong>로 운영되며 — 스토어는 현장 창구나 자동판매기에서 아무것도 팔지
          않는다고 적고 있습니다 — 맨발로 들어가는 보관함 공간과 끝난 뒤 물기를 닦는 시간까지{" "}
          <strong>약 1.5~2시간</strong>을 잡으세요. 입구는 유리카모메선 <strong>신토요스역에서 도보 1분</strong>
          입니다. 플래닛만이 아니라 <strong>도쿄 팀랩 티켓</strong>을 찾고 있다면, 도쿄에는 팀랩 미술관이 두 곳
          있고 이 가이드에서 실제로 어느 쪽이 맞는지 다룹니다. 가격과 예약 규칙은 {CHECKED}에 팀랩 플래닛 공식
          티켓 스토어에서, 운영 시간은 {HOURS_CHECKED}에 teamlab.art에서 읽었습니다.
        </p>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>결론부터</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>성인 티켓</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>입장</p>
                <p className={styles.verdictStatValue}>30분 회차, 사전 예약</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>필요한 시간</p>
                <p className={styles.verdictStatValue}>약 1.5~2시간</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>복장</p>
                <p className={styles.verdictStatValue}>반바지 — 맨발, 무릎 깊이 물</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>요약:</strong> 팀랩 플래닛 성인 입장권은 {ADULT}, 고등학생 ¥2,800, 만 4~12세 {CHILD}
              입니다. 티켓은 30분 입장 구간에 해당하고 현장 창구에서 팔지 않으므로 주말이라면 2~3주 전에
              예약하세요. 맨발로 들어가고 일부 작품은 수심이 성인 무릎까지 오는 물 공간이니 반바지나 걷어 올릴
              수 있는 바지를 입으세요(XS~6L 무료 대여 반바지가 있습니다). 1.5~2시간을 잡고, 신토요스역에서 도보
              1분입니다. 아자부다이 쪽 미술관을 찾고 있다면{" "}
              <Link href="/ko/guides/attractions/teamlab-borderless-tickets">팀랩 보더리스 티켓 가이드</Link>를
              보세요.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
                팀랩 플래닛 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              가격과 예약 규칙은 {CHECKED}에 팀랩 플래닛 공식 티켓 스토어에서, 운영 시간과 휴관일은{" "}
              {HOURS_CHECKED}에 teamlab.art에서 읽었습니다. 플래닛 가격은 날짜와 회차에 따라 달라지고 달력도
              바뀌므로 결제할 때 본인 날짜로 둘 다 확인하세요.
            </p>
          </div>
        </div>

        <BookingEsimCard />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>가격</span>
          <h2 className={styles.sectionTitle}>2026년 팀랩 플래닛 티켓 가격은 얼마인가요?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            성인은 <strong>{ADULT}</strong>, 중・고등학생은 ¥2,800, 만 4~12세 어린이는 ¥1,500, 만 4세 미만은
            무료입니다. 날짜에 따라 달라지는 요금은 성인과 장애인 요금뿐입니다. 공식 스토어가 날짜와 입장 시간마다 따로 가격을
            매기기 때문에 스토어의 금액에도 물결표(~)가 붙고, 가장 저렴한 티켓을 찾으려면 판매처보다 방문
            날짜와 시간대를 먼저 비교해야 합니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["티켓", "가격(부터)", "날짜에 따라 변동?", "비고"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {CHECKED}에 팀랩 플래닛 공식 티켓 스토어의 영어판과 일본어판에서 읽었습니다. 할인 티켓은 자격 증빙이
            필요하니 학생증, 여권, 장애인 증명서를 챙기세요. 티켓은 휴대폰의 QR 코드로 발급됩니다.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>성인 가격이 얼마나 오르내리는지는 공개되지 않습니다.</strong> 팀랩이 내놓는 것은 시작 가격과
            달력이지 가격표가 아니며, 도움말 페이지는 요금이 다르다는 사실만 확인해 줍니다. 예약은 &ldquo;요금이
            다른 날짜로도&rdquo; 옮길 수 있다고 적혀 있습니다. 그러니 ¥3,800을 최저 요금으로 보고, 여행 일정에 넣을
            수 있는 날짜의 스토어 달력을 열어 날짜마다 입장 시간을 비교한 뒤 결제하세요. 여기서 쓸 수 있는
            수단은 방문일을 하루 옮기는 것이지 더 싼 판매처를 찾는 것이 아닙니다. 가격을 정하는 것은 날짜입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>예약 전에</span>
          <h2 className={styles.sectionTitle}>운영 시간, 입장 회차, 필요한 시간</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            플래닛의 운영 시간은 길지만 티켓은 그렇지 않습니다. 티켓에 적힌 시간은 입장 시간이고, 입구 대기줄이
            그 위에 30~60분을 더할 수 있습니다. 전체적으로 약 1.5~2시간을 잡고 바로 뒤에 빠듯한 일정을 넣지
            마세요.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "공식 정보", "출처와 확인일"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            플래닛은 일반적인 미술관 티켓보다 요구하는 것이 많습니다. 맨발로 들어가고 경로의 일부가 물입니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>맨발:</strong> 신발, 양말, 스타킹은 보관함에서 벗습니다. 처음부터 끝까지 맨발 체험입니다.</li>
            <li><strong>물:</strong> 일부 작품은 물 공간이고 수심이 성인 무릎까지 올라올 수 있습니다. 반바지나 걷어 올릴 수 있는 바지를 입으세요.</li>
            <li><strong>거울 바닥:</strong> 치마와 통이 넓은 바지는 문제가 됩니다. 공식 FAQ는 속옷이 보일 수 있다고 적고 있습니다. XS~6L 무료 대여 반바지가 있습니다.</li>
            <li><strong>아이와 함께:</strong> 여벌 옷을 챙기세요. 유모차는 안으로 들어갈 수 없습니다. 밖에 유모차 보관 공간이 있고 아기띠는 괜찮습니다.</li>
            <li><strong>짐:</strong> 무료 보관함 크기는 23 × 34 × 37cm입니다. 짐 맡기는 곳이 없으므로 캐리어는 유모차 보관 공간에 본인이 와이어로 잠가 둡니다.</li>
            <li><strong>물 위생:</strong> 공식 FAQ에 따르면 물은 상시 여과되고 염소 농도를 매시간 측정하며, 출구에는 소독한 수건이 있습니다.</li>
            <li><strong>휠체어:</strong> 이용할 수 있고 직원이 경로를 안내합니다. 일부 작품에는 갈 수 없고, 물 구간은 동반자와 함께 전용 휠체어로 옮겨 타야 합니다.</li>
          </ul>
          <p className={styles.bodyText}>
            운영 시간과 휴관일은 매달 바뀌므로 회차를 정하기 전에 본인 여행 날짜로 공식 달력을 여세요. 위 내용은
            관내 체류 시간을 제외하면 모두 공식 문구이며, 표에 적힌 날짜에 읽었습니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>무엇을 사는가</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 정확히 무엇인가</h2>
          <p className={styles.bodyText}>
            팀랩은 바라보는 것이 아니라 그 안을 걸어 다니는, 공간을 가득 채운 디지털 설치 작품으로 알려진 도쿄의
            아트 컬렉티브입니다. 도요스의 플래닛은 그중 몸을 쓰는 곳입니다. 맨발로 물을 건너고, 관람객의 존재에
            반응하는 작품들 사이를 지나갑니다. 거울로 된 무한 공간, 떠 있는 구체로 가득한 홀, 살아 있는 정원
            같은 것들입니다. 도쿄의 두 팀랩 미술관 중 아이와 즐기기 쉬운 곳이고, 이런 규모의 디지털 아트를 처음
            접한다면 두 곳 중 더 인상적으로 느껴질 곳입니다.
          </p>
          <p className={styles.bodyText}>
            그리고 붐빕니다. 팀랩은 2025년 방문객이 250만 명을 넘었다고 발표했습니다. 미술관은 2027년 말까지
            운영될 예정이고 작품 10점 이상을 추가하는 확장 계획도 발표됐으니, 이미 방문한 적이 있더라도 다시
            찾을 때는 새로운 작품을 만날 수 있을 것입니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>판단</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 갈 만한가요?</h2>
          <p className={styles.bodyText}>
            도쿄를 처음 찾는 대부분의 여행자에게는 그렇습니다. 다만 1인 {ADULT}에 1.5~2시간짜리 명소이니, 가격은
            반나절인데 소비는 긴 점심처럼 끝납니다. 결론 대신 계산을 그대로 보여 드립니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>시간당 가격이 높습니다.</strong> 1.5~2시간에 ¥3,800부터는 ¥1,500인 도쿄타워 메인 데크의 두 배가 넘고 시부야 스카이의 낮 시간 온라인 티켓 {PRICES.shibuyaSky.adult.split(" / ")[0]}보다도 훨씬 비쌉니다. 두 곳 모두 오래 머물 수 있습니다. 길이가 아니라 다른 곳에서는 볼 수 없는 것에 돈을 내는 것입니다 — 금액은 <Link href="/guides/attractions/japan-attraction-ticket-prices">일본 명소 티켓 가격(영어)</Link> 표에서 비교해 보세요.</li>
            <li><strong>입장 비용은 돈만이 아니라 시간입니다.</strong> 공식 FAQ는 붐비는 시간대에 입장까지 30~60분 대기를 경고하고, 그 위에 맨발 준비가 더해집니다. 정직하게 잡아야 할 시간은 2시간입니다.</li>
            <li><strong>도쿄에서 가장 몸을 쓰는 미술관입니다.</strong> 처음부터 끝까지 맨발, 성인 무릎 높이의 물, 거울 바닥. 그게 체험이 아니라 고생처럼 들린다면, 아자부다이의 보더리스가 물 없는 같은 컬렉티브입니다.</li>
            <li><strong>날씨와 상관없고 아이에게 맞습니다.</strong> 실내이고, 만 4세 미만은 무료이며, 아이들이 여행에서 사찰보다 더 자주 기억하는 곳입니다.</li>
            <li><strong>당일에 만회할 수 없습니다.</strong> 현장 판매가 없으니 달력이 차면 끝입니다. 잘못되면 그날 오후 일정 전체를 잃는다는 것이, 이곳을 가장 먼저 예약해야 하는 진짜 이유입니다.</li>
          </ul>
          <p className={styles.bodyText}>
            도쿄 일정이 이미 빡빡하거나, 30분 고정 회차가 즉흥적으로 보내고 싶은 하루를 망치거나, 일행 중 바지를
            걷어 올리고 싶은 사람이 아무도 없다면 건너뛰세요. 티켓이 실망스러운 이유는 이 세 가지이고, 어느 것도
            작품 때문이 아닙니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>예약 가능 여부</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 티켓은 매진되나요?</h2>
          <p className={styles.bodyText}>
            개별 입장 시간은 매진되고, 날짜가 차면 기댈 창구가 없습니다. 공식 스토어는 현장 매표 창구나
            자동판매기에서 티켓을 팔지 않는다고 분명히 적고 있습니다. 그래서 플래닛은 도쿄 일주일 일정에서
            마지막이 아니라 가장 먼저 예약할 곳입니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>저희의 예약 시점:</strong> 주말이나 연휴 회차는 2~3주 전, 평일은 며칠 전, 벚꽃철이나 새해 날짜는 가능한 한 일찍. 달력의 움직임을 보고 정한 일정 기준이며 공식 수치가 아닙니다 — 팀랩은 매진 데이터를 공개하지 않습니다.</li>
            <li><strong>현장 티켓 없음:</strong> 공식 정보이며 {CHECKED}에 확인했습니다. 공식 Ticket Store, Lawson Ticket, Seven Ticket, 클룩에서 온라인으로만 판매합니다.</li>
            <li><strong>한 번에 10장:</strong> 스토어는 1회 구매를 10장으로 제한하며 재고에 따라 더 적을 수 있습니다. 20명 이상 단체는 별도 단체 절차로 신청합니다.</li>
            <li><strong>회차를 잘못 예약했다면?</strong> 다시 사지 말고 변경하세요. Entrance Pass는 입장 시간 2시간 전까지 최대 3회, Premium Pass는 당일 08:30까지 변경할 수 있습니다. 환불은 안 되고, 쿠폰 티켓은 변경도 안 됩니다.</li>
            <li><strong>늦는 것은 괜찮지만 날짜를 놓치면 끝:</strong> 공식 FAQ는 당일 운영 시간 안에서 폐관 1시간 전 마지막 입장까지는 늦게 와도 들어갈 수 있다고 적고 있습니다.</li>
          </ul>
          <p className={styles.bodyText}>
            실제로는 날짜, 입장 시간, 판매처 순서로 고르면 됩니다. 그 셋 중 둘이 입장 가능 여부를 정합니다.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>어떤 티켓</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 어떤 티켓을 사야 하나요?</h2>
          <p className={styles.bodyText}>
            한 가지 경우를 빼면 Entrance Pass입니다. 다른 선택지는 ¥12,000 Premium Pass 하나뿐이고, 공식 스토어가
            내세우는 효과는 입구 대기줄 없는 입장 하나입니다. 30~60분의 대기 시간을 줄이는 것이 중요하다면 고려할 만하지만,
            대기 시간이 크게 부담되지 않는다면 ¥8,000의 추가 비용을 낼 필요는 적습니다.
          </p>
          <div className={styles.stepsList}>
            {ticketChoice.map((item, i) => (
              <div key={item.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>입장 시간은:</strong> 하루의 첫 회차들과 마지막 입장 전 한 시간이 긴 입구 대기줄에 걸릴
            가능성이 가장 낮고, 평일이 주말보다 대기줄에서도, 대개는 가격에서도 낫습니다. 본인 날짜에 어느 회차가
            가장 싼지는 알려 드릴 수 없습니다. 팀랩이 회차별 가격표를 공개하지 않기 때문입니다 — 그건 달력이
            알려 주고, 아래 두 판매처 어디서든 한 번만 클릭하면 볼 수 있습니다.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn}>
              팀랩 플래닛 날짜와 회차 보기 →
            </KlookLink>
            <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            클룩은 공식 스토어가 명시한 판매처 중 하나이고, GetYourGuide는 회차가 사라졌을 때 찾아볼 두 번째
            곳입니다. 두 곳 모두 날짜별로 가격이 매겨지니, 이 페이지의 금액을 포함해 대표 금액을 믿기보다 달력을
            여세요.
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>단계별</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 도쿄는 어떻게 예약하나요?</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            회차를 확정할 준비가 됐다면{" "}
            <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL}>
              클룩에서 플래닛 잔여 회차와 가격 보기 →
            </KlookLink>
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>직접 구매</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 공식 티켓 사이트는 어디인가요?</h2>
          <p className={styles.bodyText}>
            미술관 자체 페이지는 <strong>teamlab.art/e/planets</strong>이고, 티켓은{" "}
            <strong>teamLab Planets TOKYO 공식 티켓 스토어</strong>(<strong>teamlabplanets.dmm.com</strong>)에서
            판매합니다. 검색 결과가 아니라 이 스토어가 공식 결제 창구입니다. 이 페이지의 모든 예약 규칙도 이
            스토어의 도움말 페이지에서 {CHECKED}에 읽은 것입니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>그 밖의 공식 판매처:</strong> 스토어는 자신과 함께 Lawson Ticket, Seven Ticket, 클룩을 명시합니다. 목록에 없는 곳은 굳이 쓸 이유가 없는 재판매처입니다.</li>
            <li><strong>스토어의 결제 수단:</strong> DMM을 통한 신용카드, PayPay, UnionPay. 카드가 거절되면 — 여행자가 다른 곳으로 가는 흔한 이유입니다 — 해외 결제가 되는 판매처에서 해결됩니다.</li>
            <li><strong>티켓 수령 방식:</strong> 입장 이틀 전에 QR 티켓 링크가 담긴 이메일이 오고, QR 코드 자체는 입장 당일 00:00부터 표시됩니다.</li>
            <li><strong>직접 구매로 얻지 못하는 것:</strong> 더 낮은 가격. 금액은 날짜와 입장 시간이 정하고, 어느 공식 경로를 쓰든 스토어는 같은 달력으로 가격을 매깁니다.</li>
          </ul>
          <p className={styles.bodyText}>
            정리하면, 카드가 통하고 일본어나 영어 스토어가 불편하지 않다면 직접 사세요. 자기 언어와 통화로 결제하고
            싶다면 명시된 판매처에서 사세요. 둘 다 공식이고, 어느 쪽도 편법이 아닙니다.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>아이와 함께</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛은 아이와 가기 좋은가요?</h2>
          <p className={styles.bodyText}>
            도쿄에서 아이에게 가장 맞는 미술관이자 규칙이 가장 많은 미술관입니다. 만 4세 미만은 무료, 만 4~12세는
            ¥1,500이고, 곳곳의 물은 성인 무릎 높이 — 그러니 아이에게는 더 높이 — 까지 오며, 유모차는 아예 들어갈
            수 없습니다. 아래는 모두 공식 문구이며 {CHECKED}에 읽었습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>나이와 가격:</strong> 만 3세 이하는 티켓 요금이 없고, 만 4~12세는 ¥1,500, 중・고등학생은 ¥2,800입니다. Premium Pass는 만 4세부터 판매합니다.</li>
            <li><strong>보호자:</strong> 어린이 3명당 성인 1명이 동반해야 합니다. 부모 한 명이 어린 아이 넷을 데려가는 예약은 스토어가 받아 주지 않습니다.</li>
            <li><strong>유모차:</strong> 관내 반입 불가. 건물 밖 유모차 보관 공간에 와이어 키로 직접 잠가 두고, 아기띠는 안에서 사용할 수 있습니다.</li>
            <li><strong>기저귀:</strong> 기저귀 교환대는 여자 화장실에 있습니다.</li>
            <li><strong>물:</strong> 성인 무릎 높이이고 경로 전체가 맨발입니다. 여벌 옷을 챙기고, 아이만이 아니라 모두가 젖는다고 생각하세요.</li>
            <li><strong>옷:</strong> 모두 반바지나 걷어 올릴 수 있는 바지를. 곳곳의 바닥이 거울입니다. 무료 대여 반바지는 XS~6L이라 원피스를 입고 온 아이도 문제없습니다.</li>
            <li><strong>짐 보관:</strong> 무료 보관함은 23 × 34 × 37cm — 기저귀 가방은 들어가지만 캐리어는 안 되고, 큰 짐은 유모차 보관 공간으로 갑니다.</li>
          </ul>
          <p className={styles.bodyText}>
            실제로는 이른 회차를 예약하고, 먼저 밥을 먹이고, 오후 일정은 느슨하게 두세요. 어린아이에게 힘든 것은
            작품이 아니라 30~60분의 입구 대기입니다.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>나란히 비교</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 vs 보더리스: 어디를 예약할까?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>아이와 함께이거나 팀랩을 한 번만 갈 거라면 플래닛, 작품 속을 걷기보다 작품을 보고 싶다면
            보더리스입니다.</strong> 도쿄에는 팀랩 미술관이 두 곳 있고 여행자가 엉뚱한 쪽을 예약하는 일이
            흔합니다. 도시의 다른 구역에 있는 별개의 장소이고 티켓도 따로입니다. 도요스의 <strong>플래닛</strong>은
            맨발로 물속을 걷는 곳이고, 아자부다이힐스의 <strong>보더리스</strong>는 50점 넘는 작품이 방 사이를
            옮겨 다니는 지도 없는 미로입니다. 보더리스는 가격, 운영 시간, 예약 방식이 따로이며{" "}
            <Link href="/ko/guides/attractions/teamlab-borderless-tickets">팀랩 보더리스 티켓 가이드</Link>에서
            다룹니다.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "팀랩 플래닛", "팀랩 보더리스"].map((h) => (
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
            플래닛 가격은 {CHECKED}에 공식 티켓 스토어에서, 보더리스 가격과 두 곳의 운영 시간은{" "}
            {BORDERLESS_CHECKED}에 teamlab.art에서 읽었습니다. 두 미술관 모두 성인 티켓을 날짜와 회차별로
            책정하고 달력도 바뀌므로 본인 날짜로 확인하세요. 필요한 시간은 저희의 일정 기준이며 공식 수치가
            아닙니다.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>어디가 맞는가</span>
          <h2 className={styles.sectionTitle}>어느 팀랩을 고를까?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>방문 전 확인</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛에는 무엇을 입고 무엇을 가져가야 하나요?</h2>
          <ul className={styles.bodyList}>
            <li><strong>복장:</strong> 무릎 위로 걷을 수 있는 반바지나 바지. 물이 성인 무릎 높이까지 올라오고 거울 바닥도 있어 미니스커트는 피하는 편이 좋습니다. 무료 대여 반바지는 XS~6L이며 나가기 전에 반납합니다.</li>
            <li><strong>티켓:</strong> 휴대폰이나 태블릿의 QR 전자 티켓, 또는 인쇄본. QR 하나로 구매 인원 전체가 입장합니다. 2일 전에 안내 메일이 오고, QR 코드는 당일 00:00부터 표시됩니다.</li>
            <li><strong>신분증:</strong> 중·고등학생 티켓은 학생증이나 공식 연령 증빙, 장애인 할인 티켓은 인정된 증명서가 필요합니다.</li>
            <li><strong>가방:</strong> 입장 게이트 안쪽에 무료 사물함(23 × 34 × 37 cm)이 있습니다. 더 큰 짐은 건물 밖 유모차 보관소에 와이어 자물쇠로 고정해 둡니다.</li>
            <li><strong>수건:</strong> 가져갈 필요 없습니다. 물 작품 출구에 수건이 준비되어 있습니다.</li>
            <li><strong>아이 동반:</strong> 무료 입장 어린이를 포함해 어린이 3명당 성인 1명 이상이 필요합니다. 갈아입을 옷을 챙기세요. 아기띠는 괜찮지만 유모차는 밖에 둡니다.</li>
            <li><strong>재입장:</strong> 프리미엄 패스를 포함해 어떤 티켓으로도 불가합니다. 입장 후에는 환불되지 않습니다.</li>
          </ul>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            공식 티켓 스토어와 도움말 페이지, 2026년 11월 6일 확인.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>가는 방법</span>
          <h2 className={styles.sectionTitle}>팀랩 플래닛 위치</h2>
          <p className={styles.bodyText}>
            플래닛은 도쿄 동쪽 수변의 도요스, 도요스 시장 옆에 있습니다. 공식 교통 안내는 다음과 같습니다.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>신토요스역</strong>(유리카모메선) — 도보 1분. 가장 쉬운 경로입니다.</li>
            <li><strong>시조마에역</strong> / 도요스 시장 — 도보 5분.</li>
            <li><strong>도요스역</strong>(도쿄메트로 유라쿠초선) — 도보 10분, 라라포트 도요스도 같습니다.</li>
            <li>도쿄역에서 택시로 약 15분, 긴자에서 10분, 하네다 공항에서 고속도로로 약 15분.</li>
            <li><strong>미술관 주차장 없음</strong> — 공식 스토어는 전철이나 버스로 오라고 안내합니다. GINZA SIX와 플래닛 사이에 유료 셔틀버스가 있습니다. 확인일 {CHECKED}.</li>
          </ul>
          <p className={styles.bodyText}>
            <Link href="/guides/transport/ic-cards-japan">스이카나 파스모 IC 카드(영어 가이드)</Link>로 유라쿠초선과
            유리카모메선 구간 모두 탈 수 있고, 도요스가 처음이라면{" "}
            <Link href="/guides/transport/tokyo-transportation">도쿄 교통 가이드(영어)</Link>에서 노선을 설명합니다.
          </p>
        </section>

        <FaqList items={faqItems} />

        <KlookTourPicks
          heading="도요스・오다이바에서 같은 날 예약하기"
          intro="플래닛 회차는 도쿄 동쪽 나들이의 한 시간 반을 채우고, 입구까지 데려다주는 유리카모메선은 오다이바까지 이어집니다. 서브웨이 티켓은 도요스까지의 메트로 구간은 되지만 유리카모메선은 되지 않습니다. 나머지 세 가지는 모두 미술관에서 금방 갈 수 있습니다. 클룩은 자동 가격 조회를 막아 두었으니, 본인 날짜의 금액과 시간은 상품 페이지를 열어 확인하세요."
          tours={sameDayTours}
        />

        <KlookTourPicks
          heading="같은 도시에서 출발하는 1일 투어"
          intro="플래닛은 관내에서 약 한 시간 반이 걸려 보통 다른 일정과 하루를 나눕니다. 여행의 도쿄 일정에 아직 비어 있는 하루가 있다면, 이 두 투어는 도시를 떠났다가 그날 저녁에 돌아옵니다."
          tours={dayTrips}
        />

        <Related
          items={[
            { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka 티켓 2026: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Kyoto 티켓: 가격, 운영 시간, 예약(영어)" },
            { href: "/guides/attractions/teamlab-botanical-garden-osaka-tickets", title: "teamLab Botanical Garden Osaka 티켓: 가격과 운영 시간(영어)" },
            { href: "/ko/guides/attractions/tokyo-skytree-tickets", title: "도쿄 스카이트리 티켓(2026): 요금과 플로어 350·450 선택" },
            { href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets", title: "워너 브라더스 스튜디오 투어 도쿄 티켓(2026): 가격과 예약(영어)" },
            { href: "/ko/guides/attractions/teamlab-borderless-tickets", title: "팀랩 보더리스 티켓(2026): 가격, 지정 시간 입장, 구매 경로" },
            { href: "/ko/guides/attractions/shibuya-sky-tickets", title: "시부야 스카이 예약(2026): 티켓 가격, 추천 시간대, 예약 방법" },
            { href: "/guides/transport/tokyo-transportation", title: "도쿄 교통 가이드(2026): 전철, 지하철, IC 카드(영어)" },
            { href: "/guides/transport/ic-cards-japan", title: "일본 IC 카드 2026: 스이카, 파스모 사용법(영어)" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>팀랩 플래닛을 예약할 준비가 됐나요?</h2>
            <p className={styles.ctaBannerDesc}>
              입장은 30분 단위 회차이고 좋은 회차는 2~3주 전에 사라집니다. 클룩은 팀랩의 공식 티켓 판매 파트너로,
              한국어 화면과 자국 통화로 결제하고 전자 티켓을 휴대폰으로 받습니다.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={PLANETS_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
                팀랩 플래닛 티켓 보기 →
              </KlookLink>
              <GygCompareButton slug={GYG_SLUG} listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
