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
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  lakeShikotsuIceFestivalShuttleBus,
  newChitoseAirportTransfers,
  noboribetsuToyaOtaruDayTour,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowFestivalStayAreas,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
  type KlookTripPrepItem,
} from "../../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  lakeShikotsuTomamuIceVillageDayTour,
} from "../../../../lib/klook-links-winter-hokkaido";
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

// Mirrors the English guide (pages/guides/attractions/sapporo-snow-festival-tours.tsx) as of 6 November 2026,
// section for section. Every figure comes from that page; none was added for this edition.

const LOCALE = "zh-cn" as const;
const ROUTE = "/zh-cn/guides/attractions/sapporo-snow-festival-tours";
const trail: Crumb[] = [...TRAIL_BASE[LOCALE], { label: "札幌雪祭" }];

const OWN_ISO = "2026-10-30";
const OWN = dateLabel(OWN_ISO, LOCALE);

const SEASON_ISO = "2026-11-06";
const SEASON = dateLabel(SEASON_ISO, LOCALE);

const JMA_CHECKED = dateLabel("2026-10-28", LOCALE);

const FEB_MEAN = "−2.7°C";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 厘米";
const AIRPORT_FARE = "¥1,230";
const SUBWAY_FARE = "¥210";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const SHUTTLE_FARE = "¥200";

const siteRows = [
  {
    site: "大通会场（大通会場）",
    where: "大通公园西 1 丁目到西 11 丁目，从札幌电视塔脚下开始，十一个街区连成一条直线",
    when: "雪祭期间随时可看；雪雕亮灯到 22:00",
    cost: "免费",
    what: "大型雪雕、市民雪雕比赛和美食摊位。一般说的雪祭就是指这个会场",
  },
  {
    site: "薄野会场（すすきの会場）",
    where: "站前通南 4 条到南 6 条，穿过夜生活区的主干道",
    when: "随时可看；亮灯到 23:00，最后一天到 22:00",
    cost: "免费",
    what: "这里是冰雕而不是雪雕，就立在酒吧之间的街边。三个会场中结束最晚，从大通走一小段或坐一站地铁就到",
  },
  {
    site: "Tsudome 会场（つどーむ会場）",
    where: "札幌市体育交流设施「つどーむ」，位于地铁东丰线东北端",
    when: "仅 10:00–16:00。人多时体验项目可能提前停止受理",
    cost: "免费入场；部分体验项目收费",
    what: "雪上滑梯、雪上漂流等亲子体验，是家庭会场，也是唯一有闭场时间的会场",
  },
];

const tourRows = [
  {
    tour: "小樽、白色恋人公园与雪上乐园一日游",
    adds: "坐快速 Airport 往西 33 到 41 分钟的运河小镇、蒸汽时钟和玩雪，一次订好一整天",
    fits: "一整天。请搭配雪祭的晚上，不要再排另一个一日游",
    note: "小樽 2027 年 2 月 6–13 日有自己的小樽雪灯之路，所以雪祭周比 12 月更适合去",
  },
  {
    tour: "旭山动物园、美瑛青池与精灵露台一日游",
    adds: "在企鹅散步的季节去旭川动物园，再加上美瑛；冬季可加购雪地摩托",
    fits: "一整天的长途行程，是这几项中离札幌最远的",
    note: "企鹅散步需要雪道，2026-27 的开始日期尚未公布，不过 2 月落在动物园所说的 12 月下旬到 3 月中旬之内",
  },
  {
    tour: "支笏湖冰涛节：半日游、接驳座位或 Tomamu 一日游",
    adds: "北海道这一侧另一个 2 月冰雪活动，2027 年 1 月 30 日到 2 月 23 日，16:30 到 20:00 亮灯",
    fits: "半天或一个晚上，正好适合雪祭当天空出来的下午",
    note: "有三种卖法：导览半日游、单纯的往返巴士座位，以及结合 Tomamu 冰之村的十小时行程。门票平日 ¥1,000、周末和节假日 ¥3,000，Tomamu 商品注明不含门票，其他请自行确认",
  },
  {
    tour: "定山溪：温泉一日游或头大佛一日游",
    adds: "市区以南不到一小时的峡谷温泉乡，或同一趟加上安藤忠雄的头大佛和白色恋人公园",
    fits: "根据商品不同，半天或一整天",
    note: "雪祭会场都在户外，这是解决这趟旅行真正问题的最佳答案：让一天的中段待在室内",
  },
  {
    tour: "Wonderland Sapporo 雪上乐园半日游",
    adds: "市郊的雪上乐园，含酒店接送和成吉思汗烤肉",
    fits: "半天",
    note: "这款商品专为不带雪具的游客设计，雪祭游客大多如此",
  },
  {
    tour: "登别、洞爷湖与小樽一日游",
    adds: "往南往西的全景路线：温泉谷、火山口湖和运河小镇一天走完",
    fits: "一整天的长途行程，适合多出一天的旅行",
    note: "四天以上的旅行值得。三天的话，会赔掉一个回不来的雪祭夜晚",
  },
];

