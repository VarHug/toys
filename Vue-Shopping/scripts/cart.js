var vm = new Vue({
    el: '#app',
    data: {
        productlist: [],
        totalMoney: 0
    },
    filters: {
        formatMoney: function (value) {
            return '¥ ' + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods: {
        cartView: function () {
            axios.get('../data/cartData.json').then(res => {
                this.productlist = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            });
        }
    }
});