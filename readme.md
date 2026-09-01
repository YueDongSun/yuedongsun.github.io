# Fonte CV Website

A personal CV and repository portfolio with a warm ivory and olive palette. Built with the Sites scaffold, React, and Next.js, with a static export for GitHub Pages. The `/tools/` subpage presents tailnet-mesh, cc, and vibemux as independent product overviews inside the same portfolio design system.

## Frontend maintenance

See [the editing guide](docs/editing_guide.md) for the profile file map, examples, responsive styling controls, local preview steps, and safe publication workflow. See [the Tools page guide](docs/tools_page.md) for the subpage content boundaries and route-specific files. CV content remains in `config/profile.json`; the separate Tools catalog lives in `config/tools.ts`. The frontend refresh does not change scholarly claims or contact details.

The refresh adds sticky navigation, a data-driven portfolio index, research Expand all / Collapse all controls, larger mobile reading surfaces, and print disclosure-state restoration. Original snapshot assertions now use `tests/fixtures/reviewed_profile.json`, while the live profile is validated independently so routine content updates do not fail obsolete count assertions.

## Edit the profile

Update `config/profile.json`. Profile content is validated before rendering or building; malformed records and unsafe links fail with a field-specific error.

- `display_name`, `nickname`, `role`, `summary`, and `availability` control the introduction. The current display name is `YuedongSun`, with `Fonte` as the nickname. The reusable site mark is implemented in `components/brand_mark.tsx`.
- `github_username` and `site_url` control the profile link and canonical/social URLs.
- `contact_details` contains the two addresses and the Google Scholar link supplied in the CV.
- `experience` and `education` contain entries with `title`, `organization`, `period`, and `description`.
- `research_projects` contains six expandable project summaries with dates, details, and keywords.
- `publications` preserves author contribution, paper title, venue, status, and author reference exactly enough to distinguish published, under-review, preprint, and in-preparation work.
- `technical_skills` and `languages` describe tools and communication languages without implying a proficiency score.
- `projects` contains public repository links and descriptions. Preserve attribution and do not imply authorship of upstream work.
- `private_projects` contains concise, public-facing summaries of selected private repositories. They intentionally have no outbound links until the repositories are made public.
- `is_complete` controls the draft note; it is `true` for the reviewed CV content and should be revisited after future edits.

The expanded profile is based on the supplied CV and current GitHub repository READMEs. Seven research figures were extracted from the CV and placed under `public/research`; the portrait and empty mask layers were intentionally excluded, so the website keeps its abstract quantum-path artwork. Date of birth and citizenship are intentionally omitted from the public page. Private source code, operational paths, topology, credentials, and private repository internals are not included; only the concise summaries in `private_projects` are public by design.

## Discoverability and performance

The site includes root-level `robots.txt` and `sitemap.xml` with the canonical public URLs, plus a `ProfilePage`/`Person` JSON-LD block with the public name, nickname, role, focus areas, GitHub, and Scholar links. The research figures use explicit dimensions, responsive `sizes`, and lazy loading so the browser can reserve layout space and defer below-the-fold image work. There are no remote font or analytics requests.

The sitemap lists both the canonical profile page and `/tools/`; it does not guarantee indexing. The Tools route has its own canonical URL, description, and social metadata, and reuses the reviewed Tools preview at `public/tools/og.png`. After a major profile update, use Google Search Console's URL Inspection and sitemap tools, then check PageSpeed Insights for current field data. References: [ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), and [robots.txt specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec).

## Local development

Use Node.js 24 and npm. Dependencies are pinned by `package-lock.json`.

```sh
npm ci
npm run dev
```

The development server prints its local address. All page content is rendered on the server; the mobile navigation, active section indicator, project filters, and print control add small client interactions. No database, login, analytics, remote fonts, or API keys are needed.

## Checks

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm run build_pages
```

`build` produces the Sites/Cloudflare-compatible output in `dist`. `build_pages` runs a standard Next.js static export and produces `out`, including `.nojekyll` and `out/tools/index.html`. The marker supports optional branch-based publication; the Actions artifact deployment does not run Jekyll and its upload action omits dotfiles. These builds use the same routes and components; there is no duplicated static implementation.

## GitHub Pages

The user-site target is `https://yuedongsun.github.io/`, backed by the repository `YueDongSun/yuedongsun.github.io`.

1. Push the source to the repository's `main` branch.
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Run **Publish CV Website**, or push to `main`.
4. Wait for both the build and deploy jobs to succeed, then check the published URL and `/tools/`.

The workflow uploads only `out`. It does not publish local dependencies, Sites build output, or source files as the website. It uses read-only source permissions for building and grants Pages/OIDC write permissions only to the deployment job. Deployment runs share a concurrency group.

For a project site such as `https://example.github.io/cv/`, set `site_url` to that full URL. The workflow passes the Pages `base_path` into the static build. For a manual build, set the process environment variable `cv_base_path` to `/cv` without a trailing slash. The default is an empty base path. The `build_pages` script sets `cv_static_export=true` only for its child process; it never changes global environment settings.

## Printing

Choose **Print CV** on the portfolio or **Print page** on the Tools route, then select a printer or **Save as PDF** in the browser. The print workflow expands native disclosure elements before printing and restores their original state afterward. A generated PDF is not stored in the repository.

## Structure

- `app`: root portfolio composition, the `/tools/` route, global styles, and route metadata.
- `components`: navigation, the Tools showcase and scoped style module, project-filter, education, research, publication, skills, public-project, private-project, and contact interfaces.
- `config`: editable public profile content, its validated adapter, and the typed public Tools catalog.
- `lib`: UI-independent profile contract and validation.
- `scripts`: bounded static-build orchestration.
- `tests`: profile boundary, safety, and public Tools catalog tests.
- `.github/workflows`: GitHub Pages publication.
- `public/og.png`: branded profile social preview image.
- `public/tools/og.png`: the Tools subpage social preview image.
- `public/research`: extracted non-portrait research figures, referenced by validated profile records.

## Updating and rollback

Edit the profile, Tools catalog, or components, run the checks, and review the source diff. A local change or commit does not publish the site. To roll back a published version, revert the relevant commit and let the same workflow redeploy. Do not force-push history or delete the repository as a rollback method.

## References

- [GitHub Pages user sites](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Custom GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Public GitHub profile](https://github.com/YueDongSun)
