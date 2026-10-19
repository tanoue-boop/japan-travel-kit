import { Noto_Sans, Noto_Serif } from "next/font/google";

// Serif headings over sans body copy — the pairing a printed guidebook uses, and the one
// thing that most separates this from the generic single-sans template the site had until
// 2026-10-19. Both faces are wired through CSS variables (--font-display / --font-body in
// styles/globals.css) so no module names a font directly.
//
// The two loaders live here, outside pages/, because both _document.tsx (which puts the
// variable classes on <html>) and _app.tsx (which renders the page tree) need the same
// instances. next/font only defines --font-noto-sans / --font-noto-serif on elements
// carrying `.variable`, and globals.css builds --font-body / --font-display from them at
// :root — so the class has to be on the document element or the :root declarations are
// invalid at computed-value time and every element silently falls back to the UA font.
export const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans",
});

export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const fontVariableClass = `${notoSans.variable} ${notoSerif.variable}`;
