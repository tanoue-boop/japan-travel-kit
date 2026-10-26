import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  arashiyamaNaraTodaijiTour,
  asakusaKimonoYae,
  dotonboriCityCruise,
  fujiHakoneDayTour,
  hakoneFreepass,
  hanedaLimousineBus,
  japanTenDayStayAreas,
  jrHarukaUrl,
  jrPassWholeJapan,
  kamakuraEnoshimaDayTourUrl,
  klookEsim,
  kyotoKimonoAiwafukuStation,
  kyotoNaraArashiyamaTour,
  kyotoNaraKiyomizuTour,
  mtFujiPass,
  nankaiRapitUrl,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  osakaAmazingPass,
  osakaAquariumKaiyukanTicket,
  osakaCastleTicket,
  saganoHozugawaGuaranteedTour,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKyoto,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoDisneyStayAreas,
  tokyoMtFujiHighwayBus,
  tokyoSubwayTicket,
  usjStudioPassUrl,
} from "../../../lib/klook-links";
import {
  gygFujiFromTokyo,
  gygKyoto,
  gygNara,
  gygShibuyaSky,
  gygTeamlabPlanets,
  gygUsjExpressPass,
  type GygListing,
} from "../../../lib/gyg-links";

/**
 * Japan 10 Day Itinerary — ten days as 4 / 3 / 2 nights, with one mountain day
 * doing double duty as the move between the first two bases.
 *
 * Deliberately not a stretched tokyo-kyoto-osaka-7-day-itinerary and not a
 * trimmed japan-14-day-itinerary, and the difference is structural rather than
 * cosmetic:
 *
 *   7 days  three bases, no day trips, travel is a third of the trip
 *   10 days four bases' worth of days on three hotel bills — a fourth Tokyo day,
 *           a Hakone or Fuji day that ends on a westbound train, and a Nara day
 *           out of Kyoto. Nine nights, three check-ins.
 *   14 days four bases including a night at the mountain, plus Hiroshima and
 *           slack days this plan does not have.
 *
 * None of the three repeats the others' tables.
 *
 * Figures below are either read out of lib/attraction-prices.ts — which carries
 * the operator and the date each was checked — or from this page's own reads,
 * dated OWN_CHECKED (26 Oct 2026):
 *
 *   japanrailpass.net   the full 7 / 14 / 21-day price grid, both purchase routes
 *   odakyu-global.com   Shinjuku–Hakone-Yumoto "approx. 80 min"; the ¥1,200 /
 *                       ¥600 Romancecar surcharge on top of the Freepass
 *   visitnara.jp        Kyoto–Nara and Osaka–Nara journey times, Nara
 *                       Prefecture's own official travel guide
 *
 * Four figures are carried over from this site's own earlier reads and are dated
 * to those rather than to today: JR Central's "about 130 minutes" Tokyo–Kyoto and
 * the Kyoto–Osaka times (25 Oct 2026), the HARUKA prices effective 1 Nov 2026 and
 * the Nankai Rapi:t surcharge (25 Oct 2026), Kinkaku-ji's admission
 * (22 Oct 2026) and Osaka Castle's (23 Oct 2026).
 *
 * The "time to allow" column throughout is our own planning allowance and is
 * labelled as such. No Klook price appears anywhere: Klook answers automated
 * reads of its product pages with HTTP 403. There are no hotel or food estimates
 * at all, on purpose.
 */

/** The date this page's own figures were read. */
const OWN_CHECKED = "2026-10-26";
const OWN = checkedLabel(OWN_CHECKED);

/** JR Central's Tokaido figures and the Kyoto–Osaka times, from the 25 Oct 2026 read. */
const RAIL_CHECKED = checkedLabel("2026-10-25");

/** Kinkaku-ji's admission, from the 22 Oct 2026 read on shokoku-ji.jp. */
const KINKAKUJI_CHECKED = checkedLabel("2026-10-22");

