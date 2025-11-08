# 🎓 College Life Bingo

An interactive, engaging web-based bingo game that captures the quintessential college experience! From pulling all-nighters to surviving on instant ramen, this game lets students mark off relatable college moments and compete for BINGO.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://nirnit-13.github.io/College-Life-Bingo/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/nirnit-13/College-Life-Bingo)

![College Life Bingo Screenshot](screenshot.png)

## ✨ Features

### 🎮 Interactive Gameplay
- **Dynamic 5x5 Bingo Board**: Randomly generated experiences for each game
- **Three Difficulty Levels**: 
  - 🎒 Freshman Feels - First-year experiences
  - 📚 Sophomore Struggles - Mid-college challenges  
  - 👨‍🎓 Senior Syndrome - Final year memories
- **Real-time Win Detection**: Automatic detection of horizontal, vertical, and diagonal wins
- **Visual Feedback**: Smooth animations and color changes for selected cells

### 🎨 Stunning Design
- **Dual Themes**: 
  - ✨ Vibrant Energy (Light Mode)
  - 🌙 Night Owl (Dark Mode)
- **Animated Backgrounds**: Dynamic gradient animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism effects, smooth transitions, and engaging animations

### 🔊 Immersive Audio
- **Background Music**: College-themed ambient soundtrack
- **Sound Effects**: 
  - Click sounds for button interactions
  - Tile selection chimes
  - Victory fanfare for BINGO wins
  - Line completion notifications
- **Toggle Control**: Easy sound on/off button

### 📱 Social Sharing
Share your victories across multiple platforms:
- **WhatsApp**: Direct share with pre-formatted message
- **Instagram**: Screenshot guide with hashtags
- **Twitter**: One-click tweet with stats
- **Download**: Save your board as a high-quality PNG image

### 🎯 Advanced Features
- **Persistent Game State**: Continue playing after claiming victory
- **Win Celebration**: Confetti animations and special effects
- **Statistics Tracking**: Track completion percentage and play time
- **Achievement System**: Unlock achievements for milestones
- **Keyboard Navigation**: Full keyboard accessibility support
- **Floating Instructions**: Context-sensitive help guide

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or dependencies required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nirnit-13/College-Life-Bingo.git
   cd College-Life-Bingo
   ```

2. **Open the game**
   Simply open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

3. **Or use a local server** (recommended for best performance)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   Then visit `http://localhost:8000`

## 📖 How to Play

1. **Choose Your Settings**
   - Select your preferred theme (Vibrant Energy or Night Owl)
   - Pick your college stage (Freshman, Sophomore, or Senior)

2. **Mark Your Experiences**
   - Click on any college experience you've had
   - Selected cells turn red to indicate completion
   - The center "BINGO!" tile is always free

3. **Win the Game**
   - Complete 5 experiences in a row (horizontal, vertical, or diagonal)
   - The center BINGO button will flash when you have a winning line
   - Click the flashing BINGO button to claim your victory!

4. **Share Your Results**
   - Share on social media or download your board
   - Start a new game or try a different difficulty level

## 🗂️ Project Structure

```
college-life-bingo/
│
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Core styles and layout
│   ├── animations.css     # Animation definitions
│   └── responsive.css     # Responsive design rules
├── js/
│   ├── data.js           # Game data and configurations
│   ├── game.js           # Core game logic
│   ├── ui.js             # UI management and navigation
│   ├── sharing.js        # Social sharing functionality
│   └── main.js           # Application initialization
└── README.md             # This file
```

## 🎨 Customization

### Adding New Experiences

Edit `js/data.js` to add or modify college experiences:

```javascript
const collegeExperiences = {
    freshman: [
        "Your new experience here",
        // Add more experiences...
    ],
    sophomore: [
        // Add sophomore experiences...
    ],
    senior: [
        // Add senior experiences...
    ]
};
```

### Changing Themes

Modify theme colors in `js/data.js`:

```javascript
const themeConfig = {
    light: {
        colors: {
            primary: '#your-color',
            // Modify other colors...
        }
    }
};
```

### Adjusting Difficulty Levels

Configure difficulty settings in `js/data.js`:

```javascript
const difficultyConfig = {
    yourLevel: {
        name: 'Your Level Name',
        description: 'Description here',
        icon: '🎯',
        color: '#hexcolor'
    }
};
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and transitions
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Web Audio API**: Custom sound generation
- **Canvas API**: Board export functionality
- **LocalStorage**: Session persistence (in-memory fallback)

## 🌟 Key Highlights

- **Zero Dependencies**: Pure vanilla JavaScript - no libraries or frameworks
- **Lightweight**: Fast loading and smooth performance
- **Offline Capable**: Works without internet after initial load
- **Accessible**: Keyboard navigation and screen reader support
- **Mobile-First**: Responsive design for all devices
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add more college experiences for each difficulty level
- Create additional themes
- Improve accessibility features
- Add new sound effects
- Translate to other languages
- Add new sharing platforms

## 🐛 Known Issues

- Background music autoplay may be blocked by some browsers (user interaction required)
- Canvas download may not work on very old mobile browsers
- Some animations may be reduced on low-performance devices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the universal college student experience
- Sound effects generated using Web Audio API
- Design influenced by modern glassmorphism trends
- Special thanks to all college students who made these experiences relatable!

## 📧 Contact

Nirnit - [@nirnit-13](https://github.com/nirnit-13)

Project Link: [https://github.com/nirnit-13/College-Life-Bingo](https://github.com/nirnit-13/College-Life-Bingo)

Live Demo: [https://nirnit-13.github.io/College-Life-Bingo/](https://nirnit-13.github.io/College-Life-Bingo/)

---

<p align="center">Made with ❤️ for college students everywhere</p>
<p align="center">⭐ Star this repo if you relate to the college struggle! ⭐</p>