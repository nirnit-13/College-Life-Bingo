// College Life Tasks Database - Organized by Difficulty
const collegeExperiences = {
    freshman: [
        "Attended college orientation", "Got lost finding classrooms", "Ate dining hall food", 
        "Made your first college friend", "Stayed up past 2 AM studying", "Joined a student club",
        "Did laundry for the first time", "Called home feeling homesick", "Procrastinated on assignment",
        "Survived on instant ramen", "Had roommate drama", "Attended campus event",
        "Forgot important deadline", "Made friends in dorm hallway", "Got locked out of room",
        "Pulled your first all-nighter", "Overslept and missed class", "Used student ID discount",
        "Went to professor's office hours", "Stressed about first midterms", "Celebrated end of finals",
        "Found favorite study spot", "Complained about cafeteria food", "Joined study group",
        "Had awkward elevator encounters", "Learned campus shortcuts", "Attended dorm floor meetings",
        "Used campus Wi-Fi everywhere", "Bought overpriced textbooks", "Made friends at orientation",
        "Had first college party", "Struggled with meal plan", "Called parents for advice",
        "Had first college crush", "Joined intramural sports", "Attended campus tours as student",
        "Used campus gym", "Had dining hall worker friendship", "Attended freshman seminars",
        "Made mistakes with class schedule", "Had first college hangover", "Learned time management",
        "Used campus shuttle bus", "Had first college heartbreak", "Joined campus organizations fair",
        "Attended welcome week events", "Had first college interview", "Made lifelong freshman friends"
    ],
    sophomore: [
        "Changed majors or considered it", "Moved to apartment/house", "Got first internship",
        "Took random elective class", "Became club officer", "Mentored freshman student",
        "Got part-time job", "Learned to cook actual meals", "Lived entirely on coffee",
        "Had designated library spot", "Pulled multiple all-nighters weekly", "Used library during finals",
        "Asked professor for recommendation", "Attended career networking fair", "Considered studying abroad",
        "Had relationship college drama", "Actually managed time well", "Questioned life choices completely",
        "Became teaching assistant", "Connected with alumni mentor", "Worked unpaid internship",
        "Shared apartment with friends", "Had car on campus", "Started research project",
        "Declared your major officially", "Had advisor meetings", "Applied for scholarships",
        "Joined professional organizations", "Attended conferences", "Had meaningful professor relationships",
        "Started building resume", "Had existential major crisis", "Took leadership roles",
        "Managed work-study balance", "Had apartment hunting stress", "Learned about student loans",
        "Had serious relationship talks", "Planned summer experiences", "Built academic portfolio",
        "Had major project presentations", "Networked with industry professionals", "Considered graduate school",
        "Had internship interviews", "Managed multiple commitments", "Started career planning",
        "Had real adult responsibilities", "Made important life decisions", "Built lasting friendships"
    ],
    senior: [
        "Applied for post-grad jobs", "Worked on thesis project", "Felt nostalgic about graduating",
        "Regularly mentored underclassmen", "Had quarter-life crisis", "Made senior year bucket list",
        "Networked at professional events", "Went through job interviews", "Counted graduation days",
        "Experienced major imposter syndrome", "Had 'last time' moments", "Worried about student debt",
        "Made detailed post-graduation plans", "Built relationships with professors", "Led major research",
        "Organized campus-wide initiative", "Participated in senior traditions", "Applied for prestigious scholarships",
        "Took on real responsibilities", "Realized college ending soon", "Made lifelong professional connections",
        "Had career-defining internship", "Prepared for adult world", "Created lasting campus impact",
        "Applied to graduate programs", "Had senior capstone project", "Attended senior networking events",
        "Had existential career anxiety", "Made peace with college ending", "Planned post-grad life",
        "Had serious job offer decisions", "Felt pressure about future", "Had meaningful thesis defense",
        "Organized senior class events", "Had graduation photo sessions", "Applied for competitive programs",
        "Had real-world preparation anxiety", "Made adult financial decisions", "Had career counseling sessions",
        "Attended senior leadership retreats", "Had industry professional interviews", "Made legacy projects",
        "Had meaningful goodbyes", "Planned reunion commitments", "Had adult relationship decisions",
        "Made career pivot decisions", "Had real-world skill assessments", "Created professional portfolios",
        "Had meaningful campus contributions", "Made lasting professor relationships", "Had graduation speech preparations"
    ]
};

