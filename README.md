# That Nomad — Remix + Cloudflare Workers Blog

A food & travel blog built with Remix and deployed on Cloudflare Workers.
Content is stored as MDX files in `content/posts/` — no database, no CMS.


## Writing a post

Create a new `.mdx` file in `content/posts/`:

```
content/posts/your-post-slug.mdx
```

Every post needs this frontmatter at the top:

```yaml
---
title: "Your Post Title"
date: "2024-12-01"
tags: [food, travel, recipe]
excerpt: "One or two sentences that appear on the card."
hero: "/images/your-image.jpg"   # optional
heroAlt: "Description of image"  # optional
---

Your post content here in Markdown...
```

The filename becomes the URL: `your-post-slug.mdx` → `/posts/your-post-slug`

## Project structure

```
my-blog/
├── app/
│   ├── root.tsx                  # Global layout
│   ├── routes/
│   │   ├── _index.tsx            # Homepage
│   │   ├── posts.$slug.tsx       # Single post
│   │   ├── category.$tag.tsx     # Tag filter page
│   │   ├── feed[.]xml.tsx        # RSS feed
│   │   └── sitemap[.]xml.tsx     # Sitemap
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx
│   │   └── TagBadge.tsx
│   ├── utils/
│   │   └── posts.server.ts       # All content logic lives here
│   └── styles/
│       └── global.css
├── content/posts/                # Your writing goes here
├── public/images/                # Upload images here
├── wrangler.toml
└── .nvmrc                        # Pins Node 20
```

## Maintenance

Once a year, run:
```bash
npm update
npm run build
```

Check for any TypeScript errors and fix before deploying. That's it.
