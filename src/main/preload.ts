import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  resizeWindow: (dimensions: { width: number; height: number }) => {
    ipcRenderer.send('resize-window', dimensions);
  },
});
