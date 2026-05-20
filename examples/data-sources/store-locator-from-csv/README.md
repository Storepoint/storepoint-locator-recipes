# Store locator from CSV

Generate a JavaScript store locator widget powered by a CSV file. Drop in your own CSV (or a published Google Sheet CSV URL, an S3 file, or any URL that returns CSV) and the locator renders with search, filters, distance sort, and mobile layout — no map, list, or search code to write yourself.

This recipe works in production with your real public widget ID, or with `'local'` for an instant preview without an account. The example uses `'local'` so you can run it immediately — swap the widget ID for production.

## What it does

- Reads locations from a CSV at any URL.
- Maps your columns to Storepoint's location shape with `fieldMap`. Combines `street + city + state + zip` into a single address. Pulls tags from two columns and splits the comma-separated `services` cell into multiple tag values.
- Renders two filter groups (Store type, Services) with brand colors.
- Uses Mapbox for the map and search suggestions. Swap to Google Maps via [map-providers/google-maps](../../map-providers/google-maps).

## Run it locally

A runnable version of this recipe lives at [`index.html`](./index.html), pointed at the bundled [`data/sample-locations.csv`](../../../data/sample-locations.csv) (30 fictional coffee locations across CA, US, UK, DE, AU). Replace `YOUR_MAPBOX_PUBLIC_TOKEN` and serve from a static server (VS Code Live Server, `python -m http.server`, or `npx serve`).

## The embed

The snippet below shows the production shape — pointed at a `https://example.com/...` URL where your real CSV would live. Swap in your widget ID, your CSV URL, and your Mapbox token to ship.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Store locator from CSV — Storepoint</title>
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
                    // Any URL that returns CSV: your own host, S3, a published Google Sheet, etc.
                    // Fetched in the visitor's browser, so the URL needs to allow CORS.
                    url: 'https://example.com/locations.csv'
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
                    tags: [
                        { column: 'store_type' },
                        { column: 'services', split: ',' }
                    ]
                },
                settings: {
                    accent_color: '#1f5f3b',
                    search_radius_default: 25,
                    search_radius_options: [10, 25, 50, 100],
                    location_initial_load_count: 20,
                    filters: [
                        {
                            id: 'store_type',
                            name: 'Store type',
                            tags: [
                                { tag: 'cafe',     options: { label: 'Cafe',     color: '#1f5f3b' } },
                                { tag: 'roastery', options: { label: 'Roastery', color: '#6f4e37' } }
                            ]
                        },
                        {
                            id: 'services',
                            name: 'Services',
                            tags: [
                                { tag: 'espresso',   options: { label: 'Espresso' } },
                                { tag: 'pour-over',  options: { label: 'Pour Over' } },
                                { tag: 'pastries',   options: { label: 'Pastries' } },
                                { tag: 'brunch',     options: { label: 'Brunch' } },
                                { tag: 'vegan',      options: { label: 'Vegan' } },
                                { tag: 'patio',      options: { label: 'Patio' } },
                                { tag: 'wifi',       options: { label: 'Wi-Fi' } },
                                { tag: 'parking',    options: { label: 'Parking' } },
                                { tag: 'drive-thru', options: { label: 'Drive-Thru' } }
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

1. Replace `YOUR_MAPBOX_PUBLIC_TOKEN` with a public Mapbox token (prefixed `pk_`).
2. Replace `dataSource.url` with the URL of your CSV.
3. Update `fieldMap` to match your column names.
4. Save as an HTML file and serve from a static server so the CSV fetch resolves.

## CSV shape

```csv
name,street,city,state,zip,latitude,longitude,store_type,services,phone,website,image_url
Coffee Yonge,135 Yonge St,Toronto,ON,M5C 1W7,43.6519,-79.3776,cafe,"espresso,pastries,wifi",+1 416-555-0901,https://example.com,https://...
```

Every row needs latitude and longitude. The CSV-driven embed doesn't auto-geocode — in hosted Storepoint, addresses are geocoded automatically when you import a CSV.

## Going to production

Replace `'local'` with your public widget ID after signing up at [app.storepoint.co/login](https://app.storepoint.co/login). Two production paths from there:

1. **Keep the CSV-driven embed.** The widget keeps reading from your CSV URL. Useful when the data already lives in a sheet, CRM export, or system you maintain.
2. **Import your CSV into the Storepoint dashboard.** Drag-and-drop a CSV, addresses are geocoded automatically, and locations are editable from a spreadsheet-style UI. Tags, filters, custom fields, hours, photos — all configured in the dashboard. Remove `dataSource` from the embed and the widget uses your hosted data.

You can mix — hosted data on most pages, a `dataSource` override on a staging or CMS-driven page.

See [going-live.md](../../../docs/going-live.md) for the launch checklist.

## Related

- [Store locator from JSON](../store-locator-from-json)
- [Product locator](../product-locator)
- [Service locator](../service-locator)
- [Mapbox provider](../../map-providers/mapbox) / [Google Maps provider](../../map-providers/google-maps)
- [Widget JavaScript API reference](https://storepoint.co/developers/widget-javascript-api)
- [Storepoint](https://storepoint.co)
