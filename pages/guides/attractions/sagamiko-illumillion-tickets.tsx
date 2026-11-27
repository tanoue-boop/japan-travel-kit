import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { keioMtTakaoTicket, fujiQHighlandAdmission } from "../../../lib/klook-links";
import { sagamikoMoriMoriTicket, mtFujiPanoramicRopewayTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from Sagamiko MORI MORI's own site (Fujikyu), read by node fetch on 28 Nov 2026:
// sagamiko-resort.jp/illumillion/summary/ (season 14 Nov 2026 - 9 May 2027, weekends and holidays only from
// 5 Apr; entry B 2,000 / C 2,400 yen adult, 1,300 / 1,700 child and senior; Free Pass 4,700 / 3,700; Night Free
// Pass from 14:00 3,000 / 3,400 adult; day visitors see the lights at no extra charge; lights from 16:00;
// rainbow lift free from 16:00; about 20 of 30 rides end at 16:00), /calender/2026-12.html (December:
// 10:00-16:00 and 16:00-20:30 on B days, 16:00-21:00 on C days; some Wednesdays and Thursdays illumination
// only from 16:00) and /illumillion/access/ (JR Sagamiko Station, Kanachu bus for Mikagi, about 8 minutes;
// name changed from Sagamiko Pleasure Forest in 2024). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/sagamiko-illumillion-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.sagamiko-resort.jp/illumillion/summary/index.html";
const HOURS = "https://www.sagamiko-resort.jp/calender/2026-12.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SagamikoIllumillionTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Sagamiko Illumillion"
      title="Sagamiko Illumillion 2026-27: Tickets, Hours & Access"
      description="Sagamiko Illumillion runs to 9 May 2027: entry ¥2,000–2,400 for adults, Free Pass ¥4,700. Lights from 16:00, to 20:30 or 21:00 in December; bus access."
      h1={<>Sagamiko Illumillion 2026-27: <br />Tickets, Hours &amp; Access</>}
      subtitle="The winter light show at Sagamiko MORI MORI, the hillside park in western Kanagawa: ticket prices, December hours, and the train and bus from Tokyo."
      badges={[`Checked ${CHECKED}`, "¥2,000 entry", "Lights from 16:00"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Illumillion is included in entry to <strong>Sagamiko MORI MORI</strong> (the park formerly called
            Sagamiko Pleasure Forest): <strong>¥2,000 for adults</strong> on ordinary days and ¥2,400 on high-season
            days; children and seniors pay ¥1,300 / ¥1,700. The Free Pass with unlimited rides is ¥4,700.
          </p>
          <p className={styles.bodyText}>
            The season runs from 14 November 2026 to 9 May 2027. The lights come on from 16:00; in December the
            park stays open to 20:30, or 21:00 at weekends and from 24 December. The nearest station is JR Sagamiko
            on the Chuo Line. Klook sells admission tickets. Sagamiko MORI MORI, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: sagamikoMoriMoriTicket.url, label: "Check Sagamiko tickets on Klook →" }}
      stats={[
        { label: "Entry (adult)", value: "¥2,000–2,400" },
        { label: "Free Pass", value: "¥4,700" },
        { label: "Lights", value: "from 16:00" },
        { label: "Season ends", value: "9 May 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go after 14:00 with a Night Free Pass if you want rides as well, or simply buy entry
          and arrive around 16:00 for the lights. Most rides stop at 16:00.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Blue days on the park calendar are ordinary (B) prices, red days are high season (C). If you enter in
              the daytime you can stay for the Illumillion at no extra charge, and the rainbow lift is free from
              16:00. Adults are junior high school age and over; children are 3 to elementary age; seniors are 65+.
            </p>
          ),
          table: {
            head: ["Ticket", "Ordinary (B)", "High season (C)"],
            rows: [
              ["Entry, adult", "¥2,000", "¥2,400"],
              ["Entry, child / senior", "¥1,300", "¥1,700"],
              ["Free Pass, adult", "¥4,700", "¥4,700"],
              ["Night Free Pass (from 14:00), adult", "¥3,000", "¥3,400"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells admission at its own price; check which ticket type the option includes.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When are the lights on and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              In December 2026 the park opens 10:00–16:00 and the Illumillion runs 16:00–20:30, or to 21:00 on
              weekends and from 24 to 31 December. On some Wednesdays and Thursdays (for example 9 and 10 December)
              only the illumination opens, from 16:00. About 20 of the 30 rides close at 16:00, and the lights run in
              the rain. From 5 April 2027 the park opens on weekends and holidays only. From JR Sagamiko Station, the
              Kanachu bus for Mikagi takes about 8 minutes to Sagamiko MORI MORI-mae. Parking is ¥1,000–2,000.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: sagamikoMoriMoriTicket.url, label: "Book Sagamiko MORI MORI on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Mt. Takao or Mt. Fuji on the Chuo Line",
        intro: "Sagamiko is on the JR Chuo Line between Takao and Otsuki, so a morning hike or the Fuji Five Lakes fits before the lights.",
        tours: [keioMtTakaoTicket, fujiQHighlandAdmission, mtFujiPanoramicRopewayTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of a winter trip, see the <Link href="/guides/attractions/tokyo-illumination-tours" style={linkStyle}>Tokyo illumination tours</Link>, the
          <Link href="/guides/attractions/mt-takao-day-trip" style={linkStyle}>Mt. Takao day trip</Link> on the same line and the
          <Link href="/guides/attractions/japan-winter-itinerary" style={linkStyle}>Japan winter itinerary</Link>. For another light show near
          Nagoya, see <Link href="/guides/attractions/nabana-no-sato-illumination-tickets" style={linkStyle}>Nabana no Sato</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Sagamiko Illumillion?",
          a: `Entry to Sagamiko MORI MORI, which includes the Illumillion, is ¥2,000 for adults on ordinary days and ¥2,400 on high-season days. The Free Pass with rides is ¥4,700. Checked ${CHECKED}.`,
        },
        {
          q: "What time do the lights come on?",
          a: "From 16:00, adjusted to sunset. In December 2026 the park closes at 20:30, or 21:00 on weekends and from 24 to 31 December.",
        },
        {
          q: "When does the 2026-27 Illumillion end?",
          a: "On 9 May 2027. From 5 April 2027 the park opens on weekends and holidays only.",
        },
        {
          q: "How do I get to Sagamiko from Tokyo?",
          a: "Take the JR Chuo Line to Sagamiko Station, then the Kanachu bus for Mikagi, about 8 minutes, to Sagamiko MORI MORI-mae.",
        },
        {
          q: "Is it the same place as Sagamiko Pleasure Forest?",
          a: "Yes. The park changed its name to Sagamiko MORI MORI in 2024; the location did not change.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-illumination-tours", title: "Tokyo Illumination Tours" },
        { href: "/guides/attractions/mt-takao-day-trip", title: "Mt. Takao Day Trip" },
        { href: "/guides/attractions/fuji-q-highland-tickets", title: "Fuji-Q Highland Tickets" },
        { href: "/guides/attractions/nabana-no-sato-illumination-tickets", title: "Nabana no Sato Illumination" },
      ]}
      banner={{
        title: "Lights on the hill at Lake Sagami",
        desc: "Admission to Sagamiko MORI MORI.",
        label: "View Sagamiko tickets →",
      }}
    />
  );
}
