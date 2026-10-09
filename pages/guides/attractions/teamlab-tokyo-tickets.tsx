import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// CTA link — Klook affiliate redirect (teamLab Planets Toyosu ticket).
const PLANETS_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299131&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F25300-teamlab-planets-toyosu-tokyo-ticket%2F";

// All figures below were read from the official teamLab sites (teamlab.art and the
// teamLab Planets TOKYO official ticket store) on 9 October 2026.
const CHECKED = "9 October 2026";

const priceRows = [
  { ticket: "Adult", price: "from ¥3,800", note: "Price varies by date and time slot" },
  { ticket: "Junior & senior high school", price: "¥2,800", note: "Bring student ID" },
  { ticket: "Children (4–12)", price: "¥1,500", note: "Under-4s do not need a ticket" },
  { ticket: "3 and under", price: "Free", note: "Bring a change of clothes — the water areas get everyone wet" },
  { ticket: "Visitor with a disability", price: "from ¥1,900", note: "Bring your disability certificate" },
  { ticket: "Premium Pass", price: "¥12,000", note: "Priority entry option, ages 4 and over" },
];

const compareRows = [
  { factor: "Location", planets: "Toyosu (Koto City)", borderless: "Azabudai Hills (Minato City)" },
  { factor: "Concept", planets: "Immersive, barefoot, walk through water", borderless: "50+ artworks in a maze with no map" },
  { factor: "Best for", planets: "Families, first-timers, sensory experience", borderless: "Art lovers, slow exploration, photography" },
  { factor: "Time needed", planets: "Around 1.5–2 hours including barefoot prep", borderless: "Around 2 hours, more if you linger" },
  { factor: "Adult ticket (from)", planets: "from ¥3,800", borderless: "from ¥3,400" },
  { factor: "Opening hours", planets: "Listed 08:00–22:00, varies by date", borderless: "Listed 08:30–21:00, varies by date" },
  { factor: "Entry", planets: "30-minute admission slot", borderless: "Timed slot, or a Flexible Pass with no set time" },
  { factor: "Good to know", planets: "Scheduled to run to the end of 2027; barefoot and water areas", borderless: "¥200 more if you buy on site" },
];

const whoFor = [
  {
    title: "Choose Planets if…",
    desc: "You're travelling with kids, want a hands-on, physical experience, and don't mind getting your feet wet — you walk barefoot through water that reaches adult knee height. It's the more playful and sensory of the two, and the easier one to enjoy with children.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Choose Borderless if…",
    desc: "You want to lose yourself in art rather than walk through it. Borderless in Azabudai Hills has no fixed route — works move between rooms and you wander freely through 50+ spaces. It rewards time and patience, and it's the more photogenic of the two for adults.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
      </svg>
    ),
  },
  {
    title: "Do both if…",
    desc: "You have two free half-days and you're a serious teamLab fan. They're genuinely different experiences in different parts of the city, so doing both isn't repetitive — just space them out and book each timed slot in advance.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick your date first, then check the price",
    desc: "Adult tickets at Planets start from ¥3,800 but the figure depends on the date and time slot you choose. Weekday mornings are both the cheapest and the quietest.",
  },
  {
    title: "Book a 30-minute admission slot 2–3 weeks ahead",
    desc: "Your ticket covers a 30-minute entry window — 10:00–10:30, for example. Popular slots regularly sell out 2–3 weeks in advance, and tickets are not sold at a walk-up counter at the museum, so advance booking is the plan rather than the backup.",
  },
  {
    title: "Buy from teamLab or an official ticketing partner",
    desc: "The official Planets ticket store sells e-tickets direct; Klook is an official teamLab ticketing partner with an English checkout in your own currency and reliable acceptance of foreign-issued cards. Either way you get a QR code on your phone.",
  },
  {
    title: "Dress for water, and arrive inside your slot",
    desc: "Wear shorts or trousers you can roll above the knee — some artworks are water spaces and the water can reach adult knee height. Free rental shorts are available in sizes XS to 6L if you turn up in a skirt or wide-leg trousers, because parts of the floor are mirrored. Entry preparation can take 30–60 minutes at busy times, so get there at the start of your window.",
  },
];

