new Vue({
    el: '.container',
    data: {
        addressList: [],
        limitNum: 3,
        curIndex: 0,
        shippingMethod: 1
    },
    mounted: function() {
        this.$nextTick(function () {
            this.getAddressList();
        });             
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function () {
            axios.get('../data/address.json').then(res => {
                if (res.data.status === 0) {
                    this.addressList = res.data.result;
                }
            });
        },
        loadMore: function () {
            this.limitNum = this.addressList.length;
        },
        setDefault: function (addressId) {
            this.addressList.forEach((address, index) => {
                if (address.addressId === addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            })
        }
    }
});