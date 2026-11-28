import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nijoCastleTicket, kyotoMangaMuseumTicket, kyotoRailwayMuseumTicket, toeiKyotoStudioParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the castle's own pages, read by node fetch on 28 Nov 2026:
// nijo-jocastle.city.kyoto.lg.jp/admission/fee/ (entry adult 800 (group 700), junior and senior high 400, elementary 300;
// entry + Ninomaru Palace 1,300 (group 1,100) / 400 / 300; Honmaru Palace 1,000 / 300 / 200, reservation only, entry
// ticket extra, web sales from 30 days before; exhibition hall 100; under elementary free; Ninomaru add-on at the
// information centre 500; subway one-day ticket holders pay 700 for entry at the gate) and /guide/annai/ (entry 8:45-16:00,
// castle closes 17:00; Ninomaru reception 8:45-16:10; Honmaru 9:30-16:00; closed 29-31 Dec; Ninomaru closed Tuesdays in
// January, July, August and December (next day if a holiday), 26-28 Dec and 1-3 Jan; Honmaru closed on the third Monday
// and the next day, 26-28 Dec and 1-3 Jan). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/nijo-castle-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://nijo-jocastle.city.kyoto.lg.jp/admission/fee/";
const HOURS = "https://nijo-jocastle.city.kyoto.lg.jp/guide/annai/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NijoCastleTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nijo Castle tickets"
      title="Nijo Castle Tickets 2026: Price, Hours & Honmaru Palace"
      description="Nijo Castle 2026: ¥1,300 for adults with the Ninomaru Palace, ¥800 for the grounds only; Honmaru Palace ¥1,000 by reservation. Entry 8:45–16:00."
      h1={<>Nijo Castle Tickets 2026: <br />Price, Hours &amp; Honmaru Palace</>}
      subtitle="What entry to Kyoto’s shogun castle costs, which ticket includes the Ninomaru Palace, and when the palaces close in winter."
      badges={[`Checked ${CHECKED}`, "Adults ¥1,300", "Last entry 16:00"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Nijo Castle with the Ninomaru Palace is ¥1,300 for adults</strong>; the grounds alone are ¥800. Junior
            and senior high school students pay ¥400 and elementary school children ¥300 for either ticket, and younger
            children enter free. The Honmaru Palace is a separate ¥1,000 ticket that must be reserved online in advance.
          </p>
          <p className={styles.bodyText}>
            Entry is from <strong>8:45 a.m. to 4 p.m.</strong>, and the castle closes at 5 p.m. It is closed from 29 to 31
            December, and the Ninomaru Palace is closed on Tuesdays in December and January. Klook sells the castle and
            Ninomaru Palace ticket. Nijo Castle, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nijoCastleTicket.url, label: "Check the Nijo Castle ticket on Klook →" }}
      stats={[
        { label: "Entry + Ninomaru Palace", value: "¥1,300" },
        { label: "Grounds only", value: "¥800" },
        { label: "Honmaru Palace (reserved)", value: "¥1,000" },
        { label: "Entry", value: "8:45–16:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the ¥1,300 ticket with the Ninomaru Palace is the one most visitors want; add the
          Honmaru Palace only if you can book a slot, and avoid Tuesdays in December and January.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              If you bought the grounds-only ticket, you can add the Ninomaru Palace at the information centre for ¥500. The
              Honmaru Palace ticket does not include entry, and sells online from 30 days before. With a Kyoto subway one-day
              ticket, adult entry at the castle ticket office is ¥700.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Junior / senior high", "Elementary"],
            rows: [
              ["Entry + Ninomaru Palace", "¥1,300", "¥400", "¥300"],
              ["Entry (grounds only)", "¥800", "¥400", "¥300"],
              ["Honmaru Palace (reservation, entry extra)", "¥1,000", "¥300", "¥200"],
              ["Painting exhibition hall (entry extra)", "¥100", "—", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Children under elementary school age are free. Group rates apply from 30 people. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Nijo Castle open?",
          body: (
            <p className={styles.bodyText}>
              Entry is from 8:45 a.m. to 4 p.m. and the castle closes at 5 p.m.; the Ninomaru Palace takes visitors until 4:10
              p.m. and the Honmaru Palace from 9:30 a.m. to 4 p.m. The castle is closed from 29 to 31 December. The Ninomaru
              Palace is also closed on Tuesdays in January, July, August and December, on 26–28 December and on 1–3 January.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: nijoCastleTicket.url, label: "Book Nijo Castle on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Kyoto",
        intro: "The castle is in central Kyoto, so it pairs with these.",
        tours: [kyotoMangaMuseumTicket, kyotoRailwayMuseumTicket, toeiKyotoStudioParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For a full plan, see the <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>Kyoto 2-day itinerary</Link> or
          <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>things to do in Kyoto</Link>. A short walk away is the
          <Link href="/guides/attractions/kyoto-international-manga-museum-tickets" style={linkStyle}>Kyoto International Manga Museum</Link>, and the
          <Link href="/guides/transport/kyoto-subway-bus-pass" style={linkStyle}>Kyoto subway and bus pass</Link> takes ¥100 off adult entry.
        </p>
      }
      faq={[
        {
          q: "How much is Nijo Castle?",
          a: `Entry with the Ninomaru Palace is ¥1,300 for adults, ¥400 for junior and senior high school students and ¥300 for elementary school children. Grounds only is ¥800 for adults. Checked ${CHECKED}.`,
        },
        {
          q: "Do I need to book the Honmaru Palace?",
          a: "Yes. The Honmaru Palace is reservation only, ¥1,000 for adults on top of an entry ticket, sold online from 30 days before.",
        },
        {
          q: "What are the opening hours?",
          a: "Entry from 8:45 to 16:00, and the castle closes at 17:00. The Ninomaru Palace takes visitors until 16:10.",
        },
        {
          q: "When is it closed?",
          a: "The castle is closed from 29 to 31 December. The Ninomaru Palace is also closed on Tuesdays in January, July, August and December, on 26–28 December and on 1–3 January.",
        },
        {
          q: "Is there a discount with a Kyoto day pass?",
          a: "Yes. Show a subway one-day ticket or subway and bus one-day ticket at the castle ticket office on the day and adult entry is ¥700 instead of ¥800.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2-Day Itinerary" },
        { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto" },
        { href: "/guides/attractions/kyoto-international-manga-museum-tickets", title: "Kyoto International Manga Museum Tickets" },
        { href: "/guides/transport/kyoto-subway-bus-pass", title: "Kyoto Subway & Bus Pass" },
      ]}
      banner={{
        title: "The shogun’s castle in central Kyoto",
        desc: "Nijo Castle and the Ninomaru Palace on one ticket.",
        label: "View the Nijo Castle ticket →",
      }}
    />
  );
}
