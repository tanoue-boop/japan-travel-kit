import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { skytreeTicket } from "../../../lib/klook-links";
import { spaLaquaTicket, tokyoDomeCityAttractionsTicket, sunshineAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from Tokyo Dome City's own Spa LaQua pages, read by node fetch on 28 Nov 2026:
// tokyo-dome.co.jp/en/spa/schedule-price (adults 18+ A 3,500 / B 3,800 / C 4,400 / D 4,700 yen; 6-17 2,300-3,500,
// with a guardian, until 18:00, last entry 15:00; under 6 not admitted; night entry after 19:00 2,500-3,700, not
// 31 Dec; late-night surcharge 2,500 for 1:00-6:00; Healing Baden 1,100; towels and loungewear included; calendar
// hours 11:00 to 9:00 next morning, baths to 8:30, open-air to 7:30, last entry 8:00), /en/spa/first (tattoos
// refused) and /en/spa/access (Korakuen, Kasuga, Suidobashi stations). No Klook price is printed.
const ROUTE = "/guides/attractions/spa-laqua-tokyo-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.tokyo-dome.co.jp/en/spa/schedule-price";
const HOURS = "https://www.tokyo-dome.co.jp/en/spa/schedule-price";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SpaLaquaTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Spa LaQua"
      title="Spa LaQua Tokyo 2026: Price, Hours & Tattoo Rules"
      description="Spa LaQua at Tokyo Dome City: ¥3,500–4,700 for adults by date, ¥2,500–3,700 after 19:00. Open 11:00 to 9:00 the next morning; no tattoos, no under-6s."
      h1={<>Spa LaQua Tokyo 2026: <br />Price, Hours &amp; Tattoo Rules</>}
      subtitle="The natural hot-spring spa above Tokyo Dome City: the four price bands, the night discount, the overnight surcharge and who can enter."
      badges={[`Checked ${CHECKED}`, "From ¥3,500", "Korakuen, Tokyo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Spa LaQua costs <strong>¥3,500–4,700 for adults</strong> (18 and over), depending on the date&apos;s price band;
            ages 6–17 pay ¥2,300–3,500. Entering after 19:00 costs ¥2,500–3,700. Towels and loungewear are included.
          </p>
          <p className={styles.bodyText}>
            It opens <strong>11:00 until 9:00 the next morning</strong> (last entry 8:00); staying between 1:00 and 6:00
            adds ¥2,500. Guests with tattoos are refused and children under 6 cannot enter. Klook sells an admission
            ticket. Tokyo Dome City, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: spaLaquaTicket.url, label: "Check Spa LaQua tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥3,500–4,700" },
        { label: "After 19:00", value: "¥2,500–3,700" },
        { label: "Hours", value: "11:00 – 9:00" },
        { label: "Tattoos", value: "Not allowed" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go on a weekday (band A, ¥3,500) or after 19:00, and leave by 1:00 unless you want
          to pay the overnight surcharge.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Each date has a band, A to D, on the spa&apos;s price calendar; in late November most weekdays are A and
              weekends C. Children aged 6–17 need a guardian (of the same sex for ages 6–11) and may stay until 18:00,
              entering by 15:00. The Healing Baden sauna area costs ¥1,100 extra and is for 18+.
            </p>
          ),
          table: {
            head: ["Ticket", "A", "B", "C", "D"],
            rows: [
              ["Adult (18+)", "¥3,500", "¥3,800", "¥4,400", "¥4,700"],
              ["Age 6–17", "¥2,300", "¥2,600", "¥3,200", "¥3,500"],
              ["Night (after 19:00), adult", "¥2,500", "¥2,800", "¥3,400", "¥3,700"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Late-night surcharge ¥2,500 for staying between 1:00 and 6:00. The night price does not apply on 31 December. Klook sells admission at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              The spa calendar shows 11:00 to 9:00 the next morning; the baths close at 8:30 (open-air bath 7:30) and last
              entry is 8:00. Spa LaQua is in the LaQua building at Tokyo Dome City, reached from Korakuen Station (Tokyo
              Metro), Kasuga Station (Toei Subway) or JR Suidobashi Station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: spaLaquaTicket.url, label: "Book Spa LaQua on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Tokyo Dome City and beyond",
        intro: "The rides at Tokyo Dome City are in the same complex, and Ikebukuro and Oshiage are a short subway ride away.",
        tours: [tokyoDomeCityAttractionsTicket, skytreeTicket, sunshineAquariumTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For more of Tokyo, see <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>, the
          <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>Tokyo 3-day itinerary</Link> and, for an onsen with a room,
          <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>Hakone ryokan with private onsen</Link>. For another
          Tokyo bath, see <Link href="/guides/attractions/manyo-club-toyosu-tickets" style={linkStyle}>Manyo Club Toyosu</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Spa LaQua?",
          a: `¥3,500–4,700 for adults (18 and over) depending on the date, ¥2,300–3,500 for ages 6–17, and ¥2,500–3,700 for adults entering after 19:00. Checked ${CHECKED}.`,
        },
        {
          q: "What are Spa LaQua's hours?",
          a: "From 11:00 until 9:00 the next morning; the baths close at 8:30 and last entry is 8:00.",
        },
        {
          q: "Does Spa LaQua allow tattoos?",
          a: "No. The spa refuses entry to anyone with tattoos or body art, including stickers and body paint.",
        },
        {
          q: "Can I stay overnight?",
          a: "Yes, but staying between 1:00 and 6:00 adds a ¥2,500 late-night surcharge.",
        },
        {
          q: "Can children go to Spa LaQua?",
          a: "Ages 6–17 may enter with a guardian until 18:00 (entry by 15:00). Children under 6 are not admitted.",
        },
      ]}
      related={[
        { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo" },
        { href: "/guides/attractions/tokyo-dome-city-attractions-tickets", title: "Tokyo Dome City Attractions" },
        { href: "/guides/attractions/manyo-club-toyosu-tickets", title: "Manyo Club Toyosu" },
        { href: "/guides/attractions/hakone-ryokan-private-onsen", title: "Hakone Ryokan with Private Onsen" },
      ]}
      banner={{
        title: "A hot spring in central Tokyo",
        desc: "Admission to Spa LaQua, Tokyo Dome City.",
        label: "View Spa LaQua tickets →",
      }}
    />
  );
}
