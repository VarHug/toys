$(document).ready(function () {
    //配置参数
    var setting = {
        width : 1000,
        height :  347,
        posterWidth : 800,
        posterHeight : 347,
        scale : 0.9,//比例关系
        speed : 500,//切换速度
        verticalAlign : 'middle' //对齐方式
    };

    Carousel.init($('.poster_main'));
});