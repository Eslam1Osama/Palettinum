// cache-manager.js - Industrial-level adaptive caching system
class CacheManager {
    constructor() {
        this.cacheStrategies = {
            PALETTE_CACHE: 'palette-cache-v2',
            COMPONENT_CACHE: 'component-cache-v2',
            API_CACHE: 'api-cache-v2',
            THEME_CACHE: 'theme-cache-v2',
            ACCESSIBILITY_CACHE: 'accessibility-cache-v2',
            STATE_CACHE: 'state-cache-v2',
            USER_PREFERENCES_CACHE: 'user-preferences-v2'
        };
        
        this.memoryCache = new Map();
        this.cacheExpiry = new Map();
        this.accessFrequency = new Map(); // Track access frequency
        this.maxMemorySize = this.getAdaptiveCacheSize();
        this.defaultExpiry = this.getAdaptiveExpiry();
        
        // Adaptive cache configuration
        this.adaptiveConfig = {
            strategy: 'balanced',
            persistenceLevel: 'medium',
            cleanupInterval: 600000, // 10 minutes (reduced frequency)
            maxCacheAge: 24 * 60 * 60 * 1000, // 24 hours
            compressionEnabled: true,
            predictiveCaching: true
        };
        
        this.init();
    }

    async init() {
        // Initialize service worker if supported
        if ('serviceWorker' in navigator) {
            try {
                // Prefer relative path to avoid scope/origin mismatches
                const swPath = (location.pathname.endsWith('/') ? 'sw.js' : '/sw.js');
                await navigator.serviceWorker.register(swPath, { scope: '/' });
            } catch (error) {
                // Silent error handling for service worker registration
            }
        }
        
        // Load cached data from localStorage
        this.loadFromLocalStorage();
        
        // Initialize adaptive cache system
        this.initAdaptiveCache();
        
        // Start periodic adaptive optimization
        this.startAdaptiveOptimization();
    }

    // Get adaptive cache size based on usage patterns (SIMPLIFIED)
    getAdaptiveCacheSize() {
        // Always use conservative cache size for fresh starts
        return 100; // Default conservative size
    }

    // Get adaptive expiry based on usage patterns (SIMPLIFIED)
    getAdaptiveExpiry() {
        // Always use shorter expiry for fresh starts
        return 30 * 60 * 1000; // Default 30 minutes
    }

    // Initialize adaptive cache system (SIMPLIFIED)
    initAdaptiveCache() {
        // Load adaptive configuration from localStorage
        this.loadAdaptiveConfig();
        
        // Initialize predictive caching
        if (this.adaptiveConfig.predictiveCaching) {
            this.initPredictiveCaching();
        }
        
        // Start adaptive cleanup
        this.startAdaptiveCleanup();
    }

    // Load adaptive configuration (DISABLED)
    loadAdaptiveConfig() {
        // Adaptive config loading disabled for fresh starts
        
    }

    // Save adaptive configuration (DISABLED)
    saveAdaptiveConfig() {
        // DISABLED: Adaptive config saving for fresh starts
        // try {
        //     localStorage.setItem('palettable_cache_config', JSON.stringify(this.adaptiveConfig));
        // } catch (error) {
        //     console.warn('Failed to save adaptive cache config:', error);
        // }
    }

    // Initialize predictive caching (DISABLED)
    initPredictiveCaching() {
        // Predictive caching disabled for fresh starts
    }

    // Get frequently used components (DISABLED)
    getFrequentComponents() {
        // Return empty array - no predictive caching
        return [];
    }

    // Predictive caching
    predictiveCache(component) {
        // Pre-cache component templates
        const key = `predictive_${component}`;
        if (!this.has(key)) {
            this.set(key, { component, type: 'predictive', timestamp: Date.now() }, 60 * 60 * 1000);
        }
    }

    // DISABLED: Adaptive optimization to reduce memory usage
    startAdaptiveOptimization() {
        // All adaptive optimization disabled
    }

    // Perform adaptive optimization
    performAdaptiveOptimization() {
        // Analyze cache performance
        const performance = this.analyzeCachePerformance();
        
        // Adjust strategy based on performance
        this.adjustCacheStrategy(performance);
        
        // Cleanup based on adaptive rules
        this.performAdaptiveCleanup();
        
        // DISABLED: Adaptive config saving for fresh starts
        // this.saveAdaptiveConfig();
    }

    // Analyze cache performance
    analyzeCachePerformance() {
        const totalAccesses = Array.from(this.accessFrequency.values()).reduce((sum, freq) => sum + freq, 0);
        const averageAccess = totalAccesses / this.accessFrequency.size || 0;
        const hitRate = this.calculateHitRate();
        
        return {
            totalAccesses,
            averageAccess,
            hitRate,
            cacheSize: this.memoryCache.size,
            maxSize: this.maxMemorySize,
            utilization: this.memoryCache.size / this.maxMemorySize
        };
    }

