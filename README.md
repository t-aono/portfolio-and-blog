# Portfolio & Blog

## 概要

Notionに書いた記事をAPIから取得して表示できるポートフォリオサイト

## 機能

- Next.js を使った SSG(Static Site Generation) / SSR(Server-side Rendering)
-  Notion に書いた記事を取得して表示
-  記事のタイトルの検索、カテゴリでの絞り込み
-  お問い合わせフォームからメール送信

## 使用技術
TypeScript / Next.js / SCSS / Notion Database / Notion API / Send Grid API

## デモ

![it6OsIBQvpDSiuA8JPK11651188608-1651188635](https://user-images.githubusercontent.com/46856574/165863919-49407d1d-1881-4d83-8e91-9708b8ce684b.gif)

## 利用方法

事前に Notion の [My Integrations](https://www.notion.so/login) から Notion Api Key を取得してください。  
表示するための記事を Notion Database で作成する必要があります。  

### ローカルでの起動　

1. .env ファイルの作成

   ```
   cp .env.example .env
   ```

2. Notion Api Key と Database ID を .env に入力

3. パッケージのインストールとビルド

   ```
   yarn install
   yarn dev
   ```

4. トップページへアクセス

   ```
   http://localhost:3000
   ```

### コンテンツの編集

- トップページ：SSG  
  `content/pages/index.md` を編集してビルド（ローカルではリロード）

- 記事の一覧ページ：SSG  
  `content/pages` 配下のファイルを編集してビルド（ローカルではリロード）

- 記事の詳細ページ：SSR  
  Notion側で内容の変更

### Vercelへのデプロイ

1. ブランチの作成
2. commit と push
3. GitHubでPR作成してマージ

- `vercel-ignore-build-step.sh`: main ブランチ以外の preview deployment を無視
- `vercel.json`: Vercel Bot からのプルリクコメントをオフ
