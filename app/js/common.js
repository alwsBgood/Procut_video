if (localStorage.name && localStorage.email && localStorage.phone) {
  $('input[name="entry.397525899"]').val(localStorage.name);
  $('input[type="email"]').val(localStorage.email);
  $('input[type="tel"]').val(localStorage.phone);
}

function get_cookie ( cookie_name ){
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

$(function() {
  $("[name=send]").click(function () {
    $(":input.error").removeClass('error');
    $(".allert").remove();

    var error = 0;
    var btn = $(this);
    var form = btn.closest('form');
    var validaton = btn.closest('form').find('[required]');
    var msg = btn.closest('form').find('input, textarea, select');
    var send_btn = btn.closest('form').find('[name=send]');
    var send_options = btn.closest('form').find('[name=campaign_token]');
    var gd_send_adress = btn.closest('form').find('[name=gd_send_adress]').val();

    localStorage.name = form.find('input[name="entry.397525899"]').val();
    localStorage.email = form.find('input[type="email"]').val();
    localStorage.phone = form.find('input[type="tel"]').val();

    var href = document.location.href;
    var new_url = href.split('?')[1];
    var ref = '&ref=' + document.referrer;
    var id = 'procut_kids_mc';
    var url = href.split('?')[0];
    var utm_catch = '&' + new_url + "&page_url=" + url;
    var leade_name = btn.closest('form').find('[name=name]').val();
    var lead_price = "&lead_price=" + $('#price').html();
    var invite_id = "&invite_id="+href.split('invite_id=')[1];
    var cook_ga;
    var hmid;


    $(validaton).each(function() {
      if ($(this).val() == '') {
        var errorfield = $(this);
        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg></div>');
        error = 1;
        $(":input.error:first").focus();
        return;
      } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if ($(this).attr("type") == 'email') {
          if(!pattern.test($(this).val())) {
            $("[name=email]").val('');
            $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg></div>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
        var patterntel = /^()[- +()0-9]{9,18}/i;
        if ( $(this).attr("type") == 'tel') {
          if(!patterntel.test($(this).val())) {
            $("[name=phone]").val('');
            $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите номер телефона в формате +3809999999</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg></div>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
      }
    });
    if(!(error==1)) {
      $(send_btn).each(function() {
        $(this).attr('disabled', true);
      });
      // var loc = ymaps.geolocation.city+', '+ymaps.geolocation.region+', '+ymaps.geolocation.country;

      $.get("http://ipinfo.io", function(response) {
       $('.geoloc').val(response.city + ', ' + response.country)
      }, "jsonp");

      var ga = get_cookie('_ga');
      if (ga === null) {
        console.log('111');
      }
      else {
        cook_ga = "&_ga="+get_cookie('_ga');
        var hmid = cook_ga.split('.')[2]+'.'+cook_ga.split('.')[3];
      }
      // form.find('.geoloc').val(loc);
      var data = form.serialize();
      var data_form = form.attr('data-form');
      var temp_date = new Date();
      var temp_month = temp_date.getMonth();
      temp_month++;
      var date_submitted = '&date_submitted=' +temp_date.getDate()+" "+temp_month+" " +temp_date.getFullYear();
      var time_submitted = '&time_submitted=' +temp_date.getHours() + ":" +temp_date.getMinutes();
      data += utm_catch;
      data += date_submitted;
      data += time_submitted;
      data += ref;
      data += cook_ga;
      data += leade_name;
      data += '&data_form=' + data_form;
      data += '&hmid=' + hmid;
      $.ajax({
        type: "GET",
        url: "register_mail.php",
        data: data,
        beforeSend: function() {
          form.find('button').prop( "disabled", true ).text('');
          form.find('.spinner').fadeIn();
          console.log(data);
        },
        success: function() {
          console.log('register_mail ok!');
        }
      });
      $.ajax({
        type: "POST",
        url: gd_send_adress,
        data: msg,
        error: function(xhr, str) {
          console.log('google_doc ok!');
        }
      });
      // $.ajax({
      //   type: 'POST',
      //   url: 'mail.php',
      //   data: msg,
      // });
      // $.ajax({
      //   type: 'POST',
      //   url: '//procut.us8.list-manage.com/subscribe/post?u=1e626788e6127a795fec70e41&amp;id=346125971d',
      //   data: msg,
      // });
      $.ajax({
        type: "POST",
        url:"amo/amocontactlist.php",
        data: data,
        success: function() {
          console.log('amo ok!');
          form.find('.spinner').fadeOut();
          // dataLayer.push({'event': 'FormSubmit', 'form_type': data_form});
          setTimeout(function() {
            form.find('button').text('✔ Отправлено');
          }, 350);
           setTimeout(function() {
              window.location = "http://procut.com.ua/videomaking/success/"
          }, 1500);
        }
      });
    }
    return false;
  })
});


 // Smooth scroll to anchor

 $('.scroll').click(function(){
  $('html, body').animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 1000);
  return false;
});


//  INPUT TEL MASK

jQuery(function($){
 $("input[type='tel']").mask("+38 (099) 999-9999");
});


// Scroll BAR

$(window).scroll(function() {
  // calculate the percentage the user has scrolled down the page
  var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());

  $('.bar-long').css('width', scrollPercent +"%"  );

});


//YOUTUBE

$(function() {
  $(".youtube").each(function() {
    $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

    $(this).append($('<div/>', {'class': 'play'}));

    $(document).delegate('#'+this.id, 'click', function() {
      var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
      if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

      var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

      $(this).replaceWith(iframe);
    });
  });
});

//  UP BUTTON

$( document ).ready(function() {
  $('#scrollup img').mouseover( function(){
    $( this ).animate({opacity: 0.65},100);
  }).mouseout( function(){
    $( this ).animate({opacity: 1},100);
  });

  $(window).scroll(function(){
    if ( $(document).scrollTop() > 0 ) {
      $('#scrollup').fadeIn('slow');
    } else {
      $('#scrollup').fadeOut('slow');
    }
  });

  $('#scrollup').click(function() {
    $('body,html').animate({scrollTop:0},1000);
  });
});

// PREVENT SCROLLING

$('.md-trigger').click(function() {
  $("body").addClass('unscroll');
});

$('.md-close').click(function() {
  $("body").removeClass('unscroll');
});

$('.md-overlay').click(function() {
  $("body").removeClass('unscroll');
});


//Sliders

$(document).ready(function() {
  $('.slider').slick({
    slidesToShow: 1,
    dots: true,
    arrows: true,
    fade: true,
    slidesToScroll: 1,
    adaptiveHeight: true,
    customPaging : function(slider, i) {
      var thumb = $(slider.$slides[i]).data();
      return '<a>0' + (i+1) + '</a>';
    },
  });
});

$(document).ready(function() {
  $('.slider_12').slick({
    slidesToShow: 1,
    dots: false,
    arrows: false,
    slidesToScroll: 1,
    asNavFor: '.slider_12-control',
  });
});


$(document).ready(function() {
  $('.slider_12-control').slick({
    slidesToShow: 1,
    dots: true,
    arrows: true,
    fade: true,
    slidesToScroll: 1,
    asNavFor: '.slider_12',

    customPaging : function(slider, i) {
      var thumb = $(slider.$slides[i]).data();
      return '<a>0' + (i+1) + '</a>';
    }
  });
});


// Lines move

$('body').mousemove(function( e ) {
  var y = e.pageY;
  $('.line').css({
    willchange: 'transform',
    transform: 'translate(0, ' + y + 'px)'
  });;
  if(y>950){
    $('.line').addClass('purple');
  } else{
    $('.line').removeClass('purple');
  }
});


// Menu

$(window).scroll(function(){
  if ( $(document).scrollTop() > 350 && $(document).width() > 1200) {
    $('.menu').fadeIn('slow');
  } else {
    $('.menu').fadeOut('slow');
  }
});

  // waypoint

$('#sec_01').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(1)").addClass('active');
  },
  {offset: "-10px"}
);

