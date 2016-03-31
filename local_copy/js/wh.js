var WH = function () {

  function makeUnselectable(element) {
    element.className += ' unselectable';
    element.ondragstart = element.onselectstart = function (event) {
      event.preventDefault();
    };
  }

  function resize() {
    var videoWidth = Math.min(0.9 * (window.innerWidth - 20), 800),
        videoHeight = videoWidth * 9 / 16,
        iframes = document.getElementsByTagName('iframe'),
        i;
    for (i = 0; i < iframes.length; ++i) {
      if (iframes[i].className.indexOf('video') == -1) {
        continue;
      }
      iframes[i].style.width = videoWidth + 'px';
      iframes[i].style.height = videoHeight + 'px';
    }
  }

  function prepOtherAmount(container, prefix, suffix) {
    var input = container.getElementsByTagName('input')[0],
        link = container.getElementsByTagName('a')[0],
        spans = container.getElementsByTagName('span'),
        amountSpan,
        amount,
        i;
    for (i = 0; i < spans.length; ++i) {
      if (spans[i].className == 'amount') {
        amountSpan = spans[i];
        break;
      }
    }
    input.value = '';
    link.onclick = function () { return false; };
    container.oninput = container.onkeydown = container.onkeyup = function () {
      amount = parseInt(input.value, 10);
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
  }

  function load() {
    var divs = document.getElementsByTagName('div'),
        i;

    $('#donationBanner').click(function () {
      $('html, body').animate({
        scrollTop: $('#donations').offset().top
      }, 1000);
      window.history.pushState(null, null, window.location);
    });
    
    for (i = 0; i < divs.length; ++i) {
      if (divs[i].className.indexOf('button') != -1) {
        makeUnselectable(divs[i]);
      }
    }

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

    resize();
  }

  return {
    load: load,
    resize: resize
  };
}();

onload = WH.load;
onresize = WH.resize;
