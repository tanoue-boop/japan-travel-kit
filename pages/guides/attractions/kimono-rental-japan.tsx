import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  asakusaKimonoAiwafukuNo2,
  asakusaKimonoTeaCeremony,
  asakusaKimonoYae,
  kyotoGionKimonoTeaCeremony,
  kyotoHighlightBusTour,
  kyotoKimonoAiwafukuGion,
  kyotoKimonoOokiniArashiyama,
  tokyoSightseeingBusTour,
} from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygKyotoKimono, gygTokyoKimono } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA links — Klook affiliate redirects (tracking links, both listings confirmed live
// 19 Oct 2026).
const KIMONO_ASAKUSA_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304896&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F100721-kimono-rental-experience-asakusa-kimono-mitsuki-tokyo%2F";
const KIMONO_KYOTO_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304900&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F1079-one-day-kimono-rental-kyoto%2F";

/**
 * 12 Nov 2026 (task-jtk-20261112-R06). This page is the Japan-wide comparison hub for
 * "kimono rental japan"; asakusa-kimono-rental and kyoto-kimono-rental keep the city terms.
 * Read on the shops' own websites on 12 November 2026:
 *   ewha-yifu.com (Rikawafuku, Asakusa)   Basic Plan ¥4,500 tax incl.; no hair service; 45–70
 *                                         minutes reception to departure; final return 17:30;
 *                                         last dressing reception 16:00; online booking up to 10
 *                                         minutes before; free online cancellation to the day
 *                                         before, 100% fee on the day; Kyoto peak seasons
 *                                         (cherry blossom, autumn foliage, New Year): reserve
 *   aiwafuku.com/en                       women's one-day plan ¥4,300 Asakusa / ¥5,500 Kyoto
 *                                         with easy hair set; next-day return before 15:00 for
 *                                         ¥2,200 Asakusa / ¥1,100 Kyoto; peak-season prices vary
 *   waraku-kimono.jp (Kyoto)              All-Inclusive Plan with Hair Styling ¥3,980 + tax from
 *                                         1 Oct; dressing about 15 minutes, 45–60 minutes in
 *                                         the shop; return by 17:30, last appointment 16:00;
 *                                         bookings open 20 days to 1 month ahead; no fee if
 *                                         cancelled by the day before; Gion, Kiyomizu,
 *                                         Arashiyama, Kyoto Station stores
 *   kyokomachi-kimono.com (Kyoto)         Kyokomachi Plan ¥5,500 (¥4,400 online), Set Plan ¥3,300,
 *                                         Silk Homongi ¥17,600 (¥16,500 online), Luxurious Silk
 *                                         Furisode ¥55,000 (¥33,000 online); hair set +¥1,100
 * Aiwafuku's Asakusa 16:30 / 17:30 return split was read on aiwafuku.com on 21 Oct 2026 for
 * the Asakusa guide. No Klook price is quoted anywhere on this page.
 *
 * 27 Nov 2026 (task-jtk-20261127-R16): the figures above were re-read and still hold, and the page
 * now covers the cities beyond Tokyo and Kyoto. Read on vasara-h.co.jp / en.vasara-h.co.jp:
 *   one national price list at all 23 VASARA shops, incl. Asakusa (3 shops), Kamakura Komachi-dori,
 *   Kawagoe Station, Kyoto Station, Osaka Umeda, Kanazawa Station and Kanazawa Kenrokuen — online
 *   prices, tax incl.: Standard kimono ¥3,400; Standard yukata ¥3,630; Couple Standard ¥10,208;
 *   Homongi Standard ¥11,990; Furisode Standard ¥43,890 (not listed at Kanazawa Kenrokuen).
 *   Women's plans include a free standard hair set; One Star ¥1,650, Two Star ¥2,420.
 *   Return by 17:30 on the day, next-day return ¥2,200; online booking until 30 min before.
 *   Cancellation (kimono/yukata plans): 50% the day before, 100% on the day.
 *   Cold weather: stole ¥550, haori ¥550; heat-tech with an open neck and leggings can be worn under.
 * Kyokomachi Couple Plan ¥11,000; Aiwafuku yukata mid-June to August (aiwafuku.com/en).
 */
const TODAY_ISO = "2026-11-27";
const CHECKED = checkedLabel(TODAY_ISO);

const TITLE = "Kimono Rental Japan 2026: Prices, Best Cities & When to Book";
const H1 = "Kimono Rental in Japan 2026: Prices, Best Cities & How Far Ahead to Book";
const DESC =
  "Kimono rental in Japan costs ¥3,300–¥5,500, often with a free hair set. Compare Kyoto, Asakusa, Kamakura, Osaka and Kanazawa, and how far ahead to book.";

const SRC = {
  rikawafuku: { label: "Rikawafuku Asakusa basic plan", href: "https://ewha-yifu.com/en/shops/asakusa/kimono-planlist/basic-plan" },
  rikawafukuFaq: { label: "Rikawafuku FAQ", href: "https://ewha-yifu.com/en/faq" },
  aiwafuku: { label: "Aiwafuku plans", href: "https://www.aiwafuku.com/en/" },
  waraku: { label: "Waraku Kyoto all-inclusive plan", href: "https://waraku-kimono.jp/en/?p=5899" },
  warakuFaq: { label: "Waraku FAQ", href: "https://waraku-kimono.jp/en/faq/" },
  kyokomachi: { label: "Kyokomachi plans", href: "https://www.kyokomachi-kimono.com/e/plan/" },
  vasara: { label: "VASARA plans and prices", href: "https://en.vasara-h.co.jp/plan/" },
  vasaraShops: { label: "VASARA shop list", href: "https://vasara-h.co.jp/" },
  vasaraFaq: { label: "VASARA FAQ", href: "https://en.vasara-h.co.jp/faq" },
  vasaraItems: { label: "VASARA small-item rental", href: "https://vasara-h.co.jp/plan3/komono.html" },
};

function LastChecked({ sources }: { sources: { label: string; href: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {TODAY_ISO}. Official source{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? "; " : ""}
          <a href={s.href} target="_blank" rel="noopener" style={{ color: "var(--text)", fontWeight: 600 }}>
            {s.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

const priceRows = [
  { shop: "VASARA, 23 shops (Asakusa, Kamakura, Kawagoe, Kyoto, Osaka, Kanazawa and more)", plan: "Standard kimono plan with free simple hair set (women), booked online", price: "¥3,400" },
  { shop: "Rikawafuku, Asakusa (Tokyo)", plan: "Basic Plan (kimono, obi, sandals, bag, dressing, bag storage; no hair)", price: "¥4,500" },
  { shop: "Aiwafuku, Asakusa (Tokyo)", plan: "Women's one-day plan with easy hair set", price: "¥4,300" },
  { shop: "Aiwafuku, Kyoto", plan: "Women's one-day plan with easy hair set", price: "¥5,500" },
  { shop: "Waraku, Kyoto (Gion, Kiyomizu, Arashiyama, Kyoto Station)", plan: "All-Inclusive Plan with Hair Styling", price: "¥3,980 + tax" },
  { shop: "Kyokomachi, Kyoto", plan: "Set Plan / Kyokomachi Plan (booked online; hair set +¥1,100)", price: "¥3,300 / ¥4,400" },
  { shop: "Kyokomachi, Kyoto", plan: "Silk Homongi / Luxurious Silk Furisode (booked online)", price: "¥16,500 / ¥33,000" },
];

const cityRows = [
  {
    city: "Kyoto",
    shops: "Waraku (Gion, Kiyomizu, Arashiyama, Kyoto Station), Aiwafuku, Kyokomachi, VASARA Kyoto Station",
    prices: "¥3,300–¥5,500",
    backdrops: "Hanamikoji, Yasaka Pagoda, Ninenzaka, Kiyomizu-dera; Arashiyama bamboo grove",
    best: "The classic old-town photographs",
    guide: { href: "/guides/attractions/kyoto-kimono-rental", label: "Kyoto kimono rental: shops compared" },
  },
  {
    city: "Tokyo — Asakusa",
    shops: "Rikawafuku, Aiwafuku, VASARA (three Asakusa shops)",
    prices: "¥3,400–¥4,500",
    backdrops: "Kaminarimon, Nakamise-dori, Senso-ji, Skytree views",
    best: "An easy half-day inside a Tokyo trip",
    guide: { href: "/guides/attractions/asakusa-kimono-rental", label: "Asakusa kimono rental: shops compared" },
  },
  {
    city: "Kamakura",
    shops: "VASARA Kamakura Komachi-dori (by JR Kamakura Station)",
    prices: "¥3,400",
    backdrops: "Komachi-dori, Tsurugaoka Hachimangu",
    best: "A day trip from Tokyo with shrines and the sea",
    guide: { href: "/guides/attractions/kamakura-day-trip", label: "Kamakura day trip" },
  },
  {
    city: "Kawagoe",
    shops: "VASARA Kawagoe Station",
    prices: "¥3,400",
    backdrops: "Kurazukuri warehouse street, Toki no Kane bell tower",
    best: "Edo-era streets an hour from Tokyo",
    guide: { href: "/guides/attractions/kawagoe-day-trip", label: "Kawagoe day trip" },
  },
  {
    city: "Osaka",
    shops: "VASARA Osaka Umeda and Osaka Namba",
    prices: "¥3,400",
    backdrops: "Osaka Castle park, Dotonbori and Namba",
    best: "A kimono day if Osaka is your only base",
    guide: { href: "/guides/attractions/things-to-do-osaka", label: "Things to do in Osaka" },
  },
  {
    city: "Kanazawa",
    shops: "VASARA Kanazawa Station and Kanazawa Kenrokuen",
    prices: "¥3,400",
    backdrops: "Higashi Chaya district, Kenrokuen garden",
    best: "Geisha tea-house streets outside Kyoto",
    guide: { href: "/guides/attractions/kanazawa-2-day-itinerary", label: "Kanazawa 2-day itinerary" },
  },
];

const planRows = [
  { plan: "Kimono (komon, standard)", price: "¥3,300–¥5,500", includes: "Kimono, obi, undergarments, bag, tabi socks, sandals, dressing; simple hair set free at VASARA, Aiwafuku and Waraku, +¥1,100 at Kyokomachi" },
  { plan: "Yukata (summer cotton kimono)", price: "¥3,630 (VASARA)", includes: "Yukata, obi, undershirt, basket bag, geta sandals, hairpin, dressing; Aiwafuku offers women's yukata mid-June to August" },
  { plan: "Couple (one women's + one men's set)", price: "¥10,208 (VASARA) – ¥11,000 (Kyokomachi)", includes: "Both full sets and dressing; the hair set applies to the women's plan" },
  { plan: "Visiting kimono (homongi, silk or formal)", price: "¥11,990 (VASARA) – ¥16,500 (Kyokomachi online)", includes: "Semi-formal kimono for weddings or ceremonies; VASARA lets you preview and reserve the kimono in advance" },
  { plan: "Furisode (long-sleeved, formal)", price: "¥33,000 (Kyokomachi online) – ¥43,890 (VASARA)", includes: "The most formal unmarried women's kimono; VASARA charges 30% from 14 days before for formal plans" },
];

const winterRows = [
  { item: "Haori jacket or stole over the kimono", detail: "¥550 each at VASARA; capes also offered, but none is as warm as a down coat" },
  { item: "Your own thermal layers underneath", detail: "VASARA dresses you over open-necked heat-tech tops, leggings or tights you bring" },
  { item: "Return time", detail: "Still 17:30, and it gets dark before then in December and January — start in the morning" },
];

const bookingRows = [
  { when: "Any off-peak weekday", advice: "A few days ahead is enough; online booking stays open until 30 minutes before the slot at VASARA and 10 minutes before at Rikawafuku" },
  { when: "Weekends and Japanese holidays", advice: "Book once your day is fixed, especially if you want a morning start and the longest time in the kimono" },
  { when: "Cherry blossom, autumn leaves, New Year (Kyoto)", advice: "Book the day the calendar opens: Waraku takes bookings 20 days to 1 month ahead, and Rikawafuku recommends reserving for these seasons" },
  { when: "Formal plans (homongi, furisode)", advice: "Two weeks or more — VASARA's cancellation fee on formal plans starts 14 days before, and it offers a free preview to reserve the kimono" },
  { when: "Children's plans", advice: "Book early — Kyokomachi marks its kids' plan as limited availability" },
];

const steps = [
  {
    title: "Book online and pick your area",
    desc: "Reserve a shop in Asakusa or one of Kyoto's areas, and choose a morning slot if you want the full day. Online booking locks in your time and, at several shops, a lower price than at the counter.",
  },
  {
    title: "Arrive and choose your kimono",
    desc: "At the shop you browse hundreds of patterns and colours, then pick an obi (sash) and accessories to match. Many shops have multilingual staff to help you coordinate a look.",
  },
  {
    title: "Get dressed — and add a hair-set",
    desc: `A professional dresser (kitsuke) puts the kimono on for you. Waraku puts the dressing itself at about 15 minutes, but the whole visit from check-in to walking out is 45 to 60 minutes there and 45 to 70 minutes at Rikawafuku in Asakusa, as listed on ${CHECKED}.`,
  },
  {
    title: "Explore — then get back before the cut-off",
    desc: `Same-day return is standard and the deadline is earlier than people assume: 17:30 at Rikawafuku and Waraku, and 16:30 at Aiwafuku in Asakusa if you arrived by 12:00. Next-day return is an add-on at some shops — Aiwafuku charges ¥2,200 in Asakusa and ¥1,100 in Kyoto for a return before 15:00 the next day (${CHECKED}).`,
  },
];

const faqItems = [
  {
    q: "How much does kimono rental cost in Japan?",
    a: `A standard one-day plan costs ¥3,300 to ¥5,500 at the official shops checked on ${CHECKED}: VASARA charges ¥3,400 online at all 23 of its shops, from Asakusa and Kamakura to Osaka and Kanazawa, Rikawafuku's Asakusa basic plan is ¥4,500, Aiwafuku's women's plan with an easy hair set is ¥4,300 in Asakusa and ¥5,500 in Kyoto, Waraku's Kyoto all-inclusive plan with hair styling is ¥3,980 plus tax, and Kyokomachi's Kyoto plans start at ¥3,300. Silk visiting kimono and furisode plans cost more — ¥16,500 and ¥33,000 online at Kyokomachi. Aiwafuku notes that peak-season prices may vary.`,
  },
  {
    q: "How far ahead should I book a kimono rental?",
    a: "A few days ahead is enough on most weekdays, and online booking stays open until 30 minutes before the slot at VASARA and 10 minutes before at Rikawafuku. For weekends, and above all for Kyoto's cherry-blossom, autumn-foliage and New Year seasons, book as soon as your dates are fixed: Waraku opens bookings 20 days to 1 month ahead. Formal homongi and furisode plans need two weeks or more. Rikawafuku and Waraku cancel free up to the day before; VASARA charges 50% the day before.",
  },
  {
    q: "Which city is best for kimono rental?",
    a: "Kyoto is best if the photographs are the point of the trip, with Gion, Kiyomizu and Arashiyama as the classic setting and the widest choice of shops. Asakusa suits a half-day inside a Tokyo itinerary, and Kamakura, Kawagoe and Kanazawa are quieter old-town alternatives with VASARA shops at the same ¥3,400 standard price. Osaka works if it is your only base.",
  },
  {
    q: "Can I wear a kimono in winter?",
    a: `Yes. Shops rent through the winter and add warm layers: VASARA rents a haori jacket or a stole for ¥550 each and will dress you over your own open-necked thermal top and leggings, though it notes these are not as warm as a down coat (${CHECKED}). The 17:30 return stays the same, so start in the morning while it is light.`,
  },
  {
    q: "What is included in a kimono rental plan?",
    a: `The kimono, undergarments, obi, sandals, tabi socks, a small bag and professional dressing are standard. Rikawafuku's Asakusa basic plan also stores your bags but has no hair service; VASARA, Aiwafuku and Waraku include a simple hair set; Kyokomachi charges ¥1,100 for one. Photo shoots, premium silk kimono and rickshaw rides are the usual paid extras. As listed on ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/kimono-rental-japan") } });

export default function KimonoRentalJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/kimono-rental-japan",
              headline: H1,
              updated,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Kimono Rental in Japan", item: "https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" },
              ],
            }),
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Kimono Rental in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            Prices from the shops&apos; own websites, six cities compared, and the return deadline that decides
            how much of the day you actually get.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "6 cities compared", "Official shop prices"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              Kimono rental in Japan costs ¥3,300 to ¥5,500 for a standard one-day plan at the official shops
              checked on {CHECKED}, and a simple hair set is free at VASARA, Aiwafuku and Waraku (¥1,100 at
              Kyokomachi).
            </strong>{" "}
            The shop visit takes 45 to 70 minutes and the outfit goes back by 17:30 the same day. A few
            days&apos; notice is enough on most weekdays, but for weekends and Kyoto&apos;s cherry-blossom,
            autumn-leaf and New Year seasons book the day the calendar opens — 20 days to 1 month ahead at
            Waraku.
          </p>
        </section>

        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Standard plan</p>
                <p className={styles.verdictStatValue}>¥3,300–¥5,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time in the shop</p>
                <p className={styles.verdictStatValue}>45–70 minutes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Return by</p>
                <p className={styles.verdictStatValue}>17:30 same day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Peak-season booking</p>
                <p className={styles.verdictStatValue}>20 days–1 month ahead</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> choose <strong>Kyoto</strong> for the old-town photographs,{" "}
              <strong>Asakusa</strong> for an easy half-day inside a Tokyo trip, or <strong>Kamakura</strong> and{" "}
              <strong>Kanazawa</strong> for quieter streets; take a morning slot, and build
              the walk back to the shop into your route. Details from the shops&apos; websites, {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={KIMONO_ASAKUSA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kimono Rental — Asakusa →
              </KlookLink>
              <KlookLink href={KIMONO_KYOTO_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kimono Rental — Kyoto →
              </KlookLink>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <GygCompareButton slug="kimono-rental-japan" listing={gygTokyoKimono} label="Tokyo on GetYourGuide →" />
              <GygCompareButton slug="kimono-rental-japan" listing={gygKyotoKimono} label="Kyoto on GetYourGuide →" />
            </div>
          </div>
        </div>

        <BookingEsimCard />

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How much does kimono rental cost in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>¥3,300 to ¥5,500 for a standard one-day plan, tax included unless marked.</strong> Silk
            visiting kimono (homongi) and furisode are a different price tier, from ¥16,500 at the Kyoto shop
            that lists them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Shop", "Plan", "Price (official site)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td colSpan={2} style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Standard plan ¥3,300–¥5,500 across Japan; silk plans from ¥16,500
                    </td>
                  </tr>
                  {priceRows.map((r) => (
                    <tr key={`${r.shop}-${r.plan}`}>
                      <td className={styles.tdProvider}>{r.shop}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.plan}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)", whiteSpace: "nowrap" }}>{r.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[SRC.vasara, SRC.rikawafuku, SRC.aiwafuku, SRC.waraku, SRC.kyokomachi]} />
          <p className={styles.bodyText}>
            Booking online is often the cheaper route: VASARA lists its standard plan at ¥4,091 plus tax at the
            counter and ¥3,091 plus tax (¥3,400 with tax) online, Kyokomachi&apos;s online prices are ¥1,100 below its counter prices on most plans, and
            Aiwafuku notes that prices may vary in peak seasons. Prices on the booking sites below change by
            date, so open a listing to see the figure for your day.
          </p>
        </section>

        {/* Plan types */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Plans</span>
          <h2 className={styles.sectionTitle}>Kimono, yukata, couple or furisode: which plan costs what?</h2>
          <p className={styles.bodyText}>
            A standard kimono plan is the cheapest at ¥3,300 to ¥5,500; a couple plan is about ¥10,000 to
            ¥11,000 for two, and formal furisode start at ¥33,000.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Price (official site, tax incl.)", "What is included"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td colSpan={2} style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Standard kimono for sightseeing (¥3,300–¥5,500); yukata in summer; furisode only for formal
                      occasions
                    </td>
                  </tr>
                  {planRows.map((r) => (
                    <tr key={r.plan}>
                      <td className={styles.tdProvider}>{r.plan}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>{r.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.includes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[SRC.vasara, SRC.vasaraFaq, SRC.aiwafuku, SRC.kyokomachi]} />
        </section>

        {/* City comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to rent</span>
          <h2 className={styles.sectionTitle}>Which city is best for kimono rental?</h2>
          <p className={styles.bodyText}>
            Kyoto is best for the classic old-town photographs, and Asakusa for a half-day inside a Tokyo
            trip. Kamakura, Kawagoe and Kanazawa are quieter alternatives at the same ¥3,400 VASARA standard
            price, and every shop below wants the outfit back by 17:30.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["City", "Shops (official sites)", "Standard plan", "Photo spots nearby", "Best for", "Details"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td colSpan={5} style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Kyoto (Gion and Kiyomizu) for the classic setting; Asakusa for convenience on a Tokyo trip;
                      Kamakura or Kanazawa for fewer crowds
                    </td>
                  </tr>
                  {cityRows.map((r) => (
                    <tr key={r.city}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{r.city}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.shops}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)", whiteSpace: "nowrap" }}>{r.prices}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.backdrops}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.best}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        <Link href={r.guide.href} style={linkStyle}>{r.guide.label}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[SRC.vasaraShops, SRC.vasara, SRC.rikawafuku, SRC.aiwafuku, SRC.waraku, SRC.kyokomachi]} />
          <p className={styles.bodyText}>
            This page compares cities; the city guides compare shops. For shop-by-shop detail, the{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental" style={linkStyle}>Asakusa kimono rental</Link>{" "}
            guide covers the four Asakusa listings, their return times and the photo spots around Senso-ji, and
            the{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>Kyoto kimono rental</Link>{" "}
            guide compares four Kyoto shops by base price, hair set and return time, and names the shops
            nearest Kyoto Station. To plan the rest of
            the day, see{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>things to do in Kyoto</Link>{" "}
            and{" "}
            <Link href="/guides/transport/kyoto-transportation" style={linkStyle}>getting around Kyoto</Link>.
            Kimono days outside the two big cities fit a{" "}
            <Link href="/guides/attractions/kamakura-day-trip" style={linkStyle}>Kamakura day trip</Link>, a{" "}
            <Link href="/guides/attractions/kawagoe-day-trip" style={linkStyle}>Kawagoe day trip</Link> or a{" "}
            <Link href="/guides/attractions/kanazawa-2-day-itinerary" style={linkStyle}>Kanazawa itinerary</Link>.
          </p>
        </section>

        <KlookTourPicks
          heading="Kimono Rental Shops by City"
          intro="Book the Asakusa or Kyoto shop on Klook: one shop per area, so the choice is the backdrop rather than the brand. Open a listing for the current price and return time on your date."
          tours={[asakusaKimonoYae, asakusaKimonoAiwafukuNo2, kyotoKimonoAiwafukuGion, kyotoKimonoOokiniArashiyama]}
        />

        {/* Booking timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How far ahead should I book a kimono rental?</h2>
          <p className={styles.bodyText}>
            A few days ahead on most weekdays; on the day the calendar opens (20 days to 1 month ahead at
            Waraku) for weekends and Kyoto&apos;s cherry-blossom, autumn-leaf and New Year seasons.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When you go", "How far ahead to book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Days ahead normally; 20 days to 1 month ahead for cherry blossom, autumn leaves and New
                      Year; two weeks or more for formal plans
                    </td>
                  </tr>
                  {bookingRows.map((r) => (
                    <tr key={r.when}>
                      <td className={styles.tdProvider}>{r.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.advice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[SRC.vasaraFaq, SRC.rikawafukuFaq, SRC.warakuFaq, SRC.kyokomachi]} />
          <p className={styles.bodyText}>
            Check the cancellation rule before you pay: at Rikawafuku a same-day cancellation
            costs 100% of the plan, while cancelling online by the day before is free; Waraku also charges only
            for same-day cancellations. VASARA charges 50% the day before and 100% on the day for kimono and
            yukata plans. Rain does not cancel the booking: Rikawafuku does not treat rain as damage, and Waraku
            offers protection cover for stains. Book the Asakusa or Kyoto shop below with that in mind.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <KlookLink href={KIMONO_ASAKUSA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
              Check Asakusa availability →
            </KlookLink>
            <KlookLink href={KIMONO_KYOTO_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
              Check Kyoto availability →
            </KlookLink>
          </div>
        </section>

        <EsimCtaTop />

        {/* What's included */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you get</span>
          <h2 className={styles.sectionTitle}>What is included in a kimono rental plan?</h2>
          <p className={styles.bodyText}>
            The kimono, undergarments, obi, sandals, tabi socks, a small bag and professional dressing are
            standard; whether a hair set is included depends on the shop. Rikawafuku&apos;s Asakusa basic plan
            stores your bags but has no hair service, VASARA, Aiwafuku and Waraku include a simple hair set,
            and Kyokomachi adds one for ¥1,100. VASARA&apos;s braided styles cost ¥1,650 and ¥2,420 ({CHECKED}).
          </p>
          <p className={styles.bodyText}>
            Paid extras are usually a professional photo shoot, a rickshaw (<em>jinrikisha</em>) ride and premium
            silk kimono. In summer the lighter <strong>yukata</strong> takes over — Aiwafuku offers women&apos;s
            yukata from mid-June to August. If the rental is
            part of a Tokyo day, our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>Tokyo transport guide</Link>{" "}
            covers getting to Asakusa, and the{" "}
            <Link href="/guides/attractions" style={linkStyle}>things to do in Japan</Link> hub has the other
            half-day experiences.
          </p>
          <LastChecked sources={[SRC.vasaraFaq, SRC.rikawafuku, SRC.aiwafuku, SRC.waraku, SRC.kyokomachi]} />
        </section>

        {/* Winter */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>Can I wear a kimono in winter?</h2>
          <p className={styles.bodyText}>
            Yes — shops rent kimono all winter and add warm layers: VASARA rents a haori jacket or a stole for
            ¥550 each and dresses you over your own thermal top and leggings.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Winter layer", "Details (official site)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Thermals underneath plus a ¥550 haori or stole on top; start in the morning
                    </td>
                  </tr>
                  {winterRows.map((r) => (
                    <tr key={r.item}>
                      <td className={styles.tdProvider}>{r.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked sources={[SRC.vasaraFaq, SRC.vasaraItems]} />
          <p className={styles.bodyText}>
            Wear a top with a wide, open neck so it stays hidden under the collar. For a winter trip built around
            snow and onsen rather than one kimono day, see the{" "}
            <Link href="/guides/attractions/japan-winter-itinerary" style={linkStyle}>Japan winter itinerary</Link>.
          </p>
        </section>

        {/* How it works */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How does kimono rental work on the day?</h2>
          <p className={styles.bodyText}>
            You book a slot, spend 45 to 70 minutes being dressed, and have the outfit back by 17:30 — four steps.
          </p>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="Kimono and Tea Ceremony in One Booking"
          intro="If you only want the kimono for an hour, a tea ceremony that includes dressing avoids the 17:30 return altogether. One in Kyoto's Gion, one in Asakusa."
          tours={[kyotoGionKimonoTeaCeremony, asakusaKimonoTeaCeremony]}
        />
        <p className={styles.bodyText}>
          More options are compared in our{" "}
          <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>tea ceremony in Japan</Link> guide.
        </p>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Kimono Rental in Japan: FAQ</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        <KlookTourPicks
          heading="Filling the Rest of the Day"
          intro="A rental is a half-day, so here is what tends to go either side of it in each city. Open a listing for the current price on your date."
          tours={[kyotoHighlightBusTour, tokyoSightseeingBusTour]}
        />

        {/* Both cities, second platform. The two Klook shops above are unchanged. */}
        <GygCompare
          slug="kimono-rental-japan"
          heading="Kimono Rentals on GetYourGuide"
          intro="A rental shop has a finite number of outfits and dressers, which is why spring and autumn book out — and why a second list of shops is worth having. GetYourGuide covers both cities, Kyoto more deeply than Tokyo. Check the return deadline wherever you book: it decides how much of the day you actually get."
          listings={[gygKyotoKimono, gygTokyoKimono]}
        />

        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 19 Nov 2026: booking a photographer, with or without the kimono. */}
            <Link href="/guides/attractions/tokyo-photoshoot" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="14" rx="2" />
                  <circle cx="12" cy="13" r="3.5" />
                  <path d="M8 6l2-2h4l2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Photoshoot (2026): Spots, Kimono Shoots &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 20 Nov 2026: Kawagoe, the Edo-era town an hour from Tokyo where kimono rental is the plan. */}
            <Link href="/guides/attractions/kawagoe-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4 4 4-3 3v11H7V10L4 7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawagoe Day Trip from Tokyo (2026): Seibu vs Tobu &amp; Kimono</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4 4 4-3 3v11H7V10L4 7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental Kyoto 2026: Prices by Shop, Near Kyoto Station</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 14h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <line x1="6" y1="8" x2="18" y2="8" />
                  <line x1="6" y1="14" x2="18" y2="14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                  <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
                  <path d="M7 3v2M11 3v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tea Ceremony in Japan (2026): What Actually Happens, and Where to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing &amp; What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Subway &amp; IC Cards</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Dress up for the day</h2>
            <p className={styles.ctaBannerDesc}>
              Book a kimono rental in Asakusa or Kyoto — full outfit and professional dressing, with a hair set at
              many shops. Reserve ahead in spring and autumn, and remember the 17:30 return.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={KIMONO_ASAKUSA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Asakusa Kimono Rental →
              </KlookLink>
              <KlookLink href={KIMONO_KYOTO_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kyoto Kimono Rental →
              </KlookLink>
              <GygCompareButton slug="kimono-rental-japan" listing={gygKyotoKimono} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
