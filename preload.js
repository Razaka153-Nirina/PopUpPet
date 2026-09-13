const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onDirectionChange: (callback) => {
    ipcRenderer.on('direction-change', (_event, direction) => callback(direction));
  },
});