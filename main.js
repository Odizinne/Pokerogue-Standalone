const { app, BrowserWindow, globalShortcut, dialog, screen } = require('electron');
const path = require('path');
const fs = require('fs');
const setupRequestInterceptor = require('./interceptor');

let mainWindow;

const COMMAND_LINE_ARGS = {
  NO_FULLSCREEN: '--no-fullscreen',
  DEFAULT_CURSOR: '--default-cursor',
  DISABLE_CSS: '--disable-css',
  NO_HIDE_CURSOR: '--no-hide-cursor'
};

function parseCommandLineArgs() {
  return {
    noFullscreen: process.argv.includes(COMMAND_LINE_ARGS.NO_FULLSCREEN),
    defaultCursor: process.argv.includes(COMMAND_LINE_ARGS.DEFAULT_CURSOR),
    disableCSS: process.argv.includes(COMMAND_LINE_ARGS.DISABLE_CSS),
    noHideCursor: process.argv.includes(COMMAND_LINE_ARGS.NO_HIDE_CURSOR)
  };
}

async function createWindow({ noFullscreen, defaultCursor, disableCSS, noHideCursor }) {
  const { width, height } = screen.getPrimaryDisplay().size;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: false
    }
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL('https://pokerogue.net/');
  mainWindow.webContents.on('did-finish-load', async  () => {
    const cssPath = path.join(__dirname, 'styles.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    if (!disableCSS) {
      mainWindow.webContents.insertCSS(css);
    }
    await setupRequestInterceptor(mainWindow);
    mainWindow.webContents.send('setup-mouse-move-handler', defaultCursor, noHideCursor);
    mainWindow.setFullScreen(!noFullscreen);
    mainWindow.show();
  });

  mainWindow.webContents.on('did-finish-load',  () => {
    mainWindow.webContents.send('setup-mouse-move-handler', defaultCursor, noHideCursor);
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

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    const cmdArgs = parseCommandLineArgs();
    createWindow(cmdArgs);
  });
}
