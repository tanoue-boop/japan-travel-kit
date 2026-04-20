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
  logo: string;
  badge?: string;
  badgeColor?: string;
  summary: string;
  coverage: string;
  speed: string;
  voiceCall: boolean;
  smsIncluded: boolean;
  esim: boolean;
  physicalSim: boolean;
  setupEase: number; // 1-5
  support: string;
  pros: string[];
  cons: string[];
  plans: DataPlan[];
  affiliateUrl: string;
  rating: number; // out of 5
  reviewCount: number;
};

export const simCards: SIMCard[] = [
  {
    id: "airalo-japan",
    name: "Airalo Japan eSIM",
    provider: "Airalo",
    logo: "/logos/airalo.svg",
    badge: "Best for eSIM",
    badgeColor: "bg-blue-500",
    summary:
      "The most popular eSIM marketplace with instant activation. Install before you land in Japan.",
    coverage: "Docomo & SoftBank networks (wide coverage)",
    speed: "Up to 150 Mbps (LTE/4G)",
    voiceCall: false,
    smsIncluded: false,
    esim: true,
    physicalSim: false,
    setupEase: 5,
    support: "24/7 live chat",
    pros: [
      "Install instantly before arrival",
      "No physical SIM needed",
      "Competitive pricing",
      "Covers major cities & rural areas",
    ],
    cons: ["Data-only (no calls/SMS)", "Requires eSIM-compatible phone"],
    plans: [
      {
        duration: "7 days",
        data: "1 GB",
        price: 4.5,
        affiliateUrl: "https://www.airalo.com/japan-esim",
      },
      {
        duration: "30 days",
        data: "3 GB",
        price: 9.5,
        affiliateUrl: "https://www.airalo.com/japan-esim",
      },
      {
        duration: "30 days",
        data: "10 GB",
        price: 18.0,
        affiliateUrl: "https://www.airalo.com/japan-esim",
      },
    ],
    affiliateUrl: "https://www.airalo.com/japan-esim",
    rating: 4.5,
    reviewCount: 12400,
  },
  {
    id: "iijmio-tourist",
    name: "IIJmio Tourist SIM",
    provider: "IIJ",
    logo: "/logos/iijmio.svg",
    badge: "Best Value",
    badgeColor: "bg-green-500",
    summary:
      "Reliable Japanese carrier SIM with wide Docomo network coverage. Great balance of price and performance.",
    coverage: "Docomo network (nationwide)",
    speed: "Up to 150 Mbps (LTE/4G)",
    voiceCall: true,
    smsIncluded: true,
    esim: true,
    physicalSim: true,
    setupEase: 4,
    support: "Email support (English available)",
    pros: [
      "Docomo's nationwide network",
      "Voice calls included",
      "Both eSIM & physical SIM",
      "Affordable pricing",
    ],
    cons: ["Slower setup than app-based eSIMs", "Limited English support"],
    plans: [
      {
        duration: "15 days",
        data: "5 GB",
        price: 16.0,
        affiliateUrl: "https://www.iijmio.jp/hdd/",
      },
      {
        duration: "30 days",
        data: "10 GB",
        price: 24.0,
        affiliateUrl: "https://www.iijmio.jp/hdd/",
      },
    ],
    affiliateUrl: "https://www.iijmio.jp/hdd/",
    rating: 4.3,
    reviewCount: 5800,
  },
  {
    id: "klook-sim",
    name: "Klook Japan SIM Card",
    provider: "Klook",
    logo: "/logos/klook.svg",
    badge: "Best for Pickup",
    badgeColor: "bg-orange-500",
    summary:
      "Pick up at the airport on arrival. Unlimited data option available. Perfect if you forgot to pre-order.",
    coverage: "Softbank network",
    speed: "Up to 75 Mbps (LTE/4G)",
    voiceCall: false,
    smsIncluded: false,
    esim: false,
    physicalSim: true,
    setupEase: 5,
    support: "Klook customer support (multilingual)",
    pros: [
      "Available at major airports",
      "No pre-setup needed",
      "Unlimited data option",
      "Easy to use",
    ],
    cons: [
      "Data-only",
      "SoftBank coverage (slightly less rural coverage)",
      "More expensive than eSIM options",
    ],
    plans: [
      {
        duration: "8 days",
        data: "Unlimited",
        price: 29.0,
        affiliateUrl: "https://www.klook.com/",
      },
      {
        duration: "15 days",
        data: "Unlimited",
        price: 39.0,
        affiliateUrl: "https://www.klook.com/",
      },
      {
        duration: "30 days",
        data: "Unlimited",
        price: 55.0,
        affiliateUrl: "https://www.klook.com/",
      },
    ],
    affiliateUrl: "https://www.klook.com/",
    rating: 4.1,
    reviewCount: 8200,
  },
  {
    id: "sakura-mobile",
    name: "Sakura Mobile SIM",
    provider: "Sakura Mobile",
    logo: "/logos/sakura.svg",
    summary:
      "Specialist in foreigner-friendly SIMs with English support. Monthly plans available for longer stays.",
    coverage: "Docomo network (nationwide)",
    speed: "Up to 150 Mbps (LTE/4G)",
    voiceCall: true,
    smsIncluded: true,
    esim: true,
    physicalSim: true,
    setupEase: 4,
    support: "English phone & email support",
    pros: [
      "Excellent English support",
      "Monthly plans for long stays",
      "Voice calls & SMS",
      "Docomo network",
    ],
    cons: ["Higher price than budget options", "Slower delivery"],
    plans: [
      {
        duration: "30 days",
        data: "7 GB",
        price: 28.0,
        affiliateUrl: "https://www.sakuramobile.jp/",
      },
      {
        duration: "30 days",
        data: "15 GB",
        price: 38.0,
        affiliateUrl: "https://www.sakuramobile.jp/",
      },
    ],
    affiliateUrl: "https://www.sakuramobile.jp/",
    rating: 4.4,
    reviewCount: 3100,
  },
];
