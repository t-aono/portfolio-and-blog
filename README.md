# Portfolio & Blog

## 概要

- ポートフォリオサイトやブログサイトで利用可能
- フロントエンドは Next.js (SSG / SSR) で構築
- Notion API を利用してコンテンツを取得
- 問い合わせ時のメール送信は SendGrid API を利用
- [Jamstack Themes](https://jamstackthemes.dev) のテンプレート（Nextjs Exto）を利用

## 使い方

### ローカル

- .env を作成して api key を追記
- node v14.15.3
- ライブラリインストール　`yarn install`
- ビルド　`yarn dev`
- トップページ URL 　 http://localhost:300/

- md 編集後に 404 エラーがでた場合  
  マークダウンのインデントがずれているのが原因かも

### コンテンツの編集

- トップページ：SSG  
  `content/pages/index.md` を編集してビルド

- 制作物・ブログ一覧：SSG  
  `content/pages` 配下の該当ファイルを編集してビルド

- 制作物・ブログ詳細：SSR  
  notion 側で編集

### Vercel へのデプロイ

1. branch 作成
2. commit & push
3. GitHub で PR 作成 & merge

- `vercel-ignore-build-step.sh` : main ブランチ以外はプレビューデプロイを無視
- `vercel.json` : Vercel Bot からのプルリクへのコメントをオフに
