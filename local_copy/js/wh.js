var WH = {};

function makeUnselectable(element) {
  element.className += ' unselectable';
  element.ondragstart = element.onselectstart = function (event) {
    event.preventDefault();
  };
}

WH.load = function () {
  $('#donationBanner').click(function () {
    $('html, body').animate({
      scrollTop: $('#donations').offset().top
    }, 1000);
    window.history.pushState(null, null, window.location);
  });
  var divs = document.getElementsByTagName('div');
  for (var i = divs.length - 1; i >= 0; --i) {
    if (divs[i].className.indexOf('button') != -1) {
      makeUnselectable(divs[i]);
    }
  }
  var prepOtherAmount = function (container, prefix, suffix) {
    var input = container.getElementsByTagName('input')[0],
        link = container.getElementsByTagName('a')[0],
        spans = container.getElementsByTagName('span'),
        amountSpan;
    for (var i = 0; i < spans.length; ++i) {
      if (spans[i].className == 'amount') {
        amountSpan = spans[i];
        break;
      }
    }
    input.value = '';
    link.onclick = function () { return false; };
    container.oninput = container.onkeydown = container.onkeyup = function () {
      var amount = parseInt(input.value, 10);
      if (amount !== amount || amount < 1) {
        amountSpan.innerHTML = '';
        link.href = '';
        link.onclick = function () { return false; };
      } else {
        amountSpan.innerHTML = amount;
        link.href = prefix + amount + suffix;
        link.onclick = function () { return true; };
      }
    };
  };
  prepOtherAmount(
      document.getElementById('otherMonthly'),
      'https://www.paypal.com/cgi-bin/webscr?' + 
          'cmd=_xclick-subscriptions&business=joyswildlifehaven@gmail.com' +
          '&currency_code=CAD&lc=CA&a3=',
      '&p3=12&t3=M&src=1&no_note=1' +
          '&item_name=Donation%20to%20Wildlife%20Haven%20Waterloo'
  );
  prepOtherAmount(
      document.getElementById('otherSingle'),
      'https://www.paypal.com/cgi-bin/webscr?cmd=_donations' +
          '&business=joyswildlifehaven@gmail.com&amount=',
      '&currency_code=CAD&lc=CA' +
          '&item_name=Donation%20to%20Wildlife%20Haven%20Waterloo'
  );
};

window.onload = WH.load;
