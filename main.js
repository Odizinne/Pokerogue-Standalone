const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const setupRequestInterceptor = require('./interceptor');

let mainWindow;

function createWindow() {
    const noFullscreen = process.argv.includes('--no-fullscreen');
    const noHideCursor = process.argv.includes('--no-hide-cursor');
    const defaultCursor = process.argv.includes('--default-cursor');

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 750,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL('https://pokerogue.net/');
    mainWindow.webContents.on('did-finish-load', () => {
        const cssPath = path.join(__dirname, 'styles.css');
        const css = fs.readFileSync(cssPath, 'utf-8');
        mainWindow.webContents.insertCSS(css);
        if (!defaultCursor) {
            mainWindow.webContents.send('setup-mouse-move-handler');
        } 
        if (!noFullscreen) {
            setupRequestInterceptor(mainWindow);
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('focus', () => {
        mainWindow.webContents.on('before-input-event', (event, input) => {
            if (input.type === 'keyDown') {
                if (input.key === 'F11') {
                    event.preventDefault();
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                } else if (input.key === 'F5') {
                    event.preventDefault();
                    mainWindow.reload();
                }
            }
        });
    });

    mainWindow.on('blur', () => {
        mainWindow.webContents.removeAllListeners('before-input-event');
    });
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
