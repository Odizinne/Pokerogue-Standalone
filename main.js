const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

function createWindow() {
    const noFullscreen = process.argv.includes('--no-fullscreen');
    const noHideCursor = process.argv.includes('--no-hide-cursor');
    
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 750,
        show: false,
        fullscreen: !noFullscreen, // set fullscreen based on the argument
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL('https://pokerogue.net/');
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.insertCSS(`
            body, html {
                overflow: hidden;
            }
            #app {
                background: black;
                align-items: center;
            }
        `);
        if (!noHideCursor) {
            mainWindow.webContents.insertCSS(`
            body, html {
                cursor: none;
            }
        `);
            setupMouseMoveHandler();
        }
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
