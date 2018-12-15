;
fabric.scaleProps = ['tr', 'br', 'bl', 'tl'];
fabric.scaleAllProps = ['tr', 'br', 'bl', 'tl', 'ml', 'mr', 'mb', 'mt', 'mtr'];

(function (global) {

    'use strict';

    /* Adaptation of work of Kevin Lindsey (kevin@kevlindev.com) */

    var fabric = global.fabric || (global.fabric = {});

    if (fabric.Menu) {
        fabric.warn('fabric.Menu is already defined');
        return;
    }


    fabric.Menu = fabric.util.createClass(fabric.CommonMethods, fabric.Observable, /** @lends fabric.Object.prototype */ {

        type: 'menu',

        menuItemWidth: 22.5,

        menuItemHeight: 70,

        menuItems: [],

        text: '',

        divMenu: null,

        activeObject: null,

        canvas: null,

        topoffset: 15,

        canHide: true,//somethimes we want the menu always show, then make this false

        horizontalPlaceType: "middle",// "middle"is default, "right" is place on the right, "left" is place on the left

        initialize: function (obj, options) {
            this.menuItems = [];
            this.text = '';

            for (var prop in options) {
                options[prop].name = prop;
                this.menuItems.push(options[prop]);
            }

            this.activeObject = obj;
            this.canvas = obj.canvas;
            this.divMenu = null;
        },
        setHorizontalPlaceType: function (type) {
            this.horizontalPlaceType = type;
        },

        setTopoffset: function (value) {
            this.topoffset = value;
        },
        setCanHide: function (value) {
            this.canHide = value;
        },

        makeMenuText: function () {
            var text = '';
            for (var i = 0; i < this.menuItems.length; i++) {
                text += '<button id="' + this.menuItems[i].name + '" style="width: ' + this.menuItemWidth + 'px" >' + this.menuItems[i].text + '</button>'
            }
            text += '';

            return text;
        },

        setText: function (text) {
            this.text = text;
        },

        show: function () {
            if (this.divMenu) return;

            var element = this.activeObject.canvas.getElement();
            this.divMenu = fabric.document.createElement('div');
            if (element) {
                this.divMenu.innerHTML = this.text;
                element.parentNode.appendChild(this.divMenu);
            }

            var self = this;

            var movingMenuFunc = function (options) {
                self.positionEle(self.divMenu);
            }

            var scalingMenuFunc = function (options) {
                self.positionEle(self.divMenu);
            }

            var rotatingMenuFunc = function (options) {
                self.positionEle(self.divMenu);
            }

            var deselectedMenuFunc = function (options) {
                if (self.canHide) {
                    self.hide();
                }
                self.activeObject.off('deselected', deselectedMenuFunc);
                self.activeObject.off('moving', movingMenuFunc);
                self.activeObject.off('scaling', scalingMenuFunc);
                self.activeObject.off('rotating', rotatingMenuFunc);
            };

            this.activeObject.on('deselected', deselectedMenuFunc);
            self.activeObject.on('moving', movingMenuFunc);
            self.activeObject.on('scaling', scalingMenuFunc);
            self.activeObject.on('rotating', rotatingMenuFunc);

            this.divMenu.style.position = 'absolute';
            this.positionEle(this.divMenu);

            this._onClickDomEvent = this._onClickDomEvent.bind(this);
            this.divMenu.addEventListener('click', this._onClickDomEvent, false);
        },

        _onClickDomEvent: function (e) {
            var target = this.activeObject;
            if (e.target.id === 'btn_close') {
                if (this.divMenu) {
                    this.divMenu.removeEventListener('click', this._onClickDomEvent);
                }
                target.canvas.remove(target);
            }
            if (e.target.dataset.clickcallback)
                this.fire(e.target.dataset.clickcallback + ':click', { e: e, target: target });
            else
                this.fire(e.target.id + ':click', { e: e, target: target });

        },

        hide: function () {
            if (!this.divMenu) return;

            var element = this.activeObject.canvas.getElement();
            if (element) {
                element.parentNode.removeChild(this.divMenu);
            }
            this.divMenu = null;
        },

        getAbsoluteCoords: function (object) {
            this.activeObject.setCoords();
            var r = this._calcBounds(this.activeObject, false);
            return { left: r.left, top: r.top, right: r.left + r.width, bottom: r.top + r.height };
        },

        positionEle: function (el) {
            var canvas = this.activeObject.canvas.getElement();
            var absCoords = this.getAbsoluteCoords(this.activeObject);
            var left = (absCoords.left) + (absCoords.right - absCoords.left - this.menuItemWidth * this.menuItems.length) / 2;
            var top = absCoords.bottom + this.activeObject.padding + this.topoffset;
            if (left < 0) {
                left = 0;
            }
            if ((left + this.menuItemWidth * this.menuItems.length) > canvas.width) {
                left = canvas.width - this.menuItemWidth * this.menuItems.length;
            }
            if ((top + this.menuItemHeight) > canvas.height) {
                top = canvas.height - this.menuItemHeight;
            }

            el.style.left = left + 'px';
            el.style.top = top + 'px';
            //console.log('positionEle, top: ' + el.style.top + ', h: ' + this.activeObject.height);
        },

        _calcBounds: function (obj, onlyWidthHeight) {
            var aX = [],
                aY = [],
                o, prop,
                props = fabric.scaleProps,
                i = 0,
                j, jLen = props.length,
                ignoreZoom = true;

            for (j = 0; j < jLen; j++) {
                prop = props[j];
                aX.push(obj.oCoords[prop].x);
                aY.push(obj.oCoords[prop].y);
            }

            return this._getBounds(aX, aY, onlyWidthHeight);
        },

        /**
         * @private
         */
        _getBounds: function (aX, aY, onlyWidthHeight) {
            var minXY = new fabric.Point(fabric.util.array.min(aX), fabric.util.array.min(aY)),
                maxXY = new fabric.Point(fabric.util.array.max(aX), fabric.util.array.max(aY)),
                obj = {
                    width: (maxXY.x - minXY.x) || 0,
                    height: (maxXY.y - minXY.y) || 0
                };

            if (!onlyWidthHeight) {
                obj.left = minXY.x || 0;
                obj.top = minXY.y || 0;
                if (this.originX === 'center') {
                    obj.left += obj.width / 2;
                }
                if (this.originX === 'right') {
                    obj.left += obj.width;
                }
                if (this.originY === 'center') {
                    obj.top += obj.height / 2;
                }
                if (this.originY === 'bottom') {
                    obj.top += obj.height;
                }
            }
            return obj;
        }
    });
})(typeof exports !== 'undefined' ? exports : this);