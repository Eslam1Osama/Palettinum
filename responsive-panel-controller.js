/**
 * Responsive Panel Controller - Enterprise-Grade Panel Management
 * 
 * This module provides comprehensive control over the responsive panel system,
 * including panel opening/closing, button visibility management, and state synchronization.
 * 
 * @author EasOfTopia Web Development Team
 * @version 1.0.0
 * @license MIT
 */

class ResponsivePanelController {
    constructor() {
        // Panel state management
        this.isPanelOpen = false;
        this.isInitialized = false;
        
        // DOM element references
        this.elements = {
            panelToggle: null,
            responsivePanel: null,
            panelOverlay: null,
            panelClose: null
        };
        
        // Configuration
        this.config = {
            animationDuration: 300,
            overlayBlur: true,
            focusManagement: true,
            keyboardSupport: true,
            resizeHandling: true
        };
        
        // Event handlers
        this.eventHandlers = new Map();
        
        // Initialize the controller
        this.init();
    }
    
    /**
     * Initialize the responsive panel controller
     */
    init() {
        try {
            this.initializeElements();
            this.setupEventListeners();
            this.setupKeyboardSupport();
            this.setupResizeHandling();
            this.initializeButtonVisibility();
            this.isInitialized = true;
        } catch (error) {
            // Silent error handling for production
        }
    }
    
    /**
     * Initialize DOM element references
     */
    initializeElements() {
        this.elements.panelToggle = document.getElementById('panel-toggle');
        this.elements.responsivePanel = document.getElementById('responsive-panel');
        this.elements.panelOverlay = document.getElementById('panel-overlay');
        this.elements.panelClose = document.getElementById('panel-close');
        
        // Validate required elements
        if (!this.elements.panelToggle || !this.elements.responsivePanel || 
            !this.elements.panelOverlay || !this.elements.panelClose) {
            throw new Error('Required panel elements not found');
        }
    }
    
