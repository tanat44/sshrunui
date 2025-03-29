// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  runShellCommand: () => ipcRenderer.invoke("runShellCommand"),
  onShellOutput: (callback: any) =>
    ipcRenderer.on("shellOutput", (_event, value) => callback(value)),
});
