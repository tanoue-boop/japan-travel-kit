# SEO change log

新しい記録を上に追記する。

## 2026-11-06：表示は多いのに順位15〜50位のページを1ページ目へ（jtk-20261106-A20）

- 目的：Search Console 過去28日（10/7〜11/3、11/6取得）で表示回数が多く順位が15〜50位のページを10位以内へ上げる。
- 変更日：2026-11-06。2〜3週間後（11/20〜11/27）に、下表の「基準」と順位・クリックを比べる。
- 検索語の根拠：このセッションでは自動化用Chromeが使えず、Search Console のクエリ別データは取得していない。ページの狙いKWで検索した上位ページを読んで代用した（同じ週の A19 も同じ代用）。
- 比較時の注意：同じ 11/6 に A19（CTR）が別ページを変更している。A21〜A23 が一部の同じページを変更する可能性がある。

| ページ | 基準（表示／順位） | 変更前の title | 変更後の title | 追加・修正 |
|---|---|---|---|---|
| /guides/attractions/teamlab-tokyo-tickets | 2,405／17.2 | teamLab Planets Tickets (2026): Prices and How to Book | teamLab Planets Tickets 2026: From ¥3,800, How to Book | 「What to Wear and Bring」節（QR の配信時刻、再入場不可、子どもの引率条件）、FAQ 1件、Product/AggregateOffer、過ぎた休館日（11/5）を削除 |
| /guides/money/best-travel-insurance-japan | 1,323／46.0 | Best Travel Insurance for Japan 2026: Cover and Cost | Best Travel Insurance for Japan 2026: From $62.72, Compared | 遅延・取消・荷物の比較表、台風 FAQ、Quick Answer に SafetyWing ボタン、Product/Offer。SafetyWing Complete を $161.50→$177.50、Essential の年齢帯を 18–39→10–39 に訂正（ski ページも） |
| /guides/esim/japan-esim-unlimited | 517／49.6 | Best Unlimited eSIM for Japan 2026 \| Japan Travel Kit | Unlimited eSIM for Japan 2026: From $19.99 for 7 Days | 冒頭の答え、7/15/30日の料金と速度制限・テザリングの答えの表、順位を Simbye→eSIM Go→Airalo→Holafly→Sakura に変更、Klook eSIM 枠、FAQ 2件、Product/AggregateOffer。Sakura の回線誤記と Holafly の断定を修正 |
| /guides/attractions/shibuya-sky-tickets | 481／30.7 | Shibuya Sky Tickets 2026: Price, Hours & Sunset Slots | Shibuya Sky Tickets 2026: From ¥2,700, Hours & Sunset Slots | 屋上の持ち込みルール節、FAQ 1件、Product/AggregateOffer、比較節の H2 を「Is Shibuya Sky the Right Tokyo Deck for You?」に変更 |
| /guides/attractions/usj-tickets-express-pass | 321／39.6 | Universal Studios Japan Express Pass 2026: Which to Buy | Universal Studios Japan Express Pass 2026: 4 vs 7, Worth It? | 当日の使い方の節（時間指定、QR 提示、Single Rider との違い）、FAQ 1件。金額の公表値が無いため Product/Offer は付けない |
| /guides/esim/best-pocket-wifi-japan | 289／34.6 | Best Pocket WiFi in Japan 2026: Prices & Pickup | Best Pocket WiFi in Japan 2026: From $1.85 a Day, by Pickup | 空港別のレンタル会社と営業時間の表、FAQ 2件、Product/Offer、BreadcrumbList |
| /guides/attractions/kansai-area-pass | 266／19.0 | JR Kansai Area Pass 2026: Price, Coverage & Is It Worth It? | JR Kansai Area Pass 2026: ¥2,700 a Day, HARUKA Included | 冒頭の答え、紙のパスの有効性と払い戻し FAQ、Product/AggregateOffer |
| /guides/esim/japan-airport-sim-cards | 256／25.0 | （301で best-esim-japan へ） | Japan Airport SIM Cards 2026: Narita, Haneda, Kansai Hours | リダイレクトを外してページを復活。成田・羽田・関空の公式情報から売り場と営業時間の表、料金比較、深夜到着、FAQ 6件、全構造化データ。広告ID 1538127 |
| /guides/esim/best-esim-japan | 240／23.3 | Best eSIM for Japan 2026: Compared by Price & Network | Best eSIM for Japan 2026: Picks by Trip, Network and Data | H1・description を「旅行タイプ別」に変更、関連ページへの文脈リンク、Product/AggregateOffer、BreadcrumbList |
| /guides/attractions/hakone-free-pass | 238／16.8 | Hakone Free Pass (2026): Prices and Is It Worth It? | Hakone Free Pass 2026: ¥7,100 From Shinjuku, Is It Worth It? | 冒頭の答え、デジタル券と紙の比較表、FAQ 2件、Product/AggregateOffer |
| /wifi-pocket | 213／39.0 | （301で best-pocket-wifi-japan へ） | 変更なし | 10/19 からの 301 を維持。実ページは無く、効果は best-pocket-wifi-japan で測る |
| /guides/esim/cheapest-esim-japan | 204／29.8 | Cheapest eSIM for Japan 2026 \| Japan Travel Kit | Cheapest eSIM for Japan 2026: From $1.99, Ranked by Price | 冒頭の答え、データ量別の最安と次点の表、1GBあたり最安の表、FAQ 2件、Product/AggregateOffer、BreadcrumbList。古い回線表記を修正 |

