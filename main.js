const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: false, // This is not needed for insertCSS
        }
    });

    mainWindow.loadURL('https://pokerogue.net/'); 

    mainWindow.webContents.on('did-finish-load', () => {
        const cssToInject = 'body, html { cursor: none; }';
        mainWindow.webContents.insertCSS(cssToInject);
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
