const fs = require('fs');
const path = require('path');
const {remote} = require('electron');
const {dialog} = remote;

const {startTerminal} = require('./terminalSupport.js')

const TOKEN_LENGTH = 4;

let token = '';


let mainTreeNode = document.getElementById('treeView');

let nodes = [];


function showFiles (arr, openList) {
  if (openList == undefined) {
    openList = []
  }
  nodes.forEach(e => e.elem.remove());

  nodes = [];


  arr.forEach((e, i) => {
    nodes[i] = { uniqueValue: e };
    nodes[i].elem = document.createElement('div');
    nodes[i].elem.classList.add('nodeElement');
    nodes[i].elem.innerHTML = path.basename(e);
    nodes[i].dependency =  path.dirname(e);
    nodes[i].open = 0;
    if (openList.length > 0) {
      openList.forEach(item => {
        if (item == e) {
          nodes[i].open = 1;
        }
      });
    }
    mainTreeNode.appendChild(nodes[i].elem);
  });

  if (nodeFocusNumber != undefined) {
    nodes[nodeFocusNumber].elem.classList.add('nodeElement-focus');
  }

  nodes.forEach((item, i) => {
    item.elem.onclick = ((e,item) => {
      if (!fs.lstatSync(item.uniqueValue).isDirectory()) {
        fs.readFile(item.uniqueValue, 'utf-8', async (err, data) => {
          if (err) {
              throw err;
            }
            tarea.setValue(data);
            currentFilePath = item.uniqueValue;
          });
        } else {
          toggleDir(item.uniqueValue);
        }
    }).bind(null, null, item);
  });
}

function focusFile (fname) {
  let found = 0;
  nodes.forEach((e,i) => {
    if (e.uniqueValue == fname) {
      e.elem.classList.add('nodeElement-focus');
      nodeFocusNumber = i;
      found = 1;
    }
  });
  if (!found) {
    nodes[0].elem.classList.add('nodeElement-focus');
    nodeFocusNumber = 0;
    found = 1;
  }
}

function showNext() {
  if (nodeFocusNumber < nodes.length - 1) {
    removeFocus();
    nodeFocusNumber++;
    nodes[nodeFocusNumber].elem.classList.add('nodeElement-focus');
  }
}

function showPrevious() {
  if (nodeFocusNumber > 0) {
    removeFocus();
    nodeFocusNumber--;
    nodes[nodeFocusNumber].elem.classList.add('nodeElement-focus');
  }
}

function toggleDir(dirname) {
  let index = 0;
  nodes.forEach((e, i) => {if(e.uniqueValue == dirname) index = i});

  if (!nodes[index].open) {
    nodes[index].open = 1;
    let openList = [];
    nodes.forEach((item, i) => {
      if (item.open) {
        openList[openList.length] = item.uniqueValue;
      }
    });

    fs.readdir(dirname, 'utf8', (err,data)=>{
      let tmp = [];
      for (let i = 0; i < index + 1; i++) {
        tmp[i] = nodes[i].uniqueValue;
      }
      for (let i = index + 1; i < index + 1 + data.length; i++) {
        tmp[i] = path.join(dirname, data[i - index - 1]);
      }
      for (let i = index + 1 + data.length; i < nodes.length + data.length; i++) {
        tmp[i] = nodes[i - data.length].uniqueValue;
      }
      showFiles(tmp, openList);
    });
  } else {
    nodes[index].open = 0;
    let openList = [];
    nodes.forEach((item, i) => {
      if (item.open) {
        openList[openList.length] = item.uniqueValue;
      }
    });

    fs.readdir(dirname, 'utf8', (err,data)=>{
      let tmp = [];
      for (let i = 0; i <= index; i++) {
        tmp[i] = nodes[i].uniqueValue;
      }
      let ind = index + 1;
      let sum = data.length;
      let totalsum = sum;
      while (sum > 0) {
        if (nodes[ind].open) {
          let x = fs.readdirSync(nodes[ind].uniqueValue, 'utf8').length;
          sum += x;
          totalsum += x;
        }
        sum--;
        ind++;
      }


      for (let i = ind; i < nodes.length; i++) {
        tmp[i - totalsum] = nodes[i].uniqueValue;
      }

      showFiles(tmp, openList);
    });
  }
}


function removeFocus() {
  nodes[nodeFocusNumber].elem.classList.remove('nodeElement-focus');
}
let isNodesFocused = 0;
let nodeFocusNumber = undefined;



const database = require("./backend.js");

const {myCodeMirror, setMode} = require('./codemirror-plugin.js');
const tarea = myCodeMirror;

tarea.setValue("");

const href = window.location.href;
let sourcePath = unescape(href.substring(href.indexOf('?data=')+6));

let filesOpened = [];
let folderPath = '';
let currentFilePath = '';

let currentFullPath =(a,b)=>path.join([a,b]);

