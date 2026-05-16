import { Link } from "@remix-run/react";

interface TagBadgeProps {
  tag: string;
  linkable?: boolean;
}

export default function TagBadge({ tag, linkable = true }: TagBadgeProps) {
  const className = `tag-badge tag-badge--${tag.toLowerCase()}`;

  if (linkable) {
    return (
      <Link to={`/category/${tag.toLowerCase()}`} className={className}>
        {tag}
      </Link>
    );
  }

  return <span className={className}>{tag}</span>;
}
