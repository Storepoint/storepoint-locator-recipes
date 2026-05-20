# Map providers

Override the map provider in the embed instead of in the Storepoint dashboard. Useful for local testing without an account, staging environments with a separate token, or any embed that should use a different provider than your dashboard default.

| Recipe | What it does |
| --- | --- |
| [mapbox](./mapbox) | Mapbox public token in the embed |
| [google-maps](./google-maps) | Google Maps browser API key in the embed |

## How it works

The `mapProvider` option overrides the dashboard's configured map provider for that embed. Works with any widget ID — your real production widget ID for an embed-level override, or `'local'` for previewing without an account.

```js
new StorepointWidget('YOUR_PUBLIC_WIDGET_ID', '#storepoint-widget', {
    mapProvider: {
        use: 'mapbox',
        accessToken: 'pk_browser_restricted_token'
    }
});
```

You bring your own Mapbox or Google Maps key on every Storepoint plan. In hosted Storepoint, configure the key once in the dashboard and every embed reuses it. Use the `mapProvider` option only when you need an embed-specific override.

## Provider responsibilities

Map loads, tile/style requests, and Geocoding/Places API calls count toward your provider's usage and billing. Browser keys are visible in frontend code, so always restrict them to the domains where the locator runs. Storepoint doesn't manage, protect, rotate, monitor, or pay for third-party map provider keys.
