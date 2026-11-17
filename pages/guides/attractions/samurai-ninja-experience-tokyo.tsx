import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { tokyoSubwayTicket, tokyoSightseeingBusTour, skytreeTicket } from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygTokyoSamuraiNinja } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026).
const SAMURAI_NINJA_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1309228&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F133891-samurai-ninja-museum-tokyo-with-samurai-and-ninja-experience%2F";

/*
 * Prices, durations and age rules (Nov 16 I01) are the operators' own:
 * - Samurai Ninja Museum Tokyo (MAIKOYA), mai-ko.com tour pages: the price is the "price" in each
 *   page's Product JSON-LD offer; duration and minimum age from the "Important Information" and FAQ
 *   text on the same page. Opening hours 9:00–18:30 from the FAQ on the ninja and sword pages.
 * - SAMURAI've (tate-school.com, Sendagaya): ¥11,000 adult / ¥8,800 under 12, tax included,
 *   60-minute class, from the "Dates & Fee" block of its English page.
 * Klook prices are not quoted (site rule); the Klook button opens the listing for the date.
 */
const LAST_CHECKED = "2026-11-16";
const CHECKED = "16 November 2026";
const TITLE = "Samurai & Ninja Experience Tokyo 2026: Price & Which to Book";
const H1_LINE1 = "Samurai & Ninja Experience Tokyo 2026:";
const H1_LINE2 = "Price, Duration & Which to Book";
const DESCRIPTION =
  "Samurai and ninja experience in Tokyo: ¥3,000 for a 60-minute museum ticket, ¥5,700 for a 2-hour ninja course, sword lessons from ¥9,000. Ages and booking.";

const MUSEUM_BASIC = "https://mai-ko.com/tour/tokyo-samurai-museum-with-experience-basic-ticket/";
const MUSEUM_NINJA = "https://mai-ko.com/tour/ninja-experience-in-kyoto-family-kid-friendly/?locale=en";
const MUSEUM_SWORD = "https://mai-ko.com/tour/samurai-sword-experience-for-adults-in-tokyo/?locale=en";
const MUSEUM_FAMILY = "https://mai-ko.com/tour/tokyosuper-combo-samurai-and-ninja-lesson-for-kids-and-family/?locale=en";
const MUSEUM_COMBO = "https://mai-ko.com/tour/samurai_sword_cutting_tameshigiri_experience_tokyo_samurai_museum/?locale=en";
const MUSEUM_KIMONO = "https://mai-ko.com/tour/combo-samurai-ninja-museum-and-kimono-tea-ceremony-tokyo/?locale=en";
const SAMURAIVE = "https://tate-school.com/samurai-sword-fight-experience01";

const compareRows = [
  {
    name: "Best first pick: Samurai Ninja Museum — Basic Ticket",
    kind: "Museum + ninja star + armour photos",
    price: "¥3,000",
    time: "About 60 min (45–60)",
    age: "Activities from 3; under 3 free",
    english: "English-guided group tour",
    where: "Nishi-Asakusa (2 min from Tawaramachi)",
  },
  {
    name: "Ninja Experience (Family & Kid Friendly)",
    kind: "Ninja · shuriken · blowgun",
    price: "¥5,700",
    time: "About 120 min incl. tour",
    age: "From 3; child rate to 12",
    english: "Tour in English",
    where: "Asakusa museum",
  },
  {
    name: "Samurai Sword Experience",
    kind: "Samurai sword · kata in hakama",
    price: "¥9,000",
    time: "Sword lesson about 30 min, plus the tour",
    age: "Under 6 cannot enter the dojo",
    english: "Tour in English",
    where: "Asakusa museum",
  },
  {
    name: "Super Combo for Kids & Family",
    kind: "Sword + sword fighting + ninja, 6 activities",
    price: "¥12,000",
    time: "About 120 min",
    age: "From 3; child rate to 12",
    english: "Tour in English",
    where: "Asakusa museum",
  },
  {
    name: "Samurai & Ninja Experience Combo",
    kind: "Iaido basics · sword fight · shuriken · blowgun",
    price: "¥14,000",
    time: "About 180 min",
    age: "From 10",
    english: "Tour in English",
    where: "Asakusa museum",
  },
  {
    name: "Museum + Kimono Tea Ceremony combo",
    kind: "With kimono dressing and photo time",
    price: "¥9,000",
    time: "2.5–3 hours (60 + 90 min, 5-min walk)",
    age: "From 7",
    english: "Museum tour in English",
    where: "Asakusa (two venues)",
  },
  {
    name: "SAMURAI've sword-fight (tate) class",
    kind: "Samurai sword fighting with stage performers",
    price: "¥11,000 adult / ¥8,800 under 12",
    time: "60 min",
    age: "Any age, per the studio",
    english: "English booking page",
    where: "Sendagaya (4 min from Kitasando)",
  },
];

