import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  klookEsim,
  kyotoArashiyamaMatchaDayTour,
  kyotoTeaCeremonyMatchaMaking,
  kyotoTeaCeremonyTastingMaking,
  kyotoTraditionalTeaCeremonyUrl,
  tokyoCasualTeaCeremony,
  tokyoMatchaKimonoTeaCeremony,
  tokyoMatchaTeaCeremonyExpert,
  tokyoPrivateTeaCeremonyWagashi,
  ujiChazunaStoneMillMatcha,
  ujiMatchaGreenTeaHalfDayTour,
  ujiSmallGroupMatchaTour,
  ujiTaihoanWalkingTour,
  ujiTeaCeremonyExperience,
  ujiTeaCeremonyKyotoDayTourFromOsaka,
  wazukaMatchaPickingTasting,
} from "../../../lib/klook-links";

/**
 * Matcha experiences in Japan — the leaf rather than the ritual.
 * Added 27 Oct 2026.
 *
 * Deliberately not a second tea-ceremony guide. We already have
 * pages/guides/attractions/tea-ceremony-japan.tsx, which answers "what is
 * chanoyu, how long is a session, Tokyo or Kyoto, what about seiza and
 * pregnancy". This page answers a different question — where the matcha itself
 * comes from and where you can grind, pick, taste and compare it — which is why
 * Uji and Wazuka lead it and the Kyoto and Tokyo tea rooms sit underneath.
 * The two pages link to each other rather than repeating each other, and the
 * Kyoto ceremony CTA they share is the same listing on the same tracking link.
 *
 * The travel figures are Uji City's own, read on uji.kyoto.jp on 27 October
 * 2026: approximately 16 minutes from Kyoto Station to JR Uji on the JR Nara
 * Line rapid; approximately 30 minutes from the Keihan stations in central
 * Kyoto changing at Chushojima; 10 minutes on foot from JR Uji to the Uji
 * Bridge and effectively none from Keihan Uji; 5 minutes from the bridge to
 * Byodo-in and 10 to Ujigami Shrine.
 *
 * Everything else — session lengths, what is taught, what is included, the
 * schools the instructors belong to — is as the Klook listings describe
 * themselves, confirmed through the www.klook.com search index on 27 Oct 2026.
 * Klook answers automated reads of its product pages with HTTP 403, which is
 * why no Klook price appears here. No admission price is printed for Byodo-in
 * or Chazuna: neither could be read off its own site on the day.
 */

const OWN_ISO = "2026-10-27";
const OWN = checkedLabel(OWN_ISO);

