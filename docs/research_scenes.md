# Editable research scenes

The three experience stories use inline SVG scenes for scientific reasoning, spatially addressed quantum memories, and light–matter interaction. Their geometry and motion are authored in React and CSS modules within the existing experience panels. The illustrations share the site's neutral palette and follow the system light/dark setting.

Each scene presents a conceptual sequence. Publication figures and measured research results retain their own images, captions, source links, and enlarged views. The earlier generated experience images remain in `public/seed/` and `public/experience/` with their provenance notes; the experience panels now render the editable SVG artwork.

## Files and responsibilities

| File | Responsibility |
| --- | --- |
| `components/experience_stories.tsx` | Existing story tabs, deep links, and the active story passed to each illustration |
| `components/research_scene.tsx` | Scene selection, duration, accessible descriptions, captions, visibility state, Pause/Play, and Replay |
| `components/research_scene.module.css` | Neutral palette, canvas sizing, captions, controls, reduced-motion and print behavior |
| `components/scenes/stem_scene.tsx` | Problem surface, candidate contours, comparison, and feedback geometry |
| `components/scenes/stem_scene.module.css` | The 14-second learning/feedback sequence |
| `components/scenes/memory_scene.tsx` | Perspective mode array, selected waist, wavefronts, and remote volume |
| `components/scenes/memory_scene.module.css` | The 12-second addressing/storage/connection sequence |
| `components/scenes/optics_scene.tsx` | Localized site, conceptual host, optical envelopes, and energy levels |
| `components/scenes/optics_scene.module.css` | The 12-second excitation/response sequence |
| `scripts/preview_research_scenes.mjs` | Dependency-free loopback server for the production export and local review page |
| `scripts/research_scene_preview.html` | Local viewport, theme, playback, and timeline inspection controls |

The SVG viewBox is `0 0 1000 560`. Artwork scales within the existing panel. Captions and controls reflow below it on narrow screens. There are no raster images, video files, animation libraries, or 3D engines in the scene implementation.

## Local preview

Use the repository's Node.js 24 setup and committed lockfile. From the repository root:

```sh
npm ci
npm run build_pages
npm run preview_scenes
```

