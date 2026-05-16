import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link, useSearchParams } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getAllPosts } from "~/utils/posts.server";
import PostCard from "~/components/PostCard";

const PAGE_SIZE = 6;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return json({ posts: paginated, page, totalPages, total: posts.length });
}

export function meta() {
  return [
    { title: "Wandering Fork — Food & Travel Stories" },
    { name: "description", content: "Recipes, restaurant finds, and travel stories from around the world." },
  ];
}

export default function Index() {
  const { posts, page, totalPages } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="home-hero">
        <h1 className="home-hero__title">Food. Travel. Stories.</h1>
        <p className="home-hero__sub">
          Recipes worth making twice, places worth going back to.
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--color-muted)", padding: "40px" }}>
          No posts yet — add your first .mdx file to content/posts/
        </p>
      ) : (
        <>
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {page > 1 ? (
                <Link to={`/?page=${page - 1}`} className="pagination__btn">← Newer</Link>
              ) : (
                <span className="pagination__btn pagination__btn--disabled">← Newer</span>
              )}

              <span className="pagination__info">
                Page {page} of {totalPages}
              </span>

              {page < totalPages ? (
                <Link to={`/?page=${page + 1}`} className="pagination__btn">Older →</Link>
              ) : (
                <span className="pagination__btn pagination__btn--disabled">Older →</span>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
