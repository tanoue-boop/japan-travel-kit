import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  bettySmithJeansMaking,
  kojimaBusDenimPass,
  jrOkayamaHiroshimaYamaguchiAreaPass,
  naoshimaTeshimaPrivateTour,
} from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from Betty Smith's
// own page for the experience, read by node fetch on 28 Nov 2026:
// betty.co.jp/village/make/ and /en/village/make/ (jeans-making experience, Okayama
// and Tokyo; OMIYAGE JEANS from 11,000 yen incl. tax, DENIM WORKS from 24,200 yen incl.
// tax after the 1 Sep 2026 revision; the price includes the jeans, leather patch,
// buttons, rivets, experience and instruction fees and tax; a 2,000 yen (2,200 incl.
// tax) experience fee is included since 1 Jun 2025; Tokyo offers DENIM WORKS only;
// choose 1 button and 6 rivets, hammered in on a foot press — wear sneakers; staff
// sew the label and hem with a Union Special chain stitch; take the jeans home the
// same day; booking up to the day before on the online calendar, same day by phone;
// hours Dec-Feb 9:30-17:00, Mar-Nov 9:00-18:00, weekday lunch break 12:00-13:00;
// closed over New Year; cards incl. Visa/Mastercard/JCB/Amex and IC cards). The
// Klook listing 50987 is the Okayama (Kurashiki) workshop. No Klook price is printed.
const ROUTE = "/guides/attractions/betty-smith-jeans-making-experience";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://betty.co.jp/en/village/make/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function BettySmithJeansMakingPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Betty Smith Jeans Making"
      title="Betty Smith Jeans Making Experience: Price & Booking"
      description="Make your own jeans at Betty Smith in Kojima, Okayama: from ¥11,000 (OMIYAGE JEANS) or ¥24,200 (DENIM WORKS), taken home the same day. Hours and booking."
      h1={<>Betty Smith Jeans Making Experience: <br />Price, Hours &amp; How to Book</>}
      subtitle="Betty Smith in Kurashiki, Okayama: choose a pair, hammer in your own buttons and rivets, and leave wearing them."
      badges={[`Checked ${CHECKED}`, "From ¥11,000", "Okayama"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Betty Smith&apos;s jeans-making experience costs <strong>from ¥11,000 with OMIYAGE JEANS</strong> or{" "}
            <strong>from ¥24,200 with the DENIM WORKS jeans</strong> (tax included, DENIM WORKS revised on 1
            September 2026). The price covers the jeans, the leather patch, buttons, rivets, the experience and
            instruction fees. You choose a style, hammer in one button and six rivets yourself, the staff hem them,
            and you <strong>take the jeans home the same day</strong>.
          </p>
          <p className={styles.bodyText}>
            The workshop is open <strong>9:30–17:00 from December to February</strong> and 9:00–18:00 from March to
            November (weekday lunch break 12:00–13:00), closed over New Year. Book online up to the day before, or
            by phone on the day; Klook sells the Okayama experience too. Betty Smith, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: bettySmithJeansMaking.url, label: "Check the jeans-making experience on Klook →" }}
      stats={[
        { label: "OMIYAGE JEANS", value: "from ¥11,000" },
        { label: "DENIM WORKS", value: "from ¥24,200" },
        { label: "Winter hours (Dec–Feb)", value: "9:30–17:00" },
        { label: "Take home", value: "Same day" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> OMIYAGE JEANS is the try-it version; DENIM WORKS is Betty Smith&apos;s own
          adult denim line. Either way you leave with finished jeans, so it fits as one stop on an Okayama or
          Kurashiki day.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much does the jeans-making experience cost?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices are per pair, tax included. The Tokyo workshop offers DENIM WORKS only.
            </p>
          ),
          table: {
            head: ["Jeans", "Price (incl. tax)", "Includes"],
            rows: [
              ["OMIYAGE JEANS", "from ¥11,000", "Jeans, leather patch, button, rivets, experience and instruction"],
              ["DENIM WORKS", "from ¥24,200", "The same, with Betty Smith's adult denim line"],
            ],
            note: (
              <>
                Betty Smith jeans-making page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                A ¥2,200 experience fee is included in each price. Klook sells the experience at its own price.
              </>
            ),
          },
          ctas: [{ href: bettySmithJeansMaking.url, label: "Book the jeans-making experience on Klook →" }],
        },
        {
          label: "How it works",
          title: "What do you do at the jeans-making experience?",
          body: null,
          table: {
            head: ["Step", "Detail"],
            rows: [
              ["1. Try on", "Choose from men's (unisex) straight and slim styles or women's slim, bootcut, wide and skirt styles"],
              ["2. Choose parts", "One button and six rivets, plus a leather label"],
              ["3. Hammer them in", "On a foot-operated press — wear sneakers; staff help children"],
              ["4. Finish", "Staff sew on the label and hem with a Union Special chain stitch"],
              ["5. Take home", "The same day; visit the Jeans Museum or the shop while you wait"],
            ],
            note: <>Betty Smith jeans-making page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Booking",
          title: "How do I book the jeans-making experience?",
          body: (
            <p className={styles.bodyText}>
              Betty Smith takes bookings on its online calendar up to the day before, and same-day bookings by
              phone. Payment by major cards (Visa, Mastercard, JCB, American Express, Diners Club, Discover,
              UnionPay) or IC cards such as Suica and ICOCA. Klook&apos;s listing is for the Okayama workshop.
            </p>
          ),
        },
      ]}
      sameDay={{
        heading: "Same trip: Okayama and the Seto Inland Sea",
        intro: "Kojima is in Kurashiki, Okayama. These are the other bookings for the area.",
        tours: [kojimaBusDenimPass, jrOkayamaHiroshimaYamaguchiAreaPass, naoshimaTeshimaPrivateTour],
      }}
      links={
        <p className={styles.bodyText}>
          Okayama sits on the shinkansen between Osaka and Hiroshima: see the{" "}
          <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>Osaka to Hiroshima shinkansen guide</Link>,
          the{" "}
          <Link href="/guides/attractions/hiroshima-2-day-itinerary" style={linkStyle}>Hiroshima 2 day itinerary</Link>{" "}
          and the passes that cover the line —{" "}
          <Link href="/guides/transport/kansai-hiroshima-area-pass" style={linkStyle}>Kansai-Hiroshima Area Pass</Link>,{" "}
          <Link href="/guides/transport/sanyo-sanin-area-pass" style={linkStyle}>Sanyo-San&apos;in Area Pass</Link> and{" "}
          <Link href="/guides/transport/okayama-hiroshima-yamaguchi-area-pass" style={linkStyle}>Okayama-Hiroshima-Yamaguchi Area Pass</Link>.
          {" "}Back in Okayama city, <Link href="/guides/attractions/okayama-castle-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Okayama Castle</Link> is ¥500 for adults, 9:00–17:30.
        </p>
      }
      faq={[
        {
          q: "How much is the Betty Smith jeans-making experience?",
          a: `From ¥11,000 with OMIYAGE JEANS or from ¥24,200 with DENIM WORKS, tax and the experience fee included. Betty Smith, checked ${CHECKED}.`,
        },
        {
          q: "Can I take the jeans home the same day?",
          a: "Yes. Staff hem the jeans and sew on the label while you wait, and you take them home that day.",
        },
        {
          q: "What are the opening hours?",
          a: "9:30–17:00 from December to February and 9:00–18:00 from March to November, with a 12:00–13:00 lunch break on weekdays. Closed over New Year.",
        },
        {
          q: "Do I need to book?",
          a: "Bookings are taken online up to the day before; on the day, call the workshop. Klook also sells the Okayama experience.",
        },
        {
          q: "Is there a jeans-making experience in Tokyo?",
          a: "Yes, Betty Smith also runs it in Tokyo, with DENIM WORKS jeans only.",
        },
      ]}
      related={[
        { href: "/guides/transport/okayama-hiroshima-yamaguchi-area-pass", title: "Okayama-Hiroshima-Yamaguchi Area Pass" },
        { href: "/guides/attractions/hiroshima-2-day-itinerary", title: "Hiroshima 2 Day Itinerary" },
        { href: "/guides/transport/osaka-to-hiroshima-shinkansen", title: "Osaka to Hiroshima Shinkansen" },
        { href: "/guides/transport/sanyo-sanin-area-pass", title: "Sanyo-San'in Area Pass" },
      ]}
      banner={{
        title: "Make your own jeans in Kojima",
        desc: "Choose the parts, hammer the rivets, take them home the same day.",
        label: "View the jeans-making experience →",
      }}
    />
  );
}
