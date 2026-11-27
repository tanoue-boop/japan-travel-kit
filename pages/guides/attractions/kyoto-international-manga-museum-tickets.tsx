import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kyotoMangaMuseumTicket, kyotoRailwayMuseumTicket, toeiKyotoStudioParkTicket, kyotoAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from the Kyoto International Manga Museum's own site, read by node fetch on 28 Nov 2026:
// kyotomm.jp/en/opentime-cost/ (10:00-17:00, last admission 16:30; closed Wednesdays, next day if a holiday;
// individuals over 19: 1,200 yen, 13-18: 400, 6-12: 200; groups of 20+ 960 / 320 / 160; yearly passport 6,000 /
// 3,600 / 1,200), /en/guide-inuse/ (no car park; no food inside; free admission for people with disabilities plus
// one assistant) and /en/access/ (Karasuma-Oike Station exit 2, about 2 minutes on foot; from Kyoto Station 3
// stops on the Karasuma Line, about 6 minutes). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/kyoto-international-manga-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://kyotomm.jp/en/opentime-cost/";
const HOURS = "https://kyotomm.jp/en/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KyotoMangaMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kyoto International Manga Museum"
      title="Kyoto International Manga Museum 2026: Tickets & Hours"
      description="Kyoto International Manga Museum: ¥1,200 for adults, ¥400 for ages 13–18, ¥200 for ages 6–12. Open 10:00–17:00, closed Wednesdays; by Karasuma-Oike."
      h1={<>Kyoto International Manga Museum 2026: <br />Tickets &amp; Hours</>}
      subtitle="The manga museum in a former school building at Karasuma-Oike: what entry costs, opening hours, the closed day and the subway."
      badges={[`Checked ${CHECKED}`, "¥1,200 adult", "Karasuma-Oike"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Entry to the Kyoto International Manga Museum is <strong>¥1,200 for adults</strong> (over 19), ¥400 for
            ages 13 to 18 and ¥200 for ages 6 to 12. Tickets are sold at the machine on the day or online in advance.
          </p>
          <p className={styles.bodyText}>
            It opens 10:00–17:00 (last admission 16:30) and is <strong>closed on Wednesdays</strong> (the next day if
            Wednesday is a holiday). It is about 2 minutes on foot from exit 2 of Karasuma-Oike Station. Klook sells
            admission tickets. Kyoto International Manga Museum, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kyotoMangaMuseumTicket.url, label: "Check Manga Museum tickets on Klook →" }}
      stats={[
        { label: "Adult (19+)", value: "¥1,200" },
        { label: "Age 13–18", value: "¥400" },
        { label: "Age 6–12", value: "¥200" },
        { label: "Closed", value: "Wednesdays" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a central, indoor stop for a rainy afternoon, three stops from Kyoto Station; avoid
          Wednesdays.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Group rates apply to 20 or more people entering together. A yearly passport is ¥6,000 for adults. Eating
              and drinking are not allowed inside, but you can use the lawn and the museum cafe. There is no car park.
            </p>
          ),
          table: {
            head: ["Ticket", "Individual", "Groups (20+)"],
            rows: [
              ["Over 19", "¥1,200", "¥960"],
              ["Age 13–18", "¥400", "¥320"],
              ["Age 6–12", "¥200", "¥160"],
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
              The museum opens 10:00–17:00, with last admission at 16:30, and closes on Wednesdays (or the next day when
              Wednesday is a national holiday). From Kyoto Station, take the Karasuma Line subway three stops to
              Karasuma-Oike (about 6 minutes), then walk about 2 minutes from exit 2. From Sanjo, the Tozai Line takes
              about 3 minutes to the same station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kyotoMangaMuseumTicket.url, label: "Book the Manga Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Kyoto",
        intro: "The Railway Museum and the Kyoto Aquarium are near Umekoji, and Toei Studio Park is in Uzumasa on the Tozai side of the city.",
        tours: [kyotoRailwayMuseumTicket, toeiKyotoStudioParkTicket, kyotoAquariumTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of Kyoto, see <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>things to do in Kyoto</Link>, the
          <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>Kyoto 2-day itinerary</Link> and the
          <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>Kyoto 3-day itinerary</Link>. For anime in Tokyo, see the
          <Link href="/guides/attractions/akihabara-anime-tour" style={linkStyle}>Akihabara anime tour</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Kyoto International Manga Museum?",
          a: `¥1,200 for adults over 19, ¥400 for ages 13–18 and ¥200 for ages 6–12. Checked ${CHECKED}.`,
        },
        {
          q: "When is the Manga Museum closed?",
          a: "On Wednesdays, or the next day when Wednesday is a national holiday.",
        },
        {
          q: "What are the opening hours?",
          a: "10:00–17:00, with last admission at 16:30.",
        },
        {
          q: "How do I get there from Kyoto Station?",
          a: "Take the Karasuma Line subway three stops to Karasuma-Oike (about 6 minutes) and walk about 2 minutes from exit 2.",
        },
        {
          q: "Can I eat inside?",
          a: "No. Eating and drinking are not allowed in the building, but the lawn and the museum cafe are open to visitors.",
        },
      ]}
      related={[
        { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto" },
        { href: "/guides/attractions/kyoto-railway-museum-tickets", title: "Kyoto Railway Museum Tickets" },
        { href: "/guides/attractions/toei-kyoto-studio-park-tickets", title: "Toei Kyoto Studio Park Tickets" },
        { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2-Day Itinerary" },
      ]}
      banner={{
        title: "Manga in a Kyoto schoolhouse",
        desc: "Admission to the Kyoto International Manga Museum.",
        label: "View Manga Museum tickets →",
      }}
    />
  );
}
