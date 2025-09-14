// Smart Color Wheel Component
import { HarmonyEngine } from './utils/harmonyEngine.js';
import { ColorBlindSimulator } from './utils/colorBlindSimulator.js';

export class SmartColorWheel {
    constructor(options = {}) {
        this.options = {
            canvasSize: 400,
            wheelRadius: 180,
            handleSize: 24,
            harmonyPointSize: 16,
            lineWidth: 2,
            ...options
        };

        // Enhanced responsive configuration
        this.responsiveConfig = {
            baseCanvasSize: 400,
            baseWheelRadius: 180,
            minCanvasSize: 200,
            maxCanvasSize: 500,
            devicePixelRatio: window.devicePixelRatio || 1
        };

        this.harmonyEngine = new HarmonyEngine();
        this.colorBlindSimulator = new ColorBlindSimulator();
        
        // Initialize responsive state early to prevent undefined errors
        this.responsiveState = {
            canvasSize: this.responsiveConfig.baseCanvasSize,
            wheelRadius: this.responsiveConfig.baseWheelRadius,
            scaleFactor: 1,
            isMobile: false,
            isTouch: false,
            isFallback: false,
            lastInitialization: Date.now(),
            devicePixelRatio: this.responsiveConfig.devicePixelRatio
        };
        
        // Enhanced color wheel state management
        this.currentHue = 200; // Default blue
        this.currentSaturation = 100;
        this.currentLightness = 50;
        this.currentHarmony = 'analogous';
        this.currentColorBlindness = 'normal';
        
        // Advanced interaction state
        this.isDragging = false;
        this.dragTarget = null;
        this.dragStartAngle = 0;
        this.dragStartHue = 0;
        this.canvas = null;
        this.ctx = null;
        
        // Enhanced point management - 5 interactive points like the image
        this.colorPoints = [
            { id: 'primary', hue: 200, isActive: true, isDragging: false },
            { id: 'secondary', hue: 220, isActive: false, isDragging: false },
            { id: 'tertiary', hue: 240, isActive: false, isDragging: false },
            { id: 'quaternary', hue: 260, isActive: false, isDragging: false },
            { id: 'quinary', hue: 280, isActive: false, isDragging: false }
        ];
        
        // Store original positions for custom mode
        this.originalPositions = [];
        this.isCustomMode = false;
        
        this.activePointIndex = 0;
        this.hoveredPointIndex = -1;
        
        // Performance optimization
        this.lastRenderTime = 0;
        this.renderThrottle = 16; // ~60fps
        
        this.onColorChange = options.onColorChange || (() => {});
        this.onPaletteChange = options.onPaletteChange || (() => {});
        this.externalShowToast = options.showToast || this.defaultShowToast;
        // Track original DOM positions when portalizing dropdown menus
        this._dropdownOrigins = new Map();
        
        this.init();
    }

    /**
     * Initialize the color wheel component
     */
    init() {
        this.loadModalHTML();
        this.setupEventListeners();
        // Canvas initialization moved to open() method to avoid zero dimensions warning
        this.updateColorDisplay();
        this.generatePalette();
    }

    /**
     * Load modal HTML into the DOM
     */
    loadModalHTML() {
        // Check if modal already exists
        if (document.getElementById('color-wheel-modal')) {
            return;
        }

        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = this.getModalHTML();
        document.body.appendChild(modalContainer.firstElementChild);
    }

