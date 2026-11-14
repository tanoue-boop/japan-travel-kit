import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kyotoGeishaDinnerGionWalk,
  kyotoGionWalkGeishaPerformance,
  kyotoKimonoMaikoDinnerPrivate,
  kyotoMaikoDinnerGionRestaurant,
  kyotoMaikoDinnerTripPrep,
  kyotoMaikoInteractiveDinner,
  kyotoMaikoLunchDinnerAnKyoto,
  kyotoMaikoShowLunch,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kyoto maiko dinner — entry page for "kyoto maiko dinner", "dinner with maiko in
 * Kyoto" and "geisha dinner Kyoto". Added 8 Nov 2026 (task jtk-20261108-02).
 *
 * Kept apart from gion-night-walking-tour (the evening walk) and tea-ceremony-japan
 * by intent: this page is for readers who want to eat with a maiko at the table.
 *
 * Official sources, all read on 8 November 2026:
 *
 *   ookinizaidan.com/gion_coner/          Gion Corner: about 1 hour, Kyomai by a maiko
 *   ookinizaidan.com/gion_coner/payment/  18:00 and 19:00 daily, prices, closed days
 *   ookinizaidan.com/kagai/maiko/, /geiko/, /kagai/   maiko and geiko, the five kagai
 *   kyoto.travel/en/responsible-travel/gion-manner-message-from-southern-gionmachi/
 *                                          Southern Gionmachi message, dated 9 Jan 2024
 *   plus.kyoto.travel/entry/manner_kyoto  Kyoto City Tourism etiquette article
 *
 * Klook rows come from the en-US listings as shown in the www.klook.com search
 * index on the same date, because the product pages return HTTP 403 to automated
 * reads. No Klook price appears. Fields a listing does not show are left as
 * "Check the listing" rather than guessed.
 */

const OWN = checkedLabel("2026-11-08");
/** Gion Corner's times and prices, re-read on ookinizaidan.com/gion_coner/payment/ for task jtk-20261114-C01. */
const GION_CHECKED = checkedLabel("2026-11-14");

const typeRows = [
  {
    tour: kyotoMaikoLunchDinnerAnKyoto,
    name: "Lunch or dinner with a maiko (AN KYOTO)",
    type: "Dinner or lunch",
    time: "1 hour 30 minutes; start times listed from 10:30 to 20:30",
    meal: "A lunch course or a dinner course",
    photos: "Yes, the listing offers photos with the maiko up close",
    where: "AN KYOTO restaurant",
  },
  {
    tour: kyotoMaikoDinnerGionRestaurant,
    name: "Dinner with maiko in a Kyoto-style restaurant",
    type: "Gion walk + dinner",
    time: "3 hours 30 minutes",
    meal: "Kyoto-cuisine dinner course, all-you-can-drink package",
    photos: "Check the listing",
    where: "Meets at the Izumo no Okuni statue, Exit 5 of Gion-Shijo Station (Keihan Line)",
  },
  {
    tour: kyotoMaikoInteractiveDinner,
    name: "Interactive dinner with a maiko",
    type: "Dinner",
    time: "Check the listing",
    meal: "Dinner, with a maiko dance and ozashiki-asobi games",
    photos: "Check the listing",
    where: "Yasaka-dori Enraku, a few minutes from Gion; no parking of its own",
  },
  {
    tour: kyotoGeishaDinnerGionWalk,
    name: "Geisha dinner & Gion cultural walk",
    type: "Gion walk + dinner",
    time: "3 hours",
    meal: "Dinner with a geiko or maiko, with dance and music",
    photos: "Check the listing",
    where: "Gion; pick-up and drop-off listed as included",
  },
  {
    tour: kyotoGionWalkGeishaPerformance,
    name: "Gion cultural walk & geisha performance",
    type: "Walk + performance",
    time: "3 to 3.5 hours (1.5 to 2-hour walk, 50-minute geisha meeting)",
    meal: "Optional dining plan, a sharing plate of 8 foods",
    photos: "Check the listing",
    where: "Gion",
  },
  {
    tour: kyotoKimonoMaikoDinnerPrivate,
    name: "Private kimono day and maiko dinner show",
    type: "Private day + dinner",
    time: "7 hours",
    meal: "Dinner in a tatami room while maiko perform Kyomai",
    photos: "Check the listing",
    where: "Kyoto; hotel return only for guests staying in Kyoto City. Minimum 2 people",
  },
  {
    tour: kyotoMaikoShowLunch,
    name: "Maiko show viewing with lunch",
    type: "Lunch + show",
    time: "1 hour 40 minutes",
    meal: "Japanese set lunch",
    photos: "Check the listing",
    where: "Hatoya Zuihokaku, with an English-speaking guide",
  },
];

