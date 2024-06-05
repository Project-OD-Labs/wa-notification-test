const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  sendMessage: (apiKey, recipient, message) => ipcRenderer.send('send-message', apiKey, recipient, message),
  scheduleMessage: (apiKey, recipient, message, schedule) => ipcRenderer.send('schedule-message', apiKey, recipient, message, schedule)
})