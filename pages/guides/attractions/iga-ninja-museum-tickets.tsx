import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kintetsuRailPass, kyotoUjiNaraDayTour } from "../../../lib/klook-links";
import { igaNinjaMuseumTicket, mikimotoPearlIslandTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from the Ninja Museum of Igaryu's own site (Igaueno Tourist Association), read by node
// fetch on 28 Nov 2026: iganinja.jp/en/ (adult over 16 1,000 yen, child 4-15 700, bracket prices 900 / 600 not
// labelled so not printed; ninja show 600 yen, closed some days; shuriken 300 yen for 6 throws; weekdays
// 10:00-16:00, entry to 15:30; weekends and holidays 10:00-16:30, entry to 16:00; closed 29 Dec - 1 Jan) and
// /access/index.html (Iga Railway Uenoshi Station, Ueno Park next to it; from Osaka Namba by Kintetsu to Iga-Kambe,
// then Iga Railway; few JR trains). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/iga-ninja-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.iganinja.jp/en/";
const HOURS = "https://www.iganinja.jp/access/index.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function IgaNinjaMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Iga Ninja Museum"
      title="Iga Ninja Museum Tickets 2026: Price, Show & Hours"
      description="Ninja Museum of Igaryu in Iga, Mie: ¥1,000 for adults, ¥700 for children 4–15; ninja show ¥600, shuriken ¥300. Hours, closed days and the train from Osaka."
      h1={<>Iga Ninja Museum Tickets 2026: <br />Price, Show &amp; Hours</>}
      subtitle="The ninja house and museum in Ueno Park, Iga: what entry, the ninja show and shuriken throwing cost, opening hours and the Kintetsu route."
      badges={[`Checked ${CHECKED}`, "¥1,000 adult", "Iga, Mie"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Entry to the <strong>Ninja Museum of Igaryu</strong> is <strong>¥1,000 for adults</strong> (over 16) and
            ¥700 for children aged 4 to 15. A kunoichi guide shows you the traps in the ninja house. The ninja show is
            ¥600 extra (not every day), and shuriken throwing is ¥300 for six throws.
          </p>
          <p className={styles.bodyText}>
            It opens 10:00–16:00 on weekdays and 10:00–16:30 at weekends and on holidays, and is closed from 29 December
            to 1 January. It is in Ueno Park, near Uenoshi Station on the Iga Railway. Klook sells admission tickets.
            Ninja Museum of Igaryu, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: igaNinjaMuseumTicket.url, label: "Check Iga Ninja Museum tickets on Klook →" }}
      stats={[
        { label: "Adult (16+)", value: "¥1,000" },
        { label: "Child (4–15)", value: "¥700" },
        { label: "Ninja show", value: "¥600" },
        { label: "Weekdays", value: "10:00–16:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> check the show calendar before you go, and leave time for the Kintetsu and Iga
          Railway connection, which is the practical route from Osaka or Nagoya.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices include tax. The ninja show is ¥600 per person and does not run on some days; shuriken throwing is
              ¥300 for six throws. Visitors with a disability certificate pay ¥700 (adult) or ¥500 (child).
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (over 16)", "¥1,000"],
              ["Child (4–15)", "¥700"],
              ["Ninja show", "¥600"],
              ["Shuriken throwing (6 throws)", "¥300"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells admission at its own price; the show and shuriken are paid on site.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Weekdays 10:00–16:00 (last entry 15:30); weekends and holidays 10:00–16:30 (last entry 16:00). Closed from
              29 December to 1 January. From Osaka Namba, take the Kintetsu line to Iga-Kambe and change to the Iga
              Railway for Uenoshi Station; from Nagoya, Kintetsu to Iga-Kambe via Ise-Nakagawa. JR trains to Iga-Ueno
              are infrequent, so check the timetable. The museum is in Ueno Park, close to Uenoshi Station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: igaNinjaMuseumTicket.url, label: "Book the Iga Ninja Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: the Kintetsu line",
        intro: "The change for Iga is Iga-Kambe on the Kintetsu Osaka Line, the same railway that serves Nara and Ise.",
        tours: [kintetsuRailPass, kyotoUjiNaraDayTour, mikimotoPearlIslandTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the region, see the <Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>Kintetsu Rail Pass</Link>, the
          <Link href="/guides/attractions/nara-day-trip" style={linkStyle}>Nara day trip</Link> and the
          <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>Kansai 5-day itinerary</Link>. In Tokyo, see the
          <Link href="/guides/attractions/samurai-ninja-experience-tokyo" style={linkStyle}>samurai and ninja experiences</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Iga Ninja Museum?",
          a: `¥1,000 for adults over 16 and ¥700 for children aged 4 to 15. The ninja show is ¥600 and shuriken throwing ¥300 for six throws. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "Weekdays 10:00–16:00 (last entry 15:30); weekends and holidays 10:00–16:30 (last entry 16:00).",
        },
        {
          q: "Is there a ninja show every day?",
          a: "No. The show does not run on some days; check the museum show calendar before you go.",
        },
        {
          q: "How do I get there from Osaka?",
          a: "Take Kintetsu from Osaka Namba to Iga-Kambe, then the Iga Railway to Uenoshi Station; the museum is in Ueno Park nearby.",
        },
        {
          q: "When is it closed?",
          a: "From 29 December to 1 January.",
        },
      ]}
      related={[
        { href: "/guides/transport/kintetsu-rail-pass", title: "Kintetsu Rail Pass" },
        { href: "/guides/attractions/nara-day-trip", title: "Nara Day Trip" },
        { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "Samurai & Ninja Experiences" },
        { href: "/guides/attractions/kansai-5-day-itinerary", title: "Kansai 5-Day Itinerary" },
      ]}
      banner={{
        title: "Inside a real ninja house",
        desc: "Admission to the Ninja Museum of Igaryu.",
        label: "View Iga ninja tickets →",
      }}
    />
  );
}
