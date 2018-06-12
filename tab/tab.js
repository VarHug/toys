var defaultParams = {
  // 事件触发类型
  "triggerType": "click",
  // 切换效果：default || fade
  "effect": "default",
  // 默认显示第几个tab
  "invoke": 1,
  // 是否自动切换，自动切换时间
  "auto": false
};

var Tab = function (ele) {
  this.tab = ele;

  this.config = defaultParams;

  if (this.getConfig()) {
    $.extend(this.config, this.getConfig());
  }

  this.$tabNav = this.tab.find('.tab-nav');
  this.$tabItems = this.tab.find('.tab-nav li');
  this.$contentItems = this.tab.find('.tab-content .content-item');

  this.bindEvents(this.config);
};

/**
 * 获取配置参数
 */
Tab.prototype.getConfig = function () {
  let config = this.tab.data('config')
  return config ? config : null;
};

/**
 * 事件委托
 * @param {Object} config
 */
Tab.prototype.bindEvents = function (config) {
  if (config.triggerType === 'mouseover') {
    this.$tabNav.on('mouseover', 'li', (e) => {
      this.invoke(e.target);
    });
  } else {
    this.$tabNav.on('click', 'li', (e) => {
      this.invoke(e.target);
    });
  }
};

Tab.prototype.invoke = function (ele) {
  let $ele = $(ele);
  let index = $ele.index();
  // tab-nav切换
  $ele.addClass('active').siblings().removeClass('active');
  // tab-content切换
  let effect = this.config.effect;
  if (effect === 'fade') {
    this.$contentItems.eq(index).fadeIn().siblings().fadeOut();
  } else {
    this.$contentItems.eq(index).addClass('current').siblings().removeClass('current');
  }
};

export {Tab};