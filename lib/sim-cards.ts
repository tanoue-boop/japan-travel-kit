export type DataPlan = {
  duration: string;
  data: string;
  price: number;
  affiliateUrl: string;
};

export type SIMCard = {
  id: string;
  name: string;
  provider: string;
  badge?: string;
  badgeColor?: string;
  summary: string;
  coverage: string;
  speed: string;
  voiceCall: boolean;
  smsIncluded: boolean;
  esim: boolean;
  physicalSim: boolean;
  setupEase: number;
  support: string;
  pros: string[];
  cons: string[];
  plans: DataPlan[];
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
};

export const simCards: SIMCard[] = [
  {
    id: "airalo-japan",
    name: "Airalo Japan eSIM",
    provider: "Airalo",
    badge: "Best for eSIM",
    badgeColor: "bg-blue-500",
    summary:
      "The world's largest eSIM marketplace with 10M+ users. Install before you land and activate instantly on arrival — no queues, no physical SIM.",
    coverage: "Docomo & SoftBank (nationwide)",
    speed: "Up to 150 Mbps (LTE/4G)",
    voiceCall: false,
    smsIncluded: false,
    esim: true,
    physicalSim: false,
    setupEase: 5,
    support: "24/7 live chat",
    pros: [
      "World's largest eSIM marketplace",
      "Instant activation before you land",
      "Competitive pricing from $4.50",
      "Trusted by 10M+ travellers",
    ],
    cons: [
      "Data-only (no voice calls or SMS)",
      "Requires eSIM-compatible phone",
    ],
    plans: [
      { duration: "7 days",  data: "1 GB",  price: 4.50,  affiliateUrl: "#" },
      { duration: "30 days", data: "3 GB",  price: 9.50,  affiliateUrl: "#" },
      { duration: "30 days", data: "10 GB", price: 18.00, affiliateUrl: "#" },
    ],
    affiliateUrl: "#",
    rating: 4.5,
    reviewCount: 12400,
  },
  {
    id: "holafly-japan",
    name: "Holafly Japan eSIM",
    provider: "Holafly",
    badge: "Unlimited Data",
    badgeColor: "bg-orange-500",
    summary:
      "Unlimited data eSIM — no caps, no throttling worries. Hugely popular with European and American travellers who need constant connectivity.",
    coverage: "Softbank network (nationwide)",
    speed: "Up to 150 Mbps (LTE/4G)",
    voiceCall: false,
    smsIncluded: false,
    esim: true,
    physicalSim: false,
    setupEase: 5,
    support: "24/7 live chat (English)",
    pros: [
      "Truly unlimited data",
      "No speed caps or fair-use throttling",
      "Popular with US & European travellers",
      "Easy QR-code setup",
    ],
    cons: [
      "Data-only (no calls or SMS)",
      "Pricier than data-capped alternatives",
      "eSIM-only device required",
    ],
    plans: [
      { duration: "5 days",  data: "Unlimited", price: 19.00, affiliateUrl: "#" },
      { duration: "10 days", data: "Unlimited", price: 27.00, affiliateUrl: "#" },
      { duration: "30 days", data: "Unlimited", price: 49.00, affiliateUrl: "#" },
    ],
    affiliateUrl: "#",
    rating: 4.3,
    reviewCount: 8700,
  },
  {
    id: "sakura-mobile",
    name: "Sakura Mobile SIM",
    provider: "Sakura Mobile",
    badge: "Best for Long Stay",
    badgeColor: "bg-green-500",
    summary:
      "The go-to choice for longer stays and travellers who want English-speaking support. Offers both physical SIM and eSIM with optional voice calling.",
    coverage: "Docomo network (nationwide)",
    speed: "Up to 150 Mbps (LTE/4G)",
    voiceCall: true,
    smsIncluded: true,
    esim: true,
    physicalSim: true,
    setupEase: 4,
    support: "English phone & email support",
    pros: [
      "Full English customer support",
      "Voice calls & SMS included",
      "Physical SIM or eSIM available",
      "Best for stays of 1 month+",
    ],
    cons: [
      "Higher price than data-only options",
      "Slightly slower initial setup",
    ],
    plans: [
      { duration: "30 days", data: "7 GB",  price: 28.00, affiliateUrl: "#" },
      { duration: "30 days", data: "15 GB", price: 38.00, affiliateUrl: "#" },
      { duration: "30 days", data: "30 GB", price: 52.00, affiliateUrl: "#" },
    ],
    affiliateUrl: "#",
    rating: 4.4,
    reviewCount: 3100,
  },
  {
    id: "esim-go-japan",
    name: "eSIM Go Japan",
    provider: "eSIM Go",
    badge: "Best Value",
    badgeColor: "bg-blue-500",
    summary:
      "Outstanding value eSIM covering 190+ countries. Ideal for budget-conscious travellers or those visiting multiple countries in one trip.",
    coverage: "Docomo network (nationwide)",
    speed: "Up to 150 Mbps (LTE/4G)",
    voiceCall: false,
    smsIncluded: false,
    esim: true,
    physicalSim: false,
    setupEase: 5,
    support: "Email support (English)",
    pros: [
      "Best price-per-GB on the market",
      "Works in 190+ countries",
      "Instant activation via QR code",
      "Great for multi-country trips",
    ],
    cons: [
      "Data-only (no voice or SMS)",
      "Smaller brand than Airalo or Holafly",
      "eSIM-compatible phone required",
    ],
    plans: [
      { duration: "7 days",  data: "1 GB",  price: 3.50,  affiliateUrl: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN" },
      { duration: "15 days", data: "5 GB",  price: 8.00,  affiliateUrl: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN" },
      { duration: "30 days", data: "10 GB", price: 14.00, affiliateUrl: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN" },
    ],
    affiliateUrl: "https://breezesim.com?sca_ref=11082101.AF8vabyRKN",
    rating: 4.2,
    reviewCount: 2900,
  },
];
