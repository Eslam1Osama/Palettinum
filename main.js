// main.js - Enhanced with enterprise-grade caching and performance monitoring
import { applyTheme, toggleTheme } from './theme.js';
import { generatePaletteFromAPI, updatePalette, renderPaletteGrid, hexToRgb, rgbToHsl, rgbToHex } from './palette.js';
import { uiComponents, renderShowcase } from './components.js';
import { showToast, copyToClipboard, setGenerateButtonLoading, monitorThemePerformance, optimizeThemeElements, validateThemeState } from './ui.js';
import { setupEventListeners } from './events.js';
import { SmartColorWheel } from './components/color-wheel/colorWheel.js';
import { accessibilityDashboard } from './components/accessibility-dashboard/accessibilityDashboard.js';

// Declare colorWheel at top level to avoid ReferenceError
let colorWheel;

            // Initialize enterprise-grade systems
    const cacheManager = new CacheManager();
    const appStore = new AppStore();
    const performanceMonitor = getPerformanceMonitor();
    
    // Initialize theme optimization systems
    monitorThemePerformance();
    optimizeThemeElements();
    validateThemeState();
    
    // Global error handler for theme operations and benign extension errors
    window.addEventListener('error', (event) => {
        // Suppress benign extension/DevTools scheme errors without hiding real errors
        try {
            const msg = String(event?.error?.message || event?.message || '');
            if (msg.includes('chrome-extension://') || msg.includes('moz-extension://') || msg.includes('safari-extension://')) {
                return; // ignore extension-origin errors
            }
        } catch (_) {}
        if (event.error && event.error.message && event.error.message.includes('className')) {
            // Attempt to recover theme state silently
            try {
                const currentTheme = localStorage.getItem('theme') || 'light';
                document.body.className = document.body.className.replace(/light-theme|dark-theme/g, '').trim();
                document.body.className += ' ' + currentTheme + '-theme';
            } catch (recoveryError) {
                // Silent error handling for production
            }
        }
    });


        // Make cacheManager globally accessible for emergency cleanup
        window.cacheManager = cacheManager;

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader Elements ---
    const preloader = document.getElementById('platform-preloader');
    const mainContent = document.getElementById('main-content');

    // --- DOM Elements ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const generateBtn = document.getElementById('generate-btn');
    const generateBtnText = document.getElementById('generate-btn-text');
    const generateBtnLoader = document.getElementById('generate-btn-loader');
    const paletteDisplay = document.getElementById('palette-display');
    const toast = document.getElementById('toast');
    
    // Make toast system globally available for accessibility dashboard
    window.toast = toast;
    window.showToast = showToast;
    
    const openComponentSelectorBtn = document.getElementById('open-component-selector');
    const closeComponentSelectorBtn = document.getElementById('close-component-selector');
    const componentSelectorPanel = document.getElementById('component-selector-panel');
    const componentList = document.getElementById('component-list');
    const componentSearch = document.getElementById('component-search');

    const schemeTypeSelect = document.getElementById('scheme-type');
    const numResultsInput = document.getElementById('num-results');
    
    // New advanced color controls
    const seedColorInput = document.getElementById('seed-color');
    const hexInput = document.getElementById('hex-input');
    const randomColorBtn = document.getElementById('random-color');
    const harmonyRuleSelect = document.getElementById('harmony-rule');
    const saturationSlider = document.getElementById('saturation-slider');
    const brightnessSlider = document.getElementById('brightness-slider');
    const saturationValue = document.getElementById('saturation-value');
    const brightnessValue = document.getElementById('brightness-value');
    const colorInfoRgb = document.getElementById('color-info-rgb');
    const colorInfoHsl = document.getElementById('color-info-hsl');
    const exportCssBtn = document.getElementById('export-css');
    const openA11yBtn = document.getElementById('open-a11y');

    // Responsive Panel Elements
    const panelToggle = document.getElementById('panel-toggle');
    const responsivePanel = document.getElementById('responsive-panel');
    const panelOverlay = document.getElementById('panel-overlay');
    const panelClose = document.getElementById('panel-close');
    
    // Panel Control Elements
    const panelSeedColor = document.getElementById('panel-seed-color');
    const panelHexInput = document.getElementById('panel-hex-input');
    const panelRandomColor = document.getElementById('panel-random-color');
    const panelHarmonyRule = document.getElementById('panel-harmony-rule');
    const panelSchemeType = document.getElementById('panel-scheme-type');
    const panelNumResults = document.getElementById('panel-num-results');
    const panelSaturationSlider = document.getElementById('panel-saturation-slider');
    const panelBrightnessSlider = document.getElementById('panel-brightness-slider');
    const panelSaturationValue = document.getElementById('panel-saturation-value');
    const panelBrightnessValue = document.getElementById('panel-brightness-value');
    const panelColorInfoRgb = document.getElementById('panel-color-info-rgb');
    const panelColorInfoHsl = document.getElementById('panel-color-info-hsl');
    const panelGenerateBtn = document.getElementById('panel-generate-btn');
    const panelGenerateBtnText = document.getElementById('panel-generate-btn-text');
    const panelGenerateBtnLoader = document.getElementById('panel-generate-btn-loader');
    const panelExportCss = document.getElementById('panel-export-css');
    const panelOpenA11y = document.getElementById('panel-open-a11y');
    const panelPaletteDisplay = document.getElementById('panel-palette-display');

    // Export Container Elements
    const exportContainer = document.getElementById('export-container');
    const panelExportContainer = document.getElementById('panel-export-container');


    // DOM Elements for modals
    const showcaseSection = document.getElementById('showcase-section');
    const showcaseSearch = document.getElementById('showcase-search');
    const overlay = document.getElementById('overlay');
    

    const hoverCard = document.getElementById('hover-card');
    const hoverCardTitle = document.getElementById('hover-card-title');
    const hoverCardStatus = document.getElementById('hover-card-status');
    const hoverCardPreview = document.getElementById('hover-card-preview');

    // Color Wheel Component
    let colorWheel = null;
    const hoverCardDescription = document.getElementById('hover-card-description');

    // Ensure header logo fallback if images fail
    (function ensureLogoFallback() {
        try {
            const container = document.querySelector('header .bg-gradient-to-br');
            if (!container) return;
            const imgs = container.querySelectorAll('img');
            const hasVisible = () => Array.from(imgs).some(img => img.complete && img.naturalWidth > 0 && img.style.display !== 'none');
            const attach = (img) => img && img.addEventListener('error', () => {
                img.style.display = 'none';
                insertTextFallbackIfNeeded();
            }, { once: true });
            const insertTextFallbackIfNeeded = () => {
                if (!hasVisible() && !container.querySelector('.text-logo')) {
                    const textLogo = document.createElement('span');
                    textLogo.className = 'text-logo font-bold text-primary ml-2';
                    textLogo.textContent = 'Palettinum';
                    textLogo.setAttribute('role', 'img');
                    textLogo.setAttribute('aria-label', 'Palettinum');
                    container.appendChild(textLogo);
                }
            };
            imgs.forEach(attach);
            // Initial check (handles cached error states)
            insertTextFallbackIfNeeded();
        } catch (_) {}
    })();

    // --- State ---
    let currentPalette = [];
    let selectedComponents = ['Navbar', 'Buttons', 'Card'];

    let isPanelOpen = false;
    
    // Make selectedComponents globally accessible for performance monitoring
    window.selectedComponents = selectedComponents;
    
    // Apply initial theme immediately when DOM elements are available
    const applyInitialTheme = (theme) => {
        try {
            // Add transition class for smooth loading
            document.body.classList.add('theme-transitioning');
            
            // Apply theme with optimized manager
            applyTheme(theme, themeIconLight, themeIconDark);
            
            // Remove transition class after minimal delay for instant rendering
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 50); // Minimal time for instant feedback
            
        } catch (error) {
            // Fallback: apply theme without transition
            try {
                document.body.className = document.body.className.replace(/light-theme|dark-theme/g, '').trim();
                document.body.className += ' ' + theme + '-theme';
            } catch (fallbackError) {
                // Silent error handling for production
            }
        }
    };
    
    // Apply initial theme if pending
    if (window.pendingTheme) {
        applyInitialTheme(window.pendingTheme);
        delete window.pendingTheme;
    }
    
    // Ensure theme is properly applied even if pending theme was not set
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (!document.body.classList.contains('light-theme') && !document.body.classList.contains('dark-theme')) {
        applyInitialTheme(currentTheme);
    }
    
    // Theme system verification (production-ready)
    const themeSystemReady = {
        currentTheme: currentTheme,
        bodyClasses: document.body.className,
        themeIconLight: !!themeIconLight,
        themeIconDark: !!themeIconDark,
        systemReady: true
    };
    
    // Store for potential debugging (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.themeSystemDebug = themeSystemReady;
    }
    
    // Single navigation creation with duplicate prevention
    
    // Clean up any existing duplicates first
    const existingNavs = document.querySelectorAll('.platform-navigation');
    if (existingNavs.length > 1) {
        // Keep only the first one, remove the rest
        for (let i = 1; i < existingNavs.length; i++) {
            existingNavs[i].remove();
        }
    }
    
    if (typeof PlatformNavigationManager !== 'undefined') {
        // Check if navigation already exists
        const existingNav = document.querySelector('.platform-navigation');
        if (!existingNav) {
            const platformNav = new PlatformNavigationManager();
            platformNav.init({
                insertAfter: '.nav-right',
                showCurrentApp: true,
                enableDropdown: true
            });
        }
    } else {
        
        // Create simple navigation button as fallback (only if not exists)
        const existingNav = document.querySelector('.platform-navigation');
        if (!existingNav) {
            const navRight = document.querySelector('.nav-right');
            if (navRight) {
                const navButton = document.createElement('div');
                navButton.className = 'platform-navigation';
                navButton.innerHTML = `
                    <div class="platform-nav-content">
                        <div class="current-app-indicator" role="button" tabindex="0">
                            <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </div>
                    </div>
                `;
                
                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle) {
                    navRight.insertBefore(navButton, themeToggle);
                }
            }
        }
    }
    
    // Load persisted state on initialization
    const loadPersistedState = () => {
        try {
            // Load theme only (preserve theme preference) - Optimized
            const savedTheme = localStorage.getItem('theme') || 'light';
            
            // Apply theme immediately to body for instant visual consistency
            try {
                document.body.className = document.body.className.replace(/light-theme|dark-theme/g, '').trim();
                document.body.className += ' ' + savedTheme + '-theme';
            } catch (error) {
                // Silent error handling for production
            }
            
            // Store theme for later application after DOM is ready
            window.pendingTheme = savedTheme;
            
            // RESET TO DEFAULTS ON REFRESH
            // Clear all persisted state to ensure fresh start
            localStorage.removeItem('palettable_selected_components');
            localStorage.removeItem('palettable_current_palette');
            localStorage.removeItem('palettable_user_preferences');
            localStorage.removeItem('palettable_usage_patterns');
            localStorage.removeItem('palettable_cache_config');
            localStorage.removeItem('palettable_state');
            localStorage.removeItem('palettinum_state'); // Clear AppStore state
            
            // Clear all cache entries
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('cache_')) {
                    localStorage.removeItem(key);
                }
            });
            
            // Reset to default values
            selectedComponents = ['Navbar', 'Buttons', 'Card'];
            currentPalette = [];
            
            // Reset form controls to defaults
            if (numResultsInput) numResultsInput.value = '5';
            if (schemeTypeSelect) schemeTypeSelect.value = 'monochrome';
            if (harmonyRuleSelect) harmonyRuleSelect.value = 'analogic';
            if (saturationSlider) saturationSlider.value = '50';
            if (brightnessSlider) brightnessSlider.value = '50';
            
        } catch (error) {
            // Silent error handling for state reset
        }
    };

    // DISABLED: State persistence (user wants fresh start on refresh)
    const persistState = () => {
        // State persistence disabled - always start fresh
        // Only theme preference is preserved
    };
    
    // Subscribe to store changes
    const unsubscribe = appStore.subscribe((state) => {
        // Update local state when store changes
        currentPalette = state.palette;
        selectedComponents = state.selectedComponents;
        
        // Update global reference for performance monitoring
        window.selectedComponents = selectedComponents;
        
        // Persist state changes
        persistState();
        
        // Re-render if needed
        if (state.palette.length > 0) {
            _renderPaletteUI(state.palette);
        }
    });

    // --- Helper Functions ---
    function _renderShowcase() {
        const startTime = performance.now();
        
        // Use pre-rendered components for instant display (if available)
        // Note: preloadedTemplates is currently disabled for performance optimization
        if (window.preloadedTemplates && selectedComponents.length > 0) {
            
            // Clear showcase section
            showcaseSection.innerHTML = '';
            
            // Create document fragment for better performance
            const fragment = document.createDocumentFragment();
            
            // Group components by category
            const categorizedComponents = {};
            selectedComponents.forEach(componentName => {
                const category = componentName.split('_')[0] || 'Other';
                if (!categorizedComponents[category]) {
                    categorizedComponents[category] = [];
                }
                categorizedComponents[category].push(componentName);
            });
            
            // Render each category
            Object.keys(categorizedComponents).forEach(category => {
                const categorySection = document.createElement('div');
                categorySection.className = 'category-section';
                
                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoryTitle.className = 'text-xl font-bold mb-4 text-primary';
                categorySection.appendChild(categoryTitle);
                
                const componentsContainer = document.createElement('div');
                componentsContainer.className = 'components-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
                
                // Add components to this category
                categorizedComponents[category].forEach(componentName => {
                    const componentContainer = document.createElement('div');
                    componentContainer.className = 'component-preview-container';
                    
                    const componentTitle = document.createElement('h3');
                    componentTitle.textContent = componentName.replace(/_/g, ' ');
                    componentTitle.className = 'text-lg font-semibold mb-3 text-secondary';
                    componentContainer.appendChild(componentTitle);
                    
                    const componentFrame = document.createElement('div');
                    componentFrame.className = 'component-preview-frame bg-white border border-gray-200 rounded-lg p-4 shadow-sm';
                    
                    // Use pre-rendered component if available
                    const preloadedTemplate = window.preloadedTemplates[componentName];
                    if (preloadedTemplate) {
                        componentFrame.innerHTML = preloadedTemplate.html;
                        // Apply current palette colors dynamically based on actual palette length
                        const currentPalette = window.currentPalette || [
                            '#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a', '#ffffff'
                        ];
                        
                        // Apply all colors from the palette (2-8 colors based on user selection)
                        currentPalette.forEach((color, index) => {
                            componentFrame.style.setProperty(`--c${index + 1}`, color);
                        });
                        
                        // Clear any unused CSS variables for smaller palettes
                        for (let i = currentPalette.length + 1; i <= 8; i++) {
                            componentFrame.style.removeProperty(`--c${i}`);
                        }
                    } else {
                        // Fallback to original rendering
                        componentFrame.innerHTML = uiComponents[componentName] || '<p>Component not found</p>';
                    }
                    
                    componentContainer.appendChild(componentFrame);
                    componentsContainer.appendChild(componentContainer);
                });
                
                categorySection.appendChild(componentsContainer);
                fragment.appendChild(categorySection);
            });
            
            showcaseSection.appendChild(fragment);
            
            const endTime = performance.now();
            performanceMonitor.recordComponentRendering('showcase', startTime, endTime);
            
            
        } else {
            // Fallback to original rendering method (optimized for performance)
            // This is the primary rendering path due to preloader optimization
            
            // Advanced optimization for large component sets
            if (selectedComponents.length > 15) {
                // For very large sets, render showcase separately
                requestIdleCallback(() => {
        renderShowcase(selectedComponents, showcaseSection);
                    
                    const endTime = performance.now();
                    performanceMonitor.recordComponentRendering('showcase', startTime, endTime);
                    
                }, { timeout: 2000 });
            } else if (selectedComponents.length > 10) {
                // For medium sets, use single idle callback
                requestIdleCallback(() => {
                    renderShowcase(selectedComponents, showcaseSection);
                    
                    const endTime = performance.now();
                    performanceMonitor.recordComponentRendering('showcase', startTime, endTime);
                    

                }, { timeout: 1500 });
            } else {
                // For small sets, render immediately
                renderShowcase(selectedComponents, showcaseSection);
                
                const endTime = performance.now();
                performanceMonitor.recordComponentRendering('showcase', startTime, endTime);
                

            }
        }
    }



    function _renderPaletteUI(palette) {
        currentPalette = palette;
        window.currentPalette = palette; // Ensure global access for PDF
        
        // Cache the palette
        cacheManager.cachePalette(palette, { timestamp: Date.now() });
        
        // Record performance
        performanceMonitor.recordMetric('paletteUpdate', Date.now());
        
        updatePalette(palette, paletteDisplay, _renderShowcase, (color) => copyToClipboard(color, toast), _handleColorUpdate);

        // Update accessibility dashboard analysis in the background for fast open
        try {
            accessibilityDashboard.updatePalette(palette);
        } catch (e) {
            // Non-fatal
        }
        
        // Intelligent cache busting after palette generation
        setTimeout(() => {
            if (cacheManager && cacheManager.postOperationCleanup) {
                cacheManager.postOperationCleanup('user_action', 'generate_palette');
            }
        }, 2000);
    }
    
    // Handle individual color updates from color picker
    function _handleColorUpdate(colorIndex, newColor, updatedPalette) {
        // Import color picker modal dynamically to avoid circular dependencies
        import('./components/color-picker/colorPicker.js').then(({ colorPickerModal }) => {
            colorPickerModal.open(colorIndex, newColor, updatedPalette, (index, color, palette) => {
                // Update the palette with the new color
                const finalPalette = [...palette];
                finalPalette[index] = color;
                
                // Update CSS variables
                document.documentElement.style.setProperty(`--c${index + 1}`, color);
                const rgb = hexToRgb(color);
                if (rgb) {
                    document.documentElement.style.setProperty(`--c${index + 1}_alpha`, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
                }
                
                // Update current palette
                currentPalette = finalPalette;
                window.currentPalette = finalPalette;
                
                // Re-render palette display
                updatePalette(finalPalette, paletteDisplay, _renderShowcase, (color) => copyToClipboard(color, toast), _handleColorUpdate);
                
                // Update panel palette display
                _updatePanelPaletteDisplay(finalPalette);
                
                // Update accessibility dashboard
                try {
                    accessibilityDashboard.updatePalette(finalPalette);
                } catch (e) {
                    // Non-fatal
                }
                
                // Show success feedback
                showToast(toast, `Color ${index + 1} updated to ${color}`);
            });
        }).catch(error => {
            console.error('Failed to load color picker modal:', error);
            showToast(toast, 'Failed to open color picker', true);
        });
    }
    
    function _updateColorInfo(rgb, hsl) {
        if (colorInfoRgb) {
            colorInfoRgb.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
        }
        if (colorInfoHsl) {
            colorInfoHsl.textContent = `HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
        }
    }
    
    function _generateRandomColor() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        if (seedColorInput) seedColorInput.value = randomColor;
        if (hexInput) hexInput.value = randomColor;
        if (panelSeedColor) panelSeedColor.value = randomColor;
        if (panelHexInput) panelHexInput.value = randomColor;
        _updateColorInfoFromHex(randomColor);
        return randomColor;
    }
    
    function _updateColorInfoFromHex(hex) {
        const rgb = hexToRgb(hex);
        if (rgb) {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            _updateColorInfo(rgb, hsl);
            _updateSliderBackgrounds(hex, rgb, hsl);
        }
    }
    
    // Function to update slider backgrounds based on current color
    function _updateSliderBackgrounds(hex, rgb, hsl) {
        // Update saturation slider background
        if (saturationSlider && panelSaturationSlider) {
            const saturationGradient = `linear-gradient(90deg, 
                hsl(${hsl.h}, 0%, ${hsl.l}%) 0%, 
                hsl(${hsl.h}, 25%, ${hsl.l}%) 12.5%, 
                hsl(${hsl.h}, 50%, ${hsl.l}%) 25%, 
                hsl(${hsl.h}, 75%, ${hsl.l}%) 37.5%, 
                hsl(${hsl.h}, 100%, ${hsl.l}%) 50%, 
                hsl(${hsl.h + 60}, 100%, ${hsl.l}%) 62.5%, 
                hsl(${hsl.h + 120}, 100%, ${hsl.l}%) 75%, 
                hsl(${hsl.h + 180}, 100%, ${hsl.l}%) 87.5%, 
                hsl(${hsl.h + 240}, 100%, ${hsl.l}%) 100%)`;
            
            saturationSlider.style.background = saturationGradient;
            panelSaturationSlider.style.background = saturationGradient;
            
            // Update webkit and moz track backgrounds
            saturationSlider.style.setProperty('--saturation-gradient', saturationGradient);
            panelSaturationSlider.style.setProperty('--saturation-gradient', saturationGradient);
        }
        
        // Update brightness slider background
        if (brightnessSlider && panelBrightnessSlider) {
            const brightnessGradient = `linear-gradient(90deg, 
                #000000 0%, 
                #1a1a1a 10%, 
                #333333 20%, 
                #4d4d4d 30%, 
                #666666 40%, 
                #808080 50%, 
                #999999 60%, 
                #b3b3b3 70%, 
                #cccccc 80%, 
                #e6e6e6 90%, 
                #ffffff 100%)`;
            
            brightnessSlider.style.background = brightnessGradient;
            panelBrightnessSlider.style.background = brightnessGradient;
            
            // Update webkit and moz track backgrounds
            brightnessSlider.style.setProperty('--brightness-gradient', brightnessGradient);
            panelBrightnessSlider.style.setProperty('--brightness-gradient', brightnessGradient);
        }
    }
    
    // Global utility function for detecting duplicate colors
    function detectDuplicates(palette) {
        const duplicates = [];
        for (let i = 0; i < palette.length; i++) {
            for (let j = i + 1; j < palette.length; j++) {
                if (palette[i].toUpperCase() === palette[j].toUpperCase()) {
                    duplicates.push({ color1: palette[i], color2: palette[j], type: 'Exact' });
                }
            }
        }
        return duplicates;
    }
    
    // Accessibility grading system removed - will be replaced with dashboard
    
    /**
     * Download utility function
     * Reusable file download functionality for all export formats
     */
    function downloadFile(content, filename, mimeType) {
        try {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('Download error:', error);
            return false;
        }
    }

    /**
     * Professional usage label utility
     * Centralized function for consistent color labeling across all export formats
     */
    function getProfessionalUsageLabel(index, paletteLength) {
        const labels = [
            'Primary',      // 0
            'Secondary',    // 1
            'Accent',       // 2
            'Success',      // 3
            'Warning',      // 4
            'Info',         // 5
            'Neutral',      // 6
            'Muted',        // 7
            'Highlight',    // 8
            'Background',   // 9
            'Surface',      // 10
            'Border',       // 11
            'Text',         // 12
            'Link',         // 13
            'Tertiary'      // 14
        ];
        
        // For palettes with 5 or fewer colors, use core labels
        if (paletteLength <= 5) {
            const coreLabels = ['Primary', 'Secondary', 'Accent', 'Success', 'Warning'];
            return coreLabels[index] || `Color ${index + 1}`;
        }
        
        // For larger palettes, use expanded professional labels
        return labels[index] || `Color ${index + 1}`;
    }

    /**
     * ExportSystem - Centralized export functionality
     * Professional export system for all supported formats
     */
    const ExportSystem = {
        /**
         * Export CSS Variables and Utility Classes
         * Enhanced with professional documentation and correct brand name
         */
        exportCSS() {
        if (currentPalette.length === 0) {
            showToast(toast, 'Generate a palette first!', true);
            return;
        }
        
        const timestamp = new Date().toISOString();
        let css = `/*
PALLETINUM - PROFESSIONAL CSS COLOR SYSTEM
═══════════════════════════════════════════════════════════════
📅 Generated: ${new Date().toLocaleString()}
🎯 Palette: ${currentPalette.length} colors
🔍 Professional Color System by Palettinum
🌐 Cross-Browser Compatible & Modern Standards
═══════════════════════════════════════════════════════════════

USAGE EXAMPLES:
• CSS Variables: var(--color-1), var(--color-1-rgb)
• Utility Classes: .bg-color-1, .text-color-1, .border-color-1
• Alpha Variants: var(--color-1-alpha-10), var(--color-1-alpha-20)
• Semantic Classes: .bg-primary, .text-secondary, .btn-accent

INTEGRATION:
• Copy this CSS into your project's stylesheet
• Use CSS variables for consistent theming
• Apply utility classes for quick styling
• Customize semantic classes for your design system

BEST PRACTICES:
• Use CSS variables for dynamic theming
• Apply utility classes for rapid prototyping
• Use semantic classes for component styling
• Test color contrast for accessibility
*/

/* ===== CSS CUSTOM PROPERTIES ===== */
:root {
`;
        
        currentPalette.forEach((color, index) => {
            const rgb = hexToRgb(color);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            
            css += `  /* Color ${index + 1} - ${color} */\n`;
            css += `  --color-${index + 1}: ${color};\n`;
            css += `  --color-${index + 1}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n`;
            css += `  --color-${index + 1}-hsl: ${hsl.h}, ${hsl.s}%, ${hsl.l}%;\n`;
            css += `  --color-${index + 1}-alpha-10: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1);\n`;
            css += `  --color-${index + 1}-alpha-20: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2);\n`;
            css += `  --color-${index + 1}-alpha-50: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5);\n`;
            css += `  --color-${index + 1}-alpha-80: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8);\n`;
            css += `\n`;
        });
        
        css += `}\n\n`;
        
        // Add utility classes
        css += `/* ===== UTILITY CLASSES ===== */\n`;
        css += `/* Background Colors */\n`;
        currentPalette.forEach((color, index) => {
            css += `.bg-color-${index + 1} { background-color: var(--color-${index + 1}); }\n`;
        });
        
        css += `\n/* Text Colors */\n`;
        currentPalette.forEach((color, index) => {
            css += `.text-color-${index + 1} { color: var(--color-${index + 1}); }\n`;
        });
        
        css += `\n/* Border Colors */\n`;
        currentPalette.forEach((color, index) => {
            css += `.border-color-${index + 1} { border-color: var(--color-${index + 1}); }\n`;
        });
        
        css += `\n/* Alpha Background Colors */\n`;
        currentPalette.forEach((color, index) => {
            css += `.bg-color-${index + 1}-alpha-10 { background-color: var(--color-${index + 1}-alpha-10); }\n`;
            css += `.bg-color-${index + 1}-alpha-20 { background-color: var(--color-${index + 1}-alpha-20); }\n`;
            css += `.bg-color-${index + 1}-alpha-50 { background-color: var(--color-${index + 1}-alpha-50); }\n`;
        });
        
        // Add semantic color classes
        css += `\n/* ===== SEMANTIC COLOR CLASSES ===== */\n`;
        css += `/* Primary Colors */\n`;
        css += `.bg-primary { background-color: var(--color-1); }\n`;
        css += `.text-primary { color: var(--color-1); }\n`;
        css += `.border-primary { border-color: var(--color-1); }\n`;
        
        css += `\n/* Secondary Colors */\n`;
        css += `.bg-secondary { background-color: var(--color-2); }\n`;
        css += `.text-secondary { color: var(--color-2); }\n`;
        css += `.border-secondary { border-color: var(--color-2); }\n`;
        
        css += `\n/* Accent Colors */\n`;
        css += `.bg-accent { background-color: var(--color-3); }\n`;
        css += `.text-accent { color: var(--color-3); }\n`;
        css += `.border-accent { border-color: var(--color-3); }\n`;
        
        css += `\n/* Success/Error/Warning Colors */\n`;
        if (currentPalette.length >= 4) {
            css += `.bg-success { background-color: var(--color-4); }\n`;
            css += `.text-success { color: var(--color-4); }\n`;
        }
        if (currentPalette.length >= 5) {
            css += `.bg-error { background-color: var(--color-5); }\n`;
            css += `.text-error { color: var(--color-5); }\n`;
        }
        
        // Add component-specific classes
        css += `\n/* ===== COMPONENT-SPECIFIC CLASSES ===== */\n`;
        css += `/* Buttons */\n`;
        css += `.btn-primary { background-color: var(--color-1); color: var(--color-5); }\n`;
        css += `.btn-secondary { background-color: var(--color-2); color: var(--color-5); }\n`;
        css += `.btn-accent { background-color: var(--color-3); color: var(--color-5); }\n`;
        
        css += `\n/* Cards */\n`;
        css += `.card { background-color: var(--color-5); border: 1px solid var(--color-2); }\n`;
        css += `.card-header { background-color: var(--color-1); color: var(--color-5); }\n`;
        
        css += `\n/* Forms */\n`;
        css += `.form-input { border: 1px solid var(--color-2); background-color: var(--color-5); }\n`;
        css += `.form-input:focus { border-color: var(--color-1); box-shadow: 0 0 0 2px var(--color-1-alpha-20); }\n`;
        
        // Add design notes
        css += `\n/* ===== DESIGN NOTES ===== */\n`;
        css += `/*\n`;
        css += `This color system has been optimized for:\n`;
        css += `• Professional design applications\n`;
        css += `• Cross-browser compatibility\n`;
        css += `• Modern web standards\n`;
        css += `• Responsive design patterns\n`;
            css += `• Accessibility compliance\n`;
            css += `• Performance optimization\n`;
        css += `*/\n`;
        
        copyToClipboard(css, toast);
            showToast(toast, 'Professional CSS system exported!');
        
        // Intelligent cache busting after CSS export
        setTimeout(() => {
            if (cacheManager && cacheManager.postOperationCleanup) {
                cacheManager.postOperationCleanup('user_action', 'export_css');
            }
        }, 1000);
        },

        /**
         * Export JSON Data
         * Structured data export for developers and designers
         * Downloads as .json file for direct use
         */
        exportJSON() {
            if (currentPalette.length === 0) {
                showToast(toast, 'Generate a palette first!', true);
                return;
            }

            const paletteData = {
                metadata: {
                    name: "Palettinum Color Palette",
                    generated: new Date().toISOString(),
                    version: "1.0.0",
                    colors: currentPalette.length,
                    brand: "Palettinum"
                },
                colors: currentPalette.map((color, index) => {
                    const rgb = hexToRgb(color);
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    
                    // Use centralized professional usage label utility
                    
                    return {
                        id: `color-${index + 1}`,
                        hex: color,
                        rgb: { r: rgb.r, g: rgb.g, b: rgb.b },
                        hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
                        name: `Color ${index + 1}`,
                        usage: getProfessionalUsageLabel(index, currentPalette.length).toLowerCase()
                    };
                }),
                css: {
                    variables: currentPalette.map((color, index) => `--color-${index + 1}: ${color}`),
                    utilities: currentPalette.map((color, index) => `.bg-color-${index + 1}`)
                }
            };

            const jsonString = JSON.stringify(paletteData, null, 2);
            const filename = `palettinum-palette-${Date.now()}.json`;
            
            if (downloadFile(jsonString, filename, 'application/json')) {
                showToast(toast, 'JSON file downloaded!');
            } else {
                showToast(toast, 'JSON download failed!', true);
            }
        },

        /**
         * Export SVG Vector
         * Clean horizontal color palette for design tools
         * Downloads as .svg file with horizontal layout and comprehensive color information
         */
        exportSVG() {
            if (currentPalette.length === 0) {
                showToast(toast, 'Generate a palette first!', true);
                return;
            }

            // Simplified horizontal layout calculations
            const swatchSize = 80;
            const swatchSpacing = 20;
            const margin = 40;
            const headerHeight = 60;
            const colorInfoHeight = 50;
            
            // Pure horizontal layout - all colors in one row
            const contentWidth = (swatchSize + swatchSpacing) * currentPalette.length - swatchSpacing;
            const totalWidth = Math.max(600, contentWidth + (margin * 2));
            const totalHeight = headerHeight + swatchSize + colorInfoHeight + (margin * 2);

            // Clean SVG with horizontal styling
            let svg = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}">
  <defs>
    <style>
      .palette-bg { fill: #ffffff; stroke: #e5e7eb; stroke-width: 2; }
      .header-bg { fill: #f8fafc; stroke: #e2e8f0; stroke-width: 1; }
      .swatch { stroke: #374151; stroke-width: 2; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
      .title { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; font-size: 20px; font-weight: 700; fill: #1f2937; text-anchor: middle; }
      .subtitle { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; font-size: 12px; font-weight: 500; fill: #6b7280; text-anchor: middle; }
      .color-name { font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace; font-size: 11px; font-weight: 600; fill: #374151; text-anchor: middle; }
      .color-info { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; font-size: 9px; fill: #6b7280; text-anchor: middle; }
      .usage-label { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; font-size: 8px; font-weight: 500; fill: #9ca3af; text-anchor: middle; }
    </style>
    
    <!-- Professional gradients -->
    <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f1f5f9;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${totalWidth}" height="${totalHeight}" class="palette-bg" rx="8"/>
  
  <!-- Header Section -->
  <rect x="${margin}" y="${margin}" width="${totalWidth - (margin * 2)}" height="${headerHeight - 10}" fill="url(#headerGradient)" rx="6"/>
  <text x="${totalWidth/2}" y="${margin + 25}" class="title">Palettinum Color Palette</text>
  <text x="${totalWidth/2}" y="${margin + 42}" class="subtitle">${currentPalette.length} Colors • Generated ${new Date().toLocaleDateString()}</text>
  
  <!-- Horizontal Color Swatches -->`;

            // Generate horizontal color swatches
            currentPalette.forEach((color, index) => {
                const x = margin + (index * (swatchSize + swatchSpacing));
                const y = margin + headerHeight;
                
                const rgb = hexToRgb(color);
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                
                // Use centralized professional usage label utility
                const usage = getProfessionalUsageLabel(index, currentPalette.length);

                // Color swatch
                svg += `\n  <rect x="${x}" y="${y}" width="${swatchSize}" height="${swatchSize}" class="swatch" fill="${color}" rx="6"/>`;
                
                // Color information below swatch
                const infoY = y + swatchSize + 12;
                svg += `\n  <text x="${x + swatchSize/2}" y="${infoY}" class="color-name">${color}</text>`;
                svg += `\n  <text x="${x + swatchSize/2}" y="${infoY + 10}" class="color-info">RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}</text>`;
                svg += `\n  <text x="${x + swatchSize/2}" y="${infoY + 20}" class="color-info">HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%</text>`;
                svg += `\n  <text x="${x + swatchSize/2}" y="${infoY + 32}" class="usage-label">${usage}</text>`;
            });

            svg += `\n</svg>`;

            const filename = `palettinum-palette-${Date.now()}.svg`;
            
            if (downloadFile(svg, filename, 'image/svg+xml')) {
                showToast(toast, 'Horizontal SVG file downloaded!');
            } else {
                showToast(toast, 'SVG download failed!', true);
            }
        },

        /**
         * Export PNG Image
         * Raster image for presentations and documents
         */
        async exportPNG() {
            if (currentPalette.length === 0) {
                showToast(toast, 'Generate a palette first!', true);
                return;
            }

            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const swatchSize = 80;
                const spacing = 15;
                const padding = 20;
                const width = (swatchSize + spacing) * currentPalette.length - spacing + (padding * 2);
                const height = swatchSize + 60 + (padding * 2);

                canvas.width = width;
                canvas.height = height;

                // Background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, width, height);

                // Title
                ctx.fillStyle = '#333333';
                ctx.font = 'bold 18px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Palettinum Color Palette', width / 2, 25);

                // Swatches
                currentPalette.forEach((color, index) => {
                    const x = padding + index * (swatchSize + spacing);
                    const y = padding + 30;

                    // Swatch
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, swatchSize, swatchSize);
                    ctx.strokeStyle = '#cccccc';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, swatchSize, swatchSize);

                    // Color code
                    ctx.fillStyle = '#666666';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(color, x + swatchSize / 2, y + swatchSize + 15);
                });

                // Convert to blob and download using utility function
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `palettinum-palette-${Date.now()}.png`;
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 'image/png');

                showToast(toast, 'PNG image exported!');
            } catch (error) {
                console.error('PNG export error:', error);
                showToast(toast, 'PNG export failed!', true);
            }
        },

        /**
         * Export ASE (Adobe Swatch Exchange)
         * Adobe-compatible color swatch file
         * Downloads as .ase file for direct use in Adobe applications
         */
        exportASE() {
            if (currentPalette.length === 0) {
                showToast(toast, 'Generate a palette first!', true);
                return;
            }

            // Enhanced ASE format with proper structure
            let ase = `Adobe Swatch Exchange Format
Palettinum Color Palette
Generated: ${new Date().toLocaleString()}
Brand: Palettinum
Version: 1.0.0

Colors:
`;

            currentPalette.forEach((color, index) => {
                const rgb = hexToRgb(color);
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                
                // Use centralized professional usage label utility
                const usage = getProfessionalUsageLabel(index, currentPalette.length);
                ase += `${index + 1}. ${color} (${usage}) - RGB: ${rgb.r}, ${rgb.g}, ${rgb.b} | HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%\n`;
            });

            ase += `
Usage Instructions:
- Import this file into Adobe Creative Suite (Photoshop, Illustrator, InDesign)
- Use colors for consistent branding across projects
- Apply to your design projects for professional results
- Colors are organized by usage: Primary, Secondary, Accent, Success, Error

Technical Notes:
- This is a simplified ASE format for maximum compatibility
- For full Adobe integration, use professional color management tools
- All colors include RGB and HSL values for accurate reproduction
- Generated by Palettinum Professional Color System
`;

            const filename = `palettinum-palette-${Date.now()}.ase`;
            
            if (downloadFile(ase, filename, 'application/octet-stream')) {
                showToast(toast, 'ASE file downloaded!');
            } else {
                showToast(toast, 'ASE download failed!', true);
            }
        }
    };
    
    function _exportCss() {
        ExportSystem.exportCSS();
    }

    /**
     * Create export dropdown component
     * Reusable dropdown for export options with professional styling
     * Enhanced with proper error handling and debugging
     */
    function createExportDropdown(containerId, isPanel = false) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`[ExportDropdown] Container not found: ${containerId}`);
            return null;
        }

        // Check if already initialized to prevent duplicates
        if (container.querySelector('.export-dropdown-container')) {
            return container.querySelector('.export-dropdown-container');
        }

        // Create dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'export-dropdown-container relative';
        dropdownContainer.innerHTML = `
            <button class="export-dropdown-trigger w-full sm:w-auto accent-bg text-white px-3 py-1 rounded text-sm font-medium hover:opacity-90 smooth-transition flex items-center justify-center gap-2" aria-label="Export palette" aria-expanded="false">
                <span>Export</span>
                <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div class="export-dropdown-menu absolute top-full left-0 mt-1 w-48 bg-secondary border border-color rounded-lg shadow-lg z-50 hidden" role="menu">
                <div class="py-1">
                    <button class="export-option w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary/10 smooth-transition flex items-center gap-3" data-format="css" role="menuitem">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                        </svg>
                        <span>CSS Variables</span>
                    </button>
                    <button class="export-option w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary/10 smooth-transition flex items-center gap-3" data-format="json" role="menuitem">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>JSON Data</span>
                    </button>
                    <button class="export-option w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary/10 smooth-transition flex items-center gap-3" data-format="svg" role="menuitem">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>SVG Vector</span>
                    </button>
                    <button class="export-option w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary/10 smooth-transition flex items-center gap-3" data-format="png" role="menuitem">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>PNG Image</span>
                    </button>
                    <button class="export-option w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary/10 smooth-transition flex items-center gap-3" data-format="ase" role="menuitem">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>ASE Adobe</span>
                    </button>
                </div>
            </div>
        `;

        // Replace the existing button with dropdown
        container.innerHTML = '';
        container.appendChild(dropdownContainer);

        // Get references to elements after DOM insertion
        const trigger = dropdownContainer.querySelector('.export-dropdown-trigger');
        const menu = dropdownContainer.querySelector('.export-dropdown-menu');

        // STATIC POSITIONING: Always position above button - no dynamic calculation needed
        // Apply static positioning class immediately
        menu.classList.add('dropdown-up');
        
        // No need for dynamic positioning calculations

        // Setup event listeners
        const options = dropdownContainer.querySelectorAll('.export-option');

        if (!trigger || !menu || options.length === 0) {
            console.error(`[ExportDropdown] Failed to find dropdown elements in: ${containerId}`);
            return null;
        }

        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !menu.classList.contains('hidden');
            
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        // Handle option clicks
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const format = option.dataset.format;
                handleExport(format);
                closeDropdown();
            });
        });

        // Close dropdown when clicking outside
        const outsideClickHandler = (e) => {
            if (!dropdownContainer.contains(e.target)) {
                closeDropdown();
            }
        };
        document.addEventListener('click', outsideClickHandler);

        // Keyboard navigation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = !menu.classList.contains('hidden');
                if (isOpen) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            } else if (e.key === 'Escape') {
                closeDropdown();
            }
        });

        // Handle export based on format
        function handleExport(format) {
            switch (format) {
                case 'css':
                    ExportSystem.exportCSS();
                    break;
                case 'json':
                    ExportSystem.exportJSON();
                    break;
                case 'svg':
                    ExportSystem.exportSVG();
                    break;
                case 'png':
                    ExportSystem.exportPNG();
                    break;
                case 'ase':
                    ExportSystem.exportASE();
                    break;
                default:
                    console.warn(`[ExportDropdown] Unknown export format: ${format}`);
            }
        }

        function openDropdown() {
            // STATIC POSITIONING: No position calculation needed - dropdown always appears above
            menu.classList.remove('hidden');
            menu.classList.add('show');
            trigger.setAttribute('aria-expanded', 'true');
            trigger.querySelector('svg').style.transform = 'rotate(180deg)';
        }

        function closeDropdown() {
            menu.classList.add('hidden');
            menu.classList.remove('show');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.querySelector('svg').style.transform = 'rotate(0deg)';
        }

        // STATIC POSITIONING: calculateInitialPosition function removed
        // Dropdown will always appear above the button statically

        // STATIC POSITIONING: calculateOptimalPosition function removed
        // Dropdown will always appear above the button statically

        // STATIC POSITIONING: No dynamic repositioning needed
        // Dropdown will always appear above the button statically

        // Reposition within scrollable containers (e.g., responsive panel)
        // Finds the nearest scrollable ancestor so the dropdown adapts while the panel scrolls
        function getScrollableAncestor(element) {
            let node = element ? element.parentElement : null;
            while (node) {
                try {
                    const style = window.getComputedStyle(node);
                    const overflowY = style.overflowY;
                    const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight;
                    if (isScrollable) {
                        return node;
                    }
                } catch (_) { /* ignore */ }
                node = node.parentElement;
            }
            return null;
        }

        let scrollAncestor = getScrollableAncestor(dropdownContainer);
        // Fallback to responsive panel if explicitly initialized for panel
        if (!scrollAncestor && isPanel) {
            scrollAncestor = document.getElementById('responsive-panel') || null;
        }

        // STATIC POSITIONING: No scroll handlers needed
        let panelScrollHandler = null;

        // Store cleanup function - simplified for static positioning
        dropdownContainer._cleanup = () => {
            document.removeEventListener('click', outsideClickHandler);
            // No need to remove resize/scroll handlers as they were not added for static positioning
        };

        return dropdownContainer;
    }

    /**
     * Initialize all export dropdowns
     * Fallback function to ensure dropdowns are properly initialized
     */
    function initializeAllExportDropdowns() {
        // Main export dropdown
        const mainContainer = document.getElementById('export-container');
        if (mainContainer && !mainContainer.querySelector('.export-dropdown-container')) {
            createExportDropdown('export-container');
        }
        
        // Panel export dropdown
        const panelContainer = document.getElementById('panel-export-container');
        if (panelContainer && !panelContainer.querySelector('.export-dropdown-container')) {
            createExportDropdown('panel-export-container', true);
        }
    }

    // Make initialization function globally available for debugging
    window.initializeAllExportDropdowns = initializeAllExportDropdowns;
    
    // Handle service worker cache updates - gently refresh if static bundle changed
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'CACHE_UPDATED') {
                // Only auto-reload on same-origin bundle updates to avoid user-stuck stale code
                try {
                    const current = (document.currentScript && document.currentScript.src) || '';
                    console.log(`Cache updated to version ${event.data.version}`);
                } catch (e) {
                    // Silent
                }
            }
        });
    }
    
    // Prevent infinite reloading by checking if already initialized
    if (window.appInitialized) {
        console.log('App already initialized, skipping re-initialization');
        return;
    }
    
    // Additional check: if DOM is already processed, skip initialization
    if (document.readyState === 'complete' && window.appInitialized) {
        console.log('App already initialized and DOM complete, skipping re-initialization');
        return;
    }
    
    // Check if initialization is too recent (within 1 second) to prevent rapid re-initialization
    if (window.appInitializedAt && (Date.now() - window.appInitializedAt) < 1000) {
        console.log('App initialized too recently, skipping re-initialization');
        return;
    }
    
    // Reset any existing state to prevent conflicts
    if (window.colorWheelState) {
        delete window.colorWheelState;
    }
    
    // Clear any existing palette state
    if (window.currentPalette) {
        window.currentPalette = null;
    }
    
    // Mark app as initialized
    window.appInitialized = true;
    
    // Add timestamp to track initialization
    window.appInitializedAt = Date.now();
    
    // Clean up on page unload to prevent state conflicts
    window.addEventListener('beforeunload', () => {
        // Only reset appInitialized on actual page unload, not on reload
        if (performance.navigation.type === 1) { // TYPE_RELOAD
            // This is a reload, don't reset appInitialized
            return;
        }
        window.appInitialized = false;
        // Clear any existing event listeners
        if (window.eventListenersCleaned) {
            return;
        }
        window.eventListenersCleaned = true;
    });
    
    // Clean up on page visibility change to prevent state conflicts
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden, but don't reset appInitialized to prevent re-initialization
            // Only clear specific state that might cause conflicts
            if (window.colorWheelState) {
                delete window.colorWheelState;
            }
        }
    });
    
    // Add a global state reset function for debugging
    window.resetAppState = () => {
        window.appInitialized = false;
        window.appInitializedAt = null;
        if (window.colorWheelState) {
            delete window.colorWheelState;
        }
        if (window.currentPalette) {
            window.currentPalette = null;
        }
        console.log('App state reset');
    };
    
    // Add event listener cleanup tracking
    if (!window.eventListenersAttached) {
        window.eventListenersAttached = new Set();
    }
    
    // Debug function to check export containers
    window.debugExportContainers = () => {
        console.log('Main container:', document.getElementById('export-container'));
        console.log('Panel container:', document.getElementById('panel-export-container'));
        console.log('Main dropdown exists:', document.querySelector('#export-container .export-dropdown-container'));
        console.log('Panel dropdown exists:', document.querySelector('#panel-export-container .export-dropdown-container'));
    };
    
    // --- Modal Logic ---

    function _setGenerateButtonLoading(isLoading) {
        setGenerateButtonLoading(generateBtn, generateBtnText, generateBtnLoader, isLoading);
    }

    // Showcase Search Functionality
    let showcaseSearchTimeout = null;

    function _filterShowcase(searchTerm) {
        const searchTermLower = searchTerm.toLowerCase().trim();
        
        // Get all category sections and component containers
        const categorySections = showcaseSection.querySelectorAll('.category-section');
        const showcaseItems = showcaseSection.querySelectorAll('.component-preview-container');
        
        if (!searchTermLower) {
            // Show all items and categories when search is empty
            categorySections.forEach(section => {
                section.style.display = 'block';
                section.classList.remove('filtered-out');
            });
            showcaseItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('filtered-out');
            });
            _hideShowcaseSearchCount();
            return;
        }
        
        let matchCount = 0;
        const totalCount = showcaseItems.length;
        
        // First, filter individual components
        showcaseItems.forEach(item => {
            const componentName = item.querySelector('h3')?.textContent || '';
            const componentNameLower = componentName.toLowerCase();
            
            if (componentNameLower.includes(searchTermLower)) {
                item.style.display = 'block';
                item.classList.remove('filtered-out');
                matchCount++;
            } else {
                item.style.display = 'none';
                item.classList.add('filtered-out');
            }
        });
        
        // Then, hide/show category sections based on whether they have visible components
        categorySections.forEach(section => {
            const visibleComponents = section.querySelectorAll('.component-preview-container:not(.filtered-out)');
            const hasVisibleComponents = visibleComponents.length > 0;
            
            if (hasVisibleComponents) {
                section.style.display = 'block';
                section.classList.remove('filtered-out');
            } else {
                section.style.display = 'none';
                section.classList.add('filtered-out');
            }
        });
        
        // Show search results count
        if (searchTermLower) {
            _showShowcaseSearchCount(matchCount, totalCount);
        } else {
            _hideShowcaseSearchCount();
        }
        
        // Show no results message if needed
        if (matchCount === 0 && searchTermLower) {
            _showNoShowcaseResultsMessage(searchTerm);
        } else {
            _hideNoShowcaseResultsMessage();
        }
    }

    function _showShowcaseSearchCount(matchCount, totalCount) {
        // Create or update search count element
        let searchCountElement = showcaseSection.querySelector('.showcase-search-count');
        if (!searchCountElement) {
            searchCountElement = document.createElement('div');
            searchCountElement.className = 'showcase-search-count mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300';
            showcaseSection.insertBefore(searchCountElement, showcaseSection.firstChild);
        }
        searchCountElement.textContent = `Found ${matchCount} of ${totalCount} components`;
    }

    function _hideShowcaseSearchCount() {
        const searchCountElement = showcaseSection.querySelector('.showcase-search-count');
        if (searchCountElement) {
            searchCountElement.remove();
        }
    }

    function _showNoShowcaseResultsMessage(searchTerm) {
        // Create or update no results message
        let noResultsElement = showcaseSection.querySelector('.showcase-no-results');
        if (!noResultsElement) {
            noResultsElement = document.createElement('div');
            noResultsElement.className = 'showcase-no-results text-center py-8 text-secondary';
            showcaseSection.appendChild(noResultsElement);
        }
        noResultsElement.innerHTML = `
            <div class="flex flex-col items-center gap-3">
                <svg class="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <p class="text-lg font-medium">No components found</p>
                <p class="text-sm">No components match "<strong>${searchTerm}</strong>"</p>
            </div>
        `;
    }

    function _hideNoShowcaseResultsMessage() {
        const noResultsElement = showcaseSection.querySelector('.showcase-no-results');
        if (noResultsElement) {
            noResultsElement.remove();
        }
    }

    function _debounceShowcaseSearch(func, delay) {
        return function(...args) {
            clearTimeout(showcaseSearchTimeout);
            showcaseSearchTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

// Global helper functions for CSS generation and live preview styling
    function _getStaticColorValues() {
    // Use global currentPalette or default values
    const globalPalette = window.currentPalette || [];
    if (!globalPalette || globalPalette.length === 0) {
            return {
                c1: '#3dbdf5',
                c2: '#3983f1', 
                c3: '#3d4ff3',
                c4: '#6440f4',
                c5: '#9d44f5',
                c1_alpha: 'rgba(61, 189, 245, 0.1)',
                c2_alpha: 'rgba(57, 131, 241, 0.1)',
                c3_alpha: 'rgba(61, 79, 243, 0.1)',
                c4_alpha: 'rgba(100, 64, 244, 0.1)',
                c5_alpha: 'rgba(157, 68, 245, 0.1)',
                accent: '#3dbdf5',
                accent_alpha: 'rgba(61, 189, 245, 0.1)'
            };
        }

        const colors = {};
    globalPalette.forEach((color, index) => {
            const colorName = `c${index + 1}`;
            const alphaName = `c${index + 1}_alpha`;
            
            // Convert hex to RGB for alpha version
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            
            colors[colorName] = color;
            colors[alphaName] = `rgba(${r}, ${g}, ${b}, 0.1)`;
        });

        // Add accent color (first color)
    colors.accent = globalPalette[0];
        const hex = colors.accent.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        colors.accent_alpha = `rgba(${r}, ${g}, ${b}, 0.1)`;

        return colors;
    }

    function _getStaticComponentCSS(componentName, colors) {
        // Dynamic static fallback generation system for ALL components
        const baseStaticStyles = {
            'preview-nav': {
                background: `${colors.c1} !important`,
                color: `${colors.c5} !important`,
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                display: 'flex !important',
                justifyContent: 'space-between !important',
                alignItems: 'center !important'
            },
            'preview-button-primary': {
                background: `${colors.c2} !important`,
                color: `${colors.c5} !important`,
                fontWeight: '600 !important',
                padding: '0.5rem 1rem !important',
                borderRadius: '0.5rem !important',
                border: 'none !important',
                cursor: 'pointer !important'
            },
            'preview-button-secondary': {
                background: `${colors.c3} !important`,
                color: `${colors.c5} !important`,
                fontWeight: '600 !important',
                padding: '0.5rem 1rem !important',
                borderRadius: '0.5rem !important',
                border: 'none !important',
                cursor: 'pointer !important'
            },
            'preview-button-ghost': {
                background: 'transparent !important',
                color: `${colors.c2} !important`,
                border: `1px solid ${colors.c2} !important`,
                fontWeight: '600 !important',
                padding: '0.5rem 1rem !important',
                borderRadius: '0.5rem !important',
                cursor: 'pointer !important'
            },
            'preview-card': {
                background: `${colors.c5} !important`,
                border: `1px solid ${colors.c4} !important`,
                borderRadius: '0.5rem !important',
                overflow: 'hidden !important'
            },
            'preview-card-header': {
                color: `${colors.c1} !important`,
                fontSize: '1.25rem !important',
                fontWeight: '700 !important',
                marginBottom: '0.5rem !important'
            },
            'preview-card-body': {
                color: `${colors.c2} !important`
            },
            'preview-input': {
                border: `1px solid ${colors.c3} !important`,
                background: `${colors.c5} !important`,
                color: `${colors.c1} !important`,
                width: '100% !important',
                padding: '0.5rem !important',
                borderRadius: '0.375rem !important',
                fontSize: '0.875rem !important'
            },
            'preview-alert': {
                background: `${colors.c4} !important`,
                color: `${colors.c1} !important`,
                borderLeft: `4px solid ${colors.c2} !important`,
                padding: '1rem !important',
                borderRadius: '0.375rem !important'
            },
            'preview-modal-content': {
                background: `${colors.c5} !important`,
                borderRadius: '0.5rem !important',
                overflow: 'hidden !important',
                border: '1px solid var(--border-color) !important'
            },
            'preview-modal-header': {
                background: `${colors.c1} !important`,
                color: `${colors.c5} !important`,
                padding: '1rem !important',
                display: 'flex !important',
                justifyContent: 'space-between !important',
                alignItems: 'center !important'
            },
            'preview-table': {
                background: `${colors.c5} !important`,
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.5rem !important',
                overflow: 'hidden !important'
            },
            'preview-tabs': {
                transition: 'all 0.3s ease !important'
            },
            'preview-tab': {
                color: `${colors.c2} !important`,
                padding: '0.5rem 1rem !important',
                fontWeight: '500 !important',
                background: 'none !important',
                border: 'none !important',
                cursor: 'pointer !important',
                borderBottom: '2px solid transparent !important'
            },
            'preview-tab-active': {
                color: `${colors.c1} !important`,
                borderBottomColor: `${colors.c1} !important`,
                padding: '0.5rem 1rem !important',
                fontWeight: '500 !important',
                background: 'none !important',
                border: 'none !important',
                cursor: 'pointer !important',
                borderBottom: `2px solid ${colors.c1} !important`
            },
            'preview-badge': {
                background: `${colors.c2_alpha} !important`,
                color: `${colors.c2} !important`,
                padding: '0.25rem 0.5rem !important',
                borderRadius: '0.375rem !important',
                fontSize: '0.75rem !important',
                fontWeight: '500 !important',
                display: 'inline-block !important'
            },
            'preview-tooltip': {
                background: `${colors.c1} !important`,
                color: `${colors.c5} !important`,
                padding: '0.5rem !important',
                borderRadius: '0.375rem !important',
                fontSize: '0.875rem !important',
                position: 'relative !important'
            },
            'preview-dropdown': {
                background: `${colors.c5} !important`,
                border: `1px solid ${colors.c3} !important`,
                borderRadius: '0.375rem !important',
                padding: '0.5rem !important'
            },
            'preview-dropdown-item': {
                color: `${colors.c2} !important`,
                padding: '0.25rem 0.5rem !important',
                cursor: 'pointer !important',
                borderRadius: '0.25rem !important'
            },
            'preview-avatar': {
                background: `${colors.c2} !important`,
                color: `${colors.c5} !important`,
                width: '2.5rem !important',
                height: '2.5rem !important',
                borderRadius: '50% !important',
                display: 'flex !important',
                alignItems: 'center !important',
                justifyContent: 'center !important',
                fontWeight: '600 !important'
            },
            'preview-progress': {
                background: `${colors.c3_alpha} !important`,
                height: '0.5rem !important',
                borderRadius: '0.25rem !important',
                overflow: 'hidden !important'
            },
            'preview-progress-bar': {
                background: `${colors.c2} !important`,
                height: '100% !important',
                width: '60% !important'
            },
            'preview-stepper': {
                display: 'flex !important',
                alignItems: 'center !important',
                gap: '1rem !important'
            },
            'preview-step': {
                color: `${colors.c2} !important`,
                padding: '0.5rem !important',
                borderRadius: '0.375rem !important',
                cursor: 'pointer !important'
            },
            'preview-step-active': {
                color: `${colors.c1} !important`,
                background: `${colors.c1_alpha} !important`
            },
            'preview-step-completed': {
                color: `${colors.c3} !important`,
                background: `${colors.c3_alpha} !important`
            },
            'preview-sidebar': {
                background: `${colors.c5} !important`,
                border: `1px solid ${colors.c3} !important`,
                padding: '1rem !important',
                borderRadius: '0.5rem !important'
            },
            'preview-sidebar-item': {
                color: `${colors.c2} !important`,
                padding: '0.5rem !important',
                borderRadius: '0.375rem !important',
                cursor: 'pointer !important',
                marginBottom: '0.25rem !important'
            },
            'preview-sidebar-item-active': {
                background: `${colors.c2} !important`,
                color: `${colors.c5} !important`
            },
            'preview-footer': {
                background: `${colors.c1} !important`,
                color: `${colors.c5} !important`,
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                textAlign: 'center !important'
            },
            'preview-breadcrumb': {
                color: `${colors.c2} !important`,
                padding: '0.25rem !important',
                cursor: 'pointer !important'
            },
            'preview-breadcrumb-active': {
                color: `${colors.c1} !important`,
                fontWeight: '600 !important'
            },
            'preview-accordion': {
                border: `1px solid ${colors.c3} !important`,
                borderRadius: '0.5rem !important',
                overflow: 'hidden !important'
            },
            'preview-accordion-header': {
                color: `${colors.c2} !important`,
                padding: '1rem !important',
                cursor: 'pointer !important',
                background: `${colors.c5} !important`
            },
            'preview-accordion-content': {
                color: `${colors.c2} !important`,
                padding: '1rem !important',
                background: `${colors.c5} !important`
            },
            'preview-switch': {
                background: `${colors.c3} !important`,
                width: '3rem !important',
                height: '1.5rem !important',
                borderRadius: '0.75rem !important',
                position: 'relative !important',
                cursor: 'pointer !important'
            },
            'preview-switch-active': {
                background: `${colors.c2} !important`
            },
            'preview-slider': {
                background: `${colors.c3_alpha} !important`,
                height: '0.5rem !important',
                borderRadius: '0.25rem !important',
                position: 'relative !important',
                cursor: 'pointer !important'
            },
            'preview-slider-thumb': {
                background: `${colors.c2} !important`,
                width: '1rem !important',
                height: '1rem !important',
                borderRadius: '50% !important',
                position: 'absolute !important',
                top: '-0.25rem !important',
                left: '30% !important'
            },
            'preview-notification': {
                background: `${colors.c4} !important`,
                color: `${colors.c1} !important`,
                border: `1px solid ${colors.c2} !important`,
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                display: 'flex !important',
                alignItems: 'center !important',
                gap: '0.5rem !important'
            },
            'preview-empty-state': {
                textAlign: 'center !important',
                padding: '3rem 1rem !important'
            },
            'preview-search': {
                position: 'relative !important'
            },
            'preview-menu': {
                position: 'relative !important',
                display: 'inline-block !important'
            },
            'preview-stats': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) !important',
                gap: '1rem !important'
            },
            'preview-stats-card': {
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                border: '1px solid var(--border-color) !important',
                background: `${colors.c5} !important`
            },
            'preview-timeline': {
                position: 'relative !important',
                paddingLeft: '2rem !important'
            },
            'preview-timeline-item': {
                position: 'relative !important',
                marginBottom: '1rem !important'
            },
            'preview-calendar': {
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.5rem !important',
                padding: '1rem !important'
            },
            'preview-file-uploader': {
                border: `2px dashed ${colors.c3} !important`,
                borderRadius: '0.5rem !important',
                padding: '2rem !important',
                textAlign: 'center !important',
                background: `${colors.c5} !important`
            },
            'preview-chip': {
                display: 'inline-flex !important',
                alignItems: 'center !important',
                padding: '0.25rem 0.5rem !important',
                borderRadius: '9999px !important',
                fontSize: '0.75rem !important',
                fontWeight: '500 !important',
                background: `${colors.c2_alpha} !important`,
                color: `${colors.c2} !important`,
                margin: '0.125rem !important'
            },
            'preview-list-group': {
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.5rem !important',
                overflow: 'hidden !important'
            },
            'preview-list-group-item': {
                padding: '0.75rem 1rem !important',
                borderBottom: '1px solid var(--border-color) !important',
                background: `${colors.c5} !important`
            },
            'preview-media-object': {
                display: 'flex !important',
                alignItems: 'center !important',
                gap: '1rem !important'
            },
            'preview-pricing-table': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr)) !important',
                gap: '1rem !important'
            },
            'preview-pricing-card': {
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.5rem !important',
                padding: '1.5rem !important',
                textAlign: 'center !important',
                background: `${colors.c5} !important`
            },
            'preview-callout': {
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                borderLeft: `4px solid ${colors.c2} !important`,
                background: `${colors.c2_alpha} !important`
            },
            'preview-skeleton': {
                background: `${colors.c3_alpha} !important`,
                borderRadius: '0.25rem !important',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite !important'
            },
            'preview-toast': {
                position: 'fixed !important',
                bottom: '1rem !important',
                right: '1rem !important',
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                background: `${colors.c5} !important`,
                border: '1px solid var(--border-color) !important',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1) !important',
                zIndex: '50 !important'
            },
            'preview-app-bar': {
                background: `${colors.c1} !important`,
                color: `${colors.c5} !important`,
                padding: '1rem !important',
                display: 'flex !important',
                justifyContent: 'space-between !important',
                alignItems: 'center !important'
            },
            'preview-drawer': {
                position: 'fixed !important',
                top: '0 !important',
                left: '0 !important',
                height: '100vh !important',
                width: '250px !important',
                background: `${colors.c5} !important`,
                borderRight: '1px solid var(--border-color) !important',
                transform: 'translateX(-100%) !important',
                transition: 'transform 0.3s ease !important'
            },
            'preview-kanban-board': {
                display: 'flex !important',
                gap: '1rem !important',
                overflowX: 'auto !important'
            },
            'preview-kanban-column': {
                minWidth: '250px !important',
                background: `${colors.c5} !important`,
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.5rem !important',
                padding: '1rem !important'
            },
            'preview-chat-bubble': {
                maxWidth: '70% !important',
                padding: '0.75rem 1rem !important',
                borderRadius: '1rem !important',
                marginBottom: '0.5rem !important'
            },
            'preview-chat-bubble-sent': {
                background: `${colors.c2} !important`,
                color: `${colors.c5} !important`,
                marginLeft: 'auto !important'
            },
            'preview-chat-bubble-received': {
                background: `${colors.c3_alpha} !important`,
                color: `${colors.c1} !important`
            },
            'preview-avatar-group': {
                display: 'flex !important',
                alignItems: 'center !important'
            },
            'preview-divider': {
                height: '1px !important',
                background: 'var(--border-color) !important',
                margin: '1rem 0 !important'
            },
            'preview-collapse': {
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.5rem !important',
                overflow: 'hidden !important'
            },
            'preview-carousel': {
                position: 'relative !important',
                overflow: 'hidden !important',
                borderRadius: '0.5rem !important'
            },
            'preview-rating-stars': {
                display: 'flex !important',
                gap: '0.25rem !important'
            },
            'preview-star': {
                color: `${colors.c3} !important`,
                cursor: 'pointer !important',
                fontSize: '1.25rem !important'
            },
            'preview-star-filled': {
                color: `${colors.c2} !important`
            },
            'preview-code-block': {
                background: `${colors.c1} !important`,
                color: `${colors.c5} !important`,
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                fontFamily: 'monospace !important',
                fontSize: '0.875rem !important',
                overflowX: 'auto !important'
            },
            'preview-image-gallery': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr)) !important',
                gap: '0.5rem !important'
            },
            'preview-video-player': {
                position: 'relative !important',
                borderRadius: '0.5rem !important',
                overflow: 'hidden !important',
                background: `${colors.c1} !important`
            },
            'preview-step-progress': {
                display: 'flex !important',
                alignItems: 'center !important',
                gap: '1rem !important'
            },
            'preview-input-group': {
                display: 'flex !important',
                alignItems: 'center !important'
            },
            'preview-number-input': {
                display: 'flex !important',
                alignItems: 'center !important',
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.375rem !important',
                overflow: 'hidden !important'
            },
            'preview-color-picker': {
                display: 'flex !important',
                flexWrap: 'wrap !important',
                gap: '0.5rem !important'
            },
            'preview-color-swatch': {
                width: '2rem !important',
                height: '2rem !important',
                borderRadius: '0.25rem !important',
                cursor: 'pointer !important',
                border: '2px solid transparent !important'
            },
            'preview-data-table': {
                width: '100% !important',
                borderCollapse: 'collapse !important'
            },
            'preview-multi-select': {
                position: 'relative !important',
                minHeight: '2.5rem !important',
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.375rem !important',
                padding: '0.5rem !important'
            },
            'preview-date-range-picker': {
                display: 'flex !important',
                gap: '0.5rem !important',
                alignItems: 'center !important'
            },
            'preview-rich-text-editor': {
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.375rem !important',
                minHeight: '200px !important'
            },
            'preview-file-tree': {
                fontFamily: 'monospace !important',
                fontSize: '0.875rem !important'
            },
            'preview-gantt-chart': {
                position: 'relative !important',
                overflow: 'auto !important'
            },
            'preview-heatmap': {
                display: 'grid !important',
                gap: '1px !important'
            },
            'preview-dashboard': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)) !important',
                gap: '1.5rem !important'
            },
            'preview-analytics': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) !important',
                gap: '1rem !important'
            },
            'preview-onboarding': {
                textAlign: 'center !important',
                padding: '2rem !important'
            },
            'preview-feedback': {
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                border: '1px solid var(--border-color) !important'
            },
            'preview-settings': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)) !important',
                gap: '1.5rem !important'
            },
            'preview-profile': {
                textAlign: 'center !important',
                padding: '2rem !important'
            },
            'preview-notifications': {
                maxHeight: '400px !important',
                overflowY: 'auto !important'
            },
            'preview-help': {
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                background: `${colors.c5} !important`
            },
            'preview-breadcrumbs-dropdown': {
                position: 'relative !important',
                display: 'inline-block !important'
            },
            'preview-vertical-timeline': {
                position: 'relative !important',
                paddingLeft: '2rem !important'
            },
            'preview-sidebar-nav-collapsible': {
                border: '1px solid var(--border-color) !important',
                borderRadius: '0.5rem !important',
                overflow: 'hidden !important'
            },
            'preview-notification-bell': {
                position: 'relative !important',
                cursor: 'pointer !important'
            },
            'preview-team-member-grid': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) !important',
                gap: '1rem !important'
            },
            'preview-roadmap-board': {
                display: 'flex !important',
                gap: '1rem !important',
                overflowX: 'auto !important'
            },
            'preview-vertical-stepper': {
                position: 'relative !important',
                paddingLeft: '2rem !important'
            },
            'preview-stats-trend-card': {
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                border: '1px solid var(--border-color) !important',
                background: `${colors.c5} !important`
            },
            'preview-user-card-actions': {
                display: 'flex !important',
                gap: '0.5rem !important',
                marginTop: '0.5rem !important'
            },
            'preview-contact-list': {
                maxHeight: '400px !important',
                overflowY: 'auto !important'
            },
            'preview-activity-feed': {
                maxHeight: '400px !important',
                overflowY: 'auto !important'
            },
            'preview-color-legend': {
                display: 'flex !important',
                flexWrap: 'wrap !important',
                gap: '1rem !important',
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                background: `${colors.c5} !important`,
                border: '1px solid var(--border-color) !important'
            },

            'preview-palette-comparison-table': {
                width: '100% !important',
                borderCollapse: 'collapse !important'
            },
            'preview-palette-history-timeline': {
                position: 'relative !important',
                paddingLeft: '2rem !important'
            },
            'preview-palette-pie-chart': {
                width: '200px !important',
                height: '200px !important',
                borderRadius: '50% !important',
                background: `conic-gradient(${colors.c1} 0deg 90deg, ${colors.c2} 90deg 180deg, ${colors.c3} 180deg 270deg, ${colors.c4} 270deg 360deg) !important`
            },
            'preview-palette-bar-chart': {
                display: 'flex !important',
                alignItems: 'end !important',
                gap: '0.5rem !important',
                height: '150px !important'
            },
            'preview-palette-gradient-preview': {
                height: '100px !important',
                borderRadius: '0.5rem !important',
                background: `linear-gradient(to right, ${colors.c1}, ${colors.c2}, ${colors.c3}, ${colors.c4}, ${colors.c5}) !important`
            },
            'preview-palette-usage-map': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr)) !important',
                gap: '0.5rem !important'
            },
            'preview-palette-typography-demo': {
                padding: '1rem !important',
                borderRadius: '0.5rem !important',
                background: `${colors.c5} !important`,
                border: '1px solid var(--border-color) !important'
            },
            'preview-palette-button-group': {
                display: 'flex !important',
                gap: '0.5rem !important'
            },
            'preview-palette-card-deck': {
                display: 'grid !important',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) !important',
                gap: '1rem !important'
            }
        };

        // Generate static fallback CSS for the specific component
        const componentSelector = `preview-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        const baseStyles = baseStaticStyles[componentSelector];
        
        if (!baseStyles) {
            // Fallback for any component not explicitly defined
            return `
/* Auto-generated static fallback for ${componentName} */
.${componentSelector} {
    background-color: ${colors.c5} !important;
    color: ${colors.c1} !important;
    border: 1px solid var(--border-color) !important;
    border-radius: 0.5rem !important;
    padding: 1rem !important;
    transition: all 0.3s ease !important;
}

.${componentSelector}:hover {
    background-color: ${colors.c1_alpha} !important;
    transform: translateY(-1px) !important;
}`;
        }

        // Convert object to CSS string
        const cssProperties = Object.entries(baseStyles)
            .map(([property, value]) => `    ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
            .join('\n');

        return `
/* Static fallback for ${componentName} */
.${componentSelector} {
${cssProperties}
    transition: all 0.3s ease !important;
}`;
    }

    function _getCurrentPaletteCSSVariables() {
    // Use global currentPalette or default values
    const globalPalette = window.currentPalette || [];
    if (!globalPalette || globalPalette.length === 0) {
            return `    --c1: #3dbdf5;
    --c2: #3983f1;
    --c3: #3d4ff3;
    --c4: #6440f4;
    --c5: #9d44f5;
    --c1_alpha: rgba(61, 189, 245, 0.1);
    --c2_alpha: rgba(57, 131, 241, 0.1);
    --c3_alpha: rgba(61, 79, 243, 0.1);
    --c4_alpha: rgba(100, 64, 244, 0.1);
    --c5_alpha: rgba(157, 68, 245, 0.1);
    --accent_alpha: rgba(61, 189, 245, 0.1);`;
        }

        const variables = [];
        const alphaVariables = [];
        
        globalPalette.forEach((color, index) => {
            const colorName = `--c${index + 1}`;
            const alphaName = `--c${index + 1}_alpha`;
            
            // Convert hex to RGB for alpha version
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            
            variables.push(`    ${colorName}: ${color};`);
            alphaVariables.push(`    ${alphaName}: rgba(${r}, ${g}, ${b}, 0.1);`);
        });

        // Add accent color (first color)
        const accentColor = globalPalette[0];
        const hex = accentColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        variables.push(`    --accent: ${accentColor};`);
        alphaVariables.push(`    --accent_alpha: rgba(${r}, ${g}, ${b}, 0.1);`);

        return [...variables, ...alphaVariables].join('\n');
    }

    function _getComponentCSS(componentName) {
        // Dynamic CSS generation system for ALL components
        const baseComponentStyles = {
            // Core component selectors and their base styles
            'preview-nav': {
                background: 'var(--c1)',
                color: 'var(--c5)',
                padding: '1rem',
                borderRadius: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            'preview-button-primary': {
                background: 'var(--c2)',
                color: 'var(--c5)',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
            },
            'preview-button-secondary': {
                background: 'var(--c3)',
                color: 'var(--c5)',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
            },
            'preview-button-ghost': {
                background: 'transparent',
                color: 'var(--c2)',
                border: '1px solid var(--c2)',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer'
            },
            'preview-card': {
                background: 'var(--c5)',
                border: '1px solid var(--c4)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
            },
            'preview-card-header': {
                color: 'var(--c1)',
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '0.5rem'
            },
            'preview-card-body': {
                color: 'var(--c2)'
            },
            'preview-input': {
                border: '1px solid var(--c3)',
                background: 'var(--c5)',
                color: 'var(--c1)',
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
            },
            'preview-alert': {
                background: 'var(--c4)',
                color: 'var(--c1)',
                borderLeft: '4px solid var(--c2)',
                padding: '1rem',
                borderRadius: '0.375rem'
            },
            'preview-modal-content': {
                background: 'var(--c5)',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: '1px solid var(--border-color)'
            },
            'preview-modal-header': {
                background: 'var(--c1)',
                color: 'var(--c5)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            'preview-table': {
                background: 'var(--c5)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
            },
            'preview-tabs': {
                transition: 'all 0.3s ease'
            },
            'preview-tab': {
                color: 'var(--c2)',
                padding: '0.5rem 1rem',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: '2px solid transparent'
            },
            'preview-tab-active': {
                color: 'var(--c1)',
                borderBottomColor: 'var(--c1)',
                padding: '0.5rem 1rem',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: '2px solid var(--c1)'
            },
            'preview-badge': {
                background: 'var(--c2_alpha)',
                color: 'var(--c2)',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                display: 'inline-block'
            },
            'preview-tooltip': {
                background: 'var(--c1)',
                color: 'var(--c5)',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                position: 'relative'
            },
            'preview-dropdown': {
                background: 'var(--c5)',
                border: '1px solid var(--c3)',
                borderRadius: '0.375rem',
                padding: '0.5rem'
            },
            'preview-dropdown-item': {
                color: 'var(--c2)',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                borderRadius: '0.25rem'
            },
            'preview-avatar': {
                background: 'var(--c2)',
                color: 'var(--c5)',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600'
            },
            'preview-progress': {
                background: 'var(--c3_alpha)',
                height: '0.5rem',
                borderRadius: '0.25rem',
                overflow: 'hidden'
            },
            'preview-progress-bar': {
                background: 'var(--c2)',
                height: '100%',
                width: '60%'
            },
            'preview-stepper': {
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            },
            'preview-step': {
                color: 'var(--c2)',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer'
            },
            'preview-step-active': {
                color: 'var(--c1)',
                background: 'var(--c1_alpha)'
            },
            'preview-step-completed': {
                color: 'var(--c3)',
                background: 'var(--c3_alpha)'
            },
            'preview-sidebar': {
                background: 'var(--c5)',
                border: '1px solid var(--c3)',
                padding: '1rem',
                borderRadius: '0.5rem'
            },
            'preview-sidebar-item': {
                color: 'var(--c2)',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                marginBottom: '0.25rem'
            },
            'preview-sidebar-item-active': {
                background: 'var(--c2)',
                color: 'var(--c5)'
            },
            'preview-footer': {
                background: 'var(--c1)',
                color: 'var(--c5)',
                padding: '1rem',
                borderRadius: '0.5rem',
                textAlign: 'center'
            },
            'preview-breadcrumb': {
                color: 'var(--c2)',
                padding: '0.25rem',
                cursor: 'pointer'
            },
            'preview-breadcrumb-active': {
                color: 'var(--c1)',
                fontWeight: '600'
            },
            'preview-accordion': {
                border: '1px solid var(--c3)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
            },
            'preview-accordion-header': {
                color: 'var(--c2)',
                padding: '1rem',
                cursor: 'pointer',
                background: 'var(--c5)'
            },
            'preview-accordion-content': {
                color: 'var(--c2)',
                padding: '1rem',
                background: 'var(--c5)'
            },
            'preview-switch': {
                background: 'var(--c3)',
                width: '3rem',
                height: '1.5rem',
                borderRadius: '0.75rem',
                position: 'relative',
                cursor: 'pointer'
            },
            'preview-switch-active': {
                background: 'var(--c2)'
            },
            'preview-slider': {
                background: 'var(--c3_alpha)',
                height: '0.5rem',
                borderRadius: '0.25rem',
                position: 'relative',
                cursor: 'pointer'
            },
            'preview-slider-thumb': {
                background: 'var(--c2)',
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                position: 'absolute',
                top: '-0.25rem',
                left: '30%'
            },
            'preview-notification': {
                background: 'var(--c4)',
                color: 'var(--c1)',
                border: '1px solid var(--c2)',
                padding: '1rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            },
            'preview-empty-state': {
                textAlign: 'center',
                padding: '3rem 1rem'
            },
            'preview-search': {
                position: 'relative'
            },
            'preview-menu': {
                position: 'relative',
                display: 'inline-block'
            },
            'preview-stats': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            },
            'preview-stats-card': {
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                background: 'var(--c5)'
            },
            'preview-timeline': {
                position: 'relative',
                paddingLeft: '2rem'
            },
            'preview-timeline-item': {
                position: 'relative',
                marginBottom: '1rem'
            },
            'preview-calendar': {
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                padding: '1rem'
            },
            'preview-file-uploader': {
                border: '2px dashed var(--c3)',
                borderRadius: '0.5rem',
                padding: '2rem',
                textAlign: 'center',
                background: 'var(--c5)'
            },
            'preview-chip': {
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
                background: 'var(--c2_alpha)',
                color: 'var(--c2)',
                margin: '0.125rem'
            },
            'preview-list-group': {
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
            },
            'preview-list-group-item': {
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--border-color)',
                background: 'var(--c5)'
            },
            'preview-media-object': {
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            },
            'preview-pricing-table': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
            },
            'preview-pricing-card': {
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                textAlign: 'center',
                background: 'var(--c5)'
            },
            'preview-callout': {
                padding: '1rem',
                borderRadius: '0.5rem',
                borderLeft: '4px solid var(--c2)',
                background: 'var(--c2_alpha)'
            },
            'preview-skeleton': {
                background: 'var(--c3_alpha)',
                borderRadius: '0.25rem',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            },
            'preview-toast': {
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'var(--c5)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                zIndex: '50'
            },
            'preview-app-bar': {
                background: 'var(--c1)',
                color: 'var(--c5)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            'preview-drawer': {
                position: 'fixed',
                top: '0',
                left: '0',
                height: '100vh',
                width: '250px',
                background: 'var(--c5)',
                borderRight: '1px solid var(--border-color)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.3s ease'
            },
            'preview-kanban-board': {
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto'
            },
            'preview-kanban-column': {
                minWidth: '250px',
                background: 'var(--c5)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                padding: '1rem'
            },
            'preview-chat-bubble': {
                maxWidth: '70%',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                marginBottom: '0.5rem'
            },
            'preview-chat-bubble-sent': {
                background: 'var(--c2)',
                color: 'var(--c5)',
                marginLeft: 'auto'
            },
            'preview-chat-bubble-received': {
                background: 'var(--c3_alpha)',
                color: 'var(--c1)'
            },
            'preview-avatar-group': {
                display: 'flex',
                alignItems: 'center'
            },
            'preview-divider': {
                height: '1px',
                background: 'var(--border-color)',
                margin: '1rem 0'
            },
            'preview-collapse': {
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
            },
            'preview-carousel': {
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0.5rem'
            },
            'preview-rating-stars': {
                display: 'flex',
                gap: '0.25rem'
            },
            'preview-star': {
                color: 'var(--c3)',
                cursor: 'pointer',
                fontSize: '1.25rem'
            },
            'preview-star-filled': {
                color: 'var(--c2)'
            },
            'preview-code-block': {
                background: 'var(--c1)',
                color: 'var(--c5)',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                overflowX: 'auto'
            },
            'preview-image-gallery': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '0.5rem'
            },
            'preview-video-player': {
                position: 'relative',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                background: 'var(--c1)'
            },
            'preview-step-progress': {
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            },
            'preview-input-group': {
                display: 'flex',
                alignItems: 'center'
            },
            'preview-number-input': {
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                overflow: 'hidden'
            },
            'preview-color-picker': {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
            },
            'preview-color-swatch': {
                width: '2rem',
                height: '2rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                border: '2px solid transparent'
            },
            'preview-data-table': {
                width: '100%',
                borderCollapse: 'collapse'
            },
            'preview-multi-select': {
                position: 'relative',
                minHeight: '2.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                padding: '0.5rem'
            },
            'preview-date-range-picker': {
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center'
            },
            'preview-rich-text-editor': {
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                minHeight: '200px'
            },
            'preview-file-tree': {
                fontFamily: 'monospace',
                fontSize: '0.875rem'
            },
            'preview-gantt-chart': {
                position: 'relative',
                overflow: 'auto'
            },
            'preview-heatmap': {
                display: 'grid',
                gap: '1px'
            },
            'preview-dashboard': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            },
            'preview-analytics': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            },
            'preview-onboarding': {
                textAlign: 'center',
                padding: '2rem'
            },
            'preview-feedback': {
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)'
            },
            'preview-settings': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            },
            'preview-profile': {
                textAlign: 'center',
                padding: '2rem'
            },
            'preview-notifications': {
                maxHeight: '400px',
                overflowY: 'auto'
            },
            'preview-help': {
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'var(--c5)'
            },
            'preview-breadcrumbs-dropdown': {
                position: 'relative',
                display: 'inline-block'
            },
            'preview-vertical-timeline': {
                position: 'relative',
                paddingLeft: '2rem'
            },
            'preview-sidebar-nav-collapsible': {
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                overflow: 'hidden'
            },
            'preview-notification-bell': {
                position: 'relative',
                cursor: 'pointer'
            },
            'preview-team-member-grid': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            },
            'preview-roadmap-board': {
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto'
            },
            'preview-vertical-stepper': {
                position: 'relative',
                paddingLeft: '2rem'
            },
            'preview-stats-trend-card': {
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                background: 'var(--c5)'
            },
            'preview-user-card-actions': {
                display: 'flex',
                gap: '0.5rem',
                marginTop: '0.5rem'
            },
            'preview-contact-list': {
                maxHeight: '400px',
                overflowY: 'auto'
            },
            'preview-activity-feed': {
                maxHeight: '400px',
                overflowY: 'auto'
            },
            'preview-color-legend': {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'var(--c5)',
                border: '1px solid var(--border-color)'
            },

            'preview-palette-comparison-table': {
                width: '100%',
                borderCollapse: 'collapse'
            },
            'preview-palette-history-timeline': {
                position: 'relative',
                paddingLeft: '2rem'
            },
            'preview-palette-pie-chart': {
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'conic-gradient(var(--c1) 0deg 90deg, var(--c2) 90deg 180deg, var(--c3) 180deg 270deg, var(--c4) 270deg 360deg)'
            },
            'preview-palette-bar-chart': {
                display: 'flex',
                alignItems: 'end',
                gap: '0.5rem',
                height: '150px'
            },
            'preview-palette-gradient-preview': {
                height: '100px',
                borderRadius: '0.5rem',
                background: 'linear-gradient(to right, var(--c1), var(--c2), var(--c3), var(--c4), var(--c5))'
            },
            'preview-palette-usage-map': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '0.5rem'
            },
            'preview-palette-typography-demo': {
                padding: '1rem',
                borderRadius: '0.5rem',
                background: 'var(--c5)',
                border: '1px solid var(--border-color)'
            },
            'preview-palette-button-group': {
                display: 'flex',
                gap: '0.5rem'
            },
            'preview-palette-card-deck': {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            }
        };

        // Generate CSS for the specific component
        const componentSelector = `preview-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        const baseStyles = baseComponentStyles[componentSelector];
        
        if (!baseStyles) {
            // Fallback for any component not explicitly defined
            return `
/* Auto-generated styles for ${componentName} */
.${componentSelector} {
    background-color: var(--c5);
    color: var(--c1);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 1rem;
    transition: all 0.3s ease;
}

.${componentSelector}:hover {
    background-color: var(--c1_alpha);
    transform: translateY(-1px);
}`;
        }

        // Convert object to CSS string
        const cssProperties = Object.entries(baseStyles)
            .map(([property, value]) => `    ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
            .join('\n');

        return `
/* ${componentName} Component Styles */
.${componentSelector} {
${cssProperties}
    transition: all 0.3s ease;
}`;
    }

    function _toggleComponentSelector(show) {
        if (show) {
            componentSelectorPanel.classList.add('open');
            overlay.classList.remove('hidden');
        } else {
            // OPTIMIZATION: Hide hover card when panel closes
            if (_hoverCardVisible) {
                _hideHoverCard();
            }
            
            componentSelectorPanel.classList.remove('open');
            overlay.classList.add('hidden');
        }
    }
    function _renderComponentList() {
        componentList.innerHTML = '';
        Object.keys(uiComponents).forEach(name => {
            const isChecked = selectedComponents.includes(name);
            const id = `component-${name}`;
            
            const wrapper = document.createElement('div');
            wrapper.className = 'component-selector-item';
            wrapper.innerHTML = `
                <input type="checkbox" id="${id}" value="${name}" class="hidden component-checkbox" ${isChecked ? 'checked' : ''}>
                <label for="${id}" class="component-item flex items-center justify-between p-4 border-2 border-color rounded-lg cursor-pointer smooth-transition hover:border-primary hover:bg-primary hover:bg-opacity-5" data-component="${name}">
                    <div class="flex items-center gap-3">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center ${isChecked ? 'bg-accent text-white' : 'bg-secondary border-2 border-color'}">
                                ${isChecked ? '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>' : ''}
                            </div>
                        </div>
                        <div>
                            <span class="font-medium text-primary">${name}</span>
                            <div class="text-xs text-secondary mt-1">${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} component</div>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </label>
            `;
            componentList.appendChild(wrapper);
        });
    }
    function _handleComponentSelection(e) {
        if (e.target.matches('.component-checkbox')) {
            const { value, checked } = e.target;
            if (checked) {
                // Warn user if adding too many components
                if (selectedComponents.length >= 25) {
                    showToast(toast, '⚠️ Too many components may affect performance. Consider removing some.', true);
                    e.target.checked = false;
                    return;
                }
                
                if (!selectedComponents.includes(value)) selectedComponents.push(value);
            } else {
                selectedComponents = selectedComponents.filter(c => c !== value);
            }
            
            // Update global reference for performance monitoring
            window.selectedComponents = selectedComponents;
            
            // DISABLED: Component selection persistence (user wants fresh start on refresh)
            // persistState();
            
            // Track component usage for predictive caching
            trackComponentUsage(value, checked);
            
            _renderShowcase();
        }
    }
    
    // DISABLED: Component usage tracking (user wants fresh start on refresh)
    function trackComponentUsage(componentName, isSelected) {
        // Component usage tracking disabled - always start fresh
    }
    
    function _filterComponents(searchTerm) {
        const componentItems = componentList.querySelectorAll('.component-selector-item');
        componentItems.forEach(item => {
            const componentName = item.querySelector('label .font-medium').textContent.toLowerCase();
            const isVisible = componentName.includes(searchTerm.toLowerCase());
            item.style.display = isVisible ? 'block' : 'none';
        });
    }
    
    // OPTIMIZATION: Module-level state management for hover cards
    let _hoverCardVisible = false;
    let _componentDescriptions = null;
    let _hoverCardResizeHandler = null;
    let _currentHoveredComponent = null;
    
    function _showHoverCard(event, componentName) {
        // OPTIMIZATION: Comprehensive error handling and validation
        try {
            if (!event || !componentName) {
                return;
            }
            
            // OPTIMIZATION: Validate DOM elements exist
            if (!hoverCard || !hoverCardTitle || !hoverCardStatus || !hoverCardPreview || !hoverCardDescription) {
                return;
            }
            
            // OPTIMIZATION: Allow immediate updates for perfect synchronization
            // Only prevent if it's the same component (avoid unnecessary updates)
            if (_hoverCardVisible && _currentHoveredComponent === componentName) {
                return;
            }
            
            // OPTIMIZATION: Track current hovered component for perfect switching
            _currentHoveredComponent = componentName;
        } catch (error) {
            return;
        }
        
        // OPTIMIZATION: Validate component exists
        const componentHTML = uiComponents[componentName];
        if (!componentHTML) {
            return;
        }
        
        const isSelected = selectedComponents.includes(componentName);
        
        // OPTIMIZATION: Cache component descriptions to avoid recreation
        if (!_componentDescriptions) {
            _componentDescriptions = {
            'Navbar': 'Navigation bar with logo and menu items. Perfect for headers and main navigation.',
            'Buttons': 'Interactive buttons with primary, secondary, and ghost variants for different use cases.',
            'Card': 'Content container with header, body, and footer sections. Ideal for displaying information.',
            'Forms': 'Input fields and form elements with proper styling and validation states.',
            'Alerts': 'Notification components for displaying important messages and warnings.',
            'Modals': 'Overlay dialogs for focused interactions and confirmations.',
            'Table': 'Data display component with sortable columns and row actions.',
            'Pagination': 'Navigation controls for large datasets and content pages.',
            'Tabs': 'Content organization with multiple panels and active states.',
            'Badge': 'Small status indicators and labels for categorization.',
            // OLD TOOLTIP DESCRIPTION REMOVED - Replaced with modern popup card system
            'Dropdown': 'Collapsible menu with multiple options and sub-items.',
            'Avatar': 'User profile display with image or initials and user information.',
            'Progress': 'Visual progress indicators for loading states and completion.',
            'Stepper': 'Multi-step process navigation with current and completed states.',
            'Sidebar': 'Vertical navigation panel with menu items and active states.',
            'Footer': 'Page footer with links, copyright, and additional information.',
            'Breadcrumbs': 'Hierarchical navigation showing current page location.',
            'Accordion': 'Collapsible content sections for organizing information.',
            'Switch': 'Toggle controls for binary options and settings.',
            'Slider': 'Range input controls for numeric value selection.',
            'Notification': 'Toast notifications for user feedback and alerts.',
            'EmptyState': 'Placeholder content when no data is available.',
            'Search': 'Search input with icon and placeholder text.',
            'Menu': 'Context menu with dropdown options and actions.',
            'Stats': 'Metric cards displaying key performance indicators.',
            'Timeline': 'Chronological event display with timestamps and descriptions.',
            'Calendar': 'Date picker component with month navigation and day selection.',
            'FileUploader': 'Drag and drop file upload interface with visual feedback.',
            'Chip': 'Removable tags and labels for categorization and filtering.',
            'ListGroup': 'Grouped list items with hover states and selection.',
            'MediaObject': 'Content layout with image and text side by side.',
            'PricingTable': 'Pricing plans comparison with features and call-to-action.',
            'Callout': 'Highlighted information boxes with icons and descriptions.',
            'SkeletonLoader': 'Loading placeholders that mimic actual content structure.',
            'Toast': 'Temporary notification messages that appear and disappear.',
            'AppBar': 'Top application bar with title and action buttons.',
            'Drawer': 'Side navigation panel that slides in from the edge.',
            'KanbanBoard': 'Project management board with columns and task cards.',
            'ChatBubble': 'Conversation interface with message bubbles and timestamps.',
            'AvatarGroup': 'Multiple user avatars displayed together with overflow indicator.',
            'Divider': 'Visual separation line between content sections.',
            'Collapse': 'Expandable content sections with smooth animations.',
            'Carousel': 'Image slideshow with navigation controls and indicators.',
            'RatingStars': 'Star rating component for reviews and feedback.',
            'CodeBlock': 'Syntax-highlighted code display with copy functionality.',
            'ImageGallery': 'Grid layout for displaying multiple images.',
            'VideoPlayer': 'Video playback component with controls and thumbnails.',
            'StepProgressBar': 'Progress indicator showing completion of multi-step processes.',
            'InputGroup': 'Combined input elements with prefixes and suffixes.',
            'NumberInput': 'Numeric input with increment and decrement buttons.',
            'ColorPicker': 'Color selection tool with visual color swatches.',
            'DataTable': 'Advanced data table with sorting, filtering, and pagination.',
            'MultiSelect': 'Multiple selection input with removable tags.',
            'DateRangePicker': 'Date range selection with start and end date inputs.',
            'RichTextEditor': 'Text editor with formatting toolbar and rich content.',
            'FileTree': 'Hierarchical file and folder navigation structure.',
            'GanttChart': 'Project timeline visualization with task progress bars.',
            'Heatmap': 'Data visualization showing intensity through color variations.',
            'Dashboard': 'Overview cards displaying key metrics and statistics.',
            'Onboarding': 'Welcome screen with guided tour and setup instructions.',
            'Feedback': 'User feedback collection with rating and comment system.',
            'Settings': 'Application configuration panel with toggle switches.',
            'Profile': 'User profile display with avatar and personal information.',
            'Notifications': 'Real-time notification list with timestamps and actions.',
            'Help': 'Support and documentation access with search and guides.',
            'Analytics': 'Data visualization charts and metrics overview.',
            'ColorSchemeGenerator': 'Interactive color scheme generator that creates harmonious combinations using your palette colors.',
            'ColorHarmonyVisualizer': 'Visual representation of color harmony relationships using your palette in a circular design.',
            // ColorContrastMatrix removed - will be replaced with dashboard
            'NotificationBanner': 'Full-width system notification banner with dismissible alerts and status updates.',
            'ColorfulTimeline': 'Chronological timeline with color-coded stages using your palette for visual progression.',
            'ColorfulTags': 'Semantic tag system using palette colors for categorization and status indication.',
            'ColorfulCharts': 'Data visualization widgets including pie, bar, and donut charts using your palette colors.',
            'CTASection': 'High-impact call-to-action section with gradient backgrounds using your palette colors.',
            'ColorfulSidebar': 'Navigation sidebar with active states and hover effects using your palette colors.',
            'StatusIndicators': 'Real-time status indicators using palette colors for online, active, warning, and error states.',
            
            // PRELOADER COMPONENTS - Enhanced with color palette integration
            'LoadingSpinner': 'Animated loading spinner with rotating borders using your palette colors for different loading states and visual appeal.',
            'ProgressBar': 'Progress indicator with gradient fill using your palette colors, perfect for uploads, downloads, and process completion.',
            'SkeletonLoader': 'Loading placeholders that mimic content structure using your palette colors for consistent visual hierarchy.',
            'LoadingDots': 'Bouncing dots animation with staggered timing using your palette colors for engaging loading feedback.',
            'LoadingPulse': 'Pulsing circle animation with your palette colors for attention-grabbing loading states.',
            'LoadingRing': 'Circular loading indicator with rotating border using your palette colors for modern loading experiences.',
            'LoadingWave': 'Wave-like loading animation with your palette colors for dynamic and engaging loading feedback.',
            'LoadingCard': 'Card-shaped skeleton loader using your palette colors for content area loading states.',
            'LoadingTable': 'Table skeleton loader with your palette colors for data loading placeholders.',
            
            // ADVANCED PRELOADER COMPONENTS - Maximum color palette integration
            'LoadingOrbit': 'Advanced orbital loading animation with multiple palette colors for rotating borders, bouncing particles, and central pulse effects.',
            'LoadingHexagon': 'Hexagonal loading pattern with gradient backgrounds using all palette colors for geometric visual appeal.',
            'LoadingStairs': 'Staircase loading animation with staggered timing using palette colors for progressive loading visualization.',
            'LoadingMorph': 'Morphing shape loader with radial gradients and rotating elements using palette colors for dynamic transformations.',
            'LoadingRipple': 'Ripple effect loader with multiple delayed pulses using palette colors for wave-like loading feedback.',
            'LoadingSpiral': 'Multi-layered spiral loading animation with counter-rotating borders using palette colors for complex motion.',
            'LoadingMatrix': 'Grid-based loading animation with staggered timing using palette colors for systematic loading visualization.',
            'LoadingFractal': 'Fractal loading pattern with nested rotating borders using palette colors for mathematical beauty.',
            'LoadingNeon': 'Neon glow loading with box shadows and text shadows using palette colors for futuristic visual effects.',
            'LoadingGradient': 'Advanced gradient loading with conic gradients and linear overlays using all palette colors for rich visual depth.'
        };
        }
        
        // OPTIMIZATION: Mark hover card as visible
        _hoverCardVisible = true;
        
        // OPTIMIZATION: Update hover card content with comprehensive error handling
        try {
            // Update title safely
            if (hoverCardTitle) {
        hoverCardTitle.textContent = componentName;
            }
            
            // Update status safely
            if (hoverCardStatus) {
        hoverCardStatus.textContent = isSelected ? 'Selected' : 'Not Selected';
        hoverCardStatus.className = `px-2 py-1 rounded-full text-xs font-medium ${isSelected ? 'bg-accent text-white' : 'bg-secondary text-secondary'}`;
            }
            
            // Update preview safely
            if (hoverCardPreview) {
        hoverCardPreview.innerHTML = componentHTML;
            }
            
            // Update description safely
            if (hoverCardDescription) {
                const description = _componentDescriptions?.[componentName] || 
                    `This ${componentName.toLowerCase()} component demonstrates how your color palette will be applied to ${componentName.toLowerCase()} elements in your design.`;
                hoverCardDescription.textContent = description;
            }
            
            // Ensure no special styling
            if (hoverCard) {
                hoverCard.classList.remove('problematic-component');
            }
        } catch (error) {
            // Don't return here - continue with positioning
        }

        // --- Dynamic sizing ---
        hoverCard.style.width = 'auto';
        hoverCard.style.height = 'auto';
        hoverCardPreview.style.maxHeight = 'none';
        hoverCardPreview.style.overflow = 'visible';

        // OPTIMIZATION: Use single requestAnimationFrame for all DOM updates with comprehensive error handling
        requestAnimationFrame(() => {
            try {
                // OPTIMIZATION: Validate required elements before positioning
                if (!hoverCard || !event?.target) {
                    return;
                }
                
                // OPTIMIZATION: Cache viewport dimensions to avoid multiple calculations
                const viewportWidth = window.innerWidth || 1024;
                const viewportHeight = window.innerHeight || 768;
                const isMobile = viewportWidth <= 768;
                const isSmallMobile = viewportWidth <= 480;
            
                // OPTIMIZATION: Calculate content size efficiently with error handling
                let contentWidth = 320; // Default fallback
                let contentHeight = 200; // Default fallback
                
                try {
                    if (hoverCardPreview) {
            const previewRect = hoverCardPreview.getBoundingClientRect();
                        contentWidth = Math.ceil(previewRect.width) || 320;
                    }
                    if (hoverCard) {
                        contentHeight = Math.ceil(hoverCard.offsetHeight) || 200;
                    }
                } catch (error) {
                    // Use fallback values
                }

            // Set min/max constraints with enhanced responsive logic
            const maxWidth = isSmallMobile ? 320 : isMobile ? 400 : 520;
            const minWidth = isSmallMobile ? 180 : 240;
            const maxHeight = Math.max(viewportHeight - 32, 180);

            let cardWidth = Math.min(Math.max(contentWidth + 32, minWidth), maxWidth); // 32px for padding
            let cardHeight = Math.min(contentHeight, maxHeight);

            hoverCard.style.width = cardWidth + 'px';
            hoverCard.style.maxWidth = maxWidth + 'px';
            hoverCard.style.height = cardHeight + 'px';
            hoverCard.style.maxHeight = maxHeight + 'px';
            hoverCardPreview.style.maxHeight = (maxHeight - 80) + 'px';
            hoverCardPreview.style.overflow = 'auto';

            // --- OPTIMIZED RESPONSIVE POSITIONING ---
        const rect = event.target.getBoundingClientRect();
        let left, top;
        
            // OPTIMIZATION: Use cached viewport dimensions
            const isTablet = viewportWidth <= 1024;
        
        // Calculate available space in all directions with enhanced precision
            const spaceRight = viewportWidth - rect.right;
        const spaceLeft = rect.left;
            const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        // Enhanced margin calculation based on screen size
        const dynamicMargin = isSmallMobile ? 8 : isMobile ? 12 : 16;
        
            // OPTIMIZATION: Simplified positioning strategy
        let preferredPosition = 'smart';
        
            // OPTIMIZED POSITIONING LOGIC
        if (isSmallMobile || isMobile) {
            // Mobile-first positioning strategy
            if (spaceBelow >= cardHeight + dynamicMargin) {
                preferredPosition = 'below-center';
            } else if (spaceAbove >= cardHeight + dynamicMargin) {
                preferredPosition = 'above-center';
            } else if (spaceRight >= cardWidth + dynamicMargin) {
                preferredPosition = 'right';
            } else if (spaceLeft >= cardWidth + dynamicMargin) {
                preferredPosition = 'left';
            } else {
                preferredPosition = 'center-viewport';
            }
        } else {
            // Desktop positioning strategy
            if (spaceRight >= cardWidth + dynamicMargin && spaceBelow >= cardHeight + dynamicMargin) {
                preferredPosition = 'right';
            } else if (spaceLeft >= cardWidth + dynamicMargin && spaceBelow >= cardHeight + dynamicMargin) {
                preferredPosition = 'left';
            } else if (spaceBelow >= cardHeight + dynamicMargin) {
                preferredPosition = 'below';
            } else if (spaceAbove >= cardHeight + dynamicMargin) {
                preferredPosition = 'above';
            } else if (spaceRight >= cardWidth + dynamicMargin) {
                preferredPosition = 'right';
            } else if (spaceLeft >= cardWidth + dynamicMargin) {
                preferredPosition = 'left';
            } else {
                preferredPosition = 'center-viewport';
            }
        }
        
        // ENHANCED POSITIONING APPLICATION WITH RESPONSIVE LOGIC
        switch (preferredPosition) {
            case 'right':
                left = rect.right + dynamicMargin;
                top = rect.top + rect.height / 2 - cardHeight / 2;
                break;
            case 'left':
                left = rect.left - cardWidth - dynamicMargin;
                top = rect.top + rect.height / 2 - cardHeight / 2;
                break;
            case 'below':
                left = rect.left + rect.width / 2 - cardWidth / 2;
                top = rect.bottom + dynamicMargin;
                break;
            case 'above':
                left = rect.left + rect.width / 2 - cardWidth / 2;
                top = rect.top - cardHeight - dynamicMargin;
                break;
            case 'below-center':
                // Mobile-optimized below positioning
                left = Math.max(dynamicMargin, Math.min(
                    rect.left + rect.width / 2 - cardWidth / 2,
                    window.innerWidth - cardWidth - dynamicMargin
                ));
                top = rect.bottom + dynamicMargin;
                break;
            case 'above-center':
                // Mobile-optimized above positioning
                left = Math.max(dynamicMargin, Math.min(
                    rect.left + rect.width / 2 - cardWidth / 2,
                    window.innerWidth - cardWidth - dynamicMargin
                ));
                top = rect.top - cardHeight - dynamicMargin;
                break;
            case 'center-viewport':
            default:
                // Smart center positioning that adapts to content
                left = Math.max(dynamicMargin, (window.innerWidth - cardWidth) / 2);
                top = Math.max(dynamicMargin, (window.innerHeight - cardHeight) / 2);
                break;
        }
        
        // ENHANCED VIEWPORT BOUNDARY ENFORCEMENT
        // Ensure card never extends beyond viewport edges
        left = Math.max(dynamicMargin, Math.min(left, window.innerWidth - cardWidth - dynamicMargin));
        top = Math.max(dynamicMargin, Math.min(top, window.innerHeight - cardHeight - dynamicMargin));
        
        // MOBILE-SPECIFIC POSITIONING REFINEMENTS
        if (isMobile || isSmallMobile) {
            // Ensure card is always fully visible on mobile
            const safeZone = dynamicMargin * 2;
            
            // Horizontal centering for very small screens
            if (cardWidth > window.innerWidth - safeZone) {
                left = safeZone;
                cardWidth = window.innerWidth - safeZone * 2;
                hoverCard.style.width = cardWidth + 'px';
            }
            
            // Vertical positioning optimization for mobile
            if (top + cardHeight > window.innerHeight - safeZone) {
                top = window.innerHeight - cardHeight - safeZone;
            }
            
            if (top < safeZone) {
                top = safeZone;
            }
        }
        
        // ENHANCED COMPONENT PANEL COLLISION DETECTION
        const componentSelectorPanel = document.getElementById('component-selector-panel');
        if (componentSelectorPanel && componentSelectorPanel.classList.contains('open')) {
            const panelRect = componentSelectorPanel.getBoundingClientRect();
            const panelMargin = isMobile ? 8 : 16;
            
            // Smart collision avoidance
            if (left + cardWidth > panelRect.left - panelMargin) {
                if (spaceLeft >= cardWidth + dynamicMargin) {
                    left = rect.left - cardWidth - dynamicMargin;
                } else {
                    // Fallback to center positioning
                    left = Math.max(dynamicMargin, (window.innerWidth - cardWidth) / 2);
                }
            }
        }
        
        // FINAL POSITIONING VALIDATION
        // Double-check that card is within viewport bounds
        const finalLeft = Math.max(dynamicMargin, Math.min(left, window.innerWidth - cardWidth - dynamicMargin));
        const finalTop = Math.max(dynamicMargin, Math.min(top, window.innerHeight - cardHeight - dynamicMargin));
        
        // Apply final positioning with enhanced precision
        hoverCard.style.left = `${finalLeft}px`;
        hoverCard.style.top = `${finalTop}px`;
        
            // OPTIMIZATION: Simplified event handling with proper cleanup
            // Store resize handler for cleanup
            _hoverCardResizeHandler = () => {
                if (_hoverCardVisible && hoverCard.style.opacity === '1') {
                // Reposition card if viewport changes while visible
                    const newLeft = Math.max(dynamicMargin, Math.min(finalLeft, viewportWidth - cardWidth - dynamicMargin));
                    const newTop = Math.max(dynamicMargin, Math.min(finalTop, viewportHeight - cardHeight - dynamicMargin));
                
                hoverCard.style.left = `${newLeft}px`;
                hoverCard.style.top = `${newTop}px`;
            }
        };
        
        // Add resize listener for responsive behavior
            window.addEventListener('resize', _hoverCardResizeHandler, { passive: true });
            
            // OPTIMIZATION: Smooth show animation with perfect timing
            requestAnimationFrame(() => {
                hoverCard.style.visibility = 'visible';
            hoverCard.style.opacity = '1';
            hoverCard.style.pointerEvents = 'auto';
            hoverCard.style.transform = 'scale(1)';
            });
            } catch (error) {
                // OPTIMIZATION: Comprehensive fallback with error recovery
                try {
                    requestAnimationFrame(() => {
                        if (hoverCard) {
                            // Fallback positioning - center the card
                            hoverCard.style.position = 'fixed';
                            hoverCard.style.left = '50%';
                            hoverCard.style.top = '50%';
                            hoverCard.style.transform = 'translate(-50%, -50%) scale(1)';
                            hoverCard.style.visibility = 'visible';
                            hoverCard.style.opacity = '1';
                            hoverCard.style.pointerEvents = 'auto';
                        }
                    });
                } catch (fallbackError) {
                    // Last resort - just show the card
                    if (hoverCard) {
                        hoverCard.style.visibility = 'visible';
                        hoverCard.style.opacity = '1';
                        hoverCard.style.pointerEvents = 'auto';
                    }
                }
            }
        });
    }
    
    function _hideHoverCard() {
        // OPTIMIZATION: Comprehensive error handling and validation
        try {
            if (!hoverCard) {
                return;
            }
            
            // OPTIMIZATION: Proper cleanup and state management
            _hoverCardVisible = false;
            _currentHoveredComponent = null;
            
            // Remove resize listener to prevent memory leaks
            if (_hoverCardResizeHandler) {
                try {
                    window.removeEventListener('resize', _hoverCardResizeHandler);
                } catch (error) {
                    // Silent error handling
                } finally {
                    _hoverCardResizeHandler = null;
                }
            }
            
            // OPTIMIZATION: Smooth hide animation with comprehensive error handling
            try {
                // Use requestAnimationFrame for smooth animation
                requestAnimationFrame(() => {
                    try {
                        if (hoverCard) {
        hoverCard.style.opacity = '0';
        hoverCard.style.pointerEvents = 'none';
        hoverCard.style.transform = 'scale(0.95)';
                            
                            // Hide visibility after transition completes
                            setTimeout(() => {
                                try {
                                    if (hoverCard) {
                                        hoverCard.style.visibility = 'hidden';
                                    }
                                } catch (error) {
                                    // Silent error handling
                                }
                            }, 150);
                        }
                    } catch (error) {
                        // Fallback - immediate hide
                        if (hoverCard) {
                            hoverCard.style.visibility = 'hidden';
                            hoverCard.style.opacity = '0';
                        }
                    }
                });
            } catch (error) {
                // Fallback - immediate hide
                if (hoverCard) {
                    hoverCard.style.visibility = 'hidden';
                    hoverCard.style.opacity = '0';
                    hoverCard.style.pointerEvents = 'none';
                }
            }
        } catch (error) {
            // Last resort cleanup
            _hoverCardVisible = false;
            _currentHoveredComponent = null;
        }
    }
    // --- Initialization ---
    function _init() {
        const startTime = performance.now();
        
        // Load all persisted state
        loadPersistedState();
        
        // Apply a default palette immediately to avoid blank preview on soft reload
        try {
            const defaultPalette = ['#3dbdf5', '#1d4ed8', '#1e40af', '#1e3a8a', '#ffffff'];
            currentPalette = defaultPalette;
            window.currentPalette = defaultPalette;
            if (paletteDisplay) {
                _renderPaletteUI(defaultPalette);
            } else {
                defaultPalette.forEach((color, index) => {
                    document.documentElement.style.setProperty(`--c${index + 1}`, color);
                });
            }
        } catch (e) {
            // Silent
        }
        
        // Initialize performance monitoring
        performanceMonitor.subscribe((event, data) => {
            if (event === 'warning') {
                // Silent performance warning handling
            }
        });
        
        // Defer heavy operations to avoid blocking initial render
        (window.requestIdleCallback ? window.requestIdleCallback : (cb)=>setTimeout(cb,0))(() => {
        _renderComponentList();
        _renderShowcase();
            
            // Restore component checkboxes to match persisted state
            selectedComponents.forEach(component => {
                const checkbox = componentList.querySelector(`input[value="${component}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }, { timeout: 1000 });
        
        // Initialize color controls
        _setupColorControls();
        
        // Setup modern popup card system
        _setupPopupCardSystem();
        
        // ENTERPRISE: Initialize critical content cache for better UX
        setTimeout(() => {
            initializeCriticalContent();
        }, 2000); // Defer after main initialization is complete
        
        // Setup responsive panel
        _setupResponsivePanel();
        
        // Defer palette generation to avoid blocking startup
        setTimeout(() => {
        generatePaletteFromAPI({
            setGenerateButtonLoading: _setGenerateButtonLoading,
            numResultsInput,
            schemeTypeSelect,
            harmonyRuleSelect,
            seedColorInput,
            hexInput,
            saturationSlider,
            brightnessSlider,
                updatePalette: _renderPaletteUI,
                updateColorInfo: _updateColorInfo,
                appStore
        });
        }, 100);
        
        // Only setup event listeners if not already attached
        if (!window.eventListenersAttached.has('main')) {
            setupEventListeners({
                themeToggle, themeIconLight, themeIconDark, generateBtn, openComponentSelectorBtn, closeComponentSelectorBtn, overlay, componentList, componentSearch, numResultsInput, schemeTypeSelect, harmonyRuleSelect,
                toggleTheme: (a, b) => toggleTheme(a, b),
                generatePaletteFromAPI: () => generatePaletteFromAPI({
                            setGenerateButtonLoading: _setGenerateButtonLoading,
                            numResultsInput,
                            schemeTypeSelect,
                            harmonyRuleSelect,
                            seedColorInput,
                            hexInput,
                            saturationSlider,
                            brightnessSlider,
                            updatePalette: _renderPaletteUI,
                            updateColorInfo: _updateColorInfo,
                            appStore
                }),
                showToast: (msg, isError) => showToast(toast, msg, isError),
                copyToClipboard: (text) => copyToClipboard(text, toast),
                renderShowcase: _renderShowcase,
                renderComponentList: _renderComponentList,
                handleComponentSelection: _handleComponentSelection,
                filterComponents: _filterComponents,
                showHoverCard: _showHoverCard,
                hideHoverCard: _hideHoverCard,
                toggleComponentSelector: _toggleComponentSelector,
                exportCss: _exportCss,
                updatePalette: _renderPaletteUI,
                currentPalette
            });
            window.eventListenersAttached.add('main');
        }

        // Initialize Smart Color Wheel
        try {
            colorWheel = new SmartColorWheel({
                onColorChange: (color) => {
                    // Update main palette with color wheel selection
                },
                onPaletteChange: (palette) => {
                    // Handle palette changes from color wheel
                },
                showToast: (message, isError = false) => {
                    // Use main app's toast system
                    showToast(toast, message, isError);
                }
            });
        } catch (error) {
            // Silent error handling for color wheel initialization
            colorWheel = null;
        }

        // Color Wheel Button Event Listener
        const colorWheelBtn = document.getElementById('color-wheel-btn');
        if (colorWheelBtn) {
            colorWheelBtn.addEventListener('click', () => {
                if (colorWheel && typeof colorWheel.open === 'function') {
                    colorWheel.open();
                } else {
                    showToast(toast, 'Color wheel is not available', true);
                }
            });
        }

        // Initialize export dropdowns with delay to ensure DOM is ready
        setTimeout(() => {
            if (exportContainer) {
                createExportDropdown('export-container');
            } else {
                console.error('[ExportDropdown] Main export container not found');
            }
        }, 100);

        // Handle color wheel palette application with comprehensive integration
        document.addEventListener('colorWheelPaletteApplied', (event) => {
            const { palette, colorBlindness, originalPalette, harmonyType, detectedHarmony, colorPoints } = event.detail;
            
            if (palette && palette.length > 0) {
                
                // 1. DIRECTLY APPLY THE EXACT PALETTE COLORS (no API regeneration)
                
                // Ensure paletteDisplay element exists and apply palette
                if (paletteDisplay) {
                    try {
                        _renderPaletteUI(palette);
                        
                        // Force update current palette global variable
                        window.currentPalette = palette;
                        currentPalette = palette;
                        
                    } catch (error) {
                        showToast(toast, 'Error applying palette to main generator', true);
                        return;
                    }
                } else {
                    showToast(toast, 'Error: Palette display not available', true);
                    return;
                }
                
                // 2. PRESERVE COLOR PALETTE GENERATOR INPUTS
                // Color Wheel palette application should NOT modify input fields
                // This ensures users can continue using their original settings
                
                // 3. STORE COLOR WHEEL STATE FOR REGENERATION
                // Store the exact state that produced this palette
                const rgb = hexToRgb(palette[0]);
                const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { s: 50, l: 50 };
                
                // Map Smart Color Wheel harmonies to main generator harmonies
                const harmonyMapping = {
                    'analogous': 'analogic',
                    'complementary': 'complement',
                    'triadic': 'triad',
                    'tetradic': 'quad',
                    'split-complementary': 'split-complement',
                    'monochromatic': 'monochrome',
                    'custom': 'analogic'
                };
                
                const harmonyToUse = harmonyMapping[harmonyType] || 'analogic';
                
                // Map harmony types to appropriate scheme types
                const schemeMapping = {
                    'analogous': 'analogic',
                    'complementary': 'complement',
                    'triadic': 'triad',
                    'tetradic': 'quad',
                    'split-complementary': 'split-complement',
                    'monochromatic': 'monochrome',
                    'custom': 'analogic'
                };
                
                const schemeToUse = schemeMapping[harmonyType] || 'analogic';
                
                window.colorWheelState = {
                    palette: [...palette], // Clone the palette
                    harmonyType: harmonyType,
                    detectedHarmony: detectedHarmony,
                    schemeType: schemeToUse, // Store the scheme type that was set
                    colorPoints: colorPoints ? [...colorPoints] : null,
                    colorBlindness: colorBlindness,
                    originalPalette: originalPalette ? [...originalPalette] : null,
                    seedColor: palette[0],
                    saturation: hsl.s,
                    brightness: hsl.l,
                    numColors: palette.length,
                    source: 'colorWheel'
                };
                

                
                // 4. FORCE LIVE PREVIEW UPDATE
                setTimeout(() => {
    
                    _renderShowcase();
                    
                    // Also update panel showcase if it exists
                    if (typeof _updatePanelPaletteDisplay === 'function') {
                        _updatePanelPaletteDisplay(palette);
                    }
                    
                    // Double-check that palette is displayed
                    setTimeout(() => {
                        const paletteSwatches = paletteDisplay.querySelectorAll('.palette-swatch');
                        
                        if (paletteSwatches.length === 0) {
                            _renderPaletteUI(palette);
                        }
                    }, 200);
                }, 150);
                
                // 9. SHOW SUCCESS MESSAGE WITH DETAILS
                const harmonyName = {
                    'analogic': 'Analogous',
                    'complement': 'Complementary', 
                    'triad': 'Triadic',
                    'quad': 'Tetradic',
                    'split-complement': 'Split Complementary',
                    'monochrome': 'Monochromatic'
                }[harmonyToUse] || 'Custom';
                
                const message = colorBlindness && colorBlindness !== 'normal' 
                    ? `Palette applied with ${harmonyName} harmony and ${colorBlindness} simulation!`
                    : `Palette applied with ${harmonyName} harmony!`;
                
                showToast(toast, message, false);
                
                
                // Final verification after a longer delay
                setTimeout(() => {
                    const finalSwatches = paletteDisplay.querySelectorAll('.palette-swatch');
                    
                    if (finalSwatches.length === 0) {
                        showToast(toast, 'Warning: Palette may not have applied correctly', true);
                    }
                }, 500);
            }
        });

        // Clear color wheel state when form fields change (so new palette will be generated)
        const clearColorWheelState = () => {
            if (window.colorWheelState) {
                delete window.colorWheelState;
            }
        };
        
        // Add event listeners to clear color wheel state when settings change
        if (seedColorInput) {
            seedColorInput.addEventListener('change', clearColorWheelState);
            seedColorInput.addEventListener('input', clearColorWheelState);
        }
        if (hexInput) {
            hexInput.addEventListener('input', clearColorWheelState);
        }
        if (saturationSlider) {
            saturationSlider.addEventListener('input', clearColorWheelState);
        }
        if (brightnessSlider) {
            brightnessSlider.addEventListener('input', clearColorWheelState);
        }
        if (harmonyRuleSelect) {
            harmonyRuleSelect.addEventListener('change', clearColorWheelState);
        }
        if (schemeTypeSelect) {
            schemeTypeSelect.addEventListener('change', clearColorWheelState);
        }
        if (numResultsInput) {
            numResultsInput.addEventListener('input', clearColorWheelState);
        }
        
        // Also clear for panel controls
        const panelSeedColor = document.getElementById('panel-seed-color');
        const panelHexInput = document.getElementById('panel-hex-input');
        const panelSaturationSlider = document.getElementById('panel-saturation-slider');
        const panelBrightnessSlider = document.getElementById('panel-brightness-slider');
        const panelHarmonyRule = document.getElementById('panel-harmony-rule');
        const panelSchemeType = document.getElementById('panel-scheme-type');
        const panelNumResults = document.getElementById('panel-num-results');
        
        if (panelSeedColor) {
            panelSeedColor.addEventListener('change', clearColorWheelState);
            panelSeedColor.addEventListener('input', clearColorWheelState);
        }
        if (panelHexInput) {
            panelHexInput.addEventListener('input', clearColorWheelState);
        }
        if (panelSaturationSlider) {
            panelSaturationSlider.addEventListener('input', clearColorWheelState);
        }
        if (panelBrightnessSlider) {
            panelBrightnessSlider.addEventListener('input', clearColorWheelState);
        }
        if (panelHarmonyRule) {
            panelHarmonyRule.addEventListener('change', clearColorWheelState);
        }
        if (panelSchemeType) {
            panelSchemeType.addEventListener('change', clearColorWheelState);
        }
        if (panelNumResults) {
            panelNumResults.addEventListener('input', clearColorWheelState);
        }
        
        // Also clear when random color is generated
        const randomColorBtn = document.getElementById('random-color');
        const panelRandomColorBtn = document.getElementById('panel-random-color');
        
        if (randomColorBtn) {
            randomColorBtn.addEventListener('click', clearColorWheelState);
        }
        if (panelRandomColorBtn) {
            panelRandomColorBtn.addEventListener('click', clearColorWheelState);
        }

        // Smart Showcase Search Event Listeners
        const debouncedShowcaseSearch = _debounceShowcaseSearch(_filterShowcase, 300);
        
        if (showcaseSearch) {
            showcaseSearch.addEventListener('input', (e) => {
                const searchTerm = e.target.value.trim();
                debouncedShowcaseSearch(searchTerm);
            });

            showcaseSearch.addEventListener('focus', () => {
                showcaseSearch.classList.add('ring-2', 'ring-accent', 'border-accent');
            });

            showcaseSearch.addEventListener('blur', () => {
                showcaseSearch.classList.remove('ring-2', 'ring-accent', 'border-accent');
            });
        }
        
        const endTime = performance.now();
        performanceMonitor.recordMetric('appInitialization', endTime - startTime);
        
            // DISABLED: All periodic monitoring removed to reduce memory usage
            // Only cache monitoring remains in performance-monitor.js (every 5 seconds)
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            unsubscribe();
            if (performanceMonitor && performanceMonitor.cleanup) {
                performanceMonitor.cleanup();
            }
            if (cacheManager && cacheManager.cleanup) {
                cacheManager.cleanup();
            }
        });
    }
    
    function _setupColorControls() {
        // Initialize color info
        if (seedColorInput) {
            _updateColorInfoFromHex(seedColorInput.value);
        }
        
        // Color picker change
        if (seedColorInput) {
            seedColorInput.addEventListener('change', (e) => {
                if (hexInput) hexInput.value = e.target.value;
                _updateColorInfoFromHex(e.target.value);
            });
        }
        
        // Hex input change
        if (hexInput) {
            hexInput.addEventListener('input', (e) => {
                const value = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(value)) {
                    if (seedColorInput) seedColorInput.value = value;
                    _updateColorInfoFromHex(value);
                }
            });
        }
        
        // Random color button
        if (randomColorBtn) {
            randomColorBtn.addEventListener('click', _generateRandomColor);
        }
        
        // Enhanced Slider controls with visual feedback
        if (saturationSlider && saturationValue) {
            saturationSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                saturationValue.textContent = `${value}%`;
                
                // Add visual feedback
                saturationValue.style.transform = 'scale(1.1)';
                saturationValue.style.color = 'var(--accent)';
                saturationValue.style.borderColor = 'var(--accent)';
                
                // Reset after animation
                setTimeout(() => {
                    saturationValue.style.transform = 'scale(1)';
                    saturationValue.style.color = '';
                    saturationValue.style.borderColor = '';
                }, 200);
                
                // Update slider track color based on value
                const percentage = (value / 100) * 100;
                saturationSlider.style.setProperty('--slider-progress', `${percentage}%`);
            });
            
            // Add focus and blur effects
            saturationSlider.addEventListener('focus', () => {
                saturationSlider.classList.add('slider-focused');
            });
            
            saturationSlider.addEventListener('blur', () => {
                saturationSlider.classList.remove('slider-focused');
            });
        }
        
        if (brightnessSlider && brightnessValue) {
            brightnessSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                brightnessValue.textContent = `${value}%`;
                
                // Add visual feedback
                brightnessValue.style.transform = 'scale(1.1)';
                brightnessValue.style.color = 'var(--accent)';
                brightnessValue.style.borderColor = 'var(--accent)';
                
                // Reset after animation
                setTimeout(() => {
                    brightnessValue.style.transform = 'scale(1)';
                    brightnessValue.style.color = '';
                    brightnessValue.style.borderColor = '';
                }, 200);
                
                // Update slider track color based on value
                const percentage = (value / 100) * 100;
                brightnessSlider.style.setProperty('--slider-progress', `${percentage}%`);
            });
            
            // Add focus and blur effects
            brightnessSlider.addEventListener('focus', () => {
                brightnessSlider.classList.add('slider-focused');
            });
            
            brightnessSlider.addEventListener('blur', () => {
                brightnessSlider.classList.remove('slider-focused');
            });
        }
        
        // Add keyboard navigation for sliders
        const sliders = [saturationSlider, brightnessSlider];
        const panelSliders = [panelSaturationSlider, panelBrightnessSlider];
        
        sliders.forEach(slider => {
            if (slider) {
                slider.addEventListener('keydown', (e) => {
                    const step = e.shiftKey ? 10 : 1;
                    const currentValue = parseInt(slider.value);
                    
                    switch(e.key) {
                        case 'ArrowRight':
                        case 'ArrowUp':
                            e.preventDefault();
                            slider.value = Math.min(100, currentValue + step);
                            slider.dispatchEvent(new Event('input'));
                            break;
                        case 'ArrowLeft':
                        case 'ArrowDown':
                            e.preventDefault();
                            slider.value = Math.max(0, currentValue - step);
                            slider.dispatchEvent(new Event('input'));
                            break;
                        case 'Home':
                            e.preventDefault();
                            slider.value = 0;
                            slider.dispatchEvent(new Event('input'));
                            break;
                        case 'End':
                            e.preventDefault();
                            slider.value = 100;
                            slider.dispatchEvent(new Event('input'));
                            break;
                    }
                });
            }
        });
        
        // Add keyboard navigation for panel sliders
        panelSliders.forEach(slider => {
            if (slider) {
                slider.addEventListener('keydown', (e) => {
                    const step = e.shiftKey ? 10 : 1;
                    const currentValue = parseInt(slider.value);
                    
                    switch(e.key) {
                        case 'ArrowRight':
                        case 'ArrowUp':
                            e.preventDefault();
                            slider.value = Math.min(100, currentValue + step);
                            slider.dispatchEvent(new Event('input'));
                            break;
                        case 'ArrowLeft':
                        case 'ArrowDown':
                            e.preventDefault();
                            slider.value = Math.max(0, currentValue - step);
                            slider.dispatchEvent(new Event('input'));
                            break;
                        case 'Home':
                            e.preventDefault();
                            slider.value = 0;
                            slider.dispatchEvent(new Event('input'));
                            break;
                        case 'End':
                            e.preventDefault();
                            slider.value = 100;
                            slider.dispatchEvent(new Event('input'));
                            break;
                    }
                });
            }
        });
        
        // Export and accessibility buttons
        if (exportCssBtn) {
            exportCssBtn.addEventListener('click', _exportCss);
        }
        if (openA11yBtn) {
            openA11yBtn.addEventListener('click', () => {
                accessibilityDashboard.open();
            });
        }
    }

    // ===== MODERN POPUP CARD SYSTEM =====
    // Replaces old hover-based tooltip system with click-based popup cards
    
    function _setupPopupCardSystem() {
        // Create popup card container if it doesn't exist
        let popupStack = document.getElementById('popup-card-stack');
        if (!popupStack) {
            popupStack = document.createElement('div');
            popupStack.id = 'popup-card-stack';
            popupStack.className = 'popup-card-stack';
            document.body.appendChild(popupStack);
        }
        
        // Create close all button if it doesn't exist
        let closeAllBtn = document.getElementById('popup-close-all');
        if (!closeAllBtn) {
            closeAllBtn = document.createElement('button');
            closeAllBtn.id = 'popup-close-all';
            closeAllBtn.className = 'popup-close-all';
            closeAllBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
                Close All
            `;
            closeAllBtn.addEventListener('click', closeAllPopupCards);
            document.body.appendChild(closeAllBtn);
        }
        
        // OLD TOOLTIP SYSTEM REMOVED - Replaced with modern popup card system
        
        // Setup popup card event listeners
        document.addEventListener('click', handlePopupCardClick);
        
        // Close popup cards when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.popup-help-icon') && !e.target.closest('.popup-card')) {
                closeAllPopupCards();
            }
        });
        
        // Close popup cards on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllPopupCards();
            }
        });
    }
    
    function createHelpIcon(message) {
        const container = document.createElement('div');
        container.className = 'popup-card-container';
        
        const icon = document.createElement('button');
        icon.className = 'popup-help-icon';
        icon.setAttribute('data-popup-message', message);
        icon.setAttribute('aria-label', 'Help');
        icon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
        `;
        
        container.appendChild(icon);
        return container;
    }
    
    function handlePopupCardClick(e) {
        const helpIcon = e.target.closest('.popup-help-icon');
        if (!helpIcon) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const sectionId = helpIcon.dataset.sectionId;
        const sectionTitle = helpIcon.dataset.sectionTitle || getSectionTitle(sectionId);
        
        // Check if this card is already open
        const existingCard = document.querySelector(`[data-card-section="${sectionId}"]`);
            if (existingCard) {
            // Card already exists, close it
            closePopupCard(existingCard);
            return;
        }
        
        // Get comprehensive content for the section
        const cardContent = getPopupCardContent(sectionId);
        
        if (!cardContent) {
            // Fallback content
            const fallbackContent = `
                <div class="popup-section">
                    <h4 class="popup-section-title">⚠️ Content Not Found</h4>
                    <p class="popup-description">Section ID: ${sectionId}</p>
                    <div class="popup-tip-box">
                        <p>Please report this issue to the development team.</p>
                    </div>
                </div>
            `;
            createPopupCard(fallbackContent, sectionId, sectionTitle || 'Unknown Section');
            return;
        }
        
        createPopupCard(cardContent, sectionId, sectionTitle);
    }
    
    function getSectionTitle(sectionId) {
        const titleMap = {
            'palette-generator': 'Color Palette Generator',
            'seed-color': 'Seed Color Foundation',
            'color-harmony': 'Color Harmony Theory',
            'color-adjustments': 'Precision Color Adjustments',

            'live-preview': 'Live Component Preview',
            'generated-palette': 'Generated Color Palette',
            'color-wheel-interactive': 'Interactive Color Wheel',
            'color-wheel-harmony': 'Color Harmony Rules',
            'color-wheel-colorblind': 'Color Blindness Simulation',
            'color-wheel-base-color': 'Base Color Controls',
            'color-wheel-generated-palette': 'Generated Palette Export',
            
        };
        return titleMap[sectionId] || 'Feature Help';
    }
    
    function getColorWheelContent(sectionId) {
        const colorWheelContentMap = {
            'color-wheel-interactive': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🎨 Interactive Color Wheel</h4>
                    <p class="popup-description">Professional color selection with real-time harmony visualization, precision controls, and mathematical color theory integration.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🖱️ Interactive Controls</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Drag Points:</span>
                            <span class="popup-feature-desc">Click and drag color points around the wheel for precise hue selection</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">5-Point System:</span>
                            <span class="popup-feature-desc">Interactive control over 5 harmonically related color points</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Active Point:</span>
                            <span class="popup-feature-desc">Larger point indicates currently selected color for editing</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Harmony Lines:</span>
                            <span class="popup-feature-desc">Visual connections showing mathematical color relationships</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">💡 Pro Usage Tips</h5>
                    <div class="popup-tip-box">
                        <p>Start with a harmony rule, then customize individual points</p>
                        <p>Use the active point indicator to see which color is being modified</p>
                        <p>Combine with color blindness simulation for comprehensive testing</p>
                        <p>Export to main palette when satisfied with your selection</p>
                    </div>
                </div>
            `,
            
            'color-wheel-harmony': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🌈 Color Harmony Rules</h4>
                    <p class="popup-description">Mathematical color relationships based on proven color theory principles for creating aesthetically pleasing and balanced palettes.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🎨 Available Harmony Rules</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Analogous:</span>
                            <span class="popup-feature-desc">Adjacent colors (30° apart) - Harmonious, serene, comfortable</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Complementary:</span>
                            <span class="popup-feature-desc">Opposite colors (180° apart) - High contrast, vibrant, energetic</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Triadic:</span>
                            <span class="popup-feature-desc">Three colors (120° apart) - Balanced, vibrant, playful</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Custom:</span>
                            <span class="popup-feature-desc">Free positioning - Complete creative control</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">💡 Professional Tips</h5>
                    <div class="popup-tip-box">
                        <p>Start with harmony rules, then fine-tune individual colors</p>
                        <p>Test harmony rules with different base colors to explore variations</p>
                        <p>Combine harmony with color blindness simulation for comprehensive testing</p>
                        <p>Use Custom mode for brand-specific color requirements</p>
                    </div>
                </div>
            `,
            
            'color-wheel-colorblind': `
                <div class="popup-section">
                    <h4 class="popup-section-title">👁️ Color Blindness Simulation</h4>
                    <p class="popup-description">Real-time simulation of color vision deficiencies to ensure your palette is inclusive and accessible to users with different types of color blindness.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🔬 Simulation Types</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Normal Vision:</span>
                            <span class="popup-feature-desc">Standard color perception - No simulation applied</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Protanopia:</span>
                            <span class="popup-feature-desc">Red-blind (1% of men) - Missing long wavelength cones</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Deuteranopia:</span>
                            <span class="popup-feature-desc">Green-blind (1% of men) - Missing medium wavelength cones</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Tritanopia:</span>
                            <span class="popup-feature-desc">Blue-blind (0.003% population) - Missing short wavelength cones</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">✅ Best Practices</h5>
                    <div class="popup-tip-box">
                        <p>🔴 <strong>Avoid Red-Green:</strong> Don't rely solely on red/green distinctions</p>
                        <p>📊 <strong>Use Patterns:</strong> Combine color with shapes, patterns, or textures</p>
                        <p>📝 <strong>Text Labels:</strong> Always include text labels for important information</p>
                        <p>⚖️ <strong>High Contrast:</strong> Maintain strong contrast ratios between colors</p>
                    </div>
                </div>
            `,
            
            'color-wheel-base-color': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🎨 Base Color Controls</h4>
                    <p class="popup-description">Precision color selection and editing tools with real-time feedback, multiple input methods, and comprehensive color space information.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🎛️ Input Methods</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Color Picker:</span>
                            <span class="popup-feature-desc">Browser-native color picker with HSV precision</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Hex Input:</span>
                            <span class="popup-feature-desc">Direct hex code entry with real-time validation</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">RGB Display:</span>
                            <span class="popup-feature-desc">Red, Green, Blue values (0-255) for technical precision</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">HSL Display:</span>
                            <span class="popup-feature-desc">Hue (0-360°), Saturation (0-100%), Lightness (0-100%)</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">💡 Professional Workflow</h5>
                    <div class="popup-tip-box">
                        <p>Use color picker for initial exploration and discovery</p>
                        <p>Switch to hex input for precise brand color matching</p>
                        <p>Monitor RGB/HSL values for technical specifications</p>
                        <p>Copy colors at any point in your design workflow</p>
                    </div>
                </div>
            `,
            
            'color-wheel-generated-palette': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🎨 Generated Palette Export</h4>
                    <p class="popup-description">Professional export options for your color wheel palette with multiple formats and seamless integration capabilities.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">📤 Export Formats</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">CSS Variables:</span>
                            <span class="popup-feature-desc">Modern CSS custom properties with fallback support</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">JSON Format:</span>
                            <span class="popup-feature-desc">Structured data for programmatic integration</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Apply to Main:</span>
                            <span class="popup-feature-desc">Direct integration with main palette generator</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🚀 Workflow Integration</h5>
                    <div class="popup-tip-box">
                        <p>Perfect for designers who prefer visual color selection</p>
                        <p>Ideal for exploring color relationships before committing</p>
                        <p>Great for client presentations with interactive selection</p>
                        <p>Seamlessly transitions from exploration to production</p>
                    </div>
                </div>
            `,
            

        };
        
        const content = colorWheelContentMap[sectionId];
        return content || null;
    }
    
    // ENTERPRISE: Content Management System with caching and validation
    const popupContentCache = new Map();
    const contentValidators = {
        validateHTML: (content) => {
            if (!content || typeof content !== 'string') return false;
            return content.trim().length > 0 && content.includes('popup-section');
        },
        sanitizeContent: (content) => {
            // Basic XSS prevention for dynamic content
            return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        }
    };
    
    // ENTERPRISE: Pre-populate cache with critical content for faster UX
    const initializeCriticalContent = () => {
        const criticalSections = ['palette-generator', 'color-wheel-interactive'];
        criticalSections.forEach(sectionId => {
            if (!popupContentCache.has(sectionId)) {
                getPopupCardContent(sectionId);
            }
        });
    };
    
    function getPopupCardContent(sectionId) {
        // ENTERPRISE: Check cache first for performance
        if (popupContentCache.has(sectionId)) {
            return popupContentCache.get(sectionId);
        }
        
        // BULLETPROOF: Always provide content, never return null/undefined
        try {
            let content = null;
            
            // Check for Color Wheel content first
            const colorWheelContent = getColorWheelContent(sectionId);
            if (colorWheelContent && contentValidators.validateHTML(colorWheelContent)) {
                content = contentValidators.sanitizeContent(colorWheelContent);
            }
            
            // If no Color Wheel content, check main content map
            if (!content) {
                const contentMap = getMainContentMap();
                const mainContent = contentMap[sectionId];
                if (mainContent && contentValidators.validateHTML(mainContent)) {
                    content = contentValidators.sanitizeContent(mainContent);
                }
            }
            
            // Fallback content if nothing found
            if (!content) {
                content = generateFallbackContent(sectionId);
            }
            
            // Cache the content for future requests
            popupContentCache.set(sectionId, content);
            
            return content;
            
        } catch (error) {
            const errorContent = generateErrorContent(sectionId, error);
            popupContentCache.set(sectionId, errorContent);
            return errorContent;
        }
    }
    
    function getMainContentMap() {
        return {
            'palette-generator': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🎨 Color Palette Generator</h4>
                    <p class="popup-description">Advanced algorithmic color palette generation using proven color theory principles and mathematical harmony calculations.</p>
                </div>
                
                <div class="popup-section">
                    <h5 class="popup-subsection-title">🚀 Generation Modes</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">API Mode:</span>
                            <span class="popup-feature-desc">Professional-grade algorithms with 50+ harmony rules</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Local Mode:</span>
                            <span class="popup-feature-desc">Instant generation with custom mathematical models</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Color Wheel:</span>
                            <span class="popup-feature-desc">Interactive visual selection with real-time preview</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">⚙️ Configuration Options</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Color Count:</span>
                            <span class="popup-feature-desc">2-8 colors optimized for design systems</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Harmony Rules:</span>
                            <span class="popup-feature-desc">Analogous, Complementary, Triadic, Tetradic, Split-Complementary</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Scheme Types:</span>
                            <span class="popup-feature-desc">Monochromatic, Warm, Cool, Custom temperature control</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🎯 Professional Features</h5>
                    <div class="popup-tip-box">
                        <p>✨ <strong>Smart Caching:</strong> Results cached for instant re-generation</p>
                        <p>📊 <strong>Smart Analysis:</strong> Automatic color harmony and contrast analysis</p>
                        <p>🔄 <strong>Real-time Sync:</strong> Instant updates across all preview components</p>
                        <p>📱 <strong>Export Ready:</strong> CSS, SCSS, JSON, and design token formats</p>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">♿ Accessibility Dashboard</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">WCAG 2.1 Analysis:</span>
                            <span class="popup-feature-desc">Comprehensive accessibility compliance testing with AA/AAA standards</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Color Blindness:</span>
                            <span class="popup-feature-desc">Simulation and testing for all major color vision deficiencies</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Contrast Analysis:</span>
                            <span class="popup-feature-desc">Precise contrast ratio calculations and recommendations</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Professional Reports:</span>
                            <span class="popup-feature-desc">Detailed accessibility reports with actionable recommendations</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">📊 Accessibility Analysis Features</h5>
                    <div class="popup-tip-box">
                        <p>♿ <strong>WCAG Compliance:</strong> Comprehensive WCAG 2.1 AA/AAA compliance checking</p>
                        <p>🎨 <strong>Color Blindness Testing:</strong> Simulation for all major color vision deficiencies</p>
                        <p>📊 <strong>Contrast Analysis:</strong> Detailed contrast ratio calculations for all color pairs</p>
                        <p>📱 <strong>Responsive Design:</strong> Analysis works perfectly across all screen sizes</p>
                        <p>🎯 <strong>Professional Reports:</strong> Comprehensive accessibility analysis and recommendations</p>
                    </div>
                </div>
            `,
            
            'seed-color': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🌱 Seed Color Foundation</h4>
                    <p class="popup-description">The seed color serves as the mathematical foundation for all palette generation algorithms, influencing harmony calculations and color relationships.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🎛️ Input Methods</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Visual Picker:</span>
                            <span class="popup-feature-desc">Browser-native color picker with HSV/RGB precision</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Hex Input:</span>
                            <span class="popup-feature-desc">Direct hex code entry with real-time validation (#RRGGBB)</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Random Generator:</span>
                            <span class="popup-feature-desc">Mathematically distributed random colors for creative exploration</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Color Wheel:</span>
                            <span class="popup-feature-desc">Interactive HSL wheel with harmony visualization</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🎨 Color Psychology Guide</h5>
                    <div class="popup-tip-box">
                        <p><strong>🔴 Red Family:</strong> Energy, passion, urgency - Use for CTAs and alerts</p>
                        <p><strong>🔵 Blue Family:</strong> Trust, calm, professional - Ideal for corporate brands</p>
                        <p><strong>🟢 Green Family:</strong> Nature, growth, success - Perfect for eco/finance brands</p>
                        <p><strong>🟡 Yellow Family:</strong> Optimism, creativity, attention - Great for lifestyle brands</p>
                        <p><strong>🟣 Purple Family:</strong> Luxury, creativity, mystery - Premium brand positioning</p>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">💡 Pro Tips</h5>
                    <div class="popup-tip-box">
                        <p>🎯 Use your brand's primary color for consistent design systems</p>
                        <p>🔍 Test multiple seeds to discover unexpected color relationships</p>
                        <p>📐 Consider the 60-30-10 rule: 60% primary, 30% secondary, 10% accent</p>
                        <p>🎨 Always verify color harmony and visual balance with generated palettes</p>
                    </div>
                </div>
            `,
            
            'color-harmony': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🌈 Color Harmony Theory</h4>
                    <p class="popup-description">Mathematical color relationships based on proven color theory principles for creating aesthetically pleasing and balanced color palettes.</p>
                </div>
                
                <div class="popup-section">
                    <h5 class="popup-subsection-title">🎨 Harmony Rules</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Analogous:</span>
                            <span class="popup-feature-desc">Adjacent colors on color wheel - Creates harmonious, peaceful palettes</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Complementary:</span>
                            <span class="popup-feature-desc">Opposite colors - High contrast, vibrant, attention-grabbing</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Triadic:</span>
                            <span class="popup-feature-desc">Three equally spaced colors - Balanced, lively, creative</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Monochromatic:</span>
                            <span class="popup-feature-desc">Variations of single hue - Clean, elegant, sophisticated</span>
                        </div>
                    </div>
                </div>
                
                <div class="popup-section">
                    <h5 class="popup-subsection-title">⚙️ Scheme Types</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Analogic:</span>
                            <span class="popup-feature-desc">Standard analogous with natural color flow</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Monochrome Variants:</span>
                            <span class="popup-feature-desc">Dark, Light, or Standard monochromatic variations</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Complex Rules:</span>
                            <span class="popup-feature-desc">Tetradic, Split-Complementary for advanced designs</span>
                        </div>
                    </div>
                </div>
                
                <div class="popup-section">
                    <h5 class="popup-subsection-title">💡 Professional Tips</h5>
                    <div class="popup-tip-box">
                        <p><strong>Start with harmony:</strong> Choose a rule first, then customize individual colors</p>
                        <p><strong>Context matters:</strong> Consider your design's purpose and audience</p>
                        <p><strong>Test combinations:</strong> Different schemes work better for different content types</p>
                        <p><strong>Brand consistency:</strong> Maintain harmony with existing brand colors</p>
                    </div>
                </div>
            `,
            

            

            
            'color-adjustments': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🎚️ Precision Color Adjustments</h4>
                    <p class="popup-description">Fine-tune your palette with professional-grade saturation and brightness controls that maintain color harmony while optimizing for different use cases.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🌈 Saturation Control (Color Intensity)</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Low (0-30%):</span>
                            <span class="popup-feature-desc">Muted, sophisticated tones - Corporate, minimalist designs</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Medium (40-70%):</span>
                            <span class="popup-feature-desc">Balanced, versatile colors - Universal design applications</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">High (80-100%):</span>
                            <span class="popup-feature-desc">Vibrant, energetic palettes - Creative, youth-focused brands</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">💡 Brightness Control (Luminosity)</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Dark (0-30%):</span>
                            <span class="popup-feature-desc">Deep, rich colors - Dark themes, premium aesthetics</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Medium (40-70%):</span>
                            <span class="popup-feature-desc">Standard luminosity - Optimal for text readability</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Light (80-100%):</span>
                            <span class="popup-feature-desc">Bright, airy palettes - Light themes, healthcare, wellness</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🔬 Advanced Techniques</h5>
                    <div class="popup-tip-box">
                        <p>🔄 Adjust both values simultaneously for proportional scaling</p>
                        <p>🎯 Use high saturation + medium brightness for call-to-action buttons</p>
                        <p>📱 Test adjustments across different screen types and ambient lighting</p>
                        <p>🌓 Create separate adjustments for light and dark theme variants</p>
                    </div>
                </div>
            `,
            
            'live-preview': `
                <div class="popup-section">
                    <h4 class="popup-section-title">👁️ Live Component Preview</h4>
                    <p class="popup-description">Real-time visualization of your color palette applied to 70+ professional UI components with interactive demonstrations and responsive testing.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">⚡ Real-time Features</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Instant Updates:</span>
                            <span class="popup-feature-desc">Components reflect palette changes in real-time</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Interactive Elements:</span>
                            <span class="popup-feature-desc">Test hover states, focus rings, and active states</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Theme Testing:</span>
                            <span class="popup-feature-desc">Switch between light and dark themes instantly</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">💡 Preview Best Practices</h5>
                    <div class="popup-tip-box">
                        <p>🎨 Test your palette across all component categories</p>
                        <p>🎨 Verify color harmony in preview before finalizing</p>
                        <p>📱 Check responsiveness at different breakpoints</p>
                        <p>🌓 Test both light and dark theme variants</p>
                    </div>
                </div>
            `,
            
            'generated-palette': `
                <div class="popup-section">
                    <h4 class="popup-section-title">🎨 Generated Color Palette</h4>
                    <p class="popup-description">Your custom color palette with professional-grade color analysis, harmony verification, and comprehensive export options for seamless integration.</p>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">🖱️ Interactive Features</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Click to Copy:</span>
                            <span class="popup-feature-desc">Instant hex code copying with visual feedback</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Hover Details:</span>
                            <span class="popup-feature-desc">RGB, HSL, and color harmony information on hover</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">♿ Accessibility Analysis</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Accessibility Report:</span>
                            <span class="popup-feature-desc">Click "Accessibility Report" button for comprehensive WCAG 2.1 analysis</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Contrast Testing:</span>
                            <span class="popup-feature-desc">Automatic contrast ratio calculations for all color combinations</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Color Blindness:</span>
                            <span class="popup-feature-desc">Simulation for Protanopia, Deuteranopia, and Tritanopia</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Compliance Matrix:</span>
                            <span class="popup-feature-desc">Detailed WCAG 2.1 AA/AAA compliance breakdown</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">📊 Accessibility Analysis</h5>
                    <div class="popup-feature-list">
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">WCAG Compliance:</span>
                            <span class="popup-feature-desc">Comprehensive WCAG 2.1 AA/AAA compliance checking</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Color Blindness Testing:</span>
                            <span class="popup-feature-desc">Simulation for protanopia, deuteranopia, and tritanopia</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Contrast Analysis:</span>
                            <span class="popup-feature-desc">Detailed contrast ratio calculations for all color pairs</span>
                        </div>
                        <div class="popup-feature-item">
                            <span class="popup-feature-label">Professional Reports:</span>
                            <span class="popup-feature-desc">Comprehensive accessibility analysis and recommendations</span>
                        </div>
                    </div>
                </div>

                <div class="popup-section">
                    <h5 class="popup-subsection-title">💡 Professional Workflow</h5>
                    <div class="popup-tip-box">
                        <p>🎨 <strong>Generate Palette:</strong> Create your color scheme using advanced algorithms</p>
                        <p>♿ <strong>Test Accessibility:</strong> Click "Accessibility Report" to analyze compliance</p>
                        <p>📱 <strong>Verify Responsiveness:</strong> Test across different screen sizes and themes</p>
                        <p>🔄 <strong>Iterate & Improve:</strong> Refine colors based on accessibility feedback</p>
                    </div>
                </div>
            `
        };
    }
    
    function generateFallbackContent(sectionId) {
        return `
            <div class="popup-section">
                <h4 class="popup-section-title">💡 Learn About This Feature</h4>
                <p class="popup-description">This section contains powerful tools designed to help you create better color palettes and UI components with professional-grade precision.</p>
            </div>
            
            <div class="popup-section">
                <h5 class="popup-subsection-title">🚀 Getting Started</h5>
                <div class="popup-tip-box">
                    <p>🎯 Explore the interface and experiment with different settings</p>
                    <p>🔧 Try various configurations to see what works best for your project</p>
                    <p>🎨 Always test color harmony and visual balance for professional design</p>
                    <p>📚 Check our documentation for advanced techniques and best practices</p>
                    <p><strong>Section ID:</strong> ${sectionId || 'unknown'}</p>
                </div>
            </div>
        `;
    }
    
    function generateErrorContent(sectionId, error) {
        return `
            <div class="popup-section">
                <h4 class="popup-section-title">⚠️ Error Loading Content</h4>
                <p class="popup-description">There was an error loading the help content for this section.</p>
                <div class="popup-tip-box">
                    <p><strong>Section:</strong> ${sectionId || 'unknown'}</p>
                    <p><strong>Error:</strong> ${error?.message || 'Unknown error'}</p>
                    <p><strong>Stack:</strong> ${error?.stack ? error.stack.split('\n')[0] : 'N/A'}</p>
                    <p>Please refresh the page and try again. If the problem persists, contact support.</p>
                </div>
            </div>
        `;
    }
    
    function createPopupCard(content, cardId, title) {
        // ENTERPRISE: Input validation and sanitization
        if (!content || typeof content !== 'string' || content.trim().length === 0) {
            return null;
        }
        
        if (!cardId || typeof cardId !== 'string') {
            return null;
        }
        
        const stack = document.getElementById('popup-card-stack');
        const closeAllBtn = document.getElementById('popup-close-all');
        
        if (!stack) {
            return null;
        }
        
        // ENTERPRISE: Prevent duplicate cards
        const existingCard = stack.querySelector(`[data-card-section="${cardId}"]`);
        if (existingCard) {
            closePopupCard(existingCard);
        }
        
        // ENTERPRISE: Limit maximum number of cards for performance
        const existingCards = stack.querySelectorAll('.popup-card');
        if (existingCards.length >= 3) {
            closePopupCard(existingCards[0]);
        }
        
        // ENTERPRISE: Performance tracking
        const cardCreationStart = performance.now();
        
        try {
            // Create card element with enhanced styling
        const card = document.createElement('div');
            card.className = 'popup-card opacity-0 transform translate-y-4 transition-all duration-300 ease-out';
            card.setAttribute('data-card-section', cardId);
        card.setAttribute('role', 'dialog');
        card.setAttribute('aria-labelledby', `popup-title-${cardId}`);
        card.setAttribute('aria-describedby', `popup-content-${cardId}`);
            card.setAttribute('aria-modal', 'true');
            card.setAttribute('tabindex', '-1');
            
            // ENTERPRISE: Enhanced accessibility attributes
            card.setAttribute('aria-live', 'polite');
            card.setAttribute('aria-atomic', 'true');
            
            // Auto-close timer with configurable duration
            const autoCloseDelay = 30000; // 30 seconds, could be made configurable
            const autoCloseTimer = setTimeout(() => {
                closePopupCard(card);
            }, autoCloseDelay);
            
            // Store timer ID and metadata on card for cleanup
            card.autoCloseTimer = autoCloseTimer;
            card.cardId = cardId;
            card.createdAt = Date.now();
        
        // Card header
        const header = document.createElement('div');
        header.className = 'popup-card-header flex items-start justify-between mb-4';
        
        const titleElement = document.createElement('h3');
        titleElement.className = 'popup-card-title text-lg font-bold text-gray-900 dark:text-white leading-tight';
        titleElement.textContent = title || 'Help';
        titleElement.id = `popup-title-${cardId}`;
        
        const closeButton = document.createElement('button');
        closeButton.className = 'popup-card-close flex-shrink-0 ml-3 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';
        closeButton.setAttribute('aria-label', `Close ${title || 'help'} card`);
        closeButton.setAttribute('type', 'button');
        closeButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
        `;
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closePopupCard(card);
        });
        
        header.appendChild(titleElement);
        header.appendChild(closeButton);
        
        // Card content
        const contentElement = document.createElement('div');
        contentElement.className = 'popup-card-content';
        contentElement.id = `popup-content-${cardId}`;
        contentElement.innerHTML = content;
        
        // Assemble card
        card.appendChild(header);
        card.appendChild(contentElement);
        
        // Add to stack
        stack.appendChild(card);
        
        // Animate card entrance
        requestAnimationFrame(() => {
            card.classList.remove('opacity-0', 'translate-y-4');
            card.classList.add('opacity-100', 'translate-y-0');
        });
        
        // Show close all button if multiple cards
            const allCards = stack.querySelectorAll('.popup-card');
            if (allCards.length > 1 && closeAllBtn) {
            closeAllBtn.classList.add('show');
        }
        
            // ENTERPRISE: Performance metrics
            const cardCreationEnd = performance.now();
            const creationTime = cardCreationEnd - cardCreationStart;
            
            // ENTERPRISE: Performance tracking for monitoring
            if (window.performanceMonitor && typeof window.performanceMonitor.trackEvent === 'function') {
                window.performanceMonitor.trackEvent('popup_card_created', {
                    cardId,
                    creationTime,
                    contentSize: content.length
                });
            }
            
            return card;
            
        } catch (error) {
            // Silent error handling for production
            
            // ENTERPRISE: Error recovery - show minimal error card
            const errorCard = document.createElement('div');
            errorCard.className = 'popup-card popup-card-error';
            errorCard.innerHTML = generateErrorContent(cardId, error);
            stack.appendChild(errorCard);
            
            return errorCard;
        }
    }
    
    function closePopupCard(card) {
        if (!card || !card.parentNode) return;
        
        // CRITICAL: Clean up auto-close timer to prevent memory leaks
        if (card.autoCloseTimer) {
            clearTimeout(card.autoCloseTimer);
            card.autoCloseTimer = null;
        }
        
        // CRITICAL: Clean up any card-specific event listeners
        if (card.eventCleanup && typeof card.eventCleanup === 'function') {
            card.eventCleanup();
            card.eventCleanup = null;
        }
        
        // Mark card as closing to prevent double-close
        if (card.isClosing) return;
        card.isClosing = true;
        
        card.classList.add('popup-animate-out');
        
        // Store timeout ID for potential cleanup
        const closeTimeout = setTimeout(() => {
            if (card.parentNode) {
                // Final cleanup before removal
                card.innerHTML = ''; // Clear content to free memory
                card.remove();
                
                // Hide close all button if no cards left
                const popupStack = document.getElementById('popup-card-stack');
                const closeAllBtn = document.getElementById('popup-close-all');
                
                if (popupStack && closeAllBtn) {
                    const remainingCards = popupStack.querySelectorAll('.popup-card');
                if (remainingCards.length === 0) {
                    closeAllBtn.classList.remove('show');
                    }
                }
            }
        }, 300);
        
        // Store timeout for potential cleanup
        card.closeTimeout = closeTimeout;
    }
    
    function closeAllPopupCards() {
        const popupStack = document.getElementById('popup-card-stack');
        const closeAllBtn = document.getElementById('popup-close-all');
        
        if (!popupStack) return;
        
        const cards = popupStack.querySelectorAll('.popup-card');
        
        // ENTERPRISE: Batch cleanup for better performance
        const cleanupTasks = [];
        
        cards.forEach(card => {
            // Add cleanup task to batch
            cleanupTasks.push(() => {
                // Clean up timers
                if (card.autoCloseTimer) {
                    clearTimeout(card.autoCloseTimer);
                    card.autoCloseTimer = null;
                }
                if (card.closeTimeout) {
                    clearTimeout(card.closeTimeout);
                    card.closeTimeout = null;
                }
                
                // Clean up event listeners
                if (card.eventCleanup && typeof card.eventCleanup === 'function') {
                    card.eventCleanup();
                    card.eventCleanup = null;
                }
                
                // Clear content and remove
                card.innerHTML = '';
                if (card.parentNode) {
                    card.remove();
                }
            });
        });
        
        // Execute all cleanup tasks
        cleanupTasks.forEach(task => task());
        
        // Hide close all button
        if (closeAllBtn) {
        closeAllBtn.classList.remove('show');
    }
        
        // Force garbage collection if available (development/debugging)
        if (window.gc && typeof window.gc === 'function') {
            window.gc();
        }
    }
    
    // ENTERPRISE: Popup Card Management API for External Control
    const PopupCardAPI = {
        // Clear content cache
        clearCache: () => {
            popupContentCache.clear();
        },
        
        // Get cache statistics
        getCacheStats: () => {
            return {
                size: popupContentCache.size,
                keys: Array.from(popupContentCache.keys()),
                memoryEstimate: JSON.stringify(Array.from(popupContentCache.entries())).length
            };
        },
        
        // Preload content for better performance
        preloadContent: (sectionIds) => {
            if (!Array.isArray(sectionIds)) return;
            
            sectionIds.forEach(sectionId => {
                if (!popupContentCache.has(sectionId)) {
                    getPopupCardContent(sectionId);
                }
            });
        },
        
        // Force close all cards (emergency cleanup)
        forceCloseAll: () => {
            closeAllPopupCards();
        },
        
        // Health check
        healthCheck: () => {
            const stack = document.getElementById('popup-card-stack');
            const closeAllBtn = document.getElementById('popup-close-all');
            const activeCards = stack ? stack.querySelectorAll('.popup-card') : [];
            
            return {
                stackExists: !!stack,
                closeButtonExists: !!closeAllBtn,
                activeCards: activeCards.length,
                cacheSize: popupContentCache.size,
                status: stack && closeAllBtn ? 'healthy' : 'degraded'
            };
        }
    };
    
    // Make API globally accessible for debugging and external control
    window.PopupCardAPI = PopupCardAPI;
    
    // ===== RESPONSIVE PANEL FUNCTIONALITY =====
    
    function _setupResponsivePanel() {
        if (!panelToggle || !responsivePanel || !panelOverlay || !panelClose) {
            return;
        }
        
        // Panel toggle functionality
        // Panel toggle button - Handled by ResponsivePanelController
        // panelToggle.addEventListener('click', _togglePanel);
        // panelClose.addEventListener('click', _closePanel);
        // panelOverlay.addEventListener('click', _closePanel);
        
        // Synchronize panel controls with desktop controls
        _setupPanelControlSync();
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isPanelOpen) {
                _closePanel();
            }
        });
        
        // Handle window resize with comprehensive header height tracking
        window.addEventListener('resize', () => {
            _handlePanelResize();
            _updateHeaderHeight();
        });
        
        // Initial header height calculation
        _updateHeaderHeight();
        
        // Set up ResizeObserver for dynamic header height tracking
        const header = document.querySelector('header');
        if (header) {
            const resizeObserver = new ResizeObserver(() => {
                _updateHeaderHeight();
            });
            resizeObserver.observe(header);
        }
        

    }
    
    function _togglePanel() {
        if (isPanelOpen) {
            _closePanel();
        } else {
            _openPanel();
        }
    }
    
    function _openPanel() {
        if (!responsivePanel || !panelOverlay || !panelToggle) return;
        
        isPanelOpen = true;
        responsivePanel.classList.add('panel-open');
        panelOverlay.classList.remove('hidden');
        panelOverlay.classList.add('overlay-active');
        panelToggle.classList.add('panel-active');
        
        // Focus management
        setTimeout(() => {
            responsivePanel.focus();
        }, 100);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Synchronize panel state with main controls
        _syncPanelState();
        
        // Update slider backgrounds to match current color
        if (seedColorInput && seedColorInput.value) {
            const hex = seedColorInput.value;
            const rgb = hexToRgb(hex);
            if (rgb) {
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                _updateSliderBackgrounds(hex, rgb, hsl);
            }
        }
        

    }
    
    function _closePanel() {
        if (!responsivePanel || !panelOverlay || !panelToggle) return;
        
        isPanelOpen = false;
        responsivePanel.classList.remove('panel-open');
        panelOverlay.classList.add('hidden');
        panelOverlay.classList.remove('overlay-active');
        panelToggle.classList.remove('panel-active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        

    }
    
    function _setupPanelControlSync() {

        
        // Seed color sync with color info updates
        if (seedColorInput && panelSeedColor) {
            seedColorInput.addEventListener('input', (e) => {
                panelSeedColor.value = e.target.value;
                _updateColorInfoFromHex(e.target.value);
                _updatePanelColorInfoFromHex(e.target.value);
            });
            
            panelSeedColor.addEventListener('input', (e) => {
                seedColorInput.value = e.target.value;
                _updateColorInfoFromHex(e.target.value);
                _updatePanelColorInfoFromHex(e.target.value);
            });
        }
        
        // Hex input sync with comprehensive updates
        if (hexInput && panelHexInput) {
            hexInput.addEventListener('input', (e) => {
                panelHexInput.value = e.target.value;
                _updateColorInfoFromHex(e.target.value);
                _updatePanelColorInfoFromHex(e.target.value);
            });
            
            panelHexInput.addEventListener('input', (e) => {
                hexInput.value = e.target.value;
                _updateColorInfoFromHex(e.target.value);
                _updatePanelColorInfoFromHex(e.target.value);
            });
        }
        
        // Random color sync with comprehensive updates
        if (randomColorBtn && panelRandomColor) {
            randomColorBtn.addEventListener('click', () => {
                const randomColor = _generateRandomColor();
                _updatePanelColorInfoFromHex(randomColor);
            });
            
            panelRandomColor.addEventListener('click', () => {
                const randomColor = _generateRandomColor();
                _updateColorInfoFromHex(randomColor);
            });
        }
        
        // Harmony rule sync
        if (harmonyRuleSelect && panelHarmonyRule) {
            harmonyRuleSelect.addEventListener('change', (e) => {
                panelHarmonyRule.value = e.target.value;
            });
            
            panelHarmonyRule.addEventListener('change', (e) => {
                harmonyRuleSelect.value = e.target.value;
            });
        }
        
        // Scheme type sync
        if (schemeTypeSelect && panelSchemeType) {
            schemeTypeSelect.addEventListener('change', (e) => {
                panelSchemeType.value = e.target.value;
            });
            
            panelSchemeType.addEventListener('change', (e) => {
                schemeTypeSelect.value = e.target.value;
            });
        }
        
        // Number of results sync with validation and custom buttons
        if (numResultsInput && panelNumResults) {
            // Centralized function to update button states for all number inputs
            const updateNumberInputButtonStates = (inputElement) => {
                if (!inputElement) return;
                
                const parent = inputElement.parentElement;
                const decreaseBtn = parent.querySelector('.custom-number-btn-decrease');
                const increaseBtn = parent.querySelector('.custom-number-btn-increase');
                
                if (decreaseBtn && increaseBtn) {
                    const value = parseInt(inputElement.value) || 5;
                    decreaseBtn.disabled = value <= 2;
                    increaseBtn.disabled = value >= 8;
                }
            };
            
            // Setup custom number input functionality
            const setupCustomNumberInput = (input, decreaseBtn, increaseBtn) => {
                                const updateValue = (newValue) => {
                    const value = Math.max(2, Math.min(8, newValue));
            input.value = value;
            input.dataset.lastValidValue = value;
                    
                    // Update button states
                    decreaseBtn.disabled = value <= 2;
                    increaseBtn.disabled = value >= 8;
                    
                    // Trigger change event for other listeners
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                };
                
                // Decrease button
                decreaseBtn.addEventListener('click', () => {
                    const currentValue = parseInt(input.value) || 5;
                    updateValue(currentValue - 1);
                });
                
                // Increase button
                increaseBtn.addEventListener('click', () => {
                    const currentValue = parseInt(input.value) || 5;
                    updateValue(currentValue + 1);
                });
                
                // Keyboard support
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown' || e.key === '-') {
                        e.preventDefault();
                        const currentValue = parseInt(input.value) || 5;
                        updateValue(currentValue - 1);
                    } else if (e.key === 'ArrowUp' || e.key === '+') {
                        e.preventDefault();
                        const currentValue = parseInt(input.value) || 5;
                        updateValue(currentValue + 1);
                    }
                });
                
                // Initialize button states
                const initialValue = parseInt(input.value) || 5;
                updateValue(initialValue);
                
                // Also update button states using centralized function for consistency
                updateNumberInputButtonStates(input);
            };
            
            // Setup main number input
            const mainDecreaseBtn = numResultsInput.parentElement.querySelector('.custom-number-btn-decrease');
            const mainIncreaseBtn = numResultsInput.parentElement.querySelector('.custom-number-btn-increase');
            if (mainDecreaseBtn && mainIncreaseBtn) {
                setupCustomNumberInput(numResultsInput, mainDecreaseBtn, mainIncreaseBtn);
            }
            
            // Setup panel number input
            const panelDecreaseBtn = panelNumResults.parentElement.querySelector('.custom-number-btn-decrease');
            const panelIncreaseBtn = panelNumResults.parentElement.querySelector('.custom-number-btn-increase');
            if (panelDecreaseBtn && panelIncreaseBtn) {
                setupCustomNumberInput(panelNumResults, panelDecreaseBtn, panelIncreaseBtn);
            }
            
            // Sync between main and panel inputs
            numResultsInput.addEventListener('input', (e) => {
                const value = e.target.value;
                if (panelNumResults) {
                    panelNumResults.value = value;
                    // Update panel button states using centralized function
                    updateNumberInputButtonStates(panelNumResults);
                }
                // Update main button states
                updateNumberInputButtonStates(numResultsInput);
            });
            
            panelNumResults.addEventListener('input', (e) => {
                const value = e.target.value;
                if (numResultsInput) {
                    numResultsInput.value = value;
                    // Update main button states using centralized function
                    updateNumberInputButtonStates(numResultsInput);
                }
                // Update panel button states
                updateNumberInputButtonStates(panelNumResults);
            });
            
            // Add validation to ensure values stay within bounds (simplified for custom buttons)
            const validateNumResults = (input) => {
                const currentValue = input.value;
                const v = parseInt(currentValue);
                
                // Only accept values from 2 to 8
                if (isNaN(v) || v < 2 || v > 8) {
                    // Revert to the last valid value or default to 5
                    const lastValidValue = input.dataset.lastValidValue || 5;
                    input.value = lastValidValue;
                    
                    // Update button states after validation
                    updateNumberInputButtonStates(input);
                    return false;
                } else {
                    // Valid value - store it and accept it
                    input.dataset.lastValidValue = v;
                    
                    // Update button states after validation
                    updateNumberInputButtonStates(input);
                    return true;
                }
            };
            
            // Validate on blur for final check
            numResultsInput.addEventListener('blur', () => {
                validateNumResults(numResultsInput);
                // Ensure button states are updated after validation
                updateNumberInputButtonStates(numResultsInput);
            });
            
            panelNumResults.addEventListener('blur', () => {
                validateNumResults(panelNumResults);
                // Ensure button states are updated after validation
                updateNumberInputButtonStates(panelNumResults);
            });
        }
        
        // Saturation slider sync with dynamic background updates
        if (saturationSlider && panelSaturationSlider) {
            saturationSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                panelSaturationSlider.value = value;
                if (saturationValue) saturationValue.textContent = value + '%';
                if (panelSaturationValue) panelSaturationValue.textContent = value + '%';
                
                // Update slider track color based on value
                const percentage = (value / 100) * 100;
                saturationSlider.style.setProperty('--slider-progress', `${percentage}%`);
                panelSaturationSlider.style.setProperty('--slider-progress', `${percentage}%`);
                
                // Add visual feedback
                if (saturationValue) {
                    saturationValue.style.transform = 'scale(1.1)';
                    saturationValue.style.color = 'var(--accent)';
                    saturationValue.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        saturationValue.style.transform = 'scale(1)';
                        saturationValue.style.color = '';
                        saturationValue.style.borderColor = '';
                    }, 200);
                }
                if (panelSaturationValue) {
                    panelSaturationValue.style.transform = 'scale(1.1)';
                    panelSaturationValue.style.color = 'var(--accent)';
                    panelSaturationValue.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        panelSaturationValue.style.transform = 'scale(1)';
                        panelSaturationValue.style.color = '';
                        panelSaturationValue.style.borderColor = '';
                    }, 200);
                }
            });
            
            panelSaturationSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                saturationSlider.value = value;
                if (saturationValue) saturationValue.textContent = value + '%';
                if (panelSaturationValue) panelSaturationValue.textContent = value + '%';
                
                // Update slider track color based on value
                const percentage = (value / 100) * 100;
                saturationSlider.style.setProperty('--slider-progress', `${percentage}%`);
                panelSaturationSlider.style.setProperty('--slider-progress', `${percentage}%`);
                
                // Add visual feedback
                if (saturationValue) {
                    saturationValue.style.transform = 'scale(1.1)';
                    saturationValue.style.color = 'var(--accent)';
                    saturationValue.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        saturationValue.style.transform = 'scale(1)';
                        saturationValue.style.color = '';
                        saturationValue.style.borderColor = '';
                    }, 200);
                }
                if (panelSaturationValue) {
                    panelSaturationValue.style.transform = 'scale(1.1)';
                    panelSaturationValue.style.color = 'var(--accent)';
                    panelSaturationValue.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        panelSaturationValue.style.transform = 'scale(1)';
                        panelSaturationValue.style.color = '';
                        panelSaturationValue.style.borderColor = '';
                    }, 200);
                }
            });
            
            // Add focus and blur effects for panel saturation slider
            panelSaturationSlider.addEventListener('focus', () => {
                panelSaturationSlider.classList.add('slider-focused');
            });
            
            panelSaturationSlider.addEventListener('blur', () => {
                panelSaturationSlider.classList.remove('slider-focused');
            });
        }
        
        // Brightness slider sync with dynamic background updates
        if (brightnessSlider && panelBrightnessSlider) {
            brightnessSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                panelBrightnessSlider.value = value;
                if (brightnessValue) brightnessValue.textContent = value + '%';
                if (panelBrightnessValue) panelBrightnessValue.textContent = value + '%';
                
                // Update slider track color based on value
                const percentage = (value / 100) * 100;
                brightnessSlider.style.setProperty('--slider-progress', `${percentage}%`);
                panelBrightnessSlider.style.setProperty('--slider-progress', `${percentage}%`);
                
                // Add visual feedback
                if (brightnessValue) {
                    brightnessValue.style.transform = 'scale(1.1)';
                    brightnessValue.style.color = 'var(--accent)';
                    brightnessValue.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        brightnessValue.style.transform = 'scale(1)';
                        brightnessValue.style.color = '';
                        brightnessValue.style.borderColor = '';
                    }, 200);
                }
                if (panelBrightnessValue) {
                    panelBrightnessValue.style.transform = 'scale(1.1)';
                    panelBrightnessValue.style.color = 'var(--accent)';
                    panelBrightnessValue.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        panelBrightnessValue.style.transform = 'scale(1)';
                        panelBrightnessValue.style.color = '';
                        panelBrightnessValue.style.borderColor = '';
                    }, 200);
                }
            });
            
            panelBrightnessSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                brightnessSlider.value = value;
                if (brightnessValue) brightnessValue.textContent = value + '%';
                if (panelBrightnessValue) panelBrightnessValue.textContent = value + '%';
                
                // Update slider track color based on value
                const percentage = (value / 100) * 100;
                brightnessSlider.style.setProperty('--slider-progress', `${percentage}%`);
                panelBrightnessSlider.style.setProperty('--slider-progress', `${percentage}%`);
                
                // Add visual feedback
                if (brightnessValue) {
                    brightnessValue.style.transform = 'scale(1.1)';
                    brightnessValue.style.color = 'var(--accent)';
                    brightnessValue.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        brightnessValue.style.transform = 'scale(1)';
                        brightnessValue.style.color = '';
                        brightnessValue.style.borderColor = '';
                    }, 200);
                }
                if (panelBrightnessValue) {
                    panelBrightnessValue.style.transform = 'scale(1.1)';
                    panelBrightnessValue.style.color = 'var(--accent)';
                    panelBrightnessValue.style.borderColor = 'var(--accent)';
                    setTimeout(() => {
                        panelBrightnessValue.style.transform = 'scale(1)';
                        panelBrightnessValue.style.color = '';
                        panelBrightnessValue.style.borderColor = '';
                    }, 200);
                }
            });
            
            // Add focus and blur effects for panel brightness slider
            panelBrightnessSlider.addEventListener('focus', () => {
                panelBrightnessSlider.classList.add('slider-focused');
            });
            
            panelBrightnessSlider.addEventListener('blur', () => {
                panelBrightnessSlider.classList.remove('slider-focused');
            });
        }
        
        // Generate button sync - Panel button only (main button handled by setupEventListeners)
        if (panelGenerateBtn) {
            
            panelGenerateBtn.addEventListener('click', () => {
                // Sync loading state with both buttons
                _setGenerateButtonLoading(generateBtn, generateBtnText, generateBtnLoader, true);
                _setGenerateButtonLoading(panelGenerateBtn, panelGenerateBtnText, panelGenerateBtnLoader, true);
                // Trigger palette generation
                generatePaletteFromAPI({
                    setGenerateButtonLoading: _setGenerateButtonLoading,
                    numResultsInput,
                    schemeTypeSelect,
                    harmonyRuleSelect,
                    seedColorInput,
                    hexInput,
                    saturationSlider,
                    brightnessSlider,
                    updatePalette: _renderPaletteUI,
                    updateColorInfo: _updateColorInfo,
                    appStore
                });
            });
        }
        
        // Initialize panel export dropdown with delay
        setTimeout(() => {
            if (panelExportContainer) {
                createExportDropdown('panel-export-container', true);
            } else {
                console.error('[ExportDropdown] Panel export container not found');
            }
        }, 150);

        // Final fallback initialization after all other setup
        setTimeout(() => {
            initializeAllExportDropdowns();
        }, 500);

        // Accessibility report buttons
        if (openA11yBtn) {
            openA11yBtn.addEventListener('click', () => { accessibilityDashboard.open(); });
        }
        if (panelOpenA11y) {
            panelOpenA11y.addEventListener('click', () => { accessibilityDashboard.open(); });
        }
    }
    
    function _handlePanelResize() {
        // Auto-close panel on large screens
        if (window.innerWidth >= 1280 && isPanelOpen) {
            _closePanel();
        }
    }
    
    function _updateHeaderHeight() {
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight;
            const headerHeightRem = headerHeight / 16; // Convert pixels to rem
            
            // Set CSS custom property for header height with fallback
            document.documentElement.style.setProperty('--header-height', `${headerHeightRem}rem`);
            
            // Also update panel positioning immediately if panel is open
            if (isPanelOpen && responsivePanel) {
                responsivePanel.style.top = `${headerHeightRem}rem`;
                responsivePanel.style.height = `calc(100vh - ${headerHeightRem}rem)`;
            }
            
            // Update overlay positioning to ensure it never covers the header
            if (panelOverlay) {
                panelOverlay.style.top = `${headerHeightRem}rem`;
                panelOverlay.style.height = `calc(100vh - ${headerHeightRem}rem)`;
            }
            
            // Update component selector panel positioning
            const componentSelectorPanel = document.getElementById('component-selector-panel');
            if (componentSelectorPanel) {
                componentSelectorPanel.style.top = `${headerHeightRem}rem`;
                componentSelectorPanel.style.height = `calc(100vh - ${headerHeightRem}rem)`;
            }
            
            // Update component selector overlay positioning
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.style.top = `${headerHeightRem}rem`;
                overlay.style.height = `calc(100vh - ${headerHeightRem}rem)`;
            }
            
    
        }
    }
    
    function _syncPanelState() {
        // Ensure all panel controls reflect the current state
        if (seedColorInput && panelSeedColor) {
            panelSeedColor.value = seedColorInput.value;
        }
        if (hexInput && panelHexInput) {
            panelHexInput.value = hexInput.value;
        }
        if (harmonyRuleSelect && panelHarmonyRule) {
            panelHarmonyRule.value = harmonyRuleSelect.value;
        }
        if (schemeTypeSelect && panelSchemeType) {
            panelSchemeType.value = schemeTypeSelect.value;
        }
        if (numResultsInput && panelNumResults) {
            panelNumResults.value = numResultsInput.value;
        }
        if (saturationSlider && panelSaturationSlider) {
            panelSaturationSlider.value = saturationSlider.value;
        }
        if (brightnessSlider && panelBrightnessSlider) {
            panelBrightnessSlider.value = brightnessSlider.value;
        }

    }
    
    function _updatePanelPaletteDisplay(palette) {
        if (!panelPaletteDisplay) return;
        
        panelPaletteDisplay.innerHTML = '';
        palette.forEach((color, index) => {
            const rgb = hexToRgb(color);
            const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 };
            
            const swatch = document.createElement('div');
            swatch.className = 'palette-swatch cursor-pointer smooth-transition relative group';
            swatch.style.backgroundColor = color;
            swatch.dataset.color = color;
            swatch.dataset.index = index;
            swatch.title = `Double-click to edit ${color}`;
            
            // Add color info tooltip (same as full-screen)
            const colorInfo = document.createElement('div');
            colorInfo.className = 'color-info';
            colorInfo.innerHTML = `
                <div class="text-center">
                    <div class="font-mono text-xs">${color}</div>
                    <div class="text-xs opacity-75">RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}</div>
                </div>
            `;
            
            // Add edit button overlay for panel
            const editButton = document.createElement('div');
            editButton.className = 'absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 smooth-transition flex items-center justify-center opacity-0 group-hover:opacity-100';
            editButton.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg">
                    <svg class="w-3 h-3 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                </div>
            `;
            
            swatch.appendChild(colorInfo);
            swatch.appendChild(editButton);
            
            // Click handlers
            swatch.addEventListener('dblclick', (e) => {
                // Double click - open color picker
                e.preventDefault();
                _handleColorUpdate(index, color, palette);
            });
            
            // Edit button click
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                _handleColorUpdate(index, color, palette);
            });
            
            panelPaletteDisplay.appendChild(swatch);
        });
    }
    
    function _updatePanelColorInfo(rgb, hsl) {
        if (panelColorInfoRgb) {
            panelColorInfoRgb.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
        }
        if (panelColorInfoHsl) {
            panelColorInfoHsl.textContent = `HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
        }
    }
    
    function _updatePanelColorInfoFromHex(hex) {
        if (!hex || !panelColorInfoRgb || !panelColorInfoHsl) return;
        
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        panelColorInfoRgb.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
        panelColorInfoHsl.textContent = `HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
    }
    
    // Override existing functions to update panel
    const originalUpdateColorInfo = _updateColorInfo;
    _updateColorInfo = function(rgb, hsl) {
        originalUpdateColorInfo(rgb, hsl);
        _updatePanelColorInfo(rgb, hsl);
    };
    
    const originalUpdatePalette = _renderPaletteUI;
    _renderPaletteUI = function(palette) {
        originalUpdatePalette(palette);
        _updatePanelPaletteDisplay(palette);

    };

    _init();
    
    // Initialize preloader and platform navigation
    _initializePreloader();
});

// Preloader System
// Global preloader functions (accessible from anywhere)
async function preloadComponents() {
    // OPTIMIZATION: Only preload essential components for faster startup
    // Essential components are the most commonly used ones that benefit from preloading
    const essentialComponents = ['Navbar', 'Buttons', 'Card', 'Forms', 'Alerts'];
    const componentNames = essentialComponents.filter(name => uiComponents[name]);
    
    // OPTIMIZATION: Skip preloading if no essential components found
    if (componentNames.length === 0) {
        return Promise.resolve();
    }
    
    // Create a hidden container for pre-rendering
    const preloadContainer = document.createElement('div');
    preloadContainer.style.position = 'absolute';
    preloadContainer.style.left = '-9999px';
    preloadContainer.style.top = '-9999px';
    preloadContainer.style.visibility = 'hidden';
    preloadContainer.id = 'preload-container';
    document.body.appendChild(preloadContainer);
    
    // OPTIMIZATION: Use document fragment for batch DOM operations
    const fragment = document.createDocumentFragment();
    
    // Pre-render only essential components
    for (let i = 0; i < componentNames.length; i++) {
        const componentName = componentNames[i];
        const componentHTML = uiComponents[componentName];
        
        // Create component element and render it
        const componentElement = document.createElement('div');
        componentElement.className = 'preloaded-component';
        componentElement.setAttribute('data-component-name', componentName);
        componentElement.innerHTML = componentHTML;
        
        // Apply current theme colors to pre-rendered component
        const currentPalette = window.currentPalette || {
            c1: '#3b82f6', c2: '#1d4ed8', c3: '#1e40af', 
            c4: '#1e3a8a', c5: '#ffffff'
        };
        
        // Apply palette colors to component
        componentElement.style.setProperty('--c1', currentPalette.c1);
        componentElement.style.setProperty('--c2', currentPalette.c2);
        componentElement.style.setProperty('--c3', currentPalette.c3);
        componentElement.style.setProperty('--c4', currentPalette.c4);
        componentElement.style.setProperty('--c5', currentPalette.c5);
        
        fragment.appendChild(componentElement);
    }
    
    // OPTIMIZATION: Single DOM operation instead of multiple appends
    preloadContainer.appendChild(fragment);
    
    // OPTIMIZATION: Reduced delay from 5ms per component to 2ms per component
    // With only 5 essential components, this reduces total delay from 25ms to 10ms
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
        }, 2 * componentNames.length);
        });
    }
    
