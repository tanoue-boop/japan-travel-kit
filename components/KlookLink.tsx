import type { AnchorHTMLAttributes } from "react";
import { useRouter } from "next/router";
import { klookAffiliateUrl } from "../lib/klook-adids";

/**
 * An outbound Klook link, labelled with the ad id of the page it is rendered on.
 *
 * Every Klook `<a>` on this site goes through here, which is what makes Klook's
 * "Top performing ads" report readable per article — see lib/klook-adids.ts for
 * the why and the URL format.
 *
 * Two things about the implementation are load-bearing:
 *
 *   1. the rewrite happens in the render, not on click, so the `href` in the
 *      prerendered HTML is already the right one. A crawler, a reader with
 *      JavaScript off and a reader who middle-clicks all get the same URL, and
 *      there is nothing to go wrong between the click and the navigation;
 *   2. the page path comes from `useRouter()` — the router context this app
 *      already has — rather than a prop each page would have to pass correctly.
 *      `asPath` is what the reader's address bar shows; `pathname` is the
 *      fallback for a dynamic route, of which this site currently has none.
 *      Query strings and hashes are stripped in `normalizeKlookPagePath`, so a
 *      `?utm_source=` visit hydrates to the same URL it was served with.
 *
 * Props are an `<a>`'s own: `target`, `rel`, `className`, children and the rest
 * pass straight through, and a non-Klook `href` comes out untouched.
 */
type KlookLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function KlookLink({ href, ...rest }: KlookLinkProps) {
  const router = useRouter();
  const pagePath = router.asPath.includes("[") ? router.pathname : router.asPath;
  return <a {...rest} href={klookAffiliateUrl(href, pagePath)} />;
}
