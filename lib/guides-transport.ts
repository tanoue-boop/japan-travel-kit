import type { GuideArticle, GuideCategory } from "./guide-hub";
import { assertGroupsCover } from "./guide-hub";

export const transportArticles: GuideArticle[] = [
  {
    href: "/guides/transport/jr-pass-guide",
    badge: "Guide",
    title: "JR Pass Guide 2026: Is It Worth It for Your Japan Trip?",
    desc: "The JR Pass can save you hundreds of dollars — or cost you more than buying individual tickets. We break down all pass types, prices, and real itinerary costs to help you decide.",
    group: "passes",
  },
  {
    href: "/guides/transport/jr-pass-worth-it",
    badge: "Comparison",
    title: "Is the JR Pass Worth It in 2026? Honest Cost Breakdown",
    desc: "Since the 2023 hike to ¥50,000, the JR Pass no longer pays off for most itineraries. We show the break-even math, who should still buy it, and cheaper alternatives.",
    group: "passes",
  },
  {
    href: "/guides/transport/shinkansen-guide",
    badge: "Guide",
    title: "Shinkansen Guide 2026: Tickets, Passes & Tips for First-Timers",
    desc: "Japan's bullet train is fast, punctual, and easy to use — once you know how. We cover ticket types, prices, JR Pass tips, and how to book before you board.",
    group: "passes",
  },
  {
    href: "/guides/transport/tokyo-to-kyoto",
    badge: "Guide",
    title: "Tokyo to Kyoto (2026): Cheapest & Fastest Ways to Get There",
    desc: "The Shinkansen is fast but not always the cheapest. We compare the bullet train, highway bus, local trains, and rental car on price, speed, and comfort — with 2026 fares.",
    group: "passes",
  },
  {
    href: "/guides/transport/tokyo-airport-transfer",
    badge: "Guide",
    title: "Tokyo Airport Transfer Guide (2026): Narita & Haneda to the City",
    desc: "N'EX, Skyliner, limousine bus, or taxi? We compare every way to get from Narita or Haneda airport to central Tokyo — with a Skyliner vs N'EX head-to-head and when the bus wins.",
    group: "airports",
  },
  {
    href: "/guides/transport/osaka-airport-transfer",
    badge: "Guide",
    title: "Osaka Airport Transfer Guide (2026): KIX & ITM to the City",
    desc: "Osaka has two airports — Kansai International and Itami. We compare every way to get into the city from each, with a Haruka vs Nankai Rapi:t head-to-head.",
    group: "airports",
  },
  {
    href: "/guides/transport/haruka-vs-nankai-rapit",
    badge: "Comparison",
    title: "Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport?",
    desc: "One runs to Namba, the other to Tennoji, Shin-Osaka and Kyoto — so your hotel decides this, not the fare. A head-to-head on time, price, and JR Pass coverage.",
    group: "airports",
  },
  {
    href: "/guides/transport/tokyo-transportation",
    badge: "Guide",
    title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained",
    desc: "Tokyo has the world's most complex train network — but once you know the basics, it's easy. We cover the Yamanote Line, Tokyo Metro, IC cards, the Tokyo Subway Ticket, and key routes for every tourist destination.",
    group: "cities",
  },
  {
    href: "/guides/transport/kyoto-transportation",
    badge: "Guide",
    title: "Getting Around Kyoto (2026): Buses, Trains & Taxis Explained",
    desc: "Kyoto's city bus and subway cover nearly every major sight. We explain how each option works, which IC card to use, when the Subway & Bus day pass pays off, and how to arrive from Tokyo or Kansai Airport.",
    group: "cities",
  },
  {
    href: "/guides/transport/osaka-transportation",
    badge: "Guide",
    title: "Getting Around Osaka (2026): Subway, Trains & IC Cards Explained",
    desc: "Osaka's subway system is one of the easiest in Japan to navigate. We cover the Midosuji Line, the Enjoy Eco Card vs Osaka Metro Pass, IC cards, and key routes to top attractions.",
    group: "cities",
  },
  {
    href: "/guides/transport/ic-cards-japan",
    badge: "Guide",
    title: "IC Cards in Japan 2026: Suica, Pasmo & How to Use Them",
    desc: "An IC card is the single most useful thing you can have in Japan. Here's everything you need to know about Suica, Pasmo, where to get them, and where they work.",
    group: "fares",
  },
  {
    href: "/guides/transport/osaka-metro-pass",
    badge: "Comparison",
    title: "Osaka Metro Pass vs Enjoy Eco Card (2026): Which Should Tourists Buy?",
    desc: "Two Osaka day passes, constantly confused. One is cheaper for a single day and open to anyone; the other is built for two. With the break-even ride count for each.",
    group: "fares",
  },
  {
    href: "/guides/transport/kyoto-subway-bus-pass",
    badge: "Comparison",
    title: "Is the Kyoto Subway & Bus 1-Day Pass Worth It? (2026)",
    desc: "Great value on a temple-hopping day, a waste on a quiet one. We show where the break-even falls — and why the old ¥700 bus pass you may have read about no longer exists.",
    group: "fares",
  },
];

export const transportCategory: GuideCategory = {
  href: "/guides/transport",
  name: "Transport & Getting Around",
  emoji: "🚄",
  intro: [
    "Japanese transport splits into two layers that barely overlap. Long-distance travel between cities runs mostly on JR, where the question is always the same: individual tickets or a pass. Inside a city it is subways, private railways and buses, where a tappable IC card handles almost everything and day passes only pay off on heavy days.",
    "Nothing in the first layer covers the second — the JR Pass will not open a Tokyo Metro gate — so most trips need a decision in each. These guides are grouped that way.",
  ],
  startHere: "/guides/transport/jr-pass-guide",
  startHereWhy:
    "Intercity rail is the biggest line in most Japan transport budgets, and the JR Pass is the one purchase you have to make before you fly. The calculator in this guide settles it for your route in about a minute.",
  groups: [
    {
      key: "passes",
      label: "Rail passes & intercity travel",
      desc: "The JR Pass, the Shinkansen, and how to get between cities for the least money.",
    },
    {
      key: "airports",
      label: "Airport transfers",
      desc: "Getting from Narita, Haneda, Kansai or Itami into the city you actually booked.",
    },
    {
      key: "cities",
      label: "Getting around each city",
      desc: "Tokyo, Kyoto and Osaka: which lines matter and how to read the network.",
    },
    {
      key: "fares",
      label: "Fares, IC cards & day passes",
      desc: "How you pay once you're there — Suica and Pasmo, and when a day pass beats pay-as-you-go.",
    },
  ],
  articles: transportArticles,
};

assertGroupsCover(transportCategory);
