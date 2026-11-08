import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  arashiyamaHozukyoHalfDayTour,
  gionNightSameDayPrep,
  gionNightStayAreas,
  kyotoFushimiInariWalkingTour,
  kyotoGionFoodieNightTour,
  kyotoGionHiddenGemsNightTour,
  kyotoGionKaisekiNightTour,
  kyotoGionNightWalkingTour,
  kyotoGionPrivateWalkingTour,
  kyotoGionStudentNightWalk,
  kyotoKimonoAiwafukuGion,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";

/**
 * Gion night walking tour, added 4 Nov 2026 for the exact phrase. The page sells the
 * 6.5% Klook tours band; the hotels are 6.5% and the eSIM 20%.
 *
 * Every fact below was read on 4 Nov 2026:
 *
 *   Klook listings          /activity/ pages answer automated reads with HTTP 403, so the
 *                           five listings were read as www.klook.com search-index copies.
 *                           Anything an index copy did not show is marked as such in the
 *                           table rather than filled in. No Klook price appears anywhere.
 *   kyoto.travel (Kyoto     "Things to Keep in Mind…" (17 Nov 2023) for the maiko photo
 *     City Tourism          rule, Hanamikoji's side stones, lanterns, fences, tripods and
 *     Association)          portrait rights; the Gion & Kiyomizu area page; the Yasaka
 *                           access page (15 min to Higashiyama, 13 min on foot from Shijo
 *                           Kawaramachi); the EX100 article (5 Mar 2025).
 *   ja.kyoto.travel         Gion Shinbashi preservation district; the Tatsumi Bridge
 *                           location entry.
 *   yasaka-jinja.or.jp      Worship 24 hours, office 9:00–17:00.
 *
 * The private-road rules are NOT on either Kyoto City page. They are a local council's
 * rules, and the table says so: Kansai TV (18 Mar 2024) for the 2019 photo rule, Hanamikoji
 * being a public road and Kosode-koji; The Star, 1 Jun 2024, for the sign wording, the
 * 29 May 2024 date and the fine not being statutory.
 */
const CHECKED = checkedLabel("2026-11-04");
const ROUTE = "/guides/attractions/gion-night-walking-tour";
const NOT_SHOWN = "Not in the listing text";

/** Klook listing facts only; no prices. */
const tourRows = [
  {
    tour: "Gion Night Guided Walking Tour",
    url: kyotoGionNightWalkingTour.url,
    type: "Small group",
    start: NOT_SHOWN,
    length: "3 hours",
    size: "Small group; cap not stated",
    food: "None listed",
    cancel: NOT_SHOWN,
  },
  {
    tour: "Gion Night Tour: Geisha District & Hidden Gems",
    url: kyotoGionHiddenGemsNightTour.url,
    type: "Shared with other participants",
    start: NOT_SHOWN,
    length: NOT_SHOWN,
    size: NOT_SHOWN,
    food: "None listed",
    cancel: "Late arrivals cannot join and are not refunded",
  },
  {
    tour: "Gion Night Tour with Kaiseki Dinner",
    url: kyotoGionKaisekiNightTour.url,
    type: "Small group with dinner",
    start: "17:00",
    length: "3 hours (17:00–20:00)",
    size: "2–10",
    food: "Kaiseki dinner",
    cancel: "Full refund at least 72 hours before the start",
  },
  {
    tour: "Private Gion Highlights & Hidden Gems Tour",
    url: kyotoGionPrivateWalkingTour.url,
    type: "Private, your party only",
    start: "16:00, 17:00 or 18:00",
    length: "3 hours",
    size: "Options for 1–4 and 5–8",
    food: "Meals not included",
    cancel: "Free with 24 hours' notice; no refund for no-shows",
  },
  {
    tour: "Gion Small-Group Night Walk with Local Students",
    url: kyotoGionStudentNightWalk.url,
    type: "Small group, student-led",
    start: "From 18:00; up to 20:00 listed",
    length: NOT_SHOWN,
    size: "1–6",
    food: NOT_SHOWN,
    cancel: "Tagged free cancellation; deadline shown at checkout",
  },
];

