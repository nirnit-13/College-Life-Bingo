// Game State Management
let gameState = {
    currentTheme: 'light',
    currentDifficulty: 'freshman',
    bingoBoard: [],
    selectedCells: Array(25).fill(false),
    gameCompleted: false,
    hasWinningCondition: false,
    startTime: null,
    completedLines: []
};

// Enhanced Sound Management
let soundEnabled = true;
let backgroundMusic = null;
let audioContext = null;
let masterGainNode = null;

// Initialize enhanced sound system
function initializeSounds() {
    backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        backgroundMusic.volume = 0.2;
    }
    
    // Initialize Web Audio API
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        masterGainNode = audioContext.createGain();
        masterGainNode.connect(audioContext.destination);
        masterGainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
        
        createEnhancedBackgroundMusic();
    } catch (error) {
        console.log('Web Audio API not supported');
    }
}

function createEnhancedBackgroundMusic() {
    if (!audioContext || !soundEnabled) return;
    
    let isPlaying = false;
    
    function playCollegeAmbientMusic() {
        if (isPlaying || !soundEnabled) return;
        isPlaying = true;
        
        // Create a more sophisticated college-themed ambient sound
        const duration = 6;
        
        // Main melody oscillator - representing hope and aspiration
        const melody = audioContext.createOscillator();
        const melodyGain = audioContext.createGain();
        const melodyFilter = audioContext.createBiquadFilter();
        
        melody.connect(melodyFilter);
        melodyFilter.connect(melodyGain);
        melodyGain.connect(masterGainNode);
        
        // Harmony oscillator - representing friendship and community
        const harmony = audioContext.createOscillator();
        const harmonyGain = audioContext.createGain();
        
        harmony.connect(harmonyGain);
        harmonyGain.connect(masterGainNode);
        
        // Bass notes - representing foundation of learning
        const bass = audioContext.createOscillator();
        const bassGain = audioContext.createGain();
        
        bass.connect(bassGain);
        bassGain.connect(masterGainNode);
        
        // Configure melody (uplifting college progression)
        melody.type = 'sine';
        melodyFilter.type = 'lowpass';
        melodyFilter.frequency.setValueAtTime(800, audioContext.currentTime);
        
        // College-inspired chord progression (C-Am-F-G)
        melody.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        melody.frequency.setValueAtTime(440, audioContext.currentTime + 1.5); // A4
        melody.frequency.setValueAtTime(349.23, audioContext.currentTime + 3); // F4
        melody.frequency.setValueAtTime(392, audioContext.currentTime + 4.5); // G4
        
        // Configure harmony
        harmony.type = 'triangle';
        harmony.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4
        harmony.frequency.setValueAtTime(220, audioContext.currentTime + 1.5); // A3
        harmony.frequency.setValueAtTime(174.61, audioContext.currentTime + 3); // F3
        harmony.frequency.setValueAtTime(196, audioContext.currentTime + 4.5); // G3
        
        // Configure bass
        bass.type = 'sawtooth';
        bass.frequency.setValueAtTime(130.81, audioContext.currentTime); // C3
        bass.frequency.setValueAtTime(110, audioContext.currentTime + 1.5); // A2
        bass.frequency.setValueAtTime(87.31, audioContext.currentTime + 3); // F2
        bass.frequency.setValueAtTime(98, audioContext.currentTime + 4.5); // G2
        
        // Volume envelopes
        melodyGain.gain.setValueAtTime(0, audioContext.currentTime);
        melodyGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
        melodyGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration - 0.5);
        
        harmonyGain.gain.setValueAtTime(0, audioContext.currentTime);
        harmonyGain.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + 0.8);
        harmonyGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration - 0.3);
        
        bassGain.gain.setValueAtTime(0, audioContext.currentTime);
        bassGain.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 1);
        bassGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration - 1);
        
        // Start all oscillators
        melody.start(audioContext.currentTime);
        harmony.start(audioContext.currentTime);
        bass.start(audioContext.currentTime);
        
        melody.stop(audioContext.currentTime + duration);
        harmony.stop(audioContext.currentTime + duration);
        bass.stop(audioContext.currentTime + duration);
        
        melody.onended = () => {
            isPlaying = false;
            setTimeout(playCollegeAmbientMusic, 4000); // Play again after 4 seconds
        };
    }

    // Start ambient music when user interacts with the page
    document.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        if (!isPlaying && soundEnabled) {
            setTimeout(playCollegeAmbientMusic, 1000);
        }
    }, { once: true });
}

