var App = {
    Events:{'uri':document.location.pathname},//хранение событий на странице - какие триггеры уже сработали
    Ajax://свойство объекта, содержащее все функции для вызова ajax-загрузки страницы
    {
    // значение по умолчанию
    options: {
    //urls
    siteurl: "http://"+document.domain,
    home: "http://"+document.domain,
    //Search Class
    search_class: 'input_search',
    reloadDocumentReady: false,
    isLoad: false,
    started: false,
    searchPath: null,
    //Content ID
    content: 'content',
    //Ignore List - this is for travisavery who likes my comments... hello
    ignore:["#","/wp-",".pdf",".zip",".rar",".jpg",".JPG",".jpeg",".png",".gif","/feed",".xls"],
    //Shall we take care of analytics?
    track_analytics: false,
    //Various options and settings
    scroll_top: true,
    //Maybe the script is being a tw**? With this you can find out why...
    warnings: 0,
    loadingsrc: '/tpl/default/img/loading.gif',
    loadingdivid:'ajaxLoadDivElement',
},
// изменяем параметры
    edit: function(params){
        // актуальные настройки,глобальные
        var options = this.options;
        for (var key in params){
            options[key] = params[key];
         }
         this.options = options;
        return this;
    },
// объект, содержащий все нужные для работы приложения функции
	init: function(params){
        // актуальные настройки, глобальные
        var options = this.options;
		for (var key in params){
		 	options[key] = params[key];
		 }
         this.options = options;
        return this.onload();
	},
    onload:function(params){
        App.Ajax.options.loadingIMG = jQuery('<img/>').attr('src', App.Ajax.options.loadingsrc);
        App.Ajax.options.loadingDIV = jQuery('<div/>').attr('style', 'display:none;').attr('id', App.Ajax.options.loadingdivid);
        //this.loadingIMG.appendTo('body');
        App.Ajax.options.loadingDIV.appendTo('#'+App.Ajax.options.loadingdivid);
        //Loading/Error Code
        //now using json_encode - two birds one bullet.
        var str = "<center>\r\n\t<p style=\"text-align: center !important;\">Загрузка...<\/p>\r\n\t<p style=\"text-align: center !important;\">\r\n\t\t<img src=\"{loader}\" border=\"0\" alt=\"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430\" title=\"Загрузка...\" \/>\r\n\t<\/p>\r\n<\/center>";
        App.Ajax.options.loading_code = str.replace('{loader}', App.Ajax.options.loadingIMG.attr('src'));
        str = "<center>\r\n\t<p style=\"text-align: center !important;\">Ошибка!<\/p>\r\n\t<p style=\"text-align: center !important;\">\r\n\t\t<font color=\"red\">Не удалось загрузить страницу.<\/font>\r\n\t<\/p>\r\n<\/center>";
        App.Ajax.options.loading_error_code = str.replace('{loader}', App.Ajax.options.loadingIMG.attr('src'));

        window.onpopstate = function(event) {
            if (App.Ajax.options.started === true && App.Ajax.check_ignore(document.location.toString()) == true) {
                App.Ajax.loadPage({url:document.location.toString(),push: 1});
            }
        };//событие кнопки назад сработает только уже после однократного применения ajax-загрузки 

        return this;
    },
loadPage: function (params) {
App.Events = {'uri':document.location.pathname};
//    options.url, push, getData, e, method;
// актуальные настройки, глобальные
var options = {url:'/',push:0, getData: "",e:undefined,method:"GET"};
for (var key in params){
    options[key] = params[key];
}
    if (App.Ajax.options.warnings == true)
        console.log({'loadPage':App.Ajax.options.isLoad});
    if (!App.Ajax.options.isLoad) {
        if (App.Ajax.options.scroll_top == true) {
            jQuery('html,body').animate({
                scrollTop: 0
            }, 1500);
        }
        App.Ajax.options.isLoad = true;
        App.Ajax.options.started = true;
        if (options.url.lastIndexOf('?_=')>0) options.url = options.url.slice(0,options.url.lastIndexOf('?_='));
        if (options.url.substr(options.url.length - 1) == '/' && options.url.substr(options.url.length - 2, 1) == '/') options.url = options.url.substr(0, options.url.length - 1);
        nohttp = options.url.replace("http://", "").replace("https://", "");
        firstsla = nohttp.indexOf("/");
        pathpos = options.url.indexOf(nohttp);
        path = options.url.substring(pathpos + firstsla);
        if (options.push != 1) {
            if (typeof window.history.pushState == "function") {
                var stateObj = {
                    foo: 10000 + Math.random() * 10001
                };
                history.pushState(stateObj, "ajax page loaded...", path);
            } else {}
        }
        if (!jQuery('#' + App.Ajax.options.content)) {
    if (App.Ajax.options.warnings == true) console.log('! content return false;');
            return false;
        }
        if (App.Ajax.options.warnings == true)
        console.log({'loadPage before fadeOut':App.Ajax.options.content});
        jQuery('#' + App.Ajax.options.content).fadeOut("slow", function() {
    if (App.Ajax.options.warnings == true) console.log('fadeOut');
            var prev_content = document.getElementById(App.Ajax.options.content).innerHTML;
            document.getElementById(App.Ajax.options.content).innerHTML = App.Ajax.options.loading_code;            
            jQuery('#' + App.Ajax.options.content).fadeIn("slow", function() {
            if (App.Ajax.options.warnings == true) console.log('fadeIn');
                jQuery.ajax({
                    type: options.method,
                    url: options.url,
                    data: options.getData,
                    cache: false,
                    dataType: "html",
                    done: function(data, textStatus, jqXHR) {
                if (App.Ajax.options.warnings == true) console.log({'jQuery.ajax done':[data, textStatus, jqXHR]});
                        App.Ajax.options.isLoad = false;
                    },
                    fail: function(data, textStatus, jqXHR) {
                if (App.Ajax.options.warnings == true) console.log({'jQuery.ajax fail':[data, textStatus, jqXHR]});
                        App.Ajax.options.isLoad = false;
                    },
                    success: function(data) {
                if (App.Ajax.options.warnings == true) console.log({'jQuery.ajax success':data});
                        App.Ajax.options.isLoad = false;
                        datax = data.split('<title>');
                        titlesx = data.split('</title>');
                        if (datax.length == 2 || titlesx.length == 2) {
                            data = data.split('<title>')[1];
                            titles = data.split('</title>')[0];
                        jQuery(document).attr('title', (jQuery("<div/>").html(titles).text()));
                        if(typeof titles=="undefined")titles='';
                        if(typeof options.getData=="undefined"){options.getData='';} else {options.getData='?'+options.getData;}
                        } else {}
                        if (App.Ajax.options.track_analytics == true) {
                            if(typeof _paq!="undefined"){
                            _paq.push(['setCustomUrl', path+options.getData]);//, titles
                            _paq.push(['trackPageView']);
                            }
                            if(typeof ga!="undefined"){
                            ga('send', 'pageview', path+options.getData);
                            }
                            if(typeof _yaq!="undefined"){
                            _yaq.hit(path+options.getData,titles);
                            }
                        }
                        try {
                            App.Ajax.data_code(data);
                        } catch (err) {}
                        data = data.split('id="' + App.Ajax.options.content + '"')[1];
                        data = data.substring(data.indexOf('>') + 1);
                        var depth = 1;
                        var output = '';
                        while (depth > 0) {
                            temp = data.split('</div>')[0];
                            i = 0;
                            pos = temp.indexOf("<div");
                            while (pos != -1) {
                                i++;
                                pos = temp.indexOf("<div", pos + 1);
                            }
                            depth = depth + i - 1;
                            output = output + data.split('</div>')[0] + '</div>';
                            data = data.substring(data.indexOf('</div>') + 6);
                        }
                        document.getElementById(App.Ajax.options.content).innerHTML = output;
                        jQuery('#' + App.Ajax.options.content).css("position", "absolute");
                        jQuery('#' + App.Ajax.options.content).css("left", "20000px");
                        jQuery('#' + App.Ajax.options.content).show();
                        App.Ajax.loadPageInit("#" + App.Ajax.options.content + " ");
                        if (App.Ajax.options.reloadDocumentReady == true) {
                            jQuery(document).trigger("ready");
                        }
                        try {
                            App.Ajax.reload_code(path);
                        } catch (err) {}
                        jQuery('#' + App.Ajax.options.content).hide();
                        jQuery('#' + App.Ajax.options.content).css("position", "");
                        jQuery('#' + App.Ajax.options.content).css("left", "");
                        jQuery('#' + App.Ajax.options.content).fadeIn("slow", function() {});
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    if (App.Ajax.options.warnings == true) console.log({'jQuery.ajax error':[jqXHR, textStatus, errorThrown]});
                        App.Ajax.options.isLoad = false;
                        if (typeof ('$.fn.jGrowl') != 'undefined') $.jGrowl("Ошибка загрузки страницы "+options.url,{theme:'yellow',position:'top-left'});
                        document.getElementById(App.Ajax.options.content).innerHTML = '<h1>Страница не существует</h1>';
                    }
                });//ajax
            });//fadeIn
        });//fadeOut
    }//!isLoad
},
        loadPageInit: function (scope) {
            jQuery(scope + "a").click(function(event) {
                if (this.href.indexOf(App.Ajax.options.home) >= 0 && App.Ajax.check_ignore(this.href) == true) {
                    event.preventDefault();
                    this.blur();
                    var caption = this.title || this.name || "";
                    var group = this.rel || false;
                    try {
                        App.Ajax.click_code(this);
                    } catch (err) {
                        if (App.Ajax.options.warnings == true) {
                            txt = "ERROR: \nThere was an error with click_code.\n";
                            txt += "Error description: " + err.message;
                            console.log(txt);
                        }
                    }
                    App.Ajax.loadPage({url:this.href});
                }
            });
            jQuery('.' + App.Ajax.options.search_class).each(function(index) {
                if (jQuery(this).attr("action")) {
                    App.Ajax.options.searchPath = jQuery(this).attr("action");
                    jQuery(this).submit(function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        App.Ajax.submitSearch(jQuery(this).serialize());
                        App.Track.custom_event_handler(e,this,'search');
                    });
                } else {}
            });
            if (jQuery('.' + App.Ajax.options.search_class).attr("action")) {} else {}
            return this;
        },//loadInit

    set_watchers: function(){
        // отслеживаем событие наведения курсора в добавлениях
    $(document).on('mouseenter',".adds_container " + "a", function(event) {App.Track.adds_event_handler(event,this);});

    // отслеживаем событие нажатия в добавлениях
    $(document).on('click',".adds_container " + "a", function(event) {App.Track.adds_event_handler(event,this);});

    // отслеживаем событие нажатия на feedback
    $(document).on('click',"#viewform", function(event) {App.Track.custom_event_handler(event,this,'feedback');});

    // отслеживаем событие нажатия на feedback_form
    $(document).on('click',".cme_btn", function(event) {App.Track.custom_event_handler(event,this,'feedback_form');});

    // отслеживаем событие нажатия на navigation
    $(document).on('click','#scroll-to-top,.postNavigation.nextPostBox,.postNavigation.prevPostBox', function(event) {App.Track.custom_event_handler(event,this,'navigation');});
    return this;
    },//set_watchers

        submitSearch: function (param) {
            if (!App.Ajax.options.isLoad) {
                this.loadPage({url:App.Ajax.options.searchPath,push:0,getData:param});
            }
        },

        check_ignore: function (url) {
            for (var i in App.Ajax.options.ignore) {
                if (url.indexOf(App.Ajax.options.ignore[i]) >= 0) {
                    return false;
                }
            }
            return true;
        },

        reload_code: function (path) {
         var p = $(window).width();
 VK.Widgets.Group("vk_groups", {mode: 0, width: (p-60)/4, height: "216"}, window.app.ds.vk_gr);
 if ($('#vk_comments').length>0)
         VK.Widgets.Comments("vk_comments", {limit: 5, width: (p-60)*3/4, attach: "*"}, document.domain+path);
     if ($('#vk_like').length>0){
         VK.Widgets.Like("vk_like", {type: "button",verb:1,pageUrl:document.domain+path,text:$($('h1')[1]).text()||''});
     }
// VK.Api.call('widgets.getComments',
// {widget_api_id:window.app.ds.vk_wg,url:document.domain+path},function(res){
// console.dir(res);
// });

        },

        click_code: function (thiss) {
        // highlight the current menu item
        jQuery('ul.menu li').each(function() {
            jQuery(this).removeClass('current-menu-item');
        });
        jQuery(thiss).parents('li').addClass('current-menu-item');
        },

        data_code:function (dataa) {
        return undefined;
        },
    }
