import type { GuideArticle, GuideCategory } from "./guide-hub";
import { assertGroupsCover } from "./guide-hub";

export const moneyArticles: GuideArticle[] = [
  {
    href: "/guides/money/wise-vs-revolut-japan",
    badge: "Comparison",
    title: "Wise vs Revolut for Japan (2026): Which Travel Card Wins?",
    desc: "Wise or Revolut for Japan? We compare exchange rates, weekend fees, ATM limits, and plans — with clear advice on which card suits your spending.",
    group: "cards",
  },
  {
    href: "/guides/money/best-travel-card-japan",
    badge: "Guide",
    title: "Best Travel Card for Japan (2026): Top Picks for Foreign Visitors",
    desc: "Which travel card saves you the most money in Japan? We compare Wise, Revolut, Charles Schwab, Starling, and Monzo on exchange rates, ATM fees, and real-world usability.",
    group: "cards",
  },
  {
    href: "/guides/money/wise-card-japan",
    badge: "Guide",
    title: "Wise Card in Japan (2026): Fees, ATMs & How to Use It",
    desc: "Does the Wise card work in Japan? We cover fees, the mid-market rate, 7-Eleven ATM limits, how to avoid DCC, and how to get the most out of Wise on your trip.",
    group: "cards",
  },
  {
    href: "/guides/money/revolut-card-japan",
    badge: "Guide",
    title: "Revolut in Japan (2026): Fees, ATMs & Is It Worth It?",
    desc: "Does Revolut work in Japan? We break down the plans, weekday and weekend FX fees, ATM limits, and whether Revolut is worth it for your trip.",
    group: "cards",
  },
  {
    href: "/guides/money/cash-vs-card-japan",
    badge: "Guide",
    title: "Cash vs Card in Japan (2026): What Actually Works?",
    desc: "Japan is still surprisingly cash-heavy — but cards work in more places than you'd think. We break down where to use each, which ATMs accept foreign cards, and how to avoid hidden fees.",
    group: "cash",
  },
  {
    href: "/guides/money/atms-in-japan",
    badge: "Guide",
    title: "ATMs in Japan (2026): Where to Find Them & How to Use Them",
    desc: "Most Japanese ATMs don't accept foreign cards. We explain which ones do — 7-Eleven, Japan Post, AEON — and how to avoid fees and withdrawal limits.",
    group: "cash",
  },
  {
    href: "/guides/money/currency-exchange-japan",
    badge: "Guide",
    title: "Currency Exchange in Japan (2026): Best Ways to Get Yen",
    desc: "Where you exchange your money makes a big difference. We rank the best options from 7-Eleven ATMs to airport counters — and explain which to avoid to get the best yen rate.",
    group: "cash",
  },
  {
    href: "/guides/money/contactless-payment-japan",
    badge: "Guide",
    title: "Contactless Payment in Japan (2026): What Actually Works",
    desc: "Japan runs three contactless systems and they are not interchangeable — your tap-to-pay Visa will not open a ticket gate. Which tap works where, and why you should skip QR pay.",
    group: "paying",
  },
  {
    href: "/guides/money/tax-free-shopping-japan",
    badge: "Guide",
    title: "Tax-Free Shopping in Japan (2026): How to Get Your Consumption Tax Back",
    desc: "As a tourist, you can save up to 10% on electronics, clothing, cosmetics, and more. We explain the rules, eligible stores, minimum spend, and what to watch out for on departure.",
    group: "paying",
  },
  {
    href: "/guides/money/japan-travel-budget",
    badge: "Guide",
    title: "Japan Travel Budget Guide (2026): How Much Does Japan Cost?",
    desc: "Japan is not as expensive as you think. We break down realistic daily budgets for backpackers, mid-range, and comfortable travellers — with 2026 prices for food, transport, and accommodation.",
    group: "planning",
  },
  {
    href: "/guides/money/best-travel-insurance-japan",
    badge: "Comparison",
    title: "Best Travel Insurance for Japan (2026): Compared & Reviewed",
    desc: "We compare Heymondo, SafetyWing, and World Nomads on medical cover, price structure, ski cover, and English support — with picks for every type of Japan trip.",
    group: "planning",
  },
  {
    href: "/guides/money/safetywing-vs-heymondo-japan",
    badge: "Comparison",
    title: "SafetyWing vs Heymondo for Japan (2026): Which Should You Pick?",
    desc: "Subscription vs trip cover for Japan. We compare medical limits, app support, ski cover, and waiting periods so you know which insurer fits your trip.",
    group: "planning",
  },
];

export const moneyCategory: GuideCategory = {
  href: "/guides/money",
  name: "Money & Payment",
  emoji: "💴",
  intro: [
    "Japan has a reputation for being cash-only that is roughly a decade out of date — cards and IC cards now work in most city shops, restaurants and convenience stores. What has not changed is that small businesses, shrines, local buses and rural areas often still take cash only, and that most foreign cards are refused by most Japanese ATMs.",
    "So the money question for a Japan trip is really three questions: which card to bring, how to get yen once you land, and what to tap where. These guides cover them in that order, then the budgeting and insurance you sort before you fly.",
  ],
  startHere: "/guides/money/wise-vs-revolut-japan",
  startHereWhy:
    "Which card you bring decides what every purchase and every withdrawal costs you for the whole trip, and the two cards most visitors choose between are Wise and Revolut. Settle this first.",
  groups: [
    {
      key: "cards",
      label: "Travel cards & accounts",
      desc: "Which card to bring, and what it actually costs to spend and withdraw with it.",
    },
    {
      key: "cash",
      label: "Cash, ATMs & exchange",
      desc: "Getting yen in hand: which ATMs take foreign cards and where to never exchange money.",
    },
    {
      key: "paying",
      label: "Paying in Japan",
      desc: "Tapping, IC cards, QR apps, and claiming the consumption tax back on the way out.",
    },
    {
      key: "planning",
      label: "Budget & insurance",
      desc: "What the trip will cost, and the cover worth buying before you go.",
    },
  ],
  articles: moneyArticles,
};

assertGroupsCover(moneyCategory);
