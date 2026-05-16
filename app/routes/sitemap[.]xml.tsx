import { getAllPosts } from "~/utils/posts.server";

const SITE_URL = "https://my-blog.workers.dev"; // update to your domain

export async function loader() {
  const posts = await getAllPosts();

  const urls = [
    `<url><loc>${SITE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    ...posts.map(
      (post) =>
        `<url><loc>${SITE_URL}/posts/${post.slug}</loc><lastmod>${post.frontmatter.date}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
  ].join("\n  ");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
