import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  asakusaKimonoYae,
  dotonboriCityCruise,
  hanedaLimousineBus,
  jrHarukaUrl,
  jrPassWholeJapan,
  klookEsim,
  kyotoHighlightBusTour,
  kyotoKimonoAiwafukuStation,
  kyotoKimonoYumeyakata,
  kyotoNaraKiyomizuTour,
  nankaiRapitUrl,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  osakaAmazingPass,
  osakaAquariumKaiyukanTicket,
  osakaCastleTicket,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKyoto,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoKyotoOsakaStayAreas,
  tokyoSubwayTicket,
  usjStudioPassUrl,
} from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import {
  gygShibuyaSky,
  gygTeamlabPlanets,
  gygUsjExpressPass,
  gygKyoto,
  type GygListing,
} from "../../../lib/gyg-links";

/**
 * A seven-day Tokyo–Kyoto–Osaka itinerary: the first-visit route, written as a
 * booking plan with a table for each of the seven days.
 *
 * Deliberately not a shortened japan-14-day-itinerary. That page has four bases,
 * a night at the mountain and two slack days, and it can afford to treat travel as
 * a single long hop on Day 7. Seven days cannot: the two moving days (Tokyo → Kyoto
 * and Kyoto → Osaka) are a third of the trip, so this page is organised around the
 * check-out, the luggage and the boarding time on each of them, and around the
 * flight out of Kansai that the fourteen-day plan reaches with a spare day in hand.
 * Neither page repeats the other's tables.
 *
 * Figures below are either read out of lib/attraction-prices.ts — which carries the
 * operator and the date each was checked — or this page's own reads, dated
 * OWN_CHECKED (25 Oct 2026):
 *
 *   japanrailpass.net        7-day JAPAN RAIL PASS prices, online and Exchange Order
 *   global.jr-central.co.jp  Tokyo–Kyoto "about 130 minutes"; max 18 trains an hour
 *   kyoto.travel             Osaka–Kyoto times by JR, Hankyu and Keihan; Haruka
 *   keihan.co.jp             "about 50 minutes" by limited express; the sightseeing pass
 *   westjr.co.jp             HARUKA one-way prices, including the 1 Nov 2026 revision
 *   nankai.co.jp             Rapi:t minimum 34 minutes and the limited express charge
 *   shokoku-ji.jp            Kinkaku-ji's 9:00–17:00 hours
 *   kiyomizudera.or.jp       Kiyomizu-dera's 6:00 opening
 *
 * Three figures are carried over from this site's own earlier reads and are dated to
 * those: Kinkaku-ji's admission (22 Oct 2026), Osaka Castle's (23 Oct 2026) and the
 * Kaiyukan's price band (22 Oct 2026). The "time to allow" column throughout is our
 * own planning allowance and is labelled as such. No Klook price appears anywhere:
 * Klook answers automated reads of its product pages with HTTP 403.
 */

/** The date this page's own figures were read. */
const OWN_CHECKED = "2026-10-25";
const OWN = checkedLabel(OWN_CHECKED);

/** Kinkaku-ji's admission, from the 22 Oct 2026 read on shokoku-ji.jp. */
const KINKAKUJI_CHECKED = checkedLabel("2026-10-22");

/** Osaka Castle's admission and hours, from the 23 Oct 2026 read on osakacastle.net. */
const OSAKA_CASTLE_CHECKED = checkedLabel("2026-10-23");

/** The Kaiyukan's price band, from the 22 Oct 2026 read on kaiyukan.com. */
const KAIYUKAN_CHECKED = checkedLabel("2026-10-22");

/** Senso-ji's published hours, carried over from the 21 Oct 2026 read on senso-ji.jp. */
const SENSOJI_CHECKED = checkedLabel("2026-10-21");

type Stop = {
  time: string;
  place: string;
  /** Our planning allowance, not an operator figure. */
  allow: string;
  getting: string;
  booking: string;
};

/** One Klook listing to open for a given day. */
type Pick = { label: string; url: string };

type Day = {
  n: number;
  /** The section label, as a reader scanning for "Day 4" would read it. */
  label: string;
  /** The day heading. */
  heading: string;
  intro: ReactNode;
  stops: Stop[];
  /** What to book for this day, in prose. */
  book: ReactNode;
  picks: Pick[];
  /** A second seller, where that day's headline Klook product is a low-paying band. */
  gyg?: GygListing;
};

