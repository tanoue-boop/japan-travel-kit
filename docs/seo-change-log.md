# SEO change log

新しい記録を上に追記する。

- 2026-11-14（task-jtk-20261114-P01、報酬単価対策）/guides/attractions/shibuya-sky-tickets（7日の Klook クリック最多 1528118・144件、売れるのは 2% の SHIBUYA SKY）と /guides/attractions/tokyo-skytree-tickets（SKYTREE 2%）の英語・ko・zh-tw・zh-cn・th 計10ページで、主CTA（Quick Answer 内の Klook ボタン）の直下・BookingEsimCard の前に、同じ日に買う高料率商品の小カード3枚（新コンポーネント components/KlookSameDayCards.tsx）を追加。渋谷：渋谷のホテル 6.5%・Street Kart 渋谷 Annex ゴーカート（133849）5%・新宿の夜のフードツアー（102521）6.5%。スカイツリー：浅草・浅草寺半日ウォーキングツアー（128022、新定数 asakusaSensojiWalkingTour）6.5%・愛和服浅草1号店の着物レンタル（2125）6.5%・Tokyo Subway Ticket 5%。下の既存ブロック（同日予約・The rest of the day・Around the tower）からは上へ移した商品を除外して重複なし。ko 版の R02 上部リスト（ホテル・地下鉄・eSIM）はこのカードに置き換え、地下鉄と eSIM は下の同日予約ブロックへ戻した。Klook eSIM 20% の BookingEsimCard はそのまま。広告ID は spare から10個（1554727〜1554736、キー `<ページ>#same-day-cards`）。英語2ページのカード下に内部リンク計4本（tokyo-go-kart・where-to-stay-in-tokyo・asakusa-kimono-rental・tokyo-subway-ticket）。価格は書かない。title・meta・H1 は変更なし。効果測定は 11/21（Klook Top performing ads で 1528118・1528138 と 1554727・1554732 のクリック・チケットを比較し、2% 以外のチケットが出たか）。

- 2026-11-12（task-jtk-20261112-P01、送客対策）/guides/money/japan-travel-budget（Bing 11/05–11/08：479表示・1クリック・CTR0.21%、着地語の多くが「trip to tokyo cost」309表示・「trip to tokyo japan cost」103表示）：Quick Answer の直後・最初の H2「How much does a trip to Japan cost?」の前に、案内ボックス「Only going to Tokyo?」（tokyo-trip-cost へ内部リンク、アンカー「Tokyo trip cost: per day and for 5 days →」）と、予約ブロック（KlookTripPrep、H3「The Lines You Can Pay for Before You Fly」：Tokyo Station のホテル 6.5%・Tokyo Subway Ticket 5%・N'EX／羽田リムジンバス 5%・Klook eSIM 20%）を追加。広告ID 1554714（/guides/money/japan-travel-budget#budget-top）。/guides/money/tokyo-trip-cost にも Quick Answer の直後・最初の H2 の前に同じ予約ブロック（ホテル・Subway Ticket・Skyliner・羽田バス・eSIM）を追加、広告ID 1554715（#budget-top）。既存の下部ブロックはそのまま。KlookTripPrep に adPlacement と headingLevel（上部用 H3）を追加。title・meta・H1 は変更なし（japan-travel-budget は 11/9 の title 変更の比較中）。料金は各ページ本文の既存値のみ。効果測定は 11/19 以降（Bing の japan-travel-budget CTR、GA4 affiliate_click の2ページ、Klook Top performing ads の 1554714・1554715）。

- 2026-11-11（task-jtk-20261111-E01、収益導線）サイト共通の eSIM 部品 components/EsimCta.tsx を新設し、attractions（旅程含む）・transport・money の英語147ページと翻訳58ページで「最初の H2 の前」に小枠（EsimCtaTop）、FAQ／関連記事の前に詳細枠「What to have ready before you fly」（EsimCtaBottom）を表示。/guides/esim/ は英語30＋翻訳4ページに冒頭枠のみ。並びは Simbye → Klook eSIM → Airalo → Sakura Mobile（理由は価格データ〔data/esim-prices.json、確認日表示〕・Klook 掲載情報〔11/6〕・各社公式の記載のみ）。旅程・スキー・アクティビティ系の詳細枠に SafetyWing 1行（referenceID=26614156、条件は 11/6 読み）。GA4 affiliate_click に position（top／bottom）を追加、placement は esim-top／esim-bottom。Klook eSIM リンクがついた保険2ページに spare 広告ID 1554712・1554713 を割当。効果測定は 11/18（日次PDCA：Simbye・Klook eSIM・Airalo・Sakura の送客と成約を前週比）。

## 2026-11-11：best-pocket-wifi-japan の順位改善（task-jtk-20261111-R07）

- 2026-11-11 /guides/esim/best-pocket-wifi-japan（改善前 GSC 28日：430表示・7クリック・CTR1.63%・33.8位。参考：pocket-wifi-vs-esim-japan 49表示65.1位、/wifi-pocket 155表示38.3位。検索語別は GSC スクリプトにアクセスできず未取得）：「Best Pocket WiFi in Japan 2026: From $1.85 a Day, by Pickup」→「Best Pocket WiFi Japan 2026: Prices, Devices, Pickup」。H1「Best Pocket WiFi in Japan (2026): Rental Prices & Pickup Compared」→「Best Pocket WiFi Japan (2026): Prices, Devices & Pickup Compared」、meta を Sakura Mobile の公式値（docomo 無制限・15台・20時間・7日 ¥9,900、sakuramobile.jp/travel/wifi 11/11）先頭に。冒頭3文で「おすすめ・誰はWi-Fi/誰はeSIM」。新設 H2「Which Pocket WiFi Is Best in Japan?」の比較表（1行目 Sakura Mobile、Japan Wireless〔8台・8–10時間・FUPなし、公式 11/11〕、Ninja WiFi・ホテル配送〔Klook 掲載の仕様〕、eSIM 比較行）＋Last checked＋Sakura／Klook ボタン。Klook の価格表示（title・表・カード・FAQ・Product）はすべて削除し、料金表は Sakura 公式の期間別総額に。質問 H2 4本、FAQ 10問→5問（FAQPage）。/wifi-pocket は 10/19 から本ページへ 301 済みのため変更なし、pocket-wifi-vs-esim-japan は意図が違うため統合しない（esim-keyword-map の経緯どおり）。does-esim-work-in-japan・japan-10-day-itinerary・tokyo-kyoto-osaka-7-day-itinerary から本文内リンク、本ページから does-esim-work-in-japan・japan-10-day-itinerary へ。効果測定は 11/25 以降（日次PDCA）。

## 2026-11-11：teamlab-tokyo-tickets の順位改善（task-jtk-20261111-R05）

