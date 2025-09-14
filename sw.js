// sw.js - Service Worker for offline caching and performance optimization
const CACHE_NAME = 'palettinum-v1.0.15';
const STATIC_CACHE = 'palettinum-static-v1.0.15';
const DYNAMIC_CACHE = 'palettinum-dynamic-v1.0.15';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css?v=3.31',
    '/main.js?v=3.31',
    '/overrides/palettinum-mobile-consistency.css?v=3.31',
    '/components.js',
    '/palette.js',
    '/theme.js',
    '/ui.js',
    '/events.js',
    '/cache-manager.js?v=3.31',
    '/components/color-picker/colorPicker.js',
    '/components/accessibility-dashboard/accessibilityDashboard.js?v=3.31',

    '/state-manager.js?v=3.31',
    '/performance-monitor.js?v=3.31',
    '/performance-polyfills.js?v=3.31',
    '/responsive-panel-controller.js?v=3.31',
    '/PALETTENIFFER_PLATFORM_NAVIGATION.js?v=3.31',
    '/offline.html',

    '/assets/logo_light.png',
    '/assets/logo_dark.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install event - cache static assets with enhanced strategies
self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE)
                .then(cache => {
            
                    return cache.addAll(STATIC_ASSETS);
                })
                .catch(error => {
                    // Silent error handling for cache failures
                }),
            
            // Initialize enhanced caching strategies
            initializeEnhancedCaching(),
            
            // Pre-warm critical assets
            preWarmCriticalAssets()
        ])
    );
    
    // Skip waiting to activate immediately
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            // Clean up ALL old caches aggressively
            caches.keys()
                .then(cacheNames => {
                    return Promise.all(
                        cacheNames.map(cacheName => {
                            // Delete ALL old cache versions to force fresh load
                            if (!cacheName.includes('v1.0.15')) {
                                console.log('Deleting old cache:', cacheName);
                                return caches.delete(cacheName);
                            }
                        })
                    );
                }),
            // Purge modified assets
            purgeModifiedAssets(),
            // Force cache invalidation for critical assets
            forceCacheInvalidation(),
            // Comprehensive cache cleanup for PNG button removal
            cleanupAllCaches()
        ])
    );
    
    // Claim all clients immediately
    self.clients.claim();
    
    // Notify clients about cache update
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'CACHE_UPDATED',
                version: '1.0.0',
                timestamp: Date.now()
            });
        });
    });
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    const sameOrigin = url.origin === self.location.origin;
    
    // Skip unsupported schemes to avoid extension-related errors
    if (
        url.protocol === 'chrome-extension:' ||
        url.protocol === 'moz-extension:' ||
        url.protocol === 'safari-extension:' ||
        url.protocol === 'ms-browser-extension:' ||
        url.protocol === 'chrome-search:' ||
        url.protocol === 'chrome-devtools:' ||
        url.protocol === 'data:' ||
        url.protocol === 'blob:'
    ) {
        return;
    }
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Add null checks for Accept header (some extension requests may lack it)
    try {
        const acceptHeader = request.headers && request.headers.get && request.headers.get('accept');
        // No-op; just ensure access does not throw
    } catch (e) {
        return;
    }

    // Only handle API routes for same-origin requests (avoid cross-origin like thecolorapi.com)
    if (sameOrigin && url.pathname.startsWith('/api/')) {
        event.respondWith(handleAPIRequest(request));
        return;
    }
    
    // Handle versioned assets with cache invalidation for same-origin JS/CSS only
    if (sameOrigin && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))) {
        event.respondWith(handleVersionedAsset(request));
        return;
    }
    
    // Handle static assets (includes permitted cross-origin CDNs explicitly whitelisted in isStaticAsset)
    if (isStaticAsset(request.url)) {
        event.respondWith(handleStaticAsset(request));
        return;
    }
    
    // Handle dynamic content
    event.respondWith(handleDynamicRequest(request));
});

// Enhanced caching strategies
async function initializeEnhancedCaching() {
    
    
    // Initialize cache warming
    await initializeCacheWarming();
    
    // Initialize compression
    await initializeCompression();
    
    // Initialize adaptive caching
    await initializeAdaptiveCaching();
    
    
}

