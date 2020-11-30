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
    div.style.zIndex = 349482904;

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
      iWasEditing = 0;
      let firstTime = 1;
      let interval = setInterval(async _ => {
        let ss = tarea.getCursor();
        if (iWasEditing && !firstTime) {
          console.log('sending data');
          await database.insertCode(token, tarea.getValue());
        }
        if (firstTime) {
          firstTime = 0;
        }
        iWasEditing = 0;
        console.log('getting value');
        tarea.setValue(await database.findCode(token));
        tarea.setCursor(ss);
        if (token == '') {
          clearInterval(interval);
        }
      }, 5000);
      inp.remove();
      div.remove();
      isSessionDb = 0;
      tarea.autofocus = true;
      tarea.focus();
    } else {
      token = '';
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
    div.style.zIndex = 342523525;


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

    document.body.appendChild(div);
    div.appendChild(but);
  }

  function closeHelpMenu(div, but) {
    but.remove();
    div.remove();

    isHelpMenu = 0;
  }



  function startLanguageMenu() {
    let div = document.createElement('div');
    div.style.width = window.visualViewport.width + 'px';
    div.style.height = window.visualViewport.height + 'px';
    div.style.background = "#141419";
    div.style.position = 'fixed';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.left = '0px';
    div.style.top = '0px';
    div.style.zIndex = 342523525;

    isLanguageMenu = 1;

    div.id = 'language_div_id';

    document.body.appendChild(div);

    let bigFour = document.createElement('div');
    bigFour.style.display = 'flex';
    bigFour.style.margin = '5px';
    bigFour.style.flexDirection = 'row';
    bigFour.style.alignItems = 'center';
    bigFour.style.justifyContent = 'space-around';

    div.appendChild(bigFour);

    let bigFourElements = [
      new LanguageOption("javascript", bigFour, div, 200),
      new LanguageOption("clike", bigFour, div, 200),
      new LanguageOption("ruby", bigFour, div, 200),
      new LanguageOption("python", bigFour, div, 200),
    ];

    let otherLanguages = document.createElement('div');
    otherLanguages.style.display = 'grid';

    /*
    let otherLanguagesElements = [
      new LanguageOption("apl", otherLanguages, div, 100),
      new LanguageOption("asciiarmor", otherLanguages, div, 100),
      new LanguageOption("asn.1", otherLanguages, div, 100),
      new LanguageOption("asterisk", otherLanguages, div, 100),
      new LanguageOption("brainfuck", otherLanguages, div, 100),
      new LanguageOption("clojure", otherLanguages, div, 100),
      new LanguageOption("cmake", otherLanguages, div, 100),
      new LanguageOption("cobol", otherLanguages, div, 100),
      new LanguageOption("coffeescript", otherLanguages, div, 100),
      new LanguageOption("commonlisp", otherLanguages, div, 100),
      new LanguageOption("crystal", otherLanguages, div, 100),
      new LanguageOption("css", otherLanguages, div, 100),
      new LanguageOption("cypher", otherLanguages, div, 100),
      new LanguageOption("d", otherLanguages, div, 100),
      new LanguageOption("dart", otherLanguages, div, 100),
      new LanguageOption("diff", otherLanguages, div, 100),
      new LanguageOption("django", otherLanguages, div, 100),
      new LanguageOption("dockerfile", otherLanguages, div, 100),
      new LanguageOption("dtd", otherLanguages, div, 100),
      new LanguageOption("dylan", otherLanguages, div, 100),
      new LanguageOption("ebnf", otherLanguages, div, 100),
      new LanguageOption("ecl", otherLanguages, div, 100),
      new LanguageOption("eiffel", otherLanguages, div, 100),
      new LanguageOption("elm", otherLanguages, div, 100),
      new LanguageOption("erlang", otherLanguages, div, 100),
      new LanguageOption("factor", otherLanguages, div, 100),
      new LanguageOption("fcl", otherLanguages, div, 100),
      new LanguageOption("forth", otherLanguages, div, 100),
      new LanguageOption("fortran", otherLanguages, div, 100),
      new LanguageOption("gas", otherLanguages, div, 100),
      new LanguageOption("gfm", otherLanguages, div, 100),
      new LanguageOption("gherkin", otherLanguages, div, 100),
      new LanguageOption("go", otherLanguages, div, 100),
      new LanguageOption("groovy", otherLanguages, div, 100),
      new LanguageOption("haml", otherLanguages, div, 100),
      new LanguageOption("handlebars", otherLanguages, div, 100),
      new LanguageOption("haskell", otherLanguages, div, 100),
      new LanguageOption("haskell-literate", otherLanguages, div, 100),
      new LanguageOption("haxe", otherLanguages, div, 100),
      new LanguageOption("htmlembedded", otherLanguages, div, 100),
      new LanguageOption("htmlmixed", otherLanguages, div, 100),
      new LanguageOption("http", otherLanguages, div, 100),
      new LanguageOption("idl", otherLanguages, div, 100),
      new LanguageOption("jinja2", otherLanguages, div, 100),
      new LanguageOption("jsx", otherLanguages, div, 100),
      new LanguageOption("julia", otherLanguages, div, 100),
      new LanguageOption("livescript", otherLanguages, div, 100),
      new LanguageOption("lua", otherLanguages, div, 100),
      new LanguageOption("markdown", otherLanguages, div, 100),
      new LanguageOption("mathematica", otherLanguages, div, 100),
      new LanguageOption("mbox", otherLanguages, div, 100),
      new LanguageOption("mirc", otherLanguages, div, 100),
      new LanguageOption("mllike", otherLanguages, div, 100),
      new LanguageOption("modelica", otherLanguages, div, 100),
      new LanguageOption("mscgen", otherLanguages, div, 100),
      new LanguageOption("mumps", otherLanguages, div, 100),
      new LanguageOption("nginx", otherLanguages, div, 100),
      new LanguageOption("nsis", otherLanguages, div, 100),
      new LanguageOption("ntriples", otherLanguages, div, 100),
      new LanguageOption("octave", otherLanguages, div, 100),
      new LanguageOption("oz", otherLanguages, div, 100),
      new LanguageOption("pascal", otherLanguages, div, 100),
      new LanguageOption("pegjs", otherLanguages, div, 100),
      new LanguageOption("perl", otherLanguages, div, 100),
      new LanguageOption("php", otherLanguages, div, 100),
      new LanguageOption("pig", otherLanguages, div, 100),
      new LanguageOption("powershell", otherLanguages, div, 100),
      new LanguageOption("properties", otherLanguages, div, 100),
      new LanguageOption("protobuf", otherLanguages, div, 100),
      new LanguageOption("pug", otherLanguages, div, 100),
      new LanguageOption("puppet", otherLanguages, div, 100),
      new LanguageOption("q", otherLanguages, div, 100),
      new LanguageOption("r", otherLanguages, div, 100),
      new LanguageOption("rpm", otherLanguages, div, 100),
      new LanguageOption("rst", otherLanguages, div, 100),
      new LanguageOption("rust", otherLanguages, div, 100),
      new LanguageOption("sas", otherLanguages, div, 100),
      new LanguageOption("sass", otherLanguages, div, 100),
      new LanguageOption("scheme", otherLanguages, div, 100),
      new LanguageOption("shell", otherLanguages, div, 100),
      new LanguageOption("sieve", otherLanguages, div, 100),
      new LanguageOption("slim", otherLanguages, div, 100),
      new LanguageOption("smalltalk", otherLanguages, div, 100),
      new LanguageOption("smarty", otherLanguages, div, 100),
      new LanguageOption("solr", otherLanguages, div, 100),
      new LanguageOption("soy", otherLanguages, div, 100),
      new LanguageOption("sparql", otherLanguages, div, 100),
      new LanguageOption("spreadsheet", otherLanguages, div, 100),
      new LanguageOption("sql", otherLanguages, div, 100),
      new LanguageOption("stex", otherLanguages, div, 100),
      new LanguageOption("stylus", otherLanguages, div, 100),
      new LanguageOption("swift", otherLanguages, div, 100),
      new LanguageOption("tcl", otherLanguages, div, 100),
      new LanguageOption("texlite", otherLanguages, div, 100),
      new LanguageOption("tiddlywiki", otherLanguages, div, 100),
      new LanguageOption("tiki", otherLanguages, div, 100),
      new LanguageOption("toml", otherLanguages, div, 100),
      new LanguageOption("tornado", otherLanguages, div, 100),
      new LanguageOption("troff", otherLanguages, div, 100),
      new LanguageOption("ttcn", otherLanguages, div, 100),
      new LanguageOption("ttcn-cfg", otherLanguages, div, 100),
      new LanguageOption("turtle", otherLanguages, div, 100),
      new LanguageOption("twig", otherLanguages, div, 100),
      new LanguageOption("vb", otherLanguages, div, 100),
      new LanguageOption("vbscript", otherLanguages, div, 100),
      new LanguageOption("velocity", otherLanguages, div, 100),
      new LanguageOption("verilog", otherLanguages, div, 100),
      new LanguageOption("vhdl", otherLanguages, div, 100),
      new LanguageOption("vue", otherLanguages, div, 100),
      new LanguageOption("wast", otherLanguages, div, 100),
      new LanguageOption("webidl", otherLanguages, div, 100),
      new LanguageOption("xml", otherLanguages, div, 100),
      new LanguageOption("xquery", otherLanguages, div, 100),
      new LanguageOption("yacas", otherLanguages, div, 100),
      new LanguageOption("yaml", otherLanguages, div, 100),
      new LanguageOption("yaml-frontmatter", otherLanguages, div, 100),
      new LanguageOption("z80", otherLanguages, div, 100)
    ];*/
  }

  function LanguageOption(name, parent, div, size) {
    this.name = name;
    this.elem = document.createElement('img');
    this.elem.style.width = size+'px';
    this.elem.style.height = size+'px';
    this.elem.src = `./assets/img/${name}.png`;
    this.elem.alt = name;
    parent.appendChild(this.elem);
    this.elem.onclick = e=> {
      div.remove();
      setMode(name);
      isLanguageMenu = 0;
    };
  }
