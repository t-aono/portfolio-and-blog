---
title: Home
hide_title: true
sections:
  - section_id: hero
    type: section_hero
    title: aono's Portfolio & Blog
    content: ソフトウェアエンジニアをしてるアオノといいます。<br/>
      個人開発したWebアプリケーションやプログラミング関連ブログを公開中です。<br/>
      当サイトは Next.js (SSG/SSR) と Notion API で構築しています。
  - section_id: latest-projects
    type: section_portfolio
    layout_style: mosaic
    title: 最近の個人開発
    actions:
      - label: もっと見る
        url: portfolio
        style: button
  - section_id: abount
    type: section_about
    title: 自己紹介
    content: プログラムを書いたりWebアプリケーションを作るのが好き。<br/>
      よく使うのは PHP / Laravel / JS / Vue.js / React / MySQL など。<br/>
      TypeScript / Next.js も学習中。<br/>
      <br/>
      エンジニア歴は5年くらいで<br/>
      今は、会社員とフリーランスを半々でやっている。<br/>
      <br/>
      経歴<br/>
      2011年 新卒で製薬メーカーに営業職で入社<br/>
      2016年 ITの勉強をした後にエンジニアとして働き始める<br/>
      2017年 Java / VBA を使った保守開発の経験を積む<br/>
      2018年 PHP / JS での開発経験を積む<br/>
      2020年 小規模な会社にて打合せ・設計・実装・テストなどの開発工程を幅広く経験<br/>
      2021年 フリーランスとして Laravel / Vue.js を使った開発も経験<br/>
    actions:
      - label: GitHub
        url: https://github.com/t-aono
        style: button
        icon: github
        new_window: true
  - section_id: latest-posts
    type: section_posts
    title: 最近のブログ記事
    posts_number: 6
    col_number: three
    actions:
      - label: もっとみる
        url: blog
        style: button
seo:
  title: aono's P&B
  description: 個人開発したWebアプリケーションやプログラミング関連ブログを公開
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: aono's web tech
      keyName: property
    - name: 'og:description'
      value: 個人開発したWebアプリケーションやプログラミング関連ブログを公開
      keyName: property
    - name: 'og:image'
      value: images/exto_preview.png
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: aono's web tech
    - name: 'twitter:description'
      value: 個人開発したWebアプリケーションやプログラミング関連ブログを公開
    - name: 'twitter:image'
      value: images/exto_preview.png
      relativeUrl: true
layout: advanced
---
