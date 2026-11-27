import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { fujiQHighlandAdmission } from "../../../lib/klook-links";
import { kawaguchikoMusicForestTicket, mtFujiPanoramicRopewayTicket, mtFujiMultiAttractionPass } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from the Kawaguchiko Music Forest Museum's own site, read by node fetch on 28 Nov 2026:
// kawaguchikomusicforest.jp/price/ (weekday adult 1,800 yen, high school and university 1,300, elementary and
// junior high 1,000; weekends and holidays 2,100 / 1,600 / 1,000; high season, incl. 1-3 Jan 2027, 2,300 / 1,800 /
// 1,000; preschool free), /info/ (10:00-17:30, last entry 17:00) and /access/ (from Kawaguchiko Station: taxi
// about 16 min, about 2,000 yen; Kawaguchiko loop "retro bus" about 26 min, 380 yen). No Klook price printed.
const ROUTE = "/guides/attractions/kawaguchiko-music-forest-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://kawaguchikomusicforest.jp/price/";
const HOURS = "https://kawaguchikomusicforest.jp/info/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KawaguchikoMusicForestMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kawaguchiko Music Forest Museum"
      title="Kawaguchiko Music Forest Museum 2026: Price, Hours & Bus"
      description="Kawaguchiko Music Forest Museum: ¥1,800 for adults on weekdays, ¥2,100 at weekends, ¥2,300 on 1–3 Jan. Open 10:00–17:30; loop bus from the station."
      h1={<>Kawaguchiko Music Forest Museum 2026: <br />Price, Hours &amp; Bus</>}
      subtitle="The music-box museum and gardens at Lake Kawaguchi: weekday, weekend and New Year prices, hours and the bus from Kawaguchiko Station."
      badges={[`Checked ${CHECKED}`, "¥1,800 weekdays", "Lake Kawaguchi"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Admission is <strong>¥1,800 for adults on weekdays</strong> and ¥2,100 on weekends and holidays (¥2,300 on
            1–3 January 2027). High school and university students pay ¥1,300 / ¥1,600 and elementary and junior high
            pupils ¥1,000; preschool children are free.
          </p>
          <p className={styles.bodyText}>
            It opens <strong>10:00–17:30</strong> (last entry 17:00). From Kawaguchiko Station the loop bus takes about
            26 minutes (¥380). Klook sells an admission ticket. Kawaguchiko Music Forest Museum, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kawaguchikoMusicForestTicket.url, label: "Check museum tickets on Klook →" }}
      stats={[
        { label: "Adult (weekday)", value: "¥1,800" },
        { label: "Adult (weekend)", value: "¥2,100" },
        { label: "Hours", value: "10:00–17:30" },
        { label: "Preschool", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a weekday visit saves ¥300 per adult; combine it with the ropeway and a Lake
          Kawaguchi boat on the loop bus.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices follow three bands: weekday, weekend and holiday, and high season (in winter, 1–3 January 2027).
              Preschool children enter free.
            </p>
          ),
          table: {
            head: ["Ticket", "Weekday", "Weekend & holiday", "High season"],
            rows: [
              ["Adult", "¥1,800", "¥2,100", "¥2,300"],
              ["High school & university", "¥1,300", "¥1,600", "¥1,800"],
              ["Elementary & junior high", "¥1,000", "¥1,000", "¥1,000"],
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
              10:00–17:30, last entry 17:00; the museum says hours can change without notice. From Kawaguchiko Station
              (Fujikyu line, or the direct Fuji Excursion train from Shinjuku in about 2 hours), take a taxi (about 16
              minutes, around ¥2,000) or the Kawaguchiko loop &quot;retro bus&quot; (about 26 minutes, ¥380) to the
              museum stop.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kawaguchikoMusicForestTicket.url, label: "Book the museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: around Lake Kawaguchi",
        intro: "The loop bus serves both the museum and the ropeway, and Fuji-Q Highland is also in the Fuji Five Lakes area.",
        tours: [mtFujiPanoramicRopewayTicket, fujiQHighlandAdmission, mtFujiMultiAttractionPass],
      }}
      links={
        <p className={styles.bodyText}>
          To plan the day, see the <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={linkStyle}>Kawaguchiko day trip from Tokyo</Link>,
          the <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>Mt. Fuji day tour from Tokyo</Link> and, to stay the
          night, <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" style={linkStyle}>Kawaguchiko ryokan with a Mt. Fuji view</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Kawaguchiko Music Forest Museum?",
          a: `¥1,800 for adults on weekdays, ¥2,100 on weekends and holidays and ¥2,300 in high season (1–3 January 2027). Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "10:00–17:30, with last entry at 17:00.",
        },
        {
          q: "How do I get there from Kawaguchiko Station?",
          a: "By the Kawaguchiko loop bus, about 26 minutes (¥380), or by taxi, about 16 minutes.",
        },
        {
          q: "Are children free?",
          a: "Preschool children are free; elementary and junior high pupils pay ¥1,000.",
        },
        {
          q: "Can I buy tickets on Klook?",
          a: "Yes. Klook sells an electronic admission ticket that staff scan at the entrance.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "Kawaguchiko Day Trip" },
        { href: "/guides/attractions/mt-fuji-panoramic-ropeway-tickets", title: "Mt. Fuji Panoramic Ropeway" },
        { href: "/guides/attractions/kawaguchiko-ryokan-mt-fuji-view", title: "Kawaguchiko Ryokan with Fuji View" },
        { href: "/guides/attractions/fuji-q-highland-tickets", title: "Fuji-Q Highland Tickets" },
      ]}
      banner={{
        title: "Music boxes on Lake Kawaguchi",
        desc: "Admission to the Music Forest Museum.",
        label: "View museum tickets →",
      }}
    />
  );
}
