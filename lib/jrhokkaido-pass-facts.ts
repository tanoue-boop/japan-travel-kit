/**
 * Rules shared by JR Hokkaido's two area passes (Sapporo-Furano, Sapporo-Noboribetsu),
 * for the one-pass pages added by task jtk-20261127-A35.
 *
 * Read by node fetch on 27 November 2026 from
 * jrhokkaido.co.jp/global/english/ticket/railpass/index.html — prices, eligibility,
 * validity, the reserved-seat rule and the purchase routes are on that one page.
 */
export const JRH_CHECKED_ISO = "2026-11-27";

export const JRH_PASS_URL = "https://www.jrhokkaido.co.jp/global/english/ticket/railpass/index.html";

export const jrHokkaidoRuleRows: string[][] = [
  ["Who can use it", "Any non-Japanese passport holder. The passport itself is checked at purchase or exchange; a residence card or a copy is not accepted"],
  ["Days", "4 consecutive days from the start date you choose"],
  ["Seats", "Reserved and non-reserved ordinary seats on limited express, rapid and local trains in the area. Every JR Hokkaido limited express is reserved-only, so get a seat ticket before boarding; seats cannot be assigned on the train"],
  ["Outside the area", "Pay the normal fare and charge for the extra section"],
  ["Not covered", "JR Hokkaido Bus, the Sapporo streetcar and the Sapporo subway"],
];

export const jrHokkaidoBuyRows: string[][] = [
  ["JR-EAST Train Reservation (online)", "Pre-purchase price", "Collect at a designated counter with your passport, or at a passport-reading ticket machine at New Chitose Airport or Sapporo Station"],
  ["Travel agent outside Japan (e.g. Klook)", "Pre-purchase price", "E-ticket or paper exchange order, exchanged at a designated counter with your passport"],
  ["Designated JR Hokkaido stations", "Station price (¥1,000 more for adults)", "Bought on the spot with your passport"],
];
