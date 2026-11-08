# SEO change log

新しい記録を上に追記する。

## 2026-11-08：/guides/attractions/tokyo-subway-ticket の順位改善と旧URLの集約（task-jtk-20261108-R01）

- 2026-11-08 title 変更：「Tokyo Subway Ticket (2026): 24, 48 or 72 Hours」→「Tokyo Subway Ticket 2026: 24/48/72-Hour Price, Worth It?」。旧URL /guides/transport/tokyo-subway-ticket の 301 先を /guides/transport/tokyo-transportation → /guides/attractions/tokyo-subway-ticket に変更。tokyo-transportation（title・H1 変更なし）の Tokyo Subway Ticket・Metro 24時間券・単発運賃を公式値（2026-11-08 確認）に修正し、break-even 表を削除して本ページへの文脈リンクに置換。

## 2026-11-08：作業メモ型の一人称の一掃と本番 dateModified の修正（task-jtk-20261108-05）

- 2026-11-08 全ページ（en・ko・zh-tw・zh-cn・th）と共有部品の読者向け文言から「we could not read / we track / Klook blocks automated reads」型の作業メモを第三者視点に置換（約160ファイル）。数値・title・見出し・構成は変更なし（11/20 効果測定中のページも文言の置き換えのみ）。
- 更新日の方式：`prebuild` 先頭の `scripts/ensure-git-history.js` が Vercel の shallow clone を unshallow し、`lib/page-dates.js` が git の最終 commit 日を読む。失敗時は data/page-dates.json にフォールバック。日次タスクは page-dates.json をコミットしない運用のまま（詳細は docs/page-dates-operation.md）。
- 修正前の本番：tokyo-go-kart の dateModified 2026-11-01、amanohashidate-ine-day-trip 2026-11-06（いずれも最終 commit 2026-11-07 より古い）。

## 2026-11-07：/guides/attractions/amanohashidate-ine-day-trip の冒頭回答（task-jtk-20261107-05）

- 2026-11-07 title 変更なし（「Amanohashidate Day Trip (2026): Ine Funaya, Tours & Trains」のまま）。Quick Answer の回答段落を差し替えて箱の先頭へ移し、直後に Klook CTA（activity 218014／154563）を配置。5ページと KlookTripPrep（en）の一人称の調査メモを第三者視点に変更。

## 2026-11-07：Bing 上位のお金・交通ページに eSIM カード（task-jtk-20261107-04）

- 目的：11/2週の eSIM 送客クリックが目標30に対し実績4（11/6 時点）。Bing で表示の多いお金・交通の10ページに Simbye と Klook eSIM のカードを置く。
- 変更日：2026-11-07。比較は GA4 の affiliate_click（placement=booking-esim-card、partner=simbye / klook）と Klook の Top performing ads（広告ID別）。
- 変更：components/BookingEsimCard.tsx に `lead` を追加。渡すとカードの見出しがその1行になり、見出し上の小ラベルと導入文は予約・チケットに触れない文面になる。既存20ページの表示は変わらない。
- 対象：tax-free-shopping-japan、how-much-yen-to-bring-japan、currency-exchange-japan、wise-card-japan、revolut-card-japan、japan-travel-budget、kyoto-transportation、ic-cards-japan、jr-pass-guide、osaka-airport-transfer（すべて英語版のみ）。本文・見出し・既存リンクは変更なし。
- 広告ID：spare の 1550189–1550198 を `<ページ>#booking-esim-card` に割り当て。

## 2026-11-07：/guides/transport/tokyo-to-kyoto の Klook 導線と運賃表（task-jtk-20261107-03）

- 2026-11-07 title 変更：「Tokyo to Kyoto 2026: Cheapest & Fastest Ways」→「Tokyo to Kyoto 2026: Shinkansen Price, Time and Cheapest Way」

## 2026-11-07：/guides/attractions/tea-ceremony-japan の順位改善（task-jtk-20261107-R04）

- 2026-11-07 title 変更：「Japanese Tea Ceremony Experience (2026): Tokyo or Kyoto」→「Japanese Tea Ceremony Experience: Price, How Long, Where」

## 2026-11-07：/guides/attractions/sagano-romantic-train-tickets の順位改善（task-jtk-20261107-R03）