    /**
     * Get modal HTML content
     */
    getModalHTML() {
        return `
            <!-- Smart Color Wheel Modal -->
            <div id="color-wheel-modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm hidden">
                <div class="bg-secondary border border-color rounded-xl shadow-2xl w-full mx-4 max-h-[90vh] overflow-hidden soft-shadow cw-modal-content">
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between px-4 py-3 border-b border-color bg-primary cw-modal-header">
                        <h2 class="text-lg font-semibold text-primary">
                            Color Wheel
                        </h2>
                        <button id="color-wheel-close" class="p-2 rounded-full text-secondary hover:bg-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 smooth-transition" aria-label="Close Color Wheel">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Modal Content -->
                    <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                        <div class="space-y-4">
                            
                            <!-- Top Row: Color Wheel & Controls -->
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            
                                <!-- Color Wheel Section -->
                            <div class="lg:col-span-8">
                                    <div class="bg-secondary dark:bg-gray-800 dark:border-gray-700 border border-gray-200 p-6 rounded-xl soft-shadow card-fluid">
                                    <h3 class="text-fluid-lg font-semibold text-primary mb-6 flex items-center">
                                        Interactive Color Wheel
                                        <button 
                                            class="popup-help-icon ml-2 flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                                            data-section-id="color-wheel-interactive"
                                            data-section-title="Interactive Color Wheel"
                                            aria-label="Learn about Interactive Color Wheel">
                                            <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </button>
                                    </h3>
                                    
                                    <!-- Color Wheel Canvas Container -->
                                    <div class="relative flex justify-center items-center bg-gray-50 dark:bg-gray-900 dark:border-gray-700 border border-gray-200 rounded-xl p-6 mb-6 shadow-inner">
                                        <canvas id="color-wheel-canvas" class="max-w-full h-auto shadow-lg rounded-lg"></canvas>
                                        
                                        <!-- Harmony Rule Overlay -->
                                        <div id="harmony-overlay" class="absolute inset-0 pointer-events-none">
                                            <!-- Harmony lines will be drawn here -->
                                        </div>
                                    </div>

                                    <!-- Harmony Controls -->
                                    <div class="space-y-4">
                                        <h4 class="text-sm font-semibold text-primary mb-3 flex items-center">
                                            Harmony Rules
                                            <button 
                                                class="popup-help-icon ml-2 flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                                                data-section-id="color-wheel-harmony"
                                                data-section-title="Color Harmony Rules"
                                                aria-label="Learn about Color Harmony Rules">
                                                <svg class="w-3 h-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </button>
                                        </h4>
                                        
                                        <!-- Desktop/Tablet Button Grid -->
                                        <div id="harmony-buttons-grid" class="harmony-controls-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                            <button class="harmony-btn active bg-accent text-white px-3 py-2.5 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-harmony="analogous">
                                                Analogous
                                            </button>
                                            <button class="harmony-btn bg-secondary text-primary px-3 py-2.5 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-harmony="complementary">
                                                Complementary
                                            </button>
                                            <button class="harmony-btn bg-secondary text-primary px-3 py-2.5 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-harmony="triadic">
                                                Triadic
                                            </button>
                                            <button class="harmony-btn bg-secondary text-primary px-3 py-2.5 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-harmony="tetradic">
                                                Tetradic
                                            </button>
                                            <button class="harmony-btn bg-secondary text-primary px-3 py-2.5 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-harmony="split-complementary">
                                                Split-Comp
                                            </button>
                                            <button class="harmony-btn bg-secondary text-primary px-3 py-2.5 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-harmony="monochromatic">
                                                Monochromatic
                                            </button>
                                            <button class="harmony-btn bg-secondary text-primary px-3 py-2.5 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-harmony="custom">
                                                Custom
                                            </button>
                                        </div>
                                        
                                        <!-- Mobile Dropdown -->
                                        <div id="harmony-dropdown" class="harmony-controls-dropdown hidden">
                                            <div class="relative">
                                                <button id="harmony-dropdown-trigger" class="w-full flex items-center justify-between px-4 py-3 bg-secondary border border-color rounded-lg text-primary text-sm font-medium hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 smooth-transition shadow-sm" aria-haspopup="listbox" aria-expanded="false">
                                                    <span id="harmony-dropdown-text">Analogous</span>
                                                    <svg class="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </button>
                                                <div id="harmony-dropdown-menu" class="absolute z-10 w-full mt-1 bg-secondary border border-color rounded-lg shadow-lg hidden" role="listbox">
                                                    <div class="py-1">
                                                        <button class="harmony-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-harmony="analogous" role="option" aria-selected="false">
                                                            Analogous
                                                        </button>
                                                        <button class="harmony-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-harmony="complementary" role="option" aria-selected="false">
                                                            Complementary
                                                        </button>
                                                        <button class="harmony-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-harmony="triadic" role="option" aria-selected="false">
                                                            Triadic
                                                        </button>
                                                        <button class="harmony-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-harmony="tetradic" role="option" aria-selected="false">
                                                            Tetradic
                                                        </button>
                                                        <button class="harmony-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-harmony="split-complementary" role="option" aria-selected="false">
                                                            Split-Comp
                                                        </button>
                                                        <button class="harmony-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-harmony="monochromatic" role="option" aria-selected="false">
                                                            Monochromatic
                                                        </button>
                                                        <button class="harmony-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-harmony="custom" role="option" aria-selected="false">
                                                            Custom
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Color Blindness Simulation -->
                                    <div class="mt-6">
                                        <h4 class="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                                            Color Blindness Simulation
                                            <button 
                                                class="popup-help-icon flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                                                data-section-id="color-wheel-colorblind"
                                                data-section-title="Color Blindness Simulation"
                                                aria-label="Learn about Color Blindness Simulation">
                                                <svg class="w-3 h-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </button>
                                        </h4>
                                        
                                        <!-- Desktop/Tablet Button Grid -->
                                        <div id="colorblind-buttons-grid" class="colorblind-controls-grid grid grid-cols-2 gap-3">
                                            <button class="colorblind-btn active bg-accent text-white px-3 py-2 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-type="normal">
                                                Normal
                                            </button>
                                            <button class="colorblind-btn bg-secondary text-primary px-3 py-2 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-type="protanopia">
                                                Protanopia
                                            </button>
                                            <button class="colorblind-btn bg-secondary text-primary px-3 py-2 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-type="deuteranopia">
                                                Deuteranopia
                                            </button>
                                            <button class="colorblind-btn bg-secondary text-primary px-3 py-2 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-sm" data-type="tritanopia">
                                                Tritanopia
                                            </button>
                                        </div>
                                        
                                        <!-- Mobile Dropdown -->
                                        <div id="colorblind-dropdown" class="colorblind-controls-dropdown hidden">
                                            <div class="relative">
                                                <button id="colorblind-dropdown-trigger" class="w-full flex items-center justify-between px-4 py-3 bg-secondary border border-color rounded-lg text-primary text-sm font-medium hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 smooth-transition shadow-sm" aria-haspopup="listbox" aria-expanded="false">
                                                    <span id="colorblind-dropdown-text">Normal</span>
                                                    <svg class="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </button>
                                                <div id="colorblind-dropdown-menu" class="absolute z-10 w-full mt-1 bg-secondary border border-color rounded-lg shadow-lg hidden" role="listbox">
                                                    <div class="py-1">
                                                        <button class="colorblind-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-type="normal" role="option" aria-selected="false">
                                                            Normal
                                                        </button>
                                                        <button class="colorblind-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-type="protanopia" role="option" aria-selected="false">
                                                            Protanopia
                                                        </button>
                                                        <button class="colorblind-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-type="deuteranopia" role="option" aria-selected="false">
                                                            Deuteranopia
                                                        </button>
                                                        <button class="colorblind-dropdown-item w-full text-left px-4 py-2 text-sm text-primary hover:bg-primary focus:outline-none focus:bg-primary" data-type="tritanopia" role="option" aria-selected="false">
                                                            Tritanopia
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <!-- Right Side Panel - Controls -->
                            <div class="lg:col-span-4">
                                    <div class="space-y-6">
                                    
                                    <!-- Base Color Controls -->
                                        <div class="bg-secondary p-6 rounded-xl soft-shadow card-fluid">
                                        <h3 class="text-fluid-lg font-semibold text-primary mb-6 flex items-center gap-3">
                                            Base Color
                                            <button 
                                                class="popup-help-icon flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                                                data-section-id="color-wheel-base-color"
                                                data-section-title="Base Color Controls"
                                                aria-label="Learn about Base Color Controls">
                                                <svg class="w-3 h-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </button>
                                        </h3>
                                        
                                        <!-- Color Input -->
                                        <div class="mb-6">
                                            <label class="block text-sm font-medium text-secondary mb-3">Color Picker</label>
                                            <div class="flex items-center gap-3">
                                                <input type="color" id="color-wheel-picker" class="w-14 h-14 rounded-xl border-2 border-gray-300 dark:border-color cursor-pointer shadow-md hover:shadow-lg smooth-transition" value="#3dbdf5">
                                                <input type="text" id="color-wheel-hex" placeholder="#3dbdf5" class="flex-1 px-4 py-3 border border-color rounded-lg bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent smooth-transition font-mono text-sm shadow-sm" maxlength="7">
                                            </div>
                                        </div>

                                        <!-- RGB/HSL Values -->
                                        <div class="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <label class="block text-sm font-medium text-secondary mb-2">RGB</label>
                                                <input type="text" id="color-wheel-rgb" class="w-full px-3 py-2.5 border border-color rounded-lg text-sm bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent shadow-sm" readonly>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-secondary mb-2">HSL</label>
                                                <input type="text" id="color-wheel-hsl" class="w-full px-3 py-2.5 border border-color rounded-lg text-sm bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-accent shadow-sm" readonly>
                                            </div>
                                        </div>

                                        <!-- Copy Button -->
                                        <button id="color-wheel-copy" class="w-full accent-bg text-white px-4 py-3 rounded-lg text-sm font-medium hover:opacity-90 smooth-transition flex items-center justify-center gap-3 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                            Copy Color
                                        </button>
                                    </div>

                                    <!-- Generated Palette -->
                                        <div class="bg-secondary p-6 rounded-xl soft-shadow card-fluid">
                                        <h3 class="text-fluid-lg font-semibold text-primary mb-4 flex items-center gap-3">
                                            Generated Palette
                                            <button 
                                                class="popup-help-icon flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                                                data-section-id="color-wheel-generated-palette"
                                                data-section-title="Generated Palette Export"
                                                aria-label="Learn about Generated Palette Export">
                                                <svg class="w-3 h-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </button>
                                        </h3>
                                        
                                        <!-- Palette Swatches Container -->
                                        <div class="mb-4">
                                            <div id="color-wheel-palette" class="responsive-palette-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-40 overflow-hidden">
                                                <!-- Swatches will be generated here -->
                                            </div>
                                        </div>

                                        <!-- Export Options -->
                                        <div class="space-y-2">
                                            <button id="color-wheel-export-css" class="w-full bg-secondary text-primary border border-color px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-primary smooth-transition whitespace-nowrap shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                                                Export CSS Variables
                                            </button>
                                            <button id="color-wheel-export-json" class="w-full bg-secondary text-primary border border-color px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-primary smooth-transition whitespace-nowrap shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                                                Export JSON
                                            </button>
                                            <button id="color-wheel-apply-palette" class="w-full accent-bg text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 smooth-transition whitespace-nowrap shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                                                Apply to Main Palette
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                    </div>

                            <!-- Full Width Accessibility Checker -->
                            <div class="bg-secondary p-4 rounded-xl soft-shadow card-fluid">
                                <h3 class="text-fluid-lg font-semibold text-primary mb-4 flex items-center gap-2">
                                    <span>Accessibility Checker</span>
                                    <button 
                                        class="popup-help-icon flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
                                        data-section-id="color-wheel-accessibility"
                                        data-section-title="Accessibility Checker"
                                        aria-label="Learn about Accessibility Checker">
                                        <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </button>
                                </h3>
                                        
                                <!-- Enhanced Accessibility Dashboard - Full Horizontal Layout -->
                                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                    
                                    <!-- Contrast Analysis Section -->
                                    <div class="lg:col-span-4">
                                            <label class="block text-sm font-medium text-secondary mb-2">Contrast Ratio Analysis</label>
                                            <div id="contrast-checker" class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                                <div id="contrast-preview" class="w-20 h-10 rounded-lg border-2 border-color flex items-center justify-center text-sm font-bold shadow-md">Aa</div>
                                                <div class="flex-1">
                                                    <div id="contrast-ratio" class="text-lg font-semibold text-primary">4.5:1</div>
                                                    <div id="contrast-status" class="text-sm text-green-600 font-medium">AA Pass</div>
                                                </div>
                                            </div>
                                        </div>

                                    <!-- WCAG Compliance Section -->
                                    <div class="lg:col-span-5">
                                        <label class="block text-sm font-medium text-secondary mb-2">WCAG Compliance Status</label>
                                        <div class="grid grid-cols-3 gap-3">
                                            <div class="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                                                <span class="text-xs text-secondary font-medium mb-1">WCAG AA</span>
                                                <span id="wcag-aa-status" class="text-green-600 font-semibold text-sm">✓ Pass</span>
                                            </div>
                                            <div class="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                                                <span class="text-xs text-secondary font-medium mb-1">WCAG AAA</span>
                                                <span id="wcag-aaa-status" class="text-green-600 font-semibold text-sm">✓ Pass</span>
                                            </div>
                                            <div class="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                                                <span class="text-xs text-secondary font-medium mb-1">Large Text</span>
                                                <span id="wcag-aa-large-status" class="text-green-600 font-semibold text-sm">✓ Pass</span>
                                            </div>
                                                </div>
                                                </div>

                                    <!-- Enhanced Metrics Section -->
                                    <div class="lg:col-span-3">
                                        <label class="block text-sm font-medium text-secondary mb-2">Compliance Metrics</label>
                                        <div class="space-y-2">
                                            <div class="flex justify-between items-center p-2.5 bg-secondary dark:bg-surface-elevated rounded-lg border border-border-color shadow-sm compliance-metric-card">
                                                <span class="text-xs text-secondary font-medium">Level</span>
                                                <span id="wcag-level" class="text-green-600 dark:text-green-400 font-semibold text-sm">AA</span>
                                            </div>
                                            <div class="flex justify-between items-center p-2.5 bg-secondary dark:bg-surface-elevated rounded-lg border border-border-color shadow-sm compliance-metric-card">
                                                <span class="text-xs text-secondary font-medium">Severity</span>
                                                <span id="wcag-severity" class="text-green-600 dark:text-green-400 font-semibold text-sm">Low</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Modal controls
        document.getElementById('color-wheel-close')?.addEventListener('click', () => this.close());
        
        // Click outside modal to close
        document.getElementById('color-wheel-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'color-wheel-modal') {
                this.close();
            }
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !document.getElementById('color-wheel-modal')?.classList.contains('hidden')) {
                e.preventDefault();
                this.close();
            }
        });
        
        // Color picker
        document.getElementById('color-wheel-picker')?.addEventListener('input', (e) => {
            this.setColorFromHex(e.target.value);
        });

        // Hex input
        document.getElementById('color-wheel-hex')?.addEventListener('input', (e) => {
            const hex = e.target.value;
            if (hex.match(/^#[0-9A-Fa-f]{6}$/)) {
                this.setColorFromHex(hex);
            }
        });

        // Copy button
        document.getElementById('color-wheel-copy')?.addEventListener('click', () => {
            this.copyCurrentColor();
        });

        // Harmony buttons
        document.querySelectorAll('.harmony-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setHarmony(e.target.dataset.harmony);
            });
        });

        // Color blindness buttons
        document.querySelectorAll('.colorblind-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setColorBlindness(e.target.dataset.type);
            });
        });

        // Export buttons
        document.getElementById('color-wheel-export-css')?.addEventListener('click', () => {
            this.exportCSS();
        });

        document.getElementById('color-wheel-export-json')?.addEventListener('click', () => {
            this.exportJSON();
        });

        document.getElementById('color-wheel-apply-palette')?.addEventListener('click', () => {
            this.applyToMainPalette();
        });

        // Canvas events
        this.setupCanvasEvents();
        
        // OLD TOOLTIP SYSTEM REMOVED - Replaced with modern popup card system
    }
    
    // OLD TOOLTIP SYSTEM REMOVED - Replaced with modern popup card system

    /**
     * Setup canvas and initialize rendering
     */
    setupCanvas() {
        this.canvas = document.getElementById('color-wheel-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvasEvents();
        this.renderColorWheel();
    }

    /**
     * Setup canvas event listeners with responsive optimization
     */
    setupCanvasEvents() {
        if (!this.canvas) return;
        
        // Initialize responsive canvas sizing
        this.initializeResponsiveCanvas();

        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.handleTouchEnd());

        // Keyboard events
        this.canvas.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.canvas.setAttribute('tabindex', '0');
        
        // Responsive resize handler
        this.setupResizeHandler();
        
        // Setup responsive dropdown behavior
        this.setupResponsiveDropdowns();
    }
    
    /**
     * Setup responsive dropdown behavior for Harmony Rules and Color Blindness Simulation
     */
    setupResponsiveDropdowns() {
        // Initialize responsive behavior
        this.updateResponsiveLayout();
        
        // Initialize dropdown states
        this.initializeDropdownStates();
        
        // Setup dropdown event listeners
        this.setupDropdownEventListeners();
        
        // Setup resize listener for responsive behavior
        this.setupResponsiveResizeListener();
    }
    
    /**
     * Update responsive layout based on screen size
     */
    updateResponsiveLayout() {
        const viewportWidth = window.innerWidth;
        const harmonyButtonsGrid = document.getElementById('harmony-buttons-grid');
        const harmonyDropdown = document.getElementById('harmony-dropdown');
        const colorblindButtonsGrid = document.getElementById('colorblind-buttons-grid');
        const colorblindDropdown = document.getElementById('colorblind-dropdown');
        
        if (!harmonyButtonsGrid || !harmonyDropdown || !colorblindButtonsGrid || !colorblindDropdown) {
            return;
        }
        
        // Determine if we should show dropdowns (mobile/tablet) or buttons (desktop)
        const shouldShowDropdowns = viewportWidth <= 768;
        
        if (shouldShowDropdowns) {
            // Show dropdowns, hide button grids
            harmonyButtonsGrid.classList.add('hidden');
            harmonyDropdown.classList.remove('hidden');
            colorblindButtonsGrid.classList.add('hidden');
            colorblindDropdown.classList.remove('hidden');
        } else {
            // Show button grids, hide dropdowns
            harmonyButtonsGrid.classList.remove('hidden');
            harmonyDropdown.classList.add('hidden');
            colorblindButtonsGrid.classList.remove('hidden');
            colorblindDropdown.classList.add('hidden');
        }
    }
    
    /**
     * Initialize dropdown states
     */
    initializeDropdownStates() {
        // Initialize harmony dropdown with first option selected
        const harmonyItems = document.querySelectorAll('.harmony-dropdown-item');
        if (harmonyItems.length > 0) {
            harmonyItems.forEach((item, index) => {
                if (index === 0) {
                    item.setAttribute('aria-selected', 'true');
                    item.classList.add('bg-accent', 'text-white');
                } else {
                    item.setAttribute('aria-selected', 'false');
                    item.classList.remove('bg-accent', 'text-white');
                }
            });
        }
        
        // Initialize colorblind dropdown with first option selected
        const colorblindItems = document.querySelectorAll('.colorblind-dropdown-item');
        if (colorblindItems.length > 0) {
            colorblindItems.forEach((item, index) => {
                if (index === 0) {
                    item.setAttribute('aria-selected', 'true');
                    item.classList.add('bg-accent', 'text-white');
                } else {
                    item.setAttribute('aria-selected', 'false');
                    item.classList.remove('bg-accent', 'text-white');
                }
            });
        }
    }

    /**
     * Setup dropdown event listeners
     */
    setupDropdownEventListeners() {
        // Harmony dropdown
        const harmonyTrigger = document.getElementById('harmony-dropdown-trigger');
        const harmonyMenu = document.getElementById('harmony-dropdown-menu');
        const harmonyItems = document.querySelectorAll('.harmony-dropdown-item');
        
        if (harmonyTrigger && harmonyMenu) {
            harmonyTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown(harmonyMenu, harmonyTrigger);
            });
            
            harmonyItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectHarmonyOption(item.dataset.harmony, item.textContent);
                    this.closeDropdown(harmonyMenu, harmonyTrigger);
                });
            });
        }
        
        // Colorblind dropdown
        const colorblindTrigger = document.getElementById('colorblind-dropdown-trigger');
        const colorblindMenu = document.getElementById('colorblind-dropdown-menu');
        const colorblindItems = document.querySelectorAll('.colorblind-dropdown-item');
        
        if (colorblindTrigger && colorblindMenu) {
            colorblindTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown(colorblindMenu, colorblindTrigger);
            });
            
            colorblindItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectColorblindOption(item.dataset.type, item.textContent);
                    this.closeDropdown(colorblindMenu, colorblindTrigger);
                });
            });
        }
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.harmony-controls-dropdown') && !e.target.closest('.colorblind-controls-dropdown')) {
                this.closeAllDropdowns();
            }
        });
        
        // Handle window resize to reposition dropdowns
        window.addEventListener('resize', () => {
            // Close all dropdowns on resize to prevent positioning issues
            this.closeAllDropdowns();
        });

        // Close any open dropdowns on scroll to prevent misalignment
        window.addEventListener('scroll', () => {
            this.closeAllDropdowns();
        }, { passive: true });
    }
    
    /**
     * Toggle dropdown menu with mutual exclusion
     */
    toggleDropdown(menu, trigger) {
        const isOpen = !menu.classList.contains('hidden');
        
        if (isOpen) {
            this.closeDropdown(menu, trigger);
        } else {
            // Close all other dropdowns first to ensure mutual exclusion
            this.closeAllDropdowns();
            this.openDropdown(menu, trigger);
        }
    }
    
    /**
     * Open dropdown menu
     */
    openDropdown(menu, trigger) {
        menu.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
        trigger.querySelector('svg').style.transform = 'rotate(180deg)';
        
        // Add active state to trigger for better visual feedback
        trigger.classList.add('dropdown-active');
        
        // Portalize and position the dropdown above all elements
        this.portalDropdown(menu, trigger);
    }
    
    /**
     * Close dropdown menu
     */
    closeDropdown(menu, trigger) {
        menu.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.querySelector('svg').style.transform = 'rotate(0deg)';
        
        // Remove active state from trigger
        trigger.classList.remove('dropdown-active');

        // Restore dropdown back to its original container if portalized
        this.restoreDropdown(menu);
    }
    
    /**
     * Position dropdown to ensure it appears above other elements
     */
    positionDropdown(menu, trigger) {
        // Back-compat no-op: positioning handled by portalDropdown
        this.portalDropdown(menu, trigger);
    }

    /**
     * Move dropdown menu to document.body (portal) and position with fixed coords
     * to escape any parent stacking contexts (tooltips/icons) and ensure top-most stacking
     */
    portalDropdown(menu, trigger) {
        if (!menu || !trigger) return;

        // Record original parent and sibling to restore later (only once)
        if (!this._dropdownOrigins.has(menu)) {
            this._dropdownOrigins.set(menu, {
                parent: menu.parentNode,
                nextSibling: menu.nextSibling
            });
        }

        // Compute trigger rect before moving
        const triggerRect = trigger.getBoundingClientRect();

        // Append to body to escape stacking contexts
        if (menu.parentNode !== document.body) {
            document.body.appendChild(menu);
        }

        // Fixed positioning above everything
        const minMenuWidth = Math.max(triggerRect.width, 200);
        menu.style.position = 'fixed';
        menu.style.left = `${Math.max(8, Math.min(triggerRect.left, window.innerWidth - minMenuWidth - 8))}px`;
        menu.style.width = `${minMenuWidth}px`;
        menu.style.minWidth = `${minMenuWidth}px`;
        menu.style.maxWidth = `${window.innerWidth - 16}px`; // Prevent overflow beyond viewport
        menu.style.zIndex = '200000';
        menu.style.marginTop = '0';
        menu.style.marginBottom = '0';
        // Prevent horizontal scroll
        menu.style.overflowX = 'hidden';
        menu.style.whiteSpace = 'nowrap';

        // Vertical placement: prefer below, fallback above if not enough space
        const menuHeight = Math.min(menu.scrollHeight || 240, Math.floor(window.innerHeight * 0.6));
        const spaceBelow = window.innerHeight - triggerRect.bottom - 8;
        const spaceAbove = triggerRect.top - 8;

        if (spaceBelow >= menuHeight || spaceBelow >= spaceAbove) {
            // Place below
            menu.style.top = `${Math.min(triggerRect.bottom + 4, window.innerHeight - menuHeight - 8)}px`;
            menu.style.bottom = 'auto';
        } else {
            // Place above
            menu.style.top = 'auto';
            menu.style.bottom = `${Math.max(8, window.innerHeight - triggerRect.top + 4)}px`;
        }

        // Constrain height to viewport
        menu.style.maxHeight = `${menuHeight}px`;
        menu.style.overflowY = 'auto';
        menu.style.willChange = 'transform';
    }

    /**
     * Restore dropdown menu to its original DOM position and clear inline styles
     */
    restoreDropdown(menu) {
        if (!menu) return;
        const origin = this._dropdownOrigins.get(menu);
        if (origin && origin.parent) {
            origin.parent.insertBefore(menu, origin.nextSibling);
        }
        // Clear inline positioning so CSS controls in normal flow
        menu.style.position = '';
        menu.style.top = '';
        menu.style.bottom = '';
        menu.style.left = '';
        menu.style.width = '';
        menu.style.minWidth = '';
        menu.style.maxWidth = '';
        menu.style.maxHeight = '';
        menu.style.overflowX = '';
        menu.style.overflowY = '';
        menu.style.whiteSpace = '';
        menu.style.marginTop = '';
        menu.style.marginBottom = '';
        menu.style.willChange = '';
        // Keep a high z-index via CSS when needed; remove inline override
        menu.style.zIndex = '';
    }

    /**
     * Close all dropdowns
     */
    closeAllDropdowns() {
        const harmonyMenu = document.getElementById('harmony-dropdown-menu');
        const harmonyTrigger = document.getElementById('harmony-dropdown-trigger');
        const colorblindMenu = document.getElementById('colorblind-dropdown-menu');
        const colorblindTrigger = document.getElementById('colorblind-dropdown-trigger');
        
        if (harmonyMenu && harmonyTrigger) {
            this.closeDropdown(harmonyMenu, harmonyTrigger);
        }
        
        if (colorblindMenu && colorblindTrigger) {
            this.closeDropdown(colorblindMenu, colorblindTrigger);
        }
    }
    
    /**
     * Select harmony option from dropdown
     */
    selectHarmonyOption(harmonyType, displayText) {
        // Update dropdown text
        const harmonyDropdownText = document.getElementById('harmony-dropdown-text');
        if (harmonyDropdownText) {
            harmonyDropdownText.textContent = displayText;
        }
        
        // Update active state in dropdown
        const harmonyItems = document.querySelectorAll('.harmony-dropdown-item');
        harmonyItems.forEach(item => {
            const isSelected = item.dataset.harmony === harmonyType;
            item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            
            // Remove all state classes first
            item.classList.remove('bg-accent', 'text-white');
            
            // Add selected state classes if this is the selected item
            if (isSelected) {
                item.classList.add('bg-accent', 'text-white');
            }
        });
        
        // Update button grid active state
        const harmonyButtons = document.querySelectorAll('.harmony-btn');
        harmonyButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.harmony === harmonyType);
            btn.classList.toggle('bg-accent', btn.dataset.harmony === harmonyType);
            btn.classList.toggle('text-white', btn.dataset.harmony === harmonyType);
        });
        
        // Apply harmony rule
        this.setHarmony(harmonyType);
    }
    
    /**
     * Select colorblind option from dropdown
     */
    selectColorblindOption(type, displayText) {
        // Update dropdown text
        const colorblindDropdownText = document.getElementById('colorblind-dropdown-text');
        if (colorblindDropdownText) {
            colorblindDropdownText.textContent = displayText;
        }
        
        // Update active state in dropdown
        const colorblindItems = document.querySelectorAll('.colorblind-dropdown-item');
        colorblindItems.forEach(item => {
            const isSelected = item.dataset.type === type;
            item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            
            // Remove all state classes first
            item.classList.remove('bg-accent', 'text-white');
            
            // Add selected state classes if this is the selected item
            if (isSelected) {
                item.classList.add('bg-accent', 'text-white');
            }
        });
        
        // Update button grid active state
        const colorblindButtons = document.querySelectorAll('.colorblind-btn');
        colorblindButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
            btn.classList.toggle('bg-accent', btn.dataset.type === type);
            btn.classList.toggle('text-white', btn.dataset.type === type);
        });
        
        // Apply colorblind simulation
        this.setColorBlindness(type);
    }
    
    /**
     * Setup responsive resize listener
     */
    setupResponsiveResizeListener() {
        let resizeTimeout;
        
        const handleResponsiveResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateResponsiveLayout();
                this.optimizePaletteLayout();
            }, 150);
        };
        
        window.addEventListener('resize', handleResponsiveResize);
        
        // Store cleanup function
        this.cleanupResponsiveResize = () => {
            window.removeEventListener('resize', handleResponsiveResize);
            clearTimeout(resizeTimeout);
        };
    }
    
    /**
     * Optimize palette layout for different screen sizes
     */
    optimizePaletteLayout() {
        const paletteContainer = document.getElementById('color-wheel-palette');
        if (!paletteContainer) return;
        
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth <= 768) {
            // Enable horizontal scrolling on mobile
            this.enableHorizontalScrolling(paletteContainer);
        } else {
            // Use grid layout on larger screens
            this.enableGridLayout(paletteContainer);
        }
    }
    
    /**
     * Enable horizontal scrolling for palette
     */
    enableHorizontalScrolling(container) {
        // Add smooth scrolling behavior
        container.style.scrollBehavior = 'smooth';
        
        // Add touch-friendly scrolling
        container.addEventListener('touchstart', this.handlePaletteTouchStart.bind(this), { passive: true });
        container.addEventListener('touchmove', this.handlePaletteTouchMove.bind(this), { passive: true });
        
        // Ensure all colors are visible
        const swatches = container.querySelectorAll('.color-wheel-swatch');
        swatches.forEach(swatch => {
            swatch.style.flexShrink = '0';
            swatch.style.minWidth = '60px';
            swatch.style.minHeight = '60px';
        });
    }
    
    /**
     * Enable grid layout for palette
     */
    enableGridLayout(container) {
        // Remove touch event listeners
        container.removeEventListener('touchstart', this.handlePaletteTouchStart.bind(this));
        container.removeEventListener('touchmove', this.handlePaletteTouchMove.bind(this));
        
        // Reset to grid layout
        container.style.scrollBehavior = '';
        
        const swatches = container.querySelectorAll('.color-wheel-swatch');
        swatches.forEach(swatch => {
            swatch.style.flexShrink = '';
            swatch.style.minWidth = '';
            swatch.style.minHeight = '';
        });
    }
    
    /**
     * Handle palette touch start for smooth scrolling
     */
    handlePaletteTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }
    
    /**
     * Handle palette touch move for smooth scrolling
     */
    handlePaletteTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;
        
        const touchCurrentX = e.touches[0].clientX;
        const touchCurrentY = e.touches[0].clientY;
        
        const diffX = Math.abs(touchCurrentX - this.touchStartX);
        const diffY = Math.abs(touchCurrentY - this.touchStartY);
        
        // If horizontal movement is greater than vertical, allow scrolling
        if (diffX > diffY) {
            e.preventDefault();
        }
    }
    
    /**
     * Initialize responsive canvas with optimal sizing and performance
     * Enhanced with comprehensive error handling and edge case management
     */
    initializeResponsiveCanvas() {
        if (!this.canvas) {
            console.warn('ColorWheel: Canvas element not found');
            return;
        }
        
        try {
            // Calculate optimal canvas size based on container and screen size
            const container = this.canvas.parentElement;
            if (!container) {
                console.warn('ColorWheel: Canvas parent container not found');
                return;
            }
            
            const containerRect = container.getBoundingClientRect();
            const viewportWidth = window.innerWidth || 1024; // Fallback for SSR
            const viewportHeight = window.innerHeight || 768; // Fallback for SSR
            
            // Validate container dimensions
            if (containerRect.width <= 0 || containerRect.height <= 0) {
                console.warn('ColorWheel: Container has zero dimensions, using fallback');
                this.initializeFallbackCanvas();
                return;
            }
        
            // Determine optimal canvas size based on screen size
            let optimalSize;
            if (viewportWidth <= 360) {
                optimalSize = Math.min(260, containerRect.width - 32); // Ultra-small screens
            } else if (viewportWidth <= 480) {
                optimalSize = Math.min(280, containerRect.width - 32); // Small screens
            } else if (viewportWidth <= 768) {
                optimalSize = Math.min(320, containerRect.width - 32); // Medium screens
            } else if (viewportWidth <= 1024) {
                optimalSize = Math.min(350, containerRect.width - 32); // Large screens
            } else {
                optimalSize = Math.min(400, containerRect.width - 32); // Full screens
            }
            
            // Ensure minimum and maximum constraints with validation
            optimalSize = Math.max(this.responsiveConfig.minCanvasSize, 
                          Math.min(this.responsiveConfig.maxCanvasSize, optimalSize));
            
            // Validate optimal size
            if (optimalSize <= 0 || !isFinite(optimalSize)) {
                console.warn('ColorWheel: Invalid optimal size calculated, using fallback');
                this.initializeFallbackCanvas();
                return;
            }
            
            // Calculate proportional wheel radius with validation
            const scaleFactor = optimalSize / this.responsiveConfig.baseCanvasSize;
            if (!isFinite(scaleFactor) || scaleFactor <= 0) {
                console.warn('ColorWheel: Invalid scale factor calculated, using fallback');
                this.initializeFallbackCanvas();
                return;
            }
            
            const optimalWheelRadius = Math.round(this.responsiveConfig.baseWheelRadius * scaleFactor);
            
            // Update options with responsive values
            this.options.canvasSize = optimalSize;
            this.options.wheelRadius = optimalWheelRadius;
            this.options.handleSize = Math.round(24 * scaleFactor);
            this.options.harmonyPointSize = Math.round(16 * scaleFactor);
            this.options.lineWidth = Math.max(1, Math.round(2 * scaleFactor));
            
            // Set canvas dimensions with high-DPI support
            this.setupHighDPICanvas(optimalSize);
            
            // Update responsive state (already initialized in constructor)
            this.responsiveState.canvasSize = optimalSize;
            this.responsiveState.wheelRadius = optimalWheelRadius;
            this.responsiveState.scaleFactor = scaleFactor;
            this.responsiveState.isMobile = viewportWidth <= 768;
            this.responsiveState.isTouch = 'ontouchstart' in window;
            this.responsiveState.lastInitialization = Date.now();
            this.responsiveState.isFallback = false;
            
            // Optimize performance based on device capabilities
            this.optimizePerformanceForDevice();
            
        } catch (error) {
            console.error('ColorWheel: Error during responsive canvas initialization:', error);
            this.initializeFallbackCanvas();
        }
    }
    
    /**
     * Initialize fallback canvas with safe defaults
     */
    initializeFallbackCanvas() {
        try {
            console.log('ColorWheel: Initializing fallback canvas');
            
            // Use safe default values
            const fallbackSize = 300;
            const fallbackScaleFactor = fallbackSize / this.responsiveConfig.baseCanvasSize;
            
            this.options.canvasSize = fallbackSize;
            this.options.wheelRadius = Math.round(this.responsiveConfig.baseWheelRadius * fallbackScaleFactor);
            this.options.handleSize = Math.round(24 * fallbackScaleFactor);
            this.options.harmonyPointSize = Math.round(16 * fallbackScaleFactor);
            this.options.lineWidth = Math.max(1, Math.round(2 * fallbackScaleFactor));
            
            // Set canvas dimensions with high-DPI support
            this.setupHighDPICanvas(fallbackSize);
            
            // Update responsive state with fallback flag (already initialized in constructor)
            this.responsiveState.canvasSize = fallbackSize;
            this.responsiveState.wheelRadius = this.options.wheelRadius;
            this.responsiveState.scaleFactor = fallbackScaleFactor;
            this.responsiveState.isMobile = false;
            this.responsiveState.isTouch = false;
            this.responsiveState.isFallback = true;
            this.responsiveState.lastInitialization = Date.now();
            
            // Optimize performance based on device capabilities
            this.optimizePerformanceForDevice();
            
        } catch (error) {
            console.error('ColorWheel: Critical error in fallback initialization:', error);
            // Last resort: use absolute minimums
            this.options.canvasSize = 200;
            this.options.wheelRadius = 90;
            this.options.handleSize = 12;
            this.options.harmonyPointSize = 8;
            this.options.lineWidth = 1;
        }
    }
    
    /**
     * Setup high-DPI canvas for crisp rendering on all devices
     * Enhanced with error handling and context validation
     */
    setupHighDPICanvas(size) {
        try {
            if (!this.canvas || !this.ctx) {
                console.warn('ColorWheel: Canvas or context not available for high-DPI setup');
                return;
            }
            
            // Validate size parameter
            if (!size || size <= 0 || !isFinite(size)) {
                console.warn('ColorWheel: Invalid size parameter for high-DPI setup');
                size = 300; // Use fallback size
            }
            
            // Get device pixel ratio with validation
            let dpr = this.responsiveConfig.devicePixelRatio;
            if (!dpr || dpr <= 0 || !isFinite(dpr)) {
                console.warn('ColorWheel: Invalid device pixel ratio, using fallback');
                dpr = 1;
            }
            
            // Limit DPR to prevent memory issues on very high-DPI displays
            dpr = Math.min(dpr, 3);
            
            // Set display size (CSS pixels)
            this.canvas.style.width = size + 'px';
            this.canvas.style.height = size + 'px';
            
            // Set actual size (device pixels)
            this.canvas.width = size * dpr;
            this.canvas.height = size * dpr;
            
            // Validate canvas dimensions
            if (this.canvas.width <= 0 || this.canvas.height <= 0) {
                console.warn('ColorWheel: Invalid canvas dimensions after DPR setup');
                return;
            }
            
            // Scale context to match device pixel ratio
            this.ctx.scale(dpr, dpr);
            
            // Enable image smoothing for better quality with fallbacks
            try {
                this.ctx.imageSmoothingEnabled = true;
                this.ctx.imageSmoothingQuality = 'high';
            } catch (error) {
                // Fallback for browsers that don't support imageSmoothingQuality
                this.ctx.imageSmoothingEnabled = true;
            }
            
            // Store DPR for potential context restoration (ensure state exists)
            if (this.responsiveState) {
                this.responsiveState.devicePixelRatio = dpr;
            }
            
        } catch (error) {
            console.error('ColorWheel: Error during high-DPI canvas setup:', error);
            // Fallback to basic canvas setup
            this.setupBasicCanvas(size);
        }
    }
    
    /**
     * Setup basic canvas as fallback for high-DPI setup
     */
    setupBasicCanvas(size) {
        try {
            if (!this.canvas) return;
            
            this.canvas.style.width = size + 'px';
            this.canvas.style.height = size + 'px';
            this.canvas.width = size;
            this.canvas.height = size;
            
            console.log('ColorWheel: Using basic canvas setup as fallback');
            
        } catch (error) {
            console.error('ColorWheel: Critical error in basic canvas setup:', error);
        }
    }
    
    /**
     * Optimize performance based on device capabilities
     */
    optimizePerformanceForDevice() {
        const { isMobile, isTouch, scaleFactor } = this.responsiveState;
        
        if (isMobile || isTouch) {
            // Mobile optimizations
            this.renderThrottle = 8; // Higher frame rate for mobile
            this.options.lineWidth = Math.max(1, this.options.lineWidth);
            this.options.handleSize = Math.max(20, this.options.handleSize);
            this.options.harmonyPointSize = Math.max(14, this.options.harmonyPointSize);
        } else {
            // Desktop optimizations
            this.renderThrottle = 16; // Standard 60fps
        }
        
        // Adjust shadow blur based on scale
        this.shadowBlur = Math.round(25 * scaleFactor);
        this.shadowOffsetY = Math.round(12 * scaleFactor);
    }
    
    /**
     * Setup responsive resize handler for dynamic canvas adjustment
     * Enhanced with performance monitoring and error handling
     */
    setupResizeHandler() {
        let resizeTimeout;
        let resizeCount = 0;
        let lastResizeTime = 0;
        
        const handleResize = () => {
            const now = Date.now();
            resizeCount++;
            
            // Prevent excessive resize events (performance protection)
            if (now - lastResizeTime < 50) {
                return;
            }
            lastResizeTime = now;
            
            // Clear existing timeout
            clearTimeout(resizeTimeout);
            
            // Debounce resize events with adaptive timing
            const debounceTime = resizeCount > 10 ? 300 : 150; // Increase debounce for rapid resizes
            
            resizeTimeout = setTimeout(() => {
                try {
                    // Check if canvas is still available
                    if (!this.canvas || !this.ctx) {
                        console.warn('ColorWheel: Canvas not available during resize');
                        return;
                    }
                    
                    // Check if modal is still visible
                    const modal = document.getElementById('color-wheel-modal');
                    if (!modal || modal.classList.contains('hidden')) {
                        return; // Don't resize if modal is hidden
                    }
                    
                    // Reinitialize canvas with new dimensions
                    this.initializeResponsiveCanvas();
                    
                    // Re-render with new dimensions
                    this.renderColorWheel();
                    
                    // Update color display
                    this.updateColorDisplay();
                    
                    // Reset resize count after successful resize
                    if (resizeCount > 0) {
                        resizeCount = Math.max(0, resizeCount - 1);
                    }
                    
                } catch (error) {
                    console.error('ColorWheel: Error during resize handling:', error);
                    // Attempt fallback initialization
                    try {
                        this.initializeFallbackCanvas();
                        this.renderColorWheel();
                    } catch (fallbackError) {
                        console.error('ColorWheel: Fallback resize handling failed:', fallbackError);
                    }
                }
            }, debounceTime);
        };
        
        // Add resize listener with passive option for better performance
        window.addEventListener('resize', handleResize, { passive: true });
        
        // Store cleanup function with enhanced cleanup
        this.cleanupResizeHandler = () => {
            try {
                window.removeEventListener('resize', handleResize);
                clearTimeout(resizeTimeout);
                resizeCount = 0;
                lastResizeTime = 0;
            } catch (error) {
                console.error('ColorWheel: Error during resize handler cleanup:', error);
            }
        };
    }

    /**
     * Render the enhanced color wheel with responsive optimization
     * Enhanced with context validation and error handling
     */
    renderColorWheel() {
        try {
            if (!this.canvas || !this.ctx) {
                console.warn('ColorWheel: Canvas or context not available for rendering');
                return;
            }
            
            // Validate canvas context
            if (this.canvas.width <= 0 || this.canvas.height <= 0) {
                console.warn('ColorWheel: Invalid canvas dimensions for rendering');
                return;
            }
            
            // Use responsive dimensions with validation
            const displaySize = this.responsiveState?.canvasSize || this.options.canvasSize;
            if (!displaySize || displaySize <= 0 || !isFinite(displaySize)) {
                console.warn('ColorWheel: Invalid display size for rendering');
                return;
            }
            
            const centerX = displaySize / 2;
            const centerY = displaySize / 2;
        const radius = this.options.wheelRadius;

            if (!radius || radius <= 0 || !isFinite(radius)) {
                console.warn('ColorWheel: Invalid wheel radius for rendering');
                return;
            }

            // Enhanced performance optimization - adaptive throttling
        const now = performance.now();
            const throttleTime = this.responsiveState?.isMobile ? this.renderThrottle : this.renderThrottle;
            if (now - this.lastRenderTime < throttleTime) {
            return;
        }
        this.lastRenderTime = now;

        // Clear canvas with smooth background
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background circle for better visual
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fill();

        // Draw enhanced color wheel
        this.drawEnhancedColorWheel(centerX, centerY, radius);

        // Draw connecting lines from center to each point
        this.drawConnectingLines(centerX, centerY, radius);

        // Draw all 5 interactive points
        this.drawColorPoints(centerX, centerY, radius);
            
        } catch (error) {
            console.error('ColorWheel: Error during rendering:', error);
            // Attempt to recover by reinitializing canvas
            try {
                this.initializeFallbackCanvas();
                // Try to render again with fallback settings
                setTimeout(() => {
                    this.renderColorWheel();
                }, 100);
            } catch (recoveryError) {
                console.error('ColorWheel: Recovery rendering failed:', recoveryError);
            }
        }
    }

    /**
     * Draw enhanced color wheel with better gradients and color blindness simulation
     */
    drawEnhancedColorWheel(centerX, centerY, radius) {
        // Premium outer glow with responsive depth
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        this.ctx.shadowBlur = this.shadowBlur || 25;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = this.shadowOffsetY || 12;
        
        // Dual-gradient bezel ring for excellence
        const innerGradient = this.ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + 3);
        innerGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
        innerGradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 3, 0, 2 * Math.PI);
        this.ctx.fillStyle = innerGradient;
        this.ctx.fill();
        
        // Ultra-thin light gradient edge
        const outerGradient = this.ctx.createRadialGradient(centerX, centerY, radius + 3, centerX, centerY, radius + 3.5);
        outerGradient.addColorStop(0, 'rgba(128, 128, 128, 0.05)');
        outerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 3.5, 0, 2 * Math.PI);
        this.ctx.fillStyle = outerGradient;
        this.ctx.fill();
        
        // Reset shadow for main wheel
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        
        // Ultra-smooth color transitions with micro-gradients
        // Ultra-smooth color transitions with micro-texture
        for (let angle = 0; angle < 360; angle += 0.15) { // Micro-texture for depth
            const startAngle = (angle - 0.075) * Math.PI / 180;
            const endAngle = (angle + 0.075) * Math.PI / 180;

            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();

            const hue = angle;
            const saturation = 103; // +3% saturation for richness
            const lightness = 50;

            let rgb = this.harmonyEngine.hslToRgb(hue, saturation, lightness);
            
            // Apply color blindness simulation if not normal
            if (this.currentColorBlindness !== 'normal') {
                const simulatedRgb = this.colorBlindSimulator.simulateColorBlindness(
                    rgb, 
                    this.currentColorBlindness, 
                    1.0
                );
                rgb = simulatedRgb;
            }
            
            // Balanced color enhancement
            const boostFactor = 1.03; // Reduced for natural feel
            const enhancedR = Math.min(255, rgb.r * boostFactor);
            const enhancedG = Math.min(255, rgb.g * boostFactor);
            const enhancedB = Math.min(255, rgb.b * boostFactor);
            
            this.ctx.fillStyle = `rgb(${enhancedR}, ${enhancedG}, ${enhancedB})`;
            this.ctx.fill();
        }

        // Ultra-subtle center glow with smooth radial blur
        this.ctx.shadowColor = 'rgba(255, 255, 255, 0.15)';
        this.ctx.shadowBlur = 25;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius * 0.12, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        this.ctx.fill();
        
        // Clean center pivot point
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius * 0.04, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        this.ctx.fill();
    }

    /**
     * Draw connecting lines for all color points
     */
    drawConnectingLines(centerX, centerY, radius) {
        this.colorPoints.forEach((point, index) => {
            const angle = point.hue * Math.PI / 180;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            const isLeadPoint = index === 0;

            // Different styling for lead point vs other points
            if (isLeadPoint) {
                // Enhanced connecting line for lead point
                const gradient = this.ctx.createLinearGradient(centerX, centerY, x, y);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                gradient.addColorStop(0.5, 'rgba(61, 189, 245, 0.3)');
                gradient.addColorStop(1, 'rgba(61, 189, 245, 0.2)');
                
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 2;
            } else {
                // Subtle connecting lines for other points
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                this.ctx.lineWidth = 1;
            }
            
            this.ctx.lineCap = 'round';
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
            
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        });
    }

    /**
     * Draw all 5 interactive color points
     */
    drawColorPoints(centerX, centerY, radius) {
        this.colorPoints.forEach((point, index) => {
            const angle = point.hue * Math.PI / 180;
            const isLeadPoint = index === 0;
            
            // Adjust radius for lead point to ensure it's fully visible
            let adjustedRadius = radius;
            if (isLeadPoint) {
                // Reduce the radius for lead point to prevent clipping
                const leadPointSize = this.options.handleSize / 2 * 1.5; // Same as in drawColorPoint
                adjustedRadius = Math.max(radius - leadPointSize * 0.8, radius * 0.85);
            }
            
            const x = centerX + Math.cos(angle) * adjustedRadius;
            const y = centerY + Math.sin(angle) * adjustedRadius;

            // Store point position for interaction
            point.x = x;
            point.y = y;

            // Draw point with enhanced styling
            this.drawColorPoint(x, y, point, index);
            
            // Lead point positioning optimized
            if (index === 0) {
                // Lead point positioned successfully
            }
        });
    }

    /**
     * Draw premium color point with 3D neumorphic effects and micro-interactions
     */
    drawColorPoint(x, y, point, index) {
        const isActive = point.isActive;
        const isHovered = this.hoveredPointIndex === index;
        const isDragging = point.isDragging;
        const isLeadPoint = index === 0; // Lead point is the first color
        
        const baseRadius = isActive ? this.options.handleSize / 2 : this.options.harmonyPointSize / 2;
        let pointRadius = isActive ? baseRadius * 1.2 : baseRadius; // Enhanced scale for active point
        
        // Make lead point larger and ensure it's fully visible
        if (isLeadPoint) {
            pointRadius = pointRadius * 1.5; // 50% larger than regular points for better visibility
        }
        
        const strokeWidth = isActive ? 5 : 3;

        // Get point color with enhanced vibrancy
        let pointColor = this.harmonyEngine.hslToHex(point.hue, 100, 50);
        
        // Apply color blindness simulation to point colors
        if (this.currentColorBlindness !== 'normal') {
            const rgb = this.harmonyEngine.hslToRgb(point.hue, 100, 50);
            const simulatedRgb = this.colorBlindSimulator.simulateColorBlindness(
                rgb, 
                this.currentColorBlindness, 
                1.0
            );
            pointColor = this.harmonyEngine.rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
        }

        // Enhanced glow for active point or larger glow for lead point
        if (isActive || isLeadPoint) {
            const glowColor = 'rgba(61, 189, 245, 0.2)'; // Same blue for all
            const glowBlur = isLeadPoint ? 10 : 8; // Slightly more blur for lead
            const glowRadius = isLeadPoint ? pointRadius + 4 : pointRadius + 3; // Larger glow for lead
            
            this.ctx.shadowColor = glowColor;
            this.ctx.shadowBlur = glowBlur;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, glowRadius, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            this.ctx.fill();
            
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
        }

        // Subtle shadow for depth without harshness
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        this.ctx.shadowBlur = 6;
        this.ctx.shadowOffsetX = 1;
        this.ctx.shadowOffsetY = 1;

        // Draw main point circle with premium styling
        this.ctx.beginPath();
        this.ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
        this.ctx.fill();

        // Reset shadow for border
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

        // Draw premium colored border with enhanced stroke
        this.ctx.strokeStyle = pointColor;
        this.ctx.lineWidth = strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();

        // Subtle inner highlight for depth
        this.ctx.beginPath();
        this.ctx.arc(x - pointRadius * 0.2, y - pointRadius * 0.2, pointRadius * 0.2, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.fill();

        // Inner indicator for active point
        if (isActive) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, pointRadius * 0.5, 0, 2 * Math.PI);
            this.ctx.fillStyle = pointColor;
            this.ctx.fill();
        }

        // Hover effect for all points
        if (isHovered && !isActive) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, pointRadius + 2, 0, 2 * Math.PI);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }

        // Dragging indicator for all points
        if (isDragging) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, pointRadius + 6, 0, 2 * Math.PI);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }

    /**
     * Enhanced mouse down events for 5 interactive points
     */
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if clicking on any color point
        const clickedPointIndex = this.getPointAtPosition(x, y);
        if (clickedPointIndex !== -1) {
            this.isDragging = true;
            this.dragTarget = 'point';
            this.activePointIndex = clickedPointIndex;
            
            // Update active point
            this.colorPoints.forEach((point, index) => {
                point.isActive = index === clickedPointIndex;
            });
            
            // Store drag start position
            this.dragStartAngle = this.getAngleFromPosition(x, y);
            this.dragStartHue = this.colorPoints[clickedPointIndex].hue;
            this.colorPoints[clickedPointIndex].isDragging = true;
            
            this.updateColor();
            return;
        }

        // Check if clicking on color wheel (create new point or move existing)
        if (this.isOnColorWheel(x, y)) {
            const angle = this.getAngleFromPosition(x, y);
            const hue = (angle * 180 / Math.PI + 360) % 360;
            
            // Find closest point to update
            const closestPointIndex = this.getClosestPointIndex(hue);
            this.activePointIndex = closestPointIndex;
            
            // Update the closest point
            this.colorPoints[closestPointIndex].hue = hue;
            this.colorPoints.forEach((point, index) => {
                point.isActive = index === closestPointIndex;
            });
            
            this.isDragging = true;
            this.dragTarget = 'wheel';
            this.dragStartAngle = angle;
            this.dragStartHue = hue;
            this.colorPoints[closestPointIndex].isDragging = true;
            
            this.updateColor();
        }
    }

    /**
     * Enhanced mouse move events with smooth dragging
     */
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update hover state
        const hoveredPointIndex = this.getPointAtPosition(x, y);
        if (this.hoveredPointIndex !== hoveredPointIndex) {
            this.hoveredPointIndex = hoveredPointIndex;
            this.renderColorWheel(); // Re-render for hover effects
        }

        if (!this.isDragging) return;

        if (this.dragTarget === 'point' || this.dragTarget === 'wheel') {
            const angle = this.getAngleFromPosition(x, y);
            const hue = (angle * 180 / Math.PI + 360) % 360;
            
            // Update the active point
            if (this.activePointIndex !== -1) {
                this.colorPoints[this.activePointIndex].hue = hue;
                
                // If not in custom mode, apply harmony rules to other points
                if (!this.isCustomMode && this.currentHarmony !== 'custom') {
                    this.applyHarmonyToPoints();
                }
                
                this.updateColor();
            }
        }
    }

    /**
     * Enhanced mouse up events
     */
    handleMouseUp() {
        if (this.isDragging && this.activePointIndex !== -1) {
            this.colorPoints[this.activePointIndex].isDragging = false;
        }
        
        this.isDragging = false;
        this.dragTarget = null;
        this.dragStartAngle = 0;
        this.dragStartHue = 0;
    }

    /**
     * Handle touch events
     */
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    }

    handleTouchEnd(e) {
        e.preventDefault();
        this.handleMouseUp();
    }

    /**
     * Enhanced keyboard events for 5-point control
     */
    handleKeyDown(e) {
        const step = e.shiftKey ? 10 : 1;
        
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                this.close();
                break;
            case 'Tab':
                e.preventDefault();
                // Cycle through points
                this.activePointIndex = (this.activePointIndex + 1) % this.colorPoints.length;
                this.colorPoints.forEach((point, index) => {
                    point.isActive = index === this.activePointIndex;
                });
                this.updateColor();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (this.activePointIndex !== -1) {
                    this.colorPoints[this.activePointIndex].hue = (this.colorPoints[this.activePointIndex].hue - step + 360) % 360;
                    
                    // If not in custom mode, apply harmony rules to other points
                    if (!this.isCustomMode && this.currentHarmony !== 'custom') {
                        this.applyHarmonyToPoints();
                    }
                    
                    this.updateColor();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (this.activePointIndex !== -1) {
                    this.colorPoints[this.activePointIndex].hue = (this.colorPoints[this.activePointIndex].hue + step) % 360;
                    
                    // If not in custom mode, apply harmony rules to other points
                    if (!this.isCustomMode && this.currentHarmony !== 'custom') {
                        this.applyHarmonyToPoints();
                    }
                    
                    this.updateColor();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.currentLightness = Math.min(100, this.currentLightness + step);
                this.updateColor();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.currentLightness = Math.max(0, this.currentLightness - step);
                this.updateColor();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
                e.preventDefault();
                const pointIndex = parseInt(e.key) - 1;
                if (pointIndex >= 0 && pointIndex < this.colorPoints.length) {
                    this.activePointIndex = pointIndex;
                    this.colorPoints.forEach((point, index) => {
                        point.isActive = index === pointIndex;
                    });
                    this.updateColor();
                }
                break;
        }
    }

    /**
     * Get point at position (returns index or -1)
     */
    getPointAtPosition(x, y) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < this.colorPoints.length; i++) {
            const point = this.colorPoints[i];
            if (!point.x || !point.y) continue;
            
            const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
            const isLeadPoint = i === 0;
            
            // Adjust hit radius for lead point to match its larger visual size
            let hitRadius;
            if (isLeadPoint) {
                hitRadius = (this.options.handleSize / 2 * 1.5) + 4; // Match the visual size
            } else {
                hitRadius = point.isActive ? this.options.handleSize / 2 + 4 : this.options.harmonyPointSize / 2 + 2;
            }
            
            if (distance <= hitRadius) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Check if position is on color wheel
     */
    isOnColorWheel(x, y) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        return distance <= this.options.wheelRadius;
    }

    /**
     * Get angle from position
     */
    getAngleFromPosition(x, y) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        return Math.atan2(y - centerY, x - centerX);
    }

    /**
     * Get closest point index to a given hue
     */
    getClosestPointIndex(hue) {
        let closestIndex = 0;
        let minDistance = 360;
        
        this.colorPoints.forEach((point, index) => {
            const distance = Math.abs(point.hue - hue);
            const normalizedDistance = Math.min(distance, 360 - distance);
            
            if (normalizedDistance < minDistance) {
                minDistance = normalizedDistance;
                closestIndex = index;
            }
        });
        
        return closestIndex;
    }

    /**
     * Get active color point
     */
    getActiveColorPoint() {
        return this.colorPoints.find(point => point.isActive) || this.colorPoints[0];
    }

    /**
     * Update color display with active point
     */
    updateColorDisplay() {
        const activePoint = this.getActiveColorPoint();
        const hex = this.harmonyEngine.hslToHex(activePoint.hue, this.currentSaturation, this.currentLightness);
        const rgb = this.harmonyEngine.hslToRgb(activePoint.hue, this.currentSaturation, this.currentLightness);

        // Apply color blindness simulation if active
        let displayHex = hex;
        let displayRgb = rgb;
        
        if (this.currentColorBlindness && this.currentColorBlindness !== 'normal') {
            const simulatedRgb = this.colorBlindSimulator.simulateColorBlindness(rgb, this.currentColorBlindness);
            displayHex = this.harmonyEngine.rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
            displayRgb = simulatedRgb;
        }

        // Update color picker
        const picker = document.getElementById('color-wheel-picker');
        if (picker) picker.value = displayHex;

        // Update hex input
        const hexInput = document.getElementById('color-wheel-hex');
        if (hexInput) hexInput.value = displayHex;

        // Update RGB display
        const rgbInput = document.getElementById('color-wheel-rgb');
        if (rgbInput) rgbInput.value = `${displayRgb.r}, ${displayRgb.g}, ${displayRgb.b}`;

        // Update HSL display
        const hslInput = document.getElementById('color-wheel-hsl');
        if (hslInput) hslInput.value = `${activePoint.hue}°, ${this.currentSaturation}%, ${this.currentLightness}%`;

        // Update contrast preview
        this.updateContrastPreview();
    }

    /**
     * Update contrast preview with active point
     */
    updateContrastPreview() {
        const preview = document.getElementById('contrast-preview');
        if (!preview) return;

        const activePoint = this.getActiveColorPoint();
        const currentColor = this.harmonyEngine.hslToHex(activePoint.hue, this.currentSaturation, this.currentLightness);
        const white = '#ffffff';
        const black = '#000000';

        // Apply color blindness simulation if active
        let displayColor = currentColor;
        if (this.currentColorBlindness && this.currentColorBlindness !== 'normal') {
            const rgb = this.colorBlindSimulator.hexToRgb(currentColor);
            const simulatedRgb = this.colorBlindSimulator.simulateColorBlindness(rgb, this.currentColorBlindness);
            displayColor = this.colorBlindSimulator.rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
        }

        // Use the color that provides better contrast
        const contrastWithWhite = this.colorBlindSimulator.calculateContrastRatio(
            this.colorBlindSimulator.hexToRgb(displayColor),
            this.colorBlindSimulator.hexToRgb(white)
        );
        const contrastWithBlack = this.colorBlindSimulator.calculateContrastRatio(
            this.colorBlindSimulator.hexToRgb(displayColor),
            this.colorBlindSimulator.hexToRgb(black)
        );

        const textColor = contrastWithWhite > contrastWithBlack ? white : black;
        const ratio = Math.max(contrastWithWhite, contrastWithBlack);

        preview.style.backgroundColor = displayColor;
        preview.style.color = textColor;
        preview.textContent = 'Aa';

        // Update contrast ratio display
        const ratioDisplay = document.getElementById('contrast-ratio');
        if (ratioDisplay) ratioDisplay.textContent = `${ratio.toFixed(1)}:1`;

        // Update WCAG status
        this.updateWCAGStatus(ratio);
    }

    /**
     * Update WCAG status - ENTERPRISE-GRADE
     * Uses the same standards as the accessibility dashboard
     */
    updateWCAGStatus(ratio) {
        const compliance = this.colorBlindSimulator.checkWCAGCompliance(ratio);

        const aaStatus = document.getElementById('wcag-aa-status');
        const aaaStatus = document.getElementById('wcag-aaa-status');
        const aaLargeStatus = document.getElementById('wcag-aa-large-status');
        const levelDisplay = document.getElementById('wcag-level');
        const severityDisplay = document.getElementById('wcag-severity');

        // Update AA status with enhanced feedback
        if (aaStatus) {
            const aaText = compliance.aaNormal ? '✓ Pass' : '✗ Fail';
            const aaClass = compliance.aaNormal ? 'text-green-600 font-medium' : 'text-red-600 font-medium';
            aaStatus.textContent = aaText;
            aaStatus.className = aaClass;
            aaStatus.title = `WCAG AA (4.5:1) - ${compliance.level}`;
        }

        // Update AAA status with enhanced feedback
        if (aaaStatus) {
            const aaaText = compliance.aaaNormal ? '✓ Pass' : '✗ Fail';
            const aaaClass = compliance.aaaNormal ? 'text-green-600 font-medium' : 'text-red-600 font-medium';
            aaaStatus.textContent = aaaText;
            aaaStatus.className = aaaClass;
            aaaStatus.title = `WCAG AAA (7:1) - ${compliance.level}`;
        }

        // Update AA Large status with enhanced feedback
        if (aaLargeStatus) {
            const aaLargeText = compliance.aaLarge ? '✓ Pass' : '✗ Fail';
            const aaLargeClass = compliance.aaLarge ? 'text-green-600 font-medium' : 'text-red-600 font-medium';
            aaLargeStatus.textContent = aaLargeText;
            aaLargeStatus.className = aaLargeClass;
            aaLargeStatus.title = `WCAG AA Large (3:1) - ${compliance.level}`;
        }

        // Update level display if element exists
        if (levelDisplay) {
            levelDisplay.textContent = compliance.level;
            levelDisplay.className = compliance.aaNormal ? 'text-green-600 font-medium' : 'text-red-600 font-medium';
        }

        // Update severity display if element exists
        if (severityDisplay) {
            severityDisplay.textContent = compliance.severity;
            const severityClass = compliance.severity === 'Critical' ? 'text-red-600' : 
                                compliance.severity === 'High' ? 'text-orange-600' : 
                                compliance.severity === 'Moderate' ? 'text-yellow-600' : 'text-green-600';
            severityDisplay.className = `font-medium ${severityClass}`;
        }


    }

    /**
     * Generate palette from 5 color points with monochromatic variations
     */
    generatePalette() {
        let palette;
        
        if (this.currentHarmony === 'monochromatic') {
            // For monochromatic, use different lightness values for each point
            palette = this.colorPoints.map((point, index) => ({
                h: point.hue,
                s: this.currentSaturation,
                l: 15 + (index * 20) // 15%, 35%, 55%, 75%, 95% (5 variations)
            }));
        } else if (this.currentHarmony === 'custom') {
            // For custom mode, use the current positions as-is
            palette = this.colorPoints.map(point => ({
                h: point.hue,
                s: this.currentSaturation,
                l: this.currentLightness
            }));
        } else {
            // Use the 5 color points directly as the palette
            palette = this.colorPoints.map(point => ({
                h: point.hue,
                s: this.currentSaturation,
                l: this.currentLightness
            }));
        }
        
        this.renderPalette(palette);
        this.onPaletteChange(palette);
    }

    /**
     * Render palette swatches
     */
    renderPalette(palette) {
        const container = document.getElementById('color-wheel-palette');
        if (!container) return;

        container.innerHTML = '';

        palette.forEach((color, index) => {
            const hex = this.harmonyEngine.hslToHex(color.h, color.s, color.l);
            const rgb = this.harmonyEngine.hslToRgb(color.h, color.s, color.l);

            // Apply color blindness simulation if active
            let displayHex = hex;
            let displayRgb = rgb;
            
            if (this.currentColorBlindness && this.currentColorBlindness !== 'normal') {
                const simulatedRgb = this.colorBlindSimulator.simulateColorBlindness(rgb, this.currentColorBlindness);
                displayHex = this.harmonyEngine.rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
                displayRgb = simulatedRgb;
            }

            const swatch = document.createElement('div');
            swatch.className = 'color-wheel-swatch';
            swatch.style.backgroundColor = displayHex;
            swatch.innerHTML = `
                <div class="swatch-info text-xs font-mono font-medium text-white bg-black bg-opacity-75 px-1.5 py-0.5 rounded">${displayHex}</div>
            `;

            swatch.addEventListener('click', () => {
                // Activate the specific point that corresponds to this color
                this.activatePointByIndex(index, color);
            });

            container.appendChild(swatch);
        });
    }

    /**
     * Set color from hex and activate corresponding point
     */
    setColorFromHex(hex) {
        const rgb = this.harmonyEngine.hexToRgb(hex);
        if (!rgb) return;

        const hsl = this.harmonyEngine.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        // Use the same logic as setColorFromHSL
        this.setColorFromHSL(hsl);
    }

    /**
     * Activate a specific point by index and update its color
     */
    activatePointByIndex(index, color) {
        // Ensure index is within bounds
        if (index < 0 || index >= this.colorPoints.length) {
            return;
        }

        // Deactivate all points
        this.colorPoints.forEach((point, i) => {
            point.isActive = i === index;
        });

        // Update the target point's hue
        this.colorPoints[index].hue = color.h;
        
        // Update global state
        this.currentSaturation = color.s;
        this.currentLightness = color.l;
        this.activePointIndex = index;

        // If not in custom mode, apply harmony rules to maintain consistency
        if (!this.isCustomMode && this.currentHarmony !== 'custom') {
            this.applyHarmonyToPoints();
        }

        // Update the UI
        this.updateColor();
        this.renderColorWheel();
    }

    /**
     * Set color from HSL and activate corresponding point
     */
    setColorFromHSL(hsl) {
        // Find the point that best matches this color
        const targetHue = hsl.h;
        let bestMatchIndex = 0;
        let smallestDifference = 360;

        // Find the point with the closest hue to the target
        this.colorPoints.forEach((point, index) => {
            const hueDifference = Math.min(
                Math.abs(point.hue - targetHue),
                Math.abs(point.hue - targetHue + 360),
                Math.abs(point.hue - targetHue - 360)
            );
            
            if (hueDifference < smallestDifference) {
                smallestDifference = hueDifference;
                bestMatchIndex = index;
            }
        });

        // Activate the best matching point
        this.colorPoints.forEach((point, index) => {
            point.isActive = index === bestMatchIndex;
        });

        // Update the active point's hue to match exactly
        this.colorPoints[bestMatchIndex].hue = targetHue;
        
        this.currentSaturation = hsl.s;
        this.currentLightness = hsl.l;

        // Update the active point index for proper state management
        this.activePointIndex = bestMatchIndex;

        // If not in custom mode, apply harmony rules to maintain consistency
        if (!this.isCustomMode && this.currentHarmony !== 'custom') {
            this.applyHarmonyToPoints();
        }

        this.updateColor();
        this.renderColorWheel();
    }

    /**
     * Set harmony type and apply to 5-point system
     */
    setHarmony(harmonyType) {
        this.currentHarmony = harmonyType;

        // Update button states
        document.querySelectorAll('.harmony-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-accent', 'text-white');
            btn.classList.add('bg-secondary', 'text-primary');
        });

        const activeBtn = document.querySelector(`[data-harmony="${harmonyType}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'bg-accent', 'text-white');
            activeBtn.classList.remove('bg-secondary', 'text-primary');
        }

        // Apply harmony rules to the 5 points
        this.applyHarmonyToPoints();
        this.generatePalette();
        this.renderColorWheel();
    }