const faqItems = [
  {
    q: "How much are teamLab Planets tickets in 2026?",
    a: `On the official teamLab Planets ticket store, checked on ${CHECKED}, adult tickets start from ¥3,800, junior and senior high school students pay ¥2,800, children aged 4–12 pay ¥1,500, and children 3 and under enter free. Visitors with a disability pay from ¥1,900, and a Premium Pass is sold at ¥12,000 for ages 4 and over. The adult price varies by date and time slot, so confirm the figure for your own slot before you pay. Discounted tickets need proof of eligibility — bring student ID, a passport or a disability certificate.`,
  },
  {
    q: "Do I need to book teamLab Planets in advance?",
    a: "Yes, and more so than at most Tokyo attractions. Planets uses 30-minute admission slots and popular times sell out 2–3 weeks ahead, especially at weekends and in holiday periods. The official help pages are clear that you should not rely on buying at the museum — tickets are sold online in advance rather than at a walk-up counter. Book the date and slot before you travel.",
  },
  {
    q: "What should I wear to teamLab Planets?",
    a: "Shorts, or trousers you can roll up above the knee. Some of the artworks are water spaces and the water can rise to adult knee height, and the whole museum is experienced barefoot — you take off shoes, socks and tights in the locker room on the way in. Parts of the floor are mirrored, so skirts and wide-leg trousers are a bad idea; free rental shorts are available in sizes XS to 6L. If you're bringing children, pack a change of clothes, and note that strollers can't go inside (there's stroller parking, and baby carriers are fine).",
  },
  {
    q: "How long do you need at teamLab Planets?",
    a: "Allow about 1.5 to 2 hours in total. The artworks themselves take around an hour to an hour and a half at an unhurried pace, but you also need time for the locker room, going barefoot, and drying off afterwards — and entry preparation alone can take 30–60 minutes when the museum is busy. Don't schedule anything tight immediately afterwards.",
  },
  {
    q: "What are teamLab Planets opening hours, and when is it closed?",
    a: `Hours vary by date. When we checked the official site on ${CHECKED}, Planets was listed as open 08:00–22:00, with last admission one hour before closing. Closed dates in late 2026 included Thursday 5 November and Thursday 3 December. Because the calendar shifts month to month, check the official calendar for your own dates before booking a slot.`,
  },
  {
    q: "What if I miss my teamLab Planets time slot?",
    a: "You're not necessarily locked out. The official help pages say the printed time is a reference and that you can still enter on the same day, within opening hours, if you arrive late — bearing in mind last admission is one hour before closing. You may wait longer than slot holders, though, so treat your window as the plan.",
  },
  {
    q: "Where is teamLab Planets and how do I get there?",
    a: "It's in Toyosu, on Tokyo's eastern waterfront. The official access information lists it as one minute on foot from Shin-Toyosu Station on the Yurikamome line, five minutes from Shijomae Station and Toyosu Market, and ten minutes from Toyosu Station on the Tokyo Metro Yurakucho line. It's roughly 15 minutes by taxi from Tokyo Station, or about 15 minutes from Haneda Airport via the expressway. A Suica or Pasmo IC card covers the train legs.",
  },
  {
    q: "Is teamLab Planets closing?",
    a: "teamLab Planets in Toyosu is scheduled to remain open until the end of 2027, and teamLab has announced an expansion adding more than ten installations. Dates can change, so check the official site before planning a trip specifically around it. teamLab Borderless in Azabudai Hills is a separate, ongoing museum with its own tickets.",
  },
  {
    q: "What's the difference between teamLab Planets and Borderless?",
    a: "Planets, in Toyosu, is an immersive, barefoot experience where you walk through water and large-scale installations — the more physical and family-friendly of the two. Borderless, in Azabudai Hills, is a maze of 50+ artworks with no map and no fixed route, where works move between spaces and you wander freely. Planets suits families and first-timers; Borderless suits art lovers who want to explore slowly. They're separate museums with separate tickets, in different parts of Tokyo.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/teamlab-tokyo-tickets") } });

