//jQuery Translate plugin and related components

/* 
 * jQuery nodesContainingText plugin 
 * Version: 1.1.2
 * http://code.google.com/p/jquery-translate/
 * Copyright (c) 2009 Balazs Endresz (balazs.endresz@gmail.com)
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b){function a(){}a.prototype={init:function(e,d){this.textArray=[];this.elements=[];this.options=d;this.jquery=e;this.n=-1;if(d.async===true){d.async=2}if(d.not){e=e.not(d.not);e=e.add(e.find("*").not(d.not)).not(b(d.not).find("*"))}else{e=e.add(e.find("*"))}this.jq=e;this.jql=this.jq.length;return this.process()},process:function(){this.n++;var i=this,d=this.options,p="",h=false,g=false,f=this.jq[this.n],k,m,j;if(this.n===this.jql){j=this.jquery.pushStack(this.elements,"nodesContainingText");d.complete.call(j,j,this.textArray);if(d.returnAll===false&&d.walk===false){return this.jquery}return j}if(!f){return this.process()}k=b(f);var n=f.nodeName.toUpperCase(),l=n==="INPUT"&&b.attr(f,"type").toLowerCase();if(({SCRIPT:1,NOSCRIPT:1,STYLE:1,OBJECT:1,IFRAME:1})[n]){return this.process()
}if(typeof d.subject==="string"){p=k.attr(d.subject)}else{if(d.altAndVal&&(n==="IMG"||l==="image")){p=k.attr("alt")}else{if(d.altAndVal&&({text:1,button:1,submit:1})[l]){p=k.val()}else{if(n==="TEXTAREA"){p=k.val()}else{m=f.firstChild;if(d.walk!==true){g=true}else{while(m){if(m.nodeType==1){g=true;break}m=m.nextSibling}}if(!g){p=k.text()}else{if(d.walk!==true){h=true}m=f.firstChild;while(m){if(m.nodeType==3&&m.nodeValue.match(/\S/)!==null){if(m.nodeValue.match(/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/)!==null){if(m.nodeValue.match(/(\S+(?=.*<))|(>(?=.*\S+))/)!==null){h=true;break}}else{h=true;break}}m=m.nextSibling}if(h){p=k.html();p=d.stripScripts?p.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,""):p;this.jq=this.jq.not(k.find("*"))}}}}}}if(!p){return this.process()}this.elements.push(f);this.textArray.push(p);d.each.call(f,this.elements.length-1,f,p);if(d.async){setTimeout(function(){i.process()},d.async);return this.jquery}else{return this.process()}}};var c={not:"",async:false,each:function(){},complete:function(){},comments:false,returnAll:true,walk:true,altAndVal:false,subject:true,stripScripts:true};
b.fn.nodesContainingText=function(d){d=b.extend({},c,b.fn.nodesContainingText.defaults,d);return new a().init(this,d)};b.fn.nodesContainingText.defaults=c})(jQuery);
/* 
 * jQuery Translate plugin 
 * Version: 1.4.7
 * http://code.google.com/p/jquery-translate/
 * Copyright (c) 2009 Balazs Endresz (balazs.endresz@gmail.com)
 * Dual licensed under the MIT and GPL licenses.
 * This plugin uses the 'Google AJAX Language API' (http://code.google.com/apis/ajaxlanguage/)
 * You can read the terms of use at http://code.google.com/apis/ajaxlanguage/terms.html
 */
