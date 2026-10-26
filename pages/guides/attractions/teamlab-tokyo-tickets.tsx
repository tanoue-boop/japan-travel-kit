import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  fujiDayTour,
  teamlabPlanetsTicketUrl,
  tokyoBaySunsetBoatCruise,
  tokyoJoypolisPassport,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tsukijiCultureFoodTour,
} from "../../../lib/klook-links";
import { gygTeamlabPlanets } from "../../../lib/gyg-links";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";

// CTA link — Klook affiliate redirect (teamLab Planets Toyosu ticket), shared with the
// ticket price table.
const PLANETS_URL = teamlabPlanetsTicketUrl;

// Two check dates, deliberately, because two sources answer different questions.
//
// CHECKED (owned by lib/attraction-prices.ts) is the day the price table and every
// booking mechanic on this page were read off the teamLab Planets TOKYO official
// ticket store — teamlabplanets.dmm.com, its English and Japanese price tables and
// its Help pages. That is where the on-site sales rule, the locker sizes, the
// admission-time wording, the 30–60 minute wait, the date-change limits and the
// Premium Pass definition come from.
//
// HOURS_CHECKED is the day the opening hours and the closed dates were read off
// teamlab.art. That page renders client-side and could not be re-read on the later
// date, so it keeps its own date instead of borrowing a fresher one.
const P = PRICES.teamlabPlanets;
const CHECKED = checkedLabel(P.checked);
const HOURS_CHECKED = checkedLabel("2026-10-09");
// The Borderless column of the comparison table has its own record and its own date.
const BORDERLESS_CHECKED = checkedLabel(PRICES.teamlabBorderless.checked);

const priceRows = [
  {
    ticket: "Adult (18+)",
    price: P.adult,
    varies: "Yes — by date and admission time",
    note: "¥3,800 is the floor, not the price: the store prices every date and slot separately",
  },
  { ticket: "Junior & senior high school", price: "¥2,800", varies: "No — flat", note: "Bring student ID" },
  { ticket: "Children (4–12)", price: P.child, varies: "No — flat", note: "Under-4s do not need a ticket" },
  {
    ticket: "3 and under",
    price: "Free",
    varies: "No — free",
    note: "Bring a change of clothes — the water areas get everyone wet",
  },
  {
    ticket: "Visitor with a disability",
    price: "from ¥1,900",
    varies: "Yes — same calendar as the adult pass",
    note: "Bring your disability certificate",
  },
  {
    ticket: "Premium Pass (ages 4+)",
    price: "¥12,000",
    varies: "No — flat",
    note: "Admission at any time without joining the entry queue; it does not skip queues inside",
  },
];

// Hours, slot mechanics and how long to allow, in one table because these are the
// figures that decide the rest of your day. Each row carries its own source: the
// slot wording, the wait, last admission, the late-arrival rule and the locker
// sizes are the official ticket store's Help pages; the hours and closed dates are
// teamlab.art; the time to allow is ours, because teamLab publishes no figure.
const hoursRows = [
  { item: "Opening hours", detail: "Listed 08:00–22:00, varying by date", source: `teamlab.art, ${HOURS_CHECKED}` },
  { item: "Last admission", detail: "One hour before closing", source: `Official ticket store, ${CHECKED}` },
  {
    item: "Closed days",
    detail: "Scattered dates — Thursday 5 November and Thursday 3 December 2026 among them",
    source: `teamlab.art, ${HOURS_CHECKED}`,
  },
  {
    item: "Admission slot",
    detail: "The time on the ticket is the admission time; 30 minutes from it is the entry preparing time",
    source: `Official ticket store, ${CHECKED}`,
  },
  {
    item: "Wait to be admitted",
    detail: "You may wait 30 to 60 minutes at the entrance",
    source: `Official ticket store, ${CHECKED}`,
  },
  {
    item: "Late for your slot",
    detail: "You can still enter the same day during opening hours, subject to last admission",
    source: `Official ticket store, ${CHECKED}`,
  },
  {
    item: "Time to allow on site",
    detail: "About 1.5–2 hours, including the locker room and drying off",
    source: "Our planning figure — teamLab publishes none",
  },
  {
    item: "Lockers",
    detail: "Free, 23 cm wide × 34 cm deep × 37 cm high; no cloakroom for anything bigger",
    source: `Official ticket store, ${CHECKED}`,
  },
];

