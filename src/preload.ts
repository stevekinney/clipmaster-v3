import { contextBridge, ipcRenderer } from 'electron';

const Clipmaster = {
  read: async () => {
    return await ipcRenderer.invoke('clipboard-read');
  },
  write: (text: string) => {
    ipcRenderer.send('clipboard-write', text);
  },
} as const;

export type Clipmaster = typeof Clipmaster;

contextBridge.exposeInMainWorld('clipmaster', Clipmaster);