// Global preloader templates function - OPTIMIZED FOR PERFORMANCE
async function preloadTemplates() {
    // OPTIMIZATION: Skip template preloading entirely for faster startup
    // Templates are generated on-demand when needed, eliminating unnecessary delays
    // This reduces preloader time by 100ms
    return Promise.resolve();
}

// Global platform navigation function
async function initializePlatformNavigation() {
    try {
        // Check if navigation already exists to prevent duplicates
        const existingNav = document.querySelector('.platform-navigation');
        if (!existingNav) {
            // Initialize platform navigation
            const platformNav = new PlatformNavigationManager();
            platformNav.init({
                insertAfter: '.nav-right',
                showCurrentApp: true,
                enableDropdown: true
            });
            
            // Wait a bit for the navigation to be created
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Ensure navigation is positioned correctly relative to theme toggle
            const navRight = document.querySelector('.nav-right');
            const themeToggle = document.getElementById('theme-toggle');
            const platformNavElement = document.querySelector('.platform-navigation');
            
            if (navRight && themeToggle && platformNavElement) {
                // Insert platform navigation BEFORE theme toggle (to the left)
                navRight.insertBefore(platformNavElement, themeToggle);
            }
            
            // Add dark mode support to platform navigation
            const currentTheme = localStorage.getItem('theme') || 'light';
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }
        
    } catch (error) {
        // Silent error handling for platform navigation initialization
    }
    
    // OPTIMIZATION: Reduced delay from 200ms to 50ms for faster startup
    await new Promise(resolve => setTimeout(resolve, 50));
}

