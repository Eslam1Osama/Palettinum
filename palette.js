// palette.js - Enhanced Color Theory Engine

// Color conversion utilities
export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function rgbToHsl(r, g, b) {
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

export function hslToRgb(h, s, l) {
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

export function adjustColor(color, saturation = 50, brightness = 50) {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // Adjust saturation and brightness
    const newS = Math.max(0, Math.min(100, hsl.s + (saturation - 50)));
    const newL = Math.max(0, Math.min(100, hsl.l + (brightness - 50)));
    
    const newRgb = hslToRgb(hsl.h, newS, newL);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

// Enhanced color generation with advanced algorithms
export async function generatePaletteFromAPI({
    setGenerateButtonLoading,
    numResultsInput,
    schemeTypeSelect,
    harmonyRuleSelect,
    seedColorInput,
    hexInput,
    saturationSlider,
    brightnessSlider,
    updatePalette,
    updateColorInfo,
    appStore
}) {
    setGenerateButtonLoading(true);
    
    // Declare variables outside try-catch block for proper scope access
    const numColors = Math.max(2, Math.min(8, parseInt(numResultsInput.value) || 5));
    const schemeType = schemeTypeSelect.value;
    const harmonyRule = harmonyRuleSelect?.value || 'analogic';
    
    // Get seed color from color picker or hex input
    let seedColor = seedColorInput?.value || '#3dbdf5';
    if (hexInput?.value && /^#[0-9A-F]{6}$/i.test(hexInput.value)) {
        seedColor = hexInput.value;
        seedColorInput.value = seedColor;
    }
    
    // Apply color adjustments
    const saturation = parseInt(saturationSlider?.value || 50);
    const brightness = parseInt(brightnessSlider?.value || 50);
    const adjustedSeedColor = adjustColor(seedColor, saturation, brightness);
    
    try {
        
        // Check if we have a stored color wheel state and if the current settings match
        const colorWheelState = window.colorWheelState;
        if (colorWheelState && colorWheelState.source === 'colorWheel') {
            const state = colorWheelState;
            
            // Check if current settings match the stored color wheel state
            const settingsMatch = (
                state.seedColor === seedColor &&
                state.saturation === saturation &&
                state.brightness === brightness &&
                state.numColors === numColors &&
                state.detectedHarmony === harmonyRule
            );
            
            if (settingsMatch && state.palette && state.palette.length > 0) {
                
                
                // Return the exact same palette from color wheel
                if (appStore) {
                    appStore.dispatch(AppStore.actions.setPalette([...state.palette]));
                } else {
                    updatePalette([...state.palette]);
                }
                
                // Update color info display
                if (updateColorInfo) {
                    const rgb = hexToRgb(state.palette[0]);
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    updateColorInfo(rgb, hsl);
                }
                
                setGenerateButtonLoading(false);
                return;
            } else {
                
            }
        }
        
        // Update color info display
        if (updateColorInfo) {
            const rgb = hexToRgb(adjustedSeedColor);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            updateColorInfo(rgb, hsl);
        }
        
        const seedHex = adjustedSeedColor.replace('#', '');
        const url = `https://www.thecolorapi.com/scheme?hex=${seedHex}&mode=${schemeType}&count=${numColors}`;
        
        // Bypass any HTTP caches to ensure fresh data and avoid SW caching edge cases
        const response = await fetch(url, { cache: 'no-store', mode: 'cors' });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!data.colors || !Array.isArray(data.colors) || data.colors.length === 0) {
            throw new Error("Invalid API response structure from TheColorAPI.");
        }
        
        let hexPalette = data.colors.map(c => c.hex.value);
        
        // Apply harmony rules if different from API scheme
        if (harmonyRule !== schemeType) {
            hexPalette = applyHarmonyRule(adjustedSeedColor, harmonyRule, numColors);
        }
        
        // Clear color wheel state since we're generating a new palette
        if (window.colorWheelState) {
            delete window.colorWheelState;
    
        }
        
        // Dispatch state change if appStore is available, otherwise fall back to updatePalette
        if (appStore) {
            appStore.dispatch(AppStore.actions.setPalette(hexPalette));
        } else {
            updatePalette(hexPalette);
        }
        
    } catch (error) {
        // Silent error handling for API failures
        // Fallback to advanced local generation
        const fallbackPalette = generateLocalPalette(seedColorInput?.value || '#3dbdf5', numColors, harmonyRule);
        
        // Clear color wheel state since we're using fallback
        if (window.colorWheelState) {
            delete window.colorWheelState;
        }
        
        // Dispatch state change if appStore is available, otherwise fall back to updatePalette
        if (appStore) {
            appStore.dispatch(AppStore.actions.setPalette(fallbackPalette));
        } else {
            updatePalette(fallbackPalette);
        }
    } finally {
        setGenerateButtonLoading(false);
    }
}

// Advanced local color generation
function generateLocalPalette(seedColor, numColors, harmonyRule) {
    const rgb = hexToRgb(seedColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const palette = [seedColor];
    
    switch (harmonyRule) {
        case 'monochrome':
            for (let i = 1; i < numColors; i++) {
                const newL = Math.max(10, Math.min(90, hsl.l + (i * 15 - 30)));
                const newRgb = hslToRgb(hsl.h, hsl.s, newL);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;
            
        case 'complement':
            const complementHue = (hsl.h + 180) % 360;
            const complementRgb = hslToRgb(complementHue, hsl.s, hsl.l);
            palette.push(rgbToHex(complementRgb.r, complementRgb.g, complementRgb.b));
            
            for (let i = 2; i < numColors; i++) {
                const hue = i % 2 === 0 ? hsl.h : complementHue;
                const newL = Math.max(10, Math.min(90, hsl.l + (i * 10 - 20)));
                const newRgb = hslToRgb(hue, hsl.s, newL);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;
            
        case 'triad':
            for (let i = 1; i < numColors; i++) {
                const hue = (hsl.h + (i * 120)) % 360;
                const newRgb = hslToRgb(hue, hsl.s, hsl.l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
            break;
            
        default: // analogic
            for (let i = 1; i < numColors; i++) {
                const hue = (hsl.h + (i * 30)) % 360;
                const newRgb = hslToRgb(hue, hsl.s, hsl.l);
                palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
            }
    }
    
    return palette.slice(0, numColors);
}

// Apply harmony rules to existing palette
function applyHarmonyRule(seedColor, harmonyRule, numColors) {
    return generateLocalPalette(seedColor, numColors, harmonyRule);
}

// Enhanced palette display with color information and individual color pickers
export function updatePalette(palette, paletteDisplay, renderShowcase, copyToClipboard, onColorUpdate = null) {
    paletteDisplay.innerHTML = '';
    palette.forEach((color, index) => {
        document.documentElement.style.setProperty(`--c${index + 1}`, color);
        const rgb = hexToRgb(color);
        if (rgb) {
            document.documentElement.style.setProperty(`--c${index + 1}_alpha`, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
        }
        
        const swatch = document.createElement('div');
        swatch.className = 'palette-swatch h-20 w-full rounded-lg cursor-pointer smooth-transition border-2 border-color relative group';
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        swatch.dataset.index = index;
        swatch.title = `Double-click to edit ${color}`;
        
        // Enhanced color information
        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info';
        colorInfo.innerHTML = `
            <div class="text-center">
                <div class="font-mono text-xs">${color}</div>
                <div class="text-xs opacity-75">RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}</div>
            </div>
        `;
        
        // Add edit button overlay
        const editButton = document.createElement('div');
        editButton.className = 'absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 smooth-transition flex items-center justify-center opacity-0 group-hover:opacity-100';
        editButton.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            if (onColorUpdate) {
                onColorUpdate(index, color, palette);
            }
        });
        
        // Edit button click
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (onColorUpdate) {
                onColorUpdate(index, color, palette);
            }
        });
        
        paletteDisplay.appendChild(swatch);
    });
    
    // Clear unused CSS variables for smaller palettes
    for (let i = palette.length + 1; i <= 8; i++) {
        document.documentElement.style.removeProperty(`--c${i}`);
        document.documentElement.style.removeProperty(`--c${i}_alpha`);
    }
    
    renderShowcase();
}

export function renderPaletteGrid(palettes, paletteDisplay, updatePalette) {
    paletteDisplay.innerHTML = '';
    palettes.forEach((palette, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col items-center gap-1 cursor-pointer';
        wrapper.title = 'Click to use this palette';
        wrapper.onclick = () => updatePalette(palette);
        const row = document.createElement('div');
        row.className = 'flex gap-1';
        palette.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'w-8 h-8 rounded-lg';
            swatch.style.backgroundColor = color;
            row.appendChild(swatch);
        });
        wrapper.appendChild(row);
        paletteDisplay.appendChild(wrapper);
    });
} 