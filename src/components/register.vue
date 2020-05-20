<template>
  <div class="register">
        <router-link class="close" to="/"><van-icon name="cross" size="1rem" color="#999999" /></router-link>
        <div class="clear"></div>
        <div class="tab">
            <ul class="LoginNav">
                <li class="activeNav">注册</li>
                <li><router-link :to="{ path: '/login'}">登录</router-link></li>
            </ul>
            <div class="clear"></div>
            <select style="background:#ffffff" name="public-choice" v-model="couponSelected" @change="getCouponSelected">                                        
                <option :value="coupon.id" v-for="coupon in couponList" >{{coupon.name}}</option>    
            </select>
            <van-cell-group class="phone">
                <van-field v-model="phone" placeholder="请输入手机号" :clearable="true" />
            </van-cell-group>   
            <div class="clear"></div> 
            <van-cell-group class="phoneRes">
                <van-field v-model="sms" @touchstart.stop="show = true" placeholder="请输入短信验证码" >
                    <van-button color="#ff6473" style="height:1.46rem" plain slot="button"  size="small" type="primary" @click='yzm()' v-if="yzmHide" >获取验证码</van-button>
                    <van-button color="#ff6473" style="height:1.46rem" plain slot="button"  size="small" type="primary" v-if="!yzmHide"><van-count-down :time="time" format='ss秒' @finish="finish" /></van-button>
                </van-field>
            </van-cell-group> 
            <van-cell-group class="phoneRes" style="border-bottom:1px solid #e9e9e9;padding:0 ">
                <van-field v-model="password" type="password" placeholder="请输入密码" />
            </van-cell-group>
            <br>
            <van-radio-group v-model="radio" class="xieyi">
                <van-radio name="true" icon-size="0.75rem" radio checked-color="#ff6473"></van-radio>
            </van-radio-group>
            <span class="radiosq">我已阅读并同意<span>《用户协议》</span></span>
            <div class="clear"></div>
            <br><br>
            <div class="submitLogin"><van-button @click='register()' type="primary" size="normal">注册</van-button></div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'register',
    data() {
         return {
            couponList:[
                {
                    id: '86',
                    name: '86'
                },
                {
                    id: '85',
                    name: '85'
                }
            ],
            couponSelected: '',
            phone:'',
            sms:'',
            password: '',
            radio:'true',
            time: 60*1000,
            yzmHide: true,
        }
    },
    created() {
        document.addEventListener('plusready', function () {
            var webview = plus.webview.currentWebview()
            plus.key.addEventListener('backbutton', function () {
                webview.canBack(function (e) {
                    if (e.canBack) {
                        webview.back()
                        } else {
                        var first = null
                        plus.key.addEventListener(
                            'backbutton',
                            function () {
                            if (!first) {
                                first = new Date().getTime()
                                this.$toast('再按一次退出应用')
                                setTimeout(function () {
                                first = null
                                }, 1000)
                            } else {
                                if (new Date().getTime() - first < 1500) {
                                plus.runtime.quit()
                                }
                            }
                            },
                            false
                        )
                        }
                    })
                })
            })
        this.couponSelected = this.couponList[0].id;
    },
    methods: {
        getCouponSelected(){
           //获取选中的手机头
            console.log(this.couponSelected)
        },
        register(){
            if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
                this.$toast('请输入正确的手机号')
            }else if(this.sms == ''){
                this.$toast('请输入验证码')
            }else if(this.password == ''){
                this.$toast('请输入密码')
            }else{
                let register = '/appuser/register'

            let params = {
                phone: this.phone,
                pwd: this.password,
                auth: this.sms
            }
            this.$fetch(register,params)
            .then((res)=>{
                if(res.succeed == true){
                    this.$toast('注册成功')
                    localStorage.setItem("token",res.result)
                    this.$router.push('/')
                }else{
                    this.$toast(res.message)
                }
            })
            .catch((res)=>{
                this.$toast('验证码输入错误')
            })
            }
        },
        yzm(){
            if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
                this.$toast('请输入正确的手机号')
            }else{
                this.yzmHide = false
                let register = '/appuser/sendSmsCode'

                let params = {
                    phone: this.phone,
                    type: 0
                }
                this.$fetch(register,params)
                .then((res)=>{
                    if(res.succeed==false){
                        this.$toast(res.message)
                    }
                })
                .catch((res)=>{
                    this.$toast('网络异常')
                })
            }
            
        },
        finish(){
            this.yzmHide = true
        }
    }
}
</script>

<style scoped>
.register{background: #ffffff;}
.close{text-align: left;margin:1rem;float: left}
.close i{text-align: left;}
.van-tabs__line{background-color: #ff6473;}
.tab{padding:0 1rem}
.tab .van-ellipsis{font-size:1.25rem;}
.tab span{font-size:1.25rem;}
select{float:left;margin-top:2rem;width:2rem;height:2rem;font-size:0.75rem;padding-left: 0.8rem;}
select,option{border:none;}
.phone{float:left;margin-top:2rem;width:14.1rem;height: 2rem;}
.phoneRes{width:100%;}
.phoneRes .van-button{background-color: #fff;width:4.5rem;height:1.5rem;color:#ff6473;border-radius: 20px;}
.van-button span{font-size:0.63rem;}
.xieyi{padding:0 0.2rem;float:left;}
.tab .radiosq{font-size:0.6rem;float:left}
.tab .radiosq span{color:#ff6473;font-size:0.65rem;}
.submitLogin{width:93%;margin:0 auto;}
.submitLogin button{border-radius: 30px;background-color:#ff6473;border:none;width: 100%;}
.submitLogin button span{font-size:0.8rem;font-weight: bold;}
.tab .forget{float: right;font-size: 0.6rem;margin-top:0.4rem;}
.LoginNav{margin-left: 1rem;}
.LoginNav li{float: left;font-size: 0.8rem;margin-right: 2.25rem;}
.LoginNav li a{color: #999999;}
.LoginNav .activeNav{font-size: 1.1rem;color: #ff6473;margin-top: -0.4rem;border-bottom: 2px #ff6473 solid;}
</style>