var rating = (function () {
    /**
     * 星星构造函数
     * 
     * @param {DOM Element} ele 
     * @param {object} options 
     */
    var Rating = function (ele, options) {
        this.$ele = $(ele);
        this.opts = $.extend({}, Rating.DEFAULTS, options);
        this.itemWidth = 33;
        this.displayWidth = this.opts.num * this.itemWidth;
    };
    //默认配置参数
    Rating.DEFAULTS = {
        total: 5,
        num: 2,
        readOnly: false,
        select: function () {

        },
        chosen: function () {
            
        }
    };
    Rating.prototype.init = function () {
        this.buildHTML();
        this.setCSS();
        if (!this.opts.readOnly) {
            this.bindEvents(); 
        } 
    };
    Rating.prototype.buildHTML = function () {
        var html = '';
        html += '<div class="rating-display"></div><ul class="rating-mask">';
        for (let i = 0; i < this.opts.total; i++) {
            html += '<li class="rating-item"></li>';
        }
        html += '</ul>';
        this.$ele.html(html);
    };
    Rating.prototype.setCSS = function () {
        this.$ele.width(this.opts.total * this.itemWidth);
        this.$display = this.$ele.find('.rating-display');
        this.$display.width(this.displayWidth);
        this.$ele.find('.rating-item').width(this.itemWidth);
    };
    Rating.prototype.bindEvents = function () {
        var _this_ = this;

        this.$ele.on('mouseover', '.rating-item', function () {
            var count = $(this).index() + 1; 

            _this_.$display.width(count * _this_.itemWidth);

            (typeof _this_.opts.select === 'function') && _this_.opts.select.call(this, count, _this_.opts.total);
            
            _this_.$ele.trigger('select', [count, _this_.opts.total]);
        });
        this.$ele.on('click', '.rating-item', function () {
            var count = $(this).index() + 1;

            _this_.displayWidth = count * _this_.itemWidth;

            (typeof _this_.opts.chosen === 'function') && _this_.opts.chosen.call(this, count, _this_.opts.total);
            
            _this_.$ele.trigger('chosen', [count, _this_.opts.total]);
        });
        this.$ele.on('mouseout', function () {
            _this_.$display.width(_this_.displayWidth);
        });
    };
    Rating.prototype.unbindEvent = function () {
        this.$ele.off();  
    };

    var init = function (ele, option) {
        var $ele = $(ele),
            rating = $ele.data('rating');

        if (!rating) {
            $ele.data('rating', (rating = new Rating(ele, typeof option === 'object' && option)));
            rating.init();
        }

        if (typeof option === 'string') {
            rating[option]();
        }
    };

    //jQuery插件形式
    $.fn.extend({
        rating: function (option) {
            //this指向获取的元素或元素集合
            return this.each(function () {
                init(this, option);
            });
        }
    });

    return {
        init : init
    }; 
})();

$('#rating').rating({
    total: 6,
    num: 3,
    readOnly: false,
    chosen: function () {
        $('#rating').rating('unbindEvent');
    } 
});

// rating.init('#rating', {
//     total: 6,
//     num: 3,
//     readOnly: false,
//     chosen: function () {
//         rating.init('#rating', 'unbindEvent');
//     }
// });