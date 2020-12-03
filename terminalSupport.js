const {exec} = require('child_process');
const ipc = require('electron').ipcRenderer;

let terminal = document.getElementById('terminal');
terminal.style.backgroundColor = '#000';
let term = new Terminal({rows:21, cols: 100});
terminal.style.position = 'fixed';
terminal.style.overflow = 'hidden';
terminal.style.opacity = 0;
term.open(terminal);
term.onData((data) => {
  ipc.send("terminal.toTerm", data);
});
ipc.on("terminal.incData", (e, data) => {
  term.write(data);
  term.scrollLines(1);
});

function startTerminal() {
if (terminal.style.opacity == 0 || document.activeElement == domObj) {
  areBothShown = 1;
  onresize();
  term.focus();
  terminal.style.opacity = 1;
} else {
  terminal.style.opacity = 0;
  onresize();
  tarea.focus();
  styleSecond.opacity = 1;
}
};
