# Editing the personal site

## Update content

Edit `config/profile.json` for profile text, education, experience, publications, research, and the project directory. The parser in `lib/profile_contract.ts` validates records and HTTPS URLs.

- `experience`: three compact institution cards; organisation names select the corresponding official logo.
- `education`: compact sidebar records.
- `research_projects`: summary, detailed text, optional local figures, dates, and keywords.
- `publications`: title, author reference, venue, status, contribution, optional `url` and `link_label`.
- `projects`: public repository URL, category, tags, optional status, attribution, and upstream URL.

Project search matches names, summaries, detailed text, categories, tags, and repository names. Categories are generated from the data. A status such as `M0 · Scaffold`, `Pre-alpha`, or `Fork` should remain consistent with the repository.

## Layout and appearance

`app/globals.css` defines the warm paper palette, serif headings, compact rows, responsive sidebar, navigation, disclosure panels, project directory, and print styles. `components/tools_showcase.module.css` applies the same language to the software route. Keep institution image aspect ratios and readable type sizes when adjusting density.

The legacy anchors `#about`, `#experience`, `#research`, `#projects`, `#publications`, `#skills`, and `#contact` are retained. Tools anchors include `#products`, `#tailnet_mesh`, `#cc`, `#vibemux`, `#principles`, and `#questions`.

## Check and publish

```sh
npm test
npm run typecheck
npm run build_pages
```

Inspect desktop and mobile layouts, research disclosures, project filters, navigation, and printing when UI changes. Verify the static output contains `index.html`, `tools/index.html`, and all referenced institution assets. Push the reviewed change to `main` and wait for both GitHub Actions jobs to finish before reporting publication.

The canonical pages are https://yuedongsun.github.io/ and https://yuedongsun.github.io/tools/. Their SEO metadata, sitemap, and internal links use these routes.
