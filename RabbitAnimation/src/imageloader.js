'use strict';


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

function callback(boolean) {
    if(boolean) {
        console.log('图片已加载完成');
    } else {
        console.log('图片加载失败');
    }
}