- 2026-11-07 title 変更：「Sagano Romantic Train Tickets (2026): Prices and Seats」→「Sagano Romantic Train Tickets 2026–2027: Fares and Booking」

## 2026-11-07：/guides/attractions/things-to-do-tokyo の順位改善（task-jtk-20261107-R02）

- 2026-11-07 title 変更：「Things to Do in Tokyo (2026): What to Book Ahead」→「Things to Do in Tokyo 2026: Top Picks and Ticket Prices」（zh-tw・zh-cn も同じ構成に変更）

## 2026-11-07：/guides/attractions/tokyo-go-kart の順位改善（task-jtk-20261107-R01）

- 2026-11-07 title 変更：「Tokyo Street Go-Kart (2026): Rules and the IDP You Need」→「Tokyo Go Kart 2026: Price, IDP Rules and Which Tour to Book」

## 2026-11-06：Klook 広告IDの追加と使い回しの解消（jtk-20261106-A25）

- 広告ID：60個発行（1550160–1550219、ラベル spare-20261106b-01〜60）。
- 変更：A22 でページのIDを使っていた6つの表に専用IDを割り当て（1550160–1550165）。how-to-set-up-esim-japan、japan-esim-2-weeks、japan-esim-android の esim-days-table、airalo-japan-review、esim-go-japan-review、holafly-japan-review の brand-compare-table。
- 変更：翻訳版20ページを borrowed から pages へ移し、言語別のIDを割り当て（1550166–1550185）。borrowed は空。
- 比較の注意：この20ページの本日より前のクリックは英語版の行に合算されている。spare は34個（1550186–1550219）。

## 2026-11-06：冬ページの今季化と翻訳版、Klook eSIM の表記（jtk-20261106-A21b）

- 目的：12〜2月の予約需要を Klook ツアー（6.5%）とパス（5%）で取る。比較は Search Console の対象9ページと、Klook の Top performing ads（広告ID別）。比較の目安は 11/20〜12/4。
- 変更：/guides/attractions の冬9ページ（sapporo-snow-festival-tours、niseko-ski-tours、gala-yuzawa-ski-day-trip-from-tokyo、jigokudani-snow-monkey-tour、takayama-shirakawago-tour、otaru-day-trip-from-sapporo、hokkaido-7-day-itinerary、japan-winter-itinerary、tokyo-illumination-tours）に、冒頭の WinterBookingTop（予約の目安・ツアー3本・ボタン）と「同じ旅で予約しておくもの」（Klook eSIM・空港送迎・JR／周遊パス）を追加。
- 変更：今季の値に更新（確認日 2026-11-06）。さっぽろ雪まつり 2/4〜11、小樽雪あかりの路 2/6〜13（詳細は発表待ち）、GALA 12/19〜5/5、地獄谷の入苑料は 12/1 から ¥1,000（web ¥880）、白川郷ライトアップ 1/11・17・24・31、東京メガイルミ 1/10 まで（12/24〜1/1 休み）。
- 変更：販売終了・日付切れ・内容違いの Klook 商品を差し替え（lib/klook-links-winter-*.ts）。ラベンダーエクスプレスは夏の列車なので、北海道7日の冬の帰路を旭川経由に変更。
- 内部リンク：冬ページ同士、トップ、/guides/attractions、tokyo-illumination-tours から文脈内リンク。保険とスキー記事の相互リンクは維持。
- 修正：gala-yuzawa と niseko-ski-tours の「保険はスノースポーツを除外するのが普通」を、保険ページ（オンピステは対象）に合わせて修正。
- 変更：Klook eSIM の表記を 11/6 の商品ページに合わせた（US$1.05〜、4.6（50K+ reviews）、2M+ booked、SoftBank 5G／IIJ（Docomo）、テザリング可、使い放題は10GB/日まで高速）。lib/klook-esim-facts.ts に集約。プラン別の価格は書かない。
- 修正：Simbye の「Lowest Price」「最安」表記を、確認できたプランの中での最安という表現に変更（バッジ、固定バー、cheapest-esim-japan の description ほか。5言語）。
- 新規：翻訳版20ページ（ko・zh-tw・zh-cn・th × sapporo-snow-festival-tours、niseko-ski-tours、hokkaido-7-day-itinerary、japan-winter-itinerary、jigokudani-snow-monkey-tour）。各言語のトップに冬のグループを追加。
- 広告ID：spare が0個のため、翻訳版20ページは英語版のIDを借りる（data/klook-adids.json の borrowed）。クリックは英語版の行に合算される。