$('#sec_02').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(2)").addClass('active');
    $("nav ul p").addClass('visible');
    setTimeout(function() {
      $("nav ul p").removeClass('visible');
      $('.menu').css('opacity', '.4');
    }, 3000);
  },
  {offset: "100px"}
);

$('#sec_03').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(3)").addClass('active');
  },
  {offset: "500px"}
);

$('#sec_04').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(4)").addClass('active');
  },
  {offset: "400px"}
);

$('#sec_05').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(5)").addClass('active');
  },
  {offset: "400px"}
);

$('#sec_06').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(6)").addClass('active');
  },
  {offset: "400px"}
);

$('#sec_07').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(7)").addClass('active');
  },
  {offset: "400px"}
);

$('#sec_08').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(8)").addClass('active');
  },
  {offset: "400px"}
);

$('#sec_09').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(9)").addClass('active');
  },
  {offset: "400px"}
);

$('#sec_10').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(10)").addClass('active');
  },
  {offset: "1400px"}
);

$('#sec_11').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(11)").addClass('active');
  },
  {offset: "1500px"}
);

$('#sec_12').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(12)").addClass('active');
  },
  {offset: "1600px"}
);

$('#sec_13').waypoint(
  function() {
    $("nav ul li").removeClass('active');
    $("nav ul li:nth-child(13)").addClass('active');
  },
  {offset: "1700px"}
);