const transportRows = [
  {
    leg: "新千岁机场 → 札幌，快速 Airport",
    time: "特别快速最快 33 分钟，快速 37 分钟",
    fare: `成人 ${AIRPORT_FARE}；uシート对号座加 ¥1,000，或无票预约 ¥800`,
    note: `JR 北海道白天每小时六班：特别快速一班、快速三班、区间快速两班。核查日期：${OWN}。`,
  },
  {
    leg: "新千岁机场 → 札幌，预约接送",
    time: "走公路，2 月受天气影响",
    fare: "按车型和日期。Klook 拦截自动查价，请打开页面查看",
    note: "Klook 的新千岁机场接送页，条款按车型而定，所以要在出发前预订。",
  },
  {
    leg: "札幌站 → 大通",
    time: "地铁一站，或步行约 10 分钟，大多在地下",
    fare: `单区成人 ${SUBWAY_FARE}，儿童 ¥110`,
    note: `两站之间的地下通道，正是 2 月住札幌站也方便的原因。票价核查日期：${OWN}。`,
  },
  {
    leg: "大通 → 薄野",
    time: "地铁南北线一站，或走几个街区",
    fare: `成人 ${SUBWAY_FARE}`,
    note: "两个会场很近，多数人步行，薄野的灯比大通晚一小时熄灭。",
  },
  {
    leg: "札幌 → Tsudome 会场",
    time: "地铁东丰线到荣町，再坐接驳巴士",
    fare: `2026 年接驳车成人单程 ${SHUTTLE_FARE}，仅收现金；小学生以下、65 岁以上和残障人士免费`,
    note: "以上是执行委员会公告的 2026 年安排，2027 年接驳车尚未公布。地铁转接驳没有折扣，会场 16:00 关闭。",
  },
  {
    leg: "地铁一日券",
    time: "一个日历日",
    fare: `平日成人 ${SUBWAY_DAY_PASS}、儿童 ¥420；周末、节假日和 12 月 29 日到 1 月 3 日 ${DONICHIKA} 和 ¥260`,
    note: `札幌市交通局官方票价，核查日期：${OWN}。按单区 ${SUBWAY_FARE} 计算，周末券坐三次、平日券坐四次就回本。`,
  },
];

const bookingWindow = [
  {
    title: "现在就订，如果你 2027 年 2 月要去：酒店",
    desc: "执行委员会在 2026 年 2 月 11 日第 76 届闭幕公告中就公布了日期。同一座城市八个固定的夜晚，一年前就知道，自然人人都提前订。官方没有公布入住率，所以我们也不写，但这是雪祭旅行中唯一没有备选的部分。",
  },
  {
    title: "出发前：机场交通与北海道周游券",
    desc: "电车 ¥1,230，不用预订；要在出发前订的是公路接送。铁路周游券只有离开市区去小樽、旭川或登别才划算，请先拿 ¥11,000 的 4 日札幌–富良野区域周游券和单程票比较。",
  },
  {
    title: "12 月 31 日前：季节限定一日游",
    desc: "支笏湖冰涛节半日游和雪上乐园都是季节商品，旭山动物园行程则要看企鹅季。它们正好和雪祭同时段，所以到达前先订好一个，趁还能更改时看清楚取消条款。",
  },
  {
    title: "完全不用订：雪祭本身",
    desc: "根据执行委员会的常见问题，三个会场全部免费。大通和薄野是随时都能进入的公园和街道，Tsudome 免费入场，内部部分体验收费。没有门票、没有时段，也没有什么要预订。",
  },
];

