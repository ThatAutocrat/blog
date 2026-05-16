/**
 * posts.server.ts
 * Reads and parses all MDX files from content/posts/
 * This is the single source of truth for all post data.
 */

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  hero?: string;
  heroAlt?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
}

/**
 * Parse frontmatter from raw MDX string.
 * Avoids a dependency on external parsers for longevity.
 */
function parseFrontmatter(raw: string): { frontmatter: PostFrontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error("No frontmatter found");
  }

  const yamlStr = match[1];
  const body = match[2].trim();

  const frontmatter: Partial<PostFrontmatter> = {};

  for (const line of yamlStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();

    if (key === "tags") {
      // parse inline array: [food, travel] or ["food", "travel"]
      frontmatter.tags = value
        .replace(/[\[\]"']/g, "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (key === "title" || key === "date" || key === "excerpt" || key === "hero" || key === "heroAlt") {
      frontmatter[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return {
    frontmatter: frontmatter as PostFrontmatter,
    body,
  };
}

/**
 * Load all posts. Uses Vite's import.meta.glob to bundle content at build time.
 * This means zero runtime filesystem access — works perfectly on Cloudflare Workers.
 */
export async function getAllPosts(): Promise<Post[]> {
  // Vite bundles all MDX/md files as raw strings
  const modules = import.meta.glob("/content/posts/*.mdx", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;

  const posts: Post[] = [];

  for (const [path, raw] of Object.entries(modules)) {
    const slug = path
      .replace("/content/posts/", "")
      .replace(/\.mdx?$/, "");

    try {
      const { frontmatter, body } = parseFrontmatter(raw);
      posts.push({ slug, frontmatter, body });
    } catch (e) {
      console.error(`Failed to parse ${path}:`, e);
    }
  }

  // Sort newest first
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) =>
    p.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getAdjacentPosts(slug: string): Promise<{
  prev: Post | null;
  next: Post | null;
}> {
  const posts = await getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}