/** Osaka Castle's admission and hours, from the 23 Oct 2026 read on osakacastle.net. */
const OSAKA_CASTLE_CHECKED = checkedLabel("2026-10-23");

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
  label: string;
  heading: string;
  intro: ReactNode;
  stops: Stop[];
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
      "Transport, check-in, and one neighbourhood within twenty minutes of the door. Ten days is long enough that you do not have to spend the landing day proving something: Narita is an hour or more from the centre, you arrive with cases at the hour the trains are fullest, and the day you try to sightsee through jet lag is the day you remember least. What this day is for is getting the phone online, getting the luggage into a room, and eating somewhere nearby.",
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
        booking: "Four nights in Tokyo, booked ahead",
      },
      {
        time: "Evening",
        place: "Your own neighbourhood — Omoide Yokocho in Shinjuku, Nakamise in Asakusa, the Marunouchi side if you are at Tokyo Station",
        allow: "2–3 hours",
        getting: "On foot",
        booking: "No",
      },
    ],
    book: (
      <>
        The airport leg and your data, both before you fly, plus the subway ticket for Days 2 to 4.
        Which Narita route suits you depends entirely on which side of the city you are sleeping on,
        and our{" "}
        <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>{" "}
        works through all of them; the limousine bus is the one to pick with large cases or a hotel
        that is not beside a station, and it has a guide of its own in our{" "}
        <Link href="/guides/transport/tokyo-airport-limousine-bus">Tokyo airport limousine bus guide</Link>.
        The Tokyo Subway Ticket is {PRICES.tokyoSubwayTicket.adult} for 24 hours, ¥1,500 for 48 and
        ¥2,000 for 72 on the official prices we checked. On a ten-day trip the 72-hour version is the
        one that fits, because Days 2, 3 and 4 are all Metro and Toei days — and it covers neither JR
        nor the Yamanote Line, which is the thing people get wrong about it.
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
      "One side of the Yamanote loop, finishing above it. This is Day 2 rather than later because it holds the booking most likely to be gone — the SHIBUYA SKY sunset slot — and on a ten-day plan a failed sunset booking has three more Tokyo evenings to move into, which is the single biggest practical advantage this trip length has over a week. Everything before the rooftop is free to walk into, so the day survives a late start after a long flight.",
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
        The Shibuya Sky slot, and nothing else — the rest of this day sells no tickets at all. Online
        was {PRICES.shibuyaSky.adult} against {PRICES.shibuyaSky.atDoor} at the door on the official
        prices we checked, and the route you book through matters as much as the price: the official
        site has rejected many foreign-issued cards since July 2024, which our{" "}
        <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets guide</Link> covers
        in full. If the sunset window has gone for your date, move it rather than dropping it — you
        have Day 3 and Day 4 evenings spare, and in winter the{" "}
        <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations</Link> make an
        evening of their own in exactly these districts. The free Metropolitan Government Building
        decks in Shinjuku are the no-ticket fallback and are already on this day&apos;s table;{" "}
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
        The old-town side, and the day with the one genuinely compulsory booking of the trip.
        Senso-ji&apos;s main hall opens at 06:00 — 06:30 from October to March, on the temple&apos;s
        own published hours, read on {SENSOJI_CHECKED} — so an early start buys you more here than
        anywhere else in Tokyo. teamLab Planets is the fixed point: a 30-minute entry slot with
        nothing sold on site, which means this day is built around a time you chose weeks ago.
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
        place: "Ginza, Tsukishima or the Odaiba waterfront for dinner",
        allow: "2–3 hours",
        getting: "Yurakucho Line from Toyosu, or the Yurikamome out to Odaiba",
        booking: "No",
      },
    ],
    book: (
      <>
        teamLab Planets, without exception: entry is a 30-minute slot, the official store states
        nothing is sold on site, and the adult price moves with the date — {PRICES.teamlabPlanets.adult}{" "}
        on the figures we checked. Our{" "}
        <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets tickets guide</Link>{" "}
        also covers what to wear, because parts of it are walked barefoot through water. The kimono
        appointment shapes this day rather than decorating it — the Klook listing for Kimono Yae, by
        Kaminarimon, asks for the outfit back by 17:30, so plan the return before Toyosu rather than
        after it; our{" "}
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
    heading: "Day 4 — The Fourth Tokyo Day: a Park, a Coast or a Shrine Town",
    intro: (
      <>
        This is the day a seven-day trip does not have, and the reason to plan ten rather than
        seven. Three days covers Tokyo&apos;s headline sights; the fourth is the one where you pick
        something the city round-ups treat as optional. There are three honest versions of it, and
        only one of them has to be decided before you fly.
      </>
    ),
    stops: [
      {
        time: "Option A — all day",
        place: "Tokyo Disneyland or DisneySea, Maihama",
        allow: "A full day, 10 hours or more",
        getting: "JR Keiyo Line from Tokyo Station, about 15–20 minutes",
        booking: "Required, weeks ahead — date-specified, with no gate sales",
      },
      {
        time: "Option B — all day",
        place: "Kamakura and Enoshima: the Great Buddha, Hase-dera and the coast",
        allow: "A full day, about 8 hours door to door",
        getting: "JR Yokosuka Line from Tokyo or Shinagawa, about an hour",
        booking: "No — the temples take cash at the gate",
      },
      {
        time: "Option C — all day",
        place: "Nikko: Toshogu and the Kegon Falls side of the valley",
        allow: "A long full day, 10–11 hours door to door",
        getting: "Tobu limited express from Asakusa, or the shinkansen to Utsunomiya",
        booking: "The train seat only, and worth it in autumn",
      },
      {
        time: "Evening, whichever you picked",
        place: "Back in Tokyo — and pack, because Day 5 starts early with luggage",
        allow: "2–3 hours",
        getting: "The same line back",
        booking: "No",
      },
    ],
    book: (
      <>
        Only one of the three, and only if it is Disney. A Tokyo Disney ticket is date-specified and
        has had no same-day gate sales for some time, which makes it the earliest booking on this
        itinerary after the hotels — our{" "}
        <Link href="/guides/attractions/tokyo-disney-tickets">Tokyo Disney tickets guide</Link>{" "}
        explains how to buy it when the official site rejects your card, and if the park day is the
        point of the trip it is worth sleeping at Maihama rather than commuting to a gate that opens
        before the Keiyo Line gets busy. Kamakura needs nothing booked at all: Kotoku-in is{" "}
        {PRICES.kotokuin.adult} for an adult and Hase-dera {PRICES.hasedera.adult}, both paid at the
        gate, and our{" "}
        <Link href="/guides/attractions/kamakura-day-trip">Kamakura day trip guide</Link> has the
        walking order. Nikko is the one to reserve a seat for rather than a ticket;{" "}
        <Link href="/guides/attractions/nikko-day-trip">our Nikko day trip guide</Link> covers which
        train and how long the valley really takes. And if none of the three appeals,{" "}
        <Link href="/guides/attractions/things-to-do-tokyo">our Tokyo round-up</Link> lists what else
        in the city is worth a whole day.
      </>
    ),
    picks: [
      { label: "Kamakura & Enoshima day tour →", url: kamakuraEnoshimaDayTourUrl },
      { label: "Hotels around Maihama →", url: tokyoDisneyStayAreas[0].url },
      { label: "Hotels in Urayasu / Shin-Urayasu →", url: tokyoDisneyStayAreas[1].url },
      { label: "Tokyo Subway Ticket →", url: tokyoSubwayTicket.url },
    ],
  },
  {
    n: 5,
    label: "Day 5",
    heading: "Day 5 — Hakone or Mt. Fuji, and the Train West to Kyoto",
    intro: (
      <>
        The day that makes this a ten-day plan rather than a week plus three. You check out of Tokyo
        in the morning, spend the day in the mountains, and sleep in Kyoto — and the reason that
        works is geography: <strong>Odawara, the gateway station for Hakone, is on the Tokaido
        Shinkansen</strong>, so a Hakone day can end on a westbound train instead of doubling back
        to Tokyo. The Odakyu Romancecar runs Shinjuku to Hakone-Yumoto in{" "}
        <strong>approx. 80 minutes</strong> on Odakyu&apos;s own figure, checked {OWN}. Leave the
        cases in a Hakone-Yumoto or Odawara locker for the day; do not drag them round the loop.
      </>
    ),
    stops: [
      {
        time: "Early morning",
        place: "Check out of Tokyo, and the Romancecar from Shinjuku",
        allow: "Approx. 80 minutes to Hakone-Yumoto",
        getting: "Odakyu Limited Express Romancecar; the Freepass covers the fare, not the surcharge",
        booking: "The Romancecar seat is reserved, so yes — and the Freepass separately",
      },
      {
        time: "Mid-morning",
        place: "Luggage into a locker, then the Hakone loop: the mountain railway and the cable car to Owakudani",
        allow: "2.5–3 hours",
        getting: "Hakone Tozan Railway, then the cable car and ropeway, all on the Freepass",
        booking: "No — the Freepass is the booking",
      },
      {
        time: "Early afternoon",
        place: "Lake Ashi by pirate ship, and the Hakone Shrine torii on the water",
        allow: "2 hours",
        getting: "Ropeway down to Togendai, then the boat to Moto-Hakone",
        booking: "No — also on the Freepass",
      },
      {
        time: "Mid-afternoon",
        place: "Back down to Odawara, and the Tokaido Shinkansen west",
        allow: "Allow 1 hour to get back down and collect the cases",
        getting: "Hakone Tozan bus or train to Odawara, which is a shinkansen station",
        booking: "A reserved seat — and check which services stop at Odawara on your date",
      },
      {
        time: "Evening",
        place: "Arrive Kyoto, check in, and walk as far as Pontocho and the Kamo riverbank",
        allow: "2–3 hours",
        getting: "Kyoto Station is the terminus for this leg; subway or bus from there",
        booking: "Three nights in Kyoto, booked ahead",
      },
    ],
    book: (
      <>
        Three things, in this order: the Hakone Freepass, the Romancecar seat, and the westbound
        shinkansen seat. The Freepass is {PRICES.hakoneFreepass.adult} for two days from Shinjuku and
        ¥7,500 for three, with a child rate of {PRICES.hakoneFreepass.child}, and it covers eight
        modes of transport round the loop — but <em>not</em> the Romancecar surcharge, which Odakyu
        publishes as <strong>¥1,200 for an adult and ¥600 for a child aged 6 to 11</strong> on top,
        read on {OWN}. There is no one-day version of the Freepass, which our{" "}
        <Link href="/guides/attractions/hakone-free-pass">Hakone Freepass guide</Link> explains, and
        the loop itself is laid out in our{" "}
        <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone day trip guide</Link>.
        <br />
        <br />
        <strong>If you would rather have Mt. Fuji than Hakone,</strong> the swap is clean but the
        return is not: Kawaguchiko&apos;s highway buses run back to Shinjuku rather than to a
        shinkansen station, so a Fuji version of this day means an extra Tokyo night and a Day 6
        morning train. The Mt. Fuji Pass is {PRICES.mtFujiPass.adult} for one day, ¥10,200 for two
        and ¥12,400 for three, and it covers getting <em>around</em> the Five Lakes rather than
        getting out of Tokyo — our{" "}
        <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">Mt. Fuji day trip guide</Link> and{" "}
        <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko day trip guide</Link>{" "}
        set out both routes. The third option is to let a coach do it: a join-in Fuji-and-Hakone day
        collects you in Tokyo and returns you there, which removes the luggage problem and the
        timetable at the cost of the westbound train.
      </>
    ),
    picks: [
      { label: "Hakone Freepass (2-day / 3-day) →", url: hakoneFreepass.url },
      { label: "Mt. Fuji & Hakone day tour →", url: fujiHakoneDayTour.url },
      { label: "Tokyo – Mt. Fuji highway bus →", url: tokyoMtFujiHighwayBus.url },
      { label: "Mt. Fuji Pass (1, 2 or 3 day) →", url: mtFujiPass.url },
      { label: "Tokyo → Kyoto shinkansen tickets →", url: shinkansenTokyoKyoto.url },
    ],
    gyg: gygFujiFromTokyo,
  },
  {
    n: 6,
    label: "Day 6",
    heading: "Day 6 — Kyoto, the East Side: Fushimi Inari at Dawn, Kiyomizu-dera and Gion",
    intro: (
      <>
        The one day of the ten where the hour you start genuinely changes what you see. Kyoto&apos;s
        famous sites are small and the coaches arrive at ten; Fushimi Inari has no gate, no fee and
        no closing time, and Kiyomizu-dera opens at 6:00 on the temple&apos;s own statement. Almost
        nothing on this day sells a ticket, which makes it the easiest to book and the hardest to
        pace — and the reason three Kyoto nights beats two is that you can do this day at dawn
        without having also arrived on a train that morning.
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
        place: "Kiyomizu-dera, then Sannenzaka and Ninenzaka downhill",
        allow: "2.5 hours",
        getting: "Bus 100 or 206 from Kyoto Station to Kiyomizu-michi, then uphill on foot",
        booking: "No — walk up and pay at the gate; the temple opens at 6:00",
      },
      {
        time: "Early afternoon",
        place: "Kimono or yukata, if you want it — the Gion and Kiyomizu shops are set up for exactly this walk",
        allow: "3–4 hours including the dressing appointment",
        getting: "The shops are on the lanes you are already on",
        booking: "Yes — a dressing slot and a return deadline in the shop's calendar",
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
        place: "Pontocho, Nishiki Market's covered arcade and Kawaramachi",
        allow: "2–3 hours",
        getting: "On foot from Gion across Shijo bridge; Karasuma subway to Shijo for the market",
        booking: "No",
      },
    ],
    book: (
      <>
        Almost nothing, and that is the most useful fact about a Kyoto day. The temples are walk-up
        and take cash at the gate. The two things that do run on a booking are a kimono fitting,
        which has a dressing slot and a return deadline in the shop&apos;s calendar rather than
        yours, and the Sagano scenic railway on Day 7 in peak autumn colour or blossom season — our{" "}
        <Link href="/guides/attractions/kyoto-kimono-rental">Kyoto kimono rental guide</Link> splits
        the shops by area and sets out the return times. If three Kyoto days feels like navigation
        rather than sightseeing, a one-day highlight coach ties Kiyomizu-dera, Kinkaku-ji, Fushimi
        Inari and Arashiyama into a single guided day, which is the version to take on a wet
        forecast. What to see and in what order is in our{" "}
        <Link href="/guides/attractions/things-to-do-kyoto">Kyoto round-up</Link>, and the buses and
        the two subway lines in our{" "}
        <Link href="/guides/transport/kyoto-transportation">getting around Kyoto guide</Link>.
      </>
    ),
    picks: [
      { label: "Kyoto Station kimono rental →", url: kyotoKimonoAiwafukuStation.url },
      { label: "Kyoto & Nara day trip →", url: kyotoNaraKiyomizuTour.url },
    ],
    gyg: gygKyoto,
  },
  {
    n: 7,
    label: "Day 7",
    heading: "Day 7 — Nara in a Day, From Kyoto",
    intro: (
      <>
        A day trip that costs you no hotel night and almost no money. On Nara Prefecture&apos;s own
        official travel guide, checked {OWN}, Kyoto Station to Kintetsu-Nara is{" "}
        <strong>approx. 34 minutes</strong> on the Kintetsu Limited Express and Kyoto Station to JR
        Nara <strong>approx. 41 minutes</strong> on the JR Rapid — so the travelling is under an hour
        and a half for the whole round trip. Nara Park and the deer are free; the Great Buddha Hall
        at Todai-ji is the only admission a standard Nara day actually pays.
      </>
    ),
    stops: [
      {
        time: "Early morning",
        place: "Kyoto to Nara",
        allow: "Approx. 34 minutes by Kintetsu Limited Express, approx. 41 by JR Rapid",
        getting: "Kintetsu from Kyoto Station to Kintetsu-Nara, or the JR Nara Line to JR Nara",
        booking: "Only the Kintetsu limited express seat, which is a surcharge on the fare",
      },
      {
        time: "Morning",
        place: "Nara Park and the deer lawns, walking up towards Todai-ji",
        allow: "1–1.5 hours",
        getting: "On foot from Kintetsu-Nara; a little further from JR Nara",
        booking: "No — the park and the deer are free",
      },
      {
        time: "Late morning",
        place: "Todai-ji's Daibutsuden and the Great Buddha",
        allow: "1–1.5 hours",
        getting: "On foot through the park",
        booking: "No — pay at the gate",
      },
      {
        time: "Early afternoon",
        place: "Kasuga Taisha's lantern approach, and Nigatsu-do above it for the view back over the city",
        allow: "1.5–2 hours",
        getting: "On foot, uphill from Todai-ji",
        booking: "No — the grounds are largely free, with charges for certain inner areas",
      },
      {
        time: "Mid-afternoon",
        place: "Naramachi's old merchant lanes, or Isuien garden",
        allow: "1.5 hours",
        getting: "On foot, back down towards Kintetsu-Nara",
        booking: "No",
      },
      {
        time: "Evening",
        place: "Back to Kyoto for dinner",
        allow: "Under an hour each way",
        getting: "The line you came out on",
        booking: "No",
      },
    ],
    book: (
      <>
        Nothing, unless you want somebody else to drive. Todai-ji&apos;s Great Buddha Hall was{" "}
        {PRICES.todaiji.adult} for an adult and {PRICES.todaiji.child} for ages 6 to 12 on the
        figures we checked, paid at the gate, and the hall closes at 17:30 from April to October and
        17:00 from November to March — which matters on a short winter afternoon and matters more on
        a guided tour whose timings you do not control. Our{" "}
        <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link> has the routes from
        both Kyoto and Osaka and the walking order inside the park. The coach alternative is worth a
        look if you would rather pair Nara with Arashiyama or Fushimi Inari and skip Day 8&apos;s
        morning: the joined-up day tours do exactly that, and most of them depart Osaka or Kyoto. If
        a Nara day sounds thin for a ten-day trip, it is the opposite — it is the cheapest day on
        this plan and the one people come back talking about.
      </>
    ),
    picks: [
      { label: "Kyoto & Nara day tour (Sagano, Nara Park, Fushimi Inari) →", url: kyotoNaraArashiyamaTour.url },
      { label: "Arashiyama, Kinkaku-ji & Nara Todai-ji day tour →", url: arashiyamaNaraTodaijiTour.url },
      { label: "Kyoto & Nara day trip →", url: kyotoNaraKiyomizuTour.url },
    ],
    gyg: gygNara,
  },
  {
    n: 8,
    label: "Day 8",
    heading: "Day 8 — Arashiyama in the Morning, Then Across to Osaka",
    intro: (
      <>
        Half a Kyoto day and half a move, which only works because the move is so short. On the
        official Kyoto travel guide&apos;s figures, read {RAIL_CHECKED}, Kyoto Station to Osaka
        Station is about <strong>30 minutes</strong> on the JR Special Rapid, Kyoto-Kawaramachi to
        Osaka-umeda about <strong>45 minutes</strong> on the Hankyu, and the Keihan limited express
        about <strong>48 minutes</strong>. Nothing on any of the three is reserved, so there is no
        seat to book and no departure to make: do Arashiyama in the morning, collect the cases after
        lunch, and be in Osaka before the hotel will take them.
      </>
    ),
    stops: [
      {
        time: "Early morning",
        place: "Arashiyama: the bamboo grove before the coaches, Tenryu-ji and Togetsukyo bridge",
        allow: "3 hours",
        getting: "JR Sagano Line to Saga-Arashiyama, about 15 minutes from Kyoto Station",
        booking: "No for the grove; Tenryu-ji charges at the gate",
      },
      {
        time: "Mid-morning",
        place: "The Sagano Romantic Train or the Hozugawa river boat, if you want one",
        allow: "1–2 hours",
        getting: "Torokko Saga station, beside Saga-Arashiyama",
        booking: "Yes in autumn and blossom season — the torokko is a reserved seat, and it does not run in deep winter",
      },
      {
        time: "Early afternoon",
        place: "Kinkaku-ji, the Golden Pavilion — or straight back for the cases if you would rather not rush it",
        allow: "1 hour",
        getting: "City bus 11 or 59 towards Kinkakuji-michi, about 40 minutes from Arashiyama",
        booking: "No — 9:00 to 17:00, pay at the gate",
      },
      {
        time: "Mid-afternoon",
        place: "Check out of Kyoto and cross to Osaka",
        allow: "About 30 minutes by JR, 45 by Hankyu, 48 by Keihan",
        getting: "JR Special Rapid from Kyoto Station, Hankyu from Kawaramachi, or Keihan from Sanjo",
        booking: "No — a turn-up-and-go leg, and an IC card opens the gate",
      },
      {
        time: "Evening",
        place: "Dotonbori, the Glico sign, Kuromon Market and a river cruise",
        allow: "3 hours",
        getting: "On foot from Namba",
        booking: "Yes for the cruise — the boats run to fixed departure times",
      },
    ],
    book: (
      <>
        The torokko, if your date is in autumn colour or blossom season, and the Dotonbori cruise if
        you want it. Kinkaku-ji was ¥500 for an adult and ¥300 for elementary and junior-high
        children on the figures we read on {KINKAKUJI_CHECKED}, and it is 9:00 to 17:00 — so a late
        Arashiyama morning quietly rules it out, which is fine. The Sagano Romantic Train is the one
        booking on this day that can be impossible rather than inconvenient: its reserved seats go a
        month ahead in autumn and it does not run at all in deep winter, both of which our{" "}
        <Link href="/guides/attractions/sagano-romantic-train-tickets">Sagano Romantic Train guide</Link>{" "}
        sets out. Do <em>not</em> plan the move for the morning and Arashiyama for the afternoon: the
        grove at 14:00 in October is a queue, and the point of three Kyoto nights is to be there at
        nine.
      </>
    ),
    picks: [
      { label: "Sagano train & Hozugawa boat day →", url: saganoHozugawaGuaranteedTour.url },
      { label: "Dotonbori river cruise →", url: dotonboriCityCruise.url },
      { label: "Osaka Amazing Pass (1-day / 2-day) →", url: osakaAmazingPass.url },
    ],
  },
  {
    n: 9,
    label: "Day 9",
    heading: "Day 9 — Osaka, the Full Day: the Castle, the Bay, or Universal Studios Japan",
    intro: (
      <>
        One whole Osaka day, and one decision that has to be made before you fly rather than on the
        morning. Either this is a city day — the castle, the bay and the arcades, most of which one
        pass covers — or it is a Universal Studios Japan day, and it cannot be both. USJ is a
        ten-hour day, it has not sold same-day tickets at the gate since May 2025, and Super Nintendo
        World needs timed entry on top of park admission.
      </>
    ),
    stops: [
      {
        time: "Morning",
        place: "Osaka Castle and the park around it",
        allow: "2–2.5 hours",
        getting: "Osaka Loop Line to Osakajokoen, or the Tanimachi subway",
        booking: "No — the main tower is 9:00 to 18:00, last admission 17:30",
      },
      {
        time: "Early afternoon",
        place: "Osaka Aquarium Kaiyukan, or Shinsekai and Tsutenkaku if you would rather stay on land",
        allow: "3 hours for the aquarium",
        getting: "Chuo Line to Osakako for the Kaiyukan; Midosuji Line for Shinsekai",
        booking: "Advised for the Kaiyukan — 15-minute entry slots, and it prices by date",
      },
      {
        time: "Late afternoon",
        place: "Umeda Sky Building's rooftop ring, or the Shinsaibashi arcade",
        allow: "1.5–2 hours",
        getting: "Midosuji Line to Umeda, or to Shinsaibashi",
        booking: "No — but the Amazing Pass has a 15:00 cut-off on the Umeda deck",
      },
      {
        time: "Evening",
        place: "Kuromon Market, Namba and dinner",
        allow: "2–3 hours",
        getting: "Midosuji Line to Namba or Nipponbashi",
        booking: "No",
      },
      {
        time: "Or, all day",
        place: "Universal Studios Japan instead of all of the above",
        allow: "A full day, 10 hours or more",
        getting: "JR Yumesaki Line to Universal City, about 15 minutes from Osaka Station",
        booking: "Required, weeks ahead — and Super Nintendo World separately again",
      },
    ],
    book: (
      <>
        The pass if this is a city day, the park ticket if it is not. The Osaka Amazing Pass is{" "}
        {PRICES.osakaAmazingPass.adult} for one day and ¥3,300 for two, and it bundles unlimited
        Osaka Metro and city buses with more than 40 free admissions — a genuinely different
        proposition from a Tokyo subway ticket, and our{" "}
        <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link> works
        the break-even. Two things everyone assumes it covers and it does not: Universal Studios
        Japan and the Kaiyukan. Osaka Castle&apos;s main tower was ¥1,200 for an adult and ¥600 for a
        student, 9:00–18:00 with last admission 17:30, read on {OSAKA_CASTLE_CHECKED} — and that one
        <em>is</em> on the pass, as our{" "}
        <Link href="/guides/attractions/osaka-castle-tickets">Osaka Castle tickets guide</Link>{" "}
        prices out. The Kaiyukan sells 15-minute entry slots and prices by date; the detail is in our{" "}
        <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets">Kaiyukan tickets guide</Link>.
        If the answer is USJ, our{" "}
        <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets and Express Pass guide</Link>{" "}
        explains the Studio Pass tiers and when the Express Pass earns its price — and{" "}
        <Link href="/guides/attractions/things-to-do-osaka">our Osaka round-up</Link> covers what the
        pass reaches on the day you do not spend in a park.
      </>
    ),
    picks: [
      { label: "Osaka Amazing Pass (1-day / 2-day) →", url: osakaAmazingPass.url },
      { label: "Osaka Castle ticket →", url: osakaCastleTicket.url },
      { label: "Kaiyukan ticket →", url: osakaAquariumKaiyukanTicket.url },
      { label: "USJ Studio Pass →", url: usjStudioPassUrl },
    ],
    gyg: gygUsjExpressPass,
  },
  {
    n: 10,
    label: "Day 10",
    heading: "Day 10 — A Last Osaka Morning, and the Flight Out of Kansai",
    intro: (
      <>
        Finish in Osaka because Kansai Airport is easy from it and awkward from everywhere else. The
        Nankai Rapi:t connects Namba and Kansai Airport in a minimum of <strong>34 minutes</strong>{" "}
        on Nankai&apos;s own figure, and the JR Haruka runs from Tennoji, Shin-Osaka and Kyoto; both
        read {RAIL_CHECKED}. Work backwards from the flight — three hours before an international
        departure, plus the run out, plus the tax-free customs step if you are claiming it, which has
        to be done before baggage check-in rather than after.
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
        The airport leg, the night before at the latest, and each of the two trains has a catch worth
        knowing. The Rapi:t&apos;s limited express charge is ¥700 for an adult and ¥350 for a child{" "}
        <em>on top of</em> the basic fare, on Nankai&apos;s own figures read {RAIL_CHECKED}. The
        HARUKA one-way ticket is sold only to foreign passport holders entering Japan as a Temporary
        Visitor, cannot be bought once you are in the country, and its prices changed on 1 November
        2026 — ¥1,600 to Tennoji, ¥1,900 to Osaka or Shin-Osaka and ¥2,700 to Kyoto for an adult from
        that date, read off JR West&apos;s own page on the same date. Our{" "}
        <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Nankai Rapi:t comparison</Link>{" "}
        puts them side by side and our{" "}
        <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer guide</Link> adds
        the Itami routes. If you are claiming consumption tax back on ten days of shopping, our{" "}
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
    nights: "4 nights (Days 1–4)",
    why: "An airport day, the west side of the loop with the rooftop slot, the east side with teamLab Planets, and a fourth day for a park, a coast or a shrine town. The fourth day is the whole reason to plan ten rather than seven.",
    moving: "40 minutes to 1.5 hours in from the airport",
  },
  {
    base: "Kyoto",
    nights: "3 nights (Days 5–7)",
    why: "An arrival evening off the mountain train, one full east-side day starting at dawn, and a Nara day trip — with Arashiyama on the morning of Day 8 before you move. Three nights is what lets the dawn day be a dawn day.",
    moving: "The Hakone day ends at Odawara, which is a Tokaido Shinkansen station",
  },
  {
    base: "Osaka",
    nights: "2 nights (Days 8–9), flying out on Day 10",
    why: "A Dotonbori evening on arrival, one whole city day — castle, bay and arcades, or Universal Studios Japan instead of all three — and a short morning before the airport.",
    moving: "About 30 minutes from Kyoto by JR Special Rapid",
  },
];

