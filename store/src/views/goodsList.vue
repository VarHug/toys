<template>
  <div>
    <v-header></v-header>
    <v-bread></v-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}" @click="priceChecked='all'">All</a></dd>
              <dd v-for="(price,index) in priceFilter" :key="index">
                <a href="javascript:void(0)" :class="{'cur':priceChecked===index}" @click="setPriceFilter(index)">{{price.startPrice}}-{{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
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
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import vHeader from '../components/header/header';
import vFooter from '../components/footer/footer';
import vBread from '../components/bread/bread';

const ERR_OK = 0;

export default {
  data() {
    return {
      goodsList: [],
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '500.00'
        }, {
          startPrice: '500.00',
          endPrice: '1000.00'
        }, {
          startPrice: '1000.00',
          endPrice: '2000.00'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false,
      sortFlag: true,
      page: 1,
      pageSize: 8
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    setPriceFilter(index) {
      this.priceChecked = index;
      this.closePop();
    },
    showFilterPop() {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop() {
      this.filterBy = false;
      this.overLayFlag = false;
    },
    getGoodsList() {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1
      };
      this.$axios.get('/goods', {
        params: param
      }).then(response => {
        let res = response.data;
        if (res.status === ERR_OK) {
          this.goodsList = res.result.list;
        } else {
          this.goodsList = [];
        }
      });
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    }
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
