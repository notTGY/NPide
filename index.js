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
        data = data.map(e=>({val:path.join(folderPath,e), depth:0}));
        showFiles(data);
      });
    } else {
      //open dir and read given file
      folderPath = path.dirname(sourcePath);
      fs.readdir(folderPath, 'utf8', (err,data)=>{
        filesOpened = data;
        data = data.map(e=>({val:path.join(folderPath,e), depth:0}));
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


style.position = 'absolute';
style.left = mainTreeNode.offsetWidth + 'px';


style.width = window.visualViewport.width-mainTreeNode.offsetWidth + "px";
style.height = window.visualViewport.height + "px";

window.addEventListener('wheel', e=>{
  if (document.activeElement == domObj) {
    domObj.scrollTop += e.deltaY/5;
    if (domObj.scrollTop < 0) {
      domObj.scrollTop = 0;
    }
  } else if (document.activeElement == mainTreeNode) {
    mainTreeNode.scrollTop += e.deltaY/5;
    if (mainTreeNode.scrollTop < 0) {
      mainTreeNode.scrollTop = 0;
    }
  }
});

domObj.onscroll = e=>{
  domObj.scrollLeft = 0;
};

let onresize = e => {
  style.left = mainTreeNode.offsetWidth-1 + 'px';
  style.width = window.visualViewport.width-mainTreeNode.offsetWidth+1 + "px";
  style.height = window.visualViewport.height + "px";
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

let isProgressSaved = 1;

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
