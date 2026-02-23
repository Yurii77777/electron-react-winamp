import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Squirrel from 'electron-squirrel-startup';

import {
  BASE_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  SCALE_FACTOR,
} from '../renderer/constants/common.constants';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (Squirrel) {
  app.quit();
}

if (process.platform === 'darwin' && process.arch === 'x64') {
  app.disableHardwareAcceleration();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: Math.round(BASE_WINDOW_WIDTH * SCALE_FACTOR),
    height: Math.round(MIN_WINDOW_HEIGHT * SCALE_FACTOR),
    minWidth: Math.round(MIN_WINDOW_WIDTH * SCALE_FACTOR),
    minHeight: Math.round(MIN_WINDOW_HEIGHT * SCALE_FACTOR),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // for displaying local images by absolute path
      webSecurity: false,
      contextIsolation: true,
      nodeIntegration: false,
      zoomFactor: SCALE_FACTOR,
    },
  });

  // hide application menu
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine) => {
      // someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
  }
};

ipcMain.on('resize-window', (event, { width, height }) => {
  if (mainWindow) {
    mainWindow.setContentSize(
      Math.round(width * SCALE_FACTOR),
      Math.round(height * SCALE_FACTOR),
    );
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