    // Calculate hit rate
    calculateHitRate() {
        try {
            const state = localStorage.getItem('palettable_state');
            if (state) {
                const parsed = JSON.parse(state);
                const hits = parsed.cacheMetrics?.hits || 0;
                const misses = parsed.cacheMetrics?.misses || 0;
                const total = hits + misses;
                return total > 0 ? hits / total : 0;
            }
        } catch (error) {
            // Silent error handling for hit rate calculation
        }
        return 0;
    }

    // Adjust cache strategy based on performance
    adjustCacheStrategy(performance) {
        const { hitRate, utilization } = performance;
        
        if (hitRate > 0.8 && utilization < 0.7) {
            // High performance - can be more aggressive
            this.adaptiveConfig.strategy = 'aggressive';
            this.maxMemorySize = Math.min(200, this.maxMemorySize + 10);
        } else if (hitRate < 0.3 || utilization > 0.9) {
            // Low performance - be more conservative
            this.adaptiveConfig.strategy = 'conservative';
            this.maxMemorySize = Math.max(50, this.maxMemorySize - 10);
        } else {
            // Balanced performance
            this.adaptiveConfig.strategy = 'balanced';
        }
        
        // Only log strategy changes if there's significant performance impact
        if (performance.hitRate < 0.2 || performance.utilization > 0.95) {

        }
    }

    // DISABLED: Adaptive cleanup to reduce memory usage
    startAdaptiveCleanup() {
        // All adaptive cleanup disabled
    }

    // Perform adaptive cleanup
    performAdaptiveCleanup() {
        const now = Date.now();
        const keysToDelete = [];
        
        // Cleanup based on access frequency and age
        this.memoryCache.forEach((value, key) => {
            const expiry = this.cacheExpiry.get(key);
            const frequency = this.accessFrequency.get(key) || 0;
            const age = now - (value.timestamp || now);
            
            // Delete if expired
            if (expiry && now > expiry) {
                keysToDelete.push(key);
                return;
            }
            
            // Delete if very old and rarely accessed
            if (age > this.adaptiveConfig.maxCacheAge && frequency < 2) {
                keysToDelete.push(key);
                return;
            }
            
            // Delete if cache is full and item has low frequency
            if (this.memoryCache.size > this.maxMemorySize * 0.9 && frequency < 1) {
                keysToDelete.push(key);
            }
        });
        
        keysToDelete.forEach(key => this.delete(key));
        
        if (keysToDelete.length > 0) {

        }
    }

    // Memory cache operations
    set(key, value, expiry = this.defaultExpiry) {
        const expiryTime = Date.now() + expiry;
        
        // Add timestamp to value for adaptive cleanup
        const valueWithTimestamp = {
            ...value,
            timestamp: Date.now(),
            accessCount: 0
        };
        
        // Implement adaptive LRU eviction
        if (this.memoryCache.size >= this.maxMemorySize) {
            this.evictLeastValuable();
        }
        
        this.memoryCache.set(key, valueWithTimestamp);
        this.cacheExpiry.set(key, expiryTime);
        this.accessFrequency.set(key, 0);
        
        // Also store in localStorage for persistence
        this.saveToLocalStorage(key, valueWithTimestamp, expiryTime);
    }

    get(key) {
        const expiryTime = this.cacheExpiry.get(key);
        
        if (!expiryTime || Date.now() > expiryTime) {
            this.memoryCache.delete(key);
            this.cacheExpiry.delete(key);
            this.accessFrequency.delete(key);
            return null;
        }
        
        const value = this.memoryCache.get(key);
        if (value) {
            // Update access frequency and count
            const currentFreq = this.accessFrequency.get(key) || 0;
            this.accessFrequency.set(key, currentFreq + 1);
            
            // Update access count in value
            value.accessCount = (value.accessCount || 0) + 1;
            value.lastAccessed = Date.now();
        }
        
        return value;
    }

    // Evict least valuable items based on access frequency and age
    evictLeastValuable() {
        const items = Array.from(this.memoryCache.entries()).map(([key, value]) => ({
            key,
            value,
            frequency: this.accessFrequency.get(key) || 0,
            age: Date.now() - (value.timestamp || Date.now()),
            accessCount: value.accessCount || 0
        }));
        
        // Sort by value (frequency + recency - age)
        items.sort((a, b) => {
            const aValue = a.frequency * 10 + a.accessCount - (a.age / 1000);
            const bValue = b.frequency * 10 + b.accessCount - (b.age / 1000);
            return aValue - bValue;
        });
        
        // Remove the least valuable items
        const toRemove = Math.floor(this.maxMemorySize * 0.2); // Remove 20%
        for (let i = 0; i < toRemove && i < items.length; i++) {
            const item = items[i];
            this.delete(item.key);
        }
    }