## 2026-11-06：teamLab Planets の専用ページと旅行保険の作り直し（jtk-20261106-A24）

- 目的：表示が多く順位が低い2テーマを専用ページで取る。teamlab planets tickets は表示959・23.6位、関連語を足して1,300超。旅行保険は表示2,500以上・60〜80位。
- 比較方法：Search Console で下の URL を変更前の過去3か月（_tasks/data-jtk-gsc-queries-20261106.txt）と比べる。
- 新規：/guides/attractions/teamlab-planets-tickets（en・ko・zh-tw・zh-cn・th）。冒頭に答えの表と Klook ボタン、続けて「同じ日に予約するもの」（Klook eSIM、築地ツアー、Tokyo Subway Ticket）。components/PlanetsBooking.tsx。TouristAttraction と ExhibitionEvent（Offer）を追加。
- 広告ID：1549819（en）、1549820（ko）、1549821（zh-tw）、1549822（zh-cn）、1549823（th）。spare は0個。
- 変更：/guides/attractions/teamlab-tokyo-tickets（5言語）を Planets と Borderless の比較ページに変更。title は teamLab Tokyo Tickets 2026: Planets or Borderless? Product の構造化データは外した。
- Planets への内部リンク（48ファイル）は新しいページへ付け替えた。
- 公式の値を更新：新豊洲駅は 1A 出口から徒歩3分（従来は1分）、12/31〜1/2 は 8:00〜20:00、休館日は 12/3 と 1/14。
- 削除：公式に無い記述（売り切れの時期、空いている時間帯、来場者数、増設）。混雑する時間帯と所要時間は「公式に記載なし」。
- 変更：/guides/money/best-travel-insurance-japan を「誰にどれ」「料金」「日本で必要になる場面」「スキー・スノボ」「よくある質問」に組み直し。title は Best Travel Insurance for Japan 2026: Who Needs What, Cost。
- 変更：/guides/money/japan-ski-travel-insurance の title を Best Travel Insurance for Skiing in Japan 2026: Compared に変更。スノーボードと北海道の家族スキーの節を追加。Complete の12か月契約と、特約がサブスク限定であることを反映。
- 変更：/guides/money/safetywing-vs-heymondo-japan の誤りを修正（SafetyWing の免責額、Heymondo の冬季特約と72時間の待機期間は公式に記載が無い）。統合はしない。
- 301：japan-travel-insurance は従来どおり best-travel-insurance-japan へ。新しい301は無し。
- 文脈リンク：保険2ページと niseko-ski-tours、gala-yuzawa-ski-day-trip-from-tokyo、hokkaido-7-day-itinerary を相互にリンク。

## 2026-11-06：Klook の予約ページと購入直前のページで eSIM を売る（jtk-20261106-A22）

- 目的：Klook 以外で成約が0件。Simbye 25%・Klook eSIM 20%・Airalo を、予約を終えた人と eSIM を買う直前の人に見せる。
- 変更日：2026-11-06。比較は GA4 の affiliate_click（placement 別）と Klook の Top performing ads。placement を GA4 の報告で見るにはカスタムディメンションの登録が必要（未登録）。
- eSIM カード（components/BookingEsimCard.tsx、5言語）：予約ボタンの入った枠の直後に20ページ。Simbye → Klook eSIM の順。Klook eSIM の料金は data に無いので出していない（Klook が自動取得を拒否）。
  - shibuya-sky-tickets（en・ko・zh-tw・zh-cn・th）、usj-tickets-express-pass（同5言語）、tokyo-skytree-tickets（同5言語）、teamlab-tokyo-tickets（en・ko・zh-tw・zh-cn）、teamlab-borderless-tickets（en）。
- 日数の表（components/EsimDaysTable.tsx）：how-to-set-up-esim-japan、does-esim-work-in-japan、japan-esim-iphone、japan-esim-android、japan-esim-10-days、japan-esim-2-weeks。japan-esim-3-days・5-days・7-days は 301 済みで実ページが無いので対象外。
- 料金比較の表（components/EsimBrandCompare.tsx）：airalo-japan-review、holafly-japan-review、esim-go-japan-review、sakura-mobile-review。

