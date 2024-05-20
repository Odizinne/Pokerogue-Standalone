const { contextBridge, ipcRenderer } = require('electron');
const { setCustomCursor, setupMouseMoveHandler } = require('./cursor.js');

// Expose methods to the renderer process
contextBridge.exposeInMainWorld('electron', {
    setCustomCursor: () => ipcRenderer.send('set-custom-cursor'),
    setupMouseMoveHandler: () => ipcRenderer.send('setup-mouse-move-handler')
});

ipcRenderer.on('set-custom-cursor', () => {
    setCustomCursor();
});

ipcRenderer.on('setup-mouse-move-handler', () => {
    setupMouseMoveHandler();
});
