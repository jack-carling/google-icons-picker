const { app, Tray, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let tray = undefined;
let window = undefined;

app.dock.hide();

app.on('ready', () => {
  createTray();
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', (event) => {
    toggleWindow();

    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({ mode: 'detach' });
    }
  });
}

function getWindowPosition() {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x, y };
}

function createWindow() {
  window = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: false,
    },
  });
  window.loadFile(path.join(__dirname, 'index.html'));

  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
}

function toggleWindow() {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
}

function showWindow() {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
  window.focus();
}

ipcMain.on('close-application', () => {
  app.quit();
});
