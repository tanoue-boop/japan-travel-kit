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
  hakoneFreepass,
  hakoneLoopBusTour,
  hiroshimaMiyajimaBusTourUrl,
  jrHarukaUrl,
  jrPassWholeJapan,
  kamakuraEnoshimaDayTourUrl,
  kawaguchikoYamanakakoBusTour,
  keiseiSkylinerUrl,
  klookEsim,
  kyotoHighlightBusTour,
  kyotoNaraKiyomizuTour,
  kyotoStayAreas,
  mtFujiPass,
  nankaiRapitUrl,
  naraDayTourUrl,
  naritaBusSubwayCombo,
  naritaExpressRoundTripUrl,
  osakaAmazingPass,
  osakaSkyVistaHalfDayBusTour,
  osakaStayAreas,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKyoto,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoMtFujiHighwayBus,
  tokyoSightseeingBusTour,
  tokyoStayAreas,
  tokyoSubwayTicket,
  tokyoTowerTicket,
  tsukijiCultureFoodTour,
  usjExpressPassUrl,
  usjStudioPassUrl,
} from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygShibuyaSky, gygTeamlabPlanets, gygUsjExpressPass } from "../../../lib/gyg-links";

/**
 * A fourteen-day Japan itinerary, written as a booking plan: fourteen dated day
 * headings, a table per day, and the Klook listings for that day's bookings directly
 * underneath it.
 *
 * Every ticket price on this page is read out of lib/attraction-prices.ts, which carries
 * the operator and the date each figure was checked. Four figures are this page's own and
 * are dated below (OWN_CHECKED, 22 Oct 2026): the JAPAN RAIL PASS prices off
 * japanrailpass.net, the Tokaido Shinkansen journey times off travel.jr-central.co.jp
 * (JR Central's own travel arm), Kinkaku-ji's admission and hours off shokoku-ji.jp, and
 * Kiyomizu-dera's gate hours off kiyomizudera.or.jp.
 *
 * What is deliberately absent is the single Tokyo–Kyoto shinkansen fare. JR Central
 * publishes its fare tables only as PDFs that could not be read on the date above, and
 * the figure moves with train type and season, so the page sends the reader to Smart EX
 * and to our own Tokyo-to-Kyoto guide rather than printing a number we could not verify.
 * No Klook price appears anywhere either: Klook answers automated reads of its product
 * pages with HTTP 403.
 *
 * The "time to allow" column throughout is our own planning allowance, labelled as such.
 */

/** The four figures this page checked itself. */
const OWN_CHECKED = "2026-10-22";
const OWN = checkedLabel(OWN_CHECKED);

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
  /** The day heading, as a reader scanning for "Day 9" would read it. */
  heading: string;
  intro: string;
  stops: Stop[];
  /** What to book for this day, in prose. */
  book: ReactNode;
  picks: Pick[];
};

type Leg = {
  label: string;
  title: string;
  intro: string;
  days: Day[];
};

