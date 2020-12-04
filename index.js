const fs = require('fs');
const path = require('path');
const {remote} = require('electron');
const {dialog} = remote;

const TOKEN_LENGTH = 4;
let token = '';
const database = require("./backend.js");

const {myCodeMirror, setMode, mySecondCodeMirror, setModeSecond} = require('./codemirror-plugin.js');
const tarea = myCodeMirror;
const secondTarea = mySecondCodeMirror;

let currentTarea = 1;
let areBothShown = 0;

tarea.setValue("");
secondTarea.setValue("");

const href = window.location.href;
sourcePath = unescape(unescape(href.substring(href.indexOf('?data=')+6)));
let filesOpened = [];
let folderPath = '';
let currentFilePath = '';
let currentFullPath =(a,b)=>path.join([a,b]);
if (sourcePath != "undefined") {
  console.log({sourcePath});
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

let domObjSecond = document.querySelectorAll('.CodeMirror')[1];
let styleSecond = domObjSecond.style;
styleSecond.position = 'fixed';
styleSecond.left = mainTreeNode.offsetWidth + 18 + 'px';
styleSecond.top = window.visualViewport.height / 2 + 'px';
styleSecond.width = window.visualViewport.width-mainTreeNode.offsetWidth - 18 + "px";
styleSecond.height = window.visualViewport.height / 2 - 5 + "px";
styleSecond.borderTop = '4px solid #181c24';
if (areBothShown) {
  styleSecond.opacity = 1;
} else {
  styleSecond.opacity = 0;
}


window.addEventListener('wheel', e=>{
  if (document.activeElement == domObj) {
    domObj.scrollTop += e.deltaY/5;
    if (domObj.scrollTop < 0) {
      domObj.scrollTop = 0;
    }
  } else if(document.activeElement == domObjSecond) {
    domObjSecond.scrollTop += e.deltaY/5;
    if (domObjSecond.scrollTop < 0) {
      domObjSecond.scrollTop = 0;
    }
  }else if (document.activeElement == bluringTA) {
    mainTreeNode.scrollTop += e.deltaY/5;
    if (mainTreeNode.scrollTop < 0) {
      mainTreeNode.scrollTop = 0;
    }
  }
});

mainTreeNode.onclick = _=> {
  saveCurrentFile();
  bluringTA.focus();
};

domObj.onscroll = e=>{
  domObj.scrollLeft = 0;
};

domObjSecond.onscroll = e=>{
  domObjSecond.scrollLeft = 0;
};

let onresize = e => {

  style.top = '0px';
  style.left = mainTreeNode.offsetWidth - 1 + 'px';
  style.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";
  style.height = window.visualViewport.height + "px";

  if (areBothShown == 1) {
    style.height = window.visualViewport.height / 2 + "px";
  }

  styleSecond.left = mainTreeNode.offsetWidth - 1 + 'px';
  styleSecond.top = window.visualViewport.height / 2 + 'px';
  styleSecond.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";
  styleSecond.height = window.visualViewport.height / 2 + "px";


  terminal.style.left = mainTreeNode.offsetWidth - 1 + 'px';
  terminal.style.top = window.visualViewport.height / 2 + 'px';
  terminal.style.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";
  terminal.style.height = window.visualViewport.height / 2 + "px";
};

window.addEventListener("resize", onresize);


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
