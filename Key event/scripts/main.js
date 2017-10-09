var data = ['iPhone8', 'iPad', '三星笔记本', '佳能相机', '惠普打印机', '50元充值卡', '谢谢参与'],
    timer = null,
    flag = 0;

window.onload = function() {
    let title = document.getElementById('title'),
        btnStart = document.getElementById('start'),
        btnStop = document.getElementById('stop');

    btnStart.onclick = startFn;
    btnStop.onclick = stopFn;
    document.onkeyup = function(event) {
        event = event || window.event;
        if(event.keyCode === 13) {
            if(flag) {
                stopFn();
            } else {
                startFn();
            }
        }
    }

    function startFn() {
        flag = 1;
        clearInterval(timer);
        timer = setInterval(function() {
            var random = (Math.random() * data.length) | 0;
            title.innerText = data[random];
        }, 50);
        btnStart.style.background = '#999';
    }

    function stopFn() {
        flag = 0;
        clearInterval(timer);
        btnStart.style.background = '#036';
    }
}