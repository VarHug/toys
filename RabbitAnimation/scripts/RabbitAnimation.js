/// <reference path="../../../NodeSnippet/typings/index.d.ts" />import { setTimeout } from "timers";

var imgUrl = '../images/rabbit-big.png';
var positions = ['0 -854', '-174 -852', '-349 -852', '-524 -852', '-698 -852', '-873,-848'];
var ele = document.getElementById('rabbit');

animation(ele, positions, imgUrl);

function animation(ele, positions, imgUrl) {
    ele.style.backgroundImage = 'url(' + imgUrl + ')';
    ele.style.backgroundRepeat = 'no-repeat';

    let index = 0;
    let len = positions.length;

    function run() {
        let position = positions[index].split(' ');
        ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
        index++;
        if(index >= len) {
            index = 0;
        }
        setTimeout(run, 80);
    }

    run();
}
