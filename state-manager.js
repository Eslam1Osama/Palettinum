// state-manager.js - Enterprise-grade state management
class AppStore {
    constructor(initialState = {}) {
        this.state = {
            palette: [],
            selectedComponents: ['Navbar', 'Buttons', 'Card'],
            theme: 'light',
            cachedPalettes: [],
            componentCache: new Map(),
            apiCache: new Map(),
            loading: false,
            error: null,
            ...initialState
        };
        
        this.subscribers = new Set();
        this.middleware = [];
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySize = 50;
        
        // Initialize with saved state
        this.loadPersistedState();
    }

    // Subscribe to state changes
    subscribe(callback) {
        this.subscribers.add(callback);
        
        // Return unsubscribe function
        return () => {
            this.subscribers.delete(callback);
        };
    }

    // Dispatch actions
    dispatch(action) {
        if (typeof action === 'function') {
            // Handle thunk actions
            action(this.dispatch, this.getState);
        } else {
            // Handle regular actions
            this.processAction(action);
        }
    }

    // Process action through middleware and reducer
    processAction(action) {
        // Apply middleware
        let processedAction = action;
        this.middleware.forEach(middleware => {
            processedAction = middleware(processedAction, this.getState);
        });

        if (!processedAction) return; // Middleware blocked the action

        // Save to history
        this.saveToHistory();

        // Update state
        const newState = this.reducer(this.state, processedAction);
        
        // Update state
        this.state = newState;
        
        // Notify subscribers
        this.notifySubscribers();
        
        // Persist state
        this.persistState();
    }

