// UI Navigation and Management

// Page Navigation
function navigateToSettings() {
    showPage('settings-page');
    initializeSettingsPage();
}

function navigateToGame() {
    showPage('game-page');
    updateDifficultyDisplay();
    initializeGame();
}

function navigateToWelcome() {
    showPage('welcome-page');
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        animatePageTransition(targetPage);
    }
}

function animatePageTransition(page) {
    page.style.opacity = '0';
    page.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        page.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        page.style.opacity = '1';
        page.style.transform = 'translateY(0)';
    }, 50);
}

// Settings Page Management
function initializeSettingsPage() {
    setupThemeButtons();
    setupDifficultyButtons();
}

function setupThemeButtons() {
    document.querySelectorAll('[data-theme]').forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all theme buttons
            document.querySelectorAll('[data-theme]').forEach(btn => 
                btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Update game state and apply theme
            updateGameTheme(this.dataset.theme);
        });
    });
}

function setupDifficultyButtons() {
    document.querySelectorAll('[data-difficulty]').forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all difficulty buttons
            document.querySelectorAll('[data-difficulty]').forEach(btn => 
                btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Update game state
            updateGameDifficulty(this.dataset.difficulty);
        });
    });
}

function startGameSession() {
    navigateToGame();
    addStaggerAnimation();
}

function addStaggerAnimation() {
    const cells = document.querySelectorAll('.bingo-cell');
    cells.forEach((cell, index) => {
        cell.style.animationDelay = `${index * 0.05}s`;
        cell.classList.add('stagger-animation');
    });
}

// Floating Instructions Functions
function showFloatingInstructions() {
    const floatingInstructions = document.getElementById('floating-instructions');
    if (floatingInstructions) {
        floatingInstructions.classList.add('active');
    }
}

function hideFloatingInstructions() {
    const floatingInstructions = document.getElementById('floating-instructions');
    if (floatingInstructions) {
        floatingInstructions.classList.remove('active');
    }
}

// Theme Application
function applyThemeStyles() {
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('dark-theme', 'light-theme');
    
    // Add current theme class
    if (gameState.currentTheme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.add('light-theme');
    }
    
    // Update theme-dependent elements
    updateThemeColors();
}

function updateThemeColors() {
    const themeInfo = getThemeInfo(gameState.currentTheme);
    const root = document.documentElement;
    
    // Set CSS custom properties for theme colors
    root.style.setProperty('--primary-color', themeInfo.colors.primary);
    root.style.setProperty('--secondary-color', themeInfo.colors.secondary);
    root.style.setProperty('--accent-color', themeInfo.colors.accent);
    root.style.setProperty('--success-color', themeInfo.colors.success);
    root.style.setProperty('--warning-color', themeInfo.colors.warning);
}

function updateDifficultyDisplay() {
    const difficultyInfo = getDifficultyInfo(gameState.currentDifficulty);
    const difficultyElement = document.getElementById('current-difficulty');
    
    if (difficultyElement) {
        difficultyElement.textContent = difficultyInfo.name;
        difficultyElement.style.color = difficultyInfo.color;
    }
}

// Modal Management - FIXED TO RESET GAME COMPLETED STATE WHEN CLOSING
function showVictoryModal() {
    const modal = document.getElementById('victory-modal');
    if (modal) {
        modal.classList.add('active');
        updateVictoryModalContent();
        saveGameResult();
    }
}

function closeVictoryModal() {
    const modal = document.getElementById('victory-modal');
    if (modal) {
        modal.classList.remove('active');
        
        // CRITICAL FIX: Reset gameCompleted state when modal is closed
        // This allows tiles to be clickable again after "Keep Playing"
        gameState.gameCompleted = false;
        
        // Clear the strobe effect from center button if no winning condition
        if (!gameState.hasWinningCondition) {
            const centerButton = document.querySelector('.bingo-cell.center');
            if (centerButton) {
                centerButton.classList.remove('strobe');
            }
        }
    }
}

