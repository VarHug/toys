
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
            gameDiv : $('game'),
            nextDiv : $('next'),
            stopDiv : $('stop'),
            timeDiv : $('time'),
            scoreDiv : $('score'),
            resultDiv : $('gameover'),
            restartDiv : $('restart')
        };
        Tetris.init(doms);
    };

    //导出API
    this.start = start;
}