export default function TeamLabTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>teamLab Planets Tickets (2026): Prices, How to Book and Planets vs Borderless | Japan Travel Kit</title>
        <meta
          name="description"
          content="teamLab Planets ticket prices for 2026, checked on the official site: from ¥3,800 adult, 30-minute entry slots, opening hours, what to wear for the water areas, and how Planets compares with Borderless."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/teamlab-tokyo-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="teamLab Planets Tickets (2026): Prices, How to Book and Planets vs Borderless" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/teamlab-tokyo-tickets" />
        <meta property="og:description" content="teamLab Planets ticket prices for 2026, checked on the official site: from ¥3,800 adult, 30-minute entry slots, opening hours, what to wear for the water areas, and how Planets compares with Borderless." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="teamLab Planets Tickets (2026): Prices, How to Book and Planets vs Borderless" />
        <meta name="twitter:description" content="teamLab Planets ticket prices for 2026, checked on the official site: from ¥3,800 adult, 30-minute entry slots, opening hours, what to wear for the water areas, and how Planets compares with Borderless." />
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
              headline: "teamLab Planets Tickets (2026): Prices, How to Book and Planets vs Borderless",
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
                { "@type": "ListItem", position: 4, name: "teamLab Planets Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/teamlab-tokyo-tickets" },
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
          <span className={styles.breadCurrent}>teamLab Planets Tickets</span>
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
            teamLab Planets Tickets (2026):<br />Prices, How to Book &amp; Planets vs Borderless
          </h1>
          <p className={styles.heroSubtitle}>
            What a ticket to teamLab Planets in Toyosu costs, how the 30-minute entry slots work, what to
            wear for the water areas — and how Planets differs from Borderless in Azabudai Hills.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Planets vs Borderless"].map((t) => (
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
                <p className={styles.verdictStatValue}>from ¥3,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Entry</p>
                <p className={styles.verdictStatValue}>30-minute slot, book ahead</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time needed</p>
                <p className={styles.verdictStatValue}>About 1.5–2 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Wear</p>
                <p className={styles.verdictStatValue}>Shorts — barefoot, knee-deep water</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Adult admission to teamLab Planets starts from ¥3,800, with ¥2,800 for
              high school students and ¥1,500 for ages 4–12. Your ticket covers a 30-minute admission window,
              and tickets aren&apos;t sold at a walk-up counter, so book 2–3 weeks ahead for weekends. You go
              barefoot and some artworks are water spaces where the water reaches adult knee height — wear
              shorts or roll-up trousers (free rental shorts, XS–6L, are available). Allow 1.5–2 hours, and get
              there in one minute on foot from Shin-Toyosu Station. Looking for the Azabudai museum instead?
              See our{" "}
              <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless ticket guide</Link>.
            </p>
            <a href={PLANETS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check teamLab Planets Tickets →
            </a>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "#6b7280" }}>
              Prices, hours and closed dates on this page were read from the official teamLab sites on {CHECKED}.
              Planets prices vary by date and slot and the calendar shifts, so confirm both for your own date at checkout.
            </p>
          </div>
        </div>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>teamLab Planets Ticket Prices</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The adult ticket is the one that moves: it starts from ¥3,800 and the price you see depends on the
            date and slot you pick. The student and child tiers are flat, and under-4s don&apos;t need a ticket
            at all.
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
            Read from the official teamLab Planets ticket store on {CHECKED}. Discounted tickets need proof of
            eligibility, so bring student ID, a passport or a disability certificate. Tickets are issued as a QR
            code on your phone.
          </p>
        </section>

        {/* Hours, slots, what to bring */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you book</span>
          <h2 className={styles.sectionTitle}>Hours, Entry Slots and What to Wear</h2>
          <p className={styles.bodyText}>
            Planets asks more of you than a normal museum ticket: you go in barefoot and part of the route is
            water. Here&apos;s what the official sites showed when we checked on {CHECKED}:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Opening hours:</strong> listed as 08:00–22:00, varying by date, with last admission one hour before closing.</li>
            <li><strong>Closed days:</strong> scattered dates — Thursday 5 November and Thursday 3 December 2026 among them.</li>
            <li><strong>Entry:</strong> your ticket covers a 30-minute admission window, such as 10:00–10:30. Entry preparation can take 30–60 minutes at busy times.</li>
            <li><strong>Running late?</strong> The official help pages say the stated time is a reference and you can still enter the same day during opening hours, subject to last admission.</li>
            <li><strong>Barefoot:</strong> shoes, socks and tights come off in the locker room. The experience is barefoot throughout.</li>
            <li><strong>Water:</strong> some artworks are water spaces and the water can rise to adult knee height. Wear shorts or trousers you can roll up.</li>
            <li><strong>Mirrored floors:</strong> skirts and wide-leg trousers are a problem. Free rental shorts are available in sizes XS to 6L.</li>
            <li><strong>With kids:</strong> bring a change of clothes. Strollers can&apos;t come inside — there&apos;s stroller parking, and baby carriers are fine.</li>
            <li><strong>Luggage:</strong> bags over roughly 23 × 34 × 37 cm go into the designated storage area rather than the lockers.</li>
          </ul>
          <p className={styles.bodyText}>
            Hours and closures shift month to month, so open the official calendar for your own travel dates
            before you commit to a slot. Weekday mornings are the cheapest and the quietest.
          </p>
        </section>

        {/* What it is */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you&apos;re buying</span>
          <h2 className={styles.sectionTitle}>What teamLab Planets Actually Is</h2>
          <p className={styles.bodyText}>
            teamLab is a Tokyo-based art collective known for room-filling digital installations you walk
            through rather than look at. Planets, in Toyosu, is the physical one: you go barefoot, wade through
            water, and move through works that respond to your presence — a mirrored infinity room, a hall of
            floating orbs, a living garden. It&apos;s the easier of Tokyo&apos;s two teamLab museums to enjoy
            with children, and the one that lands hardest if you&apos;ve never seen digital art at this scale.
          </p>
          <p className={styles.bodyText}>
            It&apos;s also busy: teamLab reported over 2.5 million visitors in 2025. The museum is scheduled to
            run until the end of 2027, with an announced expansion adding more than ten installations — so if
            you&apos;ve already been, it isn&apos;t the same visit twice.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book teamLab Planets Tickets</h2>
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
            <a href={PLANETS_URL} target="_blank" rel="sponsored noopener">
              Check Planets availability and prices on Klook →
            </a>
          </p>
        </section>

        {/* Planets vs Borderless */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs Borderless</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Tokyo has two teamLab museums and visitors routinely book the wrong one. They are separate venues
            with separate tickets in different parts of the city: <strong>Planets</strong> in Toyosu is the
            barefoot, walk-through-water one; <strong>Borderless</strong> in Azabudai Hills is a map-less maze
            of 50+ artworks that move between rooms. Borderless has its own prices, hours and booking quirks —
            we cover them in the{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless ticket guide</Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Planets", "teamLab Borderless"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.planets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.borderless}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Prices and hours read from the official teamLab sites on {CHECKED}. Both museums price adult tickets
            by date and slot and both calendars change, so confirm for your own date. Time needed is our own
            planning guidance, not an official figure.
          </p>
        </section>

        {/* Which is for you */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which is for you</span>
          <h2 className={styles.sectionTitle}>Which teamLab Should You Pick?</h2>
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

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Where teamLab Planets Is</h2>
          <p className={styles.bodyText}>
            Planets is in Toyosu, on Tokyo&apos;s eastern waterfront, next to Toyosu Market. The official access
            information lists:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Shin-Toyosu Station</strong> (Yurikamome line) — 1 minute on foot. The easiest approach.</li>
            <li><strong>Shijomae Station</strong> / Toyosu Market — 5 minutes on foot.</li>
            <li><strong>Toyosu Station</strong> (Tokyo Metro Yurakucho line) — 10 minutes on foot, as is LaLaport Toyosu.</li>
            <li>Roughly 15 minutes by taxi from Tokyo Station, or about 15 minutes from Haneda Airport using the expressway.</li>
          </ul>
          <p className={styles.bodyText}>
            A{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica or Pasmo IC card</Link>{" "}
            covers both the Yurakucho and Yurikamome legs —{" "}
            <Link href="/guides/transport/tokyo-transportation">our Tokyo transport guide</Link>{" "}
            explains the lines if Toyosu is new territory.
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
            <Link href="/guides/attractions/teamlab-borderless-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="1.5" />
                  <circle cx="17.5" cy="10.5" r="1.5" />
                  <circle cx="8.5" cy="7.5" r="1.5" />
                  <circle cx="6.5" cy="12.5" r="1.5" />
                  <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Borderless Tickets (2026): Prices, Time Slots and How to Book</p>
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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to book teamLab Planets?</h2>
            <p className={styles.ctaBannerDesc}>
              Entry runs in 30-minute slots and the good ones go 2–3 weeks out. Klook is an official teamLab
              ticketing partner, with an English checkout in your own currency and an e-ticket on your phone.
            </p>
            <a href={PLANETS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View teamLab Planets Tickets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