/** What is officially described, and what the tours name. */
const sightRows = [
  {
    place: "Hanamikoji Street",
    what: "Gion's best-known street, and a public road. The city's tourism association asks walkers to keep to the side stones because of the traffic.",
    source: "kyoto.travel",
  },
  {
    place: "Shirakawa and Gion Shinbashi",
    what: "A preservation district of teahouse-style townhouses, developed as a teahouse quarter and kept together with the Shirakawa stream, stone paving and a row of cherry trees.",
    source: "Kyoto City",
  },
  {
    place: "Tatsumi Bridge",
    what: "The Shirakawa crossing on Gion Shirakawa Minami-dori in Motoyoshi-cho, listed by Kyoto City as a film and TV location.",
    source: "Kyoto City",
  },
  {
    place: "Yasaka Shrine",
    what: "The shrine the Gion area grew up in front of. Worship is possible 24 hours a day, and the shrine office keeps 9:00–17:00, so a night visit means the grounds, not the office.",
    source: "yasaka-jinja.or.jp",
  },
];

/** Rules, each with who actually says so. */
const ruleRows = [
  {
    rule: "Photographing maiko without permission",
    status: "Prohibited. Stopping them on the street to ask is prohibited too.",
    fine: "None stated by the city",
    source: "kyoto.travel",
  },
  {
    rule: "Posting photos of identifiable people on social media",
    status: "Can violate portrait rights if done without their permission.",
    fine: "None stated",
    source: "kyoto.travel",
  },
  {
    rule: "Filming on Gion's private roads",
    status: "Banned in principle since 2019 by the council that manages them.",
    fine: "Reported at ¥10,000",
    source: "Kansai TV, Time Out, reporting the council",
  },
  {
    rule: "Entering Kosode-koji, the private lane off Hanamikoji",
    status: "No entry. Signs at both ends went up on 29 May 2024, and the warning covers guided tours as well.",
    fine: "Sign: \"Fine up to 10,000 yen\". Reported as not statutory or legally binding.",
    source: "The Star, Kansai TV, reporting the council",
  },
  {
    rule: "Walking Hanamikoji",
    status: "Open to everyone as a public road. Keep to the side stones and out of the middle.",
    fine: "None",
    source: "kyoto.travel, Kansai TV",
  },
  {
    rule: "Lanterns and fences outside tea houses",
    status: "Do not touch the lanterns or lean on the fences.",
    fine: "None stated",
    source: "kyoto.travel",
  },
  {
    rule: "Tripods for street photos",
    status: "Asked not to use them, because they get in the way of traffic.",
    fine: "None stated",
    source: "kyoto.travel",
  },
];

const compareRows = [
  { what: "Route", tour: "Set by the guide; the listing names the main stops", solo: "Yours, and a public-road route is easy to keep to" },
  { what: "Private lanes", tour: "The same rules apply: the Kosode-koji warning names guided tours", solo: "You have to spot the signs yourself" },
  { what: "Start time", tour: "Fixed: 16:00–20:00 depending on the listing", solo: "Whenever you like; Yasaka Shrine is open for worship around the clock" },
  { what: "Being late", tour: "On one listing you cannot join and are not refunded", solo: "No penalty" },
  { what: "Language", tour: "English-guided on the listings that state it", solo: "Signs only, and this page" },
  { what: "Dinner", tour: "In the booking on the kaiseki tour only", solo: "Your own reservation" },
  { what: "Seeing a maiko", tour: "Not guaranteed: the listing calls it a chance", solo: "Not guaranteed either" },
  { what: "Booking", tour: "Needed, and cancellation terms vary from 24 to 72 hours", solo: "None" },
];

