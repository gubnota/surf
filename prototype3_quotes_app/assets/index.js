window.onorientationchange = function() {
checkorientation();
}
window.onresize = function() {
checkorientation();
update_css();
}
window.onload = ()=>{
window.mango = document.getElementById('mango');
window.plato = document.getElementById('plato');
window.ribbon = document.getElementById('ribbon');
window.quote = document.getElementById('quote');
window.css = document.getElementById('css');
window.css_inner ={'ribbon':'font-size:%fs%px !important','quote':'font-size:%fs%px !important'};
if (!window.quotes.quotes_number) {
window.quotes.quotes_number = Object.keys(window.quotes.quotes).length;
window.quotes.current_quote = {'no':false,'text':false,'author':false};
}

window.update_css = ()=>{
let font_size = Math.floor(Math.sqrt( plato.offsetHeight * 0.86 * plato.offsetWidth * 0.98 * 2 / quote.innerText.length )*0.625);
let authors_size = Math.min(Math.floor(ribbon.offsetHeight),Math.floor(ribbon.offsetWidth*0.8*.7/window.quotes.current_quote.author.length)*2*0.8);
  css.innerHTML = "#quote{"+css_inner.quote.replace('%fs%',font_size)+'}#ribbon{'+css_inner.ribbon.replace('%fs%',authors_size)+"}";
}
window.checkorientation = ()=>{
  if(window.innerWidth > window.innerHeight)
  {
    document.body.classList.remove('portrait')
  }
  else
  {
    document.body.classList.add('portrait')
  }
}
window.checkorientation()
setTimeout(function(){
mango.classList.add('animate');
mango.classList.remove('tapped');
plato.classList.add('animate2');
},10);
window.is_touch_device=()=>{
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;
  }  
}
window.time=(label)=>{var a = new Date();var b = a.getTime()/1000;console.log(label,b)}
window.get_quote=()=>{
  window.quotes.current_quote.no = Math.floor((Math.random()*window.quotes.quotes_number)+1);
  window.quotes.quotes_number = Object.keys(window.quotes.quotes).length;
  window.quotes.current_quote.text = window.quotes.quotes[window.quotes.current_quote.no].text;
  window.quotes.current_quote.text = '“'+window.quotes.current_quote.text.replace('\n','<br />')+'”';
  window.quotes.current_quote.author = window.quotes.authors[window.quotes.quotes[window.quotes.current_quote.no].author_id];
  return window.quotes.current_quote;
}

window.appear_ribbon = ()=>{
time('appear_ribbon')
if (window.setTimeoutAppearRibbon === false){
if (!ribbon.classList.contains('hidden')) return;
let q = window.quotes.current_quote;
ribbon.innerText = q.author;
window.setTimeoutAppearRibbon = true;
ribbon.classList.remove('hidden');
setTimeout(function(e){
window.setTimeoutAppearRibbon = false;
},1000);
}  
}

window.disappear_ribbon = ()=>{
time('disappear_ribbon')
if (window.setTimeoutDisappearRibbon === false){
if (ribbon.classList.contains('hidden')) return;
window.setTimeoutDisappearRibbon = true;
ribbon.classList.add('hidden');
setTimeout(function(e){
window.setTimeoutDisappearRibbon = false;
},1000);
}  

}

window.appear_quote = ()=>{
time('appear_quote')
if (window.setTimeoutAppearQuote === false){
if (!quote.classList.contains('hidden')) return;
let q = window.quotes.current_quote;
quote.innerHTML = q.text;
update_css();
window.setTimeoutAppearQuote = true;
quote.classList.remove('hidden');
setTimeout(function(e){
window.setTimeoutAppearQuote = false;
},1000);
}  

}

window.disappear_quote = ()=>{
time('disappear_quote')
if (window.setTimeoutDisappearQuote === false){
if (quote.classList.contains('hidden')) return;
window.setTimeoutDisappearQuote = true;
quote.classList.add('hidden');
setTimeout(function(e){
window.setTimeoutDisappearQuote = false;
},1000);
}  
  
}
window.appear_plato=()=>{
time('appear_plato')
if (window.setTimeoutAppearPlato === false){
get_quote(); appear_ribbon(); appear_quote();
if (!mango.classList.contains('tapped')) return;
window.setTimeoutAppearPlato = true;
plato.classList.remove('hidden');
setTimeout(function(e){
window.setTimeoutAppearPlato = false;
},1000);
}
}
window.disappear_plato=()=>{
time('disappear_plato')
if (window.setTimeoutDisappearPlato === false){
appear_mango();
if (mango.classList.contains('tapped')) return;
window.setTimeoutDisappearPlato = true;
plato.classList.add('hidden')
setTimeout(function(e){
window.setTimeoutDisappearPlato = false;
},1000)
}
}
window.appear_mango=()=>{
time('appear_mango')
if (window.setTimeoutAppearMango === false){
disappear_ribbon(); disappear_quote();
window.setTimeoutAppearMango = true;
mango.classList.remove('tapped');
window.setTimeoutAppearMango = setTimeout(function(e){
    window.setTimeoutAppearMango = false;
    time('appear_mango finished')
},1000);

}}
var disappear_mango=()=>{
time('disappear_mango')
if (window.setTimeoutDisappearMango === false){
window.setTimeoutDisappearMango = true;
    mango.classList.add('tapped');
    appear_plato();
    window.setTimeoutDisappearMango = setTimeout(function(e){
        window.setTimeoutDisappearMango = false;
    },1000);
}    
}
window.setTimeoutDisappearMango = false;
window.setTimeoutAppearMango = false;
window.setTimeoutDisappearPlato = false;
window.setTimeoutAppearPlato = false;
window.setTimeoutDisappearQuote = false;
window.setTimeoutAppearQuote = false;
window.setTimeoutDisappearRibbon = false;
window.setTimeoutAppearRibbon = false;

if(is_touch_device()){

mango.ontouchstart = function(e){disappear_mango()}
mango.ontouchend = function(e){disappear_mango()}

plato.ontouchstart = function(e){
disappear_plato();
};

plato.ontouchend = function(e){
disappear_plato();
};

}
else {

plato.onclick = function(e){
disappear_plato();
}

mango.onclick = function(e){
disappear_mango();
};

}

appear_mango();
checkorientation();
}