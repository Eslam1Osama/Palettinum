// Color Blindness Simulator - Color Vision Deficiency Simulation
export class ColorBlindSimulator {
    constructor() {
        // Color transformation matrices for different types of color blindness
        this.matrices = {
            // Protanopia (red-green color blindness, missing red cones)
            protanopia: [
                [0.567, 0.433, 0.000],
                [0.558, 0.442, 0.000],
                [0.000, 0.242, 0.758]
            ],
            
            // Deuteranopia (red-green color blindness, missing green cones)
            deuteranopia: [
                [0.625, 0.375, 0.000],
                [0.700, 0.300, 0.000],
                [0.000, 0.300, 0.700]
            ],
            
            // Tritanopia (blue-yellow color blindness, missing blue cones)
            tritanopia: [
                [0.950, 0.050, 0.000],
                [0.000, 0.433, 0.567],
                [0.000, 0.475, 0.525]
            ]
        };

        // Severity levels for simulation
        this.severityLevels = {
            mild: 0.3,
            moderate: 0.6,
            severe: 1.0
        };
    }

    /**
     * Simulate color blindness by applying transformation matrix
     * @param {Object} rgb - RGB color object {r, g, b}
     * @param {string} type - Type of color blindness
     * @param {string} severity - Severity level (mild, moderate, severe)
     * @returns {Object} Transformed RGB color object
     */
    simulateColorBlindness(rgb, type, severity = 'moderate') {
        if (!this.matrices[type]) {
            throw new Error(`Unknown color blindness type: ${type}`);
        }

        const matrix = this.matrices[type];
        const severityFactor = this.severityLevels[severity] || 0.6;

        // Apply transformation matrix
        const transformed = {
            r: Math.round(matrix[0][0] * rgb.r + matrix[0][1] * rgb.g + matrix[0][2] * rgb.b),
            g: Math.round(matrix[1][0] * rgb.r + matrix[1][1] * rgb.g + matrix[1][2] * rgb.b),
            b: Math.round(matrix[2][0] * rgb.r + matrix[2][1] * rgb.g + matrix[2][2] * rgb.b)
        };

        // Apply severity factor (blend with original color)
        if (severityFactor < 1.0) {
            transformed.r = Math.round(transformed.r * severityFactor + rgb.r * (1 - severityFactor));
            transformed.g = Math.round(transformed.g * severityFactor + rgb.g * (1 - severityFactor));
            transformed.b = Math.round(transformed.b * severityFactor + rgb.b * (1 - severityFactor));
        }

        // Clamp values to valid range
        transformed.r = Math.max(0, Math.min(255, transformed.r));
        transformed.g = Math.max(0, Math.min(255, transformed.g));
        transformed.b = Math.max(0, Math.min(255, transformed.b));

        return transformed;
    }

