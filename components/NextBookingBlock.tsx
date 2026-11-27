import Link from "next/link";
import KlookLink from "./KlookLink";
import type { Locale } from "../lib/i18n";
import {
  NEXT_BOOKING_HEADING,
  NEXT_BOOKING_NOTE,
  NEXT_BOOKING_PLACEMENT,
  nextBookingRows,
  type NextBookingRegion,
} from "../lib/next-booking";

/**
 * "Same trip: what to book next" — up to three rows directly under a ticket page's
 * main CTA, each with our guide to the next booking (internal link) and that guide's
 * main Klook product (task jtk-20261127-A34). Rows and copy: lib/next-booking.ts.
 *
 * The wrapper's data-placement="next-booking" is what pages/_app.tsx reads into
 * affiliate_click's `placement`. The Klook link carries the destination guide's ad
 * id (`adPage`), so Klook's report credits the product's own row.
 */
type Props = { region: NextBookingRegion; locale?: Locale };

export default function NextBookingBlock({ region, locale = "en" }: Props) {
  const rows = nextBookingRows(region, locale);
  return (
    <div
      data-placement={NEXT_BOOKING_PLACEMENT}
      style={{
        marginTop: "1rem",
        padding: "0.85rem 1rem",
        border: "1px solid var(--border)",
        borderLeft: "3px solid var(--accent)",
        background: "var(--white)",
        fontSize: "0.9rem",
        lineHeight: 1.55,
      }}
    >
      <p style={{ margin: "0 0 0.45rem", fontWeight: 700 }}>{NEXT_BOOKING_HEADING[locale]}</p>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {rows.map((row) => (
          <li key={row.guideHref} style={{ marginBottom: "0.35rem" }}>
            <Link href={row.guideHref} style={{ fontWeight: 600 }}>
              {row.guide}
            </Link>
            {" — "}
            {row.note}
            {" · "}
            <KlookLink
              href={row.klookUrl}
              adPage={row.adPage}
              target="_blank"
              rel="sponsored nofollow noopener"
              style={{ color: "var(--accent)", fontWeight: 600 }}
            >
              {row.klook} →
            </KlookLink>
          </li>
        ))}
      </ul>
      <p style={{ margin: "0.35rem 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>{NEXT_BOOKING_NOTE[locale]}</p>
    </div>
  );
}
