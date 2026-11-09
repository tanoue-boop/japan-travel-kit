export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
};

export type AffiliateClickParams = {
  partner: string;
  /** "esim" (any eSIM provider, a Klook eSIM listing, or any link inside BookingEsimCard), "klook" (other Klook) or "other". */
  product_type: "esim" | "klook" | "other";
  link_url: string;
  page_path: string;
  link_text: string;
  /** Which block on the page the link sits in, where that block declares one. */
  placement?: string;
};

export const trackAffiliateClick = (params: AffiliateClickParams) => {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag?.('event', 'affiliate_click', {
    ...params,
    transport_type: 'beacon',
  });
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
