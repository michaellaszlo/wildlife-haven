var WH = {};

function makeUnselectable(element) {
  element.className += ' unselectable';
  element.ondragstart = element.onselectstart = function (event) {
    event.preventDefault();
  };
}

WH.load = function () {
  var divs = document.getElementsByTagName('div');
  for (var i = divs.length - 1; i >= 0; --i) {
    if (divs[i].className.indexOf('button') != -1) {
      makeUnselectable(divs[i]);
    }
  }
};

window.onload = WH.load;
