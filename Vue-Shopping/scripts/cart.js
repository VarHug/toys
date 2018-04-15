var vm = new Vue({
    el: '#app',
    data: {
        productlist: [],
        totalMoney: 0
    },
    filters: {

    },
    mounted: function () {
        this.cartView();
    },
    methods: {
        cartView: function () {
            var _this_ = this;
            axios.get('../data/cartData.json').then(function (res) {
                _this_.productlist = res.data.result.list;
                _this_.totalMoney = res.data.result.totalMoney;
            });
        }
    }
});