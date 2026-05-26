import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Head from "next/head";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GA_MEASUREMENT_ID, pageview } from "../lib/gtag";

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