/** Published journey times for every long leg on this plan. */
const longDistance = [
  {
    leg: "Shinjuku → Hakone-Yumoto (Day 5)",
    how: "Odakyu Limited Express Romancecar",
    time: "Approx. 80 minutes",
    cost: "Hakone Freepass ¥7,100 (2-day) plus a Romancecar surcharge of ¥1,200 adult / ¥600 child",
    source: "odakyu-global.com",
    checked: OWN_CHECKED,
  },
  {
    leg: "Odawara → Kyoto (Day 5)",
    how: "Tokaido Shinkansen westbound from Odawara, the Hakone gateway station",
    time: "Shorter than the Tokyo departure below; which services call at Odawara varies, so check your date",
    cost: "Fare and seat class move with the train type and season — check your date",
    source: "global.jr-central.co.jp",
    checked: "2026-10-25",
  },
  {
    leg: "Tokyo → Kyoto (the direct version of Day 5)",
    how: "Tokaido Shinkansen from Tokyo or Shinagawa",
    time: "About 130 minutes; about 170 minutes on the Hikari",
    cost: "Fare and seat class move with the train type and season — check your date",
    source: "global.jr-central.co.jp, kyoto.travel",
    checked: "2026-10-25",
  },
  {
    leg: "Kyoto → Nara (Day 7), Kintetsu",
    how: "Kintetsu Limited Express, Kyoto Station to Kintetsu-Nara",
    time: "Approx. 34 minutes",
    cost: "Private railway, so not JR-pass valid; the limited express seat is a surcharge on the fare",
    source: "visitnara.jp",
    checked: OWN_CHECKED,
  },
  {
    leg: "Kyoto → Nara (Day 7), JR",
    how: "JR Nara Line Rapid, Kyoto Station to JR Nara",
    time: "Approx. 41 minutes",
    cost: "Ordinary JR fare, no surcharge; a JR pass covers it",
    source: "visitnara.jp",
    checked: OWN_CHECKED,
  },
  {
    leg: "Kyoto → Osaka (Day 8), JR",
    how: "JR Special Rapid, Kyoto Station to Osaka Station",
    time: "About 30 minutes",
    cost: "Ordinary JR fare, no surcharge; a JR pass covers it",
    source: "kyoto.travel",
    checked: "2026-10-25",
  },
  {
    leg: "Kyoto → Osaka (Day 8), Hankyu or Keihan",
    how: "Hankyu Kyoto Line from Kawaramachi, or the Keihan limited express from Sanjo",
    time: "About 45 minutes by Hankyu, about 48 by Keihan",
    cost: "Private railways, so not JR-pass valid",
    source: "kyoto.travel, keihan.co.jp",
    checked: "2026-10-25",
  },
  {
    leg: "Osaka → Kansai Airport (Day 10), Nankai",
    how: "Limited Express Rapi:t from Nankai Namba",
    time: "A minimum of 34 minutes",
    cost: "Limited express charge ¥700 adult / ¥350 child on top of the basic fare",
    source: "nankai.co.jp",
    checked: "2026-10-25",
  },
  {
    leg: "Osaka or Kyoto → Kansai Airport (Day 10), JR",
    how: "JR Haruka limited express from Tennoji, Shin-Osaka or Kyoto",
    time: "About 80 minutes to Kyoto, on the official Kyoto travel guide's figure",
    cost: "HARUKA one-way ticket from 1 Nov 2026: ¥1,600 Tennoji, ¥1,900 Osaka/Shin-Osaka, ¥2,700 Kyoto (adult)",
    source: "westjr.co.jp, kyoto.travel",
    checked: "2026-10-25",
  },
];

/**
 * Buying the legs singly versus buying a pass. Every row is an official figure or
 * an honest "we could not read one" — JR Central publishes Tokaido fares through
 * its own fare search rather than as a readable page, so no fare is invented here.
 */
const passRows = [
  {
    option: "JAPAN RAIL PASS, 7-day Ordinary (adult)",
    price: "¥50,000 bought online; ¥53,000 as an overseas Exchange Order",
    fit: "Covers one week of a ten-day trip, so it would have to be activated on Day 5 and would expire on Day 11 — after you have flown. It would cover the Odawara–Kyoto leg, the Nara JR Rapid, the Kyoto–Osaka Special Rapid and the Haruka. It would not cover the Romancecar, the Kintetsu, the Hankyu, the Keihan or the Rapi:t.",
    source: "japanrailpass.net",
    checked: OWN_CHECKED,
  },
  {
    option: "JAPAN RAIL PASS, 14-day Ordinary (adult)",
    price: "¥80,000 bought online; ¥84,000 as an overseas Exchange Order",
    fit: "Covers all ten days with four to spare, which is four days of pass you do not use. On a route with two long legs, that is the wrong shape of product.",
    source: "japanrailpass.net",
    checked: OWN_CHECKED,
  },
  {
    option: "JAPAN RAIL PASS, 7-day Green car (adult)",
    price: "¥70,000 bought online; ¥74,000 as an overseas Exchange Order",
    fit: "Same coverage, a reserved Green seat. Child prices are half the adult ones at every length and in both cars.",
    source: "japanrailpass.net",
    checked: OWN_CHECKED,
  },
  {
    option: "One-way Tokaido Shinkansen seat, Tokyo or Odawara → Kyoto",
    price: "Not printed here — see the note below",
    fit: "The one long pass-eligible leg on this plan. Buy it as a single reserved seat, and reserve the oversized-baggage row separately if you are carrying a large case.",
    source: "global.jr-central.co.jp",
    checked: "2026-10-25",
  },
  {
    option: "Hakone Freepass, 2-day from Shinjuku (adult)",
    price: `${PRICES.hakoneFreepass.adult} (3-day ¥7,500); child ${PRICES.hakoneFreepass.child}`,
    fit: "Day 5. Odakyu's own pass, covering eight modes of transport round the Hakone loop — and nothing a JR pass covers, which is why the two do not compete.",
    source: PRICES.hakoneFreepass.source,
    checked: PRICES.hakoneFreepass.checked,
  },
  {
    option: "Romancecar limited express surcharge, Shinjuku → Hakone-Yumoto",
    price: "¥1,200 adult / ¥600 child aged 6–11, on top of the fare or the Freepass",
    fit: "Day 5. The Freepass covers the fare, not the seat, and the Romancecar is a reserved-seat train.",
    source: "odakyu-global.com",
    checked: OWN_CHECKED,
  },
  {
    option: "HARUKA one-way to Kansai Airport (from 1 Nov 2026, adult)",
    price: "¥1,600 Tennoji, ¥1,900 Osaka / Shin-Osaka, ¥2,700 Kyoto",
    fit: "Day 10. Sold only to foreign passport holders on a Temporary Visitor entry, and not on sale once you are inside Japan.",
    source: "westjr.co.jp",
    checked: "2026-10-25",
  },
  {
    option: "Nankai Rapi:t limited express charge, Namba → Kansai Airport",
    price: "¥700 adult / ¥350 child regular seat, on top of the basic fare",
    fit: "Day 10. A private railway, so no JR pass of any kind touches it.",
    source: "nankai.co.jp",
    checked: "2026-10-25",
  },
];

