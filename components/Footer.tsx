import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Footer.module.css";
import { localeOf, type Locale } from "../lib/i18n";

// No repeats. Until 2026-10-09 the footer listed the five hubs and then three more columns of
// individual guides and retired landing pages, several of which pointed at the same
// destinations as the hub links above them. Category navigation belongs to the hubs; the hubs
// themselves list the articles.
//
// Destinations split out 2026-10-19 to match the header: the city hubs are now the second
// entry point into the site, and Things to Do leads the guide column.
type FooterCol = { title: string; links: { href: string; label: string }[] };

const cols: FooterCol[] = [
  {
    title: "Guides",
    links: [
      { href: "/guides/attractions", label: "Things to Do"     },
      { href: "/guides/transport",   label: "Getting Around"   },
      { href: "/guides/esim",        label: "eSIM & SIM Cards" },
      { href: "/guides/money",       label: "Money & Payment"  },
      { href: "/guides",             label: "All Guides"       },
    ],
  },
  {
    title: "Destinations",
    links: [
      { href: "/guides/attractions/things-to-do-tokyo", label: "Tokyo"     },
      { href: "/guides/attractions/things-to-do-kyoto", label: "Kyoto"     },
      { href: "/guides/attractions/things-to-do-osaka", label: "Osaka"     },
      { href: "/guides/attractions#daytrips",           label: "Day Trips" },
    ],
  },
  {
    title: "About this site",
    links: [
      { href: "/about",          label: "About"                },
      { href: "/disclaimer",     label: "Affiliate Disclaimer" },
      { href: "/privacy-policy", label: "Privacy Policy"       },
    ],
  },
];

// ── 繁體中文 footer (added 2026-10-20) ──────────────────────────────────────
//
// Same shape, Chinese labels, and the same rule as the header: a destination that
// has not been translated yet says so with「（英文）」instead of quietly handing a
// Chinese-reading visitor an English page. The policy pages are English-only.
const zhCols: FooterCol[] = [
  {
    title: "攻略",
    links: [
      { href: "/zh-tw/guides/attractions",                        label: "日本景點門票"      },
      { href: "/zh-tw/guides/transport/tokyo-airport-transfer",    label: "成田機場到東京交通" },
      { href: "/zh-tw/guides/esim/best-esim-japan",               label: "日本網卡推薦"      },
      { href: "/guides/money",                                    label: "付款與貨幣（英文）" },
      { href: "/guides",                                          label: "全部攻略（英文）"   },
    ],
  },
  {
    title: "熱門門票",
    links: [
      { href: "/zh-tw/guides/attractions/shibuya-sky-tickets",       label: "澀谷SKY 門票"         },
      { href: "/zh-tw/guides/attractions/teamlab-tokyo-tickets",     label: "teamLab Planets 門票" },
      { href: "/zh-tw/guides/attractions/tokyo-disney-tickets",      label: "東京迪士尼門票"        },
      { href: "/zh-tw/guides/attractions/usj-tickets-express-pass",  label: "日本環球影城門票"      },
      { href: "/zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo", label: "富士山一日遊"        },
    ],
  },
  {
    title: "關於本站",
    links: [
      { href: "/about",          label: "關於我們（英文）"   },
      { href: "/disclaimer",     label: "聯盟聲明（英文）"   },
      { href: "/privacy-policy", label: "隱私權政策（英文）" },
    ],
  },
];

// ── 简体中文 footer (added 2026-10-20) ──────────────────────────────────────
//
// Same shape again, in the Simplified readers' vocabulary: 流量卡 for mobile data,
// 支付 for payment, 一日游 for a day out. The policy pages are English-only.
const cnCols: FooterCol[] = [
  {
    title: "攻略",
    links: [
      { href: "/zh-cn/guides/attractions",                        label: "日本景点门票"      },
      { href: "/zh-cn/guides/transport/tokyo-airport-transfer",    label: "成田机场到东京交通" },
      { href: "/zh-cn/guides/esim/best-esim-japan",               label: "日本eSIM推荐"      },
      { href: "/guides/money",                                    label: "支付与货币（英文）" },
      { href: "/guides",                                          label: "全部攻略（英文）"   },
    ],
  },
  {
    title: "热门门票",
    links: [
      { href: "/zh-cn/guides/attractions/shibuya-sky-tickets",       label: "涩谷SKY 门票"         },
      { href: "/zh-cn/guides/attractions/teamlab-tokyo-tickets",     label: "teamLab Planets 门票" },
      { href: "/zh-cn/guides/attractions/tokyo-disney-tickets",      label: "东京迪士尼门票"        },
      { href: "/zh-cn/guides/attractions/usj-tickets-express-pass",  label: "日本环球影城门票"      },
      { href: "/zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo", label: "富士山一日游"        },
    ],
  },
  {
    title: "关于本站",
    links: [
      { href: "/about",          label: "关于我们（英文）"   },
      { href: "/disclaimer",     label: "推广声明（英文）"   },
      { href: "/privacy-policy", label: "隐私政策（英文）" },
    ],
  },
];

type Copy = {
  desc: string;
  rights: string;
  affiliate: string;
  homeHref: string;
  cols: FooterCol[];
  /** How to render "Updated October 2026" for this language. */
  updatedLabel: (date: Date) => string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    desc: "Practical, unbiased travel info for foreign visitors to Japan. Prepared before you land.",
    rights: "All rights reserved.",
    affiliate: "This site contains affiliate links. We may earn a commission at no extra cost to you.",
    homeHref: "/",
    cols,
    updatedLabel: (d) =>
      `Updated ${d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}`,
  },
  "zh-tw": {
    desc: "為外國旅客整理的日本旅遊實用資訊，出發前先看一遍。",
    rights: "版權所有。",
    affiliate: "本站包含聯盟行銷連結。透過連結預訂，我們可能獲得少許分潤，不影響您支付的價格。",
    homeHref: "/zh-tw/guides/attractions",
    cols: zhCols,
    updatedLabel: (d) => `更新於 ${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月`,
  },
  "zh-cn": {
    desc: "为外国旅客整理的日本旅游实用信息，出发前先看一遍。",
    rights: "版权所有。",
    affiliate: "本站包含推广联盟链接。通过链接预订，我们可能获得少量分成，不影响您支付的价格。",
    homeHref: "/zh-cn/guides/attractions",
    cols: cnCols,
    updatedLabel: (d) => `更新于 ${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月`,
  },
};

// Set in next.config.js at build time; falls back to "now" for dev.
const buildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? Date.now());

export default function Footer() {
  const router = useRouter();
  const copy = COPY[localeOf(router.pathname)];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <Link href={copy.homeHref} className={styles.logoRow}>
              <span className={styles.logoText}>Japan Travel Kit</span>
            </Link>
            <p className={styles.desc}>{copy.desc}</p>
            <span className={styles.status}>{copy.updatedLabel(buildDate)}</span>
          </div>

          {copy.cols.map((col) => (
            <div key={col.title}>
              <p className={styles.colTitle}>{col.title}</p>
              <div className={styles.links}>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.link}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Japan Travel Kit. {copy.rights}
          </p>
          <p className={styles.aff}>{copy.affiliate}</p>
        </div>
      </div>
    </footer>
  );
}
