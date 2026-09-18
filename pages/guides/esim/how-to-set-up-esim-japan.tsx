import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import { esimProviders, priceFromLabel, unlimitedFromLabel, type EsimProviderId } from "../../../lib/esim-prices";

// Prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => esimProviders.find((p) => p.id === id)?.affiliateUrl ?? "#";

const beforeYouStart = [
  "eSIM-compatible phone",
  "Unlocked phone (not carrier-locked)",
  "WiFi connection",
  "QR code from your eSIM provider",
];

const iphoneSteps = [
  {
    title: "Go to Settings → Cellular",
    desc: "Open the Settings app on your iPhone and tap 'Cellular' (or 'Mobile Data' in some regions).",
  },
  {
    title: "Tap \"Add eSIM\"",
    desc: "Scroll down and tap 'Add eSIM'. On newer iPhones you may see 'Add eSIM' directly at the top of the Cellular screen.",
  },
  {
    title: "Tap \"Use QR Code\"",
    desc: "Select 'Use QR Code' when prompted. Your camera will open ready to scan.",
  },
  {
    title: "Scan the QR code from your provider",
    desc: "Hold your phone's camera over the QR code sent by your eSIM provider. The code is usually in a confirmation email or inside the provider's app.",
  },
  {
    title: "Label it \"Japan eSIM\"",
    desc: "When prompted to name the new plan, type 'Japan eSIM' so you can easily identify it later.",
  },
  {
    title: "Keep it OFF until you land in Japan",
    desc: "Leave the Japan eSIM plan switched off for now. You'll switch it on when your plane lands to avoid unexpected data charges en route.",
  },
];

const androidSteps = [
  {
    title: "Go to Settings → Network & Internet",
    desc: "Open Settings and tap 'Network & Internet'. On Samsung devices this may be listed as 'Connections'.",
  },
  {
    title: "Tap \"SIMs\" or \"Mobile Network\"",
    desc: "Find the SIM or Mobile Network section. The exact label varies by manufacturer and Android version.",
  },
  {
    title: "Tap \"Add eSIM\" or \"Download a SIM\"",
    desc: "Look for an option to add or download a new SIM. On Google Pixel it reads 'Download a SIM'; on Samsung it reads 'Add mobile plan'.",
  },
  {
    title: "Scan the QR code",
    desc: "Select 'Scan QR code' and point your camera at the QR code from your provider. Confirm the details when prompted.",
  },
  {
    title: "Label it \"Japan eSIM\"",
    desc: "Name the new profile 'Japan eSIM' so it's easy to identify when switching between plans.",
  },
  {
    title: "Keep it OFF until you land",
    desc: "Toggle the Japan eSIM plan off for now. Switch it on after landing to start your data plan from day one.",
  },
];

const iphoneModels = [
  { model: "iPhone XS / XR",     esim: "✓ (1 eSIM)"  },
  { model: "iPhone 11 series",   esim: "✓ (1 eSIM)"  },
  { model: "iPhone 12 series",   esim: "✓ (1 eSIM)"  },
  { model: "iPhone 13 series",   esim: "✓ (2 eSIMs)" },
  { model: "iPhone 14 series",   esim: "✓ (2 eSIMs)" },
  { model: "iPhone 15 series",   esim: "✓ (2 eSIMs)" },
  { model: "iPhone 16 series",   esim: "✓ (2 eSIMs)" },
];

const androidModels = [
  { model: "Samsung Galaxy S20 and later",   esim: "✓" },
  { model: "Google Pixel 3 and later",       esim: "✓" },
  { model: "Sony Xperia 10 III and later",   esim: "✓" },
  { model: "OnePlus 12 and later",           esim: "✓" },
  { model: "Motorola Razr series",           esim: "✓" },
];

const ipadModels = [
  { model: "iPad Pro (3rd gen+, 2018–)",    esim: "✓ Supported" },
  { model: "iPad Air (3rd gen+, 2019–)",    esim: "✓ Supported" },
  { model: "iPad mini (5th gen+, 2019–)",   esim: "✓ Supported" },
  { model: "iPad (7th gen+, 2019–)",        esim: "✓ Supported" },
  { model: "Older iPad models (pre-2019)",  esim: "✗ Not supported" },
  { model: "iPad Wi-Fi only (any model)",   esim: "✗ Not supported" },
];

