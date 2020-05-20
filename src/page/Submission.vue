<template>
    <div class="Submission">
        <van-nav-bar title="付款" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="times">
            <van-icon name="underway-o" color="#f00" /> 支付剩余时间  <van-count-down :time="time" />
        </div>
        <van-row style="padding:0 0.6rem;line-height:2.3rem;border-bottom:1px solid #f6f6f6;">
            <van-col span="12" class="textTop">
                订单金额
            </van-col>
            <van-col span="12" class="textTotal">
                ￥{{total}}
            </van-col>
        </van-row>
        <van-radio-group v-model="radio" class="paymentList">
            <van-cell-group>
                <van-cell clickable @click="radio = '1'">
                    <img src="../assets/Alipay.png" alt="" style="margin-top: 0.6rem;">
                    <div class="textD">
                        <p>支付宝</p>
                        <span>推荐使用支付宝</span>
                    </div>
                    <van-radio slot="right-icon" name="1"></van-radio>
                </van-cell>
                <van-cell clickable @click="radio = '2'">
                    <img src="../assets/wechat.png" alt="">
                    <div class="textD">
                        <p>微信支付</p>
                    </div>
                    <van-radio slot="right-icon" name="2"></van-radio>
                </van-cell>
                <!-- <van-cell clickable @click="radio = '3'">
                    <img src="../assets/qianbao.png" alt="">
                    <div class="textD">
                        <p>钱包</p>
                    </div>
                    <van-radio slot="right-icon" name="3"></van-radio>
                </van-cell> -->
            </van-cell-group>
        </van-radio-group>
        <div class="submitLogin" @click="success"><van-button type="primary" size="normal">立即支付</van-button></div>
    </div>
</template>

<script>
import mui from '../js/mui'
import wx from 'weixin-js-sdk'
export default {
    name: 'Submission',
    data() {
        return{
            time:15 * 60 * 1000,
            radio: '1',
            total: '',
            param: '',
            orderInfo: '',
            myInterval: null
        }
    },
    created(){
        this.imgLeft = localStorage.getItem("temp")
        let token = localStorage.getItem("token")
        var param = this.$route.params.id
        this.param = param
        let orderProduct = '/order/orderAmount'
        let params = {
            orderId: this.param 
        }
        this.$fetch(orderProduct,params)
        .then((res)=>{
            this.total = res.result.orderAmount
            this.orderInfo = res.result.id
        })
        .catch((res)=>{
        })
        this.dosomething()
        
    },
    methods: {
        dosomething(){
            this.myInterval = setInterval(() => {
                setTimeout(() => {
                    let params = {
                    orderNo: this.param 
                    }
                    let lunxun = 'alipay/isPaySuccess'
                    this.$fetch(lunxun,params)
                    .then((res)=>{
                        if(res == true){
                            this.$router.push('/success')
                        }else if(res == false){
                        }
                    })
                    .catch((res)=>{
                    })
                })
            }, 2000);
        },
        onClickLeft(){
            this.$router.push('/order/'+1).catch(err => {err})
        },
        success(){
            // 获取Hbuilder内置的支付通道
            if(this.radio == '1'){
                var wxChannel = null; // 微信支付 
                var aliChannel = null; // 支付宝支付
                plus.payment.getChannels(function(channels){
                    for (var i in channels) {
                        if (channels[i].id == "wxpay") {
                            wxChannel=channels[i];
                        }else if(channels[i].id == "alipay"){
                            aliChannel=channels[i];
                        }
                    }
                },function(e){
                    alert("获取支付通道失败："+e.message);
                    return 0;
                });
                mui.post("http://111.229.51.194/app/alipay/APPpay", {    //后台获取请求字符串
                    orderNo:this.orderInfo
                }, function(res) {   
                    plus.payment.request(aliChannel, res.result.orderInfo, function(result) {
                    }, function(e) {
                        alert('支付失败')
                    });
                })
            }else if(this.radio == '2'){
                var wxChannel = null; // 微信支付 
                var aliChannel = null; // 支付宝支付
                let token = localStorage.getItem("token")
                var orderInfo = this.orderInfo
                plus.payment.getChannels(function(channels){
                    for (var i in channels) {
                        if (channels[i].id == "wxpay") { 
                            wxChannel=channels[i];
                        }else if(channels[i].id == "alipay"){
                            aliChannel=channels[i];
                        }
                    }
                },function(e){
                    alert("获取支付通道失败："+e.message);
                    return 0;
                });
                    mui.ajax('http://111.229.51.194/app/wxpay/APPadvancePay?orderId='+orderInfo+'&userToken='+token, {   
                    type: 'post',
                    dataType: 'json',
                    success: function(res) {  
                        plus.payment.request(wxChannel, res.result, function(e) {
                            alert('支付成功')
                        },function(e) {
                        alert('支付失败')
                    })}
                })
            }else if(this.radio == '3'){
                let link = '/order/walletPay'
                let token = localStorage.getItem("token")
                let parms = {
                    userToken: token,
                    orderId: this.param
                }
                this.$fetch(link,parms)
                .then((res)=>{
                })
                .catch((res)=>{
                })
            }
            
        }
    },
    destroyed(){
        
            clearInterval(this.myInterval); 
        
    }
}
</script>

<style scoped>
.times{background: #f4f4f4;color: #f00;font-size: 0.7rem;text-align: center;line-height: 2.2rem;}
.van-count-down{color: #f00;display: inline-block;}
.textTop{font-size: 0.66rem;}
.textTotal{text-align: right;font-size: 0.66rem;color: #f00;}
.paymentList .textD{float: left;margin-left: 0.9rem;}
.paymentList .textD p{font-size: 0.8rem;}
.paymentList .textD span{font-size: 0.7rem;color: #f00;}
.paymentList img{width: 1.4rem;float: left;}
.submitLogin{width:100%;position: fixed;left: 0;bottom: 0;}
.submitLogin button{background-color:#ff6473;border:none;width: 100%;}
.submitLogin button span{font-size:0.8rem;font-weight: bold;}
</style>