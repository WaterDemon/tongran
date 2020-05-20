<template>
    <div class="modify">
        <van-nav-bar title="修改密码" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="tab">
            <select style="background:#ffffff" name="public-choice" v-model="couponSelected" @change="getCouponSelected">                                        
                <option :value="coupon.id" v-for="coupon in couponList" >{{coupon.name}}</option>    
            </select>
            <van-cell-group class="phone">
                <van-field v-model="phone" placeholder="请输入手机号" :clearable="true" />
            </van-cell-group>   
            <div class="clear"></div> 
            <van-cell-group class="phoneRes">
                <van-field v-model="sms" @touchstart.stop="show = true" placeholder="请输入短信验证码" >
                    <van-button style="height:1.46rem" color="#ff6473" plain slot="button"  size="small" type="primary" @click='yzm()' v-if="yzmHide" >获取验证码</van-button>
                    <van-button style="height:1.46rem" color="#ff6473" plain slot="button"  size="small" type="primary" v-if="!yzmHide"><van-count-down :time="time" format='ss秒' @finish="finish" /></van-button>
                </van-field>
            </van-cell-group> 
            <van-cell-group class="phoneRes" style="border-bottom:1px solid #e9e9e9;padding:0 ">
                <van-field v-model="password" type="password" placeholder="请输入新密码" />
            </van-cell-group>
            <br>
            <div class="clear"></div>
            <br><br>
            <div class="submitLogin"><van-button @click='register()' type="primary" color="linear-gradient(to right, #ff6674, #fdbdb1)" size="normal">确定</van-button></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modify',
    data() {
        return{
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
        this.couponSelected = this.couponList[0].id;
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
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
                let register = '/appuser/changepwd'

            let params = {
                phone: this.phone,
                pwd: this.password,
                auth: this.sms
            }
            this.$fetch(register,params)
            .then((res)=>{
                if(res.succeed == true){
                    this.$toast('修改成功')
                    this.$router.push('/data')
                }else{
                    this.$toast(res.message)
                }
                
            })
            .catch((res)=>{
                this.$toast('网络异常')
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
                    type: 1
                }
                this.$fetch(register,params)
                .then((res)=>{
                    console.log(res.result)
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
.tab{padding:0 1rem}
.tab .van-ellipsis{font-size:1.25rem;}
.tab span{font-size:1.25rem;}
select{float:left;margin-top:2rem;width:2rem;height:2rem;font-size:0.75rem;padding-left:0.8rem;}
select,option{border:none;}
.phone{float:left;margin-top:2rem;width:14.1rem;height: 2rem;}
.phoneRes{width:100%;}
.phoneRes .van-button{background-color: #fff;width:4.5rem;height:1.5rem;color:#ff6473;border-radius: 20px;}
.van-button span{font-size:0.63rem;}
.xieyi{padding:0 0.2rem;float:left;}
.submitLogin{width:93%;margin:0 auto;}
.submitLogin button{border-radius: 30px;border:none;width: 100%;}
.submitLogin button span{font-size:0.8rem;font-weight: bold;}
.tab .forget{float: right;font-size: 0.6rem;margin-top:0.4rem;}
.LoginNav{margin-left: 1rem;}
.LoginNav li{float: left;font-size: 0.8rem;margin-right: 2.25rem;}
.LoginNav li a{color: #999999;}
.LoginNav .activeNav{font-size: 1.1rem;color: #ff6473;margin-top: -0.4rem;border-bottom: 2px #ff6473 solid;}
</style>