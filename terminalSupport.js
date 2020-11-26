const exec = require('child_process').exec;

function startTerminal() {
exec('start cmd.exe', (error, stdout, stderr) => {
    ;
});
};


module.exports = {startTerminal};
