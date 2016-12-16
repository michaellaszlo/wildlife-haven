var WH = function () {
  'use strict';

  function makeUnselectable(element) {
    element.className += ' unselectable';
    element.ondragstart = element.onselectstart = function (event) {
      event.preventDefault();
    };
  }

  function prepTicketButtons() {
    var ticketPrice = 15,
        container = $('#tickets'),
        quantity = container.find('.number'),
        suffix = container.find('.suffix'),
        minus = container.find('.button.minus'),
        plus = container.find('.button.plus'),
        dollars = container.find('.amount'),
        link = container.find('a');
    function buildUrl(count) {
      var url;
      url = 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick' +
          '&business=joyswildlifehaven@gmail.com&quantity=' + count +
          '&amount=' + ticketPrice + '&currency_code=CAD&lc=CA' +
          '&item_name=Ticket' + (count == 1 ? '' : 's') +
          '%20for%20The%20Messenger,%20June%2016';
      return url;
    }
    minus.click(function () {
      var count = parseInt(quantity.html(), 10) - 1;
      if (count < 1) {
        return;
      }
      link.attr('href', buildUrl(count));
      quantity.html(count);
      dollars.html(count * ticketPrice);
      if (count == 1) {
        minus.addClass('disabled');
        suffix.html('');
      }
    });
    plus.click(function () {
      var count = parseInt(quantity.html(), 10) + 1;
      link.attr('href', buildUrl(count));
      quantity.html(count);
      dollars.html(count * ticketPrice);
      suffix.html('s');
      minus.removeClass('disabled');
    });
  }

  function prepOtherAmount(container, prefix, suffix) {
    var input = $(container).find('input')[0],
        link = $(container).find('a')[0],
        tip,
        tipOpacity,
        tipStartFade,
        amountSpan,
        amount,
        i;
    function fadeTip() {
      tipOpacity = Math.max(0,
          Math.min(1, 2.5 - (Date.now() - tipStartFade) / 1000));
      tip.style.opacity = tipOpacity;
      if (tipOpacity > 0) {
        requestAnimationFrame(fadeTip);
      }
    }
    function startFadeTip(){
      if (tip) {
        tipStartFade = Date.now();
        tip.style.display = 'inline';
        tip.style.opacity = 1;
        fadeTip();
      }
      return false;
    }
    $(container).find('div.tip').each(function () {
      tip = this;
      tip.style.left = input.offsetLeft + (input.offsetWidth -
          tip.offsetWidth) / 2 + 'px';
      tip.style.top = input.offsetTop + input.offsetHeight + 'px';
    });
    amountSpan = $(container).find('span.amount')[0];
    input.value = '';
    link.onclick = startFadeTip;
    container.oninput = container.onkeydown = container.onkeyup = function () {
      amount = parseInt(input.value, 10);
      if (amount !== amount || amount < 1) {
        amountSpan.innerHTML = '';
        link.href = '';
        link.onclick = startFadeTip;
      } else {
        amountSpan.innerHTML = amount;
        link.href = prefix + amount + suffix;
        link.onclick = function () { return true; };
      }
    };
  }

  function load() {
    $('#donationBanner').click(function () {
      $('html, body').animate({
        scrollTop: $('#donations').offset().top
      }, 1000);
      window.history.pushState(null, null, window.location);
    });

    $('div .button').each(function () {
      makeUnselectable(this);
    });

    prepTicketButtons();

    prepOtherAmount(
        document.getElementById('otherMonthly'),
        'https://www.paypal.com/cgi-bin/webscr?' + 
            'cmd=_xclick-subscriptions&business=joyswildlifehaven@gmail.com' +
            '&currency_code=CAD&lc=CA&a3=',
        '&p3=1&t3=M&src=1&srt=12&no_note=1' +
            '&item_name=Donation%20to%20Wildlife%20Haven%20Waterloo'
    );
    prepOtherAmount(
        document.getElementById('otherSingle'),
        'https://www.paypal.com/cgi-bin/webscr?cmd=_donations' +
            '&business=joyswildlifehaven@gmail.com&amount=',
        '&currency_code=CAD&lc=CA' +
            '&item_name=Donation%20to%20Wildlife%20Haven%20Waterloo'
    );
  }

  return {
    load: load
  };
}();

onload = WH.load;
