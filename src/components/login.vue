<template>
    <div class="login">
        <router-link class="close" to="/"><van-icon name="cross" size="1rem" color="#999999" /></router-link>
        <div class="clear"></div>
        <div class="tab">
            <ul class="LoginNav">
                <li><router-link :to="{ path: '/register'}">注册</router-link></li>
                <li class="activeNav">登录</li>
            </ul>
            <div class="clear"></div>
            <select style="background:#ffffff" name="public-choice" v-model="couponSelected" @change="getCouponSelected">                                        
                <option :value="coupon.id" v-for="coupon in couponList" >{{coupon.name}}</option>    
            </select>
            <van-cell-group class="phone">
                <van-field v-model="phone" placeholder="请输入手机号" :clearable="true" />
            </van-cell-group>  
            <div class="clear"></div> 
            <van-cell-group class="phoneRes" style="border-bottom:1px solid #e9e9e9;padding:0 ">
                <van-field v-model="password" type="password" placeholder="请输入密码" />
            </van-cell-group>
            <span class="forget" @click="wangji()">忘记密码？</span>
            <div class="clear"></div>
            <br><br><br>
            <div class="submitLogin"><van-button @click='login()' type="primary" size="normal">登录</van-button></div>
        </div>
    </div>
</template>

<script>
export default {
    name:  'login',
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
            radio:'true'
        }
    },
    created() {
        
        localStorage.setItem("address",'310100')
        localStorage.setItem("addre",'上海')
        this.couponSelected = this.couponList[0].id;
        if (localStorage.getItem("token")) {
                this.$router.push('/'+ 'home')
            }
        },
    mounted() {
        
    },
    methods: {
        getCouponSelected(){
           //获取选中的手机头
            console.log(this.couponSelected)
        },
        login(){
            if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
                this.$toast('请输入正确的手机号')
            }else{
                let register = '/appuser/login'

            let params = {
                phone: this.phone,
                pwd: this.password,
            }
            this.$fetch(register,params)
            .then((res)=>{
                if(res.succeed){
                    this.$toast('登录成功')
                    localStorage.setItem("token",res.result)
                    this.$router.push('/')
                }else{
                    this.$toast(res.message)
                }
            })
            .catch((res)=>{
                this.$toast('登录失败')
            })
            }
        },
        wangji(){
            this.$router.push('/'+ 'forget')
        }
    }
}
</script>
<style scoped>
.login{background:#fff;}
.close{text-align: left;margin:1rem;float: left}
.close i{text-align: left;}
.tab{padding:0 1rem}
.tab .van-ellipsis{font-size:1.25rem;}
.tab span{font-size:1.25rem;}
select{float:left;margin-top:2rem;width:2rem;height:2rem;font-size:0.75rem;padding-left: 0.8rem;}
select,option{border:none;}
.phone{float:left;margin-top:2rem;width:14rem;height: 2rem;}
.phoneRes{width:100%;}
.van-button span{font-size:0.63rem;}
.submitLogin{width:93%;margin:0 auto;}
.submitLogin button{border-radius: 30px;background-color:#ff6473;border:none;width: 100%;}
.submitLogin button span{font-size:0.8rem;font-weight: bold;}
.tab .forget{float: right;font-size: 0.6rem;margin-top:0.4rem;}
.LoginNav{margin-left: 1rem;}
.LoginNav li{float: left;font-size: 0.8rem;margin-right: 2.25rem;}
.LoginNav li a{color: #999999;}
.LoginNav .activeNav{font-size: 1.1rem;color: #ff6473;margin-top: -0.4rem;border-bottom: 2px #ff6473 solid;}
</style>