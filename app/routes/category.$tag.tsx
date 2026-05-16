import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getPostsByTag } from "~/utils/posts.server";
import PostCard from "~/components/PostCard";

export async function loader({ params }: LoaderFunctionArgs) {
  const tag = params.tag;
  if (!tag) throw new Response("Not Found", { status: 404 });

  const posts = await getPostsByTag(tag);
  return json({ tag, posts });
}

export function meta({ data }: { data: any }) {
  if (!data) return [{ title: "Category Not Found" }];
  const tag = data.tag as string;
  return [
    { title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} — Wandering Fork` },
    { name: "description", content: `All ${tag} posts on Wandering Fork.` },
  ];
}

export default function CategoryPage() {
  const { tag, posts } = useLoaderData<typeof loader>();
  const label = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <div className="category-page">
      <div className="category-header">
        <Link to="/" className="back-link" style={{ justifyContent: "center" }}>
          ← All posts
        </Link>
        <h1 className="category-header__title">{label}</h1>
        <p className="category-header__count">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--color-muted)" }}>
          No posts tagged "{tag}" yet.
        </p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
