const { app, BrowserWindow, screen } = require('electron');

function createWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: 200,
    height: 200,
    x: 50,                          // position de départ : proche du bord gauche
    y: screenHeight - 220,          // proche du bas de l'écran (comme s'il marchait sur la barre des tâches)
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.setIgnoreMouseEvents(false);
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const { app, BrowserWindow, screen } = require('electron');

let win;
let direction = 1; // 1 = vers la droite, -1 = vers la gauche
const speed = 3;   // pixels déplacés à chaque tick
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
    },
  });

  win.loadFile('index.html');

  startWalking(screenWidth);
}

function startWalking(screenWidth) {
  setInterval(() => {
    const [x, y] = win.getPosition();
    let newX = x + speed * direction;

    // si on touche un bord, on inverse le sens
    if (newX <= 0 || newX + windowWidth >= screenWidth) {
      direction *= -1;
    }

    win.setPosition(newX, y);
  }, 16); // ~60 fois par seconde
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});