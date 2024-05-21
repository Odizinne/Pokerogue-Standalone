const { contextBridge, ipcRenderer } = require('electron');
const { setupMouseMoveHandler } = require('./cursor.js');

contextBridge.exposeInMainWorld('electron', {
    setupMouseMoveHandler: () => ipcRenderer.send('setup-mouse-move-handler')
});

ipcRenderer.on('setup-mouse-move-handler', () => {
    setupMouseMoveHandler();
});
