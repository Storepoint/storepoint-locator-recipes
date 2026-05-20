# Sample data

Fictional location data used by the recipes. None of it is tied to a real business.

| File | What it's for |
| --- | --- |
| [`sample-locations.csv`](./sample-locations.csv) | General store locator from CSV. ~30 locations across CA, US, UK, DE, NL, SE, AU. Coffee chain, with addresses, phones, photos, store types, services, and a featured flag. |
| [`sample-locations.json`](./sample-locations.json) | A subset of the same locations as a JSON array, with tags as a flat string array. |
| [`product-flavors.csv`](./product-flavors.csv) | Product locator dataset. ~12 ice-cream shops with a comma-separated `flavors` column. Used by [product-locator](../examples/data-sources/product-locator). |
| [`service-providers.csv`](./service-providers.csv) | Service locator dataset. ~12 plumbers, electricians, and HVAC contractors with `specialty`, `services`, `certifications`, and an `available_from` date. Used by [service-locator](../examples/data-sources/service-locator) and the [date-range custom filter](../examples/custom-filters/date-range). |

Every recipe uses one of these by default so the example runs immediately. Replace with your own data when adapting.
