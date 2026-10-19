import styles from "../styles/BestEsimJapan.module.css";
import type { KlookStayArea } from "../lib/klook-links";

/**
 * "Where to stay so getting around is easy" — a short section for the city
 * transport and airport-transfer guides. One Klook hotel link per area, which
 * is the 6.5% Klook band rather than the 5% transport band the rest of those
 * pages sell into.
 *
 * The `why` text on each area comes from lib/klook-links.ts and is written to
 * agree with the lines and fares the host page already states.
 */
type Props = {
  heading: string;
  intro: string;
  areas: KlookStayArea[];
};

export default function KlookStayAreas({ heading, intro, areas }: Props) {
  return (
    <section className={styles.bodySection}>
      <span className={styles.sectionLabel}>Where to stay</span>
      <h2 className={styles.sectionTitle}>{heading}</h2>
      <p className={styles.bodyText}>{intro}</p>
      <ul className={styles.pickList}>
        {areas.map((a) => (
          <li key={a.area}>
            <span className={styles.proIcon}>▸</span>
            <span>
              <strong>{a.area}</strong> — {a.why}{" "}
              <a
                href={a.url}
                target="_blank"
                rel="sponsored noopener"
                style={{ color: "#1d4ed8", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Hotels on Klook →
              </a>
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
        Hotel links go to Klook&apos;s own search for that area, which pays us a commission at no extra
        cost to you. Prices and availability are Klook&apos;s.
      </p>
    </section>
  );
}
