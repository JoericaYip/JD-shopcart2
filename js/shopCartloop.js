"use strict";
new Vue({
    el: '#app',
    data: {
        // 购物车中的数据
        shopListArr: [
            {
            "shopId":"1001",
            "shopName":"360智能摄像机云台版 全景监控 360全景云台1080P",
            "shopPrice":299.00,
            "shopNumber":1,
            "shopImage":"images/img_01.jpg"
            },
            {
            "shopId":"1002",
            "shopName":"尼康（Nikon） D610 单反机身",
            "shopPrice":7199.00,
            "shopNumber":1,
            "shopImage":"images/img_02.jpg"
            },
            {
            "shopId":"1003",
            "shopName":"荣耀 畅玩6X 4GB 32GB 全网通4G手机 高配版 冰河银",
            "shopPrice":1299.00,
            "shopNumber":1,
            "shopImage":"images/img_03.jpg"
            }        
        ],
        // 是否全选
        isSelectedAll: false,
        // 所有商品的总价格
        totalPrice: 0,
        // 是否隐藏删除面板
        isHideDelPanel: true,
        // 当前要删除的一个商品
        currentDelShop: {}
    },

    // 过滤
    filters: {
        // 格式化金钱
        moneyFormat(money){
            return '¥' + money.toFixed(2);
        }
    },

    methods: {
        //  单个商品的加减
        singerShopPrice(shop, flag){
             if(flag){ // 加      
                 shop.shopNumber += 1;
             }else { // 减
                 if(shop.shopNumber <= 1){
                     shop.shopNumber = 1;
                     return;//中止函数往下执行
                 }
                 shop.shopNumber -= 1;
             }

            // 计算总价
            this.getAllShopPrice();
        },

        //  全选商品
        selectedAll(flag){
            //  总控制
            this.isSelectedAll = !flag;

            // 遍历所有的商品数据
            this.shopListArr.forEach((value, index)=>{
                if(typeof value.checked === 'undefined'){
                    this.$set(value, 'checked', !flag);
                }else {
                    value.checked = !flag;
                }
                // 如果shopListArr里面没有定义过checked属性，则用Vue.$set()方法新增属性
            });

            // 计算总价格
            this.getAllShopPrice();
        },

        // 计算商品的总价格
        getAllShopPrice(){
            let totalPrice = 0;
            // 遍历所有的商品
            this.shopListArr.forEach((value, index)=>{
                // 判断商品是否被选中
                if(value.checked){
                    totalPrice += value.shopPrice * value.shopNumber;
                }
            });

            this.totalPrice = totalPrice;
        },

        // 单个商品的选中和取消
        singerShopSelected(shop){
            // 判断有没有这个属性
            if(typeof shop.checked === 'undefined'){
                this.$set(shop, 'checked', true);
            }else {
                shop.checked = !shop.checked;
            }

            //计算总价
            this.getAllShopPrice();

            //判断是否全选
            this.hasSelectedAll();
        },

        //判断是否全选
        hasSelectedAll(){
            let flag = true;
            this.shopListArr.forEach((value, index)=>{
                if(!value.checked){
                    flag = false;
                }
            });
            this.isSelectedAll = flag;
        },

        //点击垃圾篓
        clickTrash(shop){
            this.isHideDelPanel = false;
            this.currentDelShop = shop;
        },

        //删除当前的商品
        delShop(){
           //隐藏面板
            this.isHideDelPanel = true;
            const index = this.shopListArr.indexOf(this.currentDelShop);
            this.shopListArr.splice(index, 1);

            //计算总价格
            this.getAllShopPrice();

        }

    }
});