import { getProvider, type EsimProviderId } from "./esim-prices";

/**
 * The two non-price facts every "which eSIM" answer turns on, and which no price
 * feed carries: whether the plan comes with a Japanese phone number, and what the
 * provider says about tethering.
 *
 * Why here. Those two facts decide the choice for a student (university admin wants
 * a number), a business traveller (a laptop wants a hotspot) and a family (one phone
 * shared four ways), so six pages were about to quote them. They were first written
 * down on best-esim-japan-reddit, read off each provider's own site and help centre
 * on `SPECS_CHECKED_AT`; this module is that one record, so the pages cannot drift
 * apart or carry different wording for the same clause.
 *
 * Prices, plan sizes, validity and networks are NOT here — they come from
 * data/esim-prices.json via lib/esim-prices.ts, which is refreshed daily and carries
 * its own check date. The tables that show both print both dates.
 *
 * Nothing below is a measurement of ours. Each string is what the named provider
 * publishes; where the wording matters it is quoted.
 */

/**
 * The day the clauses below were read off the providers' own pages. Formatted the same
 * way as `pricesCheckedLabel()`, because the two always appear in the same sentence.
 */
export const SPECS_CHECKED_AT = "22 Oct 2026";

export type EsimSpec = {
  id: EsimProviderId;
  /** Provider name, with the consumer brand where the two differ. */
  label: string;
  /** Whether a Japanese phone number comes with it. */
  phoneNumber: string;
  /** Short form of the above, for a narrow table column. */
  phoneNumberShort: string;
  /** Tethering / hotspot terms as the provider states them. */
  tethering: string;
  /** Short form of the above. */
  tetheringShort: string;
  /** Which plan shapes the provider sells, in GB. */
  dataRange: string;
};

export const esimSpecs: EsimSpec[] = [
  {
    id: "esimgo",
    label: "eSIM Go (Breeze)",
    phoneNumber: 'No — its Japan plans state "No SMS or voice calls included. Data only."',
    phoneNumberShort: "No — data only",
    tethering: "Yes — tethering is stated on every Japan plan, at no extra cost",
    tetheringShort: "Yes, no extra cost",
    dataRange: "1–100 GB, plus unlimited",
  },
  {
    id: "airalo",
    label: "Airalo",
    phoneNumber: "No — the Japan plans are data only",
    phoneNumberShort: "No — data only",
    tethering: "Yes — its help centre says the personal hotspot works where your device and the network allow it",
    tetheringShort: "Yes, where device allows",
    dataRange: "1–20 GB, plus unlimited",
  },
  {
    id: "holafly",
    label: "Holafly",
    phoneNumber: "No — its Japan page states there is no local phone number",
    phoneNumberShort: "No — data only",
    tethering: "Yes, but capped: 1 GB of shareable data per day, so the trip total scales with plan length",
    tetheringShort: "Capped at 1 GB/day",
    dataRange: "Unlimited only",
  },
  {
    id: "sakura",
    label: "Sakura Mobile",
    phoneNumber:
      "Only on the separate Voice + Data eSIM, which adds a Japanese number and domestic calls",
    phoneNumberShort: "Voice + Data plan only",
    tethering:
      "Yes, with one hotspot allowance for the whole trip on the unlimited plans: 2 GB on 1–3 days, 6 GB on 7, 15 GB on 15, 30 GB on 27–31",
    tetheringShort: "Yes, allowance by plan length",
    dataRange: "9–90 GB, plus unlimited",
  },
];

/** One provider's spec. Throws at build time if an id drifts out of the list. */
export function esimSpec(id: EsimProviderId): EsimSpec {
  const found = esimSpecs.find((s) => s.id === id);
  if (!found) throw new Error(`esim-specs: no spec for provider ${id}`);
  return found;
}

/** Affiliate URL for a provider, or "#" where the programme is still pending. */
export function esimLink(id: EsimProviderId): string {
  return getProvider(id).affiliateUrl;
}

/**
 * Holafly runs no affiliate programme we can join (impact: Airalo only — checked
 * 9 Oct 2026), so its purchase CTA points at Airalo's unlimited plans, the closest
 * approved alternative. Declared once here because six pages say it.
 */
export const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
export const HOLAFLY_ALT_NOTE =
  "Holafly is not available through our links — Airalo is our recommended alternative.";
