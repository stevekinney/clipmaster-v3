import { type IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';

const Clipmaster = {
  read: async () => {
    return await ipcRenderer.invoke('clipboard-read');
  },
  write: (text: string) => {
    ipcRenderer.send('clipboard-write', text);
  },
  onCopy: (listener: (text: string) => void) => {
    const handler = (_: IpcRendererEvent, text: string) => {
      listener(text);
    };

    ipcRenderer.on('global-copy', handler);

    return () => {
      ipcRenderer.removeListener('global-copy', handler);
    };
  },
} as const;

export type Clipmaster = typeof Clipmaster;

contextBridge.exposeInMainWorld('clipmaster', Clipmaster);
