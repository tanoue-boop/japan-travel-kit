import { useMemo, useState } from "react";
import Link from "next/link";
import fares from "../data/jr-fares.json";
import tools from "../styles/Tools.module.css";

type Segment = (typeof fares.segments)[number];
type Pass = (typeof fares.passes)[number];

const yen = (n: number) => `¥${Math.round(n).toLocaleString("en-US")}`;

const JR_PASS_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F";

// Pre-set itineraries so first-time visitors can see the answer in one click.
const PRESETS: { label: string; ids: string[]; roundTrip: string[] }[] = [
  { label: "Golden Route (Tokyo → Kyoto → Osaka → Tokyo)", ids: ["tokyo-kyoto", "kyoto-osaka", "tokyo-shin-osaka"], roundTrip: [] },
  { label: "Tokyo ⇄ Kyoto + Hiroshima day trip", ids: ["tokyo-kyoto", "kyoto-hiroshima"], roundTrip: ["tokyo-kyoto", "kyoto-hiroshima"] },
  { label: "Big loop: Tokyo → Kanazawa → Kyoto → Hiroshima → Tokyo", ids: ["tokyo-kanazawa", "kanazawa-kyoto", "kyoto-hiroshima", "tokyo-hiroshima"], roundTrip: [] },
];

/**
 * Tick the JR-covered legs you'll actually ride, pick a pass length, and see
 * instantly whether the pass beats buying tickets one by one. Pure client-side.
 */
