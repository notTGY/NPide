const tarea = document.getElementById("editorArea");


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

module.exports = {myCodeMirror, setMode};
