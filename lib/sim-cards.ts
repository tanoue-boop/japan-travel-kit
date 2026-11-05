import type { EsimProviderId } from "./esim-prices";

/**
 * Qualitative profile of each provider shown on /sim-cards.
 *
 * Anything numeric about pricing, plan sizes, network or the affiliate link
 * lives in data/esim-prices.json (via lib/esim-prices.ts) — the single source
 * of truth for eSIM prices site-wide — and is looked up by `esimId`.
 */
export type SIMCard = {
  id: string;
  esimId: EsimProviderId;
  name: string;
  provider: string;
  badge?: string;
  badgeColor?: string;
  summary: string;
  speed: string;
  voiceCall: boolean;
  smsIncluded: boolean;
  esim: boolean;
  physicalSim: boolean;
  setupEase: number;
  support: string;
  pros: string[];
  cons: string[];
  /** Null where we hold no basis for a score: Simbye was added on 5 Nov 2026, unrated. */
  rating: number | null;
};

export const simCards: SIMCard[] = [
  {
    id: "simbye-japan",
    esimId: "simbye",
    name: "Simbye Japan eSIM",
    provider: "Simbye",
    badge: "Lowest Price",
    badgeColor: "bg-blue-500",
    summary:
      "A data-only Japan eSIM on NTT docomo, KDDI/au, SoftBank and Rakuten Mobile, with fixed plans from 1 GB to 50 GB and unlimited plans at 2 GB a day of full speed. Every plan in its price feed allows tethering.",
    speed: "",
    voiceCall: false,
    smsIncluded: false,
    esim: true,
    physicalSim: false,
    setupEase: 5,
    support: "Support chat and email on simbye.com",
    pros: [
      "Lowest list price of the five on fixed plans",
      "Four Japanese carriers, chosen automatically",
      "Tethering allowed on every Japan plan",
      "A 50 GB plan valid for 180 days",
    ],
    cons: [
      "Data-only (no Japanese number, calls or SMS)",
      "Unlimited plans drop to 1 Mbps after 2 GB a day",
      "Unlimited plans have no top-up",
    ],
    rating: null,
  },
  {
    id: "airalo-japan",
    esimId: "airalo",
    name: "Airalo Japan eSIM",
    provider: "Airalo",
    badge: "Best for eSIM",
    badgeColor: "bg-blue-500",
    summary:
      "The world's largest eSIM marketplace with 10M+ users. Install before you land and activate instantly on arrival — no queues, no physical SIM.",
    speed: "Up to 150 Mbps (5G/LTE)",
    voiceCall: false,
    smsIncluded: false,
    esim: true,
    physicalSim: false,
    setupEase: 5,
    support: "24/7 live chat",
    pros: [
      "World's largest eSIM marketplace",
      "Instant activation before you land",
      "Plans from 1 GB to unlimited, 3 to 30 days",
      "Trusted by 10M+ travellers",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Requires eSIM-compatible phone",
    ],
    rating: 4.5,
  },
  {
    id: "holafly-japan",
    esimId: "holafly",
    name: "Holafly Japan eSIM",
    provider: "Holafly",
    badge: "Unlimited Data",
    badgeColor: "bg-orange-500",
    summary:
      "Unlimited data eSIM — no caps to watch. Hugely popular with European and American travellers who need constant connectivity.",
    speed: "Up to 150 Mbps (5G/LTE)",
    voiceCall: false,
    smsIncluded: false,
    esim: true,
    physicalSim: false,
    setupEase: 5,
    support: "24/7 live chat (English)",
    pros: [
      "Unlimited on-device data",
      "Any plan length from 1 to 90 days",
      "Popular with US & European travellers",
      "Easy QR-code setup",
    ],
    cons: [
      "Data-only (no calls or SMS)",
      "Hotspot capped at 1 GB/day",
      "Pricier than data-capped alternatives",
    ],
    rating: 4.3,
  },
  {
    id: "sakura-mobile",
    esimId: "sakura",
    name: "Sakura Mobile Travel eSIM",
    provider: "Sakura Mobile",
    badge: "Best for Long Stay",
    badgeColor: "bg-green-500",
    summary:
      "The Japan-based choice for longer stays and travellers who want English-speaking support. Travel eSIMs with 3 GB/day or unlimited data; physical SIM plans with a voice option.",
    speed: "Up to 150 Mbps (5G/LTE)",
    voiceCall: true,
    smsIncluded: true,
    esim: true,
    physicalSim: true,
    setupEase: 4,
    support: "English phone & email support",
    pros: [
      "Full English customer support",
      "Voice-call SIM plans available (physical SIM)",
      "Physical SIM or eSIM available",
      "Best for stays of 1 month+",
    ],
    cons: [
      "Higher price than data-only resellers",
      "Slightly slower initial setup",
    ],
    rating: 4.4,
  },
  {
    id: "esim-go-japan",
    esimId: "esimgo",
    name: "eSIM Go Japan (Breeze)",
    provider: "eSIM Go",
    badge: "Best Value",
    badgeColor: "bg-blue-500",
    summary:
      "Outstanding value eSIM covering 190+ countries, sold through eSIM Go's consumer brand Breeze. Ideal for budget-conscious travellers or those visiting multiple countries in one trip.",
    speed: "Up to 150 Mbps (5G/LTE)",
    voiceCall: false,
    smsIncluded: false,
    esim: true,
    physicalSim: false,
    setupEase: 5,
    support: "Email support (English)",
    pros: [
      "Short unlimited plans from 1 day",
      "Works in 190+ countries",
      "Instant activation via QR code",
      "Great for multi-country trips",
    ],
    cons: [
      "Data-only (no voice or SMS)",
      "Smaller brand than Airalo or Holafly",
      "eSIM-compatible phone required",
    ],
    rating: 4.2,
  },
];
