import { IpcRendererEvent, IpcRenderer } from 'electron';

interface ElectronAPI {
  ipcRenderer: {
    invoke(channel: string, ...args: unknown[]): Promise<unknown>;
    on(
      channel: string,
      listener: (event: IpcRendererEvent, ...args: unknown[]) => void,
    ): IpcRenderer;
    removeListener(
      channel: string,
      listener: (event: IpcRendererEvent, ...args: unknown[]) => void,
    ): IpcRenderer;
  };
  pathForFile(file: File): string;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};
