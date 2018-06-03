<template>
  <div>
    <v-header></v-header>
    <v-bread></v-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)">All</a></dd>
              <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">1000 - 2000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li>
                  <div class="pic">
                    <a href="#"><img src="static/1.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">999</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import vHeader from '../components/header/header';
import vFooter from '../components/footer/footer';
import vBread from '../components/bread/bread';

export default {
  data() {
    return {
      goodsList: []
    };
  },
  mounted() {
    this.$axios.get('/api/goods').then(response => {
      var res = response.data;
      console.log(res);
    });
  },
  components: {
    'v-header': vHeader,
    'v-footer': vFooter,
    'v-bread': vBread
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
