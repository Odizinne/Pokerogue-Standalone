// This file is a workaround for Pokerogue issue #1213.
// It will be removed when not needed anymore.

const setupRequestInterceptor = (mainWindow) => {
    return new Promise((resolve, reject) => {
        const webContents = mainWindow.webContents;

        try {
            webContents.debugger.attach('1.3');
        } catch (err) {
            console.error('Debugger attach failed:', err);
            return reject(err);
        }

        webContents.debugger.on('message', (event, method, params) => {
            if (method === 'Network.responseReceived') {
                const { response } = params;
                if (response.url.includes('.mp4')) {
                    webContents.debugger.detach();
                    resolve();
                }
            }
        });

        webContents.debugger.sendCommand('Network.enable', (error) => {
            if (error) {
                reject(error);
            }
        });
    });
};

module.exports = setupRequestInterceptor;
