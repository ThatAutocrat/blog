import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo">
          That Nomad
        </Link>
        <nav>
          <ul className="site-header__nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category/food">Food</Link></li>
            <li><Link to="/category/travel">Travel</Link></li>
            <li><Link to="/category/recipe">Recipes</Link></li>
            <li><Link to="/about">About</Link></li>
            <li>
              <Link to="/search" aria-label="Search" className="site-header__search-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "block" }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