const days: Day[] = [
  {
    n: 1,
    label: "Day 1",
    heading: "Day 1 — Tokyo: the Airport Run, and One Neighbourhood on Foot",
    intro:
      "Plan this as transport, check-in and one neighbourhood — nothing more. On a seven-day trip the temptation is to make the landing day a sightseeing day, and it never is: Narita is an hour or more from the centre, and you arrive with luggage at the hour the trains are fullest. What this day is actually for is getting your data working, getting the cases into a room, and walking somewhere within twenty minutes of it.",
    stops: [
      {
        time: "On landing",
        place: "Immigration, baggage, and getting your phone online",
        allow: "1–1.5 hours",
        getting: "n/a",
        booking: "An eSIM activated before you fly — there is nothing to collect",
      },
      {
        time: "Afternoon or evening",
        place: "Airport to your Tokyo base",
        allow: "40 minutes to 1.5 hours, by airport and base",
        getting: "Narita Express, Keisei Skyliner or a limousine bus; Keikyu or the monorail from Haneda",
        booking: "Worth booking — a reserved seat with luggage space beats a rush-hour local",
      },
      {
        time: "Late afternoon",
        place: "Check in and drop the cases",
        allow: "1 hour",
        getting: "On foot from the station, if you picked the base for that",
        booking: "Three nights in Tokyo, booked ahead",
      },
      {
        time: "Evening",
        place: "Your own neighbourhood — Omoide Yokocho if you are in Shinjuku, Nakamise if you are in Asakusa",
        allow: "2–3 hours",
        getting: "On foot",
        booking: "No",
      },
    ],
    book: (
      <>
        The airport leg and your data, both before you fly — and the subway ticket for Days 2 and 3
        while you are at it. Which Narita route suits you depends entirely on which side of the city
        you are staying on, and our{" "}
        <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>{" "}
        works through all of them; the limousine bus is the one to pick with large cases or a hotel
        that is not beside a station, and the bus specifically is covered in our{" "}
        <Link href="/guides/transport/tokyo-airport-limousine-bus">Tokyo airport limousine bus guide</Link>.
        The Tokyo Subway Ticket is {PRICES.tokyoSubwayTicket.adult} for 24 hours, ¥1,500 for 48 and
        ¥2,000 for 72 on the official prices we checked — it covers Tokyo Metro and Toei but not JR,
        which is the one thing people get wrong about it.
      </>
    ),
    picks: [
      { label: "Narita Express round trip →", url: naritaExpressRoundTripUrl },
      { label: "Narita limousine bus →", url: naritaLimousineBus.url },
      { label: "Haneda limousine bus →", url: hanedaLimousineBus.url },
      { label: "Tokyo Subway Ticket →", url: tokyoSubwayTicket.url },
      { label: "See Klook eSIM options →", url: klookEsim.url },
    ],
  },
  {
    n: 2,
    label: "Day 2",
    heading: "Day 2 — West Tokyo: Meiji Jingu, Harajuku, Shibuya and a Rooftop at Sunset",
    intro:
      "One side of the Yamanote loop, finishing above it. This is Day 2 rather than Day 3 because it holds the booking most likely to be sold out — the SHIBUYA SKY sunset slot — and a failed booking on Day 2 still has a Day 3 evening to move into. Everything before the rooftop is free to walk into, which is why the day survives a late start after a long flight.",
    stops: [
      {
        time: "Morning, from opening",
        place: "Meiji Jingu and the gravel approach through the forest",
        allow: "1–1.5 hours",
        getting: "JR Yamanote Line to Harajuku; the entrance is beside the station",
        booking: "No ticket — free, and open sunrise to sunset",
      },
      {
        time: "Late morning",
        place: "Takeshita Street, then Omotesando and Cat Street walking south",
        allow: "2 hours",
        getting: "On foot from the shrine",
        booking: "No",
      },
      {
        time: "Early afternoon",
        place: "Shinjuku — the free Metropolitan Government Building decks and Shinjuku Gyoen",
        allow: "2–2.5 hours",
        getting: "Yamanote Line from Harajuku",
        booking: "No — the Tocho decks charge nothing at all",
      },
      {
        time: "Mid-afternoon",
        place: "Shibuya: the Scramble Crossing, Hachiko and the backstreets",
        allow: "1.5 hours",
        getting: "Yamanote Line to Shibuya",
        booking: "No",
      },
      {
        time: "Late afternoon / sunset",
        place: "SHIBUYA SKY, on top of Shibuya Scramble Square",
        allow: "1–1.5 hours",
        getting: "The entrance is inside the station building",
        booking: "Yes — a timed slot, and sunset is the one that sells out",
      },
      {
        time: "Evening",
        place: "Dinner in Shibuya, or two stops back up the line to Shinjuku",
        allow: "2–3 hours",
        getting: "On foot, or one Yamanote hop",
        booking: "No, unless you want a guided crawl",
      },
    ],
    book: (
      <>
        The Shibuya Sky slot, and only the slot — the rest of this day sells no tickets at all.
        Online was {PRICES.shibuyaSky.adult} against {PRICES.shibuyaSky.atDoor} at the door on the
        official prices we checked, and the route you book through matters as much as the price here:
        the official site has rejected many foreign-issued cards since July 2024, which our{" "}
        <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets guide</Link> covers
        in full. If the sunset window has gone, the free Metropolitan Government Building decks in
        Shinjuku are twenty minutes away on the same line and already on this day&apos;s table —{" "}
        <Link href="/guides/attractions/tokyo-observation-decks">our Tokyo observation decks comparison</Link>{" "}
        puts the four side by side.
      </>
    ),
    picks: [
      { label: "Check Shibuya Sky tickets →", url: shibuyaSkyTicketUrl },
      { label: "Tokyo Subway Ticket →", url: tokyoSubwayTicket.url },
    ],
    gyg: gygShibuyaSky,
  },
  {
    n: 3,
    label: "Day 3",
    heading: "Day 3 — East Tokyo: Senso-ji Early, Skytree, and teamLab Planets",
    intro: (
      <>
        The old-town side, and the day with the one genuinely compulsory booking of the week.
        Senso-ji&apos;s main hall opens at 06:00 — 06:30 from October to March, on the temple&apos;s
        own published hours, read on {SENSOJI_CHECKED} — so an early start here buys you more than it
        does anywhere else on this itinerary. Pack this evening: Day 4 is a travel day, and a case
        half-packed at 08:00 costs you the morning train.
      </>
    ),
    stops: [
      {
        time: "Early morning",
        place: "Senso-ji and Nakamise-dori, Asakusa",
        allow: "1.5 hours",
        getting: "Ginza Line or Toei Asakusa Line to Asakusa",
        booking: "No ticket — the main hall opens 06:00 (06:30 October–March)",
      },
      {
        time: "Mid-morning",
        place: "Kimono or yukata rental, then the temple lanes and the Sumida riverside",
        allow: "3–4 hours, including the dressing appointment",
        getting: "The shops are a few minutes on foot from Kaminarimon",
        booking: "Yes — a fixed dressing slot, and the outfit is due back the same day",
      },
      {
        time: "Early afternoon",
        place: "TOKYO SKYTREE, Floor 350, and Solamachi beneath it",
        allow: "2 hours",
        getting: "One stop on the Tobu Skytree Line from Asakusa, or about 20 minutes on foot",
        booking: "Advised — the same-day counter adds a service fee per ticket",
      },
      {
        time: "Mid-afternoon",
        place: "teamLab Planets TOKYO, Toyosu",
        allow: "2 hours, including the entry queue",
        getting: "Yurikamome to Shin-Toyosu, or Yurakucho Line to Toyosu",
        booking: "Required — a 30-minute entry slot, with no walk-up counter",
      },
      {
        time: "Evening",
        place: "Ginza or Tsukishima for dinner, then back to pack",
        allow: "2–3 hours",
        getting: "Yurakucho Line from Toyosu",
        booking: "No",
      },
    ],
    book: (
      <>
        teamLab Planets, without exception: entry is a 30-minute slot, the official store states that
        nothing is sold on site, and the adult price moves with the date — {PRICES.teamlabPlanets.adult}{" "}
        on the figures we checked. Our{" "}
        <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets tickets guide</Link>{" "}
        also covers what to wear, because parts of it are walked barefoot through water. The kimono
        appointment is the booking that shapes this day rather than decorating it — the Klook listing
        for Kimono Yae, by Kaminarimon, asks for the outfit back by 17:30, so plan the return before
        Toyosu rather than after it; our{" "}
        <Link href="/guides/attractions/asakusa-kimono-rental">Asakusa kimono rental guide</Link> sets
        out the deadlines shop by shop. Skytree is worth booking for a different reason: at{" "}
        {PRICES.tokyoSkytree.adult} for an adult, buying ahead is simply cheaper than the same-day
        counter, as our{" "}
        <Link href="/guides/attractions/tokyo-skytree-tickets">Tokyo Skytree tickets guide</Link>{" "}
        explains.
      </>
    ),
    picks: [
      { label: "teamLab Planets tickets →", url: teamlabPlanetsTicketUrl },
      { label: "Asakusa kimono rental →", url: asakusaKimonoYae.url },
      { label: "TOKYO SKYTREE ticket →", url: skytreeTicket.url },
    ],
    gyg: gygTeamlabPlanets,
  },
  {
    n: 4,
    label: "Day 4",
    heading: "Day 4 — Tokyo to Kyoto by Shinkansen, Then East Kyoto in the Late Afternoon",
    intro: (
      <>
        The spine of the whole trip, and the only day with a timetable in it. Tokyo to Kyoto on the
        Tokaido Shinkansen is <strong>about 130 minutes</strong> on JR Central&apos;s own figure,
        checked {OWN}, and the line runs up to a maximum of 18 trains an hour — so the train is never
        the constraint. The constraint is the hotel: Japanese check-out is usually 10:00 or 11:00 and
        check-in 15:00, which is exactly why this day works best as a late-morning departure and an
        afternoon arrival rather than a dawn start.
      </>
    ),
    stops: [
      {
        time: "Morning",
        place: "Check out, and leave the cases with the hotel or in a station locker if you want one last hour",
        allow: "1 hour",
        getting: "n/a",
        booking: "No — but ask the front desk the night before, not on the morning",
      },
      {
        time: "Late morning",
        place: "Tokyo or Shinagawa Station, and the Tokaido Shinkansen",
        allow: "About 130 minutes to Kyoto",
        getting: "Yamanote Line to either; Shinagawa is the quieter boarding station of the two",
        booking: "A reserved seat — and the oversized-baggage row separately if you have a large case",
      },
      {
        time: "Early afternoon",
        place: "Arrive Kyoto Station, drop the bags at the hotel",
        allow: "1 hour",
        getting: "Kyoto Station is the terminus for this leg; subway or bus from there",
        booking: "Two nights in Kyoto, booked ahead",
      },
      {
        time: "Mid-afternoon",
        place: "Kiyomizu-dera and the Sannenzaka and Ninenzaka lanes below it",
        allow: "2.5 hours",
        getting: "Bus 100 or 206 from Kyoto Station to Kiyomizu-michi, then uphill on foot",
        booking: "No — walk up and pay at the gate",
      },
      {
        time: "Late afternoon",
        place: "Yasaka Shrine, Maruyama Park and the Gion lanes",
        allow: "1.5–2 hours",
        getting: "On foot downhill from Ninenzaka",
        booking: "No",
      },
      {
        time: "Evening",
        place: "Pontocho and the Kamo riverbank",
        allow: "2–3 hours",
        getting: "On foot from Gion, across Shijo bridge",
        booking: "No",
      },
    ],
    book: (
      <>
        The seat, and — before the seat — the decision about whether to buy a rail pass at all, which
        the section below works through against the official prices. Reserve rather than turning up:
        seats themselves rarely sell out outside Golden Week, Obon and New Year, but the
        oversized-baggage rows do, and they are reserved separately, which is the one reservation a
        traveller moving cities with a large case should not leave to the platform. Train types and
        fares for this leg are compared in our{" "}
        <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link>, and the seat
        classes and luggage rules in our{" "}
        <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link>. The other thing worth
        booking today is tomorrow: a Kyoto kimono fitting runs on appointments, and the Kyoto Station
        shops are the ones to use when the day starts off a train.
      </>
    ),
    picks: [
      { label: "Tokyo → Kyoto shinkansen tickets →", url: shinkansenTokyoKyoto.url },
      { label: "JAPAN RAIL PASS on Klook →", url: jrPassWholeJapan.url },
      { label: "Kyoto Station kimono rental →", url: kyotoKimonoAiwafukuStation.url },
    ],
  },
  {
    n: 5,
    label: "Day 5",
    heading: "Day 5 — Kyoto, the Full Day: Fushimi Inari at Dawn, Arashiyama and Kinkaku-ji",
    intro: (
      <>
        The one day of the seven where the hour you start genuinely changes what you see. Kyoto&apos;s
        famous sites are small and the coaches arrive at ten; Fushimi Inari has no gate and no closing
        time, Kiyomizu-dera opens at 6:00 on the temple&apos;s own statement, and Kinkaku-ji is 9:00
        to 17:00 — both read on {OWN}. Almost nothing here sells a timed ticket, which makes this the
        easiest day in the itinerary to book and the hardest to pace.
      </>
    ),
    stops: [
      {
        time: "From first light",
        place: "Fushimi Inari Taisha and the torii path up the hill",
        allow: "1.5–3 hours, depending on how far up you go",
        getting: "JR Nara Line to Inari (two stops from Kyoto Station) or Keihan to Fushimi Inari",
        booking: "No — no gate, no fee and no closing time",
      },
      {
        time: "Mid-morning",
        place: "Arashiyama: the bamboo grove, Togetsukyo bridge and Tenryu-ji",
        allow: "3 hours",
        getting: "JR Sagano Line to Saga-Arashiyama, about 15 minutes from Kyoto Station",
        booking: "No for the grove; Tenryu-ji charges at the gate",
      },
      {
        time: "Early afternoon",
        place: "The Sagano Romantic Train or the Hozugawa river boat, if you want one",
        allow: "1–2 hours",
        getting: "Torokko Saga station, beside Saga-Arashiyama",
        booking: "Yes for the scenic railway in autumn and blossom season — it is a reserved seat",
      },
      {
        time: "Mid-afternoon",
        place: "Kinkaku-ji, the Golden Pavilion",
        allow: "1 hour",
        getting: "City bus 11 or 59 towards Kinkakuji-michi, about 40 minutes from Arashiyama",
        booking: "No — 9:00 to 17:00, pay at the gate",
      },
      {
        time: "Late afternoon",
        place: "Nijo Castle or Ryoan-ji, whichever is still open",
        allow: "1–1.5 hours",
        getting: "Bus, or the Tozai subway for Nijo",
        booking: "No",
      },
      {
        time: "Evening",
        place: "Nishiki Market's covered arcade and Kawaramachi for dinner",
        allow: "2 hours",
        getting: "Karasuma subway to Shijo",
        booking: "No",
      },
    ],
    book: (
      <>
        Almost nothing — and that is the single most useful fact about a Kyoto day. The temples are
        walk-up: Kinkaku-ji was ¥500 for an adult and ¥300 for elementary and junior-high children on
        the figures we read on {KINKAKUJI_CHECKED}. The two things that do run on a booking are the
        Sagano scenic railway in peak colour and a kimono fitting, which has a dressing slot and a
        return deadline in the shop&apos;s calendar rather than yours — our{" "}
        <Link href="/guides/attractions/kyoto-kimono-rental">Kyoto kimono rental guide</Link> splits
        the shops by area and sets out the return times. If two Kyoto days in a seven-day trip feels
        like navigation rather than sightseeing, the one-day highlight coach ties Kiyomizu-dera,
        Kinkaku-ji, Fushimi Inari and Arashiyama into a single guided day. And if you would rather
        swap this day out of Kyoto altogether, Nara is well under an hour each way with Todai-ji&apos;s
        Great Buddha Hall at {PRICES.todaiji.adult} for an adult — our{" "}
        <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link> has the routes from
        both Kyoto and Osaka.
      </>
    ),
    picks: [
      { label: "Kyoto one-day highlight bus tour →", url: kyotoHighlightBusTour.url },
      { label: "Kyoto & Nara day trip →", url: kyotoNaraKiyomizuTour.url },
      { label: "Kyoto kimono rental (Yumeyakata) →", url: kyotoKimonoYumeyakata.url },
    ],
    gyg: gygKyoto,
  },
  {
    n: 6,
    label: "Day 6",
    heading: "Day 6 — Kyoto to Osaka, the Castle, the Bay and Dotonbori",
    intro: (
      <>
        A move that is barely a move. On the official Kyoto travel guide&apos;s figures, checked{" "}
        {OWN}, Osaka Station to Kyoto Station is about <strong>30 minutes</strong> on the JR Special
        Rapid, Osaka-umeda to Kyoto-Kawaramachi about <strong>45 minutes</strong> on the Hankyu, and
        Yodoyabashi to downtown Kyoto about <strong>48 minutes</strong> on the Keihan limited express —
        Keihan&apos;s own site puts that at &ldquo;about 50 minutes with no transfer&rdquo;. Nothing on
        any of them is reserved, so there is no seat to book and no departure to make: leave after
        breakfast, be in Osaka before the hotel will take the bags.
      </>
    ),
    stops: [
      {
        time: "Morning",
        place: "Check out of Kyoto and cross to Osaka",
        allow: "About 30 minutes by JR, 45 by Hankyu, 48 by Keihan",
        getting: "JR Special Rapid from Kyoto Station, Hankyu from Kawaramachi, or Keihan from Sanjo",
        booking: "No — a turn-up-and-go leg, and an IC card opens the gate",
      },
      {
        time: "Late morning",
        place: "Drop the bags, then Osaka Castle and the park around it",
        allow: "2–2.5 hours",
        getting: "Osaka Loop Line to Osakajokoen, or the Tanimachi subway",
        booking: "No — the main tower is 9:00 to 18:00, last admission 17:30",
      },
      {
        time: "Early afternoon",
        place: "Osaka Aquarium Kaiyukan, or Shinsekai and Tsutenkaku if you would rather stay on land",
        allow: "3 hours for the aquarium",
        getting: "Chuo Line to Osakako for the Kaiyukan; Midosuji Line for Shinsekai",
        booking: "Advised for the Kaiyukan — it sells 15-minute entry slots and prices by date",
      },
      {
        time: "Late afternoon",
        place: "Kuromon Market and the Namba arcades",
        allow: "1.5–2 hours",
        getting: "Midosuji Line to Namba or Nipponbashi",
        booking: "No",
      },
      {
        time: "Evening",
        place: "Dotonbori, the Glico sign and a river cruise",
        allow: "3 hours",
        getting: "On foot from Namba",
        booking: "Yes for the cruise — the boats run to fixed departure times",
      },
    ],
    book: (
      <>
        The pass, if your Osaka day looks like this one, and the cruise if you want it. The Osaka
        Amazing Pass is {PRICES.osakaAmazingPass.adult} for one day and ¥3,300 for two on the figures
        we checked, and it bundles unlimited Osaka Metro and city buses with more than 40 free
        admissions — a genuinely different proposition from a Tokyo subway ticket, and our{" "}
        <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link> works
        the break-even. Two things everyone assumes it covers and it does not: Universal Studios Japan
        and the Kaiyukan. Osaka Castle&apos;s main tower was ¥1,200 for an adult and ¥600 for a
        student, 9:00–18:00 with last admission 17:30, read on {OSAKA_CASTLE_CHECKED} — and it is one
        of the admissions the pass does cover, which our{" "}
        <Link href="/guides/attractions/osaka-castle-tickets">Osaka Castle tickets guide</Link>{" "}
        prices out against the four other paid facilities inside the same walls. The Kaiyukan ran
        ¥2,700 to ¥3,200 for an adult depending on the date, on 15-minute entry slots, read on{" "}
        {KAIYUKAN_CHECKED}; the detail is in our{" "}
        <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets">Kaiyukan tickets guide</Link>.
        <br />
        <br />
        <strong>If you would rather give this day to Universal Studios Japan,</strong> do it instead
        of the castle and the bay rather than alongside them — USJ is a ten-hour day, it has not sold
        same-day tickets at the gate since May 2025, and Super Nintendo World needs timed entry on top
        of park admission. That makes it the one swap on this itinerary you have to decide before you
        fly; our{" "}
        <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets and Express Pass guide</Link>{" "}
        explains the Studio Pass tiers and when the Express Pass earns its price, and{" "}
        <Link href="/guides/attractions/things-to-do-osaka">our Osaka round-up</Link> covers what else
        the city pass reaches.
      </>
    ),
    picks: [
      { label: "Osaka Amazing Pass (1-day / 2-day) →", url: osakaAmazingPass.url },
      { label: "Dotonbori river cruise →", url: dotonboriCityCruise.url },
      { label: "Osaka Castle ticket →", url: osakaCastleTicket.url },
      { label: "Kaiyukan ticket →", url: osakaAquariumKaiyukanTicket.url },
      { label: "USJ Studio Pass →", url: usjStudioPassUrl },
    ],
    gyg: gygUsjExpressPass,
  },
  {
    n: 7,
    label: "Day 7",
    heading: "Day 7 — A Last Osaka Morning, and the Flight Out of Kansai",
    intro: (
      <>
        Finish in Osaka because Kansai Airport is easy from it and awkward from everywhere else. The
        Nankai Rapi:t connects Namba and Kansai Airport in a minimum of <strong>34 minutes</strong> on
        Nankai&apos;s own figure; the JR Haruka runs from Tennoji, Shin-Osaka and Kyoto. Both checked{" "}
        {OWN}. Work backwards from the flight: three hours before an international departure, plus the
        run out, plus the tax-free customs step if you are claiming it — which has to be done before
        baggage check-in, not after.
      </>
    ),
    stops: [
      {
        time: "Early morning",
        place: "Breakfast at Kuromon Market, or the last of the Shinsaibashi arcade",
        allow: "1.5–2 hours",
        getting: "On foot from Namba",
        booking: "No",
      },
      {
        time: "Mid-morning",
        place: "Check out, and any tax-free refund paperwork before you leave the shops behind",
        allow: "1 hour",
        getting: "n/a",
        booking: "No — but the refund has to clear before baggage check-in",
      },
      {
        time: "Midday",
        place: "Osaka to Kansai Airport",
        allow: "A minimum of 34 minutes from Namba on the Rapi:t",
        getting: "Nankai Rapi:t from Namba, or the JR Haruka from Tennoji or Shin-Osaka",
        booking: "Worth booking — a reserved seat with luggage space",
      },
      {
        time: "At the airport",
        place: "Check-in, customs confirmation for the refund, security",
        allow: "Allow 3 hours before an international departure",
        getting: "n/a",
        booking: "No",
      },
    ],
    book: (
      <>
        The airport leg, the night before at the latest. Which of the two trains suits you is a
        question of where you slept, and both have a catch worth knowing. The Rapi:t&apos;s limited
        express charge is ¥700 for an adult and ¥350 for a child <em>on top of</em> the basic fare, on
        Nankai&apos;s own figures checked {OWN}. The HARUKA one-way ticket is sold only to foreign
        passport holders entering Japan as a Temporary Visitor, cannot be bought once you are in the
        country, and its prices change on 1 November 2026 — ¥1,600 to Tennoji, ¥1,900 to Osaka or
        Shin-Osaka and ¥2,700 to Kyoto for an adult from that date, against ¥1,300, ¥1,800 and ¥2,200
        before it, read off JR West&apos;s own page on {OWN}. Our{" "}
        <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Nankai Rapi:t comparison</Link>{" "}
        puts them side by side and our{" "}
        <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer guide</Link> adds
        the Itami routes. If you are claiming consumption tax back on the week&apos;s shopping, our{" "}
        <Link href="/guides/money/tax-free-shopping-japan">tax-free shopping guide</Link> explains the
        order the airport wants it done in.
      </>
    ),
    picks: [
      { label: "JR Haruka ticket →", url: jrHarukaUrl },
      { label: "Nankai Rapi:t ticket →", url: nankaiRapitUrl },
    ],
  },
];

