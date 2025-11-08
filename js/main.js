// Main Application Controller
// This file initializes the app and coordinates between all modules

// Application State
const app = {
    version: '1.0.0',
    initialized: false,
    debug: false // Set to true for development
};

// Sound toggle functionality
function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundButton = document.getElementById('sound-toggle');
    if (soundButton) {
        soundButton.textContent = soundEnabled ? '🔊' : '🔇';
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});

function initializeApplication() {
    try {
        console.log('🎓 Initializing College Life Bingo...');
        
        // Initialize components in order
        initializeGameState();
        setupEventHandlers();
        setupUIComponents();
        applyInitialSettings();
        initializeSounds();

        // Ensure background music starts after first user interaction (autoplay fix)
    const bgMusic = document.getElementById('background-music');
    if (bgMusic) {
        const startMusic = () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(err => console.log('Autoplay blocked, waiting for user action.'));
            }
            document.removeEventListener('click', startMusic);
            document.removeEventListener('keydown', startMusic);
        };
        document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);
    }

    app.initialized = true;
        console.log('✅ College Life Bingo initialized successfully!');
        
        // Show welcome animation
        animateWelcomePage();
        
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
        showErrorMessage('Failed to initialize the game. Please refresh and try again.', document.body);
    }
}

function initializeGameState() {
    // Set default game state
    gameState.currentTheme = 'light';
    gameState.currentDifficulty = 'freshman';
    gameState.selectedCells = Array(25).fill(false);
    gameState.gameCompleted = false;
    gameState.hasWinningCondition = false;
    
    if (app.debug) {
        console.log('Game state initialized:', gameState);
    }
}

function setupEventHandlers() {
    // Global event handlers
    document.addEventListener('keydown', handleGlobalKeyboard);
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Page visibility change handler
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    if (app.debug) {
        console.log('Event handlers setup complete');
    }
}

function setupUIComponents() {
    // Initialize UI components
    initializeSettingsPage();
    setupAccessibilityFeatures();
    
    // Apply initial theme
    applyThemeStyles();
    
    if (app.debug) {
        console.log('UI components setup complete');
    }
}

function applyInitialSettings() {
    // Apply any saved settings or defaults
    updateDifficultyDisplay();
    adjustForScreenSize();
    
    // Set initial button states
    const lightThemeBtn = document.querySelector('[data-theme="light"]');
    const freshmanBtn = document.querySelector('[data-difficulty="freshman"]');
    
    if (lightThemeBtn) lightThemeBtn.classList.add('selected');
    if (freshmanBtn) freshmanBtn.classList.add('selected');
}

function animateWelcomePage() {
    const welcomePage = document.getElementById('welcome-page');
    if (welcomePage && welcomePage.classList.contains('active')) {
        // Add entrance animation to welcome elements
        const logo = document.querySelector('.welcome-logo');
        const content = document.querySelector('.welcome-content');
        const button = document.querySelector('.primary-btn');
        
        if (logo) {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                logo.style.transition = 'all 1s ease';
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                content.style.transition = 'all 0.8s ease';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 500);
        }
        
        if (button) {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                button.style.transition = 'all 0.6s ease';
                button.style.opacity = '1';
                button.style.transform = 'scale(1)';
            }, 800);
        }
    }
}

// Global Event Handlers
function handleGlobalKeyboard(event) {
    // Handle global keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 'r':
                // Ctrl+R: Reset current game (prevent if on game page)
                if (document.getElementById('game-page').classList.contains('active')) {
                    event.preventDefault();
                    resetCurrentGame();
                    playClickSound();
                }
                break;
                
            case 's':
                // Ctrl+S: Go to settings
                event.preventDefault();
                navigateToSettings();
                playClickSound();
                break;
                
            case 'h':
                // Ctrl+H: Go to home/welcome
                event.preventDefault();
                navigateToWelcome();
                playClickSound();
                break;
                
            case 'm':
                // Ctrl+M: Toggle sound
                event.preventDefault();
                toggleSound();
                break;
        }
    }
    
    // Escape key handling
    if (event.key === 'Escape') {
        // Close any open modals
        closeVictoryModal();
        closeInstructionsModal();
        hideFloatingInstructions();
    }
}

function handleWindowResize() {
    // Debounce resize handler
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        adjustForScreenSize();
        
        if (app.debug) {
            console.log('Window resized, UI adjusted');
        }
    }, 250);
}

function handleBeforeUnload(event) {
    // Warn user if they're in the middle of a game
    if (gameState.selectedCells.some(cell => cell) && !gameState.gameCompleted) {
        event.preventDefault();
        event.returnValue = 'You have an active game. Are you sure you want to leave?';
        return event.returnValue;
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        // Page is hidden - pause any animations or timers
        pauseAnimations();
    } else {
        // Page is visible - resume animations
        resumeAnimations();
    }
}

function pauseAnimations() {
    // Pause CSS animations
    document.documentElement.style.animationPlayState = 'paused';
}

