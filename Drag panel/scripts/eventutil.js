var EventUtil = {
    //添加事件处理程序
    addHandler: function(ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, handler);
        } else {
            ele['on' + type] = handler;
        }
    },
    //获取event对象
    getEvent: function(event){
        return event ? event : window.event;
    },
    //获取事件目标
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    //取消事件的默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //移除事件处理程序
    removerHandler: function(ele, type, handler) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, handler, false);
        } else if (ele.detachEvent) {
            ele.detachEvent('on' + type, handler);
        } else {
            ele['on' + type] = null;
        }
    },
    //取消事件进一步捕获或冒泡
    stopProagation: function(event) {
        if (event.stopProagation) {
            event.stopProagation();
        } else {
            event.cancelBubble = true;
        }
    },
    //取得相关元素
    getRelatedTarget: function(event) {
        if(event.relatedTarget) {
            return event.relatedTarget;
        } else if(event.toElement) {
            return event.toElement;
        } else if(event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    //获取鼠标按钮button属性(0左、1滚轮、2右)
    getButton: function(event) {
        if(document.implementation.hasFeature('MouseEvents', '2.0')) {
            return event.button;
        } else {
            switch(event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    }
};