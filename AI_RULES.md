# AI_RULES.md — Memory Slideshow Gift App (Expo RN, Android, Landscape)

## Purpose

Build an Android-only, offline, gift-style slideshow app in **Expo React Native (TypeScript)**.
Photos are **hardcoded/bundled** in the APK (Option A) and displayed in a **landscape-only** slideshow optimized for **1280×800**.

## Core UX rules

1. **Tap anywhere** toggles a **full-screen minimal HUD**.
2. When **HUD is visible**, slideshow is **automatically paused**.
3. HUD contains:
   - **Center:** play/pause
   - **Left/Right:** prev/next (wide spacing)
   - **Bottom center:** **chapter progress dots** (photos only)
   - **Bottom right:** **info/about** button (above progress row, same right margin), and **settings cog** (opens speed dropdown)
4. **Speeds** (selectable in HUD dropdown):
   - `fast`: photo 10s, chapter 4s
   - `slow`: photo 60s, chapter 6s
   - `slower`: photo 10min, chapter 6s
5. HUD visuals: **white at 50% opacity** (icons/text).
6. **Info bubble**:
   - Per-photo “details” (not every photo has it)
   - When HUD is hidden, the bubble is still visible at **20% opacity** _if details exist_
   - Opens a **chat-bubble style modal** on tap.
7. **Frame overlay**:
   - Always rendered on top of photos
   - Can be **chapter-specific** via `frameKey`
8. No audio. No backend. No network requirement.

## Visual theme

- Background: `#18191b`
- Card: `#292b2e`
- Neon accent: **more red than pink** (keep pink/violet subtle)

## Data model

Single ordered playlist `MEMORIES` includes:

- `chapter` items (cards between groups)
- `photo` items (slides)

Photo supports: `caption?`, `date?`, `details?`, `chapterId`, `frameKey?`
Chapter supports: `title`, `subtitle?`, `frameKey?`

## Rendering rules

- Photo slide: blurred/dimmed background fill + foreground `contain`.
- Crossfade transitions between slides.
- Chapter slide: centered card using card color + neon accents.
- Progress dots are calculated per chapter based on **photos only**.

## Pause logic rules (must implement)

Use split pause states:

- `pausedByUser` (manual via play/pause)
- `hudVisible` (auto pause)
  Effective paused = `pausedByUser || hudVisible`
  Auto-resume when HUD hides **only if** `pausedByUser === false`.

## File structure (keep stable)

assets/
photos/ (001.jpg, 002.jpg, ...)
src/
data/
photos.ts # hardcoded require() map
memories.ts # playlist with chapters + photos
theme/
theme.ts # tokens: colors, spacing, radii, typography
slideshow/
slideshowTypes.ts # MemoryItem types, SpeedMode types
useSlideshow.ts # timer/index/pause/speed logic, chapter dots helpers
ui/
CoverScreen.tsx
SlideshowScreen.tsx
SlideRenderer.tsx # crossfade + chapter rendering
FrameOverlay.tsx # frame per frameKey
HudOverlay.tsx # full-screen HUD + dropdown
InfoBubble.tsx # 20% persistent bubble when details exist
InfoModal.tsx # chat bubble modal for details
ProgressDots.tsx # chapter dots
App.tsx

## Coding rules

- TypeScript everywhere.
- No unnecessary libraries; prefer Expo-supported packages.
- Use `expo-image` for images.
- Use RN `Animated` for crossfade/zoom.
- Keep layout constants centralized in theme or a small constants section.
- Avoid fragile dynamic requires — generate a stable mapping in `photos.ts`.
- Keep components small and testable; avoid deeply nested logic in screens.
- When generating or editing code, format it to match the project's Prettier rules (per `.prettierrc.json`) so files stay formatted without a separate formatting pass.

## Deliverable definition

After implementation, app should:

- Launch to cover screen
- Start slideshow
- Tap shows HUD + pauses
- HUD controls work (prev/next/play/pause/speed dropdown)
- Chapter dots reflect current photo within chapter
- Frame overlay visible and chapter-specific
- Info bubble behaves per rules
- Works fully offline, landscape locked