    /**
     * Simulate color blindness for HSL color
     * @param {Object} hsl - HSL color object {h, s, l}
     * @param {string} type - Type of color blindness
     * @param {string} severity - Severity level
     * @returns {Object} Transformed HSL color object
     */
    simulateColorBlindnessHSL(hsl, type, severity = 'moderate') {
        // Convert HSL to RGB
        const rgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
        
        // Apply color blindness simulation
        const simulatedRgb = this.simulateColorBlindness(rgb, type, severity);
        
        // Convert back to HSL
        return this.rgbToHsl(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
    }

    /**
     * Simulate color blindness for hex color
     * @param {string} hex - Hex color string
     * @param {string} type - Type of color blindness
     * @param {string} severity - Severity level
     * @returns {string} Transformed hex color string
     */
    simulateColorBlindnessHex(hex, type, severity = 'moderate') {
        // Convert hex to RGB
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        
        // Apply color blindness simulation
        const simulatedRgb = this.simulateColorBlindness(rgb, type, severity);
        
        // Convert back to hex
        return this.rgbToHex(simulatedRgb.r, simulatedRgb.g, simulatedRgb.b);
    }

    /**
     * Simulate color blindness for an entire palette
     * @param {Array} palette - Array of color objects
     * @param {string} type - Type of color blindness
     * @param {string} severity - Severity level
     * @returns {Array} Transformed palette
     */
    simulatePaletteColorBlindness(palette, type, severity = 'moderate') {
        return palette.map(color => {
            if (color.h !== undefined) {
                // HSL color
                return this.simulateColorBlindnessHSL(color, type, severity);
            } else if (color.r !== undefined) {
                // RGB color
                return this.simulateColorBlindness(color, type, severity);
            } else if (typeof color === 'string' && color.startsWith('#')) {
                // Hex color
                const simulatedHex = this.simulateColorBlindnessHex(color, type, severity);
                return simulatedHex;
            }
            return color;
        });
    }

    /**
     * Get available color blindness types
     * @returns {Array} Array of color blindness types
     */
    getColorBlindnessTypes() {
        return Object.keys(this.matrices);
    }

    /**
     * Get available severity levels
     * @returns {Array} Array of severity levels
     */
    getSeverityLevels() {
        return Object.keys(this.severityLevels);
    }

    /**
     * Get description for color blindness type
     * @param {string} type - Color blindness type
     * @returns {string} Description
     */
    getColorBlindnessDescription(type) {
        const descriptions = {
            protanopia: 'Red-green color blindness (missing red cones)',
            deuteranopia: 'Red-green color blindness (missing green cones)',
            tritanopia: 'Blue-yellow color blindness (missing blue cones)'
        };
        return descriptions[type] || 'Unknown color blindness type';
    }

    /**
     * Calculate contrast ratio between two colors
     * @param {Object} color1 - First color (RGB)
     * @param {Object} color2 - Second color (RGB)
     * @returns {number} Contrast ratio
     */
    calculateContrastRatio(color1, color2) {
        const luminance1 = this.calculateLuminance(color1.r, color1.g, color1.b);
        const luminance2 = this.calculateLuminance(color2.r, color2.g, color2.b);
        
        const lighter = Math.max(luminance1, luminance2);
        const darker = Math.min(luminance1, luminance2);
        
        return (lighter + 0.05) / (darker + 0.05);
    }

    /**
     * Calculate relative luminance
     * @param {number} r - Red component
     * @param {number} g - Green component
     * @param {number} b - Blue component
     * @returns {number} Relative luminance
     */
    calculateLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    /**
     * Check WCAG compliance for contrast ratio - ENTERPRISE-GRADE
     * Uses the same standards as the accessibility dashboard
     * @param {number} ratio - Contrast ratio
     * @returns {Object} WCAG compliance status
     */
    checkWCAGCompliance(ratio) {
        // Use the same WCAG standards as accessibility dashboard
        const aaNormal = ratio >= 4.5;  // WCAG AA standard
        const aaLarge = ratio >= 3.0;   // WCAG AA large text
        const aaaNormal = ratio >= 7.0; // WCAG AAA standard
        const aaaLarge = ratio >= 4.5;  // WCAG AAA large text
        
        // Determine status level using same logic as main report
        let status = 'fail';
        if (ratio >= 7.0) status = 'aaa';
        else if (ratio >= 4.5) status = 'aa';
        else if (ratio >= 3.0) status = 'pass-large';
        
        return {
            ratio: ratio,
            aaNormal: aaNormal,
            aaLarge: aaLarge,
            aaaNormal: aaaNormal,
            aaaLarge: aaaLarge,
            status: status,
            // Add enterprise-grade metrics
            level: this.getContrastLevel(ratio),
            severity: this.getContrastSeverity(ratio),
            priority: this.getContrastPriority(ratio)
        };
    }
    
    /**
     * Get contrast level - matches accessibility dashboard
     * @param {number} ratio - Contrast ratio
     * @returns {string} Contrast level
     */
    getContrastLevel(ratio) {
        if (ratio >= 7) return 'AAA (Excellent)';
        if (ratio >= 4.5) return 'AA (Good)';
        if (ratio >= 3) return 'A (Acceptable)';
        return 'Fail (Poor)';
    }
    
    /**
     * Get contrast severity - matches accessibility dashboard
     * @param {number} ratio - Contrast ratio
     * @returns {string} Severity level
     */
    getContrastSeverity(ratio) {
        if (ratio >= 7) return 'Low';
        if (ratio >= 4.5) return 'Moderate';
        if (ratio >= 3) return 'High';
        return 'Critical';
    }
    
    /**
     * Get contrast priority - matches accessibility dashboard
     * @param {number} ratio - Contrast ratio
     * @returns {string} Priority level
     */
    getContrastPriority(ratio) {
        if (ratio >= 7) return 'Informational';
        if (ratio >= 4.5) return 'Minor';
        if (ratio >= 3) return 'Major';
        return 'Critical';
    }

    /**
     * Convert hex to RGB
     * @param {string} hex - Hex color string
     * @returns {Object|null} RGB object or null if invalid
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Convert RGB to hex
     * @param {number} r - Red component
     * @param {number} g - Green component
     * @param {number} b - Blue component
     * @returns {string} Hex color string
     */
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * Convert HSL to RGB
     * @param {number} h - Hue in degrees
     * @param {number} s - Saturation percentage
     * @param {number} l - Lightness percentage
     * @returns {Object} RGB object
     */
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    /**
     * Convert RGB to HSL
     * @param {number} r - Red component (0-255)
     * @param {number} g - Green component (0-255)
     * @param {number} b - Blue component (0-255)
     * @returns {Object} HSL object
     */
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }
} 