/**
 * JavaScript Related to Favorites
 */
(function($){
    "use strict";

    /*-----------------------------------------------------------------------------------*/
    /* Add to favorites
    /*-----------------------------------------------------------------------------------*/
    if ( typeof favoriteData !== "undefined" ) {

        $('#add-to-favorite').on( 'click', function(e){
            var $this = $(this);
            e.preventDefault();
            if ( !$this.hasClass( 'added' ) ) {

                var star = $this.find( 'i' );
                var favoriteTitle = $this.find( 'span' );

                var addToFavorite = $.ajax({
                    url: favoriteData.ajaxURL,
                    method: "POST",
                    data: {
                        property_id : favoriteData.propertyID,
                        action : favoriteData.action
                    },
                    dataType: "json",
                    beforeSend: function( xhr ) {
                        star.addClass('fa-spin');
                    }
                });

                addToFavorite.done( function( response ) {
                    star.removeClass('fa-spin');
                    if ( response.success ) {
                        $this.addClass( 'added' );
                        star.removeClass( 'fa-star-o').addClass( 'fa-star' );
                        favoriteTitle.removeClass( 'failed' );
                        favoriteTitle.html( response.message );
                    } else {
                        favoriteTitle.addClass('failed');
                        favoriteTitle.html( response.message );
                    }
                });

                addToFavorite.fail( function( jqXHR, textStatus ) {
                    alert( "Request Failed: " + textStatus );
                });
            }
        });

    }


    /*-----------------------------------------------------------------------------------*/
    /* Remove from favorites
    /*-----------------------------------------------------------------------------------*/
    $( '.remove-from-favorite' ).on( 'click', function( event ) {
        event.preventDefault();
        var $this = $(this);
        var property_item = $this.closest('.col-grid-post');
        var loader = $this.siblings('.loader');

        var removeFromFavorites = $.ajax({
            url: $this.attr( 'href' ),
            type: "POST",
            data: {
                property_id : $this.data( 'property-id' ),
                action : "remove_from_favorites"
            },
            dataType: "json",
            beforeSend: function( xhr ) {
                $this.hide();
                loader.css('display', 'block');
            }
        });

        removeFromFavorites.done( function( response ) {
            if ( response.success ) {
                property_item.remove();
            } else {
                loader.hide();
                alert( response.message );
            }
        });

        removeFromFavorites.fail( function( jqXHR, textStatus ) {
            alert( "Request Failed: " + textStatus );
        });

    });


})(jQuery);



/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});



/**
 * JavaScript Related to Favorites
 */
(function($){
    "use strict";

    /*-----------------------------------------------------------------------------------*/
    /* Add to favorites
    /*-----------------------------------------------------------------------------------*/
    if ( typeof favoriteData !== "undefined" ) {

        $('#add-to-favorite').on( 'click', function(e){
            var $this = $(this);
            e.preventDefault();
            if ( !$this.hasClass( 'added' ) ) {

                var star = $this.find( 'i' );
                var favoriteTitle = $this.find( 'span' );

                var addToFavorite = $.ajax({
                    url: favoriteData.ajaxURL,
                    method: "POST",
                    data: {
                        property_id : favoriteData.propertyID,
                        action : favoriteData.action
                    },
                    dataType: "json",
                    beforeSend: function( xhr ) {
                        star.addClass('fa-spin');
                    }
                });

                addToFavorite.done( function( response ) {
                    star.removeClass('fa-spin');
                    if ( response.success ) {
                        $this.addClass( 'added' );
                        star.removeClass( 'fa-star-o').addClass( 'fa-star' );
                        favoriteTitle.removeClass( 'failed' );
                        favoriteTitle.html( response.message );
                    } else {
                        favoriteTitle.addClass('failed');
                        favoriteTitle.html( response.message );
                    }
                });

                addToFavorite.fail( function( jqXHR, textStatus ) {
                    alert( "Request Failed: " + textStatus );
                });
            }
        });

    }


    /*-----------------------------------------------------------------------------------*/
    /* Remove from favorites
    /*-----------------------------------------------------------------------------------*/
    $( '.remove-from-favorite' ).on( 'click', function( event ) {
        event.preventDefault();
        var $this = $(this);
        var property_item = $this.closest('.col-grid-post');
        var loader = $this.siblings('.loader');

        var removeFromFavorites = $.ajax({
            url: $this.attr( 'href' ),
            type: "POST",
            data: {
                property_id : $this.data( 'property-id' ),
                action : "remove_from_favorites"
            },
            dataType: "json",
            beforeSend: function( xhr ) {
                $this.hide();
                loader.css('display', 'block');
            }
        });

        removeFromFavorites.done( function( response ) {
            if ( response.success ) {
                property_item.remove();
            } else {
                loader.hide();
                alert( response.message );
            }
        });

        removeFromFavorites.fail( function( jqXHR, textStatus ) {
            alert( "Request Failed: " + textStatus );
        });

    });


})(jQuery);/**
 * JavaScript Related to Favorites
 */
(function($){
    "use strict";

    /*-----------------------------------------------------------------------------------*/
    /* Add to favorites
    /*-----------------------------------------------------------------------------------*/
    if ( typeof favoriteData !== "undefined" ) {

        $('#add-to-favorite').on( 'click', function(e){
            var $this = $(this);
            e.preventDefault();
            if ( !$this.hasClass( 'added' ) ) {

                var star = $this.find( 'i' );
                var favoriteTitle = $this.find( 'span' );

                var addToFavorite = $.ajax({
                    url: favoriteData.ajaxURL,
                    method: "POST",
                    data: {
                        property_id : favoriteData.propertyID,
                        action : favoriteData.action
                    },
                    dataType: "json",
                    beforeSend: function( xhr ) {
                        star.addClass('fa-spin');
                    }
                });

                addToFavorite.done( function( response ) {
                    star.removeClass('fa-spin');
                    if ( response.success ) {
                        $this.addClass( 'added' );
                        star.removeClass( 'fa-star-o').addClass( 'fa-star' );
                        favoriteTitle.removeClass( 'failed' );
                        favoriteTitle.html( response.message );
                    } else {
                        favoriteTitle.addClass('failed');
                        favoriteTitle.html( response.message );
                    }
                });

                addToFavorite.fail( function( jqXHR, textStatus ) {
                    alert( "Request Failed: " + textStatus );
                });
            }
        });

    }


    /*-----------------------------------------------------------------------------------*/
    /* Remove from favorites
    /*-----------------------------------------------------------------------------------*/
    $( '.remove-from-favorite' ).on( 'click', function( event ) {
        event.preventDefault();
        var $this = $(this);
        var property_item = $this.closest('.col-grid-post');
        var loader = $this.siblings('.loader');

        var removeFromFavorites = $.ajax({
            url: $this.attr( 'href' ),
            type: "POST",
            data: {
                property_id : $this.data( 'property-id' ),
                action : "remove_from_favorites"
            },
            dataType: "json",
            beforeSend: function( xhr ) {
                $this.hide();
                loader.css('display', 'block');
            }
        });

        removeFromFavorites.done( function( response ) {
            if ( response.success ) {
                property_item.remove();
            } else {
                loader.hide();
                alert( response.message );
            }
        });

        removeFromFavorites.fail( function( jqXHR, textStatus ) {
            alert( "Request Failed: " + textStatus );
        });

    });


})(jQuery);




