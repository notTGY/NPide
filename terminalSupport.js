if (areWeInNativeApp) {
  let obj {exec} = require('child_process');
  exec = obj.exec;

  let terminal = document.getElementById('terminal');
  terminal.style.backgroundColor = '#000';
  terminal.style.borderTop = '4px solid #181c24';
  let term = new Terminal({rows:20, cols: 100});
  terminal.style.position = 'fixed';
  terminal.style.overflow = 'hidden';
  terminal.style.opacity = 0;
  term.open(terminal);



  /*
  const ipc1 = require('electron').ipcRenderer;
  term.onData((data) => {
    ipc1.send("terminal.toTerm", data);
  });
  ipc1.on("terminal.incData", (e, data) => {
    term.write(data);
    term.scrollLines(1);
  });
  /**/




  function startTerminal() {
    if (terminal.style.opacity == 0 || document.activeElement == domObj) {
      //areBothShown = 1;
      onresize();
      term.focus();
      terminal.style.opacity = 1;
      terminal.hidden = false;
    } else {
      terminal.style.opacity = 0;
      terminal.hidden = true;
      onresize();
      tarea.focus();
      //styleSecond.opacity = 1;
    }
  };
}