// Theme Configuration
const themeConfig = {
    light: {
        name: 'Vibrant Energy',
        colors: {
            primary: '#ff6b6b',
            secondary: '#4ecdc4',
            accent: '#45b7d1',
            success: '#96ceb4',
            warning: '#feca57'
        }
    },
    dark: {
        name: 'Night Owl',
        colors: {
            primary: '#2c3e50',
            secondary: '#34495e',
            accent: '#5f27cd',
            success: '#4a6741',
            warning: '#341f97'
        }
    }
};

// Difficulty Configuration
const difficultyConfig = {
    freshman: {
        name: 'Freshman Feels',
        description: 'Those awkward first-year moments we all remember',
        icon: '🎒',
        color: '#ff6b6b'
    },
    sophomore: {
        name: 'Sophomore Struggles',
        description: 'The middle years where everything gets real',
        icon: '📚',
        color: '#4ecdc4'
    },
    senior: {
        name: 'Senior Syndrome',
        description: 'The final stretch with all the adult anxiety',
        icon: '👨‍🎓',
        color: '#45b7d1'
    }
};

// Social Media Configuration
const socialConfig = {
    whatsapp: {
        name: 'WhatsApp',
        icon: '📱',
        color: '#25D366',
        baseUrl: 'https://wa.me/?text='
    },
    instagram: {
        name: 'Instagram',
        icon: '📸',
        gradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
        instructions: true
    },
    twitter: {
        name: 'Twitter',
        icon: '🐦',
        color: '#1DA1F2',
        baseUrl: 'https://twitter.com/intent/tweet?text='
    }
};

// Game Configuration
const gameConfig = {
    boardSize: 5,
    totalCells: 25,
    centerIndex: 12,
    tasksPerDifficulty: 24,
    
    messages: {
        welcome: {
            title: 'College Life Bingo',
            subtitle: 'The Ultimate Student Experience Game',
            description: 'From surviving on instant ramen to pulling legendary all-nighters - we\'ve captured every moment that defines the real college journey!'
        },
        victory: {
            title: 'BINGO ACHIEVED!',
            message: 'Congratulations! You\'ve successfully experienced the true essence of college life! Your bingo board tells the story of your incredible journey through academia.'
        },
        instructions: {
            title: 'How to Play College Life Bingo!',
            steps: [
                '1. Click on experiences you\'ve had in college',
                '2. Try to complete a full row, column, or diagonal',
                '3. When you have a winning line, the center BINGO button will flash',
                '4. Click the BINGO button to claim your victory!',
                '5. Share your completed board with friends',
                '',
                'The center tile is always considered "free" - it counts toward any line!'
            ]
        }
    },
    
    hashtags: {
        general: ['#CollegeLifeBingo', '#StudentLife', '#CollegeMemories'],
        specific: {
            freshman: ['#FreshmanLife', '#FirstYear', '#CollegeFreshman'],
            sophomore: ['#SophomoreStruggles', '#MiddleYears', '#CollegeSophomore'], 
            senior: ['#SeniorYear', '#GraduationBound', '#CollegeSenior']
        }
    }
};

// Utility Functions for Data Access
function getExperiencesForDifficulty(difficulty) {
    return collegeExperiences[difficulty] || collegeExperiences.freshman;
}

function getDifficultyInfo(difficulty) {
    return difficultyConfig[difficulty] || difficultyConfig.freshman;
}

function getThemeInfo(theme) {
    return themeConfig[theme] || themeConfig.light;
}

function getRandomExperiences(difficulty, count = 24) {
    const experiences = [...getExperiencesForDifficulty(difficulty)];
    return shuffleArray(experiences).slice(0, count);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled;
}