Open [the scene review page](http://127.0.0.1:4173/__scene-preview/). The dependency-free Node server serves `out/` and the review HTML on `127.0.0.1:4173`. The review route and its controls stay local; `build_pages` does not include them in the exported or deployed website. `SCENE_PREVIEW_PORT` can select another loopback port between 1024 and 65535.

The review controls provide:

- **Story:** load one of the existing experience deep links in the production page.
- **Viewport:** set the iframe's native CSS viewport width to 1280, 390, or 320 pixels. The production page applies its normal responsive breakpoints inside that viewport.
- **Color scheme:** change the parent document's CSS `color-scheme`, inherited by the embedded page. The status line reads the embedded browser's actual `prefers-color-scheme` media query, along with its reduced-motion preference and viewport dimensions.
- **Play sequence / Pause:** operate the production scene's own Replay and Pause controls.
- **Inspect a frame:** pause the CSS animations and set their `currentTime` to the chosen percentage of their duration. This inspects the real SVG/CSS scene in the browser.
- **Frame full story:** scroll the embedded production page to the selected experience panel.

The iframe is 1800 pixels tall to include the complete story in a capture. At mobile widths this represents the narrow responsive layout in a tall viewport, rather than the visible area of a physical phone. Use an ordinary browser window or device emulation when checking scrolling and offscreen pausing at a shorter viewport height.

The server also exposes the production export directly:

- [STEM learning and feedback](http://127.0.0.1:4173/#seed)
- [Multimode memories and networks](http://127.0.0.1:4173/#tsinghua)
- [Optics and light–matter interaction](http://127.0.0.1:4173/#ustc)

Keep the preview server running while reviewing. Rebuild after source edits and reload the browser. `npm run dev` remains available for the existing Vinext development workflow. The commands above preview the same static output used by the GitHub Pages build.

For a direct preview without the review controls, Python 3 can serve the export instead:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

Use one server at a time on port 4173. The direct story links above work with either server; the Python alternative serves only `out/`.

## 1. STEM learning and feedback

An open ruled surface frames a geometric problem. Three related contours fan out from that construction as candidate solutions. The foreground contour reaches a comparison aperture, where a hatched discrepancy gives the evaluation a visible consequence. A return sweep carries that feedback to a subsequent candidate. The revised contour remains a proposal with a residual, so the composition describes iteration without inventing a reward or performance measurement.

The problem construction stays fixed. Feedback changes the attempted solution. The final pose gives the revised candidate and comparison time to be read before the event layers return to their opening state.

### Timing

The duration is **14 seconds**, set by `scene_details.seed.duration` in `research_scene.tsx`. These ranges describe the coordinated story; fades overlap at stage boundaries.

| Cycle | Approximate time | Visual event |
| --- | --- | --- |
| 0–14% | 0–1.96 s | Resting construction and anticipation |
| 14–34% | 1.96–4.76 s | Related candidate contours become legible |
| 34–49% | 4.76–6.86 s | The selected attempt enters comparison; discrepancy appears |
| 49–67% | 6.86–9.38 s | Feedback traverses the return sweep |
| 67–81% | 9.38–11.34 s | The selected candidate and comparison revise |
| 81–93% | 11.34–13.02 s | Readable revised resting pose |
| 93–100% | 13.02–14 s | Reset into the next cycle |

### Geometry edits

- `surface_point` and `surface_curve` define the problem's ruled surface and perspective extrusion.
- The `candidates` definitions control the candidate origins and curve profiles. Keep related contours recognizably connected to the same construction.
- The comparison aperture, reference contour, evaluated contour, and residual hatch are authored SVG paths. Edit paired contours and the enclosed hatch area together.
- The feedback ribbon, its moving stroke, arrow, and arrival path share an intended route. Keep its origin connected to the comparison and its destination connected to the revised candidate.

## 2. Multimode memories and networks

A perspective field of optical mode waists supplies spatial depth. An addressing trace selects one waist, then a finite incoming wavefront packet converges into it. The localized contour holds after arrival, giving storage its own readable interval. A retrieved packet follows a broad curved optical corridor to a smaller remote volume, which responds after propagation reaches it.

The array sampling and support planes communicate spatial organization. They are conceptual geometry, with no claim to reproduce an apparatus, the number of experimental modes, or a measured entanglement event.

### Timing

The duration is **12 seconds**, set by `scene_details.tsinghua.duration`.

| Cycle | Approximate time | Visual event |
| --- | --- | --- |
| 0–12% | 0–1.44 s | Anticipation and spatial address selection |
| 12–31% | 1.44–3.72 s | Incident packet converges into the selected waist |
| 31–49% | 3.72–5.88 s | Localized storage contour holds |
| 49–78% | 5.88–9.36 s | Retrieval and propagation toward the remote volume |
| 78–91% | 9.36–10.92 s | Remote response and resting pose |
| 91–100% | 10.92–12 s | Event contours settle back to the opening state |

### Geometry edits

- `mode_count` controls the illustrative array sampling. The two coordinate expressions in `lattice` define its projected basis and spacing.
- `Mode_waist` is the reusable volume. Its contours, section ellipses, and base establish depth without adding apparatus components.
- The selected array address, addressing intersection, incoming packet endpoint, local hold, and optical ribbon origin are coordinated around the same spatial waist. Update all of them when moving the selected mode.
- The remote volume, ribbon endpoint, and response contours must likewise move together.
- The `propagate` keyframes contain sampled positions, rotations, and scales along the authored curved corridor. Changing the corridor requires updating those samples so that the packet remains inside it and stays transverse to its direction of travel.

## 3. Optics and light–matter interaction

A finite incident optical packet approaches a localized site inside a conceptual faceted host. The site response and connected energy-level transition rise together. The excited state holds briefly. An outgoing optical response then expands from that same site as the occupation returns to the lower level. Incoming and outgoing fields share one physical focal point, making the excitation/response relation visible.

The host geometry and level spacing are illustrative. Their shapes and distances express the sequence rather than an experimental device or measured energy scale.

### Timing

The duration is **12 seconds**, set by `scene_details.ustc.duration`.

| Cycle | Approximate time | Visual event |
| --- | --- | --- |
| 0–10% | 0–1.2 s | Quiet anticipation |
| 10–34% | 1.2–4.08 s | Incoming packet approaches and compresses at the site |
| 31–44% | 3.72–5.28 s | Local excitation and upward level transition |
| 44–54% | 5.28–6.48 s | Excited-state hold |
| 54–79% | 6.48–9.48 s | Outgoing response and return toward the lower level |
| 79–91% | 9.48–10.92 s | Settled resting composition |
| 91–100% | 10.92–12 s | Invisible event layers reset |

### Geometry edits

- `site` positions the localized groups, while `basis` and `lattice_point` generate the surrounding host lattice.
- The faceted host, optical envelopes, clipping path, and energy-level leader are authored separately. Moving `site` requires updating those related paths as well.
- Incoming and outgoing wavefront loops control packet spacing, curvature, and visual emphasis through opacity. Keep each packet finite.
- The two level lines, occupation marker, and transition arrows share one vertical separation. If the level spacing changes, update the occupation translation in CSS to match.
- `incident`, `occupation`, and `response` are the main causal keyframes. Keep the incoming packet's disappearance, excited-state hold, and outgoing response coordinated.

## Editing motion

The shared component assigns `--scene-duration`. Each scene's CSS keyframes express its timing as a percentage of that common duration. Change the value in `scene_details` to slow or accelerate the entire story while preserving its ordering. To lengthen one stage, move the relevant percentage boundaries together across all participating layers.

Base styles define the complete static composition. Animation selectors are enabled only beneath `data-animated="true"`. Preserve those base styles when changing keyframes so reduced-motion and initial server-rendered output remain useful illustrations.

Keep visible properties equal at `0%` and `100%`. A packet can return to its start position while invisible; a visible contour should settle smoothly into the opening pose. Use Replay to inspect the beginning and pause at each causal transition during local review.

## Palette and responsive presentation

The scene palette lives in `research_scene.module.css`:

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--scene-paper` | `#fafafa` | `#151515` | Canvas |
| `--scene-ink` | `#242424` | `#ededed` | Primary contours and event emphasis |
| `--scene-mid` | `#757575` | `#9c9c9c` | Supporting linework |
| `--scene-faint` | `#c7c7c7` | `#494949` | Construction and depth cues |
| `--scene-plane` | `#ebebeb` | `#252525` | Neutral filled planes |
| `--scene-highlight` | `#ffffff` | `#333333` | Restrained facet and surface highlights |

SVG gradient stops also use these variables. The dark palette follows `prefers-color-scheme`; captions use the existing site tokens. Keep important silhouettes and causal event contours in the stronger tones, with faint strokes reserved for secondary construction. Review narrow mobile sizes after geometry or stroke changes, since the viewBox scales the artwork as a whole.

### Small-screen stroke widths

At viewport widths of 760 pixels or less, selected primary contours use `vector-effect: non-scaling-stroke` with explicit CSS pixel widths. This keeps the problem/candidate profiles, selected memory waist, moving wavefronts, localized site, and energy levels from becoming arbitrarily thin as the SVG shrinks. Supporting geometry uses lighter and narrower strokes to retain the hierarchy. The overrides live at the end of each scene's CSS module; adjust them alongside the corresponding desktop contours when changing the artwork.

## Accessibility and playback lifecycle

- Each SVG has a scene-specific title and description, with unique IDs generated for each component instance. Definition IDs use the same prefix to keep gradients, hatches, and clipping paths local to that scene.
- Visible captions provide a short ordered sequence and the conceptual status of the illustration. Explanatory text remains outside the artwork.
- Pause/Play and Replay are native buttons, available to keyboard and touch users. Controls have visible focus styling and a minimum 44-pixel height. The sequence requires no hover or pointer tracking.
- An `IntersectionObserver` tracks visibility. Playback also requires an active experience panel, a visible document, motion permission, and an unpaused state. Offscreen or inactive scenes retain their timeline position while paused.
- `prefers-reduced-motion: reduce` disables the animation and displays the complete static composition. Preference changes are observed while the page is open.
- Print styles use the light palette, stop animation, and hide playback controls.
- Replay remounts the SVG event timeline while preserving the surrounding story and page controls.

## Screenshot gallery

These are actual browser captures of the production export. The gallery capture settings use a paused frame at **75% of each scene's cycle** for a consistent phase across themes and sizes: 10.5 seconds for STEM and 9 seconds for memory/optics. Desktop captures use a **1280-pixel** iframe width; mobile captures use **390 pixels**. Both use the review iframe's **1800-pixel height** to include the full story, rather than imitating a physical phone's screen height.

The preview also provides a 320-pixel width for narrow-layout inspection. Live playback and lifecycle checks are recorded separately from these paused visual captures. Capture conditions and verification outcomes belong in the validation record below.

| Scene | Desktop light | Desktop dark | Mobile light | Mobile dark |
| --- | --- | --- | --- | --- |
| STEM learning and feedback | [View](screenshots/seed-desktop-light.jpg) | [View](screenshots/seed-desktop-dark.jpg) | [View](screenshots/seed-mobile-light.jpg) | [View](screenshots/seed-mobile-dark.jpg) |
| Multimode memories and networks | [View](screenshots/tsinghua-desktop-light.jpg) | [View](screenshots/tsinghua-desktop-dark.jpg) | [View](screenshots/tsinghua-mobile-light.jpg) | [View](screenshots/tsinghua-mobile-dark.jpg) |
| Optics and light–matter interaction | [View](screenshots/ustc-desktop-light.jpg) | [View](screenshots/ustc-desktop-dark.jpg) | [View](screenshots/ustc-mobile-light.jpg) | [View](screenshots/ustc-mobile-dark.jpg) |

## Validation

Validation results are recorded in `docs/research_scene_verification.md`.
