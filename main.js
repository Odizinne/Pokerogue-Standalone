const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 750,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL('https://pokerogue.net/');
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.insertCSS('body, html { cursor: none; }');
        mainWindow.setMenuBarVisibility(false);
        mainWindow.setFullScreen(true);
        mainWindow.show();
        setupMouseMoveHandler();
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function setupMouseMoveHandler() {
    mainWindow.webContents.executeJavaScript(`
        let startCursorTimer = function() {
            cursorTimeout = setTimeout(() => {
                document.body.style.cursor = 'none';
            }, 3000);
        };

        let cursorTimeout;
        document.addEventListener('mousemove', function() {
            clearTimeout(cursorTimeout);
            document.body.style.cursor = 'default';
            startCursorTimer();
        });
    `);
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
