# Data sources

Configure the Storepoint Locator Widget to load locations from a CSV or JSON source instead of (or in addition to) hosted Storepoint data. Useful when your data already lives in a sheet, a CMS export, an S3 file, or anywhere returning CSV or JSON.

These recipes work with any widget ID:

- **In production**, with your real public widget ID — the embed loads locations from your CSV/JSON URL each time the widget mounts.
- **For previewing without an account**, use `'local'` as the widget ID. See [docs/local-testing-mode.md](../../docs/local-testing-mode.md).

Same recipe code, same behavior — just swap the widget ID. Every recipe below shows `'local'` so the example runs immediately, with a comment near the constructor showing the production swap.

## Recipes

| Recipe | What it does |
| --- | --- |
| [store-locator-from-csv](./store-locator-from-csv) | Store locator from a CSV file (recommended starting point) |
| [store-locator-from-json](./store-locator-from-json) | Same widget, JSON data — inline rows or fetched from a URL |
| [product-locator](./product-locator) | Where-to-buy pattern, single filter, simpler dataset |
| [service-locator](./service-locator) | Multiple filter groups for service businesses |

## Data sources accepted

- **CSV at a URL** — any URL that returns CSV. The fetch happens in the visitor's browser, so the URL needs to allow cross-origin access.
- **JSON at a URL** — any URL that returns a JSON array (or `{ locations: [...] }`).
- **Inline rows** — pass `rows: [...]` directly in the embed code.
- **Published Google Sheet CSV** — works because the published URL returns CSV. Fine for small audiences. For repeat traffic, host the CSV on infrastructure you control.

Each location needs latitude and longitude. In hosted Storepoint, addresses are geocoded automatically when you import a CSV — the `dataSource` option keeps things simple by relying on coordinates already in the data.

## Map providers

These recipes use Mapbox for the map and search suggestions by default. Swap to Google Maps with the `mapProvider` option — see [examples/map-providers](../map-providers).

You bring your own Mapbox or Google Maps key on every Storepoint plan. In an embed-driven setup you pass the key in code; in hosted Storepoint you set it once in the dashboard and every embed reuses it.

## Going to production

Replace `'local'` with your public Storepoint widget ID. The same widget keeps working — keep the `dataSource` (live-pull from your CSV/JSON) or remove it to use hosted Storepoint data instead. See [docs/going-live.md](../../docs/going-live.md).

## Related docs

- [docs/data-sources.md](../../docs/data-sources.md) — feature overview
- [docs/local-testing-mode.md](../../docs/local-testing-mode.md) — the `'local'` widget ID
- [docs/going-live.md](../../docs/going-live.md) — launch checklist
