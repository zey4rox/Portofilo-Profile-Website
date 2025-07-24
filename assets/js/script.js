// ============ CONFIGURATION ============
// Matrix Rain Characters - customize the falling characters
const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

// ============ MAIN FUNCTIONS ============

// Create Matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    matrixContainer.innerHTML = '';
    
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20}px`;
        column.style.setProperty('--delay', Math.random() * 5);
        
        const length = Math.floor(Math.random() * 20) + 10;
        for (let j = 0; j < length; j++) {
            const char = document.createElement('span');
            char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
            char.style.opacity = `${1 - (j / length)}`;
            column.appendChild(char);
        }
        
        matrixContainer.appendChild(column);
    }
}

// Theme switcher function
function changeTheme(themeName) {
    document.body.className = 'theme-' + themeName;
    
    // Get currently active tab and keep it active
    const activeTab = document.querySelector('.tab-content.active').id;
    
    // Handle Matrix theme specifically
    if (themeName === 'matrix') {
        document.body.style.fontFamily = "'MatrixCode', 'Courier New', monospace";
        createMatrixRain();
        document.getElementById('matrixRain').style.display = 'block';
    } else {
        document.body.style.fontFamily = "'Segoe UI', 'Roboto', sans-serif";
        document.getElementById('matrixRain').style.display = 'none';
    }
    
    // Reopen the previously active tab without changing button states
    openTab(activeTab);
}

// Toggle theme buttons visibility
function toggleThemeButtons() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeButtons = document.querySelector('.theme-buttons');
    
    themeToggle.classList.toggle('active');
    themeButtons.classList.toggle('active');
    
    // Close when clicking outside
    if (themeButtons.classList.contains('active')) {
        document.addEventListener('click', closeThemeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeThemeMenuOnClickOutside);
    }
}

function closeThemeMenuOnClickOutside(e) {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (!themeSwitcher.contains(e.target)) {
        toggleThemeButtons();
    }
}

// Tab functionality
function openTab(tabId, event) {
    // Only proceed if this is a click event (not programmatic call)
    if (event) {
        // Hide all tab contents
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all buttons
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Show the selected tab content
        document.getElementById(tabId).classList.add('active');
        
        // Add active class to the clicked button
        event.currentTarget.classList.add('active');
    } else {
        // This is a programmatic call, just show the tab without changing buttons
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }
}

// Join button effect
function setupJoinButtonEffect(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            // Get button position and size
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Set ripple styles
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Add ripple to button
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add glow effect
            button.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        });
    }
}

// Update banner image from local folder
function updateBannerImage(imageName) {
    const banner = document.getElementById('user-banner');
    banner.style.backgroundImage = `url('assets/images/${imageName}'), var(--banner-gradient)`;
}

// Update profile picture from local folder
function updateProfilePicture(imageName) {
    const avatar = document.getElementById('user-avatar');
    avatar.src = `assets/images/${imageName}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set Skills tab as active by default
    document.getElementById('skills').classList.add('active');
    document.querySelector('.tab-btn[onclick*="skills"]').classList.add('active');
    
    // Set up join button effects
    setupJoinButtonEffect('joinButton');
    setupJoinButtonEffect('joinButton2');
    setupJoinButtonEffect('joinButton3');
    
    // Initial card animation
    const card = document.querySelector('.profile-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    // Create Matrix rain initially (hidden)
    createMatrixRain();
    document.getElementById('matrixRain').style.display = 'none';
});

// Handle window resize
window.addEventListener('resize', function() {
    if (document.body.classList.contains('theme-matrix')) {
        createMatrixRain();
    }
});