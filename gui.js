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

    if (token == '') {
      token = generateToken();
    }


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
    if ((inp.value.length == TOKEN_LENGTH)) {
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
    div.style.fontSize = '20px';
    div.style.color = '#46b846';
    div.style.position = 'fixed';
    div.style.left = '0px';
    div.style.top = '0px';


    div.innerHTML = 'help page';

    let but = document.createElement('button');
    but.onclick = closeHelpMenu.bind(null, div, but);
    but.innerHTML = 'exit';
    but.style.padding = "5px";
    but.style.background = "#141419";
    but.style.fontSize = '20px';
    but.style.color = '#FFF';
    but.style.position = 'fixed';
    but.style.right = '20px';
    but.style.bottom = '20px';
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
