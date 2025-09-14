// Harmony Engine - Color Theory Calculations
export class HarmonyEngine {
    constructor() {
        this.harmonyRules = {
            analogous: {
                name: 'Analogous',
                description: 'Colors that are next to each other on the color wheel',
                angles: [0, 30, 60],
                spread: 30
            },
            complementary: {
                name: 'Complementary',
                description: 'Colors that are opposite each other on the color wheel',
                angles: [0, 180],
                spread: 15
            },
            triadic: {
                name: 'Triadic',
                description: 'Three colors equally spaced around the color wheel',
                angles: [0, 120, 240],
                spread: 20
            },
            tetradic: {
                name: 'Tetradic',
                description: 'Four colors forming a rectangle on the color wheel',
                angles: [0, 90, 180, 270],
                spread: 15
            },
            'split-complementary': {
                name: 'Split-Complementary',
                description: 'A base color and two colors adjacent to its complement',
                angles: [0, 150, 210],
                spread: 20
            },
            monochromatic: {
                name: 'Monochromatic',
                description: 'Variations of a single hue with different saturation and lightness',
                angles: [0],
                spread: 0
            }
        };
    }

    /**
     * Calculate harmony colors based on a base hue and harmony rule
     * @param {number} baseHue - Base hue in degrees (0-360)
     * @param {string} harmonyType - Type of harmony rule
     * @param {number} saturation - Saturation percentage (0-100)
     * @param {number} lightness - Lightness percentage (0-100)
     * @returns {Array} Array of HSL color objects
     */
    calculateHarmony(baseHue, harmonyType, saturation = 50, lightness = 50) {
        const rule = this.harmonyRules[harmonyType];
        if (!rule) {
            throw new Error(`Unknown harmony type: ${harmonyType}`);
        }

        const colors = [];
        
        rule.angles.forEach(angle => {
            const hue = (baseHue + angle) % 360;
            
            if (harmonyType === 'monochromatic') {
                // Create variations with different saturation and lightness
                colors.push(
                    { h: hue, s: Math.max(20, saturation - 20), l: Math.max(20, lightness - 20) },
                    { h: hue, s: saturation, l: lightness },
                    { h: hue, s: Math.min(100, saturation + 20), l: Math.min(80, lightness + 20) }
                );
            } else {
                colors.push({ h: hue, s: saturation, l: lightness });
            }
        });

        return colors;
    }

    /**
     * Generate a full palette with harmony colors and variations
     * @param {number} baseHue - Base hue in degrees
     * @param {string} harmonyType - Type of harmony rule
     * @param {number} numColors - Number of colors to generate
     * @returns {Array} Array of HSL color objects
     */
    generatePalette(baseHue, harmonyType, numColors = 5) {
        const baseColors = this.calculateHarmony(baseHue, harmonyType);
        const palette = [];

        // Add base colors
        palette.push(...baseColors);

        // Generate additional variations if needed
        if (palette.length < numColors) {
            const additionalColors = this.generateVariations(baseHue, harmonyType, numColors - palette.length);
            palette.push(...additionalColors);
        }

        // Limit to requested number of colors
        return palette.slice(0, numColors);
    }

    /**
     * Generate color variations for additional palette colors
     * @param {number} baseHue - Base hue in degrees
     * @param {string} harmonyType - Type of harmony rule
     * @param {number} count - Number of variations to generate
     * @returns {Array} Array of HSL color objects
     */
    generateVariations(baseHue, harmonyType, count) {
        const variations = [];
        const rule = this.harmonyRules[harmonyType];

        for (let i = 0; i < count; i++) {
            // Create variations with different saturation and lightness
            const hue = (baseHue + (i * 45)) % 360; // 45-degree increments
            const saturation = 30 + (i * 15) % 70; // Vary saturation
            const lightness = 40 + (i * 10) % 60; // Vary lightness

            variations.push({ h: hue, s: saturation, l: lightness });
        }

        return variations;
    }

    /**
     * Get harmony rule information
     * @param {string} harmonyType - Type of harmony rule
     * @returns {Object} Harmony rule information
     */
    getHarmonyRule(harmonyType) {
        return this.harmonyRules[harmonyType] || null;
    }

    /**
     * Get all available harmony types
     * @returns {Array} Array of harmony type names
     */
    getHarmonyTypes() {
        return Object.keys(this.harmonyRules);
    }

    /**
     * Calculate the angles for visual representation on the color wheel
     * @param {number} baseHue - Base hue in degrees
     * @param {string} harmonyType - Type of harmony rule
     * @returns {Array} Array of angle objects for drawing
     */
    getHarmonyAngles(baseHue, harmonyType) {
        const rule = this.harmonyRules[harmonyType];
        if (!rule) return [];

        return rule.angles.map(angle => ({
            angle: (baseHue + angle) % 360,
            spread: rule.spread,
            type: harmonyType
        }));
    }

    /**
     * Validate a harmony type
     * @param {string} harmonyType - Type to validate
     * @returns {boolean} True if valid
     */
    isValidHarmonyType(harmonyType) {
        return this.harmonyRules.hasOwnProperty(harmonyType);
    }

    /**
     * Get complementary hue
     * @param {number} hue - Input hue in degrees
     * @returns {number} Complementary hue
     */
    getComplementaryHue(hue) {
        return (hue + 180) % 360;
    }

    /**
     * Get analogous hues
     * @param {number} hue - Base hue in degrees
     * @param {number} spread - Spread in degrees (default 30)
     * @returns {Array} Array of analogous hues
     */
    getAnalogousHues(hue, spread = 30) {
        return [
            (hue - spread + 360) % 360,
            hue,
            (hue + spread) % 360
        ];
    }

    /**
     * Get triadic hues
     * @param {number} hue - Base hue in degrees
     * @returns {Array} Array of triadic hues
     */
    getTriadicHues(hue) {
        return [
            hue,
            (hue + 120) % 360,
            (hue + 240) % 360
        ];
    }

    /**
     * Get tetradic hues
     * @param {number} hue - Base hue in degrees
     * @returns {Array} Array of tetradic hues
     */
    getTetradicHues(hue) {
        return [
            hue,
            (hue + 90) % 360,
            (hue + 180) % 360,
            (hue + 270) % 360
        ];
    }

    /**
     * Get split-complementary hues
     * @param {number} hue - Base hue in degrees
     * @param {number} spread - Spread from complement (default 30)
     * @returns {Array} Array of split-complementary hues
     */
    getSplitComplementaryHues(hue, spread = 30) {
        const complement = this.getComplementaryHue(hue);
        return [
            hue,
            (complement - spread + 360) % 360,
            (complement + spread) % 360
        ];
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

    /**
     * Convert HSL to hex
     * @param {number} h - Hue in degrees
     * @param {number} s - Saturation percentage
     * @param {number} l - Lightness percentage
     * @returns {string} Hex color string
     */
    hslToHex(h, s, l) {
        const rgb = this.hslToRgb(h, s, l);
        return this.rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    /**
     * Convert hex to RGB
     * @param {string} hex - Hex color string
     * @returns {Object|null} RGB object or null if invalid
     */
    hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Handle 3-digit hex
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        
        // Validate 6-digit hex
        if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
            return null;
        }
        
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        return { r, g, b };
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
} 