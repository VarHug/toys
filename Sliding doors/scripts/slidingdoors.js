window.onload = function() {
    var box = document.getElementById('container');
    var images = box.getElementsByTagName('img');
    var imgWidth = images[0].offsetWidth;
    var exposeWidth = 200;
    var boxWidth = imgWidth + (images.length - 1) * exposeWidth;
    box.style.width = boxWidth + 'px';

    for(let i = 1, len = images.length; i < len; i++) {
        images[i].style.left = imgWidth + exposeWidth * (i - 1) + 'px';
        images[i].pos = images[i].style.left;
    }

    var translate = imgWidth - exposeWidth;
    for(let i = 0, len = images.length; i < len; i++) {
        images[i].onmouseover = function() {
            for(let j = 1; j <= i; j++) {
                openDoor(images[j], translate);
            }
            for(let j = i + 1, len = images.length; j < len; j++) {
                closeDoor(images[j], translate);
            }
        };
    }

    function openDoor(ele, translate) {
        var begin = parseInt(ele.pos);
        var end = begin - translate;
        var speed = 40;
        setTimeout(function() {
            ele.style.left = parseInt(ele.style.left, 10) - speed + 'px';
            if(parseInt(ele.style.left) <= end) {
                ele.style.left = end + 'px';
            } else {
                setTimeout(arguments.callee, 30);
            }
        }, 30);
    }

    function closeDoor(ele, translate) {
        var begin = parseInt(ele.pos) - translate;
        var end = begin + translate;
        var speed = 40;
        setTimeout(function() {
            ele.style.left = parseInt(ele.style.left, 10) + speed + 'px';
            if(parseInt(ele.style.left) >= end) {
                ele.style.left = end + 'px';
            } else {
                setTimeout(arguments.callee, 30);
            }
        }, 30);
    }
};

