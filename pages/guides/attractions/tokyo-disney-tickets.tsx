import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const DISNEY_TICKET_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304885&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F695-tokyo-disney-resort-1-day-pass-tokyo%2F";

const ticketRows = [
  {
    ticket: "1-Day Passport (currently on sale)",
    what: "Entry to one park (Disneyland OR DisneySea) for a chosen date",
    price: "From about $55, variable date-based pricing — confirm at booking",
  },
  {
    ticket: "Multi-day / other passports",
    what: "Not generally on general sale at the time of writing — availability changes",
    price: "Check live availability at booking",
  },
  {
    ticket: "Gate / door tickets",
    what: "Not sold — every ticket is date-specified and bought in advance",
    price: "Not available",
  },
];

const parkRows = [
  {
    park: "Tokyo Disneyland",
    style: "Classic Disney castle park: parades, fireworks, family rides",
    suits: "First-timers, families with younger kids, classic-Disney fans",
    note: "Familiar layout if you've visited other Disney parks",
  },
  {
    park: "Tokyo DisneySea",
    style: "Nautical, water-themed park; more unique to Tokyo, more adult-leaning; alcohol served",
    suits: "Adults, couples, repeat visitors wanting something different",
    note: "Marking its 25th anniversary (April 2026 – March 2027)",
  },
];

const whoFor = [
  {
    title: "Choose Tokyo Disneyland if…",
    desc: "You're visiting with younger children or it's your first Disney park anywhere. The layout follows the classic castle-park formula, with daytime parades and an emphasis on family-friendly attractions — an easy, familiar day out.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V11l4-3 5 4 5-4 4 3v10z" />
        <path d="M12 21v-5" />
        <path d="M7 11V6l2-2 2 2v2" />
      </svg>
    ),
  },
  {
    title: "Choose Tokyo DisneySea if…",
    desc: "You want something you can't get at any other Disney resort, and you're an adult or travelling without small children. DisneySea leans more grown-up, its themed harbours are unique to Tokyo, and — unlike Disneyland — it serves alcohol.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12V7a7 7 0 0 1 14 0v5" />
        <path d="M4 16c2 1.5 4-1.5 8 0s6-1.5 8 0" />
      </svg>
    ),
  },
  {
    title: "Going in 2026? Note the anniversary",
    desc: "Tokyo DisneySea is celebrating its 25th anniversary from April 2026 to March 2027. Anniversary seasons tend to draw bigger crowds and faster sell-outs on popular dates, so book your date-specified ticket as early as you can.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 5.4 5.6.5-4.2 3.8 1.3 5.7L12 14.8 6.9 17.4l1.3-5.7L4 7.9l5.6-.5z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick your park and your exact date first",
    desc: "Every Tokyo Disney ticket is date-specified — you choose the calendar day you'll visit and which park you'll enter. Decide between Disneyland and DisneySea before you buy, since a 1-Day Passport covers one park, not both.",
  },
  {
    title: "Book well ahead — there are no door tickets",
    desc: "Because tickets aren't sold at the gate and are tied to a specific date, popular dates can sell out weeks to months in advance. Treat booking as something to do early, not on arrival.",
  },
  {
    title: "Use Klook if a foreign card is the problem",
    desc: "The official Tokyo Disney Resort site frequently rejects or blocks foreign-issued credit cards. Klook is an officially authorized seller that accepts foreign cards and checks out in English, which is why many overseas visitors use it.",
  },
  {
    title: "Link your e-ticket QR into the official app",
    desc: "After buying, you receive an e-ticket QR code. You can link that QR into the official Tokyo Disney Resort app, which is also where you manage in-park features on the day. Set this up before you arrive to save time at the entrance.",
  },
];

