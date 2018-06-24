// 图片预加载
(function ($) {
  class Preload {
    constructor(images, options) {
      this.images = (typeof images === 'string') ? [images] : images;
      this.opts = $.extend({}, this._getDEFAULTS(), options);
      if (this.opts.order === 'ordered') {
        this._ordered();
      } else {
        this._unoredered();
      }
    }

    _getDEFAULTS() {
      return {
        order: 'unordered',
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
          count++;
          opts.each && opts.each(count);

          if (count >= len) {
            opts.all && opts.all();
          }
        });
      
        imgObj.src = src;
      });
    }
    
    /**
     * 图片有序预加载
     * @memberof Preload
     */
    _ordered() {
      let images = this.images,
          opts = this.opts,
          count = 0,
          len = images.length;
      
      load();

      function load() {
        let imgObj = new Image();
      
        $(imgObj).on('load error', function () {
          count++;
          opts.each && opts.each(count);

          if (count >= len) {
            opts.all && opts.all();
          } else {
            load();
          }
        });
      
        imgObj.src = images[count];
      }
        
    }
  }

  $.extend({
    preload: function (images, options) {
      new Preload(images, options);
    }
  });
})(jQuery);