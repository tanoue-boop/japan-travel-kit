import Link from "next/link";
import styles from "../styles/BestEsimJapan.module.css";
import KlookLink from "./KlookLink";
import { HOTEL_AREAS, HOTEL_CITIES, WHERE_TO_STAY_GUIDES, hotelAreaUrl, type HotelAreaKey, type HotelCityKey } from "../lib/hotel-stay";

/**
 * The "Where to stay" entry block for the home page and /guides (English only),
 * added 27 Nov 2026 (task jtk-20261127-A28).
 *
 * One card per city: the site's own where-to-stay guide where there is one, and a
 * Klook hotel search for the area most readers start from. The per-area choice lives
 * on the city pages (components/HotelStayBlock.tsx); this block is only the way in.
 * data-product-type="hotel" makes the clicks reach GA4 as product_type=hotel.
 */
const CARDS: { city: HotelCityKey; area: HotelAreaKey; areaLabel: string }[] = [
  { city: "tokyo", area: "shinjuku", areaLabel: "Shinjuku" },
  { city: "kyoto", area: "kyotoStation", areaLabel: "Kyoto Station" },
  { city: "osaka", area: "namba", areaLabel: "Namba" },
  { city: "hakone", area: "hakone", areaLabel: "all of Hakone" },
  { city: "kawaguchiko", area: "kawaguchikoStation", areaLabel: "Kawaguchiko Station" },
  { city: "hiroshima", area: "hiroshimaStation", areaLabel: "Hiroshima Station" },
  { city: "kanazawa", area: "kanazawa", areaLabel: "Kanazawa" },
  { city: "sapporo", area: "sapporoStation", areaLabel: "Sapporo Station" },
];

const guideFor = (city: HotelCityKey) => WHERE_TO_STAY_GUIDES.find((g) => g.city === city)?.href;

/** `bare` drops the label and h2, for a host (the home page's HomeSection) that supplies its own. */
export default function HotelStayEntry({ heading = "Where to Stay in Japan", bare = false }: { heading?: string; bare?: boolean }) {
  return (
    <section className={styles.bodySection} data-placement="hotel-entry" data-product-type="hotel" style={bare ? undefined : { marginTop: "2rem" }}>
      {!bare && <span className={styles.sectionLabel}>Where to stay</span>}
      {!bare && <h2 className={styles.sectionTitle}>{heading}</h2>}
      <p className={styles.bodyText}>
        Pick the area before the hotel: a base on the line you will ride saves a transfer every day. Our guides compare
        the areas of{" "}
        {WHERE_TO_STAY_GUIDES.map((g, i) => (
          <span key={g.href}>
            {i > 0 && (i === WHERE_TO_STAY_GUIDES.length - 1 ? " and " : ", ")}
            <Link href={g.href} style={{ color: "var(--accent)", fontWeight: 600 }}>
              {HOTEL_CITIES[g.city].name.en}
            </Link>
          </span>
        ))}
        ; for the other cities, each button opens Klook&apos;s hotel search for that area.
      </p>
      <div className={styles.sameDayGrid}>
        {CARDS.map(({ city, area, areaLabel }) => {
          const guide = guideFor(city);
          return (
            <div key={city} className={styles.sameDayCard}>
              <span className={styles.sameDayKind}>{HOTEL_AREAS[area].station.en}</span>
              <span className={styles.sameDayTitle}>{HOTEL_CITIES[city].name.en}</span>
              {guide && (
                <Link href={guide} className={styles.sameDayWhy} style={{ color: "var(--accent)", fontWeight: 600 }}>
                  Where to stay in {HOTEL_CITIES[city].name.en} →
                </Link>
              )}
              <KlookLink
                href={hotelAreaUrl(HOTEL_AREAS[area], "en")}
                adPlacement="hotel-entry"
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.sameDayCta}
              >
                Hotels near {areaLabel} on Klook →
              </KlookLink>
            </div>
          );
        })}
      </div>
      <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        Hotel links go to Klook&apos;s own search for that area, which pays us a commission at no extra cost to you.
        Prices and availability are Klook&apos;s.
      </p>
    </section>
  );
}