const faqItems = [
  {
    q: "2027 年札幌雪祭是什么时候？",
    a: `2027 年 2 月 4 日到 11 日，共八天。执行委员会公告写着「2027年2月4日（木）から11日（木・祝）の8日間」，所以是确定日期而不是推测，且覆盖三个会场。相关活动 さっぽろスノースポーツパーク2027 接着在 2027 年 2 月 12 到 14 日举行。Tsudome 会场是唯一有闭场时间的会场，10:00 到 16:00。核查日期：${OWN}。执行委员会每届闭幕时公布下一年日期，2027 年的日期在 2026 年 2 月 11 日公布，想查 2028 年的话，请先看那份公告。`,
  },
  {
    q: "札幌雪祭免费吗？",
    a: `免费。执行委员会的常见问题只写了「全会場無料です」（所有会场免费），雪祭没有任何部分需要门票。${OWN} 核查的实际情况：大通会场是公园，八天内随时可看，雪雕亮灯到 22:00。薄野会场是街道，随时可看，亮灯到 23:00，最后一天到 22:00。Tsudome 会场免费入场，10:00 到 16:00 开放，内部部分活动另收费，人多时受理可能提前结束。所以雪祭旅行的花费在酒店、机票和一日游，不在雪祭本身。`,
  },
  {
    q: "札幌雪祭需要跟团吗？",
    a: `不需要，而且任何打着雪祭团旗号的商品都要小心。三个会场都免费、可直接入场，大通和薄野是相隔几个街区的公园和街道，Tsudome 则是坐地铁再加一小段接驳。没有队伍可以跳过，也没有门票要先拿。这趟旅行真正用得上行程的是每天的另一半：会场全在户外，而 2 月平均最高气温是 ${FEB_MAX}，多数人白天想去室内或郊外，晚上再看亮灯的大通。这一页的商品正是这些：小樽运河、旭山动物园冬季行程、支笏湖冰涛节夜晚、定山溪温泉半日游、雪上乐园。没有一个是雪祭团，因为根本不存在，也不需要。`,
  },
  {
    q: "雪祭期间住哪里好？",
    a: `札幌站或薄野，差别在你看重晚上的哪一段。札幌站距离大通一站地铁，大多可走地下，2 月平均最高气温 ${FEB_MAX} 时，这比任何景观都重要，而且新千岁来的快速 Airport 就停这里。薄野的门外就是冰雕会场：会场沿站前通南 4 条到南 6 条，亮灯到 23:00，晚场看完走回去就好，不用赶末班车。如果札幌订满，小樽是合理的备选：按 JR 北海道的数字，坐快速 Airport 33 到 41 分钟、¥800，同一时期还有小樽雪灯之路。不管选哪里，日期从 2026 年 2 月就公开了，这是最该先确定的预订。`,
  },
  {
    q: "2 月的札幌有多冷，穿什么？",
    a: `冷到会改变行李内容，但还不到探险级别。根据日本气象厅 1991–2020 年札幌平年值，2 月月均气温 ${FEB_MEAN}，平均最高 ${FEB_MAX}，平均最低 ${FEB_MIN}，全月降雪 ${FEB_SNOW}。核查日期：${JMA_CHECKED}。由此可知三件事。最高气温约在冰点，雪雕不会融化，地面也不湿，而是压实又滑，所以防滑的鞋最重要。建筑、商店、电车和地下通道暖气都很足，能脱的多层穿搭比一件厚外套好。雪雕天黑后最美，这时气温接近最低而非平均，所以大通的那个夜晚是整趟最冷的时候，手套、帽子和遮脸的衣物都不能省。`,
  },
  {
    q: "新千岁机场怎么到札幌？",
    a: `坐快速 Airport，33 到 37 分钟，${AIRPORT_FARE}。JR 北海道的数字（核查日期：${OWN}）：特别快速最快 33 分钟，快速 37 分钟，白天每小时六班（特别快速一班、快速三班、区间快速两班）。4 号车是 uシート对号座，票价外加 ¥1,000，无票预约 ¥800，2 月普通车厢常被雪具塞满，所以值得。另一个选择是预约公路接送，对雪祭旅行有个实际好处：直接到酒店门口，不用拖着行李在雪中出车站。要在出发前购买，条款按车型列在 Klook 页面。`,
  },
  {
    q: "三个会场之间怎么移动？",
    a: `大通和薄野步行，Tsudome 坐地铁和接驳车。大通和薄野在同一条路上相隔几个街区，天气不好就坐一站南北线；札幌站在另一方向一站，大多有地下通道。地铁单区成人 ${SUBWAY_FARE}、儿童 ¥110。Tsudome 是例外：坐东丰线到荣町再换接驳巴士，2026 年成人单程 ${SHUTTLE_FARE}，仅收现金，小学生以下、65 岁以上和残障人士免费，地铁换乘没有折扣。2027 年接驳车尚未公布。一天坐三趟以上地铁，交通局一日券平日 ${SUBWAY_DAY_PASS}，周末和节假日 ${DONICHIKA}。除 2026 年公告的接驳车外，所有票价核查日期：${OWN}。`,
  },
  {
    q: "札幌雪祭要玩几天？",
    a: `至少三晚，四晚更好。雪祭本身是两个半天：下午在大通看雕刻细节，晚上在大通和薄野看亮灯，同样的雪雕却是完全不同的感受。Tsudome 是第三个半天，16:00 关闭又最远，带小孩才值得去。其余的日子留给只有这个季节才卖的行程：小樽运河、旭山动物园冬季团、支笏湖冰涛节夜晚、定山溪温泉下午。两晚也行，但有一晚要花在机场交通上；五晚可以加上登别或洞爷湖，又不必放弃亮灯的夜晚。`,
  },
  {
    q: "雪祭适合带小孩吗？",
    a: `Tsudome 会场就是为孩子设计的，也是有规则的会场。免费入场，10:00 到 16:00 开放，重点是雪上滑梯和雪上漂流，但部分项目收费，常见问题也提醒人多时受理可能在 16:00 前截止，所以请排上午而不是下午。大通和薄野免费、随时可看，带小孩也没问题，只是最好看的时段是天黑后最冷的时候。两点费用提醒：2026 年 Tsudome 接驳车小学生以下免费；儿童地铁一日券平日 ¥420、周末 ¥260，单区是 ¥110。`,
  },
  {
    q: "雪祭旅行值得买 JR 北海道周游券吗？",
    a: `只有离开札幌才值得。按 JR 北海道的数字，机场段单程 ${AIRPORT_FARE}，往返约 ¥2,460，远远不到周游券的价格。要把小樽、旭川或登别也当成自己坐车的行程，而不是订好的巴士团，周游券才开始回本。留在市区、订两个导览团的旅行完全用不到：导览团本身含交通，市区内只有交通局平日 ${SUBWAY_DAY_PASS}、周末 ${DONICHIKA} 的地铁一日券有用。购买前请用自己的路段算一次，这就是全部方法，JR Pass 攻略也用同样方式计算全国版。`,
  },
  {
    q: "雪祭周北海道还有什么活动？",
    a: `有三项，日期都已公布。执行委员会公告新增 さっぽろスノースポーツパーク2027，在雪祭闭幕后的 2027 年 2 月 12 到 14 日于大和房屋 Premist 巨蛋举行，八天中较晚到达的行程可以两者都看。支笏湖冰涛节根据主办方官网为 2027 年 1 月 30 日到 2 月 23 日，10:00 到 20:00 开放，16:30 起亮灯，初中以上平日 ¥1,000、周末和节假日 ¥3,000，以下免费。所以 2 月 11 日（周四，节假日）是 ¥3,000。主办方表示日期可能因天气变动。第三项是小樽雪灯之路，根据小樽观光协会页面为 2027 年 2 月 6 到 13 日，一样往西 33 到 41 分钟；时间和会场待官方公布。以上均于 ${SEASON} 核查。`,
  },
];

