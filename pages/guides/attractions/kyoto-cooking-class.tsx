import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kyotoBentoCookingClass,
  kyotoCookingClassesListUrl,
  kyotoCookingClassTripPrep,
  kyotoFushimiInariWagashiClass,
  kyotoRamenGyozaClass,
  kyotoRamenNoodleMaking,
  kyotoStyleSushiRoujiya,
  kyotoSushiKawaramachiClass,
  kyotoSushiOneHourClass,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kyoto cooking class — entry page for "kyoto cooking class" and "cooking class in
 * Kyoto". Added 8 Nov 2026 (task jtk-20261108-02). Split from tokyo-cooking-class
 * by city.
 *
 * Every row comes from an en-US Klook listing as shown in the www.klook.com search
 * index on 8 November 2026, because the product pages return HTTP 403 to automated
 * reads. A field the listing does not show is printed as "Check the listing"
 * rather than guessed, and no Klook price appears.
 */

const OWN = checkedLabel("2026-11-08");

const NOT_SHOWN = "Check the listing";

const classRows = [
  {
    tour: kyotoRamenGyozaClass,
    name: "Ramen & Gyoza with professional chefs",
    dish: "Ramen, gyoza and fried rice, eaten as lunch with two drinks",
    time: "2.5 hours, morning",
    where: "Kawaramachi area",
    veg: "No: vegetarian, vegan and gluten-free requests cannot be met",
    kids: "Ages 6+, child rate 6–15; an adult helps with knives",
    lang: "English",
  },
  {
    tour: kyotoRamenNoodleMaking,
    name: "Ramen noodle making",
    dish: "Hand-made ramen noodles, then a tasting",
    time: "1 to 1.5 hours",
    where: "About 5 minutes on foot from Kyoto-Kawaramachi Station",
    veg: "Yes: vegetarian, vegan and pescatarian options on request",
    kids: "Ages 3+; 3–7 with a paying adult, 8+ at the adult rate",
    lang: NOT_SHOWN,
  },
  {
    tour: kyotoFushimiInariWagashiClass,
    name: "Wagashi (Japanese sweets) by Fushimi Inari",
    dish: "Three kinds of wagashi, eaten with matcha",
    time: "2 hours",
    where: "Fukakusa, by Fushimi Inari Taisha",
    veg: "Yes: vegetarian and vegan on request",
    kids: NOT_SHOWN,
    lang: "English, licensed guide interpreters; up to 6 per class",
  },
  {
    tour: kyotoSushiOneHourClass,
    name: "1-hour sushi making",
    dish: "Six nigiri, three temari, one gunkan, one inari; tea and miso soup",
    time: "1 hour",
    where: "Momiji-cho, Kyoto (a late-19th-century house)",
    veg: NOT_SHOWN,
    kids: NOT_SHOWN,
    lang: NOT_SHOWN,
  },
  {
    tour: kyotoSushiKawaramachiClass,
    name: "Sushi making in Kawaramachi",
    dish: "Sushi you make and eat",
    time: "90 minutes",
    where: "Kawaramachi (Utanokoji Building, 2F)",
    veg: "Message the operator before booking",
    kids: "12 and under with an adult; 3 and under free, no course",
    lang: NOT_SHOWN,
  },
  {
    tour: kyotoStyleSushiRoujiya,
    name: "Kyoto-style sushi (Roujiya)",
    dish: "Sushi from rice washing to plating, plus dashi",
    time: "2.5 hours",
    where: "Nakagyo ward",
    veg: NOT_SHOWN,
    kids: NOT_SHOWN,
    lang: "English",
  },
  {
    tour: kyotoBentoCookingClass,
    name: "Bento cooking class",
    dish: "4 to 5 dishes for a bento lunch, with dashi and seasonings",
    time: "Morning; length on the listing",
    where: NOT_SHOWN,
    veg: NOT_SHOWN,
    kids: NOT_SHOWN,
    lang: NOT_SHOWN,
  },
];

