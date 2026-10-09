import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Head from "next/head";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GA_MEASUREMENT_ID, pageview, trackAffiliateClick } from "../lib/gtag";

// アフィリエイト/比較対象ASPの判定表。未承認ASPの素URLも需要把握のため計測対象に含める。
const AFFILIATE_PARTNERS: { partner: string; hosts: string[] }[] = [
  { partner: "klook", hosts: ["klook.com"] },
  { partner: "airalo", hosts: ["airalo.pxf.io", "airalo.com"] },
  { partner: "sakura", hosts: ["sakuramobile.jp"] },
  { partner: "breeze", hosts: ["breezesim.com"] },
  { partner: "holafly", hosts: ["holafly.com"] },
  { partner: "esimgo", hosts: ["esimgo", "esim-go"] },
  { partner: "wise", hosts: ["wise.com"] },
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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

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
    <div className={plusJakartaSans.className} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
    </>
  );
}
