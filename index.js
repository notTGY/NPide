const fs = require('fs');
const path = require('path');
const {remote} = require('electron');
const {dialog} = remote;

const {startTerminal} = require('./terminalSupport.js')

const TOKEN_LENGTH = 4;

let token = '';

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
      });
    } else {
      //open dir and read given file
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
    }
  }
})();

let domObj = document.querySelectorAll('.CodeMirror')[0];
let style = domObj.style;

style.position = 'absolute';
style.left = '65px';
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

function handleKeydown(e) {
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
  } else if (e.key == "k" && isCtrl) {
    isCtrl = 0;
    database.insertCode(token, tarea.getValue());
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
