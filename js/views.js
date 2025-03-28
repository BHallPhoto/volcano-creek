/*!
 *  views.js - lightweight vanilla JavaScript image viewer
 *  @version 0.1.1
 *  @author Adrian Klimek
 *  @link https://adrianklimek.github.io/views/
 *  @copyright Adrian Klimek 2016-2017
 *  @license MIT
 */
!function(a, b) {
    "function" == typeof define && define.amd ? define(b(a)) : "object" == typeof module && module.exports ? module.exports = function(a) {
        b(a)
    }
    : a.Views = b(a)
}(window, function(a) {
    "use strict";
    function b(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }
    function c(a, c) {
        var d = {
            defaultTheme: !0,
            prefix: "",
            loader: "",
            closeButton: '<svg version="1.1" id="close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><line fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="6.808" y1="6.808" x2="25.192" y2="25.192"/><line fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="6.808" y1="25.192" x2="25.192" y2="6.808"/></svg>',
            anywhereToClose: !0,
            openAnimationDuration: 0,
            closeAnimationDuration: 0
        };
        if ("object" == typeof c ? this.options = b(d, c) : this.options = d,
        "undefined" == typeof a)
            throw new Error('Views [constructor]: "element" parameter is required');
        if ("object" == typeof a)
            this.element = a;
        else {
            if ("string" != typeof a)
                throw new Error('Views [constructor]: wrong "element" parameter');
            this.element = document.querySelector(a)
        }
        this.init()
    }
    return c.prototype.init = function() {
        if (this.onOpen = function() {}
        ,
        this.onClose = function() {}
        ,
        this.css = {
            view: "position:fixed;top:0;left:0;width:100%;height:100%;padding:50px 15px;box-sizing:border-box;cursor:pointer;",
            image: "max-width:100%;max-height:100%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:50px 15px;box-sizing:border-box;",
            closeButton: "width:24px;height:24px;position:absolute;top:11px;right:11px;-webkit-filter:drop-shadow(0 0 12px rgba(0,0,0,.07));filter:drop-shadow(0 0 12px rgba(0,0,0,.07));",
            background: "position:absolute;top:0;left:0;height:100%;width:100%;opacity:.75;background-color:#000;"
        },
        "" !== this.options.prefix && "string" == typeof this.options.prefix && (this.options.prefix += "-"),
        this.names = {
            id: {
                view: this.options.prefix + "views-wrapper",
                closeButton: this.options.prefix + "views-close"
            },
            class: {
                opening: this.options.prefix + "views-opening",
                closing: this.options.prefix + "views-closing",
                loading: this.options.prefix + "views-loading",
                image: this.options.prefix + "views-image",
                viewerWrapper: this.options.prefix + "views-content",
                loader: this.options.prefix + "views-loader",
                background: this.options.prefix + "views-background"
            }
        },
        this.href = this.element.href,
        "string" != typeof this.href)
            throw new Error("Views [init]: href attribute is missing a value");
        this.element.addEventListener("click", this, !1)
    }
    ,
    c.prototype.open = function() {
        this.onOpen();
        var a, b, c = this;
        this.view = document.createElement("div"),
        this.viewWrapper = document.createElement("div"),
        this.closeButton = document.createElement("div"),
        this.loader = document.createElement("div"),
        this.view.addEventListener("click", this, !1),
        this.options.openAnimationDuration && (this.view.className += " " + this.names.class.opening,
        a = setTimeout(function() {
            c.animationDelay("open")
        }, this.options.openAnimationDuration)),
        this.viewWrapper.className = this.names.class.viewerWrapper,
        this.view.id = this.names.id.view,
        this.view.className += " " + this.names.class.loading,
        this.options.defaultTheme && (this.view.style.cssText = this.css.view,
        this.closeButton.style.cssText = this.css.closeButton,
        b = 'style="' + this.css.background + '"'),
        this.closeButton.id = this.names.id.closeButton,
        this.closeButton.innerHTML = this.options.closeButton,
        this.loader.className = this.names.class.loader,
        this.loader.innerHTML = this.options.loader,
        this.viewWrapper.appendChild(this.closeButton),
        this.viewWrapper.appendChild(this.loader),
        this.view.innerHTML = '<div class="' + this.names.class.background + '" ' + b + "></div>",
        this.view.appendChild(this.viewWrapper),
        document.body.appendChild(this.view),
        this.loadImage(this.href)
    }
    ,
    c.prototype.close = function() {
        this.onClose();
        var a, b = this;
        this.view.classList.remove(this.names.class.opening),
        this.view.classList.add(this.names.class.closing),
        this.view.removeEventListener("click", this),
        this.options.closeAnimationDuration ? a = setTimeout(function() {
            b.animationDelay("close")
        }, this.options.closeAnimationDuration) : this.remove()
    }
    ,
    c.prototype.remove = function() {
        document.body.removeChild(this.view)
    }
    ,
    c.prototype.loadImage = function(a) {
        var b = new Image;
        b.addEventListener("load", this, !1),
        b.className = this.names.class.image,
        b.style.cssText = this.css.image,
        b.src = a
    }
    ,
    c.prototype.animationDelay = function(a) {
        switch (a) {
        case "open":
            this.view.classList.remove(this.names.class.opening);
            break;
        case "close":
            this.remove()
        }
    }
    ,
    c.prototype.handleEvent = function(a) {
        var b = "on" + a.type;
        this[b] && this[b](a)
    }
    ,
    c.prototype.onclick = function(a) {
        switch (a.currentTarget) {
        case this.element:
            a.preventDefault(),
            this.open();
            break;
        case this.view:
            (this.options.anywhereToClose || a.target == this.closeButton) && this.close()
        }
    }
    ,
    c.prototype.onload = function(a) {
        a.currentTarget.classList.contains(this.names.class.image) && (this.viewWrapper.removeChild(this.loader),
        this.viewWrapper.appendChild(a.target),
        this.view.classList.remove(this.names.class.loading))
    }
    ,
    c.prototype.on = function(a, b) {
        switch ("function" != typeof b && console.log('Views [on]: "callback" parameter is required'),
        a) {
        case "open":
            this.onOpen = b;
            break;
        case "close":
            this.onClose = b;
            break;
        default:
            console.log('Views [on]: wrong or missing "type" parameter')
        }
    }
    ,
    c
});