import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  disneyAmbassadorHotelKlook,
  hiltonTokyoBayKlook,
  sheratonGrandeTokyoBayKlook,
  tokyoDisneyCelebrationHotelKlook,
  tokyoDisneyHotelsTripPrep,
  tokyoDisneylandHotelKlook,
  tokyoDisneyOneDayPassport,
  tokyoDisneyResortHotels,
  tokyoDisneySeaHotels,
  tokyoDisneySeaMiraCostaKlook,
  tokyoDisneyStayAreas,
  tokyoStayAreas,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Where to sleep for a Tokyo Disney day. Added 12 Nov 2026 (task-jtk-20261112-02) as the
 * hotel half of tokyo-disney-tickets, whose only Klook product is the 2% park ticket.
 *
 * Read on 12 November 2026 on tokyodisneyresort.jp:
 *
 *   /en/hotel/guide.html                 seven hotel categories; the six Disney Hotels and
 *                                        where each sits; six Official Hotels (shuttle to
 *                                        Bayside Station); four Partner Hotels in Shin-Urayasu
 *                                        (shuttle about 15 minutes); nine Good Neighbor Hotels
 *   /en/hotel/hotel_privilege.html       Official / Partner / Good Neighbor benefits, shuttles,
 *                                        ticket purchase, baggage delivery (¥800 per item)
 *   /en/hotel/topics/info/happy_entry.html  Happy Entry: 15 min at Disneyland, 5 to 15 min at
 *                                        DisneySea; dates it is not available (as of 26 Oct 2026)
 *   /en/hotel/topics/info/operation/reservation.html  rooms open 11:00 four months ahead
 *   /en/hotel/dh/privilege_dh.html       Disney Hotel guests can buy park tickets at the hotel
 *   /en/tdr/access/railway.html          Tokyo Station → Maihama about 15 minutes by JR
 *
 * The park ticket price and sale time are the values tokyo-disney-tickets already shows,
 * with that page's dates. No Klook price appears. Nothing here is first-hand.
 */

const OWN = checkedLabel("2026-11-12");
const TICKET_DATE = checkedLabel("2026-11-11");
const BUS_DATE = checkedLabel("2026-11-09");

const categories = [
  {
    name: "Disney Hotels",
    count: "6",
    where: "Inside or beside the parks: MiraCosta and Fantasy Springs Hotel are inside Tokyo DisneySea; Tokyo Disneyland Hotel is the closest hotel to the Disneyland entrance",
    getting: "On foot for most. Disney Ambassador Hotel: free non-stop shuttle to both parks. Toy Story Hotel: nearest station Bayside. Celebration Hotel: about 20 minutes by free shuttle",
    happyEntry: "Yes. Disneyland: 15 minutes early. DisneySea: 5 to 15 minutes early, MiraCosta and Fantasy Springs Hotel only",
    tickets: "Can buy park tickets for the stay at the hotel, even when sold out online",
  },
  {
    name: "Official Hotels",
    count: "6",
    where: "Inside the resort: Sheraton Grande, Hilton Tokyo Bay, MAIHAMA VIEW HOTEL, Grand Nikko, Hotel Okura, First Resort",
    getting: "Free Disney Resort Cruiser shuttle to Bayside Station, then the Disney Resort Line (fare applies) to either park",
    happyEntry: "Not listed for this category",
    tickets: "Can buy park tickets at the hotel, even when sold out online, if you contact the hotel ahead",
  },
  {
    name: "Partner Hotels",
    count: "4",
    where: "Shin-Urayasu: Urayasu Brighton, Hotel Emion, Oriental Hotel, Mitsui Garden Hotel Prana",
    getting: "Free direct shuttle to both parks' bus terminals, about 15 minutes, no reservation",
    happyEntry: "Not listed for this category",
    tickets: "Only with a package plan that includes a ticket or the right to buy one",
  },
  {
    name: "Good Neighbor Hotels",
    count: "9",
    where: "Shinjuku, Koto/Sumida, Daiba/Ariake and Chiba/Makuhari",
    getting: "Free shuttle to both parks, seats reserved at the hotel, limited",
    happyEntry: "Not listed for this category",
    tickets: "Only with a package plan that includes a ticket or the right to buy one",
  },
  {
    name: "Your own hotel at Tokyo Station",
    count: "—",
    where: "Central Tokyo, any hotel",
    getting: "JR Keiyo Line to Maihama, about 15 minutes. Disneyland is about 5 minutes on foot from Maihama",
    happyEntry: "No",
    tickets: "Buy online in advance",
  },
];

