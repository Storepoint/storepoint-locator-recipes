# React component

A `useStorepointWidget` hook that loads the Storepoint embed script once per page, mounts the widget on a `ref`, and tears down on unmount.

The script loader is cached on a shared promise so multiple components don't re-fetch it. The widget is constructed against a React `ref` once the script is ready, and `widget.destroy()` runs when the component unmounts.

## Files

- [`useStorepointWidget.js`](./useStorepointWidget.js) — the reusable hook
- [`FindStorePage.jsx`](./FindStorePage.jsx) — example page using the hook

## Install

1. Copy [`useStorepointWidget.js`](./useStorepointWidget.js) into your project.
2. Use it like:
    ```jsx
    import { useRef } from 'react';
    import useStorepointWidget from './useStorepointWidget';

    function FindAStorePage() {
        const containerRef = useRef(null);
        useStorepointWidget('YOUR_PUBLIC_WIDGET_ID', containerRef);
        return <div ref={containerRef} style={{ height: 720 }} />;
    }
    ```
3. Replace `YOUR_PUBLIC_WIDGET_ID` with your widget ID from the [Storepoint dashboard](https://app.storepoint.co/dashboard).

Pass any of the [Widget JavaScript API options](https://storepoint.co/developers/widget-javascript-api#configuration) as the third argument: `tags`, `language`, `defaultView`, `initialState`, `mapOptions`, etc. Use a stable options object (or memoize it) so the hook doesn't re-mount on every render.

## Related

- [Quickstart embed](../../examples/quickstart)
- [Widget JavaScript API: Lifecycle](https://storepoint.co/developers/widget-javascript-api#lifecycle)
