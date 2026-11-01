import Link from "next/link";
import styles from "../styles/CityGuideIndex.module.css";
import { attractionArticles } from "../lib/guides-attractions";
import { transportArticles } from "../lib/guides-transport";
import { CITY_LABELS, type GuideArticle, type GuideCity } from "../lib/guide-hub";
import { labelOf, pairFor, routeOf, type Locale, type TranslatedLocale } from "../lib/i18n";
import { useComponentLocale } from "./componentLocale";

/**
 * "Everything we have for this city" — the block that turns things-to-do-tokyo / -kyoto /
 * -osaka from a round-up article into a city hub.
 *
 * Added 2026-10-19. The three round-ups each hand-linked a handful of guides from their own
 * body copy, which meant a new Tokyo article only appeared on the Tokyo hub if someone
 * remembered to edit it. This block is built from the `city` field in lib/guides-*.ts
 * instead, so every new article lands on its city hub the moment its data is added.
 *
 * Nationwide guides (eSIM, money, the JR Pass) are deliberately left out: they belong to
 * every city, so listing them here would be the same four links on all three hubs.
 *
 * Translated editions (2026-11-01, task jtk-20261101-A15): the frame is in the page's
 * language, and an article that exists in that edition links to its translation under
 * its translated label. Everything else still links to the English guide, marked as
 * English — the list stays complete rather than shrinking to the translated set. The
 * English rendering is unchanged.
 */

type CityIndexBlock = {
  key: string;
  title: string;
  articles: GuideArticle[];
};

const TICKET_GROUPS = ["tickets", "parks", "experiences"];

type Copy = {
  city: Record<Exclude<GuideCity, "other">, string>;
  tickets: (name: string) => string;
  daytrips: (name: string) => string;
  passes: (name: string) => string;
  transport: (name: string) => string;
  label: (name: string) => string;
  title: (total: number, name: string) => string;
  intro: (name: string) => string;
  count: (n: number) => string;
  english: string;
  footDaytrips: string;
  footTickets: string;
  footAll: string;
};

