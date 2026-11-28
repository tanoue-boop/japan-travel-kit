import Head from "next/head";
import NextStepCards from "../../../components/NextStepCards";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { jrHarukaUrl, klookEsim, klookLink, luggageDeliveryCards, nankaiRapitUrl, osakaAirportArrivalPrep, osakaAirportStayAreas, osakaStayAreas } from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { pocketWifi } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Rebuilt 6 Nov 2026 around the answer (task jtk-20261106-05): the page lands on
 * how-do-I-get-there questions, so the first body paragraph answers them and every
 * heading is the question.
 *
 * Read on 6 November 2026:
 *   westjr.co.jp          HARUKA One-way Ticket: ¥1,600 Tennoji, ¥1,900 Osaka/Shin-Osaka,
 *                         ¥2,700 Kyoto, child half; foreign passport plus Temporary
 *                         Visitor status; cannot be bought inside Japan.
 *   nankai.co.jp          Rapi:t minimum 34 min, Airport Express about 45 min; express
 *                         ticket ¥700 / ¥350 (+¥300 onboard, -¥150 ticketless); Digital
 *                         Ticket ¥1,410 / ¥710, Super Seat ¥1,590 / ¥910.
 *   kate.co.jp            Kansai Airport limousine buses, timetables and the midnight
 *                         bus notice; the Nankai Namba midnight bus is suspended.
 *   osaka-monorail.co.jp  Osaka-Airport to Hotarugaike ¥200, about 3 min.
 *
 * Read through the search index on the same date, because the sites refuse automated
 * reads (HTTP 403 or a certificate error):
 *   kansai-airport.or.jp  Haruka times, first and last trains, taxi table, 20% surcharge.
 *   okkbus.co.jp          Itami to Umeda ¥650, 25–30 min; Itami to Shin-Osaka ¥510, 25 min.
 *   osaka-airport.co.jp   Itami stop 9 to Osaka Station, about 30 minutes.
 *
 * Not confirmed from an operator, so deliberately not stated: Nankai's ordinary fare,
 * Nankai's last train and the regular Haruka fare. Klook prices are never quoted.
 *
 * Re-read 23 Nov 2026 (task jtk-20261123-R05), the destination x mode table:
 *   westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/
 *     HARUKA One-way Ticket unchanged: Tennoji ¥1,600, Osaka / Shin-Osaka ¥1,900, Kyoto ¥2,700.
 *   nankai.co.jp/en_railway/ticket/rapit   Rapi:t Digital Ticket ¥1,410 / ¥1,590, unchanged.
 *   nankai.co.jp/en_railway/rapit          minimum 34 min KIX to Namba.
 *   nankai.co.jp/traffic/kix.html          Rapi:t about 38 min, Airport Express about 44 min.
 *   kansai-airport.or.jp/en/access/from-airport/train
 *     Haruka: Tennoji about 30, Shin-Osaka about 50, Kyoto about 75 min. Kansai Airport
 *     Rapid: Tennoji about 45, Osaka about 65 min. Airport Express to Namba about 43 min.
 *   kansai-airport.or.jp/explorekansai/osaka/21821 (Kansai Airport's own article)
 *     Kansai Airport Rapid to Osaka Station ¥1,210, about 65–70 min, no express ticket,
 *     an IC card is enough; Haruka 47 min to Osaka Station, last about 22:16.
 *   kate.co.jp/en/timetable/detail/{OC,UM,UH,KY,ITM}  bus fares, times and last buses
 *     unchanged (OCAT ¥1,400 / 50 min, Osaka Sta. ¥1,800 / 60 min, Kyoto ¥2,800, ITM ¥2,200).
 *   okkbus.co.jp/en/timetable/U/ and /N/ (search index; certificate error on fetch)
 *     Itami to Umeda ¥650, 25–30 min; Itami to Namba ¥650, about 30 min (stand 10).
 *   westjr.co.jp/global/en/howto/icoca/    ICOCA usable on railways and buses across Japan;
 *     visitor ICOCA ¥2,000 incl. ¥500 deposit at the JR ticket office, Kansai-airport Station.
 *   klook.com/activity/15418 (search index)  private KIX transfer, priced per car.
 * Nankai's ordinary fare still not stated: only a 2023 fare-search result was readable.
 */
const CHECKED = checkedLabel("2026-11-23");
const TAXI_CHECKED = checkedLabel("2026-11-06");

const ROUTE = "/guides/transport/osaka-airport-transfer";
const PAGE_URL = `https://www.japan-travel-kit.com${ROUTE}`;
const TITLE = "Osaka Airport Transfer 2026: Train vs Bus from KIX & Itami";
const DESCRIPTION =
  "Osaka airport transfer (Nov 2026): KIX to Namba by Rapi:t ¥1,410 in 34 min, Umeda by JR Rapid ¥1,210 or Haruka ¥1,900, bus from ¥1,400, Itami ¥650.";

const OFFICIAL_SOURCES = [
  { name: "JR West, HARUKA One-way Ticket", url: "https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/" },
  { name: "Nankai, Rapi:t Digital Ticket", url: "https://www.nankai.co.jp/en_railway/ticket/rapit" },
  { name: "Kansai Airport, trains", url: "https://www.kansai-airport.or.jp/en/access/from-airport/train" },
  { name: "Kansai Airport Transportation, bus fares", url: "https://www.kate.co.jp/en/timetable/" },
  { name: "Osaka Airport Transport, Itami buses", url: "https://www.okkbus.co.jp/en/timetable/U/" },
];

/** Klook's private KIX transfer (listing 15418), priced per car; the page's ad id is applied by KlookLink. */
const kixPrivateTransferUrl = klookLink("https://www.klook.com/en-US/activity/15418-private-kansai-international-airport-transfers-osaka/");

/** The answer table: one row per route, cheapest and fastest confirmed option. Row 0 is the verdict. */
const answerRows = [
  { route: "Verdict", cheapest: "Namba: bus ¥1,400 · Umeda: JR Rapid ¥1,210 · Itami: bus ¥650", fastest: "Namba: Rapi:t · Umeda, Shin-Osaka, Kyoto: Haruka", luggage: "Limousine Bus, or a private car for a group" },
  { route: "KIX → Namba",                cheapest: "Limousine Bus to OCAT, ¥1,400, about 50 min", fastest: "Nankai Rapi:t, ¥1,410, from 34 min", luggage: "Limousine Bus to OCAT" },
  { route: "KIX → Umeda (Osaka Station)", cheapest: "JR Kansai Airport Rapid, ¥1,210, about 65–70 min", fastest: "JR Haruka, ¥1,900, about 45–50 min", luggage: "Limousine Bus, ¥1,800, about 60 min" },
  { route: "KIX → Shin-Osaka",           cheapest: "JR Haruka, ¥1,900, about 50 min", fastest: "JR Haruka, ¥1,900, about 50 min", luggage: "JR Haruka (direct, no change)" },
  { route: "KIX → Kyoto",                cheapest: "JR Haruka, ¥2,700, about 75 min", fastest: "JR Haruka, ¥2,700, about 75 min", luggage: "Limousine Bus, ¥2,800, about 1 hr 25–30 min" },
  { route: "Itami → Umeda",              cheapest: "Limousine Bus, ¥650, about 25–30 min", fastest: "Limousine Bus, ¥650, about 25–30 min", luggage: "Limousine Bus" },
  { route: "Itami → Namba",              cheapest: "Limousine Bus, ¥650, about 30 min", fastest: "Limousine Bus, ¥650, about 30 min", luggage: "Limousine Bus" },
  { route: "KIX → Itami",                cheapest: "Direct Limousine Bus, ¥2,200, about 70–75 min", fastest: "Direct Limousine Bus, ¥2,200, about 70–75 min", luggage: "Direct Limousine Bus" },
];

const modeRows = [
  { mode: "Verdict", best: "Train for Namba, Umeda and Kyoto; bus for heavy luggage or Itami; private car for a group or a late flight", price: "—", note: "Your hotel's station decides more than the fare." },
  { mode: "Train (Rapi:t, Haruka, JR Rapid)", best: "Speed and a fixed journey time", price: "¥1,210–¥2,700 one way", note: "No traffic. The Rapi:t and Haruka need a seat ticket; the JR Rapid and Nankai Airport Express do not." },
  { mode: "Limousine Bus", best: "Big suitcases, hotels near a bus stop", price: "¥1,400–¥2,800 one way", note: "Bags go in the hold, every passenger is seated, no reservation from the airport; times run longer in traffic." },
  { mode: "Private transfer (Klook)", best: "Families, groups, door to door", price: "Priced per car on Klook", note: "Booked before you fly, so the driver meets the flight. Compare the per-car price with the per-person train fares." },
  { mode: "Metered taxi", best: "After the last train and bus", price: `About ¥24,400 with tolls to Kita-ku (${TAXI_CHECKED})`, note: "Kansai Airport's fare page adds 20% between 22:00 and 5:00." },
];

const kixLimousineUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265375&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F18203-kansai-airport-one-way-transfer-osaka%2F";

const ninjaWifi = pocketWifi("ninja-wifi");

const arrivalPrep = [
  ...osakaAirportArrivalPrep.slice(0, 1),
  {
    label: "Pocket WiFi for airport pickup",
    why: "An alternative to the eSIM for a group or an older phone. It is collected and returned at an airport counter, and counter hours can bind an early or late flight.",
    ctaLabel: "Check the WiFi rental →",
    url: ninjaWifi.affiliateUrl,
  },
  ...osakaAirportArrivalPrep.slice(1),
  luggageDeliveryCards.osakaAirportTransfer,
];

const kixOptions = [
  { option: "Nankai Rapi:t to Namba",           time: "34–38 min",          price: "¥1,410 Digital Ticket",  bestFor: "Namba, Dotonbori" },
  { option: "Nankai Airport Express to Namba",  time: "About 43–44 min",    price: "Ordinary fare only",     bestFor: "Namba with no seat ticket" },
  { option: "JR Haruka to Tennoji",             time: "About 30 min",       price: "¥1,600 discounted",      bestFor: "Tennoji, Abeno" },
  { option: "JR Haruka to Osaka Station",       time: "About 45–50 min",    price: "¥1,900 discounted",      bestFor: "Umeda" },
  { option: "JR Kansai Airport Rapid to Osaka Station", time: "About 65–70 min", price: "¥1,210",           bestFor: "Umeda on a budget, ICOCA" },
  { option: "JR Haruka to Shin-Osaka",          time: "About 50 min",       price: "¥1,900 discounted",      bestFor: "Shinkansen connections" },
  { option: "Limousine Bus to Namba (OCAT)",    time: "About 50 min",       price: "¥1,400",                 bestFor: "Heavy luggage, Namba" },
  { option: "Limousine Bus to Osaka Station",   time: "About 60 min",       price: "¥1,800",                 bestFor: "Heavy luggage, Umeda" },
  { option: "Limousine Bus to Uehommachi",      time: "About 55 min",       price: "¥1,800",                 bestFor: "Uehommachi, Shinsaibashi" },
  { option: "Private transfer (Klook)",         time: "Door to door",       price: "Per car, see Klook",     bestFor: "Families, groups" },
  { option: "Metered taxi to Kita-ku, Osaka",   time: "About 50 min",       price: "About ¥24,400 with tolls", bestFor: "Groups, door to door" },
];

const fareRows = [
  { route: "Kansai Airport → Namba",           service: "Rapi:t Digital Ticket, Regular Seat",  adult: "¥1,410", child: "¥710",   source: "Nankai" },
  { route: "Kansai Airport → Namba",           service: "Rapi:t Digital Ticket, Super Seat",    adult: "¥1,590", child: "¥910",   source: "Nankai" },
  { route: "Kansai Airport → Osaka Station",   service: "JR Kansai Airport Rapid, ordinary ticket or ICOCA", adult: "¥1,210", child: "—", source: "Kansai Airport" },
  { route: "Kansai Airport → Tennoji",         service: "HARUKA One-way Ticket",                adult: "¥1,600", child: "¥800",   source: "JR West" },
  { route: "Kansai Airport → Osaka, Shin-Osaka", service: "HARUKA One-way Ticket",              adult: "¥1,900", child: "¥950",   source: "JR West" },
  { route: "Kansai Airport → Kyoto",           service: "HARUKA One-way Ticket",                adult: "¥2,700", child: "¥1,350", source: "JR West" },
];

const itamiBusRows = [
  { item: "One-way fare",            value: "¥2,200 adult, ¥1,100 child" },
  { item: "Round trip",              value: "¥4,000 adult, valid for 14 days" },
  { item: "Journey time",            value: "About 1 hr 10 min to 1 hr 15 min, Itami to Terminal 1" },
  { item: "From KIX Terminal 1",     value: "8 buses a day: 7:30, 8:50, 10:00, 11:00, 12:00, 14:50, 17:50, 19:10" },
  { item: "From Osaka (Itami) Airport", value: "9 buses a day: 7:00, 8:10, 10:40, 11:40, 12:40, 14:40, 15:40, 17:40, 20:20" },
  { item: "Reservations",            value: "None taken, first come first served" },
  { item: "Itami stand",             value: "Departs from stand 5" },
];

const itmOptions = [
  { option: "Limousine Bus to Umeda",        time: "About 25–30 min", price: "¥650",            bestFor: "Umeda hotels, Osaka Station" },
  { option: "Limousine Bus to Namba",        time: "About 30 min",    price: "¥650",            bestFor: "Namba, Dotonbori (stand 10)" },
  { option: "Limousine Bus to Shin-Osaka",   time: "About 25 min",    price: "¥510",            bestFor: "Shinkansen connections" },
  { option: "Monorail to Hotarugaike, then Hankyu", time: "About 3 min on the monorail", price: "¥200 monorail, Hankyu fare extra", bestFor: "Rail all the way to Umeda" },
];

const kyotoRows = [
  { option: "JR Haruka",              time: "About 75 min",               price: "¥2,700 discounted one-way", note: "Direct to Kyoto Station" },
  { option: "Limousine Bus",          time: "About 1 hr 25 min to 1 hr 30 min", price: "¥2,800",             note: "To Kyoto Station Hachijo Exit" },
];

const lateRows = [
  { option: "JR Haruka",                     last: "About 22:16 from KIX",   note: "Reaches Osaka Station at about 23:03." },
  { option: "Limousine Bus to Namba (OCAT)", last: "About 21:25, Terminal 1", note: "¥1,400." },
  { option: "Limousine Bus to Kyoto",        last: "About 23:20, Terminal 1", note: "¥2,800." },
  { option: "Limousine Bus to Osaka Station", last: "23:45, Terminal 1",     note: "¥1,800, the last bus at the normal fare." },
  { option: "Midnight bus to Osaka Station", last: "24:15, Terminal 1",      note: "¥2,700 adult, ¥1,350 child. Cashless only, about 60 min, and no extra bus runs if it is full." },
  { option: "Midnight bus to Nankai Namba",  last: "Suspended",              note: "Kansai Airport Transportation lists this route as not running." },
  { option: "Taxi",                          last: "All night",              note: "Kansai Airport's fare page adds 20% between 22:00 and 5:00." },
];

const harukaVsRapitRows = [
  { feature: "Operator",           haruka: "JR West",                                   rapit: "Nankai (private rail)" },
  { feature: "One-way fare",       haruka: "¥1,900 Osaka or Shin-Osaka, ¥2,700 Kyoto (discounted)", rapit: "¥1,410 (Digital Ticket)" },
  { feature: "Journey time",       haruka: "Tennoji 30, Osaka 45–50, Shin-Osaka 50, Kyoto 75 min", rapit: "From 34 min to Namba" },
  { feature: "Covered by JR Pass", haruka: "Yes",                                       rapit: "No" },
  { feature: "Kansai Area Pass",   haruka: "Non-reserved seats covered",                rapit: "No" },
  { feature: "Direct to",          haruka: "Tennoji, Osaka, Shin-Osaka, Kyoto",         rapit: "Namba" },
  { feature: "Discount option",    haruka: "HARUKA One-way Ticket",                     rapit: "Rapi:t Digital Ticket" },
];

const destinationRows = [
  { dest: "Namba (Dotonbori, Shinsaibashi)", pick: "Nankai Rapi:t", note: "From 34 min direct, with no change of train." },
  { dest: "Umeda / Osaka Station", pick: "Haruka", note: "About 45 min direct. The limousine bus is about 60 min." },
  { dest: "Tennoji",        pick: "Haruka", note: "About 30 min direct on the JR Haruka." },
  { dest: "Shin-Osaka",     pick: "Haruka", note: "About 50 min direct, for a Shinkansen connection." },
  { dest: "Uehommachi",     pick: "Limousine Bus", note: "About 55 min with no train change, ¥1,800." },
  { dest: "Kyoto",          pick: "Haruka", note: "About 75 min direct, no transfer (¥2,700 discounted one-way, or covered by a JR Pass)." },
];

const harukaPoints = [
  {
    title: "Covered by the JR Pass",
    desc: "The Haruka is operated by JR West and is covered by the Japan Rail Pass. Pass holders can reserve a seat at the JR ticket office at Kansai-airport Station, which JR West lists as open from 5:30am to 11:00pm.",
  },
  {
    title: "Direct connections to Osaka, Kyoto and Shin-Osaka",
    desc: "The Haruka runs directly from Kansai Airport to Tennoji (about 30 min), Osaka Station (about 45–50 min), Shin-Osaka (about 50 min) and Kyoto (about 75 min). If you are continuing to Kyoto or boarding the Shinkansen at Shin-Osaka, you stay in one seat the whole way.",
  },
  {
    title: "A discounted one-way ticket for foreign visitors",
    desc: "JR West's HARUKA One-way Ticket is for holders of a foreign passport entering Japan as a Temporary Visitor. JR West says it cannot be bought inside Japan, so arrange it before you fly. An ICOCA card is a separate purchase from the ticket machines at the station.",
  },
  {
    title: "Runs every 30 to 40 minutes through the day",
    desc: "Kansai Airport lists one train every 30 to 40 minutes from 9am to 8pm and one an hour outside those hours. The first departure is about 6:31am on weekdays and 6:40am on weekends and holidays, and the last is about 10:16pm.",
  },
];

const rapiTPoints = [
  {
    title: "Fastest connection to Namba",
    desc: "Nankai states a minimum of 34 minutes between Kansai Airport and Namba. Namba is the station for Dotonbori and Shinsaibashi, and one of Osaka's two main hubs alongside Umeda.",
  },
  {
    title: "Not covered by the JR Pass",
    desc: "The Rapi:t runs on the Nankai private railway, not JR, so a JR Pass does not cover it. Nankai sells a Rapi:t Digital Ticket that combines the train fare and the express ticket for one chosen date, and it can be refunded in the app until five minutes before departure if unused.",
  },
  {
    title: "Two seat classes, one journey time",
    desc: "Every Rapi:t rider needs a limited express ticket on top of the train fare: ¥700 adult for a Regular Seat or ¥910 for a Super Seat, plus ¥300 if you buy onboard or ¥150 less through Nankai's ticketless service. Both classes are on the same train, so a Super Seat buys more room, not a faster trip.",
  },
];

const tips = [
  {
    title: "KIX is on an artificial island, so factor in extra time",
    desc: "Kansai International Airport is built on a reclaimed island off the Osaka coast, and every road and rail journey crosses the same bridge. Leave extra time when you return for a departing flight.",
  },
  {
    title: "Check which terminal you land at",
    desc: "Limousine buses stop at Terminal 2 first and then Terminal 1, about 15 minutes later. The times in this guide are Terminal 1 times, so a Terminal 2 arrival should board earlier.",
  },
  {
    title: "Buy an ICOCA at the station",
    desc: "ICOCA is the local Kansai IC card. JR West says it is sold from the ticket machines at Kansai-airport Station, and that credit cards cannot be used to buy one, so keep some cash for it.",
  },
  {
    title: "JR Pass users: take the Haruka",
    desc: "If you hold a JR Pass and are heading to Osaka, Kyoto or Shin-Osaka, the Haruka is covered. Reserve a seat at the JR office at the station on arrival, because a Rapi:t ticket is a separate cost for pass holders.",
  },
  {
    title: "ITM is much closer to the city than KIX",
    desc: "Itami Airport (ITM) handles domestic flights only and sits north of central Osaka. The limousine bus to Umeda takes about 25 to 30 minutes, so a connection from a domestic flight into the city is short.",
  },
];

const faqItems = [
  {
    q: "What is the cheapest way from Kansai Airport to Osaka?",
    a: "To Umeda (Osaka Station), the JR Kansai Airport Rapid is ¥1,210 for an adult in about 65 to 70 minutes, with no seat ticket and ICOCA accepted. To Namba, the limousine bus to OCAT is ¥1,400 in about 50 minutes, ¥10 under the ¥1,410 Rapi:t Digital Ticket. The Nankai Airport Express needs only Nankai's ordinary fare and takes about 43 to 44 minutes.",
  },
  {
    q: "How much is the train from KIX to Namba?",
    a: "Nankai's Rapi:t Digital Ticket is ¥1,410 for an adult (¥710 child) in a Regular Seat and ¥1,590 in a Super Seat, fare and limited express ticket together, from 34 minutes. The Nankai Airport Express needs only the ordinary fare and takes about 43 to 44 minutes. The Rapi:t is not covered by a JR Pass.",
  },
  {
    q: "Train vs bus vs private transfer from Kansai Airport: which is best?",
    a: "The train is best for Namba (Rapi:t), Umeda, Shin-Osaka and Kyoto (Haruka): ¥1,210 to ¥2,700 with a fixed journey time. The limousine bus is best with big suitcases, at ¥1,400 to Namba and ¥1,800 to Osaka Station. A private transfer booked on Klook is priced per car, so it pays off for a family or group going door to door.",
  },
  {
    q: "How do I get from KIX to Itami?",
    a: "Take the direct limousine bus: about 1 hour 10 to 15 minutes from Terminal 1 and ¥2,200 for an adult (¥4,000 return within 14 days). There are 8 departures a day from Terminal 1 and 9 from Itami, with no reservations taken, so check the times against your flight.",
  },
  {
    q: "Can I use ICOCA from Kansai Airport?",
    a: "Yes. ICOCA pays the fare on the JR Kansai Airport Rapid and on Nankai trains, and JR West says it works on railways and buses across Japan. The Haruka and the Rapi:t still need a seat ticket on top. A visitor ICOCA costs ¥2,000 including a ¥500 deposit at the JR ticket office at Kansai-airport Station.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/osaka-airport-transfer") } });