const klookHotels = [
  { hotel: tokyoDisneylandHotelKlook, category: "Disney Hotel", getting: "Closest hotel to the Disneyland entrance" },
  { hotel: tokyoDisneySeaMiraCostaKlook, category: "Disney Hotel", getting: "Inside Tokyo DisneySea" },
  { hotel: disneyAmbassadorHotelKlook, category: "Disney Hotel", getting: "Free non-stop shuttle to both parks" },
  { hotel: tokyoDisneyCelebrationHotelKlook, category: "Disney Hotel (Value type)", getting: "About 20 minutes by free shuttle" },
  { hotel: hiltonTokyoBayKlook, category: "Official Hotel", getting: "Free shuttle to Bayside Station, then the Disney Resort Line" },
  { hotel: sheratonGrandeTokyoBayKlook, category: "Official Hotel", getting: "Free shuttle to Bayside Station, then the Disney Resort Line" },
];

const bookingRows = [
  {
    what: "Disney Hotel room (room only, official site)",
    when: "From 11:00 Japan time, on the same date four months before your night",
    note: "No such date that month: from 11:00 on the 1st of the next month (a 31 October night opens 1 July). Up to 5 nights and 3 rooms",
  },
  {
    what: "Happy Entry dates",
    when: "Dates it is not available are set about four months ahead",
    note: "May not be known when you book. At Disneyland it is not available to MiraCosta, Fantasy Chateau and Celebration Hotel guests on 31 Oct 2026, 10 Nov 2026 and 12 Jan 2027",
  },
  {
    what: "Park ticket (1-Day Passport)",
    when: "From 14:00 Japan time, on the same date two months before your visit",
    note: "From ¥8,900 for an adult, priced by date. A hotel room does not include it",
  },
  {
    what: "Official, Partner and Good Neighbor Hotels",
    when: "Set by each hotel",
    note: "The resort publishes no opening date for these. Book once your dates are fixed",
  },
];

const whoRows = [
  {
    who: "Small children",
    pick: "A Disney Hotel",
    why: "Happy Entry, the shortest trip back for a nap, and a Happy Entry pass for every guest aged 4 or over",
  },
  {
    who: "Budget first",
    pick: "Celebration Hotel, a Partner Hotel, or Tokyo Station",
    why: "The resort describes Celebration as its Value type. Partner Hotels run a free 15-minute shuttle. A Tokyo Station hotel is about 15 minutes away by JR",
  },
  {
    who: "One park day inside a Tokyo trip",
    pick: "Tokyo Station",
    why: "One hotel for the whole trip: about 15 minutes to Maihama, and the shinkansen and Yamanote Line on the doorstep",
  },
  {
    who: "Two park days in a row",
    pick: "A Disney or Official Hotel",
    why: "You can buy park tickets at the hotel even when they are sold out online",
  },
  {
    who: "DisneySea first",
    pick: "MiraCosta",
    why: "Inside DisneySea, with Happy Entry there as well as at Disneyland",
  },
];

