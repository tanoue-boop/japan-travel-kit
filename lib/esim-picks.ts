import {
  cheapestAtLeastGb,
  cheapestPlan,
  cheapestUnlimited,
  getProvider,
  type EsimPlan,
  type EsimProviderId,
} from "./esim-prices";
import { productOfferJsonLd } from "./structured-data";

/**
 * The "which eSIM for which need" answer on the pillar page, as data.
 *
 * Plans are looked up from data/esim-prices.json, so a price change moves the table with
 * no edit here. Rows run in commission order — Simbye, Klook eSIM, Airalo — with Sakura
 * Mobile last, because it is the only route to a Japanese number and is chosen for that
 * rather than on price. Holafly has no row: it runs no affiliate programme we can join.
 */
export type PickRowId =
  | "cheapest"
  | "short"
  | "unlimited"
  | "heavy"
  | "long"
  | "klook"
  | "iphone"
  | "tether"
  | "number";

export type PickSeller = "simbye" | "klook" | "airalo" | "sakura";

export type PickRow = {
  id: PickRowId;
  seller: PickSeller;
  /** The plan the row prices, or null where we have no verified price to show. */
  plan: EsimPlan | null;
};

export const pickRows: PickRow[] = [
  { id: "cheapest", seller: "simbye", plan: cheapestPlan("simbye") },
  { id: "short", seller: "simbye", plan: cheapestAtLeastGb("simbye", 5) },
  { id: "unlimited", seller: "simbye", plan: cheapestUnlimited("simbye", 7) },
  { id: "heavy", seller: "simbye", plan: cheapestAtLeastGb("simbye", 20) },
  { id: "long", seller: "simbye", plan: cheapestAtLeastGb("simbye", 50) },
  { id: "klook", seller: "klook", plan: null },
  { id: "iphone", seller: "airalo", plan: cheapestAtLeastGb("airalo", 5) },
  { id: "tether", seller: "airalo", plan: cheapestUnlimited("airalo", 7) },
  { id: "number", seller: "sakura", plan: null },
];

/** Product + AggregateOffer for one provider's page, priced from the plans we list. */
export function esimProductJsonLd(id: EsimProviderId, route: string, name: string, description: string): string {
  const prices = getProvider(id).plans.map((p) => p.priceUsd);
  return productOfferJsonLd({
    route,
    name,
    description,
    brand: getProvider(id).name,
    currency: "USD",
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: prices.length,
  });
}

/** The review or guide that backs each seller, for the ItemList markup. */
export const pickSellerHref: Record<PickSeller, string> = {
  simbye: "/guides/esim/simbye-japan-review",
  klook: "/guides/esim/best-esim-japan#klook-japan-esim",
  airalo: "/guides/esim/airalo-japan-review",
  sakura: "/guides/esim/sakura-mobile-review",
};
