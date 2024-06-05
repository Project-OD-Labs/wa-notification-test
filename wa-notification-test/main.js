const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const axios = require('axios')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
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

ipcMain.on('send-message', (event, apiKey, recipient, message) => {
  axios.post('https://graph.facebook.com/v12.0/<your-business-id>/messages', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    data: {
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'text',
      text: {
        body: message,
      },
    },
  }).then(response => {
    console.log('Message sent', response.data)
  }).catch(error => {
    console.error('Error sending message', error)
  })
})