/** Official transport and admission prices only. No hotel or food figures anywhere. */
const budgetRows = [
  {
    item: "Tokyo Subway Ticket (24 / 48 / 72 hour)",
    price: `${PRICES.tokyoSubwayTicket.adult} / ¥1,500 / ¥2,000 adult`,
    used: "Days 1–4. The 72-hour version is the one that fits. Covers Tokyo Metro and Toei but not JR, including the Yamanote Line.",
    source: PRICES.tokyoSubwayTicket.source,
    checked: PRICES.tokyoSubwayTicket.checked,
  },
  {
    item: "SHIBUYA SKY",
    price: `${PRICES.shibuyaSky.adult} online, ${PRICES.shibuyaSky.atDoor} at the door`,
    used: "Day 2, the sunset slot — the one booking here that goes by time of day rather than by date.",
    source: PRICES.shibuyaSky.source,
    checked: PRICES.shibuyaSky.checked,
  },
  {
    item: "Tokyo Metropolitan Government Building decks",
    price: PRICES.tochoDeck.adult,
    used: "Day 2. No ticket of any kind, and the fallback if the Shibuya Sky slot has gone.",
    source: PRICES.tochoDeck.source,
    checked: PRICES.tochoDeck.checked,
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
    used: "Day 3. The one compulsory booking of the ten days — a 30-minute slot, nothing sold on site.",
    source: PRICES.teamlabPlanets.source,
    checked: PRICES.teamlabPlanets.checked,
  },
  {
    item: "Kotoku-in (the Kamakura Great Buddha)",
    price: `${PRICES.kotokuin.adult} adult, ${PRICES.kotokuin.child} child`,
    used: "Day 4, if the fourth Tokyo day is Kamakura. Hase-dera next to it is ¥400 / ¥200.",
    source: PRICES.kotokuin.source,
    checked: PRICES.kotokuin.checked,
  },
  {
    item: "Hakone Freepass, 2-day from Shinjuku",
    price: `${PRICES.hakoneFreepass.adult} adult (3-day ¥7,500), ${PRICES.hakoneFreepass.child} child`,
    used: "Day 5. Eight modes of transport round the loop. There is no one-day version.",
    source: PRICES.hakoneFreepass.source,
    checked: PRICES.hakoneFreepass.checked,
  },
  {
    item: "Mt. Fuji Pass (1 / 2 / 3 day)",
    price: `${PRICES.mtFujiPass.adult} / ¥10,200 / ¥12,400 adult, child half`,
    used: "Day 5, if you swap Hakone for the Fuji Five Lakes. It covers getting around once you are there, not getting out of Tokyo.",
    source: PRICES.mtFujiPass.source,
    checked: PRICES.mtFujiPass.checked,
  },
  {
    item: "Kinkaku-ji, Kyoto",
    price: "¥500 adult (high school and above), ¥300 elementary and junior high",
    used: "Day 8. Open 9:00–17:00, pay at the gate.",
    source: "shokoku-ji.jp",
    checked: "2026-10-22",
  },
  {
    item: "Todai-ji Great Buddha Hall, Nara",
    price: `${PRICES.todaiji.adult} adult, ${PRICES.todaiji.child} child`,
    used: "Day 7. The only admission a standard Nara day pays — the park and the deer are free.",
    source: PRICES.todaiji.source,
    checked: PRICES.todaiji.checked,
  },
  {
    item: "Osaka Amazing Pass",
    price: `${PRICES.osakaAmazingPass.adult} for 1 day (2-day ¥3,300)`,
    used: "Day 9. Unlimited Osaka Metro and city buses plus 40-plus admissions; not USJ and not the Kaiyukan.",
    source: PRICES.osakaAmazingPass.source,
    checked: PRICES.osakaAmazingPass.checked,
  },
  {
    item: "Osaka Castle, main tower",
    price: "¥1,200 adult, ¥600 student, free below high school",
    used: "Day 9. 9:00–18:00 with last admission 17:30 — and it is on the Amazing Pass.",
    source: "osakacastle.net",
    checked: "2026-10-23",
  },
  {
    item: "JAPAN RAIL PASS, 7-day Ordinary (adult)",
    price: "¥50,000 online, ¥53,000 as an overseas Exchange Order",
    used: "Optional, and on this route almost certainly not worth it — see the section above.",
    source: "japanrailpass.net",
    checked: OWN_CHECKED,
  },
  {
    item: "HARUKA one-way to Kansai Airport (from 1 Nov 2026)",
    price: "¥1,600 Tennoji, ¥1,900 Osaka / Shin-Osaka, ¥2,700 Kyoto — adult; child half",
    used: "Day 10. Foreign passport holders on a Temporary Visitor entry only, and not sold inside Japan.",
    source: "westjr.co.jp",
    checked: "2026-10-25",
  },
];

const bookingWindow = [
  {
    title: "Book before you fly (weeks out)",
    desc: "All three hotels, because nine nights across three cities gives you nowhere to put a mistake. teamLab Planets, because entry is a 30-minute slot and the official store states nothing is sold on site. The SHIBUYA SKY sunset window. Tokyo Disney, if that is the Day 4 answer — it is date-specified with no gate sales, which makes it the earliest decision on the plan. Universal Studios Japan with Super Nintendo World timed entry, if that is the Day 9 answer. And the arrival airport transfer, which is the one queue you cannot plan around after a long flight.",
  },
  {
    title: "Book a few days out",
    desc: "The Day 5 Romancecar seat and the westbound shinkansen seat, and the oversized-baggage row separately if you have a large case. The Sagano Romantic Train, which in autumn colour goes about a month ahead and in deep winter does not run. Tokyo Skytree, where booking ahead is simply cheaper than the counter. The Kaiyukan if Day 9 includes it, because the entry slot is in 15-minute units and the price moves by date. A Dotonbori river cruise, which runs to fixed departures. Any kimono appointment in Asakusa or Kyoto.",
  },
  {
    title: "Do not bother booking",
    desc: "Senso-ji, Meiji Jingu, the Scramble Crossing, the free Metropolitan Government Building decks, the whole Hakone loop once you hold the Freepass, Kiyomizu-dera, Gion, Fushimi Inari, the Arashiyama bamboo grove, Kinkaku-ji, Nara Park and the deer, Todai-ji, Kasuga Taisha, Osaka Castle Park and the Dotonbori streets. None of them sells a timed ticket — and the Kyoto–Osaka leg belongs in this column too, because nothing on the JR, Hankyu or Keihan route is reserved.",
  },
];

const faqItems = [
  {
    q: "What is the best 10 day itinerary for Japan?",
    a: `Three bases and nine nights, split 4 / 3 / 2 — four nights in Tokyo, three in Kyoto and two in Osaka, with one mountain day doing double duty as the move between the first two, and the flight home out of Kansai on Day 10. The shape matters more than the sights: at ten days you can afford a fourth Tokyo day and a Nara day trip without adding a fourth hotel bill, and every extra base costs a morning of packing and an afternoon of travelling. The one piece of geography that makes it work is that Odawara, the gateway station for Hakone, sits on the Tokaido Shinkansen — so a Hakone day ends on a westbound train rather than back where it started. Tokyo to Kyoto is about 130 minutes on JR Central's own figure and Kyoto to Osaka about 30 minutes on the JR Special Rapid, both read ${RAIL_CHECKED}.`,
  },
  {
    q: "Is 10 days enough for Japan?",
    a: "Enough for the Tokyo–Kyoto–Osaka corridor done properly, with a mountain day and a day trip in it, and not enough to add Hiroshima or Hokkaido on top. That is the honest edge of a ten-day trip: it buys you three full Tokyo days plus an airport day, one mountain day, two full Kyoto days plus a Nara day, and one full Osaka day plus a departure morning. What it does not buy is a second region — Hiroshima and Miyajima are a long day each way from Kyoto, and anything north of Tokyo means a night somewhere you have not budgeted for. If you have fourteen nights, the fortnight version adds the mountain overnight, Hiroshima and genuine slack; if you only have seven, drop the fourth Tokyo day and the Nara day rather than compressing everything.",
  },
  {
    q: "Should I get a JR Pass for 10 days in Japan?",
    a: `Almost certainly not on this route, and it is worth settling first because it decides whether you buy single tickets or a pass. The 7-day Ordinary JAPAN RAIL PASS is ¥50,000 bought online and ¥53,000 as an overseas Exchange Order for an adult; the 14-day is ¥80,000 and ¥84,000, and the Green car versions are ¥70,000 / ¥74,000 and ¥110,000 / ¥116,000, with child prices half the adult ones. All read off japanrailpass.net on ${OWN}. Now count what this itinerary actually asks a JR pass to do: one long Tokaido leg, a 41-minute Nara rapid, a 30-minute Kyoto–Osaka hop and the Haruka to the airport. Everything else on the plan is a private railway a JR pass does not touch at all — the Odakyu Romancecar to Hakone, the Kintetsu to Nara, the Hankyu and Keihan to Osaka, the Nankai Rapi:t to the airport. And a 7-day pass does not even span ten days, so you would be choosing which week to cover. There is one more catch for this specific leg: the pass does not cover the Nozomi without a supplementary ticket issued only to pass holders, so it would put you on the slower Hikari. Our JR Pass guide works the break-even properly.`,
  },
  {
    q: "How much does 10 days in Japan cost?",
    a: `For tickets and transport, much less than most people expect — because most of Kyoto and much of Tokyo is free to walk into, and the free things on this plan include Meiji Jingu, the Tocho decks, Fushimi Inari, the Arashiyama bamboo grove, Nara Park and the deer, and the Dotonbori streets. What you actually pay for is a 72-hour subway ticket, two or three Tokyo tickets, the Hakone Freepass and the Romancecar surcharge, one temple in Kyoto and one hall in Nara, a city pass and a castle in Osaka, the long train west, and the run to the airport. Every one of those figures is in the dated table above against the operator's own site and the date it was read. We publish no hotel, food or shopping estimate at all, on purpose: those move by season, city and party size, and an invented average is worse than none — our Japan travel budget guide covers what moves them.`,
  },
  {
    q: "Tokyo, Kyoto or Osaka first?",
    a: "Tokyo first if your ticket lets you fly into Narita or Haneda and home from Kansai, which is what this itinerary assumes — it means no leg is retraced and the last day is a 34-minute run to the airport rather than a long train plus a transfer. An open-jaw ticket sometimes costs a little more than a return into one city, and against most of a day of travelling and a tenth night near an airport line it is usually worth it. There is a second reason to put Tokyo first on a ten-day trip specifically: jet lag lands on the days you have the most slack, and Tokyo is where the slack is. If your return is fixed to Tokyo, run the plan in reverse — Osaka, Kyoto, Hakone, Tokyo — so the long train happens on Day 6 rather than on the morning you fly.",
  },
  {
    q: "How many days should you spend in Tokyo on a 10 day trip?",
    a: "Four nights, which is three full days plus an airport day. Three full days covers the city's headline sights comfortably — the west side of the Yamanote loop with a rooftop slot, the east side with Senso-ji and teamLab Planets, and a fourth day that can be a theme park, a coast or a shrine town. A fifth Tokyo night only earns its place if the Day 4 answer is Tokyo Disney and you want to sleep at Maihama, or if you are swapping Hakone for Kawaguchiko, whose highway buses run back to Shinjuku rather than to a shinkansen station. Less than four and the fourth-day choice disappears, which is the main thing a ten-day trip has that a seven-day one does not.",
  },
  {
    q: "Hakone or Mt. Fuji on a 10 day Japan itinerary?",
    a: `Hakone, if the mountain day is also the day you move to Kyoto — and that is the whole argument. Odawara, the gateway station for Hakone, is on the Tokaido Shinkansen, so the day can end on a westbound train; Kawaguchiko's highway buses run back to Shinjuku, which costs you an extra Tokyo night and a Day 6 morning on a train. The Odakyu Romancecar reaches Hakone-Yumoto in approx. 80 minutes from Shinjuku, and the Hakone Freepass is ${PRICES.hakoneFreepass.adult} for two days with a ¥1,200 adult Romancecar surcharge on top — both read on ${OWN}. Mt. Fuji wins on one thing only, which is seeing Mt. Fuji: Hakone shows it to you on a clear day and the Five Lakes show it to you properly. If that is the point of the trip, take the Fuji version and accept the extra Tokyo night. Our Hakone day trip and Mt. Fuji day trip guides lay out both.`,
  },
  {
    q: "Is a Nara day trip worth it from Kyoto?",
    a: `Yes, and it is the cheapest day on this plan. On Nara Prefecture's own official travel guide, read ${OWN}, Kyoto Station to Kintetsu-Nara is approx. 34 minutes on the Kintetsu Limited Express and Kyoto Station to JR Nara approx. 41 minutes on the JR Rapid — so the whole round trip is under an hour and a half of travelling. Nara Park and the 1,000-plus free-roaming deer cost nothing, Kasuga Taisha's grounds are largely free, and Todai-ji's Great Buddha Hall at ${PRICES.todaiji.adult} for an adult is the only admission a standard Nara day pays. Watch the closing time rather than the opening one: the hall shuts at 17:30 from April to October and 17:00 from November to March, which bites on a short winter afternoon.`,
  },
  {
    q: "What has to be booked in advance on a 10 day Japan trip?",
    a: "Five things, and everything else can be decided on the morning. The three hotels, because nine nights across three cities has nowhere to absorb a mistake. teamLab Planets, which is a 30-minute entry slot with nothing sold on site. The SHIBUYA SKY sunset window, which goes by time of day rather than by date. The Day 5 Romancecar and westbound shinkansen seats, with the oversized-baggage row reserved separately if you have a large case. And a theme park date — Tokyo Disney on Day 4 or Universal Studios Japan on Day 9 — if either is in the plan, because both are date-specified and neither sells at the gate on the day. Everything in Kyoto and everything in Nara can be left until breakfast.",
  },
  {
    q: "Where should you stay for a 10 day Japan itinerary?",
    a: "Beside a station that is also an interchange, in each city, and chosen around the two moving days rather than around the sights. In Tokyo: Shinjuku, because the Kawaguchiko and Fuji buses and the Odakyu line to Hakone all leave from under it; Tokyo Station if you would rather have the shinkansen under the hotel; or Ueno and Asakusa if you are arriving on the Keisei Skyliner. In Kyoto: Kyoto Station for the shinkansen and the Nara trains, Shijo-Kawaramachi for the evenings and the private lines to Osaka, or Gion — which only earns its place at three nights, and then it is the best of the three, because Kiyomizu-dera at six in the morning is a walk rather than a bus. In Osaka: Namba, which is the Nankai terminus the Day 10 airport run leaves from, or Umeda if you come down from Kyoto by JR or Hankyu. The section above links Klook's hotel search for each.",
  },
  {
    q: "What do you do on a rainy day on this itinerary?",
    a: "Swap within the day rather than between days, because ten days has slack but not that much slack. In Tokyo, Day 3 is already weatherproof — teamLab Planets is indoors throughout and Solamachi under Skytree is a mall — and Day 2 is the vulnerable one, because an observation deck in low cloud shows you cloud; move the rooftop slot to another Tokyo evening rather than sitting it out. Day 5 is the day rain genuinely costs you something: the Hakone ropeway closes in high wind and the Lake Ashi boat in rough weather, so a wet forecast is the argument for the guided coach version or for the Fuji swap. In Kyoto, Nishiki Market's arcade and the Kyoto Railway Museum are the indoor hours and Sanjusangendo is the wet-weather temple, because the whole visit happens inside one long hall; Fushimi Inari is better in rain than in sun and the bamboo grove is not. In Osaka, the Shinsaibashi arcade runs covered for most of a kilometre into Dotonbori, and the Kaiyukan is the indoor version of the bay.",
  },
  {
    q: "Does a 10 day Japan itinerary work with kids?",
    a: "Better than a seven-day one, and that is the main reason to add the three days. Cut the stops per day rather than the days — four a day instead of six, with the timed ticket in the morning while everyone is fresh — and use the fourth Tokyo day and the Nara day as the two the children choose. Three swaps work without moving anything else: Tokyo Skytree and Solamachi in place of a second shrine, the Kyoto Railway Museum in place of Kinkaku-ji, and on Day 9 either the Kaiyukan or Universal Studios Japan instead of the castle-and-arcades day. The Hakone loop is unusually good with children because it is six different vehicles in one day rather than a walk. Child rates are published for most of the ticketed stops here and are in the dated table above.",
  },
  {
    q: "Do you need an eSIM or pocket WiFi for 10 days in Japan?",
    a: "You need working data, and for ten days across three cities an eSIM is the simplest way to have it. Every timed ticket on this plan arrives as a QR code in an inbox, the Kyoto bus network is the part of the trip where a map earns its keep, and the Day 5 Hakone loop and the Day 10 airport run are both timetables you will check from a platform. Activate it before you fly rather than queueing at an airport counter. Our Japan eSIM data plans guide works out how much data ten days of maps, tickets and messaging actually uses, and our best eSIM for Japan guide compares the providers.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/japan-10-day-itinerary") },
});