- 検索語の棲み分け：best-esim-japan＝旅行タイプ別のおすすめ、cheapest-esim-japan＝価格、japan-esim-unlimited＝無制限、best-esim-japan-reddit＝Reddit、best-pocket-wifi-japan＝ルーターのレンタル、pocket-wifi-vs-esim-japan＝どちらにするか、shibuya-sky-tickets＝チケット、tokyo-observation-decks＝展望台の比較。
- tokyo-observation-decks：title を「Tokyo Observation Decks 2026: Best Views, Prices and Hours」、H1 を「Best Observation Decks in Tokyo (2026): Skytree, Shibuya Sky, Tokyo Tower and Tocho Compared」に変更。
- 翻訳版：teamlab-tokyo-tickets・shibuya-sky-tickets・usj-tickets-express-pass の ko/th/zh-tw/zh-cn に同じ新節と FAQ を追加。title は変更なし。
- 内部リンク：クリックのある5ページから19本、ハブ3ページから12本、競合ページ同士の相互リンク20本。
- 広告ID：spare の 1538127・1538128 を使い切った。spare は0個。新規ページの前に Klook Text Links で追加が必要。

## 2026-11-06：上位なのに低CTRのページの title・description・上部ボタン（jtk-20261106-A19）

- 目的：Search Console 過去28日（10/7〜11/3、11/6取得）で順位が高いのにクリックされていない15ページ（翻訳8ページ含め計23ページ）の検索結果での見え方を直し、ページ上部で報酬率の高い提携先へ送客する。
- 変更日：2026-11-06。2週間後（11/20以降）に、下表のページの CTR を 10/7〜11/3 と比べる。
- 検索語：Search Console のクエリ別データは取得できなかったため、過去タスクに記録された Bing・GSC の検索語とページの狙いKWで代用した。
- 上部ボタンの追加：cash-vs-card-japan・atms-in-japan（Wise）、kyoto-subway-bus-pass（Klook）、japan-esim-business（Simbye、Klook eSIM は文中リンク）、sakura-mobile-review（Sakura のボタンの下に Simbye・Klook eSIM の比較リンク）。
- 上部ボタンの入れ替え：best-esim-japan-reddit（Airalo → Simbye、Klook eSIM・Airalo は文中リンク）、kawaguchiko-day-trip-from-tokyo（高速バス → ツアー、バスは2番手）。
- 広告ID：japan-esim-business に Klook リンクが初めて入ったため、spare の 1538126 を割り当てた。
- 比較時の注意：11/6 以降の同時期に、別タスク（A20〜A23）が一部の同じページを変更する可能性がある。

