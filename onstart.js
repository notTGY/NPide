onload = _ => {
  let elem = document.getElementById('loading_div');
  setTimeout(_=>{elem.remove();onresize();},100);
  isCtrl = isShift = 0;
}
