export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
};

export type AffiliateClickParams = {
  partner: string;
  /** "esim" (any eSIM provider, a Klook eSIM listing, or any link inside BookingEsimCard), "klook" (other Klook) or "other". */
  product_type: "esim" | "klook" | "other";
  link_url: string;
  /**
   * Hostname of the outbound link (affiliate.klook.com, simbye.com, airalo.pxf.io …).
   * `link_domain` and `link_url` are GA4's predefined parameter names, so they show up
   * under the built-in "Link domain" / "Link URL" dimensions without registering a
   * custom dimension — the per-partner split works even while `partner` is unregistered.
   */
  link_domain: string;
  page_path: string;
  link_text: string;
  /** Which block on the page the link sits in, where that block declares one. */
  placement?: string;
  /** "top" or "bottom": where on the page the block sits, where it declares one (components/EsimCta.tsx). */
  position?: string;
};

export const trackAffiliateClick = (params: AffiliateClickParams) => {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag?.('event', 'affiliate_click', {
    ...params,
    transport_type: 'beacon',
  });
  // eSIM clicks also go out once as their own event, so GA4's built-in
  // "Event name × Date" report counts eSIM referrals per day without a custom
  // dimension. affiliate_click above is unchanged (same params, sent once).
  if (params.product_type === 'esim') {
    window.gtag?.('event', 'esim_click', {
      partner: params.partner,
      product_type: params.product_type,
      placement: params.placement,
      link_domain: params.link_domain,
      transport_type: 'beacon',
    });
  }
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
