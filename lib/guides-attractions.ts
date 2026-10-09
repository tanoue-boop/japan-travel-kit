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
];

export const attractionsCategory: GuideCategory = {
  href: "/guides/attractions",
  name: "Things to Do",
  emoji: "🎟️",
  intro: [
    "A handful of Japan's best-known attractions cannot be bought at the gate. teamLab, Tokyo Disney, Universal Studios Japan and the Shibuya Sky sunset slots all sell date- and time-specified tickets online, and the popular slots go weeks ahead — in Disney's case, with no same-day sales at all.",
    "Two things routinely catch visitors out: the official sites sometimes reject foreign cards, and the resale listings that rank well in search are often invalid for entry. These guides cover official prices, which booking route works from abroad, and when to book.",
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
  ],
  articles: attractionArticles,
};

assertGroupsCover(attractionsCategory);
