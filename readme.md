# Fonte CV Website

A personal CV and repository portfolio with a warm ivory and olive palette. Built with the Sites scaffold, React, and Next.js, with a static export for GitHub Pages.

## Edit the profile

Update `config/profile.json`. Profile content is validated before rendering or building; malformed records and unsafe links fail with a field-specific error.

- `display_name`, `monogram`, `role`, `summary`, and `availability` control the introduction.
- `github_username` and `site_url` control the profile link and canonical/social URLs.
- `contact_details` contains the two addresses and the Google Scholar link supplied in the CV.
- `experience` and `education` contain entries with `title`, `organization`, `period`, and `description`.
- `research_projects` contains six expandable project summaries with dates, details, and keywords.
- `publications` preserves author contribution, paper title, venue, status, and author reference exactly enough to distinguish published, under-review, preprint, and in-preparation work.
- `technical_skills` and `languages` describe tools and communication languages without implying a proficiency score.
- `projects` contains public repository links and descriptions. Preserve attribution and do not imply authorship of upstream work.
- `is_complete` controls the draft note; it is `true` for the reviewed CV content and should be revisited after future edits.

The expanded profile is based on the supplied CV and current public GitHub repository READMEs. No information was taken from the CV's portrait: the website intentionally uses its abstract monogram artwork instead. Date of birth and citizenship are intentionally omitted from the public page; private machine paths, topology, credentials, and private repository details are not included.

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

`build` produces the Sites/Cloudflare-compatible output in `dist`. `build_pages` runs a standard Next.js static export and produces `out`, including `.nojekyll`. The marker supports optional branch-based publication; the Actions artifact deployment does not run Jekyll and its upload action omits dotfiles. These builds use the same page and components; there is no duplicated static implementation.

## GitHub Pages

The user-site target is `https://yuedongsun.github.io/`, backed by the repository `YueDongSun/yuedongsun.github.io`.

1. Push the source to the repository's `main` branch.
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Run **Publish CV Website**, or push to `main`.
4. Wait for both the build and deploy jobs to succeed, then check the published URL.

The workflow uploads only `out`. It does not publish local dependencies, Sites build output, or source files as the website. It uses read-only source permissions for building and grants Pages/OIDC write permissions only to the deployment job. Deployment runs share a concurrency group.

For a project site such as `https://example.github.io/cv/`, set `site_url` to that full URL. The workflow passes the Pages `base_path` into the static build. For a manual build, set the process environment variable `cv_base_path` to `/cv` without a trailing slash. The default is an empty base path. The `build_pages` script sets `cv_static_export=true` only for its child process; it never changes global environment settings.

## Printing

Choose **Print CV**, then select a printer or **Save as PDF** in the browser. The print stylesheet removes decorative graphics and navigation, restores every project even when a category filter is active, and includes repository URLs. A generated PDF is not stored in the repository.

## Structure

- `app`: page composition, global styles, and metadata.
- `components`: navigation, project-filter, education, research, publication, skills, and contact interfaces.
- `config`: editable public profile content and its validated adapter.
- `lib`: UI-independent profile contract and validation.
- `scripts`: bounded static-build orchestration.
- `tests`: profile boundary and safety tests.
- `.github/workflows`: GitHub Pages publication.
- `public/og.png`: branded social preview image.

## Updating and rollback

Edit the profile or components, run the checks, and push a new commit. To roll back a published version, revert the relevant commit and let the same workflow redeploy. Do not force-push history or delete the repository as a rollback method.

## References

- [GitHub Pages user sites](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Custom GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Public GitHub profile](https://github.com/YueDongSun)