/** Nights per base — the decision every other one follows from. */
const nightsRows = [
  {
    base: "Tokyo",
    nights: "3 nights (Days 1–3)",
    why: "An airport day, the west side of the loop with the rooftop slot, and the east side with teamLab Planets. Three nights is the minimum that gives you two whole days here.",
    moving: "40 minutes to 1.5 hours in from the airport",
  },
  {
    base: "Kyoto",
    nights: "2 nights (Days 4–5)",
    why: "An arrival afternoon in east Kyoto and one full day for Fushimi Inari, Arashiyama and Kinkaku-ji. Swap the full day for Nara if you have seen enough temples.",
    moving: "About 130 minutes from Tokyo on the Tokaido Shinkansen",
  },
  {
    base: "Osaka",
    nights: "1 night (Day 6), flying out on Day 7",
    why: "One city day — the castle, the bay and Dotonbori, or Universal Studios Japan instead of all three — and a short morning before the airport.",
    moving: "About 30 minutes from Kyoto by JR Special Rapid",
  },
];

/** Published journey times for the legs between the three cities and the airports. */
const longDistance = [
  {
    leg: "Tokyo → Kyoto (Day 4)",
    how: "Tokaido Shinkansen from Tokyo or Shinagawa",
    time: "About 130 minutes; about 170 minutes on the Hikari",
    cost: "Fare and seat class move with the train type and season — check your date",
    source: "global.jr-central.co.jp, kyoto.travel",
    checked: OWN_CHECKED,
  },
  {
    leg: "Kyoto → Osaka (Day 6), JR",
    how: "JR Special Rapid, Kyoto Station to Osaka Station",
    time: "About 30 minutes",
    cost: "Ordinary JR fare, no surcharge; a JR pass covers it",
    source: "kyoto.travel",
    checked: OWN_CHECKED,
  },
  {
    leg: "Kyoto → Osaka (Day 6), Hankyu",
    how: "Hankyu Kyoto Line, Kyoto-Kawaramachi to Osaka-umeda",
    time: "About 45 minutes",
    cost: "Private railway, so not JR-pass valid; the PRiVACE reserved seat is a flat ¥500 extra",
    source: "kyoto.travel, hankyu.co.jp",
    checked: OWN_CHECKED,
  },
  {
    leg: "Kyoto → Osaka (Day 6), Keihan",
    how: "Keihan Main Line limited express, Sanjo or Gion-Shijo to Yodoyabashi",
    time: "About 48 minutes; Keihan's own site says \"about 50 minutes with no transfer\"",
    cost: "Private railway. The KYOTO-OSAKA SIGHTSEEING PASS is ¥1,650 for 1 day, ¥1,850 for 24 hours",
    source: "kyoto.travel, keihan.co.jp",
    checked: OWN_CHECKED,
  },
  {
    leg: "Osaka → Kansai Airport (Day 7), Nankai",
    how: "Limited Express Rapi:t from Nankai Namba",
    time: "A minimum of 34 minutes",
    cost: "Limited express charge ¥700 adult / ¥350 child on top of the basic fare; Super Seat ¥910 / ¥560",
    source: "nankai.co.jp",
    checked: OWN_CHECKED,
  },
  {
    leg: "Osaka or Kyoto → Kansai Airport (Day 7), JR",
    how: "JR Haruka limited express from Tennoji, Shin-Osaka or Kyoto",
    time: "About 80 minutes to Kyoto, on the official Kyoto travel guide's figure",
    cost: "HARUKA one-way ticket, from 1 Nov 2026: ¥1,600 Tennoji, ¥1,900 Osaka/Shin-Osaka, ¥2,700 Kyoto (adult)",
    source: "westjr.co.jp, kyoto.travel",
    checked: OWN_CHECKED,
  },
];

