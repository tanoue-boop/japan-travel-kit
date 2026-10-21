"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/LanguageNotice.module.css";
import {
  HTML_LANG,
  hasTranslation,
  localeFromBrowserLanguages,
  localeOf,
  switchTargetFor,
  type TranslatedLocale,
} from "../lib/i18n";

/**
 * One line at the top of the page offering the reader's own language.
 *
 * Deliberately not a redirect. Serving a different page by Accept-Language shows
 * Googlebot — which crawls from the US with no language preference — something no
 * reader sees, which is how a translated set gets read as cloaking and loses the
 * hreflang cluster it was built for. An offer costs the reader one tap and costs the
 * site nothing.
 *
 * It is also not in the server-rendered HTML: the whole decision depends on
 * `navigator.languages`, which only exists in the browser, and a bar baked into the
 * static page would appear for every visitor and every crawler regardless. The state
 * starts null, the effect fills it on mount, so the first paint and the HTML in
 * .next/server/pages carry nothing.
 *
 * Shown only when the browser asks for a language the site actually publishes (see
 * localeFromBrowserLanguages — zh-TW/zh-HK/zh-Hant, zh-CN/zh-SG/zh-Hans, ko, th; a
 * bare `zh` is not guessed), that language is not the one the page is already in, and
 * the reader has not dismissed it before.
 */

type Copy = {
  /** When this exact page exists in that language. */
  hasPage: string;
  /** When it does not, and the link goes to that edition's entry page instead. */
  siteOnly: string;
  close: string;
};

const COPY: Record<TranslatedLocale, Copy> = {
  "zh-tw": {
    hasPage: "此頁面有繁體中文版",
    siteOnly: "本站有繁體中文版",
    close: "關閉",
  },
  "zh-cn": {
    hasPage: "此页面有简体中文版",
    siteOnly: "本站有简体中文版",
    close: "关闭",
  },
  ko: {
    hasPage: "이 페이지는 한국어로도 볼 수 있습니다",
    siteOnly: "이 사이트에는 한국어판이 있습니다",
    close: "닫기",
  },
  th: {
    hasPage: "หน้านี้มีฉบับภาษาไทย",
    siteOnly: "เว็บไซต์นี้มีฉบับภาษาไทย",
    close: "ปิด",
  },
};

/**
 * Remembers the dismissal, keyed by the language that was offered: closing the 繁體中文
 * bar should not also hide the 한국어 one from a phone that later changes language.
 * Everything touching localStorage is wrapped, because it throws rather than returning
 * null in a Safari private window and in a third-party iframe.
 */
const STORAGE_KEY = "jtk.langNotice.dismissed";

function readDismissed(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeDismissed(locale: TranslatedLocale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage disabled or full. The bar closes for this page view either way.
  }
}

export default function LanguageNotice() {
  const router = useRouter();
  const [offered, setOffered] = useState<TranslatedLocale | null>(null);

  useEffect(() => {
    const wanted = localeFromBrowserLanguages(
      navigator.languages ?? (navigator.language ? [navigator.language] : []),
    );
    if (!wanted || wanted === localeOf(router.pathname)) {
      setOffered(null);
      return;
    }
    if (readDismissed() === wanted) {
      setOffered(null);
      return;
    }
    // No "nowhere to go" case to filter out: localeFromBrowserLanguages only ever
    // names one of the four published editions, and switchTargetFor always resolves
    // one of those to a real URL — the translation, or that edition's entry page.
    setOffered(wanted);
    // Re-run per route: the reader may navigate from an English article to a page that
    // does have their language, and the wording below differs between the two.
  }, [router.pathname]);

  if (!offered) return null;

  const copy = COPY[offered];
  const href = switchTargetFor(router.pathname, offered);
  const text = hasTranslation(router.pathname, offered) ? copy.hasPage : copy.siteOnly;

  return (
    <div className={styles.bar} lang={HTML_LANG[offered]}>
      <div className={styles.inner}>
        <Link href={href} hrefLang={HTML_LANG[offered]} className={styles.link}>
          {text} →
        </Link>
        <button
          type="button"
          className={styles.close}
          aria-label={copy.close}
          onClick={() => {
            writeDismissed(offered);
            setOffered(null);
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
