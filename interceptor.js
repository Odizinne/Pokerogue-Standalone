const setupRequestInterceptor = (mainWindow) => {
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
};

module.exports = setupRequestInterceptor;
