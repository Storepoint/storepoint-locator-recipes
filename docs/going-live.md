# Going to production

Switch to a public Storepoint widget ID and the locator goes live. The same widget code keeps working — you decide which pieces of configuration live in the embed and which live in the dashboard.

## The one-line switch

```js
// Local testing (no account) — see local-testing-mode.md
new StorepointWidget('local', '#storepoint-widget', { /* dataSource, fieldMap, settings, mapProvider */ });

// Production
new StorepointWidget('YOUR_PUBLIC_WIDGET_ID', '#storepoint-widget', { /* optional embed overrides */ });
```

Sign up at [app.storepoint.co/login](https://app.storepoint.co/login) to get your widget ID.

## Two ways to manage your locator (both production-ready)

Once you're on a real widget ID, configuration can live in code, in the [Storepoint dashboard](https://app.storepoint.co/dashboard), or both. Embed options override the dashboard for that page.

| Configuration | In embed code | In Storepoint dashboard |
| --- | --- | --- |
| Locations | `dataSource: { type, url, rows }` (live-pulls from your CSV/JSON) — see [data-sources.md](./data-sources.md) | Remove `dataSource`. Import a CSV in the dashboard, edit locations from a spreadsheet-style UI, addresses geocoded automatically. |
| Filters and tags | `settings.filters` with rich tag options | Configure tag groups, labels, colors, and tag images in the dashboard. |
| Theme and layout | `settings.theme`, `settings.accent_color`, `settings.layout` | Set theme, colors, and layout once and reuse across embeds. |
| Map provider | `mapProvider.use` + key | Add the provider key once at the dashboard level. |

Both paths are production-ready. Pick the embed-driven setup when your data lives in a sheet or system you maintain. Pick the dashboard when you want spreadsheet-style editing, automatic geocoding on import, dashboard-managed tags and hours, search/click analytics, online alternatives, spotlight, service areas, or shared configuration across many embeds.

You can also mix — hosted data in production with a `dataSource` override on staging, or hosted data on most pages with a CMS-generated `dataSource` on a region-specific page.

## Launch checklist

- [ ] Create a Storepoint account and copy your widget ID
- [ ] Restrict your Mapbox or Google Maps key to your production domain
- [ ] Replace `'local'` with your widget ID in the embed

## Resources

- [Storepoint](https://storepoint.co)
- [Storepoint dashboard](https://app.storepoint.co/dashboard)
- [Widget JavaScript API reference](https://storepoint.co/developers/widget-javascript-api)
- [Bulk import locations](https://storepoint.co/docs/getting-started/locations/import)
- [Pricing](https://storepoint.co/pricing)