/** Official transport and admission prices only. No hotel or food figures anywhere. */
const budgetRows = [
  {
    item: "JAPAN RAIL PASS, 7-day Ordinary (adult)",
    price: "¥50,000 bought online, ¥53,000 as an overseas Exchange Order",
    used: "Optional — and on this route almost certainly not worth it. See the section below.",
    source: "japanrailpass.net",
    checked: OWN_CHECKED,
  },
  {
    item: "Tokyo Subway Ticket (24 / 48 / 72 hour)",
    price: `${PRICES.tokyoSubwayTicket.adult} / ¥1,500 / ¥2,000 adult`,
    used: "Days 1–3. Covers Tokyo Metro and Toei but not JR, including the Yamanote Line.",
    source: PRICES.tokyoSubwayTicket.source,
    checked: PRICES.tokyoSubwayTicket.checked,
  },
  {
    item: "SHIBUYA SKY",
    price: `${PRICES.shibuyaSky.adult} online, ${PRICES.shibuyaSky.atDoor} at the door`,
    used: "Day 2, the sunset slot — the one booking on this trip that sells out by time of day.",
    source: PRICES.shibuyaSky.source,
    checked: PRICES.shibuyaSky.checked,
  },
  {
    item: "TOKYO SKYTREE, Floor 350",
    price: `${PRICES.tokyoSkytree.adult} adult, ${PRICES.tokyoSkytree.child} child`,
    used: "Day 3. The same-day counter adds a ¥500 service fee per ticket.",
    source: PRICES.tokyoSkytree.source,
    checked: PRICES.tokyoSkytree.checked,
  },
  {
    item: "teamLab Planets TOKYO",
    price: `${PRICES.teamlabPlanets.adult} adult, ${PRICES.teamlabPlanets.child} child`,
    used: "Day 3. The one compulsory booking of the week — a 30-minute slot, nothing sold on site.",
    source: PRICES.teamlabPlanets.source,
    checked: PRICES.teamlabPlanets.checked,
  },
  {
    item: "Tokyo Metropolitan Government Building decks",
    price: PRICES.tochoDeck.adult,
    used: "Day 2. No ticket of any kind, and the fallback if the Shibuya Sky slot has gone.",
    source: PRICES.tochoDeck.source,
    checked: PRICES.tochoDeck.checked,
  },
  {
    item: "Kinkaku-ji, Kyoto",
    price: "¥500 adult (high school and above), ¥300 elementary and junior high",
    used: "Day 5. Open 9:00–17:00, pay at the gate.",
    source: "shokoku-ji.jp",
    checked: "2026-10-22",
  },
  {
    item: "Todai-ji Great Buddha Hall, Nara",
    price: `${PRICES.todaiji.adult} adult, ${PRICES.todaiji.child} child`,
    used: "Day 5, if you swap Kyoto's full day for Nara. Nara Park and the deer are free.",
    source: PRICES.todaiji.source,
    checked: PRICES.todaiji.checked,
  },
  {
    item: "Osaka Amazing Pass",
    price: `${PRICES.osakaAmazingPass.adult} for 1 day (2-day ¥3,300)`,
    used: "Day 6. Unlimited Osaka Metro and city buses plus 40-plus admissions; not USJ or the Kaiyukan.",
    source: PRICES.osakaAmazingPass.source,
    checked: PRICES.osakaAmazingPass.checked,
  },
  {
    item: "Osaka Castle, main tower",
    price: "¥1,200 adult, ¥600 student, free below high school",
    used: "Day 6. 9:00–18:00 with last admission 17:30 — and it is on the Amazing Pass.",
    source: "osakacastle.net",
    checked: "2026-10-23",
  },
  {
    item: "Osaka Aquarium Kaiyukan",
    price: "¥2,700 – ¥3,200 adult, by date",
    used: "Day 6, optional. Dynamic pricing and 15-minute entry slots; not on the Amazing Pass.",
    source: "kaiyukan.com",
    checked: "2026-10-22",
  },
  {
    item: "KYOTO-OSAKA SIGHTSEEING PASS (Keihan)",
    price: "¥1,650 for 1 day, ¥1,850 for 24 hours",
    used: "Day 6, if you cross to Osaka on the Keihan and use it to get around Kyoto first.",
    source: "keihan.co.jp",
    checked: OWN_CHECKED,
  },
  {
    item: "HARUKA one-way ticket to Kansai Airport (from 1 Nov 2026)",
    price: "¥1,600 Tennoji, ¥1,900 Osaka / Shin-Osaka, ¥2,700 Kyoto — adult; child half",
    used: "Day 7. Sold only to foreign passport holders on a Temporary Visitor entry, and not on sale inside Japan.",
    source: "westjr.co.jp",
    checked: OWN_CHECKED,
  },
  {
    item: "Nankai Rapi:t limited express charge",
    price: "¥700 adult / ¥350 child regular seat, on top of the basic fare (Super Seat ¥910 / ¥560)",
    used: "Day 7. Namba to Kansai Airport in a minimum of 34 minutes.",
    source: "nankai.co.jp",
    checked: OWN_CHECKED,
  },
];

