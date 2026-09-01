# Homepage Editing Guide

This guide accompanies the local frontend refresh of [YueDongSun/yuedongsun.github.io](https://github.com/YueDongSun/yuedongsun.github.io). The baseline is main commit 95efdb61a8adae60f6813e1f3b05394bb31345a6. The public website is [yuedongsun.github.io](https://yuedongsun.github.io/).

The refresh is prepared locally. It has not been committed, pushed, or deployed. The existing GitHub Pages and Sites configurations are preserved.

## Start with the file that matches your change

Paths below are relative to the repository or the extracted homepage_source folder.

| What you want to change | Where to edit | Notes |
| --- | --- | --- |
| Name, nickname, professional role | config/profile.json | display_name, nickname, role |
| Biography and availability | config/profile.json | summary, availability |
| Email addresses and Google Scholar | config/profile.json | contact_details |
| GitHub profile and canonical website URL | config/profile.json | github_username, site_url |
| Experience and education | config/profile.json | experience, education; order is the display order |
| Research projects and their figures | config/profile.json | research_projects |
| Paper titles, author contributions, venues and statuses | config/profile.json | publications |
| Public code projects | config/profile.json | projects; the filters derive from category |
| Public descriptions of private projects | config/profile.json | private_projects; deliberately no source links |
| Research interests, skills and languages | config/profile.json | focus_areas, technical_skills, languages |
| Main headline, section headings, fixed wording and section order | app/page.tsx | For example, “Building bridges…” is here, not in the JSON |
| Colors, fonts, widths, spacing and mobile layout | app/globals.css | Shared variables at the top; coordinated screen overrides near the end |
| Top navigation labels and destinations | components/site_header.tsx | navigation_items; keep section IDs in sync with app/page.tsx |
| Research expand/collapse controls | components/research_project_list.tsx | Native details elements remain individually keyboard accessible |
| Public project cards and category filters | components/project_gallery.tsx | The terminal illustration now uses each repository_name |
| Publication list presentation | components/publication_list.tsx | The renderer groups by contribution |
| Private project cards | components/private_project_list.tsx | Public summaries only |
| Page title, social metadata and structured data | app/layout.tsx | Most metadata already reads the public profile |
| Social preview image | public/og.png | Retained from the existing site |
| Research image files | public/research/ | Reference them as /research/file_name.png in JSON |
| Accepted data fields and validation rules | lib/profile_contract.ts | Needed only when introducing a new data field or supported value |
| GitHub Pages deployment | .github/workflows/deploy_pages.yml | Pushes to main deploy automatically when the workflow succeeds |

**Do not edit generated files in out, dist, .next, .vinext or node_modules.** They will be replaced on the next build.

For an ordinary biography, email, paper, or project update, edit config/profile.json first. You usually do not need to change React or CSS.

## Edit on GitHub

1. Open [the source repository](https://github.com/YueDongSun/yuedongsun.github.io).
2. Open [config/profile.json](https://github.com/YueDongSun/yuedongsun.github.io/blob/main/config/profile.json).
3. Choose the pencil / Edit action. A GitHub login and write permission are required.
4. Make the smallest intended change. JSON requires double quotes and commas between entries; it does not support comments or trailing commas.
5. Prefer a new branch and pull request to review changes before merging.
6. A commit merged or pushed to main triggers Publish CV Website. Wait for both the build and deploy jobs to finish, then check the public site.

These links currently show the online baseline, not this unpushed local refresh. To adopt the refresh, apply the delivered patch or copy the listed changed files first.

## Common content changes

### Update your biography

Edit summary and availability in config/profile.json. The hero, contact area, and metadata reuse these values.

The large editorial headline is separate: edit the h1 with id hero_heading in app/page.tsx. The introduction now shows display_name and nickname directly above it.

The profile card still derives its training and location from education[0] using the original text conventions. If you change institution, degree wording or entry order, review the two Training/Based in expressions in app/page.tsx. They are not independent JSON fields.

### Add a paper

Append an object to publications, using the existing records as examples:

    {
      "id": "example_publication",
      "contribution": "Co-author",
      "title": "Your paper title",
      "venue": "Journal or preprint identifier",
      "status": "Preprint · 2026",
      "reference": "Author names and contribution notation"
    }

Keep the scientific status and author contribution accurate. The portfolio count includes all listed publication records, including unpublished work; it is not a count of peer-reviewed papers.

contribution accepts only Co-first author or Co-author. IDs must be unique within their collection and use lowercase snake_case.

The current schema has no publication URL or DOI field. Adding an arbitrary url key alone will not create a clickable title. Extend the interface, parser, renderer and tests together if that feature is needed; use only verified URLs.

### Add a research image

1. Add the PNG under public/research, for example public/research/new_experiment.png.
2. Add its record to the appropriate research_projects entry:

    {
      "src": "/research/new_experiment.png",
      "alt": "A concise description of the figure and its important visual content.",
      "caption": "The caption displayed below the image.",
      "width": 1600,
      "height": 900
    }

Use the image's actual pixel dimensions. Width and height must be positive integers. The validator accepts lowercase snake_case PNG filenames under /research/ only. External image URLs, JPEG paths, missing descriptions, and invalid dimensions fail validation.

The layout preserves aspect ratios and lazy-loads below-the-fold figures. On narrow screens the figures use the full research card width.

### Add a public repository

Copy one existing projects entry and update id, title, repository_name, description, details, category, url, tags and motif. Use an HTTPS URL without embedded credentials.

Categories automatically become filter buttons. Supported motifs are terminal, orbit, network and calibration. Do not invent new motif strings without extending the contract and renderer.

Use private_projects only for information you deliberately want to disclose publicly. Do not put private code, internal paths, credentials, topology or hidden links in the website.

### Mark a draft

Set is_complete to false to show the profile-in-progress note below the introduction. It is true in the preserved profile.

## Change the visual style

Edit the :root block at the top of app/globals.css:

| Variable | Controls |
| --- | --- |
| --paper | Page background |
| --ink | Primary text |
| --muted | Secondary body text |
| --green / --green_dark | Accent and dark surfaces |
| --surface | Hover and active navigation surfaces |
| --serif / --sans / --mono | Font families |
| --page_width | Maximum desktop page width |
| --page_gutter | Responsive horizontal padding |
| --header_height | Sticky navigation height and anchor offsets |

Use readable contrast when changing colors. If changing --paper, also update the translucent header background in the coordinated screen rules.

The screen section near the end of the stylesheet contains the refresh and its 1100px, 900px, 700px and 460px breakpoints. The mobile menu threshold in components/site_header.tsx must match the 900px CSS threshold. The dropdown scrolls within the available viewport on short screens. Print rules remain separate.

Reduced-motion preferences continue to disable animation and smooth scrolling. Do not remove focus-visible outlines or the skip link.

## Preview and validate locally

Use Node.js 24 and the existing npm lockfile. From the repository root:

    npm ci
    npm run dev

Open the exact local URL printed by the server. Stop it with Ctrl+C when finished.

Before publishing:

    npm test
    npm run typecheck
    npm run lint
    npm run build_pages
    npm run build

The GitHub Pages export is out. The Sites-compatible build is dist. Neither command publishes the site.

The original reviewed-CV assertions are retained against tests/fixtures/reviewed_profile.json, a fixed historical fixture. The live config/profile.json is validated separately, so adding a legitimate new paper or changing your email no longer fails an obsolete content-count assertion. Do not update the historical fixture for routine biography edits.

## Review checklist before going live

- Check desktop, 390px phone width, 320px narrow width, and a short landscape viewport.
- Confirm no horizontal overflow and that all menu items remain reachable.
- Navigate with Tab; open the menu, follow an anchor, dismiss with Escape, and move focus outside the header.
- Expand and collapse individual research entries, then use Expand all and Collapse all.
- Exercise every code category and return to All projects.
- Open the browser's print preview with some research/private items collapsed and a code filter selected.
- Confirm print includes all projects and details, then cancel printing and check that the original disclosure state returns.
- Check email, GitHub and Scholar destinations, plus figure captions.
- Confirm scholarly claims and publication statuses remain accurate.

The supplied validation report distinguishes source/build checks from browser and live-deployment evidence. Do not interpret a passing build as a completed visual or accessibility audit.

## Adoption and rollback

The supplied frontend_changes.patch is based on the baseline commit above. In a clean checkout of the same baseline:

    git apply --check /path/to/frontend_changes.patch
    git apply /path/to/frontend_changes.patch

The first command checks compatibility without changing files. If it fails because the online repository has moved on, review and merge the relevant files; do not overwrite newer work.

Alternatively, extract homepage_source.zip into a new folder and inspect or run the full source there. Do not copy node_modules, generated output or local environment files into the repository.

A local review does not publish anything. Once the intended changes have been approved, commit only those files and publish through the existing GitHub Pages workflow. To roll back an already published version, revert the relevant commit and let the same workflow redeploy. Do not force-push or delete the repository.
