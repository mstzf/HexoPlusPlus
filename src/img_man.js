!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Zooming=e()}(this,function(){"use strict";var t="auto",e="zoom-in",i="zoom-out",n="grab",s="move";function o(t,e,i){var n={passive:!1};!(arguments.length>3&&void 0!==arguments[3])||arguments[3]?t.addEventListener(e,i,n):t.removeEventListener(e,i,n)}function r(t,e){if(t){var i=new Image;i.onload=function(){e&&e(i)},i.src=t}}function a(t){return t.dataset.original?t.dataset.original:"A"===t.parentNode.tagName?t.parentNode.getAttribute("href"):null}function l(t,e,i){!function(t){var e=h.transitionProp,i=h.transformProp;if(t.transition){var n=t.transition;delete t.transition,t[e]=n}if(t.transform){var s=t.transform;delete t.transform,t[i]=s}}(e);var n=t.style,s={};for(var o in e)i&&(s[o]=n[o]||""),n[o]=e[o];return s}var h={transitionProp:"transition",transEndEvent:"transitionend",transformProp:"transform",transformCssProp:"transform"},c=h.transformCssProp,u=h.transEndEvent;var d=function(){},f={enableGrab:!0,preloadImage:!1,closeOnWindowResize:!0,transitionDuration:.4,transitionTimingFunction:"cubic-bezier(0.4, 0, 0, 1)",bgColor:"rgb(255, 255, 255)",bgOpacity:1,scaleBase:1,scaleExtra:.5,scrollThreshold:40,zIndex:998,customSize:null,onOpen:d,onClose:d,onGrab:d,onMove:d,onRelease:d,onBeforeOpen:d,onBeforeClose:d,onBeforeGrab:d,onBeforeRelease:d,onImageLoading:d,onImageLoaded:d},p={init:function(t){var e,i;e=this,i=t,Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(function(t){e[t]=e[t].bind(i)})},click:function(t){if(t.preventDefault(),m(t))return window.open(this.target.srcOriginal||t.currentTarget.src,"_blank");this.shown?this.released?this.close():this.release():this.open(t.currentTarget)},scroll:function(){var t=document.documentElement||document.body.parentNode||document.body,e=window.pageXOffset||t.scrollLeft,i=window.pageYOffset||t.scrollTop;null===this.lastScrollPosition&&(this.lastScrollPosition={x:e,y:i});var n=this.lastScrollPosition.x-e,s=this.lastScrollPosition.y-i,o=this.options.scrollThreshold;(Math.abs(s)>=o||Math.abs(n)>=o)&&(this.lastScrollPosition=null,this.close())},keydown:function(t){(function(t){return"Escape"===(t.key||t.code)||27===t.keyCode})(t)&&(this.released?this.close():this.release(this.close))},mousedown:function(t){if(y(t)&&!m(t)){t.preventDefault();var e=t.clientX,i=t.clientY;this.pressTimer=setTimeout(function(){this.grab(e,i)}.bind(this),200)}},mousemove:function(t){this.released||this.move(t.clientX,t.clientY)},mouseup:function(t){y(t)&&!m(t)&&(clearTimeout(this.pressTimer),this.released?this.close():this.release())},touchstart:function(t){t.preventDefault();var e=t.touches[0],i=e.clientX,n=e.clientY;this.pressTimer=setTimeout(function(){this.grab(i,n)}.bind(this),200)},touchmove:function(t){if(!this.released){var e=t.touches[0],i=e.clientX,n=e.clientY;this.move(i,n)}},touchend:function(t){(function(t){t.targetTouches.length})(t)||(clearTimeout(this.pressTimer),this.released?this.close():this.release())},clickOverlay:function(){this.close()},resizeWindow:function(){this.close()}};function y(t){return 0===t.button}function m(t){return t.metaKey||t.ctrlKey}var g={init:function(t){this.el=document.createElement("div"),this.instance=t,this.parent=document.body,l(this.el,{position:"fixed",top:0,left:0,right:0,bottom:0,opacity:0}),this.updateStyle(t.options),o(this.el,"click",t.handler.clickOverlay.bind(t))},updateStyle:function(t){l(this.el,{zIndex:t.zIndex,backgroundColor:t.bgColor,transition:"opacity\n        "+t.transitionDuration+"s\n        "+t.transitionTimingFunction})},insert:function(){this.parent.appendChild(this.el)},remove:function(){this.parent.removeChild(this.el)},fadeIn:function(){this.el.offsetWidth,this.el.style.opacity=this.instance.options.bgOpacity},fadeOut:function(){this.el.style.opacity=0}},v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},w=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),x=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},O={init:function(t,e){this.el=t,this.instance=e,this.srcThumbnail=this.el.getAttribute("src"),this.srcset=this.el.getAttribute("srcset"),this.srcOriginal=a(this.el),this.rect=this.el.getBoundingClientRect(),this.translate=null,this.scale=null,this.styleOpen=null,this.styleClose=null},zoomIn:function(){var t=this.instance.options,e=t.zIndex,s=t.enableGrab,o=t.transitionDuration,r=t.transitionTimingFunction;this.translate=this.calculateTranslate(),this.scale=this.calculateScale(),this.styleOpen={position:"relative",zIndex:e+1,cursor:s?n:i,transition:c+"\n        "+o+"s\n        "+r,transform:"translate3d("+this.translate.x+"px, "+this.translate.y+"px, 0px)\n        scale("+this.scale.x+","+this.scale.y+")",height:this.rect.height+"px",width:this.rect.width+"px"},this.el.offsetWidth,this.styleClose=l(this.el,this.styleOpen,!0)},zoomOut:function(){this.el.offsetWidth,l(this.el,{transform:"none"})},grab:function(t,e,i){var n=k(),o=n.x-t,r=n.y-e;l(this.el,{cursor:s,transform:"translate3d(\n        "+(this.translate.x+o)+"px, "+(this.translate.y+r)+"px, 0px)\n        scale("+(this.scale.x+i)+","+(this.scale.y+i)+")"})},move:function(t,e,i){var n=k(),s=n.x-t,o=n.y-e;l(this.el,{transition:c,transform:"translate3d(\n        "+(this.translate.x+s)+"px, "+(this.translate.y+o)+"px, 0px)\n        scale("+(this.scale.x+i)+","+(this.scale.y+i)+")"})},restoreCloseStyle:function(){l(this.el,this.styleClose)},restoreOpenStyle:function(){l(this.el,this.styleOpen)},upgradeSource:function(){if(this.srcOriginal){var t=this.el.parentNode;this.srcset&&this.el.removeAttribute("srcset");var e=this.el.cloneNode(!1);e.setAttribute("src",this.srcOriginal),e.style.position="fixed",e.style.visibility="hidden",t.appendChild(e),setTimeout(function(){this.el.setAttribute("src",this.srcOriginal),t.removeChild(e)}.bind(this),50)}},downgradeSource:function(){this.srcOriginal&&(this.srcset&&this.el.setAttribute("srcset",this.srcset),this.el.setAttribute("src",this.srcThumbnail))},calculateTranslate:function(){var t=k(),e=this.rect.left+this.rect.width/2,i=this.rect.top+this.rect.height/2;return{x:t.x-e,y:t.y-i}},calculateScale:function(){var t=this.el.dataset,e=t.zoomingHeight,i=t.zoomingWidth,n=this.instance.options,s=n.customSize,o=n.scaleBase;if(!s&&e&&i)return{x:i/this.rect.width,y:e/this.rect.height};if(s&&"object"===(void 0===s?"undefined":v(s)))return{x:s.width/this.rect.width,y:s.height/this.rect.height};var r=this.rect.width/2,a=this.rect.height/2,l=k(),h={x:l.x-r,y:l.y-a},c=h.x/r,u=h.y/a,d=o+Math.min(c,u);if(s&&"string"==typeof s){var f=i||this.el.naturalWidth,p=e||this.el.naturalHeight,y=parseFloat(s)*f/(100*this.rect.width),m=parseFloat(s)*p/(100*this.rect.height);if(d>y||d>m)return{x:y,y:m}}return{x:d,y:d}}};function k(){var t=document.documentElement;return{x:Math.min(t.clientWidth,window.innerWidth)/2,y:Math.min(t.clientHeight,window.innerHeight)/2}}function S(t,e,i){["mousedown","mousemove","mouseup","touchstart","touchmove","touchend"].forEach(function(n){o(t,n,e[n],i)})}return function(){function i(t){b(this,i),this.target=Object.create(O),this.overlay=Object.create(g),this.handler=Object.create(p),this.body=document.body,this.shown=!1,this.lock=!1,this.released=!0,this.lastScrollPosition=null,this.pressTimer=null,this.options=x({},f,t),this.overlay.init(this),this.handler.init(this)}return w(i,[{key:"listen",value:function(t){if("string"==typeof t)for(var i=document.querySelectorAll(t),n=i.length;n--;)this.listen(i[n]);else"IMG"===t.tagName&&(t.style.cursor=e,o(t,"click",this.handler.click),this.options.preloadImage&&r(a(t)));return this}},{key:"config",value:function(t){return t?(x(this.options,t),this.overlay.updateStyle(this.options),this):this.options}},{key:"open",value:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.options.onOpen;if(!this.shown&&!this.lock){var n="string"==typeof t?document.querySelector(t):t;if("IMG"===n.tagName){if(this.options.onBeforeOpen(n),this.target.init(n,this),!this.options.preloadImage){var s=this.target.srcOriginal;null!=s&&(this.options.onImageLoading(n),r(s,this.options.onImageLoaded))}this.shown=!0,this.lock=!0,this.target.zoomIn(),this.overlay.insert(),this.overlay.fadeIn(),o(document,"scroll",this.handler.scroll),o(document,"keydown",this.handler.keydown),this.options.closeOnWindowResize&&o(window,"resize",this.handler.resizeWindow);return o(n,u,function t(){o(n,u,t,!1),e.lock=!1,e.target.upgradeSource(),e.options.enableGrab&&S(document,e.handler,!0),i(n)}),this}}}},{key:"close",value:function(){var e=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.options.onClose;if(this.shown&&!this.lock){var n=this.target.el;this.options.onBeforeClose(n),this.lock=!0,this.body.style.cursor=t,this.overlay.fadeOut(),this.target.zoomOut(),o(document,"scroll",this.handler.scroll,!1),o(document,"keydown",this.handler.keydown,!1),this.options.closeOnWindowResize&&o(window,"resize",this.handler.resizeWindow,!1);return o(n,u,function t(){o(n,u,t,!1),e.shown=!1,e.lock=!1,e.target.downgradeSource(),e.options.enableGrab&&S(document,e.handler,!1),e.target.restoreCloseStyle(),e.overlay.remove(),i(n)}),this}}},{key:"grab",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.options.scaleExtra,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.options.onGrab;if(this.shown&&!this.lock){var s=this.target.el;this.options.onBeforeGrab(s),this.released=!1,this.target.grab(t,e,i);return o(s,u,function t(){o(s,u,t,!1),n(s)}),this}}},{key:"move",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.options.scaleExtra,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.options.onMove;if(this.shown&&!this.lock){this.released=!1,this.body.style.cursor=s,this.target.move(t,e,i);var r=this.target.el;return o(r,u,function t(){o(r,u,t,!1),n(r)}),this}}},{key:"release",value:function(){var e=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.options.onRelease;if(this.shown&&!this.lock){var n=this.target.el;this.options.onBeforeRelease(n),this.lock=!0,this.body.style.cursor=t,this.target.restoreOpenStyle();return o(n,u,function t(){o(n,u,t,!1),e.lock=!1,e.released=!0,i(n)}),this}}}]),i}()});

			function start_limit(){
				var $table = $("table");
            var currentPage = 0; 
            var pageSize = hpp_page_limit;  
            $table.bind('paging', function () {
                $table.find('tbody tr').hide().slice(currentPage * pageSize, (currentPage + 1) * pageSize).show();
            });
            var sumRows = $table.find('tbody tr').length;
            var sumPages = Math.ceil(sumRows / pageSize); 

            var $pager = $('<div class="page" style="text-align:center;"></div>');  
            for (var pageIndex = 0; pageIndex < sumPages; pageIndex++) {
                $('<a href="#" id="pageStyle" onclick="changCss(this)"><span>' + (pageIndex + 1) + '</span></a>').bind("click", { "newPage": pageIndex }, function (event) {
                    currentPage = event.data["newPage"];
                    $table.trigger("paging");
                }).appendTo($pager);
                $pager.append(" ");
            }
            $pager.insertAfter($table);
            $table.trigger("paging");

            var $pagess = $('#pageStyle');
            $pagess[0].style.backgroundColor = "#ccc";
            $pagess[0].style.color = "#ffffff";
				
			}
      function changCss(obj) {
            var arr = document.getElementsByTagName("a");
            for (var i = 0; i < arr.length; i++) {
                if (obj == arr[i]) {     
                    obj.style.backgroundColor = "#ccc";
                    obj.style.color = "#ffffff";
                }
                else {
                    arr[i].style.color = "";
                    arr[i].style.backgroundColor = "";
                }
            }
        }  
