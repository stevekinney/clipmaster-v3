import { join } from 'node:path';
import {
  app,
  BrowserWindow,
  clipboard,
  ipcMain,
  globalShortcut,
  Notification,
  Tray,
  Menu,
} from 'electron';
import Positioner from 'electron-positioner';

let tray: Tray | null = null;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    minHeight: 400,
    minWidth: 300,
    maxHeight: 800,
    maxWidth: 450,
    maximizable: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    show: false,
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

  return mainWindow;
};

app.on('ready', () => {
  const browserWindow = createWindow();
  tray = new Tray('./src/icons/trayTemplate.png');
  tray.setIgnoreDoubleClickEvents(true);

  const positioner = new Positioner(browserWindow);

  tray.on('click', () => {
    if (!tray) return;

    if (browserWindow.isVisible()) {
      return browserWindow.hide();
    }

    const trayPosition = positioner.calculate('trayCenter', tray.getBounds());

    browserWindow.setPosition(trayPosition.x, trayPosition.y, false);
    browserWindow.show();
  });

  globalShortcut.register('CommandOrControl+Shift+Alt+C', () => {
    app.focus();
    browserWindow.show();
    browserWindow.focus();
  });

  globalShortcut.register('CommandOrControl+Shift+Alt+X', () => {
    let content = clipboard.readText();
    content = content.toUpperCase();
    clipboard.writeText(content);
    new Notification({
      title: 'Capitlized Clipboard',
      subtitle: 'Copied to clipboard',
      body: content,
    }).show();
  });
});

app.on('quit', () => {
  globalShortcut.unregisterAll();
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

ipcMain.on('write-to-clipboard', (_, content: string) => {
  clipboard.writeText(content);
});

ipcMain.handle('read-from-clipboard', (_) => {
  return clipboard.readText();
});
