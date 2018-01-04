(function ($) {
    /**
     * 旋转木马类
     * 
     * @param {any} poster 旋转木马控件
     */
    var Carousel = function (poster) {
        this.$poster = poster;
        this.$poster_list = poster.find('.poster_list');
        this.$prevBtn = poster.find('.poster_prev_btn');
        this.$nextBtn = poster.find('.poster_next_btn');
        this.$posterItems = poster.find('.poster_item');
        this.$posterFirstItem = this.$posterItems.eq(0);
        this.posterCount = this.$posterItems.length;
        
        //默认配置参数
        this.setting = {
            "width" : 1000,              //区域的宽度
            "height" :  347,             //区域的高度
            "posterWidth" : 800,         //图片的宽度
            "posterHeight" : 347,        //图片的高度
            "scale" : 0.9,
            "speed" : 500,
            "verticalAlign" : "middle"
        };

        //获取配置参数
        $.extend(this.setting, this.getSetting());
        console.log(this.setting);
        //设置配置参数
        this.setSettingValue();
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
            left : dis,
            zIndex : this.posterCount / 2 | 0
        });
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