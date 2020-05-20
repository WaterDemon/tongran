<template>
    <div class="user">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="UserTop">
            <img class="Set" @click="data" src="../assets/userT.png" alt="">
            <div class="UserHead">
                <van-row gutter="20">
                    <van-col span="5">
                        <div  class="UserImg"><img :src="imgLeft+userImg" alt=""></div>
                    </van-col>
                    <van-col span="19">{{userName}}</van-col>
                </van-row>
            </div>
            <br>
            <p @click="totalLink()" v-if='fan'>账户余额（元）<span>{{total}}<van-icon name="arrow" size="10"  /></span></p>
            <p @click="totalLink()" v-if='!fan'>账户积分{{total}}</p>
        </div>
        <div class="UserOrder">
            <h2>我的订单</h2>
            <p><router-link :to="{ path: /order/+'0'}">全部订单<van-icon name="arrow" size="10"  /></router-link></p>
            <div class="clear"></div>
            <ul>
                <li>
                    <router-link :to="{ path: /order/+'1'}">
                    <img src="../assets/userO1.png" alt=""><br>
                    <p>待付款</p>
                    <h4>{{num1}}</h4>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: /order/+'2'}">
                    <img src="../assets/userO2.png" alt=""><br>
                    <p>待消费</p>
                    <h4>{{num2}}</h4>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: /order/+'3'}">
                    <img src="../assets/userO3.png" alt=""><br>
                    <p>预约中</p>
                    <h4>{{num3}}</h4>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: /order/+'4'}">
                    <img src="../assets/userO4.png" alt=""><br>
                    <p>已消费</p>
                    <h4>{{num4}}</h4>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: /order/+'5'}">
                    <img src="../assets/userO5.png" alt=""><br>
                    <p>待评价</p>
                    <h4>{{num5}}</h4>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="Advertisement"><img @click="brandLink" :src="imgLeft+Advertisement" alt=""></div>
        <br>
        <div class="hr"></div>
        <ul class="UserDetail">
            <li>
                <router-link :to="{ path: '/evaluateList'}">
                <img src="../assets/userO6.png" alt=""><br>
                <p>评价</p>
                </router-link>
            </li>
            <li>
                <router-link :to="{ path: '/Collection'}">
                <img src="../assets/userO7.png" alt=""><br>
                <p>收藏</p>
                </router-link>
            </li>
            <li>
                <router-link :to="{ path: '/footprint'}">
                <img src="../assets/userO8.png" alt=""><br>
                <p>我的足迹</p>
                </router-link>
            </li>
            <li @click="showPopup">
                <img src="../assets/userO9.png" alt=""><br>
                <p>联系我们</p>
            </li>
        </ul>
        <p class="copyright">Copyright©️2019-2021shebaobaoyule.com版权所有</p>
        <van-popup v-model="show" class="phonePopup">
            <a class="telpho" v-html="telPhone">{{telPhone}}</a>
            <div data-v-ede889ee="" class="addgroupBottom">
                <p class="cancel" @click="cancelclose">取消</p>
                <p><a :href="tel">呼叫</a></p>
                <div class="clear"></div>
            </div>
        </van-popup>
        </van-pull-refresh>
        <footers></footers>
    </div>
</template>

