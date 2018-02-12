
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
        var remoteGame = new Tetris(doms, 'remote', squareInfo);

        socket.on('next' ,function (data) {
            remoteGame.performNext(data.type, data.dir);
        });

        socket.on('rotate' ,function (data) {
            remoteGame.rotate();
        });

        socket.on('left' ,function (data) {
            remoteGame.left();
        });

        socket.on('right' ,function (data) {
            remoteGame.right();
        });

        socket.on('down' ,function (data) {
            remoteGame.down();
        });

        socket.on('fall' ,function (data) {
            remoteGame.fall();
        });

        socket.on('fixed' ,function (data) {
            remoteGame.fixed();
        });

        socket.on('line' ,function (data) {
            remoteGame.clearRow();
            remoteGame.addScore(data);
        });

        socket.on('time' ,function (data) {
            remoteGame.setTime(data);
        });

        socket.on('lose' ,function (data) {
            remoteGame.gameResult(false);
            remoteGame.stopGame();
        });     
        
        socket.on('addTailLines', function (data) {
            remoteGame.addTailLines(data);
        })
    };    

    bindEvents();
};