,//App.Ajax object
Theme:{

},//вспомогательные функции на странице
Plugins:{
ntSaveFormsInit: function(){//инициализация плагина сохранения содержимого формы
//(function(jQuery){
var isLS=typeof window.localStorage!=="undefined";function wls(n,v){var c;if(typeof n==="string"&&typeof v==="string"){localStorage[n]=v;return true}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n)if(n.hasOwnProperty(c))localStorage[c]=n[c];return true}return false}function wc(n,v){var dt,e,c;dt=new Date;dt.setTime(dt.getTime()+31536E6);e="; expires="+dt.toGMTString();if(typeof n==="string"&&typeof v==="string"){document.cookie=n+"="+v+e+"; path=/";return true}else if(typeof n===
"object"&&typeof v==="undefined"){for(c in n)if(n.hasOwnProperty(c))document.cookie=c+"="+n[c]+e+"; path=/";return true}return false}function rls(n){return localStorage[n]}function rc(n){var nn,ca,i,c;nn=n+"=";ca=document.cookie.split(";");for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===" ")c=c.substring(1,c.length);if(c.indexOf(nn)===0)return c.substring(nn.length,c.length)}return null}function dls(n){return delete localStorage[n]}function dc(n){return wc(n,"",-1)}jQuery.extend({Storage:{set:isLS?
wls:wc,get:isLS?rls:rc,remove:isLS?dls:dc}});
//})(jQuery);
},
ntSaveForms: function () {//сохранение содержимого формы
    var text, cl;
    $(".ntSaveForms").each(function(i) {
        cl = "ntSaveForms"+i;
        $(this).addClass(cl); // add new class
        text = $.Storage.get(cl);
        if (text && text.length > 0 && !$(this).val()) {
            $(this).val(text); // set field data
        }
    });

    $(".ntSaveForms").keyup(function() {
        $.Storage.set($(this).attr("class").split(" ")[$(this).attr("class").split(" ").length -1], $(this).val()); // save field data
    });

    $(".ntSaveFormsSubmit").click(function() {
        $(".ntSaveForms").each(function(i) {
            $.Storage.remove("ntSaveForms"+i); // remove data
        });
    });
},},//плагины и прочие функции, автономные от оформления и темы
Track:{//свойство объекта, содержащее все функции для аналитики

    adds_event_handler:function(e,t){
    var caption = t.title || t.name || "";
    var group = t.rel || false;
    var event_label = $($(".adds_container " + "a")[0]).parent().parent().parent().parent().parent().attr('id')||"";
    var event_id = $(t).data('id')||0;
    var params = {event:e.type,'id':event_id, href:$(t).attr('href')||"",'place':event_label,'caption':caption,'group':group};
    if (typeof App.Events["adds_"+e.type+"_"+event_id+"_"+event_label] == 'undefined') {
    App.Events["adds_"+e.type+"_"+event_id+"_"+event_label] = 1;
    }
    else{return;}
    if(typeof _paq!="undefined"){
    _paq.push(["trackEvent", "adds", e.type+"_"+event_id, event_id, params]);
    }
    if(typeof ga!="undefined"){
    ga('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'adds',   // Required.
      'eventAction': e.type,      // Required.
      'eventLabel': ""+event_id,
      'eventValue': params
    });
    }
    if(typeof _yaq!="undefined"){
    _yaq.reachGoal('adds_'+e.type,params);
    _yaq.hit('/#'+e.type+"?id="+event_id+"&place="+event_label);
    }
},
    custom_event_handler:function(e,t,m){
    if (typeof App.Events[m+"_"+e.type] == 'undefined') {
    App.Events[m+"_"+e.type] = 1;
    }
    else{return;}
    if(typeof _paq!="undefined"){
    _paq.push(["setCustomVariable", Math.random()*100, e.type, m, "page"]);
    _paq.push(['setCustomUrl', "/#"+m]);
    _paq.push(['trackPageView']);
    _paq.push(["trackEvent", m, e.type]);
    }
    if(typeof ga!="undefined"){
    ga('send', {
      'hitType': 'event',          // Required.
      'eventCategory': m,   // Required.
      'eventAction': e.type,      // Required.
    });
    }
    if(typeof _yaq!="undefined"){
    _yaq.reachGoal(m,e.type);
    _yaq.hit('/#'+m);
    }
},
}//свойство объекта, содержащее все функции для аналитики
};//App object