const COPY: Record<TranslatedLocale, Copy> = {
  "zh-tw": {
    city: { tokyo: "東京", kyoto: "京都", osaka: "大阪" },
    tickets: (n) => `${n}的門票、樂園與體驗`,
    daytrips: (n) => `從${n}出發的一日遊`,
    passes: (n) => `${n}交通票券`,
    transport: (n) => `如何前往${n}、在${n}移動`,
    label: (n) => `${n}全部攻略`,
    title: (t, n) => `我們的 ${t} 篇${n}攻略`,
    intro: (n) =>
      `我們寫過的所有${n}攻略都在這一份清單裡——門票與體驗、市區出發的一日遊、交通票券，以及從機場進市區與市內移動。清單由攻略索引自動產生，新增文章時會自動補上。標示「英文」的攻略目前只有英文版。`,
    count: (n) => `${n} 篇`,
    english: "（英文）",
    footDaytrips: "全部一日遊與行程（英文）→",
    footTickets: "日本景點門票 →",
    footAll: "全部日本旅遊攻略（英文）→",
  },
  "zh-cn": {
    city: { tokyo: "东京", kyoto: "京都", osaka: "大阪" },
    tickets: (n) => `${n}的门票、乐园与体验`,
    daytrips: (n) => `从${n}出发的一日游`,
    passes: (n) => `${n}交通票券`,
    transport: (n) => `如何前往${n}、在${n}出行`,
    label: (n) => `${n}全部攻略`,
    title: (t, n) => `我们的 ${t} 篇${n}攻略`,
    intro: (n) =>
      `我们写过的所有${n}攻略都在这一份清单里——门票与体验、市区出发的一日游、交通票券，以及从机场进市区与市内出行。清单由攻略索引自动生成，新增文章时会自动补上。标注“英文”的攻略目前只有英文版。`,
    count: (n) => `${n} 篇`,
    english: "（英文）",
    footDaytrips: "全部一日游与行程（英文）→",
    footTickets: "日本景点门票 →",
    footAll: "全部日本旅游攻略（英文）→",
  },
  ko: {
    city: { tokyo: "도쿄", kyoto: "교토", osaka: "오사카" },
    tickets: (n) => `${n}의 티켓, 테마파크, 체험`,
    daytrips: (n) => `${n}에서 떠나는 당일치기`,
    passes: (n) => `${n} 패스`,
    transport: (n) => `${n} 가는 법과 시내 이동`,
    label: (n) => `${n} 가이드 전체`,
    title: (t, n) => `${n} 가이드 ${t}편 전체`,
    intro: (n) =>
      `${n}에 대해 쓴 가이드를 한 목록에 모았습니다 — 티켓과 체험, 당일치기, 패스, 공항에서 시내까지와 시내 이동. 가이드 색인에서 자동으로 만들어지므로 글이 늘어나도 목록이 완전하게 유지됩니다. '영어'로 표시된 가이드는 아직 영어판만 있습니다.`,
    count: (n) => `${n}편`,
    english: " (영어)",
    footDaytrips: "당일치기・투어 전체(영어) →",
    footTickets: "티켓・투어 전체(영어) →",
    footAll: "일본 여행 가이드 전체(영어) →",
  },
  th: {
    city: { tokyo: "โตเกียว", kyoto: "เกียวโต", osaka: "โอซาก้า" },
    tickets: (n) => `ตั๋ว สวนสนุก และกิจกรรมใน${n}`,
    daytrips: (n) => `เที่ยวแบบวันเดียวจาก${n}`,
    passes: (n) => `พาสใน${n}`,
    transport: (n) => `การเดินทางไปและเที่ยวรอบ${n}`,
    label: (n) => `ไกด์${n}ทั้งหมด`,
    title: (t, n) => `ไกด์${n}ทั้งหมด ${t} เรื่อง`,
    intro: (n) =>
      `ทุกไกด์ที่เราเขียนเกี่ยวกับ${n}อยู่ในรายการเดียว — ตั๋วและกิจกรรม ทริปวันเดียว พาส และการเดินทางจากสนามบินเข้าเมืองกับการเดินทางในเมือง รายการนี้สร้างจากดัชนีไกด์ของเราโดยอัตโนมัติ จึงครบถ้วนเสมอเมื่อมีบทความใหม่ ไกด์ที่มีป้าย "ภาษาอังกฤษ" ยังมีเฉพาะฉบับภาษาอังกฤษ`,
    count: (n) => `${n} เรื่อง`,
    english: " (ภาษาอังกฤษ)",
    footDaytrips: "ทริปวันเดียวและทัวร์ทั้งหมด (ภาษาอังกฤษ) →",
    footTickets: "ตั๋วและทัวร์ทั้งหมด (ภาษาอังกฤษ) →",
    footAll: "ไกด์เที่ยวญี่ปุ่นทั้งหมด (ภาษาอังกฤษ) →",
  },
};

/** Where an article's card points, and what it says, in a given edition. */
function inEdition(article: GuideArticle, locale: TranslatedLocale, copy: Copy) {
  const page = pairFor(article.href);
  const route = page ? routeOf(page, locale) : null;
  if (page && route) return { href: route, title: labelOf(page, locale) ?? article.title };
  return { href: article.href, title: `${article.title}${copy.english}` };
}

