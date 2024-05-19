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
        mainWindow.webContents.insertCSS(`
            body, html {
                cursor: none;
            }
            #app {
                background: black;
            }
        `);

        // Inject JavaScript to align the container
        mainWindow.webContents.executeJavaScript(`
            const appContainer = document.getElementById('app');
            if (appContainer) {
                appContainer.style.display = 'flex';
                appContainer.style.justifyContent = 'center';
                appContainer.style.alignItems = 'center';
            }
        `);

        mainWindow.setMenuBarVisibility(false);
        setupMouseMoveHandler();
        setupRequestInterceptor();
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

function setupRequestInterceptor() {
    const webContents = mainWindow.webContents;

    try {
        webContents.debugger.attach('1.3');
    } catch (err) {
        console.error('Debugger attach failed:', err);
    }

    webContents.debugger.on('message', (event, method, params) => {
        if (method === 'Network.responseReceived') {
            const { response } = params;
            if (response.url.includes('.mp4')) {
                mainWindow.setFullScreen(true);
                mainWindow.show();
                webContents.debugger.detach();
            }
        }
    });

    webContents.debugger.sendCommand('Network.enable');
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
