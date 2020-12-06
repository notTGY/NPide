const {app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const os = require('os');
const icon = __dirname + '\\favicon.ico';


let mainMenu;

function createWindow () {
  mainWindow = new BrowserWindow({
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


  /*
  const pty = require('node-pty');

  const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.cwd(),
    env: process.env
  });

  ptyProcess.on("data", data=>{mainWindow.webContents.send("terminal.incData", data)});

  ipcMain.on("terminal.toTerm", (e, data) => {
      ptyProcess.write(data);
  });

  /**/





  //mainWindow.setMenuBarVisibility(false);

  data = process.argv[1];

  mainWindow.loadFile('index.html', {query: {"data": escape(data)}})

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.maximize();
}



app.whenReady().then(() => {
  createWindow()


  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New File   (Ctrl + N)',
        click() {
          mainWindow.webContents.send("menu.newFile", 1);
        }
      },
      {
        label: 'Open File   (Ctrl + O)',
        click() {
          mainWindow.webContents.send("menu.openFile", 1);
        }
      },
      {
        label: 'Save File   (Ctrl + S)',
        click() {
          mainWindow.webContents.send("menu.saveFile", 1);
        }
      },
      {
        label: 'Save as',
        click() {
          mainWindow.webContents.send("menu.saveAsFile", 1);
        }
      }
    ]
  },
  {
    label: 'Screens',
    submenu: [
      {
        label: 'Toggle Terminal    (Ctrl + Alt + T)',
        click() {
          mainWindow.webContents.send("menu.toggleTerminal", 1);
        }
      }/*,
      {
        label: 'Switch to second screen    (Ctrl + 2)',
        click() {
          mainWindow.webContents.send("menu.screenSwitchToSecond", 1);
        }
      },
      {
        label: 'Close second screen   (Ctrl + 1)',
        click() {
          mainWindow.webContents.send("menu.screenTurnOff", 1);
        }
      }*/
    ]
  },
  {
    label: 'Internet',
    submenu: [
      {
        label: 'Connect to session   (Ctrl + Alt + D)',
        click() {
          mainWindow.webContents.send("menu.connectToSession", 1);
        }
      }
    ]
  },
  {
    label: 'Language',
    submenu: [
      {
        label: 'Change language   (Ctrl + Alt + L)',
        click() {
          mainWindow.webContents.send("menu.switchLanguage", 1);
        }
      }
    ]
  },
  {
    label: 'Autocompletion',
    submenu: [
      {
        label: 'Toggle Autocompletion',
        click() {
          mainWindow.webContents.send("menu.toggleAutocompletion", 1);
        }
      }
    ]
  },
  {
    label: 'Music',
    submenu: [
      {
        label: 'ICPC',
        click() {
          mainWindow.webContents.send("menu.startICPC", 1);
        }
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Open Help Page   (Ctrl + Alt + H)',
        click() {
          mainWindow.webContents.send("menu.openHelpPage", 1);
        }
      }
    ]
  },
  {
    label: 'devTools',
    click() {
      mainWindow.webContents.openDevTools()
    }
  }
];