const TITLE = "Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day";
const DESC =
  "A Japan 10 Day Itinerary planned as 4 nights in Tokyo, 3 in Kyoto and 2 in Osaka, with a Hakone or Mt. Fuji day and a Nara day trip — a table for each of the 10 days, the published journey times, and the JR Pass worked against what this route actually costs.";
const ROUTE = "/guides/attractions/japan-10-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

export default function Japan10DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
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
                { "@type": "ListItem", position: 4, name: "Japan 10 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Japan 10 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan 10 Day Itinerary (2026):<br />10 Days in Japan, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            Nine nights, three hotel bills and four days&apos; worth of bases &mdash; planned around
            the mountain day that doubles as the move west.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Day 1 to Day 10 tables", "Official prices and times, dated"].map((t) => (
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
              <strong>Split the ten days 4 / 3 / 2:</strong> four nights in Tokyo, three in Kyoto and
              two in Osaka &mdash; nine nights, three check-ins, flying home from Kansai on Day 10.
              One mountain day does double duty as the move west, and the reason that works is that{" "}
              <strong>Odawara, the gateway station for Hakone, is on the Tokaido Shinkansen</strong>:
              the Odakyu Romancecar reaches Hakone-Yumoto from Shinjuku in{" "}
              <strong>approx. 80 minutes</strong> (checked {OWN}), and the day ends on a westbound
              train rather than back in Tokyo. Tokyo to Kyoto is <strong>about 130 minutes</strong>,
              Kyoto to Nara <strong>approx. 34 minutes</strong> by Kintetsu and Kyoto to Osaka{" "}
              <strong>about 30 minutes</strong> by JR Special Rapid. Five things have to be booked
              before you fly &mdash; the three hotels, teamLab Planets, the SHIBUYA SKY sunset slot,
              the Day 5 seats and a theme-park date if you want one &mdash; and a JR Pass almost
              certainly is not one of them.
            </p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>The route</p>
                <p className={styles.verdictStatValue}>Tokyo → Hakone → Kyoto → Nara → Osaka, out from Kansai</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nights per base</p>
                <p className={styles.verdictStatValue}>4 / 3 / 2</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must book ahead</p>
                <p className={styles.verdictStatValue}>Hotels, teamLab Planets, the sunset slot, the Day 5 seats</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass?</p>
                <p className={styles.verdictStatValue}>No — and a 7-day pass does not even span ten days</p>
              </div>
            </div>
            <a
              href={shinkansenTokyoKyoto.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check Tokyo → Kyoto shinkansen tickets on Klook →
            </a>
          </div>
        </div>

        {/* Route overview */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should You Split 10 Days in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By nights, into three bases rather than four &mdash; and then by making one day carry two
            jobs. Ten days is the length where a fourth hotel becomes tempting and is still the wrong
            answer: packing up, checking out and checking in again costs most of a day whatever the
            train does. Here is the split this itinerary uses and what each base is actually for.
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
            What this guide does differently is treat the ten days as a booking and logistics problem
            rather than a list of sights. Most of Japan is walk-in &mdash; nearly all of Kyoto and all
            of Nara Park is &mdash; and the handful of things that are not will quietly decide your
            schedule if you let them. So each of the ten days below carries its own table: time of
            day, where, how long to allow, how you get there, and whether it needs booking, with that
            day&apos;s listings directly underneath it.
          </p>
          <p className={styles.bodyText}>
            If your trip is a different length, our{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary">Tokyo Kyoto Osaka 7-day itinerary</Link>{" "}
            is this same corridor with the fourth Tokyo day, the mountain day and Nara taken out, and
            our{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14-day itinerary</Link> adds
            a night at the mountain, a Hiroshima day and genuine slack. If you are staying in one
            city, our{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">Tokyo 5-day itinerary</Link> and{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> do
            that instead. The city round-ups for{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">Tokyo</Link>,{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">Kyoto</Link> and{" "}
            <Link href="/guides/attractions/things-to-do-osaka">Osaka</Link> each list what to book
            ahead in that city and what to simply turn up to.
          </p>
        </section>

        {/* Day 1 to Day 10 */}
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
                <a
                  key={pick.url}
                  href={pick.url}
                  target="_blank"
                  rel="sponsored noopener"
                  className={styles.pickCta}
                >
                  {pick.label}
                </a>
              ))}
              {day.gyg ? (
                <GygCompareButton slug="japan-10-day-itinerary" listing={day.gyg} />
              ) : null}
            </div>
          </section>
        ))}

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          The &ldquo;time to allow&rdquo; column in all ten tables is our own planning allowance, not
          an operator figure. Journey times, prices and opening hours are in the dated tables below,
          each against the operator&apos;s own site and the date we read it.
        </p>

        {/* Long-distance legs */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting between the bases</span>
          <h2 className={styles.sectionTitle}>How Long Does Each Leg of a 10-Day Japan Trip Take?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Nothing on this plan is more than about two and a half hours, and only two of the legs
            cost you part of a day. Every figure below is the operator&apos;s own published journey
            time, with the site it was read off and the date it was read &mdash; not an estimate from
            a journey planner.
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What actually sells out, and what you can change.</strong> Shinkansen seats rarely
            sell out outside Golden Week, Obon and New Year &mdash; but the oversized-baggage rows do,
            and they are reserved separately from the seat, which is the one reservation anyone moving
            cities with a large case should not leave to the platform. The Romancecar is a reserved
            seat and the morning departures go first in autumn. Nothing on the Kyoto to Osaka leg is
            reserved at all on any of the three routes, so there is nothing to book and nothing to
            miss. Seat classes and the luggage rules are in our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link>, and the train
            types and fares for the one long leg in our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen on Klook →
            </a>
            <a href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hakone Freepass on Klook →
            </a>
            <a href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR Haruka to Kansai Airport →
            </a>
          </div>
        </section>

        {/* Pass vs singles */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pass or singles</span>
          <h2 className={styles.sectionTitle}>Should You Get a JR Pass for 10 Days in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Almost certainly not on this route, and the table below is why. A whole-country pass is
            built for a trip that crosses regions every second or third day; this one has{" "}
            <strong>one</strong> long pass-eligible leg, and half of the travelling on it happens on
            private railways no JR pass touches at all &mdash; the Odakyu Romancecar to Hakone, the
            Kintetsu to Nara, the Hankyu and Keihan to Osaka, the Nankai Rapi:t to the airport. There
            is a second problem specific to this length: a 7-day pass does not span ten days, so you
            would be choosing which week of the trip to cover.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Official price", "What it does on this plan", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem", whiteSpace: "normal" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.fit}</td>
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
            <strong>Why one row has no price.</strong> JR Central publishes Tokaido Shinkansen fares
            through its own fare search rather than as a readable page, and the figure moves with the
            train type and the season, so we do not print one &mdash; check your own date on the
            official booking route or on Klook&apos;s Tokyo-to-Kyoto rail page. One official figure is
            worth knowing: a non-reserved seat is cheaper than the reserved one by a fixed amount in
            the normal period, which is set out in JR Central&apos;s own fare rules. The pass prices
            above were read off japanrailpass.net on {OWN}, and the pass does not cover the Nozomi
            without a supplementary ticket issued only to pass holders &mdash; so a pass would put you
            on the slower Hikari for the one leg it is meant to pay for. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            works the break-even properly, and a regional pass is often the better answer &mdash; our{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kansai Area Pass guide
            </Link>{" "}
            covers the Kyoto, Nara and Osaka end of this plan.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS on Klook →
            </a>
            <a href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Single Tokyo → Kyoto seat →
            </a>
          </div>
        </section>

        {/* Where to stay */}
        <KlookStayAreas
          heading="Where Should You Stay on a 10-Day Japan Itinerary?"
          intro="Beside a station that is also an interchange, in each city — and chosen around the two moving days rather than around the sights. Shinjuku is the Tokyo base this plan prefers, because the Odakyu line to Hakone and the Fuji highway buses both leave from under it; Kyoto Station is where the westbound train arrives and where the Nara trains and the sightseeing buses start; Namba is the Nankai terminus the Day 10 airport run leaves from. Gion appears here and not on our seven-day plan for one reason: it only earns its place at three Kyoto nights."
          areas={japanTenDayStayAreas}
        />

        {/* Budget */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; passes</span>
          <h2 className={styles.sectionTitle}>How Much Does 10 Days in Japan Cost in Tickets and Transport?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Less than most people expect for the sightseeing, because most of what is on this plan is
            free to walk into. Every figure below is an operator&apos;s own published price with the
            site it was read off and the date it was read &mdash; not an estimate, and not a Klook
            price. There are no hotel, food or shopping figures here at all, deliberately: those move
            by season, city and party size, and an invented average is worse than none.
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
            Subject to change &mdash; confirm at booking. The rail-pass and Romancecar rows were read
            on {OWN}; Kinkaku-ji&apos;s admission on {KINKAKUJI_CHECKED} and Osaka Castle&apos;s on{" "}
            {OSAKA_CASTLE_CHECKED}; the HARUKA and Rapi:t rows on {RAIL_CHECKED}; every other row
            carries the date from our own guide for that ticket. The ticketed attractions also appear,
            with the same figures and dates, in the{" "}
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
            Five things out of roughly fifty stops, which is the single most useful fact to hold
            before you start planning ten days in Japan. Here is the whole itinerary sorted by how
            far ahead each thing has to be bought.
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
            <strong>Cancellation, and why the route you book through matters.</strong> Ten days has
            more slack than a week, and the slack is not evenly spread: a rained-off rooftop has three
            Tokyo evenings to move into, and a rained-off Hakone loop has none at all, because Day 5
            is also the day you change cities. That makes the dated bookings &mdash; the timed decks,
            teamLab Planets, a park date, the Day 5 seats &mdash; the ones worth buying through a
            route that lets you change or cancel, rather than the walk-in temples, which carry no risk
            at all. It is also the practical argument for a reseller on the timed tickets
            specifically: an English checkout, foreign cards the official Shibuya Sky site has
            rejected since July 2024, and all ten days on one account. Read the cancellation terms on
            each listing before the date is fixed; they differ by product, and we do not restate them
            here because they change.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets on Klook →
            </a>
            <a href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shibuya Sky on Klook →
            </a>
            <a href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hakone Freepass on Klook →
            </a>
            <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass on Klook →
            </a>
            <GygCompareButton slug="japan-10-day-itinerary" listing={gygTeamlabPlanets} />
          </div>
        </section>

        <KlookTourPicks
          heading="If You Would Rather Hand a Day to Somebody Else"
          intro="Four of these ten days work as a guided day instead of a plan of your own — the mountain day, the Nara day, the Arashiyama morning and the Osaka city day, which a pass covers almost entirely. Klook blocks automated price reads, so open a listing for the figure on your own date."
          tours={[fujiHakoneDayTour, kyotoNaraArashiyamaTour, saganoHozugawaGuaranteedTour, osakaAmazingPass]}
        />

        {/* Second seller for the low-band and date-limited products */}
        <GygCompare
          slug="japan-10-day-itinerary"
          heading="If a Timed Slot, a Park Date or a Coach Seat Has Gone"
          intro="Ten days absorbs a lot, but not a sold-out teamLab Planets slot on the only day Toyosu fits, a Shibuya Sky sunset that went weeks ago, a USJ date with no Express Pass left, or a Fuji coach that is full on the one morning you are free. All of those are sold on GetYourGuide as well, and the Kyoto and Nara catalogues are there if you are rebuilding a day from scratch."
          listings={[gygTeamlabPlanets, gygShibuyaSky, gygUsjExpressPass, gygFujiFromTokyo, gygKyoto, gygNara]}
        />

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rainy day</span>
          <h2 className={styles.sectionTitle}>What Do You Do on a Rainy Day on This Itinerary?</h2>
          <p className={styles.bodyText}>
            Swap within the day where you can, and between days where you cannot &mdash; which on
            this plan means knowing that only one of the ten is genuinely fragile.
          </p>
          <p className={styles.bodyText}>
            <strong>Day 5 is the fragile one.</strong> The Hakone ropeway closes in high wind and the
            Lake Ashi boat in rough weather, and it is also the day you change cities, so there is no
            spare afternoon to move it into. A wet or windy forecast is the argument for the guided
            coach version of the day, which reroutes around closures, or for the Mt. Fuji swap, or for
            simply taking the direct shinkansen and arriving in Kyoto in time for a long evening.
          </p>
          <p className={styles.bodyText}>
            <strong>In Tokyo,</strong> Day 3 is already weatherproof:{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets</Link> is indoors
            throughout and Solamachi under Skytree is a mall. Day 2 is the vulnerable one, because an
            observation deck in low cloud shows you cloud &mdash; move the rooftop slot to a Day 3 or
            Day 4 evening, and our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">deck comparison</Link> covers
            which of the four is worth the gamble on a marginal day. Nakamise-dori in Asakusa is
            roofed for most of its length, and a wet Day 4 is the strongest argument for the theme
            park version of it being Disney rather than Kamakura&apos;s coast.
          </p>
          <p className={styles.bodyText}>
            <strong>In Kyoto and Nara,</strong> Nishiki Market&apos;s covered arcade and the Kyoto
            Railway Museum are the indoor hours, and Sanjusangendo is the wet-weather temple because
            the whole visit happens inside one long hall. Fushimi Inari is better in rain than in sun;
            the Arashiyama bamboo grove is not. Todai-ji&apos;s Great Buddha Hall is itself indoors,
            which makes the Nara day the one to move a wet morning into.
          </p>
          <p className={styles.bodyText}>
            <strong>In Osaka,</strong> the Shinsaibashi arcade runs covered for most of a kilometre
            into Dotonbori, and the{" "}
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets">Kaiyukan</Link> is the
            indoor version of the bay. Osaka Castle&apos;s keep is an eight-floor indoor museum; the
            Nishinomaru Garden around it is not.
          </p>
        </section>

        {/* Arrival, data and the flight home */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Arrival &amp; data</span>
          <h2 className={styles.sectionTitle}>Should You Fly Into Tokyo and Out of Kansai?</h2>
          <p className={styles.bodyText}>
            If the ticket allows it, yes &mdash; and this itinerary is built on that assumption.
            Flying into Narita or Haneda and home from Kansai means no leg is retraced, and the last
            day is a 34-minute run to the airport rather than a long train plus a transfer. An
            open-jaw ticket sometimes costs a little more than a return into one city; set that
            against most of a day of travelling and a tenth night near an airport line. If your
            return is fixed to Tokyo, run the ten days in reverse &mdash; Osaka, Kyoto, Hakone, Tokyo
            &mdash; so the long train happens in the middle rather than on the morning you fly.
          </p>
          <p className={styles.bodyText}>
            The arrival run is the one worth settling before you leave. From Narita, the Narita
            Express reaches Tokyo Station, Shinjuku and Shibuya without a transfer and the Keisei
            Skyliner is the fast option for the Ueno and Asakusa side; the limousine bus is the pick
            with large cases or a hotel that is not beside a station. The route-by-route comparison is
            in our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>.
            From Haneda, the Keikyu Line and the Tokyo Monorail both reach the Yamanote loop quickly
            enough that the choice matters much less.
          </p>
          <p className={styles.bodyText}>
            One more thing to settle before you fly, and it is not transport: data. Every timed ticket
            on this plan is a QR code in an inbox, every &ldquo;getting there&rdquo; column above
            assumes you can open a map, and the Kyoto bus network and the Hakone loop are the two
            places where that matters most.{" "}
            <a href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </a>{" "}
            Our{" "}
            <Link href="/guides/esim/japan-esim-data-plans">Japan eSIM data plans guide</Link> works
            out how much data ten days of maps, tickets and messaging actually needs, and our{" "}
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
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
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
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V9l8-5 8 5v11" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
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
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V9l8-5 8 5v11" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-illumination-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="4" />
                  <path d="M12 2v2M12 18v4M4 10H2M22 10h-2M5.6 3.6 7 5M18.4 3.6 17 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Settle the five bookings first</h2>
            <p className={styles.ctaBannerDesc}>
              The three hotels, teamLab Planets, the SHIBUYA SKY sunset slot, the Day 5 Romancecar and
              shinkansen seats, and a theme-park date if you want one. Those are the only things in
              these ten days that can be gone when you want them &mdash; and Day 5 is the one with no
              spare afternoon behind it. Klook checks out in English, takes foreign cards the official
              sites sometimes reject, and keeps all three cities on one account.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Book the Tokyo → Kyoto shinkansen on Klook →
              </a>
              <GygCompareButton slug="japan-10-day-itinerary" listing={gygKyoto} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