- 2026-11-11 /guides/attractions/teamlab-tokyo-tickets（改善前 GSC 28日 10/14〜11/10：2,703表示・7クリック・CTR0.26%・16.2位。teamlab planets tickets 392表示22.9位、teamlab borderless tickets 245表示22.8位、teamlab tokyo tickets 138表示20.2位）：「teamLab Tokyo Tickets 2026: Planets or Borderless?」→「teamLab Tokyo Tickets 2026: Planets vs Borderless Prices」。H1「…Planets or Borderless, Which to Book」→「…Planets vs Borderless, Which to Book」、meta を大人料金先頭（Planets ¥3,800~／Borderless ¥3,400~）に。冒頭3文で2館別券・大人料金・子ども料金・当日券の可否、比較表1行目「Our pick for」＋最寄駅・最終入場・所要時間（自サイト目安）行、1館／2館の料金表（2館で大人 ¥7,200~、子ども ¥3,000）、両表直下に Last checked＋公式URL（Planets 料金は teamlabplanets.dmm.com/en で 11/11 再確認、Planets 時間は 11/06、Borderless は 10/09 の値のまま）、質問 H3 3本（At the door / How long / How far in advance。H2 数は翻訳版と同じ5のまま）、FAQ 5問（FAQPage）。料金表直後に Klook Planets・Borderless ボタン（ko・zh-cn・th も比較表直後に同ボタン。zh-tw は他タスクの未コミット変更があるため未変更）。things-to-do-tokyo（リンク先を planets→本ページに修正）・/guides/attractions ハブ・teamlab-borderless-tickets から本文内リンク。各館ページの title はチケット・時間軸のまま（変更なし）。効果測定は 11/25 以降（日次PDCA）。

## 2026-11-11：1ページ目（8〜11位）で表示が多く CTR が低い8ページの title・meta・H1・冒頭・表・FAQ（task-jtk-20261111-C02）

- 基準：GSC 28日（10/14〜11/10、data-jtk-gsc-qp/page-28d-20261111.tsv）。本人指示で 11/6 一括改修の「11/20 まで対象外」を本8ページは解除。効果測定は 11/25 以降（日次PDCA）、本日付で区切る。
- 2026-11-11 /guides/esim/sakura-mobile-review（改善前 2191表示・8クリック・CTR0.37%・9.0位、sakura mobile 1068表示7.6位）：「Sakura Mobile Review 2026: Prices, Plans & Is It Worth It?」→「Sakura Mobile Review 2026: eSIM & SIM Card Prices, Worth It?」。H1・meta 同時変更、冒頭で 7日 ¥4,620（3GB/日 docomo）／¥5,775（無制限 au）・30日 ¥9,900／¥14,575（sakuramobile.jp 11/11）と向く人・向かない人、直後に Sakura ボタン。H2「What do Sakura Mobile reviews say?」（Trustpilot 4.8・1,586件、11/11）、「Is Sakura Mobile worth it, and who should skip it?」、FAQ「Is Sakura Mobile worth it?」。best-esim-japan・best-pocket-wifi-japan・esim ハブ・reddit から本文内リンク（sakura-mobile-vs-airalo-japan は airalo-vs-holafly-japan へ 301 のため対象外）。
- 2026-11-11 /guides/esim/best-esim-japan-reddit（改善前 1231表示・5クリック・CTR0.41%・9.3位）：「Best eSIM for Japan Reddit 2026: Picks Checked, From $1.99」→「Best eSIM for Japan Reddit 2026: What Holds Up, From $1.99」。meta 変更（H1 据え置き）。Reddit は自動取得できずスレッドを確認できないため「Reddit で一番多い」等の主張と根拠のない多数意見の記述を削除し、冒頭を「おすすめ Simbye（$1.99〜）・eSIM Go・Airalo の価格」に。H2「Which eSIM should you get for Japan?」の価格確認済み比較表（1行目 Simbye）＋Last checked＋Simbye ボタン、FAQ 5問に整理。
- 2026-11-11 /guides/money/wise-card-japan（改善前 859表示・12クリック・CTR1.40%・9.4位）：「Wise Card in Japan 2026: Free ATM to 250/mo, Then 2.69%」→「Wise Card Japan 2026: Free ATM to 250/mo, Then 2.69%」。H1・meta 同時変更、冒頭 H2「Can I Use My Wise Card in Japan?」で Visa 利用可・Seven Bank／ゆうちょ ATM・地域別の無料枠（UK 250GBP／EU 250EUR／US 250USD／AU 400AUD、wise.com 各国 card-fees 11/11）、直後に Wise ボタン（リンク不変）。ATM 表の1行目を Seven Bank（推奨）に、両表の下に Last checked。FAQ 5問（Which ATMs in Japan work with the Wise card? 追加）。wise-vs-revolut-japan・money ハブから本文内リンク。
- 2026-11-11 /guides/transport/osaka-metro-pass（改善前 535表示・5クリック・CTR0.93%・10.6位）：「Osaka Metro Pass 2026: Osaka Subway Pass ¥820, Worth It?」→「Osaka Metro Pass 2026: ¥820/¥620 Enjoy Eco Card, Worth It?」。H1・meta 同時変更、冒頭で Enjoy Eco Card ¥820／¥620／¥310（subway.osakametro.co.jp 11/11）、損益分岐（¥240 区間で平日4乗車目）と Amazing Pass ¥3,500／¥5,000（osaka-amazing-pass.com 11/11）の使い分け、直後に地下鉄パス・Amazing Pass ボタン。比較表1行目に結論行、質問 H2 3本。kansai-area-pass・transport ハブから本文内リンク。
- 2026-11-11 /guides/attractions/dotonbori-river-cruise（改善前 216表示・0クリック・9.1位）：「Dotonbori River Cruise 2026: ¥2,000, 20 Min, Tombori Times」→「Dotonbori River Cruise 2026: ¥2,000, 20 Min, 11:00–21:00」。H1・meta 同時変更、料金・時刻を osaka-info.jp・osaka-amazing-pass.com で 11/11 再確認（変更なし）、表の下に Last checked、H3「Who Runs the Dotonbori River Cruise?」「What Time Is the Last Dotonbori Boat Ride?」（H2 数は翻訳版と揃えたまま）。things-to-do-osaka・attractions ハブから本文内リンク。翻訳版は値の変更がないため未変更。
- 2026-11-11 /guides/transport/skyliner-vs-nex（改善前 173表示・0クリック・8.4位、nex vs skyliner 18表示8.2位）：「Skyliner vs N'EX 2026: ¥2,580 vs ¥3,140, Which Is Better?」→「Skyliner vs N'EX (NEX) 2026: ¥2,580/41 min vs ¥3,140/53 min」。meta 変更（H1 据え置き、サブタイトルに NEX vs Skyliner）、冒頭でホテルの地域別の結論、比較表1行目に「Take it if your hotel is near」、Last checked（Skyliner 11/11 keisei.co.jp、N'EX は jreast.co.jp が 403 のため 11/03 値）。tokyo-airport-transfer・transport ハブから本文内リンク、lib/guides-transport.ts のカード title も更新。
- 2026-11-11 /guides/attractions/tokyo-food-tour（改善前 161表示・0クリック・9.2位）：「Tokyo Food Tour 2026: 3-Hour Shinjuku Izakaya Bar Hopping」→「Tokyo Food Tour 2026: Shinjuku Izakaya & Golden Gai, 3 Hrs」。H1・meta 同時変更（TITLE/DESC 定数化）、冒頭でどのツアーを選ぶか＋Klook ボタン、「Which Tokyo Food Tour Should You Book?」表（既存リンク定数5本）、H2「Is There a Golden Gai Food Tour?」（GO TOKYO 11/11：約280軒・20時頃から）、H3 2本、FAQ 2問追加。attractions ハブから本文内リンク。
- 2026-11-11 /guides/attractions/teamlab-kyoto-tickets（改善前 127表示・0クリック・8.1位）：「teamLab Kyoto Tickets 2026: From ¥3,800, Hours & Booking」→「teamLab Kyoto Tickets 2026: ¥3,800, Hours 9:00–21:00」。H1・meta 同時変更、冒頭で年齢別料金・9:00–21:00（最終入場19:30）・現地購入は ¥200 高い（teamLab 公式 FAQ、11/11）、H3＋FAQ「Is teamLab Kyoto cheaper online?」、再入場不可・日時変更期限などを表に追加。things-to-do-kyoto・kyoto-2-day-itinerary・attractions ハブから本文内リンク。

