(this.webpackJsonpsupersquad=this.webpackJsonpsupersquad||[]).push([[0],{15:function(e,t,n){e.exports=n(27)},26:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(8),l=n.n(c),i=n(1),s=n(2),u=n(5),o=n(4),m=n(3);var d=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this;return console.log("CharacterList.props",this.props),a.a.createElement("div",null,a.a.createElement("h3",null,"Characters List"),a.a.createElement("ul",{className:"list"},this.props.characters.map((function(t){return a.a.createElement("li",{key:t.id,onClick:function(){return e.props.addCharacterByID(t.id)},className:"list-item"},a.a.createElement("span",null,t.name)," ",a.a.createElement("i",null,"+"))}))))}}]),n}(r.Component);var h=Object(m.b)((function(e){return console.log("state",e),{characters:e.characters}}),{addCharacterByID:function(e){return{type:"ADD_CHARACTER",id:e}}})(d),p=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this;return a.a.createElement("div",null,a.a.createElement("h3",null,"Characters List"),a.a.createElement("ul",{className:"list"},this.props.characters.map((function(t){return a.a.createElement("li",{key:t.id,onClick:function(){return e.props.removeCharacterByID(t.id)},className:"list-item"},a.a.createElement("span",null,t.name)," ",a.a.createElement("i",null,"\xd7"))}))))}}]),n}(r.Component);var f=Object(m.b)((function(e){return{characters:e.heroes}}),{removeCharacterByID:function(e){return{type:"REMOVE_CHARACTER",id:e}}})(p),g=function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"strength",value:function(){var e=0;return this.props.heroes.forEach((function(t){return e+=t.strength})),e}},{key:"intelligence",value:function(){var e=0;return this.props.heroes.forEach((function(t){return e+=t.intelligence})),e}},{key:"speed",value:function(){var e=0;return this.props.heroes.forEach((function(t){return e+=t.speed})),e}},{key:"render",value:function(){return a.a.createElement("ul",null,a.a.createElement("li",null,"Strength: ",a.a.createElement("i",null,this.strength())),a.a.createElement("li",null,"Intelligence: ",a.a.createElement("i",null,this.intelligence())),a.a.createElement("li",null,"Speed: ",a.a.createElement("i",null,this.speed())))}}]),n}(r.Component);var E=Object(m.b)((function(e){return{heroes:e.heroes}}))(g),v=(n(26),function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"app"},a.a.createElement("h2",null,"SuperSquad"),a.a.createElement("div",{className:"stats"},a.a.createElement(E,null)),a.a.createElement("div",{className:"column-container"},a.a.createElement("div",{className:"column"},a.a.createElement(h,null)),a.a.createElement("div",{className:"column"},a.a.createElement(f,null))))}}]),n}(r.Component)),b=n(6),O=n(7),C=n(9);function y(e){return O.find((function(t){return t.id===e}))}var j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_CHARACTER":var n=e.filter((function(e){return e.id!==t.id}));return n;case"REMOVE_CHARACTER":return[].concat(Object(C.a)(e),[y(t.id)]);default:return e}};var S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_CHARACTER":return[].concat(Object(C.a)(e),[y(t.id)]);case"REMOVE_CHARACTER":return e.filter((function(e){return e.id!==t.id}));default:return e}},A=Object(b.b)({characters:j,heroes:S}),R=localStorage.getItem("reduxState")?JSON.parse(localStorage.getItem("reduxState")):{},k=Object(b.c)(A,R);console.log("store.getState()",k.getState()),k.subscribe((function(){localStorage.setItem("reduxState",JSON.stringify(k.getState()))})),l.a.render(a.a.createElement(m.a,{store:k},a.a.createElement(v,null)),document.getElementById("root"))},7:function(e){e.exports=JSON.parse('[{"id":0,"name":"Superman","strength":10,"intelligence":7,"speed":9},{"id":1,"name":"Batman","strength":7,"intelligence":10,"speed":6},{"id":2,"name":"Wonderwoman","strength":5,"intelligence":9,"speed":7},{"id":3,"name":"Flash","strength":5,"intelligence":6,"speed":10},{"id":4,"name":"Green Lantern","strength":7,"intelligence":8,"speed":7},{"id":5,"name":"Aquaman","strength":8,"intelligence":7,"speed":8},{"id":6,"name":"Cyborg","strength":9,"intelligence":8,"speed":6},{"id":7,"name":"Green Arrow","strength":5,"intelligence":9,"speed":7},{"id":8,"name":"Hawkman","strength":5,"intelligence":8,"speed":8},{"id":9,"name":"Supergirl","strength":10,"intelligence":9,"speed":7}]')}},[[15,1,2]]]);
//# sourceMappingURL=main.13e29425.chunk.js.map