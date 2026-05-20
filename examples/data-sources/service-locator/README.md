# Service provider locator

A service-provider directory with multiple filter groups: specialty, services offered, certifications. Each provider has an `available_from` date field that surfaces as a custom field on the card and can power a date-range custom filter. Common pattern for plumber/electrician finders, contractor directories, and any service marketplace.

This recipe works in production with your real public widget ID, or with `'local'` for an instant preview without an account. The example uses `'local'` so you can run it immediately — swap the widget ID for production.

## What it does

- Reads a CSV of service providers (plumbers, electricians, HVAC).
- Pulls tags from three columns at once: `specialty` (single value), `services` (comma-separated list), `certifications` (single value).
- Renders three filter groups visitors can combine.
- Enables `enable_keyword_search` so visitors can also search by name or service text.
- Auto-surfaces the `available_from` column as a custom location field on each card.

Use this pattern when you have multiple filter dimensions and want an unmapped column to surface as a custom field on each card.

## Run it locally

A runnable version of this recipe lives at [`index.html`](./index.html), pointed at the bundled [`data/service-providers.csv`](../../../data/service-providers.csv) (fictional plumbers, electricians, and HVAC contractors). Replace `YOUR_MAPBOX_PUBLIC_TOKEN` and serve from a static server.

## The embed

The snippet below shows the production shape — pointed at a `https://example.com/...` URL where your real CSV would live.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Service provider locator — Storepoint</title>
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
                    url: 'https://example.com/service-providers.csv'
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
                        { column: 'specialty' },
                        { column: 'services', split: ',' },
                        { column: 'certifications' }
                    ]
                    // `available_from` isn't mapped, so it surfaces as a custom text field.
                },
                settings: {
                    accent_color: '#0d4f8c',
                    search_radius_default: 25,
                    search_radius_options: [10, 25, 50, 100],
                    enable_keyword_search: true,
                    filters: [
                        {
                            id: 'specialty',
                            name: 'Specialty',
                            tags: [
                                { tag: 'plumbing',   options: { label: 'Plumbing',   color: '#0d4f8c' } },
                                { tag: 'electrical', options: { label: 'Electrical', color: '#b48f0a' } },
                                { tag: 'hvac',       options: { label: 'HVAC',       color: '#5a7d4f' } }
                            ]
                        },
                        {
                            id: 'services',
                            name: 'Services',
                            tags: [
                                { tag: 'drain-cleaning',   options: { label: 'Drain cleaning' } },
                                { tag: 'leak-repair',      options: { label: 'Leak repair' } },
                                { tag: 'water-heater',     options: { label: 'Water heater' } },
                                { tag: 'bathroom-remodel', options: { label: 'Bathroom remodel' } },
                                { tag: 'panel-upgrade',    options: { label: 'Panel upgrade' } },
                                { tag: 'ev-charger',       options: { label: 'EV charger' } },
                                { tag: 'lighting',         options: { label: 'Lighting' } },
                                { tag: 'wiring',           options: { label: 'Wiring' } },
                                { tag: 'solar-tie-in',     options: { label: 'Solar tie-in' } },
                                { tag: 'smoke-alarm',      options: { label: 'Smoke alarm' } },
                                { tag: 'furnace',          options: { label: 'Furnace' } },
                                { tag: 'ac',               options: { label: 'AC' } },
                                { tag: 'heat-pump',        options: { label: 'Heat pump' } },
                                { tag: 'maintenance',      options: { label: 'Maintenance' } },
                                { tag: 'emergency',        options: { label: 'Emergency calls' } }
                            ]
                        },
                        {
                            id: 'certifications',
                            name: 'Certification',
                            tags: [
                                { tag: 'licensed-master-plumber', options: { label: 'Master Plumber' } },
                                { tag: 'master-electrician',      options: { label: 'Master Electrician' } },
                                { tag: 'licensed-hvac',           options: { label: 'Licensed HVAC' } }
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
3. Update `fieldMap`, `settings.filters`, and tag values to match your data.
4. Save as an HTML file and serve from a static server.

## Add a date-range filter

To filter by `available_from` with a calendar input, see the [date-range custom filter](../../custom-filters/date-range). Drop the `addCustomFilter` snippet into the `<script>` block and you have a service locator with date-range availability filtering.

## Going to production

Replace `'local'` with your public widget ID after signing up at [app.storepoint.co/login](https://app.storepoint.co/login). Keep this CSV-driven embed, or import the CSV into the Storepoint dashboard for a spreadsheet-style editor, automatic address geocoding, dashboard-managed tag groups (specialty, services, certifications), and named custom fields like `available_from` that surface on every location card.

See [going-live.md](../../../docs/going-live.md).

## Related

- [Date-range custom filter](../../custom-filters/date-range)
- [Product locator](../product-locator)
- [Store locator from CSV](../store-locator-from-csv)
- [Widget JavaScript API reference](https://storepoint.co/developers/widget-javascript-api)
