
var Remote = function (socket) {
    var $ = function (ele) {
        return document.getElementById(ele);
    };

    var bindEvents = function () {
        socket.on('init', function (data) {
            start(data);
        });
    };

    //开始方法
    var start = function (squareInfo) {
        var doms = {
            gameDiv : $('remote_game'),
            nextDiv : $('remote_next'),
            stopDiv : $('remote_stop'),
            timeDiv : $('remote_time'),
            scoreDiv : $('remote_score'),
            resultDiv : $('remote_gameover'),
            restartDiv : $('remote_restart')
        };
        Tetris.init(doms, 'remote', squareInfo);
    };    

    bindEvents();
};