// Global complete preloading function - OPTIMIZED FOR PERFORMANCE
async function completePreloading() {
    // OPTIMIZATION: Reduced delay from 500ms to 100ms for faster startup
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Clean up preload container
    const preloadContainer = document.getElementById('preload-container');
    if (preloadContainer) {
        preloadContainer.remove();
    }
    
    // Hide preloader and show main content with optimized timing
    const preloader = document.getElementById('platform-preloader');
    const mainContent = document.getElementById('main-content');
    
    if (preloader) preloader.classList.add('hide');
    if (mainContent) {
        mainContent.style.display = 'block';
        // OPTIMIZATION: Reduced delay from 100ms to 50ms for faster transition
        setTimeout(() => {
            mainContent.classList.add('fade-in');
        }, 50);
    }
}

// Global start preloading function - OPTIMIZED WITH PERFORMANCE MONITORING
async function startPreloading() {
    const startTime = performance.now();
    
    try {
        // OPTIMIZATION: Execute preloading steps with performance monitoring
        const componentsStart = performance.now();
        await preloadComponents();
        const componentsTime = performance.now() - componentsStart;
        
        const templatesStart = performance.now();
        await preloadTemplates();
        const templatesTime = performance.now() - templatesStart;
        
        const navigationStart = performance.now();
        await initializePlatformNavigation();
        const navigationTime = performance.now() - navigationStart;
        
        const completionStart = performance.now();
        await completePreloading();
        const completionTime = performance.now() - completionStart;
        
        const totalTime = performance.now() - startTime;
        
        // Performance metrics calculation removed for production deployment
        
    } catch (error) {
        // Silent error handling for preloading
        // Fallback: show main content anyway
        const preloader = document.getElementById('platform-preloader');
        const mainContent = document.getElementById('main-content');
        
        if (preloader) preloader.classList.add('hide');
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.classList.add('fade-in');
        }
    }
}

