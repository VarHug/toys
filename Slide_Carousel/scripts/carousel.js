(function () {
    /**
     * 旋转木马类
     * 
     * @param {any} poster 旋转木马控件
     */
    var Carousel = function (poster) {
        
    }

    Carousel.init = function (posters) {
        var _this_ = this;
        posters.each(function () {
            new _this_($(this));
        });
    };

    window['Carousel'] = Carousel;
})();