export default function CityGuideIndex({
  city,
  /** The hub's own route, so it does not list itself. */
  exclude,
  locale: localeProp,
}: {
  city: Exclude<GuideCity, "other">;
  exclude: string;
  /** Defaults to the locale of the route the block renders on. */
  locale?: Locale;
}) {
  const locale = useComponentLocale(localeProp);
  const forCity = (list: GuideArticle[]) => list.filter((a) => a.city === city && a.href !== exclude);
  const attractions = forCity(attractionArticles);

  if (locale !== "en") {
    const copy = COPY[locale];
    const name = copy.city[city];
    const blocks: CityIndexBlock[] = [
      { key: "tickets", title: copy.tickets(name), articles: attractions.filter((a) => TICKET_GROUPS.includes(a.group)) },
      { key: "daytrips", title: copy.daytrips(name), articles: attractions.filter((a) => a.group === "daytrips") },
      { key: "passes", title: copy.passes(name), articles: attractions.filter((a) => a.group === "passes") },
      { key: "transport", title: copy.transport(name), articles: forCity(transportArticles) },
    ].filter((block) => block.articles.length > 0);
    const total = blocks.reduce((n, b) => n + b.articles.length, 0);
    const hub = locale === "zh-tw" || locale === "zh-cn" ? `/${locale}/guides/attractions` : "/guides/attractions";

    return (
      <section className={styles.section}>
        <p className={styles.label}>{copy.label(name)}</p>
        <h2 className={styles.title}>{copy.title(total, name)}</h2>
        <div className={styles.titleRule} />
        <p className={styles.intro}>{copy.intro(name)}</p>

        {blocks.map((block) => (
          <div key={block.key} className={styles.block}>
            <h3 className={styles.blockTitle}>{block.title}</h3>
            <p className={styles.blockCount}>{copy.count(block.articles.length)}</p>
            <div className={styles.list}>
              {block.articles.map((article) => {
                const target = inEdition(article, locale, copy);
                return (
                  <Link key={article.href} href={target.href} className={styles.item}>
                    <span className={styles.badge}>{article.badge}</span>
                    <span className={styles.itemTitle}>{target.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className={styles.footLinks}>
          <Link href="/guides/attractions#daytrips" className={styles.footLink}>
            {copy.footDaytrips}
          </Link>
          <Link href={hub} className={styles.footLink}>
            {copy.footTickets}
          </Link>
          <Link href="/guides" className={styles.footLink}>
            {copy.footAll}
          </Link>
        </div>
      </section>
    );
  }

  const name = CITY_LABELS[city];
  const blocks: CityIndexBlock[] = [
    {
      key: "tickets",
      title: `Tickets, parks and experiences in ${name}`,
      articles: attractions.filter((a) => TICKET_GROUPS.includes(a.group)),
    },
    {
      key: "daytrips",
      title: `Day trips from ${name}`,
      articles: attractions.filter((a) => a.group === "daytrips"),
    },
    {
      key: "passes",
      title: `${name} passes`,
      articles: attractions.filter((a) => a.group === "passes"),
    },
    {
      key: "transport",
      title: `Getting to and around ${name}`,
      articles: forCity(transportArticles),
    },
  ].filter((block) => block.articles.length > 0);

  const total = blocks.reduce((n, b) => n + b.articles.length, 0);

  return (
    <section className={styles.section}>
      <p className={styles.label}>Every {name} guide</p>
      <h2 className={styles.title}>All {total} of Our {name} Guides</h2>
      <div className={styles.titleRule} />
      <p className={styles.intro}>
        Everything we have written about {name}, in one list — the tickets and experiences, the days out
        of the city, the passes, and how to get in from the airport and around once you are there. This
        list is generated from our guide index, so it stays complete as we add to it.
      </p>

      {blocks.map((block) => (
        <div key={block.key} className={styles.block}>
          <h3 className={styles.blockTitle}>{block.title}</h3>
          <p className={styles.blockCount}>
            {block.articles.length} {block.articles.length === 1 ? "guide" : "guides"}
          </p>
          <div className={styles.list}>
            {block.articles.map((article) => (
              <Link key={article.href} href={article.href} className={styles.item}>
                <span className={styles.badge}>{article.badge}</span>
                <span className={styles.itemTitle}>{article.title}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className={styles.footLinks}>
        <Link href="/guides/attractions#daytrips" className={styles.footLink}>
          All day trips &amp; tours →
        </Link>
        <Link href="/guides/attractions" className={styles.footLink}>
          All tickets &amp; tours →
        </Link>
        <Link href="/guides" className={styles.footLink}>
          All Japan travel guides →
        </Link>
      </div>
    </section>
  );
}