//////////
// Редкое мигание заголовка страницы когда пользователь ушел
// Рекламные объявления когда пользователь вернулся
//////////

(function(){
// select the target node
var all_titles = [document.title,window.app.ds.tt_b1,window.app.ds.tt_b2,window.app.ds.tt_b3,document.domain.toUpperCase()];
var stage = 0;
var newTxt=document.domain.toUpperCase();
var oldTxt=document.title;

function blink_title(){
    if(stage < all_titles.length-1){
        stage++;
        document.title=all_titles[stage];
    }else{
        stage = 0;
        document.title=all_titles[stage];
    }
}

function show_adds(){
var arr = [];
jQuery('.adds_container').each(
function(index,value){
arr[index] = value;
        jQuery(this).fadeOut("slow", function() {
            jQuery(this).fadeIn("slow", function() {
                jQuery.ajax({
                    type: 'GET',
                    url: '/adds.php',
                    'async':true,
                    'cache':true,
                    data: {title:document.title},
                    cache: false,
                    dataType: "html",
                    done: function(data, textStatus, jqXHR) {
                    },
                    fail: function(data, textStatus, jqXHR) {
                    },
                    success: function(data) {
                    value.innerHTML = data;
                    }
                });
            });
        });
});//each adds_container

}
// show_adds();
// timer_show_adds = setInterval(show_adds,120000);

window.onblur = function(){
all_titles[0]=document.title;
timer_blink_title = setInterval(blink_title,3000);
if (typeof(timer_show_adds) == 'undefined'){} else{clearInterval(timer_show_adds);}
};

window.onfocus = function(){
if (typeof(timer_blink_title) == 'undefined'){} else{clearInterval(timer_blink_title);document.title = all_titles[0];}
if (typeof(timer_show_adds) == 'undefined'){timer_show_adds = setInterval(show_adds,120000);}

};
// Cheburashka
var all_cheburashkas = [1,2,3,4];
var cheburashka_stage = 0; var cheburashka_incr = 1;
function cheburashka(){
    if( cheburashka_stage == all_cheburashkas.length-1){
        cheburashka_incr = -1;
    }else if(cheburashka_stage == 0){
        cheburashka_incr = 1;
    }
    cheburashka_stage = cheburashka_stage+cheburashka_incr;
    $('#cheburashka').attr('src',"/assets/img/cheburashka"+all_cheburashkas[cheburashka_stage]+".svg");
}
timer_cheburashka = setInterval(cheburashka,600);
})();

