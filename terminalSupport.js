const {exec} = require('child_process');

let prevValue = '';

function startTerminal(elem) {
exec('start cmd.exe', (error, stdout, stderr) => {
    ;
});

/*
if (elem.style.opacity == 0) {
  elem.style.opacity = 1;
  elem.focus();
  elem.addEventListener('keyup',async e=>{
    if(e.key=='Enter') {
      let command = elem.value.substring(prevValue.length);
      if (command.trim() == 'cls') {
        elm.value = '';
      } else {
        await exec(command, (error, stdout, stderr) => {
          elem.value += error + stdout + stderr;
          elem.scrollTop += 100000;
          prevValue = elem.value;
        });
      }

    }
  })
} else {
  elem.value = '';
  elem.style.opacity = 0;
}
*/
};


module.exports = {startTerminal};