/** Where the matcha actually is, and what each format gives you. */
const experienceRows = [
  {
    what: "Grind it yourself on a stone mill — Chazuna, Uji",
    where: "Uji, at the city's own tea museum",
    length: "3 hours 30 minutes on the listing",
    includes: "A museum ticket and a guided mill session: the listing's three steps are grinding, whisking and drinking",
    note: "The one experience on this page that shows you what matcha is made of — tencha leaves turned to powder under granite, which is why good matcha costs what it does.",
  },
  {
    what: "Pick the leaves — Wazuka plantation",
    where: "Wazuka, the growing area south of Uji",
    length: "Check the listing for your date",
    includes: "Picking on the plantation and a cup of matcha with tea-flavoured dango; a cooking lesson using your own leaves is an option",
    note: "Seasonal by nature and the most rural day here. The optional lesson turns the leaves into chasoba, tea-leaf tempura, kakinohazushi and kuzumochi.",
  },
  {
    what: "Learn the etiquette from a matcha teacher — Uji",
    where: "Wazuka, which the listing names as the main production area of Uji tea",
    length: "Check the listing for your date",
    includes: "Matcha preparation and etiquette taught by a professional matcha teacher",
    note: "The closest thing to a lesson rather than a demonstration, and it happens where the tea grows rather than in a city tea room.",
  },
  {
    what: "Walk the town with a guide — Uji small group",
    where: "Uji town",
    length: "3 hours",
    includes: "A small-group walk built around the tea shops and a tea ceremony",
    note: "Good if you want the shops explained. Uji's tea houses are old family firms and the differences between them are not obvious from the window.",
  },
  {
    what: "Uji half day with lunch",
    where: "Uji town and the Byodo-in outer grounds",
    length: "3 hours",
    includes: "An English-speaking guide, a lunch set, matcha and wagashi tastings, matcha ice cream and the outer grounds of Byodo-in",
    note: "The one listing that feeds you properly. It is also the easiest way to combine the tea with the World Heritage temple on the same morning.",
  },
  {
    what: "Tea ceremony at Taihoan",
    where: "Uji — the town's own municipal tea house",
    length: "Half day on the listing",
    includes: "The Uji Bridge and Nakanoshima Park on foot, then a ceremony at Taihoan",
    note: "Taihoan is run by the city rather than a commercial operator, which makes this the least touristed room on the list.",
  },
  {
    what: "Tasting as well as whisking — Kyoto",
    where: "Central Kyoto",
    length: "Check the listing for your date",
    includes: "A ceremony plus a comparative tasting, rather than a single bowl",
    note: "Pick this if the question you actually have is what separates a ¥1,000 tin from a ¥5,000 one.",
  },
  {
    what: "Traditional ceremony near Kinkaku-ji — Kyoto",
    where: "Kyoto, a few steps from Kinkaku-ji",
    length: "45 minutes to an hour",
    includes: "A second-degree Urasenke instructor, organic Uji matcha served to you, a hands-on whisking lesson and a traditional sweet",
    note: "The listing our tea ceremony guide uses, and the best short introduction if Kyoto is where you have an hour free.",
  },
  {
    what: "Urasenke instructor in Tokyo — Toyosu",
    where: "Tokyo, Toyosu, near teamLab Planets and Toyosu Market",
    length: "Check the listing for your date",
    includes: "A private room, a licensed Urasenke instructor, sweets by named confectioners, and matcha the listing says is mainly from Uji",
    note: "The Tokyo session that explains thick against thin matcha — koicha and usucha — which is the distinction most visitors never get told.",
  },
  {
    what: "Matcha with a kimono — Tokyo",
    where: "Tokyo",
    length: "1 hour 30 minutes",
    includes: "An easy-to-wear kimono before the lecture, then preparing matcha with the tools yourself",
    note: "The photograph version. Our kimono guides cover the full-day rentals if you would rather keep the outfit for the afternoon.",
  },
  {
    what: "A casual 45 minutes — Tokyo",
    where: "Tokyo, a small shop rather than a tea room",
    length: "45 minutes",
    includes: "An English-speaking host trained in the Omotesenke school and a ceremonial preparation",
    note: "The shortest thing here and the one that fits between two other plans. No kneeling marathon, no commitment.",
  },
  {
    what: "One hour, private, with wagashi — Tokyo",
    where: "Tokyo",
    length: "1 hour",
    includes: "A private class with a traditional sweet",
    note: "Worth the difference if you are two or three people and would rather not share the room with a join-in group.",
  },
];

/** Getting to Uji, on Uji City's own figures. */
const accessRows = [
  {
    route: "Kyoto Station → JR Uji, JR Nara Line rapid",
    time: "Approximately 16 minutes",
    then: "10 minutes on foot from JR Uji to the Uji Bridge",
    note: `Uji City's own figure, read ${OWN}. The fastest way in, and it is covered by a JR pass if you are holding one.`,
  },
  {
    route: "Central Kyoto (Sanjo, Gion-Shijo, Higashiyama-Gojo) → Keihan Uji",
    time: "Approximately 30 minutes, changing at Chushojima",
    then: "The Uji Bridge is immediately outside Keihan Uji",
    note: `Also Uji City's own figure, read ${OWN}. Slower on paper but it starts where you are actually staying if your base is Gion rather than the station.`,
  },
  {
    route: "Uji Bridge → Byodo-in",
    time: "5 minutes on foot",
    then: "Ujigami Shrine is 10 minutes from the bridge in the other direction",
    note: `Both figures Uji City's own, read ${OWN}. The whole of tea-shop Uji is between the bridge and the temple, which is why half a day covers it.`,
  },
  {
    route: "Osaka, as part of a guided day",
    time: "A full day on the listing",
    then: "Uji paired with the Arashiyama bamboo grove, Maruyama Park, Yasaka Shrine and Nishiki Market",
    note: "The option if your base is Osaka and you would rather not work out two railways. Klook's own listing description, checked the same day.",
  },
];

