import { useMemo, useState } from "react";
import Link from "next/link";
import fx from "../data/fx-fees.json";
import tools from "../styles/Tools.module.css";

type Currency = "USD" | "EUR" | "GBP";
type Method = (typeof fx.methods)[number] & {
  overAllowancePercent?: number;
  allowanceHome?: Record<string, number>;
  weekendPercent?: number;
};

const SYMBOL: Record<Currency, string> = { USD: "$", EUR: "€", GBP: "£" };
const yen = (n: number) => `¥${Math.round(n).toLocaleString("en-US")}`;
const home = (n: number, c: Currency) => `${SYMBOL[c]}${n.toFixed(2)}`;

const AMOUNT_PRESETS = [200, 500, 1000, 2000];

/**
 * How much yen does each method actually hand you for a given amount of home
 * currency, and how much is lost to fees / spread versus the mid-market rate?
 * All arithmetic is client-side over data/fx-fees.json.
 */
export default function FxFeeComparison() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState<number>(500);
  const [rate, setRate] = useState<number>(fx.referenceRates.USD);
  const [rateTouched, setRateTouched] = useState(false);
  const [weekend, setWeekend] = useState(false);

  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    if (!rateTouched) setRate(fx.referenceRates[c]);
  };

  const rows = useMemo(() => {
    const amt = Math.max(0, amount || 0);
    const ideal = amt * rate;
    return (fx.methods as Method[])
      .map((m) => {
        let pct = m.percentFee[currency] + m.spreadPercent;
        if (m.overAllowancePercent && m.allowanceHome) {
          const over = Math.max(0, amt - m.allowanceHome[currency]);
          // blended: fee only on the portion above the monthly allowance
          pct += amt > 0 ? (over / amt) * m.overAllowancePercent : 0;
        }
        if (weekend && m.weekendPercent) pct += m.weekendPercent;
        const fixedHome = m.fixedHome[currency];
        const received = Math.max(0, (amt - fixedHome) * rate * (1 - pct / 100) - m.fixedJpy);
        const lossJpy = ideal - received;
        const lossPct = ideal > 0 ? (lossJpy / ideal) * 100 : 0;
        return { ...m, received, lossJpy, lossHome: lossJpy / rate, lossPct, effectivePct: pct };
      })
      .sort((a, b) => b.received - a.received);
  }, [amount, currency, rate, weekend]);

  const best = rows[0];
  const worst = rows[rows.length - 1];
  const spread = best && worst ? worst.lossJpy - best.lossJpy : 0;

  return (
    <div className={tools.tool} id="fx-comparison">
      <div className={tools.toolHeader}>
        <div>
          <span className={tools.toolLabel}>Interactive tool</span>
          <h3 className={tools.toolTitle}>What will you actually get in yen?</h3>
        </div>
        <span className={tools.toolLabel}>Fees as of {fx.asOf}</span>
      </div>
      <div className={tools.toolBody}>
        <div className={`${tools.fieldGrid} ${tools.fieldGrid3}`}>
          <div className={tools.field}>
            <label className={tools.fieldLabel} htmlFor="fx-amount">Amount to convert</label>
            <div className={tools.inputRow}>
              <input
                id="fx-amount"
                className={tools.input}
                type="number"
                min={1}
                step={50}
                inputMode="decimal"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
              />
              <span className={tools.inputAddon}>{currency}</span>
            </div>
            <div className={tools.chipRow} style={{ marginTop: "0.4rem" }}>
              {AMOUNT_PRESETS.map((a) => (
                <button key={a} type="button" className={`${tools.chip} ${amount === a ? tools.chipActive : ""}`} onClick={() => setAmount(a)}>
                  {SYMBOL[currency]}{a.toLocaleString("en-US")}
                </button>
              ))}
            </div>
          </div>
          <div className={tools.field}>
            <span className={tools.fieldLabel}>Your currency</span>
            <div className={tools.chipRow}>
              {(fx.currencies as Currency[]).map((c) => (
                <button key={c} type="button" className={`${tools.chip} ${currency === c ? tools.chipActive : ""}`} onClick={() => changeCurrency(c)}>
                  {SYMBOL[c]} {c}
                </button>
              ))}
            </div>
            <label className={tools.check} style={{ marginTop: "0.6rem" }}>
              <input type="checkbox" checked={weekend} onChange={(e) => setWeekend(e.target.checked)} />
              Converting on a weekend (Revolut adds ~1%)
            </label>
          </div>
          <div className={tools.field}>
            <label className={tools.fieldLabel} htmlFor="fx-rate">Mid-market rate (editable)</label>
            <div className={tools.inputRow}>
              <span className={tools.inputAddon} style={{ borderRadius: "12px 0 0 12px", borderLeft: "1.5px solid #e5e7eb", borderRight: 0 }}>
                1 {currency} =
              </span>
              <input
                id="fx-rate"
                className={tools.input}
                style={{ borderRadius: "0 12px 12px 0" }}
                type="number"
                min={1}
                step={0.5}
                inputMode="decimal"
                value={rate}
                onChange={(e) => {
                  setRateTouched(true);
                  setRate(Number(e.target.value) || 0);
                }}
              />
            </div>
            <span className={tools.fieldHint}>
              Reference only — check Google for today&apos;s rate. It scales the yen figures; the ranking doesn&apos;t change.
            </span>
          </div>
        </div>

        {best && worst && amount > 0 && (
          <div className={`${tools.result} ${tools.resultWin}`}>
            <p className={tools.resultHeadline}>
              {best.name} gives you the most: {yen(best.received)} for {home(amount, currency)}
            </p>
            <p className={tools.resultSub}>
              That&apos;s {yen(spread)} ({home(spread / rate, currency)}) more than {worst.name.toLowerCase()} for the same money —
              about {worst.lossPct.toFixed(1)}% of your cash gone versus {best.lossPct.toFixed(1)}%.
            </p>
          </div>
        )}

        <ol className={tools.rankList}>
          {rows.map((m, i) => (
            <li key={m.id} className={`${tools.rankItem} ${i === 0 ? tools.rankItemBest : i === rows.length - 1 ? tools.rankItemWorst : ""}`}>
              <span className={tools.rankNum}>{i + 1}</span>
              <div className={tools.rankMain}>
                <p className={tools.rankTitle}>
                  {m.name}
                  {i === 0 && <span className={`${tools.rankTag} ${tools.rankTagBest}`}>Best</span>}
                  {i === rows.length - 1 && <span className={`${tools.rankTag} ${tools.rankTagWorst}`}>Worst</span>}
                </p>
                <p className={tools.rankMeta}>
                  {m.desc}{" "}
                  <Link href={m.guide} className={tools.inlineLink}>
                    {m.guideLabel} →
                  </Link>
                </p>
              </div>
              <div className={tools.rankPrice}>
                <span className={tools.rankPriceMain}>{yen(m.received)}</span>
                <span className={tools.rankPriceSub}>
                  lose {yen(m.lossJpy)} ({m.lossPct.toFixed(1)}%)
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className={tools.linkRow}>
          <Link href="/guides/money/wise-card-japan" className={tools.rowCta}>Wise card review →</Link>
          <Link href="/guides/money/revolut-card-japan" className={tools.rowCta}>Revolut card review →</Link>
          <Link href="/guides/money/best-travel-card-japan" className={`${tools.rowCta} ${tools.rowCtaGhost}`}>Best travel cards for Japan →</Link>
        </div>

        <p className={tools.footnote}>
          {fx.note} &ldquo;Lose&rdquo; is the gap between what you receive and what the mid-market rate would give with zero fees.
          Not financial advice.
        </p>
      </div>
    </div>
  );
}
