"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect, useRef } from "react";
import styles from "../styles/Header.module.css";
import {
  HTML_LANG,
  LOCALES,
  LOCALE_HOME,
  LOCALE_NAME,
  localeOf,
  pairFor,
  routeOf,
  type Locale,
} from "../lib/i18n";

// One menu, one destination each. Until 2026-10-09 the header carried a Guides dropdown of
// the five hubs *and* a second row of /sim-cards, /wifi-pocket, /transport and /money links;
// the October crawl showed those resolved to the same hubs, so visitors and crawlers saw
// every category twice. The hubs are now the only category entry point — individual buying
// guides are reached from the hubs and the header CTA.
//
// Reordered 2026-10-19. Things to Do is now the largest category and the one the traffic and
// the bookings come from, so it leads; eSIM, which the nav was built around in September,
// moves down to where its share of the site actually sits. Destinations is a dropdown over
// the three city hubs, which is the way most visitors describe what they are looking for
// ("things to do in Kyoto") rather than by our category names.
const destinationItems = [
  { href: "/guides/attractions/things-to-do-tokyo", label: "Tokyo" },
  { href: "/guides/attractions/things-to-do-kyoto", label: "Kyoto" },
  { href: "/guides/attractions/things-to-do-osaka", label: "Osaka" },
  { href: "/guides/attractions#daytrips",           label: "Day Trips" },
];

// Text only, in both menus. The coloured category icons in public/icons were dropped on
// 2026-10-19 with the rest of the template palette — five words carry the nav fine, and a
// single-colour icon beside each one added nothing a label does not already say.
const navItems = [
  { href: "/guides/attractions", label: "Things to Do"   },
  { href: "/guides/transport",   label: "Getting Around" },
  { href: "/guides/esim",        label: "eSIM & SIM"     },
  { href: "/guides/money",       label: "Money"          },
];

// ── 繁體中文 nav (added 2026-10-20 with the first ten Chinese pages) ─────────
//
// Ten pages are translated, not the whole site, so some of these labels have to
// point at an English page. Those are marked "（英文）" rather than left to look
// like a Chinese destination — a reader who taps a Chinese label and lands on an
// English hub should have been told first. As more pages are translated the
// marker comes off; lib/i18n.ts is the list that decides which is which.
const zhDestinationItems = [
  { href: "/zh-tw/guides/attractions/things-to-do-tokyo",  label: "東京" },
  { href: "/guides/attractions/things-to-do-kyoto",        label: "京都（英文）" },
  { href: "/guides/attractions/things-to-do-osaka",        label: "大阪（英文）" },
  { href: "/zh-tw/guides/attractions#daytrips",            label: "一日遊" },
];

const zhNavItems = [
  { href: "/zh-tw/guides/attractions",              label: "景點門票"     },
  { href: "/zh-tw/guides/transport/tokyo-airport-transfer", label: "機場交通" },
  { href: "/zh-tw/guides/esim/best-esim-japan",     label: "日本網卡"     },
  { href: "/guides/money",                          label: "付款（英文）" },
];

// ── 简体中文 nav (added 2026-10-20 with the ten Simplified pages) ────────────
//
// Same shape and the same "（英文）" rule as the 繁體 nav above, in the vocabulary
// Singapore, Malaysia and other Simplified-reading readers use: 流量卡 for mobile
// data rather than 網卡, 一日游 rather than 一日遊.
const cnDestinationItems = [
  { href: "/zh-cn/guides/attractions/things-to-do-tokyo",  label: "东京" },
  { href: "/guides/attractions/things-to-do-kyoto",        label: "京都（英文）" },
  { href: "/guides/attractions/things-to-do-osaka",        label: "大阪（英文）" },
  { href: "/zh-cn/guides/attractions#daytrips",            label: "一日游" },
];

const cnNavItems = [
  { href: "/zh-cn/guides/attractions",              label: "景点门票"     },
  { href: "/zh-cn/guides/transport/tokyo-airport-transfer", label: "机场交通" },
  { href: "/zh-cn/guides/esim/best-esim-japan",     label: "日本流量卡"   },
  { href: "/guides/money",                          label: "支付（英文）" },
];

// ── 한국어 nav (added 2026-10-21 with the five Korean pages) ─────────────────
//
// Five pages, not ten, so this nav is mostly the five themselves and the English
// destinations are marked "(영어)" by the same rule as the Chinese navs above. The
// logo and the CTA point at pages that exist in Korean — the Shibuya Sky guide is
// the edition's entry page — rather than at a hub this edition does not have yet.
const koDestinationItems = [
  { href: "/ko/guides/attractions/teamlab-tokyo-tickets", label: "팀랩 플래닛" },
  { href: "/ko/guides/attractions/tokyo-disney-tickets",  label: "도쿄 디즈니" },
  { href: "/ko/guides/attractions/usj-tickets-express-pass", label: "오사카 USJ" },
  { href: "/guides/attractions/things-to-do-tokyo",       label: "도쿄 관광(영어)" },
];