/**
 * JavaScript Related to Favorites
 */
(function($){
    "use strict";

    /*-----------------------------------------------------------------------------------*/
    /* Add to favorites
    /*-----------------------------------------------------------------------------------*/
    if ( typeof favoriteData !== "undefined" ) {

        $('#add-to-favorite').on( 'click', function(e){
            var $this = $(this);
            e.preventDefault();
            if ( !$this.hasClass( 'added' ) ) {

                var star = $this.find( 'i' );
                var favoriteTitle = $this.find( 'span' );

                var addToFavorite = $.ajax({
                    url: favoriteData.ajaxURL,
                    method: "POST",
                    data: {
                        property_id : favoriteData.propertyID,
                        action : favoriteData.action
                    },
                    dataType: "json",
                    beforeSend: function( xhr ) {
                        star.addClass('fa-spin');
                    }
                });

                addToFavorite.done( function( response ) {
                    star.removeClass('fa-spin');
                    if ( response.success ) {
                        $this.addClass( 'added' );
                        star.removeClass( 'fa-star-o').addClass( 'fa-star' );
                        favoriteTitle.removeClass( 'failed' );
                        favoriteTitle.html( response.message );
                    } else {
                        favoriteTitle.addClass('failed');
                        favoriteTitle.html( response.message );
                    }
                });

                addToFavorite.fail( function( jqXHR, textStatus ) {
                    alert( "Request Failed: " + textStatus );
                });
            }
        });

    }


    /*-----------------------------------------------------------------------------------*/
    /* Remove from favorites
    /*-----------------------------------------------------------------------------------*/
    $( '.remove-from-favorite' ).on( 'click', function( event ) {
        event.preventDefault();
        var $this = $(this);
        var property_item = $this.closest('.col-grid-post');
        var loader = $this.siblings('.loader');

        var removeFromFavorites = $.ajax({
            url: $this.attr( 'href' ),
            type: "POST",
            data: {
                property_id : $this.data( 'property-id' ),
                action : "remove_from_favorites"
            },
            dataType: "json",
            beforeSend: function( xhr ) {
                $this.hide();
                loader.css('display', 'block');
            }
        });

        removeFromFavorites.done( function( response ) {
            if ( response.success ) {
                property_item.remove();
            } else {
                loader.hide();
                alert( response.message );
            }
        });

        removeFromFavorites.fail( function( jqXHR, textStatus ) {
            alert( "Request Failed: " + textStatus );
        });

    });


})(jQuery);

/*! Magnific Popup - v1.0.0 - 2015-01-03
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isIE7=-1!==c.indexOf("MSIE 7."),b.isIE8=-1!==c.indexOf("MSIE 8."),b.isLowIE=b.isIE7||b.isIE8,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",b.ev=c.mainEl&&c.mainEl.length?c.mainEl.eq(0):d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.wrap.css(b.fixedContentPos?{overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}:{top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),b.currTemplate[d]=f?a(f):!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||2!==c.which&&!c.ctrlKey&&!c.metaKey){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(a,c){if(void 0===c||c===!1)return!0;if(e=a.split("_"),e.length>1){var d=b.find(p+"-"+e[0]);if(d.length>0){var f=e[1];"replaceWith"===f?d[0]!==c[0]&&d.replaceWith(c):"img"===f?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(p+"-"+a).html(c)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery",g=Boolean(a.fn.mfpFastClick);return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s),h=g?"mfpFastClick":"click";e[h](function(){b.prev()}),f[h](function(){b.next()}),b.isIE7&&(x("b",e[0],!1,!0),x("a",e[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowLeft&&g&&b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){v.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g,h=a(this);if(c){var i,j,k,l,m,n;h.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,v.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0],(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)&&(l=!0,d())}).on("touchend"+f,function(a){d(),l||n>1||(g=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){g=!1},b),e())})})}h.on("click"+f,function(){g||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&v.off("touchmove"+f+" touchend"+f)}}(),A()});



jQuery(document).ready(function ($) {
    "use strict";
    /*-----------------------------------------------------------------------------------*/
    /* Share Button
    /* https://github.com/carrot/share-button
    /*-----------------------------------------------------------------------------------*/
    var shareButtonLabel      = $('#share-button-title').text(),
        propertyTitle         = $('.single-property-title').text(),
        propertyThumbnail     = $('.only-for-print img').attr('src'),
        propertyDescription   = $.trim($('.entry-content p:first').text()),
        descriptionTextLength = 100, // Description Test Lenght for Social Media
        descriptionTextLabel  = 'Property URL'; // Label for URL you'd like to share via email

    var config = {
        title: propertyTitle,
        image: propertyThumbnail,
        description: propertyDescription.substring(0, descriptionTextLength),
        ui: {
            flyout: $('body').hasClass('rtl') ? 'bottom left' : 'bottom right',
            button_text: shareButtonLabel
        },
        networks: {
            email: {
                description: propertyDescription + '%0A%0A' + descriptionTextLabel + ': ' + window.location.href
            }
        }
    };

    new Share(".share-this", config);
});


