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

window.onload = dragPanel;

function dragPanel() {
    //用户名框判定
    inputUidJudge();
    //面板拖动
    panelMove();
}

function inputUidJudge() {
    let inputUid = document.getElementById('uid');
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

function panelMove() {
    let oTitle = document.getElementsByClassName ? document.getElementsByClassName('login_logo_webqq')[0] : getByClass('login_logo_webqq', 'loginPanel')[0];
    EventUtil.addHandler(oTitle, 'mousedown', fnDown);

    function fnDown(event) {
        let eventFnDown = EventUtil.getEvent(event);
        let oDrag = document.getElementById('loginPanel'),
            disX = eventFnDown.clientX - oDrag.offsetLeft,
            disY = eventFnDown.clientY - oDrag.offsetTop;
        EventUtil.addHandler(document, 'mousemove', function(event) {
            let eventMousemove = EventUtil.getEvent(event);
            fnMove(eventMousemove, disX, disY);
        });
    }

    function fnMove(e, posX, posY) {
        let l = e.clientX - posX,
            t = e.clientY - posY;
            oDrag = document.getElementById('loginPanel');
        oDrag.style.left = l + 'px';
        oDrag.style.top = t + 'px';
    }
}

