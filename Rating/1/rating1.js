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


    var defaults = {
        num : 0,
        readOnly : false,
        select : function () {},
        chosen : function () {}
    };

    //初始化
    var init = function (ele, options) {
        options = $.extend({}, defaults, options);
        new LightEntire(ele, options).init();
    };

    return {
        init : init
    }
})();

rating.init('#rating', {
    num : 2,
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