const androidTabletModels = [
  { model: "Samsung Galaxy Tab S9 / S9+ / S9 Ultra", esim: "✓ Yes" },
  { model: "Samsung Galaxy Tab S8 / S8+ / S8 Ultra", esim: "✓ Yes" },
  { model: "Samsung Galaxy Tab S7 FE (5G version)",  esim: "✓ Yes" },
  { model: "Google Pixel Tablet",                    esim: "✓ Yes" },
  { model: "Lenovo Tab P12 Pro",                     esim: "✓ Yes" },
  { model: "Galaxy Tab S6 and earlier",              esim: "✗ No" },
];

const samsungSteps = [
  { title: "Go to Settings → Connections → SIM Manager", desc: "On Samsung Galaxy phones and tablets, eSIM settings live under Connections, then SIM Manager. The exact path may vary slightly between One UI versions." },
  { title: "Tap 'Add mobile plan' or 'Add eSIM'", desc: "Select the option to add a new eSIM profile. Your device will prompt you to scan a QR code." },
  { title: "Scan the QR code", desc: "Select 'Scan QR code' and scan the code provided by your eSIM provider. Hold your camera up to the QR code on another device or printout." },
  { title: "Confirm the plan", desc: "Review the plan details and confirm the download. This takes 1–2 minutes." },
  { title: "Switch to the eSIM in Japan", desc: "Keep the profile off until you land. Then open SIM Manager and toggle to your Japan eSIM profile." },
];

const pixelSteps = [
  { title: "Go to Settings → Network & internet → SIMs", desc: "On Google Pixel phones and the Pixel Tablet, eSIM settings are found under Network & internet in the main Settings menu." },
  { title: "Tap '+' or 'Add eSIM'", desc: "Select 'Add eSIM' or 'Download a SIM instead?' at the top of the SIMs screen." },
  { title: "Scan your QR code", desc: "Point the camera at your eSIM provider's QR code and wait for the download to complete. The profile installs automatically." },
  { title: "Activate on arrival", desc: "In Japan, go to Settings → SIMs and activate your Japan eSIM profile. You should see network bars within a few seconds." },
];

const ipadSteps = [
  {
    title: "Go to Settings → Cellular",
    desc: "Open the Settings app on your iPad. If you see a 'Cellular' option in the left-hand menu, your iPad supports eSIM. If there is no Cellular option, your iPad is Wi-Fi only and cannot use an eSIM.",
  },
  {
    title: "Tap 'Add eSIM'",
    desc: "Select 'Add eSIM' (or 'Add Cellular Plan' on older iPadOS versions). You'll be prompted to scan a QR code or enter details manually.",
  },
  {
    title: "Tap 'Use QR Code'",
    desc: "Choose 'Use QR Code' from the options. Your iPad's camera will open, ready to scan the QR code from your eSIM provider.",
  },
  {
    title: "Scan the QR code from your provider",
    desc: "Open the QR code from your eSIM provider — either in the provider's app, an email, or a downloaded PDF. Hold your iPad so the camera can read the code. It should scan within a few seconds.",
  },
  {
    title: "Label it 'Japan' and activate on arrival",
    desc: "Give your new eSIM a label (e.g. 'Japan') so it's easy to identify. Keep it in 'Off' mode until you land in Japan — then switch it to 'On' and select it as your cellular plan.",
  },
];

const dualSimTips = [
  {
    title: "Receive calls on your home SIM while using Japan data",
    desc: "In Settings → Cellular, set your home SIM as the \"Default Voice Line\" and your Japan eSIM as the \"Default Data\". Your phone will ring on your home number while all data routes through the Japan eSIM. On Android, set the Japan eSIM as the preferred SIM for mobile data under Settings → Network & internet → SIMs.",
  },
  {
    title: "Switch data to your Japan eSIM on arrival",
    desc: "When you land, go to Settings → Cellular → Cellular Data and select your Japan eSIM. This routes all data through the local network. Your home SIM stays active for calls and SMS but won't use data (avoiding roaming charges).",
  },
  {
    title: "Turn off data roaming on your home SIM",
    desc: "To be safe, go to Settings → Cellular → [Your Home SIM] and turn off \"Data Roaming\". This prevents accidental roaming charges if your home SIM tries to connect.",
  },
];