const bookingWindow = [
  {
    title: "Book before you fly (weeks out)",
    desc: "teamLab Planets, because entry is a 30-minute slot and the official store states nothing is sold on site. The SHIBUYA SKY sunset window, which is the one slot of its day that goes. Universal Studios Japan with Super Nintendo World timed entry, if Day 6 is a park day — USJ stopped selling at the gate in May 2025. All three hotels, because seven days gives you no room to move a city. And the arrival airport transfer, which is the one queue you cannot plan around after a long flight.",
  },
  {
    title: "Book a few days out",
    desc: "The Day 4 shinkansen seat, and the oversized-baggage row separately if you are carrying a large case. Tokyo Skytree, where booking ahead is simply cheaper than the same-day counter. The Kaiyukan if Day 6 includes it, because the entry slot is in 15-minute units and the price moves by date. A Dotonbori river cruise, which runs to fixed departures. Any kimono appointment in Asakusa or Kyoto, and the Sagano scenic railway in autumn colour or blossom season.",
  },
  {
    title: "Do not bother booking",
    desc: "Senso-ji, Meiji Jingu, the Scramble Crossing, the free Metropolitan Government Building decks, Kiyomizu-dera, Gion, Fushimi Inari, the Arashiyama bamboo grove, Kinkaku-ji, Nara Park, Osaka Castle Park and the Dotonbori streets. None of them sells a timed ticket — and the Kyoto to Osaka leg belongs in this column too, because nothing on the JR, Hankyu or Keihan route is reserved.",
  },
];

