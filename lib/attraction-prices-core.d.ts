export type PriceRow = {
  id: string;
  name: string;
  ticket: string;
  area: string;
  group: string;
  adult: string;
  adultMinYen: number | null;
  adultMaxYen: number | null;
  child: string | null;
  childAges: string | null;
  atDoor: string | null;
  pricing: "fixed" | "variable" | "free";
  booking: "Required" | "Advised" | "Not needed";
  bookingNote: string;
  sameDay: "Yes" | "No" | "Limited" | null;
  hours: string | null;
  revisedOn: string | null;
  revisionNote: string | null;
  previousAdult: string | null;
  previousChild: string | null;
  previousChecked: string | null;
  /** The check date on which a change against the previous check was recorded; null if unchanged. */
  changedOn: string | null;
  checked: string;
  source: string;
  sourceUrl: string;
  href: string | null;
};

export type PriceSummary = {
  count: number;
  pricedCount: number;
  paidCount: number;
  freeCount: number;
  medianAdultYen: number | null;
  medianAdultYenAll: number | null;
  cheapestPaid: PriceRow[];
  dearest: PriceRow[];
  minPaidYen: number | null;
  maxPaidYen: number | null;
  mustBook: PriceRow[];
  noBooking: PriceRow[];
  variable: PriceRow[];
  noSameDay: PriceRow[];
  changed: PriceRow[];
  revisedIn: (year: number) => PriceRow[];
  firstChecked: string | null;
  lastChecked: string | null;
};

export function buildRows(data: unknown): PriceRow[];
export function summarize(rows: PriceRow[]): PriceSummary;
export function toCsv(rows: PriceRow[]): string;
export function median(nums: number[]): number | null;