    /**
     * Apply harmony rules to the 5 color points
     */
    applyHarmonyToPoints() {
        const baseHue = this.colorPoints[0].hue; // Use first point as base
        
        switch (this.currentHarmony) {
            case 'custom':
                // In custom mode, don't apply any rules - let user move freely
                this.isCustomMode = true;
                return;
                
            case 'analogous':
                // 5 colors 30° apart
                this.colorPoints[0].hue = baseHue;
                this.colorPoints[1].hue = (baseHue + 30) % 360;
                this.colorPoints[2].hue = (baseHue + 60) % 360;
                this.colorPoints[3].hue = (baseHue + 90) % 360;
                this.colorPoints[4].hue = (baseHue + 120) % 360;
                this.isCustomMode = false;
                break;
                
            case 'complementary':
                // Base color and its complement, plus variations
                this.colorPoints[0].hue = baseHue;
                this.colorPoints[1].hue = (baseHue + 180) % 360; // Complement
                this.colorPoints[2].hue = (baseHue + 30) % 360; // Analogous
                this.colorPoints[3].hue = (baseHue + 210) % 360; // Complement's analogous
                this.colorPoints[4].hue = (baseHue + 60) % 360; // Second analogous
                this.isCustomMode = false;
                break;
                
            case 'triadic':
                // Three colors 120° apart
                this.colorPoints[0].hue = baseHue;
                this.colorPoints[1].hue = (baseHue + 120) % 360;
                this.colorPoints[2].hue = (baseHue + 240) % 360;
                this.colorPoints[3].hue = (baseHue + 30) % 360; // Analogous to first
                this.colorPoints[4].hue = (baseHue + 150) % 360; // Analogous to second
                this.isCustomMode = false;
                break;
                
            case 'tetradic':
                // Four colors 90° apart (double complementary)
                this.colorPoints[0].hue = baseHue;
                this.colorPoints[1].hue = (baseHue + 90) % 360;
                this.colorPoints[2].hue = (baseHue + 180) % 360;
                this.colorPoints[3].hue = (baseHue + 270) % 360;
                this.colorPoints[4].hue = (baseHue + 45) % 360; // Midpoint
                this.isCustomMode = false;
                break;
                
            case 'split-complementary':
                // Base color and two colors adjacent to its complement
                this.colorPoints[0].hue = baseHue;
                this.colorPoints[1].hue = (baseHue + 150) % 360; // Split complement 1
                this.colorPoints[2].hue = (baseHue + 210) % 360; // Split complement 2
                this.colorPoints[3].hue = (baseHue + 30) % 360; // Analogous to base
                this.colorPoints[4].hue = (baseHue + 330) % 360; // Analogous to base (opposite side)
                this.isCustomMode = false;
                break;
                
            case 'monochromatic':
                // Same hue, but spread them slightly for visual distinction
                this.colorPoints[0].hue = baseHue;
                this.colorPoints[1].hue = (baseHue + 5) % 360;  // Slight variation
                this.colorPoints[2].hue = (baseHue + 10) % 360; // Slight variation
                this.colorPoints[3].hue = (baseHue + 15) % 360; // Slight variation
                this.colorPoints[4].hue = (baseHue + 20) % 360; // Slight variation
                this.isCustomMode = false;
                break;
        }
    }

