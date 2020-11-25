const fs = require('fs');

const TOKEN_LENGTH = 4;

let token = '';

let strNumbers = document.getElementById('strNumbers');

strNumbers.value = '';

const href = window.location.href;
const path = unescape(href.substring(href.indexOf('?data=')+6));



for (let i = 1; i < 10000; i++) {
  strNumbers.value += `${i}\n`;
}




let database;

const tarea = document.getElementById("editorArea");

let buffer;


async function init() {
  database = require("./backend.js");
  if (path != undefined) {
    fs.readFile(path, 'utf-8', async (err, data) => {
      if (err) {
          throw err;
      }
      tarea.value = data;
    });
  }
}
init();

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

function handleKeydown(e) {
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
  if (e.key == "Tab" && !isCtrl) {
    let ss = tarea.selectionStart;
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
