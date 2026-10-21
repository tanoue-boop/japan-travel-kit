import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import "../styles/globals.css";
import { fontVariableClass } from "../lib/fonts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LanguageNotice from "../components/LanguageNotice";
import { GA_MEASUREMENT_ID, pageview, trackAffiliateClick } from "../lib/gtag";

// アフィリエイト/比較対象ASPの判定表。未承認ASPの素URLも需要把握のため計測対象に含める。
const AFFILIATE_PARTNERS: { partner: string; hosts: string[] }[] = [
  { partner: "klook", hosts: ["klook.com"] },
  // GetYourGuide links are plain getyourguide.com URLs carrying partner_id in the
  // query (see lib/gyg-links.ts), so one host entry attributes all of them.
  { partner: "getyourguide", hosts: ["getyourguide.com"] },
  { partner: "airalo", hosts: ["airalo.pxf.io", "airalo.com"] },
  { partner: "sakura", hosts: ["sakuramobile.jp"] },
  { partner: "breeze", hosts: ["breezesim.com"] },
  { partner: "holafly", hosts: ["holafly.com"] },
  { partner: "esimgo", hosts: ["esimgo", "esim-go"] },
  // wise.prf.hn is the approved Partnerize click host (see lib/wise-links.ts);
  // wise.com stays listed so any stray plain link is still attributed.
  { partner: "wise", hosts: ["wise.prf.hn", "wise.com"] },
  { partner: "revolut", hosts: ["revolut.com"] },
  { partner: "safetywing", hosts: ["safetywing.com"] },
  { partner: "heymondo", hosts: ["heymondo.com"] },
  { partner: "worldnomads", hosts: ["worldnomads.com"] },
];

const resolvePartner = (hostname: string): string | null => {
  const host = hostname.toLowerCase();
  for (const { partner, hosts } of AFFILIATE_PARTNERS) {
    if (hosts.some((h) => host.includes(h))) return partner;
  }
  return null;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const handleRouteChange = (url: string) => pageview(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  // 全ページ共通のアフィリエイトクリック計測。個別リンクは書き換えず document 1箇所で捕捉する。
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.hostname === window.location.hostname) return;

      const partner = resolvePartner(url.hostname);
      if (!partner) return;

      trackAffiliateClick({
        partner,
        link_url: anchor.href.slice(0, 200),
        page_path: window.location.pathname,
        link_text: (anchor.innerText || anchor.textContent || "").trim().slice(0, 80),
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <>
      <Head>
        <meta property="og:image" content="https://www.japan-travel-kit.com/og-image.png" />
        <meta name="twitter:image" content="https://www.japan-travel-kit.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    {/* The font variables are declared on <html> in _document.tsx, so body's
        font-family: var(--font-body) in globals.css resolves and is inherited from here down.
        This wrapper only owns the sticky-footer layout. The class is kept so the generated
        font CSS stays in this page bundle. */}
    <div
      className={fontVariableClass}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      {/* Under the sticky header, above the page: a client-only offer of the reader's
          own language, when the browser asks for one the site publishes. Nothing is
          server-rendered here and nothing redirects — see the component. */}
      <LanguageNotice />
      <main style={{ flex: 1 }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
    </>
  );
}
