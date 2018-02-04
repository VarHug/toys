(function() {
    const NONE = 0;   //空白
    const DONE = 1;   //下落完成
    const CUR = 2;    //正在下落
    const INTERVAL = 300;  //下落时间间隔

    /**
     * 俄罗斯方块类
     * 
     */
    var Tetris = function (doms) {
        var that = this;
        //DOM元素
        this.gameDiv = doms.gameDiv; //document.getElementById('game')
        this.nextDiv = doms.nextDiv; //document.getElementById('next')
        this.stop = document.getElementById('stop');
        
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
        this.gameDataRow = this.gameData.length;
        this.gameDataCol = this.gameData[0].length;
        //当前方块
        this.cur = SquareFactory.prototype.make(2, 2);
        //下一个方块
        this.next = SquareFactory.prototype.make(2, 3);
        //divs
        this.gameDivs = [];
        this.nextDivs = [];

        this.bindKeyEvent();
        this.initDiv(this.gameDiv, this.gameData, this.gameDivs);
        this.initDiv(this.nextDiv, this.next.data, this.nextDivs);
        this.setData();
        this.refreshDiv(this.gameData, this.gameDivs);
        this.refreshDiv(this.next.data, this.nextDivs);
        
        this.timer = null;
        var move = function () {
            if (!that.down()) {
                that.fixed();
                that.clearRow();
                if (that.checkGameOver()) {
                    that.stopGame();
                    alert('游戏结束');
                } else {
                    that.performNext(generateType(), generateDir());
                }
            }
        }
        this.timer = setInterval(move, INTERVAL);

        this.stop.onclick = function () {
            clearInterval(that.timer);
        };
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

    /**
     * 初始化区域
     * 
     * @param {dom对象} container 
     * @param {num[][]} data 
     * @param {dom[][]} divs 
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
    };

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
    };

    /**
     * 设置数据
     * 
     */
    Tetris.prototype.setData = function () {
        for(let i = 0; i < this.cur.data.length; i++) {
            for(let j = 0; j < this.cur.data[0].length; j++) {
                if (this.check(this.cur.origin, i, j)) {  //防止扩充游戏区域
                    this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = this.cur.data[i][j];
                }
            }
        }
    };

    /**
     * 清除数据
     * 
     */
    Tetris.prototype.clearData = function () {
        for(let i = 0; i < this.cur.data.length; i++) {
            for(let j = 0; j < this.cur.data[0].length; j++) {
                if(this.check(this.cur.origin, i, j)) {  //防止扩充游戏区域
                    this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = NONE;
                }
            }
        }
    }

    /**
     * 边界检测
     * 
     * @param {object{x:number, y:number}} pos 
     * @param {number} x 
     * @param {number} y 
     */
    Tetris.prototype.check = function (pos, x, y) {
        if (pos.x + x < 0) {  //上边界
            return false;
        } else if (pos.x + x >= this.gameDataRow) { //下边界
            return false;
        } else if (pos.y + y < 0) {  //左边界
            return false;
        } else if (pos.y + y >= this.gameDataCol) { //右边界
            return false;
        } else if (this.gameData[pos.x + x][pos.y + y] === DONE) { //碰上下落的块
            return false;
        } else {
            return true;
        }
    };
    /**
     * 做碰撞检测
     * 
     * @param {object} test 
     * @returns 
     */
    Tetris.prototype.doCheck = function (test) {
        for (let i = 0, dataRow = this.cur.data.length; i < dataRow; i++) {
            for (let j = 0, dataCol = this.cur.data[0].length; j < dataCol; j++) {
                if (this.cur.data[i][j] !== 0) {
                    if(!this.check(test, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    /**
     * 绑定键盘事件
     * 
     */
    Tetris.prototype.bindKeyEvent = function () {
        var that = this;
        document.onkeydown = function (e) {
            if (e.keyCode === 38) { //up
                that.rotate();
            } else if (e.keyCode === 37) { //left
                that.left();
            } else if (e.keyCode === 40) { //down
                that.down();
            } else if (e.keyCode === 39) { //right
                that.right();
            } else if (e.keyCode === 32) { //space
                that.fall();
            }
        };
    };

    /**
     * 左移
     * 
     */
    Tetris.prototype.left = function () {
        var test = {
            x : this.cur.origin.x,
            y : this.cur.origin.y - 1
        };
        if (this.doCheck(test)) {
            this.clearData();
            this.cur.origin.y -= 1;
            this.setData();
            this.refreshDiv(this.gameData, this.gameDivs);
        }
    };

    /**
     * 右移
     * 
     */
    Tetris.prototype.right = function () {
        var test = {
            x : this.cur.origin.x,
            y : this.cur.origin.y + 1
        };
        if (this.doCheck(test)) {
            this.clearData();
            this.cur.origin.y += 1;
            this.setData();
            this.refreshDiv(this.gameData, this.gameDivs);
        }
    };

    /**
     * 下移
     * 
     */
    Tetris.prototype.down = function () {
        var test = {
            x : this.cur.origin.x + 1,
            y : this.cur.origin.y
        };
        if (this.doCheck(test)) {
            this.clearData();
            this.cur.origin.x += 1;
            this.setData();
            this.refreshDiv(this.gameData, this.gameDivs);
            return true;
        } else {
            return false;
        }
    };

    /**
     * 方块下落到地步固定（变色）
     * 
     */
    Tetris.prototype.fixed = function () {
        for (let i = 0; i < this.cur.data.length; i++) {
            for (let j = 0; j < this.cur.data[0].length; j++) {
                if (this.check(this.cur.origin, i, j)) {
                    if (this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] === CUR) {
                        this.gameData[this.cur.origin.x + i][this.cur.origin.y + j] = DONE;
                    }
                }
            }
        }
        this.refreshDiv(this.gameData, this.gameDivs);
    };

    /**
     * 使用下一个方块
     * 
     * @param {number} type 
     * @param {number} dir 
     */
    Tetris.prototype.performNext = function (type, dir) {
        this.cur = this.next;
        this.setData();
        this.refreshDiv(this.gameData, this.gameDivs);
        this.next = SquareFactory.prototype.make(type, dir);
        this.refreshDiv(this.next.data, this.nextDivs);
    };

    /**
     * 旋转
     * 
     */
    Tetris.prototype.rotate = function () {
        if (this.rotateCheck()) {
            this.cur.dur = (this.cur.dur + 1) % 4;
            this.cur.data = this.cur.rotates[this.cur.dur].slice();
            this.clearData();
            this.setData();
            this.refreshDiv(this.gameData, this.gameDivs);
        }
    }

    /**
     * 旋转检测
     * 
     * @returns 
     */
    Tetris.prototype.rotateCheck = function () {
        var testdur = (this.cur.dur + 1) % 4,
            test = this.cur.rotates[testdur].slice();
        for (let i = 0, dataRow = test.length; i < dataRow; i++) {
            for (let j = 0, dataCol = test[0].length; j < dataCol; j++) {
                if (test[i][j] !== 0) {
                    if(!this.check(this.cur.origin, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * 坠落
     * 
     */
    Tetris.prototype.fall = function () {
        while (this.down()) {
            
        };
    };

    /**
     * 消行
     * 
     */
    Tetris.prototype.clearRow = function () {
        for (let i = this.gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for (let j = 0; j < this.gameData[0].length; j++) {
                if (this.gameData[i][j] !== DONE) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                for (let m = i; m > 0; m--) {
                    this.gameData[m] = this.gameData[m - 1].slice();
                }
                for (let n = 0; n < this.gameData[0].length; n++) {
                    this.gameData[0][n] = NONE;
                }
                i++;    //所有行下一了，判断被消掉的上一行
            }
        }  
    };

    /**
     * 判断游戏是否Over
     * 
     * @returns boolean
     */
    Tetris.prototype.checkGameOver = function () {
        for (let i = 0; i < this.gameData[0].length; i++) {
            if (this.gameData[1][i] === DONE) {
                return true;
            }
        }
        return false;    
    };

    Tetris.prototype.stopGame = function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.onkeydown = null;
    };

    /**
     * 初始化
     * 
     * @param {jQuery} doms 
     */
    Tetris.init = function (doms) {
        new this(doms);
    };


    window['Tetris'] = Tetris;
})();