# japan-travel-kit — Claude 作業ガイド

Next.js（Pages Router / TypeScript）製の日本旅行情報サイト。eSIM・交通・お金まわりのガイド記事を配信する。

---

## ファイル配置（ハイブリッド構成 / 2026-06-01 整理）

このプロジェクトは記事ソースもコードとして管理しているため、**参照資料・成果物の分割は無く、ほぼ全てが (a) 作業ファイル**。

| 区分 | 場所 | 内容 |
|------|------|------|
| (a) 作業ファイル | `C:\claude-workspace\projects\japan-travel-kit\`（ここ） | コード一式（pages / components / lib / styles / scripts / public）、設定ファイル、`.git` |
| (b) 参照資料 | （該当なし） | 別管理の参照素材は無し |
| (c) 成果物 | （該当なし） | デプロイ先（本番サイト）が成果物。別途ファイルとしては保持しない |
| (d) 一時/再生成可能 | ローカルのまま（コピーしない） | `node_modules\`、`.next\` |

### メモ
- ガイド記事の本文は `lib\guides-*.ts`（esim / money / transport）と `pages\guides\**` に
  TypeScript / TSX として格納されている（MDXの外部ファイルではない）。
- 画像・アイコン・favicon・sitemap.xml は `public\` 配下でコード扱い（作業ファイル）。
- `node_modules` はこのフォルダに無い。初回は `npm install` で再生成する。
- `.next\` はビルドキャッシュ。再生成可能。

---

## 元データの所在（整理元・削除しないこと）
- 整理前の元フォルダ: `C:\Users\tanou\japan-travel-kit\`（**まだ削除していない**。確認後に手動削除する）
