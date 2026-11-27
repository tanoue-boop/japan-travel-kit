import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kumanoShirahamaTwoDayTour, kumanoNachiHayatamaTour } from "../../../lib/klook-links";
import { adventureWorldTicket, iseKumanoWakayamaAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from Adventure World's
// own English page, read by node fetch on 28 Nov 2026: aws-s.com/en (1-Day Pass adult 18+
// 5,300 yen, senior 65+ 4,800, junior = junior and senior high school 4,300, child =
// elementary school / age 4+ 3,300; prices may change without notice; that day's hours
// 10:00-17:00; operating and closed days on the schedule calendar; access from Osaka:
// JR Tennoji by Kisei Main Line limited express about 2 h, express bus from Namba OCAT or
// Osaka Station about 3 h 30 min, car via Hanwa Expressway about 2 h from Matsubara JCT).
// No Klook price is printed (Klook answers automated reads with 403).
const ROUTE = "/guides/attractions/adventure-world-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.aws-s.com/en/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function AdventureWorldTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Adventure World Tickets"
      title="Adventure World Tickets 2026: Shirahama Price & Hours"
      description="Adventure World in Shirahama, Wakayama: 1-Day Pass ¥5,300 for adults, ¥3,300 for children. Opening hours, closed days and getting there from Osaka."
      h1={<>Adventure World Tickets 2026: <br />Shirahama Price, Hours &amp; Access</>}
      subtitle="The zoo, aquarium and amusement park in Shirahama, Wakayama: ticket prices by age, opening hours and the trip from Osaka."
      badges={[`Checked ${CHECKED}`, "¥5,300 adult", "Wakayama"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            An Adventure World <strong>1-Day Pass is ¥5,300 for adults</strong> (18 and over), ¥4,300 for junior
            and senior high school students, ¥3,300 for children (elementary school, age 4 and up) and ¥4,800 for
            seniors 65 and over. The park in Shirahama, Wakayama, is a zoo, an aquarium and an amusement park in
            one.
          </p>
          <p className={styles.bodyText}>
            Opening hours change by date — on 28 November 2026 the park was open <strong>10:00–17:00</strong> — and
            closed days are marked on the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener" style={linkStyle}>official schedule</a>. From Osaka it is
            about 2 hours by limited express from JR Tennoji. Klook sells the admission ticket. Adventure World,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: adventureWorldTicket.url, label: "Check Adventure World tickets on Klook →" }}
      stats={[
        { label: "Adult (18+)", value: "¥5,300" },
        { label: "Junior / child", value: "¥4,300 / ¥3,300" },
        { label: "Senior (65+)", value: "¥4,800" },
        { label: "From JR Tennoji", value: "About 2 h" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> allow a full day — it is about 2 hours each way from Osaka by limited express.
          Check the calendar before you book: the park closes on set days and the hours change through the year.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Adventure World?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The park also sells a 2-day pass, an annual pass and group tickets; see the official site for those.
            </p>
          ),
          table: {
            head: ["1-Day Pass", "Price"],
            rows: [
              ["Adult (18 and over)", "¥5,300"],
              ["Senior (65 and over)", "¥4,800"],
              ["Junior (junior and senior high school)", "¥4,300"],
              ["Child (elementary school, age 4 and up)", "¥3,300"],
            ],
            note: (
              <>
                Adventure World ticket prices, checked {CHECKED}; the park notes they may change without notice.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "How do you get to Adventure World from Osaka?",
          body: null,
          table: {
            head: ["From Osaka", "Time"],
            rows: [
              ["Limited express on the JR Kisei Main Line from Tennoji", "About 2 hours"],
              ["Express bus from Namba OCAT or Osaka Station", "About 3 hours 30 minutes"],
              ["Car via the Hanwa Expressway from Matsubara JCT", "About 2 hours"],
            ],
            note: <>Adventure World access information, checked {CHECKED}.</>,
          },
          ctas: [{ href: adventureWorldTicket.url, label: "Book Adventure World on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: southern Wakayama",
        intro: "Shirahama is on the way to the Kumano shrines and Nachi Falls.",
        tours: [iseKumanoWakayamaAreaPass, kumanoShirahamaTwoDayTour, kumanoNachiHayatamaTour],
      }}
      links={
        <p className={styles.bodyText}>
          To combine Shirahama with Kumano, see the{" "}
          <Link href="/guides/attractions/kumano-kodo-tour" style={linkStyle}>Kumano Kodo tour guide</Link> and the{" "}
          <Link href="/guides/transport/ise-kumano-wakayama-area-pass" style={linkStyle}>Ise-Kumano-Wakayama Area Pass</Link>,
          which covers the JR line to Shirahama. For the rest of Kansai, see{" "}
          <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link> and the{" "}
          <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>Kansai 5-day itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Adventure World?",
          a: `A 1-Day Pass is ¥5,300 for adults, ¥4,300 for junior and senior high school students, ¥3,300 for children aged 4 and up in elementary school, and ¥4,800 for seniors. Adventure World, checked ${CHECKED}.`,
        },
        {
          q: "What are Adventure World's opening hours?",
          a: "They change by date; on 28 November 2026 the park opened 10:00–17:00. Check the official schedule for your day, including closed days.",
        },
        {
          q: "How long does it take to get from Osaka to Adventure World?",
          a: "About 2 hours by limited express on the JR Kisei Main Line from Tennoji, or about 3 hours 30 minutes by express bus from Namba OCAT or Osaka Station.",
        },
        {
          q: "Who pays the child price?",
          a: "Elementary school children aged 4 and up pay ¥3,300. Junior and senior high school students pay the ¥4,300 junior price.",
        },
        {
          q: "Can I buy Adventure World tickets on Klook?",
          a: "Yes. Klook sells an Adventure World admission ticket; the park also has its own official online ticket store.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kumano-kodo-tour", title: "Kumano Kodo Tour" },
        { href: "/guides/transport/ise-kumano-wakayama-area-pass", title: "Ise-Kumano-Wakayama Area Pass" },
        { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
        { href: "/guides/attractions/kansai-5-day-itinerary", title: "Kansai 5-Day Itinerary" },
      ]}
      banner={{
        title: "A day at Adventure World",
        desc: "One-day admission to the zoo, aquarium and park in Shirahama.",
        label: "View Adventure World tickets →",
      }}
    />
  );
}