(async function init() {
  if (sourcePath != undefined) {
    if(fs.lstatSync(sourcePath).isDirectory()){
      //open dir
      folderPath = sourcePath;
      fs.readdir(sourcePath, 'utf8', (err,data)=>{
        filesOpened = data;
        data = data.map(e=>path.join(folderPath,e));
        showFiles(data);
      });
    } else {
      //open dir and read given file
      folderPath = path.dirname(sourcePath);
      fs.readdir(folderPath, 'utf8', (err,data)=>{
        filesOpened = data;
        data = data.map(e=>path.join(folderPath,e));
        showFiles(data);
      });
      currentFilePath = path.basename(sourcePath);
      focusFile(currentFilePath);
      fs.readFile(sourcePath, 'utf-8', async (err, data) => {
        if (err) {
            throw err;
        }
        tarea.setValue(data);
      });
    }
  }
})();

let bluringTA = document.getElementById('bluringTA');



let domObj = document.querySelectorAll('.CodeMirror')[0];
let style = domObj.style;
/*
style.position = 'absolute';
style.left = '65px';
*/
style.position = 'static';

style.width = window.visualViewport.width-65 + "px";
style.height = window.visualViewport.height + "px";

window.addEventListener('wheel', e=>{
  domObj.scrollTop += e.deltaY/5;
  if (domObj.scrollTop < 0) {
    domObj.scrollTop = 0;
  }
});

domObj.onscroll = e=>{
  domObj.scrollLeft = 0;
};

window.addEventListener("resize", e => {
  style.width = window.visualViewport.width-65 + "px";
  style.height = window.visualViewport.height + "px";
});


window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
let isCtrl = 0;
let isAlt = 0;
let isShift = 0;
let isHelpMenu = 0;
let isLanguageMenu = 0;
let isSessionDb = 0;
let isTerminal = 0;
let iWasEditing = 0;

function handleKeydown(e) {
  if (e.key != "Control" && e.key != "Alt" && e.key != "Escape" && e.key != "ArrowUp" && e.key != "ArrowDown") {
    if (e.key != "ArrowRight" && e.key != "ArrowLeft" && e.key != "CapsLock" && e.key != "PageDown" && e.key != "PageUp") {
      if (e.key != "End" && e.key != "Home" && e.key != "Insert" && e.key != "NumLock" && e.key != "Meta" && e.key != "PrintScreen") {
        if (e.key != "F1" && e.key != "F2" && e.key != "F3" && e.key != "F4" && e.key != "F5" && e.key != "F6" && e.key != "F6") {
          if (e.key != "F7" && e.key != "F8" && e.key != "F9" && e.key != "F10" && e.key != "F11" && e.key != "F12") {
            iWasEditing = 1;
          }
        }
      }
    }
  }

  if (e.key == "Control") {
    isCtrl = 1;
  } else if (e.key == "Shift") {
    isShift = 1;
  } else if (e.key == "Alt") {
    isAlt = 1;
  } else if (e.key == "Escape") {
    window.close();
  } else if (e.key == "s" && isCtrl && folderPath != '' && currentFilePath != '') {
    isCtrl = 0;
    fs.writeFile(path.join(folderPath,currentFilePath), tarea.getValue(),'utf8',e=>console.log(e));
  } else if (e.key == "s" && isCtrl && (folderPath == '' || currentFilePath == '')) {
    isCtrl = 0;
    dialog.showSaveDialog({}).then(e=>{
      fs.writeFile(e.filePath, tarea.getValue(),'utf8',e=>console.log(e));
    });
  } else if (e.key == "o" && isCtrl) {
    isCtrl = 0;
    dialog.showOpenDialog({}).then(e=>{
      sourcePath = e.filePaths[0];
      if (e.filePaths.length > 1) {
        e.filePaths = e.filePaths.map(a=>path.join(e.filePath[0],a));
        showFiles(e.filePaths);
      } else {
        folderPath = path.dirname(sourcePath);
        fs.readdir(folderPath, 'utf8', (err,data)=>{
          filesOpened = data;
          data = data.map(e=>path.join(folderPath, e))
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
      });
    });
  } else if (e.key == "g" && isCtrl) {
    isCtrl = 0;
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
  } else if (e.key == "d" && isCtrl && isAlt) {
    isAlt = 0;
    isCtrl = 0;
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
    startTerminal();
  }

  if (isNodesFocused) {
    if (e.key == 'ArrowUp') {
      showPrevious();
    } else if (e.key == 'ArrowDown') {
      showNext();
    } else if (e.key == 'Enter') {
      if (!fs.lstatSync(nodes[nodeFocusNumber].uniqueValue).isDirectory()) {
        fs.readFile(nodes[nodeFocusNumber].uniqueValue, 'utf-8', async (err, data) => {
          if (err) {
              throw err;
          }
          tarea.setValue(data);
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

function generateToken() {
  let tok = "";
  let rnd;
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    rnd = String.fromCharCode(
      "a".charCodeAt(0) + Math.floor(Math.random() * 10)
    );
    tok += rnd;
  }
  return tok;
}
