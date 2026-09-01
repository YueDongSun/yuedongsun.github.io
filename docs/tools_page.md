# Tools Subpage Maintenance

The `/tools/` route is a public product overview for tailnet-mesh, cc, and vibemux. It adapts the reviewed content from the existing YueDongSun Tools Site to the portfolio's warm ivory and olive visual system. The projects remain independent; the concept map does not claim that they form an automatically integrated stack.

## File map

- `app/tools/page.tsx` owns route metadata, the shared header/footer, and the canonical `/tools/` URL.
- `components/tools_showcase.tsx` owns the semantic page structure.
- `components/tools_showcase.module.css` owns page-scoped layout, product accents, responsive rules, reduced-motion behavior, and print rules.
- `config/tools.ts` is the editable public catalog for product descriptions, capabilities, maturity labels, caveats, principles, and FAQ copy.
- `public/tools/og.png` is the route-specific social preview retained from the existing Tools Site.
- `tests/tools_catalog_test.mjs` protects catalog identity, maturity caveats, the single public repository link, and common private-data markers.
- `public/sitemap.xml` lists both the profile root and `/tools/`.

## Content boundaries

- Preserve the current maturity labels: tailnet-mesh is self-hosted, cc is a desktop preview, and vibemux is pre-alpha.
- Keep configuration, platform acceptance, unsigned-preview, incomplete-integration, and worktree-not-a-sandbox caveats next to the relevant product.
- Only vibemux currently has a public repository link on this page. Do not infer or publish links for the other projects.
- Do not add machine identities, private topology, credentials, local paths, private repository URLs, live status, download claims, or account-connected behavior.
- “Local-first” does not mean offline-only. External providers and networked machines may still receive data according to user configuration.

## Local verification

Use Node.js 24 and the committed lockfile:

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm run build_pages
```

The Sites-compatible build is `dist`. The GitHub Pages export is `out`; the Tools route must produce `out/tools/index.html`, and its social image must produce `out/tools/og.png`.

These commands do not publish the site. A commit, push, GitHub Pages deployment, or Sites deployment remains a separate delivery action.
