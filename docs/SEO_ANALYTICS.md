# SEO and analytics

## Discoverability

All primary pages have distinct descriptions, titles and canonicals under https://zacky.id. Static project/article parameters support prerendering. Unknown and unpublished slugs return 404. The root declares RSS discovery, Open Graph, Twitter previews and author information. Sitemap includes real routes/projects and only published articles; dates come from content rather than a new fake modification date each request. robots.txt points to sitemap.xml.

JSON-LD includes Person, WebSite, BreadcrumbList, BlogPosting, and SoftwareSourceCode. Serialization escapes `<` to prevent script termination. Project facts do not claim measured business outcomes. Use the Rich Results Test and rendered HTML to check production output; no ranking or SEO-score gain is promised.

## GA4 setup

1. Create a GA4 web data stream for zacky.id and set NEXT_PUBLIC_GA_MEASUREMENT_ID at build time. Empty or malformed IDs disable integration.
2. Disable Enhanced Measurement automatic page views/history events and form/outbound/download capture in the Google stream. This application sends manual page views; Google-side auto measurement would duplicate them or collect unnecessary data. Disable Google Signals, advertising personalization and user-provided data; choose appropriate retention and regional settings.
3. Deploy and explicitly allow analytics in the consent control. Before permission, no Google script loads. Do Not Track and Global Privacy Control block tracking. Preferences can be changed on /privacy. Previously set Google cookies are managed by Google's consent update; denial blocks this application's events.
4. Verify exactly one page_view per pathname transition in DebugView or a network inspector; no query strings or form payloads should appear. Do not add a second tag through a proxy or tag manager.

The loader uses afterInteractive and send_page_view:false. Events are an allowlist: project_source, project_live, article_engagement (scroll after 10 seconds), contact_start and contact_success. Parameters contain only the pathname. No names, email addresses, messages, token values or URL query strings are accepted by the event API. Usage measurement is optional and never blocks core navigation.

Vercel Analytics, Speed Insights and Umami injection were removed to prevent redundant tracking. No advertising or mandatory observability stack was added. Unit tests stub the browser event API; browser tests should intercept Google endpoints, never contact live tracking systems for verification.

Sources checked: [Next metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [GA manual page views](https://developers.google.com/analytics/devguides/collection/ga4/views), [Node release support](https://nodejs.org/en/about/previous-releases), [k6 arrival-rate model](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/constant-arrival-rate/).