const gionCornerRows = [
  { item: "Show times", value: "18:00 and 19:00, daily (about 1 hour)" },
  { item: "Winter season (1 Dec – 11 Mar)", value: "Tuesday to Friday only; public holidays closed in this season" },
  { item: "Closed", value: "16 July, 16 August, 26 December – 4 January, 11 and 23 February" },
  { item: "General admission", value: "¥5,500 age 23+, ¥3,850 ages 16–22, ¥3,300 ages 7–15; preschool free without a seat" },
  { item: "Premium / tea ceremony seats", value: "¥6,600 / ¥6,050, all ages" },
  { item: "What you see", value: "Kyomai danced by a maiko, plus tea ceremony, flower arranging, koto and other arts by season" },
  { item: "Photos", value: "After the winter performances, a commemorative photo with the maiko" },
];

const faqItems = [
  {
    q: "How much is a maiko dinner in Kyoto?",
    a: `Maiko dinners are priced by date and party size on each listing, so open the listing for your evening rather than relying on a fixed figure. The only fixed official price is Gion Corner's one-hour show with Kyomai by a maiko and no meal: ¥5,500 for an adult (23 and over), ¥3,850 for ages 16 to 22 and ¥3,300 for ages 7 to 15, read on its own site ${GION_CHECKED}.`,
  },
  {
    q: "How can I have dinner with a maiko in Kyoto?",
    a: `Book a maiko dinner that is sold as a public tour, the same way you would book any other experience. On Klook these run from 1 hour 30 minutes (a seated lunch or dinner course at AN KYOTO) to 3 hours 30 minutes (a guided Gion walk followed by a Kyoto-cuisine dinner), and a private 7-hour version adds a kimono day before the meal. Pick the length, the meal and the meeting point, then check your date. Listings read ${OWN}.`,
  },
  {
    q: "Is a maiko dinner in Kyoto worth it?",
    a: `It is worth it if you want to sit with a maiko, watch a dance at close range and ask questions, because that is what you are paying for. If you only want to see a maiko dance, Gion Corner shows Kyomai by a maiko in a programme of about one hour at 18:00 and 19:00, from ¥5,500 for an adult on its own site (read ${OWN}). That is the cheaper way to see the dance, with no meal and no conversation.`,
  },
  {
    q: "What is the difference between a maiko and a geiko?",
    a: `A maiko is an apprentice and a geiko is a qualified performer, called geisha outside Kyoto. The Kyoto foundation that runs Gion Corner says a maiko starts only after finishing junior high school, spends about a year in basic training and about a month as an apprentice before her debut, and becomes a geiko after five or six years of training in dance, shamisen, music, tea ceremony and manners. The maiko is the one in the long darari obi and tall okobo sandals.`,
  },
  {
    q: "Can you take photos of maiko in Gion?",
    a: `Not on the street without permission. The Southern Gionmachi residents' message published by Kyoto's official tourism site asks visitors not to stop, touch, follow or photograph geiko and maiko without permission, and not to enter private property. Take your photos inside the experience you booked: the AN KYOTO listing offers photos up close, and Gion Corner offers a commemorative photo with the maiko after its winter performances.`,
  },
  {
    q: "What should I wear to a maiko dinner?",
    a: `None of the listings checked sets a dress code, so ordinary smart-casual clothes are fine. Two practical points: tatami rooms mean shoes off, so wear clean socks, and the walk-plus-dinner formats spend 1.5 to 2 hours outside first, so dress for the weather. If you want to dine in kimono, the private 7-hour listing includes a kimono day before the dinner.`,
  },
  {
    q: "Can children join a maiko dinner?",
    a: `It depends on the listing. The 3.5-hour Gion dinner tour accepts guests aged 15 and over only and asks families with children aged 14 or younger to book a private tour. Gion Corner is the easier family option: ages 7 to 15 pay ¥3,300 and preschool children are free without a seat, on the official price list read ${OWN}.`,
  },
  {
    q: "What is the cancellation policy?",
    a: `It differs by listing. AN KYOTO gives a full refund for cancellations at least 7 days before the date. The Geisha Dinner & Gion Cultural Walk allows free cancellation with 24 hours' notice and is cancelled with a full refund if it does not reach 4 participants. The Gion restaurant dinner listing shows both a 24-hour and a 7-day rule, so go by the terms on your booking confirmation. Late arrivals and no-shows are not refunded on the listings that state it. Terms read ${OWN}.`,
  },
  {
    q: "When do maiko dinners sell out?",
    a: `There is no fixed sell-out date, because each listing sells by evening and by party size. Book as soon as your Kyoto dates are fixed, and earlier for weekends, cherry blossom and autumn leaves. Some formats need a minimum group to run, so a quiet date can be cancelled by the operator, which is one more reason to book early and keep the date flexible.`,
  },
];

