# Yuedong Sun · Personal website

A personal research portfolio for **Yuedong Sun / 孙跃东**, connecting quantum physics, STEM reinforcement learning, and software engineering.

- **Homepage:** https://yuedongsun.github.io/
- **Software introductions:** https://yuedongsun.github.io/tools/
- **Source:** https://github.com/YueDongSun/yuedongsun.github.io

The design uses warm paper colours, dark text, serif headings, fine rules, and large editorial images with compact supporting information. A personal sidebar accompanies three selectable, illustrated education and experience stories, a research gallery, publications with full-width paper figures, an interactive project directory, and contact details.

## Content

`config/profile.json` holds the biography, education, experience, research figures, publications, and project descriptions. `config/tools.ts` holds the expanded software introductions. Institution marks are local assets from the official websites; their origins are documented in `public/institutions/SOURCES.md`.

The publication list distinguishes journal articles, preprints, and manuscripts. Published records link directly to their DOI, and the preprint links to arXiv. The existing Google Scholar profile is linked without embedding changing citation metrics. Project entries show development status, and derived projects retain upstream attribution.

Each research topic pairs two complementary images that can be enlarged. Lightweight previews keep original figures available for close reading. `config/publication_visuals.ts` associates paper images with publication IDs and labels their published, preprint or author-provided manuscript source; figure credits live in `public/papers/SOURCES.md` and `public/research/SOURCES.md`. The project directory and Tools page use large SVG workflow illustrations to explain each tool's purpose.

Experience cards select panoramic stories for ByteDance Seed, Tsinghua IIIS and USTC School of the Gifted Young. Their generated concept artwork shares a warm ivory, copper and frosted-glass direction. Seed covers STEM data, reinforcement-learning algorithms and benchmarks; Tsinghua covers quantum memories, multiplexing and networks; USTC covers mathematical foundations, quantum optics and rare-earth systems. Deep links `#seed`, `#tsinghua` and `#ustc` open the corresponding story.

See [content sources](docs/content_sources_20261112.md) for the November 2026 bibliography and profile update, and [editing guide](docs/editing_guide.md) for routine maintenance.

## Local development

Use Node.js 24 and the committed npm lockfile.

```sh
npm ci
npm run dev
```

The existing Vinext setup supports the Sites source workflow. The canonical GitHub Pages publication uses a standard Next.js static export:

```sh
npm test
npm run typecheck
npm run build_pages
```

`out/` contains the complete static website, including `/tools/index.html`. All links, styles, logos, and research images work without a server API, database, or visitor login. No external font or analytics service is required.

## Publishing

The `Publish CV Website` GitHub Actions workflow builds and deploys pushes to `main`. It uploads only `out/`, uses the repository's GitHub Pages environment, and supplies the configured base path to the static export. In **Settings → Pages**, the build source is **GitHub Actions**.

The two former Sites introductions have separate source checkouts and fixed HTTP 308 redirects to the corresponding GitHub Pages pages. The personal research workbench is a separate application. The historical Sites identity in this repository is retained for provenance; publish the canonical portfolio through the GitHub Pages workflow.

## Interaction and accessibility

- Search public projects by name, subject, or technology; combine with a category filter.
- Expand individual research entries or use the expand/collapse controls.
- Enlarge research and publication figures; close the viewer with its close control or Escape.
- Select an experience story by card, deep link, or keyboard navigation.
- Use the mobile navigation menu, section links, and skip link.
- Choose **Print CV** to print or save a PDF; research disclosures expand for printing and then restore their state.
- Layouts adapt from a desktop sidebar to a single-column mobile view; motion respects reduced-motion settings.

## Structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx`, `app/globals.css` | Main portfolio layout and design tokens |
| `app/tools/page.tsx` | Software overview route and metadata |
| `components/` | Navigation, research disclosures, publications, project filters, and tools presentation |
| `config/profile.json` | Editable personal, research, and project content |
| `config/tools.ts` | Detailed software introductions |
| `lib/profile_contract.ts` | Typed content validation, URL and contact checks |
| `public/institutions/` | Official institution marks and source credits |
| `public/research/` | Research figures from the supplied CV |
| `public/research/previews/` | Compressed web previews of selected research figures |
| `public/papers/` | Publication figures and source credits |
| `public/seed/` | Generated STEM reinforcement-learning illustration and provenance |
| `public/experience/` | Generated Tsinghua and USTC experience illustrations and their briefs |
| `config/publication_visuals.ts` | Publication IDs mapped to figures, captions, and source links |
| `scripts/build_github_pages.mjs` | Next.js static-export orchestration |
| `.github/workflows/deploy_pages.yml` | GitHub Pages publication |

Keep project links public, use primary publication records for bibliography changes, and preserve manuscript status until a published record is available. To roll back a deployment, revert the relevant source commit and allow the same workflow to publish the result.