    // Reducer function
    reducer(state, action) {
        switch (action.type) {
            case 'SET_PALETTE':
                return {
                    ...state,
                    palette: action.payload,
                    error: null
                };

            case 'UPDATE_PALETTE':
                return {
                    ...state,
                    palette: [...state.palette, ...action.payload],
                    error: null
                };

            case 'SET_SELECTED_COMPONENTS':
                return {
                    ...state,
                    selectedComponents: action.payload,
                    error: null
                };

            case 'ADD_COMPONENT':
                return {
                    ...state,
                    selectedComponents: [...state.selectedComponents, action.payload],
                    error: null
                };

            case 'REMOVE_COMPONENT':
                return {
                    ...state,
                    selectedComponents: state.selectedComponents.filter(c => c !== action.payload),
                    error: null
                };

            case 'SET_THEME':
                return {
                    ...state,
                    theme: action.payload,
                    error: null
                };

            case 'CACHE_PALETTE':
                return {
                    ...state,
                    cachedPalettes: [...state.cachedPalettes, action.payload],
                    error: null
                };

            case 'SET_LOADING':
                return {
                    ...state,
                    loading: action.payload,
                    error: null
                };

            case 'SET_ERROR':
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                };

            case 'CLEAR_ERROR':
                return {
                    ...state,
                    error: null
                };

            case 'CACHE_COMPONENT':
                const { componentName, palette, renderedHTML } = action.payload;
                state.componentCache.set(`${componentName}_${JSON.stringify(palette)}`, renderedHTML);
                return {
                    ...state,
                    componentCache: new Map(state.componentCache)
                };

            case 'CACHE_API_RESPONSE':
                const { url, response } = action.payload;
                state.apiCache.set(url, response);
                return {
                    ...state,
                    apiCache: new Map(state.apiCache)
                };

            case 'UNDO':
                return this.history[this.historyIndex - 1] || state;

            case 'REDO':
                return this.history[this.historyIndex + 1] || state;

            default:
                return state;
        }
    }

    // Get current state
    getState() {
        return this.state;
    }

    // Get specific state slice
    getStateSlice(key) {
        return this.state[key];
    }

    // Notify all subscribers
    notifySubscribers() {
        this.subscribers.forEach(callback => {
            try {
                callback(this.state);
                    } catch (error) {
            // Silent error handling for subscriber errors
        }
        });
    }

    // Add middleware
    addMiddleware(middleware) {
        this.middleware.push(middleware);
    }

    // Save state to history
    saveToHistory() {
        // Remove future history if we're not at the end
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }

        // Add current state to history (only essential data to prevent memory issues)
        const stateToSave = {
            palette: this.state.palette,
            selectedComponents: this.state.selectedComponents,
            theme: this.state.theme,
            cachedPalettes: this.state.cachedPalettes
        };
        
        this.history.push(JSON.parse(JSON.stringify(stateToSave)));
        this.historyIndex++;

        // Limit history size
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    // Undo last action
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            const savedState = this.history[this.historyIndex];
            this.state = { ...this.state, ...savedState };
            this.notifySubscribers();
            this.persistState();
        }
    }

    // Redo last undone action
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            const savedState = this.history[this.historyIndex];
            this.state = { ...this.state, ...savedState };
            this.notifySubscribers();
            this.persistState();
        }
    }

    // Persist state to localStorage
    persistState() {
        // DISABLED: State persistence for fresh start on refresh
        // Only theme is preserved, everything else resets on refresh
    }

    // Load persisted state
    loadPersistedState() {
        // DISABLED: State persistence for fresh start on refresh
        // Always start with default state

    }

    // Action creators
    static actions = {
        setPalette: (palette) => ({
            type: 'SET_PALETTE',
            payload: palette
        }),

        updatePalette: (palette) => ({
            type: 'UPDATE_PALETTE',
            payload: palette
        }),

        setSelectedComponents: (components) => ({
            type: 'SET_SELECTED_COMPONENTS',
            payload: components
        }),

        addComponent: (component) => ({
            type: 'ADD_COMPONENT',
            payload: component
        }),

        removeComponent: (component) => ({
            type: 'REMOVE_COMPONENT',
            payload: component
        }),

        setTheme: (theme) => ({
            type: 'SET_THEME',
            payload: theme
        }),

        cachePalette: (palette) => ({
            type: 'CACHE_PALETTE',
            payload: palette
        }),

        setLoading: (loading) => ({
            type: 'SET_LOADING',
            payload: loading
        }),

        setError: (error) => ({
            type: 'SET_ERROR',
            payload: error
        }),

        clearError: () => ({
            type: 'CLEAR_ERROR'
        }),

        cacheComponent: (componentName, palette, renderedHTML) => ({
            type: 'CACHE_COMPONENT',
            payload: { componentName, palette, renderedHTML }
        }),

        cacheAPIResponse: (url, response) => ({
            type: 'CACHE_API_RESPONSE',
            payload: { url, response }
        }),

        undo: () => ({
            type: 'UNDO'
        }),

        redo: () => ({
            type: 'REDO'
        })
    };

    // Thunk action creators
    static thunks = {
        // Generate palette with loading state
        generatePalette: (options) => async (dispatch, getState) => {
            dispatch(AppStore.actions.setLoading(true));
            dispatch(AppStore.actions.clearError());

            try {
                // Check cache first
                const cacheKey = JSON.stringify(options);
                const cached = getState().cachedPalettes.find(p => p.key === cacheKey);
                
                if (cached) {
                    dispatch(AppStore.actions.setPalette(cached.palette));
                    dispatch(AppStore.actions.setLoading(false));
                    return cached.palette;
                }

                // Generate new palette
                const palette = await generatePaletteFromAPI(options);
                dispatch(AppStore.actions.setPalette(palette));
                dispatch(AppStore.actions.cachePalette({ key: cacheKey, palette }));
                dispatch(AppStore.actions.setLoading(false));
                
                return palette;
            } catch (error) {
                dispatch(AppStore.actions.setError(error.message));
                dispatch(AppStore.actions.setLoading(false));
                throw error;
            }
        }
    };
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppStore;
} else {
    window.AppStore = AppStore;
} 