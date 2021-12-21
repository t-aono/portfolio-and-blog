---
title: Home
hide_title: true
sections:
    - section_id: hero
      type: section_hero
      title: Welcome to aono's web tech !!
      content: サイトをご覧いただきありがとうございます。制作物などを公開しています。
    - section_id: latest-projects
      type: section_portfolio
      layout_style: mosaic
      title: 最近の制作物
      view_all_label: もっと見る
      view_all_url: portfolio
    - section_id: abount
      type: section_about
      title: 自己紹介
      actions:
          - label: スキルシートを見る
            url: skillsheet
            style: button
    - section_id: latest-posts
      type: section_posts
      title: 最近書いたブログ記事
      posts_number: 3
      col_number: three
      actions:
          - label: ブログを見る
            url: blog
            style: button
seo:
    title: t-aono Portfolio & Blog
    description: aonoによるWeb技術を公開
    extra:
        - name: 'og:type'
          value: website
          keyName: property
        - name: 'og:title'
          value: aono's web tech
          keyName: property
        - name: 'og:description'
          value: aonoによるWeb技術を公開
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
          value: aonoによるWeb技術を公開
        - name: 'twitter:image'
          value: images/exto_preview.png
          relativeUrl: true
layout: advanced
---
