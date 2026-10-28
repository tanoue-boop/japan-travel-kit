import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import EsimAnswerTable from "../../../components/EsimAnswerTable";
import EsimRelatedCard from "../../../components/EsimRelatedCard";
import {
  cheapestAtLeastGb,
  formatDate,
  formatUsd,
  getProvider,
  plansFor,
  priceAtLeastLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { esimLink, HOLAFLY_ALT_LABEL, HOLAFLY_ALT_NOTE, SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { cheapestPerDay, ratesCheckedAt, rentalCost, specsCheckedAt } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Three sources, three dates.
//
// - eSIM prices: data/esim-prices.json, refreshed daily from each provider's own site
//   (`pricesCheckedAt`).
// - Router rate: lib/pocket-wifi.ts `fromUsdPerDay`, the advertised cheapest booking on
//   the Klook listing, hand-checked on `ratesCheckedAt`. It is a floor, never a quote.
// - Router specs (devices, battery, data, collection): the same listing, read on
//   `specsCheckedAt`.
//
// The group maths is done once, here, so the prose, the table and the verdict cannot
// disagree. 5 GB is the smallest allowance that covers a week of maps, messaging and
// photo uploads for one person; a rented router is one flat cost however many share it.
const pricesCheckedAt = pricesCheckedLabel();
// lib/pocket-wifi.ts stores its two check dates as ISO days; print them the same way as
// the price feed so a sentence carrying all three does not mix formats.
const ratesChecked = formatDate(ratesCheckedAt);
const specsChecked = formatDate(specsCheckedAt);

const TRIP_DAYS = 7;
const PER_PERSON_PLAN = cheapestAtLeastGb("esimgo", 5);
const PER_PERSON_USD = PER_PERSON_PLAN?.priceUsd ?? 0;
const ROUTER = cheapestPerDay();
const ROUTER_USD = rentalCost(TRIP_DAYS);
/** Smallest headcount at which one shared router costs less than an eSIM each. */
const BREAK_EVEN = PER_PERSON_USD > 0 ? Math.max(2, Math.ceil(ROUTER_USD / PER_PERSON_USD)) : 0;
const COUPLE_USD = PER_PERSON_USD * 2;

/** The cheapest plan a provider sells that covers a seven-day trip with 5 GB or more. */
const weekPlan = (id: EsimProviderId): EsimPlan | null =>
  plansFor(id).find((p) => p.days >= TRIP_DAYS && (p.unlimited || (p.gb ?? 0) >= 5)) ?? null;

const TITLE = "Japan eSIM for Family & Group Travel 2026: Cost Per Head";
const DESCRIPTION =
  `An eSIM each is ${formatUsd(PER_PERSON_USD)} a head for ${PER_PERSON_PLAN?.name}; one shared ` +
  `Pocket WiFi is about ${formatUsd(ROUTER_USD)} for ${TRIP_DAYS} days, unlimited, up to ` +
  `${ROUTER.maxDevices} devices. Checked ${pricesCheckedAt}.`;

const faqItems = [
  {
    q: "Is it cheaper for a family to buy an eSIM each or share a Pocket WiFi?",
    a: `One shared router, from two people up. A usable week of data is ${formatUsd(PER_PERSON_USD)} a head (${PER_PERSON_PLAN?.name} from eSIM Go), so a couple pays ${formatUsd(COUPLE_USD)} — already more than the ${formatUsd(ROUTER_USD)} a ${TRIP_DAYS}-day rental of the cheaper router costs at its advertised rate, and that router carries unlimited data for up to ${ROUTER.maxDevices} devices however many of you share it. eSIM prices checked ${pricesCheckedAt}; the rental rate ${ratesChecked}, and it is a floor rather than a quote.`,
  },
  {
    q: "Can a family share one eSIM in Japan?",
    a: `No, and this is the one hard constraint. An eSIM profile is tied to a single device: four people need four plans. The only way to share one connection is a Pocket WiFi router, which connects up to ${ROUTER.maxDevices} devices at once — or one person's phone acting as a hotspot, which is why the tethering terms matter. eSIM Go states tethering on every Japan plan at no extra cost; Holafly caps shareable data at 1 GB a day. Clauses read ${SPECS_CHECKED_AT}.`,
  },
  {
    q: "Do children need their own SIM in Japan?",
    a: `Only if they need data when they are not with you. A child's phone or tablet connects to a shared router like any other device — that is the cheapest way to cover tablets and a laptop, which no eSIM column includes. A teenager who will be off on their own is the case for an individual eSIM, at ${formatUsd(PER_PERSON_USD)} for ${PER_PERSON_PLAN?.name}.`,
  },
  {
    q: "What's the catch with a shared Pocket WiFi?",
    a: `It is physical rather than financial, and there are three parts. The battery is rated at ${ROUTER.batteryHours}, so a full day out needs the power bank the listing includes. The router has to be ${ROUTER.logistics}. And whoever is carrying it is carrying everyone's connection — split up for an afternoon and the rest of the group is offline. Specs read off the listing on ${specsChecked}.`,
  },
  {
    q: "Is there a family or group discount on Japan eSIMs?",
    a: `No provider publishes one. You can buy a separate plan for each phone on a single Airalo account — each device gets its own QR code — which makes buying for people who are not in the room with you easy, but the per-person price is the same as anyone else's. ${priceAtLeastLabel("airalo", 5)} on Airalo against ${priceAtLeastLabel("esimgo", 5)} on eSIM Go, checked ${pricesCheckedAt}.`,
  },
  {
    q: "When should a group book, and what should they check first?",
    a: "Check every handset in the group before you buy anything: an EID row in Settings → About means eSIM hardware, and a phone bought on contract may still be carrier-locked, which a home carrier typically needs 24–48 hours to clear. One handset failing either check decides it for the whole group, because that person has to be on the router. The router then has to be booked before you fly — the cheapest option is delivered to your hotel, so there is no data between landing and check-in.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-family-group") } });

export default function JapanEsimFamilyGroupPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-family-group" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-family-group" />
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
              route: "/guides/esim/japan-esim-family-group",
              headline: "Japan eSIM for Family & Group Travel (2026): Cost Per Head",
              description: DESCRIPTION,
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "eSIM for Families & Groups", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-family-group" },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>eSIM for Families &amp; Groups</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan eSIM for Family &amp; Group Travel (2026):<br />Cost Per Head
          </h1>
          <p className={styles.heroSubtitle}>
            {formatUsd(PER_PERSON_USD)} a head for an eSIM each, or {formatUsd(ROUTER_USD)} once
            for a router the whole group shares.
          </p>
          <div className={styles.heroBadges}>
            {[
              `Updated ${updated.label}`,
              `Router wins from ${BREAK_EVEN} people`,
              `Up to ${ROUTER.maxDevices} devices`,
            ].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer — the whole answer, first */}
        <section className={styles.choiceSection}>
          <span className={styles.sectionLabel}>Quick Answer</span>
          <h2 className={styles.sectionTitle}>An eSIM Each, or One Shared Pocket WiFi?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            <strong>
              From {BREAK_EVEN} people up, one shared router is the cheaper answer — and the gap
              widens with every extra head.
            </strong>{" "}
            An eSIM cannot be shared: one profile, one device, so a family of five needs five
            plans. A usable week of data is {formatUsd(PER_PERSON_USD)} a head (
            {PER_PERSON_PLAN?.name} from eSIM Go), which puts a couple at{" "}
            {formatUsd(COUPLE_USD)} — already more than the {formatUsd(ROUTER_USD)} that a{" "}
            {TRIP_DAYS}-day rental of the cheaper of the two routers we link costs at its advertised rate, with unlimited
            data for up to {ROUTER.maxDevices} devices however many of you share it. Three things
            push back, none of them about money: that rate is an advertised floor and longer or
            peak bookings cost more; someone has to carry the router, charge it and get it back
            ({ROUTER.returnBy.charAt(0).toLowerCase() + ROUTER.returnBy.slice(1)}); and if it
            dies or walks off with whoever is holding
            it, the whole group is offline at once. An eSIM each still wins for two people who split up all day and want independent
            data — and the router is the only option for anyone whose handset cannot take an eSIM
            at all. eSIM prices checked {pricesCheckedAt}; rental rate {ratesChecked}; router
            specs {specsChecked}.
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
                  <p className={styles.choiceCardTitle}>An eSIM each</p>
                  <p className={styles.choiceCardSubtitle}>{formatUsd(PER_PERSON_USD)} per person</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> You will split up during the day</li>
                  <li><span className={styles.choiceCheck}>✓</span> Everyone has an eSIM-capable phone</li>
                  <li><span className={styles.choiceCheck}>✓</span> Nothing to carry, charge or return</li>
                  <li><span className={styles.choiceCheck}>✓</span> One flat battery doesn&apos;t strand the group</li>
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
                  <p className={styles.choiceCardTitle}>One shared Pocket WiFi</p>
                  <p className={styles.choiceCardSubtitle}>{formatUsd(ROUTER_USD)} for the group</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> {BREAK_EVEN} or more of you</li>
                  <li><span className={styles.choiceCheck}>✓</span> Tablets and a laptop to connect too</li>
                  <li><span className={styles.choiceCheck}>✓</span> Up to {ROUTER.maxDevices} devices, unlimited data</li>
                  <li><span className={styles.choiceCheck}>✓</span> Someone&apos;s phone has no eSIM</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost breakdown</span>
          <h2 className={styles.sectionTitle}>What Does Each Option Cost Per Head?</h2>
          <p className={styles.bodyText}>
            The eSIM column rises with every person; the router column does not move. That is the
            entire argument, and it is why the crossover sits at {BREAK_EVEN} rather than at some
            larger family size.
          </p>
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
                  {[1, 2, 3, 4, 5, 6].map((people) => {
                    const esimTotal = PER_PERSON_USD * people;
                    const esimWins = esimTotal < ROUTER_USD;
                    return (
                      <tr key={people}>
                        <td className={styles.tdProvider}>{people} {people === 1 ? "person" : "people"}</td>
                        <td style={{ fontWeight: 600, color: "var(--sumi)" }}>
                          {formatUsd(esimTotal)}
                          <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>
                            {" "}({formatUsd(PER_PERSON_USD)} each)
                          </span>
                        </td>
                        <td className={styles.tdNetwork}>
                          {formatUsd(ROUTER_USD)}
                          <span style={{ color: "var(--text-muted)" }}>
                            {" "}({formatUsd(Math.ceil((ROUTER_USD / people) * 100) / 100)} each)
                          </span>
                        </td>
                        <td style={{ fontWeight: 700, color: "var(--accent)" }}>
                          {esimWins ? "eSIM each" : "Shared router"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            eSIM column: {PER_PERSON_PLAN?.name} from eSIM Go at {formatUsd(PER_PERSON_USD)} per
            person — the smallest plan that covers a week of maps, messaging and photo uploads,
            read from our daily feed on {pricesCheckedAt}. Router column: {ROUTER.name} at its
            advertised {formatUsd(ROUTER.fromUsdPerDay)}/day ({ROUTER.data.toLowerCase()} data, up
            to {ROUTER.maxDevices} devices), rate checked {ratesChecked} and specs{" "}
            {specsChecked}. Rental rates rise for longer bookings and in peak season, so the
            router column is a floor rather than a quote — and it ignores that the router also
            covers the laptops and tablets the eSIM column does not.
          </p>
        </section>

        {/* The provider table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>If You Buy an eSIM Each, Whose?</h2>
          <p className={styles.bodyText}>
            One row per provider: the cheapest plan each sells that covers a {TRIP_DAYS}-day trip
            with 5 GB or more. The tethering column is the one to read if one phone will be acting
            as the hotspot for the group instead of a rented router.
          </p>
          <EsimAnswerTable
            pick={weekPlan}
            note={`The cheapest plan each provider sells with at least ${TRIP_DAYS} days' validity and 5 GB or more; Holafly sells unlimited only.`}
          />
        </section>

        {/* Option 1: Individual eSIMs */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Option 1</span>
          <h2 className={styles.sectionTitle}>Why Would a Group Still Buy an eSIM Each?</h2>
          <p className={styles.bodyText}>
            Because independence is worth something the cost table cannot price. Everyone has their
            own data, nobody is waiting on the person holding the router, and a flat battery
            strands one person rather than five. There is nothing to collect on arrival and nothing
            to post back at the end.
          </p>
          <p className={styles.bodyText}>
            For two people the sums are close enough that this is a real choice:{" "}
            {formatUsd(COUPLE_USD)} in eSIMs against {formatUsd(ROUTER_USD)} for the router, and
            the router rate is a floor that rises with a longer booking. From three up it stops
            being close — {formatUsd(PER_PERSON_USD * 3)} against the same{" "}
            {formatUsd(ROUTER_USD)} — and only the practical reasons are left.
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {[
                  "Nothing to carry, charge or return",
                  "Independent data for each person",
                  "Still cheapest for one traveller",
                  "Installed and ready before you land",
                ].map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {[
                  "Cost rises with every person",
                  "Needs an eSIM-capable phone each",
                  "No group discount anywhere",
                  "Tablets and laptops not covered",
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
          <h2 className={styles.sectionTitle}>What Does a Shared Router Do That eSIMs Can&apos;t?</h2>
          <p className={styles.bodyText}>
            It covers devices, not people. One router connects up to {ROUTER.maxDevices} at once —
            phones, tablets, a laptop, a camera — on {ROUTER.network}, with{" "}
            {ROUTER.data.toLowerCase()} data. That also solves the case no eSIM can: a traveller
            in the group whose handset has no eSIM hardware at all.
          </p>
          <p className={styles.bodyText}>
            The rentals we link start at {formatUsd(ROUTER.fromUsdPerDay)} per day, so a{" "}
            {TRIP_DAYS}-day trip is about {formatUsd(ROUTER_USD)} for the group rather than per
            person — under {formatUsd(Math.ceil((ROUTER_USD / 4) * 100) / 100)} each split four
            ways. Treat the daily rate as a floor: it is the advertised cheapest booking, and
            longer or peak-season rentals cost more.
          </p>
          <p className={styles.bodyText}>
            The catch is physical. The battery is rated at {ROUTER.batteryHours}, the router has to
            be {ROUTER.logistics}, and whoever carries it is carrying everyone&apos;s connection.
            Which of the two rentals suits your group depends on the device count and whether you
            want it waiting at an airport counter or at the hotel —{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              both rentals compared →
            </Link>
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {[
                  `Connects up to ${ROUTER.maxDevices} devices`,
                  "Works on any device — no eSIM needed",
                  "Unlimited data on both rentals we link",
                  `One flat cost from ${BREAK_EVEN} people up`,
                ].map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {[
                  "A device to carry and charge",
                  `Has to be ${ROUTER.logistics}`,
                  "If it dies, everyone loses data",
                  "Advertised rate is a floor, not a quote",
                ].map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Best eSIMs for Families */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Which eSIM Should Each Person Buy?</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>eSIM Go — cheapest per head</p>
              <p className={styles.whoForDesc}>
                {priceAtLeastLabel("esimgo", 5)} per person — the figure the maths above is built
                on. Runs on {getProvider("esimgo").network}, the better choice if the itinerary
                leaves the big cities, and tethering is stated on every Japan plan at no extra
                cost, which matters if one phone is going to feed the others.
              </p>
            </div>
            <div className={styles.whoForCard}>
              <div className={styles.whoForIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className={styles.whoForTitle}>Airalo — easiest to buy for other people</p>
              <p className={styles.whoForDesc}>
                {priceAtLeastLabel("airalo", 5)} per person. One account can hold a plan for every
                phone in the family, each with its own QR code, and data can be topped up from the
                app — the practical way to buy for relatives who are not in the room with you.
              </p>
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
              <p className={styles.whoForTitle}>Unlimited — rarely right for a group</p>
              <p className={styles.whoForDesc}>
                Unlimited plans are per person: {unlimitedFromLabel("airalo", TRIP_DAYS)} on
                Airalo, {unlimitedFromLabel("holafly", TRIP_DAYS)} on Holafly. For four people
                that is several times a shared router, which already carries unlimited data for
                the whole group. Worth it only for one heavy user who needs to stay independent.
              </p>
            </div>
          </div>
        </section>

        {/* The part an AI answer can't do for you — and the CTA */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Before you buy</span>
          <h2 className={styles.sectionTitle}>Will It Work on Everyone&apos;s Phone, and When Should You Book?</h2>
          <p className={styles.bodyText}>
            For a group this is the step that actually decides it, because one handset failing a
            check moves the whole group onto the router. Run it across every phone before you buy
            anything.
          </p>
          <div className={styles.stepsList}>
            {[
              {
                title: "Check every handset for an EID",
                desc: "iPhone: Settings → General → About, scroll to EID. Android: About phone, same row. An EID means eSIM hardware — iPhone XS and later, Pixel 3 and later, Galaxy S20 and later. iPhones bought in mainland China shipped without it. One phone with no EID and that person is on the router whatever the headcount.",
              },
              {
                title: "Check the carrier locks — all of them",
                desc: "A phone bought on contract can refuse a third-party eSIM profile even with the hardware present. Our setup guide puts a home-carrier unlock at 24–48 hours, so this is the check to run weeks out rather than the night before, and in a group of five it is five phone calls.",
              },
              {
                title: "Buy the eSIMs late, book the router early",
                desc: `An eSIM can be bought any time: install the profile at home with it switched off and turn it on when you land. The router is the opposite — ${ROUTER.collect.toLowerCase()}, so it has to be booked before you fly, and with hotel delivery there is no data between landing and check-in. If somebody needs to be online at the airport, that is an argument for the airport-counter rental instead.`,
              },
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
          <p className={styles.bodyText} style={{ marginTop: "1.2rem" }}>
            Full walkthroughs:{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the compatibility checks
            </Link>
            ,{" "}
            <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--accent)", fontWeight: 600 }}>
              where to tap on Android
            </Link>{" "}
            and{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the two router rentals
            </Link>
            .
          </p>
          <div className={styles.pickCtaRow}>
            <a href={esimLink("esimgo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get eSIM Go — {formatUsd(PER_PERSON_USD)} per person →
            </a>
            <a href={esimLink("airalo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo — buy for the whole family →
            </a>
            <a href={esimLink("airalo")} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              {HOLAFLY_ALT_LABEL}
            </a>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            {HOLAFLY_ALT_NOTE}
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
            <EsimRelatedCard href="/guides/esim/best-esim-japan">
              Best eSIM for Japan 2026: Top 4 Picks Compared
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/sakura-mobile-review">
              Sakura Mobile Review 2026: eSIM &amp; SIM Card Plans and Prices
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-sim-card-vs-esim-2026">
              Japan SIM Card vs eSIM (2026): Which Should You Choose?
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-android">
              Best eSIM for Japan on Android (2026): Picks and Setup
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-business">
              Best eSIM for Japan for Business Travel (2026)
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-students">
              Best eSIM for Japan for Students (2026): Priced by the Study Month
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/esim-go-japan-review">
              eSIM Go Japan Review 2026: Prices, Networks and Tethering
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/pocket-wifi-vs-esim-japan">
              Pocket WiFi vs eSIM for Japan (2026): Which Is Better?
            </EsimRelatedCard>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              Airalo, Holafly, eSIM Go and Sakura Mobile — compared on price, coverage and ease
              of setup.
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
