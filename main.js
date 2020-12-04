const {app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const icon = __dirname + '\\favicon.ico';

/*const pty = require('node-pty');

const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 24,
  cwd: process.cwd(),
  env: process.env
});*/


function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: icon,
    textAreasAreResizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })


  /*ptyProcess.on("data", data=>{mainWindow.webContents.send("terminal.incData", data)});

  ipcMain.on("terminal.toTerm", (e, data) => {
      ptyProcess.write(data);
  });*/


  mainWindow.setMenuBarVisibility(false);

  data = process.argv[1];

  mainWindow.loadFile('index.html', {query: {"data": escape(data)}})
}



app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