(function(c){function p(){}var d=true,g=false,e,u="".replace,v=String,k=Function,t=Object,n,l,f,q={},b,j=[],h={from:"",to:"",start:p,error:p,each:p,complete:p,onTimeout:p,timeout:0,stripComments:d,stripWhitespace:d,stripScripts:d,separators:/\.\?\!;:/,limit:1750,walk:d,returnAll:g,replace:d,rebind:d,data:d,setLangAttr:g,subject:d,not:"",altAndVal:d,async:g,toggle:g,fromOriginal:d,parallel:false,trim:true,alwaysReplace:false};function s(){c.translate.GL=n=google.language;c.translate.GLL=l=n.Languages;f=c.translate.toLanguageCode;c.each(l,function(y,z){q[z.toUpperCase()]=y});
c.translate.isReady=d;var x;while((x=j.shift())){x()}}function i(z,y){var x={};c.each(z,function(A,B){if(y(B,A)===d){x[A]=B}});return x}function w(y,z,x){return function(){return y.apply(z===d?arguments[0]:z,x||arguments)}}function r(x){return x!==e}function o(y,B,A){var x,C={},z=c.grep(y,r);c.each(B,function(D,E){var F=c.grep(E[0],function(H,G){return r(z[G])&&z[G].constructor===H}).length;if(F===z.length&&F===E[0].length&&(x=d)){c.each(E[1],function(G,H){C[H]=z[G]});return g}});if(!x){throw A}return C}function m(A,z){var x=o(A,c.translate.overload,"jQuery.translate: Invalid arguments"),y=x.options||{};delete x.options;y=c.extend({},h,z,c.extend(y,x));if(y.fromOriginal){y.toggle=d}if(y.toggle){y.data=d}if(y.async===d){y.async=2}return y}function a(){this.extend(c.translate);delete this.defaults;delete this.fn}a.prototype={version:"1.4.7",_init:function(z,C){var B=C.separators.source||C.separators,y=this.isString=typeof z==="string",x=0,A;c.each(["stripComments","stripScripts","stripWhitespace"],function(E,D){var F=c.translate[D];
if(C[D]){z=y?F(z):c.map(z,F)}});this.rawSource="<div>"+(y?z:z.join("</div><div>"))+"</div>";this._m3=new RegExp("["+B+"](?![^"+B+"]*["+B+"])");this.options=C;this.from=C.from=f(C.from)||"";this.to=C.to=f(C.to)||"";this.source=z;this.rawTranslation="";this.translation=[];this.i=0;this.stopped=g;this.elements=C.nodes;this._i=-1;this.rawSources=[];while(d){A=this.truncate(this.rawSource.substr(x),C.limit);if(!A){break}this.rawSources.push(A);x+=A.length}this.queue=new Array(this.rawSources.length);this.done=0;C.start.call(this,z,C.from,C.to,C);if(C.timeout){this.timeout=setTimeout(w(C.onTimeout,this,[z,C.from,C.to,C]),C.timeout)}(C.toggle&&C.nodes)?(C.textNodes?this._toggleTextNodes():this._toggle()):this._process()},_process:function(){if(this.stopped){return}var x=this.options,E=this.rawTranslation.length,I,J,G,F;var H=this;while((I=this.rawTranslation.lastIndexOf("</div>",E))>-1){E=I-1;J=this.rawTranslation.substr(0,E+1);G=J.match(/<div[> ]/gi);F=J.match(/<\/div>/gi);G=G?G.length:0;F=F?F.length:0;
if(G!==F+1){continue}var A=c(this.rawTranslation.substr(0,E+7)),C=A.length,B=this.i;if(B===C){break}A.slice(B,C).each(w(function(M,P){if(this.stopped){return g}var L=c(P).html(),O=x.trim?c.trim(L):L,N=B+M,Q=this.source,R=!this.from&&this.detectedSourceLanguage||this.from;this.translation[N]=O;this.isString?this.translation=O:Q=this.source[N];x.each.call(this,N,O,Q,R,this.to,x);this.i++},this));break}if(this.rawSources.length-1==this._i){this._complete()}var z=w(this._translate,this);if(x.parallel){if(this._i<0){if(!x.parallel){c.each(this.rawSources,z)}else{var D=0,y=this.rawSources.length;function K(){z();if(D<y){setTimeout(K,x.parallel)}}K()}}}else{z()}},_translate:function(){this._i++;var x=this._i,y=this.rawSourceSub=this.rawSources[x];if(!y){return}n.translate(y,this.from,this.to,w(function(z){if(z.error){return this.options.error.call(this,z.error,this.rawSourceSub,this.from,this.to,this.options)}this.queue[x]=z.translation||this.rawSourceSub;this.detectedSourceLanguage=z.detectedSourceLanguage;
this._check()},this))},_check:function(){if(!this.options.parallel){this.rawTranslation+=this.queue[this._i];this._process();return}var x=0;jQuery.each(this.queue,function(z,A){if(A!=e){x=z}else{return false}});if((x>this.done)||(x===this.queue.length-1)){for(var y=0;y<=x;y++){this.rawTranslation+=this.queue[y]}this._process()}this.done=x},_complete:function(){clearTimeout(this.timeout);this.options.complete.call(this,this.translation,this.source,!this.from&&this.detectedSourceLanguage||this.from,this.to,this.options)},stop:function(){if(this.stopped){return this}this.stopped=d;this.options.error.call(this,{message:"stopped"});return this}};c.translate=function(z,x){if(z==e){return new a()}if(c.isFunction(z)){return c.translate.ready(z,x)}var A=new a();var y=[].slice.call(arguments,0);y.shift();return c.translate.ready(w(A._init,A,[z,m(y,c.translate.defaults)]),g,A)};c.translate.fn=c.translate.prototype=a.prototype;c.translate.fn.extend=c.translate.extend=c.extend;c.translate.extend({_bind:w,_filter:i,_validate:o,_getOpt:m,_defaults:h,defaults:c.extend({},h),capitalize:function(x){return x.charAt(0).toUpperCase()+x.substr(1).toLowerCase()
},truncate:function(D,y){var z,G,E,C,B,F,x=encodeURIComponent(D);for(z=0;z<10;z++){try{F=decodeURIComponent(x.substr(0,y-z))}catch(A){continue}if(F){break}}return(!(G=/<(?![^<]*>)/.exec(F)))?((!(E=/>\s*$/.exec(F)))?((C=this._m3.exec(F))?((B=/>(?![^>]*<)/.exec(F))?(C.index>B.index?F.substring(0,C.index+1):F.substring(0,B.index+1)):F.substring(0,C.index+1)):F):F):F.substring(0,G.index)},getLanguages:function(E,D){if(E==e||(D==e&&!E)){return l}var B={},A=typeof E,z=D?c.translate.getLanguages(E):l,F=(A==="object"||A==="function")?E:D;if(F){if(F.call){B=i(z,F)}else{for(var C=0,y=F.length,x;C<y;C++){x=c.translate.toLanguage(F[C]);if(z[x]!=e){B[x]=z[x]}}}}else{B=i(l,n.isTranslatable)}return B},toLanguage:function(y,A){var z=y.toUpperCase();var x=q[z]||(l[z]?z:e)||q[(c.translate.languageCodeMap[y.toLowerCase()]||"").toUpperCase()];return x==e?e:A==="lowercase"?x.toLowerCase():A==="capitalize"?c.translate.capitalize(x):x},toLanguageCode:function(x){return l[x]||l[c.translate.toLanguage(x)]||c.translate.languageCodeMap[x.toLowerCase()]
},same:function(y,x){return y===x||f(y)===f(x)},isTranslatable:function(x){return n.isTranslatable(f(x))},languageCodeMap:{pt:"pt-PT","pt-br":"pt-PT",he:"iw",zlm:"ms","zh-hans":"zh-CN","zh-hant":"zh-TW"},isRtl:{ar:d,iw:d,fa:d,ur:d,yi:d},getBranding:function(){return c(n.getBranding.apply(n,arguments))},load:function(y,x){b=d;function z(){google.load("language",x||"1",{callback:s})}if(typeof google!=="undefined"&&google.load){z()}else{c.getScript(((document.location.protocol=="https:")?"https://":"http://")+"www.google.com/jsapi"+(y?"?key="+y:""),z)}return c.translate},ready:function(x,z,y){c.translate.isReady?x():j.push(x);if(!b&&!z){c.translate.load()}return y||c.translate},isReady:g,overload:[[[],[]],[[v,v,t],["from","to","options"]],[[v,t],["to","options"]],[[t],["options"]],[[v,v],["from","to"]],[[v],["to"]],[[v,v,k],["from","to","complete"]],[[v,k],["to","complete"]]],stripScripts:w(u,d,[/<script[^>]*>([\s\S]*?)<\/script>/gi,""]),stripWhitespace:w(u,d,[/\s\s+/g," "]),stripComments:w(u,d,[/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/g,""])})
})(jQuery);