const faqItems = [
  {
    q: "Which Tokyo Disney hotel is closest to the parks?",
    a: `Tokyo DisneySea Hotel MiraCosta and Tokyo DisneySea Fantasy Springs Hotel are inside Tokyo DisneySea, and Tokyo Disneyland Hotel is the closest hotel to the Tokyo Disneyland entrance. All three are Disney Hotels, run by the resort. Read on tokyodisneyresort.jp, ${OWN}.`,
  },
  {
    q: "How many Tokyo Disney Resort hotels are there?",
    a: `The resort lists 6 Disney Hotels, 6 Official Hotels inside the resort, 4 Partner Hotels in Shin-Urayasu and 9 Good Neighbor Hotels in Tokyo and Chiba. Each group gets different benefits. Read ${OWN}.`,
  },
  {
    q: "Do Tokyo Disney hotels include park tickets?",
    a: "No, a room-only booking does not include a park ticket. Disney Hotel guests can buy tickets for their stay at the hotel, even when they are sold out on the official website. Official Hotel guests can too, if they contact the hotel ahead. The resort's Vacation Packages are the plans that include tickets.",
  },
  {
    q: "What is Happy Entry at Tokyo Disney hotels?",
    a: `Disney Hotel guests enter early through a special entrance: Tokyo Disneyland from 15 minutes before other guests, and Tokyo DisneySea from 5 to 15 minutes before, for MiraCosta and Fantasy Springs Hotel guests. It works every day of the stay except check-in day, and it needs a park ticket. Read ${OWN}.`,
  },
  {
    q: "When should I book Tokyo Disney hotels?",
    a: `Disney Hotel rooms open at 11:00 Japan time on the same date four months before your night. Book then for weekends and holidays. Park tickets open two months ahead at 14:00 Japan time, so book the room first. Read ${OWN}.`,
  },
  {
    q: "Can I stay at Tokyo Station and go to Tokyo Disney?",
    a: "Yes. The JR Keiyo Line runs from Tokyo Station to Maihama in about 15 minutes, and Tokyo Disneyland is about 5 minutes on foot from Maihama. For DisneySea, add the Disney Resort Line from Resort Gateway Station, about 9 minutes.",
  },
  {
    q: "Are Official Hotels at Tokyo Disney worth it?",
    a: "They are worth it if you want to sleep inside the resort without Disney Hotel prices. A free shuttle runs to Bayside Station on the Disney Resort Line, and you can buy park tickets at the hotel even when they are sold out online. They do not get Happy Entry.",
  },
];

const TITLE = "Tokyo Disney Hotels (2026): Closest, Official & Budget";
const H1_LINE = "Tokyo Disney Hotels (2026):";
const DESCRIPTION =
  "Tokyo Disney Hotels compared: hotels near Tokyo Disneyland, Official and Partner hotels, shuttles, Happy Entry and when to book Tokyo Disney Resort hotels.";

