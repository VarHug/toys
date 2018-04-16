var vm = new Vue({
    el: '#app',
    data: {
        productlist: [],
        totalMoney: 0,
        checkAll: false,
        totalPrice: 0
    },
    computed:{
        calcTotalPrice: function () {
            this.totalPrice = 0;
            this.productlist.forEach(product => {
                if (product.checked) {
                    this.totalPrice += product.productPrice * product.productQuantity;
                }
            });
            return this.totalPrice;
        }
    },
    filters: {
        formatMoney: function (value) {
            return '¥ ' + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods: {
        cartView: function () {
            axios.get('../data/cartData.json').then(res => {
                this.productlist = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function (product, num) {
            product.productQuantity += num;
            if (product.productQuantity < 1) {
                product.productQuantity = 1;
            }
        },
        selectedProduct: function (product) {
            if (typeof product.checked === 'undefined') {
                this.$set(product, 'checked', true);
            } else {
                product.checked = !product.checked;
            }

            this.checkAll = this.productlist.every(product => {
                return product.checked === true;
            })
        },
        checkAllEvent: function (type) {
            this.checkAll = type;
            this.productlist.forEach(product => {
                if (typeof product.checked === 'undefined') {
                    this.$set(product, 'checked', this.checkAll);
                } else {
                    product.checked = this.checkAll;
                }
            });
        }
    }
});