const causeRows = [
  { problem: "No signal at all", cause: "eSIM not activated" },
  { problem: "Signal but no data", cause: "Wrong data line selected" },
  { problem: "Slow speeds", cause: "APN settings wrong" },
  { problem: "eSIM disappeared", cause: "Phone restarted, needs re-enabling" },
  { problem: '"No service" message', cause: "Carrier-locked phone" },
];

const apnRows = [
  { provider: "Airalo (Docomo)", apn: "Auto-configured" },
  { provider: "eSIM Go (Docomo)", apn: "Auto-configured" },
  { provider: "Holafly (SoftBank)", apn: "Auto-configured" },
  { provider: "Sakura Mobile", apn: "plus.4g" },
];

const supportRows = [
  { provider: "Airalo", support: "24/7 live chat in app" },
  { provider: "eSIM Go", support: "Email support" },
  { provider: "Holafly", support: "Live chat" },
  { provider: "Sakura Mobile", support: "English phone support" },
];

const fixSteps = [
  {
    title: "Fix 1: eSIM Not Activated",
    steps: [
      "Open your eSIM provider app (Airalo, eSIM Go, Holafly, etc.)",
      "Find your Japan plan in the app and check its activation status",
      'Tap "Activate" if the plan shows as installed but not active',
      "Toggle airplane mode off and on to force a network search",
      "Wait 30–60 seconds for your device to connect to the network",
    ],
  },
  {
    title: "Fix 2: Wrong Data Line Selected (iPhone)",
    steps: [
      "Open Settings → Cellular (or Mobile Data)",
      'Tap "Cellular Data" at the top of the screen',
      "Select your Japan eSIM line from the list",
      'Make sure "Allow Cellular Data Switching" is enabled',
      "Return to the home screen and test your connection",
    ],
  },
  {
    title: "Fix 3: Wrong Data Line Selected (Android)",
    steps: [
      "Open Settings → Network & Internet → SIMs",
      "Select your Japan eSIM as the preferred data SIM",
      'Toggle "Mobile data" on for that SIM if needed',
      'Check "Preferred SIM for Mobile Data" is set correctly',
      "Restart your phone if the change doesn't take effect",
    ],
  },
];

const troubleshootItems = [
  {
    title: '"eSIM not working" after scanning',
    desc: "Restart your phone. A full reboot clears most provisioning errors and resolves the majority of eSIM setup problems.",
  },
  {
    title: '"No signal" after activating',
    desc: "Check APN settings. Go to Settings → Cellular → Cellular Data Network and enter the APN details from your provider's setup guide.",
  },
  {
    title: '"QR code won\'t scan"',
    desc: "Enter the activation code manually. Most providers include a text-based code alongside the QR code — use that instead.",
  },
  {
    title: '"Phone says locked"',
    desc: "Your device is carrier-locked. Contact your home carrier to request an unlock before you travel. This usually takes 24–48 hours.",
  },
];

const esimRecommend = [
  { label: "Best overall",   name: "Airalo",        detail: `From ${priceFromLabel("airalo")}`,          href: link("airalo") },
  { label: "Unlimited data", name: "Holafly",       detail: `From ${unlimitedFromLabel("holafly")}`,     href: link("holafly") },
  { label: "Best value",     name: "eSIM Go",       detail: `From ${priceFromLabel("esimgo")}`,          href: link("esimgo") },
  { label: "Long stay",      name: "Sakura Mobile", detail: `From ${priceFromLabel("sakura")}`,          href: link("sakura") },
];

