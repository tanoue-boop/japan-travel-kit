import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// CTA link — Klook affiliate redirect (teamLab Borderless admission ticket).
const BORDERLESS_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299135&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F20707-teamlab-borderless-admission-ticket-tokyo%2F";

// All figures below were read from the official teamLab site (teamlab.art) on 9 October 2026.
const CHECKED = "9 October 2026";

const priceRows = [
  { ticket: "Adult (18 and over)", price: "from ¥3,400", note: "Dynamic pricing — the price for your date and slot can be higher" },
  { ticket: "Ages 13–17", price: "¥2,800", note: "Fixed price" },
  { ticket: "Ages 4–12", price: "¥1,500", note: "Fixed price" },
  { ticket: "3 and under", price: "Free", note: "No ticket needed" },
  { ticket: "Visitor with a disability", price: "from ¥1,700", note: "Dynamic pricing; one accompanying person also gets the discounted rate" },
];

const buyingRows = [
  {
    factor: "Price",
    official: "Base price, dynamic by date and slot",
    klook: "Same ticket, listed in your own currency",
    door: "+¥200 adult, +¥100 child / disability",
  },
  {
    factor: "Checkout language",
    official: "English site available",
    klook: "English checkout, instant e-ticket",
    door: "On site, at the museum",
  },
  {
    factor: "Foreign cards",
    official: "Usually fine, but no guarantee",
    klook: "Built for foreign cards and wallets",
    door: "Card accepted on site",
  },
  {
    factor: "Changing your date",
    official: "Date can be changed up to three times",
    klook: "Depends on the Klook option you pick — check before paying",
    door: "Not applicable",
  },
  {
    factor: "Risk of missing out",
    official: "Low if you book early",
    klook: "Low if you book early",
    door: "High — busy slots sell out before the day",
  },
];

const whoFor = [
  {
    title: "Buy on the official site if…",
    desc: "You want the lowest base price and the most flexibility on dates. teamLab lets you change the date of an officially bought ticket up to three times, which is useful if your Tokyo itinerary is still moving around.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "Buy on Klook if…",
    desc: "You'd rather check out in your own currency, in English, with a card issued outside Japan and an e-ticket in the app alongside your other bookings. Klook is an official teamLab ticketing partner, so it's the same admission — just a different counter.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M14 6v12" strokeDasharray="2 2" />
        <path d="M6 10h4M6 14h4" />
      </svg>
    ),
  },
  {
    title: "Don't plan on buying at the door if…",
    desc: "You're visiting on a weekend, a holiday or in an evening slot. On-site tickets cost ¥200 more for adults (¥100 more for children and disability tickets) and only exist while slots remain — which, at the times most visitors want, they often don't.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick a date, then check the price for it",
    desc: "Adult and disability tickets at Borderless are dynamically priced, so the figure you see depends on the date and time slot you select. Weekday mornings are usually the cheapest and the quietest.",
  },
  {
    title: "Choose an entry time — or a Flexible Pass",
    desc: "The standard Entrance Pass has a specified admission time. teamLab also sells a Flexible Pass that is valid on a specific date with no designated entry time, which is worth the premium if your day is unpredictable.",
  },
  {
    title: "Book 2–3 weeks ahead for weekends and evenings",
    desc: "Borderless has run at well over a million visitors a year, and the popular slots go first. Booking early is the difference between choosing your time and taking whatever's left.",
  },
  {
    title: "Allow about two hours, and go easy on the luggage",
    desc: "There's no fixed route and artworks move between rooms, so most visitors want roughly two hours inside. Arrive a little before your slot and travel light — Kamiyacho and Roppongi-itchome stations both connect underground, so you can get there without going up to street level.",
  },
];

