# eSIM 検索語とページの対応表

1つの検索意図に1ページを割り当てる。新しい eSIM ページを作る前に、この表で意図が空いているか確認する。

- 作成：2026-11-06（jtk-20261106-A23）
- データ：Search Console のクエリ集計（過去3か月 8/7〜11/3、`_tasks/data-jtk-gsc-queries-20261106.txt`）と、タスク定義のページ別順位（10/7〜11/3）。表の数値は「表示／平均順位」。
- 制約：クエリ×ページのデータは未取得（自動化用Chromeを使えなかった）。クエリがどのページに表示されたかは、URL と検索語の対応から判断した。Chrome が使える環境で出し直して確かめる。

## 意図とページ

| 検索意図 | 主な検索語（表示／順位） | 担当ページ | 判断 |
|---|---|---|---|
| best esim japan | best esim japan 2026（33／19.9） | /guides/esim/best-esim-japan（柱） | 用途別の結論。各ページから集約 |
| cheapest esim japan | cheapest esim japan（47／63.6）、cheapest esim for japan（42／60）、cheapest japan esim（32／69.5） | /guides/esim/cheapest-esim-japan | 価格だけを扱う |
| unlimited | japan esim unlimited data（115／86.1）、esim japan unlimited（45／83.3）、unlimited esim japan（52／84） | /guides/esim/japan-esim-unlimited | 使い放題だけを扱う |
| Reddit | best esim for japan reddit（48／8.9）、klook esim japan reddit（6／8.7） | /guides/esim/best-esim-japan-reddit | 意見のまとめ |
| 必要なデータ量・3／5／7日 | データなし | /guides/esim/japan-esim-data-plans | 3／5／7日の旧URLはここへ301のまま |
| 10日 | esim japan 10 days（54／43.6） | /guides/esim/japan-esim-10-days | 11/1 に復活。維持 |
| 2週間 | データなし | /guides/esim/japan-esim-2-weeks | 維持 |
| 1か月 | データなし | /guides/esim/japan-esim-data-plans | 専用ページなし。今回は作らない |
| iPhone | best esim for japan iphone（46／65.5）、esim japan iphone（30／44.1） | /guides/esim/japan-esim-iphone | 維持 |
| Android | japan esim android（61／51.8）、esim japan android（52／49.2） | /guides/esim/japan-esim-android | 維持 |
| eSIM は使えるか | is esim available in japan（31／76.4）、does japan have esim（29／71.8） | /guides/esim/does-esim-work-in-japan | 維持 |
| 設定方法 | データなし | /guides/esim/how-to-set-up-esim-japan | 維持 |
| ブランド：Sakura | sakura mobile（1,579／7.6）、sakura mobile sim card（139／18.4）、sakura esim（51／19.8） | /guides/esim/sakura-mobile-review | 維持 |
| ブランド：Airalo | airalo japan esim（24／49.5）、ulasan airalo（63／10.7） | /guides/esim/airalo-japan-review | 維持 |
| ブランド：Holafly | holafly's digital simcard for japan（55／30.3） | /guides/esim/holafly-japan-review | ボタンは Simbye |
| ブランド：eSIM Go | データなし | /guides/esim/esim-go-japan-review | 維持 |
| ブランド：Simbye | データなし | /guides/esim/simbye-japan-review | 維持 |
| ブランド：Ubigi | データなし | 担当なし | 提携が無く、ページも無い。今回は作らない |
| ブランド比較 | airalo vs holafly（31／59.2）、holafly vs airalo（25／77） | /guides/esim/airalo-vs-holafly-japan | 他の A vs B の旧URLもここへ301のまま |
| pocket wifi vs esim | データなし | /guides/esim/pocket-wifi-vs-esim-japan | 「どちらにするか」 |
| pocket wifi を借りる | pocket wifi japan（95／55.7）、best pocket wifi japan（61／37.8）、japan pocket wifi（45／56.3） | /guides/esim/best-pocket-wifi-japan | 「どのルーターを借りるか」 |
| 空港でSIMを買う | esim japan airport（45／39.4）、japan esim airport（27／54.2）、japan sim card（54／87）、japan sim card for tourist（37／54.7） | /guides/esim/japan-airport-sim-cards | /sim-cards の301先を今回ここへ変更 |
| SIM か eSIM か | データなし | /guides/esim/japan-sim-card-vs-esim-2026 | 維持 |
| 長期滞在 | データなし | /guides/esim/japan-sim-card-long-term-stay | 90日超の在留者 |
| 留学（在留カードあり） | データなし | /guides/esim/japan-sim-card-for-students | 3か月超の留学生 |
| 留学（短期・旅行者向けeSIM） | データなし | /guides/esim/japan-esim-students | 90日以内 |
| ワーホリ | データなし | /guides/esim/japan-sim-card-working-holiday | 維持 |
| 家族・グループ | データなし | /guides/esim/japan-esim-family-group | 維持 |
| 仕事 | データなし | /guides/esim/japan-esim-business | 維持 |

検索語データの注意：`do most travel esims work on japanese networks?`（29／2.8）は順位が高いがクリック0。does-esim-work-in-japan か best-esim-japan-reddit のどちらに出ているかは未確認。

## 統合しなかった組み合わせ

| 組み合わせ | 判断 | 理由 |
|---|---|---|
| japan-esim-unlimited と best-unlimited-esim-japan | 統合済み | 後者は既に301。順位の行は301前の旧URLの残り |
| airalo-vs-holafly-japan と holafly-vs-esim-go-japan | 統合済み | 後者は既に301 |
| holafly-japan-review と does-holafly-work-in-japan | 統合済み | 後者は既に301 |
| airalo-vs-holafly-japan と holafly-japan-review | 統合しない | 比較とブランド名で意図が違う |
| /wifi-pocket と best-pocket-wifi-japan | 統合済み | 10/19 から301 |
| best-pocket-wifi-japan と pocket-wifi-vs-esim-japan | 統合しない | 「どれを借りるか」と「どちらにするか」で意図が違う。10/9 に統合して失敗し、10/19 に分けた経緯がある |
| japan-esim-students と japan-sim-card-for-students | 統合しない | 短期の旅行者向け eSIM と、在留カードのある留学生の月額プランで対象が違う。前者は Search Console で5〜6位の実績あり（10月、297表示／5.61） |
| 長期滞在・留学・ワーホリの3ページ | 統合しない | 10/30 の新規ページでデータがまだ無い。統合の根拠が無い |

lib/redirects.js の記録のとおり、データなしの統合は9月以降に何度も巻き戻している。クエリ×ページのデータで同じ検索語の取り合いが確認できたら、改めて判断する。

## リダイレクトの変更（2026-11-06）

| 旧URL | 変更前 | 変更後 | 理由 |
|---|---|---|---|
| /sim-cards | /guides/esim/best-esim-japan | /guides/esim/japan-airport-sim-cards | 検索語が物理SIM向け。A20 で空港SIMページが復活した |
| /guides/esim/esim-vs-sim-japan | /guides/esim/best-esim-japan | /guides/esim/japan-sim-card-vs-esim-2026 | 同じ問いに答えるページが現存している |
