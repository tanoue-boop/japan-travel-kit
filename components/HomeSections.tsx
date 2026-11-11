import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import KlookLink from "./KlookLink";
import {
  klookEsim,
  tokyoStayAreas,
  kyotoStayAreas,
  osakaStayAreas,
  jrPassWholeJapan,
  fujiHakoneDayTour,
} from "../lib/klook-links";

/**
 * The building blocks of the home page, shared by the English home page
 * (pages/index.tsx) and the four translated entry pages (components/LocaleHome.tsx).
 *
 * Added 2026-11-01 (task jtk-20261101-A14). Until then /zh-tw, /zh-cn, /ko and /th
 * were a different page altogether — a text-only hero and a list of cards in the
 * article stylesheet — so switching language on the home page swapped the layout
 * and dropped the photograph. Both now render the same sections in the same order
 * from these components; only the words, and which links exist in each language,
 * differ. A change to a section here shows on all five editions.
 *
 * The structural data — which products the booking block sells, which guides the
 * cards point at, which articles are "popular" — lives here too, so an edition
 * cannot quietly keep last month's list.
 */

// ---------------------------------------------------------------------------
// Shared structure
// ---------------------------------------------------------------------------

/** The four category hubs, in the order the home page lists them. */
export const HUB_HREFS = ["/guides/attractions", "/guides/transport", "/guides/esim", "/guides/money"] as const;

/** The city cards, in order. Each is an English route; editions swap in their own where it exists. */
export const CITY_HREFS = {
  tokyo: "/guides/attractions/things-to-do-tokyo",
  kyoto: "/guides/attractions/things-to-do-kyoto",
  osaka: "/guides/attractions/things-to-do-osaka",
  daytrips: "/guides/attractions#daytrips",
} as const;

// Popular guides. Reordered 2026-10-19: the five attraction and tour guides that lead are the
// ones GA4 ranks highest and the ones the Klook commission comes from — shibuya-sky-tickets is
// the single most-read page on the site. The money and eSIM guides that earn kept their places
// behind them. Direct links from the homepage push crawl equity to the articles worth ranking.
// The translated editions list the ones they have a translation of, in this order.
export const POPULAR_HREFS = [
  "/guides/attractions/shibuya-sky-tickets",
  "/guides/attractions/teamlab-planets-tickets",
  "/guides/attractions/tokyo-disney-tickets",
  "/guides/attractions/mt-fuji-day-tour-from-tokyo",
  "/guides/attractions/kyoto-nara-day-tour-from-osaka",
  "/guides/money/wise-vs-revolut-japan",
  "/guides/esim/best-esim-japan",
  "/guides/esim/sakura-mobile-review",
  "/guides/transport/osaka-airport-transfer",
  "/guides/money/best-travel-insurance-japan",
  "/guides/transport/ic-cards-japan",
  "/guides/transport/osaka-metro-pass",
];

/**
 * "Book before you fly" — what each of the four cards sells and which guide argues it.
 *
 * Products are the existing constants in lib/klook-links.ts — no new URLs — and
 * none of them carries a price: Klook answers automated reads of its product
 * pages with HTTP 403, so there is no figure here we could have verified. The
 * hotel searches read the first entry of each city array, so the destination ids
 * stay in one place. The translated editions point the same product ids at their
 * own Klook locale — see `localizeKlookUrl` in components/LocaleHome.tsx.
 */
export const BOOK_CARDS = {
  esim: { urls: [klookEsim.url], guide: "/guides/esim/best-esim-japan" },
  stay: {
    urls: [tokyoStayAreas[0].url, kyotoStayAreas[0].url, osakaStayAreas[0].url],
    guide: "/guides/attractions/where-to-stay-in-tokyo",
  },
  rail: { urls: [jrPassWholeJapan.url], guide: "/guides/transport/jr-pass-guide" },
  daytrip: { urls: [fujiHakoneDayTour.url], guide: "/guides/attractions/mt-fuji-day-tour-from-tokyo" },
} as const;

export type BookCardKey = keyof typeof BOOK_CARDS;
export const BOOK_CARD_KEYS: BookCardKey[] = ["esim", "stay", "rail", "daytrip"];

/** The hero photograph. Each edition supplies its own alt text. */
export const HERO_IMAGE = "/images/hero-kyoto-yasaka-street.webp";

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

type ButtonLink = { href: string; label: string };

/** Hero — copy left, one photograph right. Replaced the navy gradient / glow /
    pill-button hero on 2026-10-19. */
export function HomeHero({
  eyebrow,
  title,
  titleAccent,
  desc,
  primary,
  secondary,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  desc: string;
  primary: ButtonLink;
  secondary: ButtonLink;
  imageAlt: string;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>

          <h1 className={styles.title}>
            {title}
            <span className={styles.titleAccent}>{titleAccent}</span>
          </h1>

          <p className={styles.desc}>{desc}</p>

          <div className={styles.actions}>
            <PrimaryButton {...primary} />
            <Link href={secondary.href} className={styles.btnSecondary}>
              {secondary.label}
            </Link>
          </div>
        </div>

        <figure className={styles.heroFigure}>
          <Image
            src={HERO_IMAGE}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 900px) 50vw, 100vw"
            className={styles.heroImage}
          />
        </figure>
      </div>
    </section>
  );
}

