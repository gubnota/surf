(function(w){var t = setInterval(function(){
var $ = w.jQuery;
if ($){
clearInterval(t);
     jQuery.extend(jQuery.fn, {
    compactLabel: function() {
      var form = jQuery(this);
      var inputs = form.find('input:text, input:password, input[type=email], input[type=number], textarea');
      inputs.each(function(){
        var field = jQuery(this);
        var show = jQuery(this).val() ? false : true;
        var label = field.prev();//form.find('label[for="' + field.attr('id') + '"]');
        jQuery(this).parents('.form-item:first').addClass('compact-label-wrap');
       if(label.hasClass('compact-label')) { // только с этим классом скрываем поле
            if(!show) label.hide();
            else label.show();
            label.addClass('compact-label');
            field.focus(function(){
                label.fadeOut(200);
            });
            field.blur(function(){
                if(!field.val())
                    label.fadeIn(200);
            });
       }
      });
    }
  });
      $('form').compactLabel();

  $(document).ready(function() {
    
        // $('.pp_region .webform-confirmation').livequery(function(){
        //     $(this).parents('.block-webform').addClass('block_confirm');
        // });
        
        $('.ico_close_ims').on('click,touchstart',function(){
            $('.pp_fon').hide();
            $('#block-views-task-block-1 .views-field-field-photo-2').hide();
        });
        $('.pp_fon').on('click,touchstart',function(){
            $('.pp_fon').hide();
            $('#block-views-task-block-1 .views-field-field-photo-2').hide();
            $('.pp_region .block-webform').hide();
        });
        // $('.pp_region .block-webform span.close').livequery(function(){
        //     $(this).on('click,touchstart',function(){
        //         $('.pp_fon').hide();
        //         $('.pp_region .block-webform').hide();
        //     });
        // });
        // $('.pp_region .block-webform span.close').on('click,touchstart',function(){
            // $('.pp_fon').hide();
            // $('.pp_region .block-webform').hide();
        // });
        // $('#block-block-3 .btn').on('click,touchstart',function(){
        //     $('.pp_region .pp_fon').show();
        //     $('.pp_region .block-webform#block-webform-client-block-21').show();
        // });
        $('#block-views-task-block-1 .views-field-field-photo-1 span.show_m, #block-views-task-block-1 .views-field-field-photo img').on('click,touchstart',function(){
            $(this).parents('.views-row').find('.pp_fon').show();
            $(this).parents('.views-row').find('.views-field-field-photo-2').show();
        });

        // $('#block-block-16 .btn').on('click,touchstart',function(){
        //     $('.pp_region .pp_fon').show();
        //     $('.pp_region .block-webform#block-webform-client-block-20').show();
        // });
        // $('.phone_bl .btn').on('click,touchstart',function(){
        //     $('.pp_region .pp_fon').show();
        //     $('.pp_region .block-webform#block-webform-client-block-19').show();
        // });
            
        // $('.block').bind('scrollSpy:enter', function(){
        //     $(this).addClass('block_in_focus was_in_focus');
        // }).bind('scrollSpy:exit', function(){
        //     $(this).removeClass('block_in_focus');
        //   });
        //   $.scrollSpy($('.block'));
        
        $(window).scroll(function(){
            var top = $(window).scrollTop();
            var win_h = $(window).height();
            var tp_block = $('#block-block-6');
            var cl_block = $('#block-block-11');
            var cl_block2 = $('#block-block-12');
            var cl_block3 = $('#block-block-13');
            if(tp_block.length && tp_block.hasClass('block_in_focus')) {
              var tp_block_h = tp_block.height();
              var tp_block_top = tp_block.offset().top;
              var tp_block_max_top = 994 - tp_block_h;
              var tp_block_perc =  Math.ceil((((top + win_h) - tp_block_top) / (win_h + tp_block_h)) * 100)/100;
              $chng = -(tp_block_max_top*(tp_block_perc));
                tp_block.find('.wrap').css({'background-position' : 'center ' + -(tp_block_max_top*(tp_block_perc)) + 'px'});
            }
            if(cl_block.length && cl_block.hasClass('block_in_focus')) {
              var cl_block_h = cl_block.height();
              var cl_block_top = cl_block.offset().top;
              var max_top = 975 - cl_block_h;
              var perc =  Math.ceil((((top + win_h) - cl_block_top) / (win_h + cl_block_h)) * 100)/100;
              cl_block.find('.wrap').css({'background-position' : 'center ' + -(max_top*(perc)) + 'px'});
            }
            if(cl_block2.length && cl_block2.hasClass('block_in_focus')) {
              var cl_block_h = cl_block2.height();
              var cl_block_top = cl_block2.offset().top;
              var max_top = 975 - cl_block_h;
              var perc =  Math.ceil((((top + win_h) - cl_block_top) / (win_h + cl_block_h)) * 100)/100;
              cl_block2.find('.wrap').css({'background-position' : 'center ' + -(max_top*(perc)) + 'px'});
            }
            if(cl_block3.length && cl_block3.hasClass('block_in_focus')) {
              var cl_block_h = cl_block3.height();
              var cl_block_top = cl_block3.offset().top;
              var max_top = 975 - cl_block_h;
              var perc =  Math.ceil((((top + win_h) - cl_block_top) / (win_h + cl_block_h)) * 100)/100;
              cl_block3.find('.wrap').css({'background-position' : 'center ' + -(max_top*(perc)) + 'px'});
            }
      });
  
      $(window).scroll();  
  });

if ($("#block-views-reviews-block-1 .jcarousel_wrapper li").size() > 2) {
if (!document.getElementById('carousel_script')) {
(function(f,e,n,k,i){
var n=e.createElement(n);
n.setAttribute('id','carousel_script');
n.async=true;
n.src=k;
if(typeof(IFrameWindowHelper) == 'undefined'){
n.onload = function(){
    $("#block-views-reviews-block-1 .jcarousel_wrapper").jCarouselLite({
        btnNext: "#block-views-reviews-block-1 .jcarousel-next",
        btnPrev: "#block-views-reviews-block-1 .jcarousel-prev",
        visible: 3,// can be fractional, how many frames visible at the same time
        speed: 1500, // auto scroll interval
        // auto: 6000
    });
};
}
(e[i]('head')[0] || e[i]('body')[0]).appendChild(n);
})(window,document,'script','/assets/js/jquery.jcarousellite.min.js','getElementsByTagName');
}
}// more than 3 reveiews need carousel


}},500);})(window);

