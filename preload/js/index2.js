var images = [
  './images/IMG_20160302_161049.jpg',
  './images/IMG_20160306_185135.jpg',
  './images/IMG_20160306_190004.jpg',
  './images/IMG_20160307_223550.jpg',
  './images/IMG_20160307_224044.jpg',
  './images/IMG_20160308_151851.jpg',
  './images/IMG_20160308_153003.jpg',
  './images/IMG_20160308_154721.jpg',
  './images/IMG_20160310_153910.jpg',
  './images/IMG_20160312_191816.jpg'
];

let len = images.length,
    index = 0,
    animateFlag = true;

$.preload(images, {
  order: 'ordered'
});

$('.btn-hook').on('click', function() {
  if (animateFlag) {
    animateFlag = false;
    if ($(this).data('control') === 'prev') {
      if (--index < 0) {
        index = 4;
      }
    } else {
      index = (++index) % len;
    }
    $('#img').animate({
      opacity: 'toggle'
    }, 'fast', null, function () {
      $('#img').attr('src', images[index]);
      $('#img').animate({
        opacity: 'toggle'
      }, 'fast', null, function () {
        animateFlag = true;
      });
    });
  }
});
