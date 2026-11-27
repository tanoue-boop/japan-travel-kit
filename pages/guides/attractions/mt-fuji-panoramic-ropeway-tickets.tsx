import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { fujiQHighlandAdmission } from "../../../lib/klook-links";
import { mtFujiPanoramicRopewayTicket, kawaguchikoMusicForestTicket, mtFujiMultiAttractionPass } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from the Mt. Fuji Panoramic Ropeway's own site, read by node fetch on 28 Nov 2026:
// mtfujiropeway.jp/guide/ (fares from 1 Nov 2026: round trip adult 1,200 yen, child 600; one way 800 / 400;
// 3 minutes to the 1,075 m summit deck; Ropeway & Cruise set 1,700, Kawaguchiko loop pass 3,300, both 2 days;
// hours vary by season and are posted on the top page), the top page (annual inspection closure 7 Dec - 17 Dec
// 2026 in the notice text, "to 18 Dec" in the banner; snow and ice may delay opening) and /access/ (from
// Kawaguchiko Station on foot or by loop bus, about 15 min). The site gives no fixed hours, so none are printed.
const ROUTE = "/guides/attractions/mt-fuji-panoramic-ropeway-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.mtfujiropeway.jp/guide/index.html";
const HOURS = "https://www.mtfujiropeway.jp/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MtFujiPanoramicRopewayTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Mt. Fuji Panoramic Ropeway"
      title="Mt. Fuji Panoramic Ropeway 2026: Price, Closure & Access"
      description="Mt. Fuji Panoramic Ropeway at Lake Kawaguchi: ¥1,200 return, ¥800 one way for adults from 1 Nov 2026. Closed 7–17 Dec 2026 for inspection; access."
      h1={<>Mt. Fuji Panoramic Ropeway 2026: <br />Price, Closure &amp; Access</>}
      subtitle="The Kachi Kachi Yama ropeway on Lake Kawaguchi: the new fares, the December inspection closure, the set tickets and the way from Kawaguchiko Station."
      badges={[`Checked ${CHECKED}`, "¥1,200 return", "Lake Kawaguchi"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Mt. Fuji Panoramic Ropeway costs <strong>¥1,200 return for adults</strong> and ¥600 for children, or ¥800 /
            ¥400 one way (fares from 1 November 2026). The ride takes 3 minutes to the observation deck at 1,075 m on
            Mt. Tenjo (Kachi Kachi Yama).
          </p>
          <p className={styles.bodyText}>
            It is <strong>closed for its annual inspection from 7 December 2026</strong> to 17 December (one notice says
            the 18th). Hours change with the season and are posted on the official site. Klook sells a return ticket.
            Mt. Fuji Panoramic Ropeway, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: mtFujiPanoramicRopewayTicket.url, label: "Check ropeway tickets on Klook →" }}
      stats={[
        { label: "Return (adult)", value: "¥1,200" },
        { label: "One way (adult)", value: "¥800" },
        { label: "Ride", value: "3 minutes" },
        { label: "Closed", value: "7–17 Dec 2026" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go on a clear morning outside 7–17 December; check the official top page for that
          day&apos;s hours and for snow or wind stoppages.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult fares are for junior high school age and over; child fares for elementary pupils. Small and
              medium dogs ride for ¥600 return. The ropeway also sells set tickets with the Lake Kawaguchi boats.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Child"],
            rows: [
              ["Return", "¥1,200", "¥600"],
              ["One way", "¥800", "¥400"],
              ["Ropeway & Cruise set (2 days)", "¥1,700", "¥850"],
              ["Kawaguchiko loop pass with buses (2 days)", "¥3,300", "¥1,650"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Fares from 1 November 2026. Klook sells a return ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "Closures and how to get there",
          body: (
            <p className={styles.bodyText}>
              The ropeway closes for its annual inspection and equipment work from 7 December 2026 for about 11 days, to 17
              December (the site&apos;s banner says the 18th). Opening hours change with the season and are listed on the
              official top page; after snow or frost, opening may be delayed, and strong wind or lightning can stop it.
              From Kawaguchiko Station it is about 15 minutes on foot or by the loop bus; the boat pier is a short walk
              from the base station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: mtFujiPanoramicRopewayTicket.url, label: "Book the ropeway on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: around Lake Kawaguchi",
        intro: "The music-box museum is on the Kawaguchiko loop bus route, and Fuji-Q Highland is also in the Fuji Five Lakes area.",
        tours: [kawaguchikoMusicForestTicket, fujiQHighlandAdmission, mtFujiMultiAttractionPass],
      }}
      links={
        <p className={styles.bodyText}>
          To plan the day, see the <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={linkStyle}>Kawaguchiko day trip from Tokyo</Link>,
          the <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>Mt. Fuji day trip from Tokyo</Link> and the
          <Link href="/guides/transport/mt-fuji-pass" style={linkStyle}>Mt. Fuji Pass</Link>. For rides nearby, see
          <Link href="/guides/attractions/fuji-q-highland-tickets" style={linkStyle}>Fuji-Q Highland tickets</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Mt. Fuji Panoramic Ropeway?",
          a: `¥1,200 return for adults and ¥600 for children; one way is ¥800 / ¥400. These fares started on 1 November 2026. Checked ${CHECKED}.`,
        },
        {
          q: "Is the ropeway closed in December?",
          a: "Yes, for its annual inspection from 7 December 2026 to 17 December (one notice on the site says the 18th).",
        },
        {
          q: "What are the opening hours?",
          a: "They change with the season; the official top page lists the current hours. Snow or frost can delay opening.",
        },
        {
          q: "How long is the ride?",
          a: "About 3 minutes to the observation deck at 1,075 m on Mt. Tenjo.",
        },
        {
          q: "How do I get there from Kawaguchiko Station?",
          a: "About 15 minutes on foot or by the Kawaguchiko loop bus.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "Kawaguchiko Day Trip" },
        { href: "/guides/attractions/fuji-q-highland-tickets", title: "Fuji-Q Highland Tickets" },
        { href: "/guides/transport/mt-fuji-pass", title: "Mt. Fuji Pass" },
        { href: "/guides/attractions/kawaguchiko-music-forest-museum-tickets", title: "Kawaguchiko Music Forest Museum" },
      ]}
      banner={{
        title: "Mt. Fuji from Kachi Kachi Yama",
        desc: "Return ride on the Panoramic Ropeway.",
        label: "View ropeway tickets →",
      }}
    />
  );
}
