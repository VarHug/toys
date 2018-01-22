(function ($) {
    /**
     * 旋转木马类
     * 
     * @param {any} poster 旋转木马控件
     */
    var Carousel = function (poster) {
        var that = this;
        this.$poster = poster;
        this.$poster_list = poster.find('.poster_list');
        this.$prevBtn = poster.find('.poster_prev_btn');
        this.$nextBtn = poster.find('.poster_next_btn');
        this.$posterItems = poster.find('.poster_item');
        this.$posterFirstItem = this.$posterItems.first();
        this.$posterLastItem = this.$posterItems.last();
        this.posterCount = this.$posterItems.length;
        this.rotateFinish = true;
        //默认配置参数
        this.setting = {
            "width" : 1000,              //区域的宽度
            "height" :  347,             //区域的高度
            "posterWidth" : 800,         //图片的宽度
            "posterHeight" : 347,        //图片的高度
            "scale" : 0.9,               //缩放比例
            "speed" : 500,
            "verticalAlign" : "middle"
        };

        //获取配置参数
        $.extend(this.setting, this.getSetting());
        //设置配置参数
        this.setSettingValue();
        //设置剩余帧的位置关系
        this.setPosterPos();

        this.$nextBtn.click(function () {
            if (that.rotateFinish) {
                that.rotateFinish = false;
                that.carouselRotate('left');
            }
        });

        this.$prevBtn.click(function () {
           if (that.rotateFinish) {
                that.rotateFinish = false;
                that.carouselRotate('right');
           }
        });
    }

    /**
     * 获取配置参数
     * 
     */
    Carousel.prototype.getSetting = function () {
        var setting = this.$poster.data('setting');
        if(setting && setting !== '') {
            return setting;
        } else {
            return {};
        }
    };

    /**
     * 设置配置参数
     * 
     */
    Carousel.prototype.setSettingValue = function () {
        this.$poster.css({
            width : this.setting.width,
            height : this.setting.height
        });
        this.$poster_list.css({
            width : this.setting.width,
            height : this.setting.height
        });
        this.$prevBtn.css({
            zIndex : Math.ceil(this.posterCount / 2)
        });
        this.$nextBtn.css({
            zIndex : Math.ceil(this.posterCount / 2)
        });

        //第一帧图片的绝对定位左边距
        var dis = (this.setting.width - this.setting.posterWidth) / 2;
        this.$posterFirstItem.css({
            width : this.setting.posterWidth,
            height : this.setting.posterHeight,
            left : dis,
            zIndex : this.posterCount / 2 | 0
        });
    };

    /**
     * 设置剩余的帧的位置关系
     * 
     */
    Carousel.prototype.setPosterPos = function () {
        var that = this;
        var sliceItems = this.$posterItems.slice(1),
            sliceLen = sliceItems.length / 2,
            rightSliceItems = sliceItems.slice(0, sliceLen),
            level = this.posterCount / 2 | 0,
            rightWidth = this.setting.posterWidth,
            rightHeight = this.setting.posterHeight,
            scale = this.setting.scale,
            gap = ((this.setting.width - this.setting.posterWidth) / 2) / level |0,
            fixOffsetLeft = (this.setting.width - this.setting.posterWidth) / 2 + rightWidth;

        //设置右边帧的参数
        rightSliceItems.each(function (index) {
            ++index;
            $(this).css({
                zIndex : --level,
                width : rightWidth *= scale,
                height : rightHeight *= scale,
                opacity : 1 / index,
                left : fixOffsetLeft + gap * index - rightWidth,
                top : that.setVertucalAlign(rightHeight)
            });
        });

        level--;
        rightWidth *= scale;
        rightHeight *= scale;
        var leftSliceItems = sliceItems.slice(sliceLen),
            leftLen = leftSliceItems.length;
        //设置左边帧的参数
        leftSliceItems.each(function (index) {
            $(this).css({
                zIndex : ++level,
                width : rightWidth /= scale,
                height : rightHeight /= scale,
                opacity : 1 / leftLen--,
                left : (index++) * gap,
                top : that.setVertucalAlign(rightHeight)
            });
        });
    };

    /**
     * 设置对其方式
     * 
     * @param {number} height 
     */
    Carousel.prototype.setVertucalAlign = function (height) {
        var verticalType = this.setting.verticalAlign,
            top = 0;
        if (verticalType === 'middle') {
            top = (this.setting.height - height) / 2;
        } else if (verticalType === 'top') {
            top = 0;
        } else if(verticalType === 'bottom') {
            top = this.setting.height - height;
        } else {
            top = (this.setting.height - height) / 2;
        }
        return top;
    };

    /**
     * 旋转函数
     * 
     * @param {string} dir 旋转方向 
     */
    Carousel.prototype.carouselRotate = function (dir) {
        var that = this;
        var zIndexArr = [];
        if(dir === 'left') {
            this.$posterItems.each(function () {
                var self = $(this),
                    prev = self.prev().get(0) ? self.prev() : that.$posterLastItem,
                    width = prev.width(),
                    height = prev.height(),
                    zIndex = prev.css('zIndex'),
                    opacity = prev.css('opacity'),
                    left = prev.css('left'),
                    top = prev.css('top');
                zIndexArr.push(zIndex);

                self.animate({
                    width : width,
                    height : height,
                    opacity : opacity,
                    left : left,
                    top : top
                }, function () {
                    that.rotateFinish = true;
                });
            });
            this.$posterItems.each(function (index) {
                $(this).css('zIndex', zIndexArr[index]);
            });
        } else if (dir === 'right') {
            this.$posterItems.each(function () {
                var self = $(this),
                    next = self.next().get(0) ? self.next() : that.$posterFirstItem,
                    width = next.width(),
                    height = next.height(),
                    zIndex = next.css('zIndex'),
                    opacity = next.css('opacity'),
                    left = next.css('left'),
                    top = next.css('top');
                zIndexArr.push(zIndex);

                self.animate({
                    width : width,
                    height : height,
                    opacity : opacity,
                    left : left,
                    top : top
                    }, function () {
                        that.rotateFinish = true;
                    });
            });
            this.$posterItems.each(function (index) {
                $(this).css('zIndex', zIndexArr[index]);
            });     
        }
    };

    
    /**
     * 执行旋转木马类构造函数，实例化每一个旋转木马组件
     * 
     * @param {any} posters 
     */
    Carousel.init = function (posters) {
        var _this_ = this;
        posters.each(function () {
            new _this_($(this));
        });
    };

    window['Carousel'] = Carousel;
})(jQuery);