(function ($) {
    "use strict";

    var $window = $(window),
        $body = $('body'),
        isRtl = $body.hasClass('rtl');

    /*-----------------------------------------------------------------------------------*/
    /* Sliders
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().flexslider) {
        var homepageSlider = $('.homepage-slider'),
            gallerySlider = $('.gallery-slider'),
            gallerySliderTwo = $('.gallery-slider-two');

        homepageSlider.flexslider({
            slideshow: true,
            slideshowSpeed: 4000,
            pauseOnHover: true,
            touch: true,
            prevText: "",
            nextText: "",
            controlNav: false,
            rtl: isRtl,
            start: function (slider) {
                slider.delay(400).removeClass('slider-loader');
                centerSlideDetails(slider.h);
            }
        });

        gallerySlider.flexslider({
            animation: "slide",
            slideshow: true,
            rtl: isRtl,
            prevText: "",
            nextText: ""
        });

        gallerySliderTwo.flexslider({
            animation: "fade",
            slideshow: true,
            rtl: isRtl,
            directionNav: false
        });
    }

    function centerSlideDetails(slideHeight) {
        var slider = '',
            siteHeader = $('.site-header'),
            isHeaderOne = siteHeader.hasClass('header-variation-one') && $window.width() > 1182;

        if (homepageSlider.hasClass('slider-variation-two')) {
            slider = $('.slider-variation-two .slides li');
        }else if (homepageSlider.hasClass('slider-variation-three')) {
            slider = $('.slider-variation-three .slides li');
        }

        if( !slideHeight && slider ){
            slideHeight = slider.first().height();
        }

        if(slider){
            slider.each(function () {
                var slideOverlay = $(this).find('.slide-inner-container');
                if (isHeaderOne) {
                    slideOverlay.css('top', siteHeader.height() + 40);
                } else {
                    slideOverlay.css('top', Math.abs(((slideHeight - slideOverlay.outerHeight()) / 2)));
                }
            });
        }
    }

    $window.on('load resize', function () {
        centerSlideDetails();
    });


    if (jQuery().lightSlider) {
        $('#image-gallery').lightSlider({
            gallery: true,
            item: 1,
            thumbItem: 10,
            loop: true,
            slideMargin: 0,
            galleryMargin: 0,
            thumbMargin: 2,
            currentPagerPosition: 'middle',
            rtl: isRtl
        });
        $('.lSPager').wrap('<div class="slider-thumbnail-nav-wrapper"></div>');
    }

    /*-----------------------------------------------------------------------------------*/
    /*  Carousels
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().owlCarousel) {
        var similarPropertiesCarousel = $(".similar-properties-carousel .owl-carousel"),
            similarPropertiesCarouselNav = $('.similar-properties-carousel-nav'),
            similarPropertiesItem = $('.similar-properties-carousel .hentry'),
            recentPostsCarousel = $(".recent-posts-carousel .owl-carousel"),
            recentPostsCarouselNav = $('.recent-posts-carousel-nav'),
            recentPostsItem = $('.recent-posts-item'),
            carouselNext = $(".carousel-next-item"),
            carouselPrev = $(".carousel-prev-item");


        similarPropertiesCarousel.owlCarousel({
            onInitialized: navToggle(similarPropertiesItem,similarPropertiesCarouselNav,1),
            rtl: isRtl,
            items: 1,
            smartSpeed: 500,
            loop: similarPropertiesItem.length > 1,
            autoHeight: similarPropertiesItem.length > 1,
            dots: false
        });


        carouselNext.on( 'click', function () {
            similarPropertiesCarousel.trigger('next.owl.carousel');
        });

        carouselPrev.on( 'click', function () {
            similarPropertiesCarousel.trigger('prev.owl.carousel');
        });

        recentPostsCarousel.owlCarousel({
            onInitialized: navToggle(recentPostsItem,recentPostsCarouselNav,2),
            rtl: isRtl,
            smartSpeed: 500,
            margin: 20,
            dots: false,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                1199: {
                    items: 2
                }
            }
        });


        carouselNext.on( 'click', function (event) {
            recentPostsCarousel.trigger('next.owl.carousel');
            event.preventDefault();
        });

        carouselPrev.on( 'click', function (event) {
            recentPostsCarousel.trigger('prev.owl.carousel');
            event.preventDefault();
        });
    }

    // Carousel Nav Toggle
    function navToggle(element,nav,items) {
        element.length > items ? nav.show() : nav.hide();
    }

    /*-----------------------------------------------------------------------------------*/
    /* Select2
    /* URL: http://select2.github.io/select2/
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().select2) {
        var selectOptions = {
            //minimumResultsForSearch: -1,  // Disable search feature in drop down
            width: 'off'
        };

        if (isRtl) {
            selectOptions.dir = "rtl";
        }


        var AgentSelectOptions = {
            placeholder: "Select an Agent or more"
        }

        $('select').select2(selectOptions);
        $('#agent-selectbox').select2(AgentSelectOptions);
    }
    /*-----------------------------------------------------------------------------------*/
    /* Swipebox
    /* http://brutaldesign.github.io/swipebox/
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().swipebox) {
        $('.clone .swipebox').removeClass('swipebox');
        $(".swipebox").swipebox();

        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
    }
    /*-----------------------------------------------------------------------------------*/
    /* Magnific Popup
    /* https://github.com/dimsemenov/Magnific-Popup
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().magnificPopup) {
        $(".video-popup").magnificPopup({
            type: 'iframe'
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Scroll to Top
     /*-----------------------------------------------------------------------------------*/
    $(function(){
        var scroll_anchor = $( '#scroll-top' ),
            post_nav = $( '.inspiry-post-nav' );
        $( window ).scroll(function () {
            if ( $( window ).width() > 980 ) {
                if ( $(this).scrollTop() > 250 ) {
                    scroll_anchor.fadeIn( 'fast' );
                    post_nav.fadeIn( 'fast' );
                    return;
                }
            }
            scroll_anchor.fadeOut( 'fast' );
            post_nav.fadeOut( 'fast' );
        });

        scroll_anchor.on( 'click', function ( event ) {
            event.preventDefault();
            $('html, body').animate( { scrollTop:0 }, 'slow' );
        });
    });


    /*-----------------------------------------------------------------------------------*/
    /* Sticky Header Function
    /*-----------------------------------------------------------------------------------*/
    var inspiryStickyHeader = $body.hasClass('inspiry-sticky-header');

    if( inspiryStickyHeader ) {
        var siteHeader = $('.site-header');

        $window.on( 'scroll', function() {
            var HeaderClasses = 'inspiry-sticked-header slideInDown animated',
                isHeaderVariationOne = siteHeader.hasClass('header-variation-one'),
                siteHeaderHeight = siteHeader.outerHeight(),
                windowPosition = $window.scrollTop(),
                adminbarOffset = $body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

            if( windowPosition > siteHeaderHeight && $window.width() > 992 ){
                siteHeader.css('top', adminbarOffset ).addClass( HeaderClasses );

                if( isHeaderVariationOne ){
                    siteMainNav.show();
                    menuClose.show();
                } else {
                    $body.css('padding-top', siteHeaderHeight);
                }
            } else if ( windowPosition < 1 ) {
                siteHeader.css('top', 'auto' ).removeClass( HeaderClasses );
                $body.css('padding-top', 0);
            }
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /* Main Menu
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().meanmenu) {
        $('#site-main-nav').meanmenu({
            meanMenuContainer: '#mobile-header',
            meanRevealPosition: "left",
            meanMenuCloseSize: "20px",
            meanScreenWidth: "991",
            meanExpand: '',
            meanContract: ''
        });
    }

    var mainMenuItem = $('#site-main-nav li');
    mainMenuItem.on( 'mouseenter',
        function () {
            $(this).children('ul').stop(true, true).slideDown(200);
        });

    mainMenuItem.on( 'mouseleave',
        function () {
            $(this).children('ul').stop(true, true).slideUp(200);
        }
    );

    // Code to show and hide main menu for home first variation.
    var siteMainNav = $('.header-menu-wrapper #site-main-nav'),
        menuReveal = $('.button-menu-reveal'),
        menuClose = $('.button-menu-close');

    menuReveal.css('display', 'inline-block');
    menuClose.hide();
    siteMainNav.hide();

    menuReveal.on('click', function (event) {
        $(this).stop(true, true).toggleClass('active');
        if (siteMainNav.is(":visible")) {
            siteMainNav.hide();
            menuClose.hide();
        } else {
            siteMainNav.show();
            menuClose.show();
        }
        event.preventDefault();
    });

    menuClose.on('click', function (event) {
        $(this).fadeToggle(20);
        siteMainNav.fadeToggle(20);
        menuReveal.stop(true, true).toggleClass('active');
        event.preventDefault();
    });

    // Function to add User Nav and Social Nav in Mean Menu
    function customNav() {
        var menu = $('.mean-nav'),
            meanMenuReveal = $('.meanmenu-reveal'),
            backdrop = '<div class="mobile-menu-backdrop fade in"></div>',
            mobileHeaderNav = $('.mobile-header-nav').html();

        if ( $window.width() < 991 && menu.find('.mobile-header-nav-wrapper').length < 1 ) {
            menu.append(mobileHeaderNav);
        }

        // Show and hide user and social nav. Also add menu backdrop.
        meanMenuReveal.on('click', function () {
            menu.find('.mobile-header-nav-wrapper').stop(true, true).slideToggle();
            menu.stop(true, true).toggleClass('mobile-menu-visible');
            if (menu.hasClass('mobile-menu-visible')) {
                $('body').append(backdrop);
            } else {
                $('.mobile-menu-backdrop').remove();
            }
        });

        // Resolve Model Backdrop issue.
        $('.login-register-link').on('click', function () {
            meanMenuReveal.trigger('click');
        });
    }
    customNav();
    $window.on( 'resize', function () {
        customNav();
        menuClose.hide();
        siteMainNav.hide();
        $('.mobile-menu-backdrop').remove();
    });

    /*-----------------------------------------------------------------------------------*/
    /*	Search Form Slide Toggle
    /*-----------------------------------------------------------------------------------*/
    // Function to show hidden fields on variation one
    var hiddenFields = $('.hidden-fields');

    $('.hidden-fields-reveal-btn').on( 'click', function (event) {
        $(this).stop(true, true).toggleClass('field-wrapper-expand');
        hiddenFields.stop(true, true).slideToggle(200);
        event.preventDefault();
    });

    var featureTitle = $('.extra-search-fields > .title > span'),
        featureWrapper = $('.extra-search-fields .features-checkboxes-wrapper');

    featureTitle.on( 'click', function () {
        $(this).stop(true, true).toggleClass('is-expand');
        featureWrapper.stop(true, true).slideToggle(200);
    });

    /*-----------------------------------------------------------------------------------*/
    /*	Equal Height Function
    /*-----------------------------------------------------------------------------------*/
    function equalHeights(element) {
        var $element = $(element),
            elementHeights = [];

        $element.each(function () {
            var $this = $(this);
            elementHeights.push($this.outerHeight());
        });

        if ($window.width() > 750) {
            $element.css('height', Math.max.apply(Math, elementHeights));
        }
    }

    equalHeights('.featured-properties-one .property-description');
    equalHeights('.agent-listing-post');
    /*-----------------------------------------------------------------------------------*/
    /*	Home Property Listing hover Effect
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().hoverIntent) {
        var propertyListing = $(".property-listing-two .property-description, .featured-properties-two .property-description");

        propertyListing.each(function(){
            var $this = $(this);
            $this.css( 'height', $this.find('.entry-header').outerHeight());
        });

        propertyListing.hoverIntent(
            function () {
                var $this = $(this);

                $this.find('.property-meta').show();
                $this.stop(true, true).animate({
                    height: '100%'
                }, 300).addClass('hovered');
            },
            function () {
                var $this = $(this);

                $this.removeClass('hovered').stop(true, true).animate({
                    height: $this.find('.entry-header').outerHeight()
                }, 300);
            }
        );
    }

    /*-----------------------------------------------------------------------------------*/
    /*	Isotope for gallery pages
    /*-----------------------------------------------------------------------------------*/
    if (jQuery().isotope) {
        var galleryContainer = $('#gallery-container');

        $window.on('load', function () {
            galleryContainer.isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows'
            });
        });

        $('#gallery-items-filter').on('click', 'a', function (event) {
            var $this = $(this),
                filterValue = $this.attr('data-filter');
            $(this).addClass('active').siblings().removeClass('active');
            galleryContainer.isotope({
                filter: filterValue
            });
            event.preventDefault();
        });
    }

    /*----------------------------------------------------------------------------------*/
    /* Contact Form AJAX validation and submission
    /* Validation Plugin : http://bassistance.de/jquery-plugins/jquery-plugin-validation/
    /* Form Ajax Plugin : http://www.malsup.com/jquery/form/
    /*---------------------------------------------------------------------------------- */

    if (jQuery().validate && jQuery().ajaxSubmit) {

        var submitButton = $('#submit-button'),
            ajaxLoader = $('#ajax-loader'),
            messageContainer = $('#message-container'),
            errorContainer = $("#error-container");

        var formOptions = {
            beforeSubmit: function () {
                submitButton.attr('disabled', 'disabled');
                ajaxLoader.fadeIn('fast');
                messageContainer.fadeOut('fast');
                errorContainer.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                var response = $.parseJSON(ajax_response);
                ajaxLoader.fadeOut('fast');
                submitButton.removeAttr('disabled');
                if (response.success) {
                    $form.resetForm();
                    messageContainer.html(response.message).fadeIn('fast');
                } else {
                    errorContainer.html(response.message).fadeIn('fast');
                }
            }
        };

        $('#contact-form').each(function () {
            $(this).validate({
                errorLabelContainer: errorContainer,
                submitHandler: function (form) {
                    $(form).ajaxSubmit(formOptions);
                }
            });
        });


        /*-----------------------------------------------------------------------------------*/
        /*	Agent's Contact Form
        /*----------------------------------------------------------------------------------*/

        var agentFormOptions = {
            beforeSubmit: function ( formData, jqForm, options ) {
                var currentForm = $(jqForm[0]);
                currentForm.find('.agent-submit').attr('disabled', 'disabled');
                currentForm.find('.agent-loader').fadeIn('fast');
                currentForm.find('.agent-message').fadeOut('fast');
                currentForm.find('.agent-error').fadeOut('fast');
            },
            success: function ( ajax_response, statusText, xhr, $form ) {
                var response = $.parseJSON( ajax_response );
                $form.find('.agent-loader').fadeOut('fast');
                $form.find('.agent-submit').removeAttr('disabled');
                if ( response.success ) {
                    $form.resetForm();
                    $form.find('.agent-message').html(response.message).fadeIn('fast');
                } else {
                    $form.find('.agent-error').html(response.message).fadeIn('fast');
                }
            }
        };

        $('.agent-form').each(function () {
            $(this).validate({
                errorLabelContainer: $(this).find('.agent-error'),
                submitHandler: function (form) {
                    $(form).ajaxSubmit( agentFormOptions );
                }
            });
        });

        /*-----------------------------------------------------------------------------------*/
        /*	AJAX Login Form
        /*----------------------------------------------------------------------------------*/

        var loginButton = $('#login-button'),
            loginAjaxLoader = $('#login-loader'),
            loginError = $("#login-error" ),
            loginMessage = $('#login-message');

        var loginOptions = {
            beforeSubmit: function () {
                loginButton.attr('disabled', 'disabled');
                loginAjaxLoader.fadeIn('fast');
                loginMessage.fadeOut('fast');
                loginError.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                var response = $.parseJSON( ajax_response );
                loginAjaxLoader.fadeOut('fast');
                loginButton.removeAttr('disabled');
                if ( response.success ) {
                    loginMessage.html( response.message ).fadeIn('fast');
                    document.location.href = response.redirect;
                } else {
                    loginError.html( response.message ).fadeIn('fast');

                    // call reset function if it exists
                    if (typeof inspiryResetReCAPTCHA == 'function') {
                        inspiryResetReCAPTCHA();
                    }
                }
            }
        };

        $('#login-form').validate({
            submitHandler: function ( form ) {
                $(form).ajaxSubmit( loginOptions );
            }
        });

        /*-----------------------------------------------------------------------------------*/
        /*	AJAX Register Form
        /*----------------------------------------------------------------------------------*/

        var registerButton = $('#register-button'),
            registerAjaxLoader = $('#register-loader'),
            registerError = $("#register-error" ),
            registerMessage = $('#register-message');

        var registerOptions = {
            beforeSubmit: function () {
                registerButton.attr('disabled', 'disabled');
                registerAjaxLoader.fadeIn('fast');
                registerMessage.fadeOut('fast');
                registerError.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                var response = $.parseJSON( ajax_response );
                registerAjaxLoader.fadeOut('fast');
                registerButton.removeAttr('disabled');
                if ( response.success ) {
                    registerMessage.html( response.message ).fadeIn('fast');
                    $form.resetForm();
                } else {
                    registerError.html( response.message ).fadeIn('fast');

                    // call reset function if it exists
                    if (typeof inspiryResetReCAPTCHA == 'function') {
                        inspiryResetReCAPTCHA();
                    }
                }
            }
        };

        $('#register-form').validate({
            rules: {
                register_username: {
                    required: true
                },
                register_email: {
                    required: true,
                    email: true
                }
            },
            submitHandler: function ( form ) {
                $(form).ajaxSubmit( registerOptions );
            }
        });

        /*-----------------------------------------------------------------------------------*/
        /*	Forgot Password Form
        /*----------------------------------------------------------------------------------*/

        var forgotButton = $('#forgot-button'),
            forgotAjaxLoader = $('#forgot-loader'),
            forgotError = $("#forgot-error" ),
            forgotMessage = $('#forgot-message');

        var forgotOptions = {
            beforeSubmit: function () {
                forgotButton.attr('disabled', 'disabled');
                forgotAjaxLoader.fadeIn('fast');
                forgotMessage.fadeOut('fast');
                forgotError.fadeOut('fast');
            },
            success: function (ajax_response, statusText, xhr, $form) {
                var response = $.parseJSON( ajax_response );
                forgotAjaxLoader.fadeOut('fast');
                forgotButton.removeAttr('disabled');
                if ( response.success ) {
                    forgotMessage.html( response.message ).fadeIn('fast');
                    $form.resetForm();
                } else {
                    forgotError.html( response.message ).fadeIn('fast');

                    // call reset function if it exists
                    if (typeof inspiryResetReCAPTCHA == 'function') {
                        inspiryResetReCAPTCHA();
                    }
                }
            }
        };

        $('#forgot-form').validate({
            submitHandler: function ( form ) {
                $(form).ajaxSubmit( forgotOptions );
            }
        });

    }

    /*-----------------------------------------------------------------------------------*/
    /*	Animation CSS integrated with Appear Plugin
    /*----------------------------------------------------------------------------------*/
    function ie_10_or_older() {
        // check if IE10 or older
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            // return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            return true;
        }
        // other browser
        return false;
    }

    if (jQuery().appear) {
        if (($window.width() > 991) && (!ie_10_or_older())) {
            // apply animation on only big screens and browsers other than IE 10 and Older Versions of IE
            $('.animated').appear().fadeTo('fast', 0);

            $(document.body).on('appear', '.fade-in-up', function (event, $all_appeared_elements) {
                $(this).each(function () {
                    $(this).addClass('fadeInUp')
                });
            });

            $(document.body).on('appear', '.fade-in-down', function (event, $all_appeared_elements) {
                $(this).each(function () {
                    $(this).addClass('fadeInDown')
                });
            });

            $(document.body).on('appear', '.fade-in-right', function (event, $all_appeared_elements) {
                $(this).each(function () {
                    $(this).addClass('fadeInRight')
                });
            });

            $(document.body).on('appear', '.fade-in-left', function (event, $all_appeared_elements) {
                $(this).each(function () {
                    $(this).addClass('fadeInLeft')
                });
            });
        }
    }
    /*----------------------------------------------------------------------------------*/
    /* Placeholder Support for older browsers
    /*----------------------------------------------------------------------------------*/
    if (jQuery().placeholder) {
        $('input, textarea').placeholder();
    }

    /*----------------------------------------------------------------------------------*/
    /*	IE Browsers Detection
    /*----------------------------------------------------------------------------------*/
    function detectIE() {
        var ms_ie = false,
            ua = window.navigator.userAgent,
            new_ie = ua.indexOf('Trident/');
        if (ie_10_or_older() || (new_ie > -1)) {
            ms_ie = true;
        }
        if (ms_ie) {
            $(".gallery-slider-two").find('img').removeClass('img-responsive');
            $("body").addClass('ie-userAgent');
            return true;
        }
        return false;
    }

    detectIE();

    /*-----------------------------------------------------------------------------------*/
    /* WPML Language Selection
    /*-----------------------------------------------------------------------------------*/
    $(function () {
        var head = $("head"),
            inspiry_language_list = $('#inspiry_language_list'),
            headStyleLast = head.find("style[rel='stylesheet']:last"),
            styleElement = "<style rel='stylesheet' media='screen'>#inspiry_language_list{background-image: url('" + inspiry_language_list.find('li > img').attr("src") + "');}</style>";
        if (headStyleLast.length) {
            headStyleLast.after(styleElement);
        }
        else {
            head.append(styleElement);
        }
    });


    /*-----------------------------------------------------------------------------------*/
    /* Inspiry Highlighted Message
    /*-----------------------------------------------------------------------------------*/
    $('.inspiry-highlighted-message .close-message').on('click', function () {
        $('.inspiry-highlighted-message').remove();
    });


    /*-----------------------------------------------------------------------------------*/
    /* Page Loader
    /*-----------------------------------------------------------------------------------*/
    $window.load(function () {
        $(".page-loader-img").fadeOut();
        $(".page-loader").delay(300).fadeOut("slow", function () {
            $(this).remove();
        });

      // Trigger once to avoid the auto height issue.
      $('.similar-properties-carousel-nav .carousel-next-item').trigger('click');
    });

    /*-----------------------------------------------------------------------------------*/
    /*	Scroll to Top
    /*-----------------------------------------------------------------------------------*/
    $(function(){
        var scroll_anchor = $('#scroll-top');
        $( window ).scroll(function () {
            if ( $( window ).width() > 980 ) {
                if ( $(this).scrollTop() > 250 ) {
                    scroll_anchor.fadeIn('fast');
                    return;
                }
            }
            scroll_anchor.fadeOut('fast');
        });

        scroll_anchor.on( 'click', function ( event ) {
            event.preventDefault();
            $('html, body').animate( { scrollTop:0 }, 'slow' );
        });
    });

    /*-----------------------------------------------------------------*/
    /* Property Floor Plans
     /*-----------------------------------------------------------------*/
    $('.floor-plans-accordions .floor-plan:first-child').addClass('current')
        .children('.floor-plan-content').css('display', 'block').end()
        .find('i.fa').removeClass( 'fa-plus').addClass( 'fa-minus' );

    $('.floor-plan-title').on( 'click', function(){
        var parent_accordion = $(this).closest('.floor-plan');
        if ( parent_accordion.hasClass('current') ) {
            $(this).find('i.fa').removeClass( 'fa-minus').addClass( 'fa-plus' );
            parent_accordion.removeClass('current').children('.floor-plan-content').slideUp(300);
        } else {
            $(this).find('i.fa').removeClass('fa-plus').addClass( 'fa-minus' );
            parent_accordion.addClass('current').children('.floor-plan-content').slideDown(300);
        }
        var siblings = parent_accordion.siblings('.floor-plan');
        siblings.find('i.fa').removeClass( 'fa-minus').addClass( 'fa-plus' );
        siblings.removeClass('current').children('.floor-plan-content').slideUp(300);
    });


})(jQuery);