// old stuff
var elem = document.getElementById('footer-right');
var line=elem.innerHTML;

function footer_right(msg,ctrlwidth)
{
  msg = "    "+msg
  newmsg = msg
  while (newmsg.length < ctrlwidth) {newmsg += msg}
  prokrutka();
}
function prokrutka()
{
  NowMsg=elem.innerHTML;
  NowMsg=NowMsg.substring(1,NowMsg.length)+NowMsg.substring(0,1);
  elem.innerHTML = NowMsg;
  bannerid=setTimeout("prokrutka()",200);
}

footer_right(elem.innerHTML,200);
document.oncopy = function(){var b_element = document.getElementsByTagName('body')[0];
var selection_txt = window.getSelection();
var to_string = window.getSelection().toString();
var sel_count = to_string.length;
var pagelink = document.location.href;
var copytext = pagelink;
var newdiv = document.createElement('div');
newdiv.style.position = 'absolute';
newdiv.style.left = '-99999px';
b_element.appendChild(newdiv);
newdiv.innerHTML = copytext;
selection_txt.selectAllChildren(newdiv);
window.setTimeout( function() {
b_element.removeChild(newdiv);
}, 0);};


///////////////////
// Inject VK Widgets js for desktops
///////////////////
$(function(){
if (navigator.userAgent.indexOf('Android') === -1 && navigator.userAgent.indexOf('iPhone') === -1 && $(window).width()>767) {//1150
 var sc=document.createElement('script');
 // var dc=document.createElement('div');
 sc.type='text/javascript';
 sc.id="_vkjs";
 // dc.id="vk_groups";
 // dc.style="display:block";
 sc.async="true";
 sc.src='//vk.com/js/api/openapi.js?113';
 document.getElementsByTagName('head')[0].appendChild(sc);
window.vkAsyncInit = function() { // Настройки для Вконтакта
 var p = $(window).width();
 VK.Widgets.Group("vk_groups", {mode: 0, width: (p-60)/4, height: "216"}, window.app.ds.vk_gr);
 VK.init({apiId: window.app.ds.vk_wg, onlyWidgets: true});
 // VK.Widgets.CommentsBrowse('vk_comments_wall', {width: (p-60)/6, limit: 2, mini: 1});
 if ($('#vk_comments').length>0)
 VK.Widgets.Comments("vk_comments", {limit: 5, width: (p-60)*3/4, attach: "*"});
if ($('#vk_like').length>0){
 VK.Widgets.Like("vk_like", {type:"button",verb:1});
}

// наблюдение за событием нового комментария и удаления комментария
VK.Observer.subscribe('widgets.comments.new_comment', function(num,last_comment,date,sign){onComment(num,last_comment,date,sign,'new');});
VK.Observer.subscribe('widgets.comments.delete_comment',function(num,last_comment,date,sign){onComment(num,last_comment,date,sign,'del');});

// функция уведомления
function onComment(num,last_comment,date,sign,action){
    $.ajax({
        type: "POST",
        url: "/comment.php",
        cache: false,
        data:{"num":num,"last_comment":last_comment,"date":date,'sign':sign,'action':action},
        success: function(html){
            // То, что мы будем выполнять при получении ответа.
        }
    });
};

};

 // document.getElementsByTagName('body')[0].appendChild(dc);
}// if applicable
});
// Конец VK Widgets