const faqItems = [
  {
    q: "What do you see on a Gion night walking tour?",
    a: `The listings name Hanamikoji Street after dark, teahouse architecture, and backstreets, alleys and small temples away from the main road, and the private tour adds Gion Corner and the Kamo River. Shirakawa, Tatsumi Bridge and Yasaka Shrine are the other official sights in the same area, but no listing text names them all, so check the itinerary if one matters to you. Read on ${CHECKED}.`,
  },
  {
    q: "How long is a Gion night walking tour?",
    a: `Three hours on the three Klook listings that state a length: the Night Guided Walking Tour, the 17:00–20:00 kaiseki tour and the private walk. Read on ${CHECKED}; the checkout shows the current length for your date.`,
  },
  {
    q: "What time should you go to Gion at night?",
    a: `Start around dusk for your month. Kyoto has no official best hour, but the Klook listings point the same way: the private tour leaves at 16:00, 17:00 or 18:00, the kaiseki tour runs 17:00–20:00, and the student-led walk leaves from 18:00. The walk after dinner is still open to you on Hanamikoji, which is a public road, and Yasaka Shrine can be visited 24 hours a day.`,
  },
  {
    q: "Can you see a geisha in Gion?",
    a: "Possibly, but never on demand. Kyoto's tourism association says Gion is well known as an area where you can encounter maiko, and Klook's main listing offers a chance of seeing a geiko or maiko rather than a promise. If you do see one, she is on her way to an engagement and in a hurry, so step aside and do not stop her or photograph her without permission.",
  },
  {
    q: "Can you take photos in Gion?",
    a: `Yes on public roads such as Hanamikoji, with limits. Photographing maiko without permission is prohibited on Kyoto's official tourism site, tripods are discouraged, and filming on Gion's private roads has been banned in principle by the local council since 2019. The ¥10,000 warning is on a private lane, Kosode-koji. Read on ${CHECKED}.`,
  },
  {
    q: "Is there really a ¥10,000 fine in Gion?",
    a: "A sign says so on Kosode-koji, the private lane off Hanamikoji: \"Private road. Do not enter. Fine up to 10,000 yen.\" The council set it up, and The Star reported in June 2024 that the fine is not statutory or legally binding. The city's own visitor guidance does not mention it. Treat the lane as closed either way: the point of the sign is that people live and work there.",
  },
  {
    q: "Is a Gion night tour worth it?",
    a: "Worth it if you want the street explained and a route that stays out of trouble, or if the kaiseki version saves you finding dinner. Not needed if you only want the look of Hanamikoji and Shirakawa at night: both are free to walk, and the official etiquette fits on one screen of this page. A guide does not exempt you from the rules, because the Kosode-koji warning names guided tours too.",
  },
  {
    q: "Do you need to book a Gion tour in advance?",
    a: "Yes for the kaiseki tour, which cancels for a full refund only 72 hours out and takes 2–10 people, and for any private date you care about. The main Night Guided Walking Tour lists last-minute bookings as accepted, so it is the fallback for a free evening. Walking Gion on your own needs no booking at all.",
  },
  {
    q: "What if I am late for a Gion night tour?",
    a: "Assume you lose the booking. The Gion Night Tour listing says latecomers cannot join and are not refunded, and the private tour gives no refund for no-shows. From Kyoto Station, the subway to Higashiyama takes about 15 minutes; buses on Shijo-dori can take an unexpected amount of time because of traffic, so do not rely on one for a fixed start.",
  },
  {
    q: "Can I wear a kimono on a Gion night tour?",
    a: "Check the return deadline first. Yumeyakata's listing wants a same-day kimono back by 17:30, which falls before any of these 3-hour tours ends, and it sells a next-day return for a fee. Book that return, or plan the kimono for the afternoon and change before the walk.",
  },
  {
    q: "Are Gion night tours suitable for wheelchairs or children?",
    a: "The Gion Night Tour listing states it is not wheelchair accessible. On the private tour, children aged 2–12 count toward your group size. Other listings do not show a rule in their listing text, so ask at checkout before booking with a pram or a wheelchair.",
  },
];