(function(w){var t = setInterval(function(){
var $ = w.jQuery;
if ($ && $('.cme_form')){
clearInterval(t);
// вешаем событие на нажатие любой кнопки
$('.leave_enquiry_btn').on('click',function(e){
// выделяем блок где оба поля для копирования содержимого
var f = $(e.target).parent().parent();
var imya_id = f.find('input[name="submitted[vvedite_imya]"]').attr('id')||"",
tel_id = f.find('input[name="submitted[vvedite_telefon]"]').attr('id')||"",
imya = "", tel = "";
if (tel_id) {
$('.cme_form').find('input[type="text"]')[1].value = document.getElementById(tel_id).value;
}
if (imya_id) {
$('.cme_form').find('input[type="text"]')[0].value = document.getElementById(imya_id).value;
}
});
}},500);})(window);


(function(w){var t = setInterval(function(){
var $ = w.jQuery;
if ($){
clearInterval(t);
var officetimezone = 8,
date = new Date(), userhour = date.getHours(), // час в вашей зоне для даты date 
officehour = date.getUTCHours()+officetimezone, // час в зоне GMT+8 для даты date
diff = userhour-officehour,// нужно прибавить поправку к часам в офисе, чтобы получить локальное время
starthour=9,//время начала работы
endhour=18,//время конца работы
nextdate = 0,//идентификатор след.дня
selecthours='',//селекторы часов
timezone = new Date().getTimezoneOffset()/-60//
// diff = -15;
// console.log(officehour, endhour, diff, userhour, timezone);
if (officehour > endhour) {var fromhour = starthour; nextdate++;}
else {var fromhour = officehour;}
// if (endhour < fromhour) {fromhour = starthour;}
for (var i = fromhour; i < endhour; i++) {
if (i + diff > 23) {var curhour = diff + i - 24;}
else if (i + diff < 0) {var curhour = diff + i + 24;nextdate=0;}
else {var curhour = diff + i;}
 selecthours +='<option value="'+curhour+'">'+curhour+"</option>";
}

}},500);})(window);

// countdown
if (!document.getElementById('countdown_script')) {
(function(f,e,n,k,i){
var n=e.createElement(n);
n.setAttribute('id','countdown_script');
n.async=true;
n.src=k;
if(typeof(IFrameWindowHelper) == 'undefined'){
n.onload = function(){
    if($('.countdown_origin').length) {
            $('.countdown_origin').each(function(){
var now = new Date(), tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
count_to = new Date(tomorrow.getTime()+30*3600000);//parseInt($(this).text())*1000); 
                $(this).countdown({
                    until: count_to,
                    layout : $('.countdown_layout', $(this).parent()).html()
                });
            });
    }
};
}
(e[i]('head')[0] || e[i]('body')[0]).appendChild(n);
})(window,document,'script','/modules/countdown2/countdown/jquery.countdown.min.js','getElementsByTagName');
}

