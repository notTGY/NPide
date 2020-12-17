if (areWeInNativeApp) {
  fs = require('fs');
  path = require('path');
  let obj = {remote, ipcRenderer} = require('electron');
  remote = obj.remote;
  ipcRenderer = obj.ipcRenderer;
  dialog = remote.dialog;
  ipc = ipcRenderer;

  TOKEN_LENGTH = 4;
  token = '';
  obj = require("./backend.js");
  database = obj.database;
  generateToken = obj.generateToken;
}

const tarea = myCodeMirror;
/*const secondTarea = mySecondCodeMirror;*/

let currentTarea = 1;
let areBothShown = 0;
let areWeAutocompleting = 1;

if (window.localStorage.getItem('autocompletion') == null) {
  areWeAutocompleting = 0;
} else {
  areWeAutocompleting = Number(window.localStorage.getItem('autocompletion'));
}

tarea.setValue("");


const href = window.location.href;
sourcePath = unescape(unescape(href.substring(href.indexOf('?data=')+6)));
let filesOpened = [];
let folderPath = '';
let currentFilePath = '';
let currentFullPath =(a,b)=>path.join([a,b]);
if (sourcePath != "undefined" && areWeInNativeApp) {
  init_fs();
}

let bluringTA = document.getElementById('bluringTA');

let domObj = document.querySelectorAll('.CodeMirror')[0];
let style = domObj.style;
style.position = 'absolute';
style.left = mainTreeNode.offsetWidth + 18 + 'px';
style.top = '0px';
style.width = window.visualViewport.width-mainTreeNode.offsetWidth - 18 + "px";
style.height = window.visualViewport.height + "px";


window.addEventListener('wheel', e=>{
  if (document.activeElement == domObj) {
    domObj.scrollTop += e.deltaY/5;
    if (domObj.scrollTop < 0) {
      domObj.scrollTop = 0;
    }
  } else if (document.activeElement == bluringTA) {
    mainTreeNode.scrollTop += e.deltaY/5;
    if (mainTreeNode.scrollTop < 0) {
      mainTreeNode.scrollTop = 0;
    }
  }
    onresize();
});

mainTreeNode.onclick = _=> {
  if (areWeInNativeApp) {
    saveCurrentFile();
  }
  bluringTA.focus();
};

domObj.onscroll = e=>{
  domObj.scrollLeft = 0;
  onresize();
};


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

isProgressSaved = 1;

let icpcMusicElem = document.getElementById('icpc');
icpcMusicElem.volume = .7;
