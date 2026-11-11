import { useMemo, useState } from "react";
import KlookLink from "./KlookLink";
import type { TrackerRow } from "../lib/esim-tracker-core";
import styles from "../styles/BestEsimJapan.module.css";
import tools from "../styles/Tools.module.css";

/**
 * The sortable plan table on /guides/esim/japan-esim-price-tracker.
 *
 * Order is price only: every view starts sorted by USD price (the unlimited view by
 * price per day), and the reader can re-sort by any numeric column. Whether a provider
 * pays us decides only what its button says, never where its row sits.
 */

export type BuyLink = { href: string; label: string; kind: "klook" | "partner" | "official" };

type View = "7" | "15" | "30" | "unlimited" | "all";
type SortKey = "priceUsd" | "perGbUsd" | "gb" | "days" | "perDay" | "provider";

const VIEWS: { id: View; label: string }[] = [
  { id: "7", label: "7 days" },
  { id: "15", label: "15 days" },
  { id: "30", label: "30 days" },
  { id: "unlimited", label: "Unlimited" },
  { id: "all", label: "All plans" },
];

const usd = (n: number) => `$${n.toFixed(2)}`;

function native(r: TrackerRow): string | null {
  if (r.currency === "USD") return null;
  if (r.currency === "JPY") return `¥${r.price.toLocaleString("en-US")}`;
  return `${r.currency} ${r.price}`;
}

function sortValue(r: TrackerRow, key: SortKey): number | string {
  switch (key) {
    case "provider":
      return r.provider;
    case "perDay":
      return r.priceUsd / r.days;
    case "gb":
      return r.unlimited ? Infinity : r.gb ?? (r.dailyCapGb ? r.dailyCapGb * r.days : Infinity);
    case "perGbUsd":
      return r.perGbUsd ?? Infinity;
    default:
      return r[key];
  }
}

export function TrackerBuyButton({ link }: { link: BuyLink }) {
  const style = { color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" as const };
  if (link.kind === "klook") {
    return (
      <KlookLink href={link.href} target="_blank" rel="sponsored noopener" style={style}>
        {link.label}
      </KlookLink>
    );
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel={link.kind === "partner" ? "sponsored noopener" : "nofollow noopener noreferrer"}
      style={link.kind === "partner" ? style : { color: "var(--text-muted)", whiteSpace: "nowrap" }}
    >
      {link.label}
    </a>
  );
}

export default function EsimPriceTrackerTable({
  rows,
  links,
}: {
  rows: TrackerRow[];
  links: Record<string, BuyLink>;
}) {
  const [view, setView] = useState<View>("7");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 } | null>(null);

  const shown = useMemo(() => {
    const list = rows.filter((r) => {
      if (view === "all") return true;
      if (view === "unlimited") return r.unlimited;
      return r.days === Number(view);
    });
    const key: SortKey = sort?.key ?? (view === "unlimited" ? "perDay" : "priceUsd");
    const dir = sort?.dir ?? 1;
    return [...list].sort((a, b) => {
      const va = sortValue(a, key);
      const vb = sortValue(b, key);
      const c = typeof va === "string" ? va.localeCompare(String(vb)) : (va as number) - (vb as number);
      return c * dir || a.priceUsd - b.priceUsd || a.provider.localeCompare(b.provider);
    });
  }, [rows, view, sort]);

  const activeKey: SortKey = sort?.key ?? (view === "unlimited" ? "perDay" : "priceUsd");
  const header = (key: SortKey, label: string) => (
    <th key={key}>
      <button
        type="button"
        onClick={() => setSort((s) => ({ key, dir: s && s.key === key ? (s.dir === 1 ? -1 : 1) : 1 }))}
        style={{ background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", cursor: "pointer", fontWeight: 700 }}
        aria-label={`Sort by ${label}`}
      >
        {label}
        {activeKey === key ? ((sort?.dir ?? 1) === 1 ? " ▲" : " ▼") : " ↕"}
      </button>
    </th>
  );

  return (
    <div>
      <div role="tablist" aria-label="Filter plans" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {VIEWS.map((v) => {
          const n = rows.filter((r) => (v.id === "all" ? true : v.id === "unlimited" ? r.unlimited : r.days === Number(v.id))).length;
          const active = v.id === view;
          return (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setView(v.id);
                setSort(null);
              }}
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--rule)",
                background: active ? "var(--sumi)" : "transparent",
                color: active ? "#fff" : "var(--text)",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              {v.label} ({n})
            </button>
          );
        })}
      </div>
      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {header("provider", "Provider")}
                {header("gb", "Data")}
                {header("days", "Days")}
                {header("priceUsd", "Price (USD)")}
                {view === "unlimited" ? header("perDay", "USD / day") : header("perGbUsd", "USD / GB")}
                <th>Network</th>
                <th>Checked</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => {
                const link = links[r.providerId];
                const orig = native(r);
                return (
                  <tr key={r.id}>
                    <td className={styles.tdProvider} style={{ fontWeight: 700 }}>
                      {r.provider}
                      {r.note && <span className={tools.tdNote}>{r.note}</span>}
                    </td>
                    <td className={styles.tdNetwork}>
                      {r.unlimited ? "Unlimited" : r.dailyCapGb ? `${r.dailyCapGb} GB/day` : `${r.gb} GB`}
                    </td>
                    <td className={styles.tdNetwork}>{r.days}</td>
                    <td className={styles.tdPrice}>
                      {usd(r.priceUsd)}
                      {orig && <span className={tools.tdNote}>{orig} on site</span>}
                    </td>
                    <td className={styles.tdPrice}>
                      {view === "unlimited" ? usd(r.priceUsd / r.days) : r.perGbUsd !== null ? usd(r.perGbUsd) : ""}
                    </td>
                    <td className={styles.tdNetwork}>{r.carriers ?? ""}</td>
                    <td className={styles.tdNetwork}>
                      <a href={r.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" style={{ color: "var(--text-muted)" }}>
                        {r.checkedOn}
                      </a>
                    </td>
                    <td>{link && <TrackerBuyButton link={link} />}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
