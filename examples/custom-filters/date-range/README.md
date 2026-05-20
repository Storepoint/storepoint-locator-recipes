# Custom filter — date range

A calendar-style date-range filter on a date custom field. Two HTML5 date inputs (From / To) plus a clear button. The filter reads the location's `available_from` field and returns providers available between the chosen dates. Use the same pattern for any per-location date — opening dates, event dates, or service-availability windows.

## What it does

- Renders two `<input type="date">` controls inside the search panel.
- On change, calls `updateValue({ from, to })` so the filter re-runs.
- Reads each location's `available_from` from `location.custom_fields.text` (auto-surfaced from the CSV column in local mode, token-keyed in hosted mode).
- Filters out providers whose `available_from` falls outside the chosen window.

## Run it locally

A runnable version of this recipe lives at [`index.html`](./index.html), pointed at the bundled [`data/service-providers.csv`](../../../data/service-providers.csv) (every row has an `available_from` column the filter reads). Replace `YOUR_MAPBOX_PUBLIC_TOKEN` and serve from a static server.

## The embed

The snippet below shows the production shape — pointed at a `https://example.com/...` URL where your real CSV would live.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Custom filter — date range — Storepoint</title>
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

        // Date custom field key (auto-derived from the column name in local mode).
        // For a hosted Storepoint locator, replace this with the dashboard custom field token.
        var AVAILABLE_FROM_KEY = 'available_from';

        function readDateValue(location, key) {
            var fields = location.custom_fields && location.custom_fields.text;
            if (!Array.isArray(fields)) return null;

            // Match either by `key` (auto-derived in local mode) or `token` (hosted custom fields).
            var match = fields.find(function (entry) {
                return entry.key === key || entry.token === key || entry.name === key;
            });
            if (!match || !match.value) return null;

            var parsed = new Date(match.value);
            return isNaN(parsed.getTime()) ? null : parsed;
        }

        window.loadStorepoint = function () {
            window.storepoint = new StorepointWidget('local', '#storepoint-widget', {
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
                        { column: 'services', split: ',' }
                    ]
                    // `available_from` isn't mapped — surfaces as a custom text field.
                },
                settings: {
                    accent_color: '#0d4f8c',
                    search_radius_default: 25,
                    filters: [
                        {
                            id: 'specialty',
                            name: 'Specialty',
                            tags: [
                                { tag: 'plumbing',   options: { label: 'Plumbing' } },
                                { tag: 'electrical', options: { label: 'Electrical' } },
                                { tag: 'hvac',       options: { label: 'HVAC' } }
                            ]
                        }
                    ]
                },
                mapProvider: {
                    use: 'mapbox',
                    accessToken: 'YOUR_MAPBOX_PUBLIC_TOKEN'
                }
            });
            window.storepoint.load();

            // Add a date-range filter that reads `available_from` from each location's custom fields
            // and returns providers available between the chosen start and end dates.
            window.storepoint.addCustomFilter({
                id: 'available-between',
                type: 'custom',
                defaultValue: { from: '', to: '' },
                template: `
                    <div class="date-range-filter">
                        <div class="date-range-header">Available between</div>
                        <div class="date-range-inputs">
                            <label>
                                <span>From</span>
                                <input type="date" class="date-from" />
                            </label>
                            <label>
                                <span>To</span>
                                <input type="date" class="date-to" />
                            </label>
                            <button type="button" class="date-clear">Clear</button>
                        </div>
                    </div>
                `,
                styles: `
                    .date-range-filter {
                        padding: 12px 16px;
                        background: var(--storepoint-search-element-background-color);
                        border-radius: 8px;
                    }
                    .date-range-header {
                        font-weight: 500;
                        font-size: 14px;
                        margin-bottom: 8px;
                    }
                    .date-range-inputs {
                        display: flex;
                        gap: 10px;
                        align-items: end;
                        flex-wrap: wrap;
                    }
                    .date-range-inputs label {
                        display: flex;
                        flex-direction: column;
                        font-size: 12px;
                        color: #555;
                        gap: 4px;
                    }
                    .date-range-inputs input[type="date"] {
                        padding: 8px 10px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        font-size: 14px;
                        font-family: inherit;
                    }
                    .date-range-inputs input[type="date"]:focus {
                        outline: none;
                        border-color: var(--storepoint-accent-color);
                        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
                    }
                    .date-clear {
                        padding: 8px 12px;
                        border: 1px solid #d1d5db;
                        background: white;
                        border-radius: 6px;
                        font-size: 13px;
                        font-family: inherit;
                        cursor: pointer;
                    }
                `,
                setup: function (container, updateValue) {
                    var fromInput = container.querySelector('.date-from');
                    var toInput = container.querySelector('.date-to');
                    var clearButton = container.querySelector('.date-clear');

                    function emit() {
                        updateValue({ from: fromInput.value, to: toInput.value });
                    }

                    fromInput.addEventListener('change', emit);
                    toInput.addEventListener('change', emit);
                    clearButton.addEventListener('click', function () {
                        fromInput.value = '';
                        toInput.value = '';
                        emit();
                    });
                },
                filter: function (locations, range) {
                    if (!range || (!range.from && !range.to)) {
                        return locations;
                    }

                    var fromDate = range.from ? new Date(range.from) : null;
                    var toDate = range.to ? new Date(range.to) : null;

                    return locations.filter(function (location) {
                        var availableFrom = readDateValue(location, AVAILABLE_FROM_KEY);
                        if (!availableFrom) return false;

                        if (fromDate && availableFrom < fromDate) return false;
                        if (toDate && availableFrom > toDate) return false;
                        return true;
                    });
                }
            });
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
3. Save as an HTML file and open from a static server.

## Adapting to hosted Storepoint

In hosted Storepoint, custom fields are keyed by token rather than by name. Replace `AVAILABLE_FROM_KEY` with the field token from your Storepoint dashboard:

```js
var AVAILABLE_FROM_KEY = 'abc123tokenfromdashboard';
```

The `readDateValue` helper checks `entry.key`, `entry.token`, and `entry.name`, so it works in either mode without further changes.

## Going to production

Sign up at [app.storepoint.co/login](https://app.storepoint.co/login) and replace `'local'` with your public widget ID. See [going-live.md](../../../docs/going-live.md).

## Related

- [Service locator](../../data-sources/service-locator) — the same dataset, without the date-range filter
- [Widget JavaScript API: Add Custom Filter](https://storepoint.co/developers/widget-javascript-api#add-custom-filter)