| ページ | 変更前の title | 変更後の title |
|---|---|---|
| /guides/esim/sakura-mobile-review | Sakura Mobile Review 2026: eSIM and SIM Card Plans | Sakura Mobile Review 2026: 3 Days ¥2,750 vs Cheaper eSIMs |
| /guides/esim/best-esim-japan-reddit | Best eSIM for Japan Reddit 2026: Which Advice Still Holds | Best eSIM for Japan Reddit 2026: Picks Checked, From $1.99 |
| /guides/money/wise-card-japan | Wise Card in Japan (2026): ATM Fees and Limits | Wise Card in Japan 2026: Free ATM to 250/mo, Then 2.69% |
| /guides/attractions/teamlab-borderless-tickets | teamLab Borderless Tickets (2026): Price and Time Slots | teamLab Borderless Tickets 2026: From ¥3,400, Time Slots |
| /guides/transport/osaka-metro-pass | Osaka Metro Pass 2026: Osaka Subway Pass Price & Worth It? | Osaka Metro Pass 2026: Osaka Subway Pass ¥820, Worth It? |
| /guides/money/cash-vs-card-japan | Cash vs Card in Japan 2026: Where You Still Need Yen | Cash vs Card in Japan 2026: Carry ¥10,000–¥20,000 a Day |
| /guides/attractions/dotonbori-river-cruise | Dotonbori River Cruise 2026: Tombori Price, Times & Pier | Dotonbori River Cruise 2026: ¥2,000, 20 Min, Tombori Times |
| /guides/transport/skyliner-vs-nex | Skyliner vs N'EX (2026): Which Narita Train Is Better? | Skyliner vs N'EX 2026: ¥2,580 vs ¥3,140, Which Is Better? |
| /guides/attractions/teamlab-kyoto-tickets | teamLab Kyoto Tickets: Prices, Hours & Booking | teamLab Kyoto Tickets 2026: From ¥3,800, Hours & Booking |
| /guides/attractions/tokyo-food-tour | Tokyo Food & Izakaya Tours (2026): Shinjuku Bar Hopping | Tokyo Food Tour 2026: 3-Hour Shinjuku Izakaya Bar Hopping |
| /guides/money/atms-in-japan | ATMs in Japan 2026: Which Accept Foreign Cards & Fees | ATMs in Japan 2026: 5 Accept Foreign Cards, Fees Compared |
| /guides/attractions/kawaguchiko-day-trip-from-tokyo | Kawaguchiko Day Trip From Tokyo (2026): Routes and Fares | Kawaguchiko Day Trip From Tokyo 2026: ¥2,200 Bus or Tour |
| /guides/esim/japan-esim-business | Best eSIM for Japan Business Travel 2026: Tether a Laptop | Best eSIM for Japan Business Travel 2026: 20 GB From $19.99 |
| /guides/attractions/arima-onsen-day-trip | Arima Onsen Day Trip (2026): From Osaka or Kobe, and Costs | Arima Onsen Day Trip 2026: 65 Min, ¥1,400 From Osaka, Kobe |
| /guides/transport/kyoto-subway-bus-pass | Kyoto Subway & Bus 1-Day Pass 2026: Is It Worth It? | Kyoto Subway & Bus Pass 2026: ¥1,100, Worth It From 5 Rides |
| /ko/guides/attractions/teamlab-borderless-tickets | 팀랩 보더리스 티켓(2026): 가격과 예약 | 팀랩 보더리스 티켓 2026: 성인 ¥3,400부터 |
| /ko/guides/attractions/dotonbori-river-cruise | 도톤보리 리버크루즈(2026): 요금과 시간 | 도톤보리 리버크루즈 2026: ¥2,000, 20분, 출항 시간 |
| /zh-tw/guides/attractions/teamlab-borderless-tickets | teamLab 無界 門票（2026）：票價、時段預約與購票管道 | teamLab 無界 門票 2026：成人 ¥3,400 起、時段購票 |
| /zh-tw/guides/attractions/dotonbori-river-cruise | 道頓堀遊船（2026）：票價、時間與搭船處 | 道頓堀遊船 2026：¥2,000、20 分鐘、班次與搭船處 |
| /zh-cn/guides/attractions/teamlab-borderless-tickets | teamLab 无界 门票（2026）：票价、时段预约与购票渠道 | teamLab 无界 门票 2026：成人 ¥3,400 起、时段购票 |
| /zh-cn/guides/attractions/dotonbori-river-cruise | 道顿堀游船（2026）：票价、时间与搭船处 | 道顿堀游船 2026：¥2,000、20 分钟、班次与搭船处 |
| /th/guides/attractions/teamlab-borderless-tickets | ตั๋ว teamLab Borderless 2026: ราคา | ตั๋ว teamLab Borderless เริ่ม ¥3,400 |
| /th/guides/attractions/dotonbori-river-cruise | ล่องเรือโดทงโบริ 2026: ราคาและเวลา | ล่องเรือโดทงโบริ 2026: ¥2,000 20 นาที |

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