- 2026-11-11 /guides/money/how-much-yen-to-bring-japan（task-jtk-20261111-03、F：AI検索で答えを取られやすい既存記事への Klook 導線）：title「How Much Yen to Bring to Japan 2026: Cash per Day」→「How Much Yen to Bring to Japan (2026): Cash per Day & ATMs」。改善前：Bing 11/04〜11/08 132表示・3クリック・CTR2.27%・5.65位（11/03–11/06 は 117表示・5.75位・CTR1.71%）、Google 28日 95表示・9.3位・1クリック。meta・og 同時変更（H1 は据え置き）、冒頭2文で1日の現金目安・旅行全体の初回額・ATM上限、その直後へ KlookTripPrep を移動（howMuchYenTripPrep を N'EX・スカイライナー 5% → Tokyo Subway Ticket 5%〔追加〕→ Klook eSIM 20% → JR Pass・Osaka Amazing Pass・富士箱根ツアー・Skytree の順に）、質問見出し4本（How much yen do you need when you travel to Japan? ほか）、現金／カードの早見表、ATM 手数料・上限・時間の表（セブン銀行・ゆうちょは 2026-11-11 公式で再確認、E-net・ローソン銀行は atms-in-japan の 10/26 値）、FAQ 3問（Wise・1日の支出・ATM上限）。currency-exchange-japan・tokyo-trip-cost・wise-card-japan・atms-in-japan へ本文内リンク。Wise CTA（Partnerize）は維持。

- 2026-11-11 /guides/transport/osaka-to-hiroshima-shinkansen（task-jtk-20261111-I01、表示なしの点検）：公開 10/28・GSC 28日（10/12〜11/08）表示0（GA4 では ChatGPT 流入7日2セッション）。canonical 自URL・robots index,follow・sitemap 掲載・関係する301なしを確認。title「Osaka to Hiroshima Shinkansen: Times, Fares, Day Trip」→「Osaka to Hiroshima Shinkansen (2026): Time and Price」（tokyo-to-hiroshima の「Times, Fares, JR Pass」と同型だったため）、H1「…: Time and Price From Shin-Osaka」、description と冒頭に新大阪発・のぞみ/みずほ1h20m・さくら（JR Pass 対象）・Kansai-Hiroshima Area Pass ¥17,000。文脈内の被リンクを osaka-3-day-itinerary・kansai-area-pass・shinkansen-guide・hiroshima-miyajima-day-trip に追加、本ページから hiroshima-2-day-itinerary・osaka-3-day-itinerary・/guides/transport へ文脈リンク。関連カード等の旧 title 表記10ファイルを新 title に。11/24 に表示を再確認。

- 2026-11-11 /guides/transport/tokyo-to-kanazawa（task-jtk-20261111-R04）：「Tokyo to Kanazawa (2026): Kagayaki Times and Passes」→「Tokyo to Kanazawa Shinkansen (2026): Time, Price, Passes」（H1 も同文）。改善前：Google 28日（10/12〜11/08）65表示・1クリック・CTR1.5%・22.7位（tokyo to kanazawa shinkansen 6表示62.0位、tokyo to kanazawa 3・71.7位、tokyo to kanazawa train 3・90.7位、fahrkarte tokyo kanazawa 2・69.5位、train from tokyo to kanazawa 2・68.5位、shinkansen to kanazawa from tokyo 1・54.0位）、Bing 上位25ページ外。冒頭を「かがやき約2時間30分（JR西日本最速2h28m）・指定席¥14,400（JR西日本 e5489 新幹線eチケット、2026/3/14購入分〜）・かがやき全車指定・JR Pass／Hokuriku Arch Pass で可、JR EAST PASS は上越妙高まで」に。表3本（かがやき/はくたか比較、運賃とパスの損得〔JR Pass 7日 ¥53,000〕、予約のタイミングと混雑期〔JR西日本きっぷのルールの北陸新幹線用期間表〕）、質問見出し5本・FAQ 7問。運賃を自前の参考値（¥14,380、改定前）から JR西日本公式値に変更。hokuriku-arch-pass・takayama-shirakawago-tour と冒頭で役割分担を明示し相互リンク、jr-east-pass・japan-10/14-day-itinerary・transport ハブから文脈リンク。

- 2026-11-11 /guides/transport/kyoto-to-tokyo-shinkansen（task-jtk-20261111-R03）：「Kyoto to Tokyo Shinkansen: Times, Fares, JR Pass」→「Kyoto to Tokyo Train (2026): Shinkansen Time and Price」。改善前：Google 28日（10/12〜11/08）199表示・1クリック・20.3位（kyoto to tokyo train 22表示30.5位、kyoto to tokyo 10・48.1位、kyoto to tokyo jr pass 6・9.3位、kyoto to tokyo shinkansen time 5・10.0位、kyoto shinkansen jp 3・27.0位、kyoto to tokyo shinkansen 3・24.0位、shinkansen tokyo kyoto 2・53.5位、shinkansen tokyo to kyoto 2・84.0位、train from kyoto to tokyo 2・33.5位）、Bing 上位25ページ外。冒頭を「のぞみ2時間11分・指定席¥13,970（smartEX）・JR Pass はひかり/こだま無料、のぞみ+¥4,960・11/12番線・最終21:38」に、表3本（のぞみ/ひかり/こだま比較、京都駅の乗り場と改札、予約のタイミングと特大荷物）、質問見出し5本と FAQ 名の変更、Tokyo 側のホテル・地下鉄パス・eSIM ボタン。運賃を自前の参考値から smartEX 公式値に、京都駅の東京方面のりばを 11・13番→11・12番（JR西日本時刻表）に訂正。tokyo-to-kyoto は「東京発」、本ページは「京都発」と冒頭で明示し相互リンク。

- 2026-11-11 /guides/transport/ic-cards-japan（task-jtk-20261111-R02）：「IC Cards Japan 2026: Suica, PASMO & ICOCA Compared」→「IC Cards in Japan (2026): Suica vs PASMO vs ICOCA」。改善前：Google 28日（10/12〜11/08）159表示・0クリック・41.5位（ic cards 16表示66.1位、ic card 13・64.3位、travel cards japan 9・68.8位、contactless ic card 5・62.2位）、Bing（11/04〜11/08）20表示・1クリック・CTR5.0%・6.70位。冒頭を「どれを・どこで・いくらで」に、カード比較表に iPhone/Android 列と Welcome Suica Mobile・TOURIST PASMO（PASMO PASSPORT 廃止）を追加、使える場所の表、1日の交通費とパスの損得表＋直後に Klook ボタン（地下鉄パス・Osaka Amazing Pass・N'EX・Haruka・eSIM）、質問見出し5本と FAQ 4問。best-travel-card-japan とは「交通系IC／クレジット・デビット」で分け、相互に1文リンク。

## 2026-11-10：1ページ目（4〜10位）なのに CTR 1%未満の10ページの title・description・H1・冒頭（task-jtk-20261110-C01）

