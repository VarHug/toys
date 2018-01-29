// (function($) {
    const NONE = 0;   //空白
    const DONE = 1;   //下落完成
    const CUR = 2;    //正在下落

    /**
     * 俄罗斯方块类
     * 
     */
    var Tetris = function () {
        //DOM元素
        this.gameDiv;
        this.nextDiv;
        //游戏矩阵
        this.gameData = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        //当前方块
        this.cur;
        //下一个方块
        this.next;
        //divs
        this.gameDivs = [];
        this.nextDivs = [];
    };

    /**
     * 初始化区域
     * 
     * @param {jQuery对象} container 
     * @param {num[][]} data 
     * @param {jQuery[][]} divs 
     */
    Tetris.prototype.initDiv = function (container, data, divs) {
        for(let i = 0, dataColumn = data.length; i < dataColumn; i++) {
            let div = [];
            for(let j = 0, dataRow = data[0].length; j < dataRow; j++) {
                 let newNode = document.createElement('div');
                 newNode.className = 'none';
                 newNode.style.top = (i * 20) + 'px';
                 newNode.style.left = (j * 20) + 'px';
                 container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    }
    /**
     * 刷新区域
     * 
     * @param {num[][]} data 
     * @param {jQuery[][]} divs 
     */
    Tetris.prototype.refreshDiv = function (data, divs) {
        for(let i = 0, dataColumn = data.length; i < dataColumn; i++) {
            for(let j = 0, dataRow = data[0].length; j < dataRow; j++) {
                if (data[i][j] === NONE) {
                    divs[i][j].className = 'none';
                } else if (data[i][j] === DONE) {
                    divs[i][j].className = 'done'; 
                } else if (data[i][j] === CUR) {
                    divs[i][j].className = 'current';
                }
            }
        }
    }
    /**
     * 初始化
     * 
     * @param {jQuery} doms 
     */
    Tetris.prototype.init = function (doms) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = new Square();
        next = new Square();
        this.initDiv(gameDiv, this.gameData, this.gameDivs);
        this.initDiv(nextDiv, next.data, this.nextDivs);
        this.refreshDiv(this.gameData, this.gameDivs);
        this.refreshDiv(next.data, this.nextDivs);
    }

    window['Tetris'] = Tetris;
// })(jQuery);