const koNavItems = [
  { href: "/ko/guides/attractions/shibuya-sky-tickets", label: "시부야 스카이" },
  { href: "/ko/guides/esim/best-esim-japan",            label: "일본 eSIM"     },
  { href: "/guides/transport/tokyo-airport-transfer",   label: "공항 교통(영어)" },
  { href: "/guides/money",                              label: "결제(영어)"    },
];

// ── ไทย nav (added 2026-10-21 with the five Thai pages) ─────────────────────
//
// Same shape and the same rule, with "(ภาษาอังกฤษ)" as the marker for a
// destination that has not been translated.
const thDestinationItems = [
  { href: "/th/guides/attractions/teamlab-tokyo-tickets", label: "teamLab Planets" },
  { href: "/th/guides/attractions/tokyo-disney-tickets",  label: "โตเกียวดิสนีย์" },
  { href: "/th/guides/attractions/usj-tickets-express-pass", label: "USJ โอซาก้า" },
  { href: "/guides/attractions/things-to-do-tokyo",       label: "เที่ยวโตเกียว (อังกฤษ)" },
];

const thNavItems = [
  { href: "/th/guides/attractions/shibuya-sky-tickets", label: "Shibuya Sky"      },
  { href: "/th/guides/esim/best-esim-japan",            label: "eSIM ญี่ปุ่น"      },
  { href: "/guides/transport/tokyo-airport-transfer",   label: "รถไฟสนามบิน (อังกฤษ)" },
  { href: "/guides/money",                              label: "การจ่ายเงิน (อังกฤษ)" },
];

type Copy = {
  tagline: string;
  destinationsLabel: string;
  guidesLabel: string;
  planLabel: string;
  allGuidesLabel: string;
  allGuidesHref: string;
  /** Where the logo goes: the site's home in English, that edition's entry page otherwise. */
  homeHref: string;
  ctaHref: string;
  ctaLabel: string;
  menuLabel: string;
  langLabel: string;
  destinations: { href: string; label: string }[];
  nav: { href: string; label: string }[];
};

const COPY: Record<Locale, Copy> = {
  en: {
    tagline: "Tickets, tours & trip prep",
    destinationsLabel: "Destinations",
    guidesLabel: "Guides",
    planLabel: "Plan your trip",
    allGuidesLabel: "All Guides",
    allGuidesHref: "/guides",
    homeHref: "/",
    ctaHref: "/guides/attractions",
    ctaLabel: "Find Tours & Tickets →",
    menuLabel: "Toggle menu",
    langLabel: "Language",
    destinations: destinationItems,
    nav: navItems,
  },
  "zh-tw": {
    tagline: "門票、行程與行前準備",
    destinationsLabel: "目的地",
    guidesLabel: "攻略",
    planLabel: "行前準備",
    allGuidesLabel: "全部攻略（英文）",
    allGuidesHref: "/guides",
    homeHref: LOCALE_HOME["zh-tw"],
    ctaHref: "/zh-tw/guides/attractions",
    ctaLabel: "找門票與一日遊 →",
    menuLabel: "開關選單",
    langLabel: "語言",
    destinations: zhDestinationItems,
    nav: zhNavItems,
  },
  "zh-cn": {
    tagline: "门票、行程与行前准备",
    destinationsLabel: "目的地",
    guidesLabel: "攻略",
    planLabel: "行前准备",
    allGuidesLabel: "全部攻略（英文）",
    allGuidesHref: "/guides",
    homeHref: LOCALE_HOME["zh-cn"],
    ctaHref: "/zh-cn/guides/attractions",
    ctaLabel: "找门票与一日游 →",
    menuLabel: "开关菜单",
    langLabel: "语言",
    destinations: cnDestinationItems,
    nav: cnNavItems,
  },
  ko: {
    tagline: "티켓, 투어, 여행 준비",
    destinationsLabel: "목적지",
    guidesLabel: "가이드",
    planLabel: "여행 준비",
    allGuidesLabel: "전체 가이드(영어)",
    allGuidesHref: "/guides",
    homeHref: LOCALE_HOME.ko,
    ctaHref: "/ko/guides/attractions/shibuya-sky-tickets",
    ctaLabel: "시부야 스카이 예약 →",
    menuLabel: "메뉴 열기・닫기",
    langLabel: "언어",
    destinations: koDestinationItems,
    nav: koNavItems,
  },
  th: {
    tagline: "ตั๋ว ทัวร์ และการเตรียมทริป",
    destinationsLabel: "จุดหมาย",
    guidesLabel: "ไกด์",
    planLabel: "เตรียมทริป",
    allGuidesLabel: "ไกด์ทั้งหมด (อังกฤษ)",
    allGuidesHref: "/guides",
    homeHref: LOCALE_HOME.th,
    ctaHref: "/th/guides/attractions/shibuya-sky-tickets",
    ctaLabel: "จองตั๋ว Shibuya Sky →",
    menuLabel: "เปิด・ปิดเมนู",
    langLabel: "ภาษา",
    destinations: thDestinationItems,
    nav: thNavItems,
  },
};

