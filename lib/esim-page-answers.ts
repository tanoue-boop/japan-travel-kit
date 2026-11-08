import {
  cheapestAtLeastGb,
  cheapestPlan,
  cheapestUnlimited,
  formatUsd,
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

export const esimPageAnswers: Record<string, string> = {
  "/guides/esim": `Most trips need one data eSIM bought before you fly. ${simbyeDeal(S10)}.`,
  "/guides/esim/airalo-japan-review": `Airalo is worth paying for if you want its app and support: ${price(cheapestAtLeastGb("airalo", 5))} for 5 GB over 7 days. On price alone, ${simbyeDeal(S5)}.`,
  "/guides/esim/airalo-vs-holafly-japan": `Airalo for most trips: a week of unlimited is ${price(week("airalo"))} against ${price(week("holafly"))} on Holafly, and it also sells small plans. Neither is the cheapest: ${simbyeDeal(S_UNL)}, with 2 GB a day at full speed.`,
  "/guides/esim/best-pocket-wifi-japan": `Rent a router if several devices will share it; the rentals are compared below. For one phone an eSIM is simpler and cheaper: ${simbyeDeal(S10)}.`,
  "/guides/esim/does-esim-work-in-japan": `Yes. A travel eSIM works in Japan if your phone supports eSIM and is carrier-unlocked. Once that is checked, ${simbyeDeal(S10)}.`,
  "/guides/esim/esim-go-japan-review": `eSIM Go is a good budget eSIM at ${price(cheapestAtLeastGb("esimgo", 10))} for 10 GB, and it sells the largest allowances here. For that same 10 GB, ${simbyeDeal(S10)}.`,
  "/guides/esim/holafly-japan-review": `Holafly sells unlimited only, ${price(week("holafly"))} for 7 days, with the hotspot capped at 1 GB a day, and we have no link to it. The cheapest week of unlimited compared here:${simbyeDeal(S_UNL)}.`,
  "/guides/esim/how-to-set-up-esim-japan": `Check your phone is unlocked, buy before you fly, install on Wi-Fi, and switch the eSIM on when you land. If you have not bought one yet, ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-2-weeks": `Two weeks at 1 GB a day needs about 14 GB on a plan that lasts 14 days or more. ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-esim-android": `Any unlocked Android with an EID under About phone can take a Japan eSIM, and no plan is Android-only. ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-data-plans": `Plan on 0.5 to 1 GB a day, so 5 to 10 GB covers most trips of up to ten days. ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-family-group": `One eSIM per phone is the simple choice, and a shared Pocket WiFi only wins for a larger group; the sums are below. ${simbyeDeal(S5)} per person.`,
  "/guides/esim/japan-esim-iphone": `An unlocked iPhone XS or later takes a Japan eSIM, and no plan is iPhone-only. ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-esim-students": `For a short study stay, buy a travel eSIM by the month. It has no Japanese number. ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-home-internet-for-foreigners": `Fibre can take weeks to install, so sort out mobile data for the wait. ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-phone-number-for-foreigners": `A Japanese number needs a resident voice plan, and travel data eSIMs do not include one. For data until that is set up, ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-sim-card-for-students": `A student with a residence card should get a resident monthly plan, compared below. For data on arrival, before that plan starts, ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-sim-card-long-term-stay": `Stays over 90 days belong on a resident monthly plan, compared below. For data on arrival, before that plan starts, ${simbyeDeal(S20)}.`,
  "/guides/esim/japan-sim-card-vs-esim-2026": `Buy an eSIM unless you need a Japanese number or your phone cannot take one. ${simbyeDeal(S10)}.`,
  "/guides/esim/japan-sim-card-working-holiday": `Working holiday visitors should get a resident voice plan once they have an address, as below. For data on arrival, ${simbyeDeal(S20)}.`,
  "/guides/esim/pocket-wifi-vs-esim-japan": `An eSIM suits one or two phones: nothing to collect, carry or return. A router suits a group sharing one connection. ${simbyeDeal(S10)}.`,
  "/guides/esim/simbye-japan-review": `Simbye has the lowest list prices compared here, from ${price(S1)}, and it is data only. ${simbyeDeal(S10)}.`,
};
