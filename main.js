const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let win;
let direction = 1;
const speed = 3;
const windowWidth = 200;

function createWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: windowWidth,
    height: 200,
    x: 50,
    y: screenHeight - 220,
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
      win.webContents.send('direction-change', direction); // on prévient index.html
    }

    win.setPosition(newX, y);
  }, 16);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});