const faqItems = [
  {
    q: "How do you spend 7 days in Japan?",
    a: `Three cities and nothing else: three days in Tokyo, two in Kyoto and two in Osaka, which is three nights, two nights and one — flying out of Kansai on the evening of Day 7. Each extra base in a seven-day trip costs a morning of packing and an afternoon of travelling, and at this length that is the difference between a trip and a transfer. The two moving days are short: Tokyo to Kyoto is about 130 minutes on the Tokaido Shinkansen, and Kyoto to Osaka about 30 minutes on the JR Special Rapid. Both times are the operators' own, checked ${OWN}.`,
  },
  {
    q: "Is 7 days enough for Tokyo, Kyoto and Osaka?",
    a: "Enough for one honest pass at each, and not enough for a day trip as well. Seven days buys two full Tokyo days plus an airport day, one full Kyoto day plus an arrival afternoon, and one Osaka day plus a departure morning — which covers the headline sights in all three and leaves nothing spare. What it does not stretch to is Mt. Fuji, Hiroshima or Nara on top; each of those needs a day you would have to take from a city. If you have the nights, our 14-day itinerary shows what the unhurried version looks like; if you do not, treat Nara as a swap for the second Kyoto day rather than an addition.",
  },
  {
    q: "How do you get from Tokyo to Kyoto?",
    a: `The Tokaido Shinkansen from Tokyo or Shinagawa Station — about 130 minutes on JR Central's own figure, and about 170 minutes on the slower Hikari, both checked ${OWN}. JR Central's own Tokaido Shinkansen page puts the line at a maximum of 18 trains an hour, so there is no need to plan your day around a departure; what is worth reserving is the seat, and the oversized-baggage row separately if you have a large case, because those are limited and are booked apart from the seat. We do not print a single fare: JR Central publishes its fare tables as PDFs rather than pages and the figure moves with train type and season, so check your date on the official Smart EX site or Klook's Tokyo-to-Kyoto rail page, and read the comparison in our Tokyo to Kyoto guide.`,
  },
  {
    q: "How do you get from Kyoto to Osaka?",
    a: `Three ways, none of them reserved and none needing a booking. On the official Kyoto travel guide's figures, checked ${OWN}: the JR Special Rapid is about 30 minutes from Kyoto Station to Osaka Station, the Hankyu Kyoto Line about 45 minutes from Kyoto-Kawaramachi to Osaka-umeda, and the Keihan limited express about 48 minutes from Yodoyabashi — Keihan's own site describes it as "about 50 minutes with no transfer". Pick by where you are staying rather than by speed: JR if your hotel is at Kyoto Station, Hankyu or Keihan if it is around Shijo and Kawaramachi. The shinkansen also runs Kyoto to Shin-Osaka, but it is the wrong tool for this hop — it lands you north of the city centre and costs a supplement for about a quarter of an hour.`,
  },
  {
    q: "Is the JR Pass worth it for 7 days in Japan?",
    a: `Almost certainly not on this route. The 7-day Ordinary JAPAN RAIL PASS is ¥50,000 bought online and ¥53,000 as an overseas Exchange Order for an adult, with the Green car versions at ¥70,000 and ¥74,000 and child prices half the adult ones — read off japanrailpass.net on ${OWN}. Set that against what this itinerary actually spends on long-distance rail: one Tokyo–Kyoto run and one Kyoto–Osaka hop. A whole-country pass is built for a trip that crosses regions every second or third day, and three cities in a week is the opposite shape. There is a second catch for exactly this leg: the pass does not cover the Nozomi without a supplementary ticket issued only to pass holders, so a pass would put you on the slower Hikari on Day 4. Our JR Pass guide works the break-even properly.`,
  },
  {
    q: "What needs booking in advance on a Tokyo Kyoto Osaka itinerary?",
    a: "Four things, and the rest is walk-in. teamLab Planets is the only genuinely compulsory one — a 30-minute entry slot with nothing sold on site. The SHIBUYA SKY sunset window is the one that disappears by time of day rather than by date. The Day 4 shinkansen seat is worth reserving, and its oversized-baggage row is booked separately. And all three hotels, because a seven-day trip has no spare night to move. If Day 6 is a Universal Studios Japan day, that becomes a fifth and the earliest of them all. Everything in Kyoto on Days 4 and 5 can be decided on the morning.",
  },
  {
    q: "Where should you stay in Tokyo, Kyoto and Osaka for a 7-day trip?",
    a: "Beside a station that is also an interchange, in each city — which matters more than the room when you are changing base twice in a week. In Tokyo: Shinjuku for the Yamanote loop and the airport trains, Tokyo Station or Marunouchi if you want the Day 4 shinkansen under your hotel, or Ueno and Asakusa if you are arriving on the Keisei Skyliner. In Kyoto: Kyoto Station, where the shinkansen puts you down and the sightseeing buses start, or Shijo-Kawaramachi and Karasuma for the evenings and the private lines to Osaka. In Osaka: Namba, which is the Nankai terminus for the Day 7 airport run, or Umeda if you are arriving from Kyoto by JR or Hankyu. The section above links Klook's hotel search for each.",
  },
  {
    q: "Should you start in Tokyo or Osaka?",
    a: "Tokyo first if you can fly into Narita or Haneda and out of Kansai, which is what this itinerary assumes — it means no leg is retraced and the last day is a 34-minute run to the airport rather than a 130-minute train plus a transfer. An open-jaw ticket sometimes costs a little more than a return into one city, and it is usually worth it: flying home from Tokyo costs you most of a day on the shinkansen and a seventh night near an airport line. If your ticket is fixed to Tokyo at both ends, run the trip the other way round — Osaka, Kyoto, then Tokyo — so the long train happens on Day 5 rather than on the morning you fly.",
  },
  {
    q: "How much does 7 days in Japan cost in tickets and transport?",
    a: "Less than most people expect for the sightseeing, because most of Kyoto and much of Tokyo is free to walk into. The paid items on this plan are a 72-hour subway ticket, two Tokyo observation or art tickets, one temple admission in Kyoto, a city pass and a castle in Osaka, the two inter-city trains and the run to the airport. Every figure is in the dated table above with the operator's site and the date it was read. We publish no hotel or food estimates on purpose: those move by season, city and party size, and an invented average is worse than none.",
  },
  {
    q: "What do you do on a rainy day in Tokyo, Kyoto or Osaka?",
    a: "Each city has its own indoor answer, which is why a wet forecast costs you an afternoon rather than a day. In Tokyo it is teamLab Planets, entirely indoors, and the Solamachi complex under Skytree. In Kyoto it is Nishiki Market's covered arcade and the Kyoto Railway Museum, with Sanjusangendo as the wet-weather temple because it is one long hall. In Osaka it is the Shinsaibashi arcade, which runs covered for most of a kilometre into Dotonbori, and the Kaiyukan. The one thing rain genuinely ruins is the rooftop: an observation deck in low cloud shows you cloud, so move the SHIBUYA SKY slot rather than sitting it out.",
  },
  {
    q: "Does a 7-day Tokyo Kyoto Osaka itinerary work with kids?",
    a: "Yes, with two changes and no extra days. First, cut the stops per day rather than the days — four a day instead of six, with the timed ticket in the morning while everyone is fresh. Second, swap one adult sight per city for a child-shaped one: Tokyo Skytree and Solamachi instead of a second shrine, the Kyoto Railway Museum instead of Kinkaku-ji, and in Osaka either the Kaiyukan or Universal Studios Japan in place of the castle-and-arcades day. Child rates are published for most of the ticketed stops here and are in the table above. The two moving days are the easy part with children: both are short, and the shinkansen has luggage space and a seat each.",
  },
  {
    q: "Do you need an eSIM or pocket WiFi for a week in Japan?",
    a: "You need working data, and for seven days an eSIM is the simplest way to have it — every timed ticket on this plan arrives as a QR code in an inbox, the Kyoto bus stops are easier with a map than without, and the Day 7 airport run is a timetable you will check from a platform. Activate it before you fly rather than queueing at an airport counter. Our Japan eSIM data plans guide works out how much data a week like this actually uses, and our best eSIM for Japan guide compares the providers.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary") },
});

const TITLE = "Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan";
const DESC =
  "A Tokyo Kyoto Osaka itinerary for 7 days in Japan: Tokyo 3 nights, Kyoto 2, Osaka 1, flying out of Kansai — a table per day with times and dated prices.";
const ROUTE = "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

