document.getElementById('simulateBtn').addEventListener('click', simulateTracking);
document.getElementById('addUserBtn').addEventListener('click', addUser);

const map = document.getElementById('map');
const signalStrengthDisplay = document.getElementById('signalStrength');

// Function to create a moving point
function createMovingPoint(color = 'red') {
    let point = document.createElement('div');
    point.classList.add('point');
    point.style.backgroundColor = color;
    map.appendChild(point);

    let x = Math.random() * (map.clientWidth - 15);
    let y = Math.random() * (map.clientHeight - 15);

    let interval = setInterval(() => {
        x += (Math.random() - 0.5) * 20;
        y += (Math.random() - 0.5) * 20;

        // Keep the point within map boundaries
        x = Math.max(0, Math.min(x, map.clientWidth - 15));
        y = Math.max(0, Math.min(y, map.clientHeight - 15));

        point.style.left = `${x}px`;
        point.style.top = `${y}px`;

        updateSignalStrength(x, y);

    }, 100);
}

// Function to simulate tracking with one point
function simulateTracking() {
    clearMap();
    createMovingPoint();
    generateInterference();
}

// Function to add another user (point)
function addUser() {
    createMovingPoint(getRandomColor());
}

// Function to generate interference points
function generateInterference() {
    for (let i = 0; i < 5; i++) {
        let interference = document.createElement('div');
        interference.classList.add('interference');
        interference.style.left = `${Math.random() * (map.clientWidth - 30)}px`;
        interference.style.top = `${Math.random() * (map.clientHeight - 30)}px`;
        map.appendChild(interference);
    }
}

// Function to update signal strength based on position
function updateSignalStrength(x, y) {
    let centerX = map.clientWidth / 2;
    let centerY = map.clientHeight / 2;
    let distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    let strength = Math.max(0, 100 - Math.round(distance / 5));
    signalStrengthDisplay.textContent = `Signal Strength: ${strength}%`;
}

// Function to clear the map
function clearMap() {
    map.innerHTML = '';
    signalStrengthDisplay.textContent = 'Signal Strength: N/A';
}

// Function to get a random color
function getRandomColor() {
    const colors = ['blue', 'green', 'purple', 'orange', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
}
