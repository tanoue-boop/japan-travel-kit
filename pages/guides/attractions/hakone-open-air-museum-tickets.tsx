import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hakoneOpenAirMuseumTicket, hakoneFreepass, hakoneCruiseCableCarTour } from "../../../lib/klook-links";
import { yunessunTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from the museum's own
// English pages, read by node fetch on 28 Nov 2026: hakone-oam.or.jp/en/info/ (9:00-17:00,
// 365 days a year, last admission 30 min before closing; same-day ticket adult 2,000 yen,
// university and high school 1,600, middle and elementary 800; online ticket 1,800 / 1,400
// / 600; preschool free; disability certificate 1,000 / free / free, one caregiver 1,000;
// free coin lockers at the entrance) and /en/aboutus/access (Hakone Tozan Railway to
// Chokoku-no-Mori Station, then a 2-minute walk; H, J or Z bus to Ninotaira-iriguchi, then
// 6 minutes on foot). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/hakone-open-air-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.hakone-oam.or.jp/en/info/";
const ACCESS = "https://www.hakone-oam.or.jp/en/aboutus/access";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HakoneOpenAirMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Hakone Open-Air Museum Tickets"
      title="Hakone Open-Air Museum Tickets 2026: Price & Hours"
      description="The Hakone Open-Air Museum is ¥2,000 for adults at the gate or ¥1,800 online, open 9:00–17:00 every day, 2 minutes from Chokoku-no-Mori Station."
      h1={<>Hakone Open-Air Museum Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="The sculpture park on the Hakone Tozan Train line: gate and online prices, opening hours and how to fit it into a Hakone loop."
      badges={[`Checked ${CHECKED}`, "¥2,000 adult", "Hakone"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Hakone Open-Air Museum ticket is <strong>¥2,000 for adults</strong> at the gate or{" "}
            <strong>¥1,800 online</strong>. University and high school students pay ¥1,600 (¥1,400 online), middle
            and elementary school pupils ¥800 (¥600 online), and preschool children enter free.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>9:00–17:00, 365 days a year</strong>, with last admission 30 minutes before closing.
            The museum is a 2-minute walk from Chokoku-no-Mori Station on the Hakone Tozan Train. Klook sells the
            ticket. Hakone Open-Air Museum, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hakoneOpenAirMuseumTicket.url, label: "Check Hakone Open-Air Museum tickets on Klook →" }}
      stats={[
        { label: "Adult (gate)", value: "¥2,000" },
        { label: "Adult (online)", value: "¥1,800" },
        { label: "Hours", value: "9:00–17:00" },
        { label: "Closed days", value: "None" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy ahead rather than at the gate, and get off the Hakone Tozan Train at
          Chokoku-no-Mori on the way up to Gora. The museum has free lockers at the entrance.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Hakone Open-Air Museum?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Visitors with a disability certificate pay ¥1,000 (adults) or enter free (students), and one caregiver
              pays ¥1,000. Groups of 15 or more pay the online price.
            </p>
          ),
          table: {
            head: ["Ticket", "Same-day (gate)", "Online"],
            rows: [
              ["Adult", "¥2,000", "¥1,800"],
              ["University and high school", "¥1,600", "¥1,400"],
              ["Middle and elementary school", "¥800", "¥600"],
              ["Preschool child", "Free", "Free"],
            ],
            note: (
              <>
                Hakone Open-Air Museum prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "How do I get to the Hakone Open-Air Museum?",
          body: (
            <p className={styles.bodyText}>
              Ride the Odakyu line to Hakone-Yumoto, change to the Hakone Tozan Railway and get off at
              Chokoku-no-Mori; the museum is a 2-minute walk. By bus, the H, J or Z bus from Odawara or
              Hakone-Yumoto stops at Ninotaira-iriguchi, 6 minutes on foot. See the{" "}
              <a href={ACCESS} target="_blank" rel="noopener" style={linkStyle}>museum&apos;s access page</a>.
            </p>
          ),
          ctas: [{ href: hakoneOpenAirMuseumTicket.url, label: "Book the Hakone Open-Air Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: the Hakone loop",
        intro: "The museum is one stop below Gora, where the cable car starts. These fill the rest of the day.",
        tours: [hakoneFreepass, yunessunTicket, hakoneCruiseCableCarTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the trains, ropeway and boat around the loop, see the{" "}
          <Link href="/guides/attractions/hakone-free-pass" style={linkStyle}>Hakone Free Pass guide</Link>. The{" "}
          <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>Hakone day trip from Tokyo</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>Hakone 2-day itinerary</Link> fit
          the museum into the route, and{" "}
          <Link href="/guides/attractions/yunessun-tickets" style={linkStyle}>Yunessun</Link> in Kowakien is a spa stop
          nearby.
        </p>
      }
      faq={[
        {
          q: "How much is the Hakone Open-Air Museum?",
          a: `¥2,000 for adults at the gate or ¥1,800 online; ¥1,600 / ¥1,400 for university and high school students; ¥800 / ¥600 for middle and elementary pupils; preschool children free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 17:00, 365 days a year. Last admission is 30 minutes before closing.",
        },
        {
          q: "Which station is the Hakone Open-Air Museum near?",
          a: "Chokoku-no-Mori on the Hakone Tozan Railway, a 2-minute walk away. It is one stop before Gora.",
        },
        {
          q: "Is the Hakone Free Pass valid for entry?",
          a: "No. The Free Pass covers the Hakone Tozan Train to Chokoku-no-Mori, but museum admission is a separate ticket.",
        },
        {
          q: "Can I buy Hakone Open-Air Museum tickets on Klook?",
          a: "Yes. Klook sells an admission ticket; the museum also sells its own online ticket at ¥1,800 for adults.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakone-free-pass", title: "Hakone Free Pass" },
        { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip from Tokyo" },
        { href: "/guides/attractions/hakone-2-day-itinerary", title: "Hakone 2-Day Itinerary" },
        { href: "/guides/attractions/yunessun-tickets", title: "Yunessun Tickets" },
      ]}
      banner={{
        title: "A sculpture park on the Hakone Tozan line",
        desc: "Admission to the Hakone Open-Air Museum.",
        label: "View Hakone Open-Air Museum tickets →",
      }}
    />
  );
}
