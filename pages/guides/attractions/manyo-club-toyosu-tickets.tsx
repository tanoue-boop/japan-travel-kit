import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tokyoJoypolisTicket, tokyoBaySunsetCruise, tsukijiStreetFoodTour } from "../../../lib/klook-links";
import { manyoClubToyosuTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from Tokyo Toyosu Manyo Club's own site, read by node fetch on 28 Nov 2026:
// tokyo-toyosu.manyo.co.jp/price/ and /languages/en/ (set admission 10:00 to 3:00: adults, junior high and
// over, 3,850 yen; elementary 2,000; age 3 to preschool 1,400; under 3 free; bathing tax 150 for adults, not
// under 12; after 3:00 late-night fee +3,000 adult / +1,500 child; morning bath 5:00-9:00 adult 2,200; under 18
// with a guardian; tattoos refused unless covered under Manyo rules) and /access/ (Yurikamome Shijo-mae
// Station by deck, about 4 min; Tokyo BRT Toyosu-shijo-mae 3 min). No Klook price is printed.
const ROUTE = "/guides/attractions/manyo-club-toyosu-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://tokyo-toyosu.manyo.co.jp/price/";
const HOURS = "https://tokyo-toyosu.manyo.co.jp/languages/en/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ManyoClubToyosuTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Manyo Club Toyosu"
      title="Manyo Club Toyosu 2026: Price, Hours & Tattoo Rules"
      description="Tokyo Toyosu Manyo Club by Toyosu Market: ¥3,850 for adults plus ¥150 bath tax, 10:00 to 3:00. Late-night fee, morning bath, tattoo rules and access."
      h1={<>Manyo Club Toyosu 2026: <br />Price, Hours &amp; Tattoo Rules</>}
      subtitle="The onsen at Senkyaku Banrai next to Toyosu Market: what the set admission covers, the late-night and morning prices, and the walk from Shijo-mae."
      badges={[`Checked ${CHECKED}`, "¥3,850 adult", "Toyosu, Tokyo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Set admission to Tokyo Toyosu Manyo Club is <strong>¥3,850 for adults</strong> (junior high and over),
            ¥2,000 for elementary pupils and ¥1,400 for age 3 to preschool, plus a ¥150 bathing tax for adults. It
            includes the baths, yukata and towels.
          </p>
          <p className={styles.bodyText}>
            The set price covers <strong>10:00 until 3:00 the next morning</strong>; staying after 3:00 adds ¥3,000 for
            adults. It is about 4 minutes from Shijo-mae Station on the Yurikamome. Klook sells an admission ticket.
            Manyo Club, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: manyoClubToyosuTicket.url, label: "Check Manyo Club tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥3,850" },
        { label: "Elementary", value: "¥2,000" },
        { label: "Set time", value: "10:00 – 3:00" },
        { label: "After 3:00", value: "+¥3,000" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> combine it with teamLab Planets or Toyosu Market and leave before 3:00; tattoos
          must be covered under the club&apos;s rules.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The set admission includes bathing, yukata, bath towel, towel and use of the building. Guests under 18
              must be with a guardian. The ¥150 bathing tax is not charged for children under 12. A morning bath,
              5:00–9:00, is ¥2,200 for adults.
            </p>
          ),
          table: {
            head: ["Ticket", "Set admission", "Late-night fee (after 3:00)"],
            rows: [
              ["Adult (junior high+)", "¥3,850", "+¥3,000"],
              ["Elementary", "¥2,000", "+¥1,500"],
              ["Age 3 to preschool", "¥1,400", "+¥1,500"],
              ["Under 3", "Free", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Plus ¥150 bathing tax for adults. Klook sells admission at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "Tattoo rules, hours and access",
          body: (
            <p className={styles.bodyText}>
              Guests with tattoos, tattoo stickers or body paint are refused unless covered according to Manyo&apos;s rules;
              ask the staff. The set admission covers 10:00 to 3:00 the next morning, and the morning bath runs 5:00–9:00.
              The building is next to Toyosu Market, linked by the second-floor deck to Shijo-mae Station on the
              Yurikamome (about 4 minutes on foot), and 3 minutes from the Toyosu-shijo-mae stop of Tokyo BRT.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: manyoClubToyosuTicket.url, label: "Book Manyo Club on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Toyosu and Odaiba",
        intro: "The Yurikamome runs on from Toyosu to Odaiba, and Tsukiji is across the river.",
        tours: [tokyoJoypolisTicket, tokyoBaySunsetCruise, tsukijiStreetFoodTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the area, see <Link href="/guides/attractions/teamlab-planets-tickets" style={linkStyle}>teamLab Planets tickets</Link>, the
          <Link href="/guides/attractions/tsukiji-market-food-tour" style={linkStyle}>Tsukiji market food tour</Link> and the
          <Link href="/guides/attractions/tokyo-bay-cruise" style={linkStyle}>Tokyo Bay cruise</Link>. For another Tokyo spa, see
          <Link href="/guides/attractions/spa-laqua-tokyo-tickets" style={linkStyle}>Spa LaQua</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Manyo Club Toyosu?",
          a: `Set admission is ¥3,850 for adults, ¥2,000 for elementary pupils and ¥1,400 for age 3 to preschool, plus a ¥150 bathing tax for adults. Checked ${CHECKED}.`,
        },
        {
          q: "What are the hours?",
          a: "The set admission covers 10:00 until 3:00 the next morning; after 3:00 a late-night fee applies. The morning bath is 5:00–9:00.",
        },
        {
          q: "Does Manyo Club allow tattoos?",
          a: "Only if covered according to the club's rules; ask the staff at the front desk.",
        },
        {
          q: "How do I get to Manyo Club Toyosu?",
          a: "Take the Yurikamome to Shijo-mae Station; the building is linked by the second-floor deck, about 4 minutes on foot.",
        },
        {
          q: "Is it the same as Senkyaku Banrai?",
          a: "Yes. Tokyo Toyosu Manyo Club is the onsen at Senkyaku Banrai, next to Toyosu Market.",
        },
      ]}
      related={[
        { href: "/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets Tickets" },
        { href: "/guides/attractions/tsukiji-market-food-tour", title: "Tsukiji Market Food Tour" },
        { href: "/guides/attractions/spa-laqua-tokyo-tickets", title: "Spa LaQua Tokyo" },
        { href: "/guides/attractions/tokyo-bay-cruise", title: "Tokyo Bay Cruise" },
      ]}
      banner={{
        title: "An onsen by Toyosu Market",
        desc: "Admission to Tokyo Toyosu Manyo Club.",
        label: "View Manyo Club tickets →",
      }}
    />
  );
}