const faqItems = [
  {
    q: "Do I need to buy Tokyo Disney tickets in advance?",
    a: "Yes. Tokyo Disney Resort does not sell tickets at the gate — every ticket is date-specified, meaning you choose the calendar date and park when you buy. Popular dates can sell out weeks to months ahead, so booking in advance is essentially required rather than optional.",
  },
  {
    q: "Can I buy Tokyo Disney tickets with a foreign credit card?",
    a: "On the official Tokyo Disney Resort website, often no — it frequently rejects or blocks foreign-issued credit cards, which is a common frustration for overseas visitors. The popular workaround is to book through Klook, an officially authorized seller that accepts foreign cards, checks out in English, and issues an e-ticket QR you can link into the official Tokyo Disney Resort app.",
  },
  {
    q: "Which should I choose, Tokyo Disneyland or Tokyo DisneySea?",
    a: "A 1-Day Passport covers one park, so you'll usually pick one. Tokyo Disneyland is the classic castle park — parades and family-friendly attractions that suit first-timers and families with younger children. Tokyo DisneySea is nautical-themed, more unique to Tokyo, leans more adult, and serves alcohol; it's also marking its 25th anniversary from April 2026 to March 2027. If it's your first visit with kids, Disneyland is the safe pick; if you want something distinctive, choose DisneySea.",
  },
  {
    q: "What ticket types are on sale right now?",
    a: "At the time of writing, the 1-Day Passport is generally the ticket on general sale. It uses variable, date-based pricing — indicatively from about $55 — but the figure changes by date and demand, so confirm the live price for your chosen date at booking. Other passport types may or may not be available depending on the period, so check current availability.",
  },
  {
    q: "How much is a Tokyo Disney 1-Day Passport?",
    a: "Pricing is variable and date-based, so the same passport costs more on busy dates than quiet ones. As an indicative guide it starts from about $55, but treat that as a from figure only — prices in 2026 are subject to change, so confirm the exact amount for your specific date at the time of booking.",
  },
];

