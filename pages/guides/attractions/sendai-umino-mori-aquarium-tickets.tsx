import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { zaoGinzanDayTourFromSendai, zaoSnowMonsterIlluminationTour } from "../../../lib/klook-links";
import { uminoMoriAquariumTicket, matsushimaChusonjiDayTour } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from the aquarium's own page, read by node fetch on 28 Nov 2026:
// uminomori.jp/umino/info/ (hours 4 Nov-19 Mar 10:00-17:00, last entry 16:30; adult 2,400, senior 65+ 1,800, junior
// and senior high 1,700, elementary 1,200, infant 4+ 700, under 4 free; advance web tickets from asoview skip the
// window, tickets bought elsewhere are exchanged at the ticket window; same-day re-entry at the exit; annual
// passport the price of two visits). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/sendai-umino-mori-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.uminomori.jp/umino/info/";
const HOURS = "https://www.uminomori.jp/umino/info/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SendaiUminoMoriAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Sendai Umino-Mori Aquarium tickets"
      title="Sendai Umino-Mori Aquarium Tickets 2026: Price & Hours"
      description="Sendai Umino-Mori Aquarium 2026: adults ¥2,400, seniors ¥1,800, junior and senior high ¥1,700, elementary ¥1,200, ages 4+ ¥700. Winter hours 10:00–17:00."
      h1={<>Sendai Umino-Mori Aquarium Tickets 2026: <br />Price &amp; Hours</>}
      subtitle="What admission to the Sendai aquarium costs for each age, the winter opening hours, and how a voucher is used."
      badges={[`Checked ${CHECKED}`, "Adults ¥2,400", "Open 10:00–17:00"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Admission to the Sendai Umino-Mori Aquarium is <strong>¥2,400 for adults</strong>, ¥1,800 for over-65s, ¥1,700
            for junior and senior high school students, ¥1,200 for elementary school children and ¥700 from age 4.
            Under-4s are free.
          </p>
          <p className={styles.bodyText}>
            From 4 November to 19 March it is open <strong>10 a.m. to 5 p.m.</strong> (last entry 4:30 p.m.). Same-day
            re-entry is allowed. Tickets bought outside the official web shop, including Klook vouchers, are exchanged at
            the ticket window. Sendai Umino-Mori Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: uminoMoriAquariumTicket.url, label: "Check the Sendai aquarium ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,400" },
        { label: "Junior/senior high", value: "¥1,700" },
        { label: "Elementary", value: "¥1,200" },
        { label: "Age 4+", value: "¥700" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a family of two adults and two elementary-age children pays ¥7,200 at the window; allow
          time to swap a third-party voucher at the ticket window.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Window prices. An annual passport costs the same as two visits. Holders of disability certificates pay half.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult", "¥2,400"],
              ["Senior (65 and over)", "¥1,800"],
              ["Junior and senior high school", "¥1,700"],
              ["Elementary school", "¥1,200"],
              ["Infant (4 and over)", "¥700"],
              ["Under 4", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells its ticket at its own price; its voucher is exchanged at the ticket window.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the aquarium open?",
          body: (
            <p className={styles.bodyText}>
              From 4 November to 19 March the aquarium is open 10 a.m. to 5 p.m., with last entry at 4:30 p.m. Re-entry on the same
              day is done at the exit; ask the staff on the way out.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: uminoMoriAquariumTicket.url, label: "Book the Umino-Mori Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Sendai and Yamagata",
        intro: "The aquarium is in Sendai, the base for these winter day trips.",
        tours: [matsushimaChusonjiDayTour, zaoGinzanDayTourFromSendai, zaoSnowMonsterIlluminationTour],
      }}
      links={
        <p className={styles.bodyText}>
          For day trips from Sendai, see the <Link href="/guides/attractions/zao-snow-monsters-tour" style={linkStyle}>Zao snow monsters tour</Link> and
          <Link href="/guides/attractions/ginzan-onsen-tour" style={linkStyle}>Ginzan Onsen tours</Link>. To get there, see the <Link href="/guides/transport/jr-east-pass" style={linkStyle}>JR East Pass</Link>
          and the <Link href="/guides/attractions/japan-winter-itinerary" style={linkStyle}>Japan winter itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Sendai Umino-Mori Aquarium?",
          a: `Adults pay ¥2,400, seniors 65+ ¥1,800, junior and senior high school students ¥1,700, elementary school children ¥1,200 and children from 4 ¥700. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours in winter?",
          a: "From 4 November to 19 March, 10:00 to 17:00 with last entry at 16:30.",
        },
        {
          q: "Can I re-enter on the same day?",
          a: "Yes. Ask the staff at the exit for re-entry on the day of your visit.",
        },
        {
          q: "Do I need to exchange a Klook voucher?",
          a: "Yes. The aquarium says tickets bought outside its own web shop must be exchanged at the ticket window.",
        },
        {
          q: "Are small children free?",
          a: "Children under 4 enter free. From age 4 the infant price of ¥700 applies.",
        },
      ]}
      related={[
        { href: "/guides/attractions/zao-snow-monsters-tour", title: "Zao Snow Monsters Tour" },
        { href: "/guides/attractions/ginzan-onsen-tour", title: "Ginzan Onsen Tours" },
        { href: "/guides/transport/jr-east-pass", title: "JR East Pass" },
        { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
      ]}
      banner={{
        title: "A rainy-day plan in Sendai",
        desc: "Admission to the Sendai Umino-Mori Aquarium.",
        label: "View the aquarium ticket →",
      }}
    />
  );
}