const festivalSameTrip: KlookTripPrepItem[] = [
  {
    label: "Klook 日本 eSIM",
    ctaLabel: "在 Klook 查看 eSIM →",
    url: klookFor(klookEsim.url, LOCALE),
    why: "三个户外会场、2027 年时刻表尚未公布的 Tsudome 接驳车，再加上平均最高气温 0.4°C 的一个月：所有会场公告和天气变化都会发到手机，不会发到柜台。",
  },
  {
    label: "新千岁机场接送（包车与拼车）",
    ctaLabel: "查看新千岁接送 →",
    url: klookFor(newChitoseAirportTransfers.url, LOCALE),
    why: "2 月带行李时，快速 Airport 以外的选择：直接到酒店门口，不用站在雪中的车站，航班晚到或住薄野时最有用。",
  },
  {
    label: "北海道札幌–富良野区域周游券（4 天）",
    ctaLabel: "查看区域周游券 →",
    url: klookFor(sapporoFuranoAreaPass.url, LOCALE),
    why: "只有坐电车离开市区才需要。根据 JR 北海道页面预购 ¥11,000，覆盖新千岁、小樽和旭川，而机场往返只要 ¥2,460。留在札幌并订导览团的旅行用不到。",
  },
  {
    label: "札幌站周边酒店",
    ctaLabel: "在 Klook 查看札幌酒店 →",
    url: klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE),
    why: "日期从 2026 年 2 月 11 日就公开了，所以这八晚的房间是最该先确定的预订，也是本页无法标价的项目。",
  },
];

