import raw from "../data/esim-prices.json";

/**
 * Typed access to data/esim-prices.json (refreshed daily by
 * scripts/fetch-esim-prices.mjs). Everything here is pure and synchronous so it
 * can run at build time and inside client components alike.
 */

export type EsimPlan = {
  id: string;
  name: string;
  /** Total high-speed data in GB; null for unlimited plans. */
  gb: number | null;
  days: number;
  priceUsd: number;
  unlimited: boolean;
  /** Set when the allowance is per day (e.g. 3 GB/day); gb is then the trip total (cap × days). */
  dailyCapGb?: number;
  note?: string;
};

export type EsimProviderId = "airalo" | "holafly" | "esimgo" | "sakura";

export type EsimProvider = {
  id: EsimProviderId;
  name: string;
  brand: string;
  network: string;
  sourceUrl: string;
  /** "#" means the affiliate programme is still pending — link internally instead. */
  affiliateUrl: string;
  fetchedAt: string | null;
  updatedAt: string | null;
  plans: EsimPlan[];
};

export type EsimPlanRow = EsimPlan & {
  providerId: EsimProviderId;
  provider: string;
  network: string;
  /** USD per GB of high-speed data; null for unlimited plans. */
  perGb: number | null;
};

const PROVIDER_ORDER: EsimProviderId[] = ["airalo", "holafly", "esimgo", "sakura"];

type RawData = {
  currency: string;
  generatedAt: string | null;
  providers: Record<string, Omit<EsimProvider, "id">>;
};

const data = raw as RawData;

export const esimProviders: EsimProvider[] = PROVIDER_ORDER.filter((id) => data.providers[id]).map((id) => ({
  id,
  ...data.providers[id],
}));

export const esimGeneratedAt = data.generatedAt;

export function getProvider(id: EsimProviderId): EsimProvider {
  const p = esimProviders.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown eSIM provider: ${id}`);
  return p;
}

export function pricePerGb(plan: EsimPlan): number | null {
  return plan.gb ? Math.round((plan.priceUsd / plan.gb) * 100) / 100 : null;
}

export const allEsimPlans: EsimPlanRow[] = esimProviders.flatMap((p) =>
  p.plans.map((plan) => ({
    ...plan,
    providerId: p.id,
    provider: p.name,
    network: p.network,
    perGb: pricePerGb(plan),
  }))
);

/** Cheapest plan a provider sells (any size). */
export function cheapestPlan(providerId: EsimProviderId): EsimPlan | null {
  const plans = getProvider(providerId).plans;
  return plans.length ? plans.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
}

/** Cheapest plan with exactly `gb` GB (any validity). */
export function cheapestWithGb(providerId: EsimProviderId, gb: number): EsimPlan | null {
  const plans = getProvider(providerId).plans.filter((p) => !p.unlimited && p.gb === gb);
  return plans.length ? plans.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
}

/** Cheapest plan with at least `gb` GB (any validity). */
export function cheapestAtLeastGb(providerId: EsimProviderId, gb: number): EsimPlan | null {
  const plans = getProvider(providerId).plans.filter((p) => !p.unlimited && (p.gb ?? 0) >= gb);
  return plans.length ? plans.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
}

/** Cheapest unlimited plan a provider sells (optionally with at least `minDays` validity). */
export function cheapestUnlimited(providerId: EsimProviderId, minDays = 1): EsimPlan | null {
  const plans = getProvider(providerId).plans.filter((p) => p.unlimited && p.days >= minDays);
  return plans.length ? plans.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
}

/** Lowest $/GB across every fixed-allowance plan (daily-capped plans excluded — their "total" isn't bankable). */
export function bestValuePlan(): EsimPlanRow | null {
  const capped = allEsimPlans.filter((p) => p.perGb !== null && !p.dailyCapGb);
  return capped.length ? capped.reduce((a, b) => ((b.perGb ?? Infinity) < (a.perGb ?? Infinity) ? b : a)) : null;
}

/**
 * Plans that cover a trip of `days` days needing `gbNeeded` GB in total,
 * cheapest first. Unlimited plans always satisfy the data requirement.
 */
export function findPlansForTrip(days: number, gbNeeded: number): EsimPlanRow[] {
  return allEsimPlans
    .filter((p) => {
      if (p.days < days) return false;
      if (p.unlimited) return true;
      // Daily-capped plans: what you can actually use is cap × trip days, not cap × plan days.
      if (p.dailyCapGb) return p.dailyCapGb * days >= gbNeeded;
      return (p.gb ?? 0) >= gbNeeded;
    })
    .sort((a, b) => a.priceUsd - b.priceUsd || a.days - b.days);
}

export function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "18 Sep 2026" (UTC). Hand-rolled so server and browser render identically — no ICU surprises. */
export function formatDate(iso: string | null): string {
  if (!iso) return "not yet checked";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "unknown";
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Most recent successful fetch across all providers (what "Prices checked" shows). */
export function latestCheckedAt(): string | null {
  return esimProviders.reduce<string | null>((acc, p) => (p.fetchedAt && (!acc || p.fetchedAt > acc) ? p.fetchedAt : acc), null);
}

// ---------------------------------------------------------------------------
// Copy helpers — so prose across the site can quote live prices without
// hard-coding them. All return plain strings ready to drop into JSX/templates.
// ---------------------------------------------------------------------------

/** All plans for a provider as table rows (with $/GB), cheapest first. */
export function plansFor(providerId: EsimProviderId): EsimPlanRow[] {
  return allEsimPlans.filter((p) => p.providerId === providerId).sort((a, b) => a.priceUsd - b.priceUsd || a.days - b.days);
}

/** "$3.99 / 1 GB / 7 days" — a provider's cheapest plan, or "—". */
export function priceFromLabel(providerId: EsimProviderId): string {
  const p = cheapestPlan(providerId);
  return p ? `${formatUsd(p.priceUsd)} / ${p.name}` : "—";
}

/** "$3.99" — a provider's cheapest plan price only. */
export function priceFrom(providerId: EsimProviderId): string {
  const p = cheapestPlan(providerId);
  return p ? formatUsd(p.priceUsd) : "—";
}

/** "$13.99 (10 GB / 30 days)" for the cheapest plan with at least `gb` GB, or "—". */
export function priceAtLeastLabel(providerId: EsimProviderId, gb: number): string {
  const p = cheapestAtLeastGb(providerId, gb);
  return p ? `${formatUsd(p.priceUsd)} (${p.name})` : "—";
}

/** "$22.99 (Unlimited / 7 days)" for the cheapest unlimited plan with at least `minDays`, or "—". */
export function unlimitedFromLabel(providerId: EsimProviderId, minDays = 1): string {
  const p = cheapestUnlimited(providerId, minDays);
  return p ? `${formatUsd(p.priceUsd)} (${p.name})` : "—";
}

/** Cheapest plan on the whole site, e.g. for "Japan eSIMs from $3.99" banners. */
export function siteCheapest(): EsimPlanRow | null {
  return allEsimPlans.length ? allEsimPlans.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
}

export function siteCheapestFrom(): string {
  const p = siteCheapest();
  return p ? formatUsd(p.priceUsd) : "—";
}

/** "18 Sep 2026" — the most recent successful price check. */
export function pricesCheckedLabel(): string {
  return formatDate(latestCheckedAt());
}
