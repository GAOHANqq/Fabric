var ObjectTools;
$(function () {

     ObjectTools = Backbone.View.extend({
        className: 'ObjectTools',
        template: _.template($('#toolbarTemplate').html()),
         pageFunc:null,
        target: null,
        canvas: null,
        items: null,
        subboxele: null,
        fillsubele: null,
        showTipCount: 0,
        events: {},
        initialize: function () {
        },
        render: function () {
        },
         load: function (pageFunc, renderCanvas, obj) {
             this.pageFunc = pageFunc;
            this.target = obj;
            this.canvas = renderCanvas;

            var self = this;
            //if (this.target.type == 'plane_shap') {
            //    this.target.on('scaling', function (options) {
            //        self.target.rebuildSVGSize(options.action);
            //    });
            //}

            this.target.on('selected', function (options) {
                self.onSelected();
            });

            this.target.on('rotating', function (options) {
                if (!self.items)
                    return;
                if (options.target.angle >= 135 && options.target.angle <= 225) {
                    self.items.setTopoffset(45);
                }
                else
                    self.items.setTopoffset(15);

            });
            //this.target.on('moving', function (options) {
            //    var left = self.target.left,
            //        top = self.target.top,
            //        width = self.target.width,
            //        height = self.target.height;
            //    if (self.target.type == 'group' || self.target.type == 'polyline') {
            //        width = self.target.scaleX * width;
            //        height = self.target.scaleY * height;
            //    }
            //    if (left + width > self.canvas.width)
            //        self.target.set('left', self.canvas.width - width);
            //    else if (left < 0)
            //        self.target.set('left', 0);
            //    if (top < 0)
            //        self.target.set('top', 0);
            //    else if (top + height > self.canvas.height) {
            //        self.target.set('top', self.canvas.height - height);
            //    }
            //    if (self.target.eventMethod == "plane_en_word_card")//英文卡片不设置Topoffset
            //        return;
            //    if (top + height + 60 > self.canvas.height) {
            //        //fabirc统一处理位置
            //        //self.items.setTopoffset(-height - 75);
            //    }
            //    else {
            //        self.items.setTopoffset(15);
            //    }
            //});
        },
        initToolbar: function () {
            if (!this.items) return;
            if(this.target.isAnswer == true){
                $(".answer").hide();
                $(".noanswer").show();
            }else{
                $(".answer").show();
                $(".noanswer").hide();
            }

            this.subboxele = this.items.divMenu.getElementsByClassName("subbox")[0];
            this.fillsubele = this.items.divMenu.getElementsByClassName("fill-subbox")[0];
            var objtype = this.target.type;
            var menu_li = this.items.divMenu.getElementsByClassName("toolbar-li");
            var menu_ul = this.items.divMenu.getElementsByClassName("toolbar-ul")[0];

            if (objtype == 'image') {
                menu_li[1].style.display = 'none';
                menu_ul.style.width = '300px';
            }
            else if (objtype == 'textbox') {
                menu_ul.style.width = '360px';
            }
        },
        getItems: function () {
            return this.items;
        },
        setItemMenuWidth: function () {
            if (!this.items) return;
            var method = this.target.eventMethod;
            if (method == 'img') {
                this.items.set('menuItemWidth', 90);
            }
            else if (method == 'text') {
                this.items.set('menuItemWidth', 20);
            }
        },

        onSelected: function (e) {
            var self = this;
            if (!this.items) {
                this.items = new fabric.Menu(this.target, {
                    btn_border: {},
                    btn_fill: {},
                    btn_copy: {},
                    btn_top: {}
                });
                this.items.setText(this.template());
                this.setItemMenuWidth();
                if (this.target.angle >= 135 && this.target.angle <= 225) {
                    this.items.setTopoffset(45);
                }
                else
                    this.items.setTopoffset(15);
                this.items.show();
                this.initToolbar();

                this.items.on('btn_top:click', function (options) {
                    //self.target.bringToFront();
                });

                this.items.on('btn_copy:click', function (options) {

                    self.pageFunc.copyObj(self.target);
                });

                this.items.on('btn_edit:click', function (options) {
                    self.pageFunc.editObj(self.target);
                });

                this.items.on('btn_close:click', function (options) {
                    self.pageFunc.removeObj(self.target);
                });

                this.items.on('btn_setanswer:click', function (options) {
                    self.pageFunc.setAnswer(self.target);
                });

                // 取消设空
                this.items.on('btn_removeanswer:click', function (options) {
                    self.pageFunc.removeAnswer(self.target);
                });

            }
            if (this.target.angle >= 135 && this.target.angle <= 225) {
                this.items.setTopoffset(45);
            }
            else
                this.items.setTopoffset(15);
            this.items.show();
            this.initToolbar();
        }
    });


});

