const tarea = document.getElementById("editorArea");
const secondTarea = document.getElementById("secondEditorArea");


function wasDotOrLetter(a) {
  if (a == 190) return 1;
  if (a >= 65 && a <= 90) return 1;
  return 0;
}

let myCodeMirror = CodeMirror.fromTextArea(tarea, {
  mode: "javascript",
  theme: "monokai",
  tabSize : 2,
  keyMap: "sublime",
  lineWrapping: true,
  lineNumbers: true,
  autofocus: true,
  scrollbarStyle: "null",
  matchBrackets: true,
  highlightSelectionMatches : true,
  extraKeys: {"Ctrl-Space": "autocomplete"}
});

myCodeMirror.on("keyup", function (cm, event) {
  if (!cm.state.completionActive && wasDotOrLetter(event.keyCode)) {
    if (areWeAutocompleting) {
      CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    }
  }
});

function setMode(lang) {
  myCodeMirror.setOption("mode" , lang);
}

/*let mySecondCodeMirror = CodeMirror.fromTextArea(secondTarea, {
  mode: "javascript",
  theme: "monokai",
  tabSize : 2,
  keyMap: "sublime",
  lineWrapping: true,
  lineNumbers: true,
  autofocus: true,
  scrollbarStyle: "null",
  matchBrackets: true,
  highlightSelectionMatches : true,
  extraKeys: {"Ctrl-Space": "autocomplete"}
});

mySecondCodeMirror.on("keyup", function (cm, event) {
  if (!cm.state.completionActive && wasDotOrLetter(event.keyCode)) {
    CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
  }
});

function setModeSecond(lang) {
  mySecondCodeMirror.setOption("mode" , lang);
}*/

module.exports = {myCodeMirror, setMode /*, mySecondCodeMirror, setModeSecond*/};
