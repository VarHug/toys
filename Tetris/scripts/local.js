
var Local = function () {
    //游戏对象
    var game;
    
    var start = function () {
        var doms = {
            gameDiv : document.getElementById('game'),
            nextDiv : document.getElementById('next')
        };
        Tetris.init(doms);
    };

    //导出API
    this.start = start;
}