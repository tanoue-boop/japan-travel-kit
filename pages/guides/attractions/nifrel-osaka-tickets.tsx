import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { osakaWalkingFoodTour, dotonboriNaniwaSightseeingBoat } from "../../../lib/klook-links";
import { nifrelTicket, spaWorldTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from NIFREL's own site,
// read by node fetch on 28 Nov 2026: nifrel.jp/guide/admission.html (adult, high school /
// 16+, 2,400 yen; child, elementary and junior high, 1,200; age 3+ 700; 2 and under free;
// same-day re-entry allowed, enter at least 1 hour before closing; web tickets from 30 days
// before), /guide/open.html plus the calendar API it reads (api.kaiyukan.com business_hours:
// December 2026 weekdays 10:00-18:00, last entry 17:00; 5-6, 12-13, 28-30 Dec 9:30-19:00,
// last entry 18:00; 19-20 and 24-27 Dec 9:30-20:00, with the after-hours event "Yoru ni
// fureru" 17:00-20:00 needing its own web ticket; January 2027 closed 19-20 Jan) and
// /guide/access.html (Osaka Monorail Bampaku-kinen-koen Station; free weekday shuttle from
// JR Ibaraki, Hankyu Kita-Senri and Minami-Senri for Mitsui Shopping Park members).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/nifrel-osaka-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.nifrel.jp/guide/admission.html";
const HOURS = "https://www.nifrel.jp/guide/open.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NifrelOsakaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="NIFREL Tickets"
      title="NIFREL Osaka Tickets 2026: Price, Hours & Access"
      description="NIFREL at Expocity is ¥2,400 for adults, ¥1,200 for children and ¥700 for age 3+. Open 10:00–18:00 on December weekdays, later at weekends; access."
      h1={<>NIFREL Osaka Tickets 2026: <br />Price, Hours &amp; Access</>}
      subtitle="The Kaiyukan's 'living museum' at Expocity in Suita: ticket prices, December and January hours, the evening event and the monorail."
      badges={[`Checked ${CHECKED}`, "¥2,400 adult", "Expocity, Suita"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A NIFREL ticket is <strong>¥2,400 for adults</strong> (high school / 16 and over), ¥1,200 for
            elementary and junior high pupils and ¥700 for children aged 3 and over; under-3s are free. Same-day
            re-entry is allowed.
          </p>
          <p className={styles.bodyText}>
            In December 2026 it opens <strong>10:00–18:00 on weekdays</strong> (last entry 17:00) and 9:30–19:00 on
            most weekends. The nearest station is Bampaku-kinen-koen on the Osaka Monorail. Klook sells an
            e-ticket. NIFREL, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nifrelTicket.url, label: "Check NIFREL tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,400" },
        { label: "Elementary–junior high", value: "¥1,200" },
        { label: "Weekdays (Dec)", value: "10:00–18:00" },
        { label: "Closed", value: "19–20 Jan 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> plan on a weekday morning and arrive by 17:00. On 19–20 and 24–27 December the
          evening after 17:00 is a separate ticketed event.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is NIFREL?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              With a disability certificate, the holder and one companion pay half. Web tickets go on sale 30 days
              before the date. Re-entry the same day is allowed; enter at least one hour before closing.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (high school / 16+)", "¥2,400"],
              ["Child (elementary & junior high)", "¥1,200"],
              ["Infant (3+)", "¥700"],
              ["Age 2 and under", "Free"],
            ],
            note: (
              <>
                NIFREL prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells an e-ticket at its own price; scan the QR code at the gate.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              December 2026: weekdays 10:00–18:00 (last entry 17:00); 5–6, 12–13 and 28–30 December 9:30–19:00; 19–20
              and 24–27 December 9:30–20:00, but from 17:00 only with the separate &quot;Yoru ni fureru&quot; web
              ticket. January 2027: 10:00–18:00 or 9:30–19:00 by date, closed 19–20 January. The nearest station is
              Bampaku-kinen-koen on the Osaka Monorail.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Daily calendar</a>.
            </p>
          ),
          ctas: [{ href: nifrelTicket.url, label: "Book NIFREL on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: back in central Osaka",
        intro: "NIFREL takes a morning; the monorail and Midosuji line bring you back to Namba or Shinsekai for the evening.",
        tours: [osakaWalkingFoodTour, dotonboriNaniwaSightseeingBoat, spaWorldTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see{" "}
          <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link>, the{" "}
          <Link href="/guides/attractions/osaka-3-day-itinerary" style={linkStyle}>Osaka 3-day itinerary</Link> and{" "}
          <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" style={linkStyle}>Kaiyukan tickets</Link>{" "}
          for NIFREL&apos;s sister aquarium by the bay. For the evening, see the{" "}
          <Link href="/guides/attractions/dotonbori-river-cruise" style={linkStyle}>Dotonbori river cruise</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is NIFREL?",
          a: `¥2,400 for adults (16 and over), ¥1,200 for elementary and junior high pupils and ¥700 for children aged 3 and over. Checked ${CHECKED}.`,
        },
        {
          q: "What are NIFREL's opening hours?",
          a: "In December 2026, 10:00–18:00 on weekdays (last entry 17:00) and 9:30–19:00 on most weekends; check the daily calendar for each date.",
        },
        {
          q: "Is NIFREL closed in January?",
          a: "It is closed on 19 and 20 January 2027.",
        },
        {
          q: "How do I get to NIFREL?",
          a: "Take the Osaka Monorail to Bampaku-kinen-koen Station, the nearest station. On weekdays a free shuttle runs from JR Ibaraki and Hankyu Kita-Senri and Minami-Senri for Mitsui Shopping Park members.",
        },
        {
          q: "Can I buy NIFREL tickets on Klook?",
          a: "Yes. Klook sells an e-ticket; you scan the QR code at the gate without exchanging it.",
        },
      ]}
      related={[
        { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
        { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "Osaka Aquarium Kaiyukan Tickets" },
        { href: "/guides/attractions/osaka-3-day-itinerary", title: "Osaka 3-Day Itinerary" },
        { href: "/guides/attractions/spa-world-osaka-tickets", title: "Spa World Osaka" },
      ]}
      banner={{
        title: "A living museum at Expocity",
        desc: "Admission to NIFREL, Suita.",
        label: "View NIFREL tickets →",
      }}
    />
  );
}
