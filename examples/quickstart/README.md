# Quickstart

The minimum production embed for the Storepoint Locator Widget. Drop the snippet on any web page (Webflow, Squarespace, Wix, WordPress, custom HTML, anywhere), replace the widget ID, and you have a working store locator.

> **Already have a Storepoint account?** The dashboard generates this same embed for you — just copy it from the [Embed Locator page](https://app.storepoint.co/dashboard) and paste it into your site. Platform-specific walkthroughs live in the [embed-on-website docs](https://storepoint.co/docs/getting-started/embed-on-website) (Shopify, Webflow, Squarespace, Wix, WordPress, and more).

## The embed

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Storepoint Locator — Quickstart</title>
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

    <!-- Storepoint Widget Embed Start -->
    <script>
        window.Storepoint = window.Storepoint || { _q: [], on: function (e, c) { this._q.push([e, c]) } };
        window.loadStorepoint = function () {
            new StorepointWidget('YOUR_PUBLIC_WIDGET_ID', '#storepoint-widget', {});
        };
        (function () {
            var t = document.createElement('script');
            t.async = true;
            t.src = 'https://widget.storepoint.co/embed.js';
            t.onload = function () { window.loadStorepoint && window.loadStorepoint(); };
            document.head.appendChild(t);
        })();
    </script>
    <!-- Storepoint Widget Embed End -->
</body>
</html>
```

Get your public widget ID from your [Storepoint dashboard](https://app.storepoint.co/dashboard) and replace `YOUR_PUBLIC_WIDGET_ID` above. New to Storepoint? See the [Quick start guide](https://storepoint.co/docs/getting-started/quick-start) for setting up your account and adding locations.

### Platform notes

- **Shopify**: this same snippet pastes into a **Custom Liquid** section in the theme editor or into the page editor's **HTML view**. No Liquid coding required. The [Shopify Theme Section recipe](../../platforms/shopify) is only needed if you want a reusable section that non-developers can configure from the theme editor. See [How to add a store locator to Shopify](https://storepoint.co/docs/getting-started/embed-on-website/shopify) for the full walkthrough.
- **WordPress**: paste into a Custom HTML block, or use the [Storepoint WordPress plugin](https://wordpress.org/plugins/storepoint-store-locator/) for `[storepoint]` shortcode support.
- **Shopify, Wordpress, Webflow, Squarespace, Wix, BigCommerce, Framer, Carrd, Duda, Ghost, HubSpot, Drupal, Joomla**: paste into the platform's HTML / Embed / Custom Code element. Per-platform guides live in the [embed-on-website docs](https://storepoint.co/docs/getting-started/embed-on-website).

## Pre-filter by tags

To show only locations matching one or more tags, pass a `tags` array as the third argument. Useful for product pages, regional pages, or any page that should show a subset of locations.

```html
<div id="storepoint-widget"></div>
<script>
    window.Storepoint = window.Storepoint || { _q: [], on: function (e, c) { this._q.push([e, c]) } };
    window.loadStorepoint = function () {
        new StorepointWidget('YOUR_PUBLIC_WIDGET_ID', '#storepoint-widget', {
            tags: ['pickup']
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
```

For all the embed options Storepoint supports, see the [embed code options docs](https://storepoint.co/docs/getting-started/embed-on-website/embed-code-options).

## Related

- [Storepoint Quick start guide](https://storepoint.co/docs/getting-started/quick-start) — set up an account and add locations
- [Embed on website](https://storepoint.co/docs/getting-started/embed-on-website) — platform-specific walkthroughs (Shopify, Webflow, Squarespace, Wix, WordPress, and more)
- [Embed code options](https://storepoint.co/docs/getting-started/embed-on-website/embed-code-options) — pre-filtering, language, and other variations
- [Data sources](../data-sources) — load locations from a CSV or JSON
- [Local testing mode](../../docs/local-testing-mode.md) — preview without a Storepoint account
- [Widget JavaScript API reference](https://storepoint.co/developers/widget-javascript-api)
