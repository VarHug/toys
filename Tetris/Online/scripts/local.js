
var Local = function () {
    var $ = function (ele) {
        return document.getElementById(ele);
    };
    /**
     * 开始
     * 
     */
    var start = function () {
        var doms = {
            gameDiv : $('local_game'),
            nextDiv : $('local_next'),
            stopDiv : $('local_stop'),
            timeDiv : $('local_time'),
            scoreDiv : $('local_score'),
            resultDiv : $('local_gameover'),
            restartDiv : $('local_restart')
        };
        Tetris.init(doms, 'local');
    };

    //导出API
    this.start = start;
}