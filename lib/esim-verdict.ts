import promos from "../data/esim-promos.json";

/**
 * The figures in components/EsimVerdictBox.tsx, each read on the provider's own page on
 * VERDICT_CHECKED (task jtk-20261127-A31). Nothing here is fed by a script: when a price
 * changes, re-read the page in `source` and change the number and the date together.
 *
 * Klook carries no price on purpose. Its listing (activity 109393) refuses automated reads
 * (HTTP 403) and the search index shows a different unlabelled "from" price per region, so
 * no plan could be tied to a figure on that date. The row says so instead of guessing.
 */
export const VERDICT_CHECKED = "27 Nov 2026";
export const VERDICT_CHECKED_ISO = "2026-11-27";

export const verdictSources = {
  /** Japan Unlimited packages in JPY (page shown from Japan): 3 days ¥1,900, 7 days ¥4,350, 30 days ¥11,350. */
  airalo: "https://www.airalo.com/japan-esim",
  /** "3GB per day at 20 Mbps, after which your connection continues at reduced speeds." */
  airaloFairUse: "https://www.airalo.com/m/esim/unlimited-packages",
  /** Monthly Voice + Data SIM/eSIM, 5 GB: 2,980 JPY/month (3,278 JPY tax incl.), activation 5,500 JPY. */
  sakuraMonthly: "https://www.sakuramobile.jp/monthly/price/",
  /** Travel eSIM from 1,375 JPY tax incl.; 7 days 4,620 (3 GB/day) / 5,775 (Unlimited). */
  sakuraTravel: "https://www.sakuramobile.jp/travel/esim/",
} as const;

export const verdictPrices = {
  airaloUnlimited3Days: "¥1,900",
  airaloUnlimited7Days: "¥4,350",
  sakuraMonthly5Gb: "¥3,278",
  sakuraActivation: "¥5,500",
  sakuraTravelFrom: "¥1,375",
  sakuraTravel7Days3Gb: "¥4,620",
  sakuraTravel7DaysUnlimited: "¥5,775",
} as const;

export type EsimPromo = {
  partner: string;
  text: string;
  code: string;
  percentOff: number;
  appliesTo: string;
  endsLabel: string;
  endsAt: string;
  source: string;
  checkedAt: string;
};

const promoTable = promos as unknown as Record<string, EsimPromo | string>;

export type EsimPromoId = "airalo-black-friday-2026";

export function getEsimPromo(id: EsimPromoId): EsimPromo {
  const promo = promoTable[id];
  if (!promo || typeof promo === "string") throw new Error(`esim-promos: no offer ${id}`);
  return promo;
}

/** True until the offer's `endsAt`. `now` defaults to the clock of whoever renders. */
export function isEsimPromoLive(id: EsimPromoId, now: number = Date.now()): boolean {
  return now < Date.parse(getEsimPromo(id).endsAt);
}
