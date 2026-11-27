import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrTakayamaHokurikuAreaPass } from "../../../lib/klook-links-a35";
import { kanazawaKenrokuenHigashiChayaDayTour, shirakawagoLightUpTakayamaDayTour, kanazawaHotels } from "../../../lib/klook-links";

// Task jtk-20261127-A35. Every figure is from JR Central's tourist-pass site,
// touristpass.jp/en/takayama_hokuriku/ (linked from JR West's pass pages), read by
// node fetch on 27 Nov 2026: price, 5 days, up to six free reserved seats, the JR
// sections, the three bus lines, the Kyoto–Shin-Osaka exclusion, the all-reserved
// Hida period 25 Dec 2026 – 5 Jan 2027, booking via JR-WEST ONLINE TRAIN RESERVATION
// and the Kurobe Gorge Railway 10% discount.
const ROUTE = "/guides/transport/takayama-hokuriku-area-pass";
const CHECKED_ISO = "2026-11-27";
const CHECKED = checkedLabel(CHECKED_ISO);
const OFFICIAL = "https://touristpass.jp/en/takayama_hokuriku/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TakayamaHokurikuAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Takayama-Hokuriku Area Pass"
      title="Takayama-Hokuriku Area Pass 2026: Price & Shirakawa-go Buses"
      description="The Takayama-Hokuriku Area Tourist Pass is ¥19,800 for 5 days (child ¥9,900): the Hida from Nagoya, Shirakawa-go buses, Kanazawa and Toyama."
      h1={<>Takayama-Hokuriku Area Pass 2026: <br />Price &amp; Shirakawa-go Buses</>}
      subtitle="Five days from Osaka or Nagoya through Takayama, Shirakawa-go and Gokayama to Kanazawa and Toyama — trains and buses on one pass."
      badges={[`Checked ${CHECKED}`, "¥19,800 · 5 days", "Shirakawa-go buses included"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Takayama-Hokuriku Area Tourist Pass costs <strong>¥19,800 for adults and ¥9,900 for children
            (6–11)</strong> for <strong>5 consecutive days</strong>. It covers JR trains between Nagoya and Toyama via
            Takayama, between Tsuruga, Kyoto and Osaka, and to Kansai Airport; non-reserved seats on the Hokuriku
            Shinkansen between Toyama and Tsuruga; and the Nohi, Hokutetsu, Toyama Chitetsu and Kaetsuno buses that
            link Takayama, Shirakawa-go, Kanazawa, Toyama and Shin-Takaoka (some bus seats need a reservation).
            Reserved seats on JR limited expresses and the Hokuriku Shinkansen are free up to six times.
          </p>
          <p className={styles.bodyText}>
            It is a JR Central pass, booked online through JR-WEST ONLINE TRAIN RESERVATION from one month ahead, as
            an exchange order from an agency outside Japan such as Klook, or at a station. The Tokaido Shinkansen
            between Kyoto and Shin-Osaka is not covered. From JR Central&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrTakayamaHokurikuAreaPass.url, label: "Check the Takayama-Hokuriku pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥19,800 / ¥9,900" },
        { label: "Validity", value: "5 consecutive days" },
        { label: "Free reserved seats", value: "Up to 6 times" },
        { label: "Buses", value: "Takayama ⇔ Shirakawa-go ⇔ Kanazawa / Toyama / Shin-Takaoka" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> this is the pass if Shirakawa-go is on the route, because the buses are
          included, and neither JR West Hokuriku pass below includes them. For Kanazawa and Toyama without the mountain
          side, JR West&apos;s Kansai-Hokuriku Area Pass (¥19,000, 7 days) gives two more days for less.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Takayama-Hokuriku Area Tourist Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, five days. Child prices apply from 6 to 11.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Child (6–11)", "Days"],
            rows: [["Takayama-Hokuriku Area Tourist Pass", "¥19,800", "¥9,900", "5 consecutive"]],
            note: (
              <>
                JR Central, touristpass.jp, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Takayama-Hokuriku pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Central warns that a sight off the mapped lines can cost extra, so check the access to each place
              before you rely on the pass for it.
            </p>
          ),
          table: {
            head: ["Service", "Section", "Seats"],
            rows: [
              ["JR lines", "Nagoya ⇔ Toyama via the Takayama Line", "Non-reserved; reserved seats free up to 6 times"],
              ["JR lines", "Tsuruga ⇔ Kyoto ⇔ Osaka city stations; Osaka ⇔ Kansai Airport", "Non-reserved; reserved seats free up to 6 times"],
              ["Hokuriku Shinkansen", "Toyama ⇔ Tsuruga", "Non-reserved; reserved seats count toward the 6"],
              ["Nohi / Hokutetsu / Meitetsu / Toyama Chitetsu buses", "Takayama ⇔ Shirakawa-go ⇔ Kanazawa / Toyama", "Reservations required, with some exceptions"],
              ["Nohi / Kaetsuno / Dolphin Traffic buses", "Takayama ⇔ Shirakawa-go ⇔ Shin-Takaoka", "Reservations required, with some exceptions"],
              ["Kaetsuno World Heritage Bus", "Shirakawa-go ⇔ Shin-Takaoka", "—"],
              ["Tokaido Shinkansen", "Kyoto ⇔ Shin-Osaka — not covered", "Fare and charge payable"],
            ],
            note: (
              <>
                JR Central, touristpass.jp, checked {CHECKED}. From 25 December 2026 to 5 January 2027 every seat on
                the Limited Express &ldquo;Hida&rdquo; (Nagoya–Takayama–Toyama) is reserved-only: get the free
                reserved-seat ticket before boarding.
              </>
            ),
          },
        },
        {
          label: "Which pass",
          title: "Takayama-Hokuriku pass vs Kansai-Hokuriku and Hokuriku Area",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The bus lines are the difference. Without Shirakawa-go or Takayama, a JR West pass is the cheaper fit.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Shirakawa-go buses"],
            rows: [
              ["Takayama-Hokuriku Area Tourist Pass", "¥19,800", "5", "Included"],
              ["Kansai-Hokuriku Area Pass (JR West)", "¥19,000", "7", "Not included"],
              ["Hokuriku Area Pass (JR West)", "¥7,000", "4", "Not included"],
            ],
            note: <>touristpass.jp and JR West pass pages, checked {CHECKED}.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Takayama-Hokuriku Area Tourist Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Central lists three ways. Buying on Klook is the &ldquo;travel agent outside Japan&rdquo; route: you
              receive an exchange order and collect the pass at an exchange location in Japan. Holders of the pass
              also get 10% off the Kurobe Gorge Railway fare from Unazuki (the fare from Toyama to Unazuki is not in
              the pass).
            </p>
          ),
          table: {
            head: ["Where", "How it works"],
            rows: [
              ["Online", "JR-WEST ONLINE TRAIN RESERVATION, from one month before boarding (10:00 JST); collect at a pickup location"],
              ["Travel agent outside Japan (e.g. Klook)", "Exchange order, exchanged in Japan at an exchange location"],
              ["At a station", "Ticket offices listed by JR Central"],
            ],
            note: <>JR Central, touristpass.jp, checked {CHECKED}.</>,
          },
          ctas: [{ href: jrTakayamaHokurikuAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Shirakawa-go and Kanazawa, booked alongside",
        intro: "A guided Kanazawa day, the Shirakawa-go light-up from Takayama, and the Kanazawa hotel search.",
        tours: [kanazawaKenrokuenHigashiChayaDayTour, shirakawagoLightUpTakayamaDayTour, kanazawaHotels],
      }}
      links={
        <p className={styles.bodyText}>
          Our{" "}
          <Link href="/guides/attractions/takayama-shirakawago-tour" style={linkStyle}>Takayama and Shirakawa-go tour guide</Link>{" "}
          compares the pass with a guided day, and the{" "}
          <Link href="/guides/attractions/shirakawago-winter-light-up" style={linkStyle}>Shirakawa-go winter light-up</Link>{" "}
          guide covers the light-up evenings. For the far end, see the{" "}
          <Link href="/guides/attractions/kanazawa-2-day-itinerary" style={linkStyle}>Kanazawa 2 day itinerary</Link>; starting in Nagoya, the{" "}
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2 day itinerary</Link>{" "}
          and{" "}
          <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" style={linkStyle}>Tokyo to Nagoya by shinkansen</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Takayama-Hokuriku Area Tourist Pass?",
          a: `¥19,800 for adults and ¥9,900 for children aged 6 to 11, for 5 consecutive days. JR Central's touristpass.jp, checked ${CHECKED}.`,
        },
        {
          q: "Does the Takayama-Hokuriku pass include the bus to Shirakawa-go?",
          a: "Yes. The Nohi and partner buses between Takayama, Shirakawa-go and Kanazawa, Toyama or Shin-Takaoka are included, and the Kaetsuno World Heritage Bus between Shirakawa-go and Shin-Takaoka. Most need a seat reservation.",
        },
        {
          q: "How many reserved seats can I book with the pass?",
          a: "Reserved seats on JR limited expresses and the Hokuriku Shinkansen are free up to six times. From 25 December 2026 to 5 January 2027 the Limited Express Hida is reserved-only, so book those seats before boarding.",
        },
        {
          q: "Does the Takayama-Hokuriku pass cover the Tokaido Shinkansen?",
          a: "No. The Tokaido Shinkansen between Kyoto and Shin-Osaka is not a covered route; riding it means paying the basic fare and the additional charge.",
        },
        {
          q: "Can I start the Takayama-Hokuriku pass in Osaka?",
          a: "Yes. The JR sections include Tsuruga to Kyoto and the stations within Osaka City, and Osaka to Kansai Airport, so the loop can start or end in Osaka or Nagoya.",
        },
      ]}
      related={[
        { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tour" },
        { href: "/guides/transport/kansai-hokuriku-area-pass", title: "Kansai-Hokuriku Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/hokuriku-area-pass", title: "JR Hokuriku Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/attractions/shirakawago-winter-light-up", title: "Shirakawa-go Winter Light-Up" },
      ]}
      banner={{
        title: "Takayama, Shirakawa-go and Kanazawa on one pass",
        desc: "Book the exchange order before you fly, then collect the pass at an exchange location in Japan.",
        label: "View the Takayama-Hokuriku pass →",
      }}
    />
  );
}
