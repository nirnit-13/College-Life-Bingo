// Social Sharing and Download Functions

// WhatsApp Sharing
function shareViaWhatsApp() {
    const stats = getGameStats();
    const difficultyName = getDifficultyInfo(stats.difficulty).name;
    const hashtags = generateHashtags(stats.difficulty);
    
    const message = `🎉 I just completed College Life Bingo at ${difficultyName} level! ` +
                   `I've experienced ${stats.selectedCount}/${stats.totalCount} college moments (${stats.completionPercentage}%). ` +
                   `${stats.hasWon ? 'BINGO achieved! 🎯 ' : ''}` +
                   `Can you beat my score? This game is so relatable! 🎓\n\n` +
                   `${hashtags.join(' ')}`;
                   
    const whatsappURL = `${socialConfig.whatsapp.baseUrl}${encodeURIComponent(message)}`;
    
    // Track sharing event
    trackSharingEvent('whatsapp', stats);
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

// Instagram Sharing
function shareViaInstagram() {
    const stats = getGameStats();
    const difficultyName = getDifficultyInfo(stats.difficulty).name;
    const hashtags = generateHashtags(stats.difficulty);
    
    const instructions = `📸 Perfect for your Instagram story!\n\n` +
                        `📋 Steps to share:\n` +
                        `1. Take a screenshot of your completed bingo board\n` +
                        `2. Open Instagram and create a new story\n` +
                        `3. Upload your screenshot\n` +
                        `4. Add these hashtags to your story:\n\n` +
                        `${hashtags.join(' ')}\n\n` +
                        `🎯 Your Stats:\n` +
                        `• Level: ${difficultyName}\n` +
                        `• Score: ${stats.selectedCount}/${stats.totalCount} (${stats.completionPercentage}%)\n` +
                        `• ${stats.hasWon ? 'BINGO ACHIEVED! 🎉' : 'Keep playing!'}\n\n` +
                        `Tag your college friends who'll totally relate! 🎓✨`;
    
    // Track sharing event
    trackSharingEvent('instagram', stats);
    
    // Show instructions modal
    showInstructionsModal('Instagram Sharing Guide', instructions);
}

// Twitter Sharing
function shareViaTwitter() {
    const stats = getGameStats();
    const difficultyName = getDifficultyInfo(stats.difficulty).name;
    const hashtags = generateHashtags(stats.difficulty, 3); // Limit hashtags for Twitter
    
    const tweetText = `🎉 Just ${stats.hasWon ? 'crushed' : 'played'} College Life Bingo at ${difficultyName} level! ` +
                     `${stats.selectedCount}/${stats.totalCount} experiences unlocked (${stats.completionPercentage}%). ` +
                     `${stats.hasWon ? 'BINGO achieved! 🎯 ' : ''}` +
                     `Every college student needs to try this! 🎓 ${hashtags.join(' ')}`;
                     
    const twitterURL = `${socialConfig.twitter.baseUrl}${encodeURIComponent(tweetText)}`;
    
    // Track sharing event
    trackSharingEvent('twitter', stats);
    
    // Open Twitter
    window.open(twitterURL, '_blank', 'noopener,noreferrer');
}

// Board Download Function
function downloadBingoBoard() {
    const stats = getGameStats();
    
    try {
        // Show loading state
        const downloadBtn = document.querySelector('.share-download');
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '⏳ Creating...';
        downloadBtn.disabled = true;
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Set high resolution for better quality
        const scale = window.devicePixelRatio || 2;
        canvas.width = 1200 * scale;
        canvas.height = 1400 * scale;
        canvas.style.width = '1200px';
        canvas.style.height = '1400px';
        context.scale(scale, scale);

        // Draw the board
        drawBingoBoard(context, stats);
        
        // Download the image
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `college-life-bingo-${stats.difficulty}-${timestamp}.png`;
        
        link.download = filename;
        link.href = canvas.toDataURL('image/png', 0.9);
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Track download event
        trackSharingEvent('download', stats);
        
        // Show success message
        showSuccessMessage('Board downloaded successfully! 📥');
        
    } catch (error) {
        console.error('Download failed:', error);
        showErrorMessage('Download failed. Please try again.', document.querySelector('.modal-content'));
    } finally {
        // Restore button state
        setTimeout(() => {
            const downloadBtn = document.querySelector('.share-download');
            if (downloadBtn) {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }
        }, 1000);
    }
}

// Canvas Drawing Function
function drawBingoBoard(context, stats) {
    const difficultyInfo = getDifficultyInfo(stats.difficulty);
    
    // Create background gradient
    const backgroundGradient = context.createLinearGradient(0, 0, 1200, 1400);
    if (gameState.currentTheme === 'dark') {
        backgroundGradient.addColorStop(0, '#2c3e50');
        backgroundGradient.addColorStop(0.3, '#34495e');
        backgroundGradient.addColorStop(0.6, '#2c3e50');
        backgroundGradient.addColorStop(1, '#4a6741');
    } else {
        backgroundGradient.addColorStop(0, '#ff6b6b');
        backgroundGradient.addColorStop(0.2, '#4ecdc4');
        backgroundGradient.addColorStop(0.4, '#45b7d1');
        backgroundGradient.addColorStop(0.6, '#96ceb4');
        backgroundGradient.addColorStop(0.8, '#feca57');
        backgroundGradient.addColorStop(1, '#ff9ff3');
    }
    
    context.fillStyle = backgroundGradient;
    context.fillRect(0, 0, 1200, 1400);

    // Draw header
    drawBoardHeader(context, stats, difficultyInfo);
    
    // Draw bingo grid
    drawBingoGrid(context, stats);
    
    // Draw footer
    drawBoardFooter(context, stats);
}

function drawBoardHeader(context, stats, difficultyInfo) {
    // Title
    context.fillStyle = 'white';
    context.font = 'bold 64px Arial, sans-serif';
    context.textAlign = 'center';
    context.shadowColor = 'rgba(0,0,0,0.3)';
    context.shadowBlur = 10;
    context.fillText('🎓 College Life Bingo', 600, 100);
    
    // Difficulty level
    context.font = 'bold 36px Arial, sans-serif';
    context.fillText(`${difficultyInfo.icon} ${difficultyInfo.name}`, 600, 150);
    
    // Stats
    context.font = '28px Arial, sans-serif';
    context.fillText(`${stats.selectedCount}/${stats.totalCount} Experiences Completed (${stats.completionPercentage}%)`, 600, 190);
    
    if (stats.hasWon) {
        context.fillStyle = '#f1c40f';
        context.font = 'bold 32px Arial, sans-serif';
        context.fillText('🎉 BINGO ACHIEVED! 🎉', 600, 230);
    }
    
    context.shadowBlur = 0;
}

function drawBingoGrid(context, stats) {
    const gridStartX = 100;
    const gridStartY = 280;
    const cellSize = 200;
    const cellGap = 10;

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const x = gridStartX + col * (cellSize + cellGap);
            const y = gridStartY + row * (cellSize + cellGap);
            const index = row * 5 + col;
            
            drawBingoCell(context, x, y, cellSize, index, stats);
        }
    }
}

