
var Local = function (socket) {
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
        var squareInfo = {};
        squareInfo['curType'] = generateType();
        squareInfo['curDir'] = generateDir();
        squareInfo['nextType'] = generateType();
        squareInfo['nextDir'] = generateDir();
        Tetris.init(doms, 'local', squareInfo);
        socket.emit('init', squareInfo);
    };

    /**
     * 生成一个方块种类
     * 
     * @returns 0 - 6
     */
    var generateType = function () {
        return Math.random() * 7 | 0;
    };

    /**
     * 生成一个方块方向
     * 
     * @returns 0 - 3
     */
    var generateDir = function () {
        return Math.random() * 4 | 0;
    };

    socket.on('start', function () {
        $('waiting').innerHTML = '';
        start();
    });

    socket.on('lose', function (data) {
        
    });
}