const TITLE = "Gion Night Walking Tour 2026: Times, Types & Photo Rules";
const DESCRIPTION =
  "A Gion night walking tour runs about 3 hours, starting 16:00–20:00 by listing. Compare small-group, private and kaiseki tours, plus Gion's photo rules.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
    { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
    { "@type": "ListItem", position: 4, name: "Gion Night Walking Tour", item: `https://www.japan-travel-kit.com${ROUTE}` },
  ],
};

const relatedGuides = [
  { href: "/guides/attractions/kyoto-maiko-dinner", title: "Kyoto Maiko Dinner (2026): Types, Gion Rules & Booking" },
  { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto (2026): Temples, Timing and What to Book" },
  { href: "/guides/attractions/where-to-stay-in-kyoto", title: "Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time" },
  { href: "/guides/attractions/kyoto-kimono-rental", title: "Kyoto Kimono Rental (2026): Which Area, What's Included, When to Return" },
  { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "Osaka Kyoto 3 Day Itinerary (2026): Day by Day & Bookings" },
  { href: "/guides/attractions/tea-ceremony-japan", title: "Japanese Tea Ceremony Experience: Price, How Long and Where to Book" },
];

const chevron = (
  <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" };
const linkStyle = { color: "var(--red)", fontWeight: 600 };

export default function GionNightWalkingTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {chevron}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {chevron}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {chevron}
          <span className={styles.breadCurrent}>Gion Night Walking Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Gion Night Walking Tour:<br />Times, Tour Types &amp; the Photo Rules
          </h1>
          <p className={styles.heroSubtitle}>
            Five Klook tours side by side, and the rules that apply in Gion after dark, each with who actually
            set it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Small group, private, kaiseki", "Dated rules table", "Tour vs on your own"].map((t) => (
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

        {/* Lead paragraph: the whole answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Gion night walking tour</strong> on Klook lasts <strong>about 3 hours</strong> and starts
            between <strong>16:00 and 20:00</strong> depending on the listing: a private walk leaves at 16:00,
            17:00 or 18:00, a small-group tour with kaiseki dinner runs 17:00–20:00 for 2–10 people, and a
            student-led walk for up to six leaves from 18:00. Expect Hanamikoji Street after dark, teahouse
            architecture and quiet backstreets; Shirakawa, Tatsumi Bridge and Yasaka Shrine are in the same area
            and open to you on foot. The difference from going alone is the route and the explanation, not the
            rules: photographing maiko without permission is prohibited, and on Kosode-koji, a private lane off
            Hanamikoji, a sign warns of a fine of up to ¥10,000, tour groups included. Read on {CHECKED}.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>About 3 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Starts</p>
                <p className={styles.verdictStatValue}>16:00–20:00, by listing</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Dinner included</p>
                <p className={styles.verdictStatValue}>Kaiseki tour only</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Seeing a maiko</p>
                <p className={styles.verdictStatValue}>A chance, not a promise</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> take the small-group walk if you only want the evening explained, the
              kaiseki tour if you also need dinner sorted, and the private walk if your party wants its own
              start time.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoGionNightWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the Gion night walk on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Tour types */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour types</span>
          <h2 className={styles.sectionTitle}>Which Gion Night Tour Should You Book?</h2>
          <p className={styles.bodyText}>
            Decide on dinner first, then on who else is in the group. Only one of these five includes a meal,
            only one is yours alone, and their cancellation deadlines differ by two full days.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Klook tour", "Type", "Start", "Length", "Group size", "Food", "Cancellation"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener">{row.tour}</KlookLink>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.type}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.start}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.size}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.food}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cancel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Read on {CHECKED} from the Klook listings as they appear in search results. Where a cell says the
            detail was not in the listing text, Klook shows it on
            the listing or at checkout. Times and terms can change by date, so the checkout is the final word.
            Current prices are on Klook.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoGionKaisekiNightTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the kaiseki tour →
            </KlookLink>
            <KlookLink href={kyotoGionPrivateWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the private walk →
            </KlookLink>
          </div>
        </section>

        {/* What you see */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The route</span>
          <h2 className={styles.sectionTitle}>What Do You See on a Gion Night Walking Tour?</h2>
          <p className={styles.bodyText}>
            Hanamikoji Street is the one fixture: it is the stop the listings name, along with teahouse
            architecture and quiet alleys and temples off the main road. The private tour also lists Gion Corner
            and the Kamo River. If Tatsumi Bridge or Shirakawa is the reason you are going, confirm it on the
            itinerary, because the listing text does not name either.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Place", `What the official sources say (read ${CHECKED})`, "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sightRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rules</span>
          <h2 className={styles.sectionTitle}>Can You Take Photos in Gion?</h2>
          <p className={styles.bodyText}>
            Yes on public roads such as Hanamikoji, but not of maiko without their permission and not on
            Gion&apos;s private lanes. Two different bodies are behind the rules, which is why many summaries
            blur them: the conduct rules are on Kyoto&apos;s official tourism site, while the private-road ban
            and the ¥10,000 sign belong to a local council.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Rule", `Status (read ${CHECKED})`, "Fine", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ruleRows.map((row) => (
                    <tr key={row.rule}>
                      <td className={styles.tdProvider}>{row.rule}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.status}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fine}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            The Kyoto City Tourism Association&apos;s guidance does not mention private roads or a fine, and no
            city notice or council text is linked here, so those rows rest on Kansai TV (18 March 2024), The
            Star (1 June 2024) and Time Out (12 March 2024), each reporting the council. Reports from after 2024
            were not found, so follow any sign you see on the day.
          </p>
        </section>

        {/* Geisha */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Geiko and maiko</span>
          <h2 className={styles.sectionTitle}>Can You See a Geisha in Gion?</h2>
          <p className={styles.bodyText}>
            You may, but no tour can promise it. Kyoto&apos;s tourism association says Gion is well known as an
            area where you can encounter maiko, and Klook&apos;s main listing offers a chance of it. The same
            guidance explains why a sighting is brief: a maiko out in full attire has an engagement to reach and
            is in a hurry. Step aside, do not stop her, and do not treat the moment as a photo opportunity.
          </p>
        </section>

        {/* Time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>What Time Should You Go to Gion at Night?</h2>
          <p className={styles.bodyText}>
            Aim for dusk in your month, then stay on. The official sources checked give no best hour, but the tours cluster
            there: departures at 16:00, 17:00 and 18:00 on the private walk, 17:00 on the kaiseki tour and from
            18:00 on the student-led walk. For a seasonal reason to stay later, Kyoto&apos;s official calendar
            lists Kodai-ji&apos;s night viewing from 23 October to 13 December 2026, Shoren-in&apos;s evening
            opening from 7 November to 6 December, and Chion-in&apos;s illumination from 17 November to
            6 December.
          </p>
        </section>

        {/* How long */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Length</span>
          <h2 className={styles.sectionTitle}>How Long Is a Gion Night Walking Tour?</h2>
          <p className={styles.bodyText}>
            Three hours on every Klook listing that states a length, and that includes the 17:00–20:00 kaiseki
            tour, so its dinner is inside the three hours rather than added on. Plan a 16:00 private start and
            you are done by 19:00, in time for a separate dinner.
          </p>
        </section>

        {/* Tour vs solo */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or on your own</span>
          <h2 className={styles.sectionTitle}>Is a Gion Night Tour Worth It?</h2>
          <p className={styles.bodyText}>
            It is worth it if you want Gion explained, or dinner handled on the kaiseki tour. It is not needed
            just to see the streets: Hanamikoji is a public road and the walk costs nothing. A guide does not
            buy any exemption, since the Kosode-koji warning covers guided tours too.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `On a Klook tour (read ${CHECKED})`, "On your own"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.solo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book a Gion Tour in Advance?</h2>
          <p className={styles.bodyText}>
            Book the kaiseki tour ahead and treat it as a commitment: the listing refunds in full only at least
            72 hours before the start, while the private walk is free to cancel with 24 hours&apos; notice. The
            main Night Guided Walking Tour lists last-minute bookings as accepted, which makes it the fallback
            if your Kyoto evening opens up late. Choose a date first, because the live availability is the one
            thing this page cannot give you.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={kyotoGionNightWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              See dates for the night walk →
            </KlookLink>
            <KlookLink href={kyotoGionHiddenGemsNightTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              See the hidden gems tour →
            </KlookLink>
            <KlookLink href={kyotoGionStudentNightWalk.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              See the student-led walk →
            </KlookLink>
          </div>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Gion for an Evening Tour?</h2>
          <p className={styles.bodyText}>
            Take the subway, because a tour start is the wrong moment to test a bus. The Karasuma and Tozai
            lines reach Higashiyama from Kyoto Station in about 15 minutes, and Yasaka Shrine is about
            13 minutes on foot from Shijo Kawaramachi. The official guide warns that buses on Shijo-dori can
            take an unexpected amount of time because of traffic. The EX100 express bus takes about 15 minutes
            to Gion but runs only on weekends, holidays and set peak periods. Read on {CHECKED}; your booking
            names the exact meeting point.
          </p>
        </section>

        {/* Before and after */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The rest of the day</span>
          <h2 className={styles.sectionTitle}>What Should You Pair With a Gion Night Tour?</h2>
          <p className={styles.bodyText}>
            <strong>Dinner.</strong> The kaiseki tour covers it in one booking. Otherwise take a start early
            enough to eat after, or book the{" "}
            <KlookLink href={kyotoGionFoodieNightTour.url} target="_blank" rel="sponsored noopener" style={linkStyle}>
              Gion night food tour
            </KlookLink>{" "}
            with its listed nine-plus dishes and three sake tastings as your evening instead.
          </p>
          <p className={styles.bodyText}>
            <strong>Kimono rental.</strong> Check the return time before you book both. Yumeyakata&apos;s listing
            asks for a same-day return by 17:30, which clashes with every tour above, since even a 16:00 start ends at
            19:00, and it sells a next-day return for a fee. Our{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>Kyoto kimono rental guide</Link>{" "}
            compares the shops by area. The{" "}
            <KlookLink href={kyotoKimonoAiwafukuGion.url} target="_blank" rel="sponsored noopener" style={linkStyle}>
              Aiwafuku Gion Shijo store
            </KlookLink>{" "}
            lists itself two minutes from Hanamikoji and Shirakawa.
          </p>
          <p className={styles.bodyText}>
            <strong>Next morning.</strong> Fushimi Inari and Arashiyama both suit an early start after a late
            night in Gion. Kyoto City puts them 10 and 25 minutes from Kyoto Station; our{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>Kyoto 2 day itinerary</Link>{" "}
            shows how the days fit together. For more evening culture, see our{" "}
            <Link href="/guides/attractions/tea-ceremony-japan" style={linkStyle}>tea ceremony guide</Link>.
          </p>
        </section>

        <KlookTourPicks
          heading="The Morning After Gion"
          intro="A night in Gion leaves the next day open. These two are guided mornings on the other sides of Kyoto, booked on the same Klook account as your tour."
          tours={[kyotoFushimiInariWalkingTour, arashiyamaHozukyoHalfDayTour]}
        />

        <KlookStayAreas
          heading="Where Should You Stay for a Night in Gion?"
          intro="A 3-hour evening tour ends after dark, so the easiest hotel is one you can walk back to. Set your dates on Klook to see what is left in each area, or compare every district in our Where to Stay in Kyoto guide."
          areas={gionNightStayAreas}
        />

        <KlookTripPrep
          label="Book for the same day"
          heading="What Else to Book for Your Gion Evening"
          intro="The tour covers three hours. These cover the rest of the day: the bed, the kimono and the data you need to find a meeting point in the dark."
          items={gionNightSameDayPrep}
        />

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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
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
            <h2 className={styles.ctaBannerTitle}>Book your evening in Gion</h2>
            <p className={styles.ctaBannerDesc}>
              About three hours, a start between 16:00 and 20:00, and cancellation terms that vary by listing.
              Check your date on Klook.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={kyotoGionNightWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Gion Night Walk →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
