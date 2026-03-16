# MyCrown Studio

Screen recording suite for creating promotional videos for the MyCrown AI hairstyle app.

## What It Does

MyCrown Studio is a browser-based tool that helps content creators produce polished promotional videos for **MyCrown AI** (mycrown.ai), an AI-powered hairstyle try-on app. The workflow:

1. **Prepare** — The creator opens MyCrown AI in a separate browser tab and pre-generates a few AI hairstyle results so they load instantly during recording.
2. **Configure** — In the Setup view, they set branding (app URL, watermark text/position) and audio preferences.
3. **Record** — In the Studio view, they share the MyCrown AI tab via screen capture. The app composites the screen feed, optional webcam PiP, text overlays, and a brand watermark onto a 1920x1080 canvas in real-time.
4. **Follow the script** — A built-in teleprompter guides them shot-by-shot through the chosen video format (e.g. "Glow-Up Reveal", "Style Roulette", "5 Styles 1 Face"). Each shot has timing, actions, overlay text, and production tips.
5. **Export** — Recording stops and produces a .webm file. The creator downloads it and imports into CapCut (or similar) to add trending audio, captions, transitions, and export for TikTok/Reels.

### Video Script Templates

The app ships with 8 pre-built script formats optimized for short-form social content:
- **The Glow-Up Reveal** — Before/after single style transformation (15–20s)
- **5 Styles, 1 Face** — Rapid showcase of 5 styles with poll CTA (25–35s)
- **What I Asked For vs. What AI Gave Me** — Expectation vs. reality with positive twist (20–30s)
- **Style Roulette** — Random scroll-and-stop reveal (15–25s)
- **POV: Choosing a Style for [Event]** — Relatable scenario, e.g. wedding prep (20–35s)
- **Hair Through The Decades** — 70s–2020s style journey (25–40s)
- **The "Show Your Stylist" Tutorial** — Practical how-to guide (20–30s)
- **This Style or That Style?** — A/B comparison for engagement (15–25s)

## Tech Stack

- **Framework:** React 18 + Vite 6
- **Language:** JavaScript (JSX, no TypeScript)
- **Styling:** All inline styles — no CSS files, CSS modules, or CSS-in-JS libraries
- **Fonts:** JetBrains Mono (monospace), Segoe UI (UI text) — loaded via Google Fonts CDN
- **Dependencies:** React and React DOM only (no router, no state library, no UI framework)

## Project Structure

```
index.html          — Entry HTML with global reset styles and scrollbar theming
src/
  main.jsx          — React root mount (StrictMode)
  App.jsx           — Entire application (single-file SPA)
vite.config.js      — Vite config (react plugin, dist output)
```

## Architecture

The app is a single-component SPA (`App.jsx`) with two views toggled via `view` state:

- **Setup view** — Branding configuration (app URL, watermark position, audio settings) and workflow instructions
- **Studio view** — Recording interface with:
  - Collapsible sidebar (Script / Overlays / Camera tabs)
  - Canvas-based video compositor (1920x1080) rendered via `requestAnimationFrame`
  - Screen capture + optional webcam PiP + text overlays + brand watermark
  - MediaRecorder-based recording → .webm export

## Key Patterns

- **No external CSS.** All styling uses inline React `style={{}}` objects. Global styles live in `index.html <style>` and a `<style>` tag at the bottom of the studio view JSX.
- **Canvas compositing.** Screen capture, webcam PiP, text overlays, and branding are composited onto a `<canvas>` each frame via `drawFrame()` callback.
- **Ref-based state for animation.** Overlays and brand settings are mirrored to refs (`overlaysRef`, `brandRef`) so `drawFrame` always reads current values without re-creating the callback.
- **Script templates.** 8 pre-built video script templates with shot-by-shot teleprompter data defined as a `SCRIPTS` constant array.

## Design System

- **Theme:** Dark background with gold accents
- **Colors:** Background `#0e0c0a` / `#161310`, accent `#d4a017`, text `#e8e0d4`, muted `#8a7d6b` / `#6a6560`, borders `#2a2520`
- **Helper functions:** `B()` for button styles, `inp`/`sel`/`lbl` objects for form element styles

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build to dist/
npm run preview   # Preview production build
```
