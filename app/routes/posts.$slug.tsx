import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getPostBySlug, getAdjacentPosts } from "~/utils/posts.server";
import { formatDate, readingTime } from "~/utils/helpers";
import TagBadge from "~/components/TagBadge";
import AuthorBio from "~/components/AuthorBio";
import ShareButtons from "~/components/ShareButtons";
import BackToTop from "~/components/BackToTop";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) throw new Response("Not Found", { status: 404 });

  const post = await getPostBySlug(slug);
  if (!post) throw new Response("Not Found", { status: 404 });

  const { prev, next } = await getAdjacentPosts(slug);

  return json({ post, prev, next });
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> | undefined }) {
  if (!data) return [{ title: "Post Not Found" }];
  const { post } = data as any;
  return [
    { title: `${post.frontmatter.title} — That Nomad` },
    { name: "description", content: post.frontmatter.excerpt },
    { property: "og:title", content: post.frontmatter.title },
    { property: "og:description", content: post.frontmatter.excerpt },
    { property: "og:type", content: "article" },
    ...(post.frontmatter.hero
      ? [{ property: "og:image", content: post.frontmatter.hero }]
      : []),
  ];
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>")
    .replace(/^---$/gm, "<hr>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|b|u|o|p|hr|bl])(.+)$/gm, "$1")
    .replace(/^<\/p><p>(<h[1-3]|<blockquote|<hr)/gm, "$1")
    .replace(/(<\/h[1-3]>|<\/blockquote>|<hr>)<\/p><p>/gm, "$1")
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("<h") || block.startsWith("<blockquote") || block.startsWith("<hr")) {
        return block;
      }
      return `<p>${block}</p>`;
    })
    .join("\n");
}

export default function PostPage() {
  const { post, prev, next } = useLoaderData<typeof loader>();
  const { frontmatter, body } = post;
  const mins = readingTime(body);

  return (
    <article className="post-page">
      <Link to="/" className="back-link container--narrow" style={{ display: "flex" }}>
        ← All posts
      </Link>

      <header className="post-header">
        <div className="post-header__tags">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <h1 className="post-header__title">{frontmatter.title}</h1>
        <p className="post-header__meta">
          {formatDate(frontmatter.date)}
          <span className="post-header__divider">·</span>
          {mins} min read
        </p>
      </header>

      {frontmatter.hero && (
        <div className="post-hero-image">
          <img
            src={frontmatter.hero}
            alt={frontmatter.heroAlt ?? frontmatter.title}
          />
        </div>
      )}

      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
      />

      <div className="post-footer">
        <ShareButtons title={frontmatter.title} />
        <AuthorBio />
      </div>

      {(prev || next) && (
        <nav className="post-nav">
          <div className="post-nav__inner">
            {prev ? (
              <Link to={`/posts/${prev.slug}`} className="post-nav__item post-nav__item--prev">
                <span className="post-nav__dir">← Previous</span>
                <span className="post-nav__title">{prev.frontmatter.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link to={`/posts/${next.slug}`} className="post-nav__item post-nav__item--next">
                <span className="post-nav__dir">Next →</span>
                <span className="post-nav__title">{next.frontmatter.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      <BackToTop />
    </article>
  );
}

export function ErrorBoundary() {
  return (
    <div className="not-found">
      <h1>Post not found</h1>
      <p>
        <Link to="/">← Back to home</Link>
      </p>
    </div>
  );
}