const faqItems = [
  {
    q: "Where is the best matcha in Japan?",
    a: `Uji, in southern Kyoto Prefecture, and the growing villages behind it — Wazuka above all. This is not a matter of taste: Uji is where tea cultivation in Japan took hold and where the shaded-growing and stone-grinding methods that make matcha matcha were refined, and the name "Uji tea" still carries a premium in Japanese shops. For a visitor that means three things you cannot get in a city tea room. You can grind tencha leaves on a stone mill yourself at Chazuna, the Uji tea museum, on a listing of 3 hours 30 minutes. You can pick leaves on a plantation in Wazuka. And you can taste one producer against another in shops that have been selling the same tea for generations. Kyoto city and Tokyo both have excellent tea houses — see below — but they are serving tea from here.`,
  },
  {
    q: "Is Uji worth visiting for matcha?",
    a: `Yes, and it is cheap in the only currency that matters on a short trip: time. Uji City's own figures put JR Uji at approximately 16 minutes from Kyoto Station on the JR Nara Line rapid, with the Uji Bridge a 10-minute walk from the station and Byodo-in — a World Heritage temple and the building on the ¥10 coin — 5 minutes beyond the bridge. From the Keihan stations in central Kyoto it is about 30 minutes with one change at Chushojima, and the bridge is right outside Keihan Uji. Read on ${OWN}. So a half day gets you the tea town, a tea experience and the temple. The honest caveat: Uji is a small riverside town, not a destination in its own right — if matcha does not interest you, Nara is the better use of the same half day.`,
  },
  {
    q: "Can I do a matcha tea ceremony in Tokyo?",
    a: `Yes, and in more formats than in Kyoto. Tokyo's sessions run from 45 minutes in a small shop with an English-speaking host trained in the Omotesenke school, through a one-hour private class with wagashi, to 1 hour 30 minutes with a kimono included, to a private room in Toyosu — next to teamLab Planets and Toyosu Market — led by a licensed instructor of the Urasenke school, where the matcha is, by the listing's own description, mainly from Uji. That last one is the one that teaches thick against thin matcha. What Tokyo does not have is the setting: no machiya tea rooms, no temple gardens, no tea growing within an hour. If you are visiting both cities, do the matcha in Uji and the ceremony in Kyoto; if you are only in Tokyo, nothing is lost but the scenery.`,
  },
  {
    q: "How long does a matcha experience take?",
    a: `Between 45 minutes and most of a day, and the length tells you what kind of thing it is. The short end — 45 minutes to an hour — is a tea room: you are served a bowl, shown how it is whisked, and given a sweet. The middle — 1 hour 30 minutes — usually means a kimono or a longer lecture has been added. Three hours is a walking tour of Uji with a ceremony inside it, and the version with a lunch set and the Byodo-in outer grounds is also three. The long end is 3 hours 30 minutes at Chazuna, because grinding your own matcha on a stone mill is genuinely slow work, and a full day if you take Uji as part of a Kyoto or Osaka sightseeing tour. All as the listings state them, checked ${OWN}.`,
  },
  {
    q: "What's the difference between a matcha experience and a tea ceremony?",
    a: `A tea ceremony is about the ritual; a matcha experience is about the leaf. In a ceremony — chanoyu — the point is the hospitality, the seasonal aesthetics and the choreography, and the matcha is the medium. In the experiences on this page the matcha itself is the subject: where it is grown, how tencha becomes powder under a stone mill, what separates a ceremonial grade from a culinary one, how thick koicha differs from thin usucha, and what it tastes like beside a wagashi made for it. Plenty of listings do both, and the Kyoto and Tokyo sessions here are ceremonies in form. If what you want is the ritual and the etiquette — including the seiza question and the venues that advise against attendance during pregnancy — our tea ceremony guide is the one to read.`,
  },
  {
    q: "What are matcha tea houses like in Tokyo and Kyoto?",
    a: `Different enough that the choice is worth making deliberately. In Kyoto they are tea rooms in the architectural sense: machiya townhouses and temple sub-halls around Gion, Higashiyama and the northern temples, where you sit on tatami in a room built for this and the garden is part of it. The session near Kinkaku-ji that we link runs 45 minutes to an hour with a second-degree Urasenke instructor and organic Uji matcha. In Tokyo they are rooms inside buildings — a Japanese-style room on the eighth floor of a Toyosu civic centre, a small shop near a station, a studio in Asakusa with kimono on the rack. The tea and the teaching can be every bit as good; the setting is the trade. Uji is a third category again: the tea houses there are working shops attached to the firms that blend the tea.`,
  },
  {
    q: "How do I get to Uji from Kyoto?",
    a: `Two railways, neither of them difficult. On JR, take the JR Nara Line from Kyoto Station to JR Uji — Uji City gives the rapid service as approximately 16 minutes, and it is covered by a JR pass. On Keihan, from Sanjo, Gion-Shijo or Higashiyama-Gojo in central Kyoto, change at Chushojima onto the Uji Line; the city gives that as approximately 30 minutes. The difference that matters is the walk at the far end: JR Uji is 10 minutes from the Uji Bridge, Keihan Uji is right beside it, and the bridge is 5 minutes from Byodo-in. So JR is faster if you are starting at Kyoto Station, Keihan is better if you are staying in Gion, and neither needs planning. Figures read on ${OWN}.`,
  },
  {
    q: "Do I need to book a matcha experience in advance?",
    a: `For anything with a teacher in the room, yes. A tea room seats a handful of people at a time, the Uji small-group walks cap their numbers by design, and the Chazuna mill session and the Wazuka picking day both have to be staffed for your slot — these are not drop-in attractions with a ticket window. In practice: a few days ahead is usually enough outside peak weeks, and two or three weeks is sensible for a Kyoto weekend, cherry blossom season or the mid-November autumn colour. What you can walk into without any booking at all is a matcha ice cream, a bowl of tea at a shop counter in Uji, or a parfait in Kyoto — the tea town works perfectly well as a half day with nothing reserved, if you are content to taste rather than learn.`,
  },
  {
    q: "Is a matcha experience suitable for children?",
    a: `Mostly yes, with one thing to check. The format works for children — short, hands-on, and there is a sweet at the end — and the mill session at Chazuna and the leaf-picking in Wazuka are more obviously fun for a child than a formal ceremony is. Two caveats. Matcha contains caffeine, and a properly whisked bowl is strong and bitter; most children prefer it as ice cream, and most venues will serve something else. And traditional seating is on tatami in the kneeling seiza position, which is harder for small legs than for adult ones — many venues offer chairs, so ask when you book. The Uji walking tours, which are outdoors between stops, tend to suit a family day better than a single room does.`,
  },
  {
    q: "Where can I buy good matcha to take home?",
    a: `In Uji, from the firms whose names are on the tins, and that is one of the better reasons to make the trip. The tea shops between the Uji Bridge and Byodo-in are the retail ends of long-established blenders, they sell ceremonial and culinary grades side by side, and the staff will tell you which is for whisking and which is for baking — a distinction most airport gift shops ignore. Two practical notes. Matcha is perishable in a way leaf tea is not: it oxidises once opened, so buy a tin you will finish within a few weeks rather than the large one. And a guided walk is genuinely useful here, because it is the one part of the day where knowing what you are looking at changes what you buy. For the tax-free side of a shopping stop, our tax-free shopping guide covers the thresholds.`,
  },
  {
    q: "Should I combine matcha with a kimono rental?",
    a: `It is the most popular pairing in Kyoto, and there are two ways to do it. The simplest is a listing that includes the kimono for the session only, which sidesteps the fixed return deadline a full-day rental comes with — the Tokyo session with a kimono runs 1 hour 30 minutes on that basis. The other is a separate rental for the day, which gives you the afternoon in it but commits you to being back at the shop by a set hour. Our Kyoto kimono rental and Japan-wide kimono rental guides have the return times and what is included; the trade-off is simply whether the outfit is for the tea room or for the streets afterwards.`,
  },
];

