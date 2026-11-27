import { useEffect, useState } from "react";
import { airaloTrackedUrl, ESIM_PLACEMENT, pageTag } from "../lib/esim-placement";
import { getEsimPromo, isEsimPromoLive, type EsimPromoId } from "../lib/esim-verdict";

/**
 * One line for a partner's time-limited offer (data/esim-promos.json), gone by itself once
 * the offer ends:
 *
 *   - `live` comes from the page's getStaticProps (isEsimPromoLive at build time), so a
 *     build after the end date leaves the line out of the HTML altogether;
 *   - until then, the reader's own clock is checked after load, so a page built before the
 *     end date stops showing the line the moment `endsAt` passes, with no rebuild.
 *
 * The first render always matches the prerendered HTML (no hydration mismatch); the clock
 * check runs in an effect.
 */
export default function EsimPromoLine({ id, live, route }: { id: EsimPromoId; live: boolean; route: string }) {
  const [show, setShow] = useState(live);
  useEffect(() => {
    if (!isEsimPromoLive(id)) setShow(false);
  }, [id]);
  if (!show) return null;
  const promo = getEsimPromo(id);
  const href = airaloTrackedUrl(ESIM_PLACEMENT.promo, pageTag(route));
  return (
    <p
      data-placement={ESIM_PLACEMENT.promo}
      style={{
        border: "1px solid var(--rule)",
        borderLeft: "3px solid var(--accent)",
        padding: "0.7rem 0.9rem",
        margin: "0 0 1.5rem",
        fontSize: "0.86rem",
        lineHeight: 1.6,
        color: "var(--text)",
      }}
    >
      <strong>Until {promo.endsLabel}:</strong> Airalo takes {promo.percentOff}% off every Unlimited package,
      Japan included, with code <strong>{promo.code}</strong> at checkout (Airalo&apos;s own offer page, read{" "}
      {promo.checkedAt}; its terms apply).{" "}
      <a href={href} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
        Get Airalo Unlimited →
      </a>
    </p>
  );
}
