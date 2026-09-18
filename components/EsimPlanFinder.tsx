import { useMemo, useState } from "react";
import { findPlansForTrip, formatUsd, latestCheckedAt, formatDate } from "../lib/esim-prices";
import { ProviderCta } from "./EsimPlanTable";
import tools from "../styles/Tools.module.css";

type Usage = "light" | "average" | "heavy" | "custom";

const USAGE_PRESETS: Record<Exclude<Usage, "custom">, { label: string; gbPerDay: number; desc: string }> = {
  light: { label: "Light", gbPerDay: 0.3, desc: "Maps, messaging, a few photos (~300 MB/day)" },
  average: { label: "Average", gbPerDay: 0.7, desc: "Maps + social media + some video (~700 MB/day)" },
  heavy: { label: "Heavy", gbPerDay: 1.5, desc: "Streaming, video calls, hotspot (~1.5 GB/day)" },
};

const MAX_RESULTS = 5;

/**
 * "How many days × how much data" → cheapest plan that covers it.
 * Pure client-side arithmetic over the JSON snapshot — no network calls.
 */
export default function EsimPlanFinder() {
  const [days, setDays] = useState(10);
  const [usage, setUsage] = useState<Usage>("average");
  const [customGb, setCustomGb] = useState(5);

  const gbNeeded = useMemo(() => {
    if (usage === "custom") return Math.max(0.5, customGb || 0);
    return Math.ceil(USAGE_PRESETS[usage].gbPerDay * Math.max(1, days) * 10) / 10;
  }, [usage, customGb, days]);

  const matches = useMemo(() => findPlansForTrip(Math.max(1, days), gbNeeded), [days, gbNeeded]);
  const best = matches[0];
  const checked = latestCheckedAt();

  return (
    <div className={tools.tool} id="plan-finder">
      <div className={tools.toolHeader}>
        <div>
          <span className={tools.toolLabel}>Interactive tool</span>
          <h3 className={tools.toolTitle}>Find the cheapest plan for your trip</h3>
        </div>
        <span className={`${tools.liveBadge} ${tools.liveBadgeOnDark}`}>
          <span className={tools.liveDot} /> Prices checked daily
        </span>
      </div>
      <div className={tools.toolBody}>
        <div className={`${tools.fieldGrid} ${tools.fieldGrid3}`}>
          <div className={tools.field}>
            <label className={tools.fieldLabel} htmlFor="finder-days">Trip length</label>
            <div className={tools.inputRow}>
              <input
                id="finder-days"
                className={tools.input}
                type="number"
                min={1}
                max={90}
                inputMode="numeric"
                value={days}
                onChange={(e) => setDays(Math.min(90, Math.max(1, Number(e.target.value) || 1)))}
              />
              <span className={tools.inputAddon}>days</span>
            </div>
          </div>
          <div className={tools.field}>
            <label className={tools.fieldLabel} htmlFor="finder-usage">Data usage</label>
            <select id="finder-usage" className={tools.select} value={usage} onChange={(e) => setUsage(e.target.value as Usage)}>
              {(Object.keys(USAGE_PRESETS) as Array<keyof typeof USAGE_PRESETS>).map((k) => (
                <option key={k} value={k}>
                  {USAGE_PRESETS[k].label} — {USAGE_PRESETS[k].desc}
                </option>
              ))}
              <option value="custom">Custom — enter total GB</option>
            </select>
          </div>
          <div className={tools.field}>
            <label className={tools.fieldLabel} htmlFor="finder-gb">Total data needed</label>
            <div className={tools.inputRow}>
              <input
                id="finder-gb"
                className={tools.input}
                type="number"
                min={0.5}
                step={0.5}
                inputMode="decimal"
                value={usage === "custom" ? customGb : gbNeeded}
                disabled={usage !== "custom"}
                onChange={(e) => setCustomGb(Number(e.target.value) || 0)}
              />
              <span className={tools.inputAddon}>GB</span>
            </div>
            <span className={tools.fieldHint}>
              {usage === "custom" ? "Unlimited plans always qualify." : `${USAGE_PRESETS[usage].gbPerDay} GB/day × ${days} days`}
            </span>
          </div>
        </div>

        {best ? (
          <div className={`${tools.result} ${tools.resultWin}`}>
            <p className={tools.resultHeadline}>
              Cheapest for {days} {days === 1 ? "day" : "days"} &amp; {gbNeeded} GB: {best.provider} {best.name} at {formatUsd(best.priceUsd)}
            </p>
            <p className={tools.resultSub}>
              {best.unlimited
                ? "An unlimited plan — you won't need to top up."
                : `That's ${formatUsd(best.perGb ?? 0)} per GB with ${best.gb} GB of high-speed data over ${best.days} days.`}{" "}
              {matches.length > 1 && `Compared against ${matches.length - 1} other qualifying ${matches.length === 2 ? "plan" : "plans"}.`}
            </p>
          </div>
        ) : (
          <div className={`${tools.result} ${tools.resultNeutral}`}>
            <p className={tools.resultHeadline}>No single plan covers {days} days with {gbNeeded} GB</p>
            <p className={tools.resultSub}>
              Try a shorter trip length, or buy a 30-day plan and top it up in the provider&apos;s app when it runs out — Airalo, eSIM Go and Sakura Mobile all support top-ups without a new QR code.
            </p>
          </div>
        )}

        {matches.length > 0 && (
          <ol className={tools.rankList}>
            {matches.slice(0, MAX_RESULTS).map((p, i) => (
              <li key={p.id} className={`${tools.rankItem} ${i === 0 ? tools.rankItemBest : ""}`}>
                <span className={tools.rankNum}>{i + 1}</span>
                <div className={tools.rankMain}>
                  <p className={tools.rankTitle}>
                    {p.provider} — {p.name}
                    {i === 0 && <span className={`${tools.rankTag} ${tools.rankTagBest}`}>Best price</span>}
                  </p>
                  <p className={tools.rankMeta}>
                    {p.network}
                    {p.note ? ` · ${p.note}` : ""}
                    {p.days > days ? ` · ${p.days - days} spare ${p.days - days === 1 ? "day" : "days"}` : ""}
                  </p>
                </div>
                <div className={tools.rankPrice}>
                  <span className={tools.rankPriceMain}>{formatUsd(p.priceUsd)}</span>
                  <span className={tools.rankPriceSub}>{p.perGb === null ? "unlimited" : `${formatUsd(p.perGb)}/GB`}</span>
                  <div style={{ marginTop: "0.4rem" }}>
                    <ProviderCta providerId={p.providerId} label="Get plan →" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}

        <p className={tools.footnote}>
          Prices in USD, last checked {formatDate(checked)}. The finder only lists plans whose validity covers your whole trip and whose data allowance meets your estimate; it doesn&apos;t stack multiple plans.
        </p>
      </div>
    </div>
  );
}
