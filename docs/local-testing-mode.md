# Local testing mode

Local testing mode is a special widget ID — `'local'` — that lets you preview the Storepoint Locator Widget without creating an account. It's intended for prototypes, mockups, demos, AI-generated previews, local development, and trying out the widget before signing up for Storepoint.

```js
new StorepointWidget('local', '#storepoint-widget', {
    dataSource: { type: 'csv', url: '/locations.csv' },
    mapProvider: { use: 'mapbox', accessToken: 'pk_...' }
});
```

The widget code is identical to a production embed. The only differences are:

- No account is required.
- Full Storepoint hosted analytics is off by default.
- A `dataSource` is required (there's no hosted data without an account).
- A map provider key is required (the dashboard isn't there to provide one).

Local testing mode is just a special widget ID that runs without an account.

## Pair with a data source

Local testing mode always uses the [`dataSource`](./data-sources.md) feature. The recipes for CSV, JSON, product locators, and service locators all work in local testing mode by passing `'local'` as the widget ID. They also work in production with a real widget ID.

See [examples/data-sources](../examples/data-sources) for the recipes.

## When to use it

- Prototyping a JavaScript store locator from a CSV, JSON file, or sample data
- Mockups, demos, and stakeholder reviews
- AI-generated locator code that needs to actually run
- Local development and testing without signing up
- Validating field mapping and filter setup before connecting Storepoint to your data

## When you're ready for production

[Sign up for Storepoint](https://app.storepoint.co/login) and replace `'local'` with your public widget ID. From there, the same widget keeps working — keep the `dataSource` to live-pull from your CSV/JSON, or remove it to use hosted data managed in the [Storepoint dashboard](https://app.storepoint.co/dashboard).

See [going-live.md](./going-live.md) for the launch checklist.

## What Storepoint receives in local testing mode

Hosted analytics is off by default in local testing mode. Storepoint may still receive widget script/asset requests, operational logs, and basic usage telemetry (load host, widget version, provider type, local-token usage, generic load/click events).

## Map provider

You bring your own Mapbox or Google Maps key on every Storepoint plan, including local testing mode and paid plans. In local testing mode you pass the key in the embed; in hosted Storepoint you set it once in the dashboard and every embed reuses it.

Browser keys are visible in frontend code. Restrict them to the domains where the locator runs. See [examples/map-providers](../examples/map-providers).