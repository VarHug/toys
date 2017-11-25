'use strict';

var loadImage = require('./imageloader');

//初始化状态
const STATE_INITTAL = 0;
//开始状态
const STATE_START = 1;
//停止状态
const STATE_STOP = 2;
//同步任务
const TASK_SYNC = 0;
//异步任务
const TASK_ASYNC = 1;

/**
 * 帧动画库类
 * @constructor
 */
function Animation() {
    //任务链   
    this.taskQueue = [];
    this.index = 0;
    this.state = STATE_INITTAL;
}

/**
 * 预加载图片
 * 同步任务
 * @param {any} imglist 图片数组
 */
Animation.prototype.loadImage = function (imglist) {
    var taskFn = function (next) {
        loadImage(imglist.slice(), next);
    };
    var type = TASK_SYNC;

    return this._add(taskFn, type);
};

/**
 * 通过定时改变图片位置实现帧动画
 * 异步定时任务
 * @param {any} ele dom对象
 * @param {any} positions 背景位置数组 
 * @param {any} imageUrl 图片地址
 */
Animation.prototype.changePosition = function (ele, positions, imageUrl) {
    
};

/**
 * 通过定时改变img标签的src属性实现帧动画
 * 异步定时任务
 * @param {any} ele image标签
 * @param {any} imglist 图片数组
 */
Animation.prototype.changeSrc = function (ele, imglist) {
    
};

/**
 * 自定义动画每帧执行的任务函数
 * 高级用法，异步定时执行任务
 * @param {any} taskFn 自定义每帧执行的任务函数
 */
Animation.prototype.enterFrame = function (taskFn) {
    
};

/**
 * 可以在上一个任务完成后执行回调函数
 * 同步任务
 * @param {any} callback 回调函数
 */
Animation.prototype.then = function (callback) {
    
};

/**
 * 开始执行任务
 * 异步定时任务
 * @param {any} interval 
 */
Animation.prototype.start = function (interval) {
     if(this.state === STATE_START) {
         return this;
     }
     //任务链中没有任务，直接返回
     if(!this.taskQueue.length) {
         return this;
     }
     this.state = STATE_START;
     this.interval = interval;
     this._runTask();
     return this;
};

/**
 * 该任务就是回退到上一个任务中从而实现重复上一个任务的效果，该任务可以定义重复的次数
 * 同步任务
 * @param {any} items 重复次数
 */
Animation.prototype.repeat = function (items) {
    
};

/**
 * 该任务相当于repeat()更友好的一个接口，无限循环上一次的任务
 * 同步任务
 */
Animation.prototype.repeatForever = function () {
    
};

/**
 * 设置当前任务执行结束后到下一个任务开始前的等待时间
 * 
 * @param {any} time 等待时长
 */
Animation.prototype.wait = function (time) {
    
};

/**
 * 暂停当前的异步定时任务
 * 
 */
Animation.prototype.pause = function () {
    
};

/**
 * 重新执行上一次暂停的异步任务
 * 
 */
Animation.prototype.restart = function () {
    
};

/**
 * 释放资源
 * 
 */
Animation.prototype.dispose = function () {
    
}

/**
 * 添加一个任务到任务队列中 
 * 
 * @param {any} taskFn 任务方法
 * @param {any} type 任务类型
 */
Animation.prototype._add = function (taskFn, type) {
    this.taskQueue.push({
        taskFn: taskFn,
        type: type
    });

    return this;
};

/**
 * 执行任务
 * 
 */
Animation.prototype._runTask = function () {
    if(!this.taskQueue || this.state !== STATE_START) {
        return;
    }
    //任务执行完毕
    if(this.index === this.taskQueue.length) {
        this.dispose();
        return;
    }
    //获得任务链上的当前任务
    var task = this.taskQueue[this.index];
    if(task.type === TASK_SYNC) {
        this._syncTask(task);
    } else {
        this._asyncTask(task);
    }
};
/**
 * 同步任务
 * 
 * @param {any} task 执行的任务对象
 */
Animation.prototype._syncTask = function (task) {
    var that = this;
    var next = function () {
      //切换到下一个任务  
      that._next();
    };

    var taskFn = task.taskFn;
    taskFn(next);
};
/**
 * 异步任务
 * 
 * @param {any} task 执行的任务对象
 */
Animation.prototype._asyncTask = function (task) {
    
};

/**
 * 切换到下一个任务
 * 
 */
Animation.prototype._next = function () {
    this.index++;
    this._runTask();
};