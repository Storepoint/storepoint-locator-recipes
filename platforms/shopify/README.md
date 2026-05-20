# Shopify Theme Section

A Shopify Theme Section that wraps the Storepoint store locator with merchant-configurable settings. Once installed, merchants add the locator to any page from the theme editor and configure widget ID, pre-filter tags, default view, height, and language without touching code.

> **Not a developer?** You don't need this file. The simplest path on Shopify is to copy the embed code from your [Storepoint dashboard](https://app.storepoint.co/dashboard) and paste it into a Shopify Custom Liquid section, page, or theme block. See [Storepoint for Shopify](https://storepoint.co/shopify-store-locator-app) for a walkthrough. This recipe is for developers who want a reusable section a non-technical teammate can drop on multiple pages with different settings.

Each section gets its own container ID and options object — important when more than one Storepoint locator appears on the same page. The Storepoint embed script loads once across all instances.

## Files

- [`storepoint-locator.liquid`](./storepoint-locator.liquid) — the section file

## Install

1. Download [`storepoint-locator.liquid`](./storepoint-locator.liquid).
2. In your Shopify admin, go to **Online Store → Themes → Edit code** on the theme you want to update.
3. In the `sections/` folder, click **Add a new section**.
4. Name it `storepoint-locator` and paste the file's contents. Save.
5. Open the theme editor, go to a page (or create one), click **Add section**, and choose **Storepoint locator**.
6. In the section settings, paste your widget ID from the [Storepoint dashboard](https://app.storepoint.co/dashboard).

## Section settings

| Setting | Description |
| --- | --- |
| Public widget ID | Required. The ID from the Embed Locator page in the dashboard. |
| Tags | Optional comma-separated tags to pre-filter the locations on this section. |
| Default view | Show all locations, auto-detect visitor location, or start empty until the visitor searches. |
| Desktop height | Locator container height in pixels (default 720). |
| Mobile height | Locator container height under 700px width (default 880). |
| Language override | Optional. Leave blank to auto-localize per Shopify Market. Enter an ISO 639-1 code (e.g. `fr`, `de`) to force a specific language. |

## Shopify Markets

The section reads `localization.language.iso_code` from Liquid by default, so the locator follows the visitor's active Shopify Market. French Market visitors see the French locator, German Market visitors see German, and so on — provided the matching translations exist in your Storepoint dashboard's [Phrases settings](https://app.storepoint.co/dashboard).

Same section, same embed — Shopify routes the visitor to a Market, the section picks up the Market's language, and Storepoint serves the right phrases.

## Common uses

- A single section on the **Find a Store** page that shows every location.
- Different product pages that show only the stores carrying that product, by tagging locations and setting the section's tag filter per product template.
- A **Stockists by region** page using duplicated sections, each pre-filtered by a region tag.
- A multi-Market storefront where the same section serves the right language per region.

## Related

- [Pre-filter your embed by tags](../../examples/quickstart#pre-filter-by-tags)
- [Widget JavaScript API reference](https://storepoint.co/developers/widget-javascript-api)
- [Multilingual store locator guide](https://storepoint.co/docs/guides/multilingual-store-locator)
- [Storepoint store locator for Shopify](https://storepoint.co/shopify-store-locator-app)
