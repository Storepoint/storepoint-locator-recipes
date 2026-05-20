// Reusable React hook for mounting the Storepoint Locator Widget.
//
// Usage:
//
//   import { useRef } from 'react';
//   import useStorepointWidget from './useStorepointWidget';
//
//   function FindAStorePage() {
//     const containerRef = useRef(null);
//     useStorepointWidget('YOUR_PUBLIC_WIDGET_ID', containerRef);
//
//     return <div ref={containerRef} style={{ height: 720 }} />;
//   }
//
// Recipe: https://github.com/storepoint/storepoint-locator-recipes

import { useEffect } from 'react';

const STOREPOINT_EMBED_SRC = 'https://widget.storepoint.co/embed.js';

function loadStorepointEmbed() {
    if (typeof window === 'undefined') {
        return Promise.resolve();
    }

    if (window.StorepointWidget) {
        return Promise.resolve();
    }

    if (window.__storepointEmbedPromise) {
        return window.__storepointEmbedPromise;
    }

    window.__storepointEmbedPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = STOREPOINT_EMBED_SRC;
        script.addEventListener('load', resolve, { once: true });
        script.addEventListener('error', reject, { once: true });
        document.head.appendChild(script);
    });

    return window.__storepointEmbedPromise;
}

export default function useStorepointWidget(widgetId, containerRef, options) {
    useEffect(() => {
        if (!widgetId || !containerRef || !containerRef.current) {
            return undefined;
        }

        let widget = null;
        let cancelled = false;

        loadStorepointEmbed().then(() => {
            if (cancelled || !containerRef.current) {
                return;
            }

            widget = new window.StorepointWidget(widgetId, containerRef.current, options || {});
            widget.load();
        });

        return () => {
            cancelled = true;
            if (widget && typeof widget.destroy === 'function') {
                widget.destroy();
            }
        };
    }, [widgetId, containerRef, JSON.stringify(options || {})]);
}
