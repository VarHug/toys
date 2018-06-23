var images = [
  './images/IMG_20160302_161049.jpg',
  './images/IMG_20160306_185135.jpg',
  './images/IMG_20160308_153003.jpg',
  './images/IMG_20160308_154721.jpg',
  './images/IMG_20160312_191816.jpg'
];

let index = 0,
    len = images.length,
    $progress = $('.progress');

$.preload(images, {
  each: (count) => {
    $progress.html(Math.round((count) / len * 100) + '%');
  },
  all: () => {
    $('.loading').hide();
  }
});


$('.btn-hook').on('click', function() {
  if ($(this).data('control') === 'prev') {
    if (--index < 0) {
      index = 4;
    }
  } else {
    index = (++index) % len;
  }
  $('#img').attr('src', images[index]);
});
