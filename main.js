const { app, BrowserWindow } = require('electron');

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
    mainWindow.webContents.executeJavaScript(`
        let cursorTimeout;
        function startCursorTimer() {
            cursorTimeout = setTimeout(() => {
                document.body.style.cursor = 'none';
            }, 3000);
        }

        document.addEventListener('mousemove', () => {
            clearTimeout(cursorTimeout);
            document.body.style.cursor = 'default';
            startCursorTimer();
        });

        startCursorTimer();
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
