<template>
    <div class="datas">
        <van-nav-bar title="我的资料" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="list">
            <ul>
                <li class="top">
                    <p @click="NickHead">头像 <span><van-icon name="arrow" size="16px" color="#d2d2d2" /></span><img class="header" :src="imgLeft+userImg" alt=""></p>
                </li>
                <li>
                    <p @click="Nickname">昵称 <span>{{userName}} &nbsp;<van-icon name="arrow" size="16px" color="#d2d2d2" /></span></p>
                </li>
                <li>
                    <p @click="modify">修改密码 <span> &nbsp;<van-icon name="arrow" size="16px" color="#d2d2d2" /></span></p>
                </li>
                <li>
                    <p @click="Sex">生日性别 <span> &nbsp;<van-icon name="arrow" size="16px" color="#d2d2d2" /></span></p>
                </li>
            </ul>
        </div>
        <br><br>
        <div class="submitLogin"><van-button @click='register()' type="primary" color="linear-gradient(to right, #ff6674, #fdbdb1)" size="normal">退出登录</van-button></div>
    </div>
</template>

<script>
export default {
    name: 'datas',
    data (){
        return{
            imgLeft: '',
            userImg:'',
            userName: ''
        }
    },
    activated() {
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
        })
        .catch((res)=>{
            this.$toast('网络异常')
        })
    },
    methods: {
        onClickLeft(){
            this.$router.push('/user')
        },
        Nickname(){
            this.$router.push('/Nickname')
        },
        NickHead(){
            this.$router.push('/NickHead')
        },
        modify(){
            this.$router.push('/modify')
        },
        register(){
            window.localStorage.removeItem('token')
            this.$router.push('/login')
        },
        Sex(){
            this.$router.push('/sex')
        }
    }
}
</script>

<style scoped>
    .list li{
        border-bottom:1px solid #f7f7f7;
        width: 90%;
        margin:0 auto;
        padding-top:0.1rem;
    }
    .list li p{
        text-align: left;
        font-size: 0.75rem;
        line-height: 2.6rem;
    }
    .list span{
        float: right;
    }
    .header {
        width: 3rem;
        float: right;
        margin-top: 0.4rem;
    }
    .list .top p{
        line-height: 4rem;
    }
    .submitLogin{width:93%;margin:0 auto;}
.submitLogin button{border-radius: 30px;border:none;width: 100%;}
.submitLogin button span{font-size:0.8rem;font-weight: bold;}
</style>
