// 图片预加载
(function ($) {
  class Preload {
    constructor(images, options) {
      this.images = (typeof images === 'string') ? [images] : images;
      this.opts = $.extend({}, this._getDEFAULTS(), options);
      this._unoredered();
    }

    _getDEFAULTS() {
      return {
        each: null, // 每一张图片加载完毕后执行
        all: null // 所有图片加载完毕后执行
      }
    };

    /**
     * 图片无序预加载
     * @memberof Preload
     */
    _unoredered() {
      let images = this.images,
          opts = this.opts,
          count = 0,
          len = images.length;

      $.each(images, function (i, src) {
        if (typeof src !== 'string') {
          return;
        }

        let imgObj = new Image();
      
        $(imgObj).on('load error', function () {
          opts.each && opts.each(++count);

          if (count >= len) {
            opts.all && opts.all();
          }
        });
      
        imgObj.src = src;
      });
    }
  }

  $.extend({
    preload: function (images, options) {
      new Preload(images, options);
    }
  });
})(jQuery);