import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  asahiyamaZooWinterDayTour,
  dotonboriCityCruise,
  galaNaebaSkiDayTripTokyo,
  galaYuzawaLiftTicket,
  hakubaHapponeBusLiftRental,
  hakubaSkiResortDayTourTokyo,
  hanedaLimousineBus,
  hokurikuArchPass,
  japanWinterStayAreas,
  japanWinterTripPrep,
  jrEastSouthHokkaidoPass,
  jrHarukaUrl,
  jrPassWholeJapan,
  kanazawaGeishaKenrokuenCastleDayTour,
  kanazawaKenrokuenHigashiChayaDayTour,
  klookEsim,
  kyotoHighlightBusTour,
  kyotoKimonoYumeyakata,
  kyotoNaraKiyomizuTour,
  lakeShikotsuIceFestivalHalfDayTour,
  nankaiRapitUrl,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  newChitoseSapporoSharedTransfer,
  nisekoResortShuttleBus,
  nisekoSkiSnowboardRental,
  osakaAmazingPass,
  otaruSnowParkDayTour,
  rusutsuResortShuttleBus,
  sapporoSnowParkHalfDayTour,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKanazawa,
  shinkansenTokyoKyoto,
  shirakawagoLightUpTakayamaDayTour,
  shirakawagoLineBusTicket,
  shirakawagoTakayamaKanazawaDayTour,
  takayamaShirakawagoGokayamaUnescoTour,
  teamlabBotanicalGardenOsakaTicket,
  teamlabPlanetsTicketUrl,
  tokyoMegaIllumiTicket,
  tokyoNightTourAkihabaraShibuya,
  tokyoOpenTopBusSightseeing,
  tokyoSubwayTicket,
  yomiurilandTicket,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";

/**
 * Japan in winter, as a twelve-day route — written 28 Oct 2026 for the exact phrase
 * "Japan Winter Itinerary".
 *
 * This site already has four itinerary pages, and all of them are season-neutral: the
 * 7, 10 and 14-day routes and the two Tokyo ones work in any month. Winter is the one
 * season where that is not good enough, because three things change the plan rather
 * than the packing list — the two headline events are on fixed dates and one of them is
 * reservation-only, the Hokuriku side of the country is the only part of this itinerary
 * that is better in winter than in summer, and the cheap seat on a Kagayaki does not
 * exist. So this page is built around what is dated and what has to be booked.
 *
 * Sources, all read on 28 Oct 2026 and each cited where it is used:
 *
 *   shirakawa-go.gr.jp/       the Shirakawa-go Tourist Association's own notice for the
 *     events/441/             41st light-up: four evenings — 11, 17, 24 and 31 January
 *                             2027 — each 17:30–19:30, run on 完全事前予約制 (fully
 *                             advance reservation) with entry tickets, and 「当日は、入場
 *                             チケットは販売しません。」 — nothing is sold on the day.
 *   snowfes.com/news/948.html the Sapporo Snow Festival's own announcement of the 77th
 *                             edition: 4–11 February 2027, Odori from West 1 to West 11,
 *                             Susukino on Ekimae-dori between South 4 and South 6, and
 *                             the Tsudome site, with a Snow Sports Park on 12–14 Feb.
 *   data.jma.go.jp            the Japan Meteorological Agency's 1991–2020 climate
 *     /stats/etrn/view/       normals for Tokyo (47662), Kyoto (47759), Osaka (47772)
 *     nml_sfc_ym.php          and Sapporo (47412) — the monthly means, the mean daily
 *                             maxima and minima, and Sapporo's monthly snowfall totals.
 *
 * The journey times and fares are not re-derived here: each one is carried from the page
 * on this site that verified it against the operator, and says so in the table. Nothing
 * on this page is first-hand — there is no "we visited" anywhere — and no Klook price
 * appears, because Klook answers automated reads of its product pages with HTTP 403.
 */
const CHECKED = checkedLabel("2026-10-28");

type Stop = {
  time: string;
  place: string;
  /** Our own planning allowance, not an operator figure. */
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
  intro: string;
  stops: Stop[];
  book: ReactNode;
  picks: Pick[];
};

