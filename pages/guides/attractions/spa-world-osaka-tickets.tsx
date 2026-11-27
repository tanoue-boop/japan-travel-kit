import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { shinsekaiNightFoodTour, akibaKartShinsekaiGoKart, osakaWalkingFoodTour } from "../../../lib/klook-links";
import { spaWorldTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Spa World's own
// pages, read by node fetch on 28 Nov 2026: spaworld.co.jp/info/ryokin/ (Japanese price
// page: onsen only 1,500 yen junior high and up / 1,000 elementary and younger, every day;
// with pool 2,000 / 1,200 weekdays, 2,700 / 1,700 weekends and holidays; 0:00-5:00 entry,
// exit or stay adds a 1,300 yen late-night charge plus 150 yen bathing tax; stone saunas
// 800 yen weekdays / 1,000 yen weekends extra), /english/info/ryokin/ (tattoos not
// admitted; children of elementary age and younger must be with a guardian),
// /info/eigyo/ (baths 10:00 to 8:45 next morning; pool from 1 October weekdays
// 10:00-19:00, weekends and holidays 10:00-22:00) and /about/access.html (Dobutsuen-mae
// exit 5, JR Shin-Imamiya east exit). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/spa-world-osaka-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.spaworld.co.jp/info/ryokin/";
const HOURS = "https://www.spaworld.co.jp/info/eigyo/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SpaWorldOsakaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Spa World Osaka Tickets"
      title="Spa World Osaka 2026: Prices, Hours & Tattoo Rules"
      description="Spa World Osaka is ¥1,500 for the onsen, or ¥2,000 weekdays / ¥2,700 weekends with the pool. Baths open 10:00 to 8:45, late-night fee, no tattoos."
      h1={<>Spa World Osaka 2026: <br />Prices, Hours &amp; Tattoo Rules</>}
      subtitle="The 24-hour onsen and pool complex by Shinsekai: what each ticket covers, the late-night charge, opening hours and the tattoo ban."
      badges={[`Checked ${CHECKED}`, "From ¥1,500", "Shinsekai, Osaka"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Spa World is <strong>¥1,500 for the onsen only</strong> (junior high school and up; ¥1,000 for
            elementary age and younger), any day. With the pool it is <strong>¥2,000 on weekdays</strong> and ¥2,700
            on weekends and holidays. Towels and loungewear are included.
          </p>
          <p className={styles.bodyText}>
            The baths are open <strong>10:00 until 8:45 the next morning</strong>; entering, leaving or staying
            between 0:00 and 5:00 adds ¥1,300 plus ¥150 bathing tax. People with tattoos, including stickers, are not
            admitted. Klook sells the ticket. Spa World, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: spaWorldTicket.url, label: "Check Spa World tickets on Klook →" }}
      stats={[
        { label: "Onsen only", value: "¥1,500" },
        { label: "With pool (weekday)", value: "¥2,000" },
        { label: "Baths", value: "10:00–8:45" },
        { label: "0:00–5:00", value: "+¥1,450" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the onsen-only ticket unless you want the pool, and leave before midnight
          to avoid the late-night charge. With any tattoo, choose another bath.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Spa World?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices include tax. The stone saunas (ganban-yoku) cost extra: ¥800 on weekdays and ¥1,000 on weekends,
              holidays and special days. Water slides and swimsuit rental are also extra.
            </p>
          ),
          table: {
            head: ["Ticket", "Junior high +", "Elementary and younger"],
            rows: [
              ["Onsen only (any day)", "¥1,500", "¥1,000"],
              ["With pool, weekdays", "¥2,000", "¥1,200"],
              ["With pool, weekends & holidays", "¥2,700", "¥1,700"],
              ["Stay 0:00–5:00", "+¥1,300 + ¥150 tax", "+¥1,300"],
            ],
            note: (
              <>
                Spa World prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price; exchange the voucher for a wristband at the counter.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Baths: 10:00 to 8:45 the next morning (closed 8:45–10:00 for checks). Pool, from 1 October: 10:00–19:00
              on weekdays and 10:00–22:00 on weekends and holidays. Stone saunas: 10:00 to 5:00 (last entry 4:00).
              Spa World is right by exit 5 of Dobutsuen-mae Station (Midosuji and Sakaisuji lines) and the east exit
              of JR Shin-Imamiya Station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Hours page</a>.
            </p>
          ),
          ctas: [{ href: spaWorldTicket.url, label: "Book Spa World on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Shinsekai and Namba",
        intro: "Spa World is at the edge of Shinsekai, so a food walk or a kart ride fits before or after the baths.",
        tours: [shinsekaiNightFoodTour, akibaKartShinsekaiGoKart, osakaWalkingFoodTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see{" "}
          <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link>, the{" "}
          <Link href="/guides/attractions/osaka-food-tour" style={linkStyle}>Osaka food tour</Link> guide and the{" "}
          <Link href="/guides/attractions/osaka-2-day-itinerary" style={linkStyle}>Osaka 2-day itinerary</Link>. For an
          onsen town rather than a city spa, see the{" "}
          <Link href="/guides/attractions/arima-onsen-taiko-no-yu" style={linkStyle}>Taiko no Yu</Link> guide.
          {" "}For a family morning before the baths, <Link href="/guides/attractions/kids-plaza-osaka-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kids Plaza Osaka</Link> opens at 9:30 (¥1,500 for adults).
          {" "}For a second bathhouse, <Link href="/guides/attractions/solaniwa-onsen-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Solaniwa Onsen</Link> at Osaka Bay Tower is ¥2,310–3,630 for adults by date, ¥1,980 after 5 p.m. on A and B days.
        </p>
      }
      faq={[
        {
          q: "How much is Spa World Osaka?",
          a: `¥1,500 for the onsen only (¥1,000 for children), or ¥2,000 on weekdays and ¥2,700 on weekends with the pool. Checked ${CHECKED}.`,
        },
        {
          q: "Is Spa World open 24 hours?",
          a: "Almost: the baths are open from 10:00 to 8:45 the next morning. Staying between 0:00 and 5:00 adds a ¥1,300 late-night charge and ¥150 bathing tax.",
        },
        {
          q: "Does Spa World allow tattoos?",
          a: "No. Spa World's rules say people with tattoos, including tattoo stickers, are not admitted.",
        },
        {
          q: "What are the pool hours?",
          a: "From 1 October: 10:00–19:00 on weekdays and 10:00–22:00 on weekends and holidays.",
        },
        {
          q: "Can I buy Spa World tickets on Klook?",
          a: "Yes. Klook sells onsen-only and pool tickets; show the voucher at the counter to get your wristband.",
        },
      ]}
      related={[
        { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
        { href: "/guides/attractions/osaka-food-tour", title: "Osaka Food Tour" },
        { href: "/guides/attractions/osaka-go-kart", title: "Osaka Go-Kart" },
        { href: "/guides/attractions/arima-onsen-taiko-no-yu", title: "Arima Onsen Taiko no Yu" },
      ]}
      banner={{
        title: "Onsen and pool by Shinsekai",
        desc: "Admission to Spa World, Osaka.",
        label: "View Spa World tickets →",
      }}
    />
  );
}
