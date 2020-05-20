<template>
    <div class="payment">
        <van-nav-bar title="预约付款" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="HomeList">
            <van-row  gutter="10">
                <van-col span="6">
                    <div class="contentListImg">
                        <img :src="imgLeft+img" alt="">
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="commTxt">
                        <p class="contentTitle">{{contentTitle}}</p>
                        <p class="CommName">{{CommName}}</p>
                        <span class="total">总价：￥{{total}}</span> |
                        <span class="total">定金：￥{{yuyue}}</span>
                    </div>
                </van-col>
            </van-row>
        </div>
        <div class="hr"></div>
        <van-cell-group>
            <van-field
                label="预约时间"
                disabled
                placeholder="请选择预约时间"
                :value="times"
                @click="popupTime()"
            />
            <van-field
                v-model="weixin"
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="name"
                label="姓名"
                placeholder="请输入姓名"
            />
        </van-cell-group>
        <div class="button">
            <p>定金：<span>￥{{yuyue}}</span> <input @click="LinkSub" type="button" value="提交预约"></p>
        </div>
        <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '40%' }"
        >
        <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @confirm="buttons"
        @cancel="canlse"
        />
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'payment',
    data() {
        return{
            imgLeft:'',
            img: '',
            param: '',
            contentTitle:'',
            CommName: '',
            total: '',
            yuyue: '',
            show: false,
            weixin: '',
            times: '',
            minDate: new Date(),
            currentDate: new Date(),
            name: ''
        }
    },
    created(){
        this.imgLeft = localStorage.getItem("temp")
        let token = localStorage.getItem("token")
        var param = this.$route.params.id
        this.param = param
        let orderProduct = '/order/orderProduct'
        let params = {
            shopId: this.param 
        }
        this.$fetch(orderProduct,params)
        .then((res)=>{
            this.img = res.result.shopImg
            this.contentTitle = res.result.shopTitle
            this.CommName = res.result.webBrand.brandTitle
            this.total = res.result.shopCurrentPrice
            this.yuyue = res.result.shopEarnestPrice
            console.log(this.images)
        })
        .catch((res)=>{
            this.$toast('网络异常')
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        popupTime(){
            this.show = true
        },
        buttons(){
            let timeRes = this.currentDate
            var formatDateTime = function (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                return y + '-' + m + '-' + d;
            };
            console.log(formatDateTime(timeRes))
            this.times = formatDateTime(timeRes)
            this.show = false
        },
        LinkSub(){
            let token = localStorage.getItem("token")
            let params = {
                shopId: this.param,
                orderTime: this.times,
                orderWechatNum: this.weixin,
                userName: this.name,
                userToken: token
            }
            let order = '/order/advanceOrder'
            this.$fetch(order,params)
            .then((res)=>{
                if(res.message=='成功'){
                    let link =res.result.orderId
                    this.$router.push('/Submission/'+link)
                }
                
            })
            .catch((res)=>{
                this.$toast('提交失败，请检查订单信息')
            })
           
        },
        canlse(){
            this.show = false
        }
    }
}
</script>

<style scoped>
.HomeList{padding: 0.7rem;margin: 0}
.contentListImg img{width: 100%;}
.contentTitle{font-size: 0.68rem;color: #000000;font-weight: bold;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 0.8rem;height: 1.6rem;}
.CommName{color: #9a9a9a;font-size: 0.65rem;}
.total{font-size: 0.7rem;color: #fd424b;}
.button{position: fixed;bottom: 0;left: 0;height: 50px;background: #fff;font-size: 0.65rem;width: 100%;}
.button p{float: right;line-height: 50px;margin-right: 1rem;}
.button span{color: #ff6473;}
.button input{border: none;border-radius: 20px;color: #fff;background:#ff6473;line-height: 1rem;padding: 0.2rem 0.4rem;}
</style>