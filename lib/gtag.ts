export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
};

export type AffiliateClickParams = {
  partner: string;
  link_url: string;
  page_path: string;
  link_text: string;
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