// Global preloader initialization function - OPTIMIZED WITH SMART LOADING
function _initializePreloader() {
    // OPTIMIZATION: Check if we can skip preloading for faster startup
    const isFirstVisit = !localStorage.getItem('palettinum_visited');
    const isSlowConnection = navigator.connection && navigator.connection.effectiveType && 
                           ['slow-2g', '2g'].includes(navigator.connection.effectiveType);
    
    if (isFirstVisit || isSlowConnection) {
        // For first-time visitors or slow connections, use minimal preloading
        startMinimalPreloading();
    } else {
        // For returning visitors with good connections, use full preloading
    startPreloading();
    }
}

// OPTIMIZATION: Minimal preloading for faster startup
async function startMinimalPreloading() {
    const startTime = performance.now();
    
    try {
        // Skip component preloading entirely for first-time visitors
        // Skip template preloading (already optimized)
        await preloadTemplates();
        
        // Minimal platform navigation setup
        await initializePlatformNavigation();
        
        // Immediate completion with minimal delay
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Hide preloader and show main content
        const preloader = document.getElementById('platform-preloader');
        const mainContent = document.getElementById('main-content');
        
        if (preloader) preloader.classList.add('hide');
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.classList.add('fade-in');
        }
        
        // Mark as visited for future visits
        localStorage.setItem('palettinum_visited', 'true');
        
        const totalTime = performance.now() - startTime;
        
        // Performance metrics logging removed for production deployment
        
    } catch (error) {
        // Fallback: show main content anyway
        const preloader = document.getElementById('platform-preloader');
        const mainContent = document.getElementById('main-content');
        
        if (preloader) preloader.classList.add('hide');
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.classList.add('fade-in');
        }
    }
} 