const days: Day[] = [
  {
    n: 1,
    label: "Day 1",
    heading: "Day 1 — Tokyo: the Airport Run, in the Dark",
    intro:
      "Winter changes this day in one specific way: it is dark by about half past four, so the arrival-day sightseeing most itineraries pencil in simply is not available to you. Plan for transport, check-in and one neighbourhood lit up on foot. That is not a compromise — Tokyo's illumination season runs from mid-November, and the lights are at their best in exactly the hours you will be arriving.",
    stops: [
      {
        time: "On landing",
        place: "Immigration, baggage, and getting your phone online",
        allow: "1–1.5 hours",
        getting: "n/a",
        booking: "An eSIM activated before you fly — nothing to collect, and no counter queue in a cold terminal",
      },
      {
        time: "Afternoon or evening",
        place: "Airport to your Tokyo base",
        allow: "40 minutes to 1.5 hours, by airport and base",
        getting: "Narita Express, Keisei Skyliner or a limousine bus; Keikyu or the monorail from Haneda",
        booking: "Worth booking — a reserved seat with luggage space, and a warm one",
      },
      {
        time: "Late afternoon",
        place: "Check in and drop the cases",
        allow: "1 hour",
        getting: "On foot from the station, if you picked the base for that",
        booking: "Four Tokyo nights, booked ahead",
      },
      {
        time: "Evening",
        place: "Your own neighbourhood after dark — Omoide Yokocho in Shinjuku, Nakamise in Asakusa, the Marunouchi lights if you are at Tokyo Station",
        allow: "2–3 hours",
        getting: "On foot",
        booking: "No — the street displays are free",
      },
    ],
    book: (
      <>
        The airport leg, your data and the subway ticket for the three Tokyo days that follow. Which
        Narita route suits you depends entirely on which side of the city you are sleeping on, and our{" "}
        <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link> works
        through all of them; the limousine bus is the one to pick with large cases or a hotel that is
        not beside a station. One winter-specific point about the Tokyo Subway Ticket: the illumination
        corridor — Marunouchi, Roppongi, Ebisu — is on Metro and Toei lines rather than the Yamanote,
        so the pass is a better fit in December than in any other month, and it covers neither JR nor
        the Yamanote Line.
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
    heading: "Day 2 — East Tokyo by Day, Illuminations by Night",
    intro:
      "The one thing a Tokyo winter day does better than a Tokyo summer day is the evening, so build the day backwards from it. Senso-ji, Nakamise and the Sumida side in the clear, dry air the season is actually good for; then one lit display after dark. The free street displays are the ones most visitors remember — and the two that charge admission are the two you have to decide about in advance.",
    stops: [
      {
        time: "Morning",
        place: "Senso-ji and Nakamise, Asakusa",
        allow: "2 hours",
        getting: "Ginza or Asakusa Line to Asakusa — both on the subway ticket",
        booking: "No",
      },
      {
        time: "Early afternoon",
        place: "Tokyo Skytree, or the Sumida riverside and Kiyosumi",
        allow: "2 hours",
        getting: "Two stops on the Asakusa Line to Oshiage",
        booking: "Advised for a deck slot; walk-in for the riverside",
      },
      {
        time: "Dusk, from about 16:30",
        place: "A free street display — Marunouchi, Roppongi Keyakizaka, Ebisu Garden Place",
        allow: "1.5–2 hours",
        getting: "Metro; Marunouchi is a walk from Tokyo Station",
        booking: "No — these are free and need no ticket at all",
      },
      {
        time: "Evening",
        place: "A ticketed display instead, if you want one venue rather than a walk — Tokyo Mega Illumi at Oi Racecourse, or Yomiuriland's Jewellumination",
        allow: "2–3 hours",
        getting: "Tokyo Monorail to Oi Keibajo-mae; Keio line and bus for Yomiuriland",
        booking: "Advised — these are admissions, not streets",
      },
    ],
    book: (
      <>
        Nothing on the free half of this evening needs a ticket, and our{" "}
        <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations guide</Link> has
        the dates, hours and admissions for each display with the venue each one was read off. What is
        worth booking is the version of the evening that covers ground: a guided night walk, or the
        open-top bus, whose route is the illumination corridor end to end. If you would rather see one
        big ticketed display, Tokyo Mega Illumi and Yomiuriland are both sold ahead.
      </>
    ),
    picks: [
      { label: "Tokyo night walking tour →", url: tokyoNightTourAkihabaraShibuya.url },
      { label: "Open-top sightseeing bus →", url: tokyoOpenTopBusSightseeing.url },
      { label: "Tokyo Mega Illumi ticket →", url: tokyoMegaIllumiTicket.url },
      { label: "Yomiuriland admission →", url: yomiurilandTicket.url },
    ],
  },
  {
    n: 3,
    label: "Day 3",
    heading: "Day 3 — The Snow Day: GALA Yuzawa or Hakuba, There and Back",
    intro:
      "This is the day that only exists in winter, and the reason it sits on Day 3 is that it has weather risk in it — put it early and a cancellation still has three days to move into. The unusual thing about Japan is that you do not need a ski holiday to get a ski day: GALA Yuzawa is reached from Tokyo Station on the Joetsu Shinkansen without a transfer, and its base station and the lift station are the same building.",
    stops: [
      {
        time: "Early morning",
        place: "Tokyo Station to the snow",
        allow: "1.5–2 hours each way",
        getting: "Joetsu Shinkansen for GALA Yuzawa and Naeba; a coach or the Hokuriku line for Hakuba",
        booking: "Required if you are taking a tour or a package; advised for seats either way",
      },
      {
        time: "Late morning to mid-afternoon",
        place: "On the hill — or not, if you would rather look at it",
        allow: "4–5 hours",
        getting: "Lifts from the station building at GALA; shuttle from the village at Hakuba",
        booking: "Rental and lift tickets both go faster than the trains do",
      },
      {
        time: "Mid-afternoon",
        place: "The onsen at the base, which is the part people forget to plan for",
        allow: "1 hour",
        getting: "On foot",
        booking: "No",
      },
      {
        time: "Evening",
        place: "Back in Tokyo for dinner",
        allow: "2 hours",
        getting: "Shinkansen or coach",
        booking: "Reserved seat advised on a Sunday evening in season",
      },
    ],
    book: (
      <>
        Decide first whether you are skiing or visiting snow, because they are different bookings. If
        you are skiing, the packages that bundle the coach, the lift pass and the gear are worth more
        than the sum of their parts, because the alternative is three separate queues in a language you
        do not read. If you are not, a day trip with the resort chosen at booking does the job, and the
        bare GALA lift ticket covers a half day of sledging and a long lunch. One thing to settle before
        you go: standard travel insurance treats on-piste and off-piste completely differently, which
        our{" "}
        <Link href="/guides/money/japan-ski-travel-insurance">ski travel insurance comparison</Link>{" "}
        works through on the published policy wording.
      </>
    ),
    picks: [
      { label: "GALA Yuzawa / Naeba day trip →", url: galaNaebaSkiDayTripTokyo.url },
      { label: "Hakuba day trip from Tokyo →", url: hakubaSkiResortDayTourTokyo.url },
      { label: "Happo-one bus + lift + rental →", url: hakubaHapponeBusLiftRental.url },
      { label: "GALA Yuzawa lift ticket →", url: galaYuzawaLiftTicket.url },
    ],
  },
  {
    n: 4,
    label: "Day 4",
    heading: "Day 4 — West Tokyo: Meiji Jingu, Shibuya and the Clearest Sunset of the Year",
    intro:
      "Winter is the season Tokyo's view decks actually earn their price, because the cold, dry air is when Mt. Fuji is visible from them at all. It is also the season sunset is early enough to fit comfortably inside a day rather than at the end of one — in December the sun goes down before half past four, which means a sunset slot and dinner afterwards instead of a sunset slot instead of dinner.",
    stops: [
      {
        time: "Morning",
        place: "Meiji Jingu and the Harajuku side",
        allow: "2 hours",
        getting: "Yamanote to Harajuku",
        booking: "No — the shrine grounds are free",
      },
      {
        time: "Early afternoon",
        place: "teamLab Planets in Toyosu, or Omotesando and Shibuya on foot",
        allow: "2–3 hours",
        getting: "Yurikamome to Shin-Toyosu for teamLab; otherwise walking",
        booking: "Required for teamLab — entry is a 30-minute slot and nothing is sold on site",
      },
      {
        time: "Sunset",
        place: "SHIBUYA SKY",
        allow: "1–1.5 hours",
        getting: "Inside Shibuya Scramble Square, above the station",
        booking: "Required in practice — the sunset slots are the ones that go",
      },
      {
        time: "Evening",
        place: "Shibuya or Shinjuku for dinner, then back",
        allow: "2–3 hours",
        getting: "On foot and one Yamanote stop",
        booking: "No",
      },
    ],
    book: (
      <>
        Two timed tickets, and the deck is the one with the deadline. A SHIBUYA SKY date goes on sale at
        00:00 Japan time exactly two weeks ahead, and the sunset slots on a popular winter date are
        gone first — our{" "}
        <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets guide</Link> has the
        two price bands and the booking window in full. teamLab Planets is a 30-minute admission slot
        with no door sales, covered in our{" "}
        <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets guide</Link>. Both are
        indoor-or-sheltered, which makes this the right day to move to if Day 3 is snowed off.
      </>
    ),
    picks: [
      { label: "SHIBUYA SKY tickets →", url: shibuyaSkyTicketUrl },
      { label: "teamLab Planets tickets →", url: teamlabPlanetsTicketUrl },
      { label: "Tokyo Subway Ticket →", url: tokyoSubwayTicket.url },
    ],
  },
  {
    n: 5,
    label: "Day 5",
    heading: "Day 5 — Tokyo to Kanazawa on the Hokuriku Shinkansen",
    intro:
      "The move that makes this a winter itinerary rather than a generic one. The Hokuriku Shinkansen crosses from the Pacific side to the Sea of Japan side in about two and a half hours, and the weather changes with it: Kanazawa and the mountains behind it get the snow that Tokyo mostly does not. Kenroku-en in snow, with its pine branches on their rope supports, is the single image this route is built around.",
    stops: [
      {
        time: "Morning",
        place: "Tokyo Station to Kanazawa",
        allow: "2.5–3 hours including getting to the platform",
        getting: "Hokuriku Shinkansen — 2 hours 28 minutes on JR West's own figure, no transfer",
        booking: "Required on a Kagayaki: every car is reserved, so there is no walk-up option",
      },
      {
        time: "Early afternoon",
        place: "Drop the cases, then Omicho Market for lunch",
        allow: "1.5 hours",
        getting: "Bus or a short taxi from the station",
        booking: "No",
      },
      {
        time: "Afternoon",
        place: "Kenroku-en and the Kanazawa Castle grounds",
        allow: "2–3 hours",
        getting: "Kanazawa Loop Bus from the station forecourt",
        booking: "No — walk-up admission",
      },
      {
        time: "Evening",
        place: "Higashi Chaya teahouse district after dark",
        allow: "2 hours",
        getting: "Bus or 25 minutes on foot from the market",
        booking: "No",
      },
    ],
    book: (
      <>
        The train, and the two nights at the end of it. The service to want is the{" "}
        <strong>Kagayaki</strong>, and its one unusual rule is that every seat on it is reserved — there
        is no non-reserved car at all, so this is not a leg you can leave to the morning. The{" "}
        <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link> has the times,
        the seat classes and the Hakutaka alternative that does have non-reserved cars. On passes: the
        nationwide JR Pass is rarely the right answer for this shape of trip, and the{" "}
        <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> has the calculator — but the
        Hokuriku Arch Pass very often is, because it covers exactly Tokyo → Kanazawa → Kansai and
        deliberately does not cover the Tokaido Shinkansen back.
      </>
    ),
    picks: [
      { label: "Tokyo → Kanazawa shinkansen →", url: shinkansenTokyoKanazawa.url },
      { label: "Hokuriku Arch Pass →", url: hokurikuArchPass.url },
      { label: "Price the JR Pass →", url: jrPassWholeJapan.url },
    ],
  },
  {
    n: 6,
    label: "Day 6",
    heading: "Day 6 — Kanazawa: the Garden, the Teahouses and the Market",
    intro:
      "A whole day in one small city, which is a luxury this itinerary can afford because the two nights are already paid for. Kanazawa is compact and almost all of it is walk-in, so this is the day with the least booking in it — which also makes it the obvious place to absorb a day lost to snow somewhere else.",
    stops: [
      {
        time: "Morning",
        place: "Kenroku-en again, early, or the 21st Century Museum of Contemporary Art",
        allow: "2–3 hours",
        getting: "Loop Bus",
        booking: "Advised for the museum's ticketed exhibitions; the garden is walk-up",
      },
      {
        time: "Midday",
        place: "Omicho Market for a seafood lunch — winter is the season this market is famous for",
        allow: "1.5 hours",
        getting: "On foot",
        booking: "No, though the counter seats fill",
      },
      {
        time: "Afternoon",
        place: "Nagamachi samurai district and Higashi Chaya",
        allow: "2–3 hours",
        getting: "On foot and one bus",
        booking: "No",
      },
      {
        time: "Evening",
        place: "Kanazawa, and an early night — tomorrow starts with a reserved bus",
        allow: "2 hours",
        getting: "On foot",
        booking: "Tomorrow's bus seat, if you have not already",
      },
    ],
    book: (
      <>
        Only two things, and one of them is tomorrow&apos;s. A guided Kanazawa day joins Kenroku-en, the
        Higashi Chaya district and Omicho Market into one booking, which is worth it on a short winter
        afternoon where the alternative is three bus legs. The important booking is the bus out of the
        city tomorrow: Hokuriku Railroad states the Kanazawa–Shirakawa-go service is reserved-seating
        and must be booked before boarding, at ¥2,800 for an adult and ¥1,400 for a child on a journey
        of 1 hour 15 minutes from the Kanazawa Station West Exit. There is no walk-up fallback on this
        side, as our{" "}
        <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go guide</Link>{" "}
        sets out.
      </>
    ),
    picks: [
      { label: "Kanazawa guided day (Kenroku-en & Higashi Chaya) →", url: kanazawaKenrokuenHigashiChayaDayTour.url },
      { label: "Kanazawa walking day tour →", url: kanazawaGeishaKenrokuenCastleDayTour.url },
    ],
  },
  {
    n: 7,
    label: "Day 7",
    heading: "Day 7 — Kanazawa to Shirakawa-go to Takayama",
    intro:
      "The day the itinerary goes into the mountains, and the one with no train on it: Shirakawa-go has no railway station at all, which is the single fact that shapes every plan in this region. The village under snow is the reason people come here in January and February rather than in April, and the thatched farmhouses are genuinely lived in rather than preserved as a set.",
    stops: [
      {
        time: "Morning",
        place: "Kanazawa Station West Exit to Shirakawa-go",
        allow: "1.5 hours",
        getting: "Hokuriku Railroad highway bus — 1 hour 15 minutes, ¥2,800 adult",
        booking: "Required — the service is reserved-seating and must be booked before boarding",
      },
      {
        time: "Late morning to mid-afternoon",
        place: "Ogimachi: the farmhouses, the Gassho-zukuri Minkaen open-air museum, the Shiroyama Tenshukaku viewpoint above it",
        allow: "2–3 hours",
        getting: "On foot; the viewpoint is a climb",
        booking: "No for the village; the deck has its own arrangements in winter",
      },
      {
        time: "Mid-afternoon",
        place: "Shirakawa-go to Takayama",
        allow: "1 hour",
        getting: "Nohi Bus Shirakawa-go Line — approximately 50 minutes, ¥2,800 adult",
        booking: "Some departures are marked reservation-required; book either end if the day depends on it",
      },
      {
        time: "Evening",
        place: "Takayama's Sanmachi merchant streets, and a Hida beef dinner",
        allow: "2–3 hours",
        getting: "On foot from the station",
        booking: "Advised for dinner in season",
      },
    ],
    book: (
      <>
        Either a guided day that does the whole move for you, or two bus seats. The Kanazawa departure
        is the one listing here that will drop you in Takayama instead of bringing you back, which is
        exactly what this leg needs — it is listed at 8 to 10 hours with an English-speaking licensed
        guide. If you would rather run it yourself, the fares above are the operators&apos; own:{" "}
        ¥2,800 Kanazawa → Shirakawa-go on Hokuriku Railroad and about 50 minutes and ¥2,800 onward to
        Takayama on Nohi Bus. No JR pass covers either, because both are private highway buses rather
        than JR ones.
      </>
    ),
    picks: [
      { label: "Shirakawa-go & Takayama day from Kanazawa →", url: shirakawagoTakayamaKanazawaDayTour.url },
      { label: "Shirakawa-go Line bus ticket →", url: shirakawagoLineBusTicket.url },
    ],
  },
  {
    n: 8,
    label: "Day 8",
    heading: "Day 8 — Takayama, and the Shirakawa-go Light-Up if Your Date Is One of the Four",
    intro:
      "The one evening on this itinerary that cannot be improvised. The Shirakawa-go winter light-up runs on four evenings only — 11, 17, 24 and 31 January 2027 — each from 17:30 to 19:30, and the Shirakawa-go Tourist Association runs it on a fully advance-reservation basis with entry tickets. Its own notice is unambiguous: tickets are not sold on the day, and turning up without one does not work. If your trip does not land on one of those four dates, this is a Takayama day instead, and a good one.",
    stops: [
      {
        time: "Morning",
        place: "Takayama's morning markets along the Miyagawa, and the Sanmachi streets",
        allow: "2–3 hours",
        getting: "On foot",
        booking: "No",
      },
      {
        time: "Midday",
        place: "Hida Folk Village (Hida no Sato), which is the snow-roof village without the bus ride",
        allow: "2 hours",
        getting: "Local bus from the station",
        booking: "No",
      },
      {
        time: "Afternoon",
        place: "Either a Gokayama and Shirakawa-go guided day, or a slow afternoon in town",
        allow: "Up to 7 hours 20 minutes for the guided version",
        getting: "Nohi Bus from the terminal beside the station",
        booking: "Advised",
      },
      {
        time: "17:30–19:30, on 11, 17, 24 or 31 January 2027 only",
        place: "The Shirakawa-go light-up",
        allow: "5–5.5 hours including the coach each way",
        getting: "A reserved coach from Takayama — there is no walk-up route to this event",
        booking: "Required, in advance, with no same-day tickets at all",
      },
    ],
    book: (
      <>
        If your date is one of the four, book this before you book anything else on the trip — the
        association publishes five routes to attend, and the two that do not involve a tour (staying in
        the village, or reserving a designated car park) are balloted or first-come and open months
        ahead. Klook&apos;s light-up day out of Takayama is the route that needs no car and no village
        bed: it is listed at 5 to 5.5 hours, with the choice of entering the open-air museum or the
        Ogimachi observation deck. If your date is not one of the four, take the Gokayama day instead,
        which adds Ainokura and the Minkaen to the village — the detail our{" "}
        <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go guide</Link>{" "}
        goes through departure by departure.
      </>
    ),
    picks: [
      { label: "Shirakawa-go light-up day from Takayama →", url: shirakawagoLightUpTakayamaDayTour.url },
      { label: "Shirakawa-go & Gokayama UNESCO day →", url: takayamaShirakawagoGokayamaUnescoTour.url },
    ],
  },
  {
    n: 9,
    label: "Day 9",
    heading: "Day 9 — Takayama to Kyoto, the Long Way Down",
    intro:
      "A travel day, and the only one on this route that genuinely costs you most of a day. The Takayama Main Line limited express runs down the river gorge to Nagoya and the Tokaido Shinkansen takes over from there — which is a beautiful ride in snow and a slow one in any weather. Arrive in Kyoto in time for one lit temple rather than trying to see three.",
    stops: [
      {
        time: "Morning",
        place: "Takayama to Nagoya on the limited express down the Hida valley",
        allow: "Most of the morning",
        getting: "Takayama Main Line limited express; reserve a seat on the river side",
        booking: "Advised — it is a single-track line with limited departures",
      },
      {
        time: "Midday",
        place: "Nagoya to Kyoto",
        allow: "40 minutes to an hour on the train",
        getting: "Tokaido Shinkansen; a Hikari is pass-covered where a Nozomi is not",
        booking: "Advised in season",
      },
      {
        time: "Mid-afternoon",
        place: "Check in near Kyoto Station, then Higashi Hongan-ji or Toji on foot",
        allow: "2 hours",
        getting: "On foot",
        booking: "No",
      },
      {
        time: "Evening",
        place: "One winter night illumination — Kyoto lights selected temples in the cold months",
        allow: "2 hours",
        getting: "City bus or subway",
        booking: "Check the temple's own dates; most sell at the gate",
      },
    ],
    book: (
      <>
        Nothing on this day has to be bought from us, and that is the point of flagging it: the rail
        is the whole day. If you are holding a pass, the Hida limited express and the Tokaido
        Shinkansen Hikari are both covered and the Nozomi is not — the difference is about half an hour
        to Kyoto, as our{" "}
        <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> sets out for the
        same line. What is worth doing is reserving the Hida seat: it is a single-track line with few
        departures, and standing in a vestibule for two hours is a poor use of the best scenery on the
        itinerary.
      </>
    ),
    picks: [
      { label: "Price the JR Pass for these legs →", url: jrPassWholeJapan.url },
      { label: "Tokyo ⇄ Kyoto shinkansen tickets →", url: shinkansenTokyoKyoto.url },
    ],
  },
  {
    n: 10,
    label: "Day 10",
    heading: "Day 10 — Kyoto: Kinkaku-ji, Fushimi Inari and Arashiyama in the Cold",
    intro:
      "Kyoto is the city winter does the most for, and for an unglamorous reason: the crowds are at their thinnest between the New Year week and the plum blossom, and almost everything famous here is walk-in. Kinkaku-ji with snow on the roof is the shot everyone wants and nobody can plan for — Kyoto's mean January temperature is 4.8°C, which is cold enough to be miserable in the wrong coat and not cold enough to guarantee snow.",
    stops: [
      {
        time: "Early morning",
        place: "Fushimi Inari, before the coaches",
        allow: "2 hours",
        getting: "JR Nara Line, two stops from Kyoto Station",
        booking: "No — open at all hours, free, and best at 07:00 in any season",
      },
      {
        time: "Late morning",
        place: "Kinkaku-ji",
        allow: "1 hour",
        getting: "City bus 101 or 205 from Kyoto Station",
        booking: "No — walk-up admission",
      },
      {
        time: "Afternoon",
        place: "Arashiyama: the bamboo grove, Tenryu-ji, the Katsura riverside",
        allow: "3 hours",
        getting: "JR Sagano Line to Saga-Arashiyama",
        booking: "No for the grove; the Sagano Romantic Train does not run in deep winter, so do not build the day on it",
      },
      {
        time: "Evening",
        place: "Gion and Pontocho after dark",
        allow: "2–3 hours",
        getting: "Bus or Keihan line",
        booking: "Advised for dinner",
      },
    ],
    book: (
      <>
        The honest answer for Kyoto is: very little, and we say so on the city guide as well. What a
        booking buys you here is the bus problem — a single guided day joins Kinkaku-ji, Fushimi Inari
        and Arashiyama without the three city-bus legs between them, which on a short winter afternoon
        is the difference between three stops and two. A kimono rental is the other thing worth
        reserving rather than walking into, and the shops have winter sets with a haori over the top.
        Where to sleep matters more than what to book: our{" "}
        <Link href="/guides/attractions/where-to-stay-in-kyoto">where to stay in Kyoto guide</Link>{" "}
        compares the station, the centre and Arashiyama on travel time rather than on atmosphere.
      </>
    ),
    picks: [
      { label: "Kyoto one-day highlight bus tour →", url: kyotoHighlightBusTour.url },
      { label: "Kyoto & Nara guided day →", url: kyotoNaraKiyomizuTour.url },
      { label: "Kyoto kimono rental →", url: kyotoKimonoYumeyakata.url },
    ],
  },
  {
    n: 11,
    label: "Day 11",
    heading: "Day 11 — Kyoto to Osaka, and a Garden Lit Up After Dark",
    intro:
      "Thirty minutes on the JR Special Rapid, and the whole character of the trip changes: Osaka in winter is an indoor-and-after-dark city, which suits the season. The one thing to put in the diary is teamLab Botanical Garden Osaka, because it is a night-only outdoor venue whose last entry is 20:30 for the whole of this period — an evening you plan around rather than fit in.",
    stops: [
      {
        time: "Morning",
        place: "Kyoto to Osaka, cases to the hotel",
        allow: "1.5 hours including the transfer",
        getting: "JR Special Rapid or the Hankyu line; about 30 minutes either way",
        booking: "No",
      },
      {
        time: "Midday",
        place: "Osaka Castle, or Kuromon Market for lunch",
        allow: "2–3 hours",
        getting: "Midosuji and Chuo lines",
        booking: "No — both walk-in",
      },
      {
        time: "Afternoon",
        place: "Dotonbori and Shinsaibashi, or a river cruise",
        allow: "2 hours",
        getting: "On foot from Namba",
        booking: "Advised for the cruise",
      },
      {
        time: "From 18:00",
        place: "teamLab Botanical Garden Osaka, Nagai",
        allow: "1.5–2 hours plus the travel",
        getting: "Midosuji Line to Nagai (M26), then about 10 minutes on foot from Exit 3",
        booking: "Advised — ¥200 cheaper per adult than the gate, and the gate can sell out",
      },
    ],
    book: (
      <>
        Two things, and one pass that decides whether you need the first. The Osaka Amazing Pass covers
        more than 40 city admissions plus the Metro rides between them, which is unusually good value
        on a single packed Osaka day — and it does not cover the teamLab garden, which is its own
        ticket. That ticket is ¥1,800 for an adult and ¥500 for a child aged 6 to 15 on teamLab&apos;s
        own published prices, against ¥2,000 and ¥600 bought at the gate; our{" "}
        <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets">teamLab Botanical Garden Osaka guide</Link>{" "}
        has the dated hours, the rain rule and the three date changes the official ticket allows. On
        where to sleep, a Midosuji base is what makes a 21:00 finish at Nagai a single train — our{" "}
        <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka guide</Link>{" "}
        has the comparison.
      </>
    ),
    picks: [
      { label: "teamLab Botanical Garden Osaka →", url: teamlabBotanicalGardenOsakaTicket.url },
      { label: "Osaka Amazing Pass →", url: osakaAmazingPass.url },
      { label: "Dotonbori river cruise →", url: dotonboriCityCruise.url },
    ],
  },
  {
    n: 12,
    label: "Day 12",
    heading: "Day 12 — Out of Kansai",
    intro:
      "A departure day with one winter-specific warning in it: this is the morning a snowfall two hundred kilometres away can still reach you, because the Tokaido and Hokuriku lines feed the Kansai network. Give yourself an hour more than the timetable says you need, and make the airport run the thing you booked rather than the thing you worked out on the platform.",
    stops: [
      {
        time: "Morning",
        place: "Anything left over within one stop of the hotel",
        allow: "1–2 hours",
        getting: "On foot",
        booking: "No",
      },
      {
        time: "Midday",
        place: "Osaka to Kansai International",
        allow: "1.5–2 hours door to gate",
        getting: "JR HARUKA from Tennoji or Shin-Osaka, or the Nankai Rapi:t from Namba",
        booking: "Advised — a reserved seat with luggage space on a winter Sunday is worth the few hundred yen",
      },
      {
        time: "At the airport",
        place: "Tax-free refund desk, if you shopped",
        allow: "30–45 minutes",
        getting: "Terminal signage",
        booking: "No",
      },
    ],
    book: (
      <>
        The airport leg, and nothing else. Which of the two you want depends on where you slept: the
        HARUKA runs from Tennoji and Shin-Osaka and the Rapi:t from Namba, and our{" "}
        <Link href="/guides/transport/haruka-vs-nankai-rapit">HARUKA vs Nankai Rapi:t comparison</Link>{" "}
        puts the two side by side on time and price. Our{" "}
        <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer guide</Link> covers
        the bus and the Itami side as well.
      </>
    ),
    picks: [
      { label: "JR HARUKA ticket →", url: jrHarukaUrl },
      { label: "Nankai Rapi:t ticket →", url: nankaiRapitUrl },
    ],
  },
];

/** How the twelve days split, and why. */
const baseRows = [
  { base: "Tokyo", nights: "4", why: "Two city days, one snow day out and back, and the illumination evenings — the season's one genuine advantage over summer" },
  { base: "Kanazawa", nights: "2", why: "Kenroku-en in snow, and the only base the reserved Shirakawa-go coach leaves from on this side" },
  { base: "Takayama", nights: "2", why: "The old town, and the only base the four January light-up evenings can be reached from without a car or a village bed" },
  { base: "Kyoto", nights: "2", why: "The thinnest crowds of the year at the walk-in sites — and almost nothing here needs booking" },
  { base: "Osaka", nights: "1", why: "An indoor-and-after-dark city, plus the night-only teamLab garden, and the Kansai Airport run under your hotel" },
];

/** JMA 1991–2020 normals, the four cities this page actually sends you to. */
const tempRows = [
  { city: "Tokyo", dec: "7.7°C (12.0 / 3.8)", jan: "5.4°C (9.8 / 1.2)", feb: "6.1°C (10.9 / 2.1)" },
  { city: "Kyoto", dec: "7.2°C", jan: "4.8°C", feb: "5.4°C" },
  { city: "Osaka", dec: "8.7°C (12.3 / 5.3)", jan: "6.2°C (9.7 / 3.0)", feb: "6.6°C (10.5 / 3.2)" },
  { city: "Sapporo", dec: "−0.9°C (2.0 / −4.0)", jan: "−3.2°C (−0.4 / −6.4)", feb: "−2.7°C (0.4 / −6.2)" },
];

/** The two dated events, and what their own organisers say about booking. */
const datedRows = [
  {
    event: "Shirakawa-go winter light-up (41st)",
    when: "11, 17, 24 and 31 January 2027, each 17:30–19:30",
    rule: "Fully advance reservation with an entry ticket. The association states plainly that tickets are not sold on the day and that arriving without a reservation does not get you in — five routes to attend are published, including a ballot for village accommodation and a first-come designated car park",
    source: "Shirakawa-go Tourist Association",
  },
  {
    event: "Sapporo Snow Festival (77th)",
    when: "4–11 February 2027, eight days",
    rule: "Free to walk into — no ticket for the Odori site (West 1 to West 11) or the Susukino site (Ekimae-dori, South 4 to South 6). What sells out is the city: Sapporo beds and the New Chitose flights, months ahead, which is the booking this event actually requires",
    source: "Sapporo Snow Festival Executive Committee",
  },
  {
    event: "Ski days and rentals",
    when: "Roughly December to March, by resort",
    rule: "The coach-plus-lift-plus-gear packages are sold by date and the popular weekend departures go first. Rental is the piece worth reserving earliest — a shop that has run out of your boot size on the morning has no second option",
    source: "Klook listings",
  },
  {
    event: "teamLab Botanical Garden Osaka",
    when: "Night only, last entry 20:30 to 31 January 2027",
    rule: "Same-day tickets exist at the gate but cost ¥200 more per adult and may sell out. A ticket from the official site can have its date changed up to three times, until 21:00 on the admission day",
    source: "teamLab",
  },
];

/** Where the snow actually is, relative to where the itinerary goes. */
const snowRows = [
  {
    place: "Yuzawa and Naeba (Niigata)",
    getting: "Joetsu Shinkansen from Tokyo Station, no transfer — GALA Yuzawa's base station and lift station are the same building",
    season: "Reliable from late December to March",
    forWhom: "A snow day inside a Tokyo trip, with no extra night",
  },
  {
    place: "Hakuba (Nagano)",
    getting: "Coach from Tokyo, or the Hokuriku Shinkansen to Nagano and a bus",
    season: "Reliable December to April",
    forWhom: "Actual skiing, four resorts on one valley pass",
  },
  {
    place: "Shirakawa-go and Takayama (Gifu)",
    getting: "Reserved highway bus from Kanazawa or Takayama; no railway station at Shirakawa-go at all",
    season: "January and February are the deep-snow months",
    forWhom: "The snow-roofed village photograph, not skiing",
  },
  {
    place: "Niseko and Rusutsu (Hokkaido)",
    getting: "Coach direct from New Chitose Airport — the version that takes ski bags",
    season: "December to early April",
    forWhom: "The trip that is about the snow rather than the cities",
  },
  {
    place: "Sapporo and Otaru (Hokkaido)",
    getting: "Flight to New Chitose, then a train or a booked transfer",
    season: "Snow on the ground through December, January and February — 137 cm of snowfall in January alone on the JMA normals",
    forWhom: "Snow as a city experience, with the February festival on top",
  },
];

const packRows = [
  { item: "A proper coat, not a thick jumper", why: "Tokyo's January mean daily minimum is 1.2°C and Sapporo's is −6.4°C on the JMA normals. Layers under a windproof shell beat one heavy garment, because every building and train you enter is heated hard" },
  { item: "Shoes with grip, and a spare pair of socks", why: "Compacted snow on a Takayama pavement or a temple path is the one hazard on this itinerary, and the Shirakawa-go viewpoint is a climb" },
  { item: "Gloves and something over your ears", why: "The outdoor parts of this plan are all after dark — illuminations, the light-up, the teamLab garden — which is when the temperature is at its daily minimum rather than its mean" },
  { item: "Fewer clothes than you think, plus a coin laundry plan", why: "Winter clothing is bulky and this route moves base five times with reserved-seat luggage limits. Japanese hotels almost all have coin laundries" },
  { item: "Lip balm and hand cream", why: "The Pacific-side winter is dry as well as cold — it is what makes Mt. Fuji visible from the Tokyo decks, and what cracks your hands by Day 4" },
  { item: "Nothing for the snow itself", why: "If you are skiing, rent at the resort. Gear rental is bookable before you fly and arriving with your own boots is rarely worth the baggage fee" },
];

/** The other winter route, for a February trip built around the festival. */
const hokkaidoRows = [
  { leg: "Days 1–4", plan: "Tokyo, exactly as above — the illumination evenings and the snow day are unchanged" },
  { leg: "Day 5", plan: "Fly Haneda to New Chitose, or take the Tohoku and Hokkaido Shinkansen if you are holding the JR East–South Hokkaido pass. Booked transfer into Sapporo" },
  { leg: "Days 6–7", plan: "The Snow Festival sites: Odori from West 1 to West 11, Susukino on Ekimae-dori, and the Tsudome site. All free to walk into, all outdoors, all at a mean daily maximum of 0.4°C" },
  { leg: "Day 8", plan: "A day out: Otaru and a snow park, or Asahiyama Zoo in the one season the penguins walk, or the Lake Shikotsu ice festival as a half day" },
  { leg: "Days 9–11", plan: "Niseko or Rusutsu, with the airport coach that takes ski bags — or back to Tokyo and the Kanazawa half of the main route if you would rather have both" },
  { leg: "Day 12", plan: "Out of New Chitose, or back down to Tokyo. The one risk on this version is a February snow day closing the airport, so do not book the last flight of the day" },
];

const faqItems = [
  {
    q: "Is Japan worth visiting in winter?",
    a: `Yes, and for three reasons that do not apply in any other season. The crowds at the walk-in sites — which is most of Kyoto and all of Nara Park — are at their thinnest between the New Year week and the plum blossom. The air on the Pacific side is dry and clear, which is the only time Mt. Fuji is reliably visible from Tokyo's observation decks. And the Sea of Japan side of the country, which is a secondary detour in summer, becomes the main event: Kanazawa's Kenroku-en and the thatched village at Shirakawa-go are both better under snow. The trade-off is daylight. It is dark by about half past four in December, which cuts your sightseeing day short and is why this itinerary puts evening attractions on every Tokyo day rather than treating them as extras.`,
  },
  {
    q: "What should I pack for Japan in winter?",
    a: `Layers under a windproof shell, shoes with grip, gloves, and markedly less than you think. The numbers that matter are the Japan Meteorological Agency's 1991–2020 normals, read on ${CHECKED}: Tokyo's January mean daily minimum is 1.2°C, Kyoto's monthly mean is 4.8°C, Osaka's is 6.2°C, and Sapporo's mean daily minimum is −6.4°C. So Honshu is cold-coat weather rather than expedition weather, and Hokkaido genuinely is not. Three practical points. Every train, shop and restaurant is heated hard, so one thick garment you cannot take off is worse than three thin ones. The outdoor parts of a winter trip are nearly all after dark, which is when the temperature is at its minimum rather than its mean. And if you are skiing, rent the gear at the resort — it is bookable before you fly.`,
  },
  {
    q: "How cold is Japan in December, January and February?",
    a: `On the Japan Meteorological Agency's 1991–2020 normals, Tokyo averages 7.7°C in December, 5.4°C in January and 6.1°C in February, with January's mean daily maximum at 9.8°C and minimum at 1.2°C. Kyoto is a degree colder than Tokyo through all three months — 7.2°C, 4.8°C and 5.4°C — and Osaka is a degree warmer at 8.7°C, 6.2°C and 6.6°C. Sapporo is a different country: −0.9°C, −3.2°C and −2.7°C, with January's mean daily maximum below freezing at −0.4°C and 137 cm of snowfall in that month alone. January is the coldest month everywhere on this list, and February is marginally milder than January rather than colder. Read on ${CHECKED}.`,
  },
  {
    q: "Where can I see snow in Japan?",
    a: `Not usually in Tokyo, Kyoto or Osaka — all three are Pacific-side cities where snow is an event rather than a season. The snow is on the Sea of Japan side and in the mountains, and the closest reliable version to Tokyo is Yuzawa in Niigata: GALA Yuzawa is reached on the Joetsu Shinkansen from Tokyo Station with no transfer, and its base station and lift station are the same building, which makes a ski day possible without a ski holiday. Hakuba in Nagano is the other day-trip option and the better skiing. For snow as scenery rather than sport, Shirakawa-go and Takayama in January and February are the ones this itinerary is built around. And Hokkaido has snow as a given: Sapporo's January snowfall normal is 137 cm.`,
  },
  {
    q: "Do I need to book winter tours in advance?",
    a: `For two things on this itinerary, yes, absolutely — and for the rest, less than you would guess. The Shirakawa-go light-up runs on four evenings only in 2027 (11, 17, 24 and 31 January, each 17:30–19:30) on a fully advance-reservation basis, and the association's own notice states that entry tickets are not sold on the day. The Kanazawa–Shirakawa-go highway bus is reserved-seating and Hokuriku Railroad requires it to be booked before boarding, with no walk-up fallback. Beyond those, a Kagayaki on the Hokuriku Shinkansen has no non-reserved car at all, ski rental is the piece that runs out of your size first, and SHIBUYA SKY's sunset slots go the moment a date opens two weeks ahead. Almost everything else — Kyoto's temples, Kenroku-en, the free Tokyo illuminations, the Snow Festival sites — is walk-in.`,
  },
  {
    q: "How many days do you need for a winter trip to Japan?",
    a: "Ten at the absolute minimum for the route on this page, twelve to do it without rushing, and fourteen if you want Hokkaido as well as the Hokuriku side. Winter specifically punishes a short trip, for two reasons: the daylight is short, so each day holds less than the same day would in May, and the weather risk is real, so a plan with no slack in it has nowhere to move a snowed-off day to. If you only have a week, cut the Takayama and Kanazawa leg rather than the Tokyo days and run the Tokyo, Kyoto and Osaka week instead, with illuminations added to the evenings. If you have ten days, our 10-day itinerary is the same corridor and absorbs a winter plan comfortably.",
  },
  {
    q: "Does the shinkansen run in snow?",
    a: `Yes, and it is one of the more reassuring things about travelling in Japan in February — the Joetsu and Tohoku lines run through some of the heaviest snowfall in the developed world as a matter of routine, with sprinkler systems and snow sheds built for it. What does happen is delay rather than cancellation, and it propagates: snow in Niigata or Gifu can hold trains on the Tokaido line hours away. The practical rules are to leave an hour of slack on any day with a flight at the end of it, to not book the last departure of the day out of Kansai or New Chitose, and to keep your phone online — the delay notices and the replacement-service announcements all arrive that way rather than at a counter.`,
  },
  {
    q: "Is the New Year period a bad time to go?",
    a: `It is the one week of winter we would plan around rather than into. From about 29 December to 3 January, museums and many restaurants close, the trains and the shinkansen run at their fullest of the whole year, and hotel rates in every city on this itinerary peak. The shrines are the exception and the reason some people go anyway — hatsumode, the first shrine visit of the year, is a genuine spectacle at Meiji Jingu and Fushimi Inari, and both are free. If your dates are fixed to that week, book the rail seats the moment reservations open thirty days ahead and expect the walk-in sites to behave like booked ones.`,
  },
  {
    q: "Is a JR Pass worth it for this winter route?",
    a: `Probably not the nationwide one, and quite possibly the Hokuriku Arch Pass. The nationwide pass has to be paid for by a lot of long legs, and this route has two: Tokyo to Kanazawa and the Takayama-to-Kyoto day. The Hokuriku Arch Pass is seven consecutive days covering the Hokuriku Shinkansen between Tokyo and Tsuruga plus the Kansai area, and it deliberately does not cover the Tokaido Shinkansen — which is exactly the shape of a trip that goes out through Kanazawa and comes back through Kyoto and Osaka. Neither pass covers the highway buses to Shirakawa-go, which are private rather than JR, so budget those fares separately. Our JR Pass guide has the break-even calculator for your own legs.`,
  },
  {
    q: "Can you do this itinerary with children in winter?",
    a: `Most of it, with two adjustments. The first is the evenings: the illuminations, the Shirakawa-go light-up and the teamLab garden are all after-dark outings in the cold, and a 19:30 finish in the mountains is a late night for a small child. The second is the Day 9 travel day, which is most of a day on two trains — worth splitting or cutting if the ages are young. What works well is the snow day, because snow play needs no skill and no lift pass; Hokkaido's snow-park half days are built for exactly that. teamLab Botanical Garden Osaka is also the cheapest family ticket on the whole route at ¥500 for ages 6 to 15 and free for preschool children, though its listing warns of flashing lights and loud noises.`,
  },
];

const TITLE = "Japan Winter Itinerary: 12 Days, Day by Day (2027)";
const DESCRIPTION =
  "A 12-day Japan winter itinerary: Tokyo, Kanazawa, Shirakawa-go, Takayama, Kyoto and Osaka, with a table per day, dated winter events and what to book.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/japan-winter-itinerary") },
});

