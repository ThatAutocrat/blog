import { Link } from "@remix-run/react";
import type { Post } from "~/utils/posts.server";
import TagBadge from "./TagBadge";

// ─── helpers (no .server import) ──────────────────────────────────────────────

const CATEGORY_EMOJI: Record<string, string> = {
  travel: "✈️",
  food: "🍜",
  recipe: "🍳",
};

function getEmoji(tags: string[]): string {
  for (const tag of tags) {
    if (CATEGORY_EMOJI[tag.toLowerCase()]) return CATEGORY_EMOJI[tag.toLowerCase()];
  }
  return "📝";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ─── component ────────────────────────────────────────────────────────────────

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, body } = post;
  const mins = readingTime(body);

  return (
    <Link to={`/posts/${slug}`} className="post-card">
      {frontmatter.hero ? (
        <img
          src={frontmatter.hero}
          alt={frontmatter.heroAlt ?? frontmatter.title}
          className="post-card__image"
          loading="lazy"
        />
      ) : (
        <div className="post-card__image--placeholder">
          {getEmoji(frontmatter.tags)}
        </div>
      )}

      <div className="post-card__body">
        <div className="post-card__tags">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} linkable={false} />
          ))}
        </div>

        <h2 className="post-card__title">{frontmatter.title}</h2>

        {frontmatter.excerpt && (
          <p className="post-card__excerpt">{frontmatter.excerpt}</p>
        )}

        <p className="post-card__meta">
          {formatDate(frontmatter.date)}
          <span className="post-card__meta-divider">·</span>
          {mins} min read
        </p>
      </div>
    </Link>
  );
}
