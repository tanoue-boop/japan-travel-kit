import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  cheapestAtLeastGb,
  formatUsd,
  getProvider,
  priceAtLeastLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { cheapestPerDay, ratesCheckedAt, rentalCost } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// eSIM prices and affiliate links come from data/esim-prices.json (refreshed daily);
// Pocket WiFi rates come from lib/pocket-wifi.ts (hand-checked).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

// The group maths, done once so the prose, the table and the verdict cannot disagree.
// 5 GB is the smallest allowance that covers a week of maps, messaging and photo uploads
// for one person; a rented router is one flat cost no matter how many people share it.
const TRIP_DAYS = 7;
const PER_PERSON_PLAN = cheapestAtLeastGb("esimgo", 5);
const PER_PERSON_USD = PER_PERSON_PLAN?.priceUsd ?? 0;
const ROUTER_USD = rentalCost(TRIP_DAYS);
const ROUTER = cheapestPerDay();
/** Smallest group for which one shared router beats an eSIM each. */
const BREAK_EVEN = PER_PERSON_USD > 0 ? Math.ceil(ROUTER_USD / PER_PERSON_USD) : 0;

const faqItems = [
  {
    q: "What's the cheapest way to get data for a group in Japan?",
    a: `It flips at about ${BREAK_EVEN} people. Below that, an eSIM each is cheaper: ${PER_PERSON_PLAN?.name} from eSIM Go is ${formatUsd(PER_PERSON_USD)} per person. At ${BREAK_EVEN} or more, one shared Pocket WiFi wins — ${ROUTER.name} is about ${formatUsd(ROUTER_USD)} for a ${TRIP_DAYS}-day rental total, with unlimited data, however many of you share it.`,
  },
  {
    q: "Can families share one eSIM in Japan?",
    a: "No. An eSIM is tied to a single device. Each person needs their own eSIM or SIM card. To share connectivity, use a Pocket WiFi router which allows up to 10 devices to connect simultaneously.",
  },
  {
    q: "Is Pocket WiFi better than eSIM for families?",
    a: `For a family of four or more, usually yes — on cost and on coverage of devices. One router is a flat charge regardless of headcount and connects up to ${ROUTER.maxDevices} devices, so kids' tablets and a laptop come along free. The trade-offs are physical: someone carries it, it lasts ${ROUTER.batteryHours} on a charge, it must be collected and returned at the airport, and if it runs flat the whole family is offline at once.`,
  },
  {
    q: "Do children need their own SIM card in Japan?",
    a: "Children's phones and tablets need connectivity too, but they can share a Pocket WiFi without needing their own SIM. If your child has an eSIM-compatible device and needs independent connectivity, an individual eSIM is the cleanest solution.",
  },
  {
    q: "Can I buy multiple eSIMs on one Airalo account?",
    a: "Yes. You can purchase separate Japan eSIM plans for each device on a single Airalo account. Each device gets its own QR code and data plan. There's no family or group discount, but the per-person price is still competitive.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-family-group") } });

export default function JapanEsimFamilyGroupPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Japan eSIM for Family &amp; Group Travel 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Travelling to Japan with family or a group? We compare individual eSIMs vs shared Pocket WiFi to find the most cost-effective option."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-family-group" />
        <meta property="og:title" content="Japan eSIM for Family &amp; Group Travel 2026" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-family-group" />
        <meta property="og:description" content="Travelling to Japan with family or a group? We compare individual eSIMs vs shared Pocket WiFi to find the most cost-effective option." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan eSIM for Family &amp; Group Travel 2026" />
        <meta name="twitter:description" content="Travelling to Japan with family or a group? We compare individual eSIMs vs shared Pocket WiFi to find the most cost-effective option." />
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
              headline: "Best eSIM for Japan: Family & Group Travel 2026",
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>eSIM for Families &amp; Groups</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>👨‍👩‍👧‍👦</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan:<br />Family &amp; Group Travel (2026)
          </h1>
          <p className={styles.heroSubtitle}>
            An eSIM each, or one shared router? The answer is arithmetic,
            and it turns over at {BREAK_EVEN} people.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, `Break-even at ${BREAK_EVEN} people`, "Per-person maths"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer */}
        <section className={styles.choiceSection}>
          <span className={styles.sectionLabel}>Quick Answer</span>
          <h2 className={styles.sectionTitle}>Which Option Is Best for Your Group?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            An eSIM cannot be shared — one profile, one device — so a group of five needs five
            plans, while one rented router covers everybody for a single flat fee. That is the
            whole decision, and it has a crossover point:{" "}
            <strong>below {BREAK_EVEN} people buy an eSIM each; at {BREAK_EVEN} or more rent
            one Pocket WiFi</strong>. On today&apos;s prices a usable week of data is{" "}
            {formatUsd(PER_PERSON_USD)} a head ({PER_PERSON_PLAN?.name} from eSIM Go), against
            roughly {formatUsd(ROUTER_USD)} for a {TRIP_DAYS}-day {ROUTER.name} rental shared by
            the lot of you. Two caveats pull the other way regardless of headcount: anyone whose
            phone cannot take an eSIM has to be on the router, and the router has to be carried,
            charged and returned. eSIM prices checked {pricesCheckedAt}; rental rates checked{" "}
            {ratesCheckedAt}.
          </p>
          <div className={styles.choiceGrid}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Individual eSIMs</p>
                  <p className={styles.choiceCardSubtitle}>Best for small groups</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> Fewer than {BREAK_EVEN} of you</li>
                  <li><span className={styles.choiceCheck}>✓</span> Everyone has an eSIM-capable phone</li>
                  <li><span className={styles.choiceCheck}>✓</span> You want to split up during the day</li>
                  <li><span className={styles.choiceCheck}>✓</span> Nothing to collect or return</li>
                </ul>
              </div>
            </div>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="6" width="18" height="12" rx="2" />
                    <path d="M19 9h2v6h-2" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Shared Pocket WiFi</p>
                  <p className={styles.choiceCardSubtitle}>Best for large groups &amp; families</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> {BREAK_EVEN} or more of you</li>
                  <li><span className={styles.choiceCheck}>✓</span> Kids&apos; tablets to connect too</li>
                  <li><span className={styles.choiceCheck}>✓</span> Up to {ROUTER.maxDevices} devices, unlimited data</li>
                  <li><span className={styles.choiceCheck}>✓</span> Someone in the group has no eSIM</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Option 1: Individual eSIMs */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Option 1</span>
          <h2 className={styles.sectionTitle}>Individual eSIMs for Each Person</h2>
          <p className={styles.bodyText}>
            Each group member purchases their own eSIM plan. This gives everyone independent connectivity — no sharing, no battery dependency on a single Pocket WiFi device, and no queuing at airport counters.
          </p>
          <p className={styles.bodyText}>
            For a small group the cost case is clear. A week&apos;s worth of data —{" "}
            {priceAtLeastLabel("esimgo", 5)} from eSIM Go — comes to{" "}
            {formatUsd(PER_PERSON_USD * 2)} for a couple, below the{" "}
            {formatUsd(ROUTER_USD)} a {TRIP_DAYS}-day router rental costs. Each extra person
            adds {formatUsd(PER_PERSON_USD)}, while the router stays flat, which is why the
            advantage disappears at {BREAK_EVEN}.
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {[
                  "No device to carry or charge",
                  "Independent connectivity for each person",
                  "Cheapest for small groups",
                  "Activate before landing",
                ].map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {[
                  "Requires eSIM-compatible phone",
                  "No group discount available",
                  "Laptops & tablets excluded",
                ].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Option 2: Pocket WiFi */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Option 2</span>
          <h2 className={styles.sectionTitle}>Shared Pocket WiFi for the Group</h2>
          <p className={styles.bodyText}>
            A single Pocket WiFi router connects up to {ROUTER.maxDevices} devices at once —
            phones, tablets, laptops, cameras. One person carries it and everyone shares the
            connection, which also solves the problem of a traveller whose handset has no eSIM
            support at all.
          </p>
          <p className={styles.bodyText}>
            The rentals we link start at {formatUsd(cheapestPerDay().fromUsdPerDay)} per day
            ({ROUTER.name}, {ROUTER.network}), so a {TRIP_DAYS}-day trip is about{" "}
            {formatUsd(ROUTER_USD)} for the group — not per person. Split four ways that is
            under {formatUsd(Math.ceil((ROUTER_USD / 4) * 100) / 100)} each for unlimited data.
            Treat those daily rates as a floor: they are the advertised cheapest booking, and
            longer or peak-season rentals cost more.
          </p>
          <p className={styles.bodyText}>
            The catch is physical, not financial. Battery life is {ROUTER.batteryHours}, it has
            to be collected and returned at the airport, and if it dies or walks off with
            whoever is carrying it, the whole group loses data at once.{" "}
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" style={{ color: "#c62828", fontWeight: 600 }}>
              Compare Pocket WiFi options →
            </Link>
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {[
                  "Connects up to 10 devices",
                  "Works on any device (no eSIM needed)",
                  "Usually unlimited data",
                  "Cost-effective for 4+ people",
                ].map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {[
                  "Extra device to carry and charge",
                  "Airport pickup required",
                  "If device dies, everyone loses data",
                ].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost breakdown</span>
          <h2 className={styles.sectionTitle}>Cost Comparison by Group Size</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {[
                      "Group size",
                      `An eSIM each (${TRIP_DAYS} days)`,
                      `One shared router (${TRIP_DAYS} days)`,
                      "Cheaper option",
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[2, 3, 4, 5, 6].map((people) => {
                    const esimTotal = PER_PERSON_USD * people;
                    const esimWins = esimTotal < ROUTER_USD;
                    return (
                      <tr key={people}>
                        <td className={styles.tdProvider}>{people} people</td>
                        <td style={{ fontWeight: 600, color: "#0d1b4b" }}>
                          {formatUsd(esimTotal)}
                          <span style={{ fontWeight: 400, color: "#6b7280" }}>
                            {" "}({formatUsd(PER_PERSON_USD)} each)
                          </span>
                        </td>
                        <td className={styles.tdNetwork}>
                          {formatUsd(ROUTER_USD)}
                          <span style={{ color: "#6b7280" }}>
                            {" "}({formatUsd(Math.ceil((ROUTER_USD / people) * 100) / 100)} each)
                          </span>
                        </td>
                        <td style={{ fontWeight: 700, color: esimWins ? "#1d4ed8" : "#c62828" }}>
                          {esimWins ? "eSIM each" : "Shared router"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#6b7280" }}>
            * eSIM column: {PER_PERSON_PLAN?.name} from eSIM Go at {formatUsd(PER_PERSON_USD)} per
            person, the smallest plan that covers a week of maps, messaging and photo uploads —
            prices read from our daily feed, checked {pricesCheckedAt}. Router column:{" "}
            {ROUTER.name} at its advertised {formatUsd(cheapestPerDay().fromUsdPerDay)}/day
            (unlimited data, up to {ROUTER.maxDevices} devices), rates checked {ratesCheckedAt}.
            Rental rates rise for longer bookings and in peak season, so the router column is a
            floor rather than a quote. The comparison also ignores that the router covers
            laptops and tablets the eSIM column does not.
          </p>
        </section>

        {/* Best eSIMs for Families */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for Families</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Airalo – Best for Couples</p>
              <p className={styles.whoForDesc}>
                {priceAtLeastLabel("airalo", 5)} per person. One account can hold a plan for every
                phone in the family, each with its own QR code — easiest way to buy for people
                who are not in the room with you.
              </p>
              <a href={link("airalo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                Get Airalo →
              </a>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>eSIM Go – Best Budget per Person</p>
              <p className={styles.whoForDesc}>
                {priceAtLeastLabel("esimgo", 5)} per person — the figure the break-even maths
                above is built on. Runs on {getProvider("esimgo").network}, the best choice if
                your itinerary leaves the big cities.
              </p>
              <a href={link("esimgo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                Get eSIM Go →
              </a>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Unlimited – Rarely Right for a Group</p>
              <p className={styles.whoForDesc}>
                Unlimited plans are per person: {unlimitedFromLabel("airalo", 7)} on Airalo,{" "}
                {unlimitedFromLabel("holafly", 7)} on Holafly. For four people that is several
                times a shared router, which already gives you unlimited data. Worth it only
                for one heavy user who needs to stay independent of the group.
              </p>
              <a href={link("airalo")} className={styles.pickCta} target="_blank" rel="sponsored noopener" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                {HOLAFLY_ALT_LABEL}
              </a>
              <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.6rem", lineHeight: 1.6 }}>
                {HOLAFLY_ALT_NOTE}
              </p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>Tips for Group Travel Connectivity</h2>
          <div className={styles.stepsList}>
            {[
              { title: "Mix and match is fine", desc: "Not everyone needs the same provider. Some in your group might prefer Airalo; others might go with eSIM Go. They all work independently." },
              { title: "Download offline maps before landing", desc: "Google Maps and Apple Maps both support offline downloads. Save your key destinations so you're covered even if data is slow or unavailable briefly." },
              { title: "Use group chat apps over data", desc: "LINE, WhatsApp, and Telegram all work on Japan data. Set up a group chat before the trip so you can coordinate without relying on SMS or calls." },
            ].map((step, i) => (
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
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="18" height="12" rx="2" />
                  <path d="M19 9h2v6h-2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2026): Which Is Better?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              Airalo, Holafly, eSIM Go, and Sakura Mobile — compared on price, coverage, and ease of setup.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              View Full eSIM Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
