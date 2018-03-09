$(document).ready(function () {

var num = 2,
    $rating = $('#rating'),
    $ratingItem = $rating.find('.rating-item');
/**
 * 点亮圆圈函数
 * 
 * @param {number} num 
 */
var lightOn = function (num) {
    $ratingItem.each(function (index) {
        if (index < num) {
            $(this).css({
                'background-color' : 'red'
            });
        } else {
            $(this).css({
                'background-color' : '#ffffff'
            });
        }
    });  
};

lightOn(num);

$ratingItem.on('mouseover', function () {
    lightOn($(this).index() + 1); 
}).on('click', function () {
    num = $(this).index() + 1;
})
$rating.on('mouseout', function () {
    lightOn(num); 
});



});