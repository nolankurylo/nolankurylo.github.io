$(".intro-start").click(function() {
  $("html, body").animate({ scrollTop: $("#about-section").offset().top  }, 1000);
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

  if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
    $('.interest-hockey').hover(function () {
      $('.interest-hockey.section-container').toggleClass('two-is-active');
    });
    $('.interest-health').hover(function () {
      $('.interest-health.section-container').toggleClass('two-is-active');
    });
    $('.interest-projects').hover(function () {
      $('.interest-projects.section-container').toggleClass('two-is-active');
    });
    $('#nolan-svg').removeAttr('transform')
    $('#nolan-svg').attr('transform', 'translate(0,-150)')
  }
  
  
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('.section-container').addClass('two-is-active');
    $('#nolan-svg').removeAttr('transform')
    $('#nolan-svg').attr('transform', 'translate(0,100)')
  }
  if (/iPad/i.test(navigator.userAgent)) {
  
    $('#nolan-svg').removeAttr('transform')
    $('#nolan-svg').attr('transform', 'translate(0,-100)')
  }
});

