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
import HotelStayBlock from "../../../../components/HotelStayBlock";
import {
  fujiHakoneDayTour,
  fujiQHighlandAdmission,
  fujiQHighlandPass,
  fujiQHighlandQPack,
  fujikawaguchikoHotels,
  kawaguchikoYamanakakoBusTour,
  mtFujiPass,
  naritaLimousineBus,
  tokyoMtFujiHighwayBus,
  tokyoStayAreas,
  type KlookSameDayCard,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import { klookFor, withKlookLocale } from "../../../../lib/klook-locale";
import { pageUpdated, type PageUpdated } from "../../../../lib/page-dates";
import { articleJsonLd } from "../../../../lib/structured-data";
import { JSONLD_LANG, dateLabel, monthLabel } from "../../../../lib/i18n";
import { EsimCtaBottom, EsimCtaTop } from "../../../../components/EsimCta";

// Mirrors the English page (/guides/attractions/fuji-q-highland-tickets) section by section as of
// 2026-11-28 (task-jtk-20261128-TR02): same sections, tables, FAQ and Klook CTAs in the same
// places. Every figure, date and source is the English page's (fujiq.jp and bus.fujikyu.co.jp,
// read 23 Nov 2026); nothing is added. Title terms: 富士急樂園門票 and 一日券 — the names Taiwan and
// Hong Kong results use (funtime.com.tw, colatour.com.tw, tw.trip.com, matcha-jp.com/tw,
// wingontravel.com). Ride names stay in English apart from the two whose Japanese kanji name is
// the official one (戰慄迷宮, 絕望要塞).

const LOCALE = "zh-tw" as const;
const ROUTE = "/zh-tw/guides/attractions/fuji-q-highland-tickets";
const TITLE = "富士急樂園門票 2026：一日券價格、免費入園與優先券";
const H1 = "富士急樂園門票 2026：票價、免費入園與一日券";
const DESC =
  "富士急樂園門票 2026：免費入園，一日券依日期 ¥6,000–¥7,900，大型雲霄飛車每次 ¥2,000，搭 4 項以上買一日券較划算。";

const LAST_CHECKED = "2026-11-23";
const CHECKED = dateLabel(LAST_CHECKED, LOCALE);

const OFFICIAL = {
  ticket: "https://www.fujiq.jp/en/ticket/",
  rides: "https://www.fujiq.jp/en/ticket/attraction.html",
  priority: "https://www.fujiq.jp/en/ticket/priority.html",
  tokuQ: "https://bus.fujikyu.co.jp/otoku/fujiq-beginner/",
  superTokuQ: "https://www.fujiq.jp/event/tokuQpack_2025.html",
  hours: "https://www.fujiq.jp/en/schedule/index.html",
  hotel: "https://www.fujiq.jp/en/relate/index.html",
  bus: "https://bus.fujikyu.co.jp/highway/detail/id/1",
};

const QPACK_URL = klookFor(fujiQHighlandQPack.url, LOCALE);

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const textLink = { color: "var(--text)", fontWeight: 600 } as const;
const lastChecked = { marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

// Row 1 is the answer; the rest are adult prices as fujiq.jp lists them.
const priceRows = [
  ["該買哪一種", "大型雲霄飛車 4 項以上 → 一日券", "1–2 項 → 免費入園後按次付費；從東京搭巴士 → Toku-Q Pack"],
  ["入園（免費入園券）", "免費（¥0）", "只含入園，所有遊樂設施都在園內售票機付費"],
  ["一日券（Free Pass）", "依日期 ¥6,000 – ¥7,900", "全天無限次搭乘，樂園公告為不適用的設施除外"],
  ["午後券", "依日期 ¥4,100 – ¥6,000", "13:00 起無限次搭乘"],
  ["Sunset★Night Pass", "¥3,700 / ¥4,000", "營業到 19:00 以後的日子 16:00 起可用；只在當天於園內販售"],
  ["湯瑪士樂園券", "依日期 ¥3,000 – ¥3,500", "可搭湯瑪士樂園全部 12 項設施；湯瑪士樂園以外的設施另外付費"],
  ["優先入園一日券", "依每月票價表", "僅限線上購買；可在開園前入園，該時段只有大型雲霄飛車營運；2026 年 12 月 1 日至 2027 年 2 月 5 日不販售"],
  ["虛擬排隊一日券（分身君）", "一日券價格 + ¥2,000", "可用 Q-chan App 為指定設施排隊；數量有限，僅限成人至國小學生"],
  ["大型雲霄飛車搭乘一次", "¥2,000", "Fujiyama、Takabisha、Eejanaika、ZOKKON、Attack on Titan THE RIDE"],
];

const ageRows = [
  ["成人（18–64 歲）", "¥6,000 – ¥7,900", "¥4,100 – ¥6,000"],
  ["國中、高中生", "¥5,500 – ¥7,400", "¥3,800 – ¥5,700"],
  ["國小學生", "¥4,400 – ¥5,100", "¥3,500 – ¥4,200"],
  ["幼兒（1 歲以上）", "¥2,100 – ¥2,600", "¥1,700 – ¥2,100"],
  ["長者（65 歲以上）", "¥2,100 – ¥2,600", "¥1,700 – ¥2,100"],
];

// Pay per ride, from fujiq.jp/en/ticket/attraction.html. Row 1 is the break-even.
const rideRows = [
  ["損益平衡點", "大型雲霄飛車 3 次 = ¥6,000", "等於一日券最便宜日期的票價；大型雲霄飛車 4 次（¥8,000）在任何日期都比一日券貴"],
  ["Fujiyama、Takabisha、Eejanaika、ZOKKON、Attack on Titan THE RIDE", "每次 ¥2,000", "大多數遊客專程來搭的設施"],
  ["Tondemina、Tekkotsubanchou、Nagashimasuka、Fuji Airways、Panic Rock、絕望要塞（Desperation Fortress）、3D Shooting Ride", "每次 ¥1,500", "Tentekomai（同為 ¥1,500）暫停營運至 2027 年 7 月下旬"],
  ["戰慄迷宮（Senritsu Meikyu，廢棄醫院鬼屋）", "每組 ¥4,000 / ¥8,000", "每組最多 4 人；持一日券或午後券 ¥4,000，未持券 ¥8,000；以指定時段票販售"],
  ["湯瑪士樂園設施", "每次 ¥500", "或購買湯瑪士樂園券 ¥3,000 – ¥3,500"],
];

// The Toku-Q Pack, the plain pass and the priority ticket side by side. Row 1 is the answer.
const compareRows = [
  ["該選哪一種", "—", "從東京搭巴士：Toku-Q Pack。已在湖區或搭火車前往：一日券。人多的日子：再加購優先券。"],
  ["Super Toku-Q Pack（新宿高速巴士總站出發）", "成人 ¥11,100、國高中生 ¥10,700、國小學生 ¥7,100", "來回高速巴士 + 一日券 + 一項雲霄飛車優先搭乘一次（9:00–10:00 使用）"],
  ["Toku-Q Pack（其他出發地）", "依出發地而定", "來回直達巴士 + 一日券，從東京、靜岡周邊 30 個以上地點及名古屋、京都、大阪出發"],
  ["只買一日券", "依日期 ¥6,000 – ¥7,900", "無限次搭乘；不含交通"],
  ["優先券（富士急的快速通行）", "依設施與時段而定；各年齡同價", "縮短一項設施的等候時間；仍需一日券或單次搭乘券。3 天前 18:00 起線上販售"],
];

const hoursRows = [
  ["簡答", "9:00 或 10:00 開園，17:00 – 20:00 閉園", "營業時間依日期而異，出發前請查看當月營業時間表"],
  ["2026 年 11 月", "9:00 – 18:00 / 19:00 / 20:00", "11 月 30 日 10:00 – 17:00；11 月沒有休園日"],
  ["2026 年 12 月平日（至 25 日）", "10:00 – 17:00", "12 月 10 日（四）休園"],
  ["2026 年 12 月週末", "9:00 – 18:00", "12 月 5–6 日、12–13 日、19–20 日"],
  ["2026 年 12 月 26 – 30 日", "9:00 – 19:00", "12 月 31 日 9:00 營業至隔天 1:00"],
  ["施工暫停營運的設施", "—", "Tentekomai 2026 年 10 月 5 日至 2027 年 7 月下旬（預定）；摩天輪 2026 年 11 月 9 日至 2027 年 1 月 31 日；Red Tower 暫停中"],
];

// Under the price table: the bus bundle and bus seat, the lakes tour and a night at the lake.
const priceTableCards: KlookSameDayCard[] = [
  {
    label: "富士急樂園 Q Pack（一日券 + 高速巴士）",
    ctaLabel: "在 Klook 查看富士急 Q Pack →",
    url: QPACK_URL,
    kind: "一日券 + 巴士",
    why: "一日券加上新宿或上野出發的來回高速巴士，合在一張電子憑證上，可用中文介面結帳。",
  },
  {
    label: "東京–富士山高速巴士",
    ctaLabel: "查看富士山高速巴士 →",
    url: klookFor(tokyoMtFujiHighwayBus.url, LOCALE),
    kind: "巴士",
    why: "只買座位，適合按次付費或到園內再買一日券的人。這班巴士停靠富士急樂園與河口湖。",
  },
  {
    label: "河口湖與山中湖溫泉一日巴士遊（東京出發）",
    ctaLabel: "查看河口湖巴士一日遊 →",
    url: klookFor(kawaguchikoYamanakakoBusTour.url, LOCALE),
    kind: "一日遊",
    why: "適合同行者中比起搭設施更想看湖景的人：在富士山同一側，跟著導遊搭巴士玩一天。",
  },
  {
    label: "富士河口湖飯店",
    ctaLabel: "查看富士河口湖飯店 →",
    url: klookFor(fujikawaguchikoHotels.url, LOCALE),
    kind: "飯店",
    why: "新宿出發的巴士在樂園之後的下一站就是河口湖站，在湖邊住一晚，就能把一天的樂園行程延長成兩天。",
  },
];

const whoFor = [
  {
    title: "適合買 Toku-Q Pack / Q Pack 的情況",
    desc: "您從東京出發、沒有開車。兩者都把一日券和來回高速巴士合在一起，整天行程只需購票一次而不是三次，而且巴士直接開到樂園自己的巴士站，不必在車站再轉車。",
  },
  {
    title: "只買一日券的情況",
    desc: "您已在富士五湖一帶，或搭火車前往，而且會搭 4 項以上大型雲霄飛車。成人一日券 ¥6,000 至 ¥7,900；大型雲霄飛車每次 ¥2,000，搭 4 次就是 ¥8,000。",
  },
  {
    title: "只入園的情況",
    desc: "您的重點不是遊樂設施。富士急免費入園，可以在園內售票機按設施付費。如果是為了富士山景色、火影忍者與湯瑪士區域，或只想搭一兩項雲霄飛車，這是合適的做法。",
  },
];

const steps = [
  {
    title: "先了解入園免費，一日券是用來搭設施的",
    desc: `富士急官方票價頁面寫明樂園免費入園，搭乘券在園內售票機販售。所以要決定的不是要不要買門票，而是要買一日券還是按次付費。${CHECKED}確認。`,
  },
  {
    title: "查看您出發當天的票價，而不是最低價",
    desc: `票價依日期而定：成人一日券 ¥6,000 至 ¥7,900，13:00 起可用的午後券 ¥4,100 至 ¥6,000。富士急公布每月票價表，編列預算前請先查實際前往日期的價格。${CHECKED}確認。`,
  },
  {
    title: "買一日券之前，先決定交通方式",
    desc: "套票與單買一日券的差別就在這裡。Toku-Q Pack 與 Klook 的 Q Pack 含東京出發的來回高速巴士，單買一日券則不含。如果搭火車前往（JR 到大月，再轉富士急行線到富士急樂園站），只買一日券就夠了。",
  },
  {
    title: "查看當天的營業時間與暫停營運的設施",
    desc: `營業時間依日期而異：12 月大多數平日 10:00 至 17:00，12 月週末 9:00 至 18:00，每月頁面也會列出每天暫停營運的設施。Tentekomai 因施工暫停營運至 2027 年 7 月下旬。${CHECKED}確認。`,
  },
];

// The first five go into FAQPage, as on the English page.
const faqItems: FaqItem[] = [
  {
    q: "2026 年富士急樂園門票多少錢？",
    a: `富士急樂園免費入園，要花錢的是搭設施：一日券 18–64 歲成人 ¥6,000 至 ¥7,900、國高中生 ¥5,500 至 ¥7,400、國小學生 ¥4,400 至 ¥5,100、1 歲以上幼兒與 65 歲以上長者 ¥2,100 至 ¥2,600。13:00 起可用的午後券成人 ¥4,100 至 ¥6,000。大型雲霄飛車搭乘一次 ¥2,000。以上為${CHECKED}於 fujiq.jp 確認的票價。`,
  },
  {
    q: "富士急樂園入園免費嗎？",
    a: `是的。官方票價頁面寫明富士急樂園免費入園（免費入園券 ¥0），遊客在園內售票機購買搭乘券。同行者中不搭設施的人可以免費入園，看看樂園與富士山景色。${CHECKED}確認。`,
  },
  {
    q: "富士急一日券（Free Pass）值得買嗎？還是按次付費比較好？",
    a: `數一數要搭幾項大型雲霄飛車。Fujiyama、Takabisha、Eejanaika、ZOKKON 與 Attack on Titan THE RIDE 每次 ¥2,000，搭 3 項是 ¥6,000，等於一日券的最低價；搭 4 項是 ¥8,000，比任何日期的一日券（¥6,000 至 ¥7,900）都貴。搭 4 項以上就買一日券，只搭一兩項就按次付費。搭乘價格為${CHECKED}於 fujiq.jp 確認。`,
  },
  {
    q: "Toku-Q Pack 是什麼？",
    a: `富士急自家的套票：往返富士急樂園的直達高速巴士加上一日券，從東京、靜岡周邊 30 個以上地點及名古屋、京都、大阪出發，價格依出發地而定。從新宿高速巴士總站（Busta新宿）出發的 Super Toku-Q Pack 另含 9:00 至 10:00 之間一項雲霄飛車的優先搭乘一次，成人 ¥11,100、國高中生 ¥10,700、國小學生 ¥7,100。${CHECKED}於 fujiq.jp 與 bus.fujikyu.co.jp 確認。`,
  },
  {
    q: "富士急樂園有快速通行券嗎？",
    a: `有，富士急稱為優先券（Priority Ticket）。可縮短清單上一項熱門設施的等候時間，價格依設施與時段而定，各年齡同價，從 3 天前 18:00 起線上販售至使用時段前 60 分鐘，數量有限。您仍需另外持有一日券或搭乘券。另一種可在開園前入園的優先入園一日券，2026 年 12 月 1 日至 2027 年 2 月 5 日不販售。${CHECKED}確認。`,
  },
];

const moreFaqItems: FaqItem[] = [
  {
    q: "從新宿怎麼去富士急樂園？",
    a: `從新宿高速巴士總站（Busta新宿）搭富士急高速巴士，到富士急樂園站約 1 小時 40 分，成人 ¥2,200 起（線上購票 ¥2,000）；塞車時會更久。富士急樂園是河口湖站的前一站。Toku-Q Pack 與 Klook 的 Q Pack 都把來回巴士和一日券合在一起。巴士時間為${CHECKED}於富士急巴士網站確認。`,
  },
  {
    q: "富士急樂園門票可以在哪裡事先購買？",
    a: `富士急官方線上售票網站販售一日券、午後券、湯瑪士樂園券與僅限線上的優先入園一日券；Klook 販售一日券與含巴士的 Q Pack。Toku-Q Pack 在富士急官方線上網站與富士急客服中心販售。官方門票購買後不能退票，也不能更改人數或年齡區分。${CHECKED}確認。`,
  },
  {
    q: "富士急樂園的營業時間是幾點？",
    a: `依日期而異。2026 年 11 月 9:00 開園，18:00 至 20:00 之間閉園；12 月大多數平日 10:00 至 17:00、週末 9:00 至 18:00，12 月 10 日休園。富士急會公布每月營業時間表與每天暫停營運的設施。${CHECKED}於 fujiq.jp 確認。`,
  },
  {
    q: "富士急樂園有哪些代表性的雲霄飛車？",
    a: "號稱「King of Coasters」的 Fujiyama、四次元超級雲霄飛車 Eejanaika、號稱最陡的雲霄飛車 Takabisha，以及 ZOKKON，每次都是 ¥2,000。空中雲霄飛車 Tentekomai 因興建新設施，2026 年 10 月 5 日至 2027 年 7 月下旬（預定）暫停營運。園內也有以火影忍者（NARUTO）、湯瑪士小火車與 San-X 角色為主題的區域。",
  },
  {
    q: "在富士急樂園看得到富士山嗎？",
    a: "樂園位於河口湖附近的富士山腳下，天氣晴朗時富士山就在樂園背後。和富士五湖其他地方一樣，能否看到取決於天氣，比起盛夏，涼爽乾燥的季節機會較高。請把它當作挑選晴天預報的理由，而不是保證一定看得到。",
  },
];

const tripPrepItems: KlookTripPrepItem[] = [
  {
    label: "新宿周邊飯店",
    ctaLabel: "在 Klook 查看新宿飯店 →",
    url: klookFor(tokyoStayAreas[0].url, LOCALE),
    why: "往河口湖的高速巴士在新宿上車，住在新宿的話，一早前往樂園的巴士走路就能到巴士站。",
  },
  {
    label: "河口湖與山中湖溫泉一日巴士遊（東京出發）",
    ctaLabel: "查看河口湖巴士一日遊 →",
    url: klookFor(kawaguchikoYamanakakoBusTour.url, LOCALE),
    why: "同一條路線上的湖區，由導遊帶您從東京玩一天；如果湖景和雲霄飛車一樣重要，可以排在樂園前後一天。",
  },
  {
    label: "富士山與箱根一日遊（東京出發）",
    ctaLabel: "查看一日遊 →",
    url: klookFor(fujiHakoneDayTour.url, LOCALE),
    why: "從東京一天看富士山的另一種方式，同一輛巴士也會到箱根，適合同行者中想跳過遊樂設施的人。",
  },
  {
    label: "成田機場利木津巴士",
    ctaLabel: "查看利木津巴士 →",
    url: klookFor(naritaLimousineBus.url, LOCALE),
    why: "可放大件行李、開往東京市中心各站的機場巴士，抵達當天就能直接到之後前往樂園的飯店；請先確認停靠站清單。",
  },
];

const parkPicks = [
  withKlookLocale(fujiQHighlandQPack, LOCALE, {
    title: "富士急樂園 Q Pack（一日券 + 高速巴士）",
    desc: "無限次搭乘的一日券加上新宿或上野出發的來回高速巴士，整天行程只需購票一次",
  }),
  withKlookLocale(fujiQHighlandPass, LOCALE, {
    title: "富士急樂園一日券（Free Pass）",
    desc: "只買一日券，適合自行前往河口湖的人",
  }),
  withKlookLocale(fujiQHighlandAdmission, LOCALE, {
    title: "富士急樂園入園券",
    desc: "只入園、不含一日券，適合為了富士山景色與主題區域前往的人",
  }),
];

const transportPicks = [
  withKlookLocale(tokyoMtFujiHighwayBus, LOCALE, {
    title: "東京–富士山高速巴士",
    desc: "從東京直達河口湖、富士急樂園與富士山站的巴士，購買的是座位而不是旅遊團",
  }),
  withKlookLocale(mtFujiPass, LOCALE, {
    title: "Mt. Fuji Pass（1、2 或 3 日）",
    desc: "富士五湖周邊巴士與電車無限次搭乘，含纜車與遊湖船，適合不跟團的自由行旅客",
  }),
];

const trail: Crumb[] = [...TRAIL_BASE["zh-tw"], { label: "富士急樂園門票" }];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows, boldFirst = false }: { head: string[]; rows: ReactNode[][]; boldFirst?: boolean }) {
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
              <tr key={r} style={boldFirst && r === 0 ? { fontWeight: 700 } : undefined}>
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

const checkedLine = (...urls: string[]) => `最後確認：${LAST_CHECKED}。資料來源：${urls.join("、")}`;

export default function ZhTwFujiQHighlandTicketsPage({ updated }: { updated: PageUpdated }) {
  const updatedLabel = monthLabel(updated.iso, LOCALE);

  return (
    <>
      <Head>
        {seoTags({ route: ROUTE, title: TITLE, desc: DESC })}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated, inLanguage: JSONLD_LANG["zh-tw"] }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(trail, ROUTE) }} />
      </Head>

      <Breadcrumb trail={trail} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{updatedLabel}更新</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            入園免費，您花錢買的是搭乘設施的權利。一日券、把一日券和巴士合在一起的 Toku-Q Pack，或每項雲霄飛車 ¥2,000
            的單次券，哪一種比較便宜，取決於您想搭幾項設施。
          </p>
          <div className={styles.heroBadges}>
            {[`${updatedLabel}更新`, "官方票價", "免費入園"].map((t) => (
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
            <strong>富士急樂園免費入園，一日券（Free Pass）成人依日期 ¥6,000 至 ¥7,900。</strong>
            大型雲霄飛車 Fujiyama、Takabisha、Eejanaika 與 ZOKKON 每次 ¥2,000，所以
            <strong>如果會搭 4 項以上，就買一日券</strong>；只搭一兩項就按次付費。從新宿高速巴士總站（Busta新宿）出發的
            Super Toku-Q Pack，把來回巴士、一日券與一次優先搭乘合在一張票上，成人 ¥11,100。以上為{CHECKED}於 fujiq.jp
            確認的票價。
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>快速解答</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>入園</p>
                <p className={styles.verdictStatValue}>免費</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>一日券（成人）</p>
                <p className={styles.verdictStatValue}>¥6,000 – ¥7,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>大型雲霄飛車一次</p>
                <p className={styles.verdictStatValue}>¥2,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>從東京出發</p>
                <p className={styles.verdictStatValue}>Toku-Q / Q Pack（一日券 + 巴士）</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>簡單說：</strong>不用買入園門票，入園是免費的。會搭 4 項以上大型雲霄飛車就買一日券，午餐後才到就買午後券，或什麼都不買，在園內售票機按次付費。從東京出發又沒有開車，請購買附來回巴士的一日券：富士急的 Toku-Q Pack 或
              Klook 的 Q Pack。以上為{CHECKED}於 fujiq.jp 確認的票價。
            </p>
            <KlookLink href={QPACK_URL} target="_blank" rel={KLOOK_REL} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              在 Klook 查看富士急 Q Pack →
            </KlookLink>
          </div>
        </div>

        <HotelStayBlock city="kawaguchiko" areas={["fujiQ", "kawaguchikoStation", "lakeKawaguchi"]} />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>票價</span>
          <h2 className={styles.sectionTitle}>富士急樂園門票多少錢？</h2>
          <p className={styles.bodyText}>
            入園免費；一日券成人依日期 ¥6,000 至 ¥7,900，大型雲霄飛車每次 ¥2,000。富士急販售的所有票種與內容如下：
          </p>
          <Table head={["票種", "成人票價", "內容"]} rows={priceRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.ticket, OFFICIAL.rides)}
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            各年齡的一日券與午後券票價
          </h3>
          <Table head={["年齡區分", "一日券", "午後券（13:00 起）"]} rows={ageRows} />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            樂園依日期定價並公布每月票價表，請查看您前往日期的價格。幼兒可在線上購買 QR 碼門票，或當天在售票櫃檯購買。
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.ticket)}
          </p>
        </section>

        <KlookSameDayCards
          heading="安排樂園這一天：附巴士的一日券、只買巴士、湖區一日遊，或在湖邊住一晚"
          cards={priceTableCards}
          footnote={
            <>
              想找客房看得到富士山的湖畔旅館，請看{" "}
              <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" hrefLang="en">
                河口湖富士山景觀旅館（英文）
              </Link>
              。
            </>
          }
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>入園</span>
          <h2 className={styles.sectionTitle}>富士急入園免費嗎？</h2>
          <p className={styles.bodyText}>
            是的。富士急樂園官方票價頁面寫明樂園免費入園：免費入園券 ¥0，可在售票櫃檯或線上申請，之後每項設施都用園內售票機購買的搭乘券付費，或使用一日券搭乘。這在日本大型樂園中很少見，對成員喜好不同的團體很實用：不搭設施的人可以免費入園，欣賞富士山景色以及火影忍者、湯瑪士樂園與
            San-X 區域。{CHECKED}確認。
          </p>
          <p className={styles.bodyText}>
            樂園的主角是雲霄飛車：號稱「King of Coasters」的 Fujiyama、四次元的 Eejanaika、陡降的 Takabisha，以及
            ZOKKON。空中雲霄飛車 Tentekomai 因興建新設施，2026 年 10 月 5 日至 2027 年 7 月下旬（預定）暫停營運。
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>一日券或按次付費</span>
          <h2 className={styles.sectionTitle}>富士急一日券與按次付費，哪個比較便宜？</h2>
          <p className={styles.bodyText}>
            從第 4 項大型雲霄飛車起，一日券比較便宜：4 次 ¥2,000 共 ¥8,000，高於一日券最高價 ¥7,900；3 次是 ¥6,000，等於最低價。官方設施價目表的搭乘價格如下：
          </p>
          <Table head={["設施", "每次價格", "備註"]} rows={rideRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.rides)}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Toku-Q Pack</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack 是什麼？</h2>
          <p className={styles.bodyText}>
            Toku-Q Pack 是富士急的套票，內容是往返富士急樂園的直達高速巴士加上一日券，價格依出發地而定。從新宿高速巴士總站出發的
            Super Toku-Q Pack 另含 9:00 至 10:00 之間一項雲霄飛車的優先搭乘一次，成人 ¥11,100。比較一下：新宿巴士線上購票（單程
            ¥2,000）再另外買一日券，依日期合計 ¥10,000 至 ¥11,900。
          </p>
          <Table head={["選項", "價格", "內容"]} rows={compareRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.superTokuQ, OFFICIAL.tokuQ, OFFICIAL.priority, OFFICIAL.bus)}
          </p>
          <p className={styles.bodyText}>
            優先券是樂園的快速通行券：可縮短富士急清單上一項設施（包括 Fujiyama、ZOKKON、Takabisha 與 Eejanaika）的等候時間，各年齡同價，數量有限，每次最多購買
            10 張；從 3 天前 18:00 起線上販售至使用時段前 60 分鐘，或當天在各設施旁的售票機購買。優先券不能取代一日券，您仍需一日券或搭乘券。{CHECKED}確認。
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>票種選擇</span>
          <h2 className={styles.sectionTitle}>Toku-Q Pack、一日券，還是什麼都不買？</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>事先購票</span>
          <h2 className={styles.sectionTitle}>富士急門票可以在哪裡事先購買？</h2>
          <p className={styles.bodyText}>
            兩個地方：富士急官方線上售票網站或 Klook。官方網站販售指定日期的一日券、午後券與湯瑪士樂園券，另有僅限線上的優先入園一日券與虛擬排隊一日券（販售至前一天）。Toku-Q
            Pack 在同一個官方網站或富士急客服中心販售。官方門票購買後不能退票，也不能更改人數或年齡區分；Sunset★Night Pass
            只在當天 16:00 起於園內販售。{CHECKED}確認。
          </p>
          <p className={styles.bodyText}>
            Klook 販售一日券、入園券與 Q Pack（一日券加上新宿或上野出發的來回高速巴士），可用中文介面結帳。這一天也能排進東京一週的行程：
            <Link href="/guides/attractions/tokyo-7-day-itinerary" hrefLang="en">
              東京 7 天行程（英文）
            </Link>
            把富士山之旅排在第 6 天，
            <Link href="/guides/attractions/japan-attraction-ticket-prices" hrefLang="en">
              日本景點門票價格表（英文）
            </Link>
            則把富士急和其他大型樂園放在一起比較。
          </p>
        </section>

        <KlookTourPicks
          heading="Klook 上的三種富士急商品，依推薦順序"
          intro="三種都是同一座樂園，差別在於價格是否含交通與遊樂設施。從東京出發選 Q Pack，搭火車前往選一日券，如果是為了景色和主題區域而不是雲霄飛車，就選入園券。"
          tours={parkPicks}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>住宿</span>
          <h2 className={styles.sectionTitle}>Highland Resort Hotel &amp; Spa 值得住嗎？</h2>
          <p className={styles.bodyText}>
            如果您想在當日遊客抵達前就搭上雲霄飛車，就值得住。Highland Resort Hotel &amp; Spa 是富士急的官方飯店，與樂園直接相連，正前方就是富士山。富士急列出官方飯店住客的兩項優惠：優先入園（該時段只有部分設施營運），以及住宿期間代為保管行李。高速巴士站就在飯店停車場內，飯店有湯瑪士與火影忍者主題客房，角落小夥伴主題客房於
            11 月 28 日開幕。{CHECKED}確認。
          </p>
          <p className={styles.bodyText}>
            如果景色與溫泉比一早搭設施更重要，再往前一站就是河口湖，
            <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" hrefLang="en">
              河口湖富士山景觀旅館（英文）
            </Link>
            比較了那裡的 6 間旅館。帶孩子旅行的話，
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" hrefLang="en">
              東京親子行程（英文）
            </Link>
            說明了一日出遊可以排在迪士尼與室內行程之間的哪裡。
          </p>
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.hotel)}
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>營業時間</span>
          <h2 className={styles.sectionTitle}>富士急樂園的營業時間是幾點？</h2>
          <p className={styles.bodyText}>
            富士急依日期在 9:00 或 10:00 開園，17:00 至 20:00 之間閉園，偶爾也有休園日，2026 年是 12 月 10 日。
          </p>
          <Table head={["時期", "營業時間", "備註"]} rows={hoursRows} boldFirst />
          <p className={styles.bodyText} style={lastChecked}>
            {checkedLine(OFFICIAL.hours)}
          </p>
        </section>

        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>步驟</span>
          <h2 className={styles.sectionTitle}>富士急樂園門票購票步驟</h2>
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
        </section>

        <BookingEsimCard lead="富士急門票買好了？出發前先準備好行動數據。" />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>交通</span>
          <h2 className={styles.sectionTitle}>從東京怎麼去富士急樂園？</h2>
          <p className={styles.bodyText}>
            從新宿高速巴士總站（Busta新宿）搭富士急高速巴士，到富士急樂園站約 1 小時 40 分，成人 ¥2,200 起（線上購票
            ¥2,000），塞車時會更久。高速巴士的終點是樂園旁 Highland Resort Hotel &amp; Spa 停車場內的巴士站。搭火車的話，先搭
            JR 到大月，再轉富士急行線到富士急樂園站。{checkedLine(OFFICIAL.bus)}
          </p>
          <p className={styles.bodyText}>
            正因為有這個差別，才會有含巴士的套票，而一日往返通常也是套票比較划算：巴士在樂園門口下車、回程也從那裡上車，不必配合大月的轉車時間。如果想保留彈性，
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" hrefLang="en" style={textLink}>
              富士山自由行一日遊（英文）
            </Link>
            介紹不含樂園門票的同一條路線，
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" hrefLang="en" style={textLink}>
              東京出發河口湖一日遊（英文）
            </Link>
            介紹再往前一站的湖區，
            <Link href="/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo" style={textLink}>
              東京出發富士山一日遊比較
            </Link>
            則適合同行者中想去五合目的人。
          </p>
        </section>

        <KlookTripPrep
          label="同一天一起預訂"
          heading="富士急這一天，還值得預訂什麼？"
          intro="樂園門票決定了這一天的行程，出發的住宿地點與樂園兩側的湖區，是這趟旅程需要的其他預訂。"
          items={tripPrepItems}
        />

        <FaqList items={[...faqItems, ...moreFaqItems]} heading="富士急樂園常見問題" />

        <KlookTourPicks
          heading="不買 Q Pack 的交通方式"
          intro="如果您已經有一日券，或比起雲霄飛車更想遊覽富士五湖，這兩項就能解決交通：高速巴士停靠富士急樂園與河口湖，周遊券則可在抵達後搭乘當地巴士與電車。"
          tours={transportPicks}
        />

        <p className={styles.bodyText}>
          富士急巴士的出發地新宿，也是
          <Link href="/guides/attractions/where-to-stay-in-tokyo" hrefLang="en">
            東京住宿區域攻略（英文）
          </Link>
          推薦給第一次去東京旅客的住宿區域。
        </p>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            還想多看看樂園周邊的湖區嗎？富士急的
            <Link href="/guides/transport/mt-fuji-pass" hrefLang="en" style={linkStyle}>
              Mt. Fuji Pass（英文）
            </Link>
            可在 1 至 3 天內搭乘富士山周邊的巴士與電車。
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            附近的河口湖畔有來回 ¥1,200 的
            <Link href="/guides/attractions/mt-fuji-panoramic-ropeway-tickets" hrefLang="en" style={linkStyle}>
              富士山全景纜車（英文）
            </Link>
            ，以及平日 ¥1,800 的
            <Link href="/guides/attractions/kawaguchiko-music-forest-museum-tickets" hrefLang="en" style={linkStyle}>
              河口湖音樂盒之森美術館（英文）
            </Link>
            。
          </p>
        </section>
        <EsimCtaBottom />

        <Related
          items={[
            { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "東京出發河口湖一日遊（2026）：路線、車資與一天能玩什麼（英文）" },
            { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "東京出發富士山自由行一日遊（2026）（英文）" },
            { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "東京出發富士山一日遊比較" },
            { href: "/zh-tw/guides/attractions/tokyo-disney-tickets", title: "東京迪士尼門票：票價與購票方式" },
            { href: "/zh-tw/guides/attractions/usj-tickets-express-pass", title: "日本環球影城門票與快速通關" },
            { href: "/guides/attractions/sanrio-puroland-tickets", title: "三麗鷗彩虹樂園門票（2026）：票價與購票方式（英文）" },
            { href: "/guides/attractions/tokyo-tower-tickets", title: "東京鐵塔門票（2026）：票價與購票方式（英文）" },
            { href: "/zh-tw/guides/attractions/things-to-do-tokyo", title: "東京必去景點：哪些要先訂、哪些直接去" },
            { href: "/zh-tw/guides/attractions", title: "更多日本景點門票攻略" },
          ]}
        />

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>整天行程一次購票</h2>
            <p className={styles.ctaBannerDesc}>
              Q Pack 把一日券與新宿或上野出發的來回高速巴士合在一張電子憑證上，可用中文介面結帳，不必分別準備巴士與一日券就能一日往返。
            </p>
            <KlookLink href={QPACK_URL} target="_blank" rel={KLOOK_REL} className={styles.ctaBannerBtn}>
              查看富士急 Q Pack →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
