# 報酬リンク監査

`npm run build` 後に `node scripts/check-revenue-links.mjs --write` で生成。手で編集しない。

数えるのは .next/server/pages の HTML の `<a href>` のみ（JSON-LD と __NEXT_DATA__ は数えない）。
対象：affiliate.klook.com の aff_adid 付き redirect、getyourguide.com（partner_id=EFTLTCP）、airalo.pxf.io、
breezesim.com の sca_ref、p.sakuramobile.jp/idevaffiliate.php、wise.prf.hn、
safetywing.com/nomad-insurance（referenceID=26614156）、Simbye（ref=eqvmffxd）。
/404 と /500 はエラーページのため対象外。

全 207 ページ：0本 0／1本 1／2本以上 206

## 0本のページ（0）

（該当なし）

## 1本だけのページ（1）

| ページURL | 報酬リンク本数 | リンク先 |
| --- | --- | --- |
| /guides/esim/esim-go-japan-review | 1 | Breeze ×1 |

## 2本以上のページ（206）

| ページURL | 報酬リンク本数 | リンク先 |
| --- | --- | --- |
| /about | 2 | Klook ×2 |
| /disclaimer | 2 | Klook ×2 |
| /guides/esim | 2 | Klook ×2 |
| /guides/esim/airalo-japan-review | 2 | Airalo ×2 |
| /guides/esim/holafly-japan-review | 2 | Airalo ×2 |
| /guides/money/safetywing-vs-heymondo-japan | 2 | SafetyWing ×2 |
| /guides/transport/kyoto-subway-bus-pass | 2 | Klook ×2 |
| /guides/transport/tokyo-to-kyoto | 2 | Klook ×2 |
| /privacy-policy | 2 | Klook ×2 |
| /zh-cn/guides/attractions | 2 | Klook ×2 |
| /zh-tw/guides/attractions | 2 | Klook ×2 |
| /guides/attractions | 3 | Klook ×3 |
| /guides/esim/airalo-vs-holafly-japan | 3 | Airalo ×3 |
| /guides/esim/how-to-set-up-esim-japan | 3 | Airalo ×1, Breeze ×1, Sakura Mobile ×1 |
| /guides/esim/japan-esim-family-group | 3 | Airalo ×2, Breeze ×1 |
| /guides/transport | 3 | Klook ×3 |
| /guides/transport/shinkansen-guide | 3 | Klook ×3 |
| /guides | 4 | Klook ×4 |
| /guides/attractions/sanrio-puroland-tickets | 4 | Klook ×4 |
| /guides/attractions/sumo-tokyo-tickets | 4 | Klook ×4 |
| /guides/attractions/things-to-do-osaka | 4 | Klook ×2, GetYourGuide ×2 |
| /guides/attractions/tokyo-go-kart | 4 | Klook ×4 |
| /guides/attractions/tokyo-tower-tickets | 4 | Klook ×4 |
| /guides/attractions/warner-bros-studio-tour-tokyo-tickets | 4 | Klook ×4 |
| /guides/esim/best-pocket-wifi-japan | 4 | Klook ×4 |
| /guides/esim/sakura-mobile-review | 4 | Klook ×1, Sakura Mobile ×3 |
| /guides/money | 4 | Klook ×1, Wise ×2, SafetyWing ×1 |
| /guides/money/atms-in-japan | 4 | Klook ×3, Wise ×1 |
| /guides/money/best-travel-insurance-japan | 4 | SafetyWing ×4 |
| /guides/transport/haruka-vs-nankai-rapit | 4 | Klook ×4 |
| /guides/attractions/hiroshima-miyajima-day-trip | 5 | Klook ×5 |
| /guides/attractions/kamakura-day-trip | 5 | Klook ×5 |
| /guides/attractions/nikko-day-trip | 5 | Klook ×5 |
| /guides/attractions/things-to-do-kyoto | 5 | Klook ×3, GetYourGuide ×2 |
| /guides/attractions/tokyo-subway-ticket | 5 | Klook ×5 |
| /guides/esim/japan-esim-android | 5 | Airalo ×2, Breeze ×2, Sakura Mobile ×1 |
| /guides/esim/japan-esim-business | 5 | Airalo ×1, Breeze ×2, Sakura Mobile ×2 |
| /guides/esim/pocket-wifi-vs-esim-japan | 5 | Klook ×3, Airalo ×1, Breeze ×1 |
| /guides/money/cash-vs-card-japan | 5 | Klook ×3, Airalo ×1, Wise ×1 |
| / | 6 | Klook ×6 |
| /guides/attractions/hakone-day-trip-from-tokyo | 6 | Klook ×6 |
| /guides/attractions/osaka-attractions-pass | 6 | Klook ×6 |
| /guides/attractions/things-to-do-tokyo | 6 | Klook ×4, GetYourGuide ×2 |
| /guides/esim/does-esim-work-in-japan | 6 | Klook ×2, Airalo ×3, Breeze ×1 |
| /guides/esim/japan-esim-students | 6 | Airalo ×2, Sakura Mobile ×1, Simbye ×3 |
| /guides/esim/japan-esim-unlimited | 6 | Airalo ×3, Sakura Mobile ×1, Simbye ×2 |
| /guides/esim/japan-sim-card-vs-esim-2026 | 6 | Airalo ×2, Breeze ×2, Sakura Mobile ×2 |
| /guides/money/currency-exchange-japan | 6 | Klook ×4, Wise ×2 |
| /ko | 6 | Klook ×6 |
| /th | 6 | Klook ×6 |
| /zh-cn | 6 | Klook ×6 |
| /zh-cn/guides/attractions/things-to-do-tokyo | 6 | Klook ×4, GetYourGuide ×2 |
| /zh-tw | 6 | Klook ×6 |
| /zh-tw/guides/attractions/things-to-do-tokyo | 6 | Klook ×4, GetYourGuide ×2 |
| /guides/attractions/asakusa-kimono-rental | 7 | Klook ×7 |
| /guides/attractions/fuji-q-highland-tickets | 7 | Klook ×7 |
| /guides/attractions/teamlab-borderless-tickets | 7 | Klook ×4, GetYourGuide ×3 |
| /guides/attractions/tokyo-bay-cruise | 7 | Klook ×7 |
| /guides/attractions/tsukiji-market-food-tour | 7 | Klook ×7 |
| /guides/esim/japan-esim-iphone | 7 | Klook ×2, Airalo ×3, Breeze ×1, Sakura Mobile ×1 |
| /guides/money/best-travel-card-japan | 7 | Klook ×4, Wise ×3 |
| /guides/transport/osaka-airport-transfer | 7 | Klook ×7 |
| /guides/transport/tokyo-transportation | 7 | Klook ×7 |
| /ko/guides/attractions/teamlab-borderless-tickets | 7 | Klook ×4, GetYourGuide ×3 |
| /th/guides/attractions/teamlab-borderless-tickets | 7 | Klook ×4, GetYourGuide ×3 |
| /zh-cn/guides/attractions/teamlab-borderless-tickets | 7 | Klook ×4, GetYourGuide ×3 |
| /zh-tw/guides/attractions/teamlab-borderless-tickets | 7 | Klook ×4, GetYourGuide ×3 |
| /guides/attractions/hakone-free-pass | 8 | Klook ×8 |
| /guides/attractions/kawaguchiko-day-trip-from-tokyo | 8 | Klook ×8 |
| /guides/attractions/mt-fuji-day-trip-tokyo | 8 | Klook ×6, GetYourGuide ×2 |
| /guides/attractions/samurai-ninja-experience-tokyo | 8 | Klook ×5, GetYourGuide ×3 |
| /guides/attractions/tokyo-cooking-class | 8 | Klook ×4, GetYourGuide ×4 |
| /guides/attractions/tokyo-food-tour | 8 | Klook ×4, GetYourGuide ×4 |
| /guides/attractions/tokyo-joypolis-tickets | 8 | Klook ×8 |
| /guides/esim/japan-esim-2-weeks | 8 | Airalo ×3, Breeze ×2, Sakura Mobile ×1, Simbye ×2 |
| /guides/money/how-much-yen-to-bring-japan | 8 | Klook ×7, Wise ×1 |
| /guides/money/revolut-card-japan | 8 | Klook ×8 |
| /guides/transport/osaka-transportation | 8 | Klook ×8 |
| /guides/attractions/tea-ceremony-japan | 9 | Klook ×4, GetYourGuide ×5 |
| /guides/esim/japan-esim-10-days | 9 | Klook ×4, Airalo ×2, Breeze ×1, Simbye ×2 |
| /guides/money/contactless-payment-japan | 9 | Klook ×9 |
| /guides/transport/ic-cards-japan | 9 | Klook ×9 |
| /guides/transport/tokyo-airport-limousine-bus | 9 | Klook ×9 |
| /guides/attractions/nara-day-trip | 10 | Klook ×6, GetYourGuide ×4 |
| /guides/transport/skyliner-vs-nex | 10 | Klook ×10 |
| /guides/attractions/kimono-rental-japan | 11 | Klook ×6, GetYourGuide ×5 |
| /guides/attractions/tokyo-skytree-tickets | 11 | Klook ×9, GetYourGuide ×2 |
| /guides/esim/best-esim-japan-reddit | 11 | Klook ×4, Airalo ×5, Breeze ×1, Simbye ×1 |
| /guides/esim/japan-home-internet-for-foreigners | 11 | Klook ×5, Sakura Mobile ×6 |
| /ko/guides/attractions/tokyo-skytree-tickets | 11 | Klook ×9, GetYourGuide ×2 |
| /th/guides/attractions/tokyo-skytree-tickets | 11 | Klook ×9, GetYourGuide ×2 |
| /zh-cn/guides/attractions/tokyo-skytree-tickets | 11 | Klook ×9, GetYourGuide ×2 |
| /zh-tw/guides/attractions/tokyo-skytree-tickets | 11 | Klook ×9, GetYourGuide ×2 |
| /guides/attractions/arima-onsen-day-trip | 12 | Klook ×12 |
| /guides/attractions/karuizawa-day-trip-from-tokyo | 12 | Klook ×12 |
| /guides/attractions/osaka-aquarium-kaiyukan-tickets | 12 | Klook ×12 |
| /guides/attractions/teamlab-botanical-garden-osaka-tickets | 12 | Klook ×12 |
| /guides/attractions/tokyo-observation-decks | 12 | Klook ×8, GetYourGuide ×4 |
| /guides/esim/japan-phone-number-for-foreigners | 12 | Klook ×5, Sakura Mobile ×6, Wise ×1 |
| /guides/esim/japan-sim-card-long-term-stay | 12 | Klook ×6, Sakura Mobile ×6 |
| /guides/esim/simbye-japan-review | 12 | Simbye ×12 |
| /guides/money/wise-card-japan | 12 | Klook ×6, Wise ×6 |
| /guides/transport/jr-pass-guide | 12 | Klook ×12 |
| /guides/transport/osaka-metro-pass | 12 | Klook ×12 |
| /guides/attractions/osaka-castle-tickets | 13 | Klook ×13 |
| /guides/attractions/teamlab-tokyo-tickets | 13 | Klook ×10, GetYourGuide ×3 |
| /guides/attractions/where-to-stay-in-kyoto | 13 | Klook ×13 |
| /guides/attractions/where-to-stay-in-osaka | 13 | Klook ×13 |
| /guides/esim/cheapest-esim-japan | 13 | Klook ×2, Airalo ×3, Breeze ×2, Sakura Mobile ×2, Simbye ×4 |
| /guides/esim/japan-sim-card-for-students | 13 | Klook ×7, Sakura Mobile ×6 |
| /guides/esim/japan-sim-card-working-holiday | 13 | Klook ×7, Sakura Mobile ×6 |
| /guides/transport/jr-east-pass | 13 | Klook ×13 |
| /ko/guides/attractions/teamlab-tokyo-tickets | 13 | Klook ×10, GetYourGuide ×3 |
| /th/guides/attractions/teamlab-tokyo-tickets | 13 | Klook ×10, GetYourGuide ×3 |
| /zh-cn/guides/attractions/teamlab-tokyo-tickets | 13 | Klook ×10, GetYourGuide ×3 |
| /zh-tw/guides/attractions/teamlab-tokyo-tickets | 13 | Klook ×10, GetYourGuide ×3 |
| /guides/attractions/himeji-castle-day-trip | 14 | Klook ×14 |
| /guides/attractions/kyoto-nara-day-tour-from-osaka | 14 | Klook ×10, GetYourGuide ×4 |
| /guides/attractions/mt-fuji-day-tour-from-tokyo | 14 | Klook ×10, GetYourGuide ×4 |
| /guides/attractions/sagano-romantic-train-tickets | 14 | Klook ×11, GetYourGuide ×3 |
| /guides/attractions/where-to-stay-in-tokyo | 14 | Klook ×14 |
| /guides/money/japan-travel-budget | 14 | Klook ×14 |
| /guides/money/wise-vs-revolut-japan | 14 | Klook ×8, Wise ×6 |
| /guides/transport/hokkaido-rail-pass | 14 | Klook ×14 |
| /guides/transport/hokuriku-arch-pass | 14 | Klook ×14 |
| /guides/transport/tokyo-to-kanazawa | 14 | Klook ×14 |
| /guides/transport/tokyo-wide-pass | 14 | Klook ×14 |
| /zh-cn/guides/attractions/mt-fuji-day-tour-from-tokyo | 14 | Klook ×10, GetYourGuide ×4 |
| /zh-tw/guides/attractions/mt-fuji-day-tour-from-tokyo | 14 | Klook ×10, GetYourGuide ×4 |
| /guides/attractions/kyoto-kimono-rental | 15 | Klook ×15 |
| /guides/attractions/tokyo-disney-tickets | 15 | Klook ×10, GetYourGuide ×5 |
| /guides/esim/best-esim-japan | 15 | Klook ×4, Airalo ×4, Breeze ×2, Sakura Mobile ×2, Simbye ×3 |
| /guides/money/tax-free-shopping-japan | 15 | Klook ×14, Wise ×1 |
| /ko/guides/attractions/tokyo-disney-tickets | 15 | Klook ×10, GetYourGuide ×5 |
| /ko/guides/esim/best-esim-japan | 15 | Klook ×4, Airalo ×4, Breeze ×2, Sakura Mobile ×2, Simbye ×3 |
| /th/guides/attractions/tokyo-disney-tickets | 15 | Klook ×10, GetYourGuide ×5 |
| /th/guides/esim/best-esim-japan | 15 | Klook ×4, Airalo ×4, Breeze ×2, Sakura Mobile ×2, Simbye ×3 |
| /zh-cn/guides/attractions/tokyo-disney-tickets | 15 | Klook ×10, GetYourGuide ×5 |
| /zh-cn/guides/esim/best-esim-japan | 15 | Klook ×4, Airalo ×4, Breeze ×2, Sakura Mobile ×2, Simbye ×3 |
| /zh-tw/guides/attractions/tokyo-disney-tickets | 15 | Klook ×10, GetYourGuide ×5 |
| /zh-tw/guides/esim/best-esim-japan | 15 | Klook ×4, Airalo ×4, Breeze ×2, Sakura Mobile ×2, Simbye ×3 |
| /guides/attractions/dotonbori-river-cruise | 16 | Klook ×16 |
| /guides/attractions/kansai-area-pass | 16 | Klook ×16 |
| /guides/attractions/okinawa-churaumi-aquarium-tickets | 16 | Klook ×14, GetYourGuide ×2 |
| /guides/money/japan-ski-travel-insurance | 16 | Klook ×11, SafetyWing ×5 |
| /guides/transport/kintetsu-rail-pass | 16 | Klook ×16 |
| /guides/transport/kyoto-transportation | 16 | Klook ×16 |
| /guides/transport/osaka-to-hiroshima-shinkansen | 16 | Klook ×16 |
| /guides/transport/tokyo-to-hiroshima-shinkansen | 16 | Klook ×16 |
| /ko/guides/attractions/dotonbori-river-cruise | 16 | Klook ×16 |
| /th/guides/attractions/dotonbori-river-cruise | 16 | Klook ×16 |
| /zh-cn/guides/attractions/dotonbori-river-cruise | 16 | Klook ×16 |
| /zh-tw/guides/attractions/dotonbori-river-cruise | 16 | Klook ×16 |
| /guides/attractions/akihabara-anime-tour | 17 | Klook ×17 |
| /guides/attractions/jigokudani-snow-monkey-tour | 17 | Klook ×17 |
| /guides/attractions/umeda-sky-building-tickets | 17 | Klook ×17 |
| /guides/attractions/hiroshima-peace-memorial-tours | 18 | Klook ×18 |
| /guides/attractions/kyoto-day-trip-from-tokyo | 18 | Klook ×18 |
| /guides/attractions/legoland-japan-tickets | 18 | Klook ×13, GetYourGuide ×5 |
| /guides/attractions/shibuya-sky-tickets | 18 | Klook ×15, GetYourGuide ×3 |
| /guides/transport/kyoto-to-tokyo-shinkansen | 18 | Klook ×18 |
| /guides/transport/tokyo-to-nagoya-shinkansen | 18 | Klook ×18 |
| /guides/transport/tokyo-to-osaka-shinkansen | 18 | Klook ×18 |
| /ko/guides/attractions/shibuya-sky-tickets | 18 | Klook ×15, GetYourGuide ×3 |
| /th/guides/attractions/shibuya-sky-tickets | 18 | Klook ×15, GetYourGuide ×3 |
| /zh-cn/guides/attractions/shibuya-sky-tickets | 18 | Klook ×15, GetYourGuide ×3 |
| /zh-tw/guides/attractions/shibuya-sky-tickets | 18 | Klook ×15, GetYourGuide ×3 |
| /guides/attractions/teamlab-fukuoka-tickets | 20 | Klook ×20 |
| /guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo | 21 | Klook ×21 |
| /guides/attractions/ghibli-park-tickets | 21 | Klook ×15, GetYourGuide ×6 |
| /guides/attractions/gion-night-walking-tour | 21 | Klook ×21 |
| /guides/attractions/kobe-day-trip-from-osaka | 21 | Klook ×21 |
| /guides/attractions/otaru-day-trip-from-sapporo | 21 | Klook ×21 |
| /guides/transport/tokyo-airport-transfer | 21 | Klook ×21 |
| /zh-cn/guides/transport/tokyo-airport-transfer | 21 | Klook ×21 |
| /zh-tw/guides/transport/tokyo-airport-transfer | 21 | Klook ×21 |
| /guides/attractions/takayama-shirakawago-tour | 22 | Klook ×22 |
| /guides/attractions/tokyo-3-day-itinerary | 22 | Klook ×18, GetYourGuide ×4 |
| /guides/attractions/fushimi-inari-tour | 23 | Klook ×23 |
| /guides/attractions/teamlab-kyoto-tickets | 23 | Klook ×17, GetYourGuide ×6 |
| /guides/attractions/niseko-ski-tours | 24 | Klook ×24 |
| /guides/attractions/sapporo-snow-festival-tours | 24 | Klook ×24 |
| /guides/attractions/osaka-food-tour | 25 | Klook ×25 |
| /guides/attractions/tokyo-night-food-tour | 25 | Klook ×25 |
| /guides/attractions/japan-matcha-experiences | 26 | Klook ×26 |
| /guides/attractions/tokyo-illumination-tours | 27 | Klook ×20, GetYourGuide ×7 |
| /guides/attractions/okinawa-day-tours | 28 | Klook ×28 |
| /guides/attractions/usj-tickets-express-pass | 28 | Klook ×23, GetYourGuide ×5 |
| /ko/guides/attractions/usj-tickets-express-pass | 28 | Klook ×23, GetYourGuide ×5 |
| /th/guides/attractions/usj-tickets-express-pass | 28 | Klook ×23, GetYourGuide ×5 |
| /zh-cn/guides/attractions/usj-tickets-express-pass | 28 | Klook ×23, GetYourGuide ×5 |
| /zh-tw/guides/attractions/usj-tickets-express-pass | 28 | Klook ×23, GetYourGuide ×5 |
| /guides/attractions/kyoto-2-day-itinerary | 29 | Klook ×29 |
| /guides/attractions/osaka-2-day-itinerary | 30 | Klook ×27, GetYourGuide ×3 |
| /guides/attractions/tokyo-itinerary-with-kids | 30 | Klook ×29, GetYourGuide ×1 |
| /guides/attractions/japan-attraction-ticket-prices | 32 | Klook ×32 |
| /guides/attractions/tokyo-5-day-itinerary | 34 | Klook ×27, GetYourGuide ×7 |
| /guides/attractions/japan-5-day-itinerary | 36 | Klook ×34, GetYourGuide ×2 |
| /guides/attractions/osaka-kyoto-3-day-itinerary | 38 | Klook ×35, GetYourGuide ×3 |
| /guides/attractions/hokkaido-7-day-itinerary | 46 | Klook ×46 |
| /guides/attractions/japan-first-time-itinerary | 46 | Klook ×44, GetYourGuide ×2 |
| /guides/attractions/tokyo-kyoto-osaka-7-day-itinerary | 53 | Klook ×43, GetYourGuide ×10 |
| /guides/attractions/japan-14-day-itinerary | 57 | Klook ×53, GetYourGuide ×4 |
| /guides/esim/japan-esim-data-plans | 68 | Klook ×4, Airalo ×20, Breeze ×17, Sakura Mobile ×13, Simbye ×14 |
| /guides/attractions/japan-winter-itinerary | 69 | Klook ×69 |
| /guides/attractions/japan-10-day-itinerary | 71 | Klook ×57, GetYourGuide ×14 |