function updateVictoryModalContent() {
    const stats = getGameStats();
    const modalText = document.querySelector('.modal-text');
    
    if (modalText) {
        modalText.innerHTML = `
            Congratulations! You've successfully experienced the true essence of college life! 📚✨
            <br><br>
            <strong>Your Stats:</strong><br>
            • ${stats.selectedCount}/${stats.totalCount} experiences completed (${stats.completionPercentage}%)<br>
            • ${stats.winningLinesCount} winning line${stats.winningLinesCount !== 1 ? 's' : ''} achieved<br>
            • Playing time: ${formatPlayTime(stats.playTime)}<br>
            • Difficulty: ${getDifficultyInfo(stats.difficulty).name}
            <br><br>
            Share this moment with fellow students who'll totally get it!
        `;
    }
}

// Loading and Error States
function showLoadingState(element) {
    if (element) {
        element.innerHTML = '<div class="loading-spinner">🔄 Loading...</div>';
        element.classList.add('loading');
    }
}

function hideLoadingState(element, originalContent) {
    if (element) {
        element.innerHTML = originalContent;
        element.classList.remove('loading');
    }
}

function showErrorMessage(message, container) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <span class="error-text">${message}</span>
        </div>
    `;
    
    if (container) {
        container.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Responsive UI Helpers
function adjustForScreenSize() {
    const screenWidth = window.innerWidth;
    const bingoCells = document.querySelectorAll('.bingo-cell');
    
    if (screenWidth <= 480) {
        // Mobile adjustments
        bingoCells.forEach(cell => {
            cell.style.fontSize = '0.6rem';
            cell.style.padding = '4px';
        });
    } else if (screenWidth <= 768) {
        // Tablet adjustments
        bingoCells.forEach(cell => {
            cell.style.fontSize = '0.7rem';
            cell.style.padding = '6px';
        });
    } else {
        // Desktop - reset to default
        bingoCells.forEach(cell => {
            cell.style.fontSize = '';
            cell.style.padding = '';
        });
    }
}

// Accessibility Features
function setupAccessibilityFeatures() {
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add focus indicators
    addFocusIndicators();
    
    // Add screen reader support
    addAriaLabels();
}

function handleKeyboardNavigation(event) {
    const focusableElements = document.querySelectorAll(
        'button, .bingo-cell, .option-button, .control-btn, .primary-btn'
    );
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
    
    switch(event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
            break;
            
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
            focusableElements[prevIndex].focus();
            break;
            
        case 'Enter':
        case ' ':
            if (document.activeElement.classList.contains('bingo-cell')) {
                event.preventDefault();
                document.activeElement.click();
            }
            break;
    }
}

function addFocusIndicators() {
    const style = document.createElement('style');
    style.textContent = `
        .bingo-cell:focus,
        .option-button:focus,
        .control-btn:focus,
        .primary-btn:focus {
            outline: 3px solid #fff;
            outline-offset: 2px;
        }
        
        .error-message {
            background: rgba(231, 76, 60, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            margin: 1rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .loading-spinner {
            text-align: center;
            font-size: 1.2rem;
            animation: spin 1s linear infinite;
        }
        
        .achievement-notification {
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function addAriaLabels() {
    // Add aria labels to bingo cells
    setTimeout(() => {
        const cells = document.querySelectorAll('.bingo-cell');
        cells.forEach((cell, index) => {
            if (index === 12) {
                cell.setAttribute('aria-label', 'BINGO button - Click when you have a winning line');
                cell.setAttribute('role', 'button');
            } else {
                const experienceIndex = index < 12 ? index : index - 1;
                const experience = gameState.bingoBoard[experienceIndex];
                cell.setAttribute('aria-label', `College experience: ${experience}. Click to mark as completed.`);
                cell.setAttribute('role', 'button');
            }
        });
    }, 100);
}

// Animation Utilities
function addPulseAnimation(element) {
    element.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

function addShakeAnimation(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Event Listeners Setup
function setupUIEventListeners() {
    // Window resize handler
    window.addEventListener('resize', adjustForScreenSize);
    
    // Modal close on outside click
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-overlay')) {
            closeVictoryModal();
        }
        
        // Close floating instructions when clicking outside
        if (!event.target.closest('.floating-instructions') && !event.target.closest('[onclick*="showFloatingInstructions"]')) {
            hideFloatingInstructions();
        }
    });
    
    // Escape key to close modal and floating instructions
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeVictoryModal();
            hideFloatingInstructions();
        }
    });
}

// Initialize UI
document.addEventListener('DOMContentLoaded', function() {
    setupUIEventListeners();
    setupAccessibilityFeatures();
    adjustForScreenSize();
});