export default function JrPassCalculator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ "tokyo-kyoto": true, "tokyo-shin-osaka": true });
  const [roundTrip, setRoundTrip] = useState<Record<string, boolean>>({});
  const [passId, setPassId] = useState<string>("7");
  const [extraYen, setExtraYen] = useState<number>(0);

  const groups = useMemo(() => {
    const map = new Map<string, Segment[]>();
    for (const s of fares.segments) map.set(s.group, [...(map.get(s.group) ?? []), s]);
    return Array.from(map.entries());
  }, []);

  const chosen = fares.segments.filter((s) => selected[s.id]);
  const legs = chosen.reduce((n, s) => n + (roundTrip[s.id] ? 2 : 1), 0);
  const total = chosen.reduce((sum, s) => sum + s.fareYen * (roundTrip[s.id] ? 2 : 1), 0) + Math.max(0, extraYen || 0);
  const pass: Pass = fares.passes.find((p) => p.id === passId) ?? fares.passes[0];
  const diff = total - pass.priceYen;
  const worthIt = diff >= 0;
  const pct = Math.min(100, (total / pass.priceYen) * 100);

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setSelected(Object.fromEntries(p.ids.map((id) => [id, true])));
    setRoundTrip(Object.fromEntries(p.roundTrip.map((id) => [id, true])));
  };

  return (
    <div className={tools.tool} id="jr-pass-calculator">
      <div className={tools.toolHeader}>
        <div>
          <span className={tools.toolLabel}>Interactive tool</span>
          <h3 className={tools.toolTitle}>JR Pass break-even calculator</h3>
        </div>
        <span className={tools.toolLabel}>Ordinary car · reserved seats</span>
      </div>
      <div className={tools.toolBody}>
        <div className={tools.fieldGrid} style={{ marginBottom: "1rem" }}>
          <div className={tools.field}>
            <label className={tools.fieldLabel} htmlFor="jr-pass">Pass length</label>
            <select id="jr-pass" className={tools.select} value={passId} onChange={(e) => setPassId(e.target.value)}>
              {fares.passes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {yen(p.priceYen)}
                </option>
              ))}
            </select>
          </div>
          <div className={tools.field}>
            <span className={tools.fieldLabel}>Quick itineraries</span>
            <div className={tools.chipRow}>
              {PRESETS.map((p) => (
                <button key={p.label} type="button" className={tools.chip} onClick={() => applyPreset(p)}>
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                className={tools.chip}
                onClick={() => {
                  setSelected({});
                  setRoundTrip({});
                  setExtraYen(0);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <span className={tools.fieldLabel} style={{ display: "block", marginBottom: "0.5rem" }}>
          Tick the JR legs you&apos;ll ride (one-way fare shown; tick &ldquo;×2&rdquo; for a round trip)
        </span>
        {groups.map(([group, segs]) => (
          <div key={group} className={tools.segList}>
            <span className={tools.fieldHint} style={{ fontWeight: 700, color: "#6b7280" }}>{group}</span>
            {segs.map((s: Segment) => {
              const on = !!selected[s.id];
              return (
                <div key={s.id} className={`${tools.seg} ${on ? tools.segOn : ""}`}>
                  <input
                    id={`seg-${s.id}`}
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(s.id)}
                    style={{ accentColor: "#c62828", width: "1.05rem", height: "1.05rem", cursor: "pointer" }}
                  />
                  <label htmlFor={`seg-${s.id}`} style={{ cursor: "pointer" }}>
                    <p className={tools.segName}>
                      {s.from} → {s.to}
                    </p>
                    <p className={tools.segMeta}>
                      {s.train} · ~{Math.floor(s.minutes / 60)}h{s.minutes % 60 ? ` ${s.minutes % 60}m` : ""}
                    </p>
                  </label>
                  <span className={tools.segFare}>{yen(s.fareYen)}</span>
                  <label className={tools.segRt}>
                    <input
                      type="checkbox"
                      checked={!!roundTrip[s.id]}
                      disabled={!on}
                      onChange={() => setRoundTrip((r) => ({ ...r, [s.id]: !r[s.id] }))}
                      aria-label={`Round trip ${s.from} to ${s.to}`}
                    />
                    ×2
                  </label>
                </div>
              );
            })}
          </div>
        ))}

        <div className={tools.field} style={{ maxWidth: 360, marginBottom: "1.25rem" }}>
          <label className={tools.fieldLabel} htmlFor="jr-extra">Other covered JR fares (optional)</label>
          <div className={tools.inputRow}>
            <span className={tools.inputAddon} style={{ borderRadius: "12px 0 0 12px", borderLeft: "1.5px solid #e5e7eb", borderRight: 0 }}>¥</span>
            <input
              id="jr-extra"
              className={tools.input}
              style={{ borderRadius: "0 12px 12px 0" }}
              type="number"
              min={0}
              step={100}
              inputMode="numeric"
              value={extraYen || ""}
              placeholder="e.g. 4000"
              onChange={(e) => setExtraYen(Number(e.target.value) || 0)}
            />
          </div>
          <span className={tools.fieldHint}>JR local trains, Yamanote loop, JR buses, Miyajima ferry… (not subways or private railways)</span>
        </div>

        <div className={`${tools.result} ${legs === 0 && !extraYen ? tools.resultNeutral : worthIt ? tools.resultWin : tools.resultLose}`}>
          {legs === 0 && !extraYen ? (
            <>
              <p className={tools.resultHeadline}>Pick your train legs above</p>
              <p className={tools.resultSub}>The {pass.name} pass costs {yen(pass.priceYen)}. Select the legs you&apos;ll ride to see whether it pays off.</p>
            </>
          ) : worthIt ? (
            <>
              <p className={tools.resultHeadline}>✓ Worth it — you save {yen(diff)} with the {pass.name} pass</p>
              <p className={tools.resultSub}>
                Your {legs} {legs === 1 ? "leg adds" : "legs add"} up to {yen(total)} in individual tickets, versus {yen(pass.priceYen)} for the pass.
                {diff < 5000 && " It's close: if you might skip one leg, buy tickets individually instead."}
              </p>
            </>
          ) : (
            <>
              <p className={tools.resultHeadline}>✗ Not worth it — the pass costs {yen(-diff)} more than tickets</p>
              <p className={tools.resultSub}>
                Your {legs} {legs === 1 ? "leg comes" : "legs come"} to {yen(total)}. You&apos;d need another {yen(-diff)} of covered JR travel within {pass.days} days to break even.
              </p>
            </>
          )}
          <div className={tools.bar} aria-hidden="true">
            <div className={`${tools.barFill} ${worthIt ? tools.barFillWin : ""}`} style={{ width: `${pct}%` }} />
          </div>
          <div className={tools.barCaption}>
            <span>Tickets: {yen(total)}</span>
            <span>Break-even: {yen(pass.priceYen)}</span>
          </div>
          <div className={tools.statGrid}>
            <div className={tools.stat}>
              <p className={tools.statLabel}>Individual tickets</p>
              <p className={tools.statValue}>{yen(total)}</p>
            </div>
            <div className={tools.stat}>
              <p className={tools.statLabel}>{pass.name} pass</p>
              <p className={tools.statValue}>{yen(pass.priceYen)}</p>
            </div>
            <div className={tools.stat}>
              <p className={tools.statLabel}>{worthIt ? "You save" : "Pass costs extra"}</p>
              <p className={`${tools.statValue} ${worthIt ? tools.statValueGreen : tools.statValueRed}`}>{yen(Math.abs(diff))}</p>
            </div>
          </div>
          <div className={tools.linkRow}>
            {worthIt && legs > 0 ? (
              <a href={JR_PASS_URL} className={tools.rowCta} target="_blank" rel="noopener noreferrer nofollow">
                Buy the {pass.name} JR Pass →
              </a>
            ) : (
              <Link href="/guides/transport/shinkansen-guide" className={tools.rowCta}>
                How to buy individual Shinkansen tickets →
              </Link>
            )}
            <Link href="/guides/transport/jr-pass-guide" className={`${tools.rowCta} ${tools.rowCtaGhost}`}>
              JR Pass guide
            </Link>
          </div>
        </div>

        <p className={tools.footnote}>
          {fares.note} {fares.passNote}
        </p>
      </div>
    </div>
  );
}
