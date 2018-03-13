$(document).ready(function () {

var rating = (function () {
    //点亮整颗
    var LightEntire = function (ele, options) {
        this.$ele = $(ele);
        this.$item = this.$ele.find('.rating-item');
        this.opts = options;
    };
    LightEntire.prototype.init = function () {
        this.lightOn(this.opts.num);
        if (!this.opts.readOnly) {
            this.bindEvents();
        }  
    };
    LightEntire.prototype.lightOn = function (num) {
        num = parseInt(num);
        this.$item.each(function (index) {
            if (index < num) {
                $(this).css({
                    'background-position' : '-1px -40px'
                });
            } else {
                $(this).css({
                    'background-position' : '0 0'
                });
            }
        });
    };
    LightEntire.prototype.bindEvents = function () {
        var _this_ = this,
            itemLength = _this_.$item.length;
        _this_.$ele.on('mouseover', '.rating-item', function () {
            var num = $(this).index() + 1;
            _this_.lightOn(num);
            
            (typeof _this_.opts.select === 'function') && _this_.opts.select.call(this, num, itemLength);
            _this_.$ele.trigger('select', [num, itemLength]);
        }).on('click', '.rating-item', function () {
            _this_.opts.num = $(this).index() + 1;

            (typeof _this_.opts.chosen === 'function') && _this_.opts.chosen.call(this, _this_.opts.num, itemLength);
            _this_.$ele.trigger('chosen', [_this_.opts.num, itemLength]);
        }).on('mouseout', function () {
            _this_.lightOn(_this_.opts.num); 
        }); 
    };

    //点亮半颗
    var LightHalf = function (ele, options) {
        this.$ele = $(ele);
        this.$item = this.$ele.find('.rating-item');
        this.opts = options;
        this.add = 1;
    };
    LightHalf.prototype.init = function () {
        this.lightOn(this.opts.num);
        if (!this.opts.readOnly) {
            this.bindEvents();
        }  
    };
    LightHalf.prototype.lightOn = function (num) {
        var count = parseInt(num),
            isHalf = count !== num;
        this.$item.each(function (index) {
            if (index < num) {
                $(this).css({
                    'background-position' : '-1px -40px'
                });
            } else {
                $(this).css({
                    'background-position' : '0 0'
                });
            }
        });

        if (isHalf) {
            this.$item.eq(count).css({
                'background-position' : '0 -80px'
            });
        }
    };
    LightHalf.prototype.bindEvents = function () {
        var _this_ = this,
            itemLength = _this_.$item.length;

        _this_.$ele.on('mousemove', '.rating-item', function (e) {
            var $this = $(this),
                num = 0;
            //半颗判断
            if (e.pageX - $this.offset().left < $this.width() / 2) {
                _this_.add = 0.5;
            } else {
                _this_.add = 1;
            }
            num = $this.index() + _this_.add;
            _this_.lightOn(num);
            
            (typeof _this_.opts.select === 'function') && _this_.opts.select.call(this, num, itemLength);
            _this_.$ele.trigger('select', [num, itemLength]);
        }).on('click', '.rating-item', function () {
            _this_.opts.num = $(this).index() + _this_.add;

            (typeof _this_.opts.chosen === 'function') && _this_.opts.chosen.call(this, _this_.opts.num, itemLength);
            _this_.$ele.trigger('chosen', [_this_.opts.num, itemLength]);
        }).on('mouseout', function () {
            _this_.lightOn(_this_.opts.num); 
        }); 
    };

    var defaults = {
        mode : 'LightHalf',
        num : 0,
        readOnly : false,
        select : function () {},
        chosen : function () {}
    };

    var mode = {
        'LightEntire' : LightEntire,
        'LightHalf' : LightHalf
    };

    //初始化
    var init = function (ele, options) {
        options = $.extend({}, defaults, options);
        if (!mode[options.mode]) {
            options.mode = 'LightEntire';
        }
        // new LightEntire(ele, options).init();
        // new LightHalf(ele, options).init();
        new mode[options.mode](ele, options).init();
    };

    return {
        init : init
    }
})();

rating.init('#rating', {
    num : 2.5,
    // select: function (num, total) {
    //     console.log(this);
    //     console.log(num + '/' + total);
    // }
});
$('#rating').on('select', function (e, num, total) {
    console.log(num + '/' + total);
}).on('chosen', function (e, num, total) {
    console.log(num + '/' + total);
});



});

// var rating = (function () {
//     /**
//      * 点亮圆圈函数
//      * 
//      * @param {number} num 
//      */
//     var lightOn = function ($ratingItem, num) {
//         $ratingItem.each(function (index) {
//             if (index < num) {
//                 $(this).css({
//                     'background-position' : '-1px -40px'
//                 });
//             } else {
//                 $(this).css({
//                     'background-position' : '0 0'
//                 });
//             }
//         });  
//     };

//     var init = function (ele, num) {
//         var $rating = $(ele),
//             $ratingItem = $rating.find('.rating-item');
        

//         lightOn($ratingItem, num);

//         //事件绑定
//         $rating.on('mouseover', '.rating-item', function () {
//             lightOn($ratingItem, $(this).index() + 1); 
//         }).on('click', '.rating-item', function () {
//             num = $(this).index() + 1;
//         }).on('mouseout', function () {
//             lightOn($ratingItem, num); 
//         }); 
//     };
    
//     //jQuery插件
//     $.fn.extend({
//         rating: function (num) {
//             return this.each(function () {
//                 init(this, num);       
//             });
//         }
//     });

//     return {
//         init : init
//     };
// })();

// rating.init('#rating', 2);

// $('#rating2').rating(4);