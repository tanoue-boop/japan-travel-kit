import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { osakaCastleTicket } from "../../../lib/klook-links";
import { kidsPlazaOsakaTicket, spaWorldTicket, hirakataParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from Kids Plaza Osaka's own site, read by node fetch on 28 Nov 2026:
// kidsplaza.or.jp/info/ (adult 16+ 1,500 yen, child 6-15 800, infant 3-5 500, 0-2 free; 65+ 700; weekday
// afternoon "Niji kara" ticket from 14:00 1,000 / 500 / 300 on listed weekdays incl. 25 Aug - 18 Dec 2026 and
// 8 Jan - 12 Mar 2027; 9:30-17:00, last entry 16:15, tickets until 45 minutes before closing; same-day re-entry
// from the 3rd-floor exit; closed 2nd and 3rd Mondays (next day if a holiday; 4th Monday in August) and 28 Dec -
// 2 Jan; Osaka Metro Sakaisuji Line Ogimachi Station exit 2, about 3 minutes from JR Tenma; no parking).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/kids-plaza-osaka-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kidsplaza.or.jp/info/";
const HOURS = "https://www.kidsplaza.or.jp/info/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KidsPlazaOsakaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kids Plaza Osaka"
      title="Kids Plaza Osaka Tickets 2026: Price, Hours & Closed Days"
      description="Kids Plaza Osaka: ¥1,500 for adults, ¥800 for ages 6–15, ¥500 for ages 3–5, under 3 free. Open 9:30–17:00; closed 2nd and 3rd Mondays; at Ogimachi Station."
      h1={<>Kids Plaza Osaka Tickets 2026: <br />Price, Hours &amp; Closed Days</>}
      subtitle="The hands-on children’s museum at Ogimachi in Osaka: what entry costs, the cheaper weekday afternoon ticket, closed days and the station."
      badges={[`Checked ${CHECKED}`, "¥1,500 adult", "Ogimachi Station"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Kids Plaza Osaka is <strong>¥1,500 for adults</strong> (16 and over), ¥800 for children aged 6 to 15 and
            ¥500 for ages 3 to 5; under-3s are free. On many weekdays a ticket from 14:00 is ¥1,000 / ¥500 / ¥300.
          </p>
          <p className={styles.bodyText}>
            It opens 9:30–17:00 (last entry 16:15) and is closed on the second and third Mondays of the month and from
            28 December to 2 January. It is at exit 2 of Ogimachi Station on the Osaka Metro Sakaisuji Line. Klook
            sells admission tickets. Kids Plaza Osaka, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kidsPlazaOsakaTicket.url, label: "Check Kids Plaza Osaka tickets on Klook →" }}
      stats={[
        { label: "Adult (16+)", value: "¥1,500" },
        { label: "Child (6–15)", value: "¥800" },
        { label: "Age 3–5", value: "¥500" },
        { label: "Hours", value: "9:30–17:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> with young children, go on a weekday afternoon for the ¥1,000 adult ticket, or in the
          morning if you want the tube slider, which runs 10:00–14:00 on weekdays.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The weekday afternoon ticket (sold 14:00–16:15 on the day only) is offered on listed weekdays, including
              25 August to 18 December 2026 and 8 January to 12 March 2027. Visitors aged 65+ pay ¥700. You can re-enter
              on the same day through the 3rd-floor exit with your ticket.
            </p>
          ),
          table: {
            head: ["Ticket", "Regular", "Weekday from 14:00"],
            rows: [
              ["Adult (16+)", "¥1,500", "¥1,000"],
              ["Child (6–15)", "¥800", "¥500"],
              ["Infant (3–5)", "¥500", "¥300"],
              ["Age 0–2", "Free", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells admission at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Kids Plaza Osaka opens 9:30–17:00; last entry is 16:15 and tickets are sold until 45 minutes before closing.
              It is closed on the second and third Mondays (the next day if the Monday is a holiday; the fourth Monday in
              August) and from 28 December to 2 January. In December 2026 that means 14 and 21 December and the year-end
              break. The museum is at exit 2 of Ogimachi Station (Osaka Metro Sakaisuji Line) and about 3 minutes on foot
              west of JR Tenma Station. There is no parking.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kidsPlazaOsakaTicket.url, label: "Book Kids Plaza Osaka on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Osaka with children",
        intro: "Osaka Castle is a short subway ride away, Spa World is in Shinsekai, and Hirakata Park is on the Keihan line.",
        tours: [osakaCastleTicket, spaWorldTicket, hirakataParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For a family trip, see the <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>Osaka 2-day itinerary</Link>,
          <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link> and
          <Link href="/guides/attractions/osaka-castle-tickets" style={linkStyle}>Osaka Castle tickets</Link>. For rides, see
          <Link href="/guides/attractions/hirakata-park-tickets" style={linkStyle}>Hirakata Park</Link>.
          {" "}For another indoor day, <Link href="/guides/attractions/legoland-discovery-center-osaka-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>LEGOLAND Discovery Center Osaka</Link> at Tempozan has dated tickets from ¥2,900 for everyone aged 3 and over.
        </p>
      }
      faq={[
        {
          q: "How much is Kids Plaza Osaka?",
          a: `¥1,500 for adults (16+), ¥800 for ages 6–15, ¥500 for ages 3–5, and free for under-3s. Checked ${CHECKED}.`,
        },
        {
          q: "Is there a cheaper ticket?",
          a: "Yes. On listed weekdays a ticket sold from 14:00 is ¥1,000 for adults, ¥500 for children and ¥300 for infants.",
        },
        {
          q: "What are the opening hours?",
          a: "9:30–17:00, with last entry at 16:15.",
        },
        {
          q: "When is Kids Plaza Osaka closed?",
          a: "On the second and third Mondays of the month (the next day if a holiday) and from 28 December to 2 January.",
        },
        {
          q: "How do I get there?",
          a: "It is at exit 2 of Ogimachi Station on the Osaka Metro Sakaisuji Line, about 3 minutes on foot from JR Tenma Station.",
        },
      ]}
      related={[
        { href: "/guides/attractions/osaka-2-day-itinerary", title: "Osaka 2-Day Itinerary" },
        { href: "/guides/attractions/hirakata-park-tickets", title: "Hirakata Park Tickets" },
        { href: "/guides/attractions/osaka-castle-tickets", title: "Osaka Castle Tickets" },
        { href: "/guides/attractions/nifrel-osaka-tickets", title: "NIFREL Osaka Tickets" },
      ]}
      banner={{
        title: "A museum made for children",
        desc: "Admission to Kids Plaza Osaka.",
        label: "View Kids Plaza tickets →",
      }}
    />
  );
}
