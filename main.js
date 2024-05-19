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
                margin: 0;
                padding: 0;
                overflow: hidden; /* Prevent scrollbar */
                width: 100%;
                height: 100%;
            }
            #app {
                background: black;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh; /* Full height viewport */
                width: 100vw; /* Full width viewport */
                overflow: hidden; /* Prevent scrollbar */
            }
        `);

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
        //setupRequestInterceptor();
        mainWindow.setFullScreen(true);
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
