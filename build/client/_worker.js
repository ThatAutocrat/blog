import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { json } from "@remix-run/cloudflare";
import { useState, useEffect } from "react";
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }),
    {
      // If you wish to abort the rendering process, you can pass a signal here.
      // Please refer to the templates for example son how to configure this.
      // signal: controller.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (isBotRequest(request.headers.get("user-agent"))) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/global-ECEciIj9.css";
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "site-header", children: /* @__PURE__ */ jsxs("div", { className: "site-header__inner", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "site-header__logo", children: "That Nomad" }),
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { className: "site-header__nav", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/category/food", children: "Food" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/category/travel", children: "Travel" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/category/recipe", children: "Recipes" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", children: "About" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/search", "aria-label": "Search", className: "site-header__search-link", children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", style: { display: "block" }, children: [
        /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
      ] }) }) })
    ] }) })
  ] }) });
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "site-footer", children: /* @__PURE__ */ jsxs("p", { children: [
    "© ",
    year,
    " That Nomad · Built with Remix & Cloudflare Workers"
  ] }) });
}
const links = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500&display=swap"
  }
];
function meta$5() {
  return [
    { title: "My Blog" },
    { name: "description", content: "Food & travel stories from around the world." }
  ];
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "main-content", children }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const __vite_glob_0_0 = `---
title: "Almost the Summit: What K2 Teaches You Before It Turns You Back"
date: "2025-08-06"
tags: [travel, adventure]
excerpt: "We didn't summit. We got close enough to understand why people die trying — and why they come back anyway."
hero: "/images/k2.png"
heroAlt: "Snow covered mountain peak piercing through clouds"
---

<p style="font-size: inherit">
  <span style="font-family: Georgia, serif; font-size: 4.2rem; font-weight: 700; float: left; line-height: 0.85; margin: 6px 10px 0 0; color: #c85a2a;">T</span>
  here is a moment on a serious mountain when the summit stops being the point. You are too cold to think clearly, too tired to feel your fingers properly, the wind is doing something to the air that makes every breath feel like half a breath, and the voice in your head that usually argues for comfort has gone completely quiet. Not because it gave up. Because it finally understands that this is what you came for. Not the view from the top. Not the photograph. This — right here — this is the thing you travelled ten thousand kilometres to feel. We didn't summit K2. We were turned back at Camp 3, somewhere around 7,200 metres, by weather that made the decision for us in a way that felt less like defeat and more like the mountain being honest. And I would do every single day of it again without hesitating.
</p>

## K2 Is Not Everest

People who haven't been to either sometimes treat them as interchangeable — two very tall mountains, both in Asia, both requiring serious commitment. This is like saying a swimming pool and the ocean are interchangeable because they both contain water.

Everest is higher. K2 is harder. K2 has a summit success rate of roughly 25 to 30 percent. Its fatality rate is among the highest of any eight-thousander. It doesn't have the commercial infrastructure that Everest has built over decades. There are no fixed ropes on most of the route by default. The weather windows are shorter, less predictable, and more violent. And the mountain itself — the Abruzzi Spur, the Black Pyramid, the Bottleneck — is technically demanding in a way that altitude alone doesn't capture.

<blockquote style="font-family: Georgia, serif; font-size: 1.5rem; font-style: italic; line-height: 1.4; border-left: 4px solid #c85a2a; margin: 40px 0; padding: 8px 0 8px 28px; color: #c85a2a;">
  K2 doesn't reward ambition. It rewards patience, preparation, and the willingness to turn back — sometimes more than once.
</blockquote>

Mountaineers call it the Savage Mountain. That name was earned.

## The Journey Before the Mountain

The approach to K2 base camp is itself a multi-day undertaking that would qualify as a serious expedition in most other contexts. You fly into Islamabad, then to Skardu, then you drive to Askole — a small village at the edge of the road network. From Askole it is roughly 100 kilometres on foot through the Karakoram to base camp at 5,150 metres. Four to six days of walking depending on your pace and the weather, through some of the most dramatic landscape on earth.

The Baltoro Glacier alone — 63 kilometres of moving ice — is something that recalibrates your sense of scale permanently. You walk on it for days. It groans. It shifts. It is alive in the way that only very old, very large things are alive. Around you the Karakoram peaks rise on every side — Masherbrum, Gasherbrum, Broad Peak, and then eventually, at the head of the glacier, K2 itself appearing around a corner of rock like something that was always there and you just weren't ready to see it.

By the time you reach base camp you have already been changed by the journey. The summit hasn't even started yet.

## What You Actually Need

Let's be practical for a moment, because adventure without preparation is just recklessness with better Instagram captions.

**Physical conditioning** is the foundation and it cannot be faked. For a K2 attempt you need months of structured training — weighted pack carries, high altitude acclimatisation treks, cardiovascular base that is genuinely deep. Your body at 7,000 metres is operating on less than half the oxygen it gets at sea level. Every step costs more than it looks like it should. You need reserves you cannot imagine needing until you need them.

**Layering is everything.** The temperature range from base camp to high camps swings by 40 degrees or more. A proper layering system — moisture-wicking base, insulating mid layer, windproof and waterproof shell — is not optional equipment. It is the difference between discomfort and danger. At altitude, wet means cold, and cold at altitude can kill you faster than you expect.

**Boots and crampons** matter more than almost anything else. Frostbite begins in the extremities. Double or triple plastic boots rated to extreme altitude, fitted properly, with crampons that are dialled in before you ever touch the glacier.

**Nutrition and hydration** become a job you have to consciously perform. At altitude your appetite suppresses. Water freezes. Your body is burning through calories at a rate that is hard to keep up with. Eat when you're not hungry. Drink when you're not thirsty. Force both. This is unglamorous and essential.

**Mental preparation** is the thing nobody talks about enough. The long days of bad weather pinned in a tent at Camp 2 while the wind tries to remove the tent from the mountain. The decision to turn back when everything in you wants to keep going. The management of fear on technical terrain where a mistake has consequences. None of this can be trained for entirely in advance. But you can go in knowing it's coming.

## Camp 3 and the Turn

We had a weather window. A narrow one — our guide said two days, maybe three. We moved from base camp to Camp 1 to Camp 2 in good time, acclimatisation holding, the team moving well. Camp 3 at 7,200 metres was the high point. We arrived in the afternoon, ate what we could manage, tried to sleep at altitude in the way you try to sleep at altitude — badly, shallowly, aware of every breath.

The weather came in at midnight. Not gradually. All at once, the way K2 weather moves. Wind that made the tent fabric sound like it was being beaten. Snow horizontal. By 3am the decision had already been made by the mountain, even if we spent another hour pretending we were the ones making it.

<blockquote style="font-family: Georgia, serif; font-size: 1.5rem; font-style: italic; line-height: 1.4; border-left: 4px solid #c85a2a; margin: 40px 0; padding: 8px 0 8px 28px; color: #c85a2a;">
  The mountain was still there in the morning, exactly where it had always been, completely indifferent to what we wanted from it. That indifference is the whole lesson.
</blockquote>

We descended in deteriorating visibility, roped together, moving carefully. Base camp felt like a different planet — warmer, lower, oxygen-rich in a way you only notice after being without it. I ate three full meals that afternoon and slept for eleven hours.

## What Almost Summiting Gives You

There is a version of this story that treats the turn-back as failure. I don't believe in that version.

What K2 gave me in the approach, the acclimatisation, the camps, the one night at 7,200 metres, and the descent — that is a complete experience. The summit would have added a view and a photograph. It would not have added the thing that actually mattered, which was the sustained encounter with a place and a difficulty that showed me something true about my own limits and capacities.

Adventure at this scale is not about conquering anything. The mountain is not conquered. The mountain doesn't notice. What changes is you — slowly, over days of hard walking and thin air and small decisions that accumulate into something you carry home and can't quite explain to people who weren't there.

You come back different. Not dramatically different. Not visibly different to most people. But you know something now that you didn't know before, and no photograph captures it, and that's fine.

<u>That's the whole point of going.</u>
`;
const __vite_glob_0_1 = `---
title: "1000 Anime In and I Still Can't Explain It to You"
date: "2024-01-16"
tags: [anime, culture]
excerpt: "It's not escapism. It's a world you choose to live in — and once you're in, you never fully leave."
hero: "/images/anime.png"
heroAlt: "Anime aesthetic night city lights"
---

<p style="font-size: inherit">
  <span style="font-family: Georgia, serif; font-size: 4.2rem; font-weight: 700; float: left; line-height: 0.85; margin: 6px 10px 0 0; color: #c85a2a;">I</span>
  have watched over a thousand anime. Not skimmed, not dropped at episode two, not left on the backlog forever — watched. Completed. Sat with. I have watched slice of life shows where nothing happens and cried anyway. I have watched mecha anime I didn't understand and felt something shift in my chest. I have watched sports anime about volleyball and ping pong and cycling and come out the other side genuinely believing that the human will to compete is one of the most beautiful things alive. I've done horror, isekai, shounen, seinen, josei, historical, psychological, romance, military, music, cooking. All of it. And I still don't know how to explain what anime is to someone who hasn't felt it yet.
</p>

## It Is Not Escapism. Stop Calling It That.

People hear "anime" and picture a teenager hiding from the world in a dark room. And sure, that happens. But that framing misses the point entirely. Every great piece of fiction — every novel, every film, every song — offers an exit from the ordinary. Nobody calls reading Dostoevsky at 2am escapism. Nobody says a person is running from their problems because they cried at a film.

<blockquote style="font-family: Georgia, serif; font-size: 1.5rem; font-style: italic; line-height: 1.4; border-left: 4px solid #c85a2a; margin: 40px 0; padding: 8px 0 8px 28px; color: #c85a2a;">
  Anime isn't a door you walk through to avoid the world. It's a world you walk into and choose to stay in.
</blockquote>

The difference matters. Escapism implies running away from something. Anime at its best is running *toward* something — toward beauty, toward grief, toward questions you didn't know you had. Toward worlds that are stranger and more honest than the one you live in.

## What It Actually Takes to Make 12 Episodes

Here's what most people don't think about: a 12 episode anime season represents years of work compressed into roughly five hours of screen time. The source material — usually a manga or light novel — has to be adapted, cut, restructured. A team of directors, animators, storyboard artists, voice actors, composers, and sound designers work in a pipeline that is brutal even by entertainment industry standards.

Key animators — the people who draw the important frames — are some of the most underpaid and overworked artists in any medium. A single sakuga sequence, the kind that makes you pause and rewind three times, might take one animator weeks. The music has to be scored to match cuts that are still being drawn. Voice actors record lines before animation is finished, working from rough storyboards, trying to give life to something that doesn't fully exist yet.

And then it airs. Twelve weeks. One episode at a time. And people watch it in twelve hours and say it was too short.

When you know this, you watch differently. Every frame starts to mean something. You notice the shortcuts and you notice the moments where someone clearly refused to take them.

## The Genres Nobody Talks About

Everyone knows Naruto and Dragon Ball. Fewer people have seen *Mushishi* — a quiet, meditative series about a man who travels through rural Japan treating people afflicted by supernatural organisms. No fights. No tournament arcs. Just fog and folklore and a kind of stillness that is almost impossible to find anywhere else in fiction.

Fewer still have seen *Shouwa Genroku Rakugo Shinjuu* — an anime about a dying form of Japanese oral storytelling, two men who loved the same art and couldn't save each other, and what it means to carry a tradition forward when you're not sure you deserve to. It is one of the greatest character studies I have encountered in any medium. It is also a 25 episode anime about rakugo performers that nobody outside the fandom talks about.

This is what 1000 anime gets you. Not just the landmarks but the quiet masterpieces that exist in the gaps between them.

## The Nostalgia Is Unlike Anything Else

There is a specific feeling that comes from rewatching something you first saw as a child or a teenager. The opening theme plays and something in your body remembers before your brain does. It's not just nostalgia — it's something more physical than that. A warmth that starts in your chest and moves outward.

<blockquote style="font-family: Georgia, serif; font-size: 1.5rem; font-style: italic; line-height: 1.4; border-left: 4px solid #c85a2a; margin: 40px 0; padding: 8px 0 8px 28px; color: #c85a2a;">
  The opening theme plays and something in your body remembers before your brain does.
</blockquote>

I rewatched Fullmetal Alchemist: Brotherhood last year — something I first watched at fourteen — and felt fourteen again in the worst and best way simultaneously. The grief in that show hit differently. I understood things I hadn't understood the first time. But I also remembered exactly who I was when I didn't understand them yet.

No other medium has done this to me as consistently as anime. I think it's the combination — the music, the art style, the voice performances, the specific way anime expresses emotion that live action simply cannot replicate. A character's face crumpling in a way that's somehow more honest than anything a human actor could do because it's stripped down to only what matters.

## Why I'm Still Watching

A thousand anime in and my queue is still full. I don't think that's a problem. I think that's the point. The world inside anime is large enough that you can spend a lifetime in it and still find rooms you haven't been in yet.

It's not about volume. It's about the fact that somewhere out there is a 12 episode anime from 2007 with a 7.4 rating and a fanbase of about three thousand people, and it is going to make you feel something you have never felt before, and you will never be able to fully explain it to anyone who hasn't seen it.

That's the thing about anime. It gives you experiences that belong entirely to you.

And a thousand in, I'm still [chasing them](https://anilist.co/user/thatoneguy010/).
`;
const __vite_glob_0_2 = `---
title: "The Best Ramen I've Ever Had in Tokyo"
date: "2025-01-10"
tags: [travel, food]
excerpt: "A week eating through 12 bowls across Shinjuku, Shibuya, and a tiny basement shop in Shimokitazawa that changed everything."
hero: "/images/jap.png"
heroAlt: "A steaming bowl of tonkotsu ramen with chashu pork"
---

## The search begins

I gave myself one week and one rule: no restaurant twice. Tokyo has somewhere between 5,000 and 10,000 ramen shops — the exact number depends on who you ask and whether you count the ones that only open on weekdays between 11am and 2pm.

My first stop was a shop in Shinjuku that a friend had written down on a Post-it note three years ago. The note survived two moves and a broken washing machine. That felt like a sign.
<blockquote style="font-family: Georgia, serif; font-size: 1.5rem; font-style: italic; line-height: 1.4; border-left: 4px solid #c85a2a; margin: 40px 0; padding: 8px 0 8px 28px; color: #c85a2a;">
  The best ramen I ever had cost less than a bus ticket.
</blockquote>
## What I was looking for

Good ramen is not complicated to describe and nearly impossible to execute. You want a broth that took all day, noodles with the right amount of chew, and toppings that don't distract from either.

What I was not looking for: Instagram bait. Tokyo has plenty of photogenic ramen — neon broths, black garlic oil theatrics, egg yolks that photograph well. None of that was on my list.

## The basement in Shimokitazawa

On day four, I almost missed it. A handwritten sign at the top of a staircase, no English anywhere, and a queue of four people who clearly knew something I didn't.

The tonkotsu here was darker than any I'd had before — closer to soy than the cloudy white I expected. The chef had been making it the same way for 22 years. His son was there too, learning.

I had two bowls. I went back the next day and had a third.

## What I brought home

A notebook full of addresses, a mild MSG dependency, and the uncomfortable realisation that the best ramen I've ever had is three flights away.

Worth it.
`;
const __vite_glob_0_3 = `---
title: "Noodles Are My Comfort Food and I Won't Justify It"
date: "2025-05-16"
tags: [recipe, food]
excerpt: "Spicy, oily, loud — everything a comfort food should be. Here's how I make it at home and why I never get tired of it."
hero: "/images/n.png"
heroAlt: "A bowl of spicy noodles with chopsticks"
---

<p style="font-size: inherit">
  <span style="font-family: Georgia, serif; font-size: 4.2rem; font-weight: 700; float: left; line-height: 0.85; margin: 6px 10px 0 0; color: #c85a2a;">E</span>
  veryone has that one dish. The one that doesn't need a reason, doesn't need a occasion, doesn't need to be good for you. The one you make at 11pm when the day has been too long and your brain is fried and you just need something that tastes exactly like itself and nothing else. For me that dish is Schezwan noodles. Not the restaurant version, not the takeout box version — my version. The one I've made so many times I don't measure anything anymore. The one that fills the kitchen with a smell so good it feels unfair to anyone who isn't there.
</p>

## What Schezwan Actually Is

Let's get this out of the way — Schezwan as Indians know it is not authentic Chinese food. It's an Indo-Chinese invention, born in the Chinese immigrant community in Kolkata and evolved over decades into something that belongs entirely to this country. It borrows the name from Sichuan province but the flavour is its own thing — heavier, oilier, louder, built for people who want heat that doesn't apologise.

<blockquote style="font-family: Georgia, serif; font-size: 1.5rem; font-style: italic; line-height: 1.4; border-left: 4px solid #c85a2a; margin: 40px 0; padding: 8px 0 8px 28px; color: #c85a2a;">
  Schezwan sauce isn't a condiment. It's a personality. Once it hits the pan, everything else in the kitchen knows its place.
</blockquote>

The heart of the whole dish is Schezwan sauce — a paste of dried red chillies, garlic, ginger, and oil that's been cooked down until it's thick, dark, and deeply fragrant. You can make it from scratch and it's worth it. You can also buy a good jar and nobody needs to know.

## The Ingredients That Actually Matter

Most of the noodle dish is technique, not ingredients. But a few things make a real difference.

**The noodles**: Hakka noodles are the move. Boil them just short of done — they'll finish cooking in the wok. Overcooked noodles go limp and sad and the whole thing falls apart.

**The heat**: You need a high flame. This is the part home cooking usually gets wrong. A proper wok on full heat, oil shimmering, ingredients hitting the pan and sizzling immediately. That char, that slight smokiness — that's what makes it taste like something and not just stir-fried noodles with sauce.

**The Schezwan sauce**: Two generous tablespoons minimum. Don't be timid. The dish is called Schezwan noodles, not noodles with a hint of Schezwan.

## The Recipe

<div style="background: #faf7f2; border: 1px solid #e8ddd0; border-radius: 12px; padding: 24px 28px; margin: 32px 0;">
  <p style="font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; color: #c85a2a; margin-bottom: 4px;">Recipe</p>
  <p style="font-family: Georgia, serif; font-size: 1.3rem; font-weight: 600; margin-bottom: 8px;">Schezwan Spicy Noodles</p>
  <p style="font-size: 0.9rem; color: #888; margin-bottom: 20px;">Serves 2 · 15 minutes</p>

  <p style="font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px;">What you need</p>
  <ul style="font-size: 0.95rem; line-height: 2; margin-bottom: 20px; padding-left: 18px;">
    <li>200g Hakka noodles (depends how much u can eat :)</li>
    <li>2 tbsp Schezwan sauce (more if you're brave)</li>
    <li>1 tbsp soy sauce</li>
    <li>1 tsp rice vinegar</li>
    <li>1 tsp chilli oil</li>
    <li>½ tsp sugar</li>
    <li>4 cloves garlic, minced</li>
    <li>1 tsp ginger, grated</li>
    <li>1 small onion, thinly sliced</li>
    <li>½ capsicum, julienned</li>
    <li>1 medium carrot, julienned</li>
    <li>2 stalks spring onion, chopped (whites and greens separated)</li>
    <li>2 tbsp neutral oil</li>
    <li>Salt to taste</li>
  </ul>

  <p style="font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px;">How to make it</p>
  <ol style="font-size: 0.95rem; line-height: 2.2; padding-left: 18px;">
    <li>Boil noodles in salted water for 1 minute less than the packet says. Drain, toss with a little oil so they don't stick, set aside.</li>
    <li>Mix Schezwan sauce, soy sauce, vinegar, chilli oil, and sugar in a small bowl. Set aside.</li>
    <li>Get your wok or pan very hot. Add oil and let it shimmer.</li>
    <li>Add garlic, ginger, and spring onion whites. Toss for 30 seconds — it should sizzle hard.</li>
    <li>Add onion and vegetables. Stir fry on high heat for 2–3 minutes. Keep it moving.</li>
    <li>Add the sauce mixture. Toss everything to coat.</li>
    <li>Add the noodles. Toss aggressively for 2 minutes until every strand is coated and slightly charred at the edges.</li>
    <li>Taste. Adjust salt. Add more Schezwan sauce if it needs it — it probably does.</li>
    <li>Top with spring onion greens. Eat immediately.</li>
  </ol>
</div>

## Why This Specifically Is Comfort Food

Comfort food isn't about nutrition or sophistication. It's about reliability. Schezwan noodles taste the same every time I make them and that sameness is the whole point. When everything else is unpredictable, this dish is not. The garlic hits the hot oil and makes that sound and I already feel better before I've eaten a single bite.

<blockquote style="font-family: Georgia, serif; font-size: 1.5rem; font-style: italic; line-height: 1.4; border-left: 4px solid #c85a2a; margin: 40px 0; padding: 8px 0 8px 28px; color: #c85a2a;">
  The garlic hits the hot oil and makes that sound and I already feel better before I've eaten a single bite.
</blockquote>

There's also something about food that punches you in the face a little. Comfort doesn't always mean gentle. Sometimes it means loud and spicy and immediate — something that demands your full attention and leaves no room in your head for whatever was bothering you before you started cooking.

That's what this is. Twenty five minutes, one pan, and whatever the day was before it doesn't matter as much.

## Serve with

Nothing. Maybe a cold drink. That's it.`;
const __vite_glob_0_4 = `---
title: "Three Days in Tbilisi: Eating Your Way Through the Old City"
date: "2025-09-05"
tags: [travel]
excerpt: "Georgian food is having a moment everywhere. Go to the source before it gets discovered."
hero: "/images/thistown.png"
heroAlt: "Colourful wooden balconies in the Old Town of Tbilisi"
---

## Why Tbilisi

Georgia sits at a crossroads that's been producing some of the world's most interesting food for 8,000 years. The wine is natural before natural wine was cool. The bread comes out of a clay oven called a *tone*. The dumplings — *khinkali* — are architectural.

I went for three days in September and stayed for six.

## Day one: The basics

Start at Shavi Lomi in Vera neighbourhood. It's not in the old city and it's not cheap by Georgian standards, but it's the best introduction to what Georgian food can be when someone is paying close attention.

Order the Sulguni cheese salad, the bean-stuffed *lobiani* bread, and whatever fish they have that day. Drink the amber wine. Order more bread.

## The khinkali question

Everyone has an opinion on where to get the best khinkali. The correct answer is: the place your taxi driver goes on his lunch break.

My taxi driver took me to a canteen near the Dezerter Bazaar with plastic chairs and a laminated menu. Twelve khinkali for four lari. I ate sixteen.

The technique: hold from the top (the knot is not eaten), bite a small hole in the side, drink the soup inside first, then eat the rest. Anyone who tells you differently has never eaten them correctly.

## What to buy at the bazaar

The Dezerter Bazaar is where Tbilisi does its actual shopping. Go early.

Look for: churchkhela (walnut strings dipped in grape must, better than it sounds), dried herbs you won't find at home, fresh tkemali (sour plum sauce), and the small hard cheese that comes wrapped in cloth.

Don't buy the tourist khachapuri. Walk two streets away and get the real one.

## Getting there

Ryanair and Wizz Air both fly direct from several European cities. Georgia is visa-free for most Western passports. The lari is cheap. The guesthouses are warm and serve breakfast that will ruin hotel breakfasts for you forever.

Go before everyone else figures it out.
`;
const __vite_glob_0_5 = `---
title: "I Vibe Coded a Full Stack App for Free and It's Fast"
date: "2026-02-16"
tags: [tech, webdev]
excerpt: "Vercel, Supabase, and a bot that keeps it alive. Zero dollars, zero regrets."
hero: "/images/laptop.png"
heroAlt: "Laptop with code on screen"
---
<p style="font-size: inherit">
  <span style="font-family: Georgia, serif; font-size: 4.2rem; font-weight: 700; float: left; line-height: 0.85; margin: 6px 10px 0 0; color: #c85a2a;">I</span>
 built and shipped a full stack web app last weekend without writing a single line of code. Vibe coding — prompting an AI, accepting what looks right, moving on — is a legitimately viable way to build things now. And I don't mean leaving everything to an AI cause that might turn your brain into mush, the main takeaway is now anybody can create anything tech related in just a matter of minutes and things actually work. I mean that's the end goal right?, making things so accessible that it becomes the norm. Here's the stack I landed on and why every piece of it is free.
</p>
## The Stack

**Frontend + hosting: Vercel**

Vercel is the easiest deploy of your life. Connect your GitHub repo, push, done. It builds automatically on every commit, gives you preview URLs for every branch, and the free tier is generous enough that most side projects never outgrow it. Edge network, global CDN, custom domains — all free.

**Database + auth: Supabase**

Supabase is the part that used to be hard. It gives you a Postgres database, a full auth system with email, Google, GitHub login, row-level security, and a REST API — all from a dashboard that actually makes sense. The free tier gives you 500MB storage and 50,000 monthly active users. For a side project, that's essentially infinite.

The auth integration took me maybe 10 minutes to wire up. Supabase generates the client code, the AI filled in the gaps, and it just worked.

## Keeping It Alive

Supabase free tier databases pause after 7 days of inactivity. The fix is embarrassingly simple — use a free uptime monitoring bot like **UptimeRobot** to ping your site every 5 minutes. This counts as activity, the database stays awake, and you never think about it again.

UptimeRobot also alerts you if your site actually goes down, which is a nice bonus.

## The Vibe Coding Part

I described what I wanted in plain English, the AI(Claude) scaffolded the project, I tweaked what looked wrong, pushed to GitHub, and Vercel picked it up automatically. The whole thing — from blank repo to live URL with working auth — took about 20 mins.

Is the code perfect? No. Does it work? Yes. Is it fast? Surprisingly yes — Vercel's edge network and Supabase's connection pooling mean response times that would embarrass a lot of paid setups.

## What It Costs

- Vercel: $0
- Supabase: $0
- UptimeRobot: $0
- Domain: free vercel domain

The free tier of this stack is genuinely good. Not "free with asterisks" good — actually good. If you have an idea and an afternoon, there's no reason not to ship it and it just takes 20 mins.
`;
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error("No frontmatter found");
  }
  const yamlStr = match[1];
  const body = match[2].trim();
  const frontmatter = {};
  for (const line of yamlStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    if (key === "tags") {
      frontmatter.tags = value.replace(/[\[\]"']/g, "").split(",").map((t) => t.trim()).filter(Boolean);
    } else if (key === "title" || key === "date" || key === "excerpt" || key === "hero" || key === "heroAlt") {
      frontmatter[key] = value.replace(/^["']|["']$/g, "");
    }
  }
  return {
    frontmatter,
    body
  };
}
async function getAllPosts() {
  const modules = /* @__PURE__ */ Object.assign({
    "/content/posts/almost-summiting-k2.mdx": __vite_glob_0_0,
    "/content/posts/anime-connoisseur.mdx": __vite_glob_0_1,
    "/content/posts/best-ramen-tokyo.mdx": __vite_glob_0_2,
    "/content/posts/noodles.mdx": __vite_glob_0_3,
    "/content/posts/three-days-tbilisi.mdx": __vite_glob_0_4,
    "/content/posts/vibe-coding-free-stack.mdx": __vite_glob_0_5
  });
  const posts = [];
  for (const [path, raw] of Object.entries(modules)) {
    const slug = path.replace("/content/posts/", "").replace(/\.mdx?$/, "");
    try {
      const { frontmatter, body } = parseFrontmatter(raw);
      posts.push({ slug, frontmatter, body });
    } catch (e) {
      console.error(`Failed to parse ${path}:`, e);
    }
  }
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}
async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
async function getPostsByTag(tag) {
  const posts = await getAllPosts();
  return posts.filter(
    (p) => p.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}
async function getAdjacentPosts(slug) {
  const posts = await getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null
  };
}
function TagBadge({ tag, linkable = true }) {
  const className = `tag-badge tag-badge--${tag.toLowerCase()}`;
  if (linkable) {
    return /* @__PURE__ */ jsx(Link, { to: `/category/${tag.toLowerCase()}`, className, children: tag });
  }
  return /* @__PURE__ */ jsx("span", { className, children: tag });
}
const CATEGORY_EMOJI = {
  travel: "✈️",
  food: "🍜",
  recipe: "🍳"
};
function getEmoji(tags) {
  for (const tag of tags) {
    if (CATEGORY_EMOJI[tag.toLowerCase()]) return CATEGORY_EMOJI[tag.toLowerCase()];
  }
  return "📝";
}
function formatDate$1(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function readingTime$1(body) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
function PostCard({ post }) {
  const { slug, frontmatter, body } = post;
  const mins = readingTime$1(body);
  return /* @__PURE__ */ jsxs(Link, { to: `/posts/${slug}`, className: "post-card", children: [
    frontmatter.hero ? /* @__PURE__ */ jsx(
      "img",
      {
        src: frontmatter.hero,
        alt: frontmatter.heroAlt ?? frontmatter.title,
        className: "post-card__image",
        loading: "lazy"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "post-card__image--placeholder", children: getEmoji(frontmatter.tags) }),
    /* @__PURE__ */ jsxs("div", { className: "post-card__body", children: [
      /* @__PURE__ */ jsx("div", { className: "post-card__tags", children: frontmatter.tags.map((tag) => /* @__PURE__ */ jsx(TagBadge, { tag, linkable: false }, tag)) }),
      /* @__PURE__ */ jsx("h2", { className: "post-card__title", children: frontmatter.title }),
      frontmatter.excerpt && /* @__PURE__ */ jsx("p", { className: "post-card__excerpt", children: frontmatter.excerpt }),
      /* @__PURE__ */ jsxs("p", { className: "post-card__meta", children: [
        formatDate$1(frontmatter.date),
        /* @__PURE__ */ jsx("span", { className: "post-card__meta-divider", children: "·" }),
        mins,
        " min read"
      ] })
    ] })
  ] });
}
async function loader$5({ params }) {
  const tag = params.tag;
  if (!tag) throw new Response("Not Found", { status: 404 });
  const posts = await getPostsByTag(tag);
  return json({ tag, posts });
}
function meta$4({ data }) {
  if (!data) return [{ title: "Category Not Found" }];
  const tag = data.tag;
  return [
    { title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} — Wandering Fork` },
    { name: "description", content: `All ${tag} posts on Wandering Fork.` }
  ];
}
function CategoryPage() {
  const { tag, posts } = useLoaderData();
  const label = tag.charAt(0).toUpperCase() + tag.slice(1);
  return /* @__PURE__ */ jsxs("div", { className: "category-page", children: [
    /* @__PURE__ */ jsxs("div", { className: "category-header", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "back-link", style: { justifyContent: "center" }, children: "← All posts" }),
      /* @__PURE__ */ jsx("h1", { className: "category-header__title", children: label }),
      /* @__PURE__ */ jsxs("p", { className: "category-header__count", children: [
        posts.length,
        " ",
        posts.length === 1 ? "post" : "posts"
      ] })
    ] }),
    posts.length === 0 ? /* @__PURE__ */ jsxs("p", { style: { textAlign: "center", color: "var(--color-muted)" }, children: [
      'No posts tagged "',
      tag,
      '" yet.'
    ] }) : /* @__PURE__ */ jsx("div", { className: "post-grid", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.slug)) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CategoryPage,
  loader: loader$5,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const SITE_URL$1 = "https://my-blog.workers.dev";
async function loader$4() {
  const posts = await getAllPosts();
  const urls = [
    `<url><loc>${SITE_URL$1}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    ...posts.map(
      (post) => `<url><loc>${SITE_URL$1}/posts/${post.slug}</loc><lastmod>${post.frontmatter.date}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    )
  ].join("\n  ");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function readingTime(body) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
function AuthorBio() {
  return /* @__PURE__ */ jsxs("div", { className: "author-bio", children: [
    /* @__PURE__ */ jsx("div", { className: "author-bio__avatar", children: /* @__PURE__ */ jsx("span", { className: "author-bio__emoji", children: "🍜" }) }),
    /* @__PURE__ */ jsxs("div", { className: "author-bio__content", children: [
      /* @__PURE__ */ jsx("p", { className: "author-bio__name", children: "That Nomad" }),
      /* @__PURE__ */ jsx("p", { className: "author-bio__text", children: "Chasing good food and good light across time zones. Writing it down before I forget." })
    ] })
  ] });
}
function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);
  const pageUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encoded = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);
  function copyLink() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "share-buttons", children: [
    /* @__PURE__ */ jsx("span", { className: "share-buttons__label", children: "Share" }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        className: "share-btn share-btn--x",
        href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Share on X",
        children: [
          /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }),
          "X"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        className: "share-btn share-btn--whatsapp",
        href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Share on WhatsApp",
        children: [
          /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
          "WhatsApp"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "share-btn share-btn--copy",
        onClick: copyLink,
        "aria-label": "Copy link",
        children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          "Copied!"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" }),
            /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" })
          ] }),
          "Copy link"
        ] })
      }
    )
  ] });
}
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (!visible) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "back-to-top",
      onClick: scrollToTop,
      "aria-label": "Back to top",
      children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "18 15 12 9 6 15" }) })
    }
  );
}
async function loader$3({ params }) {
  const slug = params.slug;
  if (!slug) throw new Response("Not Found", { status: 404 });
  const post = await getPostBySlug(slug);
  if (!post) throw new Response("Not Found", { status: 404 });
  const { prev, next } = await getAdjacentPosts(slug);
  return json({ post, prev, next });
}
function meta$3({ data }) {
  if (!data) return [{ title: "Post Not Found" }];
  const { post } = data;
  return [
    { title: `${post.frontmatter.title} — Wandering Fork` },
    { name: "description", content: post.frontmatter.excerpt },
    { property: "og:title", content: post.frontmatter.title },
    { property: "og:description", content: post.frontmatter.excerpt },
    { property: "og:type", content: "article" },
    ...post.frontmatter.hero ? [{ property: "og:image", content: post.frontmatter.hero }] : []
  ];
}
function renderMarkdown(md) {
  return md.replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^# (.+)$/gm, "<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>').replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>").replace(/^---$/gm, "<hr>").replace(/\n\n/g, "</p><p>").replace(/^(?!<[h|b|u|o|p|hr|bl])(.+)$/gm, "$1").replace(/^<\/p><p>(<h[1-3]|<blockquote|<hr)/gm, "$1").replace(/(<\/h[1-3]>|<\/blockquote>|<hr>)<\/p><p>/gm, "$1").split("\n\n").map((block) => {
    if (block.startsWith("<h") || block.startsWith("<blockquote") || block.startsWith("<hr")) {
      return block;
    }
    return `<p>${block}</p>`;
  }).join("\n");
}
function PostPage() {
  const { post, prev, next } = useLoaderData();
  const { frontmatter, body } = post;
  const mins = readingTime(body);
  return /* @__PURE__ */ jsxs("article", { className: "post-page", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "back-link container--narrow", style: { display: "flex" }, children: "← All posts" }),
    /* @__PURE__ */ jsxs("header", { className: "post-header", children: [
      /* @__PURE__ */ jsx("div", { className: "post-header__tags", children: frontmatter.tags.map((tag) => /* @__PURE__ */ jsx(TagBadge, { tag }, tag)) }),
      /* @__PURE__ */ jsx("h1", { className: "post-header__title", children: frontmatter.title }),
      /* @__PURE__ */ jsxs("p", { className: "post-header__meta", children: [
        formatDate(frontmatter.date),
        /* @__PURE__ */ jsx("span", { className: "post-header__divider", children: "·" }),
        mins,
        " min read"
      ] })
    ] }),
    frontmatter.hero && /* @__PURE__ */ jsx("div", { className: "post-hero-image", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: frontmatter.hero,
        alt: frontmatter.heroAlt ?? frontmatter.title
      }
    ) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "post-body",
        dangerouslySetInnerHTML: { __html: renderMarkdown(body) }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "post-footer", children: [
      /* @__PURE__ */ jsx(ShareButtons, { title: frontmatter.title }),
      /* @__PURE__ */ jsx(AuthorBio, {})
    ] }),
    (prev || next) && /* @__PURE__ */ jsx("nav", { className: "post-nav", children: /* @__PURE__ */ jsxs("div", { className: "post-nav__inner", children: [
      prev ? /* @__PURE__ */ jsxs(Link, { to: `/posts/${prev.slug}`, className: "post-nav__item post-nav__item--prev", children: [
        /* @__PURE__ */ jsx("span", { className: "post-nav__dir", children: "← Previous" }),
        /* @__PURE__ */ jsx("span", { className: "post-nav__title", children: prev.frontmatter.title })
      ] }) : /* @__PURE__ */ jsx("div", {}),
      next ? /* @__PURE__ */ jsxs(Link, { to: `/posts/${next.slug}`, className: "post-nav__item post-nav__item--next", children: [
        /* @__PURE__ */ jsx("span", { className: "post-nav__dir", children: "Next →" }),
        /* @__PURE__ */ jsx("span", { className: "post-nav__title", children: next.frontmatter.title })
      ] }) : /* @__PURE__ */ jsx("div", {})
    ] }) }),
    /* @__PURE__ */ jsx(BackToTop, {})
  ] });
}
function ErrorBoundary() {
  return /* @__PURE__ */ jsxs("div", { className: "not-found", children: [
    /* @__PURE__ */ jsx("h1", { children: "Post not found" }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "← Back to home" }) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: PostPage,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const SITE_URL = "https://my-blog.workers.dev";
const SITE_TITLE = "Wandering Fork";
const SITE_DESCRIPTION = "Food & travel stories from around the world.";
async function loader$2() {
  const posts = await getAllPosts();
  const items = posts.map(
    (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <guid>${SITE_URL}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.excerpt ?? ""}]]></description>
    </item>`
  ).join("\n");
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1() {
  const posts = await getAllPosts();
  return json({ posts });
}
function meta$2() {
  return [
    { title: "Search — Wandering Fork" },
    { name: "description", content: "Search all posts on Wandering Fork." }
  ];
}
function SearchPage() {
  const { posts } = useLoaderData();
  const [query, setQuery] = useState("");
  const filtered = query.trim() ? posts.filter((p) => {
    var _a;
    const q = query.toLowerCase();
    return p.frontmatter.title.toLowerCase().includes(q) || ((_a = p.frontmatter.excerpt) == null ? void 0 : _a.toLowerCase().includes(q)) || p.frontmatter.tags.some((t) => t.toLowerCase().includes(q));
  }) : posts;
  return /* @__PURE__ */ jsxs("div", { className: "search-page", children: [
    /* @__PURE__ */ jsxs("div", { className: "search-header", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "back-link", style: { justifyContent: "center" }, children: "← All posts" }),
      /* @__PURE__ */ jsx("h1", { className: "search-header__title", children: "Search" }),
      /* @__PURE__ */ jsx("div", { className: "search-input-wrap", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "search",
          className: "search-input",
          placeholder: "Search posts, tags, topics…",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          autoFocus: true
        }
      ) }),
      query.trim() && /* @__PURE__ */ jsxs("p", { className: "search-header__count", children: [
        filtered.length,
        " ",
        filtered.length === 1 ? "result" : "results",
        " for “",
        query,
        "”"
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsx("p", { style: { textAlign: "center", color: "var(--color-muted)", padding: "40px" }, children: "Nothing found. Try a different search." }) : /* @__PURE__ */ jsx("div", { className: "post-grid", children: filtered.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.slug)) })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchPage,
  loader: loader$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const PAGE_SIZE = 6;
async function loader({ request }) {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return json({ posts: paginated, page, totalPages, total: posts.length });
}
function meta$1() {
  return [
    { title: "Wandering Fork — Food & Travel Stories" },
    { name: "description", content: "Recipes, restaurant finds, and travel stories from around the world." }
  ];
}
function Index() {
  const { posts, page, totalPages } = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "home-hero", children: [
      /* @__PURE__ */ jsx("h1", { className: "home-hero__title", children: "Food. Travel. Stories." }),
      /* @__PURE__ */ jsx("p", { className: "home-hero__sub", children: "Recipes worth making twice, places worth going back to." })
    ] }),
    posts.length === 0 ? /* @__PURE__ */ jsx("p", { style: { textAlign: "center", color: "var(--color-muted)", padding: "40px" }, children: "No posts yet — add your first .mdx file to content/posts/" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "post-grid", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.slug)) }),
      totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "pagination", children: [
        page > 1 ? /* @__PURE__ */ jsx(Link, { to: `/?page=${page - 1}`, className: "pagination__btn", children: "← Newer" }) : /* @__PURE__ */ jsx("span", { className: "pagination__btn pagination__btn--disabled", children: "← Newer" }),
        /* @__PURE__ */ jsxs("span", { className: "pagination__info", children: [
          "Page ",
          page,
          " of ",
          totalPages
        ] }),
        page < totalPages ? /* @__PURE__ */ jsx(Link, { to: `/?page=${page + 1}`, className: "pagination__btn", children: "Older →" }) : /* @__PURE__ */ jsx("span", { className: "pagination__btn pagination__btn--disabled", children: "Older →" })
      ] })
    ] })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta() {
  return [
    { title: "About — Wandering Fork" },
    { name: "description", content: "The story behind Wandering Fork — food, travel, and the meals in between." }
  ];
}
function AboutPage() {
  return /* @__PURE__ */ jsx("div", { className: "about-page", children: /* @__PURE__ */ jsxs("div", { className: "container--narrow", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "back-link", children: "← All posts" }),
    /* @__PURE__ */ jsxs("div", { className: "about-hero", children: [
      /* @__PURE__ */ jsx("div", { className: "about-avatar", children: /* @__PURE__ */ jsx("span", { className: "about-avatar__emoji", children: "🍜" }) }),
      /* @__PURE__ */ jsx("h1", { className: "about-title", children: "Hey, I'm the Nomad." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "about-body", children: [
      /* @__PURE__ */ jsx("p", { children: "That Nomad is a journal of meals eaten in the wrong timezone, recipes reconstructed from memory, and places that were worth the detour and a little bit of tech. It started as a notes app full of restaurant names I kept forgetting, and turned into this." }),
      /* @__PURE__ */ jsx("p", { children: "I travel whenever I can and cook whenever I'm not. The food I chase tends to be cheap, old, and regional — the kind that doesn't photograph well but stays with you. I take notes on napkins and transfer them here before I lose them." }),
      /* @__PURE__ */ jsx("h2", { children: "What you'll find here" }),
      /* @__PURE__ */ jsx("p", { children: "Three things: travel writing about places I've eaten my way through, recipes I've tested enough times to actually trust, and the occasional essay about why food matters beyond the plate." }),
      /* @__PURE__ */ jsx("h2", { children: "Get in touch" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "If you've been to a place I've written about, or know a better bowl of ramen in Tokyo, I want to hear about it. You can reach me at",
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:hellodawg5432@gmail.com", children: "hello@ThatNomad.com" }),
        "."
      ] })
    ] })
  ] }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutPage,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-zJR5ysyu.js", "imports": ["/assets/components-Cw4dH9GI.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-cGIKoOOl.js", "imports": ["/assets/components-Cw4dH9GI.js"], "css": [] }, "routes/category.$tag": { "id": "routes/category.$tag", "parentId": "root", "path": "category/:tag", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/category._tag-DV6F7GTm.js", "imports": ["/assets/components-Cw4dH9GI.js", "/assets/PostCard-Cwk0UOQZ.js", "/assets/TagBadge-zkQUgTVr.js"], "css": [] }, "routes/sitemap[.]xml": { "id": "routes/sitemap[.]xml", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sitemap_._xml-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/posts.$slug": { "id": "routes/posts.$slug", "parentId": "root", "path": "posts/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/posts._slug-BuCIJtXZ.js", "imports": ["/assets/components-Cw4dH9GI.js", "/assets/TagBadge-zkQUgTVr.js"], "css": [] }, "routes/feed[.]xml": { "id": "routes/feed[.]xml", "parentId": "root", "path": "feed.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/feed_._xml-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/search": { "id": "routes/search", "parentId": "root", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-DZE9TRuw.js", "imports": ["/assets/components-Cw4dH9GI.js", "/assets/PostCard-Cwk0UOQZ.js", "/assets/TagBadge-zkQUgTVr.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BLteCnUp.js", "imports": ["/assets/components-Cw4dH9GI.js", "/assets/PostCard-Cwk0UOQZ.js", "/assets/TagBadge-zkQUgTVr.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-BvLc_oVi.js", "imports": ["/assets/components-Cw4dH9GI.js"], "css": [] } }, "url": "/assets/manifest-d9c5a48d.js", "version": "d9c5a48d" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/category.$tag": {
    id: "routes/category.$tag",
    parentId: "root",
    path: "category/:tag",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/sitemap[.]xml": {
    id: "routes/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/posts.$slug": {
    id: "routes/posts.$slug",
    parentId: "root",
    path: "posts/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/feed[.]xml": {
    id: "routes/feed[.]xml",
    parentId: "root",
    path: "feed.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
