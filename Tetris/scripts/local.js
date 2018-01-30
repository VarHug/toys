
var Local = function () {

    /**
     * 开始
     * 
     */
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