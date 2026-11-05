# SEO change log

新しい記録を上に追記する。

## 2026-11-05：報酬リンク0本のページを解消（jtk-20261105-A18b）

- 目的：報酬リンクが1本も無いページをゼロにする。
- 監査前：全207ページ中、0本が8ページ（/about、/disclaimer、/guides、/guides/attractions、/guides/esim、/guides/money、/guides/transport、/privacy-policy）、1本が1ページ（/guides/esim/esim-go-japan-review）。0本はすべて英語版で、翻訳版は該当なし。
- 変更：8ページに components/PartnerPick.tsx の商品ブロック（本文リンク＋CTAボタン＋開示文）を追加。ハブは「Read this first」の下に表示する（GuideHub の picks）。
- リンク先：
  - /guides/esim：Klook eSIM
  - /guides/transport：JR Pass、Tokyo Subway Ticket（Klook）
  - /guides/attractions：Mt. Fuji 日帰りツアー、東京観光バスツアー（Klook）
  - /guides/money：Wise、SafetyWing、Tokyo Subway Ticket（Klook）
  - /guides：Klook eSIM、Tokyo Subway Ticket、Mt. Fuji 日帰りツアー
  - /about、/disclaimer、/privacy-policy：Klook eSIM
- 広告ID：spare から8個を上記8ページに割り当て（data/klook-adids.json）。
- 再発防止：scripts/check-revenue-links.mjs（npm run check:revenue）を追加。0本のページがあればエラーで終了する。一覧は --write で docs/revenue-link-audit.md に出力する。
- 効果測定：Klook の広告ID別レポートと Partnerize の pubref（guides-money-hub）で、追加した8ページのクリックを確認する。