const faqItems = [
  {
    q: "How much are teamLab Borderless tickets in 2026?",
    a: `On the official teamLab site, checked on ${CHECKED}, the Entrance Pass starts from ¥3,400 for adults (18 and over), with ¥2,800 for ages 13–17, ¥1,500 for ages 4–12, and free admission for children 3 and under. Visitors with a disability pay from ¥1,700, and one accompanying person gets the same discounted rate. Adult and disability tickets use dynamic pricing, so the exact amount depends on the date and time slot you choose — check the price for your own date before you pay. Buying on site costs ¥200 more for adults and ¥100 more for children and disability tickets.`,
  },
  {
    q: "Is teamLab Borderless timed entry? Can I just turn up?",
    a: "The standard Entrance Pass is date- and time-specified: you choose an admission slot when you book. teamLab also sells a Flexible Pass, which is valid for a specific date with no designated entry time. Tickets are sold on site too, but at a ¥200 surcharge for adults and only while slots are still available — on weekends, holidays and evening slots they frequently aren't. Treat walk-up as a fallback, not a plan.",
  },
  {
    q: "What are teamLab Borderless opening hours?",
    a: `Hours vary by date. When we checked the official site on ${CHECKED}, the museum was listed as open 08:30–21:00, with some dates closing earlier (17:00 on 17 November 2026) and some later (22:00 on selected dates). Last entry is one hour before closing. It is also closed on scattered Tuesdays — 20 October, 24 November and 8 December 2026 among them. Always open the official calendar for your own date before you book a slot.`,
  },
  {
    q: "How long do you need at teamLab Borderless?",
    a: "Plan on about two hours. Borderless has no map and no fixed route — more than 50 artworks spread through a maze of rooms, with works that cross between spaces and change over the day — so how long you stay is genuinely up to you. Two hours is enough to see the headline rooms without rushing; art lovers and photographers often stay closer to three.",
  },
  {
    q: "Where is teamLab Borderless and how do I get there?",
    a: "It's in Azabudai Hills Garden Plaza B, on level B1, in the Toranomon 5-chome area of Minato City, Tokyo. The official access information puts it two minutes' walk from Exit 5 of Kamiyacho Station on the Tokyo Metro Hibiya line, and six minutes from Exit 4 of Roppongi-itchome Station on the Namboku line. Both stations connect to Azabudai Hills by underground passage, so you can follow the signs the whole way without going up to street level — handy in rain or summer heat.",
  },
  {
    q: "Should I book teamLab Borderless on the official site or on Klook?",
    a: "Both are legitimate: Klook is an official teamLab ticketing partner, so you're buying the same admission either way. The official site gives you the base price and lets you change your date up to three times. Klook gives you an English checkout in your own currency, reliable acceptance of foreign-issued cards, and an e-ticket sitting alongside your other bookings. If flexibility on dates matters most, buy official; if a frictionless checkout matters most, buy through Klook.",
  },
  {
    q: "teamLab Borderless or teamLab Planets — which should I book?",
    a: "They're different museums in different parts of Tokyo, not two branches of the same thing. Borderless, in Azabudai Hills, is a wandering maze of 50+ artworks that rewards time and curiosity. Planets, in Toyosu, is the barefoot one — you walk through knee-deep water and it's the easier choice with children. If you only have time for one, pick Borderless for art and photography and Planets for a physical, sensory experience with kids.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/teamlab-borderless-tickets") } });

