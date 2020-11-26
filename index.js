const fs = require('fs');
const path = require('path');
const { splitInput } = require('./stringManipulation.js')

const {startTerminal} = require('./terminalSupport.js')

const TOKEN_LENGTH = 4;

let token = '';

const database = require("./backend.js");

const tarea = document.getElementById("editorArea");

tarea.value = '';
tarea.selectionStart = tarea.selectionEnd = 0;

const href = window.location.href;
const sourcePath = unescape(href.substring(href.indexOf('?data=')+6));

let filesOpened = [];
let folderPath = '';
let currentFilePath = '';

let currentFullPath =(a,b)=>path.join([a,b]);

(async function init() {
  if (sourcePath != undefined) {
    if(fs.lstatSync(sourcePath).isDirectory()){
      //open dir and read some file
      folderPath = sourcePath;
      fs.readdir(sourcePath, 'utf8', (err,data)=>{
        filesOpened = data;
        if (data != [] && data != null && data != undefined) {
          currentFilePath = data[0];
          fs.readFile(data[0], 'utf-8', async (err, data) => {
            if (err) {
              throw err;
            }
            tarea.value = data;
          });
        }
      });
    } else {
      //open dir and read given file
      folderPath = path.dirname(sourcePath);
      fs.readdir(folderPath, 'utf8', (err,data)=>{
        filesOpened = data;
      });
      currentFilePath = sourcePath;
      fs.readFile(sourcePath, 'utf-8', async (err, data) => {
        if (err) {
            throw err;
        }
        tarea.value = data;
      });
    }
  }
})();


let strNumbers = document.getElementById('strNumbers');

let stringData = splitInput(tarea.value);

strNumbers.value = '';
for (let i = 1; i < stringData.length + 1; i++) {
  strNumbers.value += `${i}\n`;
}

tarea.style.width = window.visualViewport.width-65 + "px";
tarea.style.height = window.visualViewport.height + "px";

strNumbers.style.height = window.visualViewport.height + "px";


window.addEventListener('wheel', e=>{
  tarea.scrollTop += e.deltaY/5;
  if (tarea.scrollTop < 0) {
    tarea.scrollTop = 0;
  }
  strNumbers.scrollTop = tarea.scrollTop;
});


tarea.onscroll = e=>{
  strNumbers.scrollTop = tarea.scrollTop;
  tarea.scrollLeft = 0;
};


window.addEventListener("resize", e => {
  tarea.style.width = window.visualViewport.width-65 + "px";
  tarea.style.height = window.visualViewport.height + "px";

  strNumbers.style.height = window.visualViewport.height + "px";
});

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
let isCtrl = 0;
let isShift = 0;
let safeValue = tarea.value;
let isHelpMenu = 0;
let isSessionDb = 0;
let isTerminal = 0;

function handleKeydown(e) {
  let ss = tarea.selectionStart;
  let se = tarea.selectionEnd;

  if (ss != se || e.key == 'Delete' || e.key == 'Backspace') {
    setTimeout(_=>{
      stringData = splitInput(tarea.value);
      strNumbers.value = '';
      for (let i = 1; i < stringData.length + 1; i++) {
        strNumbers.value += `${i}\n`;
      }
    }, 0);
  }
  if (ss == se && e.key == 'Enter') {
    setTimeout(_=>{
      stringData = splitInput(tarea.value);
      strNumbers.value += stringData.length+'\n';
    },0);
  }

  if (e.key == "Control") {
    isCtrl = 1;
  }
  if (e.key == "Shift") {
    isShift = 1;
  }
  if (e.key == "Escape") {
    window.close();
  }
  if (e.key == "k" && isCtrl) {
    database.insertCode(token, tarea.value);
  }
  if (e.key == "d" && isCtrl) {
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
  if (e.key == "h" && isCtrl) {
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
  if (e.key == "t" && isCtrl) {
    startTerminal();
  }
  if (e.key == "Tab" && !isCtrl) {
    tarea.value =
      tarea.value.substring(0, tarea.selectionStart) +
      "  " +
      tarea.value.substring(tarea.selectionStart);
    tarea.selectionStart = ss + 2;
    tarea.selectionEnd = ss + 2;
  }
}

function handleKeyup(e) {
  if (e.key == "Control") {
    isCtrl = 0;
  }
  if (e.key == "Shift") {
    isShift = 0;
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