const faqItems = [
  {
    q: "What is the best cooking class in Kyoto?",
    a: `Pick by the dish and the time you have. For a full meal, the 2.5-hour Ramen & Gyoza class ends in lunch with two drinks. For the shortest class, the 1-hour sushi class has the chef prepare the rice and fish while you shape eleven pieces. For something only Kyoto does well, the 2-hour wagashi class by Fushimi Inari makes three Japanese sweets and serves them with matcha. Listings read ${OWN}.`,
  },
  {
    q: "Are Kyoto cooking classes good for beginners?",
    a: `Yes. The classes here are hands-on and assume no experience: in the 1-hour sushi class the chef prepares the rice and cuts the fish before you start, and the Ramen & Gyoza class is described as beginner-friendly. The classes listed as English-guided need no Japanese. The one thing to check is your diet, because not every class can change the menu.`,
  },
  {
    q: "Can vegetarians join a cooking class in Kyoto?",
    a: `Yes, at the right class. The ramen noodle making class near Kyoto-Kawaramachi lists vegetarian, vegan and pescatarian options, and the Fushimi Inari wagashi class offers vegetarian and vegan versions if you ask ahead. The Ramen & Gyoza class says it cannot meet vegetarian, vegan or gluten-free requests, and the Kawaramachi sushi class asks vegetarians to message the operator first. Read ${OWN}.`,
  },
  {
    q: "Can kids join a Kyoto cooking class?",
    a: `Yes, with age rules that differ by class. Ramen noodle making takes ages 3 and up, with 3 to 7-year-olds joining alongside a paying adult. The Kawaramachi sushi class needs an adult with anyone 12 or under and lets children 3 and under join free without a course. The Ramen & Gyoza class starts at age 6 and charges a child rate up to 15.`,
  },
  {
    q: "How long is a cooking class in Kyoto?",
    a: `1 to 2.5 hours for the classes compared here: 1 hour for the short sushi class, 1 to 1.5 hours for ramen noodles, 90 minutes for the Kawaramachi sushi class, 2 hours for wagashi, and 2.5 hours for Ramen & Gyoza and for Roujiya's Kyoto-style sushi. Allow time to get there: several listings give a street address rather than a station exit.`,
  },
  {
    q: "What is the cancellation policy?",
    a: `It is set per class. The morning bento class is free to cancel with 72 hours' notice, and Klook's Kyoto list marks the wagashi, ramen noodle and Kyoto-style sushi classes as free cancellation. For the others, the policy is on the listing for your date. Read the terms before you pay. Read ${OWN}.`,
  },
];

const TITLE = "Kyoto Cooking Class (2026): Sushi, Ramen, Wagashi Compared";
const DESCRIPTION =
  "Kyoto Cooking Class picks: a cooking class in Kyoto runs 1 to 2.5 hours in English, for sushi, ramen, bento or wagashi. Vegetarian and kid rules compared.";