const sources = [
  { label: "Basic Ticket", url: MUSEUM_BASIC },
  { label: "Ninja Experience", url: MUSEUM_NINJA },
  { label: "Sword Experience", url: MUSEUM_SWORD },
  { label: "Kids & Family combo", url: MUSEUM_FAMILY },
  { label: "Samurai & Ninja combo", url: MUSEUM_COMBO },
  { label: "Kimono tea combo", url: MUSEUM_KIMONO },
  { label: "SAMURAI've", url: SAMURAIVE },
];

const kidsRows = [
  { age: "Under 3", pick: "Come along on an adult's Basic Ticket", why: "Free admission, but under-3s cannot take part in the ninja activities." },
  { age: "3 to 5", pick: "Basic Ticket or the family Ninja Experience", why: "Both are open from age 3; the sword dojo is not, because under-6s cannot enter it." },
  { age: "6 to 9", pick: "Samurai Sword Experience or the Kids & Family combo", why: "Old enough for the dojo; the 2-hour combo adds sword fighting with a safe replica." },
  { age: "7 and up", pick: "Museum + Kimono Tea Ceremony combo", why: "The tea ceremony room takes children from 7; the kimono dressing is part of it." },
  { age: "10 and up", pick: "3-hour Samurai & Ninja Combo", why: "The longest session, with iaido basics and a controlled sword fight, starts at 10." },
];

const whoFor = [
  {
    title: "Book the Basic Ticket if…",
    desc: "You want one indoor hour near Senso-ji. ¥3,000 covers an English-guided tour of the armour and weapons, ninja-star throwing and soft-armour photos at your own pace, and children from 3 can join everything.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M4 21V9l8-5 8 5v12" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Book a sword session if…",
    desc: "You want to hold a sword rather than pose with one. The ¥9,000 Sword Experience puts you in hakama for about 30 minutes of grip, draw and kata with a replica; the 3-hour ¥14,000 combo adds a controlled sword fight and is for ages 10 and up.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4l5 5-9 9-5 1 1-5z" />
        <path d="M3 21l3-3" />
      </svg>
    ),
  },
  {
    title: "Book SAMURAI've if…",
    desc: "You want the film-style sword fight (tate) rather than a museum. The 60-minute class in Sendagaya is run by professional samurai performers, ends with a photo shoot, and is closer to Harajuku than to Asakusa.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l7-7M13 11l7-7M15 4h5v5" />
        <path d="M4 15v5h5" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "How much does a samurai experience in Tokyo cost?",
    a: `At the Samurai Ninja Museum in Asakusa the Basic Ticket is ¥3,000 for adults, the family Ninja Experience ¥5,700, the Samurai Sword Experience ¥9,000 and the 3-hour Samurai & Ninja Combo ¥14,000. SAMURAI've in Sendagaya lists ¥11,000 for adults and ¥8,800 for under-12s for its 60-minute sword-fight class. Prices from the operators' own pages, checked ${CHECKED}.`,
  },
  {
    q: "How long does a samurai and ninja experience take?",
    a: "The museum's Basic Ticket takes about 60 minutes (45 to 60 depending on how busy it is), the family Ninja Experience about 120 minutes including the tour, and the Samurai & Ninja Combo about 180 minutes. The SAMURAI've class is 60 minutes; arrive about 15 minutes early.",
  },
  {
    q: "What is the minimum age for the samurai and ninja experience?",
    a: "Age 3 for the museum's Basic Ticket and family Ninja Experience, with the child rate up to 12 and under-3s free but not joining the activities. Children under 6 cannot enter the samurai sword dojo, the kimono tea ceremony combo starts at 7, and the 3-hour combo at 10.",
  },
  {
    q: "Do you use a real sword in a samurai experience in Tokyo?",
    a: "No. The museum uses model and replica weapons for every session, and its FAQ notes that lending a real katana for recreation or training is illegal. If you want a real blade, the museum sells authenticated swords in its shop, but they are not used in the lessons.",
  },
  {
    q: "Do I need to book a samurai or ninja experience in advance?",
    a: "Yes for the sword sessions and combos, which usually do not take walk-ins. The Basic Ticket accepts walk-ins, but the museum recommends booking, especially in early April and mid-November. A time you cannot select in the calendar is full, and there is no waitlist.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/samurai-ninja-experience-tokyo") } });

export default function SamuraiNinjaExperienceTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/samurai-ninja-experience-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/samurai-ninja-experience-tokyo" />
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
            __html: articleJsonLd({
              route: "/guides/attractions/samurai-ninja-experience-tokyo",
              headline: `${H1_LINE1} ${H1_LINE2}`,
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
                { "@type": "ListItem", position: 4, name: "Samurai & Ninja Experience", item: "https://www.japan-travel-kit.com/guides/attractions/samurai-ninja-experience-tokyo" },
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
          <span className={styles.breadCurrent}>Samurai &amp; Ninja Experience</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            {H1_LINE1} <br />{H1_LINE2}
          </h1>
          <p className={styles.heroSubtitle}>
            Seven sessions in Tokyo compared by price, length, minimum age and English — and which one to book
            for a family, a sword lesson or a film-style sword fight.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Ages 3+"].map((t) => (
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
            <p className={styles.verdictText} style={{ marginTop: 0 }}>
              A samurai and ninja experience in Tokyo costs <strong>¥3,000</strong> for the Samurai Ninja
              Museum&apos;s 60-minute Basic Ticket in Asakusa — an English-guided tour, ninja-star throwing and
              armour photos — and <strong>¥5,700 to ¥14,000</strong> for its 2-hour ninja course, sword lesson
              and 3-hour samurai-and-ninja combo. SAMURAI&apos;ve in Sendagaya runs a 60-minute sword-fight class
              for ¥11,000 an adult. Children can join from 3 at the museum, from 6 in the sword dojo and from
              10 on the 3-hour combo. Operators&apos; prices, checked {CHECKED}.
            </p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "1rem" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest</p>
                <p className={styles.verdictStatValue}>¥3,000 · about 60 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Sword lesson</p>
                <p className={styles.verdictStatValue}>From ¥9,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Youngest</p>
                <p className={styles.verdictStatValue}>Age 3 (dojo: 6)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Asakusa · Sendagaya</p>
              </div>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={SAMURAI_NINJA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Samurai &amp; Ninja Museum dates on Klook →
              </KlookLink>
              <GygCompareButton slug="samurai-ninja-experience-tokyo" listing={gygTokyoSamuraiNinja} />
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compared</span>
          <h2 className={styles.sectionTitle}>How Much Does a Samurai or Ninja Experience in Tokyo Cost?</h2>
          <p className={styles.bodyText}>
            From ¥3,000 for an hour at the museum to ¥14,000 for three hours of sword and ninja training. The
            price mostly buys time with a sword: the cheaper tickets are a tour with hands-on extras, the
            dearer ones a lesson in hakama.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Experience", "Type", "Adult price", "Duration", "Minimum age", "English", "Where"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider}>{row.name}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.kind}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.age}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.english}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Prices are the operators&apos; listed adult prices; the museum shows the
            price for your date in its booking calendar, and coupons do not apply 16 March–30 April, 1–31
            October and 20 December–5 January. Sources:{" "}
            {sources.map((s, i) => (
              <span key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                {i < sources.length - 1 ? " · " : ""}
              </span>
            ))}
            .
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Which Samurai or Ninja Experience Should You Book?</h2>
          <p className={styles.bodyText}>
            The Basic Ticket for a first visit, a sword session if handling the blade is the point, and
            SAMURAI&apos;ve for a staged sword fight. All of them are indoors, so any of them works on a wet day.
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kids */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Which Samurai Experience Is Best for Kids?</h2>
          <p className={styles.bodyText}>
            Go by age: the museum&apos;s Basic Ticket and family Ninja Experience take children from 3, the
            sword dojo from 6 and the 3-hour combo from 10. Children aged 12 and under pay the child rate at
            the museum.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Child's age", "What to book", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kidsRows.map((row) => (
                    <tr key={row.age}>
                      <td className={styles.tdProvider}>{row.age}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.pick}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Age rules from the{" "}
            <a href={MUSEUM_BASIC} target="_blank" rel="noopener noreferrer">Samurai Ninja Museum Tokyo</a> tour pages.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For a whole family trip, our{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids">Tokyo itinerary with kids</Link> keeps the
            indoor days movable around the weather, and the{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3-day itinerary</Link> puts Asakusa on
            Day 2, where the museum fits between Senso-ji and Skytree.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book a Samurai Experience in Tokyo?</h2>
          <p className={styles.bodyText}>
            A few days ahead for the Basic Ticket, and as soon as your dates are fixed for a sword session or
            combo. The museum takes walk-ins on the Basic Ticket but recommends booking, especially in early
            April and mid-November; the combos usually take no walk-ins at all.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Hours:</strong> tours run every day from 9:00 to 18:30. Arrive at least 5 minutes before your slot; a late arrival may get a shortened session.</li>
            <li><strong>Full slots:</strong> a time you cannot select in the calendar is fully booked. There is no waitlist, and cancellations reappear in the calendar — the museum suggests its Shinjuku branch when Asakusa is full.</li>
            <li><strong>Language:</strong> the tour is a shared group tour in English, and interpreting for your group during it is not allowed; book a private session if someone needs a translation.</li>
            <li><strong>Luggage:</strong> large suitcases cannot be stored at the museum, so use a coin locker at the station first.</li>
            <li><strong>Kimono:</strong> guests coming from MAIKOYA&apos;s kimono tea ceremony in Asakusa can keep the kimono on for the sword session.</li>
          </ul>
          <p className={styles.bodyText}>
            The museum is a 2-minute walk from Tawaramachi on the Ginza Line and 8 minutes from Asakusa Station,
            so it sits inside a{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental">kimono day in Asakusa</Link> or ahead of an
            afternoon on an{" "}
            <Link href="/guides/attractions/akihabara-anime-tour">Akihabara anime tour</Link>. For the rest of the
            city, see{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={SAMURAI_NINJA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Samurai &amp; Ninja Museum dates on Klook →
            </KlookLink>
          </div>
        </section>

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
          heading="Around Asakusa, the Same Day"
          intro="The museum sits a few minutes from Senso-ji, so the obvious pairings are the ones that start or finish nearby. Open a listing for the current price on your date."
          tours={[skytreeTicket, tokyoSightseeingBusTour, tokyoSubwayTicket]}
        />

        {/* The same museums, plus the Shinjuku branch, on a second platform. */}
        <GygCompare
          slug="samurai-ninja-experience-tokyo"
          heading="Samurai and Ninja Experiences on GetYourGuide"
          intro="These run as timed sessions with a guide, so a wet afternoon fills them and the slot you want may be gone. GetYourGuide lists the Samurai Ninja Museum at both its Asakusa and Shinjuku branches, along with the kid-friendly training formats — check the minimum age there as carefully as you would here."
          listings={[gygTokyoSamuraiNinja]}
        />

        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/akihabara-anime-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Akihabara Anime Tour (2026): Guided Tours, Shop Hours &amp; How to Get There</p>
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
            <Link href="/guides/attractions/tsukiji-market-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-4 7-5 10-5s6 2 8 5c-2 3-5 5-8 5s-7-1-10-5z" />
                  <circle cx="16" cy="12" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tsukiji Market Food Tour (2026): Hours, What to Eat and Which Tour to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo 2026: Top Picks and Ticket Prices</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-go-kart" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13h2l2-3h8l2 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Go Kart 2026: Street Karting in Japan, Price &amp; IDP</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 3 4-3 3 6-3 2v9H8v-9L5 9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan 2026: Prices, Where to Rent &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                  <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
                  <path d="M6 3c0 1-1 1-1 2M10 3c0 1-1 1-1 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tea Ceremony in Tokyo: Best Experiences, Prices &amp; Kyoto Options</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sumo-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="6" r="3" />
                  <path d="M6 21c0-4 2.7-7 6-7s6 3 6 7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice</p>
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
                <p className={styles.relatedTitle}>How to Get Around Tokyo (2026): Trains, Subway Fares &amp; Which Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Step into Japan&apos;s warrior past</h2>
            <p className={styles.ctaBannerDesc}>
              Whether you want a family-friendly museum session or a hands-on sword lesson, Tokyo&apos;s indoor,
              year-round experiences make an easy add to any itinerary. Compare options, check the age limits,
              and book your slot in advance.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={SAMURAI_NINJA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Browse Samurai &amp; Ninja Experiences →
              </KlookLink>
              <GygCompareButton slug="samurai-ninja-experience-tokyo" listing={gygTokyoSamuraiNinja} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
