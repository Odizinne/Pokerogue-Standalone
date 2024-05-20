const { app, BrowserWindow, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

const cursorImagePath = path.join(__dirname, 'PR_cursor.png');
const cursorImage = nativeImage.createFromPath(cursorImagePath);
const cursorDataURL = cursorImage.toDataURL();

function createWindow() {
    const noFullscreen = process.argv.includes('--no-fullscreen');
    const noHideCursor = process.argv.includes('--no-hide-cursor');
    
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 750,
        show: false,
        fullscreen: !noFullscreen,
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
        if (noHideCursor) {
            setCustomCursor();
        }
        else {
            setupMouseMoveHandler();
        }
        
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function setCustomCursor() {
    mainWindow.webContents.executeJavaScript(`
        document.body.style.cursor = 'url(${cursorDataURL}), auto';
    `);
}

function setupMouseMoveHandler() {
    mainWindow.webContents.executeJavaScript(`
        let startCursorTimer = () => {
            cursorTimeout = setTimeout(() => {
                document.body.style.cursor = 'none';
            }, 3000);
        };
        let cursorTimeout;
        document.addEventListener('mousemove', () => {
            clearTimeout(cursorTimeout);
            document.body.style.cursor = 'url(${cursorDataURL}), auto';
            startCursorTimer();
        });
    `);
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
