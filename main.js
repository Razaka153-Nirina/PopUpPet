const { app, BrowserWindow, screen } = require('electron');

let win;
let direction = 1;          // 1 = droite, -1 = gauche
const speed = 3;            // pixels par tick
const windowWidth = 200;
const windowHeight = 200;

function createWindow() {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: 50,
    y: screenHeight - windowHeight - 20, // marche sur la barre des tâches
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');
  startWalking(screenWidth);
}

function startWalking(screenWidth) {
  setInterval(() => {
    if (!win || win.isDestroyed()) return;

    const [x, y] = win.getPosition();
    let newX = x + speed * direction;

    // Inverser le sens aux bords
    if (newX <= 0) {
      newX = 0;
      direction = 1;
    } else if (newX + windowWidth >= screenWidth) {
      newX = screenWidth - windowWidth;
      direction = -1;
    }

    win.setPosition(newX, y);
  }, 16);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});