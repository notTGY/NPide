let mainTreeNode = document.getElementById('treeView');

let nodes = [];

const directoryEmbed = '<img src="./assets/icons/directory.png" width=10></img> ';
const directoryOpenEmbed = '<img src="./assets/icons/directory-open.png" width=10></img> ';



function showFiles (arr, openList) {
  if (openList == undefined) {
    openList = []
  }
  nodes.forEach(e => e.elem.remove());

  nodes = [];


  arr.forEach((e, i) => {
    nodes[i] = { uniqueValue: e.val };
    nodes[i].elem = document.createElement('div');
    nodes[i].elem.classList.add('nodeElement');
    nodes[i].dependency =  path.dirname(e.val);
    nodes[i].open = 0;
    let isDir = fs.lstatSync(e.val).isDirectory();
    nodes[i].directory = isDir;
    let str = '';
    nodes[i].depth = e.depth;
    if (e.depth) {
      for (let i = 0; i < e.depth; i++) {
        str += ' ';
      }
    }

    if (openList.length > 0) {
      openList.forEach(item => {
        if (item == e.val) {
          nodes[i].open = 1;
        }
      });
    }


    if (isDir) {
      if (nodes[i].open) {
        console.log('hi');
        str += directoryOpenEmbed;
      } else {
        str += directoryEmbed;
      }
    }

    nodes[i].elem.innerHTML = str + path.basename(e.val);


    mainTreeNode.appendChild(nodes[i].elem);
  });

  if (nodeFocusNumber != undefined) {
    nodes[nodeFocusNumber].elem.classList.add('nodeElement-focus');
  }

  nodes.forEach((item, i) => {
    item.elem.onclick = ((e,item) => {
      saveCurrentFile();
      if (!fs.lstatSync(item.uniqueValue).isDirectory()) {
        fs.readFile(item.uniqueValue, 'utf-8', async (err, data) => {
          if (err) {
              throw err;
            }
            tarea.setValue(data);
            currentFilePath = item.uniqueValue;
            putFile(currentFilePath);
          });
        } else {
          toggleDir(item.uniqueValue);
          onresize();
        }
    }).bind(null, null, item);
  });
  setTimeout(onresize, 0);
}

function focusFile (fname) {
  console.log(nodes);
  let found = 0;
  if (nodes == [] || nodes.length == 0) {
    console.log('no element to focus');
    return 1;
  }
  nodes.forEach((e,i) => {
    if (e.uniqueValue == fname) {
      e.elem.classList.add('nodeElement-focus');
      nodeFocusNumber = i;
      found = 1;
    }
  });
  if (!found) {
    nodes[0].elem.classList.add('nodeElement-focus');
    nodeFocusNumber = 0;
    found = 1;
  }
}

function showNext() {
  if (nodeFocusNumber < nodes.length - 1) {
    removeFocus();
    nodeFocusNumber++;
    nodes[nodeFocusNumber].elem.classList.add('nodeElement-focus');
  }
  return nodes[nodeFocusNumber];
}

function showPrevious() {
  if (nodeFocusNumber > 0) {
    removeFocus();
    nodeFocusNumber--;
    nodes[nodeFocusNumber].elem.classList.add('nodeElement-focus');
  }
  return nodes[nodeFocusNumber];
}

function toggleDir(dirname) {
  let index = 0;
  nodes.forEach((e, i) => {if(e.uniqueValue == dirname) index = i});

  if (!nodes[index].open) {
    nodes[index].open = 1;
    let openList = [];
    nodes.forEach((item, i) => {
      if (item.open) {
        openList[openList.length] = item.uniqueValue;
      }
    });

    fs.readdir(dirname, 'utf8', (err,data)=>{
      let tmp = [];
      let depth;
      for (let i = 0; i < index + 1; i++) {
        tmp[i] = {};
        tmp[i].val = nodes[i].uniqueValue;
        tmp[i].depth = nodes[i].depth;
        depth = tmp[i].depth;
      }
      for (let i = index + 1; i < index + 1 + data.length; i++) {
        tmp[i] = {};
        tmp[i].val = path.join(dirname, data[i - index - 1]);
        tmp[i].depth = depth + 1;
      }
      for (let i = index + 1 + data.length; i < nodes.length + data.length; i++) {
        tmp[i] = {};
        tmp[i].val = nodes[i - data.length].uniqueValue;
        tmp[i].depth = nodes[i - data.length].depth;
      }
      showFiles(tmp, openList);
    });
  } else {
    nodes[index].open = 0;
    let openList = [];
    nodes.forEach((item, i) => {
      if (item.open) {
        openList[openList.length] = item.uniqueValue;
      }
    });

    fs.readdir(dirname, 'utf8', (err,data)=>{
      let tmp = [];
      for (let i = 0; i <= index; i++) {
        tmp[i] = {};
        tmp[i].val = nodes[i].uniqueValue;
        tmp[i].depth = nodes[i].depth;
      }
      let ind = index + 1;
      let sum = data.length;
      let totalsum = sum;
      while (sum > 0) {
        if (nodes[ind].open) {
          let x = fs.readdirSync(nodes[ind].uniqueValue, 'utf8').length;
          sum += x;
          totalsum += x;
        }
        sum--;
        ind++;
      }


      for (let i = ind; i < nodes.length; i++) {
        tmp[i - totalsum] = {};
        tmp[i - totalsum].val = nodes[i].uniqueValue;
        tmp[i - totalsum].depth = nodes[i].depth;
      }

      showFiles(tmp, openList);
    });
  }
}


function removeFocus() {
  nodes[nodeFocusNumber].elem.classList.remove('nodeElement-focus');
}
let isNodesFocused = 0;
let nodeFocusNumber = undefined;