(function(g){var f=true,a={text:f,button:f,submit:f},b={SCRIPT:f,NOSCRIPT:f,STYLE:f,OBJECT:f,IFRAME:f},e=g([]);e.length=1;function d(i){while(i&&i.nodeType!=9){i=i.parentNode}return i}function c(j,i){var k=j.css("text-align");j.css("direction",i);if(k==="right"){j.css("text-align","left")}if(k==="left"){j.css("text-align","right")}}function h(j,k){var l=j.nodeName.toUpperCase(),i=l==="INPUT"&&g.attr(j,"type").toLowerCase();k=k||{altAndVal:f,subject:f};return typeof k.subject==="string"?k.subject:k.altAndVal&&(l==="IMG"||i==="image")?"alt":k.altAndVal&&a[i]?"$val":l==="TEXTAREA"?"$val":"$html"}g.translate.fn._toggle=function(){var j=this.options,k=j.to,i;this.elements.each(g.translate._bind(function(l,m){this.i=l;var o=g(m),n=g.translate.getData(o,k,j);if(!n){return !(i=f)}this.translation.push(n);j.each.call(this,l,m,n,this.source[l],this.from,k,j)
},this));!i?this._complete():this._process()};g.translate.extend({_getType:h,each:function(k,m,j,l,q,p,n){e[0]=m;g.translate.setData(e,p,j,q,l,n);g.translate.replace(e,j,p,n);g.translate.setLangAttr(e,p,n)},getData:function(k,m,l){var i=k[0]||k,j=g.data(i,"translation");return j&&j[m]&&j[m][h(i,l)]},setData:function(l,n,q,p,r,i){if(i&&!i.data){return}var j=l[0]||l,m=h(j,i),k=g.data(j,"translation");k=k||g.data(j,"translation",{});(k[p]=k[p]||{})[m]=r;(k[n]=k[n]||{})[m]=q},replace:function(m,u,s,k){if(k&&!k.replace){return}if(k&&typeof k.subject==="string"){return m.attr(k.subject,u)}var l=m[0]||m,q=l.nodeName.toUpperCase(),p=q==="INPUT"&&g.attr(l,"type").toLowerCase(),n=g.translate.isRtl,j=g.data(l,"lang");if(!k.alwaysReplace){if(j===s){return}}if(n[s]!==n[j||k&&k.from]){if(n[s]){c(m,"rtl")}else{if(m.css("direction")==="rtl"){c(m,"ltr")}}}if((!k||k.altAndVal)&&(q==="IMG"||p==="image")){m.attr("alt",u)}else{if(q==="TEXTAREA"||(!k||k.altAndVal)&&a[p]){m.val(u)}else{if(!k||k.rebind){this.doc=this.doc||d(l);
var i=m.find("*").not("script"),r=g(this.doc.createElement("div")).html(u);g.translate.copyEvents(i,r.find("*"));m.html(r.contents())}else{m.html(u)}}}g.data(l,"lang",s)},setLangAttr:function(i,k,j){if(!j||j.setLangAttr){i.attr((!j||j.setLangAttr===f)?"lang":j.setLangAttr,k)}},copyEvents:function(j,i){i.each(function(l,o){var p=j[l];if(!o||!p){return false}if(b[p.nodeName.toUpperCase()]){return f}var k=g.data(p,"events");if(!k){return f}for(var n in k){for(var m in k[n]){g.event.add(o,n,k[n][m],k[n][m].data)}}})}});g.fn.translate=function(j,i,m){var k=g.translate._getOpt(arguments,g.fn.translate.defaults),l=g.extend({},g.translate._defaults,g.fn.translate.defaults,k,{complete:function(o,n){g.translate(function(){var r=g.translate.toLanguageCode(k.from);if(k.fromOriginal){o.each(function(s,t){e[0]=t;var u=g.translate.getData(e,r,k);if(!u){return true}n[s]=u})}var q=k.each;function p(s){return function(){[].unshift.call(arguments,this.elements);s.apply(this,arguments)}}k.nodes=o;k.start=p(k.start);
k.onTimeout=p(k.onTimeout);k.complete=p(k.complete);k.each=function(t){var s=arguments;if(arguments.length!==7){[].splice.call(s,1,0,this.elements[t])}this.each.apply(this,s);q.apply(this,s)};g.translate(n,k)})},each:function(){}});if(this.nodesContainingText){return this.nodesContainingText(l)}k.nodes=this;g.translate(g.map(this,function(n){return g(n).html()||g(n).val()}),k);return this};g.fn.translate.defaults=g.extend({},g.translate._defaults)})(jQuery);