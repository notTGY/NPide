const {app, BrowserWindow} = require('electron');
const path = require('path');


function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: __dirname + '/favicon.ico',
    textAreasAreResizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.setMenuBarVisibility(false);

  data = process.argv[1];

  mainWindow.loadFile('index.html', {query: {"data": data}})
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
