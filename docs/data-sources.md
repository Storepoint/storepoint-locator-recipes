# Data sources

There are several ways to get location data into the Storepoint Locator Widget.

## Manage locations from the Storepoint dashboard (recommended for most setups)

In the [Storepoint dashboard](https://app.storepoint.co/dashboard), you can:

- Add and edit locations from a spreadsheet-style UI.
- Import a CSV or Excel file with drag-and-drop, with addresses geocoded automatically.
- Sync from a Google Sheet so updates flow through without re-importing.
- Push and pull locations through the [Location Management API](https://storepoint.co/developers/location-management-api) for CRMs, ERPs, or any backend integration.

This is how most customers run Storepoint. No code, no embed changes — your locations live in the dashboard, your embed is one snippet, the locator stays in sync.

## Configure the widget to load locations from CSV or JSON in JavaScript (the `dataSource` option)

The widget also supports a `dataSource` option in the embed code — point it at a CSV file, JSON file, any URL that returns CSV or JSON, or pass inline rows directly. The widget loads from that source instead of (or in addition to) your hosted Storepoint data.

```js
new StorepointWidget('YOUR_PUBLIC_WIDGET_ID', '#storepoint-widget', {
    dataSource: {
        type: 'csv',
        url: 'https://example.com/locations.csv'
    },
    fieldMap: {
        name: 'store_name',
        lat: 'latitude',
        lng: 'longitude'
    }
});
```

This is a code-level alternative to dashboard-managed data, useful when:

- You need an embed-level override on a staging page while production uses hosted data.
- You generate locations dynamically per page (CMS-driven product locator, region-specific embed).

It works with any widget ID — your real public widget ID in production, or `'local'` for a preview without an account.

### Required when using local testing mode

In [local testing mode](./local-testing-mode.md) (widget ID `'local'`), the `dataSource` option is the only way to provide locations — there's no account or widget ID to pull hosted data from so every local-mode embed includes a `dataSource`.

## Source types

| Type | When to reach for it |
| --- | --- |
| `dataSource: { type: 'csv', url }` | CSV at a URL — your host, S3, a published Google Sheet, anywhere returning CORS-accessible CSV. |
| `dataSource: { type: 'json', url }` | JSON array at a URL, or `{ locations: [...] }` shape. |
| `dataSource: { type: 'json', rows: [...] }` | Inline rows in code. Best for small datasets, mockups, and dynamic generation. |

Each location needs latitude and longitude. The `fieldMap` option maps your column or property names to Storepoint's location shape (`name`, `lat`, `lng`, `address`, `phone`, `website`, `image_url`, `description`, `tags`, and per-day hours).

## Field mapping

Common shapes:

```js
fieldMap: {
    name: 'store_name',
    lat: 'latitude',
    lng: 'longitude',
    address: { columns: ['street', 'city', 'state', 'zip'], join: ', ' },
    tags: [
        { column: 'product_type' },
        { column: 'services', split: ',' }
    ]
}
```

Unmapped columns auto-surface as custom location fields on each card.

## Combining with hosted Storepoint data

A real widget ID with `dataSource` set will use the data source. Remove `dataSource` and the widget falls back to your hosted Storepoint data (locations, filters, hours, photos managed in the dashboard).

Common patterns:

- Hosted data in production, `dataSource` override on staging.
- `dataSource` driving a CMS-generated locator page, hosted data driving the main "Find a Store" page.
- All-`dataSource` setups when the data already lives somewhere you maintain.

## Recipes

See [examples/data-sources](../examples/data-sources) for working recipes — CSV, JSON, product locator, service locator.

## Related docs

- [local-testing-mode.md](./local-testing-mode.md) — the `'local'` widget ID
- [going-live.md](./going-live.md) — moving from `'local'` to a production widget ID