    has(key) {
        return this.get(key) !== null;
    }

    delete(key) {
        this.memoryCache.delete(key);
        this.cacheExpiry.delete(key);
        this.accessFrequency.delete(key);
        localStorage.removeItem(`cache_${key}`);
    }

    clear() {
        this.memoryCache.clear();
        this.cacheExpiry.clear();
        this.accessFrequency.clear();
        
        // Clear localStorage cache entries
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('cache_')) {
                localStorage.removeItem(key);
            }
        });
    }

    // Palette-specific caching
    async cachePalette(palette, options = {}) {
        // Validate palette input
        if (!palette || !Array.isArray(palette)) {
            // Silent error handling for invalid palette caching
            return null;
        }
        
        const key = this.generatePaletteKey(palette, options);
        const cacheData = {
            palette,
            options,
            timestamp: Date.now(),
            accessibility: null // Will be populated when accessibility test is run
        };
        
        this.set(key, cacheData, options.expiry || this.defaultExpiry);
        return key;
    }

    async getCachedPalette(palette, options = {}) {
        // Handle undefined/null palette
        if (!palette) {
            return null;
        }
        
        const key = this.generatePaletteKey(palette, options);
        return this.get(key);
    }

    generatePaletteKey(palette, options) {
        // Ensure palette is an array and handle undefined/null cases
        if (!palette || !Array.isArray(palette)) {
            palette = [];
        }
        
        const paletteHash = JSON.stringify(palette.sort());
        const optionsHash = JSON.stringify(options || {});
        return `palette_${this.hashCode(paletteHash + optionsHash)}`;
    }

    // Component caching
    cacheComponent(componentName, palette, renderedHTML) {
        const key = `component_${componentName}_${this.hashCode(JSON.stringify(palette))}`;
        this.set(key, {
            componentName,
            palette,
            renderedHTML,
            timestamp: Date.now()
        }, 60 * 60 * 1000); // 1 hour expiry for components
    }

    getCachedComponent(componentName, palette) {
        const key = `component_${componentName}_${this.hashCode(JSON.stringify(palette))}`;
        const cached = this.get(key);
        return cached ? cached.renderedHTML : null;
    }

    // API response caching
    cacheAPIResponse(url, response, expiry = 5 * 60 * 1000) { // 5 minutes for API responses
        const key = `api_${this.hashCode(url)}`;
        this.set(key, {
            url,
            response,
            timestamp: Date.now()
        }, expiry);
    }

    getCachedAPIResponse(url) {
        const key = `api_${this.hashCode(url)}`;
        const cached = this.get(key);
        return cached ? cached.response : null;
    }


    // Theme caching
    cacheTheme(theme, palette) {
        const key = `theme_${theme}_${this.hashCode(JSON.stringify(palette))}`;
        this.set(key, {
            theme,
            palette,
            timestamp: Date.now()
        }, 60 * 60 * 1000); // 1 hour for theme data
    }

    getCachedTheme(theme, palette) {
        const key = `theme_${theme}_${this.hashCode(JSON.stringify(palette))}`;
        const cached = this.get(key);
        return cached ? cached : null;
    }

    // Utility methods
    hashCode(str) {
        let hash = 0;
        if (str.length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(36);
    }

    // LocalStorage persistence
    saveToLocalStorage(key, value, expiryTime) {
        try {
            const data = {
                value,
                expiry: expiryTime
            };
            localStorage.setItem(`cache_${key}`, JSON.stringify(data));
        } catch (error) {
            // Silent error handling for localStorage save
        }
    }

    loadFromLocalStorage() {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('cache_')) {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.expiry > Date.now()) {
                        const cacheKey = key.replace('cache_', '');
                        this.memoryCache.set(cacheKey, data.value);
                        this.cacheExpiry.set(cacheKey, data.expiry);
                    } else {
                        localStorage.removeItem(key);
                    }
                }
            });
        } catch (error) {
            // Silent error handling for localStorage load
        }
    }

    // Cache statistics
    getStats() {
        const stats = {
            memorySize: this.memoryCache.size,
            maxMemorySize: this.maxMemorySize,
            expiredEntries: 0,
            totalEntries: this.memoryCache.size
        };

        // Count expired entries
        this.cacheExpiry.forEach((expiry, key) => {
            if (Date.now() > expiry) {
                stats.expiredEntries++;
            }
        });

        return stats;
    }

    // Cache cleanup
    cleanup() {
        const now = Date.now();
        const keysToDelete = [];

        this.cacheExpiry.forEach((expiry, key) => {
            if (now > expiry) {
                keysToDelete.push(key);
            }
        });

        keysToDelete.forEach(key => {
            this.delete(key);
        });

        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }

        return keysToDelete.length;
    }

    // DISABLED: Aggressive memory management to prevent false positives
    optimizeMemory() {
        // Only log memory usage, don't trigger aggressive cleanup
        if ('memory' in performance) {
            const memory = performance.memory;
            const usage = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
            
            // Only warn if usage is extremely high
            if (usage > 95) {
                // High memory usage detected
            }
        }
        
        // Only perform basic cleanup if cache is very full
        if (this.memoryCache.size > this.maxMemorySize * 0.9) {
    
            this.performAdaptiveCleanup();
        }
    }
    
    // Intelligent Cache Busting System
    intelligentCacheBust(operationType, data = null) {

        
        const bustingStrategies = {
            'accessibility_dashboard': () => {
                // Clear old items after heavy analysis
                this.clearOldItems();
        
            },
            'heavy_operation': () => {
                // Clear non-essential items after heavy operations
                this.clearNonEssentialItems();
                this.clearLowFrequencyItems();
        
            },
            'memory_pressure': () => {
                // Aggressive cleanup when memory pressure detected
                this.clearOldItems();
                this.clearNonEssentialItems();
                this.clearLowFrequencyItems();
                this.emergencyCleanup();
        
            },
            'user_action': (action) => {
                // Smart cleanup based on user action
                switch(action) {
                    case 'export_css':
                        this.clearNonEssentialItems();
                        break;
                    case 'generate_palette':
                        this.clearOldItems();
                        break;
                    default:
                        this.clearLowFrequencyItems();
                }
        
            }
        };
        
        const strategy = bustingStrategies[operationType];
        if (strategy) {
            strategy(data);
            this.optimizeMemory();
        }
    }

    // Enhanced accessibility dashboard clearing with memory optimization

    // Smart cache size monitoring
    monitorCacheSize() {
        const currentSize = this.memoryCache.size;
        const maxSize = this.maxMemorySize;
        const utilization = currentSize / maxSize;
        
        if (utilization > 0.8) {
    
            this.intelligentCacheBust('memory_pressure');
        }
        
        return { currentSize, maxSize, utilization };
    }

    // Post-operation cache optimization
    postOperationCleanup(operationType) {
        // Trigger intelligent cache busting based on operation
        this.intelligentCacheBust(operationType);
        
        // Monitor cache size after cleanup
        const cacheStats = this.monitorCacheSize();
        
        // Log cleanup results

    }
    
    // Clear old items based on age
    clearOldItems() {
        const now = Date.now();
        const keysToDelete = [];
        this.memoryCache.forEach((value, key) => {
            const age = now - (value.timestamp || now);
            if (age > this.adaptiveConfig.maxCacheAge) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach(key => this.delete(key));

    }
    
    // Clear non-essential items
    clearNonEssentialItems() {
        const keysToDelete = [];
        this.memoryCache.forEach((value, key) => {
            if (!key.startsWith('palette_') && !key.startsWith('component_')) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach(key => this.delete(key));

    }
    
    // Clear low frequency items
    clearLowFrequencyItems() {
        const keysToDelete = [];
        this.memoryCache.forEach((value, key) => {
            const frequency = this.accessFrequency.get(key) || 0;
            if (frequency < 2) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach(key => this.delete(key));

    }
    
    // Emergency cleanup for memory leaks
    emergencyCleanup() {
        // Nuclear cleanup triggered - complete system reset
        
        // Clear all cache entries
        this.clear();
        
        // Clear localStorage completely
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('cache_')) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.warn('Failed to clear localStorage during emergency cleanup:', error);
        }
        
        // Force multiple aggressive garbage collection cycles
        if (window.gc) {
            window.gc();
            setTimeout(() => window.gc(), 50);
            setTimeout(() => window.gc(), 200);
            setTimeout(() => window.gc(), 500);
            setTimeout(() => window.gc(), 1000);
        }
        
        // Drastically reduce cache size
        this.maxMemorySize = Math.max(25, this.maxMemorySize * 0.5);
        
        // Clear all intervals and timeouts
        this.clearAllIntervals();
        
        console.warn('🚨 NUCLEAR CLEANUP: Complete. System reset and memory optimized.');
    }
    
    // Clear all intervals and timeouts
    clearAllIntervals() {
        // Clear all setInterval and setTimeout calls
        const highestId = window.setTimeout(() => {}, 0);
        for (let i = highestId; i >= 0; i--) {
            window.clearTimeout(i);
            window.clearInterval(i);
        }
    }
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CacheManager;
} else {
    window.CacheManager = CacheManager;
} 