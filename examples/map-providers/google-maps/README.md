# Google Maps provider

Override the map provider in the embed to use a Google Maps browser API key. Works with any widget ID — your real production widget ID for an embed-level override, or `'local'` for previewing without an account.

## The option

Add `mapProvider` to your `new StorepointWidget(...)` call:

```js
mapProvider: {
    use: 'google_maps',
    apiKey: 'browser_restricted_google_key'
}
```

## A minimal production embed using Google Maps

Real widget ID, hosted Storepoint data, Google Maps provider configured in code instead of in the dashboard.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Storepoint Locator with Google Maps</title>
</head>
<body>
    <div id="storepoint-widget" style="height: 720px;"></div>

    <script>
        window.Storepoint = window.Storepoint || { _q: [], on: function (e, c) { this._q.push([e, c]) } };
        window.loadStorepoint = function () {
            new StorepointWidget('YOUR_PUBLIC_WIDGET_ID', '#storepoint-widget', {
                mapProvider: {
                    use: 'google_maps',
                    apiKey: 'YOUR_GOOGLE_MAPS_BROWSER_KEY'
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

For local mode (no account) plus a CSV or JSON data source plus Google Maps, see the [data sources recipes](../../data-sources) — switch the `mapProvider` block to `google_maps` in any of them.

## Setup

1. In Google Cloud Console, create an API key and enable **Maps JavaScript API** and **Places API**.
2. Add HTTP referrer restrictions for your site's domains.
3. Restrict the key to those two APIs only.
4. Replace `YOUR_GOOGLE_MAPS_BROWSER_KEY` with that key.
5. Replace `YOUR_PUBLIC_WIDGET_ID` with your widget ID from your [Storepoint dashboard](https://app.storepoint.co/dashboard).

## Provider responsibilities

Google Maps JavaScript map loads/views and Places/search suggestion requests count toward your Google Maps Platform usage and billing. Browser keys are visible in frontend code, so always restrict them. Storepoint doesn't manage, protect, rotate, monitor, or pay for third-party map provider keys.

In hosted Storepoint, the Google Maps key is configured once in your dashboard and reused across every embed. Use the embed-level `mapProvider` option only when you need a per-page override.

## Related

- [Mapbox provider](../mapbox)
- [Google Maps Platform security best practices](https://developers.google.com/maps/api-security-best-practices)
- [Data sources recipes](../../data-sources) — full embeds combining a map provider with CSV/JSON data
- [Going to production](../../../docs/going-live.md)
