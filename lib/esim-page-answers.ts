import {
  cheapestAtLeastGb,
  cheapestPlan,
  cheapestUnlimited,
  formatUsd,
  getProvider,
  plansFor,
  priceFrom,
  pricesCheckedLabel,
  siteCheapestFrom,
  type EsimPlan,
  type EsimProviderId,
} from "./esim-prices";
import { SIMBYE_DISCOUNT_CODE } from "./simbye";

/**
 * The one-line conclusion at the top of each eSIM page, keyed by route.
 *
 * Kept together so the conclusions can be read side by side, and written from the price
 * data so no figure here goes stale. Each line answers the page's own question first and
 * then names the Simbye plan the button below sells. Rendered by EsimPageAnswer.
 */
const simbyeDeal = (plan: EsimPlan | null) =>
  plan
    ? `Simbye's ${plan.name} is ${formatUsd(plan.priceUsd)}, or ${formatUsd(plan.discountedUsd ?? plan.priceUsd)} with code ${SIMBYE_DISCOUNT_CODE}`
    : "Simbye has the lowest list prices compared here";

const price = (plan: EsimPlan | null) => (plan ? formatUsd(plan.priceUsd) : "—");
const week = (id: EsimProviderId) => cheapestUnlimited(id, 7);

const S1 = cheapestPlan("simbye");
const S5 = cheapestAtLeastGb("simbye", 5);
const S10 = cheapestAtLeastGb("simbye", 10);
const S20 = cheapestAtLeastGb("simbye", 20);
const S_UNL = week("simbye");
const fortnight = (id: EsimProviderId) => plansFor(id).find((p) => p.unlimited && p.days === 15) ?? cheapestUnlimited(id, 15);
const holaflyPlans = plansFor("holafly");
const holaflyMin = holaflyPlans[0] ?? null;
const holaflyMax = holaflyPlans[holaflyPlans.length - 1] ?? null;

