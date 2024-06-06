const { app, BrowserWindow, globalShortcut, dialog, screen } = require('electron');
const path = require('path');
const fs = require('fs');
let mainWindow;

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(createWindow);
}

async function createWindow() {
  const noFullscreen = process.argv.includes('--no-fullscreen');
  const defaultCursor = process.argv.includes('--default-cursor');
  const disableCSS = process.argv.includes('--disable-css');
  const noHideCursor = process.argv.includes('--no-hide-cursor');

  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: true,
    fullscreen: !noFullscreen,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: false
    }
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL('https://pokerogue.net/');
  mainWindow.webContents.on('did-finish-load', () => {
    const cssPath = path.join(__dirname, 'styles.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    if (!disableCSS) {
      mainWindow.webContents.insertCSS(css);
      mainWindow.webContents.send('setup-mouse-move-handler', defaultCursor, noHideCursor);
    }
  });

  mainWindow.webContents.on('did-fail-load', () => {
    dialog.showErrorBox('Network Error', 'Unable to connect to Pokérogue servers.');
    app.quit();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('focus', () => {
    globalShortcut.register('CommandOrControl+Q', () => {
      app.quit();
    });

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
}