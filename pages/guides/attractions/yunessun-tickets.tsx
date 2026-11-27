import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hakoneFreepass, hakoneOpenAirMuseumTicket } from "../../../lib/klook-links";
import { yunessunTicket, fujiHakonePass } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from Hakone Kowakien
// Yunessun's own page, read by node fetch on 28 Nov 2026: yunessun.com/service/price/
// (variable pricing on A/B/C dates; adult = junior high and up, child = age 3 to
// elementary, 2 and under free; Passport (Yunessun + Mori no Yu) adult 3,500/3,700/4,000,
// child 1,800/1,900/2,000; Yunessun only adult 2,500/2,800/3,000, child 1,400/1,500/1,700;
// Mori no Yu only adult 1,500/1,700/1,800, child 1,000/1,100/1,200; Yunessun weekdays
// 10:00-18:00 (last entry 17:00), weekends and holidays 9:00-19:00 (last entry 18:00);
// Mori no Yu 11:00-20:00 (last entry 19:30); swimsuit rental from 1,200; parking free for
// 2 hours). No Klook price is printed (Klook answers automated reads with 403).
const ROUTE = "/guides/attractions/yunessun-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.yunessun.com/service/price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function YunessunTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Yunessun Tickets"
      title="Yunessun Tickets 2026: Hakone Price, Hours & Mori no Yu"
      description="Hakone Kowakien Yunessun: the Passport with Mori no Yu is ¥3,500–¥4,000 for adults, Yunessun only ¥2,500–¥3,000. Hours, date-based prices and booking."
      h1={<>Yunessun Tickets 2026: <br />Hakone Price, Hours &amp; Mori no Yu</>}
      subtitle="Hakone Kowakien Yunessun, the swimsuit spa park, and Mori no Yu, its onsen: the three tickets, the date-based prices and the opening hours."
      badges={[`Checked ${CHECKED}`, "From ¥2,500", "Hakone"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Yunessun uses date-based prices (A, B and C days). For adults, the <strong>Passport covering Yunessun
            and Mori no Yu is ¥3,500–¥4,000</strong>; Yunessun alone (the swimsuit area) is ¥2,500–¥3,000, and Mori
            no Yu alone (the onsen) is ¥1,500–¥1,800. Children aged 3 to elementary school pay ¥1,000–¥2,000;
            under-3s are free.
          </p>
          <p className={styles.bodyText}>
            Yunessun opens <strong>10:00–18:00 on weekdays</strong> and 9:00–19:00 on weekends and holidays (last
            entry an hour before closing); Mori no Yu opens 11:00–20:00. Klook sells a one-day ticket. Hakone
            Kowakien Yunessun, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: yunessunTicket.url, label: "Check Yunessun tickets on Klook →" }}
      stats={[
        { label: "Passport (adult)", value: "¥3,500–¥4,000" },
        { label: "Yunessun only (adult)", value: "¥2,500–¥3,000" },
        { label: "Yunessun hours", value: "10:00–18:00 weekdays" },
        { label: "Mori no Yu hours", value: "11:00–20:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> Yunessun is the swimsuit area and Mori no Yu the onsen area; the Passport
          covers both. Check which price day (A, B or C) you are visiting on, and bring a swimsuit or rent one at
          the gate from ¥1,200.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Yunessun?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Which price applies depends on the date: A days are the cheapest and C days the busiest. Adults are
              junior high school age and up; children are age 3 to elementary school. Seniors 65+ and visitors with
              a disability certificate pay less with ID.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (A / B / C)", "Child (A / B / C)"],
            rows: [
              ["Passport (Yunessun + Mori no Yu)", "¥3,500 / ¥3,700 / ¥4,000", "¥1,800 / ¥1,900 / ¥2,000"],
              ["Yunessun (swimsuit area)", "¥2,500 / ¥2,800 / ¥3,000", "¥1,400 / ¥1,500 / ¥1,700"],
              ["Mori no Yu (onsen area)", "¥1,500 / ¥1,700 / ¥1,800", "¥1,000 / ¥1,100 / ¥1,200"],
            ],
            note: (
              <>
                Yunessun prices, tax included, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>{" "}
                (with the date calendar). Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours",
          title: "What are Yunessun's opening hours?",
          body: null,
          table: {
            head: ["Area", "Hours", "Last entry"],
            rows: [
              ["Yunessun (weekdays)", "10:00–18:00", "17:00"],
              ["Yunessun (weekends and holidays)", "9:00–19:00", "18:00"],
              ["Mori no Yu (every day)", "11:00–20:00", "19:30"],
            ],
            note: <>Yunessun opening hours, checked {CHECKED}. Hours may be extended in busy seasons and can change.</>,
          },
          ctas: [{ href: yunessunTicket.url, label: "Book Yunessun on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Hakone",
        intro: "Yunessun is at Kowakien in Hakone. These cover the rest of a Hakone day.",
        tours: [hakoneFreepass, hakoneOpenAirMuseumTicket, fujiHakonePass],
      }}
      links={
        <p className={styles.bodyText}>
          For getting around, see the{" "}
          <Link href="/guides/attractions/hakone-free-pass" style={linkStyle}>Hakone Free Pass guide</Link>. To build the
          day, see the{" "}
          <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>Hakone day trip from Tokyo</Link>{" "}
          and the <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>Hakone 2-day itinerary</Link>.
          Staying the night? See{" "}
          <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>Hakone ryokan with a private onsen</Link>.
          {" "}One stop below Gora on the Tozan Train, the <Link href="/guides/attractions/hakone-open-air-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Hakone Open-Air Museum</Link> is open 9:00–17:00 every day.
          {" "}Nearby in Sengokuhara, the <Link href="/guides/attractions/hakone-glass-forest-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Hakone Glass Forest</Link> is ¥1,800 for adults, open 10:00–17:30.
        </p>
      }
      faq={[
        {
          q: "How much is Yunessun?",
          a: `For adults, the Passport (Yunessun + Mori no Yu) is ¥3,500–¥4,000, Yunessun only ¥2,500–¥3,000 and Mori no Yu only ¥1,500–¥1,800, depending on the date. Yunessun, checked ${CHECKED}.`,
        },
        {
          q: "What is the difference between Yunessun and Mori no Yu?",
          a: "Yunessun is the swimsuit area; Mori no Yu is the hot-spring (onsen) area. Each has its own ticket and hours, and the Passport covers both.",
        },
        {
          q: "What time does Yunessun open?",
          a: "10:00–18:00 on weekdays and 9:00–19:00 on weekends and holidays, with last entry an hour before closing. Mori no Yu is open 11:00–20:00.",
        },
        {
          q: "Can I rent a swimsuit at Yunessun?",
          a: "Yes. The ukiuki shop by the 4th-floor gate rents swimsuits from ¥1,200 for adults and ¥700 for children; towels are ¥150–¥250. You can also bring your own.",
        },
        {
          q: "Can I buy Yunessun tickets on Klook?",
          a: "Yes. Klook sells a one-day Yunessun ticket; Yunessun also sells its own advance tickets online.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakone-free-pass", title: "Hakone Free Pass" },
        { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip from Tokyo" },
        { href: "/guides/attractions/hakone-2-day-itinerary", title: "Hakone 2-Day Itinerary" },
        { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "Hakone Ryokan with Private Onsen" },
      ]}
      banner={{
        title: "A spa day in Hakone",
        desc: "A one-day ticket to Hakone Kowakien Yunessun.",
        label: "View Yunessun tickets →",
      }}
    />
  );
}
