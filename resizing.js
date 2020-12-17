let onresize = e => {

  style.top = 33 + 'px';
  style.left = mainTreeNode.offsetWidth + 2 + 'px';
  style.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";
  style.height = window.visualViewport.height - 33 + "px";

  topBar.style.top = '0px';
  topBar.style.left = mainTreeNode.offsetWidth - 1 + 'px';
  topBar.style.height = 30 + 'px';
  topBar.style.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";


  mainTreeNode.style.height = window.visualViewport.height + "px";

  terminal.style.zIndex = 100;
  terminal.style.left = mainTreeNode.offsetWidth + 1 + 'px';
  terminal.style.top = window.visualViewport.height / 2 + 'px';
  terminal.style.width = window.visualViewport.width-mainTreeNode.offsetWidth + 1 + "px";
  terminal.style.height = window.visualViewport.height / 2 + "px";
};

window.addEventListener("resize", onresize);