//////////////////////
// Плагин scroll-to-top
//////////////////////
(function(w){var t = setInterval(function(){var $ = w.jQuery; if ($){clearInterval(t);
  $.fn.scrollToTop = function() {
  $(this).hide().removeAttr("href");
  if ($(window).scrollTop() != "0") {
      $(this).fadeIn("slow")
  }
  var scrollDiv = $(this);
  $(window).scroll(function() {
      if ($(window).scrollTop() < 400) {
    $(scrollDiv).fadeOut("slow")
      } else {
    $(scrollDiv).fadeIn("slow")
      }
  });
  $(this).click(function() {
      $("html, body").animate({
    scrollTop: 0
      }, "slow")
  })
    };
///////////////////
$("#scroll-to-top").scrollToTop();
}},500);})(window);


//////////////////////
// Плагин through: добавляем классы в детей переданного объекта 
// когда блок в зоне отображения при прокручивании, иначе убираем их
//////////////////////
(function(w){var t = setInterval(function(){var $ = w.jQuery; if ($){clearInterval(t);
  $.fn.through = function(children,classes) {
  var scrollDiv = $(this),
  checker = function() {
    if ($(scrollDiv).length == 0) return [];
    if ($(scrollDiv).offset().top > $(window).scrollTop() + $(window).innerHeight() || 
      $(scrollDiv).offset().top + $(scrollDiv).innerHeight() < $(window).scrollTop()
    )// объект вне экрана: ниже или выше
    {
     var c = $(scrollDiv).find(children);
      return c.removeClass(classes);
    }
    else if (($(window).scrollTop()+$(window).innerHeight()/2) > 
        (($(scrollDiv).offset()||{}).top||0+$(scrollDiv).innerHeight()/2||0) && 
        !$($(scrollDiv).find(children)).hasClass(classes)) {// примерно по центру экрана объект
     var c = $(scrollDiv).find(children);
      return c.addClass(classes);
      }
    else {return $(this);}
  }; checker;
  $(window).scroll(checker);
    };
///////////////////
$("#logo-floater").through('#logo','animated slideInLeft');
$("#block-block-2").through('.row','animated zoomIn');
$("#block-block-9").through('.row','animated zoomIn');
$("#block-about").through('p,img','animated zoomIn');
$("header").through('.slog','animated zoomIn');
$(".wrap_count_down.first").through('.wrap_l','animated rotateIn');
$("#block-views-reviews-block-1").through('img','animated zoomIn');
$("#block-block-16").through('h2','animated zoomIn');
}},500);})(window);

// zoomIn animation
(function(w){var t = setInterval(function(){var $ = w.jQuery; if ($){clearInterval(t);
$('.slog,.rows .row,#block-about p,#block-about img,#block-block-11 .wrap_l,.wrapper .wrap_l,#block-views-reviews-block-1 img,#block-block-16 h2').addClass('animated zoomIn');
}},500);})(window);

//////////////////////
// Плагин doMouseEnterLeave: добавляем классы ParentClass в родитель и ChildClass 
// в потомка когда наводим (или тычем на touchscreen)
// убираем оба класса по времени / удалению курсора
//////////////////////
(function(w){var t = setInterval(function(){var $ = w.jQuery; if ($){clearInterval(t);
  $.fn.doMouseEnterLeave = function(Children, ParentClass, ChildClass) {
  var ParentObj = $(this).selector,
  hideline = function(e){
  $(ParentObj+' '+Children).removeClass(ChildClass);
  $(this).parent().removeClass(ParentClass);
  }
  handlerOut = function(e){
  setTimeout(function(a,b,c,d){$(a).removeClass(b);$(a+' '+c).removeClass(d)},1000, ParentObj, ParentClass, Children, ChildClass);
  },
  handlerIn = function(e){
  if ($(this).hasClass(ChildClass)) return;
  hideline(e);
  $(ParentObj).addClass(ParentClass);$(this).addClass(ChildClass);
  };
  $( ParentObj+' '+Children ).mouseenter( handlerIn );
  $( ParentObj ).mouseleave( handlerOut );
  $(ParentObj+' '+Children).bind('touchstart mouseclick mousemove', function(e) {
    $(e.target).trigger('mouseenter');
  });
  };
///////////////////
// (function(w){var t = setInterval(function(){var $ = w.jQuery; if ($){clearInterval(t);
$('.mouseoverlist').doMouseEnterLeave('.item', 'active', 'active');
}},500);})(window);