// The H1 opens with the title's exact words ("How to Book" spelled out), so the result has one wording.
const TITLE = "Kyoto Maiko Dinner (2026): Price, Booking & What to Expect";
const H1 = "Kyoto Maiko Dinner (2026): Price, How to Book & What to Expect";
const DESCRIPTION =
  "Kyoto maiko dinner: 1.5 to 3.5 hours, priced by date, so book once your Kyoto dates are set. Only want the dance? Gion Corner is ¥5,500. Book on Klook.";

const ROUTE = "/guides/attractions/kyoto-maiko-dinner";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/gion-night-walking-tour", title: "Gion Night Walking Tour 2026: Times, Types & Photo Rules" },
  { href: "/guides/attractions/tea-ceremony-japan", title: "Japanese Tea Ceremony Experience: Price, How Long and Where to Book" },
  { href: "/guides/attractions/kyoto-kimono-rental", title: "Kyoto Kimono Rental (2026): Which Area, What's Included, When to Return" },
  { href: "/guides/attractions/kyoto-cooking-class", title: "Kyoto Cooking Class (2026): Sushi, Ramen, Wagashi Compared" },
  { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto (2026): Temples, Timing and What to Book" },
  { href: "/guides/attractions/where-to-stay-in-kyoto", title: "Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KyotoMaikoDinnerPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.slice(0, 5).map((item) => ({
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                { "@type": "ListItem", position: 4, name: "Kyoto Maiko Dinner", item: URL },
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Kyoto Maiko Dinner</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1}
          </h1>
          <p className={styles.heroSubtitle}>
            Seven ways to eat or spend an evening with a maiko, compared on length, meal and meeting point,
            plus the one-hour stage show if you only want to see the dance.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Seven formats compared", "Official Gion rules", "Cancellation terms"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
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
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Kyoto maiko dinner</strong> lasts <strong>1 hour 30 minutes</strong> (a seated lunch or
              dinner course at AN KYOTO) to <strong>3 hours 30 minutes</strong> (a guided Gion walk, then a
              Kyoto-cuisine dinner), and each listing prices it by date, so open the listing for yours (listings
              read {OWN}). Book as soon as your Kyoto dates are fixed, earlier for weekends, cherry blossom and
              autumn leaves: AN KYOTO refunds in full only up to 7 days before. If you only want to watch a maiko
              dance, <strong>Gion Corner</strong> holds a one-hour show at <strong>18:00 and 19:00</strong> (Tuesday
              to Friday only from 1 December to 11 March) for <strong>¥5,500</strong> per adult on its official
              site, read {GION_CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoMaikoLunchDinnerAnKyoto.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                1.5-Hour Maiko Dinner →
              </KlookLink>
              <KlookLink href={kyotoMaikoDinnerGionRestaurant.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Gion Walk + Maiko Dinner →
              </KlookLink>
            </div>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "1rem" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shortest dinner</p>
                <p className={styles.verdictStatValue}>1h30, AN KYOTO</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Walk + dinner</p>
                <p className={styles.verdictStatValue}>3 to 3.5 hours in Gion</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Show only</p>
                <p className={styles.verdictStatValue}>Gion Corner, about 1 hour</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Street photos</p>
                <p className={styles.verdictStatValue}>Not without permission</p>
              </div>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* How */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How it works</span>
          <h2 className={styles.sectionTitle}>How Can I Have Dinner With a Maiko in Kyoto?</h2>
          <p className={styles.bodyText}>
            Choose a format, then a date. Every option below is a dinner with maiko in Kyoto (or a lunch, or
            a performance) sold as a public booking, so you need no personal connection in the geisha
            district. The choice comes down to three things: how long you want, whether you want a full
            meal, and whether you want the Gion walk before it.
          </p>
          <p className={styles.bodyText}>
            This page is for the meal. For the evening walk on its own, see our{" "}
            <Link href="/guides/attractions/gion-night-walking-tour">Gion night walking tour guide</Link>; for
            matcha and a tea room, the <Link href="/guides/attractions/tea-ceremony-japan">tea ceremony guide</Link>.
          </p>
        </section>

        {/* Types table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare formats</span>
          <h2 className={styles.sectionTitle}>Which Geisha Dinner in Kyoto Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Book AN KYOTO if you want the shortest seated meal with a maiko and the clearest photo
            opportunity. Book the Gion restaurant dinner if you want the walk and a full evening. Book the
            private kimono day if the dinner is the end of a dressed-up day for two or more.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Listing", "Type", "Length", "Meal", "Photos", "Where", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {typeRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.tour.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.name}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.type}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.meal}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.photos}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>Gion Corner (official)</td>
                    <td style={{ fontSize: "0.86rem" }}>Stage show</td>
                    <td style={{ fontSize: "0.86rem" }}>About 1 hour, 18:00 or 19:00</td>
                    <td style={{ fontSize: "0.86rem" }}>None</td>
                    <td style={{ fontSize: "0.86rem" }}>Photo with the maiko after winter performances</td>
                    <td style={{ fontSize: "0.86rem" }}>Gion Kobu Kaburenjo small theatre</td>
                    <td style={{ fontSize: "0.82rem" }}>ookinizaidan.com, {OWN}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Rows come from the listings as they appear in search results, so not every field is shown.
            Check the listing for your date: it shows the current price, the start time and what your
            package includes.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoGeishaDinnerGionWalk.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Geisha dinner &amp; Gion walk →
            </KlookLink>
            <KlookLink href={kyotoMaikoInteractiveDinner.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Interactive maiko dinner →
            </KlookLink>
            <KlookLink href={kyotoKimonoMaikoDinnerPrivate.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private kimono day + dinner →
            </KlookLink>
          </div>
        </section>

        {/* Worth it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Worth it?</span>
          <h2 className={styles.sectionTitle}>Is a Maiko Dinner in Kyoto Worth It?</h2>
          <p className={styles.bodyText}>
            Yes, if you want to sit with a maiko, see a dance at arm&apos;s length and ask questions; that is
            what the price buys. If seeing the dance is enough, Gion Corner is shorter and cheaper: about one
            hour with Kyomai by a maiko, alongside tea ceremony, flower arranging, koto and other arts that
            change by season.
          </p>
          <p className={styles.bodyText}>
            A middle option is the walk-and-performance format: a 1.5 to 2-hour walk of the geisha district
            and a 50-minute meeting with a geisha, with a meal only if you add the dining plan.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoGionWalkGeishaPerformance.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Gion walk &amp; geisha performance →
            </KlookLink>
            <KlookLink href={kyotoMaikoShowLunch.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Daytime maiko show with lunch →
            </KlookLink>
          </div>
        </section>

        {/* Gion Corner */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Show only</span>
          <h2 className={styles.sectionTitle}>What If You Only Want to See a Maiko Dance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Go to Gion Corner, the theatre run by the Kyoto foundation for the geisha districts. Tickets are
            sold on its own website, and these are its published times and prices.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Gion Corner", "Official detail", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gionCornerRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.82rem" }}>ookinizaidan.com, {GION_CHECKED}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-14 · https://www.ookinizaidan.com/gion_coner/payment/
          </p>
        </section>

        {/* Maiko vs geiko */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Background</span>
          <h2 className={styles.sectionTitle}>What Is the Difference Between a Maiko and a Geiko?</h2>
          <p className={styles.bodyText}>
            A maiko is an apprentice and a geiko is the qualified performer; geiko is the Kyoto word for
            geisha. The Kyoto foundation behind Gion Corner says a maiko can start only after finishing junior
            high school, spends about a year in basic training (shikomi) and about a month as an apprentice
            before her debut, and is known by the long darari obi and tall okobo sandals.
          </p>
          <p className={styles.bodyText}>
            A maiko becomes a geiko after five or six years of training in dance, shamisen, music, song, tea
            ceremony and manners. A geiko then works independently, with no retirement age. Kyoto has five
            geisha districts: Gion Kobu, Miyagawacho, Pontocho, Kamishichiken and Gion Higashi. Most dinners
            here are with a maiko; the Geisha Dinner &amp; Gion Cultural Walk says a geiko or a maiko.
          </p>
        </section>

        {/* Manners */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Gion rules</span>
          <h2 className={styles.sectionTitle}>Can You Take Photos of Maiko in Gion?</h2>
          <p className={styles.bodyText}>
            Not on the street without permission. A message from the Southern Gionmachi residents, the Gion
            Kobu teahouse and geiko associations and Kennin-ji, published on Kyoto&apos;s official tourism
            site on 9 January 2024, asks visitors:
          </p>
          <ul className={styles.bodyText}>
            <li>not to stop, touch, follow or photograph geiko and maiko without permission (&quot;they are not mascot characters&quot;);</li>
            <li>not to enter temples, shrines or private property other than shops and roads without permission;</li>
            <li>not to block the road or pavement by stopping to take photos or stepping into the road, since the street is not pedestrian-only.</li>
          </ul>
          <p className={styles.bodyText}>
            Kyoto&apos;s official tourism etiquette article adds: do not enter private alleys, do not set up
            tripods on the street, and do not touch teahouse lanterns. It also notes that a maiko in full
            dress is usually on her way to an engagement. A booked dinner is the place for photos: the AN KYOTO
            listing offers photos up close, and Gion Corner offers one after its winter performances.
          </p>
        </section>

        {/* Dress and children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Dress &amp; families</span>
          <h2 className={styles.sectionTitle}>What Should I Wear, and Can Children Come?</h2>
          <p className={styles.bodyText}>
            <strong>Dress:</strong> none of the listings checked sets a dress code. Wear clean socks, since
            tatami rooms mean shoes off, and dress for the weather on the walk-plus-dinner formats, which
            spend 1.5 to 2 hours outside first. To dine in kimono, the private listing includes the kimono
            day; for a rental on your own, see our <Link href="/guides/attractions/kyoto-kimono-rental">Kyoto kimono rental guide</Link>.
          </p>
          <p className={styles.bodyText}>
            <strong>Children:</strong> the 3.5-hour Gion restaurant dinner accepts ages 15 and over only, and
            sends families with children aged 14 or younger to a private tour. Gion Corner is the family
            option: ages 7 to 15 pay ¥3,300 and preschool children are free without a seat.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book, and Can You Cancel?</h2>
          <p className={styles.bodyText}>
            Book as soon as your Kyoto dates are fixed. There is no fixed sell-out date, because each listing
            sells by evening and party size; book earlier still for a weekend or the cherry blossom and autumn
            leaf seasons. Some
            formats need a minimum group (4 for the Geisha Dinner &amp; Gion Cultural Walk), so a quiet date can
            be called off by the operator with a full refund.
          </p>
          <p className={styles.bodyText}>
            Cancellation terms differ: AN KYOTO refunds in full at least <strong>7 days</strong> before the
            date; the Geisha Dinner &amp; Gion Cultural Walk is free to cancel with <strong>24 hours&apos;</strong>{" "}
            notice; the Gion restaurant dinner shows both a 24-hour and a 7-day rule, so go by your booking
            confirmation. Late arrivals and no-shows are not refunded where the listing states it. Terms read {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoMaikoLunchDinnerAnKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your date at AN KYOTO →
            </KlookLink>
            <KlookLink href={kyotoGeishaDinnerGionWalk.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              24-hour free cancellation option →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Same day"
          heading="What to Book for the Same Day"
          intro="A maiko dinner fills the evening. These cover the daytime, the ride to Gion and the map on your phone. Open a listing for the price on your dates."
          items={kyotoMaikoDinnerTripPrep}
        />

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
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
          heading="Maiko Dinners on Klook"
          intro="The four listings most readers choose between. Open one for the current price and the times on your date."
          tours={[
            kyotoMaikoLunchDinnerAnKyoto,
            kyotoMaikoDinnerGionRestaurant,
            kyotoGeishaDinnerGionWalk,
            kyotoKimonoMaikoDinnerPrivate,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{guide.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>A seat at the table, booked like any tour</h2>
            <p className={styles.ctaBannerDesc}>
              Ninety minutes with a maiko over a course meal, or a full Gion evening ending in dinner.
              Pick the format, then check your date.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kyotoMaikoLunchDinnerAnKyoto.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the 1.5-Hour Dinner →
              </KlookLink>
              <KlookLink href={kyotoMaikoDinnerGionRestaurant.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Gion Evening →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
