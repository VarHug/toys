var vm = new Vue({
    el: '#app',
    data: {
        productlist: []
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
                
            });
        }
    }
});