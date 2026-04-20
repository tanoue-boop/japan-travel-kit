import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-3">
              🇯🇵 Japan Travel Kit
            </h3>
            <p className="text-sm leading-relaxed">
              Practical, unbiased travel information for foreign visitors to
              Japan. We help you prepare before you arrive.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sim-cards"
                  className="hover:text-white transition-colors"
                >
                  SIM Cards & eSIM
                </Link>
              </li>
              <li>
                <Link
                  href="/wifi-pocket"
                  className="hover:text-white transition-colors"
                >
                  Pocket WiFi
                </Link>
              </li>
              <li>
                <Link
                  href="/transportation"
                  className="hover:text-white transition-colors"
                >
                  Transportation
                </Link>
              </li>
              <li>
                <Link
                  href="/money"
                  className="hover:text-white transition-colors"
                >
                  Money & Payment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="hover:text-white transition-colors"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-sm text-center">
          <p className="mb-1">
            &copy; {new Date().getFullYear()} Japan Travel Kit. All rights
            reserved.
          </p>
          <p className="text-xs text-slate-500">
            This site contains affiliate links. We may earn a commission at no
            extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