function playClickSound() {
    if (!soundEnabled || !audioContext) return;
    
    try {
        // Enhanced click sound - more satisfying and modern
        const clickOsc = audioContext.createOscillator();
        const clickGain = audioContext.createGain();
        const clickFilter = audioContext.createBiquadFilter();
        
        clickOsc.connect(clickFilter);
        clickFilter.connect(clickGain);
        clickGain.connect(masterGainNode);
        
        // Modern UI click sound
        clickOsc.type = 'sine';
        clickFilter.type = 'lowpass';
        clickFilter.frequency.setValueAtTime(2000, audioContext.currentTime);
        
        clickOsc.frequency.setValueAtTime(800, audioContext.currentTime);
        clickOsc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
        clickOsc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
        
        clickGain.gain.setValueAtTime(0.3, audioContext.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
        
        clickOsc.start(audioContext.currentTime);
        clickOsc.stop(audioContext.currentTime + 0.15);
    } catch (error) {
        console.log('Could not play click sound');
    }
}

function playTileSelectSound() {
    if (!soundEnabled || !audioContext) return;
    
    try {
        // Distinctive tile selection sound - like marking an achievement
        const tileOsc1 = audioContext.createOscillator();
        const tileOsc2 = audioContext.createOscillator();
        const tileGain = audioContext.createGain();
        const tileFilter = audioContext.createBiquadFilter();
        
        tileOsc1.connect(tileFilter);
        tileOsc2.connect(tileFilter);
        tileFilter.connect(tileGain);
        tileGain.connect(masterGainNode);
        
        // Satisfying "ding" sound for selecting experiences
        tileOsc1.type = 'sine';
        tileOsc2.type = 'triangle';
        tileFilter.type = 'lowpass';
        tileFilter.frequency.setValueAtTime(3000, audioContext.currentTime);
        
        // Two-tone chime
        tileOsc1.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
        tileOsc2.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        
        tileGain.gain.setValueAtTime(0.4, audioContext.currentTime);
        tileGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        tileOsc1.start(audioContext.currentTime);
        tileOsc2.start(audioContext.currentTime + 0.02);
        tileOsc1.stop(audioContext.currentTime + 0.3);
        tileOsc2.stop(audioContext.currentTime + 0.32);
    } catch (error) {
        console.log('Could not play tile sound');
    }
}

function playBingoSound() {
    if (!soundEnabled || !audioContext) return;
    
    try {
        // Epic celebration sound for BINGO achievement
        const duration = 1.2;
        
        // Main celebration melody
        const celebOsc = audioContext.createOscillator();
        const celebGain = audioContext.createGain();
        const celebFilter = audioContext.createBiquadFilter();
        
        celebOsc.connect(celebFilter);
        celebFilter.connect(celebGain);
        celebGain.connect(masterGainNode);
        
        // Harmony oscillator
        const harmonyOsc = audioContext.createOscillator();
        const harmonyGain = audioContext.createGain();
        
        harmonyOsc.connect(harmonyGain);
        harmonyGain.connect(masterGainNode);
        
        // Victory fanfare progression
        celebOsc.type = 'square';
        harmonyOsc.type = 'sawtooth';
        celebFilter.type = 'lowpass';
        celebFilter.frequency.setValueAtTime(4000, audioContext.currentTime);
        
        // College graduation-style fanfare (C-E-G-C octave)
        celebOsc.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        celebOsc.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
        celebOsc.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // G5
        celebOsc.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.6); // C6
        celebOsc.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.8); // Hold C6
        
        // Harmony follows
        harmonyOsc.frequency.setValueAtTime(261.63, audioContext.currentTime + 0.1); // C4
        harmonyOsc.frequency.setValueAtTime(329.63, audioContext.currentTime + 0.3); // E4
        harmonyOsc.frequency.setValueAtTime(392, audioContext.currentTime + 0.5); // G4
        harmonyOsc.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.7); // C5
        
        // Dynamic volume envelope
        celebGain.gain.setValueAtTime(0.5, audioContext.currentTime);
        celebGain.gain.linearRampToValueAtTime(0.7, audioContext.currentTime + 0.6);
        celebGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        harmonyGain.gain.setValueAtTime(0, audioContext.currentTime);
        harmonyGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.2);
        harmonyGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration - 0.1);
        
        celebOsc.start(audioContext.currentTime);
        harmonyOsc.start(audioContext.currentTime + 0.1);
        celebOsc.stop(audioContext.currentTime + duration);
        harmonyOsc.stop(audioContext.currentTime + duration - 0.1);
        
    } catch (error) {
        console.log('Could not play bingo sound');
    }
}