const TITLE = "Matcha Experiences in Japan (2026): Uji, Kyoto and Tokyo Tea Houses Compared";
const DESCRIPTION =
  "Matcha Experiences in Japan start in Uji: stone-mill grinding at Chazuna (3h30m), leaf picking in Wazuka, and 16 minutes from Kyoto Station on the JR Nara Line. With the Kyoto and Tokyo matcha tea houses, session lengths from 45 minutes, and what to book ahead.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/japan-matcha-experiences") },
});

export default function JapanMatchaExperiencesPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/japan-matcha-experiences" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/japan-matcha-experiences" />
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
              route: "/guides/attractions/japan-matcha-experiences",
              headline: TITLE,
              description: DESCRIPTION,
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Matcha Experiences in Japan",
                  item: "https://www.japan-travel-kit.com/guides/attractions/japan-matcha-experiences",
                },
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
          <span className={styles.breadCurrent}>Matcha Experiences in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Matcha Experiences in Japan (2026):<br />Uji, Kyoto and Tokyo Tea Houses Compared
          </h1>
          <p className={styles.heroSubtitle}>
            The tea rooms are in Kyoto and Tokyo. The tea is grown sixteen minutes from Kyoto Station —
            and that is where you can grind it yourself.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Uji access times, dated", "45 minutes to a full day"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Where the matcha is</p>
                <p className={styles.verdictStatValue}>Uji &amp; Wazuka</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kyoto Station → Uji</p>
                <p className={styles.verdictStatValue}>~16 min, JR Nara Line</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Session lengths</p>
                <p className={styles.verdictStatValue}>45 min – 3h 30m</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tea houses</p>
                <p className={styles.verdictStatValue}>Kyoto &amp; Tokyo, both</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Matcha experiences in Japan</strong> split into three kinds, and the best of them are
              not in the cities. In <strong>Uji</strong> — approximately <strong>16 minutes</strong> from
              Kyoto Station on the <strong>JR Nara Line</strong> rapid, on Uji City&apos;s own figure — you can
              grind tencha leaves on a <strong>stone mill</strong> at the Chazuna tea museum on a listing of{" "}
              <strong>3 hours 30 minutes</strong>, walk the tea shops with a guide in{" "}
              <strong>3 hours</strong>, or sit a ceremony at <strong>Taihoan</strong>, the town&apos;s own tea
              house. In <strong>Wazuka</strong>, the growing village behind it, you can{" "}
              <strong>pick the leaves</strong>. And in the <strong>matcha tea houses of Kyoto and Tokyo</strong>{" "}
              you can sit a session of <strong>45 minutes to 1 hour 30</strong> — Kyoto in machiya rooms with
              a second-degree Urasenke instructor near Kinkaku-ji, Tokyo in a private Toyosu room with a
              licensed Urasenke instructor using matcha the listing says is mainly from Uji. A half day covers
              Uji and Byodo-in; an hour covers a city tea room. Travel times read on {OWN}; session details as
              the listings state them.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={ujiChazunaStoneMillMatcha.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Grind Your Own Matcha in Uji →
              </a>
              <a href={kyotoTraditionalTeaCeremonyUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kyoto Tea House Session →
              </a>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Uji Comes First in Any Matcha Trip</h2>
          <p className={styles.bodyText}>
            Because matcha is a manufacturing process, not a plant, and Uji is where the process lives. The
            leaves are shade-grown to force the chlorophyll up and the bitterness down, dried without rolling
            into <em>tencha</em>, and then ground — slowly, on granite mills, because speed makes heat and
            heat ruins the flavour. That is the whole difference between matcha and any other green tea, and
            it is a thing you can watch and do in Uji rather than only read about.
          </p>
          <p className={styles.bodyText}>
            The practical consequence for a visitor is that Uji offers something no Kyoto or Tokyo tea room
            can. At <strong>Chazuna</strong>, the Uji tea museum, you grind your own on a stone mill and then
            whisk and drink what you made — three and a half hours on the listing, and the slowest, most
            interesting version of this on the page. In <strong>Wazuka</strong>, the hill village the Uji
            blenders buy from, you can pick leaves on the plantation. Neither is a demonstration.
          </p>
          <p className={styles.bodyText}>
            None of which means you should skip the <strong>tea houses in Kyoto and Tokyo</strong>. They are
            serving Uji tea, usually by someone with a school qualification behind them, and in Kyoto the room
            and the garden are part of the point. The split this page makes is simple: go to Uji for the tea,
            go to a Kyoto or Tokyo tea room for the ritual — and if you only have one free hour, that hour is
            better spent in a city tea room than on two trains. For the ritual itself, the etiquette and the
            seating, our{" "}
            <Link href="/guides/attractions/tea-ceremony-japan">Japanese tea ceremony guide</Link> is the
            companion to this one.
          </p>
        </section>

        {/* Experience comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Matcha Experience Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Ordered from the leaf outwards: the Uji and Wazuka experiences first, then Kyoto, then Tokyo.
            Lengths and inclusions are as the listings describe themselves, checked on {OWN}. No price appears
            — Klook&apos;s product pages refuse automated reads, and a session price moves with the group size
            and the options in any case.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Experience", "Where", "How long", "What's included", "Why pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {experienceRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.where}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.includes}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm on the listing for your date. Where a length says &ldquo;check the
            listing&rdquo;, the operator does not state a duration we could read. No admission price is printed
            for Byodo-in or Chazuna on this page: neither could be confirmed from its own site on {OWN}, so we
            have left both out rather than reprint a figure from elsewhere.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={ujiChazunaStoneMillMatcha.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Chazuna stone mill, Uji →
            </a>
            <a href={wazukaMatchaPickingTasting.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick leaves in Wazuka →
            </a>
            <a href={tokyoMatchaTeaCeremonyExpert.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Urasenke instructor, Tokyo →
            </a>
          </div>
        </section>

        {/* Getting to Uji */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Uji From Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Two railways reach Uji and the right one depends on where you are sleeping rather than on the
            timetable. Every figure below is Uji City&apos;s own, read on {OWN}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Journey time", "Then", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.then}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The JR leg is covered by a JR pass if you are holding one — our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works through whether that is
            worth buying at all — and our{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto guide</Link> explains how
            the JR, Keihan and subway lines fit together from whichever side of the city you are staying on.
            Uji also combines neatly with Nara: both are south of Kyoto on the same JR line, which our{" "}
            <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link> covers.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={ujiMatchaGreenTeaHalfDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Uji half day with lunch →
            </a>
            <a href={ujiTeaCeremonyKyotoDayTourFromOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Uji as a day out of Osaka →
            </a>
          </div>
        </section>

        {/* Thick and thin */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you will taste</span>
          <h2 className={styles.sectionTitle}>Thick, Thin, Ceremonial, Culinary — What Are You Actually Drinking?</h2>
          <p className={styles.bodyText}>
            Two distinctions explain most of what a good session teaches, and neither is usually on a menu.
            The first is <strong>thin against thick</strong> — <em>usucha</em> and <em>koicha</em>. Thin
            matcha is the frothy bowl everyone has seen: more water, whisked to a foam, bright and brisk.
            Thick matcha is closer to a paste, made with roughly twice the powder and half the water, and it
            is the serious end of the ritual. The Toyosu session in Tokyo is the one on this page that says it
            teaches the difference.
          </p>
          <p className={styles.bodyText}>
            The second is <strong>grade</strong>. Ceremonial grade is made from the youngest leaves and is
            meant to be drunk on its own; culinary grade is stronger and more astringent and is meant to stand
            up to milk, sugar and flour. It is why a matcha latte and a bowl of whisked tea taste almost
            unrelated, and why the expensive tin in a Uji shop is not the one to bake with. A session that
            includes a comparative <strong>tasting</strong> rather than a single bowl is the fastest way to
            hear this explained by someone holding both.
          </p>
          <p className={styles.bodyText}>
            The sweet matters too. <em>Wagashi</em> are built to be eaten immediately before the tea, so that
            the sugar takes the edge off the bitterness — which is why a session that serves a good one feels
            like a different drink from the same matcha taken alone. If sweets are the part you are actually
            here for, the matcha parfaits and ice creams of Uji and Kyoto need no booking at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={kyotoTeaCeremonyTastingMaking.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto: tasting as well as whisking →
            </a>
            <a href={kyotoTeaCeremonyMatchaMaking.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto: make your own bowl →
            </a>
          </div>
        </section>

        {/* Tokyo vs Kyoto vs Uji */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which city</span>
          <h2 className={styles.sectionTitle}>Matcha Tea Houses in Tokyo and Kyoto — and When to Pick Which</h2>
          <p className={styles.bodyText}>
            <strong>Kyoto</strong> wins on setting and loses on nothing much. The rooms are machiya
            townhouses and temple halls around Gion, Higashiyama and the northern temples; the session we link
            near Kinkaku-ji runs 45 minutes to an hour with a second-degree Urasenke instructor, organic Uji
            matcha served to you first, then a hands-on whisking lesson and a traditional sweet. It pairs
            naturally with a kimono and with the temples you are already walking between — our{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental">Kyoto kimono rental guide</Link> and{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">things to do in Kyoto guide</Link> cover that
            side of a Kyoto day.
          </p>
          <p className={styles.bodyText}>
            <strong>Tokyo</strong> wins on choice and convenience. There are more formats and more time slots:
            45 minutes in a small shop with an Omotesenke-trained host, an hour private with wagashi, 1 hour
            30 with a kimono, or a private room in Toyosu with a licensed Urasenke instructor — next to
            teamLab Planets and Toyosu Market, which makes it easy to slot into a day you were already
            spending there. Our{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo guide</Link> has the rest
            of that afternoon.
          </p>
          <p className={styles.bodyText}>
            <strong>Uji</strong> is not competing with either. It is a half day, it is where the tea is from,
            and it is the only one of the three where the experience is the manufacture rather than the
            service. If your trip passes through Kyoto at all, the strongest plan on this page is a city tea
            room for the ritual and a morning in Uji for the leaf — they are sixteen minutes apart.
          </p>
        </section>

        <KlookTourPicks
          heading="Matcha, From the Plantation to the Tea Room"
          intro="Grouped the way the article is: Uji and Wazuka first — the stone mill, the leaf picking, the town walks and Taihoan — then the Kyoto tea rooms, then Tokyo. Open a listing for availability and the current price on your dates."
          tours={[
            ujiChazunaStoneMillMatcha,
            wazukaMatchaPickingTasting,
            ujiTeaCeremonyExperience,
            ujiSmallGroupMatchaTour,
            ujiMatchaGreenTeaHalfDayTour,
            ujiTaihoanWalkingTour,
            kyotoTeaCeremonyTastingMaking,
            kyotoTeaCeremonyMatchaMaking,
            kyotoArashiyamaMatchaDayTour,
            tokyoMatchaTeaCeremonyExpert,
            tokyoMatchaKimonoTeaCeremony,
            tokyoCasualTeaCeremony,
            tokyoPrivateTeaCeremonyWagashi,
            ujiTeaCeremonyKyotoDayTourFromOsaka,
          ]}
        />

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

        {/* Before you go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>One Thing to Sort Before the Day</h2>
          <p className={styles.bodyText}>
            Data, for a reason specific to this kind of booking: a matcha experience is a small room with a
            named instructor and a start time, and the message confirming the meeting point is usually an
            email or a chat thread the morning of. Add two railways to Uji, a walk you have not done before,
            and shop opening hours that are not posted in English, and a working connection is the difference
            between arriving and almost arriving.{" "}
            <a href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </a>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against the
            alternatives, and our{" "}
            <Link href="/guides/money/tax-free-shopping-japan">tax-free shopping guide</Link> covers the
            thresholds if you are buying tea to take home.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tea-ceremony-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h13v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
                  <path d="M17 11h2a2 2 0 0 1 0 4h-2" />
                  <path d="M6 6c0-1 1-1.5 1-2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto &amp; What to Expect</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2 4 4 .5-3 3 .8 4L12 17l-3.8 1.5.8-4-3-3 4-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing &amp; What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4 4 4-3 3v11H7V10L4 7z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Kimono Rental (2026): Which Area, What&apos;s Included, When to Return</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c2 3 4 4 4 7a4 4 0 0 1-8 0c0-3 2-4 4-7z" />
                  <path d="M12 14v7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M12 7v14" />
                  <path d="M8 3L5 9v8a2 2 0 0 0 2 2M16 3l3 6v8a2 2 0 0 1-2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan (2026): Kyoto vs Asakusa and How Booking Works</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Sixteen minutes to where the matcha is made</h2>
            <p className={styles.ctaBannerDesc}>
              Do the leaf in Uji and the ritual in a Kyoto or Tokyo tea room. The one booking worth making
              early is anything with an instructor in the room — these are small rooms with named start
              times, not ticket windows.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={ujiChazunaStoneMillMatcha.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Uji Matcha Experiences →
              </a>
              <a href={kyotoTraditionalTeaCeremonyUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kyoto Tea Rooms →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
