let token = generateToken();

let strNumbersTable = document.getElementById('strNumbers');

for (let i = 1; i < 200; i++) {
  strNumbersTable.innerHTML += `<tr><td>${i}</td></tr>`;
}


let database;

const tarea = document.getElementById("editorArea");

tarea.style.marginLeft = strNumbersTable.style.width;

async function init() {
  database = require("./backend.js");
  tarea.value = await database.findCode(token);
}
init();

tarea.style.width = window.visualViewport.width + "px";
tarea.style.height = window.visualViewport.height + "px";

window.addEventListener("resize", e => {
  tarea.style.width = window.visualViewport.width + "px";
  tarea.style.height = window.visualViewport.height + "px";
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
  if (e.key == "s" && isCtrl) {
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
  for (let i = 0; i < 6; i++) {
    rnd = String.fromCharCode(
      "a".charCodeAt(0) + Math.floor(Math.random() * 27)
    );
    tok += rnd;
  }
  return tok;
}

function connectToDb() {
  let inp = document.createElement("input");
  let div = document.createElement("div");

  inp.id = 'session_inp_id';
  div.id = 'session_div_id';

  div.style.position = "fixed";
  div.style.left = Math.floor(window.visualViewport.width / 2) - 70 + "px";
  div.style.top = Math.floor(window.visualViewport.height / 2) + "px";
  div.style.width = "140px";
  div.style.height = "40px";
  div.style.background = "#141419";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.border = "1px solid #FFF";
  div.style.borderRadius = "50px";

  inp.style.width = "70px";
  inp.type = "text";
  inp.style.margin = "0 auto";
  inp.placeholder = token;
  tarea.autofocus = false;
  inp.autofocus = true;
  setTimeout(_=>{inp.focus()}, 0);

  isSessionDb = 1;

  document.body.appendChild(div);
  div.appendChild(inp);
  inp.onchange = sessionIdInputHandler.bind(null, inp, div);
}

function sessionIdInputHandler(inp, div) {
  if ((inp.value.length == 6)) {
    token = inp.value;
    (async _ => {
      tarea.value = await database.findCode(token);
    })();
    inp.remove();
    div.remove();
    isSessionDb = 0;
    tarea.autofocus = true;
    tarea.focus();
  }
}

function startHelpMenu() {
  let div = document.createElement('div');
  div.style.width = window.visualViewport.width + 'px';
  div.style.height = window.visualViewport.height + 'px';
  div.style.background = "#141419";
  div.style.fontFamily = 'Arial';
  div.style.fontSize = '20px';
  div.style.color = '#46b846';
  div.style.position = 'fixed';
  div.style.left = '0px';
  div.style.top = '0px';


  div.innerHTML = 'help page';

  let but = document.createElement('button');
  but.onclick = closeHelpMenu.bind(null, div, but);
  but.innerHTML = 'exit';
  but.style.background = "#141419";
  but.style.fontFamily = 'Arial';
  but.style.fontSize = '20px';
  but.style.color = '#46b846';
  but.style.position = 'fixed';
  but.style.right = '5px';
  but.style.bottom = '5px';
  but.style.borderRadius = '20px';
  but.style.border = '1px solid #FFF';

  isHelpMenu = 1;

  but.id = 'help_but_id';
  div.id = 'help_div_id';

  console.log(div,but)

  document.body.appendChild(div);
  div.appendChild(but);
}

function closeHelpMenu(div, but) {
  but.remove();
  div.remove();

  isHelpMenu = 0;
}
