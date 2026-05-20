# Mapbox provider

Override the map provider in the embed to use a Mapbox public token. Works with any widget ID — your real production widget ID for an embed-level override, or `'local'` for previewing without an account.

## The option

Add `mapProvider` to your `new StorepointWidget(...)` call:

```js
mapProvider: {
    use: 'mapbox',
    accessToken: 'pk_browser_restricted_token'
}
```

## A minimal production embed using Mapbox

Real widget ID, hosted Storepoint data, Mapbox provider configured in code instead of in the dashboard.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Storepoint Locator with Mapbox</title>
</head>
<body>
    <div id="storepoint-widget" style="height: 720px;"></div>

    <script>
        window.Storepoint = window.Storepoint || { _q: [], on: function (e, c) { this._q.push([e, c]) } };
        window.loadStorepoint = function () {
            new StorepointWidget('YOUR_PUBLIC_WIDGET_ID', '#storepoint-widget', {
                mapProvider: {
                    use: 'mapbox',
                    accessToken: 'YOUR_MAPBOX_PUBLIC_TOKEN'
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

For local mode (no account) plus a CSV or JSON data source plus Mapbox, see the [data sources recipes](../../data-sources) — each one already uses Mapbox by default.

## Setup

1. In your Mapbox account, create a **public** browser token (prefixed `pk_`).
2. Add URL restrictions on the token before sharing the page beyond local development.
3. Replace `YOUR_MAPBOX_PUBLIC_TOKEN` with that token.
4. Replace `YOUR_PUBLIC_WIDGET_ID` with your widget ID from your [Storepoint dashboard](https://app.storepoint.co/dashboard).

## Provider responsibilities

Map loads, tile/style requests, and Mapbox Geocoding API/search suggestion requests count toward your Mapbox usage and billing. Browser tokens are visible in frontend code, so always restrict them. Storepoint doesn't manage, protect, rotate, monitor, or pay for third-party map provider keys.

In hosted Storepoint, the Mapbox token is configured once in your dashboard and reused across every embed. Use the embed-level `mapProvider` option only when you need a per-page override.

## Related

- [Google Maps provider](../google-maps)
- [Mapbox token management docs](https://docs.mapbox.com/accounts/overview/tokens/)
- [Data sources recipes](../../data-sources) — full embeds combining a map provider with CSV/JSON data
- [Going to production](../../../docs/going-live.md)
