import { Link } from "@remix-run/react";

export function meta() {
  return [
    { title: "About — Wandering Fork" },
    { name: "description", content: "The story behind Wandering Fork — food, travel, and the meals in between." },
  ];
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="container--narrow">
        <Link to="/" className="back-link">← All posts</Link>

        <div className="about-hero">
          <div className="about-avatar">
            <span className="about-avatar__emoji">🍜</span>
          </div>
          <h1 className="about-title">Hey, I'm the Nomad.</h1>
        </div>

        <div className="about-body">
          <p>
            That Nomad is a journal of meals eaten in the wrong timezone, recipes reconstructed
            from memory, and places that were worth the detour and a little bit of tech. It started as a notes app full of
            restaurant names I kept forgetting, and turned into this.
          </p>

          <p>
            I travel whenever I can and cook whenever I'm not. The food I chase tends to be cheap,
            old, and regional — the kind that doesn't photograph well but stays with you. I take
            notes on napkins and transfer them here before I lose them.
          </p>

          <h2>What you'll find here</h2>
          <p>
            Three things: travel writing about places I've eaten my way through, recipes I've tested
            enough times to actually trust, and the occasional essay about why food matters beyond
            the plate.
          </p>

          <h2>Get in touch</h2>
          <p>
            If you've been to a place I've written about, or know a better bowl of ramen in Tokyo,
            I want to hear about it. You can reach me at{" "}
            <a href="mailto:hellodawg5432@gmail.com">hello@ThatNomad.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
