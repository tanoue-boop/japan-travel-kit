import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  asakusaKimonoAiwafukuNo1,
  asakusaKimonoVideoPhotoShoot,
  hanayakaKimonoPhotoshoot,
  tokyoDayNightPhotoshoot,
  tokyoGroupPhotoshoot,
  tokyoPhotoshootStayAreas,
  tokyoPhotoshootTripPrep,
  tokyoPrivatePhotoshootGuide,
  tokyoSnapshotPhotoshoot,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Tokyo photoshoot, added 19 Nov 2026 (task-jtk-20261119-02).
 *
 * How it differs from its neighbours:
 *  - asakusa-kimono-rental and kimono-rental-japan are about renting the outfit
 *    (return times, hair sets, which shop); the photos there are a by-product;
 *  - this page is for readers whose goal is the photographs: booking a Tokyo
 *    photographer, which listing format, which spot, and the kimono studio shoot.
 *
 * Sources: the Klook listings in lib/klook-links.ts (tokyoSnapshotPhotoshoot and the
 * rest), read through the www.klook.com search index on 19 Nov 2026 — durations,
 * photo counts and delivery times only. No Klook price appears on this page.
 */

const CHECKED = checkedLabel("2026-11-19");

const ROUTE = "/guides/attractions/tokyo-photoshoot";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const rel = "sponsored nofollow noopener";

type Spot = { spot: string; mood: string; crowds: string; time: string; listing: ReactNode };

const spots: Spot[] = [
  {
    spot: "Shibuya Scramble Crossing",
    mood: "City, movement, the giant screens — the one shot most people come to Tokyo for",
    crowds: "Busy at every hour; the crossing clears and fills with each light cycle",
    time: "Daytime for faces, blue hour for the screens",
    listing: (
      <KlookLink href={tokyoSnapshotPhotoshoot.url} target="_blank" rel={rel}>Snapshot session (1 hour)</KlookLink>
    ),
  },
  {
    spot: "Asakusa — Senso-ji, Kaminarimon, Nakamise-dori",
    mood: "Old Tokyo: the temple gate, red lanterns, the five-storey pagoda — the setting for a kimono shoot",
    crowds: "Quietest early in the morning; Nakamise fills once the shops open",
    time: "Early morning, or late afternoon for warm light on the pagoda",
    listing: (
      <KlookLink href={hanayakaKimonoPhotoshoot.url} target="_blank" rel={rel}>Kimono photo shoot (2–3 hours)</KlookLink>
    ),
  },
  {
    spot: "Shinjuku at night — Omoide Yokocho, the station area",
    mood: "Neon, narrow lantern-lit alleys, rain-on-asphalt reflections",
    crowds: "Alleys are narrow and the bars are working businesses — shoot in the lanes, not inside",
    time: "After dark",
    listing: (
      <KlookLink href={tokyoDayNightPhotoshoot.url} target="_blank" rel={rel}>Day-or-night shoot (1 hour)</KlookLink>
    ),
  },
  {
    spot: "Anywhere you name — the photographer suggests the rest",
    mood: "A walk through two or three spots with a local who also guides",
    crowds: "Depends on the area you choose",
    time: "Arranged with the photographer",
    listing: (
      <KlookLink href={tokyoPrivatePhotoshootGuide.url} target="_blank" rel={rel}>Photographer-guide stroll (about 1 hour)</KlookLink>
    ),
  },
];

type Plan = { who: string; pick: ReactNode; why: string };

