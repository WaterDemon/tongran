# my-project2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

订单列表
http://localhost:8080/yimei/app/order/order_0?userToken=    （0:待付款,1:待消费,2:预约中,3:已消费,4:待评价,5:已评价）

取消订单
http://localhost:8080/yimei/app/order/deleteOrder?orderId=

确认消费
http://localhost:8080/yimei/app/order/orderUsed?orderId=

预约下单
http://localhost:8080/yimei/app/order/advanceOrder?userToken= &shopId= &orderTime= &orderWechatNum=

用户信息
localhost/yimei/app/appuser/my 参数：userToken

缺少判断是否有银行卡