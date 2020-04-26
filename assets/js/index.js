$(".intro-start").click(function() {
  $("html, body").animate({ scrollTop: $("#card-1").offset().top  }, 1000);
});


AOS.init();

$(document).ready(function () {
  var sideslider = $('[data-toggle=collapse-side]');
  var sel = sideslider.attr('data-target');
  var sel2 = sideslider.attr('data-target-2');
  sideslider.click(function (event) {
    $(sel).toggleClass('in');
    $(sel2).toggleClass('out');
    $('.navbar-toggler').toggleClass('collapsed')
    $('.body').toggleClass('hidden')
    $('footer').toggleClass('hidden')
    $('html body').toggleClass('lock-scroll')
  });
});