import type { ReactNode } from "react";
import { klookEsim } from "../lib/klook-links";
import { airaloTrackedUrl, ESIM_PLACEMENT, pageTag } from "../lib/esim-placement";
import { getProvider } from "../lib/esim-prices";
import { VERDICT_CHECKED, verdictPrices as P, verdictSources as S } from "../lib/esim-verdict";
import KlookLink from "./KlookLink";
import styles from "../styles/BestEsimJapan.module.css";

/**
 * The one conclusion box at the top of the six eSIM pages with the most impressions
 * (task jtk-20261127-A31): a one-line answer, then a three-row table by use, one button
 * per row. It replaces each page's own "short answer" box rather than sitting beside it.
 *
 *   Short trip  -> Klook Japan eSIM (activity 109393; KlookLink adds the page's aff_adid)
 *   Unlimited   -> Airalo Unlimited (Impact link, subId1 = esim-verdict, subId2 = page)
 *   Long stay   -> Sakura Mobile (its affiliate link)
 *
 * Every yen figure is in lib/esim-verdict.ts with the page it was read on. GA4 tells the
 * box apart by `data-placement="esim-verdict"` (esim_click / affiliate_click `placement`).
 *
 * `lead` replaces the default first line, and `top` adds one button above the table — the
 * Sakura Mobile review uses both so the brand searcher's sign-up button comes first.
 */
/** "https://www.airalo.com/japan-esim" -> "airalo.com/japan-esim". */
const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function EsimVerdictBox({
  route,
  lead,
  top,
  label = "The answer",
}: {
  route: string;
  lead?: ReactNode;
  top?: "sakura";
  label?: string;
}) {
  const placement = ESIM_PLACEMENT.verdict;
  const sakuraUrl = getProvider("sakura").affiliateUrl;
  const airaloUrl = airaloTrackedUrl(placement, pageTag(route));
  const btn = { padding: "0.55rem 1rem", fontSize: "0.8rem", whiteSpace: "nowrap" as const };
  const cell = { fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.55 };
  return (
    <div className={styles.verdictBox} data-placement={placement} style={{ marginBottom: "2.5rem" }}>
      <div className={styles.verdictHeader}>
        <span className={styles.verdictLabel}>{label}</span>
      </div>
      <div className={styles.verdictBody}>
        <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
          {lead ?? (
            <>
              <strong>Most travellers: Klook Japan eSIM</strong> (SoftBank 5G or IIJ/docomo, data only, 1–30 days).{" "}
              <strong>Long stay or need a Japanese phone number: Sakura Mobile</strong>, from {P.sakuraMonthly5Gb} a
              month.
            </>
          )}
        </p>
        {top === "sakura" ? (
          <p style={{ margin: "0 0 1.1rem" }}>
            <a href={sakuraUrl} className={styles.verdictBtn} target="_blank" rel="sponsored nofollow noopener">
              Sign up for Sakura Mobile →
            </a>
          </p>
        ) : null}
        <div className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Your trip</th>
                  <th>Get</th>
                  <th>Price (checked {VERDICT_CHECKED})</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tdProvider} style={{ minWidth: "120px" }}>Short trip (up to 30 days)</td>
                  <td style={{ ...cell, minWidth: "190px" }}>
                    <strong>Klook Japan eSIM</strong> — SoftBank 5G or IIJ (docomo), hotspot allowed
                  </td>
                  <td style={{ ...cell, minWidth: "170px" }}>
                    Changes by date; Klook shows yours before you pay
                  </td>
                  <td>
                    <KlookLink href={klookEsim.url} className={styles.pickCta} style={btn} target="_blank" rel="sponsored nofollow noopener">
                      Check Klook eSIM →
                    </KlookLink>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdProvider}>Unlimited data</td>
                  <td style={{ ...cell, minWidth: "190px" }}>
                    <strong>Airalo Unlimited</strong> — 3 GB a day at up to 20 Mbps, then slower
                  </td>
                  <td style={{ ...cell, minWidth: "170px" }}>
                    {P.airaloUnlimited3Days} / 3 days · {P.airaloUnlimited7Days} / 7 days
                  </td>
                  <td>
                    <a href={airaloUrl} className={styles.pickCta} style={btn} target="_blank" rel="sponsored nofollow noopener">
                      Get Airalo Unlimited →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdProvider}>Long stay, Japanese number</td>
                  <td style={{ ...cell, minWidth: "190px" }}>
                    <strong>Sakura Mobile</strong> monthly Voice + Data SIM or eSIM (docomo, 070/080/090 number)
                  </td>
                  <td style={{ ...cell, minWidth: "170px" }}>
                    {P.sakuraMonthly5Gb} a month (5 GB) + {P.sakuraActivation} activation; calls extra
                  </td>
                  <td>
                    <a href={sakuraUrl} className={styles.pickCta} style={btn} target="_blank" rel="sponsored nofollow noopener">
                      Sign up for Sakura →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.7rem", lineHeight: 1.6 }}>
          {/* Plain text, not links: an airalo.com or sakuramobile.jp anchor inside this block
              would be counted as an eSIM referral by the click handler in pages/_app.tsx. */}
          Affiliate links. Prices read on {VERDICT_CHECKED}: Airalo on {host(S.airalo)} (shown in yen; your
          currency may differ) with its speed terms on {host(S.airaloFairUse)}; Sakura Mobile on{" "}
          {host(S.sakuraMonthly)} (tax included). Klook&apos;s network and hotspot terms are from its listing, read{" "}
          {klookEsim.specsCheckedAt}.
        </p>
      </div>
    </div>
  );
}
