// a Tiny js library that brings Excel-like funtionality to the web
var DEBUG = false;
var old_editable_span = '';

var keymod = {'alt_pressed':0,
'ctrl_pressed':0,
'shift_pressed':0,
'command_pressed':0,
'any_pressed':0,'editing':0};//17, 18, 16, 224

var block = {'table_header_icon_inaction':0};
!function ($) {
function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
function reindex_table(){
$.each($('div.table>div.entry'), function(i, row) {// each string
$(this).attr('data',i+1).find('span.num').html(i+1); });
}
function update_table(data){
if (typeof data != 'undefined' && typeof data.v != 'undefined'){
// if there are cells to update
$.each(data.v, function(i, val) {// process received data
// val['r'] //row - is not defined for the last values
// val['c'] //column
// val['v'] //content
if (typeof val['r'] != 'undefined')  {//each row - not for the last values
var entries = $('.table>div.entry');
$.each(entries, function(i, row) {// each row
if ($(this).attr('data') == val['r']){ // this row
$.each($(this).find('span'), function(i, row) {// each cell
if ($(this).attr('data') == val['c']){// this cell
if ($(this).hasClass('name') || $(this).hasClass('bar')){// row
$(this).html(val['v']);
}// row
if ($(this).hasClass('link')){// link
$(this).html(val['v']);
}// link
if ($(this).hasClass('img')){// image
if (1) {$(this).html(val['v']);}
}// link
$(this).removeClass('animate').addClass('ok');
} // this cell
}); // each cell
} // this row
});
}//\each row - not for the last values
else {//last values
var last = $('div.table_last>div.entry').find('span');
$.each(last, function(i, entry) {// each cell
if ($(this).attr('data') == val['c']){// this cell
$(this).html(val['v']).removeClass('animate');
}//\ this cell
});//\ each cell
}//\for last values
});// each received cell
} //end if there are cells to update
if (typeof data.a != 'undefined'){//if there are rows to add
if (data.a.length>0){
$.each(data.a, function(i, val) {    // process received data
//val.after - add after this row, val.number - add this row.no
if (typeof val.after != 'undefined' && typeof val.number != 'undefined' && val.number>view_rows){
//if it's defined how many cells and after which cell to add, 
// only if the number is more than overall number of the columns (add to the end) - quickfix
view_rows++;
current_entry = ($(out_tpl.a).addClass('row'+((view_rows-1)%theme_rows+1)).attr('data',view_rows).append(out_tpl.s).find('span.num').html(view_rows).parent()).appendTo($('div.table'));
// then re-index the table
reindex_table();
resize_event_handler();// resize new cells
//current_entry = $(out_tpl.a).attr('data',val.number).addClass('row'+(view_rows%theme_rows+1)).prepend(out_tpl.s).appendTo($('div.table'));
}//\if it's defined how many cells and after which cell to add
});
}//if the respond is greater then 0
}//\ end if there are rows to add
if (typeof data.r != 'undefined'){// if there are rows to delete

$.each(data.r, function(i, val) {    // first delete 'em
view_rows--;
$.each($('div.table>div.entry'), function(i, row) {// each row
if ($(this).attr('data') == val['number']){ // this row
$(this).remove();
}
});
});
// then re-index the table
reindex_table();
resize_event_handler();// resize cells
}//\ if there are cells to remove
if (typeof data.mt == 'string' && data.mt == 'b')$.each($('span.animate'), function(i, entry) {// each cell
$(this).removeClass('animate');
});
if (typeof data.m == 'string') $().message(data.m,{cl: data.mt});
if (typeof data.k == 'string')  {table_key = data.k;}
resize_event_handler();// ресайзить новые ячейки
}
function click_editable_span_event_handler (e){
if ( $(this).hasClass('inactive')) {e.preventDefault();e.stopPropagation(); return;}
if (!keymod.any_pressed && ($(this).hasClass('img') || $(this).hasClass('link')) ) {e.preventDefault();e.stopPropagation(); 
if (typeof $(this).find('a').attr('href') != 'undefined') {window.open($(this).find('a').attr('href')+'','_blank');}
return;}
if (keymod.any_pressed && ($(this).hasClass('img') || $(this).hasClass('link')) ) {
//e.preventDefault();e.stopPropagation(); 
//if (typeof $(this).find('a').attr('href') != 'undefined') {window.open($(this).find('a').attr('href')+'','_blank');}
//return;
}
//catch the clicked element
var t = e.target || e.srcElement;
//получаем название тега
var elm_name = t.tagName.toLowerCase();
//if it's input element - do nothing
if(elm_name == 'input') {e.preventDefault();e.stopPropagation();return false;}
if($(this).hasClass('num')) {return false;}
old_editable_span = $(this).html();
if (typeof DEBUG != 'undefined') console.log(old_editable_span);
var col = $(this).parent().attr('data');// column number
var row = $(this).attr('data'); // row number
if($(this).hasClass('name') || $(this).hasClass('bar')) {
var val = $(this).html().replace(/>/g, '&gt;').replace (/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
else if($(this).hasClass('img') && typeof $(this).find('img').data('orig') != 'undefined') {
var val = $(this).find('img').data('orig');
$(this).data('old',$(this).find('img').data('orig'));
}
else if($(this).hasClass('link')) {
if (typeof $(this).find('a').attr('href')  != 'undefined' ) {
var a = $(this).find('a');
if (typeof a == 'undefined') {var val = '';}
else {var val = a.attr('href')+' '+a.html();console.log(val);}
}
}
if (typeof val == 'undefined') val = '';
if (typeof row == 'undefined' && typeof col == 'undefined' ){return;}
$(this).attr('id','editing');
var code = '<input type="text" id="edit" name="r-'+row+'-c-'+col+'" c="'+col+'" r="'+row+'" value="'+val+'" data-old="'+val+'" >';
$(this).empty().append(code); // only edit if row,col pair exists
$('#edit').focus();
$('#edit').select();
$(this).addClass("animate").removeClass('ok');
/*
blur focus from the entered input
*/
$(document).on('blur','#edit',
function(){
var col = $(this).parent().attr('data');// column
var row = $(this).parent().parent().attr('data'); // row
if ($(this).parent().hasClass('name')){
var val = $(this).attr('value');
}
$('#editing').attr('id','');
var val = $(this).val();
//var val = $(this).val();
//$(this).parent().removeClass("animate");// after new data has been sent to the server
$(this).parent().empty().html(val.replace(/>/g, '&gt;').replace (/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'));
});}//click_editable_span_event_handler
function click_header_span_event_handler(e){
$(this).toggleClass('selected');
selected_col = $(this).attr('data');
var entries = $('.table>div.entry');
$.each(entries, function(i, row) {// each row
$.each($(this).find('span'), function(i, row) {// each cell
if ($(this).attr('data') == selected_col){// this cell
$(this).toggleClass('selected');
} // this cell
}); // each cell
}); //each row
get_selected_cols();
}
function click_num_span_event_handler (e){
//catch the clicked element
$(this).parent().toggleClass('selected');
get_selected_rows();
}
//$('.table>div>span.name,.table>div>span.img,.table>div>span.link').click(click_editable_span_event_handler);
$(document).on('click','.table>div.entry>span.name,.table>div.entry>span.img,.table>div.entry>span.link,.table>div.entry>span.bar,.table_last>.entry>span',click_editable_span_event_handler);
$(document).on('click','.table>div>span.num',click_num_span_event_handler);
$(document).on('click','.table>div.header>span',click_header_span_event_handler);
//$('.table>div>span.num').click(click_num_span_event_handler);
$(document).on('keydown',function(event){
//catch key down event
//console.log('event.keyCode = '+event.keyCode);
if(event.keyCode == 16) keymod.shift_pressed=1;
if(event.keyCode == 17) keymod.ctrl_pressed=1;
if(event.keyCode == 18) keymod.alt_pressed=1;
if(event.keyCode == 224) keymod.command_pressed=1;
if(event.keyCode == 16 || event.keyCode == 17 || event.keyCode == 18 || event.keyCode == 224) keymod.any_pressed=1;
if(event.keyCode == 13 || event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 9) {
$('#editing').attr('id','');
//if it's Enter
$('#edit').blur();
//blur focus from input element
}
});
$(document).on('keyup',function(event){
//console.log('event.keyCode = '+event.keyCode+' unpressed');
if(event.keyCode == 16) keymod.shift_pressed=0;
if(event.keyCode == 17) keymod.ctrl_pressed=0;
if(event.keyCode == 18) keymod.alt_pressed=0;
if(event.keyCode == 224) keymod.command_pressed=0;
if(event.keyCode == 16 || event.keyCode == 17 || 
event.keyCode == 18 || event.keyCode == 224) keymod.any_pressed=0;
//catch keyup event
});
fromtop = $('div.navbar.navbar-fixed-top').height();
if (typeof fromtop == 'undefined') fromtop = 0;
$('div.header').containedStickyScroll({'fromtop':fromtop});
// call the event Handler dynamically: 
// i.e. apply it for newly created elements, where #edit has been applied
$(document).on('blur','#edit', function() {
row = ($(this).parent().parent().attr('data'));
val = encodeURIComponent($(this)[0].value);
col = ($(this).parent().attr('data'));
if (val == encodeURIComponent($(this).data('old')) ) {// if old and new values are same
if (typeof old_editable_span != 'undefined') {
$(this).parent().html(old_editable_span).removeClass('animate');
}
if (typeof DEBUG != 'undefined') console.log(old_editable_span);
if($(this).parent().hasClass('link')) {
var a = '<a></a>';
$(this).parent().removeClass('animate').html(decodeURIComponent(val));
//$(this).parent().removeClass('animate').html($(a).attr('href',decodeURIComponent(val)).attr('target','_blank').html(decodeURIComponent(val)));
//console.log($('a').attr('href',val).attr('target','_blank'));
}
$(this).parent().removeClass('animate');
}
else {
if (typeof row != 'undefined') {var url_val = 'ajax.php?r='+row+'&c='+col+'&id='+table_id+'&k='+table_key+'&v='+val;}
else {var url_val = 'ajax.php?c='+col+'&id='+table_id+'&k='+table_key+'&v='+val;}
$.ajax({
    url: url_val,
    dataType : "json",
    success: function (data, textStatus) {
update_table(data);
    }
});//ajax
} //else
});

$('div.icons>span').tooltip({showURL: false});
$('div.table>div.header>span').tooltip({showURL: false,
	bodyHandler: function() {
		return '<h3>'+$(this).html()+'</h3><span>'+$(this).html()+'</span>';
	}
	});
$('div.table>div.entry>span.name').tooltip({showURL: false,
	bodyHandler: function() {
	if ($(this).attr('id') != 'editing' && $(this).html().length>0)
		return '<span>'+$(this).html()+'</span>';
	}
	});//end span.name tooltip
// span.link tooltip
$('div.table>div.entry>span.link').tooltip({showURL: true,
	bodyHandler: function() {
	if ($(this).attr('id') != 'editing' && typeof $(this).find('a').attr('href') != 'undefined')
		return '<h3><a href="'+$(this).find('a').attr('href')+'">'+$(this).find('a').attr('href')+'</a></h3>';
	}
	});//end span.name tooltip

// span.img tooltip
$(document).on('mousemove','div.table>div.entry>span.img', function() {
	if ($(this).attr('id') != 'editing' && typeof $(this).find('img').data('big') != 'undefined'){
	var w = Math.min($(window).width()-20,$(window).height()-20,350);
	var img = '<img src="'+$(this).find('img').data('big')+'" max-width="'+(w+'px')+'" max-height="'+(w+'px')+'">';
$().message(img,{cl: 'i'});
	}
});
/*
$('div.table>div.entry>span.img').tooltip({showURL: false,delay: 0,
	bodyHandler: function() {
	if ($(this).attr('id') != 'editing' && typeof $(this).find('img').data('big') != 'undefined'){
	var w = Math.min($(window).width(),$(window).height(),320);
	return $("<img/>").attr("src", $(this).find('img').data('big')).attr('height',(w+'px')).attr('width',(w+'px'));}
	}
	});*///end span.img tooltip

function click_icons_span_event_handler(e){
var t = e.target || e.srcElement;
var elm_name = t.tagName.toLowerCase();
//if it's input element - do nothing
if(elm_name != 'span') {e.preventDefault();e.stopPropagation();return false;}
//if($(this).hasClass('num')) {return false;}
old_editable_span = $(this).html();
//if (keymod.any_pressed)  console.log('With mod pressed');
var extra_click_icons_params = ''; var res = Object();
res.s_r = get_selected_rows();
res.s_c = get_selected_cols();
if (typeof res.s_r == 'object' ) {extra_click_icons_params = '&s_r='+res.s_r.str;}
if (typeof res.s_c == 'object' ) {extra_click_icons_params += '&s_c='+res.s_c.str;}
if($(this).attr('class') == 'icon-picture') {window.open('/?id='+table_id+'&v=2','_top');}
else if($(this).attr('class') == 'icon-globe') {window.open('/?id='+table_id+'','_top');}
else if($(this).attr('class') == 'icon-print') {window.open('/?id='+table_id+'&v=3','_top');}
else if($(this).attr('class') == 'icon-save' || $(this).data('action') == 'save_csv') {window.open('ajax.php?k='+table_key+'&id='+table_id+'&a='+$(this).attr('class')+extra_click_icons_params,'_top');}
else if (block.table_header_icon_inaction == 0){
block.table_header_icon_inaction=1;
$.ajax({
    url: 'ajax.php?k='+table_key+'&id='+table_id+'&a='+$(this).attr('class')+extra_click_icons_params,             // указываем URL и
    dataType : "json",
    success: function (data, textStatus) {
update_table(data);},
beforeSend:function(){block.table_header_icon_inaction=1;},
complete: function(){block.table_header_icon_inaction=0;},
async: false,
timeout:3000
});//ajax
}
}
$(document).on('click','div.icons>span',click_icons_span_event_handler);
//$('div.icons>span').click(click_icons_span_event_handler);

var counter1 = 0;
var dotimeout = 30000;
// Start a polling loop with a counter.
  $.doTimeout( dotimeout, function(){
$.ajax({
    url: 'ajax.php?k='+table_key+'&id='+table_id,
    dataType : "json",
    success: function (data, textStatus) {
update_table(data);
    }
});
    return true; // Poll.
});
/*
* returns an array of selected cols
*/
function get_selected_cols(){
var colums = $('.table>.header>.selected');
var selected_cols = ['str','arr'];
$.each(colums, function(i, row) {// each column
if (typeof selected_cols.str  == 'undefined') {selected_cols.str = $(this).attr('data');}
else {selected_cols.str = selected_cols.str+','+$(this).attr('data');}
});

if (typeof selected_cols.str != 'undefined') {selected_cols.arr=selected_cols.str.split(',');return selected_cols;}/* [{str:"4,9",arr:["4","9"]}]*/

}
/*
* Returns an array of selected rows
*/
function get_selected_rows(){
var entries = $('.table > div.entry.selected');
var selected_rows = ['str','arr'];
$.each(entries, function(i, row) {// each row
if (typeof selected_rows.str  == 'undefined') {selected_rows.str = $(this).attr('data');}
else {selected_rows.str = selected_rows.str+','+$(this).attr('data');}
});

if (typeof selected_rows.str != 'undefined') {selected_rows.arr=selected_rows.str.split(',');return selected_rows;}/* [{str:"4,9",arr:["4","9"]}]*/
}
/*
* up down button navigation
*/
function scroll_event_handler(event){
	if ($(document).height() > $(window).height())
	{
	var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
		if (($(document).height() - $(window).height())>100 && (scrollBottom < 100 || ($(window).scrollTop() > 100 && scrollBottom > 100) ) ) {
		$('#back-top').fadeIn();
		}
		else {
		$('#back-top').fadeOut();
		}
	
		if ($(window).scrollTop() < 30) {$('#back-bottom').fadeIn();}
		else {$('#back-bottom').fadeOut();}
	}
	
	else {
	$('#back-bottom').fadeOut();
	$('#back-top').fadeOut();
	}
}//\scroll_event_handler
function resize_event_handler(event){
if (view_cols == undefined) view_cols = 12;
var entry_width = ($('div.table').width()-28-4-view_cols)/(view_cols-1);//change to (any number of cells - 1)
if (entry_width < 18 ) entry_width = 18;
//css_rule = "<style>.header>span.name,.header>span.bar,.header>span.img,.header>span.link,.table>.entry>span.name,.table>.entry>span.bar,.table>.entry>span.img,.table>.entry>span.link,span#editing > input{width:"+entry_width+"px }</style>";
//document.write(css_rule);
$('.header>span.name,.header>span.img,.header>span.bar,.header>span.link,.table>.entry>span.name,.table>.entry>span.img,.table>.entry>span.bar,.table>.entry>span.link,span#editing > input,.table_last>.entry>span.name,.table_last>.entry>span.img,.table_last>.entry>span.bar,.table_last>.entry>span.link').css({width:entry_width});
//console.log(int(entry_width));
var entries = $('.table>div.entry');
for (var i = 0; i < entries.length; i++) {
var col = 1+i%theme_rows;
$(entries[i]).addClass('row'+col);
}
//scroll_event_handler(event); //при резайзе окна перезамерить скроллы
}
function first_resize_event_handler(event){$('.table').css({'opacity':0});resize_event_handler(event);$('.table').css({'opacity':1});
if (table_direction == 1){
$("div.table,div.table_last").css({'position':'relative','right':window.innerWidth}).delay(0).animate({'right':0},1000);
}
else {$("div.table,div.table_last").css({'position':'relative','left':window.innerWidth}).delay(0).animate({'left':0},1000);
}
}
window.onresize = resize_event_handler;
window.onload = first_resize_event_handler;
var header_logo_old_pos = $('.navbar>.navbar-inner>.nav-collapse>a.brand').position();
function header_logo_event_handler(){
if (header_logo_old_pos.toggled) {
header_logo_old_pos.toggled =0;
setCookie("t", "2", "", "/");
$("body").addClass('theme2').removeClass('theme1');
}else {
header_logo_old_pos.toggled =1;
setCookie("t", "1", "", "/");
$("body").addClass('theme1').removeClass('theme2');
}
}
$(".navbar>.navbar-inner>.container>.nav-collapse>a.brand").css({'opacity':0}).delay(100).animate({'opacity':1},700);
//$("div.table").css({'opacity':0}).delay(200).animate({'opacity':1},400);
$(document).on('click touchstart','a.brand>img',header_logo_event_handler);
$(window).on('load scroll resize',scroll_event_handler);
$(document).on('click touchstart','#back-top',function () {
$('body,html').animate({
scrollTop: 0
}, 500);
return false;
});
$(document).on('click touchstart','#back-bottom',function () {
$('body,html').animate({
scrollTop: ($(document).height() - $(window).height())
}, 500);
return false;
});
}(window.jQuery)
//})(jQuery);
if(!window.console){console = {};console.log = function(m){return 0}}