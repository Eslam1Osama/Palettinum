// components/color-picker/colorPicker.js
// Individual Color Picker Modal Component for Palette Colors

export class ColorPickerModal {
    constructor() {
        this.isOpen = false;
        this.currentColorIndex = -1;
        this.currentPalette = [];
        this.onColorUpdate = null;
        this.modal = null;
        this.colorInput = null;
        this.hexInput = null;
        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.id = 'color-picker-modal';
        this.modal.className = 'fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center p-4';
        this.modal.style.zIndex = 'var(--z-modal)';
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-labelledby', 'color-picker-title');

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-secondary rounded-xl shadow-2xl p-6 w-full max-w-md border border-color';
        modalContent.setAttribute('role', 'document');

        modalContent.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <h2 id="color-picker-title" class="text-xl font-bold text-primary">Edit Color</h2>
                <button id="color-picker-close" class="p-2 rounded-full text-secondary hover:bg-primary/10 smooth-transition" aria-label="Close color picker">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="space-y-4">
                <div class="text-center color-picker-preview-section">
                    <div id="color-preview" class="w-20 h-20 mx-auto rounded-lg border-2 border-color shadow-lg mb-4"></div>
                    <p class="text-sm text-secondary">Color <span id="color-index">1</span> of <span id="total-colors">5</span></p>
                </div>
                
                <div class="space-y-4 color-picker-form-section">
                    <div class="flex items-center gap-3 color-picker-form-row">
                        <label for="color-picker-input" class="text-sm font-medium text-primary w-20 color-picker-label">Color</label>
                        <div class="relative flex-1">
                            <input type="color" id="color-picker-input" class="color-picker-input w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm" title="Pick color">
                        </div>
                    </div>

                    <div class="flex items-center gap-3 color-picker-form-row">
                        <label for="color-picker-hex" class="text-sm font-medium text-primary w-20 color-picker-label">Hex</label>
                        <input type="text" id="color-picker-hex" class="color-picker-text-input flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono" maxlength="7" placeholder="#000000">
                    </div>

                    <div class="flex items-center gap-3 color-picker-form-row">
                        <label for="color-picker-rgb" class="text-sm font-medium text-primary w-20 color-picker-label">RGB</label>
                        <input type="text" id="color-picker-rgb" class="color-picker-text-input flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 font-mono" readonly placeholder="0, 0, 0">
                    </div>
                </div>
                
                <div class="flex gap-3 pt-4">
                    <button id="color-picker-cancel" class="flex-1 px-4 py-2 border border-color rounded-lg text-primary hover:bg-primary/10 smooth-transition">
                        Cancel
                    </button>
                    <button id="color-picker-apply" class="flex-1 px-4 py-2 accent-bg text-white rounded-lg hover:opacity-90 smooth-transition">
                        Apply
                    </button>
                </div>
            </div>
        `;

        this.modal.appendChild(modalContent);
        document.body.appendChild(this.modal);

        // Get references to elements
        this.colorInput = this.modal.querySelector('#color-picker-input');
        this.hexInput = this.modal.querySelector('#color-picker-hex');
        this.rgbInput = this.modal.querySelector('#color-picker-rgb');
        this.colorPreview = this.modal.querySelector('#color-preview');
        this.colorIndex = this.modal.querySelector('#color-index');
        this.totalColors = this.modal.querySelector('#total-colors');
    }

    setupEventListeners() {
        // Close modal events
        const closeBtn = this.modal.querySelector('#color-picker-close');
        const cancelBtn = this.modal.querySelector('#color-picker-cancel');
        const applyBtn = this.modal.querySelector('#color-picker-apply');

        closeBtn.addEventListener('click', () => this.close());
        cancelBtn.addEventListener('click', () => this.close());
        applyBtn.addEventListener('click', () => this.applyColor());

        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Color input synchronization
        this.colorInput.addEventListener('input', (e) => {
            const color = e.target.value;
            this.hexInput.value = color;
            this.updateColorPreview(color);
            this.updateRGBDisplay(color);
        });

        this.hexInput.addEventListener('input', (e) => {
            let hex = e.target.value;
            if (!hex.startsWith('#')) {
                hex = '#' + hex;
            }
            
            if (this.isValidHex(hex)) {
                this.colorInput.value = hex;
                this.updateColorPreview(hex);
                this.updateRGBDisplay(hex);
            }
        });

        // Keyboard navigation
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'Enter' && e.target.id === 'color-picker-apply') {
                this.applyColor();
            }
        });
    }

    open(colorIndex, currentColor, palette, onUpdate) {
        // Close any existing color picker
        if (this.isOpen) {
            this.close();
        }

        this.currentColorIndex = colorIndex;
        this.currentPalette = [...palette];
        this.onColorUpdate = onUpdate;
        this.isOpen = true;

        // Update UI
        this.colorInput.value = currentColor;
        this.hexInput.value = currentColor;
        this.updateColorPreview(currentColor);
        this.updateRGBDisplay(currentColor);
        this.colorIndex.textContent = colorIndex + 1;
        this.totalColors.textContent = palette.length;

        // Show modal
        this.modal.classList.remove('hidden');
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Focus on color input
        setTimeout(() => {
            this.colorInput.focus();
        }, 100);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.currentColorIndex = -1;
        this.currentPalette = [];
        this.onColorUpdate = null;

        this.modal.classList.add('hidden');
        this.modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';

        // Clear inputs
        this.colorInput.value = '#000000';
        this.hexInput.value = '';
        this.rgbInput.value = '';
    }

    applyColor() {
        if (!this.isOpen || this.currentColorIndex === -1) return;

        const newColor = this.hexInput.value;
        if (!this.isValidHex(newColor)) {
            this.showError('Invalid hex color');
            return;
        }

        // Update palette
        const updatedPalette = [...this.currentPalette];
        updatedPalette[this.currentColorIndex] = newColor;

        // Call update callback
        if (this.onColorUpdate) {
            this.onColorUpdate(this.currentColorIndex, newColor, updatedPalette);
        }

        this.close();
    }

    updateColorPreview(color) {
        this.colorPreview.style.backgroundColor = color;
    }

    updateRGBDisplay(hex) {
        const rgb = this.hexToRgb(hex);
        if (rgb) {
            this.rgbInput.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        }
    }

    isValidHex(hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    showError(message) {
        // Simple error display - could be enhanced with toast notifications
        console.warn('Color Picker Error:', message);
    }

    destroy() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
    }
}

// Export singleton instance
export const colorPickerModal = new ColorPickerModal();
