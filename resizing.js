let onresize = e => {

  style.top = 30 + 'px';
  style.left = mainTreeNode.offsetWidth + 2 + 'px';
  style.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";
  style.height = window.visualViewport.height + "px";

  topBar.style.top = '0px';
  topBar.style.left = mainTreeNode.offsetWidth - 1 + 'px';
  topBar.style.height = 30 + 'px';
  topBar.style.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";


  mainTreeNode.style.height = style.height;
  setTimeout(_=>{mainTreeNode.style.height = window.visualViewport.height + "px";}, 50);


  /*if (areBothShown == 1) {
    style.height = window.visualViewport.height / 2 + "px";
  }

  styleSecond.left = mainTreeNode.offsetWidth - 1 + 'px';
  styleSecond.top = window.visualViewport.height / 2 + 'px';
  styleSecond.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";
  styleSecond.height = window.visualViewport.height / 2 + "px";
  */

  terminal.style.left = mainTreeNode.offsetWidth + 1 + 'px';
  terminal.style.top = window.visualViewport.height / 2 + 'px';
  terminal.style.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";
  terminal.style.height = window.visualViewport.height / 2 + "px";
};

window.addEventListener("resize", onresize);
