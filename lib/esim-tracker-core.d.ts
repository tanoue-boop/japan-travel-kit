export type TrackerRow = {
  id: string;
  providerId: string;
  provider: string;
  plan: string;
  gb: number | null;
  dailyCapGb: number | null;
  unlimited: boolean;
  days: number;
  /** In `currency`, exactly as the provider shows it. */
  price: number;
  currency: string;
  priceUsd: number;
  /** Units of `currency` per USD used for the conversion; null when the price is already USD. */
  fxRate: number | null;
  /** Date of the reference rate used; null when the price is already USD. */
  fxDate: string | null;
  /** USD per GB for fixed allowances; null for unlimited and per-day-capped plans. */
  perGbUsd: number | null;
  carriers: string | null;
  tethering: string | null;
  phoneNumber: string | null;
  note: string | null;
  checkedOn: string | null;
  sourceUrl: string;
  officialUrl: string;
};

export type TrackerSummary = {
  providers: number;
  plans: number;
  firstChecked: string | null;
  lastChecked: string | null;
  cheapestPerGb: TrackerRow | null;
  cheapestPerGbAll: TrackerRow[];
  medianPerGb: number | null;
  medianBestPerGbByProvider: number | null;
  cheapestUnlimited7: TrackerRow | null;
  cheapestUnlimited7All: TrackerRow[];
  medianUnlimited7: number | null;
  unlimited7Count: number;
  cheapestUnlimitedPerDay: TrackerRow | null;
  cheapestPlan: TrackerRow | null;
};

export function buildRows(data: unknown): TrackerRow[];
export function summarize(rows: TrackerRow[]): TrackerSummary;
export function toCsv(rows: TrackerRow[]): string;
export function median(nums: number[]): number | null;
export function planLabel(p: { gb: number | null; days: number; unlimited: boolean; dailyCapGb?: number }): string;