jQuery(document).ready(function ($) {
    "use strict";
    /*-----------------------------------------------------------------------------------*/
    /* Horizontal Scrolling
    /* https://github.com/darsain/sly
    /*-----------------------------------------------------------------------------------*/
    function startHorizontalSlider() {
        var $frame = $(".scrolling-frame"),
            $wrap = $frame.parent();

        $wrap.imagesLoaded(function () {
                $wrap.addClass("scrolling-frame-loaded");

                // Call Sly on frame
                $frame.sly({
                    horizontal: 1,
                    itemNav: 'basic',
                    smart: 1,
                    activateOn: 'click',
                    mouseDragging: 1,
                    touchDragging: 1,
                    releaseSwing: 1,
                    startAt: 1,
                    scrollBar: $wrap.find('.scrolling-frame-scrollbar'),
                    scrollBy: 1,
                    activatePageOn: 'click',
                    speed: 300,
                    elasticBounds: 1,
                    dragHandle: 1,
                    dynamicHandle: 1,
                    clickBar: 1,

                    // Buttons
                    prev: $wrap.find('.prev'),
                    next: $wrap.find('.next')
                });
            }
        );
    }

    setTimeout(startHorizontalSlider, 500);
});

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Share=e()}}(function(){var define,module,exports;
function getStyles(config){ return ""+config.selector+"{width:92px;height:20px;-webkit-touch-callout:none;-khtml-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"+config.selector+" [class*=entypo-]:before{font-family:entypo,sans-serif}"+config.selector+" label{font-size:16px;cursor:pointer;margin:0;padding:5px 10px;border-radius:5px;background:#a29baa;color:#333;-webkit-transition:all .3s ease;transition:all .3s ease}"+config.selector+" label:hover{opacity:.8}"+config.selector+" label span{text-transform:uppercase;font-size:.9em;font-family:Lato,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;padding-left:6px}"+config.selector+" .social{opacity:0;-webkit-transition:all .4s ease;transition:all .4s ease;margin-left:-15px;visibility:hidden}"+config.selector+" .social.top{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;margin-top:-80px}"+config.selector+" .social.bottom{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;margin-top:5px}"+config.selector+" .social.middle{margin-top:-34px}"+config.selector+" .social.middle.right{-webkit-transform-origin:5% 50%;-ms-transform-origin:5% 50%;transform-origin:5% 50%;margin-left:105px}"+config.selector+" .social.middle.left{-webkit-transform-origin:5% 50%;-ms-transform-origin:5% 50%;transform-origin:5% 50%}"+config.selector+" .social.right{margin-left:14px}"+config.selector+" .social.load{-webkit-transition:none!important;transition:none!important}"+config.selector+" .social.networks-1{width:60px}"+config.selector+" .social.networks-1.center,"+config.selector+" .social.networks-1.left{margin-left:14px}"+config.selector+" .social.networks-1.middle.left{margin-left:-70px}"+config.selector+" .social.networks-1 ul{width:60px}"+config.selector+" .social.networks-2{width:120px}"+config.selector+" .social.networks-2.center{margin-left:-13px}"+config.selector+" .social.networks-2.left{margin-left:-44px}"+config.selector+" .social.networks-2.middle.left{margin-left:-130px}"+config.selector+" .social.networks-2 ul{width:120px}"+config.selector+" .social.networks-3{width:180px}"+config.selector+" .social.networks-3.center{margin-left:-45px}"+config.selector+" .social.networks-3.left{margin-left:-102px}"+config.selector+" .social.networks-3.middle.left{margin-left:-190px}"+config.selector+" .social.networks-3 ul{width:180px}"+config.selector+" .social.networks-4{width:240px}"+config.selector+" .social.networks-4.center{margin-left:-75px}"+config.selector+" .social.networks-4.left{margin-left:162px}"+config.selector+" .social.networks-4.middle.left{margin-left:-250px}"+config.selector+" .social.networks-4 ul{width:240px}"+config.selector+" .social.networks-5{width:300px}"+config.selector+" .social.networks-5.center{margin-left:-105px}"+config.selector+" .social.networks-5.left{margin-left:-225px}"+config.selector+" .social.networks-5.middle.left{margin-left:-320px}"+config.selector+" .social.networks-5 ul{width:300px}"+config.selector+" .social.active{opacity:1;-webkit-transition:all .4s ease;transition:all .4s ease;visibility:visible}"+config.selector+" .social.active.top{-webkit-transform:scale(1) translateY(-10px);-ms-transform:scale(1) translateY(-10px);transform:scale(1) translateY(-10px)}"+config.selector+" .social.active.bottom{-webkit-transform:scale(1) translateY(15px);-ms-transform:scale(1) translateY(15px);transform:scale(1) translateY(15px)}"+config.selector+" .social.active.middle.right{-webkit-transform:scale(1) translateX(10px);-ms-transform:scale(1) translateX(10px);transform:scale(1) translateX(10px)}"+config.selector+" .social.active.middle.left{-webkit-transform:scale(1) translateX(-10px);-ms-transform:scale(1) translateX(-10px);transform:scale(1) translateX(-10px)}"+config.selector+" .social ul{position:relative;left:0;right:0;height:46px;color:#fff;margin:auto;padding:0;list-style:none}"+config.selector+" .social ul li{font-size:20px;cursor:pointer;width:60px;margin:0;padding:12px 0;text-align:center;float:left;display:none;height:22px;position:relative;z-index:2;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-transition:all .3s ease;transition:all .3s ease}"+config.selector+" .social ul li:hover{color:rgba(0,0,0,.5)}"+config.selector+" .social li[class*=facebook]{background:#3b5998;display:"+config.networks.facebook.display+"}"+config.selector+" .social li[class*=twitter]{background:#6cdfea;display:"+config.networks.twitter.display+"}"+config.selector+" .social li[class*=gplus]{background:#e34429;display:"+config.networks.google_plus.display+"}"+config.selector+" .social li[class*=pinterest]{background:#c5282f;display:"+config.networks.pinterest.display+"}"+config.selector+" .social li[class*=paper-plane]{background:#42c5b0;display:"+config.networks.email.display+"}"};var ShareUtils;"classList"in document.documentElement||!Object.defineProperty||"undefined"==typeof HTMLElement||Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){var t,e,o;return o=function(t){return function(o){var n,i;n=e.className.split(/\s+/),i=n.indexOf(o),t(n,i,o),e.className=n.join(" ")}},e=this,t={add:o(function(t,e,o){~e||t.push(o)}),remove:o(function(t,e){~e&&t.splice(e,1)}),toggle:o(function(t,e,o){~e?t.splice(e,1):t.push(o)}),contains:function(t){return!!~e.className.split(/\s+/).indexOf(t)},item:function(t){return e.className.split(/\s+/)[t]||null}},Object.defineProperty(t,"length",{get:function(){return e.className.split(/\s+/).length}}),t}}),String.prototype.to_rfc3986=function(){var t;return t=encodeURIComponent(this),t.replace(/[!'()*]/g,function(t){return"%"+t.charCodeAt(0).toString(16)})},ShareUtils=function(){function t(){}return t.prototype.extend=function(t,e,o){var n,i;for(i in e)n=void 0!==t[i],n&&"object"==typeof e[i]?this.extend(t[i],e[i],o):(o||!n)&&(t[i]=e[i])},t.prototype.hide=function(t){return t.style.display="none"},t.prototype.show=function(t){return t.style.display="block"},t.prototype.has_class=function(t,e){return t.classList.contains(e)},t.prototype.add_class=function(t,e){return t.classList.add(e)},t.prototype.remove_class=function(t,e){return t.classList.remove(e)},t.prototype.is_encoded=function(t){return t=t.to_rfc3986(),decodeURIComponent(t)!==t},t.prototype.encode=function(t){return"undefined"==typeof t||this.is_encoded(t)?t:t.to_rfc3986()},t.prototype.popup=function(t,e){var o,n,i,r;return null==e&&(e={}),n={width:500,height:350},n.top=screen.height/2-n.height/2,n.left=screen.width/2-n.width/2,i=function(){var t;t=[];for(o in e)r=e[o],t.push(""+o+"="+this.encode(r));return t}.call(this).join("&"),i&&(i="?"+i),window.open(t+i,"targetWindow","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left="+n.left+",top="+n.top+",width="+n.width+",height="+n.height)},t}();var Share,__hasProp={}.hasOwnProperty,__extends=function(t,e){function o(){this.constructor=t}for(var n in e)__hasProp.call(e,n)&&(t[n]=e[n]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t};Share=function(t){function e(t,e){var o;return this.element=t,this.el={head:document.getElementsByTagName("head")[0],body:document.getElementsByTagName("body")[0]},this.config={enabled_networks:0,protocol:-1===["http","https"].indexOf(window.location.href.split(":")[0])?"https://":"//",url:window.location.href,caption:null,title:(o=document.querySelector('meta[property="og:title"]')||document.querySelector('meta[name="twitter:title"]'))?o.getAttribute("content"):(o=document.querySelector("title"))?o.innerText:void 0,image:(o=document.querySelector('meta[property="og:image"]')||document.querySelector('meta[name="twitter:image"]'))?o.getAttribute("content"):void 0,description:(o=document.querySelector('meta[property="og:description"]')||document.querySelector('meta[name="twitter:description"]')||document.querySelector('meta[name="description"]'))?o.getAttribute("content"):"",ui:{flyout:"top center",button_text:"Share",button_font:!0,icon_font:!0},networks:{google_plus:{enabled:!0,url:null},twitter:{enabled:!0,url:null,description:null},facebook:{enabled:!0,load_sdk:!0,url:null,app_id:null,title:null,caption:null,description:null,image:null},pinterest:{enabled:!0,url:null,image:null,description:null},email:{enabled:!0,title:null,description:null}}},this.setup(t,e),this}return __extends(e,t),e.prototype.setup=function(t,e){var o,n,i,r,s;for(i=document.querySelectorAll(t),this.extend(this.config,e,!0),this.set_global_configuration(),this.normalize_network_configuration(),this.config.ui.icon_font&&this.inject_icons(),this.config.ui.button_font&&this.inject_fonts(),this.config.networks.facebook.enabled&&this.config.networks.facebook.load_sdk&&this.inject_facebook_sdk(),o=r=0,s=i.length;s>r;o=++r)n=i[o],this.setup_instance(t,o)},e.prototype.setup_instance=function(t,e){var o,n,i,r,s,c,l,a,p=this;for(n=document.querySelectorAll(t)[e],this.hide(n),this.add_class(n,"sharer-"+e),n=document.querySelectorAll(t)[e],this.inject_css(n),this.inject_html(n),this.show(n),i=n.getElementsByTagName("label")[0],o=n.getElementsByClassName("social")[0],s=n.getElementsByTagName("li"),this.add_class(o,"networks-"+this.config.enabled_networks),i.addEventListener("click",function(){return p.event_toggle(o)}),p=this,a=[],e=c=0,l=s.length;l>c;e=++c)r=s[e],a.push(r.addEventListener("click",function(){return p.event_network(n,this),p.event_close(o)}));return a},e.prototype.event_toggle=function(t){return this.has_class(t,"active")?this.event_close(t):this.event_open(t)},e.prototype.event_open=function(t){return this.has_class(t,"load")&&this.remove_class(t,"load"),this.add_class(t,"active")},e.prototype.event_close=function(t){return this.remove_class(t,"active")},e.prototype.event_network=function(t,e){var o;return o=e.getAttribute("data-network"),this.hook("before",o,t),this["network_"+o](),this.hook("after",o,t)},e.prototype.open=function(){return this["public"]("open")},e.prototype.close=function(){return this["public"]("close")},e.prototype.toggle=function(){return this["public"]("toggle")},e.prototype["public"]=function(t){var e,o,n,i,r,s,c;for(s=document.querySelectorAll(this.element),c=[],o=i=0,r=s.length;r>i;o=++i)n=s[o],e=n.getElementsByClassName("social")[0],c.push(this["event_"+t](e));return c},e.prototype.network_facebook=function(){return this.config.networks.facebook.load_sdk?window.FB?FB.ui({method:"feed",name:this.config.networks.facebook.title,link:this.config.networks.facebook.url,picture:this.config.networks.facebook.image,caption:this.config.networks.facebook.caption,description:this.config.networks.facebook.description}):console.error("The Facebook JS SDK hasn't loaded yet."):this.popup("https://www.facebook.com/sharer/sharer.php",{u:this.config.networks.facebook.url})},e.prototype.network_twitter=function(){return this.popup("https://twitter.com/intent/tweet",{text:this.config.networks.twitter.description,url:this.config.networks.twitter.url})},e.prototype.network_google_plus=function(){return this.popup("https://plus.google.com/share",{url:this.config.networks.google_plus.url})},e.prototype.network_pinterest=function(){return this.popup("https://www.pinterest.com/pin/create/button",{url:this.config.networks.pinterest.url,media:this.config.networks.pinterest.image,description:this.config.networks.pinterest.description})},e.prototype.network_email=function(){return this.popup("mailto:",{subject:this.config.networks.email.title,body:this.config.networks.email.description})},e.prototype.inject_icons=function(){return this.inject_stylesheet("https://www.sharebutton.co/fonts/v2/entypo.min.css")},e.prototype.inject_fonts=function(){return this.inject_stylesheet("http://fonts.googleapis.com/css?family=Lato:900&text="+this.config.ui.button_text)},e.prototype.inject_stylesheet=function(t){var e;return this.el.head.querySelector('link[href="'+t+'"]')?void 0:(e=document.createElement("link"),e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),this.el.head.appendChild(e))},e.prototype.inject_css=function(t){var e,o,n,i;return n="."+t.getAttribute("class").split(" ").join("."),this.el.head.querySelector("meta[name='sharer"+n+"']")?void 0:(this.config.selector=n,e=getStyles(this.config),i=document.createElement("style"),i.type="text/css",i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e)),this.el.head.appendChild(i),delete this.config.selector,o=document.createElement("meta"),o.setAttribute("name","sharer"+n),this.el.head.appendChild(o))},e.prototype.inject_html=function(t){return t.innerHTML="<label class='entypo-export'><span>"+this.config.ui.button_text+"</span></label><div class='social load "+this.config.ui.flyout+"'><ul><li class='entypo-pinterest' data-network='pinterest'></li><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='google_plus'></li><li class='entypo-paper-plane' data-network='email'></li></ul></div>"},e.prototype.inject_facebook_sdk=function(){var t,e;return window.FB||!this.config.networks.facebook.app_id||this.el.body.querySelector("#fb-root")?void 0:(e=document.createElement("script"),e.text="window.fbAsyncInit=function(){FB.init({appId:'"+this.config.networks.facebook.app_id+"',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='"+this.config.protocol+"connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk')",t=document.createElement("div"),t.id="fb-root",this.el.body.appendChild(t),this.el.body.appendChild(e))},e.prototype.hook=function(t,e,o){var n,i;n=this.config.networks[e][t],"function"==typeof n&&(i=n.call(this.config.networks[e],o),void 0!==i&&(i=this.normalize_filter_config_updates(i),this.extend(this.config.networks[e],i,!0),this.normalize_network_configuration()))},e.prototype.set_global_configuration=function(){var t,e,o,n,i,r;i=this.config.networks,r=[];for(e in i){n=i[e];for(o in n)null==this.config.networks[e][o]&&(this.config.networks[e][o]=this.config[o]);this.config.networks[e].enabled?(t="block",this.config.enabled_networks+=1):t="none",r.push(this.config.networks[e].display=t)}return r},e.prototype.normalize_network_configuration=function(){return this.config.networks.facebook.app_id||(this.config.networks.facebook.load_sdk=!1),this.is_encoded(this.config.networks.twitter.description)||(this.config.networks.twitter.description=encodeURIComponent(this.config.networks.twitter.description)),"number"==typeof this.config.networks.facebook.app_id?this.config.networks.facebook.app_id=this.config.networks.facebook.app_id.toString():void 0},e.prototype.normalize_filter_config_updates=function(t){return this.config.networks.facebook.app_id!==t.app_id&&(console.warn("You are unable to change the Facebook app_id after the button has been initialized. Please update your Facebook filters accordingly."),delete t.app_id),this.config.networks.facebook.load_sdk!==t.load_sdk&&(console.warn("You are unable to change the Facebook load_sdk option after the button has been initialized. Please update your Facebook filters accordingly."),delete t.app_id),t},e}(ShareUtils); return Share;
});

!function(a,b){"use strict";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf("MSIE 10"),h=!!navigator.userAgent.match(/Trident.*rv:11\./),i=b.querySelectorAll("iframe.wp-embedded-content");for(c=0;c<i.length;c++){if(d=i[c],!d.getAttribute("data-secret"))f=Math.random().toString(36).substr(2,10),d.src+="#?secret="+f,d.setAttribute("data-secret",f);if(g||h)a=d.cloneNode(!0),a.removeAttribute("security"),d.parentNode.replaceChild(a,d)}}}var d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var d=c.data;if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret="'+d.secret+'"]'),k=b.querySelectorAll('blockquote[data-secret="'+d.secret+'"]');for(e=0;e<k.length;e++)k[e].style.display="none";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute("style"),"height"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else if(~~g<200)g=200;f.height=g}if("link"===d.message)if(h=b.createElement("a"),i=b.createElement("a"),h.href=f.getAttribute("src"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener("message",a.wp.receiveEmbedMessage,!1),b.addEventListener("DOMContentLoaded",c,!1),a.addEventListener("load",c,!1)}(window,document);


/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});





