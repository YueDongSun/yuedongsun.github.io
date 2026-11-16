# Editing the personal site

## Update content

Edit `config/profile.json` for profile text, education, experience, publications, research, and the project directory. The parser in `lib/profile_contract.ts` validates records and HTTPS URLs.

- `experience`: three selectable institution cards with official logos and a large illustrated story for each stage.
- `education`: compact sidebar records.
- `research_projects`: summary, detailed text, optional local figures, dates, and keywords.
- `publications`: title, author reference, venue, status, contribution, optional `url` and `link_label`.
- `projects`: public repository URL, category, tags, optional status, attribution, and upstream URL.

Project search matches names, summaries, detailed text, categories, tags, and repository names. Categories are generated from the data. A status such as `M0 · Scaffold`, `Pre-alpha`, or `Fork` should remain consistent with the repository.

## Images and workflow illustrations

The research overview displays selected figures from `research_projects`. Each current research entry pairs two complementary images. Original files stay in `public/research/`; `preview_src` can select a compressed WebP for normal display. `source_label` distinguishes portfolio images, manuscript/preprint figures and explanatory schematics; `source_url` is optional and must be HTTPS. Preserve complete scientific panels and use the original image in the enlarged view. Sources are recorded in `public/research/SOURCES.md`.

`config/publication_visuals.ts` maps an existing publication ID to its image, caption, source URL, version label, and dimensions. Add the corresponding original source and credit to `public/papers/SOURCES.md`. Use a complete figure belonging to that exact paper and distinguish the journal version from a preprint. Entries without a figure keep their compact text layout.

The experience stories use editable SVG scenes in `components/scenes/`, with shared captions, theme tokens, and playback controls in `components/research_scene.tsx` and its CSS module. See [research scenes](research_scenes.md) for their narrative sequences, timing and geometry edit points, reduced-motion behavior, and a runnable local preview. The earlier generated images in `public/seed/` and `public/experience/` remain with their generation briefs as provenance. Keep Seed's work scope aligned with the profile: reinforcement learning for STEM, spanning data, algorithms, and benchmarks. The other stories follow the existing education and research descriptions. These artworks are concept illustrations; technical claims and quantitative results come from their actual sources.

`components/project_visual.tsx` holds the reusable SVG workflow illustrations for the public projects and software introductions. Keep their labels aligned with the project descriptions and development stages. The diagrams explain roles and information flow; measurements belong in figures with their actual sources.

## Layout and appearance

`app/globals.css` defines the neutral light and dark palettes, serif headings, spacious image-led sections, compact metadata, responsive sidebar, navigation, disclosure panels, project directory, and print styles. Colour follows `prefers-color-scheme`; print stays on a light page. `components/tools_showcase.module.css` applies the same language to the software route. Preserve complete scientific panels and institution image aspect ratios. Let the selected images occupy substantial space on desktop, while keeping text and controls readable on narrow screens.

The legacy anchors `#about`, `#experience`, `#research`, `#projects`, `#publications`, `#skills`, and `#contact` are retained. Experience stories support `#seed`, `#tsinghua`, and `#ustc`. Tools anchors include `#products`, `#tailnet_mesh`, `#cc`, `#vibemux`, `#principles`, and `#questions`.

## Check and publish

```sh
npm test
npm run typecheck
npm run build_pages
```

Inspect desktop and mobile layouts, research disclosures, project filters, navigation, and printing when UI changes. Verify the static output contains `index.html`, `tools/index.html`, and all referenced institution assets. Push the reviewed change to `main` and wait for both GitHub Actions jobs to finish before reporting publication.

The canonical pages are https://yuedongsun.github.io/ and https://yuedongsun.github.io/tools/. Their SEO metadata, sitemap, and internal links use these routes.
