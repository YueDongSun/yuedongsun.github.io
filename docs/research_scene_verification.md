# Research scene verification

Checked on 16 November 2026 against the production static export on the branch `feat/scientific-experience-scenes`.

## Checks performed

| Check | Observed result |
| --- | --- |
| `npm test` | All 10 existing profile and tools-catalog tests passed. |
| `npm run typecheck` | Passed. |
| `npm run lint` | No errors. The existing ignored-file warning for `next-env.d.ts` remains. |
| `npm run build_pages` | Production static export completed, including `/` and `/tools/`. |
| `git diff --check` | Passed. |
| Desktop and mobile presentation | All three scenes inspected in Chromium with light and dark media queries, at 1280- and 390-pixel iframe widths. Twelve screenshots are in `docs/screenshots/`. |
| Narrow layout | Each scene inspected at a 320-pixel viewport. Document width and scroll width were both 320 pixels; the scene fit within its existing panel. Playback buttons were 44 pixels high. |
| Theme behavior | The preview's inherited color scheme changed the embedded browser's actual `prefers-color-scheme` result. Computed scene colors and rendered artwork changed with it. |
| STEM live sequence | Candidate drawing preceded comparison; the feedback stroke traversed its return route before the candidate revision appeared. The revised pose settled and the next cycle began. |
| Memory live sequence | Incoming wavefronts arrived at the selected mode, a localized hold followed, then a packet propagated along the elevated ribbon. A separate observation of the remote-response interval showed the incoming and propagation layers at opacity 0 and the remote response at opacity 1. The next input cycle was observed. |
| Optics live sequence | The incoming packet compressed toward the site; occupation moved to the upper level and held. The outgoing response expanded while occupation returned to the lower level, followed by a resting interval and a new input cycle. |
| Pause and resume | The STEM scene's sampled animated properties remained identical across a 900 ms pause. Play resumed the sequence; its reset into the next cycle was observed. Replay was used to restart all three live sequences. |
| Offscreen lifecycle | On the direct website preview, scrolling to Projects changed the memory scene to `data-playing="false"` with CSS `animation-play-state: paused`. Its sampled packet transform and opacity stayed unchanged across 900 ms. Returning to the experience panel restored the running state without Replay. |
| Existing story keyboard control | End selected USTC; Home selected ByteDance Seed. |
| Existing publication viewer | A publication figure opened its dialog; Escape closed it. The replaced scenes have no image-viewer links. |
| Scope review | The diff leaves profile data, publication assets, publication components, framework configuration, and the deployment workflow unchanged. No runtime dependencies were added. |

The browser checks exercised the built website and its actual CSS animations. They did not infer successful motion from source code alone. The recorded computed styles provide supporting observations in [research_scenes_browser.json](verification/research_scenes_browser.json); screenshots provide visual evidence separately.

## Capture conditions

The local review page embeds the production export and offers ordinary controls for story, viewport width, theme, playback, and timeline inspection. Screenshots are paused at 75% of each cycle: 10.5 seconds for STEM and 9 seconds for memory/optics. These are selected narrative frames, not measurements or the reduced-motion composition.

The review iframe is 1800 pixels tall so each capture can include the complete existing story panel. Mobile captures therefore test the narrow responsive layout, not a physical phone's screen height or touch hardware. Captures are cropped to the story's measured browser bounds; native scrollbar space causes small differences in cropped content width within the same 390-pixel viewport. The two overview JPEGs arrange the original desktop captures with simple labels.

Offscreen behavior was checked separately on the direct website in the ordinary browser viewport. The preview controls are local authoring utilities and are not included in the website export.

## Implemented and source-reviewed, but not fully exercised here

- **System reduced motion:** `matchMedia` changes and a CSS `prefers-reduced-motion` rule select the complete static composition and remove playback controls. This browser remained at `no-preference`; activating the operating system's reduced-motion preference was not tested.
- **Document visibility and print:** the visibility listener, pause conditions, and static light print styles were reviewed. No formal hidden-tab timing test or printed-page visual check is claimed.
- **Other browsers and physical devices:** Safari, Firefox, physical touch input, and assistive-technology reading were not tested. Native buttons, SVG titles/descriptions, ordered captions, focus styles, and the static-first render were checked in source and the browser's accessibility tree.
- **Deployment:** the production export was built and served locally. No merge, deployment, or production-site change is part of this verification.

## Reproduce

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build_pages
npm run preview_scenes
```

Open `http://127.0.0.1:4173/__scene-preview/`. Use Play sequence to observe the full causal sequence; use Inspect a frame only for stationary visual comparisons. Open `http://127.0.0.1:4173/` separately to check ordinary scrolling, offscreen pausing, and unrelated website interactions. See [research_scenes.md](research_scenes.md) for the geometry and timing guide.
