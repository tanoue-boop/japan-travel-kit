import { useMemo, useState } from "react";
import Link from "next/link";
import { allEsimPlans, esimProviders, formatUsd, type EsimPlanRow, type EsimProviderId } from "../lib/esim-prices";
import styles from "../styles/BestEsimJapan.module.css";
import tools from "../styles/Tools.module.css";

type SortKey = "provider" | "gb" | "days" | "priceUsd" | "perGb";
type SortDir = "asc" | "desc";

const HEADERS: { key: SortKey; label: string }[] = [
  { key: "provider", label: "Provider" },
  { key: "gb", label: "Data" },
  { key: "days", label: "Validity" },
  { key: "priceUsd", label: "Price" },
  { key: "perGb", label: "Price / GB" },
];

type Props = {
  rows?: EsimPlanRow[];
  defaultSort?: SortKey;
  defaultDir?: SortDir;
  /** Show provider filter chips above the table. */
  filterable?: boolean;
  /** Plan ids to highlight (e.g. the finder's winner). */
  highlightIds?: string[];
};

/** Affiliate link, or an internal fallback when a programme is still pending. */
export function ProviderCta({ providerId, label, ghost, className }: { providerId: EsimProviderId; label: string; ghost?: boolean; className?: string }) {
  const p = esimProviders.find((x) => x.id === providerId)!;
  const cls = className ?? `${tools.rowCta} ${ghost ? tools.rowCtaGhost : ""}`;
  if (p.affiliateUrl === "#") {
    return (
      <Link href="/sim-cards" className={cls}>
        {label}
      </Link>
    );
  }
  return (
    <a href={p.affiliateUrl} className={cls} target="_blank" rel="noopener noreferrer nofollow">
      {label}
    </a>
  );
}

export default function EsimPlanTable({
  rows = allEsimPlans,
  defaultSort = "perGb",
  defaultDir = "asc",
  filterable = true,
  highlightIds = [],
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey>(defaultSort);
  const [dir, setDir] = useState<SortDir>(defaultDir);
  const [providerFilter, setProviderFilter] = useState<EsimProviderId | "all">("all");

  const sorted = useMemo(() => {
    const filtered = providerFilter === "all" ? rows : rows.filter((r) => r.providerId === providerFilter);
    const mult = dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sortKey === "provider") return mult * a.provider.localeCompare(b.provider) || a.priceUsd - b.priceUsd;
      // Unlimited plans have no GB / $-per-GB value: keep them at the bottom in either direction.
      if (sortKey === "gb" || sortKey === "perGb") {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av === null && bv === null) return a.priceUsd - b.priceUsd;
        if (av === null) return 1;
        if (bv === null) return -1;
        return mult * (av - bv) || a.priceUsd - b.priceUsd;
      }
      return mult * (a[sortKey] - b[sortKey]) || a.priceUsd - b.priceUsd;
    });
  }, [rows, sortKey, dir, providerFilter]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setDir(dir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setDir("asc");
    }
  };

  const highlight = new Set(highlightIds);

  return (
    <div>
      {filterable && (
        <div className={tools.chipRow} style={{ marginBottom: "1rem" }}>
          <button
            type="button"
            className={`${tools.chip} ${providerFilter === "all" ? tools.chipActive : ""}`}
            onClick={() => setProviderFilter("all")}
          >
            All providers ({rows.length})
          </button>
          {esimProviders.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`${tools.chip} ${providerFilter === p.id ? tools.chipActive : ""}`}
              onClick={() => setProviderFilter(p.id)}
            >
              {p.name} ({rows.filter((r) => r.providerId === p.id).length})
            </button>
          ))}
        </div>
      )}
      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {HEADERS.map((h) => (
                  <th key={h.key} aria-sort={sortKey === h.key ? (dir === "asc" ? "ascending" : "descending") : "none"}>
                    <button
                      type="button"
                      className={`${tools.sortBtn} ${sortKey === h.key ? tools.sortActive : ""}`}
                      onClick={() => toggleSort(h.key)}
                    >
                      {h.label}
                      <span className={tools.sortArrow} aria-hidden="true">
                        {sortKey === h.key ? (dir === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    </button>
                  </th>
                ))}
                <th>Network</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.id} className={highlight.has(r.id) ? tools.rowHighlight : undefined}>
                  <td className={styles.tdProvider}>{r.provider}</td>
                  <td style={{ fontWeight: 700, color: "#0d1b4b", whiteSpace: "nowrap" }}>
                    {r.unlimited ? "Unlimited" : `${r.gb} GB`}
                    {r.note && <span className={tools.tdNote}>{r.note}</span>}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{r.days} {r.days === 1 ? "day" : "days"}</td>
                  <td className={styles.tdPrice}>{formatUsd(r.priceUsd)}</td>
                  <td className={r.perGb === null ? tools.tdMuted : undefined} style={{ whiteSpace: "nowrap", fontWeight: 700 }}>
                    {r.perGb === null ? "—" : `${formatUsd(r.perGb)}/GB`}
                  </td>
                  <td className={styles.tdNetwork}>{r.network}</td>
                  <td>
                    <ProviderCta providerId={r.providerId} label="Buy →" />
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "#9ca3af" }}>
                    No plans to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