- 基準：GSC 28日（10/12〜11/08）。効果測定は 11/24 以降（日次PDCA）。本文の表・節は変更なし（cooking-class の質問 H2 1節、safetywing・teamlab-botanical のボタン各1つは追加）。
- 2026-11-10 /ko/guides/esim/best-esim-japan：「일본 이심 추천(2026): eSIM 요금제와 클룩 비교」→「일본 이심 추천 2026: eSIM 6곳 가격·통신사 비교」（H1 同語順。「가격 확인…업데이트」バッジを h1 の前から subtitle の後ろへ小さく移動）
- 2026-11-10 /guides/esim/japan-home-internet-for-foreigners：「Japan Home Internet for Foreigners: Prices & Setup」→「WiFi Cost in Japan per Month (2026): ¥6,980 Home Internet」
- 2026-11-10 /guides/esim/japan-sim-card-for-students：「Japan SIM Card for Students: Plans & Residence Card」→「Japan SIM Card for Students 2026: Monthly Plans From ¥2,980」
- 2026-11-10 /guides/esim/japan-esim-2-weeks：「Best Japan eSIM for 2 Weeks 2026: 14-Day Trip Picks」→「Japan eSIM for 2 Weeks (2026): How Many GB for 14 Days?」
- 2026-11-10 /guides/esim/japan-phone-number-for-foreigners：「Japan Phone Number for Foreigners: 070/080/090 Plans」→「Japanese Phone Number for Foreigners (2026): Voice SIM Plans」
- 2026-11-10 /guides/money/safetywing-vs-heymondo-japan：「SafetyWing vs Heymondo for Japan (2026): Which to Pick」→「SafetyWing vs Heymondo for Japan (2026): Price and Cover」
- 2026-11-10 /guides/attractions/kyoto-nara-day-tour-from-osaka：「Kyoto and Nara Day Tour From Osaka (2026): Which to Book」→「Kyoto and Nara Day Tour from Osaka (2026): Routes and Times」
- 2026-11-10 /guides/attractions/tokyo-cooking-class：「Tokyo Cooking Class (2026): Sushi and Ramen Making」→「Tokyo Cooking Class (2026): Beginner-Friendly Sushi & Ramen」
- 2026-11-10 /guides/attractions/teamlab-botanical-garden-osaka-tickets：「teamLab Botanical Garden Osaka Tickets: Prices & Hours」→「teamLab Botanical Garden Osaka Tickets 2026: Price & Hours」
- 2026-11-10 /guides/attractions/tokyo-bay-cruise：「Tokyo Bay Cruise (2026): Yakatabune vs the Symphony」→「Tokyo Bay Cruise 2026: Prices, Night Cruises, Dinner Boats」

## 2026-11-09：/guides/esim/sakura-mobile-review の CTR 改善（task-jtk-20261109-C01）

- 2026-11-09 title 変更：「Sakura Mobile Review 2026: 3 Days ¥2,750 vs Cheaper eSIMs」→「Sakura Mobile Review 2026: Prices, Plans & Is It Worth It?」（H1「Sakura Mobile Review 2026: Prices, Plans and Is It Worth It?」）。meta を最安 ¥2,750/3日・¥9,900/30日（3 GB/day）＋電話番号オプション・SIMカード・90日プランに。Quick Verdict を hero 直下へ移動し、3 GB/day・Unlimited の円料金（3/7/30日）・向いている人・申し込みボタン（id=486 そのまま）を最初の画面に。円料金は sakuramobile.jp で 2026-11-09 再確認（比較記事と /travel/esim/ の税込表が 7/10/30 日で一致、15日は比較記事に「7,1650」と誤植ありと注記）。GSC 基準：「sakura mobile」表示1,076・平均7.4位・CTR 0.2%（直近28日）。関連カード題名を10ページ＋guides-esim・llms.txt で更新。効果測定は 11/23 以降。

## 2026-11-09：/guides/attractions/japan-10-day-itinerary の順位改善（task-jtk-20261109-R03）

- 2026-11-09 title 変更：「Japan 10 Day Itinerary (2026): 10 Days, Day by Day」→「Japan Itinerary 10 Days (2026): 10 Days in Japan, Day by Day」（H1 同文、meta も「Japan itinerary 10 days」「10 days in Japan」完全一致）。冒頭回答段落・目次・10日間一覧表・先に押さえる予約（KlookTripPrep：新宿/京都駅/難波ホテル、東京→京都新幹線、成田リムジンバス、富士箱根ツアー、eSIM）・費用の合計表（大人 from ¥39,970）・ルート別案表（広島・金沢・北海道冬）・季節表（紅葉・のぞみ全席指定・年末年始休業）・FAQ 2問追加。JR Pass 価格を 2026-11-09 公式再確認。逆リンク：tokyo-kyoto-osaka-7-day-itinerary、japan-14-day-itinerary、where-to-stay-in-kyoto、where-to-stay-in-osaka。関連カード題名を19ページ＋guides-attractions・llms.txt で更新（tokyo-5-day-itinerary は指示により未変更）。

## 2026-11-09：/guides/transport/tokyo-airport-limousine-bus の冒頭回答・路線別運賃表・Klook 予約ブロック（task-jtk-20261109-03）

- 2026-11-09 title 変更：「Tokyo Airport Limousine Bus (2026): Fares and Times」→「Airport Limousine Bus Tokyo 2026: Narita & Haneda Fares」（H1「Airport Limousine Bus Tokyo (2026): Narita & Haneda Fares, Times and Stops」）。冒頭回答段落・路線別運賃/所要時間表（確認日付き、2026-11-09 limousinebus.co.jp 再確認）・リムジンバス vs N'EX/スカイライナー/京急/モノレール比較表・質問見出し6つ・FAQ 3問追加・KlookTripPrep（成田/羽田リムジンバス・Subway Ticket・新宿ホテル・eSIM）を比較表直後とページ末に＋BookingEsimCard。逆リンク：where-to-stay-in-tokyo、tokyo-2-day-itinerary、tokyo-disney-tickets。関連カード題名を7ページ＋guides-transport・llms.txt で更新。

## 2026-11-09：/guides/attractions/hakone-day-trip-from-tokyo の順位改善（task-jtk-20261109-R02）

- 2026-11-09 title 変更：「Hakone Day Trip From Tokyo (2026): Freepass vs a Day Tour」→「Hakone Day Trip From Tokyo 2026: Itinerary, Cost, Tours」（H1「Hakone Day Trip From Tokyo (2026): Timed Itinerary, Cost and Tours」、meta も完全一致）。冒頭回答・時刻入りの行程表・始発/終電とロープウェイ営業時間の表・日帰り費用の合計表（大人 ¥11,500）・質問見出し6つ（冬・JR Pass 含む）・FAQ 3問追加。Freepass の料金表と対象交通一覧は削除し hakone-free-pass への文脈リンクに集約（hakone-free-pass は無変更）。主CTA を箱根日帰りツアー（hakoneLoopBusTour）、次に Freepass、続けて KlookTripPrep（hakoneHotels）＋BookingEsimCard。lib/attraction-prices.ts の hakoneFreepass は確認日 2026-11-09・リンク先を hakone-free-pass に変更。関連カード題名を9ページ＋guides-attractions・llms.txt で更新。

