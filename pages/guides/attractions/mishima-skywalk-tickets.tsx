import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hakoneFreepass } from "../../../lib/klook-links";
import { mishimaSkywalkTicket, mtFujiPanoramicRopewayTicket, izuShabotenZooTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the operator's own pages, read by node fetch on 28 Nov 2026:
// mishima-skywalk.jp/guide/ (bridge ticket adult from 1,100, junior and senior high from 500, elementary from 200;
// dynamic pricing, prices to the end of the next month fixed at the start of each month; other activities extra; open
// 9:00-17:00 every day; dinosaur maze and AR shooting 10:00-16:00; pet carts 500; free rain ponchos; disability discount
// for the holder and one companion) and /access/ (Tokai buses from Mishima Station and from Motohakone port and
// Hakone-Yumoto; the Mishimaru one-day bus pass on the EMot app). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/mishima-skywalk-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://mishima-skywalk.jp/guide/";
const HOURS = "https://mishima-skywalk.jp/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MishimaSkywalkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Mishima Skywalk tickets"
      title="Mishima Skywalk Tickets 2026: Price, Hours & Access"
      description="Mishima Skywalk 2026: the 400 m bridge facing Mt Fuji costs from ¥1,100 for adults and ¥500 for junior and senior high. Open 9:00–17:00 every day."
      h1={<>Mishima Skywalk Tickets 2026: <br />Price, Hours &amp; Access</>}
      subtitle="What the long suspension bridge between Mishima and Hakone costs, how its changing prices work, and the buses that reach it."
      badges={[`Checked ${CHECKED}`, "From ¥1,100", "Open daily"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>A Mishima Skywalk bridge ticket starts at ¥1,100 for adults</strong>, ¥500 for junior and senior high
            school students and ¥200 for elementary school children. Prices change by date: each month the operator fixes
            them to the end of the following month. Zip lines and the other activities cost extra.
          </p>
          <p className={styles.bodyText}>
            The bridge is open <strong>9 a.m. to 5 p.m. every day</strong>. Tokai buses run from Mishima Station and from
            the Hakone side (Motohakone and Hakone-Yumoto). Klook sells a bridge ticket, with a set option that adds the zip
            line and the Forest Adventure course. Mishima Skywalk, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: mishimaSkywalkTicket.url, label: "Check the Mishima Skywalk ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "from ¥1,100" },
        { label: "Junior / senior high", value: "from ¥500" },
        { label: "Elementary", value: "from ¥200" },
        { label: "Hours", value: "9:00–17:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go on a clear morning for the Fuji view, and fit it into a Hakone day by bus rather than
          making a separate trip.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The prices above are the lowest of the dynamic range. With a disability certificate, the holder and one
              companion get ¥550 off adult tickets. Pet carts can be rented for ¥500, and ponchos are handed out free when
              it rains.
            </p>
          ),
          table: {
            head: ["Bridge ticket", "Price"],
            rows: [
              ["Adult", "from ¥1,100"],
              ["Junior and senior high school", "from ¥500"],
              ["Elementary school", "from ¥200"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Dynamic pricing: check the date on the official site. Activities are extra. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the Skywalk open, and how do I get there?",
          body: (
            <p className={styles.bodyText}>
              The bridge is open from 9 a.m. to 5 p.m. every day; the dinosaur maze and AR shooting run 10 a.m. to 4 p.m. After
              an earthquake of intensity 4 or more it closes for checks. Tokai buses run from Mishima Station and from Motohakone
              port and Hakone-Yumoto; the Mishimaru one-day bus pass is sold in the EMot app.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: mishimaSkywalkTicket.url, label: "Book the Mishima Skywalk on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Hakone and the Fuji area",
        intro: "The bridge sits on the road between Mishima and Hakone, so it pairs with these.",
        tours: [hakoneFreepass, mtFujiPanoramicRopewayTicket, izuShabotenZooTicket],
      }}
      links={
        <p className={styles.bodyText}>
          It fits into a <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>Hakone day trip from Tokyo</Link>, and the
          <Link href="/guides/transport/mt-fuji-shizuoka-area-pass" style={linkStyle}>Mt Fuji Shizuoka Area Pass</Link> covers trains to Mishima. For another Fuji view,
          see the <Link href="/guides/attractions/mt-fuji-panoramic-ropeway-tickets" style={linkStyle}>Mt Fuji Panoramic Ropeway</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Mishima Skywalk?",
          a: `From ¥1,100 for adults, ¥500 for junior and senior high school students and ¥200 for elementary school children; prices change by date. Checked ${CHECKED}.`,
        },
        {
          q: "Why do prices change?",
          a: "The Skywalk uses dynamic pricing. At the start of each month it fixes prices up to the end of the following month.",
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 17:00 every day of the year.",
        },
        {
          q: "How do I get there?",
          a: "By Tokai bus from Mishima Station, or from Motohakone port and Hakone-Yumoto on the Hakone side.",
        },
        {
          q: "Are the zip lines included?",
          a: "No. Activities cost extra; Klook also sells a set with the zip line and Forest Adventure.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip from Tokyo" },
        { href: "/guides/transport/mt-fuji-shizuoka-area-pass", title: "Mt Fuji Shizuoka Area Pass" },
        { href: "/guides/attractions/mt-fuji-panoramic-ropeway-tickets", title: "Mt Fuji Panoramic Ropeway" },
        { href: "/guides/attractions/hakone-free-pass", title: "Hakone Free Pass" },
      ]}
      banner={{
        title: "A 400 m bridge facing Mt Fuji",
        desc: "A ticket for the Mishima Skywalk.",
        label: "View the Mishima Skywalk ticket →",
      }}
    />
  );
}