export const esimPageAnswers: Record<string, string> = {
  "/guides/esim": `Most trips need one data eSIM bought before you fly. ${simbyeDeal(S10)}.`,
  "/guides/esim/airalo-japan-review": `Airalo is worth paying for if you want its app and support: ${price(cheapestAtLeastGb("airalo", 5))} for 5 GB over 7 days. On price alone, ${simbyeDeal(S5)}.`,
  "/guides/esim/airalo-vs-holafly-japan": `Airalo vs Holafly for Japan: Airalo is the better fit for most trips, at ${price(week("airalo"))} for a week of unlimited against ${price(week("holafly"))} on Holafly, plus fixed-data plans from ${price(cheapestPlan("airalo"))}. Holafly suits one phone that streams all day, with no published daily threshold but a 1 GB-a-day hotspot cap. Neither is the cheapest: ${simbyeDeal(S_UNL)}, with 2 GB a day at full speed.`,
  "/guides/esim/best-pocket-wifi-japan": `Rent a router if several devices will share it; the rentals are compared below. For one phone an eSIM is simpler and cheaper: ${simbyeDeal(S10)}.`,
  "/guides/esim/does-esim-work-in-japan": `Yes. A travel eSIM works in Japan if your phone supports eSIM and is carrier-unlocked. Once that is checked, ${simbyeDeal(S10)}.`,
  "/guides/esim/esim-go-japan-review": `eSIM Go is a good budget eSIM at ${price(cheapestAtLeastGb("esimgo", 10))} for 10 GB, and it sells the largest allowances here. For that same 10 GB, ${simbyeDeal(S10)}.`,
  "/guides/esim/holafly-japan-review": `Yes, Holafly works in Japan: its Japan eSIM is unlimited data only on KDDI and SoftBank (5G where available), with hotspot sharing capped at 1 GB a day, a Fair Usage Policy that can slow it for no more than one day, and no phone number (Holafly's Japan page, checked 15 Nov 2026). It costs ${price(holaflyMin)} for ${holaflyMin?.days ?? 3} days to ${price(holaflyMax)} for ${holaflyMax?.days ?? 30}, ${price(week("holafly"))} for 7 days and ${price(fortnight("holafly"))} for 15. For the same 7 days of unlimited, ${simbyeDeal(S_UNL)}, with 2 GB a day at full speed; Klook eSIM's unlimited plans run at high speed up to 10 GB a day.`,
  "/guides/esim/how-to-set-up-esim-japan": `Check your phone is unlocked, buy before you fly, install on Wi-Fi, and switch the eSIM on when you land. If you have not bought one yet, ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-2-weeks": `A 2-week trip to Japan uses about 4–9 GB, so a 10 GB plan valid for 14 days or more covers most travellers; only daily video streaming pushes 14 days past 14 GB. A 10 GB plan is a fixed allowance, not unlimited. For 14 days, ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-android": `Any unlocked Android with an EID under About phone can take a Japan eSIM, and no plan is Android-only. ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-data-plans": `Plan on 0.5 to 1 GB a day, so 5 to 10 GB covers most trips of up to ten days. ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-family-group": `A family of four on a 10-day Japan trip needs about 5 GB per phone, and four Simbye ${S5?.name ?? "5 GB"} eSIMs cost ${S5 ? formatUsd(S5.priceUsd * 4) : "—"} in total. Sharing is cheaper: one ${S20?.name ?? "20 GB"} plan shared from a parent's phone hotspot is ${price(S20)}, or a rented Pocket WiFi covers everyone, but either only works while the family stays together, so share if you move as one group and buy an eSIM each if teenagers will head off on their own (prices checked ${pricesCheckedLabel()}). ${simbyeDeal(S5)} per person.`,
  "/guides/esim/japan-esim-iphone": `An unlocked iPhone XS or later takes a Japan eSIM, and no plan is iPhone-only. ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-students": `For a short study stay, buy a travel eSIM by the month. It has no Japanese number. ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-home-internet-for-foreigners": `Fibre can take weeks to install, so sort out mobile data for the wait. ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-phone-number-for-foreigners": `A tourist in Japan can get a 070/080/090 number on Sakura Mobile's prepaid Voice + Data travel eSIM, ¥10,340 for 7 days (tax incl.), after a passport check in person at a Narita, Haneda, Kansai or Fukuoka airport counter or its Shinjuku office. A resident with a residence card showing their address signs a monthly Voice + Data plan instead, from ¥2,980 (¥3,278 tax incl.) plus a ¥5,500 activation fee (both checked 14 Nov 2026). Travel data eSIMs include no number; for data alone, ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-sim-card-for-students": `An international student in Japan needs a residence card showing a registered address and an international credit or debit card, not a Japanese bank account, to get a monthly SIM. Sakura Mobile's resident plans cost from ¥2,480 a month for data only, or ¥2,980 (¥3,278 tax incl.) with a 070/080/090 number, plus a ¥5,500 activation fee that students cut by ¥1,100 (checked 14 Nov 2026). For data on arrival, before that plan starts, ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-sim-card-long-term-stay": `Stays over 90 days belong on a resident monthly plan, compared below. For data on arrival, before that plan starts, ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-sim-card-vs-esim-2026": `A Japan eSIM is the cheaper option, from ${siteCheapestFrom()} against ${priceFrom("sakura")} for the cheapest physical travel SIM compared here (prices checked ${pricesCheckedLabel()}). An eSIM installs from a QR code before you fly, while a SIM card is collected at an airport counter or delivered inside Japan. Data-only plans, eSIM or card, include no Japanese phone number; only a voice plan such as Sakura Mobile's Voice + Data adds one. ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-sim-card-working-holiday": `Working holiday visitors should get a resident voice plan once they have an address, as below. For data on arrival, ${simbyeDeal(S20)}.`,
  "/guides/esim/pocket-wifi-vs-esim-japan": `An eSIM suits one or two phones: nothing to collect, carry or return. A router suits a group sharing one connection. ${simbyeDeal(S10)}.`,
  "/guides/esim/simbye-japan-review": `Simbye's cheapest Japan eSIM is ${price(S1)} for ${S1?.name ?? "1 GB"}, and ${simbyeDeal(S10)} (prices checked ${pricesCheckedLabel()}), the lowest list prices compared here. It runs on ${getProvider("simbye").network}, allows tethering, and is data only with no Japanese number. You install it from the emailed QR code or link over Wi-Fi before you fly, and the plan starts counting when it first connects in Japan.`,
};
