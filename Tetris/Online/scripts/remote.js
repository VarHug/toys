
var Remote = function () {
    var $ = function (ele) {
        return document.getElementById(ele);
    };
    //开始方法
    var start = function () {
        var doms = {
            gameDiv : $('remote_game'),
            nextDiv : $('remote_next'),
            stopDiv : $('remote_stop'),
            timeDiv : $('remote_time'),
            scoreDiv : $('remote_score'),
            resultDiv : $('remote_gameover'),
            restartDiv : $('remote_restart')
        };
        Tetris.init(doms, 'remote');
    };    
    //导出API
    this.start = start;
};