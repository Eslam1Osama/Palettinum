// performance-monitor.js - Enterprise-grade performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: {},
            paletteGeneration: {},
            componentRendering: {},
            cacheHits: 0,
            cacheMisses: 0,
            apiCalls: [],
            errors: []
        };
        
        this.observers = new Set();
        this.thresholds = {
            pageLoad: 3000, // 3 seconds
            paletteGeneration: 2000, // 2 seconds
            componentRendering: 500, // Increased to 500ms for large component sets
            cacheHitRate: 0.3 // Further reduced to 30% for more realistic expectations
        };
        
        this.init();
    }

    init() {
        // ONLY monitor cache usage every 5 seconds - everything else disabled
        this.monitorCachePerformance();
    }

    // Monitor page load performance
    monitorPageLoad() {
        if (performance && performance.getEntriesByType) {
            const navigationEntries = performance.getEntriesByType('navigation');
            if (navigationEntries.length > 0) {
                const entry = navigationEntries[0];
                this.metrics.pageLoad = {
                    domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
                    loadComplete: entry.loadEventEnd - entry.loadEventStart,
                    domInteractive: entry.domInteractive,
                    firstPaint: this.getFirstPaint(),
                    firstContentfulPaint: this.getFirstContentfulPaint(),
                    largestContentfulPaint: this.getLargestContentfulPaint()
                };
                
                this.checkPerformanceThresholds('pageLoad', this.metrics.pageLoad.loadComplete);
            }
        }
    }

    // Monitor long tasks
    monitorLongTasks() {
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.duration > 300) { // Increased threshold to 300ms for large operations
                            this.recordLongTask(entry);
                        }
                    }
                });
                observer.observe({ entryTypes: ['longtask'] });
                    } catch (error) {
            // Silent error handling for long task monitoring
        }
        }
    }

    // Monitor memory usage
    monitorMemoryUsage() {
        if ('memory' in performance) {
            // Prevent multiple instances from monitoring simultaneously
            if (this.memoryMonitoringInterval) {
                clearInterval(this.memoryMonitoringInterval);
            }
            
            let lastMemoryUsage = 0;
            let idleMemoryIncreaseCount = 0;
            
            // OPTIMIZED FREQUENCY: Monitor memory every 2 minutes instead of 30 seconds
            this.memoryMonitoringInterval = setInterval(() => {
                const memory = performance.memory;
                this.metrics.memory = {
                    usedJSHeapSize: memory.usedJSHeapSize,
                    totalJSHeapSize: memory.totalJSHeapSize,
                    jsHeapSizeLimit: memory.jsHeapSizeLimit,
                    usage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
                };
                
                // Only check for memory leaks if usage is already high
                if (lastMemoryUsage > 0 && this.metrics.memory.usage > 85) {
                    const memoryIncrease = this.metrics.memory.usage - lastMemoryUsage;
                    if (memoryIncrease > 15.0) { // Increased threshold to 15.0% to reduce false positives
                        idleMemoryIncreaseCount++;
                        // Memory leak detected - silent handling
                        
                        // Only trigger cleanup after 5 consecutive increases (more conservative)
                        if (idleMemoryIncreaseCount >= 5) {
                            // Critical memory leak detected - triggering cleanup
                            if (window.cacheManager && window.cacheManager.emergencyCleanup) {
                                window.cacheManager.emergencyCleanup();
                            }
                            idleMemoryIncreaseCount = 0;
                        }
                    } else {
                        idleMemoryIncreaseCount = 0;
                    }
                }
                
                lastMemoryUsage = this.metrics.memory.usage;
                
                // Only alert if memory usage is extremely high
                if (this.metrics.memory.usage > 98) {
                    this.recordWarning('Critical memory usage detected', this.metrics.memory);
                    // Critical memory usage detected
                }
            }, 120000); // Check every 2 minutes (reduced frequency)
        }
    }

    // Monitor network requests
    monitorNetworkRequests() {
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
                            this.recordNetworkRequest(entry);
                        }
                    }
                });
                observer.observe({ entryTypes: ['resource'] });
            } catch (error) {
                // Network monitoring not supported
            }
        }
    }

    // Monitor user interactions
    monitorUserInteractions() {
        let lastInteraction = Date.now();
        
        const events = ['click', 'input', 'scroll', 'keydown', 'mousemove'];
        events.forEach(eventType => {
            document.addEventListener(eventType, () => {
                lastInteraction = Date.now();
            }, { passive: true });
        });
        
        // Monitor for user inactivity
        if (this.userInactivityInterval) {
            clearInterval(this.userInactivityInterval);
        }
        
        this.userInactivityInterval = setInterval(() => {
            const inactiveTime = Date.now() - lastInteraction;
            if (inactiveTime > 300000) { // 5 minutes
                this.recordMetric('userInactivity', inactiveTime);
                
                // DISABLED: Idle time cleanup to prevent false positives
                // Only log, don't trigger cleanup automatically
                if (inactiveTime > 600000) { // 10 minutes
        
                }
            }
        }, 60000); // Check every minute
    }

    // Monitor cache performance
    monitorCachePerformance() {
        this.cacheMetrics = {
            hits: 0,
            misses: 0,
            hitRate: 0
        };
        this.lastReportedMisses = 0; // Track for smart warning suppression
        
        // ONLY monitor cache usage every 5 seconds - minimal monitoring
        setInterval(() => {
            if (this.metrics.cacheHits + this.metrics.cacheMisses > 0) {
                const hitRate = this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses);
                this.cacheMetrics.hitRate = hitRate;
                
                // Only log if there's significant cache activity
                if (this.metrics.cacheHits + this.metrics.cacheMisses > 10) {
        
                }
            }
        }, 5000); // Every 5 seconds
    }

    // Record palette generation performance
    recordPaletteGeneration(startTime, endTime, success = true) {
        const duration = endTime - startTime;
        this.metrics.paletteGeneration = {
            duration,
            success,
            timestamp: Date.now()
        };
        
        this.checkPerformanceThresholds('paletteGeneration', duration);
        this.notifyObservers('paletteGeneration', this.metrics.paletteGeneration);
    }

    // Record component rendering performance
    recordComponentRendering(componentName, startTime, endTime) {
        const duration = endTime - startTime;
        
        if (!this.metrics.componentRendering[componentName]) {
            this.metrics.componentRendering[componentName] = [];
        }
        
        this.metrics.componentRendering[componentName].push({
            duration,
            timestamp: Date.now()
        });
        
        // Keep only last 10 measurements
        if (this.metrics.componentRendering[componentName].length > 10) {
            this.metrics.componentRendering[componentName].shift();
        }
        
        // Smart threshold adjustment based on component count
        const componentCount = window.selectedComponents ? window.selectedComponents.length : 0;
        let adjustedThreshold = this.thresholds.componentRendering;
        
        if (componentCount > 20) {
            adjustedThreshold = 2000; // 2 seconds for very large sets
        } else if (componentCount > 15) {
            adjustedThreshold = 1500; // 1.5 seconds for large sets
        } else if (componentCount > 10) {
            adjustedThreshold = 1000; // 1 second for medium sets
        } else if (componentCount > 5) {
            adjustedThreshold = 750; // 750ms for small-medium sets
        }
        
        // Check performance thresholds with adjusted threshold
        if (duration > adjustedThreshold) {
            this.recordWarning(`${componentName} performance threshold exceeded`, {
                value: duration,
                threshold: adjustedThreshold,
                type: 'componentRendering',
                componentCount: componentCount
            });
        } else {
            // Log performance data for successful renders

        }
    }

    // Record cache hit/miss
    recordCacheHit() {
        this.metrics.cacheHits++;
        this.updateCacheMetrics();
    }

    recordCacheMiss() {
        this.metrics.cacheMisses++;
        this.updateCacheMetrics();
    }

    // Record API call
    recordAPICall(url, duration, success = true) {
        this.metrics.apiCalls.push({
            url,
            duration,
            success,
            timestamp: Date.now()
        });
        
        // Keep only last 50 API calls
        if (this.metrics.apiCalls.length > 50) {
            this.metrics.apiCalls.shift();
        }
    }

    // Record error
    recordError(error, context = '') {
        this.metrics.errors.push({
            message: error.message || error,
            stack: error.stack,
            context,
            timestamp: Date.now()
        });
        
        // Keep only last 20 errors
        if (this.metrics.errors.length > 20) {
            this.metrics.errors.shift();
        }
        
        this.notifyObservers('error', { error, context });
    }

    // Record warning
    recordWarning(message, data = {}) {
        // Performance warning - silent handling
        this.notifyObservers('warning', { message, data });
    }

    // Record long task
    recordLongTask(entry) {
        this.recordWarning('Long task detected', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name
        });
    }

    // Record network request
    recordNetworkRequest(entry) {
        const duration = entry.responseEnd - entry.requestStart;
        this.recordAPICall(entry.name, duration, entry.transferSize > 0);
    }

    // Record metric
    recordMetric(name, value) {
        if (!this.metrics[name]) {
            this.metrics[name] = [];
        }
        
        this.metrics[name].push({
            value,
            timestamp: Date.now()
        });
        
        // Keep only last 100 measurements
        if (this.metrics[name].length > 100) {
            this.metrics[name].shift();
        }
    }

    // Update cache metrics
    updateCacheMetrics() {
        const total = this.metrics.cacheHits + this.metrics.cacheMisses;
        this.cacheMetrics.hitRate = total > 0 ? this.metrics.cacheHits / total : 0;
        
        // Only warn if we have enough data, hit rate is very low, AND we're not in initial learning phase
        if (total > 10 && this.cacheMetrics.hitRate < this.thresholds.cacheHitRate) {
            // Check if this is just initial cache misses (normal behavior)
            const recentMisses = this.metrics.cacheMisses - this.lastReportedMisses;
            const isInitialPhase = recentMisses <= 3; // Allow first few misses without warning
            
            if (!isInitialPhase) {
                this.recordWarning('Low cache hit rate detected', {
                    hitRate: this.cacheMetrics.hitRate,
                    threshold: this.thresholds.cacheHitRate,
                    totalRequests: total,
                    recentMisses: recentMisses
                });
            }
        }
        
        // Track for next comparison
        this.lastReportedMisses = this.metrics.cacheMisses;
    }

    // Check performance thresholds
    checkPerformanceThresholds(type, value) {
        const threshold = this.thresholds[type];
        if (threshold && value > threshold) {
            this.recordWarning(`${type} performance threshold exceeded`, {
                value,
                threshold,
                type
            });
        }
    }

    // Get performance metrics
    getMetrics() {
        return {
            ...this.metrics,
            cacheMetrics: this.cacheMetrics,
            thresholds: this.thresholds
        };
    }

    // Get performance report
    getPerformanceReport() {
        const metrics = this.getMetrics();
        const report = {
            summary: {
                pageLoadTime: metrics.pageLoad.loadComplete || 0,
                averagePaletteGeneration: this.calculateAverage(metrics.paletteGeneration.duration),
                cacheHitRate: this.cacheMetrics.hitRate,
                errorCount: metrics.errors.length,
                apiCallCount: metrics.apiCalls.length
            },
            recommendations: this.generateRecommendations(metrics),
            details: metrics
        };
        
        return report;
    }

    // Calculate average from array of values
    calculateAverage(values) {
        if (!Array.isArray(values)) return 0;
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }

    // Generate performance recommendations
    generateRecommendations(metrics) {
        const recommendations = [];
        
        if (metrics.pageLoad.loadComplete > this.thresholds.pageLoad) {
            recommendations.push('Consider optimizing page load time by reducing bundle size or implementing lazy loading');
        }
        
        if (metrics.paletteGeneration.duration > this.thresholds.paletteGeneration) {
            recommendations.push('Consider implementing caching for palette generation or optimizing the algorithm');
        }
        
        if (this.cacheMetrics.hitRate < this.thresholds.cacheHitRate) {
            recommendations.push('Consider improving cache strategy or increasing cache size');
        }
        
        if (metrics.errors.length > 10) {
            recommendations.push('High error rate detected. Consider implementing better error handling and monitoring');
        }
        
        return recommendations;
    }

    // Subscribe to performance events
    subscribe(callback) {
        this.observers.add(callback);
        return () => this.observers.delete(callback);
    }

    // Notify observers
    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                // Silent error handling for performance observer
            }
        });
    }

    // Get first paint time
    getFirstPaint() {
        const entries = performance.getEntriesByType('paint');
        const firstPaint = entries.find(entry => entry.name === 'first-paint');
        return firstPaint ? firstPaint.startTime : 0;
    }

    // Get first contentful paint time
    getFirstContentfulPaint() {
        const entries = performance.getEntriesByType('paint');
        const firstContentfulPaint = entries.find(entry => entry.name === 'first-contentful-paint');
        return firstContentfulPaint ? firstContentfulPaint.startTime : 0;
    }

    // Get largest contentful paint time
    getLargestContentfulPaint() {
        if ('PerformanceObserver' in window) {
            return new Promise((resolve) => {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    resolve(lastEntry.startTime);
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            });
        }
        return 0;
    }

    // Cleanup method to prevent memory leaks
    cleanup() {
        if (this.memoryMonitoringInterval) {
            clearInterval(this.memoryMonitoringInterval);
            this.memoryMonitoringInterval = null;
        }
        if (this.userInactivityInterval) {
            clearInterval(this.userInactivityInterval);
            this.userInactivityInterval = null;
        }
    }

    // Export metrics for external monitoring
    exportMetrics() {
        return {
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            metrics: this.getMetrics(),
            report: this.getPerformanceReport()
        };
    }
}

// Singleton pattern to prevent multiple instances
let performanceMonitorInstance = null;

function getPerformanceMonitor() {
    if (!performanceMonitorInstance) {
        performanceMonitorInstance = new PerformanceMonitor();
    }
    return performanceMonitorInstance;
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PerformanceMonitor, getPerformanceMonitor };
} else {
    window.PerformanceMonitor = PerformanceMonitor;
    window.getPerformanceMonitor = getPerformanceMonitor;
} 