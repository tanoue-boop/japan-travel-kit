import Link from "next/link";
import styles from "../styles/CityGuideIndex.module.css";
import { attractionArticles } from "../lib/guides-attractions";
import { transportArticles } from "../lib/guides-transport";
import { CITY_LABELS, type GuideArticle, type GuideCity } from "../lib/guide-hub";

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
 */

type CityIndexBlock = {
  key: string;
  title: string;
  articles: GuideArticle[];
};

const TICKET_GROUPS = ["tickets", "parks", "experiences"];

export default function CityGuideIndex({
  city,
  /** The hub's own route, so it does not list itself. */
  exclude,
}: {
  city: Exclude<GuideCity, "other">;
  exclude: string;
}) {
  const name = CITY_LABELS[city];
  const forCity = (list: GuideArticle[]) => list.filter((a) => a.city === city && a.href !== exclude);

  const attractions = forCity(attractionArticles);
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
      <span className={styles.label}>Every {name} guide</span>
      <h2 className={styles.title}>All {total} of Our {name} Guides</h2>
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