const ROUTE = "/guides/attractions/tokyo-disney-hotels";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/tokyo-disney-tickets", title: "Tokyo Disneyland Tickets 2026: Prices, Rules & DisneySea" },
  { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids: 5 Days, Day by Day (2026)" },
  { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport" },
  { href: "/guides/transport/tokyo-airport-limousine-bus", title: "Airport Limousine Bus Tokyo (2026): Narita & Haneda Fares, Times and Stops" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function TokyoDisneyHotelsPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo Disney Hotels", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo Disney Hotels</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE}<br />Which Is Closest, and When to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Disney Hotels, Official Hotels, Partner Hotels or a room in central Tokyo: how each one gets you to
            the gates, from the resort&apos;s own site.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Hotel groups from the official site", "Booking dates", "Shuttles compared"].map((t) => (
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

        {/* Lead paragraph: the whole answer, in the body rather than the hero. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The closest <strong>Tokyo Disney Hotels</strong> are the resort&apos;s own 6 Disney Hotels:
            MiraCosta and Fantasy Springs Hotel are inside Tokyo DisneySea, and Tokyo Disneyland Hotel is the
            closest hotel to the Disneyland entrance. Next are the 6 Official Hotels inside the resort, on a
            free shuttle to Bayside Station on the Disney Resort Line. To spend less, compare the 4 Partner
            Hotels in Shin-Urayasu (free shuttle, about 15 minutes) or a hotel at Tokyo Station, about 15
            minutes from Maihama by JR. Disney Hotel rooms open at 11:00 Japan time four months ahead. Read on
            tokyodisneyresort.jp, {OWN}.
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
                <p className={styles.verdictStatLabel}>Closest to Disneyland</p>
                <p className={styles.verdictStatValue}>Tokyo Disneyland Hotel</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Inside DisneySea</p>
                <p className={styles.verdictStatValue}>MiraCosta, Fantasy Springs</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Early entry</p>
                <p className={styles.verdictStatValue}>Disney Hotels only</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Disney Hotel rooms open</p>
                <p className={styles.verdictStatValue}>4 months ahead, 11:00 JST</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a Disney Hotel for small children and early entry, an Official Hotel to
              sleep inside the resort for less, and Shin-Urayasu or Tokyo Station when the budget comes first.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoDisneyResortHotels.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Compare Disney-area hotels on Klook →
              </KlookLink>
              <KlookLink href={tokyoDisneylandHotelKlook.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo Disneyland Hotel →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Categories */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare hotel types</span>
          <h2 className={styles.sectionTitle}>What Are the Tokyo Disney Resort Hotels?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The resort sorts its hotels into groups by the benefits guests get. Only Disney Hotels get early
            entry. The first row is the answer for most families.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Type", "Hotels", "Where", "Getting to the parks", "Happy Entry", "Park tickets at the hotel"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.name}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.count}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.happyEntry}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.tickets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {OWN}</strong> · Sources: https://www.tokyodisneyresort.jp/en/hotel/guide.html,
            https://www.tokyodisneyresort.jp/en/hotel/hotel_privilege.html,
            https://www.tokyodisneyresort.jp/en/tdr/access/railway.html. Shuttle times change with traffic, and
            the resort does not guarantee other transport if a bus cannot run.
          </p>
        </section>

        {/* Closest */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hotels near Tokyo Disneyland</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Disney Hotel Is Closest to the Parks?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Tokyo Disneyland Hotel for Disneyland, and MiraCosta for DisneySea, which it sits inside. These six
            hotels near Tokyo Disneyland are on Klook in English. The type and the route to the gates are from
            the resort&apos;s site. Prices move by date, so open Klook for yours.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Hotel", "Type", "Getting to the parks", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {klookHotels.map((row) => (
                    <tr key={row.hotel.title}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.hotel.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.hotel.title}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.category}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {OWN}</strong> · Source: https://www.tokyodisneyresort.jp/en/hotel/guide.html.
            The Toy Story Hotel and Fantasy Springs Hotel are not in this table because no English Klook page
            for them is listed here. Book those on the resort&apos;s own site.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoDisneySeaMiraCostaKlook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              MiraCosta →
            </KlookLink>
            <KlookLink href={disneyAmbassadorHotelKlook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Disney Ambassador Hotel →
            </KlookLink>
            <KlookLink href={tokyoDisneySeaHotels.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hotels near DisneySea →
            </KlookLink>
          </div>
        </section>

        {/* Happy Entry */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Early entry</span>
          <h2 className={styles.sectionTitle}>What Is Happy Entry, and Who Gets It?</h2>
          <p className={styles.bodyText}>
            Only Disney Hotel guests get it. They enter Tokyo Disneyland through a special entrance 15 minutes
            before other guests, and MiraCosta and Fantasy Springs Hotel guests also enter Tokyo DisneySea 5 to
            15 minutes early. It works every day of the stay, including check-out day, but not on check-in day.
            Each guest aged 4 or over gets a pass, and a park ticket is still needed. The resort notes that it
            does not guarantee 15 minutes in the park, because attractions start when the park opens to
            everyone. Read {OWN}.
          </p>
        </section>

        {/* Official hotels */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Official Hotels</span>
          <h2 className={styles.sectionTitle}>Are Official Hotels Worth It?</h2>
          <p className={styles.bodyText}>
            Yes, if you want to sleep inside the resort and do not need early entry. The six Official Hotels run
            a free Disney Resort Cruiser shuttle to Bayside Station, and from there the Disney Resort Line (a
            fare applies) stops in front of each park. Guests who contact the hotel ahead can buy park tickets
            for their stay there, even when the official website is sold out. If you arrive by train, the
            hotel&apos;s counter by JR Maihama Station can send your bags on to the hotel. Read {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hiltonTokyoBayKlook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hilton Tokyo Bay →
            </KlookLink>
            <KlookLink href={sheratonGrandeTokyoBayKlook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Sheraton Grande Tokyo Bay →
            </KlookLink>
          </div>
        </section>

        {/* Budget */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Budget</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay for Tokyo Disney on a Budget?</h2>
          <p className={styles.bodyText}>
            Compare three options on your dates. The resort calls the Tokyo Disney Celebration Hotel its Value
            type Disney Hotel, about 20 minutes from the parks by free shuttle, and it still gets Happy Entry at
            Disneyland. The 4 Partner Hotels in Shin-Urayasu run a free shuttle of about 15 minutes, with no
            reservation needed. A Tokyo Station hotel works too, if the rest of your trip is in the city.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoDisneyCelebrationHotelKlook.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Celebration Hotel →
            </KlookLink>
            <KlookLink href={tokyoDisneyStayAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Urayasu / Shin-Urayasu hotels →
            </KlookLink>
          </div>
        </section>

        {/* Tokyo Station */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>From central Tokyo</span>
          <h2 className={styles.sectionTitle}>Can I Stay in the Tokyo Station Area and Go to Disney?</h2>
          <p className={styles.bodyText}>
            Yes. The JR Keiyo Line runs from Tokyo Station to Maihama in about 15 minutes with no change, and
            Tokyo Disneyland is about 5 minutes on foot from Maihama. For DisneySea, walk about 2 minutes to
            Resort Gateway Station and ride the Disney Resort Line about 9 minutes. The resort puts the whole
            trip from Tokyo Station at about 20 minutes. The trade-off is the ride back after the night show, and no
            Happy Entry. Read {OWN} on
            https://www.tokyodisneyresort.jp/en/tdr/access/railway.html.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoStayAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Station hotels →
            </KlookLink>
          </div>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should I Book Tokyo Disney Hotels?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Book a Disney Hotel the day your date opens, four months ahead at 11:00 Japan time, and the park
            ticket when it opens two months ahead. The room comes first.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "When it opens", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {OWN}</strong> (hotel rows) and {TICKET_DATE} (ticket row) · Sources:
            https://www.tokyodisneyresort.jp/en/hotel/topics/info/operation/reservation.html,
            https://www.tokyodisneyresort.jp/en/hotel/topics/info/happy_entry.html,
            https://www.tokyodisneyresort.jp/en/ticket/index.html. Happy Entry dates are as of 26 October 2026.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Cancellation terms depend on where you book, so read the terms shown for your room on Klook before
            you pay. The park ticket is a separate booking: see our{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets">Tokyo Disney tickets guide</Link> for the
            rules on dates and changes.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoDisneyResortHotels.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your dates on Klook →
            </KlookLink>
            <KlookLink href={tokyoDisneyOneDayPassport.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              1-Day Passport →
            </KlookLink>
          </div>
        </section>

        {/* Who */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Choose</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Disney Hotel Is Right for You?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["If you are…", "Pick", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {whoRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {OWN}</strong> · Sources: https://www.tokyodisneyresort.jp/en/hotel/guide.html,
            https://www.tokyodisneyresort.jp/en/hotel/dh/privilege_dh.html.
          </p>
        </section>

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Is a Disney Hotel Worth It With Kids?</h2>
          <p className={styles.bodyText}>
            Usually yes with small children, because the room is close enough for a midday break and Happy Entry
            gets you in before the crowd. Each guest aged 4 or over, including a child sharing a bed, gets a
            Happy Entry pass. For a family day plan around the park, see our{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids">Tokyo itinerary with kids</Link>.
          </p>
        </section>

        {/* Airport */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>From the airport</span>
          <h2 className={styles.sectionTitle}>How Do I Get From the Airport to a Tokyo Disney Hotel?</h2>
          <p className={styles.bodyText}>
            By Airport Limousine Bus, or by train to Maihama. The bus runs from Narita (¥2,900 adult) and Haneda
            (¥1,300) to the resort, with your cases in the hold (limousinebus.co.jp, read {BUS_DATE}). By train,
            the resort gives about 80 minutes from Narita and about 50 minutes from Haneda to Maihama, changing
            at Tokyo Station. Partner Hotel guests can send bags from the counter in front of JR Maihama Station
            for ¥800 an item. See our{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">Airport Limousine Bus guide</Link>.
          </p>
        </section>

        <KlookTripPrep
          label="Same trip"
          heading="What Should You Book Around a Tokyo Disney Hotel?"
          intro="Once the room is settled, these cover the rest of the park trip. Open a listing for the price on your dates."
          items={tokyoDisneyHotelsTripPrep}
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
          heading="Tokyo Disney Hotels on Klook"
          intro="The six hotels in the table. Open one for the current price and room types on your dates."
          tours={[
            tokyoDisneylandHotelKlook,
            tokyoDisneySeaMiraCostaKlook,
            disneyAmbassadorHotelKlook,
            tokyoDisneyCelebrationHotelKlook,
            hiltonTokyoBayKlook,
            sheratonGrandeTokyoBayKlook,
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
            <h2 className={styles.ctaBannerTitle}>Book the room before the ticket</h2>
            <p className={styles.ctaBannerDesc}>
              Disney Hotel rooms open four months ahead, park tickets two. Check your dates first.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoDisneyResortHotels.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Disney-Area Hotels →
              </KlookLink>
              <KlookLink href={tokyoDisneylandHotelKlook.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Disneyland Hotel →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
