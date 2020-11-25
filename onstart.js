onload = _ => {
  let elem = document.getElementById('loading_div');
  setTimeout(_=>{elem.remove();},100);
}
