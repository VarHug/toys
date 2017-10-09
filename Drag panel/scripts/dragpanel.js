function getByClass(className, parent) {
    let oParent = parent ? document.getElementById(parent) : document,
        eles = [],
        elements = oParent.getElementsByTagName('*'),
        pattern = new RegExp('\\b' + className + '\\b');

    for(let i = 0, len = elements.length; i < len; i++) {
        if(elements[i].className.search(pattern) !== -1) {
            eles.push(elements[i]);
        }
    }
    return eles;
}
function getById(classId) {
    return document.getElementById(classId);
}

EventUtil.addHandler(window, 'load', dragPanel);

function dragPanel() {
    //用户名框判定
    inputUidJudge();
    //面板拖动
    panelMove();
    //关闭面板
    panelClose();
    //切换状态
    changeState();
}
//用户名框判定
function inputUidJudge() {
    let inputUid = getById('uid');
    EventUtil.addHandler(inputUid, 'focus', function(event) {
        if(inputUid.value === 'QQ号码或Email帐号') {
            inputUid.value = '';
        }
    });
    EventUtil.addHandler(inputUid, 'blur', function(event) {
        if(inputUid.value === '') {
            inputUid.value = 'QQ号码或Email帐号';
        }
    });
}
//面板拖动
function panelMove() {
    let oTitle = document.getElementsByClassName ? document.getElementsByClassName('login_logo_webqq')[0] : getByClass('login_logo_webqq', 'loginPanel')[0];
    EventUtil.addHandler(oTitle, 'mousedown', fnDown);

    //按下鼠标
    function fnDown(event) {
        let eventFnDown = EventUtil.getEvent(event);
        let oDrag = getById('loginPanel'),
            //鼠标点击时与面板左和上的距离
            disX = eventFnDown.clientX - oDrag.offsetLeft,
            disY = eventFnDown.clientY - oDrag.offsetTop;
        //添加移动鼠标事件处理程序    
        EventUtil.addHandler(document, 'mousemove', fnMove);
        //添加松开鼠标事件处理程序
        EventUtil.addHandler(document, 'mouseup', fnUp);
        //移动鼠标事件处理程序 
        function fnMove(event) {
            let eventMousemove = EventUtil.getEvent(event);
            fnMove1(eventMousemove, disX, disY);
            function fnMove1(e, posX, posY) {
                let oDrag = getById('loginPanel'),
                    //盒子正确的位置
                    l = e.clientX - posX,
                    t = e.clientY - posY,
                    winW = document.documentElement.clientWidth || document.body.clientWidth,
                    winH = document.documentElement.clientHeight || document.body.clientHeight,
                    maxW = winW - oDrag.offsetWidth - 10,
                    maxH = winH - oDrag.offsetHeight;
                
                if (l < 0) {
                    l = 0;
                } else if(l > maxW) {
                    l = maxW;
                }
                if(t < 10) {
                    t = 10;
                } else if(t > maxH) {
                    t = maxH;
                }
                oDrag.style.left = l + 'px';
                oDrag.style.top = t + 'px';
            }
        }
        //松开鼠标事件处理程序
        function fnUp(event) {
            //移除移动鼠标事件处理程序
            EventUtil.removerHandler(document, 'mousemove', fnMove);
            //移除松开鼠标事件处理程序
            // EventUtil.removerHandler(document, 'mouseup', fnUp);
        }
    }
}
//关闭面板
function panelClose() {
    let boxClose = getById('ui_boxClose');
    EventUtil.addHandler(boxClose, 'click', function(event) {
        getById('loginPanel').style.display = 'none';
    });
}
//切换状态
function changeState() {
    let loginState = getById('loginState'),
        stateList = getById('loginStatePanel'),
        stateListLi = stateList.getElementsByTagName('li'),
        stateTxt = getById('loginStateTxt'),
        loginStateShow = getById('loginStateShow'),
        index = -1;
    //点击切换状态时事件处理程序    
    EventUtil.addHandler(loginState, 'click', function(event) {
        let loginStateEvent = EventUtil.getEvent(event);
        EventUtil.stopProagation(loginStateEvent);
        stateList.style.display = 'block';
    });
    //键盘事件处理程序
    EventUtil.addHandler(document, 'keydown', function(event) {
        let loginStateKeyEvent = EventUtil.getEvent(event);
        EventUtil.stopProagation(loginStateKeyEvent);
        if(loginStateKeyEvent.keyCode === 40) {
            if(index < stateListLi.length - 1) {
                if(index >= 0) {
                    stateListLi[index].style.backgroundColor = '#fff';
                }
                stateListLi[++index].style.backgroundColor = '#567';
            } else {
                index = 0;
                stateListLi[index].style.backgroundColor = '#567';
                stateListLi[stateListLi.length - 1].style.backgroundColor = '#fff';
            }
        } else if (loginStateKeyEvent.keyCode === 38) {
            if(index > 0) {
                stateListLi[index].style.backgroundColor = '#fff';
                stateListLi[--index].style.backgroundColor = '#567';
            } else {
                index = stateListLi.length - 1;
                stateListLi[index].style.backgroundColor = '#567';
                stateListLi[0].style.backgroundColor = '#fff';
            }
        } else if (loginStateKeyEvent.keyCode === 13) {
            changeStateComplete();
        }
    }) ;
    //鼠标滑过、离开和点击状态列表事件处理程序
    for(let i = 0, len = stateListLi.length; i < len; i++) {
        //鼠标滑过事件处理程序
        EventUtil.addHandler(stateListLi[i], 'mouseover', function(event) {
            if(index >= 0) {
                stateListLi[index].style.backgroundColor = '#fff';
            }
            index = i;
            stateListLi[i].style.backgroundColor = '#567';
        });
        //离开事件处理程序
        // EventUtil.addHandler(stateListLi[i], 'mouseout', function(event) {
        //     stateListLi[i].style.backgroundColor = '#fff';
        // });
        //点击事件处理程序
        EventUtil.addHandler(stateListLi[i], 'click', function(event) {
            let stateListLiEvent = EventUtil.getEvent(event);
            EventUtil.stopProagation(stateListLiEvent);
            changeStateComplete();
        }); 
    }
    //其他地方点击事件处理程序（隐藏ul）
    EventUtil.addHandler(document, 'click', function(event) {
        stateList.style.display = 'none';
    });
    //切换状态时点击或者回车事件处理函数
    function changeStateComplete() {
        stateList.style.display = 'none';
        stateListLi[index].style.backgroundColor = '#fff';
        let liId = stateListLi[index].id;
        stateTxt.innerText = getByClass('stateSelect_txt', liId)[0].innerText;
        loginStateShow.className = '';
        loginStateShow.className = 'login_state_show ' + liId;
        index = -1;
    }
}