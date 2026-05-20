# Store locator from JSON

A JavaScript store locator widget powered by a JSON array of locations — inline rows in your code, or fetched from a JSON URL. Useful when locations live on your own host, in a CMS export, or are generated at runtime.

This recipe works in production with your real public widget ID, or with `'local'` for an instant preview without an account. The example uses `'local'` so you can run it immediately — swap the widget ID for production.

## What it does

- Reads locations from a JSON URL (or inline `rows`).
- Default field names work without a `fieldMap` if your JSON uses Storepoint-friendly keys: `name`, `lat`, `lng`, `address`, `tags`, `phone`, `website`, `image_url`, `description`.
- Renders the standard widget UI: map, search, list, distance sort, mobile layout.

## Run it locally

A runnable version of this recipe lives at [`index.html`](./index.html), pointed at the bundled [`data/sample-locations.json`](../../../data/sample-locations.json). Replace `YOUR_MAPBOX_PUBLIC_TOKEN` and serve from a static server.

## The embed

The snippet below shows the production shape — pointed at a `https://example.com/...` URL. To switch to inline rows, replace the `url` line with `rows: [...]` (see "Two ways to provide JSON" below).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Store locator from JSON — Storepoint</title>
    <style>
        body, html { margin: 0; padding: 0; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .container { width: 100%; height: 100vh; padding: 24px; box-sizing: border-box; }
        #storepoint-widget { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div class="container">
        <div id="storepoint-widget"></div>
    </div>

    <script>
        window.Storepoint = window.Storepoint || { _q: [], on: function (e, c) { this._q.push([e, c]) } };

        window.loadStorepoint = function () {
            new StorepointWidget('local', '#storepoint-widget', {
                dataSource: {
                    type: 'json',
                    // Any URL that returns a JSON array (or { locations: [...] }).
                    // Fetched in the visitor's browser, so the URL needs to allow CORS.
                    url: 'https://example.com/locations.json'
                },
                settings: {
                    accent_color: '#1f5f3b',
                    search_radius_default: 25,
                    search_radius_options: [10, 25, 50, 100]
                },
                mapProvider: {
                    use: 'mapbox',
                    accessToken: 'YOUR_MAPBOX_PUBLIC_TOKEN'
                }
            }).load();
        };

        (function () {
            var t = document.createElement('script');
            t.async = true;
            t.src = 'https://widget.storepoint.co/embed.js';
            t.onload = function () { window.loadStorepoint && window.loadStorepoint(); };
            document.head.appendChild(t);
        })();
    </script>
</body>
</html>
```

## Two ways to provide JSON

```js
// 1. Inline rows — best for mockups, demos, small datasets
dataSource: {
    type: 'json',
    rows: [
        { name: 'Downtown Store', address: '123 Main St', lat: 30.2672, lng: -97.7431, tags: ['cafe'] }
    ]
}

// 2. JSON URL — best when the data lives on your host or CMS
dataSource: {
    type: 'json',
    url: '/locations.json'
}
```

The widget accepts either `[...]` or `{ locations: [...] }` at the URL. Sample data lives at [`data/sample-locations.json`](../../../data/sample-locations.json).

## Setup

1. Replace `YOUR_MAPBOX_PUBLIC_TOKEN` with a public Mapbox token.
2. Replace `dataSource.url` with your JSON URL, or switch to inline `rows`.
3. Save as an HTML file and serve from a static server.

## Going to production

Replace `'local'` with your public widget ID after signing up at [app.storepoint.co/login](https://app.storepoint.co/login). Two production paths:

1. **Keep the JSON-driven embed.** The widget keeps loading your inline rows or fetched JSON URL.
2. **Import the data into the Storepoint dashboard.** A CSV import (you can convert the JSON in seconds) gives you a spreadsheet-style editor, automatic geocoding, and dashboard-managed tags, filters, hours, and photos. Remove `dataSource` from the embed and the widget uses your hosted data.

See [going-live.md](../../../docs/going-live.md) for the launch checklist.

## Related

- [Store locator from CSV](../store-locator-from-csv)
- [Product locator](../product-locator)
- [Service locator](../service-locator)
- [Widget JavaScript API reference](https://storepoint.co/developers/widget-javascript-api)
