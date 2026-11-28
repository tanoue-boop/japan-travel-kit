import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tsugaikeBusLiftRental, naganoHakubaShuttleBus, hakubaHapponeBusLiftRental } from "../../../lib/klook-links";
import { tsugaikeLiftTicketRental } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Hakuba Tsugaike Mountain Resort's own page, read by node fetch on 28 Nov 2026:
// tsugaike.gr.jp/snow/price (2026-27, window: 1-day adult (junior high and over) 9,800, child (elementary) 7,000,
// senior 60+ 8,000, youth (junior and senior high school, student ID) 8,000; window sales 12 Dec 2026-22 Mar 2027,
// web charge from 1 Dec; 2-day 17,400 / 12,200 / 14,300, consecutive days only; morning or afternoon 7,800 / 5,500
// / 6,400; beginner area 1-day 5,900 / 4,100; first-ski and spring 1-day 8,000 / 5,600 (season start-11 Dec 2026,
// 23 Mar-5 May 2027); early-bird 1-day 6,500 / 4,600 on sale 1 Sep-30 Nov 2026; no night skiing in 2026-27;
// one preschool child free per adult; gondola Eve round trip 5,200 / 2,800). No Klook price (403).
const ROUTE = "/guides/attractions/tsugaike-kogen-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.tsugaike.gr.jp/snow/price";
const HOURS = "https://www.tsugaike.gr.jp/snow/price";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TsugaikeKogenLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Tsugaike lift ticket"
      title="Tsugaike Lift Ticket Prices 2026-27: Day Pass & Early Bird"
      description="Tsugaike Kogen lift ticket 2026-27: ¥9,800 a day for adults, ¥7,000 for elementary pupils, ¥8,000 early and in spring. Early-bird ¥6,500 to 30 Nov."
      h1={<>Tsugaike Lift Ticket Prices 2026-27: <br />Day Pass &amp; Early Bird</>}
      subtitle="What a day at Hakuba Tsugaike costs in 2026-27, the early-bird and spring rates, the beginner ticket, and what is new this season."
      badges={[`Checked ${CHECKED}`, "¥9,800 a day", "No night skiing"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>Tsugaike one-day ticket is ¥9,800 for adults</strong> (junior high school age and over), ¥7,000 for
            elementary school children and ¥8,000 for seniors aged 60 and over and for junior and senior high school
            students with a student ID. The window sells it from 12 December 2026 to 22 March 2027.
          </p>
          <p className={styles.bodyText}>
            From the start of the season to 11 December, and from 23 March to 5 May 2027, the day ticket is ¥8,000 for
            adults. The early-bird day ticket (¥6,500) is on sale only until 30 November 2026. There is no night
            skiing in 2026-27. Klook sells the day ticket with optional gear rental. Tsugaike, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: tsugaikeLiftTicketRental.url, label: "Check the Tsugaike lift ticket on Klook →" }}
      stats={[
        { label: "1 day, adult", value: "¥9,800" },
        { label: "1 day, child", value: "¥7,000" },
        { label: "Early / spring", value: "¥8,000" },
        { label: "Early bird (to 30 Nov)", value: "¥6,500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> if you are booking before 30 November, the early-bird ticket is the cheapest; after
          that, the price is ¥9,800 a day in the main season.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Window prices. Two-day tickets are valid for two consecutive days only. One preschool child rides free with
              each adult. Seniors must show proof of age on the day. Web tickets (top-ups) need an IC card from a
              previous visit, so first-time visitors buy at the window or through a package.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Child (elementary)", "Senior 60+"],
            rows: [
              ["1 day", "¥9,800", "¥7,000", "¥8,000"],
              ["2 days (consecutive)", "¥17,400", "¥12,200", "¥14,300"],
              ["Morning or afternoon", "¥7,800", "¥5,500", "¥6,400"],
              ["Beginner area, 1 day", "¥5,900", "¥4,100", "—"],
              ["1 day, first ski and spring", "¥8,000", "¥5,600", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells the lift ticket, with rental as an option, at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When do the rates apply?",
          body: (
            <p className={styles.bodyText}>
              The first-ski and spring rate applies from the start of the season to 11 December 2026 and from 23 March
              to 5 May 2027. The main-season window sales run from 12 December 2026 to 22 March 2027. The morning ticket
              runs from opening to 13:00 and the afternoon ticket from 12:00 to closing. Night skiing is cancelled for
              the 2026-27 season.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: tsugaikeLiftTicketRental.url, label: "Book the Tsugaike ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Hakuba transfers and other areas",
        intro: "Tsugaike is at the northern end of the Hakuba valley, on the same buses as the other resorts.",
        tours: [tsugaikeBusLiftRental, naganoHakubaShuttleBus, hakubaHapponeBusLiftRental],
      }}
      links={
        <p className={styles.bodyText}>
          For access from Tokyo and the other resorts, see <Link href="/guides/attractions/hakuba-ski-tours" style={linkStyle}>Hakuba ski tours</Link> and the{" "}
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>. For another Nagano resort, see{" "}
          <Link href="/guides/attractions/nozawa-onsen-ski" style={linkStyle}>Nozawa Onsen ski</Link>. Before you go, see{" "}
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Tsugaike lift ticket?",
          a: `A one-day adult ticket is ¥9,800 at the window from 12 Dec 2026 to 22 Mar 2027, and ¥8,000 at the start and end of the season. Checked ${CHECKED}.`,
        },
        {
          q: "Is there an early-bird ticket?",
          a: "Yes. The early-bird one-day ticket is ¥6,500 for adults and ¥4,600 for children, on sale until 30 November 2026.",
        },
        {
          q: "Is there night skiing at Tsugaike?",
          a: "No. Tsugaike says night skiing is cancelled for the 2026-27 season.",
        },
        {
          q: "Do children ski free?",
          a: "One preschool child rides free with each adult. Elementary school children pay ¥7,000 a day.",
        },
        {
          q: "Can I buy online on my first visit?",
          a: "The web tickets are top-ups for an IC card from a previous visit. First-time visitors buy at the window or through a package such as the Klook ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakuba-ski-tours", title: "Hakuba Ski Tours" },
        { href: "/guides/attractions/hakuba-happo-one-lift-ticket", title: "Happo-one Lift Ticket Prices" },
        { href: "/guides/attractions/hakuba-goryu-47-lift-ticket", title: "Hakuba47 & Goryu Lift Ticket Prices" },
        { href: "/guides/attractions/nozawa-onsen-ski", title: "Nozawa Onsen Ski" },
      ]}
      banner={{
        title: "Ski the north of the Hakuba valley",
        desc: "A Tsugaike day ticket, rental optional.",
        label: "View the Tsugaike ticket →",
      }}
    />
  );
}