function resumeAnimations() {
    // Resume CSS animations
    document.documentElement.style.animationPlayState = 'running';
}

// Application Control Functions
function resetApplication() {
    // Reset entire application state
    gameState = {
        currentTheme: 'light',
        currentDifficulty: 'freshman',
        bingoBoard: [],
        selectedCells: Array(25).fill(false),
        gameCompleted: false,
        hasWinningCondition: false,
        startTime: null,
        completedLines: []
    };
    
    // Reset UI
    navigateToWelcome();
    applyThemeStyles();
    
    console.log('Application reset complete');
}

function getApplicationInfo() {
    return {
        version: app.version,
        initialized: app.initialized,
        currentPage: getCurrentPage(),
        gameState: { ...gameState },
        playerStats: { ...playerStats },
        soundEnabled: soundEnabled,
        browserInfo: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled
        }
    };
}

function getCurrentPage() {
    const activePage = document.querySelector('.page.active');
    return activePage ? activePage.id : null;
}

// Debug and Development Functions
function enableDebugMode() {
    app.debug = true;
    console.log('Debug mode enabled');
    
    // Add debug info to UI
    const debugInfo = document.createElement('div');
    debugInfo.id = 'debug-info';
    debugInfo.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0,0,0,0.8);
        color: #0f0;
        font-family: monospace;
        font-size: 10px;
        padding: 10px;
        border-radius: 5px;
        z-index: 10000;
        pointer-events: none;
        max-width: 200px;
    `;
    
    document.body.appendChild(debugInfo);
    
    // Update debug info periodically
    setInterval(updateDebugInfo, 1000);
}

function updateDebugInfo() {
    const debugInfo = document.getElementById('debug-info');
    if (debugInfo && app.debug) {
        const stats = getGameStats();
        debugInfo.innerHTML = `
            Version: ${app.version}<br>
            Page: ${getCurrentPage()}<br>
            Theme: ${gameState.currentTheme}<br>
            Difficulty: ${gameState.currentDifficulty}<br>
            Selected: ${stats.selectedCount}/${stats.totalCount}<br>
            Has Win: ${gameState.hasWinningCondition}<br>
            Completed: ${gameState.gameCompleted}<br>
            Sound: ${soundEnabled ? 'ON' : 'OFF'}<br>
            Games Played: ${playerStats.gamesPlayed}<br>
            Games Won: ${playerStats.gamesWon}
        `;
    }
}

function disableDebugMode() {
    app.debug = false;
    const debugInfo = document.getElementById('debug-info');
    if (debugInfo) {
        debugInfo.remove();
    }
    console.log('Debug mode disabled');
}

// Error Handling and Recovery
function handleApplicationError(error, context = 'Unknown') {
    console.error(`Application Error in ${context}:`, error);
    
    // Show user-friendly error message
    const errorMessage = `Something went wrong in ${context}. The game will try to recover automatically.`;
    showErrorMessage(errorMessage, document.body);
    
    // Attempt recovery
    try {
        if (context === 'game') {
            resetCurrentGame();
        } else {
            // For other errors, try resetting to welcome page
            navigateToWelcome();
        }
    } catch (recoveryError) {
        console.error('Recovery failed:', recoveryError);
        
        // Last resort: suggest page refresh
        const criticalError = document.createElement('div');
        criticalError.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: #e74c3c; color: white; padding: 2rem; border-radius: 10px; 
                        text-align: center; z-index: 10001;">
                <h3>Critical Error</h3>
                <p>The game encountered a critical error and cannot recover automatically.</p>
                <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; 
                        background: white; color: #e74c3c; border: none; border-radius: 5px; cursor: pointer;">
                    Refresh Page
                </button>
            </div>
        `;
        document.body.appendChild(criticalError);
    }
}

// Performance Monitoring
function monitorPerformance() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (app.debug) {
            console.log('Performance Metrics:', {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                totalLoadTime: perfData.loadEventEnd - perfData.fetchStart
            });
        }
    }
}

// Expose global functions for debugging
window.CollegeBingo = {
    version: app.version,
    debug: {
        enable: enableDebugMode,
        disable: disableDebugMode,
        getInfo: getApplicationInfo,
        reset: resetApplication
    },
    game: {
        reset: resetCurrentGame,
        getStats: getGameStats,
        setState: (newState) => Object.assign(gameState, newState)
    },
    ui: {
        navigate: {
            welcome: navigateToWelcome,
            settings: navigateToSettings,
            game: navigateToGame
        },
        theme: applyThemeStyles
    },
    sound: {
        toggle: toggleSound,
        enabled: () => soundEnabled
    }
};

// Initialize performance monitoring
window.addEventListener('load', monitorPerformance);

// Log successful initialization
console.log('🎓 College Life Bingo loaded successfully!');
console.log('💡 Type CollegeBingo.debug.enable() in console for debug mode');
console.log('🔊 Press Ctrl+M to toggle sound on/off');