## 2026-11-09：/guides/attractions/osaka-attractions-pass の順位改善と Osaka Amazing Pass 旧価格の一掃（task-jtk-20261109-R01）

- 2026-11-09 title 変更：「Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?」→「Osaka Amazing Pass 2026: ¥3,500 Price, Is It Worth It?」。料金を公式現行値（1日 ¥3,500／2日 ¥5,000、伊丹版 ¥3,800／¥5,400、関空28時間券 ¥5,300、osaka-amazing-pass.com 2026-11-09 確認）に修正し、lib/attraction-prices.ts の osakaAmazingPass を更新。冒頭回答・料金表・元が取れる表（5パターン）・1日/2日/Enjoy Eco/ICOCA 比較表・対象施設の通常料金表・空港版・有効化時刻・買い方・対象外施設・FAQ 3問追加・KlookTripPrep（フードツアー・京都奈良ツアー・難波ホテル・ラピート・はるか）＋BookingEsimCard。旧価格（¥2,500／¥3,300）を直したページ：osaka-castle-tickets、umeda-sky-building-tickets、dotonbori-river-cruise（en・ko・zh-tw・zh-cn・th）、things-to-do-osaka、osaka-2-day-itinerary、osaka-kyoto-3-day-itinerary、japan-attraction-ticket-prices、where-to-stay-in-osaka、japan-travel-budget、ic-cards-japan、japan-10-day/14-day、tokyo-kyoto-osaka-7-day、tokyo-to-osaka-shinkansen、関連カード題名（14ページ＋翻訳 usj 4本）。

## 2026-11-08：/guides/transport/haruka-vs-nankai-rapit の現行運賃・比較表・予約ブロック（task-jtk-20261108-03）

- 2026-11-08 title 変更：「Haruka vs Nankai Rapi:t 2026: Which from Kansai Airport?」→「Haruka vs Nankai Rapit 2026: Price, Time, Which to Take」（H1・meta も「Haruka vs Nankai Rapit」完全一致）。旧数値（Rapi:t ¥1,880・約40分、はるか ¥3,060・¥3,640・新大阪60分）を公式現行値（Rapi:t Digital Ticket ¥1,410／最短34分、HARUKA One-way ¥1,600／¥1,900／¥2,700、天王寺30・大阪45・新大阪50・京都75分）に置換。冒頭回答段落・行き先別比較表（確認日付き）・質問見出し5つ・FAQ 8問・KlookTripPrep（はるか・ラピート・関西エリアパス・難波/梅田/京都駅ホテル・eSIM）＋BookingEsimCard。本文リンク：kansai-area-pass、osaka-metro-pass、where-to-stay-in-osaka、where-to-stay-in-kyoto、osaka-kyoto-3-day-itinerary。逆リンク：osaka-metro-pass、where-to-stay-in-kyoto。

## 2026-11-08：/guides/attractions/tokyo-tower-tickets の順位改善（task-jtk-20261108-R04）

- 2026-11-08 title 変更：「Tokyo Tower Tickets (2026): Prices and Which Deck to Buy」→「Tokyo Tower Tickets 2026: Price, Main Deck vs Top Deck」。冒頭回答段落・公式時間/高さ/予約ルール表・日の入り表（NAOJ）・質問見出し化・FAQ 3問追加・予約手順直後に Klook CTA＋GetYourGuide 比較・同日ブロック（KlookTripPrep：ベイ夕日クルーズ・夜ツアー・バス1日ツアー・Subway Ticket・eSIM）。本文リンク：tokyo-illumination-tours、tokyo-bay-cruise、tokyo-3-day-itinerary、tokyo-skytree-tickets、shibuya-sky-tickets。逆リンク：tokyo-bay-cruise（関連カード）。

## 2026-11-08：/guides/attractions/osaka-aquarium-kaiyukan-tickets の順位改善（task-jtk-20261108-R03）

- 2026-11-08 title 変更：「Osaka Aquarium Kaiyukan Tickets (2026): Prices and Slots」→「Osaka Aquarium Kaiyukan Tickets (2026): Price, Hours, Slots」。meta に「Kaiyukan ticket price」「Osaka aquarium tickets」。冒頭回答段落・料金帯を 2026-11-08 公式再確認・公式ルール表（出典URL・確認日付き）・質問見出し4つ・FAQ 2問追加・同日ブロック（KlookTripPrep）。逆リンク：osaka-kyoto-3-day-itinerary、where-to-stay-in-osaka。

## 2026-11-08：/guides/attractions/warner-bros-studio-tour-tokyo-tickets の順位改善（task-jtk-20261108-R02）

