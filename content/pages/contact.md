---
title: お問い合わせ
hide_title: false
sections:
  - section_id: contact-form
    type: section_form
    content: >-
      興味を持って頂き、ありがとうございます。<br/>
      以下のお問い合わせフォームに記入して頂くか、  
      こちらのメールアドレスにメールを送信してください。[aonoweb@aol.com](mailto:aonoweb@aol.com)
    form_id: contactForm
    form_fields:
      - input_type: text
        name: name
        label: お名前
        default_value: 入力してください
        is_required: true
      - input_type: email
        name: email
        label: メールアドレス
        default_value: 入力してください
        is_required: true
      - input_type: select
        name: subject
        label: 件名
        default_value: 選択してください
        options:
          - お仕事のご相談やご紹介
          - 当サイトの内容に関して
          - その他
      - input_type: textarea
        name: message
        label: メッセージ
        default_value: 入力してください
    #   - input_type: checkbox
    #     name: consent
    #     label: >-
    #       フォームへの入力内容は保存され、連絡のために利用される事に同意します。
    submit_label: 送信
seo:
  title: Contact
  description: This is the contact page
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Contact
      keyName: property
    - name: 'og:description'
      value: This is the contact page
      keyName: property
    - name: 'twitter:card'
      value: summary
    - name: 'twitter:title'
      value: Contact
    - name: 'twitter:description'
      value: This is the contact page
layout: advanced
---
