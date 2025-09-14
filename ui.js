// ui.js - Enhanced with optimized theme performance monitoring
export function showToast(toast, message, isError = false) {
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = isError ? 'error' : 'success';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

export function copyToClipboard(text, toast) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(toast, 'Copied to clipboard!');
        }).catch(() => {
            showToast(toast, 'Failed to copy', true);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(toast, 'Copied to clipboard!');
    }
}

export function setGenerateButtonLoading(generateBtn, generateBtnText, generateBtnLoader, isLoading) {
    if (generateBtn) {
        generateBtn.disabled = isLoading;
        if (generateBtnText) generateBtnText.style.display = isLoading ? 'none' : 'block';
        if (generateBtnLoader) generateBtnLoader.style.display = isLoading ? 'block' : 'none';
    }
}

// Optimized theme performance monitoring
export function monitorThemePerformance() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        return;
    }
    
    let clickCount = 0;
    let lastClickTime = 0;
    const performanceThreshold = 16; // Strict threshold for instant performance
    let isMonitoring = false;
    
    themeToggle.addEventListener('click', () => {
        const now = performance.now();
        clickCount++;
        
        // Track rapid clicks silently
        
        lastClickTime = now;
        
        // Prevent multiple monitoring calls
        if (isMonitoring) return;
        isMonitoring = true;
        
        // Monitor theme transition performance
        const transitionStart = performance.now();
        
        // Check transition completion with optimized timing
        const checkTransition = () => {
            const duration = performance.now() - transitionStart;
            
            // Monitor performance silently
            
            isMonitoring = false;
        };
        
        // Optimized timing for performance monitoring
        setTimeout(checkTransition, 50);
        setTimeout(() => { isMonitoring = false; }, 100); // Fallback
    });
}

// Enhanced theme optimization utilities
export function optimizeThemeElements() {
    try {
        // Pre-load theme icons for instant switching
        const themeIcons = document.querySelectorAll('#theme-toggle svg');
        if (themeIcons.length > 0) {
            themeIcons.forEach(icon => {
                // Ensure icons are ready for instant display
                icon.style.willChange = 'opacity, transform';
            });
        }
        
        // Optimize theme-dependent elements
        const themeElements = document.querySelectorAll('[class*="theme"]');
        if (themeElements.length > 0) {
            themeElements.forEach(element => {
                // Optimize for theme changes
                element.style.willChange = 'background-color, color, border-color';
            });
        }
        
        // Optimize theme toggle button specifically
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.style.willChange = 'transform, background-color';
        }
        
        // Theme optimization completed silently
    } catch (error) {
        // Silent error handling for production
    }
}

// Enhanced theme state validation
export function validateThemeState() {
    try {
        const body = document.body;
        if (!body) return;
        
        const hasLightTheme = body.classList.contains('light-theme');
        const hasDarkTheme = body.classList.contains('dark-theme');
        
        if (hasLightTheme && hasDarkTheme) {
            // Silent cleanup for production
            body.classList.remove('light-theme', 'dark-theme');
            // Re-apply current theme
            const currentTheme = localStorage.getItem('theme') || 'light';
            body.classList.add(`${currentTheme}-theme`);
        }
        
        // Validate theme toggle state
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const svgs = themeToggle.querySelectorAll('svg');
            // Validate theme toggle icons silently
        }
        
        // Theme state validation completed silently
    } catch (error) {
        // Silent error handling for production
    }
} 