(function ($) {
    /**
     * 旋转木马类
     * 
     * @param {any} poster 旋转木马控件
     */
    var Carousel = function (poster) {
        this.$poster = poster;
        //默认配置参数
        this.setting = {
            "width" : 1000,
            "height" :  347,
            "posterWidth" : 800,
            "posterHeight" : 347,
            "scale" : 0.9,
            "speed" : 500,
            "verticalAlign" : "middle"
        };

        $.extend(this.setting, this.getSetting());
        console.log(this.setting);
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
    }

    
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