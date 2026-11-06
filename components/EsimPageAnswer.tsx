import Link from "next/link";
import { cheapestPlan, formatUsd, getProvider, pricesCheckedLabel } from "../lib/esim-prices";
import { esimPageAnswers } from "../lib/esim-page-answers";
import { klookEsim } from "../lib/klook-links";
import { SIMBYE_JAPAN_DISCOUNT_URL } from "../lib/simbye";
import KlookLink from "./KlookLink";
import styles from "../styles/BestEsimJapan.module.css";

/**
 * The page's conclusion and its one button, directly under the affiliate disclosure on
 * every eSIM page. Partners run in commission order: the button is Simbye (25%), then a
 * text link each for Klook eSIM (20%) and Airalo. Holafly never appears here: we have no
 * link to it. The wording lives in lib/esim-page-answers.ts, one line per route.
 */
export default function EsimPageAnswer({ route }: { route: string }) {
  const answer = esimPageAnswers[route];
  if (!answer) throw new Error(`esim-page-answers: no answer for ${route}`);
  const from = cheapestPlan("simbye");
  return (
    <div className={styles.verdictBox} data-placement="esim-page-answer">
      <div className={styles.verdictHeader}>
        <span className={styles.verdictLabel}>The short answer</span>
      </div>
      <div className={styles.verdictBody}>
        <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
          {answer}
        </p>
        <a href={SIMBYE_JAPAN_DISCOUNT_URL} className={styles.verdictBtn} target="_blank" rel="sponsored noopener">
          Get Simbye eSIM{from ? ` from ${formatUsd(from.priceUsd)}` : ""} →
        </a>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.7rem", lineHeight: 1.6 }}>
          Or{" "}
          <KlookLink
            href={klookEsim.url}
            target="_blank"
            rel="sponsored noopener"
            style={{ color: "var(--accent)", fontWeight: 600 }}
          >
            {klookEsim.ctaLabel}
          </KlookLink>{" "}
          ·{" "}
          <a
            href={getProvider("airalo").affiliateUrl}
            target="_blank"
            rel="sponsored noopener"
            style={{ color: "var(--accent)", fontWeight: 600 }}
          >
            Get Airalo eSIM →
          </a>{" "}
          ·{" "}
          <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Best eSIM for Japan, by need
          </Link>
          <br />
          Affiliate links. Prices checked {pricesCheckedLabel()}.
        </p>
      </div>
    </div>
  );
}
