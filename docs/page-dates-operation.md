# 更新日（dateModified・Updated 表示・sitemap lastmod）の運用メモ

task-jtk-20261108-05 で決めた方式。今後のタスクはこれに従う。

- 方式：ビルド時に git 履歴を取得する。`prebuild` の先頭で `scripts/ensure-git-history.js` が shallow clone を `git fetch --unshallow`（remote が無ければ公開リポジトリの URL）で完全履歴にし、`lib/page-dates.js` が各ページの最終 commit 日を `git log` から読む。失敗時はビルドを止めず `data/page-dates.json` にフォールバックする。
- 日次タスクの運用：ページ本文を変えて commit・push すれば、その commit 日が本番の dateModified になる。`data/page-dates.json`・`data/page-published.json`・`public/sitemap.xml` の再生成分は従来どおりコミットしない（手作業で日付を書き換えない）。
- 確認：デプロイ後に本番 HTML の Article JSON-LD `dateModified` が直近 commit 日と一致するかを見る（例：/guides/attractions/tokyo-go-kart）。Vercel のビルドログに `ensure-git-history: unshallowed` が出ていれば正常、`still shallow` なら方式(2)（変更ページだけ page-dates.json を更新してコミット）への切り替えを検討する。
