# Unfold

A personal sanctuary for daily affirmations, grounding, and belief work.

## Why "Unfold"

When stress contracts you — mentally and physically — *unfolding* is the opposite movement: gentle opening, not forcing. The name is meant to feel like relief arriving, not another task.

## What's in v2

- **Belief spine** — one Active Belief per week threads through every flow
- **Ground now** — crisis flow + optional thought capture & reframe
- **Pulse** — 2-minute practice for hard days
- **Morning / Evening rituals** — affirmations + belief anchor + intention/reflection
- **Depth session** — weekly belief restructuring (15–20 min)
- **Belief detail** — evidence log and history
- **Quick belief setup** — fast path to set your first belief

## Psychology-informed design

- **Ground first** — largest action for dysregulated moments
- **Trauma-informed UX** — predictable steps, easy exit, no guilt language
- **Self-compassion framing** — CBT and acceptance-based language
- **Evidence-based belief change** — not toxic positivity
- **Flexible time** — Pulse (2m) or Ritual (5–8m) based on your energy

## Run locally

```bash
cd unfold
npm install
npm run dev
```

Open the URL shown (usually `http://localhost:5173`).

## Share it like an app

Unfold is a **PWA** (Progressive Web App). Deploy once, share a link — anyone can open it and **Add to Home Screen** on their phone. No App Store needed.

### Option A: Vercel (recommended, ~2 min)

```bash
cd unfold
npm install -g vercel   # one-time
npm run build
vercel --prod
```

You get a URL like `https://unfold-xyz.vercel.app` — share that link.

### Option B: Netlify

1. Run `npm run build`
2. Drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Option C: GitHub Pages

Push to GitHub, enable Pages on the `dist` branch or use GitHub Actions.

---

**For the person receiving the link:**

- **iPhone:** Open in Safari → Share → **Add to Home Screen**
- **Android:** Open in Chrome → menu → **Install app** or **Add to Home Screen**

It opens fullscreen, like a native app. Each person's data stays **private on their device** — nothing is stored on your server.

### App Store / Play Store?

Possible later with a wrapper (Capacitor), but for a personal wellness app a **shared PWA link** is usually enough — free, instant updates, no review process.

### Custom domain

On Vercel/Netlify you can add a domain like `unfold.yourname.com` in project settings.


All data stays in your browser (`localStorage` key: `unfold-state`). v1 data migrates automatically from `unfold-progress`.
