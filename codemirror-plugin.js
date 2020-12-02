const tarea = document.getElementById("editorArea");
const secondTarea = document.getElementById("secondEditorArea");


let myCodeMirror = CodeMirror.fromTextArea(tarea, {
  mode: "javascript",
  theme: "monokai",
  tabSize : 2,
  keyMap: "sublime",
  lineWrapping: true,
  lineNumbers: true,
  autofocus: true,
  scrollbarStyle: "null"
});

function setMode(lang) {
  myCodeMirror.setOption("mode" , lang);
}

let mySecondCodeMirror = CodeMirror.fromTextArea(secondTarea, {
  mode: "javascript",
  theme: "monokai",
  tabSize : 2,
  keyMap: "sublime",
  lineWrapping: true,
  lineNumbers: true,
  autofocus: true,
  scrollbarStyle: "null"
});

function setModeSecond(lang) {
  mySecondCodeMirror.setOption("mode" , lang);
}

module.exports = {myCodeMirror, setMode, mySecondCodeMirror, setModeSecond};