/** The order the switch lists the languages in — the site's own first. */
const SWITCH_ORDER: Locale[] = LOCALES;

export default function Header() {
  const router = useRouter();
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [destOpen, setDestOpen]   = useState(false);
  const destRef                   = useRef<HTMLDivElement>(null);

  // router.pathname is the page's own route (these are all static pages), which is
  // what lib/i18n.ts keys both the locale and the page pairs off.
  const locale = localeOf(router.pathname);
  const copy = COPY[locale];
  const pair = pairFor(router.pathname);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close the Destinations dropdown on an outside click or Escape — it opens on click as
  // well as hover so it works on a touch screen that is wide enough for the desktop nav.
  useEffect(() => {
    if (!destOpen) return;
    const onClick = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDestOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [destOpen]);

  /**
   * The language switch, listing only the languages this exact page exists in. A
   * switch that drops you on a different page — or on a 404 — is worse than no
   * switch, so pages outside lib/i18n.ts's list show nothing at all, and the five
   * pages that are Chinese-only do not offer 한국어 or ไทย.
   */
  const languages = pair
    ? SWITCH_ORDER.map((target) => ({ target, href: routeOf(pair, target) })).filter(
        (l): l is { target: Locale; href: string } => l.href !== null,
      )
    : [];

  const langSwitch = languages.length > 1 && (
    <div className={styles.langSwitch} aria-label={copy.langLabel}>
      {languages.map(({ target, href }, i) => (
        <Fragment key={target}>
          {i > 0 && <span className={styles.langSep} aria-hidden="true">／</span>}
          <Link
            href={href}
            hrefLang={HTML_LANG[target]}
            className={`${styles.langLink}${locale === target ? ` ${styles.langCurrent}` : ""}`}
            aria-current={locale === target ? "true" : undefined}
          >
            {LOCALE_NAME[target]}
          </Link>
        </Fragment>
      ))}
    </div>
  );

  return (
    <header className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ""}`}>
      <div className={styles.inner}>
        <Link href={copy.homeHref} className={styles.logo}>
          <span className={styles.logoText}>Japan <em>Travel Kit</em></span>
          <span className={styles.logoTag}>{copy.tagline}</span>
        </Link>

        {/* Text-only on desktop so all five fit beside the logo and the CTA. */}
        <nav className={styles.nav}>
          <Link href={copy.nav[0].href} className={styles.navLink}>
            {copy.nav[0].label}
          </Link>

          <div
            ref={destRef}
            className={styles.navGroup}
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}
          >
            <button
              type="button"
              className={styles.navLink}
              aria-expanded={destOpen}
              aria-haspopup="true"
              onClick={() => setDestOpen((v) => !v)}
            >
              {copy.destinationsLabel}
              <svg className={styles.navChevron} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`${styles.dropdown}${destOpen ? ` ${styles.dropdownOpen}` : ""}`}>
              {copy.destinations.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.dropdownLink}
                  onClick={() => setDestOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {copy.nav.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          {langSwitch}
          <Link href={copy.ctaHref} className={styles.ctaBtn}>{copy.ctaLabel}</Link>
        </div>

        <button
          className={`${styles.hamburger}${open ? ` ${styles.open}` : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={copy.menuLabel}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Mobile: Destinations is an always-expanded list rather than a second tap target. */}
      <nav className={`${styles.mobileNav}${open ? ` ${styles.open}` : ""}`}>
        <p className={styles.mobileLabel}>{copy.guidesLabel}</p>
        <Link href={copy.nav[0].href} className={styles.mobileLink} onClick={() => setOpen(false)}>
          {copy.nav[0].label}
        </Link>

        <p className={styles.mobileLabel}>{copy.destinationsLabel}</p>
        <div className={styles.mobileSub}>
          {copy.destinations.map((item) => (
            <Link key={item.href} href={item.href} className={styles.mobileSubLink} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>

        <p className={styles.mobileLabel}>{copy.planLabel}</p>
        {copy.nav.slice(1).map((item) => (
          <Link key={item.href} href={item.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href={copy.allGuidesHref} className={styles.mobileLink} onClick={() => setOpen(false)}>
          {copy.allGuidesLabel}
        </Link>

        {langSwitch && (
          <>
            <p className={styles.mobileLabel}>{copy.langLabel}</p>
            <div className={styles.langSwitchMobile}>{langSwitch}</div>
          </>
        )}

        <Link href={copy.ctaHref} className={styles.mobileCta} onClick={() => setOpen(false)}>
          {copy.ctaLabel}
        </Link>
      </nav>
    </header>
  );
}
