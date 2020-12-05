ipc.on("menu.newFile", (e, data) => {
  if (data) {
    saveCurrentFile();
    add_new_file();
  }
});

ipc.on("menu.openFile", (e, data) => {
  if (data) {
    dialog.showOpenDialog({}).then(e=>{
      sourcePath = e.filePaths[0];
      folderPath = path.dirname(sourcePath);
      if (e.filePaths.length > 1) {
        e.filePaths = e.filePaths.map(a=>({val:a.filePaths[0], depth:0}));
        showFiles(e.filePaths);
      } else {
        folderPath = path.dirname(sourcePath);
        fs.readdir(folderPath, 'utf8', (err,data)=>{
          filesOpened = data;
          data = data.map(a=>({val:path.join(folderPath, a), depth:0}));
          showFiles(data);
        });
      }
      folderPath = path.dirname(sourcePath);
      fs.readdir(folderPath, 'utf8', (err,data)=>{
        filesOpened = data;
      });
      currentFilePath = path.basename(sourcePath);
      fs.readFile(sourcePath, 'utf-8', async (err, data) => {
        if (err) {
            throw err;
        }
        tarea.setValue(data);
        putFile(sourcePath);
      });
    });
  }
});

ipc.on("menu.saveFile", (e, data) => {
  if (data) {
    saveCurrentFile();
  }
});

ipc.on("menu.saveAsFile", (e, data) => {
  if (data) {
    dialog.showSaveDialog({}).then(e=>{
      fs.writeFile(e.filePath, tarea.getValue(),'utf8',e=>console.log(e));
    });
  }
});

ipc.on("menu.openHelpPage", (e, data) => {
  if (data) {
    if (!isHelpMenu) {
      startHelpMenu();
    } else {
      let but = document.getElementById('help_but_id');
      let div = document.getElementById('help_div_id');
      but.remove();
      div.remove();
      isHelpMenu = 0;
      tarea.focus();
    }
  }
});

ipc.on("menu.connectToSession", (e, data) => {
  if (data) {
    if (!isSessionDb) {
      connectToDb();
    } else {
      let inp = document.getElementById('session_inp_id');
      let div = document.getElementById('session_div_id');
      inp.remove();
      div.remove();
      isSessionDb = 0;
      tarea.autofocus = true;
      tarea.focus();
    }
  }
});

ipc.on("menu.screenSwitchToSecond", (e, data) => {
  if (data) {
    saveCurrentFile();
    if (styleSecond.opacity == 0) {
      styleSecond.opacity = 1;
      setTimeout(_=>{onresize();}, 0);
      areBothShown = 1;
    }
    currentTarea = 2;
    hotSwap();
  }
});

ipc.on("menu.screenTurnOff", (e, data) => {
  if (data) {
    currentTarea = 1;
    setTimeout(_=>{onresize();}, 0);
    areBothShown = 0;
    styleSecond.opacity = 0;
  }
});

ipc.on("menu.toggleTerminal", (e, data) => {
  if (data) {
    startTerminal();
  }
});

ipc.on("menu.switchLanguage", (e, data) => {
  if (data) {
    if (!isLanguageMenu) {
      startLanguageMenu();
    } else {
      let div = document.getElementById('language_div_id');
      div.remove();
      isLanguageMenu = 0;
      tarea.focus();
    }
  }
});

ipc.on("menu.toggleAutocompletion", (e, data) => {
  if (data) {
    if(areWeAutocompleting) {
      areWeAutocompleting = 0;
    } else {
      areWeAutocompleting = 1;
    }
    window.localStorage.setItem('autocompletion', areWeAutocompleting)
  }
});

ipc.on("menu.startICPC", (e, data) => {
  if (data) {
    if(!icpcMusicElem.paused) {
      icpcMusicElem.pause();
    } else {
      icpcMusicElem.play();
    }
  }
});
