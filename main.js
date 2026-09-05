const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false,        // pas de barre de titre ni de bordure
    transparent: true,   // fond transparent (on ne voit que le chat)
    alwaysOnTop: true,   // toujours au-dessus des autres fenêtres
    skipTaskbar: true,   // n'apparaît pas dans la barre des tâches
    hasShadow: false,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.setIgnoreMouseEvents(false); // on garde les clics actifs pour l'instant
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});