| ページ | 変更前の title | 変更後の title |
|---|---|---|
| /guides/esim/airalo-japan-review | Airalo Japan Review 2026 \| Japan Travel Kit | Airalo Japan Review 2026: 7 Days $8.00 vs Cheaper eSIMs |
| /guides/esim/holafly-japan-review | Holafly Japan Review 2026 \| Japan Travel Kit | Holafly Japan Review 2026: 7 Days $27.50 vs Cheaper eSIMs |
| /guides/esim/esim-go-japan-review | eSIM Go Japan Review 2026: 1 GB $3.99, 20 GB $26.99 | eSIM Go Japan Review 2026: 7 Days $3.99 vs Cheaper eSIMs |

- title の金額は data/esim-prices.json から生成するので、価格が変わると title も変わる（比較時に注意）。
- 計測：placement は booking-esim-card、esim-days-table、brand-compare-table。Simbye は utm_campaign に置き場所、utm_content にページ。Airalo は subId1 に置き場所、subId2 にページ。Klook は data/klook-adids.json の `<ページ>#<置き場所>` キー（24個）。
- Simbye の URL：既存の割引リンクの末尾に utm を足すと、飛び先で ref が消える（2026-11-06 に実測）。`/discount/ROEBHIOM?redirect=/products/esim-japan&ref=eqvmffxd&utm_...` の形なら ref・utm・割引クッキーが全部残る。lib/simbye.ts の simbyeTrackedUrl に集約。
- 広告ID：spare 1549795〜1549818 を使用、残り5個（1549819〜1549823）。A24 の teamLab Planets 5言語分として残した。

## 2026-11-06：eSIM 記事の整理と柱ページの作り直し（jtk-20261106-A23）

- 目的：eSIM 記事から検索流入と送客を取る。週の eSIM 送客クリック目標は 11/9週 50 → 12月 週250（11/2週の実績は4）。
- 変更日：2026-11-06。11/20〜11/27 に、best-esim-japan（基準 240表示／23.3位）と各ページの順位、GA4 の affiliate_click を比べる。
- 検索語の対応表：docs/esim-keyword-map.md。クエリ×ページのデータは未取得（自動化用Chromeを使えず）。
- リダイレクト：/sim-cards → japan-airport-sim-cards、esim-vs-sim-japan → japan-sim-card-vs-esim-2026 に変更。現存ページの統合は無し（理由は対応表）。
- 柱ページ（英語＋ko／zh-tw／zh-cn／th）：冒頭に用途別の結論の表（各行にボタン、割引コード ROEBHIOM と割引後価格、Prices checked）。端末の確認方法、購入から開通までの手順、よくある失敗を追加。FAQ の誤り（Sakura の回線、全社24時間チャット、チャージの説明）を修正。title は A20 の変更から日が浅いので変えていない。
- 固定ボタン：components/EsimStickyCta.tsx。_app.tsx で eSIM の全ルートに表示（スマホのみ）。
- 冒頭の結論とボタン：21ページ＋ハブ（components/EsimPageAnswer.tsx、文言は lib/esim-page-answers.ts）。Simbye → Klook eSIM → Airalo の順。Holafly のボタンは無し。
- Reddit ページ：用途別の表と、Reddit 検索へのリンクを追加。個別スレッドのリンクは未掲載（自動取得を拒否され実在を確認できず）。
- 計測：affiliate_click に placement を追加（esim-sticky、esim-page-answer、esim-use-case-table）。
- 構造化データ：柱ページと Reddit に ItemList、Simbye・Airalo・eSIM Go・Sakura のレビューに Product/AggregateOffer。
- 文脈リンク：how-much-yen-to-bring-japan、japan-first-time-itinerary に柱ページへのリンクを追加。eSIM 系は結論ボックス経由で全ページ。トップと japan-travel-budget は既にリンクあり。
- 広告ID：A22 用に発行された 1549784〜1549823 を spare に追加し、ID の無かった11ページに 1549784〜1549794 を割り当てた。spare は29個。

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