- 2026-11-08 title 変更：「Warner Bros. Studio Tour Tokyo Tickets (2026): Prices」→「Harry Potter Studio Tour Tokyo Tickets 2026: Price & Booking」。冒頭回答・公式規定表（払い戻し不可・変更 ¥1,500・年齢区分・入場30分以内・所要3〜4時間、2026-11-08 公式確認）・質問見出し・FAQ 3問追加・同日ブロック（KlookTripPrep）・GetYourGuide 比較ボタンを追加。逆リンク：tokyo-5-day-itinerary、tokyo-itinerary-with-kids。

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
- 2026-11-08（task-jtk-20261108-04）2% チケットページ10本に BookingEsimCard（lead 付き、広告ID 1550210–1550219 を `<ページ>#booking-esim-card` に割当、spare 残0）、うち KlookTripPrep が無かった5本（sanrio-puroland・osaka-castle・tokyo-joypolis・fuji-q-highland・sumo-tokyo）に「Book for the same day」ブロック（既存定数のホテル・ツアー 6.5%／パス・交通 5%）を追加。japan-attraction-ticket-prices・things-to-do-osaka・things-to-do-kyoto は spare 不足で未追加。
- 2026-11-09（task-jtk-20261109-P01）計測：affiliate_click に product_type（esim／klook／other）を追加。eSIM 事業者（Simbye・Airalo・Sakura・Breeze・Holafly・eSIMGo）、k_site に esim を含む Klook、BookingEsimCard（data-cta="booking-esim-card"）内のリンクを esim とする。リンク先・広告ID・本文は変更なし。GA4 でカスタムディメンション product_type の登録が必要。
- 2026-11-09（task-jtk-20261109-C02）task-jtk-20261108-04 で spare 不足のため未追加だった3ページに BookingEsimCard（lead 付き）を追加。japan-attraction-ticket-prices は料金表（グループ別テーブル）の直後、things-to-do-osaka は「The Pass, and Three Days Out」の直後、things-to-do-kyoto は「Buy the Day Pass, Not the Tickets」の直後。広告ID 1554697–1554699 を `<ページ>#booking-esim-card` に割当（spare 残54）。Same day ブロックは対象外。
- 2026-11-10（task-jtk-20261110-R01）/guides/transport/tokyo-wide-pass title：「JR Tokyo Wide Pass (2026): Price and Is It Worth It?」→「JR Tokyo Wide Pass Price (2026): ¥16,000 — Is It Worth It?」。H1・meta 同時変更、2段階の損益表・3日旅程表・Plan B 表・FAQ 3問・同じ旅で予約するもの（6.5%ツアー3本／N'EX 5%／BookingEsimCard）を追加。jr-east-pass・jr-pass-guide から本文内リンク。
- 2026-11-10（task-jtk-20261110-R02）/guides/money/best-travel-card-japan title：「Best Travel Card for Japan (2026): Fees and ATM Limits」→「Best Travel Card for Japan 2026: 6 Cards Compared by Fees」。H1・meta 同時変更、ヘッダーの Updated を月のみ→日付まで（`<time datetime>`）、article:modified_time 追加。Wise 国別表に SG・MY 追加、6カードの短い答え（Does X work in Japan?）、DCC の具体例、FAQ 3問（Starling・Monzo・forex card）、全値を 2026-11-10 に公式で再確認。KlookTripPrep を国別表の直後へ移動。
- 2026-11-10（task-jtk-20261110-R03）/guides/attractions/tokyo-skytree-tickets title：「Tokyo Skytree Tickets (2026): Prices and Floor 350 vs 450」→「Tokyo Skytree Tickets 2026: Price, 350 vs 450 and Booking」。H1・meta 同時変更、冒頭で答え切る段落、質問型見出し（How much / Is the 450m worth it / At the door / Best time）、営業時間・変更取消・当日券・アクセスの公式確認表、FAQ 3問、料金表と選び方の直後に Klook TOKYO SKYTREE CTA（KlookTripPrep はその直後）。¥500 手数料の適用先を「4F窓口・コンビニ」→「4F窓口・券売機」に訂正（全5言語）。翻訳版 title：ko「도쿄 스카이트리 티켓(2026): 요금과 예약」→「도쿄 스카이트리 티켓 가격 2026: 350m vs 450m」（H1 を title と同一文字列に、パンくず末尾を「스카이트리」に）、th「ตั๋ว Tokyo Skytree 2026: ราคา ชั้น 350」→「ราคาตั๋ว Tokyo Skytree: 350 vs 450」、zh-tw「東京晴空塔門票（2026）：票價與樓層選擇」→「東京晴空塔門票價格 2026：350 樓 vs 450 樓與購票」、zh-cn「东京晴空塔门票（2026）：票价与观景台选择」→「东京晴空塔门票价格 2026：350 米 vs 450 米与预订」。
- 2026-11-10（task-jtk-20261110-03）/guides/money/currency-exchange-japan title：「Currency Exchange in Japan 2026 | Japan Travel Kit」→「Currency Exchange in Japan 2026: Airport, City or ATM?」。H1・meta・og・headline 同時変更、冒頭で答え切る段落、両替手段の比較表（成田・羽田・セブン銀行・ゆうちょ・Wise は 2026-11-10 公式確認、Revolut は 11/04 の自サイト値）、質問見出し（Are airport exchange rates bad / Is it better to exchange before / Can I exchange at a Japanese bank）、FAQ 3問。BookingEsimCard＋KlookTripPrep を比較表の直後へ移動し、currencyExchangeTripPrep を N'EX・スカイライナー・リムジンバス・ラピート → Tokyo Subway Ticket・Osaka Amazing Pass → 富士箱根ツアー → 東京駅ホテルの順に。tokyo-trip-cost・best-travel-card-japan から本文内リンク。
- 2026-11-11（task-jtk-20261111-P01）自然検索の流入上位（GSC 28日 10/12〜11/08、英語）で eSIM カードが未設置・末尾のみだった5本に、冒頭の答えの直後（最初の H2 の直前）へ BookingEsimCard を追加：wise-vs-revolut-japan（lead 付き）、tokyo-disney-tickets、tokyo-5-day-itinerary（lead 付き）、tokyo-to-osaka-shinkansen、kimono-rental-japan。広告ID 1554703–1554707 を `<ページ>#booking-esim-card` に割当（spare 残46）。Same day ブロックは5本とも既存（または 6.5% 商品が主）で追加なし。比較は 11/18 に GA4 affiliate_click（product_type=esim、page_path 別）を変更前7日（11/4〜11/10）と比べる。
- 2026-11-11（task-jtk-20261111-R01）/guides/money/tax-free-shopping-japan title：「Japan Tax Free Shopping 2026: Tax Free Japan Refund Rules」→「Japan Tax Free Shopping (Nov 2026): New Refund System」。改善前：Bing 5.08位・CTR2.26%（266表示、10/28 Rank b0acc63 時点）→ 11/04〜11/08 Bing 132表示・1クリック・CTR0.76%・5.86位（japan tax free 19表示・6.84位、tax free japan 3表示・7.33位）、Google 28日 20表示・10.2位・0クリック。H1・meta・og・headline 同時変更、冒頭3文で新制度の流れ（購入時→出国時→返金時期・方法）、出国手順表に「What you need」列、返金手数料・期間の表（観光庁 免税店向けFAQ Q15・Q17・Q19、2026-11-11確認）、質問見出し（How Do You Get the Tax Refund at the Airport? / Can I Get the Refund if I Leave Japan by Ferry? / How Long Does the Tax Refund Take, and Is There a Fee?）、FAQ 4問追加・1問改題。出国手順表の直後に「Book before you leave」（成田・羽田・関空の空港アクセス 5%＋Klook eSIM 20%、taxFreeAirportRunPrep に羽田リムジン・eSIM を追加）。best-travel-card-japan・tokyo-airport-transfer・osaka-airport-transfer・/guides/money ハブから本文内リンク、ハブカードの title・desc も新制度に。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/guides/attractions/teamlab-fukuoka-tickets title：「teamLab Fukuoka Tickets 2026: Price, Hours & Booking」→「teamLab Fukuoka Tickets (2026): Forest Price and Hours」。H1・meta 同時変更、冒頭2文で料金・営業時間・場所（10/29 確認値）と福岡城跡の別展示（teamLab: Digitized Fukuoka Castle Ruins 2026-2027、10/30〜1/11、11/11 確認）、直後に teamLab Forest の Klook ボタン。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/guides/attractions/hiroshima-peace-memorial-tours title：「Hiroshima Peace Memorial Tour: Guides, Museum & Tickets」→「Hiroshima Peace Memorial Tours (2026): Guides and Booking」。H1・meta 同時変更、冒頭に H2「Which Hiroshima Memorial Sites Require Advance Booking?」と答え（資料館の早朝・夜間枠のみ要予約、hpmmuseum.jp 11/11 確認）、ガイドの言語を1文追加。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/guides/attractions/japan-5-day-itinerary title：「Japan 5 Day Itinerary: Tokyo and Kyoto, Day by Day (2026)」→「Japan Itinerary 5 Days (2026): Tokyo and Kyoto Plan」。H1・meta 同時変更、冒頭2文で Day 1〜5 と JR Pass 不要（7日 ¥50,000、japanrailpass.net 11/11 確認）。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/guides/attractions/okinawa-churaumi-aquarium-tickets title：「Okinawa Churaumi Aquarium Tickets 2026: Price, Hours, Access」→「Okinawa Churaumi Aquarium Tickets: ¥2,180, Open 8:30–18:30」。H1・meta 同時変更、冒頭に料金・営業時間の再確認日（churaumi.okinawa 11/11）。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/guides/attractions/himeji-castle-day-trip title：「Himeji Castle Day Trip (2026): ¥2,500 Admission and Times」→「Himeji Castle Day Trip (2026): From Osaka and Kyoto, ¥2,500」。H1・meta 同時変更、入城料 ¥2,500・18歳未満無料・9:00–17:00 を himejicastle.jp で 11/11 再確認と冒頭に明記。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/guides/attractions/sapporo-snow-festival-tours title：「Sapporo Snow Festival Tours (2027): 4–11 Feb, Free Sites」→「Sapporo Snow Festival 2027 Tours: Dates 4–11 Feb, Hotels」。H1・meta 同時変更、冒頭2文で 2027 日程（snowfes.com 11/11 確認）とホテル今・ツアー 12/31 までの予約時期。翻訳版 title：ko「삿포로 눈축제(2027): 2월 4~11일, 무료 행사장」→「삿포로 눈축제 2027 일정: 2월 4~11일, 투어·숙소」、zh-tw「札幌雪祭（2027）：2/4–11 三會場免費，該訂什麼」→「札幌雪祭 2027 日期：2/4–11，行程與訂房」、zh-cn「札幌雪祭（2027）：2/4–11 三会场免费，该订什么」→「札幌雪祭 2027 日期：2/4–11，行程与订房」、th「เทศกาลหิมะซัปโปโร 2027: 4–11 ก.พ.」→「เทศกาลหิมะซัปโปโร 2027: 4–11 ก.พ. ทัวร์」（各 H1・DESC・冒頭文も同方向）。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/guides/transport/osaka-transportation title：「Getting Around Osaka 2026: Subway, Trains & IC Cards」→「Osaka Transportation (2026): Metro, JR and ¥820 Day Pass」。H1・meta・og・headline 同時変更（TITLE/DESCRIPTION 定数化）、冒頭に答えの段落（エンジョイエコカード ¥820／¥620 と Amazing Pass ¥3,500 の使い分け、osaka-metro-pass の 11/04 確認値）。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/guides title：「Japan Travel Guides 2026: All <!-- -->173<!-- --> Guides by Topic」（JSX の子要素分割で本番の <title> にコメントが混入していた）→「Japan Travel Guides 2026: eSIM, Money, Transport, Tickets」（単一文字列に修正）。H1「Japan Travel Guides」→ title と同方向、meta・og・twitter を同時変更、冒頭2文で4カテゴリと人気の答え（eSIM は Simbye、現金は1日 ¥10,000–¥20,000）。canonical は /guides、トップの title とは重複なし。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/zh-cn/guides/attractions title：「日本景点门票攻略（2026）：官方票价、预约方式与一日游」→「日本景点门票价格 2026｜涩谷SKY、teamLab、迪士尼预约指南」。H1・DESC 同時変更、冒頭に主要施設の門票と予約の要否（各確認日付き）。
- 2026-11-11（task-jtk-20261111-R06、順位改善）/guides/money/best-travel-insurance-japan title：「Best Travel Insurance for Japan 2026: Who Needs What, Cost」→「Best Travel Insurance for Japan 2026: Compared, From $15.68」。改善前：GSC 28日 1,595表示・6クリック・CTR0.38%・44.4位（旧URL japan-travel-insurance 332表示・42.1位は 301 済みの残り行で統合は維持、新規 301 なし。スキーは japan-ski-travel-insurance 331表示・16.0位に任せる）。H1・meta 同時変更、冒頭3文で答え（2週間 US$31.36・上限 US$250,000・JNTO ¥7.5M/¥10M）、比較表の1行目に「Best for」＋COVID-19・持病・病院の支払いの行、医療費の節を「How Much Does a Hospital Cost in Japan Without Insurance?」に（JNTO の支払い方法・キャッシュレス、東京都の記述を追加）、表の直下に Last checked: 2026-11-11 と公式URL、FAQ を5問に絞り3問は質問見出し（H3）へ、比較表の直後に SafetyWing ボタン。how-much-yen-to-bring-japan・japan-first-time-itinerary から本文内リンク（逆方向も）。11/6 A24 の除外は本人指示で解除、効果測定はこの日付から。
- 2026-11-11（task-jtk-20261111-C01、CTR 改善・1ページ目 CTR0%）/zh-tw/guides/attractions title：「日本景點門票攻略（2026）：官方票價、預約方式與一日遊」→「日本景點門票價格 2026｜澀谷SKY、teamLab、迪士尼預約指南」。H1・DESC 同時変更、冒頭に主要施設の門票と予約の要否（各確認日付き）。
- 2026-11-11（task-jtk-20261111-R08、順位改善）/guides/attractions/tokyo-disney-tickets title：「Tokyo Disneyland Tickets 2026: Prices, Rules & DisneySea」→「Tokyo Disneyland Tickets 2026: Prices, Where to Buy & Rules」。改善前：GSC 28日 653表示・2クリック・CTR0.31%・19.9位。H1・meta 同時変更、冒頭3文で答え（1-Day Passport ¥8,900／¥7,400／¥5,300〜・日付で変動・門で売らない・2か月前 14:00 JST・ランドとシーの選び方）、「Where Should You Buy」表（1行目＝公式サイト・アプリ、有効期限：公式＝購入日から1年／海外OTA・旅行会社・コンビニ＝入園日から1か月）、「Do You Need Disney Premier Access?」表（Priority Pass は 2026-08-31 終了）、営業時間表に Happy Entry、各表の直下に Last checked と公式URL、FAQ を8問に整理（有効期限・日付変更・Premier Access を追加）、購入先の表の直後に Klook ボタン（既存ID）。/guides/attractions ハブ・teamlab-tokyo-tickets から本文内リンク（逆方向も）。11/6 一括改修の除外は本人指示で解除、効果測定はこの日付から。
- 2026-11-11（task-jtk-20261111-R08、順位改善）/zh-cn/guides/attractions/tokyo-disney-tickets title：「东京迪士尼门票（2026）：迪士尼乐园与迪士尼海洋怎么选、怎么买」→「东京迪士尼门票（2026）：价格、在哪买、乐园与海洋怎么选」。改善前：28日 26表示・1クリック・CTR3.85%・9.0位。英語版と同じ構成（購入先表・Premier Access 表・Happy Entry・FAQ 8問・Last checked）。
- 2026-11-11（task-jtk-20261111-R08、順位改善）/th/guides/attractions/tokyo-disney-tickets title：「ตั๋วดิสนีย์แลนด์โตเกียว 2026: บัตรระบุวัน」→「ตั๋วดิสนีย์แลนด์โตเกียว 2026: ราคาและที่ซื้อ」。改善前：28日 79表示・0クリック・CTR0%・42.9位。H1 は「ตั๋วโตเกียวดิสนีย์แลนด์」（最多検索語）に。英語版と同じ構成。
- 2026-11-11（task-jtk-20261111-R08、順位改善）/zh-tw/guides/attractions/tokyo-disney-tickets title：「東京迪士尼門票（2026）：樂園與海洋怎麼買、怎麼選」→「東京迪士尼門票（2026）：價格、在哪買、樂園與海洋怎麼選」。改善前：28日 23表示・0クリック・CTR0%・53.7位。英語版と同じ構成。
- 2026-11-11（task-jtk-20261111-R08、順位改善）/ko/guides/attractions/tokyo-disney-tickets title：「도쿄 디즈니랜드 티켓(2026): 날짜 지정 예매와 선택」→「도쿄 디즈니랜드 티켓(2026): 가격, 구매처, 랜드·씨 선택」。改善前：28日のページ別データに行なし。英語版と同じ構成。
- 2026-11-11（task-jtk-20261111-R09、順位改善）/guides/attractions/shibuya-sky-tickets title：「Shibuya Sky Tickets 2026: From ¥2,700, Hours & Sunset Slots」→「Shibuya Sky Tickets 2026: ¥2,700 Price, Sunset Slots & Hours」。改善前：GSC 28日 412表示・0クリック・CTR0%・29.4位（主語「shibuya sky tickets」150表示・31.9位、「shibuya sky ticket」72表示・31.7位）。meta 変更（答え＋予約誘導）、冒頭3文で答え（¥2,700／¥3,400・窓口+¥300・2週間前 00:00 JST・日没枠が先に売切れ・10:00–22:30／最終入場21:20・滞在時間の制限なし・平均約90分）、料金表の1行目に結論、営業時間表に「Time limit」「Getting there」行、H3「How Long Should You Spend at Shibuya Sky?」、H3「When Is the Shibuya Sky Sunset Slot Each Month?」＋月別日没表（NAOJ 2026）、各表の直下に Last checked: 2026-11-11 と公式URL（shibuya-scramble-square.com・gotokyo.org・NAOJ）、FAQ に滞在時間を追加、料金表・日没表の直後に Klook ボタン（既存ID）。tokyo-night-food-tour・tokyo-illumination-tours から本文内リンク（逆方向も）。ko・zh-tw・zh-cn・th は同じ構成を追加（title は変更なし：ko 510表示・13.0位、zh-cn 27表示・6.4位、th 15表示・17.3位、zh-tw 10表示・82.7位）。11/6 一括改修の除外は本人指示で解除、効果測定はこの日付から。
- 2026-11-11（task-jtk-20261111-R10、順位改善）/guides/esim/japan-esim-unlimited title：「Unlimited eSIM for Japan 2026: From $19.99 for 7 Days」→「Japan eSIM Unlimited Data 2026: From $19.99 for 7 Days」。H1「Unlimited eSIM for Japan (2026): Prices, Daily Limits & Tethering」→「Unlimited eSIM Japan (2026): Prices, Fair-Use Limits & Tethering」。改善前：GSC 28日 542表示・1クリック・CTR0.18%・50.5位（「japan esim unlimited data」35表示・85.1位、「unlimited esim japan」23表示・84.3位、「unlimited japan esim」23表示・76.2位）。meta 変更（答え＋購入誘導）、冒頭3段落で答え（おすすめ Simbye $19.99/7日・$34.99/15日・$64.99/30日と根拠、無制限が必要な人／不要な人、本当に無制限か）、料金表の1行目に「our pick」、Network 列追加、表の直下に Last checked と公式URL5件、H2「Is an Unlimited eSIM in Japan Really Unlimited?」＋H3（テザリング・通信キャリア）、Holafly の Fair Usage Policy（最大1日の速度制限）・Airalo の24時間リセット（開通から起算）とテザリングが3GBに含まれる点・Sakura の au 無制限（日次の速度制限なし）とテザリング枠を追加（2026-11-11 公式で確認。Simbye 2026-11-05・eSIM Go 2026-10-29 の確認値を継続）、Simbye・Klook eSIM ボタンを表と新H2の直後に。holafly-japan-review・sakura-mobile-review から本文内リンク（逆方向も）。11/6 一括改修の除外は本人指示で解除、効果測定はこの日付から。
- 2026-11-11（task-jtk-20261111-D01、一次データ）/guides/esim/japan-esim-price-tracker 新規：title「Japan eSIM Price Tracker (Nov 2026): 14 Providers per GB」（月はJSONの確認日から自動）。18社を公式で確認し、価格を記録できた14社・231プラン（Airalo・Holafly・eSIM Go・Sakura Mobile・Simbye は毎日自動取得、Ubigi・Nomad・Jetpac・aloSIM・Yesim・Maya Mobile・Mobal・Japan Wireless・eSIM.net は 2026-11-11 手動確認）。Klook・Saily・GigSky・IIJ は価格を取得できず理由付きで掲載。データは data/esim-prices.json の tracker、表とCSV（public/data/japan-esim-prices.csv、prebuild で生成）は lib/esim-tracker-core.js から生成。JPY は ECB 2026-11-10 レート（1 USD = 158.18 JPY）で換算。冒頭に要約（1GB単価最安 aloSIM 50GB/10日 $0.55、各社最安の中央値 $0.90、7日無制限最安 Simbye・Maya $19.99、中央値 $26.50）。7・15・30日・無制限・全件のタブと列ソート（初期は価格順）、Dataset 構造化データ（CC BY 4.0、CSV distribution）、Cite this data、Last checked と更新方針（手動分は毎月1日）。ボタンは Simbye・Sakura Mobile・Klook（広告ID 1554711）、他社は公式 nofollow。best-esim-japan・cheapest-esim-japan・japan-esim-unlimited・japan-esim-data-plans・eSIMハブ・トップから本文内リンク。
- 2026-11-13（task-jtk-20261113-P01）計測：affiliate_click に link_domain（リンク先のホスト名：affiliate.klook.com・simbye.com・airalo.pxf.io 等）を追加。link_domain と既存の link_url は GA4 の定義済みパラメータ名のため、カスタムディメンションを登録しなくても組み込みディメンション「リンク ドメイン」「リンク URL」で送客先別に集計できる（partner・product_type・placement・position は未登録のため報告に出ない）。既存のパラメータ・リンク先・広告ID・本文は変更なし。同日、本番6ページの Klook リンク（aid=119070・aff_adid・k_site のエンコード）と affiliate.klook.com/redirect の 302 を確認し、異常なし。
- 2026-11-11（task-jtk-20261111-D02、一次データ）/guides/attractions/japan-attraction-ticket-prices を公式料金データベースに拡張：title「Japan Attraction Ticket Prices 2026: Official Prices」→「Japan Attraction Ticket Prices 2026: 73 Official Prices」（件数はJSONから自動）。改善前：GSC 28日 80表示・7.3位・CTR2.5%・19施設。データを lib/attraction-prices.ts から data/attraction-prices.json に移し73施設（展望台12・博物館/水族館/動物園/teamLab 21・テーマパーク9・寺社/城/庭園 24・パス/ロープウェイ7）、68施設を 2026-11-11 に公式サイトで確認（Shibuya Sky・teamLab Borderless・Tokyo Disney・teamLab Botanical Osaka・teamLab Forest Fukuoka の5件は公式ページが読めず前回の公式確認値と日付を継続し、その旨を行に明記）。各行に大人・子ども・年齢区分・窓口価格・変動/固定・予約要否・当日券・営業時間・公式の料金改定・前回確認値・確認日・出典URL。価格を記録できなかった7施設（USJ・法隆寺・清水寺・三十三間堂・龍安寺・広島城（閉館）・ランドマーク スカイガーデン（改装休館））は理由付きで別掲。冒頭に要約（有料70施設の大人最安料金の中央値¥1,350、予約必須7、無料3）、「2026年の値上げ」表（公式で確認できた9件：姫路城・万博記念公園・銀閣寺・高台寺・サンリオピューロランド・京都タワー・名古屋城・首里城（11/23予定）・地獄谷野猿公苑（12/1予定））、Dataset 構造化データ（CC BY 4.0、CSV distribution）、public/data/japan-attraction-prices.csv（prebuild で生成）、Cite this data、Last checked と更新方針（毎月1日）。トップの「Official prices checked」は19→73に自動で増加、トップ・Things to Do ハブ・things-to-do-kyoto・things-to-do-osaka から本文内リンク、姫路城・大阪/京都/広島/北海道/3週間の旅程8ページの料金定数を同じJSONから参照に変更。Klook は既存の広告ID・既存商品のみ。