const ROUTE = "/guides/attractions/kyoto-cooking-class";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/tokyo-cooking-class", title: "Tokyo Cooking Class (2026): Sushi and Ramen Making — What to Expect" },
  { href: "/guides/attractions/fushimi-inari-tour", title: "Fushimi Inari Tour 2026: Hike Time, Hours & Best Time" },
  { href: "/guides/attractions/japan-matcha-experiences", title: "Matcha Experiences in Japan (2026): Uji, Kyoto and Tokyo Tea Houses Compared" },
  { href: "/guides/attractions/kyoto-maiko-dinner", title: "Kyoto Maiko Dinner (2026): Types, Gion Rules & Booking" },
  { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto (2026): Temples, Timing and What to Book" },
  { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3 Day Itinerary (2026): Day by Day, and What to Book" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KyotoCookingClassPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kyoto Cooking Class", item: URL },
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
          <span className={styles.breadCurrent}>Kyoto Cooking Class</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kyoto Cooking Class (2026):<br />Sushi, Ramen, Bento and Wagashi Compared
          </h1>
          <p className={styles.heroSubtitle}>
            Seven classes compared on the dish, the length, the nearest station, vegetarian options and
            children, so you can pick one that fits your day.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Seven classes compared", "Vegetarian & kids' rules", "Cancellation terms"].map((t) => (
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
              A <strong>Kyoto cooking class</strong> on Klook covers sushi, ramen and gyoza, bento or wagashi
              (Japanese sweets) and runs <strong>1 to 2.5 hours</strong>. Three of the ramen and sushi classes
              are around <strong>Kawaramachi</strong>, with the noodle class about 5 minutes on foot from
              Kyoto-Kawaramachi Station, and the wagashi class is by <strong>Fushimi Inari</strong>. Several are
              taught in English, so no Japanese is needed. Checked {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoRamenGyozaClass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Ramen &amp; Gyoza Class →
              </KlookLink>
              <KlookLink href={kyotoSushiOneHourClass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                1-Hour Sushi Class →
              </KlookLink>
            </div>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "1rem" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>1 to 2.5 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Kawaramachi, Nakagyo, Fushimi Inari</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Vegetarian</p>
                <p className={styles.verdictStatValue}>Ramen noodles, wagashi</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Youngest age</p>
                <p className={styles.verdictStatValue}>3+ for ramen noodles</p>
              </div>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Compare */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare classes</span>
          <h2 className={styles.sectionTitle}>What Is the Best Cooking Class in Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The best one is the class whose dish, length and diet rules fit you. Ramen &amp; Gyoza is the full
            meal; the 1-hour sushi class is the shortest; wagashi by Fushimi Inari is the one with a Kyoto
            angle and vegetarian options. The table shows only what each listing states.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Class", "What you make", "Length", "Where", "Vegetarian", "Children", "Language", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {classRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.tour.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.name}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.dish}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.veg}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.kids}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.lang}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Rows come from the listings as they appear in search results, so not every field is shown.
            Check the listing for your date: it shows the price, the start time and the meeting address.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoFushimiInariWagashiClass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Wagashi by Fushimi Inari →
            </KlookLink>
            <KlookLink href={kyotoRamenNoodleMaking.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ramen noodle making →
            </KlookLink>
            <KlookLink href={kyotoCookingClassesListUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Kyoto cooking classes →
            </KlookLink>
          </div>
        </section>

        {/* Beginners */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Beginners</span>
          <h2 className={styles.sectionTitle}>Are Kyoto Cooking Classes Good for Beginners?</h2>
          <p className={styles.bodyText}>
            Yes. Every cooking class in Kyoto compared here is hands-on and assumes no experience. In the
            1-hour sushi class the chef prepares the rice and cuts the fish before you start, so you shape six
            nigiri, three temari, one gunkan and one inari. The Ramen &amp; Gyoza class is described as
            beginner-friendly and ends with the lunch you made.
          </p>
          <p className={styles.bodyText}>
            If you want to learn the base of Japanese home cooking rather than one dish, the 2.5-hour
            Kyoto-style sushi class at Roujiya starts at rice washing and covers dashi, and the morning bento
            class makes 4 to 5 dishes with the stock and seasonings explained.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoStyleSushiRoujiya.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto-style sushi at Roujiya →
            </KlookLink>
            <KlookLink href={kyotoBentoCookingClass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Morning bento class →
            </KlookLink>
          </div>
        </section>

        {/* Vegetarian */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Diet</span>
          <h2 className={styles.sectionTitle}>Can Vegetarians Join a Cooking Class in Kyoto?</h2>
          <p className={styles.bodyText}>
            Yes, at two of these classes. <strong>Ramen noodle making</strong> lists vegetarian, vegan and
            pescatarian options for the tasting, and the <strong>wagashi class</strong> offers vegetarian and
            vegan versions if you tell them ahead. Avoid the Ramen &amp; Gyoza class, which says it cannot meet
            vegetarian, vegan or gluten-free requests. The Kawaramachi sushi class asks vegetarians to message
            the operator before booking. For other diets, put the request in the booking notes and wait for a
            reply before you count on it.
          </p>
        </section>

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Can Kids Join a Kyoto Cooking Class?</h2>
          <p className={styles.bodyText}>
            Yes, and the ages differ. <strong>Ramen noodle making</strong> takes ages 3 and up: 3 to 7-year-olds
            join alongside a paying adult, 8 and over pay the adult rate, and infants can wait in a Japanese-style
            room. The <strong>Kawaramachi sushi class</strong> needs an adult with anyone 12 or under and lets
            children 3 and under join free without a course. <strong>Ramen &amp; Gyoza</strong> starts at 6, with a
            child rate to 15, and asks an adult to help with knives.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoSushiKawaramachiClass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kawaramachi sushi class →
            </KlookLink>
          </div>
        </section>

        {/* Length */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>How Long Is a Cooking Class in Kyoto?</h2>
          <p className={styles.bodyText}>
            1 to 2.5 hours for the classes here: 1 hour for the short sushi class, 1 to 1.5 hours for ramen
            noodles, 90 minutes for sushi in Kawaramachi, 2 hours for wagashi, and 2.5 hours for Ramen &amp;
            Gyoza and Roujiya&apos;s Kyoto-style sushi. A morning class leaves the afternoon free. The wagashi
            class pairs naturally with Fushimi Inari, which is nearby; see our{" "}
            <Link href="/guides/attractions/fushimi-inari-tour">Fushimi Inari guide</Link> for the walk.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book, and Can You Cancel?</h2>
          <p className={styles.bodyText}>
            Book once your Kyoto dates are fixed. There is no fixed sell-out date, because each class sells by
            time slot, but a small class has few seats on any one day: the wagashi class takes up to six people.
            Same-day booking is not something to rely on.
          </p>
          <p className={styles.bodyText}>
            The morning bento class is free to cancel with <strong>72 hours&apos;</strong> notice. Klook&apos;s
            Kyoto list marks the wagashi, ramen noodle and Kyoto-style sushi classes as free cancellation. For
            the rest, the policy is on the listing for your date, so read it before you pay. Terms read {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoRamenGyozaClass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your date for Ramen &amp; Gyoza →
            </KlookLink>
            <KlookLink href={kyotoFushimiInariWagashiClass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the wagashi class →
            </KlookLink>
          </div>
        </section>

        {/* Tokyo */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tokyo or Kyoto?</span>
          <h2 className={styles.sectionTitle}>Should You Take the Class in Kyoto or Tokyo?</h2>
          <p className={styles.bodyText}>
            Take it where you have a free half-day. The sushi and ramen formats exist in both cities; wagashi
            by Fushimi Inari and Kyoto-style sushi with dashi are the Kyoto-specific picks. For Tokyo&apos;s
            options, see our <Link href="/guides/attractions/tokyo-cooking-class">Tokyo cooking class guide</Link>.
          </p>
        </section>

        <KlookTripPrep
          label="Same day"
          heading="What to Book for the Same Day"
          intro="A class takes 1 to 2.5 hours of the day. These cover the rest of it, the city buses and the map on your phone. Open a listing for the price on your dates."
          items={kyotoCookingClassTripPrep}
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
          heading="Kyoto Cooking Classes on Klook"
          intro="Four classes that cover most readers: a full meal, a short class, a Kyoto sweet and a vegetarian-friendly option. Open one for the price and times on your date."
          tours={[
            kyotoRamenGyozaClass,
            kyotoSushiOneHourClass,
            kyotoFushimiInariWagashiClass,
            kyotoRamenNoodleMaking,
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
            <h2 className={styles.ctaBannerTitle}>Two hours, one dish, and lunch at the end</h2>
            <p className={styles.ctaBannerDesc}>
              Pick the dish, check the diet and age rules in the table, then check your date.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kyotoRamenGyozaClass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Ramen &amp; Gyoza →
              </KlookLink>
              <KlookLink href={kyotoCookingClassesListUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                All Kyoto Classes →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