const plans: Plan[] = [
  {
    who: "Solo traveller",
    pick: <KlookLink href={tokyoSnapshotPhotoshoot.url} target="_blank" rel={rel}>Snapshot session, 1 hour</KlookLink>,
    why: "The most photos for the time: over 100 originals plus 10 retouched picks, delivered within a week. Photographers are matched to your language.",
  },
  {
    who: "Couple",
    pick: <KlookLink href={tokyoDayNightPhotoshoot.url} target="_blank" rel={rel}>Day-or-night shoot, 1 hour</KlookLink>,
    why: "Choose night for Shinjuku's lights or day for Shibuya; one or two locations, at least 10 edited photos to download within 7 days.",
  },
  {
    who: "Family with children",
    pick: <KlookLink href={tokyoPrivatePhotoshootGuide.url} target="_blank" rel={rel}>Photographer-guide stroll</KlookLink>,
    why: "About an hour at walking pace; the listing describes it as kid-friendly and open to groups, with edited images sent by email.",
  },
  {
    who: "Friends or a group (up to 8)",
    pick: <KlookLink href={tokyoGroupPhotoshoot.url} target="_blank" rel={rel}>Group private photoshoot</KlookLink>,
    why: "One booking for up to eight people, and the fastest turnaround: a digital gallery link within 48 hours.",
  },
  {
    who: "Kimono shoot",
    pick: <KlookLink href={hanayakaKimonoPhotoshoot.url} target="_blank" rel={rel}>HANAYAKA kimono photo shoot, Asakusa</KlookLink>,
    why: "Outfit, hair styling and photographer in one 2–3 hour booking, about three minutes from Senso-ji, with couple and family plans.",
  },
  {
    who: "Photos and video",
    pick: <KlookLink href={asakusaKimonoVideoPhotoShoot.url} target="_blank" rel={rel}>Asakusa video & photo shoot</KlookLink>,
    why: "1.5 to 2.5 hours in kimono with edited photos and a video — for a clip as well as stills.",
  },
];

const faqItems = [
  {
    q: "How long is a photoshoot in Tokyo?",
    a: "Most Tokyo photoshoots on Klook are one hour — the snapshot session, the day-or-night shoot and the photographer-guide stroll all list about an hour. A kimono photo shoot takes longer because dressing and hair come first: HANAYAKA in Asakusa lists 2 to 3 hours, and the Asakusa video-and-photo shoot 1.5 to 2.5 hours.",
  },
  {
    q: "How many photos do you get from a Tokyo photoshoot?",
    a: "It depends on the listing. The one-hour snapshot session gives over 100 original photos plus 10 retouched photos of your choice within a week; the day-or-night shoot gives at least 10 edited photos to download within 7 days; the group shoot sends a gallery link within 48 hours. Read the 'What's included' section before booking.",
  },
  {
    q: "How much is a photoshoot in Tokyo?",
    a: "The price changes with the date, the plan and the number of people, so check the listing for your date — this guide does not print Klook prices. Expect a kimono studio shoot, which includes the outfit and hair styling, to cost more than a one-hour photographer-only session, and expect an extra fee for locations outside central Tokyo on the snapshot listing.",
  },
  {
    q: "Where are the best photoshoot spots in Tokyo?",
    a: "Shibuya Scramble Crossing for the city shot, Asakusa (Kaminarimon, Senso-ji and the pagoda) for old Tokyo and kimono, and Shinjuku at night — Omoide Yokocho and the lights around the station — for neon. Go to Asakusa early in the morning, before the shopping street fills.",
  },
  {
    q: "Can you do a kimono photoshoot in Tokyo?",
    a: "Yes. Asakusa is the place: HANAYAKA's kimono photo shoot, about three minutes' walk from Senso-ji, includes over 500 kimono and yukata to choose from, hair styling and a staff photographer in a 2–3 hour booking. Already renting a kimono? Book a photographer-only session and meet in Asakusa — but check the rental's return time first.",
  },
  {
    q: "How far ahead should you book a Tokyo photographer?",
    a: "At least a few days, and a week or more for weekends, cherry-blossom season and autumn leaves. Photographers are assigned to your date and, on the snapshot listing, to your language, so the calendar on the listing shows the earliest date still open. Read the cancellation terms and what happens in rain before paying.",
  },
  {
    q: "What happens if it rains on the day of the shoot?",
    a: "Each listing sets its own rule, so read its cancellation and bad-weather terms before booking. If you can, book the shoot early in the trip so there is a spare day to move to. Shinjuku at night works in light rain — wet streets reflect the lights.",
  },
  {
    q: "What is the difference between a Tokyo photoshoot and a Tokyo photo tour?",
    a: "A Tokyo photoshoot puts you in front of the camera: a photographer takes pictures of you. A Tokyo photo tour usually means a guide who walks you through photogenic spots while you take the pictures yourself. The listings on this page are photoshoots; the photographer-guide stroll sits between the two.",
  },
];

