var _self=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{},Prism=function(g){var y=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,$=0,L={},s={manual:g.Prism&&g.Prism.manual,disableWorkerMessageHandler:g.Prism&&g.Prism.disableWorkerMessageHandler,util:{encode:function t(e){return e instanceof d?new d(e.type,t(e.content),e.alias):Array.isArray(e)?e.map(t):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(t){return Object.prototype.toString.call(t).slice(8,-1)},objId:function(t){return t.__id||Object.defineProperty(t,"__id",{value:++$}),t.__id},clone:function t(e,r){var n,a;switch(r=r||{},s.util.type(e)){case"Object":if(a=s.util.objId(e),r[a])return r[a];for(var o in n={},r[a]=n,e)e.hasOwnProperty(o)&&(n[o]=t(e[o],r));return n;case"Array":return a=s.util.objId(e),r[a]?r[a]:(n=[],r[a]=n,e.forEach(function(l,c){n[c]=t(l,r)}),n);default:return e}},getLanguage:function(t){for(;t;){var e=y.exec(t.className);if(e)return e[1].toLowerCase();t=t.parentElement}return"none"},setLanguage:function(t,e){t.className=t.className.replace(RegExp(y,"gi"),""),t.classList.add("language-"+e)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(n){var t=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(n.stack)||[])[1];if(t){var e=document.getElementsByTagName("script");for(var r in e)if(e[r].src==t)return e[r]}return null}},isActive:function(t,e,r){for(var n="no-"+e;t;){var a=t.classList;if(a.contains(e))return!0;if(a.contains(n))return!1;t=t.parentElement}return!!r}},languages:{plain:L,plaintext:L,text:L,txt:L,extend:function(t,e){var r=s.util.clone(s.languages[t]);for(var n in e)r[n]=e[n];return r},insertBefore:function(t,e,r,n){var a=(n=n||s.languages)[t],o={};for(var l in a)if(a.hasOwnProperty(l)){if(l==e)for(var c in r)r.hasOwnProperty(c)&&(o[c]=r[c]);r.hasOwnProperty(l)||(o[l]=a[l])}var w=n[t];return n[t]=o,s.languages.DFS(s.languages,function(k,z){z===w&&k!=t&&(this[k]=o)}),o},DFS:function t(e,r,n,a){a=a||{};var o=s.util.objId;for(var l in e)if(e.hasOwnProperty(l)){r.call(e,l,e[l],n||l);var c=e[l],w=s.util.type(c);w!=="Object"||a[o(c)]?w!=="Array"||a[o(c)]||(a[o(c)]=!0,t(c,r,l,a)):(a[o(c)]=!0,t(c,r,null,a))}}},plugins:{},highlightAll:function(t,e){s.highlightAllUnder(document,t,e)},highlightAllUnder:function(t,e,r){var n={callback:r,container:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};s.hooks.run("before-highlightall",n),n.elements=Array.prototype.slice.apply(n.container.querySelectorAll(n.selector)),s.hooks.run("before-all-elements-highlight",n);for(var a,o=0;a=n.elements[o++];)s.highlightElement(a,e===!0,n.callback)},highlightElement:function(t,e,r){var n=s.util.getLanguage(t),a=s.languages[n];s.util.setLanguage(t,n);var o=t.parentElement;o&&o.nodeName.toLowerCase()==="pre"&&s.util.setLanguage(o,n);var l={element:t,language:n,grammar:a,code:t.textContent};function c(k){l.highlightedCode=k,s.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,s.hooks.run("after-highlight",l),s.hooks.run("complete",l),r&&r.call(l.element)}if(s.hooks.run("before-sanity-check",l),(o=l.element.parentElement)&&o.nodeName.toLowerCase()==="pre"&&!o.hasAttribute("tabindex")&&o.setAttribute("tabindex","0"),!l.code)return s.hooks.run("complete",l),void(r&&r.call(l.element));if(s.hooks.run("before-highlight",l),l.grammar)if(e&&g.Worker){var w=new Worker(s.filename);w.onmessage=function(k){c(k.data)},w.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else c(s.highlight(l.code,l.grammar,l.language));else c(s.util.encode(l.code))},highlight:function(t,e,r){var n={code:t,grammar:e,language:r};if(s.hooks.run("before-tokenize",n),!n.grammar)throw new Error('The language "'+n.language+'" has no grammar.');return n.tokens=s.tokenize(n.code,n.grammar),s.hooks.run("after-tokenize",n),d.stringify(s.util.encode(n.tokens),n.language)},tokenize:function(t,e){var r=e.rest;if(r){for(var n in r)e[n]=r[n];delete e.rest}var a=new h;return f(a,a.head,t),u(t,a,e,a.head,0),function(o){for(var l=[],c=o.head.next;c!==o.tail;)l.push(c.value),c=c.next;return l}(a)},hooks:{all:{},add:function(t,e){var r=s.hooks.all;r[t]=r[t]||[],r[t].push(e)},run:function(t,e){var r=s.hooks.all[t];if(r&&r.length)for(var n,a=0;n=r[a++];)n(e)}},Token:d};function d(t,e,r,n){this.type=t,this.content=e,this.alias=r,this.length=0|(n||"").length}function b(t,e,r,n){t.lastIndex=e;var a=t.exec(r);if(a&&n&&a[1]){var o=a[1].length;a.index+=o,a[0]=a[0].slice(o)}return a}function u(t,e,r,n,a,o){for(var l in r)if(r.hasOwnProperty(l)&&r[l]){var c=r[l];c=Array.isArray(c)?c:[c];for(var w=0;w<c.length;++w){if(o&&o.cause==l+","+w)return;var k=c[w],z=k.inside,O=!!k.lookbehind,F=!!k.greedy,T=k.alias;if(F&&!k.pattern.global){var E=k.pattern.toString().match(/[imsuy]*$/)[0];k.pattern=RegExp(k.pattern.source,E+"g")}for(var S=k.pattern||k,p=n.next,A=a;p!==e.tail&&!(o&&A>=o.reach);A+=p.value.length,p=p.next){var _=p.value;if(e.length>t.length)return;if(!(_ instanceof d)){var C,N=1;if(F){if(!(C=b(S,A,t,O))||C.index>=t.length)break;var q=C.index,W=C.index+C[0].length,H=A;for(H+=p.value.length;q>=H;)H+=(p=p.next).value.length;if(A=H-=p.value.length,p.value instanceof d)continue;for(var j=p;j!==e.tail&&(H<W||typeof j.value=="string");j=j.next)N++,H+=j.value.length;N--,_=t.slice(A,H),C.index-=A}else if(!(C=b(S,0,_,O)))continue;q=C.index;var I=C[0],R=_.slice(0,q),D=_.slice(q+I.length),M=A+_.length;o&&M>o.reach&&(o.reach=M);var B=p.prev;if(R&&(B=f(e,B,R),A+=R.length),v(e,B,N),p=f(e,B,new d(l,z?s.tokenize(I,z):I,T,I)),D&&f(e,p,D),N>1){var P={cause:l+","+w,reach:M};u(t,e,r,p.prev,A,P),o&&P.reach>o.reach&&(o.reach=P.reach)}}}}}}function h(){var t={value:null,prev:null,next:null},e={value:null,prev:t,next:null};t.next=e,this.head=t,this.tail=e,this.length=0}function f(t,e,r){var n=e.next,a={value:r,prev:e,next:n};return e.next=a,n.prev=a,t.length++,a}function v(t,e,r){for(var n=e.next,a=0;a<r&&n!==t.tail;a++)n=n.next;e.next=n,n.prev=e,t.length-=a}if(g.Prism=s,d.stringify=function t(e,r){if(typeof e=="string")return e;if(Array.isArray(e)){var n="";return e.forEach(function(w){n+=t(w,r)}),n}var a={type:e.type,content:t(e.content,r),tag:"span",classes:["token",e.type],attributes:{},language:r},o=e.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(a.classes,o):a.classes.push(o)),s.hooks.run("wrap",a);var l="";for(var c in a.attributes)l+=" "+c+'="'+(a.attributes[c]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+l+">"+a.content+"</"+a.tag+">"},!g.document)return g.addEventListener&&(s.disableWorkerMessageHandler||g.addEventListener("message",function(t){var e=JSON.parse(t.data),r=e.language,n=e.code,a=e.immediateClose;g.postMessage(s.highlight(n,s.languages[r],r)),a&&g.close()},!1)),s;var i=s.util.currentScript();function m(){s.manual||s.highlightAll()}if(i&&(s.filename=i.src,i.hasAttribute("data-manual")&&(s.manual=!0)),!s.manual){var x=document.readyState;x==="loading"||x==="interactive"&&i&&i.defer?document.addEventListener("DOMContentLoaded",m):window.requestAnimationFrame?window.requestAnimationFrame(m):window.setTimeout(m,16)}return s}(_self);typeof module<"u"&&module.exports&&(module.exports=Prism),typeof global<"u"&&(global.Prism=Prism),Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(g){g.type==="entity"&&(g.attributes.title=g.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(g,y){var $={};$["language-"+y]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[y]},$.cdata=/^<!\[CDATA\[|\]\]>$/i;var L={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:$}};L["language-"+y]={pattern:/[\s\S]+/,inside:Prism.languages[y]};var s={};s[g]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return g}),"i"),lookbehind:!0,greedy:!0,inside:L},Prism.languages.insertBefore("markup","cdata",s)}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(g,y){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(`(^|["'\\s])(?:`+g+`)\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s'">=]+(?=[\\s>]))`,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[y,"language-"+y],inside:Prism.languages[y]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml,function(g){var y=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;g.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|`+y.source+")*?(?:;|(?=\\s*\\{))"),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+y.source+`|(?:[^\\\\\r
()"']|\\\\[^])*)\\)`,"i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+y.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+y.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:y,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},g.languages.css.atrule.inside.rest=g.languages.css;var $=g.languages.markup;$&&($.tag.addInlined("style","css"),$.tag.addAttribute("style","css"))}(Prism),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(`((?:^|[^$\\w\\xA0-\\uFFFF."'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r
]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r
])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r
]|\\\\.|\\[(?:[^[\\]\\\\\r
]|\\\\.|\\[(?:[^[\\]\\\\\r
]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r
])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r
,.;:})\\]]|//))`),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)","javascript")),Prism.languages.js=Prism.languages.javascript,function(){if(typeof Prism<"u"&&typeof document<"u"&&document.querySelector){var g,y="line-numbers",$="linkable-line-numbers",L=/\n(?!$)/g,s=!0;Prism.plugins.lineHighlight={highlightLines:function(i,m,x){var t=(m=typeof m=="string"?m:i.getAttribute("data-line")||"").replace(/\s+/g,"").split(",").filter(Boolean),e=+i.getAttribute("data-line-offset")||0,r=(function(){if(g===void 0){var F=document.createElement("div");F.style.fontSize="13px",F.style.lineHeight="1.5",F.style.padding="0",F.style.border="0",F.innerHTML="&nbsp;<br />&nbsp;",document.body.appendChild(F),g=F.offsetHeight===38,document.body.removeChild(F)}return g}()?parseInt:parseFloat)(getComputedStyle(i).lineHeight),n=Prism.util.isActive(i,y),a=i.querySelector("code"),o=n?i:a||i,l=[],c=a.textContent.match(L),w=c?c.length+1:1,k=a&&o!=a?function(F,T){var E=getComputedStyle(F),S=getComputedStyle(T);function p(A){return+A.substr(0,A.length-2)}return T.offsetTop+p(S.borderTopWidth)+p(S.paddingTop)-p(E.paddingTop)}(i,a):0;t.forEach(function(F){var T=F.split("-"),E=+T[0],S=+T[1]||E;if(!((S=Math.min(w+e,S))<E)){var p=i.querySelector('.line-highlight[data-range="'+F+'"]')||document.createElement("div");if(l.push(function(){p.setAttribute("aria-hidden","true"),p.setAttribute("data-range",F),p.className=(x||"")+" line-highlight"}),n&&Prism.plugins.lineNumbers){var A=Prism.plugins.lineNumbers.getLine(i,E),_=Prism.plugins.lineNumbers.getLine(i,S);if(A){var C=A.offsetTop+k+"px";l.push(function(){p.style.top=C})}if(_){var N=_.offsetTop-A.offsetTop+_.offsetHeight+"px";l.push(function(){p.style.height=N})}}else l.push(function(){p.setAttribute("data-start",String(E)),S>E&&p.setAttribute("data-end",String(S)),p.style.top=(E-e-1)*r+k+"px",p.textContent=new Array(S-E+2).join(` 
`)});l.push(function(){p.style.width=i.scrollWidth+"px"}),l.push(function(){o.appendChild(p)})}});var z=i.id;if(n&&Prism.util.isActive(i,$)&&z){u(i,$)||l.push(function(){i.classList.add($)});var O=parseInt(i.getAttribute("data-start")||"1");b(".line-numbers-rows > span",i).forEach(function(F,T){var E=T+O;F.onclick=function(){var S=z+"."+E;s=!1,location.hash=S,setTimeout(function(){s=!0},1)}})}return function(){l.forEach(h)}}};var d=0;Prism.hooks.add("before-sanity-check",function(i){var m=i.element.parentElement;if(f(m)){var x=0;b(".line-highlight",m).forEach(function(t){x+=t.textContent.length,t.parentNode.removeChild(t)}),x&&/^(?: \n)+$/.test(i.code.slice(-x))&&(i.code=i.code.slice(0,-x))}}),Prism.hooks.add("complete",function i(m){var x=m.element.parentElement;if(f(x)){clearTimeout(d);var t=Prism.plugins.lineNumbers,e=m.plugins&&m.plugins.lineNumbers;u(x,y)&&t&&!e?Prism.hooks.add("line-numbers",i):(Prism.plugins.lineHighlight.highlightLines(x)(),d=setTimeout(v,1))}}),window.addEventListener("hashchange",v),window.addEventListener("resize",function(){b("pre").filter(f).map(function(i){return Prism.plugins.lineHighlight.highlightLines(i)}).forEach(h)})}function b(i,m){return Array.prototype.slice.call((m||document).querySelectorAll(i))}function u(i,m){return i.classList.contains(m)}function h(i){i()}function f(i){return!!(i&&/pre/i.test(i.nodeName)&&(i.hasAttribute("data-line")||i.id&&Prism.util.isActive(i,$)))}function v(){var i=location.hash.slice(1);b(".temporary.line-highlight").forEach(function(e){e.parentNode.removeChild(e)});var m=(i.match(/\.([\d,-]+)$/)||[,""])[1];if(m&&!document.getElementById(i)){var x=i.slice(0,i.lastIndexOf(".")),t=document.getElementById(x);t&&(t.hasAttribute("data-line")||t.setAttribute("data-line",""),Prism.plugins.lineHighlight.highlightLines(t,m,"temporary ")(),s&&document.querySelector(".temporary.line-highlight").scrollIntoView())}}}(),function(){if(typeof Prism<"u"&&typeof document<"u"){var g="line-numbers",y=/\n(?!$)/g,$=Prism.plugins.lineNumbers={getLine:function(d,b){if(d.tagName==="PRE"&&d.classList.contains(g)){var u=d.querySelector(".line-numbers-rows");if(u){var h=parseInt(d.getAttribute("data-start"),10)||1,f=h+(u.children.length-1);b<h&&(b=h),b>f&&(b=f);var v=b-h;return u.children[v]}}},resize:function(d){s([d])},assumeViewportIndependence:!0},L=void 0;window.addEventListener("resize",function(){$.assumeViewportIndependence&&L===window.innerWidth||(L=window.innerWidth,s(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers"))))}),Prism.hooks.add("complete",function(d){if(d.code){var b=d.element,u=b.parentNode;if(u&&/pre/i.test(u.nodeName)&&!b.querySelector(".line-numbers-rows")&&Prism.util.isActive(b,g)){b.classList.remove(g),u.classList.add(g);var h,f=d.code.match(y),v=f?f.length+1:1,i=new Array(v+1).join("<span></span>");(h=document.createElement("span")).setAttribute("aria-hidden","true"),h.className="line-numbers-rows",h.innerHTML=i,u.hasAttribute("data-start")&&(u.style.counterReset="linenumber "+(parseInt(u.getAttribute("data-start"),10)-1)),d.element.appendChild(h),s([u]),Prism.hooks.run("line-numbers",d)}}}),Prism.hooks.add("line-numbers",function(d){d.plugins=d.plugins||{},d.plugins.lineNumbers=!0})}function s(d){if((d=d.filter(function(u){var h,f=(h=u,h?window.getComputedStyle?getComputedStyle(h):h.currentStyle||null:null)["white-space"];return f==="pre-wrap"||f==="pre-line"})).length!=0){var b=d.map(function(u){var h=u.querySelector("code"),f=u.querySelector(".line-numbers-rows");if(h&&f){var v=u.querySelector(".line-numbers-sizer"),i=h.textContent.split(y);v||((v=document.createElement("span")).className="line-numbers-sizer",h.appendChild(v)),v.innerHTML="0",v.style.display="block";var m=v.getBoundingClientRect().height;return v.innerHTML="",{element:u,lines:i,lineHeights:[],oneLinerHeight:m,sizer:v}}}).filter(Boolean);b.forEach(function(u){var h=u.sizer,f=u.lines,v=u.lineHeights,i=u.oneLinerHeight;v[f.length-1]=void 0,f.forEach(function(m,x){if(m&&m.length>1){var t=h.appendChild(document.createElement("span"));t.style.display="block",t.textContent=m}else v[x]=i})}),b.forEach(function(u){for(var h=u.sizer,f=u.lineHeights,v=0,i=0;i<f.length;i++)f[i]===void 0&&(f[i]=h.children[v++].getBoundingClientRect().height)}),b.forEach(function(u){var h=u.sizer,f=u.element.querySelector(".line-numbers-rows");h.style.display="none",h.innerHTML="",u.lineHeights.forEach(function(v,i){f.children[i].style.height=v+"px"})})}}}();
