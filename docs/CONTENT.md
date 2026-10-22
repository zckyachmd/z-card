# Writing and project authoring

## Publish an article

1. Copy `content/articles/publishing-template.json` and `.md` to matching new filenames.
2. Set a unique lowercase hyphenated `slug` matching the basename. Add the owner's original title, description, category, tags, `publishedAt` (YYYY-MM-DD), and optional `updatedAt`.
3. Write Markdown with h2/h3 sections, fenced language-tagged code, descriptive image alt text, and relative internal links. Start at h2: the page supplies h1. GFM tables and lists are supported. Do not use raw HTML, scripts, JSX or MDX imports.
4. Keep `draft: true` while reviewing; set `draft: false` only when the owner has approved publication. Future dates are hidden. Build after the publication date to make scheduled content public.
5. Run `pnpm test && pnpm build`, inspect the article, RSS, sitemap, metadata, code blocks, headings and mobile layout, then deploy the new build.

Invalid metadata fails the build. Titles/descriptions cannot be empty. Descriptions are limited to 300 characters. Dates must be real ISO dates and updatedAt cannot precede publication. Slugs disallow traversal. Draft bodies are never routed publicly. Reading time uses 220 words/minute; it is an estimate. Related articles use shared tags/category, not a fabricated recommendation feed.

Public articles are rendered statically, sorted newest first, listed in the sitemap and RSS, and receive canonical, Open Graph, Twitter and BlogPosting metadata. Article lists are data-driven and grow without component edits. Test fixture content lives under tests, excluded from normal publication.

## Projects

Edit `src/config/projects.ts`. Keep stable slugs, a concise summary, actual stack, context, architecture, considerations and verified links. Public case studies are intentionally curated, not a mirror of every repository. Use `repository: undefined` for private source. Never claim production scale, responsibilities or measured results without evidence. Existing project summaries were checked against available public README content where possible.

Images belong under public with descriptive filenames, dimensions and alt text. Do not include confidential screenshots or data. Replace the owner's portrait only with an authentic approved asset.
