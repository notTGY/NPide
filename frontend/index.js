onresize = _=> {
  let elems = document.getElementsByClassName('page');
  for (let i = 0; i < elems.length; i++) {
    elems[i].style.height = window.visualViewport.height + 'px';
  }
};
onload = onresize;