// Purge modified assets for cache-busting
async function purgeModifiedAssets() {
    const modifiedAssets = [
        '/style.css?v=3.11',
        '/main.js?v=3.11',
        '/index.html'
    ];
    
    const cache = await caches.open(STATIC_CACHE);
    
    for (const asset of modifiedAssets) {
        try {
            // Remove old versions (both versioned and unversioned)
            const oldVersions = [
                '/style.css?v=3.0',
                '/main.js?v=3.0',
                '/style.css?v=3.1',
                '/main.js?v=3.1',
                '/style.css?v=3.2',
                '/main.js?v=3.2',
                '/style.css?v=3.3',
                '/main.js?v=3.3',
                '/style.css?v=3.4',
                '/main.js?v=3.4',
                '/style.css?v=3.5',
                '/main.js?v=3.5',
                '/style.css',
                '/main.js'
            ];
            
            for (const oldVersion of oldVersions) {
                await cache.delete(oldVersion);
            }
            
            // Force fresh fetch for modified assets
            await cache.delete(asset);
        } catch (error) {
            // Silent error handling for cache purging
        }
    }
}

// Force cache invalidation for critical assets
async function forceCacheInvalidation() {
    const criticalAssets = [
        '/main.js?v=3.31',
        '/style.css?v=3.31',
        '/components/accessibility-dashboard/accessibilityDashboard.js?v=3.31',
        '/index.html'
    ];
    
    const cache = await caches.open(STATIC_CACHE);
    
    for (const asset of criticalAssets) {
        try {
            // Delete from cache to force fresh fetch
            await cache.delete(asset);
            
            // Also delete any unversioned versions
            const unversionedAsset = asset.replace(/\?v=\d+\.\d+/, '');
            await cache.delete(unversionedAsset);
            
            // Delete all previous versions of main.js to prevent conflicts
            if (asset.includes('main.js')) {
                const oldVersions = [
                    '/main.js?v=3.0',
                    '/main.js?v=3.1',
                    '/main.js?v=3.2',
                    '/main.js?v=3.3',
                    '/main.js'
                ];
                for (const oldVersion of oldVersions) {
                    await cache.delete(oldVersion);
                }
            }
        } catch (error) {
            // Silent error handling for cache invalidation
        }
    }
}

// Initialize cache warming
async function initializeCacheWarming() {
    const criticalAssets = [
        '/main.js?v=3.11',
        '/components.js',
        '/palette.js',
        '/cache-manager.js',
        '/components/color-picker/colorPicker.js'
    ];
    
    const cache = await caches.open(STATIC_CACHE);
    
    for (const asset of criticalAssets) {
        try {
            await cache.add(asset);

        } catch (error) {
            // Silent error handling for pre-warming
        }
    }
}

// Initialize compression
async function initializeCompression() {
    // Check for compression support (Service Worker context)
    if ('CompressionStream' in self) {

        self.compressionSupported = true;
    } else {

        self.compressionSupported = false;
    }
}

// Initialize adaptive caching
async function initializeAdaptiveCaching() {
    // Set up adaptive cache strategies
    self.adaptiveCacheConfig = {
        maxCacheSize: 50 * 1024 * 1024, // 50MB
        maxCacheAge: 24 * 60 * 60 * 1000, // 24 hours
        compressionThreshold: 1024, // 1KB
        warmingEnabled: true,
        compressionEnabled: true
    };
    
    
}

// Pre-warm critical assets
async function preWarmCriticalAssets() {
    const criticalAssets = [
        '/main.js',
        '/components.js',
        '/palette.js'
    ];
    
    for (const asset of criticalAssets) {
        try {
            const response = await fetch(asset);
            if (response.ok) {
                const cache = await caches.open(STATIC_CACHE);
                await cache.put(asset, response);
    
            }
        } catch (error) {
            // Silent error handling for critical asset pre-warming
        }
    }
}