function drawBingoCell(context, x, y, size, index, stats) {
    // Determine cell colors
    let backgroundColor, textColor, borderColor;
    
    if (index === gameConfig.centerIndex) {
        // Center cell - BINGO
        backgroundColor = '#f1c40f';
        textColor = '#2c3e50';
        borderColor = '#f39c12';
    } else if (gameState.selectedCells[index]) {
        // Selected cell
        backgroundColor = '#ff6b6b';
        textColor = 'white';
        borderColor = '#e74c3c';
    } else {
        // Unselected cell
        backgroundColor = 'rgba(255, 255, 255, 0.9)';
        textColor = '#2c3e50';
        borderColor = 'rgba(255, 255, 255, 0.7)';
    }
    
    // Draw cell background with rounded corners
    context.fillStyle = backgroundColor;
    drawRoundedRect(context, x, y, size, size, 15);
    context.fill();
    
    // Draw cell border
    context.strokeStyle = borderColor;
    context.lineWidth = 4;
    drawRoundedRect(context, x, y, size, size, 15);
    context.stroke();
    
    // Draw cell text
    context.fillStyle = textColor;
    context.font = 'bold 16px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    const text = index === gameConfig.centerIndex ? 'BINGO!' : 
                 gameState.bingoBoard[index < gameConfig.centerIndex ? index : index - 1];
    
    const wrappedText = wrapCanvasText(context, text, size - 20);
    const lineHeight = 18;
    const totalHeight = wrappedText.length * lineHeight;
    const startY = y + size / 2 - totalHeight / 2 + lineHeight / 2;
    
    wrappedText.forEach((line, lineIndex) => {
        context.fillText(line, x + size / 2, startY + lineIndex * lineHeight);
    });
    
    context.textBaseline = 'alphabetic';
}

function drawBoardFooter(context, stats) {
    // Footer with sharing info
    context.fillStyle = 'white';
    context.font = '24px Arial, sans-serif';
    context.textAlign = 'center';
    context.fillText('Share your college memories! #CollegeLifeBingo', 600, 1320);
    
    // Timestamp
    context.font = '18px Arial, sans-serif';
    const now = new Date();
    context.fillText(`Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`, 600, 1350);
}

function drawRoundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
}

function wrapCanvasText(context, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0] || '';

    for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    
    return lines;
}

// Utility Functions
function generateHashtags(difficulty, limit = 8) {
    const generalTags = [...gameConfig.hashtags.general];
    const specificTags = gameConfig.hashtags.specific[difficulty] || [];
    
    const allTags = [...generalTags, ...specificTags];
    
    if (limit && allTags.length > limit) {
        return allTags.slice(0, limit);
    }
    
    return allTags;
}

function trackSharingEvent(platform, stats) {
    // Track sharing for analytics (in a real app, this would send to analytics service)
    const eventData = {
        platform,
        difficulty: stats.difficulty,
        completionPercentage: stats.completionPercentage,
        hasWon: stats.hasWon,
        timestamp: new Date().toISOString()
    };
    
    console.log('Sharing event tracked:', eventData);
    
    // Add to player stats
    if (!playerStats.sharingHistory) {
        playerStats.sharingHistory = [];
    }
    
    playerStats.sharingHistory.push(eventData);
    
    // Keep only last 20 sharing events
    if (playerStats.sharingHistory.length > 20) {
        playerStats.sharingHistory = playerStats.sharingHistory.slice(-20);
    }
}

function showInstructionsModal(title, content) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay instructions-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">${title}</h2>
            <div style="text-align: left; white-space: pre-line; line-height: 1.6; color: #555;">
                ${content}
            </div>
            <button class="primary-btn" onclick="closeInstructionsModal()" style="margin-top: 2rem;">
                Got it! 👍
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close on outside click
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeInstructionsModal();
        }
    });
}

function closeInstructionsModal() {
    const modal = document.querySelector('.instructions-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Advanced Sharing Features
function shareViaEmail() {
    const stats = getGameStats();
    const difficultyName = getDifficultyInfo(stats.difficulty).name;
    
    const subject = encodeURIComponent('Check out my College Life Bingo results! 🎓');
    const body = encodeURIComponent(
        `Hey!\n\n` +
        `I just played College Life Bingo and wanted to share my results with you!\n\n` +
        `🎯 Level: ${difficultyName}\n` +
        `📊 Score: ${stats.selectedCount}/${stats.totalCount} (${stats.completionPercentage}%)\n` +
        `⏱️ Time: ${formatPlayTime(stats.playTime)}\n` +
        `${stats.hasWon ? '🎉 BINGO achieved!\n' : ''}\n` +
        `This game perfectly captures the college experience - you should try it too!\n\n` +
        `College Life Bingo brings back so many memories. How many of these experiences can you relate to?\n\n` +
        `Best,\n[Your name]`
    );
    
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    
    trackSharingEvent('email', stats);
}

function copyBoardToClipboard() {
    const stats = getGameStats();
    const difficultyName = getDifficultyInfo(stats.difficulty).name;
    const hashtags = generateHashtags(stats.difficulty, 5);
    
    const boardText = generateTextBoard();
    const shareText = 
        `🎓 College Life Bingo Results\n` +
        `Level: ${difficultyName}\n` +
        `Score: ${stats.selectedCount}/${stats.totalCount} (${stats.completionPercentage}%)\n` +
        `${stats.hasWon ? '🎉 BINGO achieved!\n' : ''}\n` +
        `${boardText}\n` +
        `${hashtags.join(' ')}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => {
            showSuccessMessage('Board copied to clipboard! 📋');
        }).catch(err => {
            console.error('Failed to copy to clipboard:', err);
            fallbackCopyToClipboard(shareText);
        });
    } else {
        fallbackCopyToClipboard(shareText);
    }
    
    trackSharingEvent('clipboard', stats);
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showSuccessMessage('Board copied to clipboard! 📋');
    } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        showErrorMessage('Failed to copy to clipboard', document.body);
    }
    
    document.body.removeChild(textArea);
}

function generateTextBoard() {
    let board = '\n';
    
    for (let row = 0; row < 5; row++) {
        let rowText = '';
        for (let col = 0; col < 5; col++) {
            const index = row * 5 + col;
            if (index === gameConfig.centerIndex) {
                rowText += '[🎯]';
            } else if (gameState.selectedCells[index]) {
                rowText += '[✅]';
            } else {
                rowText += '[⬜]';
            }
            if (col < 4) rowText += ' ';
        }
        board += rowText + '\n';
    }
    
    return board;
}

// Initialize sharing features
document.addEventListener('DOMContentLoaded', function() {
    // Add additional sharing buttons if needed
    addAdvancedSharingOptions();
});

function addAdvancedSharingOptions() {
    // This could add more sharing options dynamically
    // For now, we'll keep it simple with the existing options
}