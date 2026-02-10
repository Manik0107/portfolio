

## Plan: Coding Background Animation + Horizontal-Only Project Scroll

### 1. Enhance the Coding Background (`CodingBackground.tsx`)

The existing Matrix-style falling code animation needs to blend with the neural grid pattern already on the page. Changes:

- **Reduce opacity to ~0.4** so it sits behind the grid lines rather than competing
- **Use single-character rendering** (like the classic Matrix rain) mixed with short code tokens (`fn`, `=>`, `{}`, `AI`, `0x`, etc.) for a more terminal/hacker aesthetic
- **Match the grid**: set the column spacing to align roughly with the 50px neural grid defined in CSS
- **Add a CSS `mix-blend-mode: screen`** on the canvas so the blue/turquoise text glows through the grid lines naturally instead of painting over them
- **Slow down the animation interval** slightly (80ms instead of 60ms) for a calmer, ambient feel

### 2. Fix Project Section Scroll Behavior

Currently the `ProjectWheel` component intercepts vertical wheel events (`e.deltaY`) and translates them to horizontal movement. This hijacks normal page scrolling when the user reaches the projects section. The fix:

- **Remove the `wheel` event listener entirely** from `ProjectWheel.tsx` -- no vertical scroll hijacking
- **Keep drag-to-scroll** (already works via `drag="x"` on the motion container)
- **Add left/right arrow buttons** on either side of the wheel for keyboard/click-based navigation
- **Add horizontal scroll via trackpad/touch**: listen only for `deltaX` (horizontal swipe gestures) instead of `deltaY`
- **On the `ProjectsSection` wrapper**, remove `overflow-hidden` so the page scrolls normally past it -- vertical scroll passes through, only horizontal interaction moves the cards

### Technical Details

**File: `src/components/CodingBackground.tsx`**
- Change character set to single glyphs + short tokens
- Align column spacing to ~50px (matching neural-grid)
- Add `style={{ mixBlendMode: 'screen', opacity: 0.4 }}` to the canvas element
- Adjust fade rate (`rgba(10, 13, 18, 0.05)`) for a longer trail effect that blends with grid

**File: `src/components/ProjectWheel.tsx`**
- Remove the `useEffect` block (lines 173-206) that listens for `wheel` events
- Replace with a horizontal-only listener: only act on `e.deltaX` (trackpad horizontal swipe), ignore `deltaY` completely
- Add two navigation arrow buttons (ChevronLeft / ChevronRight from lucide) positioned at the left and right edges of the container
- Arrow click animates `x` by +/- `ITEM_FULL_WIDTH` with snapping
- Use `framer-motion`'s `animate` utility for smooth snapping on arrow click

**File: `src/components/sections/ProjectsSection.tsx`**
- Keep `overflow-hidden` only on the horizontal axis (`overflow-x-hidden overflow-y-visible` or just leave default) so vertical page scroll is never blocked