<script>
import footers from './footer'
export default {
    name:  'user',
    data() {
        return {
            imgLeft:'',
            userImg:'',
            userName: '',
            Advertisement: '',
            total: '',
            show: false,
            tel: '',
            telPhone: '',
            num1: '',
            num2: '',
            num3: '',
            num4: '',
            num5: '',
            fan: true,
            shopid: '',
            isLoading: false,
        }
    },
    components: {
        footers
    },
    created() {
        this.UserLoad()
    },
    methods: {
        UserLoad(){
            let ifpan = '/upper/isUpper'
            this.$fetch(ifpan)
            .then((res)=>{
                if(res.result.isUpper == '0'){
                    this.fan = false
                }
            })
            this.imgLeft = localStorage.getItem("temp")
            let token = localStorage.getItem("token")
            let rebate = '/appuser/my'
            let params = {
                userToken: token
            }
            this.$fetch(rebate,params)
            .then((res)=>{
                this.userImg = res.result[0].img
                if(res.result[0].nick == null){
                    this.userName = '路人'
                }else{
                    this.userName = res.result[0].nick
                }
                this.total = res.result[0].wallet
                this.Advertisement = res.result[0].adv
                this.tel = 'tel:'+res.result[0].phone
                this.telPhone = res.result[0].phone
                this.shopid = res.result[0].shopId
            })
            .catch((res)=>{
                this.$toast('请求失败')
            })
            let userNum = '/appuser/getObligation'
            this.$fetch(userNum,params)
            .then((res)=>{
                this.num1 = res.result.num1
                this.num2 = res.result.num2
                this.num3 = res.result.num3
                this.num4 = res.result.num4
                this.num5 = res.result.num5
            })
            .catch((res)=>{
                
            })
        },
        showPopup() {
            this.show = true;
        },
        data(){
            this.$router.push('/data')
        },
        totalLink(){
            this.$router.push('/wallet')
        },
        cancelclose(){
            this.show = false
        },
        brandLink(){
            this.$router.push('/CommodityDetails/'+this.shopid)
        },
        onRefresh() {
            setTimeout(() => {
                this.UserLoad()
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 1000);
        },
    }
}
</script>
<style scoped>
.user{padding-bottom: 50px}
.UserTop{background: url(../assets/usertop.png);height: 10.3rem;background-size: 100% 100%;padding: 0.75rem;font-size: 0.8rem}
.Set{float: right;width: 0.85rem;}
.UserImg{background:#e3e3e3;border-radius: 50%;width: 2.8rem;height: 2.8rem;overflow: hidden;}
.UserImg img{width: 100%;}
.UserHead{margin-top: 1.5rem;line-height: 2.8rem;color: #ffffff;}
.UserTop>p{color: #ffffff;width: 16.8rem;background: rgba(255, 255, 255, 0.5);border-radius: 0.4rem;padding:0.1rem 0.2rem;margin: 0 auto;}
.UserTop>p span{float: right;line-height: 1.2rem;}
.UserOrder{width: 15.2rem;background: #ffffff;border-radius: 10px;margin: -3rem auto 0;box-shadow: #ff6573 0px 0px 10px;padding: 1rem;}
.UserOrder h2{line-height: 2rem;float: left;}
.UserOrder ul {padding-top: 0.5rem;border-top: 1px solid #e9e9e9;}
.UserOrder ul:after{content: "";display: block;height: 0;clear: both;}
.UserOrder ul li{float: left;width: 20%;font-size: 0.6rem;text-align: center;position: relative;}
.UserOrder p{color: #666666;text-decoration:none}
.UserOrder ul li img{display: block;margin: 0 auto;width: 1.1rem;height: 1.1rem}
.UserOrder ul li>a{display: block;}
.UserOrder h4{position: absolute;background: #ff6573;width: 16px;top: -3px;right: -3px;color: #ffffff;text-align: center;border-radius: 50%}
.UserOrder>p{line-height: 2rem;float: right;font-size: 0.8rem;}
.UserOrder>p a{color: #333;}
.Advertisement{padding: 0 0.7rem;margin: 1rem auto 0;border-radius: 10px;overflow: hidden;}
.Advertisement img{width: 100%;}
.UserDetail{margin-top: 1.2rem;}
.UserDetail:after{content: "";display: block;height: 0;clear: both;}
.UserDetail li{width: 25%;float: left;font-size: 0.7rem;text-align: center;}
.UserDetail p{color: #666666;}
.UserDetail li img{display: block;margin: 0 auto;width: 1.1rem;height: 1.1rem}
.phonePopup{padding: 0.4rem 0 0;border-radius: 10px;width: 12rem;}
.telpho{color: #333333;text-align: center;display: block;line-height: 2rem;}
.addgroupBottom{border-top: 1px solid #e9e9e9;}
.addgroupBottom p{width: 49.6%;float: left;text-align: center;font-size: 0.8rem;line-height: 2rem;}
.cancel{border-right: 1px solid #e9e9e9;}
.addgroupBottom *{color: #007aff;}
.copyright{color: #999;font-size: 0.6rem;text-align: center;margin-top: 4rem;padding-bottom: 1rem}
a:link{text-decoration: none!important;  }
a:visited{text-decoration: none!important;  }
a:hover{text-decoration: none!important;  }
a:active{text-decoration: none!important;  }
a:focus{text-decoration: none!important;  }
</style>