const faqItems = [
  {
    q: "Can I set up eSIM before arriving in Japan?",
    a: "Yes — and you should. You can scan the QR code and install the eSIM profile at home over WiFi. Just leave the plan switched off until your plane lands in Japan. This way you have instant 4G without queuing at airport SIM machines.",
  },
  {
    q: "Will setting up eSIM delete my current SIM?",
    a: "No. Installing a Japan eSIM adds a second profile alongside your existing SIM. Your home SIM and number remain completely intact. You can switch between them at any time in Settings.",
  },
  {
    q: "Can I use two eSIMs at once?",
    a: "Most modern iPhones (XS and later) and many Android devices support Dual SIM, allowing one physical SIM and one eSIM active simultaneously. Dual eSIM (two eSIMs active at once) is supported on iPhone 13 and later and select Android models.",
  },
  {
    q: "What if my QR code expires?",
    a: "Most eSIM QR codes expire after 30–90 days if unused. If yours expires before you travel, contact your provider — they will usually reissue the QR code or activation code free of charge.",
  },
  {
    q: "Does eSIM work on all iPhones?",
    a: "eSIM is supported on iPhone XS (2018) and all later models. iPhones purchased in mainland China do not support eSIM. iPhones bought through certain carriers may be eSIM-locked — contact your carrier to unlock before travelling.",
  },
  {
    q: "Does my iPhone support eSIM for Japan?",
    a: "iPhone XS and later (released 2018 onwards) support eSIM. This includes the XS, XS Max, XR, and all iPhone 11, 12, 13, 14, 15, and 16 models. To confirm, go to Settings → General → About and scroll down to find \"EID\" — if it's listed, your iPhone supports eSIM. Note: iPhones bought in mainland China do not support eSIM.",
  },
  {
    q: "Can I use eSIM on a carrier-locked phone?",
    a: "Usually no. Carrier-locked phones typically block eSIM from other providers. You'll need to contact your carrier to unlock your phone before using a Japan eSIM. Most carriers will unlock your phone if your contract is paid up or if you've owned the device for a set period. iPhone 14 and later models sold in the US are eSIM-only and SIM-unlocked by default.",
  },
  {
    q: "How do I switch between SIMs on iPhone?",
    a: "Go to Settings → Cellular → Cellular Data, then select which SIM to use for data. For calls, go to Settings → Cellular → Default Voice Line. On iPhone 13 and later, you can also manage dual SIM settings directly from the Cellular screen. You can switch at any time — no restart needed.",
  },
  {
    q: "Will my APN settings configure automatically on Android?",
    a: "In most cases, yes. When you activate your Japan eSIM on Android, the correct APN settings are pushed automatically by the network. If data doesn't work after activation, check the manual APN settings provided by your eSIM provider — Sakura Mobile, for example, uses 'plus.4g'.",
  },
  {
    q: "Can I use eSIM on my iPad in Japan?",
    a: "Yes — but only on cellular-capable iPad models. iPad Pro (3rd generation and later, 2018+), iPad Air (3rd gen+, 2019+), iPad mini (5th gen+, 2019+), and iPad (7th gen+, 2019+) all support eSIM when purchased in the cellular configuration. Wi-Fi-only iPads have no cellular hardware and cannot use an eSIM regardless of model or software version.",
  },
  {
    q: "How do I check if my Android tablet supports eSIM?",
    a: "Go to Settings on your tablet. On Samsung Galaxy Tab, navigate to Connections → SIM Manager — if you see an 'Add eSIM' or 'Add mobile plan' option, your device supports eSIM. On Google Pixel Tablet, go to Settings → Network & Internet → SIMs. If 'Add eSIM' or 'Download a SIM instead' appears, the device is eSIM-compatible. The Galaxy Tab S8 and S9 series support eSIM; Tab S7 LTE, Tab S6 and earlier generally do not.",
  },
  {
    q: "Can I share my phone's eSIM with my tablet?",
    a: "Not directly — each device needs its own eSIM profile and profiles cannot be transferred between devices. However, you can use your phone as a Personal Hotspot (tethering) to share its data connection with your tablet over Wi-Fi or Bluetooth. This works with any Japan eSIM. The downside is that it uses your phone's battery and data allowance. If you're using both devices heavily, two separate eSIM plans may be more practical.",
  },
  {
    q: "Why is my Japan eSIM not connecting?",
    a: "The most common reasons are: (1) the eSIM is installed but not activated — open your provider's app and check the plan status; (2) your phone is still trying to use your home SIM for data — go to Settings → Cellular and switch the data line to your Japan eSIM; (3) your APN settings are wrong — most major providers auto-configure APN, but Sakura Mobile requires manual entry of 'plus.4g'; (4) your phone is carrier-locked — check with your home carrier if you're unsure.",
  },
  {
    q: "Why does my eSIM show signal but no data?",
    a: "Signal bars but no data is almost always a data line configuration issue. Your phone has registered on the network (hence signal) but is still routing data through your home SIM instead of the Japan eSIM. Fix: go to Settings → Cellular (iPhone) or Settings → Network & Internet → SIMs (Android) and manually set your Japan eSIM as the active data line. On iPhone, also check that 'Allow Cellular Data Switching' is enabled.",
  },
  {
    q: "Can I get a refund if my eSIM doesn't work?",
    a: "Refund policies vary by provider. Airalo offers refunds for unused plans if the eSIM never connected — contact their 24/7 live chat. Holafly similarly offers refunds for non-functional eSIMs. eSIM Go handles refund requests via email. Always try the troubleshooting steps first, as most issues are configuration problems rather than faulty eSIMs. If support confirms the eSIM is defective, providers will typically refund or replace.",
  },
  {
    q: "What should I do if my eSIM stops working mid-trip?",
    a: "First, try the quick fix checklist: toggle airplane mode, restart your phone, and verify the data line is set correctly. If that doesn't work, check your data balance in the provider's app — you may have run out. If you still have data and the connection is dead, contact your provider's support immediately. Airalo's 24/7 live chat is the fastest option. If you need internet urgently, most convenience stores (7-Eleven, FamilyMart, Lawson) offer free WiFi as a temporary solution.",
  },
];

