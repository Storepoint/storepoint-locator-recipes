# Product locator

A "where to buy" product locator. Each CSV row is a shop, and a single column lists which products that shop carries. Visitors filter by product to find the nearest shop that carries it. Common pattern for stockist pages, retailer finders, and brand product locators.

This recipe works in production with your real public widget ID, or with `'local'` for an instant preview without an account. The example uses `'local'` so you can run it immediately — swap the widget ID for production.

## What it does

- Reads a CSV of locations with a comma-separated `flavors` column.
- Splits the cell into multiple tag values via `tags: { column: 'flavors', split: ',' }`.
- Renders one filter group, "Flavor", with colored tag chips.

The simpler data-source pattern — one CSV, one filter group, one mapping rule. Good fit for product-by-store, where-to-buy, and stockist pages.

## Run it locally

A runnable version of this recipe lives at [`index.html`](./index.html), pointed at the bundled [`data/product-flavors.csv`](../../../data/product-flavors.csv) (fictional ice-cream shops with flavors per shop). Replace `YOUR_MAPBOX_PUBLIC_TOKEN` and serve from a static server.

## The embed

The snippet below shows the production shape — pointed at a `https://example.com/...` URL where your real CSV would live.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Product locator — Storepoint</title>
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
                    type: 'csv',
                    url: 'https://example.com/product-flavors.csv'
                },
                fieldMap: {
                    name: 'name',
                    lat: 'latitude',
                    lng: 'longitude',
                    address: { columns: ['street', 'city', 'state', 'zip'], join: ', ' },
                    phone: 'phone',
                    website: 'website',
                    image_url: 'image_url',
                    description: 'description',
                    // Pull tags from the comma-separated `flavors` cell.
                    tags: { column: 'flavors', split: ',' }
                },
                settings: {
                    accent_color: '#a855f7',
                    search_radius_default: 50,
                    search_radius_options: [10, 25, 50, 100],
                    filters: [
                        {
                            id: 'flavors',
                            name: 'Flavor',
                            tags: [
                                { tag: 'vanilla',        options: { label: 'Vanilla',         color: '#f5deb3' } },
                                { tag: 'chocolate',      options: { label: 'Chocolate',       color: '#5d3a1a' } },
                                { tag: 'strawberry',     options: { label: 'Strawberry',      color: '#dd6b75' } },
                                { tag: 'pistachio',      options: { label: 'Pistachio',       color: '#93c47d' } },
                                { tag: 'mint-chip',      options: { label: 'Mint Chip',       color: '#7fb3a7' } },
                                { tag: 'salted-caramel', options: { label: 'Salted Caramel',  color: '#c08552' } },
                                { tag: 'matcha',         options: { label: 'Matcha',          color: '#6f8a4c' } },
                                { tag: 'cookies-cream',  options: { label: 'Cookies & Cream', color: '#3d3d3d' } }
                            ]
                        }
                    ]
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

## Setup

1. Replace `YOUR_MAPBOX_PUBLIC_TOKEN` with a public Mapbox token.
2. Replace `dataSource.url` with the URL of your CSV.
3. Update `fieldMap` and `settings.filters` to match your products.
4. Save as an HTML file and serve from a static server.

## Pre-filter per product page

Drop the same embed on each product page with `tags: ['matcha']` in the options. Each product page shows only the shops carrying that product:

```js
new StorepointWidget('YOUR_PUBLIC_WIDGET_ID', '#storepoint-widget', {
    tags: ['matcha']
});
```

## Going to production

Replace `'local'` with your public widget ID after signing up at [app.storepoint.co/login](https://app.storepoint.co/login). Keep the CSV-driven embed, or import the CSV into the Storepoint dashboard. In the dashboard, product tags become a managed tag group with colors and images that teammates can edit — same look as this recipe, configured visually instead of in code.

See [going-live.md](../../../docs/going-live.md).

## Related

- [Service locator](../service-locator) — multiple filter groups and a date-range custom filter
- [Store locator from CSV](../store-locator-from-csv)
- [Widget JavaScript API reference](https://storepoint.co/developers/widget-javascript-api)
