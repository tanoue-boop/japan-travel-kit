import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  arimaTaikoNoYuSpa,
  rokkoHikingArimaBathingTour,
  kobeFerrisKitanoArimaRokkoDayTour,
} from "../../../lib/klook-links";
import { kobeNunobikiHerbGardensRopeway } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Taiko no Yu's own
// pages, read by node fetch on 28 Nov 2026: taikounoyu.com/howto (10:00-22:00, last entry
// 21:00; next closed day 6 January 2027 (Wed); weekday adult full-time 2,750 yen, night
// (entry from 19:30) 1,980, elementary 1,239, age 3-5 440; weekends and holidays 2,970 /
// 2,090 / 1,430 / 550; special days (26 Dec - 3 Jan, 3-5 May, 11-15 Aug) adult 3,300,
// elementary 1,430, 3-5 550; Kobe bathing tax 75 yen extra, waived for age 6 and under
// and for elementary pupils on weekdays) and /access (Arima Onsen Station, about 550 m
// on foot, or the shuttle bus; subway + Kobe Electric Railway from Sannomiya about 30 min;
// Hankyu Bus from Umeda / Osaka about 50 min). No Klook price is printed (Klook answers
// with 403).
const ROUTE = "/guides/attractions/arima-onsen-taiko-no-yu";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.taikounoyu.com/howto";
const ACCESS = "https://www.taikounoyu.com/access";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ArimaOnsenTaikoNoYuPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Arima Onsen Taiko no Yu"
      title="Taiko no Yu Arima Onsen 2026: Price, Hours & Access"
      description="Taiko no Yu at Arima Onsen is ¥2,750 on weekdays and ¥2,970 on weekends for adults (¥3,300 at New Year), open 10:00–22:00. How to get there from Kobe."
      h1={<>Taiko no Yu, Arima Onsen 2026: <br />Price, Hours &amp; Access</>}
      subtitle="The day spa in Arima Onsen with the town's gold and silver waters: admission by day, the night ticket, opening hours and the trip from Kobe or Osaka."
      badges={[`Checked ${CHECKED}`, "¥2,750 weekday", "Arima, Kobe"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Taiko no Yu is <strong>¥2,750 for adults on weekdays</strong> and ¥2,970 on weekends and holidays;
            entry from 19:30 is ¥1,980 / ¥2,090. Elementary pupils pay ¥1,239 (weekdays) or ¥1,430. From 26 December
            to 3 January adults pay ¥3,300. Kobe&apos;s ¥75 bathing tax is added.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>10:00–22:00</strong> (last entry 21:00); the next closed day is 6 January 2027. It is
            about 550 m from Arima Onsen Station, with a shuttle bus. Klook sells the ticket. Taiko no Yu, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: arimaTaikoNoYuSpa.url, label: "Check Taiko no Yu tickets on Klook →" }}
      stats={[
        { label: "Adult, weekday", value: "¥2,750" },
        { label: "Adult, weekend", value: "¥2,970" },
        { label: "Hours", value: "10:00–22:00" },
        { label: "Closed", value: "6 Jan 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go on a weekday and stay the whole day, or arrive after 19:30 for the cheaper
          night ticket. Avoid 26 December – 3 January if price matters.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Taiko no Yu?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices include consumption tax but not Kobe&apos;s ¥75 bathing tax, which is waived for children aged 6
              and under and for elementary pupils on weekdays. The night ticket is for entry from 19:30.
            </p>
          ),
          table: {
            head: ["Day", "Adult", "Adult from 19:30", "Elementary", "Age 3–5"],
            rows: [
              ["Weekdays", "¥2,750", "¥1,980", "¥1,239", "¥440"],
              ["Weekends & holidays", "¥2,970", "¥2,090", "¥1,430", "¥550"],
              ["26 Dec – 3 Jan, 3–5 May, 11–15 Aug", "¥3,300", "—", "¥1,430", "¥550"],
            ],
            note: (
              <>
                Taiko no Yu prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price, with a package option.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Open 10:00–22:00, last entry 21:00; the next closed day is Wednesday 6 January 2027. From Sannomiya,
              the subway and Kobe Electric Railway take about 30 minutes to Arima Onsen Station; Hankyu buses from
              Umeda and Osaka take about 50 minutes. From the station it is about 550 m on foot, or take the
              circulating shuttle bus.{" "}
              <a href={ACCESS} target="_blank" rel="noopener" style={linkStyle}>Access page</a>.
            </p>
          ),
          ctas: [{ href: arimaTaikoNoYuSpa.url, label: "Book Taiko no Yu on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Kobe and Mt. Rokko",
        intro: "Arima sits behind Mt. Rokko, so a hike over the mountain or an afternoon in Kobe pairs with the baths.",
        tours: [rokkoHikingArimaBathingTour, kobeNunobikiHerbGardensRopeway, kobeFerrisKitanoArimaRokkoDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/arima-onsen-day-trip" style={linkStyle}>Arima Onsen day trip</Link>, the{" "}
          <Link href="/guides/attractions/kobe-day-trip-from-osaka" style={linkStyle}>Kobe day trip from Osaka</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/kobe-nunobiki-herb-gardens-ropeway" style={linkStyle}>Nunobiki Herb
          Gardens &amp; Ropeway</Link>. For a city spa in Osaka itself, see{" "}
          <Link href="/guides/attractions/spa-world-osaka-tickets" style={linkStyle}>Spa World</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Taiko no Yu?",
          a: `Adults pay ¥2,750 on weekdays and ¥2,970 on weekends and holidays (¥3,300 from 26 December to 3 January), plus ¥75 bathing tax. Checked ${CHECKED}.`,
        },
        {
          q: "What are Taiko no Yu's opening hours?",
          a: "10:00–22:00, with last entry at 21:00. The next closed day is 6 January 2027.",
        },
        {
          q: "Is there a cheaper evening ticket?",
          a: "Yes. Entry from 19:30 is ¥1,980 for adults on weekdays and ¥2,090 on weekends and holidays.",
        },
        {
          q: "How do I get to Taiko no Yu from Kobe?",
          a: "Take the subway and Kobe Electric Railway from Sannomiya to Arima Onsen Station (about 30 minutes), then walk about 550 m or take the shuttle bus.",
        },
        {
          q: "Can I buy Taiko no Yu tickets on Klook?",
          a: "Yes. Klook sells admission and a package with extra options.",
        },
      ]}
      related={[
        { href: "/guides/attractions/arima-onsen-day-trip", title: "Arima Onsen Day Trip" },
        { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka" },
        { href: "/guides/attractions/kobe-nunobiki-herb-gardens-ropeway", title: "Nunobiki Herb Gardens & Ropeway" },
        { href: "/guides/attractions/spa-world-osaka-tickets", title: "Spa World Osaka" },
      ]}
      banner={{
        title: "Gold and silver baths in Arima",
        desc: "Admission to Taiko no Yu, Arima Onsen.",
        label: "View Taiko no Yu tickets →",
      }}
    />
  );
}
