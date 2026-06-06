import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import { getAllPosts } from "~/utils/posts.server";
import PostCard from "~/components/PostCard";

export async function loader() {
  const posts = await getAllPosts();
  return json({ posts });
}

export function meta() {
  return [
    { title: "Search — That Nomad" },
    { name: "description", content: "Search all posts." },
  ];
}

export default function SearchPage() {
  const { posts } = useLoaderData<typeof loader>();
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? posts.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.frontmatter.title.toLowerCase().includes(q) ||
          p.frontmatter.excerpt?.toLowerCase().includes(q) ||
          p.frontmatter.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : posts;

  return (
    <div className="search-page">
      <div className="search-header">
        <Link to="/" className="back-link" style={{ justifyContent: "center" }}>
          ← All posts
        </Link>
        <h1 className="search-header__title">Search</h1>
        <div className="search-input-wrap">
          <input
            type="search"
            className="search-input"
            placeholder="Search posts, tags, topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        {query.trim() && (
          <p className="search-header__count">
            {filtered.length} {filtered.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--color-muted)", padding: "40px" }}>
          Nothing found. Try a different search.
        </p>
      ) : (
        <div className="post-grid">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