// Handle versioned assets with strict network-first strategy for JavaScript
async function handleVersionedAsset(request) {
    const url = new URL(request.url);
    const cache = await caches.open(STATIC_CACHE);
    const isJavaScript = url.pathname.endsWith('.js');
    
    // Check if this is a versioned asset
    const hasVersion = url.search.includes('v=');
    
    if (hasVersion) {
        // For JavaScript files, use strict network-first strategy
        if (isJavaScript) {
            try {
                // Bypass HTTP cache entirely to guarantee freshness
                const response = await fetch(request, { cache: 'no-store' });
                if (response && response.ok) {
                    // Cache the fresh response
                    cache.put(request, response.clone());
                    return response;
                }
            } catch (error) {
                // Only fall back to cache if network completely fails
                const cachedResponse = await cache.match(request);
                if (cachedResponse) {
                    return cachedResponse;
                }
            }
        } else {
            // For non-JS versioned assets, try network first
            try {
                const response = await fetch(request);
                if (response.ok) {
                    cache.put(request, response.clone());
                    return response;
                }
            } catch (error) {
                // Fall back to cache if network fails
            }
        }
    }
    
    // Try to serve from cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // If no cache, try to fetch
    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        // Return 404 for missing assets
        return new Response('Asset not found', { status: 404 });
    }
}

// Handle API requests with enhanced caching
async function handleAPIRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        // Return cached response immediately
        
        return cachedResponse;
    }
    
    try {
        const response = await fetch(request);
        
        // Cache successful responses with compression
        if (response.ok) {
            const responseClone = response.clone();
            
            // Apply compression if supported and data is large enough
            if (self.compressionSupported && responseClone.body) {
                const compressedResponse = await compressResponse(responseClone);
                await cache.put(request, compressedResponse);
    
            } else {
                await cache.put(request, responseClone);

            }
        }
        
        return response;
    } catch (error) {
        // Return cached response if available, otherwise return offline page
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response(
            JSON.stringify({ error: 'Network error', message: 'Please check your connection' }),
            { 
                status: 503, 
                headers: { 'Content-Type': 'application/json' } 
            }
        );
    }
}

// Compress response
async function compressResponse(response) {
    try {
        const stream = new CompressionStream('gzip');
        const writer = stream.writable.getWriter();
        const reader = stream.readable.getReader();
        
        const responseBody = await response.arrayBuffer();
        await writer.write(new Uint8Array(responseBody));
        await writer.close();
        
        const chunks = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }
        
        const compressedBody = new Blob(chunks);
        
        return new Response(compressedBody, {
            status: response.status,
            statusText: response.statusText,
            headers: {
                ...Object.fromEntries(response.headers.entries()),
                'Content-Encoding': 'gzip',
                'Content-Length': compressedBody.size.toString()
            }
        });
    } catch (error) {
        // Silent error handling for compression
        return response;
    }
}

// Decompress response
async function decompressResponse(response) {
    try {
        if (response.headers.get('Content-Encoding') === 'gzip') {
            const stream = new DecompressionStream('gzip');
            const writer = stream.writable.getWriter();
            const reader = stream.readable.getReader();
            
            const responseBody = await response.arrayBuffer();
            await writer.write(new Uint8Array(responseBody));
            await writer.close();
            
            const chunks = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }
            
            const decompressedBody = new Blob(chunks);
            
            return new Response(decompressedBody, {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });
        }
        
        return response;
    } catch (error) {
        // Silent error handling for decompression
        return response;
    }
}

// Handle static assets
async function handleStaticAsset(request) {
    const url = new URL(request.url);
    const isJavaScript = url.pathname.endsWith('.js');

    // Network-first for JavaScript to avoid stale bundles (especially main.js)
    if (isJavaScript) {
        try {
            // Bypass HTTP cache entirely to guarantee freshness
            const response = await fetch(request, { cache: 'no-store' });
            if (response && response.ok) {
                const cache = await caches.open(STATIC_CACHE);
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            // Fallback to cache if available
            const cache = await caches.open(STATIC_CACHE);
            const cachedResponse = await cache.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
            // As a last resort, try serving index.html
            return caches.match('/index.html');
        }
    }

    // Existing cache-first strategy for non-JS static assets
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    try {
        const response = await fetch(request);
        if (response.ok) {
            const responseClone = response.clone();
            cache.put(request, responseClone);
        }
        return response;
    } catch (error) {
        return caches.match('/index.html');
    }
}

// Handle dynamic requests
async function handleDynamicRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            const responseClone = response.clone();
            cache.put(request, responseClone);
        }
        
        return response;
    } catch (error) {
        // Return cached response if available
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page
        return caches.match('/index.html');
    }
}