    /**
     * Setup event listeners for panel interactions
     */
    setupEventListeners() {
        // Panel toggle button
        this.addEventHandler(this.elements.panelToggle, 'click', () => {
            this.togglePanel();
        });
        
        // Panel close button
        this.addEventHandler(this.elements.panelClose, 'click', () => {
            this.closePanel();
        });
        
        // Panel overlay click to close
        this.addEventHandler(this.elements.panelOverlay, 'click', () => {
            this.closePanel();
        });
        
        // Escape key to close panel
        if (this.config.keyboardSupport) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isPanelOpen) {
                    this.closePanel();
                }
            });
        }
    }
    
    /**
     * Setup keyboard navigation support
     */
    setupKeyboardSupport() {
        if (!this.config.keyboardSupport) return;
        
        // Tab trap within panel when open
        this.elements.responsivePanel.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isPanelOpen) {
                this.handleTabNavigation(e);
            }
        });
    }
    
    /**
     * Setup resize handling for responsive behavior
     */
    setupResizeHandling() {
        if (!this.config.resizeHandling) return;
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    /**
     * Initialize button visibility based on screen size
     */
    initializeButtonVisibility() {
        const currentWidth = window.innerWidth;
        const isLargeScreen = currentWidth >= 1280;
        
        if (isLargeScreen) {
            // Large screen: Hide button
            this.elements.panelToggle.classList.add('button-hidden');
        } else {
            // Small screen: Show button
            this.elements.panelToggle.classList.remove('button-hidden');
        }
    }
    
    /**
     * Add event handler with cleanup tracking
     */
    addEventHandler(element, event, handler) {
        element.addEventListener(event, handler);
        this.eventHandlers.set(`${event}_${element.id}`, { element, event, handler });
    }
    
    /**
     * Toggle panel open/closed state
     */
    togglePanel() {
        if (this.isPanelOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }
    
    /**
     * Open the responsive panel
     */
    openPanel() {
        if (!this.isInitialized || this.isPanelOpen) return;
        
        try {
            this.isPanelOpen = true;
            
            // Add panel open class
            this.elements.responsivePanel.classList.add('panel-open');
            
            // Show and activate overlay
            this.elements.panelOverlay.classList.remove('hidden');
            this.elements.panelOverlay.classList.add('overlay-active');
            
            // Update button state
            this.elements.panelToggle.classList.add('panel-active');
            
            // Hide toggle button when panel is open
            this.elements.panelToggle.classList.add('button-hidden');
            
            // Focus management
            if (this.config.focusManagement) {
                setTimeout(() => {
                    this.elements.responsivePanel.focus();
                }, this.config.animationDuration);
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Dispatch custom event
            this.dispatchPanelEvent('panelOpened');
        } catch (error) {
            this.isPanelOpen = false;
        }
    }
    
    /**
     * Close the responsive panel
     */
    closePanel() {
        if (!this.isInitialized || !this.isPanelOpen) return;
        
        try {
            this.isPanelOpen = false;
            
            // Remove panel open class
            this.elements.responsivePanel.classList.remove('panel-open');
            
            // Hide and deactivate overlay
            this.elements.panelOverlay.classList.add('hidden');
            this.elements.panelOverlay.classList.remove('overlay-active');
            
            // Update button state
            this.elements.panelToggle.classList.remove('panel-active');
            
            // Show toggle button when panel is closed
            this.elements.panelToggle.classList.remove('button-hidden');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Return focus to toggle button
            if (this.config.focusManagement) {
                this.elements.panelToggle.focus();
            }
            
            // Dispatch custom event
            this.dispatchPanelEvent('panelClosed');
        } catch (error) {
            // Silent error handling for production
        }
    }
    
    /**
     * Handle tab navigation within panel
     */
    handleTabNavigation(e) {
        const focusableElements = this.elements.responsivePanel.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    /**
     * Handle window resize events
     */
    handleResize() {
        const currentWidth = window.innerWidth;
        const isLargeScreen = currentWidth >= 1280;
        
        if (isLargeScreen) {
            // Large screen: Force close panel and hide button
            if (this.isPanelOpen) {
                this.forceClosePanel();
            }
            this.elements.panelToggle.classList.add('button-hidden');
        } else {
            // Small screen: Restore button visibility if panel is closed
            if (!this.isPanelOpen) {
                this.elements.panelToggle.classList.remove('button-hidden');
            }
        }
        
        // Ensure panel is properly positioned after resize if still open
        if (this.isPanelOpen && !isLargeScreen) {
            this.elements.responsivePanel.classList.remove('panel-open');
            setTimeout(() => {
                this.elements.responsivePanel.classList.add('panel-open');
            }, 50);
        }
    }
    
    /**
     * Dispatch custom panel events
     */
    dispatchPanelEvent(eventName, detail = {}) {
        const event = new CustomEvent(`responsivePanel:${eventName}`, {
            detail: {
                isOpen: this.isPanelOpen,
                timestamp: Date.now(),
                ...detail
            }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Get current panel state
     */
    getPanelState() {
        return {
            isOpen: this.isPanelOpen,
            isInitialized: this.isInitialized,
            elements: Object.keys(this.elements).reduce((acc, key) => {
                acc[key] = !!this.elements[key];
                return acc;
            }, {})
        };
    }
    
    /**
     * Force close panel (emergency)
     */
    forceClosePanel() {
        if (this.isPanelOpen) {
            this.isPanelOpen = false;
            
            // Remove panel open class
            this.elements.responsivePanel.classList.remove('panel-open');
            
            // Hide and deactivate overlay
            this.elements.panelOverlay.classList.add('hidden');
            this.elements.panelOverlay.classList.remove('overlay-active');
            
            // Update button state
            this.elements.panelToggle.classList.remove('panel-active');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Check screen size for button visibility
            const currentWidth = window.innerWidth;
            const isLargeScreen = currentWidth >= 1280;
            
            if (!isLargeScreen) {
                // Small screen: Show button
                this.elements.panelToggle.classList.remove('button-hidden');
            }
        }
    }
    
    /**
     * Cleanup event listeners
     */
    cleanup() {
        this.eventHandlers.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventHandlers.clear();
        
        // Force close panel if open
        this.forceClosePanel();
    }
}

// Initialize the controller when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.responsivePanelController = new ResponsivePanelController();
    });
} else {
    window.responsivePanelController = new ResponsivePanelController();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsivePanelController;
}
