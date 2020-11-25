const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/favicon.ico',
    textAreasAreResizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
