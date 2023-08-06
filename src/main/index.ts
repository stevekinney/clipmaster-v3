import { join } from 'node:path';
import {
  app,
  BrowserWindow,
  clipboard,
  ipcMain,
  globalShortcut,
} from 'electron';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    minWidth: 400,
    minHeight: 400,
    maxWidth: 600,
    maxHeight: 800,
    maximizable: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.webContents.openDevTools({ mode: 'detach' });

  return mainWindow;
};

app.on('ready', () => {
  globalShortcut.register('Alt+CommandOrControl+Shift+C', () => {
    const browserWindow = BrowserWindow.getFocusedWindow();
    browserWindow?.webContents.send('global-copy', clipboard.readText());
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('clipboard-read', () => {
  return clipboard.readText();
});

ipcMain.on('clipboard-write', (_, text: string) => {
  clipboard.writeText(text);
});
