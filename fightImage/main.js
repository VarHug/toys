// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('myImage', {
  preserveObjectStacking: true
});

// 异步获取图片
fabric.Image.fromURL('3.jpg', function(oImg) {
  // scale image down, and flip it, before adding it onto canvas
  oImg.scale(0.5);
  canvas.insertAt(oImg, 0);
});

var text = new fabric.Text('just 怼 it', {
  top: 400,
  left: 200
});
canvas.insertAt(text, 1);
text.set({
  cornerSize: 15,
  padding: 15,
  transparentCorners: true,
  cornerStyle: 'circle',
  cornerColor: 'red',
  borderColor: 'red'
});

$(function () {
  var listener = new window.keypress.Listener();

  listener.simple_combo('delete', () => {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.remove(obj);
    }
  });

  listener.simple_combo('-', () => {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.bringForward(obj);
    }
  });

  listener.simple_combo('+', () => {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.sendBackwards(obj);
    }
  });

  _textInit();

});

var btns = document.getElementsByClassName('btn-hook');
var btnDownload = btns[0];
var btnAdjust = btns[1];
var $theText = $('#theText');

btnDownload.onclick = downloadImg;
// btnAdjust.onclick = adjustImg;

$theText.on('keyup', () => {
  let newText = $theText.val();
  if (newText.length > 0) {
    var obj = canvas.getActiveObject();
    if (obj && obj.type === 'text') {
      obj.set('text', newText);
      canvas.renderAll();
    }
  }
});

function downloadImg() {
  // console.log(canvas.toDataURL('png'));
  download(canvas.toDataURL('png'), 'fightImg.png', 'image/png');
};

// function adjustImg() {
//   var obj = canvas.getActiveObject();
//   if (obj.type === 'image') {
//     console.log("top = " + obj.top);
//     console.log("left = " + obj.left);
//     console.log("angle = " + obj.angle);
//     console.log("scaleX = " + obj.scaleX);
//     console.log("scaleY = " + obj.scaleY);
//   }
// };

function _textInit() {
  $(canvas.getObjects()).each((index, item) => {
    if (item.type === 'text') {
      item.on('selected', () => {
        $theText.val(item.text);
        $theText.prop('disabled', false);
      });
      item.on('deselected', () => {
        $theText.val('点击画布中的文字进行修改');
        $theText.prop('disabled', true);
      });
    }
  });
}