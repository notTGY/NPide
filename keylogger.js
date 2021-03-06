function handleKeydown(e) {
  if (e.key != "Control" && e.key != "Alt" && e.key != "Escape" && e.key != "ArrowUp" && e.key != "ArrowDown") {
    if (e.key != "ArrowRight" && e.key != "ArrowLeft" && e.key != "CapsLock" && e.key != "PageDown" && e.key != "PageUp") {
      if (e.key != "End" && e.key != "Home" && e.key != "Insert" && e.key != "NumLock" && e.key != "Meta" && e.key != "PrintScreen") {
        if (e.key != "F1" && e.key != "F2" && e.key != "F3" && e.key != "F4" && e.key != "F5" && e.key != "F6" && e.key != "F6") {
          if (e.key != "F7" && e.key != "F8" && e.key != "F9" && e.key != "F10" && e.key != "F11" && e.key != "F12") {
            iWasEditing = 1;
            isProgressSaved = 0;
            changeLineStyle(isProgressSaved);
          }
        }
      }
    }
  }

  if (e.key == 'Enter') {
    onresize();
  }


  if (e.key == "Control") {
    isCtrl = 1;
  } else if (e.key == "Shift") {
    isShift = 1;
  } else if (e.key == "Alt") {
    isAlt = 1;
  } else if (e.key == "s" && isCtrl) {
    isCtrl = 0;
    if (areWeInNativeApp) {
      saveCurrentFile();
    }
  } else if (e.key == 'n' && isCtrl) {
    isCtrl = 0;
    if (areWeInNativeApp) {
      saveCurrentFile();
      add_new_file();
    }
  } else if (e.key == "o" && isCtrl) {
    isCtrl = 0;
    if (areWeInNativeApp) {
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
  } else if (e.key == "g" && isCtrl) {
    isCtrl = 0;
    if (areWeInNativeApp) {
      if (!isNodesFocused) {
        focusFile(currentFilePath);
        bluringTA.focus();
        isNodesFocused = 1;
        tarea.autofocus = false;
      } else {
        removeFocus();
        nodeFocusNumber = undefined;
        tarea.autofocus = true;
        tarea.focus();
        isNodesFocused = 0;
      }
    }
  } else if (e.key == "d" && isCtrl && isAlt) {
    isAlt = 0;
    isCtrl = 0;
    if (areWeInNativeApp) {
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
  } else if (e.key == "h" && isCtrl && isAlt) {
    isAlt = 0;
    isCtrl = 0;
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
  } else if (e.key == "l" && isCtrl && isAlt) {
    isAlt = 0;
    isCtrl = 0;
    if (!isLanguageMenu) {
      startLanguageMenu();
    } else {
      let div = document.getElementById('language_div_id');
      div.remove();
      isLanguageMenu = 0;
      tarea.focus();
    }
  } else if (e.key == "t" && isCtrl) {
    isCtrl = 0;
    if (areWeInNativeApp) {
      startTerminal();
    }
  } else if (e.key == 'Tab' && isCtrl) {
    isCtrl = 0;
    goToNext();
  }

  if (isNodesFocused) {
    if (e.key == 'ArrowUp') {
      let {elem} = showPrevious();
      console.log(mainTreeNode.scrollTop - elem.offsetTop);
      if (mainTreeNode.scrollTop - elem.offsetTop < elem.offsetHeight) {
        mainTreeNode.scrollTop -= elem.offsetHeight -2;
      }
    } else if (e.key == 'ArrowDown') {
      let {elem} = showNext();
      if (elem.offsetTop > window.visualViewport.height) {
        mainTreeNode.scrollTop += elem.offsetHeight + 2;
      }
    } else if (e.key == 'Enter') {
      saveCurrentFile();
      if (!fs.lstatSync(nodes[nodeFocusNumber].uniqueValue).isDirectory()) {
        sourcePath = nodes[nodeFocusNumber].uniqueValue;
        fs.readFile(nodes[nodeFocusNumber].uniqueValue, 'utf-8', async (err, data) => {
          if (err) {
              throw err;
          }
          tarea.setValue(data);
          putFile(nodes[nodeFocusNumber].uniqueValue);
        });
      } else {
        toggleDir(nodes[nodeFocusNumber].uniqueValue);
      }
    }
  }

}

function handleKeyup(e) {
  if (e.key == "Control") {
    isCtrl = 0;
  } else if (e.key == "Shift") {
    isShift = 0;
  } else if (e.key == "Alt") {
    isAlt = 0;
  }
}