export default function JapanWinterItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/japan-winter-itinerary" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/japan-winter-itinerary" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
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
              route: "/guides/attractions/japan-winter-itinerary",
              headline: TITLE,
              description: DESCRIPTION,
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Things to Do",
                  item: "https://www.japan-travel-kit.com/guides/attractions",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Japan Winter Itinerary",
                  item: "https://www.japan-travel-kit.com/guides/attractions/japan-winter-itinerary",
                },
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
          <span className={styles.breadCurrent}>Japan Winter Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Winter Itinerary:<br />12 Days in Japan, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo, Kanazawa, Shirakawa-go, Takayama, Kyoto and Osaka — with the two winter events that
            are on fixed dates, and the one that sells nothing at the door.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "A table for each of the 12 days", "Dated 2027 winter events", "Official temperatures"].map((t) => (
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

        {/* Lead paragraph — the whole answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            This <strong>Japan winter itinerary</strong> runs <strong>twelve days across five bases</strong> —
            Tokyo 4 nights, Kanazawa 2, Takayama 2, Kyoto 2 and Osaka 1 — and it is built around the
            three things winter changes rather than around a list of sights. The spine is a{" "}
            <strong>2 hour 28 minute</strong> Hokuriku Shinkansen ride from Tokyo to Kanazawa on JR
            West&apos;s own figure, then a reserved highway bus into the mountains, then the Tokaido
            line down to Kansai. Two dates are fixed and not negotiable: the{" "}
            <strong>Shirakawa-go winter light-up runs on four evenings only — 11, 17, 24 and 31 January
            2027, each 17:30–19:30 — and its organisers sell no tickets at all on the day</strong>, while
            the <strong>77th Sapporo Snow Festival is 4–11 February 2027</strong> and is free to walk
            into. Expect short daylight — dark by about half past four in December — and Tokyo at a
            January mean of 5.4°C against Sapporo&apos;s −3.2°C on the Japan Meteorological
            Agency&apos;s 1991–2020 normals. Every event date, temperature and fare below carries the
            source it was read off and the date we read it, {CHECKED}.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>12 days, 5 bases</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book first</p>
                <p className={styles.verdictStatValue}>Shirakawa-go light-up</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Longest leg</p>
                <p className={styles.verdictStatValue}>Tokyo → Kanazawa, 2h 28m</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>January mean</p>
                <p className={styles.verdictStatValue}>Tokyo 5.4°C, Sapporo −3.2°C</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> settle the dated things first — the light-up evening, the
              reserved Kanazawa coach, the all-reserved Kagayaki and your beds — and leave Kyoto almost
              entirely unbooked, because almost all of it is walk-in even in high season.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink
                href={shirakawagoLightUpTakayamaDayTour.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
              >
                Check the Shirakawa-go light-up day →
              </KlookLink>
              <KlookLink
                href={hokurikuArchPass.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.pickCta}
              >
                Check the Hokuriku Arch Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* How the days split */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The shape of it</span>
          <h2 className={styles.sectionTitle}>How Should You Split 12 Days in Japan in Winter?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Five bases rather than eight, because winter days are short and a travel day in January
            costs you more than the same day in May. The unusual choice here is two nights in Takayama,
            and it is the one that makes the plan work: it is the only base the four January light-up
            evenings can be reached from without a car or a bed in the village.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Base", "Nights", "Why it is on the list"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {baseRows.map((row) => (
                    <tr key={row.base}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.base}</td>
                      <td className={styles.tdPrice}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            If your trip is a different length or a different season, our{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary">Japan 10 day itinerary</Link> and{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14-day itinerary</Link> run
            the Tokyo–Kyoto–Osaka corridor without the Hokuriku detour, and our{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary">7-day Tokyo, Kyoto and Osaka itinerary</Link>{" "}
            is the version for a single week. Each of the twelve days below carries its own table — time
            of day, where, how long to allow, how you get there, and whether it needs booking — with
            that day&apos;s listings underneath it.
          </p>
        </section>

        {/* Day 1 to Day 12 */}
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
            </div>
          </section>
        ))}

        <p
          className={styles.bodyText}
          style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}
        >
          The &ldquo;time to allow&rdquo; column in all twelve tables is our own planning allowance, not
          an operator figure. The journey times and fares are the operators&apos; own, each carried from
          the guide on this site that verified it: the 2 hour 28 minute Hokuriku Shinkansen figure from
          JR West via our{" "}
          <Link href="/guides/transport/tokyo-to-kanazawa" style={{ color: "var(--text)", fontWeight: 600 }}>
            Tokyo to Kanazawa guide
          </Link>
          , and the ¥2,800 Shirakawa-go bus fares and their journey times from Hokuriku Railroad and
          Nohi Bus via our{" "}
          <Link href="/guides/attractions/takayama-shirakawago-tour" style={{ color: "var(--text)", fontWeight: 600 }}>
            Takayama and Shirakawa-go guide
          </Link>
          .
        </p>

        {/* Accommodation — required on every itinerary page on this site. */}
        <KlookStayAreas
          heading="Where Should You Stay on a Winter Trip to Japan?"
          intro="Five bases in twelve days, and winter adds one criterion to the usual ones: how far you walk from the station in the dark with a case. Each of these is a Klook hotel search for that area, picked for the line or the bus terminal the plan actually uses. Our where-to-stay guides compare the areas inside Tokyo, Kyoto and Osaka in more detail."
          areas={japanWinterStayAreas}
        />

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3rem" }}>
          The three city guides go further than a search can:{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
            where to stay in Tokyo
          </Link>{" "}
          compares the areas by line and airport,{" "}
          <Link href="/guides/attractions/where-to-stay-in-kyoto" style={{ color: "var(--red)", fontWeight: 600 }}>
            where to stay in Kyoto
          </Link>{" "}
          by travel time to the temples, and{" "}
          <Link href="/guides/attractions/where-to-stay-in-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
            where to stay in Osaka
          </Link>{" "}
          by which airport run starts under your hotel. On this route Kanazawa and Takayama are the two
          where the station base is worth paying for outright, because both of the reserved buses leave
          from beside the station and both do it early.
        </p>

        {/* Long-distance moves — the rail and bus spine, with sources. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting between the bases</span>
          <h2 className={styles.sectionTitle}>How Do You Travel Between the Bases, and Does a Pass Pay?</h2>
          <p className={styles.bodyText}>
            Two long rail legs, two reserved highway buses and one travel day. The thing that catches
            people out is not the length of any of it — nothing here is more than about three hours —
            but the reservations: the fast Hokuriku service has no non-reserved car at all, and the
            Kanazawa-side bus to Shirakawa-go cannot be boarded without a booking.
          </p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Tokyo → Kanazawa, 2 hours 28 minutes.</strong> JR West&apos;s own figure for the
                Hokuriku Shinkansen, with no transfer. The <strong>Kagayaki</strong> is the fast service
                and every seat on it is reserved — JR West writes it as 全車指定席, all cars reserved —
                so this leg has to be booked. The Hakutaka is the slower service that does have
                non-reserved cars. Full detail in our{" "}
                <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link>.
              </span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Kanazawa → Shirakawa-go, 1 hour 15 minutes, ¥2,800 adult.</strong> Hokuriku
                Railroad&apos;s own fare and time from the Kanazawa Station West Exit. It is a
                reserved-seating service and the operator states it must be booked before boarding —
                there is no walk-up fallback on this side.
              </span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Shirakawa-go → Takayama, about 50 minutes, ¥2,800 adult.</strong> Nohi Bus&apos;s
                Shirakawa-go Line. Some departures are marked reservation-required on its own timetable
                and the rest are non-reserved, so there are walk-up seats — but they are finite, and
                there is no train alternative because Shirakawa-go has no railway station.
              </span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Takayama → Kyoto, most of a day.</strong> The Takayama Main Line limited express
                to Nagoya, then the Tokaido Shinkansen. A Hikari is pass-covered where a Nozomi is not,
                and the difference on the Tokyo–Kyoto run is 2 hours 45 minutes against 2 hours 15 — the
                arithmetic our{" "}
                <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> works through.
              </span>
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <span>
                <strong>Kyoto → Osaka, about 30 minutes.</strong> JR Special Rapid or the Hankyu line.
                The one leg on this itinerary nobody needs to plan.
              </span>
            </li>
          </ul>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            On passes: the nationwide JR Pass has to be paid for by long legs and this route only has
            two, so price it rather than assume it. The{" "}
            <strong>Hokuriku Arch Pass</strong> is the one shaped like this trip — seven consecutive
            days covering the Hokuriku Shinkansen between Tokyo and Tsuruga plus the Kansai area, and
            deliberately not the Tokaido Shinkansen, which is why it only works going out one way and
            back the other. Neither covers the Shirakawa-go buses, which are private rather than JR.
            Our <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> has the break-even
            calculator for your own legs, and our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers seat classes
            and reservations.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Hokuriku Arch Pass →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Price the JAPAN RAIL PASS →
            </KlookLink>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kanazawa tickets →
            </KlookLink>
          </div>
        </section>

        {/* Temperatures */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Weather</span>
          <h2 className={styles.sectionTitle}>How Cold Is Japan in December, January and February?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Cold-coat weather on Honshu and genuinely cold in Hokkaido — and January is the coldest
            month everywhere, with February very slightly milder rather than worse. The figures below
            are the Japan Meteorological Agency&apos;s own 1991–2020 climate normals: the monthly mean
            first, with the mean daily maximum and minimum in brackets where the distinction matters
            for what you pack.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["City", "December", "January", "February"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tempRows.map((row) => (
                    <tr key={row.city}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.city}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dec}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.jan}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.feb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Monthly mean air temperature, with the mean daily maximum and minimum in brackets, from the
            Japan Meteorological Agency&apos;s 1991–2020 normals for Tokyo, Kyoto, Osaka and Sapporo,
            read on {CHECKED}. Sapporo&apos;s monthly snowfall totals in the same table are 113 cm in
            December, 137 cm in January and 116 cm in February. Two things these numbers do not show:
            the Sea of Japan side of Honshu — Kanazawa, Takayama, Shirakawa-go — gets far more snow than
            its temperature suggests, and the hours you will be outdoors on this itinerary are mostly
            after dark, which is nearer the daily minimum than the mean.
          </p>
        </section>

        {/* Snow */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Snow</span>
          <h2 className={styles.sectionTitle}>Where Can You See Snow in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not in Tokyo, Kyoto or Osaka, as a rule — all three are Pacific-side cities where snow is a
            news event rather than a season. The snow is in the mountains and on the Sea of Japan side,
            and the useful question is not where it is deepest but which version of it fits the trip
            you are actually taking.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "Getting there", "Season", "Who it suits"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {snowRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.season}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.forWhom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            The one of these that needs no extra night is the Yuzawa side, which is why it is Day 3 of
            this plan. If you are skiing rather than looking, the thing to book earliest is the gear
            rather than the lift pass — and settle the insurance before you go, because on-piste and
            off-piste are treated completely differently in the policy wording, as our{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">ski travel insurance comparison</Link>{" "}
            sets out.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={galaNaebaSkiDayTripTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              GALA Yuzawa / Naeba day trip →
            </KlookLink>
            <KlookLink href={hakubaHapponeBusLiftRental.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hakuba bus + lift + rental →
            </KlookLink>
            <KlookLink href={nisekoSkiSnowboardRental.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Niseko ski &amp; snowboard rental →
            </KlookLink>
          </div>
        </section>

        {/* Booking — the part an AI answer does not finish. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book Winter Tours in Advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For one thing on this itinerary the answer is not &ldquo;advisable&rdquo; but
            &ldquo;otherwise you cannot go&rdquo;. The Shirakawa-go light-up is run on four evenings a
            year under a complete advance-reservation system, and the association&apos;s own notice says
            in plain terms that entry tickets are not sold on the day. Everything else on this list is
            a matter of degree.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "When", "What the organiser actually requires", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datedRows.map((row) => (
                    <tr key={row.event}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.event}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rule}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Light-up dates and the no-same-day-tickets rule from the Shirakawa-go Tourist
            Association&apos;s own notice for the 41st event; snow festival dates and sites from the
            Sapporo Snow Festival&apos;s own announcement of the 77th edition; the teamLab figures from
            teamLab&apos;s own exhibition page and FAQ. All read on {CHECKED}. Nothing beyond the dates
            each organiser has published is assumed here — if your trip falls outside those windows,
            treat the relevant row as not applying rather than as approximately applying.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            The practical booking order, if you are starting from nothing: the light-up evening if your
            dates allow one, then the beds, then the Kagayaki seat, then the Kanazawa coach, then the
            ski rental, then SHIBUYA SKY two weeks out, then everything else in the last fortnight.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink
              href={shirakawagoLightUpTakayamaDayTour.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
              Shirakawa-go light-up day →
            </KlookLink>
            <KlookLink
              href={shirakawagoTakayamaKanazawaDayTour.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
              Shirakawa-go day from Kanazawa →
            </KlookLink>
            <KlookLink
              href={teamlabBotanicalGardenOsakaTicket.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.pickCta}
            >
              teamLab Botanical Garden Osaka →
            </KlookLink>
          </div>
        </section>

        {/* The Hokkaido swap */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The other winter route</span>
          <h2 className={styles.sectionTitle}>Should You Go to Hokkaido Instead for the Snow Festival?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            If your trip falls in the first half of February, seriously consider it. The{" "}
            <strong>77th Sapporo Snow Festival runs 4 to 11 February 2027</strong> across three sites —
            Odori from West 1 to West 11, Susukino on Ekimae-dori between South 4 and South 6, and the
            Tsudome site — and all of it is free to walk into, which is the opposite of the
            Shirakawa-go light-up. What the festival requires instead is a bed and a flight, both of
            which go months ahead. This version keeps the Tokyo days and swaps the Hokuriku leg out.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Days", "What you do instead"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hokkaidoRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Festival dates and site boundaries from the Sapporo Snow Festival Executive Committee&apos;s
            own announcement of the 77th event, read on {CHECKED}; the same notice adds a Sapporo Snow
            Sports Park on 12 to 14 February 2027 as a linked event. Sapporo&apos;s February mean daily
            maximum of 0.4°C and January snowfall normal of 137 cm are the JMA figures above. One
            honest caveat: the rail route to Hokkaido is long, so most visitors fly — the JR East–South
            Hokkaido pass only earns its keep if you were going to use JR East heavily anyway.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={newChitoseSapporoSharedTransfer.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              New Chitose → Sapporo transfer →
            </KlookLink>
            <KlookLink href={sapporoSnowParkHalfDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Sapporo snow park half day →
            </KlookLink>
            <KlookLink href={jrEastSouthHokkaidoPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR East–South Hokkaido Pass →
            </KlookLink>
            <KlookLink href={nisekoResortShuttleBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Niseko airport shuttle →
            </KlookLink>
            <KlookLink href={rusutsuResortShuttleBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Rusutsu airport shuttle →
            </KlookLink>
          </div>
        </section>

        {/* Packing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Packing</span>
          <h2 className={styles.sectionTitle}>What Should You Pack for Japan in Winter?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Less than you think, and layered rather than thick. The reason is not the outdoor
            temperature but the indoor one: every train, shop and restaurant on this itinerary is heated
            hard, so a single heavy garment you cannot take off is a worse answer than three thin ones
            you can.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "Why, on this route"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Klook: what a winter trip buys before it flies. */}
        <KlookTripPrep
          heading="What Should You Book Before You Fly?"
          intro="Four things, in the order they matter for a winter trip: the data that carries the weather notices, the pass arithmetic, the pass that actually fits this route, and the Tokyo subway ticket the illumination corridor sits on."
          items={japanWinterTripPrep}
        />

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

        {/* Klook tours — the Hokkaido days, which have no home elsewhere on the site. */}
        <KlookTourPicks
          heading="Winter Days Out, If You Add Hokkaido"
          intro="Four winter-season departures out of Sapporo, for the February version of this trip. All of them are seasonal listings rather than year-round ones, which is the reason they are worth opening early rather than on the day."
          tours={[otaruSnowParkDayTour, asahiyamaZooWinterDayTour, lakeShikotsuIceFestivalHalfDayTour, sapporoSnowParkHalfDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 30 Oct 2026: the Snow Festival on its own, with the sites, hours and fares this page only summarises. */}
            <Link href="/guides/attractions/sapporo-snow-festival-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sapporo Snow Festival Tours (2027): 4–11 Feb, Free Sites</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-10-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/takayama-shirakawago-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20l9-14 9 14z" />
                  <path d="M8 20v-4h8v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Takayama and Shirakawa-go Tour (2026): Which Departure, and the Bus If You Go Alone</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-illumination-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6M10 21h4" />
                  <path d="M12 3a6 6 0 0 0-3 11.2V18h6v-3.8A6 6 0 0 0 12 3z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kanazawa" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kanazawa (2026): Kagayaki Times, Seats and Whether a Pass Pays</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18M7 15h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-ski-travel-insurance" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L6 7.2l4-.6z" />
                  <path d="M5 21h14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Insurance for Skiing in Japan (2026): Off-Piste, Rescue Costs and What Is Covered</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M10 21v-6h4v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c0-6 3-9 7-10-1 5-3 8-7 10z" />
                  <path d="M12 21c0-6-3-9-7-10 1 5 3 8 7 10z" />
                  <path d="M12 21V11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Botanical Garden Osaka Tickets: Prices &amp; Hours</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Settle the dated things first</h2>
            <p className={styles.ctaBannerDesc}>
              The Shirakawa-go light-up is four evenings in January 2027 and sells nothing at the door;
              the Kanazawa coach cannot be boarded without a reservation; the Kagayaki has no
              non-reserved car. Everything else on this itinerary can wait.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink
                href={shirakawagoLightUpTakayamaDayTour.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.ctaBannerBtn}
              >
                View the Shirakawa-go light-up day →
              </KlookLink>
              <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Check the Hokuriku Arch Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
