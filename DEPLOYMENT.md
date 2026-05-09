# Site Notes

## Stack

- Next.js 16, React 19, Tailwind CSS 4
- Node 24.x (vendored at `node_modules/node-bin-darwin-arm64/bin/node`)
- MDX for blog posts via `next-mdx-remote`
- Vercel CLI 53 (vendored)

Use npm scripts from the project root.

## Adding photos

1. Drop the originals into `public/photos/`. This folder is **gitignored** —
   originals stay on your machine.
2. Generate web-sized copies into `public/gallery/` (max 2400px on the long
   edge, ~80% JPEG quality) and thumbnails into `public/gallery/thumbs/`. The
   easiest way is `sips` on macOS:
   ```bash
   cd public/photos
   for f in IMG_*.jpg; do
     sips -Z 2400 -s format jpeg -s formatOptions 80 "$f" --out "../gallery/$f" >/dev/null
     sips -Z 800  -s format jpeg -s formatOptions 70 "$f" --out "../gallery/thumbs/$f" >/dev/null
   done
   ```
3. Append an entry to `src/app/data.js`:
   ```js
   { id: "IMG_1234", title: "Frame title", subject: "Bengal Tiger", place: "Ranthambore", width: 2400, height: 1600 }
   ```
   Mark the photo with `featured: true` to surface it on the home page.
4. Commit + push. Vercel auto-deploys.

## Writing a blog post

Posts are MDX files in `content/posts/<slug>.mdx`. Frontmatter shape:

```mdx
---
title: A trip back to the lakes
date: 2026-04-21
location: Bharatpur
summary: One sentence shown on the blog index and the home page.
cover: /gallery/IMG_0198.jpg
tags: ["Birds", "Travel", "Field notes"]
---

Body of the post in Markdown / MDX. Headings, **bold**, _italic_, lists,
> blockquotes, and embedded photographs all work.
```

The post will show up at `/blog/<slug>` automatically — no code to touch.
Drop a `cover` image into `public/gallery/` and reference it as
`/gallery/<filename>.jpg`.

## Vercel

```bash
npm run vercel -- login
npm run vercel -- link
npm run vercel -- deploy --prod
```

Team: `affaankidwai's projects` (`team_ECRF9LTtHK4QPA5N47uyoVaw`).

## Hostinger Domain

The domain `affaankidwai.com` is owned through Hostinger. Add it to the
Vercel project after deployment:

```bash
npm run vercel -- domains add affaankidwai.com <project-name>
npm run vercel -- domains add www.affaankidwai.com <project-name>
```

Then update DNS in Hostinger:

- Apex/root `affaankidwai.com`: `A` record pointing to `76.76.21.21`
- `www.affaankidwai.com`: `CNAME` pointing to `cname.vercel-dns.com`

## Git setup

There are two `.git` directories at the project root:

- `.git/` — initial create-next-app state, no remote.
- `.git-push/` — the working remote pointing at
  `github.com/affaankidwai/affaankidwai.com.git`.

To run a real `git` command against the deploy repo, use:

```bash
git --git-dir=.git-push --work-tree=. <command>
```

For example:

```bash
git --git-dir=.git-push --work-tree=. status
git --git-dir=.git-push --work-tree=. add .
git --git-dir=.git-push --work-tree=. commit -m "..."
git --git-dir=.git-push --work-tree=. push
```

(Cleaning these into a single `.git/` is a future tidy-up, not urgent.)