// Check if request is for static asset
function isStaticAsset(url) {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.eot'];
    const urlLower = url.toLowerCase();
    
    return staticExtensions.some(ext => urlLower.includes(ext)) ||
           urlLower.includes('fonts.googleapis.com') ||
           urlLower.includes('cdn.tailwindcss.com') ||
           urlLower.includes('cdnjs.cloudflare.com');
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Background sync implementation
async function doBackgroundSync() {
    try {
        // Sync any pending palette generations
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();
        
        for (const request of requests) {
            if (request.url.includes('/api/')) {
                try {
                    await fetch(request);
                } catch (error) {
                    // Silent error handling for background sync
                }
            }
        }
    } catch (error) {
        // Silent error handling for background sync
    }
}

// Push notification handling
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New palette generated!',
        icon: '/assets/logo_light.png',
        badge: '/assets/logo_light.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Palette',
                icon: '/assets/logo_light.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/logo_light.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Palettinum', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling for cache management
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_CLEANUP') {
        event.waitUntil(cleanupCache());
    }
});

// Enhanced cache management
async function cleanupCache() {
    
    
    const cacheNames = await caches.keys();
    let totalCleaned = 0;
    
    for (const cacheName of cacheNames) {
        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            await caches.delete(cacheName);
            totalCleaned++;

        }
    }
    
    // Clean up expired entries in dynamic cache
    const dynamicCache = await caches.open(DYNAMIC_CACHE);
    const requests = await dynamicCache.keys();
    let expiredCleaned = 0;
    
    for (const request of requests) {
        const response = await dynamicCache.match(request);
        if (response) {
            const cacheDate = response.headers.get('sw-cache-date');
            if (cacheDate) {
                const cacheTime = new Date(cacheDate).getTime();
                const now = Date.now();
                const maxAge = self.adaptiveCacheConfig?.maxCacheAge || 24 * 60 * 60 * 1000;
                
                if (now - cacheTime > maxAge) {
                    await dynamicCache.delete(request);
                    expiredCleaned++;
                }
            }
        }
    }
    
    
    
    // Optimize cache size
    await optimizeCacheSize();
}

// Optimize cache size
async function optimizeCacheSize() {
    const maxSize = self.adaptiveCacheConfig?.maxCacheSize || 50 * 1024 * 1024; // 50MB
    const dynamicCache = await caches.open(DYNAMIC_CACHE);
    const requests = await dynamicCache.keys();
    
    let totalSize = 0;
    const entries = [];
    
    // Calculate total size and collect entries
    for (const request of requests) {
        const response = await dynamicCache.match(request);
        if (response) {
            const responseBody = await response.arrayBuffer();
            const size = responseBody.byteLength;
            totalSize += size;
            
            entries.push({
                request,
                response,
                size,
                timestamp: new Date(response.headers.get('sw-cache-date') || Date.now()).getTime()
            });
        }
    }
    
    // If cache is too large, remove oldest entries
    if (totalSize > maxSize) {

        
        // Sort by timestamp (oldest first)
        entries.sort((a, b) => a.timestamp - b.timestamp);
        
        let removedSize = 0;
        let removedCount = 0;
        
        for (const entry of entries) {
            if (totalSize - removedSize <= maxSize * 0.8) { // Keep 80% of max size
                break;
            }
            
            await dynamicCache.delete(entry.request);
            removedSize += entry.size;
            removedCount++;
        }
        

    }
}

// Comprehensive cache cleanup for PNG button removal
async function cleanupAllCaches() {
    try {
        const cacheNames = await caches.keys();
        
        for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const requests = await cache.keys();
            
            for (const request of requests) {
                const url = request.url;
                
                // Delete any cached versions of files that might contain PNG button
                if (url.includes('accessibilityDashboard.js') || 
                    url.includes('main.js') || 
                    url.includes('style.css') ||
                    url.includes('index.html')) {
                    
                    // Delete all versions except current
                    if (!url.includes('v=3.31') && !url.includes('v1.0.15')) {
                        console.log('Cleaning up old cached file:', url);
                        await cache.delete(request);
                    }
                }
            }
        }
        
        console.log('Cache cleanup completed for PNG button removal');
    } catch (error) {
        console.error('Cache cleanup error:', error);
    }
} 