export default function HowToSetUpEsimJapanPage() {
  return (
    <>
      <Head>
        <title>How to Set Up a Japan eSIM 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Step-by-step guide to installing your Japan eSIM on iPhone, Android, iPad or Android tablet before you fly — plus a full troubleshooting section if your eSIM isn't working."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/how-to-set-up-esim-japan" />
        <meta property="og:title" content="How to Set Up an eSIM in Japan (iPhone, Android & Tablet Guide 2026)" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/how-to-set-up-esim-japan" />
        <meta property="og:description" content="Step-by-step guide to installing your Japan eSIM on iPhone or Android before you fly. Activate in under 5 minutes and connect the moment you land." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Set Up an eSIM in Japan (iPhone & Android Guide 2026)" />
        <meta name="twitter:description" content="Step-by-step guide to installing your Japan eSIM on iPhone or Android before you fly. Activate in under 5 minutes and connect the moment you land." />
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "How to Set Up an eSIM in Japan (iPhone & Android Guide 2026)",
              dateModified: "2026-09-16",
              author: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>How to Set Up eSIM in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated September 2026
          </p>
          <h1 className={styles.heroTitle}>
            How to Set Up an eSIM in Japan<br />(Step-by-Step)
          </h1>
          <p className={styles.heroSubtitle}>
            Takes under 5 minutes. Do it before you fly and you&apos;ll have 4G the moment your plane lands.
          </p>
          <div className={styles.heroBadges}>
            {["Updated September 2026", "iPhone, Android & Tablets", "Troubleshooting Included"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>

        {/* Before You Start */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Checklist</span>
          <h2 className={styles.sectionTitle}>Before You Start</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Make sure you have all four of the following before you begin:
          </p>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <ul className={styles.pickList}>
                {beforeYouStart.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Device Compatibility */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Which Devices Support eSIM?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            eSIM works on most phones and cellular tablets released since 2018–2019. Check your model
            below before buying a plan. On any device, the quickest test is to open Settings: if you see
            an &ldquo;Add eSIM&rdquo; (or &ldquo;Add mobile plan&rdquo;) option, you&apos;re good to go.
          </p>
          {[
            { label: "iPhone", rows: iphoneModels, note: "iPhones bought in mainland China do not support eSIM. iPhone 14 and later sold in the US are eSIM-only." },
            { label: "Android phones", rows: androidModels, note: "Phones bought from a mobile carrier may be carrier-locked — confirm your handset is unlocked before travelling." },
            { label: "iPad", rows: ipadModels, note: "Only Wi-Fi + Cellular iPads have an eSIM. If Settings has no 'Cellular' menu, your iPad is Wi-Fi only." },
            { label: "Android tablets", rows: androidTabletModels, note: "Look for 'Add eSIM' under Connections → SIM Manager (Samsung) or Network & internet → SIMs (Pixel)." },
          ].map((group) => (
            <div key={group.label} style={{ marginBottom: "1.5rem" }}>
              <p className={styles.stepTitle} style={{ marginBottom: "0.5rem" }}>{group.label}</p>
              <div className={styles.tableWrap}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Model</th>
                        <th>eSIM support</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((r) => (
                        <tr key={r.model}>
                          <td className={styles.tdProvider}>{r.model}</td>
                          <td>{r.esim}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>{group.note}</p>
            </div>
          ))}
        </section>

        {/* iPhone Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>iOS</span>
          <h2 className={styles.sectionTitle}>How to Set Up eSIM on iPhone</h2>
          <div className={styles.stepsList}>
            {iphoneSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Android Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Android</span>
          <h2 className={styles.sectionTitle}>How to Set Up eSIM on Android</h2>
          <div className={styles.stepsList}>
            {androidSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Samsung Galaxy Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Samsung Galaxy (phone &amp; Galaxy Tab)</span>
          <h2 className={styles.sectionTitle}>Samsung Galaxy: Step-by-Step</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Samsung&apos;s One UI labels the menus differently from stock Android. These steps apply to
            Galaxy S20 and later phones and to eSIM-capable Galaxy Tab models (Tab S8 / S9 series).
          </p>
          <div className={styles.stepsList}>
            {samsungSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Google Pixel Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Google Pixel (phone &amp; Pixel Tablet)</span>
          <h2 className={styles.sectionTitle}>Google Pixel: Step-by-Step</h2>
          <div className={styles.stepsList}>
            {pixelSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* iPad Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>iPad</span>
          <h2 className={styles.sectionTitle}>How to Set Up eSIM on iPad</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The process is almost identical to iPhone. A cellular iPad with a Japan eSIM makes an
            excellent navigation and translation device — the larger screen is much easier for reading
            station maps and using camera translation on menus — and it gives you reliable LTE for
            streaming on the shinkansen, where the free Wi-Fi is inconsistent.
          </p>
          <div className={styles.stepsList}>
            {ipadSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Android Tablet Setup */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Android tablets</span>
          <h2 className={styles.sectionTitle}>How to Set Up eSIM on an Android Tablet</h2>
          <p className={styles.bodyText}>
            eSIM profiles are device-specific, so your tablet needs its own plan (or a hotspot from
            your phone). On a <strong>Samsung Galaxy Tab</strong>, follow the Samsung steps above:
            Settings → Connections → SIM Manager → Add eSIM, scan the QR code, then keep the profile
            off until you land. On a <strong>Google Pixel Tablet</strong>, follow the Pixel steps:
            Settings → Network &amp; internet → SIMs → Add eSIM.
          </p>
          <p className={styles.bodyText}>
            Tablets bought from a mobile carrier (T-Mobile, Verizon, EE and so on) may be carrier-locked
            and unable to use a Japanese eSIM. Tablets bought directly from the manufacturer or an
            unlocked retailer almost always work without issue.
          </p>
        </section>

        {/* Dual SIM tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Dual SIM</span>
          <h2 className={styles.sectionTitle}>Using Your Home SIM and Japan eSIM Together</h2>
          <div className={styles.stepsList}>
            {dualSimTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When to Activate */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Activation</span>
          <h2 className={styles.sectionTitle}>When to Activate</h2>
          <p className={styles.bodyText}>
            The best time to activate your Japan eSIM is right after your plane lands — not before.
            As soon as the crew announces you can disable flight mode, switch it off
            and go to Settings → Cellular and enable your Japan eSIM profile.
          </p>
          <p className={styles.bodyText}>
            Within a few seconds you&apos;ll see your carrier name (Docomo, SoftBank, or au) appear in
            the status bar and your data connection will be live. You&apos;ll have 4G before you
            reach baggage claim — no airport SIM vending machines required.
          </p>
          <p className={styles.bodyText}>
            If you want to keep your home SIM active for calls and texts, leave it enabled alongside
            your Japan eSIM. Set your Japan eSIM as the default for &ldquo;Cellular Data&rdquo; so all
            internet traffic uses the Japan plan.
          </p>
        </section>

        {/* Troubleshooting */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Troubleshooting</span>
          <h2 className={styles.sectionTitle}>Troubleshooting Common Issues</h2>
          <div className={styles.stepsList}>
            {troubleshootItems.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Diagnosis table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>eSIM not working?</span>
          <h2 className={styles.sectionTitle}>Diagnose the Problem</h2>
          <p className={styles.bodyText}>
            If the quick fixes above didn&apos;t solve it, use this table to identify your problem based on
            what you&apos;re seeing, then work through the matching fix below:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>What You See</th>
                    <th>Likely Cause</th>
                  </tr>
                </thead>
                <tbody>
                  {causeRows.map((row) => (
                    <tr key={row.problem}>
                      <td className={styles.ftFeature}>{row.problem}</td>
                      <td className={styles.ftSim}>{row.cause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Fix Steps */}
        {fixSteps.map((fix, fi) => (
          <section key={fi} className={styles.installSection}>
            <span className={styles.sectionLabel}>Step-by-step fix</span>
            <h2 className={styles.sectionTitle}>{fix.title}</h2>
            <div className={styles.stepsList}>
              {fix.steps.map((step, i) => (
                <div key={i} className={styles.stepCard}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <div className={styles.stepBody}>
                    <p className={styles.stepDesc}>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Fix 4: APN */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fix 4</span>
          <h2 className={styles.sectionTitle}>Fix 4: APN Settings</h2>
          <p className={styles.bodyText}>
            Most major Japan eSIM providers auto-configure APN settings during installation.
            However, if your data isn&apos;t working and everything else looks correct, it&apos;s worth
            verifying the APN manually. Here are the correct settings per provider:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>APN Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {apnRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td className={row.apn === "Auto-configured" ? styles.ftSim : styles.tdPrice}>{row.apn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>To manually set APN on iPhone:</strong> Go to Settings → Cellular → Cellular Data
            Network → APN. Enter the APN value from the table above. Leave username and password blank
            unless your provider specifies otherwise.
          </p>
          <p className={styles.bodyText}>
            <strong>To manually set APN on Android:</strong> Go to Settings → Network &amp; Internet →
            SIMs → [Your eSIM] → Access Point Names. Tap the + icon to add a new APN and enter
            the values provided.
          </p>
        </section>

        {/* Fix 5: Carrier-Locked Phone */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fix 5</span>
          <h2 className={styles.sectionTitle}>Fix 5: Carrier-Locked Phone</h2>
          <p className={styles.bodyText}>
            If your phone shows &ldquo;No Service&rdquo; or &ldquo;SIM Not Supported&rdquo; despite the eSIM being
            properly installed and activated, your device may be carrier-locked. This means
            your home carrier has restricted the phone to only use their own SIM cards.
          </p>
          <div className={styles.stepsList}>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>1</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Check if your phone is locked</p>
                <p className={styles.stepDesc}>
                  iPhone: go to Settings → General → About → Carrier Lock. If it says
                  &ldquo;No SIM Restrictions&rdquo;, your phone is unlocked. Android: try inserting a
                  different carrier&apos;s SIM — if it works, you&apos;re unlocked.
                </p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>2</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Request an unlock from your carrier</p>
                <p className={styles.stepDesc}>
                  Contact your home carrier before you travel. Most carriers will unlock phones
                  that have completed their contract period. Processing can take 1–5 business days.
                </p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>3</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Alternative: rent a Pocket WiFi</p>
                <p className={styles.stepDesc}>
                  If you can&apos;t unlock your phone in time, a{" "}
                  <Link href="/guides/esim/pocket-wifi-vs-esim-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>Pocket WiFi device</Link>{" "}
                  from the airport or hotel works independently of your phone&apos;s lock status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact support */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Escalation</span>
          <h2 className={styles.sectionTitle}>Still Not Working? Contact Support</h2>
          <p className={styles.bodyText}>
            If none of the fixes above work, contact your provider. Most issues are configuration
            problems rather than faulty eSIMs, but support can reissue a profile or refund a plan
            that never connected.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Support Channel</th>
                  </tr>
                </thead>
                <tbody>
                  {supportRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td>{row.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which eSIM Should I Get */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Recommendations</span>
          <h2 className={styles.sectionTitle}>Which eSIM Should I Get?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Once you know how to install an eSIM, the next question is which provider to use.
            Here are our top picks for Japan:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Best For", "Provider", "Details", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {esimRecommend.map((r) => (
                    <tr key={r.name}>
                      <td className={styles.tdNetwork}>{r.label}</td>
                      <td className={styles.tdProvider}>{r.name}</td>
                      <td>{r.detail}</td>
                      <td>
                        <a
                          href={r.href}
                          className={styles.tableBtn}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          Get deal →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Not sure which to pick?{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              Read our full comparison →
            </Link>
          </p>
        </section>

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
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="9" height="14" rx="1" />
                  <rect x="13" y="5" width="9" height="14" rx="1" />
                  <line x1="11" y1="12" x2="13" y2="12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan: Which Should You Get?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to pick your Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare Airalo, Holafly, eSIM Go, and Sakura Mobile on price, coverage, and features —
              all in one place.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              View Full eSIM Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
