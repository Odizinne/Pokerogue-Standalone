const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 750,
        show: false,
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL('https://pokerogue.net/');
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.insertCSS(`
            body, html {
                cursor: none;
                overflow: hidden;
            }
            #app {
                background: black;
                align-items: center;
            }
        `);
        setupMouseMoveHandler();
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function setupMouseMoveHandler() {
    const hideMouseCursorPath = path.join(__dirname, 'hideMouseCursor.js');
    const hideMouseCursor = fs.readFileSync(hideMouseCursorPath, 'utf8');
    mainWindow.webContents.executeJavaScript(hideMouseCursor);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
