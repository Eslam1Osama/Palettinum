// events.js
export function setupEventListeners({
    themeToggle, themeIconLight, themeIconDark, generateBtn, openComponentSelectorBtn, closeComponentSelectorBtn, overlay, componentList, componentSearch, numResultsInput, schemeTypeSelect, harmonyRuleSelect,
    toggleTheme, generatePaletteFromAPI, toggleComponentSelector, handleComponentSelection, filterComponents, showHoverCard, hideHoverCard, updatePalette, currentPalette
}) {
    // Optimized theme toggle with instant feedback and enhanced validation
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            // Prevent multiple rapid clicks
            const toggleElement = e.target.closest('#theme-toggle');
            if (!toggleElement || toggleElement.dataset.processing === 'true') return;
            
            // Validate icon elements before proceeding
            const hasValidIcons = (themeIconLight && themeIconDark && 
                                 themeIconLight.id === 'theme-icon-light' && 
                                 themeIconDark.id === 'theme-icon-dark');
            
            // Mark as processing
            toggleElement.dataset.processing = 'true';
            
            // Add transition class for smooth switching
            document.body.classList.add('theme-transitioning');
            
            // Perform theme toggle with validated icon references
            const newTheme = toggleTheme(themeIconLight, themeIconDark);
            
            // Remove processing flag and transition class with minimal timing
            setTimeout(() => {
                toggleElement.dataset.processing = 'false';
                document.body.classList.remove('theme-transitioning');
                
                // Validate icon state after toggle with correct UX logic
                if (hasValidIcons) {
                    // Icon logic: Show icon for the action user can take (next theme)
                    // Light theme -> show moon icon (click to go dark)
                    // Dark theme -> show sun icon (click to go light)
                    const shouldShowMoonIcon = newTheme === 'light';
                    const shouldShowSunIcon = newTheme === 'dark';
                    
                    // Apply correct icon visibility with smooth animations
                    if (shouldShowMoonIcon) {
                        themeIconLight.classList.add('hidden');
                        themeIconDark.classList.remove('hidden');
                    } else if (shouldShowSunIcon) {
                        themeIconLight.classList.remove('hidden');
                        themeIconDark.classList.add('hidden');
                    }
                }
            }, 50); // Minimal time for instant feedback
        });
    }
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generatePaletteFromAPI);
    }
    
    if (openComponentSelectorBtn) {
        openComponentSelectorBtn.addEventListener('click', () => toggleComponentSelector(true));
    }
    
    if (closeComponentSelectorBtn) {
        closeComponentSelectorBtn.addEventListener('click', () => toggleComponentSelector(false));
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => toggleComponentSelector(false));
    }
    
    if (componentList) {
        componentList.addEventListener('change', handleComponentSelection);
    }
    
    if (componentSearch) {
        componentSearch.addEventListener('input', (e) => filterComponents(e.target.value));
    }
    
    // OPTIMIZATION: Advanced hover card events with enterprise-grade stability
    let hoverTimeout = null;
    let hideTimeout = null;
    let currentHoveredComponent = null;
    let isHovering = false;
    let lastHoverTime = 0;
    let isProcessing = false; // Prevent race conditions
    let eventListeners = new Map(); // Track event listeners for cleanup
    
    // OPTIMIZATION: Enhanced debounced function with cleanup
    const debounce = (func, wait) => {
        let timeout = null;
        const debouncedFunction = function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                timeout = null;
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
        
        // Add cleanup method
        debouncedFunction.cancel = () => {
            clearTimeout(timeout);
            timeout = null;
        };
        
        return debouncedFunction;
    };
    
    // OPTIMIZATION: Comprehensive cleanup function
    const cleanupHoverState = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        currentHoveredComponent = null;
        isHovering = false;
        isProcessing = false;
    };
    
    // OPTIMIZATION: Safe timeout management
    const setSafeTimeout = (callback, delay) => {
        const timeoutId = setTimeout(() => {
            callback();
            return null; // Clear reference
        }, delay);
        return timeoutId;
    };
    
    if (componentList) {
        // OPTIMIZATION: Enhanced mouseenter with comprehensive error handling
        const handleMouseEnter = (e) => {
            try {
                // OPTIMIZATION: Prevent race conditions
                if (isProcessing) {
                    return;
                }
                
                const componentItem = e?.target?.closest('.component-item');
                if (!componentItem) {
                    return;
                }
                
                const componentName = componentItem.dataset?.component;
                if (!componentName) {
                    // Component item missing dataset.component
                    return;
                }
                
                const currentTime = performance.now();
                
                // OPTIMIZATION: Clear any pending operations safely
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = null;
                }
                
                // OPTIMIZATION: Immediate update for same component
                if (currentHoveredComponent === componentName) {
                    return;
                }
                
                // OPTIMIZATION: Update state atomically
                isProcessing = true;
                currentHoveredComponent = componentName;
                isHovering = true;
                lastHoverTime = currentTime;
                
                // OPTIMIZATION: Immediate hover card update with error handling
                try {
                showHoverCard(e, componentName);
                } catch (error) {
                    cleanupHoverState();
                } finally {
                    isProcessing = false;
                }
            } catch (error) {
                cleanupHoverState();
            }
        };
        
        componentList.addEventListener('mouseenter', handleMouseEnter, true);
        eventListeners.set('mouseenter', { element: componentList, handler: handleMouseEnter, event: 'mouseenter' });
        
        // OPTIMIZATION: Enhanced mouseleave with comprehensive error handling
        const handleMouseLeave = (e) => {
            try {
                const componentItem = e?.target?.closest('.component-item');
                if (!componentItem) {
                    return;
                }
                
                // OPTIMIZATION: Check if we're actually leaving the component
                const relatedTarget = e?.relatedTarget;
                if (relatedTarget && componentItem.contains(relatedTarget)) {
                    return; // Still within component bounds
                }
                
                // OPTIMIZATION: Clear any pending hover operations
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = null;
                }
                
                // OPTIMIZATION: Debounced hide with safe timeout management
                hideTimeout = setSafeTimeout(() => {
                    try {
                        currentHoveredComponent = null;
                        isHovering = false;
                        hideHoverCard();
                    } catch (error) {
                        // Error hiding hover card
                    } finally {
                        hideTimeout = null;
                    }
                }, 50); // Reduced delay for better responsiveness
            } catch (error) {
                cleanupHoverState();
            }
        };
        
        componentList.addEventListener('mouseleave', handleMouseLeave, true);
        eventListeners.set('mouseleave', { element: componentList, handler: handleMouseLeave, event: 'mouseleave' });
        
        // OPTIMIZATION: Enhanced panel leave detection with comprehensive cleanup
        const componentSelectorPanel = document.getElementById('component-selector-panel');
        if (componentSelectorPanel) {
            const handlePanelLeave = () => {
                try {
                    // OPTIMIZATION: Immediate cleanup when leaving panel
                    cleanupHoverState();
                hideHoverCard();
                } catch (error) {
                    // Error in panel leave handler
                }
            };
            
            componentSelectorPanel.addEventListener('mouseleave', handlePanelLeave);
            eventListeners.set('panel-mouseleave', { element: componentSelectorPanel, handler: handlePanelLeave, event: 'mouseleave' });
        }
        
        // OPTIMIZATION: Enhanced mouseover for rapid component switching with error handling
        const handleMouseOver = (e) => {
            try {
                // OPTIMIZATION: Prevent processing during race conditions
                if (isProcessing) {
                    return;
                }
                
                const componentItem = e?.target?.closest('.component-item');
                if (!componentItem) {
                    return;
                }
                
                const componentName = componentItem.dataset?.component;
                if (!componentName) {
                    return;
                }
                
                // OPTIMIZATION: Immediate switch for perfect synchronization
                if (currentHoveredComponent && currentHoveredComponent !== componentName) {
                    // Clear any pending operations safely
                    if (hideTimeout) {
                        clearTimeout(hideTimeout);
                        hideTimeout = null;
                    }
                    if (hoverTimeout) {
                        clearTimeout(hoverTimeout);
                        hoverTimeout = null;
                    }
                    
                    // Update to new component immediately with error handling
                    try {
                        currentHoveredComponent = componentName;
                        showHoverCard(e, componentName);
                    } catch (error) {
                        // Error switching hover card
                        cleanupHoverState();
                    }
                }
            } catch (error) {
                // Error in mouseover handler
            }
        };
        
        componentList.addEventListener('mouseover', handleMouseOver);
        eventListeners.set('mouseover', { element: componentList, handler: handleMouseOver, event: 'mouseover' });
        
        // OPTIMIZATION: Enhanced touch events with comprehensive error handling
        const handleTouchStart = (e) => {
            try {
                // OPTIMIZATION: Prevent touch/mouse conflicts
                if (isProcessing) {
                    return;
                }
                
                const componentItem = e?.target?.closest('.component-item');
                if (!componentItem) {
                    return;
                }
                
                const componentName = componentItem.dataset?.component;
                if (!componentName) {
                    return;
                }
                
                // OPTIMIZATION: Clear any pending operations safely
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = null;
                }
                
                // OPTIMIZATION: Update state atomically
                isProcessing = true;
                currentHoveredComponent = componentName;
                isHovering = true;
                
                // OPTIMIZATION: Reduced delay for better responsiveness with error handling
                hoverTimeout = setSafeTimeout(() => {
                    try {
                    showHoverCard(e, componentName);
                    } catch (error) {
                        // Error showing hover card on touch
                        cleanupHoverState();
                    } finally {
                        isProcessing = false;
                        hoverTimeout = null;
                    }
                }, 200); // Further reduced for better touch responsiveness
            } catch (error) {
                cleanupHoverState();
            }
        };
        
        const handleTouchEnd = () => {
            try {
                // OPTIMIZATION: Immediate cleanup for touch events
                if (hoverTimeout) {
            clearTimeout(hoverTimeout);
                    hoverTimeout = null;
                }
                
                hideTimeout = setSafeTimeout(() => {
                    try {
                        currentHoveredComponent = null;
                        isHovering = false;
                        hideHoverCard();
                    } catch (error) {
                        // Error hiding hover card on touch end
                    } finally {
                        hideTimeout = null;
                    }
                }, 600); // Reduced hide delay for better touch UX
            } catch (error) {
                cleanupHoverState();
            }
        };
        
        componentList.addEventListener('touchstart', handleTouchStart, { passive: true });
        componentList.addEventListener('touchend', handleTouchEnd, { passive: true });
        eventListeners.set('touchstart', { element: componentList, handler: handleTouchStart, event: 'touchstart' });
        eventListeners.set('touchend', { element: componentList, handler: handleTouchEnd, event: 'touchend' });
        
        // OPTIMIZATION: Add performance monitoring for hover events
        if (typeof performance !== 'undefined' && performance.mark) {
            const handlePerformanceStart = () => {
                try {
                    performance.mark('hover-start');
                } catch (error) {
                    // Performance monitoring error
                }
            };
            
            const handlePerformanceEnd = () => {
                try {
                    performance.mark('hover-end');
                    performance.measure('hover-duration', 'hover-start', 'hover-end');
                } catch (error) {
                    // Performance monitoring error
                }
            };
            
            componentList.addEventListener('mouseenter', handlePerformanceStart);
            componentList.addEventListener('mouseleave', handlePerformanceEnd);
            eventListeners.set('perf-mouseenter', { element: componentList, handler: handlePerformanceStart, event: 'mouseenter' });
            eventListeners.set('perf-mouseleave', { element: componentList, handler: handlePerformanceEnd, event: 'mouseleave' });
        }
        
        // OPTIMIZATION: Add global cleanup function for memory management
        window.cleanupHoverSystem = () => {
            try {
                // Clean up all timeouts
                cleanupHoverState();
                
                // Remove all event listeners
                eventListeners.forEach(({ element, handler, event }) => {
                    try {
                        element.removeEventListener(event, handler);
                    } catch (error) {
                        // Error removing event listener
                    }
                });
                eventListeners.clear();
                
                // Reset all state
                currentHoveredComponent = null;
                isHovering = false;
                isProcessing = false;
                lastHoverTime = 0;
                
                // Hover system cleaned up successfully
            } catch (error) {
                // Error during hover system cleanup
            }
        };
    }
    

    
    // Handle single-digit input behavior for main input
    if (numResultsInput) {
        numResultsInput.addEventListener('keypress', (e) => {
            const char = String.fromCharCode(e.which);
            
            // Only allow numbers 1-8
            if (/[1-8]/.test(char)) {
                // Replace the entire value with the new digit
                numResultsInput.value = char;
                numResultsInput.dataset.lastValidValue = parseInt(char);
                
                // Move cursor to end
                setTimeout(() => {
                    numResultsInput.setSelectionRange(1, 1);
                }, 0);
                
                e.preventDefault();
            } else if (e.which !== 8 && e.which !== 9 && e.which !== 37 && e.which !== 39) {
                // Prevent other characters
                e.preventDefault();
            }
        });
        
        // Number of results change - no automatic regeneration
        // Palette will only be generated when user clicks Generate Palette button
        
        // Handle paste events for main input
        numResultsInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const num = parseInt(pastedText);
            if (num >= 1 && num <= 8) {
                numResultsInput.value = num;
                numResultsInput.dataset.lastValidValue = num;
            }
        });
    }
    
    // Harmony rule change - no automatic regeneration
    // Palette will only be generated when user clicks Generate Palette button
    if (harmonyRuleSelect) {
        // Event listener removed - no automatic palette generation
    }
    
    // Scheme type change - no automatic regeneration
    // Palette will only be generated when user clicks Generate Palette button
    if (schemeTypeSelect) {
        // Event listener removed - no automatic palette generation
    }
} 