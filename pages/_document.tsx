import Document, { Html, Head, Main, NextScript, type DocumentContext, type DocumentInitialProps } from "next/document";
import { GA_MEASUREMENT_ID } from "../lib/gtag";
import { fontVariableClass } from "../lib/fonts";
import { siteJsonLd } from "../lib/structured-data";
import { HTML_LANG, localeOf } from "../lib/i18n";

type Props = DocumentInitialProps & { lang: string };

export default function MyDocument({ lang }: Props) {
  return (
    // The next/font variable classes go on <html>, not on a wrapper inside <body>:
    // globals.css composes --font-body / --font-display from them at :root, and a var()
    // that is undefined where it is read makes the whole declaration invalid.
    <Html lang={lang} className={fontVariableClass}>
      <Head>
        <meta name="theme-color" content="#23211f" />
        <meta name="google-site-verification" content="RzJ62Gbm4Ng2tGuEyIW1CV4-UjWKOpZRkskuAGP52Gc" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Organization + WebSite, on every page. _document never reaches the client
            bundle, so the graph costs nothing in JS. Pages add their own Article,
            ItemList, FAQPage and BreadcrumbList blocks; consumers merge them all. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteJsonLd() }} />
        {GA_MEASUREMENT_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{page_path:window.location.pathname});`,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/**
 * `lang` on <html> is resolved from the route rather than hard-coded "en", so the
 * pages under /zh-tw declare zh-Hant-TW. `ctx.pathname` is the page's own route at
 * static-generation time, which is exactly what lib/i18n.ts keys the locale off.
 */
MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<Props> => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, lang: HTML_LANG[localeOf(ctx.pathname)] };
};