    /**
     * Set color blindness type and apply simulation
     */
    setColorBlindness(type) {
        this.currentColorBlindness = type;

        // Update button states
        document.querySelectorAll('.colorblind-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-accent', 'text-white');
            btn.classList.add('bg-secondary', 'text-primary');
        });

        const activeBtn = document.querySelector(`[data-type="${type}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active', 'bg-accent', 'text-white');
            activeBtn.classList.remove('bg-secondary', 'text-primary');
        }

        // Apply color blindness simulation to the wheel and regenerate palette
        this.renderColorWheel();
        this.generatePalette(); // Regenerate palette with color blindness simulation
    }

    /**
     * Update color
     */
    updateColor() {
        this.updateColorDisplay();
        this.generatePalette();
        this.renderColorWheel();
        this.onColorChange(this.getCurrentColor());
    }

    /**
     * Get current color from active point
     */
    getCurrentColor() {
        const activePoint = this.getActiveColorPoint();
        return {
            hex: this.harmonyEngine.hslToHex(activePoint.hue, this.currentSaturation, this.currentLightness),
            rgb: this.harmonyEngine.hslToRgb(activePoint.hue, this.currentSaturation, this.currentLightness),
            hsl: { h: activePoint.hue, s: this.currentSaturation, l: this.currentLightness }
        };
    }

    /**
     * Copy current color to clipboard
     */
    copyCurrentColor() {
        const color = this.getCurrentColor();
        navigator.clipboard.writeText(color.hex).then(() => {
            // Show success message
            this.showToast('Color copied to clipboard!', 'info');
        }).catch(() => {
            this.showToast('Failed to copy color', 'error');
        });
    }

    /**
     * Export CSS variables from 5-point palette
     */
    exportCSS() {
        let palette;
        
        if (this.currentHarmony === 'monochromatic') {
            // For monochromatic, use different lightness values for each point
            palette = this.colorPoints.map((point, index) => ({
                h: point.hue,
                s: this.currentSaturation,
                l: 15 + (index * 20) // 15%, 35%, 55%, 75%, 95% (5 variations)
            }));
        } else if (this.currentHarmony === 'custom') {
            // For custom mode, use the current positions as-is
            palette = this.colorPoints.map(point => ({
                h: point.hue,
                s: this.currentSaturation,
                l: this.currentLightness
            }));
        } else {
            // Use the 5 color points directly as the palette
            palette = this.colorPoints.map(point => ({
                h: point.hue,
                s: this.currentSaturation,
                l: this.currentLightness
            }));
        }
        
        let css = ':root {\n';
        
        palette.forEach((color, index) => {
            const hex = this.harmonyEngine.hslToHex(color.h, color.s, color.l);
            const rgb = this.harmonyEngine.hslToRgb(color.h, color.s, color.l);
            
            // Apply color blindness simulation if active
            let displayHex = hex;
            if (this.currentColorBlindness && this.currentColorBlindness !== 'normal') {
                const simulatedRgb = this.colorBlindSimulator.simulateColorBlindness(rgb, this.currentColorBlindness);
                displayHex = this.harmonyEngine.rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
            }
            
            css += `  --color-${index + 1}: ${displayHex};\n`;
        });
        
        css += '}';

        navigator.clipboard.writeText(css).then(() => {
            this.showToast('CSS variables copied to clipboard!', 'info');
        }).catch(() => {
            this.showToast('Failed to copy CSS', 'error');
        });
    }

    /**
     * Export JSON from 5-point palette
     */
    exportJSON() {
        let palette;
        
        if (this.currentHarmony === 'monochromatic') {
            // For monochromatic, use different lightness values for each point
            palette = this.colorPoints.map((point, index) => ({
                h: point.hue,
                s: this.currentSaturation,
                l: 15 + (index * 20) // 15%, 35%, 55%, 75%, 95% (5 variations)
            }));
        } else if (this.currentHarmony === 'custom') {
            // For custom mode, use the current positions as-is
            palette = this.colorPoints.map(point => ({
                h: point.hue,
                s: this.currentSaturation,
                l: this.currentLightness
            }));
        } else {
            // Use the 5 color points directly as the palette
            palette = this.colorPoints.map(point => ({
                h: point.hue,
                s: this.currentSaturation,
                l: this.currentLightness
            }));
        }
        
        const json = {
            baseColor: this.getCurrentColor(),
            harmony: this.currentHarmony,
            colorPoints: this.colorPoints.map(point => ({
                id: point.id,
                hue: point.hue,
                isActive: point.isActive
            })),
            palette: palette.map(color => {
                const hex = this.harmonyEngine.hslToHex(color.h, color.s, color.l);
                const rgb = this.harmonyEngine.hslToRgb(color.h, color.s, color.l);
                
                // Apply color blindness simulation if active
                let displayHex = hex;
                let displayRgb = rgb;
                
                if (this.currentColorBlindness && this.currentColorBlindness !== 'normal') {
                    const simulatedRgb = this.colorBlindSimulator.simulateColorBlindness(rgb, this.currentColorBlindness);
                    displayHex = this.harmonyEngine.rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
                    displayRgb = simulatedRgb;
                }
                
                return {
                    hsl: color,
                    hex: displayHex,
                    rgb: displayRgb,
                    originalHex: hex,
                    originalRgb: rgb,
                    colorBlindness: this.currentColorBlindness
                };
            })
        };

        navigator.clipboard.writeText(JSON.stringify(json, null, 2)).then(() => {
            this.showToast('JSON copied to clipboard!', 'info');
        }).catch(() => {
            this.showToast('Failed to copy JSON', 'error');
        });
    }

    /**
     * Apply 5-point palette to main palette
     */
    applyToMainPalette() {
        let hexColors;
        

        
        if (this.currentHarmony === 'monochromatic') {
            // For monochromatic, use different lightness values for each point
            hexColors = this.colorPoints.map((point, index) => 
                this.harmonyEngine.hslToHex(point.hue, this.currentSaturation, 15 + (index * 20))
            );
        } else if (this.currentHarmony === 'custom') {
            // For custom mode, use the current positions as-is
            hexColors = this.colorPoints.map(point => 
                this.harmonyEngine.hslToHex(point.hue, this.currentSaturation, this.currentLightness)
            );
        } else {
            // Use the 5 color points directly as the palette
            hexColors = this.colorPoints.map(point => 
                this.harmonyEngine.hslToHex(point.hue, this.currentSaturation, this.currentLightness)
            );
        }
        
        // Apply color blindness simulation if active
        let displayHexColors = hexColors;
        if (this.currentColorBlindness && this.currentColorBlindness !== 'normal') {
            displayHexColors = hexColors.map(hex => {
                const rgb = this.colorBlindSimulator.hexToRgb(hex);
                const simulatedRgb = this.colorBlindSimulator.simulateColorBlindness(rgb, this.currentColorBlindness);
                return this.colorBlindSimulator.rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
            });
        }
        

        
        // Get current harmony information for better integration
        const harmonyInfo = {
            'analogous': 'analogic',
            'complementary': 'complement', 
            'triadic': 'triad',
            'tetradic': 'quad',
            'split-complementary': 'split-complement',
            'monochromatic': 'monochrome',
            'custom': 'analogic'
        };
        
        // Determine the harmony type that best matches the current wheel state
        const detectedHarmony = harmonyInfo[this.currentHarmony] || 'analogic';
        
        // Validate palette before dispatching
        if (!displayHexColors || displayHexColors.length === 0) {
            this.showToast('Error: Invalid palette generated', 'error');
            return;
        }
        
        // Validate each color
        const validColors = displayHexColors.filter(color => 
            color && typeof color === 'string' && color.match(/^#[0-9A-Fa-f]{6}$/)
        );
        
        if (validColors.length !== displayHexColors.length) {
            this.showToast('Error: Invalid colors in palette', 'error');
            return;
        }
        
        // Dispatch custom event for main app to handle with comprehensive data
        const eventData = { 
            palette: validColors,
            colorBlindness: this.currentColorBlindness,
            originalPalette: hexColors,
            harmonyType: this.currentHarmony,
            detectedHarmony: detectedHarmony,
            colorPoints: this.colorPoints.map(point => ({
                hue: point.hue,
                saturation: this.currentSaturation,
                lightness: this.currentLightness
            }))
        };
        


        
        const event = new CustomEvent('colorWheelPaletteApplied', {
            detail: eventData
        });
        document.dispatchEvent(event);
        
        this.showToast('Palette applied to main generator!', 'info');
        
        // Automatically close modal after successful palette application
        // This provides a seamless user experience as users will want to see the applied palette
        setTimeout(() => {
            this.close();
        }, 100); // Small delay to ensure toast is visible before closing
    }

    /**
     * Default toast method (fallback)
     */
    defaultShowToast(message, isError = false) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.className = `smooth-transition ${isError ? 'bg-red-500 text-white' : 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800'}`;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    /**
     * Show toast message using main app's toast system
     */
    showToast(message, type = 'info') {
        const isError = type === 'error';
        this.externalShowToast(message, isError);
    }

    /**
     * Open the color wheel modal
     */
    open() {
        const modal = document.getElementById('color-wheel-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Initialize canvas after modal is visible to avoid zero dimensions warning
            setTimeout(() => {
                this.setupCanvas();
                this.canvas?.focus();
            }, 100);
            
            // Initialize palette layout optimization
            setTimeout(() => {
                this.optimizePaletteLayout();
            }, 150);
        }
    }

    /**
     * Close the color wheel modal
     */
    close() {
        const modal = document.getElementById('color-wheel-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    /**
     * Monitor performance and detect issues
     */
    monitorPerformance() {
        try {
            const now = performance.now();
            const timeSinceLastRender = now - this.lastRenderTime;
            
            // Detect performance issues
            if (timeSinceLastRender > 1000) {
                console.warn('ColorWheel: Performance issue detected - no rendering for', timeSinceLastRender, 'ms');
            }
            
            // Check memory usage if available
            if (performance.memory) {
                const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
                if (memoryUsage > 50) {
                    console.warn('ColorWheel: High memory usage detected:', memoryUsage.toFixed(2), 'MB');
                }
            }
            
        } catch (error) {
            console.error('ColorWheel: Error during performance monitoring:', error);
        }
    }
    
    /**
     * Destroy the component with comprehensive cleanup
     */
    destroy() {
        try {
            // Cleanup resize handler
            if (this.cleanupResizeHandler) {
                this.cleanupResizeHandler();
            }
            
            // Cleanup responsive resize handler
            if (this.cleanupResponsiveResize) {
                this.cleanupResponsiveResize();
            }
            
            // Cleanup palette touch event listeners
            const paletteContainer = document.getElementById('color-wheel-palette');
            if (paletteContainer) {
                paletteContainer.removeEventListener('touchstart', this.handlePaletteTouchStart?.bind(this));
                paletteContainer.removeEventListener('touchmove', this.handlePaletteTouchMove?.bind(this));
            }
            
            // Clear any pending timeouts
            if (this.renderTimeout) {
                clearTimeout(this.renderTimeout);
            }
            
            // Remove canvas event listeners
            if (this.canvas) {
                this.canvas.removeEventListener('mousedown', this.handleMouseDown);
                this.canvas.removeEventListener('mousemove', this.handleMouseMove);
                this.canvas.removeEventListener('mouseup', this.handleMouseUp);
                this.canvas.removeEventListener('touchstart', this.handleTouchStart);
                this.canvas.removeEventListener('touchmove', this.handleTouchMove);
                this.canvas.removeEventListener('touchend', this.handleTouchEnd);
                this.canvas.removeEventListener('keydown', this.handleKeyDown);
            }
            
            // Clear canvas context
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
            }
            
        // Remove event listeners and clean up
        this.close();
        const modal = document.getElementById('color-wheel-modal');
        if (modal) {
            modal.remove();
            }
            
            // Clear references
            this.canvas = null;
            this.ctx = null;
            this.responsiveState = null;
            
            console.log('ColorWheel: Component destroyed successfully');
            
        } catch (error) {
            console.error('ColorWheel: Error during component destruction:', error);
        }
    }
}