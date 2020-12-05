let topBar = document.getElementById('topBar');

let openFiles = [];
let currentFocus = undefined;


if (openFiles.length == 0) {
  topBar.innerHTML = '<pre>     </pre>empty';
}

topBar.addEventListener('wheel', e=> {
  topBar.scrollLeft += e.deltaY;
});

function putFile(p) {
  if (topBar.innerHTML == '<pre>     </pre>empty') {
    topBar.innerHTML = '';
  }
  let condition = -1;
  openFiles.forEach((item, i) => {
    if (item.path == p) {
      condition = i;
    }
  });
  if (condition == -1) {
    let index = openFiles.length;
    openFiles[index] = {path: p, text: path.basename(p)};
    currentFocus = index;
    openFiles[index].elem = document.createElement('div');
    openFiles[index].button = document.createElement('img');
    openFiles[index].button.src = './assets/icons/cross.png';
    openFiles[index].button.style.marginLeft = '10px';
    openFiles[index].button.style.width = '15px';
    openFiles[index].elem.classList.add('barElement');
    openFiles[index].elem.innerHTML = openFiles[index].text + ' ';


    topBar.appendChild(openFiles[index].elem);
    openFiles[index].elem.appendChild(openFiles[index].button);

    openFiles[index].button.onclick = _=> {
      removeFile(openFiles[index].path);
      if (openFiles.length == 0) {
        topBar.innerHTML = '<pre>     </pre>empty';
      }
    };

    openFiles[index].elem.onclick = _=> {
      saveCurrentFile();
      sourcePath = openFiles[index].path;
      fs.readFile(openFiles[index].path, 'utf-8', async (err, data) => {
        if (err) {
            throw err;
        }
        tarea.setValue(data);
      });
    };

  } else {
    let tmp = openFiles[0];
    openFiles[0] = openFiles[condition];
    openFiles[condition] = tmp;
    openFiles.forEach((item, i) => {
      item.elem.remove();
    });
    openFiles.forEach((item, i) => {

      topBar.appendChild(item.elem);
      item.elem.appendChild(item.button);

      item.button.onclick = _=> {
        removeFile(item.path);
      }
      item.elem.onclick = _=> {
        saveCurrentFile();
        sourcePath = item.path;
        fs.readFile(item.path, 'utf-8', async (err, data) => {
          if (err) {
              throw err;
          }
          tarea.setValue(data);
        });
      };
    });
  }
}


function removeFile(p) {
  let condition = -1;
  openFiles.forEach((item, i) => {
    if (item.path == p) {
      condition = i;
    }
  });
  if (condition != -1) {
    openFiles[condition].elem.remove();
    if (openFiles.length == 0) {
      topBar.innerHTML = '<pre>     </pre>empty';
    }
  }
}
