import type { GuideArticle, GuideCategory } from "./guide-hub";
import { assertGroupsCover } from "./guide-hub";

export const attractionArticles: GuideArticle[] = [
  {
    href: "/guides/attractions/teamlab-tokyo-tickets",
    badge: "Tickets",
    title: "teamLab Planets Tickets (2026): Prices, How to Book & Planets vs Borderless",
    desc: "Official Planets prices, the 30-minute entry slots, opening hours and what to wear for the barefoot water areas — plus how Planets differs from Borderless in Azabudai.",
    group: "tokyo",
  },
  {
    href: "/guides/attractions/teamlab-borderless-tickets",
    badge: "Tickets",
    title: "teamLab Borderless Tickets (2026): Prices, Time Slots and How to Book",
    desc: "What a Borderless ticket costs on the official site, how the timed slots and Flexible Pass work, opening hours and closed days, and whether to book direct or through Klook.",
    group: "tokyo",
  },
  {
    href: "/guides/attractions/shibuya-sky-tickets",
    badge: "Tickets",
    title: "Shibuya Sky Tickets (2026): Price, Best Time & How to Book",
    desc: "Shibuya Sky is Tokyo's best rooftop view — and its sunset slots sell out fast. We cover prices, the best time to go, and how to book (even with a foreign card).",
    group: "tokyo",
  },
  {
    href: "/guides/attractions/tokyo-disney-tickets",
    badge: "Tickets",
    title: "Tokyo Disney Tickets (2026): Disneyland & DisneySea — How to Buy",
    desc: "Tokyo Disney tickets are date-specified and sell out weeks ahead — with no gate sales. We explain how to buy (even when the official site blocks foreign cards) and how to choose between Disneyland and DisneySea.",
    group: "parks",
  },
  {
    href: "/guides/attractions/usj-tickets-express-pass",
    badge: "Tickets",
    title: "Universal Studios Japan Tickets & Express Pass (2026): What to Buy",
    desc: "USJ now requires online tickets, and Super Nintendo World needs timed entry. We explain Studio Pass tiers, whether the Express Pass is worth it, and what to buy for your visit.",
    group: "parks",
  },
  {
    href: "/guides/attractions/sumo-tokyo-tickets",
    badge: "Experience",
    title: "Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice",
    desc: "The 2026 Tokyo tournament dates, how to buy official tickets safely (and avoid resale sites), seat types and same-day tickets, plus year-round morning practice tours.",
    group: "culture",
  },
  {
    href: "/guides/attractions/tokyo-skytree-tickets",
    badge: "Tickets",
    title: "Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 & How to Book",
    desc: "Official prices for Floor 350 and the Floor 450 combo, the ¥500 service fee the same-day counter adds, and why buying the skywalk up front is cheaper than adding it on site.",
    group: "tokyo",
  },
  {
    href: "/guides/attractions/warner-bros-studio-tour-tokyo-tickets",
    badge: "Tickets",
    title: "Warner Bros. Studio Tour Tokyo Tickets (2026): Prices & How to Book",
    desc: "Official prices for the Harry Potter studio tour in Nerima, what the Afternoon Tea packages actually add, the four hours to allow, and how to reach Toshimaen.",
    group: "parks",
  },
  {
    href: "/guides/attractions/tokyo-subway-ticket",
    badge: "Pass",
    title: "Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?",
    desc: "The 24/48/72-hour prices from Tokyo Metro, the break-even worked against official single fares, and the exclusion that catches people out — JR, including the Yamanote Line.",
    group: "passes",
  },
  {
    href: "/guides/attractions/mt-fuji-day-tour-from-tokyo",
    badge: "Day tour",
    title: "Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See",
    desc: "Every tour stops at the Subaru Line Fifth Station — what separates them is whether the rest of the day is Fuji or Hakone, and how long you will sit on a coach.",
    group: "daytrips",
  },
  {
    href: "/guides/attractions/hakone-day-trip-from-tokyo",
    badge: "Day tour",
    title: "Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour",
    desc: "Odakyu's official Freepass prices, the eight modes of transport it covers, the Romancecar surcharge it does not — and why there is no 1-day version of the pass.",
    group: "daytrips",
  },
  {
    href: "/guides/attractions/kyoto-nara-day-tour-from-osaka",
    badge: "Day tour",
    title: "Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book",
    desc: "Four itineraries compared on which half of Kyoto they cover, how long the day runs, and whether Todai-ji's ¥800 Great Buddha Hall admission is in the price.",
    group: "daytrips",
  },
];

export const attractionsCategory: GuideCategory = {
  href: "/guides/attractions",
  name: "Things to Do",
  emoji: "🎟️",
  intro: [
    "A handful of Japan's best-known attractions cannot be bought at the gate. teamLab, Tokyo Disney, Universal Studios Japan and the Shibuya Sky sunset slots all sell date- and time-specified tickets online, and the popular slots go weeks ahead — in Disney's case, with no same-day sales at all.",
    "Two things routinely catch visitors out: the official sites sometimes reject foreign cards, and the resale listings that rank well in search are often invalid for entry. These guides cover official prices, which booking route works from abroad, and when to book.",
    "The same reasoning applies to the day trips and transport passes further down the page. A Mt. Fuji or Hakone day out of Tokyo, or a Kyoto-and-Nara day out of Osaka, is a booking decision rather than a sightseeing one — and the pass that looks cheapest often turns out to have a minimum length or an exclusion nobody mentions.",
  ],
  startHere: "/guides/attractions/teamlab-tokyo-tickets",
  startHereWhy:
    "teamLab Planets is the attraction most visitors add to a Tokyo itinerary, and its 30-minute entry slots are the clearest example of how timed-ticket booking in Japan works.",
  groups: [
    {
      key: "tokyo",
      label: "Tokyo art & views",
      desc: "Timed-entry museums and observation decks, where the slot matters as much as the ticket.",
    },
    {
      key: "parks",
      label: "Theme parks",
      desc: "Tokyo Disney and Universal Studios Japan: ticket tiers, express passes and how to buy from abroad.",
    },
    {
      key: "culture",
      label: "Culture & experiences",
      desc: "Things with a calendar of their own — tournaments, seasons and practice sessions.",
    },
    {
      key: "daytrips",
      label: "Day trips & tours",
      desc: "Whole days out of Tokyo and Osaka, where the choice is which itinerary rather than which ticket.",
    },
    {
      key: "passes",
      label: "Attraction & transport passes",
      desc: "Multi-ride and multi-entry passes, with the break-even worked against what single tickets cost.",
    },
  ],
  articles: attractionArticles,
};

assertGroupsCover(attractionsCategory);