function round(number, precision) {
    return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
}

let imgsize=0
var ctJson = "/hpp/admin/api/getimglist"
        $.getJSON(ctJson, function (data) {
			document.getElementById("tbody_img").innerHTML=""
            $.each(data, function (index, value) {
				imgsize=round(value.size/1024, 2)
                $("#tbody_img").append(`
				<tr>
                          <td>
                           ${value.name}
                          <\/td>
                          <td>
                            ${imgsize}KB
                          <\/td>
						  <td>
                            <figure><img data-src="https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${value.name}" class="lazy_img" style="width:100px" src="${hpp_lazy_img}" class='img-zoomable'></figure>
                          <\/td>
                          <td>
                            <a href="https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${value.name}">CDN链接<\/a>
                          <\/td>
                          <td>
                            <a href="javascript:del(\'${value.name}\');">删除<\/a>
                          <\/td>
						  <td>
                            <a href="${value.download_url}">原始地址<\/a>
                          <\/td>
						  <td>
                            <a href="${value.html_url}">Github地址<\/a>
                          <\/td>
                        <\/tr>
                `);
            });  start_limit();$('.lazy_img').Lazy();new Zooming({}).listen('img')});
			function del(name){
	swal({
  title: "确定！",
  text: `你将要删除${name}，真的这么做么？`,
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    delfile(name);
  } else {
    swal("好的，当前文件没有被删除", {
      icon: "success",
    });
  }
});
	}
	function delfile(name){
			swal({title: "\n删除中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
	var ajax = ajaxObject();
    ajax.open( "GET" , '/hpp/admin/api/delimage/'+name , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {swal.close()
            swal("已删除！","", {
  icon: "success",
  buttons: {
    yes: "是"
  },
})
.then((value) => {
  switch (value) {
    default:
	  window.location.reload();
  }
});
            }
		else{swal.close()
			swal({
				title: "失败！",
				text: "文件删除失败，请确定您是否有权限删除，或者该文件是否存在",
				icon: "warning",
			});
			}
	}
	}
	ajax.send(new Date().getTime());};

