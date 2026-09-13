const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let win;
let direction = 1;
const speed = 2;
const windowWidth = 200;
const windowHeight = 340; // 200 pour le chat + 140 pour la bulle au-dessus

function createWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: 50,
    y: screenHeight - windowHeight - 20, // garde le chat au même endroit visuellement (20px du bas)
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
  startWalking(screenWidth);
}

function startWalking(screenWidth) {
  setInterval(() => {
    const [x, y] = win.getPosition();
    let newX = x + speed * direction;

    if (newX <= 0 || newX + windowWidth >= screenWidth) {
      direction *= -1;
      win.webContents.send('direction-change', direction);
    }

    win.setPosition(newX, y);
  }, 16);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});