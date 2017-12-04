(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["animation"] = factory();
	else
		root["animation"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loadImage = __webpack_require__(1);
var Timeline = __webpack_require__(2);

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
 * 简单的函数封装,执行callback
 * 
 * @param {any} callback 执行的函数
 */
function next(callback) {
    callback && callback();
}

/**
 * 帧动画库类
 * @constructor
 */
function Animation() {
    //任务链   
    this.taskQueue = [];
    this.index = 0;
    this.state = STATE_INITTAL;
    //timeline实例
    this.timeline = new Timeline();
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
    var len = positions.length;
    var taskFn;
    var type;
    if(len) {
        var that = this;
        taskFn = function (next, time) {
            if(imageUrl) {
                ele.style.backgroundImage = 'url(' + imageUrl + ')';  
            }
            //获得当前背景图片位置索引
            var index = Math.min(time / that.interval | 0, len);
            var position = positions[index - 1].split(' ');
            //改变dom对象背景的图片位置
            ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
            if(index === len) {
                next();
            }
        };
        type = TASK_ASYNC;
    } else {
        taskFn = next;
        type = TASK_SYNC;
    }

    return this._add(taskFn, type);
};

/**
 * 通过定时改变img标签的src属性实现帧动画
 * 异步定时任务
 * @param {any} ele image标签
 * @param {any} imglist 图片数组
 */
Animation.prototype.changeSrc = function (ele, imglist) {
    var len = imglist.length;
    var taskFn;
    var type;
    if (len) {
        var that = this;
        taskFn = function (next, time) {
            //获得当前图片索引
            var index = Math.min(time / that.interval | 0, len - 1);
            //改变image对象的图片地址
            ele.src = imglist[index];
            if(index === len - 1) {
                next();
            }
        };
        type = TASK_ASYNC;
    } else {
        taskFn = next;
        type = TASK_SYNC;
    }

    return this._add(taskFn, type);
};

/**
 * 自定义动画每帧执行的任务函数
 * 高级用法，异步定时执行任务
 * @param {any} taskFn 自定义每帧执行的任务函数
 */
Animation.prototype.enterFrame = function (taskFn) {
    return this._add(taskFn, TASK_ASYNC);
};

/**
 * 可以在上一个任务完成后执行回调函数
 * 同步任务
 * @param {any} callback 回调函数
 */
Animation.prototype.then = function (callback) {
    var taskFn = function (next) {
        callback();
        next();
    };
    var type = TASK_SYNC;

    return this._add(taskFn, type);
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
 * @param {any} times 重复次数
 */
Animation.prototype.repeat = function (times) {
    var that = this;
    var taskFn = function () {
        if(typeof times === 'undefined') {
            //无限回退到上一个任务
            that.index--;
            that._runTask();
            return;
        }
        if (times) {
            times--;
            //回退
            that.index--;
            that._runTask();
        } else {
            //达到重复次数，跳转下一个任务
            var task = that.taskQueue[that.index];
            that._next(task);
        }
    };
    var type = TASK_SYNC;

    return this._add(taskFn, type);
};

/**
 * 该任务相当于repeat()更友好的一个接口，无限循环上一次的任务
 * 同步任务
 */
Animation.prototype.repeatForever = function () {
    return this.repeat();
};

/**
 * 设置当前任务执行结束后到下一个任务开始前的等待时间
 * 
 * @param {any} time 等待时长
 */
Animation.prototype.wait = function (time) {
    if(this.taskQueue && this.taskQueue.length > 0) {
        this.taskQueue[this.taskQueue.length - 1].wait = time;
    }
    return this;
};

/**
 * 暂停当前的异步定时任务
 * 
 */
Animation.prototype.pause = function () {
    if(this.state === STATE_START) {
        this.state = STATE_STOP;
        this.timeline.stop();
        return this;
    }
    return this;
};

/**
 * 重新执行上一次暂停的异步任务
 * 
 */
Animation.prototype.restart = function () {
    if(this.state === STATE_STOP) {
        this.state = STATE_START;
        this.timeline.restart();
        return this;
    }
    return this;
};

/**
 * 释放资源
 * 
 */
Animation.prototype.dispose = function () {
    if(this.state !== STATE_INITTAL) {
        this.state = STATE_INITTAL;
        this.taskQueue = null;
        this.timeline.stop();
        this.timeline = null;
        return this;
    }
    return this;
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
      that._next(task);
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
    var that = this;
    //定义每一帧执行的回调函数
    var enterFrame = function (time) {
        var taskFn = task.taskFn;
        var next = function () {
            //停止当前任务
            that.timeline.stop();
            //执行下一个任务
            that._next(task);
        }
        taskFn(next, time);
    };

    this.timeline.onenterframe = enterFrame;
    this.timeline.start(this.interval);
};

/**
 * 切换到下一个任务
 * 支持如果当前任务等待，则延迟执行
 * @param task 当前任务
 * @private
 */
Animation.prototype._next = function (task) {
    this.index++;
    var that = this;
    task.wait ? setTimeout(function () {
        that._runTask();
    }, task.wait) : this._runTask();
};

module.exports = function () {
    return new Animation();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * 预加载图片函数
 * 
 * @param {any} images 加载图片的数组或对象
 * @param {any} callback 全部图片加在完毕后调用的回调函数
 * @param {any} timeout 加载超时的时长
 */
function loadImage(images, callback, timeout) {
    //加载完成图片的计数器
    var count = 0;
    //全部图片加载成功的标志位
    var success = true;
    //超时timer的id
    var timeoutId = 0;
    //是否加载超时的标志位
    var isTimeout = false;

    //对图片数组或对象进行遍历
    for(var key in images) {
        //过滤prototype上的属性
        if(!images.hasOwnProperty(key)) {
            continue;
        }
        //获得每个图片元素
        //期望格式是object:{src:xxx}
        var item = images[key];

        if(typeof item === 'string') {
            item = images[key] = {
                src: item
            };
        }
        //如果格式不满足期望，则丢弃此条数据进行下一次遍历
        if (!item || !item.src) {
            continue; 
        }
        //计数+1
        count++;
        //设置图片元素的id
        item.id = '__img__' + key + getId();
        //设置图片元素的img，它是一个Image对象
        item.img = window[item.id] = new Image();

        doLoad(item);
    }

    //遍历完成如果计数为0，则直接调用callback
    if(!count) {
        callback(success);
    } else if (timeout) {
        timeoutId = setTimeout(onTimeout, timeout);
    }
    
    /**
     * 真正进行图片加载函数
     * @param {any} item 图片元素对象
     */
    function doLoad(item) {
        item.status = 'loading';

        var img = item.img;
        //定义图片加载成功回调函数
        img.onload = function () {
            success = success && true;
            item.status = 'loaded';
            done();
        };
        //定义图片加载失败的回调函数
        img.onerror = function () {
            success = false;
            item.status = 'error';
            done();
        };

        //发起了一个http(s)的请求进而加载图片
        img.src = item.src;

        /**
         * 每张图片加载完成后的回调函数
         */
        function done() {
            img.onload = img.onerror = null;

            try {
                delete window[item.id];
            } catch (e) {
                
            }

            //每张图片加载完成，计数器减1，当所有图片加载完成且没有超时的情况
            //清除超时计时器，且执行回调函数
            if(!--count && !isTimeout) {
                clearTimeout(timeoutId);
                callback(success);
            }
        }
    }

    /**
     * 超时函数
     * 
     */
    function onTimeout() {
        isTimeout = true; 
        callback(false);   
    }
}

var __id = 0;
function getId() {
    return ++__id;
}

module.exports = loadImage;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DEFAULT_INTERVAL = 1000 / 60;
//初始化状态
const STATE_INITTAL = 0;
//开始状态
const STATE_START = 1;
//停止状态
const STATE_STOP = 2;

/**
 * raf
 * 
 * @returns 
 */
var requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL));
        };
})();

var cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (id) {
          return window.clearTimeout(id);  
        };
})(); 

/**
 * 时间轴类
 * 
 * @param {any} params 
 */
function Timeline() {
    this.animationHandler = 0;
    this.state = STATE_INITTAL;
}

/**
 * 时间轴上每一次回调执行的函数
 * 
 * @param {any} time 从动画开始到当前的执行时间
 */
Timeline.prototype.onenterframe = function (time) {
    
};

/**
 * 动画开始 
 * 
 * @param {any} interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function (interval) {
    if(this.state === STATE_START) {
        return;
    }
    this.state = STATE_START;
    this.interval = interval || DEFAULT_INTERVAL;
    startTimeline(this, +new Date());
};

/**
 * 动画停止
 * 
 */
Timeline.prototype.stop = function () {
    if(this.state !== STATE_START) {
        return;
    }
    this.state = STATE_STOP;

    //如果动画开始过，则记录动画从开始到现在所经历的时间
    if(this.startTime) {
        this.dur = +new Date() - this.startTime;
    }
    cancelAnimationFrame(this.animationHandler);
};

/**
 * 重新开始动画
 * 
 */
Timeline.prototype.restart = function () {
    if(this.state === STATE_START) {
        return;
    }
    if(!this.dur || this.interval) {
        return;
    }
    this.state = STATE_START;

    //第二个参数无缝连接动画
    startTimeline(this, +new Date() - this.dur);
};

/**
 * 时间轴动画启动函数
 * 
 * @param {any} timeline 时间轴的实例
 * @param {any} startTime 动画开始时间戳
 */
function startTimeline(timeline, startTime) {
    //记录上一次回调的时间戳
    var lastTick = +new Date();

    timeline.startTime = startTime;
    nextTick.interval = timeline.interval;
    
    nextTick(); 

    /**
     * 每一帧执行的函数
     * 
     */
    function nextTick() {
        var now = +new Date();

        timeline.animationHandler = requestAnimationFrame(nextTick);

        //如果当前时间与上一次回调的时间戳大于等于设置的时间间隔，
        //表示这一次可以执行回调函数
        if(now - lastTick >= timeline.interval) {
            timeline.onenterframe(now - startTime);//now - lasttick:bug所在
            lastTick = now;
        }
    }
}

module.exports = Timeline;

/***/ })
/******/ ]);
});