function playWinLineSound() {
    if (!soundEnabled || !audioContext) return;
    
    try {
        // Subtle notification for when a line is completed
        const lineOsc = audioContext.createOscillator();
        const lineGain = audioContext.createGain();
        const lineFilter = audioContext.createBiquadFilter();
        
        lineOsc.connect(lineFilter);
        lineFilter.connect(lineGain);
        lineGain.connect(masterGainNode);
        
        lineOsc.type = 'sine';
        lineFilter.type = 'lowpass';
        lineFilter.frequency.setValueAtTime(1500, audioContext.currentTime);
        
        // Gentle ascending notification
        lineOsc.frequency.setValueAtTime(440, audioContext.currentTime); // A4
        lineOsc.frequency.linearRampToValueAtTime(554.37, audioContext.currentTime + 0.15); // C#5
        lineOsc.frequency.linearRampToValueAtTime(659.25, audioContext.currentTime + 0.3); // E5
        
        lineGain.gain.setValueAtTime(0.2, audioContext.currentTime);
        lineGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
        lineGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
        
        lineOsc.start(audioContext.currentTime);
        lineOsc.stop(audioContext.currentTime + 0.4);
    } catch (error) {
        console.log('Could not play line sound');
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundButton = document.getElementById('sound-toggle');
    if (soundButton) {
        soundButton.textContent = soundEnabled ? '🔊' : '🔇';
        soundButton.title = soundEnabled ? 'Sound On (Click to turn off)' : 'Sound Off (Click to turn on)';
    }
    
    // Update master gain
    if (masterGainNode) {
        masterGainNode.gain.setValueAtTime(soundEnabled ? 0.7 : 0, audioContext.currentTime);
    }
    
    console.log('Sound', soundEnabled ? 'enabled' : 'disabled');
}

// Game Initialization - Fixed to ensure board always loads
function initializeGame() {
    console.log('Initializing game...');
    resetGameState();
    initializeSounds();
    
    // Ensure DOM is ready before generating board
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            generateAndRenderBoard();
        });
    } else {
        // DOM is already ready
        generateAndRenderBoard();
    }
}

function generateAndRenderBoard() {
    // Add a small delay to ensure all DOM elements are properly initialized
    setTimeout(() => {
        generateBingoBoard();
        renderBingoBoard();
        console.log('Board generated and rendered');
    }, 100);
}

function resetGameState() {
    gameState.selectedCells = Array(25).fill(false);
    gameState.hasWinningCondition = false;
    gameState.gameCompleted = false;
    gameState.startTime = new Date();
    gameState.completedLines = [];
}

// Board Generation
function generateBingoBoard() {
    const experiences = getRandomExperiences(gameState.currentDifficulty, 24);
    gameState.bingoBoard = experiences;
    console.log('Bingo board generated with', experiences.length, 'experiences');
}

function renderBingoBoard() {
    const boardElement = document.getElementById('bingo-board');
    if (!boardElement) {
        console.error('Board element not found! Retrying...');
        // Retry after a longer delay if element not found
        setTimeout(renderBingoBoard, 500);
        return;
    }
    
    console.log('Rendering bingo board...');
    boardElement.innerHTML = '';

    for (let i = 0; i < gameConfig.totalCells; i++) {
        const cell = createBingoCell(i);
        boardElement.appendChild(cell);
    }
    
    console.log('Bingo board rendered successfully');
}

function createBingoCell(index) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    cell.dataset.index = index;

    if (index === gameConfig.centerIndex) {
        // Center cell - BINGO button
        cell.className += ' center';
        cell.textContent = 'BINGO!';
        cell.addEventListener('click', () => handleBingoClick());
    } else {
        // Regular experience cell
        const experienceIndex = index < gameConfig.centerIndex ? index : index - 1;
        const experience = gameState.bingoBoard[experienceIndex];
        if (experience) {
            cell.textContent = experience;
        } else {
            cell.textContent = 'Loading...';
        }
        cell.addEventListener('click', () => handleCellClick(index));
    }

    return cell;
}

