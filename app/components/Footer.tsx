export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>© {year} That Nomad · Built with Remix &amp; Cloudflare Workers</p>
    </footer>
  );
}
