const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

/* You typically listen to Node.js events by using an emitter's .on function.

+ app.on('ready', () => {
- app.whenReady().then(() => {
  createWindow()
})

However, Electron exposes app.whenReady() as a helper specifically for the ready 
event to avoid subtle pitfalls with directly listening to that event in particular. 
See electron/electron#21972 for details. */

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })