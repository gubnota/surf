//////////////////////
// share - поделиться в соц.сетях
//////////////////////
// Блок функций-обработчиков для расшаривания соотв.ссылок
var Share = {
    vkontakte: function(purl, ptitle, pimg, text) {
        url  = 'http://vkontakte.ru/share.php?';
if (purl == undefined) {purl = document.location.href;}
if (purl != undefined) url += 'url=' + encodeURIComponent(purl);
if (ptitle != undefined) url += '&title='       + encodeURIComponent(ptitle);
if (text != undefined) url += '&description=' + encodeURIComponent(text);
if (pimg != undefined) url += '&image='       + encodeURIComponent(pimg);
        url += '&noparse=false';
        Share.popup(url);
    },
    odnoklassniki: function(purl, text) {
    url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
if (purl == undefined) {purl = document.location.href;}
if (text != undefined) url += '&st.comments=' + encodeURIComponent(text);
if (purl != undefined) url += '&st._surl='    + encodeURIComponent(purl);
        Share.popup(url);
    },
    facebook: function(purl, ptitle, pimg, text) {
        url  = 'http://www.facebook.com/sharer.php?s=100';
if (purl == undefined) {purl = document.location.href;}
if (ptitle != undefined) url += '&p[title]='     + encodeURIComponent(ptitle);
if (text != undefined) url += '&p[summary]='   + encodeURIComponent(text);
if (purl != undefined) url += '&p[url]='       + encodeURIComponent(purl);
if (pimg != undefined) url += '&p[images][0]=' + encodeURIComponent(pimg);
        Share.popup(url);
    },
    twitter: function(purl, ptitle) {
    url  = 'http://twitter.com/share?';
if (purl == undefined) {purl = document.location.href;}
if (ptitle != undefined) url += 'text='      + encodeURIComponent(ptitle);
if (purl != undefined) url += '&url='      + encodeURIComponent(purl);
if (purl != undefined) url += '&counturl=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    moimir: function(purl, ptitle, pimg, text) {
        url  = 'http://connect.mail.ru/share?';
if (purl == undefined) {purl = document.location.href;}
if (purl != undefined) url += 'url='          + encodeURIComponent(purl);
if (ptitle != undefined) url += '&title='       + encodeURIComponent(ptitle);
if (text != undefined) url += '&description=' + encodeURIComponent(text);
if (pimg != undefined) url += '&imageurl='    + encodeURIComponent(pimg);
        Share.popup(url);
    },
    yaru: function(purl, ptitle, text) {
        url  = 'http://my.ya.ru/posts_share_link.xml?';
if (purl == undefined) {purl = document.location.href;}
if (purl != undefined) url += 'url='          + encodeURIComponent(purl);
if (ptitle != undefined) url += '&title='       + encodeURIComponent(ptitle);
if (text != undefined) url += '&body=' + encodeURIComponent(text);
        Share.popup(url);
    },
    gplus: function(purl) {
        url  = 'https://plus.google.com/u/1/share?';
if (purl == undefined) {purl = document.location.href;}
if (purl != undefined) url += 'url=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    popup: function(url) {
        window.open(url,'_blank');
    }
};



$('body').on('click', 'a', function(event) {//ajax-загрузка ссылок
/////////////
// Share this
if ($(this).hasClass('hand') != undefined && $(this).data('service') != undefined){
if ($(this).data('service') in Share){
Share[$(this).data('service')]();
event.preventDefault();return;
}//определен этот метод
}
//Share this//
/////////////
});//\ajax-загрузка ссылок