// Cell Interaction Handlers
function handleCellClick(cellIndex) {
    if (cellIndex === gameConfig.centerIndex) return;
    
    // Allow clicking even if game was previously completed - this fixes the bug
    // Remove the gameCompleted check to allow continued play after "Keep Playing"
    
    playTileSelectSound(); // Enhanced tile selection sound
    toggleCell(cellIndex);
    updateCellVisual(cellIndex);
    evaluateWinConditions();
}

function toggleCell(cellIndex) {
    gameState.selectedCells[cellIndex] = !gameState.selectedCells[cellIndex];
}

function updateCellVisual(cellIndex) {
    const cellElement = document.querySelector(`[data-index="${cellIndex}"]`);
    if (!cellElement) return;

    if (gameState.selectedCells[cellIndex]) {
        cellElement.classList.add('selected');
        animateSelection(cellElement);
    } else {
        cellElement.classList.remove('selected');
    }
}

function animateSelection(element) {
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1.02)';
    }, 150);
}

function handleBingoClick() {
    if (gameState.hasWinningCondition && !gameState.gameCompleted) {
        playBingoSound(); // Enhanced victory sound
        gameState.gameCompleted = true;
        showVictoryModal();
        celebrateWin();
    } else if (!gameState.hasWinningCondition) {
        showNoBingoMessage();
    }
}

function showNoBingoMessage() {
    const centerButton = document.querySelector('.bingo-cell.center');
    if (centerButton) {
        centerButton.style.animation = 'shake 0.5s';
        setTimeout(() => {
            centerButton.style.animation = '';
        }, 500);
    }
    
    // Could add a tooltip or temporary message here
    console.log('No winning lines yet! Keep playing!');
}

// Win Condition Logic
function evaluateWinConditions() {
    const winningLines = getAllWinningLines();
    const completedLines = winningLines.filter(line => isLineCompleted(line));
    
    gameState.completedLines = completedLines;
    
    const centerButton = document.querySelector('.bingo-cell.center');
    if (!centerButton) return;
    
    if (completedLines.length > 0) {
        if (!gameState.hasWinningCondition) {
            gameState.hasWinningCondition = true;
            centerButton.classList.add('strobe');
            highlightWinningLines(completedLines);
            playWinLineSound(); // Play line completion notification
        }
    } else {
        gameState.hasWinningCondition = false;
        centerButton.classList.remove('strobe');
        clearLineHighlights();
    }
}

function getAllWinningLines() {
    const lines = [];
    
    // Rows
    for (let row = 0; row < 5; row++) {
        const line = [];
        for (let col = 0; col < 5; col++) {
            line.push(row * 5 + col);
        }
        lines.push(line);
    }
    
    // Columns
    for (let col = 0; col < 5; col++) {
        const line = [];
        for (let row = 0; row < 5; row++) {
            line.push(row * 5 + col);
        }
        lines.push(line);
    }
    
    // Main diagonal (top-left to bottom-right)
    const mainDiagonal = [];
    for (let i = 0; i < 5; i++) {
        mainDiagonal.push(i * 5 + i);
    }
    lines.push(mainDiagonal);
    
    // Anti-diagonal (top-right to bottom-left)
    const antiDiagonal = [];
    for (let i = 0; i < 5; i++) {
        antiDiagonal.push(i * 5 + (4 - i));
    }
    lines.push(antiDiagonal);
    
    return lines;
}

function isLineCompleted(line) {
    return line.every(index => 
        index === gameConfig.centerIndex || gameState.selectedCells[index]
    );
}

function highlightWinningLines(lines) {
    // Remove existing highlights
    clearLineHighlights();
    
    // Add highlights for winning lines
    lines.forEach(line => {
        line.forEach(index => {
            const cell = document.querySelector(`[data-index="${index}"]`);
            if (cell) {
                cell.classList.add('winning-line');
            }
        });
    });
}

function clearLineHighlights() {
    document.querySelectorAll('.winning-line').forEach(cell => {
        cell.classList.remove('winning-line');
    });
}

// Game Statistics
function getGameStats() {
    const selectedCount = gameState.selectedCells.filter(cell => cell).length;
    const completionPercentage = Math.round((selectedCount / 24) * 100);
    const playTime = gameState.startTime ? 
        Math.floor((new Date() - gameState.startTime) / 1000) : 0;
    
    return {
        selectedCount,
        totalCount: 24,
        completionPercentage,
        playTime,
        difficulty: gameState.currentDifficulty,
        hasWon: gameState.gameCompleted,
        winningLinesCount: gameState.completedLines.length
    };
}

function formatPlayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
        return `${remainingSeconds}s`;
    } else {
        return `${minutes}m ${remainingSeconds}s`;
    }
}

// Game Reset and Control - FIXED TO RESET GAME COMPLETED STATE
function resetCurrentGame() {
    console.log('Resetting current game...');
    resetGameState();
    generateBingoBoard();
    renderBingoBoard();
    clearLineHighlights();
    
    const centerButton = document.querySelector('.bingo-cell.center');
    if (centerButton) {
        centerButton.classList.remove('strobe');
    }
}

function celebrateWin() {
    // Add celebration effects
    const boardContainer = document.querySelector('.bingo-container');
    if (boardContainer) {
        boardContainer.classList.add('celebrate');
        setTimeout(() => {
            boardContainer.classList.remove('celebrate');
        }, 2000);
    }
    
    // Add confetti effect or other celebration animations here
    createConfetti();
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Add confetti animation to CSS dynamically
function addConfettiAnimation() {
    if (!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            .celebrate {
                animation: celebratePulse 0.6s ease-in-out 3;
            }
            
            @keyframes celebratePulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .winning-line {
                border: 3px solid #f1c40f !important;
                box-shadow: 0 0 15px rgba(241, 196, 15, 0.6) !important;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Game Instructions - Updated to use modal
function showInstructions() {
    showInstructionsModal();
}

// Theme Management
function updateGameTheme(theme) {
    gameState.currentTheme = theme;
    applyThemeStyles();
}

function updateGameDifficulty(difficulty) {
    gameState.currentDifficulty = difficulty;
    const difficultyInfo = getDifficultyInfo(difficulty);
    
    // Update difficulty display if on game page
    const difficultyElement = document.getElementById('current-difficulty');
    if (difficultyElement) {
        difficultyElement.textContent = difficultyInfo.name;
    }
}

// Local Storage Alternative (In-Memory Persistence)
let gameHistory = [];
let playerStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    totalPlayTime: 0,
    favoriteTheme: 'light',
    favoriteDifficulty: 'freshman',
    bestCompletionTime: null,
    achievementsUnlocked: []
};

function saveGameResult() {
    const gameResult = {
        ...getGameStats(),
        timestamp: new Date(),
        theme: gameState.currentTheme,
        board: [...gameState.bingoBoard],
        selectedCells: [...gameState.selectedCells]
    };
    
    gameHistory.push(gameResult);
    updatePlayerStats(gameResult);
    
    // Keep only last 10 games to avoid memory issues
    if (gameHistory.length > 10) {
        gameHistory = gameHistory.slice(-10);
    }
}

function updatePlayerStats(gameResult) {
    playerStats.gamesPlayed++;
    if (gameResult.hasWon) {
        playerStats.gamesWon++;
    }
    playerStats.totalPlayTime += gameResult.playTime;
    
    if (gameResult.hasWon && 
        (!playerStats.bestCompletionTime || 
         gameResult.playTime < playerStats.bestCompletionTime)) {
        playerStats.bestCompletionTime = gameResult.playTime;
    }
    
    checkForAchievements(gameResult);
}

function checkForAchievements(gameResult) {
    const achievements = [];
    
    if (gameResult.hasWon && !playerStats.achievementsUnlocked.includes('first_win')) {
        achievements.push('first_win');
    }
    
    if (gameResult.completionPercentage === 100 && 
        !playerStats.achievementsUnlocked.includes('perfectionist')) {
        achievements.push('perfectionist');
    }
    
    if (playerStats.gamesWon >= 5 && 
        !playerStats.achievementsUnlocked.includes('bingo_master')) {
        achievements.push('bingo_master');
    }
    
    achievements.forEach(achievement => {
        if (!playerStats.achievementsUnlocked.includes(achievement)) {
            playerStats.achievementsUnlocked.push(achievement);
            showAchievementNotification(achievement);
        }
    });
}

function showAchievementNotification(achievement) {
    const achievements = {
        first_win: '🎉 First Victory!',
        perfectionist: '💯 Perfectionist!',
        bingo_master: '👑 Bingo Master!'
    };
    
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    notification.textContent = achievements[achievement] || 'Achievement Unlocked!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Initialize confetti animation styles on load
document.addEventListener('DOMContentLoaded', function() {
    addConfettiAnimation();
    initializeSounds();
});