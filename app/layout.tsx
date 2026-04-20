import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://japan-travel-kit.com"),
  title: {
    default: "Japan Travel Kit — Practical Travel Info for Japan",
    template: "%s | Japan Travel Kit",
  },
  description:
    "Your complete guide to visiting Japan. Compare SIM cards, find the best travel deals, and get practical travel tips for your trip to Japan. Updated 2025.",
  keywords: [
    "Japan travel",
    "Japan SIM card",
    "Japan tourist",
    "travel Japan",
    "Japan travel guide",
    "Japan eSIM",
  ],
  authors: [{ name: "Japan Travel Kit" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://japan-travel-kit.com",
    siteName: "Japan Travel Kit",
    title: "Japan Travel Kit — Practical Travel Info for Japan",
    description:
      "Your complete guide to visiting Japan. Compare SIM cards, find the best travel deals, and get practical travel tips.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Japan Travel Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Travel Kit — Practical Travel Info for Japan",
    description:
      "Your complete guide to visiting Japan. Compare SIM cards, find the best travel deals, and practical travel tips.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {ADSENSE_PUB_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