const legs: Leg[] = [
  {
    label: "Days 1–5",
    title: "Days 1 to 5 — Tokyo, Five Nights",
    intro:
      "Tokyo is not one centre with suburbs around it; it is a string of centres along a loop line, and five nights is what it takes to see three of them without a forced march. Days 2, 3 and 4 each stay inside one side of the city, so the longest journey of any of them is a single Yamanote hop. Day 1 is the airport, and Day 5 is the day you spend however the first four leave you feeling.",
    days: [
      {
        n: 1,
        heading: "Day 1 — Arrival: the airport run, and nothing else",
        intro:
          "Plan this day as transport plus check-in and nothing more. Narita is an hour or more from the city, Haneda much less, and both land you with luggage at the exact hour the trains are busiest. The only thing worth doing after check-in is eating within walking distance of the hotel.",
        stops: [
          {
            time: "On landing",
            place: "Immigration, baggage, and getting your data working",
            allow: "1–1.5 hours",
            getting: "n/a",
            booking: "An eSIM activated before you fly — there is nothing to collect",
          },
          {
            time: "Afternoon or evening",
            place: "Airport to your Tokyo base",
            allow: "40 minutes to 1.5 hours depending on airport and base",
            getting: "Narita Express, Keisei Skyliner or a limousine bus; Keikyu or the monorail from Haneda",
            booking: "Worth booking — a reserved seat with luggage space beats a rush-hour local",
          },
          {
            time: "Evening",
            place: "Your own neighbourhood, on foot",
            allow: "2 hours",
            getting: "On foot",
            booking: "No",
          },
        ],
        book: (
          <>
            The airport leg and your data, both before you fly. Which Narita route suits you depends
            entirely on which side of the city you are staying — our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>{" "}
            works through all of them. The limousine bus is the one to pick with large cases or a
            hotel that is not beside a station, and Klook sells it bundled with the subway pass you
            want for Days 2 to 5.
          </>
        ),
        picks: [
          { label: "Narita Express round trip →", url: naritaExpressRoundTripUrl },
          { label: "Keisei Skyliner ticket →", url: keiseiSkylinerUrl },
          { label: "Narita bus + subway pass →", url: naritaBusSubwayCombo.url },
          { label: "See Klook eSIM options →", url: klookEsim.url },
        ],
      },
      {
        n: 2,
        heading: "Day 2 — West Tokyo: Harajuku, Shibuya and Shinjuku",
        intro:
          "Three Yamanote stops, finishing on a rooftop. This is Day 2 rather than Day 5 because it holds the slot most likely to be sold out — the SHIBUYA SKY sunset window — and a failed booking on Day 2 still has twelve days to move into.",
        stops: [
          {
            time: "Morning, from opening",
            place: "Meiji Jingu and the Harajuku approach",
            allow: "1–1.5 hours",
            getting: "JR Yamanote Line to Harajuku; the entrance is beside the station",
            booking: "No ticket — free, and open sunrise to sunset",
          },
          {
            time: "Late morning",
            place: "Takeshita Street and Omotesando",
            allow: "1.5 hours",
            getting: "On foot from the shrine",
            booking: "No",
          },
          {
            time: "Afternoon",
            place: "Shinjuku — the Metropolitan Government Building decks and Shinjuku Gyoen",
            allow: "2 hours",
            getting: "Yamanote Line from Harajuku",
            booking: "No — the Tocho decks charge nothing at all",
          },
          {
            time: "Late afternoon / sunset",
            place: "SHIBUYA SKY, on top of Shibuya Scramble Square",
            allow: "1–1.5 hours",
            getting: "Yamanote Line to Shibuya; the entrance is inside the station building",
            booking: "Yes — a timed slot, and sunset is the one that sells out",
          },
          {
            time: "Evening",
            place: "Shibuya backstreets, or back to Shinjuku for Omoide Yokocho",
            allow: "2–3 hours",
            getting: "On foot, or one Yamanote stop",
            booking: "No, unless you want a guided crawl",
          },
        ],
        book: (
          <>
            The Shibuya Sky slot, and the subway ticket if your Tokyo days look like these. Shibuya
            Sky is also the stop where the booking route matters as much as the ticket — the official
            site has rejected many foreign-issued cards since July 2024, which our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets guide</Link>{" "}
            covers in full. The free Metropolitan Government Building decks are the fallback if the
            slot has gone; our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">Tokyo observation decks comparison</Link>{" "}
            puts the four side by side.
          </>
        ),
        picks: [
          { label: "Check Shibuya Sky tickets →", url: shibuyaSkyTicketUrl },
          { label: "Check the Tokyo Subway Ticket →", url: tokyoSubwayTicket.url },
        ],
      },
      {
        n: 3,
        heading: "Day 3 — East Tokyo: Asakusa, Skytree and Toyosu",
        intro:
          "The old-town side, and the day with the one genuinely compulsory booking of the whole fortnight. Senso-ji's main hall opens at 06:00 — 06:30 from October to March — which makes an early start here cheaper in crowds than anywhere else in these fourteen days.",
        stops: [
          {
            time: "Early morning",
            place: "Senso-ji and Nakamise-dori, Asakusa",
            allow: "1.5–2 hours",
            getting: "Ginza Line or Toei Asakusa Line to Asakusa",
            booking: "No ticket — the main hall opens 06:00 (06:30 October–March)",
          },
          {
            time: "Late morning",
            place: "TOKYO SKYTREE, Floor 350 (and Floor 450 if the air is clear)",
            allow: "2 hours with Solamachi below it",
            getting: "One stop on the Tobu Skytree Line from Asakusa, or about 20 minutes on foot",
            booking: "Advised — the same-day counter adds a service fee per ticket",
          },
          {
            time: "Early afternoon",
            place: "Akihabara",
            allow: "2 hours",
            getting: "Toei Asakusa or Ginza Line, changing to the JR Sobu or Yamanote",
            booking: "No",
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
            place: "Toyosu, Ginza or Tsukishima for dinner",
            allow: "2 hours",
            getting: "Yurakucho Line from Toyosu",
            booking: "No",
          },
        ],
        book: (
          <>
            teamLab Planets, without exception — the entry window is 30 minutes, there is no counter
            at the museum, and the popular slots go weeks ahead. Our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets tickets guide</Link>{" "}
            also covers what to wear, because parts of it are walked barefoot through water. Skytree
            is worth booking for a different reason: the same-day counter adds a service fee per
            ticket, so buying ahead is cheaper rather than safer.
          </>
        ),
        picks: [
          { label: "Check teamLab Planets tickets →", url: teamlabPlanetsTicketUrl },
          { label: "Check TOKYO SKYTREE tickets →", url: skytreeTicket.url },
        ],
      },
      {
        n: 4,
        heading: "Day 4 — Central Tokyo: the Palace, Tsukiji and Tokyo Tower",
        intro:
          "The day with nothing compulsory in it. Tokyo Tower closes at 23:00 with last admission 22:30 — later than any other major deck in the city — so a slow afternoon here does not cost you the view.",
        stops: [
          {
            time: "Morning",
            place: "Imperial Palace East Gardens and the Marunouchi side of Tokyo Station",
            allow: "1.5–2 hours",
            getting: "Any line to Tokyo Station; the Marunouchi exit faces the palace",
            booking: "No ticket, but the gardens close on set days — check the week you go",
          },
          {
            time: "Late morning",
            place: "Ginza, plus Character Street inside Tokyo Station",
            allow: "1.5 hours",
            getting: "On foot, or one stop on the Marunouchi Line",
            booking: "No",
          },
          {
            time: "Early afternoon",
            place: "Tsukiji Outer Market",
            allow: "1.5 hours",
            getting: "Hibiya Line to Tsukiji or Oedo Line to Tsukijishijo",
            booking: "No — but most of it winds down by mid-afternoon",
          },
          {
            time: "Late afternoon into the evening",
            place: "Zojo-ji, Shiba Park and the Tokyo Tower Main Deck",
            allow: "2 hours for both",
            getting: "Toei Mita Line to Onarimon or Oedo Line to Daimon",
            booking: "Not needed for the Main Deck; only the Top Deck Tour is timed",
          },
        ],
        book: (
          <>
            Nothing, unless you want the Tokyo Tower Top Deck Tour, which is timed and sold
            separately from the Main Deck — our{" "}
            <Link href="/guides/attractions/tokyo-tower-tickets">Tokyo Tower tickets guide</Link> sets
            out the difference. The alternative is to stop planning this day altogether and hand it
            to a guided coach, which ties the Imperial Palace gardens, Asakusa and Skytree together
            with commentary.
          </>
        ),
        picks: [
          { label: "Tokyo Tower ticket →", url: tokyoTowerTicket.url },
          { label: "Tokyo sightseeing bus day tour →", url: tokyoSightseeingBusTour.url },
        ],
      },
      {
        n: 5,
        heading: "Day 5 — The Tokyo day you choose: a short day trip, or the city at half speed",
        intro:
          "By now you know how fast you move, which is the point of putting the flexible day fifth rather than first. Two honest options: a short day trip that is genuinely out and back — Kamakura is about an hour each way on a JR line a rail pass already covers — or a slow day in Tokyo built around something booked rather than something queued for.",
        stops: [
          {
            time: "Option A, all day",
            place: "Kamakura: Kotoku-in's Great Buddha, Hase-dera and the Enoden coast",
            allow: "6–8 hours door to door",
            getting: "JR Yokosuka or Shonan-Shinjuku Line from Tokyo or Shinjuku",
            booking: "No tickets needed — both temples are pay-at-the-gate",
          },
          {
            time: "Option B, morning",
            place: "A Tsukiji Outer Market food walk, or a kimono fitting in Asakusa",
            allow: "2–3 hours",
            getting: "Hibiya Line to Tsukiji, or Ginza Line to Asakusa",
            booking: "Yes — both are small-group or appointment-based",
          },
          {
            time: "Option B, afternoon",
            place: "Whatever Days 2 to 4 did not get to",
            allow: "Open",
            getting: "Yamanote or subway",
            booking: "No",
          },
          {
            time: "Evening, either way",
            place: "Repack — tomorrow you leave Tokyo with one night's luggage",
            allow: "1 hour",
            getting: "n/a",
            booking: "No",
          },
        ],
        book: (
          <>
            Only if you pick Option B: a food walk or a kimono appointment has a fixed start time and
            a small group, so the week before is the right moment. Kamakura needs no ticket at all —
            the fares and the two temple admissions are in our{" "}
            <Link href="/guides/attractions/kamakura-day-trip">Kamakura day trip guide</Link>. If you
            would rather not plan the day, the guided Kamakura-and-Enoshima coach does it for you.
          </>
        ),
        picks: [
          { label: "Kamakura & Enoshima day tour →", url: kamakuraEnoshimaDayTourUrl },
          { label: "Tsukiji culture & food tour →", url: tsukijiCultureFoodTour.url },
          { label: "Asakusa kimono rental →", url: asakusaKimonoYae.url },
        ],
      },
    ],
  },
  {
    label: "Day 6",
    title: "Day 6 — Out of Tokyo: One Night at Lake Kawaguchi or in Hakone",
    intro:
      "This is the single most skipped night in a two-week Japan trip and the one that changes it most. Mt. Fuji from a Tokyo day trip is a long coach day with the mountain often in cloud by the time you arrive; one night on the lake or in a Hakone onsen town gives you a morning, which is when the summit is clearest. Take an overnight bag and leave the big case at the Tokyo hotel or in a station locker.",
    days: [
      {
        n: 6,
        heading: "Day 6 — Tokyo to Kawaguchiko or Hakone, and a night there",
        intro:
          "Pick one. Kawaguchiko is the Fuji-viewpoint side — the lake, Oishi Park, the Chureito Pagoda. Hakone is the hot-spring side — a loop of boat, ropeway and mountain railway that one pass covers end to end, with Fuji across Lake Ashi if the weather plays along.",
        stops: [
          {
            time: "Morning",
            place: "Tokyo to Kawaguchiko (Option A)",
            allow: "About 1 hour 45 minutes by direct bus from Shinjuku",
            getting: "Fujikyu / Keio highway bus from Shinjuku, or the Fuji Excursion limited express",
            booking: "Yes for the bus — it is a reserved seat and it fills at weekends",
          },
          {
            time: "Morning",
            place: "Tokyo to Hakone (Option B)",
            allow: "Half a day including the first half of the loop",
            getting: "Odakyu line from Shinjuku to Hakone-Yumoto, then the loop",
            booking: "The Freepass, and a Romancecar seat if you want one — the surcharge is separate",
          },
          {
            time: "Afternoon",
            place: "Kawaguchiko: Oishi Park and the lake's north shore, or the Hakone loop",
            allow: "3–4 hours",
            getting: "Kawaguchiko sightseeing bus, or the Hakone loop itself",
            booking: "A pass rather than a ticket, in both cases",
          },
          {
            time: "Evening",
            place: "Your ryokan or hotel, and dinner there",
            allow: "Rest of the day",
            getting: "On foot or a short bus",
            booking: "Yes — one night, booked ahead; this is not a walk-in area",
          },
          {
            time: "Next morning, early",
            place: "The clear-summit window, before you travel on",
            allow: "1–2 hours",
            getting: "On foot",
            booking: "No",
          },
        ],
        book: (
          <>
            The seat out, the pass for once you are there, and the room. For Kawaguchiko, our{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko guide</Link>{" "}
            carries the bus and ropeway fares read off Fujikyu&apos;s own site, and our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">Mt. Fuji day trip guide</Link>{" "}
            covers the Mt. Fuji Pass, which is {PRICES.mtFujiPass.adult} for one day on the figures we
            checked. For Hakone, the Freepass runs {PRICES.hakoneFreepass.adult} for two days from
            Shinjuku and there is no one-day version at all —{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">the Hakone guide</Link>{" "}
            explains what the eight covered modes include and what they do not. If a coach day suits
            you better than a pass, the guided versions are compared in our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt. Fuji day tour comparison</Link>.
          </>
        ),
        picks: [
          { label: "Tokyo – Mt. Fuji highway bus →", url: tokyoMtFujiHighwayBus.url },
          { label: "Mt. Fuji Pass (1, 2 or 3 day) →", url: mtFujiPass.url },
          { label: "Kawaguchiko & Yamanakako bus tour →", url: kawaguchikoYamanakakoBusTour.url },
          { label: "Hakone Freepass →", url: hakoneFreepass.url },
          { label: "Hakone loop bus tour →", url: hakoneLoopBusTour.url },
        ],
      },
    ],
  },
  {
    label: "Day 7",
    title: "Day 7 — The Long Hop: Back Through Tokyo, and On to Kyoto",
    intro:
      "The one genuinely long travel day in the fortnight, and the one worth settling before you fly. Everything else on this itinerary is a city hop; this is 450 kilometres of Tokaido Shinkansen with a collection of luggage at each end.",
    days: [
      {
        n: 7,
        heading: "Day 7 — Kawaguchiko or Hakone to Kyoto by shinkansen",
        intro:
          "Give the whole day to it and you will arrive in Kyoto with an evening in hand. Come back into Tokyo or Shinjuku, pick up the case you left, and board the Tokaido Shinkansen at Tokyo or Shinagawa. On JR Central's own figures, checked " +
          OWN +
          ", the Nozomi reaches Kyoto in about 2 hours 15 minutes, the Hikari in about 2 hours 40 and the all-stops Kodama in about 3 hours 40.",
        stops: [
          {
            time: "Morning",
            place: "Last look at the mountain, then back towards Tokyo",
            allow: "2–3 hours",
            getting: "Highway bus or limited express to Shinjuku; Odakyu line from Hakone-Yumoto",
            booking: "The return seat, booked with the outbound one on Day 6",
          },
          {
            time: "Midday",
            place: "Collect luggage and cross to Tokyo or Shinagawa Station",
            allow: "1–1.5 hours",
            getting: "Yamanote or Chuo Line",
            booking: "No",
          },
          {
            time: "Early afternoon",
            place: "Tokaido Shinkansen to Kyoto",
            allow: "About 2 h 15 min (Nozomi), 2 h 40 min (Hikari), 3 h 40 min (Kodama)",
            getting: "Tokaido Shinkansen from Tokyo or Shinagawa",
            booking: "A reserved seat, especially in the oversized-baggage rows and in peak weeks",
          },
          {
            time: "Late afternoon",
            place: "Check in near Kyoto Station, Karasuma Oike or Gion",
            allow: "1 hour",
            getting: "Kyoto Station is the shinkansen terminus; subway or bus from there",
            booking: "Four nights, booked ahead",
          },
          {
            time: "Evening",
            place: "Pontocho and the Kamo riverbank, on foot",
            allow: "2–3 hours",
            getting: "Karasuma subway to Shijo, then on foot",
            booking: "No",
          },
        ],
        book: (
          <>
            The seat, and — before that — the decision about whether to buy a rail pass at all. The
            section below works that through against the official pass prices; the short version for
            this route is that a trip of Tokyo, one Fuji night, Kyoto and Osaka does not earn a
            whole-country pass. Fares and train types for this leg are in our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link>, and the
            break-even in our <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link>.
          </>
        ),
        picks: [
          { label: "Tokyo → Kyoto shinkansen tickets →", url: shinkansenTokyoKyoto.url },
          { label: "JAPAN RAIL PASS on Klook →", url: jrPassWholeJapan.url },
        ],
      },
    ],
  },
  {
    label: "Days 8–10",
    title: "Days 8 to 10 — Kyoto, Four Nights, With Nara in the Middle",
    intro:
      "Kyoto works the opposite way round from Tokyo. Almost nothing here needs a timed ticket; what it needs is an early start, because the famous temples are small and the coaches arrive at ten. Split the city east and west, give the third day to Nara, and the fourth night is simply what lets you do all that without a 06:00 alarm every morning.",
    days: [
      {
        n: 8,
        heading: "Day 8 — East Kyoto: Kiyomizu-dera at dawn, Gion, and Fushimi Inari",
        intro:
          "The one day of the fourteen where arriving early genuinely changes what you see. Kiyomizu-dera opens its gate at 06:00 — 18:00 close, 18:30 in July and August, on the temple's own figures checked " +
          OWN +
          " — and the approach streets below it are empty at seven and solid by ten.",
        stops: [
          {
            time: "From 06:00",
            place: "Kiyomizu-dera, then Sannenzaka and Ninenzaka downhill",
            allow: "2.5–3 hours",
            getting: "Bus 100 or 206 from Kyoto Station to Kiyomizu-michi, then uphill on foot",
            booking: "No — walk up and pay at the gate",
          },
          {
            time: "Late morning",
            place: "Yasaka Shrine, Maruyama Park and the Gion lanes",
            allow: "2 hours",
            getting: "On foot from Ninenzaka",
            booking: "No",
          },
          {
            time: "Afternoon",
            place: "Fushimi Inari Taisha and the torii path up the hill",
            allow: "1.5–3 hours, depending on how far up you go",
            getting: "Keihan line to Fushimi Inari, or JR Nara Line to Inari",
            booking: "No",
          },
          {
            time: "Evening",
            place: "Back to Gion or Kawaramachi for dinner",
            allow: "2 hours",
            getting: "Keihan line north",
            booking: "Only if you want a tea ceremony or a guided evening",
          },
        ],
        book: (
          <>
            Nothing, for the temples. The thing worth booking in Kyoto is an experience rather than an
            admission: a tea ceremony or a kimono fitting runs on appointments, and both are covered
            in our{" "}
            <Link href="/guides/attractions/tea-ceremony-japan">tea ceremony guide</Link> and our{" "}
            <Link href="/guides/attractions/kimono-rental-japan">kimono rental guide</Link>. If three
            temple days sounds like navigation rather than sightseeing, the one-day highlight coach
            below ties Kiyomizu-dera, Kinkaku-ji, Fushimi Inari and Arashiyama into a single guided
            day — which effectively compresses Days 8 and 9 into one.
          </>
        ),
        picks: [
          { label: "Kyoto one-day highlight bus tour →", url: kyotoHighlightBusTour.url },
          { label: "Kyoto & Nara day trip →", url: kyotoNaraKiyomizuTour.url },
        ],
      },
      {
        n: 9,
        heading: "Day 9 — West Kyoto: Arashiyama, the bamboo grove and Kinkaku-ji",
        intro:
          "The other half of the city, and the half that needs a bus rather than a walk. Kinkaku-ji is 09:00 to 17:00 every day of the year and costs ¥500 for adults and ¥300 for elementary and middle-school children on the temple's own figures, checked " +
          OWN +
          ". The bamboo grove in Arashiyama charges nothing and is best before nine.",
        stops: [
          {
            time: "Early morning",
            place: "Arashiyama: the bamboo grove, Togetsukyo bridge and Tenryu-ji",
            allow: "3 hours",
            getting: "JR Sagano Line to Saga-Arashiyama, or the Randen tram",
            booking: "No for the grove; Tenryu-ji charges at the gate",
          },
          {
            time: "Late morning",
            place: "The Sagano Romantic Train or the Hozugawa river boat, if you want one",
            allow: "1–2 hours",
            getting: "From Torokko Saga station, beside Saga-Arashiyama",
            booking: "Yes for the scenic railway in peak season — it is a reserved seat",
          },
          {
            time: "Afternoon",
            place: "Kinkaku-ji, the Golden Pavilion",
            allow: "1 hour",
            getting: "City bus 11 or 59 towards Kinkakuji-michi; about 40 minutes from Arashiyama",
            booking: "No — 09:00–17:00 daily, pay at the gate",
          },
          {
            time: "Late afternoon",
            place: "Ryoan-ji or Nijo Castle, whichever is still open",
            allow: "1–1.5 hours",
            getting: "Bus, or Tozai subway for Nijo",
            booking: "No",
          },
          {
            time: "Evening",
            place: "Nishiki Market's covered arcade and Karasuma for dinner",
            allow: "2 hours",
            getting: "Karasuma subway to Shijo",
            booking: "No",
          },
        ],
        book: (
          <>
            Only the scenic railway, and only in autumn and spring when it genuinely sells out. For
            getting around, Kyoto is a bus city with two subway lines through it — our{" "}
            <Link href="/guides/transport/kyoto-transportation">Getting Around Kyoto guide</Link> and
            our{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass">Kyoto subway and bus pass guide</Link>{" "}
            work out when a day pass beats single fares on a day shaped like this one.
          </>
        ),
        picks: [{ label: "Kyoto one-day highlight bus tour →", url: kyotoHighlightBusTour.url }],
      },
      {
        n: 10,
        heading: "Day 10 — Nara as a day trip from Kyoto",
        intro:
          "Well under an hour each way, which is what makes Nara the easiest day trip in Kansai and the reason it belongs here rather than being cut. Nara Park and the deer cost nothing; Todai-ji's Great Buddha Hall is " +
          PRICES.todaiji.adult +
          " for adults and " +
          PRICES.todaiji.child +
          " for children aged 6 to 12, and that single fee is the thing guided tours differ on including.",
        stops: [
          {
            time: "Morning",
            place: "Kyoto to Nara",
            allow: "Under an hour each way",
            getting: "Kintetsu limited express to Kintetsu-Nara, or JR Nara Line to JR Nara",
            booking: "No — turn up and buy, or tap in with an IC card",
          },
          {
            time: "Late morning",
            place: "Nara Park and the deer",
            allow: "1.5 hours",
            getting: "On foot from Kintetsu-Nara",
            booking: "Free",
          },
          {
            time: "Midday",
            place: "Todai-ji and the Great Buddha Hall",
            allow: "1.5 hours",
            getting: "On foot through the park",
            booking: "No — pay at the hall",
          },
          {
            time: "Afternoon",
            place: "Kasuga Taisha's lantern avenue and the Naramachi lanes",
            allow: "2 hours",
            getting: "On foot",
            booking: "No",
          },
          {
            time: "Evening",
            place: "Back in Kyoto",
            allow: "1 hour travel",
            getting: "Kintetsu or JR",
            booking: "No",
          },
        ],
        book: (
          <>
            Nothing, if you go independently — which is the honest recommendation for Nara, because
            the train is short and nothing there sells a timed ticket. Our{" "}
            <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link> has the official
            Todai-ji figures and the routes from both Kyoto and Osaka. A guided version makes sense
            only if you want Kyoto and Nara stitched into one day, which is what the tours below
            actually sell — our{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka">Kyoto and Nara day tour comparison</Link>{" "}
            sets out which of them covers which half of Kyoto.
          </>
        ),
        picks: [
          { label: "Kyoto & Nara day trip →", url: naraDayTourUrl },
          { label: "Kyoto & Nara: Kiyomizu-dera and Fushimi Inari →", url: kyotoNaraKiyomizuTour.url },
        ],
      },
    ],
  },
  {
    label: "Days 11–14",
    title: "Days 11 to 14 — Osaka, Three Nights, and the Flight Home From Kansai",
    intro:
      "Osaka is a 15-minute shinkansen hop or a 30-minute local train from Kyoto, which makes the move trivial and the reason to make it simple: Kansai Airport is far easier to reach from Osaka than from Kyoto, and Osaka rewards a city pass more than any other Japanese city. Three nights also gives you room for one more long day trip without wrecking the departure.",
    days: [
      {
        n: 11,
        heading: "Day 11 — Kyoto to Osaka: the Castle, Dotonbori and the pass that pays",
        intro:
          "A short hop and then a day that a single pass covers almost entirely. The Osaka Amazing Pass is " +
          PRICES.osakaAmazingPass.adult +
          " for one day and ¥3,300 for two on the figures we checked, and it bundles unlimited Osaka Metro and city buses with more than 40 free admissions — which is a genuinely different proposition from a Tokyo subway ticket.",
        stops: [
          {
            time: "Morning",
            place: "Kyoto to Osaka, and drop the bags",
            allow: "15–45 minutes depending on the train",
            getting: "Shinkansen to Shin-Osaka, or JR Special Rapid / Hankyu / Keihan to central Osaka",
            booking: "No — this is a turn-up-and-go leg",
          },
          {
            time: "Late morning",
            place: "Osaka Castle and the park around it",
            allow: "2–2.5 hours",
            getting: "Osaka Loop Line to Osakajokoen, or Tanimachi subway",
            booking: "No — the keep is on the Amazing Pass",
          },
          {
            time: "Afternoon",
            place: "Shinsekai and Tsutenkaku, or the Umeda Sky Building",
            allow: "2 hours",
            getting: "Midosuji Line",
            booking: "No — both are on the Amazing Pass",
          },
          {
            time: "Evening",
            place: "Dotonbori, Kuromon Market and the Namba arcades",
            allow: "3 hours",
            getting: "Midosuji Line to Namba",
            booking: "Only for a river cruise or a guided food crawl",
          },
        ],
        book: (
          <>
            The pass, and only if your Osaka day looks like this one. Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link>{" "}
            works the break-even against single admissions and names the two attractions everyone
            assumes are on it that are not — Universal Studios Japan being one, which matters for Day
            12. Getting around is covered in our{" "}
            <Link href="/guides/transport/osaka-transportation">Getting Around Osaka guide</Link>.
          </>
        ),
        picks: [
          { label: "Osaka Amazing Pass (1-day / 2-day) →", url: osakaAmazingPass.url },
          { label: "Osaka Sky Vista double-decker bus →", url: osakaSkyVistaHalfDayBusTour.url },
        ],
      },
      {
        n: 12,
        heading: "Day 12 — Universal Studios Japan, or Osaka at ground level",
        intro:
          "The one day in the fortnight that is a whole-day commitment to a single ticket, and the one you should decide on before you book anything else in Osaka. USJ has not sold same-day tickets at the gate since May 2025, and Super Nintendo World needs timed entry on top of park admission.",
        stops: [
          {
            time: "From opening",
            place: "Universal Studios Japan (Option A)",
            allow: "A full day — 10 hours is normal",
            getting: "JR Yumesaki Line to Universal-city, about 15 minutes from Osaka Station",
            booking: "Required — a dated Studio Pass, plus timed entry for Super Nintendo World",
          },
          {
            time: "Morning",
            place: "Kaiyukan aquarium and the bay (Option B)",
            allow: "3 hours",
            getting: "Chuo Line to Osakako",
            booking: "No, but note it is not on the Amazing Pass either",
          },
          {
            time: "Afternoon",
            place: "Shinsaibashi's covered arcade, Amerikamura and Nakazakicho (Option B)",
            allow: "3–4 hours",
            getting: "Midosuji Line",
            booking: "No — and the arcade is the rainy-day answer in Osaka",
          },
          {
            time: "Evening",
            place: "Umeda for the rooftop and dinner",
            allow: "2–3 hours",
            getting: "Midosuji Line to Umeda",
            booking: "No",
          },
        ],
        book: (
          <>
            If it is Option A, everything: the Studio Pass itself, and then the Express Pass only if
            you have decided the queues are worth paying to skip. Our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets and Express Pass guide</Link>{" "}
            explains the Studio Pass tiers and when the Express Pass actually earns its price —
            and{" "}
            <Link href="/guides/attractions/things-to-do-osaka">our Osaka round-up</Link> covers what
            the city pass does and does not reach.
          </>
        ),
        picks: [
          { label: "USJ Studio Pass →", url: usjStudioPassUrl },
          { label: "USJ Express Pass →", url: usjExpressPassUrl },
        ],
      },
      {
        n: 13,
        heading: "Day 13 — Optional: Hiroshima and Miyajima, or a last slow day",
        intro:
          "This is the day the fourteen-night trip buys you, and it is also the day most worth cutting if the previous twelve have been full. Hiroshima and Miyajima in one day from Osaka is possible and long; the honest arithmetic is in our day-trip guide, and the alternative — Kobe, Himeji, or simply Osaka at half speed — is not a lesser day.",
        stops: [
          {
            time: "Early morning",
            place: "Osaka to Hiroshima by Sanyo Shinkansen (Option A)",
            allow: "Most of a long day door to door",
            getting: "Sanyo Shinkansen from Shin-Osaka",
            booking: "A reserved seat both ways, bought the day before at the latest",
          },
          {
            time: "Midday",
            place: "Peace Memorial Park, the Dome and the museum",
            allow: "2.5–3 hours",
            getting: "Hiroshima tram from the station",
            booking: "No — pay at the museum entrance",
          },
          {
            time: "Afternoon",
            place: "Miyajima: Itsukushima Shrine and the floating torii",
            allow: "3 hours including the ferry",
            getting: "JR Sanyo Line to Miyajimaguchi, then the ferry",
            booking: "No — but check the tide table, which matters more than the ticket",
          },
          {
            time: "All day",
            place: "Option B: Kobe, Himeji Castle, or nothing in particular in Osaka",
            allow: "Half a day to a full day",
            getting: "JR Special Rapid west from Osaka",
            booking: "No",
          },
          {
            time: "Evening",
            place: "Back in Osaka; repack for the airport",
            allow: "2 hours",
            getting: "Shinkansen or JR",
            booking: "Tomorrow's airport train, if you have not already",
          },
        ],
        book: (
          <>
            The seats, if you go — and read the timings first. Our{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip">Hiroshima and Miyajima day trip guide</Link>{" "}
            gives the straight answer on whether one day is enough from Kansai, with Itsukushima
            Shrine&apos;s {PRICES.itsukushima.adult} admission and the {PRICES.miyajimaRopeway.adult}{" "}
            Mt. Misen ropeway fare. A guided coach version removes the two connections that make the
            day fragile.
          </>
        ),
        picks: [
          { label: "Hiroshima & Miyajima bus tour →", url: hiroshimaMiyajimaBusTourUrl },
        ],
      },
      {
        n: 14,
        heading: "Day 14 — Flying home from Kansai (or back to Tokyo)",
        intro:
          "Leave from Kansai if your ticket allows it. Namba to Kansai Airport is about 40 minutes with no transfer on the Nankai Rapi:t, and Tennoji is 30 minutes on the JR Haruka — which is why the itinerary ends in Osaka rather than looping back to Narita. If your return flight is from Tokyo, move the shinkansen to the evening of Day 13 and spend the last night near a Tokyo airport line instead.",
        stops: [
          {
            time: "Morning",
            place: "Last tax-free shopping, or breakfast at Kuromon Market",
            allow: "1–2 hours",
            getting: "On foot from Namba",
            booking: "No — but the refund has to be done before baggage check-in",
          },
          {
            time: "Midday",
            place: "Osaka to Kansai Airport",
            allow: "About 40 minutes from Namba, about 30 from Tennoji",
            getting: "Nankai Rapi:t from Namba, or JR Haruka from Tennoji or Shin-Osaka",
            booking: "Worth booking — a reserved seat with luggage space",
          },
          {
            time: "At the airport",
            place: "Check-in, tax-free customs confirmation, security",
            allow: "Allow 3 hours before an international departure",
            getting: "n/a",
            booking: "No",
          },
        ],
        book: (
          <>
            The airport leg, the night before at the latest. Which of the two trains suits you is a
            question of where you slept — our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Nankai Rapi:t comparison</Link>{" "}
            puts them side by side, and our{" "}
            <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer guide</Link>{" "}
            adds the Itami routes. If you are claiming consumption tax back on the shopping of the
            last fortnight, our{" "}
            <Link href="/guides/money/tax-free-shopping-japan">tax-free shopping guide</Link> explains
            the order the airport wants it done in.
          </>
        ),
        picks: [
          { label: "JR Haruka ticket →", url: jrHarukaUrl },
          { label: "Nankai Rapi:t ticket →", url: nankaiRapitUrl },
        ],
      },
    ],
  },
];

/** The route at a glance — nights per base, which is the decision behind everything else. */
const nightsRows = [
  {
    base: "Tokyo",
    nights: "5 nights (Days 1–5)",
    why: "Three districts at one day each, an airport day, and one flexible day. Four nights works if you drop the flexible day.",
    moving: "—",
  },
  {
    base: "Lake Kawaguchi or Hakone",
    nights: "1 night (Day 6)",
    why: "A morning at the mountain, which a Tokyo day trip cannot give you. The single highest-value night in the fortnight.",
    moving: "About 1 h 45 min from Shinjuku to Kawaguchiko by direct bus",
  },
  {
    base: "Kyoto",
    nights: "4 nights (Days 7–10)",
    why: "East Kyoto, west Kyoto and a Nara day trip, plus the arrival evening. Three nights works if you cut Nara.",
    moving: "About 2 h 15 min Tokyo–Kyoto on the Nozomi",
  },
  {
    base: "Osaka",
    nights: "3 nights (Days 11–13)",
    why: "A pass day, a USJ day or a second Osaka day, and one optional long day trip — then a short run to Kansai Airport.",
    moving: "15–45 minutes from Kyoto, depending on the train",
  },
];

/** Official transport and admission prices only. No hotel or food figures anywhere. */
const budgetRows = [
  {
    item: "JAPAN RAIL PASS, 14-day Ordinary (adult)",
    price: "¥80,000 bought online, ¥84,000 as an overseas Exchange Order",
    used: "Optional — and on this route, almost certainly not worth it. See the section below.",
    source: "japanrailpass.net",
    checked: OWN_CHECKED,
  },
  {
    item: "Tokyo Subway Ticket (24 / 48 / 72 hour)",
    price: `${PRICES.tokyoSubwayTicket.adult} / ¥1,500 / ¥2,000 adult`,
    used: "Days 2–5. Covers Tokyo Metro and Toei but not JR, including the Yamanote Line.",
    source: PRICES.tokyoSubwayTicket.source,
    checked: PRICES.tokyoSubwayTicket.checked,
  },
  {
    item: "Mt. Fuji Pass",
    price: `${PRICES.mtFujiPass.adult} for 1 day (2 day ¥10,200 / 3 day ¥12,400)`,
    used: "Day 6, Kawaguchiko option. Covers buses and trains around the Fuji Five Lakes, not the trip out of Tokyo.",
    source: PRICES.mtFujiPass.source,
    checked: PRICES.mtFujiPass.checked,
  },
  {
    item: "Hakone Freepass, 2-day from Shinjuku",
    price: `${PRICES.hakoneFreepass.adult} adult (3-day ¥7,500)`,
    used: "Day 6, Hakone option. No 1-day version exists, and the Romancecar surcharge is extra.",
    source: PRICES.hakoneFreepass.source,
    checked: PRICES.hakoneFreepass.checked,
  },
  {
    item: "Osaka Amazing Pass",
    price: `${PRICES.osakaAmazingPass.adult} for 1 day (2-day ¥3,300)`,
    used: "Day 11. Unlimited Osaka Metro and city buses plus 40-plus admissions; not USJ or Kaiyukan.",
    source: PRICES.osakaAmazingPass.source,
    checked: PRICES.osakaAmazingPass.checked,
  },
  {
    item: "SHIBUYA SKY",
    price: `${PRICES.shibuyaSky.adult} online, ${PRICES.shibuyaSky.atDoor} at the door`,
    used: "Day 2, sunset slot.",
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
    used: "Day 3. The one compulsory booking of the fortnight.",
    source: PRICES.teamlabPlanets.source,
    checked: PRICES.teamlabPlanets.checked,
  },
  {
    item: "Tokyo Tower, Main Deck",
    price: `${PRICES.tokyoTower.adult} adult, ${PRICES.tokyoTower.child} child`,
    used: "Day 4. Same price at the door, open to 23:00.",
    source: PRICES.tokyoTower.source,
    checked: PRICES.tokyoTower.checked,
  },
  {
    item: "Tokyo Metropolitan Government Building decks",
    price: PRICES.tochoDeck.adult,
    used: "Day 2. No ticket of any kind.",
    source: PRICES.tochoDeck.source,
    checked: PRICES.tochoDeck.checked,
  },
  {
    item: "Kinkaku-ji, Kyoto",
    price: "¥500 adult (high school and above), ¥300 elementary and middle school",
    used: "Day 9. Open 09:00–17:00 every day of the year.",
    source: "shokoku-ji.jp",
    checked: OWN_CHECKED,
  },
  {
    item: "Todai-ji Great Buddha Hall, Nara",
    price: `${PRICES.todaiji.adult} adult, ${PRICES.todaiji.child} child`,
    used: "Day 10. Nara Park and the deer are free; this is the fee tours differ on.",
    source: PRICES.todaiji.source,
    checked: PRICES.todaiji.checked,
  },
  {
    item: "Itsukushima Shrine, Miyajima",
    price: `${PRICES.itsukushima.adult} adult, ${PRICES.itsukushima.child} child`,
    used: "Day 13, optional.",
    source: PRICES.itsukushima.source,
    checked: PRICES.itsukushima.checked,
  },
  {
    item: "Miyajima Ropeway, round trip",
    price: `${PRICES.miyajimaRopeway.adult} adult, ${PRICES.miyajimaRopeway.child} child`,
    used: "Day 13, optional — the single most expensive item on a Miyajima day.",
    source: PRICES.miyajimaRopeway.source,
    checked: PRICES.miyajimaRopeway.checked,
  },
  {
    item: "Hiroshima Peace Memorial Museum",
    price: `${PRICES.peaceMuseum.adult} adult, ${PRICES.peaceMuseum.child} child`,
    used: "Day 13, optional. The Peace Memorial Park and the Dome cost nothing.",
    source: PRICES.peaceMuseum.source,
    checked: PRICES.peaceMuseum.checked,
  },
];

const bookingWindow = [
  {
    title: "Book before you fly (weeks out)",
    desc: "teamLab Planets, because entry is a 30-minute slot with no walk-up counter. The SHIBUYA SKY sunset window, which is the one slot of its day that sells out. The USJ Studio Pass and Super Nintendo World timed entry, since USJ stopped selling at the gate in May 2025. The Day 6 room at Kawaguchiko or in Hakone, because that is a small town rather than a city. And the arrival airport transfer, because the one queue you cannot plan around is the one you join after a long flight.",
  },
  {
    title: "Book a few days out",
    desc: "The Day 7 shinkansen seat — reserved, and in an oversized-baggage row if you are carrying a large case — plus the Hiroshima seats on Day 13 if you go. Tokyo Skytree, where booking ahead is simply cheaper than the same-day counter. The Sagano scenic railway in Arashiyama during autumn colour and cherry blossom. Any small-group food tour, tea ceremony or kimono appointment.",
  },
  {
    title: "Do not bother booking",
    desc: "Senso-ji, Meiji Jingu, the Scramble Crossing, Tsukiji Outer Market, the Imperial Palace East Gardens, the free Metropolitan Government Building decks, the Tokyo Tower Main Deck, Kiyomizu-dera, Fushimi Inari, Kinkaku-ji, Nara Park, Todai-ji, Osaka Castle and the Dotonbori streets. None of them sell a timed ticket, and almost all of Kyoto and Nara is in this column — which is the single most useful thing to know about planning the second week.",
  },
];

const faqItems = [
  {
    q: "How do you spend 2 weeks in Japan?",
    a: "Four bases, not seven: Tokyo for five nights, one night at Lake Kawaguchi or in Hakone, Kyoto for four nights with a Nara day trip inside them, and Osaka for three before flying home from Kansai. That gives you one long travel day — the Tokaido Shinkansen on Day 7 — and keeps every other day inside one city. The common mistake in a 14-day Japan itinerary is adding a fifth and sixth base, which converts sightseeing days into packing days.",
  },
  {
    q: "Is 14 days enough for Japan?",
    a: "For the Tokyo–Kyoto–Osaka corridor plus a Fuji night and two day trips, 14 days is comfortable rather than tight — this itinerary has a flexible day on Day 5 and an optional one on Day 13, which is the margin that makes it survive a rainy morning or a missed train. What 14 days does not stretch to is adding Hokkaido, Kanazawa or Kyushu on top. Those are a second trip, or a swap: drop Osaka's optional day trip and the Fuji night and you can reach one of them, at the cost of the things this plan is built around.",
  },
  {
    q: "Is the JR Pass worth it for 2 weeks in Japan?",
    a: `Not on this route. The 14-day Ordinary JAPAN RAIL PASS is ¥80,000 bought online and ¥84,000 as an overseas Exchange Order on the official prices we checked ${OWN}. This itinerary's long-distance travel is one Tokyo–Kyoto run, a short Kyoto–Osaka hop and — optionally — a return to Hiroshima, which does not come close to that figure. A pass earns its price when you are moving between regions every second or third day, not when you are living in four cities. Our JR Pass guide works the break-even through properly, and it is also worth knowing that the pass does not cover the Nozomi without a supplementary ticket issued only to pass holders, so a pass would push you onto the slower Hikari for the Day 7 leg.`,
  },
  {
    q: "How do you get from Tokyo to Kyoto?",
    a: `The Tokaido Shinkansen from Tokyo or Shinagawa Station. On JR Central's own figures, checked ${OWN}, the Nozomi reaches Kyoto in about 2 hours 15 minutes, the Hikari in about 2 hours 40 and the all-stops Kodama in about 3 hours 40. We do not print a single fare here: JR Central publishes its fare tables as PDFs we could not read on that date, and the figure moves with train type and season — so check your own date on Smart EX, on Klook's Tokyo-to-Kyoto rail page, or read the fare comparison in our Tokyo to Kyoto guide. Book a reserved seat rather than turning up, especially if you are carrying a large case: oversized baggage rows are limited and are reserved separately.`,
  },
  {
    q: "How many days should you spend in Tokyo, Kyoto and Osaka?",
    a: "Five, four and three on a fourteen-day trip, in that order of priority. Tokyo needs the most because it is three separate day-sized districts; Kyoto needs four nights only because one of them is spent in Nara; Osaka needs three because one day may go entirely to Universal Studios Japan. If you have to cut a night, cut Tokyo's flexible Day 5 before you cut anything in Kyoto — and do not cut the Day 6 night out of the city, because that is the one that is hard to replace.",
  },
  {
    q: "What needs booking in advance on a 14-day Japan itinerary?",
    a: "Fewer things than most plans assume. Genuinely compulsory: teamLab Planets (a 30-minute entry slot, no walk-up counter), the USJ Studio Pass with Super Nintendo World timed entry, and your Day 6 room outside the cities. Strongly advised: the SHIBUYA SKY sunset slot, the Day 7 shinkansen seat, and the airport transfers at both ends. Everything in Kyoto and Nara on Days 8 to 10 is walk-in. The booking-window table above sorts the whole fortnight into those three columns.",
  },
  {
    q: "Where should you stay for 2 weeks in Japan?",
    a: "Beside a station that is also an interchange, in each of the four bases — which with four bases matters more than the room does. In Tokyo that means Shinjuku, Tokyo Station / Marunouchi or the Ueno and Asakusa side; in Kyoto, Kyoto Station, Karasuma Oike or Gion; in Osaka, Umeda or Namba. The three sections above list those areas with why each one works for the days on this plan, and link Klook's hotel search for each.",
  },
  {
    q: "How much does 2 weeks in Japan cost in tickets and transport?",
    a: "On the official prices in the table above, the city passes and admissions this plan actually uses — the 72-hour Tokyo Subway Ticket, Shibuya Sky, Skytree, teamLab Planets, Tokyo Tower, Kinkaku-ji, Todai-ji and a one-day Osaka Amazing Pass — come to ¥15,400 for one adult. That excludes long-distance rail, the Day 6 pass, the optional Day 13 trip, and anything to do with hotels or food, none of which we quote figures for. Every row in that table is the operator's own published price with the date we read it.",
  },
  {
    q: "Should you fly home from Kansai or go back to Tokyo?",
    a: "From Kansai, if your ticket allows it — the itinerary ends in Osaka for exactly that reason. Namba to Kansai Airport is about 40 minutes with no transfer on the Nankai Rapi:t, and Tennoji is 30 minutes on the JR Haruka. Flying back out of Tokyo costs you most of Day 13 on a train plus a Tokyo night, which is a real price to pay for a cheaper fare. If your return is fixed to Tokyo, move the shinkansen to the evening of Day 13 and sleep near a Narita or Haneda line.",
  },
  {
    q: "Is 2 weeks in Japan too much with children?",
    a: "No, but four bases might be. With children the version that works is three bases rather than four — fold the Day 6 night into Tokyo as a day trip, and spend the extra night in Osaka, where Universal Studios Japan, Kaiyukan and the covered arcades are all short train rides apart. Cut the number of stops per day rather than the number of days, and put the timed ticket in the morning. Child rates are published for most of the ticketed stops on this plan and are in the table above.",
  },
  {
    q: "What do you do on a rainy day?",
    a: "Each city has one. In Tokyo it is teamLab Planets and the Skytree's Solamachi complex, both entirely indoors; in Kyoto it is Nishiki Market's covered arcade and the Kyoto Railway Museum; in Osaka it is the Shinsaibashi arcade, which runs for most of a kilometre into Dotonbori under cover. The one thing weather genuinely ruins is a rooftop deck and the Day 6 mountain view, which is the argument for booking Shibuya Sky through a route that lets you move the slot.",
  },
  {
    q: "Do you need a Japanese eSIM for two weeks?",
    a: "You need data, and for 14 days an eSIM is the simplest way to have it: every timed ticket on this plan is a QR code in an inbox, and every \"getting there\" column above assumes you can open a map. Activate it before you fly rather than queueing at an airport counter. Our two-week eSIM comparison ranks the plans by what 14 days of data actually costs.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/japan-14-day-itinerary") } });

const TITLE = "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day";
const DESC =
  "A Japan 14-day itinerary for 2 weeks in Japan: Tokyo 5 nights, Kawaguchiko or Hakone 1, Kyoto 4 with Nara, Osaka 3 — a table per day for time, transport and bookings, plus official prices with the date each was checked.";
const ROUTE = "/guides/attractions/japan-14-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

export default function Japan14DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Japan 14-Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Japan 14-Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan 14-Day Itinerary (2026):<br />2 Weeks in Japan, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            Four bases, one long train, and three bookings that are genuinely compulsory. A table for
            each of the fourteen days, and the listings for that day underneath it.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Day 1 to Day 14 tables", "Official prices, dated"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>The route</p>
                <p className={styles.verdictStatValue}>Tokyo → Fuji or Hakone → Kyoto → Osaka</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nights per base</p>
                <p className={styles.verdictStatValue}>5 / 1 / 4 / 3, then fly from Kansai</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must book ahead</p>
                <p className={styles.verdictStatValue}>teamLab Planets, USJ, the Day 6 room</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass?</p>
                <p className={styles.verdictStatValue}>No — four cities, not four regions</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a workable Japan 14-day itinerary uses four bases, not seven.
              Five nights in Tokyo covers the west, east and central thirds of the city with a
              flexible day left over; one night at Lake Kawaguchi or in Hakone buys you a morning at
              the mountain that no day trip can; four nights in Kyoto cover east Kyoto, west Kyoto and
              a Nara day trip; three in Osaka cover a pass day, a Universal Studios Japan day and one
              optional long day trip before a 30-to-40-minute run out to Kansai Airport. The only long
              travel day is Day 7 — about 2 hours 15 minutes Tokyo to Kyoto on the Nozomi, on JR
              Central&apos;s own figures checked {OWN}. Three bookings genuinely cannot be left: teamLab
              Planets, the USJ Studio Pass, and the Day 6 room. And the 14-day Ordinary JAPAN RAIL PASS,
              at ¥80,000 online on the official price checked {OWN}, does not pay for itself on a route
              like this one.
            </p>
            <KlookLink
              href={jrPassWholeJapan.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Compare rail passes on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Route overview */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Do You Split 2 Weeks in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By nights, before anything else. Every other decision in a fourteen-day plan follows from
            how many bases you check into, because each extra base costs you a morning of packing and
            an afternoon of travelling — and four is where that arithmetic stops paying. Here is the
            split this itinerary uses, and what each base is actually for.
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
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.nights}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.moving}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            What this guide does differently is treat the fortnight as a booking problem rather than a
            sightseeing list. Most of Japan is walk-in — all of Kyoto and Nara on Days 8 to 10 is —
            and the handful of things that are not will quietly decide your schedule if you let them.
            So each of the fourteen days below carries its own table: time of day, where, how long to
            allow, how you get there, and whether it needs booking. The listings for that day&apos;s
            bookings sit directly underneath it.
          </p>
          <p className={styles.bodyText}>
            If your trip is shorter, our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> is the
            first five days of this plan compressed into three, and the city round-ups for{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">Tokyo</Link>,{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">Kyoto</Link> and{" "}
            <Link href="/guides/attractions/things-to-do-osaka">Osaka</Link> each list what to book
            ahead in that city and what to simply walk into.
          </p>
        </section>

        {/* Day 1 to Day 14 */}
        {legs.map((leg) => (
          <section key={leg.title} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{leg.label}</span>
            <h2 className={styles.sectionTitle}>{leg.title}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "2rem" }}>{leg.intro}</p>

            {leg.days.map((day) => (
              <div key={day.n} style={{ marginBottom: "2.75rem" }}>
                <h3 className={styles.pickName} style={{ marginBottom: "0.75rem" }}>{day.heading}</h3>
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
              </div>
            ))}
          </section>
        ))}

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          The &ldquo;time to allow&rdquo; column in all fourteen tables is our own planning allowance,
          not an operator figure. Opening hours and prices are in the dated table further down, each
          against the operator&apos;s own site.
        </p>

        {/* The long hop — rail pass decision */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Long-distance travel</span>
          <h2 className={styles.sectionTitle}>Do You Need a JR Pass for a 14-Day Japan Itinerary?</h2>
          <p className={styles.bodyText}>
            Almost certainly not, on this route — and that is worth settling before you book anything
            else, because it decides whether you buy single tickets or a pass. The official 14-day
            Ordinary JAPAN RAIL PASS is <strong>¥80,000</strong> bought online and{" "}
            <strong>¥84,000</strong> as an overseas Exchange Order for an adult; the Green car
            versions are ¥110,000 and ¥116,000. Child prices are half the adult ones at every length.
            Those figures were read off japanrailpass.net on {OWN}.
          </p>
          <p className={styles.bodyText}>
            Set that against what this itinerary actually spends on long-distance rail: one Tokyo to
            Kyoto run on Day 7, a short Kyoto to Osaka hop on Day 11, and — if you take it — a
            Hiroshima return on Day 13. A whole-country pass is built for travellers who move between
            regions every second or third day. Four cities in fourteen days is the opposite shape of
            trip, and the pass has a second catch for exactly this leg: it does not cover the Nozomi
            without a supplementary ticket issued only to pass holders, so a pass would put you on the
            slower Hikari on Day 7 anyway.
          </p>
          <p className={styles.bodyText}>
            <strong>On the train itself.</strong> On JR Central&apos;s own figures, checked {OWN}, Tokyo
            to Kyoto is about <strong>2 hours 15 minutes</strong> on the Nozomi,{" "}
            <strong>2 hours 40 minutes</strong> on the Hikari and about{" "}
            <strong>3 hours 40 minutes</strong> on the all-stops Kodama. We deliberately do not print a
            single fare: JR Central publishes its fare tables only as PDF price lists that could not be
            read on that date, and the figure moves with the train type and the season in any case.
            Check your own date on the official Smart EX site, or on Klook&apos;s Tokyo-to-Kyoto rail
            page, and read the fare-by-fare comparison in our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link>. The full
            break-even arithmetic for passes of every length is in our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link>, and our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers seat types
            and the oversized-baggage rules that matter when you are moving house for a fortnight.
          </p>
          <p className={styles.bodyText}>
            <strong>What actually sells out, and what you can change.</strong> Shinkansen seats rarely
            sell out outside Golden Week, Obon and New Year — but the oversized-baggage rows do, and
            they are reserved separately, which is the one reservation a two-week traveller with a
            large case should not leave to the platform. Regional passes are the middle option if you
            do add Hiroshima: they cost less than the whole-country pass and cover the Sanyo leg. Cancellation
            is the other half of the decision — a rail pass bought through a reseller has its own
            refund window, so read it before the Day 7 date is fixed.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen on Klook →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Where to stay — three cities */}
        <KlookStayAreas
          heading="Where to Stay in Tokyo for the First Five Nights"
          intro="With five nights and two timed tickets, the base that costs you least is the one on the Yamanote loop that is also a subway interchange. These three are picked on that basis — Shinjuku for the Day 2 side of the city, Ueno and Asakusa for Day 3, Tokyo Station for Day 4 and for the Day 7 shinkansen."
          areas={tokyoStayAreas}
        />

        <KlookStayAreas
          heading="Where to Stay in Kyoto for Days 7 to 10"
          intro="Kyoto is a bus city with two subway lines through it, so the base decides how much of each morning you spend waiting. Kyoto Station is where the sightseeing bus routes start and where the Day 7 shinkansen puts you down; Karasuma Oike is the one point both subway lines cross; Gion puts Day 8 within walking distance."
          areas={kyotoStayAreas}
        />

        <KlookStayAreas
          heading="Where to Stay in Osaka for the Last Three Nights"
          intro="All three of these sit on the Midosuji Line, which is the line Days 11 and 12 run on. Namba is also the Nankai terminus, so the Day 14 airport run starts under your hotel; Umeda is the better base if you are connecting back to the shinkansen instead."
          areas={osakaStayAreas}
        />

        {/* Budget */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; passes</span>
          <h2 className={styles.sectionTitle}>What Does 2 Weeks in Japan Cost in Tickets and Transport?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Less than most people expect for the sightseeing, and more than they expect for the one
            long train. Every figure below is an operator&apos;s own published price with the site it
            was read off and the date it was read. There are no hotel or food figures here at all,
            deliberately: those move by season, city and party size, and an invented average is worse
            than none.
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Added up, the admissions and city passes this plan actually uses — a 72-hour Tokyo Subway
            Ticket, Shibuya Sky online, Skytree Floor 350, teamLab Planets, the Tokyo Tower Main Deck,
            Kinkaku-ji, Todai-ji and a one-day Osaka Amazing Pass — come to{" "}
            <strong>¥15,400 for one adult</strong> across the fortnight. That is the whole sightseeing
            bill, and it is smaller than one leg of the shinkansen. It excludes long-distance rail, the
            Day 6 pass, the optional Day 13 trip, and anything to do with beds or meals.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm at booking. The JAPAN RAIL PASS and Kinkaku-ji rows were read
            off japanrailpass.net and shokoku-ji.jp on {OWN}; every other row carries the date from our
            own guide for that ticket, and the ticketed stops appear with the same figures in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>. For a wider view of what a trip costs beyond tickets, see our{" "}
            <Link href="/guides/money/japan-travel-budget" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan travel budget guide
            </Link>.
          </p>
        </section>

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>What Needs Booking in Advance, and What Does Not?</h2>
          <p className={styles.bodyText}>
            Three things in fourteen days genuinely cannot be left, and that is the single most useful
            thing to know before you start planning. Here is the whole fortnight sorted by how far
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
            <strong>Cancellation, and why the route you book through matters.</strong> Over fourteen
            days something will move: a typhoon warning, a cold, a train that is late enough to cost
            you a slot. The bookings worth making through a route that lets you change or cancel are
            the dated ones — the timed decks, teamLab, USJ and the Day 6 room — rather than the
            walk-in temples, which carry no risk at all. That is also the practical argument for Klook
            on the timed tickets specifically: it checks out in English, takes foreign cards that the
            official Shibuya Sky site has rejected since July 2024, and keeps all fourteen days on one
            account. Read the cancellation terms on each listing before the date is fixed; they differ
            by product, and we do not restate them here because they change.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets on Klook →
            </KlookLink>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shibuya Sky on Klook →
            </KlookLink>
            <KlookLink href={usjStudioPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              USJ Studio Pass on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTourPicks
          heading="If You Would Rather Hand a Day to Somebody Else"
          intro="Four of the fourteen days above work as a guided coach instead of a plan of your own — the Fuji or Hakone day, either Kyoto day, and the Nara day. Klook blocks automated price reads, so open a listing for the figure on your own date."
          tours={[kyotoHighlightBusTour, kawaguchikoYamanakakoBusTour, kyotoNaraKiyomizuTour, osakaAmazingPass]}
        />

        {/* Second seller for the 2% and 0% tickets on this page */}
        <GygCompare
          slug="japan-14-day-itinerary"
          heading="If a Timed Slot or a Park Date Has Already Gone"
          intro="Fourteen days absorbs most problems, but not a sold-out teamLab Planets slot, a Shibuya Sky sunset that went weeks ago, or a USJ date with no Express Pass left — reordering the days still leaves you needing the ticket. All three are sold on GetYourGuide as well."
          listings={[gygTeamlabPlanets, gygShibuyaSky, gygUsjExpressPass]}
        />

        {/* Is 14 days enough */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Is fourteen enough?</span>
          <h2 className={styles.sectionTitle}>Is 14 Days Enough for Japan?</h2>
          <p className={styles.bodyText}>
            For this corridor, yes — comfortably. Two weeks is the first trip length where you can do
            Tokyo properly, see Mt. Fuji with a morning rather than an afternoon, give Kyoto the early
            starts it wants, fit Nara in, and still have a spare day at each end of the second week.
            The margin matters more than the mileage: Day 5 and Day 13 are both deliberately soft, and
            that is what lets a rained-off rooftop or a missed connection cost you an afternoon instead
            of a plan.
          </p>
          <p className={styles.bodyText}>
            What fourteen days does not stretch to is a fifth region. Hokkaido, Kanazawa, the Japanese
            Alps and Kyushu are all genuinely good and all genuinely far, and adding one means dropping
            either the Fuji night or Osaka&apos;s third night plus the Day 13 trip. If you are tempted,
            make it a swap rather than an addition — and price the rail for it honestly first, because
            that is the scenario where a pass starts to make sense and this one does not.
          </p>
          <p className={styles.bodyText}>
            One last thing that is not a sight: data. Fourteen days of it is cheap, every timed ticket
            on this plan arrives as a QR code, and every &ldquo;getting there&rdquo; column above
            assumes a map.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/japan-esim-2-weeks">eSIM for two weeks in Japan guide</Link>{" "}
            ranks the plans at exactly this trip length, and our{" "}
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
            <Link href="/guides/attractions/takayama-shirakawago-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 21V12l6-6 6 6v9" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Takayama and Shirakawa-go Tour (2026): Which Departure, and the Bus If You Go Alone</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/ghibli-park-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ghibli Park Tickets (2026): Prices, When They Go On Sale and How to Buy From Overseas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/legoland-japan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="16" height="11" rx="2" />
                  <path d="M8 9V6h8v3M9 13h.01M15 13h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?</p>
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
            <Link href="/guides/attractions/himeji-castle-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V9l3-2 4 2 4-2 3 2v12" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Himeji Castle Day Trip (2026): ¥2,500 Admission, and Times From Osaka &amp; Kyoto</p>
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
            <Link href="/guides/attractions/hakone-free-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Free Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
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
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <line x1="3" y1="11" x2="21" y2="11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide (2026): Is the Japan Rail Pass Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18" />
                  <path d="M6 17V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v9" />
                  <line x1="6" y1="11" x2="18" y2="11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Shinkansen, Bus or Flight</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10l8-6 8 6" />
                  <path d="M6 10v9h12v-9" />
                  <line x1="3" y1="21" x2="21" y2="21" />
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
                  <rect x="4" y="8" width="16" height="12" rx="2" />
                  <path d="M9 8V5a3 3 0 0 1 6 0v3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c3 3 4 6 4 9a4 4 0 0 1-8 0c0-3 1-6 4-9z" />
                  <line x1="12" y1="21" x2="12" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 9h8M8 13h8M12 9v8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget (2026): What a Trip Actually Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-2-weeks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for 2 Weeks in Japan (2026): Plans and Prices Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Settle the three bookings that cannot wait</h2>
            <p className={styles.ctaBannerDesc}>
              teamLab Planets, the USJ Studio Pass and the Day 6 room outside the cities are the only
              three bookings in fourteen days that can break this plan, and all three go weeks ahead.
              Klook checks out in English, takes foreign cards the official sites sometimes reject, and
              keeps the whole fortnight on one account.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Book the timed tickets on Klook →
              </KlookLink>
              <GygCompareButton slug="japan-14-day-itinerary" listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