export default function TokyoDisneyTicketsPage() {
  return (
    <>
      <Head>
        <title>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy | Japan Travel Kit</title>
        <meta
          name="description"
          content="Tokyo Disney tickets in 2026: every ticket is date-specified and there are no gate sales. Learn how to buy with a foreign card, and how to choose Disneyland vs DisneySea."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-disney-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Disney Tickets (2026): Disneyland & DisneySea — How to Buy" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-disney-tickets" />
        <meta property="og:description" content="Tokyo Disney tickets in 2026: every ticket is date-specified and there are no gate sales. Learn how to buy with a foreign card, and how to choose Disneyland vs DisneySea." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Disney Tickets (2026): Disneyland & DisneySea — How to Buy" />
        <meta name="twitter:description" content="Tokyo Disney tickets in 2026: every ticket is date-specified and there are no gate sales. Learn how to buy with a foreign card, and how to choose Disneyland vs DisneySea." />
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
              headline: "Tokyo Disney Tickets (2026): Disneyland & DisneySea — How to Buy",
              dateModified: "2026-06-15",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Disney Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-disney-tickets" },
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
          <span className={styles.breadCurrent}>Tokyo Disney Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🏰</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Disney Tickets (2026):<br />Disneyland &amp; DisneySea — How to Buy
          </h1>
          <p className={styles.heroSubtitle}>
            Every ticket is date-specified, there are no gate sales, and the official site often rejects
            foreign cards. Here&apos;s how to buy, and how to choose between the two parks.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Date-Specified Tickets", "Foreign Cards OK via Klook"].map((t) => (
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
                <p className={styles.verdictStatLabel}>On sale now</p>
                <p className={styles.verdictStatValue}>1-Day Passport</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price (indicative)</p>
                <p className={styles.verdictStatValue}>From ~$55, variable</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Gate / door tickets</p>
                <p className={styles.verdictStatValue}>None — date-specified only</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Foreign card?</p>
                <p className={styles.verdictStatValue}>Use Klook (authorized seller)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Choose your park and date, then book the 1-Day Passport in advance —
              there are no gate sales and popular dates sell out. If the official site rejects your foreign card,
              Klook is an officially authorized seller that accepts foreign cards and issues a QR you can link
              into the official app.
            </p>
            <a href={DISNEY_TICKET_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Tokyo Disney Tickets →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Tokyo Disney Tickets Work in 2026</h2>
          <p className={styles.bodyText}>
            Tokyo Disney Resort sits in Urayasu, just east of central Tokyo, and is made up of two separate
            parks: <strong>Tokyo Disneyland</strong> and <strong>Tokyo DisneySea</strong>. The single most
            important thing to know before you buy is that tickets are <strong>date-specified</strong> — you
            pick the exact calendar day and the park you&apos;ll enter, and that ticket is only valid then.
          </p>
          <p className={styles.bodyText}>
            There are <strong>no gate or door sales</strong>. That means you cannot simply turn up and buy a
            ticket on the day, and because each ticket is tied to a date, popular days can sell out weeks to
            months ahead. Currently the 1-Day Passport is the ticket generally on sale, and it uses variable,
            date-based pricing — so the same passport costs more on busy dates.
          </p>
        </section>

        {/* Ticket types table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Ticket types</span>
          <h2 className={styles.sectionTitle}>Tokyo Disney Ticket Types at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "What it is", "Pricing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Pricing is variable and date-based (2026, subject to change — confirm at booking). The from ~$55
            figure for the 1-Day Passport is indicative only; check the live price for your specific date and
            park at checkout.
          </p>
        </section>

        {/* Disneyland vs DisneySea table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Disneyland vs DisneySea</span>
          <h2 className={styles.sectionTitle}>Which Park Should You Pick?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Park", "General character", "Best suited to", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            A 1-Day Passport covers one park only, so most visitors choose one. These are broad characterizations
            to help you decide — both parks are large, full-day destinations.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Who it&apos;s for</span>
          <h2 className={styles.sectionTitle}>Which Park Is Right for You?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Whichever park you pick, plan your route in advance — the resort is a train ride from central Tokyo.
            Our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo transport guide
            </Link>{" "}
            covers the trains, subway, and IC cards you&apos;ll use to get there.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Buy Tokyo Disney Tickets</h2>
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

        {/* Foreign card / Klook explainer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Foreign cards</span>
          <h2 className={styles.sectionTitle}>Why Many Visitors Book Through Klook</h2>
          <p className={styles.bodyText}>
            The official Tokyo Disney Resort website is the primary place to buy, but it frequently rejects or
            blocks foreign-issued credit cards — a recurring headache for international travellers. When that
            happens, there&apos;s a straightforward alternative.
          </p>
          <p className={styles.bodyText}>
            <strong>Klook is an officially authorized Tokyo Disney Resort ticket seller.</strong> It accepts
            foreign cards, checks out in English, and delivers an e-ticket QR code that can be linked into the
            official Tokyo Disney Resort app. That combination — foreign-card support plus an app-linkable QR —
            is why it has become the popular workaround for overseas visitors. If you&apos;re combining this with
            other Tokyo plans, our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Shibuya Sky ticket guide
            </Link>{" "}
            covers another booking that&apos;s easier through a reseller.
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l5-3 5 3v13" />
                  <path d="M13 21V11l5-3 3 2v11" />
                  <path d="M7 11v.01M7 15v.01M17 13v.01M17 17v.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Tokyo Tickets (2026): Planets vs Borderless &amp; How to Book</p>
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
            <h2 className={styles.ctaBannerTitle}>Lock in your Tokyo Disney date</h2>
            <p className={styles.ctaBannerDesc}>
              There are no gate sales and popular dates sell out, so book ahead. Klook is an officially
              authorized seller that accepts foreign cards and issues a QR you can link into the official app.
            </p>
            <a href={DISNEY_TICKET_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              View Tokyo Disney Tickets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
