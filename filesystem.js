let sourcePath = '';
let isProgressSaved = 1;

function changeLineStyle (isGreen) {
  const elems1 = document.getElementsByClassName('CodeMirror-gutters');
  const elems2 = document.getElementsByClassName('cm-s-monokai');
  const elems = [... elems1, ...elems2];
  if (isGreen) {
    elems.forEach((item, i) => {
      item.style.borderRight = '1px solid #2d692d';
    });
  } else {
    elems.forEach((item, i) => {
      item.style.borderRight = '1px solid #69692d';
    });
  }
}


async function open_all_files(pathx) {
  if (pathx != undefined) {
    if(fs.lstatSync(pathx).isDirectory()){
      //open dir
      folderPath = pathx;
      fs.readdir(pathx, 'utf8', (err,data)=>{
        filesOpened = data;
        data = data.map(e=>({val:path.join(folderPath,e), depth:0}));
        showFiles(data);
      });
    } else {
      //open dir and read given file
      folderPath = path.dirname(pathx);
      fs.readdir(folderPath, 'utf8', (err,data)=>{
        filesOpened = data;
        data = data.map(e=>({val:path.join(folderPath,e), depth:0}));
        showFiles(data);
      });
      currentFilePath = path.basename(pathx);
      focusFile(currentFilePath);
      fs.readFile(pathx, 'utf-8', async (err, data) => {
        if (err) {
            throw err;
        }
        tarea.setValue(data);
      });
    }
  }
  changeLineStyle(isProgressSaved);
}

async function saveCurrentFile() {
  if (isProgressSaved == 0) {
    if (folderPath != '' && currentFilePath != '') {
      isProgressSaved = 1;
      changeLineStyle(isProgressSaved);
      fs.writeFile(path.join(folderPath,currentFilePath), tarea.getValue(),'utf8',e=>console.log(e));
    } else if (folderPath == '' || currentFilePath == '') {
      if (tarea.getValue().trim() == '') {
        return 1;
      }
      isProgressSaved = 1;
      changeLineStyle(isProgressSaved);
      dialog.showSaveDialog({}).then(e=>{
        fs.writeFile(e.filePath, tarea.getValue(),'utf8',e=>console.log(e));
      });
    }
  }
}

async function add_new_file() {
  dialog.showSaveDialog({}).then(e=>{
    fs.writeFile(e.filePath, '','utf8',e=>console.log(e));
  });
}

function init_fs() {
  open_all_files(sourcePath);
}
