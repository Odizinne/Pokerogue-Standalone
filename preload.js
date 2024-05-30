const { ipcRenderer } = require('electron');
const { setupMouseMoveHandler } = require('./cursor.js');

ipcRenderer.on('setup-mouse-move-handler', (event, defaultCursor, noHideCursor) => {
    setupMouseMoveHandler(defaultCursor, noHideCursor);
});
