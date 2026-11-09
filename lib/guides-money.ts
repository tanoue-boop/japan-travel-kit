import type { GuideArticle, GuideCategory } from "./guide-hub";
import { assertArticleMeta } from "./guide-hub";

export const moneyArticles: GuideArticle[] = [
  {
    href: "/guides/money/wise-vs-revolut-japan",
    badge: "Comparison",
    title: "Wise vs Revolut Japan (2026): Which Travel Card Wins?",
    desc: "Wise vs Revolut Japan: free ATM allowances, exchange fees and Revolut's weekend markup side by side, with advice on which card suits your spending.",
    group: "cards",
    city: "other",
  },
  {
    href: "/guides/money/best-travel-card-japan",
    badge: "Guide",
    title: "Best Travel Card for Japan (2026): Fees and ATM Limits Compared",
    desc: "Debit, prepaid and credit compared on card cost, foreign transaction fees, exchange rate and Japanese ATM fees — plus which card to carry from the US, UK, Australia, Canada and the Eurozone.",
    group: "cards",
    city: "other",
  },
  {
    href: "/guides/money/wise-card-japan",
    badge: "Guide",
    title: "Wise Card in Japan (2026): ATM Fees, Free Limits & Which ATMs Take It",
    desc: "Yes, the Wise card works at Japanese ATMs. Free withdrawals to 250 USD/GBP/EUR or 400 AUD a month, then 2.69% — plus the ¥220 Japan Post Bank adds per use.",
    group: "cards",
    city: "other",
  },
  {
    href: "/guides/money/revolut-card-japan",
    badge: "Guide",
    title: "Revolut in Japan (2026): Fees, ATMs & Is It Worth It?",
    desc: "Does Revolut work in Japan? We break down the plans, weekday and weekend FX fees, ATM limits, and whether Revolut is worth it for your trip.",
    group: "cards",
    city: "other",
  },
  {
    href: "/guides/money/cash-vs-card-japan",
    badge: "Guide",
    title: "Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen",
    desc: "METI puts Japan's cashless share at 58.0% of consumer spending — and yet temples, market stalls and local buses still want yen. Place by place, what each operator says it takes.",
    group: "cash",
    city: "other",
  },
  {
    href: "/guides/money/atms-in-japan",
    badge: "Guide",
    title: "ATMs in Japan (2026): Which Accept Foreign Cards & What the Fees Are",
    desc: "Five ATM networks take a card issued abroad — Seven Bank, Japan Post Bank, E-net, Lawson Bank and AEON — and only one publishes its fee. Brands, fees, hours and limits compared.",
    group: "cash",
    city: "other",
  },
  {
    href: "/guides/money/how-much-yen-to-bring-japan",
    badge: "Guide",
    title: "How Much Yen to Bring to Japan 2026: Cash per Day",
    desc: "A cash float of ¥2,000–¥3,000 a day on a budget trip and ¥5,000–¥8,000 if you eat out — not the whole budget. 3, 7 and 14-day totals, and the gates, lockers and buses that take nothing else.",
    group: "cash",
    city: "other",
  },
  {
    href: "/guides/money/currency-exchange-japan",
    badge: "Guide",
    title: "Currency Exchange in Japan (2026): Best Ways to Get Yen",
    desc: "Where you exchange your money makes a big difference. We rank the best options from 7-Eleven ATMs to airport counters — and explain which to avoid to get the best yen rate.",
    group: "cash",
    city: "other",
  },
  {
    href: "/guides/money/contactless-payment-japan",
    badge: "Guide",
    title: "Contactless Payment in Japan (2026): What Actually Works",
    desc: "Japan runs three contactless systems and they are not interchangeable — your tap-to-pay Visa will not open a ticket gate. Which tap works where, and why you should skip QR pay.",
    group: "paying",
    city: "other",
  },
  {
    href: "/guides/money/tax-free-shopping-japan",
    badge: "Guide",
    title: "Tax-Free Shopping in Japan (2026): The ¥5,000 Rule and the New Airport Refund",
    desc: "¥5,000 before tax per shop per day, on a non-resident passport. From 1 November 2026 the 10% comes back at an airport customs terminal instead of at the till — here is the official procedure.",
    group: "paying",
    city: "other",
  },
  {
    href: "/guides/money/japan-travel-budget",
    badge: "Guide",
    title: "Japan Travel Budget 2026: Cost per Day, Rail and the JR Pass",
    desc: "How much things cost in Japan, built only out of published prices: a ¥178 subway ride, a ¥420 bowl of ramen, official admissions, the three cities' lodging-tax bands, what the shinkansen adds, when a JR Pass pays off, and 3 to 14-day totals.",
    group: "planning",
    city: "other",
  },
  {
    href: "/guides/money/tokyo-trip-cost",
    badge: "Guide",
    title: "Trip to Tokyo Cost (2026): Per Day, 5-Day and 7-Day Totals",
    desc: "About ¥19,500–¥21,400 per person per day at the 2025 average for room, food and transport plus one deck, on the Tokyo government's own visitor survey, with saving and top-end tiers, 3, 5 and 7-day totals and the fixed airport and ticket costs.",
    group: "planning",
    city: "tokyo",
  },
  {
    href: "/guides/money/best-travel-insurance-japan",
    badge: "Comparison",
    title: "Best Travel Insurance for Japan 2026: Who Needs What, Cost",
    desc: "Which policy suits your trip, the prices insurers publish, from US$62.72 per 4 weeks, when you would need it in Japan, and how ski cover works.",
    group: "planning",
    city: "other",
  },
  {
    href: "/guides/money/safetywing-vs-heymondo-japan",
    badge: "Comparison",
    title: "SafetyWing vs Heymondo for Japan (2026): Which Should You Pick?",
    desc: "The two insurers head to head on price, medical limits, app support, ski wording and cancellation cover, read on their own pages.",
    group: "planning",
    city: "other",
  },
  {
    href: "/guides/money/japan-ski-travel-insurance",
    badge: "Comparison",
    title: "Best Travel Insurance for Skiing and Snowboarding in Japan (2026)",
    desc: "On-piste cover, off-piste limits and rescue bills, compared on published wording, with the pick for a family ski trip to Hokkaido.",
    group: "planning",
    city: "other",
  },
];

export const moneyCategory: GuideCategory = {
  href: "/guides/money",
  name: "Money & Payment",
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

assertArticleMeta(moneyCategory);
