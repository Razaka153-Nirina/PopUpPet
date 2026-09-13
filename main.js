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