# Portfolio & Blog

## Overview

Site for publishing portfolios and blogs.

## Description

- The front end is built with Next.js (SSG / SSR)
- Get content using Notion API
- Use SendGrid API to send emails when making inquiries

## Demo

![it6OsIBQvpDSiuA8JPK11651188608-1651188635](https://user-images.githubusercontent.com/46856574/165863919-49407d1d-1881-4d83-8e91-9708b8ce684b.gif)

<!-- ## VS. -->

## Requirement

- node v14.15.3
- Notion Api Key
- Notion Database (portfolio and blog)

## Usage

### Launch locally

1. create `.env` file

   ```
   cp .env.example .env
   ```

2. added Notion Api Key and Database ID

3. package installation and build

   ```
   yarn install
   yarn dev
   ```

4. access the top page

   ```
   http://localhost:300/
   ```

### Editing content

- Top page：SSG  
  edit and build `content / pages / index.md`

- List page：SSG  
  edit and build the corresponding file under `content / pages`

- Detail page：SSR  
  edit on the notion side

### Deploy to Vercel

1. Create a branch
2. commit & push
3. Create PR on GitHub & merge

- `vercel-ignore-build-step.sh`: Ignore preview deployment except for main branch
- `vercel.json`: Turn off comments to pull requests from Vercel Bot

<!-- ## Install -->

<!-- ## Contribution -->

<!-- ## Licence -->

## Author

[t-aono](https://github.com/t-aono)

<!-- README.md Sample -->
<!-- https://deeeet.com/writing/2014/07/31/readme/ -->
