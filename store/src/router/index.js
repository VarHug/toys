import Vue from 'vue';
import Router from 'vue-router';
import goodsList from '../views/goodsList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: goodsList
    }
  ]
});
