$('.companycarousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})


const nextIcon = '<img src="./img/right-indicate.png">';
const prevIcon = '<img src="./img/left-indicate.png">';

$('.testiCarousel').owlCarousel({
    loop:true,
    dots: false,
    autoplay:true,
    margin:10,
    nav:true,
    navText: [
        prevIcon,
        nextIcon
    ],
    URLhashListener:true,
    autoplayHoverPause:true,
    startPosition: 'URLHash',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})



// Accordion Script
$(document).ready(function() {

    $(".toggle-accordion").on("click", function() {
      var accordionId = $(this).attr("accordion-id"),
        numPanelOpen = $(accordionId + ' .collapse.in').length;
      
      $(this).toggleClass("active");
  
      if (numPanelOpen == 0) {
        openAllPanels(accordionId);
      } else {
        closeAllPanels(accordionId);
      }
    })
  
    openAllPanels = function(aId) {
      console.log("setAllPanelOpen");
      $(aId + ' .panel-collapse:not(".in")').collapse('show');
    }
    closeAllPanels = function(aId) {
      console.log("setAllPanelclose");
      $(aId + ' .panel-collapse.in').collapse('hide');
    }
       
  });

  $(document).ready(function() {
    $(window).on('scroll', function() {
      if (Math.round($(window).scrollTop()) > 100) {
        $('.navbar').addClass('scrolled');
      } else {
        $('.navbar').removeClass('scrolled');
      }
    });
  });


  var btn = $('#BackTobutton');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


//Play Button 

$(document).ready(function(){
  $('.fancybox').fancybox({
    padding: 0,
    maxHeight: 444,
    afterLoad: function() {
      $('<div>')
        .attr('class', 'prefooter-btn')
        .data('ct-checkout', 'vidalife.kiba-camera')
        .text('Pre-Order Now')
        .appendTo(this.wrap[0]);
    }    
  });
  
});