const TITLE = "Tokyo Photoshoot (2026): Spots, Kimono Shoots & How to Book";
const DESCRIPTION =
  "Tokyo photoshoot guide: 1–3 hours, 10 to 100+ photos, Shibuya, Asakusa or Shinjuku. Tokyo photographer vs Tokyo photo tour, and kimono photoshoot Tokyo.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/asakusa-kimono-rental", title: "Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph" },
  { href: "/guides/attractions/kimono-rental-japan", title: "Kimono Rental in Japan 2026: Prices, Best Cities & How Far Ahead to Book" },
  { href: "/guides/attractions/shibuya-sky-tickets", title: "Shibuya Sky Tickets 2026: Price, Hours & Sunset Slots" },
  { href: "/guides/attractions/tokyo-bike-tour", title: "Tokyo Bike Tour (2026): E-Bike, Night Rides & Bike Rules" },
  { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo 2026: Top Picks and Ticket Prices" },
  { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo 2026: Best Areas by Trip Type" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
const h3 = { fontSize: "1.1rem", marginTop: "1.5rem" } as const;

export default function TokyoPhotoshootPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo Photoshoot", item: URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {crumbSep}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {crumbSep}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Tokyo Photoshoot</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Photoshoot (2026): <br />Photographers, Spots and Kimono Shoots
          </h1>
          <p className={styles.heroSubtitle}>
            Booking a Tokyo photographer: how long it takes, how many photos you get, Shibuya vs Asakusa vs
            Shinjuku at night, and the kimono studio shoot.
          </p>
          <div className={styles.heroBadges}>
            {[`Listings read ${CHECKED}`, "No Klook prices — check per date", "Spots compared"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time</p>
                <p className={styles.verdictStatValue}>1 hour; 2–3 hours with kimono</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Photos</p>
                <p className={styles.verdictStatValue}>10 edited to 100+ originals</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book</p>
                <p className={styles.verdictStatValue}>A few days ahead; a week+ in peak season</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Tokyo photoshoot</strong> with a professional photographer takes 1 hour, or 2 to 3 hours
              as a kimono shoot in Asakusa, and gives you from 10 edited photos to over 100 originals plus 10
              retouched, delivered within 48 hours to a week depending on the listing. The three classic spots are
              Shibuya Scramble Crossing, Asakusa (Senso-ji and Kaminarimon) and Shinjuku at night. The price
              depends on the plan, the date and the group size — check the listing for your date. Book at least a
              few days ahead, and a week or more for weekends and cherry-blossom or autumn-leaf season
              (Klook listings read {CHECKED}).
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Here for the kimono itself — return times, hair sets, which shop? See{" "}
              <Link href="/guides/attractions/asakusa-kimono-rental">Asakusa kimono rental</Link> and{" "}
              <Link href="/guides/attractions/kimono-rental-japan">kimono rental in Japan</Link>. This page is for
              when the photographs are the point.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoSnapshotPhotoshoot.url} target="_blank" rel={rel} className={styles.verdictBtn}>
                Book a Tokyo photographer (1 hour) →
              </KlookLink>
              <KlookLink href={hanayakaKimonoPhotoshoot.url} target="_blank" rel={rel} className={styles.verdictBtn}>
                Kimono photoshoot in Asakusa →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same visit"
          heading="Book These With the Photoshoot"
          intro="A hotel near the morning location, the kimono if your photographer does not supply one, a day pass and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoPhotoshootTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is a Photoshoot in Tokyo?</h2>
          <p className={styles.bodyText}>
            It depends on three things — the length, whether an outfit is included, and how many people are in the
            photos — so check the listing for your date; prices on Klook change by date and plan, and this guide does
            not print them. A one-hour photographer-only session is the entry point. A kimono shoot costs more
            because the kimono, the dressing and the hair styling are in the same booking. The snapshot listing also
            charges extra for locations outside central Tokyo, and retouching beyond the standard edit (face or body
            shape) is an add-on on some listings.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What do you get for the money?</h3>
          <SimpleTable
            head={["Listing", "Length", "Photos", "Delivery"]}
            rows={[
              [
                <KlookLink key="a" href={tokyoSnapshotPhotoshoot.url} target="_blank" rel={rel}>Snapshot session</KlookLink>,
                "1 hour",
                "100+ originals + 10 retouched of your choice",
                "Within a week",
              ],
              [
                <KlookLink key="b" href={tokyoDayNightPhotoshoot.url} target="_blank" rel={rel}>Day-or-night shoot</KlookLink>,
                "1 hour, 1–2 locations",
                "At least 10 edited",
                "Download within 7 days",
              ],
              [
                <KlookLink key="c" href={tokyoGroupPhotoshoot.url} target="_blank" rel={rel}>Group private shoot (up to 8)</KlookLink>,
                "Per listing",
                "Edited gallery",
                "Within 48 hours",
              ],
              [
                <KlookLink key="d" href={tokyoPrivatePhotoshootGuide.url} target="_blank" rel={rel}>Photographer-guide stroll</KlookLink>,
                "About 1 hour",
                "Edited images",
                "By email after the session",
              ],
              [
                <KlookLink key="e" href={hanayakaKimonoPhotoshoot.url} target="_blank" rel={rel}>HANAYAKA kimono shoot</KlookLink>,
                "2–3 hours incl. dressing and hair",
                "Per plan",
                "Per plan",
              ],
              [
                <KlookLink key="f" href={asakusaKimonoVideoPhotoShoot.url} target="_blank" rel={rel}>Asakusa video & photo shoot</KlookLink>,
                "1.5–2.5 hours, kimono included",
                "Edited photos + video",
                "Per listing",
              ],
            ]}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {CHECKED}, from the Klook listings linked in each row (klook.com, en-US). Lengths, photo counts and delivery times are as each listing states them; prices are left to the
            listing because they change by date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSnapshotPhotoshoot.url} target="_blank" rel={rel} className={styles.pickCta}>
              Check the snapshot session for your date →
            </KlookLink>
            <KlookLink href={tokyoDayNightPhotoshoot.url} target="_blank" rel={rel} className={styles.pickCta}>
              Check the day-or-night shoot →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Locations</span>
          <h2 className={styles.sectionTitle}>Where Are the Best Photoshoot Spots in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shibuya Scramble Crossing for the city, Asakusa for old Tokyo and kimono, Shinjuku after dark for neon.
            Pick one per session: a one-hour shoot covers one or two nearby spots, not all three.
          </p>
          <SimpleTable
            head={["Spot", "Look", "Crowds", "Best time", "Listing that fits"]}
            rows={spots.map((s) => [s.spot, s.mood, s.crowds, s.time, s.listing])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {CHECKED}. The listing column is the Klook session whose stated locations or format match
            the spot. Crowd notes are general planning guidance, not measured counts.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Which is the best time of day for a Tokyo photo shoot?</h3>
          <p className={styles.bodyText}>
            Early morning for Asakusa, before Nakamise-dori fills; late afternoon into blue hour for Shibuya, when
            the screens light up but faces are still lit; after dark for Shinjuku. For the view from above Shibuya
            Crossing, a sunset slot at{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets">SHIBUYA SKY</Link> is a separate timed ticket. A
            3-hour <Link href="/guides/attractions/tokyo-bike-tour">Tokyo bike tour</Link> that ends by Shibuya fits
            the same day as an evening shoot there.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which plan</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Photoshoot Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Solo, the snapshot session; as a couple, the day-or-night shoot; with children, the slower
            photographer-guide stroll; for kimono, the Asakusa studio shoot.
          </p>
          <SimpleTable head={["Who", "Book", "Why"]} rows={plans.map((p) => [p.who, p.pick, p.why])} />
          <p className={styles.bodyText} style={note}>
            Last checked: {CHECKED}, from each linked Klook listing.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kimono</span>
          <h2 className={styles.sectionTitle}>Can You Do a Kimono Photoshoot in Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes — in Asakusa, around Senso-ji. There are two ways to do it. The all-in-one is a kimono photo shoot
            such as HANAYAKA, about three minutes&apos; walk from Senso-ji: over 500 kimono and yukata to choose
            from, hair styling in every plan, a staff photographer, and couple and family plans, in 2 to 3 hours.
            The second is to rent a kimono first and book a photographer-only session to meet you in it — more
            choice of photographer, but the session has to fit inside the rental&apos;s return time.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Kimono photoshoot Tokyo: studio package or rental plus photographer?</h3>
          <p className={styles.bodyText}>
            The studio package if you want one booking and the hair done for you; rental plus a photographer if you
            want a particular photographer, location or a longer day in the kimono afterwards. Return deadlines, hair-set prices and which Asakusa shop to use are in the{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental">Asakusa kimono rental</Link> guide; Kyoto and
            other cities are in <Link href="/guides/attractions/kimono-rental-japan">kimono rental in Japan</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hanayakaKimonoPhotoshoot.url} target="_blank" rel={rel} className={styles.pickCta}>
              Kimono photoshoot, Asakusa →
            </KlookLink>
            <KlookLink href={asakusaKimonoAiwafukuNo1.url} target="_blank" rel={rel} className={styles.pickCta}>
              Asakusa kimono rental with hair styling →
            </KlookLink>
            <KlookLink href={asakusaKimonoVideoPhotoShoot.url} target="_blank" rel={rel} className={styles.pickCta}>
              Kimono photo + video shoot →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How Far Ahead Should You Book a Tokyo Photographer?</h2>
          <p className={styles.bodyText}>
            At least a few days ahead, and a week or more for weekends, late March to early April and November.
            Each booking is a photographer&apos;s time on one date — on the snapshot listing, matched to your
            language — so the calendar on the listing shows the earliest date still open. Before paying, read three
            things on the listing: the cancellation deadline, what happens in rain, and the delivery time for the
            edited photos.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What if it rains?</h3>
          <p className={styles.bodyText}>
            Each listing sets its own bad-weather rule. Book the shoot early in the trip so there is a spare day to
            move it to. Shinjuku at night is the one location that gains from light rain — the wet streets reflect
            the lights.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What should you wear?</h3>
          <p className={styles.bodyText}>
            Solid colours read better against Shibuya&apos;s screens and Asakusa&apos;s red gate than busy patterns,
            and comfortable shoes matter — even a one-hour session walks between spots. For kimono, the studio or
            rental dresses you, so arrive in clothes that are easy to change out of.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Is a Tokyo photoshoot good with kids?</h3>
          <p className={styles.bodyText}>
            Yes, in the short formats: the photographer-guide stroll is described on its listing as kid-friendly,
            and HANAYAKA has a family plan. Book a morning slot, before children tire and before Asakusa gets busy.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Tokyo photoshoot or Tokyo photo tour?</h3>
          <p className={styles.bodyText}>
            A photoshoot puts you in the pictures; a photo tour usually teaches you to take them. If you want photos
            of yourself in Tokyo, book a photoshoot.
          </p>
        </section>

        <KlookStayAreas
          heading="Where to Stay for a Tokyo Photoshoot"
          intro="Stay near the location of the first session of the day. Availability and price are per date, so each area links to Klook's hotel search."
          areas={tokyoPhotoshootStayAreas}
        />

        <BookingEsimCard lead="Photographers send the meeting point and any change of plan by message — get mobile data before you land." />

        <KlookTourPicks
          heading="Tokyo Photoshoot Listings"
          intro="Photographer-only sessions, a group shoot and two kimono shoots. Klook prices change by date, so open a listing for the figure on your dates."
          tours={[tokyoSnapshotPhotoshoot, tokyoDayNightPhotoshoot, tokyoPrivatePhotoshootGuide, tokyoGroupPhotoshoot, hanayakaKimonoPhotoshoot, asakusaKimonoVideoPhotoShoot]}
        />

        <EsimCtaBottom />

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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="18" height="14" rx="2" />
                    <circle cx="12" cy="13" r="3.5" />
                    <path d="M8 6l2-2h4l2 2" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>One hour, one district, one photographer</h2>
            <p className={styles.ctaBannerDesc}>
              Pick the spot first, then the listing that shoots there — and check the date calendar before your
              other plans fill the days.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoSnapshotPhotoshoot.url} target="_blank" rel={rel} className={styles.ctaBannerBtn}>
                Tokyo photographer →
              </KlookLink>
              <KlookLink href={hanayakaKimonoPhotoshoot.url} target="_blank" rel={rel} className={styles.ctaBannerBtn}>
                Kimono photoshoot →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
