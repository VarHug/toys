$(document).ready(function () {

var rating = (function () {
    /**
     * 点亮圆圈函数
     * 
     * @param {number} num 
     */
    var lightOn = function ($ratingItem, num) {
        $ratingItem.each(function (index) {
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

    var init = function (ele, num) {
        var $rating = $(ele),
            $ratingItem = $rating.find('.rating-item');
        

        lightOn($ratingItem, num);

        //事件绑定
        $rating.on('mouseover', '.rating-item', function () {
            lightOn($ratingItem, $(this).index() + 1); 
        }).on('click', '.rating-item', function () {
            num = $(this).index() + 1;
        }).on('mouseout', function () {
            lightOn($ratingItem, num); 
        }); 
    };
    
    //jQuery插件
    $.fn.extend({
        rating: function (num) {
            return this.each(function () {
                init(this, num);       
            });
        }
    });

    return {
        init : init
    };
})();

rating.init('#rating', 2);

$('#rating2').rating(4);



});