export default function OsakaAirportTransferPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={PAGE_URL} />
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Osaka Airport Transfer", item: "https://www.japan-travel-kit.com/guides/transport/osaka-airport-transfer" },
              ],
            }),
          }}
        />
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
              updated,
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Osaka Airport Transfer</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Airport Transfer 2026: <br />Train vs Bus from KIX &amp; Itami
          </h1>
          <p className={styles.heroSubtitle}>
            The cheapest and the fastest ride from Kansai and Itami to Namba, Umeda, Shin-Osaka and Kyoto, in one table.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Destination × mode table", "Train vs bus vs private car"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* The answer, in the first body paragraph */}
        <p className={styles.bodyText}>
          <strong>Kansai Airport (KIX) to Namba is the Nankai Rapi:t, from 34 minutes and ¥1,410</strong> on
          Nankai&apos;s Rapi:t Digital Ticket. <strong>To Umeda (Osaka Station), the JR Kansai Airport Rapid costs
          ¥1,210 in about 65 to 70 minutes, or the JR Haruka ¥1,900 in about 45 to 50 minutes</strong> on JR
          West&apos;s one-way for foreign visitors, with no change of train either way. <strong>With heavy luggage,
          the limousine bus goes direct for ¥1,400 to Namba (OCAT) and ¥1,800 to Osaka Station.</strong>
        </p>
        <p className={styles.bodyText}>
          For Kyoto the Haruka is ¥2,700 in about 75 minutes; from Itami the bus to Umeda or Namba is ¥650 in about 30
          minutes, and the KIX–Itami bus is ¥2,200. Adult one-way fares from JR West, Nankai, Kansai Airport, Kansai
          Airport Transportation and Osaka Airport Transport, checked {CHECKED}.
        </p>

        {/* Destination x mode answer table */}
        <section className={styles.comparisonSection} id="by-destination">
          <span className={styles.sectionLabel}>Destination × mode</span>
          <h2 className={styles.sectionTitle}>Which is the best way from the airport to my part of Osaka?</h2>
          <p className={styles.bodyText}>
            Read across your destination&apos;s row: the cheapest confirmed option, the fastest, and the one with least
            effort for big suitcases. The first row is the short answer.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Cheapest", "Fastest", "Heavy luggage"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {answerRows.map((row, i) => (
                    <tr key={row.route} style={i === 0 ? { fontWeight: 700 } : undefined}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td className={styles.tdPrice}>{row.cheapest}</td>
                      <td>{row.fastest}</td>
                      <td>{row.luggage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-23. Adult one-way fares; Haruka fares are JR West&apos;s HARUKA One-way Ticket for
            foreign passport holders on Temporary Visitor status, which cannot be bought inside Japan. Bus times are from
            Terminal 1 and run longer in traffic. Sources:{" "}
            {OFFICIAL_SOURCES.map((s, i) => (
              <span key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
                {i < OFFICIAL_SOURCES.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            What should I book before I land?
          </h3>
          <p className={styles.bodyText}>
            The seat tickets and the phone data are the two things to sort at home: the HARUKA One-way Ticket is not sold
            inside Japan, and an eSIM installed before the flight is working at the bus stand. A private car is the
            option for a group or a late arrival.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={jrHarukaUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Haruka ticket on Klook →
            </KlookLink>
            <KlookLink href={nankaiRapitUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Rapi:t ticket on Klook →
            </KlookLink>
            <KlookLink href={kixPrivateTransferUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Private KIX transfer on Klook →
            </KlookLink>
            <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Japan eSIM on Klook →
            </KlookLink>
            <KlookLink href={osakaStayAreas[1].url} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Namba hotels on Klook →
            </KlookLink>
            <KlookLink href={osakaAirportStayAreas[2].url} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Umeda hotels on Klook →
            </KlookLink>
          </div>
        </section>

        {/* A29 (27 Nov 2026): the next step right under the answer — this page sent 0 affiliate_click
            in GA4 for 20–26 Nov. Cards per path in lib/next-step.ts. */}
        <NextStepCards />

        {/* Cheapest */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cheapest</span>
          <h2 className={styles.sectionTitle}>What is the cheapest way from Kansai Airport to Osaka?</h2>
          <p className={styles.bodyText}>
            For Umeda it is the JR Kansai Airport Rapid at ¥1,210, about 65 to 70 minutes with no seat ticket; for Namba
            it is the limousine bus to OCAT at ¥1,400, ¥10 under the ¥1,410 Rapi:t Digital Ticket. The Nankai Airport
            Express to Namba needs only Nankai&apos;s ordinary fare and takes about 43 to 44 minutes; check the fare on
            Nankai&apos;s own search before you travel. A JR Pass holder pays nothing extra on the Haruka.
          </p>
          <p className={styles.bodyText}>
            The JR Rapid stops at many stations and fills up from Hineno and Tennoji, so with large cases the Haruka or
            the bus is the easier ride. Once in the city, our{" "}
            <Link href="/guides/transport/osaka-transportation">Osaka transportation guide</Link> covers the subway and
            day passes.
          </p>
        </section>

        {/* Train vs bus vs private */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Train vs bus vs private car</span>
          <h2 className={styles.sectionTitle}>Train vs bus vs private transfer: which is best?</h2>
          <p className={styles.bodyText}>
            The train is best for Namba, Umeda, Shin-Osaka and Kyoto because the journey time does not depend on traffic.
            The limousine bus wins with big suitcases, and a private transfer, priced per car, pays off for a family or a
            group going door to door.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Mode", "Best for", "Adult price", "Know before you go"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modeRows.map((row, i) => (
                    <tr key={row.mode} style={i === 0 ? { fontWeight: 700 } : undefined}>
                      <td className={styles.tdProvider}>{row.mode}</td>
                      <td>{row.best}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-23 (taxi {TAXI_CHECKED}). Klook prices change by date and car size, so they are not
            quoted here. Sources: JR West, Nankai, Kansai Airport and Kansai Airport Transportation (links above).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kixPrivateTransferUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Check a private KIX transfer on Klook →
            </KlookLink>
            <KlookLink href={kixLimousineUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Check the limousine bus on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText}>
            Staying near the park? Our <Link href="/guides/attractions/usj-hotels">USJ hotels guide</Link> has the
            direct bus from Kansai Airport to Universal City.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>KIX to Namba</p>
                <p className={styles.verdictStatValue}>Rapi:t (from 34 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>KIX to Osaka Station</p>
                <p className={styles.verdictStatValue}>Haruka (about 45 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Itami to Umeda</p>
                <p className={styles.verdictStatValue}>Limousine Bus (¥650)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>KIX to Itami</p>
                <p className={styles.verdictStatValue}>Direct bus (¥2,200)</p>
              </div>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* KIX Options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Kansai International Airport (KIX)</span>
          <h2 className={styles.sectionTitle}>How do I get from Kansai Airport to Osaka city?</h2>
          <p className={styles.bodyText}>
            Take the Nankai Rapi:t if you are staying in Namba and the JR Haruka if you are staying in Umeda, Tennoji
            or Shin-Osaka. The limousine bus suits heavy luggage, and a taxi is the costly door-to-door option.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Adult price", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kixOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-23 (one-way adult figures from Nankai, JR West, Kansai Airport and Kansai Airport
            Transportation; Kansai Airport&apos;s taxi table {TAXI_CHECKED}). The discounted Haruka price is JR West&apos;s HARUKA One-way Ticket for eligible
            foreign visitors. Times can run longer in traffic.
          </p>
        </section>

        {/* By destination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By destination</span>
          <h2 className={styles.sectionTitle}>Which airport train is best for my hotel area?</h2>
          <p className={styles.bodyText}>
            Pick the service that stops at your hotel&apos;s station, because a change of train with luggage costs more
            than a few minutes of journey time. Not booked yet? Our guide to{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka</Link>{" "}
            compares the areas by the airport train under each one.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Destination", "Best pick", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice}>{row.pick}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={jrHarukaUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Check the Haruka ticket on Klook →
            </KlookLink>
            <KlookLink href={nankaiRapitUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Check the Rapi:t ticket on Klook →
            </KlookLink>
            <KlookLink href={kixLimousineUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Check the limousine bus on Klook →
            </KlookLink>
          </div>
        </section>

        {/* What to book before arrival */}
        <KlookTripPrep
          label="Before you land"
          heading="What should I book before I arrive in Osaka?"
          intro={"With the airport ride settled, these are the other things worth having in place. Our where-to-stay guide below compares the hotel areas by line and airport."}
          items={arrivalPrep}
        />
        <p className={styles.bodyText}>
          Still choosing a base? See{" "}
          <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka</Link>, and plan the days
          around it with our <Link href="/guides/attractions/osaka-2-day-itinerary">2-day Osaka itinerary</Link> or{" "}
          <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">3-day Osaka and Kyoto itinerary</Link>; for
          five days in and out of Kansai Airport, with Kobe on the way back, see the{" "}
          <Link href="/guides/attractions/kansai-5-day-itinerary">Kansai 5 day itinerary</Link>.
        </p>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fares</span>
          <h2 className={styles.sectionTitle}>How much is the train from KIX to Namba?</h2>
          <p className={styles.bodyText}>
            The Rapi:t from KIX to Namba is ¥1,410 for an adult (¥710 child) on Nankai&apos;s Rapi:t Digital Ticket,
            fare and Regular Seat together, or ¥1,590 for a Super Seat. To Osaka Station the JR Kansai Airport Rapid is
            ¥1,210 and the Haruka ¥1,900 on the HARUKA One-way Ticket.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Ticket", "Adult", "Child", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={`${row.route}-${row.service}`}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td>{row.service}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.child}</td>
                      <td>{row.source}, {CHECKED}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            JR West&apos;s page notes that its prices changed for tickets sold on or after 1 November 2026. Without the
            Digital Ticket, the Rapi:t costs the ordinary train fare plus a ¥700 adult limited express ticket, and the
            Nankai Airport Express needs the ordinary fare alone. This table leaves out the ordinary Nankai fare and the
            regular Haruka fare because neither could be read from the operator on this date. Check both operators&apos;
            fare searches before you travel. Last checked: 2026-11-23 —{" "}
            <a href={OFFICIAL_SOURCES[1].url} target="_blank" rel="noopener noreferrer">Nankai</a>,{" "}
            <a href={OFFICIAL_SOURCES[0].url} target="_blank" rel="noopener noreferrer">JR West</a>,{" "}
            <a href={OFFICIAL_SOURCES[2].url} target="_blank" rel="noopener noreferrer">Kansai Airport</a>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nankaiRapitUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Check the Rapi:t ticket on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Haruka vs Rapi:t */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Haruka or Rapi:t: which train should I take?</h2>
          <p className={styles.bodyText}>
            Take the Rapi:t for Namba and the Haruka for everywhere else on this list. They do not share a city station,
            so your hotel decides, not the fare. See the full{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Rapi:t comparison</Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "JR Haruka", "Nankai Rapi:t"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {harukaVsRapitRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.haruka}</td>
                      <td>{row.rapit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            One-way adult fares from JR West and Nankai, checked {CHECKED}. Haruka times are from Kansai Airport.
          </p>
        </section>

        {/* Haruka discount */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Haruka discount</span>
          <h2 className={styles.sectionTitle}>Is the Haruka discount ticket worth it?</h2>
          <p className={styles.bodyText}>
            Yes, if you qualify and the Haruka is your train. JR West&apos;s HARUKA One-way Ticket is ¥1,900 to Osaka or
            Shin-Osaka and ¥2,700 to Kyoto, and it includes a reserved or non-reserved ordinary seat with no separate
            express ticket, checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Three limits matter. You need a foreign passport and Temporary Visitor status. JR West says it cannot be
            bought inside Japan, so a plan to buy it at the airport will not work. And you cannot get off at an
            intermediate station, because doing so makes the ticket invalid. If you are riding JR on other trips the
            same day, price the <Link href="/guides/attractions/kansai-area-pass">JR Kansai Area Pass</Link> as well
            (¥2,700 for 1 day, ¥5,500 for 3 days), since it covers the Haruka&apos;s non-reserved seats and two
            reserved ones.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHarukaUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Check the Haruka ticket on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Kyoto */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Kansai Airport to Kyoto</span>
          <h2 className={styles.sectionTitle}>Can I get from Kansai Airport to Kyoto directly?</h2>
          <p className={styles.bodyText}>
            Yes. The JR Haruka runs direct to Kyoto Station in about 75 minutes, and a limousine bus runs direct in about
            1 hour 25 to 30 minutes.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Adult price", "Arrives"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kyotoRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            JR West, Kansai Airport and Kansai Airport Transportation, checked {CHECKED}. Only buses towards the airport
            require a reservation. First and last departures, the shared shuttle to a Kyoto hotel and what to do after a
            late landing are in our{" "}
            <Link href="/guides/transport/kansai-airport-to-kyoto">Kansai Airport to Kyoto guide</Link>.
          </p>
          <p className={styles.bodyText}>
            Heading to Kyoto? The 1-day{" "}
            JR West <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass</Link> costs the same ¥2,700 as the
            HARUKA One-way Ticket to Kyoto, and covers every other JR ride that day too.
          </p>
        </section>

        {/* KIX to ITM */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Between the two airports</span>
          <h2 className={styles.sectionTitle}>How do I get from KIX to Itami?</h2>
          <p className={styles.bodyText}>
            Take the direct limousine bus: about 1 hour 10 to 15 minutes from Terminal 1 and ¥2,200 for an adult. It is
            infrequent, with 8 departures a day from Terminal 1, so check the times against your flight first.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["KIX to Itami bus", `Checked ${CHECKED}`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itamiBusRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Kansai Airport Transportation timetable. Some trips are run by Hankyu Kanko Bus. There is no bus from Terminal
            1 between 12:00 and 14:50, so allow for gaps. Confirm the time on the operator&apos;s timetable before you travel.
          </p>
        </section>

        {/* ITM Options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itami Airport (ITM)</span>
          <h2 className={styles.sectionTitle}>How do I get from Itami Airport to Osaka?</h2>
          <p className={styles.bodyText}>
            Take the limousine bus: about 25 to 30 minutes to Umeda for ¥650, about 30 minutes to Namba for ¥650, or
            about 25 minutes to Shin-Osaka for ¥510.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Adult price", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itmOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-23 for the Umeda and Namba buses, on{" "}
            <a href={OFFICIAL_SOURCES[4].url} target="_blank" rel="noopener noreferrer">Osaka Airport Transport</a>; the Shin-Osaka bus and Osaka Monorail figures were checked {TAXI_CHECKED}. Itami handles domestic flights
            only, so most international visitors arrive at KIX. The Umeda bus leaves from stop 9 and the Namba bus from
            stop 10.
          </p>
        </section>

        {/* ICOCA */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>IC card</span>
          <h2 className={styles.sectionTitle}>Can I use ICOCA from the airport?</h2>
          <p className={styles.bodyText}>
            Yes. ICOCA pays the fare on the JR Kansai Airport Rapid and on Nankai trains from the airport, and JR West
            says it works on railways and buses across Japan. The Haruka and the Rapi:t still need a seat ticket on top of
            the fare.
          </p>
          <p className={styles.bodyText}>
            JR West sells a visitor-design ICOCA for ¥2,000, including a ¥500 deposit, at the JR ticket office at
            Kansai-airport Station; it needs a foreign passport and Temporary Visitor status, one per person. Last
            checked: 2026-11-23 on{" "}
            <a href="https://www.westjr.co.jp/global/en/howto/icoca/" target="_blank" rel="noopener noreferrer">JR West&apos;s ICOCA page</a>.
            How to top up and where else it works is in our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC cards guide</Link>.
          </p>
        </section>

        {/* Late night */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Late arrivals</span>
          <h2 className={styles.sectionTitle}>What if I land late at night at KIX?</h2>
          <p className={styles.bodyText}>
            After the last Haruka at about 22:16, use the limousine bus to Osaka Station: the last normal-fare bus leaves
            Terminal 1 at 23:45, and a cashless midnight bus leaves at 24:15. After that, plan on a taxi or a night at the
            airport.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Last departure", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lateRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td>{row.last}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Kansai Airport and Kansai Airport Transportation, checked {CHECKED} (taxi surcharge {TAXI_CHECKED}). Nankai&apos;s last train is not confirmed
            here from an operator page, so check Nankai&apos;s timetable search for your date.
          </p>
        </section>

        {/* Haruka Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Haruka Limited Express</span>
          <h2 className={styles.sectionTitle}>What should I know about the Haruka?</h2>
          <div className={styles.stepsList}>
            {harukaPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <KlookLink
              href={jrHarukaUrl}
              className={styles.pickCta}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Book Haruka Express Tickets on Klook →
            </KlookLink>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
              className={styles.pickCta}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Book JR Pass (includes Haruka) on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Rapi:t Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Nankai Rapi:t</span>
          <h2 className={styles.sectionTitle}>What should I know about the Rapi:t?</h2>
          <div className={styles.stepsList}>
            {rapiTPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <KlookLink
            href={nankaiRapitUrl}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored nofollow noopener"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Nankai Rapi:t Tickets on Klook →
          </KlookLink>
        </section>

        {/* Limousine Bus */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Airport Limousine Bus</span>
          <h2 className={styles.sectionTitle}>Should I take the limousine bus from Kansai Airport?</h2>
          <p className={styles.bodyText}>
            Take it if you have heavy luggage or a stop near your hotel. The Airport Limousine Bus serves both KIX and ITM,
            with direct routes to Osaka Station, Namba (OCAT), Uehommachi and Kyoto. Airport departures to the city take no
            reservations, so seats are first come, first served.
          </p>
          <p className={styles.bodyText}>
            Or leave the case out of the journey: an Osaka or Kyoto hotel can send it to Kansai Airport ahead of your
            flight, and you collect it on the Terminal 1 departure floor — the guide to{" "}
            <Link href="/guides/transport/japan-luggage-delivery" style={{ color: "var(--red)", fontWeight: 600 }}>
              luggage delivery in Japan
            </Link>{" "}
            has the deadlines, Yamato&apos;s rates and the counters.
          </p>
          <p className={styles.bodyText}>
            On the way back out, allow extra time if you shopped tax-free: from 1 November 2026{" "}
            <Link href="/guides/money/tax-free-shopping-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan tax free shopping is a refund
            </Link>{" "}
            that needs a customs check at a terminal in the Kansai Airport departure lobby before you check your
            bags, with the goods still in your hand luggage.
          </p>
          <KlookLink
            href={kixLimousineUrl}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored nofollow noopener"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Kansai Airport Limousine Bus on Klook →
          </KlookLink>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>What should I know before arriving at Kansai Airport?</h2>
          <div className={styles.stepsList}>
            {tips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Need a SIM card at the airport before the train? Kansai Terminal 1 lists SIM vending machines on 1F, two of
            them open 24 hours, and SIM counters open 06:00–23:00; our{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" style={{ color: "var(--accent)", fontWeight: 600 }}>
              SIM card at the airport guide
            </Link>{" "}
            lists every counter and machine by terminal (checked 20 Nov 2026).
          </p>
        </section>

        <BookingEsimCard lead="Landing at Kansai? Get mobile data before you fly." />

        {/* Where to stay for easy airport access */}
        <KlookStayAreas
          heading="Where should I stay for an easy airport run?"
          intro="Kansai Airport splits neatly by hotel: the Rapi:t serves one side of Osaka and the Haruka the other, and whichever one stops near your hotel is usually the right answer. If the booking is still open, choosing one of these areas settles both the arrival and the trip back out."
          areas={osakaAirportStayAreas}
        />

        <EsimCtaBottom />

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
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka 2026: Namba vs Umeda vs USJ, the Best Areas Compared</p>
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
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="5" width="16" height="11" rx="2" />
                  <path d="M4 11h16M8 16l-1 3M16 16l1 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 2-Day Itinerary</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka and Kyoto 3-Day Itinerary</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Travelling across Japan by rail?</h2>
            <p className={styles.ctaBannerDesc}>
              A JR Pass covers the Haruka from Kansai Airport and all Shinkansen services between Osaka, Kyoto, and Tokyo. Find out if it&apos;s worth it for your itinerary.
            </p>
            <Link href="/guides/transport/jr-pass-guide" className={styles.ctaBannerBtn}>
              Read the JR Pass Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
