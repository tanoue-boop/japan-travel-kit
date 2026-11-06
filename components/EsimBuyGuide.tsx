import type { EsimPicksCopy, PhoneRowId } from "../lib/esim-picks-copy";
import styles from "../styles/BestEsimJapan.module.css";

const PROVIDERS: { id: PhoneRowId; name: string }[] = [
  { id: "simbye", name: "Simbye" },
  { id: "klook", name: "Klook" },
  { id: "airalo", name: "Airalo" },
  { id: "esimgo", name: "eSIM Go (Breeze)" },
  { id: "sakura", name: "Sakura Mobile" },
  { id: "holafly", name: "Holafly" },
];

/**
 * Phone check, purchase-to-connected steps and common mistakes, in the page's language.
 * An empty provider line in the copy prints "not stated officially": we say so rather
 * than fill the gap. Styled with the same classes as the rest of the pillar page.
 */
export default function EsimBuyGuide({ copy }: { copy: EsimPicksCopy }) {
  return (
    <>
      <section className={styles.bodySection}>
        <span className={styles.sectionLabel}>{copy.phoneLabel}</span>
        <h2 className={styles.sectionTitle}>{copy.phoneHeading}</h2>
        <p className={styles.bodyText}>{copy.phoneIntro}</p>
        <div className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{copy.phoneCols.provider}</th>
                  <th>{copy.phoneCols.how}</th>
                </tr>
              </thead>
              <tbody>
                {PROVIDERS.map(({ id, name }) => (
                  <tr key={id}>
                    <td className={styles.tdProvider}>{name}</td>
                    <td style={{ fontSize: "0.85rem", color: "var(--text)", minWidth: "240px" }}>
                      {copy.phoneRows[id] || copy.notStated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          {copy.guideChecked}
        </p>
      </section>

      <section className={styles.installSection}>
        <span className={styles.sectionLabel}>{copy.stepsLabel}</span>
        <h2 className={styles.sectionTitle}>{copy.stepsHeading}</h2>
        <div className={styles.stepsList}>
          {copy.steps.map((step, i) => (
            <div key={step.title} className={styles.stepCard}>
              <span className={styles.stepNum}>{i + 1}</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.bodySection}>
        <span className={styles.sectionLabel}>{copy.failLabel}</span>
        <h2 className={styles.sectionTitle}>{copy.failHeading}</h2>
        <div className={styles.stepsList}>
          {copy.fails.map((fail, i) => (
            <div key={fail.title} className={styles.stepCard}>
              <span className={styles.stepNum}>{i + 1}</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>{fail.title}</p>
                <p className={styles.stepDesc}>{fail.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