function PrimaryButton({ href, label }: ButtonLink) {
  return (
    <Link href={href} className={styles.btnPrimary}>
      {`${label} `}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export type BookCard = {
  kicker: string;
  title: string;
  /** Plain text, or text with an inline link (the English home links the eSIM price tracker). */
  desc: ReactNode;
  ctas: { label: string; url: string }[];
  guide: { href: string; label: string; hrefLang?: string };
};

/** Book before you fly — the one outbound booking block on the page, directly
    under the hero. */
export function BookSection({
  eyebrow,
  title,
  desc,
  cards,
  note,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  cards: BookCard[];
  note: ReactNode;
}) {
  return (
    <section className={styles.book}>
      <div className={styles.bookInner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.titleRule} />
        <p className={styles.sectionDesc}>{desc}</p>

        <div className={styles.bookGrid}>
          {cards.map((card) => (
            <div key={card.title} className={styles.bookCard}>
              <p className={styles.bookKicker}>{card.kicker}</p>
              <h3 className={styles.bookTitle}>{card.title}</h3>
              <p className={styles.bookDesc}>{card.desc}</p>
              <div className={styles.bookLinks}>
                {card.ctas.map((cta) => (
                  <KlookLink
                    key={cta.url}
                    href={cta.url}
                    target="_blank"
                    rel="sponsored noopener"
                    className={styles.bookCta}
                  >
                    {cta.label}
                  </KlookLink>
                ))}
                <Link href={card.guide.href} hrefLang={card.guide.hrefLang} className={styles.bookGuide}>
                  {`${card.guide.label} →`}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.bookNote}>{note}</p>
      </div>
    </section>
  );
}

/** Counts and dates, not claims: nothing here asserts we have been anywhere or tried anything. */
export function StatsBand({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className={styles.stats}>
      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCell}>
            <p className={styles.statValue}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export type HomeRow = {
  href: string;
  title: string;
  desc: string;
  meta: string;
  /** Set to "en" on a translated page's links into the English guides. */
  hrefLang?: string;
};

/** The numbered, rule-divided list every link section on the home page uses. */
export function RuleRows({ rows }: { rows: HomeRow[] }) {
  return (
    <div className={styles.ruleGrid}>
      {rows.map((row, i) => (
        <Link key={row.href} href={row.href} hrefLang={row.hrefLang} className={styles.row}>
          <span className={styles.rowIndex} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={styles.rowBody}>
            <span className={styles.rowTitle}>{row.title}</span>
            <span className={styles.rowDesc}>{row.desc}</span>
            <span className={styles.rowFoot}>
              <span className={styles.rowMeta}>{row.meta}</span>
              <span className={styles.rowArrow} aria-hidden="true">→</span>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/** A white or paper band with the eyebrow / title / rule / intro head every list section has. */
export function HomeSection({
  id,
  tone,
  eyebrow,
  title,
  desc,
  rows,
  footLink,
  children,
}: {
  id?: string;
  tone: "white" | "paper";
  eyebrow: string;
  title: string;
  desc: string;
  rows?: HomeRow[];
  footLink?: { href: string; label: string; hrefLang?: string };
  children?: ReactNode;
}) {
  return (
    <section id={id} className={tone === "white" ? styles.sectionWhite : styles.sectionPaper}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.titleRule} />
        <p className={styles.sectionDesc}>{desc}</p>

        {rows && <RuleRows rows={rows} />}
        {children}

        {footLink && (
          <p className={styles.sectionFootLink}>
            <Link href={footLink.href} hrefLang={footLink.hrefLang}>
              {footLink.label}
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

/** A sub-list inside a section — a heading, one line of framing, then the rows. */
export function RowGroup({ id, title, desc, rows }: { id?: string; title: string; desc: string; rows: HomeRow[] }) {
  return (
    <>
      <h3 id={id} className={styles.subHead}>{title}</h3>
      <p className={styles.subHeadDesc}>{desc}</p>
      <RuleRows rows={rows} />
    </>
  );
}

/** Trust — the one general-interest block on the page. */
export function TrustBand({
  eyebrow,
  title,
  desc,
  checks,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  checks: string[];
}) {
  return (
    <section className={styles.trust}>
      <div className={styles.trustInner}>
        <div>
          <p className={styles.trustEyebrow}>{eyebrow}</p>
          <h2 className={styles.trustTitle}>{title}</h2>
          <div className={styles.trustRule} />
          <p className={styles.trustDesc}>{desc}</p>
        </div>
        <div className={styles.trustChecks}>
          {checks.map((t) => (
            <div key={t} className={styles.trustCheck}>{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The closing call to action. */
export function CtaBand({
  eyebrow,
  title,
  desc,
  button,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  button: ButtonLink;
}) {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <p className={styles.ctaEyebrow}>{eyebrow}</p>
        <h2 className={styles.ctaTitle}>{title}</h2>
        <div className={styles.ctaRule} />
        <p className={styles.ctaDesc}>{desc}</p>
        <PrimaryButton {...button} />
      </div>
    </section>
  );
}

/** Wraps any extra block (the translated editions' FAQ) in the home page's paper band. */
export function PaperBand({ children }: { children: ReactNode }) {
  return (
    <section className={styles.sectionPaper}>
      <div className={styles.wrap}>{children}</div>
    </section>
  );
}
