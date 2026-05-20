// Example React page that mounts the Storepoint locator using the
// useStorepointWidget hook from this folder.
//
// Recipe: https://github.com/storepoint/storepoint-locator-recipes

import { useRef } from 'react';
import useStorepointWidget from './useStorepointWidget';

export default function FindStorePage() {
    const containerRef = useRef(null);

    useStorepointWidget('YOUR_PUBLIC_WIDGET_ID', containerRef, {
        // Optional pre-filter, e.g. show only locations tagged 'pickup'
        // tags: ['pickup']
    });

    return (
        <div className="find-store-page" style={{ padding: '32px' }}>
            <h1>Find a store</h1>
            <div
                ref={containerRef}
                id="storepoint-widget"
                style={{ height: '720px' }}
            />
        </div>
    );
}