const TITLE = "札幌雪祭（2027）：2/4–11 三会场免费，该订什么";
const DESC =
  "札幌雪祭行程怎么排：第 77 届于 2027 年 2 月 4–11 日举行，三个会场都免费，值得预订的是酒店和周边一日游。";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function SapporoSnowFestivalToursPage({ updated }: { updated: PageUpdated }) {
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
更新于 {monthLabel(updated.iso, LOCALE)}
</p>
          <h1 className={styles.heroTitle}>
札幌雪祭行程（2027）：<br />日期、免费会场与该订什么
</h1>
          <p className={styles.heroSubtitle}>
八天、三个会场、不用门票。值得订的是雪祭前后的行程，而酒店是唯一没有备选的部分。
</p>
          <div className={styles.heroBadges}>
            {[`更新于 ${monthLabel(updated.iso, LOCALE)}`, "执行委员会公布的 2027 日期", "三个会场全免费", "票价与时间，附核查日期"].map((t) => (
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
          heading={"2027 年 2 月札幌雪祭该订哪些行程？"}
          checkedIso={SEASON_ISO}
          deadline={
            <>
现在就订酒店：雪祭的八天从 2026 年 2 月 11 日就确定了，这是旅行中唯一没有备选的部分。一日游请在 12 月 31 日前订好，趁还能看清取消条款、改变主意。
</>
          }
          tours={[
            {
              title: "小樽、白色恋人公园与雪上乐园一日游",
              url: klookFor(otaruSnowParkDayTour.url, LOCALE),
              price: "约 US$65–76",
              duration: "一整天",
              departs: "札幌",
            },
            {
              title: "札幌出发旭山动物园、美瑛青池与精灵露台一日游",
              url: klookFor(asahiyamaBieiHighlightsTour.url, LOCALE),
              price: "约 US$55 起",
              duration: "一整天",
              departs: "札幌",
            },
            {
              title: "支笏湖冰涛节与 Tomamu 冰之村一日游",
              url: klookFor(lakeShikotsuTomamuIceVillageDayTour.url, LOCALE),
              price: "约 US$103 起",
              duration: "10 小时",
              departs: "札幌",
            },
          ]}
        />

                <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>
快速解答
</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
时间
</p>
                <p className={styles.verdictStatValue}>
2027 年 2 月 4–11 日，共八天
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
地点
</p>
                <p className={styles.verdictStatValue}>
大通、薄野和 Tsudome
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
门票
</p>
                <p className={styles.verdictStatValue}>
三个会场全免费
</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>
需要跟团吗？
</p>
                <p className={styles.verdictStatValue}>
不用，订酒店和一日游就好
</p>
              </div>
            </div>
                        <p className={styles.verdictText}>
想找<strong>札幌雪祭行程</strong>的话，首先要知道你并不需要跟团。<strong>第 77 届札幌雪祭于 2027 年 2 月 4 日到 11 日举行</strong>，共八天，分三个会场：<strong>大通公园西 1 到西 11 丁目</strong>、<strong>薄野站前通南 4 到南 6 条</strong>，以及 <strong>Tsudome</strong> 市立体育设施，执行委员会的常见问题写明全部<strong>免费</strong>。大通随时可看，雪雕亮灯到 <strong>22:00</strong>；薄野到 <strong>23:00</strong>（最后一天 22:00）；Tsudome <strong>10:00–16:00</strong>开放，内部部分活动收费。没有门票、没有时段，也没有队伍要跳过。值得预订的是雪祭前后这一周：唯一没有备选的酒店，以及只有这个季节才有的郊外行程，比如小樽、旭山动物园、支笏湖冰涛节和定山溪温泉的下午。2 月札幌平均最高气温 <strong>{FEB_MAX}</strong>，所以每个雪祭日的中段都要待在室内。雪祭信息核查日期：{OWN}；气温平年值：{JMA_CHECKED}。
</p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
查看这些日期的札幌酒店 →
</KlookLink>
              <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
小樽一日游 →
</KlookLink>
            </div>
          </div>
        </div>

                <KlookTripPrep
          label={"同一趟旅行要订的"}
          heading={"雪祭旅行出发前要订什么"}
          intro={"八天之外还有四项要订：流量、用车而不是站台解决的机场交通、用路线算过的铁路周游券，以及一年前就定好日期、没有备选的酒店。"}
          items={festivalSameTrip}
        />

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
日期与会场
</span>
          <h2 className={styles.sectionTitle}>
2027 年札幌雪祭在何时、何地举行？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
根据执行委员会公告，<strong>2027 年 2 月 4 日到 11 日</strong>，共八天（「2027年2月4日（木）から11日（木・祝）の8日間」）。这是确定日期，不是按往年推测，同一份公告也列出三个会场和范围。相关活动札幌 Snow Sports Park 接着于 <strong>2027 年 2 月 12 到 14 日</strong>在大和房屋 Premist 巨蛋举行。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["会场", "确切位置", "时间", "门票", "内容"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteRows.map((row) => (
                    <tr key={row.site}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.site}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
日期和会场范围出自札幌雪祭执行委员会第 77 届公告；时间和门票信息出自其常见问题（「全会場無料です」）。两者于 {OWN} 首次核查，{SEASON} 重新确认无变动。委员会表示 2027 年信息确定后会更新，临近时请再次确认会场范围；薄野会场南端已从 2026 年的南 7 条改为 2027 年的南 6 条。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
免费吗？
</span>
          <h2 className={styles.sectionTitle}>
札幌雪祭免费吗？需要跟团吗？
</h2>
          <p className={styles.bodyText}>
免费，也不需要跟团。执行委员会的常见问题用一句话回答票价：<strong>「全会場無料です」</strong>，所有会场免费，雪祭没有任何部分需要门票。大通会场是八天内随时能进入的公园，薄野会场是公共街道。Tsudome 会场免费入场，内部部分活动另收费，委员会也提醒人多时受理可能在 16:00 前截止。核查日期：{OWN}。
</p>
          <p className={styles.bodyText}>
这让它在本站介绍的活动中很特别：没有队伍可跳过、没有分时段入场，所以也不存在靠谱的「免排队」商品。我们找不到销售札幌雪祭本身的 Klook 商品，也不应该有。雪祭旅行真正要花钱预订的是<strong>每天的另一半</strong>。会场全在户外，日本气象厅平年值的平均最高气温是 <strong>{FEB_MAX}</strong>，雪雕又以天黑后最美，所以理想的雪祭日是上午去郊外或下午待室内，晚上再看大通和薄野的亮灯。下面的商品就是前半段。
</p>
          <p className={styles.bodyText}>
有一张票因为位置值得一提：<strong>札幌电视塔</strong>展望台位于西 1 丁目，正是大通会场十一个街区雪雕的起点，也是雪祭唯一能看到步行看不到画面的收费项目：整个会场亮灯后连成一条直线。<KlookLink href={klookFor(sapporoTvTowerMoiwaSetTicket.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>查看电视塔与藻岩山套票 →</KlookLink>
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
行程
</span>
          <h2 className={styles.sectionTitle}>
雪祭周哪些行程值得订？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
只有这个季节才卖的，以及能让户外的一天有室内中段的。下列商品都于 {SEASON} 用 Klook 搜索索引重新确认；没有一个是雪祭团，每一行都写明它实际增加什么、适合怎样的一天。表格不列价格，因为 Klook 会对自动读取商品页返回错误。本页最上方的起价是索引显示的数字，你的日期请打开商品页查看。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["商品", "增加什么", "适合怎样的一天", "须知"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adds}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fits}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
<strong>怎么选。</strong>三晚的话，排一个全天和一个半天行程，留两个晚上看大通和薄野亮灯：白天的雕刻细节和晚上的灯光是同样雪雕的不同体验，多数人错过一个都会后悔。四晚以上，登别和洞爷湖的长途行程就值得了。带小孩的话，上午 Tsudome、下午雪上乐园最合适。不管订什么，都请确认取消条款：这些是 2 月北海道的出发班次，下雪时最先取消的就是巴士团。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(otaruSnowParkDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
小樽与雪上乐园 →
</KlookLink>
            <KlookLink href={klookFor(asahiyamaBieiHighlightsTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
旭山动物园 →
</KlookLink>
            <KlookLink href={klookFor(lakeShikotsuIceFestivalHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
支笏湖冰涛节 →
</KlookLink>
            <KlookLink href={klookFor(jozankeiHotSpringBusTrip.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
定山溪温泉 →
</KlookLink>
          </div>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
住宿
</span>
          <h2 className={styles.sectionTitle}>
雪祭期间住哪里好？
</h2>
          <p className={styles.bodyText}>
<strong>札幌站或薄野</strong>，取决于你看重晚上的哪一段。札幌站距离大通一站地铁，大多可走地下，新千岁来的快速 Airport 也停这里；八天户外、平均最高气温 {FEB_MAX}，能在会场之间回到室内比景观更有价值。<strong>薄野</strong>门外就是冰雕会场，亮灯到 23:00，晚场看完走回去就好。<strong>小樽</strong>坐 JR 函馆本线快速 Airport 往西 33 到 41 分钟，是札幌订满时的备选，同时期还有小樽雪灯之路。
</p>
          <p className={styles.bodyText}>
关于时间，我们会清楚区分已确认和未确认的部分。<strong>日期从 2026 年 2 月 11 日就公开了</strong>，执行委员会在第 76 届闭幕公告中公布 2027 年日期，所以同一座城市八个固定夜晚已知八个月，这是提前预订最有力的理由。我们刻意不写入住率或售罄数字：官方没有公布，我们也不会编造。把酒店当成没有备选的预订，其他都可以灵活调整。
</p>
        </section>

        <KlookStayAreas
          heading={"上述三个据点的酒店搜索"}
          intro={"还有哪些房间、多少钱要看日期，所以每个据点都链接到 Klook 的酒店搜索。雪祭期间要比较的不是每晚房价，而是离有暖气的建筑有多远，每一项的说明就是在讲这件事。"}
          areas={sapporoSnowFestivalStayAreas.map((item, i) => withKlookLocale(item, LOCALE, ([{ why: "到大通一站地铁或走有遮蔽的路，新千岁来的快速 Airport 也停这里。2 月的八天里，这比任何景观都重要，因为这个据点让你能在会场之间回到室内。", area: "札幌站" }, { why: "门外的街道就是冰雕会场：薄野会场沿站前通南 4 到南 6 条，亮灯到 23:00，晚场看完走回去就好，不用赶末班地铁。", area: "薄野" }, { why: "札幌订满时的备选，本身也是目的地：小樽坐 JR 函馆本线快速 Airport 33 到 41 分钟，同样在 2 月举办小樽雪灯之路。", area: "小樽站" }] as Partial<typeof item>[])[i]))}
        />

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
天气与穿着
</span>
          <h2 className={styles.sectionTitle}>
2 月的札幌有多冷，穿什么？
</h2>
          <p className={styles.bodyText}>
根据日本气象厅 1991–2020 年札幌平年值，2 月月均气温 <strong>{FEB_MEAN}</strong>，<strong>平均最高 {FEB_MAX}</strong>，<strong>平均最低 {FEB_MIN}</strong>，全月降雪 <strong>{FEB_SNOW}</strong>。核查日期：{JMA_CHECKED}。
</p>
          <p className={styles.bodyText}>
这些数字带来三个实际结论。第一，最高气温约在冰点，脚下的雪是压实又滑，而不是湿的，所以防滑比防水重要，这是最该做对的一件事。第二，札幌的建筑、电车和地下通道暖气都很足，能脱的多层穿搭比一件厚外套好；札幌站到大通的地下通道正是为此而建，也是规划雪祭夜晚的一部分。第三，雪雕天黑后最美，这时气温接近最低，所以你最想在外面的时间就是一天中最冷的时候，手套、帽子和遮脸衣物不是可有可无。<Link href="/zh-cn/guides/attractions/japan-winter-itinerary">日本冬季行程</Link>把东京、京都、大阪和札幌的气象厅平年值放在一起，可以看出北海道为什么要穿得不一样。
</p>
        </section>

                <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>
交通方式
</span>
          <h2 className={styles.sectionTitle}>
新千岁机场怎么到札幌？
</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
<strong>坐快速 Airport，33 到 37 分钟，{AIRPORT_FARE}</strong>。这是 JR 北海道的数字，几乎适用所有到达的游客。下表补上其他信息：对号座费用、如何前往各会场，以及两种地铁一日券，都附运营方官方票价。
</p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["路段", "时间", "票价", "备注"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
有两件事要自己决定。4 号车的 <strong>uシート对号座</strong>票价外加 ¥1,000，无票预约 ¥800，2 月普通车厢常被雪具塞满，所以值得。<strong>JR 北海道周游券</strong>只有离开市区才划算：机场往返约 ¥2,460，所以周游券要看的是小樽、旭川和登别，而不是机场。请用自己的路段计算。票价核查日期：{OWN}；<Link href="/guides/transport/jr-pass-guide" hrefLang="en">JR Pass 攻略（英文）</Link>用同样方法计算全国版。
</p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookFor(newChitoseAirportTransfers.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
新千岁接送 →
</KlookLink>
            <KlookLink href={klookFor(jrHokkaidoRailPass.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
JR 北海道周游券 →
</KlookLink>
            <KlookLink href={klookFor(lakeShikotsuIceFestivalShuttleBus.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
支笏湖接驳座位 →
</KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
到达当天还有一项不是交通的预订：流量。三个户外会场、2027 年时刻表未公布的接驳车，加上会当天改变计划的 2 月天气，相关公告都发到手机而不是柜台。<KlookLink href={klookFor(klookEsim.url, LOCALE)} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>查看 Klook eSIM →</KlookLink> <Link href="/zh-cn/guides/esim/best-esim-japan">日本流量卡推荐攻略</Link>比较了其他选择。
</p>
        </section>

                <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>
预订时间
</span>
          <h2 className={styles.sectionTitle}>
到底要订什么、什么时候订？
</h2>
          <p className={styles.bodyText}>
四件事，按这个顺序，而且雪祭本身不在其中。按需要提前多久排列。
</p>
          <div className={styles.whoForGrid}>
            {bookingWindow.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
这趟旅行的取消条款比多数行程更重要，原因是 2 月的北海道：下雪不会关闭雪祭，会场在户外又免费，雪雕也还在，但可能封闭出城的道路、让航班停飞。请确认所订巴士行程的取消条款；如果最后一天早上要飞，不要订新千岁的第一班。
</p>
        </section>

                <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>
冬季行程的其他部分
</span>
          <h2 className={styles.sectionTitle}>
雪祭可以搭配什么？
</h2>
          <p className={styles.bodyText}>
先留在北海道。<Link href="/guides/attractions/otaru-day-trip-from-sapporo" hrefLang="en">札幌出发小樽一日游（英文）</Link>最容易加上，小樽雪灯之路和雪祭大部分重叠。有一整周的话，<Link href="/zh-cn/guides/attractions/hokkaido-7-day-itinerary">北海道 7 日游</Link>把雪祭放进到旭川和富良野的路线；如果滑雪比大通第三晚更重要，<Link href="/zh-cn/guides/attractions/niseko-ski-tours">二世谷滑雪攻略</Link>介绍札幌出发的导览行程。
</p>
          <p className={styles.bodyText}>
如果经东京进出，本州的冬天值得再加一站。<Link href="/zh-cn/guides/attractions/jigokudani-snow-monkey-tour">地狱谷雪猴行程</Link>和<Link href="/guides/attractions/takayama-shirakawago-tour" hrefLang="en">高山与白川乡行程（英文）</Link>不用飞往北方就能看到深雪；只想滑一天雪的话，<Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" hrefLang="en">东京出发 GALA 汤泽滑雪（英文）</Link>更省时。北海道前后的晚上，可以看<Link href="/guides/attractions/tokyo-illumination-tours" hrefLang="en">东京灯饰（英文）</Link>攻略，了解哪些到 2 月还有展出。
</p>
        </section>

                <FaqList items={faqItems} />

                <KlookTourPicks
          heading={"只有这个季节才有的一日游"}
          intro={"四个札幌出发的行程，安排雪祭日不在大通的那一半。冬季路线和夏季不同，所以请在到达前就打开来看，不要等到当天早上。"}
          tours={[withKlookLocale(otaruSnowParkDayTour, LOCALE, { title: "小樽、白色恋人公园与雪上乐园一日游", desc: "结合小樽运河、蒸汽时钟、白色恋人公园和玩雪的北海道一日游" }), withKlookLocale(asahiyamaBieiHighlightsTour, LOCALE, { title: "札幌出发旭山动物园、美瑛青池与精灵露台一日游", desc: "从札幌前往旭川动物园、美瑛青池和精灵露台的一日巴士，有多条路线，冬季可加购雪地摩托" }), withKlookLocale(sapporoJozankeiBuddhaDayTour, LOCALE, { title: "札幌、定山溪与头大佛一日游", desc: "结合定山溪峡谷、安藤忠雄头大佛、白色恋人公园和啤酒博物馆的全天导览，是雪祭会场以外的札幌一天" }), withKlookLocale(noboribetsuToyaOtaruDayTour, LOCALE, { title: "札幌出发登别、洞爷湖与小樽一日游", desc: "市区南方和西方的全景跟团行程，适合多一天、又不想在大通度过第四晚的雪祭旅行" })]}
        />

                <Related items={[{ href: "/guides/transport/hokkaido-rail-pass", title: "北海道周游券（2026）：价格与是否划算 （英文）" }, { href: "/zh-cn/guides/attractions/niseko-ski-tours", title: "二世谷滑雪（2027）：接送、教练课与四大区域" }, { href: "/zh-cn/guides/attractions/hokkaido-7-day-itinerary", title: "北海道 7 日游：每日路线" }, { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "札幌出发小樽一日游（2027）：¥800，JR 33 分钟 （英文）" }, { href: "/zh-cn/guides/attractions/japan-winter-itinerary", title: "日本冬季行程：12 天逐日安排（2027）" }, { href: "/guides/money/japan-ski-travel-insurance", title: "日本滑雪旅行保险（2027）：该保什么 （英文）" }, { href: "/guides/attractions/tokyo-illumination-tours", title: "东京灯饰行程：日期、免费景点与该订什么 （英文）" }, { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "东京出发 GALA 汤泽滑雪一日游：71 分钟，缆车 ¥8,000 （英文）" }, { href: "/zh-cn/guides/attractions/jigokudani-snow-monkey-tour", title: "东京出发雪猴行程：地狱谷野猿公苑攻略（2027）" }, { href: "/guides/attractions/takayama-shirakawago-tour", title: "高山与白川乡行程（2027）：该从哪里出发 （英文）" }, { href: "/guides/transport/jr-pass-guide", title: "JR Pass 攻略（2026）：价格、范围与是否划算 （英文）" }, { href: "/zh-cn/guides/esim/best-esim-japan", title: "日本 eSIM 推荐（2026）：运营商、价格与怎么选" }, { href: "/zh-cn/guides/attractions", title: "更多日本景点 →" }]} />

                <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>
八天免费，一项没有备选的预订
</h2>
            <p className={styles.ctaBannerDesc}>
雪祭不花钱也不用预订。2027 年 2 月 4–11 日的酒店要订，只有这几周才有的郊外行程也一样。
</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={klookFor(sapporoSnowFestivalStayAreas[0].url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看札幌酒店 →
</KlookLink>
              <KlookLink href={klookFor(sapporoSnowParkHalfDayTour.url, LOCALE)} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
查看雪上乐园半日游 →
</KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