export default function TokyoKyotoOsaka7DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: ROUTE,
              headline: TITLE,
              description: DESC,
              updated,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Tokyo Kyoto Osaka Itinerary", item: URL },
              ],
            }),
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo Kyoto Osaka Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Kyoto Osaka Itinerary (2026):<br />7 Days in Japan, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            The first-visit route, planned around the two travel days and the four bookings that
            actually have to be made ahead.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Day 1 to Day 7 tables", "Official prices and times, dated"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box — the answer, before anything else */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>Split the week 3 / 2 / 2:</strong> three days in Tokyo, two in Kyoto and two in
              Osaka — three nights, two nights and one, flying home from Kansai on Day 7. The two moves
              are short and both were checked {OWN}: Tokyo to Kyoto is{" "}
              <strong>about 130 minutes</strong> on the Tokaido Shinkansen, and Kyoto to Osaka{" "}
              <strong>about 30 minutes</strong> on the JR Special Rapid (45 on the Hankyu, 48 on the
              Keihan). Only four things in the whole week have to be booked before you fly — teamLab
              Planets, the SHIBUYA SKY sunset slot, the Day 4 shinkansen seat and the three hotels —
              and everything in Kyoto can be decided on the morning.
            </p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>The route</p>
                <p className={styles.verdictStatValue}>Tokyo → Kyoto → Osaka, out from Kansai</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nights per base</p>
                <p className={styles.verdictStatValue}>3 / 2 / 1</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must book ahead</p>
                <p className={styles.verdictStatValue}>teamLab Planets, Shibuya Sky sunset, the Day 4 seat</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass?</p>
                <p className={styles.verdictStatValue}>No — two trains do not pay for ¥50,000</p>
              </div>
            </div>
            <KlookLink
              href={shinkansenTokyoKyoto.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check Tokyo → Kyoto shinkansen tickets on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Route overview */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should You Split 7 Days Between Tokyo, Kyoto and Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By nights, and by three bases rather than four. A week is long enough to see all three
            cities properly and short enough that one unnecessary move ruins it: packing up, checking
            out and checking in again costs most of a day whatever the train does. Here is the split
            this itinerary uses and what each base is actually for.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Base", "Nights", "What those nights are for", "Getting there"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nightsRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.base}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.moving}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            What this guide does differently is treat the week as a booking and logistics problem
            rather than a list of sights. Most of Japan is walk-in — nearly all of Kyoto is — and the
            handful of things that are not will quietly decide your schedule if you let them. So each
            of the seven days below carries its own table: time of day, where, how long to allow, how
            you get there, and whether it needs booking, with that day&apos;s listings directly
            underneath it. The two travel days get the same treatment as the sightseeing ones, because
            on a seven-day trip they are a third of it.
          </p>
          <p className={styles.bodyText}>
            If your trip is a different length, our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> and{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">Tokyo 5-day itinerary</Link> stay in
            and around one city, and our{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14-day itinerary</Link> adds
            a night at Mt. Fuji, Nara and a Hiroshima day to this same corridor. The city round-ups
            for <Link href="/guides/attractions/things-to-do-tokyo">Tokyo</Link>,{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">Kyoto</Link> and{" "}
            <Link href="/guides/attractions/things-to-do-osaka">Osaka</Link> each list what to book
            ahead in that city and what to simply turn up to.
          </p>
        </section>

        {/* Day 1 to Day 7 */}
        {days.map((day) => (
          <section key={day.n} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{day.label}</span>
            <h2 className={styles.sectionTitle}>{day.heading}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{day.intro}</p>
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["Time of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {day.stops.map((row) => (
                      <tr key={row.place}>
                        <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
              <strong>What to book for Day {day.n}.</strong> {day.book}
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              {day.picks.map((pick) => (
                <KlookLink
                  key={pick.url}
                  href={pick.url}
                  target="_blank"
                  rel="sponsored noopener"
                  className={styles.pickCta}
                >
                  {pick.label}
                </KlookLink>
              ))}
              {day.gyg ? (
                <GygCompareButton slug="tokyo-kyoto-osaka-7-day-itinerary" listing={day.gyg} />
              ) : null}
            </div>
          </section>
        ))}

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          The &ldquo;time to allow&rdquo; column in all seven tables is our own planning allowance, not
          an operator figure. Journey times, prices and opening hours are in the two dated tables
          below, each against the operator&apos;s own site.
        </p>

        {/* Long-distance legs and the rail-pass decision */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting between the cities</span>
          <h2 className={styles.sectionTitle}>How Long Does Tokyo to Kyoto and Kyoto to Osaka Take?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About two hours and about half an hour respectively — and both operators publish the
            figures, which is worth knowing before you commit to a day. These two legs are the only
            long-distance travel on this itinerary, and the second is short enough that it does not
            cost you a morning.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "How", "Published journey time", "Fare / surcharge", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {longDistance.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.how}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem", whiteSpace: "normal" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.82rem" }}>
                        {row.source}, {checkedLabel(row.checked)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>Is a JR Pass worth it for seven days?</strong> Almost certainly not on this route,
            and it is worth settling first because it decides whether you buy single tickets or a pass.
            The 7-day Ordinary JAPAN RAIL PASS is <strong>¥50,000</strong> bought online and{" "}
            <strong>¥53,000</strong> as an overseas Exchange Order for an adult; the Green car versions
            are ¥70,000 and ¥74,000, and child prices are half the adult ones. Read off
            japanrailpass.net on {OWN}. Against that, this itinerary&apos;s long-distance travel is one
            Tokyo–Kyoto run and one half-hour hop — a pass built for crossing regions every second day
            has nothing to do here. The pass also does not cover the Nozomi without a supplementary
            ticket issued only to pass holders, so it would put you on the slower Hikari on Day 4. Our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works the break-even
            properly, our <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link>{" "}
            covers seat classes and the oversized-baggage rules, and our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> compares the
            train types and fares for the one leg that matters.
          </p>
          <p className={styles.bodyText}>
            <strong>What actually sells out, and what you can change.</strong> Shinkansen seats rarely
            sell out outside Golden Week, Obon and New Year — but the oversized-baggage rows do, and
            they are reserved separately from the seat. Nothing on the Kyoto to Osaka leg is reserved
            at all, on any of the three routes, so there is nothing to book and nothing to miss. A rail
            pass bought through a reseller has its own refund window, which is worth reading before the
            Day 4 date is fixed rather than after.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen on Klook →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS on Klook →
            </KlookLink>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR Haruka to Kansai Airport →
            </KlookLink>
          </div>
        </section>

        {/* Where to stay — all three cities in one section */}
        <KlookStayAreas
          heading="Where Should You Stay in Tokyo, Kyoto and Osaka for a 7-Day Trip?"
          intro="Beside a station that is also an interchange, in each city — and on a seven-day trip, chosen around the two moving days rather than around the sights. Tokyo Station puts the Day 4 shinkansen under your hotel; Kyoto Station is where that train arrives and where the sightseeing buses start; Namba is the Nankai terminus the Day 7 airport run leaves from. The alternatives in each city are the ones to pick if your arrival or your evenings matter more."
          areas={tokyoKyotoOsakaStayAreas}
        />

        {/* Budget */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; passes</span>
          <h2 className={styles.sectionTitle}>What Do 7 Days in Japan Cost in Tickets and Transport?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Less than most people expect for the sightseeing, and more than they expect for the one
            long train. Every figure below is an operator&apos;s own published price with the site it
            was read off and the date it was read — not an estimate, and not a Klook price. There are
            no hotel or food figures here at all, deliberately: those move by season, city and party
            size, and an invented average is worse than none.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Official price", "Where it falls on this plan", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {budgetRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem", whiteSpace: "normal" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.used}</td>
                      <td style={{ fontSize: "0.82rem" }}>
                        {row.source}, {checkedLabel(row.checked)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm at booking. The rail-pass, Keihan pass, HARUKA and Rapi:t rows
            were read on {OWN}; Kinkaku-ji&apos;s admission on {KINKAKUJI_CHECKED}, Osaka
            Castle&apos;s on {OSAKA_CASTLE_CHECKED} and the Kaiyukan&apos;s band on{" "}
            {KAIYUKAN_CHECKED}; every other row carries the date from our own guide for that ticket.
            The ticketed attractions also appear, with the same figures and dates, in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>. For what a trip costs beyond tickets, see our{" "}
            <Link href="/guides/money/japan-travel-budget" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan travel budget guide
            </Link>.
          </p>
        </section>

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>What Needs Booking in Advance, and How Far Ahead?</h2>
          <p className={styles.bodyText}>
            Four things out of roughly thirty stops, which is the single most useful fact to hold
            before you start planning a week in Japan. Here is the whole itinerary sorted by how far
            ahead each thing has to be bought.
          </p>
          <div className={styles.whoForGrid}>
            {bookingWindow.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>Cancellation, and why the route you book through matters.</strong> Seven days has
            no slack in it: there is no spare day to move a rained-off rooftop into, and no second
            Osaka day if a park date goes wrong. That makes the dated bookings — the timed decks,
            teamLab Planets, a USJ date — the ones worth buying through a route that lets you change or
            cancel, rather than the walk-in temples, which carry no risk at all. It is also the
            practical argument for Klook on the timed tickets specifically: it checks out in English,
            takes foreign cards the official Shibuya Sky site has rejected since July 2024, and keeps
            all seven days on one account. Read the cancellation terms on each listing before the date
            is fixed; they differ by product, and we do not restate them here because they change.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets on Klook →
            </KlookLink>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shibuya Sky on Klook →
            </KlookLink>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass on Klook →
            </KlookLink>
            <GygCompareButton slug="tokyo-kyoto-osaka-7-day-itinerary" listing={gygTeamlabPlanets} />
          </div>
        </section>

        <KlookTourPicks
          heading="If You Would Rather Hand a Day to Somebody Else"
          intro="Three of the seven days work as a guided day instead of a plan of your own — the Kyoto full day, the Nara swap for it, and the Osaka city day, which a pass covers almost entirely. Klook blocks automated price reads, so open a listing for the figure on your own date."
          tours={[kyotoHighlightBusTour, kyotoNaraKiyomizuTour, osakaAmazingPass, dotonboriCityCruise]}
        />

        {/* Second seller for the low-band tickets on this page */}
        <GygCompare
          slug="tokyo-kyoto-osaka-7-day-itinerary"
          heading="If a Timed Slot or a Park Date Has Already Gone"
          intro="A week absorbs very little: a sold-out teamLab Planets slot, a Shibuya Sky sunset that went weeks ago or a USJ date with no Express Pass left cannot be fixed by reordering the days, because there is no spare day to reorder into. All three are sold on GetYourGuide as well, and the Kyoto catalogue is there if you are rebuilding a day from scratch."
          listings={[gygTeamlabPlanets, gygShibuyaSky, gygUsjExpressPass, gygKyoto]}
        />

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rainy day</span>
          <h2 className={styles.sectionTitle}>What Do You Do on a Rainy Day on This Itinerary?</h2>
          <p className={styles.bodyText}>
            Swap within the day rather than between days — because with seven days there is no spare
            day to swap into. Each city already holds its own indoor anchor, so a wet morning costs you
            an afternoon&apos;s plan rather than a leg of the trip.
          </p>
          <p className={styles.bodyText}>
            <strong>In Tokyo,</strong> Day 3 is already weatherproof:{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets</Link> is indoors
            throughout and Solamachi under Skytree is a mall. Day 2 is the vulnerable one, because an
            observation deck in low cloud shows you cloud — move the SHIBUYA SKY slot to the Day 3
            evening rather than sitting it out, and our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">deck comparison</Link> covers
            which of the four is worth the gamble on a marginal day. Nakamise-dori in Asakusa is roofed
            for most of its length.
          </p>
          <p className={styles.bodyText}>
            <strong>In Kyoto,</strong> Nishiki Market&apos;s covered arcade and the Kyoto Railway
            Museum are the two indoor hours, and Sanjusangendo is the wet-weather temple because the
            whole visit happens inside one long hall. Fushimi Inari is better in rain than in sun; the
            Arashiyama bamboo grove is not.
          </p>
          <p className={styles.bodyText}>
            <strong>In Osaka,</strong> the Shinsaibashi arcade runs covered for most of a kilometre
            into Dotonbori, which makes the shopping half of Day 6 rain-proof by accident, and the{" "}
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets">Kaiyukan</Link> is the
            indoor version of the bay. Osaka Castle&apos;s keep is an eight-floor indoor museum; the
            Nishinomaru Garden and the Gozabune boat around it are not.
          </p>
        </section>

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Does This 7-Day Itinerary Work With Kids?</h2>
          <p className={styles.bodyText}>
            Yes, with two changes and no extra days. Cut the stops per day rather than the days — four
            a day instead of six, with the timed ticket in the morning while everyone is fresh — and
            swap one adult sight per city for a child-shaped one. The two travel days are the easy part
            with children: both are short, the shinkansen has a seat each and space for the cases, and
            nothing on the Kyoto to Osaka leg needs a reservation.
          </p>
          <p className={styles.bodyText}>
            The three swaps that work without moving anything else:{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets">Tokyo Skytree</Link> and Solamachi
            in place of a second shrine on Day 2 or 3, the Kyoto Railway Museum in place of Kinkaku-ji
            on Day 5, and on Day 6 either the Kaiyukan or{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">Universal Studios Japan</Link>{" "}
            instead of the castle-and-arcades day. USJ is the one that has to be decided before you
            fly, because it is date-specified and Super Nintendo World needs timed entry as well.
            Child rates are published for most of the ticketed stops on this plan and are in the dated
            table above.
          </p>
        </section>

        {/* Arrival, data and the flight home */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Arrival &amp; data</span>
          <h2 className={styles.sectionTitle}>Should You Fly Into Tokyo and Out of Kansai?</h2>
          <p className={styles.bodyText}>
            If the ticket allows it, yes — and this itinerary is built on that assumption. Flying into
            Narita or Haneda and out of Kansai means no leg is retraced and the last day is a short run
            to the airport rather than a 130-minute train plus a transfer. An open-jaw ticket sometimes
            costs a little more than a return into one city; set that against most of a day and a
            seventh night. If your return is fixed to Tokyo, run the week in reverse — Osaka, Kyoto,
            Tokyo — so the long train happens in the middle rather than on the morning you fly.
          </p>
          <p className={styles.bodyText}>
            The arrival run is the one worth settling before you leave. From Narita, the Narita Express
            reaches Tokyo Station, Shinjuku and Shibuya without a transfer and the Keisei Skyliner is
            the fast option for the Ueno and Asakusa side; the limousine bus is the pick with large
            cases or a hotel that is not beside a station. Journey times and the route-by-route
            comparison are in our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>.
            From Haneda, the Keikyu Line and the Tokyo Monorail both reach the Yamanote loop quickly
            enough that the choice matters much less.
          </p>
          <p className={styles.bodyText}>
            One more thing to settle before you fly, and it is not transport: data. Every timed ticket
            on this plan is a QR code in an inbox, every &ldquo;getting there&rdquo; column above
            assumes you can open a map, and the Kyoto bus network is the part of the week where that
            matters most.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/japan-esim-data-plans">Japan eSIM data plans guide</Link> works
            out how much data a week of maps, tickets and messaging actually needs, and our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the
            providers in full.
          </p>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 27 Oct 2026: Day 6 offers USJ as an alternative to the castle day,
                and that is the choice on this itinerary that has to be made before the
                flights — the Express Pass is dated and capped per day. */}
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V11l4-3 5 4 5-4 4 3v10z" />
                  <path d="M12 21v-5" />
                  <path d="M7 11V6l2-2 2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disneyland Tickets 2026: Prices, Rules &amp; DisneySea</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Express Pass 2026: Types, Prices &amp; Do You Need One</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-10-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sagano-romantic-train-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sagano Romantic Train Tickets (2026): Prices, Seats &amp; When It Runs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/arima-onsen-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 14h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
                  <path d="M9 10c0-2 1.5-2.5 1.5-4.5M14 10c0-2 1.5-2.5 1.5-4.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Arima Onsen Day Trip (2026): From Osaka or Kobe, and What the Baths Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9" />
                  <path d="M4 15h16l-2 4H6z" />
                  <line x1="9" y1="7" x2="15" y2="7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="10" rx="2" />
                  <line x1="7" y1="12" x2="17" y2="12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9" />
                  <path d="M4 15h16l-2 4H6z" />
                  <line x1="9" y1="7" x2="15" y2="7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V9l8-5 8 5v11" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l9-5 9 5v13" />
                  <path d="M3 13h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Prices, How to Book &amp; Planets vs Borderless</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V8l8-5 8 5v12" />
                  <path d="M4 14h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="10" rx="2" />
                  <line x1="7" y1="12" x2="17" y2="12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Settle the four bookings first</h2>
            <p className={styles.ctaBannerDesc}>
              teamLab Planets, the Shibuya Sky sunset slot, the Day 4 shinkansen seat and the three
              hotels are the only things in these seven days that can be gone when you want them — and
              a week has no spare day to work around any of them. Klook checks out in English, takes
              foreign cards the official sites sometimes reject, and keeps all three cities on one
              account.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Book the Tokyo → Kyoto shinkansen on Klook →
              </KlookLink>
              <GygCompareButton slug="tokyo-kyoto-osaka-7-day-itinerary" listing={gygKyoto} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