export default function TeamLabBorderlessTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>teamLab Borderless Tickets (2026): Prices, Time Slots and How to Book | Japan Travel Kit</title>
        <meta
          name="description"
          content="teamLab Borderless ticket prices for 2026, checked on the official site: from ¥3,400 adult with dynamic pricing, timed-entry slots, opening hours, and how to book on the official site or Klook."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/teamlab-borderless-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="teamLab Borderless Tickets (2026): Prices, Time Slots and How to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/teamlab-borderless-tickets" />
        <meta property="og:description" content="teamLab Borderless ticket prices for 2026, checked on the official site: from ¥3,400 adult with dynamic pricing, timed-entry slots, opening hours, and how to book on the official site or Klook." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="teamLab Borderless Tickets (2026): Prices, Time Slots and How to Book" />
        <meta name="twitter:description" content="teamLab Borderless ticket prices for 2026, checked on the official site: from ¥3,400 adult with dynamic pricing, timed-entry slots, opening hours, and how to book on the official site or Klook." />
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "teamLab Borderless Tickets (2026): Prices, Time Slots and How to Book",
              dateModified: updated.iso,
              author: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
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
                { "@type": "ListItem", position: 4, name: "teamLab Borderless Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/teamlab-borderless-tickets" },
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
          <span className={styles.breadCurrent}>teamLab Borderless Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🎟️</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            teamLab Borderless Tickets (2026):<br />Prices, Time Slots and How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            What a ticket to teamLab Borderless in Azabudai Hills actually costs, how the timed slots
            work, and whether to buy on the official site or through Klook.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Timed entry explained"].map((t) => (
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
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
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
                <p className={styles.verdictStatLabel}>Adult ticket</p>
                <p className={styles.verdictStatValue}>from ¥3,400</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Entry</p>
                <p className={styles.verdictStatValue}>Date + time slot</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time needed</p>
                <p className={styles.verdictStatValue}>About 2 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Azabudai Hills, Minato City</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Adult admission starts from ¥3,400 and is dynamically priced, so your
              date and slot decide the final figure. Tickets are date- and time-specified, buying on site costs
              ¥200 more for adults and depends on slots being left, and the museum is open roughly 08:30–21:00
              with last entry an hour before closing. Allow about two hours, and get there via Kamiyacho
              (Hibiya line, 2 minutes on foot) or Roppongi-itchome (Namboku line, 6 minutes) — both connect
              underground. Buy on the official site for the base price and up to three free date changes; buy
              through Klook for an English, own-currency checkout that accepts foreign cards.
            </p>
            <a href={BORDERLESS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check teamLab Borderless Tickets →
            </a>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "#6b7280" }}>
              Prices, hours and closed dates on this page were read from the official teamLab site on {CHECKED}.
              Borderless uses dynamic pricing and a shifting calendar, so confirm both for your own date at checkout.
            </p>
          </div>
        </div>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>teamLab Borderless Ticket Prices</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Borderless sells an <strong>Entrance Pass</strong> with a specified admission time. Adult and
            disability tickets are dynamically priced — the figures below are the base prices on the official
            site, and a busy Saturday evening will cost more than a quiet Tuesday morning. The teen and child
            tiers are fixed.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price (from)", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Read from the official teamLab site on {CHECKED}. Tickets bought on site cost ¥200 more for adults
            and ¥100 more for children and disability tickets. Discounted tickets need proof of eligibility,
            so bring ID.
          </p>
        </section>

        {/* Hours, slots and what to expect */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you book</span>
          <h2 className={styles.sectionTitle}>Hours, Time Slots and Closed Days</h2>
          <p className={styles.bodyText}>
            Borderless runs long days but the calendar moves around, which catches people out more often than
            the price does. Here&apos;s what the official site showed when we checked on {CHECKED}:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Opening hours:</strong> listed as 08:30–21:00, with some dates closing earlier (17:00 on 17 November 2026) and some later (22:00 on selected dates).</li>
            <li><strong>Last entry:</strong> one hour before closing — so a 21:00 close means you need to be in by 20:00.</li>
            <li><strong>Closed days:</strong> scattered Tuesdays, including 20 October, 24 November and 8 December 2026.</li>
            <li><strong>Entry:</strong> the Entrance Pass specifies a date and admission time. A <strong>Flexible Pass</strong> is also sold, valid on a chosen date with no designated entry time.</li>
            <li><strong>Date changes:</strong> tickets bought direct from teamLab can have their date changed up to three times.</li>
          </ul>
          <p className={styles.bodyText}>
            Because hours and closures shift month to month, open the official calendar for your own travel
            dates before you commit — then book the slot. Weekday mornings are the quietest and usually the
            cheapest; weekend and evening slots are the first to disappear.
          </p>
        </section>

        {/* What it is */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you&apos;re buying</span>
          <h2 className={styles.sectionTitle}>What teamLab Borderless Actually Is</h2>
          <p className={styles.bodyText}>
            Borderless is a museum without a map. More than 50 digital artworks occupy a connected warren of
            rooms, and the works themselves move — they wander out of one space and into another, respond to
            the people in the room, and change through the day. There is no suggested route and no numbered
            stops, so two visitors on the same ticket can have genuinely different visits.
          </p>
          <p className={styles.bodyText}>
            That design is why the ticket is worth planning around. A rushed hour will get you the famous
            rooms and little else; about two hours lets you wander, double back, and find the works that only
            appear if you wait. It also means Borderless is the more adult, more photographic of Tokyo&apos;s
            two teamLab museums — see our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets ticket guide</Link>{" "}
            for the barefoot, walk-through-water one in Toyosu, and for a full Planets vs Borderless comparison.
          </p>
        </section>

        {/* Where to buy */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Official Site vs Klook vs the Door</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Klook is an official teamLab ticketing partner, so the admission is identical whichever counter you
            use. What differs is the checkout, the flexibility, and — if you leave it to the day — the price.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Official site", "Klook", "On the day, on site"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.klook}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            On-site surcharge and date-change allowance as listed on the official teamLab site on {CHECKED}.
            Cancellation and change terms on resellers vary by option — read them on the booking page before paying.
          </p>
        </section>

        {/* Which route suits you */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which route suits you</span>
          <h2 className={styles.sectionTitle}>How Should You Buy?</h2>
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

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book teamLab Borderless</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Ready to lock a slot in?{" "}
            <a href={BORDERLESS_URL} target="_blank" rel="sponsored noopener">
              Check Borderless availability and prices on Klook →
            </a>
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Where teamLab Borderless Is</h2>
          <p className={styles.bodyText}>
            The museum sits on level B1 of Azabudai Hills Garden Plaza B, in the Toranomon 5-chome area of
            Minato City. It is not the old Odaiba Borderless — that site closed — so ignore any route that
            points you at the waterfront.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Kamiyacho Station</strong> (Tokyo Metro Hibiya line) — 2 minutes&apos; walk from Exit 5.</li>
            <li><strong>Roppongi-itchome Station</strong> (Tokyo Metro Namboku line) — 6 minutes&apos; walk from Exit 4.</li>
            <li>Both stations connect to Azabudai Hills by underground passage, so you can follow the signs the whole way without going up to street level.</li>
          </ul>
          <p className={styles.bodyText}>
            Tap in and out with a{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica or Pasmo IC card</Link>{" "}
            and neither station needs any planning —{" "}
            <Link href="/guides/transport/tokyo-transportation">our Tokyo transport guide</Link>{" "}
            covers the lines in more detail.
          </p>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Prices, How to Book &amp; Planets vs Borderless</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 21V8l6-4 6 4v13" />
                  <path d="M10 21v-5h4v5" />
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
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book your Borderless slot</h2>
            <p className={styles.ctaBannerDesc}>
              Timed entry means the slot you want is the one that sells out. Klook is an official teamLab
              ticketing partner, with an English checkout in your own currency and an e-ticket on your phone.
            </p>
            <a href={BORDERLESS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View teamLab Borderless Tickets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