// Entrance Pass vs Premium Pass, and the two sellers' own checkouts. The only
// difference the official store claims for the Premium Pass is the entry queue.
const ticketChoice = [
  {
    title: "Entrance Pass — ¥3,800~ for an adult",
    desc: `The normal ticket, and the one almost everyone wants. It fixes a date and an admission time, and the official store prices each combination separately, so the date you pick matters more than the seller you pick. Read on ${CHECKED}.`,
  },
  {
    title: "Premium Pass — ¥12,000, ages 4 and over",
    desc: `What the official store says it buys is one thing: admission at any time, without joining the entry queue — you go to the Information Centre instead. It explicitly does not let you skip the queues inside the exhibition. Worth it only if the 30–60 minute entrance wait would break your day, not as a general upgrade. Read on ${CHECKED}.`,
  },
  {
    title: "Changes, not refunds",
    desc: `Nothing is refundable once bought. What you can do is move it: the store's Help pages allow an Entrance Pass to be changed up to 2 hours before its admission time, a Premium Pass until 08:30 on the day, three changes maximum either way, and tickets bought with a coupon not at all. Read on ${CHECKED}.`,
  },
];

const compareRows = [
  { factor: "Location", planets: "Toyosu (Koto City)", borderless: "Azabudai Hills (Minato City)" },
  { factor: "Concept", planets: "Immersive, barefoot, walk through water", borderless: "50+ artworks in a maze with no map" },
  { factor: "Best for", planets: "Families, first-timers, sensory experience", borderless: "Art lovers, slow exploration, photography" },
  { factor: "Time needed", planets: "Around 1.5–2 hours including barefoot prep", borderless: "Around 2 hours, more if you linger" },
  { factor: "Adult ticket (from)", planets: P.adult, borderless: PRICES.teamlabBorderless.adult },
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
    title: "Pick your date first, then read the price off the calendar",
    desc: `Adult tickets start at ¥3,800~ and the figure you pay depends on the date and the admission time you choose — the store's own Help pages confirm the rates differ between dates. Step through the dates you could take before you settle on one. Read on ${CHECKED}.`,
  },
  {
    title: "Choose the admission time, because that is the booking",
    desc: "The time on the ticket is your admission time, and 30 minutes from it is the entry preparing time. There is no counter at the museum to fall back on, so the slot you select is the visit you get — including on the day, when the calendar may already be full.",
  },
  {
    title: "Decide between the Entrance Pass and the Premium Pass",
    desc: "Four tiers plus a ¥12,000 Premium Pass, and only one of them is about queues. Read the ticket table above first: the Premium Pass buys entry without the entrance queue and nothing else, so most visitors want the Entrance Pass and an earlier slot instead.",
  },
  {
    title: "Buy from the official store or a seller it names",
    desc: `The official store's Help pages state that tickets are not sold on site at counters or vending machines, and name the channels that do sell them: the official Ticket Store, Lawson Ticket, Seven Ticket and Klook. Klook's checkout is in English and your own currency, which is the practical reason most visitors use it. Either way the ticket is a QR code on your phone. Read on ${CHECKED}.`,
  },
  {
    title: "Dress for water, and arrive at the start of your window",
    desc: "Wear shorts or trousers you can roll above the knee — some artworks are water spaces and the water can rise to adult knee height. Free rental shorts are available in sizes XS to 6L if you turn up in a skirt or wide-leg trousers, because parts of the floor are mirrored. The entrance wait can run 30 to 60 minutes, so get there when your window opens.",
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
    q: "Can you buy teamLab Planets tickets at the door?",
    a: `No. The official ticket store's Help pages state that tickets are not available for purchase on-site at ticket counters or vending machines, and name the channels that do sell them: the official Ticket Store, Lawson Ticket, Seven Ticket and Klook. There is no walk-up window to fall back on if your date is full, which is the single biggest difference between Planets and most Tokyo attractions. Read on ${CHECKED}.`,
  },
  {
    q: "What time slot is cheapest at teamLab Planets?",
    a: `Whichever one the official calendar prices lowest on your own date — teamLab publishes no price-per-slot list, so that is the only honest answer. What the official store does confirm is that the adult Entrance Pass starts at ¥3,800~ and that rates differ between dates: its Help pages tell you a booking can be moved "even for dates with different rates". So open the store's calendar, step through the dates and admission times your trip could absorb, and compare the figures before you pay rather than after. Read on ${CHECKED}.`,
  },
  {
    q: "Are there lockers at teamLab Planets?",
    a: `Yes, and they are free. The official Help pages give the size as 23 cm wide by 34 cm deep by 37 cm high — a daypack fits, a suitcase does not. There is no cloakroom: anything larger has to be secured by you with a wire lock at the stroller parking outside the building. Shoes, socks and tights come off at the lockers too, because the museum is walked barefoot from that point on. Read on ${CHECKED}.`,
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
    a: `Hours vary by date. When we checked teamlab.art on ${HOURS_CHECKED}, Planets was listed as open 08:00–22:00, and the official ticket store still stated on ${CHECKED} that last admission is one hour before closing. Closed dates in late 2026 included Thursday 5 November and Thursday 3 December. Because the calendar shifts month to month, check the official calendar for your own dates before booking a slot.`,
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

// The headline search term is "teamLab Planets tickets", so it stays verbatim in the
// title, the H1 and the description. The slug's own term, "teamLab Tokyo tickets",
// is the other thing readers type — it sits in the description and in the first
// paragraph of the body, both times in full.
const TITLE = "teamLab Planets Tickets (2026): Prices, How to Book and Planets vs Borderless";
const DESC =
  "teamLab Planets tickets in 2026, from the official store: adult ¥3,800~, priced by date and slot, 30-minute entry windows, nothing sold at the door — the teamLab Tokyo tickets guide, with kids, lockers and Planets vs Borderless.";

export default function TeamLabTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/teamlab-tokyo-tickets" />
        {hreflangLinks("/guides/attractions/teamlab-tokyo-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/teamlab-tokyo-tickets" />
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
              route: "/guides/attractions/teamlab-tokyo-tickets",
              headline: TITLE,
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
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
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
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, in one paragraph, before anything else in the body — the hero
            subtitle above is a summary of the page, not an answer to the question. */}
        <p className={styles.bodyText}>
          An adult ticket to <strong>teamLab Planets</strong> in Toyosu is <strong>¥3,800~</strong> on the
          official ticket store, and the figure moves with the date and the admission time you pick, so
          ¥3,800 is the floor rather than the price. Entry runs in <strong>30-minute admission slots</strong>{" "}
          booked in advance — the store states that nothing is sold on site at counters or vending machines —
          and you should <strong>allow about 1.5 to 2 hours</strong> on site, including the barefoot locker
          room and drying off afterwards. The door is <strong>one minute on foot from Shin-Toyosu Station</strong>{" "}
          on the Yurikamome line. If you are searching for <strong>teamLab Tokyo tickets</strong> rather than
          Planets specifically, Tokyo has two teamLab museums and this guide covers which of them you actually
          want. Prices and booking rules read from the official teamLab Planets ticket store on {CHECKED};
          hours from teamlab.art on {HOURS_CHECKED}.
        </p>

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
            {/* Klook CTA unchanged. Planets slots sell out by date, so a second seller
                of the same museum is worth having when yours is gone. */}
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={PLANETS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check teamLab Planets Tickets →
              </a>
              <GygCompareButton slug="teamlab-tokyo-tickets" listing={gygTeamlabPlanets} />
            </div>
            <p className={styles.bodyText} style={{ marginTop: "0.75rem", marginBottom: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Prices and booking rules were read from the official teamLab Planets ticket store on {CHECKED};
              opening hours and closed dates from teamlab.art on {HOURS_CHECKED}.
              Planets prices vary by date and slot and the calendar shifts, so confirm both for your own date at checkout.
            </p>
          </div>
        </div>

        {/* Prices — the heading is the search query, and the first sentence is the answer. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are teamLab Planets tickets in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult pays <strong>¥3,800~</strong>, a junior or senior high school student ¥2,800, a child aged
            4–12 ¥1,500, and under-4s nothing at all. Only the adult and disability tiers move: the official
            store prices each date and each admission time separately, which is why its own figure carries a
            tilde and why the cheapest ticket on your trip is a question about the calendar rather than about
            the seller.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price (from)", "Moves with the date?", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.varies}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read from the official teamLab Planets ticket store on {CHECKED}, in both its English and Japanese
            editions. Discounted tickets need proof of eligibility, so bring student ID, a passport or a
            disability certificate. Tickets are issued as a QR code on your phone.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>How far the adult price moves is not published.</strong> teamLab prints a starting figure
            and a calendar, not a price list, and its Help pages only confirm that the rates differ — a booking
            can be moved, they say, &ldquo;even for dates with different rates&rdquo;. So treat ¥3,800 as the
            floor, open the store&apos;s calendar for the dates your trip could absorb, and compare the
            admission times on each one before you pay. Shifting a Planets visit by a day is the lever here;
            shopping for a cheaper seller is not, because the date sets the price.
          </p>
        </section>

        {/* Hours, slots, how long to allow — the table the rest of the day is built on. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Before you book</span>
          <h2 className={styles.sectionTitle}>Hours, Entry Slots and How Long You Need</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Planets is open long hours but your ticket is not: the time printed on it is an admission time, and
            the entrance queue can add 30 to 60 minutes on top. Allow about 1.5 to 2 hours in total and
            don&apos;t book anything tight behind it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "What the official sources say", "Source and date"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Planets also asks more of you than a normal museum ticket — you go in barefoot and part of the
            route is water:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Barefoot:</strong> shoes, socks and tights come off at the lockers. The experience is barefoot throughout.</li>
            <li><strong>Water:</strong> some artworks are water spaces and the water can rise to adult knee height. Wear shorts or trousers you can roll up.</li>
            <li><strong>Mirrored floors:</strong> skirts and wide-leg trousers are a problem — the official FAQ says underwear may be visible. Free rental shorts are available in sizes XS to 6L.</li>
            <li><strong>With kids:</strong> bring a change of clothes. Strollers can&apos;t come inside — there&apos;s stroller parking outside, and baby carriers are accepted.</li>
            <li><strong>Luggage:</strong> the free lockers take 23 × 34 × 37 cm. There is no cloakroom, so a suitcase gets wire-locked at the stroller parking by you.</li>
            <li><strong>Water hygiene:</strong> the official FAQ states the water is filtered constantly and its chlorine measured hourly, with sanitised towels at the exits.</li>
            <li><strong>Wheelchairs:</strong> access is available and staff explain the route; some artworks cannot be reached, and the water areas need a transfer to a special wheelchair with a companion.</li>
          </ul>
          <p className={styles.bodyText}>
            Hours and closures shift month to month, so open the official calendar for your own travel dates
            before you commit to a slot. Everything above except the time to allow is the official wording,
            read on the dates in the table.
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

        {/* Worth it — a judgement on the official numbers, not on a visit we are claiming. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The decision</span>
          <h2 className={styles.sectionTitle}>Is teamLab Planets worth it?</h2>
          <p className={styles.bodyText}>
            For most first-time visitors to Tokyo, yes — but it is a 1.5 to 2 hour attraction at ¥3,800~ a
            head, so it is priced like a half-day and consumed like a long lunch. Here is the arithmetic in
            front of you rather than a verdict behind it:
          </p>
          <ul className={styles.bodyList}>
            <li><strong>What you pay per hour is high.</strong> ¥3,800~ for 1.5–2 hours is more than twice the ¥1,500 Tokyo Tower Main Deck and well above the ¥2,500 Shibuya Sky, both of which you can linger in. You are paying for something you cannot see anywhere else, not for length — compare the figures on our <Link href="/guides/attractions/japan-attraction-ticket-prices">Japan attraction ticket prices</Link> table.</li>
            <li><strong>The entry cost is time, not just money.</strong> The official FAQ warns of a 30 to 60 minute wait to be admitted at busy times, on top of the barefoot changeover. Two hours is the honest block to reserve.</li>
            <li><strong>It is the most physical museum in Tokyo.</strong> Barefoot throughout, water to adult knee height, mirrored floors. If that sounds like an ordeal rather than an experience, Borderless in Azabudai is the same collective without the water.</li>
            <li><strong>It is weatherproof and it suits children.</strong> Indoors, under-4s free, and the thing children remember from the trip more often than the temples.</li>
            <li><strong>It cannot be rescued on the day.</strong> No on-site sales means a full calendar is final. The cost of getting this wrong is the whole plan for that afternoon, which is the real argument for booking it first.</li>
          </ul>
          <p className={styles.bodyText}>
            Skip it if your Tokyo days are already tight, if a 30-minute fixed window would wreck a day you
            want to improvise, or if nobody in the group wants to roll their trousers up. Those are the three
            reasons the ticket disappoints, and none of them is about the art.
          </p>
        </section>

        {/* Booking window and sell-outs. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Availability</span>
          <h2 className={styles.sectionTitle}>Do teamLab Planets tickets sell out?</h2>
          <p className={styles.bodyText}>
            Individual admission times do, and when your date fills there is no counter to fall back on: the
            official store states plainly that tickets are not sold on site at ticket counters or vending
            machines. That makes Planets the first thing to book in a Tokyo week rather than the last.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Our booking window:</strong> two to three weeks ahead for a weekend or holiday slot, a few days for a weekday, and as early as you can for a cherry-blossom or New Year date. That is our planning guidance from how the calendar behaves, not an official figure — teamLab publishes no sell-out data.</li>
            <li><strong>No door tickets:</strong> official, and checked on {CHECKED}. Online only, from the official Ticket Store, Lawson Ticket, Seven Ticket or Klook.</li>
            <li><strong>Ten at a time:</strong> the store caps a single purchase at 10 tickets, and stock can cap it lower. Groups of 20 or more apply through a separate group process.</li>
            <li><strong>Booked the wrong slot?</strong> Change it rather than rebook. An Entrance Pass can be moved up to two hours before its admission time, three changes maximum; a Premium Pass until 08:30 on the day. Nothing is refundable, and coupon tickets cannot be changed at all.</li>
            <li><strong>Late is survivable, missing the day is not:</strong> the official FAQ says you can still get in later the same day within opening hours, subject to last admission one hour before close.</li>
          </ul>
          <p className={styles.bodyText}>
            The practical consequence: pick the date, then the admission time, then the seller. Two of those
            three decide whether you get in at all.
          </p>
        </section>

        {/* Entrance Pass vs Premium Pass — the decision the CTA below belongs to. */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Which teamLab Planets ticket should you buy?</h2>
          <p className={styles.bodyText}>
            The Entrance Pass, in all but one case. The only other option is the ¥12,000 Premium Pass, and the
            single thing the official store claims for it is entry without the entrance queue — so it is worth
            it if a 30 to 60 minute wait would break your day, and a waste of ¥8,000 if it would not.
          </p>
          <div className={styles.stepsList}>
            {ticketChoice.map((item, i) => (
              <div key={item.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>As for which admission time:</strong> the first slots of the day and the last hour before
            last admission are the two that are least likely to hit the long entrance queue, and a weekday
            beats a weekend on both queue and, usually, price. We cannot tell you which slot is cheapest on
            your date, because teamLab publishes no per-slot price list — the calendar does that, and it is one
            click into either seller below.
          </p>
          {/* The CTA sits here, directly after the date / slot / ticket-type decision —
              the point at which a reader has something to look up rather than read. */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <a href={PLANETS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check teamLab Planets dates and slots →
            </a>
            <GygCompareButton slug="teamlab-tokyo-tickets" listing={gygTeamlabPlanets} />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook is one of the sellers the official store names; GetYourGuide is there as a second place to
            look when a slot has gone. Both price by date, so open the calendar rather than trusting a
            headline figure — including the one on this page.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do I book teamLab Planets Tokyo?</h2>
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

        {/* The official site question — asked often enough to deserve a heading. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buying direct</span>
          <h2 className={styles.sectionTitle}>Where is the official teamLab Planets ticket site?</h2>
          <p className={styles.bodyText}>
            The museum&apos;s own page is <strong>teamlab.art/e/planets</strong>, and the tickets it sells are
            sold through the <strong>teamLab Planets TOKYO Official Ticket Store</strong> at{" "}
            <strong>teamlabplanets.dmm.com</strong> — that store, not a search result, is the official
            checkout. Its Help pages are also where every booking rule on this page comes from, read on{" "}
            {CHECKED}.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Who else is official:</strong> the store names Lawson Ticket, Seven Ticket and Klook alongside itself. Anything not on that list is a reseller you have no reason to use.</li>
            <li><strong>How the store takes payment:</strong> credit cards, PayPay and UnionPay through DMM. If your card is refused — which is the usual reason visitors end up elsewhere — a seller with an international checkout solves it.</li>
            <li><strong>How the ticket arrives:</strong> an email with a link to the QR ticket two days before, with the QR code itself displayed from 00:00 on the day of admission.</li>
            <li><strong>What direct does not buy you:</strong> a lower price. The date and admission time set the figure, and the store prices them on the same calendar whichever official channel you use.</li>
          </ul>
          <p className={styles.bodyText}>
            In other words: buy direct if your card works and you read the Japanese or English store happily;
            buy from a named seller if you want the checkout in your own language and currency. Both are
            official, and neither is a workaround.
          </p>
        </section>

        {/* Kids — the official rules, which are stricter than most visitors expect. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Is teamLab Planets good for kids?</h2>
          <p className={styles.bodyText}>
            It is the most child-friendly museum in Tokyo and the one with the most rules. Under-4s are free,
            4–12s pay ¥1,500, the water in places reaches adult knee height — so higher on a child — and
            strollers cannot come inside at all. Everything below is the official wording, read on {CHECKED}.
          </p>
          <ul className={styles.bodyList}>
            <li><strong>Ages and prices:</strong> children 3 and under are free of ticket fare; 4–12 is ¥1,500; junior and senior high school is ¥2,800. The Premium Pass is sold from age 4.</li>
            <li><strong>Supervision:</strong> one adult has to accompany every three children. A single parent with four small children is not a booking the store will honour.</li>
            <li><strong>Strollers:</strong> not allowed in the museum. There is stroller parking outside the building where you lock it yourself with a wire key, and baby carriers are accepted inside.</li>
            <li><strong>Nappies:</strong> changing tables are in the ladies&apos; restrooms.</li>
            <li><strong>The water:</strong> knee height for an adult, and the whole route is barefoot. Bring a change of clothes and expect everyone to get wet, not just the children.</li>
            <li><strong>Clothes:</strong> shorts or roll-up trousers for everyone; the floors are mirrored in places. Free rental shorts run XS to 6L, so a child who turns up in a dress is not a problem.</li>
            <li><strong>Storage:</strong> the free lockers are 23 × 34 × 37 cm — a changing bag fits, a suitcase does not, and oversized items go to the stroller parking.</li>
          </ul>
          <p className={styles.bodyText}>
            Practically: book an early slot, feed them first, and keep the rest of the afternoon loose. The
            30 to 60 minute entrance wait is the part that tests small children, not the artworks.
          </p>
        </section>

        {/* Planets vs Borderless */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>teamLab Planets vs Borderless: which should I book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Book Planets if you have children or one teamLab visit in you; book Borderless if you want
            to look at art rather than walk through it.</strong> Tokyo has two teamLab museums and visitors
            routinely book the wrong one. They are separate venues with separate tickets in different parts of
            the city: <strong>Planets</strong> in Toyosu is the barefoot, walk-through-water one;{" "}
            <strong>Borderless</strong> in Azabudai Hills is a map-less maze of 50+ artworks that move between
            rooms. Borderless has its own prices, hours and booking quirks — we cover them in the{" "}
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Planets prices read from its official ticket store on {CHECKED}; the Borderless figure and both
            sets of opening hours were read from teamlab.art on {BORDERLESS_CHECKED}. Both museums price adult
            tickets by date and slot and both calendars change, so confirm for your own date. Time needed is
            our own planning guidance, not an official figure.
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
            <li>Roughly 15 minutes by taxi from Tokyo Station, 10 from Ginza, or about 15 minutes from Haneda Airport using the expressway.</li>
            <li><strong>No parking at the museum</strong> — the official store asks visitors to come by train or bus. There are paid shuttle buses between GINZA SIX and Planets. Read on {CHECKED}.</li>
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

        {/* What else fits the same day. A Planets slot is 1.5–2 hours in a corner of
            Tokyo most itineraries visit once, so the rest of the day is a real
            question — and these are the listings that answer it. The ticket CTAs
            above are untouched. */}
        <KlookTourPicks
          heading="Book It For the Same Day in Toyosu and Odaiba"
          intro="A Planets slot fills an hour and a half of a day out east, and the Yurikamome line that drops you at the door carries on into Odaiba. The subway pass covers the Metro leg to Toyosu but not the Yurikamome; the other three are all within a short ride of the museum. Klook blocks automated price reads, so open a listing for the figure and the times on your own date."
          tours={[tokyoJoypolisPassport, tokyoBaySunsetBoatCruise, tsukijiCultureFoodTour, tokyoSubwayTicket]}
        />

        {/* Klook tours in the same city — the ticket CTAs above are unchanged. */}
        <KlookTourPicks
          heading="Day Trips From the Same City"
          intro="Planets takes about an hour and a half on site, so it usually shares a day with something else. If you still have a free day in the Tokyo half of your trip, these two run out of the city and back the same evening."
          tours={[fujiDayTour, tokyoSightseeingBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 4l-9 9 2 2 9-9z" />
                  <path d="M5 19l2-6 4 4-6 2z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Warner Bros. Studio Tour Tokyo Tickets (2026): Prices &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
                <p className={styles.relatedTitle}>teamLab Borderless Tickets (2026): Price, How to Book and Time Slots</p>
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
            <div className={styles.pickCtaRow}>
              <a href={PLANETS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View teamLab Planets Tickets →
              </a>
              <GygCompareButton slug="teamlab-tokyo-tickets" listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
